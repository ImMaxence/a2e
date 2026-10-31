import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';
import { Reveal } from '../motion/reveal';

@Component({
  selector: 'app-convention-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    @let c = t().special.convention;
    <section class="conv" aria-labelledby="conv-title">
      <h3 id="conv-title" class="conv__title">{{ c.title }}</h3>
      <div class="conv__grid">
        @for (section of c.sections; track section.title; let i = $index) {
          <article class="conv__card" appReveal [revealDelay]="i * 40">
            <header>
              <span class="conv__num">{{ i + 1 }}</span>
              <h4>{{ section.title }}</h4>
            </header>
            <ul>
              @for (item of section.items; track item) {
                <li><app-icon name="chevron-right" [size]="16" />{{ item }}</li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    @use 'mixins' as m;

    .conv {
      display: grid;
      gap: 1.25rem;
    }

    .conv__title {
      font-size: var(--fs-xl);
    }

    .conv__grid {
      display: grid;
      gap: 1rem;

      @include m.up(md) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .conv__card {
      padding: 1.4rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: linear-gradient(160deg, var(--c-primary-soft), transparent 55%), var(--c-surface);

      header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1rem;
      }

      h4 {
        font-size: 1.15rem;
      }

      ul {
        display: grid;
        gap: 0.55rem;
        padding: 0;
        list-style: none;
      }

      li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.45rem;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--c-ink-soft);

        app-icon {
          margin-top: 0.2rem;
          color: var(--c-accent);
        }
      }
    }

    .conv__num {
      display: grid;
      place-items: center;
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 50%;
      background: var(--gradient-brand);
      color: #fff;
      font-family: var(--font-display);
      font-weight: 700;
    }
  `,
})
export class ConventionTable {
  protected readonly t = inject(I18n).t;
}
