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

  /**
   * Instalador de avaliação (trial) entregue após o formulário de download.
   * É um único instalador — a edição (LT/STD/PRO/PLUS) é definida pela licença.
   *
   * `url`: em PRODUÇÃO use um link hospedado (o arquivo tem ~507 MB e NÃO vai no
   * Git/Docker). Para teste local, coloque o .exe em `public/arquivos/` (ignorado
   * pelo Git) e mantenha o caminho abaixo.
   */
  trialDownload: {
    name: 'GstarCAD 2027 (64-bit)',
    url: '/arquivos/GstarCAD2027EN_x64.exe',
    size: '507 MB',
  },
};
