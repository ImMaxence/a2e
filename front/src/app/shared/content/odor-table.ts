import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n';
import { Formula } from './formula';

/** Rows per chemical family, in the order of the locale's `classes` list. */
const FAMILY_SIZES = [6, 7, 3, 4, 1, 4];

/** Language-independent data: formula (`_n` = subscript) and olfactory threshold range. */
const ROWS: [formula: string, threshold: string][] = [
  ['H_2S', '0.0001 – 0.03'],
  ['CH_3SH', '0.0005 – 0.08'],
  ['C_2H_5SH', '0.0025 – 0.03'],
  ['2(CH_3)-S', '0.0025 – 0.65'],
  ['2(C_2H_5)-S', '0.0045 – 0.31'],
  ['2(CH_3)-2S', '0.003 – 0.014'],
  ['NH_3', '0.5 – 37'],
  ['CH_3-NH_2', '0.021 – 33'],
  ['C_2H_5-NH_2', '0.05 – 0.83'],
  ['2(CH_3)-NH', '0.047 – 0.16'],
  ['C_8H_6-NH', '0.0006'],
  ['C_9H_8-NH', '0.0008 – 0.1'],
  ['NH_2-(CH_2)_5-NH_2', '—'],
  ['CH_3-COOH', '0.025 – 6.5'],
  ['C_3H_7-COOH', '0.0004 – 3'],
  ['C_4H_9-COOH', '0.0008 – 1.3'],
  ['H-CHO', '0.033 – 12'],
  ['CH_3-CHO', '0.04 – 1.8'],
  ['C_3H_7-CHO', '0.013 – 15'],
  ['2(CH_3)-CH-CH_2-CHO', '0.072'],
  ['CH_3-CO-CH_3', '1.1 – 240'],
  ['CH_3-CH_2-OH', '0.2'],
  ['C_3H_7-CH_2-OH', '0.006 – 0.13'],
  ['C_6H_5-OH', '0.0002 – 0.004'],
  ['C_6H_4-CH_3-OH', '0.00001'],
];

@Component({
  selector: 'app-odor-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Formula],
  template: `
    @let o = t().special.odorTable;
    <figure class="wrap">
      <div class="scroller" tabindex="0" role="region" [attr.aria-label]="o.caption">
        <table>
          <caption>{{ o.caption }}</caption>
          <thead>
            <tr>
              @for (h of o.headers; track h) {
                <th scope="col">{{ h }}</th>
              }
            </tr>
          </thead>
          @for (family of families(); track family.name) {
            <tbody>
              @for (row of family.rows; track row.compound; let first = $first) {
                <tr>
                  @if (first) {
                    <th scope="rowgroup" [attr.rowspan]="family.rows.length">
                      <span class="family">{{ family.name }}</span>
                    </th>
                  }
                  <td class="compound">{{ row.compound }}</td>
                  <td class="formula"><app-formula [value]="row.formula" /></td>
                  <td>{{ row.odor }}</td>
                  <td class="num">{{ row.threshold }}</td>
                </tr>
              }
            </tbody>
          }
        </table>
      </div>
      <figcaption>{{ o.source }}</figcaption>
    </figure>
  `,
  styles: `
    .wrap {
      display: grid;
      gap: 0.75rem;
    }

    // Scroll shadows: an edge fades in on the side where more columns are hidden.
    .scroller {
      overflow-x: auto;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background:
        linear-gradient(to right, var(--c-surface) 30%, transparent) left / 2.5rem 100% no-repeat local,
        linear-gradient(to left, var(--c-surface) 30%, transparent) right / 2.5rem 100% no-repeat local,
        radial-gradient(farthest-side at 0 50%, rgb(0 0 0 / 0.14), transparent) left / 0.9rem 100% no-repeat scroll,
        radial-gradient(farthest-side at 100% 50%, rgb(0 0 0 / 0.14), transparent) right / 0.9rem 100% no-repeat scroll,
        var(--c-surface);
      scrollbar-width: thin;
    }

    table {
      width: 100%;
      min-width: 720px;
      border-collapse: collapse;
      font-size: 0.92rem;
    }

    caption {
      padding: 1.1rem 1.25rem 0.4rem;
      text-align: left;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.1rem;
    }

    thead th {
      position: sticky;
      top: 0;
      padding: 0.85rem 1rem;
      background: var(--c-surface-2);
      border-bottom: 1px solid var(--c-border-strong);
      text-align: left;
      font-size: var(--fs-xs);
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--c-muted);
    }

    tbody + tbody {
      border-top: 1px solid var(--c-border-strong);
    }

    td,
    tbody th {
      padding: 0.6rem 1rem;
      text-align: left;
      vertical-align: top;
    }

    tbody tr {
      transition: background 0.2s;

      &:hover {
        background: var(--c-primary-soft);
      }
    }

    .family {
      display: inline-block;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-full);
      background: var(--c-accent-soft);
      color: var(--c-accent);
      font-size: 0.82rem;
      font-weight: 600;
    }

    .compound {
      font-weight: 600;
    }

    .formula {
      font-family: ui-monospace, 'Cascadia Code', 'SF Mono', monospace;
      font-size: 0.86rem;
      white-space: nowrap;
    }

    .num {
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    figcaption {
      font-size: var(--fs-xs);
      color: var(--c-muted);
      font-style: italic;
    }
  `,
})
export class OdorTable {
  protected readonly t = inject(I18n).t;

  protected readonly families = computed(() => {
    const o = this.t().special.odorTable;
    const comma = !this.t().meta.locale.startsWith('en');
    let index = 0;
    return o.classes.map((name, f) => ({
      name,
      rows: Array.from({ length: FAMILY_SIZES[f] }, () => {
        const i = index++;
        const [formula, threshold] = ROWS[i];
        return {
          compound: o.compounds[i],
          odor: o.odors[i],
          formula,
          threshold: comma ? threshold.replaceAll('.', ',') : threshold,
        };
      }),
    }));
  });
}
