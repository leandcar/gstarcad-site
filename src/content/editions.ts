import { EditionComparisonRow } from '../app/core/models';

// Baseado no comparativo oficial de recursos por edição (LT, Standard, Pro, Plus).
export const EDITION_COMPARISON: EditionComparisonRow[] = [
  { feature: 'Abre, salva e edita arquivos DWG', lt: true, std: true, pro: true, plus: true },
  { feature: 'Cria blocos', lt: true, std: true, pro: true, plus: true },
  { feature: 'Projetos 2D', lt: true, std: true, pro: true, plus: true },
  { feature: 'Menu Express', lt: true, std: true, pro: true, plus: true },
  { feature: 'Block Edit', lt: false, std: true, pro: true, plus: true },
  { feature: 'Bloco dinâmico', lt: false, std: true, pro: true, plus: true },
  { feature: 'Projetos 3D', lt: false, std: true, pro: true, plus: true },
  { feature: 'Programação VBA', lt: false, std: false, pro: true, plus: true },
  { feature: 'Formato IFC', lt: false, std: false, pro: false, plus: true },
  { feature: 'Restrições paramétricas', lt: false, std: false, pro: false, plus: true },
  { feature: 'Licença perpétua', lt: true, std: true, pro: true, plus: true },
];

export const EDITION_LABELS = { lt: 'LT', std: 'Standard', pro: 'Professional', plus: 'Plus' } as const;
