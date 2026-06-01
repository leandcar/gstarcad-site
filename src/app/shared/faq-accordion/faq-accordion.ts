import { Component, Input, signal } from '@angular/core';
import { FaqItem } from '../../core/models';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordion {
  @Input({ required: true }) items: FaqItem[] = [];
  open = signal<number | null>(0);
  toggle(i: number) { this.open.update((cur) => (cur === i ? null : i)); }
}
