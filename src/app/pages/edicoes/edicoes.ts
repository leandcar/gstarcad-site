import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { EditionComparison } from '../../shared/edition-comparison/edition-comparison';

@Component({
  selector: 'app-edicoes',
  standalone: true,
  imports: [RouterLink, CtaSection, AnimatedBg, EditionComparison],
  templateUrl: './edicoes.html',
  styleUrl: './edicoes.scss',
})
export class Edicoes implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Comparar edições GstarCAD — LT, Standard, Professional e Plus',
      description:
        'Tabela comparativa completa das edições GstarCAD 2027 LT, Standard, Professional e Plus. ' +
        'Veja recursos, modelagem 3D, IFC, APIs e ferramentas para escolher a melhor edição.',
      path: '/edicoes',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Edições', url: '/edicoes' }])],
    });
  }
}
