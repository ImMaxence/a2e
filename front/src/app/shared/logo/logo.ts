import { ChangeDetectionStrategy, Component } from '@angular/core';

let uid = 0;

/** Brand mark: a water drop crossed by two waves, followed by the wordmark. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="mark" viewBox="0 0 32 40" aria-hidden="true">
      <defs>
        <clipPath [attr.id]="clipId">
          <path d="M16 1.5C22.5 10 28 16.6 28 24.2a12 12 0 0 1-24 0C4 16.6 9.5 10 16 1.5Z" />
        </clipPath>
      </defs>
      <path class="drop" d="M16 1.5C22.5 10 28 16.6 28 24.2a12 12 0 0 1-24 0C4 16.6 9.5 10 16 1.5Z" />
      <g [attr.clip-path]="'url(#' + clipId + ')'">
        <path class="water" d="M0 26c3.2-2.4 6.4-2.4 9.6 0s6.4 2.4 9.6 0 6.4-2.4 9.6 0 3.2 2.4 3.2 2.4V40H0Z" />
        <path class="wave" d="M2 31.5c3-2.2 6-2.2 9 0s6 2.2 9 0 6-2.2 9 0" />
      </g>
    </svg>
    <span class="word"><strong>A2E</strong>{{ ' ' }}<span>Environnement</span></span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--c-ink);
      line-height: 1;
    }

    .mark {
      width: auto;
      height: var(--logo-size, 2rem);
      flex-shrink: 0;
    }

    .drop {
      fill: var(--c-primary);
    }

    .water {
      fill: var(--c-accent);
    }

    .wave {
      fill: none;
      stroke: #fff;
      stroke-width: 1.6;
      stroke-linecap: round;
      opacity: 0.9;
    }

    .word {
      display: inline-flex;
      gap: 0.3em;
      font-size: 1.2rem;
      letter-spacing: -0.01em;
      white-space: nowrap;

      strong {
        font-weight: 700;
        color: var(--c-ink);
      }

      span {
        font-weight: 500;
        color: var(--c-muted);
      }
    }
  `,
})
export class Logo {
  protected readonly clipId = `logo-clip-${uid++}`;
}
