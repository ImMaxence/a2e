import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReferenceTag } from '../../core/content/content.types';
import { REFERENCES } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';

const TAGS: { id: ReferenceTag; icon: IconName }[] = [
  { id: 'selfMonitoring', icon: 'gauge' },
  { id: 'measures', icon: 'flask' },
  { id: 'monitoring', icon: 'leaf' },
  { id: 'studies', icon: 'clipboard' },
  { id: 'training', icon: 'graduation' },
];

@Component({
  selector: 'app-references',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, Icon, Reveal, CtaBand],
  template: `
    @let tt = t();
    <app-page-hero
      [eyebrow]="tt.references.eyebrow"
      [title]="tt.references.title"
      [lead]="tt.references.text"
      [crumbs]="[{ label: tt.nav.references }]"
    />

    <div class="container">
      <div class="toolbar" appReveal>
        <div class="filters" role="group" [attr.aria-label]="tt.references.eyebrow">
          <button type="button" [attr.aria-pressed]="tag() === null" (click)="tag.set(null)">
            {{ tt.references.all }} <span>{{ all.length }}</span>
          </button>
          @for (tg of tags; track tg.id) {
            <button type="button" [attr.aria-pressed]="tag() === tg.id" (click)="tag.set(tg.id)">
              <app-icon [name]="tg.icon" [size]="15" />
              {{ tt.references.tags[tg.id] }}
              <span>{{ counts[tg.id] }}</span>
            </button>
          }
        </div>
        <p class="count" aria-live="polite">{{ tt.references.count(visible().length) }}</p>
      </div>

      <ul class="grid">
        @for (ref of visible(); track ref.name) {
          <li class="ref">
            <div class="ref__head">
              @if (ref.logo) {
                <img class="ref__logo" [src]="'/images/partners/' + ref.logo + '.webp'" alt="" width="96" height="96" loading="lazy" />
              } @else {
                <span class="ref__initial" aria-hidden="true">{{ ref.short.charAt(0) }}</span>
              }
              <div>
                <h2>{{ ref.name }}</h2>
                @if (ref.now) {
                  <p class="ref__now">{{ tt.references.now }} : {{ ref.now }}</p>
                }
              </div>
            </div>
            <p class="ref__mission">{{ tt.references.missions[ref.index] }}</p>
            <ul class="ref__tags">
              @for (tg of ref.tags; track tg) {
                <li>{{ tt.references.tags[tg] }}</li>
              }
            </ul>
            @if (ref.url) {
              <a class="ref__link" [href]="ref.url" target="_blank" rel="noopener noreferrer">
                {{ tt.references.visit }}
                <app-icon name="arrow-up-right" [size]="15" />
                <span class="sr-only">— {{ ref.name }}</span>
              </a>
            }
          </li>
        }
      </ul>
    </div>

    <app-cta-band />
  `,
  styles: `
    @use 'mixins' as m;

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin: 1rem 0 2rem;
    }

    .filters {
      display: flex;
      gap: 0.4rem;
      // Phones: one scrollable row, edge to edge, instead of five wrapped lines.
      max-width: calc(100% + var(--gutter) * 2);
      margin-inline: calc(var(--gutter) * -1);
      padding-inline: var(--gutter);
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      @include m.up(md) {
        flex-wrap: wrap;
        margin-inline: 0;
        padding-inline: 0;
      }

      button {
        flex-shrink: 0;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        height: 2.5rem;
        padding: 0 0.9rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--c-border);
        background: var(--c-surface);
        font-size: 0.88rem;
        font-weight: 500;
        transition:
          background 0.3s,
          color 0.3s,
          border-color 0.3s;

        span {
          padding: 0.05rem 0.45rem;
          border-radius: var(--radius-full);
          background: var(--c-surface-2);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--c-muted);
        }

        &:hover {
          border-color: var(--c-border-strong);
        }

        &[aria-pressed='true'] {
          background: var(--c-ink);
          border-color: var(--c-ink);
          color: var(--c-bg);

          span {
            background: rgb(255 255 255 / 0.15);
            color: inherit;
          }
        }
      }
    }

    .count {
      font-size: var(--fs-sm);
      color: var(--c-muted);
    }

    .grid {
      display: grid;
      gap: 1rem;
      padding: 0;
      list-style: none;

      @include m.up(sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include m.up(lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .ref {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1.25rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      animation: card-in 0.3s var(--ease-out) both;
      transition: box-shadow 0.2s;

      @include m.hover {
        box-shadow: var(--shadow-md);
      }
    }

    .ref__head {
      display: flex;
      align-items: center;
      gap: 0.85rem;

      h2 {
        font-size: 1.05rem;
        line-height: 1.3;
      }
    }

    .ref__now {
      margin-top: 0.15rem;
      font-size: 0.8rem;
      color: var(--c-muted);
    }

    // Partner icons sit on a white tile so they read the same in light and dark mode.
    .ref__logo,
    .ref__initial {
      flex-shrink: 0;
      width: 3rem;
      height: 3rem;
      border-radius: var(--radius-md);
    }

    .ref__logo {
      padding: 0.3rem;
      object-fit: contain;
      background: #fff;
      box-shadow: inset 0 0 0 1px var(--c-border);
    }

    .ref__initial {
      display: grid;
      place-items: center;
      background: var(--c-primary-soft);
      color: var(--c-primary);
      font-size: 1.2rem;
      font-weight: 700;
    }

    .ref__mission {
      font-size: 0.92rem;
      color: var(--c-muted);
    }

    .ref__link {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      margin-top: auto;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--c-primary);

      @include m.hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }

    .ref__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-top: 0.25rem;
      padding: 0;
      list-style: none;

      li {
        padding: 0.2rem 0.6rem;
        border-radius: var(--radius-full);
        background: var(--c-primary-soft);
        color: var(--c-primary);
        font-size: 0.75rem;
        font-weight: 600;
      }
    }

    @keyframes card-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
    }
  `,
})
export class References {
  protected readonly t = inject(I18n).t;
  protected readonly tags = TAGS;
  protected readonly all = REFERENCES.map((r, index) => ({ ...r, index }));
  protected readonly tag = signal<ReferenceTag | null>(null);

  protected readonly visible = computed(() => {
    const tag = this.tag();
    return tag ? this.all.filter((r) => r.tags.includes(tag)) : this.all;
  });

  protected readonly counts = Object.fromEntries(
    TAGS.map(({ id }) => [id, REFERENCES.filter((r) => r.tags.includes(id)).length]),
  ) as Record<ReferenceTag, number>;
}
