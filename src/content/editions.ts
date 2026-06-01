import { EditionComparisonRow } from '../app/core/models';

export const EDITION_COMPARISON: EditionComparisonRow[] = [
  { feature: 'Desenho e edição 2D', lt: true, std: true, pro: true },
  { feature: 'Compatibilidade DWG/DXF', lt: true, std: true, pro: true },
  { feature: 'Layouts e impressão avançada', lt: true, std: true, pro: true },
  { feature: 'Blocos dinâmicos', lt: false, std: true, pro: true },
  { feature: 'Modelagem 3D', lt: false, std: 'Básica', pro: 'Avançada' },
  { feature: 'Referências externas (XREF)', lt: 'Leitura', std: true, pro: true },
  { feature: 'Drawing Compare (comparar desenhos)', lt: false, std: false, pro: true },
  { feature: 'Sheet Set (gerenciador de folhas)', lt: false, std: false, pro: true },
  { feature: 'APIs (LISP, VBA, .NET, ObjectARX)', lt: false, std: 'LISP', pro: true },
  { feature: 'Nuvem de pontos', lt: false, std: false, pro: true },
  { feature: 'Tabelas vinculadas e campos', lt: false, std: true, pro: true },
  { feature: 'Licença perpétua', lt: true, std: true, pro: true },
];

export const EDITION_LABELS = { lt: 'LT', std: 'Standard', pro: 'Professional' } as const;
