// Gera imagens prontas para o Performance Max (sem termos de marca de terceiros).
// Saída em public/brand/ads/: paisagem 1.91:1, quadrada 1:1 e logos.
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'public/brand/ads');
mkdirSync(out, { recursive: true });
const logoPath = resolve(root, 'public/brand/tltec-logo.png');

const grid = (w, h) => {
  let l = '';
  for (let x = 0; x <= w; x += 80) l += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y <= h; y += 80) l += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return `<g stroke="#5b8bd0" stroke-opacity="0.10" stroke-width="1">${l}</g>`;
};

const bg = (w, h) => `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#081230"/><stop offset="1" stop-color="#0c1f4a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.85">
      <stop offset="0" stop-color="#2A9DF4" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#2A9DF4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${grid(w, h)}`;

const F = 'font-family="Arial, Helvetica, sans-serif"';

async function compose(name, w, h, inner, logoW, logoX, logoY) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${bg(w, h)}${inner}</svg>`;
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const logo = await sharp(logoPath).resize({ width: logoW }).toBuffer();
  await sharp(base)
    .composite([{ input: logo, left: logoX, top: logoY }])
    .png()
    .toFile(resolve(out, name));
  console.log(`[ads] ${name} (${w}x${h})`);
}

// 1) Paisagem 1200x628 (1.91:1)
await compose('marketing-1200x628.png', 1200, 628, `
  <text x="80" y="350" ${F} font-size="70" font-weight="800" fill="#ffffff">GstarCAD 2027</text>
  <text x="82" y="408" ${F} font-size="32" font-weight="500" fill="#bcd2f3">CAD 2D/3D compatível com DWG</text>
  <rect x="80" y="450" width="560" height="52" rx="26" fill="#2A9DF4"/>
  <text x="360" y="484" ${F} font-size="24" font-weight="700" fill="#06122e" text-anchor="middle">Licença perpétua · economia até 70%</text>
`, 300, 80, 70);

// 2) Quadrada 1200x1200 (1:1)
await compose('marketing-1200x1200.png', 1200, 1200, `
  <text x="600" y="620" ${F} font-size="92" font-weight="800" fill="#ffffff" text-anchor="middle">GstarCAD 2027</text>
  <text x="600" y="690" ${F} font-size="38" font-weight="500" fill="#bcd2f3" text-anchor="middle">CAD 2D/3D compatível com DWG</text>
  <rect x="300" y="760" width="600" height="64" rx="32" fill="#2A9DF4"/>
  <text x="600" y="803" ${F} font-size="30" font-weight="700" fill="#06122e" text-anchor="middle">Licença perpétua · economia até 70%</text>
`, 460, 370, 360);

// 3) Logo quadrado 1200x1200
await sharp({ create: { width: 1200, height: 1200, channels: 4, background: '#0a1633' } })
  .composite([{ input: await sharp(logoPath).resize({ width: 820 }).toBuffer(), gravity: 'center' }])
  .png().toFile(resolve(out, 'logo-1200x1200.png'));
console.log('[ads] logo-1200x1200.png');

// 4) Logo paisagem 1200x300
await sharp({ create: { width: 1200, height: 300, channels: 4, background: '#0a1633' } })
  .composite([{ input: await sharp(logoPath).resize({ height: 200 }).toBuffer(), gravity: 'center' }])
  .png().toFile(resolve(out, 'logo-1200x300.png'));
console.log('[ads] logo-1200x300.png');

console.log('OK — imagens em public/brand/ads/');
