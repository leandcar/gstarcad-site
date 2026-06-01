import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { ProductCard } from '../../shared/product-card/product-card';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { RevealDirective } from '../../shared/reveal.directive';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { Vertical } from '../../core/models';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [ProductCard, CtaSection, RevealDirective, AnimatedBg],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos implements OnInit {
  private content = inject(ContentService);
  private seo = inject(SeoService);

  filter = signal<Vertical | 'all'>('all');
  filters: { key: Vertical | 'all'; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'geral', label: 'CAD geral' },
    { key: 'mechanical', label: 'Mecânica' },
    { key: 'architecture', label: 'Arquitetura' },
    { key: 'electrical', label: 'Elétrica / MEP' },
  ];

  products = computed(() => {
    const f = this.filter();
    return f === 'all' ? this.content.products : this.content.productsByVertical(f);
  });

  ngOnInit(): void {
    this.seo.apply({
      title: 'Produtos GstarCAD — Edições LT, Standard e Professional',
      description:
        'Conheça toda a linha GstarCAD: edições LT, Standard e Professional, além das soluções ' +
        'Mechanical, Architecture e Electrical. Compatível com DWG e licença perpétua.',
      path: '/produtos',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Produtos', url: '/produtos' }])],
    });
  }
}
