import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { LeadService } from '../../core/lead.service';
import { breadcrumbLd } from '../../core/structured-data';
import { SITE, TrialInfo } from '../../../content/site-config';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { PhoneMaskDirective } from '../../shared/phone-mask.directive';
import { phoneBrValidator, emailStrictValidator } from '../../shared/validators';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedBg, PhoneMaskDirective],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class Downloads implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  private seo = inject(SeoService);
  private lead = inject(LeadService);

  products = this.content.products;
  sent = signal(false);
  platforms = [SITE.trialDownloads.windows, SITE.trialDownloads.mac];
  /** Plataforma escolhida (para exibir nome/tamanho na confirmação). */
  chosen = signal<TrialInfo>(SITE.trialDownloads.windows);
  /** URL de download com token, retornada pelo servidor após o envio. */
  downloadUrl = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    empresa: [''],
    email: ['', [Validators.required, emailStrictValidator]],
    telefone: ['', [Validators.required, phoneBrValidator]],
    sistema: ['windows', Validators.required],
    produto: ['gstarcad-2027-pro'],
    aceite: [false, Validators.requiredTrue],
  });

  ngOnInit(): void {
    const pre = this.route.snapshot.queryParamMap.get('produto');
    if (pre && this.content.productBySlug(pre)) this.form.controls.produto.setValue(pre);

    this.seo.apply({
      title: 'Baixar GstarCAD — Avaliação gratuita e visualizador DWG',
      description:
        'Baixe a versão de avaliação gratuita do GstarCAD por 30 dias ou o visualizador DWG. ' +
        'Preencha seus dados e o download começa na hora, com suporte para a instalação.',
      path: '/downloads',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Downloads', url: '/downloads' }])],
    });
  }

  get f() { return this.form.controls; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const prod = this.content.productBySlug(v.produto);
    const os = v.sistema === 'mac' ? 'mac' : 'windows';
    this.chosen.set(SITE.trialDownloads[os]);
    this.sent.set(true);

    // Solicita o lead e recebe a URL de download com token temporário.
    this.lead
      .send({
        nome: v.nome,
        empresa: v.empresa,
        email: v.email,
        telefone: v.telefone,
        produto: prod?.name ?? v.produto,
        sistema: os,
        tipo: 'download',
      })
      .then((r) => {
        if (r.downloadUrl) {
          this.downloadUrl.set(r.downloadUrl);
          this.startDownload(r.downloadUrl);
        }
      });
  }

  /** Dispara o download do instalador (também disponível como botão na confirmação). */
  startDownload(url: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
