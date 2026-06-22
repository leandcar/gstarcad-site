import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { LeadService } from '../../core/lead.service';
import { breadcrumbLd } from '../../core/structured-data';
import { SITE, TrialInfo } from '../../../content/site-config';
import { whatsappLink } from '../../../content/company';
import { isMobileLike } from '../../core/device';
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
  /** No celular/tablet entregamos o link pelo WhatsApp (o app é de desktop). */
  mobile = signal(false);
  waUrl = signal('');

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
    const mob = isMobileLike();
    this.chosen.set(SITE.trialDownloads[os]);
    this.mobile.set(mob);
    this.waUrl.set(this.buildWa(os, v.nome));
    this.sent.set(true);

    // Celular/tablet: abre o WhatsApp AINDA no gesto do clique (evita bloqueio de pop-up).
    if (mob) {
      window.open(this.waUrl(), '_blank', 'noopener');
    }

    // Captura o lead (Agendor + conversão) em paralelo; no desktop, baixa com o token.
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
        if (!mob && r.downloadUrl) {
          this.downloadUrl.set(r.downloadUrl);
          this.startDownload(r.downloadUrl);
        }
      });
  }

  private buildWa(os: 'windows' | 'mac', nome: string): string {
    const sis = os === 'mac' ? 'macOS' : 'Windows';
    return whatsappLink(
      `Olá! Quero o link para instalar o GstarCAD 2027 (${sis}) no meu computador. Meu nome: ${nome}.`,
    );
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
