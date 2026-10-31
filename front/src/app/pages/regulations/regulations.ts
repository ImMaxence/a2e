import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REGULATIONS, SELF_MONITORING_DOCS } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';

@Component({
  selector: 'app-regulations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, Icon, Reveal, CtaBand],
  template: `
    @let tt = t();
    <app-page-hero
      [eyebrow]="tt.regulationsPage.eyebrow"
      [title]="tt.regulationsPage.title"
      [lead]="tt.regulationsPage.text"
      [crumbs]="[{ label: tt.nav.regulations }]"
    />

    <div class="container">
      <div class="grid">
        @for (r of regulations; track r.id; let i = $index) {
          <a class="reg" [routerLink]="['/reglementation', r.slug]" appReveal [revealDelay]="(i % 2) * 60">
            <span class="reg__icon"><app-icon [name]="r.icon" [size]="24" /></span>
            <span class="reg__count">{{ tt.regulationsPage.documents(r.docs.length) }}</span>
            <h2>{{ tt.regulations[r.id].nav }}</h2>
            <p>{{ tt.regulations[r.id].short }}</p>
            <span class="link-arrow">{{ tt.common.discover }} <app-icon name="arrow-right" [size]="16" /></span>
          </a>
        }
        <a
          class="reg reg--wide"
          routerLink="/prestations/autosurveillance-stations-epuration"
          fragment="textes"
         
          appReveal
        >
          <span class="reg__icon"><app-icon name="gauge" [size]="24" /></span>
          <span class="reg__count">{{ tt.regulationsPage.documents(selfMonitoringDocs) }}</span>
          <h2>{{ tt.regulationsPage.selfMonitoringTitle }}</h2>
          <p>{{ tt.regulationsPage.selfMonitoringText }}</p>
          <span class="link-arrow">{{ tt.common.discover }} <app-icon name="arrow-right" [size]="16" /></span>
        </a>
      </div>

      <p class="notice" appReveal><app-icon name="info" [size]="18" />{{ tt.regulationsPage.notice }}</p>
    </div>

    <app-cta-band />
  `,
  styles: `
    @use 'mixins' as m;

    .grid {
      display: grid;
      gap: 1.25rem;
      padding-top: 1rem;

      @include m.up(md) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .reg {
      position: relative;
      display: grid;
      align-content: start;
      gap: 0.8rem;
      padding: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      overflow: hidden;
      transition:
        transform 0.5s var(--ease-out),
        box-shadow 0.5s var(--ease-out),
        border-color 0.3s;

      h2 {
        font-size: var(--fs-xl);
      }

      p {
        color: var(--c-muted);
      }

      .link-arrow {
        margin-top: 0.5rem;
      }

      @include m.hover {
        transform: none;
        box-shadow: var(--shadow-lg);
        border-color: color-mix(in srgb, var(--c-primary) 30%, transparent);

        .reg__icon {
          transform: none;
        }
      }

      &--wide {
        @include m.up(md) {
          grid-column: 1 / -1;
        }
      }
    }

    .reg__icon {
      display: grid;
      place-items: center;
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 16px;
      background: var(--gradient-brand);
      color: #fff;
      transition: none;
    }

    .reg__count {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-full);
      background: var(--c-primary-soft);
      color: var(--c-primary);
      font-size: var(--fs-xs);
      font-weight: 600;
    }

    .notice {
      display: flex;
      gap: 0.6rem;
      margin-top: 2rem;
      font-size: var(--fs-sm);
      color: var(--c-muted);

      app-icon {
        margin-top: 0.15rem;
        color: var(--c-primary);
      }
    }
  `,
})
export class Regulations {
  protected readonly t = inject(I18n).t;
  protected readonly regulations = REGULATIONS;
  protected readonly selfMonitoringDocs = SELF_MONITORING_DOCS.length;
}
