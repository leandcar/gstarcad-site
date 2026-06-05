import { Product } from '../app/core/models';

// ===== Catálogo GstarCAD / Gstarsoft =====
// Sem valores: preços são informados por um especialista (foco em orçamento/contato).
export const PRODUCTS: Product[] = [
  {
    slug: 'gstarcad-2026-pro',
    name: 'GstarCAD 2026 Professional',
    edition: 'PRO',
    vertical: 'geral',
    tagline: 'O CAD profissional completo — alternativa econômica ao AutoCAD.',
    description:
      'O GstarCAD 2026 Professional é a edição mais completa da plataforma CAD: desenho 2D, ' +
      'modelagem 3D, automação por API (LISP, VBA, .NET, ObjectARX) e ferramentas avançadas de ' +
      'produtividade. 100% compatível com arquivos DWG/DXF (R12 até a versão mais atual), com ' +
      'interface e comandos idênticos ao AutoCAD — curva de aprendizado zero. Licença perpétua, ' +
      'sem mensalidade, com economia de até 70% frente à assinatura tradicional.',
    highlights: [
      '100% compatível com DWG/DXF',
      'Licença perpétua (sem mensalidade)',
      'Curva de aprendizado zero para quem usa AutoCAD',
      'Economia de até 70% no custo de licenças',
    ],
    features: [
      'Desenho 2D completo e modelagem 3D',
      'Suporte a LISP, VBA, .NET e ObjectARX',
      'Importa plotagem, templates, blocos e lisps existentes',
      'Comparação de desenhos e gerenciador de folhas',
      'Blocos dinâmicos e restrições paramétricas',
      'Publicação em PDF/DWF em lote',
    ],
    specs: [
      { label: 'Sistema', value: 'Windows, Mac e Linux' },
      { label: 'Formato', value: 'DWG/DXF (R12 até o atual)' },
      { label: 'Licença', value: 'Perpétua — individual ou em rede' },
      { label: 'Idioma', value: 'Português' },
    ],
    licenses: ['Licença perpétua', 'Assinatura anual', 'Individual ou em rede'],
    badge: 'Mais vendido',
    featured: true,
    image: '/media/produtos/gstarcad-2026-pro.webp',
    icon: '◆',
    order: 3,
  },
  {
    slug: 'gstarbim-pro',
    name: 'GstarBIM PRO',
    edition: 'BIM',
    vertical: 'bim',
    tagline: 'Software BIM completo para arquitetura e design de interiores.',
    description:
      'O GstarBIM é um software CAD/BIM 3D que cobre todas as fases do projeto — do conceito à ' +
      'documentação técnica. Construído sobre 30 anos de experiência do ARCHLine.XP, oferece ' +
      'modelagem paramétrica de arquitetura, design de interiores, MEP, renderização com IA e ' +
      'D5 Render, Point Cloud (Scan-to-BIM) e compatibilidade com mais de 50 formatos, incluindo ' +
      'exportação nativa para Revit (.RVT) e certificação openBIM (IFC). Licença perpétua, com ' +
      'até 70% de economia frente a Revit e Archicad.',
    highlights: [
      'BIM completo: arquitetura + interiores + MEP',
      'Exportação nativa para Revit (.RVT) e IFC',
      'Renderização com IA + D5 Render',
      'Licença perpétua — economia de até 70%',
    ],
    features: [
      'Modelagem paramétrica (paredes, lajes, escadas, portas)',
      'Documentação automática (plantas, cortes, elevações)',
      'Design de interiores e KBB (cozinhas e banheiros)',
      'Point Cloud e Scan-to-BIM com detecção por IA',
      '50+ formatos: DWG, IFC, RVT, SKP, FBX, OBJ',
      'AI Render + D5 Render (GPU, tempo real)',
    ],
    specs: [
      { label: 'Base', value: 'Tecnologia ARCHLine.XP (30 anos)' },
      { label: 'Interoperabilidade', value: '50+ formatos (DWG, IFC, RVT…)' },
      { label: 'Certificação', value: 'buildingSMART — IFC 2x3 e 4.x' },
      { label: 'Licença', value: 'Perpétua (LT e PRO)' },
    ],
    licenses: ['Licença perpétua', 'Versões LT e PRO'],
    badge: 'BIM completo',
    image: '/media/produtos/gstarbim-pro.webp',
    icon: '▦',
    order: 4,
  },
  {
    slug: 'gstarcad-2026-std',
    name: 'GstarCAD 2026 Standard',
    edition: 'STD',
    vertical: 'geral',
    tagline: 'Todo o essencial do CAD profissional, com ótimo custo-benefício.',
    description:
      'O GstarCAD 2026 Standard entrega o desenho 2D e 3D essencial com excelente desempenho e ' +
      'total compatibilidade DWG. Ideal para profissionais e escritórios que precisam de um CAD ' +
      'robusto, estável e econômico, com licença perpétua.',
    highlights: [
      'Compatibilidade total com DWG/DXF',
      'Licença perpétua disponível',
      'Desempenho rápido e estável',
      'Excelente custo-benefício',
    ],
    features: [
      'Desenho e edição 2D completos',
      'Modelagem 3D',
      'Blocos dinâmicos e Block Edit',
      'Referências externas (XREF)',
      'Menu Express',
      'Importação/exportação PDF',
    ],
    licenses: ['Licença perpétua', 'Assinatura anual', 'Individual ou em rede'],
    featured: true,
    image: '/media/produtos/gstarcad-2026-std.webp',
    icon: '◇',
    order: 2,
  },
  {
    slug: 'gstarcad-2026-lt',
    name: 'GstarCAD 2026 LT',
    edition: 'LT',
    vertical: 'geral',
    tagline: 'Desenho 2D rápido e econômico para quem está começando.',
    description:
      'O GstarCAD 2026 LT é a porta de entrada ideal para o desenho 2D profissional. Leve, ' +
      'rápido e compatível com DWG, é perfeito para estudantes, autônomos e pequenas empresas.',
    highlights: ['Foco em desenho 2D', 'Leve e rápido', 'Compatível com DWG', 'Menor investimento da linha'],
    features: [
      'Desenho 2D completo',
      'Criação de blocos',
      'Camadas, cotas e layouts',
      'Importação/exportação DWG/DXF/PDF',
    ],
    licenses: ['Licença perpétua', 'Assinatura anual'],
    image: '/media/produtos/gstarcad-2026-lt.webp',
    featured: true,
    icon: '○',
    order: 1,
  },
  {
    slug: 'gstarcad-2026-plus',
    name: 'GstarCAD 2026 Plus',
    edition: 'PLUS',
    vertical: 'geral',
    tagline: 'O máximo da linha: 3D avançado, IFC e restrições paramétricas.',
    description:
      'O GstarCAD 2026 Plus reúne todos os recursos profissionais da plataforma, incluindo ' +
      'projetos 3D avançados, programação VBA, suporte ao formato IFC e restrições paramétricas — ' +
      'a escolha de quem precisa do conjunto mais completo de ferramentas CAD.',
    highlights: [
      'Conjunto mais completo da linha',
      'Suporte ao formato IFC',
      'Restrições paramétricas',
      'Programação VBA e APIs',
    ],
    features: [
      'Tudo do Professional',
      'Projetos 3D avançados',
      'Formato IFC (BIM)',
      'Restrições paramétricas',
      'Block Edit e blocos dinâmicos',
    ],
    licenses: ['Licença perpétua', 'Individual ou em rede'],
    image: '/media/produtos/gstarcad-2026-plus.webp',
    icon: '◈',
    order: 5,
  },
  {
    slug: 'gstarcad-mechanical',
    name: 'GstarCAD Mechanical',
    edition: 'Mechanical',
    vertical: 'mechanical',
    tagline: 'CAD para manufatura e projetos mecânicos industriais.',
    description:
      'O GstarCAD Mechanical adiciona ferramentas especializadas para engenharia mecânica: ' +
      'bibliotecas de peças padronizadas (ISO, ANSI, DIN, GB, JIS), geração automática de listas ' +
      'de materiais (BOM), símbolos e tolerâncias, e geradores de elementos. Aumente a ' +
      'produtividade no projeto de máquinas e componentes.',
    highlights: [
      'Biblioteca com milhares de peças padrão',
      'BOM e numeração de balões automáticos',
      'Normas ISO, ANSI, DIN, GB, JIS',
      'Geradores de engrenagens, molas e eixos',
    ],
    features: [
      'Listas de materiais automáticas',
      'Símbolos mecânicos e tolerâncias',
      'Cálculo de momento de inércia',
      'Base de parafusos, porcas e arruelas',
    ],
    licenses: ['Licença perpétua', 'Assinatura anual'],
    icon: '⚙',
    order: 6,
  },
  {
    slug: 'gstarcad-365',
    name: 'GstarCAD 365',
    edition: 'Cloud',
    vertical: 'cloud',
    tagline: 'Design colaborativo na nuvem com compartilhamento de DWG.',
    description:
      'O GstarCAD 365 leva o seu CAD para a nuvem: acesse, edite e compartilhe arquivos DWG de ' +
      'qualquer lugar, em equipe, mantendo total compatibilidade com a plataforma desktop. ' +
      'Colaboração em tempo real para equipes distribuídas.',
    highlights: [
      'Acesso aos projetos na nuvem',
      'Compartilhamento e colaboração em DWG',
      'Integração com o GstarCAD desktop',
      'Trabalhe de qualquer lugar',
    ],
    features: [
      'Edição de DWG no navegador',
      'Compartilhamento de projetos',
      'Colaboração em equipe',
      'Sincronização com o desktop',
    ],
    licenses: ['Assinatura', 'Planos por equipe'],
    icon: '☁',
    order: 7,
  },
  {
    slug: 'houseplan',
    name: 'Houseplan 2.0',
    edition: 'Houseplan',
    vertical: 'architecture',
    tagline: 'Modelagem 3D leve e renderização em tempo real.',
    description:
      'O Houseplan 2.0 é uma solução de modelagem 3D leve e renderização em tempo real, ideal ' +
      'para apresentar ideias e projetos de forma rápida e visual, sem a complexidade de ' +
      'softwares pesados.',
    highlights: [
      'Modelagem 3D leve e intuitiva',
      'Renderização em tempo real',
      'Apresentações rápidas de projeto',
      'Curva de aprendizado curta',
    ],
    features: [
      'Modelagem 3D simplificada',
      'Render em tempo real',
      'Biblioteca de elementos',
      'Exportação de imagens',
    ],
    licenses: ['Licença perpétua', 'Assinatura'],
    icon: '⌂',
    order: 8,
  },
  {
    slug: 'gstarcad-electrical',
    name: 'AutoPower — Projetos Elétricos',
    edition: 'Electrical',
    vertical: 'electrical',
    tagline: 'Projetos elétricos completos integrados ao CAD.',
    description:
      'O AutoPower é o aplicativo para projetos elétricos incorporado ao GstarCAD: automatiza ' +
      'cálculos, oferece biblioteca completa de símbolos e gera diagramas e quadros elétricos ' +
      'automaticamente — reduzindo erros e tempo de projeto em instalações de baixa e média tensão.',
    highlights: [
      'Integrado ao ambiente CAD (DWG)',
      'Cálculos elétricos automatizados',
      'Bibliotecas de símbolos e componentes',
      'Diagramas e quadros automáticos',
    ],
    features: [
      'Projetos residenciais, comerciais e industriais',
      'Dimensionamento de circuitos',
      'Diagramas unifilares',
      'Módulos: cabeamento, SPDA, fotovoltaico',
    ],
    licenses: ['Licença perpétua', 'Por usuário ou empresa'],
    icon: '⚡',
    order: 9,
  },
  {
    slug: 'gstarcad-viewer',
    name: 'DWG FastView (Visualizador)',
    edition: 'Viewer',
    vertical: 'geral',
    tagline: 'Abra e visualize arquivos DWG gratuitamente.',
    description:
      'O DWG FastView é o visualizador leve da Gstarsoft para abrir, visualizar, medir e imprimir ' +
      'arquivos DWG e DXF — gratuitamente, no navegador, no celular ou no desktop. Perfeito para ' +
      'clientes, fornecedores e equipes que só precisam consultar desenhos.',
    highlights: [
      'Totalmente gratuito',
      'Web, mobile e desktop',
      'Abre DWG e DXF de qualquer versão',
      'Medições e impressão',
    ],
    features: [
      'Visualização de DWG/DXF',
      'Ferramentas de medição',
      'Navegação por camadas',
      'Disponível em vários dispositivos',
    ],
    licenses: ['Gratuito'],
    free: true,
    icon: '◉',
    order: 10,
  },
];
