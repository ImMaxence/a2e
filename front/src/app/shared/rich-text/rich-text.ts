import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocId, RichText as RichTextValue } from '../../core/content/content.types';
import { docUrl } from '../../core/content/site.data';
import { Icon } from '../icon/icon';

type Token =
  | { type: 'text'; value: string; bold: boolean }
  | { type: 'route' | 'doc' | 'external' | 'mail'; label: string; href: string };

const PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseRichText(source: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of source.matchAll(PATTERN)) {
    if (match.index > last) tokens.push({ type: 'text', value: source.slice(last, match.index), bold: false });
    if (match[1] !== undefined) {
      tokens.push({ type: 'text', value: match[1], bold: true });
    } else {
      const [label, href] = [match[2], match[3]];
      if (href.startsWith('doc:')) tokens.push({ type: 'doc', label, href: docUrl(href.slice(4) as DocId) });
      else if (href.startsWith('mailto:')) tokens.push({ type: 'mail', label, href });
      else if (href.startsWith('/')) tokens.push({ type: 'route', label, href });
      else tokens.push({ type: 'external', label, href });
    }
    last = match.index + match[0].length;
  }
  if (last < source.length) tokens.push({ type: 'text', value: source.slice(last), bold: false });
  return tokens;
}

/** Renders the inline markup described in content.types.ts — no innerHTML involved. */
@Component({
  selector: 'app-rich-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  // Kept on single lines on purpose: any whitespace here would render as a visible space between tokens.
  // prettier-ignore
  template: `@for (tok of tokens(); track $index) {@switch (tok.type) {@case ('text') {@if (tok.bold) {<strong>{{ tok.value }}</strong>} @else {{{ tok.value }}}}@case ('route') {<a class="rt-link" [routerLink]="tok.href">{{ tok.label }}</a>}@case ('doc') {<a class="rt-link rt-link--doc" [href]="tok.href" target="_blank" rel="noopener">{{ tok.label }}<app-icon name="file" [size]="14" /></a>}@case ('mail') {<a class="rt-link" [href]="tok.href">{{ tok.label }}</a>}@default {<a class="rt-link" [href]="tok.href" target="_blank" rel="noopener noreferrer">{{ tok.label }}<app-icon name="arrow-up-right" [size]="14" /></a>}}}`,
})
export class RichText {
  readonly text = input.required<RichTextValue>();
  protected readonly tokens = computed(() => parseRichText(this.text()));
}
