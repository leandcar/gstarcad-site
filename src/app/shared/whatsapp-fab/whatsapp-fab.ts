import { Component } from '@angular/core';
import { whatsappLink } from '../../../content/company';
import { reportConversion } from '../../core/analytics';

/** Botão flutuante de WhatsApp — sempre visível, com forte conversão no mobile. */
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a class="wafab" [href]="link" target="_blank" rel="noopener"
       (click)="track()" aria-label="Falar no WhatsApp">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2m0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 0 1 12 4m4.5 11c-.2.5-1 .9-1.4 1-.4 0-.8.2-2.6-.6-2.2-1-3.6-3.2-3.7-3.4-.1-.1-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.2.5-.2h.4c.2 0 .3 0 .5.4l.7 1.6c0 .2.1.3 0 .5l-.4.5-.2.2c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2 0 .4 0 .5-.1l.6-.8c.2-.2.4-.2.5-.1l1.5.7c.3.1.4.2.5.3 0 .1 0 .6-.2 1.1"/>
      </svg>
      <span class="wafab__txt">Fale no WhatsApp</span>
    </a>
  `,
  styles: [`
    .wafab {
      position: fixed; right: 16px; bottom: 16px; z-index: 80;
      display: inline-flex; align-items: center; gap: 9px;
      background: #25D366; color: #fff; font-weight: 700; font-size: .95rem;
      padding: 13px 16px; border-radius: 50px; text-decoration: none;
      box-shadow: 0 8px 24px rgba(0,0,0,.22);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .wafab:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,.28); }
    .wafab svg { flex: none; }
    @media (max-width: 600px) {
      .wafab { padding: 14px; right: 14px; bottom: 14px; }
      .wafab__txt { display: none; }
    }
  `],
})
export class WhatsappFab {
  link = whatsappLink('Olá! Tenho interesse no GstarCAD e gostaria de tirar uma dúvida.');
  track(): void { reportConversion(); }
}
