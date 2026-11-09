# Portfolio — Johann Cavallucci

Site portfolio de [johanncvl.com](https://www.johanncvl.com), construit avec **Nuxt 4** et **Vue 3**, déployé sur **Vercel**.

Le contenu vit dans `content/` (accueil, about, timeline, projets, contact) et peut être édité via **Nuxt Studio**. Le site expose aussi un formulaire de contact et un assistant (chat latéral) qui répond aux questions à partir du contenu du portfolio.

## Stack

- [Nuxt 4](https://nuxt.com/docs/4.x/getting-started/introduction) / Vue 3 / TypeScript
- [Nuxt Content v3](https://content.nuxt.com/) — collections typées (`content.config.ts`)
- [Nuxt UI v4](https://ui.nuxt.com/) + [Tailwind CSS v4](https://tailwindcss.com/)
- [Nuxt Image](https://image.nuxt.com/)
- [Nuxt SEO](https://nuxtseo.com/) (`@nuxtjs/seo`) — sitemap, robots.txt, canonical, Schema.org
- [Nuxt Studio](https://nuxt.studio/) — édition du contenu depuis le navigateur
- [Motion](https://motion.dev/) (`motion-v`, `motion-plus-vue`)
- [AI SDK](https://ai-sdk.dev/) (`ai`, `@ai-sdk/vue`) via Vercel AI Gateway — assistant du portfolio
- [Resend](https://resend.com/) — envoi des e-mails de contact
- Redis ([Upstash](https://upstash.com/) REST ou Redis TCP) — rate limiting du chat et du contact
- Analytics : [Umami](https://umami.is/)

## Prérequis

- [Bun](https://bun.sh/) (gestionnaire utilisé par le projet, `bun.lock`)
- Node.js 20+

## Installation

```bash
bun install
cp .env.example .env   # puis remplir les valeurs
```

## Scripts

| Commande | Rôle |
| --- | --- |
| `bun run dev` | Serveur de dev sur [http://localhost:3000](http://localhost:3000) |
| `bun run build` | Build de production (avec prérendu des pages) |
| `bun run preview` | Prévisualiser le build |
| `bun run generate` | Génération statique complète |

## Variables d’environnement

Voir [`.env.example`](.env.example).

| Variable | Usage |
| --- | --- |
| `RESEND_API_KEY` | Envoi du formulaire de contact et de l’outil `contact` du chat |
| `AI_GATEWAY_API_KEY` | Accès au modèle de l’assistant via Vercel AI Gateway (`server/api/chat.ts`) |
| `CHAT_ENABLED` | Coupe-circuit du chat (`false` → 503) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting (Upstash REST) |
| `REDIS_URL` ou `REDIS_HOST` + `REDIS_PASSWORD` (+ `REDIS_PORT`, `REDIS_USERNAME`) | Rate limiting (Redis TCP), alternative à Upstash |
| `CHAT_GLOBAL_LIMIT_PER_DAY`, `CHAT_IP_LIMIT_PER_DAY` | Quotas journaliers du chat (défaut : 100 / 10) |
| `EMAIL_GLOBAL_LIMIT_PER_DAY`, `EMAIL_IP_LIMIT_PER_DAY` | Quotas journaliers des e-mails (défaut : 40 / 5) |
| `CHAT_TRUSTED_IPS` (ou `CHAT_TRUSTED_IP`) | IPs sans quota par IP, séparées par des virgules (le quota global s’applique toujours) |
| `CRON_SECRET` | Protège `/api/cron/redis-keepalive` |
| `STUDIO_GITHUB_CLIENT_ID`, `STUDIO_GITHUB_CLIENT_SECRET` | Connexion GitHub pour Nuxt Studio |

> **Important :** le rate limiting est *fail-closed*. Sans Redis configuré (ou si Redis est injoignable), le chat et l’envoi d’e-mails répondent `503`.

Le cron Vercel (`vercel.json`) appelle `/api/cron/redis-keepalive` chaque dimanche à 04:00 UTC pour éviter l’éviction de la base Upstash gratuite (~14 jours sans activité).

## Contenu

| Fichier | Page |
| --- | --- |
| `content/home.md` | `/` |
| `content/about/index.md` | `/about` |
| `content/about/timeline.yml` | Timeline de `/about` |
| `content/works/*.md` | `/works` et `/works/<slug>` |
| `content/contact.md` | `/contact` |

Le schéma de chaque collection est défini dans `content.config.ts`. Pour ajouter un projet, créer un fichier dans `content/works/` avec tous les champs requis (`title`, `description`, `date`, `year`, `image`, `technologies`, `roles`, `authors`, `contextPreview`, …). Les images vont dans `public/assets/works/`.

Le champ `contextPreview` est utilisé par l’assistant pour choisir quels documents lire.

## SEO

Géré par `@nuxtjs/seo` (configuration `site`, `schemaOrg` et `ogImage` dans `nuxt.config.ts`) :

- `robots.txt` et `sitemap.xml` générés automatiquement
- URL canonique, `og:url` et `og:image` absolus sur chaque page
- Données structurées Schema.org (`Person`)
- Métadonnées par page via `useSeoMeta` dans `app/pages/`

## Structure du projet

```text
app/           Pages, layouts, composants, composables, assets (CSS, polices)
content/       Markdown et YAML (collections Nuxt Content)
public/        Fichiers statiques (images, og.jpg, favicon)
server/
  api/         Routes Nitro : chat, sendEmail, cron
  libs/        Outils de l’agent (lecture du contenu)
  utils/       Rate limiting, anti-spam, filtre d’injures, vérif. d’origine, envoi d’e-mail
shared/        Utilitaires partagés app + serveur
types/         Types TypeScript
```

## Déploiement

Le site est déployé sur Vercel. Les variables d’environnement ci-dessus doivent être définies dans le projet Vercel.
