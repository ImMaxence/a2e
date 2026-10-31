import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhotoId, photoSrc, photoSrcset } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icons';
import { RichText } from '../rich-text/rich-text';

export interface Crumb {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, RichText],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss',
})
export class PageHero {
  readonly eyebrow = input<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>();
  readonly crumbs = input<Crumb[]>([]);
  readonly icon = input<IconName>();
  readonly image = input<PhotoId>();

  protected readonly t = inject(I18n).t;
  protected readonly photoSrc = photoSrc;
  protected readonly photoSrcset = photoSrcset;
}
