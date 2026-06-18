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
   * O arquivo (~507 MB) fica no Google Drive (compartilhado como "qualquer pessoa
   * com o link"). O servidor faz proxy/stream em `/download/trial`, então o usuário
   * baixa direto da nossa página, sem ver o Drive.
   *
   * `driveId`: ID do arquivo no Google Drive (também pode vir da env DRIVE_FILE_ID,
   * que tem prioridade). Veja como obter no DEPLOY.md.
   */
  trialDownload: {
    name: 'GstarCAD 2027 (64-bit)',
    file: 'GstarCAD2027EN_x64.exe',
    size: '507 MB',
    url: '/download/trial',
    driveId: '1urZaYS7XyY8PxOyFHtGkgRGXJ2QUoRJy', // ID no Google Drive (env DRIVE_FILE_ID tem prioridade)
  },
};
