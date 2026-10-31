import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICE_GROUPS } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';
import { ServiceCard } from '../../shared/service-card/service-card';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, ServiceCard, Icon, Reveal, CtaBand],
  template: `
    @let tt = t();
    <app-page-hero
      [eyebrow]="tt.servicesPage.eyebrow"
      [title]="tt.servicesPage.title"
      [lead]="tt.servicesPage.text"
      [crumbs]="[{ label: tt.nav.services }]"
    >
      <nav class="jump" [attr.aria-label]="tt.nav.services">
        @for (g of groups; track g.id) {
          <a class="chip" routerLink="/prestations" [fragment]="g.id">
            <app-icon [name]="g.icon" [size]="15" />{{ tt.groups[g.id].title }}
          </a>
        }
      </nav>
    </app-page-hero>

    <div class="container groups">
      @for (g of groups; track g.id; let gi = $index) {
        <section class="group" [id]="g.id">
          <header class="group__head" appReveal>
            <span class="group__icon"><app-icon [name]="g.icon" [size]="24" /></span>
            <div>
              <p class="group__index">0{{ gi + 1 }}</p>
              <h2>{{ tt.groups[g.id].title }}</h2>
              <p class="group__text">{{ tt.groups[g.id].text }}</p>
            </div>
          </header>
          <div class="group__grid">
            @for (id of g.services; track id; let i = $index) {
              <app-service-card [service]="id" appReveal [revealDelay]="i * 40" />
            }
          </div>
        </section>
      }
    </div>

    <app-cta-band />
  `,
  styles: `
    @use 'mixins' as m;

    .jump {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;

      a {
        transition:
          border-color 0.25s,
          color 0.25s;

        app-icon {
          color: var(--c-primary);
        }

        @include m.hover {
          border-color: var(--c-primary);
          color: var(--c-primary);
        }
      }
    }

    .groups {
      display: grid;
      gap: clamp(3.5rem, 3rem + 3vw, 6rem);
      padding-top: 2rem;
    }

    .group {
      display: grid;
      gap: 2rem;
      scroll-margin-top: calc(var(--header-h) + 1.5rem);

      @include m.up(lg) {
        grid-template-columns: 320px 1fr;
        align-items: start;
      }
    }

    .group__head {
      display: grid;
      gap: 1rem;

      @include m.up(lg) {
        position: sticky;
        top: calc(var(--header-h) + 2rem);
      }

      h2 {
        font-size: var(--fs-2xl);
      }
    }

    .group__icon {
      display: grid;
      place-items: center;
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 16px;
      background: var(--gradient-brand);
      color: #fff;
      box-shadow: 0 14px 30px -14px var(--c-primary);
    }

    .group__index {
      margin-bottom: 0.35rem;
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--c-muted);
    }

    .group__text {
      margin-top: 0.6rem;
      color: var(--c-muted);
    }

    .group__grid {
      display: grid;
      gap: 1.25rem;

      @include m.up(sm) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `,
})
export class Services {
  protected readonly t = inject(I18n).t;
  protected readonly groups = SERVICE_GROUPS;
}
