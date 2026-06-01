import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd, faqLd } from '../../core/structured-data';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { FaqAccordion } from '../../shared/faq-accordion/faq-accordion';
import { RevealDirective } from '../../shared/reveal.directive';
import { FaqItem } from '../../core/models';

@Component({
  selector: 'app-vs-autocad',
  standalone: true,
  imports: [CtaSection, AnimatedBg, FaqAccordion, RevealDirective],
  templateUrl: './vs-autocad.html',
  styleUrl: './vs-autocad.scss',
})
export class VsAutocad implements OnInit {
  private seo = inject(SeoService);

  rows = [
    { f: 'Modelo de licença', g: 'Perpétua ou assinatura', a: 'Apenas assinatura' },
    { f: 'Custo no 1º ano', g: 'Muito menor', a: 'Alto' },
    { f: 'Custo a longo prazo', g: 'Paga uma vez', a: 'Renova todo ano' },
    { f: 'Compatibilidade DWG', g: 'Nativa, 100%', a: 'Nativa' },
    { f: 'Interface e comandos', g: 'Praticamente idênticos', a: 'Padrão do mercado' },
    { f: 'APIs (LISP, VBA, .NET)', g: 'Sim', a: 'Sim' },
    { f: 'Funciona offline', g: 'Sim', a: 'Limitado' },
    { f: 'Suporte em português', g: 'Sim, local', a: 'Limitado' },
  ];

  faq: FaqItem[] = [
    {
      question: 'Vou conseguir abrir meus arquivos do AutoCAD no GstarCAD?',
      answer:
        'Sim. O GstarCAD usa o formato DWG nativamente, então abre e salva seus arquivos do AutoCAD ' +
        'de qualquer versão sem conversão e sem perda de dados.',
    },
    {
      question: 'Preciso reaprender a usar o software?',
      answer:
        'Não. A interface, os comandos e os atalhos são praticamente idênticos aos do AutoCAD. ' +
        'A maioria dos usuários se adapta em minutos.',
    },
    {
      question: 'Quanto eu economizo trocando o AutoCAD pelo GstarCAD?',
      answer:
        'A economia chega a 70% ou mais, principalmente por causa da licença perpétua, que elimina ' +
        'as mensalidades recorrentes. Solicite um orçamento para ver o valor exato.',
    },
  ];

  ngOnInit(): void {
    this.seo.apply({
      title: 'GstarCAD vs AutoCAD — Comparação completa e qual escolher',
      description:
        'Comparativo GstarCAD x AutoCAD: licença perpétua, compatibilidade DWG, custo, recursos e ' +
        'suporte. Descubra por que o GstarCAD é a melhor alternativa ao AutoCAD.',
      path: '/gstarcad-vs-autocad',
      jsonLd: [
        breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'GstarCAD vs AutoCAD', url: '/gstarcad-vs-autocad' }]),
        faqLd(this.faq),
      ],
    });
  }
}
