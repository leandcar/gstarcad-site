import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-video.html',
  styleUrl: './hero-video.scss',
})
export class HeroVideo {
  benefits = [
    { icon: '◈', label: 'Compatível com DWG' },
    { icon: '▤', label: 'Interface profissional' },
    { icon: '⚡', label: 'Alto desempenho' },
    { icon: '🛡', label: 'Licença de software' },
  ];
}
