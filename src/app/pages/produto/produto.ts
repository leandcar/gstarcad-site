import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { productLd, breadcrumbLd } from '../../core/structured-data';
import { whatsappLink } from '../../../content/company';
import { Product } from '../../core/models';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [RouterLink, CtaSection, AnimatedBg, RevealDirective],
  templateUrl: './produto.html',
  styleUrl: './produto.scss',
})
export class Produto implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private content = inject(ContentService);
  private seo = inject(SeoService);

  product?: Product;
  wa = '';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.product = this.content.productBySlug(slug);
    if (!this.product) {
      this.router.navigateByUrl('/produtos');
      return;
    }
    const p = this.product;
    this.wa = whatsappLink(`Olá! Tenho interesse no ${p.name}. Pode me enviar um orçamento?`);

    this.seo.apply({
      title: `${p.name} — ${p.tagline}`,
      description: p.description,
      path: `/produtos/${p.slug}`,
      type: 'product',
      jsonLd: [
        productLd(p),
        breadcrumbLd([
          { name: 'Início', url: '/' },
          { name: 'Produtos', url: '/produtos' },
          { name: p.name, url: `/produtos/${p.slug}` },
        ]),
      ],
    });
  }
}
