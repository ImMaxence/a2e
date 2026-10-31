import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AGENCIES, COMPANY, CONTACTS, PHOTOS } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';

@Component({
  selector: 'app-legal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, Icon, Reveal],
  template: `
    @let tt = t();
    @let l = tt.legal;
    <app-page-hero [title]="l.title" [lead]="l.intro" [crumbs]="[{ label: l.title }]" />

    <div class="container legal">
      <section appReveal>
        <h2>{{ l.company }}</h2>
        <dl>
          <dt>{{ l.company }}</dt>
          <dd><strong>{{ company.name }}</strong> — {{ l.capital }} {{ company.capital }}</dd>
          <dt>{{ l.headOffice }}</dt>
          <dd>{{ agencies[0].lines.join(', ') }}</dd>
          <dt>{{ tt.agencies.brignoles }}</dt>
          <dd>{{ agencies[1].lines.join(', ') }}</dd>
          <dt>{{ l.registration }}</dt>
          <dd>
            RCS {{ company.rcs }}<br />
            SIREN {{ company.siren }} · SIRET {{ company.siret }}<br />
            APE {{ company.ape }} · TVA {{ company.vat }}
          </dd>
          <dt>{{ l.training }}</dt>
          <dd>{{ company.trainingId }}</dd>
          <dt>{{ l.publisher }}</dt>
          <dd>{{ contacts.lm.name }}</dd>
        </dl>
      </section>

      <section appReveal>
        <h2>{{ l.contacts }}</h2>
        <div class="people">
          @for (c of people; track c.id) {
            <div class="person">
              <strong>{{ c.name }}</strong>
              <p>{{ tt.contacts[c.id].domains }}</p>
              <a [href]="c.phoneHref"><app-icon name="phone" [size]="15" />{{ c.phone }}</a>
              <a [href]="'mailto:' + c.email"><app-icon name="mail" [size]="15" />{{ c.email }}</a>
            </div>
          }
        </div>
      </section>

      <section appReveal>
        <h2>{{ l.host }}</h2>
        <p>{{ company.host.join(' — ') }}</p>
      </section>

      <section appReveal>
        <h2>{{ l.property }}</h2>
        <p>{{ l.propertyText }}</p>
      </section>

      <section appReveal>
        <h2>CNIL</h2>
        <p>{{ l.cnil }}</p>
      </section>

      <section appReveal>
        <h2>{{ l.credits }}</h2>
        <p>{{ l.creditsText }}</p>
        <ul class="credits">
          @for (photo of photos; track photo.source) {
            <li>
              <a [href]="photo.source" target="_blank" rel="noopener noreferrer">{{ photo.author }}</a>
              <span>{{ photo.license }}</span>
            </li>
          }
        </ul>
      </section>
    </div>
  `,
  styles: `
    @use 'mixins' as m;

    .legal {
      display: grid;
      gap: 1.25rem;
      max-width: 900px;
      padding-bottom: var(--section-y);
    }

    section {
      display: grid;
      gap: 1rem;
      padding: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);

      h2 {
        font-size: var(--fs-xl);
      }

      p {
        color: var(--c-ink-soft);
      }
    }

    dl {
      display: grid;
      gap: 0.6rem 2rem;

      @include m.up(sm) {
        grid-template-columns: 200px 1fr;
      }
    }

    dt {
      font-size: var(--fs-sm);
      font-weight: 600;
      color: var(--c-muted);
    }

    dd {
      margin: 0 0 0.5rem;
    }

    .credits {
      display: grid;
      gap: 0.4rem;
      padding: 0;
      list-style: none;
      font-size: 0.9rem;

      li {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.25rem 1rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid var(--c-border);
      }

      a {
        color: var(--c-primary);
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      span {
        color: var(--c-muted);
      }
    }

    .people {
      display: grid;
      gap: 1rem;

      @include m.up(md) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .person {
      display: grid;
      gap: 0.35rem;
      padding: 1.1rem;
      border-radius: var(--radius-md);
      background: var(--c-surface-2);

      p {
        font-size: 0.88rem;
        color: var(--c-muted);
      }

      a {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.9rem;
        word-break: break-all;

        app-icon {
          color: var(--c-primary);
        }
      }
    }
  `,
})
export class Legal {
  protected readonly t = inject(I18n).t;
  protected readonly company = COMPANY;
  protected readonly agencies = AGENCIES;
  protected readonly contacts = CONTACTS;
  protected readonly people = Object.values(CONTACTS);
  protected readonly photos = Object.values(PHOTOS);
}
