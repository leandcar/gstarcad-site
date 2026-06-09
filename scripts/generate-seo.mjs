// Gera public/sitemap.xml e public/llms.txt a partir do conteúdo em src/content.
// Execute via `npm run seo` (roda automaticamente antes do build).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');

// ⚠️ Mantenha igual a COMPANY.url em src/content/company.ts
const BASE_URL = 'https://www.gstarcadoficial.com.br';

const extractSlugs = (file) => {
  const txt = read(file);
  const out = [];
  const re = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(txt))) out.push(m[1]);
  return out;
};

const products = extractSlugs('src/content/products.ts');
const solucoes = extractSlugs('src/content/solucoes.ts');
const posts = extractSlugs('src/content/blog.ts');
const campaigns = extractSlugs('src/content/campaigns.ts');

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/produtos', priority: '0.9', changefreq: 'weekly' },
  { path: '/edicoes', priority: '0.8', changefreq: 'monthly' },
  { path: '/gstarcad-vs-autocad', priority: '0.9', changefreq: 'monthly' },
  { path: '/downloads', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/sobre', priority: '0.5', changefreq: 'yearly' },
  { path: '/contato', priority: '0.6', changefreq: 'yearly' },
  { path: '/orcamento', priority: '0.7', changefreq: 'yearly' },
];

const urls = [
  ...staticRoutes,
  ...products.map((s) => ({ path: `/produtos/${s}`, priority: '0.8', changefreq: 'monthly' })),
  ...solucoes.map((s) => ({ path: `/solucoes/${s}`, priority: '0.7', changefreq: 'monthly' })),
  ...posts.map((s) => ({ path: `/blog/${s}`, priority: '0.6', changefreq: 'monthly' })),
  ...campaigns.map((s) => ({ path: `/campanhas/${s}`, priority: '0.8', changefreq: 'weekly' })),
];

const today = new Date().toISOString().slice(0, 10);

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${BASE_URL}${u.path}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);

const llms =
  `# GstarCAD Brasil\n\n` +
  `> Revenda autorizada GstarCAD no Brasil. Software CAD profissional compatível com DWG, ` +
  `a alternativa ao AutoCAD com licença perpétua e suporte em português.\n\n` +
  `## Produtos\n` +
  products.map((s) => `- [${s}](${BASE_URL}/produtos/${s})`).join('\n') +
  `\n\n## Páginas principais\n` +
  staticRoutes.map((r) => `- ${BASE_URL}${r.path}`).join('\n') +
  `\n\n## Soluções por setor\n` +
  solucoes.map((s) => `- ${BASE_URL}/solucoes/${s}`).join('\n') +
  `\n\n## Blog\n` +
  posts.map((s) => `- ${BASE_URL}/blog/${s}`).join('\n') +
  `\n`;

writeFileSync(resolve(root, 'public/llms.txt'), llms);

console.log(`[seo] sitemap.xml (${urls.length} urls) e llms.txt gerados.`);
