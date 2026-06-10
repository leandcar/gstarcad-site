// ===== Configurações globais do site =====
export const SITE = {
  /**
   * Quando true, exibe APENAS os produtos em destaque (featured) nas listagens
   * (catálogo, rodapé, busca, formulários). Os demais ficam ocultos por enquanto.
   * Mude para false para voltar a mostrar todos os produtos.
   */
  showOnlyFeatured: true,

  /**
   * Domínio canônico (sem "www"/protocolo). Usado como referência principal.
   * Deve bater com COMPANY.url e o BASE_URL em scripts/generate-seo.mjs.
   */
  baseDomain: 'gstarcadoficial.com.br',

  /**
   * TODOS os domínios que servem este site: o principal + alternativos/typo.
   * Para qualquer um deles, o apex e o "www" mostram a Home; um subdomínio
   * (ex.: 'gstarcad-2026.gstarcade.com.br') abre a campanha correspondente.
   * Adicione aqui novos domínios e configure-os no DNS/EasyPanel.
   */
  domains: [
    'gstarcadoficial.com.br',
    'gstarcade.com.br',
    'gestarcad.com.br',
  ],
};
