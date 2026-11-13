import { A as e, C as t, D as n, E as r, F as i, I as a, L as o, M as s, N as c, O as l, P as u, S as d, T as f, _ as p, a as m, b as ee, c as te, d as ne, f as re, g as ie, h, i as g, j as ae, k as oe, l as se, m as ce, o as le, p as ue, r as de, s as fe, t as pe, u as me, v as he, w as ge, x as _e, y as ve } from "./main-DZwnVq9x.js";
import { n as ye, t as _ } from "./shared-Cn4mm4KY.js";
import { f as be, o as xe, p as Se } from "./model-BLsF6N8q.js";
import { d as Ce } from "./RadioGroup-CYa-Ao14.js";
import { A as we, F as Te, L as Ee, O as De, P as Oe, S as ke, a as Ae, b as je, d as Me, m as Ne, n as Pe, o as Fe, p as Ie, x as Le, y as Re } from "./api-CwXbABNL.js";
import { t as ze } from "./model-D2eQTgrV.js";
// shared/person.ts
var Be = {
	me: Oe({
		t: we("me"),
		book: Te(Ee()),
		msg: Te(we(1))
	}),
	agents: Oe({
		t: we("agents"),
		book: Ee()
	})
}, Ve = De("t", [Be.me, Be.agents]);
function He(e) {
	if (typeof e != "string") return null;
	try {
		let t = JSON.parse(e), n = Ve.safeParse(t);
		return n.success ? n.data : null;
	} catch {
		return null;
	}
}
// svelte/features/home/connection.ts
function Ue(e) {
	let t = He(e);
	return t?.t === "me" ? {
		kind: "account",
		book: t.book,
		message: t.msg === 1
	} : t?.t === "agents" ? {
		kind: "agents",
		book: t.book
	} : null;
}
function We(e) {
	let t = e.clock ?? be, n = e.createSocket ?? ((e) => new WebSocket(e)), r = !0, i = !1, a = null, o = null, s = null, c = 0, l = () => {}, u = (e) => {
		e !== null && t.cancel(e);
	};
	function d() {
		if (!r || a && a.readyState <= 1 || !e.visible()) return;
		let i = n(e.url());
		a = i;
		let l = !1;
		i.onopen = () => {
			r && a === i && !l && (l = !0, e.onConnected?.(), u(s), s = t.schedule(() => {
				r && a === i && (c = 0);
			}, 3e3));
		}, i.onmessage = (t) => {
			if (!r || a !== i) return;
			let n;
			try {
				n = (e.decode ?? Ue)(t.data);
			} catch {
				return;
			}
			n && (n.kind === "account" ? n.message && n.book && n.book === e.currentRoom() || e.onAccount() : e.onAgents(n.book));
		}, i.onclose = () => {
			r && a === i && (a = null, u(s), s = null, e.visible() && (u(o), o = t.schedule(() => {
				o = null, d();
			}, Math.min(3e4, 1e3 * 2 ** c++))));
		};
	}
	return {
		start() {
			r && !i && (i = !0, l = e.listenVisibility(() => {
				r && e.visible() && (e.onVisible(), d());
			}), d());
		},
		restart() {
			if (!r) return;
			let e = a;
			a = null, u(o), u(s), o = s = null, c = 0, e?.close(), d();
		},
		dispose() {
			r = !1, l(), u(o), u(s);
			let e = a;
			a = null, e?.close();
		}
	};
}
// svelte/features/home/api.ts
var Ge = class extends Error {
	status;
	constructor(e, t = 0) {
		super(e), this.status = t;
	}
};
async function v(e, t) {
	let n = await e.json().catch(() => null);
	if (!e.ok) {
		let t = Me.safeParse(n);
		throw new Ge(t.success ? t.data.error : `HTTP ${e.status}`, e.status);
	}
	try {
		return t.parse(n);
	} catch {
		throw new Ge("invalid-response");
	}
}
function Ke(e) {
	let t = Pe("/", e).api, n = t.books[":id"], r = (e) => ({ id: encodeURIComponent(e) });
	return {
		me: (e) => t.me.$get({ query: { ui: "svelte" } }, { init: { signal: e } }).then((e) => v(e, Ie)),
		archived: (e) => t.archived.$get({}, { init: { signal: e } }).then((e) => v(e, Fe)),
		search: (e, n) => t.search.$get({ query: { q: e } }, { init: { signal: n } }).then((e) => v(e, Le)),
		route: (e, n) => t.route.$post({ json: { text: e } }, { init: { signal: n } }).then((e) => v(e, je)),
		startRoom: (e, n) => t.books.start.$post({ json: { text: e } }, { init: { signal: n } }).then((e) => v(e, ke)),
		post: (t, n, r) => _e(t, e).postMessage({
			text: n,
			thread: r
		}),
		archive: (e, t, i) => n.archive.$post({
			param: r(e),
			json: { archived: t }
		}, { init: { signal: i } }).then((e) => v(e, Ne)),
		order: (e, n) => t.rooms.order.$post({ json: { ids: e } }, { init: { signal: n } }).then((e) => v(e, Ne)),
		tint: (e, t, i) => n.tint.$post({
			param: r(e),
			json: { tint: t }
		}, { init: { signal: i } }).then((e) => v(e, Ne)),
		icon: (e, t, i) => n.icon.$post({
			param: r(e),
			header: { "content-type": t ? "image/png" : "application/json" }
		}, { init: {
			signal: i,
			body: t ?? "{}"
		} }).then((e) => v(e, Re)),
		resolve: (e, n, r) => t.waits.resolve.$post({ json: {
			book_id: e,
			ref: n
		} }, { init: { signal: r } }).then((e) => v(e, Ne)),
		agents: (e) => t.agents.$get({}, { init: { signal: e } }).then((e) => v(e, Ae))
	};
}
// svelte/features/home/personal.ts
function qe(e, t = {}) {
	let n = t.clock ?? be, r = ye({
		me: null,
		agents: null,
		loading: !1,
		error: "",
		updateAvailable: !1,
		identityRevision: 0,
		now: Date.now(),
		seen: {}
	}), i = ye({
		ask: "",
		create: "",
		unknown: null
	}), a = null, o = !0, s = !1, c = !1, l = 0, u = 0, d = null, f = null, p = null, m = null, ee = Se(n), te = !1, ne = !1, re = 0, ie = 0, h = null, g = (e) => {
		e !== null && n.cancel(e);
	};
	function ae(e, n = !0) {
		if (!o || a === e) return !1;
		let m = a !== null;
		return a = e, ee.cancel(), ie++, re++, te = ne = !1, g(h), h = null, (m || n && s) && (l++, u++, s = !1, c = !1, d?.abort(), d = null, g(f), g(p), f = p = null), m ? (i.set({
			ask: "",
			create: "",
			unknown: null
		}), r.update((e) => ({
			...e,
			me: null,
			identityRevision: e.identityRevision + 1,
			seen: {},
			agents: null,
			loading: !1,
			error: ""
		})), t.onIdentityChange?.()) : r.update((e) => ({
			...e,
			agents: null
		})), n && ce(), m;
	}
	function oe() {
		if (g(m), !o) return;
		r.update((e) => ({
			...e,
			now: Date.now()
		}));
		let e = Date.now(), t = Math.min(6e4, ...(_(r).me?.books ?? []).map((t) => (t.busy_until ?? 0) - e).filter((e) => e > 0));
		m = n.schedule(oe, Math.max(100, t));
	}
	function se() {
		o && (l++, c = !0, p === null && (p = n.schedule(() => {
			p = null, ce();
		}, 600)));
	}
	async function ce() {
		if (!o || s) return;
		g(p), p = null, s = !0, c = !1;
		let i = ++u, a = l;
		d = new AbortController();
		let m = d.signal;
		r.update((e) => ({
			...e,
			loading: !0,
			error: ""
		})), f = n.schedule(() => {
			o && i === u && (u++, s = !1, d?.abort(), d = null, f = null, r.update((e) => ({
				...e,
				loading: !1,
				error: "unconfirmed"
			})));
		}, 2e4);
		try {
			let n = await e.me(m);
			if (!o || i !== u) return;
			a === l && (ae(n.email, !1), r.update((e) => ({
				...e,
				me: n,
				loading: !1,
				error: ""
			})), t.onVersion?.(n.v), oe());
		} catch (e) {
			o && i === u && (r.update((t) => ({
				...t,
				loading: !1,
				error: e instanceof Error ? e.message : "network"
			})), e instanceof Ge && e.status === 401 && t.onUnauthorized?.());
		} finally {
			o && i === u && (g(f), f = null, d = null, s = !1, (c || a !== l) && ce());
		}
	}
	function le() {
		if (!o || te) return;
		g(h), h = null, te = !0, ne = !1;
		let t = ++ie, n = re, i = !1, a = () => {
			i || (i = !0, o && t === ie && (te = !1, (ne || n !== re) && le()));
		};
		return ee.run((t) => e.agents(t), (e) => {
			o && t === ie && n === re && r.update((t) => ({
				...t,
				agents: e
			})), a();
		}, a);
	}
	function ue() {
		if (o) return re++, ne = !0, g(h), h = null, le();
	}
	return {
		state: r,
		draft: i,
		api: e,
		refresh: ce,
		acceptIdentity: ae,
		invalidate: se,
		peek: () => _(r).me,
		updateAvailable(e) {
			o && r.update((t) => ({
				...t,
				updateAvailable: e
			}));
		},
		observe(e) {
			o && (e.kind === "account" ? se() : (re++, ne = !0, h === null && (h = n.schedule(() => {
				h = null, le();
			}, 600))));
		},
		refreshAgents: ue,
		roomMeta(e, t) {
			if (!o) return;
			let n = _(r).me, i = n?.books.find((t) => t.id === e);
			n && i && (t.title !== void 0 && t.title !== i.title || t.folder !== void 0 && t.folder !== i.folder || t.summary !== void 0 && t.summary !== i.summary) && (l++, r.update((n) => ({
				...n,
				me: n.me ? {
					...n.me,
					books: n.me.books.map((n) => n.id === e ? {
						...n,
						...t.title === void 0 ? {} : { title: t.title },
						...t.folder === void 0 ? {} : { folder: t.folder },
						...t.summary === void 0 ? {} : { summary: t.summary }
					} : n)
				} : null
			})));
		},
		seen(e, t) {
			o && Number.isSafeInteger(t) && t >= 0 && r.update((n) => ({
				...n,
				seen: {
					...n.seen,
					[e]: Math.max(n.seen[e] ?? 0, t)
				}
			}));
		},
		editAsk(e) {
			o && i.update((t) => ({
				...t,
				ask: e
			}));
		},
		editCreate(e) {
			o && i.update((t) => ({
				...t,
				create: e
			}));
		},
		notice(e, t) {
			o && i.update((n) => ({
				...n,
				unknown: {
					roomId: e,
					names: t
				}
			}));
		},
		clearNotice() {
			o && i.update((e) => ({
				...e,
				unknown: null
			}));
		},
		start() {
			o && (oe(), ce());
		},
		dispose() {
			o = !1, l++, u++, d?.abort(), g(f), g(p), g(m), g(h), ie++, ee.dispose();
		}
	};
}
// svelte/features/rooms/session.ts
function Je(e, t = be) {
	let n = ye({
		pending: {},
		issues: {}
	}), r = !0, i = 0, a = /* @__PURE__ */ new Map();
	function o(e, r) {
		let i = a.get(e);
		if (i) {
			i.owner.dispose();
			for (let e of i.timers) t.cancel(e);
		}
		a.delete(e), n.update((t) => {
			let n = { ...t.pending }, i = { ...t.issues };
			return delete n[e], r ? i[e] = r : delete i[e], {
				pending: n,
				issues: i
			};
		});
	}
	let s = e.state.subscribe(({ me: e }) => {
		if (r && e) for (let [t, n] of a) (n.ack && n.matches(e) || n.roomId && !e.books.some((e) => e.id === n.roomId)) && o(t);
	});
	function c(s, c, l, u) {
		let d = _(e.state).me;
		if (!r || !d || a.has(s) || u && !d.books.some((e) => e.id === u)) return;
		let f = ++i, p = Se(t), m = {
			ticket: f,
			owner: p,
			ack: !1,
			matches: () => !1,
			timers: [],
			roomId: u
		};
		a.set(s, m), n.update((e) => {
			let t = { ...e.issues };
			return delete t[s], {
				pending: {
					...e.pending,
					[s]: !0
				},
				issues: t
			};
		});
		let ee = () => r && a.get(s)?.ticket === f;
		return p.run(c, (n) => {
			if (!ee()) return;
			m.ack = !0, m.matches = (e) => l(e, n);
			let r = _(e.state).me;
			if (r && m.matches(r)) o(s);
			else {
				e.invalidate(), e.refresh();
				for (let n of [
					1e3,
					3e3,
					6e3
				]) m.timers.push(t.schedule(() => {
					ee() && e.refresh();
				}, n));
				m.timers.push(t.schedule(() => {
					ee() && o(s, "unconfirmed");
				}, 1e4));
			}
		}, (e) => {
			ee() && o(s, e instanceof Error ? e.message : "network");
		});
	}
	return {
		state: n,
		rename(e, t, n) {
			return c(`rename:${e}`, async () => {
				let e = await n();
				if (!e.ok) throw Error(e.error);
				return e;
			}, (n) => n.books.find((t) => t.id === e)?.title === t, e);
		},
		archive(t) {
			return c(`archive:${t}`, (n) => e.api.archive(t, !0, n), (e) => !e.books.some((e) => e.id === t), t);
		},
		tint(t, n) {
			return c(`tint:${t}`, (r) => e.api.tint(t, n, r), (e) => e.books.find((e) => e.id === t)?.tint === n, t);
		},
		icon(t, n) {
			return c(`icon:${t}`, (r) => e.api.icon(t, n, r), (e, n) => e.books.find((e) => e.id === t)?.icon === n.icon, t);
		},
		order(t) {
			let n = _(e.state).me;
			if (!n || t.length !== n.books.length || new Set(t).size !== t.length || t.some((e) => !n.books.some((t) => t.id === e))) return;
			let r = t.slice(0, 300);
			return c("order", (t) => e.api.order(r, t), (e) => ae(e.books).filter((e) => r.includes(e.id)).map((e) => e.id).join("\0") === r.join("\0"));
		},
		resolve(t, n) {
			if (n.startsWith("m") && _(e.state).me?.waits.some((e) => e.book_id === t && e.ref === n)) return c(`wait:${t}:${n}`, (r) => e.api.resolve(t, n, r), (e) => !e.waits.some((e) => e.book_id === t && e.ref === n));
		},
		reset() {
			for (let e of [...a.keys()]) o(e);
			n.set({
				pending: {},
				issues: {}
			});
		},
		dispose() {
			r = !1, s();
			for (let e of [...a.keys()]) o(e);
		}
	};
}
// svelte/features/app-navigation/router.ts
var Ye = (e) => e.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1] ?? null;
function Xe(e) {
	let t = new URL(e), n = Ye(t.pathname);
	if (t.pathname === "/app" || t.pathname === "/") return { kind: "home" };
	if (t.pathname === "/archived") return { kind: "archived" };
	if (n) {
		let e = /^#m(\d+)$/.exec(t.hash)?.[1], r = /^#f([a-z0-9]+)$/.exec(t.hash)?.[1];
		return {
			kind: "room",
			target: {
				roomId: n,
				thread: t.searchParams.get("t") ?? "main",
				messageId: oe(e),
				fileId: r,
				document: t.hash.startsWith("#doc")
			}
		};
	}
	return {
		kind: "document",
		url: e
	};
}
function Ze(e) {
	let t = 0, n = !0;
	function i(a, o = !1) {
		if (!n || e.deferNavigation?.(() => i(a, o))) return;
		let s = typeof a == "string" ? a : c(a), l = new URL(s, e.current());
		if (l.origin !== new URL(e.current()).origin) {
			e.document(l.href);
			return;
		}
		let u = r(l, e.current(), "svelte"), d = Xe(new URL(u, e.current()).href);
		t++, d.kind === "document" ? e.document(u) : (e.beforeChange(), e.history[o ? "replaceState" : "pushState"](null, "", u), d.kind === "room" && e.sameRoom(d.target) || e.activate(d));
	}
	return {
		go: i,
		pop() {
			if (!n || e.consumePop()) return;
			t++, e.beforeChange();
			let r = Xe(e.current());
			r.kind === "room" && e.sameRoom(r.target) || e.activate(r);
		},
		generation: () => t,
		dispose() {
			n = !1, t++;
		}
	};
}
// svelte/features/app-navigation/search.ts
function Qe(t, n, r = be) {
	let i = ye({
		open: !1,
		query: "",
		selected: 0,
		result: null,
		loading: !1,
		error: ""
	}), a = Se(r), o = null, u = !0, d = () => {
		o !== null && r.cancel(o), o = null, a.cancel();
	}, f = _(t.state).identityRevision, p = t.state.subscribe((e) => {
		e.identityRevision !== f && (f = e.identityRevision, d(), a.dispose(), i.set({
			open: !1,
			query: "",
			selected: 0,
			result: null,
			loading: !1,
			error: ""
		}));
	}), m = () => {
		let n = _(i), r = _(t.state).me;
		return [
			...s(r?.books ?? [], n.query).map((e) => ({ roomId: e.id })),
			...(n.result?.epics ?? []).map(l),
			...(n.result?.messages ?? []).map(e)
		];
	};
	return {
		state: i,
		targets: m,
		open() {
			u && (d(), a.dispose(), a = Se(r), i.set({
				open: !0,
				query: "",
				selected: 0,
				result: null,
				loading: !1,
				error: ""
			}));
		},
		close() {
			d(), a.dispose(), i.update((e) => ({
				...e,
				open: !1,
				loading: !1
			}));
		},
		edit(e) {
			if (!u || !_(i).open) return;
			d(), i.update((t) => ({
				...t,
				query: e,
				selected: 0,
				result: null,
				loading: e.trim().length >= 2,
				error: ""
			}));
			let n = e.trim();
			n.length < 2 || (o = r.schedule(() => {
				o = null, a.run((e) => t.api.search(n, e), (e) => i.update((t) => ({
					...t,
					result: e,
					loading: !1,
					selected: 0
				})), (e) => i.update((t) => ({
					...t,
					loading: !1,
					error: e instanceof Error ? e.message : "network"
				})));
			}, 250));
		},
		move(e) {
			let t = m().length;
			t && i.update((n) => ({
				...n,
				selected: (n.selected + e + t) % t
			}));
		},
		select(e) {
			e >= 0 && e < m().length && i.update((t) => ({
				...t,
				selected: e
			}));
		},
		activateTarget(e) {
			u && _(i).open && m().some((t) => c(t) === c(e)) && (this.close(), n(e));
		},
		activate(e = _(i).selected) {
			let t = m()[e];
			t && this.activateTarget(t);
		},
		dispose() {
			p(), u = !1, d(), a.dispose();
		}
	};
}
// svelte/features/app-navigation/controller.ts
function $e(e, t, r) {
	let i = ye({
		roomId: null,
		settingsId: null,
		archiveId: null,
		renameId: null,
		renameDraft: "",
		renameBusy: !1,
		renameError: "",
		renameSubmitted: !1
	}), a = n(e, r.navigate), o = Qe(e, r.navigate), s = null, c = !0, l = "", u = () => i.update((e) => ({
		...e,
		settingsId: null,
		archiveId: null,
		renameId: null,
		renameBusy: !1,
		renameError: "",
		renameDraft: "",
		renameSubmitted: !1
	})), d = _(e.state).identityRevision, f = e.state.subscribe((e) => {
		e.identityRevision !== d && (d = e.identityRevision, s = null, o.close(), a.close(), u());
	});
	return {
		personal: e,
		rooms: t,
		state: i,
		creator: a,
		search: o,
		callbacks: r,
		syncPath(e) {
			if (!c) return;
			let t = new URL(e);
			l !== t.pathname + t.search && (l = t.pathname + t.search, o.close(), a.close(), u()), i.update((e) => ({
				...e,
				roomId: Ye(t.pathname)
			}));
		},
		openSearch(e) {
			s = e ?? null, o.open();
		},
		openCreate(e) {
			s = e ?? null, a.open();
		},
		openSettings(t, n) {
			_(e.state).me?.books.some((e) => e.id === t) && (s = n ?? null, i.update((e) => ({
				...e,
				settingsId: t
			})));
		},
		closeSettings() {
			u();
		},
		askArchive(e) {
			i.update((t) => ({
				...t,
				settingsId: null,
				archiveId: e
			}));
		},
		confirmArchive() {
			let e = _(i).archiveId;
			e && t.archive(e);
		},
		move(n, r) {
			let i = ae(_(e.state).me?.books ?? []).map((e) => e.id), a = i.indexOf(n), o = a + r;
			a < 0 || o < 0 || o >= i.length || (i.splice(a, 1), i.splice(o, 0, n), t.order(i));
		},
		drop(n, r, i) {
			let a = ae(_(e.state).me?.books ?? []).map((e) => e.id);
			if (n === r || !a.includes(n) || !a.includes(r)) return;
			let o = a.filter((e) => e !== n);
			o.splice(o.indexOf(r) + +!!i, 0, n), t.order(o);
		},
		askRename(t) {
			let n = _(e.state).me?.books.find((e) => e.id === t);
			n && _(i).roomId === t && r.rename && i.update((e) => ({
				...e,
				settingsId: null,
				renameId: t,
				renameDraft: n.title ?? "",
				renameError: "",
				renameSubmitted: !1
			}));
		},
		editRename(e) {
			i.update((t) => ({
				...t,
				renameDraft: e
			}));
		},
		async rename() {
			let e = _(i);
			if (!c || e.renameBusy || !e.renameId || e.roomId !== e.renameId || !r.rename || !e.renameDraft.trim()) return;
			let n = e.renameId, a = e.renameDraft.trim().slice(0, 120);
			i.update((e) => ({
				...e,
				renameBusy: !0,
				renameError: "",
				renameSubmitted: !0
			}));
			try {
				await t.rename(n, a, () => r.rename(n, a));
			} catch {}
			c && _(i).renameId === n && i.update((e) => ({
				...e,
				renameBusy: !1
			}));
		},
		returnFocus(e) {
			return s?.isConnected ? s : e;
		},
		pageLeft() {
			o.close(), a.close(), u();
		},
		dispose() {
			f(), s = null, c = !1, a.dispose(), o.dispose(), u();
		}
	};
}
// svelte/navigation.ts
function et(e, t, n) {
	let i = (e) => e == null ? e : r(e, t(), n);
	return {
		pushState(t, n, r) {
			e.pushState(t, n, i(r));
		},
		replaceState(t, n, r) {
			e.replaceState(t, n, i(r));
		}
	};
}
// svelte/legacy/boardLayout.ts
function tt(e) {
	return e.querySelector(":scope > .chat > #kanban, :scope > .doc > #kanban");
}
function nt(e, t, n = null) {
	let r = tt(e);
	if (!r || !t || r.parentElement === t) return;
	let i = e.ownerDocument.activeElement, a = i instanceof HTMLElement && r.contains(i) ? i : null;
	t.insertBefore(r, n?.parentNode === t ? n : null), a?.focus({ preventScroll: !0 });
}
function rt(e, t, n) {
	let r = !1, i = () => {
		!r && e.isConnected && !t.matches && e.classList.contains("boardview") && n();
	};
	return t.addEventListener("change", i), () => {
		r || (r = !0, t.removeEventListener("change", i));
	};
}
// svelte/roomConnection.ts
var it = 1e4;
function at(e) {
	let n = e.schedule ?? setTimeout, r = e.cancel ?? clearTimeout, i = e.createSocket ?? ((e) => new WebSocket(e)), a = null, o, s, c = !1, l = !1, u = 0, f = "", p = /* @__PURE__ */ new Map(), m = Math.random().toString(36).slice(2, 8), ee = 0, te = (e, t) => {
		let n = p.get(e);
		n && (p.delete(e), r(n.timer), n.done(t));
	}, ne = (e) => {
		for (let t of [...p.keys()]) te(t, {
			ok: !1,
			error: e
		});
	}, re = () => {
		o !== void 0 && r(o), s !== void 0 && r(s), o = s = void 0;
	}, ie = () => {
		c = !0, re(), ne("disconnected");
		let e = a;
		a = null, e && (e.onopen = e.onmessage = e.onclose = null, e.close());
	}, h = () => {
		if (c) return;
		o = void 0;
		let t = i(e.url(f));
		a = t;
		let r = () => !c && a === t;
		t.onopen = () => {
			r() && (s = n(() => {
				r() && (s = void 0, t.readyState === 1 && (u = 0));
			}, 15e3));
		}, t.onmessage = (t) => {
			if (!r()) return;
			let n = d(t.data);
			n.t === "result" ? te(n.cid, n.ok ? { ok: !0 } : {
				ok: !1,
				error: n.error
			}) : (n.t === "state" && (l = !0), e.onEvent(n));
		}, t.onclose = (i) => {
			r() && (a = null, re(), ne("disconnected"), t.onopen = t.onmessage = t.onclose = null, i.code === 4003 ? (ie(), e.onRemoved()) : !l && i.code !== 1e3 ? (ie(), e.onUnavailable()) : (f = String(i.code || ""), o = n(h, Math.min(3e4, 1e3 * 2 ** u++))));
		};
	};
	return {
		start() {
			!a && o === void 0 && !c && h();
		},
		dispose: ie,
		send(e) {
			return t(a, e);
		},
		request(e, r = it) {
			let i = `${m}-${++ee}`;
			return new Promise((o) => {
				if (!t(a, e, i)) return o({
					ok: !1,
					error: "offline"
				});
				p.set(i, {
					done: o,
					timer: n(() => te(i, {
						ok: !1,
						error: "timeout"
					}), r)
				});
			});
		},
		resync() {
			a?.close();
		}
	};
}
// svelte/legacy/host.js
var ot = et(history, () => location.href, "svelte"), y = document.cookie.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] || (/^pt/i.test(navigator.language) ? "pt" : /^en/i.test(navigator.language) ? "en" : "pt");
document.documentElement.lang = y === "en" ? "en" : "pt-BR";
var st = y === "en" ? "en-US" : "pt-BR", ct = {
	reseta: "resets",
	sandbox: "sandbox",
	Apagar: "Delete",
	"Conferi a sala": "I checked the room",
	"Você não tem acesso a esta sala.": "You do not have access to this room.",
	"Rascunhos de conversas removidas": "Drafts from deleted threads",
	"Revisar rascunho": "Review draft",
	"Rascunho original": "Original draft",
	"Descartar rascunho": "Discard draft",
	"Não foi possível copiar. Selecione o texto abaixo e copie manualmente.": "Could not copy. Select the text below and copy it manually.",
	"A conversa original não está disponível. Copie ou descarte este rascunho local. Nada será enviado ou movido. Descartar não desfaz um upload ou uma mensagem já enviada.": "The original thread is unavailable. Copy or discard this local draft. Nothing will be sent or moved. Discarding cannot undo an upload or message already sent.",
	Gráfico: "Chart",
	"Escolha uma opção": "Choose an option",
	"Ainda sem confirmação. Confira a sala antes de enviar novamente.": "Still unconfirmed. Check the room before sending again.",
	"Ouvindo… Escape para parar.": "Listening… Escape to stop.",
	"O ditado foi interrompido. Seu rascunho foi mantido.": "Dictation stopped. Your draft was kept.",
	"Ditar mensagem": "Dictate message",
	"Segure pra ditar (ou segure o espaço)": "Hold to dictate (or hold Space)",
	"O navegador não deixou usar o microfone.": "The browser did not allow microphone access.",
	"Não foi possível iniciar o ditado.": "Could not start dictation.",
	"O upload não foi confirmado. Confira os arquivos antes de tentar novamente.": "The upload was not confirmed. Check the files before trying again.",
	"A conta mudou; selecione o arquivo novamente.": "The account changed; select the file again.",
	Pronto: "Ready",
	Enviado: "Sent",
	"Enviado. Seu novo rascunho foi mantido.": "Sent. Your new draft was kept.",
	"Votação criada": "Poll created",
	"Rascunho mantido": "Draft kept",
	"Rascunho descartado": "Draft discarded",
	"Conferi a sala; manter rascunho": "I reviewed the room; keep draft",
	"Conferi a sala; descartar rascunho": "I reviewed the room; discard draft",
	"Ver mensagem correspondente": "View matching message",
	"Confira a votação na sala antes de tentar novamente.": "Check the poll in the room before trying again.",
	"A mensagem não está mais disponível.": "The message is no longer available.",
	"A mensagem pode ter no máximo 4000 caracteres.": "A message can contain up to 4000 characters.",
	"Anexe no máximo 10 arquivos por mensagem.": "Attach up to 10 files per message.",
	"Espere os anexos terminarem ou remova-os.": "Wait for the attachments to finish or remove them.",
	"A mensagem não está mais disponível. Cancele a resposta para continuar.": "The message is no longer available. Cancel the reply to continue.",
	"Envie ou descarte um dos seus 64 rascunhos antes de abrir outro.": "Send or discard one of your 64 drafts before opening another.",
	"O tópico não está mais disponível. Seu rascunho foi mantido.": "The thread is no longer available. Your draft was kept.",
	"Arquivo maior que o limite: 10MB, ou 50MB para áudio.": "File exceeds the limit: 10MB, or 50MB for audio.",
	"Arquivo vazio.": "Empty file.",
	"Tentar novamente": "Try again",
	online: "online",
	offline: "offline",
	"visto por {n}": "seen by {n}",
	"visto por {n} de {m}": "seen by {n} of {m}",
	leu: "read",
	recebeu: "delivered",
	"Email inválido.": "Invalid email.",
	"Esta pessoa já está na sala.": "This person is already in the room.",
	"Não deu pra enviar agora. Tente de novo.": "Couldn't send it now. Try again.",
	"Use um link http ou https válido.": "Enter a valid http or https link.",
	"Sem conexão. Seu rascunho foi mantido.": "Offline. Your draft has been kept.",
	"Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.": "Still unconfirmed. Check the pinned items before trying again.",
	"Não deu pra atualizar os fixados. Tente de novo.": "Couldn't update pinned items. Try again.",
	"Aguardando confirmação…": "Waiting for confirmation…",
	"Link inválido": "Invalid link",
	"Arquivo indisponível": "File unavailable",
	"App indisponível": "App unavailable",
	"Item indisponível": "Item unavailable",
	"Este link já está nos fixados.": "This link is already pinned.",
	"Carregando arquivo…": "Loading file…",
	"Carregar arquivo": "Load file",
	"Tentar carregar novamente": "Try loading again",
	"Não deu pra resolver agora. Tente de novo.": "Couldn't resolve this request. Try again.",
	"Dono: {who}": "Owner: {who}",
	"clique pra trocar": "click to change",
	"Sem dono · clique pra escolher": "No owner · click to pick one",
	"Dono do épico": "Epic owner",
	"Ordem dos épicos atualizada.": "Epic order updated.",
	"Abrir galho": "Expand branch",
	"Fechar galho": "Collapse branch",
	"Subépico de {title}": "Sub-epic of {title}",
	"Trabalho em um subépico": "Work in a sub-epic",
	"Ações do épico": "Epic actions",
	"Mover para cima": "Move up",
	"Mover para baixo": "Move down",
	"Sem dono": "No owner",
	"app da sala": "room app",
	arquivo: "file",
	"Não deu pra abrir agora. Tente de novo.": "Couldn't open it now. Try again.",
	"Buscando a mensagem…": "Finding the message…",
	"Não achei essa mensagem nesta sala.": "Couldn't find that message in this room.",
	"Copiar link": "Copy link",
	"Copiar o link desta mensagem": "Copy a link to this message",
	"Link copiado": "Link copied",
	"Caixa de entrada": "Inbox",
	"Caixa de entrada: o que espera por você": "Inbox: what's waiting on you",
	"Esta sala": "This room",
	Todas: "All",
	"Seu agent espera você:": "Your agent is waiting on you:",
	"Nada esperando você. ✓": "Nothing waiting on you. ✓",
	"Nada esperando você nesta sala. ✓": "Nothing waiting on you in this room. ✓",
	"Buscar emoji…": "Search emoji…",
	Emoji: "Emoji",
	"Não consegui abrir este arquivo.": "Couldn't open this file.",
	Desafixar: "Unpin",
	"Desafixar {name}": "Unpin {name}",
	Fixados: "Pinned",
	"Fixar um link": "Pin a link",
	"Cole um link (site, repo, painel…)": "Paste a link (site, repo, dashboard…)",
	"Link pra fixar": "Link to pin",
	"Nome (opcional)": "Name (optional)",
	Nome: "Name",
	Fixar: "Pin",
	"Fixar site, repo ou app": "Pin a site, repo or app",
	"Fixar na lateral": "Pin to the sidebar",
	"{n} issues dos agents": "{n} issues from agents",
	"Issue de um agent": "Issue from an agent",
	"foi pro terminal": "went to the terminal",
	"Aprovado por {who}": "Approved by {who}",
	"Negado por {who}": "Denied by {who}",
	"Aprovar este pedido?": "Approve this request?",
	Aprovar: "Approve",
	Negar: "Deny",
	Confirmar: "Confirm",
	"Negar este pedido?": "Deny this request?",
	"{via} de {who}": "{who}'s {via}",
	"O agent de quem pegar a tarefa também vê isso.": "Whoever's agent picks up the task sees this too.",
	agora: "now",
	"Tema automático (do sistema)": "Automatic theme (system)",
	"Tema claro": "Light theme",
	"Tema escuro": "Dark theme",
	azul: "blue",
	verde: "green",
	amarelo: "yellow",
	laranja: "orange",
	rosa: "pink",
	roxo: "purple",
	"mensagens novas": "new messages",
	"agents escreveram": "agents wrote",
	"um agent está trabalhando aqui": "an agent is working here",
	"1 coisa esperando você": "1 thing waiting on you",
	"{n} coisas esperando você": "{n} things waiting on you",
	"Voltar pra sala principal": "Back to the main thread",
	"Seus vibebooks": "Your vibebooks",
	"{theme} (clique pra trocar)": "{theme} (click to change)",
	"Tema: {theme}": "Theme: {theme}",
	"Ir para um vibebook (⌘K)": "Go to a vibebook (⌘K)",
	"Ir para um vibebook": "Go to a vibebook",
	"Ir para um vibebook…": "Go to a vibebook…",
	"Novo vibebook": "New vibebook",
	"sem cor": "no color",
	"Trocar ícone…": "Change icon…",
	"Tirar ícone": "Remove icon",
	"Não deu pra usar essa imagem.": "Couldn't use that image.",
	"1 pessoa": "1 person",
	"{n} pessoas": "{n} people",
	"ativa agora": "active now",
	"ativa há {ago}": "active {ago} ago",
	"Nada com esse nome.": "Nothing by that name.",
	Entrar: "Sign in",
	"Seus vibebooks e seus amigos te esperando.": "Your vibebooks and your friends are waiting.",
	"Continuar com GitHub": "Continue with GitHub",
	"Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.": "That didn't work with GitHub (it needs a verified primary email). Try email.",
	"Continuar com Google": "Continue with Google",
	"ou com email": "or with email",
	"Seu email": "Your email",
	"voce@gmail.com": "you@gmail.com",
	"Mandar código": "Send code",
	"Confere seu email": "Check your email",
	"Mandamos um código de 6 dígitos para <b>{email}</b>.": "We sent a 6-digit code to <b>{email}</b>.",
	Código: "Code",
	"usar outro email": "use another email",
	"Algo deu errado. Tenta de novo.": "Something went wrong. Try again.",
	"Não deu certo com o Google. Tenta com email.": "Google sign-in didn't work. Try with email.",
	Outros: "Other",
	Áudios: "Audio",
	"só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.": "only images (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv and audio.",
	"áudio maior que 50MB.": "audio larger than 50MB.",
	Tudo: "All",
	"{n} versões": "{n} versions",
	"Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.": "No token here: if the server asks for a sign-in, each person signs in with their own account, and vibebook only says who they are and from which room.",
	"Da sala: todo mundo vê; cada um entra com a própria conta": "Room: everyone sees it; each one signs in with their own account",
	"Você entrou em {host} com a sua conta.": "You're signed in to {host} with your account.",
	Sair: "Sign out",
	"Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.": "Sign in to {host} with your account to use it. vibebook keeps no token: it only says who you are and from which room.",
	"Entrar em {host}": "Sign in to {host}",
	"Conectar seu agente": "Connect your agent",
	"Copiar prompt": "Copy prompt",
	"Copiado. Cole no Claude Code, dentro da pasta do projeto.": "Copied. Paste it into Claude Code, inside the project folder.",
	"Copie e cole no seu Claude Code:": "Copy and paste into your Claude Code:",
	"Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.": "Paste the prompt into your Claude Code: it installs the plugin and the CLI and joins here.",
	"Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.": "Paste into Claude Code (or another agent), inside the project folder: it installs the plugin and the CLI and joins this room.",
	Versão: "Version",
	"mais nova": "newest",
	"Arquivos deste épico": "Files in this epic",
	Imagens: "Images",
	"Texto e CSV": "Text and CSV",
	"Nada aqui.": "Nothing here.",
	"1 arquivo": "1 file",
	"{n} arquivos": "{n} files",
	"Ver o texto": "Show the text",
	"Esconder o texto": "Hide the text",
	"Mudar seu nome": "Change your name",
	Tema: "Theme",
	Sair: "Sign out",
	"O que você quer resolver?": "What do you want to get done?",
	"Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.": "A request, an idea, a task for someone… I'll find the right room and epic.",
	"Achar a sala →": "Find the room →",
	"Como seus amigos te chamam?": "What do your friends call you?",
	"O pessoal e os agents vão te chamar assim.": "People and agents will call you that.",
	"Seu nome": "Your name",
	Salvar: "Save",
	"Coloque sua foto": "Add your photo",
	"Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).": "So people can tell at a glance when it's you talking, and when it's your agent (✻).",
	"Adicionar foto": "Add photo",
	"Oi, {name}": "Hi, {name}",
	amigo: "friend",
	amigos: "friends",
	Arquivo: "Archive",
	"Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.": "No vibebooks yet. Create one, invite the people you work with and connect your agent on the side.",
	Arquivar: "Archive",
	"Arquivar {title}": "Archive {title}",
	"Ainda sem resumo. O @vibe escreve um quando a conversa andar.": "No summary yet. @vibe writes one once the conversation gets going.",
	Amigos: "Friends",
	"vibebook junto": "shared vibebook",
	"vibebooks juntos": "shared vibebooks",
	"na plataforma": "on vibebook",
	convidado: "invited",
	"Remover {email} dos amigos": "Remove {email} from friends",
	"Remover dos amigos": "Remove from friends",
	"Quem você convida para um vibebook vira amigo aqui.": "People you invite to a vibebook show up here as friends.",
	"email do amigo": "friend's email",
	"Email do amigo": "Friend's email",
	Convidar: "Invite",
	"Seu perfil": "Your profile",
	Novo: "New",
	"O que você quer resolver? Eu acho a sala e o épico certos.": "What do you want to get done? I'll find the right room and epic.",
	Notificações: "Notifications",
	"Seu nome:": "Your name:",
	"Remover {email} dos seus amigos? Os vibebooks em comum continuam.": "Remove {email} from your friends? Shared vibebooks stay.",
	"Enviando…": "Sending…",
	"Procurando a sala certa…": "Finding the right room…",
	"sala nova <b>“{title}”</b>": "new room <b>“{title}”</b>",
	"Mandar em {where}?": "Send to {where}?",
	"Criar {where}?": "Create {where}?",
	"Nenhuma sala parece a certa. Criar {where}?": "No room looks right. Create {where}?",
	Enviar: "Send",
	"esperando {who}": "waiting on {who}",
	Cancelar: "Cancel",
	"Outro lugar:": "Somewhere else:",
	"Arquivar “{title}”?": "Archive “{title}”?",
	"Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.": "It leaves your list and your agent's inbox and goes to the <b>Archive</b>. Nothing is deleted: everyone else in the room still sees it, and you can restore it anytime.",
	"Salas que você arquivou. Elas continuam existindo pra quem está nelas.": "Rooms you archived. They're still there for everyone else in them.",
	Voltar: "Back",
	"arquivada {ago}": "archived {ago} ago",
	abrir: "open",
	Restaurar: "Restore",
	"Nada arquivado.": "Nothing archived.",
	"conectado {ago}": "connected {ago} ago",
	"Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>": "Ask your agent: <i>“what's new on vibebook?”</i> or <i>“go to room X and tell Marina…”</i>",
	"Seus agents conectados": "Your connected agents",
	"usado {ago}": "used {ago}",
	"sem uso ainda": "not used yet",
	"uso desconhecido": "last use unknown",
	"Marcar todas menos a mais recente de cada": "Check all but the newest of each",
	"Remover selecionadas ({n})": "Remove selected ({n})",
	"Remover {n} conexões? Os agents delas perdem o acesso na hora.": "Remove {n} connections? Their agents lose access right away.",
	"Esperando você": "Waiting on you",
	"Tarefa sua esperando OK:": "Your task waiting for OK:",
	"Já resolvi (respondi em outro lugar, ou não é comigo)": "Done (I answered elsewhere, or it's not for me)",
	"Seu agent conectou.": "Your agent is connected.",
	"Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo.": "It can already see this room. Turn it on here with ✻ Turn on agent at the top.",
	"Ele já enxerga as suas salas.": "It can already see your rooms.",
	"Traga seu agent pra esta sala": "Bring your agent to this room",
	"Conecte seu agent": "Connect your agent",
	"Conecte sua conta do Claude": "Connect your Claude account",
	"O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:": "vibebook works with each person's own agent: it reads the room, talks to the other people's agents and asks you before acting. Paste this into <b>Claude Code</b>, inside the project folder:",
	Copiar: "Copy",
	"esperando seu agent conectar…": "waiting for your agent to connect…",
	"Claude.ai ou outro cliente": "Claude.ai or another client",
	"Configurações → Conectores → Adicionar conector personalizado, e cole": "Settings → Connectors → Add custom connector, and paste",
	"Claude Code só com o conector:": "Claude Code with just the connector:",
	"Passo a passo completo →": "Full step-by-step →",
	Copiado: "Copied",
	"Como você entra": "How you sign in",
	"Seu perfil: email, como você entra, sair": "Your profile: email, how you sign in, sign out",
	"Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.": "Google and GitHub sign in to the account of their email: a different email is a different account.",
	"último {d} · {n}×": "last {d} · {n}×",
	"Código por email": "Email code",
	"sempre funciona": "always works",
	"ainda não usou": "not used yet",
	"Link de convite": "Invite link",
	"Essa mensagem não tem texto pra copiar.": "This message has no text to copy.",
	"O navegador pediu um toque pra copiar.": "The browser wants a tap to copy.",
	"Copiar o texto desta mensagem": "Copy this message's text",
	"Não deu pra copiar: selecione o texto e copie.": "Couldn't copy: select the text and copy it.",
	"Selecione e copie": "Select and copy",
	Carregando: "Loading",
	"Você foi removido deste vibebook.": "You were removed from this vibebook.",
	"seus vibebooks": "your vibebooks",
	"Sem acesso a este vibebook. Peça para alguém de dentro te convidar.": "No access to this vibebook. Ask someone in it to invite you.",
	voltar: "back",
	"pensando ({mode})": "thinking ({mode})",
	"Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.": "Not sent: it looks like {reason}. Secrets don't go in the room, not for you and not for the agents. Use a secure channel.",
	"escolhendo o modelo": "picking the model",
	rápido: "fast",
	"com calma": "careful",
	"Notificações ligadas: clique pra silenciar": "Notifications on: click to mute",
	"Notificações silenciadas: clique pra ligar": "Notifications muted: click to turn on",
	"Ativar notificações de mensagem": "Turn on message notifications",
	"Notificações bloqueadas no navegador": "Notifications blocked in this browser",
	"Este navegador não tem notificações": "This browser doesn't support notifications",
	"As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página.": "Notifications are blocked for vibebook.dev in this browser. Click the lock next to the address → Notifications → Allow, and reload the page.",
	"Te mencionaram": "You were mentioned",
	"respondendo…": "replying…",
	anexo: "attachment",
	"Abrir documento": "Open document",
	"Fechar documento": "Close document",
	Renomear: "Rename",
	"Trocar de conversa": "Switch conversation",
	"Trocar de sala": "Switch room",
	"Ir pro seu agent desta sala no herdr": "Go to your agent for this room in herdr",
	"Ir pro seu agent no herdr": "Go to your agent in herdr",
	"Quadro de tarefas (kanban)": "Task board (kanban)",
	Quadro: "Board",
	"mostrar/ocultar documento": "show/hide doc",
	Mencionar: "Mention",
	"Anexar, mencionar, votação": "Attach, mention, poll",
	"Mais opções": "More options",
	"Anexar arquivo": "Attach file",
	"ou Cmd+V": "or Cmd+V",
	"Mencionar alguém": "Mention someone",
	"Criar votação": "Create poll",
	"Mensagem…": "Message…",
	"Redimensionar documento": "Resize doc",
	Arquivos: "Files",
	Decisões: "Decisions",
	"Modo do documento": "Doc mode",
	Ver: "View",
	"Seu agent espera você": "Your agent is waiting for you",
	"em {where}": "in {where}",
	Editar: "Edit",
	"O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.": "The vibebook's doc. Everyone edits it; @vibe keeps it up to date with the decisions.",
	"Nova votação": "New poll",
	"Pergunta (ex.: Qual cruzeiro?)": "Question (e.g. Which cruise?)",
	opção: "option",
	"cada pessoa pode escolher várias": "each person can pick several",
	"Remover anexo": "Remove attachment",
	"maior que 10MB.": "larger than 10MB.",
	falhou: "failed",
	"sem conexão": "offline",
	"Opção {n}": "Option {n}",
	"Coloque pelo menos 2 opções.": "Add at least 2 options.",
	"Encerrar a votação?": "Close the poll?",
	"Bem-vindo a <b>{room}</b>": "Welcome to <b>{room}</b>",
	"esta sala": "this room",
	"{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.": "{owner} invited you here. Every important conversation gets a room on vibebook: the chat, the tasks and the project doc live together.",
	"Cada um traz o seu agent": "Everyone brings their own agent",
	"Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.": "You connect your agent, on your computer and with your permissions. It reads the room, picks up tasks, updates the epics and reports what it delivered. Only what <b>you</b> write is an instruction to it: everything else it reads as context.",
	"O contexto é de todo mundo": "The context is shared",
	"Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.": "Doc, files, decisions and tasks live in the room, and every agent reads the same context before acting. When someone hands off or is waiting on you, the room shows it.",
	"Conecte o seu agent": "Connect your agent",
	"Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.": "Paste this into <b>Claude Code</b>, inside the project folder. It installs vibebook, joins this room and listens.",
	Pular: "Skip",
	"Entrar na sala": "Enter the room",
	Próximo: "Next",
	"Seu agent já está conectado.": "Your agent is already connected.",
	"Ligue ele nesta sala com ✻ Ligar agent, no topo.": "Turn it on in this room with ✻ Turn on agent, at the top.",
	"Não consegui ler essa imagem.": "Couldn't read that image.",
	"Abrir menu": "Open menu",
	"Novo épico": "New epic",
	"{n} pedindo pra entrar": "{n} asking to join",
	"O @vibe sugere um épico": "@vibe suggests an epic",
	"Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo.": "It saw this in the conversation and thinks it's worth an epic, with the tasks below.",
	"Tarefas propostas": "Proposed tasks",
	"Criar épico": "Create epic",
	"Pedir pro meu agent": "Ask my agent",
	"Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.": "It becomes your request in the room: your agent checks it still makes sense, adjusts the doc and tasks and creates the epic.",
	Descartar: "Dismiss",
	"a pasta onde ele já abriu antes": "the folder where it opened before",
	"ligada a esta sala pelo arquivo .vibebook": "linked to this room by its .vibebook file",
	"a pasta com o nome da sala": "the folder named after the room",
	"pasta nova com o nome da sala, criada ao ligar": "a new folder named after the room, created when you turn it on",
	ouvindo: "listening",
	"não ouvindo": "not listening",
	"Ligar agent": "Turn on agent",
	"Abre em {path} ({how}).": "Opens in {path} ({how}).",
	"pasta da sala": "room folder",
	"Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar.": "On, but none of your agents is listening to this room right now: it may be starting, busy with another task (vibebook herdr asks it to listen once it's free), or vibebook herdr isn't running. Click to turn off.",
	"Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada).": "Your agent is on in this room. Click to turn off (closes its tab in herdr; the conversation can be resumed).",
	"Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina.": "Opens a Claude Code of yours for this room in herdr, listening for messages. Needs vibebook herdr running on your machine.",
	"O vibebook herdr não está rodando nesta máquina.": "vibebook herdr isn't running on this machine.",
	"em {repo}": "in {repo}",
	"ouvindo todas as salas agora": "listening to every room now",
	"{p}% · reseta {at}": "{p}% · resets {at}",
	Contexto: "Context",
	"Sessão de 5h": "5-hour session",
	Semana: "Week",
	"ouvindo esta sala agora": "listening to this room now",
	"visto há {ago}": "seen {ago} ago",
	"está trabalhando nisso": "is working on this",
	"estão trabalhando nisso": "are working on this",
	"O andamento e a entrega aparecem aqui nesta thread.": "Progress and the delivery show up here in this thread.",
	"Alguém está esperando você aqui": "Someone is waiting on you here",
	"{n} coisas esperando você aqui": "{n} things waiting on you here",
	arquivado: "archived",
	"{who} está trabalhando aqui": "{who} is working here",
	"{who} está trabalhando": "{who} is working",
	"Recolher menu": "Collapse menu",
	"novo épico": "new epic",
	Arquivados: "Archived",
	Outro: "Other",
	"escolha e envie pela caixa de mensagem": "pick, then send from the message box",
	Todos: "All",
	"Esse épico não existe mais nesta sala.": "That epic is no longer in this room.",
	"Novo épico: escreva o título…": "New epic: type its title…",
	Épicos: "Epics",
	"Buscar salas, conversas e arquivos…": "Search rooms, conversations and files…",
	"Buscando nas conversas…": "Searching conversations…",
	"Nada nas conversas.": "Nothing in the conversations.",
	"Nas conversas": "In conversations",
	editar: "edit",
	Buscar: "Search",
	"Exigir Face ID ao abrir": "Require Face ID to open",
	"Pronto: o vibebook pede Face ID ao abrir neste aparelho.": "Done: vibebook asks for Face ID when it opens on this device.",
	"Face ID desligado neste aparelho.": "Face ID turned off on this device.",
	"Não deu pra usar o Face ID aqui.": "Couldn't use Face ID here.",
	"vibebook (trava do app)": "vibebook (app lock)",
	"Desbloquear com Face ID": "Unlock with Face ID",
	"Toque pra tentar de novo.": "Tap to try again.",
	"Conecte seu agent (o card acima diz como)": "Connect your agent (the card above shows how)",
	"Seu agent está aqui": "Your agent is here",
	"Seu agent está desligado nesta sala": "Your agent is off in this room",
	Ligar: "Turn on",
	"Começando a sala": "Starting the room",
	"Sala criada": "Room created",
	"Na sala: {who}": "In the room: {who}",
	"Só você aqui: convide em Pessoas": "Only you here: invite people in People",
	"O agent escreve o doc e cria os épicos": "Agent writes the doc and creates the epics",
	"Não achei {who} nos seus amigos: convide pelo email em Pessoas.": "Couldn't find {who} among your friends: invite them by email in People.",
	"O que é e com quem?": "What is it, and with whom?",
	"Ex.: viagem de avião pra SP com os dogs, eu e a Alexia": "E.g.: flying to São Paulo with the dogs, me and Alexia",
	"Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.": "It becomes the room's title and first message. Whoever you mention is invited, and your agent turns on in the room.",
	Criar: "Create",
	"Criando…": "Creating…",
	"Verificado em prod": "Verified in prod",
	"No ar, falta verificar em prod": "Live, not yet verified in prod",
	"No ar": "Live",
	"Falta o agent verificar em prod.": "Agent hasn't verified it in prod yet.",
	"Agent fez": "Agent did it",
	"@vibe sugere": "@vibe suggests",
	"sugestão do @vibe, clique para ver": "suggested by @vibe, click to see",
	"Pedindo pra entrar": "Asking to join",
	"pediu {ago}": "asked {ago} ago",
	"Liberar: entra na sala e recebe o link por email": "Let in: joins the room and gets the link by email",
	liberar: "let in",
	"Recusar {email}": "Decline {email}",
	Recusar: "Decline",
	Pessoas: "People",
	pendente: "pending",
	"Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp": "Copy the invite message (room link + agent setup) to send on WhatsApp",
	copiar: "copy",
	"Convidada(o), ainda não entrou": "Invited, hasn't joined yet",
	reenviar: "resend",
	"Remover {email}": "Remove {email}",
	"Cancelar convite": "Cancel invite",
	"Remover do vibebook": "Remove from vibebook",
	"Seus amigos": "Your friends",
	"sua tarefa esperando OK": "your task waiting for OK",
	"{who} pediu": "{who} asked",
	"{n} esperando você": "{n} waiting on you",
	"+{n} mais": "+{n} more",
	"{n} offline": "{n} offline",
	"Adicionar {email}": "Add {email}",
	"convidar por email": "invite by email",
	"Cancelar o convite de {email}?": "Cancel {email}'s invite?",
	"Remover {email} deste vibebook?": "Remove {email} from this vibebook?",
	"Não deu para remover.": "Couldn't remove.",
	"Recusar o pedido de {email}?": "Decline {email}'s request?",
	"{email} entrou na sala e recebeu o link por email.": "{email} joined the room and got the link by email.",
	enviado: "sent",
	"Não deu para salvar a foto.": "Couldn't save the photo.",
	"Não deu para ler essa imagem.": "Couldn't read that image.",
	"Te convidei pro vibebook \"{title}\": {url}": "I invited you to the vibebook \"{title}\": {url}",
	"1. Entra com {email} (o convite chegou nesse email).": "1. Sign in with {email} (the invite went to that address).",
	"2. Manda isto pro seu Claude Code:": "2. Send this to your Claude Code:",
	"Convite enviado por email para <b>{email}</b>.": "Invite emailed to <b>{email}</b>.",
	"Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.": "Copied the message with the room link and the agent setup for {name}: paste it in WhatsApp.",
	"Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.": "Couldn't copy. Use \"copy\" next to {email} in People.",
	"A fazer": "To do",
	Fazendo: "Doing",
	"Esperando OK": "Waiting for OK",
	Feito: "Done",
	"Arraste, ou use ← →. Clique pra abrir o épico.": "Drag, or use ← →. Click to open the epic.",
	você: "you",
	"Nada a fazer.": "Nothing to do.",
	"Arraste um card pra cá.": "Drag a card here.",
	"nova tarefa": "new task",
	"Nova tarefa": "New task",
	Épico: "Epic",
	"Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.": "No epics or tasks yet. Create an epic in the sidebar, or ask your agent to organize the project into epics and tasks.",
	"sugestão do @vibe": "suggested by @vibe",
	"Clique para renomear": "Click to rename",
	"Desarquivar épico": "Unarchive epic",
	"Arquivar épico (concluído)": "Archive epic (done)",
	"Arquivar épico": "Archive epic",
	"Apagar épico": "Delete epic",
	esperando: "waiting on",
	"Ver as tasks abertas": "See open tasks",
	"Esperando {who}": "Waiting on {who}",
	"esperando OK": "waiting for OK",
	fazendo: "doing",
	"a fazer": "to do",
	"Nome do épico:": "Epic name:",
	"Nome do vibebook:": "Vibebook name:",
	"Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.": "Delete the epic \"{title}\", its tasks and its discussion? This can't be undone.",
	Tarefas: "Tasks",
	Feita: "Done",
	"Clique para editar": "Click to edit",
	Responsável: "Owner",
	"sem dono": "no owner",
	Prazo: "Due date",
	"Apagar task": "Delete task",
	"nova task": "new task",
	"Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:": "Due (e.g. Fri, Wed 11pm, 11/06). Empty removes it:",
	"Abrir numa aba": "Open in a tab",
	Fechar: "Close",
	"Seu agent está ouvindo esta sala.": "Your agent is listening to this room.",
	"Seu agent ainda não está ouvindo.": "Your agent isn't listening yet.",
	"Abrindo seu agent no seu computador…": "Opening your agent on your computer…",
	"Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá.": "Check that vibebook herdr is running on your computer, or whether agent stopped at a question there.",
	"O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.": "vibebook herdr opens Claude Code in the room's folder; it takes a few seconds.",
	"Seu agent não está nesta sala.": "Your agent isn't in this room.",
	"1 pessoa votou": "1 person voted",
	"{n} pessoas votaram": "{n} people voted",
	"pode escolher várias": "pick several",
	"escolha uma": "pick one",
	encerrada: "closed",
	encerrar: "close",
	concluído: "done",
	"{d}/{n} tarefas": "{d}/{n} tasks",
	"1 resposta": "1 reply",
	"{n} respostas": "{n} replies",
	"última há {ago}": "last {ago} ago",
	"Escreva aqui pra continuar: ele reabre.": "Write here to keep going: it reopens.",
	votação: "poll",
	"Abrir em tela cheia": "Open full screen",
	Tabela: "Table",
	"Ver a mensagem respondida": "See the message being replied to",
	"mensagem anterior": "earlier message",
	"Respondendo a <b>{who}</b>": "Replying to <b>{who}</b>",
	"Cancelar resposta": "Cancel reply",
	"Essa mensagem está mais acima: role o chat pra carregar.": "That message is further up: scroll the chat to load it.",
	"pensando…": "thinking…",
	Responder: "Reply",
	"Responder a esta mensagem": "Reply to this message",
	"Escrito pelo agent dessa pessoa, em nome dela": "Written by this person's agent, on their behalf",
	"Reporta algo entregue": "Reports something delivered",
	entregue: "delivered",
	aprovado: "approved",
	decidido: "decided",
	"Apagar registro": "Delete entry",
	"O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.": "What the room decides and every approval show up here. The agents log them as the conversation goes.",
	"Apagar esse registro?": "Delete this entry?",
	Lembretes: "Reminders",
	"Texto do lembrete": "Reminder text",
	"Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.": "An upload of this reminder is still in progress. Wait before saving again.",
	"Não recebi a confirmação do agendamento. Confira antes de tentar de novo.": "Scheduling confirmation has not arrived. Check before trying again.",
	"Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.": "When the reminder runs, @vibe posts its text here for your agent.",
	"Aguardando confirmação…": "Waiting for confirmation…",
	"Ainda não recebi a confirmação. Confira antes de tentar de novo.": "Confirmation has not arrived yet. Check before trying again.",
	"(pelo agent)": "(through their agent)",
	"quer usar": "wants to use",
	"abrir um link": "open a link",
	"ver todas ({n})": "see all ({n})",
	"só as telas": "screens only",
	"Esta sala": "This room",
	"Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.": "A room app is an HTML file in apps/ that uses the room through its iframe: it reads the doc, tasks and messages, posts and moves tasks (with your OK). Ask your agent: “make an app apps/poll.html for this room”.",
	"Este app quer {what}, como você:": "This app wants to {what}, as you:",
	Permitir: "Allow",
	postar: "post",
	"criar uma tarefa": "add a task",
	"mover uma tarefa": "move a task",
	"usar {tool} em {conn}": "use {tool} on {conn}",
	Conexões: "Connections",
	minha: "mine",
	"da sala": "room's",
	"Carregando…": "Loading…",
	"Conectar MCP": "Connect MCP",
	"URL do servidor MCP": "MCP server URL",
	"Da sala: todo mundo usa junto": "Room's: everyone uses it together",
	"Só minha: só eu e meus agents": "Only mine: just me and my agents",
	Atualizar: "Refresh",
	"Remover conexão": "Remove connection",
	"{n} tools, nenhum app": "{n} tools, no app",
	"Conectando…": "Connecting…",
	"Remover a conexão {name}? Os apps dela saem da sala.": "Remove the connection {name}? Its apps leave the room.",
	"Esse app não está nas conexões que você pode usar nesta sala.": "That app isn't in the connections you can use in this room.",
	Recarregar: "Reload",
	"próximo {when}": "next {when}",
	"de {who}": "by {who}",
	"Apagar lembrete": "Delete reminder",
	"rodou {n}×": "ran {n}×",
	"Apagar este lembrete?": "Delete this reminder?",
	"nome, ex.: relatorio-diario": "name, e.g. daily-report",
	"Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou.": "Say when and what. E.g.: Every day at 8am: pull yesterday's numbers and post here what changed.",
	"Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz.": "Each reminder is a file <code>reminders/&lt;name&gt;.md</code>: the text says when to run and what to do. At that time @vibe posts the text here and the agent of whoever saved it does it.",
	"Novo lembrete": "New reminder",
	"O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:": "The sandbox runs on your freestyle.sh account. Create one there and make an API key in your terminal:",
	"Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.": "Paste the key here. It's kept encrypted in vibebook and never goes to the room or to agents.",
	"No seu terminal, rode:": "In your terminal, run:",
	"Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.": "Paste the token (sk-ant-…) here: the sandbox's Claude starts logged in to your subscription. It's kept encrypted, like the freestyle key. Without it, run /login in the sandbox terminal.",
	"Rodando setup… (até 4 min)": "Running setup… (up to 4 min)",
	"espera você no terminal": "waiting for you in the terminal",
	"Tirar da fila (já resolvido)": "Take out of the queue (already handled)",
	"mostrar menos": "show less",
	"mostrar mais {n}": "show {n} more",
	"sandbox na nuvem rodando": "cloud sandbox running",
	"Claude conectado: sandboxes novos já sobem logados": "Claude connected: new sandboxes start logged in",
	"seu agent no sandbox": "your agent in the sandbox",
	"Quadro de tarefas": "Task board",
	"Nova versão do vibebook · toque pra atualizar": "New vibebook version · tap to update",
	"Seu agent espera você no terminal": "Your agent is waiting for you in the terminal",
	feito: "done",
	Lista: "List",
	"Todos os épicos": "All epics",
	"Sem épico": "No epic",
	"Nenhuma tarefa aberta.": "No open tasks.",
	"Escolha um épico.": "Choose an epic.",
	"Épico não encontrado.": "Epic not found.",
	Status: "Status",
	"Sair de todos os aparelhos": "Sign out everywhere",
	"Sai em todos os navegadores e celulares onde você entrou": "Signs you out of every browser and phone you signed in on",
	"Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.": "Sign out everywhere? Every browser and phone you signed in on will ask you to log in again, this one too. Your connected agents stay.",
	remover: "remove",
	"Conecte seu Claude": "Connect your Claude",
	"Salvando…": "Saving…",
	"Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.": "Remove the Claude token? Sandboxes that already have it stay logged in until you delete them.",
	"sala principal": "main room",
	épico: "epic",
	"Fila do seu agent: {n}": "Your agent's queue: {n}",
	"Seu agent está livre": "Your agent is free",
	"Fila do seu agent": "Your agent's queue",
	"espera você": "waiting for you",
	fazendo: "doing",
	"na fila": "queued",
	"Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.": "Nothing queued: everything you asked in this room in the last 48h was done or answered.",
	"Rodar o setup de novo": "Run the setup again",
	"Refazer setup": "Redo setup",
	"ligado · trabalhando agora": "on · working now",
	"Pessoas e agents": "People & agents",
	"gasto até agora na sua conta do freestyle": "spent so far on your freestyle account",
	"freestyle.sh conectado": "freestyle.sh connected",
	desconectar: "disconnect",
	"{who} espera você no terminal": "{who} is waiting for you in the terminal",
	"Na nuvem": "In the cloud",
	"carregando…": "loading…",
	"Conecte sua conta do freestyle.sh": "Connect your freestyle.sh account",
	"API key do freestyle": "freestyle API key",
	"Conferindo…": "Checking…",
	Conectar: "Connect",
	"preparando (uns 3 min)…": "setting up (about 3 min)…",
	Terminal: "Terminal",
	Pausar: "Pause",
	Retomar: "Resume",
	"Apagar sandbox": "Delete sandbox",
	"Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.": "An agent in the cloud for this room, set up by agents/&lt;name&gt;.md in the files. Running costs about US$0.13/hour on your account; paused, only the disk.",
	"Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.": "Disconnect your freestyle.sh account? The sandboxes stay there, but vibebook can no longer start, pause or open their terminal.",
	"Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.": "Delete this sandbox? The VM and everything in it are gone from freestyle.sh.",
	"conectando…": "connecting…",
	conectado: "connected",
	terminou: "ended",
	"desconectado: feche e abra de novo": "disconnected: close and open again",
	rodando: "running",
	ligando: "starting",
	pausando: "pausing",
	pausado: "paused",
	parado: "stopped",
	"apagado no freestyle": "deleted on freestyle",
	"Seus agents nesta sala": "Your agents in this room",
	"Claude Code no seu computador": "Claude Code on your computer",
	"ligado · ouvindo esta sala": "on · listening to this room",
	"ligado · ainda não está ouvindo": "on · not listening yet",
	desligado: "off",
	"pasta nova": "new folder",
	"Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.": "Opens (or closes) a Claude Code of yours for this room through vibebook herdr, on your machine.",
	Conectados: "Connected",
	"Criar sandbox": "Create sandbox",
	Pronto: "Done",
	"Documento e arquivos da sala": "Room doc and files",
	Ligado: "On",
	ligado: "on",
	"Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.": "No reminders yet. Click New reminder, or ask your agent: “every day at 8am, send me a summary of what changed”.",
	"Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.": "Paste an image in the chat (Cmd+V), drag a file in or use the clip. Everything shared in this vibebook lands here.",
	"Carregar mensagens anteriores": "Load earlier messages",
	"Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.": "Start the conversation. The agents on in this room read and reply; yours acts with your OK. E.g. <i>organize the project into epics: new site, rentals and domain</i>.",
	"Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.": "This epic's discussion. The agents read the tasks, the doc and the main room.",
	"ver na sala principal": "see in the main room",
	"{who} está fazendo isso": "{who} is on it",
	"{who} fez isso": "{who} did it",
	"aguardando {who}": "waiting on {who}",
	"{who} parou": "{who} stopped",
	"lido por {who}": "read by {who}",
	"entregue, ainda não lido por {who}": "delivered, not yet read by {who}",
	"Diagrama com erro": "Diagram error",
	"na linha {n}": "on line {n}",
	"Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.": "Empty doc. Click <b>Edit</b> or ask your agent to summarize the decisions here.",
	"@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).": "@vibe reviewed this doc. Everyone's agent gets this too (doc_notes)."
}, b = (e, t) => {
	let n = y === "en" && ct[e] !== void 0 ? ct[e] : e;
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}, lt = () => `<span class="langSw" role="group" aria-label="Idioma / Language">${["pt", "en"].map((e) => `<button type="button" class="${y === e ? "sel" : ""}" data-lang="${e}" aria-pressed="${y === e}">${e.toUpperCase()}</button>`).join("<i>·</i>")}</span>`;
document.addEventListener("click", (e) => {
	let t = e.target.closest?.("[data-lang]");
	t && t.dataset.lang !== y && (document.cookie = `vb_lang=${t.dataset.lang}; path=/; max-age=31536000; samesite=lax`, location.reload());
});
var x = document.getElementById("app"), S = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), ut = [
	"#ff5a36",
	"#1f9d8a",
	"#3b6cf6",
	"#c2410c",
	"#9333ea",
	"#0f766e",
	"#be185d",
	"#4d7c0f"
], dt = (e) => ut[[...e].reduce((e, t) => e + t.charCodeAt(0), 0) % ut.length], ft = {}, C = (e) => e === "ai" ? "@vibe" : N?.names?.[e] || ft[e] || e.split("@")[0], pt = {}, mt = (e, t) => {
	if (e === "ai") return "<span class=\"avatar ai\">✦</span>";
	let n = N?.avatars?.[e] ?? pt[e];
	return n ? `<span class="avatar pic ${t ? "on" : ""}" title="${S(C(e))}"><img src="/api/avatar/${encodeURIComponent(e)}?v=${n}" alt="" loading="lazy" /></span>` : `<span class="avatar ${t ? "on" : ""}" style="background:${dt(e)}" title="${S(C(e))}">${S(C(e).slice(0, 2).toUpperCase())}</span>`;
}, ht = (e) => {
	let t = String(e || "");
	return /codex|gpt|openai|\bo[1-9]\b/i.test(t) ? ["codex", "◎"] : /gemini/i.test(t) ? ["gemini", "✦"] : /cursor/i.test(t) ? ["cursor", "▲"] : /copilot/i.test(t) ? ["copilot", "◉"] : ["", "✻"];
}, w = (e) => {
	let t = Math.round((Date.now() - e) / 6e4);
	return t < 1 ? b("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
}, gt = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, ""), _t = (e) => {
	let t = e.split("@")[0];
	return [
		gt(N?.names?.[e]?.split(/\s+/)[0] || ft[e]?.split(/\s+/)[0] || ""),
		gt(t.split(/[._+-]/)[0]),
		gt(t)
	].filter(Boolean);
}, vt = (e) => {
	let t = gt(e);
	return t === "vibe" || t === "ai" ? "ai" : (N?.members || []).find((e) => _t(e).includes(t)) || null;
}, yt = (e) => e.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (e, t, n) => {
	let r = vt(n);
	return r ? `${t}<span class="mention${r === N?.me ? " me" : ""}" title="${S(r === "ai" ? "@vibe" : r)}">@${n}</span>` : e;
}), bt = "<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>", T = async (e, t) => {
	let n = await fetch(e, t ? {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(t)
	} : {});
	if (n.status === 401) throw location.href = r(`/login?next=${encodeURIComponent(location.pathname + location.search)}`, location.href, "svelte"), Error("unauthenticated");
	if (!n.ok) throw Error((await n.json().catch(() => ({}))).error || n.statusText);
	return n.json();
}, xt = document.getElementById("switcher"), E = null, St = null, D = null, Ct = null, O = null, wt = () => {}, Tt = null, Et = [], Dt = (e) => e.some((e) => /^[ab]\d/.test(e.ref)) ? " cl" : "", Ot = {
	link: "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>",
	inbox: "<path d=\"M22 12h-6l-2 3h-4l-2-3H2\"/><path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"/>",
	grid: "<rect x=\"4\" y=\"4\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/><rect x=\"13.5\" y=\"4\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/><rect x=\"4\" y=\"13.5\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/><rect x=\"13.5\" y=\"13.5\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/>",
	search: "<circle cx=\"11\" cy=\"11\" r=\"7.5\"/><path d=\"m20.5 20.5-4-4\"/>",
	expand: "<path d=\"M15 3h6v6\"/><path d=\"M9 21H3v-6\"/><path d=\"m21 3-7 7\"/><path d=\"m3 21 7-7\"/>",
	plus: "<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>",
	pin: "<path d=\"M12 17v5\"/><path d=\"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z\"/>",
	x: "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>",
	check: "<path d=\"M20 6 9 17l-5-5\"/>",
	menu: "<path d=\"M4 6h16\"/><path d=\"M4 12h16\"/><path d=\"M4 18h16\"/>",
	list: "<path d=\"M3 6h.01\"/><path d=\"M3 12h.01\"/><path d=\"M3 18h.01\"/><path d=\"M8 6h13\"/><path d=\"M8 12h13\"/><path d=\"M8 18h13\"/>",
	sidebar: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"3\"/><path d=\"M9 3v18\"/>",
	back: "<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>",
	external: "<path d=\"M7 7h10v10\"/><path d=\"M7 17 17 7\"/>",
	board: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"3\"/><path d=\"M8 7v7\"/><path d=\"M12 7v4\"/><path d=\"M16 7v9\"/>",
	doc: "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M16 13H8\"/><path d=\"M16 17H8\"/><path d=\"M10 9H8\"/>",
	file: "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/>",
	mic: "<path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/><path d=\"M12 19v3\"/>",
	globe: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>",
	folder: "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/>",
	calendar: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><path d=\"M3 10h18\"/>",
	trash: "<path d=\"M3 6h18\"/><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/>",
	archive: "<rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\"/><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\"/><path d=\"M10 12h4\"/>",
	undo: "<path d=\"M9 14 4 9l5-5\"/><path d=\"M4 9h10.5a5.5 5.5 0 0 1 0 11H11\"/>",
	reply: "<path d=\"m9 17-5-5 5-5\"/><path d=\"M20 18v-2a4 4 0 0 0-4-4H4\"/>",
	copy: "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>",
	bell: "<path d=\"M10.27 21a2 2 0 0 0 3.46 0\"/><path d=\"M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33\"/>",
	bellOff: "<path d=\"M10.27 21a2 2 0 0 0 3.46 0\"/><path d=\"M17 17H4a1 1 0 0 1-.74-1.67C4.59 13.96 6 12.5 6 8a6 6 0 0 1 .26-1.74\"/><path d=\"m2 2 20 20\"/><path d=\"M8.67 3.01A6 6 0 0 1 18 8c0 2.69.77 4.65 1.71 6.05\"/>",
	camera: "<path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/>",
	plug: "<path d=\"M12 22v-5\"/><path d=\"M9 8V2\"/><path d=\"M15 8V2\"/><path d=\"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z\"/>",
	chart: "<path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>",
	trophy: "<path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/>",
	clock: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>",
	terminal: "<path d=\"m4 17 6-6-6-6\"/><path d=\"M12 19h8\"/>",
	alert: "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>",
	paperclip: "<path d=\"m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l8.6-8.6a4 4 0 0 1 5.7 5.7l-8.6 8.6a2 2 0 0 1-2.8-2.8l8.5-8.5\"/>",
	at: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\"/>",
	hand: "<path d=\"M18 11V6a2 2 0 0 0-4 0\"/><path d=\"M14 10V4a2 2 0 0 0-4 0v2\"/><path d=\"M10 10.5V6a2 2 0 0 0-4 0v8\"/><path d=\"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\"/>",
	arrowRight: "<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>",
	sun: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/>",
	moon: "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/>",
	chevronDown: "<path d=\"m6 9 6 6 6-6\"/>",
	chevronRight: "<path d=\"m9 18 6-6-6-6\"/>",
	pencil: "<path d=\"M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z\"/><path d=\"m15 5 4 4\"/>",
	contrast: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 17a5 5 0 0 0 0-10z\" fill=\"currentColor\"/>"
}, k = (e, t = 16) => `<svg class="i" viewBox="0 0 24 24" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ot[e]}</svg>`;
if (k("search", 18), `${[
	0,
	60,
	120
].map((e) => `<line x1="12" y1="3.5" x2="12" y2="20.5" transform="rotate(${e} 12 12)"/>`).join("")}`, k("plus", 18), window.visualViewport) {
	let e = () => {
		document.documentElement.style.setProperty("--vvh", `${Math.round(visualViewport.height)}px`), innerWidth <= 900 && scrollY && document.querySelector(".book") && scrollTo(0, 0);
	};
	visualViewport.addEventListener("resize", e), visualViewport.addEventListener("scroll", e), e();
}
var kt = {
	auto: {
		label: b("Tema automático (do sistema)"),
		next: "light",
		icon: k("contrast", 18)
	},
	light: {
		label: b("Tema claro"),
		next: "dark",
		icon: k("sun", 18)
	},
	dark: {
		label: b("Tema escuro"),
		next: "auto",
		icon: k("moon", 18)
	}
}, At = () => document.documentElement.dataset.theme || "auto";
function jt(e) {
	e === "auto" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	try {
		e === "auto" ? localStorage.removeItem("vb.theme") : localStorage.setItem("vb.theme", e);
	} catch {}
	Lt();
}
var Mt = (e) => e?.icon ? `/api/books/${e.id}/icon?v=${e.icon}` : null;
function Nt(e) {
	N && E?.seen(N.id, e);
}
var Pt = null, Ft = 0, A = () => Ye(location.pathname);
function It() {
	Pt || (Pt = We({
		url: () => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`,
		onAccount: () => E.observe({ kind: "account" }),
		onAgents: (e) => {
			E.observe({
				kind: "agents",
				book: e
			});
			let t = A(), n = M;
			n && (e === "*" || e === t) && (clearTimeout(Ft), Ft = setTimeout(() => {
				M === n && A() === t && rr();
			}, 600));
		},
		onConnected: () => {
			E.invalidate(), E.refresh(), E.refreshAgents(), M && N?.id === A() && rr();
		},
		onVisible: () => {
			E.invalidate(), E.refresh(), E.refreshAgents(), M && N?.id === A() && rr();
		},
		currentRoom: A,
		visible: () => document.visibilityState === "visible",
		listenVisibility: (e) => (document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e))
	}), Pt.start());
}
function j() {
	if (E) return;
	E = qe(Ke(), {
		onVersion: Ht,
		onUnauthorized: () => {
			location.href = r(`/login?next=${encodeURIComponent(location.pathname + location.search + location.hash)}`, location.href, "svelte");
		},
		onIdentityChange: () => {
			R?.dispose(), R = null, kn.clear(), G?.reset(), sn.reset(), I?.dispose(), I = null, Tt = null, Et = [], fn = [], ft = {}, pt = {}, wt(), D?.pageLeft(), St?.reset(), mn.clear(), B = {
				id: null,
				list: []
			}, V = {
				id: null,
				connected: null,
				list: [],
				busy: "",
				err: ""
			}, J = null, xi = null, Y = null, Si = !1, Ci.clear(), clearTimeout(Ft), clearTimeout(vr), M?.dispose(), M = null, N = null, Pt?.restart(), queueMicrotask(Bt);
		}
	}), St = Je(E), D = $e(E, St, {
		navigate: (e) => O.go(e),
		home: () => O.go("/app"),
		archived: () => O.go("/archived"),
		settings: Gt,
		rename: (e, t) => N?.id === e && A() === e ? M?.request({
			t: "title",
			title: t
		}) ?? Promise.resolve({
			ok: !1,
			error: b("sem conexão")
		}) : Promise.resolve({
			ok: !1,
			error: b("sem conexão")
		})
	}), O = Ze({
		current: () => location.href,
		history,
		beforeChange: () => {
			G?.closeNavigation(), Ce(), $t(), ri(), wt(), D.pageLeft();
		},
		document: (e) => {
			location.href = e;
		},
		consumePop: () => m(G, N ? {
			roomId: N.id,
			account: N.me,
			thread: P
		} : null, ii, location.href),
		deferNavigation: (e) => G?.deferNavigation(e) ?? !1,
		sameRoom: (e) => {
			if (!N || N.id !== e.roomId || !M || !x.querySelector(".book")) return !1;
			let t = e.thread || "main", n = t === "main" || N.epics.some((e) => e.id === t) ? t : "main";
			return e.messageId ? q(e.messageId, n) : e.fileId ? (P !== n && Pn(n), Wn(e.fileId)) : (Pn(n), e.document && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" })), ei.matches && ni("doc"))), Lt(), !0;
		},
		activate: () => Bt()
	});
	let e = null;
	E.state.subscribe(({ me: t }) => {
		if (!t || t === e) return;
		Ln.account(t.email);
		let n = JSON.stringify(Et);
		e = t, Tt = t.books, Et = t.waits, fn = t.friends.map((e) => e.email), ft = Object.fromEntries(t.friends.filter((e) => e.name).map((e) => [e.email, e.name])), pt = Object.fromEntries([...t.friends.filter((e) => e.avatar).map((e) => [e.email, e.avatar]), ...t.avatar ? [[t.email, t.avatar]] : []]), Lt(), It(), N && A() === N.id && (H(), n !== JSON.stringify(Et) && Q(!0), Qn(Kn()));
	}), E.start();
}
function Lt() {
	j(), en();
	let e = !!Tt && location.pathname !== "/login";
	if (document.body.classList.toggle("has-sw", e), D.syncPath(location.href), !e) {
		Ct?.destroy(), Ct = null, xt.replaceChildren();
		return;
	}
	let t = {
		controller: D,
		lang: y,
		theme: At(),
		ontheme: () => jt(kt[At()].next),
		onlanguage: (e) => {
			e !== y && (document.cookie = `vb_lang=${e}; path=/; max-age=31536000; samesite=lax`, location.reload());
		}
	};
	Ct ? Ct.update(t) : Ct = g("appNavigation", xt, t);
}
function Rt() {
	j(), D.openSearch(document.activeElement instanceof HTMLElement ? document.activeElement : void 0);
}
function zt() {
	return j(), {
		pwa: Ln,
		personal: E,
		rooms: St,
		lang: y,
		ago: w,
		onnavigate: (e) => O.go(e),
		onhome: () => O.go("/app"),
		onarchived: () => O.go("/archived"),
		onnew: (e) => D.openCreate(e),
		onsettings: Gt,
		onroomsettings: (e, t) => D.openSettings(e, t),
		onsearch: Rt
	};
}
function Bt() {
	j(), clearTimeout(Ft), clearTimeout(vr), ri(), G?.reset(), wt(), D.pageLeft(), _i = null, Ce(), $t(), jn(), Lt();
	let e = A();
	if (M?.dispose(), M = null, location.pathname === "/login") location.replace(location.href);
	else {
		if (location.pathname === "/archived") return Wt();
		if (e) return vn(e);
		location.pathname !== "/app" && location.pathname !== "/" ? location.replace(r("/app", location.href, "svelte")) : Ut();
	}
}
var Vt = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><path fill=\"#FFC107\" d=\"M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z\"/><path fill=\"#FF3D00\" d=\"M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z\"/><path fill=\"#4CAF50\" d=\"M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z\"/><path fill=\"#1976D2\" d=\"M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z\"/></svg>";
window.addEventListener("popstate", () => {
	j(), O.pop();
}), document.addEventListener("click", (e) => {
	let t = e.target.closest?.("a[data-nav]");
	!t || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || (e.preventDefault(), j(), O.go(t.getAttribute("href")));
});
function Ht(e) {
	let t = document.querySelector("meta[name=\"vb-v\"]")?.content;
	E?.updateAvailable(!!e && !!t && t !== "development" && e !== "development" && e !== t);
}
function Ut() {
	j(), document.title = "vibebook", Qn(null), L("home", x, zt());
}
function Wt() {
	j(), document.title = `${b("Arquivo")} · vibebook`, Qn(null), L("archived", x, zt());
}
function Gt(e = "all") {
	j(), wt();
	let t = E.peek();
	if (!t) return;
	let n = document.createElement("dialog");
	n.className = "pdrawer", n.dataset.vbLegacy = "home-settings", n.innerHTML = `<button type="button" class="ghost" data-account-close aria-label="${b("Fechar")}">${b("Fechar")}</button>
  <div class="pdHead"><span data-account-photo>${mt(t.email)}</span><div><b data-account-name>${S(t.name || b("Seu nome"))}</b><small>${S(t.email)}</small></div></div>
  <form data-account-name-form><label>${b("Seu nome")}<input name="name" required maxlength="60" autocomplete="given-name" value="${S(t.name || "")}" /></label><button>${b("Salvar")}</button></form>
  <button type="button" class="primary" data-account-photo>${b("Adicionar foto")}</button><input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />
  ${Kt()}<nav class="pdNav"><a data-nav href="/archived">${b("Arquivo")}</a><button class="ghost" data-account-theme>${kt[At()].label}</button>${lt()}<span data-native-pwa-bell></span>${window.PublicKeyCredential ? `<label><input type="checkbox" data-account-lock ${fa() ? "checked" : ""}/>${b("Exigir Face ID ao abrir")}</label>` : ""}</nav>
  <div id="setupCard"></div><section class="agentBox" id="agentBox" aria-live="polite"></section>
  <h2>${b("Amigos")}</h2><div data-account-friends></div><form data-account-add><label>${b("Email do amigo")}<input type="email" name="email" required/></label><button>${b("Convidar")}</button></form>
  <button type="button" class="primary" data-account-logout>${b("Sair")}</button><button type="button" class="ghost" data-account-logout-all>${b("Sair de todos os aparelhos")}</button><p role="alert" data-account-error hidden></p>`, document.body.append(n);
	let r = !0, i = t.email, a = () => {}, o = () => {}, s = () => r && n.isConnected && E.peek()?.email === i, c = (e) => {
		if (s()) {
			let t = n.querySelector("[data-account-error]");
			t.hidden = !1, t.textContent = e instanceof Error ? e.message : String(e);
		}
	}, l = () => {
		s() && (E.invalidate(), E.refresh());
	}, u = () => {
		r && (r = !1, a(), o(), clearTimeout(Jt), clearTimeout(rn), n.open && n.close(), n.remove());
	};
	wt = u, n.addEventListener("close", u), n.querySelector("[data-account-close]").onclick = u, n.querySelector("[data-account-theme]").onclick = () => {
		jt(kt[At()].next), n.querySelector("[data-account-theme]").textContent = kt[At()].label;
	}, n.querySelector("[data-account-name-form]").onsubmit = async (e) => {
		e.preventDefault();
		let t = e.currentTarget, n = t.querySelector("button");
		if (s() && t.isConnected && !n.disabled) {
			n.disabled = !0;
			try {
				await T("/api/me?ui=svelte", { name: t.elements.name.value }), l();
			} catch (e) {
				c(e);
			} finally {
				s() && (n.disabled = !1);
			}
		}
	}, n.querySelectorAll("[data-account-photo]").forEach((e) => e.onclick = () => {
		s() && e.isConnected && qr(l, s);
	}), n.querySelector("[data-account-add]").onsubmit = async (e) => {
		e.preventDefault();
		let t = e.currentTarget, n = t.querySelector("button");
		if (!n.disabled) {
			n.disabled = !0;
			try {
				await T("/api/friends", { email: t.elements.email.value }), s() && (t.reset(), l());
			} catch (e) {
				c(e);
			} finally {
				s() && (n.disabled = !1);
			}
		}
	};
	let d = n.querySelector("[data-account-lock]");
	d && (d.onchange = async () => {
		if (!s() || !d.isConnected) return;
		let e = d.checked;
		try {
			await ha(e, i);
		} catch (t) {
			s() && (d.checked = !e), c(t);
		}
	}), n.querySelector("[data-account-logout]").onclick = () => {
		s() && Rn(!1);
	}, n.querySelector("[data-account-logout-all]").onclick = async () => {
		s() && confirm(b("Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.")) && Rn(!0);
	};
	let f = n.querySelector("[data-account-friends]"), p = null;
	a = E.state.subscribe(({ me: e }) => {
		if (r && n.isConnected && e) {
			if (e.email !== i) return u();
			e !== p && (p = e, n.querySelector("[data-account-name]").textContent = e.name || b("Seu nome"), f.innerHTML = e.friends.map((e) => `<div class="friend">${mt(e.email)}<span class="fn">${S(e.name || e.email)}<small>${e.shared || ""}</small></span><button type="button" class="ghost" data-account-unfriend="${S(e.email)}" aria-label="${b("Remover {email} dos amigos", { email: S(e.email) })}">${k("x")}</button></div>`).join(""), f.querySelectorAll("[data-account-unfriend]").forEach((e) => e.onclick = async () => {
				if (s() && e.isConnected && confirm(b("Remover {email} dos seus amigos? Os vibebooks em comum continuam.", { email: e.dataset.accountUnfriend }))) {
					e.disabled = !0;
					try {
						if (!(await fetch(`/api/friends/${encodeURIComponent(e.dataset.accountUnfriend)}`, { method: "DELETE" })).ok) throw Error(b("Algo deu errado. Tenta de novo."));
						l();
					} catch (t) {
						c(t), s() && e.isConnected && (e.disabled = !1);
					}
				}
			}));
		}
	}), qt(s), o = de(n.querySelector("[data-native-pwa-bell]"), "bell", Ln, y), Xt(!1, s), n.showModal(), e === "friends" ? n.querySelector("[data-account-add] input").focus() : e === "profile" && n.querySelector("[data-account-name-form] input").focus();
}
var Kt = () => `<section class="logins"><h3>${b("Como você entra")}</h3><div id="loginRows"></div><p class="lgNote">${b("Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.")}</p></section>`;
async function qt(e = () => !0) {
	let t = document.getElementById("loginRows");
	if (!t) return;
	let n;
	try {
		n = await (await fetch("/api/me/logins")).json();
	} catch {
		return;
	}
	if (!e() || !t.isConnected) return;
	let r = Object.fromEntries((n.logins || []).map((e) => [e.method, e])), i = (e) => e ? b("último {d} · {n}×", {
		d: new Date(e.last).toLocaleDateString(st, {
			day: "numeric",
			month: "short",
			year: "numeric"
		}),
		n: e.n
	}) : null, a = (e, t, n, r) => `<div class="lgRow${n ? " on" : ""}"><span class="lgIc">${e}</span><span><b>${t}</b><small>${i(n) ?? r}</small></span>${n ? `<i class="lgOk">${k("check", 14)}</i>` : ""}</div>`;
	t.innerHTML = [
		a(k("at", 16), b("Código por email"), r.email, b("sempre funciona")),
		n.providers?.google || r.google ? a(Vt, "Google", r.google, b("ainda não usou")) : "",
		n.providers?.github || r.github ? a(bt.replace("<svg ", "<svg width=\"16\" height=\"16\" "), "GitHub", r.github, b("ainda não usou")) : "",
		r.invite ? a(k("reply", 16), b("Link de convite"), r.invite) : ""
	].join("");
}
var Jt = 0, Yt = 0;
async function Xt(e, t = () => !0) {
	if (!t()) return;
	clearTimeout(Jt), Yt = e ? Yt + 1 : 0;
	let n = document.getElementById("agentBox");
	if (!n) return;
	let r = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (r && t() && document.body.contains(n)) {
		if (`${location.origin}`, r.agents.length) {
			n.hidden = !1;
			let e = Date.now(), i = (e) => e.used_at ?? e.connected_at, a = (t) => e - i(t) > 12096e5, o = {};
			for (let e of r.agents) (o[e.client] ??= []).push(e);
			for (let e of Object.values(o)) e.sort((e, t) => i(t) - i(e));
			let s = (e) => e.used_at ? b("usado {ago}", { ago: w(e.used_at) }) : e.used_at === null ? b("sem uso ainda") : b("uso desconhecido");
			n.innerHTML = `<h2>✦ ${b("Seus agents conectados")}</h2>
      ${Object.entries(o).map(([e, t]) => `<div class="connGroup"><div class="connHead"><b>${S(e)}</b><small>${t.length}</small></div>
        ${t.map((e) => `<label class="conn"><input type="checkbox" data-gid="${S(e.id)}" ${a(e) ? "checked" : ""} /><span>${b("conectado {ago}", { ago: w(e.connected_at) })}<small>${s(e)}</small></span></label>`).join("")}</div>`).join("")}
      <div class="connActs"><button type="button" class="ghost" id="connKeep">${b("Marcar todas menos a mais recente de cada")}</button><button type="button" class="primary" id="connDel"></button></div>
      <p style="margin-top:8px">${b("Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>")}</p>`;
			let c = () => [...n.querySelectorAll("[data-gid]")], l = () => {
				let e = c().filter((e) => e.checked).length, t = n.querySelector("#connDel");
				t.textContent = b("Remover selecionadas ({n})", { n: e }), t.disabled = !e;
			};
			n.addEventListener("change", l), l(), n.querySelector("#connKeep").onclick = () => {
				n.querySelectorAll(".connGroup").forEach((e) => e.querySelectorAll("[data-gid]").forEach((e, t) => e.checked = t > 0)), l();
			}, n.querySelector("#connDel").onclick = async () => {
				if (!t() || !n.isConnected) return;
				let e = c().filter((e) => e.checked).map((e) => e.dataset.gid);
				if (!e.length || !confirm(b("Remover {n} conexões? Os agents delas perdem o acesso na hora.", { n: e.length }))) return;
				let r = await fetch("/api/agents/revoke", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ ids: e })
				});
				t() && n.isConnected && (r.ok && E.refreshAgents(), Xt(!1, t));
			};
		} else n.hidden = !0, on(document.getElementById("setupCard"), void 0, t);
	}
}
var Zt = !1, Qt = 0;
function $t() {
	Qt++;
	let e = document.getElementById("inbox");
	e?._unmount?.(), e && (e._unmount = null);
}
function en() {
	document.getElementById("inbox")?._unmount?.updateWaits(Et);
	let e = document.getElementById("inboxBtn");
	if (!e) return;
	let t = Et.length, n = e.querySelector(".kN");
	n.hidden = !t, n.textContent = t, n.className = `kN${Dt(Et)}`;
}
var tn = () => Promise.resolve(pe);
function nn() {
	$t();
	let e = Qt, t = document.getElementById("inbox");
	t || (t = document.createElement("div"), t.id = "inbox", document.body.appendChild(t));
	let n = () => {
		e === Qt && $t();
	};
	tn().then(({ mountInbox: r }) => {
		e === Qt && (t.replaceChildren(), t._unmount = r(t, {
			waits: Et,
			roomId: N?.id ?? null,
			all: Zt,
			vb: {
				t: b,
				ago: w
			},
			displayName: C,
			avatarUrl: (e) => {
				let t = N?.avatars?.[e] ?? pt[e];
				return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : void 0;
			},
			ontab: (e) => Zt = e,
			onclose: n,
			onopen: (e, t) => {
				n();
				let r = /^[mab]/.test(e.ref) ? oe(e.ref.slice(1)) : void 0;
				N?.id === e.book_id && (t.preventDefault(), r ? q(r, e.thread) : e.thread !== P && (P = e.thread, H(), Q(), $()));
			},
			onresolve: async (e) => {
				await E.api.resolve(e.book_id, e.ref), E.invalidate(), E.refresh();
			}
		}));
	}).catch(() => U(b("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
	e.target.closest?.("#inboxBtn") && nn();
});
var rn = 0, an = !1;
async function on(e, t, n = () => !0) {
	if (!n() || (clearTimeout(rn), !e)) return;
	let r = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (!r || !n() || !document.body.contains(e)) return;
	if (an = !r.agents.length, N && e.id === "agentNudge" && ur(), r.agents.length) {
		e.dataset.waiting ? (e.innerHTML = `<div class="setup done"><span class="setupIcon">${k("check", 22)}</span><div><b>${b("Seu agent conectou.")}</b><span>${b(t ? "Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo." : "Ele já enxerga as suas salas.")}</span></div></div>`, delete e.dataset.waiting, setTimeout(() => {
			document.body.contains(e) && (e.innerHTML = "", e.hidden = !0);
		}, 6e3), t || Xt(!1, n)) : (e.innerHTML = "", e.hidden = !0);
		return;
	}
	let i = e.id === "agentNudge", a = !1;
	try {
		a = localStorage.getItem("vb.setupOff") === "1";
	} catch {}
	if (i && a) {
		e.innerHTML = "", e.hidden = !0;
		return;
	}
	let o = `Read ${location.origin}/llms.txt and set up vibebook for this project.${t ? ` Room: ${location.origin}/b/${t}` : ""}`;
	if (!e.dataset.waiting) {
		e.dataset.waiting = "1", e.hidden = !1;
		let r = `${location.origin}/mcp`;
		e.innerHTML = `<div class="setup">
      <div class="setupHead">${i ? `<button class="ghost setupX" data-setupx aria-label="${b("Fechar")}" title="${b("Fechar")}">×</button>` : ""}<span class="setupIcon">✻</span><div><b>${b(t ? "Traga seu agent pra esta sala" : "Conecte seu agent")}</b>
        <span>${b("O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:")}</span></div></div>
      <div class="setupCmd"><code>${S(o)}</code><button class="primary" data-copycmd>${b("Copiar")}</button></div>
      <div class="setupFoot"><span class="wait">${b("esperando seu agent conectar…")}</span>
        <details><summary>${b("Claude.ai ou outro cliente")}</summary>
          <p><b>Claude.ai:</b> ${b("Configurações → Conectores → Adicionar conector personalizado, e cole")} <code data-copy>${S(r)}</code></p>
          <p><b>${b("Claude Code só com o conector:")}</b> <code data-copy>claude mcp add --transport http vibebook ${S(r)}</code></p>
          <p><a href="/connect" target="_blank" rel="noopener">${b("Passo a passo completo →")}</a></p>
        </details></div>
    </div>`;
		let a = e.querySelector("[data-setupx]");
		a && (a.onclick = () => {
			try {
				localStorage.setItem("vb.setupOff", "1");
			} catch {}
			clearTimeout(rn), e.innerHTML = "", e.hidden = !0;
		});
		let s = e.querySelector("[data-copycmd]");
		s.onclick = async () => {
			if (n() && s.isConnected) {
				try {
					await navigator.clipboard.writeText(o), s.textContent = `✓ ${b("Copiado")}`;
				} catch {
					s.textContent = b("Selecione e copie");
				}
				setTimeout(() => s.textContent = b("Copiar"), 2500);
			}
		}, e.querySelectorAll("[data-copy]").forEach((e) => e.onclick = () => {
			navigator.clipboard?.writeText(e.textContent), e.classList.add("copied");
		});
	}
	let s = Number(e.dataset.polls || 0);
	s < 150 && (e.dataset.polls = String(s + 1), rn = setTimeout(() => on(e, t, n), 4e3));
}
var sn = te(), M = null, cn = 0, ln = 0, un = fe(), N = null, dn = /* @__PURE__ */ new Map(), P = "main", fn = [], pn = null, mn = /* @__PURE__ */ new Map(), hn = !1;
function gn(e) {
	let t = (Tt || []).find((t) => t.id === e), n = t?.title || "";
	document.title = `${n || "vibebook"} · vibebook`;
	let r = Mt(t), i = (e) => r ? `<span class="${e} hasIcon"><img src="${r}" alt=""></span>` : n ? `<span class="${e}" style="background:${Jn(n)}">${S(Xn(n))}</span>` : `<span class="${e}"></span>`, a = (e) => `<div class="thread"><span class="ri sk"></span><i style="width:${e}%"></i></div>`, o = (e, t) => `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${e}px"></i><i class="s" style="width:${t}%"></i></div></div>`;
	return `<div class="book skel ${$n ? "rail" : ""}" aria-busy="true" aria-label="${b("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${i("ri roomIco")}<span class="rt">${S(n)}</span></div>${a(70)}${a(55)}${a(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${b("Seus vibebooks")}">${k("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${i("ri roomIco phOnly")}<span>${S(n)}</span></span></h2></div>
      <div class="msgs">${o(90, 60)}${o(120, 45)}${o(70, 70)}${o(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${b("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${b("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function _n(e, t) {
	return M === t && (mn.delete(e), G?.reset(), jn(), N = null, un.replace(null), M = null, !0);
}
function vn(e) {
	let t = ++cn;
	ln = t, P = pn || new URLSearchParams(location.search).get("t") || "main", pn = null, Zi = !1, N = null, dn.clear(), hn = !1, j(), E.refresh();
	let n = mn.get(e);
	n ? (N = n, !n.epics.some((e) => e.id === P) && !P.startsWith("pre:") && (P = "main"), Un()) : x.innerHTML = gn(e);
	let r = at({
		url: (t) => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${e}?t=${encodeURIComponent(z() ? "main" : P)}${t ? `&rc=${t}` : ""}`,
		onEvent: (n) => {
			M === r && Fn(n, e, t);
		},
		onRemoved: () => {
			_n(e, r) && (x.innerHTML = `<div class="home"><p>${b("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${k("back")} ${b("seus vibebooks")}</a></div>`);
		},
		onUnavailable: () => {
			_n(e, r) && (x.innerHTML = `<div class="home"><p>${b("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${b("voltar")}</a></div>`);
		}
	});
	M = r, r.start();
}
var F = (e) => M?.send(e) ?? !1, yn = (e) => M?.request(e) ?? Promise.resolve({
	ok: !1,
	error: "offline"
}), bn = /* @__PURE__ */ new Map(), xn = () => {}, Sn = null, Cn = null, I = null;
function wn() {
	if (!N) return null;
	I && (I.roomId !== N.id || I.account !== N.me) && (I.dispose(), I = null), I ||= h(N.me, N.id);
	let e = N.id, t = N.me, n = M;
	return I.sync(N, (r) => N?.id === e && N.me === t && n && M === n && A() === e ? n.request(r) : Promise.resolve({
		ok: !1,
		error: "offline"
	})), I;
}
var Tn = () => ({
	t: b,
	name: C,
	ago: w,
	epicBusy: Vr,
	waitsIn: Hr,
	avatarUrl: (e) => {
		let t = N?.avatars?.[e] ?? pt[e];
		return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : void 0;
	}
});
function En(e) {
	let t = bn.get(e);
	t && (t.target._mo?.disconnect(), t.destroy(), bn.delete(e));
}
function L(e, t, n, r = !1) {
	let i = bn.get(e);
	i && (i.target !== t || r || e.startsWith("document") && i.documentOwner !== n.owner) && (En(e), i = null), i ? i.update(n) : (t.replaceChildren(), i = {
		...g(e, t, n),
		target: t,
		documentOwner: e.startsWith("document") ? n.owner : void 0
	}, bn.set(e, i));
}
var R = null, Dn = null, On = !1, kn = a(), An = null;
function jn() {
	Bn(), An?.dispose(), An = null, Sn = null, I?.dispose(), I = null, p(Cn), Cn = null, xn(), xn = () => {}, R?.dispose(), R = null, Dn = null;
	for (let e of bn.keys()) En(e);
	oa.disconnect();
}
var Mn = () => ({
	t: b,
	icon: k,
	avatar: mt,
	ago: w,
	name: C,
	color: dt,
	initials: Xn,
	mentions: yt,
	locale: st
}), Nn = () => ({
	t: b,
	name: C,
	knownNames: ft,
	pageUrl: location.href,
	locale: st,
	avatarUrl: (e) => {
		let t = N?.avatars?.[e] ?? pt[e];
		return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : void 0;
	},
	ago: w,
	hhmm: pi,
	typingLabel: (e) => In[e] ?? e,
	typingNote: (e) => dn.get(e),
	dateTime: (e) => new Date(e).toLocaleString(st),
	waiting: (e) => Et.some((t) => t.book_id === N.id && t.ref === `m${e}`)
});
function Pn(e) {
	li(() => Pn(e)) || (P = e, Xr = e === "main" ? null : e, On = !0, Zr(), H(), Q(), Qr(), $());
}
function Fn(e, t, n) {
	if (A() !== t) return;
	let r = N, i = I?.suggestionIntent();
	if (e.t === "epicsPatch" && N) {
		let t = /* @__PURE__ */ new Set([...N.epics.map((e) => e.id), ...e.changed.map((e) => e.id)]);
		if (e.order.some((e) => !t.has(e))) {
			M?.resync();
			return;
		}
	}
	if (un.get() !== N && un.replace(N), N = un.apply(e, t), e.t === "state" && N && E?.acceptIdentity(N.me)) return;
	N && (e.t === "meta" || e.t === "state") && E?.roomMeta(t, {
		title: N.book.title,
		folder: N.book.folder,
		summary: N.book.summary
	}), N && mn.set(t, N);
	let a = e.t === "state" || e.t === "members";
	switch (N && a && kn.authorize(N, n), N && R && $(!1, a), ui(e.t === "state"), wn(), e.t) {
		case "state": {
			Ln.account(N.me);
			let e = !r;
			dn.clear(), hn = !0, Ji = !1;
			for (let e of [...Yi]) e.startsWith(t) && Yi.delete(e);
			mn.delete(t), mn.set(t, N), mn.size > 12 && mn.delete(mn.keys().next().value), N.messages.length && Nt(N.messages.at(-1).id), rr(), e ? Un() : (H(), Q(aa ? void 0 : "stay"), $(!0), oi(), Qr(), Hi(!1, !0), bi(), Vi(), yi());
			return;
		}
		case "closed":
			Q("stay");
			return;
		case "moved":
			N.messages.find((t) => t.id === e.id) && (Q(!0), mi(), H());
			break;
		case "msg":
			Nt(e.m.id), e.m.thread !== "main" && P === "main" && mi(), e.m.thread === P && (ia(e.m), e.m.files?.length && $i()), H(), e.m.reply_to && e.m.thread !== P && Q("stay"), Hn(e.m);
			return;
		case "delta":
			dn.delete(e.id), Q(aa ? void 0 : "stay");
			return;
		case "typing":
			e.note ? dn.set(e.id, e.note) : dn.delete(e.id), Q("stay");
			return;
		case "epicsPatch":
		case "epics":
			P !== "main" && !z() && !N.epics.some((e) => e.id === P) && (P = "main"), H(), oi(), Qr(), Q("stay");
			return;
		case "docNotes":
			$();
			return;
		case "doc": {
			let t = (e.epic || null) === la();
			if (e.stale) {
				R?.invalidate(e.epic), t && $();
				return;
			}
			(t || e.fetched) && $();
			return;
		}
		case "meta":
			H(), oi();
			return;
		case "suggestions": {
			let e = z() ? r?.suggestions[Number(P.slice(4))] : null, t = e && ie(e);
			if (z() && e) {
				let e = N.suggestions.findIndex((e) => ie(e) === t);
				P = e >= 0 ? `pre:${e}` : i?.identity === t && !i.accept && N.suggestions.length ? `pre:${Math.min(i.index, N.suggestions.length - 1)}` : "main";
			}
			H(), Q("stay");
			return;
		}
		case "requests":
			H();
			return;
		case "members":
			H(), ea();
			return;
		case "files":
			H(), Hi(), Di(), ui();
			return;
		case "fileAdd":
			H(), Hi(), Di(), ui(), $i();
			return;
		case "reminders":
			Vi();
			return;
		case "decisions":
			yi();
			return;
		case "conns":
			J = null, document.querySelector(".doc[data-pane=\"apps\"]") && !Y ? X() : Y || wi();
			return;
		case "pins":
			H(), Hi(), bi();
			return;
		case "error":
			U(S(e.error || b("falhou")));
			return;
		case "receipts":
			Q("stay");
			return;
		case "older":
			if (Ji = !1, e.more || (qi[N.id + e.thread] = !0), e.thread === P && (Z.n += e.messages.length, Q(!Yi.delete(N.id + e.thread))), _i && e.thread === P) {
				let n = _i;
				if (N.messages.some((e) => e.id === n.id)) {
					_i = null;
					let e = O.generation();
					setTimeout(() => {
						e === O.generation() && N?.id === t && q(n.id);
					}, 50);
				} else e.more && ++n.n < 15 ? ta() : (_i = null, U(b("Não achei essa mensagem nesta sala.")));
			}
			return;
		case "acks":
			Q("stay"), H();
			return;
		case "ackRows":
			Q("stay"), H();
			return;
		case "poll":
			Q("stay");
			return;
		case "online":
			H();
			return;
		case "blocked":
			U(b("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: S(e.reason) }));
			return;
	}
}
var In = {
	route: b("escolhendo o modelo"),
	fast: b("rápido"),
	smart: b("com calma")
}, Ln = le();
async function Rn(e) {
	try {
		if ((await Ln.beforeLogout()).confirmed || alert(i(y)), !(await fetch(e ? "/auth/logout-all" : "/auth/logout", { method: "POST" })).ok) throw Error("logout-unconfirmed");
		location.href = e ? r("/login", location.href, "svelte") : "/";
	} catch {
		alert(u(y)), location.reload();
	}
}
var zn = [];
function Bn() {
	for (let e of zn) e();
	zn = [];
}
function Vn() {
	Bn(), document.querySelectorAll("[data-native-pwa-bell]").forEach((e) => zn.push(de(e, "bell", Ln, y))), document.querySelectorAll("[data-native-install-slot]").forEach((e) => zn.push(de(e, "install", Ln, y)));
}
function Hn(e) {
	N && Ln.notify(e, N, P, vt, (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? b("{via} de {who}", {
		via: e.via || "agent",
		who: C(e.author)
	}) : C(e.author));
}
function Un() {
	jn(), document.title = `${N.book?.title ?? "vibebook"} · vibebook`, x.innerHTML = `
  <div class="book ${$n ? "rail" : ""}">
    <aside class="side tw:[@media(max-width:900px)]:max-h-[calc(var(--vvh,100dvh)_-_max(96px,var(--vvh,100dvh)*.2))]!" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${b("Seus vibebooks")}" title="${b("Seus vibebooks")}">${k("back", 20)}</a><div id="threadTitle" class="tw:min-w-0 tw:flex-1"></div><button class="ghost" id="toggleBoard" title="${b("Quadro de tarefas (kanban)")}" aria-pressed="false">${k("board")}<span class="lbl">${b("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${b("Caixa de entrada: o que espera por você")}" aria-label="${b("Caixa de entrada")}">${k("inbox")}<b class="kN" hidden></b></button><span data-native-pwa-bell></span><button class="ghost" id="myClaude" aria-pressed="false" hidden>✻ <span class="lbl">Agent</span></button><button class="ghost" id="toggleDoc" title="${b("mostrar/ocultar documento")}">${k("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek"><div id="nativeDocumentPeek"></div></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div class="agentNudge" id="agentNudge" hidden></div><div class="claudeBar" id="claudeBar" hidden></div><div class="askBar" id="askBar" hidden></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <div id="composer"></div>
    </main>
    <section class="doc tw:[@media(max-width:900px)]:has-[form:focus-within]:h-room-sheet-expanded! tw:[@media(max-width:900px)]:has-[form:focus-within]:rounded-none!">
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${b("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${b("Redimensionar documento")}" tabindex="0"></div>
      <div id="nativeDocumentToolbar"></div>
      <div id="nativeDocument" class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col" data-native-document-slot></div>
      <div class="filesPane" id="filesPane"></div>
      <div class="decPane" id="decPane"></div>
      <div class="appsPane connsPane" id="appsPane"></div>
      <div class="remPane" id="remPane"></div>
      <div class="agentsPane" id="agentsPane"></div>
    </section>
    <div class="sheetDim" id="sheetDim"></div>
  </div>
`;
	let e = x.querySelector(".book"), t = new ResizeObserver(() => {
		let t = e.querySelector(".chathead").getBoundingClientRect().height, n = document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
		document.documentElement.style.setProperty("--headH", `${Math.round(t)}px`), document.documentElement.style.setProperty("--peekH", `${Math.round(n)}px`);
	});
	t.observe(e.querySelector(".chathead")), t.observe(document.getElementById("docPeek")), ai(document.getElementById("docPeek"), "doc", !0, () => {}), document.getElementById("docPeek").onclick = null, ai(document.getElementById("docGrab"), "doc", !1), document.getElementById("sheetDim").onclick = () => W(), document.getElementById("toggleDoc").onclick = () => e.classList.toggle("nodoc");
	let n = (t) => {
		document.body.contains(e) && (t && nt(e, e.querySelector(":scope > .chat"), e.querySelector(":scope > .chat > #composer")), e.classList.toggle("boardview", t), ea(), e.classList.toggle("nodoc", t), document.getElementById("toggleBoard").setAttribute("aria-pressed", String(t)), t && (W(), Qr()));
	};
	document.getElementById("toggleBoard").onclick = () => n(!e.classList.contains("boardview"));
	let r = (t) => {
		t = Math.round(Math.min(Math.max(t, 260), window.innerWidth - 260 - 320)), e.style.setProperty("--doc-w", `${t}px`);
		try {
			localStorage.setItem("vb.docW", t);
		} catch {}
	};
	try {
		let e = Number(localStorage.getItem("vb.docW"));
		e && r(e);
	} catch {}
	let i = document.getElementById("resizer");
	i.onpointerdown = (e) => {
		e.preventDefault(), i.setPointerCapture(e.pointerId), i.classList.add("drag"), document.body.classList.add("resizing"), i.onpointermove = (e) => r(window.innerWidth - e.clientX), i.onpointerup = () => {
			i.onpointermove = null, i.classList.remove("drag"), document.body.classList.remove("resizing");
		};
	}, i.ondblclick = () => r(380), i.onkeydown = (e) => {
		let t = document.querySelector(".doc").getBoundingClientRect().width;
		e.key === "ArrowLeft" ? r(t + 24) : e.key === "ArrowRight" && r(t - 24);
	};
	let a = (t) => {
		let n = e.querySelector(":scope > .doc");
		n && (n.dataset.pane = t, $(), e.dataset.pane = t, t === "files" && Hi(!0), t === "decisions" && yi(), t === "apps" && bi(), t === "reminders" && Vi(), t === "agents" && (ur(), br()), t === "board" && (nt(e, n), Qr()));
	};
	xn = rt(e, ei, () => {
		n(!1), a("board");
	}), document.removeEventListener("click", hr), document.removeEventListener("vb:pane", gr), hr = (t) => {
		t.target.closest?.("[data-sbx-open]") && document.body.contains(e) && (W(), document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), ei.matches && ni("doc"));
	}, gr = (t) => {
		document.body.contains(e) && (e.classList.remove("nodoc"), a(t.detail));
	}, document.addEventListener("click", hr), document.addEventListener("vb:pane", gr), a("doc"), Dn = a, H(), Q(), $(!0), Hi(), bi(), Vi(), yi(), on(document.getElementById("agentNudge"), N.id), Vn(), Gn();
	let o = O.generation(), s = N.id, c = location.hash, l = () => o === O.generation() && N?.id === s && e.isConnected;
	if (/^#m\d+$/.test(c)) {
		let e = oe(c.slice(2));
		e && setTimeout(() => {
			l() && q(e);
		}, 300);
	} else if (/^#f[0-9a-f]+$/.test(c)) {
		let e = c.slice(2);
		setTimeout(() => {
			l() && Wn(e);
		}, 300);
	}
}
function Wn(e, t, n = {
	room: N?.id,
	generation: O?.generation()
}) {
	N?.id === n.room && O?.generation() === n.generation && K(e);
}
function Gn() {
	let e = `vb.welcomed.${N.me}`;
	try {
		if (!N.book?.owner || N.me === N.book.owner || localStorage.getItem(e)) return;
		localStorage.setItem(e, "1");
	} catch {
		return;
	}
	let t = C(N.book.owner), n = [
		[
			k("hand", 24),
			b("Bem-vindo a <b>{room}</b>", { room: S(N.book.title || b("esta sala")) }),
			b("{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.", { owner: S(t) })
		],
		[
			"✻",
			b("Cada um traz o seu agent"),
			b("Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.")
		],
		[
			k("paperclip", 24),
			b("O contexto é de todo mundo"),
			b("Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.")
		],
		[
			k("arrowRight", 24),
			b("Conecte o seu agent"),
			""
		]
	], r = document.createElement("dialog");
	r.className = "welcome", document.body.appendChild(r);
	let i = 0, a = () => {
		r.close(), r.remove(), on(document.getElementById("agentNudge"), N.id);
	}, o = () => {
		let [e, t, s] = n[i], c = i === n.length - 1;
		r.innerHTML = `<div class="wIco">${e}</div><h3>${t}</h3>${s ? `<p>${s}</p>` : `<p>${b("Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.")}</p><div id="wConnect"></div>`}
      <div class="wFoot"><span class="wDots">${n.map((e, t) => `<i class="${t === i ? "on" : ""}"></i>`).join("")}</span>
        ${i ? `<button type="button" class="ghost" data-w="-1">${b("Voltar")}</button>` : `<button type="button" class="ghost" data-w="skip">${b("Pular")}</button>`}
        <button type="button" class="primary" data-w="1">${b(c ? "Entrar na sala" : "Próximo")}</button></div>`, r.querySelectorAll("[data-w]").forEach((e) => e.onclick = () => {
			let t = e.dataset.w;
			if (t === "skip" || t === "1" && c) return a();
			i += Number(t), o();
		}), c && on(r.querySelector("#wConnect"), N.id).then(() => {
			let e = r.querySelector("#wConnect");
			e && e.hidden && (e.hidden = !1, e.innerHTML = `<div class="setup done"><span class="setupIcon">${k("check", 22)}</span><div><b>${b("Seu agent já está conectado.")}</b><span>${b("Ligue ele nesta sala com ✻ Ligar agent, no topo.")}</span></div></div>`);
		}), r.querySelector(".wFoot .primary").focus();
	};
	r.addEventListener("cancel", (e) => {
		e.preventDefault(), a();
	}), o(), r.showModal();
}
k("sidebar", 20);
var Kn = () => N?.book?.title || "vibebook", qn = [
	"oklch(0.5 0.17 248)",
	"oklch(0.58 0.17 35)",
	"oklch(0.52 0.11 175)",
	"oklch(0.47 0.15 315)",
	"oklch(0.6 0.13 75)",
	"oklch(0.45 0.1 145)",
	"oklch(0.36 0.06 255)",
	"oklch(0.55 0.16 10)"
], Jn = (e) => qn[[...String(e)].reduce((e, t) => e * 31 + t.charCodeAt(0) >>> 0, 7) % qn.length], Yn = /* @__PURE__ */ new Set([
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
	"of"
]), Xn = (e) => {
	let t = e.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/).filter(Boolean), n = t.filter((e) => !Yn.has(e.toLowerCase()));
	return ((n.length ? n : t).slice(0, 2).map((e) => e[0]).join("") || "◆").toUpperCase();
}, Zn = (e) => {
	let t = Mt(Tt?.find((e) => e.id === N?.id));
	return e ? t ? `<span class="${e} hasIcon"><img src="${t}" alt=""></span>` : `<span class="${e}" style="background:${Jn(Kn())}">${S(Xn(Kn()))}</span>` : t ? `<img src="${t}" alt="">` : S(Xn(Kn()));
};
async function Qn(e) {
	let t = document.querySelector("link[rel=\"icon\"]");
	if (!e) {
		t.type = "image/svg+xml", t.href = "/favicon.svg";
		return;
	}
	let n = Mt(Tt?.find((e) => e.id === N?.id));
	if (n) {
		let e = new Image();
		e.onload = () => {
			let n = document.createElement("canvas");
			n.width = n.height = 64;
			let r = n.getContext("2d");
			r.beginPath(), r.roundRect(0, 0, 64, 64, 16), r.clip(), r.drawImage(e, -1, -1, 66, 66), t.type = "image/png", t.href = n.toDataURL("image/png");
		}, e.onerror = () => {
			t.type = "image/png", t.href = n;
		}, e.src = n;
		return;
	}
	await document.fonts?.load?.("400 40px Caprasimo").catch(() => {});
	let r = document.createElement("canvas");
	r.width = r.height = 64;
	let i = r.getContext("2d");
	i.fillStyle = Jn(e), i.beginPath(), i.roundRect(0, 0, 64, 64, 14), i.fill();
	let a = i.createRadialGradient(56, 8, 0, 56, 8, 44);
	a.addColorStop(0, "rgba(255,255,255,.28)"), a.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = a, i.fill();
	let o = Xn(e);
	i.fillStyle = "#fff", i.textAlign = "center", i.textBaseline = "middle", i.font = `400 ${o.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`, i.fillText(o, 32, 35), t.type = "image/png", t.href = r.toDataURL("image/png");
}
var $n = !1;
function er() {
	$n = !$n;
	try {
		localStorage.setItem("vb.rail", $n ? "1" : "0");
	} catch {}
	x.querySelector(".book")?.classList.toggle("rail", $n), H();
}
var z = () => P.startsWith("pre:"), tr = () => z() ? N.suggestions[Number(P.slice(4))] : null;
function nr(e) {
	if (!tr()) return P = "main", Q();
	L("suggestionPreview", e, {
		room: N,
		index: Number(P.slice(4)),
		owner: wn(),
		vb: Nn()
	});
}
var B = {
	id: null,
	list: []
};
async function rr() {
	if (!N?.id) return;
	let e = N.id, t = N.me, n = M, r = await T(`/api/books/${e}/agents`).catch(() => null);
	r && N?.id === e && N.me === t && M === n && A() === e && (B = {
		id: e,
		list: r.agents,
		claudeOn: r.claude_on,
		sandboxes: r.sandboxes || []
	}, ur(), H());
}
var ir = "http://127.0.0.1:47321", ar = null, or = () => ar && Date.now() - ar.at < 2e4 ? Promise.resolve(ar.rooms) : fetch(`${ir}/ping`).then((e) => e.json()).then((e) => (ar = {
	at: Date.now(),
	rooms: e.rooms
}).rooms).catch(() => (ar = {
	at: Date.now(),
	rooms: null
}).rooms), sr = {}, cr = (e, t) => {
	let n = sr[e];
	return n && Date.now() - n.at < 2e4 ? Promise.resolve(n.w) : fetch(`${ir}/where?room=${e}&title=${encodeURIComponent(t || "")}`).then((e) => e.ok ? e.json() : null).catch(() => null).then((t) => (sr[e] = {
		at: Date.now(),
		w: t
	}).w);
}, lr = {
	used: b("a pasta onde ele já abriu antes"),
	linked: b("ligada a esta sala pelo arquivo .vibebook"),
	slug: b("a pasta com o nome da sala"),
	new: b("pasta nova com o nome da sala, criada ao ligar")
};
function ur() {
	let e = document.getElementById("myClaude");
	if (e && B.id !== N?.id) {
		let e = document.getElementById("claudeBar");
		e && (e.hidden = !0);
	}
	if (!e || B.id !== N?.id) return;
	let t = !!B.claudeOn, n = B.list.some((e) => e.email === N.me && e.listening);
	e.hidden = !1, e.setAttribute("aria-pressed", String(t));
	let r = sr[N.id]?.w, i = r?.folder ? r.folder.startsWith(r.home + "/") ? "~" + r.folder.slice(r.home.length) : r.folder : "";
	e.innerHTML = `✻ <span class="lbl">${b(t ? n ? "ouvindo" : "não ouvindo" : "Ligar agent")}</span>${i ? `<span class="where">${S(i.replace(/^~\/Projects\//, ""))}${r.how === "new" ? ` ${k("plus", 12)}` : ""}</span>` : ""}`, sr[N.id] || cr(N.id, Kn()).then((e) => e && ur()), e.title = (i ? `${b("Abre em {path} ({how}).", {
		path: i,
		how: lr[r.how] || b("pasta da sala")
	})}\n\n` : "") + b(t && !n ? "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar." : t ? "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada)." : "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina."), Nr(t, n || B.list.some((e) => e.email === N.me && Date.now() - e.seen_at < 18e5)), e.onclick = () => document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), fr(t, n, i, r);
}
async function dr() {
	let e = !B.claudeOn;
	B.claudeOn = e, e && (Or[N.id] = Date.now()), ur(), await T(`/api/books/${N.id}/claude`, { on: e }).catch(() => {
		B.claudeOn = !e, ur();
	});
}
function fr(e, t, n, r) {
	let i = document.getElementById("agentsPane");
	if (!i) return;
	let a = B.list.filter((e) => e.email === N.me), o = _r();
	if (t || a.some((e) => Date.now() - e.seen_at < 18e5), ua(), !document.querySelector(".doc[data-pane=\"agents\"]")) {
		i.innerHTML = "";
		return;
	}
	i.innerHTML = `<h4>${b("Seus agents nesta sala")}</h4>
    <div class="agCard${e ? " on" : ""}"><span class="agIcon">✻</span><div><b>${b("Claude Code no seu computador")}</b>
      <small>${e ? t ? b("ligado · ouvindo esta sala") : a.some((e) => Date.now() - e.seen_at < 18e5) ? b("ligado · trabalhando agora") : b("ligado · ainda não está ouvindo") : b("desligado")}${n ? ` · ${S(n.replace(/^~\/Projects\//, ""))}${r?.how === "new" ? ` (${b("pasta nova")})` : ""}` : ""}</small></div>
      <button type="button" class="ghost agGo" id="agGo" hidden title="${b("Ir pro seu agent desta sala no herdr")}" aria-label="${b("Ir pro seu agent no herdr")}">${k("external", 16)}</button>
      <label class="agSwitch"><input type="checkbox" id="agToggle" ${e ? "checked" : ""} /><i></i></label></div>
    <p class="agNote">${b("Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.")}</p>
    <div class="agConn"><b>${b("Conectar seu agente")}</b><small>${b("Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.")}</small><code>${S(jr())}</code><button type="button" class="primary" id="agConnCopy">${b("Copiar prompt")}</button></div>
    <h4>${b("Fila do seu agent")} <small>${o.length || ""}</small></h4>
    ${o.length ? `<div class="queue${mr ? " open" : ""}">${o.map((e) => {
		let t = N.epics.find((t) => t.id === e.m.thread), n = t ? Wr(t) : Zn("ri"), r = e.st === "blocked" ? b("espera você no terminal") : e.st === "doing" ? b("fazendo") : b("na fila");
		return `<div class="qRow"><button type="button" class="qGo" data-goto="${e.m.id}" title="${S(t ? t.title : b("sala principal"))} · ${w(e.m.ts)}">${mt(N.me)}${n}<span class="qTx">${S(e.m.text.replace(/\s+/g, " ").slice(0, 120))}</span><i class="qS ${e.st}" title="${r}"></i></button><button type="button" class="qX" data-dismiss="${e.m.id}" title="${b("Tirar da fila (já resolvido)")}" aria-label="${b("Tirar da fila (já resolvido)")}">${k("x")}</button></div>`;
	}).join("")}${o.length > 4 ? `<button type="button" class="qMore" id="qMore">${mr ? b("mostrar menos") : b("mostrar mais {n}", { n: o.length - 4 })}</button>` : ""}</div>` : `<p class="agNote">${b("Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.")}</p>`}
    ${a.length ? `<h4>${b("Conectados")}</h4><div class="agList">${zr(N.me)}</div>` : ""}
    <h4>${b("Na nuvem")}</h4><div id="sbx">${xr()}</div>`, document.getElementById("agToggle").onchange = dr, document.getElementById("agConnCopy").onclick = Mr;
	let s = document.getElementById("agGo");
	e && or().then((e) => {
		s.isConnected && (s.hidden = !e?.includes(N.id));
	}), s.onclick = () => fetch(`${ir}/focus?room=${N.id}`).then((e) => e.json()).then((e) => e.error && U(S(e.error))).catch(() => U(b("O vibebook herdr não está rodando nesta máquina."))), i.querySelectorAll("[data-goto]").forEach((e) => e.onclick = () => {
		ei.matches && W(), q(Number(e.dataset.goto));
	}), i.querySelectorAll("[data-dismiss]").forEach((e) => e.onclick = () => F({
		t: "ack.dismiss",
		id: Number(e.dataset.dismiss)
	})), document.getElementById("qMore")?.addEventListener("click", () => {
		mr = !mr, ur();
	}), Sr();
}
var pr = (e) => `US$${e < 10 ? e.toFixed(2) : Math.round(e)}`.replace(".", y === "en" ? "." : ","), mr = !1, hr = () => {}, gr = () => {};
function _r() {
	let e = Date.now() - 1728e5, t = /* @__PURE__ */ new Map();
	for (let e of N.acks || []) e.email === N.me && (t.get(e.msg_id) ?? t.set(e.msg_id, []).get(e.msg_id)).push(e);
	let n = N.messages ? Xi() : [];
	return n.filter((t) => t.author === N.me && !t.kind && t.text && t.ts > e && !n.some((e) => e.id === t.reply_to && ne(e))).map((e) => {
		let n = t.get(e.id) || [];
		return {
			m: e,
			st: n.some((e) => e.status === "done" || e.status === "idle" || e.status === "dismissed") ? null : n.some((e) => e.status === "blocked") ? "blocked" : n.some((e) => e.status === "doing") ? "doing" : "queued"
		};
	}).filter((e) => e.st);
}
var V = {
	id: null,
	connected: null,
	list: [],
	busy: "",
	err: ""
}, vr = 0, yr = {
	running: "rodando",
	starting: "ligando",
	pausing: "pausando",
	paused: "pausado",
	stopped: "parado",
	deleted: "apagado no freestyle",
	unknown: "?"
};
async function br() {
	if (!N?.id) return;
	clearTimeout(vr);
	let e = N.id, t = N.me, n = M, r = await fetch(`/api/books/${e}/sandboxes`).then((e) => e.json()).catch(() => null);
	if (!r || r.error || N?.id !== e || N.me !== t || M !== n || A() !== e) return;
	V = {
		...V,
		id: e,
		connected: r.connected,
		claude: r.claude,
		list: r.sandboxes
	};
	let i = document.getElementById("sbx");
	i && (i.innerHTML = xr(), Sr()), r.sandboxes.some((e) => !e.ready || e.state !== "running" && /ing$/.test(e.state)) && document.querySelector(".doc[data-pane=\"agents\"]") && (vr = setTimeout(() => {
		N?.id === e && N.me === t && M === n && A() === e && br();
	}, 5e3));
}
function xr() {
	if (V.id !== N?.id || V.connected === null) return `<p class="agNote">${b("carregando…")}</p>`;
	let e = V.err ? `<p class="agErr">${S(V.err)}</p>` : "";
	return V.connected ? `${V.claude ? `<div class="fsOn">${k("check", 13)} ${b("Claude conectado: sandboxes novos já sobem logados")} · <button type="button" class="ghost" id="ctOff">${b("remover")}</button></div>` : `<div class="agCard col"><b>${b("Conecte sua conta do Claude")}</b><small>${b("No seu terminal, rode:")}</small><div class="cpCmd"><code>claude setup-token</code><button type="button" class="ghost" data-cp="claude setup-token">${b("Copiar")}</button></div><small>${b("Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.")}</small>
      <form id="ctForm" class="fsForm"><input type="password" name="token" autocomplete="off" placeholder="sk-ant-…" required /><button class="primary" ${V.busy ? "disabled" : ""}>${V.busy === "ct" ? b("Salvando…") : b("Salvar")}</button></form>${V.errAt === "ct" && V.err ? `<p class="agErr">${S(V.err)}</p>` : ""}</div>`}${V.list.map((e) => `<div class="sbxCard ${e.state}"><div class="sbxTop"><span class="agIcon">☁</span><div><b>${S(e.name)}</b>
      <small>${!e.ready && e.state === "running" ? b("preparando (uns 3 min)…") : b(yr[e.state] || e.state)}${e.rate ? ` · ${pr(e.rate)}/h` : ""}${e.error ? ` · ${S(e.error)}` : ""}</small>${V.logs?.[e.id] ? `<pre class="sbxLog">${S(V.logs[e.id])}</pre>` : !e.ready && e.log ? `<code class="sbxLog">${S(e.log)}</code>` : ""}</div><span class="money" title="${b("gasto até agora na sua conta do freestyle")}">${pr(e.cost || 0)}</span></div>
      <div class="sbxActs">${e.state === "deleted" ? "" : `<button class="primary" data-sbx-term="${S(e.id)}">${b("Terminal")}</button>`}
      ${e.state === "running" ? `<button class="ghost" data-sbx-act="pause" data-id="${S(e.id)}">${b("Pausar")}</button>` : e.state === "paused" || e.state === "stopped" ? `<button class="ghost" data-sbx-act="start" data-id="${S(e.id)}">${b("Retomar")}</button>` : ""}
      ${!e.ready && e.state === "running" ? `<button class="ghost" data-sbx-setup="${S(e.id)}" title="${b("Rodar o setup de novo")}" ${V.busy ? "disabled" : ""}>${V.busy === "setup:" + e.id ? b("Rodando setup… (até 4 min)") : b("Refazer setup")}</button>` : ""}
      <button class="ghost del" data-sbx-del="${S(e.id)}" aria-label="${b("Apagar sandbox")}" title="${b("Apagar sandbox")}">${k("trash", 16)}</button></div></div>`).join("")}
    <button class="agNew on" id="sbxNew" ${V.busy ? "disabled" : ""}>${k("plus", 16)} ${V.busy === "new" ? b("Criando…") : b("Criar sandbox")}<small>${b("Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.")}</small></button>${V.errAt === "ct" ? "" : e}
    <div class="fsOn">${k("check", 13)} ${b("freestyle.sh conectado")} · <button type="button" class="ghost" id="fsOff">${b("desconectar")}</button></div>` : `<div class="agCard col"><b>${b("Conecte sua conta do freestyle.sh")}</b>
    <small>${b("O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:")}</small><div class="cpCmd"><code>npx freestyle@latest tokens create vibebook</code><button type="button" class="ghost" data-cp="npx freestyle@latest tokens create vibebook">${b("Copiar")}</button></div><small>${b("Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.")}</small>
    <form id="fsForm" class="fsForm"><input type="password" name="key" autocomplete="off" placeholder="${b("API key do freestyle")}" required /><button class="primary" ${V.busy ? "disabled" : ""}>${V.busy === "key" ? b("Conferindo…") : b("Conectar")}</button></form>${e}</div>`;
}
function Sr() {
	let e = () => {
		let e = document.getElementById("sbx");
		e && (e.innerHTML = xr(), Sr());
	}, t = async (t, n) => {
		V.busy = t, V.errAt = t, V.err = "", e();
		try {
			let e = await n();
			e?.error && (V.err = e.error);
		} catch {
			V.err = b("sem conexão");
		}
		V.busy = "", await br(), e();
	}, n = (e, t, n) => fetch(t, {
		method: e,
		headers: { "content-type": "application/json" },
		body: n ? JSON.stringify(n) : void 0
	}).then((e) => e.json());
	document.getElementById("fsForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		let r = e.target.key.value;
		t("key", () => n("POST", "/api/freestyle", { key: r }));
	}), document.querySelectorAll("[data-cp]").forEach((e) => e.onclick = () => {
		navigator.clipboard?.writeText(e.dataset.cp);
		let t = e.innerHTML;
		e.textContent = "✓", setTimeout(() => e.innerHTML = t, 1200);
	}), document.getElementById("ctForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		let r = e.target.token.value;
		t("ct", () => n("POST", "/api/claude-token", { token: r }));
	}), document.getElementById("ctOff")?.addEventListener("click", () => confirm(b("Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.")) && t("ct", () => n("DELETE", "/api/claude-token"))), document.getElementById("fsOff")?.addEventListener("click", () => confirm(b("Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.")) && t("off", () => n("DELETE", "/api/freestyle"))), document.getElementById("sbxNew")?.addEventListener("click", () => t("new", () => n("POST", `/api/books/${N.id}/sandboxes`, {}))), document.querySelectorAll("[data-sbx-setup]").forEach((e) => e.onclick = () => t(`setup:${e.dataset.sbxSetup}`, async () => {
		let t = await n("POST", `/api/sandboxes/${e.dataset.sbxSetup}/setup`);
		return V.logs = {
			...V.logs,
			[e.dataset.sbxSetup]: t.log || t.error || ""
		}, t;
	})), document.querySelectorAll("[data-sbx-act]").forEach((e) => e.onclick = () => t("act", () => n("POST", `/api/sandboxes/${e.dataset.id}/${e.dataset.sbxAct}`))), document.querySelectorAll("[data-sbx-del]").forEach((e) => e.onclick = () => confirm(b("Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.")) && t("del", () => n("DELETE", `/api/sandboxes/${e.dataset.sbxDel}`))), document.querySelectorAll("[data-sbx-term]").forEach((e) => e.onclick = () => Dr(e.dataset.sbxTerm, V.list.find((t) => t.id === e.dataset.sbxTerm)?.name));
}
var Cr = "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0", wr = "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js", Tr = {
	Esc: "\x1B",
	Tab: "	",
	"Ctrl-C": "",
	"↑": "\x1B[A",
	"↓": "\x1B[B",
	"←": "\x1B[D",
	"→": "\x1B[C",
	"/": "/"
}, Er = (e) => new Promise((t, n) => {
	let r = Object.assign(document.createElement("script"), {
		src: e,
		onload: t,
		onerror: n
	});
	document.head.append(r);
});
async function Dr(e, t) {
	window.Terminal || (document.head.append(Object.assign(document.createElement("link"), {
		rel: "stylesheet",
		href: `${Cr}/css/xterm.css`
	})), await Er(`${Cr}/lib/xterm.js`), await Er(wr));
	let n = document.createElement("dialog");
	n.className = "termDlg", n.innerHTML = `<header><b>☁ ${S(t || "sandbox")}</b><span id="termSt">${b("conectando…")}</span><button class="ghost" data-close aria-label="${b("Fechar")}">${k("x")}</button></header><div class="termBox" id="termBox"></div>
    <div class="termKeys">${Object.keys(Tr).map((e) => `<button type="button" data-k="${S(e)}">${S(e)}</button>`).join("")}</div>`, document.body.append(n), n.showModal();
	let r = new window.Terminal({
		cursorBlink: !0,
		fontSize: 14,
		fontFamily: "ui-monospace, Menlo, monospace",
		theme: { background: "#0b0f17" }
	}), i = new window.FitAddon.FitAddon();
	r.loadAddon(i), r.open(n.querySelector("#termBox")), i.fit();
	let a = n.querySelector("#termSt"), o = null, s = !1, c = () => {
		s = !0, o?.close(), r.dispose(), n.remove();
	};
	n.querySelector("[data-close]").onclick = c, n.oncancel = (e) => {
		e.preventDefault(), c();
	};
	let l = await fetch(`/api/sandboxes/${e}/terminal`, { method: "POST" }).then((e) => e.json()).catch(() => ({ error: b("sem conexão") }));
	if (l.error) {
		a.textContent = l.error;
		return;
	}
	let u = btoa(String.fromCharCode(...new TextEncoder().encode(l.token))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	o = new WebSocket(`${l.url}&cols=${r.cols}&rows=${r.rows}`, ["freestyle-pty", `freestyle-identity.${u}`]), o.binaryType = "arraybuffer";
	let d = new TextEncoder();
	o.onmessage = (e) => {
		if (typeof e.data != "string") return r.write(new Uint8Array(e.data));
		try {
			let t = JSON.parse(e.data);
			t.type === "sessionInfo" ? a.textContent = b("conectado") : t.type === "exited" ? a.textContent = b("terminou") : t.type === "error" && (a.textContent = t.message);
		} catch {}
	}, o.onclose = () => {
		s || (a.textContent = b("desconectado: feche e abra de novo"));
	}, r.onData((e) => o.readyState === 1 && o.send(d.encode(e))), new ResizeObserver(() => {
		i.fit(), o.readyState === 1 && o.send(JSON.stringify({
			type: "resize",
			cols: r.cols,
			rows: r.rows
		}));
	}).observe(n.querySelector("#termBox")), n.querySelectorAll("[data-k]").forEach((e) => e.onclick = () => {
		o.readyState === 1 && o.send(d.encode(Tr[e.dataset.k])), r.focus();
	}), r.focus();
}
var Or = {}, kr = 0, Ar = {}, jr = () => `Read ${location.origin}/llms.txt and set up vibebook for this project. Room: ${location.origin}/b/${N.id}`;
function Mr() {
	let e = jr();
	(navigator.clipboard?.writeText(e) ?? Promise.reject()).then(() => U(b("Copiado. Cole no Claude Code, dentro da pasta do projeto.")), () => window.prompt(b("Copie e cole no seu Claude Code:"), e));
}
function Nr(e, t) {
	let n = document.getElementById("claudeBar");
	if (!n) return;
	clearTimeout(kr);
	let r = document.getElementById("agentNudge"), i = "vb.claudeBar.off", a = !1;
	try {
		a = localStorage.getItem(i) === "off";
	} catch {}
	let o = `<button class="ghost" data-x aria-label="${b("Fechar")}" title="${b("Fechar")}">×</button>`, s = (e, t) => {
		n.className = `claudeBar ${e}`, n.innerHTML = t, n.hidden = !1;
		let r = n.querySelector("[data-x]");
		r && (r.onclick = () => {
			try {
				localStorage.setItem(i, "off");
			} catch {}
			n.hidden = !0, clearTimeout(kr);
		});
	}, c = !1;
	try {
		c = localStorage.getItem(`vb.start.${N.id}`) === "off";
	} catch {}
	if (N.book?.owner === N.me && !N.epics.length && P === "main" && !c) return Pr(n, e, t, `vb.start.${N.id}`);
	if (an || r && !r.hidden || t && !Ar[N.id] || a && !Or[N.id]) n.hidden = !0;
	else if (t) Ar[N.id] = !1, s("ok", `<span class="star">✻</span><span><b>${b("Seu agent está ouvindo esta sala.")}</b></span>`), setTimeout(() => n.hidden = !0, 5e3);
	else if (e) {
		Ar[N.id] = !0;
		let e = Date.now() - (Or[N.id] || 0) > 18e4;
		s("wait", `<span class="star">✻</span><span><b>${b(e ? "Seu agent ainda não está ouvindo." : "Abrindo seu agent no seu computador…")}</b><small>${b(e ? "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá." : "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.")}</small></span>${o}`), e || (kr = setTimeout(ur, 18e4 - (Date.now() - (Or[N.id] || 0)) + 500));
	} else Ar[N.id] = !1, s("", `<span class="star">✻</span><span><b>${b("Seu agent não está nesta sala.")}</b><small>${b("Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.")}</small></span><button class="primary" data-conn>${b("Conectar seu agente")}</button><button class="ghost" data-on>${b("Ligar agent")}</button>${o}`), n.querySelector("[data-on]").onclick = () => document.getElementById("myClaude")?.click(), n.querySelector("[data-conn]").onclick = Mr;
}
function Pr(e, t, n, r) {
	let i = (N.members || []).filter((e) => e !== N.me), a = (e, t) => `<li class="${e}"><i>${e === "ok" ? "✓" : e === "wait" ? "✻" : "○"}</i><span>${t}</span></li>`, o = an ? a("todo", b("Conecte seu agent (o card acima diz como)")) : n ? a("ok", b("Seu agent está aqui")) : t ? a("wait", b("Abrindo seu agent no seu computador…")) : a("todo", `${b("Seu agent está desligado nesta sala")} <button class="linkish" data-on>${b("Ligar")}</button>`);
	e.className = "claudeBar start", e.hidden = !1, e.innerHTML = `<span class="star">✻</span><span><b>${b("Começando a sala")}</b><ul>
    ${a("ok", b("Sala criada"))}
    ${i.length ? a("ok", b("Na sala: {who}", { who: S(i.map(C).join(", ")) })) : a("todo", b("Só você aqui: convide em Pessoas"))}
    ${o}
    ${a(n ? "wait" : "todo", b("O agent escreve o doc e cria os épicos"))}
  </ul></span><button class="ghost" data-x aria-label="${b("Fechar")}" title="${b("Fechar")}">×</button>`, e.querySelector("[data-on]")?.addEventListener("click", () => document.getElementById("myClaude")?.click()), e.querySelector("[data-x]").onclick = () => {
		try {
			localStorage.setItem(r, "off");
		} catch {}
		e.hidden = !0, clearTimeout(kr);
	};
}
var Fr = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`, Ir = (e) => Math.min(100, Math.round(e.tokens / e.window * 100)), Lr = (e) => {
	let t = Ir(e), n = (e, t = 60, n = 80) => `<i class="ctx ${e >= n ? "hot" : e >= t ? "mid" : ""}" style="--p:${e}%"></i>`, r = (e, t, r) => `<div><div class="l"><b>${e}</b><span>${r}</span></div>${n(t)}</div>`, i = ["five_hour", "seven_day"].map((t) => {
		let n = e.limits?.[t];
		if (!n || n.r * 1e3 < Date.now()) return "";
		let i = /* @__PURE__ */ new Date(n.r * 1e3), a = i.toLocaleTimeString(st, {
			hour: "2-digit",
			minute: "2-digit"
		}), o = t === "five_hour" ? a : `${i.toLocaleDateString(st, { weekday: "short" }).replace(".", "")} ${a}`;
		return r(b(t === "five_hour" ? "Sessão de 5h" : "Semana"), n.p, b("{p}% · reseta {at}", {
			p: n.p,
			at: o
		}));
	});
	return `<div class="ctip">${r(b("Contexto"), t, `${t}% · ${Fr(e.tokens)}/${Fr(e.window)}`)}${i.join("")}</div>`;
}, Rr = (e) => {
	if (!e) return "";
	let t = Ir(e);
	return `<i class="ctx ${t >= 80 ? "hot" : t >= 60 ? "mid" : ""}" style="--p:${t}%"></i>`;
}, zr = (e) => {
	if (B.id !== N?.id) return "";
	let t = /* @__PURE__ */ new Set();
	return B.list.filter((t) => t.email === e).sort((e, t) => t.listening - e.listening).filter((e) => !t.has(ra(e.who) + e.repo) && t.add(ra(e.who) + e.repo)).slice(0, 3).map((t) => `<div class="member agentRow" title="${b("{via} de {who}", {
		via: S(ra(t.who)),
		who: S(C(e))
	})}${t.repo ? ` ${b("em {repo}", { repo: S(t.repo) })}` : ""} · ${t.listening ? t.all_rooms ? b("ouvindo todas as salas agora") : b("ouvindo esta sala agora") : b("visto há {ago}", { ago: w(t.seen_at) })}"><span class="aglyph ${ht(t.who)[0]} ${t.listening ? "on" : ""}">${ht(t.who)[1]}</span><span class="fn">${S(ra(t.who).replace(/^Claude\s+/i, ""))}${t.repo ? ` · ${S(t.repo)}` : ""}</span><small>${t.listening ? b("ouvindo") : w(t.seen_at)}${t.context ? ` · ${Ir(t.context)}%` : ""}</small>${Rr(t.context)}${t.context ? Lr(t.context) : ""}</div>`).join("");
}, Br = (e) => {
	if (!e || e.archived > 0) return null;
	let t = new Set((N.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg)), n = new Set(Xi().filter((n) => n.thread === e.id && !t.has(n.id)).map((e) => e.id));
	n.add(e.from_msg);
	let r = (N.acks || []).filter((e) => n.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts), i = r.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5);
	if (i) return {
		who: i.who,
		email: i.email
	};
	if (r[0]?.status === "done") return null;
	let a = N.messages.findLast((t) => t.thread === e.id && t.kind === "agent");
	return a && a.tag !== "done" && Date.now() - a.ts < 18e4 ? {
		who: a.via || "Agent",
		email: a.author
	} : null;
}, Vr = (e) => {
	let t = Br(e);
	return t ? b("{via} de {who}", {
		via: t.who,
		who: C(t.email)
	}) : null;
}, Hr = (e) => Et.filter((t) => t.book_id === N?.id && (e === void 0 || t.thread === e)), Ur = (e) => {
	let t = N?.avatars?.[e] ?? pt[e];
	return t ? `<img src="/api/avatar/${encodeURIComponent(e)}?v=${t}" alt="" loading="lazy" />` : S(C(e).slice(0, 2).toUpperCase());
}, Wr = (e, t) => e.owner ? `<span class="ri epOwner" style="background:${dt(e.owner)}" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" ` : ""}title="${S(b("Dono: {who}", { who: C(e.owner) }))}${t ? ` · ${b("clique pra trocar")}` : ""}">${Ur(e.owner)}</span>` : `<span class="ri" style="background:${dt(e.title)};color:#fff" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" title="${b("Sem dono · clique pra escolher")}"` : ""}>${S(Xn(e.title))}</span>`;
function Gr() {
	let e = document.getElementById("askBar");
	if (!e) return;
	let t = Hr().find((e) => /^a\d/.test(e.ref) && e.thread !== P);
	if (e.hidden = !t, !t) return;
	let n = (t.text || "").replace(/^(⏸|❓)\s*Seu Claude\s*/, "").replace(/[*`]/g, "").slice(0, 160);
	e.innerHTML = `<span>⏸ <b>${b("Seu agent espera você")}</b> ${b("em {where}", { where: S(t.topic || b("sala principal")) })}: ${S(n)}</span><button type="button" class="primary" data-askgo="${t.ref.slice(1)}">${b("Ver")}</button>`, e.querySelector("[data-askgo]").onclick = (e) => q(Number(e.currentTarget.dataset.askgo));
}
function Kr(e, t) {
	N?.id === e && N.me === t && A() === e && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), ei.matches && ni("doc"));
}
function H() {
	en(), Gr();
	let e = document.getElementById("side");
	if (!e || !N) return;
	ur(), Sn = ee(Sn, N, P, Jr), Cn = ve(Cn, N), hn && he(Cn, N, F);
	let t = N.id, n = N.me, r = Cn, i = wn(), a = () => N?.id === t && N.me === n && A() === t, o = (e) => {
		a() && (li(() => o(e)) || (W(!0), P = e, On = !0, Xr = P === "main" || z() ? null : P, H(), Q(), Qr(), $()));
	};
	L("sidebar", e, {
		room: N,
		thread: P,
		collapsed: $n && innerWidth > 900,
		roomIcon: Mt(Tt?.find((e) => e.id === t)),
		roomTint: Tt?.find((e) => e.id === t)?.tint,
		locale: st,
		mutations: i,
		presence: B.id === t ? {
			agents: B.list,
			sandboxes: B.sandboxes || []
		} : {
			agents: [],
			sandboxes: []
		},
		navigation: Sn,
		pins: r,
		request: (e, t) => a() && Cn === r ? yn(e, t) : Promise.resolve({
			ok: !1,
			error: "offline"
		}),
		send: (e) => a() ? F(e) : !1,
		onopen: o,
		onarchchange: (e) => {
			a() && (Jr = e);
		},
		onopenpinfile: (e) => {
			a() && Cn === r && K(e);
		},
		onopenpinapp: (e) => {
			a() && vi(`#app:${e.connectionId}/${e.tool}`);
		},
		ontogglerail: () => {
			a() && er();
		},
		onrenameroom: () => {
			a() && (j(), D.askRename(t));
		},
		onopenside: () => {
			a() && W();
		},
		onagents: () => Kr(t, n),
		mountSheetHandle: (e) => (ai(e, "side", !1), () => {
			e.onclick = e.onpointerdown = e.onpointermove = e.onpointerup = e.onpointercancel = null;
		}),
		foldOpen: Yr,
		friends: fn,
		appNavigation: {
			controller: D,
			lang: y
		},
		vb: Tn()
	}), document.title = `${N.book?.title ?? "vibebook"} · vibebook`, Qn(Kn());
}
function qr(e = () => {}, t = () => !0) {
	let n = document.getElementById("picFile");
	n && (n.onchange = async () => {
		let r = n.files?.[0];
		if (r) try {
			let i = await createImageBitmap(r), a = Math.min(i.width, i.height), o = document.createElement("canvas");
			o.width = o.height = 256, o.getContext("2d").drawImage(i, (i.width - a) / 2, (i.height - a) / 2, a, a, 0, 0, 256, 256), i.close();
			let s = await new Promise((e) => o.toBlob(e, "image/jpeg", .86));
			if (!t() || !n.isConnected) return;
			let c = await fetch("/api/me/avatar", {
				method: "POST",
				headers: { "content-type": "image/jpeg" },
				body: s
			});
			if (!c.ok) throw Error((await c.json().catch(() => ({}))).error || b("Não deu para salvar a foto."));
			t() && e();
		} catch (e) {
			t() && alert(e.message || b("Não deu para ler essa imagem."));
		}
	}, n.click());
}
function U(e, t = 7e3) {
	document.querySelector(".toast")?.remove(), document.body.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${e}</div>`);
	let n = document.querySelector(".toast");
	setTimeout(() => n.remove(), t);
}
b("A fazer"), b("Fazendo"), b("Esperando OK"), b("Feito");
var Jr = !1, Yr = {
	off: !1,
	friends: null
}, Xr = null, Zr = () => {
	x.querySelector(".book.boardview") && document.getElementById("toggleBoard").click();
};
function Qr() {
	let e = x.querySelector(".book"), t = e && tt(e);
	t && (e.classList.contains("boardview") || e.querySelector(":scope > .doc")?.dataset.pane === "board") && L("board", t, {
		room: N,
		thread: P,
		vb: Mn(),
		send: F,
		request: yn,
		onopen: Pn
	});
}
function $r() {
	ua();
}
var ei = matchMedia("(max-width: 900px)"), ti = !1;
function ni(e) {
	if (li(() => ni(e))) return;
	let t = x.querySelector(".book");
	t && ei.matches && t.dataset.sheet !== e && (t.dataset.sheet || ot.pushState({ sheet: 1 }, "", location.href), t.dataset.sheet = e);
}
function W(e) {
	if (li(() => W(e))) return;
	let t = x.querySelector(".book");
	t?.dataset.sheet && (R?.mode("preview"), delete t.dataset.sheet, history.state?.sheet && (e ? Zi = !1 : (ti = !0, history.back())));
}
function ri() {
	G?.closeNavigation();
	let e = x.querySelector(".book");
	history.state?.sheet && ot.replaceState(null, "", location.href), e?.dataset.sheet && (R?.mode("preview"), delete e.dataset.sheet);
}
function ii() {
	if (ti) return ti = !1, !0;
	let e = x.querySelector(".book");
	return e?.dataset.sheet ? (R?.mode("preview"), delete e.dataset.sheet, !0) : !1;
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && !e.defaultPrevented && x.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open], [data-dialog-content], [data-alert-dialog-content]") && W();
});
function ai(e, t, n, r) {
	if (!e) return;
	let i = !1;
	e.onclick = (e) => {
		i ? i = !1 : r ? r(e) : n ? ni(t) : W();
	}, e.onpointerdown = (r) => {
		let a = x.querySelector(".book")?.querySelector(t === "doc" ? ".doc" : ".side"), o = document.getElementById("sheetDim");
		if (!a || !ei.matches) return;
		let s = r.clientY, c = a.offsetHeight, l = 0, u = !1;
		i = !1, e.onpointermove = (t) => {
			if (l = (t.clientY - s) * -1, !u && Math.abs(l) < 6) return;
			u || e.setPointerCapture(r.pointerId), u = !0, a.classList.add("sheetDrag"), o.style.transition = "none";
			let i = Math.min(c, Math.max(0, n ? c + l : l));
			a.style.transform = `translateY(${i * -1}px)`, o.style.opacity = String(1 - i / c);
		}, e.onpointerup = e.onpointercancel = () => {
			e.onpointermove = e.onpointerup = e.onpointercancel = null, u && (i = !0, setTimeout(() => i = !1, 400), a.classList.remove("sheetDrag"), a.style.transform = "", o.style.transition = "", o.style.opacity = "", (n ? -l > c / 4 : l <= c / 4) ? ni(t) : W());
		};
	};
}
function oi() {
	let e = document.getElementById("tasks");
	if (!e) return;
	$();
	let t = N.epics.find((e) => e.id === P), n = document.getElementById("threadTitle"), r = N.id, i = N.me;
	L("threadHeader", n, {
		room: N,
		thread: P,
		titleId: "roomName",
		owner: wn(),
		vb: Tn(),
		roomIcon: Mt(Tt?.find((e) => e.id === r)),
		onopenside: () => {
			N?.id === r && N.me === i && ni("side");
		},
		onrenameroom: () => {
			N?.id === r && N.me === i && (j(), D.askRename(r));
		}
	});
	let a = {};
	for (let e of [...N.epics.flatMap((e) => e.tasks), ...N.roomTasks || []]) !e.done && e.owner && (a[e.owner] = (a[e.owner] || 0) + 1);
	Object.entries(a).sort((e, t) => t[1] - e[1]), n.closest(".chathead");
	let o = a[N.me] || 0, s = document.getElementById("toggleBoard");
	s.querySelector(".kN")?.remove(), o && s.insertAdjacentHTML("beforeend", `<b class="kN" title="${b("Esperando você")}: ${o}">${o}</b>`), s.title = o ? `${b("Quadro de tarefas")} · ${b("Esperando você")}: ${o}` : b("Quadro de tarefas (kanban)");
	let c = x.querySelector(".phHome");
	c && (c.title = c.ariaLabel = b(P === "main" ? "Seus vibebooks" : "Voltar pra sala principal"), c.onclick = (e) => {
		P !== "main" && (e.preventDefault(), e.stopPropagation(), Pn("main"));
	}), $r();
	let l = t || (P === "main" && N.roomTasks?.length ? {
		id: "main",
		tasks: N.roomTasks
	} : null);
	e.style.display = l ? "" : "none", l && En("tasks");
}
var G = null, si = null, ci = (matchMedia("(display-mode: standalone)").matches || navigator.standalone === !0) && (/iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
function li(e) {
	let t = N?.id, n = N?.me;
	return G?.deferNavigation(() => {
		N?.id === t && N?.me === n && A() === t && e();
	}) ?? !1;
}
function ui(e = !1) {
	if (!G || !N || !M || A() !== N.id) return;
	let t = N.id, n = N.me, r = M;
	G.sync(N, (e) => N?.id === t && N.me === n && M === r && A() === t ? r.request(e) : Promise.resolve({
		ok: !1,
		error: "disconnected"
	}), e);
}
function di() {
	return G || (G = ge({
		href: () => location.href,
		state: () => history.state,
		history
	}), si = document.createElement("div"), document.body.append(si), g("fileViewer", si, {
		controller: G,
		lang: y,
		iosStandalone: ci,
		actions: {
			navigate: (e, t) => q(e, t),
			openFile: (e) => K(e),
			navigateRich: (e) => vi(e.kind === "thread" ? `#e${e.id}` : e.id ? `#doc:${e.id}` : "#doc"),
			openFileReference: (e) => {
				N?.id === e.roomId && K(e.id, void 0, e.name);
			}
		}
	})), ui(), G;
}
function K(e, t, n) {
	return !N || !M || A() !== N.id || !x.querySelector(".book") ? !1 : di().open(typeof e == "string" ? {
		roomId: N.id,
		id: e,
		label: n
	} : {
		roomId: N.id,
		id: e.id,
		metadata: e
	}, t);
}
function fi(e) {
	if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
	let t = e.target.closest?.("a[href]");
	if (!t?.isConnected || !N) return;
	let n = xe(t.getAttribute("href"), location.origin);
	n && n.roomId === N.id && K(n.id, t, t.textContent?.trim()) && e.preventDefault();
}
document.addEventListener("click", fi);
var pi = (e) => new Date(e).toLocaleTimeString(st, {
	hour: "2-digit",
	minute: "2-digit"
});
function mi() {
	Q("stay");
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-gomain]");
	if (t) return q(Number(t.dataset.gomain), "main");
});
function hi() {
	return N ? sn.entry({
		account: N.me,
		roomId: N.id,
		thread: P
	}) : null;
}
function gi(e) {
	let t = Xi().find((t) => t.id === e);
	!t || ue(N, t) || re(N, t) || (t.thread !== P && Pn(t.thread), hi()?.reply(t));
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("a.mlink[data-msg], a[data-chat-rich~=mlink][data-msg]");
	if (t) return e.preventDefault(), q(Number(t.dataset.msg));
});
var _i = null;
function q(e, t) {
	if (li(() => q(e, t))) return;
	let n = N.messages.find((t) => t.id === e), r = n?.thread || t;
	r && r !== P && (r === "main" || N.epics.some((e) => e.id === r)) && (P = r, On = !0, H(), Q(), Qr(), $());
	let i = document.getElementById(`m${e}`);
	if (!i && n) {
		let t = N.messages.filter((e) => e.thread === P), r = t.indexOf(n);
		r >= 0 && (Z.n = Math.max(Z.n, t.length - r + 10), Q(!0), i = document.getElementById(`m${e}`));
	}
	if (!i) return _i?.id === e ? void 0 : (_i = {
		id: e,
		n: 0
	}, U(b("Buscando a mensagem…"), 1500), ta());
	_i = null, aa = !1, i.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), i.dispatchEvent(new CustomEvent("vb:message-highlight"));
}
function vi(e) {
	if (li(() => vi(e))) return;
	if (e.startsWith("#app:")) {
		let [t, n] = e.slice(5).split("/");
		Y = {
			cid: t,
			tool: n
		}, document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" })), ei.matches && ni("doc");
		return;
	}
	if (e.startsWith("#m")) return q(Number(e.slice(2)));
	let t = e.startsWith("#e") ? e.slice(2) : e.split(":")[1], n = t && N.epics.some((e) => e.id === t) ? t : t ? null : P;
	if (!n) return U(b("Esse épico não existe mais nesta sala."));
	n !== P && (P = n, On = !0, H(), Q(), Qr(), $()), e.startsWith("#doc") && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" })), ei.matches && ni("doc"));
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardgo]");
	t && (e.preventDefault(), vi(t.dataset.cardgo));
});
function yi() {
	let e = document.getElementById("decPane");
	if (!e) return;
	N.decisions, ua();
	let t = N.id;
	L("decisions", e, {
		room: N,
		thread: P,
		vb: Mn(),
		send: F,
		request: (e) => N?.id === t ? yn(e) : Promise.resolve({
			ok: !1,
			error: "disconnected"
		})
	});
}
function bi() {
	document.querySelector(".doc[data-pane=\"apps\"]") && X();
}
var J = null, xi = null, Si = !1, Y = null, Ci = /* @__PURE__ */ new Set();
async function wi() {
	if (!N?.id) return;
	let e = N.id, t = N.me, n = M, r = () => N?.id === e && N.me === t && M === n && A() === e;
	try {
		let t = await T(`/api/books/${e}/connections`);
		r() && (J = t.connections, xi = e);
	} catch (e) {
		if (!r()) return;
		J ||= [], U(S(e.message));
	}
	r() && X();
}
var Ti = (e) => e.scope === "me" ? `<span class="cScope me">${b("minha")}</span>` : `<span class="cScope">${b("da sala")}</span>`;
function Ei() {
	let e = /* @__PURE__ */ new Set();
	return (N.files || []).filter((t) => t.type === "text/html" && /^apps\/[\w.-]+\.html$/i.test(t.name) && !e.has(t.name) && e.add(t.name)).map((e) => ({
		tool: e.name.slice(5, -5),
		title: e.name.slice(5, -5),
		description: `${C(e.author)} · ${w(e.ts)}`,
		file: e
	}));
}
function Di() {
	document.querySelector(".doc[data-pane=\"apps\"]") && !(Y && document.querySelector(".connFrame")) && X();
}
function X() {
	let e = document.getElementById("appsPane");
	if (!e) return;
	if (xi !== N.id && (J = null, xi = N.id), N.filesAll || F({ t: "files.get" }), J === null) {
		e.innerHTML = `<div class="empty">${b("Carregando…")}</div>`, wi(), J = void 0;
		return;
	}
	if (J === void 0) return;
	let t = Ei();
	if (ua(), Y) return Oi(e);
	let n = document.getElementById("connForm") && Object.fromEntries(new FormData(document.getElementById("connForm"))), r = (e, t) => `<div class="connApps">${t.map((t) => `<button type="button" class="connApp" data-conn-open="${e}/${S(t.tool)}"><b>${S(t.title)}</b><span>${S(t.description)}</span></button>`).join("")}</div>`;
	e.innerHTML = `<div class="connHead"><b>Apps</b>${Si ? "" : `<button type="button" class="ghost" id="connAdd">${k("plus", 15)} ${b("Conectar MCP")}</button>`}</div>
    ${Si ? `<form class="connForm" id="connForm">
      <label>${b("URL do servidor MCP")}<input name="url" required placeholder="https://…/mcp" autocomplete="off" spellcheck="false"></label>
      <small class="mute">${b("Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.")}</small>
      <fieldset><label><input type="radio" name="scope" value="me" checked> ${b("Só minha: só eu e meus agents")}</label><label><input type="radio" name="scope" value="room"> ${b("Da sala: todo mundo vê; cada um entra com a própria conta")}</label></fieldset>
      <div class="acts"><button type="button" id="connCancel">${b("Cancelar")}</button><button class="primary">${b("Conectar")}</button></div></form>` : ""}
    <div class="conn"><div class="connTop"><b>${b("Esta sala")}</b><span class="cScope">${b("da sala")}</span><small>apps/*.html</small></div>
      ${t.length ? r("room", t) : `<small class="mute">${b("Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.")}</small>`}</div>
    ${J.map((e) => `<div class="conn"><div class="connTop"><b>${S(e.title)}</b>${Ti(e)}<small>${S(e.host)} · ${S(C(e.owner))}</small>
        <button type="button" class="ghost" data-conn-ref="${e.id}" title="${b("Atualizar")}" aria-label="${b("Atualizar")}">↻</button>${e.mine ? `<button type="button" class="ghost" data-conn-del="${e.id}" title="${b("Remover conexão")}" aria-label="${b("Remover conexão")}">${k("x", 14)}</button>` : ""}</div>
        ${e.auth === "identity" ? e.signed_in ? `<small class="mute connWho">${b("Você entrou em {host} com a sua conta.", { host: S(e.host) })} <button type="button" class="link" data-conn-out="${e.id}">${b("Sair")}</button></small>` : `<div class="connSign"><small>${b("Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.", { host: S(e.host) })}</small><a class="primary" href="/api/books/${N.id}/connections/${e.id}/signin?ui=svelte">${b("Entrar em {host}", { host: S(e.host) })}</a></div>` : ""}
        ${e.apps.length ? (() => {
		let t = e.apps.filter((e) => e.screen), n = t.length && !Ci.has(e.id);
		return r(e.id, n ? t : e.apps) + (t.length && t.length < e.apps.length ? `<button type="button" class="link connMore" data-conn-more="${e.id}">${n ? b("ver todas ({n})", { n: e.apps.length }) : b("só as telas")}</button>` : "");
	})() : `<small class="mute">${b("{n} tools, nenhum app", { n: e.tools.length })}</small>`}</div>`).join("")}`;
	let i = document.getElementById("connForm");
	if (i && n) for (let [e, t] of Object.entries(n)) i.elements[e] && e !== "scope" && (i.elements[e].value = t);
	document.getElementById("connAdd")?.addEventListener("click", () => {
		Si = !0, X(), document.querySelector("#connForm [name=\"url\"]")?.focus();
	}), document.getElementById("connCancel")?.addEventListener("click", () => {
		Si = !1, X();
	}), i && (i.onsubmit = async (e) => {
		e.preventDefault();
		let t = i.querySelector(".primary");
		t.disabled = !0, t.textContent = b("Conectando…");
		try {
			let e = await T(`/api/books/${N.id}/connections`, {
				url: i.url.value.trim(),
				scope: i.scope.value
			});
			if (e.connection?.needs_sign_in) return void (location.href = `/api/books/${N.id}/connections/${e.connection.id}/signin?ui=svelte`);
			Si = !1, J = null, X();
		} catch (e) {
			U(S(e.message)), t.disabled = !1, t.textContent = b("Conectar");
		}
	}), e.querySelectorAll("[data-conn-out]").forEach((e) => e.onclick = async () => {
		try {
			await T(`/api/books/${N.id}/connections/${e.dataset.connOut}/signout`, {});
		} catch (e) {
			U(S(e.message));
		}
		J = null, X();
	}), e.querySelectorAll("[data-conn-more]").forEach((e) => e.onclick = () => {
		let t = e.dataset.connMore;
		Ci.has(t) ? Ci.delete(t) : Ci.add(t), X();
	}), e.querySelectorAll("[data-conn-open]").forEach((e) => e.onclick = () => {
		let [t, n] = e.dataset.connOpen.split("/");
		Y = {
			cid: t,
			tool: n
		}, X();
	}), e.querySelectorAll("[data-conn-ref]").forEach((e) => e.onclick = async () => {
		try {
			await T(`/api/books/${N.id}/connections/${e.dataset.connRef}/refresh`, {}), J = null, X();
		} catch (e) {
			U(S(e.message));
		}
	}), e.querySelectorAll("[data-conn-del]").forEach((e) => e.onclick = async () => {
		let t = J.find((t) => t.id === e.dataset.connDel);
		confirm(b("Remover a conexão {name}? Os apps dela saem da sala.", { name: t?.title || "" })) && (await fetch(`/api/books/${N.id}/connections/${e.dataset.connDel}`, { method: "DELETE" }), J = null, X());
	});
}
function Oi(e) {
	let t = Y.cid === "room", n = t ? {
		id: "room",
		scope: "room",
		title: b("Esta sala")
	} : J.find((e) => e.id === Y.cid), r = t ? Ei().find((e) => e.tool === Y.tool) : n?.apps.find((e) => e.tool === Y.tool);
	if (!n || !r) {
		if (t && !N.filesAll) {
			e.innerHTML = `<div class="empty">${b("Carregando…")}</div>`;
			return;
		}
		return !t && !Y.retried ? (Y.retried = !0, J = null, X()) : (Y = null, U(b("Esse app não está nas conexões que você pode usar nesta sala.")), X());
	}
	let i = `${n.id}/${r.tool}${t ? `@${r.file.id}` : ""}`, a = t ? r.tool : `${n.id}/${r.tool}`, o = e.querySelector(".connBar");
	if (e.querySelector(".connFrame")?.dataset.app === i) {
		o?.querySelector(".pinBtn")?.replaceWith(Object.assign(document.createElement("template"), { innerHTML: Wi("app", a) }).content), o && Gi(o);
		return;
	}
	e.innerHTML = `<div class="connBar"><button type="button" class="ghost" id="connBack">← Apps</button><b>${S(r.title)}</b>${Ti(n)}${Wi("app", a)}<button type="button" class="ghost" id="connReload" title="${b("Recarregar")}" aria-label="${b("Recarregar")}">↻</button></div><div class="appAsk" id="appAsk" hidden></div><iframe class="connFrame" sandbox="allow-scripts allow-forms" title="${S(r.title)}"></iframe>`;
	let s = e.querySelector(".connFrame");
	s.dataset.app = i, document.getElementById("connBack").onclick = () => {
		Y = null, X();
	}, Gi(e.querySelector(".connBar")), document.getElementById("connReload").onclick = () => {
		s.dataset.app = "", Oi(e);
	}, Bi(s, n, r);
}
var ki = (e) => Array.isArray(e) ? e.filter((e) => e?.type === "text").map((e) => e.text).join("\n") : "", Ai = (e) => ({
	content: [{
		type: "text",
		text: typeof e == "string" ? e : JSON.stringify(e)
	}],
	...e && typeof e == "object" ? { structuredContent: e } : {}
}), ji = Promise.resolve();
function Mi(e, t, n) {
	let r = () => new Promise((r) => {
		if (!e?.isConnected) return r(!1);
		e.hidden = !1, e.innerHTML = `<span>${b("Este app quer {what}, como você:", { what: S(t) })}</span><q></q><div><button type="button" class="primary">${b("Permitir")}</button><button type="button" class="ghost">${b("Cancelar")}</button></div>`, e.querySelector("q").textContent = String(n).slice(0, 600);
		let i = (t) => {
			e.hidden = !0, e.innerHTML = "", r(t);
		};
		e.querySelector(".primary").onclick = () => i(!0), e.querySelector(".ghost").onclick = () => i(!1);
	});
	return ji = ji.then(r, r);
}
var Ni = [
	{
		name: "vibebook_read",
		description: "The room: title, doc, epics with tasks, members and the newest messages of a thread (default main).",
		inputSchema: {
			type: "object",
			properties: {
				thread: { type: "string" },
				limit: { type: "number" }
			}
		},
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_post",
		description: "Post a message as the person looking at the app (they confirm first).",
		inputSchema: {
			type: "object",
			properties: {
				text: { type: "string" },
				thread: { type: "string" }
			},
			required: ["text"]
		}
	},
	{
		name: "vibebook_add_task",
		description: "Add a task to an epic (epic_id) or to the room (main); the person confirms.",
		inputSchema: {
			type: "object",
			properties: {
				title: { type: "string" },
				epic_id: { type: "string" }
			},
			required: ["title"]
		}
	},
	{
		name: "vibebook_task_status",
		description: "Move a task: todo | doing | review | done; the person confirms.",
		inputSchema: {
			type: "object",
			properties: {
				task_id: { type: "string" },
				status: {
					type: "string",
					enum: [
						"todo",
						"doing",
						"review",
						"done"
					]
				}
			},
			required: ["task_id", "status"]
		}
	},
	{
		name: "vibebook_connections",
		description: "The room's MCP connections this person can use, with their tools.",
		inputSchema: { type: "object" },
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_call_connection",
		description: "Call a tool of one of the room's MCP connections; tools that aren't read-only ask the person first.",
		inputSchema: {
			type: "object",
			properties: {
				connection_id: { type: "string" },
				tool: { type: "string" },
				arguments: { type: "object" }
			},
			required: ["connection_id", "tool"]
		}
	},
	{
		name: "vibebook_ai_spend",
		description: "vibebook's model spend: Jev and the LLMs by event and model, the hub router, the last 30 days and OpenRouter's total for the key. Only in vibebook's report rooms.",
		inputSchema: {
			type: "object",
			properties: {}
		},
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_router_stats",
		description: "The person's hub router A/B (Jev vs Haiku): per arm how many messages were ignored, answered or woke their Claude, latency p50/p95, cost, and the last 40 decisions. room: true = only this room.",
		inputSchema: {
			type: "object",
			properties: { room: { type: "boolean" } }
		},
		annotations: { readOnlyHint: !0 }
	}
];
function Pi({ thread: e = "main", limit: t = 50 } = {}) {
	let n = Xi().filter((t) => t.thread === e).slice(-Math.min(Math.max(Number(t) || 50, 1), 100));
	return {
		room: {
			id: N.id,
			title: Kn()
		},
		me: {
			email: N.me,
			name: C(N.me)
		},
		members: (N.members || []).map((e) => ({
			email: e.email ?? e,
			name: C(e.email ?? e)
		})),
		doc: N.doc || "",
		epics: N.epics.filter((e) => !e.archived).map((e) => ({
			id: e.id,
			title: e.title,
			tasks: e.tasks.map((e) => ({
				id: e.id,
				title: e.title,
				status: e.status,
				owner: e.owner || null
			}))
		})),
		room_tasks: (N.roomTasks || []).map((e) => ({
			id: e.id,
			title: e.title,
			status: e.status
		})),
		messages: n.map((e) => ({
			id: e.id,
			from: e.author === "ai" ? "@vibe" : C(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
async function Fi(e, t = {}, n) {
	let r = (e) => Ai(e), i = (e) => e && e !== "main" && !N.epics.some((t) => t.id === e) ? null : e || "main";
	switch (e) {
		case "vibebook_read": return r(Pi(t));
		case "vibebook_ai_spend": {
			let e = await fetch(`/api/metrics/ai-spend?room=${N.id}`).catch(() => null);
			return e && e.ok ? r(await e.json()) : {
				isError: !0,
				content: [{
					type: "text",
					text: `spend unavailable${e ? ` (${e.status})` : ""}`
				}]
			};
		}
		case "vibebook_router_stats": {
			let e = await fetch(`/api/router/stats${t.room ? `?room=${N.id}` : ""}`).catch(() => null);
			return e && e.ok ? r(await e.json()) : {
				isError: !0,
				content: [{
					type: "text",
					text: `router stats unavailable${e ? ` (${e.status})` : ""}`
				}]
			};
		}
		case "vibebook_connections": return Array.isArray(J) || await wi(), r((J || []).map((e) => ({
			id: e.id,
			title: e.title,
			scope: e.scope,
			tools: e.tools
		})));
		case "vibebook_post": {
			let e = i(t.thread), a = String(t.text || "").trim().slice(0, 4e3);
			return !e || !a ? {
				isError: !0,
				content: [{
					type: "text",
					text: "text and a valid thread (main or an epic id) needed"
				}]
			} : await n(b("postar"), a) ? (F({
				t: "msg",
				thread: e,
				text: a,
				files: []
			}), r("posted")) : {
				isError: !0,
				content: [{
					type: "text",
					text: "the person cancelled"
				}]
			};
		}
		case "vibebook_add_task": {
			let e = t.epic_id && t.epic_id !== "main" ? N.epics.find((e) => e.id === t.epic_id) : null;
			if (t.epic_id && t.epic_id !== "main" && !e) return {
				isError: !0,
				content: [{
					type: "text",
					text: "no such epic"
				}]
			};
			let i = String(t.title || "").trim().slice(0, 200);
			return !i || !await n(b("criar uma tarefa"), `${e ? e.title : b("sala principal")}: ${i}`) ? {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			} : (F({
				t: "task.add",
				epic: e ? e.id : "main",
				title: i
			}), r("added"));
		}
		case "vibebook_task_status": {
			let e = [...N.epics.flatMap((e) => e.tasks), ...N.roomTasks || []].find((e) => e.id === t.task_id);
			return !e || ![
				"todo",
				"doing",
				"review",
				"done"
			].includes(t.status) ? {
				isError: !0,
				content: [{
					type: "text",
					text: "no such task or bad status"
				}]
			} : await n(b("mover uma tarefa"), `${e.title} → ${t.status}`) ? (F({
				t: "task.status",
				id: e.id,
				status: t.status
			}), r("moved")) : {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			};
		}
		case "vibebook_call_connection": {
			Array.isArray(J) || await wi();
			let e = (J || []).find((e) => e.id === t.connection_id), r = e?.tools.find((e) => e.name === t.tool);
			return r ? await n(b("usar {tool} em {conn}", {
				tool: r.name,
				conn: e.title
			}), JSON.stringify(t.arguments || {})) ? (await T(`/api/books/${N.id}/connections/${e.id}/call`, {
				name: r.name,
				arguments: t.arguments || {}
			})).result : {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			} : {
				isError: !0,
				content: [{
					type: "text",
					text: "no such connection/tool for this person"
				}]
			};
		}
	}
	return {
		isError: !0,
		content: [{
			type: "text",
			text: `unknown tool ${e}`
		}]
	};
}
var Ii = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new Set();
function Ri(e, t) {
	let n = (n) => {
		(!t.current || t.current()) && e.contentWindow?.postMessage({
			jsonrpc: "2.0",
			...n
		}, "*");
	}, r = async (e, n) => t.current && !t.current() ? !1 : await (t.askNative ? t.askNative(e, n) : Mi(t.ask(), e, n)) && (!t.current || t.current()), i = (e, n) => t.call ? t.call(e, n || {}) : Fi(e, n || {}, r), a = () => document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches;
	return async (o) => {
		if (t.current && !t.current()) return;
		let s = (e) => o.id !== void 0 && n({
			id: o.id,
			result: e
		});
		try {
			switch (o.method) {
				case "ui/initialize": {
					let n = e.getBoundingClientRect();
					return s({
						protocolVersion: "2026-01-26",
						hostInfo: {
							name: "vibebook",
							version: "1"
						},
						hostCapabilities: {
							openLinks: {},
							serverTools: {},
							logging: {},
							message: { text: {} },
							updateModelContext: {
								text: {},
								structuredContent: {}
							}
						},
						hostContext: {
							...t.tool ? { toolInfo: { tool: t.tool } } : {},
							theme: a() ? "dark" : "light",
							displayMode: t.embed ? "inline" : "fullscreen",
							availableDisplayModes: [t.embed ? "inline" : "fullscreen"],
							containerDimensions: t.embed ? {
								maxHeight: 420,
								width: Math.round(n.width)
							} : {
								height: Math.round(n.height),
								width: Math.round(n.width)
							},
							locale: st,
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							platform: ei.matches ? "mobile" : "web",
							user: {
								email: N.me,
								name: C(N.me)
							},
							room: {
								id: N.id,
								title: Kn()
							}
						}
					});
				}
				case "ui/notifications/initialized":
					t.first && (n({
						method: "ui/notifications/tool-input",
						params: { arguments: {} }
					}), n({
						method: "ui/notifications/tool-result",
						params: await t.first
					}));
					return;
				case "ui/notifications/size-changed": {
					if (!t.embed || typeof o.params?.height != "number") return;
					if (t.resize) {
						t.resize(o.params.height);
						return;
					}
					let n = Math.min(420, Math.round(innerHeight * .55)), r = Math.max(Math.ceil(o.params.height) + 2, 40);
					e.style.height = `${Math.min(r, n)}px`, e.closest(".embedWrap")?.classList.toggle("clipped", r > n);
					return;
				}
				case "tools/list": return s({ tools: t.call ? [] : Ni });
				case "tools/call": return s(await i(o.params?.name, o.params?.arguments));
				case "ui/open-link": {
					let e = String(o.params?.url || "");
					return !/^https?:\/\//i.test(e) || !await r(b("abrir um link"), e) ? s({ isError: !0 }) : (window.open(e, "_blank", "noopener"), s({}));
				}
				case "ui/message": {
					let e = ki(o.params?.content).trim().slice(0, 4e3);
					return s(e ? await Fi("vibebook_post", {
						text: e,
						thread: t.thread ?? P
					}, r) : {});
				}
				case "ui/update-model-context": {
					let e = ki(o.params?.content) || (o.params?.structuredContent ? JSON.stringify(o.params.structuredContent) : "");
					return e && t.base && T(`${t.base}/context`, {
						tool: t.toolName,
						text: e.slice(0, 4e3)
					}).catch(() => {}), s({});
				}
				case "ui/request-display-mode": return s({ mode: t.embed ? "inline" : "fullscreen" });
				case "ping": return s({});
				default:
					if (o.method.startsWith("notifications/") || o.method.startsWith("ui/notifications/")) return;
					o.id !== void 0 && n({
						id: o.id,
						error: {
							code: -32601,
							message: `vibebook doesn't support ${o.method} yet`
						}
					});
			}
		} catch (e) {
			o.id !== void 0 && n({
				id: o.id,
				error: {
					code: -32e3,
					message: String(e.message || e)
				}
			});
		}
	};
}
function zi(e) {
	if (!Ii.has(e)) {
		let t = e.closest(".embedBox"), n = P;
		Ii.set(e, Ri(e, {
			embed: !0,
			thread: n,
			ask: () => t.querySelector(".appAsk") || t.appendChild(Object.assign(document.createElement("div"), {
				className: "appAsk",
				hidden: !0
			}))
		}));
	}
	return Ii.get(e);
}
addEventListener("message", (e) => {
	let t = e.data;
	if (!t || !N || e.origin !== "null") return;
	let n = document.querySelector(".connFrame"), r = n?.contentWindow === e.source ? n : [...document.querySelectorAll("iframe.embed"), ...Li].find((t) => t.isConnected && t.contentWindow === e.source);
	if (r) {
		if (t.vbEmbed === 1) return zi(r)(typeof t.h == "number" ? {
			method: "ui/notifications/size-changed",
			params: { height: t.h }
		} : {
			method: "ui/message",
			params: { content: [{
				type: "text",
				text: String(t.send || "")
			}] }
		});
		t.jsonrpc === "2.0" && typeof t.method == "string" && (Ii.get(r) || zi(r))(t);
	}
});
async function Bi(e, t, n) {
	let r = t.id === "room", i = `/api/books/${N.id}/connections/${t.id}`, a = () => document.getElementById("appAsk");
	if (r) {
		Ii.set(e, Ri(e, {
			ask: a,
			tool: {
				name: n.tool,
				title: n.title
			},
			first: Promise.resolve(Ai(Pi()))
		})), e.src = `/api/books/${N.id}/files/${n.file.id}`;
		return;
	}
	let o;
	try {
		o = await T(`${i}/ui?tool=${encodeURIComponent(n.tool)}`);
	} catch (t) {
		let n = document.createElement("div");
		n.className = "empty", n.textContent = t.message, e.replaceWith(n);
		return;
	}
	let s = (e, t) => T(`${i}/call`, {
		name: e,
		arguments: t
	}).then((e) => e.result), c = s(n.tool, {}).catch((e) => ({
		isError: !0,
		content: [{
			type: "text",
			text: e.message
		}]
	}));
	Ii.set(e, Ri(e, {
		ask: a,
		call: s,
		first: c,
		tool: o.tool,
		base: i,
		toolName: n.tool
	})), e.srcdoc = o.html;
}
function Vi() {
	let e = document.getElementById("remPane");
	e && N && ($r(), (N.reminders || []).filter((e) => e.error).length, ua(), L("reminders", e, {
		room: N,
		thread: P,
		vb: Mn(),
		send: F,
		request: yn
	}));
}
function Hi(e = !1, t = !1) {
	let n = document.getElementById("filesPane");
	if (!n || !N) return;
	$r(), N.filesN ?? N.files?.length, ua(), An?.roomId !== N.id && (An?.dispose(), An = f(N.id));
	let r = An, i = N.id, a = M;
	r.sync(N, t);
	let o = () => An === r && N?.id === i && M === a && A() === i, s = (e) => o() && a ? a.request(e) : Promise.resolve({
		ok: !1,
		error: b("sem conexão")
	});
	(e || t && n.parentElement?.dataset.pane === "files") && r.load(s), L("files", n, {
		room: N,
		thread: P,
		vb: Mn(),
		send: F,
		session: r,
		request: s,
		onfolderchange: () => {
			o() && (n.scrollTop = 0);
		},
		onopenfile: (e) => {
			o() && K(e);
		}
	});
}
var Ui = (e, t) => (N.pins || []).find((n) => n.kind === e && n.ref === t), Wi = (e, t) => {
	let n = !!Ui(e, t);
	return `<button type="button" class="ghost pinBtn${n ? " on" : ""}" data-pin-kind="${e}" data-pin-ref="${S(t)}" title="${b(n ? "Desafixar" : "Fixar na lateral")}" aria-label="${b(n ? "Desafixar" : "Fixar na lateral")}" aria-pressed="${n}">${k("pin", 14)}</button>`;
};
function Gi(e) {
	e.querySelectorAll("[data-pin-kind]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation();
		let n = Ui(e.dataset.pinKind, e.dataset.pinRef);
		F(n ? {
			t: "pin.del",
			id: n.id
		} : {
			t: "pin.add",
			kind: e.dataset.pinKind,
			ref: e.dataset.pinRef
		});
	});
}
var Ki = 60, Z = {
	thread: null,
	n: Ki
}, qi = {}, Ji = !1, Yi = /* @__PURE__ */ new Set(), Xi = () => N.origins?.length ? [...N.messages, ...N.origins.filter((e) => !N.messages.some((t) => t.id === e.id))] : N.messages, Zi = !1;
function Qi() {
	if (!N) return;
	let e = r(`/b/${N.id}${P !== "main" && !z() ? `?t=${encodeURIComponent(P)}` : ""}`, location.href, "svelte");
	location.pathname + location.search !== e && ot[Zi ? "pushState" : "replaceState"](null, "", e), Zi = !0;
}
function $i() {
	let e = document.getElementById("thFiles");
	if (!e || !N) return;
	let t = N.id, n = N.me;
	e.hidden = !1, L("threadFiles", e, {
		room: N,
		thread: P,
		lang: y,
		onopen: (e, r) => {
			N?.id === t && N.me === n && r.isConnected && K(e, r);
		}
	});
}
function ea() {
	let e = document.getElementById("composer");
	if (!e || !N) return;
	if (z()) {
		En("composer");
		return;
	}
	let t = N.id, n = P, r, i = () => N?.id === t && P === n && e.isConnected && bn.get("composer") === r;
	L("composer", e, {
		room: N,
		thread: P,
		vb: Nn(),
		drafts: sn,
		request: (e) => i() ? yn(e) : Promise.resolve({
			ok: !1,
			error: "offline"
		}),
		upload: (e, n) => _e(t, (e, t) => fetch(e, {
			...t,
			signal: n
		})).uploadFile(e),
		agents: B.id === t && B.sandboxes || [],
		navigate: (e) => {
			i() && q(e, n);
		},
		hidden: z() || !!e.closest(".book")?.classList.contains("boardview")
	}), r = bn.get("composer");
}
function Q(e) {
	Gr(), $i(), Qi(), ea(), oi();
	let t = document.getElementById("msgs");
	if (x.querySelector(".book")?.classList.toggle("pre", z()), z()) return En("chat"), nr(t);
	if (En("suggestionPreview"), Z.thread !== P || Z.room !== N.id) {
		let e = x.querySelector(".book"), t = Hr(P).some((e) => e.ref.startsWith("t")) || !!N.epics.find((e) => e.id === P)?.tasks.some((e) => !e.done && e.owner === N.me);
		P !== "main" && e?.classList.contains("nodoc") && !e.classList.contains("boardview") && (t || !N.messages.some((e) => e.thread === P)) && e.classList.remove("nodoc");
		let n = N.id, r = P;
		(P !== "main" || Hr(P).length) && setTimeout(() => {
			if (N?.id !== n || P !== r) return;
			let e = [...document.querySelectorAll(".task.waitTask")];
			e.length || (e = [...document.querySelectorAll(".task.mine")]), e[0]?.classList.contains("task") && e[0].scrollIntoView({
				block: "center",
				behavior: "smooth"
			}), e.forEach((e) => {
				e.classList.remove("shimmer"), e.offsetWidth, e.classList.add("shimmer");
			});
		}, 400);
	}
	(Z.thread !== P || Z.room !== N.id) && (Z = {
		thread: P,
		room: N.id,
		n: Ki
	});
	let n = ce(N, P);
	hn && n.length < Ki && !Ji && !N.complete && !N.full?.includes(P) && !qi[N.id + P] && !Yi.has(N.id + P) && (Yi.add(N.id + P), Ji = !0, F({
		t: "older",
		thread: P,
		before: n[0]?.id ?? 0
	}));
	let r = n.slice(-Z.n), i = n.length > r.length || n.length && !N.complete && !N.full?.includes(P) && !qi[N.id + P], a = t.scrollHeight, o = t.scrollTop, s = N.epics.find((e) => e.id === P)?.from_msg, c = s && (N.messages.find((e) => e.id === s) || N.origins?.find((e) => e.id === s)), l = N.counts ? (N.counts[P] ?? 0) + n.filter((e) => e.id > (N.countsAt ?? 0)).length : n.length, u = N.id, d = P, f, p = () => N?.id === u && P === d && t.isConnected && bn.get("chat") === f;
	L("chat", t, {
		room: N,
		thread: P,
		list: r,
		previous: n[n.length - r.length - 1],
		more: i,
		origin: c || null,
		replyCount: l,
		vb: Nn(),
		actions: {
			request: (e) => p() ? yn(e) : Promise.resolve({
				ok: !1,
				error: "disconnected"
			}),
			draftReply: (e) => {
				if (!p()) return;
				let t = Xi().find((t) => t.id === e.messageId);
				t && t.thread === e.thread && se(N, t) && me(t.choices) && !me(t.choices).closed && !ne(t) && (t.thread !== P && Pn(t.thread), N?.id === u && hi()?.reply(t, e.text));
			},
			openApp: (e) => {
				p() && /^(room|[a-f0-9]{12})$/.test(e.connection) && /^[\w.-]{1,100}$/.test(e.tool) && vi(`#app:${e.connection}/${e.tool}`);
			},
			navigateRich: (e) => {
				p() && vi(e.kind === "thread" ? `#e${e.id}` : e.id ? `#doc:${e.id}` : "#doc");
			},
			openFileReference: (e) => {
				p() && e.roomId === u && /^[0-9a-f]+$/.test(e.id) && K(e.id, void 0, e.name);
			},
			mountEmbed: (e, t, n) => (Li.add(e), Ii.set(e, Ri(e, {
				embed: !0,
				thread: n.thread,
				current: () => p() && e.isConnected,
				askNative: n.ask,
				resize: n.resize
			})), () => {
				Li.delete(e), Ii.delete(e);
			}),
			reply: (e) => {
				p() && gi(e);
			},
			navigate: (e, t) => {
				p() && q(e, t);
			},
			openFile: (e) => {
				let t = [...N?.files || [], ...N ? Xi().flatMap((e) => e.files || []) : []].some((t) => t.id === e.id && t.name === e.name && t.type === e.type && t.size === e.size && t.ts === e.ts && t.author === e.author);
				p() && t && K(e);
			}
		},
		onloadolder: () => {
			p() && na();
		}
	}), f = bn.get("chat"), e === "stay" ? (t.scrollTop = o, sa(t)) : e ? (t.scrollTop = o + t.scrollHeight - a, sa(t)) : (ca(!0), sa(t));
}
function ta() {
	let e = N.messages.filter((e) => e.thread === P);
	Ji = !0, F({
		t: "older",
		thread: P,
		before: e[0]?.id ?? 0
	});
}
function na() {
	if (Ji || z()) return;
	let e = N.messages.filter((e) => e.thread === P);
	if (e.length > Z.n) return Z.n += Ki, Q(!0);
	N.complete || N.full?.includes(P) || qi[N.id + P] || !e.length || (Ji = !0, F({
		t: "older",
		thread: P,
		before: e[0].id
	}));
}
var ra = (e) => String(e ?? "").replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function ia(e) {
	Q(aa || e.author === N.me && e.kind !== "agent" ? void 0 : "stay");
}
var aa = !0, oa = new ResizeObserver(() => {
	let e = document.getElementById("msgs");
	e && aa && (e.scrollTop = e.scrollHeight);
});
function sa(e) {
	e && (e.hasAttribute?.("data-chat-message") ? [e] : e.querySelectorAll("[data-chat-message]")).forEach((e) => oa.observe(e));
}
function ca(e) {
	let t = document.getElementById("msgs");
	if (t) {
		t.onscroll ??= () => {
			t.scrollHeight - t.scrollTop - t.clientHeight < 80 ? aa = !0 : t.scrollTop < (t._lastTop ?? 0) - 2 && (aa = !1), t._lastTop = t.scrollTop, t.scrollTop < 150 && !aa && na();
		}, oa.observe(t), t._mo ??= new MutationObserver((e) => {
			for (let t of e) t.addedNodes.forEach((e) => e.nodeType === 1 && oa.observe(e));
			aa && (t.scrollTop = t.scrollHeight);
		}), t._mo.observe(t, { childList: !0 });
		for (let e of t.children) oa.observe(e);
		e && (aa = !0), (e || t.scrollHeight - t.scrollTop - t.clientHeight < 200) && (t.scrollTop = t.scrollHeight);
	}
}
function la() {
	return N ? ze(N, P, R?.roomDocument() ?? !1).epicId : null;
}
function $(e = !1, t = !1) {
	let n = document.getElementById("nativeDocument");
	if (!n || !N) return;
	let r = N.id, i = N.me, a = M, s = n.closest(".book");
	R ||= o({
		drafts: kn,
		authorizationEpoch: ln,
		request: (e) => l() ? yn(e) : Promise.resolve({
			ok: !1,
			error: "disconnected"
		}),
		name: (e) => C(e.me),
		color: (e) => dt(e.me),
		label: y === "en" ? "Document editor" : "Editor do documento",
		readMode: () => localStorage.getItem("vb.docView"),
		writeMode: (e) => localStorage.setItem("vb.docView", e)
	});
	let c = R;
	function l() {
		return R === c && N?.id === r && N.me === i && M === a && A() === r && s.isConnected;
	}
	c.sync(N, P, e, t, ln), On && (On = !1, c.chooseRoom(!1)), L("document", n, {
		owner: c,
		props: {
			room: N,
			thread: P,
			send: (e) => l() ? F(e) : !1,
			taskProps: {
				room: N,
				thread: P,
				vb: Mn(),
				send: (e) => l() ? F(e) : !1,
				request: (e) => l() ? yn(e) : Promise.resolve({
					ok: !1,
					error: "disconnected"
				}),
				waits: Et
			},
			actions: {
				navigate: (e, t) => {
					l() && q(e, t);
				},
				navigateRich: (e) => {
					l() && vi(e.kind === "thread" ? `#e${e.id}` : e.id ? `#doc:${e.id}` : "#doc");
				},
				openFile: (e) => {
					l() && [...N.files || [], ...Xi().flatMap((e) => e.files || [])].some((t) => t.id === e.id && t.name === e.name && t.type === e.type && t.ts === e.ts && t.size === e.size && t.author === e.author) && K(e);
				},
				openFileReference: (e) => {
					l() && e.roomId === r && /^[0-9a-f]+$/.test(e.id) && K(e.id, void 0, e.name);
				}
			},
			lang: y,
			onAuthorize: () => {
				l() && (M?.dispose(), M = null, jn(), mn.delete(r), vn(r));
			},
			pane: s.querySelector(":scope > .doc")?.dataset.pane || "doc",
			onPane: (e) => {
				l() && Dn?.(e);
			}
		}
	}), ua();
}
function ua() {
	if (!N || !R) return;
	let e = x.querySelector(".book"), t = N.id, n = N.me, r = M, i = R, a = () => R === i && N?.id === t && N.me === n && M === r && A() === t && e?.isConnected, o = _r(), s = B.list.filter((e) => e.email === N.me).some((e) => Date.now() - e.seen_at < 18e5), c = o.some((e) => e.st === "blocked"), l = {
		board: [...N.epics.flatMap((e) => e.tasks), ...N.roomTasks || []].filter((e) => !e.done && e.owner === N.me).length,
		files: N.filesN ?? N.files?.length ?? 0,
		apps: (J || []).length + Ei().length,
		decisions: N.decisions?.length ?? 0,
		reminders: (N.reminders || []).some((e) => e.error) ? `${N.reminders?.length ?? 0} ⚠` : N.reminders?.length ?? 0,
		agents: o.length
	}, u = {
		owner: i,
		room: N,
		lang: y,
		pane: e.querySelector(":scope > .doc")?.dataset.pane || "doc",
		counts: l,
		agentState: c ? "blocked" : o.length ? "busy" : s ? "idle" : "",
		agentTitle: c ? b("Seu agent espera você no terminal") : o.length ? b("Fila do seu agent: {n}", { n: o.length }) : s ? b("Seu agent está livre") : "Agents"
	}, d = document.getElementById("nativeDocumentToolbar"), f = document.getElementById("nativeDocumentPeek");
	d && L("documentToolbar", d, {
		...u,
		onPane: (e) => {
			a() && Dn?.(e);
		}
	}), f && L("documentPeek", f, {
		...u,
		compact: !0,
		onPane: (t) => {
			if (a()) {
				if (e.dataset.sheet === "doc" && e.dataset.pane === t) return W();
				e.classList.contains("boardview") && document.getElementById("toggleBoard").click(), Dn?.(t), ni("doc");
			}
		}
	});
}
var da = 3e5;
function fa() {
	try {
		return localStorage.getItem("vb.lock");
	} catch {
		return null;
	}
}
var pa = (e) => crypto.getRandomValues(new Uint8Array(e)), ma = () => navigator.credentials.get({ publicKey: {
	challenge: pa(32),
	allowCredentials: [{
		type: "public-key",
		id: Uint8Array.from(atob(fa()), (e) => e.charCodeAt(0))
	}],
	userVerification: "required",
	hints: ["client-device"],
	timeout: 6e4
} });
async function ha(e, t) {
	if (!e) {
		localStorage.removeItem("vb.lock");
		return;
	}
	let n = await navigator.credentials.create({ publicKey: {
		challenge: pa(32),
		rp: { name: "vibebook" },
		user: {
			id: pa(16),
			name: t,
			displayName: b("vibebook (trava do app)")
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: -7
		}, {
			type: "public-key",
			alg: -257
		}],
		authenticatorSelection: {
			authenticatorAttachment: "platform",
			userVerification: "required",
			residentKey: "required",
			requireResidentKey: !0
		},
		hints: ["client-device"],
		timeout: 6e4
	} });
	localStorage.setItem("vb.lock", btoa(String.fromCharCode(...new Uint8Array(n.rawId))));
}
function ga() {
	if (!fa() || document.getElementById("lockScreen")) return;
	let e = document.createElement("div");
	e.id = "lockScreen", e.innerHTML = `<img src="/favicon.svg" alt="" width="64" height="64" /><b>vibebook</b><button class="primary">${b("Desbloquear com Face ID")}</button><p class="err" hidden></p>`, document.body.append(e);
	let t = async () => {
		try {
			await ma(), e.remove();
		} catch {
			let t = e.querySelector(".err");
			t.hidden = !1, t.textContent = b("Toque pra tentar de novo.");
		}
	};
	e.querySelector("button").onclick = t;
}
var _a = 0;
document.addEventListener("visibilitychange", () => {
	document.hidden ? _a = Date.now() : _a && Date.now() - _a > da && ga();
}), ga(), Bt();
