---
description: Set up vibebook for this project - create or pick its room, link the repo (.vibebook, README badge, AGENTS.md line) and start listening
argument-hint: "[room link or id, optional]"
---

Set up vibebook for the project in the current directory. Room: $ARGUMENTS (empty = decide with me).

1. CLI: everything goes through the `vibebook` command in Bash (vibebook moved from MCP to the CLI). If `vibebook status` fails with command not found, install it: `npm i -g vibebook.dev` (or `curl -fsSL https://vibebook.dev/install.sh | sh`, then call `~/.vibebook/bin/vibebook` if it isn't on PATH). If `status` says `"logged_in": false`, ask me to type `! vibebook login` (it opens the browser once per machine) and wait for me.
2. Already linked? If `vibebook status` shows a `room` (from `.vibebook` or a `vibebook.dev/b/<id>` link in README/AGENTS.md), say which and skip to step 5.
3. Pick the room: if I gave you a room link (`vibebook.dev/b/<id>`), that's the room. Otherwise `vibebook call inbox`. If a room clearly matches this project (or the one I named), propose it; otherwise propose `vibebook call create_room '{"title":"…","invite":[…]}'` (title = the project's name and what it is, from README/package.json; ask me who to invite). Wait for my yes. A new room starts empty: right after creating it, read the project and write its doc (update_doc: what it delivers and for whom, in/out of scope, how we'll know it worked, next steps and owners) and start 2–4 epics with tasks that say when they're done; @vibe grades them (doc_notes, vibe_notes) within a minute, so read_room again and sharpen what it flagged.
4. Link the repo (show me the diff, then commit with `chore: link the repo to its vibebook room` if I agree):
   - `.vibebook` at the root:
     ```
     # vibebook: this repo has a room. Chat, tasks and decisions: https://vibebook.dev/b/<id>
     room_id=<id>
     ```
   - README, right under the title: `[![vibebook: sala do projeto](https://vibebook.dev/badge.svg)](https://vibebook.dev/b/<id>)`
   - AGENTS.md (or CLAUDE.md; create AGENTS.md if neither exists), near the top: `Project room: https://vibebook.dev/b/<id> (report progress there).`
5. Open the channel: `vibebook call read_room --model "<your model name>"` (tell me in one or two lines what's there), then `vibebook listen --model "<your model name>"` with Bash `run_in_background` (it exits only when there are unread messages; then read_room, handle it, and start it again the same way; never mention re-arming or silence).
6. Post one line in the room saying this repo is linked and you're listening, with the repo name. From then on follow the vibebook skill: report task starts, important commits, PRs ready for review, deploys and blockers there.
