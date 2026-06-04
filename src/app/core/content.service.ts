import { Injectable } from '@angular/core';
import { PRODUCTS } from '../../content/products';
import { EDITION_COMPARISON } from '../../content/editions';
import { FAQ } from '../../content/faq';
import { TESTIMONIALS } from '../../content/testimonials';
import { SOLUCOES } from '../../content/solucoes';
import { BLOG } from '../../content/blog';
import { COMPANY } from '../../content/company';
import { Product, Vertical } from './models';

/**
 * Fonte única de conteúdo do site. Hoje lê de arquivos em src/content.
 * Caminho de upgrade: trocar a origem por Appwrite mantendo a mesma interface.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly company = COMPANY;
  readonly editionComparison = EDITION_COMPARISON;
  readonly faq = FAQ;
  readonly testimonials = TESTIMONIALS;
  readonly solucoes = SOLUCOES;

  get products(): Product[] {
    return [...PRODUCTS].sort((a, b) => a.order - b.order);
  }

  get featuredProducts(): Product[] {
    return this.products.filter((p) => p.featured);
  }

  productBySlug(slug: string): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug);
  }

  productsByVertical(vertical: Vertical): Product[] {
    return this.products.filter((p) => p.vertical === vertical);
  }

  solucaoBySlug(slug: string) {
    return this.solucoes.find((s) => s.slug === slug);
  }

  get blogPosts() {
    return [...BLOG].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }

  blogBySlug(slug: string) {
    return BLOG.find((p) => p.slug === slug);
  }

}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
