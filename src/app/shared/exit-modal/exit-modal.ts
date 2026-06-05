import { AfterViewInit, Component, HostListener, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { COMPANY } from '../../../content/company';
import { LeadService } from '../../core/lead.service';

/**
 * Modal de exit-intent: aparece quando o usuário vai sair (mouse em direção ao topo)
 * ou após inatividade, capturando contato para a equipe. Exibe uma vez por sessão.
 */
@Component({
  selector: 'app-exit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './exit-modal.html',
  styleUrl: './exit-modal.scss',
})
export class ExitModal implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private lead = inject(LeadService);

  /** Páginas onde o pop-up NÃO deve aparecer (usuário já está num formulário). */
  private readonly blockedRoutes = ['/orcamento', '/downloads'];

  open = signal(false);
  sent = signal(false);

  private shown = false;
  private idleTimer?: ReturnType<typeof setTimeout>;
  private readonly KEY = 'exitModalShown';
  private readonly IDLE_MS = 40000;
  private readonly events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      if (sessionStorage.getItem(this.KEY)) { this.shown = true; return; }
    } catch { /* sessionStorage indisponível */ }
    document.addEventListener('mouseout', this.onMouseOut);
    this.events.forEach((e) => window.addEventListener(e, this.onActivity, { passive: true }));
    this.resetIdle();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.removeEventListener('mouseout', this.onMouseOut);
    this.events.forEach((e) => window.removeEventListener(e, this.onActivity));
    clearTimeout(this.idleTimer);
  }

  private onActivity = () => { if (!this.open()) this.resetIdle(); };
  private resetIdle() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.trigger(), this.IDLE_MS);
  }
  private onMouseOut = (e: MouseEvent) => {
    if (e.clientY <= 0 && !e.relatedTarget) this.trigger();
  };

  private trigger() {
    if (this.shown || this.open()) return;
    // Não exibe em páginas de formulário (orçamento/download)
    const url = this.router.url.split('?')[0];
    if (this.blockedRoutes.some((r) => url.startsWith(r))) return;
    this.shown = true;
    try { sessionStorage.setItem(this.KEY, '1'); } catch { /* ignore */ }
    clearTimeout(this.idleTimer);
    this.open.set(true);
  }

  close() { this.open.set(false); }
  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('xm')) this.close();
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const msg =
      `*Quero testar o GstarCAD*\n` +
      `Nome: ${v.nome}\n` +
      `E-mail: ${v.email}\n` +
      `Telefone: ${v.telefone}\n` +
      `Vim pelo aviso de saída do site e quero baixar a versão de teste.`;

    void this.lead.send({
      nome: v.nome,
      email: v.email,
      telefone: v.telefone,
      tipo: 'saida',
    });

    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    this.sent.set(true);
    setTimeout(() => this.close(), 1800);
  }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.open()) this.close(); }
}
