// ===== Configurações globais do site =====
export const SITE = {
  /**
   * Quando true, exibe APENAS os produtos em destaque (featured) nas listagens
   * (catálogo, rodapé, busca, formulários). Os demais ficam ocultos por enquanto.
   * Mude para false para voltar a mostrar todos os produtos.
   */
  showOnlyFeatured: true,

  /**
   * Domínio base do site (sem "www" e sem protocolo). Usado para detectar
   * subdomínios de campanha. Ex.: com baseDomain 'tltec.com.br', o subdomínio
   * 'linha2026.tltec.com.br' abre a campanha cujo `subdomain` (ou slug) é 'linha2026'.
   * Deve bater com o domínio real configurado no EasyPanel/DNS.
   */
  baseDomain: 'tltec.com.br',
};
