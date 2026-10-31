import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Renders a chemical formula where `_n` marks a subscript, e.g. `C_2H_5SH`. */
@Component({
  selector: 'app-formula',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@for (part of parts(); track $index) {@if (part.sub) {<sub>{{ part.text }}</sub>} @else {{{ part.text }}}}`,
})
export class Formula {
  readonly value = input.required<string>();

  protected readonly parts = computed(() =>
    this.value()
      .split(/_(\d+)/)
      .map((text, i) => ({ text, sub: i % 2 === 1 }))
      .filter((p) => p.text),
  );
}
