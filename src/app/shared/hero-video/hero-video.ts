import { AfterViewInit, Component, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-video.html',
  styleUrl: './hero-video.scss',
})
export class HeroVideo implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('bgvideo') bgvideo?: ElementRef<HTMLVideoElement>;

  benefits = [
    { icon: '◈', label: 'Compatível com DWG' },
    { icon: '▤', label: 'Interface profissional' },
    { icon: '⚡', label: 'Alto desempenho' },
    { icon: '🛡', label: 'Licença de software' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.bgvideo) return;
    // Carrega o vídeo apenas no desktop e sem redução de movimento (mobile = só poster).
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || reduced) return;
    const v = this.bgvideo.nativeElement;
    v.src = '/media/hero-bg.mp4';
    v.muted = true;
    v.play().catch(() => {});
  }
}
