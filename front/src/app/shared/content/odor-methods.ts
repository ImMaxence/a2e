import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-odor-methods',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    @let m = t().special.odorMethods;
    <figure class="flow">
      <figcaption>{{ m.caption }}</figcaption>

      <div class="trunk">
        <div class="node node--main"><app-icon name="wind" [size]="18" />{{ m.pump }}</div>
        <span class="pipe" aria-hidden="true"></span>
        <div class="node node--main"><app-icon name="flask" [size]="18" />{{ m.traps }}</div>
        <span class="pipe" aria-hidden="true"></span>
      </div>

      <div class="branches">
        @for (b of branches(); track $index) {
          <div class="branch" [style.--col]="$index + 1">
            <div class="node">{{ b.sampling }}</div>
            <span class="lab" aria-hidden="true"><app-icon name="arrow-right" [size]="14" />{{ m.transport }}</span>
            <div class="node node--soft">{{ b.analysis }}</div>
            @if (b.extra) {
              <div class="node node--soft">{{ b.extra }}</div>
            } @else {
              <span class="spacer" aria-hidden="true"></span>
            }
            <div class="node node--target">{{ b.target }}</div>
          </div>
        }
        <p class="band"><app-icon name="arrow-right" [size]="16" />{{ m.transport }}</p>
      </div>
    </figure>
  `,
  styleUrl: './odor-methods.scss',
})
export class OdorMethods {
  protected readonly t = inject(I18n).t;

  protected readonly branches = computed(() => {
    const m = this.t().special.odorMethods;
    return m.sampling.map((sampling, i) => ({
      sampling,
      analysis: m.analysis[i],
      extra: i === 3 ? m.ammonium : null,
      target: m.targets[i],
    }));
  });
}
