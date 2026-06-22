import { Injectable, afterNextRender, signal } from '@angular/core';
import { isMobileLike } from './device';

/**
 * Estado reativo do dispositivo. `isMobile` começa false (igual ao SSR) e é
 * atualizado após a hidratação (afterNextRender), evitando mismatch.
 */
@Injectable({ providedIn: 'root' })
export class DeviceService {
  readonly isMobile = signal(false);

  constructor() {
    afterNextRender(() => this.isMobile.set(isMobileLike()));
  }
}
