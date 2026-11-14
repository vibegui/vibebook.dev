import { A as e, B as t, G as n, K as r, L as i, N as a, O as o, U as s, V as c, W as l, c as u, f as d, j as f, l as p, q as m, t as h, v as g, z as _ } from "./Button-Cx7HMFHY.js";
import { $ as v, A as y, Et as b, F as x, G as S, Tt as C, Y as w, Yt as T, h as E, i as D, j as ee, lt as O, q as k, qt as A, t as j, tt as M, u as N, z as P } from "./shared-qe__81Sz.js";
import { t as te } from "./transport-DJ3z0lDb.js";
import "./index-client-RnYrC9zI.js";
import { t as F } from "./AlertDialog-DYYQX3NU.js";
import { t as I } from "./Card-CRyy0OGL.js";
import { t as L } from "./Heading-Dkd8XMpq.js";
import { t as R } from "./Icon-Ch3wLUmI.js";
import { t as z } from "./Input-D0A_t4bj.js";
import { t as B } from "./Label-CqFm2dk3.js";
import { t as ne } from "./Switch-D2TjHAc_.js";
import { t as V } from "./Textarea-CVhsww9W.js";
// svelte/features/reminders/session.ts
var H = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, U = 1e4, W = (e) => e.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-"), G = /* @__PURE__ */ new Set();
function re(e, t = H) {
	let n = D({
		draft: null,
		saving: !1,
		issue: null,
		pending: {},
		rowIssues: {}
	}), r = !0, i = 0, a = 0, o = !1, s = [], c = /* @__PURE__ */ new Map(), l = (e) => {
		c.has(e) && t.cancel(c.get(e)), c.delete(e);
	}, u = (e, t) => t.kind === "delete" ? !s.some((t) => t.id === e) : s.some((n) => n.id === e && n.enabled === t.enabled), d = (e, t) => {
		l(e), n.update((n) => {
			let r = { ...n.pending }, i = { ...n.rowIssues };
			return delete r[e], t ? i[e] = t : delete i[e], {
				...n,
				pending: r,
				rowIssues: i
			};
		});
	};
	return {
		roomId: e,
		state: n,
		sync(e) {
			if (r) {
				s = e;
				for (let [e, t] of Object.entries(j(n).pending)) t.acknowledged && u(e, t) && d(e);
			}
		},
		open(e) {
			r && (a++, n.update((t) => ({
				...t,
				draft: { ...e },
				saving: o,
				issue: null
			})));
		},
		edit(e) {
			r && n.update((t) => t.draft ? {
				...t,
				draft: {
					...t.draft,
					...e
				},
				issue: null
			} : t);
		},
		cancel() {
			r && (a++, n.update((e) => ({
				...e,
				draft: null,
				saving: o,
				issue: null
			})));
		},
		async save(t) {
			let i = j(n);
			if (!r || !i.draft || o) return;
			let s = { ...i.draft }, c = a, l = W(s.name);
			if (!l || !s.text.trim()) return;
			let u = JSON.stringify([e, l]);
			if (G.has(u)) {
				n.update((e) => ({
					...e,
					issue: {
						kind: "upload",
						detail: "upload-in-progress"
					}
				}));
				return;
			}
			G.add(u), o = !0, n.update((e) => ({
				...e,
				saving: !0,
				issue: null
			}));
			let d = () => r && c === a && !!j(n).draft;
			try {
				let e = await t({
					name: `reminders/${l}.md`,
					type: "text/markdown",
					body: s.text
				});
				if (!d()) return;
				if (!e.reminder) {
					n.update((e) => ({
						...e,
						issue: {
							kind: "upload",
							detail: "reminder-processing-unconfirmed"
						}
					}));
					return;
				}
				let r = e.reminder;
				n.update((e) => {
					if (!e.draft) return e;
					let t = W(e.draft.name) === l, n = t ? {
						...e.draft,
						name: l,
						fixed: !0
					} : e.draft;
					return r.ok ? {
						...e,
						draft: t && e.draft.text === s.text ? null : n
					} : {
						...e,
						draft: n,
						issue: {
							kind: "upload",
							detail: r.error || "failed"
						}
					};
				});
			} catch (e) {
				d() && n.update((t) => ({
					...t,
					issue: {
						kind: "upload",
						detail: e instanceof Error ? e.message : "failed"
					}
				}));
			} finally {
				G.delete(u), o = !1, r && n.update((e) => ({
					...e,
					saving: !1
				}));
			}
		},
		async mutate(e, a, o, s) {
			if (!r || j(n).pending[e]) return !1;
			let l = ++i, f = {
				sequence: l,
				kind: a,
				enabled: s,
				acknowledged: !1
			};
			n.update((t) => {
				let n = { ...t.rowIssues };
				return delete n[e], {
					...t,
					pending: {
						...t.pending,
						[e]: f
					},
					rowIssues: n
				};
			});
			let p;
			try {
				p = await o(a === "delete" ? {
					t: "reminder.delete",
					id: e
				} : {
					t: "reminder.enable",
					id: e,
					on: !!s
				});
			} catch (e) {
				p = {
					ok: !1,
					error: e instanceof Error ? e.message : "failed"
				};
			}
			return !r || j(n).pending[e]?.sequence !== l ? !1 : p.ok ? (f.acknowledged = !0, u(e, f) ? d(e) : (n.update((t) => ({
				...t,
				pending: {
					...t.pending,
					[e]: { ...f }
				}
			})), c.set(e, t.schedule(() => {
				r && j(n).pending[e]?.sequence === l && d(e, {
					kind: "unconfirmed",
					detail: "unconfirmed"
				});
			}, U))), !0) : (d(e, {
				kind: "command",
				detail: p.error
			}), !1);
		},
		dispose() {
			r = !1, a++;
			for (let e of [...c.keys()]) l(e);
		}
	};
}
// svelte/features/reminders/RemindersPanel.svelte
var ie = c("<!> ", 1), K = c("<p id=\"remErr\" role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), ae = c("<form id=\"remForm\" class=\"tw:space-y-4\"><div class=\"tw:space-y-2\"><!><!></div> <div class=\"tw:space-y-2\"><!><!></div> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), oe = c("<p role=\"status\" class=\"tw:m-0 tw:flex tw:items-start tw:gap-2 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"><!> </p>"), se = c("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), ce = c("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), le = c("<div class=\"tw:flex tw:items-start tw:gap-2\"><button type=\"button\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-1 tw:text-left tw:font-sans tw:text-sm tw:text-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:min-w-0 tw:space-y-1\"><span class=\"tw:block tw:break-words tw:font-medium\"> </span><span class=\"tw:block tw:text-xs tw:leading-5 tw:text-muted-foreground\"><!> </span></span></button></div> <!> <pre class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5\"> </pre> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2\"><!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div></div> <!> <!>", 1), ue = c("<p class=\"tw:m-0 tw:rounded-surface tw:border tw:border-dashed tw:border-border tw:p-6 tw:text-sm tw:leading-6 tw:text-muted-foreground\"> </p>"), de = c("<section tabindex=\"-1\" data-vb-native=\"\" data-reminders-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><!> <p class=\"tw:m-0 tw:max-w-prose tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p></div> <!></div> <!> <div class=\"tw:space-y-3\"></div></section> <!>", 1);
function q(e, n) {
	let c = s();
	b(n, !0);
	let D = () => p(W, "$view", j), [j, H] = u(), U = E(() => re(n.room.id)), W = U.state, G = M(w([])), q = M(null), J = M(!1), Y = M(null), X = M(null), Z = M(null), Q = M(null), fe = O(() => n.room.reminders || []), pe = O(() => n.vb.locale || "pt-BR"), me = (e) => new Date(e).toLocaleString(N(pe), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}), he = (e) => e ? e.detail === "upload-in-progress" ? n.vb.t("Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.") : e.detail === "reminder-processing-unconfirmed" ? n.vb.t("Não recebi a confirmação do agendamento. Confira antes de tentar de novo.") : ["offline", "disconnected"].includes(e.detail) ? n.vb.t("sem conexão") : e.kind === "unconfirmed" || e.detail === "timeout" ? n.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e.detail : "";
	ee(() => {
		U.sync(N(fe));
	}), a(() => U.dispose());
	function ge(e) {
		U.open(e), queueMicrotask(() => N(Q)?.focus());
	}
	function _e() {
		U.cancel(), queueMicrotask(() => N(Z)?.focus());
	}
	function ve(e) {
		v(G, N(G).includes(e) ? N(G).filter((t) => t !== e) : [...N(G), e], !0);
	}
	async function ye() {
		let e = N(q);
		e && await U.mutate(e.id, "delete", n.request) && N(q)?.id === e.id && v(J, !1);
	}
	var be = de(), $ = P(be), xe = x($), Se = x(xe), Ce = x(Se);
	L(Ce, {
		children: (e, t) => {
			A();
			var r = l();
			y((e) => i(r, e), [() => n.vb.t("Lembretes")]), _(e, r);
		},
		$$slots: { default: !0 }
	});
	var we = k(Ce, 2), Te = S(we, !0);
	T(Se);
	var Ee = k(Se, 2), De = (e) => {
		h(e, {
			id: "remNew",
			onclick: () => ge({
				name: "",
				text: ""
			}),
			get ref() {
				return N(Z);
			},
			set ref(e) {
				v(Z, e, !0);
			},
			children: (e, t) => {
				var r = ie(), a = P(r);
				R(a, { name: "plus" });
				var o = k(a, 1, !0);
				y((e) => i(o, e), [() => n.vb.t("Novo lembrete")]), _(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	f(Ee, (e) => {
		D().draft || e(De);
	}), T(xe);
	var Oe = k(xe, 2), ke = (e) => {
		I(e, {
			children: (e, t) => {
				var r = ae(), a = x(r), o = x(a);
				{
					let e = O(() => `${c}-name`);
					B(o, {
						get for() {
							return N(e);
						},
						children: (e, t) => {
							A();
							var r = l();
							y((e) => i(r, e), [() => n.vb.t("Nome")]), _(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var s = k(o);
				{
					let e = O(() => `${c}-name`), t = O(() => n.vb.t("nome, ex.: relatorio-diario"));
					z(s, {
						get id() {
							return N(e);
						},
						name: "name",
						maxlength: 60,
						required: !0,
						get readonly() {
							return D().draft.fixed;
						},
						get value() {
							return D().draft.name;
						},
						oninput: (e) => U.edit({ name: e.currentTarget.value }),
						get placeholder() {
							return N(t);
						}
					});
				}
				T(a);
				var u = k(a, 2), d = x(u);
				{
					let e = O(() => `${c}-text`);
					B(d, {
						get for() {
							return N(e);
						},
						children: (e, t) => {
							A();
							var r = l();
							y((e) => i(r, e), [() => n.vb.t("Texto do lembrete")]), _(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var p = k(d);
				{
					let e = O(() => `${c}-text`), t = O(() => n.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."));
					V(p, {
						get id() {
							return N(e);
						},
						name: "text",
						required: !0,
						get value() {
							return D().draft.text;
						},
						oninput: (e) => U.edit({ text: e.currentTarget.value }),
						get placeholder() {
							return N(t);
						},
						get ref() {
							return N(Q);
						},
						set ref(e) {
							v(Q, e, !0);
						}
					});
				}
				T(u);
				var g = k(u, 2), b = (e) => {
					var t = K(), n = S(t, !0);
					y((e) => i(n, e), [() => he(D().issue)]), _(e, t);
				};
				f(g, (e) => {
					D().issue && e(b);
				});
				var C = k(g, 2), w = x(C);
				h(w, {
					id: "remCancel",
					variant: "outline",
					onclick: _e,
					children: (e, t) => {
						A();
						var r = l();
						y((e) => i(r, e), [() => n.vb.t("Cancelar")]), _(e, r);
					},
					$$slots: { default: !0 }
				});
				var E = k(w);
				h(E, {
					id: "remSave",
					type: "submit",
					get loading() {
						return D().saving;
					},
					children: (e, t) => {
						A();
						var r = l();
						y((e) => i(r, e), [() => n.vb.t("Salvar")]), _(e, r);
					},
					$$slots: { default: !0 }
				}), T(C), T(r), m("submit", r, (e) => {
					e.preventDefault(), U.save(te(n.room.id).uploadFile);
				}), _(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	f(Oe, (e) => {
		D().draft && e(ke);
	});
	var Ae = k(Oe, 2);
	o(Ae, 21, () => N(fe), (e) => e.id, (e, t) => {
		let a = O(() => D().pending[N(t).id]), o = O(() => D().rowIssues[N(t).id]);
		I(e, {
			class: "tw:space-y-3 tw:p-4",
			children: (e, s) => {
				var u = le(), d = P(u), p = x(d), m = x(p);
				{
					let e = O(() => N(G).includes(N(t).id) ? "chevronDown" : "chevronRight");
					R(m, {
						get name() {
							return N(e);
						},
						class: "tw:mt-0.5"
					});
				}
				var b = k(m, 2), C = x(b), w = S(C, !0), E = k(C), D = x(E), ee = (e) => {
					var r = l();
					y((e) => i(r, `${(N(t).every || N(t).cron || "") ?? ""}${e ?? ""} ·`), [() => N(t).enabled && N(t).next_at ? ` · ${n.vb.t("próximo {when}", { when: me(N(t).next_at) })}` : ""]), _(e, r);
				};
				f(D, (e) => {
					N(t).error || e(ee);
				});
				var j = k(D, 1, !0);
				T(E), T(b), T(p), T(d);
				var M = k(d, 2), te = (e) => {
					var n = oe(), r = x(n);
					R(r, { name: "warning" });
					var a = k(r, 1, !0);
					T(n), y(() => i(a, N(t).error)), _(e, n);
				};
				f(M, (e) => {
					N(t).error && e(te);
				});
				var F = k(M, 2), I = S(F, !0), L = k(F, 2), z = x(L);
				B(z, {
					class: "tw:flex tw:items-center tw:gap-2",
					children: (e, r) => {
						var o = ie(), s = P(o);
						{
							let e = O(() => !!N(t).error || !!N(a));
							ne(s, {
								controlled: !0,
								get "data-rem-on"() {
									return N(t).id;
								},
								get checked() {
									return N(t).enabled;
								},
								get disabled() {
									return N(e);
								},
								onCheckedChange: (e) => {
									U.mutate(N(t).id, "enable", n.request, e);
								}
							});
						}
						var c = k(s, 1, !0);
						y((e) => i(c, e), [() => n.vb.t("Ligado")]), _(e, o);
					},
					$$slots: { default: !0 }
				});
				var V = k(z, 2), H = x(V), W = (e) => {
					h(e, {
						variant: "ghost",
						size: "sm",
						get "data-rem-edit"() {
							return N(t).id;
						},
						onclick: () => ge({
							name: N(t).name,
							text: N(t).text,
							fixed: !0
						}),
						children: (e, t) => {
							A();
							var r = l();
							y((e) => i(r, e), [() => n.vb.t("Editar")]), _(e, r);
						},
						$$slots: { default: !0 }
					});
				};
				f(H, (e) => {
					N(t).name && e(W);
				});
				var re = k(H);
				{
					let e = O(() => !!N(a));
					h(re, {
						variant: "ghost",
						size: "sm",
						get "data-rem-del"() {
							return N(t).id;
						},
						get disabled() {
							return N(e);
						},
						onclick: (e) => {
							v(q, N(t), !0), v(X, e.currentTarget, !0), v(J, !0);
						},
						children: (e, t) => {
							A();
							var r = l();
							y((e) => i(r, e), [() => n.vb.t("Apagar lembrete")]), _(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				T(V), T(L);
				var K = k(L, 2), ae = (e) => {
					var t = se(), r = S(t, !0);
					y((e) => i(r, e), [() => n.vb.t("Aguardando confirmação…")]), _(e, t);
				};
				f(K, (e) => {
					N(a) && e(ae);
				});
				var ue = k(K, 2), de = (e) => {
					var t = ce(), n = S(t, !0);
					y((e) => i(n, e), [() => he(N(o))]), _(e, t);
				};
				f(ue, (e) => {
					N(o) && e(de);
				}), y((e, n, r) => {
					g(p, "data-rem-open", N(t).id), g(p, "aria-expanded", e), g(p, "aria-controls", `${c}-content-${N(t).id}`), i(w, N(t).name ? `${N(t).name}.md` : N(t).text), i(j, n), g(F, "hidden", r), g(F, "id", `${c}-content-${N(t).id}`), i(I, N(t).text);
				}, [
					() => N(G).includes(N(t).id),
					() => n.vb.t("de {who}", { who: n.vb.name(N(t).owner) }),
					() => !N(G).includes(N(t).id)
				]), r("click", p, () => ve(N(t).id)), _(e, u);
			},
			$$slots: { default: !0 }
		});
	}, (e) => {
		var r = t(), a = P(r), o = (e) => {
			var t = ue(), r = S(t, !0);
			y((e) => i(r, e), [() => n.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), _(e, t);
		};
		f(a, (e) => {
			D().draft || e(o);
		}), _(e, r);
	}), T(Ae), T($), d($, (e) => v(Y, e), () => N(Y));
	var je = k($, 2);
	{
		let e = O(() => n.vb.t("Apagar este lembrete?")), t = O(() => N(q)?.name ? `${N(q).name}.md` : N(q)?.text), r = O(() => n.vb.t("Apagar lembrete")), i = O(() => n.vb.t("Cancelar")), a = O(() => !!(N(q) && D().pending[N(q).id])), o = O(() => N(q) ? he(D().rowIssues[N(q).id]) : "");
		F(je, {
			get title() {
				return N(e);
			},
			get description() {
				return N(t);
			},
			get confirmLabel() {
				return N(r);
			},
			get cancelLabel() {
				return N(i);
			},
			get busy() {
				return N(a);
			},
			get error() {
				return N(o);
			},
			onconfirm: () => {
				ye();
			},
			returnFocus: () => N(X)?.isConnected ? N(X) : N(Z) || N(Y),
			get open() {
				return N(J);
			},
			set open(e) {
				v(J, e, !0);
			}
		});
	}
	y((e) => i(Te, e), [() => n.vb.t("Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.")]), _(e, be), C(), H();
}
n(["click"]);
// svelte/Reminders.svelte
function J(n, r) {
	b(r, !0);
	var i = t(), a = P(i);
	e(a, () => r.room.id, (e) => {
		q(e, {
			get room() {
				return r.room;
			},
			get vb() {
				return r.vb;
			},
			get request() {
				return r.request;
			}
		});
	}), _(n, i), C();
}
export { J as default };
