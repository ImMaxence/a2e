import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Counts from 0 to the given value the first time the element becomes visible. */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly appCountUp = input.required<number>();
  readonly duration = input(1800);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    let frame = 0;
    let io: IntersectionObserver | undefined;

    afterNextRender(() => {
      const target = this.appCountUp();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = String(target);
        return;
      }
      el.textContent = '0';
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / this.duration(), 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.6 },
      );
      io.observe(el);
    });

    inject(DestroyRef).onDestroy(() => {
      io?.disconnect();
      cancelAnimationFrame(frame);
    });
  }
}
