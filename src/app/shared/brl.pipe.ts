import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'brl' })
export class BrlPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === undefined || value === null) return 'sob consulta';
    if (value === 0) return 'Grátis';
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }
}
