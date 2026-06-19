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
   * (ex.: 'gstarcad-2027.gstarcade.com.br') abre a campanha correspondente.
   * Adicione aqui novos domínios e configure-os no DNS/EasyPanel.
   */
  domains: [
    'gstarcadoficial.com.br',
    'gstarcade.com.br',
    'gestarcad.com.br',
  ],

  /**
   * Instaladores de avaliação (trial) por sistema operacional.
   * Cada arquivo fica no Google Drive (compartilhado como "qualquer pessoa com o link");
   * o servidor faz proxy/stream em `/d/:token`, então o usuário baixa direto da nossa
   * página, sem ver o Drive. O token carrega o sistema escolhido (assinado).
   *
   * `driveId`: ID do arquivo no Google Drive. Envs têm prioridade:
   *   - Windows: DRIVE_FILE_ID (ou DRIVE_FILE_ID_WINDOWS)
   *   - macOS:   DRIVE_FILE_ID_MAC
   */
  trialDownloads: {
    windows: {
      id: 'windows' as const,
      label: 'Windows',
      name: 'GstarCAD 2027 — Windows (64-bit)',
      file: 'GstarCAD2027EN_x64.exe',
      size: '507 MB',
      driveId: '1urZaYS7XyY8PxOyFHtGkgRGXJ2QUoRJy',
    },
    mac: {
      id: 'mac' as const,
      label: 'macOS',
      name: 'GstarCAD 2027 — macOS',
      file: 'GstarCAD2027_macOS.dmg',
      size: '',
      driveId: '1pmQXyogCq95xSvRDbSXTmbr3HmVIwQb4',
    },
  },
};

export type TrialOS = 'windows' | 'mac';
export type TrialInfo = (typeof SITE.trialDownloads)[TrialOS];
