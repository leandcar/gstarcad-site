// Integração com o Google Ads (gtag.js carregado no index.html).
// Dispara o evento de conversão de forma segura (somente no navegador e se o gtag existir).

const CONVERSION_SEND_TO = 'AW-18237164244/YPuOCM65u74cENSVlPhD';

type Gtag = (command: string, action: string, params?: Record<string, unknown>) => void;

/** Reporta uma conversão do Google Ads (clique/evento). Seguro em SSR. */
export function reportConversion(value = 1.0, currency = 'BRL'): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', 'conversion', {
    send_to: CONVERSION_SEND_TO,
    value,
    currency,
  });
}
