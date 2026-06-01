import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd, organizationLd } from '../../core/structured-data';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CtaSection, AnimatedBg, RevealDirective],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss',
})
export class Sobre implements OnInit {
  content = inject(ContentService);
  private seo = inject(SeoService);
  get company() { return this.content.company; }

  ngOnInit(): void {
    this.seo.apply({
      title: 'Sobre nós — Revenda autorizada GstarCAD',
      description:
        'Somos uma revenda autorizada GstarCAD no Brasil, especializada em software CAD compatível ' +
        'com DWG. Atendimento em português, nota fiscal e suporte de verdade.',
      path: '/sobre',
      jsonLd: [
        organizationLd(),
        breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Sobre', url: '/sobre' }]),
      ],
    });
  }
}
