import {
  AfterViewInit,
  Directive,
  ElementRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Revela o elemento ao entrar na viewport. No SSR/redução de movimento, fica visível direto. */
@Directive({
  selector: '[appReveal]',
  host: { '[attr.data-reveal]': '""' },
})
export class RevealDirective implements AfterViewInit {
  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    if (!isPlatformBrowser(this.platformId)) {
      node.classList.add('is-visible');
      return;
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            node.classList.add('is-visible');
            obs.unobserve(node);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(node);
  }
}
