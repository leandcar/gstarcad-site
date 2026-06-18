import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/** Formata CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) conforme a quantidade de dígitos. */
export function formatDocBR(value: string): string {
  const d = (value || '').replace(/\D/g, '').slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
}

/** Máscara de CPF/CNPJ para inputs com formControlName. */
@Directive({
  selector: '[appDocMask]',
  standalone: true,
})
export class DocMaskDirective implements AfterViewInit {
  private el = inject(ElementRef<HTMLInputElement>);
  private ngControl = inject(NgControl, { self: true, optional: true });

  ngAfterViewInit(): void {
    const v = this.el.nativeElement.value;
    if (v) this.apply(v, false);
  }

  @HostListener('input', ['$event'])
  onInput(e: Event): void {
    this.apply((e.target as HTMLInputElement).value, true);
  }

  private apply(raw: string, fromUser: boolean): void {
    const formatted = formatDocBR(raw);
    this.el.nativeElement.value = formatted;
    const control = this.ngControl?.control;
    if (control && control.value !== formatted) {
      control.setValue(formatted, { emitEvent: fromUser });
    }
  }
}
