import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { LeadService } from '../../core/lead.service';
import { breadcrumbLd } from '../../core/structured-data';
import { COMPANY } from '../../../content/company';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';
import { PhoneMaskDirective } from '../../shared/phone-mask.directive';
import { DocMaskDirective } from '../../shared/doc-mask.directive';
import { phoneBrValidator, emailStrictValidator, cpfCnpjValidator } from '../../shared/validators';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedBg, PhoneMaskDirective, DocMaskDirective],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.scss',
})
export class Orcamento implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  private seo = inject(SeoService);
  private lead = inject(LeadService);

  products = this.content.products;
  sent = signal(false);

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    empresa: [''],
    email: ['', [Validators.required, emailStrictValidator]],
    telefone: ['', [Validators.required, phoneBrValidator]],
    documento: ['', [cpfCnpjValidator]],
    produto: ['', Validators.required],
    licenca: ['perpetua', Validators.required],
    quantidade: [1, [Validators.required, Validators.min(1)]],
    mensagem: [''],
  });

  ngOnInit(): void {
    const pre = this.route.snapshot.queryParamMap.get('produto');
    if (pre && this.content.productBySlug(pre)) this.form.controls.produto.setValue(pre);

    this.seo.apply({
      title: 'Solicitar proposta GstarCAD',
      description:
        'Peça uma proposta sem compromisso do GstarCAD. Escolha a edição, o tipo de licença e a ' +
        'quantidade. Atendimento rápido em português, com nota fiscal.',
      path: '/orcamento',
      jsonLd: [breadcrumbLd([{ name: 'Início', url: '/' }, { name: 'Proposta', url: '/orcamento' }])],
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
      `*Solicitação de proposta — GstarCAD*\n` +
      `Nome: ${v.nome}\n` +
      (v.empresa ? `Empresa: ${v.empresa}\n` : '') +
      `E-mail: ${v.email}\n` +
      `Telefone: ${v.telefone}\n` +
      (v.documento ? `CPF/CNPJ: ${v.documento}\n` : '') +
      `Produto: ${prod?.name ?? v.produto}\n` +
      `Licença: ${licencaLabel}\n` +
      `Quantidade: ${v.quantidade}\n` +
      (v.mensagem ? `Mensagem: ${v.mensagem}\n` : '');

    // Salva o lead no CRM (Agendor) — não bloqueia o fluxo do WhatsApp
    void this.lead.send({
      nome: v.nome,
      empresa: v.empresa,
      email: v.email,
      telefone: v.telefone,
      produto: prod?.name ?? v.produto,
      documento: v.documento,
      tipo: 'proposta',
      licenca: licencaLabel,
      quantidade: v.quantidade,
      mensagem: v.mensagem,
    });

    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
    this.sent.set(true);
    window.open(url, '_blank', 'noopener');
  }
}
