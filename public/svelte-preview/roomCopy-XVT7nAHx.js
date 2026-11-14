import { B as e, L as t, O as n, S as r, V as i, a, j as o, k as s, v as c, x as l, z as u } from "./Button-Cx7HMFHY.js";
import { A as d, Et as f, F as p, G as m, Tt as h, Yt as g, i as _, lt as v, q as y, t as b, u as x, z as S } from "./shared-qe__81Sz.js";
import { c as C, d as w, n as T, p as E, u as D } from "./schemas-Dr5xbymo.js";
import "./index-client-RnYrC9zI.js";
import { F as O, H as k, I as A, L as j, T as M, b as ee, i as te, j as ne, l as re, r as ie, u as N, v as ae, w as oe } from "./schemas-cfL4JcHa.js";
import { n as se } from "./api-D4u8Abqp.js";
import { f as ce, m as le, o as ue, r as P, s as de } from "./SetupInstructions-xyHo5tew.js";
import { t as F } from "./Progress-Bphyn8tw.js";
// svelte/features/chat/model.ts
function I(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (t(e[n])) return e[n];
}
var L = (e) => e.replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function R(e) {
	return /codex|gpt|openai|\bo[1-9]\b/i.test(e || "") ? "◎" : /gemini/i.test(e || "") ? "✦" : /cursor/i.test(e || "") ? "▲" : /copilot/i.test(e || "") ? "◉" : "✻";
}
var fe = (e, t) => !!e && e.author === t.author && (e.kind || null) === (t.kind || null) && (e.tag || null) === (t.tag || null) && t.ts - e.ts < 3e5 && !e.poll && !t.poll, pe = (e) => e.author === "ai" && (e.tag === "notice" || e.tag === "done" || /^↩ (Reabri|I reopened)/.test(e.text)), me = (e) => e.tag === "reminder" ? "reminder" : e.tag === "issue" ? "issue" : pe(e) ? "notice" : "regular", z = (e) => e?.tag === "reminder" ? e.text.split("\n")[0] : e?.tag === "issue" ? "⚠issue" : null;
function he(e) {
	let t = [];
	for (let n of e) {
		let e = z(n), r = t.at(-1);
		e && r && z(r) === e ? t[t.length - 1] = {
			...n,
			runs: [...r.runs || [r.ts], n.ts],
			group: [...r.group || [r], n]
		} : t.push(n);
	}
	return t;
}
var ge = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? "votação" : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120);
function _e(e) {
	let [t, ...n] = e.text.split("\n\n"), r = t.replace(/^⏰\s*/, ""), i = r.match(/^\*\*(.+?)\*\*\s*(.*)$/);
	return {
		name: i?.[1],
		head: i?.[2] ?? r,
		body: n.join("\n\n"),
		runs: e.runs || [e.ts]
	};
}
function ve(e) {
	let [t, ...n] = e.text.split("\n\n");
	return {
		head: t.replace(/^⚠\s*/, ""),
		body: n.join("\n\n")
	};
}
function ye(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), a = (e) => {
		let t = r.get(e);
		return t || (t = {
			statuses: [],
			readers: []
		}, r.set(e, t)), t;
	}, o = /* @__PURE__ */ new Set();
	for (let t of [...e.acks || []].sort((e, t) => t.ts - e.ts)) {
		let r = `${t.msg_id}|${t.who}|${t.email}`;
		if (o.has(r) || (o.add(r), t.status === "dismissed")) continue;
		i.add(r);
		let s = [...new Set(e.epics.filter((e) => e.from_msg === t.msg_id && !e.archived).flatMap((e) => e.tasks.filter((e) => e.status !== "done" && e.owner).map((e) => e.owner)))], c = t.status === "blocked" ? "blocked" : t.status === "doing" && n - t.ts < 12e5 ? "doing" : t.status === "done" ? "done" : s.length ? "waiting" : "idle";
		a(t.msg_id).statuses.push({
			ack: t,
			kind: c,
			owners: s
		});
	}
	let s = e.messages.filter((e) => e.thread === t), c = /* @__PURE__ */ new Map();
	for (let t of e.receipts || []) {
		let e = `${t.who}|${t.email}`, n = c.get(e);
		c.set(e, n ? {
			...t,
			read: Math.max(n.read, t.read),
			delivered: Math.max(n.delivered, t.delivered)
		} : t);
	}
	for (let e of c.values()) {
		let t = I(s, (t) => t.id <= Math.max(e.read, e.delivered) && (t.kind !== "agent" || t.author !== e.email));
		t && !i.has(`${t.id}|${e.who}|${e.email}`) && a(t.id).readers.push({
			receipt: e,
			read: e.read >= t.id
		});
	}
	for (let e of r.values()) e.readers.sort((e, t) => Number(t.read) - Number(e.read));
	return r;
}
function be(e, t, n) {
	if (t.startsWith("pre:")) return [];
	let r = e.epics.find((e) => e.id === t);
	if (r?.archived) return [];
	let i = [...e.messages, ...(e.origins || []).filter((t) => !e.messages.some((e) => e.id === t.id))], a = new Set(e.epics.filter((e) => e.id !== r?.id).map((e) => e.from_msg)), o = new Set(i.filter((e) => e.thread === t && !a.has(e.id)).map((e) => e.id));
	r?.from_msg && o.add(r.from_msg);
	let s = /* @__PURE__ */ new Set(), c = [...e.acks || []].filter((e) => o.has(e.msg_id)).sort((e, t) => t.ts - e.ts).filter((e) => {
		let t = `${e.msg_id}|${e.who}|${e.email}`;
		return !s.has(t) && (s.add(t), !0);
	}), l = c.filter((e) => e.status !== "dismissed"), u = /* @__PURE__ */ new Set(), d = [];
	for (let e of l) {
		let t = `${e.who}|${e.email}`;
		e.status === "doing" && n - e.ts < 12e5 && !u.has(t) && l.find((t) => t.msg_id === e.msg_id && t.who === e.who && t.email === e.email) === e && (u.add(t), d.push({
			who: e.who,
			email: e.email
		}));
	}
	if (d.length || !r) return d;
	let f = l.find((e) => e.status === "doing" && n - e.ts < 12e5);
	if (f) return [{
		who: f.who,
		email: f.email
	}];
	if (c[0]?.status === "done" || c[0]?.status === "dismissed") return [];
	let p = I(e.messages, (e) => e.thread === t && e.kind === "agent");
	return p && p.tag !== "done" && n - p.ts < 18e4 ? [{
		who: p.via || "Agent",
		email: p.author
	}] : [];
}
// svelte/features/room-sidebar/model.ts
var xe = (e) => JSON.stringify(e);
function Se(e, t) {
	if (/^pre:\d+$/.test(t)) return e.suggestions[Number(t.slice(4))];
}
function Ce(e, t) {
	let n = e.messages.filter((e) => e.thread === t);
	return e.counts ? (e.counts[t] ?? 0) + n.filter((t) => t.id > (e.countsAt ?? 0)).length : n.length;
}
function we(e, t) {
	let n = [t], r = /* @__PURE__ */ new Map();
	for (let t of e.epics) t.parent && r.set(t.parent, [...r.get(t.parent) ?? [], t.id]);
	for (let e = 0; e < n.length && n.length < 60; e++) for (let t of r.get(n[e]) ?? []) n.includes(t) || n.push(t);
	let i = /* @__PURE__ */ new Map();
	for (let t = e.messages.length - 1; t >= 0; t--) {
		let r = e.messages[t];
		if (n.includes(r.thread)) for (let e of r.files ?? []) {
			let t = i.get(e.name);
			t ? t.seen.add(e.id) : i.set(e.name, {
				file: {
					id: e.id,
					name: e.name,
					type: e.type,
					n: 1
				},
				seen: /* @__PURE__ */ new Set([e.id]),
				count: 0
			});
		}
	}
	for (let t of n) for (let n of e.epics.find((e) => e.id === t)?.files ?? []) {
		let e = i.get(n.name);
		e ? e.count = Math.max(e.count, n.n, e.seen.size) : i.set(n.name, {
			file: n,
			seen: /* @__PURE__ */ new Set([n.id]),
			count: n.n
		});
	}
	return [...i.values()].map(({ file: e, seen: t, count: n }) => ({
		...e,
		n: Math.max(n, t.size)
	}));
}
function Te(e, t) {
	let n = /* @__PURE__ */ new Set();
	return e.agents.filter((e) => e.email === t).sort((e, t) => Number(t.listening) - Number(e.listening)).filter((e) => {
		let t = L(e.who) + e.repo;
		return !n.has(t) && (n.add(t), !0);
	}).slice(0, 3);
}
function Ee(e, t) {
	return Number.isFinite(e) && Number.isFinite(t) && t > 0 ? Math.max(0, Math.min(100, Math.round(e / t * 100))) : 0;
}
// svelte/features/room-sidebar/AgentPresenceRows.svelte
var De = i("<p class=\"tw:m-0\"> </p> <!>", 1), Oe = i("<details class=\"tw:space-y-1\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <!> <!></details>"), ke = i("<div data-agent-presence=\"\" class=\"tw:ml-5 tw:space-y-1 tw:rounded-control tw:px-2 tw:py-1 tw:text-xs tw:text-muted-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><span aria-hidden=\"true\"> </span><span class=\"tw:min-w-0 tw:flex-1 tw:truncate\"> </span><span> </span></div> <!></div>");
function Ae(i, _) {
	f(_, !0);
	let b = a(_, "locale", 3, "pt-BR"), C = v(() => Te(_.presence, _.email)), w = (e) => e >= 80 ? "tw:[&::-webkit-progress-value]:bg-destructive! tw:[&::-moz-progress-bar]:bg-destructive!" : e >= 60 ? "tw:[&::-webkit-progress-value]:bg-warning! tw:[&::-moz-progress-bar]:bg-warning!" : "tw:[&::-webkit-progress-value]:bg-success! tw:[&::-moz-progress-bar]:bg-success!", T = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`;
	var E = e(), D = S(E);
	n(D, 17, () => x(C), s, (i, a) => {
		var f = ke(), h = p(f), C = p(h), E = m(C, !0), D = y(C), O = m(D), k = y(D), A = m(k, !0);
		g(h);
		var j = y(h, 2), M = (r) => {
			let i = v(() => x(a).context), c = v(() => Ee(x(i).tokens, x(i).window));
			var l = Oe(), f = p(l), h = m(f), C = y(f, 2);
			{
				let e = v(() => _.t("Contexto")), t = v(() => w(x(c)));
				F(C, {
					get value() {
						return x(c);
					},
					get label() {
						return x(e);
					},
					get class() {
						return x(t);
					}
				});
			}
			var E = y(C, 2);
			n(E, 16, () => ["five_hour", "seven_day"], s, (n, r) => {
				let a = v(() => r === "five_hour" ? x(i).limits?.five_hour : x(i).limits?.seven_day);
				var s = e(), c = S(s), l = (e) => {
					var n = De(), i = S(n), o = m(i), s = y(i, 2);
					{
						let e = v(() => w(x(a).p)), t = v(() => _.t(r === "five_hour" ? "Sessão de 5h" : "Semana"));
						F(s, {
							get value() {
								return x(a).p;
							},
							get class() {
								return x(e);
							},
							get label() {
								return x(t);
							}
						});
					}
					d((e, n, r) => t(o, `${e ?? ""}: ${x(a).p ?? ""}% · ${n ?? ""}
              ${r ?? ""}`), [
						() => _.t(r === "five_hour" ? "Sessão de 5h" : "Semana"),
						() => _.t("reseta"),
						() => (/* @__PURE__ */ new Date(x(a).r * 1e3)).toLocaleString(b())
					]), u(e, n);
				}, f = v(() => x(a) && x(a).r * 1e3 >= Date.now());
				o(c, (e) => {
					x(f) && e(l);
				}), u(n, s);
			}), g(l), d((e, n, r) => t(h, `${e ?? ""}: ${x(c) ?? ""}% · ${n ?? ""}/${r ?? ""}`), [
				() => _.t("Contexto"),
				() => T(x(i).tokens),
				() => T(x(i).window)
			]), u(r, l);
		};
		o(j, (e) => {
			x(a).context && e(M);
		}), g(f), d((e, n, i, o) => {
			c(f, "title", e), l(C, 1, r(x(a).listening ? "tw:text-success" : "tw:text-muted-foreground")), t(E, n), t(O, `${i ?? ""}${x(a).repo ? ` · ${x(a).repo}` : ""}`), t(A, o);
		}, [
			() => _.t("{via} de {who}", {
				via: L(x(a).who),
				who: _.name(_.email)
			}),
			() => R(x(a).who),
			() => L(x(a).who).replace(/^Claude\s+/i, ""),
			() => x(a).listening ? _.t(x(a).all_rooms ? "ouvindo todas as salas agora" : "ouvindo") : x(a).seen_at === null ? "—" : _.ago(x(a).seen_at)
		]), u(i, f);
	}), u(i, E), h();
}
// svelte/features/agents/api.ts
var B = class extends Error {
	status;
	constructor(e, t = 0) {
		super(e), this.status = t;
	}
}, V = (e) => e instanceof B && e.status === 401 && e.message === k.error;
async function H(e, t) {
	let n = await e.json().catch(() => null);
	if (!e.ok) {
		let t = ee.safeParse(n);
		throw new B(t.success ? t.data.error : `HTTP ${e.status}`, e.status);
	}
	try {
		return t.parse(n);
	} catch {
		throw new B("Invalid agent response");
	}
}
function je(e) {
	let t = se("/", e).api, n = t.books[":id"], r = t.sandboxes[":sid"], i = (e) => ({ id: encodeURIComponent(e) }), a = (e) => ({ sid: encodeURIComponent(e) });
	return {
		identity: (e) => t.me.$get({ query: { ui: "svelte" } }, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => H(e, oe)).then((e) => e.email),
		grants: (e) => t.agents.$get({}, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => H(e, ie)),
		revoke: (e, n) => t.agents.revoke.$post({ json: { ids: [...e] } }, { init: {
			signal: n,
			cache: "no-store"
		} }).then((e) => H(e, ne)),
		room: (e, t) => n.agents.$get({ param: i(e) }, { init: {
			signal: t,
			cache: "no-store"
		} }).then((e) => H(e, te)),
		toggle: (e, t, r) => n.claude.$post({
			param: i(e),
			json: { on: t }
		}, { init: {
			signal: r,
			cache: "no-store"
		} }).then((e) => H(e, re)),
		sandboxes: (e, t) => n.sandboxes.$get({ param: i(e) }, { init: {
			signal: t,
			cache: "no-store"
		} }).then((e) => H(e, j)),
		create: (e, t, r) => n.sandboxes.$post({
			param: i(e),
			json: { name: t }
		}, { init: {
			signal: r,
			cache: "no-store"
		} }).then((e) => H(e, ae)),
		power: (e, t, n) => (t === "start" ? r.start.$post({ param: a(e) }, { init: {
			signal: n,
			cache: "no-store"
		} }) : r.pause.$post({ param: a(e) }, { init: {
			signal: n,
			cache: "no-store"
		} })).then((e) => H(e, M)),
		setup: (e, t) => r.setup.$post({ param: a(e) }, { init: {
			signal: t,
			cache: "no-store"
		} }).then((e) => H(e, O)),
		remove: (e, t) => r.$delete({ param: a(e) }, { init: {
			signal: t,
			cache: "no-store"
		} }).then((e) => H(e, M)),
		terminal: (e, t) => r.terminal.$post({ param: a(e) }, { init: {
			signal: t,
			cache: "no-store"
		} }).then((e) => H(e, A)),
		connected: (e) => t.freestyle.$get({}, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => H(e, N)),
		saveKey: (e, n) => t.freestyle.$post({ json: { key: e } }, { init: {
			signal: n,
			cache: "no-store"
		} }).then((e) => H(e, M)),
		removeKey: (e) => t.freestyle.$delete({}, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => H(e, M)),
		saveToken: (e, n) => t["claude-token"].$post({ json: { token: e } }, { init: {
			signal: n,
			cache: "no-store"
		} }).then((e) => H(e, M)),
		removeToken: (e) => t["claude-token"].$delete({}, { init: {
			signal: e,
			cache: "no-store"
		} }).then((e) => H(e, M))
	};
}
// svelte/features/agents/authority.ts
async function U(e, t, n, r, i) {
	let a = async () => {
		if (n.aborted || await e.identity(n) !== t || n.aborted) throw new B("identity-unconfirmed");
	};
	r && await a();
	let o = await i();
	return r && await a(), o;
}
// svelte/features/agents/lease.ts
var W = {
	now: () => Date.now(),
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, G = class extends Error {
	code;
	constructor(e) {
		super(e), this.code = e;
	}
};
function K(e = W) {
	let t;
	return {
		cancel() {
			t?.(), t = void 0;
		},
		run(n, r) {
			return t?.(), new Promise((i, a) => {
				let o = !1, s, c = new AbortController(), l = (n) => {
					o || (o = !0, e.cancel(s), t === u && (t = void 0), n());
				}, u = () => l(() => {
					c.abort(), a(new G("cancelled"));
				});
				t = u, s = e.schedule(() => l(() => {
					c.abort(), a(new G("timeout"));
				}), r), Promise.resolve().then(() => {
					if (o) throw new G("cancelled");
					return n(c.signal);
				}).then((e) => l(() => i(e)), (e) => l(() => a(e)));
			});
		}
	};
}
// svelte/features/sandboxes/session.ts
var q = () => ({
	data: null,
	loading: !1,
	readError: "",
	phase: "idle",
	operation: null,
	target: "",
	error: "",
	logs: {},
	candidates: [],
	created: null
}), J = (e) => JSON.stringify([
	e.id,
	e.name,
	e.vm_id,
	e.state,
	e.ready
]);
function Me(e, t, n, r, i = {}) {
	let a = i.clock ?? W, o = _(q()), s = K(a), c = K(a), l = !0, u = !0, d = !1, f = !1, p = !1, m = 0, h = 0, g = null, v = null, y = null, x = null;
	function S(e) {
		e !== null && a.cancel(e);
	}
	function C() {
		S(x), x = null;
	}
	function w(e = !1) {
		d = !0, f ||= e, m++, s.cancel(), v = null, h++, g = null, c.cancel(), C(), S(y), y = null, o.set({
			...q(),
			readError: "denied"
		});
	}
	function T() {
		let e = g?.result?.id ?? null;
		g = null, C(), o.update((t) => ({
			...t,
			phase: "idle",
			operation: null,
			target: "",
			error: "",
			candidates: [],
			created: e
		}));
	}
	function E() {
		let e = b(o).data, t = g;
		if (!e || !t) return;
		if (t.kind === "create") {
			t.ack && t.result && e.sandboxes.some((e) => e.id === t.result.id && e.vm_id === t.result.vm_id && e.name === t.result.name) ? T() : t.ack || o.update((n) => ({
				...n,
				candidates: e.sandboxes.filter((e) => !t.baseline.has(e.id)).map((e) => e.id)
			}));
			return;
		}
		let n = e.sandboxes.find((e) => e.id === t.id);
		n ? t.kind !== "remove" && (t.ack && (t.kind === "start" && n.state === "running" || t.kind === "pause" && n.state === "paused") || t.kind === "setup" && t.ack && n.ready) && T() : (c.cancel(), T());
	}
	function D() {
		S(y), y = null;
		let e = b(o).data;
		l && u && p && e?.sandboxes.some((e) => le(e.state, e.ready)) && (y = a.schedule(() => {
			y = null, O();
		}, ue));
	}
	function O(a = !1) {
		if (!l || !u) return Promise.resolve();
		if (v && !a) return v;
		a && (m++, s.cancel(), v = null), S(y), y = null;
		let c = ++m;
		o.update((e) => ({
			...e,
			loading: !0,
			readError: ""
		}));
		let p = s.run((r) => U(n, e, r, f, () => n.sandboxes(t, r)), P).then((e) => {
			l && c === m && (d = !1, f = !1, o.update((t) => ({
				...t,
				data: e,
				loading: !1,
				readError: ""
			})), r.authorize(), r.sync(e.connected, e.claude), E(), D());
		}, (e) => {
			if (!l || c !== m) return;
			let t = e instanceof B && [401, 403].includes(e.status);
			t && (d = !0), V(e) ? (w(!0), i.onUnauthorized?.()) : e instanceof B && e.status === 403 && (w(), i.onMembershipDenied?.()), o.update((e) => ({
				...e,
				...t ? { data: null } : {},
				loading: !1,
				readError: t ? "denied" : "read-failed"
			}));
		}).finally(() => {
			c === m && (v = null);
		});
		return v = p, p;
	}
	async function k(s, f, p) {
		let m = b(o).data;
		if (!l || !u || d || !(i.current?.() ?? !0) || !(i.allowMutation?.() ?? !0) || g || !m || r.account !== e || !r.current() || ["pending", "unconfirmed"].includes(b(r.state).phase) || s !== "create" && !m.sandboxes.some((e) => e.id === f)) return;
		let _ = {
			kind: s,
			id: f,
			baseline: new Set(m.sandboxes.map((e) => e.id)),
			ack: !1,
			sequence: ++h
		};
		g = _, o.update((e) => ({
			...e,
			phase: "pending",
			operation: s,
			target: f,
			error: "",
			candidates: [],
			created: null
		}));
		try {
			let e = await c.run((e) => s === "create" ? n.create(t, p, e) : s === "setup" ? n.setup(f, e) : s === "remove" ? n.remove(f, e) : n.power(f, s, e), s === "setup" ? de : P);
			if (!l || g !== _ || _.sequence !== h) return;
			if (_.ack = !0, s === "create" && "id" in e && (_.result = e), s === "setup" && "log" in e && (o.update((t) => ({
				...t,
				logs: {
					...t.logs,
					[f]: e.log
				}
			})), !e.ok)) {
				g = null, o.update((e) => ({
					...e,
					phase: "error",
					error: "setup-incomplete"
				})), i.onChanged?.(), await O(!0);
				return;
			}
			i.onChanged?.(), await O(!0), l && g === _ && (x = a.schedule(() => {
				x = null, l && g === _ && o.update((e) => ({
					...e,
					phase: "unconfirmed",
					error: "canonical-unconfirmed"
				}));
			}, 1e4));
		} catch (e) {
			if (!l || g !== _ || _.sequence !== h) return;
			if (V(e)) {
				w(), r.deny(), i.onUnauthorized?.();
				return;
			}
			if (s === "create" && e instanceof B && e.status === 403) {
				w(), i.onMembershipDenied?.();
				return;
			}
			let t = e instanceof B && (s === "create" ? ce(e.status, e.message) : [
				401,
				403,
				404
			].includes(e.status));
			t && (g = null), o.update((e) => ({
				...e,
				phase: t ? "error" : "unconfirmed",
				error: t ? "action-refused" : "unconfirmed"
			})), t || (i.onChanged?.(), await O(!0));
		}
	}
	return {
		account: e,
		roomId: t,
		state: o,
		refresh: O,
		deny: w,
		current: () => l && u && !d && (i.current?.() ?? !0),
		authorize(e) {
			l && u !== e && (u = e, e || (h++, g = null, c.cancel(), C(), p = !1, m++, s.cancel(), v = null, S(y), y = null, o.update((e) => ({
				...e,
				data: null,
				loading: !1,
				readError: "denied",
				phase: "idle",
				operation: null,
				target: "",
				logs: {},
				error: "",
				candidates: []
			}))));
		},
		visible(e) {
			l && p !== e && (p = e, e ? O() : (S(y), y = null, g || (m++, s.cancel(), v = null, o.update((e) => ({
				...e,
				loading: !1
			})))));
		},
		create(e = "") {
			return k("create", "", e);
		},
		power(e, t, n) {
			let r = b(o).data?.sandboxes.find((t) => t.id === e);
			return !r || J(r) !== n ? Promise.resolve() : k(t, e, "");
		},
		setup(e, t) {
			let n = b(o).data?.sandboxes.find((t) => t.id === e);
			return !n || J(n) !== t ? Promise.resolve() : k("setup", e, "");
		},
		remove(e, t) {
			let n = b(o).data?.sandboxes.find((t) => t.id === e);
			return !n || J(n) !== t ? Promise.resolve() : k("remove", e, "");
		},
		review() {
			l && b(o).phase === "unconfirmed" && (h++, g = null, C(), c.cancel(), o.update((e) => ({
				...e,
				phase: "idle",
				operation: null,
				target: "",
				error: "",
				candidates: []
			})));
		},
		dispose() {
			l = !1, u = !1, p = !1, m++, h++, g = null, C(), S(y), y = null, s.cancel(), c.cancel(), v = null, o.set(q());
		}
	};
}
// svelte/features/sandboxes/copy.ts
var Ne = {
	unnamed: "Sem nome",
	costUnknown: "Estimativa indisponível",
	running: "rodando",
	stopped: "parado",
	paused: "pausado",
	starting: "ligando",
	pausing: "pausando",
	deleted: "apagado no Freestyle",
	unknown: "estado desconhecido",
	creating: "criando",
	error: "erro",
	title: "Sandboxes",
	description: "Seu Claude rodando na nuvem, com uma máquina por sala.",
	key: "Chave do Freestyle",
	token: "Token do Claude",
	connected: "conectado",
	missing: "não configurado",
	save: "Salvar",
	remove: "Remover",
	create: "Criar sandbox",
	name: "Nome (opcional)",
	pause: "Pausar",
	start: "Ligar",
	setup: "Rodar setup",
	terminal: "Terminal",
	log: "Ver log",
	cancel: "Cancelar",
	close: "Fechar",
	refresh: "Atualizar",
	loading: "carregando…",
	empty: "Nenhum sandbox nesta sala.",
	readFailed: "Não deu para carregar seus sandboxes.",
	failed: "Não foi possível concluir. Confira os dados e tente novamente.",
	unconfirmed: "Ainda sem confirmação. Confira o estado atual antes de tentar novamente.",
	reviewed: "Conferi o estado atual",
	pending: "Aguardando confirmação…",
	setupPending: "Preparando a máquina. Isso pode levar alguns minutos.",
	removeTitle: "Remover sandbox?",
	removeBody: "A máquina e seus arquivos serão apagados. Esta ação não pode ser desfeita.",
	credentialRemoveTitle: "Remover credencial?",
	credentialRemoveBody: "Esta credencial deixará de estar disponível para seus sandboxes.",
	removeKeyBody: "Os sandboxes continuam no Freestyle, mas o vibebook não poderá ligar, pausar ou abrir o terminal sem a chave.",
	removeTokenBody: "Sandboxes que já têm o token continuam logados até você apagá-los.",
	costHelp: "Um agent na nuvem para esta sala, configurado por agents/<nome>.md nos arquivos. Rodando custa cerca de US$0,13/hora na sua conta; pausado, só o disco.",
	secretHelp: "A credencial é enviada apenas para a configuração da sua conta e não é exibida novamente.",
	keyHelp: "Crie sua chave na API do Freestyle.",
	tokenHelp: "Gere um token com claude setup-token e cole aqui.",
	saved: "Credencial salva.",
	removed: "Credencial removida.",
	uncertainCreate: "Há novas máquinas na lista. Confira se sua solicitação foi aplicada antes de criar outra.",
	terminalLoading: "Abrindo terminal…",
	terminalConnecting: "Conectando…",
	terminalConnected: "conectado",
	terminalDisconnected: "Conexão encerrada. Feche e abra o terminal para conectar novamente.",
	terminalExited: "O comando terminou.",
	terminalFailed: "Não foi possível abrir o terminal. Confira a máquina antes de tentar novamente.",
	terminalHelp: "Terminal interativo da sua máquina. As teclas abaixo também funcionam no celular.",
	logsEmpty: "Nenhum log disponível.",
	createLimit: "Até 3 sandboxes por pessoa nesta sala.",
	keyRequired: "Configure a chave do Freestyle para criar uma máquina.",
	copy: "Copiar",
	copyFailed: "Não deu para copiar. Selecione e copie o texto.",
	copied: "Copiado"
}, Pe = {
	unnamed: "Unnamed",
	costUnknown: "Estimate unavailable",
	running: "running",
	stopped: "stopped",
	paused: "paused",
	starting: "starting",
	pausing: "pausing",
	deleted: "deleted in Freestyle",
	unknown: "unknown state",
	creating: "creating",
	error: "error",
	title: "Sandboxes",
	description: "Your Claude running in the cloud, with a machine for each room.",
	key: "Freestyle key",
	token: "Claude token",
	connected: "connected",
	missing: "not configured",
	save: "Save",
	remove: "Remove",
	create: "Create sandbox",
	name: "Name (optional)",
	pause: "Pause",
	start: "Start",
	setup: "Run setup",
	terminal: "Terminal",
	log: "View log",
	cancel: "Cancel",
	close: "Close",
	refresh: "Refresh",
	loading: "loading…",
	empty: "No sandboxes in this room.",
	readFailed: "Could not load your sandboxes.",
	failed: "Could not complete the action. Check the details and try again.",
	unconfirmed: "Not confirmed yet. Review the current state before trying again.",
	reviewed: "I reviewed the current state",
	pending: "Waiting for confirmation…",
	setupPending: "Preparing the machine. This can take a few minutes.",
	removeTitle: "Remove sandbox?",
	removeBody: "The machine and its files will be deleted. This cannot be undone.",
	credentialRemoveTitle: "Remove credential?",
	credentialRemoveBody: "This credential will no longer be available to your sandboxes.",
	removeKeyBody: "The sandboxes remain in Freestyle, but Vibebook cannot start, pause or open their terminal without the key.",
	removeTokenBody: "Sandboxes that already have the token remain logged in until you delete them.",
	costHelp: "A cloud agent for this room, configured by agents/<name>.md in Files. Running costs about US$0.13/hour on your account; paused machines only cost disk storage.",
	secretHelp: "The credential is sent only to your account configuration and is never displayed again.",
	keyHelp: "Create your key in the Freestyle API.",
	tokenHelp: "Generate a token with claude setup-token and paste it here.",
	saved: "Credential saved.",
	removed: "Credential removed.",
	uncertainCreate: "New machines appeared in the list. Check whether your request was applied before creating another.",
	terminalLoading: "Opening terminal…",
	terminalConnecting: "Connecting…",
	terminalConnected: "connected",
	terminalDisconnected: "Connection closed. Close and reopen the terminal to connect again.",
	terminalExited: "The command finished.",
	terminalFailed: "Could not open the terminal. Check the machine before trying again.",
	terminalHelp: "Interactive terminal for your machine. The keys below also work on mobile.",
	logsEmpty: "No log available.",
	createLimit: "Up to 3 sandboxes per person in this room.",
	keyRequired: "Configure the Freestyle key to create a machine.",
	copy: "Copy",
	copyFailed: "Could not copy. Select and copy the text.",
	copied: "Copied"
}, Y = (e, t) => (e === "en" ? Pe : Ne)[t], Fe = /* @__PURE__ */ new Set([
	"running",
	"stopped",
	"paused",
	"starting",
	"pausing",
	"deleted",
	"unknown",
	"creating",
	"error"
]);
function Ie(e, t) {
	return e && Fe.has(e) ? Y(t, e) : e ? `${Y(t, "unknown")} (${e})` : Y(t, "unknown");
}
// svelte/lib/ui/cssColor.ts
function X(e, t) {
	let n = e.createElement("canvas");
	n.width = n.height = 1;
	let r = n.getContext("2d", { willReadFrequently: !0 });
	if (!r) throw Error("Color conversion unavailable");
	r.fillStyle = "rgb(1, 2, 3)", r.fillStyle = t;
	let i = r.fillStyle;
	if (r.fillStyle = "rgb(4, 5, 6)", r.fillStyle = t, i !== r.fillStyle) throw Error("Color conversion failed");
	return r.clearRect(0, 0, 1, 1), r.fillRect(0, 0, 1, 1), r.getImageData(0, 0, 1, 1).data;
}
function Le(e, t) {
	let [n, r, i, a] = X(e, t);
	return `rgba(${n}, ${r}, ${i}, ${a / 255})`;
}
function Re(e, t) {
	let [n, r, i] = X(e, t);
	return `#${[
		n,
		r,
		i
	].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
// svelte/features/sandboxes/terminalProtocol.ts
var ze = {
	Esc: "\x1B",
	Tab: "	",
	"Ctrl-C": "",
	"↑": "\x1B[A",
	"↓": "\x1B[B",
	"←": "\x1B[D",
	"→": "\x1B[C",
	"/": "/"
}, Z = (e) => [
	"127.0.0.1",
	"localhost",
	"[::1]"
].includes(e);
function Be(e, t, n) {
	let r = new URL(e), i = new URL(t), a = `/v5/vms/${encodeURIComponent(n)}/pty`, o = r.protocol === "wss:" && r.hostname === "api.freestyle.sh" && !r.port && r.pathname === a, s = Z(i.hostname) && Z(r.hostname) && ["http:", "https:"].includes(i.protocol) && ["ws:", "wss:"].includes(r.protocol) && r.pathname.endsWith(a);
	if (!o && !s || r.username || r.password || r.hash || r.searchParams.get("slug") !== "claude" || !r.searchParams.get("exec")) throw Error("Invalid terminal endpoint");
	return r;
}
function Ve(e) {
	let t = new TextEncoder().encode(e);
	if (!t.length || t.length > 65536) throw Error("Invalid terminal credential");
	let n = "";
	for (let e of t) n += String.fromCharCode(e);
	return ["freestyle-pty", `freestyle-identity.${btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`];
}
var He = (e, t) => Number.isSafeInteger(e) && e >= 2 && Number.isSafeInteger(t) && t >= 1;
function Ue(e) {
	if (typeof e != "string" || e.length > 65536) return null;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" || !("type" in t) ? null : t.type === "sessionInfo" ? "connected" : t.type === "exited" ? "exited" : t.type === "error" ? "error" : null;
	} catch {
		return null;
	}
}
// svelte/features/agents/runner.ts
var We = "http://127.0.0.1:47321", Ge = D({ rooms: T(E()) }), Q = D({
	folder: w(C(E())),
	home: w(C(E())),
	how: w(C(E()))
}), Ke = D({ error: w(E()) });
async function qe() {
	if (typeof navigator > "u" || !navigator.permissions) return null;
	try {
		let e = Reflect.get(navigator.permissions, "query");
		if (typeof e != "function") return null;
		let t = await Reflect.apply(e, navigator.permissions, [{ name: "local-network-access" }]);
		return typeof t != "object" || !t || !("state" in t) ? null : t.state === "granted" || t.state === "denied" || t.state === "prompt" ? t.state : null;
	} catch {
		return null;
	}
}
var $ = () => ({
	where: null,
	available: !1,
	rooms: [],
	probing: !1,
	focusing: !1,
	focusError: !1,
	focusBlocked: !1
});
function Je(e = {}) {
	let t = e.fetcher ?? fetch, n = e.clock ?? W, r = _($()), i = K(n), a = K(n), o = !0, s = "", c = 0, l = 0, u = -Infinity, d = -Infinity, f = null;
	async function p(e, n, r) {
		try {
			let i = await t(We + e, {
				credentials: "omit",
				cache: "no-store",
				signal: r
			});
			if (!i.ok) return null;
			let a = await i.json();
			return n.parse(a);
		} catch {
			return null;
		}
	}
	return {
		state: r,
		probe(e, t, a) {
			if (!o) return Promise.resolve();
			let l = JSON.stringify([e, t]);
			if (l === s && f) return f;
			let m = l !== s || n.now() - u >= 2e4, h = a && n.now() - d >= 2e4;
			if (!m && !h) return f ?? Promise.resolve();
			s = l;
			let g = ++c;
			i.cancel(), r.update((e) => ({
				...e,
				probing: !0
			}));
			let _ = i.run((n) => Promise.all([m ? p(`/where?room=${encodeURIComponent(e)}&title=${encodeURIComponent(t)}`, Q, n) : Promise.resolve(b(r).where), h ? p("/ping", Ge, n) : Promise.resolve(null)]), 1e4).then(([e, t]) => {
				o && g === c && (m && (u = n.now()), h && (d = n.now()), r.update((n) => ({
					...n,
					where: e,
					...h ? {
						rooms: t?.rooms ?? [],
						available: !!t
					} : {},
					probing: !1
				})));
			}, () => {
				o && g === c && (m && (u = n.now()), h && (d = n.now()), r.update((e) => ({
					...e,
					probing: !1,
					...m ? { where: null } : {},
					...h ? {
						available: !1,
						rooms: []
					} : {}
				})));
			}).finally(() => {
				g === c && (f = null);
			});
			return f = _, _;
		},
		async focus(t) {
			if (!o || b(r).focusing) return;
			let n = ++l;
			if (r.update((e) => ({
				...e,
				focusing: !0,
				focusError: !1,
				focusBlocked: !1
			})), o && n === l) try {
				let { result: i, permission: s } = await a.run(async (r) => {
					let i = await p(`/focus?room=${encodeURIComponent(t)}`, Ke, r);
					if (!o || n !== l) return {
						result: i,
						permission: null
					};
					let a = null;
					if (!i) try {
						a = await (e.permission ?? qe)();
					} catch {}
					return {
						result: i,
						permission: a
					};
				}, 1e4);
				o && n === l && r.update((e) => ({
					...e,
					focusing: !1,
					focusError: !i || !!i.error,
					focusBlocked: !i && (s === "denied" || s === "prompt")
				}));
			} catch {
				o && n === l && r.update((e) => ({
					...e,
					focusing: !1,
					focusError: !0,
					focusBlocked: !1
				}));
			}
		},
		cancel() {
			c++, l++, i.cancel(), a.cancel(), f = null, r.update((e) => ({
				...e,
				probing: !1,
				focusing: !1
			}));
		},
		dispose() {
			o = !1, c++, l++, i.cancel(), a.cancel(), f = null, s = "", u = d = -Infinity, r.set($());
		}
	};
}
function Ye(e) {
	let t = e?.folder;
	return t ? e.home && t.startsWith(e.home + "/") ? "~" + t.slice(e.home.length) : t : "";
}
// svelte/features/agents/roomCopy.ts
var Xe = {
	title: "Seus agents nesta sala",
	local: "Claude Code no seu computador",
	localHelp: "Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.",
	on: "ligado",
	off: "desligado",
	listening: "ouvindo esta sala",
	working: "trabalhando agora",
	notListening: "ainda não está ouvindo",
	turnOn: "Ligar agent",
	turnOff: "Desligar agent",
	focus: "Ir pro seu agent no herdr",
	focusFailed: "O vibebook herdr não está rodando nesta máquina.",
	focusBlocked: "O navegador bloqueou o acesso a este computador: clique no cadeado ao lado do endereço, libere \"Rede local\" (ou \"Apps neste dispositivo\") e recarregue.",
	newFolder: "pasta nova",
	queue: "Fila do seu agent",
	queueEmpty: "Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.",
	blocked: "espera você no terminal",
	doing: "fazendo",
	queued: "na fila",
	dismiss: "Tirar da fila (já resolvido)",
	more: "Mostrar mais",
	less: "Mostrar menos",
	connected: "Conectados",
	pending: "Aguardando confirmação…",
	failed: "Não foi possível concluir. Tente novamente.",
	readFailed: "Não deu para carregar os agents desta sala.",
	retry: "Tentar novamente",
	unconfirmed: "Ainda sem confirmação. Confira o estado atual antes de tentar novamente.",
	reviewed: "Conferi o estado atual",
	main: "sala principal",
	close: "Fechar",
	setupDone: "Seu agent está conectado.",
	listeningDone: "Seu agent está ouvindo esta sala.",
	opening: "Abrindo seu agent no seu computador…",
	openingHelp: "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.",
	late: "Seu agent ainda não está ouvindo.",
	lateHelp: "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá.",
	absent: "Seu agent não está nesta sala.",
	absentHelp: "Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.",
	starting: "Começando a sala",
	roomCreated: "Sala criada",
	alone: "Só você aqui: convide em Pessoas",
	members: "Na sala",
	connectFirst: "Conecte seu agent (o card acima diz como)",
	here: "Seu agent está aqui",
	agentOff: "Seu agent está desligado nesta sala",
	docNext: "O agent escreve o doc e cria os épicos",
	ask: "Seu agent espera você",
	view: "Ver",
	welcome: "Bem-vindo a",
	welcomeBody: "te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.",
	ownAgent: "Cada um traz o seu agent",
	ownAgentBody: "Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que você escreve é instrução pra ele: o resto ele lê como contexto.",
	context: "O contexto é de todo mundo",
	contextBody: "Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.",
	connect: "Conecte o seu agent",
	connectBody: "Cole isto no Claude Code, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.",
	back: "Voltar",
	skip: "Pular",
	next: "Próximo",
	enter: "Entrar na sala",
	folder: "pasta da sala",
	usedFolder: "a pasta onde ele já abriu antes",
	bound: "ligada a esta sala pelo arquivo .vibebook",
	slug: "a pasta com o nome da sala",
	unknownUse: "sem horário de uso"
}, Ze = {
	title: "Your agents in this room",
	local: "Claude Code on your computer",
	localHelp: "Opens (or closes) your Claude Code for this room through Vibebook herdr on your computer.",
	on: "on",
	off: "off",
	listening: "listening to this room",
	working: "working now",
	notListening: "not listening yet",
	turnOn: "Turn agent on",
	turnOff: "Turn agent off",
	focus: "Go to your agent in herdr",
	focusFailed: "Vibebook herdr is not running on this computer.",
	focusBlocked: "The browser blocked access to this computer: click the lock next to the address, allow \"Local network\" (or \"Apps on this device\") and reload.",
	newFolder: "new folder",
	queue: "Your agent's queue",
	queueEmpty: "Nothing queued: everything you asked for in this room in the past 48 hours was completed or answered.",
	blocked: "waiting for you in the terminal",
	doing: "working",
	queued: "queued",
	dismiss: "Remove from queue (already resolved)",
	more: "Show more",
	less: "Show less",
	connected: "Connected",
	pending: "Waiting for confirmation…",
	failed: "Could not complete the action. Try again.",
	readFailed: "Could not load this room's agents.",
	retry: "Retry",
	unconfirmed: "Not confirmed yet. Review the current state before trying again.",
	reviewed: "I reviewed the current state",
	main: "main room",
	close: "Close",
	setupDone: "Your agent is connected.",
	listeningDone: "Your agent is listening to this room.",
	opening: "Opening your agent on your computer…",
	openingHelp: "Vibebook herdr opens Claude Code in the room folder; this takes a few seconds.",
	late: "Your agent is not listening yet.",
	lateHelp: "Check that Vibebook herdr is running on your computer, or whether the agent stopped at a question there.",
	absent: "Your agent is not in this room.",
	absentHelp: "Paste the prompt into Claude Code: it installs the plugin and CLI and joins this room.",
	starting: "Getting the room started",
	roomCreated: "Room created",
	alone: "Only you here: invite people in People",
	members: "In the room",
	connectFirst: "Connect your agent (the card above explains how)",
	here: "Your agent is here",
	agentOff: "Your agent is off in this room",
	docNext: "The agent writes the document and creates epics",
	ask: "Your agent is waiting for you",
	view: "View",
	welcome: "Welcome to",
	welcomeBody: "invited you here. Each important conversation gets a room in Vibebook: the chat, tasks and project document stay together.",
	ownAgent: "Everyone brings their own agent",
	ownAgentBody: "You connect your agent on your computer with your permissions. It reads the room, picks up tasks, updates epics and reports what it delivered. Only what you write is an instruction for it; everything else is context.",
	context: "Context belongs to everyone",
	contextBody: "Documents, files, decisions and tasks stay in the room, and every agent reads the same context before acting. The room shows when someone hands over work or is waiting for you.",
	connect: "Connect your agent",
	connectBody: "Paste this into Claude Code inside the project folder. It installs Vibebook, joins this room and starts listening.",
	back: "Back",
	skip: "Skip",
	next: "Next",
	enter: "Enter the room",
	folder: "room folder",
	usedFolder: "the folder it opened in previously",
	bound: "linked to this room by the .vibebook file",
	slug: "the folder with the room name",
	unknownUse: "no usage time"
}, Qe = (e, t) => (e === "en" ? Ze : Xe)[t];
export { ve as A, xe as C, R as D, we as E, _e as F, be as I, me as M, ge as N, fe as O, L as P, Ae as S, Se as T, K as _, Ue as a, V as b, Ve as c, Ie as d, Y as f, W as g, G as h, ze as i, ye as j, he as k, Re as l, J as m, Je as n, He as o, Me as p, Ye as r, Be as s, Qe as t, Le as u, U as v, Ce as w, je as x, B as y };
