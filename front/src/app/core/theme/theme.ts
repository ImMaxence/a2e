import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Injectable, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'auto' | 'dark';

const STORAGE_KEY = 'a2e.theme';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly _mode = signal<ThemeMode>(this.read());

  readonly mode = this._mode.asReadonly();

  constructor() {
    this.apply(this._mode());
  }

  /** Switches theme with a circular reveal starting from the pointer position. */
  set(mode: ThemeMode, origin?: { x: number; y: number }): void {
    if (mode === this._mode()) return;

    const root = this.document.documentElement;
    const doc = this.document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const commit = () => {
      this._mode.set(mode);
      this.apply(mode);
      // Render now so the new snapshot already shows the updated switch.
      this.appRef.tick();
    };

    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      commit();
      return;
    }

    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${radius}px`);
    root.classList.add('theme-transition');

    doc.startViewTransition(commit).finished.finally(() => root.classList.remove('theme-transition'));
  }

  private apply(mode: ThemeMode): void {
    const root = this.document.documentElement;
    if (mode === 'auto') delete root.dataset['theme'];
    else root.dataset['theme'] = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable */
    }
  }

  private read(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored;
    } catch {
      /* storage unavailable */
    }
    return 'auto';
  }
}
