import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/** Formata um telefone brasileiro: (99) 9999-9999 (fixo) ou (99) 99999-9999 (celular). */
export function formatPhoneBR(value: string): string {
  const d = (value || '').replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  // 8 dígitos → 4+4 (fixo); 9 dígitos → 5+4 (celular)
  const split = rest.length <= 8 ? 4 : 5;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

/**
 * Máscara de telefone para inputs com formControlName. Formata enquanto digita
 * e mantém o valor do FormControl sincronizado (já formatado).
 */
@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective implements AfterViewInit {
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
    const formatted = formatPhoneBR(raw);
    this.el.nativeElement.value = formatted;
    const control = this.ngControl?.control;
    if (control && control.value !== formatted) {
      control.setValue(formatted, { emitEvent: fromUser });
    }
  }
}
