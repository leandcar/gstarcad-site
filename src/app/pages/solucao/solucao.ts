import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { SolucaoVertical, Product } from '../../core/models';
import { ProductCard } from '../../shared/product-card/product-card';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-solucao',
  standalone: true,
  imports: [RouterLink, ProductCard, CtaSection, AnimatedBg, RevealDirective],
  templateUrl: './solucao.html',
  styleUrl: './solucao.scss',
})
export class Solucao implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private content = inject(ContentService);
  private seo = inject(SeoService);

  sol?: SolucaoVertical;
  product?: Product;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.sol = this.content.solucaoBySlug(slug);
    if (!this.sol) {
      this.router.navigateByUrl('/produtos');
      return;
    }
    this.product = this.content.productBySlug(this.sol.productSlug);
    this.seo.apply({
      title: `${this.sol.title}`,
      description: this.sol.intro,
      path: `/solucoes/${this.sol.slug}`,
      jsonLd: [
        breadcrumbLd([
          { name: 'Início', url: '/' },
          { name: 'Soluções', url: '/produtos' },
          { name: this.sol.name, url: `/solucoes/${this.sol.slug}` },
        ]),
      ],
    });
  }
}
