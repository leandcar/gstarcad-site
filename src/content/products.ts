import { Product } from '../app/core/models';

// ===== Catálogo GstarCAD =====
// Preços abaixo são REFERÊNCIA — ajuste para os valores reais da sua revenda.
export const PRODUCTS: Product[] = [
  {
    slug: 'gstarcad-2026-pro',
    name: 'GstarCAD 2026 Professional',
    edition: 'PRO',
    vertical: 'geral',
    tagline: 'O CAD completo para projetos profissionais — compatível com DWG.',
    description:
      'O GstarCAD 2026 Professional é a edição mais completa da plataforma: traz todos os ' +
      'recursos de produtividade, automação por API (LISP, VBA, .NET), colaboração e ferramentas ' +
      'avançadas de desenho 2D e 3D. É a alternativa profissional ao AutoCAD, com 100% de ' +
      'compatibilidade com arquivos .dwg e licença perpétua que é sua para sempre.',
    highlights: [
      '100% compatível com arquivos DWG',
      'Licença perpétua (compra única)',
      'Suporte a LISP, VBA, .NET e ObjectARX',
      'Interface idêntica ao AutoCAD — curva de aprendizado zero',
    ],
    features: [
      'Desenho 2D completo e modelagem 3D',
      'Comparação de desenhos (Drawing Compare)',
      'Gerenciador de folhas (Sheet Set)',
      'Tabelas vinculadas e campos dinâmicos',
      'Nuvem de pontos e renderização',
      'APIs: LISP, VBA, .NET, ObjectARX, GRX',
      'Colaboração e referências externas (XREF)',
      'Publicação em PDF/DWF em lote',
    ],
    specs: [
      { label: 'Sistema', value: 'Windows 10/11 (64 bits)' },
      { label: 'Formato', value: 'DWG/DXF (R2.5 até 2025)' },
      { label: 'Licença', value: 'Perpétua, por assinatura ou aluguel' },
      { label: 'Idioma', value: 'Português, Inglês, Espanhol' },
    ],
    prices: [
      { type: 'perpetua', label: 'Perpétua', price: 4950, period: 'pagamento único' },
      { type: 'assinatura', label: 'Assinatura anual', price: 1990, period: 'por ano' },
      { type: 'aluguel', label: 'Aluguel', note: 'sob consulta' },
    ],
    badge: 'Mais vendido',
    featured: true,
    icon: '◆',
    order: 1,
  },
  {
    slug: 'gstarcad-2026-std',
    name: 'GstarCAD 2026 Standard',
    edition: 'STD',
    vertical: 'geral',
    tagline: 'Todo o essencial do CAD profissional por um preço acessível.',
    description:
      'O GstarCAD 2026 Standard entrega o desenho 2D e 3D essencial com excelente desempenho e ' +
      'total compatibilidade DWG. Ideal para profissionais e escritórios que precisam de um CAD ' +
      'robusto e confiável, sem pagar caro por recursos que não usam.',
    highlights: [
      'Compatibilidade total com DWG',
      'Licença perpétua disponível',
      'Desempenho rápido e estável',
      'Ótimo custo-benefício',
    ],
    features: [
      'Desenho e edição 2D completos',
      'Modelagem 3D básica',
      'Referências externas (XREF)',
      'Layouts e impressão avançada',
      'Blocos dinâmicos',
      'Importação/exportação PDF',
    ],
    specs: [
      { label: 'Sistema', value: 'Windows 10/11 (64 bits)' },
      { label: 'Formato', value: 'DWG/DXF (R2.5 até 2025)' },
      { label: 'Licença', value: 'Perpétua, por assinatura ou aluguel' },
    ],
    prices: [
      { type: 'perpetua', label: 'Perpétua', price: 4277, period: 'pagamento único' },
      { type: 'assinatura', label: 'Assinatura anual', price: 1690, period: 'por ano' },
    ],
    featured: true,
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
      'rápido e compatível com DWG, é perfeito para estudantes, autônomos e pequenas empresas ' +
      'que precisam de uma ferramenta confiável a um custo reduzido.',
    highlights: [
      'Foco em desenho 2D',
      'Leve e rápido',
      'Compatível com DWG',
      'Menor investimento da linha',
    ],
    features: [
      'Desenho 2D completo',
      'Camadas, blocos e cotas',
      'Layouts e impressão',
      'Importação/exportação DWG/DXF/PDF',
    ],
    prices: [
      { type: 'perpetua', label: 'Perpétua', price: 2490, period: 'pagamento único' },
      { type: 'assinatura', label: 'Assinatura anual', price: 990, period: 'por ano' },
    ],
    featured: true,
    icon: '○',
    order: 3,
  },
  {
    slug: 'gstarcad-mechanical',
    name: 'GstarCAD Mechanical',
    edition: 'Mechanical',
    vertical: 'mechanical',
    tagline: 'Projeto mecânico acelerado com bibliotecas e normas integradas.',
    description:
      'O GstarCAD Mechanical adiciona ao CAD um conjunto de ferramentas especializadas para ' +
      'engenharia mecânica: bibliotecas de peças padronizadas, geração automática de listas de ' +
      'materiais (BOM), dimensionamento inteligente e cálculo de elementos — tudo seguindo normas ' +
      'internacionais. Aumente a produtividade no projeto de máquinas e componentes.',
    highlights: [
      'Biblioteca com milhares de peças padrão',
      'BOM e numeração de balões automáticos',
      'Normas ISO, ANSI, DIN, GB, JIS',
      'Cálculos de engenharia integrados',
    ],
    features: [
      'Geração automática de listas de materiais',
      'Símbolos mecânicos e tolerâncias',
      'Geradores de engrenagens, molas e eixos',
      'Cálculo de momento de inércia',
      'Base de parafusos, porcas e arruelas',
    ],
    prices: [
      { type: 'perpetua', label: 'Perpétua', note: 'sob consulta' },
      { type: 'assinatura', label: 'Assinatura anual', note: 'sob consulta' },
    ],
    icon: '⚙',
    order: 4,
  },
  {
    slug: 'gstarcad-architecture',
    name: 'GstarCAD Architecture',
    edition: 'Architecture',
    vertical: 'architecture',
    tagline: 'Projetos arquitetônicos mais rápidos com elementos paramétricos.',
    description:
      'O GstarCAD Architecture traz objetos arquitetônicos inteligentes — paredes, portas, ' +
      'janelas, escadas e telhados paramétricos — que aceleram a documentação de projetos. ' +
      'Gere plantas, cortes e tabelas automaticamente e mantenha tudo coordenado.',
    highlights: [
      'Paredes, portas e janelas paramétricas',
      'Geração automática de cortes e elevações',
      'Tabelas de áreas e ambientes',
      'Biblioteca de símbolos arquitetônicos',
    ],
    features: [
      'Objetos arquitetônicos inteligentes',
      'Documentação automática',
      'Tabelas de esquadrias',
      'Cotagem e anotação especializadas',
    ],
    prices: [
      { type: 'perpetua', label: 'Perpétua', note: 'sob consulta' },
      { type: 'assinatura', label: 'Assinatura anual', note: 'sob consulta' },
    ],
    icon: '▲',
    order: 5,
  },
  {
    slug: 'gstarcad-electrical',
    name: 'GstarCAD Electrical (MEP)',
    edition: 'Electrical',
    vertical: 'electrical',
    tagline: 'Projetos elétricos e de instalações com automação e símbolos.',
    description:
      'O GstarCAD Electrical/MEP é a solução para projetos elétricos, hidráulicos e de instalações. ' +
      'Conta com bibliotecas de símbolos elétricos, numeração automática de fios, geração de relatórios ' +
      'e ferramentas que reduzem drasticamente o tempo de projeto.',
    highlights: [
      'Bibliotecas de símbolos elétricos',
      'Numeração automática de fios e componentes',
      'Relatórios e listas de fiação',
      'Diagramas unifilares e multifilares',
    ],
    features: [
      'Símbolos elétricos padronizados',
      'Geração de relatórios automáticos',
      'Edição de circuitos inteligente',
      'Ferramentas de instalações prediais (MEP)',
    ],
    prices: [
      { type: 'perpetua', label: 'Perpétua', note: 'sob consulta' },
      { type: 'assinatura', label: 'Assinatura anual', note: 'sob consulta' },
    ],
    icon: '⚡',
    order: 6,
  },
  {
    slug: 'gstarcad-viewer',
    name: 'GstarCAD Viewer',
    edition: 'Viewer',
    vertical: 'geral',
    tagline: 'Abra e visualize arquivos DWG gratuitamente.',
    description:
      'O GstarCAD Viewer permite abrir, visualizar, medir e imprimir arquivos DWG e DXF sem custo. ' +
      'Perfeito para clientes, fornecedores e equipes que só precisam consultar desenhos.',
    highlights: [
      'Totalmente gratuito',
      'Abre DWG e DXF de qualquer versão',
      'Medições e impressão',
      'Leve e rápido',
    ],
    features: [
      'Visualização de DWG/DXF',
      'Ferramentas de medição',
      'Impressão e exportação para PDF',
      'Navegação por camadas',
    ],
    prices: [{ type: 'perpetua', label: 'Gratuito', price: 0, period: 'download grátis' }],
    free: true,
    icon: '◉',
    order: 7,
  },
];
