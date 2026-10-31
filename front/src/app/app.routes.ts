import { CanMatchFn, Routes } from '@angular/router';
import { regulationBySlug, serviceBySlug } from './core/content/site.data';

/** Unknown slugs fall through to the 404 page instead of rendering an empty template. */
const knownService: CanMatchFn = (_route, segments) => !!serviceBySlug(segments[1]?.path ?? '');
const knownRegulation: CanMatchFn = (_route, segments) => !!regulationBySlug(segments[1]?.path ?? '');

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'prestations', loadComponent: () => import('./pages/services/services').then((m) => m.Services) },
  {
    path: 'prestations/:slug',
    canMatch: [knownService],
    loadComponent: () => import('./pages/service-detail/service-detail').then((m) => m.ServiceDetail),
  },
  { path: 'reglementation', loadComponent: () => import('./pages/regulations/regulations').then((m) => m.Regulations) },
  {
    path: 'reglementation/:slug',
    canMatch: [knownRegulation],
    loadComponent: () =>
      import('./pages/regulation-detail/regulation-detail').then((m) => m.RegulationDetail),
  },
  { path: 'references', loadComponent: () => import('./pages/references/references').then((m) => m.References) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
  { path: 'espace-client', loadComponent: () => import('./pages/client-area/client-area').then((m) => m.ClientArea) },
  { path: 'mentions-legales', loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
