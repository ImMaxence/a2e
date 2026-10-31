import { IconName } from '../../shared/icon/icons';
import {
  ContactId,
  DocId,
  FigureId,
  ReferenceTag,
  RegulationId,
  ServiceGroupId,
  ServiceId,
} from './content.types';

/** Language-independent data: slugs, files, people, addresses. Texts live in the locale files. */

export interface ServiceMeta {
  id: ServiceId;
  slug: string;
  icon: IconName;
  image: PhotoId;
  group: ServiceGroupId;
  contacts: ContactId[];
  regulations: RegulationId[];
}

export const SERVICES: ServiceMeta[] = [
  {
    id: 'anc',
    slug: 'assainissement-non-collectif',
    icon: 'home-drop',
    image: 'anc',
    group: 'sanitation',
    contacts: ['jfb'],
    regulations: ['anc'],
  },
  {
    id: 'autosurveillance',
    slug: 'autosurveillance-stations-epuration',
    icon: 'gauge',
    image: 'autosurveillance',
    group: 'stations',
    contacts: ['lm'],
    regulations: ['rsde-step'],
  },
  {
    id: 'zonage',
    slug: 'zonage-schema-directeur',
    icon: 'map',
    image: 'zonage',
    group: 'sanitation',
    contacts: ['jfb'],
    regulations: ['anc'],
  },
  {
    id: 'eaux-souterraines',
    slug: 'eaux-souterraines-piezometres',
    icon: 'layers',
    image: 'eaux',
    group: 'water',
    contacts: ['jfb', 'lm'],
    regulations: [],
  },
  {
    id: 'odeurs',
    slug: 'mesure-odeurs',
    icon: 'wind',
    image: 'odeurs',
    group: 'stations',
    contacts: ['lm'],
    regulations: [],
  },
  {
    id: 'oxygenation',
    slug: 'essais-oxygenation',
    icon: 'bubbles',
    image: 'oxygenation',
    group: 'stations',
    contacts: ['lm'],
    regulations: [],
  },
  {
    id: 'garantie',
    slug: 'essais-garantie',
    icon: 'badge-check',
    image: 'garantie',
    group: 'stations',
    contacts: ['lm'],
    regulations: ['rsde-step'],
  },
  {
    id: 'rejets',
    slug: 'rejets-aqueux-bilan-24h',
    icon: 'flask',
    image: 'rejets',
    group: 'water',
    contacts: ['lm'],
    regulations: ['rejets', 'rsde-industrie', 'rsde-step'],
  },
  {
    id: 'convention',
    slug: 'convention-de-rejet',
    icon: 'file-signature',
    image: 'convention',
    group: 'water',
    contacts: ['jfb'],
    regulations: ['rejets', 'rsde-industrie'],
  },
  {
    id: 'formation',
    slug: 'formations',
    icon: 'graduation',
    image: 'field',
    group: 'training',
    contacts: ['lm', 'jfb'],
    regulations: [],
  },
];

export const SERVICE_GROUPS: { id: ServiceGroupId; icon: IconName; services: ServiceId[] }[] = [
  { id: 'stations', icon: 'factory', services: ['autosurveillance', 'oxygenation', 'garantie', 'odeurs'] },
  { id: 'sanitation', icon: 'home-drop', services: ['anc', 'zonage'] },
  { id: 'water', icon: 'drop', services: ['rejets', 'eaux-souterraines', 'convention'] },
  { id: 'training', icon: 'graduation', services: ['formation'] },
];

export const serviceById = (id: ServiceId) => SERVICES.find((s) => s.id === id)!;
export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

export interface RegulationMeta {
  id: RegulationId;
  slug: string;
  icon: IconName;
  docs: DocId[];
  externalUrl?: string;
  services: ServiceId[];
}

export const REGULATIONS: RegulationMeta[] = [
  {
    id: 'anc',
    slug: 'assainissement-non-collectif',
    icon: 'home-drop',
    docs: [
      'anc-2007-06-22',
      'anc-2009-03-30',
      'anc-2009-09-07-vidanges',
      'anc-2009-09-07-prescriptions',
      'anc-2010-08-02',
      'anc-2010-12-03',
      'anc-2012-03-07',
      'anc-2012-04-27',
    ],
    externalUrl: 'https://www.assainissement-non-collectif.developpement-durable.gouv.fr',
    services: ['anc', 'zonage'],
  },
  {
    id: 'rejets',
    slug: 'normes-rejets-aqueux',
    icon: 'flask',
    docs: ['rejets-1998'],
    externalUrl: 'https://aida.ineris.fr',
    services: ['rejets', 'convention'],
  },
  {
    id: 'rsde-industrie',
    slug: 'rsde-rejets-industriels',
    icon: 'factory',
    docs: [
      'rsdei-directive',
      'rsdei-circulaire-2009',
      'rsdei-annexe-1',
      'rsdei-annexe-2',
      'rsdei-annexe-3',
      'rsdei-annexe-4',
      'rsdei-annexe-5',
      'rsdei-annexe-6',
      'rsdei-tableau-qualite',
      'rsdei-substances',
      'rsdei-note-2010',
      'rsdei-note-2011',
      'rsdei-note-2012',
      'rsdei-aide-rmc',
    ],
    externalUrl: 'https://rsde.ineris.fr',
    services: ['rejets', 'convention'],
  },
  {
    id: 'rsde-step',
    slug: 'rsde-stations-epuration',
    icon: 'gauge',
    docs: ['rsdes-arrete-2008', 'rsdes-arrete-2010', 'rsdes-circulaire-2010'],
    externalUrl: 'https://rsde.ineris.fr',
    services: ['autosurveillance', 'rejets'],
  },
];

export const regulationById = (id: RegulationId) => REGULATIONS.find((r) => r.id === id)!;

/** Regulatory texts listed on the self-monitoring service page (anchor #textes). */
export const SELF_MONITORING_DOCS: DocId[] = [
  'as-prescriptions-rmc',
  'as-loi-2006',
  'as-directive-eru',
  'as-guide-deru',
  'as-note-2019',
  'as-arrete-2015',
  'as-arrete-2020',
  'as-commentaires-1',
  'as-commentaires-2',
  'as-commentaires-3',
  'as-note-2015',
];
export const regulationBySlug = (slug: string) => REGULATIONS.find((r) => r.slug === slug);

export const DOCS: Record<DocId, { file: string; size: number }> = {
  'anc-2007-06-22': { file: 'anc/arrete-2007-06-22.pdf', size: 345965 },
  'anc-2009-03-30': { file: 'anc/arrete-2009-03-30-ecopret.pdf', size: 5637432 },
  'anc-2009-09-07-vidanges': { file: 'anc/arrete-2009-09-07-agrement-vidanges-consolide.pdf', size: 83808 },
  'anc-2009-09-07-prescriptions': { file: 'anc/arrete-2009-09-07-prescriptions-techniques.pdf', size: 387641 },
  'anc-2010-08-02': { file: 'anc/arrete-2010-08-02-reutilisation-eaux.pdf', size: 224817 },
  'anc-2010-12-03': { file: 'anc/arrete-2010-12-03-agrement-vidanges.pdf', size: 145071 },
  'anc-2012-03-07': { file: 'anc/arrete-2012-03-07-prescriptions-techniques.pdf', size: 152212 },
  'anc-2012-04-27': { file: 'anc/arrete-2012-04-27-controle.pdf', size: 1566553 },
  'anc-circulaire-1997': { file: 'anc/circulaire-97-49-1997-05-22.pdf', size: 72428 },
  'as-prescriptions-rmc': { file: 'autosurveillance/prescriptions-techniques-agence-eau-rmc.pdf', size: 1350868 },
  'as-loi-2006': { file: 'autosurveillance/loi-2006-1772-2006-12-30.rtf', size: 135668 },
  'as-directive-eru': { file: 'autosurveillance/directive-europeenne-eru.pdf', size: 54773 },
  'as-guide-deru': { file: 'autosurveillance/guide-definitions-deru.pdf', size: 713241 },
  'as-note-2019': { file: 'autosurveillance/note-technique-2019-06-06-deru.pdf', size: 134196 },
  'as-arrete-2015': { file: 'autosurveillance/arrete-2015-07-21.pdf', size: 382498 },
  'as-arrete-2020': { file: 'autosurveillance/arrete-2020-07-31.pdf', size: 261419 },
  'as-commentaires-1': { file: 'autosurveillance/commentaires-techniques-partie-1.pdf', size: 344665 },
  'as-commentaires-2': { file: 'autosurveillance/commentaires-techniques-partie-2.pdf', size: 465203 },
  'as-commentaires-3': { file: 'autosurveillance/commentaires-techniques-partie-3.pdf', size: 550171 },
  'as-note-2015': { file: 'autosurveillance/note-technique-2015-09-07.pdf', size: 39454 },
  'as-habilitation': { file: 'autosurveillance/habilitation-aermc-2023.pdf', size: 491718 },
  'rejets-1998': { file: 'rejets/arrete-1998-02-02.pdf', size: 2119140 },
  'rsdei-directive': { file: 'rsde-industrie/directive-76-464-cee.pdf', size: 1851230 },
  'rsdei-circulaire-2009': { file: 'rsde-industrie/circulaire-2009-01-05.pdf', size: 1534549 },
  'rsdei-annexe-1': { file: 'rsde-industrie/annexe-1.pdf', size: 138826 },
  'rsdei-annexe-2': { file: 'rsde-industrie/annexe-2.pdf', size: 38262 },
  'rsdei-annexe-3': { file: 'rsde-industrie/annexe-3.pdf', size: 33637 },
  'rsdei-annexe-4': { file: 'rsde-industrie/annexe-4.pdf', size: 260446 },
  'rsdei-annexe-5': { file: 'rsde-industrie/annexe-5.pdf', size: 339564 },
  'rsdei-annexe-6': { file: 'rsde-industrie/annexe-6.pdf', size: 31319 },
  'rsdei-tableau-qualite': { file: 'rsde-industrie/tableau-performances-assurance-qualite.doc', size: 190464 },
  'rsdei-substances': { file: 'rsde-industrie/substances-performances.pdf', size: 514792 },
  'rsdei-note-2010': { file: 'rsde-industrie/note-adaptations-2010-03-23.pdf', size: 2349198 },
  'rsdei-note-2011': { file: 'rsde-industrie/note-adaptations-2011-04.pdf', size: 2545911 },
  'rsdei-note-2012': { file: 'rsde-industrie/note-2011-04-27-modifiee-2012-02-03.pdf', size: 5328971 },
  'rsdei-aide-rmc': { file: 'rsde-industrie/dossier-aide-agence-eau-rmc.doc', size: 268288 },
  'rsdes-arrete-2008': { file: 'rsde-step/arrete-2008-01-31.pdf', size: 743289 },
  'rsdes-arrete-2010': { file: 'rsde-step/arrete-2010-01-25.pdf', size: 8414179 },
  'rsdes-circulaire-2010': { file: 'rsde-step/circulaire-2010-09-29.pdf', size: 2356662 },
};

export const FIGURES: Record<FigureId, { width: number; height: number; diagram?: boolean }> = {
  'anc-installation': { width: 526, height: 139, diagram: true },
  'anc-principe': { width: 356, height: 153, diagram: true },
  'autosurveillance-systeme': { width: 300, height: 225 },
  'bilan-courbe-debit': { width: 845, height: 476, diagram: true },
  'bilan-seuil-rectangulaire': { width: 300, height: 248 },
  piezometre: { width: 299, height: 249, diagram: true },
  'piezometre-modelisation': { width: 1014, height: 540, diagram: true },
  'garantie-preleveur': { width: 200, height: 241, diagram: true },
  'garantie-debitmetre': { width: 200, height: 221, diagram: true },
  'oxygenation-aeration': { width: 420, height: 263 },
  'zonage-schema': { width: 200, height: 301, diagram: true },
  'zonage-etude': { width: 350, height: 182 },
  'zonage-carte': { width: 500, height: 319, diagram: true },
  'zonage-test-fumee': { width: 300, height: 250 },
};

export interface Contact {
  id: ContactId;
  name: string;
  initials: string;
  email: string;
  phone: string;
  phoneHref: string;
}

export const CONTACTS: Record<ContactId, Contact> = {
  jfb: {
    id: 'jfb',
    name: 'Jean-François Bonnici',
    initials: 'JFB',
    email: 'jean-francois.bonnici@a2eenvironnement.fr',
    phone: '06 41 88 16 32',
    phoneHref: 'tel:+33641881632',
  },
  lm: {
    id: 'lm',
    name: 'Laurent Macario',
    initials: 'LM',
    email: 'laurent.macario@a2eenvironnement.fr',
    phone: '06 61 63 60 09',
    phoneHref: 'tel:+33661636009',
  },
};

export const AGENCIES = [
  {
    id: 'gardanne' as const,
    city: 'Gardanne',
    lines: ['31 lotissement les Oliviers', '13120 Gardanne'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=31+lotissement+les+Oliviers+13120+Gardanne',
  },
  {
    id: 'brignoles' as const,
    city: 'Brignoles',
    lines: ['ZAC Nicopolis, 60 rue des Lavandes', '83170 Brignoles'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=60+rue+des+Lavandes+ZAC+Nicopolis+83170+Brignoles',
  },
];

export const COMPANY = {
  name: 'A2E Environnement',
  legalForm: 'SARL',
  capital: '8 000 €',
  siren: '535 352 454',
  siret: '535 352 454 00032',
  rcs: 'Aix-en-Provence 535 352 454',
  ape: '7112B',
  vat: 'FR 50 535 352 454',
  cnil: '1612697',
  trainingId: '93.83.04416.83',
  /** Hosting provider as stated on the legacy site — update once deployed on the new server. */
  host: ['1&1 Internet AG', 'Brauerstr. 48, 76135 Karlsruhe, Allemagne'],
  /** Legacy client portal (reports and quotes). Update when the portal moves. */
  clientPortalUrl: 'https://www.a2eenvironnement.fr/espace_client.php',
};

export interface Reference {
  name: string;
  short: string;
  tags: ReferenceTag[];
  /** Official website (current one when the structure has since merged). */
  url?: string;
  /** Icon file in /images/partners, taken from the partner's own website. */
  logo?: string;
  /** Current structure, when the partner has merged into another one. */
  now?: string;
}

/** Client names (proper nouns, not translated). Mission labels are in the locale files, same order. */
export const REFERENCES: Reference[] = [
  { name: 'Artélia', short: 'Artélia', tags: ['studies', 'measures'], url: 'https://www.arteliagroup.com', logo: 'artelia' },
  { name: 'Cap Excellence', short: 'Cap Excellence', tags: ['training'], url: 'https://www.capexcellence.net', logo: 'capexcellence' },
  {
    name: 'Chambre de Commerce et d’Industrie Territoriale du Var',
    short: 'CCI du Var',
    tags: ['measures'],
    url: 'https://www.var.cci.fr',
    logo: 'cci-var',
  },
  {
    name: 'Ciments Calcia',
    short: 'Ciments Calcia',
    tags: ['monitoring'],
    url: 'https://www.ciments.heidelbergmaterials.fr',
    logo: 'calcia',
    now: 'Heidelberg Materials',
  },
  {
    name: 'Communauté d’Agglomération du Grand Avignon',
    short: 'Grand Avignon',
    tags: ['training', 'selfMonitoring', 'monitoring'],
    url: 'https://www.grandavignon.fr',
    logo: 'grandavignon',
  },
  {
    name: 'Communauté d’Agglomération du Pays de Martigues',
    short: 'Pays de Martigues',
    tags: ['studies'],
    url: 'https://ampmetropole.fr',
    logo: 'ampmetropole',
    now: 'Métropole Aix-Marseille-Provence',
  },
  {
    name: 'Communauté d’Agglomération du Sud Basse-Terre',
    short: 'Sud Basse-Terre',
    tags: ['training'],
    url: 'https://www.grandsudcaraibe.fr',
    logo: 'grandsudcaraibe',
    now: 'Grand Sud Caraïbe',
  },
  {
    name: 'Communauté de communes Nord du Bassin de Thau',
    short: 'Nord Bassin de Thau',
    tags: ['monitoring'],
    url: 'https://www.agglopole.fr',
    logo: 'agglopole',
    now: 'Sète Agglopôle Méditerranée',
  },
  {
    name: 'Communauté Urbaine de Marseille',
    short: 'CU Marseille',
    tags: ['measures'],
    url: 'https://ampmetropole.fr',
    logo: 'ampmetropole',
    now: 'Métropole Aix-Marseille-Provence',
  },
  { name: 'Elitech', short: 'Elitech', tags: ['measures'] },
  { name: 'Laboratoires Protec LEA', short: 'Protec LEA', tags: ['studies', 'measures'] },
  {
    name: 'Mairie de Châteauneuf-le-Rouge',
    short: 'Châteauneuf-le-Rouge',
    tags: ['measures'],
    url: 'https://chateauneuflerouge.fr',
    logo: 'chateauneuf',
  },
  { name: 'Mairie de Salazie', short: 'Salazie', tags: ['studies'], url: 'https://www.ville-salazie.fr', logo: 'salazie' },
  { name: 'Mécasud — Groupe Ottaviani', short: 'Mécasud', tags: ['measures'] },
  { name: 'Pizzorno Environnement', short: 'Pizzorno', tags: ['studies'], url: 'https://www.pizzorno.com', logo: 'pizzorno' },
  {
    name: 'Régie du SPANC du Territoire de la CINOR',
    short: 'SPANC CINOR',
    tags: ['training'],
    url: 'https://www.cinor.re',
    logo: 'cinor',
  },
  { name: 'Rétia — Groupe Total', short: 'Rétia', tags: ['studies'] },
  { name: 'SITTOMAT', short: 'SITTOMAT', tags: ['measures'], url: 'https://www.sittomat.fr', logo: 'sittomat' },
  { name: 'SMA Environnement', short: 'SMA Environnement', tags: ['monitoring'] },
  { name: 'SMA — Groupe Pizzorno', short: 'SMA', tags: ['measures'], url: 'https://www.pizzorno.com', logo: 'pizzorno' },
  { name: 'SMA Vautubière', short: 'SMA Vautubière', tags: ['training', 'monitoring'] },
  {
    name: 'Société d’Économie Mixte d’Aménagement de Gardanne et sa région',
    short: 'SEMAG',
    tags: ['monitoring'],
  },
  {
    name: 'Sovatram — Groupe Pizzorno',
    short: 'Sovatram',
    tags: ['monitoring', 'studies'],
    url: 'https://www.pizzorno.com',
    logo: 'pizzorno',
  },
  {
    name: 'Syndicat Rhône Ventoux',
    short: 'Rhône Ventoux',
    tags: ['selfMonitoring'],
    url: 'https://www.rhone-ventoux.fr',
    logo: 'rhone-ventoux',
  },
  {
    name: 'Toulon Provence Méditerranée',
    short: 'Toulon Provence Méditerranée',
    tags: ['selfMonitoring', 'studies'],
    url: 'https://metropoletpm.fr',
    logo: 'tpm',
  },
];

export const docUrl = (id: DocId) => `/docs/${DOCS[id].file}`;

/** Photos from Wikimedia Commons (free licenses). Credits are listed on the legal page. */
export const PHOTOS = {
  hero: { author: 'Czeva', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:%C4%8CBu,_wastewater_treatment_plant_05.jpg' },
  aerial: { author: 'Roen Wainscoat', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Wastewater_Clarifiers.jpg' },
  anc: { author: 'SuSanA Secretariat', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Septic_Tank_(3190648345).jpg' },
  autosurveillance: { author: 'Czeva', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:%C4%8CBu,_wastewater_treatment_plant_04.jpg' },
  zonage: { author: 'Alain Choucas', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:La_colle_saint_michel.jpg' },
  eaux: { author: 'Zairon', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Rougon_Gorges_du_Verdon_05.jpg' },
  odeurs: { author: 'Mailtosap', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:AVA_Biofilter_(2).jpg' },
  oxygenation: { author: 'USDA', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:RD-Westmoreland_-Fayette_Municipal_Sewage_Authority_Plant_(20210903-RD-LSC-0276).jpg' },
  garantie: { author: 'PantheraLeo1359531', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Verbandskl%C3%A4ranlage_Hof_20250106_HOF0618_RAW-Export.png' },
  rejets: { author: 'US EPA', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:June_4,_Collecting_a_snapshot_of_coastal_water_quality_in_Louisiana_(4682435863).jpg' },
  convention: { author: 'Dietmar Rabich', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Beckum,_Zementwerk_Kollenbach_--_2014_--_8705.jpg' },
  lab: { author: 'European Commission — JRC', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Water_Laboratory_at_the_Joint_Research_Centre,_Ispra_(P-070349-00-14).jpg' },
  field: { author: 'Stéphane Lesbats (Ifremer)', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Maintenance_sur_la_station_de_mesure_MOLIT_-_Pr%C3%A9l%C3%A8vement_d%27eau_pour_le_contr%C3%B4le_de_la_sonde_pH_(Ifremer_00787-89941_-_50275).jpg' },
  provence: { author: 'Sten van Houwelingen', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Montagne_Sainte-Victoire_seen_from_Gardanne_01.jpg' },
  river: { author: 'Dirk Beyer', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Gorges_du_Verdon_River_from_Bottom_0364.jpg' },
} as const;

export type PhotoId = keyof typeof PHOTOS;

export const photoSrc = (id: PhotoId) => `/images/photos/${id}.webp`;
export const photoSrcset = (id: PhotoId) => `/images/photos/${id}-800.webp 800w, /images/photos/${id}.webp 1600w`;
