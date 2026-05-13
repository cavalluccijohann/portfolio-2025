# Portfolio — Johann Cavallucci

Site portfolio de [johanncvl.com](https://johanncvl.com), construit avec **Nuxt 4** et **Vue 3**.

Le contenu vit dans `content/` (pages, projets, timeline, contact) et peut être édité via **Nuxt Studio**. Le site expose aussi un formulaire de contact et un assistant latéral branché sur le contenu du portfolio.

## Stack

- [Nuxt 4](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Nuxt Content](https://content.nuxt.com/) — collections typées (`content.config.ts`)
- [Nuxt UI](https://ui.nuxt.com/) — interface et composants
- [Nuxt Image](https://image.nuxt.com/)
- [Nuxt Studio](https://nuxt.studio/) — édition du contenu
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Motion](https://motion.dev/) (`motion-v`, `motion-plus-vue`)
- Nitro — API `server/api/` (chat, envoi d’e-mail, rate limiting)

## Prérequis

- [Bun](https://bun.sh/) (recommandé, `bun.lock` présent) ou Node.js 20+
- Clés et services optionnels selon les fonctionnalités activées (voir ci-dessous)

## Installation

```bash
bun install
```

Autres gestionnaires de paquets :

```bash
npm install
# pnpm install
# yarn install
```

## Développement

```bash
bun run dev
```

Application disponible sur [http://localhost:3000](http://localhost:3000).

## Production

```bash
bun run build
bun run preview
```

Génération statique :

```bash
bun run generate
```

Déploiement : [documentation Nuxt](https://nuxt.com/docs/4.x/getting-started/deployment).

## Variables d’environnement

Créer un fichier `.env` à la racine. Les variables suivantes ne sont nécessaires que pour les fonctionnalités concernées.

| Variable | Usage |
| --- | --- |
| `resendApiKey` | Envoi du formulaire de contact via [Resend](https://resend.com/) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting du chat (Upstash REST) |
| `REDIS_URL` ou `REDIS_HOST` + `REDIS_PASSWORD` (+ `REDIS_PORT`, `REDIS_USERNAME`) | Rate limiting du chat (Redis TCP) |
| `CHAT_GLOBAL_LIMIT_PER_DAY`, `CHAT_IP_LIMIT_PER_DAY` | Plafonds journaliers du chat (défaut : 100 / 10) |
| `CHAT_TRUSTED_IP` ou `CHAT_TRUSTED_IPS` | IPs sans quota par IP (quota global inchangé) |

Sans Redis configuré, le chat reste utilisable mais le rate limiting serveur est désactivé (avertissement en logs).

Configurer aussi les clés requises par le fournisseur de modèles utilisé par l’assistant (`server/api/chat.ts`, SDK `ai`).

## Structure du projet

```text
app/           Pages, layouts, composants, assets
content/       Markdown et YAML (collections Nuxt Content)
server/        Routes API Nitro et outils agent (sélection / lecture de contenu)
shared/        Utilitaires partagés app + serveur
types/         Types TypeScript du projet
```

## Documentation utile

- [Nuxt 4](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt Studio](https://nuxt.studio/)
