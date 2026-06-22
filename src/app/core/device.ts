/**
 * Heurística para identificar celulares/tablets (que não instalam o app de desktop).
 * Retorna false no SSR. No desktop → false (mantém o download direto).
 */
export function isMobileLike(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua)) return true;
  // iPadOS recente se identifica como "Macintosh", mas tem toque.
  if (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1) return true;
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  return coarse && window.innerWidth < 1024;
}
