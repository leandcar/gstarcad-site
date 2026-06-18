import type { Request, Response } from 'express';
import { Readable } from 'node:stream';

// Faz proxy/stream de um arquivo público do Google Drive para o cliente,
// tratando a tela de aviso de antivírus (arquivos grandes) e suportando Range (retomada).
// Assim o usuário baixa pela nossa URL, sem sair da página nem ver o Drive.

const UA = 'Mozilla/5.0 (compatible; TLTEC-download/1.0)';
const BASE = 'https://drive.usercontent.google.com/download';

function buildUrl(params: Record<string, string>): string {
  const u = new URL(BASE);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  return u.toString();
}

export async function streamDriveFile(
  fileId: string,
  filename: string,
  req: Request,
  res: Response,
): Promise<void> {
  const range = req.headers['range'];
  const reqHeaders: Record<string, string> = { 'User-Agent': UA };
  if (typeof range === 'string') reqHeaders['Range'] = range;

  let upstream = await fetch(buildUrl({ id: fileId, export: 'download', confirm: 't' }), {
    headers: reqHeaders,
    redirect: 'follow',
  });

  // Arquivos grandes retornam um HTML com formulário de confirmação — extrai e refaz.
  if ((upstream.headers.get('content-type') || '').includes('text/html')) {
    const html = await upstream.text();
    const field = (n: string) => html.match(new RegExp(`name="${n}"\\s+value="([^"]*)"`))?.[1];
    const params: Record<string, string> = {
      id: fileId,
      export: 'download',
      confirm: field('confirm') || 't',
    };
    const uuid = field('uuid');
    const at = field('at');
    if (uuid) params['uuid'] = uuid;
    if (at) params['at'] = at;
    upstream = await fetch(buildUrl(params), { headers: reqHeaders, redirect: 'follow' });
  }

  if (!upstream.ok && upstream.status !== 206) {
    res.status(502).send('Não foi possível obter o arquivo no momento.');
    return;
  }

  res.status(upstream.status);
  for (const h of ['content-length', 'content-range', 'accept-ranges', 'last-modified', 'etag']) {
    const v = upstream.headers.get(h);
    if (v) res.setHeader(h, v);
  }
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  if (!upstream.body) {
    res.end();
    return;
  }
  Readable.fromWeb(upstream.body as unknown as Parameters<typeof Readable.fromWeb>[0]).pipe(res);
}
