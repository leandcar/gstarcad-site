// ===== Modelos de domínio =====

export type Vertical = 'geral' | 'bim' | 'mechanical' | 'architecture' | 'electrical' | 'cloud';

export interface Product {
  slug: string;
  name: string;
  edition: 'LT' | 'STD' | 'PRO' | 'PLUS' | 'BIM' | 'Mechanical' | 'Architecture' | 'Electrical' | 'Cloud' | 'Houseplan' | 'Viewer';
  vertical: Vertical;
  tagline: string;
  description: string;     // descrição rica para SEO
  highlights: string[];    // bullets de destaque
  features: string[];      // lista de recursos
  specs?: { label: string; value: string }[];
  licenses: string[];      // modalidades de licença (sem valores; sob consulta)
  badge?: string;          // ex.: 'Mais vendido'
  free?: boolean;
  featured?: boolean;
  image?: string;          // imagem da caixa do produto (ex.: /media/produtos/...webp)
  icon: string;            // emoji/símbolo (fallback quando não há imagem)
  order: number;
}

export interface EditionComparisonRow {
  feature: string;
  lt: boolean | string;
  std: boolean | string;
  pro: boolean | string;
  plus: boolean | string;
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

export interface Campaign {
  slug: string;
  subdomain?: string;        // apelido do subdomínio (ex.: 'linha2026'); se omitido, usa o slug
  badge?: string;            // ex.: 'Condições especiais'
  title: string;             // headline da hero
  highlight?: string;        // trecho destacado do título
  subtitle: string;
  videoBg: string;           // /media/...mp4
  poster: string;            // /media/...jpg
  productSlugs: string[];    // produtos exibidos
  lineupImage?: string;      // imagem com a linha completa (opcional)
  benefits: { icon: string; title: string; text: string }[];
  bullets: string[];         // argumentos de venda rápidos
  ctaLabel: string;          // ex.: 'Quero um orçamento'
  whatsappMessage: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
}

export interface Company {
  name: string;
  legalName: string;
  brand: string;
  url: string;
  email: string;         // e-mail principal (comercial)
  emails: { label: string; address: string }[]; // e-mails por departamento
  phoneDisplay: string;
  whatsapp: string;      // E.164 sem '+' p/ wa.me
  city: string;
  state: string;
  description: string;
  social: { label: string; url: string }[];
}
