import { AfterViewInit, Component, HostListener, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadService } from '../../core/lead.service';
import { PhoneMaskDirective } from '../phone-mask.directive';
import { phoneBrValidator, emailStrictValidator } from '../validators';
import { SITE } from '../../../content/site-config';

/**
 * Modal de exit-intent: aparece quando o usuário vai sair (mouse em direção ao topo)
 * ou após inatividade, capturando contato para a equipe. Exibe uma vez por sessão.
 */
@Component({
  selector: 'app-exit-modal',
  standalone: true,
  imports: [ReactiveFormsModule, PhoneMaskDirective],
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

  platforms = [SITE.trialDownloads.windows, SITE.trialDownloads.mac];

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, emailStrictValidator]],
    telefone: ['', [Validators.required, phoneBrValidator]],
    sistema: ['windows', Validators.required],
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
    this.sent.set(true);

    // Captura o lead e baixa o instalador automaticamente (sem abrir o WhatsApp).
    this.lead
      .send({ nome: v.nome, email: v.email, telefone: v.telefone, sistema: v.sistema === 'mac' ? 'mac' : 'windows', tipo: 'saida' })
      .then((r) => { if (r.downloadUrl) this.startDownload(r.downloadUrl); });

    setTimeout(() => this.close(), 4000);
  }

  private startDownload(url: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.open()) this.close(); }
}
