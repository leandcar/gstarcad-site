import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { enviarLeadAgendor } from './agendor';
import { streamDriveFile } from './drive-download';
import { SITE } from './content/site-config';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * API — recebe leads do site e envia para o Agendor (CRM), raia "Contato".
 */
app.use(express.json({ limit: '32kb' }));

// Diagnóstico: confirma se o endpoint está no ar e se o token do Agendor está configurado.
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, agendorConfigured: !!process.env['AGENDOR_TOKEN'] });
});

app.post('/api/lead', async (req, res) => {
  try {
    const result = await enviarLeadAgendor(req.body || {});
    if (!result.ok) console.warn('[lead] falha ao enviar ao Agendor:', result.error);
    else console.log('[lead] criado no Agendor: deal', result.dealId);
    res.status(result.ok ? 200 : 502).json(result);
  } catch (e) {
    console.error('[lead] erro inesperado:', e);
    res.status(500).json({ ok: false, error: e instanceof Error ? e.message : String(e) });
  }
});

/**
 * Download do instalador de avaliação — proxy/stream do Google Drive.
 * O usuário baixa pela nossa URL (sem sair da página, sem ver o Drive).
 * O ID do arquivo vem da env DRIVE_FILE_ID ou de SITE.trialDownload.driveId.
 */
app.get('/download/trial', async (req, res) => {
  const id = process.env['DRIVE_FILE_ID'] || SITE.trialDownload.driveId;
  if (!id) {
    res.status(503).send('Download temporariamente indisponível. Fale com a nossa equipe pelo WhatsApp.');
    return;
  }
  try {
    await streamDriveFile(id, SITE.trialDownload.file, req, res);
  } catch (e) {
    console.error('[download] erro ao transmitir do Drive:', e);
    if (!res.headersSent) res.status(502).send('Erro ao baixar o arquivo. Tente novamente.');
  }
});

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
