---
title: Targeter
description: AI-powered job search organizer that removes friction from applications — Kanban, contextual assistant, and Chrome extension.
date: 2026-09-25
year: 2026
image: /assets/works/targeter/dashboard.png
minRead: 8
roles:
  - Full Stack
  - UI/UX Designer
technologies:
  - Nuxt 4
  - TypeScript
  - Drizzle
  - PostgreSQL
  - AI
  - Extension
teamName: Author
authors:
  - name: Johann Cavallucci
    to: https://x.com/JohannCVL
    target: _blank
    avatar:
      src: https://avatars.githubusercontent.com/u/72015679?v=4
      alt: Johann Cavallucci
contextPreview: Solo full-stack product by Johann in 2026: a Notion-like job search workspace with Kanban/table views, contextual AI assistant (profile + applications), and a Welcome to the Jungle Chrome extension. Built as a monorepo (Nuxt 4, Drizzle/Postgres, Better Auth, Vercel AI SDK). Useful for questions about product thinking from personal pain, AI product UX, monorepo architecture, and shipping end-to-end SaaS-ready tools.
---

## The Concept
Targeter was born from a real personal need. While actively job hunting, I was juggling fragmented workflows — copying job offers into ChatGPT for summaries, asking AIs to draft cover letters, running scrapers and bots that scored letters and sent back the good ones. Useful, but scattered and full of friction.

The idea: centralize everything into one product — track applications, act on them, and let AI handle the repetitive cognitive load — so the job seeker can focus on what matters (deciding, applying, preparing) instead of copy-pasting between tools.

Targeter is a job search organizer designed for people in active search. Positioning: a clean Notion-like base (Kanban + Table) plus a contextual AI layer that knows the user’s profile and applications — not a generic ChatGPT embedded in a UI.

I own the product end-to-end: Full Stack engineer and UX designer — product, architecture, UI, AI features, and the Chrome extension.

## Design & Features
The design goal is a calm, frictionless UX usable by developers and non-technical job seekers alike. A clean, airy interface inspired by Notion’s simplicity — no getting lost.

Key features today:
- **Dual views:** Kanban board with drag-and-drop, plus a Table view with inline Notion-like editing.
- **Application pipeline:** Noted → Applied → Interviewing → Rejected / Accepted / Archived.
- **CSV import** of existing application data.
- **Preferences:** default view, columns, and follow-up reminders after X days.
- **Contextual AI assistant** that knows the user’s CV, preferences, cover letter template, and applications:
  - Paste a job offer → create an application
  - Score an offer against the CV
  - Generate a tailored cover letter
  - Parse recruiter emails → update status
  - Mentions (`@company — role`) and slash commands for bounded actions
- **Chrome extension for Welcome to the Jungle (WTTJ):** one-click add of a job offer into Targeter while browsing (LinkedIn intentionally out of scope for now).
- **Product foundations toward SaaS:** auth, light/dark theme, AI credits / BYOK model.

The core product promise: remove friction from the job search loop.

![Kanban board](/assets/works/targeter/kaban.png)

## Technical Stack & Architecture

| Technology | Role in the project |
|---|---|
| **Nuxt 4** | Full-stack web app (UI + Nitro API) |
| **Vue / Nuxt UI** | Component system and product UI |
| **Tailwind CSS** | Design system styling |
| **TypeScript** | End-to-end type safety (web, API, extension, shared packages) |
| **pnpm monorepo** | Architecture: apps/web, apps/extension, packages/db, packages/shared |
| **Drizzle ORM** | Schema, migrations, typed DB access |
| **PostgreSQL** | Primary relational database (apps, users, AI profile, tokens…) |
| **Better Auth** | Email/password auth and sessions |
| **Vercel AI SDK + AI Gateway** | Contextual assistant (chat, scoring, cover letters, offer parsing) |
| **Zod** | Request/data validation |
| **WXT** | Chrome extension toolchain (MV3) |
| **Chrome Extension (content + background)** | Parse WTTJ job pages and POST offers via API tokens |
| **Vitest** | Unit tests (parsers, shared utils) |
| **evlog** | Structured API logging / observability |
| **Figma** | UI/UX exploration and visual consistency |

Architecture angle: intentionally simple and reliable — clear monorepo boundaries, shared types between web and extension, token-based auth for the extension (no cookie dependency), and AI designed as bounded actions with durable context (profile + applications) rather than endless chat history.

![Profile settings](/assets/works/targeter/profil.png)

---

## Challenges
Building a product like this solo means the UX bar is as high as the engineering one:

- **Trustworthy product UX:** designing a simple architecture where users never feel lost — the hard part is not just shipping features, but making the whole loop feel obvious.
- **Useful AI, not a chatbot skin:** grounding the assistant in the user’s real profile and applications, action-oriented (parse / score / letter / status), instead of a generic chat box.
- **Browser → product bridge:** the WTTJ extension has to parse offer pages, auth with API tokens, and land cleanly in the Kanban.
- **Power without exclusion:** balancing slash commands and mentions for power users with accessibility for non-dev job seekers.

## Conclusion and Next Steps
Targeter is actively in progress and already far along: a stable Notion-like core, a working AI MVP, and a WTTJ extension. It already helps me in my own job search — the best validation for a tool built from personal pain.

Next step: turn it into a SaaS — polish the AI experience, entitlements and billing, and grow beyond the solo workflow into a product others can rely on during their search.
