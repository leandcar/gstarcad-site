import { Campaign } from '../app/core/models';

// ===== Landing pages de campanha =====
// Cada item gera uma página em /campanhas/:slug (pré-renderizada).
// Para criar uma nova campanha, basta adicionar um objeto aqui.
export const CAMPAIGNS: Campaign[] = [
  {
    slug: 'linha-gstarcad-2026',
    badge: 'Condições especiais por tempo limitado',
    title: 'A linha completa GstarCAD 2026',
    highlight: 'GstarCAD 2026',
    subtitle:
      'Do desenho 2D ao BIM: a alternativa econômica ao AutoCAD, 100% compatível com DWG, ' +
      'com licença perpétua e economia de até 70%. Peça sua proposta e fale com um especialista.',
    videoBg: '/media/campanha-bg.mp4',
    poster: '/media/campanha-bg.jpg',
    productSlugs: ['gstarcad-2026-lt', 'gstarcad-2026-std', 'gstarcad-2026-pro', 'gstarcad-2026-plus'],
    benefits: [
      { icon: '∞', title: 'Licença perpétua', text: 'Pague uma vez e use para sempre, sem mensalidade.' },
      { icon: '◈', title: 'Compatível com DWG', text: 'Abra e edite seus arquivos sem conversão nem perda.' },
      { icon: '⚡', title: 'Curva de aprendizado zero', text: 'Mesma interface e comandos do AutoCAD.' },
      { icon: '🛡', title: 'Suporte em português', text: 'Atendimento local, nota fiscal e ajuda na ativação.' },
    ],
    bullets: [
      'Economia de até 70% em licenças',
      'Versões para Windows, Mac e Linux',
      'CAD 2D/3D, BIM, Mecânica e mais',
      'Avaliação gratuita de 30 dias',
    ],
    ctaLabel: 'Solicitar proposta',
    whatsappMessage: 'Olá! Vi a campanha da linha GstarCAD 2026 e quero uma proposta.',
    seoTitle: 'Linha GstarCAD 2026 — Oferta e condições especiais | TLTEC',
    seoDescription:
      'Conheça a linha completa GstarCAD 2026: CAD 2D/3D e BIM, alternativa econômica ao AutoCAD, ' +
      'licença perpétua e economia de até 70%. Solicite uma proposta com condições especiais.',
  },
];
