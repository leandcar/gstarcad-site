import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { ExitModal } from './shared/exit-modal/exit-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ExitModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  /** true em rotas "bare" (landing pages) → esconde header/footer globais */
  bare = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        let r = this.route.firstChild;
        while (r?.firstChild) r = r.firstChild;
        this.bare.set(!!r?.snapshot.data['bare']);
      });
  }
}
