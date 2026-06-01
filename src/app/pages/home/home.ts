import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { whatsappLink } from '../../../content/company';
import { organizationLd, websiteLd, faqLd } from '../../core/structured-data';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { ProductCard } from '../../shared/product-card/product-card';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { FaqAccordion } from '../../shared/faq-accordion/faq-accordion';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AnimatedBg, ProductCard, CtaSection, FaqAccordion, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  content = inject(ContentService);
  private seo = inject(SeoService);

  featured = this.content.featuredProducts;
  solucoes = this.content.solucoes;
  testimonials = this.content.testimonials;
  faq = this.content.faq.slice(0, 5);
  wa = whatsappLink();

  ngOnInit(): void {
    this.seo.apply({
      title: 'GstarCAD Brasil — Alternativa ao AutoCAD compatível com DWG',
      description:
        'GstarCAD: software CAD profissional, 100% compatível com DWG e a melhor alternativa ao ' +
        'AutoCAD. Licença perpétua, preço justo e suporte em português. Peça seu orçamento.',
      path: '/',
      jsonLd: [organizationLd(), websiteLd(), faqLd(this.content.faq)],
    });
  }
}
