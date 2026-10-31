import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REGULATIONS, regulationBySlug } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { DocList } from '../../shared/content/doc-list';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';
import { ServiceCard } from '../../shared/service-card/service-card';

@Component({
  selector: 'app-regulation-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, DocList, ServiceCard, Icon, Reveal, CtaBand],
  template: `
    @let tt = t();
    @let r = meta();
    <app-page-hero
      [eyebrow]="tt.regulationsPage.eyebrow"
      [title]="tt.regulations[r.id].title"
      [lead]="tt.regulations[r.id].intro"
      [crumbs]="[{ label: tt.nav.regulations, link: '/reglementation' }, { label: tt.regulations[r.id].nav }]"
      [icon]="r.icon"
    >
      <span class="chip"><app-icon name="file" [size]="15" />{{ tt.regulationsPage.documents(r.docs.length) }}</span>
    </app-page-hero>

    <div class="container layout">
      <div class="main">
        <app-doc-list [docs]="r.docs" />

        @if (r.id === 'anc') {
          <p class="extra" appReveal><app-icon name="info" [size]="18" />{{ tt.regulationsPage.prefectoral }}</p>
        }

        @if (r.externalUrl) {
          <a class="external" [href]="r.externalUrl" target="_blank" rel="noopener noreferrer" appReveal>
            <span class="external__icon"><app-icon name="globe" [size]="22" /></span>
            <span>
              <small>{{ tt.regulationsPage.moreInfo }}</small>
              <strong>{{ host(r.externalUrl) }}</strong>
            </span>
            <app-icon name="arrow-up-right" [size]="20" class="external__arrow" />
          </a>
        }

        <p class="notice"><app-icon name="alert" [size]="16" />{{ tt.regulationsPage.notice }}</p>
      </div>

      <aside class="aside">
        <div class="aside__sticky" appReveal>
          <h2>{{ tt.regulationsPage.otherTexts }}</h2>
          <ul>
            @for (o of others(); track o.id) {
              <li>
                <a [routerLink]="['/reglementation', o.slug]">
                  <span class="aside__icon"><app-icon [name]="o.icon" [size]="16" /></span>
                  <span>{{ tt.regulations[o.id].nav }}</span>
                </a>
              </li>
            }
            <li>
              <a routerLink="/prestations/autosurveillance-stations-epuration" fragment="textes">
                <span class="aside__icon"><app-icon name="gauge" [size]="16" /></span>
                <span>{{ tt.nav.selfMonitoringTexts }}</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="section-head__eyebrow" appReveal>{{ tt.regulationsPage.relatedServices }}</p>
        </div>
        <div class="services">
          @for (id of r.services; track id; let i = $index) {
            <app-service-card [service]="id" appReveal [revealDelay]="i * 40" />
          }
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: `
    @use 'mixins' as m;

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 3rem;
      padding-top: 1rem;

      @include m.up(lg) {
        grid-template-columns: minmax(0, 1fr) 320px;
      }
    }

    .main {
      display: grid;
      align-content: start;
      gap: 1.25rem;
    }

    .extra,
    .notice {
      display: flex;
      gap: 0.6rem;
      color: var(--c-muted);

      app-icon {
        margin-top: 0.2rem;
        color: var(--c-primary);
      }
    }

    .notice {
      font-size: var(--fs-sm);
    }

    .external {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem 1.4rem;
      border-radius: var(--radius-lg);
      background: linear-gradient(120deg, var(--c-primary-soft), var(--c-accent-soft));
      border: 1px solid color-mix(in srgb, var(--c-primary) 20%, transparent);
      transition: transform 0.4s var(--ease-out);

      small {
        display: block;
        font-size: var(--fs-xs);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--c-muted);
      }

      strong {
        font-size: 1.05rem;
        word-break: break-all;
      }

      @include m.hover {
        transform: none;

        .external__arrow {
          transform: translate(3px, -3px);
        }
      }
    }

    .external__icon {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 3rem;
      height: 3rem;
      border-radius: 14px;
      background: var(--c-surface);
      color: var(--c-primary);
    }

    .external__arrow {
      margin-left: auto;
      color: var(--c-primary);
      transition: transform 0.35s var(--ease-out);
    }

    .aside__sticky {
      display: grid;
      gap: 1rem;
      padding: 1.4rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface-2);

      @include m.up(lg) {
        position: sticky;
        top: calc(var(--header-h) + 1.5rem);
      }

      h2 {
        font-size: 1.15rem;
      }

      ul {
        display: grid;
        gap: 0.2rem;
        padding: 0;
        list-style: none;
      }

      a {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.55rem 0.6rem;
        border-radius: var(--radius-sm);
        font-size: 0.93rem;
        font-weight: 500;
        transition:
          background 0.2s,
          color 0.2s;

        @include m.hover {
          background: var(--c-surface);
          color: var(--c-primary);
        }
      }
    }

    .aside__icon {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 1.9rem;
      height: 1.9rem;
      border-radius: 9px;
      background: var(--c-primary-soft);
      color: var(--c-primary);
    }

    .section-head__eyebrow {
      @include m.eyebrow;
    }

    .section-head {
      margin-bottom: 1.5rem;
    }

    .services {
      display: grid;
      gap: 1.25rem;

      @include m.up(sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include m.up(lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `,
})
export class RegulationDetail {
  readonly slug = input.required<string>();

  protected readonly t = inject(I18n).t;
  protected readonly meta = computed(() => regulationBySlug(this.slug())!);
  protected readonly others = computed(() => REGULATIONS.filter((r) => r.id !== this.meta().id));

  protected host(url: string): string {
    return new URL(url).hostname.replace(/^www\./, '');
  }
}
