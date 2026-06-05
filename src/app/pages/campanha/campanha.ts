import { AfterViewInit, Component, ElementRef, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { faqLd } from '../../core/structured-data';
import { Campaign, Product } from '../../core/models';
import { COMPANY } from '../../../content/company';
import { ProductCard } from '../../shared/product-card/product-card';
import { FaqAccordion } from '../../shared/faq-accordion/faq-accordion';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-campanha',
  standalone: true,
  imports: [RouterLink, ProductCard, FaqAccordion, RevealDirective],
  templateUrl: './campanha.html',
  styleUrl: './campanha.scss',
})
export class Campanha implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private content = inject(ContentService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('bgvideo') bgvideo?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.bgvideo) return;
    const v = this.bgvideo.nativeElement;
    v.muted = true; // necessário para autoplay (atributo do template não basta no Angular)
    v.play().catch(() => {/* autoplay pode ser adiado até interação */});
  }

  campaign?: Campaign;
  products: Product[] = [];
  wa = '';
  waOrcamento = '';
  company = COMPANY;
  year = new Date().getFullYear();

  testimonials = this.content.testimonials;
  faq = this.content.faq.slice(0, 5);

  stats = [
    { value: 'até 70%', label: 'de economia em licenças' },
    { value: '~R$ 16 mil', label: 'economizados por ano' },
    { value: '800 mil+', label: 'usuários no mundo' },
    { value: '30 dias', label: 'de avaliação gratuita' },
  ];

  vsRows = [
    { f: 'Licença perpétua', g: true, a: false },
    { f: 'Compatível com DWG', g: true, a: true },
    { f: 'Funciona offline', g: true, a: false },
    { f: 'Curva de aprendizado zero', g: true, a: false },
    { f: 'Preço acessível', g: true, a: false },
    { f: 'Suporte em português', g: true, a: false },
  ];

  steps = [
    { n: '01', title: 'Solicite seu orçamento', text: 'Preencha o formulário ou chame no WhatsApp. Sem compromisso.' },
    { n: '02', title: 'Receba a melhor condição', text: 'Um especialista indica a edição ideal e o melhor valor para você.' },
    { n: '03', title: 'Ative e comece a usar', text: 'Enviamos a licença, o download e damos suporte na instalação.' },
  ];

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
    this.waOrcamento = this.wa;

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
        faqLd(this.faq),
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
