import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Lang } from '../../core/i18n/i18n.types';

/** Small flag for the language switcher (3:2, simplified artwork). */
@Component({
  selector: 'app-flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
      @switch (lang()) {
        @case ('fr') {
          <rect width="10" height="20" fill="#002654" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce1126" />
        }
        @case ('it') {
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        }
        @case ('es') {
          <rect width="30" height="20" fill="#aa151b" />
          <rect y="5" width="30" height="10" fill="#f1bf00" />
        }
        @case ('en') {
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4" />
          <path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6" />
          <path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6" />
          <path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      width: 1.35rem;
      height: 0.9rem;
      border-radius: 3px;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgb(0 0 0 / 0.12);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Flag {
  readonly lang = input.required<Lang>();
}
