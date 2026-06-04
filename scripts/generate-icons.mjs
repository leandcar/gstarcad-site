// Gera favicons, ícones PWA e a imagem de compartilhamento (OG) a partir dos SVGs da marca.
// Uso: node scripts/generate-icons.mjs   (precisa de sharp)
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = resolve(root, 'public');
const favSvg = readFileSync(resolve(pub, 'favicon.svg'));
const ogSvg = readFileSync(resolve(pub, 'brand/og.svg'));
mkdirSync(resolve(pub, 'icons'), { recursive: true });

const icons = [
  ['icons/favicon-16.png', 16],
  ['icons/favicon-32.png', 32],
  ['icons/favicon-48.png', 48],
  ['icons/apple-touch-icon.png', 180],
  ['icons/icon-192.png', 192],
  ['icons/icon-512.png', 512],
];

for (const [out, size] of icons) {
  await sharp(favSvg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(resolve(pub, out));
  console.log(`[icons] ${out} (${size}px)`);
}

// Imagem OG / Twitter (1200x630)
await sharp(ogSvg, { density: 144 })
  .resize(1200, 630)
  .png({ quality: 90 })
  .toFile(resolve(pub, 'og-default.png'));
console.log('[icons] og-default.png (1200x630)');
