import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceId } from '../../core/content/content.types';
import { photoSrc, photoSrcset, serviceById } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-service-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    @let copy = t().services[service()];
    <a class="card" [routerLink]="['/prestations', meta().slug]">
      <span class="media">
        <img
          [src]="src()"
          [srcset]="srcset()"
          sizes="(min-width: 1080px) 400px, (min-width: 640px) 50vw, 100vw"
          alt=""
          width="800"
          height="533"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span class="body">
        <span class="title">
          <span class="icon"><app-icon [name]="meta().icon" [size]="18" /></span>
          {{ copy.nav }}
        </span>
        <span class="text">{{ copy.short }}</span>
        <span class="more">
          {{ t().common.learnMore }}
          <app-icon name="arrow-right" [size]="16" />
        </span>
      </span>
    </a>
  `,
  styles: `
    @use 'mixins' as m;

    :host {
      display: block;
      height: 100%;
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      overflow: hidden;
      transition:
        border-color 0.2s,
        box-shadow 0.2s;

      @include m.hover {
        border-color: color-mix(in srgb, var(--c-primary) 35%, transparent);
        box-shadow: var(--shadow-md);

        img {
          transform: scale(1.03);
        }

        .more {
          color: var(--c-primary);

          app-icon {
            transform: translateX(3px);
          }
        }
      }
    }

    .media {
      display: block;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: var(--c-surface-2);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s var(--ease-out);
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0.5rem;
      padding: 1.1rem 1.2rem 1.15rem;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.25;
    }

    .icon {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: var(--radius-sm);
      background: var(--c-primary-soft);
      color: var(--c-primary);
    }

    .text {
      font-size: 0.92rem;
      line-height: 1.55;
      color: var(--c-muted);
    }

    .more {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      margin-top: auto;
      padding-top: 0.4rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--c-ink-soft);
      transition: color 0.2s;

      app-icon {
        transition: transform 0.2s var(--ease-out);
      }
    }

    // Phones: compact list rows instead of tall cards.
    @include m.down(sm) {
      .card {
        flex-direction: row;
        align-items: stretch;
      }

      .media {
        flex: 0 0 6.5rem;
        aspect-ratio: auto;
      }

      .body {
        gap: 0.3rem;
        padding: 0.8rem 0.9rem;
      }

      .title {
        font-size: 1rem;
      }

      .icon,
      .more {
        display: none;
      }

      .text {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 0.86rem;
        line-height: 1.45;
      }
    }
  `,
})
export class ServiceCard {
  readonly service = input.required<ServiceId>();

  protected readonly t = inject(I18n).t;
  protected readonly meta = computed(() => serviceById(this.service()));
  protected readonly src = computed(() => photoSrc(this.meta().image));
  protected readonly srcset = computed(() => photoSrcset(this.meta().image));
}
