import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { reportConversion } from './analytics';

export interface LeadData {
  nome: string;
  empresa?: string;
  email?: string;
  telefone?: string;
  produto?: string;
  tipo?: 'proposta' | 'download' | 'saida';
  licenca?: string;
  quantidade?: number;
  mensagem?: string;
}

/**
 * Envia o lead para o backend (/api/lead), que repassa ao Agendor.
 * Falha silenciosamente (o WhatsApp continua como canal principal).
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private platformId = inject(PLATFORM_ID);

  async send(data: LeadData): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) return false;
    // Conversão do Google Ads — dispara no envio do lead (proposta/download/saída).
    reportConversion();
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, origem: location.pathname }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
