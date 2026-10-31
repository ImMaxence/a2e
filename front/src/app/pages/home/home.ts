import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceGroupId } from '../../core/content/content.types';
import {
  AGENCIES,
  REFERENCES,
  SERVICE_GROUPS,
  SERVICES,
  photoSrc,
  photoSrcset,
  serviceById,
} from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { Icon } from '../../shared/icon/icon';
import { CountUp } from '../../shared/motion/count-up';
import { Reveal } from '../../shared/motion/reveal';
import { RichText } from '../../shared/rich-text/rich-text';
import { ServiceCard } from '../../shared/service-card/service-card';

type Filter = ServiceGroupId | 'all';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal, CountUp, RichText, ServiceCard, CtaBand],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly t = inject(I18n).t;
  protected readonly groups = SERVICE_GROUPS;
  protected readonly agencies = AGENCIES;
  protected readonly serviceById = serviceById;
  protected readonly photoSrc = photoSrc;
  protected readonly photoSrcset = photoSrcset;
  protected readonly references = REFERENCES;

  protected readonly filter = signal<Filter>('all');
  protected readonly visibleServices = computed(() => {
    const f = this.filter();
    return SERVICES.filter((s) => f === 'all' || s.group === f).map((s) => s.id);
  });

  private readonly appRef = inject(ApplicationRef);
  private readonly document = inject(DOCUMENT);

  protected setFilter(filter: Filter): void {
    if (filter === this.filter()) return;
    const doc = this.document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const root = this.document.documentElement;
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.filter.set(filter);
      return;
    }
    root.classList.add('vt-local');
    doc
      .startViewTransition(() => {
        this.filter.set(filter);
        this.appRef.tick();
      })
      .finished.finally(() => root.classList.remove('vt-local'));
  }
}
