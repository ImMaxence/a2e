import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Dictionary, Lang, LANGS } from './i18n.types';

const STORAGE_KEY = 'a2e.lang';

const LOADERS: Record<Lang, () => Promise<{ default: Dictionary }>> = {
  fr: () => import('./locales/fr'),
  en: () => import('./locales/en'),
  es: () => import('./locales/es'),
  it: () => import('./locales/it'),
};

export const LANG_LABELS: Record<Lang, { short: string; name: string }> = {
  fr: { short: 'FR', name: 'Français' },
  en: { short: 'EN', name: 'English' },
  es: { short: 'ES', name: 'Español' },
  it: { short: 'IT', name: 'Italiano' },
};

@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly document = inject(DOCUMENT);
  private readonly _lang = signal<Lang>('fr');
  private readonly _dict = signal<Dictionary | null>(null);

  readonly lang = this._lang.asReadonly();
  /** Current dictionary. Always set once the app has bootstrapped (see provideAppInitializer). */
  readonly t = () => this._dict()!;

  async init(): Promise<void> {
    await this.use(this.detect());
  }

  /** Switches language instantly: a cross-fade would show both translations on top of each other. */
  async use(lang: Lang): Promise<void> {
    const { default: dict } = await LOADERS[lang]();
    this._dict.set(dict);
    this._lang.set(lang);
    this.document.documentElement.lang = lang;
    this.document.title = dict.meta.title;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }

  private detect(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (this.isLang(stored)) return stored;
    } catch {
      /* storage unavailable */
    }
    for (const candidate of navigator.languages ?? [navigator.language]) {
      const short = candidate?.slice(0, 2).toLowerCase();
      if (this.isLang(short)) return short;
    }
    return 'fr';
  }

  private isLang(value: unknown): value is Lang {
    return LANGS.includes(value as Lang);
  }
}
