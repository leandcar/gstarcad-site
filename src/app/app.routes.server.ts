import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from '../content/products';
import { SOLUCOES } from '../content/solucoes';
import { BLOG } from '../content/blog';

export const serverRoutes: ServerRoute[] = [
  // Rotas dinâmicas via SSR (sempre frescas)
  { path: 'busca', renderMode: RenderMode.Server },
  { path: 'orcamento', renderMode: RenderMode.Server },

  // Rotas dinâmicas pré-renderizadas a partir do conteúdo
  {
    path: 'produtos/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRODUCTS.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'solucoes/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SOLUCOES.map((s) => ({ slug: s.slug })),
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG.map((b) => ({ slug: b.slug })),
  },

  // Demais rotas estáticas → pré-renderizadas
  { path: '**', renderMode: RenderMode.Prerender },
];
