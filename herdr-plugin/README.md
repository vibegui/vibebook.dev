# vibebook for herdr

One Claude Code per vibebook room, as herdr workspaces. Switch **✻ Ligar Claude** on in a room at
[vibebook.dev](https://vibebook.dev) and a workspace opens in the room's project folder with Claude
listening to the room; switch it off and it closes (the conversation is kept to resume).

```sh
herdr plugin install vibegui/vibebook.dev/herdr-plugin
```

- **Runner tab.** When herdr starts, the plugin opens a `vibebook` tab running `vibebook herdr` (one per machine;
  the first time it asks you to log in through the browser). Action `vibebook.start` opens it by hand.
- **Room links.** Ctrl+click a `https://vibebook.dev/b/<id>` link in any terminal to jump to that room's workspace.
  Action `vibebook.open-room` does the same for the room linked to the current folder (`.vibebook`).
- **What it touches.** Only workspaces it opened (or adopted) for rooms; it never runs anything you didn't switch on.
  Folder paths stay on your machine. More: https://vibebook.dev/en/herdr

Build needs `curl` (installs the vibebook CLI into `~/.vibebook` if missing). macOS and Linux.
