import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal } from '@angular/core';
import { I18n, LANG_LABELS } from '../../core/i18n/i18n';
import { Lang, LANGS } from '../../core/i18n/i18n.types';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-lang-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Flag],
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'open.set(false)',
    '[class.is-inline]': 'inline()',
  },
  template: `
    @if (inline()) {
      <div class="inline" role="group" [attr.aria-label]="i18n.t().language.label">
        @for (lang of langs; track lang) {
          <button type="button" [attr.aria-pressed]="i18n.lang() === lang" (click)="choose(lang)" [attr.title]="labels[lang].name">
            <app-flag [lang]="lang" />
            {{ labels[lang].short }}
          </button>
        }
      </div>
    } @else {
      <button
        type="button"
        class="trigger"
        [attr.aria-expanded]="open()"
        aria-haspopup="true"
        [attr.aria-label]="i18n.t().language.label"
        (click)="open.set(!open())"
      >
        <app-flag [lang]="i18n.lang()" />
        <span>{{ labels[i18n.lang()].short }}</span>
        <app-icon name="chevron-down" [size]="14" class="chevron" />
      </button>
      @if (open()) {
        <ul class="menu" role="menu">
          @for (lang of langs; track lang; let i = $index) {
            <li role="none" [style.--i]="i">
              <button type="button" role="menuitemradio" [attr.aria-checked]="i18n.lang() === lang" (click)="choose(lang)">
                <app-flag [lang]="lang" />
                <span>{{ labels[lang].name }}</span>
                @if (i18n.lang() === lang) {
                  <app-icon name="check" [size]="16" />
                }
              </button>
            </li>
          }
        </ul>
      }
    }
  `,
  styles: `
    :host {
      position: relative;
      display: inline-block;
    }

    :host(.is-inline) {
      display: block;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      height: 2.5rem;
      padding: 0 0.75rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--c-border);
      background: var(--c-surface-2);
      font-size: 0.85rem;
      font-weight: 600;
      transition: border-color 0.25s;

      &:hover {
        border-color: var(--c-border-strong);
      }

      .chevron {
        transition: transform 0.3s var(--ease-out);
      }

      &[aria-expanded='true'] .chevron {
        transform: rotate(180deg);
      }
    }

    .menu {
      position: absolute;
      top: calc(100% + 0.6rem);
      right: 0;
      z-index: 10;
      min-width: 12rem;
      padding: 0.4rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      box-shadow: var(--shadow-lg);
      list-style: none;
      transform-origin: top right;
      animation: pop 0.18s var(--ease-out);

      button {
        display: grid;
        grid-template-columns: 2rem 1fr auto;
        align-items: center;
        width: 100%;
        padding: 0.6rem 0.7rem;
        border-radius: var(--radius-sm);
        text-align: left;
        font-size: 0.92rem;
        transition: background 0.2s;

        &:hover {
          background: var(--c-surface-2);
        }

        &[aria-checked='true'] {
          color: var(--c-primary);
          font-weight: 600;
        }
      }

    }

    .inline {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.35rem;

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        height: 2.75rem;
        padding: 0 0.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--c-border);
        font-size: 0.85rem;
        font-weight: 600;
        transition:
          background 0.25s,
          color 0.25s;

        &[aria-pressed='true'] {
          background: var(--c-primary);
          border-color: transparent;
          color: var(--c-primary-ink);
        }
      }
    }

    @keyframes pop {
      from {
        opacity: 0;
        transform: scale(0.94) translateY(-6px);
      }
    }

  `,
})
export class LangSwitch {
  /** Inline variant: a row of language buttons (used in the mobile menu). */
  readonly inline = input(false);

  protected readonly i18n = inject(I18n);
  protected readonly langs = LANGS;
  protected readonly labels = LANG_LABELS;
  protected readonly open = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected choose(lang: Lang): void {
    this.open.set(false);
    if (lang !== this.i18n.lang()) void this.i18n.use(lang);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.contains(event.target as Node)) this.open.set(false);
  }
}
