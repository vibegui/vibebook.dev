# vibebook

Shared AI docs with friends: each vibebook = doc + group chat + epics/tasks, with `@ai` in three modes.

- `src/index.ts` — Hono Worker: own auth (`src/auth.ts`: email 6-digit code via Cloudflare Email Sending + optional Google OAuth, HMAC session cookie), D1 index (users, books, members, friends), serves `/app` + `/b/*` shell, forwards `/ws/:id` to the book's DO.
- `src/book.ts` — `Book` Durable Object (SQLite): messages per thread (`main` or epic id), epics, tasks, doc; WebSocket hibernation; `@ai` via OpenRouter with tools; debounced alarm classifies (title/folder/summary/epic suggestions) with `MODEL_CLASSIFY`.
- Files: `POST/GET /api/books/:id/files[/:fid]` → R2 `FILES` (`<book>/<file>`), png/jpeg/webp/gif/pdf ≤10MB (no SVG/HTML), served with nosniff + CSP sandbox, `UPLOAD_LIMIT` 30/min. The DO keeps the file index + message attachments; the newest ≤4 images in the thread are sent to the model as image parts.
- Polls: DO tables `polls`/`votes`, WS `poll.create`/`vote`/`poll.close`, AI tool `create_poll`; results are in the AI context.
- `src/reader.ts` — `read_url` AI tool: URL guard (public http(s) only), Firecrawl scrape (`FIRECRAWL_API_KEY`), cleaned + capped at 20k chars, handed to the model as untrusted data. ≤4 reads per `@ai`, `READ_LIMIT` 20/min per user, cached in the DO 6h (failures 10min). Check: `bun scripts/reader-check.ts`.
- Analytics: `src/track.ts` writes first-party events to D1 `events` (server-side `pageview` for `/`, `/login`, `/app`, `/b/*` with a cookieless daily visitor id; `signup`, `login_code_sent`, `login`, `book_created`, `invite_sent`, `file_uploaded`, `message`, `ai_run` with mode/ok/ms/tools). Every new surface ships with a `track()` call. Read side `src/analytics.ts` (traffic cross-filter ported from holocard + admin overview).
- Admin MCP: `POST /mcp` (JSON-RPC, `Authorization: Bearer MCP_AUTH_TOKEN`), tools `admin_overview` / `traffic_overview`, each with an MCP-App UI (`ui://vibebook/admin|traffic`). UI source `mcp-app/` (vanilla TS + `@modelcontextprotocol/ext-apps`), bundled by `bun run build:mcp` into `dist-mcp/index.html` (gitignored, imported as text). `bun run dev`/`deploy` build it first.
- `public/index.html` landing, `public/app.html` app (vanilla JS, no build), `og/` sources for `og.png` (render with headless Chrome).

Local: `.dev.vars` (see `.dev.vars.example`); `DEV_EMAIL` skips login (`/api/dev/as?email=x` switches identity). Run with `--var DEV_EMAIL:` to test real login; sent emails land in `.wrangler/tmp/email/`. `bun run dev`, `bun run check`.
Prod: secrets `OPENROUTER_API_KEY`, `SESSION_SECRET`, `FIRECRAWL_API_KEY`, `MCP_AUTH_TOKEN`, optional `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`. Landing `/` is public; `/app`, `/b/*` redirect to `/login`. Login + invite emails are rate-limited (`LOGIN_LIMIT`, 5/min per IP/email/inviter).
Cost bounds: 1 OpenRouter call per `@ai` (≤4 tool steps, 40-msg history, 10/min/user rate limit); classify ≤1 call per 30s per book, only after ≥3 new human messages, failures not retried until new messages.
