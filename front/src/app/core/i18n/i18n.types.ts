import {
  Block,
  ContactId,
  DocId,
  ReferenceTag,
  RegulationId,
  RichText,
  ServiceGroupId,
  ServiceId,
} from '../content/content.types';

export const LANGS = ['fr', 'en', 'es', 'it'] as const;
export type Lang = (typeof LANGS)[number];

export interface ServiceCopy {
  title: string;
  /** Short label for menus. */
  nav: string;
  /** One-liner for cards. */
  short: string;
  lead: RichText;
  body: Block[];
}

export interface RegulationCopy {
  title: string;
  nav: string;
  short: string;
  intro: RichText;
}

export interface Dictionary {
  meta: { name: string; locale: string; title: string };
  common: {
    skip: string;
    backToTop: string;
    learnMore: string;
    discover: string;
    contactUs: string;
    yourContact: string;
    call: string;
    write: string;
    download: string;
    documentLang: string;
    externalLink: string;
    enlarge: string;
    close: string;
    home: string;
    breadcrumb: string;
    menu: string;
    closeMenu: string;
    previous: string;
    next: string;
  };
  nav: {
    home: string;
    services: string;
    regulations: string;
    references: string;
    contact: string;
    clientArea: string;
    allServices: string;
    allRegulations: string;
    servicesTeaser: string;
    regulationsTeaser: string;
    selfMonitoringTexts: string;
  };
  theme: { label: string; light: string; auto: string; dark: string };
  language: { label: string };
  groups: Record<ServiceGroupId, { title: string; text: string }>;
  contacts: Record<ContactId, { role: string; domains: string }>;
  agencies: { gardanne: string; brignoles: string; directions: string };
  home: {
    hero: {
      eyebrow: string;
      titleStart: string;
      titleHighlight: string;
      titleEnd: string;
      text: RichText;
      primary: string;
      secondary: string;
      badgeTitle: string;
      badgeText: string;
      photoAlt: string;
    };
    stats: { value: number; suffix: string; label: string }[];
    about: { eyebrow: string; title: string; paragraphs: RichText[]; domains: string[]; cta: string };
    services: { eyebrow: string; title: string; text: string };
    approach: { eyebrow: string; title: string; text: string; steps: { title: string; text: string; service: ServiceId | null }[] };
    coverage: {
      eyebrow: string;
      title: string;
      text: string;
      regions: string[];
      headOffice: string;
      agency: string;
      beyond: string;
      photo: string;
    };
    references: { eyebrow: string; title: string; text: string; cta: string };
  };
  cta: { title: string; text: string; primary: string; secondary: string };
  servicesPage: { eyebrow: string; title: string; text: string };
  service: {
    contactTitle: string;
    contactText: string;
    quote: string;
    related: string;
    regulations: string;
    others: string;
    explore: string;
  };
  services: Record<ServiceId, ServiceCopy>;
  regulationsPage: {
    eyebrow: string;
    title: string;
    text: string;
    selfMonitoringTitle: string;
    selfMonitoringText: string;
    documents: (n: number) => string;
    moreInfo: string;
    relatedServices: string;
    notice: string;
    otherTexts: string;
    prefectoral: string;
  };
  regulations: Record<RegulationId, RegulationCopy>;
  docs: Record<DocId, string>;
  special: {
    convention: { title: string; sections: { title: string; items: string[] }[] };
    odorTable: {
      caption: string;
      headers: [string, string, string, string, string];
      classes: string[];
      compounds: string[];
      odors: string[];
      source: string;
    };
    odorMethods: {
      caption: string;
      pump: string;
      traps: string;
      transport: string;
      sampling: string[];
      analysis: string[];
      targets: string[];
      ammonium: string;
    };
  };
  references: {
    eyebrow: string;
    title: string;
    text: string;
    all: string;
    tags: Record<ReferenceTag, string>;
    missions: string[];
    count: (n: number) => string;
    now: string;
    visit: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    sections: { you: string; organisation: string; request: string };
    civility: string;
    civilities: { mr: string; mrs: string };
    lastName: string;
    firstName: string;
    phone: string;
    email: string;
    kind: string;
    kinds: { company: string; individual: string };
    companyName: string;
    address: string;
    zip: string;
    city: string;
    purpose: string;
    purposes: { quote: string; callback: string; info: string; other: string };
    service: string;
    serviceOther: string;
    message: string;
    messagePlaceholder: string;
    required: string;
    errors: { required: string; email: string; phone: string };
    submit: string;
    privacy: string;
    successTitle: string;
    successText: string;
    again: string;
    mailSubject: (purpose: string, name: string) => string;
    direct: string;
    directText: string;
    agencies: string;
  };
  clientArea: {
    eyebrow: string;
    title: string;
    text: string;
    features: { title: string; text: string }[];
    cardTitle: string;
    cardText: string;
    cta: string;
    help: string;
  };
  legal: {
    title: string;
    intro: string;
    publisher: string;
    company: string;
    headOffice: string;
    registration: string;
    capital: string;
    cnil: string;
    host: string;
    property: string;
    propertyText: string;
    contacts: string;
    training: string;
    credits: string;
    creditsText: string;
  };
  footer: {
    tagline: string;
    company: string;
    contact: string;
    rights: (year: number) => string;
    legal: string;
    registration: string;
  };
  notFound: { title: string; text: string; cta: string };
}
