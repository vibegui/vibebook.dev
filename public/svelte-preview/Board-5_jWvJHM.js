import { A as e, B as t, G as n, K as r, L as i, N as a, O as o, S as s, U as c, V as l, W as u, i as d, j as f, o as p, q as m, s as h, t as g, v as _, w as ee, x as v, z as y } from "./Button-Cx7HMFHY.js";
import { $ as b, A as x, An as S, Et as C, F as w, G as T, Tt as E, Y as D, Yt as O, h as k, j as A, lt as j, m as te, q as M, qt as N, tt as P, u as F, z as I } from "./shared-qe__81Sz.js";
import { m as L } from "./room--oeUdBsf.js";
import { t as ne } from "./Avatar-8pZy6e0J.js";
import { t as R } from "./Badge-LnHYpvr5.js";
import { t as z } from "./Icon-Ch3wLUmI.js";
import { t as re } from "./Input-D0A_t4bj.js";
import { t as ie } from "./Label-CqFm2dk3.js";
import { t as ae } from "./Select-DbV-T2ZF.js";
import { t as oe } from "./Tabs-C12ffgdc.js";
import { t as B } from "./EmptyState-ZzvnTYlt.js";
import { t as se } from "./ErrorState-CiGHe1Vk.js";
// svelte/features/board/model.ts
var V = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, H = L.map((e) => ({
	value: e,
	label: V[e]
}));
function ce(e, t) {
	let n = t === "main" || t.startsWith("pre:") ? null : t, r = n ? e.epics.find((e) => e.id === n) : null, i = n ? r ? [r] : [] : e.epics.filter((e) => !e.archived), a = [...n ? [] : [{
		id: "main",
		title: e.book?.title || "vibebook",
		tasks: e.roomTasks ?? []
	}], ...i].map((e) => ({
		id: e.id,
		title: e.title,
		tasks: e.tasks.map((t) => ({
			...t,
			epicId: e.id,
			epicTitle: e.title
		}))
	}));
	return {
		scope: n,
		missingScope: !(!n || r),
		title: r?.title ?? null,
		groups: a,
		tasks: a.flatMap((e) => e.tasks),
		targets: a.map(({ id: e, title: t }) => ({
			id: e,
			title: t
		}))
	};
}
function le() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function ue(e, t) {
	return H[H.findIndex((t) => t.value === e) + t]?.value;
}
function de(e) {
	return H.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var fe = l("<!> ", 1), pe = l("<!><span> </span>", 1), me = l("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), he = l("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), ge = l("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), _e = l("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), ve = l("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), ye = l("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), be = l("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), xe = l("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), Se = l("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), Ce = l("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function U(e, n) {
	let l = c();
	C(n, !0);
	let p = (e, t = S, a = S, o = S) => {
		var c = ge(), p = w(c), h = w(p), g = T(h, !0), C = M(h, 2), E = (e) => {
			{
				let n = j(() => `@vibe: ${t().flags.join(" · ")}`);
				R(e, {
					variant: "warning",
					get title() {
						return F(n);
					},
					children: (e, n) => {
						var r = fe(), a = I(r);
						z(a, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = M(a, 1, !0);
						x((e) => i(o, e), [() => t().flags.join(" · ")]), y(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		f(C, (e) => {
			t().flags?.length && e(E);
		});
		var D = M(C, 2), k = w(D);
		R(k, {
			children: (e, n) => {
				N();
				var r = u();
				x(() => i(r, t().epicTitle)), y(e, r);
			},
			$$slots: { default: !0 }
		});
		var A = M(k, 2), te = (e) => {
			var r = pe(), a = I(r);
			{
				let e = j(() => n.vb.name(t().owner)), r = j(() => `/api/avatar/${encodeURIComponent(t().owner)}`);
				ne(a, {
					get name() {
						return F(e);
					},
					get src() {
						return F(r);
					},
					class: "tw:size-6"
				});
			}
			var o = M(a), s = T(o, !0);
			x((e) => i(s, e), [() => t().owner === n.room.me ? n.vb.t("você") : n.vb.name(t().owner)]), y(e, r);
		};
		f(A, (e) => {
			t().owner && e(te);
		});
		var P = M(A, 2), L = (e) => {
			var n = me(), r = w(n);
			z(r, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = M(r, 1, !0);
			O(n), x(() => i(a, t().due)), y(e, n);
		};
		f(P, (e) => {
			t().due && e(L);
		}), O(D), O(p);
		var re = M(p, 2), oe = (e) => {
			var t = he(), r = w(t);
			z(r, { name: "grip" }), O(t), x((e) => _(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), y(e, t);
		};
		f(re, (e) => {
			o() || e(oe);
		});
		var B = M(re, 2), se = w(B);
		{
			let e = j(() => `${l}-${a()}`);
			ie(se, {
				get for() {
					return F(e);
				},
				children: (e, t) => {
					N();
					var r = u();
					x((e) => i(r, e), [() => n.vb.t("Status")]), y(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var V = M(se, 2);
		{
			let e = j(() => `${l}-${a()}`), r = j(() => `${n.vb.t("Status")}: ${t().title}`);
			ae(V, {
				get id() {
					return F(e);
				},
				get "aria-label"() {
					return F(r);
				},
				get value() {
					return t().status;
				},
				get items() {
					return F(Te);
				},
				onValueChange: (e) => (de(e) && je(t(), e, a()), !1)
			});
		}
		O(B), O(c), ee(c, (e, t) => ke?.(e, t), a), x((e, n, r, a) => {
			_(c, "data-board-task", t().id), _(c, "data-status", t().status), _(c, "draggable", !o()), v(c, 1, e), _(p, "data-epic", t().epicId), _(p, "aria-describedby", `${l}-keys`), v(p, 1, n), v(h, 1, r), i(g, t().title), v(B, 1, a);
		}, [
			() => s(d("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", o() && "tw:flex tw:flex-wrap tw:items-center", F(q) === t().id && "tw:opacity-50", t().status !== "done" && t().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => s(d("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !o() && "tw:pr-10")),
			() => s(d("tw:block tw:break-words tw:font-medium", t().status === "done" && "tw:line-through")),
			() => s(d("tw:min-w-32 tw:space-y-1 tw:p-3", !o() && "tw:border-t tw:border-border"))
		]), m("dragstart", c, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", t().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), b(q, t().id, !0));
		}), m("dragend", c, () => {
			b(q, null), b(K, null);
		}), r("click", p, () => n.onopen?.(t().epicId)), r("keydown", p, (e) => Pe(e, t(), a())), y(e, c);
	}, h = j(() => ce(n.room, n.thread)), L = P(D(le())), V = P(""), U = P(null), W = P(""), G = P(""), K = P(null), q = P(null), J = P(D(k(() => F(h).targets.find((e) => e.id === F(h).scope) ?? F(h).targets.find((e) => e.id !== "main") ?? F(h).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), Y = j(() => F(h).targets.some((e) => e.id === F(J).id)), we = j(() => [...F(Y) ? [] : [{
		value: F(J).id,
		label: F(J).title,
		disabled: !0
	}], ...F(h).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), Te = j(() => H.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), Ee = j(() => F(h).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), De = j(() => F(h).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), X = /* @__PURE__ */ new Map(), Z = 0, Oe = !1, Q = P(null);
	a(() => {
		Oe = !0, Z++, X.clear();
	});
	function ke(e, t) {
		return X.set(t, e), { destroy() {
			X.get(t) === e && X.delete(t);
		} };
	}
	function Ae(e) {
		try {
			if (n.send(e)) return b(W, ""), !0;
		} catch {}
		return b(W, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function je(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && X.get(n)?.contains(r) ? r : null;
		return Ae({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (b(Q, {
			id: e.id,
			status: t,
			generation: ++Z,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	A(() => {
		let e = F(Q);
		if (!e) return;
		let t = [...n.room.roomTasks ?? [], ...n.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (b(Q, null), b(G, `${t.title}: ${n.vb.t(H.find((e) => e.value === t.status)?.label ?? t.status)}`), Me(e)) : (b(Q, null), Me(e));
	});
	function Me(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || te().then(() => {
			if (Oe || e.generation !== Z || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = X.get(t.key)?.querySelector(t.selector) ?? F(U);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function Ne(e) {
		if (e === "board" || e === "list") {
			b(L, e, !0), Z++, b(Q, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Pe(e, t, n) {
		let r = e.key === "ArrowRight" ? ue(t.status, 1) : e.key === "ArrowLeft" ? ue(t.status, -1) : void 0;
		r && (e.preventDefault(), je(t, r, n));
	}
	function Fe(e, t) {
		e.preventDefault(), b(K, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = F(h).tasks.find((e) => e.id === n);
		b(q, null), r && je(r, t, `board:${r.id}`);
	}
	function Ie(e) {
		e.preventDefault(), F(V).trim() && (F(Y) ? Ae({
			t: "task.add",
			epic: F(J).id,
			title: F(V).trim()
		}) && b(V, "") : b(W, n.vb.t("Escolha um épico."), !0));
	}
	var $ = Ce(), Le = w($), Re = T(Le, !0), ze = M(Le, 2), Be = (e) => {
		{
			let t = j(() => F(h).missingScope ? n.vb.t("Épico não encontrado.") : F(Y) ? F(W) : n.vb.t("Escolha um épico."));
			se(e, {
				get title() {
					return F(t);
				},
				compact: !0
			});
		}
	};
	f(ze, (e) => {
		(F(h).missingScope || !F(Y) || F(W)) && e(Be);
	});
	var Ve = M(ze, 2), He = T(Ve, !0), Ue = M(Ve, 2), We = T(Ue, !0), Ge = M(Ue, 2);
	{
		let e = (e, r = S) => {
			var a = t(), c = I(a), l = (e) => {
				var a = t(), c = I(a), l = (e) => {
					var t = ye(), r = w(t);
					o(r, 21, () => H, (e) => e.value, (e, t) => {
						let r = j(() => F(h).tasks.filter((e) => e.status === F(t).value));
						var a = ve(), c = w(a), l = w(c, !0), f = M(l);
						R(f, {
							children: (e, t) => {
								N();
								var n = u();
								x(() => i(n, F(r).length)), y(e, n);
							},
							$$slots: { default: !0 }
						}), O(c);
						var g = M(c, 2);
						o(g, 21, () => F(r), (e) => e.id, (e, t) => {
							p(e, () => F(t), () => `board:${F(t).id}`, () => !1);
						}, (e) => {
							var r = _e(), a = T(r, !0);
							x((e) => i(a, e), [() => n.vb.t(F(t).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), y(e, r);
						}), O(g), O(a), x((e, n, r) => {
							_(a, "data-lane", F(t).value), _(a, "aria-label", e), v(a, 1, n), i(l, r);
						}, [
							() => n.vb.t(F(t).label),
							() => s(d("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", F(K) === F(t).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(F(t).label)
						]), m("dragover", a, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), b(K, F(t).value, !0));
						}), m("dragleave", a, () => {
							b(K, null);
						}), m("drop", a, (e) => Fe(e, F(t).value)), y(e, a);
					}), O(r), O(t), y(e, t);
				}, g = (e) => {
					var t = xe(), r = w(t), a = (e) => {
						var t = be(), r = w(t), a = w(r, !0), s = M(a);
						R(s, {
							variant: "warning",
							children: (e, t) => {
								N();
								var n = u();
								x(() => i(n, F(De).length)), y(e, n);
							},
							$$slots: { default: !0 }
						}), O(r);
						var c = M(r, 2);
						o(c, 17, () => F(De), (e) => e.id, (e, t) => {
							p(e, () => F(t), () => `mine:${F(t).id}`, () => !0);
						}), O(t), x((e, n) => {
							_(t, "aria-label", e), i(a, n);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), y(e, t);
					};
					f(r, (e) => {
						F(De).length && e(a);
					});
					var s = M(r, 2);
					o(s, 17, () => F(Ee), (e) => e.id, (e, t) => {
						var n = be(), r = w(n), a = w(r, !0), s = M(a);
						R(s, {
							children: (e, n) => {
								N();
								var r = u();
								x(() => i(r, F(t).tasks.length)), y(e, r);
							},
							$$slots: { default: !0 }
						}), O(r);
						var c = M(r, 2);
						o(c, 17, () => F(t).tasks, (e) => e.id, (e, t) => {
							p(e, () => F(t), () => `group:${F(t).id}`, () => !0);
						}), O(n), x(() => {
							_(n, "aria-label", F(t).title), i(a, F(t).title);
						}), y(e, n);
					}, (e) => {
						{
							let t = j(() => n.vb.t("Nenhuma tarefa aberta."));
							B(e, { get title() {
								return F(t);
							} });
						}
					}), O(t), y(e, t);
				};
				f(c, (e) => {
					r() === "board" ? e(l) : e(g, -1);
				}), y(e, a);
			};
			f(c, (e) => {
				r() === F(L) && e(l);
			}), y(e, a);
		}, r = j(() => n.vb.t("Quadro de tarefas")), a = j(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		oe(Ge, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return F(r);
			},
			get items() {
				return F(a);
			},
			get value() {
				return F(L);
			},
			onValueChange: Ne,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Ke = M(Ge, 2), qe = w(Ke), Je = w(qe);
	{
		let e = j(() => `${l}-title`);
		ie(Je, {
			get for() {
				return F(e);
			},
			children: (e, t) => {
				N();
				var r = u();
				x((e) => i(r, e), [() => n.vb.t("Nova tarefa")]), y(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var Ye = M(Je, 2);
	{
		let e = j(() => `${l}-title`), t = j(() => n.vb.t("nova tarefa"));
		re(Ye, {
			get id() {
				return F(e);
			},
			get placeholder() {
				return F(t);
			},
			get ref() {
				return F(U);
			},
			set ref(e) {
				b(U, e, !0);
			},
			get value() {
				return F(V);
			},
			set value(e) {
				b(V, e, !0);
			}
		});
	}
	O(qe);
	var Xe = M(qe, 2), Ze = (e) => {
		var t = Se(), r = w(t);
		{
			let e = j(() => `${l}-epic`);
			ie(r, {
				get for() {
					return F(e);
				},
				children: (e, t) => {
					N();
					var r = u();
					x((e) => i(r, e), [() => n.vb.t("Épico")]), y(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var a = M(r, 2);
		{
			let e = j(() => `${l}-epic`), t = j(() => !F(Y));
			ae(a, {
				get id() {
					return F(e);
				},
				get "aria-invalid"() {
					return F(t);
				},
				get items() {
					return F(we);
				},
				get value() {
					return F(J).id;
				},
				onValueChange: (e) => {
					let t = F(h).targets.find((t) => t.id === e);
					if (!t) return !1;
					b(J, t, !0), b(W, "");
				}
			});
		}
		O(t), y(e, t);
	};
	f(Xe, (e) => {
		F(h).scope || e(Ze);
	});
	var Qe = M(Xe, 2);
	{
		let e = j(() => !F(V).trim() || !F(Y));
		g(Qe, {
			type: "submit",
			get disabled() {
				return F(e);
			},
			children: (e, t) => {
				var r = fe(), a = I(r);
				z(a, { name: "plus" });
				var o = M(a, 1, !0);
				x((e) => i(o, e), [() => n.vb.t("Nova tarefa")]), y(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	O(Ke), O($), x((e, t, n) => {
		_($, "data-board-scope", F(h).scope ?? "all"), _($, "aria-label", e), i(Re, t), i(He, F(G)), _(Ue, "id", `${l}-keys`), i(We, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => F(h).title ?? (F(h).scope ? F(J).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), m("submit", Ke, Ie), y(e, $), E();
}
n(["click", "keydown"]);
// svelte/Board.svelte
var W = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function G(n, r) {
	C(r, !0);
	let i = p(r, W);
	var a = t(), o = I(a);
	e(o, () => JSON.stringify([r.room.id, r.thread]), (e) => {
		U(e, h(() => i));
	}), y(n, a), E();
}
export { G as default };
