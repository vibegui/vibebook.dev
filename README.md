# vibebook

Shared AI docs with friends: each vibebook = doc + group chat + epics/tasks, with `@ai` in three modes.

- `src/index.ts` — Hono Worker: own auth (`src/auth.ts`: email 6-digit code via Cloudflare Email Sending + optional Google OAuth, HMAC session cookie), D1 index (users, books, members, friends), serves `/app` + `/b/*` shell, forwards `/ws/:id` to the book's DO.
- `src/book.ts` — `Book` Durable Object (SQLite): messages per thread (`main` or epic id), epics, tasks, doc; WebSocket hibernation; `@ai` via OpenRouter with tools; debounced alarm classifies (title/folder/summary/epic suggestions) with `MODEL_CLASSIFY`.
- `src/reader.ts` — `read_url` AI tool: URL guard (public http(s) only), Firecrawl scrape (`FIRECRAWL_API_KEY`), cleaned + capped at 20k chars, handed to the model as untrusted data. ≤4 reads per `@ai`, `READ_LIMIT` 20/min per user, cached in the DO 6h (failures 10min). Check: `bun scripts/reader-check.ts`.
- `public/index.html` landing, `public/app.html` app (vanilla JS, no build), `og/` sources for `og.png` (render with headless Chrome).

Local: `.dev.vars` (see `.dev.vars.example`); `DEV_EMAIL` skips login (`/api/dev/as?email=x` switches identity). Run with `--var DEV_EMAIL:` to test real login; sent emails land in `.wrangler/tmp/email/`. `bun run dev`, `bun run check`.
Prod: secrets `OPENROUTER_API_KEY`, `SESSION_SECRET`, `FIRECRAWL_API_KEY`, optional `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`. Landing `/` is public; `/app`, `/b/*` redirect to `/login`. Login + invite emails are rate-limited (`LOGIN_LIMIT`, 5/min per IP/email/inviter).
Cost bounds: 1 OpenRouter call per `@ai` (≤4 tool steps, 40-msg history, 10/min/user rate limit); classify ≤1 call per 30s per book, only after ≥3 new human messages, failures not retried until new messages.
