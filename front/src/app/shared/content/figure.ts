import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { FigureId } from '../../core/content/content.types';
import { FIGURES } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-figure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <figure [class.is-diagram]="meta().diagram" [style.--w.px]="meta().width">
      @if (zoomable()) {
        <button type="button" class="frame" (click)="open()" [attr.aria-label]="t().common.enlarge">
          <img [src]="src()" [alt]="alt()" [width]="meta().width" [height]="meta().height" loading="lazy" decoding="async" />
          <span class="zoom"><app-icon name="zoom" [size]="18" /></span>
        </button>
      } @else {
        <div class="frame">
          <img [src]="src()" [alt]="alt()" [width]="meta().width" [height]="meta().height" loading="lazy" decoding="async" />
        </div>
      }
      @if (caption()) {
        <figcaption>{{ caption() }}</figcaption>
      }
    </figure>

    @if (zoomable()) {
      <dialog #dialog (click)="onDialogClick($event)" [attr.aria-label]="alt()">
        <img [src]="src()" [alt]="alt()" [width]="meta().width" [height]="meta().height" />
        @if (caption()) {
          <p>{{ caption() }}</p>
        }
        <button type="button" class="icon-btn close" (click)="dialog.close()" [attr.aria-label]="t().common.close">
          <app-icon name="close" />
        </button>
      </dialog>
    }
  `,
  styleUrl: './figure.scss',
})
export class Figure {
  readonly figure = input.required<FigureId>();
  readonly alt = input.required<string>();
  readonly caption = input<string>();

  protected readonly t = inject(I18n).t;
  protected readonly meta = computed(() => FIGURES[this.figure()]);
  protected readonly src = computed(() => `/images/figures/${this.figure()}.webp`);
  protected readonly zoomable = computed(() => this.meta().width >= 400);

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  protected open(): void {
    this.dialog()?.nativeElement.showModal();
  }

  protected onDialogClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.dialog()?.nativeElement.close();
  }
}
