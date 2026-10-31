import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { Theme, ThemeMode } from '../../core/theme/theme';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';

const MODES: { mode: ThemeMode; icon: IconName }[] = [
  { mode: 'light', icon: 'sun' },
  { mode: 'auto', icon: 'monitor' },
  { mode: 'dark', icon: 'moon' },
];

@Component({
  selector: 'app-theme-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { '[class.is-labeled]': 'labeled()' },
  template: `
    <div class="switch" role="radiogroup" [attr.aria-label]="t().theme.label" [style.--index]="index()">
      <span class="thumb" aria-hidden="true"></span>
      @for (m of modes; track m.mode) {
        <button
          type="button"
          role="radio"
          [attr.aria-checked]="theme.mode() === m.mode"
          [attr.aria-label]="t().theme[m.mode]"
          [attr.title]="t().theme[m.mode]"
          (click)="select(m.mode, $event)"
        >
          <app-icon [name]="m.icon" [size]="labeled() ? 18 : 16" />
          @if (labeled()) {
            <span>{{ t().theme[m.mode] }}</span>
          }
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    // Larger, full-width variant with text labels (mobile menu).
    :host(.is-labeled) {
      display: block;

      .switch {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 4px;
      }

      .thumb {
        top: 4px;
        left: 4px;
        width: calc((100% - 8px) / 3);
        height: calc(100% - 8px);
      }

      button {
        gap: 0.45rem;
        height: 2.75rem;
        font-size: 0.92rem;
        font-weight: 600;
      }
    }

    .switch {
      position: relative;
      display: inline-grid;
      grid-template-columns: repeat(3, 2rem);
      padding: 3px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--c-border);
      background: var(--c-surface-2);
    }

    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: calc((100% - 6px) / 3);
      height: calc(100% - 6px);
      border-radius: var(--radius-sm);
      background: var(--c-surface);
      box-shadow: var(--shadow-sm);
      transform: translateX(calc(var(--index) * 100%));
      transition: transform 0.25s var(--ease-out);
    }

    button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      border-radius: var(--radius-sm);
      color: var(--c-muted);
      transition: color 0.3s;

      &[aria-checked='true'] {
        color: var(--c-primary);
      }

      &:hover {
        color: var(--c-ink);
      }
    }
  `,
})
export class ThemeSwitch {
  /** Shows text labels next to the icons, in a larger full-width layout. */
  readonly labeled = input(false);

  protected readonly theme = inject(Theme);
  protected readonly t = inject(I18n).t;
  protected readonly modes = MODES;
  protected readonly index = computed(() => MODES.findIndex((m) => m.mode === this.theme.mode()));

  protected select(mode: ThemeMode, event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.theme.set(mode, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }
}
