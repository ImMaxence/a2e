import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CONTACTS,
  SERVICES,
  SERVICE_GROUPS,
  regulationById,
  serviceById,
  serviceBySlug,
} from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Blocks } from '../../shared/content/blocks';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { ExpertCard } from '../../shared/expert-card/expert-card';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';
import { ServiceCard } from '../../shared/service-card/service-card';

@Component({
  selector: 'app-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, Blocks, ExpertCard, ServiceCard, Icon, Reveal, CtaBand],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail {
  /** Route param, bound through withComponentInputBinding(). Validated by the route's canMatch. */
  readonly slug = input.required<string>();

  protected readonly t = inject(I18n).t;
  protected readonly serviceById = serviceById;
  protected readonly meta = computed(() => serviceBySlug(this.slug())!);
  protected readonly primaryContact = computed(() => CONTACTS[this.meta().contacts[0]]);
  protected readonly copy = computed(() => this.t().services[this.meta().id]);
  protected readonly group = computed(() => SERVICE_GROUPS.find((g) => g.id === this.meta().group)!);
  protected readonly regulations = computed(() => this.meta().regulations.map(regulationById));

  protected readonly siblings = computed(() => {
    const index = SERVICES.indexOf(this.meta());
    const at = (offset: number) => SERVICES[(index + offset + SERVICES.length) % SERVICES.length];
    return { previous: at(-1), next: at(1) };
  });

  /** Same-group services first, then the following ones, to always show three. */
  protected readonly related = computed(() => {
    const current = this.meta();
    const sameGroup = SERVICES.filter((s) => s.group === current.group && s.id !== current.id);
    const index = SERVICES.indexOf(current);
    const following = [...SERVICES.slice(index + 1), ...SERVICES.slice(0, index)].filter(
      (s) => !sameGroup.includes(s),
    );
    return [...sameGroup, ...following].slice(0, 3).map((s) => s.id);
  });
}
