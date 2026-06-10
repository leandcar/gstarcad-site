// Processa a logo enviada (JPEG navy) → PNG transparente, recortado.
// Remove o fundo navy por distância de cor e recorta na bounding box do conteúdo.
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SRC = process.argv[2] || 'F:/Downloads/logo_azul.jpeg';
const OUT = resolve(root, 'public/brand/tltec-logo.png');

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// cor de fundo = canto superior esquerdo
const bg = [data[0], data[1], data[2]];
const dist = (r, g, b) => Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);

const LO = 45;   // <= LO: fundo (transparente)
const HI = 95;   // >= HI: conteúdo (opaco)

let minX = width, minY = height, maxX = 0, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const d = dist(data[i], data[i + 1], data[i + 2]);
    let a;
    if (d <= LO) a = 0;
    else if (d >= HI) a = 255;
    else a = Math.round(((d - LO) / (HI - LO)) * 255);
    data[i + 3] = a;
    if (a > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 12;
minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad); maxY = Math.min(height - 1, maxY + pad);
const cw = maxX - minX + 1;
const ch = maxY - minY + 1;

await sharp(data, { raw: { width, height, channels } })
  .extract({ left: minX, top: minY, width: cw, height: ch })
  .png()
  .toFile(OUT);

console.log(`[logo] ${OUT} (${cw}x${ch}) — recortado e com fundo transparente`);
