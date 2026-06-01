import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe, CtaSection, AnimatedBg, RevealDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  private content = inject(ContentService);
  private seo = inject(SeoService);
  posts = this.content.blogPosts;

  ngOnInit(): void {
    this.seo.apply({
      title: 'Blog GstarCAD — Dicas de CAD, DWG e produtividade',
      description:
        'Artigos sobre GstarCAD, alternativas ao AutoCAD, como abrir arquivos DWG, licenciamento de ' +
        'software CAD e dicas de produtividade para projetistas e engenheiros.',
      path: '/blog',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Blog', url: '/blog' }])],
    });
  }
}
