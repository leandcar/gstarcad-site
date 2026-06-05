import { EditionComparisonRow } from '../app/core/models';

// Matriz oficial de recursos por edição (GstarCAD 2026 LT, Standard, Pro, Plus).
export const EDITION_COMPARISON: EditionComparisonRow[] = [
  { feature: 'Desenhos em 2D', lt: true, std: true, pro: true, plus: true },
  { feature: 'Desenhos em 3D', lt: false, std: 'Visualização', pro: true, plus: true },
  { feature: 'Blocos (abertura e edição)', lt: 'Abre, não edita', std: 'Abre e edita (exceto dinâmicos)', pro: true, plus: true },
  { feature: 'Extensões CAD (DWG, DXF, etc.)', lt: true, std: true, pro: true, plus: true },
  { feature: 'Habilitação IFC', lt: false, std: false, pro: true, plus: true },
  { feature: 'Suporte para mouse 3D', lt: false, std: true, pro: true, plus: true },
  { feature: 'Importa e edita RVT', lt: false, std: false, pro: true, plus: true },
  { feature: 'Aceita aplicativos / LISPs', lt: false, std: 'Sim*', pro: true, plus: true },
  { feature: 'Aceita desenhos com restrições paramétricas', lt: false, std: false, pro: false, plus: true },
];

export const EDITION_LABELS = { lt: 'LT', std: 'Standard', pro: 'Professional', plus: 'Plus' } as const;
