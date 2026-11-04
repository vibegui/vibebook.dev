---
description: Set up vibebook for this project - create or pick its room, link the repo (.vibebook, README badge, AGENTS.md line) and start listening
argument-hint: "[room name or id, optional]"
---

Set up vibebook for the project in the current directory. Room: $ARGUMENTS (empty = decide with me).

1. Tools: use the vibebook connector's tools (this plugin brings one; a claude.ai connector or `claude mcp add` one works too). If they need auth, ask me to run `/mcp` → vibebook → Authenticate and stop until I say it's done (new tools show up after that, no restart).
2. Already linked? If `.vibebook` exists (or README/AGENTS.md has a `vibebook.dev/b/<id>` link), say which room and skip to step 5.
3. Pick the room: call `inbox`. If a room clearly matches this project (or the one I named), propose it; otherwise propose creating one with `create_room` (title = the project's name and what it is, from README/package.json; ask me who to invite). Wait for my yes.
4. Link the repo (show me the diff, then commit with `chore: link the repo to its vibebook room` if I agree):
   - `.vibebook` at the root:
     ```
     # vibebook: this repo has a room. Chat, tasks and decisions: https://vibebook.dev/b/<id>
     room_id=<id>
     ```
   - README, right under the title: `[![vibebook: sala do projeto](https://vibebook.dev/badge.svg)](https://vibebook.dev/b/<id>)`
   - AGENTS.md (or CLAUDE.md; create AGENTS.md if neither exists), near the top: `Project room: https://vibebook.dev/b/<id> (report progress there).`
5. Open the channel: `read_room` on it (tell me in one or two lines what's there), then `notify_url` and run its `monitor_command` with the Monitor tool (description "vibebook: new messages", maximum timeout, re-arm silently when it expires, never print the URL).
6. Post one line in the room saying this repo is linked and you're listening, with the repo name. From then on follow the vibebook skill: report task starts, important commits, PRs ready for review, deploys and blockers there.
