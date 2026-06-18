import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Raiz host-aware: home no domínio principal; campanha em subdomínios.
    path: '',
    loadComponent: () => import('./pages/root-host/root-host').then((m) => m.RootHost),
    title: 'GstarCAD Brasil — Alternativa ao AutoCAD compatível com DWG',
  },
  {
    path: 'produtos',
    loadComponent: () => import('./pages/produtos/produtos').then((m) => m.Produtos),
  },
  {
    path: 'produtos/:slug',
    loadComponent: () => import('./pages/produto/produto').then((m) => m.Produto),
  },
  {
    path: 'edicoes',
    loadComponent: () => import('./pages/edicoes/edicoes').then((m) => m.Edicoes),
  },
  {
    path: 'gstarcad-vs-autocad',
    loadComponent: () => import('./pages/vs-autocad/vs-autocad').then((m) => m.VsAutocad),
  },
  {
    path: 'solucoes/:slug',
    loadComponent: () => import('./pages/solucao/solucao').then((m) => m.Solucao),
  },
  {
    path: 'downloads',
    loadComponent: () => import('./pages/downloads/downloads').then((m) => m.Downloads),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-post/blog-post').then((m) => m.BlogPost),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.FaqPage),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre').then((m) => m.Sobre),
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contato').then((m) => m.Contato),
  },
  {
    path: 'orcamento',
    loadComponent: () => import('./pages/orcamento/orcamento').then((m) => m.Orcamento),
  },
  {
    path: 'campanhas/:slug',
    data: { bare: true },
    loadComponent: () => import('./pages/campanha/campanha').then((m) => m.Campanha),
  },
  {
    path: 'busca',
    loadComponent: () => import('./pages/busca/busca').then((m) => m.Busca),
  },
  {
    path: 'admin/link',
    loadComponent: () => import('./pages/admin-link/admin-link').then((m) => m.AdminLink),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
