import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** One observer shared by every revealed element. */
let observer: IntersectionObserver | null = null;
const getObserver = () =>
  (observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer!.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.05 },
  ));

/**
 * Fades an element in when it enters the viewport.
 * Usage: <div appReveal [revealDelay]="50">
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay.ms]': 'revealDelay()',
  },
})
export class Reveal {
  readonly revealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => getObserver().observe(el));
    inject(DestroyRef).onDestroy(() => observer?.unobserve(el));
  }
}
