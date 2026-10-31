import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACTS } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-cta-band',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section class="container">
      <div class="band">
        <div class="content">
          <h2>{{ t().cta.title }}</h2>
          <p>{{ t().cta.text }}</p>
        </div>
        <div class="actions">
          <a class="btn btn--light" routerLink="/contact">
            {{ t().cta.primary }}
            <app-icon name="arrow-right" [size]="18" />
          </a>
          <a class="btn btn--outline-light" [href]="phone.phoneHref">
            <app-icon name="phone" [size]="17" />
            {{ phone.phone }}
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;

    :host {
      display: block;
      margin-top: var(--section-y);
      padding-bottom: var(--section-y);
    }

    .band {
      display: grid;
      gap: 1.75rem;
      align-items: center;
      padding: clamp(1.75rem, 1.25rem + 3vw, 3.5rem);
      border-radius: var(--radius-xl);
      background:
        linear-gradient(100deg, rgb(6 39 72 / 0.94) 0%, rgb(6 39 72 / 0.82) 55%, rgb(6 39 72 / 0.55) 100%),
        url('/images/photos/river-800.webp') center / cover;
      color: #fff;

      @include m.up(lg) {
        grid-template-columns: 1fr auto;
        background:
          linear-gradient(100deg, rgb(6 39 72 / 0.94) 0%, rgb(6 39 72 / 0.82) 55%, rgb(6 39 72 / 0.45) 100%),
          url('/images/photos/river.webp') center / cover;
      }
    }

    h2 {
      font-size: var(--fs-2xl);
      color: #fff;
    }

    p {
      margin-top: 0.75rem;
      max-width: 52ch;
      color: rgb(255 255 255 / 0.82);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .btn--light {
      --btn-bg: #fff;
      --btn-fg: #07355f;
      --btn-border: transparent;
    }

    .btn--outline-light {
      --btn-bg: transparent;
      --btn-fg: #fff;
      --btn-border: rgb(255 255 255 / 0.4);

      @include m.hover {
        --btn-bg: rgb(255 255 255 / 0.1);
      }
    }
  `,
})
export class CtaBand {
  protected readonly t = inject(I18n).t;
  protected readonly phone = CONTACTS.lm;
}
