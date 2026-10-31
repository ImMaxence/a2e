import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { SERVICE_GROUPS, REGULATIONS, serviceById } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../../shared/icon/icon';
import { Logo } from '../../shared/logo/logo';
import { LangSwitch } from '../lang-switch/lang-switch';
import { ThemeSwitch } from '../theme-switch/theme-switch';

type Panel = 'services' | 'regulations';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icon, Logo, LangSwitch, ThemeSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '[class.is-hidden]': 'hidden() && !panel() && !mobileOpen()',
    '[class.is-open]': 'mobileOpen()',
    '(keydown.escape)': 'closeAll()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Header {
  protected readonly t = inject(I18n).t;
  protected readonly groups = SERVICE_GROUPS;
  protected readonly regulations = REGULATIONS;
  protected readonly serviceById = serviceById;

  protected readonly scrolled = signal(false);
  protected readonly hidden = signal(false);
  protected readonly panel = signal<Panel | null>(null);
  protected readonly mobileOpen = signal(false);
  protected readonly mobileSection = signal<Panel | null>(null);

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      tap(() => this.closeAll()),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );
  protected readonly section = computed(() => this.url().split('/')[1]?.split(/[?#]/)[0] ?? '');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private closeTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      this.document.documentElement.classList.toggle('no-scroll', this.mobileOpen());
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let lastY = scrollY;
      const onScroll = () => {
        const y = scrollY;
        this.scrolled.set(y > 12);
        if (Math.abs(y - lastY) > 6) {
          this.hidden.set(y > lastY && y > 320);
          lastY = y;
        }
      };
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => removeEventListener('scroll', onScroll));
    });
  }

  protected openPanel(panel: Panel): void {
    clearTimeout(this.closeTimer);
    this.panel.set(panel);
  }

  protected scheduleClose(): void {
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => this.panel.set(null), 180);
  }

  /** A link picked in a panel closes it at once, so its exit plays while the route loads. */
  protected onPanelClick(event: MouseEvent): void {
    if ((event.target as Element).closest('a')) {
      clearTimeout(this.closeTimer);
      this.panel.set(null);
    }
  }

  protected togglePanel(panel: Panel): void {
    this.panel.set(this.panel() === panel ? null : panel);
  }

  /** Opening the menu unfolds the section of the current page, so its link is visible right away. */
  protected toggleMobile(): void {
    const open = !this.mobileOpen();
    if (open) {
      const current = this.section();
      this.mobileSection.set(current === 'prestations' ? 'services' : current === 'reglementation' ? 'regulations' : null);
    }
    this.mobileOpen.set(open);
  }

  protected toggleMobileSection(section: Panel): void {
    this.mobileSection.set(this.mobileSection() === section ? null : section);
  }

  protected closeAll(): void {
    this.panel.set(null);
    this.mobileOpen.set(false);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.panel() && !this.host.contains(event.target as Node)) this.panel.set(null);
  }
}
