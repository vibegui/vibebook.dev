import { resolveApplicationLanguage, applicationLocale, createApplicationCopy } from "../features/application/copy";
import {permissionAsk as isPermAsk,visibleChatMessages,privateAskForOther,permissionReply} from "../features/chat/privacy";
import {canAnswer,choicesOf} from "../features/chat-interactive/model";
import {createFilesSession} from "../features/files/session";
import { messageIdentity } from "../features/home/model";
import { createApplicationPersonalChannel } from "../features/application/personal-channel";
import { createHomeApi } from "../features/home/api";
import { createPersonalSession } from "../features/home/personal";
import { createRoomsSession } from "../features/rooms/session";
import { createAppNavigationSession } from "../features/app-navigation/controller";
import { createApplicationRouter, roomIdFromPath } from "../features/app-navigation/router";
// Existing host integrations retained during the incremental TypeScript migration.
// Native room views and wire contracts live in the typed modules alongside this file.
import * as UI from "../main";
import { syncNavigationSession } from "../features/navigation/session";
import {
  syncPinsSession,
  disposePinsSession,
  requestPinnedFiles,
} from "../features/pins/session";
import { createUiNavigation } from "../navigation";
import {
  getBoardContainer,
  moveBoardContainer,
  watchBoardLayout,
} from "./boardLayout";
import { uiNavigationUrl } from "../../shared/uiVariant";
const navigation = createUiNavigation(history, () => location.href, "svelte");
import { createRoomApi } from "../transport";
import { createRootRoomSession } from "../features/root-room/session";
import { createChatViewport } from "../features/chat-viewport/controller";
import { createChatSurface } from "../features/chat-viewport/surface";
const LANG = resolveApplicationLanguage(document.cookie, navigator.language);
document.documentElement.lang = LANG === "en" ? "en" : "pt-BR";
const LOCALE = applicationLocale(LANG);
const t = createApplicationCopy(LANG);
const $app = document.getElementById("app");
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const COLORS = [
  "#ff5a36",
  "#1f9d8a",
  "#3b6cf6",
  "#c2410c",
  "#9333ea",
  "#0f766e",
  "#be185d",
  "#4d7c0f",
];
const color = (s) =>
  COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
let knownNames = {}; // email → display name (from /api/me friends + book state)
const name = (email) =>
  email === "ai"
    ? "@vibe"
    : S?.names?.[email] || knownNames[email] || email.split("@")[0];
let avatarV = {}; // email → profile picture version (from /api/me; rooms bring theirs in S.avatars)
const avatar = (email, on) => {
  if (email === "ai") return `<span class="avatar ai">✦</span>`;
  const v = S?.avatars?.[email] ?? avatarV[email];
  return v
    ? `<span class="avatar pic ${on ? "on" : ""}" title="${esc(name(email))}"><img src="/api/avatar/${encodeURIComponent(email)}?v=${v}" alt="" loading="lazy" /></span>`
    : `<span class="avatar ${on ? "on" : ""}" style="background:${color(email)}" title="${esc(name(email))}">${esc(name(email).slice(0, 2).toUpperCase())}</span>`;
};
const ago = (ts) => {
  const m = Math.round((Date.now() - ts) / 60000);
  return m < 1
    ? t("agora")
    : m < 60
      ? `${m} min`
      : m < 1440
        ? `${Math.round(m / 60)} h`
        : `${Math.round(m / 1440)} d`;
};
// Escaped text → clickable http(s) links (opened safely in a new tab).
// @mentions: a member's handle is their first name (accents stripped), else the first part of their email.
const fold = (x) =>
  x
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]/g, "");
// Accepted handles: first name, the email's local part, and its first token ("leca" for leca.schatz@).
const handlesOf = (email) => {
  const local = email.split("@")[0];
  return [
    fold(
      S?.names?.[email]?.split(/\s+/)[0] ||
        knownNames[email]?.split(/\s+/)[0] ||
        "",
    ),
    fold(local.split(/[._+-]/)[0]),
    fold(local),
  ].filter(Boolean);
};
const mentionTarget = (h) => {
  const k = fold(h);
  if (k === "vibe" || k === "ai") return "ai";
  return (S?.members || []).find((e) => handlesOf(e).includes(k)) || null;
};
const mentions = (h) =>
  h.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (all, pre, tag) => {
    const who = mentionTarget(tag);
    return who
      ? `${pre}<span class="mention${who === S?.me ? " me" : ""}" title="${esc(who === "ai" ? "@vibe" : who)}">@${tag}</span>`
      : all;
  });
// ---------------- switcher ----------------
const $sw = document.getElementById("switcher");
let nativePersonal = null,
  nativeRooms = null,
  nativeAppNav = null,
  nativeNavMount = null,
  nativeRouter = null;
let homeSettingsCleanup = () => {};
let myBooks = null; // from /api/me, newest activity first
let myWaits = []; // "Esperando você" (/api/me waits): what people are waiting on you for
// A Claude of yours stopped at a question (a<msg> = its ask in the room, b<msg> = blocked in the terminal): those
// counts turn orange-red instead of yellow, so "your Claude is stuck" stands out from people waiting.
const clW = (ws) => (ws.some((w) => /^[ab]\d/.test(w.ref)) ? " cl" : "");
// One icon set for the whole app (lucide-style strokes): icon(name, size) → inline SVG. Brand marks (✻ Claude, ✦ @vibe) stay glyphs.
const ICONS = {
  link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  inbox: `<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>`,
  grid: `<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>`,
  search: `<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4-4"/>`,
  expand: `<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/>`,
  plus: `<path d="M5 12h14"/><path d="M12 5v14"/>`,
  pin: `<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>`,
  x: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
  check: `<path d="M20 6 9 17l-5-5"/>`,
  menu: `<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>`,
  list: `<path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/>`,
  sidebar: `<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M9 3v18"/>`,
  back: `<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>`,
  external: `<path d="M7 7h10v10"/><path d="M7 17 17 7"/>`,
  board: `<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/>`,
  doc: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>`,
  file: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>`,
  mic: `<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
  folder: `<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`,
  calendar: `<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/>`,
  trash: `<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  archive: `<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>`,
  undo: `<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>`,
  reply: `<path d="m9 17-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>`,
  copy: `<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
  bell: `<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>`,
  bellOff: `<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M17 17H4a1 1 0 0 1-.74-1.67C4.59 13.96 6 12.5 6 8a6 6 0 0 1 .26-1.74"/><path d="m2 2 20 20"/><path d="M8.67 3.01A6 6 0 0 1 18 8c0 2.69.77 4.65 1.71 6.05"/>`,
  camera: `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>`,
  plug: `<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>`,
  chart: `<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
  terminal: `<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>`,
  alert: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
  paperclip: `<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l8.6-8.6a4 4 0 0 1 5.7 5.7l-8.6 8.6a2 2 0 0 1-2.8-2.8l8.5-8.5"/>`,
  at: `<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>`,
  hand: `<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`,
  arrowRight: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
  sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
  moon: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
  chevronDown: `<path d="m6 9 6 6 6-6"/>`,
  chevronRight: `<path d="m9 18 6-6-6-6"/>`,
  pencil: `<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>`,
  contrast: `<circle cx="12" cy="12" r="9"/><path d="M12 17a5 5 0 0 0 0-10z" fill="currentColor"/>`,
};
const icon = (n, size = 16) =>
  `<svg class="i" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
const SW_LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="22" height="24" rx="5" fill="#fff"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/></svg>`;
const SW_SEARCH = icon("search", 18);
// The ✻ of the Agents buttons, drawn (the glyph sat off center): six round-capped spokes around the exact middle.
const SW_PLUS = icon("plus", 18);
// Phones: the room is as tall as what's visible (the iOS keyboard shrinks the visual viewport, not 100dvh),
// and iOS's habit of scrolling the whole page to show a focused input is undone (in a room only: the home is a
// normal scrolling page, and snapping it back to the top on every scroll event broke scrolling there).
if (window.visualViewport) {
  const fit = () => {
    document.documentElement.style.setProperty(
      "--vvh",
      `${Math.round(visualViewport.height)}px`,
    );
    if (innerWidth <= 900 && scrollY && document.querySelector(".book"))
      scrollTo(0, 0);
  };
  visualViewport.addEventListener("resize", fit);
  visualViewport.addEventListener("scroll", fit);
  fit();
}
// Theme: auto (follows the system) → light → dark, remembered per browser; the CSS reads data-theme via color-scheme.
const THEMES = {
  auto: {
    label: t("Tema automático (do sistema)"),
    next: "light",
    icon: icon("contrast", 18),
  },
  light: { label: t("Tema claro"), next: "dark", icon: icon("sun", 18) },
  dark: { label: t("Tema escuro"), next: "auto", icon: icon("moon", 18) },
};
const theme = () => document.documentElement.dataset.theme || "auto";
function setTheme(t) {
  if (t === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  try {
    t === "auto"
      ? localStorage.removeItem("vb.theme")
      : localStorage.setItem("vb.theme", t);
  } catch {}
  renderSwitcher();
}
const iconUrl = (b) => (b?.icon ? `/api/books/${b.id}/icon?v=${b.icon}` : null);
// The room you're in is read up to its newest message (the server marks it too); refresh the rail every 30s.
function seenHere(upto) {
  if (S) nativePersonal?.seen(S.id, upto);
}
// No polling: the person's channel (/ws-me, src/person.ts) says when something outside the open room changed
// ({t:"me"}: rail, waits, version; {t:"agents", book}: that room's Claudes and sandboxes) and the app fetches it once.
// Coming back to the tab refreshes once too (a phone drops sockets in the background).
let nativePersonalChannel = null;
const currentRoomId = () => roomIdFromPath(location.pathname);

function ensureNativeHome() {
  if (nativePersonal) return;
  nativePersonal = createPersonalSession(createHomeApi(), {
    onVersion: newVersion,
    onUnauthorized: () => {
      location.href = uiNavigationUrl(
        `/login?next=${encodeURIComponent(location.pathname + location.search + location.hash)}`,
        location.href,
        "svelte",
      );
    },
    onIdentityChange: () => {
      nativeDocumentOwner?.dispose();nativeDocumentOwner=null;nativeDocumentDrafts.clear();
      nativeViewer?.reset();
      composerDrafts.reset();
      nativeRoomMutations?.dispose();nativeRoomMutations=null;
      myBooks = null;
      myWaits = [];
      friends = [];
      knownNames = {};
      avatarV = {};
      homeSettingsCleanup();
      nativeAppNav?.pageLeft();
      nativeRooms?.reset();
      rootRoom.resetAccount();
      roomAgents = { id: null, list: [] };
      nativeAgents.reset();nativeAgentOwner=null;
      disposeNativeApps();
      nativePersonalChannel?.resetIdentity();
          roomConnection?.dispose();
      roomConnection = null;
      S = null;
      queueMicrotask(route);
    },
  });
  nativeRooms = createRoomsSession(nativePersonal);
  nativeAppNav = createAppNavigationSession(nativePersonal, nativeRooms, {
    navigate: (target) => nativeRouter.go(target),
    home: () => nativeRouter.go("/app"),
    archived: () => nativeRouter.go("/archived"),
    settings: openHomeSettings,
    rename: (id, title) =>
      S?.id === id && currentRoomId() === id
        ? (roomConnection?.request({ t: "title", title }) ??
          Promise.resolve({ ok: false, error: t("sem conexão") }))
        : Promise.resolve({ ok: false, error: t("sem conexão") }),
  });
  nativeRouter = createApplicationRouter({
    current: () => location.href,
    history,
    beforeChange: () => {
      nativePersonalChannel?.routeChanged();
      nativeViewer?.closeNavigation();
      UI.dismissDialogs();
      closeInbox();
      closeRoomOverlaysForNavigation();
      homeSettingsCleanup();
      nativeAppNav.pageLeft();
    },
    document: (href) => {
      location.href = href;
    },
    consumePop: () => UI.consumeFileViewerPop(nativeViewer,S?{roomId:S.id,account:S.me,thread}:null,sheetPop,location.href),
    deferNavigation: (callback) => nativeViewer?.deferNavigation(callback) ?? false,
    sameRoom: (target) => {
      if (
        !S ||
        S.id !== target.roomId ||
        !roomConnection ||
        !$app.querySelector(".book")
      )
        return false;
      const requested = target.thread || "main";
      const selected = requested === "main" || S.epics.some(epic => epic.id === requested) ? requested : "main";
      if (target.messageId) goToMsg(target.messageId, selected);
      else if (target.fileId) {
        if (thread !== selected) selectThread(selected);
        openFile(target.fileId);
      } else {
        selectThread(selected);
        if (target.document) {
          document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" }));
          if (ROOM_PHONE.matches) openSheet("doc");
        }
      }
      renderSwitcher();
      return true;
    },
    activate: () => route(),
  });
  let previous = null;
  nativePersonal.state.subscribe(({ me }) => {
    if (!me || me === previous) return;
    nativePwa.account(me.email);
    const before = JSON.stringify(myWaits);
    previous = me;
    myBooks = me.books;
    myWaits = me.waits;
    friends = me.friends.map((friend) => friend.email);
    knownNames = Object.fromEntries(
      me.friends
        .filter((friend) => friend.name)
        .map((friend) => [friend.email, friend.name]),
    );
    avatarV = Object.fromEntries([
      ...me.friends
        .filter((friend) => friend.avatar)
        .map((friend) => [friend.email, friend.avatar]),
      ...(me.avatar ? [[me.email, me.avatar]] : []),
    ]);
    renderSwitcher();
    if (S && currentRoomId() === S.id) {
      renderSide();
      if (before !== JSON.stringify(myWaits)) renderChat(true);
      setFavicon(bookTitle());
    }
  });
  nativePersonalChannel = createApplicationPersonalChannel({
    personal: nativePersonal,
    agents: nativeAgents,
    listenIdentity: callback => nativePersonal.state.subscribe(({me,identityRevision}) => callback({account:me?.email??null,revision:identityRevision})),
    currentRoom: currentRoomId,
    room: () => roomConnection && S?.id === currentRoomId() ? {roomId:S.id,account:S.me,connection:roomConnection} : null,
    refreshRoom: loadRoomAgents,
    url: () => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`,
    visible: () => document.visibilityState === "visible",
    listenVisibility: callback => {
      document.addEventListener("visibilitychange",callback);
      return () => document.removeEventListener("visibilitychange",callback);
    },
  });
  nativePersonalChannel.start();
  nativePersonal.start();
}
function renderSwitcher() {
  ensureNativeHome();
  syncInbox();
  const show = !!myBooks && location.pathname !== "/login";
  document.body.classList.toggle("has-sw", show);
  nativeAppNav.syncPath(location.href);
  if (!show) {
    nativeNavMount?.destroy();
    nativeNavMount = null;
    $sw.replaceChildren();
    return;
  }
  const props = {
    controller: nativeAppNav,
    lang: LANG,
    theme: theme(),
    ontheme: () => setTheme(THEMES[theme()].next),
    onlanguage: (language) => {
      if (language === LANG) return;
      document.cookie = `vb_lang=${language}; path=/; max-age=31536000; samesite=lax`;
      location.reload();
    },
  };
  if (!nativeNavMount)
    nativeNavMount = UI.mountView("appNavigation", $sw, props);
  else nativeNavMount.update(props);
}
function openSwitch() {
  ensureNativeHome();
  nativeAppNav.openSearch(
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : undefined,
  );
}
function nativeHomeProps() {
  ensureNativeHome();
  return {
    pwa: nativePwa,
    personal: nativePersonal,
    rooms: nativeRooms,
    profile: ensureNativeAccount(),
    creator: nativeAppNav.creator,
    onlanguage: language=>{document.cookie=`vb_lang=${language}; path=/; max-age=31536000; samesite=lax`;location.reload();},
    lang: LANG,
    ago,
    onnavigate: (target) => nativeRouter.go(target),
    onhome: () => nativeRouter.go("/app"),
    onarchived: () => nativeRouter.go("/archived"),
    onnew: (trigger) => nativeAppNav.openCreate(trigger),
    onsettings: openHomeSettings,
    onroomsettings: (id, trigger) => nativeAppNav.openSettings(id, trigger),
    onsearch: openSwitch,
  };
}
function route() {
  ensureNativeHome();
  nativePersonalChannel?.routeChanged();
  closeRoomOverlaysForNavigation();
  nativeViewer?.reset();
  homeSettingsCleanup();
  nativeAppNav.pageLeft();
  chatViewport.cancelSearch();
  UI.dismissDialogs();
  closeInbox();
  clearViews();
  renderSwitcher();
  const id = currentRoomId();
  rootRoom.leave();
  roomConnection = null;
  if (location.pathname === "/login") {
    location.replace(location.href);
    return;
  }
  if (location.pathname === "/archived") return archivedPage();
  if (id) return openBook(id);
  if (location.pathname !== "/app" && location.pathname !== "/") {
    location.replace(uiNavigationUrl("/app", location.href, "svelte"));
    return;
  }
  home();
}

window.addEventListener("popstate", () => {
  ensureNativeHome();
  nativeRouter.pop();
});
document.addEventListener("click", (event) => {
  const anchor = event.target.closest?.("a[data-nav]");
  if (
    !anchor ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  )
    return;
  event.preventDefault();
  ensureNativeHome();
  nativeRouter.go(anchor.getAttribute("href"));
});

// ---------------- home ----------------
// The last /api/me (any page fetches it): going back home draws it at once, then the fresh one replaces it only if
// something changed, keeping what you were typing in the ask box.
// A newer app is out (this page's <meta name="vb-v"> differs from the server's): a small bar, tap to reload.
function newVersion(v) {
  const mine = document.querySelector('meta[name="vb-v"]')?.content;
  nativePersonal?.updateAvailable(!!v && !!mine && mine !== "development" && v !== "development" && v !== mine);
}

function home() {
  ensureNativeHome();
  document.title = "vibebook";
  setFavicon(null);
  renderView("home", $app, nativeHomeProps());
}
function archivedPage() {
  ensureNativeHome();
  document.title = `${t("Arquivo")} · vibebook`;
  setFavicon(null);
  renderView("archived", $app, nativeHomeProps());
}
// Native account surface. Personal AgentSettings retains its separately owned mount boundary until that port lands.
let nativeAccount=null,nativeAccountMount=null,nativeAccountTarget=null;
function accountProps(){return {owner:nativeAccount,device:nativeDeviceLock,lang:LANG,theme:theme(),onTheme:()=>{setTheme(THEMES[theme()].next);updateAccountView();},onLanguage:language=>{document.cookie=`vb_lang=${language}; path=/; max-age=31536000; samesite=lax`;location.reload();},onArchive:()=>{nativeAccount.close();nativeRouter.go('/archived');},onLogout:all=>{if(nativeAccount.current())void logoutWithPwa(all);},pwa:nativePwa,agents:nativeAgents,origin:location.origin,vb:{t,ago}};}
function updateAccountView(){if(nativeAccountMount)nativeAccountMount.update(accountProps());}
function ensureNativeAccount(){
  if(!nativeAccount){nativeAccount=UI.createAccountSession(nativePersonal,UI.createAccountApi());nativeAccountTarget=document.createElement('div');nativeAccountTarget.dataset.nativeAccountMount='';document.body.append(nativeAccountTarget);nativeAccountMount=UI.mountView('account',nativeAccountTarget,accountProps());}
  return nativeAccount;
}
function openHomeSettings(section='all'){
  ensureNativeHome();homeSettingsCleanup();if(!nativePersonal.peek())return;
  ensureNativeAccount();
  nativeAccount.open(section,document.activeElement instanceof HTMLElement?document.activeElement:undefined);
  homeSettingsCleanup=()=>{nativeAccount.close();nativeDeviceLock.cancel();};
}
// Caixa de entrada: the same waits as the home ("Esperando você": asks to you, your tasks in review, your Claude
// waiting on you), opened from any room, "Esta sala" or "Todas"; a click goes to the message, ✓ resolves an ask.
let inboxAll = false;
let inboxGeneration = 0;
function closeInbox() {
  inboxGeneration++;
  const node = document.getElementById("inbox");
  node?._unmount?.();
  if (node) node._unmount = null;
}
function syncInbox() {
  document.getElementById("inbox")?._unmount?.updateWaits(myWaits);
  const b = document.getElementById("inboxBtn");
  if (!b) return;
  const n = myWaits.length,
    k = b.querySelector(".kN");
  k.hidden = !n;
  k.textContent = n;
  k.className = `kN${clW(myWaits)}`;
}
// Native Svelte Inbox owns its accessible dialog, tabs, SVG/avatar rendering and Tailwind styles.
// This temporary host only supplies the room callbacks until the remaining application shell is ported.
const loadUI = () => Promise.resolve(UI);
function openInbox() {
  closeInbox();
  const generation = inboxGeneration;
  let d = document.getElementById("inbox");
  if (!d) {
    d = document.createElement("div");
    d.id = "inbox";
    document.body.appendChild(d);
  }
  const close = () => {
    if (generation === inboxGeneration) closeInbox();
  };
  loadUI()
    .then(({ mountInbox }) => {
      if (generation !== inboxGeneration) return;
      d.replaceChildren();
      d._unmount = mountInbox(d, {
        waits: myWaits,
        roomId: S?.id ?? null,
        all: inboxAll,
        vb: { t, ago },
        displayName: name,
        avatarUrl: (email) => {
          const v = S?.avatars?.[email] ?? avatarV[email];
          return v
            ? `/api/avatar/${encodeURIComponent(email)}?v=${v}`
            : undefined;
        },
        ontab: (v) => (inboxAll = v),
        onclose: close,
        onopen: (w, e) => {
          close();
          const mid = /^[mab]/.test(w.ref)
            ? messageIdentity(w.ref.slice(1))
            : undefined;
          if (S?.id === w.book_id) {
            e.preventDefault();
            if (mid) goToMsg(mid, w.thread);
            else if (w.thread !== thread) {
              thread = w.thread;
              renderSide();
              renderChat();
              renderDoc();
            }
          }
        },
        onresolve: async (w) => {
          await nativePersonal.api.resolve(w.book_id, w.ref);
          nativePersonal.invalidate();
          void nativePersonal.refresh();
        },
      });
    })
    .catch(() => toast(t("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
  if (e.target.closest?.("#inboxBtn")) openInbox();
});

// ---------------- book ----------------
const composerDrafts=UI.createComposerDrafts();
let roomConnection = null;
let activeDocumentConnectionGeneration=0;
let S = null; // compatibility bridge for host integrations; the typed store owns WS state
let typingNotes = new Map(); // read-only projection of RootRoomSession transient notes
let thread = "main";
let friends = []; // emails of people you already share something with
let pendingThread = null; // set by the home composer so the room opens on the chosen epic
// Rooms opened in this tab, as last seen: going back to one draws it at once, then the socket's state refreshes it.
const rootRoom=createRootRoomSession({
 url:(id,selected,code)=>`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws/${id}?t=${encodeURIComponent(selected)}${code?`&rc=${code}`:""}`,
 thread:()=>thread,
 acceptIdentity:account=>nativePersonal?.acceptIdentity(account)??false,
 cacheAllowed:room=>!(nativeAppAuthority?.roomId===room.id&&nativeAppAuthority.account===room.me&&nativeAppAuthority.connection===roomConnection&&nativeAppAuthority.owner.denied()),
 onOpen:snapshot=>{S=snapshot.room;thread=snapshot.thread;roomConnection=snapshot.connection;activeDocumentConnectionGeneration=snapshot.generation;typingNotes=snapshot.typingNotes;liveState=false;if(S)renderBook();else $app.innerHTML=roomSkeleton(snapshot.roomId);},
 onTransition:transition=>onEvent(transition),
 onTerminal:dropUnavailableRoom,
});
const roomCache = rootRoom.cache;
// Pending native feature adapters may clear their compatibility projection on access failure.
const roomStore={replace:value=>{if(value===null)rootRoom.leave();}};
let liveState = false; // this room's socket sent its state (else a close means no access)
// First visit to a room: draw its real frame at once with what the home already knows (name, icon, color), and
// placeholders shaped like the sidebar, the messages, the composer and the doc, so nothing jumps when the state lands.
function roomSkeleton(id) {
  const b = (myBooks || []).find((x) => x.id === id);
  const title = b?.title || "";
  document.title = `${title || "vibebook"} · vibebook`;
  const u = iconUrl(b);
  const mark = (cls) =>
    u
      ? `<span class="${cls} hasIcon"><img src="${u}" alt=""></span>`
      : title
        ? `<span class="${cls}" style="background:${coverColor(title)}">${esc(initials(title))}</span>`
        : `<span class="${cls}"></span>`;
  const row = (w) =>
    `<div class="thread"><span class="ri sk"></span><i style="width:${w}%"></i></div>`;
  const msg = (a, b2) =>
    `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${a}px"></i><i class="s" style="width:${b2}%"></i></div></div>`;
  return `<div class="book skel ${railMode ? "rail" : ""}" aria-busy="true" aria-label="${t("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${mark("ri roomIco")}<span class="rt">${esc(title)}</span></div>${row(70)}${row(55)}${row(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${t("Seus vibebooks")}">${icon("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${mark("ri roomIco phOnly")}<span>${esc(title)}</span></span></h2></div>
      <div class="msgs">${msg(90, 60)}${msg(120, 45)}${msg(70, 70)}${msg(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${t("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${t("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function dropUnavailableRoom(snapshot) {
 nativeViewer?.reset();clearViews();S=null;roomConnection=null;
 $app.innerHTML=snapshot.phase==="removed"?`<div class="home"><p>${t("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${icon("back")} ${t("seus vibebooks")}</a></div>`:`<div class="home"><p>${t("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${t("voltar")}</a></div>`;
}
function openBook(id) {
  const selected =
    pendingThread || new URLSearchParams(location.search).get("t") || "main";
  pendingThread = null;
  urlSynced = false;
  S = null;
  liveState = false;
  ensureNativeHome();
  void nativePersonal.refresh();
  rootRoom.open(id,selected);
}

const send = (m) => rootRoom.send(m);
const request = (m) => rootRoom.request(m);

const viewMounts = new Map();
let boardLayoutCleanup = () => {};
let sideNavigation = null;
let sidePins = null;
let nativeRoomMutations = null;
function syncRoomMutations(){
 if(!S)return null;
 if(nativeRoomMutations&&(nativeRoomMutations.roomId!==S.id||nativeRoomMutations.account!==S.me)){nativeRoomMutations.dispose();nativeRoomMutations=null;}
 if(!nativeRoomMutations)nativeRoomMutations=UI.createRoomMutations(S.me,S.id);
 const roomId=S.id,account=S.me,connection=roomConnection;
 nativeRoomMutations.sync(S,(command)=>S?.id===roomId&&S.me===account&&connection&&roomConnection===connection&&currentRoomId()===roomId?connection.request(command):Promise.resolve({ok:false,error:"offline"}));
 return nativeRoomMutations;
}
const roomSidebarBridge=()=>({t,name,ago,epicBusy,waitsIn,avatarUrl:(email)=>{const v=S?.avatars?.[email]??avatarV[email];return v?`/api/avatar/${encodeURIComponent(email)}?v=${v}`:undefined;}});
function disposeView(kind) {
  const mounted = viewMounts.get(kind);
  if (!mounted) return;
  mounted.target._mo?.disconnect();
  mounted.destroy();
  viewMounts.delete(kind);
}
function renderView(kind, target, props, remount = false) {
  let mounted = viewMounts.get(kind);
  if (mounted && (mounted.target !== target || remount || (kind==="chat"&&mounted.chatConnection!==roomConnection) || (kind.startsWith("document")&&mounted.documentOwner!==props.owner))) {
    disposeView(kind);
    mounted = null;
  }
  if (!mounted) {
    target.replaceChildren();
    mounted = { ...UI.mountView(kind, target, props), target,chatConnection:kind==="chat"?roomConnection:undefined,documentOwner:kind.startsWith("document")?props.owner:undefined };
    viewMounts.set(kind, mounted);
  } else mounted.update(props);
}
let nativeDocumentOwner=null,nativeDocumentSetPane=null,documentScopeReset=false;
const nativeDocumentDrafts=UI.createDocumentDrafts();
let nativeFilesSession = null;
function clearViews() {
  nativeFileChipIndex?.owner.dispose();nativeFileChipIndex=null;
  disposeNativeApps();
  disposePwaMounts();
  nativeAgents.detach();nativeAgentOwner=null;
  nativeFilesSession?.dispose();
  nativeFilesSession=null;
  sideNavigation = null;
  nativeRoomMutations?.dispose();nativeRoomMutations=null;
  disposePinsSession(sidePins);
  sidePins = null;
  boardLayoutCleanup();
  boardLayoutCleanup = () => {};
  nativeDocumentOwner?.dispose();nativeDocumentOwner=null;nativeDocumentSetPane=null;
  // Svelte subscriptions and observers must stop when leaving a room, including
  // navigation to home/login where renderBook will not run again.
  for (const kind of viewMounts.keys()) disposeView(kind);
  chatViewport.reset();chatSurfaceElement=null;chatSurface=null;
}
const panelBridge = () => ({ t, ago, name, locale: LOCALE });
let nativeFileChipIndex=null;
function syncFileChipIndex(fresh=false){
 if(!S||!roomConnection||currentRoomId()!==S.id)return null;
 if(nativeFileChipIndex&&(nativeFileChipIndex.roomId!==S.id||nativeFileChipIndex.account!==S.me||nativeFileChipIndex.connection!==roomConnection)){nativeFileChipIndex.owner.dispose();nativeFileChipIndex=null;}
 if(!nativeFileChipIndex){
  const roomId=S.id,account=S.me,connection=roomConnection;
  const current=()=>S?.id===roomId&&S.me===account&&S.members.includes(account)&&roomConnection===connection&&currentRoomId()===roomId&&nativeFileChipIndex?.owner===owner;
  const owner=UI.createFileChipIndex(roomId,account,current,command=>current()?connection.request(command):Promise.resolve({ok:false,error:"disconnected"}));
  nativeFileChipIndex={roomId,account,connection,owner};
 }
 nativeFileChipIndex.owner.sync(S,fresh);return nativeFileChipIndex.owner;
}
function ensureFileChipIndex(){void syncFileChipIndex()?.load();}
const chatBridge = () => ({ t, name, knownNames, pageUrl:location.href, locale:LOCALE, avatarUrl:(email)=>{const v=S?.avatars?.[email]??avatarV[email];return v?`/api/avatar/${encodeURIComponent(email)}?v=${v}`:undefined;}, ago, hhmm, typingLabel: (mode) => modeLabel[mode] ?? mode, typingNote: (id) => typingNotes.get(id), dateTime: (ts) => new Date(ts).toLocaleString(LOCALE), waiting: (id) => myWaits.some((w) => w.book_id === S.id && w.ref === `m${id}`) });
function selectThread(id) { if(deferViewerIntent(()=>selectThread(id)))return; thread = id; boardEpic = id === "main" ? null : id; documentScopeReset = true; leaveBoard(); renderSide(); renderChat(); renderKanban(); renderDoc(); }


function onEvent({event:ev,previous:previousState,snapshot}) {
  const id=snapshot.roomId,documentEpoch=snapshot.generation;
  // A callback already queued by a departed room's socket must not render into
  // the newly opened room (or its home screen).
  if (currentRoomId() !== id) return;
  const suggestionIntent=nativeRoomMutations?.suggestionIntent();
  S=snapshot.room;typingNotes=snapshot.typingNotes;liveState=snapshot.phase==="live";
  syncFileChipIndex(ev.t==="state");
  if (S && (ev.t === "meta" || ev.t === "state"))
    nativePersonal?.roomMeta(id, {
      title: S.book.title,
      folder: S.book.folder,
      summary: S.book.summary,
    });
  const appAuthorityOwnsRoom=nativeAppAuthority?.roomId===id&&nativeAppAuthority.connection===roomConnection&&nativeAppAuthority.account===S?.me;
  if (S&&appAuthorityOwnsRoom&&nativeAppAuthority.owner.denied())roomCache.delete(id);
  if(S&&appAuthorityOwnsRoom&&!S.members.includes(S.me))nativeAppAuthority.owner.deny();
  if(S&&nativeApps)nativeApps.owner.sync({...S,messages:allMsgs()},ev.t==="state");
  const documentAuthorization=ev.t==="state"||ev.t==="members";
  if(S&&documentAuthorization)nativeDocumentDrafts.authorize(S,documentEpoch);
  if(S&&nativeDocumentOwner)renderDoc(false,documentAuthorization);
  syncViewer(ev.t === "state");
  syncRoomMutations();
  switch (ev.t) {
    case "state": {
      nativePwa.account(S.me);
      const firstLoad = !previousState;
      // A fresh state has only the open thread in full and only its doc: let other threads and docs load again.
      chatViewport.sync(S,thread,documentEpoch,true,true);

      if (S.messages.length) seenHere(S.messages.at(-1).id);
      loadRoomAgents();
      if (firstLoad) renderBook(); else { renderSide(); renderChat(chatViewport.pinned() ? undefined : "stay"); renderDoc(true); renderTasks(); renderKanban(); renderFiles(false, true); renderApps(); renderReminders(); renderDecisions(); }
      return;
    }
    case "closed": renderChat("stay"); return;
    case "moved": { const m = S.messages.find((x) => x.id === ev.id); if (m) { renderChat(true); refreshThreadCards(); renderSide(); } break; }
    case "msg": seenHere(ev.m.id); if (ev.m.thread !== "main" && thread === "main") refreshThreadCards(); if (ev.m.thread === thread) { appendMsg(ev.m); if (ev.m.files?.length) renderThreadFiles(); } renderSide();
      // appendMsg refreshed the native parent choices/card along with its reply.
      if (ev.m.reply_to && ev.m.thread !== thread) renderChat("stay");
      notifyMsg(ev.m);
      return;
    case "delta":
      renderChat(chatViewport.pinned() ? undefined : "stay");
      return;
    case "typing":
      renderChat("stay");
      return;
    case "epicsPatch":
    case "epics":
      if (thread !== "main" && !isPre() && !S.epics.some((e) => e.id === thread)) thread = "main"; renderSide(); renderTasks(); renderKanban(); renderChat("stay"); return;
    case "docNotes": renderDoc(); return;
    case "doc": {
      // A big epic doc comes as "stale": the tab showing it fetches it, the others drop their copy. Only the doc on
      // screen is redrawn (each task tick in another epic used to re-render the open doc).
      const shown = (ev.epic || null) === docEpic();
      if (ev.stale) {
        nativeDocumentOwner?.invalidate(ev.epic);
        if(shown)renderDoc();
        return;
      }
      if (shown || ev.fetched) renderDoc();
      return;
    }
    case "meta":
      renderSide();
      renderTasks();
      return;
    case "suggestions": {
      const previous=isPre()?previousState?.suggestions[Number(thread.slice(4))]:null;
      const identity=previous&&UI.suggestionIdentity(previous);
      if(isPre()&&previous){
        const index=S.suggestions.findIndex(value=>UI.suggestionIdentity(value)===identity);
        if(index>=0)thread=`pre:${index}`;
        else if(suggestionIntent?.identity===identity&&!suggestionIntent.accept&&S.suggestions.length)thread=`pre:${Math.min(suggestionIntent.index,S.suggestions.length-1)}`;
        else thread="main";
      }
      renderSide();renderChat("stay");return;
    }
    case "requests": renderSide(); return;
    case "members": renderSide(); renderComposer(); return;
    case "files": renderSide(); renderFiles(); connsFilesChanged(); syncViewer(); renderChat("stay"); return;
    case "fileAdd": renderSide(); renderFiles(); connsFilesChanged(); syncViewer(); renderThreadFiles(); renderChat("stay"); return;
    case "reminders": renderReminders(); return;
    case "decisions": renderDecisions(); return;
    case "conns": if(nativeApps)nativeApps.owner.load();renderApps();return;
    case "pins": renderSide(); renderFiles(); renderApps(); return;
    case "error": toast(esc(ev.error || t("falhou"))); return;
    case "receipts": renderChat("stay"); return;
    case "older": {
      chatViewport.sync(S,thread,documentEpoch,liveState);
      chatViewport.older(ev);
      return;
    }
    case "acks": renderChat("stay"); renderSide(); return;
    case "ackRows": { // just the rows that changed: replace by message + agent
      renderChat("stay"); renderSide(); return;
    }
    case "poll":
      renderChat("stay");
      return;
    case "online":
      renderSide();
      return;
    case "blocked": {
      // Uncorrelated legacy frames are informational; only cid results own native operation state.
      toast(t("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.",{reason:esc(ev.reason)}));
      return;
    }
  }
}

const modeLabel = {
  route: t("escolhendo o modelo"),
  fast: t("rápido"),
  smart: t("com calma"),
};

// Native document-owned PWA/notifications; route mounts never duplicate listeners.
const nativePwa=UI.createPwaService();
const logoutWithPwa=UI.createAccountLogout({identity:()=>UI.personalLogoutIdentity(nativePersonal),beforeLogout:()=>nativePwa.beforeLogout(),warning:()=>alert(UI.pwaLogoutWarning(LANG)),post:all=>fetch(all?"/auth/logout-all":"/auth/logout",{method:"POST"}),success:all=>{location.href=all?uiNavigationUrl("/login",location.href,"svelte"):"/";},failure:()=>alert(UI.pwaLogoutFailure(LANG)),reload:()=>location.reload()});
let nativePwaMounts=[];
function disposePwaMounts(){for(const dispose of nativePwaMounts)dispose();nativePwaMounts=[];}
function renderBells(){
  disposePwaMounts();
  document.querySelectorAll('[data-native-pwa-bell]').forEach(target=>nativePwaMounts.push(UI.mountPwa(target,'bell',nativePwa,LANG)));
  document.querySelectorAll('[data-native-install-slot]').forEach(target=>nativePwaMounts.push(UI.mountPwa(target,'install',nativePwa,LANG)));
}
function notifyMsg(message){if(S)nativePwa.notify(message,S,thread,mentionTarget,m=>m.author==='ai'?'@vibe':m.kind==='agent'?t('{via} de {who}',{via:m.via||'agent',who:name(m.author)}):name(m.author));}
if(import.meta.hot)import.meta.hot.dispose(()=>{disposePwaMounts();nativePwa.dispose();composerDrafts.dispose();nativeAgents.dispose();document.removeEventListener("visibilitychange",agentsVisibility);});

function renderBook() {
  clearViews();
  document.title = `${S.book?.title ?? "vibebook"} · vibebook`;
  $app.innerHTML = `
  <div class="book ${railMode ? "rail" : ""}">
    <aside class="side tw:[@media(max-width:900px)]:max-h-[calc(var(--vvh,100dvh)_-_max(96px,var(--vvh,100dvh)*.2))]!" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${t("Seus vibebooks")}" title="${t("Seus vibebooks")}">${icon("back", 20)}</a><div id="threadTitle" class="tw:min-w-0 tw:flex-1"></div><button class="ghost" id="toggleBoard" title="${t("Quadro de tarefas (kanban)")}" aria-pressed="false">${icon("board")}<span class="lbl">${t("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${t("Caixa de entrada: o que espera por você")}" aria-label="${t("Caixa de entrada")}">${icon("inbox")}<b class="kN" hidden></b></button><span data-native-pwa-bell></span><div id="myClaude" class="tw:min-w-0"></div><button class="ghost" id="toggleDoc" title="${t("mostrar/ocultar documento")}">${icon("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek"><div id="nativeDocumentPeek"></div></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div id="agentBanners" class="tw:px-4"></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <div id="composer"></div>
    </main>
    <section class="doc tw:[@media(max-width:900px)]:has-[form:focus-within]:h-room-sheet-expanded! tw:[@media(max-width:900px)]:has-[form:focus-within]:rounded-none!">
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${t("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${t("Redimensionar documento")}" tabindex="0"></div>
      <div id="nativeDocumentToolbar"></div>
      <div id="nativeDocument" class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col" data-native-document-slot></div>
      <div class="filesPane" id="filesPane"></div>
      <div class="decPane" id="decPane"></div>
      <div class="appsPane tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:overflow-auto" id="appsPane"></div>
      <div class="remPane" id="remPane"></div>
      <div class="agentsPane" id="agentsPane"></div>
    </section>
    <div class="sheetDim" id="sheetDim"></div>
  </div>
`;
  const book = $app.querySelector(".book");
  // The doc sheet hangs right under the room header, whose height varies (safe area, wrapped title).
  const headObs = new ResizeObserver(() => {
    const h = book.querySelector(".chathead").getBoundingClientRect().height,
      p =
        document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
    document.documentElement.style.setProperty("--headH", `${Math.round(h)}px`);
    document.documentElement.style.setProperty("--peekH", `${Math.round(p)}px`);
  });
  headObs.observe(book.querySelector(".chathead"));
  headObs.observe(document.getElementById("docPeek"));
  // Phones: the toolbar under the header is the doc sheet's own tab bar. A tab opens the sheet on it; the open tab
  // again closes it. Dragging the bar down opens the doc too.
  sheetDrag(document.getElementById("docPeek"), "doc", true, () => {});
  document.getElementById("docPeek").onclick=null;
  sheetDrag(document.getElementById("docGrab"), "doc", false);
  document.getElementById("sheetDim").onclick = () => closeSheet();
  document.getElementById("toggleDoc").onclick = () =>
    book.classList.toggle("nodoc");
  const setBoard = (on) => {
    if (!document.body.contains(book)) return;
    if (on)
      moveBoardContainer(
        book,
        book.querySelector(":scope > .chat"),
        book.querySelector(":scope > .chat > #composer"),
      );
    book.classList.toggle("boardview", on);
    renderComposer();
    book.classList.toggle("nodoc", on); // the board wants the width
    document
      .getElementById("toggleBoard")
      .setAttribute("aria-pressed", String(on));
    if (on) {
      closeSheet();
      renderKanban();
    }
  };
  document.getElementById("toggleBoard").onclick = () =>
    setBoard(!book.classList.contains("boardview"));
  // Entering a room always opens chat + doc; the board is one click away.
  // Resizable doc panel; width remembered per browser.
  const setDocW = (w) => {
    w = Math.round(Math.min(Math.max(w, 260), window.innerWidth - 260 - 320));
    book.style.setProperty("--doc-w", `${w}px`);
    try {
      localStorage.setItem("vb.docW", w);
    } catch {}
  };
  try {
    const saved = Number(localStorage.getItem("vb.docW"));
    if (saved) setDocW(saved);
  } catch {}
  const resizer = document.getElementById("resizer");
  resizer.onpointerdown = (e) => {
    e.preventDefault();
    resizer.setPointerCapture(e.pointerId);
    resizer.classList.add("drag");
    document.body.classList.add("resizing");
    resizer.onpointermove = (ev) => setDocW(window.innerWidth - ev.clientX);
    resizer.onpointerup = () => {
      resizer.onpointermove = null;
      resizer.classList.remove("drag");
      document.body.classList.remove("resizing");
    };
  };
  resizer.ondblclick = () => setDocW(380);
  resizer.onkeydown = (e) => {
    const cur = document.querySelector(".doc").getBoundingClientRect().width;
    if (e.key === "ArrowLeft") setDocW(cur + 24);
    else if (e.key === "ArrowRight") setDocW(cur - 24);
  };
  // Right panel: Documento / Arquivos
  const setPane = (pane) => {
    const doc = book.querySelector(":scope > .doc");
    if (!doc) return;
    doc.dataset.pane = pane;
    renderDoc();
    book.dataset.pane = pane; // the phone's toolbar marks the open tab
    // The room's state brings the newest 12 files; the whole list comes when Arquivos opens.
    if (pane === "files") renderFiles(true);
    if (pane === "decisions") renderDecisions();
    if (pane === "apps") renderApps();
    if (pane === "reminders") renderReminders();
    renderAgentSurfaces();
    if (pane === "board") {
      moveBoardContainer(book, doc);
      renderKanban();
    }
  };
  boardLayoutCleanup = watchBoardLayout(book, ROOM_PHONE, () => {
    setBoard(false);
    setPane("board");
  });

  // The header's ✻ (desktop) shows the doc panel on Agents, where the switch for your Claude lives.
  // One pair of document listeners for the room on screen (replaced, not piled up, as rooms open).
  document.removeEventListener("vb:pane", roomDocPane);
  roomDocPane = (e) => {
    if (!document.body.contains(book)) return;
    book.classList.remove("nodoc");
    setPane(e.detail);
  };
  document.addEventListener("vb:pane", roomDocPane);
  setPane("doc");
  nativeDocumentSetPane=setPane;
  renderSide();
  renderChat();
  renderDoc(true);
  renderFiles();
  renderApps();
  renderReminders();
  renderDecisions();
  renderAgentSurfaces();
  renderBells();
  // A shared link to one message (/b/<room>#m123) lands on it.
  const landingGeneration = nativeRouter.generation(),
    landingRoom = S.id,
    landingHash = location.hash;
  const ownsLanding = () =>
    landingGeneration === nativeRouter.generation() &&
    S?.id === landingRoom &&
    book.isConnected;
  if (/^#m\d+$/.test(landingHash)) {
    const mid = messageIdentity(landingHash.slice(2));
    if (mid)
      setTimeout(() => {
        if (ownsLanding()) goToMsg(mid);
      }, 300);
  }
  // …and a link to one file (#f<id>, the viewer's own address) opens it.
  else if (/^#f[0-9a-f]+$/.test(landingHash)) {
    const fid = landingHash.slice(2);
    setTimeout(() => {
      if (ownsLanding()) openFile(fid);
    }, 300);
  }
}
// Unknown deep-link versions load metadata through the bounded native index owner.
function openFile(fid, again, ownership={room:S?.id,generation:nativeRouter?.generation()}) {
 if(S?.id!==ownership.room||nativeRouter?.generation()!==ownership.generation)return;
 openNativeFile(fid);
}

const SIDEBAR_ICON = icon("sidebar", 20);
const bookTitle = () => S?.book?.title || "vibebook";
const COVERS = [
  "oklch(0.5 0.17 248)",
  "oklch(0.58 0.17 35)",
  "oklch(0.52 0.11 175)",
  "oklch(0.47 0.15 315)",
  "oklch(0.6 0.13 75)",
  "oklch(0.45 0.1 145)",
  "oklch(0.36 0.06 255)",
  "oklch(0.55 0.16 10)",
];
const coverColor = (t) =>
  COVERS[
    [...String(t)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) %
      COVERS.length
  ];
const STOP = new Set([
  "e",
  "de",
  "do",
  "da",
  "dos",
  "das",
  "o",
  "a",
  "os",
  "as",
  "em",
  "no",
  "na",
  "para",
  "pra",
  "com",
  "por",
  "the",
  "and",
  "of",
]);
const initials = (t) => {
  const words = t
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const main = words.filter((w) => !STOP.has(w.toLowerCase()));
  return (
    (main.length ? main : words)
      .slice(0, 2)
      .map((w) => w[0])
      .join("") || "◆"
  ).toUpperCase();
};
// Tab icon = the room's card: its cover color with its initials (canvas, so oklch and Caprasimo just work).
async function setFavicon(title) {
  const link = document.querySelector('link[rel="icon"]');
  if (!title) {
    link.type = "image/svg+xml";
    link.href = "/favicon.svg";
    return;
  }
  const own = iconUrl(myBooks?.find((b) => b.id === S?.id));
  // The room's own icon goes in rounded like the generated one: a square image (or one with a white backdrop)
  // otherwise shows white corners on a dark tab bar.
  if (own) {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      g.beginPath();
      g.roundRect(0, 0, 64, 64, 16);
      g.clip();
      g.drawImage(img, -1, -1, 66, 66); // 1px bleed: no light fringe from the image's own edge
      link.type = "image/png";
      link.href = c.toDataURL("image/png");
    };
    img.onerror = () => {
      link.type = "image/png";
      link.href = own;
    };
    img.src = own;
    return;
  }
  await document.fonts?.load?.("400 40px Caprasimo").catch(() => {});
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = coverColor(title);
  g.beginPath();
  g.roundRect(0, 0, 64, 64, 14);
  g.fill();
  const shine = g.createRadialGradient(56, 8, 0, 56, 8, 44);
  shine.addColorStop(0, "rgba(255,255,255,.28)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = shine;
  g.fill();
  const txt = initials(title);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `400 ${txt.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`;
  g.fillText(txt, 32, 35);
  link.type = "image/png";
  link.href = c.toDataURL("image/png");
}

let railMode = false;
// The collapsed sidebar is gone (the app's rail of rooms is always on screen): old saved state is ignored.

function toggleRail() {
  railMode = !railMode;
  try {
    localStorage.setItem("vb.rail", railMode ? "1" : "0");
  } catch {}
  $app.querySelector(".book")?.classList.toggle("rail", railMode);
  renderSide();
}

// A pre-epic: one of @vibe's suggestions, opened in the main panel like an epic, to create or discard.
const isPre = () => thread.startsWith("pre:");
const preOf = () => (isPre() ? S.suggestions[Number(thread.slice(4))] : null);
function renderPre(el) {
 const suggestion=preOf();if(!suggestion){thread="main";return renderChat();}
 renderView("suggestionPreview",el,{room:S,index:Number(thread.slice(4)),owner:syncRoomMutations(),vb:chatBridge()});
}

// Native Agents owns account/room lifetimes, authorized metadata, mutations, runner probes and terminal resources.
let roomAgents={id:null,list:[],sandboxes:[]},nativeAgentOwner=null,roomDocPane=()=>{};
const nativeAgents=UI.createAgentsService({origin:location.origin,storage:{getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value)},onData:(roomId,data)=>{
 if(S?.id!==roomId||currentRoomId()!==roomId)return;
 roomAgents={id:roomId,list:data?.agents||[],sandboxes:data?.sandboxes||[],claudeOn:data?.claude_on||false};
 renderSide();renderComposer();renderDocumentChrome();
},onUnauthorized:()=>{nativePersonal?.invalidate();void nativePersonal?.refresh();},onChanged:()=>{if(S)renderDocumentChrome();}});
function syncNativeAgents(){
 if(!S||S.id!==currentRoomId())return null;
 const roomId=S.id,account=S.me,connection=roomConnection;
 const current=()=>S?.id===roomId&&S.me===account&&roomConnection===connection&&currentRoomId()===roomId;
 nativeAgentOwner=nativeAgents.sync(S,thread,myWaits,$app.querySelector('.book > .doc')?.dataset.pane==='agents',!document.hidden,command=>current()?request(command):Promise.resolve({ok:false,error:'offline'}));
 return nativeAgentOwner;
}
function loadRoomAgents(){const owner=syncNativeAgents();return owner?owner.refresh(true):Promise.resolve();}
const agentsVisibility=()=>{if(S)syncNativeAgents();};
document.addEventListener("visibilitychange",agentsVisibility);
function renderAgentSurfaces(){
 const owner=syncNativeAgents();if(!owner)return;
 const roomId=S.id,account=S.me,current=()=>nativeAgentOwner===owner&&owner.current()&&S?.id===roomId&&S.me===account&&currentRoomId()===roomId;
 const onopen=()=>{if(current()){nativeDocumentSetPane?.('agents');if(ROOM_PHONE.matches)openSheet('doc');}};
 const onnavigate=(id,target)=>{if(current())goToMsg(id,target);};
 const trigger=document.getElementById('myClaude'),banners=document.getElementById('agentBanners'),pane=document.getElementById('agentsPane');
 if(trigger)renderView('agentTrigger',trigger,{owner,onopen,lang:LANG});
 if(banners)renderView('agentBanners',banners,{owner,origin:location.origin,name,onopen,onnavigate,lang:LANG});
 if(pane&&$app.querySelector('.book > .doc')?.dataset.pane==='agents')renderView('agents',pane,{owner,origin:location.origin,vb:{t,ago},name,onnavigate,lang:LANG});else disposeView('agents');
}
const epicBusy=epic=>{const worker=S?UI.threadWorkers(S,epic.id,Date.now())[0]:null;return worker?t("{via} de {who}",{via:worker.who,who:name(worker.email)}):null;};
const myQueue=()=>S?UI.agentQueue(S,Date.now()).map(item=>({m:item.message,st:item.phase})):[];

// "Esperando você" inside the room: which threads (and messages) someone is waiting on you in, so the rail's yellow
// count leads somewhere. From /api/me waits (refreshed every 30s).
const waitsIn = (t) =>
  myWaits.filter(
    (w) => w.book_id === S?.id && (t === undefined || w.thread === t),
  );
function openSidebarAgents(roomId, account) {
 if(S?.id!==roomId||S.me!==account||currentRoomId()!==roomId)return;
 nativeDocumentSetPane?.("agents");
 if(ROOM_PHONE.matches)openSheet("doc");
}
function renderSide() {
 syncInbox();const el=document.getElementById("side");if(!el||!S)return;
 renderAgentSurfaces();sideNavigation=syncNavigationSession(sideNavigation,S,thread,archOpen);sidePins=syncPinsSession(sidePins,S);if(liveState)requestPinnedFiles(sidePins,S,send);
 const roomId=S.id,account=S.me,pinsSession=sidePins,owner=syncRoomMutations();
 const current=()=>S?.id===roomId&&S.me===account&&currentRoomId()===roomId;
 const open=(id)=>{if(!current())return;if(deferViewerIntent(()=>open(id)))return;closeSheet(true);thread=id;documentScopeReset=true;boardEpic=thread==="main"||isPre()?null:thread;renderSide();renderChat();renderKanban();renderDoc();};
 renderView("sidebar",el,{room:S,thread,collapsed:railMode&&innerWidth>900,roomIcon:iconUrl(myBooks?.find(book=>book.id===roomId)),roomTint:myBooks?.find(book=>book.id===roomId)?.tint,locale:LOCALE,mutations:owner,presence:roomAgents.id===roomId?{agents:roomAgents.list,sandboxes:roomAgents.sandboxes||[]}:{agents:[],sandboxes:[]},navigation:sideNavigation,pins:pinsSession,request:(command,timeout)=>current()&&sidePins===pinsSession?request(command,timeout):Promise.resolve({ok:false,error:"offline"}),send:(command)=>current()?send(command):false,onopen:open,onarchchange:(value)=>{if(current())archOpen=value;},onopenpinfile:(file)=>{if(current()&&sidePins===pinsSession)openNativeFile(file);},onopenpinapp:(app)=>{if(current())cardGo(`#app:${app.connectionId}/${app.tool}`);},ontogglerail:()=>{if(current())toggleRail();},onrenameroom:()=>{if(current()){ensureNativeHome();nativeAppNav.askRename(roomId);}},onopenside:()=>{if(current())closeSheet();},onagents:()=>openSidebarAgents(roomId,account),mountSheetHandle:(node)=>{sheetDrag(node,"side",false);return ()=>{node.onclick=node.onpointerdown=node.onpointermove=node.onpointerup=node.onpointercancel=null;};},foldOpen,friends,appNavigation:{controller:nativeAppNav,lang:LANG},vb:roomSidebarBridge()});
 document.title=`${S.book?.title??"vibebook"} · vibebook`;setFavicon(bookTitle());
}

// Profile picture: pick, crop to a centered square, resize to 256px JPEG in the browser, upload.

function toast(html, ms = 7000) {
  document.querySelector(".toast")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="toast" role="status">${html}</div>`,
  );
  const t = document.querySelector(".toast");
  setTimeout(() => t.remove(), ms);
}

// "Arquivados" is a view that replaces the epic list; it stays the way you left it across redraws.
let archOpen = false;
// People's folds ("N offline", friends) keep their state across redraws; friends start open in a room with only you.
const foldOpen = { off: false, friends: null };
// Phones: the last rooms you opened (besides this one) as tiles, then "all", always at the top of the thread sheet.
let boardEpic = null;
// The phone's full-screen board closes when you open an epic from it; the desktop's lives in the doc panel and stays.
const leaveBoard = () => {
  if ($app.querySelector(".book.boardview"))
    document.getElementById("toggleBoard").click();
};
function renderKanban() {
  const book = $app.querySelector(".book");
  const el = book && getBoardContainer(book);
  if (!el || (!book.classList.contains("boardview") && book.querySelector(":scope > .doc")?.dataset.pane !== "board")) return;
  renderView("board", el, { room:S, thread, vb:panelBridge(), send, request, onopen:selectThread });
}

function renameThread() {
  if (thread === "main" && S) {
    ensureNativeHome();
    nativeAppNav.askRename(S.id);
    return;
  }
  const epic = S.epics.find((e) => e.id === thread);
  const cur = epic ? epic.title : bookTitle();
  const nt = prompt(epic ? t("Nome do épico:") : t("Nome do vibebook:"), cur);
  if (!nt?.trim() || nt === cur) return;
  send(
    epic
      ? { t: "epic.rename", id: epic.id, title: nt }
      : { t: "title", title: nt },
  );
}
// Phones: the slim bar above the composer that pulls the doc sheet up: "Doc · <title> · d/n tarefas".
function renderPeek(){renderDocumentChrome();}
// Phones (≤900px): the sidebar ("side": threads, people) and the doc are sheets that drop from the top over the chat. Opening one
// pushes a history entry so Back closes it (like the file viewer); picking a thread reuses that entry for its URL.
const ROOM_PHONE = matchMedia("(max-width: 900px)");
let sheetSkip = false;
function openSheet(which) {
  if(deferViewerIntent(()=>openSheet(which)))return;
  const bk = $app.querySelector(".book");
  if (!bk || !ROOM_PHONE.matches || bk.dataset.sheet === which) return;
  if (!bk.dataset.sheet) navigation.pushState({ sheet: 1 }, "", location.href);
  bk.dataset.sheet = which;
}
function closeSheet(pick) {
  if(deferViewerIntent(()=>closeSheet(pick)))return;
  const bk = $app.querySelector(".book");
  if (!bk?.dataset.sheet) return;
  nativeDocumentOwner?.mode("preview"); // closing the doc ends editing
  delete bk.dataset.sheet;
  if (!history.state?.sheet) return;
  if (pick)
    urlSynced = false; // the next syncUrl replaces the sheet's entry with the picked thread's URL
  else {
    sheetSkip = true;
    history.back();
  }
}
// Leave legacy room overlays without triggering asynchronous history.back after a native navigation.
function closeRoomOverlaysForNavigation() {
  nativeViewer?.closeNavigation();
  const book = $app.querySelector(".book");
  if (history.state?.sheet)
    navigation.replaceState(null, "", location.href);
  if (book?.dataset.sheet) {
    nativeDocumentOwner?.mode("preview");
    delete book.dataset.sheet;
  }
}
function sheetPop() {
  if (sheetSkip) {
    sheetSkip = false;
    return true;
  }
  const bk = $app.querySelector(".book");
  if (!bk?.dataset.sheet) return false;
  nativeDocumentOwner?.mode("preview");
  delete bk.dataset.sheet;
  return true;
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !e.defaultPrevented && $app.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open], [data-dialog-content], [data-alert-dialog-content]")) closeSheet(); });
// Drag a sheet by its handle (or the peek bar): it follows the finger, and lets go open or closed past a quarter.
// A tap (no drag) is a plain click: opens from the peek bar, closes from the handle.
function sheetDrag(handle, which, opening, onTap) {
  if (!handle) return;
  let dragged = false;
  handle.onclick = (e) => {
    if (dragged) {
      dragged = false;
      return;
    }
    onTap ? onTap(e) : opening ? openSheet(which) : closeSheet();
  };
  handle.onpointerdown = (e) => {
    const bk = $app.querySelector(".book"),
      el = bk?.querySelector(which === "doc" ? ".doc" : ".side"),
      dim = document.getElementById("sheetDim");
    if (!el || !ROOM_PHONE.matches) return;
    const y0 = e.clientY,
      H = el.offsetHeight;
    let dy = 0,
      moving = false;
    const up = -1; // both sheets hang from the top: dragging up closes, down opens
    dragged = false;
    handle.onpointermove = (ev) => {
      dy = (ev.clientY - y0) * up;
      if (!moving && Math.abs(dy) < 6) return;
      // Capturing a toolbar tap would retarget its child-button click to the handle.
      if (!moving) handle.setPointerCapture(e.pointerId);
      moving = true; el.classList.add("sheetDrag"); dim.style.transition = "none";
      const y = Math.min(H, Math.max(0, opening ? H + dy : dy));
      el.style.transform = `translateY(${y * up}px)`;
      dim.style.opacity = String(1 - y / H);
    };
    handle.onpointerup = handle.onpointercancel = () => {
      handle.onpointermove = handle.onpointerup = handle.onpointercancel = null;
      if (!moving) return;
      dragged = true;
      setTimeout(() => (dragged = false), 400); // swallow the click that follows the drag
      el.classList.remove("sheetDrag");
      el.style.transform = "";
      dim.style.transition = "";
      dim.style.opacity = "";
      if (opening ? -dy > H / 4 : dy <= H / 4) openSheet(which);
      else closeSheet();
    };
  };
}
function renderTasks() {
  const el = document.getElementById("tasks");
  if (!el) return;
  renderDoc();
  const epic = S.epics.find((e) => e.id === thread);
  const head=document.getElementById("threadTitle"),roomId=S.id,account=S.me;
  renderView("threadHeader",head,{room:S,thread,titleId:"roomName",owner:syncRoomMutations(),vb:roomSidebarBridge(),roomIcon:iconUrl(myBooks?.find(book=>book.id===roomId)),onopenside:()=>{if(S?.id===roomId&&S.me===account)openSheet("side");},onrenameroom:()=>{if(S?.id===roomId&&S.me===account){ensureNativeHome();nativeAppNav.askRename(roomId);}}});
  // Who is the room waiting on: open tasks with an owner, across every epic.
  const waiting = {};
  for (const t of [...S.epics.flatMap((e) => e.tasks), ...(S.roomTasks || [])])
    if (!t.done && t.owner) waiting[t.owner] = (waiting[t.owner] || 0) + 1;
  const w = Object.entries(waiting).sort((a, b) => b[1] - a[1]);
  // Each person in the chip opens the list of what's waiting on them; a task opens its epic.
  // Phones: the chip would take a second line; a small ⏳ n in the top bar instead (you if anything waits on you, else
  // whoever has the most), same list on tap.
  const bar = head.closest(".chathead");
  // The board button (the room's tasks) carries how many open tasks are yours; on phones it replaced the ⏳.
  const mineN = waiting[S.me] || 0,
    kb = document.getElementById("toggleBoard");
  kb.querySelector(".kN")?.remove();
  if (mineN)
    kb.insertAdjacentHTML(
      "beforeend",
      `<b class="kN" title="${t("Esperando você")}: ${mineN}">${mineN}</b>`,
    );
  kb.title = mineN
    ? `${t("Quadro de tarefas")} · ${t("Esperando você")}: ${mineN}`
    : t("Quadro de tarefas (kanban)");
  // Phone ←: inside an epic (or a suggestion) it goes back to the room's main thread; in the main thread, home.
  const back = $app.querySelector(".phHome");
  if (back) {
    const inThread = thread !== "main";
    back.title = back.ariaLabel = inThread
      ? t("Voltar pra sala principal")
      : t("Seus vibebooks");
    back.onclick = (e) => {
      if (thread === "main") return;
      e.preventDefault();
      e.stopPropagation();
      selectThread("main");
    };
  }
  renderPeek();
  // In the main thread, the room's own tasks (the room doc's "## Tarefas") get the same card.
  const list =
    epic ||
    (thread === "main" && S.roomTasks?.length
      ? { id: "main", tasks: S.roomTasks }
      : null);
  el.style.display = list ? "" : "none";
  if (!list) return;
  disposeView("tasks");
}

// Native file presentation owns preview resources, version identity and history.
let nativeViewer = null, nativeViewerMount = null, nativeViewerTarget = null;
const IOS_PWA = (matchMedia("(display-mode: standalone)").matches || navigator.standalone === true) && (/iP(hone|ad|od)/.test(navigator.userAgent) || (/Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1));
function deferViewerIntent(callback) {
 const id=S?.id,account=S?.me;
 return nativeViewer?.deferNavigation(()=>{if(S?.id===id&&S?.me===account&&currentRoomId()===id)callback();})??false;
}
function syncViewer(fresh=false) {
  if (!nativeViewer || !S || !roomConnection || currentRoomId() !== S.id) return;
  const roomId=S.id, account=S.me, connection=roomConnection;
  nativeViewer.sync(S,(command)=>S?.id===roomId&&S.me===account&&roomConnection===connection&&currentRoomId()===roomId?connection.request(command):Promise.resolve({ok:false,error:"disconnected"}),fresh);
}
function ensureViewer() {
  if(!nativeViewer){
    nativeViewer=UI.createFileViewer({href:()=>location.href,state:()=>history.state,history});
    nativeViewerTarget=document.createElement("div");
    document.body.append(nativeViewerTarget);
    nativeViewerMount=UI.mountView("fileViewer",nativeViewerTarget,{controller:nativeViewer,lang:LANG,iosStandalone:IOS_PWA,actions:{navigate:(id,target)=>goToMsg(id,target),openFile:(file)=>openNativeFile(file),navigateRich:(target)=>cardGo(target.kind==="thread"?`#e${target.id}`:target.id?`#doc:${target.id}`:"#doc"),openFileReference:(file)=>{if(S?.id===file.roomId)openNativeFile(file.id,undefined,file.name);}}});
  }
  syncViewer();return nativeViewer;
}
function openNativeFile(file,trigger,label) {
  if(!S||!roomConnection||currentRoomId()!==S.id||!$app.querySelector(".book"))return false;
  return ensureViewer().open(typeof file==="string"?{roomId:S.id,id:file,label}:{roomId:S.id,id:file.id,metadata:file},trigger);
}
// Retained legacy document/settings links enter the same typed target parser; native chat handles its own links.
function fileLinkClick(event){
 if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
 const link=event.target.closest?.("a[href]");if(!link?.isConnected||!S)return;
 const target=UI.fileTargetFromURL(link.getAttribute("href"),location.origin);if(!target||target.roomId!==S.id)return;
 if(openNativeFile(target.id,link,link.textContent?.trim()))event.preventDefault();
}
document.addEventListener("click",fileLinkClick);
const hhmm = (ts) => new Date(ts).toLocaleTimeString(LOCALE, { hour: "2-digit", minute: "2-digit" });
// Same author (and kind), within 5 minutes, no poll in between: drop the name and avatar, keep the time on hover.
// A request that became an epic shows it as a thread under the message (Slack/Discord style); click to open it.
function refreshThreadCards() {
  // Cards are inside Svelte-owned message content. Update its props instead of
  // inserting untracked siblings or removing its HTML anchors.
  renderChat("stay");
}
document.addEventListener("click", (ev) => {
  const back = ev.target.closest("[data-gomain]");
  if (back) {
    return goToMsg(Number(back.dataset.gomain),"main");
  }
});
// The "finished" line at the bottom of an archived epic: always last, gone as soon as the epic reopens.
// Replies: ↩ (hover) or a swipe right (touch) quotes a message above the composer; the sent message carries
// reply_to and shows that quote, which scrolls to the original and flashes it.
function composerEntry(){return S?composerDrafts.entry({account:S.me,roomId:S.id,thread}):null;}
function startReply(id){const message=allMsgs().find(message=>message.id===id);if(!message||privateAskForOther(S,message)||permissionReply(S,message))return;if(message.thread!==thread)selectThread(message.thread);composerEntry()?.reply(message);}
document.addEventListener("click", (ev) => {
  const ml = ev.target.closest("a.mlink[data-msg], a[data-chat-rich~=mlink][data-msg]");
  if (ml) { ev.preventDefault(); return goToMsg(Number(ml.dataset.msg)); }
});
// A message referenced by a reply quote or a [link](#m123): switch to its thread if needed, then scroll to it and flash.
// Goes to a message: switches to its thread (th when the message isn't loaded yet: the inbox, a #m link), widens the
// window when it's loaded but not drawn, else pages back through the thread (≤15 × 100) until it shows up.
function goToMsg(id, th) {
  if(deferViewerIntent(()=>goToMsg(id,th))||!S)return;
  chatViewport.sync(S,thread,activeDocumentConnectionGeneration,liveState);
  chatViewport.go(id,th);
}
// Choices: an agent asks its human to pick (post with choices). That person sees radio/checkboxes + Enviar; the
// pick is sent as their message replying to the question, which is also how the block knows it was answered.
// Native cards (MCP post card, json-render's spec shape, validated by src/card.ts): every string escaped, no HTML.
// Buttons work like choices: only the person whose Claude asked can press one, and it's posted as their reply.
// A card's LinkButton to a place in the room: a message (#m), an epic's thread (#e), the doc (#doc[:epic]).
function cardGo(to) {
  if(deferViewerIntent(()=>cardGo(to)))return;
  if (to.startsWith("#app:")) {
    const [cid, tool] = to.slice(5).split("/");
    document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" }));
    const apps=ensureNativeApps();if(apps&&tool)apps.owner.open({connection:cid,tool});
    if (ROOM_PHONE.matches) openSheet("doc");
    return;
  }
  if (to.startsWith("#m")) return goToMsg(Number(to.slice(2)));
  const epic = to.startsWith("#e") ? to.slice(2) : to.split(":")[1];
  const target =
    epic && S.epics.some((x) => x.id === epic) ? epic : epic ? null : thread;
  if (!target) return toast(t("Esse épico não existe mais nesta sala."));
  if (target !== thread) {
    thread = target;
    documentScopeReset = true;
    boardEpic = thread === "main" ? null : thread;
    renderSide();
    renderChat();
    renderKanban();
    renderDoc();
  }
  if (to.startsWith("#doc")) {
    document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" }));
    if (ROOM_PHONE.matches) openSheet("doc");
  }
}
document.addEventListener("click", (e) => { const g = e.target.closest("[data-cardgo]"); if (g) { e.preventDefault(); cardGo(g.dataset.cardgo); } });
// A permission ask (Aprovar/Negar from the plugin's hook) is answered in place: the button, then Confirmar (never by
// accident). The answer is still a message of the person's (that's what the server checks: only their own human
// message counts), but it isn't drawn in the chat: the ask shows "✓ Aprovado por X" instead.
// Someone else's Claude asking them (⏸ permission, ❓ question) is between that person and their Claude: the rest of
// the room doesn't see it (it filled shared threads with "Aprovar/Negar" and "ok", Nov 2026).
function renderDecisions() {
  const el = document.getElementById("decPane");
  if (!el) return;
  const list = S.decisions || [];
  renderDocumentChrome();
  const roomId = S.id;
  renderView("decisions", el, {room:S, thread, vb:panelBridge(), send, request:(command) => S?.id === roomId ? request(command) : Promise.resolve({ok:false, error:"disconnected"})});
}

// Native room MCP catalog and frame owners. HTTP/SDK work stays in typed modules.
let nativeApps=null,nativeAppAuthority=null;
function disposeNativeApps(){
  nativeApps?.requests.dispose();nativeApps?.owner.dispose();nativeApps=null;nativeAppAuthority?.owner.dispose();nativeAppAuthority=null;disposeView('apps');
}
function ensureNativeAppAuthority(){
  if(!S||!roomConnection)return null;
  if(nativeAppAuthority&&(nativeAppAuthority.roomId!==S.id||nativeAppAuthority.account!==S.me||nativeAppAuthority.connection!==roomConnection)){nativeAppAuthority.owner.dispose();nativeAppAuthority=null;}
  if(!nativeAppAuthority){const roomId=S.id,account=S.me,connection=roomConnection;nativeAppAuthority={roomId,account,connection,owner:UI.createAppsAuthority(()=>S?.id===roomId&&S.me===account&&S.members.includes(account)&&roomConnection===connection&&currentRoomId()===roomId)};nativeAppAuthority.owner.listen(()=>{if(roomConnection===connection)roomCache.delete(roomId);});}
  return nativeAppAuthority.owner;
}
function ensureNativeApps(){
  if(!S||!roomConnection||!S.members.includes(S.me))return null;
  if(nativeApps&&(nativeApps.roomId!==S.id||nativeApps.account!==S.me||nativeApps.connection!==roomConnection))disposeNativeApps();
  if(!nativeApps){
    const roomId=S.id,account=S.me,connection=roomConnection,authority=ensureNativeAppAuthority();
    const current=()=>authority?.current()&&nativeApps?.roomId===roomId&&nativeApps.account===account&&nativeApps.connection===connection&&S?.id===roomId&&S.me===account&&S.members.includes(account)&&roomConnection===connection&&currentRoomId()===roomId;
    const api=UI.createAppsApi(roomId),metrics=UI.createAppMetrics(),requests=UI.createAppRequests();
    const owner=UI.createAppsSession(api,{current,navigate:url=>{if(current())location.href=url;},changed:()=>{if(current())renderDocumentChrome();},denied:()=>authority?.deny()});
    nativeApps={roomId,account,connection,owner,api,requests,current,metrics};
    authority?.listen(()=>owner.revoke());
    owner.sync({...S,messages:allMsgs()});owner.load();
  }else nativeApps.owner.sync({...S,messages:allMsgs()});
  return nativeApps;
}
function renderApps(){
  if(!S)return;
  if(nativeApps&&!S.members.includes(S.me)){nativeApps.owner.sync(S);return;}
  if(document.querySelector('.doc[data-pane="apps"]'))renderConns();
  else if(nativeApps)nativeApps.owner.sync(S);
}
function connsFilesChanged(){if(nativeApps||document.querySelector('.doc[data-pane="apps"]'))renderApps();}
function renderConns(){
  const el=document.getElementById('appsPane'),owned=ensureNativeApps();if(!el||!owned)return;
  const {owner,api,current,connection,roomId,metrics,requests}=owned;
  if(!S.filesAll)owner.loadFiles(command=>current()?connection.request(command):Promise.resolve({ok:false,error:"disconnected"}));
  renderView('apps',el,{props:{owner,api,room:{...S,messages:allMsgs()},thread,lang:LANG,t,name,ago,current,checkAccess:()=>{if(nativeApps!==owned||S?.id!==roomId||S.me!==owned.account||roomConnection!==connection||currentRoomId()!==roomId)return;connection.dispose();roomCache.delete(roomId);clearViews();S=null;roomStore.replace(null);roomConnection=null;openBook(roomId);},request:command=>current()?connection.request(command):Promise.resolve({ok:false,error:'disconnected'}),openLink:url=>{if(current())window.open(url,'_blank','noopener');},metric:(kind,roomOnly)=>requests.run(signal=>metrics(kind,roomId,roomOnly,signal))}});
  renderDocumentChrome();
}

// Reminders: files reminders/<name>.md. @vibe reads when each runs; at that time it posts the text for whoever saved it,
// and their Claude acts on it. A file that doesn't say when shows its error here until someone fixes it.
function renderReminders() {
  const el = document.getElementById("remPane");
  if (!el || !S) return;
  renderPeek();
  const list=S.reminders || [], bad=list.filter(r=>r.error).length;
  renderDocumentChrome();
  renderView("reminders",el,{room:S,thread,vb:panelBridge(),send,request});
}
function renderFiles(load = false, freshSnapshot = false) {
  const el=document.getElementById("filesPane"); if(!el || !S) return;
  renderPeek();
  const n=S.filesN ?? S.files?.length ?? 0;
  renderDocumentChrome();
  if(nativeFilesSession?.roomId!==S.id){nativeFilesSession?.dispose();nativeFilesSession=createFilesSession(S.id);}
  const session=nativeFilesSession, roomId=S.id, connection=roomConnection;
  session.sync(S, freshSnapshot);
  const current=()=>nativeFilesSession===session&&S?.id===roomId&&roomConnection===connection&&currentRoomId()===roomId;
  const request=(command)=>current()&&connection?connection.request(command):Promise.resolve({ok:false,error:t("sem conexão")});
  if(load || (freshSnapshot && el.parentElement?.dataset.pane === "files"))void session.load(request);
  renderView("files",el,{room:S,thread,vb:panelBridge(),send,session,request,onfolderchange:()=>{if(current())el.scrollTop=0;},onopenfile:(file)=>{if(current())openNativeFile(file);}});
}
// Sliding window: a thread renders its newest WIN messages; scrolling near the top shows WIN more, first from
// what the state already has, then from the room (WS "older", 100 at a time) until the start of the thread.
let chatSurfaceElement=null,chatSurface=null;
const chatViewport=createChatViewport({
 current:()=>!!S&&S.id===currentRoomId()&&rootRoom.read().connection===roomConnection,
 send:command=>send(command),render:keep=>renderChat(keep),
 selectThread:target=>{thread=target;boardEpic=thread==="main"?null:thread;documentScopeReset=true;renderSide();renderChat();renderKanban();renderDoc();},
 notice:kind=>toast(kind==="searching"?t("Buscando a mensagem…"):kind==="missing"?t("Não achei essa mensagem nesta sala."):t("sem conexão"),kind==="searching"?1500:7000),
});
const allMsgs = () =>
  S.origins?.length
    ? [
        ...S.messages,
        ...S.origins.filter((o) => !S.messages.some((m) => m.id === o.id)),
      ]
    : S.messages;
// The open thread lives in the URL (/b/<room>?t=<epic>): refresh, back and shared links land on it.
let urlSynced = false;
function syncUrl() {
  if (!S) return;
  const want = uiNavigationUrl(
    `/b/${S.id}${thread !== "main" && !isPre() ? `?t=${encodeURIComponent(thread)}` : ""}`,
    location.href,
    "svelte",
  );
  if (location.pathname + location.search !== want)
    navigation[urlSynced ? "pushState" : "replaceState"](null, "", want);
  urlSynced = true;
}
// Inside an epic: what it produced (reports, prints, PDFs), newest version of each name, so a report is one tap away
// instead of a scroll through the conversation. Built from the thread's loaded messages.
function renderThreadFiles() {
 const el=document.getElementById("thFiles");if(!el||!S)return;
 const roomId=S.id,account=S.me;
 el.hidden=false;
 renderView("threadFiles",el,{room:S,thread,lang:LANG,onopen:(file,trigger)=>{if(S?.id===roomId&&S.me===account&&trigger.isConnected)openNativeFile(file,trigger);}});
}
function renderComposer(){
 const target=document.getElementById("composer");if(!target||!S)return;if(isPre()){disposeView("composer");return;}
 const roomId=S.id,composerThread=thread;let mounted;
 const current=()=>S?.id===roomId&&thread===composerThread&&target.isConnected&&viewMounts.get("composer")===mounted;
 renderView("composer",target,{room:S,thread,vb:chatBridge(),drafts:composerDrafts,request:(command)=>current()?request(command):Promise.resolve({ok:false,error:"offline"}),upload:(input,signal)=>createRoomApi(roomId,(url,init)=>fetch(url,{...init,signal})).uploadFile(input),agents:roomAgents.id===roomId?(roomAgents.sandboxes||[]):[],navigate:(id)=>{if(current())goToMsg(id,composerThread);},hidden:isPre()||!!target.closest(".book")?.classList.contains("boardview")});
 mounted=viewMounts.get("composer");
}
function renderChat(keep) {
  renderAgentSurfaces();
  renderThreadFiles();
  syncUrl();
  renderComposer();
  renderTasks();
  const el = document.getElementById("msgs");
  const viewportChanged=chatViewport.sync(S,thread,activeDocumentConnectionGeneration,liveState);
  $app.querySelector(".book")?.classList.toggle("pre", isPre());
  if (isPre()) {
    disposeView("chat");
    return renderPre(el);
  }
  disposeView("suggestionPreview");
  // Opening an epic with no conversation yet: show its doc (goal + tasks) instead of an empty panel, if it was closed.
  if (viewportChanged) {
    const bk = $app.querySelector(".book");
    const taskWaits =
      waitsIn(thread).some((w) => w.ref.startsWith("t")) ||
      !!S.epics
        .find((e) => e.id === thread)
        ?.tasks.some((t) => !t.done && t.owner === S.me);
    if (
      thread !== "main" &&
      bk?.classList.contains("nodoc") &&
      !bk.classList.contains("boardview") &&
      (taskWaits || !S.messages.some((m) => m.thread === thread))
    )
      bk.classList.remove("nodoc");
    // Point at what's yours here: what's waiting on you (tasks, messages), else your own open tasks. Bring the first
    // into view and let them shine (a sweep of light over the item itself, nothing clipped).
    const attentionRoom=S.id, attentionThread=thread;
    if (thread !== "main" || waitsIn(thread).length) chatViewport.defer(() => {
      if(S?.id!==attentionRoom||thread!==attentionThread)return;
      let els = [...document.querySelectorAll(".task.waitTask")];
      if (!els.length) els = [...document.querySelectorAll(".task.mine")];
      // Only a task is scrolled to (it lives in the doc panel). A waiting message just shines where it is: jumping the
      // chat up to it on entering looked like the room scrolled to a random old message.
      if (els[0]?.classList.contains("task")) els[0].scrollIntoView({ block: "center", behavior: "smooth" });
      els.forEach((x) => { x.classList.remove("shimmer"); void x.offsetWidth; x.classList.add("shimmer"); });
    }, 400);
  }
  const all = visibleChatMessages(S,thread);
  chatViewport.ensureFilled();
  const {list,previous,more}=chatViewport.selection();
  if(chatSurfaceElement!==el){chatSurfaceElement=el;chatSurface=createChatSurface(el);}
  chatViewport.attach(chatSurface);
  const before=chatViewport.capture();
  const src=S.epics.find(e=>e.id===thread)?.from_msg;
  const origin=src && (S.messages.find(m=>m.id===src)||S.origins?.find(m=>m.id===src));
  const replyCount=S.counts ? (S.counts[thread]??0)+all.filter(m=>m.id>(S.countsAt??0)).length : all.length;
  const roomId=S.id, chatThread=thread;
  let chatMount;
  const current=()=>S?.id===roomId&&thread===chatThread&&el.isConnected&&viewMounts.get("chat")===chatMount;
  renderView("chat",el,{room:S,thread,list,previous,more,origin:origin||null,replyCount,vb:chatBridge(),actions:{ensureFileIndex:()=>{if(current())ensureFileChipIndex();},request:(command)=>current()?request(command):Promise.resolve({ok:false,error:"disconnected"}),draftReply:(draft)=>{if(!current())return;const q=allMsgs().find(m=>m.id===draft.messageId);if(!q||q.thread!==draft.thread||!canAnswer(S,q)||!choicesOf(q.choices)||choicesOf(q.choices).closed||isPermAsk(q))return;if(q.thread!==thread)selectThread(q.thread);if(S?.id!==roomId)return;composerEntry()?.reply(q,draft.text);},openApp:(target)=>{if(current()&&/^(room|[a-f0-9]{12})$/.test(target.connection)&&/^[\w.-]{1,100}$/.test(target.tool))cardGo(`#app:${target.connection}/${target.tool}`);},navigateRich:(target)=>{if(current())cardGo(target.kind==="thread"?`#e${target.id}`:target.id?`#doc:${target.id}`:"#doc");},openFileReference:(file)=>{if(current()&&file.roomId===roomId&&/^[0-9a-f]+$/.test(file.id))openNativeFile(file.id,undefined,file.name);},mountEmbed:(frame,file,controls)=>UI.mountNativeChatApp({frame,file,controls,authority:ensureNativeAppAuthority(),room:()=>current()?{...S,messages:allMsgs()}:null,current,request:command=>current()?request(command):Promise.resolve({ok:false,error:"disconnected"}),name,t,locale:LOCALE,open:url=>{if(current())window.open(url,"_blank","noopener");}}),reply:(id)=>{if(current())startReply(id);},navigate:(id,target)=>{if(current())goToMsg(id,target);},openFile:(file)=>{const canonical=[...(S?.files||[]),...(S?allMsgs().flatMap(m=>m.files||[]):[])].some(f=>f.id===file.id&&f.name===file.name&&f.type===file.type&&f.size===file.size&&f.ts===file.ts&&f.author===file.author);if(current()&&canonical)openNativeFile(file);}},onloadolder:()=>{if(current())loadOlder();}});
  chatMount=viewMounts.get("chat");
  // A finished epic says so at the bottom; writing there reopens it (the room does it, see reopenIfArchived).
  chatViewport.afterRender(keep,before);
}
function loadOlder(){if(S){chatViewport.sync(S,thread,activeDocumentConnectionGeneration,liveState);chatViewport.loadOlder();}}
// Model labels are still shared by legacy agent/account surfaces; native chat owns its status model.
function appendMsg(m) {
  renderChat(
    chatViewport.pinned() || (m.author === S.me && m.kind !== "agent") ? undefined : "stay",
  );
}
// Native document owner; the remaining phone gesture/resizer is an explicit shell adapter.
function docEpic() { return S ? UI.documentTarget(S,thread,nativeDocumentOwner?.roomDocument() ?? false).epicId : null; }
function renderDoc(fresh=false,authoritative=false) {
  const el=document.getElementById("nativeDocument");
  if(!el||!S)return;
  const roomId=S.id,account=S.me,connection=roomConnection,book=el.closest(".book");
  if(!nativeDocumentOwner)nativeDocumentOwner=UI.createDocumentSession({drafts:nativeDocumentDrafts,authorizationEpoch:activeDocumentConnectionGeneration,request:command=>current()?request(command):Promise.resolve({ok:false,error:"disconnected"}),name:room=>name(room.me),color:room=>color(room.me),label:LANG==="en"?"Document editor":"Editor do documento",readMode:()=>localStorage.getItem("vb.docView"),writeMode:value=>localStorage.setItem("vb.docView",value)});
  const owner=nativeDocumentOwner;
  function current(){return nativeDocumentOwner===owner&&S?.id===roomId&&S.me===account&&roomConnection===connection&&currentRoomId()===roomId&&book.isConnected;}
  owner.sync(S,thread,fresh,authoritative,activeDocumentConnectionGeneration);
  if(documentScopeReset){documentScopeReset=false;owner.chooseRoom(false);}
  renderView("document",el,{owner,props:{room:S,thread,send:command=>current()?send(command):false,taskProps:{room:S,thread,vb:panelBridge(),send:command=>current()?send(command):false,request:command=>current()?request(command):Promise.resolve({ok:false,error:"disconnected"}),waits:myWaits},actions:{ensureFileIndex:()=>{if(current())ensureFileChipIndex();},navigate:(id,target)=>{if(current())goToMsg(id,target);},navigateRich:target=>{if(current())cardGo(target.kind==="thread"?`#e${target.id}`:target.id?`#doc:${target.id}`:"#doc");},openFile:file=>{if(current()&&[...(S.files||[]),...allMsgs().flatMap(message=>message.files||[])].some(f=>f.id===file.id&&f.name===file.name&&f.type===file.type&&f.ts===file.ts&&f.size===file.size&&f.author===file.author))openNativeFile(file);},openFileReference:file=>{if(current()&&file.roomId===roomId&&/^[0-9a-f]+$/.test(file.id))openNativeFile(file.id,undefined,file.name);}},lang:LANG,onAuthorize:()=>{if(!current())return;roomConnection?.dispose();roomConnection=null;clearViews();roomCache.delete(roomId);openBook(roomId);},pane:book.querySelector(":scope > .doc")?.dataset.pane||"doc",onPane:pane=>{if(current())nativeDocumentSetPane?.(pane);}}});
  renderDocumentChrome();
}
function renderDocumentChrome(){
  if(!S||!nativeDocumentOwner)return;
  const book=$app.querySelector(".book"),roomId=S.id,account=S.me,connection=roomConnection,owner=nativeDocumentOwner;
  const current=()=>nativeDocumentOwner===owner&&S?.id===roomId&&S.me===account&&roomConnection===connection&&currentRoomId()===roomId&&book?.isConnected;
  const queue=myQueue(),mine=roomAgents.list.filter(a=>a.email===S.me),around=UI.agentPresence({claude_on:!!roomAgents.claudeOn,agents:mine,sandboxes:[]},S.me,Date.now()).around,stuck=queue.some(item=>item.st==="blocked");
  const counts={board:[...S.epics.flatMap(epic=>epic.tasks),...(S.roomTasks||[])].filter(task=>!task.done&&task.owner===S.me).length,files:S.filesN??S.files?.length??0,apps:(nativeApps?.owner.connectionCount()||0)+UI.roomApps(S).length,decisions:S.decisions?.length??0,reminders:(S.reminders||[]).some(reminder=>reminder.error)?`${S.reminders?.length??0} ⚠`:S.reminders?.length??0,agents:queue.length};
  const props={owner,room:S,lang:LANG,pane:book.querySelector(":scope > .doc")?.dataset.pane||"doc",counts,agentState:stuck?"blocked":queue.length?"busy":around?"idle":"",agentTitle:stuck?t("Seu agent espera você no terminal"):queue.length?t("Fila do seu agent: {n}",{n:queue.length}):around?t("Seu agent está livre"):"Agents"};
  const tab=document.getElementById("nativeDocumentToolbar"),peek=document.getElementById("nativeDocumentPeek");
  if(tab)renderView("documentToolbar",tab,{...props,onPane:pane=>{if(current())nativeDocumentSetPane?.(pane);}});
  if(peek)renderView("documentPeek",peek,{...props,compact:true,onPane:pane=>{if(!current())return;if(book.dataset.sheet==="doc"&&book.dataset.pane===pane)return closeSheet();if(book.classList.contains("boardview"))document.getElementById("toggleBoard").click();nativeDocumentSetPane?.(pane);openSheet("doc");}});
}

// One document-owned local device lock; prompts begin only from the native controls' gesture.
const nativeDeviceLock=UI.browserDeviceLock(),nativeDeviceLockTarget=document.createElement('div');
nativeDeviceLockTarget.dataset.nativeDeviceLockMount='';document.body.append(nativeDeviceLockTarget);
const nativeDeviceLockMount=UI.mountView('deviceLock',nativeDeviceLockTarget,{owner:nativeDeviceLock,lang:LANG});
const deviceVisibility=()=>nativeDeviceLock.visibility(document.hidden);
document.addEventListener('visibilitychange',deviceVisibility);
route();

if (import.meta.hot)
  import.meta.hot.dispose(() => {
    document.removeEventListener("click",fileLinkClick);
    nativeViewer?.dispose();
    nativeViewerMount?.destroy();
    nativeViewerTarget?.remove();
    nativePersonalChannel?.routeChanged();
    homeSettingsCleanup();logoutWithPwa.dispose();
    nativeAccount?.dispose();nativeAccountMount?.destroy();nativeAccountTarget?.remove();
    document.removeEventListener("visibilitychange",deviceVisibility);nativeDeviceLock.dispose();nativeDeviceLockMount.destroy();nativeDeviceLockTarget.remove();
    nativeRouter?.dispose();
    rootRoom.dispose();
    roomConnection?.dispose();
    roomConnection = null;
    clearViews();
    chatViewport.dispose();
    nativeAppNav?.dispose();
    nativePersonalChannel?.dispose();
    nativeRooms?.dispose();
    nativePersonal?.dispose();
    nativeNavMount?.destroy();
  });
