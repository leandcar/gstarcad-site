import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { COMPANY } from '../../../content/company';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedBg],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class Downloads implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  private seo = inject(SeoService);

  products = this.content.products;
  sent = signal(false);

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    empresa: [''],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(8)]],
    produto: ['gstarcad-2026-pro', Validators.required],
    aceite: [false, Validators.requiredTrue],
  });

  ngOnInit(): void {
    const pre = this.route.snapshot.queryParamMap.get('produto');
    if (pre && this.content.productBySlug(pre)) this.form.controls.produto.setValue(pre);

    this.seo.apply({
      title: 'Baixar GstarCAD — Avaliação gratuita e visualizador DWG',
      description:
        'Baixe a versão de avaliação gratuita do GstarCAD por 30 dias ou o visualizador DWG. ' +
        'Informe seus dados e nossa equipe envia o link e dá todo o suporte na instalação.',
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
    const msg =
      `*Solicitação de download / versão de teste — GstarCAD*\n` +
      `Nome: ${v.nome}\n` +
      (v.empresa ? `Empresa: ${v.empresa}\n` : '') +
      `E-mail: ${v.email}\n` +
      `Telefone: ${v.telefone}\n` +
      `Produto: ${prod?.name ?? v.produto}\n` +
      `Quero receber o link de download e a versão de avaliação.`;
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
    this.sent.set(true);
    window.open(url, '_blank', 'noopener');
  }
}
