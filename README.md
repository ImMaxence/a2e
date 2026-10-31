# A2E Environnement

Refonte du site [a2eenvironnement.fr](https://www.a2eenvironnement.fr) — bureau d'études en eau, assainissement et sols.

## Structure

```
.
├── front/                    # Site Angular 22 (SPA)
│   ├── src/app/core/         # Données, i18n (fr/en/es/it), thème
│   ├── src/app/shared/       # Composants réutilisables (icônes, blocs de contenu, cartes…)
│   ├── src/app/layout/       # Header, footer, sélecteurs langue/thème
│   ├── src/app/pages/        # Pages (lazy-loaded)
│   ├── src/styles/           # Design tokens, base, boutons, animations
│   ├── public/               # Images, polices auto-hébergées, documents réglementaires
│   ├── nginx/                # Config nginx de production
│   └── Dockerfile
├── docker-compose.yml        # Production (Coolify)
└── docker-compose.local.yml  # Surcharge locale (port 8088)
```

## Développement

```bash
cd front
npm install
npm start          # http://localhost:4200
npm run build      # build de production dans front/dist/a2e/browser
```

## Contenu et traductions

- **Textes** : `front/src/app/core/i18n/locales/{fr,en,es,it}.ts`. Le type `Dictionary` impose les mêmes clés partout : une traduction manquante fait échouer le build.
- **Texte enrichi** : `**gras**`, `[lien](/route)`, `[lien](https://…)`, `[document](doc:id-du-document)`.
- **Données non traduites** (slugs, contacts, adresses, documents, références) : `front/src/app/core/content/site.data.ts`.

## Photos

Les photos (`front/public/images/photos/`) viennent de Wikimedia Commons, sous licences libres (domaine public, CC BY, CC BY-SA). Les licences CC imposent de citer l'auteur : les crédits sont dans `PHOTOS` (`site.data.ts`) et affichés dans les mentions légales. Toute nouvelle photo doit y être ajoutée. Des photos réelles des chantiers d'A2E pourront les remplacer.

## Références

Les icônes des partenaires (`front/public/images/partners/`) proviennent de leurs sites officiels. Les liens et icônes sont déclarés dans `REFERENCES` (`site.data.ts`) ; une référence sans `url`/`logo` affiche simplement son initiale.

## Déploiement (Coolify)

1. Nouvelle ressource **Docker Compose** pointant sur ce dépôt, fichier `docker-compose.yml`.
2. Associer le domaine au service `front`, port **80**.
3. Les anciennes URLs `.php` sont redirigées en 301 vers les nouvelles pages (`front/nginx/default.conf`).

Test local de l'image :

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
# http://localhost:8088  (FRONT_PORT=xxxx pour changer de port)
```

## À compléter

- **Hébergeur** dans les mentions légales (`COMPANY.host` dans `site.data.ts`) : il indique encore 1&1, à remplacer par le nouvel hébergement.
- **Espace client** : le bouton renvoie vers l'ancien portail PHP (`COMPANY.clientPortalUrl`). À mettre à jour si le portail est déplacé.
- **Formulaire de contact** : il ouvre la messagerie du visiteur (`mailto:`) avec une demande pré-remplie adressée au bon expert. Un vrai envoi côté serveur pourra être ajouté dans le monorepo.
