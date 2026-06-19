import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { enviarLeadAgendor } from './agendor';
import { streamDriveFile } from './drive-download';
import { SITE } from './content/site-config';
import { COMPANY } from './content/company';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Token de download assinado (HMAC) e temporário.
 * Emitido apenas no /api/lead (quando o usuário envia os dados) e exigido no
 * /download/trial — impede que o link seja repassado/usado fora do site.
 */
const DL_SECRET = process.env['DOWNLOAD_SECRET'] || randomBytes(32).toString('hex');
const DL_TTL_MS = 30 * 60 * 1000; // 30 minutos

type TrialOS = 'windows' | 'mac';
const normOS = (v: unknown): TrialOS => (v === 'mac' ? 'mac' : 'windows');

// Token compacto: os.exp(base36).nonce.sig — curto o suficiente para enviar a clientes.
function signDownloadToken(os: TrialOS, ttlMs: number = DL_TTL_MS): string {
  const exp = (Date.now() + ttlMs).toString(36);
  const nonce = randomBytes(4).toString('base64url');
  const payload = `${os}.${exp}.${nonce}`;
  const sig = createHmac('sha256', DL_SECRET).update(payload).digest('base64url').slice(0, 16);
  return `${payload}.${sig}`;
}

/** Retorna o sistema (windows|mac) se o token for válido; senão null. */
function verifyDownloadToken(token: unknown): TrialOS | null {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 4) return null;
  const [os, exp, nonce, sig] = parts;
  if (os !== 'windows' && os !== 'mac') return null;
  const expected = createHmac('sha256', DL_SECRET).update(`${os}.${exp}.${nonce}`).digest('base64url').slice(0, 16);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const expMs = parseInt(exp, 36);
  return Number.isFinite(expMs) && Date.now() <= expMs ? (os as TrialOS) : null;
}

function driveIdFor(os: TrialOS): string {
  if (os === 'mac') return process.env['DRIVE_FILE_ID_MAC'] || SITE.trialDownloads.mac.driveId;
  return process.env['DRIVE_FILE_ID'] || process.env['DRIVE_FILE_ID_WINDOWS'] || SITE.trialDownloads.windows.driveId;
}

/**
 * API — recebe leads do site e envia para o Agendor (CRM), raia "Contato".
 */
app.use(express.json({ limit: '32kb' }));

// Redireciona (301) URLs antigas "2026" → "2027" (produtos e campanhas renomeados).
app.use((req, res, next) => {
  if (req.path.includes('gstarcad-2026')) {
    return res.redirect(301, req.originalUrl.replace(/gstarcad-2026/g, 'gstarcad-2027'));
  }
  next();
});

// Diagnóstico: confirma se o endpoint está no ar e se o token do Agendor está configurado.
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, agendorConfigured: !!process.env['AGENDOR_TOKEN'] });
});

app.post('/api/lead', async (req, res) => {
  try {
    const result = await enviarLeadAgendor(req.body || {});
    if (!result.ok) console.warn('[lead] falha ao enviar ao Agendor:', result.error);
    else console.log('[lead] criado no Agendor: deal', result.dealId);
    // Emite o token de download (o usuário informou os dados). Independe do Agendor.
    const os = normOS(req.body?.sistema);
    const download = driveIdFor(os) ? `/d/${signDownloadToken(os)}` : undefined;
    res.status(200).json({ ...result, download });
  } catch (e) {
    console.error('[lead] erro inesperado:', e);
    res.status(500).json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
});

/**
 * ADMIN: gera um link de download temporário sob demanda (para enviar a um cliente).
 * Protegido por ADMIN_KEY. Uso: /api/download-link?key=SUA_CHAVE&horas=24
 */
app.get('/api/download-link', (req, res) => {
  const adminKey = process.env['ADMIN_KEY'];
  if (!adminKey) {
    res.status(404).json({ ok: false, error: 'ADMIN_KEY não configurada no servidor' });
    return;
  }
  if (req.query['key'] !== adminKey) {
    res.status(403).json({ ok: false, error: 'chave inválida' });
    return;
  }
  const horas = Math.min(720, Math.max(1, Number(req.query['horas']) || 24));
  const os = normOS(req.query['sistema']);
  const token = signDownloadToken(os, horas * 60 * 60 * 1000);
  const base = COMPANY.url.replace(/\/$/, '');
  res.json({ ok: true, sistema: os, url: `${base}/d/${token}`, expiraEmHoras: horas });
});

/**
 * Download do instalador de avaliação — proxy/stream do Google Drive.
 * O usuário baixa pela nossa URL (sem sair da página, sem ver o Drive).
 * O ID do arquivo (por sistema) vem das envs DRIVE_FILE_ID/_MAC ou de SITE.trialDownloads.
 */
async function serveTrial(token: unknown, req: express.Request, res: express.Response): Promise<void> {
  // Exige token válido. Bloqueia link repassado/expirado.
  const os = verifyDownloadToken(token);
  if (!os) {
    res.status(403).send('Link de download inválido ou expirado. Solicite novamente pelo site (página de Downloads).');
    return;
  }
  const id = driveIdFor(os);
  if (!id) {
    res.status(503).send('Download temporariamente indisponível. Fale com a nossa equipe pelo WhatsApp.');
    return;
  }
  try {
    await streamDriveFile(id, SITE.trialDownloads[os].file, req, res);
  } catch (e) {
    console.error('[download] erro ao transmitir do Drive:', e);
    if (!res.headersSent) res.status(502).send('Erro ao baixar o arquivo. Tente novamente.');
  }
}

// Rota curta (amigável) e alias antigo.
app.get('/d/:token', (req, res) => serveTrial(req.params['token'], req, res));
app.get('/download/trial', (req, res) => serveTrial(req.query['t'], req, res));

/**
 * Arquivos grandes (instaladores) servidos de um VOLUME persistente.
 * Em produção, monte um volume no EasyPanel e aponte FILES_DIR para ele
 * (ex.: FILES_DIR=/data/arquivos). Sem a variável, usa a pasta do build
 * (browser/arquivos) — útil no teste local. Suporta Range/resume.
 */
const filesDir = process.env['FILES_DIR'] || join(browserDistFolder, 'arquivos');
app.use(
  '/arquivos',
  express.static(filesDir, {
    index: false,
    redirect: false,
    maxAge: '7d',
    dotfiles: 'ignore',
  }),
);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
