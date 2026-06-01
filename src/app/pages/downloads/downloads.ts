import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { whatsappLink } from '../../../content/company';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [RouterLink, CtaSection, AnimatedBg, RevealDirective],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class Downloads implements OnInit {
  private seo = inject(SeoService);
  waTrial = whatsappLink('Olá! Quero baixar a versão de avaliação do GstarCAD.');

  ngOnInit(): void {
    this.seo.apply({
      title: 'Downloads GstarCAD — Avaliação gratuita e visualizador DWG',
      description:
        'Baixe a versão de avaliação gratuita do GstarCAD por 30 dias ou o GstarCAD Viewer para ' +
        'abrir arquivos DWG de graça. Compatível com Windows.',
      path: '/downloads',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Downloads', url: '/downloads' }])],
    });
  }
}
