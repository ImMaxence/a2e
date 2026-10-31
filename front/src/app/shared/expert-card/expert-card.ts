import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ContactId } from '../../core/content/content.types';
import { CONTACTS } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-expert-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    @let c = contact();
    <article class="expert">
      <header>
        <span class="avatar" aria-hidden="true">{{ c.initials }}</span>
        <div>
          <h3>{{ c.name }}</h3>
          <p>{{ t().contacts[c.id].role }}</p>
        </div>
      </header>
      <div class="actions">
        <a class="action" [href]="'mailto:' + c.email" [attr.title]="c.email">
          <app-icon name="mail" [size]="18" />
          <span>{{ c.email }}</span>
        </a>
        <a class="action" [href]="c.phoneHref">
          <app-icon name="phone" [size]="18" />
          <span>{{ c.phone }}</span>
        </a>
      </div>
    </article>
  `,
  styles: `
    @use 'mixins' as m;

    .expert {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem;
      padding: 1.25rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
    }

    header {
      display: flex;
      align-items: center;
      gap: 0.9rem;

      h3 {
        font-size: 1.1rem;
      }

      p {
        font-size: 0.86rem;
        line-height: 1.4;
        color: var(--c-muted);
      }
    }

    .avatar {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 3.1rem;
      height: 3.1rem;
      border-radius: 50%;
      background: var(--gradient-brand);
      color: #fff;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.02em;
      box-shadow: 0 8px 20px -10px var(--c-primary);
    }

    .actions {
      display: grid;
      gap: 0.4rem;
    }

    .action {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.6rem 0.75rem;
      border-radius: var(--radius-sm);
      background: var(--c-surface-2);
      font-size: 0.88rem;
      font-weight: 500;
      transition:
        background 0.25s,
        color 0.25s;

      span {
        min-width: 0;
        overflow-wrap: anywhere;
      }

      app-icon {
        color: var(--c-primary);
      }

      @include m.hover {
        background: var(--c-primary-soft);
        color: var(--c-primary);
      }
    }
  `,
})
export class ExpertCard {
  readonly id = input.required<ContactId>();

  protected readonly t = inject(I18n).t;
  protected readonly contact = computed(() => CONTACTS[this.id()]);
}
