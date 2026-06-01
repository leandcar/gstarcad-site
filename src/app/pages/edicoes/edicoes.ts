import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';

@Component({
  selector: 'app-edicoes',
  standalone: true,
  imports: [RouterLink, CtaSection, AnimatedBg],
  templateUrl: './edicoes.html',
  styleUrl: './edicoes.scss',
})
export class Edicoes implements OnInit {
  private content = inject(ContentService);
  private seo = inject(SeoService);
  rows = this.content.editionComparison;

  isBool(v: boolean | string): v is boolean { return typeof v === 'boolean'; }

  ngOnInit(): void {
    this.seo.apply({
      title: 'Comparar edições GstarCAD — LT x Standard x Professional',
      description:
        'Tabela comparativa completa das edições GstarCAD LT, Standard e Professional. Veja recursos, ' +
        'modelagem 3D, APIs e ferramentas para escolher a melhor edição.',
      path: '/edicoes',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Edições', url: '/edicoes' }])],
    });
  }
}
