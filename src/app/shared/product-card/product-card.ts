import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models';
import { ContentService } from '../../core/content.service';
import { BrlPipe } from '../brl.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, BrlPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  private content = inject(ContentService);
  get from() { return this.content.fromPrice(this.product); }
}
