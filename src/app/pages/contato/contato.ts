import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { whatsappLink } from '../../../content/company';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [RouterLink, AnimatedBg],
  templateUrl: './contato.html',
  styleUrl: './contato.scss',
})
export class Contato implements OnInit {
  content = inject(ContentService);
  private seo = inject(SeoService);
  get company() { return this.content.company; }
  wa = whatsappLink();

  ngOnInit(): void {
    this.seo.apply({
      title: 'Contato — Fale com a GstarCAD Brasil',
      description:
        'Entre em contato com a nossa equipe por WhatsApp, e-mail ou telefone. Tire dúvidas sobre o ' +
        'GstarCAD, licenciamento e suporte. Atendimento em português.',
      path: '/contato',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Contato', url: '/contato' }])],
    });
  }
}
