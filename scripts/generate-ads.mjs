// Gera imagens prontas para o Performance Max (sem termos de marca de terceiros).
// Variedade: 4 horizontais (1.91:1), 4 quadradas (1:1), 2 verticais (4:5) + logos.
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'public/brand/ads');
mkdirSync(out, { recursive: true });
const logoPath = resolve(root, 'public/brand/tltec-logo.png');
const F = 'font-family="Arial, Helvetica, sans-serif"';

const grid = (w, h) => {
  let l = '';
  for (let x = 0; x <= w; x += 80) l += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y <= h; y += 80) l += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return `<g stroke="#5b8bd0" stroke-opacity="0.10" stroke-width="1">${l}</g>`;
};

const bg = (w, h, gx, gy) => `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#081230"/><stop offset="1" stop-color="#0c1f4a"/>
    </linearGradient>
    <radialGradient id="glow" cx="${gx}" cy="${gy}" r="0.85">
      <stop offset="0" stop-color="#2A9DF4" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#2A9DF4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${grid(w, h)}`;

// Mensagens (variação evita imagens "duplicadas")
const MSGS = [
  { h: 'GstarCAD 2027', s: 'CAD 2D/3D compatível com DWG', c: 'Licença perpétua · economia até 70%' },
  { h: 'Economia de até 70%', s: 'Licença perpétua — pague uma vez', c: 'CAD compatível com DWG' },
  { h: 'Teste grátis 30 dias', s: 'Avalie sem compromisso', c: 'Suporte em português · nota fiscal' },
  { h: '+1.000 clientes', s: 'Revenda autorizada GstarCAD', c: 'Atendimento em português' },
];
const GLOW = [[0.82, 0.12], [0.15, 0.15], [0.85, 0.85], [0.2, 0.85]];

async function render(name, w, h, svgInner, gx, gy, logoW, logoLeft, logoTop) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${bg(w, h, gx, gy)}${svgInner}</svg>`;
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const logo = await sharp(logoPath).resize({ width: logoW }).toBuffer();
  await sharp(base).composite([{ input: logo, left: logoLeft, top: logoTop }]).png().toFile(resolve(out, name));
  console.log(`[ads] ${name} (${w}x${h})`);
}

function landscape(m) {
  return `
    <text x="80" y="350" ${F} font-size="66" font-weight="800" fill="#fff">${m.h}</text>
    <text x="82" y="406" ${F} font-size="30" font-weight="500" fill="#bcd2f3">${m.s}</text>
    <rect x="80" y="448" width="640" height="52" rx="26" fill="#2A9DF4"/>
    <text x="400" y="482" ${F} font-size="23" font-weight="700" fill="#06122e" text-anchor="middle">${m.c}</text>`;
}
function square(m) {
  return `
    <text x="600" y="640" ${F} font-size="86" font-weight="800" fill="#fff" text-anchor="middle">${m.h}</text>
    <text x="600" y="706" ${F} font-size="36" font-weight="500" fill="#bcd2f3" text-anchor="middle">${m.s}</text>
    <rect x="220" y="752" width="760" height="64" rx="32" fill="#2A9DF4"/>
    <text x="600" y="795" ${F} font-size="28" font-weight="700" fill="#06122e" text-anchor="middle">${m.c}</text>`;
}
function vertical(m) {
  return `
    <text x="600" y="840" ${F} font-size="76" font-weight="800" fill="#fff" text-anchor="middle">${m.h}</text>
    <text x="600" y="906" ${F} font-size="36" font-weight="500" fill="#bcd2f3" text-anchor="middle">${m.s}</text>
    <rect x="180" y="956" width="840" height="66" rx="33" fill="#2A9DF4"/>
    <text x="600" y="1000" ${F} font-size="29" font-weight="700" fill="#06122e" text-anchor="middle">${m.c}</text>`;
}

// Horizontais 1200x628 (4)
for (let i = 0; i < 4; i++) {
  await render(`marketing-h${i + 1}-1200x628.png`, 1200, 628, landscape(MSGS[i]), GLOW[i][0], GLOW[i][1], 260, 80, 64);
}
// Quadradas 1200x1200 (4)
for (let i = 0; i < 4; i++) {
  await render(`marketing-s${i + 1}-1200x1200.png`, 1200, 1200, square(MSGS[i]), GLOW[i][0], GLOW[i][1], 320, 440, 150);
}
// Verticais 1200x1500 (4:5) (2)
for (const [n, i] of [[1, 0], [2, 2]]) {
  await render(`marketing-v${n}-1200x1500.png`, 1200, 1500, vertical(MSGS[i]), GLOW[i][0], GLOW[i][1], 340, 430, 200);
}

// Logos
await sharp({ create: { width: 1200, height: 1200, channels: 4, background: '#0a1633' } })
  .composite([{ input: await sharp(logoPath).resize({ width: 820 }).toBuffer(), gravity: 'center' }])
  .png().toFile(resolve(out, 'logo-1200x1200.png'));
console.log('[ads] logo-1200x1200.png');
await sharp({ create: { width: 1200, height: 300, channels: 4, background: '#0a1633' } })
  .composite([{ input: await sharp(logoPath).resize({ height: 200 }).toBuffer(), gravity: 'center' }])
  .png().toFile(resolve(out, 'logo-1200x300.png'));
console.log('[ads] logo-1200x300.png');

console.log('OK — imagens em public/brand/ads/');
