import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';

@Component({
  selector: 'app-client-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, Icon, Reveal],
  template: `
    @let ca = t().clientArea;
    <app-page-hero [eyebrow]="ca.eyebrow" [title]="ca.title" [lead]="ca.text" [crumbs]="[{ label: t().nav.clientArea }]" />

    <div class="container layout">
      <div class="features">
        @for (f of ca.features; track f.title; let i = $index) {
          <article class="feature" appReveal [revealDelay]="i * 40">
            <span class="feature__icon"><app-icon [name]="icons[i]" [size]="24" /></span>
            <h2>{{ f.title }}</h2>
            <p>{{ f.text }}</p>
          </article>
        }
      </div>

      <div class="login" appReveal>
        <span class="login__lock" aria-hidden="true"><app-icon name="lock" [size]="24" /></span>
        <h2>{{ ca.cardTitle }}</h2>
        <p>{{ ca.cardText }}</p>
        <a class="btn btn--primary btn--block" [href]="portalUrl" rel="noopener">
          {{ ca.cta }}
          <app-icon name="arrow-up-right" [size]="18" />
        </a>
        <a class="help" routerLink="/contact">{{ ca.help }}</a>
      </div>
    </div>
  `,
  styles: `
    @use 'mixins' as m;

    .layout {
      display: grid;
      gap: 2rem;
      padding-top: 1rem;
      padding-bottom: var(--section-y);

      @include m.up(lg) {
        grid-template-columns: 1.3fr 1fr;
        align-items: start;
      }
    }

    .features {
      display: grid;
      gap: 1.25rem;

      @include m.up(sm) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .feature {
      display: grid;
      align-content: start;
      gap: 0.75rem;
      padding: 1.75rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);

      h2 {
        font-size: 1.35rem;
      }

      p {
        color: var(--c-muted);
      }
    }

    .feature__icon {
      display: grid;
      place-items: center;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 15px;
      background: var(--c-primary-soft);
      color: var(--c-primary);
    }

    .login {
      position: relative;
      display: grid;
      justify-items: center;
      gap: 1rem;
      padding: clamp(1.75rem, 1.5rem + 2vw, 2.75rem);
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      box-shadow: var(--shadow-md);
      text-align: center;

      h2 {
        font-size: var(--fs-xl);
      }

      p {
        color: var(--c-muted);
      }
    }

    .login__lock {
      display: grid;
      place-items: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--radius-md);
      background: var(--c-primary-soft);
      color: var(--c-primary);
    }

    .help {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: var(--fs-sm);
      color: var(--c-muted);
      transition: color 0.2s;

      @include m.hover {
        color: var(--c-primary);
      }
    }
  `,
})
export class ClientArea {
  protected readonly t = inject(I18n).t;
  protected readonly icons: IconName[] = ['file', 'euro'];
  protected readonly portalUrl = COMPANY.clientPortalUrl;
}
