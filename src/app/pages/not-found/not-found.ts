import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { AnimatedBg } from '../../shared/animated-bg/animated-bg';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, AnimatedBg],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound implements OnInit {
  private seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.apply({
      title: 'Página não encontrada (404)',
      description: 'A página que você procura não existe ou foi movida.',
      path: '/404',
    });
  }
}
