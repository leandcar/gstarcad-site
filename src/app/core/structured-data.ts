import { Product } from './models';
import { COMPANY } from '../../content/company';

// Helpers que montam objetos JSON-LD (schema.org) para SEO e indexação por IA.

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    url: COMPANY.url,
    email: COMPANY.email,
    description: COMPANY.description,
    sameAs: COMPANY.social.map((s) => s.url),
    address: {
      '@type': 'PostalAddress',
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.state,
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+' + COMPANY.whatsapp,
      contactType: 'sales',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
    },
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.name,
    url: COMPANY.url,
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${COMPANY.url}/busca?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : COMPANY.url + it.url,
    })),
  };
}

export function productLd(p: Product) {
  const offers = p.prices
    .filter((t) => typeof t.price === 'number')
    .map((t) => ({
      '@type': 'Offer',
      price: t.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `${COMPANY.url}/produtos/${p.slug}`,
      seller: { '@type': 'Organization', name: COMPANY.legalName },
    }));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    brand: { '@type': 'Brand', name: 'GstarCAD' },
    category: 'Software CAD',
    ...(offers.length
      ? { offers: offers.length === 1 ? offers[0] : { '@type': 'AggregateOffer', priceCurrency: 'BRL', offers } }
      : {}),
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function articleLd(post: { title: string; description: string; date: string; author: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: COMPANY.legalName },
    mainEntityOfPage: `${COMPANY.url}/blog/${post.slug}`,
  };
}
