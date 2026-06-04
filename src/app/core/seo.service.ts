import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { COMPANY } from '../../content/company';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;            // ex.: '/produtos'
  image?: string;          // og:image absoluta ou relativa
  type?: 'website' | 'article' | 'product';
  jsonLd?: unknown[];      // blocos JSON-LD a injetar
}

const DEFAULT_IMAGE = '/og-default.png';
const DEFAULT_IMAGE_IS_DEFAULT = (img?: string) => !img || img === DEFAULT_IMAGE;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  apply(cfg: SeoConfig): void {
    const fullTitle = cfg.title.includes('GstarCAD') ? cfg.title : `${cfg.title} | ${COMPANY.name}`;
    const url = this.abs(cfg.path);
    const image = this.abs(cfg.image ?? DEFAULT_IMAGE);

    this.title.setTitle(fullTitle);
    this.setName('description', cfg.description);

    // Open Graph
    this.setProp('og:title', fullTitle);
    this.setProp('og:description', cfg.description);
    this.setProp('og:type', cfg.type ?? 'website');
    this.setProp('og:url', url);
    this.setProp('og:image', image);
    this.setProp('og:image:alt', fullTitle);
    if (DEFAULT_IMAGE_IS_DEFAULT(cfg.image)) {
      this.setProp('og:image:width', '1200');
      this.setProp('og:image:height', '630');
    }
    this.setProp('og:site_name', COMPANY.name);
    this.setProp('og:locale', 'pt_BR');

    // Twitter
    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', fullTitle);
    this.setName('twitter:description', cfg.description);
    this.setName('twitter:image', image);
    this.setName('twitter:image:alt', fullTitle);

    this.setCanonical(url);
    this.setJsonLd(cfg.jsonLd ?? []);
  }

  private abs(path: string): string {
    if (path.startsWith('http')) return path;
    return COMPANY.url.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }
  private setProp(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(blocks: unknown[]): void {
    // Remove blocos anteriores controlados por este serviço
    this.doc.head
      .querySelectorAll('script[type="application/ld+json"][data-seo]')
      .forEach((el) => el.remove());
    for (const block of blocks) {
      const script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', '');
      script.textContent = JSON.stringify(block);
      this.doc.head.appendChild(script);
    }
  }
}
