import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Variant = 'constellation' | 'blueprint' | 'mesh';

interface P { x: number; y: number; vx: number; vy: number; }

@Component({
  selector: 'app-animated-bg',
  standalone: true,
  templateUrl: './animated-bg.html',
  styleUrl: './animated-bg.scss',
})
export class AnimatedBg implements AfterViewInit, OnDestroy {
  @Input() variant: Variant = 'constellation';
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef<HTMLElement>);

  private ctx?: CanvasRenderingContext2D | null;
  private particles: P[] = [];
  private raf = 0;
  private running = false;
  private io?: IntersectionObserver;
  private ro?: ResizeObserver;
  private w = 0;
  private h = 0;
  private dpr = 1;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.variant !== 'constellation' || !this.canvasRef) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.resize();
    this.seed();

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.host.nativeElement);

    this.io = new IntersectionObserver(
      (entries) => (entries[0].isIntersecting ? this.start() : this.stop()),
      { threshold: 0.01 }
    );
    this.io.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.stop();
    this.io?.disconnect();
    this.ro?.disconnect();
  }

  private resize(): void {
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.w = Math.max(1, rect.width);
    this.h = Math.max(1, rect.height);
    const canvas = this.canvasRef!.nativeElement;
    canvas.width = this.w * this.dpr;
    canvas.height = this.h * this.dpr;
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private seed(): void {
    const count = Math.min(80, Math.round((this.w * this.h) / 16000));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  private start(): void {
    if (this.running || !this.ctx) return;
    this.running = true;
    const loop = () => {
      this.frame();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private frame(): void {
    const ctx = this.ctx!;
    ctx.clearRect(0, 0, this.w, this.h);
    const ps = this.particles;
    const linkDist = 130;

    for (const p of ps) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.w) p.vx *= -1;
      if (p.y < 0 || p.y > this.h) p.vy *= -1;
    }

    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x;
        const dy = ps[i].y - ps[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDist) {
          const a = (1 - dist / linkDist) * 0.5;
          ctx.strokeStyle = `rgba(140, 180, 255, ${a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ps[i].x, ps[i].y);
          ctx.lineTo(ps[j].x, ps[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = 'rgba(180, 205, 255, 0.85)';
    for (const p of ps) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
