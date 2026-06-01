import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd, faqLd } from '../../core/structured-data';
import { FaqAccordion } from '../../shared/faq-accordion/faq-accordion';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqAccordion, CtaSection, AnimatedBg],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqPage implements OnInit {
  private content = inject(ContentService);
  private seo = inject(SeoService);
  faq = this.content.faq;

  ngOnInit(): void {
    this.seo.apply({
      title: 'Perguntas frequentes sobre o GstarCAD',
      description:
        'Tire suas dúvidas sobre GstarCAD: compatibilidade com AutoCAD, licença perpétua, edições, ' +
        'avaliação gratuita, suporte e como receber a licença.',
      path: '/faq',
      jsonLd: [
        breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'FAQ', url: '/faq' }]),
        faqLd(this.faq),
      ],
    });
  }
}
