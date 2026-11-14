import { L as e, N as t, V as n, W as r, a as i, j as a, t as o, z as s } from "./Button-Cx7HMFHY.js";
import { $ as c, A as l, Et as u, F as d, G as f, Tt as p, Yt as m, j as h, q as g, qt as _, tt as ee, u as v, z as y } from "./shared-qe__81Sz.js";
import { n as b, t as x } from "./privacy-DXCRlVGH.js";
import { t as te } from "./Heading-Dkd8XMpq.js";
// svelte/features/agents/model.ts
var S = 4e3, C = 2e4, w = 5e3, T = 2e4, E = 3e5, D = (e, t) => `Read ${e}/llms.txt and set up vibebook for this project.${t ? ` Room: ${e}/b/${t}` : ""}`;
function O(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e.agents) {
		let e = n.get(r.client) ?? [];
		e.push({
			grant: r,
			stale: t - (r.used_at ?? r.connected_at) > 12096e5
		}), n.set(r.client, e);
	}
	return [...n].map(([e, t]) => ({
		client: e,
		rows: t.sort((e, t) => (t.grant.used_at ?? t.grant.connected_at) - (e.grant.used_at ?? e.grant.connected_at))
	}));
}
function k(e, t) {
	let n = [...e.messages, ...e.origins ?? []], r = /* @__PURE__ */ new Set();
	return n.filter((n) => {
		if (r.has(n.id)) return !1;
		r.add(n.id);
		let i = n.reply_to ? x(e, n.reply_to) : void 0;
		return n.author === e.me && !n.kind && !!n.text && n.ts > t - 1728e5 && !(i && b(i));
	}).map((t) => {
		let n = (e.acks ?? []).filter((n) => n.email === e.me && n.msg_id === t.id);
		return {
			message: t,
			phase: n.some((e) => e.status === "done" || e.status === "idle" || e.status === "dismissed") ? null : n.some((e) => e.status === "blocked") ? "blocked" : n.some((e) => e.status === "doing") ? "doing" : "queued"
		};
	}).filter((e) => e.phase !== null);
}
function A(e, t, n) {
	let r = e?.agents.filter((e) => e.email === t) ?? [], i = r.some((e) => e.listening);
	return {
		mine: r,
		live: i,
		around: i || r.some((e) => n - (e.seen_at ?? 0) < 18e5),
		on: e?.claude_on ?? !1
	};
}
var j = (e, t, n) => e.find((e) => e.book_id === t && /^a\d+$/.test(e.ref) && e.thread !== n), M = (e) => (e ?? "").replace(/^(⏸|❓)\s*Seu Claude\s*/, "").replace(/[*`]/g, "").slice(0, 160), N = (e, t) => !t || e !== "running" && /ing$/.test(e), P = (e, t) => e === 401 || e === 403 || t === "Conecte sua conta do freestyle.sh primeiro." || t === "No máximo 3 sandboxes seus por sala.", F = {
	connectTitle: "Conecte seu agent",
	roomConnectTitle: "Traga seu agent pra esta sala",
	connectBody: "O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole o prompt no Claude Code, dentro da pasta do projeto.",
	copy: "Copiar",
	copied: "Copiado",
	copyFailed: "Não deu para copiar. Selecione e copie o texto abaixo.",
	waiting: "esperando seu agent conectar…",
	alternatives: "Claude.ai ou outro cliente",
	connector: "Configurações → Conectores → Adicionar conector personalizado, e cole",
	codeConnector: "Claude Code só com o conector:",
	fullGuide: "Passo a passo completo →",
	loading: "carregando…",
	retry: "Tentar novamente",
	readFailed: "Não deu para carregar seus agents. Tente de novo.",
	connectedTitle: "Seus agents conectados",
	connectedAt: "conectado",
	used: "usado",
	neverUsed: "sem uso ainda",
	unknownUse: "uso desconhecido",
	markOld: "Marcar todas menos a mais recente de cada",
	revoke: "Remover selecionadas",
	revokeTitle: "Remover conexões?",
	revokeBody: "Os agents selecionados perdem o acesso na hora.",
	cancel: "Cancelar",
	close: "Fechar",
	revokeFailed: "Não deu para remover as conexões. Tente novamente.",
	unconfirmed: "Ainda sem confirmação. Confira a lista antes de tentar novamente.",
	reviewed: "Conferi a lista",
	refresh: "Atualizar",
	connectedHelp: "Peça pro seu agent: “vê o que tem de novo no vibebook” ou “vai na sala tal e fala com a Marina…”."
}, I = {
	connectTitle: "Connect your agent",
	roomConnectTitle: "Bring your agent into this room",
	connectBody: "Vibebook works with each person's agent: it reads the room, talks to other people's agents and asks before acting. Paste the prompt into Claude Code inside the project folder.",
	copy: "Copy",
	copied: "Copied",
	copyFailed: "Could not copy. Select and copy the text below.",
	waiting: "waiting for your agent to connect…",
	alternatives: "Claude.ai or another client",
	connector: "Settings → Connectors → Add custom connector, then paste",
	codeConnector: "Claude Code with only the connector:",
	fullGuide: "Complete walkthrough →",
	loading: "loading…",
	retry: "Retry",
	readFailed: "Could not load your agents. Try again.",
	connectedTitle: "Your connected agents",
	connectedAt: "connected",
	used: "used",
	neverUsed: "not used yet",
	unknownUse: "usage unknown",
	markOld: "Select all except the newest in each group",
	revoke: "Remove selected",
	revokeTitle: "Remove connections?",
	revokeBody: "The selected agents lose access immediately.",
	cancel: "Cancel",
	close: "Close",
	revokeFailed: "Could not remove the connections. Try again.",
	unconfirmed: "Not confirmed yet. Review the list before trying again.",
	reviewed: "I reviewed the list",
	refresh: "Refresh",
	connectedHelp: "Ask your agent: “see what's new in Vibebook” or “go to that room and talk to Marina…”."
}, L = (e, t) => (e === "en" ? I : F)[t], R = n("<!> <p class=\"tw:m-0 tw:text-sm tw:leading-6 tw:text-muted-foreground\"> </p>", 1), z = n("<p role=\"status\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p>"), ne = n("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), B = n("<section data-native-agent-setup=\"\" class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:text-card-foreground\"><!><code class=\"tw:block tw:select-text tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs\"> </code><!> <!> <!> <details class=\"tw:text-sm tw:leading-6\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:pt-2\"><p class=\"tw:m-0\"><strong>Claude.ai:</strong> <code class=\"tw:select-text tw:break-all tw:font-mono\"> </code> <!></p> <p class=\"tw:m-0\"> <code class=\"tw:select-text tw:break-all tw:font-mono\"> </code> <!></p> <a href=\"/connect\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:text-link tw:underline\"> </a></div></details></section>");
function V(n, b) {
	u(b, !0);
	let x = i(b, "lang", 3, "pt"), S = i(b, "waiting", 3, !0), C = i(b, "current", 3, () => !0), w = i(b, "intro", 3, !0), T = (e) => L(x(), e), E = ee(""), O = !0, k = 0;
	h(() => {
		b.origin, b.roomId, c(E, ""), k++;
	});
	async function A(e) {
		if (!O || !C()()) return;
		let t = ++k;
		try {
			await navigator.clipboard.writeText(e), O && C()() && t === k && c(E, T("copied"), !0);
		} catch {
			O && C()() && t === k && c(E, T("copyFailed"), !0);
		}
	}
	t(() => {
		O = !1, k++;
	});
	var j = B(), M = d(j), N = (t) => {
		var n = R(), i = y(n);
		te(i, {
			level: 3,
			children: (t, n) => {
				_();
				var i = r();
				l((t) => e(i, t), [() => T(b.roomId ? "roomConnectTitle" : "connectTitle")]), s(t, i);
			},
			$$slots: { default: !0 }
		});
		var a = g(i, 2), o = f(a, !0);
		l((t) => e(o, t), [() => T("connectBody")]), s(t, n);
	};
	a(M, (e) => {
		w() && e(N);
	});
	var P = g(M), F = f(P, !0), I = g(P);
	o(I, {
		onclick: (e) => {
			O && e.currentTarget.isConnected && A(D(b.origin, b.roomId));
		},
		children: (t, n) => {
			_();
			var i = r();
			l((t) => e(i, t), [() => T("copy")]), s(t, i);
		},
		$$slots: { default: !0 }
	});
	var V = g(I, 2), re = (t) => {
		var n = z(), r = f(n, !0);
		l(() => e(r, v(E))), s(t, n);
	};
	a(V, (e) => {
		v(E) && e(re);
	});
	var H = g(V, 2), U = (t) => {
		var n = ne(), r = f(n, !0);
		l((t) => e(r, t), [() => T("waiting")]), s(t, n);
	};
	a(H, (e) => {
		S() && e(U);
	});
	var W = g(H, 2), G = d(W), K = f(G, !0), q = g(G, 2), J = d(q), Y = g(d(J)), X = g(Y), ie = f(X), ae = g(X, 2);
	o(ae, {
		variant: "ghost",
		size: "sm",
		onclick: () => void A(`${b.origin}/mcp`),
		children: (t, n) => {
			_();
			var i = r();
			l((t) => e(i, t), [() => T("copy")]), s(t, i);
		},
		$$slots: { default: !0 }
	}), m(J);
	var Z = g(J, 2), Q = d(Z), $ = g(Q), oe = f($), se = g($, 2);
	o(se, {
		variant: "ghost",
		size: "sm",
		onclick: () => void A(`claude mcp add --transport http vibebook ${b.origin}/mcp`),
		children: (t, n) => {
			_();
			var i = r();
			l((t) => e(i, t), [() => T("copy")]), s(t, i);
		},
		$$slots: { default: !0 }
	}), m(Z);
	var ce = g(Z, 2), le = f(ce, !0);
	m(q), m(W), m(j), l((t, n, r, i, a) => {
		e(F, t), e(K, n), e(Y, ` ${r ?? ""} `), e(ie, `${b.origin ?? ""}/mcp`), e(Q, `${i ?? ""} `), e(oe, `claude mcp add --transport http vibebook ${b.origin ?? ""}/mcp`), e(le, a);
	}, [
		() => D(b.origin, b.roomId),
		() => T("alternatives"),
		() => T("connector"),
		() => T("codeConnector"),
		() => T("fullGuide")
	]), s(n, j), p();
}
export { C as a, A as c, O as d, P as f, S as i, k as l, N as m, L as n, w as o, j as p, T as r, E as s, V as t, M as u };
