import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AGENCIES, COMPANY, CONTACTS, REGULATIONS, SERVICES } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly t = inject(I18n).t;
  protected readonly services = SERVICES;
  protected readonly regulations = REGULATIONS;
  protected readonly contacts = Object.values(CONTACTS);
  protected readonly agencies = AGENCIES;
  protected readonly company = COMPANY;
  protected readonly year = new Date().getFullYear();

  protected toTop(): void {
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}
