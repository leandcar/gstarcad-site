// ===== Modelos de domínio =====

export type LicenseType = 'perpetua' | 'assinatura' | 'aluguel';
export type Vertical = 'geral' | 'mechanical' | 'architecture' | 'electrical';

export interface PriceTier {
  type: LicenseType;
  label: string;
  price?: number;        // BRL; opcional (sob consulta)
  period?: string;       // ex.: 'pagamento único', 'por ano'
  note?: string;
}

export interface Product {
  slug: string;
  name: string;
  edition: 'LT' | 'STD' | 'PRO' | 'Mechanical' | 'Architecture' | 'Electrical' | 'Viewer';
  vertical: Vertical;
  tagline: string;
  description: string;     // descrição rica para SEO
  highlights: string[];    // bullets de destaque
  features: string[];      // lista de recursos
  specs?: { label: string; value: string }[];
  prices: PriceTier[];
  badge?: string;          // ex.: 'Mais vendido'
  free?: boolean;
  featured?: boolean;
  icon: string;            // emoji/símbolo (placeholder de ícone)
  order: number;
}

export interface EditionComparisonRow {
  feature: string;
  lt: boolean | string;
  std: boolean | string;
  pro: boolean | string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface SolucaoVertical {
  slug: 'mechanical' | 'architecture' | 'electrical';
  name: string;
  title: string;
  intro: string;
  benefits: { title: string; text: string }[];
  productSlug: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;        // ISO
  author: string;
  tags: string[];
  cover?: string;
  body: string;        // markdown simplificado / HTML básico
  readingMinutes: number;
}

export interface Company {
  name: string;
  legalName: string;
  brand: string;
  url: string;
  email: string;
  phoneDisplay: string;
  whatsapp: string;      // E.164 sem '+' p/ wa.me
  city: string;
  state: string;
  description: string;
  social: { label: string; url: string }[];
}
