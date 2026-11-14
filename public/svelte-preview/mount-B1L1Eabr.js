import { A as e, B as t, D as n, F as r, G as i, I as a, K as o, L as s, N as c, O as l, P as u, R as d, S as f, T as p, U as m, V as h, W as g, Y as _, a as v, c as y, d as b, f as x, i as S, j as C, k as w, l as T, o as E, q as D, s as O, t as k, u as A, v as j, w as M, x as N, z as P } from "./Button-Cx7HMFHY.js";
import { $ as F, A as I, An as L, Et as R, F as z, G as B, Mn as V, P as H, S as ee, Tt as U, Y as te, Yt as W, ct as ne, h as G, i as K, j as re, lt as q, m as ie, n as ae, nt as oe, q as J, qt as Y, r as se, t as X, tt as Z, u as Q, wn as ce, z as $ } from "./shared-qe__81Sz.js";
import { d as le, i as ue, l as de, o as fe, p as pe, u as me } from "./schemas-Dr5xbymo.js";
import "./index-client-RnYrC9zI.js";
import { n as he } from "./api-D4u8Abqp.js";
import { n as ge, r as _e, t as ve } from "./transport-DJ3z0lDb.js";
import { B as ye, C as be, M as xe, N as Se, R as Ce, T as we, b as Te, c as Ee, o as De, r as Oe, w as ke, x as Ae, z as je } from "./schemas-cfL4JcHa.js";
import { a as Me, c as Ne, d as Pe, h as Fe, i as Ie, m as Le, o as Re, r as ze, s as Be, t as Ve, u as He } from "./model-B78l00ZB.js";
import { i as Ue, n as We, r as Ge, t as Ke } from "./owner-Dk3pdsZz.js";
import { A as qe, C as Je, D as Ye, E as Xe, F as Ze, I as Qe, M as $e, N as et, O as tt, P as nt, S as rt, T as it, _ as at, a as ot, b as st, c as ct, d as lt, f as ut, g as dt, h as ft, i as pt, j as mt, k as ht, l as gt, n as _t, o as vt, p as yt, r as bt, s as xt, t as St, v as Ct, w as wt, x as Tt, y as Et } from "./roomCopy-XVT7nAHx.js";
import { d as Dt, f as Ot, n as kt } from "./dialogController-COywv7ZD.js";
import { n as At, r as jt, t as Mt } from "./Dialog-BkHABdQA.js";
import { t as Nt } from "./IconButton-C3NNuUw1.js";
import { t as Pt } from "./Snapshot-B5lNG0lv.js";
import { n as Ft } from "./copy-B66YGk9H.js";
import { n as It, t as Lt } from "./RoomTile-Czl5jsHC.js";
import { a as Rt, c as zt, d as Bt, i as Vt, l as Ht, n as Ut, r as Wt, s as Gt, t as Kt, u as qt } from "./copy-psMjU5k0.js";
import { i as Jt, n as Yt, r as Xt, t as Zt } from "./privacy-DXCRlVGH.js";
import { i as Qt, t as $t } from "./model-DB-4wSKi.js";
import { a as en, c as tn, d as nn, i as rn, l as an, s as on, t as sn, u as cn } from "./model-Dxl2uqUd.js";
import { n as ln, r as un } from "./api-BFK8B974.js";
import { i as dn, n as fn, t as pn } from "./model-D2eQTgrV.js";
import { a as mn, i as hn, n as gn, o as _n, r as vn, t as yn } from "./consent-BN-IA7c6.js";
import { a as bn, n as xn, r as Sn, s as Cn, t as wn } from "./model-CwJhNEjZ.js";
import { c as Tn, o as En, r as Dn } from "./appDocumentProtocol-BRbz2YOr.js";
import { n as On, r as kn } from "./eligibility-Dtv96E97.js";
import { c as An, i as jn, l as Mn, p as Nn, r as Pn, t as Fn, u as In } from "./SetupInstructions-xyHo5tew.js";
import { i as Ln, n as Rn, r as zn, t as Bn } from "./Field-BrFdeLgm.js";
import { t as Vn } from "./AlertDialog-DYYQX3NU.js";
import { t as Hn } from "./Avatar-8pZy6e0J.js";
import { t as Un } from "./Badge-LnHYpvr5.js";
import { t as Wn } from "./Input-D0A_t4bj.js";
import { t as Gn } from "./Heading-Dkd8XMpq.js";
import { t as Kn } from "./Label-CqFm2dk3.js";
import { t as qn } from "./Select-DbV-T2ZF.js";
import { t as Jn } from "./Tabs-C12ffgdc.js";
import { t as Yn } from "./Icon-Ch3wLUmI.js";
import { t as Xn } from "./ErrorState-CiGHe1Vk.js";
import { t as Zn } from "./Progress-Bphyn8tw.js";
import { t as Qn } from "./Textarea-CVhsww9W.js";
import { t as $n } from "./Checkbox-BfJTROWF.js";
import { n as er, r as tr, t as nr } from "./NotificationBell-XDxprm3X.js";
import { t as rr } from "./uiVariant-CXGP5j2D.js";
import { r as ir } from "./session-P9zWY430.js";
import { a as ar, i as or, n as sr, o as cr, r as lr, t as ur } from "./registration-CMVJ0lsw.js";
// shared/suggestions.ts
var dr = (e) => JSON.stringify([
	e.title,
	e.why ?? null,
	e.tasks
]);
// shared/sandboxCost.ts
function fr(e, t) {
	if (e.cost_unknown || e.created_at === null) return null;
	let n = e.state === "running" ? Math.max(0, t - (e.checked_at ?? t)) / 1e3 : 0, r = ((e.run_s ?? 0) + n) / 3600 * (e.rate ?? 0) + Math.max(0, t - (e.created_at ?? t)) / 36e5 * (e.disk_rate ?? 0);
	return Number.isFinite(r) ? r : null;
}
// svelte/features/application/shellBrowser.ts
function pr(e, t) {
	return {
		origin: e.location.origin,
		theme: () => t.documentElement.dataset.theme === "light" ? "light" : t.documentElement.dataset.theme === "dark" ? "dark" : "auto",
		setTheme(n) {
			n === "auto" ? delete t.documentElement.dataset.theme : t.documentElement.dataset.theme = n;
			try {
				n === "auto" ? e.localStorage.removeItem("vb.theme") : e.localStorage.setItem("vb.theme", n);
			} catch {}
		},
		setLanguage(n) {
			t.cookie = `vb_lang=${n}; path=/; max-age=31536000; samesite=lax`, e.location.reload();
		},
		documentLanguage(e) {
			t.documentElement.lang = e === "en" ? "en" : "pt-BR";
		},
		listenTheme(n) {
			let r = new MutationObserver(n);
			r.observe(t.documentElement, {
				attributes: !0,
				attributeFilter: ["data-theme"]
			});
			let i = (e) => {
				if (e.key === "vb.theme") {
					let r = e.newValue;
					r === "light" || r === "dark" ? t.documentElement.dataset.theme = r : delete t.documentElement.dataset.theme, n();
				}
			};
			return e.addEventListener("storage", i), () => {
				r.disconnect(), e.removeEventListener("storage", i);
			};
		},
		listenNavigation(e) {
			let n = (t) => {
				let n = t.target, r = n instanceof Element ? n.closest("a[data-nav]") : null;
				r && e(t, r);
			};
			return t.addEventListener("click", n), () => t.removeEventListener("click", n);
		}
	};
}
// svelte/features/home/api.ts
var mr = class extends Error {
	status;
	constructor(e, t = 0) {
		super(e), this.status = t;
	}
};
async function hr(e, t) {
	let n = await e.json().catch(() => null);
	if (!e.ok) {
		let t = Te.safeParse(n);
		throw new mr(t.success ? t.data.error : `HTTP ${e.status}`, e.status);
	}
	try {
		return t.parse(n);
	} catch {
		throw new mr("invalid-response");
	}
}
function gr(e) {
	let t = he("/", e).api, n = t.books[":id"], r = (e) => ({ id: encodeURIComponent(e) });
	return {
		inbox: (e) => t.inbox.$get({}, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => hr(e, Ae)),
		me: (e) => t.me.$get({ query: { ui: "svelte" } }, { init: { signal: e } }).then((e) => hr(e, ke)),
		archived: (e) => t.archived.$get({}, { init: { signal: e } }).then((e) => hr(e, De)),
		search: (e, n) => t.search.$get({ query: { q: e } }, { init: { signal: n } }).then((e) => hr(e, Ce)),
		route: (e, n) => t.route.$post({ json: { text: e } }, { init: { signal: n } }).then((e) => hr(e, Se)),
		startRoom: (e, n) => t.books.start.$post({ json: { text: e } }, { init: { signal: n } }).then((e) => hr(e, ye)),
		post: (t, n, r) => ve(t, e).postMessage({
			text: n,
			thread: r
		}),
		archive: (e, t, i) => n.archive.$post({
			param: r(e),
			json: { archived: t }
		}, { init: { signal: i } }).then((e) => hr(e, we)),
		order: (e, n) => t.rooms.order.$post({ json: { ids: e } }, { init: { signal: n } }).then((e) => hr(e, we)),
		tint: (e, t, i) => n.tint.$post({
			param: r(e),
			json: { tint: t }
		}, { init: { signal: i } }).then((e) => hr(e, we)),
		icon: (e, t, i) => n.icon.$post({
			param: r(e),
			header: { "content-type": t ? "image/png" : "application/json" }
		}, { init: {
			signal: i,
			body: t ?? "{}"
		} }).then((e) => hr(e, xe)),
		resolve: (e, n, r) => t.waits.resolve.$post({ json: {
			book_id: e,
			ref: n
		} }, { init: { signal: r } }).then((e) => hr(e, we)),
		agents: (e) => t.agents.$get({}, { init: { signal: e } }).then((e) => hr(e, Oe))
	};
}
// svelte/features/application/inbox.ts
function _r(e, t) {
	let n = (e, t, n) => {
		let r = new Map(e.map((e) => [n(e), e]));
		return t.map((e) => {
			let t = r.get(n(e));
			return t && JSON.stringify(t) === JSON.stringify(e) ? t : e;
		});
	}, r = (e) => `${e.book_id}/${e.ref}`, i = () => ({
		waits: [],
		mentions: [],
		tasks: []
	}), a = K({
		binding: null,
		all: !1,
		data: i(),
		phase: "idle",
		error: null
	}), o = !0, s = 0, c = !1, l = 0, u = at(t ? {
		...t,
		now: () => Date.now()
	} : void 0), d = at(t ? {
		...t,
		now: () => Date.now()
	} : void 0), f = (t) => {
		let n = X(e.personal.state), r = X(e.state);
		return o && e.active() && (!t.roomScope || e.ownsRoom(t.roomScope)) && r.navigationGeneration === t.navigationRevision && (r.route.kind === "room" ? r.route.target.roomId : null) === t.roomId && n.identityRevision === t.revision && n.me?.email === t.account;
	}, p = (e) => X(a).binding === e && f(e);
	function m(e) {
		e && X(a).binding !== e || (s++, l++, u.cancel(), d.cancel(), c = !1, a.update((e) => ({
			...e,
			binding: null,
			data: i(),
			phase: "idle",
			error: null
		})));
	}
	let h = e.personal.peek()?.waits, g = e.personal.state.subscribe((e) => {
		let t = e.me?.waits, i = t !== h;
		h = t;
		let o = X(a).binding;
		o && (e.identityRevision !== o.revision || e.me?.email !== o.account) ? m(o) : o && i && p(o) && a.update((e) => ({
			...e,
			data: {
				...e.data,
				waits: n(e.data.waits, t ?? [], r)
			}
		}));
	}), _ = X(e.state).navigationGeneration, v = e.state.subscribe((e) => {
		(_ !== e.navigationGeneration || e.sessionDenied || e.lifecycle === "disposed") && m(), _ = e.navigationGeneration;
	}), y = e.rootRoom.state.subscribe(() => {
		let t = X(a).binding;
		t?.roomScope && !e.ownsRoom(t.roomScope) && m(t);
	}), b = (t) => e.personal.peek()?.waits.some((e) => e.book_id === t.book_id && e.ref === t.ref && e.thread === t.thread && e.author === t.author);
	async function x(t) {
		if (!p(t)) return;
		let i = ++l;
		if (a.update((e) => ({
			...e,
			phase: "loading",
			error: null
		})), !p(t) || i !== l) return;
		let o = e.personal.peek()?.waits;
		try {
			let s = await d.run((t) => e.personal.api.inbox(t), Ke);
			if (p(t) && i === l) {
				let c = e.personal.peek()?.waits;
				if (a.update((e) => ({
					...e,
					data: {
						waits: n(e.data.waits, c === o ? s.waits : c ?? [], r),
						mentions: n(e.data.mentions, s.mentions, (e) => `${e.book_id}/${e.msg_id}`),
						tasks: n(e.data.tasks, s.tasks, (e) => `${e.book_id}/${e.task_id}`)
					},
					phase: "ready",
					error: null
				})), !p(t) || i !== l) return;
				let u = e.personal.peek()?.waits ?? [];
				(u.length !== s.waits.length || s.waits.some((e) => !u.some((t) => t.book_id === e.book_id && t.ref === e.ref && t.thread === e.thread && t.author === e.author))) && (e.personal.invalidate(), p(t) && e.personal.refresh());
			}
		} catch (n) {
			if (!p(t) || i !== l) return;
			n instanceof mr && n.status === 401 ? e.actions.sessionLost() : a.update((e) => ({
				...e,
				phase: "error",
				error: n instanceof Error && n.message === "timeout" ? "timeout" : "read"
			}));
		}
	}
	function S(t, n, r, i) {
		if (!p(t)) return;
		let o = s + 1;
		m(t), s === o && !X(a).binding && f(t) && e.actions.navigate({
			roomId: n,
			thread: r,
			messageId: i
		});
	}
	return {
		state: a,
		owns: p,
		refresh: x,
		open(t) {
			if (!o || !e.active()) return;
			let n = X(e.personal.state), r = n.me;
			if (!r) return;
			let i = X(e.state), c = {
				account: r.email,
				revision: n.identityRevision,
				generation: 0,
				roomId: i.route.kind === "room" ? i.route.target.roomId : null,
				navigationRevision: i.navigationGeneration,
				trigger: t,
				roomScope: i.route.kind === "room" ? e.roomScope() ?? void 0 : void 0
			}, l = s + 1;
			if (m(), s !== l || X(a).binding || !f(c)) return;
			let u = {
				...c,
				generation: ++s
			};
			a.update((e) => ({
				...e,
				binding: u,
				data: {
					waits: i.route.kind === "room" && !u.roomScope ? [] : r.waits,
					mentions: [],
					tasks: []
				},
				phase: "idle",
				error: null
			})), p(u) && x(u);
		},
		close: m,
		restoreFocus(e) {
			let t = e.trigger;
			s === e.generation + 1 && !X(a).binding && f(e) && t?.isConnected && t.getClientRects().length && t.focus();
		},
		openMention(e, t) {
			p(e) && X(a).data.mentions.includes(t) && S(e, t.book_id, t.thread, t.msg_id);
		},
		openTask(e, t) {
			p(e) && X(a).data.tasks.includes(t) && S(e, t.book_id, t.epic_id);
		},
		tab(e, t) {
			p(e) && a.update((e) => ({
				...e,
				all: t
			}));
		},
		openWait(e, t) {
			p(e) && X(a).data.waits.includes(t) && b(t) && S(e, t.book_id, t.thread, /^[mab]/.test(t.ref) ? Ie(t.ref.slice(1)) : void 0);
		},
		async resolve(t, n) {
			if (p(t) && !c && X(a).data.waits.includes(n) && b(n) && n.ref.startsWith("m")) {
				c = !0;
				try {
					if (await u.run((t) => e.personal.api.resolve(n.book_id, n.ref, t), Ke), !p(t)) return;
					e.personal.invalidate(), e.personal.refresh(), x(t);
				} catch (n) {
					if (!p(t)) return;
					if (n instanceof mr && n.status === 401) e.actions.sessionLost();
					else throw n;
				} finally {
					p(t) && (c = !1);
				}
			}
		},
		dispose() {
			o && (o = !1, l++, g(), v(), y(), u.cancel(), d.cancel(), c = !1, a.update((e) => ({
				...e,
				binding: null,
				data: i(),
				phase: "idle",
				error: null
			})));
		}
	};
}
// svelte/features/deferred-view/module.ts
function vr(e, t) {
	let n = K({
		phase: "idle",
		component: null
	}), r = t.clock ?? Ue, i = t.timeoutMs ?? 2e4, a = t.current, o = !0, s = 0, c = null, l = null, u = () => {
		c !== null && r.cancel(c), c = null;
	};
	function d() {
		if (!o || !a()) return l;
		let t = ++s, d = () => o && s === t;
		return n.set({
			phase: "loading",
			component: null
		}), !d() || !a() || (c = r.schedule(() => {
			d() && (c = null, l = null, s++, a() && n.set({
				phase: "error",
				component: null
			}));
		}, i), l = Promise.resolve().then(async () => {
			if (!d()) return;
			if (!a()) {
				u(), l = null;
				return;
			}
			let t = await e();
			d() && (u(), l = null, a() && n.set({
				phase: "ready",
				component: t
			}));
		}).catch(() => {
			d() && (u(), l = null, a() && n.set({
				phase: "error",
				component: null
			}));
		})), l;
	}
	return {
		state: n,
		ensure() {
			return X(n).phase === "idle" ? d() : l;
		},
		retry() {
			return X(n).phase === "error" ? d() : l;
		},
		dispose() {
			o = !1, s++, u(), l = null, a = () => !1;
		}
	};
}
// svelte/features/app-navigation/presentation.ts
var yr = [
	"settings",
	"archive",
	"rename",
	"create",
	"search"
], br = () => ({
	search: null,
	create: null,
	settings: null,
	archive: null,
	rename: null
});
function xr(e, t, n) {
	let r = !0, i = 0, a = br(), o = null, s = /* @__PURE__ */ new WeakMap(), c = K(a), l = K(null), u = vr(t, {
		current: () => r,
		clock: n
	}), d = () => X(e.personal.state), f = (t) => {
		let n = d();
		return r && a[t.kind] === t && n.me?.email === t.account && n.identityRevision === t.identityRevision && X(e.state).roomId === t.scopeRoomId;
	}, p = () => {
		if (!r) return;
		let t = d(), n = X(e.search.state), f = X(e.creator.state), p = X(e.state), m = {
			search: n.open,
			create: f.open && !f.inline && !!f.binding,
			settings: !!p.settingsId,
			archive: !!p.archiveId,
			rename: !!p.renameId
		}, h = { ...a }, g = i, _ = !1;
		for (let n of yr) {
			let r = a[n], c = n === "settings" ? p.settingsId : n === "archive" ? p.archiveId : n === "rename" ? p.renameId : null;
			(!r || !m[n] || t.me?.email !== r.account || r.identityRevision !== t.identityRevision || r.scopeRoomId !== p.roomId || r.roomId !== c || n === "create" && o !== f.binding) && (r || m[n] && t.me) && (r && s.set(r, g), h[n] = t.me && m[n] ? Object.freeze({
				kind: n,
				account: t.me.email,
				identityRevision: t.identityRevision,
				revision: ++i,
				roomId: c,
				scopeRoomId: p.roomId,
				trigger: e.returnFocus(null)
			}) : null, _ = !0);
		}
		if (o = m.create ? f.binding : null, !_) return;
		a = Object.freeze(h);
		let v = a;
		if (c.set(v), !r || a !== v) return;
		let y = Object.values(a).filter((e) => e !== null).sort((e, t) => e.revision - t.revision).at(-1) ?? null;
		X(l) !== y && l.set(y), r && Object.values(a).some(Boolean) && u.ensure();
	}, m = [
		e.personal.state.subscribe(p),
		e.search.state.subscribe(p),
		e.creator.state.subscribe(p),
		e.state.subscribe(p)
	];
	return {
		state: l,
		bindings: c,
		module: u,
		owns: f,
		close(t) {
			f(t) && (t.kind === "search" ? e.search.close() : t.kind === "create" ? e.creator.close() : e.closeSettings());
		},
		returnFocus(t, n) {
			let o = d(), c = a[t.kind] === t ? i : s.get(t);
			return r && c === i && !Object.values(a).some((e) => e && e.revision > t.revision) && o.me?.email === t.account && o.identityRevision === t.identityRevision && X(e.state).roomId === t.scopeRoomId ? t.trigger?.isConnected ? t.trigger : n : null;
		},
		dispose() {
			r = !1, a = br(), o = null;
			for (let e of m) e();
			c.set(a), l.set(null), u.dispose();
		}
	};
}
// svelte/features/deferred-view/DeferredViewStatus.svelte
var Sr = h("<section data-deferred-view=\"\" class=\"tw:space-y-3 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><p> </p> <!></section>");
function Cr(e, t) {
	R(t, !0);
	var n = Sr(), r = z(n), i = B(r, !0), a = J(r, 2), o = (e) => {
		k(e, {
			variant: "outline",
			onclick: (e) => {
				e.currentTarget.isConnected && t.current() && t.retry();
			},
			children: (e, n) => {
				Y();
				var r = g();
				I(() => s(r, t.lang === "en" ? "Retry" : "Tentar de novo")), P(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	C(a, (e) => {
		t.phase === "error" && e(o);
	}), W(n), I(() => {
		j(n, "aria-label", t.label), j(n, "aria-busy", t.phase === "loading" || t.phase === "idle"), j(r, "role", t.phase === "error" ? "alert" : "status"), s(i, t.phase === "error" ? t.lang === "en" ? "Could not load this view. Retry, or reload the page if it still fails." : "Não foi possível carregar esta tela. Tente de novo ou recarregue a página se o erro continuar." : t.lang === "en" ? "Loading…" : "Carregando…");
	}), P(e, n), U();
}
// svelte/features/app-navigation/AppNavigation.svelte
var wr = h("<div role=\"listitem\"><!></div>"), Tr = h("<!><!>", 1), Er = h("<aside data-vb-native=\"home-notice\" role=\"status\" class=\"tw:fixed tw:bottom-4 tw:right-4 tw:z-30 tw:flex tw:max-w-[calc(100vw-2rem)] tw:items-start tw:gap-2 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-foreground tw:shadow-lg\"><p class=\"tw:m-0 tw:break-words\"> </p> <!></aside>"), Dr = h("<div data-vb-native=\"room-navigation\" data-native-app-navigation=\"\"><!> <div class=\"tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-row tw:gap-2 tw:overflow-x-auto tw:min-[901px]:flex-col tw:min-[901px]:overflow-x-hidden tw:min-[901px]:overflow-y-auto\" role=\"list\"></div> <!> <!> <!> <!></div> <!> <!> <!>", 1);
function Or(r, i) {
	R(i, !0);
	let a = () => T(Q(O), "$personal", b), o = () => T(Q(M), "$nav", b), d = () => T(se, "$moduleView", b), p = () => T(Q(V), "$mutations", b), m = () => T(Q(H), "$search", b), h = () => T(oe, "$presentationView", b), _ = () => T(Q(A), "$draft", b), [b, x] = y(), S = v(i, "theme", 3, "auto"), w = v(i, "onreload", 3, () => location.reload()), E = v(i, "inRoom", 3, !1), D = v(i, "loadDialogs", 3, () => import("./AppNavigationDialogs-DABe5K5o.js").then((e) => e.default)), O = q(() => i.controller.personal.state), A = q(() => i.controller.personal.draft), M = q(() => i.controller.state), V = q(() => i.controller.rooms.state), H = q(() => i.controller.search.state), ee = (e, t) => Ft(i.lang, e, t), te = q(() => a().me?.books.find((e) => e.id === o().settingsId)), ne = q(() => a().me?.books.find((e) => e.id === o().archiveId)), K = q(() => a().me?.books.find((e) => e.id === o().renameId)), ie = Z(null), ae = G(() => xr(i.controller, D())), oe = ae.state, se = ae.module.state, ce = q(() => d().component);
	re(() => {
		o().settingsId && !Q(te) && i.controller.closeSettings(), o().archiveId && !Q(ne) && i.controller.closeSettings(), o().renameId && !Q(K) && i.controller.closeSettings(), Q(K) && o().renameSubmitted && !p().pending[`rename:${Q(K).id}`] && !p().issues[`rename:${Q(K).id}`] && Q(K).title === o().renameDraft.trim() && i.controller.closeSettings();
	}), c(() => {
		ae.dispose(), i.controller.pageLeft();
	}), u(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && a().me && (e.preventDefault(), m().open ? i.controller.search.close() : (i.controller.creator.close(), i.controller.closeSettings(), i.controller.openSearch(document.activeElement instanceof HTMLElement ? document.activeElement : void 0)));
		};
		return document.addEventListener("keydown", e), () => {
			i.controller.pageLeft(), document.removeEventListener("keydown", e);
		};
	});
	var le = Dr(), ue = $(le), de = z(ue);
	{
		let e = q(() => ee("home"));
		Nt(de, {
			icon: "inbox",
			get label() {
				return Q(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && i.controller.callbacks.home();
			},
			get ref() {
				return Q(ie);
			},
			set ref(e) {
				F(ie, e, !0);
			}
		});
	}
	var fe = J(de, 2);
	l(fe, 5, () => Re(a().me?.books ?? []), (e) => e.id, (e, t) => {
		var n = wr(), r = z(n);
		{
			let e = q(() => o().roomId === Q(t).id), n = q(() => a().seen[Q(t).id] ?? 0), s = q(() => a().me?.waits.filter((e) => e.book_id === Q(t).id) ?? []);
			Lt(r, {
				get room() {
					return Q(t);
				},
				get lang() {
					return i.lang;
				},
				get now() {
					return a().now;
				},
				compact: !0,
				get selected() {
					return Q(e);
				},
				get seen() {
					return Q(n);
				},
				get waits() {
					return Q(s);
				},
				get onnavigate() {
					return i.controller.callbacks.navigate;
				},
				onsettings: (e, t) => i.controller.openSettings(e, t),
				ondragstart: (e) => {
					e.dataTransfer?.setData("text/plain", Q(t).id), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
				},
				ondragover: (e) => e.preventDefault(),
				ondrop: (e) => {
					e.preventDefault();
					let n = e.dataTransfer?.getData("text/plain");
					if (!n) return;
					let r = e.currentTarget;
					if (!(r instanceof HTMLElement)) return;
					let a = r.getBoundingClientRect();
					i.controller.drop(n, Q(t).id, e.clientY > a.top + a.height / 2);
				}
			});
		}
		W(n), P(e, n);
	}), W(fe);
	var pe = J(fe, 2);
	{
		let e = q(() => S() === "dark" ? "moon" : "sun"), t = q(() => ee("theme"));
		Nt(pe, {
			get icon() {
				return Q(e);
			},
			get label() {
				return Q(t);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && i.ontheme();
			}
		});
	}
	var me = J(pe, 2);
	{
		let e = q(() => ee("language"));
		k(me, {
			variant: "ghost",
			size: "sm",
			onclick: (e) => {
				e.currentTarget.isConnected && i.onlanguage(i.lang === "en" ? "pt" : "en");
			},
			get "aria-label"() {
				return Q(e);
			},
			children: (e, t) => {
				Y();
				var n = g();
				I(() => s(n, i.lang === "en" ? "PT" : "EN")), P(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var he = J(me, 2);
	{
		let e = q(() => ee("search"));
		Nt(he, {
			icon: "search",
			get label() {
				return Q(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && i.controller.openSearch(e.currentTarget);
			}
		});
	}
	var ge = J(he, 2);
	{
		let e = q(() => ee("new"));
		Nt(ge, {
			icon: "plus",
			get label() {
				return Q(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && i.controller.openCreate(e.currentTarget);
			}
		});
	}
	W(ue);
	var _e = J(ue, 2), ve = (e) => {
		var r = t(), a = $(r);
		n(a, () => Q(ce), (e, t) => {
			t(e, {
				get controller() {
					return i.controller;
				},
				get lang() {
					return i.lang;
				},
				get presentation() {
					return ae;
				},
				fallback: () => Q(ie)
			});
		}), P(e, r);
	}, ye = (n) => {
		var r = t(), a = $(r);
		e(a, h, (e) => {
			Pt(e, {
				get value() {
					return h();
				},
				children: (e, t = L) => {
					{
						let n = q(() => ae.owns(t())), r = q(() => ee(t().kind === "create" ? "new" : t().kind === "settings" ? "settings" : t().kind)), a = q(() => ee("close"));
						Mt(e, {
							get open() {
								return Q(n);
							},
							get title() {
								return Q(r);
							},
							get closeLabel() {
								return Q(a);
							},
							onOpenChange: (e) => {
								!e && X(se).phase !== "ready" && ae.close(t());
							},
							returnFocus: () => X(se).phase === "ready" ? null : ae.returnFocus(t(), Q(ie)),
							children: (e, n) => {
								var r = Tr(), a = $(r);
								{
									let e = q(() => ee(t().kind === "create" ? "new" : t().kind === "settings" ? "settings" : t().kind));
									Cr(a, {
										get phase() {
											return d().phase;
										},
										get lang() {
											return i.lang;
										},
										get label() {
											return Q(e);
										},
										current: () => ae.owns(t()),
										retry: () => {
											ae.owns(t()) && ae.module.retry();
										}
									});
								}
								var o = J(a);
								k(o, {
									variant: "outline",
									onclick: (e) => {
										e.currentTarget.isConnected && X(se).phase !== "ready" && ae.close(t());
									},
									children: (e, t) => {
										Y();
										var n = g();
										I((e) => s(n, e), [() => ee("cancel")]), P(e, n);
									},
									$$slots: { default: !0 }
								}), P(e, r);
							},
							$$slots: { default: !0 }
						});
					}
				},
				$$slots: { default: !0 }
			});
		}), P(n, r);
	};
	C(_e, (e) => {
		Q(ce) ? e(ve) : h() && e(ye, 1);
	});
	var be = J(_e, 2), xe = (e) => {
		var t = Er(), n = z(t), r = B(n, !0), a = J(n, 2);
		{
			let e = q(() => ee("dismiss"));
			Nt(a, {
				icon: "close",
				get label() {
					return Q(e);
				},
				onclick: (e) => {
					e.currentTarget.isConnected && i.controller.personal.clearNotice();
				}
			});
		}
		W(t), I((e) => s(r, e), [() => ee("unknown", { who: _().unknown.names.join(", ") })]), P(e, t);
	};
	C(be, (e) => {
		_().unknown && _().unknown.roomId === o().roomId && e(xe);
	});
	var Se = J(be, 2), Ce = (e) => {
		k(e, {
			"data-vb-native": "update",
			class: "tw:fixed tw:bottom-4 tw:left-1/2 tw:z-30 tw:max-w-[calc(100vw-2rem)] tw:-translate-x-1/2 tw:whitespace-normal tw:shadow-lg",
			onclick: (e) => {
				e.currentTarget.isConnected && w()();
			},
			children: (e, t) => {
				Y();
				var n = g();
				I((e) => s(n, e), [() => ee("update")]), P(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	C(Se, (e) => {
		a().updateAvailable && e(Ce);
	}), I((e) => {
		N(ue, 1, f(["tw:col-start-1 tw:row-start-1 tw:min-h-0 tw:min-w-0 tw:w-full tw:items-center tw:gap-2 tw:bg-background tw:p-2 tw:font-sans tw:text-foreground tw:min-[901px]:sticky tw:min-[901px]:top-0 tw:min-[901px]:flex tw:min-[901px]:h-dvh tw:min-[901px]:flex-col tw:min-[901px]:border-r tw:min-[901px]:border-border", E() ? "tw:hidden" : "tw:flex tw:flex-row"])), j(fe, "aria-label", e);
	}, [() => ee("home")]), P(r, le), U(), x();
}
// svelte/features/account/DeviceLockScreen.svelte
var kr = h("<p role=\"alert\" class=\"tw:text-sm tw:text-destructive\"> </p>"), Ar = h("<img src=\"/favicon.svg\" width=\"64\" height=\"64\" alt=\"\" class=\"tw:rounded-control\"/> <!> <!> <!> <!> <!>", 1);
function jr(e, r) {
	R(r, !0);
	let i = () => T(c, "$view", a), [a, o] = y(), c = G(() => r.owner.state), l = q(() => r.lang === "en"), u = Z(null);
	var d = t(), f = $(d);
	n(f, () => jt, (e, a) => {
		a(e, {
			get open() {
				return i().locked;
			},
			children: (e, a) => {
				var o = t(), c = $(o);
				n(c, () => Dt, (e, a) => {
					a(e, {
						children: (e, a) => {
							var o = t(), c = $(o);
							n(c, () => At, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									"data-device-lock": !0,
									onEscapeKeydown: (e) => e.preventDefault(),
									onInteractOutside: (e) => e.preventDefault(),
									onOpenAutoFocus: (e) => {
										e.preventDefault(), Q(u)?.focus();
									},
									class: "tw:fixed tw:inset-0 tw:z-[9999] tw:m-0 tw:grid tw:place-content-center tw:justify-items-center tw:gap-4 tw:bg-background tw:p-6 tw:font-sans tw:text-foreground tw:outline-none",
									children: (e, t) => {
										var a = Ar(), o = J($(a), 2);
										n(o, () => Ot, (e, t) => {
											t(e, {
												class: "tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold",
												children: (e, t) => {
													Y();
													var n = g("vibebook");
													P(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var c = J(o, 2);
										n(c, () => kt, (e, t) => {
											t(e, {
												class: "tw:text-sm tw:text-muted-foreground",
												children: (e, t) => {
													Y();
													var n = g();
													I(() => s(n, Q(l) ? "Unlock this device to continue." : "Desbloqueie este aparelho para continuar.")), P(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var d = J(c, 2);
										{
											let e = q(() => i().busy || !i().supported);
											k(d, {
												get disabled() {
													return Q(e);
												},
												onclick: (e) => {
													e.currentTarget.isConnected && r.owner.unlock();
												},
												get ref() {
													return Q(u);
												},
												set ref(e) {
													F(u, e, !0);
												},
												children: (e, t) => {
													Y();
													var n = g();
													I(() => s(n, Q(l) ? "Unlock with Face ID" : "Desbloquear com Face ID")), P(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var f = J(d, 2), p = (e) => {
											var t = kr(), n = B(t, !0);
											I(() => s(n, Q(l) ? "Device authentication is unavailable in this browser." : "A autenticação do aparelho não está disponível neste navegador.")), P(e, t);
										};
										C(f, (e) => {
											i().supported || e(p);
										});
										var m = J(f, 2), h = (e) => {
											var t = kr(), n = B(t, !0);
											I(() => s(n, Q(l) ? "Could not unlock. Tap to try again." : "Não deu para desbloquear. Toque para tentar de novo.")), P(e, t);
										};
										C(m, (e) => {
											i().error && e(h);
										}), P(e, a);
									},
									$$slots: { default: !0 }
								});
							}), P(e, o);
						},
						$$slots: { default: !0 }
					});
				}), P(e, o);
			},
			$$slots: { default: !0 }
		});
	}), P(e, d), U(), o();
}
// svelte/features/deferred-view/DeferredRouteStatus.svelte
var Mr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]), Nr = h("<main><!></main>");
function Pr(e, t) {
	R(t, !0);
	let n = E(t, Mr);
	var r = Nr();
	p("ohdx5e", (e) => {
		ee(() => {
			H.title = "vibebook";
		});
	}), Cr(z(r), O(() => n)), W(r), I(() => j(r, "aria-busy", t.phase === "idle" || t.phase === "loading")), P(e, r), U();
}
// svelte/features/application/AppShell.svelte
var Fr = h("<div data-native-room-root=\"\" class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-hidden\"><!></div>"), Ir = h("<!> <div data-native-application-route=\"\"><!></div> <!> <!>", 1), Lr = h("<div data-vb-native=\"\" data-native-app-shell=\"\"><!> <!></div>");
function Rr(i, a) {
	R(a, !0);
	let o = () => T(ee, "$homeModuleView", b), s = () => T(K, "$archivedModuleView", b), l = () => T(ae, "$accountModuleView", b), d = () => T(Y, "$inboxModuleView", b), p = () => T(w, "$application", b), m = () => T(ue, "$accountView", b), h = () => T(A, "$inboxView", b), g = () => T(D, "$room", b), _ = () => T(E, "$personal", b), [b, x] = y(), S = v(a, "effects", 19, () => pr(window, document)), w = G(() => a.services.state), E = G(() => a.services.personal.state), D = G(() => a.services.rootRoom.state), k = G(() => _r(a.services)), A = k.state, j = (e) => k.open(e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : void 0)), M = !0, B = Z(te(G(() => S().theme()))), V = () => M && a.services.active(), H = G(() => vr(() => import("./HomePanel-CsUn2wsF.js").then((e) => e.default), { current: V })), ee = H.state, ne = G(() => vr(() => import("./ArchivedPanel-Cz0t6f4m.js").then((e) => e.default), { current: V })), K = ne.state, ie = G(() => vr(() => import("./AccountSettings-C_GHptuQ.js").then((e) => e.default), { current: V })), ae = ie.state, oe = G(() => vr(() => import("./Inbox-CYTV-6W8.js").then((e) => e.default), { current: V })), Y = oe.state, se = q(() => o().component), X = q(() => s().component), ce = q(() => l().component), le = q(() => d().component), ue = G(() => a.services.account.state);
	re(() => {
		p().lifecycle, p().sessionDenied || (p().route.kind === "home" && H.ensure(), p().route.kind === "archived" && ne.ensure(), m().open && ie.ensure(), h().binding && !h().binding.roomScope && oe.ensure());
	});
	let de = (e) => {
		let t = Math.round((Date.now() - e) / 6e4);
		return t < 1 ? a.services.t("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
	};
	function fe() {
		V() && (F(B, Q(B) === "auto" ? "light" : Q(B) === "light" ? "dark" : "auto", !0), S().setTheme(Q(B)));
	}
	let pe = (e) => {
		V() && e !== a.services.language && S().setLanguage(e);
	}, me = (e) => g().room?.names?.[e] || (_().me?.email === e ? _().me.name : _().me?.friends.find((t) => t.email === e)?.name) || e.split("@")[0], he = (e) => {
		let t = g().room?.avatars?.[e];
		return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : Be(_().me, e);
	}, ge = q(() => ({
		pwa: a.services.pwa,
		personal: a.services.personal,
		rooms: a.services.rooms,
		profile: a.services.account,
		creator: a.services.navigation.creator,
		lang: a.services.language,
		ago: de,
		onnavigate: (e) => {
			V() && a.services.actions.navigate(e);
		},
		onhome: () => {
			V() && a.services.actions.home();
		},
		onarchived: () => {
			V() && a.services.actions.archived();
		},
		onnew: (e) => {
			V() && a.services.navigation.openCreate(e);
		},
		onsettings: (e) => {
			V() && a.services.actions.openAccount(e);
		},
		onroomsettings: (e, t) => {
			V() && a.services.navigation.openSettings(e, t);
		},
		oninbox: (e) => {
			V() && j(e);
		},
		onsearch: () => {
			V() && a.services.navigation.openSearch();
		},
		onlanguage: pe
	}));
	u(() => {
		S().documentLanguage(a.services.language);
		let e = S().listenTheme(() => {
			M && F(B, S().theme(), !0);
		}), t = S().listenNavigation((e, t) => {
			!V() || !t.isConnected || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || t.target && t.target !== "_self" || t.hasAttribute("download") || (e.preventDefault(), a.services.actions.navigate(t.href));
		});
		return a.services.start(), () => {
			e(), t();
		};
	}), c(() => {
		M = !1, H.dispose(), ne.dispose(), ie.dispose(), oe.dispose(), k.dispose(), a.services.dispose();
	});
	var _e = Lr(), ve = z(_e), ye = (i) => {
		var c = Ir(), u = $(c), g = (e) => {
			{
				let t = q(() => p().route.kind === "room");
				Or(e, {
					get controller() {
						return a.services.navigation;
					},
					get inRoom() {
						return Q(t);
					},
					get lang() {
						return a.services.language;
					},
					get theme() {
						return Q(B);
					},
					ontheme: fe,
					onlanguage: pe,
					onreload: () => {
						V() && a.services.actions.reload();
					}
				});
			}
		};
		C(u, (e) => {
			_().me && e(g);
		});
		var v = J(u, 2), y = z(v), b = (e) => {
			var r = t(), i = $(r), s = (e) => {
				var r = t(), i = $(r);
				n(i, () => Q(se), (e, t) => {
					t(e, O(() => Q(ge)));
				}), P(e, r);
			}, c = (e) => {
				{
					let t = q(() => a.services.language === "en" ? "Your vibebooks" : "Seus vibebooks");
					Pr(e, {
						get phase() {
							return o().phase;
						},
						get lang() {
							return a.services.language;
						},
						get label() {
							return Q(t);
						},
						retry: () => {
							H.retry();
						},
						current: V
					});
				}
			};
			C(i, (e) => {
				Q(se) ? e(s) : e(c, -1);
			}), P(e, r);
		}, x = (e) => {
			var r = t(), i = $(r), o = (e) => {
				var r = t(), i = $(r);
				n(i, () => Q(X), (e, t) => {
					t(e, O(() => Q(ge)));
				}), P(e, r);
			}, c = (e) => {
				{
					let t = q(() => a.services.language === "en" ? "Archived rooms" : "Salas arquivadas");
					Pr(e, {
						get phase() {
							return s().phase;
						},
						get lang() {
							return a.services.language;
						},
						get label() {
							return Q(t);
						},
						retry: () => {
							ne.retry();
						},
						current: V
					});
				}
			};
			C(i, (e) => {
				Q(X) ? e(o) : e(c, -1);
			}), P(e, r);
		}, w = (e) => {
			var t = Fr(), n = z(t);
			r(n, () => a.roomSnippet, () => ({
				services: a.services,
				openInbox: j,
				inbox: k
			})), W(t), P(e, t);
		};
		C(y, (e) => {
			p().route.kind === "home" ? e(b) : p().route.kind === "archived" ? e(x, 1) : p().route.kind === "room" && e(w, 2);
		}), W(v);
		var T = J(v, 2), E = (e) => {
			var r = t(), i = $(r);
			{
				let e = q(() => ({
					t: a.services.t,
					ago: de
				}));
				n(i, () => Q(ce), (t, n) => {
					n(t, {
						get owner() {
							return a.services.account;
						},
						get device() {
							return a.services.device;
						},
						get pwa() {
							return a.services.pwa;
						},
						get agents() {
							return a.services.agents;
						},
						get origin() {
							return S().origin;
						},
						get lang() {
							return a.services.language;
						},
						get vb() {
							return Q(e);
						},
						get theme() {
							return Q(B);
						},
						onTheme: fe,
						onLanguage: pe,
						onArchive: () => {
							V() && (a.services.account.close(), a.services.actions.archived());
						},
						onLogout: (e) => {
							V() && a.services.account.current() && a.services.actions.logout(e);
						}
					});
				});
			}
			P(e, r);
		}, D = (n) => {
			var r = t(), i = $(r);
			e(i, () => m().binding, (e) => {
				Pt(e, {
					get value() {
						return m().binding;
					},
					children: (e, t = L) => {
						{
							let n = q(() => a.services.language === "en" ? "Your account" : "Sua conta"), r = q(() => a.services.t("Fechar"));
							Mt(e, {
								open: !0,
								get title() {
									return Q(n);
								},
								get closeLabel() {
									return Q(r);
								},
								sheet: !0,
								get returnFocus() {
									return a.services.account.returnFocus;
								},
								onOpenChange: (e) => {
									!e && !Q(ce) && V() && a.services.account.owns(t()) && a.services.account.close(t());
								},
								children: (e, n) => {
									{
										let n = q(() => a.services.language === "en" ? "Your account" : "Sua conta");
										Cr(e, {
											get phase() {
												return l().phase;
											},
											get lang() {
												return a.services.language;
											},
											get label() {
												return Q(n);
											},
											retry: () => {
												ie.retry();
											},
											current: () => V() && a.services.account.owns(t())
										});
									}
								},
								$$slots: { default: !0 }
							});
						}
					},
					$$slots: { default: !0 }
				});
			}), P(n, r);
		};
		C(T, (e) => {
			Q(ce) ? e(E) : m().open && m().binding && e(D, 1);
		});
		var A = J(T, 2), M = (r) => {
			var i = t(), o = $(i);
			e(o, () => h().binding, (e) => {
				Pt(e, {
					get value() {
						return h().binding;
					},
					children: (e, r = L) => {
						var i = t(), o = $(i), s = (e) => {
							var i = t(), o = $(i);
							{
								let e = q(() => h().phase === "loading"), t = q(() => h().error !== null), i = q(() => ({
									t: a.services.t,
									ago: de
								}));
								n(o, () => Q(le), (n, a) => {
									a(n, {
										get waits() {
											return h().data.waits;
										},
										get mentions() {
											return h().data.mentions;
										},
										get tasks() {
											return h().data.tasks;
										},
										get loading() {
											return Q(e);
										},
										get readError() {
											return Q(t);
										},
										current: () => k.owns(r()),
										onretry: () => k.refresh(r()),
										onmention: (e) => k.openMention(r(), e),
										ontask: (e) => k.openTask(r(), e),
										get roomId() {
											return r().roomId;
										},
										get all() {
											return h().all;
										},
										get vb() {
											return Q(i);
										},
										displayName: me,
										avatarUrl: he,
										ontab: (e) => k.tab(r(), e),
										onclose: () => k.close(r()),
										onresolve: (e) => k.resolve(r(), e),
										onopen: (e, t) => {
											t.button !== 0 || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey || (t.preventDefault(), t.currentTarget instanceof Element && t.currentTarget.isConnected && k.openWait(r(), e));
										}
									});
								});
							}
							P(e, i);
						}, c = (e) => {
							{
								let t = q(() => a.services.t("Caixa de entrada")), n = q(() => a.services.t("Fechar"));
								Mt(e, {
									open: !0,
									get title() {
										return Q(t);
									},
									get closeLabel() {
										return Q(n);
									},
									onOpenChange: (e) => {
										!e && !Q(le) && V() && k.close(r());
									},
									children: (e, t) => {
										{
											let t = q(() => a.services.language === "en" ? "Inbox" : "Caixa de entrada");
											Cr(e, {
												get phase() {
													return d().phase;
												},
												get lang() {
													return a.services.language;
												},
												get label() {
													return Q(t);
												},
												retry: () => {
													oe.retry();
												},
												current: () => V() && k.owns(r())
											});
										}
									},
									$$slots: { default: !0 }
								});
							}
						};
						C(o, (e) => {
							Q(le) ? e(s) : e(c, -1);
						}), P(e, i);
					},
					$$slots: { default: !0 }
				});
			}), P(r, i);
		};
		C(A, (e) => {
			h().binding && !h().binding.roomScope && e(M);
		}), I(() => N(v, 1, f(p().route.kind === "room" ? "tw:col-start-1 tw:row-start-1 tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-hidden tw:min-[901px]:col-start-2" : "tw:col-start-1 tw:row-start-2 tw:min-w-0 tw:min-[901px]:col-start-2 tw:min-[901px]:row-start-1"))), P(i, c);
	};
	C(ve, (e) => {
		p().sessionDenied || e(ye);
	}), jr(J(ve, 2), {
		get owner() {
			return a.services.device;
		},
		get lang() {
			return a.services.language;
		}
	}), W(_e), I(() => N(_e, 1, f([p().route.kind === "room" ? "tw:grid tw:h-dvh tw:min-h-0 tw:grid-cols-[minmax(0,1fr)] tw:grid-rows-[minmax(0,1fr)] tw:overflow-hidden tw:min-[901px]:grid-cols-[68px_minmax(0,1fr)]" : "tw:grid tw:min-h-dvh tw:grid-cols-[minmax(0,1fr)] tw:grid-rows-[auto_1fr] tw:min-[901px]:grid-cols-[68px_minmax(0,1fr)] tw:min-[901px]:grid-rows-[auto]", "tw:bg-background tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground"]))), P(i, _e), U(), x();
}
function zr(e) {
	let t = !0, n = null, r = "main", i = -1, a = 0, o = !1, s = 60, c = !0, l = null, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), h = null, g = null, _ = null, v = null, y = 0, b = e.schedule ?? ((e, t) => setTimeout(e, t)), x = e.cancel ?? ((e) => clearTimeout(e)), S = () => t && !!n && n.members.includes(n.me) && e.current(), C = (e) => S() && e === a, w = () => n?.messages.filter((e) => e.thread === r) ?? [], T = () => n ? Xt(n, r) : [], E = (e) => {
		if (l === null) return e.length;
		let t = e.findIndex((e) => e.id === l);
		return t < 0 ? e.length : t + 1;
	}, D = () => {
		l ??= T().at(-1)?.id ?? null;
	}, O = () => !!n && (!!n.complete || !!n.full?.includes(r) || d.has(r));
	function k() {
		g !== null && x(g), g = null;
	}
	function A(e, t) {
		let n = a, r = b(() => {
			m.delete(r), C(n) && e();
		}, t);
		m.add(r);
	}
	function j() {
		v?.(), v = null, _ = null, k(), h = null;
		for (let e of m) x(e);
		m.clear();
	}
	function M() {
		for (let [e, t] of u) t.timer !== null && x(t.timer), t.fill && f.delete(e);
		u.clear();
	}
	function N() {
		S() && _?.connected() && c && _.top(_.metrics().height);
	}
	function P(t = !1) {
		if (!S() || r.startsWith("pre:") || u.has(r)) return;
		let n = a, i = r, o = {
			fill: t,
			timer: null
		};
		p.delete(i), u.set(i, o);
		let s = !1;
		try {
			s = e.send({
				t: "older",
				thread: i,
				before: w()[0]?.id ?? 0
			});
		} catch {}
		let c = () => {
			C(n) && u.get(i) === o && (u.delete(i), p.add(i), h = null, k(), e.notice("offline"), C(n) && A(() => e.render("stay"), 0));
		};
		s ? C(n) && u.get(i) === o && (o.timer = b(c, 1e4)) : c();
	}
	function F(e) {
		if (!S() || !_?.connected()) return !1;
		let t = a, n = _, r = _.message(e);
		return r ? (c = !1, D(), r.reveal(), C(t) && _ === n && _.connected() && r.highlight(), !0) : !1;
	}
	function I(t, o) {
		if (!S() || !n || !Number.isSafeInteger(t) || t <= 0) return;
		let c = [
			n.id,
			n.me,
			i
		], u = n.messages.find((e) => e.id === t), d = u && Xt(n, u.thread).some((e) => e.id === t) ? u : void 0, f = d?.thread || o;
		if (f && f !== r && (f === "main" || n.epics.some((e) => e.id === f)) && (e.selectThread(f), !S() || !n || n.id !== c[0] || n.me !== c[1] || i !== c[2] || r !== f)) return;
		let p = a, m = F(t);
		if (C(p)) {
			if (m) h = null, k();
			else {
				if (d) {
					let i = Xt(n, r), a = i.findIndex((e) => e.id === t);
					if (a >= 0) {
						if (l = null, s = Math.max(s, i.length - a + 10), e.render(!0), !C(p)) return;
						let n = F(t);
						if (!C(p)) return;
						if (n) {
							h = null, k();
							return;
						}
					}
				}
				(h?.id !== t || h.scope !== a) && (k(), h = {
					id: t,
					pages: 1,
					scope: a
				}, e.notice("searching"), C(p) && P());
			}
		}
	}
	return {
		sync(e, u, m, h, g = !1) {
			if (!t) return !1;
			if (!e.members.includes(e.me)) return a++, j(), M(), n = null, d.clear(), f.clear(), p.clear(), !0;
			let _ = !n || n.id !== e.id || n.me !== e.me || i !== m, v = n?.messages !== e.messages || n?.origins !== e.origins, y = _ || u !== r;
			return (y || g) && (a++, j(), y && (s = 60, c = !0, l = null)), (y || g) && M(), (_ || g) && (d.clear(), f.clear(), p.clear()), n = e, r = u, l !== null && v && !T().some((e) => e.id === l) && (l = null), i = m, o = h, y;
		},
		selection() {
			if (!S() || !n || r.startsWith("pre:")) return {
				list: [],
				previous: void 0,
				more: !1
			};
			let e = T(), t = E(e), i = Math.max(0, t - s);
			return {
				list: e.slice(i, t),
				previous: e[i - 1],
				more: i > 0 || (!!e.length || p.has(r)) && !O()
			};
		},
		ensureFilled() {
			S() && n && o && Xt(n, r).length < 60 && !O() && !u.has(r) && !f.has(r) && (f.add(r), P(!0));
		},
		loadOlder() {
			!S() || r.startsWith("pre:") || u.has(r) || (n && E(T()) > s ? (s += 60, e.render(!0)) : !O() && (w().length || p.has(r)) && P());
		},
		older(t) {
			if (!S()) return;
			let i = u.get(t.thread);
			if (i?.timer !== null && i?.timer !== void 0 && x(i.timer), u.delete(t.thread), p.delete(t.thread), t.more || d.add(t.thread), t.thread !== r) return;
			s += t.messages.length;
			let o = a, c = h;
			e.render(!i?.fill), C(o) && c && h === c && (n && Xt(n, r).some((e) => e.id === c.id) ? (h = null, k(), g = b(() => {
				g = null, C(o) && h === null && I(c.id);
			}, 50)) : t.more && c.pages < 15 ? (c.pages++, P()) : (h = null, e.notice("missing")));
		},
		go: I,
		attach(t) {
			if (!S() || _ === t) return;
			v?.(), _ = t, y = t.metrics().top;
			let n = a;
			v = t.listen(() => {
				if (!C(n) || _ !== t || !t.connected()) return;
				let r = t.metrics(), i = c;
				r.height - r.top - r.client < 80 ? c = !0 : r.top < y - 2 && (c = !1, D()), y = r.top, c && !i && l !== null ? (l = null, e.render()) : r.top < 150 && !c && this.loadOlder();
			}, () => {
				C(n) && _ === t && N();
			});
		},
		detachSurface(e) {
			_ === e && j();
		},
		capture() {
			return S() && _?.connected() ? {
				..._.metrics(),
				scope: a
			} : null;
		},
		afterRender(e, t) {
			if (!S() || !_?.connected() || !t || t.scope !== a) return;
			let n = a, r = _;
			e === "stay" ? r.top(t.top) : e ? r.top(t.top + r.metrics().height - t.height) : (l = null, c = !0, N()), C(n) && _ === r && (y = r.metrics().top);
		},
		pinned: () => c,
		followLatest() {
			S() && (l = null, c = !0);
		},
		defer: A,
		cancelSearch() {
			h = null, k();
		},
		reset() {
			a++, j(), n = null, M(), d.clear(), f.clear(), p.clear(), s = 60, o = !1, c = !0;
		},
		dispose() {
			t = !1, a++, j(), n = null, M(), d.clear(), f.clear(), p.clear();
		}
	};
}
// svelte/features/chat-viewport/surface.ts
function Br(e) {
	let t = () => e.isConnected && e.clientHeight > 0 && e.getClientRects().length > 0;
	return {
		connected: t,
		metrics: () => ({
			top: e.scrollTop,
			height: e.scrollHeight,
			client: e.clientHeight
		}),
		top(n) {
			t() && (e.scrollTop = n);
		},
		message(n) {
			let r = e.querySelector(`#m${n}`);
			return r ? {
				reveal() {
					t() && r.isConnected && e.contains(r) && r.scrollIntoView({
						block: "center",
						behavior: "smooth"
					});
				},
				highlight() {
					t() && r.isConnected && e.contains(r) && r.dispatchEvent(new CustomEvent("vb:message-highlight"));
				}
			} : null;
		},
		listen(t, n) {
			let r = !0, i = () => {
				r && e.isConnected && n();
			}, a = new ResizeObserver(i), o = () => {
				a.disconnect(), a.observe(e);
				for (let t of e.children) a.observe(t);
			}, s = new MutationObserver(() => {
				r && e.isConnected && (o(), n());
			});
			return o(), s.observe(e, {
				childList: !0,
				subtree: !0
			}), e.addEventListener("scroll", t), e.ownerDocument.fonts?.addEventListener("loadingdone", i), () => {
				r && (r = !1, a.disconnect(), s.disconnect(), e.removeEventListener("scroll", t), e.ownerDocument.fonts?.removeEventListener("loadingdone", i));
			};
		}
	};
}
// svelte/features/chat-viewport/presentation.ts
function Vr(e) {
	let t = null, n = "stay", r = !1;
	return {
		capture(i, a) {
			let o = e.capture();
			!r && o ? (t = o, n = i) : (!t && o && (t = o), i !== "stay" && (n = i)), r = !a || !o;
		},
		rendered(i) {
			if (!i) return !1;
			let a = e.capture();
			if (!a) return !1;
			let o = t ? {
				...t,
				scope: a.scope
			} : a;
			return e.afterRender(n, o), t = e.capture(), r = !1, !0;
		},
		reset() {
			t = null, n = "stay", r = !1;
		}
	};
}
// svelte/features/needs-you/model.ts
function Hr(e, t, n) {
	if (t.startsWith("pre:") || t !== "main" && !e.epics.some((e) => e.id === t)) return [];
	let r = n.filter((n) => n.book_id === e.id && n.thread === t), i = new Set(r.filter((e) => e.ref.startsWith("t")).map((e) => e.ref.slice(1))), a = t === "main" ? e.roomTasks ?? [] : e.epics.find((e) => e.id === t)?.tasks ?? [];
	return [...r.map((e) => {
		let t = /^[mab]\d+$/.test(e.ref) ? Number(e.ref.slice(1)) : NaN;
		return {
			key: `w:${e.ref}`,
			signature: JSON.stringify([
				"wait",
				e.ref,
				e.thread,
				e.author,
				e.text,
				e.ts
			]),
			text: e.text,
			kind: e.ref.startsWith("t") ? "review" : e.ref.startsWith("m") ? "ask" : "agent",
			author: e.author,
			messageId: Number.isSafeInteger(t) && t > 0 ? t : void 0,
			wait: e
		};
	}), ...a.filter((t) => t.owner === e.me && !t.done && !i.has(t.id)).map((e) => ({
		key: `t:${e.id}:${e.status}`,
		signature: JSON.stringify([
			"task",
			e.id,
			e.status,
			e.title,
			e.owner,
			e.done
		]),
		text: e.title,
		kind: e.status === "doing" ? "doing" : e.status === "review" ? "review" : "todo"
	}))];
}
var Ur = (e) => `vb.needs.${encodeURIComponent(e.account)}.${e.roomId}.${e.thread}`;
function Wr(e) {
	if (e && e.length > 256e3) return /* @__PURE__ */ new Set();
	try {
		let t = JSON.parse(e ?? "[]");
		return new Set(Array.isArray(t) ? t.filter((e) => typeof e == "string" && e.length <= 1024).slice(-200) : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
// svelte/features/needs-you/session.ts
function Gr(e) {
	let t = !0, n = "", r = 0, i = !1, a = [], o = [], s = at(e.clock), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
	function u() {
		if (!t || !e.current()) return null;
		let u = e.read();
		if (!u) return null;
		let d = {
			account: u.room.me,
			roomId: u.room.id,
			thread: u.thread
		}, f = Ur(d);
		n !== f && (n = f, r++, s.cancel(), i = !1, a = [], o = []);
		try {
			let t = e.storage?.getItem(f) ?? null;
			l.has(f) && l.get(f) === t || (l.set(f, t), c.set(f, Wr(t)));
		} catch {}
		c.has(f) || c.set(f, /* @__PURE__ */ new Set());
		let p = e.read();
		return !t || !e.current() || !p || p.room.id !== d.roomId || p.room.me !== d.account || p.thread !== d.thread ? null : {
			binding: d,
			key: f,
			items: Hr(p.room, p.thread, p.waits)
		};
	}
	let d = (e) => {
		let t = u();
		return t && t.key === Ur(e) ? t : null;
	}, f = (e, t) => {
		let n = d(e);
		return n ? t.filter((e) => n.items.some((t) => t.key === e.key && t.signature === e.signature)) : [];
	};
	async function p(t, n) {
		if (!d(t) || i || !n.length) return;
		let c = ++r;
		if (i = !0, a = [], o = n, e.changed(), !d(t) || c !== r) return;
		let l = f(t, n).flatMap((e) => e.wait?.ref.startsWith("m") ? [{ ref: e.wait.ref }] : []);
		if (!l.length) i = !1, e.changed();
		else try {
			if (await s.run((n) => Promise.all(l.map((i) => {
				if (!d(t) || c !== r) throw Error("cancelled");
				return e.resolve(t.roomId, i.ref, n);
			})), 2e4), !d(t) || c !== r) return;
			i = !1, o = [], e.resolved(), d(t) && c === r && e.changed();
		} catch (s) {
			if (!d(t) || c !== r) return;
			if (i = !1, s instanceof mr && s.status === 401) {
				e.denied();
				return;
			}
			o = [], a = f(t, n), e.changed();
		}
	}
	return {
		view() {
			let e = u();
			return !e || e.binding.thread.startsWith("pre:") ? null : (i && o.length && !o.some((t) => e.items.some((e) => e.key === t.key && e.signature === t.signature)) && (r++, s.cancel(), i = !1, o = []), a = f(e.binding, a), {
				binding: e.binding,
				items: e.items.filter((t) => !c.get(e.key)?.has(t.key)),
				busy: i,
				error: !!a.length,
				operation: r
			});
		},
		dismiss(t, n) {
			if (i) return;
			let r = f(t, n).filter((e) => !c.get(Ur(t))?.has(e.key)), a = d(t);
			if (!a || !r.length) return;
			let o = c.get(a.key) ?? /* @__PURE__ */ new Set();
			for (let e of r) o.add(e.key);
			let s = new Set([...o].slice(-200));
			c.set(a.key, s);
			try {
				if (e.storage) {
					let t = JSON.stringify([...s]);
					e.storage.setItem(a.key, t), l.set(a.key, t);
				}
			} catch {}
			if (e.changed(), !d(t)) return;
			let u = f(t, r).filter((e) => e.wait?.ref.startsWith("m"));
			u.length && p(t, u);
		},
		retry(e, t) {
			if (t !== r || i) return;
			let n = f(e, a);
			n.length && p(e, n);
		},
		navigate(t, n) {
			f(t, [n]).length && n.messageId && e.navigate(n.messageId, t.thread);
		},
		dispose() {
			t = !1, r++, s.cancel(), a = [], o = [], c.clear(), l.clear(), i = !1;
		}
	};
}
// svelte/features/files/session.ts
var Kr = 1e4, qr = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
};
function Jr(e, t = qr) {
	let n = K({
		kind: "all",
		directory: "",
		pending: null,
		error: "",
		loading: !1,
		loadError: ""
	}), r = !0, i = null, a = 0, o = 0, s = null, c = null, l = () => {
		s !== null && t.cancel(s), s = null;
	}, u = () => {
		c !== null && t.cancel(c), c = null;
	}, d = () => {
		let e = X(n).pending;
		e?.ack && i && (e.pin ? i.pins?.some((t) => t.kind === "file" && t.ref === e.id) : !i.pins?.some((t) => t.id === e.pinId)) && (l(), n.update((e) => ({
			...e,
			pending: null
		})));
	};
	async function f(e, t) {
		try {
			return await e(t);
		} catch (e) {
			return {
				ok: !1,
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}
	return {
		roomId: e,
		state: n,
		sync(t, a = !1) {
			r && t.id === e && (i = t, (a || t.filesAll && (X(n).loading || X(n).loadError)) && (u(), ++o, n.update((e) => ({
				...e,
				loading: !1,
				loadError: ""
			}))), d());
		},
		select(e, t) {
			r && n.update((n) => ({
				...n,
				kind: e,
				directory: t
			}));
		},
		open(e, t) {
			if (!r || !i) return !1;
			let n = $t(i, e);
			return n ? (t(n), !0) : !1;
		},
		async load(e) {
			if (!r || !i || i.filesAll || X(n).loading) return;
			let a = ++o;
			n.update((e) => ({
				...e,
				loading: !0,
				loadError: ""
			}));
			let s = await f(e, { t: "files.get" });
			r && a === o && (s.ok ? X(n).loading && (c = t.schedule(() => {
				r && a === o && (c = null, n.update((e) => ({
					...e,
					loading: !1,
					loadError: "unconfirmed"
				})));
			}, Kr)) : n.update((e) => ({
				...e,
				loading: !1,
				loadError: s.error
			})));
		},
		async toggle(e, o) {
			if (!r || !i || X(n).pending) return;
			let c = $t(i, e);
			if (!c) return;
			let l = i.pins?.find((e) => e.kind === "file" && e.ref === c.id), u = ++a;
			n.update((e) => ({
				...e,
				pending: {
					id: c.id,
					pin: !l,
					pinId: l?.id,
					ack: !1
				},
				error: ""
			}));
			let p = await f(o, l ? {
				t: "pin.del",
				id: l.id
			} : {
				t: "pin.add",
				kind: "file",
				ref: c.id
			});
			r && u === a && (p.ok ? (n.update((e) => ({
				...e,
				pending: e.pending ? {
					...e.pending,
					ack: !0
				} : null
			})), d(), X(n).pending && (s = t.schedule(() => {
				r && u === a && X(n).pending && (s = null, n.update((e) => ({
					...e,
					pending: null,
					error: "unconfirmed"
				})));
			}, Kr))) : n.update((e) => ({
				...e,
				pending: null,
				error: p.error
			})));
		},
		dispose() {
			r = !1, l(), u(), a++, o++, i = null;
		}
	};
}
// svelte/features/file-viewer/api.ts
var Yr = 12e5, Xr = 3e5, Zr = me({
	type: pe(),
	name: le(pe()),
	size: le(de())
}), Qr = class extends Error {
	status;
	constructor(e, t) {
		super(t), this.status = e;
	}
};
function $r(e) {
	let t = e.headers.get("content-disposition") ?? "", n = /filename\*=UTF-8''([^;]+)/i.exec(t)?.[1], r;
	try {
		n && (r = decodeURIComponent(n));
	} catch {}
	let i = /^bytes \d+-\d+\/(\d+)$/.exec(e.headers.get("content-range") ?? ""), a = e.headers.get("content-length"), o = i ? Number(i[1]) : a && e.status === 200 ? Number(a) : void 0;
	return Zr.parse({
		type: e.headers.get("content-type") ?? "application/octet-stream",
		name: r,
		size: Number.isSafeInteger(o) && Number(o) >= 0 ? o : void 0
	});
}
function ei(e) {
	if (!e.ok) throw new Qr(e.status, e.status === 401 ? "signed-out" : e.status === 403 ? "forbidden" : e.status === 404 ? "missing" : "read-failed");
}
function ti(e = fetch) {
	return {
		async probe(t, n) {
			let r = await e(on(t), {
				headers: {
					accept: "application/octet-stream",
					range: "bytes=0-0"
				},
				credentials: "same-origin",
				cache: "no-store",
				signal: n
			});
			try {
				if (ei(r), r.status !== 200 && r.status !== 206 || r.status === 206 && !/^bytes 0-0\/[1-9]\d*$/.test(r.headers.get("content-range") ?? "")) throw new Qr(r.status, "invalid-range");
				return $r(r);
			} finally {
				await r.body?.cancel().catch(() => {});
			}
		},
		async text(t, n) {
			let r = await e(on(t), {
				headers: { accept: "text/plain" },
				credentials: "same-origin",
				cache: "no-store",
				signal: n
			});
			try {
				ei(r);
			} catch (e) {
				throw await r.body?.cancel().catch(() => {}), e;
			}
			let i = $r(r);
			if (!r.body) return {
				metadata: i,
				text: "",
				truncated: !1
			};
			let a = r.body.getReader(), o = new TextDecoder(), s = "", c = 0, l = !1;
			try {
				for (;;) {
					let e = await a.read();
					if (e.done) {
						s += o.decode();
						break;
					}
					let t = Yr - c;
					if (e.value.byteLength > t) {
						s += o.decode(e.value.subarray(0, Math.max(0, t)), { stream: !0 }), l = !0;
						break;
					}
					if (c += e.value.byteLength, s += o.decode(e.value, { stream: !0 }), s.length > 3e5) {
						l = !0;
						break;
					}
					if (c === 12e5) {
						(await a.read()).done ? s += o.decode() : l = !0;
						break;
					}
				}
			} finally {
				await a.cancel().catch(() => {}), a.releaseLock();
			}
			return {
				metadata: i,
				text: s.slice(0, Xr),
				truncated: l || s.length > 3e5
			};
		}
	};
}
// svelte/features/file-viewer/history.ts
var ni = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, ri = me({
	token: pe(),
	roomId: pe(),
	id: pe(),
	returnURL: pe()
}), ii = me({ vbFileViewer: ri });
function ai(e) {
	let t = e.clock ?? ni, n = e.enqueue ?? queueMicrotask, r = !0, i = null, a = null, o = null, s = null, c = 0, l = 0, u = (t, n) => {
		try {
			let r = new URL(e.href()), i = new URL(t, r);
			return i.origin === r.origin && RegExp(`^/b/${n}/?$`).test(i.pathname) ? i.pathname + i.search + i.hash : null;
		} catch {
			return null;
		}
	}, d = () => {
		let t = ii.safeParse(e.state());
		if (!t.success) return null;
		let n = sn.safeParse(t.data.vbFileViewer);
		return !n.success || !u(t.data.vbFileViewer.returnURL, n.data.roomId) || !u(e.href(), n.data.roomId) ? null : t.data.vbFileViewer;
	}, f = (t, n) => {
		let r = sn.parse(t), i = new URL(rn(r), e.href()), a = new URL(e.href());
		i.pathname = a.pathname, i.search = a.search, e.history[n ? "replaceState" : "pushState"]({ vbFileViewer: t }, "", i.pathname + i.search + i.hash);
	}, p = () => {
		o !== null && t.cancel(o), o = null;
	}, m = (e) => {
		p(), a = null;
		let t = s;
		s = null;
		let i = l;
		e && t && n(() => {
			r && l === i && t();
		});
	};
	return {
		incomingTarget() {
			let t = d(), n = en(e.href());
			return t && n?.roomId === t.roomId && n.id === t.id ? n : null;
		},
		open(t) {
			if (!r) return;
			l++;
			let n = sn.parse(t), a = d(), o = new URL(e.href());
			if (i && a?.token === i.token) {
				i = {
					...i,
					...n
				}, f(i, !0);
				return;
			}
			if (a && a.roomId === n.roomId && o.hash === `#f${n.id}`) {
				i = {
					...a,
					...n
				};
				return;
			}
			/^#f[0-9a-f]+$/.test(o.hash) && (o.hash = "", e.history.replaceState(null, "", o.pathname + o.search));
			let s = u(o.pathname + o.search + o.hash, n.roomId);
			if (!s) throw Error("viewer-route-mismatch");
			i = {
				...n,
				token: `file-${++c}-${Math.random().toString(36).slice(2)}`,
				returnURL: s
			}, f(i, !1);
		},
		replace(e) {
			if (!r || !i) return;
			let t = sn.parse(e);
			t.roomId === i.roomId && (i = {
				...i,
				...t
			}, d()?.token === i.token && f(i, !0));
		},
		closeUser() {
			if (!r || !i) return;
			let n = i;
			i = null, d()?.token === n.token && (a = n, e.history.back(), p(), o = t.schedule(() => {
				r && a?.token === n.token && (o = null, e.unconfirmed?.());
			}, 1500));
		},
		closeNavigation() {
			if (!r) return;
			l++;
			let t = i;
			i = null;
			let n = d();
			t && n?.token === t.token && e.history.replaceState(null, "", new URL(e.href()).pathname + new URL(e.href()).search + new URL(e.href()).hash);
		},
		deferNavigation(e) {
			return !r || !a ? !1 : (l++, s = e, !0);
		},
		consumePop() {
			if (!r) return "none";
			let t = a ?? i;
			if (!t) return "none";
			let n = new URL(e.href()), o = n.pathname + n.search + n.hash;
			i = null, e.closed();
			let s = o === t.returnURL;
			return a && m(s), s ? "handled" : "route";
		},
		reset() {
			l++, i = null, a = null, s = null, p();
		},
		dispose() {
			l++, r = !1, i = null, a = null, s = null, p();
		}
	};
}
// svelte/features/file-viewer/session.ts
var oi = () => ({
	open: !1,
	room: null,
	target: null,
	file: void 0,
	name: "",
	versions: [],
	phase: "idle",
	error: "",
	content: null,
	indexPending: !1,
	indexError: "",
	pinPending: !1,
	pinError: "",
	closingUnconfirmed: !1
}), si = (e) => e instanceof Error ? e.message : "read-failed";
function ci(e) {
	let t = e.clock ?? ni, n = e.api ?? ti(), r = K(oi()), i = !0, a = null, o, s = 0, c = 0, l = !1, u = null, d = null, f = null, p = null, m = null, h, g = () => {
		h?.(), h = void 0, m?.dispose(), m = null;
	}, _ = (e) => {
		e !== null && t.cancel(e);
	}, v = () => {
		s++, f?.abort(), f = null, _(d), d = null;
	}, y = () => {
		c++, _(u), u = null;
	}, b = () => {
		v(), y(), l = !1, r.set(oi());
	}, x = ai({
		...e,
		clock: t,
		closed: b,
		unconfirmed: () => {
			i && r.update((e) => ({
				...e,
				closingUnconfirmed: !0
			}));
		}
	}), S = (e) => i && a !== null && X(r).open && e === s && a.id === X(r).target?.roomId && a.me === X(r).room?.me;
	function C(e, t) {
		S(e) && (v(), r.update((e) => ({
			...e,
			phase: "error",
			error: t,
			content: null
		})));
	}
	function w() {
		let e = X(r);
		if (!e.open || !a || !e.target) return;
		let t = an(a).find((t) => t.id === e.target.id);
		if (t && e.target.metadata && !cn(t, e.target.metadata)) {
			C(s, "metadata-changed");
			return;
		}
		if (a.filesAll && !t) {
			C(s, "missing");
			return;
		}
		let n = t ?? e.file, i = n?.name ?? e.name, o = n ? tn(a, n.name) : [];
		n && !o.some((e) => e.id === n.id) && o.push(n), r.update((e) => ({
			...e,
			room: a,
			file: n,
			name: i,
			versions: o
		}));
	}
	function T(e = !1) {
		if (!i || !a || !o || !X(r).open || a.filesAll || l && !e) return;
		y(), l = !0;
		let n = c, s = {
			id: a.id,
			me: a.me
		}, d = o;
		r.update((e) => ({
			...e,
			indexPending: !0,
			indexError: ""
		}));
		let f = () => i && n === c && a?.id === s.id && a.me === s.me && X(r).open, p = () => {
			f() && (y(), l = !1, r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: "index-unconfirmed"
			})));
		};
		u = t.schedule(p, 2e4), Promise.resolve().then(() => f() ? d({ t: "files.get" }) : {
			ok: !1,
			error: "disposed"
		}).then((e) => {
			f() && (a?.filesAll ? (y(), r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: ""
			}))) : (_(u), e.ok ? u = t.schedule(p, 1e4) : (l = !1, r.update((t) => ({
				...t,
				indexPending: !1,
				indexError: e.error
			})))));
		}, (e) => {
			f() && (_(u), l = !1, r.update((t) => ({
				...t,
				indexPending: !1,
				indexError: si(e)
			})));
		});
	}
	async function E() {
		let e = X(r);
		if (!i || !a || !e.open || !e.target) return;
		v();
		let o = s, c = sn.parse(e.target);
		f = new AbortController();
		let l = f.signal;
		r.update((e) => ({
			...e,
			phase: "loading",
			error: "",
			content: null
		})), d = t.schedule(() => C(o, "read-timeout"), 2e4);
		try {
			let t = await n.probe(c, l);
			if (!S(o)) return;
			let i = X(r).file, a = i?.name ?? t.name ?? e.target.label ?? "file", s = nn(t.type, a);
			if (i) {
				let e = nn(i.type, i.name);
				if (t.size !== void 0 && t.size !== i.size || e !== s && (s !== "text" || e !== "markdown" && e !== "csv")) throw Error("metadata-changed");
			}
			let u = i ? nn(i.type, i.name) : s;
			if (r.update((e) => ({
				...e,
				name: a,
				content: {
					kind: u,
					url: on(c, u === "html"),
					operation: o
				}
			})), u === "markdown" || u === "csv" || u === "text") {
				let e = await n.text(c, l);
				if (!S(o)) return;
				_(d), d = null, r.update((t) => ({
					...t,
					phase: "ready",
					content: {
						kind: u,
						url: on(c),
						text: e.text,
						truncated: e.truncated,
						operation: o
					}
				}));
			} else u === "download" && (_(d), d = null, r.update((e) => ({
				...e,
				phase: "ready"
			})));
		} catch (e) {
			S(o) && C(o, si(e));
		}
	}
	function D(e, t) {
		if (!i || !a || a.id !== e.roomId || !a.members.includes(a.me) || !sn.safeParse(e).success) return !1;
		if (x.deferNavigation(() => D(e, t))) return !0;
		let n = an(a).find((t) => t.id === e.id);
		if (a.filesAll && !n && e.metadata || e.metadata && (!n || !cn(n, e.metadata))) return !1;
		X(r).open || (p = t?.isConnected ? t : null), v(), y(), l = !1, x.open(e);
		let o = m ? X(m.state) : null;
		return r.set({
			...oi(),
			open: !0,
			room: a,
			target: e,
			file: n,
			name: n?.name ?? e.label ?? "file",
			pinPending: !!o?.pending,
			pinError: o?.error ?? ""
		}), w(), T(), X(r).phase !== "error" && E(), !0;
	}
	return {
		state: r,
		sync(e, n, s = !1) {
			i && (e.members.includes(e.me) ? (a && (a.id !== e.id || a.me !== e.me) && (b(), x.reset(), p = null, g()), a = e, o = n, m || (m = Jr(e.id, t), h = m.state.subscribe((e) => r.update((t) => ({
				...t,
				pinPending: !!e.pending,
				pinError: e.error
			})))), m.sync(e, s), s && (y(), l = !1, r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: ""
			}))), e.filesAll && X(r).indexPending && (y(), r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: ""
			}))), X(r).open && (w(), s && T())) : (b(), x.reset(), g(), a = null, o = void 0, p = null));
		},
		open: D,
		select(e) {
			let t = X(r);
			if (!t.open || !t.target || !t.versions.some((t) => t.id === e)) return;
			let n = t.versions.find((t) => t.id === e);
			D({
				roomId: t.target.roomId,
				id: e,
				metadata: n
			});
		},
		retry() {
			if (i && a && X(r).open) {
				w();
				let e = X(r), t = an(a).find((t) => t.id === e.target?.id);
				if (a.filesAll && !t || t && e.target?.metadata && !cn(t, e.target.metadata)) return;
				E();
			}
		},
		retryIndex() {
			T(!0);
		},
		current: S,
		popOutcome: x.consumePop,
		restoreHistory(t) {
			let n = x.incomingTarget();
			return !t || !i || !a || !n || a.id !== t.roomId || a.me !== t.account || n.roomId !== t.roomId || (new URL(e.href()).searchParams.get("t") || "main") !== t.thread ? !1 : D(n);
		},
		togglePin() {
			let e = X(r);
			i && e.open && e.file && o && m && a && a.id === e.target?.roomId && m.toggle(e.file, o);
		},
		ready(e) {
			S(e) && (_(d), d = null, r.update((e) => ({
				...e,
				phase: "ready",
				error: ""
			})));
		},
		mediaError(e) {
			C(e, "preview-failed");
		},
		closeUser() {
			X(r).open && (b(), x.closeUser());
		},
		closeNavigation() {
			b(), x.closeNavigation();
		},
		consumePop: () => x.consumePop() === "handled",
		deferNavigation: x.deferNavigation,
		returnFocus() {
			return p?.isConnected ? p : null;
		},
		reset() {
			b(), x.reset(), g(), a = null, o = void 0, p = null;
		},
		dispose() {
			i = !1, b(), x.dispose(), g(), a = null, o = void 0, p = null;
		}
	};
}
// svelte/features/file-viewer/navigation.ts
function li(e, t, n, r) {
	let i = e?.popOutcome() ?? "none";
	return i === "handled" ? !0 : en(r) ? e?.restoreHistory(t) ?? !1 : i !== "route" && n();
}
// svelte/features/navigation/model.ts
var ui = (e, t) => e.filter((e) => !e.archived || e.id === t);
function di(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.has(n.id) || t.set(n.id, n);
	let n = /* @__PURE__ */ new Map();
	for (let e of t.values()) n.set(e.id, e.parent && e.parent !== e.id && t.has(e.parent) ? e.parent : null);
	let r = /* @__PURE__ */ new Set();
	for (let e of t.keys()) {
		let t = [], i = /* @__PURE__ */ new Map(), a = e;
		for (; a && !r.has(a);) {
			let e = i.get(a);
			if (e !== void 0) {
				for (let r of t.slice(e)) n.set(r, null);
				break;
			}
			i.set(a, t.length), t.push(a), a = n.get(a) ?? null;
		}
		for (let e of t) r.add(e);
	}
	let i = [], a = /* @__PURE__ */ new Map();
	for (let e of t.values()) {
		let t = n.get(e.id);
		if (!t) i.push(e);
		else {
			let n = a.get(t) ?? [];
			n.push(e), a.set(t, n);
		}
	}
	return {
		roots: i,
		byId: t,
		parents: n,
		children: a
	};
}
function fi(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function pi(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
	let i = /* @__PURE__ */ new Set();
	for (let t of n) {
		let n = e.parents.get(t);
		for (; n && !i.has(n);) i.add(n), n = e.parents.get(n);
	}
	let a = [], o = e.roots.map((e) => ({
		epic: e,
		depth: 0,
		hidden: !1
	})).reverse();
	for (; o.length;) {
		let n = o.pop(), s = e.children.get(n.epic.id) ?? [];
		if (a.push({
			...n,
			hasChildren: s.length > 0,
			busyBelow: i.has(n.epic.id)
		}), r || !t.has(n.epic.id)) for (let e = s.length - 1; e >= 0; e--) o.push({
			epic: s[e],
			depth: n.depth + 1,
			hidden: n.hidden || t.has(n.epic.id)
		});
	}
	return a;
}
function mi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function hi(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = di(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function gi() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function _i(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function vi(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function yi(e, t = !1, n = gi()) {
	return {
		roomId: e,
		storage: n,
		state: K({
			draft: "",
			closed: _i(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function bi(e, t, n) {
	let r = X(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of fi(t, n)) i.delete(e);
	vi(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function xi(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), vi(e, r), {
			...n,
			closed: r
		};
	});
}
function Si(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : yi(t.id, r);
	return bi(i, di(t.epics), n), i;
}
// svelte/features/pins/model.ts
function Ci(e) {
	let t = e.trim();
	if (!t || t.length > 2e3 || /[\u0000-\u001f\u007f]/.test(t)) return null;
	try {
		let e = new URL(/^[a-z]+:\/\//i.test(t) ? t : `https://${t}`);
		return e.protocol === "http:" || e.protocol === "https:" ? e.href : null;
	} catch {
		return null;
	}
}
function wi(e) {
	let t = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(e);
	return t ? {
		connectionId: t[1] ?? "room",
		tool: t[2]
	} : null;
}
function Ti(e, t) {
	if (e.kind === "link") {
		let t = Ci(e.ref);
		if (!t) return {
			kind: "unavailable",
			label: e.title || e.ref,
			reason: "Link inválido"
		};
		let n = new URL(t).hostname.replace(/^www\./, "");
		return {
			kind: "link",
			href: t,
			label: e.title || n,
			detail: n
		};
	}
	if (e.kind === "file") {
		let n = t.files?.find((t) => t.id === e.ref);
		return n ? {
			kind: "file",
			file: n,
			label: e.title || n.name,
			detail: "arquivo"
		} : t.filesAll ? {
			kind: "unavailable",
			label: e.title || e.ref,
			reason: "Arquivo indisponível"
		} : {
			kind: "file-unloaded",
			id: e.ref,
			label: e.title || e.ref
		};
	}
	if (e.kind === "app") {
		let n = wi(e.ref), r = n?.connectionId === "room" && t.filesAll && !t.files?.some((e) => e.name === `apps/${n.tool}.html`);
		return n && !r ? {
			kind: "app",
			app: n,
			label: e.title || n.tool,
			detail: n.connectionId === "room" ? "app da sala" : "app"
		} : {
			kind: "unavailable",
			label: e.title || e.ref,
			reason: "App indisponível"
		};
	}
	return {
		kind: "unavailable",
		label: e.title || e.ref,
		reason: "Item indisponível"
	};
}
// svelte/features/pins/session.ts
var Ei = () => ({
	url: "",
	title: ""
});
function Di(e) {
	return {
		roomId: e,
		active: !0,
		pins: [],
		filesRequested: !1,
		sequence: 0,
		state: K({
			adding: !1,
			draft: Ei(),
			pending: null,
			issue: null,
			filesPending: !1,
			fileIssue: null
		})
	};
}
function Oi(e) {
	e && (e.active = !1, e.sequence++);
}
function ki(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !0,
		issue: null
	}));
}
function Ai(e, t) {
	e.active && e.state.update((e) => ({
		...e,
		draft: {
			...e.draft,
			...t
		},
		issue: null
	}));
}
function ji(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !1,
		issue: null
	}));
}
function Mi(e, t) {
	return e.url === t.url && e.title === t.title;
}
function Ni(e, t, n) {
	return n.some((n) => n.kind === "link" && n.ref === e && (!t || n.title === t));
}
function Pi(e, t) {
	let n = e;
	n?.active && n.roomId === t.id || (Oi(n), n = Di(t.id)), n.pins = t.pins ?? [];
	let r = X(n.state), i = t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref));
	return (t.filesAll || !i) && (r.filesPending || r.fileIssue) && (r = {
		...r,
		filesPending: !1,
		fileIssue: null
	}, n.state.set(r)), n;
}
async function Fi(e, t, n, r, i) {
	if (!e.active || e.roomId !== t || X(e.state).pending) return;
	let a = ++e.sequence;
	e.state.update((e) => ({
		...e,
		pending: {
			sequence: a,
			command: r,
			draft: i
		},
		issue: null
	}));
	let o = () => e.active && e.sequence === a && X(e.state).pending?.sequence === a, s;
	try {
		s = await n(r);
	} catch {
		o() && e.state.update((e) => ({
			...e,
			pending: null,
			issue: { kind: "send-failed" }
		}));
		return;
	}
	if (!o()) return;
	let c = X(e.state);
	if (s.ok) {
		let t = r.t === "pin.add" && i && Mi(c.draft, i);
		e.state.set({
			...c,
			pending: null,
			issue: null,
			...t ? {
				adding: !1,
				draft: Ei()
			} : {}
		});
		return;
	}
	let l = s.error === "offline" ? { kind: "offline" } : s.error === "timeout" || s.error === "disconnected" ? { kind: "unconfirmed" } : {
		kind: "rejected",
		detail: s.error
	};
	e.state.set({
		...c,
		pending: null,
		issue: l
	});
}
async function Ii(e, t, n) {
	if (!e.active || e.roomId !== t || X(e.state).pending) return;
	let r = X(e.state);
	if (!r.adding) return;
	let i = Ci(r.draft.url);
	if (!i) {
		e.state.update((e) => ({
			...e,
			issue: { kind: "invalid-link" }
		}));
		return;
	}
	let a = r.draft.title.trim().slice(0, 80);
	if (Ni(i, a, e.pins)) e.state.set({
		...r,
		adding: !1,
		draft: Ei(),
		issue: { kind: "already-pinned" }
	});
	else return Fi(e, t, n, {
		t: "pin.add",
		kind: "link",
		ref: i,
		title: a
	}, { ...r.draft });
}
async function Li(e, t, n, r) {
	if (e.pins.some((e) => e.id === n)) return Fi(e, t, r, {
		t: "pin.del",
		id: n
	});
}
function Ri(e, t, n, r = !1) {
	if (!e.active || e.roomId !== t.id || t.filesAll || !t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref)) || e.filesRequested && !r) return !1;
	e.filesRequested = !0, e.state.update((e) => ({
		...e,
		filesPending: !0,
		fileIssue: null
	}));
	try {
		if (n({ t: "files.get" })) return !0;
		e.state.update((e) => ({
			...e,
			filesPending: !1,
			fileIssue: "offline"
		}));
	} catch {
		e.state.update((e) => ({
			...e,
			filesPending: !1,
			fileIssue: "send-failed"
		}));
	}
	return !1;
}
// svelte/features/room-sidebar/session.ts
var zi = 1e4;
function Bi(e, t, n = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}) {
	let r = K({
		phase: "idle",
		error: ""
	}), i = !0, a, o, s;
	function c() {
		s?.timer !== void 0 && n.cancel(s.timer), s?.resolve(!1), s = void 0;
	}
	let l = (e) => i && s === e;
	function u(e) {
		if (!a) return !1;
		let t = e.command;
		if (t.t === "suggestion") return !!e.suggestion && !a.suggestions.some((t) => dr(t) === dr(e.suggestion));
		if (t.t === "epic") return a.epics.some((n) => !e.baseline.has(n.id) && n.title === t.title.trim().slice(0, 200));
		if (t.t === "epic.order") {
			let e = new Set(t.ids), n = a.epics.filter((t) => e.has(t.id)).map((e) => e.id), r = new Set(n);
			return JSON.stringify(n) === JSON.stringify(t.ids.filter((e) => r.has(e)));
		}
		let n = a.epics.find((e) => e.id === t.id);
		return t.t === "epic.del" ? !n : n ? t.t === "epic.owner" ? (n.owner ?? "") === t.owner : t.t === "epic.rename" ? n.title === t.title.trim().slice(0, 200) : !!n.archived == (t.archived !== !1) : !1;
	}
	function d() {
		let e = s;
		e?.ack && u(e) && (e.timer !== void 0 && n.cancel(e.timer), s = void 0, r.set({
			phase: "idle",
			error: ""
		}), e.resolve(!0));
	}
	function f(e, t) {
		l(e) && (e.timer !== void 0 && n.cancel(e.timer), e.timer = void 0, r.set({
			phase: "unconfirmed",
			error: t
		}));
	}
	return {
		account: e,
		roomId: t,
		state: r,
		sync(n, l) {
			if (!i) return;
			if (n.id !== t || n.me !== e || !n.members.includes(e)) {
				c(), a = void 0, o = void 0, r.set({
					phase: "idle",
					error: ""
				});
				return;
			}
			a = n, o = l;
			let u = s?.command;
			u && "id" in u && u.t !== "epic.del" && !n.epics.some((e) => e.id === u.id) ? (c(), r.set({
				phase: "idle",
				error: ""
			})) : d();
		},
		suggestionIntent() {
			let e = s;
			return e?.command.t === "suggestion" && e.suggestion ? {
				index: e.command.i,
				accept: !!e.command.accept,
				identity: dr(e.suggestion)
			} : null;
		},
		run(e) {
			if (!i || !a || !o || s || e.t === "suggestion" && (!a.suggestions[e.i] || e.expected && dr(e.expected) !== dr(a.suggestions[e.i])) || "id" in e && !a.epics.some((t) => t.id === e.id)) return Promise.resolve(!1);
			let t = o;
			return new Promise((i) => {
				let o = {
					token: Symbol(),
					command: e,
					baseline: new Set(a.epics.map((e) => e.id)),
					suggestion: e.t === "suggestion" ? a.suggestions[e.i] : void 0,
					ack: !1,
					resolve: i
				};
				s = o, r.set({
					phase: "pending",
					error: ""
				}), o.timer = n.schedule(() => f(o, "timeout"), 2e4), Promise.resolve().then(() => l(o) ? e.t === "suggestion" && (!a?.suggestions[e.i] || dr(a.suggestions[e.i]) !== dr(o.suggestion)) ? {
					ok: !1,
					error: "changed"
				} : t(e.t === "suggestion" ? {
					...e,
					expected: o.suggestion
				} : e) : {
					ok: !1,
					error: "offline"
				}).then((e) => {
					l(o) && (e.ok ? (o.ack = !0, o.timer !== void 0 && n.cancel(o.timer), d(), l(o) && (o.timer = n.schedule(() => f(o, "unconfirmed"), zi))) : e.error === "offline" || e.error === "invalid command" || e.error === "changed" || e.error === "suggestion changed" || e.error === "unknown epic" ? (c(), r.set({
						phase: "error",
						error: e.error
					})) : f(o, e.error));
				}, (e) => f(o, e instanceof Error ? e.message : "failed"));
			});
		},
		review() {
			X(r).phase === "unconfirmed" && (c(), r.set({
				phase: "idle",
				error: ""
			}));
		},
		dispose() {
			i = !1, c(), a = void 0, o = void 0, r.set({
				phase: "idle",
				error: ""
			});
		}
	};
}
// svelte/features/documents/session.ts
function Vi() {
	let e, t = 0, n = /* @__PURE__ */ new Map(), r = (e, t) => JSON.stringify([e, t]), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	return {
		account(t) {
			e !== t && (e = t, a.clear(), i.clear(), n.clear(), o.clear());
		},
		prove(e, t, i) {
			let a = r(e, t);
			return n.get(a) === i && (n.delete(a), !0);
		},
		denied: (e, t) => n.has(r(e, t)),
		deny(e, t, i) {
			let a = r(e, t);
			n.set(a, Math.max(n.get(a) ?? -1, i));
		},
		authorize(e, t) {
			let i = r(e.me, e.id), a = n.get(i);
			e.members.includes(e.me) && a !== void 0 && t > a && n.delete(i);
		},
		position: (e) => o.get(dn(e)),
		setPosition(e, t) {
			o.set(dn(e), t);
		},
		get: (e) => a.get(dn(e)),
		set(e, n) {
			i.set(dn(e), e), a.set(dn(e), {
				...n,
				revision: ++t
			});
		},
		orphans(e) {
			return [...i].flatMap(([t, n]) => {
				let r = a.get(t);
				return r && n.account === e.me && n.roomId === e.id && n.epicId && !e.epics.some((e) => e.id === n.epicId) ? [{
					account: n.account,
					roomId: n.roomId,
					epicId: n.epicId,
					text: r.text,
					revision: r.revision
				}] : [];
			});
		},
		delete: (e) => a.delete(dn(e)),
		clear() {
			e = void 0, a.clear(), i.clear(), n.clear(), o.clear();
		}
	};
}
function Hi(e) {
	let t = e.schedule ?? setTimeout, n = e.cancel ?? clearTimeout, r = "preview";
	try {
		e.readMode?.() === "edit" && (r = "edit");
	} catch {}
	let i = {
		target: null,
		text: "",
		mode: r,
		status: "idle",
		synced: !1,
		denied: !1,
		checkingAccess: !1,
		roomDocument: !1,
		recovery: null,
		error: !1,
		fallbackPending: !1,
		orphaned: [],
		readPending: !1,
		fallbackUnconfirmed: !1
	}, a = K(i), o = (e) => {
		i = {
			...i,
			...e
		}, a.set(i);
	}, s = !0, c, l = "main", u, d, f = 0, p, m, h, g, _, v = e.authorizationEpoch ?? 0, y = 0, b, x, S = 0, C = 0, w, T = /* @__PURE__ */ new Set();
	function E() {
		if (!i.target) return;
		d && e.drafts.setPosition(i.target, {
			selection: d.selection(),
			scroll: d.scroll()
		});
		let t = d?.text() ?? i.text;
		w !== void 0 && c && t !== fn(c, i.target) && e.drafts.set(i.target, {
			text: t,
			selection: d?.selection(),
			scroll: d?.scroll() ?? u?.scrollTop ?? 0
		});
	}
	function D() {
		++y, b !== void 0 && n(b), b = void 0, x?.abort(), x = void 0;
	}
	function O() {
		D(), i.checkingAccess && o({ checkingAccess: !1 }), ++f, ++C, m !== void 0 && n(m), m = void 0, h !== void 0 && n(h), h = void 0, _ !== void 0 && n(_), _ = void 0, E();
		let e = d;
		d = void 0, e?.destroy(), u?.replaceChildren();
	}
	function k() {
		++S, g !== void 0 && n(g), g = void 0;
	}
	function A() {
		if (!s || !c || !c.members.includes(c.me) || e.drafts.denied(c.me, c.id) || !i.target?.epicId) return;
		let n = dn(i.target);
		if (!Object.hasOwn(c.docs ?? {}, i.target.epicId) && !T.has(n)) {
			T.add(n), k();
			let r = S, a = i.target.epicId;
			o({
				readPending: !0,
				error: !1
			}), g = t(() => {
				s && r === S && i.target && dn(i.target) === n && (g = void 0, o({
					readPending: !1,
					error: !0
				}));
			}, 3e4), e.request({
				t: "doc.get",
				epic: a
			}).then((e) => {
				s && r === S && i.target && dn(i.target) === n && (e.ok || (k(), o({
					readPending: !1,
					error: !0
				})));
			}).catch(() => {
				s && r === S && (k(), o({
					readPending: !1,
					error: !0
				}));
			});
		}
	}
	function j() {
		if (!s || !u || !c || !i.target || i.denied || i.mode !== "edit" || d || i.status === "loading" || i.status === "fallback") return;
		let r = i.target, a = ++f, l = u, m = !0;
		w = void 0, ++C, o({
			status: "loading",
			synced: !1,
			error: !1,
			fallbackPending: !1,
			fallbackUnconfirmed: !1,
			recovery: e.drafts.get(r)?.text ?? i.recovery
		}), h = t(() => {
			s && a === f && !d && i.status === "loading" && (h = void 0, ++f, p = void 0, o({
				status: "fallback",
				error: !0,
				synced: !1
			}));
		}, e.editorTimeoutMs ?? 3e4), (p ??= Promise.resolve().then(e.load ?? (() => import("./editor-BhkBY3D5.js")))).then((t) => {
			if (s && a === f && u === l && i.mode === "edit") {
				h !== void 0 && n(h), h = void 0;
				try {
					let n = t.mountEditor(l, {
						target: r,
						label: e.label ?? "Document editor",
						name: e.name(c),
						color: e.color(c),
						onDenied() {
							s && a === f && !i.denied && M.checkAccess();
						},
						onText(e, t) {
							s && a === f && !i.denied && (t && (w = e), o({ text: e }));
						},
						onStatus(e) {
							s && a === f && !i.denied && o({
								status: e,
								synced: e === "connected" && i.synced
							});
						},
						onSync(t) {
							if (s && a === f && !i.denied && (o({ synced: t }), t && d && m)) {
								m = !1;
								let t = e.drafts.position(r);
								t?.selection && d.setSelection(t.selection), t && d.setScroll(t.scroll);
							}
						}
					});
					if (!s || a !== f) {
						n.destroy();
						return;
					}
					if (d = n, i.synced && m) {
						m = !1;
						let t = e.drafts.position(r);
						t?.selection && d.setSelection(t.selection), t && d.setScroll(t.scroll);
					}
					d.focus();
				} catch {
					s && a === f && o(d ? { error: !0 } : {
						status: "fallback",
						error: !0,
						synced: !1
					});
				}
			}
		}).catch(() => {
			s && a === f && (h !== void 0 && n(h), h = void 0, p = void 0, o({
				status: "fallback",
				error: !0,
				synced: !1
			}));
		});
	}
	let M = {
		state: a,
		authorized: () => !!(s && c && c.members.includes(c.me) && !e.drafts.denied(c.me, c.id)),
		checkAccess() {
			if (!s || !c || !i.target || i.checkingAccess) return;
			if (!d) {
				M.revoke();
				return;
			}
			D(), E(), ++C, m !== void 0 && n(m), m = void 0, _ !== void 0 && n(_), _ = void 0, k();
			let r = i.target, a = y, u = v, p = d;
			e.drafts.deny(r.account, r.roomId, u), p.pause(), o({
				denied: !0,
				checkingAccess: !0,
				text: "",
				recovery: e.drafts.get(r)?.text ?? null,
				orphaned: [],
				synced: !1,
				readPending: !1,
				error: !1
			});
			let h = () => s && a === y && d === p && i.target && dn(i.target) === dn(r) && c?.me === r.account && c.id === r.roomId, g = () => {
				h() && (D(), ++f, ++C, d = void 0, p.destroy(), w = void 0, o({
					checkingAccess: !1,
					denied: !0,
					text: "",
					mode: "preview",
					status: "idle",
					synced: !1
				}));
			};
			x = new AbortController();
			let S = x.signal;
			b = t(g, 3e4);
			let T = e.access ?? ((e, t) => ln((e, t) => fetch(e, {
				...t,
				cache: "no-store"
			})).access(e, t));
			Promise.resolve().then(() => h() ? T(r.roomId, S) : null).then(async (t) => {
				if (!h()) return;
				if (!t || t.state !== "member" || t.email !== r.account) {
					g();
					return;
				}
				let n = await e.request({
					t: "doc.get",
					epic: r.epicId ?? void 0
				});
				if (h()) {
					if (!n.ok || !e.drafts.prove(r.account, r.roomId, u)) g();
					else {
						D(), o({
							denied: !1,
							checkingAccess: !1,
							status: "connecting",
							text: p.text(),
							error: !1
						}), c && M.sync(c, l);
						try {
							p.resume(), p.focus();
						} catch {
							++f, ++C, d = void 0, e.drafts.deny(r.account, r.roomId, u), p.destroy(), o({
								denied: !0,
								checkingAccess: !1,
								text: "",
								mode: "preview",
								status: "idle"
							});
						}
					}
				}
			}).catch(g);
		},
		revoke(t = !0) {
			s && c && i.target && (O(), k(), t && e.drafts.deny(c.me, c.id, v), w = void 0, o({
				denied: !0,
				checkingAccess: !1,
				text: "",
				recovery: e.drafts.get(i.target)?.text ?? null,
				orphaned: [],
				mode: "preview",
				status: "idle",
				synced: !1,
				readPending: !1,
				error: !1,
				fallbackPending: !1,
				fallbackUnconfirmed: !1
			}));
		},
		roomDocument: () => i.roomDocument,
		target: () => i.target,
		invalidate(e) {
			c && T.delete(dn({
				account: c.me,
				roomId: c.id,
				epicId: e
			}));
		},
		sync(t, r, a = !1, u = !1, f = e.authorizationEpoch ?? 0) {
			if (!s) return;
			let p = !!c && c.me !== t.me, m = p || l !== r ? !1 : i.roomDocument, h = pn(t, r, m), g = !i.target || dn(h) !== dn(i.target);
			if (g && (O(), k()), p && (T.clear(), w = void 0), e.drafts.account(t.me), c = t, l = r, u && (f > v && i.checkingAccess && (O(), o({
				checkingAccess: !1,
				mode: "preview",
				status: "idle"
			})), e.drafts.authorize(t, f), v = Math.max(v, f)), !(i.checkingAccess && !g && t.members.includes(t.me))) {
				if (!t.members.includes(t.me) || e.drafts.denied(t.me, t.id)) g && (w = void 0, o({
					target: h,
					text: ""
				})), M.revoke(u && !t.members.includes(t.me));
				else {
					if (i.denied && o({ denied: !1 }), a && (T.clear(), k()), g) {
						w = void 0;
						let n = e.drafts.get(h);
						o({
							target: h,
							roomDocument: m,
							text: fn(t, h),
							recovery: n?.text ?? null,
							status: "idle",
							synced: !1,
							error: !1,
							fallbackPending: !1,
							readPending: !1,
							fallbackUnconfirmed: !1
						});
					} else !d && !i.fallbackPending && o({ text: fn(t, h) });
					(w !== void 0 && w === fn(t, h) || w === void 0 && e.drafts.get(h)?.text === fn(t, h)) && (e.drafts.delete(h), w = void 0, ++C, _ !== void 0 && n(_), _ = void 0, o({
						fallbackPending: !1,
						fallbackUnconfirmed: !1,
						recovery: null
					})), o({ orphaned: e.drafts.orphans(t) }), (!h.epicId || Object.hasOwn(t.docs ?? {}, h.epicId)) && (k(), i.readPending && o({ readPending: !1 }), i.status !== "fallback" && i.error && o({ error: !1 })), A(), j();
				}
			}
		},
		attach(e) {
			if (s) return u = e, j(), () => {
				s && u === e && (O(), u = void 0, o({
					status: "idle",
					synced: !1
				}));
			};
		},
		mode(t) {
			if (s && i.mode !== t && (t !== "edit" || M.authorized())) {
				t === "preview" && O(), o({
					mode: t,
					status: "idle",
					synced: !1,
					recovery: i.target ? e.drafts.get(i.target)?.text ?? i.recovery : i.recovery
				});
				try {
					e.writeMode?.(t);
				} catch {}
				e.onMode?.(t), t === "edit" && j();
			}
		},
		chooseRoom(e) {
			M.authorized() && c && (o({ roomDocument: e }), M.sync(c, l));
		},
		ownsOrphan(t) {
			if (!s || !c || t.account !== c.me || t.roomId !== c.id || c.epics.some((e) => e.id === t.epicId)) return !1;
			let n = e.drafts.get({
				account: t.account,
				roomId: t.roomId,
				epicId: t.epicId
			});
			return n?.revision === t.revision && n.text === t.text;
		},
		discardOrphan(t) {
			c && M.ownsOrphan(t) && (e.drafts.delete({
				account: t.account,
				roomId: t.roomId,
				epicId: t.epicId
			}), o({ orphaned: e.drafts.orphans(c) }));
		},
		input(r) {
			if (!s || i.status !== "fallback" || !i.target || !c || !M.authorized()) return;
			let a = i.target, l = f, d = ++C;
			w = r, o({
				text: r,
				fallbackPending: !0,
				fallbackUnconfirmed: !1
			}), _ !== void 0 && n(_), _ = void 0, e.drafts.set(a, {
				text: r,
				scroll: u?.scrollTop ?? 0
			}), m !== void 0 && n(m), m = t(() => {
				if (m = void 0, !s || l !== f || d !== C || !c || !i.target || dn(a) !== dn(i.target) || c.me !== a.account || c.id !== a.roomId || a.epicId && !c.epics.some((e) => e.id === a.epicId)) return;
				let n = () => s && l === f && d === C && i.target && dn(a) === dn(i.target) && i.fallbackPending;
				e.request({
					t: "doc",
					text: r,
					epic: a.epicId ?? void 0
				}).then((t) => {
					if (n()) {
						if (!t.ok) o({
							error: !0,
							fallbackUnconfirmed: !0
						});
						else return e.request({
							t: "doc.get",
							epic: a.epicId ?? void 0
						}).then((e) => {
							n() && !e.ok && o({
								error: !0,
								fallbackUnconfirmed: !0
							});
						});
					}
				}).catch(() => {
					n() && o({
						error: !0,
						fallbackUnconfirmed: !0
					});
				}), o({ fallbackPending: !0 }), _ = t(() => {
					s && l === f && d === C && (_ = void 0, i.fallbackPending && o({
						fallbackUnconfirmed: !0,
						error: !0
					}));
				}, 3e4);
			}, 400);
		},
		recoveryToken() {
			if (!s || !i.target || i.recovery === null) return null;
			let t = e.drafts.get(i.target);
			return t && t.text === i.recovery ? {
				key: dn(i.target),
				revision: t.revision
			} : null;
		},
		recoveryText(t) {
			if (!s || !t || !i.target || i.recovery === null || dn(i.target) !== t.key) return null;
			let n = e.drafts.get(i.target);
			return n?.revision === t.revision && n.text === i.recovery ? n.text : null;
		},
		restore(e) {
			let t = M.recoveryText(e);
			s && t !== null && i.target && M.authorized() && (!d || i.synced) && (o({ recovery: null }), w = t, d ? d.replace(t) : i.status === "fallback" ? M.input(t) : o({ recovery: t }));
		},
		dismissRecovery(t) {
			s && i.target && M.recoveryText(t) !== null && (e.drafts.delete(i.target), o({ recovery: null }));
		},
		retry() {
			M.authorized() && c && (i.target && T.delete(dn(i.target)), A(), i.status === "fallback" && (O(), o({
				status: "idle",
				error: !1
			}), j()));
		},
		focus() {
			d?.focus();
		},
		dispose() {
			s && (O(), k(), s = !1, c = void 0, u = void 0, p = void 0, T.clear(), w = void 0, i = {
				...i,
				target: null,
				text: "",
				recovery: null,
				orphaned: []
			}, a.set(i));
		}
	};
	return M;
}
// svelte/features/apps/pin.ts
function Ui(e, t = We) {
	let n = K({
		phase: "idle",
		ref: ""
	}), r = Ge(t), i = !0, a = null, o = null, s = null;
	function c() {
		s !== null && t.cancel(s), s = null, r.cancel(), o = null, n.set({
			phase: "idle",
			ref: ""
		});
	}
	function l() {
		i && e() && a && o && (a.pins || []).some((e) => e.kind === "app" && e.ref === o?.ref) === o.desired && c();
	}
	return {
		state: n,
		sync(e) {
			i && (a = e, l());
		},
		toggle(c, u) {
			if (!i || !e() || !a || o) return;
			let d = a.pins?.find((e) => e.kind === "app" && e.ref === c), f = {
				ref: c,
				desired: !d,
				ack: !1
			};
			o = f, n.set({
				phase: "pending",
				ref: c
			}), r.run(() => u(d ? {
				t: "pin.del",
				id: d.id
			} : {
				t: "pin.add",
				kind: "app",
				ref: c
			}), (r) => {
				i && e() && o === f && (l(), o === f && (r.ok ? (f.ack = !0, n.set({
					phase: "waiting",
					ref: c
				}), s = t.schedule(() => {
					i && e() && o === f && n.set({
						phase: "unconfirmed",
						ref: c
					});
				}, 1e4)) : n.set({
					phase: "unconfirmed",
					ref: c
				})));
			}, () => {
				i && e() && o === f && (l(), o === f && n.set({
					phase: "unconfirmed",
					ref: c
				}));
			});
		},
		review() {
			i && e() && c();
		},
		dispose() {
			i && (i = !1, c(), r.dispose(), a = null);
		}
	};
}
// svelte/features/apps/session.ts
function Wi(e, t, n = We) {
	let r = K({
		room: null,
		denied: !1,
		connections: null,
		loading: !1,
		error: "",
		form: !1,
		url: "",
		scope: "me",
		pending: !1,
		unconfirmed: !1,
		target: null,
		frameRevision: 0,
		more: /* @__PURE__ */ new Set()
	}), i = Ge(n), a = Ge(n), o = Ge(n), s = !0, c = !1, l = !1, u = 0, d = () => {
		let e = X(r).room;
		return s && t.current() && !!e?.members.includes(e.me);
	}, f = Ui(d, n);
	function p() {
		s && !c && (c = !0, f.dispose(), u++, i.cancel(), a.cancel(), o.cancel(), r.set({
			...X(r),
			room: null,
			denied: !0,
			connections: null,
			target: null,
			url: "",
			form: !1,
			pending: !1,
			unconfirmed: !1,
			loading: !1,
			error: ""
		}), t.denied?.());
	}
	function m() {
		if (!d()) return;
		i.cancel();
		let n = u;
		r.update((e) => ({
			...e,
			loading: !0,
			error: ""
		})), i.run((t) => e.list(t), (e) => {
			d() && n === u && (r.update((t) => ({
				...t,
				loading: !1,
				connections: e.connections,
				error: ""
			})), t.changed?.());
		}, (e) => {
			e instanceof hn && e.accessDenied ? p() : d() && n === u && r.update((t) => ({
				...t,
				loading: !1,
				error: e instanceof Error ? e.message : "Connection read failed"
			}));
		});
	}
	function h(e, t) {
		if (!d() || X(r).pending || X(r).unconfirmed) return;
		let n = u;
		r.update((e) => ({
			...e,
			pending: !0,
			error: ""
		})), a.run(e, (e) => {
			d() && n === u && (r.update((e) => ({
				...e,
				pending: !1,
				error: ""
			})), t?.(e), m());
		}, (e) => {
			if (!d() || n !== u) return;
			if (e instanceof hn && e.accessDenied) {
				p();
				return;
			}
			let t = !(e instanceof hn) || e.status >= 500;
			r.update((n) => ({
				...n,
				pending: !1,
				unconfirmed: t,
				error: e instanceof Error ? e.message : "Connection change failed"
			}));
		});
	}
	return {
		state: r,
		current: d,
		revoke: p,
		pin: f,
		ownsTarget: (e, t) => d() && X(r).target === e && X(r).frameRevision === t,
		loadFiles(e, t = !1) {
			if (!d() || X(r).room?.filesAll || l && !t) return;
			o.cancel(), l = !0;
			let n = u;
			o.run(() => e({ t: "files.get" }), (e) => {
				d() && n === u && (e.ok && X(r).room?.filesAll || r.update((t) => ({
					...t,
					error: e.ok ? "Room app files are unconfirmed. Refresh to check again." : e.error
				})));
			}, () => {
				d() && n === u && r.update((e) => ({
					...e,
					error: "Room app files are unconfirmed. Refresh to check again."
				}));
			});
		},
		connectionCount: () => X(r).connections?.length || 0,
		sync(e, t = !1) {
			if (!s || c) return;
			t && (l = !1);
			let n = X(r).room;
			if (n && (n.id !== e.id || n.me !== e.me)) throw Error("Apps session cannot change account/room");
			e.members.includes(e.me) ? (r.update((t) => ({
				...t,
				room: e
			})), f.sync(e)) : p();
		},
		load: m,
		form(e) {
			d() && r.update((t) => ({
				...t,
				form: e
			}));
		},
		draft(e, t) {
			d() && r.update((n) => ({
				...n,
				url: e,
				scope: t
			}));
		},
		connect() {
			let n = X(r);
			h((t) => e.create(n.url.trim(), n.scope, t), (e) => {
				let n = X(r).room;
				e.connection?.needs_sign_in && n ? t.navigate(Cn(n.id, e.connection.id)) : r.update((e) => ({
					...e,
					form: !1,
					url: ""
				}));
			});
		},
		refresh: (t) => h((n) => e.refresh(t, n)),
		remove: (t) => {
			X(r).connections?.some((e) => e.id === t && e.mine) && h((n) => e.remove(t, n), () => {
				r.update((e) => ({
					...e,
					target: e.target?.connection === t ? null : e.target
				}));
			});
		},
		signout: (t) => h((n) => e.signout(t, n), () => {
			r.update((e) => ({
				...e,
				target: e.target?.connection === t ? null : e.target
			}));
		}),
		review() {
			d() && (r.update((e) => ({
				...e,
				unconfirmed: !1,
				error: ""
			})), m());
		},
		open(e) {
			if (!d()) return;
			let t = X(r);
			if (!t.room) return;
			let n = t.connections && wn(t.room, t.connections, e);
			r.update((t) => ({
				...t,
				target: { ...e },
				frameRevision: t.frameRevision + 1
			})), n || m();
		},
		back() {
			d() && r.update((e) => ({
				...e,
				target: null,
				frameRevision: e.frameRevision + 1
			}));
		},
		reload() {
			d() && r.update((e) => ({
				...e,
				frameRevision: e.frameRevision + 1
			}));
		},
		more(e) {
			d() && r.update((t) => {
				let n = new Set(t.more);
				return n.has(e) ? n.delete(e) : n.add(e), {
					...t,
					more: n
				};
			});
		},
		dispose() {
			s && (s = !1, f.dispose(), u++, i.dispose(), a.dispose(), o.dispose(), r.set({
				room: null,
				denied: !1,
				connections: null,
				loading: !1,
				error: "",
				form: !1,
				url: "",
				scope: "me",
				pending: !1,
				unconfirmed: !1,
				target: null,
				frameRevision: 0,
				more: /* @__PURE__ */ new Set()
			}));
		}
	};
}
// svelte/features/apps/authority.ts
function Gi(e) {
	let t = !0, n = !1, r = /* @__PURE__ */ new Set();
	return {
		denied: () => n,
		current: () => t && !n && e(),
		deny() {
			if (t && !n) {
				n = !0;
				for (let e of [...r]) e();
			}
		},
		listen(e) {
			return !t || n ? (e(), () => {}) : (r.add(e), () => {
				r.delete(e);
			});
		},
		dispose() {
			if (t) {
				t = !1;
				for (let e of [...r]) e();
				r.clear();
			}
		}
	};
}
function Ki(e, t) {
	throw t instanceof hn && t.accessDenied && e.deny(), t;
}
function qi(e, t) {
	throw t instanceof hn && t.sessionDenied && e.deny(), t;
}
// svelte/features/apps/embed.ts
function Ji(e) {
	let t = e.room(), n = e.authority;
	if (!t || !n) return () => {};
	let r = t, i = n, a = r.id, o = r.me, s = e.frame, c = vn(), l = e.api ?? _n(a), u = e.metrics ?? mn(), d = !0, f = null, p = () => {
		let t = e.room();
		return d && i.current() && e.current() && s.isConnected && t?.id === a && t.me === o && t.members.includes(o) && [...t.files || [], ...t.messages.flatMap((e) => e.files || [])].some((t) => t.embed === !0 && t.id === e.file.id && t.name === e.file.name && t.type === e.file.type && t.ts === e.file.ts && t.size === e.file.size && t.author === e.file.author);
	}, m = () => p() && !!f?.active(), h = i.listen(() => {
		c.dispose(), f?.dispose(), e.controls.deny?.(), e.controls.cancel?.();
	}), g = (e) => Ki(i, e);
	async function _() {
		let t = await c.run(() => import("./bridge-CXSDYFF5.js"));
		if (!p()) return;
		let n = En({
			room: e.room,
			current: m,
			request: async (t) => {
				let n = await gn(p, () => f, () => e.request(t));
				return n.ok ? n.value : {
					ok: !1,
					error: "disconnected"
				};
			},
			name: e.name,
			ask: e.controls.ask,
			connections: async () => {
				let e = await c.run((e) => l.list(e)).catch(g);
				return p() ? e.connections : [];
			},
			call: async (e, n, r) => {
				let i = await gn(p, () => f, () => c.run((t) => l.call(e, n, r, t)).catch(g));
				if (!i.ok || !m()) throw Error("App is no longer active");
				return t.remoteToolResult(i.value.result);
			},
			metric: (e, t) => c.run((n) => u(e, a, t, n)).catch((e) => qi(i, e)),
			t: e.t
		});
		f = t.createNativeAppBridge({
			frame: s,
			current: p,
			revoked: () => {
				p() && (c.dispose(), e.controls.cancel?.(), e.controls.revoked?.(), e.controls.fail?.());
			},
			tools: Tn,
			call: n,
			message: (t) => n("vibebook_post", {
				text: t,
				thread: e.controls.thread
			}),
			ask: e.controls.ask,
			resize: e.controls.resize,
			embed: !0,
			open: e.open,
			t: e.t,
			context: () => {
				let t = e.room() || r, n = s.getBoundingClientRect();
				return {
					theme: document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
					displayMode: "inline",
					availableDisplayModes: ["inline"],
					containerDimensions: {
						maxHeight: 420,
						width: Math.round(n.width)
					},
					locale: e.locale,
					timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					platform: matchMedia("(max-width: 900px)").matches ? "mobile" : "web",
					user: {
						email: o,
						name: e.name(o)
					},
					room: {
						id: a,
						title: t.book.title
					}
				};
			}
		}), await f.ready, p() && (f.loadFile(`/api/books/${encodeURIComponent(a)}/files/${encodeURIComponent(e.file.id)}`), e.controls.ready());
	}
	return _().catch(() => {
		p() && e.controls.fail?.();
	}), () => {
		d = !1, h(), c.dispose(), f?.dispose(), e.controls.cancel?.();
	};
}
var Yi = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif",
	"application/pdf",
	"text/html",
	"text/markdown",
	"text/plain",
	"text/csv",
	"audio/mp4",
	"audio/x-m4a",
	"audio/m4a",
	"audio/mpeg",
	"audio/mp3",
	"audio/wav",
	"audio/x-wav",
	"audio/wave",
	"audio/aac",
	"audio/x-aac",
	"audio/ogg",
	"audio/webm",
	"audio/flac",
	"audio/x-flac"
], Xi = 10485760, Zi = 52428800, Qi = (e) => e.startsWith("audio/") ? Zi : Xi, $i = {
	m4a: "audio/x-m4a",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	aac: "audio/aac",
	ogg: "audio/ogg",
	oga: "audio/ogg",
	opus: "audio/ogg",
	webm: "audio/webm",
	flac: "audio/flac"
}, ea = new Set(Yi), ta = "image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac", na = (e) => e.split(";")[0].trim().toLowerCase();
function ra(e, t = Date.now()) {
	let n = e, r = (/\.(\w+)$/.exec(n.name)?.[1] || "").toLowerCase(), i = na(n.type);
	!i && /\.html?$/i.test(n.name) && (i = "text/html"), !i && r === "md" && (i = "text/markdown"), r === "txt" && (i = "text/plain"), r === "csv" && (i = "text/csv"), $i[r] && !i.startsWith("audio/") && (i = $i[r]);
	let a = !n.name || n.name === "image.png" ? `print-${new Date(t).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png` : n.name;
	return (i !== n.type || a !== n.name) && (n = new File([n.slice()], a, { type: i })), n;
}
var ia = (e) => ea.has(na(e.type)) ? e.size > Qi(na(e.type)) ? "size" : e.size === 0 ? "empty" : null : "type", aa = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, "");
function oa(e, t, n, r = {}, i = []) {
	let a = e.slice(0, t), o = /(^|\s)@([\p{L}\p{N}._-]*)$/u.exec(a);
	if (!o) return null;
	let s = aa(o[2]), c = n.members.filter((e) => e !== n.me).map((e) => {
		let t = e.split("@")[0], i = n.names?.[e] || r[e] || t, a = aa((n.names?.[e] || r[e] || "").split(/\s+/)[0]) || aa(t.split(/[._+-]/)[0]) || aa(t);
		return {
			email: e,
			handle: a,
			label: i === a ? e : i
		};
	});
	for (let e of i) e.email === n.me && typeof e.name == "string" && e.name.trim() && c.push({
		email: e.email,
		handle: e.name,
		label: "seu agent no sandbox"
	});
	return {
		start: a.length - o[2].length - 1,
		items: c.filter((e) => !s || e.handle.startsWith(s) || aa(e.label).includes(s)).slice(0, 8)
	};
}
function sa(e, t, n, r) {
	return {
		text: e.slice(0, t) + r + e.slice(n),
		caret: t + r.length
	};
}
function ca(e) {
	let t = e.trim().toLowerCase().replace(/:/g, "");
	return [...new Map(Object.entries(Gt).map(([e, t]) => [t, e])).entries()].filter(([e]) => !t || Object.entries(Gt).some(([n, r]) => r === e && n.includes(t))).map(([e, t]) => ({
		emoji: e,
		name: t
	}));
}
var la = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? "votação" : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120);
function ua(e, t, n) {
	let r = n.fileIds.slice().sort().join(",");
	return e.messages.find((i) => i.id > n.baseline && i.author === e.me && i.kind !== "agent" && i.thread === t && i.text === n.text && (i.reply_to || void 0) === n.replyId && (i.files || []).map((e) => e.id).sort().join(",") === r);
}
var da = (e) => [e.messages, e.origins || []].reduce((e, t) => t.reduce((e, t) => Math.max(e, t.id), e), 0);
function fa(e, t) {
	return e === "timeout" ? t("O upload não foi confirmado. Confira os arquivos antes de tentar novamente.") : e === "account-changed" ? t("A conta mudou; selecione o arquivo novamente.") : e === "forbidden" ? t("Você não tem acesso a esta sala.") : e === "offline" ? t("Sem conexão. Seu rascunho foi mantido.") : e === "text-limit" ? t("A mensagem pode ter no máximo 4000 caracteres.") : e === "attachments-limit" ? t("Anexe no máximo 10 arquivos por mensagem.") : e === "attachments-pending" ? t("Espere os anexos terminarem ou remova-os.") : e === "reply-missing" ? t("A mensagem não está mais disponível. Cancele a resposta para continuar.") : e === "draft-limit" ? t("Envie ou descarte um dos seus 64 rascunhos antes de abrir outro.") : e === "unknown thread" ? t("O tópico não está mais disponível. Seu rascunho foi mantido.") : e.startsWith("blocked:") ? t("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: e.slice(8).trim() }) : e.startsWith("file-type:") ? `${e.slice(11).trim()}: ${t("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}` : e.startsWith("file-size:") ? `${e.slice(10).trim()}: ${t("Arquivo maior que o limite: 10MB, ou 50MB para áudio.")}` : e.startsWith("file-empty:") ? `${e.slice(11).trim()}: ${t("Arquivo vazio.")}` : e;
}
// svelte/features/room-scope/model.ts
function pa(e) {
	return [...e.messages, ...(e.origins ?? []).filter((t) => !e.messages.some((e) => e.id === t.id))];
}
function ma(e, t, n) {
	return n === "ai" ? "@vibe" : e.names?.[n] || (t?.email === n ? t.name : t?.friends.find((e) => e.email === n)?.name) || n.split("@")[0];
}
function ha(e, t, n) {
	let r = e.avatars?.[n] ?? (t?.email === n ? t.avatar : t?.friends.find((e) => e.email === n)?.avatar);
	return r ? `/api/avatar/${encodeURIComponent(n)}?v=${r}` : void 0;
}
function ga(e, t, n) {
	let r = aa(n);
	return r === "vibe" || r === "ai" ? "ai" : e.members.find((n) => {
		let i = n.split("@")[0];
		return [
			aa((e.names?.[n] || (t?.email === n ? t.name : t?.friends.find((e) => e.email === n)?.name) || "").split(/\s+/)[0] || ""),
			aa(i.split(/[._+-]/)[0]),
			aa(i)
		].filter(Boolean).includes(r);
	}) ?? null;
}
// svelte/features/room-scope/controller.ts
function _a(e) {
	let { services: t, resources: n, browser: r, layout: i } = e, a = t.roomScope();
	if (!a) throw Error("RoomScope requires an authorized room snapshot");
	let o = a, s = K(null), c = !0, l = !1, u = !1, d = !1, f = !1, p = () => c && t.active() && t.ownsRoom(o), m = () => p() ? t.rootRoom.read() : null, h = () => m()?.room ?? null, g = Ht(o, () => {
		let e = t.roomScope(), n = h();
		return p() && e && n ? {
			scope: e,
			room: n
		} : null;
	}, p), _ = () => m()?.thread ?? "main", v = (e) => p() && _() === e, y = () => Promise.resolve({
		ok: !1,
		error: "disconnected"
	}), b = (e) => p() ? t.rootRoom.request(e) : y(), x = (e) => p() && t.rootRoom.send(e), S = t.t, C = t.language, w = t.locale, T = () => t.personal.peek(), E = (e) => {
		let t = h();
		return t ? ma(t, T(), e) : e.split("@")[0];
	}, D = (e) => {
		let t = Math.round((Date.now() - e) / 6e4);
		return t < 1 ? S("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
	}, O = yi(o.roomId, !1, r.storage), k = Di(o.roomId), A = Jr(o.roomId, r.clock), j = Bi(o.account, o.roomId, r.clock), M = zt(o.roomId, o.account, p, b), N = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Set(), F = [], I = (e) => {
		c ? F.push(e) : e();
	}, L = null, R = () => {}, z = null, B = null, V = null, H = null, ee = 0, U = "", te = null, W = 0, ne = null, G = t.rootRoom.read(), re = G.thread, q = -1, ie = null, ae = !1, oe = () => {}, J = r.clock, Y = zr({
		current: p,
		send: x,
		render: (e) => ze(e),
		selectThread: (e) => {
			p() && t.actions.selectThread(e);
		},
		notice: (e) => Te(S(e === "searching" ? "Buscando a mensagem…" : e === "missing" ? "Não achei essa mensagem nesta sala." : "sem conexão"), e === "searching" ? 1500 : 7e3),
		schedule: J?.schedule,
		cancel: J?.cancel
	}), Z = Vr(Y), Q = Gr({
		current: p,
		read: () => {
			let e = h();
			return e ? {
				room: e,
				thread: _(),
				waits: T()?.waits ?? []
			} : null;
		},
		storage: r.storage,
		clock: J ? {
			...J,
			now: () => Date.now()
		} : void 0,
		resolve: (e, n, r) => t.personal.api.resolve(e, n, r),
		navigate: (e, t) => De(e, t),
		changed: () => {
			p() && ze(Y.pinned() ? void 0 : "stay");
		},
		denied: () => {
			p() && t.actions.sessionLost();
		},
		resolved: () => {
			p() && (t.personal.invalidate(), p() && t.personal.refresh());
		}
	}), ce = ti(r.fetcher), $ = async (e) => {
		try {
			return await e;
		} catch (e) {
			throw p() && e instanceof Qr && e.status === 401 && t.actions.sessionLost(), e;
		}
	}, le = ci({
		href: r.href,
		state: r.historyState,
		history: r.history,
		clock: J,
		enqueue: r.enqueue,
		api: {
			probe: (e, t) => $(ce.probe(e, t)),
			text: (e, t) => $(ce.text(e, t))
		}
	}), ue = Hi({
		drafts: n.documents,
		authorizationEpoch: o.roomGeneration,
		request: b,
		schedule: J?.schedule,
		cancel: J?.cancel,
		name: (e) => ma(e, T(), e.me),
		color: (e) => r.awarenessColor(e.me),
		label: C === "en" ? "Document editor" : "Editor do documento",
		readMode: () => r.storage?.getItem("vb.docView") ?? null,
		writeMode: (e) => {
			try {
				r.storage?.setItem("vb.docView", e);
			} catch {}
		}
	}), de = t.appsAuthority();
	if (!de) throw ue.dispose(), le.dispose(), Y.dispose(), A.dispose(), Oi(k), j.dispose(), M.dispose(), Error("Room app authority unavailable");
	let fe = de, pe = _n(o.roomId, r.fetcher), me = mn(r.fetcher), he = vn(J), ge = async (e) => {
		try {
			return await e;
		} catch (e) {
			throw p() && e instanceof hn && e.sessionDenied && t.actions.sessionLost(), e;
		}
	}, _e = {
		list: (e) => ge(pe.list(e)),
		create: (e, t, n) => ge(pe.create(e, t, n)),
		remove: (e, t) => ge(pe.remove(e, t)),
		refresh: (e, t) => ge(pe.refresh(e, t)),
		signout: (e, t) => ge(pe.signout(e, t)),
		ui: (e, t, n) => ge(pe.ui(e, t, n)),
		call: (e, t, n, r) => ge(pe.call(e, t, n, r)),
		context: (e, t, n, r) => ge(pe.context(e, t, n, r))
	}, ye = Wi(_e, {
		current: () => p() && fe.current(),
		navigate: (e) => {
			p() && t.actions.navigate(e);
		},
		changed: () => ze("stay"),
		denied: () => fe.deny()
	}, J);
	I(fe.listen(() => {
		ye.revoke(), ze("stay");
	}));
	let be = i.setViewerGate({ deferNavigation: (e) => le.deferNavigation(() => {
		p() && e();
	}) }), xe = () => {}, Se = async (e, n) => {
		if (!p() || n.aborted) throw Error("cancelled");
		let i = _(), a = new AbortController(), s = () => a.abort();
		n.addEventListener("abort", s, { once: !0 }), N.add(a);
		try {
			let n = await ve(o.roomId, async (e, n) => {
				let i = await r.fetcher(e, {
					...n,
					signal: a.signal
				});
				return p() && i.status === 401 && t.actions.sessionLost(), i;
			}).uploadFile(e);
			if (!v(i) || a.signal.aborted) throw Error("cancelled");
			return n;
		} finally {
			N.delete(a), n.removeEventListener("abort", s);
		}
	};
	function Ce(e) {
		let n = _(), r = t.router.generation(), a = () => {
			v(n) && r === t.router.generation() && e();
		};
		return le.deferNavigation(() => {
			p() && !i.deferNavigation(a) && a();
		}) ? !0 : i.deferNavigation(a);
	}
	function we() {
		te !== null && (J ? J.cancel(te) : clearTimeout(te), te = null);
	}
	function Te(e, t = 7e3) {
		we();
		let n = ++W;
		U = e, ze("stay");
		let r = () => {
			p() && n === W && (te = null, U = "", ze("stay"));
		};
		te = J ? J.schedule(r, t) : setTimeout(r, t);
	}
	function Ee(e) {
		if (!p() || Ce(() => Ee(e))) return;
		let n = h();
		if (e !== "main" && !it(n, e) && !n.epics.some((t) => t.id === e)) return;
		let r = i.takeSheetEntry();
		t.actions.selectThread(e, { replace: r });
	}
	function De(e, n) {
		if (!p() || !Number.isSafeInteger(e) || e <= 0 || Ce(() => De(e, n))) return;
		let r = h(), a = pa(r).find((t) => t.id === e);
		(!a || Jt(r, a)) && t.actions.navigate({
			roomId: o.roomId,
			thread: a?.thread ?? n ?? _(),
			messageId: e
		}, i.takeSheetEntry());
	}
	function Oe(e, t, n) {
		return !p() || typeof e != "string" && !an(h()).some((t) => cn(t, e)) || typeof e == "string" && !/^[0-9a-f]+$/.test(e) ? !1 : le.open(typeof e == "string" ? {
			roomId: o.roomId,
			id: e,
			label: n
		} : {
			roomId: o.roomId,
			id: e.id,
			metadata: e
		}, t);
	}
	function ke(e) {
		if (!p() || Ce(() => ke(e))) return;
		let t = e.id ?? _();
		t !== "main" && !h().epics.some((e) => e.id === t) ? Te(S("Esse épico não existe mais nesta sala.")) : (t !== _() && Ee(t), e.kind === "document" && p() && Pe("doc", { open: !0 }));
	}
	let Ae = {
		navigate: De,
		openFile: Oe,
		navigateRich: ke,
		openFileReference: (e) => {
			p() && e.roomId === o.roomId && Oe(e.id, void 0, e.name);
		},
		ensureFileIndex: () => {
			p() && M.load();
		}
	};
	function je(e) {
		p() && /^(room|[a-f0-9]{12})$/.test(e.connection) && /^[\w.-]{1,100}$/.test(e.tool) && !Ce(() => je(e)) && (Pe("apps", { open: !0 }), p() && ye.open(e));
	}
	function Me(e) {
		p() && xn(e) && !Ce(() => Me(e)) && (e.tool === void 0 ? (ae = !0, ye.back(), Pe("apps", { open: !0 }), p() && ye.load()) : je({
			connection: e.connection,
			tool: e.tool
		}));
	}
	function Ne() {
		p() && !Ce(Ne) && t.actions.retryRoom();
	}
	function Pe(e, t) {
		p() && !Ce(() => Pe(e, t)) && i.setPane(e, t);
	}
	function Fe(e, t) {
		if (!p() || Ce(() => Fe(e, t))) return;
		let r = h(), i = pa(r).find((t) => t.id === e);
		i && Jt(r, i) && (!t || i.thread === t.thread && On(r, i) && kn(i.choices) && !kn(i.choices)?.closed && !Yt(i)) && (i.thread !== _() && Ee(i.thread), v(i.thread) && n.composer.entry({
			account: o.account,
			roomId: o.roomId,
			thread: i.thread
		}).reply(i, t?.text));
	}
	function Ie() {
		let e = t.syncAgents();
		if (e === L) return;
		R(), L = e;
		let n = L?.state.subscribe(() => {
			l || ze("stay");
		}) ?? (() => {});
		c && L === e ? R = n : n();
	}
	function Le() {
		p() && (ae || (ae = !0, ye.load()), h()?.filesAll || ye.loadFiles(b));
	}
	function Re(e) {
		if (!p() || !e.room) He();
		else {
			l = !0;
			try {
				let r = e.room, a = q !== e.snapshotGeneration;
				ie = j.suggestionIntent();
				let s = Y.sync(r, e.thread, e.generation, e.phase === "live", a);
				if (s && Z.reset(), H?.connected() && Y.attach(H), s && re !== e.thread) {
					for (let e of N) e.abort();
					ue.chooseRoom(!1);
				}
				let c = a || r.members !== G.room?.members;
				if (c && n.documents.authorize(r, e.generation), ue.sync(r, e.thread, a, c, e.generation), A.sync(r, a), Pi(k, r), a && (k.filesRequested = !1), e.phase === "live" && Ri(k, r, x), Si(O, r, e.thread, X(O.state).archived), j.sync(r, b), le.sync(r, b, a), M.sync(r, a), ye.sync({
					...r,
					messages: pa(r)
				}, a), i.read().pane === "files" && a && A.load(b), i.read().pane === "apps" && Le(), Ie(), n.composer.entry({
					account: o.account,
					roomId: o.roomId,
					thread: e.thread
				}).sync(r, b, Se), re = e.thread, q = e.snapshotGeneration, G = e, s && e.thread !== "main" && !e.thread.startsWith("pre:") && !i.read().documentVisible && !i.read().boardFull) {
					let t = r.epics.find((t) => t.id === e.thread)?.tasks ?? [];
					(T()?.waits.some((t) => t.book_id === r.id && t.thread === e.thread && t.ref.startsWith("t")) || t.some((e) => !e.done && e.owner === r.me) || !r.messages.some((t) => t.thread === e.thread)) && i.toggleDocument();
				}
				if (s && (e.thread !== "main" || T()?.waits.some((t) => t.book_id === r.id && t.thread === e.thread))) {
					let n = e.thread, r = t.router.generation();
					Y.defer(() => {
						let e = V, i = h();
						if (!v(n) || r !== t.router.generation() || !e?.isConnected || !i) return;
						let a = n === "main" ? i.roomTasks ?? [] : i.epics.find((e) => e.id === n)?.tasks ?? [], o = new Set(T()?.waits.filter((e) => e.book_id === i.id && e.thread === n && e.ref.startsWith("t")).map((e) => e.ref.slice(1))), s = new Set(a.filter((e) => o.size ? o.has(e.id) : !e.done && e.owner === i.me).map((e) => e.id)), c = [...e.querySelectorAll("[data-task]")].filter((e) => s.has(e.dataset.task ?? ""));
						c[0]?.scrollIntoView({
							block: "center",
							behavior: "smooth"
						});
						for (let t of c) p() && t.isConnected && e.contains(t) && t.dispatchEvent(new CustomEvent("vb:task-highlight"));
					}, 400);
				}
				Y.ensureFilled();
			} finally {
				l = !1;
			}
			ze(Y.pinned() ? void 0 : "stay");
		}
	}
	function ze(e) {
		if (!l) {
			if (u) d = !0;
			else if (p()) {
				u = !0;
				try {
					do {
						d = !1;
						let a = m(), c = a?.room;
						if (!a || !c) break;
						let l = a.thread, u = () => v(l) && !f, g = T()?.waits ?? [], _ = X(i.state);
						e !== "stay" && e !== !0 && Y.followLatest(), Z.capture(e, !_.boardFull && !f);
						let M = ++ee, N = {
							t: S,
							name: E,
							ago: D,
							locale: w,
							pageUrl: r.href(),
							knownNames: {
								...Object.fromEntries(T()?.friends.filter((e) => e.name).map((e) => [e.email, e.name]) ?? []),
								...T()?.name ? { [c.me]: T().name } : {}
							},
							avatarUrl: (e) => ha(c, T(), e),
							hhmm: (e) => new Date(e).toLocaleTimeString(w, {
								hour: "2-digit",
								minute: "2-digit"
							}),
							dateTime: (e) => new Date(e).toLocaleString(w),
							waiting: (e) => g.some((t) => t.book_id === o.roomId && t.ref === `m${e}`),
							typingLabel: (e) => e === "route" ? S("escolhendo o modelo") : e === "fast" ? S("rápido") : e === "smart" ? S("com calma") : e,
							typingNote: (e) => a.typingNotes.get(e)
						}, F = (e) => u() ? b(e) : y(), I = (e) => u() && x(e), R = {
							room: c,
							thread: l,
							vb: {
								t: S,
								ago: D,
								name: E,
								locale: w
							},
							send: I,
							request: F,
							waits: g,
							onopen: Ee
						}, z = {
							...Ae,
							request: F,
							reply: (e) => {
								u() && Fe(e);
							},
							draftReply: (e) => {
								u() && Fe(e.messageId, e);
							},
							navigate: (e, t) => {
								u() && De(e, t);
							},
							openApp: (e) => {
								u() && je(e);
							},
							openFile: (e) => {
								u() && Oe(e);
							},
							openFileReference: (e) => {
								u() && Ae.openFileReference?.(e);
							},
							ensureFileIndex: () => {
								u() && Ae.ensureFileIndex?.();
							},
							mountEmbed: (e, t, n) => {
								if (!u() || !e.isConnected) return () => {};
								let i = Ji({
									frame: e,
									file: t,
									controls: n,
									authority: fe,
									room: () => u() ? {
										...h(),
										messages: pa(h())
									} : null,
									current: u,
									request: F,
									name: E,
									t: S,
									locale: w,
									open: r.openExternal,
									api: _e,
									metrics: (e, t, n, r) => ge(me(e, t, n, r))
								}), a = () => {
									P.delete(a), i();
								};
								return P.add(a), a;
							}
						}, V = c.epics.find((e) => e.id === l)?.from_msg, H = V ? pa(c).find((e) => e.id === V && Jt(c, e)) : null, te = Y.selection(), W = Xt(c, l), ne = L ? X(L.state) : null, G = Mn(c, Date.now()), K = ne?.data, re = An(K ? {
							...K,
							agents: K.agents.filter((e) => e.email === c.me),
							sandboxes: []
						} : null, c.me, Date.now()).around, q = G.some((e) => e.phase === "blocked"), ie = {
							board: [...c.epics.flatMap((e) => e.tasks), ...c.roomTasks ?? []].filter((e) => !e.done && e.owner === c.me).length,
							files: c.filesN ?? c.files?.length ?? 0,
							apps: ye.connectionCount() + bn(c).length,
							decisions: c.decisions?.length ?? 0,
							reminders: c.reminders?.some((e) => e.error) ? `${c.reminders.length} ⚠` : c.reminders?.length ?? 0,
							agents: G.length
						}, ae = {
							t: S,
							ago: D,
							name: E,
							avatarUrl: N.avatarUrl,
							epicBusy: (e) => {
								let t = Qe(c, e.id, Date.now())[0];
								return t ? S("{via} de {who}", {
									via: t.who,
									who: E(t.email)
								}) : null;
							},
							waitsIn: (e) => g.filter((t) => t.book_id === c.id && t.thread === e)
						}, oe = T()?.books.find((e) => e.id === c.id), J = oe?.icon ? `/api/books/${c.id}/icon?v=${oe.icon}` : void 0, se = it(c, l), ce = () => {
							p() && Pe("agents", { open: !0 });
						}, $ = {
							owner: ue,
							room: c,
							pane: _.pane,
							lang: C,
							counts: ie,
							agentState: q ? "blocked" : G.length ? "busy" : re ? "idle" : "",
							agentTitle: q ? S("Seu agent espera você no terminal") : G.length ? S("Fila do seu agent: {n}", { n: G.length }) : re ? S("Seu agent está livre") : "Agents",
							onPane: (e) => {
								p() && Pe(e);
							}
						}, de = {
							scope: {
								...o,
								navigationGeneration: t.router.generation()
							},
							chatRevision: M,
							notice: U,
							sidebar: {
								room: c,
								thread: l,
								collapsed: _.sidebarCollapsed && !_.mobile,
								roomIcon: J,
								roomTint: oe?.tint,
								locale: w,
								mutations: j,
								presence: K ?? void 0,
								vb: ae,
								navigation: O,
								pins: k,
								send: x,
								request: b,
								friends: T()?.friends.map((e) => e.email),
								appNavigation: {
									controller: t.navigation,
									lang: C
								},
								ontogglerail: () => {
									p() && i.toggleSidebar();
								},
								onrenameroom: () => {
									p() && t.navigation.askRename(c.id);
								},
								onopenside: () => {
									p() && i.openSheet("side");
								},
								onagents: ce,
								onopen: (e) => {
									p() && Ee(e);
								},
								onarchchange: (e) => {
									p() && (O.state.update((t) => ({
										...t,
										archived: e
									})), ze("stay"));
								},
								onopenpinfile: (e) => {
									p() && Oe(e);
								},
								onopenpinapp: (e) => je({
									connection: e.connectionId,
									tool: e.tool
								})
							},
							header: {
								room: c,
								thread: l,
								owner: j,
								vb: ae,
								roomIcon: J,
								roomTint: oe?.tint,
								onopenside: () => {
									p() && i.openSheet("side");
								},
								onrenameroom: () => {
									p() && t.navigation.askRename(c.id);
								}
							},
							chat: se ? null : {
								room: c,
								thread: l,
								...te,
								origin: H ?? null,
								replyCount: c.counts ? (c.counts[l] ?? 0) + W.filter((e) => e.id > (c.countsAt ?? 0)).length : W.length,
								vb: N,
								actions: z,
								needsYou: (() => {
									let e = Q.view();
									return e ? {
										view: e,
										owner: Q
									} : void 0;
								})(),
								onloadolder: () => {
									u() && Y.loadOlder();
								}
							},
							composer: se ? null : {
								room: c,
								thread: l,
								vb: N,
								drafts: n.composer,
								request: F,
								upload: Se,
								agents: K?.sandboxes ?? [],
								navigate: (e) => {
									u() && De(e, l);
								},
								hidden: _.boardFull || f
							},
							suggestion: se ? {
								room: c,
								index: Number(l.slice(4)),
								owner: j,
								vb: N
							} : null,
							document: {
								owner: ue,
								props: {
									room: c,
									thread: l,
									send: I,
									taskProps: R,
									actions: Ae,
									lang: C,
									pane: _.pane,
									onPane: Pe,
									onAuthorize: Ne
								}
							},
							toolbar: $,
							peek: {
								...$,
								compact: !0,
								onPane: (e) => {
									p() && Pe(e, {
										open: !0,
										toggle: !0
									});
								}
							},
							board: R,
							decisions: R,
							reminders: R,
							files: {
								...R,
								session: A,
								request: b,
								onfolderchange: () => {
									p() && B?.isConnected && (B.scrollTop = 0);
								},
								onopenfile: (e) => {
									p() && Oe(e);
								}
							},
							apps: {
								owner: ye,
								api: _e,
								room: {
									...c,
									messages: pa(c)
								},
								thread: l,
								request: b,
								current: () => p() && fe.current(),
								checkAccess: Ne,
								name: E,
								ago: D,
								t: S,
								lang: C,
								openLink: r.openExternal,
								metric: (e, t) => he.run((n) => ge(me(e, o.roomId, t, n)))
							},
							agents: L ? {
								owner: L,
								origin: r.origin,
								vb: {
									t: S,
									ago: D
								},
								name: E,
								onnavigate: De,
								lang: C
							} : null,
							banners: L ? {
								owner: L,
								origin: r.origin,
								name: E,
								onopen: ce,
								onnavigate: De,
								lang: C
							} : null,
							trigger: L ? {
								owner: L,
								onopen: ce,
								lang: C
							} : null,
							threadFiles: {
								room: c,
								thread: l,
								lang: C,
								onopen: (e, t) => {
									p() && t.isConnected && Oe(e, t);
								}
							},
							viewer: {
								controller: le,
								lang: C,
								iosStandalone: r.iosStandalone,
								actions: Ae
							}
						};
						s.set(de);
					} while (d && p());
				} finally {
					u = !1;
				}
			}
		}
	}
	function Be(e) {
		p() && e.scope.connection === o.connection && e.scope.roomGeneration === o.roomGeneration && e.scope.account === o.account && e.scope.navigationGeneration === t.router.generation() && (ue.chooseRoom(!1), e.unavailableThread && (Te(S("Esse épico não existe mais nesta sala.")), e.target.document) || (e.pane && Pe(e.pane), e.target.messageId ? ne = {
			id: e.target.messageId,
			thread: e.target.thread,
			navigation: e.scope.navigationGeneration
		} : e.target.fileId ? Oe(e.target.fileId) : e.target.document ? Pe("doc", { open: !0 }) : e.target.app && Me(e.target.app), ze("stay")));
	}
	function Ve(e) {
		if (!p()) return;
		let n = e.event, r = h();
		if (n.t === "older") Y.older(n);
		else if (n.t === "doc" && n.stale) ue.invalidate(n.epic);
		else if (n.t === "suggestions" && _().startsWith("pre:")) {
			let t = e.previous?.suggestions[Number(_().slice(4))];
			if (t) {
				let e = dr(t), n = r.suggestions.findIndex((t) => dr(t) === e);
				Ee(n >= 0 ? `pre:${n}` : ie?.identity === e && !ie.accept && r.suggestions.length ? `pre:${Math.min(ie.index, r.suggestions.length - 1)}` : "main");
			}
		} else n.t === "conns" ? ye.load() : n.t === "error" ? Te(n.error || S("falhou")) : n.t === "blocked" && Te(S("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: n.reason }));
		n.t === "msg" ? (t.pwa.notify(n.m, r, _(), (e) => ga(r, T(), e), (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? S("{via} de {who}", {
			via: e.via || "agent",
			who: E(e.author)
		}) : E(e.author)), ze(Y.pinned() || n.m.author === r.me && n.m.kind !== "agent" ? void 0 : "stay")) : ze(n.t === "older" || "stay");
	}
	function He() {
		if (c) {
			c = !1, g.dispose(), ne = null, W++, we(), U = "", oe(), be(), R();
			for (let e of F.splice(0)) e();
			for (let e of N) e.abort();
			N.clear();
			for (let e of [...P]) e();
			ue.dispose(), le.dispose(), Y.dispose(), Q.dispose(), A.dispose(), Oi(k), j.dispose(), M.dispose(), he.dispose(), ye.dispose(), xe(), z = B = V = null, H = null, s.set(null);
		}
	}
	I(t.rootRoom.state.subscribe((e) => Re(e))), I(t.personal.state.subscribe(() => {
		p() && (Ie(), ze("stay"));
	}));
	let Ue = i.read().pane, We = "";
	return I(i.state.subscribe((e) => {
		if (!p()) return;
		let n = [
			e.pane,
			e.sheet,
			e.boardFull,
			e.documentVisible,
			e.sidebarCollapsed,
			e.mobile,
			e.active
		].join("|");
		n !== We && (We = n, e.pane !== Ue && (Ue = e.pane, X(t.state).pane !== e.pane && t.actions.selectPane(e.pane), e.pane === "files" && A.load(b), e.pane === "apps" && Le(), Ie()), ze("stay"));
	})), I(t.state.subscribe((e) => {
		p() && e.pane !== i.read().pane && i.setPane(e.pane);
	})), I(r.listenVisibility(() => {
		p() && (Ie(), ze("stay"));
	})), p() && (xe = t.agents.claimAttachment()), oe = t.attachRoom(o, {
		beforeNavigation() {
			le.closeNavigation(), i.beforeNavigation();
		},
		reset: He,
		consumePop: () => li(le, p() ? {
			roomId: o.roomId,
			account: o.account,
			thread: _()
		} : null, () => i.consumePop(), r.href()),
		deferNavigation: (e) => Ce(e),
		onTarget: Be,
		onTransition: Ve,
		onTerminal: He
	}), {
		state: se(s),
		viewer: le,
		richFiles: g,
		current: p,
		setInboxVisible(e) {
			p() && f !== e && (f = e, ze("stay"));
		},
		attachChat(e) {
			if (!p() || !e.isConnected) return () => {};
			let t = Br(e);
			return z = e, H = t, Y.attach(t), ze(Y.pinned() ? void 0 : "stay"), () => {
				H === t && (z = null, H = null, Y.detachSurface(t));
			};
		},
		attachFiles(e) {
			return B = e, () => {
				B === e && (B = null);
			};
		},
		attachAttention(e) {
			return V = e, () => {
				V === e && (V = null);
			};
		},
		chatRendered(e) {
			if (!p() || e !== ee || !z?.isConnected || (H && Y.attach(H), !Z.rendered(!i.read().boardFull && !f))) return;
			let n = ne;
			n && n.navigation === t.router.generation() && (ne = null, Y.go(n.id, n.thread));
		},
		actions: {
			setPane: Pe,
			setThread: Ee,
			openFile: Oe,
			navigateMessage: De,
			loadOlder: () => {
				p() && Y.loadOlder();
			},
			retry: Ne,
			closeNavigation: () => {
				p() && le.closeNavigation();
			},
			closeDocument: () => {
				p() && ue.mode("preview");
			}
		},
		dispose: He
	};
}
// svelte/features/room-scope/browser.ts
function va(e, t) {
	let n = null;
	try {
		n = e.localStorage;
	} catch {}
	let r = e.matchMedia("(display-mode: standalone)").matches || Reflect.get(e.navigator, "standalone") === !0, i = /iP(hone|ad|od)/.test(e.navigator.userAgent) || /Mac/.test(e.navigator.userAgent) && e.navigator.maxTouchPoints > 1;
	return {
		origin: e.location.origin,
		href: () => e.location.href,
		historyState: () => e.history.state,
		history: e.history,
		storage: n,
		fetcher: e.fetch.bind(e),
		iosStandalone: r && i,
		visible: () => t.visibilityState === "visible",
		listenVisibility(e) {
			return t.addEventListener("visibilitychange", e), () => t.removeEventListener("visibilitychange", e);
		},
		openExternal: (t) => {
			e.open(t, "_blank", "noopener");
		},
		awarenessColor(n) {
			let r = [...n].reduce((e, t) => e + t.codePointAt(0), 0) % 5 + 1, i = e.getComputedStyle(t.documentElement);
			return gt(t, i.getPropertyValue(`--vb-chart-${r}`).trim() || i.getPropertyValue("--vb-primary").trim());
		},
		clock: {
			schedule: (t, n) => e.setTimeout(t, n),
			cancel: (t) => {
				typeof t == "number" && e.clearTimeout(t);
			}
		},
		enqueue: (t) => e.queueMicrotask(t)
	};
}
// svelte/features/app-navigation/RoomStrip.svelte
var ya = h("<nav data-vb-native=\"room-strip\" class=\"tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-border tw:bg-background tw:p-2 tw:font-sans tw:text-sm tw:text-foreground tw:min-[901px]:hidden\"><!><!><!></nav>");
function ba(e, t) {
	R(t, !0);
	let n = () => T(Q(o), "$personal", i), r = () => T(Q(c), "$nav", i), [i, a] = y(), o = q(() => t.controller.personal.state), c = q(() => t.controller.state);
	var u = ya(), d = z(u);
	k(d, {
		variant: "ghost",
		size: "sm",
		onclick: (e) => {
			e.currentTarget.isConnected && t.controller.callbacks.home();
		},
		children: (e, n) => {
			Y();
			var r = g();
			I((e) => s(r, e), [() => Ft(t.lang, "home")]), P(e, r);
		},
		$$slots: { default: !0 }
	});
	var f = J(d);
	l(f, 1, () => Ne(n().me?.books ?? []).slice(0, 3), (e) => e.id, (e, i) => {
		{
			let a = q(() => r().roomId === Q(i).id), o = q(() => n().seen[Q(i).id] ?? 0), s = q(() => n().me?.waits.filter((e) => e.book_id === Q(i).id) ?? []);
			Lt(e, {
				get room() {
					return Q(i);
				},
				get lang() {
					return t.lang;
				},
				compact: !0,
				get now() {
					return n().now;
				},
				get selected() {
					return Q(a);
				},
				get seen() {
					return Q(o);
				},
				get waits() {
					return Q(s);
				},
				get onnavigate() {
					return t.controller.callbacks.navigate;
				},
				onsettings: (e, n) => t.controller.openSettings(e, n)
			});
		}
	});
	var p = J(f);
	{
		let e = q(() => Ft(t.lang, "search"));
		Nt(p, {
			icon: "search",
			get label() {
				return Q(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && t.controller.openSearch(e.currentTarget);
			}
		});
	}
	W(u), I((e) => j(u, "aria-label", e), [() => Ft(t.lang, "home")]), P(e, u), U(), a();
}
// svelte/features/people/model.ts
var xa = (e) => e.trim().toLowerCase();
function Sa(e, t) {
	return e.members.includes(t) && t !== e.book.owner && (!!e.pending?.includes(t) || e.me === e.book.owner);
}
function Ca(e, t, n) {
	return e.members.includes(e.me) ? t === "remove" ? !!Sa(e, n) : t === "resend" ? !!e.pending?.includes(n) : t === "approve" || t === "deny" ? !!e.requests?.some((e) => e.email === n) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n) && !e.members.includes(n) : !1;
}
function wa(e, t) {
	let n = e.members.filter((t) => t === e.me || e.online.includes(t));
	return {
		online: n,
		offline: e.members.filter((e) => !n.includes(e)),
		friends: t.filter((t) => !e.members.includes(t))
	};
}
function Ta(e, t, n, r) {
	let i = `${n}/b/${e.id}`;
	return `${r("Te convidei pro vibebook \"{title}\": {url}", {
		title: e.book.title,
		url: i
	})}\n\n${r("1. Entra com {email} (o convite chegou nesse email).", { email: t })}\n${r("2. Manda isto pro seu Claude Code:")}\n\nRead ${n}/llms.txt and set up vibebook for this project. Room: ${i}`;
}
// svelte/features/people/api.ts
function Ea(e, t) {
	let n = he("/", t).api.books[":id"], r = encodeURIComponent(e);
	return async (e, t) => {
		let i = e === "remove" ? await n.members[":email"].$delete({ param: {
			id: r,
			email: encodeURIComponent(t)
		} }) : e === "approve" || e === "deny" ? await n.requests.$post({
			param: { id: r },
			json: {
				email: t,
				ok: e === "approve"
			}
		}) : await n.members.$post({
			param: { id: r },
			json: { email: t }
		}), a = await i.json().catch(() => null);
		if (!i.ok) {
			let e = Te.safeParse(a);
			throw Error(e.success ? e.data.error : `HTTP ${i.status}`);
		}
		if (!we.safeParse(a).success) throw Error("Invalid people response");
	};
}
// svelte/features/people/session.ts
var Da = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, Oa = 2e4, ka = 1e4;
function Aa(e, t = Da) {
	let n = K({
		draft: "",
		pending: {},
		issues: {},
		notices: {},
		clipboard: null
	}), r = !0, i = null, a = 0, o = /* @__PURE__ */ new Map(), s = (e, r) => {
		let i = o.get(e);
		i?.timer !== void 0 && t.cancel(i.timer), o.delete(e), n.update((t) => {
			let n = { ...t.pending }, i = { ...t.issues };
			return delete n[e], r ? i[e] = r : delete i[e], {
				...t,
				pending: n,
				issues: i
			};
		});
	}, c = (e) => {
		let t = o.get(e);
		t && (t.timer = void 0, n.update((t) => ({
			...t,
			issues: {
				...t.issues,
				[e]: "unconfirmed"
			}
		})));
	}, l = (e, t) => !!i && (t === "remove" ? !i.members.includes(e) : t === "invite" ? i.members.includes(e) : t === "approve" ? i.members.includes(e) && !i.requests?.some((t) => t.email === e) : t !== "deny" || !i.requests?.some((t) => t.email === e));
	return {
		state: n,
		sync(t) {
			if (r && t.id === e) {
				i = t;
				for (let [e, n] of o) ((n.action === "remove" ? !t.members.includes(e) : (n.action === "approve" || n.action === "deny") && !t.requests?.some((t) => t.email === e)) || n.ack && l(e, n.action)) && s(e);
			}
		},
		edit(e) {
			r && n.update((t) => ({
				...t,
				draft: e
			}));
		},
		async copy(e, t) {
			if (!r) return;
			let i = ++a;
			try {
				await t(), r && i === a && n.update((t) => ({
					...t,
					clipboard: {
						email: e,
						status: "copied"
					}
				}));
			} catch {
				r && i === a && n.update((t) => ({
					...t,
					clipboard: {
						email: e,
						status: "failed"
					}
				}));
			}
		},
		async mutate(e, a, u) {
			let d = xa(a);
			if (!r || !i || o.has(d)) return !1;
			if (!Ca(i, e, d)) return e === "invite" && n.update((e) => ({
				...e,
				issues: {
					...e.issues,
					[d]: i.members.includes(d) ? "already-member" : "invalid-email"
				}
			})), !1;
			let f = Symbol(), p = X(n).draft;
			o.set(d, {
				token: f,
				action: e,
				ack: !1
			}), n.update((t) => {
				let n = { ...t.issues }, r = { ...t.notices };
				return delete n[d], delete r[d], {
					...t,
					pending: {
						...t.pending,
						[d]: e
					},
					issues: n,
					notices: r
				};
			});
			let m = () => r && o.get(d)?.token === f;
			o.get(d).timer = t.schedule(() => {
				m() && !o.get(d).ack && c(d);
			}, Oa);
			try {
				await u(e, d);
			} catch (e) {
				return m() && s(d, e instanceof Error ? e.message : "failed"), !1;
			}
			if (!m()) return !1;
			let h = o.get(d);
			return h.timer !== void 0 && t.cancel(h.timer), h.ack = !0, n.update((t) => ({
				...t,
				draft: e === "invite" && xa(p) === d && t.draft === p ? "" : t.draft,
				notices: {
					...t.notices,
					[d]: e
				}
			})), l(d, e) ? s(d) : h.timer = t.schedule(() => {
				m() && c(d);
			}, ka), !0;
		},
		dispose() {
			r = !1, a++;
			for (let e of o.values()) e.timer !== void 0 && t.cancel(e.timer);
			o.clear(), i = null;
		}
	};
}
// svelte/features/people/PeoplePanel.svelte
var ja = h("<!> <div class=\"tw:flex tw:flex-wrap tw:gap-1\"><!> <!></div>", 1), Ma = h("<div class=\"tw:space-y-2\"><div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:text-sm tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div> <!></div>"), Na = h("<div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div>"), Pa = h("<div class=\"tw:space-y-3\"><!> <!></div>"), Fa = h("<details class=\"tw:space-y-3\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-3\"></div></details>"), Ia = h("<!><span class=\"tw:min-w-0 tw:break-all\"> </span><span aria-hidden=\"true\">+</span>", 1), La = h("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <!></details>"), Ra = h("<option></option>"), za = h("<p role=\"status\" class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Ba = h("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-destructive\"> </p>"), Va = h("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Ha = h("<section tabindex=\"-1\" data-vb-native=\"\" data-people-panel=\"\" class=\"tw:space-y-4 tw:border-t tw:border-border tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <div class=\"tw:space-y-3\"></div> <!> <!> <form id=\"invite\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div> <datalist></datalist></form> <!> <!> <!> <!></section> <!>", 1);
function Ua(e, n) {
	let i = m();
	R(n, !0);
	let a = () => T(E, "$view", u), [u, d] = y(), f = (e, t = L) => {
		var i = Ma(), o = z(i), c = z(o);
		{
			let e = q(() => n.vb.name(t())), r = q(() => ie(t()));
			Hn(c, {
				get name() {
					return Q(e);
				},
				get src() {
					return Q(r);
				}
			});
		}
		var l = J(c, 2), u = z(l), d = B(u, !0), f = J(u, 2), p = B(f, !0), m = J(f, 2), h = (e) => {
			var r = ja(), i = $(r);
			Un(i, {
				children: (e, t) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => n.vb.t("pendente")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
			var o = J(i, 2), c = z(o);
			{
				let e = q(() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"));
				k(c, {
					size: "sm",
					variant: "ghost",
					get "data-copyinv"() {
						return t();
					},
					get title() {
						return Q(e);
					},
					onclick: () => ae(t()),
					children: (e, t) => {
						Y();
						var r = g();
						I((e) => s(r, e), [() => n.vb.t("copiar")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			var l = J(c, 2);
			{
				let e = q(() => !!a().pending[t()]);
				k(l, {
					size: "sm",
					variant: "ghost",
					get "data-resend"() {
						return t();
					},
					get disabled() {
						return Q(e);
					},
					onclick: () => {
						_.mutate("resend", t(), n.request || S);
					},
					children: (e, t) => {
						Y();
						var r = g();
						I((e) => s(r, e), [() => n.vb.t("reenviar")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			W(o), P(e, r);
		}, v = q(() => n.room.pending?.includes(t())), y = (e) => {
			{
				let r = q(() => n.room.online.includes(t()) || t() === n.room.me ? "success" : "neutral");
				Un(e, {
					get variant() {
						return Q(r);
					},
					children: (e, r) => {
						Y();
						var i = g();
						I((e) => s(i, e), [() => n.room.online.includes(t()) || t() === n.room.me ? n.vb.t("online") : n.vb.t("offline")]), P(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		};
		C(m, (e) => {
			Q(v) ? e(h) : e(y, -1);
		}), W(l);
		var b = J(l, 2), x = (e) => {
			{
				let r = q(() => n.room.pending?.includes(t()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover {email}", { email: t() })), i = q(() => !!a().pending[t()]);
				Nt(e, {
					icon: "close",
					get "data-remove"() {
						return t();
					},
					get label() {
						return Q(r);
					},
					get disabled() {
						return Q(i);
					},
					onclick: (e) => se(t(), "remove", e.currentTarget)
				});
			}
		}, w = q(() => Sa(n.room, t()));
		C(b, (e) => {
			Q(w) && e(x);
		}), W(o);
		var T = J(o, 2);
		r(T, () => n.agents ?? L, t), W(i), I((e) => {
			j(o, "data-person", t()), j(u, "title", t()), s(d, e), s(p, t());
		}, [() => n.room.names?.[t()] || n.vb.name(t())]), P(e, i);
	}, p = v(n, "friends", 19, () => []), h = v(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), _ = G(() => Aa(n.room.id)), S = G(() => Ea(n.room.id)), E = _.state, O = q(() => wa(n.room, p())), A = Z(!1), M = Z(null), N = Z(null), H = Z(null), ee = Z(te(G(() => h().off))), ne = Z(te(G(() => h().friends ?? n.room.members.length <= 1))), K = (e) => e === "invalid-email" ? n.vb.t("Email inválido.") : e === "already-member" ? n.vb.t("Esta pessoa já está na sala.") : e === "unconfirmed" ? n.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e, ie = (e) => n.vb.avatarUrl?.(e) || (n.room.avatars?.[e] ? `/api/avatar/${encodeURIComponent(e)}?v=${n.room.avatars[e]}` : void 0);
	re(() => {
		_.sync(n.room), Q(M) && (Q(M).action === "remove" ? !Sa(n.room, Q(M).email) : !n.room.requests?.some((e) => e.email === Q(M).email)) && (F(A, !1), F(M, null));
	}), c(() => _.dispose());
	function ae(e) {
		let t = Ta(n.room, e, location.origin, n.vb.t);
		_.copy(e, () => navigator.clipboard?.writeText(t) ?? Promise.reject(/* @__PURE__ */ Error("clipboard unavailable")));
	}
	function oe(e) {
		let t = xa(e);
		if (a().pending[t]) return;
		let r = n.room.pending?.includes(t) ? "resend" : "invite";
		Ca(n.room, r, t) && ae(t), _.mutate(r, t, n.request || S);
	}
	function se(e, t, n) {
		F(M, {
			email: e,
			action: t
		}, !0), F(N, n, !0), F(A, !0);
	}
	async function X() {
		let e = Q(M);
		e && await _.mutate(e.action, e.email, n.request || S) && Q(M) === e && !a().pending[e.email] && F(A, !1);
	}
	var ce = Ha(), le = $(ce), ue = z(le), de = (e) => {
		var t = Pa(), r = z(t);
		Gn(r, {
			level: 3,
			class: "tw:text-sm tw:leading-5",
			children: (e, t) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => n.vb.t("Pedindo pra entrar")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
		var i = J(r, 2);
		l(i, 17, () => n.room.requests, (e) => e.email, (e, t) => {
			var r = Na(), i = z(r);
			{
				let e = q(() => Q(t).name || Q(t).email), n = q(() => ie(Q(t).email));
				Hn(i, {
					get name() {
						return Q(e);
					},
					get src() {
						return Q(n);
					}
				});
			}
			var o = J(i, 2), c = z(o), l = B(c, !0), u = J(c, 2), d = B(u), f = J(u, 2);
			{
				let e = q(() => !!a().pending[Q(t).email]);
				k(f, {
					size: "sm",
					variant: "outline",
					get "data-ask"() {
						return Q(t).email;
					},
					"data-ok": "1",
					get disabled() {
						return Q(e);
					},
					onclick: () => {
						_.mutate("approve", Q(t).email, n.request || S);
					},
					children: (e, t) => {
						Y();
						var r = g();
						I((e) => s(r, e), [() => n.vb.t("liberar")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			W(o);
			var p = J(o, 2);
			{
				let e = q(() => n.vb.t("Recusar {email}", { email: Q(t).email })), r = q(() => !!a().pending[Q(t).email]);
				Nt(p, {
					icon: "close",
					get "data-ask"() {
						return Q(t).email;
					},
					"data-ok": "",
					get label() {
						return Q(e);
					},
					get disabled() {
						return Q(r);
					},
					onclick: (e) => se(Q(t).email, "deny", e.currentTarget)
				});
			}
			W(r), I((e) => {
				j(r, "data-access-request", Q(t).email), s(l, Q(t).name || Q(t).email), s(d, `${Q(t).email ?? ""} · ${e ?? ""}`);
			}, [() => n.vb.t("pediu {ago}", { ago: n.vb.ago(Q(t).ts) })]), P(e, r);
		}), W(t), P(e, t);
	};
	C(ue, (e) => {
		n.room.requests?.length && e(de);
	});
	var fe = J(ue, 2);
	Gn(fe, {
		level: 3,
		class: "tw:text-sm tw:leading-5",
		children: (e, t) => {
			Y();
			var r = g();
			I((e) => s(r, e), [() => n.vb.t("Pessoas e agents")]), P(e, r);
		},
		$$slots: { default: !0 }
	});
	var pe = J(fe, 2);
	r(pe, () => n.sandboxes ?? L);
	var me = J(pe, 2);
	l(me, 20, () => Q(O).online, (e) => e, (e, t) => {
		f(e, () => t);
	}), W(me);
	var he = J(me, 2), ge = (e) => {
		var t = Fa(), r = z(t), i = B(r, !0), a = J(r, 2);
		l(a, 20, () => Q(O).offline, (e) => e, (e, t) => {
			f(e, () => t);
		}), W(a), W(t), I((e) => s(i, e), [() => n.vb.t("{n} offline", { n: Q(O).offline.length })]), o("click", r, () => n.onfoldchange?.("off", !Q(ee))), b("open", "toggle", t, (e) => F(ee, e), () => Q(ee)), P(e, t);
	};
	C(he, (e) => {
		Q(O).offline.length && e(ge);
	});
	var _e = J(he, 2), ve = (e) => {
		var t = La(), r = z(t), i = B(r), c = J(r, 2);
		l(c, 16, () => Q(O).friends, (e) => e, (e, t) => {
			{
				let r = q(() => !!a().pending[t]);
				k(e, {
					variant: "ghost",
					class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left",
					get "data-add"() {
						return t;
					},
					get disabled() {
						return Q(r);
					},
					onclick: () => oe(t),
					children: (e, r) => {
						var i = Ia(), a = $(i);
						{
							let e = q(() => n.vb.name(t)), r = q(() => ie(t));
							Hn(a, {
								get name() {
									return Q(e);
								},
								get src() {
									return Q(r);
								}
							});
						}
						var o = J(a), c = B(o, !0);
						Y(), I((e) => s(c, e), [() => n.vb.name(t)]), P(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		}), W(t), I((e) => s(i, `${e ?? ""} · ${Q(O).friends.length ?? ""}`), [() => n.vb.t("Seus amigos")]), o("click", r, () => n.onfoldchange?.("friends", !Q(ne))), b("open", "toggle", t, (e) => F(ne, e), () => Q(ne)), P(e, t);
	};
	C(_e, (e) => {
		Q(O).friends.length && e(ve);
	});
	var ye = J(_e, 2), be = z(ye);
	{
		let e = q(() => `${i}-email`);
		Kn(be, {
			get for() {
				return Q(e);
			},
			children: (e, t) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => n.vb.t("convidar por email")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var xe = J(be, 2), Se = z(xe);
	{
		let e = q(() => `${i}-email`), t = q(() => `${i}-friends`);
		Wn(Se, {
			get id() {
				return Q(e);
			},
			type: "email",
			required: !0,
			get list() {
				return Q(t);
			},
			autocomplete: "off",
			get value() {
				return a().draft;
			},
			oninput: (e) => _.edit(e.currentTarget.value)
		});
	}
	var Ce = J(Se);
	{
		let e = q(() => !!a().pending[xa(a().draft)]);
		k(Ce, {
			type: "submit",
			size: "sm",
			get disabled() {
				return Q(e);
			},
			children: (e, t) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => n.vb.t("Convidar")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	W(xe);
	var we = J(xe, 2);
	l(we, 21, () => Q(O).friends, w, (e, t) => {
		var n = Ra(), r = {};
		I(() => {
			r !== (r = Q(t)) && (n.value = (n.__value = r) ?? "");
		}), P(e, n);
	}), W(we), W(ye);
	var Te = J(ye, 2);
	l(Te, 1, () => Object.entries(a().pending), w, (e, r) => {
		var i = q(() => V(Q(r), 1));
		let o = () => Q(i)[0];
		var c = t(), l = $(c), u = (e) => {
			var t = za(), r = B(t);
			I((e) => s(r, `${o() ?? ""} · ${e ?? ""}`), [() => n.vb.t("Aguardando confirmação…")]), P(e, t);
		};
		C(l, (e) => {
			a().issues[o()] !== "unconfirmed" && e(u);
		}), P(e, c);
	});
	var Ee = J(Te, 2);
	l(Ee, 1, () => Object.entries(a().issues), w, (e, t) => {
		var n = q(() => V(Q(t), 2));
		let r = () => Q(n)[0], i = () => Q(n)[1];
		var a = Ba(), o = B(a);
		I((e) => s(o, `${r() ?? ""} · ${e ?? ""}`), [() => K(i())]), P(e, a);
	});
	var De = J(Ee, 2);
	l(De, 1, () => Object.entries(a().notices), w, (e, r) => {
		var i = q(() => V(Q(r), 2));
		let a = () => Q(i)[0], o = () => Q(i)[1];
		var c = t(), l = $(c), u = (e) => {
			var t = za(), r = B(t);
			I((e) => s(r, `${a() ?? ""} · ${e ?? ""} ✓`), [() => n.vb.t("enviado")]), P(e, t);
		};
		C(l, (e) => {
			(o() === "invite" || o() === "resend") && e(u);
		}), P(e, c);
	});
	var Oe = J(De, 2), ke = (e) => {
		var t = Va(), r = B(t, !0);
		I((e) => {
			j(t, "role", a().clipboard.status === "failed" ? "alert" : "status"), s(r, e);
		}, [() => a().clipboard.status === "failed" ? n.vb.t("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: a().clipboard.email }) : n.vb.t("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: n.vb.name(a().clipboard.email) })]), P(e, t);
	};
	C(Oe, (e) => {
		a().clipboard && e(ke);
	}), W(le), x(le, (e) => F(H, e), () => Q(H));
	var Ae = J(le, 2);
	{
		let e = q(() => Q(M)?.action === "deny" ? n.vb.t("Recusar o pedido de {email}?", { email: Q(M).email }) : n.room.pending?.includes(Q(M)?.email || "") ? n.vb.t("Cancelar o convite de {email}?", { email: Q(M)?.email || "" }) : n.vb.t("Remover {email} deste vibebook?", { email: Q(M)?.email || "" })), t = q(() => Q(M)?.email), r = q(() => Q(M)?.action === "deny" ? n.vb.t("Recusar") : n.vb.t("Remover do vibebook")), i = q(() => n.vb.t("Cancelar")), o = q(() => !!(Q(M) && a().pending[Q(M).email] && a().issues[Q(M).email] !== "unconfirmed")), s = q(() => !!(Q(M) && a().pending[Q(M).email])), c = q(() => Q(M) && a().issues[Q(M).email] ? K(a().issues[Q(M).email]) : "");
		Vn(Ae, {
			get title() {
				return Q(e);
			},
			get description() {
				return Q(t);
			},
			get confirmLabel() {
				return Q(r);
			},
			get cancelLabel() {
				return Q(i);
			},
			get busy() {
				return Q(o);
			},
			get confirmDisabled() {
				return Q(s);
			},
			get error() {
				return Q(c);
			},
			onconfirm: () => {
				X();
			},
			returnFocus: () => Q(N)?.isConnected ? Q(N) : Q(H),
			get open() {
				return Q(A);
			},
			set open(e) {
				F(A, e, !0);
			}
		});
	}
	I(() => j(we, "id", `${i}-friends`)), D("submit", ye, (e) => {
		e.preventDefault(), oe(a().draft);
	}), P(e, ce), U(), d();
}
i(["click"]);
// svelte/People.svelte
var Wa = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"room"
]);
function Ga(n, r) {
	R(r, !0);
	let i = E(r, Wa);
	var a = t(), o = $(a);
	e(o, () => r.room.id, (e) => {
		Ua(e, O({ get room() {
			return r.room;
		} }, () => i));
	}), P(n, a), U();
}
// svelte/features/navigation/EpicTree.svelte
var Ka = h("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), qa = h("<span class=\"tw:ml-1 tw:text-xs\"> </span>"), Ja = h("<span class=\"tw:sr-only\"> </span>"), Ya = h("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), Xa = h("<span> </span>"), Za = h("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!><!></span> <!> <!> <!> <!>", 1), Qa = h("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), $a = h("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), eo = h(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), to = h("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), no = h("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), ro = h("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), io = h("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function ao(e, n) {
	let r = m();
	R(n, !0);
	let i = () => T(h, "$mutation", o), a = () => T(Q(p), "$navigation", o), [o, u] = y(), d = v(n, "selectionDisabled", 3, !1), p = q(() => n.session.state), h = G(() => n.mutations.state), _ = q(() => i().phase === "pending" || i().phase === "unconfirmed"), b = Z(""), x = Z(null), E = Z(null), O = Z(!1), V = Z(null), H = !1, ee = /* @__PURE__ */ new Map(), te = 0, ne = Z(null), K = Z("");
	c(() => {
		H = !0, te++, ee.clear();
	});
	let ae = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], oe = q(() => ui(n.room.epics, n.thread)), se = q(() => mi(n.room.epics, n.room.messages)), ce = q(() => a().archived && Q(se).length > 0 ? "archived" : "active"), le = q(() => di(Q(ce) === "archived" ? Q(se) : Q(oe))), ue = q(() => di(n.room.epics)), de = q(() => new Set(n.room.epics.filter((e) => n.vb.epicBusy(e)).map((e) => e.id))), fe = q(() => pi(Q(le), a().closed, Q(de), !0)), pe = q(() => new Map(Q(fe).map((e, t) => [e.epic.id, `${r}-row-${t}`])));
	re(() => {
		bi(n.session, Q(ue), n.thread);
	});
	function me(e) {
		if (H) return;
		te++, F(ne, null);
		let t = e === "archived";
		Q(p).update((e) => ({
			...e,
			archived: t
		})), n.onarchchange(t), F(x, null), F(E, null), F(b, "");
	}
	async function he(e) {
		return H || Q(_) || n.session.roomId !== n.room.id ? !1 : (F(b, ""), await n.mutations.run(e));
	}
	async function ge(e) {
		if (e.preventDefault(), H) return;
		let t = a().draft.trim(), n = a().draft, r = Q(p);
		if (!t) return Q(V)?.focus();
		await he({
			t: "epic",
			title: t
		}) && X(r).draft === n && r.update((e) => ({
			...e,
			draft: ""
		}));
	}
	function _e(e) {
		let t = Q(le).parents.get(e);
		return t ? Q(le).children.get(t) ?? [] : Q(le).roots;
	}
	function ve(e, t) {
		let n = _e(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	async function ye(e, t, r) {
		let i = hi(n.room.epics, e, t, r);
		if (!i || H) return;
		F(ne, null);
		let a = ++te, o = document.activeElement, s = o instanceof HTMLElement && ee.get(e)?.contains(o) ? o : null, c = n.thread;
		await he({
			t: "epic.order",
			ids: i
		}) && !H && te === a && n.thread === c && F(ne, {
			ids: i,
			from: e,
			anchor: s,
			generation: a,
			thread: n.thread
		}, !0);
	}
	function be(e, t) {
		return ee.set(t, e), { destroy() {
			ee.get(t) === e && ee.delete(t);
		} };
	}
	re(() => {
		let e = Q(ne);
		if (!e) return;
		if (e.thread !== n.thread || Q(ce) !== "active") {
			F(ne, null), te++;
			return;
		}
		let t = n.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			F(ne, null), xe(e);
			return;
		}
		let r = new Set(t), i = new Set(e.ids), a = e.ids.filter((e) => r.has(e)), o = t.filter((e) => i.has(e));
		o.length !== a.length || o.some((e, t) => e !== a[t]) || (F(ne, null), F(K, n.vb.t("Ordem dos épicos atualizada."), !0), xe(e));
	});
	function xe(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && ie().then(() => {
			if (H || e.generation !== te || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = ee.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? Q(V))?.focus({ preventScroll: !0 });
		});
	}
	function Se(e, t) {
		let n = ve(e, t);
		Q(ce) === "active" && n && ye(e, n.id, t === 1);
	}
	function Ce(e, t) {
		if (Q(_) || Q(ce) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", F(x, t, !0);
	}
	function we(e, t) {
		return !Q(_) && Q(ce) === "active" && Q(x) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Te(e, t) {
		if (!we(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		F(E, t, !0), F(O, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function Ee(e, t) {
		let n = Q(O);
		if (F(E, null), !we(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && ye(r, t, n), F(x, null);
	}
	var De = io(), Oe = z(De);
	{
		let e = (e, i = L) => {
			var o = t(), c = $(o), u = (e) => {
				var t = no(), o = $(t);
				l(o, 21, () => Q(fe), (e) => e.epic.id, (e, t) => {
					let r = q(() => Q(t).epic), o = q(() => a().closed.has(Q(r).id)), c = q(() => Q(le).byId.get(Q(le).parents.get(Q(r).id) ?? "")), l = q(() => n.vb.epicBusy(Q(r)));
					var u = $a(), p = z(u), m = z(p), h = (e) => {
						{
							let t = q(() => Q(o) ? "chevronRight" : "chevronDown"), i = q(() => `${n.vb.t(Q(o) ? "Abrir galho" : "Fechar galho")}: ${Q(r).title}`), a = q(() => !Q(o)), s = q(() => (Q(le).children.get(Q(r).id) ?? []).map((e) => Q(pe).get(e.id)).join(" "));
							Nt(e, {
								get icon() {
									return Q(t);
								},
								get label() {
									return Q(i);
								},
								get "aria-expanded"() {
									return Q(a);
								},
								get "aria-controls"() {
									return Q(s);
								},
								class: "tw:size-8 tw:p-1",
								onclick: () => xi(n.session, Q(r).id)
							});
						}
					}, v = (e) => {
						var t = Ka();
						P(e, t);
					};
					C(m, (e) => {
						Q(t).hasChildren ? e(h) : e(v, -1);
					});
					var y = J(m, 2);
					{
						let e = q(() => !d() && n.thread === Q(r).id ? "page" : void 0);
						k(y, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return Q(r).id;
							},
							get "aria-current"() {
								return Q(e);
							},
							onclick: () => {
								(!n.onBeforeOpen || n.onBeforeOpen()) && (n.thread === Q(r).id && Q(t).hasChildren ? xi(n.session, Q(r).id) : n.onopen(Q(r).id));
							},
							children: (e, i) => {
								var a = Za(), u = $(a);
								{
									let e = q(() => Q(r).owner ? n.vb.name(Q(r).owner) : Q(r).title), t = q(() => Q(r).owner && n.room.avatars?.[Q(r).owner] ? `/api/avatar/${encodeURIComponent(Q(r).owner)}?v=${n.room.avatars[Q(r).owner]}` : void 0);
									Hn(u, {
										get name() {
											return Q(e);
										},
										get src() {
											return Q(t);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var p = J(u, 2), m = z(p, !0), h = J(m), g = (e) => {
									var t = qa(), r = B(t);
									I((e) => s(r, `(${e ?? ""})`), [() => n.vb.t("Arquivado")]), P(e, t);
								};
								C(h, (e) => {
									Q(r).archived && e(g);
								});
								var _ = J(h), v = (e) => {
									var t = Ja(), r = B(t);
									I((e) => s(r, `· ${e ?? ""}`), [() => n.vb.t("Subépico de {title}", { title: Q(c).title })]), P(e, t);
								};
								C(_, (e) => {
									Q(c) && e(v);
								}), W(p);
								var y = J(p, 2), b = (e) => {
									var t = Ya();
									I((e) => j(t, "aria-label", e), [() => Q(l) ? n.vb.t("{who} está trabalhando", { who: Q(l) }) : n.vb.t("Trabalho em um subépico")]), P(e, t);
								};
								C(y, (e) => {
									(Q(l) || Q(o) && Q(t).busyBelow) && e(b);
								});
								var x = J(y, 2);
								{
									let e = q(() => n.vb.waitsIn(Q(r).id)), t = q(() => n.vb.t("Tarefa sua pendente"));
									It(x, {
										get waits() {
											return Q(e);
										},
										label: (e) => n.vb.t("{n} coisas esperando você", { n: e }),
										get taskLabel() {
											return Q(t);
										}
									});
								}
								var S = J(x, 2), w = (e) => {
									var t = Xa(), i = B(t, !0);
									I((e) => {
										j(t, "title", e), s(i, Q(r).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => n.vb.t(Q(r).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), P(e, t);
								};
								C(S, (e) => {
									Q(r).prod && e(w);
								});
								var T = J(S, 2), E = (e) => {
									var t = Xa(), i = B(t);
									I((e) => {
										N(t, 1, f(!d() && n.thread === Q(r).id ? "tw:shrink-0 tw:text-xs tw:text-sidebar-accent-foreground" : "tw:shrink-0 tw:text-xs tw:text-muted-foreground")), s(i, `${e ?? ""}/${Q(r).tasks.length ?? ""}`);
									}, [() => Q(r).tasks.filter((e) => e.done).length]), P(e, t);
								};
								C(T, (e) => {
									Q(r).tasks.length && e(E);
								}), I(() => s(m, Q(r).title)), P(e, a);
							},
							$$slots: { default: !0 }
						});
					}
					W(p);
					var b = J(p, 2), w = z(b), T = B(w), A = J(w, 2), L = z(A);
					{
						let e = q(() => `${Q(pe).get(Q(r).id)}-owner`);
						Kn(L, {
							get for() {
								return Q(e);
							},
							children: (e, t) => {
								Y();
								var r = g();
								I((e) => s(r, e), [() => n.vb.t("Dono do épico")]), P(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var R = J(L, 2);
					{
						let e = q(() => `${Q(pe).get(Q(r).id)}-owner`), t = q(() => `${n.vb.t("Dono do épico")}: ${Q(r).title}`), i = q(() => Q(r).owner ?? ""), a = q(() => [{
							value: "",
							label: n.vb.t("Sem dono")
						}, ...n.room.members.map((e) => ({
							value: e,
							label: n.vb.name(e)
						}))]);
						qn(R, {
							get disabled() {
								return Q(_);
							},
							get id() {
								return Q(e);
							},
							get "aria-label"() {
								return Q(t);
							},
							get value() {
								return Q(i);
							},
							get items() {
								return Q(a);
							},
							onValueChange: (e) => (he({
								t: "epic.owner",
								id: Q(r).id,
								owner: e
							}), !1)
						});
					}
					var V = J(R, 2), H = (e) => {
						var t = Qa(), i = z(t);
						{
							let e = q(() => Q(_) || !ve(Q(r).id, -1)), t = q(() => `${n.vb.t("Mover para cima")}: ${Q(r).title}`);
							k(i, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return Q(e);
								},
								get "aria-label"() {
									return Q(t);
								},
								onclick: () => Se(Q(r).id, -1),
								children: (e, t) => {
									Y();
									var r = g();
									I((e) => s(r, e), [() => n.vb.t("Mover para cima")]), P(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var a = J(i);
						{
							let e = q(() => Q(_) || !ve(Q(r).id, 1)), t = q(() => `${n.vb.t("Mover para baixo")}: ${Q(r).title}`);
							k(a, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return Q(e);
								},
								get "aria-label"() {
									return Q(t);
								},
								onclick: () => Se(Q(r).id, 1),
								children: (e, t) => {
									Y();
									var r = g();
									I((e) => s(r, e), [() => n.vb.t("Mover para baixo")]), P(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						W(t), P(e, t);
					};
					C(V, (e) => {
						i() === "active" && e(H);
					}), W(A), W(b), W(u), M(u, (e, t) => be?.(e, t), () => Q(r).id), I((e, n, a, o) => {
						j(u, "id", e), j(u, "hidden", Q(t).hidden), j(u, "data-epic", Q(r).id), j(u, "data-depth", Q(t).depth), N(u, 1, n), j(p, "aria-label", Q(r).title), j(p, "draggable", !Q(_) && i() === "active"), N(p, 1, a), s(T, `${o ?? ""}: ${Q(r).title ?? ""}`);
					}, [
						() => Q(pe).get(Q(r).id),
						() => f(ae[Math.min(Q(t).depth, ae.length - 1)]),
						() => f(S("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent tw:border-l-4", !d() && n.thread === Q(r).id && "tw:border-l-primary tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", Q(E) === Q(r).id && (Q(O) ? "tw:border-b-primary" : "tw:border-t-primary"), Q(x) === Q(r).id && "tw:opacity-50")),
						() => n.vb.t("Ações do épico")
					]), D("dragstart", p, (e) => Ce(e, Q(r).id)), D("dragend", p, () => {
						F(x, null), F(E, null);
					}), D("dragover", p, (e) => Te(e, Q(r).id)), D("dragleave", p, () => {
						Q(E) === Q(r).id && F(E, null);
					}), D("drop", p, (e) => Ee(e, Q(r).id)), P(e, u);
				}), W(o);
				var c = J(o, 2), u = (e) => {
					var t = to(), i = $(t), o = z(i);
					{
						let e = q(() => `${r}-new`);
						Kn(o, {
							get for() {
								return Q(e);
							},
							children: (e, t) => {
								Y();
								var r = g();
								I((e) => s(r, e), [() => n.vb.t("Novo épico")]), P(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var c = J(o, 2), u = z(c), d = () => H ? "" : a().draft, f = (e) => {
						H || A(Q(p), G(a).draft = e, G(a));
					};
					{
						let e = q(() => `${r}-new`), t = q(() => n.vb.t("Novo épico: escreva o título…"));
						Wn(u, {
							get id() {
								return Q(e);
							},
							get value() {
								return d();
							},
							set value(e) {
								f(e);
							},
							get placeholder() {
								return Q(t);
							},
							enterkeyhint: "done",
							get ref() {
								return Q(V);
							},
							set ref(e) {
								F(V, e, !0);
							}
						});
					}
					var m = J(u);
					{
						let e = q(() => n.vb.t("Criar épico"));
						Nt(m, {
							get disabled() {
								return Q(_);
							},
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return Q(e);
							}
						});
					}
					W(c), W(i);
					var h = J(i, 2);
					l(h, 17, () => n.room.suggestions, w, (e, t, r) => {
						{
							let i = q(() => n.thread === `pre:${r}` ? "page" : void 0);
							k(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return Q(i);
								},
								onclick: () => n.onopen(`pre:${r}`),
								children: (e, r) => {
									Y();
									var i = eo(), a = $(i, !0), o = J(a), c = B(o, !0);
									I((e) => {
										s(a, Q(t).title), s(c, e);
									}, [() => n.vb.t("sugestão do @vibe, clique para ver")]), P(e, i);
								},
								$$slots: { default: !0 }
							});
						}
					}), D("submit", i, ge), P(e, t);
				};
				C(c, (e) => {
					i() === "active" && e(u);
				}), I((e) => j(o, "aria-label", e), [() => i() === "archived" ? n.vb.t("Arquivados") : n.vb.t("Épicos")]), P(e, t);
			};
			C(c, (e) => {
				i() === Q(ce) && e(u);
			}), P(e, o);
		}, i = q(() => [{
			value: "active",
			label: `${n.vb.t("Épicos")} · ${Q(oe).filter((e) => !e.archived).length}`
		}, {
			value: "archived",
			label: `${n.vb.t("Arquivados")} · ${Q(se).length}`,
			disabled: Q(se).length === 0
		}]), o = q(() => n.vb.t("Épicos"));
		Jn(Oe, {
			get items() {
				return Q(i);
			},
			get label() {
				return Q(o);
			},
			get value() {
				return Q(ce);
			},
			onValueChange: me,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ke = J(Oe, 2), Ae = B(ke, !0), je = J(ke, 2), Me = (e) => {
		var t = ro(), n = B(t, !0);
		I(() => s(n, Q(b))), P(e, t);
	};
	C(je, (e) => {
		Q(b) && e(Me);
	}), W(De), I((e) => {
		j(De, "aria-label", e), s(Ae, Q(K));
	}, [() => n.vb.t("Épicos")]), P(e, De), U(), u();
}
// svelte/features/pins/PinnedItems.svelte
var oo = h("<form class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div></form>"), so = h("<p role=\"status\" class=\"tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground\"> </p>"), co = h("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:text-muted-foreground\"> </span></span></a>"), lo = h("<!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground\"> </span></span>", 1), uo = h("<div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:text-xs\"> </span></span></div>"), fo = h("<li class=\"tw:flex tw:items-start tw:gap-1\"><!> <!></li>"), po = h("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul>"), mo = h("<!> ", 1), ho = h("<section class=\"tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground\" data-native-pins=\"\" data-vb-native=\"\"><div class=\"tw:flex tw:items-center tw:justify-between tw:gap-2\"><h2 class=\"tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h2> <!></div> <!> <!> <!> <!> <!> <!></section>");
function go(e, t) {
	R(t, !0);
	let n = () => T(Q(h), "$pinState", r), [r, i] = y(), a = !1;
	c(() => {
		a = !0;
	});
	function u() {
		return !a && t.session.active && t.session.roomId === t.room.id;
	}
	function d(e) {
		u() && Ai(t.session, e);
	}
	function f(e) {
		u() && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), N());
	}
	function p() {
		u() && Ri(t.session, t.room, t.send, !0);
	}
	function m(e) {
		u() && Li(t.session, t.room.id, e, t.request);
	}
	let h = q(() => t.session.state), _ = q(() => (t.room.pins ?? []).map((e) => ({
		pin: e,
		target: Ti(e, t.room)
	}))), v = q(() => Q(_).some((e) => e.target.kind === "file-unloaded")), b = Z(null), x = Z(null), S = q(() => t.session.active && t.session.roomId === t.room.id), w = Z(null), E = Z(null), O = q(() => `pin-url-${t.room.id}`), A = (e) => t.t({
		"invalid-link": "Use um link http ou https válido.",
		offline: "Sem conexão. Seu rascunho foi mantido.",
		"send-failed": "Não deu pra enviar agora. Tente de novo.",
		unconfirmed: "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
		"already-pinned": "Este link já está nos fixados.",
		rejected: "Não deu pra atualizar os fixados. Tente de novo."
	}[e.kind]);
	re(() => {
		if (a || !Q(b)) return;
		if (Q(x) !== t.session || !t.session.active || t.session.roomId !== t.room.id) {
			F(b, null), F(x, null);
			return;
		}
		let e = t.room.pins?.find((e) => e.id === Q(b) && e.kind === "file");
		if (!e) {
			F(b, null), F(x, null);
			return;
		}
		let n = Ti(e, t.room);
		n.kind === "file" ? (F(b, null), F(x, null), t.onopenfile(n.file)) : t.room.filesAll && (F(b, null), F(x, null));
	});
	async function M() {
		if (!u()) return;
		let e = t.session;
		ki(e), await ie(), !a && t.session === e && e.active && e.roomId === t.room.id && Q(w)?.isConnected && Q(w).focus();
	}
	async function N() {
		if (!u()) return;
		let e = t.session;
		ji(e), await ie(), !a && t.session === e && e.active && e.roomId === t.room.id && Q(E)?.isConnected && Q(E).focus();
	}
	function L(e) {
		e.preventDefault(), u() && Ii(t.session, t.room.id, t.request);
	}
	function V(e) {
		if (!u()) return;
		let r = t.room.pins?.find((t) => t.id === e);
		if (!r) return;
		let i = Ti(r, t.room);
		i.kind === "file" && t.onopenfile(i.file), i.kind === "app" && t.onopenapp(i.app), i.kind === "file-unloaded" && (F(x, t.session), F(b, e, !0), Ri(t.session, t.room, t.send, !n().filesPending));
	}
	var H = ho(), ee = z(H), te = z(ee), ne = B(te, !0), G = J(te, 2), K = (e) => {
		{
			let n = q(() => t.t("Fixar um link")), r = q(() => !Q(S));
			Nt(e, {
				get label() {
					return Q(n);
				},
				icon: "plus",
				get disabled() {
					return Q(r);
				},
				onclick: M,
				get ref() {
					return Q(E);
				},
				set ref(e) {
					F(E, e, !0);
				}
			});
		}
	};
	C(G, (e) => {
		n().adding || e(K);
	}), W(ee);
	var ae = J(ee, 2), oe = (e) => {
		var r = oo(), i = z(r), a = z(i);
		Kn(a, {
			get for() {
				return Q(O);
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => t.t("Link pra fixar")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = J(a, 2);
		{
			let e = q(() => t.t("Cole um link (site, repo, painel…)")), r = q(() => !Q(S)), i = q(() => n().issue?.kind === "invalid-link" || void 0);
			Wn(o, {
				get id() {
					return Q(O);
				},
				name: "url",
				get value() {
					return n().draft.url;
				},
				onkeydown: f,
				oninput: (e) => d({ url: e.currentTarget.value }),
				required: !0,
				maxlength: 2e3,
				autocomplete: "url",
				get placeholder() {
					return Q(e);
				},
				get disabled() {
					return Q(r);
				},
				get "aria-invalid"() {
					return Q(i);
				},
				get ref() {
					return Q(w);
				},
				set ref(e) {
					F(w, e, !0);
				}
			});
		}
		W(i);
		var c = J(i, 2), l = z(c);
		{
			let e = q(() => `${Q(O)}-title`);
			Kn(l, {
				get for() {
					return Q(e);
				},
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.t("Nome (opcional)")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var u = J(l, 2);
		{
			let e = q(() => `${Q(O)}-title`), t = q(() => !Q(S));
			Wn(u, {
				get id() {
					return Q(e);
				},
				name: "title",
				get value() {
					return n().draft.title;
				},
				onkeydown: f,
				oninput: (e) => d({ title: e.currentTarget.value }),
				maxlength: 80,
				get disabled() {
					return Q(t);
				}
			});
		}
		W(c);
		var p = J(c, 2), m = z(p);
		{
			let e = q(() => !Q(S));
			k(m, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return Q(e);
				},
				onclick: N,
				onkeydown: f,
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.t("Cancelar")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var h = J(m, 2);
		{
			let e = q(() => !Q(S) || !!n().pending);
			k(h, {
				type: "submit",
				size: "sm",
				get disabled() {
					return Q(e);
				},
				onkeydown: f,
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.t("Fixar")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		W(p), W(r), I((e) => j(r, "aria-label", e), [() => t.t("Fixar um link")]), D("submit", r, L), P(e, r);
	};
	C(ae, (e) => {
		n().adding && e(oe);
	});
	var se = J(ae, 2), X = (e) => {
		var n = so(), r = B(n, !0);
		I((e) => s(r, e), [() => t.t("Aguardando confirmação…")]), P(e, n);
	};
	C(se, (e) => {
		n().pending && e(X);
	});
	var ce = J(se, 2), le = (e) => {
		var t = so(), r = B(t, !0);
		I((e) => s(r, e), [() => A(n().issue)]), P(e, t);
	}, ue = (e) => {
		{
			let t = q(() => A(n().issue));
			Xn(e, {
				compact: !0,
				get title() {
					return Q(t);
				},
				get description() {
					return n().issue.detail;
				}
			});
		}
	};
	C(ce, (e) => {
		n().issue?.kind === "already-pinned" ? e(le) : n().issue && e(ue, 1);
	});
	var de = J(ce, 2), fe = (e) => {
		{
			let t = q(() => A({ kind: n().fileIssue }));
			Xn(e, {
				compact: !0,
				get title() {
					return Q(t);
				}
			});
		}
	};
	C(de, (e) => {
		n().fileIssue && e(fe);
	});
	var pe = J(de, 2), me = (e) => {
		{
			let n = q(() => !Q(S));
			k(e, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return Q(n);
				},
				onclick: p,
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.t("Tentar carregar novamente")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	C(pe, (e) => {
		Q(v) && (n().filesPending || n().fileIssue) && e(me);
	});
	var he = J(pe, 2), ge = (e) => {
		var r = po();
		l(r, 21, () => Q(_), ({ pin: e, target: t }) => e.id, (e, r) => {
			let i = () => Q(r).pin, a = () => Q(r).target;
			var c = fo(), l = z(c), d = (e) => {
				var t = co(), n = z(t);
				Yn(n, { name: "chevronRight" });
				var r = J(n), i = z(r), c = B(i, !0), l = J(i), d = B(l, !0);
				W(r), W(t), I(() => {
					j(t, "href", a().href), j(t, "title", a().href), s(c, a().label), s(d, a().detail);
				}), o("click", t, (e) => {
					u() || e.preventDefault();
				}), P(e, t);
			}, f = (e) => {
				{
					let r = q(() => !Q(S));
					k(e, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left",
						get disabled() {
							return Q(r);
						},
						onclick: () => V(i().id),
						children: (e, r) => {
							var i = lo(), o = $(i);
							Yn(o, { name: "chevronRight" });
							var c = J(o), l = z(c), u = B(l, !0), d = J(l), f = B(d, !0);
							W(c), I((e) => {
								s(u, a().label), s(f, e);
							}, [() => a().kind === "file-unloaded" ? t.t(n().filesPending ? "Carregando arquivo…" : "Carregar arquivo") : t.t(a().detail)]), P(e, i);
						},
						$$slots: { default: !0 }
					});
				}
			}, p = (e) => {
				var n = uo(), r = z(n);
				Yn(r, {
					name: "warning",
					class: "tw:mt-0.5"
				});
				var i = J(r), o = z(i), c = B(o, !0), l = J(o), u = B(l, !0);
				W(i), W(n), I((e) => {
					s(c, a().label), s(u, e);
				}, [() => t.t(a().reason)]), P(e, n);
			};
			C(l, (e) => {
				a().kind === "link" ? e(d) : a().kind === "file" || a().kind === "app" || a().kind === "file-unloaded" ? e(f, 1) : e(p, -1);
			});
			var h = J(l, 2);
			{
				let e = q(() => t.t("Desafixar {name}", { name: a().label })), r = q(() => !Q(S) || !!n().pending);
				Nt(h, {
					icon: "close",
					get label() {
						return Q(e);
					},
					get disabled() {
						return Q(r);
					},
					onclick: () => m(i().id)
				});
			}
			W(c), I(() => j(c, "data-pin-id", i().id)), P(e, c);
		}), W(r), P(e, r);
	}, _e = (e) => {
		{
			let n = q(() => !Q(S));
			k(e, {
				variant: "ghost",
				class: "tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground",
				get disabled() {
					return Q(n);
				},
				onclick: M,
				children: (e, n) => {
					var r = mo(), i = $(r);
					Yn(i, { name: "plus" });
					var a = J(i, 1, !0);
					I((e) => s(a, e), [() => t.t("Fixar site, repo ou app")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	C(he, (e) => {
		Q(_).length ? e(ge) : n().adding || e(_e, 1);
	}), W(H), I((e) => {
		j(H, "aria-labelledby", `pins-title-${t.room.id}`), j(te, "id", `pins-title-${t.room.id}`), s(ne, e);
	}, [() => t.t("Fixados")]), P(e, H), U(), i();
}
i(["click"]);
// svelte/features/room-sidebar/RoomMark.svelte
var _o = h("<img alt=\"\" class=\"tw:size-full tw:object-cover\"/>"), vo = h("<span aria-hidden=\"true\"><!></span>");
function yo(e, t) {
	R(t, !0);
	let n = Z(!1);
	re(() => {
		t.src, F(n, !1);
	});
	let r = q(() => t.tint === "blue" || t.tint === "green" || t.tint === "yellow" || t.tint === "orange" || t.tint === "pink" || t.tint === "purple" ? Fe[t.tint] : Fe.none);
	var i = vo(), a = z(i), o = (e) => {
		var r = _o();
		I(() => j(r, "src", t.src)), D("error", r, () => {
			F(n, !0);
		}), _(r), P(e, r);
	}, c = (e) => {
		var n = g();
		I((e) => s(n, e), [() => He(t.title)]), P(e, n);
	};
	C(a, (e) => {
		t.src && !Q(n) ? e(o) : e(c, -1);
	}), W(i), I(() => N(i, 1, f(["tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-control tw:border tw:border-border tw:font-sans tw:text-xs tw:font-semibold tw:tracking-normal", Q(r)]))), P(e, i), U();
}
// svelte/features/room-sidebar/MutationStatus.svelte
var bo = h("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), xo = h("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), So = h("<div role=\"status\" class=\"tw:space-y-2 tw:text-sm tw:text-muted-foreground\"><p class=\"tw:m-0\"> </p> <!></div>"), Co = h("<!> <!> <!>", 1);
function wo(e, t) {
	R(t, !0);
	let n = () => T(a, "$status", r), [r, i] = y(), a = G(() => t.owner.state);
	var o = Co(), c = $(o), l = (e) => {
		var n = bo(), r = B(n, !0);
		I((e) => s(r, e), [() => t.t("Aguardando confirmação…")]), P(e, n);
	};
	C(c, (e) => {
		n().phase === "pending" && e(l);
	});
	var u = J(c, 2), d = (e) => {
		var r = xo(), i = B(r);
		I((e) => s(i, `${e ?? ""}
    ${n().error ?? ""}`), [() => t.t("Não deu pra enviar agora. Tente de novo.")]), P(e, r);
	};
	C(u, (e) => {
		n().phase === "error" && e(d);
	});
	var f = J(u, 2), p = (e) => {
		var n = So(), r = z(n), i = B(r, !0), a = J(r, 2);
		k(a, {
			variant: "outline",
			size: "sm",
			onclick: (e) => {
				e.currentTarget.isConnected && t.owner.review();
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => t.t("Conferi a sala")]), P(e, r);
			},
			$$slots: { default: !0 }
		}), W(n), I((e) => s(i, e), [() => t.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.")]), P(e, n);
	};
	C(f, (e) => {
		n().phase === "unconfirmed" && e(p);
	}), P(e, o), U(), i();
}
// svelte/features/room-sidebar/ThreadHeader.svelte
var To = h("<span class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), Eo = h("<!> <!> <!>", 1), Do = h(" <!>", 1), Oo = h("<form class=\"tw:space-y-3\"><!><!></form>"), ko = h("<div data-vb-native=\"\" data-native-thread-header=\"\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-wrap tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground\"><!> <!> <!> <!> <!> <!></div> <!> <!>", 1);
function Ao(e, t) {
	R(t, !0);
	let n = () => T(a, "$status", r), [r, i] = y(), a = G(() => t.owner.state), o = q(() => t.room.epics.find((e) => e.id === t.thread)), l = q(() => it(t.room, t.thread)), u = q(() => Q(l)?.title ?? Q(o)?.title ?? t.room.book.title), d = q(() => n().phase === "pending" || n().phase === "unconfirmed"), f = Z(!1), p = Z(!1), m = Z(""), h = Z(""), _ = Z(""), v = !0;
	re(() => {
		Q(_) && (!Q(o) || Q(o).id !== Q(_) || (Q(f) ? JSON.stringify([Q(o).id, Q(o).title]) : Je(Q(o))) !== Q(h)) && (F(f, !1), F(p, !1), F(_, ""));
	});
	function b(e) {
		v && !Q(d) && Q(o) && (F(_, Q(o).id, !0), F(h, e === "rename" ? JSON.stringify([Q(o).id, Q(o).title]) : Je(Q(o)), !0), F(m, Q(o).title, !0), F(f, e === "rename"), F(p, e === "delete"));
	}
	function x() {
		return v && !!Q(o) && Q(o).id === Q(_) && (Q(f) ? JSON.stringify([Q(o).id, Q(o).title]) : Je(Q(o))) === Q(h) && t.room.members.includes(t.room.me);
	}
	async function S(e) {
		if (e.preventDefault(), !Q(f) || !x() || Q(d) || !Q(m).trim()) return;
		let n = Q(_);
		await t.owner.run({
			t: "epic.rename",
			id: Q(_),
			title: Q(m)
		}) && v && Q(_) === n && F(f, !1);
	}
	async function w() {
		if (!Q(p) || !x() || Q(d)) return;
		let e = Q(_);
		await t.owner.run({
			t: "epic.del",
			id: Q(_)
		}) && v && Q(_) === e && F(p, !1);
	}
	c(() => {
		v = !1;
	});
	var E = ko(), O = $(E), A = z(O), j = (e) => {
		yo(e, {
			get title() {
				return Q(u);
			},
			get src() {
				return t.roomIcon;
			},
			get tint() {
				return t.roomTint;
			}
		});
	}, M = (e) => {
		{
			let n = q(() => Q(o)?.owner ? t.vb.avatarUrl?.(Q(o).owner) : void 0);
			Hn(e, {
				get name() {
					return Q(u);
				},
				get src() {
					return Q(n);
				}
			});
		}
	};
	C(A, (e) => {
		!Q(o) && !Q(l) ? e(j) : e(M, -1);
	});
	var N = J(A, 2);
	Gn(N, {
		level: 2,
		class: "tw:min-w-0 tw:flex-1",
		children: (e, n) => {
			{
				let n = q(() => t.room.book.summary || Q(u));
				k(e, {
					get id() {
						return t.titleId;
					},
					variant: "ghost",
					class: "tw:min-w-0 tw:flex-1 tw:justify-start tw:truncate tw:font-semibold tw:md:flex-none",
					get title() {
						return Q(n);
					},
					onclick: (e) => {
						e.currentTarget.isConnected && (matchMedia("(max-width: 900px)").matches ? t.onopenside() : Q(l) || (Q(o) ? b("rename") : t.onrenameroom()));
					},
					children: (e, t) => {
						Y();
						var n = g();
						I(() => s(n, Q(u))), P(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		},
		$$slots: { default: !0 }
	});
	var L = J(N, 2);
	{
		let e = q(() => t.vb.t("Trocar de conversa"));
		Nt(L, {
			icon: "chevronDown",
			get label() {
				return Q(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && t.onopenside();
			}
		});
	}
	var V = J(L, 2), H = (e) => {
		var n = To(), r = B(n);
		I((e) => s(r, `✦ ${e ?? ""}`), [() => t.vb.t("sugestão do @vibe")]), P(e, n);
	}, ee = (e) => {
		var n = To(), r = B(n, !0);
		I(() => s(r, t.room.book.folder)), P(e, n);
	};
	C(V, (e) => {
		Q(l) ? e(H) : t.room.book.folder && !Q(o) && e(ee, 1);
	});
	var te = J(V, 2), ne = (e) => {
		var n = Eo(), r = $(n);
		{
			let e = q(() => t.vb.t("Renomear"));
			Nt(r, {
				icon: "pencil",
				get disabled() {
					return Q(d);
				},
				get label() {
					return Q(e);
				},
				onclick: () => b("rename")
			});
		}
		var i = J(r, 2);
		{
			let e = q(() => Q(o).archived ? "undo" : "check"), n = q(() => t.vb.t(Q(o).archived ? "Desarquivar épico" : "Arquivar épico"));
			Nt(i, {
				get icon() {
					return Q(e);
				},
				get disabled() {
					return Q(d);
				},
				get label() {
					return Q(n);
				},
				onclick: (e) => {
					v && e.currentTarget.isConnected && Q(o) && t.owner.run({
						t: "epic.archive",
						id: Q(o).id,
						archived: !Q(o).archived
					});
				}
			});
		}
		var a = J(i, 2);
		{
			let e = q(() => t.vb.t("Apagar épico"));
			Nt(a, {
				icon: "trash",
				get disabled() {
					return Q(d);
				},
				get label() {
					return Q(e);
				},
				onclick: () => b("delete")
			});
		}
		P(e, n);
	};
	C(te, (e) => {
		Q(o) && e(ne);
	}), wo(J(te, 2), {
		get owner() {
			return t.owner;
		},
		get t() {
			return t.vb.t;
		}
	}), W(O);
	var K = J(O, 2);
	{
		let e = q(() => t.vb.t("Nome do épico:")), n = q(() => t.vb.t("Cancelar"));
		Mt(K, {
			get title() {
				return Q(e);
			},
			get closeLabel() {
				return Q(n);
			},
			get open() {
				return Q(f);
			},
			set open(e) {
				F(f, e, !0);
			},
			children: (e, n) => {
				var r = Oo(), i = z(r);
				Kn(i, {
					children: (e, n) => {
						Y();
						var r = Do(), i = $(r, !0), a = J(i);
						Wn(a, {
							maxlength: 200,
							get disabled() {
								return Q(d);
							},
							required: !0,
							get value() {
								return Q(m);
							},
							set value(e) {
								F(m, e, !0);
							}
						}), I((e) => s(i, e), [() => t.vb.t("Nome do épico:")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
				var a = J(i);
				{
					let e = q(() => Q(d) || !Q(m).trim());
					k(a, {
						type: "submit",
						get disabled() {
							return Q(e);
						},
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Salvar")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				W(r), D("submit", r, S), P(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var ie = J(K, 2);
	{
		let e = q(() => t.vb.t("Apagar épico")), r = q(() => t.vb.t("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: Q(o)?.title ?? "" })), i = q(() => t.vb.t("Apagar")), a = q(() => t.vb.t("Cancelar")), s = q(() => n().phase === "pending"), c = q(() => Q(d) || !x());
		Vn(ie, {
			get title() {
				return Q(e);
			},
			get description() {
				return Q(r);
			},
			get confirmLabel() {
				return Q(i);
			},
			get cancelLabel() {
				return Q(a);
			},
			get busy() {
				return Q(s);
			},
			get confirmDisabled() {
				return Q(c);
			},
			onconfirm: w,
			get open() {
				return Q(p);
			},
			set open(e) {
				F(p, e, !0);
			}
		});
	}
	P(e, E), U(), i();
}
// svelte/features/room-sidebar/SandboxPresenceRows.svelte
var jo = h("<span aria-hidden=\"true\">☁</span><span class=\"tw:min-w-0 tw:flex-1\"><span class=\"tw:block tw:truncate\"> </span><small class=\"tw:block tw:text-xs tw:text-muted-foreground\"> </small></span><span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1);
function Mo(e, n) {
	R(n, !0);
	let r = v(n, "locale", 3, "pt-BR");
	var i = t(), a = $(i);
	l(a, 17, () => n.presence.sandboxes, (e) => e.id, (e, t) => {
		let i = q(() => fr(Q(t), Date.now()));
		k(e, {
			variant: "ghost",
			class: "tw:h-auto tw:w-full tw:justify-start tw:gap-2 tw:whitespace-normal tw:text-left",
			onclick: (e) => {
				e.currentTarget.isConnected && n.onopen();
			},
			children: (e, a) => {
				var o = jo(), c = J($(o)), l = z(c), u = B(l, !0), d = J(l), f = B(d);
				W(c);
				var p = J(c), m = B(p, !0);
				I((e, t, n, r) => {
					s(u, e), s(f, `${t ?? ""} · ${n ?? ""}`), s(m, r);
				}, [
					() => Q(t).name || n.t("sandbox"),
					() => n.name(Q(t).email).split(" ")[0],
					() => lt(Q(t).state, r().startsWith("en") ? "en" : "pt"),
					() => Q(i) === null ? ut(r().startsWith("en") ? "en" : "pt", "costUnknown") : new Intl.NumberFormat(r(), {
						style: "currency",
						currency: "USD"
					}).format(Q(i))
				]), P(e, o);
			},
			$$slots: { default: !0 }
		});
	}), P(e, i), U();
}
// svelte/Sidebar.svelte
var No = h("<!><!><!>", 1), Po = h("<span role=\"img\"><!></span>"), Fo = h("<!> <a href=\"/app?ui=svelte\" data-nav=\"\" class=\"tw:rounded-control tw:p-2 tw:text-center tw:text-foreground tw:no-underline tw:hover:bg-muted\">←</a> <!> <!> <!> <!> <!> <!>", 1), Io = h("<button type=\"button\" class=\"tw:mx-auto tw:h-5 tw:w-12 tw:rounded-full tw:border-0 tw:bg-muted tw:min-[901px]:hidden\"></button>"), Lo = h("<!><span class=\"tw:flex-1 tw:truncate\"> </span><!><span> </span>", 1), Ro = h("<div class=\"tw:min-[901px]:hidden\"><!></div>"), zo = h("<!> <!> <div class=\"tw:flex tw:items-center tw:gap-2\"><a href=\"/app?ui=svelte\" data-nav=\"\" class=\"tw:flex-1 tw:text-muted-foreground tw:no-underline tw:hover:text-foreground\">← vibebooks</a><!></div> <div class=\"tw:flex tw:items-center tw:gap-1\"><!><!></div> <!> <!> <!> <!>  <!> <!>", 1), Bo = h("<section data-vb-native=\"\" data-native-room-sidebar=\"\" class=\"tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:p-2 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground\"><!></section>");
function Vo(e, t) {
	R(t, !0);
	let n = v(t, "foldOpen", 23, () => ({
		off: !1,
		friends: null
	})), r = v(t, "friends", 19, () => []), i = v(t, "collapsed", 3, !1), a = v(t, "presence", 19, () => ({
		agents: [],
		sandboxes: []
	})), u = v(t, "ontogglerail", 3, () => {}), d = v(t, "onrenameroom", 3, () => {}), p = v(t, "onopenside", 3, () => {}), m = v(t, "onagents", 3, () => {}), h = v(t, "inboxOpen", 3, !1), _ = v(t, "hideSheetHandle", 3, !1), y = G(() => !!t.mutations), b = G(() => t.mutations ?? Bi(t.room.me, t.room.id)), T = !0, E = Z(null);
	function D(e) {
		if (!T) return;
		let n = t.room.me, r = t.room.id;
		t.navigation.state.update((e) => ({
			...e,
			archived: !1
		})), t.onarchchange(!1), u()(), ie().then(() => {
			T && t.room.me === n && t.room.id === r && !i() && (document.activeElement === document.body || document.activeElement === e) && Q(E)?.querySelector("#newEpic input")?.focus();
		});
	}
	re(() => b.sync(t.room, t.request)), c(() => {
		T = !1, y || b.dispose();
	});
	function O(e) {
		T && (t.onthreadintent?.() ?? !0) && t.onopen(e);
	}
	function A(e) {
		return { destroy: t.mountSheetHandle?.(e) };
	}
	var V = Bo(), H = z(V), ee = (e) => {
		var n = Fo(), r = $(n);
		{
			let e = q(() => t.vb.t("Abrir menu"));
			Nt(r, {
				icon: "sidebar",
				get label() {
					return Q(e);
				},
				"aria-expanded": "false",
				get onclick() {
					return u();
				}
			});
		}
		var i = J(r, 2), a = J(i, 2), o = (e) => {
			{
				let n = q(() => h() ? "secondary" : "ghost"), r = q(() => h() ? "page" : void 0), i = q(() => t.vb.t("Caixa de entrada"));
				Nt(e, {
					get variant() {
						return Q(n);
					},
					get "aria-current"() {
						return Q(r);
					},
					icon: "inbox",
					get label() {
						return Q(i);
					},
					onclick: (e) => {
						e.currentTarget.isConnected && t.oninbox?.(e.currentTarget);
					}
				});
			}
		};
		C(a, (e) => {
			t.oninbox && e(o);
		});
		var c = J(a, 2);
		l(c, 17, () => [{
			id: "main",
			title: t.room.book.title,
			tasks: [],
			owner: void 0
		}, ...t.room.epics.filter((e) => !e.archived || e.id === t.thread)], (e) => e.id, (e, n) => {
			{
				let r = q(() => !h() && t.thread === Q(n).id ? "secondary" : "ghost"), i = q(() => S("tw:h-auto tw:flex-col tw:gap-1 tw:border-l-4 tw:border-l-transparent tw:p-1", !h() && t.thread === Q(n).id && "tw:border-l-primary")), a = q(() => !h() && t.thread === Q(n).id ? "page" : void 0);
				k(e, {
					get variant() {
						return Q(r);
					},
					get class() {
						return Q(i);
					},
					get "aria-current"() {
						return Q(a);
					},
					get title() {
						return Q(n).title;
					},
					onclick: (e) => {
						e.currentTarget.isConnected && O(Q(n).id);
					},
					children: (e, r) => {
						var i = No(), a = $(i), o = (e) => {
							yo(e, {
								get title() {
									return t.room.book.title;
								},
								get src() {
									return t.roomIcon;
								},
								get tint() {
									return t.roomTint;
								}
							});
						}, s = (e) => {
							{
								let r = q(() => Q(n).owner ? t.vb.name(Q(n).owner) : Q(n).title), i = q(() => Q(n).owner ? t.vb.avatarUrl?.(Q(n).owner) : void 0);
								Hn(e, {
									get name() {
										return Q(r);
									},
									get src() {
										return Q(i);
									}
								});
							}
						};
						C(a, (e) => {
							Q(n).id === "main" ? e(o) : e(s, -1);
						});
						var c = J(a), l = (e) => {
							{
								let r = q(() => Q(n).tasks.filter((e) => e.done).length), i = q(() => t.vb.t("Tarefas"));
								Zn(e, {
									get value() {
										return Q(r);
									},
									get max() {
										return Q(n).tasks.length;
									},
									get label() {
										return Q(i);
									}
								});
							}
						};
						C(c, (e) => {
							Q(n).tasks.length && e(l);
						});
						var u = J(c);
						{
							let e = q(() => t.vb.waitsIn(Q(n).id)), r = q(() => t.vb.t("Tarefa sua pendente"));
							It(u, {
								get waits() {
									return Q(e);
								},
								label: (e) => t.vb.t("{n} coisas esperando você", { n: e }),
								get taskLabel() {
									return Q(r);
								}
							});
						}
						P(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		});
		var d = J(c, 2);
		{
			let e = q(() => t.vb.t("Novo épico"));
			Nt(d, {
				icon: "plus",
				get label() {
					return Q(e);
				},
				onclick: (e) => D(e.currentTarget)
			});
		}
		var p = J(d, 2), m = (e) => {
			{
				let n = q(() => t.vb.t("{n} pedindo pra entrar", { n: t.room.requests.length }));
				k(e, {
					variant: "outline",
					get title() {
						return Q(n);
					},
					get onclick() {
						return u();
					},
					children: (e, n) => {
						Y();
						var r = g();
						I(() => s(r, `+${t.room.requests.length ?? ""}`)), P(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		C(p, (e) => {
			t.room.requests?.length && e(m);
		});
		var _ = J(p, 2);
		l(_, 17, () => t.room.members.slice(0, 8), w, (e, n) => {
			var r = Po(), i = z(r);
			{
				let e = q(() => t.vb.name(Q(n))), r = q(() => t.vb.avatarUrl?.(Q(n)));
				Hn(i, {
					get name() {
						return Q(e);
					},
					get src() {
						return Q(r);
					}
				});
			}
			W(r), I((e, t) => {
				j(r, "aria-label", e), N(r, 1, t);
			}, [() => `${t.vb.name(Q(n))}${t.room.online.includes(Q(n)) ? ` · ${t.vb.t("online")}` : ""}`, () => f(t.room.online.includes(Q(n)) ? "tw:rounded-full tw:ring-2 tw:ring-success" : "tw:rounded-full")]), P(e, r);
		}), wo(J(_, 2), {
			get owner() {
				return b;
			},
			get t() {
				return t.vb.t;
			}
		}), I((e) => j(i, "aria-label", e), [() => t.vb.t("Seus vibebooks")]), P(e, n);
	}, te = (e) => {
		let i = (e, n = L) => {
			rt(e, {
				get presence() {
					return a();
				},
				get email() {
					return n();
				},
				get t() {
					return t.vb.t;
				},
				get name() {
					return t.vb.name;
				},
				get ago() {
					return t.vb.ago;
				},
				get locale() {
					return t.locale;
				}
			});
		}, c = (e) => {
			Mo(e, {
				get presence() {
					return a();
				},
				get t() {
					return t.vb.t;
				},
				get name() {
					return t.vb.name;
				},
				get onopen() {
					return m();
				},
				get locale() {
					return t.locale;
				}
			});
		};
		var l = zo(), v = $(l), y = (e) => {
			var n = Io();
			M(n, (e) => A?.(e)), I((e) => j(n, "aria-label", e), [() => t.vb.t("Fechar")]), o("click", n, function(...e) {
				p()?.apply(this, e);
			}), P(e, n);
		};
		C(v, (e) => {
			_() || e(y);
		});
		var x = J(v, 2), S = (e) => {
			ba(e, {
				get controller() {
					return t.appNavigation.controller;
				},
				get lang() {
					return t.appNavigation.lang;
				}
			});
		};
		C(x, (e) => {
			t.appNavigation && e(S);
		});
		var w = J(x, 2), T = J(z(w));
		{
			let e = q(() => t.vb.t("Recolher menu"));
			Nt(T, {
				icon: "sidebar",
				get label() {
					return Q(e);
				},
				"aria-expanded": "true",
				get onclick() {
					return u();
				}
			});
		}
		W(w);
		var E = J(w, 2), D = z(E);
		{
			let e = q(() => !h() && t.thread === "main" ? "secondary" : "ghost");
			k(D, {
				get variant() {
					return Q(e);
				},
				class: "tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2",
				onclick: (e) => {
					e.currentTarget.isConnected && O("main");
				},
				children: (e, n) => {
					var r = Lo(), i = $(r);
					yo(i, {
						get title() {
							return t.room.book.title;
						},
						get src() {
							return t.roomIcon;
						},
						get tint() {
							return t.roomTint;
						}
					});
					var a = J(i), o = B(a, !0), c = J(a);
					{
						let e = q(() => t.vb.waitsIn("main")), n = q(() => t.vb.t("Tarefa sua pendente"));
						It(c, {
							get waits() {
								return Q(e);
							},
							label: (e) => t.vb.t("{n} coisas esperando você", { n: e }),
							get taskLabel() {
								return Q(n);
							}
						});
					}
					var l = J(c), u = B(l, !0);
					I((e) => {
						s(o, t.room.book.title), N(l, 1, f(!h() && t.thread === "main" ? "tw:text-xs tw:text-secondary-foreground" : "tw:text-xs tw:text-muted-foreground")), s(u, e);
					}, [() => wt(t.room, "main")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var F = J(D);
		{
			let e = q(() => t.vb.t("Renomear"));
			Nt(F, {
				icon: "pencil",
				get label() {
					return Q(e);
				},
				get onclick() {
					return d();
				}
			});
		}
		W(E);
		var R = J(E, 2), V = (e) => {
			var n = Ro();
			Ao(z(n), {
				get room() {
					return t.room;
				},
				get thread() {
					return t.thread;
				},
				get owner() {
					return b;
				},
				get vb() {
					return t.vb;
				},
				get roomIcon() {
					return t.roomIcon;
				},
				get roomTint() {
					return t.roomTint;
				},
				get onopenside() {
					return p();
				},
				get onrenameroom() {
					return d();
				}
			}), W(n), P(e, n);
		}, H = q(() => t.thread !== "main" && !t.thread.startsWith("pre:"));
		C(R, (e) => {
			Q(H) && e(V);
		});
		var ee = J(R, 2), U = (e) => {
			{
				let n = q(() => h() ? "secondary" : "ghost"), r = q(() => h() ? "page" : void 0);
				k(e, {
					get variant() {
						return Q(n);
					},
					get "aria-current"() {
						return Q(r);
					},
					class: "tw:justify-start",
					onclick: (e) => {
						e.currentTarget.isConnected && t.oninbox?.(e.currentTarget);
					},
					children: (e, n) => {
						Y();
						var r = g();
						I((e) => s(r, e), [() => t.vb.t("Caixa de entrada")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		C(ee, (e) => {
			t.oninbox && e(U);
		});
		var te = J(ee, 2);
		{
			let e = q(() => ({
				t: t.vb.t,
				name: t.vb.name,
				epicBusy: t.vb.epicBusy,
				waitsIn: t.vb.waitsIn
			}));
			ao(te, {
				get room() {
					return t.room;
				},
				get thread() {
					return t.thread;
				},
				get selectionDisabled() {
					return h();
				},
				get onBeforeOpen() {
					return t.onthreadintent;
				},
				get session() {
					return t.navigation;
				},
				get mutations() {
					return b;
				},
				get onarchchange() {
					return t.onarchchange;
				},
				onopen: O,
				get vb() {
					return Q(e);
				}
			});
		}
		var ne = J(te, 2);
		go(ne, {
			get room() {
				return t.room;
			},
			get session() {
				return t.pins;
			},
			get send() {
				return t.send;
			},
			get request() {
				return t.request;
			},
			get onopenfile() {
				return t.onopenpinfile;
			},
			get onopenapp() {
				return t.onopenpinapp;
			},
			get t() {
				return t.vb.t;
			}
		});
		var G = J(ne, 2);
		{
			let e = q(() => ({
				t: t.vb.t,
				name: t.vb.name,
				ago: t.vb.ago,
				avatarUrl: t.vb.avatarUrl
			}));
			Ga(G, {
				get room() {
					return t.room;
				},
				get friends() {
					return r();
				},
				get foldOpen() {
					return n();
				},
				get vb() {
					return Q(e);
				},
				get agents() {
					return i;
				},
				get sandboxes() {
					return c;
				},
				onfoldchange: (e, t) => {
					n()[e] = t;
				}
			});
		}
		wo(J(G, 2), {
			get owner() {
				return b;
			},
			get t() {
				return t.vb.t;
			}
		}), P(e, l);
	};
	C(H, (e) => {
		i() ? e(ee) : e(te, -1);
	}), W(V), x(V, (e) => F(E, e), () => Q(E)), P(e, V), U();
}
i(["click"]);
// svelte/features/chat-interactive/deferred.ts
var Ho = (e, t) => JSON.stringify([
	e.id,
	e.me,
	t.id,
	t.thread,
	t.author,
	t.kind
]);
function Uo(e, t) {
	let n = Zt(e, t.id);
	return !!n && e.members.includes(e.me) && !!(t.card || t.choices || t.poll) && Jt(e, n) && Ho(e, n) === Ho(e, t) && n.card === t.card && n.choices === t.choices && n.poll === t.poll && n.text === t.text;
}
function Wo(e, t, n) {
	let r = e(), i = Ho(r.room, r.message), a = !0, o = () => {
		if (!a) return !1;
		let t = e();
		return i === Ho(t.room, t.message) && Uo(t.room, t.message);
	}, s = vr(t, {
		current: o,
		clock: n
	});
	return {
		...s,
		current: o,
		dispose() {
			a = !1, s.dispose();
		}
	};
}
// svelte/features/chat-interactive/InteractivePresentation.svelte
var Go = h("<div><!></div>");
function Ko(e, r) {
	R(r, !0);
	let i = () => T(l, "$view", a), [a, o] = y(), s = G(() => Wo(() => ({
		room: r.room,
		message: r.message
	}), r.load)), l = s.state, u = q(() => i().component), d = q(() => s.current()), f = {
		...G(() => r.actions),
		request: (e) => s.current() ? r.actions.request(e) : Promise.resolve({
			ok: !1,
			error: "stale target"
		}),
		draftReply: (e) => {
			s.current() && r.actions.draftReply(e);
		},
		navigate: (e, t) => {
			s.current() && r.actions.navigate(e, t);
		},
		navigateRich: (e) => {
			s.current() && r.actions.navigateRich?.(e);
		},
		openApp: (e) => {
			s.current() && r.actions.openApp?.(e);
		}
	};
	re(() => {
		Q(d) && s.ensure();
	}), c(() => s.dispose());
	var p = t(), m = $(p), h = (e) => {
		var a = Go(), o = z(a), c = (e) => {
			var i = t(), a = $(i);
			n(a, () => Q(u), (e, t) => {
				t(e, {
					get room() {
						return r.room;
					},
					get message() {
						return r.message;
					},
					get actions() {
						return f;
					},
					get vb() {
						return r.vb;
					}
				});
			}), P(e, i);
		}, l = (e) => {
			{
				let t = q(() => r.vb.locale?.startsWith("en") ? "en" : "pt"), n = q(() => r.vb.locale?.startsWith("en") ? "Interactive message" : "Mensagem interativa");
				Cr(e, {
					get phase() {
						return i().phase;
					},
					get lang() {
						return Q(t);
					},
					get label() {
						return Q(n);
					},
					retry: () => {
						s.retry();
					},
					get current() {
						return s.current;
					}
				});
			}
		};
		C(o, (e) => {
			Q(u) ? e(c) : e(l, -1);
		}), W(a), I(() => {
			j(a, "data-native-interactive-state", i().phase), j(a, "aria-busy", i().phase !== "ready");
		}), P(e, a);
	};
	C(m, (e) => {
		Q(d) && e(h);
	}), P(e, p), U(), o();
}
// svelte/features/chat-interactive/DeferredInteractiveBody.svelte
function qo(n, r) {
	R(r, !0);
	let i = v(r, "load", 3, () => import("./InteractiveBody-5zgps4lV.js").then((e) => e.default));
	var a = t(), o = $(a);
	e(o, () => Ho(r.room, r.message), (e) => {
		Ko(e, {
			get room() {
				return r.room;
			},
			get message() {
				return r.message;
			},
			get actions() {
				return r.actions;
			},
			get vb() {
				return r.vb;
			},
			get load() {
				return i();
			}
		});
	}), P(n, a), U();
}
// svelte/features/chat/clipboard.ts
async function Jo(e) {
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.className = "tw:fixed tw:left-0 tw:top-0 tw:opacity-0 tw:text-base";
	let n = document.activeElement;
	document.body.append(t), t.focus({ preventScroll: !0 }), t.setSelectionRange(0, e.length);
	let r = !1;
	try {
		r = document.execCommand("copy");
	} catch {} finally {
		t.remove(), n instanceof HTMLElement && n.isConnected && n.focus({ preventScroll: !0 });
	}
	if (!r) {
		if (!navigator.clipboard) throw Error("clipboard unavailable");
		await navigator.clipboard.writeText(e);
	}
}
// svelte/features/chat/MessageActions.svelte
var Yo = h("<span role=\"status\" class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), Xo = h("<span role=\"alert\" class=\"tw:text-xs tw:text-destructive\"> </span><!>", 1), Zo = h("<div data-message-actions=\"\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-1\"><!> <!> <!> <!> <!></div>");
function Qo(e, t) {
	R(t, !0);
	let n = v(t, "showLink", 3, !0), r = Z(null), i = Z(!1), a = Z(!1), o = !0, l = 0;
	c(() => {
		o = !1, l++;
	});
	async function u(e = !1) {
		if (!o) return;
		F(a, e, !0);
		let n = ++l;
		F(r, null), F(i, !1);
		let s = e ? `${location.origin}/b/${t.roomId}${t.message.thread && t.message.thread !== "main" ? `?t=${encodeURIComponent(t.message.thread)}` : ""}#m${t.message.id}` : t.message.text || t.message.files?.map((e) => e.name).join("\n") || "";
		if (!s) F(r, "empty");
		else try {
			await Jo(s), o && n === l && (F(i, !0), navigator.vibrate?.(15));
		} catch {
			o && n === l && F(r, "clipboard");
		}
	}
	var d = { copy: u }, f = Zo(), p = z(f);
	{
		let e = q(() => t.vb.t("Copiar o texto desta mensagem"));
		Nt(p, {
			icon: "copy",
			get label() {
				return Q(e);
			},
			get "data-native-copy"() {
				return t.message.id;
			},
			onclick: () => {
				u();
			}
		});
	}
	var m = J(p, 2), h = (e) => {
		{
			let n = q(() => t.vb.t("Copiar o link desta mensagem"));
			Nt(e, {
				icon: "link",
				get label() {
					return Q(n);
				},
				get "data-native-copylink"() {
					return t.message.id;
				},
				onclick: () => {
					u(!0);
				}
			});
		}
	};
	C(m, (e) => {
		n() && e(h);
	});
	var _ = J(m, 2);
	{
		let e = q(() => t.vb.t("Responder a esta mensagem"));
		Nt(_, {
			icon: "reply",
			get label() {
				return Q(e);
			},
			get "data-native-reply"() {
				return t.message.id;
			},
			onclick: () => {
				o && t.actions.reply(t.message.id);
			}
		});
	}
	var y = J(_, 2), b = (e) => {
		var n = Yo(), r = B(n, !0);
		I((e) => s(r, e), [() => t.vb.t("Copiado")]), P(e, n);
	};
	C(y, (e) => {
		Q(i) && e(b);
	});
	var x = J(y, 2), S = (e) => {
		var n = Xo(), i = $(n), o = B(i, !0), c = J(i), l = (e) => {
			k(e, {
				variant: "outline",
				size: "sm",
				onclick: () => {
					u(Q(a));
				},
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.vb.t("Copiar")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		C(c, (e) => {
			Q(r) === "clipboard" && e(l);
		}), I((e) => s(o, e), [() => t.vb.t(Q(r) === "empty" ? "Essa mensagem não tem texto pra copiar." : "O navegador pediu um toque pra copiar.")]), P(e, n);
	};
	return C(x, (e) => {
		Q(r) && e(S);
	}), W(f), P(e, f), U(d);
}
// svelte/features/chat/MessageFooter.svelte
var $o = h("<span aria-hidden=\"true\" class=\"tw:inline-block tw:animate-spin tw:motion-reduce:animate-none\">✻</span> ", 1), es = h("· <time> </time>", 1), ts = h("<span><!> <!></span>"), ns = h("<span class=\"tw:relative tw:inline-flex\"><!><span aria-hidden=\"true\" class=\"tw:absolute tw:-right-1 tw:-bottom-1 tw:rounded-full tw:bg-card tw:px-0.5 tw:text-xs\"> </span></span>"), rs = h("<span> </span>"), is = h("<!> <!><span aria-hidden=\"true\"> </span>", 1), as = h("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><span class=\"tw:min-w-0 tw:flex-1 tw:break-words\"> </span><span> </span></div>"), os = h("<div role=\"tooltip\" class=\"tw:absolute tw:bottom-full tw:left-0 tw:z-20 tw:mb-2 tw:w-72 tw:max-w-[80vw] tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-3 tw:text-popover-foreground tw:shadow-md\"></div>"), ss = h("<div role=\"group\" class=\"tw:relative\"><!> <!></div>"), cs = h("<div data-message-footer=\"\" class=\"tw:mt-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!></div>");
function ls(e, t) {
	let n = m();
	R(t, !0);
	let r = Z(!1), i = Z(!1), a = Z(!1), o = Z(!1), c = q(() => !Q(o) && (Q(r) || Q(i) || Q(a))), u = q(() => t.footer.readers.filter((e) => e.read).length), d = q(() => Q(u) === t.footer.readers.length ? t.vb.t("visto por {n}", { n: Q(u) }) : t.vb.t("visto por {n} de {m}", {
		n: Q(u),
		m: t.footer.readers.length
	})), p = (e, n) => t.vb.t("{via} de {who}", {
		via: nt(e),
		who: t.vb.name(n)
	});
	var h = cs(), _ = z(h);
	l(_, 17, () => t.footer.statuses, (e) => `${e.ack.who}|${e.ack.email}`, (e, n) => {
		var r = ts(), i = z(r), a = (e) => {
			var r = g();
			I((e) => s(r, `⏸ ${e ?? ""}${Q(n).ack.note ? `: ${Q(n).ack.note}` : ""}`), [() => t.vb.t("{who} espera você no terminal", { who: p(Q(n).ack.who, Q(n).ack.email) })]), P(e, r);
		}, o = (e) => {
			var r = $o(), i = J($(r));
			I((e) => s(i, ` ${e ?? ""}`), [() => t.vb.t("{who} está fazendo isso", { who: p(Q(n).ack.who, Q(n).ack.email) })]), P(e, r);
		}, c = (e) => {
			var r = g();
			I((e) => s(r, `✓ ${e ?? ""}`), [() => t.vb.t("{who} fez isso", { who: p(Q(n).ack.who, Q(n).ack.email) })]), P(e, r);
		}, l = (e) => {
			var r = g();
			I((e) => s(r, `⏳ ${e ?? ""}`), [() => t.vb.t("aguardando {who}", { who: Q(n).owners.map(t.vb.name).join(", ") })]), P(e, r);
		}, u = (e) => {
			var r = g();
			I((e) => s(r, `– ${e ?? ""}`), [() => t.vb.t("{who} parou", { who: p(Q(n).ack.who, Q(n).ack.email) })]), P(e, r);
		};
		C(i, (e) => {
			Q(n).kind === "blocked" ? e(a) : Q(n).kind === "doing" ? e(o, 1) : Q(n).kind === "done" ? e(c, 2) : Q(n).kind === "waiting" ? e(l, 3) : e(u, -1);
		});
		var d = J(i, 2), m = (e) => {
			var r = es(), i = J($(r)), a = B(i, !0);
			I((e, t) => {
				j(i, "title", e), s(a, t);
			}, [() => t.vb.dateTime?.(Q(n).ack.ts), () => t.vb.ago(Q(n).ack.ts)]), P(e, r);
		}, h = q(() => [
			"blocked",
			"doing",
			"idle"
		].includes(Q(n).kind));
		C(d, (e) => {
			Q(h) && e(m);
		}), W(r), I(() => {
			j(r, "data-ack-state", Q(n).kind), N(r, 1, f(Q(n).kind === "blocked" ? "tw:whitespace-pre-wrap tw:break-words tw:text-warning" : "tw:whitespace-pre-wrap tw:break-words"));
		}), P(e, r);
	});
	var v = J(_, 2), y = (e) => {
		var f = ss(), m = z(f);
		{
			let e = q(() => `${n}-readers`), i = q(() => Q(c) ? `${n}-readers` : void 0);
			k(m, {
				variant: "ghost",
				size: "sm",
				class: "tw:h-auto tw:gap-1 tw:px-1 tw:py-1",
				get "aria-label"() {
					return Q(d);
				},
				get "aria-expanded"() {
					return Q(c);
				},
				get "aria-controls"() {
					return Q(e);
				},
				get "aria-describedby"() {
					return Q(i);
				},
				onfocus: () => {
					F(a, !0), F(o, !1);
				},
				onblur: () => {
					F(a, !1), F(r, !1);
				},
				onclick: () => {
					F(r, !Q(r)), F(o, !Q(r));
				},
				onkeydown: (e) => {
					e.key === "Escape" && (F(o, !0), F(r, !1), e.stopPropagation());
				},
				children: (e, n) => {
					var r = is(), i = $(r);
					l(i, 17, () => t.footer.readers.slice(0, 5), (e) => `${e.receipt.who}|${e.receipt.email}`, (e, n) => {
						var r = ns(), i = z(r);
						{
							let e = q(() => t.vb.name(Q(n).receipt.email)), r = q(() => t.vb.avatarUrl?.(Q(n).receipt.email));
							Hn(i, {
								get name() {
									return Q(e);
								},
								get src() {
									return Q(r);
								},
								class: "tw:size-6"
							});
						}
						var a = J(i), o = B(a, !0);
						W(r), I((e) => {
							j(r, "data-reader-read", Q(n).read), s(o, e);
						}, [() => Ye(Q(n).receipt.who)]), P(e, r);
					});
					var a = J(i, 2), o = (e) => {
						var n = rs(), r = B(n);
						I(() => s(r, `+${t.footer.readers.length - 5}`)), P(e, n);
					};
					C(a, (e) => {
						t.footer.readers.length > 5 && e(o);
					});
					var c = J(a), d = B(c, !0);
					I(() => s(d, Q(u) ? "✓✓" : "✓")), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var h = J(m, 2), g = (e) => {
			var r = os();
			l(r, 21, () => t.footer.readers, (e) => `${e.receipt.who}|${e.receipt.email}`, (e, n) => {
				var r = as(), i = z(r);
				{
					let e = q(() => t.vb.name(Q(n).receipt.email)), r = q(() => t.vb.avatarUrl?.(Q(n).receipt.email));
					Hn(i, {
						get name() {
							return Q(e);
						},
						get src() {
							return Q(r);
						},
						class: "tw:size-6"
					});
				}
				var a = J(i), o = B(a, !0), c = J(a), l = B(c, !0);
				W(r), I((e, t) => {
					s(o, e), s(l, t);
				}, [() => p(Q(n).receipt.who, Q(n).receipt.email), () => t.vb.t(Q(n).read ? "leu" : "recebeu")]), P(e, r);
			}), W(r), I(() => j(r, "id", `${n}-readers`)), P(e, r);
		};
		C(h, (e) => {
			Q(c) && e(g);
		}), W(f), I(() => j(f, "aria-label", Q(d))), D("pointerenter", f, () => {
			F(i, !0), F(o, !1);
		}), D("pointerleave", f, () => {
			F(i, !1);
		}), P(e, f);
	};
	C(v, (e) => {
		t.footer.readers.length && e(y);
	}), W(h), P(e, h), U();
}
// svelte/features/chat/Embed.svelte
var us = h("<iframe sandbox=\"allow-scripts\" loading=\"lazy\" class=\"tw:w-full tw:rounded-control tw:border tw:border-border\"></iframe>"), ds = h("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p>"), fs = h("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p> <!>", 1), ps = h("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), ms = h("<div role=\"group\" class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><p class=\"tw:m-0\"> </p> <q class=\"tw:block tw:break-words tw:text-xs tw:text-muted-foreground\"> </q> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div></div>"), hs = h("<div data-chat-embed=\"\" class=\"tw:w-full tw:space-y-2\"><!> <!> <a class=\"tw:inline-flex tw:items-center tw:gap-1 tw:rounded-control tw:text-xs tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </a> <!> <!></div>");
function gs(n, r) {
	R(r, !0);
	let i = () => T(E, "$question", a), [a, l] = y(), u = Z(320), d = Z(!1), f = !0, p = 0, m = Z(0), h = Z(!1), v = Z(!1), b = Z(te(G(() => !r.actions.mountEmbed))), x = Z(te(G(() => !r.actions.mountEmbed))), S = q(() => (Q(m), Dn())), w = yn(() => f && !Q(h) && !Q(b) && !Q(v)), E = w.question, D = w.ask;
	function O(e) {
		let t = ++p, n = () => f && p === t && e.isConnected, i = r.actions.mountEmbed?.(e, r.file, {
			ask: (e, t) => n() ? D(e, t) : Promise.resolve(!1),
			ready: () => {
				n() && !Q(h) && !Q(b) && !Q(v) && F(x, !0);
			},
			cancel: () => {
				n() && w.cancel();
			},
			deny: () => {
				n() && (F(h, !0), w.cancel());
			},
			fail: () => {
				n() && (F(b, !0), w.cancel());
			},
			revoked: () => {
				n() && F(v, !0);
			},
			thread: r.messageThread,
			resize: (e) => {
				if (!n() || Q(h) || Q(b) || Q(v) || !Number.isFinite(e)) return;
				let t = Math.min(420, Math.round(window.innerHeight * .55)), r = Math.max(Math.ceil(e) + 2, 40);
				F(u, Math.min(r, t), !0), F(d, r > t);
			}
		});
		return { destroy() {
			p === t && (p++, w.cancel()), i?.();
		} };
	}
	c(() => {
		f = !1, p++, w.dispose();
	});
	function A(e, t) {
		f && t === Q(m) && Q(b) && !Q(h) && r.actions.mountEmbed && e.currentTarget && e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected && (p++, w.cancel(), F(b, !1), F(v, !1), F(x, !1), F(u, 320), F(d, !1), oe(m));
	}
	function N(e) {
		e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.stopPropagation(), f && r.actions.openFile(r.file));
	}
	var V = hs(), H = z(V), ee = (n) => {
		var i = t(), a = $(i);
		e(a, () => Q(m), (e) => {
			var t = us();
			M(t, (e) => O?.(e)), I(() => {
				j(t, "name", Q(S)), j(t, "hidden", Q(b)), j(t, "aria-busy", !Q(x)), j(t, "title", r.file.name), j(t, "height", Q(u));
			}), _(t), P(e, t);
		}), P(n, i);
	}, ne = (e) => {
		var t = ds(), n = B(t, !0);
		I((e) => s(n, e), [() => r.vb.t("Você não tem acesso a esta sala.")]), P(e, t);
	};
	C(H, (e) => {
		Q(h) ? e(ne, -1) : e(ee);
	});
	var K = J(H, 2), re = (n) => {
		var i = fs(), a = $(i), o = B(a, !0), c = J(a, 2), l = (n) => {
			var i = t(), a = $(i);
			e(a, () => Q(m), (e) => {
				Pt(e, {
					get value() {
						return Q(m);
					},
					children: (e, t = L) => {
						k(e, {
							variant: "outline",
							onclick: (e) => A(e, t()),
							children: (e, t) => {
								Y();
								var n = g();
								I((e) => s(n, e), [() => r.vb.locale?.startsWith("en") ? "Reopen app" : "Abrir app de novo"]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					},
					$$slots: { default: !0 }
				});
			}), P(n, i);
		};
		C(c, (e) => {
			r.actions.mountEmbed && !Q(h) && e(l);
		}), I((e) => s(o, e), [() => Q(v) ? r.vb.locale?.startsWith("en") ? "This app document closed. Reopen the app to continue." : "O documento deste app foi fechado. Abra o app de novo para continuar." : r.vb.t("Não foi possível iniciar o app. Abra o arquivo para tentar de novo.")]), P(n, i);
	};
	C(K, (e) => {
		Q(b) && e(re);
	});
	var ie = J(K, 2), ae = B(ie), se = J(ie, 2), X = (e) => {
		var t = ps(), n = B(t, !0);
		I(() => s(n, r.file.name)), P(e, t);
	};
	C(se, (e) => {
		Q(d) && e(X);
	});
	var ce = J(se, 2), le = (n) => {
		var a = t(), o = $(a);
		e(o, i, (e) => {
			Pt(e, {
				get value() {
					return i();
				},
				children: (e, t = L) => {
					var n = ms(), i = z(n), a = B(i, !0), o = J(i, 2), c = B(o, !0), l = J(o, 2), u = z(l);
					k(u, {
						size: "sm",
						onclick: (e) => {
							e.currentTarget.isConnected && w.choose(t(), !0);
						},
						children: (e, t) => {
							Y();
							var n = g();
							I((e) => s(n, e), [() => r.vb.t("Permitir")]), P(e, n);
						},
						$$slots: { default: !0 }
					});
					var d = J(u);
					k(d, {
						size: "sm",
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && w.choose(t(), !1);
						},
						children: (e, t) => {
							Y();
							var n = g();
							I((e) => s(n, e), [() => r.vb.t("Cancelar")]), P(e, n);
						},
						$$slots: { default: !0 }
					}), W(l), W(n), I((e, r) => {
						j(n, "aria-label", e), s(a, r), s(c, t().detail);
					}, [() => r.vb.t("Confirmar"), () => r.vb.t("Este app quer {what}, como você:", { what: t().what })]), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}), P(n, a);
	};
	C(ce, (e) => {
		i() && e(le);
	}), W(V), I((e) => {
		j(ie, "href", r.url), s(ae, `${e ?? ""} ↗`);
	}, [() => r.vb.t("Abrir em tela cheia")]), o("click", ie, N), P(n, V), U(), l();
}
i(["click"]);
// svelte/features/chat/Attachments.svelte
var _s = h("<div class=\"tw:max-w-full tw:space-y-1\"><audio controls=\"\" preload=\"metadata\" class=\"tw:max-w-full\"></audio><a target=\"_blank\" rel=\"noopener\" class=\"tw:block tw:break-words tw:text-xs tw:text-link\"> </a></div>"), vs = h("<a data-message-image=\"\" target=\"_blank\" rel=\"noopener\" class=\"tw:block tw:min-w-[min(220px,100%)] tw:max-w-[min(320px,100%)] tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"><img loading=\"lazy\" class=\"tw:box-border tw:block tw:max-h-[260px] tw:min-w-full tw:max-w-full tw:rounded-control tw:border tw:border-border tw:object-cover tw:object-top\"/></a>"), ys = h("<a target=\"_blank\" rel=\"noopener\" class=\"tw:inline-flex tw:max-w-full tw:items-center tw:gap-2 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:px-3 tw:py-2 tw:text-sm tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"><!><span class=\"tw:min-w-0 tw:break-words\"> </span><small class=\"tw:shrink-0 tw:text-muted-foreground\"> </small></a>"), bs = h("<div data-message-attachments=\"\" class=\"tw:mt-2 tw:flex tw:flex-wrap tw:gap-2\"></div>");
function xs(e, n) {
	R(n, !0);
	let r = v(n, "files", 19, () => []), i = !0;
	c(() => {
		i = !1;
	});
	let a = (e) => `/api/books/${encodeURIComponent(n.roomId)}/files/${encodeURIComponent(e.id)}`;
	function u(e, t) {
		!i || !(e.currentTarget instanceof HTMLElement) || !e.currentTarget.isConnected ? e.preventDefault() : e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.preventDefault(), e.stopPropagation(), n.actions.openFile(t));
	}
	var d = t(), f = $(d), p = (e) => {
		var i = bs();
		l(i, 21, r, (e) => e.id, (e, r) => {
			var i = t(), c = $(i), l = (e) => {
				{
					let t = q(() => a(Q(r)));
					gs(e, {
						get url() {
							return Q(t);
						},
						get file() {
							return Q(r);
						},
						get messageThread() {
							return n.messageThread;
						},
						get actions() {
							return n.actions;
						},
						get vb() {
							return n.vb;
						}
					});
				}
			}, d = (e) => {
				var t = _s(), n = z(t), i = J(n), o = B(i);
				W(t), I((e, t, a) => {
					j(n, "src", e), j(i, "href", t), j(i, "download", Q(r).name), s(o, `${Q(r).name ?? ""} · ${a ?? ""}`);
				}, [
					() => a(Q(r)),
					() => a(Q(r)),
					() => Qt(Q(r).size)
				]), P(e, t);
			}, f = q(() => Q(r).type.startsWith("audio/")), p = (e) => {
				var t = vs(), n = B(t);
				I((e, i) => {
					j(t, "href", e), j(n, "src", i), j(n, "alt", Q(r).name);
				}, [() => a(Q(r)), () => a(Q(r))]), o("click", t, (e) => u(e, Q(r))), P(e, t);
			}, m = q(() => Q(r).type.startsWith("image/")), h = (e) => {
				var t = ys(), n = z(t);
				Yn(n, { name: "file" });
				var i = J(n), c = B(i, !0), l = J(i), d = B(l, !0);
				W(t), I((e, n) => {
					j(t, "href", e), s(c, Q(r).name), s(d, n);
				}, [() => a(Q(r)), () => Qt(Q(r).size)]), o("click", t, (e) => u(e, Q(r))), P(e, t);
			};
			C(c, (e) => {
				Q(r).embed ? e(l) : Q(f) ? e(d, 1) : Q(m) ? e(p, 2) : e(h, -1);
			}), P(e, i);
		}), W(i), P(e, i);
	};
	C(f, (e) => {
		r().length && e(p);
	}), P(e, d), U();
}
i(["click"]);
// svelte/features/room-sidebar/ThreadCards.svelte
var Ss = h("<!> <span class=\"tw:min-w-0 tw:flex-1\"><strong class=\"tw:block tw:font-semibold\"> </strong><small class=\"tw:block tw:text-xs tw:text-muted-foreground\"> </small></span><span aria-hidden=\"true\">→</span>", 1), Cs = h("<small> </small>"), ws = h("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs tw:text-foreground tw:no-underline tw:hover:bg-muted\"><!><span class=\"tw:truncate\"> </span><!></a>"), Ts = h("<small class=\"tw:text-xs tw:text-muted-foreground\"> </small>"), Es = h("<div class=\"tw:flex tw:flex-wrap tw:gap-2 tw:py-2\"><!><!></div>"), Ds = h("<!> <!>", 1);
function Os(e, n) {
	R(n, !0);
	let r = q(() => n.room.epics), i = q(() => n.room.messages), a = q(() => n.room.counts), c = q(() => n.room.countsAt), u = q(() => Q(r).filter((e) => e.from_msg === n.messageId).map((e) => {
		let t = Q(i).filter((t) => t.thread === e.id);
		return {
			epic: e,
			files: Xe({
				epics: Q(r),
				messages: Q(i)
			}, e.id),
			last: t[t.length - 1],
			count: wt({
				messages: Q(i),
				counts: Q(a),
				countsAt: Q(c)
			}, e.id)
		};
	}));
	var d = t(), f = $(d);
	l(f, 17, () => Q(u), ({ epic: e, files: t, last: n, count: r }) => e.id, (e, t) => {
		let r = () => Q(t).epic, i = () => Q(t).files, a = () => Q(t).last, c = () => Q(t).count;
		var u = Ds(), d = $(u);
		k(d, {
			variant: "outline",
			get "data-thread-card"() {
				return r().id;
			},
			class: "tw:mt-2 tw:h-auto tw:w-full tw:justify-start tw:gap-3 tw:whitespace-normal tw:p-3 tw:text-left",
			onclick: (e) => {
				e.currentTarget.isConnected && n.room.epics.some((e) => e.id === r().id) && n.actions.navigateRich?.({
					kind: "thread",
					id: r().id
				});
			},
			children: (e, t) => {
				var i = Ss(), o = $(i);
				{
					let e = q(() => r().owner ? n.vb.name(r().owner) : r().title), t = q(() => r().owner ? n.vb.avatarUrl?.(r().owner) : void 0);
					Hn(o, {
						get name() {
							return Q(e);
						},
						get src() {
							return Q(t);
						}
					});
				}
				var l = J(o, 2), u = z(l), d = B(u, !0), f = J(u), p = B(f);
				W(l), Y(), I((e, t, n, i) => {
					s(d, r().title), s(p, `${e ?? ""}${t ?? ""}${n ?? ""}${i ?? ""}`);
				}, [
					() => r().archived ? `✓ ${n.vb.t("concluído")} · ` : "",
					() => r().tasks.length ? `${n.vb.t("{d}/{n} tarefas", {
						d: r().tasks.filter((e) => e.status === "done").length,
						n: r().tasks.length
					})} · ` : "",
					() => c() === 1 ? n.vb.t("1 resposta") : n.vb.t("{n} respostas", { n: c() }),
					() => a() ? ` · ${n.vb.ago(a().ts) === n.vb.t("agora") ? n.vb.t("agora") : n.vb.t("última há {ago}", { ago: n.vb.ago(a().ts) })}` : ""
				]), P(e, i);
			},
			$$slots: { default: !0 }
		});
		var f = J(d, 2), p = (e) => {
			var t = Es(), r = z(t);
			l(r, 17, () => i().slice(0, 6), (e) => e.name, (e, t) => {
				var r = ws(), i = z(r);
				Yn(i, { name: "file" });
				var a = J(i), c = B(a, !0), l = J(a), u = (e) => {
					var n = Cs(), r = B(n);
					I(() => s(r, `v${Q(t).n ?? ""}`)), P(e, n);
				};
				C(l, (e) => {
					Q(t).n > 1 && e(u);
				}), W(r), I((e) => {
					j(r, "href", e), j(r, "title", Q(t).name), s(c, Q(t).name);
				}, [() => `/api/books/${encodeURIComponent(n.room.id)}/files/${encodeURIComponent(Q(t).id)}?ui=svelte`]), o("click", r, (e) => {
					!e.currentTarget.isConnected || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || !n.actions.openFileReference || (e.preventDefault(), n.actions.openFileReference({
						roomId: n.room.id,
						id: Q(t).id,
						name: Q(t).name
					}));
				}), P(e, r);
			});
			var a = J(r), c = (e) => {
				var t = Ts(), n = B(t);
				I(() => s(n, `+${i().length - 6}`)), P(e, t);
			};
			C(a, (e) => {
				i().length > 6 && e(c);
			}), W(t), P(e, t);
		};
		C(f, (e) => {
			i().length && e(p);
		}), P(e, u);
	}), P(e, d), U();
}
i(["click"]);
var ks = (e, t) => t && e < 24;
function As(e) {
	let t = !0, n = null, r = () => {
		n = null;
	};
	return {
		start(i, a) {
			r(), t && e.current() && i && a === 1 && ks(i.clientX, e.mobile()) && (n = {
				clientX: i.clientX,
				clientY: i.clientY,
				target: e.target()
			});
		},
		move(t) {
			t === 1 && e.current() || r();
		},
		end(i) {
			let a = n;
			if (r(), !t || !a || !i || !e.current() || !e.mobile() || !e.standalone() || e.target() !== a.target) return;
			let o = i.clientX - a.clientX, s = Math.abs(i.clientY - a.clientY);
			o > 60 && s < o && e.back(a.target);
		},
		cancel: r,
		dispose() {
			t = !1, r();
		}
	};
}
function js(e, t) {
	let n = As({
		...t,
		current: () => e.isConnected && t.current()
	}), r = (e) => n.start(e.touches[0], e.touches.length), i = (e) => n.move(e.touches.length), a = (e) => n.end(e.changedTouches[0]), o = () => n.cancel();
	return e.addEventListener("touchstart", r, { passive: !0 }), e.addEventListener("touchmove", i, { passive: !0 }), e.addEventListener("touchend", a, { passive: !0 }), e.addEventListener("touchcancel", o, { passive: !0 }), () => {
		n.dispose(), e.removeEventListener("touchstart", r), e.removeEventListener("touchmove", i), e.removeEventListener("touchend", a), e.removeEventListener("touchcancel", o);
	};
}
// svelte/features/chat/swipe.ts
function Ms(e, t) {
	let n = e.ownerDocument.defaultView?.matchMedia("(max-width: 900px)"), r = !0, i = null, a = [
		"tw:translate-x-5",
		"tw:translate-x-10",
		"tw:translate-x-20",
		"tw:-translate-x-5",
		"tw:-translate-x-10",
		"tw:-translate-x-20"
	], o = () => {
		e.classList.remove(...a), e.removeAttribute("data-swipe");
	}, s = (e) => {
		i = null, o();
		let r = e.target;
		t.enabled !== !1 && r instanceof Element && !r.closest("pre,table,iframe,[data-chat-embed],button,a,input,textarea,select") && e.touches.length === 1 && (ks(e.touches[0].clientX, n?.matches ?? !1) || (i = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
			dx: 0,
			locked: !1
		}));
	}, c = (t) => {
		if (!i) return;
		if (t.touches.length !== 1) {
			i = null, o();
			return;
		}
		let n = t.touches[0].clientX - i.x, r = t.touches[0].clientY - i.y;
		if (!i.locked) {
			if (Math.abs(r) > 8 && Math.abs(r) >= Math.abs(n)) {
				i = null;
				return;
			}
			if (Math.abs(n) < 10 || Math.abs(n) <= Math.abs(r)) return;
			i.locked = !0;
		}
		t.preventDefault(), i.dx = n, o();
		let s = Math.abs(n) > 60 ? 2 : +(Math.abs(n) > 30);
		e.classList.add(a[s + (n < 0 ? 3 : 0)]), e.dataset.swipe = n > 60 ? "reply" : n < -60 ? "copy" : "tracking";
	}, l = () => {
		let e = i;
		i = null, o(), r && e && (e.dx > 60 ? t.reply() : e.dx < -60 && t.copy());
	}, u = () => {
		i = null, o();
	};
	return e.addEventListener("touchstart", s, { passive: !0 }), e.addEventListener("touchmove", c, { passive: !1 }), e.addEventListener("touchend", l), e.addEventListener("touchcancel", u), {
		update(e) {
			t = e;
		},
		destroy() {
			r = !1, u(), e.removeEventListener("touchstart", s), e.removeEventListener("touchmove", c), e.removeEventListener("touchend", l), e.removeEventListener("touchcancel", u);
		}
	};
}
// svelte/Message.svelte
var Ns = h("<span aria-hidden=\"true\" class=\"tw:inline-grid tw:size-8 tw:place-items-center tw:rounded-full tw:bg-primary/10 tw:text-primary\">✦</span>"), Ps = h("<span aria-hidden=\"true\" class=\"tw:block tw:text-center tw:text-xs\"> </span>"), Fs = h("<!><!>", 1), Is = h("<time class=\"tw:text-xs tw:text-muted-foreground\"> </time>"), Ls = h("<div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><span class=\"tw:font-semibold tw:text-foreground\"> </span><!><!><time> </time></div>"), Rs = h("<span aria-hidden=\"true\">↩</span> ", 1), zs = h("<p data-message-typing=\"\" role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Bs = h("<!> <!> <!>", 1), Vs = h("<b> </b>"), Hs = h("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), Us = h("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">⏰ <!> <time> </time></summary><!><!></details>"), Ws = h("<div class=\"tw:space-y-2 tw:border-l-2 tw:border-border tw:pl-3\"><time class=\"tw:text-xs tw:text-muted-foreground\"> </time><!> <p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words\"> </p> <!></div>"), Gs = h("<details class=\"tw:space-y-3\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">⚠ <b> </b> <time> </time></summary><!></details>"), Ks = h("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">✦ <!> · <time> </time></summary><!></details>"), qs = h("<article data-vb-native=\"\"><div class=\"tw:flex tw:items-start tw:gap-3\"><div class=\"tw:w-8 tw:shrink-0\"><!></div> <div data-message-body=\"\" class=\"tw:min-w-0 tw:flex-1 tw:space-y-2\"><!> <!> <!> <!> <!></div></div> <div class=\"tw:mt-1 tw:flex tw:justify-end tw:md:opacity-0 tw:md:group-hover:opacity-100 tw:md:group-focus-within:opacity-100\"><!></div></article>");
function Js(e, n) {
	R(n, !0);
	let r = (e, t = L, r) => {
		let i = ne(() => ce(r?.(), "markdown"));
		{
			let r = q(() => n.vb.t("arquivo"));
			Ut(e, {
				get text() {
					return t();
				},
				get mode() {
					return Q(i);
				},
				get room() {
					return n.room;
				},
				get actions() {
					return n.actions;
				},
				get names() {
					return n.vb.knownNames;
				},
				get pageUrl() {
					return n.vb.pageUrl;
				},
				get fileLabel() {
					return Q(r);
				}
			});
		}
	}, i = v(n, "origin", 3, !1), a = Z(void 0), o = !0;
	c(() => {
		o = !1;
	});
	let u = q(() => n.vb.waiting(n.message.id)), d = Z(!1), p = Z(!1);
	re(() => {
		if (!Q(u)) {
			F(d, !1);
			return;
		}
		F(d, !0);
		let e = setTimeout(() => {
			F(d, !1);
		}, 1800);
		return () => clearTimeout(e);
	});
	function m(e) {
		let t, n = () => {
			t && clearTimeout(t), F(p, !0), t = setTimeout(() => {
				F(p, !1);
			}, 1800);
		};
		return e.addEventListener("vb:message-highlight", n), { destroy() {
			e.removeEventListener("vb:message-highlight", n), t && clearTimeout(t);
		} };
	}
	let h = q(() => tt(n.previous, n.message)), _ = q(() => $e(n.message)), y = q(() => n.message.reply_to ? [...n.room.messages, ...n.room.origins || []].find((e) => e.id === n.message.reply_to) : void 0), b = q(() => n.vb.dateTime?.(n.message.ts) ?? new Date(n.message.ts).toLocaleString()), S = q(() => n.message.group || [n.message]), w = q(() => Ze(n.message)), T = (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? n.vb.t("{via} de {who}", {
		via: e.via || "agent",
		who: n.vb.name(e.author)
	}) : n.vb.name(e.author), E = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? n.vb.hhmm(e) : `${new Date(e).toLocaleDateString(n.vb.locale, {
		day: "numeric",
		month: "short"
	})} ${n.vb.hhmm(e)}`;
	var D = qs(), O = z(D), A = z(O), V = z(A), H = (e) => {
		var t = Fs(), r = $(t), i = (e) => {
			var t = Ns();
			P(e, t);
		}, a = (e) => {
			{
				let t = q(() => T(n.message)), r = q(() => n.vb.avatarUrl?.(n.message.author));
				Hn(e, {
					get name() {
						return Q(t);
					},
					get src() {
						return Q(r);
					}
				});
			}
		};
		C(r, (e) => {
			n.message.author === "ai" ? e(i) : e(a, -1);
		});
		var o = J(r), c = (e) => {
			var t = Ps(), r = B(t, !0);
			I((e) => s(r, e), [() => Ye(n.message.via)]), P(e, t);
		};
		C(o, (e) => {
			n.message.kind === "agent" && e(c);
		}), P(e, t);
	}, ee = (e) => {
		var t = Is(), r = B(t, !0);
		I((e) => {
			j(t, "title", Q(b)), s(r, e);
		}, [() => n.vb.hhmm(n.message.ts)]), P(e, t);
	};
	C(V, (e) => {
		Q(h) ? e(ee, -1) : e(H);
	}), W(A);
	var te = J(A, 2), G = z(te), K = (e) => {
		var t = Ls(), r = z(t), i = B(r, !0), a = J(r), o = (e) => {
			{
				let t = q(() => n.vb.t("Escrito pelo agent dessa pessoa, em nome dela"));
				Un(e, {
					get title() {
						return Q(t);
					},
					children: (e, t) => {
						Y();
						var n = g("agent");
						P(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		C(a, (e) => {
			n.message.kind === "agent" && e(o);
		});
		var c = J(a), l = (e) => {
			Un(e, {
				variant: "success",
				children: (e, t) => {
					Y();
					var r = g();
					I((e) => s(r, `✓ ${e ?? ""}`), [() => n.vb.t("entregue")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		C(c, (e) => {
			n.message.tag === "done" && e(l);
		});
		var u = J(c), d = B(u);
		W(t), I((e, t, n) => {
			s(i, e), j(u, "title", Q(b)), s(d, `${t ?? ""} · ${n ?? ""}`);
		}, [
			() => T(n.message),
			() => n.vb.ago(n.message.ts),
			() => n.vb.hhmm(n.message.ts)
		]), P(e, t);
	};
	C(G, (e) => {
		Q(h) || e(K);
	});
	var ie = J(G, 2), ae = (e) => {
		{
			let t = q(() => n.vb.t("Ver a mensagem respondida"));
			k(e, {
				variant: "ghost",
				size: "sm",
				class: "tw:h-auto tw:max-w-full tw:justify-start tw:whitespace-normal tw:border-l-2 tw:border-border tw:text-left tw:text-muted-foreground",
				get "data-native-quote"() {
					return n.message.reply_to;
				},
				get title() {
					return Q(t);
				},
				onclick: () => {
					o && n.actions.navigate(n.message.reply_to, Q(y)?.thread);
				},
				children: (e, t) => {
					var r = Rs(), i = J($(r), 1, !0);
					I((e) => s(i, e), [() => Q(y) ? `${T(Q(y))} · ${et(Q(y))}` : n.vb.t("mensagem anterior")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	C(ie, (e) => {
		n.message.reply_to && e(ae);
	});
	var oe = J(ie, 2), se = (e) => {
		var t = Bs(), i = $(t), a = (e) => {
			var t = zs(), r = B(t);
			I((e) => s(r, `${e ?? ""}${n.typing ? "…" : ""}`), [() => n.typing ? n.vb.typingNote?.(n.message.id) || n.vb.t("pensando ({mode})", { mode: n.vb.typingLabel?.(n.typing) ?? n.typing }) : n.vb.t("pensando…")]), P(e, t);
		}, o = (e) => {
			r(e, () => n.message.text, () => n.message.author === "ai" || n.message.kind === "agent" ? "markdown" : "human");
		};
		C(i, (e) => {
			!n.message.text && (n.typing || n.message.author === "ai" && !n.message.poll) ? e(a) : n.message.text && e(o, 1);
		});
		var c = J(i, 2);
		xs(c, {
			get roomId() {
				return n.room.id;
			},
			get messageThread() {
				return n.message.thread;
			},
			get files() {
				return n.message.files;
			},
			get actions() {
				return n.actions;
			},
			get vb() {
				return n.vb;
			}
		});
		var l = J(c, 2), u = (e) => {
			qo(e, {
				get message() {
					return n.message;
				},
				get room() {
					return n.room;
				},
				get actions() {
					return n.actions;
				},
				get vb() {
					return n.vb;
				}
			});
		};
		C(l, (e) => {
			(n.message.card || n.message.choices || n.message.poll) && e(u);
		}), P(e, t);
	}, X = (e) => {
		var t = Us(), i = z(t), a = J(z(i)), o = (e) => {
			var t = Vs(), n = B(t, !0);
			I(() => s(n, Q(w).name)), P(e, t);
		};
		C(a, (e) => {
			Q(w).name && e(o);
		});
		var c = J(a), l = J(c), u = B(l, !0);
		W(i);
		var d = J(i), f = (e) => {
			r(e, () => Q(w).body);
		};
		C(d, (e) => {
			Q(w).body && e(f);
		});
		var p = J(d), m = (e) => {
			var t = Hs(), n = B(t, !0);
			I((e) => s(n, e), [() => Q(w).runs.map(E).join(" · ")]), P(e, t);
		};
		C(p, (e) => {
			Q(w).runs.length > 1 && e(m);
		}), W(t), I((e, t) => {
			s(c, `${Q(w).head ?? ""} · ${e ?? ""}`), j(l, "title", Q(b)), s(u, t);
		}, [() => Q(w).runs.length > 1 ? `${n.vb.t("rodou {n}×", { n: Q(w).runs.length })} · ` : "", () => E(n.message.ts)]), P(e, t);
	}, le = (e) => {
		var t = Gs(), i = z(t), a = J(z(i)), o = B(a, !0), c = J(a), u = J(c), d = B(u, !0);
		W(i);
		var f = J(i);
		l(f, 17, () => [...Q(S)].reverse(), (e) => e.id, (e, t) => {
			var i = Ws(), a = z(i), o = B(a, !0), c = J(a);
			{
				let e = q(() => qe(Q(t)).head);
				r(c, () => Q(e));
			}
			var l = J(c, 2), u = B(l, !0);
			Qo(J(l, 2), {
				get message() {
					return Q(t);
				},
				showLink: !1,
				get roomId() {
					return n.room.id;
				},
				get actions() {
					return n.actions;
				},
				get vb() {
					return n.vb;
				}
			}), W(i), I((e, t) => {
				s(o, e), s(u, t);
			}, [() => E(Q(t).ts), () => qe(Q(t)).body]), P(e, i);
		}), W(t), I((e, t, n) => {
			s(o, e), s(c, ` ${t ?? ""} · `), j(u, "title", Q(b)), s(d, n);
		}, [
			() => Q(S).length > 1 ? n.vb.t("{n} issues dos agents", { n: Q(S).length }) : n.vb.t("Issue de um agent"),
			() => qe(n.message).body.replace(/\s+/g, " ").slice(0, 140),
			() => E(n.message.ts)
		]), P(e, t);
	}, ue = (e) => {
		var t = Ks(), i = z(t), a = J(z(i));
		{
			let e = q(() => n.message.text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim());
			r(a, () => Q(e), () => "inline");
		}
		var o = J(a, 2), c = B(o, !0);
		W(i);
		var l = J(i);
		r(l, () => n.message.text), W(t), I((e) => {
			j(o, "title", Q(b)), s(c, e);
		}, [() => E(n.message.ts)]), P(e, t);
	};
	C(oe, (e) => {
		Q(_) === "regular" ? e(se) : Q(_) === "reminder" ? e(X, 1) : Q(_) === "issue" ? e(le, 2) : e(ue, -1);
	});
	var de = J(oe, 2), fe = (e) => {
		var r = t(), i = $(r);
		l(i, 17, () => Q(_) === "reminder" ? Q(S) : [n.message], (e) => e.id, (e, t) => {
			Os(e, {
				get room() {
					return n.room;
				},
				get messageId() {
					return Q(t).id;
				},
				get actions() {
					return n.actions;
				},
				get vb() {
					return n.vb;
				}
			});
		}), P(e, r);
	};
	C(de, (e) => {
		!i() && Q(_) !== "issue" && Q(_) !== "notice" && e(fe);
	});
	var pe = J(de, 2), me = (e) => {
		ls(e, {
			get footer() {
				return n.footer;
			},
			get vb() {
				return n.vb;
			}
		});
	};
	C(pe, (e) => {
		n.footer && !i() && e(me);
	}), W(te), W(O);
	var he = J(O, 2), ge = z(he);
	x(Qo(ge, {
		get message() {
			return n.message;
		},
		get roomId() {
			return n.room.id;
		},
		get actions() {
			return n.actions;
		},
		get vb() {
			return n.vb;
		}
	}), (e) => F(a, e, !0), () => Q(a)), W(he), W(D), M(D, (e) => m?.(e)), M(D, (e, t) => Ms?.(e, t), () => ({
		enabled: !i(),
		reply: () => {
			o && n.actions.reply(n.message.id);
		},
		copy: () => {
			Q(a)?.copy();
		}
	})), I(() => {
		j(D, "id", i() ? void 0 : `m${n.message.id}`), j(D, "data-chat-message", n.message.id), j(D, "data-message-kind", Q(_)), j(D, "data-waiting", Q(u)), N(D, 1, f([
			Q(h) ? "tw:group tw:relative tw:rounded-control tw:px-3 tw:py-1 tw:font-sans tw:text-sm tw:text-foreground" : "tw:group tw:relative tw:rounded-control tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-foreground",
			Q(u) ? "tw:border-l-2 tw:border-warning tw:bg-warning/10" : "",
			Q(d) ? "tw:animate-pulse tw:motion-reduce:animate-none" : "",
			Q(p) ? "tw:ring-2 tw:ring-ring tw:bg-accent" : ""
		]));
	}), P(e, D), U();
}
// svelte/features/needs-you/NeedsYou.svelte
var Ys = h("<span class=\"tw:break-words\"> </span><span class=\"tw:text-xs tw:text-foreground\"> </span>", 1), Xs = h("<span class=\"tw:grid tw:min-w-0 tw:flex-1 tw:gap-1 tw:p-2\"><span class=\"tw:break-words\"> </span><span class=\"tw:text-xs tw:text-foreground\"> </span></span>"), Zs = h("<li class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></li>"), Qs = h("<p role=\"status\" class=\"tw:m-0 tw:text-xs\"> </p>"), $s = h("<div role=\"status\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-sm\"><span> </span><!></div>"), ec = h("<section data-native-needs-you=\"\" data-vb-native=\"\" class=\"tw:mx-3 tw:mt-4 tw:space-y-2 tw:rounded-surface tw:border tw:border-warning/30 tw:bg-warning/10 tw:p-3 tw:font-sans tw:text-foreground\"><div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!> <span class=\"tw:flex-1 tw:text-xs tw:text-foreground\"> </span> <!></div> <ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!> <!></section>");
function tc(n, r) {
	R(r, !0);
	let i = (e) => e.kind === "ask" ? r.vb.t("{who} pediu", { who: r.vb.name(e.author ?? "") }) : r.vb.t(e.kind === "agent" ? "seu Claude espera você" : e.kind === "review" ? "sua tarefa esperando OK" : e.kind === "doing" ? "sua tarefa, fazendo" : "sua tarefa, a fazer"), a = (e) => e.length > 200 ? `${e.slice(0, 198)}…` : e;
	var o = t(), c = $(o), u = (t) => {
		var n = ec(), o = z(n), c = z(o);
		Gn(c, {
			level: 3,
			class: "tw:m-0 tw:text-sm tw:font-semibold",
			children: (e, t) => {
				Y();
				var n = g();
				I((e) => s(n, e), [() => r.vb.t("O que precisa de você aqui")]), P(e, n);
			},
			$$slots: { default: !0 }
		});
		var u = J(c, 2), d = B(u, !0), f = J(u, 2);
		e(f, () => JSON.stringify([r.view.binding, r.view.items.map((e) => e.signature)]), (e) => {
			{
				let t = (e, t = L) => {
					{
						let n = q(() => r.view.busy || !r.view.items.length);
						k(e, {
							size: "sm",
							variant: "ghost",
							get disabled() {
								return Q(n);
							},
							onclick: (e) => {
								e.currentTarget.isConnected && r.owner.dismiss(t().binding, t().items);
							},
							children: (e, t) => {
								Y();
								var n = g();
								I((e) => s(n, e), [() => r.vb.t("Dispensar")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				}, n = q(() => ({
					binding: r.view.binding,
					items: r.view.items
				}));
				Pt(e, {
					get value() {
						return Q(n);
					},
					children: t,
					$$slots: { default: !0 }
				});
			}
		}), W(o);
		var p = J(o, 2);
		l(p, 21, () => r.view.items, (e) => e.signature, (e, t) => {
			{
				let n = (e, t = L) => {
					var n = Zs(), o = z(n), c = (e) => {
						k(e, {
							variant: "ghost",
							class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:gap-1 tw:whitespace-normal tw:p-2 tw:text-left",
							onclick: (e) => {
								e.currentTarget.isConnected && r.owner.navigate(t().binding, t().item);
							},
							children: (e, n) => {
								var r = Ys(), o = $(r), c = B(o, !0), l = J(o), u = B(l, !0);
								I((e, t) => {
									s(c, e), s(u, t);
								}, [() => a(t().item.text), () => i(t().item)]), P(e, r);
							},
							$$slots: { default: !0 }
						});
					}, l = (e) => {
						var n = Xs(), r = z(n), o = B(r, !0), c = J(r), l = B(c, !0);
						W(n), I((e, t) => {
							s(o, e), s(l, t);
						}, [() => a(t().item.text), () => i(t().item)]), P(e, n);
					};
					C(o, (e) => {
						t().item.messageId ? e(c) : e(l, -1);
					});
					var u = J(o, 2);
					{
						let e = q(() => r.vb.t("Feito / não é comigo"));
						Nt(u, {
							icon: "check",
							get label() {
								return Q(e);
							},
							get disabled() {
								return r.view.busy;
							},
							onclick: (e) => {
								e.currentTarget.isConnected && r.owner.dismiss(t().binding, [t().item]);
							}
						});
					}
					W(n), P(e, n);
				}, o = q(() => ({
					binding: r.view.binding,
					item: Q(t)
				}));
				Pt(e, {
					get value() {
						return Q(o);
					},
					children: n,
					$$slots: { default: !0 }
				});
			}
		}), W(p);
		var m = J(p, 2), h = (e) => {
			var t = Qs(), n = B(t, !0);
			I((e) => s(n, e), [() => r.vb.t("Salvando…")]), P(e, t);
		};
		C(m, (e) => {
			r.view.busy && e(h);
		});
		var _ = J(m, 2), v = (t) => {
			var n = $s(), i = z(n), a = B(i, !0), o = J(i);
			e(o, () => r.view.operation, (e) => {
				{
					let t = (e, t = L) => {
						k(e, {
							size: "sm",
							variant: "outline",
							onclick: (e) => {
								e.currentTarget.isConnected && r.owner.retry(t().binding, t().operation);
							},
							children: (e, t) => {
								Y();
								var n = g();
								I((e) => s(n, e), [() => r.vb.t("Tentar de novo")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					}, n = q(() => ({
						binding: r.view.binding,
						operation: r.view.operation
					}));
					Pt(e, {
						get value() {
							return Q(n);
						},
						children: t,
						$$slots: { default: !0 }
					});
				}
			}), W(n), I((e) => s(a, e), [() => r.vb.t("Não deu pra resolver agora. Tente de novo.")]), P(t, n);
		};
		C(_, (e) => {
			r.view.error && e(v);
		}), W(n), I((e, t) => {
			j(n, "aria-label", e), s(d, t);
		}, [() => r.vb.t("O que precisa de você aqui"), () => r.vb.t("só você vê")]), P(t, n);
	};
	C(c, (e) => {
		(r.view.items.length || r.view.busy || r.view.error) && e(u);
	}), P(n, o), U();
}
// svelte/Chat.svelte
var nc = h("<div class=\"tw:flex tw:justify-center tw:p-3\"><!></div>"), rc = h("<div data-chat-origin=\"\" class=\"tw:mx-3 tw:mb-4 tw:rounded-surface tw:border tw:border-border tw:bg-muted/30\"><!> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:border-t tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground\"><span> </span><!></div></div>"), ic = h("<p data-chat-empty=\"\" class=\"tw:m-0 tw:p-6 tw:text-center tw:leading-6 tw:text-muted-foreground\"> </p>"), ac = h("<span class=\"tw:relative\"><!><span aria-hidden=\"true\" class=\"tw:absolute tw:-bottom-1 tw:-right-1 tw:rounded-full tw:bg-card tw:px-0.5 tw:text-xs\"> </span></span>"), oc = h("<div data-chat-working=\"\" class=\"tw:mx-3 tw:mt-4 tw:flex tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/30 tw:p-4\"><div class=\"tw:flex tw:shrink-0 tw:-space-x-2\"></div> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:font-medium\"> </p> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p></div> <span aria-hidden=\"true\" class=\"tw:animate-spin tw:motion-reduce:animate-none\">✻</span></div>"), sc = h("<div data-chat-end=\"\" class=\"tw:mx-3 tw:mt-4 tw:space-y-1 tw:rounded-surface tw:border tw:border-border tw:p-4\"><p class=\"tw:m-0 tw:font-medium\"> </p> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p></div>"), cc = h("<p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), lc = h("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), uc = h("<div data-chat-production=\"\" class=\"tw:mx-3 tw:mt-3 tw:space-y-1 tw:rounded-surface tw:border tw:border-border tw:p-4\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!></div>"), dc = h("<section data-chat-timeline=\"\" data-vb-native=\"\" class=\"tw:space-y-1 tw:pb-4 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <!> <!> <!> <!></section>");
function fc(n, r) {
	R(r, !0);
	let i = v(r, "more", 3, !1), a = v(r, "origin", 3, null), o = v(r, "replyCount", 3, 0), c = Z(te(Date.now()));
	u(() => {
		let e = setInterval(() => {
			F(c, Date.now(), !0);
		}, 3e4);
		return () => clearInterval(e);
	});
	let d = q(() => ht(r.list)), f = q(() => mt(r.room, r.thread, Q(c))), p = q(() => Qe(r.room, r.thread, Q(c))), m = q(() => r.room.epics.find((e) => e.id === r.thread));
	var h = t(), _ = $(h);
	e(_, () => r.room.id + ":" + r.thread, (e) => {
		var n = dc(), c = z(n), u = (e) => {
			var t = nc(), n = z(t);
			k(n, {
				variant: "outline",
				size: "sm",
				id: "olderBtn",
				get onclick() {
					return r.onloadolder;
				},
				children: (e, t) => {
					Y();
					var n = g();
					I((e) => s(n, e), [() => r.vb.t("Carregar mensagens anteriores")]), P(e, n);
				},
				$$slots: { default: !0 }
			}), W(t), P(e, t);
		};
		C(c, (e) => {
			i() && e(u);
		});
		var h = J(c, 2), _ = (e) => {
			var t = rc(), n = z(t);
			Js(n, {
				get message() {
					return a();
				},
				origin: !0,
				get typing() {
					return r.room.typing[a().id];
				},
				get vb() {
					return r.vb;
				},
				get room() {
					return r.room;
				},
				get actions() {
					return r.actions;
				}
			});
			var i = J(n, 2), c = z(i), l = B(c, !0), u = J(c);
			k(u, {
				variant: "ghost",
				size: "sm",
				get "data-native-origin"() {
					return a().id;
				},
				onclick: () => r.actions.navigate(a().id, a().thread),
				children: (e, t) => {
					Y();
					var n = g();
					I((e) => s(n, `${e ?? ""} ↩`), [() => r.vb.t("ver na sala principal")]), P(e, n);
				},
				$$slots: { default: !0 }
			}), W(i), W(t), I((e) => s(l, e), [() => o() === 1 ? r.vb.t("1 resposta") : r.vb.t("{n} respostas", { n: o() })]), P(e, t);
		};
		C(h, (e) => {
			a() && e(_);
		});
		var v = J(h, 2), y = (e) => {
			var n = t(), i = $(n);
			l(i, 19, () => Q(d), (e) => e.id, (e, t, n) => {
				{
					let i = q(() => Q(n) ? Q(d)[Q(n) - 1] : r.previous), a = q(() => Q(f).get(Q(t).id));
					Js(e, {
						get message() {
							return Q(t);
						},
						get previous() {
							return Q(i);
						},
						get typing() {
							return r.room.typing[Q(t).id];
						},
						get vb() {
							return r.vb;
						},
						get room() {
							return r.room;
						},
						get actions() {
							return r.actions;
						},
						get footer() {
							return Q(a);
						}
					});
				}
			}), P(e, n);
		}, b = (e) => {
			var t = ic(), n = B(t, !0);
			I((e) => s(n, e), [() => r.thread === "main" ? r.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.").replace(/<\/?i>/g, "") : r.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), P(e, t);
		};
		C(v, (e) => {
			Q(d).length ? e(y) : Q(p).length || e(b, 1);
		});
		var x = J(v, 2), S = (e) => {
			var t = oc(), n = z(t);
			l(n, 21, () => Q(p).slice(0, 4), (e) => `${e.who}|${e.email}`, (e, t) => {
				var n = ac(), i = z(n);
				{
					let e = q(() => r.vb.name(Q(t).email)), n = q(() => r.vb.avatarUrl?.(Q(t).email));
					Hn(i, {
						get name() {
							return Q(e);
						},
						get src() {
							return Q(n);
						}
					});
				}
				var a = J(i), o = B(a, !0);
				W(n), I((e) => s(o, e), [() => Ye(Q(t).who)]), P(e, n);
			}), W(n);
			var i = J(n, 2), a = z(i), o = B(a), c = J(a, 2), u = B(c, !0);
			W(i), Y(2), W(t), I((e, t, n) => {
				s(o, `${e ?? ""}
            ${t ?? ""}`), s(u, n);
			}, [
				() => Q(p).map((e) => r.vb.t("{via} de {who}", {
					via: nt(e.who),
					who: r.vb.name(e.email)
				})).join(", "),
				() => r.vb.t(Q(p).length === 1 ? "está trabalhando nisso" : "estão trabalhando nisso"),
				() => r.vb.t("O andamento e a entrega aparecem aqui nesta thread.")
			]), P(e, t);
		};
		C(x, (e) => {
			Q(p).length && e(S);
		});
		var w = J(x, 2), T = (e) => {
			var t = sc(), n = z(t), i = B(n), a = J(n, 2), o = B(a, !0);
			W(t), I((e, t) => {
				s(i, `✓ ${e ?? ""}`), s(o, t);
			}, [() => r.vb.t("Agent fez"), () => r.vb.t("Escreva aqui pra continuar: ele reabre.")]), P(e, t);
		};
		C(w, (e) => {
			Q(m)?.archived && e(T);
		});
		var E = J(w, 2), D = (e) => {
			var t = uc(), n = z(t), i = B(n, !0), a = J(n, 2), o = (e) => {
				var t = cc(), n = B(t, !0);
				I(() => s(n, Q(m).prod.note)), P(e, t);
			}, c = (e) => {
				var t = lc(), n = B(t, !0);
				I((e) => s(n, e), [() => r.vb.t("Falta o agent verificar em prod.")]), P(e, t);
			};
			C(a, (e) => {
				Q(m).prod.stage === "verified" && Q(m).prod.note ? e(o) : Q(m).prod.stage !== "verified" && e(c, 1);
			}), W(t), I((e) => s(i, e), [() => Q(m).prod.stage === "verified" ? `✓✓ ${r.vb.t("Verificado em prod")}` : `🚀 ${r.vb.t("No ar")}`]), P(e, t);
		};
		C(E, (e) => {
			Q(m)?.prod && e(D);
		});
		var A = J(E, 2), j = (e) => {
			tc(e, O(() => r.needsYou, { get vb() {
				return r.vb;
			} }));
		};
		C(A, (e) => {
			r.needsYou && e(j);
		}), W(n), P(e, n);
	}), P(n, h), U();
}
// svelte/features/composer/speech.ts
function pc(e) {
	let t = Reflect.get(e, "SpeechRecognition") || Reflect.get(e, "webkitSpeechRecognition");
	if (typeof t == "function") return () => {
		let e = Reflect.construct(t, []);
		if (!mc(e)) throw TypeError("Unsupported speech interface");
		return e;
	};
}
function mc(e) {
	return typeof e == "object" && !!e && typeof Reflect.get(e, "start") == "function" && typeof Reflect.get(e, "stop") == "function" && typeof Reflect.get(e, "abort") == "function" && typeof Reflect.get(e, "lang") == "string" && typeof Reflect.get(e, "continuous") == "boolean" && typeof Reflect.get(e, "interimResults") == "boolean" && [
		"onresult",
		"onerror",
		"onend"
	].every((t) => {
		let n = Reflect.get(e, t);
		return n === null || typeof n == "function";
	});
}
function hc(e) {
	if (typeof e != "object" || !e || !("results" in e) || typeof e.results != "object" || !e.results) return;
	let t = Reflect.get(e.results, "length");
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || t > 512) return;
	let n = [], r = 0;
	for (let i = 0; i < t; i++) {
		let t = Reflect.get(e.results, String(i));
		if (typeof t != "object" || !t) return;
		let a = Reflect.get(t, "0");
		if (typeof a != "object" || !a) return;
		let o = Reflect.get(a, "transcript");
		if (typeof o != "string" || (r += o.length) > 65536) return;
		n.push(o);
	}
	return n.join("").trim();
}
var gc = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
};
function _c(e) {
	let t = e.clock || gc, n = !0, r = 0, i, a, o = !1, s = !1, c = !1;
	function l() {
		a !== void 0 && t.cancel(a), a = void 0;
	}
	function u() {
		if (o = !1, l(), !n || !e.canStart()) return;
		let t = e.read();
		e.write(t.text.slice(0, t.start) + " " + t.text.slice(t.end), t.start + 1);
	}
	function d() {
		r++, l(), o = !1, s = !1, c = !1;
		let t = i;
		if (i = void 0, t) {
			t.onresult = t.onerror = t.onend = null;
			try {
				t.abort();
			} catch {}
		}
		e.recording(!1);
	}
	function f() {
		if (!n || i || !e.factory || !e.canStart()) return;
		let t = e.read(), a = ++r, o;
		try {
			o = e.factory();
		} catch {
			e.error("failed");
			return;
		}
		i = o, c = !1;
		let s = t.revision, l = () => n && i === o && r === a;
		o.lang = e.locale, o.continuous = !0, o.interimResults = !0, o.onresult = (n) => {
			if (!l()) return;
			if (!e.canStart() || e.read().revision !== s) {
				d();
				return;
			}
			let r = hc(n);
			if (r === void 0) {
				e.error("invalid-result"), d();
				return;
			}
			let i = t.text + (t.text && r && !/\s$/.test(t.text) ? " " : "") + r;
			e.read().text !== i && e.write(i, i.length), s = e.read().revision;
		}, o.onerror = (t) => {
			if (!l()) return;
			let n = typeof t == "object" && t && "error" in t && typeof t.error == "string" ? t.error : "failed";
			n === "not-allowed" || n === "service-not-allowed" ? e.error("not-allowed") : n !== "aborted" && n !== "no-speech" && e.error("failed"), d();
		}, o.onend = () => {
			l() && (o.onresult = o.onerror = o.onend = null, i = void 0, c = !1, e.recording(!1), e.canStart() && e.ended());
		}, e.error(""), e.recording(!0);
		try {
			o.start();
		} catch {
			if (l()) {
				o.onresult = o.onerror = o.onend = null, i = void 0;
				try {
					o.abort();
				} catch {}
				e.recording(!1), e.error("failed");
			}
		}
	}
	function p() {
		if (s = !1, i && !c) {
			c = !0;
			try {
				i.stop();
			} catch {
				d();
			}
		}
	}
	return {
		supported: !!e.factory,
		start: f,
		stop: p,
		cancel: d,
		keydown(r) {
			return !n || !e.factory || !e.canStart() ? !1 : r.key === " " ? r.ctrlKey || r.metaKey || r.altKey || r.isComposing ? !1 : (r.preventDefault(), r.repeat || (s = !1, o = !0, l(), a = t.schedule(() => {
				a = void 0, o = !1, s = !0, f();
			}, 350)), !0) : (o && u(), !1);
		},
		keyup(e) {
			e.key === " " && (s ? (s = !1, p()) : o && u());
		},
		dispose() {
			n = !1, d();
		}
	};
}
// svelte/features/composer/OrphanDrafts.svelte
var vc = h("<aside data-composer-orphans=\"\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:border-t tw:border-border tw:p-2 tw:text-sm tw:text-muted-foreground\"><span> </span> <!></aside>"), yc = h("<p role=\"status\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p>"), bc = h("<!> <!> <div class=\"tw:flex tw:justify-end tw:gap-2\"><!> <!></div>", 1), xc = h("<!> <!>", 1);
function Sc(e, t) {
	R(t, !0);
	let n = () => T(a, "$changes", r), [r, i] = y(), a = G(() => t.drafts.changes), o = Z(null), u = Z(!1), d = Z(""), f = !0, p = 0, m = q(() => (n(), t.drafts.orphans(t.room))), h = q(() => Q(o) && Q(m).some((e) => e.scope === Q(o)?.scope && e.state === Q(o)?.state)), _ = q(() => Q(o) ? [
		`Thread: ${Q(o).scope.thread}`,
		Q(o).state.text,
		Q(o).state.replyId ? `Reply: ${Q(o).state.replyId}` : "",
		...Q(o).state.attachments.map((e) => `${e.name} (${e.type}, ${e.size} bytes; ${e.phase})`),
		Q(o).state.poll.question ? `Poll: ${Q(o).state.poll.question}` : "",
		Q(o).state.poll.multi ? t.vb.t("cada pessoa pode escolher várias") : "",
		...Q(o).state.poll.options.filter(Boolean)
	].filter(Boolean).join("\n\n") : "");
	re(() => {
		Q(o) && !Q(h) && (F(u, !1), F(o, null), F(d, ""), p++);
	});
	async function v() {
		if (!f || !Q(u) || !Q(h) || !Q(o)) return;
		let e = ++p, n = Q(o);
		try {
			await navigator.clipboard.writeText(Q(_)), f && e === p && Q(o) === n && Q(u) && Q(h) && F(d, t.vb.t("Copiado"), !0);
		} catch {
			f && e === p && Q(o) === n && Q(u) && Q(h) && F(d, t.vb.t("Não foi possível copiar. Selecione o texto abaixo e copie manualmente."), !0);
		}
	}
	function b() {
		f && Q(u) && Q(h) && Q(o) && t.drafts.discardOrphan(Q(o), t.room) && (F(u, !1), F(o, null), p++);
	}
	c(() => {
		f = !1, p++;
	});
	var x = xc(), S = $(x), w = (e) => {
		var n = vc(), r = z(n), i = B(r), a = J(r, 2);
		l(a, 17, () => Q(m), (e) => e.scope.thread, (e, n) => {
			k(e, {
				variant: "outline",
				size: "sm",
				onclick: () => {
					F(o, Q(n)), F(d, ""), F(u, !0), p++;
				},
				children: (e, r) => {
					Y();
					var i = g();
					I((e) => s(i, `${e ?? ""}: ${Q(n).scope.thread ?? ""}`), [() => t.vb.t("Revisar rascunho")]), P(e, i);
				},
				$$slots: { default: !0 }
			});
		}), W(n), I((e) => s(i, `${e ?? ""}: ${Q(m).length ?? ""}`), [() => t.vb.t("Rascunhos de conversas removidas")]), P(e, n);
	};
	C(S, (e) => {
		Q(m).length && e(w);
	});
	var E = J(S, 2);
	{
		let e = q(() => t.vb.t("Revisar rascunho")), n = q(() => t.vb.t("Fechar")), r = q(() => t.vb.t("A conversa original não está disponível. Copie ou descarte este rascunho local. Nada será enviado ou movido. Descartar não desfaz um upload ou uma mensagem já enviada."));
		Mt(E, {
			get title() {
				return Q(e);
			},
			get closeLabel() {
				return Q(n);
			},
			get description() {
				return Q(r);
			},
			get open() {
				return Q(u);
			},
			set open(e) {
				F(u, e, !0);
			},
			children: (e, n) => {
				var r = bc(), i = $(r);
				{
					let e = q(() => t.vb.t("Rascunho original"));
					Qn(i, {
						readonly: !0,
						get value() {
							return Q(_);
						},
						get "aria-label"() {
							return Q(e);
						},
						rows: 8
					});
				}
				var a = J(i, 2), o = (e) => {
					var t = yc(), n = B(t, !0);
					I(() => s(n, Q(d))), P(e, t);
				};
				C(a, (e) => {
					Q(d) && e(o);
				});
				var c = J(a, 2), l = z(c);
				{
					let e = q(() => !Q(h));
					k(l, {
						variant: "outline",
						get disabled() {
							return Q(e);
						},
						onclick: v,
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Copiar")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var u = J(l, 2);
				{
					let e = q(() => !Q(h));
					k(u, {
						variant: "destructive",
						get disabled() {
							return Q(e);
						},
						onclick: b,
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Descartar rascunho")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				W(c), P(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	P(e, x), U(), i();
}
// svelte/features/composer/EmojiPicker.svelte
var Cc = h("<!> <div class=\"tw:grid tw:max-h-60 tw:grid-cols-[repeat(auto-fill,minmax(38px,1fr))] tw:gap-1 tw:overflow-y-auto\"></div>", 1);
function wc(e, t) {
	R(t, !0);
	let n = v(t, "open", 15, !1), r = Z(""), i = Z(null), a = Z(null), o = q(() => ca(Q(r)));
	re(() => {
		n() && F(r, "");
	});
	let u = !0;
	c(() => {
		u = !1;
	});
	function d(e) {
		u && n() && (t.onpick(e), n(!1));
	}
	{
		let c = q(() => t.vb.t("Emoji")), u = q(() => t.vb.t("Fechar"));
		Mt(e, {
			get title() {
				return Q(c);
			},
			get closeLabel() {
				return Q(u);
			},
			initialFocus: () => window.matchMedia("(pointer: coarse)").matches ? Q(a)?.querySelector("button") || null : Q(i),
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var c = Cc(), u = $(c);
				{
					let e = q(() => t.vb.t("Buscar emoji…")), n = q(() => t.vb.t("Buscar emoji…"));
					Wn(u, {
						type: "search",
						get "aria-label"() {
							return Q(e);
						},
						get placeholder() {
							return Q(n);
						},
						get value() {
							return Q(r);
						},
						oninput: (e) => F(r, e.currentTarget.value, !0),
						onkeydown: (e) => {
							e.key === "Enter" && Q(o).length && (e.preventDefault(), d(Q(o)[0].emoji));
						},
						get ref() {
							return Q(i);
						},
						set ref(e) {
							F(i, e, !0);
						}
					});
				}
				var f = J(u, 2);
				l(f, 21, () => Q(o), (e) => e.emoji, (e, t) => {
					{
						let n = q(() => `:${Q(t).name}:`), r = q(() => `:${Q(t).name}:`);
						k(e, {
							variant: "ghost",
							class: "tw:text-xl",
							get title() {
								return Q(n);
							},
							get "aria-label"() {
								return Q(r);
							},
							onclick: () => d(Q(t).emoji),
							children: (e, n) => {
								Y();
								var r = g();
								I(() => s(r, Q(t).emoji)), P(e, r);
							},
							$$slots: { default: !0 }
						});
					}
				}), W(f), x(f, (e) => F(a, e), () => Q(a)), P(e, c);
			},
			$$slots: { default: !0 }
		});
	}
	U();
}
// svelte/features/composer/PollCreateDialog.svelte
var Tc = h(" <!>", 1), Ec = h("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Dc = h("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!>", 1), Oc = h("<form class=\"tw:grid tw:gap-4\"><!> <div class=\"tw:grid tw:gap-2\"></div> <!> <label class=\"tw:flex tw:items-center tw:gap-2\"><!><span> </span></label> <!> <!> <div class=\"tw:flex tw:justify-end tw:gap-2\"><!><!></div></form>");
function kc(e, t) {
	R(t, !0);
	let n = () => T(f, "$draft", r), [r, i] = y(), a = v(t, "open", 15, !1), o = !0, u = Z(null);
	c(() => {
		o = !1;
	});
	function d(e) {
		return o && a() && !!Q(u)?.isConnected && (!e || e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected);
	}
	let f = G(() => t.entry.state), p = q(() => n().pollPhase === "pending" || n().pollPhase === "unconfirmed"), m = "";
	re(() => {
		let e = n().notice;
		G(() => {
			e !== m && (m = e, e === "poll-created" && a(!1));
		});
	});
	function h(e, r) {
		d() && t.entry.editPoll({ options: n().poll.options.map((t, n) => n === e ? r : t) });
	}
	{
		let r = q(() => t.vb.t("Nova votação")), i = q(() => t.vb.t("Fechar"));
		Mt(e, {
			get title() {
				return Q(r);
			},
			get closeLabel() {
				return Q(i);
			},
			get open() {
				return a();
			},
			set open(e) {
				a(e);
			},
			children: (e, r) => {
				var i = Oc(), o = z(i);
				Kn(o, {
					children: (e, r) => {
						Y();
						var i = Tc(), a = $(i, !0), o = J(a);
						Wn(o, {
							required: !0,
							get maxlength() {
								return 300;
							},
							get value() {
								return n().poll.question;
							},
							get disabled() {
								return Q(p);
							},
							oninput: (e) => {
								d(e) && t.entry.editPoll({ question: e.currentTarget.value });
							}
						}), I((e) => s(a, e), [() => t.vb.t("Pergunta (ex.: Qual cruzeiro?)")]), P(e, i);
					},
					$$slots: { default: !0 }
				});
				var c = J(o, 2);
				l(c, 5, () => n().poll.options, w, (e, n, r) => {
					{
						let i = q(() => t.vb.t("Opção {n}", { n: r + 1 }));
						Wn(e, {
							get "aria-label"() {
								return Q(i);
							},
							get maxlength() {
								return 200;
							},
							get value() {
								return Q(n);
							},
							get disabled() {
								return Q(p);
							},
							oninput: (e) => h(r, e.currentTarget.value)
						});
					}
				}), W(c);
				var f = J(c, 2);
				{
					let e = q(() => Q(p) || n().poll.options.length >= 10);
					k(f, {
						variant: "link",
						get disabled() {
							return Q(e);
						},
						onclick: (e) => {
							d(e) && t.entry.editPoll({ options: [...n().poll.options, ""] });
						},
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, `+ ${e ?? ""}`), [() => t.vb.t("opção")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var m = J(f, 2), _ = z(m);
				$n(_, {
					get checked() {
						return n().poll.multi;
					},
					get disabled() {
						return Q(p);
					},
					onchange: (e) => {
						d(e) && e.currentTarget instanceof HTMLInputElement && t.entry.editPoll({ multi: e.currentTarget.checked });
					}
				});
				var v = J(_), y = B(v, !0);
				W(m);
				var b = J(m, 2), S = (e) => {
					var r = Ec(), i = B(r, !0);
					I((e) => s(i, e), [() => n().pollError === "poll-invalid" ? t.vb.t("Coloque pelo menos 2 opções.") : n().pollPhase === "unconfirmed" ? t.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.") : n().pollError]), P(e, r);
				};
				C(b, (e) => {
					n().pollError && e(S);
				});
				var T = J(b, 2), E = (e) => {
					var n = Dc(), r = $(n), i = B(r, !0), a = J(r, 2);
					k(a, {
						variant: "outline",
						onclick: (e) => {
							d(e) && t.entry.reviewPoll();
						},
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Conferi a sala; manter rascunho")]), P(e, r);
						},
						$$slots: { default: !0 }
					}), I((e) => s(i, e), [() => t.vb.t("Confira a votação na sala antes de tentar novamente.")]), P(e, n);
				};
				C(T, (e) => {
					n().pollPhase === "unconfirmed" && e(E);
				});
				var O = J(T, 2), A = z(O);
				k(A, {
					variant: "outline",
					onclick: () => a(!1),
					children: (e, n) => {
						Y();
						var r = g();
						I((e) => s(r, e), [() => t.vb.t("Cancelar")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
				var j = J(A);
				{
					let e = q(() => n().pollPhase === "pending");
					k(j, {
						type: "submit",
						get disabled() {
							return Q(p);
						},
						get loading() {
							return Q(e);
						},
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Criar votação")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				W(O), W(i), x(i, (e) => F(u, e), () => Q(u)), I((e) => s(y, e), [() => t.vb.t("cada pessoa pode escolher várias")]), D("submit", i, (e) => {
					e.preventDefault(), d(e) && t.entry.createPoll();
				}), P(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	U(), i();
}
// svelte/features/composer/NativeComposer.svelte
var Ac = h("<div role=\"status\" class=\"tw:rounded-control tw:border-2 tw:border-dashed tw:border-primary tw:bg-primary/10 tw:p-4 tw:text-center\"> </div>"), jc = h("<img class=\"tw:h-20 tw:w-full tw:rounded-sm tw:object-cover\"/>"), Mc = h("<div class=\"tw:relative tw:flex tw:w-32 tw:flex-col tw:gap-1 tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-2\"><!><span class=\"tw:break-words tw:text-xs\"> </span><span role=\"status\" class=\"tw:text-xs tw:text-muted-foreground\"> </span><!><!></div>"), Nc = h("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div>"), Pc = h("<b> </b><span class=\"tw:block tw:truncate\"> </span>", 1), Fc = h("<div data-composer-reply=\"\" class=\"tw:flex tw:items-center tw:gap-2 tw:rounded-control tw:border-l-2 tw:border-primary tw:bg-muted tw:p-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:text-xs\"><!></div> <!></div>"), Ic = h("<button type=\"button\" role=\"option\"><!><b> </b><small class=\"tw:text-muted-foreground\"> </small></button>"), Lc = h("<div role=\"listbox\" class=\"tw:absolute tw:bottom-full tw:left-3 tw:z-20 tw:max-h-64 tw:max-w-[calc(100%-1.5rem)] tw:overflow-auto tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-1 tw:shadow-lg\"></div>"), Rc = h(" <small> </small>", 1), zc = h("<div role=\"menu\" tabindex=\"-1\" class=\"tw:absolute tw:bottom-full tw:left-0 tw:z-20 tw:mb-2 tw:grid tw:min-w-56 tw:gap-1 tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-2 tw:shadow-lg\"><!><!><!></div>"), Bc = h("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> <!></p> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>", 1), Vc = h("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-xs tw:text-destructive\"> </p>"), Hc = h("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), Uc = h("<p role=\"status\" data-composer-dictating=\"\" class=\"tw:m-0 tw:text-xs tw:text-destructive\"> </p>"), Wc = h("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-destructive\"> </p>"), Gc = h("<section data-native-composer=\"\" data-vb-native=\"\"><!> <!> <!> <!> <form class=\"tw:flex tw:items-end tw:gap-2\"><!> <!> <div class=\"tw:relative\"><!> <!></div> <input type=\"file\" class=\"tw:hidden\" multiple=\"\" hidden=\"\"/> <!> <!></form> <!> <!> <!> <!> <!> <!><!></section>");
function Kc(e, t) {
	let n = m();
	R(t, !0);
	let r = () => T(_, "$draft", i), [i, a] = y(), d = v(t, "agents", 19, () => []), p = v(t, "hidden", 3, !1), h = G(() => t.drafts.entry({
		account: t.room.me,
		roomId: t.room.id,
		thread: t.thread
	})), _ = h.state, b = Z(!1), E = Z(""), O = !0, A = Z(null), M = Z(null), L = Z(null), V = Z(null), H = Z(!1), ee = Z(!1), te = Z(!1), ne = Z(!1), K = Z(0), ae = Z(0), oe = Z(0), se = Z(!1), ce = _c({
		factory: G(() => t.speechFactory === void 0 ? pc(window) : t.speechFactory || void 0),
		locale: G(() => t.vb.locale || "pt-BR"),
		read: () => {
			let e = X(h.state);
			return {
				text: e.text,
				revision: e.revision,
				start: Q(A)?.selectionStart ?? e.text.length,
				end: Q(A)?.selectionEnd ?? e.text.length
			};
		},
		write: (e, t) => {
			xe() && (h.edit(e), Q(A) && (Q(A).value = e, t !== void 0 && Q(A).setSelectionRange(t, t)), Ce(), F(se, !0));
		},
		canStart: () => xe() && document.activeElement === Q(A) && !Q(ge) && !document.querySelector("[role=\"dialog\"][data-state=\"open\"],[role=\"alertdialog\"][data-state=\"open\"],dialog[open]"),
		recording: (e) => {
			O && F(b, e, !0);
		},
		error: (e) => {
			O && F(E, e, !0);
		},
		ended: () => {
			ve();
		}
	}), le = /* @__PURE__ */ new Map(), ue = q(() => r().error !== "draft-limit" && h.available() && t.room.members.includes(t.room.me) && (t.thread === "main" || t.room.epics.some((e) => e.id === t.thread))), de = q(() => r().replyId ? [...t.room.messages, ...t.room.origins || []].find((e) => e.id === r().replyId && e.thread === t.thread && Jt(t.room, e)) : void 0), fe = q(() => {
		if (!r().candidate) return;
		let e = Zt(t.room, r().candidate);
		if (e && Jt(t.room, e)) return e.id;
		let n = e?.reply_to ? Zt(t.room, e.reply_to) : void 0;
		return n && Jt(t.room, n) ? n.id : void 0;
	}), pe = q(() => !p() && !Q(se) ? oa(r().text, Q(K), t.room, t.vb.knownNames, d()) : null), me = q(() => Q(pe)?.items || []), he = q(() => Q(me).length ? Q(oe) % Q(me).length : 0), ge = q(() => r().phase === "pending" || r().phase === "unconfirmed");
	re(() => {
		p() && (ce.cancel(), F(H, !1), F(ee, !1), F(te, !1), F(se, !0));
	}), re(() => {
		let e = t.room, n = t.request, r = t.upload;
		G(() => h.sync(e, n, r));
	}), re(() => {
		let e = r().attachments;
		G(() => {
			for (let [t, n] of le) e.some((e) => e.id === t && e.file === n.file) || (URL.revokeObjectURL(n.url), le.delete(t));
		});
	});
	function _e(e) {
		if (e.meta && e.type.startsWith("image/")) return `/api/books/${encodeURIComponent(t.room.id)}/files/${encodeURIComponent(e.meta.id)}`;
		if (!e.file || !e.type.startsWith("image/")) return;
		let n = le.get(e.id);
		if (n?.file === e.file) return n.url;
		n && URL.revokeObjectURL(n.url);
		let r = URL.createObjectURL(e.file);
		return le.set(e.id, {
			file: e.file,
			url: r
		}), r;
	}
	async function ve(e) {
		await ie(), O && !p() && Q(ue) && Q(A)?.isConnected && (Q(A).focus(), e !== void 0 && Q(A).setSelectionRange(e, e), F(K, Q(A).selectionStart, !0), F(ae, Q(A).selectionEnd, !0));
	}
	let ye = h.attachFocus(() => {
		ve();
	});
	c(() => {
		O = !1, ce.dispose(), clearTimeout(be), ye();
		for (let e of le.values()) URL.revokeObjectURL(e.url);
		le.clear();
	});
	let be;
	function xe(e) {
		return O && !p() && Q(ue) && !!Q(L)?.isConnected && (!e || e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected);
	}
	function Se() {
		xe() && (ce.cancel(), h.submit());
	}
	function Ce() {
		Q(A) && (F(K, Q(A).selectionStart, !0), F(ae, Q(A).selectionEnd, !0));
	}
	function we(e) {
		if (!O || !Q(ue) || p()) return;
		let t = sa(r().text, Q(K), Q(ae), e);
		h.edit(t.text), F(se, !0), ve(t.caret);
	}
	function Te(e) {
		let t = Q(me)[e];
		if (!O || !Q(ue) || !Q(pe) || !t) return;
		let n = sa(r().text, Q(pe).start, Q(K), `@${t.handle} `);
		h.edit(n.text), F(se, !0), ve(n.caret);
	}
	async function Ee(e = !1) {
		xe() && (ce.cancel(), Ce(), F(H, !0), e && (await ie(), xe() && Q(V)?.querySelector("button")?.focus()));
	}
	function De(e) {
		if (xe(e)) {
			if (e.key === "Escape") e.preventDefault(), e.stopPropagation(), F(H, !1), Q(L)?.querySelector("[data-composer-more]")?.focus();
			else if ([
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(e.key)) {
				e.preventDefault();
				let t = [...Q(V)?.querySelectorAll("button:not(:disabled)") || []];
				if (!t.length) return;
				let n = t.findIndex((e) => e === document.activeElement);
				t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : (n + (e.key === "ArrowDown" ? 1 : t.length - 1) + t.length) % t.length].focus();
			}
		}
	}
	function Oe(e) {
		if (xe(e)) {
			if (e.key === "Escape" && Q(b)) e.preventDefault(), e.stopPropagation(), ce.cancel();
			else if (!ce.keydown(e)) {
				if (Q(me).length) {
					if (e.key === "ArrowDown" || e.key === "ArrowUp") {
						e.preventDefault(), F(oe, (Q(he) + (e.key === "ArrowDown" ? 1 : Q(me).length - 1)) % Q(me).length);
						return;
					}
					if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) {
						e.preventDefault(), Te(Q(he));
						return;
					}
					if (e.key === "Escape") {
						e.preventDefault(), e.stopPropagation(), F(se, !0);
						return;
					}
				}
				e.key === "Escape" && r().replyId ? (e.preventDefault(), e.stopPropagation(), h.clearReply()) : e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), Se());
			}
		}
	}
	u(() => {
		let e = Q(L)?.closest("main"), t = (t) => {
			let n = t.target, r = n instanceof HTMLElement && (n.isContentEditable || /^(INPUT|TEXTAREA)$/.test(n.tagName));
			if (p() || !O || !Q(ue) || !Q(A)?.isConnected || r && n !== Q(A)) return;
			let i = document.activeElement;
			if ([...document.querySelectorAll("dialog[open],[role=\"dialog\"],[role=\"alertdialog\"]")].find((e) => e.dataset.state !== "closed" && !e.hidden && e.getAttribute("aria-hidden") !== "true") && n !== Q(A) || n instanceof Node && n !== document.body && !e?.contains(n) || i instanceof HTMLElement && i !== document.body && !e?.contains(i) && n !== Q(A)) return;
			let a = [...t.clipboardData?.files || []];
			a.length || (a = [...t.clipboardData?.items || []].filter((e) => e.kind === "file").flatMap((e) => {
				let t = e.getAsFile();
				return t ? [t] : [];
			})), a.length && (t.preventDefault(), h.addFiles(a), ve());
		}, n = (e) => {
			O && !p() && Q(ue) && e.dataTransfer?.types.includes("Files") && (e.preventDefault(), F(ne, !0));
		}, r = (t) => {
			t.relatedTarget instanceof Node && e?.contains(t.relatedTarget) || F(ne, !1);
		}, i = (e) => {
			if (!O || p() || !Q(ue)) return;
			let t = [...e.dataTransfer?.files || []];
			t.length && (e.preventDefault(), h.addFiles(t), ve()), F(ne, !1);
		}, a = (e) => {
			Q(H) && e.target instanceof Node && !Q(V)?.contains(e.target) && !Q(L)?.querySelector("[data-composer-more]")?.contains(e.target) && F(H, !1);
		}, o = () => ce.cancel();
		return window.addEventListener("blur", o), document.addEventListener("paste", t), document.addEventListener("pointerdown", a), e?.addEventListener("dragover", n), e?.addEventListener("dragleave", r), e?.addEventListener("drop", i), () => {
			window.removeEventListener("blur", o), document.removeEventListener("paste", t), document.removeEventListener("pointerdown", a), e?.removeEventListener("dragover", n), e?.removeEventListener("dragleave", r), e?.removeEventListener("drop", i);
		};
	});
	var ke = Gc(), Ae = z(ke), je = (e) => {
		var n = Ac(), r = B(n, !0);
		I((e) => s(r, e), [() => t.vb.t("Anexar arquivo")]), P(e, n);
	};
	C(Ae, (e) => {
		Q(ne) && e(je);
	});
	var Me = J(Ae, 2), Ne = (e) => {
		var n = Nc();
		l(n, 5, () => r().attachments, (e) => e.id, (e, n) => {
			let r = q(() => _e(Q(n)));
			var i = Mc(), a = z(i), o = (e) => {
				var t = jc();
				I(() => {
					j(t, "src", Q(r)), j(t, "alt", Q(n).name);
				}), P(e, t);
			}, c = (e) => {
				Yn(e, { name: "file" });
			};
			C(a, (e) => {
				Q(r) ? e(o) : e(c, -1);
			});
			var l = J(a), u = B(l, !0), d = J(l), f = B(d, !0), p = J(d), m = (e) => {
				k(e, {
					size: "sm",
					variant: "outline",
					onclick: (e) => {
						xe(e) && h.retryUpload(Q(n).id);
					},
					children: (e, n) => {
						Y();
						var r = g();
						I((e) => s(r, e), [() => t.vb.t("Tentar novamente")]), P(e, r);
					},
					$$slots: { default: !0 }
				});
			};
			C(p, (e) => {
				Q(n).phase === "error" && e(m);
			});
			var _ = J(p);
			{
				let e = q(() => t.vb.t("Remover anexo"));
				Nt(_, {
					icon: "close",
					get label() {
						return Q(e);
					},
					class: "tw:absolute tw:right-1 tw:top-1 tw:bg-card",
					onclick: (e) => {
						xe(e) && h.removeFile(Q(n).id);
					}
				});
			}
			W(i), I((e) => {
				j(i, "data-composer-attachment", Q(n).id), s(u, Q(n).name), s(f, e);
			}, [() => Q(n).phase === "queued" || Q(n).phase === "uploading" ? t.vb.t("Enviando…") : Q(n).phase === "error" ? fa(Q(n).error || "failed", t.vb.t) : t.vb.t("Pronto")]), P(e, i);
		}), W(n), P(e, n);
	};
	C(Me, (e) => {
		r().attachments.length && e(Ne);
	});
	var Pe = J(Me, 2), Fe = (e) => {
		var n = Fc(), r = z(n);
		Yn(r, { name: "reply" });
		var i = J(r, 2), a = z(i), o = (e) => {
			var n = Pc(), r = $(n), i = B(r, !0), a = J(r), o = B(a, !0);
			I((e, t) => {
				s(i, e), s(o, t);
			}, [() => Q(de).author === "ai" ? "@vibe" : Q(de).kind === "agent" ? t.vb.t("{via} de {who}", {
				via: "Agent",
				who: t.vb.name(Q(de).author)
			}) : t.vb.name(Q(de).author), () => !Q(de).text && Q(de).poll ? t.vb.t("votação") : la(Q(de))]), P(e, n);
		}, c = (e) => {
			var n = g();
			I((e) => s(n, e), [() => t.vb.t("A mensagem não está mais disponível.")]), P(e, n);
		};
		C(a, (e) => {
			Q(de) ? e(o) : e(c, -1);
		}), W(i);
		var l = J(i, 2);
		{
			let e = q(() => t.vb.t("Cancelar resposta"));
			Nt(l, {
				icon: "close",
				get label() {
					return Q(e);
				},
				onclick: (e) => {
					xe(e) && h.clearReply();
				}
			});
		}
		W(n), P(e, n);
	};
	C(Pe, (e) => {
		r().replyId && e(Fe);
	});
	var Ie = J(Pe, 2), Le = (e) => {
		var r = Lc();
		l(r, 21, () => Q(me), w, (e, r, i) => {
			var a = Ic(), c = z(a);
			{
				let e = q(() => t.vb.name(Q(r).email)), n = q(() => t.vb.avatarUrl?.(Q(r).email));
				Hn(c, {
					get name() {
						return Q(e);
					},
					get src() {
						return Q(n);
					},
					class: "tw:size-6"
				});
			}
			var l = J(c), u = B(l), d = J(l), p = B(d, !0);
			W(a), I((e) => {
				j(a, "id", `${n}-mention-${i}`), j(a, "aria-selected", Q(he) === i), N(a, 1, f(Q(he) === i ? "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-control tw:bg-accent tw:p-2 tw:text-left" : "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-control tw:p-2 tw:text-left tw:hover:bg-accent")), s(u, `@${Q(r).handle ?? ""}`), s(p, e);
			}, [() => t.vb.t(Q(r).label)]), o("pointerdown", a, (e) => {
				e.preventDefault(), Te(i);
			}), o("click", a, () => Te(i)), P(e, a);
		}), W(r), I((e) => {
			j(r, "id", `${n}-mentions`), j(r, "aria-label", e);
		}, [() => t.vb.t("Mencionar")]), P(e, r);
	};
	C(Ie, (e) => {
		Q(me).length && e(Le);
	});
	var Re = J(Ie, 2), ze = z(Re);
	{
		let e = q(() => t.vb.t("Emoji")), n = q(() => !Q(ue));
		Nt(ze, {
			icon: "smile",
			get label() {
				return Q(e);
			},
			get disabled() {
				return Q(n);
			},
			onclick: (e) => {
				xe(e) && (ce.cancel(), Ce(), F(ee, !0));
			}
		});
	}
	var Be = J(ze, 2), Ve = (e) => {
		{
			let n = q(() => t.vb.t("Ditar mensagem")), r = q(() => t.vb.t("Segure pra ditar (ou segure o espaço)")), i = q(() => Q(b) ? "tw:touch-none tw:bg-destructive tw:text-destructive-foreground" : "tw:touch-none tw:text-muted-foreground"), a = q(() => !Q(ue) || Q(ge));
			Nt(e, {
				icon: "mic",
				get label() {
					return Q(n);
				},
				get title() {
					return Q(r);
				},
				get "aria-pressed"() {
					return Q(b);
				},
				get class() {
					return Q(i);
				},
				get disabled() {
					return Q(a);
				},
				onpointerdown: (e) => {
					if (xe(e)) {
						e.preventDefault();
						try {
							e.currentTarget.setPointerCapture?.(e.pointerId);
						} catch {}
						Q(A)?.focus(), ce.start();
					}
				},
				onpointerup: () => ce.stop(),
				onpointercancel: () => ce.stop(),
				onlostpointercapture: () => ce.stop(),
				onclick: (e) => {
					e.detail === 0 && xe(e) && (e.preventDefault(), Q(A)?.focus(), Q(b) ? ce.stop() : ce.start());
				}
			});
		}
	};
	C(Be, (e) => {
		ce.supported && e(Ve);
	});
	var He = J(Be, 2), Ue = z(He);
	{
		let e = q(() => t.vb.t("Mais opções")), n = q(() => !Q(ue));
		Nt(Ue, {
			icon: "plus",
			get label() {
				return Q(e);
			},
			"data-composer-more": !0,
			"aria-haspopup": "menu",
			get "aria-expanded"() {
				return Q(H);
			},
			get disabled() {
				return Q(n);
			},
			onpointerdown: (e) => {
				document.activeElement === Q(A) && e.preventDefault();
			},
			onkeydown: (e) => {
				e.key === "ArrowDown" && (e.preventDefault(), Ee(!0));
			},
			onclick: (e) => {
				xe(e) && (Q(H) ? F(H, !1) : Ee(e.detail === 0));
			}
		});
	}
	var We = J(Ue, 2), Ge = (e) => {
		var n = zc(), i = z(n);
		k(i, {
			variant: "ghost",
			role: "menuitem",
			onclick: (e) => {
				xe(e) && (F(H, !1), Q(M)?.click());
			},
			children: (e, n) => {
				Y();
				var r = Rc(), i = $(r), a = J(i), o = B(a, !0);
				I((e, t) => {
					s(i, `${e ?? ""} `), s(o, t);
				}, [() => t.vb.t("Anexar arquivo"), () => t.vb.t("ou Cmd+V")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
		var a = J(i);
		k(a, {
			variant: "ghost",
			role: "menuitem",
			onclick: (e) => {
				if (!xe(e)) return;
				F(H, !1);
				let t = r().text.slice(0, Q(K));
				we(t && !/\s$/.test(t) ? " @" : "@"), F(se, !1);
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, `${e ?? ""} @`), [() => t.vb.t("Mencionar alguém")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
		var c = J(a);
		k(c, {
			variant: "ghost",
			role: "menuitem",
			onclick: (e) => {
				xe(e) && (F(H, !1), F(te, !0));
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => t.vb.t("Criar votação")]), P(e, r);
			},
			$$slots: { default: !0 }
		}), W(n), x(n, (e) => F(V, e), () => Q(V)), o("keydown", n, De), P(e, n);
	};
	C(We, (e) => {
		Q(H) && e(Ge);
	}), W(He);
	var Ke = J(He, 2);
	x(Ke, (e) => F(M, e), () => Q(M));
	var qe = J(Ke, 2);
	{
		let e = q(() => Math.min(6, r().text.split("\n").length)), i = q(() => t.vb.t("Mensagem…")), a = q(() => t.vb.t("Mensagem…")), o = q(() => !Q(ue)), s = q(() => Q(me).length ? `${n}-mentions` : void 0), c = q(() => Q(me).length ? `${n}-mention-${Q(he)}` : void 0), l = q(() => S("tw:block tw:min-h-11 tw:max-h-40 tw:min-w-0 tw:flex-1 tw:resize-none tw:[field-sizing:content]", Q(b) ? "tw:ring-2 tw:ring-destructive tw:focus-visible:ring-destructive" : ""));
		Qn(qe, {
			id: "input",
			get rows() {
				return Q(e);
			},
			get "aria-label"() {
				return Q(i);
			},
			get placeholder() {
				return Q(a);
			},
			get value() {
				return r().text;
			},
			get disabled() {
				return Q(o);
			},
			"aria-autocomplete": "list",
			get "aria-controls"() {
				return Q(s);
			},
			get "aria-activedescendant"() {
				return Q(c);
			},
			get class() {
				return Q(l);
			},
			oninput: (e) => {
				xe(e) && (ce.cancel(), clearTimeout(be), h.edit(e.currentTarget.value), Ce(), F(oe, 0), F(se, !1));
			},
			onselect: Ce,
			onclick: Ce,
			onkeyup: (e) => {
				ce.keyup(e), Ce();
			},
			onkeydown: Oe,
			onfocus: () => clearTimeout(be),
			onblur: () => {
				ce.cancel(), be = setTimeout(() => {
					O && F(se, !0);
				}, 100);
			},
			get ref() {
				return Q(A);
			},
			set ref(e) {
				F(A, e, !0);
			}
		});
	}
	var Je = J(qe, 2);
	{
		let e = q(() => !Q(ue) || Q(ge) || r().attachments.some((e) => e.phase === "queued" || e.phase === "uploading")), n = q(() => r().phase === "pending");
		k(Je, {
			type: "submit",
			"data-composer-send": !0,
			get disabled() {
				return Q(e);
			},
			get loading() {
				return Q(n);
			},
			onmousedown: (e) => e.preventDefault(),
			ontouchend: (e) => {
				!Q(ge) && Q(ue) && (e.preventDefault(), Se());
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => t.vb.t("Enviar")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	W(Re);
	var Ye = J(Re, 2), Xe = (e) => {
		var n = Bc(), r = $(n), i = z(r, !0), a = J(i), o = (e) => {
			k(e, {
				variant: "link",
				size: "sm",
				onclick: (e) => {
					xe(e) && Q(fe) && t.navigate(Q(fe));
				},
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.vb.t("Ver mensagem correspondente")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		C(a, (e) => {
			Q(fe) && e(o);
		}), W(r);
		var c = J(r, 2), l = z(c);
		k(l, {
			size: "sm",
			variant: "outline",
			onclick: (e) => {
				xe(e) && h.review(!0);
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => t.vb.t("Conferi a sala; manter rascunho")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
		var u = J(l);
		k(u, {
			size: "sm",
			variant: "ghost",
			onclick: (e) => {
				xe(e) && h.review(!1);
			},
			children: (e, n) => {
				Y();
				var r = g();
				I((e) => s(r, e), [() => t.vb.t("Conferi a sala; descartar rascunho")]), P(e, r);
			},
			$$slots: { default: !0 }
		}), W(c), I((e) => s(i, e), [() => t.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.")]), P(e, n);
	}, Ze = (e) => {
		var n = Vc(), i = B(n, !0);
		I((e) => s(i, e), [() => fa(r().error, t.vb.t)]), P(e, n);
	};
	C(Ye, (e) => {
		r().phase === "unconfirmed" ? e(Xe) : r().error && e(Ze, 1);
	});
	var Qe = J(Ye, 2), $e = (e) => {
		var n = Hc(), i = B(n, !0);
		I((e) => s(i, e), [() => r().notice === "sent" ? t.vb.t("Enviado") : r().notice === "sent-edited" ? t.vb.t("Enviado. Seu novo rascunho foi mantido.") : r().notice === "poll-created" ? t.vb.t("Votação criada") : r().notice === "reviewed-discarded" ? t.vb.t("Rascunho descartado") : t.vb.t("Rascunho mantido")]), P(e, n);
	};
	C(Qe, (e) => {
		r().notice && e($e);
	});
	var et = J(Qe, 2), tt = (e) => {
		var n = Uc(), r = B(n, !0);
		I((e) => s(r, e), [() => t.vb.t("Ouvindo… Escape para parar.")]), P(e, n);
	};
	C(et, (e) => {
		Q(b) && e(tt);
	});
	var nt = J(et, 2), rt = (e) => {
		var n = Wc(), r = B(n, !0);
		I((e) => s(r, e), [() => Q(E) === "not-allowed" ? t.vb.t("O navegador não deixou usar o microfone.") : Q(E) === "invalid-result" ? t.vb.t("O ditado foi interrompido. Seu rascunho foi mantido.") : t.vb.t("Não foi possível iniciar o ditado.")]), P(e, n);
	};
	C(nt, (e) => {
		Q(E) && e(rt);
	});
	var it = J(nt, 2);
	Sc(it, {
		get room() {
			return t.room;
		},
		get drafts() {
			return t.drafts;
		},
		get vb() {
			return t.vb;
		}
	});
	var at = J(it, 2);
	wc(at, {
		get vb() {
			return t.vb;
		},
		onpick: we,
		get open() {
			return Q(ee);
		},
		set open(e) {
			F(ee, e, !0);
		}
	}), kc(J(at), {
		get entry() {
			return h;
		},
		get vb() {
			return t.vb;
		},
		get open() {
			return Q(te);
		},
		set open(e) {
			F(te, e, !0);
		}
	}), W(ke), x(ke, (e) => F(L, e), () => Q(L)), I(() => {
		j(ke, "hidden", p()), N(ke, 1, f(p() ? "tw:hidden" : "tw:relative tw:shrink-0 tw:space-y-2 tw:border-t tw:border-border tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground tw:sm:px-6")), j(Ke, "accept", ta);
	}), D("submit", Re, (e) => {
		e.preventDefault(), Se();
	}), o("change", Ke, (e) => {
		xe(e) && (h.addFiles([...e.currentTarget.files || []]), e.currentTarget.value = "");
	}), P(e, ke), U(), a();
}
i([
	"pointerdown",
	"click",
	"keydown",
	"change"
]);
// svelte/Composer.svelte
var qc = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Jc(n, r) {
	R(r, !0);
	let i = E(r, qc);
	var a = t(), o = $(a);
	e(o, () => r.drafts, (n) => {
		var a = t(), o = $(a);
		e(o, () => `${r.room.me}:${r.room.id}:${r.thread}`, (e) => {
			Kc(e, O(() => i));
		}), P(n, a);
	}), P(n, a), U();
}
// svelte/TaskList.svelte
var Yc = h("<!> ", 1), Xc = h("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Zc = h("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Qc = h("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), $c = h("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), el = h("<!> <!>", 1);
function tl(e, t) {
	let n = m();
	R(t, !0);
	let r = v(t, "waits", 19, () => []), i = q(() => t.room.epics.find((e) => e.id === t.thread) ?? (t.thread === "main" && t.room.roomTasks?.length ? {
		id: "main",
		tasks: t.room.roomTasks,
		flags: []
	} : null)), a = (e) => r().some((n) => n.book_id === t.room.id && n.ref === `t${e.id}`), o = q(() => (Q(i)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!a(e.task)) - (t.task.done ? 2 : +!a(t.task)) || e.index - t.index).map((e) => e.task)), c = q(() => Q(i)?.tasks.filter((e) => e.done).length ?? 0), u = q(() => [{
		value: "",
		label: t.vb.t("sem dono")
	}, ...(t.room.members ?? []).map((e) => ({
		value: e,
		label: e === t.room.me ? t.vb.t("você") : t.vb.name(e)
	}))]), d = Z(null), p = Z(te(/* @__PURE__ */ new Set()));
	function h(e, t) {
		let n, r = () => {
			F(p, new Set([...Q(p)].filter((e) => e !== t)), !0);
		}, i = () => {
			e.isConnected && (n !== void 0 && clearTimeout(n), F(p, /* @__PURE__ */ new Set([...Q(p), t]), !0), n = setTimeout(r, 1800));
		};
		return e.addEventListener("vb:task-highlight", i), { destroy() {
			e.removeEventListener("vb:task-highlight", i), n !== void 0 && clearTimeout(n), r();
		} };
	}
	let _ = Z(""), y = Z(null), b = Z(""), x = Z(""), w = Z(null), T = Z(!1), E = Z(""), A = Z(null), V = q(() => Q(i)?.tasks.find((e) => e.id === Q(w)));
	re(() => {
		Q(d) && Q(y) && (Q(y).focus(), Q(y).select());
	}), re(() => {
		Q(w) && !Q(V) && G(), Q(d) && !Q(i)?.tasks.some((e) => e.id === Q(d)) && F(d, null);
	});
	function H(e) {
		try {
			if (t.send(e)) return F(x, ""), !0;
		} catch {}
		return F(x, t.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function ee(e, t = !0) {
		Q(d) !== e.id || t && Q(_).trim() && Q(_) !== e.title && !H({
			t: "task.rename",
			id: e.id,
			title: Q(_)
		}) || F(d, null);
	}
	function ne(e) {
		F(w, e.id, !0), F(E, e.due ?? "", !0), F(T, !0);
	}
	function G() {
		F(T, !1), F(w, null), F(E, "");
	}
	var K = el(), ie = $(K), ae = (e) => {
		var n = Qc(), r = z(n), m = z(r), v = B(m, !0), w = J(m, 2);
		Un(w, {
			children: (e, t) => {
				Y();
				var n = g();
				I(() => s(n, `${Q(c) ?? ""}/${Q(i).tasks.length ?? ""}`)), P(e, n);
			},
			$$slots: { default: !0 }
		});
		var E = J(w, 2);
		{
			let e = q(() => t.vb.t("Tarefas")), n = q(() => Math.max(1, Q(i).tasks.length)), r = q(() => `${Q(c)}/${Q(i).tasks.length}`);
			Zn(E, {
				get label() {
					return Q(e);
				},
				get value() {
					return Q(c);
				},
				get max() {
					return Q(n);
				},
				get "aria-valuetext"() {
					return Q(r);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		W(r);
		var O = J(r, 2), A = (e) => {
			{
				let t = q(() => `@vibe: ${Q(i).flags.join(" · ")}`);
				Un(e, {
					variant: "warning",
					get title() {
						return Q(t);
					},
					children: (e, t) => {
						var n = Yc(), r = $(n);
						Yn(r, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = J(r, 1, !0);
						I((e) => s(a, e), [() => Q(i).flags.join(" · ")]), P(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		C(O, (e) => {
			Q(i).flags?.length && e(A);
		});
		var L = J(O, 2), R = (e) => {
			Xn(e, {
				get title() {
					return Q(x);
				},
				compact: !0
			});
		};
		C(L, (e) => {
			Q(x) && !Q(T) && e(R);
		});
		var V = J(L, 2);
		l(V, 21, () => Q(o), (e) => e.id, (e, n) => {
			var r = Zc(), i = z(r);
			{
				let e = q(() => t.vb.t("Feita"));
				$n(i, {
					get checked() {
						return Q(n).done;
					},
					get "aria-label"() {
						return Q(e);
					},
					onclick: (e) => {
						e.preventDefault(), H({
							t: "task.toggle",
							id: Q(n).id
						});
					}
				});
			}
			var o = J(i, 2), c = (e) => {
				{
					let r = q(() => t.vb.t("Clique para editar"));
					Wn(e, {
						get "data-task-edit"() {
							return Q(n).id;
						},
						get "aria-label"() {
							return Q(r);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => ee(Q(n)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), ee(Q(n))), e.key === "Escape" && (e.preventDefault(), ee(Q(n), !1));
						},
						get ref() {
							return Q(y);
						},
						set ref(e) {
							F(y, e, !0);
						},
						get value() {
							return Q(_);
						},
						set value(e) {
							F(_, e, !0);
						}
					});
				}
			}, l = (e) => {
				var r = Xc(), i = z(r);
				{
					let e = q(() => S("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", Q(n).done && "tw:text-muted-foreground tw:line-through")), r = q(() => t.vb.t("Clique para editar"));
					k(i, {
						get "data-task-title"() {
							return Q(n).id;
						},
						variant: "ghost",
						get class() {
							return Q(e);
						},
						get title() {
							return Q(r);
						},
						onclick: () => {
							F(d, Q(n).id, !0), F(_, Q(n).title, !0);
						},
						children: (e, t) => {
							Y();
							var r = g();
							I(() => s(r, Q(n).title)), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var a = J(i, 2), o = (e) => {
					{
						let t = q(() => `@vibe: ${Q(n).flags.join(" · ")}`);
						Un(e, {
							variant: "warning",
							get title() {
								return Q(t);
							},
							children: (e, t) => {
								var r = Yc(), i = $(r);
								Yn(i, {
									name: "warning",
									class: "tw:size-3"
								});
								var a = J(i, 1, !0);
								I((e) => s(a, e), [() => Q(n).flags.join(" · ")]), P(e, r);
							},
							$$slots: { default: !0 }
						});
					}
				};
				C(a, (e) => {
					Q(n).flags?.length && e(o);
				}), W(r), P(e, r);
			};
			C(o, (e) => {
				Q(d) === Q(n).id ? e(c) : e(l, -1);
			});
			var m = J(o, 2);
			{
				let e = q(() => t.vb.t("Responsável")), r = q(() => Q(n).owner ?? "");
				qn(m, {
					get "data-owner"() {
						return Q(n).id;
					},
					get "aria-label"() {
						return Q(e);
					},
					get value() {
						return Q(r);
					},
					get items() {
						return Q(u);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => H({
						t: "task.assign",
						id: Q(n).id,
						owner: e
					})
				});
			}
			var v = J(m, 2);
			{
				let e = q(() => t.vb.t("Prazo")), r = q(() => Q(n).due ? `${t.vb.t("Prazo")}: ${Q(n).due}` : t.vb.t("Prazo"));
				k(v, {
					get "data-due"() {
						return Q(n).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return Q(e);
					},
					get "aria-label"() {
						return Q(r);
					},
					onclick: () => ne(Q(n)),
					children: (e, t) => {
						var r = Yc(), i = $(r);
						Yn(i, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var a = J(i, 1, !0);
						I(() => s(a, Q(n).due ?? "")), P(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			var b = J(v, 2);
			{
				let e = q(() => t.vb.t("Apagar task"));
				Nt(b, {
					get "data-tdel"() {
						return Q(n).id;
					},
					get label() {
						return Q(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => H({
						t: "task.del",
						id: Q(n).id
					})
				});
			}
			W(r), M(r, (e, t) => h?.(e, t), () => Q(n).id), I((e) => {
				j(r, "data-task", Q(n).id), j(r, "aria-label", Q(n).title), N(r, 1, e);
			}, [() => f(S("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", Q(n).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !Q(n).done && Q(n).owner === t.room.me && "tw:border-ring/50", a(Q(n)) && "tw:bg-warning/10", Q(p).has(Q(n).id) && "tw:animate-pulse tw:motion-reduce:animate-none"))]), P(e, r);
		}), W(V);
		var U = J(V, 2), te = z(U);
		{
			let e = q(() => t.vb.t("nova task")), n = q(() => t.vb.t("nova task"));
			Wn(te, {
				get "aria-label"() {
					return Q(e);
				},
				get placeholder() {
					return Q(n);
				},
				get value() {
					return Q(b);
				},
				set value(e) {
					F(b, e, !0);
				}
			});
		}
		var G = J(te, 2);
		{
			let e = q(() => t.vb.t("Nova tarefa"));
			Nt(G, {
				type: "submit",
				get label() {
					return Q(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		W(U), W(n), I((e, t) => {
			j(n, "aria-label", e), s(v, t);
		}, [() => t.vb.t("Tarefas"), () => t.vb.t("Tarefas")]), D("submit", U, (e) => {
			e.preventDefault(), Q(b).trim() && H({
				t: "task.add",
				epic: t.thread,
				title: Q(b)
			}) && F(b, "");
		}), P(e, n);
	};
	C(ie, (e) => {
		Q(i) && e(ae);
	});
	var oe = J(ie, 2), se = (e) => {
		{
			let r = q(() => t.vb.t("Prazo")), i = q(() => t.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), a = q(() => t.vb.t("Fechar"));
			Mt(e, {
				get title() {
					return Q(r);
				},
				get description() {
					return Q(i);
				},
				get closeLabel() {
					return Q(a);
				},
				initialFocus: () => Q(A),
				onOpenChange: (e) => {
					e || G();
				},
				get open() {
					return Q(T);
				},
				set open(e) {
					F(T, e, !0);
				},
				children: (e, r) => {
					var i = $c(), a = z(i);
					{
						let e = (e, t = L) => {
							Wn(e, O(t, {
								get ref() {
									return Q(A);
								},
								set ref(e) {
									F(A, e, !0);
								},
								get value() {
									return Q(E);
								},
								set value(e) {
									F(E, e, !0);
								}
							}));
						}, r = q(() => `${n}-due`), i = q(() => t.vb.t("Prazo"));
						Bn(a, {
							get id() {
								return Q(r);
							},
							get label() {
								return Q(i);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var o = J(a, 2), c = (e) => {
						Xn(e, {
							get title() {
								return Q(x);
							},
							compact: !0
						});
					};
					C(o, (e) => {
						Q(x) && e(c);
					});
					var l = J(o, 2), u = z(l);
					k(u, {
						variant: "outline",
						onclick: G,
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Cancelar")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
					var d = J(u);
					k(d, {
						type: "submit",
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, e), [() => t.vb.t("Salvar")]), P(e, r);
						},
						$$slots: { default: !0 }
					}), W(l), W(i), D("submit", i, (e) => {
						e.preventDefault(), Q(V) && H({
							t: "task.assign",
							id: Q(V).id,
							due: Q(E)
						}) && G();
					}), P(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	};
	C(oe, (e) => {
		Q(V) && e(se);
	}), P(e, K), U();
}
// svelte/Tasks.svelte
var nl = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function rl(n, r) {
	R(r, !0);
	let i = E(r, nl);
	var a = t(), o = $(a);
	e(o, () => JSON.stringify([r.room.id, r.thread]), (e) => {
		tl(e, O(() => i));
	}), P(n, a), U();
}
// svelte/features/documents/mermaid.ts
var il = "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js", al = "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA";
function ol(e, t = setTimeout, n = clearTimeout) {
	let r;
	return () => {
		if (r) return r.promise;
		let i, a, o = new Promise((e, t) => {
			i = e, a = t;
		}), s = { promise: o };
		r = s;
		let c = !1, l, u = () => {}, d = () => {
			c = !0, l !== void 0 && n(l), l = void 0, u();
		}, f = () => {
			c || r !== s || (d(), r = void 0, a(Error("Diagram renderer unavailable")));
		}, p = (e) => {
			if (c || r !== s) return;
			if (typeof e != "object" || !e || !("render" in e) || typeof e.render != "function") {
				f();
				return;
			}
			let t = e.render;
			d(), i({ render: (n, r) => Reflect.apply(t, e, [n, r]) });
		};
		try {
			u = e(p, f), c ? u() : l = t(f, 3e4);
		} catch {
			f();
		}
		return o;
	};
}
var sl = ol((e, t) => {
	let n = document.createElement("script");
	return n.src = il, n.crossOrigin = "anonymous", n.integrity = al, n.onload = () => e(Reflect.get(window, "pele")), n.onerror = t, document.head.append(n), () => {
		n.onload = null, n.onerror = null, n.remove();
	};
}), cl = /* @__PURE__ */ new Set([
	"animate",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"set",
	"image",
	"feimage",
	"foreignobject",
	"script",
	"style"
]), ll = /* @__PURE__ */ new Set([
	"fill",
	"stroke",
	"color",
	"stop-color",
	"flood-color",
	"lighting-color",
	"font-family",
	"font-size",
	"font-weight",
	"font-style",
	"text-decoration"
]);
function ul(e, t) {
	if (e.length > 65536) throw Error("Diagram output limit");
	function n(e) {
		return e.flatMap((e) => e.kind === "text" ? [e] : e.kind === "element" && e.namespace !== "http://www.w3.org/2000/svg" && e.tag === "p" ? n(e.children) : e.kind !== "element" || e.namespace !== "http://www.w3.org/2000/svg" || cl.has(e.tag.toLowerCase()) ? [] : [{
			...e,
			attrs: Object.fromEntries(Object.entries(e.attrs).filter(([e]) => !ll.has(e.toLowerCase()) && !/^(?:href|src|on|data-)/i.test(e))),
			children: n(e.children)
		}]);
	}
	let r = n(Rt(e.trim(), "markdown", {
		...t,
		policy: "document"
	})).filter((e) => e.kind !== "text" || e.text.trim());
	if (r.length !== 1 || r[0].kind !== "element" || r[0].tag !== "svg") throw Error("Diagram output unavailable");
	return r;
}
async function dl(e, t, n, r = sl) {
	if (e.length > 16e3) throw Error("Diagram source limit");
	let i = (await r()).render(e, {
		idPrefix: `diagram-${t.idPrefix.replace(/[^a-z0-9_-]/gi, "-")}-`,
		fontFamily: "sans-serif",
		fontSize: 14,
		maxWidth: Math.max(160, Math.min(1600, n)),
		links: !1,
		images: !1
	});
	if (typeof i != "object" || !i || !("svg" in i) || typeof i.svg != "string") throw Error("Diagram output unavailable");
	return ul(i.svg, t);
}
// svelte/features/documents/Mermaid.svelte
var fl = h("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), pl = h("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p> <pre class=\"tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs\"> </pre>", 1), ml = h("<figure class=\"tw:my-3 tw:overflow-x-auto tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-4 tw:text-foreground tw:[&amp;_svg]:max-w-full tw:[&amp;_svg]:h-auto tw:[&amp;_path]:stroke-current tw:[&amp;_path]:fill-none tw:[&amp;_line]:stroke-current tw:[&amp;_rect]:stroke-current tw:[&amp;_rect]:fill-muted tw:[&amp;_polygon]:stroke-current tw:[&amp;_polygon]:fill-muted tw:[&amp;_text]:fill-current tw:[&amp;_text]:font-sans tw:[&amp;_text]:text-sm\"><!></figure>");
function hl(e, t) {
	let n = m();
	R(t, !0);
	let r = Z(void 0), i = Z(te([])), a = Z(!1), o = Z(!0), l = Z(0), u = 0, d = !0;
	c(() => {
		d = !1, ++u, F(i, [], !0);
	}), re(() => {
		let e = Q(r);
		if (!e) return;
		let t = () => {
			let t = e.clientWidth;
			F(l, t > 0 ? Math.max(64, Math.floor(t / 64) * 64) : 0, !0);
		}, n = new ResizeObserver(t);
		return t(), n.observe(e), () => n.disconnect();
	});
	let f = q(() => JSON.stringify([
		t.source,
		t.context.room.id,
		t.context.room.me,
		t.context.pageUrl,
		t.context.idPrefix
	]));
	re(() => {
		Q(f);
		let e = G(() => t.source), s = G(() => t.context), c = {
			...s,
			idPrefix: s.idPrefix + "-" + n
		}, p = Q(r), m = Q(l);
		if (!p || m === 0) return;
		let h = ++u;
		return F(o, !0), F(a, !1), dl(e, c, m - 32).then((e) => {
			d && h === u && (F(i, e, !0), F(o, !1));
		}).catch(() => {
			d && h === u && (F(i, [], !0), F(a, !0), F(o, !1));
		}), () => {
			++u;
		};
	});
	var p = ml(), h = z(p), g = (e) => {
		var n = fl(), r = B(n, !0);
		I(() => s(r, t.lang === "en" ? "Loading diagram…" : "Carregando diagrama…")), P(e, n);
	}, _ = (e) => {
		var n = pl(), r = $(n), i = B(r, !0), a = J(r, 2), o = B(a, !0);
		I(() => {
			s(i, t.lang === "en" ? "Diagram could not be rendered. Its source is shown below." : "Não foi possível desenhar o diagrama. O código está abaixo."), s(o, t.source);
		}), P(e, n);
	}, v = (e) => {
		Wt(e, {
			get nodes() {
				return Q(i);
			},
			get actions() {
				return t.actions;
			}
		});
	};
	C(h, (e) => {
		Q(o) ? e(g) : Q(a) ? e(_, 1) : e(v, -1);
	}), W(p), x(p, (e) => F(r, e), () => Q(r)), I(() => j(p, "aria-label", t.lang === "en" ? "Diagram" : "Diagrama")), P(e, p), U();
}
// svelte/features/documents/preview.ts
var gl = (e) => e.map((e) => e.kind === "text" || e.kind === "mention" ? e.text : gl(e.children)).join("");
function _l(e, t) {
	if (!t) return e.map((e) => ({ node: e }));
	function n(e, t, r) {
		for (let i of e) {
			if (i.kind === "element" && i.tag === t && gl(i.children).trim().toLowerCase() === r) return i;
			if ("children" in i) {
				let e = n(i.children, t, r);
				if (e) return e;
			}
		}
	}
	let r = n(e, "h2", "tarefas"), i = r ?? n(e, "p", "[[tarefas]]");
	function a(e) {
		let t = [], n = !1;
		for (let o of e) o === i && o.kind === "element" ? (t.push({
			...o,
			documentTaskSlot: !0,
			children: []
		}), n = !!r) : n && (o.kind === "element" || o.kind === "link") && (n = !1, o.kind === "element" && o.tag === "ul") || t.push("children" in o ? {
			...o,
			children: a(o.children)
		} : o);
		return t;
	}
	if (i) return a(e).map((e) => e.kind === "element" && e.documentTaskSlot ? { tasks: !0 } : { node: e });
	let o = e.findIndex((e) => e.kind === "element" && e.tag === "p"), s = e.map((e) => ({ node: e }));
	return s.splice(o < 0 ? 0 : o + 1, 0, { tasks: !0 }), s;
}
function vl(e) {
	if (e.kind !== "element" || e.tag !== "pre" || e.children.length !== 1) return null;
	let t = e.children[0];
	return t.kind === "element" && t.tag === "code" && t.language === "mermaid" ? gl(t.children) : null;
}
// svelte/features/documents/DocumentPreview.svelte
var yl = h("<section data-document-tasks=\"\" class=\"tw:my-3\"><!></section>"), bl = h("<p class=\"tw:m-0\"> </p>"), xl = h("<aside class=\"tw:mb-3 tw:space-y-1 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-sm tw:text-muted-foreground\"></aside>"), Sl = h("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Cl = h("<p role=\"status\" class=\"tw:my-2 tw:text-xs tw:text-muted-foreground\"> </p>"), wl = h("<div><!></div>"), Tl = h("<div data-document-preview=\"\" data-vb-native=\"\" class=\"tw:min-h-0 tw:min-w-0 tw:flex-1 tw:overflow-auto tw:p-4 tw:font-sans tw:text-foreground tw:break-words\"><!> <!> <!> <!></div>");
function El(e, n) {
	let r = m();
	R(n, !0);
	let i = (e) => {
		var t = yl(), r = z(t);
		{
			let e = q(() => n.epic ?? "main");
			rl(r, O(() => Q(h), { get thread() {
				return Q(e);
			} }));
		}
		W(t), P(e, t);
	}, a = Bt(), o = G(() => ({
		account: n.props.room.me,
		roomId: n.props.room.id,
		epicId: n.epic
	})), u = !0;
	c(() => u = !1);
	let d = () => {
		let e = n.owner.target();
		return u && n.owner.authorized() && e?.account === o.account && e.roomId === o.roomId && e.epicId === o.epicId;
	}, p = {
		navigate: (e, t) => {
			d() && n.props.actions.navigate(e, t);
		},
		openFile: (e) => {
			d() && n.props.actions.openFile(e);
		},
		navigateRich: (e) => {
			d() && n.props.actions.navigateRich?.(e);
		},
		openFileReference: (e) => {
			d() && n.props.actions.openFileReference?.(e);
		},
		ensureFileIndex: () => {
			d() && n.props.actions.ensureFileIndex?.();
		}
	}, h = q(() => ({
		...n.props.taskProps,
		send: (e) => d() ? n.props.taskProps.send(e) : !1,
		request: (e) => d() ? n.props.taskProps.request(e) : Promise.resolve({
			ok: !1,
			error: "disconnected"
		})
	})), g = q(() => ({
		room: n.props.room,
		pageUrl: location.href,
		idPrefix: r,
		policy: "document",
		fileLabel: n.props.taskProps.vb.t("arquivo"),
		fileIndex: a
	})), _ = Vt();
	c(() => _.dispose());
	let v = q(() => _.render(n.text, "markdown", Q(g))), y = q(() => !!n.epic || n.props.thread === "main" && !!n.props.room.roomTasks?.length), b = q(() => Q(v).length === 1 && Q(v)[0].kind === "text"), x = q(() => _l(Q(v), Q(y)));
	var S = Tl(), T = z(S), E = (e) => {
		var t = xl();
		l(t, 21, () => n.props.room.docNotes, w, (e, t) => {
			var n = bl(), r = B(n, !0);
			I(() => s(r, Q(t))), P(e, n);
		}), W(t), I(() => j(t, "aria-label", n.props.lang === "en" ? "Document review" : "Revisão do documento")), P(e, t);
	};
	C(T, (e) => {
		!n.epic && n.props.room.docNotes?.length && e(E);
	});
	var D = J(T, 2), k = (e) => {
		var t = Sl(), r = B(t, !0);
		I(() => s(r, n.props.lang === "en" ? "This document is empty. Choose Edit or ask your agent to summarize the decisions here." : "Documento vazio. Clique em Editar ou peça pro seu agent resumir as decisões aqui.")), P(e, t);
	}, A = q(() => !n.text.trim());
	C(D, (e) => {
		Q(A) && e(k);
	});
	var M = J(D, 2), F = (e) => {
		var t = Cl(), r = B(t, !0);
		I(() => s(r, n.props.lang === "en" ? "Preview shown as plain text. The full document remains available to read, copy and edit." : "Prévia em texto simples. O documento completo continua disponível para ler, copiar e editar.")), P(e, t);
	}, L = q(() => Q(b) && n.text.trim());
	C(M, (e) => {
		Q(L) && e(F);
	});
	var V = J(M, 2);
	l(V, 17, () => Q(x), w, (e, r) => {
		var a = t(), o = $(a), s = (e) => {
			var t = yl(), r = z(t);
			{
				let e = q(() => n.epic ?? "main");
				rl(r, O(() => Q(h), { get thread() {
					return Q(e);
				} }));
			}
			W(t), P(e, t);
		}, c = (e) => {
			let a = q(() => vl(Q(r).node));
			var o = t(), s = $(o), c = (e) => {
				hl(e, {
					get source() {
						return Q(a);
					},
					get context() {
						return Q(g);
					},
					get actions() {
						return p;
					},
					get lang() {
						return n.props.lang;
					}
				});
			}, l = (e) => {
				var t = wl(), a = z(t);
				{
					let e = q(() => [Q(r).node]);
					Wt(a, {
						get nodes() {
							return Q(e);
						},
						get actions() {
							return n.props.actions;
						},
						get taskSlot() {
							return i;
						}
					});
				}
				W(t), I(() => N(t, 1, f(Q(r).node.kind === "text" ? "tw:whitespace-pre-wrap tw:break-words" : "tw:min-w-0"))), P(e, t);
			};
			C(s, (e) => {
				Q(a) === null ? e(l, -1) : e(c);
			}), P(e, o);
		};
		C(o, (e) => {
			"tasks" in Q(r) ? e(s) : e(c, -1);
		}), P(e, a);
	}), W(S), P(e, S), U();
}
// svelte/features/documents/DocumentPanel.svelte
var Dl = h("<nav class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:border-b tw:border-border tw:px-3 tw:py-2\"><!><span aria-hidden=\"true\">›</span><!></nav>"), Ol = h("<details><summary class=\"tw:cursor-pointer tw:text-sm\"> </summary> <pre class=\"tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs\"> </pre> <div class=\"tw:flex tw:gap-2\"><!><!></div></details>"), kl = h("<p aria-live=\"polite\" class=\"tw:m-0 tw:text-xs\"> </p>"), Al = h("<aside role=\"status\" class=\"tw:space-y-2 tw:border-b tw:border-border tw:bg-muted tw:p-3\"><p class=\"tw:m-0 tw:text-sm\"> </p> <!><!></aside>"), jl = h("<p role=\"status\" class=\"tw:m-0 tw:p-3 tw:text-sm tw:text-muted-foreground\"> </p>"), Ml = h("<p role=\"alert\" class=\"tw:m-0 tw:p-3 tw:text-sm tw:text-destructive\"> </p>"), Nl = h("<p role=\"status\" class=\"tw:m-0 tw:text-xs\"> </p>"), Pl = h("<aside role=\"status\" class=\"tw:space-y-2 tw:border-b tw:border-border tw:bg-muted tw:p-3\"><p class=\"tw:m-0 tw:text-sm\"> </p> <details><summary class=\"tw:cursor-pointer tw:text-sm\"> </summary> <pre class=\"tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs\"> </pre></details> <div class=\"tw:flex tw:gap-2\"><!><!> <!></div> <!></aside>"), Fl = h("<p role=\"alert\" class=\"tw:m-0 tw:p-3 tw:text-sm tw:text-destructive\"> <!></p>"), Il = h("<div class=\"tw:min-h-0 tw:flex-1 tw:flex-col tw:[&amp;:not([hidden])]:flex\"><!></div>"), Ll = h("<div class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:p-3\"><p role=\"status\" class=\"tw:my-2 tw:text-sm tw:text-muted-foreground\"> </p> <!><!></div>"), Rl = h("<p role=\"status\" aria-live=\"polite\" class=\"tw:m-0 tw:border-t tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground\"> </p>"), zl = h("<!> <!> <!> <footer class=\"tw:flex tw:justify-end tw:border-t tw:border-border tw:p-2\"><!></footer>", 1), Bl = h("<section data-native-document=\"\" data-vb-native=\"\" class=\"tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:bg-background tw:font-sans tw:text-foreground tw:[&amp;:not([hidden])]:flex\"><!> <!> <!> <!> <!> <!> <!> <div data-document-editor=\"\" class=\"tw:min-h-0 tw:flex-1 tw:overflow-auto tw:[&amp;:not([hidden])]:flex tw:[&amp;_.cm-editor]:min-w-0 tw:[&amp;_.cm-editor]:flex-1 tw:[&amp;_.cm-editor]:bg-transparent tw:[&amp;_.cm-scroller]:overflow-auto tw:[&amp;_.cm-scroller]:p-4 tw:[&amp;_.cm-scroller]:font-mono tw:[&amp;_.cm-scroller]:text-base tw:[&amp;_.cm-scroller]:leading-6 tw:[&amp;_.cm-content]:caret-foreground tw:[&amp;_.cm-cursor]:border-l-2 tw:[&amp;_.cm-cursor]:border-foreground tw:[&amp;_.cm-dropCursor]:border-foreground tw:[&amp;_.cm-selectionBackground]:bg-accent! tw:[&amp;_.cm-ySelectionInfo]:rounded-sm tw:[&amp;_.cm-ySelectionInfo]:px-1 tw:[&amp;_.cm-ySelectionInfo]:font-sans! tw:[&amp;_.cm-ySelectionInfo]:text-xs! tw:[&amp;_.cm-ySelectionInfo]:font-medium! tw:[&amp;_.cm-ySelectionInfo]:leading-4!\"></div> <!></section>");
function Vl(t, n) {
	R(n, !0);
	let r = () => T(o, "$view", i), [i, a] = y(), o = G(() => n.owner.state), u = !0, d = Z("");
	c(() => u = !1);
	async function f(e) {
		if (!u || !n.owner.ownsOrphan(e)) return;
		let t = JSON.stringify(n.owner.target());
		try {
			if (!navigator.clipboard) throw Error("Unavailable");
			await navigator.clipboard.writeText(e.text), u && n.owner.ownsOrphan(e) && JSON.stringify(n.owner.target()) === t && F(d, Q(_) ? "Copied" : "Copiado", !0);
		} catch {
			u && n.owner.ownsOrphan(e) && JSON.stringify(n.owner.target()) === t && F(d, Q(_) ? "Clipboard unavailable. Select the retained text to copy it." : "Área de transferência indisponível. Selecione o texto guardado para copiar.", !0);
		}
	}
	let p = q(() => (r().recovery, r().target, n.owner.recoveryToken()));
	function m(e) {
		let t = e.currentTarget;
		if (!(t instanceof HTMLElement)) return null;
		let n = t.dataset.documentRecoveryKey, r = Number(t.dataset.documentRecoveryRevision);
		return n && Number.isSafeInteger(r) ? {
			key: n,
			revision: r
		} : null;
	}
	async function h(e) {
		if (!x(e) || !u) return;
		let t = m(e), r = n.owner.recoveryText(t);
		if (r !== null) try {
			if (!navigator.clipboard) throw Error("Unavailable");
			await navigator.clipboard.writeText(r), u && n.owner.recoveryText(t) === r && F(d, Q(_) ? "Copied" : "Copiado", !0);
		} catch {
			u && n.owner.recoveryText(t) === r && F(d, Q(_) ? "Clipboard unavailable. Select the retained text to copy it." : "Área de transferência indisponível. Selecione o texto guardado para copiar.", !0);
		}
	}
	let _ = q(() => n.props.lang === "en"), v = q(() => n.props.room.epics.find((e) => e.id === n.props.thread));
	re(() => {
		JSON.stringify(r().target), F(d, "");
	});
	let b = q(() => !r().denied && n.props.room.members.includes(n.props.room.me)), x = (e) => e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected;
	function S(e) {
		return { destroy: n.owner.attach(e) };
	}
	var w = Bl(), E = z(w), D = (e) => {
		var t = Dl(), i = z(t);
		{
			let e = q(() => r().target?.epicId ? "ghost" : "secondary"), t = q(() => !r().target?.epicId);
			k(i, {
				size: "sm",
				get variant() {
					return Q(e);
				},
				get "aria-pressed"() {
					return Q(t);
				},
				onclick: (e) => {
					x(e) && n.owner.chooseRoom(!0);
				},
				children: (e, t) => {
					Y();
					var r = g();
					I(() => s(r, n.props.room.book.title || "vibebook")), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var a = J(i, 2);
		{
			let e = q(() => r().target?.epicId ? "secondary" : "ghost"), t = q(() => !!r().target?.epicId);
			k(a, {
				size: "sm",
				get variant() {
					return Q(e);
				},
				get "aria-pressed"() {
					return Q(t);
				},
				onclick: (e) => {
					x(e) && n.owner.chooseRoom(!1);
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(v).title)), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(t), I(() => j(t, "aria-label", Q(_) ? "Document scope" : "Escopo do documento")), P(e, t);
	};
	C(E, (e) => {
		Q(v) && e(D);
	});
	var O = J(E, 2), A = (e) => {
		var t = Al(), i = z(t), a = B(i, !0), o = J(i, 2);
		l(o, 1, () => r().orphaned, (e) => e.epicId, (e, t) => {
			var r = Ol(), i = z(r), a = B(i, !0), o = J(i, 2), c = B(o, !0), l = J(o, 2), d = z(l);
			k(d, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					x(e) && u && f(Q(t));
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Copy retained text" : "Copiar texto guardado")), P(e, n);
				},
				$$slots: { default: !0 }
			});
			var p = J(d);
			k(p, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					x(e) && u && n.owner.discardOrphan(Q(t));
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Discard" : "Descartar")), P(e, n);
				},
				$$slots: { default: !0 }
			}), W(l), W(r), I(() => {
				s(a, Q(t).epicId), s(c, Q(t).text);
			}), P(e, r);
		});
		var c = J(o), p = (e) => {
			var t = kl(), n = B(t, !0);
			I(() => s(n, Q(d))), P(e, t);
		};
		C(c, (e) => {
			Q(d) && e(p);
		}), W(t), I(() => s(a, Q(_) ? "Retained edits belong to epics that no longer exist. They will never be sent to another document." : "Edições guardadas pertencem a épicos que não existem mais. Elas nunca serão enviadas para outro documento.")), P(e, t);
	};
	C(O, (e) => {
		r().orphaned.length && e(A);
	});
	var N = J(O, 2), L = (e) => {
		var t = jl(), n = B(t, !0);
		I(() => s(n, Q(_) ? "Loading document…" : "Carregando documento…")), P(e, t);
	};
	C(N, (e) => {
		r().readPending && e(L);
	});
	var V = J(N, 2), H = (e) => {
		var t = Ml(), n = B(t, !0);
		I(() => s(n, Q(_) ? "The last edit was not confirmed. Your text is retained; review it before retrying live editing." : "A última edição não foi confirmada. Seu texto está guardado; revise antes de tentar a edição ao vivo.")), P(e, t);
	};
	C(V, (e) => {
		r().fallbackUnconfirmed && e(H);
	});
	var ee = J(V, 2), te = (e) => {
		var t = Pl(), i = z(t), a = B(i, !0), o = J(i, 2), c = z(o), l = B(c, !0), u = J(c, 2), f = B(u, !0);
		W(o);
		var v = J(o, 2), y = z(v);
		{
			let e = q(() => Q(p)?.key), t = q(() => Q(p)?.revision), i = q(() => r().mode !== "edit" || !Q(b) || !(r().status === "fallback" || r().status === "connected" && r().synced));
			k(y, {
				get "data-document-recovery-key"() {
					return Q(e);
				},
				get "data-document-recovery-revision"() {
					return Q(t);
				},
				size: "sm",
				get disabled() {
					return Q(i);
				},
				onclick: (e) => {
					x(e) && n.owner.restore(m(e));
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Use retained text" : "Usar texto guardado")), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var S = J(y);
		{
			let e = q(() => Q(p)?.key), t = q(() => Q(p)?.revision);
			k(S, {
				variant: "outline",
				size: "sm",
				get "data-document-recovery-key"() {
					return Q(e);
				},
				get "data-document-recovery-revision"() {
					return Q(t);
				},
				onclick: (e) => {
					x(e) && n.owner.dismissRecovery(m(e));
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Discard retained text" : "Descartar texto guardado")), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var w = J(S, 2);
		{
			let e = q(() => Q(p)?.key), t = q(() => Q(p)?.revision);
			k(w, {
				size: "sm",
				variant: "outline",
				get "data-document-recovery-key"() {
					return Q(e);
				},
				get "data-document-recovery-revision"() {
					return Q(t);
				},
				onclick: (e) => {
					h(e);
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Copy retained text" : "Copiar texto guardado")), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(v);
		var T = J(v, 2), E = (e) => {
			var t = Nl(), n = B(t, !0);
			I(() => s(n, Q(d))), P(e, t);
		};
		C(T, (e) => {
			Q(d) && e(E);
		}), W(t), I(() => {
			s(a, Q(_) ? "An earlier local edit was not confirmed. Review it before replacing the current document." : "Uma edição local anterior não foi confirmada. Revise antes de substituir o documento atual."), s(l, Q(_) ? "Review retained text" : "Revisar texto guardado"), s(f, r().recovery);
		}), P(e, t);
	};
	C(ee, (e) => {
		r().recovery !== null && e(te);
	});
	var ne = J(ee, 2), K = (e) => {
		var t = Fl(), i = z(t, !0), a = J(i);
		k(a, {
			variant: "outline",
			size: "sm",
			onclick: (e) => {
				x(e) && u && n.props.onAuthorize();
			},
			children: (e, t) => {
				Y();
				var n = g();
				I(() => s(n, Q(_) ? "Check access again" : "Verificar acesso novamente")), P(e, n);
			},
			$$slots: { default: !0 }
		}), W(t), I(() => s(i, r().checkingAccess ? Q(_) ? "Checking document access…" : "Verificando acesso ao documento…" : Q(_) ? "Document access must be checked again. Only your retained local text is available." : "O acesso ao documento precisa ser verificado novamente. Apenas seu texto local guardado está disponível.")), P(e, t);
	};
	C(ne, (e) => {
		r().denied && e(K);
	});
	var ie = J(ne, 2), ae = (t) => {
		var i = Il(), a = z(i);
		e(a, () => JSON.stringify([
			n.props.room.me,
			n.props.room.id,
			r().target?.epicId
		]), (e) => {
			{
				let t = q(() => r().target?.epicId ?? null);
				El(e, {
					get owner() {
						return n.owner;
					},
					get text() {
						return r().text;
					},
					get epic() {
						return Q(t);
					},
					get props() {
						return n.props;
					}
				});
			}
		}), W(i), I(() => j(i, "hidden", r().mode !== "preview")), P(t, i);
	};
	C(ie, (e) => {
		r().denied || e(ae);
	});
	var oe = J(ie, 2);
	M(oe, (e) => S?.(e));
	var se = J(oe, 2), X = (e) => {
		var t = zl(), i = $(t), a = (e) => {
			var t = Ll(), i = z(t), a = B(i, !0), o = J(i, 2);
			{
				let e = q(() => Q(_) ? "Document editor" : "Editor do documento"), t = q(() => !Q(b));
				Qn(o, {
					get "aria-label"() {
						return Q(e);
					},
					get value() {
						return r().text;
					},
					get disabled() {
						return Q(t);
					},
					class: "tw:min-h-64 tw:flex-1 tw:resize-none tw:font-mono! tw:text-base! tw:leading-6! tw:p-4! tw:border! tw:border-input! tw:rounded-control! tw:bg-studio-input-background!",
					oninput: (e) => {
						x(e) && n.owner.input(e.currentTarget.value);
					}
				});
			}
			var c = J(o);
			k(c, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					x(e) && n.owner.retry();
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Retry live editing" : "Tentar edição ao vivo")), P(e, n);
				},
				$$slots: { default: !0 }
			}), W(t), I(() => s(a, Q(_) ? "Live editing could not start. Plain-text changes use the room connection and may conflict with other edits." : "A edição ao vivo não iniciou. Alterações em texto simples usam a conexão da sala e podem conflitar com outras edições.")), P(e, t);
		};
		C(i, (e) => {
			r().mode === "edit" && r().status === "fallback" && e(a);
		});
		var o = J(i, 2), c = (e) => {
			var t = Rl(), n = B(t, !0);
			I(() => s(n, r().fallbackPending ? Q(_) ? "Changes sent or queued locally; confirmation is pending." : "Alterações enviadas ou guardadas localmente; confirmação pendente." : r().status === "connected" && r().synced ? Q(_) ? "Live connection synchronized. Server persistence is asynchronous." : "Conexão ao vivo sincronizada. A gravação no servidor é assíncrona." : r().status === "fallback" ? Q(_) ? "Plain-text fallback" : "Edição em texto simples" : Q(_) ? "Connecting or reconnecting; keep this page open for local edits." : "Conectando; mantenha a página aberta para suas edições locais.")), P(e, t);
		};
		C(o, (e) => {
			r().mode === "edit" && e(c);
		});
		var l = J(o, 2), u = (e) => {
			var t = Fl(), r = z(t, !0), i = J(r);
			k(i, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					x(e) && n.owner.retry();
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(_) ? "Try again" : "Tentar novamente")), P(e, n);
				},
				$$slots: { default: !0 }
			}), W(t), I(() => s(r, Q(_) ? "Document request could not be confirmed." : "Não foi possível confirmar o pedido do documento.")), P(e, t);
		};
		C(l, (e) => {
			r().error && r().status !== "fallback" && e(u);
		});
		var d = J(l, 2), f = z(d);
		{
			let e = q(() => !Q(b)), t = q(() => r().mode === "edit" ? "primary" : "outline"), i = q(() => r().mode === "edit");
			k(f, {
				get disabled() {
					return Q(e);
				},
				get variant() {
					return Q(t);
				},
				get "aria-pressed"() {
					return Q(i);
				},
				onclick: (e) => {
					x(e) && n.owner.mode(r().mode === "edit" ? "preview" : "edit");
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, r().mode === "edit" ? Q(_) ? "Done" : "Pronto" : Q(_) ? "Edit" : "Editar")), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(d), P(e, t);
	};
	C(se, (e) => {
		r().denied || e(X);
	}), W(w), I(() => {
		j(w, "hidden", n.props.pane !== "doc"), j(oe, "hidden", r().denied || r().mode !== "edit" || r().status === "fallback");
	}), P(t, w), U(), a();
}
// svelte/features/documents/DocumentToolbar.svelte
var Hl = h("<span> </span>"), Ul = h("<span></span>"), Wl = h("<span> </span><!><!>", 1), Gl = h("<div role=\"group\" class=\"tw:flex tw:gap-1\"><!><!></div>"), Kl = h("<div data-vb-native=\"\" class=\"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:border-b tw:border-border tw:bg-background tw:p-2 tw:font-sans tw:text-foreground\"><div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-1 tw:overflow-x-auto\"></div> <!></div>");
function ql(e, t) {
	R(t, !0);
	let n = () => T(m, "$view", r), [r, i] = y(), a = v(t, "counts", 19, () => ({})), u = v(t, "agentTitle", 3, "Agents"), d = v(t, "agentState", 3, ""), p = v(t, "compact", 3, !1), m = G(() => t.owner.state), h = q(() => t.lang === "en"), _ = !0;
	c(() => _ = !1);
	let b = q(() => [
		{
			id: "doc",
			label: "Doc"
		},
		{
			id: "board",
			label: Q(h) ? "Board" : "Quadro"
		},
		{
			id: "files",
			label: Q(h) ? "Files" : "Arquivos"
		},
		{
			id: "apps",
			label: "Apps"
		},
		{
			id: "decisions",
			label: Q(h) ? "Decisions" : "Decisões"
		},
		{
			id: "reminders",
			label: Q(h) ? "Reminders" : "Lembretes"
		},
		{
			id: "agents",
			label: "Agents"
		}
	]), x = q(() => t.room.epics.find((e) => e.id === n().target?.epicId)), S = q(() => Q(x)?.tasks.length ? `${Q(x).tasks.filter((e) => e.done).length}/${Q(x).tasks.length}` : ""), E = q(() => n().text.match(/^#\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() || Q(x)?.title || t.room.book.title), D = q(() => Q(b).filter((e) => !p() || e.id !== "board"));
	function O(e, n) {
		e.stopPropagation(), _ && e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected && t.onPane(n);
	}
	function A(e) {
		if (!_ || !(e.currentTarget instanceof HTMLElement) || !e.currentTarget.isConnected) return;
		let t = [...e.currentTarget.querySelectorAll("button[data-document-pane]")], n = t.findIndex((e) => e === document.activeElement), r = n;
		if (e.key === "ArrowRight") r = (n + 1) % t.length;
		else if (e.key === "ArrowLeft") r = (n - 1 + t.length) % t.length;
		else if (e.key === "Home") r = 0;
		else if (e.key === "End") r = t.length - 1;
		else return;
		e.preventDefault(), t[r]?.focus(), t[r]?.click();
	}
	var M = Kl(), F = z(M);
	l(F, 21, () => Q(D), w, (e, r) => {
		{
			let i = q(() => t.pane === Q(r).id ? "secondary" : "ghost"), o = q(() => n().denied && Q(r).id !== "doc"), c = q(() => p() ? void 0 : "tab"), l = q(() => p() ? void 0 : t.pane === Q(r).id), m = q(() => p() ? t.pane === Q(r).id : void 0), h = q(() => p() || t.pane === Q(r).id ? 0 : -1), g = q(() => Q(r).id === "agents" ? u() : Q(r).id === "doc" ? Q(E) : Q(r).label);
			k(e, {
				size: "sm",
				get variant() {
					return Q(i);
				},
				get disabled() {
					return Q(o);
				},
				get role() {
					return Q(c);
				},
				get "aria-selected"() {
					return Q(l);
				},
				get "aria-pressed"() {
					return Q(m);
				},
				get tabindex() {
					return Q(h);
				},
				get "data-document-pane"() {
					return Q(r).id;
				},
				get title() {
					return Q(g);
				},
				onclick: (e) => O(e, Q(r).id),
				children: (e, n) => {
					var i = Wl(), o = $(i), c = B(o, !0), l = J(o), m = (e) => {
						var n = Hl(), i = B(n, !0);
						I(() => {
							N(n, 1, f(t.pane === Q(r).id ? "tw:text-xs tw:text-secondary-foreground" : "tw:text-xs tw:text-muted-foreground")), s(i, Q(S));
						}), P(e, n);
					}, h = (e) => {
						var n = Hl(), i = B(n, !0);
						I(() => {
							N(n, 1, f(t.pane === Q(r).id ? "tw:text-xs tw:text-secondary-foreground" : "tw:text-xs tw:text-muted-foreground")), s(i, a()[Q(r).id]);
						}), P(e, n);
					};
					C(l, (e) => {
						p() && Q(r).id === "doc" && Q(S) ? e(m) : a()[Q(r).id] && e(h, 1);
					});
					var g = J(l), _ = (e) => {
						var t = Ul();
						I(() => {
							j(t, "aria-label", u()), N(t, 1, f(d() === "blocked" ? "tw:size-2 tw:rounded-full tw:bg-destructive" : d() === "busy" ? "tw:size-2 tw:rounded-full tw:bg-warning" : "tw:size-2 tw:rounded-full tw:bg-success"));
						}), P(e, t);
					};
					C(g, (e) => {
						Q(r).id === "agents" && d() && e(_);
					}), I(() => s(c, Q(r).label)), P(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	}), W(F);
	var L = J(F, 2), V = (e) => {
		var r = Gl(), i = z(r);
		{
			let e = q(() => n().mode === "preview" ? "secondary" : "ghost"), r = q(() => n().mode === "preview");
			k(i, {
				get variant() {
					return Q(e);
				},
				size: "sm",
				get "aria-pressed"() {
					return Q(r);
				},
				onclick: (e) => {
					_ && e.currentTarget.isConnected && t.owner.mode("preview");
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(h) ? "Read" : "Ver")), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var a = J(i);
		{
			let e = q(() => n().mode === "edit" ? "secondary" : "ghost"), r = q(() => n().mode === "edit");
			k(a, {
				get variant() {
					return Q(e);
				},
				size: "sm",
				get disabled() {
					return n().denied;
				},
				get "aria-pressed"() {
					return Q(r);
				},
				onclick: (e) => {
					_ && e.currentTarget.isConnected && t.owner.mode("edit");
				},
				children: (e, t) => {
					Y();
					var n = g();
					I(() => s(n, Q(h) ? "Edit" : "Editar")), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(r), I(() => j(r, "aria-label", Q(h) ? "Document mode" : "Modo do documento")), P(e, r);
	};
	C(L, (e) => {
		!p() && t.pane === "doc" && e(V);
	}), W(M), I(() => {
		j(F, "role", p() ? "toolbar" : "tablist"), j(F, "aria-label", Q(h) ? "Room panels" : "Painéis da sala");
	}), o("keydown", F, A), P(e, M), U(), i();
}
i(["keydown"]);
// svelte/features/agents/AgentBanners.svelte
var Jl = h("<div class=\"tw:relative tw:rounded-surface tw:border tw:border-border tw:p-3 tw:pr-12\"><!><!></div>"), Yl = h("<p role=\"status\" class=\"tw:m-0 tw:rounded-surface tw:border tw:border-border tw:p-3 tw:text-success\"> </p>"), Xl = h("<div class=\"tw:flex tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:p-3\"><span aria-hidden=\"true\">✻</span> <div class=\"tw:min-w-0 tw:flex-1\"><strong> </strong> <ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"><li> </li> <li> </li> <li> <!></li> <li> </li></ul></div> <!></div>"), Zl = h("<!><!>", 1), Ql = h("<div class=\"tw:flex tw:flex-wrap tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:p-3\"><span aria-hidden=\"true\">✻</span> <div class=\"tw:min-w-0 tw:flex-1\"><strong> </strong> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p></div> <!><!></div>"), $l = h("<div class=\"tw:flex tw:items-center tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted tw:p-3\"><p class=\"tw:m-0 tw:min-w-0 tw:flex-1 tw:break-words\">⏸ <strong> </strong> </p> <!></div>"), eu = h("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <!> <div class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:flex-1 tw:text-xs tw:text-muted-foreground\"> </span><!><!></div>", 1), tu = h("<div data-vb-native=\"\" data-native-agent-banners=\"\" class=\"tw:space-y-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <!></div> <!> <!>", 1);
function nu(e, t) {
	R(t, !0);
	let n = () => T(o, "$view", r), [r, i] = y(), a = v(t, "lang", 3, "pt"), o = G(() => t.owner.state), c = (e) => St(a(), e), l = Z(0), u = Z(!1), d = q(() => An(n().data, t.owner.account, n().now)), f = q(() => Nn(n().waits, t.owner.roomId, n().thread)), p = q(() => n().room?.book.owner === t.owner.account && !n().room.epics.length && n().thread === "main" && !n().startDismissed), m = q(() => n().hasAgent === !1 && !n().setupDismissed), h = q(() => n().data && !Q(m) && n().hasAgent !== !1 && !Q(d).around && (!n().offerDismissed || !!n().askedAt)), _ = q(() => n().now - n().askedAt > 18e4);
	re(() => {
		n().room, n().data, t.owner.current() || F(u, !1);
	});
	function b() {
		t.owner.current() && t.onopen();
	}
	function x() {
		let e = Nn(n().waits, t.owner.roomId, n().thread);
		if (t.owner.current() && e && /^a\d+$/.test(e.ref)) {
			let n = Number(e.ref.slice(1));
			Number.isSafeInteger(n) && t.onnavigate(n, e.thread || "main");
		}
	}
	var S = tu(), w = $(S), E = z(w), D = (e) => {
		var n = Jl(), r = z(n);
		Fn(r, {
			get origin() {
				return t.origin;
			},
			get roomId() {
				return t.owner.roomId;
			},
			get lang() {
				return a();
			},
			waiting: !0,
			get current() {
				return t.owner.current;
			}
		});
		var i = J(r);
		{
			let e = q(() => c("close"));
			k(i, {
				variant: "ghost",
				size: "sm",
				class: "tw:absolute tw:right-1 tw:top-1",
				get "aria-label"() {
					return Q(e);
				},
				onclick: () => t.owner.dismissBanner("setup"),
				children: (e, t) => {
					Y();
					var n = g("×");
					P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(n), P(e, n);
	};
	C(E, (e) => {
		Q(m) && e(D);
	});
	var O = J(E, 2), A = (e) => {
		var t = Yl(), r = B(t);
		I((e) => s(r, `✻ ${e ?? ""}`), [() => c(n().setupFeedback ? "setupDone" : "listeningDone")]), P(e, t);
	};
	C(O, (e) => {
		(n().setupFeedback || n().listeningFeedback) && e(A);
	});
	var M = J(O, 2), N = (e) => {
		var r = Xl(), i = J(z(r), 2), a = z(i), o = B(a, !0), l = J(a, 2), u = z(l), f = B(u), p = J(u, 2), m = B(p, !0), h = J(p, 2), _ = z(h, !0), v = J(_), y = (e) => {
			k(e, {
				variant: "link",
				size: "sm",
				onclick: b,
				children: (e, t) => {
					Y();
					var n = g();
					I((e) => s(n, e), [() => c("turnOn")]), P(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		C(v, (e) => {
			n().hasAgent !== !1 && !Q(d).on && e(y);
		}), W(h);
		var x = J(h, 2), S = B(x);
		W(l), W(i);
		var w = J(i, 2);
		{
			let e = q(() => c("close"));
			k(w, {
				variant: "ghost",
				size: "sm",
				get "aria-label"() {
					return Q(e);
				},
				onclick: () => t.owner.dismissBanner("start"),
				children: (e, t) => {
					Y();
					var n = g("×");
					P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(r), I((e, t, n, r, i) => {
			s(o, e), s(f, `✓ ${t ?? ""}`), s(m, n), s(_, r), s(S, `${Q(d).around ? "✻" : "○"} ${i ?? ""}`);
		}, [
			() => c("starting"),
			() => c("roomCreated"),
			() => n().room.members.length > 1 ? `✓ ${c("members")}: ${n().room.members.filter((e) => e !== t.owner.account).map(t.name).join(", ")}` : `○ ${c("alone")}`,
			() => Q(d).around ? `✓ ${c("here")}` : n().hasAgent === !1 ? `○ ${c("connectFirst")}` : Q(d).on ? `✻ ${c("opening")}` : `○ ${c("agentOff")}`,
			() => c("docNext")
		]), P(e, r);
	}, L = (e) => {
		var n = Ql(), r = J(z(n), 2), i = z(r), a = B(i, !0), o = J(i, 2), l = B(o, !0);
		W(r);
		var f = J(r, 2), p = (e) => {
			var t = Zl(), n = $(t);
			k(n, {
				size: "sm",
				onclick: () => F(u, !0),
				children: (e, t) => {
					Y();
					var n = g();
					I((e) => s(n, e), [() => c("connect")]), P(e, n);
				},
				$$slots: { default: !0 }
			});
			var r = J(n);
			k(r, {
				variant: "outline",
				size: "sm",
				onclick: b,
				children: (e, t) => {
					Y();
					var n = g();
					I((e) => s(n, e), [() => c("turnOn")]), P(e, n);
				},
				$$slots: { default: !0 }
			}), P(e, t);
		};
		C(f, (e) => {
			Q(d).on || e(p);
		});
		var m = J(f);
		{
			let e = q(() => c("close"));
			k(m, {
				variant: "ghost",
				size: "sm",
				get "aria-label"() {
					return Q(e);
				},
				onclick: () => t.owner.dismissBanner("offer"),
				children: (e, t) => {
					Y();
					var n = g("×");
					P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		W(n), I((e, t) => {
			s(a, e), s(l, t);
		}, [() => c(Q(d).on ? Q(_) ? "late" : "opening" : "absent"), () => c(Q(d).on ? Q(_) ? "lateHelp" : "openingHelp" : "absentHelp")]), P(e, n);
	};
	C(M, (e) => {
		Q(p) && n().room ? e(N) : Q(h) && e(L, 1);
	});
	var V = J(M, 2), H = (e) => {
		var t = $l(), n = z(t), r = J(z(n)), i = B(r, !0), a = J(r);
		W(n);
		var o = J(n, 2);
		k(o, {
			size: "sm",
			onclick: x,
			children: (e, t) => {
				Y();
				var n = g();
				I((e) => s(n, e), [() => c("view")]), P(e, n);
			},
			$$slots: { default: !0 }
		}), W(t), I((e, t, n) => {
			s(i, e), s(a, ` · ${t ?? ""}: ${n ?? ""}`);
		}, [
			() => c("ask"),
			() => Q(f).topic || c("main"),
			() => In(Q(f).text)
		]), P(e, t);
	};
	C(V, (e) => {
		Q(f) && e(H);
	}), W(w);
	var ee = J(w, 2);
	{
		let e = q(() => Q(u) && t.owner.current()), n = q(() => c("connect")), r = q(() => c("close"));
		Mt(ee, {
			get open() {
				return Q(e);
			},
			get title() {
				return Q(n);
			},
			get closeLabel() {
				return Q(r);
			},
			onOpenChange: (e) => F(u, e, !0),
			children: (e, n) => {
				Fn(e, {
					get origin() {
						return t.origin;
					},
					get roomId() {
						return t.owner.roomId;
					},
					get lang() {
						return a();
					},
					get current() {
						return t.owner.current;
					}
				});
			},
			$$slots: { default: !0 }
		});
	}
	var te = J(ee, 2);
	{
		let e = q(() => n().welcome && t.owner.current()), r = q(() => Q(l) === 0 ? `${c("welcome")} ${n().room?.book.title || c("main")}` : c(Q(l) === 1 ? "ownAgent" : Q(l) === 2 ? "context" : "connect")), i = q(() => c("close"));
		Mt(te, {
			get open() {
				return Q(e);
			},
			get title() {
				return Q(r);
			},
			get closeLabel() {
				return Q(i);
			},
			onOpenChange: (e) => {
				e || t.owner.closeWelcome();
			},
			children: (e, r) => {
				var i = eu(), o = $(i), u = B(o, !0), d = J(o, 2), f = (e) => {
					Fn(e, {
						get origin() {
							return t.origin;
						},
						get roomId() {
							return t.owner.roomId;
						},
						get lang() {
							return a();
						},
						get current() {
							return t.owner.current;
						}
					});
				};
				C(d, (e) => {
					Q(l) === 3 && n().hasAgent !== !0 && e(f);
				});
				var p = J(d, 2), m = z(p), h = B(m), _ = J(m);
				k(_, {
					variant: "ghost",
					onclick: () => {
						Q(l) ? oe(l, -1) : t.owner.closeWelcome();
					},
					children: (e, t) => {
						Y();
						var n = g();
						I((e) => s(n, e), [() => c(Q(l) ? "back" : "skip")]), P(e, n);
					},
					$$slots: { default: !0 }
				});
				var v = J(_);
				k(v, {
					onclick: () => {
						Q(l) === 3 ? t.owner.closeWelcome() : oe(l);
					},
					children: (e, t) => {
						Y();
						var n = g();
						I((e) => s(n, e), [() => c(Q(l) === 3 ? "enter" : "next")]), P(e, n);
					},
					$$slots: { default: !0 }
				}), W(p), I((e) => {
					s(u, e), j(m, "aria-label", `${Q(l) + 1} / 4`), s(h, `${Q(l) + 1} / 4`);
				}, [() => Q(l) === 0 ? `${t.name(n().room?.book.owner || "")} ${c("welcomeBody")}` : c(Q(l) === 1 ? "ownAgentBody" : Q(l) === 2 ? "contextBody" : "connectBody")]), P(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	P(e, S), U(), i();
}
// svelte/features/file-viewer/ThreadFiles.svelte
var ru = h("<span class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), iu = h("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-border tw:bg-card tw:px-2 tw:py-1 tw:text-foreground tw:no-underline tw:hover:bg-muted\"><!><span class=\"tw:truncate\"> </span><!></a>"), au = h("<div data-vb-native=\"\" data-thread-files=\"\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:p-2 tw:font-sans tw:text-sm tw:text-foreground\"><span class=\"tw:flex tw:items-center tw:gap-1 tw:text-muted-foreground\"><!> </span><!></div>");
function ou(e, n) {
	R(n, !0);
	let r = v(n, "lang", 3, "pt"), i = q(() => {
		let e = /* @__PURE__ */ new Map();
		if (n.thread === "main" || !n.room.epics.some((e) => e.id === n.thread)) return [];
		for (let t of [...n.room.messages, ...n.room.origins || []]) if (t.thread === n.thread) for (let n of t.files || []) {
			let t = e.get(n.name);
			t || (t = /* @__PURE__ */ new Map(), e.set(n.name, t)), t.set(n.id, n);
		}
		return [...e.values()].map((e) => {
			let t = [...e.values()].sort((e, t) => t.ts - e.ts);
			return {
				file: t[0],
				count: t.length
			};
		}).sort((e, t) => t.file.ts - e.file.ts).slice(0, 8);
	});
	var a = t(), c = $(a), u = (e) => {
		var t = au(), a = z(t), c = z(a);
		Yn(c, { name: "file" });
		var u = J(c, 1, !0);
		W(a);
		var d = J(a);
		l(d, 17, () => Q(i), ({ file: e, count: t }) => e.id, (e, t) => {
			let r = () => Q(t).file, i = () => Q(t).count;
			var a = iu(), c = z(a);
			Yn(c, { name: "file" });
			var l = J(c), u = B(l, !0), d = J(l), f = (e) => {
				var t = ru(), n = B(t);
				I(() => s(n, `v${i() ?? ""}`)), P(e, t);
			};
			C(d, (e) => {
				i() > 1 && e(f);
			}), W(a), I((e) => {
				j(a, "href", e), j(a, "title", r().name), s(u, r().name);
			}, [() => on({
				roomId: n.room.id,
				id: r().id
			})]), o("click", a, (e) => {
				!e.currentTarget.isConnected || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), n.onopen(r(), e.currentTarget));
			}), P(e, a);
		}), W(t), I(() => s(u, r() === "en" ? "Files from this thread" : "Arquivos deste épico")), P(e, t);
	};
	C(c, (e) => {
		Q(i).length && e(u);
	}), P(e, a), U();
}
i(["click"]);
// svelte/features/room-sidebar/SuggestionPreview.svelte
var su = h("<li> </li>"), cu = h("<!> <ul class=\"tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5\"></ul>", 1), lu = h("<article data-vb-native=\"\" data-native-suggestion=\"\" class=\"tw:mx-auto tw:w-full tw:max-w-2xl tw:space-y-4 tw:p-6 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p class=\"tw:m-0\"> </p> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <!></article>");
function uu(n, r) {
	R(r, !0);
	let i = () => T(u, "$status", a), [a, o] = y(), u = G(() => r.owner.state), d = q(() => r.room.suggestions[r.index]), f = q(() => i().phase === "pending" || i().phase === "unconfirmed"), p = !0;
	function m(e, t) {
		if (!p || Q(f) || !Q(d) || !r.room.members.includes(r.room.me)) return;
		let n = dr(t);
		dr(r.room.suggestions[r.index]) === n && r.owner.run({
			t: "suggestion",
			i: r.index,
			accept: e,
			expected: t
		});
	}
	c(() => {
		p = !1;
	});
	var h = t(), _ = $(h), v = (n) => {
		var i = t(), a = $(i);
		e(a, () => dr(Q(d)), (e) => {
			Pt(e, {
				get value() {
					return Q(d);
				},
				children: (e, t = L) => {
					var n = lu(), i = z(n), a = B(i), o = J(i, 2);
					Gn(o, {
						level: 3,
						children: (e, t) => {
							Y();
							var n = g();
							I(() => s(n, Q(d).title)), P(e, n);
						},
						$$slots: { default: !0 }
					});
					var c = J(o, 2), u = B(c, !0), p = J(c, 2), h = (e) => {
						var t = cu(), n = $(t);
						Gn(n, {
							level: 4,
							children: (e, t) => {
								Y();
								var n = g();
								I((e) => s(n, e), [() => r.vb.t("Tarefas propostas")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
						var i = J(n, 2);
						l(i, 21, () => Q(d).tasks, w, (e, t) => {
							var n = su(), r = B(n, !0);
							I(() => s(r, Q(t))), P(e, n);
						}), W(i), P(e, t);
					};
					C(p, (e) => {
						Q(d).tasks.length && e(h);
					});
					var _ = J(p, 2), v = z(_);
					k(v, {
						get disabled() {
							return Q(f);
						},
						onclick: (e) => {
							e.currentTarget.isConnected && m(!0, t());
						},
						children: (e, t) => {
							Y();
							var n = g();
							I((e) => s(n, e), [() => r.vb.t("Pedir pro meu agent")]), P(e, n);
						},
						$$slots: { default: !0 }
					});
					var y = J(v);
					k(y, {
						variant: "ghost",
						get disabled() {
							return Q(f);
						},
						onclick: (e) => {
							e.currentTarget.isConnected && m(!1, t());
						},
						children: (e, t) => {
							Y();
							var n = g();
							I((e) => s(n, e), [() => r.vb.t("Descartar")]), P(e, n);
						},
						$$slots: { default: !0 }
					}), W(_);
					var b = J(_, 2), x = B(b, !0);
					wo(J(b, 2), {
						get owner() {
							return r.owner;
						},
						get t() {
							return r.vb.t;
						}
					}), W(n), I((e, t, n) => {
						s(a, `✦ ${e ?? ""}`), s(u, t), s(x, n);
					}, [
						() => r.vb.t("O @vibe sugere um épico"),
						() => Q(d).why || r.vb.t("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."),
						() => r.vb.t("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")
					]), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}), P(n, i);
	};
	C(_, (e) => {
		Q(d) && e(v);
	}), P(n, h), U(), o();
}
// svelte/features/agents/AgentTrigger.svelte
var du = h("<span class=\"tw:max-w-40 tw:truncate tw:text-xs tw:text-muted-foreground\"> <!></span>"), fu = h("<span aria-hidden=\"true\">✻</span><span> </span><!>", 1);
function pu(e, n) {
	R(n, !0);
	let r = () => T(l, "$view", a), i = () => T(u, "$runner", a), [a, o] = y(), c = v(n, "lang", 3, "pt"), l = G(() => n.owner.state), u = G(() => n.owner.runner.state), d = q(() => An(r().data, n.owner.account, r().now)), p = q(() => bt(i().where)), m = (e) => St(c(), e);
	var h = t(), _ = $(h), b = (e) => {
		{
			let t = q(() => Q(p) ? `${Q(p)} (${m(i().where?.how === "used" ? "usedFolder" : i().where?.how === "linked" ? "bound" : i().where?.how === "slug" ? "slug" : i().where?.how === "new" ? "newFolder" : "folder")})` : m("localHelp"));
			k(e, {
				"data-native-agent-trigger": !0,
				variant: "outline",
				get "aria-pressed"() {
					return Q(d).on;
				},
				onclick: () => {
					n.owner.current() && n.onopen();
				},
				get title() {
					return Q(t);
				},
				children: (e, t) => {
					var n = fu(), r = $(n), a = J(r), o = B(a, !0), c = J(a), l = (e) => {
						var t = du(), n = z(t, !0), r = J(n), a = (e) => {
							var t = g("+");
							P(e, t);
						};
						C(r, (e) => {
							i().where?.how === "new" && e(a);
						}), W(t), I((e) => s(n, e), [() => Q(p).replace(/^~\/Projects\//, "")]), P(e, t);
					};
					C(c, (e) => {
						Q(p) && e(l);
					}), I((e) => {
						N(r, 1, f(Q(d).live ? "tw:text-success" : Q(d).on ? "tw:text-warning" : "tw:text-muted-foreground")), s(o, e);
					}, [() => m(Q(d).on ? Q(d).live ? "listening" : "notListening" : "turnOn")]), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	C(_, (e) => {
		r().data && e(b);
	}), P(e, h), U(), o();
}
// svelte/features/room-shell/RoomHeader.svelte
var mu = h("<!><span class=\"tw:hidden tw:min-[901px]:inline\"> </span><!>", 1), hu = h("<!><!>", 1), gu = h("<header data-vb-native=\"\" data-native-room-header=\"\" class=\"tw:flex tw:min-w-0 tw:flex-wrap tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground\"><!> <div class=\"tw:min-w-0 tw:flex-1\"><!></div> <!> <!> <!> <!> <!></header>");
function _u(t, n) {
	R(n, !0);
	let r = () => T(c, "$personal", a), i = () => T(l, "$geometry", a), [a, o] = y(), c = G(() => n.presentation.services.personal.state), l = G(() => n.layout.state), u = (e) => n.current() && e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected, d = q(() => r().me?.waits ?? []), f = (e) => n.presentation.services.t(e);
	var p = gu(), m = z(p);
	e(m, () => n.header.thread, (e) => {
		Pt(e, {
			get value() {
				return n.header.thread;
			},
			children: (e, t = L) => {
				{
					let r = q(() => f(t() === "main" ? "Seus vibebooks" : "Voltar pra sala principal"));
					k(e, {
						variant: "ghost",
						size: "sm",
						class: "tw:min-[901px]:hidden",
						get "aria-label"() {
							return Q(r);
						},
						onclick: (e) => {
							u(e) && n.back(t());
						},
						children: (e, n) => {
							Y();
							var r = g();
							I((e) => s(r, `← ${e ?? ""}`), [() => f(t() === "main" ? "Seus vibebooks" : "Voltar pra sala principal")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			},
			$$slots: { default: !0 }
		});
	});
	var h = J(m, 2);
	Ao(z(h), O(() => n.header)), W(h);
	var _ = J(h, 2);
	{
		let e = q(() => i().boardFull ? "secondary" : "ghost"), t = q(() => f("Quadro de tarefas (kanban)"));
		k(_, {
			"data-native-board-toggle": !0,
			get variant() {
				return Q(e);
			},
			size: "sm",
			get "aria-label"() {
				return Q(t);
			},
			get "aria-pressed"() {
				return i().boardFull;
			},
			onclick: (e) => {
				u(e) && n.layout.toggleBoard();
			},
			children: (e, t) => {
				var r = mu(), i = $(r);
				Yn(i, { name: "board" });
				var a = J(i), o = B(a, !0), c = J(a), l = (e) => {
					Un(e, {
						variant: "warning",
						children: (e, t) => {
							Y();
							var r = g();
							I(() => s(r, n.boardCount)), P(e, r);
						},
						$$slots: { default: !0 }
					});
				};
				C(c, (e) => {
					n.boardCount && e(l);
				}), I((e) => s(o, e), [() => f("Quadro")]), P(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var v = J(_, 2);
	{
		let e = q(() => f("Caixa de entrada")), t = q(() => f("Caixa de entrada: o que espera por você"));
		k(v, {
			"data-native-inbox-toggle": !0,
			variant: "ghost",
			size: "sm",
			get "aria-label"() {
				return Q(e);
			},
			get title() {
				return Q(t);
			},
			onclick: (e) => {
				u(e) && n.presentation.openInbox(e.currentTarget);
			},
			children: (e, t) => {
				var n = hu(), r = $(n);
				Yn(r, { name: "inbox" });
				var i = J(r), a = (e) => {
					{
						let t = q(() => Q(d).some((e) => /^[ab]\d/.test(e.ref)) ? "destructive" : "warning");
						Un(e, {
							get variant() {
								return Q(t);
							},
							children: (e, t) => {
								Y();
								var n = g();
								I(() => s(n, Q(d).length)), P(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				C(i, (e) => {
					Q(d).length && e(a);
				}), P(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var b = J(v, 2);
	nr(b, {
		get owner() {
			return n.presentation.services.pwa;
		},
		get lang() {
			return n.presentation.services.language;
		}
	});
	var x = J(b, 2), S = (e) => {
		pu(e, O(() => n.trigger));
	};
	C(x, (e) => {
		n.trigger && e(S);
	});
	var w = J(x, 2);
	{
		let e = q(() => f("mostrar/ocultar documento"));
		Nt(w, {
			"data-native-document-toggle": !0,
			icon: "file",
			get label() {
				return Q(e);
			},
			get "aria-pressed"() {
				return i().documentVisible;
			},
			onclick: (e) => {
				u(e) && n.layout.toggleDocument();
			}
		});
	}
	W(p), P(t, p), U(), o();
}
// svelte/features/room-shell/RoomScene.svelte
var vu = h("<div data-native-room-inbox-loading=\"\" class=\"tw:p-6\"><!></div>"), yu = h("<div class=\"tw:px-4\"><div><!></div> <!></div>"), bu = h("<div><!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div> <!>", 1), xu = h("<aside role=\"alert\" class=\"tw:fixed tw:inset-x-4 tw:top-4 tw:z-50 tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg\"><p> </p> <!></aside>"), Su = h("<aside data-vb-native=\"\" role=\"status\" class=\"tw:fixed tw:bottom-4 tw:left-1/2 tw:z-30 tw:max-w-[calc(100vw-2rem)] tw:-translate-x-1/2 tw:rounded-control tw:border tw:border-border tw:bg-popover tw:p-3 tw:font-sans tw:text-sm tw:text-popover-foreground tw:shadow-md\"> </aside>"), Cu = h("<!> <!> <!>", 1), wu = h("<!> <!>", 1);
function Tu(r, i) {
	R(i, !0);
	let a = () => T(fe, "$roomInboxView", S), o = () => T(ue, "$inboxState", S), l = () => T(ve, "$boardView", S), u = () => T(be, "$filesView", S), d = () => T(Se, "$decisionsView", S), p = () => T(we, "$remindersView", S), m = () => T(Ee, "$appsView", S), h = () => T(Oe, "$agentsView", S), _ = () => T(Ae, "$viewerView", S), v = () => T(oe, "$geometry", S), b = () => T(Re, "$viewerState", S), x = () => T(K, "$view", S), [S, w] = y(), E = G(() => i.presentation.services), D = G(() => i.scope), A = !0, V, H = () => A && E.ownsRoom(D), ee = G(() => i.browser ?? va(window, document)), te = G(() => zn({
		scopeKey: JSON.stringify([
			D.roomId,
			D.account,
			D.identityRevision,
			D.roomGeneration
		]),
		current: H,
		onDocumentClosed: () => V?.actions.closeDocument(),
		onPane: (e) => {
			H() && X(E.state).pane !== e && E.actions.selectPane(e);
		},
		browser: i.layoutBrowser ?? Ln(window)
	})), ne = G(() => _a({
		services: E,
		resources: i.resources,
		layout: te,
		browser: ee
	})), K = ne.state, oe = te.state;
	V = ne, qt(ne.richFiles);
	function se(e) {
		let t = X(ne.state);
		H() && t && t.header.thread === e && (e === "main" ? E.actions.home() : ne.actions.setThread("main"));
	}
	function ce(e) {
		let t = e.root.ownerDocument.defaultView;
		return js(e.root, {
			current: H,
			mobile: () => X(te.state).mobile,
			standalone: () => !!t && (t.matchMedia("(display-mode: standalone)").matches || "standalone" in t.navigator && t.navigator.standalone === !0),
			target: () => X(ne.state)?.header.thread ?? "",
			back: se
		});
	}
	let le = G(() => i.presentation.inbox), ue = G(() => le?.state ?? ae({
		binding: null,
		all: !1,
		data: {
			waits: [],
			mentions: [],
			tasks: []
		},
		phase: "idle",
		error: null
	})), de = G(() => vr(() => import("./RoomInbox-BiMmTkLr.js").then((e) => e.default), { current: H })), fe = de.state, pe = q(() => a().component), me = q(() => !!le && !!o().binding?.roomScope && o().binding.roomId === D.roomId && le.owns(o().binding)), he = le?.state.subscribe((e) => {
		let t = !!e.binding?.roomScope && e.binding.roomId === D.roomId && le.owns(e.binding);
		ne.setInboxVisible(t), t && te.read().sheet === "side" && te.closeSheet();
	});
	function ge() {
		let e = X(E.state).navigationGeneration, t = le ? X(le.state).binding : null;
		return le && t?.roomScope && t.roomId === D.roomId && le.close(t), H() && X(E.state).navigationGeneration === e;
	}
	re(() => {
		Q(me) && de.ensure();
	});
	let _e = G(() => vr(() => import("./Board-5_jWvJHM.js").then((e) => e.default), { current: H })), ve = _e.state, ye = G(() => vr(() => import("./Files-DhSDBEWj.js").then((e) => e.default), { current: H })), be = ye.state, xe = G(() => vr(() => import("./Decisions-DUmy-q1l.js").then((e) => e.default), { current: H })), Se = xe.state, Ce = G(() => vr(() => import("./Reminders-DAL6F4qI.js").then((e) => e.default), { current: H })), we = Ce.state, Te = G(() => vr(() => import("./AppsPanel-BpgL6FgG.js").then((e) => e.default), { current: H })), Ee = Te.state, De = G(() => vr(() => import("./AgentsPane-C9142psM.js").then((e) => e.default), { current: H })), Oe = De.state, ke = G(() => vr(() => import("./FileViewer-CoFgz86i.js").then((e) => e.default), { current: H })), Ae = ke.state, je = q(() => l().component), Me = q(() => u().component), Ne = q(() => d().component), Pe = q(() => p().component), Fe = q(() => m().component), Ie = q(() => h().component), Le = q(() => _().component), Re = ne.viewer.state, ze = q(() => !v().boardFull && (v().mobile ? v().sheet === "doc" || v().presentedSheet === "doc" : v().documentVisible)), Be = Z(!1);
	re(() => {
		(v().boardFull || Q(ze) && v().pane === "board") && (F(Be, !0), _e.ensure()), Q(ze) && (v().pane === "files" && ye.ensure(), v().pane === "apps" && Te.ensure(), v().pane === "decisions" && xe.ensure(), v().pane === "reminders" && Ce.ensure(), v().pane === "agents" && De.ensure()), b().open && ke.ensure();
	}), re(() => {
		let e = x()?.chatRevision;
		e !== void 0 && ie().then(() => {
			H() && ne.current() && X(K)?.chatRevision === e && ne.chatRendered(e);
		});
	}), c(() => {
		A = !1, he?.(), de.dispose(), _e.dispose(), ye.dispose(), xe.dispose(), Ce.dispose(), Te.dispose(), De.dispose(), ke.dispose(), ne.dispose(), te.dispose(), V = void 0;
	});
	function Ve(e) {
		return { destroy: ne.attachFiles(e) };
	}
	function He(e) {
		return { destroy: ne.attachAttention(e) };
	}
	let Ue = {
		documentWidth: E.language === "en" ? "Document width" : "Largura do documento",
		closeDocument: E.language === "en" ? "Close document" : "Fechar documento",
		closeSidebar: E.language === "en" ? "Close sidebar" : "Fechar menu",
		closeSheet: E.t("Fechar"),
		historyUnconfirmed: E.language === "en" ? "Navigation is not confirmed. Review the current page before continuing." : "A navegação ainda não foi confirmada. Confira a página atual antes de continuar.",
		historyRetry: E.t("Tentar de novo"),
		animationUnavailable: E.language === "en" ? "Room layout could not initialize. Reload the page to try again." : "Não foi possível iniciar o layout da sala. Recarregue a página para tentar novamente."
	};
	var We = wu(), Ge = $(We);
	Rn(Ge, {
		get controller() {
			return te;
		},
		get labels() {
			return Ue;
		},
		get onChatSurface() {
			return ne.attachChat;
		},
		onCells: ce,
		get overlayOpen() {
			return Q(me);
		},
		overlay: (r) => {
			var i = t(), s = $(i), c = (r) => {
				var i = t(), s = $(i);
				e(s, () => o().binding, (e) => {
					Pt(e, {
						get value() {
							return o().binding;
						},
						children: (e, r = L) => {
							var i = t(), o = $(i), s = (e) => {
								var i = t(), a = $(i);
								n(a, () => Q(pe), (e, t) => {
									t(e, {
										get owner() {
											return le;
										},
										get binding() {
											return r();
										},
										get services() {
											return E;
										},
										get documentWidth() {
											return te.bindDocumentWidth;
										},
										get sidebarCollapsed() {
											return v().sidebarCollapsed;
										}
									});
								}), P(e, i);
							}, c = (e) => {
								var t = vu(), n = z(t);
								{
									let e = q(() => E.t("Caixa de entrada"));
									Cr(n, {
										get phase() {
											return a().phase;
										},
										get lang() {
											return E.language;
										},
										current: () => H() && le.owns(r()),
										get label() {
											return Q(e);
										},
										retry: () => {
											H() && le.owns(r()) && de.retry();
										}
									});
								}
								W(t), P(e, t);
							};
							C(o, (e) => {
								Q(pe) ? e(s) : e(c, -1);
							}), P(e, i);
						},
						$$slots: { default: !0 }
					});
				}), P(r, i);
			};
			C(s, (e) => {
				le && o().binding && Q(me) && e(c);
			}), P(r, i);
		},
		sidebar: (e) => {
			var n = t(), r = $(n), a = (e) => {
				Vo(e, O(() => x().sidebar, {
					get inboxOpen() {
						return Q(me);
					},
					onthreadintent: ge,
					oninbox: (e) => {
						H() && i.presentation.openInbox(e);
					},
					hideSheetHandle: !0
				}));
			};
			C(r, (e) => {
				x() && e(a);
			}), P(e, n);
		},
		header: (e) => {
			var n = t(), r = $(n), a = (e) => {
				{
					let t = q(() => x().toolbar.counts?.board);
					_u(e, {
						get presentation() {
							return i.presentation;
						},
						get header() {
							return x().header;
						},
						get trigger() {
							return x().trigger;
						},
						get boardCount() {
							return Q(t);
						},
						get layout() {
							return te;
						},
						current: H,
						back: se
					});
				}
			};
			C(r, (e) => {
				x() && e(a);
			}), P(e, n);
		},
		peek: (e) => {
			var n = t(), r = $(n), i = (e) => {
				ql(e, O(() => x().peek));
			};
			C(r, (e) => {
				x() && e(i);
			}), P(e, n);
		},
		attention: (e) => {
			var n = t(), r = $(n), i = (e) => {
				var t = yu(), n = z(t), r = z(n), i = (e) => {
					nu(e, O(() => x().banners));
				};
				C(r, (e) => {
					x().banners && e(i);
				}), W(n), ou(J(n, 2), O(() => x().threadFiles)), W(t), I(() => N(n, 1, f(v().boardFull ? "tw:hidden" : ""))), P(e, t);
			};
			C(r, (e) => {
				x() && e(i);
			}), P(e, n);
		},
		chat: (e) => {
			var n = t(), r = $(n), i = (e) => {
				var n = t(), r = $(n), i = (e) => {
					uu(e, O(() => x().suggestion));
				}, a = (e) => {
					fc(e, O(() => x().chat));
				};
				C(r, (e) => {
					x().suggestion ? e(i) : x().chat && e(a, 1);
				}), P(e, n);
			};
			C(r, (e) => {
				x() && e(i);
			}), P(e, n);
		},
		composer: (e) => {
			var n = t(), r = $(n), i = (e) => {
				{
					let t = q(() => x().composer.hidden || v().boardFull);
					Jc(e, O(() => x().composer, { get hidden() {
						return Q(t);
					} }));
				}
			};
			C(r, (e) => {
				x()?.composer && e(i);
			}), P(e, n);
		},
		documentToolbar: (e) => {
			var n = t(), r = $(n), i = (e) => {
				ql(e, O(() => x().toolbar));
			};
			C(r, (e) => {
				x() && e(i);
			}), P(e, n);
		},
		document: (e) => {
			var r = t(), i = $(r), a = (e) => {
				var r = bu(), i = $(r);
				Vl(z(i), O(() => x().document)), W(i), M(i, (e) => He?.(e));
				var a = J(i, 2), o = z(a), s = (e) => {
					var r = t(), i = $(r);
					n(i, () => Q(Me), (e, t) => {
						t(e, O(() => x().files));
					}), P(e, r);
				}, c = (e) => {
					{
						let t = q(() => E.language === "en" ? "Files" : "Arquivos");
						Cr(e, {
							get phase() {
								return u().phase;
							},
							get lang() {
								return E.language;
							},
							get label() {
								return Q(t);
							},
							retry: () => {
								ye.retry();
							},
							current: H
						});
					}
				};
				C(o, (e) => {
					Q(Me) ? e(s) : e(c, -1);
				}), W(a), M(a, (e) => Ve?.(e));
				var l = J(a, 2), g = z(l), _ = (e) => {
					var r = t(), i = $(r);
					n(i, () => Q(Fe), (e, t) => {
						t(e, { get props() {
							return x().apps;
						} });
					}), P(e, r);
				}, y = (e) => {
					{
						let t = q(() => (E.language, "Apps"));
						Cr(e, {
							get phase() {
								return m().phase;
							},
							get lang() {
								return E.language;
							},
							get label() {
								return Q(t);
							},
							retry: () => {
								Te.retry();
							},
							current: H
						});
					}
				};
				C(g, (e) => {
					Q(Fe) ? e(_) : e(y, -1);
				}), W(l);
				var b = J(l, 2), S = z(b), w = (e) => {
					var r = t(), i = $(r);
					n(i, () => Q(Ne), (e, t) => {
						t(e, O(() => x().decisions));
					}), P(e, r);
				}, T = (e) => {
					{
						let t = q(() => E.language === "en" ? "Decisions" : "Decisões");
						Cr(e, {
							get phase() {
								return d().phase;
							},
							get lang() {
								return E.language;
							},
							get label() {
								return Q(t);
							},
							retry: () => {
								xe.retry();
							},
							current: H
						});
					}
				};
				C(S, (e) => {
					Q(Ne) ? e(w) : e(T, -1);
				}), W(b);
				var D = J(b, 2), k = z(D), A = (e) => {
					var r = t(), i = $(r);
					n(i, () => Q(Pe), (e, t) => {
						t(e, O(() => x().reminders));
					}), P(e, r);
				}, F = (e) => {
					{
						let t = q(() => E.language === "en" ? "Reminders" : "Lembretes");
						Cr(e, {
							get phase() {
								return p().phase;
							},
							get lang() {
								return E.language;
							},
							get label() {
								return Q(t);
							},
							retry: () => {
								Ce.retry();
							},
							current: H
						});
					}
				};
				C(k, (e) => {
					Q(Pe) ? e(A) : e(F, -1);
				}), W(D);
				var L = J(D, 2), R = (e) => {
					var r = t(), i = $(r), a = (e) => {
						var r = t(), i = $(r);
						n(i, () => Q(Ie), (e, t) => {
							t(e, O(() => x().agents));
						}), P(e, r);
					}, o = (e) => {
						{
							let t = q(() => (E.language, "Agents"));
							Cr(e, {
								get phase() {
									return h().phase;
								},
								get lang() {
									return E.language;
								},
								get label() {
									return Q(t);
								},
								retry: () => {
									De.retry();
								},
								current: H
							});
						}
					};
					C(i, (e) => {
						Q(Ie) ? e(a) : e(o, -1);
					}), P(e, r);
				};
				C(L, (e) => {
					v().pane === "agents" && x().agents && e(R);
				}), I(() => {
					N(i, 1, f(v().pane === "doc" ? "tw:flex tw:h-full tw:min-h-0 tw:flex-col" : "tw:hidden")), j(i, "hidden", v().pane !== "doc"), N(a, 1, f(v().pane === "files" ? "tw:h-full tw:min-h-0 tw:overflow-auto" : "tw:hidden")), j(a, "hidden", v().pane !== "files"), N(l, 1, f(v().pane === "apps" ? "tw:min-h-0" : "tw:hidden")), j(l, "hidden", v().pane !== "apps"), N(b, 1, f(v().pane === "decisions" ? "tw:min-h-0" : "tw:hidden")), j(b, "hidden", v().pane !== "decisions"), N(D, 1, f(v().pane === "reminders" ? "tw:min-h-0" : "tw:hidden")), j(D, "hidden", v().pane !== "reminders");
				}), P(e, r);
			};
			C(i, (e) => {
				x() && e(a);
			}), P(e, r);
		},
		board: (e) => {
			var r = t(), i = $(r), a = (e) => {
				var r = t(), i = $(r), a = (e) => {
					var r = t(), i = $(r);
					n(i, () => Q(je), (e, t) => {
						t(e, O(() => x().board));
					}), P(e, r);
				}, o = (e) => {
					{
						let t = q(() => E.language === "en" ? "Board" : "Quadro");
						Cr(e, {
							get phase() {
								return l().phase;
							},
							get lang() {
								return E.language;
							},
							get label() {
								return Q(t);
							},
							retry: () => {
								_e.retry();
							},
							current: H
						});
					}
				};
				C(i, (e) => {
					Q(je) ? e(a) : e(o, -1);
				}), P(e, r);
			};
			C(i, (e) => {
				x() && Q(Be) && e(a);
			}), P(e, r);
		},
		$$slots: {
			overlay: !0,
			sidebar: !0,
			header: !0,
			peek: !0,
			attention: !0,
			chat: !0,
			composer: !0,
			documentToolbar: !0,
			document: !0,
			board: !0
		}
	});
	var Ke = J(Ge, 2), qe = (r) => {
		var i = Cu(), a = $(i), o = (e) => {
			var r = t(), i = $(r);
			n(i, () => Q(Le), (e, t) => {
				t(e, O(() => x().viewer));
			}), P(e, r);
		}, c = (n) => {
			var r = t(), i = $(r);
			e(i, () => b().target, (e) => {
				Pt(e, {
					get value() {
						return b().target;
					},
					children: (e, t = L) => {
						{
							let n = q(() => b().name || (E.language === "en" ? "File" : "Arquivo")), r = q(() => E.language === "en" ? "Close file" : "Fechar arquivo");
							Mt(e, {
								open: !0,
								get title() {
									return Q(n);
								},
								get closeLabel() {
									return Q(r);
								},
								fullScreen: !0,
								get returnFocus() {
									return ne.viewer.returnFocus;
								},
								onOpenChange: (e) => {
									!e && !Q(Le) && H() && X(Re).target === t() && ne.viewer.closeUser();
								},
								children: (e, n) => {
									{
										let n = q(() => E.language === "en" ? "File" : "Arquivo");
										Cr(e, {
											get phase() {
												return _().phase;
											},
											get lang() {
												return E.language;
											},
											get label() {
												return Q(n);
											},
											retry: () => {
												ke.retry();
											},
											current: () => H() && X(Re).target === t()
										});
									}
								},
								$$slots: { default: !0 }
							});
						}
					},
					$$slots: { default: !0 }
				});
			}), P(n, r);
		};
		C(a, (e) => {
			Q(Le) ? e(o) : b().open && b().target && e(c, 1);
		});
		var l = J(a, 2), u = (e) => {
			var t = xu(), n = z(t), r = B(n, !0), i = J(n, 2);
			k(i, {
				onclick: (e) => {
					e.currentTarget.isConnected && H() && E.actions.reload();
				},
				children: (e, t) => {
					Y();
					var n = g();
					I((e) => s(n, e), [() => Kt(E.language, "reload")]), P(e, n);
				},
				$$slots: { default: !0 }
			}), W(t), I((e) => s(r, e), [() => Kt(E.language, "closing")]), P(e, t);
		};
		C(l, (e) => {
			!Q(Le) && b().closingUnconfirmed && e(u);
		});
		var d = J(l, 2), f = (e) => {
			var t = Su(), n = B(t, !0);
			I(() => s(n, x().notice)), P(e, t);
		};
		C(d, (e) => {
			x().notice && e(f);
		}), P(r, i);
	};
	C(Ke, (e) => {
		x() && e(qe);
	}), P(r, We), U(), w();
}
// svelte/features/room-shell/RoomStatus.svelte
var Eu = h("<!> <!>", 1), Du = h("<!> <p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p> <div aria-hidden=\"true\" class=\"tw:grid tw:gap-3 tw:motion-safe:animate-pulse\"><div class=\"tw:h-4 tw:w-3/4 tw:rounded-control tw:bg-muted\"></div> <div class=\"tw:h-4 tw:w-full tw:rounded-control tw:bg-muted\"></div> <div class=\"tw:h-4 tw:w-1/2 tw:rounded-control tw:bg-muted\"></div></div>", 1), Ou = h("<main data-vb-native=\"\" class=\"tw:mx-auto tw:flex tw:min-h-[50dvh] tw:w-full tw:max-w-xl tw:flex-col tw:justify-center tw:gap-4 tw:p-6 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground\"><!> <!></main>");
function ku(e, t) {
	R(t, !0);
	let n = (e) => t.services.active() && e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected && e.currentTarget.closest("[data-native-room-status]")?.getAttribute("data-room-generation") === String(t.services.rootRoom.read().generation);
	var r = Ou(), i = z(r), a = (e) => {
		var r = Eu(), i = $(r);
		{
			let e = q(() => t.services.t(t.snapshot.phase === "removed" ? "Você foi removido deste vibebook." : "Sem acesso a este vibebook. Peça para alguém de dentro te convidar."));
			Xn(i, { get title() {
				return Q(e);
			} });
		}
		var a = J(i, 2), o = (e) => {
			k(e, {
				variant: "outline",
				onclick: (e) => {
					n(e) && t.services.actions.retryRoom();
				},
				children: (e, n) => {
					Y();
					var r = g();
					I((e) => s(r, e), [() => t.services.t("Verificar acesso novamente")]), P(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		C(a, (e) => {
			t.snapshot.phase === "unavailable" && e(o);
		}), P(e, r);
	}, o = (e) => {
		var n = Du(), r = $(n);
		Gn(r, {
			level: 1,
			class: "tw:font-sans tw:tracking-normal tw:[font-variation-settings:normal]",
			children: (e, t) => {
				Y();
				var n = g("vibebook");
				P(e, n);
			},
			$$slots: { default: !0 }
		});
		var i = J(r, 2), a = B(i, !0);
		Y(2), I((e) => s(a, e), [() => t.services.t("Carregando…")]), P(e, n);
	};
	C(i, (e) => {
		t.snapshot.phase === "removed" || t.snapshot.phase === "unavailable" ? e(a) : e(o, -1);
	});
	var c = J(i, 2);
	k(c, {
		variant: "ghost",
		onclick: (e) => {
			n(e) && t.services.actions.home();
		},
		children: (e, n) => {
			Y();
			var r = g();
			I((e) => s(r, e), [() => t.services.t("seus vibebooks")]), P(e, r);
		},
		$$slots: { default: !0 }
	}), W(r), I(() => {
		j(r, "data-native-room-status", t.snapshot.phase), j(r, "data-room-generation", t.snapshot.generation);
	}), P(e, r), U();
}
// svelte/features/room-shell/RoomShell.svelte
function Au(n, r) {
	R(r, !0);
	let i = () => T(c, "$root", o), a = () => T(l, "$application", o), [o, s] = y(), c = G(() => r.presentation.services.rootRoom.state), l = G(() => r.presentation.services.state), u = q(() => (i().generation, i().room, i().connection, a().navigationGeneration, a().sessionDenied, r.presentation.services.roomScope()));
	var d = t(), f = $(d), p = (n) => {
		var i = t(), a = $(i);
		e(a, () => JSON.stringify([
			Q(u).roomId,
			Q(u).account,
			Q(u).identityRevision,
			Q(u).roomGeneration
		]), (e) => {
			Tu(e, {
				get presentation() {
					return r.presentation;
				},
				get resources() {
					return r.resources;
				},
				get scope() {
					return Q(u);
				},
				get browser() {
					return r.browser;
				},
				get layoutBrowser() {
					return r.layoutBrowser;
				}
			});
		}), P(n, i);
	}, m = (e) => {
		ku(e, {
			get snapshot() {
				return i();
			},
			get services() {
				return r.presentation.services;
			}
		});
	};
	C(f, (e) => {
		Q(u) ? e(p) : e(m, -1);
	}), P(n, d), U(), s();
}
// svelte/features/home/personal.ts
function ju(e, t = {}) {
	let n = t.clock ?? We, r = K({
		me: null,
		agents: null,
		loading: !1,
		error: "",
		updateAvailable: !1,
		identityRevision: 0,
		now: Date.now(),
		seen: {}
	}), i = K({
		ask: "",
		create: "",
		unknown: null
	}), a = null, o = !0, s = !1, c = !1, l = 0, u = 0, d = null, f = null, p = null, m = null, h = Ge(n), g, _ = !1, v = !1, y = 0, b = 0, x = null, S = (e) => {
		e !== null && n.cancel(e);
	};
	function C(e, n = !0) {
		if (!o || a === e) return !1;
		let m = a !== null;
		return a = e, h.cancel(), b++, y++, _ = v = !1, g = void 0, S(x), x = null, (m || n && s) && (l++, u++, s = !1, c = !1, d?.abort(), d = null, S(f), S(p), f = p = null), m ? (i.set({
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
		})), n && E(), m;
	}
	function w() {
		if (S(m), !o) return;
		r.update((e) => ({
			...e,
			now: Date.now()
		}));
		let e = Date.now(), t = Math.min(6e4, ...(X(r).me?.books ?? []).map((t) => (t.busy_until ?? 0) - e).filter((e) => e > 0));
		m = n.schedule(w, Math.max(100, t));
	}
	function T() {
		o && (l++, c = !0, p === null && (p = n.schedule(() => {
			p = null, E();
		}, 600)));
	}
	async function E() {
		if (!o || s) return;
		S(p), p = null, s = !0, c = !1;
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
			a === l && (C(n.email, !1), r.update((e) => ({
				...e,
				me: n,
				loading: !1,
				error: ""
			})), t.onVersion?.(n.v), w());
		} catch (e) {
			o && i === u && (r.update((t) => ({
				...t,
				loading: !1,
				error: e instanceof Error ? e.message : "network"
			})), e instanceof mr && e.status === 401 && t.onUnauthorized?.());
		} finally {
			o && i === u && (S(f), f = null, d = null, s = !1, (c || a !== l) && E());
		}
	}
	function D() {
		if (!o) return;
		if (_) return g;
		S(x), x = null, _ = !0, v = !1;
		let t = ++b, n = y, i = !1, a = () => {
			i || (i = !0, o && t === b && (_ = !1, (v || n !== y) && D()));
		}, s = h.run((t) => e.agents(t), (e) => {
			o && t === b && n === y && r.update((t) => ({
				...t,
				agents: e
			})), a();
		}, a);
		return g = s, s.finally(() => {
			t === b && (g = void 0);
		}), s;
	}
	function O() {
		if (o) return y++, v = !0, S(x), x = null, D();
	}
	function k() {
		o = !1, l++, u++, d?.abort(), S(f), S(p), S(m), S(x), b++, g = void 0, h.dispose();
	}
	return {
		state: r,
		draft: i,
		api: e,
		refresh: E,
		acceptIdentity: C,
		invalidate: T,
		peek: () => X(r).me,
		updateAvailable(e) {
			o && r.update((t) => ({
				...t,
				updateAvailable: e
			}));
		},
		observe(e) {
			o && (e.kind === "account" ? T() : (y++, v = !0, x === null && (x = n.schedule(() => {
				x = null, D();
			}, 600))));
		},
		refreshAgents: O,
		loadAgents: D,
		roomMeta(e, t) {
			if (!o) return;
			let n = X(r).me, i = n?.books.find((t) => t.id === e);
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
			o && (w(), E());
		},
		revoke() {
			o && (k(), a = null, i.set({
				ask: "",
				create: "",
				unknown: null
			}), r.update((e) => ({
				...e,
				me: null,
				agents: null,
				seen: {},
				loading: !1,
				error: "unauthorized",
				identityRevision: e.identityRevision + 1
			})), t.onIdentityChange?.());
		},
		dispose: k
	};
}
// svelte/features/rooms/session.ts
function Mu(e, t = We) {
	let n = K({
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
		let d = X(e.state).me;
		if (!r || !d || a.has(s) || u && !d.books.some((e) => e.id === u)) return;
		let f = ++i, p = Ge(t), m = {
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
		let h = () => r && a.get(s)?.ticket === f;
		return p.run(c, (n) => {
			if (!h()) return;
			m.ack = !0, m.matches = (e) => l(e, n);
			let r = X(e.state).me;
			if (r && m.matches(r)) o(s);
			else {
				e.invalidate(), e.refresh();
				for (let n of [
					1e3,
					3e3,
					6e3
				]) m.timers.push(t.schedule(() => {
					h() && e.refresh();
				}, n));
				m.timers.push(t.schedule(() => {
					h() && o(s, "unconfirmed");
				}, 1e4));
			}
		}, (e) => {
			h() && o(s, e instanceof Error ? e.message : "network");
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
			let n = X(e.state).me;
			if (!n || t.length !== n.books.length || new Set(t).size !== t.length || t.some((e) => !n.books.some((t) => t.id === e))) return;
			let r = t.slice(0, 300);
			return c("order", (t) => e.api.order(r, t), (e) => Re(e.books).filter((e) => r.includes(e.id)).map((e) => e.id).join("\0") === r.join("\0"));
		},
		resolve(t, n) {
			if (n.startsWith("m") && X(e.state).me?.waits.some((e) => e.book_id === t && e.ref === n)) return c(`wait:${t}:${n}`, (r) => e.api.resolve(t, n, r), (e) => !e.waits.some((e) => e.book_id === t && e.ref === n));
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
// svelte/features/account/api.ts
var Nu = class extends Error {
	status;
	constructor(e, t) {
		super(e), this.status = t;
	}
};
async function Pu(e, t) {
	let n = await e.json().catch(() => null);
	if (!e.ok) {
		let t = Te.safeParse(n);
		throw new Nu(t.success ? t.data.error : `HTTP ${e.status}`, e.status);
	}
	try {
		return t.parse(n);
	} catch {
		throw Error("invalid-response");
	}
}
function Fu(e) {
	let t = he("/", e).api;
	return {
		logins: (e) => t.me.logins.$get({}, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => Pu(e, be)),
		name: (e, n) => t.me.$post({ json: { name: e } }, { init: { signal: n } }).then((e) => Pu(e, je)),
		avatar: (e, n) => t.me.avatar.$post({ header: { "content-type": "image/jpeg" } }, { init: {
			body: e,
			signal: n
		} }).then((e) => Pu(e, Ee)),
		addFriend: (e, n) => t.friends.$post({ json: { email: e } }, { init: { signal: n } }).then((e) => Pu(e, we)),
		removeFriend: (e, n) => t.friends[":email"].$delete({ param: { email: encodeURIComponent(e) } }, { init: { signal: n } }).then((e) => Pu(e, we))
	};
}
// svelte/features/account/session.ts
function Iu(e, t, n = We) {
	let r = K({
		binding: null,
		open: !1,
		presentation: "dialog",
		section: "all",
		me: null,
		phase: "idle",
		error: "",
		logins: null,
		loginsLoading: !1,
		loginsError: ""
	}), i = Ge(n), a = Ge(n), o = !0, s = "", c = X(e.state).identityRevision, l = 0, u = 0, d = null, f = null, p = null, m = () => {
		l++, a.cancel(), d !== null && n.cancel(d), d = null, p = null;
	}, h = (t) => o && X(r).binding !== null && t === l && X(e.state).identityRevision === c && e.peek()?.email === s;
	function g(e, t) {
		if (e.kind === "name") return t.name === e.name;
		if (e.kind === "avatar") return t.avatar === e.avatar;
		let n = t.friends.some((t) => t.email === e.email);
		return e.kind === "add" ? n : !n;
	}
	function _() {
		let e = p, t = X(r).me;
		e?.ack && e.change && t && h(e.ticket) && g(e.change, t) && (m(), r.update((e) => ({
			...e,
			phase: "idle",
			error: ""
		})));
	}
	let v = e.state.subscribe((e) => {
		o && (e.identityRevision !== c || s && e.me && e.me.email !== s ? (u++, m(), i.cancel(), s = "", c = e.identityRevision, f = null, r.set({
			binding: null,
			open: !1,
			presentation: "dialog",
			section: "all",
			me: null,
			phase: "idle",
			error: "",
			logins: null,
			loginsLoading: !1,
			loginsError: ""
		})) : e.me && e.me.email === s && (r.update((t) => ({
			...t,
			me: e.me
		})), _()));
	});
	function y() {
		if (!o || !X(r).open) return;
		i.cancel();
		let n = u, a = () => o && X(r).open && u === n && X(e.state).identityRevision === c && e.peek()?.email === s;
		r.update((e) => ({
			...e,
			loginsLoading: !0,
			loginsError: ""
		})), i.run((e) => t.logins(e), (e) => {
			a() && r.update((t) => ({
				...t,
				logins: e,
				loginsLoading: !1
			}));
		}, (e) => {
			a() && r.update((t) => ({
				...t,
				loginsLoading: !1,
				loginsError: e instanceof Error ? e.message : "failed"
			}));
		});
	}
	function b(t, i) {
		if (!o || !X(r).binding || p || !s || e.peek()?.email !== s) return;
		let c = ++l;
		p = {
			ticket: c,
			ack: !1
		}, r.update((e) => ({
			...e,
			phase: "pending",
			error: ""
		})), a.run((e) => t(e, () => h(c)), (t) => {
			h(c) && p && (p.ack = !0, p.change = i(t), r.update((e) => ({
				...e,
				phase: "confirming",
				error: ""
			})), _(), p && (d = n.schedule(() => {
				h(c) && r.update((e) => ({
					...e,
					phase: "unconfirmed",
					error: "unconfirmed"
				}));
			}, 1e4), e.invalidate(), e.refresh()));
		}, (t) => {
			if (!h(c)) return;
			l++;
			let n = t instanceof Nu && [
				400,
				401,
				403,
				413,
				415,
				429
			].includes(t.status);
			n && (p = null), r.update((e) => ({
				...e,
				phase: n ? "error" : "unconfirmed",
				error: t instanceof Error ? t.message : "failed"
			})), t instanceof Nu && t.status === 401 && (e.invalidate(), e.refresh());
		});
	}
	function x(t, n, a) {
		if (!o) return;
		let l = e.peek();
		if (l) return u++, m(), i.cancel(), s = l.email, c = X(e.state).identityRevision, f = n?.isConnected ? n : null, r.set({
			binding: {
				account: s,
				revision: c,
				generation: u
			},
			open: a === "dialog",
			presentation: a,
			section: t,
			me: l,
			phase: "idle",
			error: "",
			logins: null,
			loginsLoading: !1,
			loginsError: ""
		}), a === "dialog" && y(), X(r).binding;
	}
	return {
		state: r,
		open(e = "all", t) {
			x(e, t, "dialog");
		},
		openInline() {
			return X(r).open ? null : x("profile", void 0, "inline") ?? null;
		},
		close(e) {
			e && X(r).binding !== e || (u++, m(), i.cancel(), r.update((e) => ({
				...e,
				binding: null,
				open: !1,
				presentation: "dialog",
				logins: null,
				loginsLoading: !1
			})));
		},
		returnFocus: () => f?.isConnected ? f : null,
		owns: (t) => o && X(r).binding !== null && X(r).binding === t && t.account === s && t.revision === c && t.generation === u && X(e.state).identityRevision === c && e.peek()?.email === s,
		current: () => o && X(r).binding !== null && X(e.state).identityRevision === c && e.peek()?.email === s,
		rename: (e) => b((n) => t.name(e, n), (e) => ({
			kind: "name",
			name: e.name
		})),
		photo: (e) => b(async (n, r) => {
			let i = await e(r);
			if (!r() || n.aborted) throw Error("cancelled");
			return t.avatar(i, n);
		}, (e) => ({
			kind: "avatar",
			avatar: e.avatar
		})),
		add: (e) => b((n) => t.addFriend(e, n), () => ({
			kind: "add",
			email: e.trim().toLowerCase()
		})),
		remove: (e) => b((n) => t.removeFriend(e, n), () => ({
			kind: "remove",
			email: e
		})),
		refresh() {
			o && X(r).binding && (e.invalidate(), e.refresh(), X(r).loginsLoading || y());
		},
		logins: y,
		review() {
			X(r).phase === "unconfirmed" && (m(), r.update((e) => ({
				...e,
				phase: "idle",
				error: ""
			})));
		},
		dispose() {
			o = !1, m(), i.dispose(), a.dispose(), v(), f = null, s = "", r.set({
				binding: null,
				open: !1,
				presentation: "dialog",
				section: "all",
				me: null,
				phase: "idle",
				error: "",
				logins: null,
				loginsLoading: !1,
				loginsError: ""
			});
		}
	};
}
// svelte/features/account/logout.ts
function Lu(e) {
	if (!e) return null;
	let t = X(e.state);
	return t.me ? {
		email: t.me.email,
		revision: t.identityRevision
	} : null;
}
function Ru(e) {
	let t = !1, n = !0;
	return Object.assign(async (r) => {
		if (!n || t) return;
		let i = e.identity();
		if (!i) return;
		t = !0;
		let a = () => {
			let t = e.identity();
			return n && t?.email === i.email && t.revision === i.revision;
		};
		try {
			let t = await e.beforeLogout();
			if (!a() || (t.confirmed || e.warning(), !a())) throw Error("identity-changed");
			if (!(await e.post(r)).ok || !a()) throw Error("logout-unconfirmed");
			e.success(r);
		} catch {
			n && (e.failure(), e.reload());
		}
	}, { dispose() {
		n = !1;
	} });
}
// svelte/features/agents/account.ts
var zu = () => ({
	grants: null,
	loading: !1,
	readError: "",
	phase: "idle",
	error: ""
});
function Bu(e, t = {}) {
	let n = t.api ?? Tt(), r = t.clock ?? dt, i = K(zu()), a = at(r), o = at(r), s = !0, c = !1, l = !1, u = 0, d = 0, f = 0, p = 0, m = null, h = null, g = null, _ = () => {
		h !== null && r.cancel(h), h = null;
	}, v = () => s && !c;
	function y() {
		c = !0, l = !0, f++, a.cancel(), m = null, p++, g = null, o.cancel(), _(), i.set({
			...zu(),
			readError: "read-failed"
		});
	}
	function b() {
		let e = X(i).grants;
		g && e && g.ids.every((t) => !e.agents.some((e) => e.id === t)) && (g = null, i.update((e) => ({
			...e,
			phase: "idle",
			error: ""
		})));
	}
	function x() {
		_();
		let e = X(i).grants;
		s && u && e && !e.agents.length && d < 150 && (h = r.schedule(() => {
			h = null, d++, S();
		}, jn));
	}
	function S(r = !1) {
		if (!s) return Promise.resolve();
		if (m && !r) return m;
		r && (f++, a.cancel(), m = null), _();
		let o = ++f, u = l;
		i.update((e) => ({
			...e,
			loading: !0,
			readError: ""
		}));
		let d = a.run((t) => Ct(n, e, t, l, () => n.grants(t)), Pn).then((e) => {
			s && o === f && (u && t.onIdentityProved?.(), c = !1, l = !1, i.update((t) => ({
				...t,
				grants: e,
				loading: !1,
				readError: ""
			})), b(), x());
		}, (e) => {
			s && o === f && (st(e) && (y(), t.onUnauthorized?.()), i.update((t) => ({
				...t,
				loading: !1,
				readError: e instanceof ft && e.code === "cancelled" ? "" : "read-failed"
			})));
		}).finally(() => {
			o === f && (m = null);
		});
		return m = d, d;
	}
	return {
		account: e,
		state: i,
		current: v,
		deny: y,
		refresh: S,
		watch() {
			if (!s) return () => {};
			u || (d = 0), u++, S();
			let e = !0;
			return () => {
				e && (e = !1, u = Math.max(0, u - 1), u || (_(), g || (f++, a.cancel(), m = null, i.update((e) => ({
					...e,
					loading: !1
				})))));
			};
		},
		async revoke(e) {
			let r = X(i).grants;
			if (!v() || g || !r || !e.length) return;
			let a = [...new Set(e)];
			if (!a.every((e) => r.agents.some((t) => t.id === e))) return;
			let c = ++p, l = {
				ids: a,
				ack: !1
			};
			g = l, i.update((e) => ({
				...e,
				phase: "pending",
				error: ""
			}));
			try {
				if (await o.run((e) => n.revoke(a, e), Pn), !s || c !== p || g !== l) return;
				l.ack = !0, t.onChanged?.(), await S(!0), s && g === l && i.update((e) => ({
					...e,
					phase: "unconfirmed",
					error: "canonical-unconfirmed"
				}));
			} catch (e) {
				if (!s || c !== p || g !== l) return;
				if (st(e)) {
					y(), t.onUnauthorized?.();
					return;
				}
				let n = e instanceof Et && [
					400,
					401,
					403,
					429
				].includes(e.status);
				n && (g = null), i.update((e) => ({
					...e,
					phase: n ? "error" : "unconfirmed",
					error: n ? "revoke-failed" : "unconfirmed"
				})), n || await S();
			}
		},
		review() {
			s && X(i).phase === "unconfirmed" && (p++, g = null, o.cancel(), i.update((e) => ({
				...e,
				phase: "idle",
				error: ""
			})));
		},
		dispose() {
			s = !1, u = 0, f++, p++, g = null, _(), a.cancel(), o.cancel(), m = null, i.set(zu());
		}
	};
}
// svelte/features/sandboxes/terminalSession.ts
var Vu = (e) => ({
	open: !1,
	generation: e,
	id: "",
	name: "",
	phase: "idle",
	error: "",
	semantic: null
});
function Hu(e, t, n, r) {
	let i = r.clock ?? dt, a = at(i), o = K(Vu(0)), s = new TextEncoder(), c = !0, l = 0, u = null, d = null, f = null, p = null, m = null, h = !1, g = null, _ = (e) => c && X(o).open && e === l && r.current() && !!u && r.canOpen(u.id, u.vm_id);
	function v() {
		g !== null && i.cancel(g), g = null;
	}
	function y() {
		v(), p?.abort(), p = null, a.cancel();
		let e = d;
		d = null, e && (e.onopen = e.onmessage = e.onerror = e.onclose = null, e.close()), f?.dispose(), f = null, h = !1;
	}
	function b(e) {
		if (!_(e)) return;
		v(), f?.input(!1), o.update((e) => ({
			...e,
			phase: "error",
			error: "terminal-unavailable"
		}));
		let t = d;
		d = null, t && (t.onopen = t.onmessage = t.onerror = t.onclose = null, t.close());
	}
	function x(e) {
		if (_(l) && d?.readyState === 1) try {
			d.send(s.encode(e));
		} catch {
			b(l);
		}
	}
	function S(e, t) {
		if (_(l) && d?.readyState === 1 && vt(e, t)) try {
			d.send(JSON.stringify({
				type: "resize",
				cols: e,
				rows: t
			}));
		} catch {
			b(l);
		}
	}
	return {
		account: e,
		roomId: t,
		state: o,
		current: _,
		open(e, t) {
			c && r.current() && r.canOpen(e.id, e.vm_id) && (l++, y(), u = {
				id: e.id,
				name: e.name,
				vm_id: e.vm_id
			}, m = t?.isConnected ? t : null, o.set({
				...Vu(l),
				open: !0,
				id: e.id,
				name: e.name,
				phase: "loading"
			}));
		},
		async mount(e, t, s) {
			if (!_(t) || h || f) return;
			h = !0;
			let c = new AbortController();
			p = c;
			let m = c.signal, y = null, C = !0;
			try {
				if (y = await a.run(() => e({
					current: () => _(t),
					data: (e) => {
						_(t) && x(e);
					},
					resize: (e, n) => {
						_(t) && S(e, n);
					},
					semantic: (e) => {
						_(t) && o.update((t) => ({
							...t,
							semantic: e
						}));
					},
					failed: () => b(t)
				}, m).then((e) => {
					if (!C || !_(t)) throw e.dispose(), Error("cancelled");
					return e;
				}), Pn), !_(t)) {
					y.dispose();
					return;
				}
				f = y, o.update((e) => ({
					...e,
					phase: "connecting"
				}));
				let c = await a.run((e) => n.terminal(u.id, e), Pn);
				if (!_(t) || !f || !u) return;
				let l = xt(c.url, r.origin, u.vm_id);
				if (!vt(f.cols, f.rows)) throw Error("Invalid terminal size");
				l.searchParams.set("cols", String(f.cols)), l.searchParams.set("rows", String(f.rows));
				let p = (r.socket ?? ((e, t) => new WebSocket(e, t)))(l.href, ct(c.token));
				if (!_(t)) {
					p.close();
					return;
				}
				d = p, p.binaryType = "arraybuffer", p.onopen = () => {
					_(t) && d === p && (f?.input(!0), s?.() && _(t) && f?.focus(), S(f?.cols ?? 0, f?.rows ?? 0));
				}, p.onmessage = (e) => {
					if (!_(t) || d !== p) return;
					if (e.data instanceof ArrayBuffer) {
						try {
							f?.write(new Uint8Array(e.data));
						} catch {
							b(t);
						}
						return;
					}
					let n = ot(e.data);
					n === "connected" ? (v(), o.update((e) => ({
						...e,
						phase: "connected",
						error: ""
					}))) : n === "exited" ? (v(), f?.input(!1), o.update((e) => ({
						...e,
						phase: "exited"
					}))) : n === "error" && b(t);
				}, p.onerror = () => b(t), p.onclose = () => {
					_(t) && d === p && (v(), f?.input(!1), d = null, o.update((e) => e.phase === "exited" || e.phase === "error" ? e : {
						...e,
						phase: "disconnected"
					}));
				}, g = i.schedule(() => b(t), Pn);
			} catch (e) {
				C = !1, st(e) && r.onUnauthorized?.(), f && t === l || c.abort(), _(t) ? b(t) : y && y !== f && y.dispose();
			} finally {
				t === l && (h = !1);
			}
		},
		key(e, t) {
			_(t) && (x(pt[e]), f?.focus());
		},
		focus(e) {
			_(e) && f?.focus();
		},
		reconcile() {
			u && !r.canOpen(u.id, u.vm_id) && (l++, y(), u = null, m = null, o.set(Vu(l)));
		},
		returnFocus(e) {
			return e === l && r.current() && m?.isConnected ? m : null;
		},
		close(e = l, t = !0) {
			c && e === l && (y(), u = null, t || (m = null), o.set(Vu(l)));
		},
		dispose() {
			c = !1, l++, y(), u = null, m = null, o.set(Vu(l));
		}
	};
}
// svelte/features/agents/room.ts
function Uu(e, t, n, r, i, a) {
	let o = a.clock ?? dt, s = at(o), c = at(o), l = _t({
		clock: o,
		fetcher: a.runnerFetch
	}), u = (e, t) => {
		try {
			return a.storage?.getItem(e) === t;
		} catch {
			return !1;
		}
	}, d = K({
		room: null,
		thread: "main",
		waits: [],
		data: null,
		loading: !1,
		readError: "",
		togglePhase: "idle",
		toggleError: "",
		dismissPhase: "idle",
		dismissError: "",
		dismissId: null,
		askedAt: 0,
		now: o.now(),
		hasAgent: null,
		setupDismissed: u("vb.setupOff", "1"),
		offerDismissed: u("vb.claudeBar.off", "off"),
		startDismissed: u(`vb.start.${t}`, "off"),
		welcome: !1,
		setupFeedback: !1,
		listeningFeedback: !1,
		pane: !1
	}), f = !0, p = !1, m = !0, h = !1, g = !1, _ = !1, v, y = 0, b = 0, x = 0, S = null, C = null, w = null, T = null, E = /* @__PURE__ */ new Map();
	function D(e) {
		E.has(e) && o.cancel(E.get(e)), E.delete(e);
	}
	let O = () => f && p && _, k = () => O() && !h, A = () => k() && (a.allowMutation?.() ?? !0), j = yt(e, t, n, i, {
		clock: o,
		current: k,
		allowMutation: a.allowMutation,
		onUnauthorized: a.onUnauthorized,
		onMembershipDenied: z,
		onChanged: () => {
			f && (a.onChanged?.(), p && L(!0));
		}
	}), M = Hu(e, t, n, {
		clock: o,
		origin: a.origin,
		current: k,
		onUnauthorized: a.onUnauthorized,
		canOpen: (e, t) => j.current() && !!X(j.state).data?.sandboxes.some((n) => n.id === e && n.vm_id === t && n.state !== "deleted")
	}), N = j.state.subscribe(() => {
		f && M.reconcile();
	});
	function P(e, t) {
		D(e), d.update((t) => ({
			...t,
			[e]: !0
		})), E.set(e, o.schedule(() => {
			E.delete(e), f && d.update((t) => ({
				...t,
				[e]: !1
			}));
		}, t));
	}
	function F() {
		if (D("clock"), !k() || !m) return;
		d.update((e) => ({
			...e,
			now: o.now()
		}));
		let e = X(d);
		l.probe(t, e.room?.book.title ?? "", e.pane && !!e.data?.claude_on), E.set("clock", o.schedule(F, 1e4));
	}
	function I() {
		let e = w, t = X(d).room;
		e && t && !Mn(t, o.now()).some((t) => t.message.id === e.id) && (w = null, D("dismiss"), d.update((e) => ({
			...e,
			dismissId: null,
			dismissPhase: "idle",
			dismissError: ""
		})));
	}
	function L(r = !1) {
		if (!O()) return Promise.resolve();
		if (S && !r) return S;
		r && (y++, s.cancel(), S = null);
		let i = ++y;
		d.update((e) => ({
			...e,
			loading: !0,
			readError: ""
		}));
		let c = s.run((r) => Ct(n, e, r, g, () => n.room(t, r)), Pn).then((n) => {
			if (!O() || i !== y) return;
			h = !1, g = !1, j.authorize(!0);
			let r = X(d), s = An(r.data, e, o.now()), c = An(n, e, o.now());
			s.on && !s.around && c.around && P("listeningFeedback", 5e3), d.update((e) => ({
				...e,
				data: n,
				loading: !1,
				readError: ""
			})), a.onData?.(n), l.probe(t, r.room?.book.title ?? "", r.pane && n.claude_on);
		}, (e) => {
			if (!O() || i !== y) return;
			let t = e instanceof Et && [401, 403].includes(e.status);
			t && (z(st(e)), st(e) && a.onUnauthorized?.()), d.update((e) => ({
				...e,
				loading: !1,
				readError: t ? "denied" : "read-failed"
			}));
		}).finally(() => {
			i === y && (S = null);
		});
		return S = c, c;
	}
	let R = r.state.subscribe((e) => {
		if (!f) return;
		let t = e.grants === null ? null : !!e.grants.agents.length, n = X(d).hasAgent;
		n === !1 && t === !0 && p && P("setupFeedback", 6e3), n !== t && d.update((e) => ({
			...e,
			hasAgent: t
		}));
	});
	function z(e = !1) {
		h = !0, g ||= e, y++, s.cancel(), S = null, b++, C = null, c.cancel(), x++, w = null;
		for (let e of [
			"clock",
			"dismiss",
			"setupFeedback",
			"listeningFeedback"
		]) D(e);
		l.cancel(), M.close(void 0, !1), j.deny(e), j.visible(!1), d.update((e) => ({
			...e,
			room: null,
			waits: [],
			data: null,
			loading: !1,
			readError: "denied",
			togglePhase: "idle",
			dismissPhase: "idle",
			dismissId: null,
			hasAgent: null,
			welcome: !1,
			setupFeedback: !1,
			listeningFeedback: !1
		})), a.onData?.(null);
	}
	return {
		account: e,
		roomId: t,
		state: d,
		runner: l,
		sandboxes: j,
		credentials: i,
		terminal: M,
		current: k,
		deny: z,
		refresh: L,
		sync(n, i, o, s, c = !0) {
			if (!f || n.id !== t || n.me !== e) return;
			let u = !p, g = _, v = X(d);
			if (p = !0, m = c, _ = n.members.includes(e), (v.room !== n || v.thread !== i || v.waits !== o || v.pane !== s) && d.update((e) => ({
				...e,
				room: h || !_ ? null : n,
				thread: i,
				waits: h || !_ ? [] : o,
				pane: s
			})), j.authorize(n.members.includes(e) && !h), j.visible(k() && s && m), I(), u) {
				T?.(), T = r.watch(), L();
				try {
					let t = `vb.welcomed.${e}`;
					n.book.owner && n.book.owner !== e && a.storage && !a.storage.getItem(t) && (a.storage.setItem(t, "1"), d.update((e) => ({
						...e,
						welcome: !0
					})));
				} catch {}
			}
			k() ? (m ? E.has("clock") || F() : (D("clock"), l.cancel()), s && v.pane !== s && l.probe(t, n.book.title, !!X(d).data?.claude_on)) : (M.close(void 0, !1), l.cancel(), D("clock"), !_ && (!h || v.room || v.data) ? z() : _ && !g && !u && L(!0));
		},
		async toggle() {
			let e = X(d);
			if (!A() || !e.data || C) return;
			let r = {
				wanted: !e.data.claude_on,
				ticket: ++b
			};
			C = r, d.update((e) => ({
				...e,
				togglePhase: "pending",
				toggleError: "",
				...r.wanted ? { askedAt: o.now() } : {}
			}));
			try {
				let e = await c.run((e) => {
					if (!k()) throw new Et("offline");
					return n.toggle(t, r.wanted, e);
				}, Pn);
				if (!f || C !== r || r.ticket !== b) return;
				C = null, d.update((t) => ({
					...t,
					data: t.data ? {
						...t.data,
						claude_on: e.claude_on
					} : null,
					togglePhase: "idle",
					toggleError: ""
				})), a.onChanged?.(), p && await L(!0);
			} catch (e) {
				if (!f || C !== r || r.ticket !== b) return;
				if (st(e)) {
					z(!0), a.onUnauthorized?.();
					return;
				}
				if (e instanceof Et && e.status === 403) {
					z();
					return;
				}
				let t = e instanceof Et && ([
					400,
					401,
					403,
					429
				].includes(e.status) || e.message === "offline");
				t && (C = null), d.update((e) => ({
					...e,
					togglePhase: t ? "error" : "unconfirmed",
					toggleError: t ? "toggle-failed" : "unconfirmed"
				})), !t && p && await L(!0);
			}
		},
		reviewToggle() {
			f && X(d).togglePhase === "unconfirmed" && (b++, C = null, c.cancel(), d.update((e) => ({
				...e,
				togglePhase: "idle",
				toggleError: ""
			})));
		},
		async dismiss(e) {
			let t = X(d).room;
			if (!A() || !t || !v || w || !Mn(t, o.now()).some((t) => t.message.id === e)) return;
			let n = {
				id: e,
				ticket: ++x
			}, r = v;
			w = n, d.update((t) => ({
				...t,
				dismissId: e,
				dismissPhase: "pending",
				dismissError: ""
			}));
			try {
				let t = await Promise.resolve().then(() => k() ? r({
					t: "ack.dismiss",
					id: e
				}) : {
					ok: !1,
					error: "offline"
				});
				if (!f || w !== n || n.ticket !== x) return;
				if (!t.ok) {
					let e = t.error === "offline" || t.error === "invalid command";
					e && (w = null), d.update((t) => ({
						...t,
						dismissPhase: e ? "error" : "unconfirmed",
						dismissError: e ? "dismiss-failed" : "unconfirmed"
					}));
					return;
				}
				I(), w === n && E.set("dismiss", o.schedule(() => {
					E.delete("dismiss"), f && w === n && d.update((e) => ({
						...e,
						dismissPhase: "unconfirmed",
						dismissError: "unconfirmed"
					}));
				}, 1e4));
			} catch {
				f && w === n && d.update((e) => ({
					...e,
					dismissPhase: "unconfirmed",
					dismissError: "unconfirmed"
				}));
			}
		},
		reviewDismiss() {
			f && X(d).dismissPhase === "unconfirmed" && (x++, w = null, D("dismiss"), d.update((e) => ({
				...e,
				dismissId: null,
				dismissPhase: "idle",
				dismissError: ""
			})));
		},
		setRequest(e) {
			f && (v = e);
		},
		dismissBanner(e) {
			if (!k()) return;
			let n = e === "setup" ? "vb.setupOff" : e === "offer" ? "vb.claudeBar.off" : `vb.start.${t}`;
			try {
				a.storage?.setItem(n, e === "setup" ? "1" : "off");
			} catch {}
			d.update((t) => ({
				...t,
				[e === "setup" ? "setupDismissed" : e === "offer" ? "offerDismissed" : "startDismissed"]: !0
			}));
		},
		closeWelcome() {
			f && d.update((e) => ({
				...e,
				welcome: !1
			}));
		},
		hasPending() {
			return !!C || !!w || ["pending", "unconfirmed"].includes(X(j.state).phase);
		},
		detach() {
			p = !1, m = !1, v = void 0, y++, s.cancel(), S = null, l.cancel(), M.close(void 0, !1), j.visible(!1), T?.(), T = null;
			for (let e of [
				"clock",
				"setupFeedback",
				"listeningFeedback"
			]) D(e);
			d.update((e) => ({
				...e,
				room: null,
				waits: [],
				pane: !1,
				data: null,
				loading: !1,
				setupFeedback: !1,
				listeningFeedback: !1,
				welcome: !1
			}));
		},
		dispose() {
			f = !1, p = !1, v = void 0, y++, b++, x++, s.cancel(), c.cancel(), l.dispose(), M.dispose(), j.dispose(), N(), T?.(), R();
			for (let e of E.values()) o.cancel(e);
			E.clear(), C = null, w = null, d.update((e) => ({
				...e,
				room: null,
				waits: [],
				data: null,
				loading: !1,
				welcome: !1,
				togglePhase: "idle",
				dismissPhase: "idle"
			}));
		}
	};
}
// svelte/features/sandboxes/credentials.ts
var Wu = () => ({
	connected: null,
	claude: null,
	phase: "idle",
	action: null,
	error: "",
	notice: ""
});
function Gu(e, t, n = {}) {
	let r = n.clock ?? dt, i = at(r), a = K(Wu()), o = !0, s = !1, c = 0, l = null, u = null;
	function d() {
		u !== null && r.cancel(u), u = null;
	}
	function f() {
		if (!l) return;
		let e = X(a), t = l.kind.startsWith("remove-"), n = l.kind.endsWith("key") ? e.connected : e.claude;
		if (!l.ack || n === null || t && n || !t && !n) return;
		let r = l.ack ? t ? "removed" : "saved" : "current";
		l = null, d(), a.update((e) => ({
			...e,
			phase: "idle",
			action: null,
			error: "",
			notice: r
		}));
	}
	function p() {
		s = !0, c++, l = null, d(), i.cancel(), a.set(Wu());
	}
	return {
		account: e,
		state: a,
		deny: p,
		authorize() {
			o && (s = !1);
		},
		current: () => o && !s,
		sync(e, t) {
			o && (a.update((n) => n.connected === e && n.claude === t ? n : {
				...n,
				connected: e,
				claude: t
			}), f());
		},
		async write(e, d = "") {
			if (!o || s || l) return;
			let m = {
				kind: e,
				ack: !1,
				ticket: ++c
			};
			l = m, a.update((t) => ({
				...t,
				phase: "pending",
				action: e,
				error: "",
				notice: ""
			}));
			try {
				if (await i.run((n) => e === "key" ? t.saveKey(d, n) : e === "token" ? t.saveToken(d, n) : e === "remove-key" ? t.removeKey(n) : t.removeToken(n), Pn), !o || l !== m || c !== m.ticket) return;
				m.ack = !0, n.onChanged?.(), f(), l === m && (u = r.schedule(() => {
					u = null, o && l === m && a.update((e) => ({
						...e,
						phase: "unconfirmed",
						error: "unconfirmed"
					}));
				}, 1e4));
			} catch (e) {
				if (!o || l !== m || c !== m.ticket) return;
				if (st(e)) {
					p(), n.onUnauthorized?.();
					return;
				}
				let t = e instanceof Et && [
					400,
					401,
					403,
					429
				].includes(e.status);
				t && (l = null), a.update((e) => ({
					...e,
					phase: t ? "error" : "unconfirmed",
					error: t ? "credential-refused" : "unconfirmed"
				})), t || n.onChanged?.();
			}
		},
		review() {
			o && X(a).phase === "unconfirmed" && (c++, l = null, d(), i.cancel(), a.update((e) => ({
				...e,
				phase: "idle",
				action: null,
				error: "",
				notice: ""
			})));
		},
		dispose() {
			o = !1, c++, l = null, d(), i.cancel(), a.set(Wu());
		}
	};
}
// svelte/features/agents/service.ts
function Ku(e) {
	let t = e.api ?? Tt(), n = e.clock ?? dt, r = "", i = !0, a = !1, o = null, s = /* @__PURE__ */ new Map(), c = null, l = /* @__PURE__ */ new Map(), u = null, d = null;
	function f() {
		for (let e of l.values()) n.cancel(e);
		l.clear();
		for (let e of s.values()) e.dispose();
		s.clear(), o = null, c = null, u?.dispose(), d?.dispose(), u = d = null, r = "", a = !1;
	}
	function p(t) {
		if (!i || !r) return;
		let a = t ?? o?.roomId;
		if (a && s.has(a)) {
			let e = l.get(a);
			e !== void 0 && n.cancel(e), l.set(a, n.schedule(() => {
				l.delete(a);
				let e = s.get(a);
				i && e?.current() && e.refresh(!0);
			}, 600));
		}
		e.onChanged?.();
	}
	function m() {
		a = !0, u?.deny(), d?.deny();
		for (let e of s.values()) e.deny(!0);
		e.onChanged?.(), e.onUnauthorized?.();
	}
	function h(a) {
		if (!u || !d) throw Error("Agent account unavailable");
		return Uu(r, a, t, u, d, {
			origin: e.origin,
			clock: n,
			storage: e.storage,
			runnerFetch: e.runnerFetch,
			allowMutation: () => s.size <= 32,
			onUnauthorized: m,
			onData: (t) => {
				i && o?.roomId === a && e.onData?.(a, t);
			},
			onChanged: () => e.onChanged?.()
		});
	}
	function g(e) {
		i && r !== e && (f(), r = e, u = Bu(e, {
			api: t,
			clock: n,
			onUnauthorized: m,
			onIdentityProved: () => {
				a = !1;
			},
			onChanged: () => p()
		}), d = Gu(e, t, {
			clock: n,
			onUnauthorized: m,
			onChanged: () => {
				i && o?.current() && (o.sandboxes.refresh(!0), p());
			}
		}));
	}
	function _() {
		if (i) {
			c = null, o?.detach(), o = null;
			for (let [e, t] of s) t.hasPending() || (t.dispose(), s.delete(e));
		}
	}
	return {
		identity: g,
		invalidate: p,
		refreshAccount() {
			return i && u ? u.refresh(!0) : Promise.resolve();
		},
		account(e) {
			return g(e), u;
		},
		sync(e, t, n, r, c, l) {
			if (!i || !e.me) return null;
			g(e.me);
			let f = s.get(e.id);
			o && o !== f && o.detach();
			for (let [e, t] of s) t !== f && !t.hasPending() && (t.dispose(), s.delete(e));
			if (!f) {
				if (!u || !d) return null;
				f = h(e.id), a && f.deny(!0), s.set(e.id, f);
			}
			return o = f, f.setRequest(l), f.sync(e, t, n, r, c), f;
		},
		claimAttachment() {
			let e = {};
			return c = e, () => {
				c === e && _();
			};
		},
		detach: _,
		reset: f,
		dispose() {
			f(), i = !1;
		}
	};
}
// svelte/features/app-navigation/router.ts
var qu = (e) => e.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1] ?? null;
function Ju(e) {
	let t = new URL(e), n = qu(t.pathname);
	if (t.pathname === "/app" || t.pathname === "/") return { kind: "home" };
	if (t.pathname === "/archived") return { kind: "archived" };
	if (n) {
		let e = /^#m(\d+)$/.exec(t.hash)?.[1], r = /^#f([a-z0-9]+)$/.exec(t.hash)?.[1], i = /^#doc(?::([\w-]+))?$/.exec(t.hash), a = /^#e([\w-]+)$/.exec(t.hash)?.[1], o = Sn(t.hash);
		return {
			kind: "room",
			target: {
				roomId: n,
				thread: t.searchParams.get("t") ?? a ?? i?.[1] ?? "main",
				messageId: Ie(e),
				fileId: r,
				document: !!i,
				...o ? { app: o } : {}
			}
		};
	}
	return {
		kind: "document",
		url: e
	};
}
function Yu(e) {
	let t = 0, n = !0;
	function r(i, a = !1, o) {
		if (!n) return;
		let s = typeof i == "string" ? i : Ve(i);
		if (e.deferNavigation?.(() => r(s, a, o))) return;
		let c = typeof s == "string" ? s : Le(s), l = new URL(c, e.current());
		if (l.origin !== new URL(e.current()).origin) {
			e.document(l.href);
			return;
		}
		let u = rr(l, e.current(), "svelte"), d = Ju(new URL(u, e.current()).href), f = d.kind === "room" && o ? {
			...d,
			target: {
				...d.target,
				thread: o
			}
		} : d;
		t++, f.kind === "document" ? e.document(u) : (e.beforeChange(), e.history[a ? "replaceState" : "pushState"](null, "", u), f.kind === "room" && e.sameRoom(f.target) || e.activate(f));
	}
	return {
		go: r,
		canonicalizeLegacyThread(t, r) {
			if (!n) return !1;
			let i = new URL(e.current());
			if (qu(i.pathname) !== t || i.searchParams.has("t")) return !1;
			let a = /^#e([\w-]+)$/.exec(i.hash)?.[1], o = /^#doc:([\w-]+)$/.exec(i.hash)?.[1];
			return (a ?? o) === r && (r !== "main" && i.searchParams.set("t", r), i.hash = o ? "#doc" : "", e.history.replaceState(null, "", i.pathname + i.search + i.hash), !0);
		},
		pop() {
			if (!n || e.consumePop()) return;
			t++, e.beforeChange();
			let r = Ju(e.current());
			r.kind === "room" && e.sameRoom(r.target) || e.activate(r);
		},
		generation: () => t,
		dispose() {
			n = !1, t++;
		}
	};
}
// svelte/features/app-navigation/search.ts
function Xu(e, t, n = We) {
	let r = K({
		open: !1,
		query: "",
		selected: 0,
		result: null,
		loading: !1,
		error: ""
	}), i = Ge(n), a = null, o = !0, s = () => {
		a !== null && n.cancel(a), a = null, i.cancel();
	}, c = X(e.state).identityRevision, l = e.state.subscribe((e) => {
		e.identityRevision !== c && (c = e.identityRevision, s(), i.dispose(), r.set({
			open: !1,
			query: "",
			selected: 0,
			result: null,
			loading: !1,
			error: ""
		}));
	}), u = () => {
		let t = X(r), n = X(e.state).me;
		return [
			...Pe(n?.books ?? [], t.query).map((e) => ({ roomId: e.id })),
			...(t.result?.epics ?? []).map(ze),
			...(t.result?.messages ?? []).map(Me)
		];
	};
	return {
		state: r,
		targets: u,
		open() {
			o && (s(), i.dispose(), i = Ge(n), r.set({
				open: !0,
				query: "",
				selected: 0,
				result: null,
				loading: !1,
				error: ""
			}));
		},
		close() {
			s(), i.dispose(), r.update((e) => ({
				...e,
				open: !1,
				loading: !1
			}));
		},
		edit(t) {
			if (!o || !X(r).open) return;
			s(), r.update((e) => ({
				...e,
				query: t,
				selected: 0,
				result: null,
				loading: t.trim().length >= 2,
				error: ""
			}));
			let c = t.trim();
			c.length < 2 || (a = n.schedule(() => {
				a = null, i.run((t) => e.api.search(c, t), (e) => r.update((t) => ({
					...t,
					result: e,
					loading: !1,
					selected: 0
				})), (e) => r.update((t) => ({
					...t,
					loading: !1,
					error: e instanceof Error ? e.message : "network"
				})));
			}, 250));
		},
		move(e) {
			let t = u().length;
			t && r.update((n) => ({
				...n,
				selected: (n.selected + e + t) % t
			}));
		},
		select(e) {
			e >= 0 && e < u().length && r.update((t) => ({
				...t,
				selected: e
			}));
		},
		activateTarget(e) {
			o && X(r).open && u().some((t) => Le(t) === Le(e)) && (this.close(), t(e));
		},
		activate(e = X(r).selected) {
			let t = u()[e];
			t && this.activateTarget(t);
		},
		dispose() {
			l(), o = !1, s(), i.dispose();
		}
	};
}
// svelte/features/app-navigation/controller.ts
function Zu(e, t, n, r = We) {
	let i = K({
		roomId: null,
		settingsId: null,
		archiveId: null,
		renameId: null,
		renameDraft: "",
		renameBusy: !1,
		renameError: "",
		renameSubmitted: !1
	}), a = ir(e, n.navigate, r), o = Xu(e, n.navigate, r), s = null, c = !0, l = "", u = () => i.update((e) => ({
		...e,
		settingsId: null,
		archiveId: null,
		renameId: null,
		renameBusy: !1,
		renameError: "",
		renameDraft: "",
		renameSubmitted: !1
	})), d = X(e.state).identityRevision, f = e.state.subscribe((e) => {
		e.identityRevision !== d && (d = e.identityRevision, s = null, o.close(), a.close(), u());
	});
	return {
		personal: e,
		rooms: t,
		state: i,
		creator: a,
		search: o,
		callbacks: n,
		syncPath(e) {
			if (!c) return;
			let t = new URL(e);
			l !== t.pathname + t.search && (l = t.pathname + t.search, o.close(), a.close(), u()), i.update((e) => ({
				...e,
				roomId: qu(t.pathname)
			}));
		},
		openSearch(e) {
			s = e ?? null, o.open();
		},
		openCreate(e) {
			s = e ?? null, a.open();
		},
		openSettings(t, n) {
			X(e.state).me?.books.some((e) => e.id === t) && (s = n ?? null, i.update((e) => ({
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
			let e = X(i).archiveId;
			e && t.archive(e);
		},
		move(n, r) {
			let i = Re(X(e.state).me?.books ?? []).map((e) => e.id), a = i.indexOf(n), o = a + r;
			a < 0 || o < 0 || o >= i.length || (i.splice(a, 1), i.splice(o, 0, n), t.order(i));
		},
		drop(n, r, i) {
			let a = Re(X(e.state).me?.books ?? []).map((e) => e.id);
			if (n === r || !a.includes(n) || !a.includes(r)) return;
			let o = a.filter((e) => e !== n);
			o.splice(o.indexOf(r) + +!!i, 0, n), t.order(o);
		},
		askRename(t) {
			let r = X(e.state).me?.books.find((e) => e.id === t);
			r && X(i).roomId === t && n.rename && i.update((e) => ({
				...e,
				settingsId: null,
				renameId: t,
				renameDraft: r.title ?? "",
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
			let e = X(i);
			if (!c || e.renameBusy || !e.renameId || e.roomId !== e.renameId || !n.rename || !e.renameDraft.trim()) return;
			let r = e.renameId, a = e.renameDraft.trim().slice(0, 120);
			i.update((e) => ({
				...e,
				renameBusy: !0,
				renameError: "",
				renameSubmitted: !0
			}));
			try {
				await t.rename(r, a, () => n.rename(r, a));
			} catch {}
			c && X(i).renameId === r && i.update((e) => ({
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
// svelte/roomConnection.ts
var Qu = 1e4;
function $u(e) {
	let t = e.schedule ?? setTimeout, n = e.cancel ?? clearTimeout, r = e.createSocket ?? ((e) => new WebSocket(e)), i = null, a, o, s = !1, c = !1, l = 0, u = "", d = /* @__PURE__ */ new Map(), f = Math.random().toString(36).slice(2, 8), p = 0, m = (e, t) => {
		let r = d.get(e);
		r && (d.delete(e), n(r.timer), r.done(t));
	}, h = (e) => {
		for (let t of [...d.keys()]) m(t, {
			ok: !1,
			error: e
		});
	}, g = () => {
		a !== void 0 && n(a), o !== void 0 && n(o), a = o = void 0;
	}, _ = () => {
		s = !0, g(), h("disconnected");
		let e = i;
		i = null, e && (e.onopen = e.onmessage = e.onclose = null, e.close());
	}, v = () => {
		if (s) return;
		a = void 0;
		let n = r(e.url(u));
		i = n;
		let d = () => !s && i === n;
		n.onopen = () => {
			d() && (o = t(() => {
				d() && (o = void 0, n.readyState === 1 && (l = 0));
			}, 15e3));
		}, n.onmessage = (t) => {
			if (!d()) return;
			let n = ge(t.data);
			n.t === "result" ? m(n.cid, n.ok ? { ok: !0 } : {
				ok: !1,
				error: n.error
			}) : (n.t === "state" && (c = !0), e.onEvent(n));
		}, n.onclose = (r) => {
			d() && (i = null, g(), h("disconnected"), n.onopen = n.onmessage = n.onclose = null, r.code === 4003 ? (_(), e.onRemoved()) : !c && r.code !== 1e3 ? (_(), e.onUnavailable()) : (u = String(r.code || ""), a = t(v, Math.min(3e4, 1e3 * 2 ** l++))));
		};
	};
	return {
		start() {
			!i && a === void 0 && !s && v();
		},
		dispose: _,
		send(e) {
			return _e(i, e);
		},
		request(e, n = Qu) {
			let r = `${f}-${++p}`;
			return new Promise((a) => {
				if (!_e(i, e, r)) return a({
					ok: !1,
					error: "offline"
				});
				d.set(r, {
					done: a,
					timer: t(() => m(r, {
						ok: !1,
						error: "timeout"
					}), n)
				});
			});
		},
		resync() {
			i?.close();
		}
	};
}
// svelte/roomStore.ts
function ed(e, t, n) {
	if (t.t === "state") return {
		...t,
		id: n,
		typing: {}
	};
	if (!e || e.id !== n) return e;
	let r = e, i = (e, t) => r.messages.map((n) => n.id === e ? {
		...n,
		...t
	} : n);
	switch (t.t) {
		case "msg": return {
			...r,
			messages: r.messages.some((e) => e.id === t.m.id) ? r.messages : [...r.messages, t.m]
		};
		case "moved": return {
			...r,
			messages: i(t.id, { thread: t.thread })
		};
		case "closed": return {
			...r,
			messages: i(t.id, { choices: t.choices })
		};
		case "delta": {
			let e = { ...r.typing };
			return delete e[t.id], {
				...r,
				messages: i(t.id, { text: t.text }),
				typing: e
			};
		}
		case "typing": return {
			...r,
			typing: {
				...r.typing,
				[t.id]: t.mode
			}
		};
		case "epics": return {
			...r,
			epics: t.epics,
			roomTasks: t.roomTasks ?? r.roomTasks
		};
		case "epicsPatch": {
			let e = new Map(r.epics.map((e) => [e.id, e]));
			return t.changed.forEach((t) => e.set(t.id, t)), t.order.some((t) => !e.has(t)) ? r : {
				...r,
				epics: t.order.map((t) => e.get(t)),
				roomTasks: t.roomTasks ?? r.roomTasks
			};
		}
		case "docNotes": return {
			...r,
			docNotes: t.notes
		};
		case "doc": {
			let e = { ...r.docs };
			return t.stale ? (t.epic && delete e[t.epic], {
				...r,
				docs: e
			}) : t.epic ? {
				...r,
				docs: {
					...e,
					[t.epic]: t.text ?? ""
				}
			} : {
				...r,
				doc: t.text ?? ""
			};
		}
		case "meta": return {
			...r,
			book: {
				...r.book,
				...t.title ? { title: t.title } : {},
				...t.folder ? { folder: t.folder } : {},
				...t.summary ? { summary: t.summary } : {}
			}
		};
		case "suggestions": return {
			...r,
			suggestions: t.suggestions
		};
		case "requests": return {
			...r,
			requests: t.requests
		};
		case "members": return {
			...r,
			members: t.members,
			pending: t.pending,
			requests: t.requests ?? r.requests,
			names: t.names ?? r.names,
			avatars: t.avatars ?? r.avatars
		};
		case "files": return {
			...r,
			files: t.files,
			filesN: t.files.length,
			filesAll: !0
		};
		case "fileAdd": return {
			...r,
			files: [t.file, ...(r.files ?? []).filter((e) => e.id !== t.file.id)],
			filesN: (r.filesN ?? r.files?.length ?? 0) + +!(r.files ?? []).some((e) => e.id === t.file.id)
		};
		case "reminders": return {
			...r,
			reminders: t.reminders
		};
		case "decisions": return {
			...r,
			decisions: t.decisions
		};
		case "pins": return {
			...r,
			pins: t.pins
		};
		case "receipts": return {
			...r,
			receipts: t.receipts
		};
		case "older": {
			let e = new Map(r.messages.map((e) => [e.id, e]));
			return t.messages.forEach((t) => {
				e.has(t.id) || e.set(t.id, t);
			}), {
				...r,
				messages: [...e.values()].sort((e, t) => e.id - t.id)
			};
		}
		case "acks": return {
			...r,
			acks: t.acks
		};
		case "ackRows": {
			let e = (e) => `${e.msg_id}|${e.agent ?? e.email}`, n = new Set(t.acks.map(e));
			return {
				...r,
				acks: [...t.acks, ...(r.acks ?? []).filter((t) => !n.has(e(t)))]
			};
		}
		case "poll": return {
			...r,
			polls: {
				...r.polls,
				[t.poll.id]: t.poll
			}
		};
		case "online": return {
			...r,
			online: t.online
		};
		default: return r;
	}
}
// svelte/features/root-room/session.ts
function td(e) {
	let t = (e) => ({
		roomId: null,
		room: null,
		thread: "main",
		phase: "idle",
		generation: e,
		snapshotGeneration: 0,
		connection: null,
		typingNotes: /* @__PURE__ */ new Map()
	}), n = K(t(0)), r = /* @__PURE__ */ new Map(), i = !0, a = 0, o = null, s = () => X(n), c = (e, t) => i && e === a && s().connection === t;
	function l() {
		let e = s().connection;
		a++, n.set(t(a)), e?.dispose();
	}
	function u(o, l, u) {
		if (!c(o, l)) return;
		let d = s();
		d.roomId && r.delete(d.roomId), a++;
		let f = {
			...t(a),
			roomId: d.roomId,
			phase: u
		};
		n.set(f), l.dispose(), i && a === f.generation && s() === f && e.onTerminal(f);
	}
	function d(t, i, a, l) {
		if (!c(a, l)) return;
		let d = s(), f = d.room;
		if (t.t === "epicsPatch" && f) {
			let e = /* @__PURE__ */ new Set([...f.epics.map((e) => e.id), ...t.changed.map((e) => e.id)]);
			if (t.order.some((t) => !e.has(t))) {
				l.resync();
				return;
			}
		}
		if (t.t === "state") {
			if (e.acceptIdentity(t.me) || !c(a, l)) return;
			o !== null && o !== t.me && r.clear(), o = t.me;
		}
		let p = ed(f, t, i);
		if (!p) {
			t.t === "error" && e.onTransition({
				event: t,
				previous: f,
				snapshot: d
			});
			return;
		}
		if ((t.t === "state" || t.t === "members") && !p.members.includes(p.me)) {
			u(a, l, "removed");
			return;
		}
		let m = new Map(d.typingNotes);
		t.t === "state" ? m.clear() : t.t === "delta" ? m.delete(t.id) : t.t === "typing" && (t.note ? m.set(t.id, t.note) : m.delete(t.id));
		let h = {
			...d,
			room: p,
			thread: e.thread?.() ?? d.thread,
			phase: t.t === "state" ? "live" : d.phase,
			snapshotGeneration: d.snapshotGeneration + +(t.t === "state"),
			typingNotes: m
		};
		for (t.t === "state" && r.delete(i), p.members.includes(p.me) && (e.cacheAllowed?.(p) ?? !0) ? r.set(i, p) : r.delete(i); r.size > 12;) {
			let e = r.keys().next();
			if (e.done) break;
			r.delete(e.value);
		}
		n.set(h), c(a, l) && e.onTransition({
			event: t,
			previous: f,
			snapshot: h
		});
	}
	return {
		state: n,
		read: s,
		cache: {
			delete: (e) => r.delete(e),
			clear: () => r.clear()
		},
		open(f, p = "main") {
			if (!i) return;
			let m = a + 1;
			if (l(), !i || a !== m) return;
			let h = a, g = r.get(f), _ = g && g.members.includes(g.me) && (o === null || g.me === o) ? g : null, v = _ && p !== "main" && !p.startsWith("pre:") && !_.epics.some((e) => e.id === p) ? "main" : p, y = (e.connection ?? $u)({
				url: (t) => {
					let n = e.thread?.() ?? s().thread;
					return e.url(f, n.startsWith("pre:") ? "main" : n, t);
				},
				onEvent: (e) => d(e, f, h, y),
				onRemoved: () => u(h, y, "removed"),
				onUnavailable: () => u(h, y, "unavailable")
			}), b = {
				...t(h),
				roomId: f,
				room: _,
				thread: v,
				phase: _ ? "cached" : "loading",
				connection: y
			};
			n.set(b), c(h, y) && e.onOpen(b), c(h, y) && y.start();
		},
		selectThread(e) {
			i && n.update((t) => ({
				...t,
				thread: e
			}));
		},
		send(e) {
			return i ? s().connection?.send(e) ?? !1 : !1;
		},
		request(e, t) {
			let n = s().connection, r = a;
			return !i || !n ? Promise.resolve({
				ok: !1,
				error: "offline"
			}) : n.request(e, t).then((e) => c(r, n) ? e : {
				ok: !1,
				error: "disconnected"
			});
		},
		resync() {
			i && s().connection?.resync();
		},
		leave: l,
		resetAccount() {
			r.clear(), o = null, l();
		},
		dispose() {
			i && (i = !1, l(), r.clear(), o = null);
		}
	};
}
// shared/person.ts
var nd = {
	me: me({
		t: fe("me"),
		book: le(pe()),
		msg: le(fe(1))
	}),
	agents: me({
		t: fe("agents"),
		book: pe()
	})
}, rd = ue("t", [nd.me, nd.agents]);
function id(e) {
	if (typeof e != "string") return null;
	try {
		let t = JSON.parse(e), n = rd.safeParse(t);
		return n.success ? n.data : null;
	} catch {
		return null;
	}
}
// svelte/features/home/connection.ts
function ad(e) {
	let t = id(e);
	return t?.t === "me" ? {
		kind: "account",
		book: t.book,
		message: t.msg === 1
	} : t?.t === "agents" ? {
		kind: "agents",
		book: t.book
	} : null;
}
function od(e) {
	let t = e.clock ?? We, n = e.createSocket ?? ((e) => new WebSocket(e)), r = !0, i = !1, a = null, o = null, s = null, c = 0, l = () => {}, u = (e) => {
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
				n = (e.decode ?? ad)(t.data);
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
// svelte/features/application/personal-channel.ts
function sd(e) {
	let t = e.clock ?? We, n = !0, r = !1, i = 0, a = 0, o = {
		account: null,
		revision: 0
	}, s = null, c = null, l = 0, u = () => {};
	function d() {
		a++, l++, c !== null && t.cancel(c), c = null;
	}
	function f(u) {
		let f = ++i;
		d(), o = { ...u };
		let p = o, m = s;
		if (s = null, m?.dispose(), !n || !r || !p.account || f !== i) return;
		let h = () => n && f === i && o === p, g = () => {
			let t = e.room();
			return t?.account === p.account ? t : null;
		}, _ = (e, t) => {
			if (!h() || t !== a) return !1;
			let n = g();
			return n?.roomId === e.roomId && n.connection === e.connection;
		};
		function v(t) {
			h() && (e.personal.invalidate(), h() && (e.personal.refresh(), h() && (e.personal.refreshAgents(), h() && (t && e.agents.refreshAccount(), h() && g() && e.refreshRoom()))));
		}
		let y = (e.connection ?? od)({
			url: e.url,
			visible: e.visible,
			listenVisibility: e.listenVisibility,
			clock: t,
			currentRoom: () => h() ? e.currentRoom() : null,
			onAccount() {
				h() && e.personal.observe({ kind: "account" });
			},
			onAgents(n) {
				if (!h() || (e.personal.observe({
					kind: "agents",
					book: n
				}), !h())) return;
				let r = g();
				if (!r || n !== "*" && n !== r.roomId) return;
				d();
				let i = l, o = a, s = { ...r };
				c = t.schedule(() => {
					i === l && _(s, o) && (c = null, e.refreshRoom(), _(s, o) && e.agents.refreshAccount());
				}, 600);
			},
			onConnected: () => v(!0),
			onVisible: () => v(!1)
		});
		h() ? (s = y, y.start()) : y.dispose();
	}
	return {
		start() {
			if (!n || r) return;
			r = !0;
			let t = e.listenIdentity((e) => {
				n && (o.account !== e.account || o.revision !== e.revision) && f(e);
			});
			n ? u = t : t();
		},
		restart() {
			n && r && f(o);
		},
		resetIdentity() {
			n && f({
				account: null,
				revision: o.revision
			});
		},
		routeChanged: d,
		dispose() {
			n && (n = !1, i++, d(), u(), s?.dispose(), s = null);
		}
	};
}
// svelte/features/application/services.ts
function cd(e) {
	let t = e.browser, n = K({
		route: Ju(t.href()),
		href: t.href(),
		navigationGeneration: 0,
		pane: "doc",
		availableVersion: null,
		sessionDenied: !1,
		lifecycle: "idle"
	}), r = !0, i = !1, a = 0, o = !1, s = !1, c = !1, l = null, u = null, d = null, f = null, p = e.pwa(), m = 0, h = ju(e.homeApi ?? gr(), {
		clock: t.clock,
		onVersion(e) {
			if (!r) return;
			let i = t.shellVersion, a = !!e && !!i && i !== "development" && e !== "development" && i !== e;
			h.updateAvailable(a), r && n.update((t) => ({
				...t,
				availableVersion: a ? e : null
			}));
		},
		onUnauthorized: U,
		onIdentityChange: z
	}), g = Mu(h, t.clock), _ = Iu(h, e.accountApi ?? Fu(), t.clock), v = Ku({
		origin: t.origin,
		api: e.agentsApi,
		clock: t.clock,
		storage: t.storage,
		runnerFetch: e.runnerFetch,
		onUnauthorized: U
	}), y = td({
		url: (e, n, r) => t.socketUrl(`/ws/${e}?t=${encodeURIComponent(n)}${r ? `&rc=${encodeURIComponent(r)}` : ""}`),
		connection: e.roomConnection,
		acceptIdentity: (e) => h.acceptIdentity(e),
		cacheAllowed: (e) => !s && !(f && f.scope.roomId === e.id && f.scope.account === e.me && f.scope.connection === y.read().connection && f.owner.denied()),
		onOpen(e) {
			d?.target.roomId === e.roomId && (d.roomGeneration = e.generation, d.account = e.room?.me ?? null), F();
		},
		onTransition(e) {
			let t = e.snapshot, n = t.room;
			n && O(t) && (p.account(n.me), O(t) && ((e.event.t === "state" || e.event.t === "meta") && h.roomMeta(n.id, {
				title: n.book.title,
				folder: n.book.folder,
				summary: n.book.summary
			}), O(t) && (e.event.t === "state" && n.messages.length && h.seen(n.id, n.messages.at(-1).id), e.event.t === "msg" && h.seen(n.id, e.event.m.id), O(t) && (j()?.adapter.onTransition(e), y.read() === t && r && F()))));
		},
		onTerminal(e) {
			d = null;
			let t = M();
			N(), v.detach(), t?.adapter.reset("terminal"), r && y.read() === e && t?.adapter.onTerminal(e);
		}
	}), b = Zu(h, g, {
		navigate: (e) => R(e),
		home: () => R("/app"),
		archived: () => R("/archived"),
		settings: (e) => B(e),
		rename: (e, t) => y.read().room?.id === e && D() === e ? y.request({
			t: "title",
			title: t
		}) : Promise.resolve({
			ok: !1,
			error: "offline"
		})
	}, t.clock), x = Yu({
		current: t.href,
		history: t.history,
		document: t.navigateDocument,
		beforeChange() {
			a++, S.routeChanged(), j()?.adapter.beforeNavigation(), _.close(), e.device?.cancel(), b.pageLeft();
		},
		consumePop: () => j()?.adapter.consumePop() ?? !1,
		deferNavigation: (e) => j()?.adapter.deferNavigation(e) ?? !1,
		sameRoom(e) {
			let t = y.read();
			return t.roomId !== e.roomId || !t.room || !t.connection ? !1 : (I(), P(e, t.generation, t.room.me), !0);
		},
		activate: L
	}), S = sd({
		personal: h,
		agents: v,
		clock: t.clock,
		connection: e.personalConnection,
		listenIdentity: (e) => h.state.subscribe((t) => e({
			account: t.me?.email ?? null,
			revision: t.identityRevision
		})),
		currentRoom: D,
		room: () => {
			let e = k();
			return e ? {
				roomId: e.roomId,
				account: e.account,
				connection: e.connection
			} : null;
		},
		refreshRoom: H,
		url: () => t.socketUrl("/ws-me"),
		visible: t.visible,
		listenVisibility: t.listenVisibility
	}), C = Ru({
		identity: () => Lu(h),
		beforeLogout: () => p.beforeLogout(),
		warning: t.logoutWarning,
		post: t.logoutPost,
		failure: t.logoutFailure,
		reload: t.reload,
		success: (e) => t.navigateDocument(e ? rr("/login", t.href(), "svelte") : "/")
	}), w = h.state.subscribe((e) => {
		r && (e.identityRevision !== m && z(), e.me && p.account(e.me.email));
	}), T = () => {}, E = () => {};
	function D() {
		return qu(new URL(t.href()).pathname);
	}
	function O(e) {
		let t = y.read();
		return r && !s && t.generation === e.generation && t.connection === e.connection && t.room?.id === e.room?.id && t.room?.me === e.room?.me;
	}
	function k() {
		let e = y.read(), t = e.room;
		return r && !s && t && e.connection && t.id === D() && t.members.includes(t.me) ? {
			roomId: t.id,
			account: t.me,
			identityRevision: X(h.state).identityRevision,
			roomGeneration: e.generation,
			navigationGeneration: x.generation(),
			connection: e.connection
		} : null;
	}
	function A(e) {
		let t = k();
		return !!t && t.roomId === e.roomId && t.account === e.account && t.identityRevision === e.identityRevision && t.roomGeneration === e.roomGeneration && t.connection === e.connection;
	}
	function j() {
		return u && A(u.scope) ? u : null;
	}
	function M() {
		let e = u;
		return u = null, e;
	}
	function N() {
		let e = f;
		f = null, e?.owner.dispose();
	}
	function P(e, t, n, r) {
		d = {
			target: Ve(e),
			navigation: x.generation(),
			roomGeneration: t,
			account: n,
			pane: r
		}, F();
	}
	function F() {
		let e = d, t = k(), n = j();
		if (!e || !t || !n || e.navigation !== x.generation() || e.target.roomId !== t.roomId || e.roomGeneration !== t.roomGeneration || e.account !== null && e.account !== t.account) return;
		d = null;
		let r = e.target.thread || "main", i = y.read().room, a = /^pre:(\d+)$/.exec(r), o = r === "main" || a && Number(a[1]) < i.suggestions.length || i.epics.some((e) => e.id === r) ? r : "main";
		r === o && x.canonicalizeLegacyThread(t.roomId, o) && (I(), !A(t) || j() !== n || t.navigationGeneration !== x.generation()) || (y.selectThread(o), A(t) && j() === n && t.navigationGeneration === x.generation() && n.adapter.onTarget({
			scope: t,
			target: {
				...e.target,
				thread: o
			},
			...r === o ? {} : { unavailableThread: r },
			...e.pane ? { pane: e.pane } : {}
		}));
	}
	function I() {
		let e = t.href();
		b.syncPath(e), n.update((t) => ({
			...t,
			href: e,
			route: Ju(e),
			navigationGeneration: x.generation()
		}));
	}
	function L(e = Ju(t.href())) {
		if (!r || s) return;
		let i = ++a;
		S.routeChanged(), d = null;
		let o = M();
		N(), v.detach(), o?.adapter.reset("navigation"), r && a === i && (y.leave(), r && a === i && (n.update((e) => ({
			...e,
			pane: "doc"
		})), I(), r && a === i && (e.kind === "document" ? t.navigateDocument(e.url) : e.kind === "room" && (d = {
			target: Ve(e.target),
			navigation: x.generation(),
			roomGeneration: null,
			account: null
		}, h.refresh(), y.open(e.target.roomId, e.target.thread || "main")))));
	}
	function R(e, t = !1, n) {
		r && i && !s && (o ? l = {
			value: typeof e == "string" ? e : Ve(e),
			replace: t,
			presentationThread: n
		} : x.go(e, t, n));
	}
	function z() {
		let n = X(h.state).identityRevision;
		if (!r || n === m) return;
		m = n, o = !0;
		let c = ++a;
		d = null, S.resetIdentity();
		let u = M();
		N(), y.resetAccount(), g.reset(), v.reset(), b.pageLeft(), _.close(), e.device?.cancel(), u?.adapter.reset("identity"), e.onIdentityReset?.(), o = !1;
		let f = l;
		l = null, f ? R(f.value, f.replace, f.presentationThread) : i && !s && t.enqueue(() => {
			r && a === c && L();
		});
	}
	function B(t = "all", n) {
		r && i && !o && !s && (_.close(), e.device?.cancel(), _.open(t, n));
	}
	function V() {
		let e = y.read();
		if (!k() || !e.room) return null;
		let r = k();
		return v.sync(e.room, e.thread, h.peek()?.waits ?? [], X(n).pane === "agents", t.visible(), (e) => A(r) ? y.request(e) : Promise.resolve({
			ok: !1,
			error: "disconnected"
		}));
	}
	function H() {
		return V()?.refresh(!0);
	}
	function ee() {
		c || (c = !0, p.dispose());
	}
	function U() {
		r && !s && (s = !0, h.revoke(), y.dispose(), S.dispose(), v.dispose(), _.dispose(), g.dispose(), b.dispose(), e.device?.cancel(), ee(), n.update((e) => ({
			...e,
			sessionDenied: !0
		})), r && t.navigateDocument(rr(`/login?next=${encodeURIComponent(new URL(t.href()).pathname + new URL(t.href()).search + new URL(t.href()).hash)}`, t.href(), "svelte")));
	}
	return {
		active: () => r && i && !s,
		state: se(n),
		personal: h,
		rooms: g,
		navigation: b,
		account: _,
		pwa: p,
		agents: v,
		personalChannel: S,
		rootRoom: {
			state: se(y.state),
			read: y.read,
			cache: { delete: (e) => y.cache.delete(e) },
			send: y.send,
			request: y.request,
			resync: y.resync
		},
		router: {
			go: R,
			pop: () => {
				r && !s && x.pop();
			},
			generation: x.generation
		},
		roomScope: k,
		ownsRoom: A,
		syncAgents: V,
		refreshRoomAgents: H,
		appsAuthority() {
			let e = k();
			if (!e) return null;
			if (f && !A(f.scope) && N(), !f) {
				let t = Gi(() => A(e));
				f = {
					scope: e,
					owner: t
				}, t.listen(() => {
					y.read().connection === e.connection && y.cache.delete(e.roomId);
				});
			}
			return f.owner;
		},
		attachRoom(e, t) {
			if (!A(e)) return () => {};
			let n = M(), r = {
				scope: e,
				adapter: t
			};
			return u = r, n && n.adapter !== t && n.adapter.reset("navigation"), u === r && A(e) && F(), () => {
				u === r && (u = null);
			};
		},
		actions: {
			navigate: R,
			home: () => R("/app"),
			archived: () => R("/archived"),
			openAccount: B,
			logout: C,
			sessionLost: U,
			selectThread(e, t = {}) {
				let n = k(), r = y.read().room;
				if (!n || !r) return;
				let i = /^pre:(\d+)$/.exec(e);
				if (i) {
					let e = Number(i[1]);
					if (!Number.isSafeInteger(e) || e >= r.suggestions.length) return;
					R({
						roomId: n.roomId,
						thread: "main"
					}, t.replace, `pre:${e}`);
				} else !t.transient && (e === "main" || r.epics.some((t) => t.id === e)) && R({
					roomId: n.roomId,
					thread: e
				}, t.replace);
			},
			selectPane(e) {
				let t = k();
				t && (n.update((t) => ({
					...t,
					pane: e
				})), P({
					roomId: t.roomId,
					thread: y.read().thread
				}, t.roomGeneration, t.account, e), V());
			},
			retryRoom() {
				r && D() && (y.cache.delete(D()), L());
			},
			reload: t.reload
		},
		start() {
			r && !i && (i = !0, T = t.listenPop(() => {
				r && !s && x.pop();
			}), E = t.listenVisibility(() => {
				r && (e.device?.visibility(!t.visible()), t.visible() && V());
			}), n.update((e) => ({
				...e,
				lifecycle: "started"
			})), S.start(), h.start(), L());
		},
		dispose() {
			if (!r) return;
			r = !1, a++, d = null;
			let t = M();
			N(), T(), E(), w(), S.dispose(), C.dispose(), x.dispose(), y.dispose(), b.dispose(), _.dispose(), v.dispose(), g.dispose(), h.dispose(), e.device?.dispose(), ee(), t?.adapter.reset("dispose"), n.update((e) => ({
				...e,
				lifecycle: "disposed"
			}));
		}
	};
}
// svelte/features/notifications/policy.ts
function ld(e, t, n, r, i, a) {
	let o = e.kind === "agent" || e.author === "ai", s = [...e.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu)].some((e) => a(e[1]) === t.me);
	if (e.author === t.me && !o || e.quiet || i || o && e.author !== t.me && !s && e.for_who !== t.me && t.messages.find((t) => t.id === e.reply_to)?.author !== t.me) return {
		chime: !1,
		browser: !1,
		mentioned: s
	};
	let c = r || e.thread !== n || s;
	return {
		chime: c,
		browser: c && r,
		mentioned: s
	};
}
// svelte/features/notifications/audio.ts
function ud() {
	let e = null, t = () => {
		try {
			e ??= new AudioContext(), e.resume().catch(() => {});
		} catch {}
	};
	return document.addEventListener("pointerdown", t, { once: !0 }), {
		unlock: t,
		play() {
			if (!e) return;
			let t = e.currentTime;
			for (let [n, r] of [[880, 0], [1318.5, .12]]) {
				let i = e.createOscillator(), a = e.createGain();
				i.type = "sine", i.frequency.value = n, a.gain.setValueAtTime(0, t + r), a.gain.linearRampToValueAtTime(.18, t + r + .02), a.gain.exponentialRampToValueAtTime(.001, t + r + .5), i.connect(a), a.connect(e.destination), i.start(t + r), i.stop(t + r + .55);
			}
		},
		dispose() {
			document.removeEventListener("pointerdown", t), e?.close().catch(() => {}), e = null;
		}
	};
}
// svelte/features/pwa/platform.ts
function dd() {
	let e = /iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1, t = matchMedia("(display-mode: standalone)").matches || Reflect.get(navigator, "standalone") === !0;
	return {
		ios: e,
		standalone: t,
		iosWeb: e && !t,
		coarse: matchMedia("(pointer: coarse)").matches,
		safari: !e || /Safari\//.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA|FBAN|FBAV|Instagram/.test(navigator.userAgent)
	};
}
function fd(e) {
	return "prompt" in e && typeof e.prompt == "function" && "userChoice" in e;
}
function pd(e) {
	if (typeof e != "object" || !e || !("outcome" in e) || e.outcome !== "accepted" && e.outcome !== "dismissed") throw Error("invalid-install-result");
	return e.outcome;
}
var md = (e) => {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
};
function hd(e, t) {
	try {
		return localStorage.setItem(e, t ? "1" : ""), !0;
	} catch {
		return !1;
	}
}
// svelte/features/pwa/service.ts
function gd() {
	let e = K({
		...dd(),
		permission: "Notification" in window ? Notification.permission : "unsupported",
		muted: md("vb.mute"),
		dismissed: md("vb.pwaOff"),
		canInstall: !1,
		steps: !1,
		installBusy: !1,
		error: "",
		sent: null,
		testing: !1
	}), t = ar(), n = cr(t), r = or(n, {
		matchesKey: (e, t) => {
			let n = e.options?.applicationServerKey;
			if (!n) return !0;
			let r = new Uint8Array(n), i = sr(t);
			return r.length === i.length && r.every((e, t) => e === i[t]);
		},
		get: async () => (await ur())?.pushManager.getSubscription() ?? null,
		subscribe: async (e) => (await lr()).pushManager.subscribe({
			userVisibleOnly: !0,
			applicationServerKey: sr(e)
		})
	}), i = ud(), a = 0, o = !0, s = null, c = !1, l = !1, u = null, d = /* @__PURE__ */ new Set(), f = () => "serviceWorker" in navigator && "PushManager" in window && !X(e).iosWeb, p = () => {
		o && e.update((e) => ({
			...e,
			...dd(),
			standalone: l || dd().standalone,
			permission: "Notification" in window ? Notification.permission : "unsupported"
		}));
	}, m = () => {
		if (p(), !o || !s || c || !f()) return Promise.resolve();
		let t = X(e);
		return r.set(s, t.permission === "granted" && !t.muted);
	}, h = (t) => {
		(t.key === "vb.mute" || t.key === "vb.pwaOff") && (e.update((e) => ({
			...e,
			muted: md("vb.mute"),
			dismissed: md("vb.pwaOff")
		})), m());
	}, g = () => {
		document.hidden || m();
	}, _ = (t) => {
		o && !X(e).ios && fd(t) && (t.preventDefault(), u = t, e.update((e) => ({
			...e,
			canInstall: !0
		})));
	}, v = () => {
		l = !0, u = null, p(), e.update((e) => ({
			...e,
			canInstall: !1
		}));
	}, y = matchMedia("(display-mode: standalone)"), b = matchMedia("(pointer: coarse)");
	return window.addEventListener("beforeinstallprompt", _), window.addEventListener("appinstalled", v), window.addEventListener("storage", h), document.addEventListener("visibilitychange", g), y.addEventListener("change", p), b.addEventListener("change", p), {
		state: e,
		push: r.state,
		account(t) {
			o && !c && s !== t && (s = t, a++, d.clear(), e.update((e) => ({
				...e,
				sent: null,
				testing: !1
			})), m());
		},
		refresh: m,
		retry() {
			m();
		},
		mute(t) {
			if (!o || c) return;
			let n = hd("vb.mute", t);
			e.update((e) => ({
				...e,
				muted: t,
				error: n ? "" : "storage"
			})), t || (i.unlock(), i.play()), m();
		},
		async bell() {
			if (!o || c) return !1;
			i.unlock(), p();
			let t = X(e), n = a;
			if (t.iosWeb || t.permission === "denied" || t.permission === "unsupported") return !1;
			if (t.permission === "default") {
				try {
					let e = await Notification.requestPermission();
					if (!o || c || n !== a) return !1;
					if (p(), e === "granted") return this.mute(!1), !0;
				} catch {
					o && !c && n === a && e.update((e) => ({
						...e,
						error: "permission"
					}));
				}
				return !1;
			}
			return this.mute(!t.muted), !0;
		},
		dismissInstall() {
			o && !c && (hd("vb.pwaOff", !0), e.update((e) => ({
				...e,
				dismissed: !0
			})));
		},
		async install() {
			if (!o || c || X(e).installBusy) return;
			let t = u;
			if (!t) e.update((e) => ({
				...e,
				steps: !e.steps
			}));
			else {
				u = null, e.update((e) => ({
					...e,
					installBusy: !0,
					error: "",
					canInstall: !1
				}));
				try {
					await t.prompt();
					let e = pd(await t.userChoice);
					o && e === "accepted" && (l = !0, p());
				} catch {
					o && e.update((e) => ({
						...e,
						error: "install"
					}));
				} finally {
					o && e.update((e) => ({
						...e,
						installBusy: !1
					}));
				}
			}
		},
		async test() {
			if (!o || c || X(e).testing) return;
			let n = a;
			e.update((e) => ({
				...e,
				testing: !0,
				error: "",
				sent: null
			}));
			try {
				let r = await t.test();
				o && n === a && e.update((e) => ({
					...e,
					sent: r.sent
				}));
			} catch {
				o && n === a && e.update((e) => ({
					...e,
					error: "test"
				}));
			} finally {
				o && n === a && e.update((e) => ({
					...e,
					testing: !1
				}));
			}
		},
		notify(t, n, r, l, u) {
			if (!o || c || s !== n.me || d.has(`${n.id}:${t.id}`)) return;
			d.add(`${n.id}:${t.id}`), d.size > 500 && d.delete(d.values().next().value);
			let f = ld(t, n, r, document.hidden, X(e).muted, l);
			if (f.chime && i.play(), f.browser && X(e).permission === "granted") try {
				let e = new Notification(`${f.mentioned ? "@ · " : ""}${u(t)} · ${n.book.title}`, {
					body: (t.text || "📎").slice(0, 180),
					tag: `vb-${n.id}`,
					icon: "/apple-touch-icon.png"
				});
				e.onclick = () => {
					o && window.focus(), e.close();
				};
			} catch {
				let r = a;
				lr().then(async (e) => {
					o && !c && r === a && await e.showNotification(`${f.mentioned ? "@ · " : ""}${u(t)} · ${n.book.title}`, {
						body: (t.text || "📎").slice(0, 180),
						tag: `vb-${n.id}`,
						icon: "/apple-touch-icon.png",
						data: { url: `/b/${n.id}${t.thread && t.thread !== "main" ? `?t=${encodeURIComponent(t.thread)}` : ""}#m${t.id}` }
					});
				}).catch(() => {
					o && !c && r === a && e.update((e) => ({
						...e,
						error: "foreground"
					}));
				});
			}
		},
		async beforeLogout() {
			return c = !0, a++, !("serviceWorker" in navigator) || !("PushManager" in window) ? {
				local: !0,
				settled: !0,
				confirmed: !0
			} : await r.beforeLogout();
		},
		dispose() {
			o = !1, r.dispose(), i.dispose(), window.removeEventListener("beforeinstallprompt", _), window.removeEventListener("appinstalled", v), window.removeEventListener("storage", h), document.removeEventListener("visibilitychange", g), y.removeEventListener("change", p), b.removeEventListener("change", p);
		}
	};
}
function _d(e) {
	let t = K({
		enabled: !1,
		locked: !1,
		busy: !1,
		error: "",
		supported: e.credentials !== null
	}), n = !0, r = 0, i = null, a = null, o = null, s = e.now ?? Date.now, c = e.clock ?? We;
	function l() {
		try {
			return e.storage.getItem("vb.lock");
		} catch {
			return null;
		}
	}
	function u() {
		o !== null && c.cancel(o), o = null, r++, a?.abort(), a = null, t.update((e) => ({
			...e,
			busy: !1
		}));
	}
	function d() {
		u(), a = new AbortController();
		let e = r;
		return o = c.schedule(() => {
			n && e === r && (u(), t.update((e) => ({
				...e,
				error: "timeout"
			})));
		}, 6e4), {
			signal: a.signal,
			current: () => n && e === r
		};
	}
	let f = l();
	return t.update((e) => ({
		...e,
		enabled: !!f,
		locked: !!f
	})), {
		state: t,
		async configure(r, i, s) {
			if (!n || !s()) return;
			if (!r) {
				u();
				try {
					e.storage.removeItem("vb.lock"), t.update((e) => ({
						...e,
						enabled: !1,
						locked: !1,
						error: ""
					}));
				} catch {
					t.update((e) => ({
						...e,
						error: "storage-unavailable"
					}));
				}
				return;
			}
			if (!e.credentials) {
				t.update((e) => ({
					...e,
					error: "unsupported"
				}));
				return;
			}
			let l = d();
			t.update((e) => ({
				...e,
				busy: !0,
				error: ""
			}));
			try {
				let n = await e.credentials.create({
					signal: l.signal,
					publicKey: {
						hints: ["client-device"],
						challenge: e.random(32),
						rp: { name: "vibebook" },
						user: {
							id: e.random(16),
							name: i,
							displayName: "vibebook"
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
						timeout: 6e4
					}
				});
				if (!l.current() || !s()) return;
				if (!n || !("rawId" in n) || !(n.rawId instanceof ArrayBuffer) || n.type !== "public-key") throw Error("cancelled");
				let r = btoa(String.fromCharCode(...new Uint8Array(n.rawId)));
				e.storage.setItem("vb.lock", r), t.update((e) => ({
					...e,
					enabled: !0,
					busy: !1,
					error: ""
				}));
			} catch (e) {
				l.current() && s() && t.update((t) => ({
					...t,
					busy: !1,
					error: e instanceof DOMException && e.name === "NotAllowedError" ? "cancelled" : "device-failed"
				}));
			} finally {
				l.current() && (o !== null && c.cancel(o), o = null, a = null, t.update((e) => ({
					...e,
					busy: !1
				})));
			}
		},
		async unlock() {
			if (!n || !l() || !e.credentials) return;
			let r = d();
			t.update((e) => ({
				...e,
				busy: !0,
				error: ""
			}));
			try {
				let n = l();
				if (!n) throw Error("missing-key");
				let i = await e.credentials.get({
					signal: r.signal,
					publicKey: {
						hints: ["client-device"],
						challenge: e.random(32),
						allowCredentials: [{
							type: "public-key",
							id: Uint8Array.from(atob(n), (e) => e.charCodeAt(0))
						}],
						userVerification: "required",
						timeout: 6e4
					}
				});
				if (!r.current()) return;
				if (!i || i.type !== "public-key") throw Error("cancelled");
				t.update((e) => ({
					...e,
					locked: !1,
					busy: !1,
					error: ""
				}));
			} catch {
				r.current() && t.update((e) => ({
					...e,
					busy: !1,
					error: "unlock-failed"
				}));
			} finally {
				r.current() && (o !== null && c.cancel(o), o = null, a = null, t.update((e) => ({
					...e,
					busy: !1
				})));
			}
		},
		visibility(e) {
			n && (e ? i = s() : i !== null && (s() - i > 3e5 && l() && (u(), t.update((e) => ({
				...e,
				locked: !0,
				error: ""
			}))), i = null));
		},
		cancel: u,
		dispose() {
			n = !1, u();
		}
	};
}
function vd() {
	let e;
	try {
		e = localStorage;
	} catch {
		e = {
			getItem: () => null,
			setItem: () => {
				throw Error("storage-unavailable");
			},
			removeItem: () => {
				throw Error("storage-unavailable");
			}
		};
	}
	return _d({
		storage: e,
		credentials: typeof PublicKeyCredential < "u" && navigator.credentials && typeof navigator.credentials.create == "function" && typeof navigator.credentials.get == "function" ? navigator.credentials : null,
		random: (e) => crypto.getRandomValues(new Uint8Array(e))
	});
}
// svelte/features/application/copy.ts
function yd(e, t) {
	let n = e.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1];
	return n === "pt" || n === "en" ? n : /^pt/i.test(t) ? "pt" : /^en/i.test(t) ? "en" : "pt";
}
var bd = (e) => e === "en" ? "en-US" : "pt-BR", xd = {
	"O que é seu": "What’s yours",
	"Seu Claude": "Your Claude",
	"Tarefas suas e o que espera seu OK. Clique pra abrir.": "Your tasks and what waits on your OK. Click to open.",
	"Esperando seu OK": "Waiting on your OK",
	"Nenhuma tarefa aberta sua.": "No open tasks of yours.",
	Resolvido: "Resolved",
	"esperando você": "waiting on you",
	"O que precisa de você aqui": "What needs you here",
	"só você vê": "only you see this",
	Dispensar: "Dismiss",
	"Feito / não é comigo": "Done / not for me",
	"seu Claude espera você": "your Claude is waiting on you",
	"sua tarefa, fazendo": "your task, in progress",
	"sua tarefa, a fazer": "your task, to do",
	Arquivado: "Archived",
	"Esperando confirmação…": "Waiting for confirmation…",
	Remover: "Remove",
	"Tentar de novo": "Try again",
	reseta: "resets",
	sandbox: "sandbox",
	Apagar: "Delete",
	"Conferi a sala": "I checked the room",
	"Verificar acesso novamente": "Check access again",
	"Não foi possível iniciar o app. Abra o arquivo para tentar de novo.": "The app could not start. Open the file to try again.",
	"Ainda sem confirmação. Confira os itens fixados antes de tentar novamente.": "Still unconfirmed. Check the pinned items before trying again.",
	"Permissão do app": "App permission",
	"Quem pode usar": "Who can use it",
	"Não deu para salvar.": "Could not save.",
	"Mudança não confirmada.": "Change unconfirmed.",
	"Mudança não confirmada. Ela pode ter sido salva. Confira antes de tentar de novo.": "Change unconfirmed. It may have been saved. Check before trying again.",
	"Revisar e tentar de novo": "Review and try again",
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
	"Tarefa sua pendente": "A task of yours is pending",
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
	"Suas tarefas": "Your tasks",
	revisar: "review",
	"Não foi possível carregar a caixa de entrada.": "Could not load your inbox.",
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
};
function Sd(e) {
	return (t, n) => {
		let r = Object.hasOwn(xd, t) ? xd[t] : void 0, i = e === "en" && r !== void 0 ? r : t;
		return n ? i.replace(/\{(\w+)\}/g, (e, t) => Object.hasOwn(n, t) ? String(n[t]) : e) : i;
	};
}
// svelte/features/application/browser.ts
function Cd(e) {
	let t = e.window, n = e.document, r = yd(n.cookie, t.navigator.language), i = Sd(r), a = null;
	try {
		a = t.localStorage;
	} catch {}
	let o = {
		origin: t.location.origin,
		href: () => t.location.href,
		history: t.history,
		socketUrl(e) {
			let n = new URL(e, t.location.href);
			return n.protocol = n.protocol === "https:" ? "wss:" : "ws:", n.href;
		},
		visible: () => n.visibilityState === "visible",
		listenVisibility(e) {
			return n.addEventListener("visibilitychange", e), () => n.removeEventListener("visibilitychange", e);
		},
		listenPop(e) {
			return t.addEventListener("popstate", e), () => t.removeEventListener("popstate", e);
		},
		enqueue: (e) => t.queueMicrotask(e),
		navigateDocument: (e) => {
			t.location.href = e;
		},
		reload: () => t.location.reload(),
		logoutPost: un(t.fetch.bind(t)),
		logoutWarning: () => t.alert(tr(r)),
		logoutFailure: () => t.alert(er(r)),
		shellVersion: e.shellVersion,
		storage: a
	}, s = t.fetch.bind(t), c = vd();
	return {
		...cd({
			browser: o,
			pwa: gd,
			device: c,
			homeApi: gr(s),
			accountApi: Fu(s),
			agentsApi: Tt(s),
			runnerFetch: s,
			onIdentityReset: e.onIdentityReset
		}),
		device: c,
		language: r,
		locale: bd(r),
		t: i
	};
}
// svelte/features/composer/drafts.ts
var wd = () => ({
	question: "",
	options: [
		"",
		"",
		""
	],
	multi: !1,
	revision: 0
}), Td = () => ({
	text: "",
	attachments: [],
	revision: 0,
	phase: "idle",
	error: "",
	notice: "",
	poll: wd(),
	pollPhase: "idle",
	pollError: ""
}), Ed = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, Dd = 1e4, Od = (e) => e === "offline" || e === "invalid command" || e === "empty message" || e === "unknown thread" || e.startsWith("blocked:");
function kd(e = Ed) {
	let t = !0, n = 0, r = 0, i = 0, a = /* @__PURE__ */ new Map(), o = K(0), s = /* @__PURE__ */ new Map(), c = () => o.update((e) => e + 1), l = (e, t) => e.account === t.me && e.roomId === t.id && e.thread !== "main" && !t.epics.some((t) => t.id === e.thread), u = [], d = /* @__PURE__ */ new Set(), f = (e) => JSON.stringify([
		e.account,
		e.roomId,
		e.thread
	]);
	function p() {
		for (; t && i < 2 && u.length;) {
			let r = u.shift();
			if (r.epoch !== n) continue;
			let a = r.entry.item(r.id);
			if (!a?.file || a.phase !== "queued") continue;
			i++;
			let o = new AbortController();
			d.add(o), r.entry.uploading(r.id, o);
			let s, c = () => {};
			new Promise((i, l) => {
				c = () => {
					s !== void 0 && e.cancel(s), l(/* @__PURE__ */ Error("cancelled"));
				}, o.signal.addEventListener("abort", c, { once: !0 }), s = e.schedule(() => {
					t && r.epoch === n && r.entry.uploadError(r.id, "timeout"), o.abort();
				}, 2e4);
				try {
					r.upload({
						name: a.name,
						type: a.type,
						body: a.file
					}, o.signal).then(i, l);
				} catch (e) {
					l(e);
				}
			}).then((e) => {
				t && r.epoch === n && !o.signal.aborted && r.entry.uploaded(r.id, e);
			}).catch((e) => {
				t && r.epoch === n && !o.signal.aborted && r.entry.uploadError(r.id, e instanceof Error ? e.message : "failed");
			}).finally(() => {
				s !== void 0 && e.cancel(s), o.signal.removeEventListener("abort", c), d.delete(o), r.epoch === n && i--, t && p();
			});
		}
	}
	function m(i, a = !0) {
		let o = Object.freeze({ ...i }), s = K(a ? Td() : {
			...Td(),
			error: "draft-limit"
		}), c = !0, l, d, f, m, h, g, _, v = /* @__PURE__ */ new Map(), y = () => a && c && t && l?.id === o.roomId && l.me === o.account && l.members.includes(o.account) && (o.thread === "main" || l.epics.some((e) => e.id === o.thread)), b = (t) => {
			t?.timer !== void 0 && e.cancel(t.timer);
		}, x = (e) => c && t && g?.token === e.token, S = (e) => c && t && _?.token === e.token;
		function C() {
			let e = g;
			if (!e || !l) return;
			let t = ua(l, o.thread, e.snapshot);
			s.update((e) => e.candidate === t?.id ? e : {
				...e,
				candidate: t?.id
			}), e.ack && t && (b(e), g = void 0, s.update((t) => t.revision === e.snapshot.revision ? {
				...t,
				text: "",
				replyId: void 0,
				attachments: t.attachments.filter((e) => e.phase === "error"),
				revision: t.revision + 1,
				phase: "idle",
				error: "",
				candidate: void 0,
				notice: "sent"
			} : {
				...t,
				phase: "idle",
				error: "",
				candidate: void 0,
				notice: "sent-edited"
			}));
		}
		function w(e) {
			return Object.values(l?.polls || {}).find((t) => !e.baseline.has(t.id) && t.author === o.account && t.question === e.form.question && t.multi === e.form.multi && JSON.stringify(t.options) === JSON.stringify(e.form.options) && l.messages.some((n) => n.id > e.baselineMessage && n.thread === o.thread && n.author === o.account && n.kind !== "agent" && n.poll === t.id));
		}
		function T() {
			let e = _;
			if (!e || !l) return;
			let t = w(e);
			s.update((e) => e.pollCandidate === t?.id ? e : {
				...e,
				pollCandidate: t?.id
			}), e.ack && t && (b(e), _ = void 0, s.update((t) => ({
				...t,
				poll: t.poll.revision === e.form.revision ? wd() : t.poll,
				pollPhase: "idle",
				pollError: "",
				pollCandidate: void 0,
				notice: "poll-created"
			})));
		}
		function E(e, t) {
			x(e) && (b(e), e.timer = void 0, s.update((e) => ({
				...e,
				phase: "unconfirmed",
				error: t
			})));
		}
		function D(e, t) {
			S(e) && (b(e), e.timer = void 0, s.update((e) => ({
				...e,
				pollPhase: "unconfirmed",
				pollError: t
			})));
		}
		let O = {
			scope: o,
			state: s,
			available: () => a && c && t,
			sync(e, n, r) {
				c && t && (e.id !== o.roomId || e.me !== o.account ? (l = void 0, d = void 0, f = void 0) : (l = e, d = n, f = r, C(), T()));
			},
			edit(e) {
				a && c && t && s.update((t) => ({
					...t,
					text: e,
					revision: t.revision + 1,
					notice: ""
				}));
			},
			reply(e, t) {
				if (!y() || e.thread !== o.thread) return;
				let n = [...l.messages, ...l.origins || []].find((t) => t.id === e.id);
				n && n.thread === o.thread && Jt(l, n) && (s.update((e) => ({
					...e,
					text: t === void 0 ? e.text : t,
					replyId: n.id,
					revision: e.revision + 1,
					notice: ""
				})), m?.());
			},
			clearReply() {
				c && t && s.update((e) => ({
					...e,
					replyId: void 0,
					revision: e.revision + 1
				}));
			},
			focus() {
				y() && m?.();
			},
			attachFocus(e) {
				let t = Symbol();
				return h = t, m = e, () => {
					h === t && (m = void 0, h = void 0, l = void 0, d = void 0, f = void 0);
				};
			},
			addFiles(e) {
				if (y() && f) {
					for (let t of e) {
						if (X(s).attachments.length >= 10) {
							s.update((e) => ({
								...e,
								error: "attachments-limit"
							}));
							break;
						}
						let e = ra(t), i = ia(e);
						if (i) {
							s.update((t) => ({
								...t,
								error: `file-${i}: ${e.name}`
							}));
							continue;
						}
						let a = {
							id: ++r,
							name: e.name,
							type: na(e.type),
							size: e.size,
							file: e,
							phase: "queued"
						};
						s.update((e) => ({
							...e,
							attachments: [...e.attachments, a],
							revision: e.revision + 1,
							error: ""
						})), u.push({
							entry: O,
							id: a.id,
							upload: f,
							epoch: n
						});
					}
					p();
				}
			},
			removeFile(e) {
				c && t && (v.get(e)?.abort(), v.delete(e), s.update((t) => ({
					...t,
					attachments: t.attachments.filter((t) => t.id !== e),
					revision: t.revision + 1
				})));
			},
			retryUpload(e) {
				if (!y() || !f) return;
				let t = X(s).attachments.find((t) => t.id === e);
				t?.file && t.phase === "error" && (s.update((t) => ({
					...t,
					attachments: t.attachments.map((t) => t.id === e ? {
						...t,
						phase: "queued",
						error: void 0
					} : t)
				})), u.push({
					entry: O,
					id: e,
					upload: f,
					epoch: n
				}), p());
			},
			item(e) {
				return c ? X(s).attachments.find((t) => t.id === e) : void 0;
			},
			uploading(e, t) {
				c && (v.set(e, t), s.update((t) => ({
					...t,
					attachments: t.attachments.map((t) => t.id === e ? {
						...t,
						phase: "uploading"
					} : t)
				})));
			},
			uploaded(e, t) {
				c && v.has(e) && (t.author === o.account ? (v.delete(e), s.update((n) => ({
					...n,
					attachments: n.attachments.map((n) => n.id === e ? {
						...n,
						file: void 0,
						meta: t,
						phase: "ready",
						error: void 0
					} : n)
				}))) : O.uploadError(e, "account-changed"));
			},
			uploadError(e, t) {
				c && v.has(e) && (v.delete(e), s.update((n) => ({
					...n,
					attachments: n.attachments.map((n) => n.id === e ? {
						...n,
						phase: "error",
						error: t
					} : n)
				})));
			},
			async submit() {
				if (!y() || !d || g) return;
				let t = X(s), n = t.text.trim();
				if (t.attachments.some((e) => e.phase === "queued" || e.phase === "uploading")) {
					s.update((e) => ({
						...e,
						error: "attachments-pending"
					}));
					return;
				}
				if (n.length > 4e3) {
					s.update((e) => ({
						...e,
						error: "text-limit"
					}));
					return;
				}
				let r = t.attachments.flatMap((e) => e.meta ? [e.meta.id] : []);
				if (!n && !r.length) return;
				let i = t.replyId ? [...l.messages, ...l.origins || []].find((e) => e.id === t.replyId && e.thread === o.thread && Jt(l, e)) : void 0;
				if (t.replyId && !i) {
					s.update((e) => ({
						...e,
						error: "reply-missing"
					}));
					return;
				}
				let a = {
					token: Symbol(),
					snapshot: {
						text: n,
						fileIds: r,
						replyId: i?.id,
						baseline: da(l),
						revision: t.revision
					},
					ack: !1
				};
				g = a, s.update((e) => ({
					...e,
					phase: "pending",
					error: "",
					candidate: void 0,
					notice: ""
				}));
				try {
					let t = await d({
						t: "msg",
						thread: o.thread,
						text: n,
						files: r,
						reply_to: i?.id
					});
					if (!x(a)) return;
					if (!t.ok) {
						Od(t.error) ? (g = void 0, s.update((e) => ({
							...e,
							phase: "error",
							error: t.error
						}))) : E(a, t.error);
						return;
					}
					a.ack = !0, C(), x(a) && (a.timer = e.schedule(() => E(a, "unconfirmed"), Dd));
				} catch (e) {
					if (!x(a)) return;
					e instanceof TypeError && e.message === "Invalid room command" ? (g = void 0, s.update((t) => ({
						...t,
						phase: "error",
						error: e.message
					}))) : E(a, e instanceof Error ? e.message : "failed");
				}
			},
			review(e) {
				if (!c || !g || X(s).phase !== "unconfirmed") return;
				let t = g.snapshot;
				b(g), g = void 0, s.update((n) => !e && n.revision === t.revision ? {
					...n,
					text: "",
					replyId: void 0,
					attachments: n.attachments.filter((e) => e.phase === "error"),
					revision: n.revision + 1,
					phase: "idle",
					error: "",
					candidate: void 0,
					notice: "reviewed-discarded"
				} : {
					...n,
					phase: "idle",
					error: "",
					candidate: void 0,
					notice: "reviewed-kept"
				});
			},
			editPoll(e) {
				a && c && t && s.update((t) => ({
					...t,
					poll: {
						...t.poll,
						...e,
						revision: t.poll.revision + 1
					},
					notice: ""
				}));
			},
			async createPoll() {
				if (!y() || !d || _) return;
				let t = X(s).poll, n = {
					...t,
					question: t.question.trim(),
					options: t.options.map((e) => e.trim()).filter(Boolean)
				};
				if (!n.question || n.question.length > 300 || n.options.length < 2 || n.options.length > 10 || n.options.some((e) => e.length > 200)) {
					s.update((e) => ({
						...e,
						pollError: "poll-invalid"
					}));
					return;
				}
				let r = {
					token: Symbol(),
					form: n,
					baseline: new Set(Object.keys(l.polls || {})),
					baselineMessage: da(l),
					ack: !1
				};
				_ = r, s.update((e) => ({
					...e,
					pollPhase: "pending",
					pollError: "",
					pollCandidate: void 0,
					notice: ""
				}));
				try {
					let t = await d({
						t: "poll.create",
						thread: o.thread,
						question: n.question,
						options: n.options,
						multi: n.multi
					});
					if (!S(r)) return;
					if (!t.ok) {
						t.error === "offline" || t.error === "invalid command" ? (_ = void 0, s.update((e) => ({
							...e,
							pollPhase: "error",
							pollError: t.error
						}))) : D(r, t.error);
						return;
					}
					r.ack = !0, T(), S(r) && (r.timer = e.schedule(() => D(r, "unconfirmed"), Dd));
				} catch (e) {
					D(r, e instanceof Error ? e.message : "failed");
				}
			},
			reviewPoll() {
				c && _ && X(s).pollPhase === "unconfirmed" && (b(_), _ = void 0, s.update((e) => ({
					...e,
					pollPhase: "idle",
					pollError: "",
					pollCandidate: void 0,
					notice: "reviewed"
				})));
			},
			dispose() {
				c = !1, b(g), b(_), g = void 0, _ = void 0;
				for (let e of v.values()) e.abort();
				v.clear(), m = void 0, l = void 0, d = void 0, f = void 0, s.set(Td());
			}
		};
		return O;
	}
	return {
		changes: { subscribe: o.subscribe },
		orphans(e) {
			return [...a.values()].filter((t) => {
				let n = X(t.state);
				return l(t.scope, e) && !!(n.text || n.replyId || n.attachments.length || n.poll.question || n.poll.multi || n.poll.options.some(Boolean));
			}).map((e) => ({
				scope: e.scope,
				state: X(e.state)
			}));
		},
		discardOrphan(e, n) {
			let r = f(e.scope), i = a.get(r);
			return !t || !i || !l(e.scope, n) || X(i.state) !== e.state ? !1 : (s.get(r)?.(), s.delete(r), a.delete(r), i.dispose(), c(), !0);
		},
		entry(e) {
			let t = f(e), n = a.get(t);
			if (!n) {
				if (a.size >= 64) {
					let t = [...a.values()].find((e) => {
						let t = X(e.state);
						return !t.text && !t.replyId && !t.attachments.length && (t.phase === "idle" || t.phase === "error") && !t.poll.question && !t.poll.options.some((e) => e) && !t.poll.multi && (t.pollPhase === "idle" || t.pollPhase === "error");
					});
					if (t) s.get(f(t.scope))?.(), s.delete(f(t.scope)), t.dispose(), a.delete(f(t.scope));
					else return m(e, !1);
				}
				n = m(e), a.set(t, n), s.set(t, n.state.subscribe(c));
			}
			return n;
		},
		reset() {
			n++, i = 0;
			for (let e of s.values()) e();
			s.clear();
			for (let e of a.values()) e.dispose();
			a.clear(), u.length = 0;
			for (let e of d) e.abort();
			d.clear(), c();
		},
		dispose() {
			t = !1, this.reset();
		}
	};
}
// svelte/features/application/roomResources.ts
function Ad() {
	let e = kd(), t = Vi(), n = !0;
	return {
		composer: e,
		documents: t,
		reset() {
			n && (e.reset(), t.clear());
		},
		dispose() {
			n && (n = !1, e.dispose(), t.clear());
		}
	};
}
// svelte/features/application/NativeApplication.svelte
function jd(e, t) {
	R(t, !0);
	let n = v(t, "browser", 3, window), r = v(t, "document", 3, document), i = G(Ad), a = G(() => Cd({
		window: n(),
		document: r(),
		shellVersion: t.shellVersion,
		onIdentityReset: i.reset
	}));
	c(() => {
		a.dispose(), i.dispose();
	}), Rr(e, {
		get services() {
			return a;
		},
		roomSnippet: (e, t = L) => {
			Au(e, {
				get presentation() {
					return t();
				},
				get resources() {
					return i;
				}
			});
		},
		$$slots: { roomSnippet: !0 }
	}), U();
}
// svelte/features/application/version.ts
function Md(e) {
	let t = e.querySelector("meta[name=\"vb-v\"]");
	return t ? t.getAttribute("content") || null : e.querySelector("script[type=\"module\"][src*=\"/svelte-preview/app.js\"]") ? null : "development";
}
// svelte/features/application/mount.ts
function Nd(e, t = document) {
	let n = a(jd, {
		target: e,
		props: {
			document: t,
			shellVersion: Md(t)
		}
	}), r = !0;
	return { destroy() {
		if (r) return r = !1, d(n);
	} };
}
export { Nd as mountApplication };
