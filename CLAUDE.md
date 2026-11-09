# CLAUDE.md

Portfolio personnel de Johann Cavallucci (https://www.johanncvl.com) — Nuxt 4, déployé sur Vercel.

## Règles

- **Ne jamais push** (ni créer de PR, ni déployer) sans l'accord explicite de Johann.
- **Rester dans la stack existante.** Pas de nouvelle dépendance, librairie, framework ou service sans demander d'abord. Voir la stack ci-dessous.
- Gestionnaire de paquets : **bun** (`bun.lock`). Ne pas générer de `package-lock.json`.
- Ne jamais lire, afficher ni committer `.env`. Les noms de variables sont documentés dans `.env.example`.
- Communiquer en français avec Johann ; le contenu du site et le code (noms, commentaires) sont en anglais.

## Stack

- Nuxt 4 / Vue 3 / TypeScript, dossier `app/` (structure Nuxt 4)
- Nuxt Content v3 (collections dans `content.config.ts`), Nuxt Studio pour l'édition
- Nuxt UI v4 + Tailwind CSS v4 (polices custom : Clash Display, Bread Toast, Estrella → classes `font-clash-*`, `font-bread`)
- Nuxt Image, `@nuxtjs/seo` (sitemap, robots, schema.org, canonical)
- Animations : `motion-v`, `motion-plus-vue`
- Chat : AI SDK (`ai`, `@ai-sdk/vue`) via Vercel AI Gateway, modèle défini dans `server/api/chat.ts`
- E-mail : Resend. Rate limiting : Redis (Upstash REST ou TCP)
- Lint : ESLint avec `@hrcd/eslint-config`

## Commandes

```bash
bun install
bun run dev       # http://localhost:3000
bun run build     # build + prérendu (crawlLinks) — à lancer pour valider un changement
bun run preview
```

Il n'y a pas de tests automatisés : valider avec `bun run build` (0 erreur de prérendu) et en vérifiant les pages concernées.

## Architecture

- `app/pages/` : `index` (accueil + canvas de dessin), `about` (bio + timeline), `works/index` (liste), `works/[...slug]` (détail projet, 404 si absent), `contact` (formulaire → `/api/sendEmail`).
- `app/layouts/default.vue` : navbar, fond « noise », bouton et panneau du chat (`SideChat.vue`, état dans `composables/useSideChat.ts`).
- `content/` : une collection par page (`home`, `about`, `timeline`, `works`, `contact`). Le champ `contextPreview` sert à l'assistant pour choisir les documents ; le garder à jour quand le contenu change.
- `server/api/chat.ts` : agent avec outils `listDocuments`, `readDocuments` (`server/libs/agent-tools/`) et `contact`. Messages client assainis, filtre d'injures, vérif. d'origine + en-têtes navigateur.
- `server/utils/chatRateLimit.ts` : quotas journaliers global + par IP pour chat et e-mail. **Fail-closed** : sans Redis → 503.
- `server/utils/sendContactEmail.ts` : honeypot (`company`), score anti-spam, échappement HTML, envoi Resend.
- `server/api/cron/redis-keepalive.get.ts` : appelé par Vercel Cron (`vercel.json`), protégé par `CRON_SECRET`.

## Conventions

- SEO par page avec `useSeoMeta` ; les chemins d'image OG commencent par `/` (rendus absolus par `@nuxtjs/seo`). L'URL du site est configurée dans `nuxt.config.ts` → `site.url` (domaine canonique : `www.johanncvl.com`).
- Un seul `<h1>` par page.
- Images de projets dans `public/assets/works/`, au format webp, compressées.
- Requêtes depuis un handler d'événement : `$fetch` (pas `useFetch`, réservé au setup).
- Commits : style conventional commits (`feat:`, `fix:`, `refactor:`…).
