import { Injectable, inject } from '@angular/core';
import Fuse from 'fuse.js';
import { ContentService } from './content.service';

export interface SearchDoc {
  title: string;
  description: string;
  url: string;
  kind: 'Produto' | 'Solução' | 'Artigo' | 'Página' | 'FAQ';
  keywords?: string;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private content = inject(ContentService);
  private fuse?: Fuse<SearchDoc>;
  private docs: SearchDoc[] = [];

  private build(): void {
    if (this.fuse) return;
    const docs: SearchDoc[] = [];

    for (const p of this.content.products) {
      docs.push({
        title: p.name,
        description: p.tagline,
        url: `/produtos/${p.slug}`,
        kind: 'Produto',
        keywords: [p.edition, p.vertical, ...p.highlights].join(' '),
      });
    }
    for (const s of this.content.solucoes) {
      docs.push({ title: s.title, description: s.intro, url: `/solucoes/${s.slug}`, kind: 'Solução' });
    }
    for (const b of this.content.blogPosts) {
      docs.push({
        title: b.title, description: b.description, url: `/blog/${b.slug}`, kind: 'Artigo',
        keywords: b.tags.join(' '),
      });
    }
    for (const f of this.content.faq) {
      docs.push({ title: f.question, description: f.answer, url: '/faq', kind: 'FAQ' });
    }
    const pages: SearchDoc[] = [
      { title: 'Produtos', description: 'Todas as edições do GstarCAD', url: '/produtos', kind: 'Página' },
      { title: 'Comparativo de edições', description: 'LT, Standard e Professional', url: '/edicoes', kind: 'Página' },
      { title: 'GstarCAD vs AutoCAD', description: 'Comparação completa', url: '/gstarcad-vs-autocad', kind: 'Página' },
      { title: 'Downloads', description: 'Versão de avaliação e visualizador grátis', url: '/downloads', kind: 'Página' },
      { title: 'Contato', description: 'Fale com a gente', url: '/contato', kind: 'Página' },
      { title: 'Proposta', description: 'Solicite uma proposta sem compromisso', url: '/orcamento', kind: 'Página' },
    ];
    docs.push(...pages);

    this.docs = docs;
    this.fuse = new Fuse(docs, {
      includeScore: true,
      threshold: 0.4,
      ignoreLocation: true,
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'keywords', weight: 0.25 },
        { name: 'description', weight: 0.15 },
      ],
    });
  }

  search(query: string, limit = 8): SearchDoc[] {
    this.build();
    const q = query.trim();
    if (!q) return [];
    return this.fuse!.search(q, { limit }).map((r) => r.item);
  }

  all(): SearchDoc[] {
    this.build();
    return this.docs;
  }
}
