import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

/** Ferramenta interna: gera um link de download temporário para enviar a clientes. */
@Component({
  selector: 'app-admin-link',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="container container--narrow">
        <h1>Gerar link de download</h1>
        <p class="lead">Crie um link temporário do instalador para enviar a um cliente.</p>

        <div class="al-card">
          <label class="field">
            <span>Chave de acesso (ADMIN_KEY)</span>
            <input type="password" [(ngModel)]="key" autocomplete="off" placeholder="cole sua chave" />
          </label>

          <label class="field">
            <span>Validade</span>
            <select [(ngModel)]="horas">
              <option [ngValue]="6">6 horas</option>
              <option [ngValue]="24">24 horas</option>
              <option [ngValue]="72">3 dias</option>
              <option [ngValue]="168">7 dias</option>
              <option [ngValue]="720">30 dias</option>
            </select>
          </label>

          <button class="btn btn--primary btn--lg btn--block" type="button"
            [disabled]="loading()" (click)="gerar()">
            {{ loading() ? 'Gerando…' : 'Gerar link' }}
          </button>

          @if (erro()) { <p class="al-erro">{{ erro() }}</p> }

          @if (url()) {
            <div class="al-result">
              <span class="al-ok">✓ Link gerado — válido por {{ expira() }}h {{ copiado() ? '· copiado!' : '' }}</span>
              <textarea readonly rows="3" #out>{{ url() }}</textarea>
              <div class="al-actions">
                <button class="btn btn--primary" type="button" (click)="copiar()">Copiar</button>
                <a class="btn btn--wa" [href]="waUrl()" target="_blank" rel="noopener">Enviar no WhatsApp</a>
                <a class="btn btn--ghost" [href]="url()" target="_blank" rel="noopener">Testar</a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .al-card { display: flex; flex-direction: column; gap: 16px; max-width: 520px; margin-top: 18px; }
    .al-result { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
    .al-result textarea { width: 100%; font-family: monospace; font-size: .85rem; padding: 10px; border-radius: 10px; border: 1px solid var(--border); resize: vertical; }
    .al-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .al-ok { color: var(--accent-2, #10B981); font-weight: 600; }
    .al-erro { color: #ef4444; font-weight: 600; }
  `],
})
export class AdminLink implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private meta = inject(Meta);
  private title = inject(Title);

  key = '';
  horas = 24;
  loading = signal(false);
  url = signal('');
  expira = signal(0);
  erro = signal('');
  copiado = signal(false);

  ngOnInit(): void {
    this.title.setTitle('Gerar link de download — Admin');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    if (isPlatformBrowser(this.platformId)) {
      this.key = localStorage.getItem('adminKey') || '';
    }
  }

  waUrl(): string {
    const msg = `Olá! Segue o link para baixar o GstarCAD (válido por ${this.expira()}h):\n${this.url()}`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }

  async gerar(): Promise<void> {
    this.erro.set('');
    this.url.set('');
    this.copiado.set(false);
    if (!this.key.trim()) { this.erro.set('Informe a chave de acesso.'); return; }
    this.loading.set(true);
    try {
      localStorage.setItem('adminKey', this.key.trim());
      const h = Math.min(720, Math.max(1, Number(this.horas) || 24));
      const res = await fetch(`/api/download-link?key=${encodeURIComponent(this.key.trim())}&horas=${h}`);
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; expiraEmHoras?: number; error?: string };
      if (!res.ok || !body.ok || !body.url) {
        this.erro.set(body.error || 'Falha ao gerar o link. Verifique a chave.');
        return;
      }
      this.url.set(body.url);
      this.expira.set(body.expiraEmHoras || h);
      this.copiar();
    } catch {
      this.erro.set('Erro de rede ao gerar o link.');
    } finally {
      this.loading.set(false);
    }
  }

  async copiar(): Promise<void> {
    if (!this.url()) return;
    try {
      await navigator.clipboard.writeText(this.url());
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 2500);
    } catch { /* clipboard indisponível */ }
  }
}
