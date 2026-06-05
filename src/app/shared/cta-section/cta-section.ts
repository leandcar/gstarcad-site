import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimatedBg } from '../animated-bg/animated-bg';
import { whatsappLink } from '../../../content/company';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink, AnimatedBg],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  @Input() title = 'Pronto para migrar para o GstarCAD?';
  @Input() subtitle =
    'Fale com um especialista e receba uma proposta sem compromisso. Atendimento em português.';
  @Input() message?: string;
  get wa() { return whatsappLink(this.message); }
}
