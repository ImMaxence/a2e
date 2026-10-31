import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DocId } from '../../core/content/content.types';
import { DOCS, docUrl } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';
import { Reveal } from '../motion/reveal';

@Component({
  selector: 'app-doc-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <ul class="docs">
      @for (doc of items(); track doc.id; let i = $index) {
        <li appReveal [revealDelay]="(i % 6) * 30">
          <a class="doc" [href]="doc.url" target="_blank" rel="noopener" [attr.download]="doc.ext === 'pdf' ? null : ''">
            <span class="doc__badge" [attr.data-ext]="doc.ext">{{ doc.ext }}</span>
            <span class="doc__body">
              <span class="doc__title">{{ doc.title }}</span>
              <span class="doc__meta">{{ doc.size }} · {{ t().common.documentLang }}</span>
            </span>
            <span class="doc__action" [attr.aria-label]="t().common.download">
              <app-icon name="download" [size]="18" />
            </span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    @use 'mixins' as m;

    .docs {
      display: grid;
      gap: 0.75rem;
      padding: 0;
      list-style: none;
    }

    .doc {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.15rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      transition:
        border-color 0.3s,
        transform 0.4s var(--ease-out),
        box-shadow 0.4s var(--ease-out);

      @include m.hover {
        border-color: color-mix(in srgb, var(--c-primary) 40%, transparent);
        transform: none;
        box-shadow: var(--shadow-md);

        .doc__action {
          background: var(--c-primary);
          color: var(--c-primary-ink);
          transform: translateY(2px);
        }
      }
    }

    .doc__badge {
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3.4rem;
      border-radius: 10px 18px 10px 10px;
      background: color-mix(in srgb, #e5484d 12%, var(--c-surface));
      color: #d93f45;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;

      &[data-ext='doc'],
      &[data-ext='rtf'] {
        background: color-mix(in srgb, var(--c-primary) 12%, var(--c-surface));
        color: var(--c-primary);
      }
    }

    .doc__body {
      display: grid;
      gap: 0.2rem;
      min-width: 0;
    }

    .doc__title {
      font-weight: 600;
      line-height: 1.4;
      font-size: 0.98rem;
    }

    .doc__meta {
      font-size: var(--fs-xs);
      color: var(--c-muted);
    }

    .doc__action {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-full);
      background: var(--c-primary-soft);
      color: var(--c-primary);
      transition:
        background 0.3s,
        color 0.3s,
        transform 0.4s var(--ease-out);
    }
  `,
})
export class DocList {
  readonly docs = input.required<DocId[]>();

  protected readonly t = inject(I18n).t;

  protected readonly items = computed(() => {
    const dict = this.t();
    return this.docs().map((id) => {
      const { file, size } = DOCS[id];
      const mb = size / 1_048_576;
      const unit = new Intl.NumberFormat(dict.meta.locale, {
        style: 'unit',
        unit: mb >= 1 ? 'megabyte' : 'kilobyte',
        unitDisplay: 'short',
        maximumFractionDigits: mb >= 1 ? 1 : 0,
      });
      return {
        id,
        url: docUrl(id),
        title: dict.docs[id],
        ext: file.split('.').pop()!,
        size: unit.format(mb >= 1 ? mb : size / 1024),
      };
    });
  });
}
