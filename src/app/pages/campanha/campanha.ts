import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { Campaign, Product } from '../../core/models';
import { COMPANY } from '../../../content/company';
import { ProductCard } from '../../shared/product-card/product-card';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-campanha',
  standalone: true,
  imports: [RouterLink, ProductCard, RevealDirective],
  templateUrl: './campanha.html',
  styleUrl: './campanha.scss',
})
export class Campanha implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private content = inject(ContentService);
  private seo = inject(SeoService);

  campaign?: Campaign;
  products: Product[] = [];
  wa = '';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.campaign = this.content.campaignBySlug(slug);
    if (!this.campaign) {
      this.router.navigateByUrl('/');
      return;
    }
    const c = this.campaign;
    this.products = c.productSlugs
      .map((s) => this.content.productBySlug(s))
      .filter((p): p is Product => !!p);
    this.wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`;

    this.seo.apply({
      title: c.seoTitle,
      description: c.seoDescription,
      path: `/campanhas/${c.slug}`,
      image: c.ogImage,
      jsonLd: [
        breadcrumbLd([
          { name: 'Início', url: '/' },
          { name: 'Campanhas', url: '/campanhas/' + c.slug },
        ]),
      ],
    });
  }

  /** título com trecho destacado */
  titleParts(): { pre: string; hl: string; post: string } {
    const c = this.campaign!;
    if (!c.highlight || !c.title.includes(c.highlight)) return { pre: c.title, hl: '', post: '' };
    const i = c.title.indexOf(c.highlight);
    return {
      pre: c.title.slice(0, i),
      hl: c.highlight,
      post: c.title.slice(i + c.highlight.length),
    };
  }
}
