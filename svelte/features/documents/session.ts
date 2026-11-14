import { writable } from "svelte/store";
import { createAuthApi, type AuthApi } from "../auth/api";
import type { Room } from "../../../shared/room";
import type { RequestRoomCommand } from "../../roomConnection";
import {
  documentTarget,
  documentText,
  targetKey,
  type DocumentMode,
  type DocumentTarget,
} from "./model";
import type { Editor, EditorModule } from "./types";
type Position = {
  selection?: { anchor: number; head: number };
  scroll: number;
};
type Draft = Position & { text: string };
export type RecoveryToken = { key: string; revision: number };
export type OrphanedDocumentDraft = {
  account: string;
  roomId: string;
  epicId: string;
  text: string;
  revision: number;
};
type Timer = number | ReturnType<typeof setTimeout>;
export function createDocumentDrafts() {
  let account: string | undefined,
    draftRevision = 0;
  const denied = new Map<string, number>();
  const permissionKey = (account: string, roomId: string) =>
    JSON.stringify([account, roomId]);
  const targets = new Map<string, DocumentTarget>();
  const values = new Map<string, Draft & { revision: number }>(),
    positions = new Map<string, Position>();
  return {
    account(value: string) {
      if (account !== value) {
        account = value;
        values.clear();
        targets.clear();
        denied.clear();
        positions.clear();
      }
    },
    prove(account: string, roomId: string, epoch: number) {
      const key = permissionKey(account, roomId);
      if (denied.get(key) !== epoch) return false;
      denied.delete(key);
      return true;
    },
    denied: (account: string, roomId: string) =>
      denied.has(permissionKey(account, roomId)),
    deny(account: string, roomId: string, epoch: number) {
      const key = permissionKey(account, roomId);
      denied.set(key, Math.max(denied.get(key) ?? -1, epoch));
    },
    authorize(room: Room, epoch: number) {
      const key = permissionKey(room.me, room.id),
        deniedEpoch = denied.get(key);
      if (
        room.members.includes(room.me) &&
        deniedEpoch !== undefined &&
        epoch > deniedEpoch
      )
        denied.delete(key);
    },
    position: (target: DocumentTarget) => positions.get(targetKey(target)),
    setPosition(target: DocumentTarget, value: Position) {
      positions.set(targetKey(target), value);
    },
    get: (target: DocumentTarget) => values.get(targetKey(target)),
    set(target: DocumentTarget, value: Draft) {
      targets.set(targetKey(target), target);
      values.set(targetKey(target), { ...value, revision: ++draftRevision });
    },
    orphans(room: Room): OrphanedDocumentDraft[] {
      return [...targets].flatMap(([key, target]) => {
        const value = values.get(key);
        return value &&
          target.account === room.me &&
          target.roomId === room.id &&
          target.epicId &&
          !room.epics.some((epic) => epic.id === target.epicId)
          ? [
              {
                account: target.account,
                roomId: target.roomId,
                epicId: target.epicId,
                text: value.text,
                revision: value.revision,
              },
            ]
          : [];
      });
    },
    delete: (target: DocumentTarget) => values.delete(targetKey(target)),
    clear() {
      account = undefined;
      values.clear();
      targets.clear();
      denied.clear();
      positions.clear();
    },
  };
}
export type DocumentDrafts = ReturnType<typeof createDocumentDrafts>;
export type DocumentView = {
  target: DocumentTarget | null;
  text: string;
  mode: DocumentMode;
  status:
    | "idle"
    | "loading"
    | "connected"
    | "connecting"
    | "disconnected"
    | "fallback";
  synced: boolean;
  denied: boolean;
  checkingAccess: boolean;
  roomDocument: boolean;
  recovery: string | null;
  error: boolean;
  fallbackPending: boolean;
  orphaned: OrphanedDocumentDraft[];
  readPending: boolean;
  fallbackUnconfirmed: boolean;
};
type Options = {
  editorTimeoutMs?: number;
  authorizationEpoch?: number;
  access?: AuthApi["access"];
  drafts: DocumentDrafts;
  request: RequestRoomCommand;
  load?: () => Promise<EditorModule>;
  schedule?: (callback: () => void, delay: number) => Timer;
  cancel?: (timer: Timer) => void;
  label?: string;
  readMode?: () => string | null;
  writeMode?: (mode: DocumentMode) => void;
  name: (room: Room) => string;
  color: (room: Room) => string;
  onMode?: (mode: DocumentMode) => void;
};
export function createDocumentSession(options: Options) {
  const schedule = options.schedule ?? setTimeout,
    cancel = options.cancel ?? clearTimeout;
  let mode: DocumentMode = "preview";
  try {
    if (options.readMode?.() === "edit") mode = "edit";
  } catch {}
  let value: DocumentView = {
    target: null,
    text: "",
    mode,
    status: "idle",
    synced: false,
    denied: false,
    checkingAccess: false,
    roomDocument: false,
    recovery: null,
    error: false,
    fallbackPending: false,
    orphaned: [],
    readPending: false,
    fallbackUnconfirmed: false,
  };
  const state = writable(value),
    publish = (patch: Partial<DocumentView>) => {
      value = { ...value, ...patch };
      state.set(value);
    };
  let active = true,
    room: Room | undefined,
    thread = "main",
    element: HTMLElement | undefined,
    editor: Editor | undefined,
    generation = 0,
    loading: Promise<EditorModule> | undefined,
    timer: Timer | undefined,
    moduleTimer: Timer | undefined,
    readTimer: Timer | undefined,
    confirmationTimer: Timer | undefined,
    authorizationEpoch = options.authorizationEpoch ?? 0,
    accessRevision = 0,
    accessTimer: Timer | undefined,
    accessAbort: AbortController | undefined,
    readRevision = 0,
    writeRevision = 0,
    localText: string | undefined;
  const asked = new Set<string>();
  function remember() {
    if (!value.target) return;
    if (editor)
      options.drafts.setPosition(value.target, {
        selection: editor.selection(),
        scroll: editor.scroll(),
      });
    const text = editor?.text() ?? value.text;
    if (
      localText !== undefined &&
      room &&
      text !== documentText(room, value.target)
    )
      options.drafts.set(value.target, {
        text,
        selection: editor?.selection(),
        scroll: editor?.scroll() ?? element?.scrollTop ?? 0,
      });
  }
  function cancelAccess() {
    ++accessRevision;
    if (accessTimer !== undefined) cancel(accessTimer);
    accessTimer = undefined;
    accessAbort?.abort();
    accessAbort = undefined;
  }
  function stop() {
    cancelAccess();
    if (value.checkingAccess) publish({ checkingAccess: false });
    ++generation;
    ++writeRevision;
    if (timer !== undefined) cancel(timer);
    timer = undefined;
    if (moduleTimer !== undefined) cancel(moduleTimer);
    moduleTimer = undefined;
    if (confirmationTimer !== undefined) cancel(confirmationTimer);
    confirmationTimer = undefined;
    remember();
    const previous = editor;
    editor = undefined;
    previous?.destroy();
    element?.replaceChildren();
  }
  function cancelRead() {
    ++readRevision;
    if (readTimer !== undefined) cancel(readTimer);
    readTimer = undefined;
  }
  function requestMissing() {
    if (
      !active ||
      !room ||
      !room.members.includes(room.me) ||
      options.drafts.denied(room.me, room.id) ||
      !value.target?.epicId
    )
      return;
    const key = targetKey(value.target);
    if (
      !Object.hasOwn(room.docs ?? {}, value.target.epicId) &&
      !asked.has(key)
    ) {
      asked.add(key);
      cancelRead();
      const ticket = readRevision,
        epic = value.target.epicId;
      publish({ readPending: true, error: false });
      readTimer = schedule(() => {
        if (
          !active ||
          ticket !== readRevision ||
          !value.target ||
          targetKey(value.target) !== key
        )
          return;
        readTimer = undefined;
        publish({ readPending: false, error: true });
      }, 30000);
      void options
        .request({ t: "doc.get", epic })
        .then((outcome) => {
          if (
            !active ||
            ticket !== readRevision ||
            !value.target ||
            targetKey(value.target) !== key
          )
            return;
          if (!outcome.ok) {
            cancelRead();
            publish({ readPending: false, error: true });
          }
        })
        .catch(() => {
          if (active && ticket === readRevision) {
            cancelRead();
            publish({ readPending: false, error: true });
          }
        });
    }
  }
  function mount() {
    if (
      !active ||
      !element ||
      !room ||
      !value.target ||
      value.denied ||
      value.mode !== "edit" ||
      editor ||
      value.status === "loading" ||
      value.status === "fallback"
    )
      return;
    const target = value.target,
      ticket = ++generation,
      host = element;
    let restorePosition = true;
    // A new live writer never inherits dirty ownership from the previous
    // fallback/view. Keep that draft separate until explicit restore/discard.
    localText = undefined;
    ++writeRevision;
    publish({
      status: "loading",
      synced: false,
      error: false,
      fallbackPending: false,
      fallbackUnconfirmed: false,
      recovery: options.drafts.get(target)?.text ?? value.recovery,
    });
    moduleTimer = schedule(() => {
      if (
        !active ||
        ticket !== generation ||
        editor ||
        value.status !== "loading"
      )
        return;
      moduleTimer = undefined;
      ++generation;
      loading = undefined;
      publish({ status: "fallback", error: true, synced: false });
    }, options.editorTimeoutMs ?? 30000);
    (loading ??= Promise.resolve().then(
      options.load ?? (() => import("./editor")),
    ))
      .then((module) => {
        if (
          !active ||
          ticket !== generation ||
          element !== host ||
          value.mode !== "edit"
        )
          return;
        if (moduleTimer !== undefined) cancel(moduleTimer);
        moduleTimer = undefined;
        try {
          const mounted = module.mountEditor(host, {
            target,
            label: options.label ?? "Document editor",
            name: options.name(room!),
            color: options.color(room!),
            onDenied() {
              if (active && ticket === generation && !value.denied)
                owner.checkAccess();
            },
            onText(text, local) {
              if (!active || ticket !== generation || value.denied) return;
              if (local) localText = text;
              publish({ text });
            },
            onStatus(status) {
              if (active && ticket === generation && !value.denied)
                publish({
                  status,
                  synced: status === "connected" ? value.synced : false,
                });
            },
            onSync(synced) {
              if (active && ticket === generation && !value.denied) {
                publish({ synced });
                if (synced && editor && restorePosition) {
                  restorePosition = false;
                  const position = options.drafts.position(target);
                  if (position?.selection)
                    editor.setSelection(position.selection);
                  if (position) editor.setScroll(position.scroll);
                }
              }
            },
          });
          if (!active || ticket !== generation) {
            mounted.destroy();
            return;
          }
          editor = mounted;
          if (value.synced && restorePosition) {
            restorePosition = false;
            const position = options.drafts.position(target);
            if (position?.selection) editor.setSelection(position.selection);
            if (position) editor.setScroll(position.scroll);
          }
          editor.focus();
        } catch {
          if (active && ticket === generation)
            publish(
              editor
                ? { error: true }
                : { status: "fallback", error: true, synced: false },
            );
        }
      })
      .catch(() => {
        if (active && ticket === generation) {
          if (moduleTimer !== undefined) cancel(moduleTimer);
          moduleTimer = undefined;
          loading = undefined;
          publish({ status: "fallback", error: true, synced: false });
        }
      });
  }
  const owner = {
    state,
    authorized: () =>
      !!(
        active &&
        room &&
        room.members.includes(room.me) &&
        !options.drafts.denied(room.me, room.id)
      ),
    checkAccess() {
      if (!active || !room || !value.target || value.checkingAccess) return;
      if (!editor) {
        owner.revoke();
        return;
      }
      cancelAccess();
      remember();
      ++writeRevision;
      if (timer !== undefined) cancel(timer);
      timer = undefined;
      if (confirmationTimer !== undefined) cancel(confirmationTimer);
      confirmationTimer = undefined;
      cancelRead();
      const target = value.target,
        ticket = accessRevision,
        denialEpoch = authorizationEpoch,
        quarantined = editor;
      options.drafts.deny(target.account, target.roomId, denialEpoch);
      quarantined.pause();
      publish({
        denied: true,
        checkingAccess: true,
        text: "",
        recovery: options.drafts.get(target)?.text ?? null,
        orphaned: [],
        synced: false,
        readPending: false,
        error: false,
      });
      const current = () =>
        active &&
        ticket === accessRevision &&
        editor === quarantined &&
        value.target &&
        targetKey(value.target) === targetKey(target) &&
        room?.me === target.account &&
        room.id === target.roomId;
      const fail = () => {
        if (!current()) return;
        cancelAccess();
        ++generation;
        ++writeRevision;
        editor = undefined;
        quarantined.destroy();
        localText = undefined;
        publish({
          checkingAccess: false,
          denied: true,
          text: "",
          mode: "preview",
          status: "idle",
          synced: false,
        });
      };
      accessAbort = new AbortController();
      const signal = accessAbort.signal;
      accessTimer = schedule(fail, 30000);
      const access =
        options.access ??
        ((id: string, signal?: AbortSignal) =>
          createAuthApi((input, init) =>
            fetch(input, { ...init, cache: "no-store" }),
          ).access(id, signal));
      void Promise.resolve()
        .then(() => (current() ? access(target.roomId, signal) : null))
        .then(async (proof) => {
          if (!current()) return;
          if (
            !proof ||
            proof.state !== "member" ||
            proof.email !== target.account
          ) {
            fail();
            return;
          }
          const answer = await options.request({
            t: "doc.get",
            epic: target.epicId ?? undefined,
          });
          if (!current()) return;
          if (
            !answer.ok ||
            !options.drafts.prove(target.account, target.roomId, denialEpoch)
          ) {
            fail();
            return;
          }
          cancelAccess();
          publish({
            denied: false,
            checkingAccess: false,
            status: "connecting",
            text: quarantined.text(),
            error: false,
          });
          if (room) owner.sync(room, thread);
          try {
            quarantined.resume();
            quarantined.focus();
          } catch {
            ++generation;
            ++writeRevision;
            editor = undefined;
            options.drafts.deny(target.account, target.roomId, denialEpoch);
            quarantined.destroy();
            publish({
              denied: true,
              checkingAccess: false,
              text: "",
              mode: "preview",
              status: "idle",
            });
          }
        })
        .catch(fail);
    },
    revoke(recordEvidence = true) {
      if (!active || !room || !value.target) return;
      stop();
      cancelRead();
      if (recordEvidence)
        options.drafts.deny(room.me, room.id, authorizationEpoch);
      localText = undefined;
      publish({
        denied: true,
        checkingAccess: false,
        text: "",
        recovery: options.drafts.get(value.target)?.text ?? null,
        orphaned: [],
        mode: "preview",
        status: "idle",
        synced: false,
        readPending: false,
        error: false,
        fallbackPending: false,
        fallbackUnconfirmed: false,
      });
    },
    roomDocument: () => value.roomDocument,
    target: () => value.target,
    invalidate(epic: string) {
      if (room)
        asked.delete(
          targetKey({ account: room.me, roomId: room.id, epicId: epic }),
        );
    },
    sync(
      next: Room,
      nextThread: string,
      fresh = false,
      authoritative = false,
      epoch = options.authorizationEpoch ?? 0,
    ) {
      if (!active) return;
      const accountChanged = !!room && room.me !== next.me;
      const roomDocument =
        accountChanged || thread !== nextThread ? false : value.roomDocument;
      const target = documentTarget(next, nextThread, roomDocument),
        changed =
          !value.target || targetKey(target) !== targetKey(value.target);
      if (changed) {
        stop();
        cancelRead();
      }
      if (accountChanged) {
        asked.clear();
        localText = undefined;
      }
      options.drafts.account(next.me);
      room = next;
      thread = nextThread;
      if (authoritative) {
        if (epoch > authorizationEpoch && value.checkingAccess) {
          stop();
          publish({ checkingAccess: false, mode: "preview", status: "idle" });
        }
        options.drafts.authorize(next, epoch);
        authorizationEpoch = Math.max(authorizationEpoch, epoch);
      }
      if (value.checkingAccess && !changed && next.members.includes(next.me))
        return;
      if (
        !next.members.includes(next.me) ||
        options.drafts.denied(next.me, next.id)
      ) {
        if (changed) {
          localText = undefined;
          publish({ target, text: "" });
        }
        owner.revoke(authoritative && !next.members.includes(next.me));
        return;
      }
      if (value.denied) publish({ denied: false });
      if (fresh) {
        asked.clear();
        cancelRead();
      }
      if (changed) {
        localText = undefined;
        const draft = options.drafts.get(target);
        publish({
          target,
          roomDocument,
          text: documentText(next, target),
          recovery: draft?.text ?? null,
          status: "idle",
          synced: false,
          error: false,
          fallbackPending: false,
          readPending: false,
          fallbackUnconfirmed: false,
        });
      } else if (!editor && !value.fallbackPending)
        publish({ text: documentText(next, target) });
      if (
        (localText !== undefined && localText === documentText(next, target)) ||
        (localText === undefined &&
          options.drafts.get(target)?.text === documentText(next, target))
      ) {
        options.drafts.delete(target);
        localText = undefined;
        ++writeRevision;
        if (confirmationTimer !== undefined) cancel(confirmationTimer);
        confirmationTimer = undefined;
        publish({
          fallbackPending: false,
          fallbackUnconfirmed: false,
          recovery: null,
        });
      }
      publish({ orphaned: options.drafts.orphans(next) });
      if (!target.epicId || Object.hasOwn(next.docs ?? {}, target.epicId)) {
        cancelRead();
        if (value.readPending) publish({ readPending: false });
        if (value.status !== "fallback" && value.error)
          publish({ error: false });
      }
      requestMissing();
      mount();
    },
    attach(host: HTMLElement) {
      if (!active) return;
      element = host;
      mount();
      return () => {
        if (active && element === host) {
          stop();
          element = undefined;
          publish({ status: "idle", synced: false });
        }
      };
    },
    mode(mode: DocumentMode) {
      if (
        !active ||
        value.mode === mode ||
        (mode === "edit" && !owner.authorized())
      )
        return;
      if (mode === "preview") stop();
      publish({
        mode,
        status: "idle",
        synced: false,
        recovery: value.target
          ? (options.drafts.get(value.target)?.text ?? value.recovery)
          : value.recovery,
      });
      try {
        options.writeMode?.(mode);
      } catch {}
      options.onMode?.(mode);
      if (mode === "edit") mount();
    },
    chooseRoom(yes: boolean) {
      if (!owner.authorized() || !room) return;
      publish({ roomDocument: yes });
      owner.sync(room, thread);
    },
    ownsOrphan(snapshot: OrphanedDocumentDraft) {
      if (
        !active ||
        !room ||
        snapshot.account !== room.me ||
        snapshot.roomId !== room.id ||
        room.epics.some((epic) => epic.id === snapshot.epicId)
      )
        return false;
      const draft = options.drafts.get({
        account: snapshot.account,
        roomId: snapshot.roomId,
        epicId: snapshot.epicId,
      });
      return (
        draft?.revision === snapshot.revision && draft.text === snapshot.text
      );
    },
    discardOrphan(snapshot: OrphanedDocumentDraft) {
      if (!room || !owner.ownsOrphan(snapshot)) return;
      options.drafts.delete({
        account: snapshot.account,
        roomId: snapshot.roomId,
        epicId: snapshot.epicId,
      });
      publish({ orphaned: options.drafts.orphans(room) });
    },
    input(text: string) {
      if (
        !active ||
        value.status !== "fallback" ||
        !value.target ||
        !room ||
        !owner.authorized()
      )
        return;
      const target = value.target,
        ticket = generation,
        write = ++writeRevision;
      localText = text;
      publish({ text, fallbackPending: true, fallbackUnconfirmed: false });
      if (confirmationTimer !== undefined) cancel(confirmationTimer);
      confirmationTimer = undefined;
      options.drafts.set(target, { text, scroll: element?.scrollTop ?? 0 });
      if (timer !== undefined) cancel(timer);
      timer = schedule(() => {
        timer = undefined;
        if (
          !active ||
          ticket !== generation ||
          write !== writeRevision ||
          !room ||
          !value.target ||
          targetKey(target) !== targetKey(value.target) ||
          room.me !== target.account ||
          room.id !== target.roomId ||
          (target.epicId && !room.epics.some((e) => e.id === target.epicId))
        )
          return;
        const current = () =>
          active &&
          ticket === generation &&
          write === writeRevision &&
          value.target &&
          targetKey(target) === targetKey(value.target) &&
          value.fallbackPending;
        void options
          .request({ t: "doc", text, epic: target.epicId ?? undefined })
          .then((outcome) => {
            if (!current()) return;
            if (!outcome.ok) {
              publish({ error: true, fallbackUnconfirmed: true });
              return;
            }
            // One read after the actual ACK reconciles the canonical mirror; it
            // never repeats a mutation or treats the ACK as durable CRDT storage.
            return options
              .request({ t: "doc.get", epic: target.epicId ?? undefined })
              .then((read) => {
                if (current() && !read.ok)
                  publish({ error: true, fallbackUnconfirmed: true });
              });
          })
          .catch(() => {
            if (current()) publish({ error: true, fallbackUnconfirmed: true });
          });
        publish({ fallbackPending: true });
        confirmationTimer = schedule(() => {
          if (!active || ticket !== generation || write !== writeRevision)
            return;
          confirmationTimer = undefined;
          if (value.fallbackPending)
            publish({ fallbackUnconfirmed: true, error: true });
        }, 30000);
      }, 400);
    },
    recoveryToken(): RecoveryToken | null {
      if (!active || !value.target || value.recovery === null) return null;
      const draft = options.drafts.get(value.target);
      return draft && draft.text === value.recovery
        ? { key: targetKey(value.target), revision: draft.revision }
        : null;
    },
    recoveryText(token: RecoveryToken | null): string | null {
      if (
        !active ||
        !token ||
        !value.target ||
        value.recovery === null ||
        targetKey(value.target) !== token.key
      )
        return null;
      const draft = options.drafts.get(value.target);
      return draft?.revision === token.revision && draft.text === value.recovery
        ? draft.text
        : null;
    },
    restore(token: RecoveryToken | null) {
      const text = owner.recoveryText(token);
      if (
        !active ||
        text === null ||
        !value.target ||
        !owner.authorized() ||
        (editor && !value.synced)
      )
        return;
      publish({ recovery: null });
      localText = text;
      if (editor) editor.replace(text);
      else if (value.status === "fallback") owner.input(text);
      else publish({ recovery: text });
    },
    dismissRecovery(token: RecoveryToken | null) {
      if (!active || !value.target || owner.recoveryText(token) === null)
        return;
      options.drafts.delete(value.target);
      publish({ recovery: null });
    },
    retry() {
      if (!owner.authorized() || !room) return;
      if (value.target) asked.delete(targetKey(value.target));
      requestMissing();
      if (value.status === "fallback") {
        stop();
        publish({ status: "idle", error: false });
        mount();
      }
    },
    focus() {
      editor?.focus();
    },
    dispose() {
      if (!active) return;
      stop();
      cancelRead();
      active = false;
      room = undefined;
      element = undefined;
      loading = undefined;
      asked.clear();
      localText = undefined;
      value = {
        ...value,
        target: null,
        text: "",
        recovery: null,
        orphaned: [],
      };
      state.set(value);
    },
  };
  return owner;
}
export type DocumentSession = ReturnType<typeof createDocumentSession>;
