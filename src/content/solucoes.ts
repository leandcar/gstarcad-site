import { SolucaoVertical } from '../app/core/models';

export const SOLUCOES: SolucaoVertical[] = [
  {
    slug: 'mechanical',
    name: 'Engenharia Mecânica',
    title: 'GstarCAD para Engenharia Mecânica',
    intro:
      'Acelere o projeto de máquinas e componentes com ferramentas especializadas, bibliotecas de ' +
      'peças padronizadas e geração automática de listas de materiais.',
    benefits: [
      { title: 'Bibliotecas padronizadas', text: 'Milhares de peças conforme ISO, ANSI, DIN, GB e JIS prontas para uso.' },
      { title: 'BOM automático', text: 'Listas de materiais e numeração de balões geradas automaticamente.' },
      { title: 'Cálculos integrados', text: 'Geradores de engrenagens, molas, eixos e cálculo de inércia.' },
      { title: 'Tolerâncias e símbolos', text: 'Símbolos mecânicos e tolerâncias geométricas conforme norma.' },
    ],
    productSlug: 'gstarcad-mechanical',
  },
  {
    slug: 'architecture',
    name: 'Arquitetura',
    title: 'GstarCAD para Arquitetura',
    intro:
      'Projete e documente mais rápido com objetos arquitetônicos paramétricos e geração ' +
      'automática de cortes, elevações e tabelas.',
    benefits: [
      { title: 'Objetos paramétricos', text: 'Paredes, portas, janelas, escadas e telhados inteligentes.' },
      { title: 'Documentação automática', text: 'Cortes e elevações gerados a partir do modelo.' },
      { title: 'Tabelas de áreas', text: 'Quadros de áreas e esquadrias atualizados automaticamente.' },
      { title: 'Biblioteca de símbolos', text: 'Símbolos e blocos arquitetônicos prontos.' },
    ],
    productSlug: 'gstarcad-architecture',
  },
  {
    slug: 'electrical',
    name: 'Elétrica e Instalações',
    title: 'GstarCAD para Projetos Elétricos e MEP',
    intro:
      'Reduza o tempo de projetos elétricos e de instalações com símbolos padronizados, ' +
      'numeração automática de fios e geração de relatórios.',
    benefits: [
      { title: 'Símbolos elétricos', text: 'Bibliotecas completas de componentes elétricos.' },
      { title: 'Numeração automática', text: 'Fios e componentes numerados sem trabalho manual.' },
      { title: 'Relatórios e listas', text: 'Listas de fiação e relatórios gerados automaticamente.' },
      { title: 'Diagramas', text: 'Unifilares, multifilares e instalações prediais (MEP).' },
    ],
    productSlug: 'gstarcad-electrical',
  },
];
