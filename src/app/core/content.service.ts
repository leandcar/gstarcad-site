import { Injectable } from '@angular/core';
import { PRODUCTS } from '../../content/products';
import { EDITION_COMPARISON } from '../../content/editions';
import { FAQ } from '../../content/faq';
import { TESTIMONIALS } from '../../content/testimonials';
import { SOLUCOES } from '../../content/solucoes';
import { BLOG } from '../../content/blog';
import { CAMPAIGNS } from '../../content/campaigns';
import { COMPANY } from '../../content/company';
import { SITE } from '../../content/site-config';
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

  /** Flag global: exibir apenas produtos em destaque nas listagens. */
  readonly showOnlyFeatured = SITE.showOnlyFeatured;

  /** Todos os produtos (uso interno; ignora a flag). */
  get allProducts(): Product[] {
    return [...PRODUCTS].sort((a, b) => a.order - b.order);
  }

  /** Produtos listados publicamente (respeita a flag showOnlyFeatured). */
  get products(): Product[] {
    return SITE.showOnlyFeatured ? this.featuredProducts : this.allProducts;
  }

  get featuredProducts(): Product[] {
    return this.allProducts.filter((p) => p.featured);
  }

  /** Busca em TODOS os produtos (mantém páginas de detalhe acessíveis por link direto). */
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

  get campaigns() {
    return CAMPAIGNS;
  }

  campaignBySlug(slug: string) {
    return CAMPAIGNS.find((c) => c.slug === slug);
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
