import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { breadcrumbLd } from '../../core/structured-data';
import { COMPANY } from '../../../content/company';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedBg],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.scss',
})
export class Orcamento implements OnInit {
  private fb = inject(FormBuilder);
  private content = inject(ContentService);
  private seo = inject(SeoService);

  products = this.content.products;
  sent = signal(false);

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(8)]],
    produto: ['', Validators.required],
    licenca: ['perpetua', Validators.required],
    quantidade: [1, [Validators.required, Validators.min(1)]],
    mensagem: [''],
  });

  ngOnInit(): void {
    this.seo.apply({
      title: 'Solicitar orçamento GstarCAD',
      description:
        'Peça um orçamento sem compromisso do GstarCAD. Escolha a edição, o tipo de licença e a ' +
        'quantidade. Atendimento rápido em português, com nota fiscal.',
      path: '/orcamento',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Orçamento', url: '/orcamento' }])],
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
    const licencaLabel =
      v.licenca === 'perpetua' ? 'Perpétua' : v.licenca === 'assinatura' ? 'Assinatura anual' : 'Aluguel';

    const msg =
      `*Solicitação de orçamento — GstarCAD*\n` +
      `Nome: ${v.nome}\n` +
      `E-mail: ${v.email}\n` +
      `Telefone: ${v.telefone}\n` +
      `Produto: ${prod?.name ?? v.produto}\n` +
      `Licença: ${licencaLabel}\n` +
      `Quantidade: ${v.quantidade}\n` +
      (v.mensagem ? `Mensagem: ${v.mensagem}\n` : '');

    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
    this.sent.set(true);
    window.open(url, '_blank', 'noopener');
  }
}
