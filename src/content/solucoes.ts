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
    name: 'Arquitetura e BIM',
    title: 'GstarBIM para Arquitetura e Interiores',
    intro:
      'Projete e documente mais rápido com BIM completo: modelagem paramétrica, design de ' +
      'interiores, renderização com IA e exportação nativa para Revit (.RVT) e IFC.',
    benefits: [
      { title: 'Modelagem paramétrica', text: 'Paredes, lajes, escadas, portas e janelas inteligentes.' },
      { title: 'Documentação automática', text: 'Plantas, cortes e elevações gerados do modelo 3D.' },
      { title: 'Design de interiores', text: 'Ferramentas de mobiliário, KBB e acabamentos.' },
      { title: 'openBIM (IFC) e Revit', text: 'Exportação nativa para .RVT e certificação IFC.' },
    ],
    productSlug: 'gstarbim-pro',
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
