import { Component, Input, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { EditionComparisonRow } from '../../core/models';

export type EditionCol = 'lt' | 'std' | 'pro' | 'plus';

@Component({
  selector: 'app-edition-comparison',
  standalone: true,
  templateUrl: './edition-comparison.html',
  styleUrl: './edition-comparison.scss',
})
export class EditionComparison {
  /** Coluna a destacar (ex.: na ficha de um produto). */
  @Input() highlight?: EditionCol;

  private content = inject(ContentService);
  rows = this.content.editionComparison;
  cols: { key: EditionCol; label: string }[] = [
    { key: 'lt', label: 'LT' },
    { key: 'std', label: 'Standard' },
    { key: 'pro', label: 'Professional' },
    { key: 'plus', label: 'Plus' },
  ];

  cell(row: EditionComparisonRow, key: EditionCol): boolean | string {
    return row[key];
  }
  isBool(v: boolean | string): boolean {
    return typeof v === 'boolean';
  }
  /** Há alguma observação com "*" na tabela? */
  get hasNote(): boolean {
    return this.rows.some((r) =>
      this.cols.some((c) => typeof r[c.key] === 'string' && (r[c.key] as string).includes('*'))
    );
  }
}
