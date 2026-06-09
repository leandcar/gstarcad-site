import { CAMPAIGNS } from '../../content/campaigns';
import { SITE } from '../../content/site-config';

/**
 * Dado um hostname (ex.: 'linha2026.tltec.com.br'), retorna o slug da campanha
 * correspondente ao subdomínio — ou null se for o site principal.
 *
 * Regras:
 *  - Ignora 'www' e o domínio apex (tltec.com.br / www.tltec.com.br).
 *  - O subdomínio casa com `campaign.subdomain` OU `campaign.slug`.
 *  - Suporta '*.localhost' para testes locais.
 *
 * É usado igual no servidor (SSR) e no navegador, garantindo hidratação consistente.
 */
export function campaignSlugForHost(hostname: string | null | undefined): string | null {
  if (!hostname) return null;
  const host = hostname.toLowerCase().split(':')[0].replace(/\.$/, '');

  const bases = [SITE.baseDomain.toLowerCase(), 'localhost'];
  let label: string | null = null;

  for (const base of bases) {
    if (host === base || host === `www.${base}`) return null;
    if (host.endsWith(`.${base}`)) {
      const sub = host.slice(0, -(`.${base}`.length));
      label = sub.split('.')[0]; // primeiro rótulo (mais à esquerda)
      break;
    }
  }

  if (!label || label === 'www') return null;

  const c = CAMPAIGNS.find((c) => c.slug === label || c.subdomain === label);
  return c ? c.slug : null;
}
