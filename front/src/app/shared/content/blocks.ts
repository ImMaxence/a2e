import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Block } from '../../core/content/content.types';
import { Icon } from '../icon/icon';
import { Reveal } from '../motion/reveal';
import { RichText } from '../rich-text/rich-text';
import { ConventionTable } from './convention-table';
import { DocList } from './doc-list';
import { Figure } from './figure';
import { OdorMethods } from './odor-methods';
import { OdorTable } from './odor-table';

@Component({
  selector: 'app-blocks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RichText, Icon, Reveal, Figure, DocList, ConventionTable, OdorTable, OdorMethods],
  templateUrl: './blocks.html',
  styleUrl: './blocks.scss',
})
export class Blocks {
  readonly blocks = input.required<Block[]>();
}
