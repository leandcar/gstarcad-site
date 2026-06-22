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
import { EditionComparison, EditionCol } from '../../shared/edition-comparison/edition-comparison';
import { DeviceService } from '../../core/device.service';

const EDITION_COL: Record<string, EditionCol> = { LT: 'lt', STD: 'std', PRO: 'pro', PLUS: 'plus' };

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [RouterLink, CtaSection, AnimatedBg, RevealDirective, EditionComparison],
  templateUrl: './produto.html',
  styleUrl: './produto.scss',
})
export class Produto implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private content = inject(ContentService);
  private seo = inject(SeoService);
  device = inject(DeviceService);

  product?: Product;
  wa = '';
  editionCol?: EditionCol;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.product = this.content.productBySlug(slug);
    if (!this.product) {
      this.router.navigateByUrl('/produtos');
      return;
    }
    const p = this.product;
    this.editionCol = EDITION_COL[p.edition];
    this.wa = whatsappLink(`Olá! Tenho interesse no ${p.name}. Pode me enviar uma proposta?`);

    this.seo.apply({
      title: `${p.name} — ${p.tagline}`,
      description: p.description,
      path: `/produtos/${p.slug}`,
      type: 'product',
      image: p.image,
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
