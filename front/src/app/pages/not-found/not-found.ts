import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section class="nf">
      <div class="nf__drop" aria-hidden="true">
        <svg viewBox="0 0 120 160">
          <path d="M60 8c22 30 42 53 42 78a42 42 0 0 1-84 0C18 61 38 38 60 8Z" />
        </svg>
        <span class="nf__ripple"></span>
        <span class="nf__ripple"></span>
      </div>
      <p class="nf__code">404</p>
      <h1>{{ t().notFound.title }}</h1>
      <p class="nf__text">{{ t().notFound.text }}</p>
      <a class="btn btn--primary" routerLink="/">
        <app-icon name="arrow-left" [size]="18" />
        {{ t().notFound.cta }}
      </a>
    </section>
  `,
  styles: `
    @use 'mixins' as m;

    .nf {
      display: grid;
      justify-items: center;
      gap: 1rem;
      min-height: 80dvh;
      align-content: center;
      padding: calc(var(--header-h) + 3rem) var(--gutter) 4rem;
      text-align: center;
    }

    .nf__drop {
      position: relative;
      display: grid;
      justify-items: center;
      width: 140px;
      height: 200px;

      svg {
        width: 70px;
        fill: var(--c-sky);
        filter: drop-shadow(0 12px 24px var(--c-glow));

        @include m.motion {
          animation: fall 2.4s var(--ease-in-out) infinite;
        }
      }
    }

    .nf__ripple {
      position: absolute;
      bottom: 10px;
      width: 140px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--c-sky);
      opacity: 0;

      @include m.motion {
        animation: splash 2.4s var(--ease-out) infinite;

        & + & {
          animation-delay: 0.25s;
        }
      }
    }

    .nf__code {
      font-family: var(--font-display);
      font-size: clamp(4rem, 3rem + 6vw, 8rem);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.05em;
      background: var(--gradient-text);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    h1 {
      font-size: var(--fs-2xl);
    }

    .nf__text {
      max-width: 40ch;
      color: var(--c-muted);
    }

    @keyframes fall {
      0% {
        transform: translateY(-40px) scaleY(1.1);
        opacity: 0;
      }
      15% {
        opacity: 1;
      }
      55% {
        transform: translateY(70px) scaleY(1);
        opacity: 1;
      }
      62%,
      100% {
        transform: translateY(80px) scale(1.2, 0.2);
        opacity: 0;
      }
    }

    @keyframes splash {
      0%,
      55% {
        transform: scale(0.2);
        opacity: 0;
      }
      62% {
        opacity: 0.9;
      }
      100% {
        transform: scale(1.2);
        opacity: 0;
      }
    }
  `,
})
export class NotFound {
  protected readonly t = inject(I18n).t;
}
