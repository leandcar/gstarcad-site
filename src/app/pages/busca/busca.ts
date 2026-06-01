import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchService, SearchDoc } from '../../core/search.service';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './busca.html',
  styleUrl: './busca.scss',
})
export class Busca implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private search = inject(SearchService);
  private seo = inject(SeoService);

  query = signal('');
  results = signal<SearchDoc[]>([]);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';
      this.query.set(q);
      this.results.set(q ? this.search.search(q, 30) : []);
    });
    this.seo.apply({
      title: 'Busca no site',
      description: 'Pesquise produtos, soluções e artigos sobre o GstarCAD.',
      path: '/busca',
    });
  }

  onInput(value: string): void {
    this.router.navigate([], { queryParams: { q: value || null }, queryParamsHandling: 'merge', replaceUrl: true });
  }
}
