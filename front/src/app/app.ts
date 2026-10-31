import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18n } from './core/i18n/i18n';
import { Theme } from './core/theme/theme';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <a class="skip-link" href="#main">{{ t().common.skip }}</a>
    <div class="progress" aria-hidden="true"></div>
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }

    main {
      flex: 1;
      outline: none;
    }

    // Reading progress, driven by a scroll timeline where supported.
    .progress {
      position: fixed;
      inset: 0 0 auto;
      z-index: 200;
      height: 3px;
      background: var(--gradient-brand);
      transform-origin: 0 50%;
      transform: scaleX(0);
      pointer-events: none;
    }

    @supports (animation-timeline: scroll()) {
      @media (prefers-reduced-motion: no-preference) {
        .progress {
          animation: progress linear both;
          animation-timeline: scroll(root block);
        }
      }
    }

    @keyframes progress {
      to {
        transform: scaleX(1);
      }
    }
  `,
})
export class App {
  protected readonly t = inject(I18n).t;
  // Instantiated eagerly so the stored theme is applied at boot.
  private readonly theme = inject(Theme);
}
