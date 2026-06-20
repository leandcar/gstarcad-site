import { Component, PLATFORM_ID, REQUEST, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { ExitModal } from './shared/exit-modal/exit-modal';
import { WhatsappFab } from './shared/whatsapp-fab/whatsapp-fab';
import { campaignSlugForHost } from './core/campaign-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ExitModal, WhatsappFab],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private req = inject(REQUEST, { optional: true });

  /** true em rotas "bare" (landing pages) → esconde header/footer globais */
  bare = signal(false);

  constructor() {
    // Em subdomínio de campanha, a raiz já nasce "bare" (sem header/footer).
    this.update();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.update());
  }

  private update(): void {
    let r = this.route.firstChild;
    while (r?.firstChild) r = r.firstChild;
    const dataBare = !!r?.snapshot.data['bare'];

    // Raiz servida por subdomínio de campanha também é "bare".
    const url = this.router.url.split('?')[0];
    const campaignRoot = url === '/' && !!campaignSlugForHost(this.currentHost());

    this.bare.set(dataBare || campaignRoot);
  }

  private currentHost(): string | null {
    if (isPlatformBrowser(this.platformId)) return window.location.hostname;
    return this.req?.headers.get('host') ?? null;
  }
}
