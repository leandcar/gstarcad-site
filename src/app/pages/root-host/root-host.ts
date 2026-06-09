import { Component, PLATFORM_ID, REQUEST, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Home } from '../home/home';
import { Campanha } from '../campanha/campanha';
import { campaignSlugForHost } from '../../core/campaign-host';

/**
 * Componente da raiz ('/'). Decide o que renderizar a partir do HOST:
 *  - subdomínio de campanha (ex.: linha2026.tltec.com.br) → landing da campanha;
 *  - domínio principal (tltec.com.br / www) → home institucional.
 *
 * Servidor (SSR) e navegador calculam o mesmo slug → hidratação sem mismatch.
 */
@Component({
  selector: 'app-root-host',
  standalone: true,
  imports: [Home, Campanha],
  template: `
    @if (slug) {
      <app-campanha [slug]="slug" />
    } @else {
      <app-home />
    }
  `,
})
export class RootHost {
  private platformId = inject(PLATFORM_ID);
  private req = inject(REQUEST, { optional: true });

  readonly slug: string | null = this.resolve();

  private resolve(): string | null {
    const host = isPlatformBrowser(this.platformId)
      ? window.location.hostname
      : (this.req?.headers.get('host') ?? null);
    return campaignSlugForHost(host);
  }
}
