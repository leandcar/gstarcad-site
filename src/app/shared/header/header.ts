import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { SearchService, SearchDoc } from '../../core/search.service';
import { ContentService } from '../../core/content.service';
import { whatsappLink } from '../../../content/company';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private search = inject(SearchService);
  private router = inject(Router);
  private elRef = inject(ElementRef<HTMLElement>);
  content = inject(ContentService);

  menuOpen = signal(false);
  searchOpen = signal(false);
  query = signal('');
  results = signal<SearchDoc[]>([]);

  wa = whatsappLink();

  toggleMenu() { this.menuOpen.update((v) => !v); }
  closeMenu() { this.menuOpen.set(false); }

  toggleSearch() {
    this.searchOpen.update((v) => !v);
    if (!this.searchOpen()) this.clear();
  }

  onInput(value: string) {
    this.query.set(value);
    this.results.set(this.search.search(value, 6));
  }

  submit(ev: Event) {
    ev.preventDefault();
    const q = this.query().trim();
    if (!q) return;
    this.router.navigate(['/busca'], { queryParams: { q } });
    this.clear();
    this.searchOpen.set(false);
    this.closeMenu();
  }

  go(url: string) {
    this.router.navigateByUrl(url);
    this.clear();
    this.searchOpen.set(false);
    this.closeMenu();
  }

  private clear() {
    this.query.set('');
    this.results.set([]);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === '/' && !this.searchOpen() && !(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
      this.searchOpen.set(true);
    }
    if (e.key === 'Escape') { this.searchOpen.set(false); this.clear(); }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (this.searchOpen() && !this.elRef.nativeElement.contains(e.target as Node)) {
      this.searchOpen.set(false);
    }
  }
}
