/**
 * Rich text uses a tiny inline markup, rendered by <app-rich-text>:
 *   **bold**, [label](/internal/route), [label](https://external), [label](doc:path/in/docs.pdf), [label](mailto:x)
 */
export type RichText = string;

export type FigureId =
  | 'anc-installation'
  | 'anc-principe'
  | 'autosurveillance-systeme'
  | 'bilan-courbe-debit'
  | 'bilan-seuil-rectangulaire'
  | 'piezometre'
  | 'piezometre-modelisation'
  | 'garantie-preleveur'
  | 'garantie-debitmetre'
  | 'oxygenation-aeration'
  | 'zonage-schema'
  | 'zonage-etude'
  | 'zonage-carte'
  | 'zonage-test-fumee';

export type SpecialBlockId = 'convention-table' | 'odor-table' | 'odor-methods';

export type Block =
  | { kind: 'p'; text: RichText }
  | { kind: 'h'; text: string; id?: string }
  | { kind: 'list'; items: RichText[]; variant?: 'check' | 'dot' | 'steps' }
  | { kind: 'figure'; figure: FigureId; alt: string; caption?: string }
  | { kind: 'figures'; items: { figure: FigureId; alt: string; caption?: string }[] }
  | { kind: 'quote'; paragraphs: RichText[]; list?: RichText[]; after?: RichText; source: string }
  | { kind: 'panels'; items: { title: string; intro?: string; items: RichText[] }[] }
  | { kind: 'callout'; title?: string; text: RichText; tone?: 'info' | 'accent' }
  | { kind: 'facts'; items: { label: string; value: RichText }[] }
  | { kind: 'docs'; title?: string; id?: string; docs: DocId[] }
  | { kind: 'special'; id: SpecialBlockId };

export type ServiceId =
  | 'anc'
  | 'autosurveillance'
  | 'zonage'
  | 'eaux-souterraines'
  | 'odeurs'
  | 'oxygenation'
  | 'garantie'
  | 'rejets'
  | 'convention'
  | 'formation';

export type ServiceGroupId = 'stations' | 'sanitation' | 'water' | 'training';

export type RegulationId = 'anc' | 'rejets' | 'rsde-industrie' | 'rsde-step';

export type ContactId = 'jfb' | 'lm';

export type ReferenceTag = 'training' | 'selfMonitoring' | 'monitoring' | 'measures' | 'studies';

export type DocId =
  | 'anc-2007-06-22'
  | 'anc-2009-03-30'
  | 'anc-2009-09-07-vidanges'
  | 'anc-2009-09-07-prescriptions'
  | 'anc-2010-08-02'
  | 'anc-2010-12-03'
  | 'anc-2012-03-07'
  | 'anc-2012-04-27'
  | 'anc-circulaire-1997'
  | 'as-prescriptions-rmc'
  | 'as-loi-2006'
  | 'as-directive-eru'
  | 'as-guide-deru'
  | 'as-note-2019'
  | 'as-arrete-2015'
  | 'as-arrete-2020'
  | 'as-commentaires-1'
  | 'as-commentaires-2'
  | 'as-commentaires-3'
  | 'as-note-2015'
  | 'as-habilitation'
  | 'rejets-1998'
  | 'rsdei-directive'
  | 'rsdei-circulaire-2009'
  | 'rsdei-annexe-1'
  | 'rsdei-annexe-2'
  | 'rsdei-annexe-3'
  | 'rsdei-annexe-4'
  | 'rsdei-annexe-5'
  | 'rsdei-annexe-6'
  | 'rsdei-tableau-qualite'
  | 'rsdei-substances'
  | 'rsdei-note-2010'
  | 'rsdei-note-2011'
  | 'rsdei-note-2012'
  | 'rsdei-aide-rmc'
  | 'rsdes-arrete-2008'
  | 'rsdes-arrete-2010'
  | 'rsdes-circulaire-2010';
