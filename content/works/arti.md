---
title: Arti
description: Personal job-hunt agent that scrapes WTTJ and LinkedIn, scores offers against my profile, and pushes the best matches to iMessage.
date: 2026-06-25
year: 2026
image: /assets/works/arti/cover.png
minRead: 7
roles:
  - Full Stack
  - AI Engineer
technologies:
  - TypeScript
  - Nitro
  - PostgreSQL
  - AI
  - iMessage
teamName: Author
authors:
  - name: Johann Cavallucci
    to: https://x.com/JohannCVL
    target: _blank
    avatar:
      src: https://avatars.githubusercontent.com/u/72015679?v=4
      alt: Johann Cavallucci
contextPreview: Solo full-stack & AI side project by Johann in 2026: a personal job-hunt agent that scrapes Welcome to the Jungle and LinkedIn, scores offers against CV and preferences, and pushes matches to iMessage via Sendblue. Built as a TypeScript monorepo (Nitro, PostgreSQL/Drizzle, Vercel AI SDK). Useful for questions about agentic workflows, LLM scoring UX, conversational interfaces on iMessage, multi-source scraping, and shipping end-to-end personal automation tools.
---

## The Concept
Job hunting is time-consuming: scroll Welcome to the Jungle or LinkedIn, open every listing, read the description, check experience, English level, stack, seniority… and often a single detail disqualifies the role after ten minutes of reading.

Arti is a personal agent that does that work for me. It has my context — CV, preferences, what I’m actually looking for — explores Welcome to the Jungle and LinkedIn, pre-filters by role, reads the descriptions, scores each offer, and only keeps those above a configurable threshold (e.g. ~70%). It sends me those offers over iMessage, several times a day: fresh jobs, already scored, with an actionable summary and the link to apply.

I own it end-to-end as Full Stack and AI engineer — a side project built for my own search, not a polished public product.

## Design & Features
The product idea is simple: cut the noise before I ever open a tab. Everything lands where I already am — iMessage — without another dashboard to babysit.

Key features:
- **Scored offers on iMessage:** score %, title, company, structured summary (activity, location, salary, stack, missions, requirements like degree / English), plus the application link.
- **Automatic pipeline (cron):** scraping + matching + notification with no manual action.
- **On-demand refresh:** I can text Arti to run a search right now (ack with a like, then the results).
- **Cover letters:** generate a letter for a given offer (by number).
- **Conversational iMessage UI:** list recent offers, resend specific ones (`#70`, `#69`…), read or update the minimum score threshold.

Extras that keep the signal clean: title / experience / role-focus pre-filters, URL deduplication, and multi-source ingestion (WTTJ + LinkedIn).

![Arti in testing](/assets/works/arti/testing.png)

## Technical Stack & Architecture

| Technology | Role in the project |
|---|---|
| **TypeScript** | Single language across the monorepo (apps + packages) |
| **pnpm workspaces** | Package split (core, db, sources, pipeline) + apps |
| **Nitro** | iMessage agent server (webhooks, runtime) |
| **Chat SDK + Sendblue** | Receive / send iMessage, reactions (like) |
| **Vercel AI SDK + AI Gateway** | LLM calls (scoring, chat, cover letters) through a unified gateway |
| **DeepSeek (via gateway)** | Model used for match, chat, and cover letters |
| **PostgreSQL** | Persist offers, letters, and seen-URL history |
| **Drizzle ORM** | SQL schema, queries, migrations |
| **Zod** | Validate prefs / profiles / structured LLM outputs |
| **Custom sources (WTTJ Algolia + LinkedIn guest)** | Ingest listings and offer details |
| **Cron / sync worker** | Periodic matching pipeline runs |
| **evlog** | Observability for LLM calls (tokens, cost, timing) |

Architecture in short: monorepo → sources scrape WTTJ / LinkedIn → pipeline pre-filters, calls the LLM to score and summarize, writes to Postgres → iMessage notification (Sendblue). In parallel, the Nitro app listens for messages: deterministic commands (refresh, threshold, listing, letter) plus a tool-using agent fallback for natural language.

---

## Challenges
Building a useful agent means the hard part is judgment, not just plumbing:

- **Signal vs noise:** title / experience filters + LLM threshold + dedup — so I never get flooded.
- **Contextual matching:** inject CV and preferences so the score and summary are actually useful, not generic.
- **Reliable conversational channel:** iMessage as UI (commands + LLM), without fake confirmations — e.g. a threshold change must really persist.
- **Cover letters:** generate something truly personalized and effective — still improvable, with more work planned.
- **Fragile multi-sources:** job-board APIs and pages (WTTJ, LinkedIn guest) keep changing and need hardening.

## Conclusion and Next Steps
Arti already saves me a lot of time: every offer I receive is pre-filtered and relevant. It doesn’t replace all manual search, but it cuts most of the time wasted on roles that are incompatible from the first line of the description.

Next: harden the sources, improve cover-letter quality, and keep tuning the matching loop so the bar stays high as my search evolves.
