# vibebook

Shared AI docs with friends: each vibebook = doc + group chat + epics/tasks, with `@ai` in three modes.

- `src/index.ts` — Hono Worker: Cloudflare Access JWT auth, D1 index (users, books, members, friends), serves `/app` + `/b/*` shell, forwards `/ws/:id` to the book's DO.
- `src/book.ts` — `Book` Durable Object (SQLite): messages per thread (`main` or epic id), epics, tasks, doc; WebSocket hibernation; `@ai` via OpenRouter with tools; debounced alarm classifies (title/folder/summary/epic suggestions) with `MODEL_CLASSIFY`.
- `public/index.html` landing, `public/app.html` app (vanilla JS, no build), `og/` sources for `og.png` (render with headless Chrome).

Local: `.dev.vars` with `OPENROUTER_API_KEY` + `DEV_EMAIL` (skips Access; `/api/dev/as?email=x` switches identity). `bun run dev`, `bun run check`.
Prod: Access app covering `/app`, `/b`, `/api`, `/ws` with an email one-time-PIN policy; set `ACCESS_TEAM_DOMAIN` + `ACCESS_AUD`.
Cost bounds: 1 OpenRouter call per `@ai` (≤4 tool steps, 40-msg history, 10/min/user rate limit); classify ≤1 call per 30s per book, only after ≥3 new human messages, failures not retried until new messages.
