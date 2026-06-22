import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models';
import { DeviceService } from '../../core/device.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  private device = inject(DeviceService);

  /** No celular, o app não instala — rótulo alinha a expectativa (segue para o WhatsApp). */
  get trialLabel(): string {
    if (this.device.isMobile()) return this.product.free ? 'Testar grátis' : 'Testar no computador';
    return this.product.free ? 'Baixar grátis' : 'Baixar versão de teste';
  }
}
