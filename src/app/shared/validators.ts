import { AbstractControl, ValidationErrors } from '@angular/forms';

// ===== Telefone BR: exige DDD + 10 (fixo) ou 11 (celular) dígitos =====
export function phoneBrValidator(control: AbstractControl): ValidationErrors | null {
  const d = String(control.value ?? '').replace(/\D/g, '');
  if (!d) return null; // 'required' cuida do vazio
  return d.length === 10 || d.length === 11 ? null : { phone: true };
}

// ===== E-mail mais rígido (exige domínio com TLD) =====
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export function emailStrictValidator(control: AbstractControl): ValidationErrors | null {
  const v = String(control.value ?? '').trim();
  if (!v) return null;
  return EMAIL_RE.test(v) ? null : { email: true };
}

// ===== CPF / CNPJ (valida dígitos verificadores; opcional se vazio) =====
export function cpfCnpjValidator(control: AbstractControl): ValidationErrors | null {
  const d = String(control.value ?? '').replace(/\D/g, '');
  if (!d) return null;
  if (d.length === 11) return isValidCpf(d) ? null : { doc: true };
  if (d.length === 14) return isValidCnpj(d) ? null : { doc: true };
  return { doc: true };
}

function isValidCpf(cpf: string): boolean {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i);
  let r = (sum * 10) % 11;
  if (r === 10) r = 0;
  if (r !== +cpf[9]) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i);
  r = (sum * 10) % 11;
  if (r === 10) r = 0;
  return r === +cpf[10];
}

function isValidCnpj(c: string): boolean {
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false;
  const calc = (len: number): number => {
    const w = len === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let s = 0;
    for (let i = 0; i < len; i++) s += +c[i] * w[i];
    const r = s % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === +c[12] && calc(13) === +c[13];
}
