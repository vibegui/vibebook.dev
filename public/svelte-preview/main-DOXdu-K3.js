import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Kt as m, Lt as h, Mt as g, Ot as _, Pt as v, Q as y, Qt as b, Rt as x, St as S, Tt as C, Ut as w, Vt as T, Wt as E, X as D, Xt as O, Yt as k, Z as A, Zt as ee, _t as j, a as M, bt as N, c as P, ct as F, d as te, dt as I, en as L, et as R, f as ne, ft as re, h as ie, ht as ae, i as oe, jt as z, kt as B, l as se, lt as ce, mt as le, n as ue, nn as de, nt as V, o as fe, p as pe, pt as me, q as he, r as ge, rt as _e, s as ve, st as ye, t as be, tn as xe, tt as Se, u as Ce, ut as H, vt as we, wt as Te, xt as U, yt as Ee } from "./Field-BhEsD9uL.js";
// \0rolldown/runtime.js
var De = Object.defineProperty, Oe = (e, t) => {
	let n = {};
	for (var r in e) De(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || De(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function ke(t, n) {
	let r = () => R(n.values, "$values", i), [i, a] = e();
	var s = o(), c = T(s);
	ae(c, () => n.component, (e, t) => {
		t(e, y(r));
	}), C(t, s), a();
}
// shared/uiVariant.ts
function Ae(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var je = a("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Me = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Ne = a("<section><h3 class=\"tw:m-0 tw:mb-1 tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h3> <ul class=\"tw:m-0 tw:list-none tw:divide-y tw:divide-border tw:p-0\"></ul></section>"), Pe = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a></li>"), Fe = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a></li>"), Ie = a("<div class=\"tw:flex tw:max-h-[62dvh] tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-auto tw:overscroll-contain\"><!> <!> <!></div>"), Le = a("<!> <!>", 1);
function Re(e, t) {
	b(t, !0);
	let n = (e) => {
		var n = o(), a = T(n), s = (e) => {
			var n = Ie(), a = r(n), o = (e) => {
				var n = Ne(), a = r(n), o = l(a), s = w(a, 2);
				we(s, 21, () => v(O), (e) => te(e), (e, n) => {
					var a = Me(), o = r(a), s = r(o), c = (e) => {
						var t = je(), n = r(t);
						ie(n, { name: "check" }), L(t), C(e, t);
					}, u = k(() => I(v(n)) === "task"), d = (e) => {
						{
							let r = k(() => R(v(n).author, v(n).author_name)), i = k(() => t.avatarUrl?.(v(n).author));
							p(e, {
								get name() {
									return v(r);
								},
								get src() {
									return v(i);
								}
							});
						}
					};
					U(s, (e) => {
						v(u) ? e(c) : e(d, -1);
					});
					var f = w(s, 2), m = r(f), g = r(m), y = l(g, !0), b = w(g);
					L(m);
					var S = w(m, 2), T = l(S);
					L(f), L(o);
					var E = w(o, 2), D = (e) => {
						{
							let r = k(() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), i = k(() => v(_) === te(v(n))), a = k(() => v(_) !== null);
							Ce(e, {
								icon: "check",
								get label() {
									return v(r);
								},
								class: "tw:mt-1",
								get loading() {
									return v(i);
								},
								get disabled() {
									return v(a);
								},
								onclick: () => ce(v(n))
							});
						}
					}, O = k(() => v(n).ref.startsWith("m"));
					U(E, (e) => {
						v(O) && e(D);
					}), L(a), h((e, t, r, a) => {
						H(o, "href", e), i(y, t), i(b, ` ${v(n).text ?? ""}`), i(T, `${v(x) ? `${v(n).room} › ` : ""}${r ?? ""} · ${a ?? ""}`);
					}, [
						() => ae(v(n)),
						() => I(v(n)) === "task" ? t.vb.t("Tarefa sua esperando OK:") : I(v(n)) === "agent" ? t.vb.t("Seu agent espera você:") : `${R(v(n).author, v(n).author_name).split(" ")[0]}:`,
						() => v(n).topic || t.vb.t("sala principal"),
						() => t.vb.ago(v(n).ts)
					]), z("click", o, (e) => t.onopen(v(n), e)), C(e, a);
				}), L(s), L(n), h((e) => i(o, `${e ?? ""} (${v(O).length ?? ""})`), [() => t.vb.t("Esperando você")]), C(e, n);
			};
			U(a, (e) => {
				v(O).length && e(o);
			});
			var s = w(a, 2), c = (e) => {
				var n = Ne(), a = r(n), o = l(a), s = w(a, 2);
				we(s, 21, () => v(A), (e) => `${e.book_id}:${e.msg_id}`, (e, n) => {
					var a = Pe(), o = r(a), s = r(o);
					{
						let e = k(() => R(v(n).author, v(n).author_name)), r = k(() => t.avatarUrl?.(v(n).author));
						p(s, {
							get name() {
								return v(e);
							},
							get src() {
								return v(r);
							}
						});
					}
					var c = w(s, 2), u = r(c), d = r(u), f = l(d), m = w(d);
					L(u);
					var g = w(u, 2), _ = l(g);
					L(c), L(o), L(a), h((e, t, r) => {
						H(o, "href", e), i(f, `${t ?? ""}:`), i(m, ` ${v(n).text ?? ""}`), i(_, `${v(x) ? `${v(n).room} › ` : ""}${r ?? ""}`);
					}, [
						() => oe(v(n).book_id, v(n).thread, v(n).msg_id),
						() => R(v(n).author, v(n).author_name).split(" ")[0],
						() => t.vb.ago(v(n).ts)
					]), z("click", o, (e) => B(e, v(n).book_id, v(n).thread, v(n).msg_id)), C(e, a);
				}), L(s), L(n), h((e) => i(o, `${e ?? ""} (${v(A).length ?? ""})`), [() => t.vb.t("Te mencionaram")]), C(e, n);
			};
			U(s, (e) => {
				v(A).length && e(c);
			});
			var u = w(s, 2), d = (e) => {
				var n = Ne(), a = r(n), o = l(a), s = w(a, 2);
				we(s, 21, () => v(j), (e) => `${e.book_id}:${e.task_id}`, (e, n) => {
					var a = Fe(), o = r(a), s = r(o), c = r(s);
					ie(c, { name: "calendar" }), L(s);
					var u = w(s, 2), d = r(u), f = l(d, !0), p = w(d, 2), m = l(p);
					L(u), L(o), L(a), h((e, t, r) => {
						H(o, "href", e), i(f, v(n).title), i(m, `${v(x) ? `${v(n).room} › ` : ""}${t ?? ""} · ${r ?? ""}${v(n).due ? ` · ${v(n).due}` : ""}`);
					}, [
						() => oe(v(n).book_id, v(n).epic_id, 0),
						() => v(n).epic || t.vb.t("sala principal"),
						() => re(v(n).status)
					]), z("click", o, (e) => B(e, v(n).book_id, v(n).epic_id, 0)), C(e, a);
				}), L(s), L(n), h((e) => i(o, `${e ?? ""} (${v(j).length ?? ""})`), [() => t.vb.t("Suas tarefas")]), C(e, n);
			};
			U(u, (e) => {
				v(j).length && e(d);
			}), L(n), C(e, n);
		}, c = (e) => {
			{
				let n = k(() => v(x) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓"));
				P(e, { get title() {
					return v(n);
				} });
			}
		};
		U(a, (e) => {
			v(F) ? e(s) : e(c, -1);
		}), C(e, n);
	}, a = D(t, "mentions", 19, () => []), s = D(t, "tasks", 19, () => []), d = D(t, "all", 3, !1), f = m(E(u(() => d() || !t.roomId ? "all" : "room"))), g = m(!0), _ = m(null), y = m(""), x = k(() => v(f) === "all" || !t.roomId), S = (e) => v(x) ? e : e.filter((e) => e.book_id === t.roomId), O = k(() => S(t.waits)), A = k(() => S(a())), j = k(() => S(s())), M = (e) => {
		let n = (n) => e ? n.length : n.filter((e) => e.book_id === t.roomId).length;
		return n(t.waits) + n(a()) + n(s());
	}, N = k(() => [{
		value: "room",
		label: `${t.vb.t("Esta sala")} (${M(!1)})`
	}, {
		value: "all",
		label: `${t.vb.t("Todas")} (${M(!0)})`
	}]), F = k(() => v(O).length + v(A).length + v(j).length > 0), te = (e) => `${e.book_id}:${e.ref}`, I = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", R = (e, n) => n || t.displayName?.(e) || e.split("@")[0], re = (e) => e === "doing" ? t.vb.t("fazendo") : e === "review" ? t.vb.t("revisar") : t.vb.t("a fazer");
	function ae(e) {
		return Ae(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	function oe(e, t, n) {
		return Ae(`/b/${encodeURIComponent(e)}${t && t !== "main" ? `?t=${encodeURIComponent(t)}` : ""}${n ? `#m${n}` : ""}`, window.location.href, "svelte");
	}
	function B(e, n, r, i) {
		t.onnav && (e.preventDefault(), t.onnav(n, r, i));
	}
	async function ce(e) {
		c(_, te(e), !0), c(y, "");
		try {
			await t.onresolve(e);
		} catch {
			c(y, t.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			c(_, null);
		}
	}
	{
		let r = (e) => {
			var r = Le(), i = T(r), a = (e) => {
				ve(e, {
					get title() {
						return v(y);
					},
					compact: !0
				});
			};
			U(i, (e) => {
				v(y) && e(a);
			});
			var o = w(i, 2), s = (e) => {
				{
					let r = (e) => {
						n(e);
					}, i = k(() => t.vb.t("Caixa de entrada"));
					se(e, {
						get items() {
							return v(N);
						},
						get label() {
							return v(i);
						},
						onValueChange: (e) => t.ontab?.(e === "all"),
						get value() {
							return v(f);
						},
						set value(e) {
							c(f, e, !0);
						},
						children: r,
						$$slots: { default: !0 }
					});
				}
			}, l = (e) => {
				n(e);
			};
			U(o, (e) => {
				t.roomId ? e(s) : e(l, -1);
			}), C(e, r);
		}, i = k(() => t.vb.t("Caixa de entrada")), a = k(() => t.vb.t("Fechar"));
		ne(e, {
			get title() {
				return v(i);
			},
			get closeLabel() {
				return v(a);
			},
			onOpenChange: (e) => {
				e || t.onclose();
			},
			get open() {
				return v(g);
			},
			set open(e) {
				c(g, e, !0);
			},
			children: r,
			$$slots: { default: !0 }
		});
	}
	ee();
}
n(["click"]);
// svelte/InboxMount.svelte
function ze(t, n) {
	let r = () => R(n.waits, "$waits", i), [i, a] = e();
	Re(t, y(() => n.props, { get waits() {
		return r();
	} })), a();
}
// svelte/lib/ui/Progress.svelte
var Be = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Ve = a("<progress> </progress>");
function He(e, t) {
	b(t, !0);
	let n = D(t, "max", 3, 100), r = A(t, Be), a = k(() => Number.isFinite(n()) && n() > 0 ? n() : 100), o = k(() => Number.isFinite(t.value) ? Math.min(v(a), Math.max(0, t.value)) : 0);
	var s = Ve();
	F(s, (e) => ({
		...r,
		max: v(a),
		value: v(o),
		"aria-label": t.label,
		class: e
	}), [() => he("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var c = l(s);
	h(() => i(c, `${v(o) ?? ""}/${v(a) ?? ""}`)), C(e, s), ee();
}
// svelte/TaskList.svelte
var Ue = a("<!> ", 1), We = a("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Ge = a("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ke = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), qe = a("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Je = a("<!> <!>", 1);
function Ye(e, n) {
	let a = _();
	b(n, !0);
	let o = D(n, "waits", 19, () => []), s = k(() => n.room.epics.find((e) => e.id === n.thread) ?? (n.thread === "main" && n.room.roomTasks?.length ? {
		id: "main",
		tasks: n.room.roomTasks,
		flags: []
	} : null)), u = (e) => o().some((t) => t.book_id === n.room.id && t.ref === `t${e.id}`), d = k(() => (v(s)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!u(e.task)) - (t.task.done ? 2 : +!u(t.task)) || e.index - t.index).map((e) => e.task)), f = k(() => v(s)?.tasks.filter((e) => e.done).length ?? 0), p = k(() => [{
		value: "",
		label: n.vb.t("sem dono")
	}, ...(n.room.members ?? []).map((e) => ({
		value: e,
		label: e === n.room.me ? n.vb.t("você") : n.vb.name(e)
	}))]), S = m(null), E = m(""), O = m(null), A = m(""), j = m(""), N = m(null), P = m(!1), F = m(""), I = m(null), R = k(() => v(s)?.tasks.find((e) => e.id === v(N)));
	x(() => {
		v(S) && v(O) && (v(O).focus(), v(O).select());
	}), x(() => {
		v(N) && !v(R) && ce(), v(S) && !v(s)?.tasks.some((e) => e.id === v(S)) && c(S, null);
	});
	function ae(e) {
		try {
			if (n.send(e)) return c(j, ""), !0;
		} catch {}
		return c(j, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function z(e, t = !0) {
		v(S) !== e.id || t && v(E).trim() && v(E) !== e.title && !ae({
			t: "task.rename",
			id: e.id,
			title: v(E)
		}) || c(S, null);
	}
	function se(e) {
		c(N, e.id, !0), c(F, e.due ?? "", !0), c(P, !0);
	}
	function ce() {
		c(P, !1), c(N, null), c(F, "");
	}
	var le = Je(), ue = T(le), de = (e) => {
		var a = Ke(), o = r(a), m = r(o), _ = l(m, !0), y = w(m, 2);
		ge(y, {
			children: (e, n) => {
				t();
				var r = B();
				h(() => i(r, `${v(f) ?? ""}/${v(s).tasks.length ?? ""}`)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var b = w(y, 2);
		{
			let e = k(() => n.vb.t("Tarefas")), t = k(() => Math.max(1, v(s).tasks.length)), r = k(() => `${v(f)}/${v(s).tasks.length}`);
			He(b, {
				get label() {
					return v(e);
				},
				get value() {
					return v(f);
				},
				get max() {
					return v(t);
				},
				get "aria-valuetext"() {
					return v(r);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		L(o);
		var x = w(o, 2), D = (e) => {
			{
				let t = k(() => `@vibe: ${v(s).flags.join(" · ")}`);
				ge(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Ue(), r = T(n);
						ie(r, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = w(r, 1, !0);
						h((e) => i(a, e), [() => v(s).flags.join(" · ")]), C(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		U(x, (e) => {
			v(s).flags?.length && e(D);
		});
		var ee = w(x, 2), N = (e) => {
			ve(e, {
				get title() {
					return v(j);
				},
				compact: !0
			});
		};
		U(ee, (e) => {
			v(j) && !v(P) && e(N);
		});
		var F = w(ee, 2);
		we(F, 21, () => v(d), (e) => e.id, (e, a) => {
			var o = Ge(), s = r(o);
			{
				let e = k(() => n.vb.t("Feita"));
				oe(s, {
					get checked() {
						return v(a).done;
					},
					get "aria-label"() {
						return v(e);
					},
					onclick: (e) => {
						e.preventDefault(), ae({
							t: "task.toggle",
							id: v(a).id
						});
					}
				});
			}
			var l = w(s, 2), d = (e) => {
				{
					let t = k(() => n.vb.t("Clique para editar"));
					fe(e, {
						get "data-task-edit"() {
							return v(a).id;
						},
						get "aria-label"() {
							return v(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => z(v(a)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), z(v(a))), e.key === "Escape" && (e.preventDefault(), z(v(a), !1));
						},
						get ref() {
							return v(O);
						},
						set ref(e) {
							c(O, e, !0);
						},
						get value() {
							return v(E);
						},
						set value(e) {
							c(E, e, !0);
						}
					});
				}
			}, f = (e) => {
				var o = We(), s = r(o);
				{
					let e = k(() => he("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", v(a).done && "tw:text-muted-foreground tw:line-through")), r = k(() => n.vb.t("Clique para editar"));
					te(s, {
						get "data-task-title"() {
							return v(a).id;
						},
						variant: "ghost",
						get class() {
							return v(e);
						},
						get title() {
							return v(r);
						},
						onclick: () => {
							c(S, v(a).id, !0), c(E, v(a).title, !0);
						},
						children: (e, n) => {
							t();
							var r = B();
							h(() => i(r, v(a).title)), C(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var l = w(s, 2), u = (e) => {
					{
						let t = k(() => `@vibe: ${v(a).flags.join(" · ")}`);
						ge(e, {
							variant: "warning",
							get title() {
								return v(t);
							},
							children: (e, t) => {
								var n = Ue(), r = T(n);
								ie(r, {
									name: "warning",
									class: "tw:size-3"
								});
								var o = w(r, 1, !0);
								h((e) => i(o, e), [() => v(a).flags.join(" · ")]), C(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				U(l, (e) => {
					v(a).flags?.length && e(u);
				}), L(o), C(e, o);
			};
			U(l, (e) => {
				v(S) === v(a).id ? e(d) : e(f, -1);
			});
			var m = w(l, 2);
			{
				let e = k(() => n.vb.t("Responsável")), t = k(() => v(a).owner ?? "");
				M(m, {
					get "data-owner"() {
						return v(a).id;
					},
					get "aria-label"() {
						return v(e);
					},
					get value() {
						return v(t);
					},
					get items() {
						return v(p);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => ae({
						t: "task.assign",
						id: v(a).id,
						owner: e
					})
				});
			}
			var g = w(m, 2);
			{
				let e = k(() => n.vb.t("Prazo")), t = k(() => v(a).due ? `${n.vb.t("Prazo")}: ${v(a).due}` : n.vb.t("Prazo"));
				te(g, {
					get "data-due"() {
						return v(a).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return v(e);
					},
					get "aria-label"() {
						return v(t);
					},
					onclick: () => se(v(a)),
					children: (e, t) => {
						var n = Ue(), r = T(n);
						ie(r, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var o = w(r, 1, !0);
						h(() => i(o, v(a).due ?? "")), C(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var _ = w(g, 2);
			{
				let e = k(() => n.vb.t("Apagar task"));
				Ce(_, {
					get "data-tdel"() {
						return v(a).id;
					},
					get label() {
						return v(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => ae({
						t: "task.del",
						id: v(a).id
					})
				});
			}
			L(o), h((e) => {
				H(o, "data-task", v(a).id), H(o, "aria-label", v(a).title), re(o, 1, e);
			}, [() => me(he("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", v(a).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !v(a).done && v(a).owner === n.room.me && "tw:border-ring/50", u(v(a)) && "tw:bg-warning/10"))]), C(e, o);
		}), L(F);
		var I = w(F, 2), R = r(I);
		{
			let e = k(() => n.vb.t("nova task")), t = k(() => n.vb.t("nova task"));
			fe(R, {
				get "aria-label"() {
					return v(e);
				},
				get placeholder() {
					return v(t);
				},
				get value() {
					return v(A);
				},
				set value(e) {
					c(A, e, !0);
				}
			});
		}
		var ne = w(R, 2);
		{
			let e = k(() => n.vb.t("Nova tarefa"));
			Ce(ne, {
				type: "submit",
				get label() {
					return v(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		L(I), L(a), h((e, t) => {
			H(a, "aria-label", e), i(_, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), g("submit", I, (e) => {
			e.preventDefault(), v(A).trim() && ae({
				t: "task.add",
				epic: n.thread,
				title: v(A)
			}) && c(A, "");
		}), C(e, a);
	};
	U(ue, (e) => {
		v(s) && e(de);
	});
	var V = w(ue, 2), pe = (e) => {
		{
			let o = k(() => n.vb.t("Prazo")), s = k(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), l = k(() => n.vb.t("Fechar"));
			ne(e, {
				get title() {
					return v(o);
				},
				get description() {
					return v(s);
				},
				get closeLabel() {
					return v(l);
				},
				initialFocus: () => v(I),
				onOpenChange: (e) => {
					e || ce();
				},
				get open() {
					return v(P);
				},
				set open(e) {
					c(P, e, !0);
				},
				children: (e, o) => {
					var s = qe(), l = r(s);
					{
						let e = (e, t = xe) => {
							fe(e, y(t, {
								get ref() {
									return v(I);
								},
								set ref(e) {
									c(I, e, !0);
								},
								get value() {
									return v(F);
								},
								set value(e) {
									c(F, e, !0);
								}
							}));
						}, t = k(() => `${a}-due`), r = k(() => n.vb.t("Prazo"));
						be(l, {
							get id() {
								return v(t);
							},
							get label() {
								return v(r);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var u = w(l, 2), d = (e) => {
						ve(e, {
							get title() {
								return v(j);
							},
							compact: !0
						});
					};
					U(u, (e) => {
						v(j) && e(d);
					});
					var f = w(u, 2), p = r(f);
					te(p, {
						variant: "outline",
						onclick: ce,
						children: (e, r) => {
							t();
							var a = B();
							h((e) => i(a, e), [() => n.vb.t("Cancelar")]), C(e, a);
						},
						$$slots: { default: !0 }
					});
					var m = w(p);
					te(m, {
						type: "submit",
						children: (e, r) => {
							t();
							var a = B();
							h((e) => i(a, e), [() => n.vb.t("Salvar")]), C(e, a);
						},
						$$slots: { default: !0 }
					}), L(f), L(s), g("submit", s, (e) => {
						e.preventDefault(), v(R) && ae({
							t: "task.assign",
							id: v(R).id,
							due: v(F)
						}) && ce();
					}), C(e, s);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(V, (e) => {
		v(R) && e(pe);
	}), C(e, le), ee();
}
// svelte/Tasks.svelte
var Xe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ze(e, t) {
	b(t, !0);
	let n = A(t, Xe);
	var r = o(), i = T(r);
	N(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Ye(e, y(() => n));
	}), C(e, r), ee();
}
// node_modules/zod/v4/core/util.js
function Qe(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function $e(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var et = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function tt(e) {
	return new et(e);
}
function nt(e) {
	return e == null;
}
function rt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function it(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function at(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function ot(e) {
	return at(e._zod.def) ?? e._zod.def.shape;
}
function st(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return it(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function ct(e, t, n) {
	t in e ? it(e, t, n) : e[t] = n;
}
function lt(e, t, n, r) {
	let i = ot(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? st(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : ct(e, a, r ? r(n.value, a) : n.value));
	}
}
function ut(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? st(e, n, () => t[n]) : ct(e, n, r.value));
	}
}
function dt(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var ft = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function pt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function mt(e) {
	if (pt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return pt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var ht = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function gt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function _t(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function vt(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function yt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function bt(e, t) {
	if (!mt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = ot(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return _t(e, dt(e._zod.def, { shape: xt(e, t) }));
}
function xt(e, t) {
	let n = {};
	return lt(n, e, Reflect.ownKeys(ot(e))), ut(n, t), n;
}
function St(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Ct(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function wt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Tt(e) {
	return typeof e == "string" ? e : e?.message;
}
function Et(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function Dt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Ot(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Tt(e.inst?._zod.def?.error?.(e)) ?? Tt(a?.(e)) ?? Tt(t?.error?.(e)) ?? Tt(n.customError?.(e)) ?? Tt(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var kt = /[\uD800-\uDBFF]/;
function At(e) {
	let t = e.length;
	if (!kt.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function jt(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Mt(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Ft(e, n, r.value);
	}
}
function Nt(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Pt(e, t, n) {
	return Nt(e, t, n, !1);
}
function Ft(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Nt(this, t, n.bind(this));
		},
		set(e) {
			Nt(this, t, e);
		}
	});
}
function It(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var Lt, Rt = !1, zt = {
	configurable: !0,
	get() {
		Rt = !0;
	}
};
function Bt(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && Lt !== e._zod ? Lt = void 0 : (Lt = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, zt);
			let e = Rt;
			Rt = !1;
			try {
				let r = n(this);
				return Rt ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Rt ||= e, r;
			} catch (n) {
				throw delete this[t], Rt ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	}));
}
function Vt(e, t, n, r) {
	let i = It(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
// node_modules/zod/v4/core/core.js
var Ht, Ut = {
	value: void 0,
	enumerable: !1
}, Wt = "captureStackTrace" in Error ? Error : null;
function Gt(e) {
	let t = Wt;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Wt = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
/* @__NO_SIDE_EFFECTS__ */
function W(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Ut.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Ut);
			} finally {
				Ut.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), Mt(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Gt(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var Kt = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(Ht = globalThis).__zod_globalConfig ?? (Ht.__zod_globalConfig = {});
var qt = globalThis.__zod_globalConfig;
function Jt(e) {
	return e && Object.assign(qt, e), qt;
}
// node_modules/zod/v4/core/errors.js
function Yt() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, $e, 2), e.message;
}
function Xt(e) {
	this._zod.message = e;
}
var Zt = {
	get: Yt,
	set: Xt,
	enumerable: !0,
	configurable: !0
}, Qt = {
	value: void 0,
	enumerable: !1
}, $t = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), en = /* @__PURE__ */ W("$ZodError", (e, t) => {
	e.name = "$ZodError", Qt.value = t, Object.defineProperty(e, "issues", Qt), Qt.value = void 0, Object.defineProperty(e, "message", Zt);
	let n = Object.getPrototypeOf(e);
	$t.has(n) || ($t.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, void 0, { Parent: Error }), tn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new Kt();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Ot(e, o, Jt())));
			throw ft(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(en), nn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Ot(e, o, Jt())));
			throw ft(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(en), rn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new Kt();
	return a.issues.length ? an(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(en);
function an(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => Ot(e, n, Jt()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var on = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? an(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(en), sn = /^[\s\S]{0,}$/, cn = /^-?\d+(?:\.\d+)?$/, ln = /^(?:true|false)$/i, un = /*@__PURE__*/ W("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), dn = (e) => {
	let t = e.value;
	return !nt(t) && t.length !== void 0;
}, fn = /*@__PURE__*/ W("$ZodCheckMaxLength", (e, t) => {
	var n;
	un.init(e, t), (n = e._zod.def).when ?? (n.when = dn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? At(r) : i) <= t.maximum) return;
		let a = jt(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), pn = /*@__PURE__*/ W("$ZodCheckMinLength", (e, t) => {
	var n;
	un.init(e, t), (n = e._zod.def).when ?? (n.when = dn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? At(r) : i) >= t.minimum) return;
		let a = jt(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), mn = /*@__PURE__*/ W("$ZodCheckStartsWith", (e, t) => {
	un.init(e, t);
	let n = RegExp(`^${gt(t.prefix)}.*`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), hn = {
	major: 4,
	minor: 6,
	patch: 7
}, gn = /*@__PURE__*/ W("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = hn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = St(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Ct(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new Kt();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Dt(t.issues, n, e), i ||= St(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					Dt(t.issues, n, e), i ||= St(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (St(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Kt();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Kt();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return Pt(this, "~standard", yn(this));
	},
	set "~standard"(e) {
		Nt(this, "~standard", e);
	}
}), _n = (e, t) => e.issues.length ? { issues: e.issues.map((e) => Ot(e, t, Jt())) } : { value: e.value };
async function vn(e, t) {
	let n = { async: !0 };
	return _n(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function yn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return _n(r, n);
			} catch {}
			return vn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var bn = /*@__PURE__*/ W("$ZodString", (e, t) => {
	gn.init(e, t), e._zod.pattern = t.pattern ?? sn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), xn = /*@__PURE__*/ W("$ZodNumber", (e, t) => {
	gn.init(e, t), e._zod.pattern = cn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), Sn = /*@__PURE__*/ W("$ZodBoolean", (e, t) => {
	gn.init(e, t), e._zod.pattern = ln, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), Cn = /*@__PURE__*/ W("$ZodNever", (e, t) => {
	gn.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function wn(e, t) {
	let n = Et(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of Et(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, Dt(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var Tn = (e) => Array.isArray(e) ? e.length : -1;
function En(e, t, n) {
	e.issues.length && t.issues.push(...wt(n, e.issues)), t.value[n] = e.value;
}
var Dn = /*@__PURE__*/ W("$ZodArray", (e, t) => {
	gn.init(e, t);
	let n = qt.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => En(t, r, e)));
			else if (En(c, r, e), s && c.issues.length !== 0 && St(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, wn(e, Tn);
});
function On(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...wt(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var kn = [];
function An(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : kn, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = yt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function jn(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (St(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => On(e, n, i, t, d, f))) : On(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Mn = /*@__PURE__*/ W("$ZodObject", (e, t) => {
	gn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = tt(() => An(t));
	Bt(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || it(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = pt, o = t.catchall, s, c = qt.memoizer;
	c?.attach(e), e._zod.parse = (t, n) => {
		s ??= i.value;
		let r = t.value;
		if (!a(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = c ? c.alloc(e, t, {}, n) : {};
		let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of s.allKeys) {
			if (d && t.issues.length !== f) {
				if (St(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => On(n, t, e, r, a, o))) : On(s, t, e, r, a, o);
		}
		return o ? jn(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function Nn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !St(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Ot(e, r, Jt())))
	}), t);
}
var Pn = /*@__PURE__*/ W("$ZodUnion", (e, t) => {
	gn.init(e, t), Bt(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), Bt(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), Bt(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), Bt(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => rt(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => Nn(t, r, e, i)) : Nn(o, r, e, i);
	};
});
function Fn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
var In = /*@__PURE__*/ W("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, Pn.init(e, t);
	let n = e._zod.parse;
	Bt(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || it(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = at(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = tt(() => Fn(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!pt(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = o?.[t.discriminator], c = r.value.get(s);
		return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), Ln = /*@__PURE__*/ W("$ZodRecord", (e, t) => {
	gn.init(e, t);
	let n = qt.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!mt(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => Ot(e, i, Jt())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...wt(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...wt(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l ??= [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && cn.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => Ot(e, i, Jt())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...wt(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...wt(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), Rn = /*@__PURE__*/ W("$ZodEnum", (e, t) => {
	gn.init(e, t);
	let n = Qe(t.entries), r = new Set(n);
	e._zod.values = r, Bt(e, "pattern", (e) => {
		let t = Qe(e.def.entries).filter((e) => ht.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => gt(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), zn = /*@__PURE__*/ W("$ZodLiteral", (e, t) => {
	gn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, Bt(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? gt(e) : e ? gt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
});
function Bn(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Vn = /*@__PURE__*/ W("$ZodOptional", (e, t) => {
	gn.init(e, t), Bt(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", Bt(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), Bt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${rt(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Bn(e, t)) : Bn(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Hn = /*@__PURE__*/ W("$ZodNullable", (e, t) => {
	gn.init(e, t), Bt(e, "optin", (e) => e.def.innerType._zod.optin), Bt(e, "optout", (e) => e.def.innerType._zod.optout), Bt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${rt(t.source)}|null)$`) : void 0;
	}), Bt(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function Un(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function Wn(e, t) {
	return new e(Un({
		type: "string",
		...vt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Gn(e, t) {
	return new e(Un({
		type: "number",
		checks: [],
		...vt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Kn(e, t) {
	return new e({
		type: "boolean",
		...vt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qn(e, t) {
	return new e({
		type: "never",
		...vt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Jn(e, t) {
	return new fn({
		check: "max_length",
		...vt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Yn(e, t) {
	return new pn({
		check: "min_length",
		...vt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Xn(e, t) {
	return new mn({
		check: "string_format",
		format: "starts_with",
		...vt(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var Zn = /*@__PURE__*/ W("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	gn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		Nt(this, "with", e);
	},
	parse(e, t) {
		return tn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return nn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return rn(this, e, t);
	},
	safeParseAsync(e, t) {
		return on(this, e, t);
	},
	check(...e) {
		let t = this.def;
		return this.clone({
			...t,
			checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)]
		}, { parent: !0 });
	},
	clone(e, t) {
		return _t(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	}
}), Qn = /*@__PURE__*/ W("ZodMiniString", (e, t) => {
	bn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function G(e) {
	return /* @__PURE__ */ Wn(Qn, e);
}
var $n = /*@__PURE__*/ W("ZodMiniNumber", (e, t) => {
	xn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function er(e) {
	return /* @__PURE__ */ Gn($n, e);
}
var tr = /*@__PURE__*/ W("ZodMiniBoolean", (e, t) => {
	Sn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function nr(e) {
	return /* @__PURE__ */ Kn(tr, e);
}
var rr = /*@__PURE__*/ W("ZodMiniNever", (e, t) => {
	Cn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function ir(e) {
	return /* @__PURE__ */ qn(rr, e);
}
var ar = /*@__PURE__*/ W("ZodMiniArray", (e, t) => {
	Dn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e, t) {
	return new ar({
		type: "array",
		element: e,
		...vt(t)
	});
}
var or = /*@__PURE__*/ W("ZodMiniObject", (e, t) => {
	Mn.init(e, t), Zn.init(e, t), Vt(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
	return new or({
		type: "object",
		shape: e ?? {},
		...vt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return bt(e, t);
}
var cr = /*@__PURE__*/ W("ZodMiniUnion", (e, t) => {
	Pn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new cr({
		type: "union",
		options: e,
		...vt(t)
	});
}
var ur = /*@__PURE__*/ W("ZodMiniDiscriminatedUnion", (e, t) => {
	In.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function dr(e, t, n) {
	return new ur({
		type: "union",
		options: t,
		discriminator: e,
		...vt(n)
	});
}
var fr = /*@__PURE__*/ W("ZodMiniRecord", (e, t) => {
	Ln.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function pr(e, t, n) {
	return !t || !t._zod ? new fr({
		type: "record",
		keyType: /* @__PURE__ */ G(),
		valueType: e,
		...vt(t)
	}) : new fr({
		type: "record",
		keyType: e,
		valueType: t,
		...vt(n)
	});
}
var mr = /*@__PURE__*/ W("ZodMiniEnum", (e, t) => {
	Rn.init(e, t), Zn.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new mr({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...vt(t)
	});
}
var gr = /*@__PURE__*/ W("ZodMiniLiteral", (e, t) => {
	zn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function J(e, t) {
	return new gr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...vt(t)
	});
}
var _r = /*@__PURE__*/ W("ZodMiniOptional", (e, t) => {
	Vn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Y(e) {
	return new _r({
		type: "optional",
		innerType: e
	});
}
var vr = /*@__PURE__*/ W("ZodMiniNullable", (e, t) => {
	Hn.init(e, t), Zn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function yr(e) {
	return new vr({
		type: "nullable",
		innerType: e
	});
}
// shared/room.ts
var X = /* @__PURE__ */ G(), br = /* @__PURE__ */ er(), xr = /* @__PURE__ */ nr(), Z = (e) => /* @__PURE__ */ Y(e), Q = (e) => /* @__PURE__ */ Y(/* @__PURE__ */ yr(e)), Sr = /* @__PURE__ */ K(X), Cr = [
	"todo",
	"doing",
	"review",
	"done"
], wr = /* @__PURE__ */ q({
	title: X,
	owner: X,
	summary: Q(X),
	folder: Q(X)
}), Tr = /* @__PURE__ */ q({
	title: X,
	tasks: Sr,
	why: Z(X)
}), Er = /* @__PURE__ */ q({
	id: br,
	text: X,
	who: X,
	kind: X,
	ts: br
}), Dr = /* @__PURE__ */ q({
	id: X,
	kind: X,
	ref: X,
	title: Z(X),
	author: Z(X),
	ts: Z(br)
}), Or = /* @__PURE__ */ q({
	id: X,
	question: X,
	options: Sr,
	multi: xr,
	closed: xr,
	author: X,
	votes: /* @__PURE__ */ K(Sr)
}), kr = /* @__PURE__ */ q({
	id: X,
	title: X,
	done: xr,
	status: /* @__PURE__ */ hr(Cr),
	owner: Q(X),
	due: Q(X),
	flags: Z(Sr),
	epic_id: Z(X)
}), Ar = /* @__PURE__ */ q({
	id: X,
	title: X,
	tasks: /* @__PURE__ */ K(kr),
	archived: Z(xr),
	owner: Q(X),
	from_msg: Q(br),
	parent: Q(X),
	kept: Z(xr),
	files: Z(/* @__PURE__ */ K(/* @__PURE__ */ q({
		id: X,
		name: X,
		type: X,
		n: br
	}))),
	flags: Z(Sr),
	prod: Q(/* @__PURE__ */ q({
		stage: X,
		note: Z(X),
		at: Z(br)
	}))
}), jr = /* @__PURE__ */ q({
	id: X,
	name: X,
	type: X,
	size: br,
	author: X,
	ts: br,
	embed: Z(xr)
}), Mr = /* @__PURE__ */ q({
	id: br,
	thread: X,
	author: X,
	ts: br,
	text: X,
	kind: Q(X),
	tag: Q(X),
	via: Q(X),
	reply_to: Q(br),
	choices: Q(X),
	poll: Q(X),
	card: Q(X),
	quiet: Z(xr),
	cut: Z(xr),
	for_who: Q(X),
	files: Z(/* @__PURE__ */ K(jr))
}), Nr = /* @__PURE__ */ q({
	msg_id: br,
	agent: Z(X),
	email: X,
	who: X,
	status: X,
	ts: br,
	note: Q(X)
}), Pr = /* @__PURE__ */ q({
	id: X,
	name: Q(X),
	text: X,
	owner: X,
	enabled: xr,
	error: Q(X),
	every: Q(X),
	cron: Q(X),
	next_at: Q(br),
	thread: Z(X),
	tz: Z(X),
	file_id: Q(X)
}), Fr = /* @__PURE__ */ q({
	email: X,
	name: Q(X),
	ts: br
}), Ir = /* @__PURE__ */ q({
	email: X,
	who: X,
	read: br,
	delivered: br,
	agent: Z(X),
	ts: Z(br)
}), Lr = /* @__PURE__ */ q({
	me: X,
	book: wr,
	messages: /* @__PURE__ */ K(Mr),
	epics: /* @__PURE__ */ K(Ar),
	roomTasks: Z(/* @__PURE__ */ K(kr)),
	members: Sr,
	online: Sr,
	names: Z(/* @__PURE__ */ pr(X, X)),
	avatars: Z(/* @__PURE__ */ pr(X, br)),
	pending: Z(Sr),
	requests: Z(/* @__PURE__ */ K(Fr)),
	suggestions: /* @__PURE__ */ K(Tr),
	files: Z(/* @__PURE__ */ K(jr)),
	filesN: Z(br),
	filesAll: Z(xr),
	reminders: Z(/* @__PURE__ */ K(Pr)),
	acks: Z(/* @__PURE__ */ K(Nr)),
	receipts: Z(/* @__PURE__ */ K(Ir)),
	counts: Z(/* @__PURE__ */ pr(X, br)),
	countsAt: Z(br),
	full: Z(Sr),
	complete: Z(xr),
	origins: Z(/* @__PURE__ */ K(Mr)),
	docs: Z(/* @__PURE__ */ pr(X, X)),
	doc: Z(X),
	docNotes: Z(Sr),
	decisions: Z(/* @__PURE__ */ K(Er)),
	pins: Z(/* @__PURE__ */ K(Dr)),
	polls: Z(/* @__PURE__ */ pr(X, Or))
}), Rr = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, zr = Cr.map((e) => ({
	value: e,
	label: Rr[e]
}));
function Br(e, t) {
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
function Vr() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function Hr(e, t) {
	return zr[zr.findIndex((t) => t.value === e) + t]?.value;
}
function Ur(e) {
	return zr.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var Wr = a("<!> ", 1), Gr = a("<!><span> </span>", 1), Kr = a("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), qr = a("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), Jr = a("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), Yr = a("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), Xr = a("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), Zr = a("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), Qr = a("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), $r = a("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), ei = a("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), ti = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function ni(e, n) {
	let a = _();
	b(n, !0);
	let f = (e, o = xe, s = xe, u = xe) => {
		var d = Jr(), f = r(d), m = r(f), _ = l(m, !0), y = w(m, 2), b = (e) => {
			{
				let t = k(() => `@vibe: ${o().flags.join(" · ")}`);
				ge(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Wr(), r = T(n);
						ie(r, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = w(r, 1, !0);
						h((e) => i(a, e), [() => o().flags.join(" · ")]), C(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		U(y, (e) => {
			o().flags?.length && e(b);
		});
		var x = w(y, 2), S = r(x);
		ge(S, {
			children: (e, n) => {
				t();
				var r = B();
				h(() => i(r, o().epicTitle)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var E = w(S, 2), D = (e) => {
			var t = Gr(), r = T(t);
			{
				let e = k(() => n.vb.name(o().owner)), t = k(() => `/api/avatar/${encodeURIComponent(o().owner)}`);
				p(r, {
					get name() {
						return v(e);
					},
					get src() {
						return v(t);
					},
					class: "tw:size-6"
				});
			}
			var a = w(r), s = l(a, !0);
			h((e) => i(s, e), [() => o().owner === n.room.me ? n.vb.t("você") : n.vb.name(o().owner)]), C(e, t);
		};
		U(E, (e) => {
			o().owner && e(D);
		});
		var O = w(E, 2), A = (e) => {
			var t = Kr(), n = r(t);
			ie(n, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = w(n, 1, !0);
			L(t), h(() => i(a, o().due)), C(e, t);
		};
		U(O, (e) => {
			o().due && e(A);
		}), L(x), L(f);
		var ee = w(f, 2), j = (e) => {
			var t = qr(), i = r(t);
			ie(i, { name: "grip" }), L(t), h((e) => H(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), C(e, t);
		};
		U(ee, (e) => {
			u() || e(j);
		});
		var P = w(ee, 2), te = r(P);
		{
			let e = k(() => `${a}-${s()}`);
			ue(te, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = B();
					h((e) => i(a, e), [() => n.vb.t("Status")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var I = w(te, 2);
		{
			let e = k(() => `${a}-${s()}`), t = k(() => `${n.vb.t("Status")}: ${o().title}`);
			M(I, {
				get id() {
					return v(e);
				},
				get "aria-label"() {
					return v(t);
				},
				get value() {
					return o().status;
				},
				get items() {
					return v(ae);
				},
				onValueChange: (e) => (Ur(e) && Se(o(), e, s()), !1)
			});
		}
		L(P), L(d), le(d, (e, t) => ye?.(e, t), s), h((e, t, n, r) => {
			H(d, "data-board-task", o().id), H(d, "data-status", o().status), H(d, "draggable", !u()), re(d, 1, e), H(f, "data-epic", o().epicId), H(f, "aria-describedby", `${a}-keys`), re(f, 1, t), re(m, 1, n), i(_, o().title), re(P, 1, r);
		}, [
			() => me(he("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", u() && "tw:flex tw:flex-wrap tw:items-center", v(F) === o().id && "tw:opacity-50", o().status !== "done" && o().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => me(he("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !u() && "tw:pr-10")),
			() => me(he("tw:block tw:break-words tw:font-medium", o().status === "done" && "tw:line-through")),
			() => me(he("tw:min-w-32 tw:space-y-1 tw:p-3", !u() && "tw:border-t tw:border-border"))
		]), g("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", o().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), c(F, o().id, !0));
		}), g("dragend", d, () => {
			c(F, null), c(N, null);
		}), z("click", f, () => n.onopen?.(o().epicId)), z("keydown", f, (e) => Ee(e, o(), s())), C(e, d);
	}, y = k(() => Br(n.room, n.thread)), S = m(E(Vr())), D = m(""), O = m(null), A = m(""), j = m(""), N = m(null), F = m(null), I = m(E(u(() => v(y).targets.find((e) => e.id === v(y).scope) ?? v(y).targets.find((e) => e.id !== "main") ?? v(y).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), R = k(() => v(y).targets.some((e) => e.id === v(I).id)), ne = k(() => [...v(R) ? [] : [{
		value: v(I).id,
		label: v(I).title,
		disabled: !0
	}], ...v(y).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), ae = k(() => zr.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), oe = k(() => v(y).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), ce = k(() => v(y).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), de = /* @__PURE__ */ new Map(), V = 0, pe = !1, _e = m(null);
	d(() => {
		pe = !0, V++, de.clear();
	});
	function ye(e, t) {
		return de.set(t, e), { destroy() {
			de.get(t) === e && de.delete(t);
		} };
	}
	function be(e) {
		try {
			if (n.send(e)) return c(A, ""), !0;
		} catch {}
		return c(A, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function Se(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && de.get(n)?.contains(r) ? r : null;
		return be({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (c(_e, {
			id: e.id,
			status: t,
			generation: ++V,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	x(() => {
		let e = v(_e);
		if (!e) return;
		let t = [...n.room.roomTasks ?? [], ...n.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (c(_e, null), c(j, `${t.title}: ${n.vb.t(zr.find((e) => e.value === t.status)?.label ?? t.status)}`), Ce(e)) : (c(_e, null), Ce(e));
	});
	function Ce(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || s().then(() => {
			if (pe || e.generation !== V || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = de.get(t.key)?.querySelector(t.selector) ?? v(O);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function Te(e) {
		if (e === "board" || e === "list") {
			c(S, e, !0), V++, c(_e, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Ee(e, t, n) {
		let r = e.key === "ArrowRight" ? Hr(t.status, 1) : e.key === "ArrowLeft" ? Hr(t.status, -1) : void 0;
		r && (e.preventDefault(), Se(t, r, n));
	}
	function De(e, t) {
		e.preventDefault(), c(N, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = v(y).tasks.find((e) => e.id === n);
		c(F, null), r && Se(r, t, `board:${r.id}`);
	}
	function Oe(e) {
		e.preventDefault(), v(D).trim() && (v(R) ? be({
			t: "task.add",
			epic: v(I).id,
			title: v(D).trim()
		}) && c(D, "") : c(A, n.vb.t("Escolha um épico."), !0));
	}
	var ke = ti(), Ae = r(ke), je = l(Ae, !0), Me = w(Ae, 2), Ne = (e) => {
		{
			let t = k(() => v(y).missingScope ? n.vb.t("Épico não encontrado.") : v(R) ? v(A) : n.vb.t("Escolha um épico."));
			ve(e, {
				get title() {
					return v(t);
				},
				compact: !0
			});
		}
	};
	U(Me, (e) => {
		(v(y).missingScope || !v(R) || v(A)) && e(Ne);
	});
	var Pe = w(Me, 2), Fe = l(Pe, !0), Ie = w(Pe, 2), Le = l(Ie, !0), Re = w(Ie, 2);
	{
		let e = (e, a = xe) => {
			var s = o(), u = T(s), d = (e) => {
				var s = o(), u = T(s), d = (e) => {
					var a = Zr(), o = r(a);
					we(o, 21, () => zr, (e) => e.value, (e, a) => {
						let o = k(() => v(y).tasks.filter((e) => e.status === v(a).value));
						var s = Xr(), u = r(s), d = r(u, !0), p = w(d);
						ge(p, {
							children: (e, n) => {
								t();
								var r = B();
								h(() => i(r, v(o).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), L(u);
						var m = w(u, 2);
						we(m, 21, () => v(o), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `board:${v(t).id}`, () => !1);
						}, (e) => {
							var t = Yr(), r = l(t, !0);
							h((e) => i(r, e), [() => n.vb.t(v(a).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), C(e, t);
						}), L(m), L(s), h((e, t, n) => {
							H(s, "data-lane", v(a).value), H(s, "aria-label", e), re(s, 1, t), i(d, n);
						}, [
							() => n.vb.t(v(a).label),
							() => me(he("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", v(N) === v(a).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(v(a).label)
						]), g("dragover", s, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), c(N, v(a).value, !0));
						}), g("dragleave", s, () => {
							c(N, null);
						}), g("drop", s, (e) => De(e, v(a).value)), C(e, s);
					}), L(o), L(a), C(e, a);
				}, p = (e) => {
					var a = $r(), o = r(a), s = (e) => {
						var a = Qr(), o = r(a), s = r(o, !0), c = w(s);
						ge(c, {
							variant: "warning",
							children: (e, n) => {
								t();
								var r = B();
								h(() => i(r, v(ce).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), L(o);
						var l = w(o, 2);
						we(l, 17, () => v(ce), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `mine:${v(t).id}`, () => !0);
						}), L(a), h((e, t) => {
							H(a, "aria-label", e), i(s, t);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), C(e, a);
					};
					U(o, (e) => {
						v(ce).length && e(s);
					});
					var c = w(o, 2);
					we(c, 17, () => v(oe), (e) => e.id, (e, n) => {
						var a = Qr(), o = r(a), s = r(o, !0), c = w(s);
						ge(c, {
							children: (e, r) => {
								t();
								var a = B();
								h(() => i(a, v(n).tasks.length)), C(e, a);
							},
							$$slots: { default: !0 }
						}), L(o);
						var l = w(o, 2);
						we(l, 17, () => v(n).tasks, (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `group:${v(t).id}`, () => !0);
						}), L(a), h(() => {
							H(a, "aria-label", v(n).title), i(s, v(n).title);
						}), C(e, a);
					}, (e) => {
						{
							let t = k(() => n.vb.t("Nenhuma tarefa aberta."));
							P(e, { get title() {
								return v(t);
							} });
						}
					}), L(a), C(e, a);
				};
				U(u, (e) => {
					a() === "board" ? e(d) : e(p, -1);
				}), C(e, s);
			};
			U(u, (e) => {
				a() === v(S) && e(d);
			}), C(e, s);
		}, a = k(() => n.vb.t("Quadro de tarefas")), s = k(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		se(Re, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return v(a);
			},
			get items() {
				return v(s);
			},
			get value() {
				return v(S);
			},
			onValueChange: Te,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ze = w(Re, 2), Be = r(ze), Ve = r(Be);
	{
		let e = k(() => `${a}-title`);
		ue(Ve, {
			get for() {
				return v(e);
			},
			children: (e, r) => {
				t();
				var a = B();
				h((e) => i(a, e), [() => n.vb.t("Nova tarefa")]), C(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	var He = w(Ve, 2);
	{
		let e = k(() => `${a}-title`), t = k(() => n.vb.t("nova tarefa"));
		fe(He, {
			get id() {
				return v(e);
			},
			get placeholder() {
				return v(t);
			},
			get ref() {
				return v(O);
			},
			set ref(e) {
				c(O, e, !0);
			},
			get value() {
				return v(D);
			},
			set value(e) {
				c(D, e, !0);
			}
		});
	}
	L(Be);
	var Ue = w(Be, 2), We = (e) => {
		var o = ei(), s = r(o);
		{
			let e = k(() => `${a}-epic`);
			ue(s, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = B();
					h((e) => i(a, e), [() => n.vb.t("Épico")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var l = w(s, 2);
		{
			let e = k(() => `${a}-epic`), t = k(() => !v(R));
			M(l, {
				get id() {
					return v(e);
				},
				get "aria-invalid"() {
					return v(t);
				},
				get items() {
					return v(ne);
				},
				get value() {
					return v(I).id;
				},
				onValueChange: (e) => {
					let t = v(y).targets.find((t) => t.id === e);
					if (!t) return !1;
					c(I, t, !0), c(A, "");
				}
			});
		}
		L(o), C(e, o);
	};
	U(Ue, (e) => {
		v(y).scope || e(We);
	});
	var Ge = w(Ue, 2);
	{
		let e = k(() => !v(D).trim() || !v(R));
		te(Ge, {
			type: "submit",
			get disabled() {
				return v(e);
			},
			children: (e, t) => {
				var r = Wr(), a = T(r);
				ie(a, { name: "plus" });
				var o = w(a, 1, !0);
				h((e) => i(o, e), [() => n.vb.t("Nova tarefa")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	L(ze), L(ke), h((e, t, n) => {
		H(ke, "data-board-scope", v(y).scope ?? "all"), H(ke, "aria-label", e), i(je, t), i(Fe, v(j)), H(Ie, "id", `${a}-keys`), i(Le, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => v(y).title ?? (v(y).scope ? v(I).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), g("submit", ze, Oe), C(e, ke), ee();
}
n(["click", "keydown"]);
// svelte/Board.svelte
var ri = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ii(e, t) {
	b(t, !0);
	let n = A(t, ri);
	var r = o(), i = T(r);
	N(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		ni(e, y(() => n));
	}), C(e, r), ee();
}
// svelte/panels.ts
var ai = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", oi = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, si = a("<button type=\"button\"> <small> </small></button>"), ci = a("<div class=\"ftabs\"></div>"), li = a("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), ui = a("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), di = a("<img loading=\"lazy\"/>"), fi = a("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), pi = a("<div class=\"empty\"> </div>"), mi = a("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function hi(e, t) {
	b(t, !0);
	let n = [
		["all", "Tudo"],
		["img", "Imagens"],
		["md", "Markdown"],
		["txt", "Texto e CSV"],
		["html", "HTML"],
		["pdf", "PDF"],
		["audio", "Áudios"],
		["other", "Outros"]
	], a = m("all"), s = m(""), u = k(() => t.room.files || []), d = k(() => {
		let e = { all: v(u).length };
		for (let t of v(u)) {
			let n = ai(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), f = k(() => v(d)[v(a)] ? v(a) : "all"), p = k(() => v(u).filter((e) => v(f) === "all" || ai(e) === v(f))), g = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", _ = k(() => v(s) && v(p).some((e) => g(e) === v(s) || g(e).startsWith(v(s) + "/")) ? v(s) : ""), y = k(() => v(_) ? v(_) + "/" : "");
	x(() => {
		v(d)[v(a)] || c(a, "all"), v(s) && v(_) !== v(s) && c(s, "");
	});
	function S(e, t) {
		c(s, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let E = k(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of v(p)) {
			let r = g(n);
			if (r === v(_)) t.push(n);
			else if (r.startsWith(v(y))) {
				let t = r.slice(v(y).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (v(_)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: v(_) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
			versions: n
		};
	}), D = (e) => `/api/books/${t.room.id}/files/${e.id}`, O = (e) => t.room.pins?.find((t) => t.kind === "file" && t.ref === e.id);
	function A(e, n) {
		e.preventDefault(), e.stopPropagation();
		let r = O(n);
		t.send(r ? {
			t: "pin.del",
			id: r.id
		} : {
			t: "pin.add",
			kind: "file",
			ref: n.id
		});
	}
	var M = o(), N = T(M), P = (e) => {
		var s = mi(), u = T(s), p = (e) => {
			var o = ci();
			we(o, 21, () => n.filter(([e]) => v(d)[e]), Ee, (e, n) => {
				var o = k(() => de(v(n), 2));
				let s = () => v(o)[0], u = () => v(o)[1];
				var p = si();
				let m;
				var g = r(p), _ = w(g), y = l(_, !0);
				L(p), h((e) => {
					m = re(p, 1, "ftab", null, m, { on: s() === v(f) }), H(p, "data-fkind", s()), i(g, `${e ?? ""} `), i(y, v(d)[s()]);
				}, [() => t.vb.t(u())]), z("click", p, () => c(a, s(), !0)), C(e, p);
			}), L(o), C(e, o);
		};
		U(u, (e) => {
			v(d).all > 1 && e(p);
		});
		var m = w(u, 2), g = (e) => {
			var n = li(), a = r(n), o = l(a), s = w(a), c = r(s);
			j(c, () => t.vb.icon("folder", 14));
			var u = w(c);
			L(s), L(n), h((e, t) => {
				H(a, "data-fdir", e), i(o, `← ${t ?? ""}`), i(u, ` ${v(_) ?? ""}/`);
			}, [() => v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), z("click", a, (e) => S(e, v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "")), C(e, n);
		};
		U(m, (e) => {
			v(_) && e(g);
		});
		var b = w(m, 2), x = r(b);
		we(x, 17, () => v(E).dirs, Ee, (e, n) => {
			var a = k(() => de(v(n), 2));
			let o = () => v(a)[0], s = () => v(a)[1];
			var c = ui(), u = r(c);
			j(u, () => t.vb.icon("folder", 34), !0), L(u);
			var d = w(u, 2), f = l(d), p = w(d), m = l(p, !0);
			L(c), h((e) => {
				H(c, "data-fdir", v(y) + o()), i(f, `${o() ?? ""}/`), i(m, e);
			}, [() => s() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: s() })]), z("click", c, (e) => S(e, v(y) + o())), C(e, c);
		});
		var ee = w(x, 2);
		we(ee, 17, () => v(E).list, (e) => e.id, (e, n) => {
			var a = fi(), s = r(a), c = r(s), u = (e) => {
				var t = di();
				h((e) => {
					H(t, "src", e), H(t, "alt", v(n).name);
				}, [() => D(v(n))]), C(e, t);
			}, d = k(() => v(n).type.startsWith("image/")), f = (e) => {
				var r = o(), i = T(r);
				j(i, () => t.vb.icon(v(n).type === "text/html" ? "globe" : v(n).type.startsWith("audio/") ? "mic" : "file", 30)), C(e, r);
			};
			U(c, (e) => {
				v(d) ? e(u) : e(f, -1);
			}), L(s);
			var p = w(s, 2), m = l(p, !0), g = w(p), _ = l(g), b = w(g, 2);
			let x;
			j(b, () => t.vb.icon("pin", 14), !0), L(b), L(a), h((e, t, r, o, s, c, l, u, d, f) => {
				H(a, "href", e), H(a, "title", v(n).name), H(a, "data-view", t), H(a, "data-name", v(n).name), i(m, r), i(_, `${o ?? ""} · ${s ?? ""} · ${c ?? ""}`), x = re(b, 1, "ghost pinBtn", null, x, { on: l }), H(b, "data-pin-ref", v(n).id), H(b, "title", u), H(b, "aria-label", d), H(b, "aria-pressed", f);
			}, [
				() => D(v(n)),
				() => v(n).type.startsWith("image/") ? "img" : "frame",
				() => v(n).name.slice(v(y).length),
				() => t.vb.name(v(n).author),
				() => t.vb.ago(v(n).ts),
				() => v(E).versions[v(n).name] > 1 ? t.vb.t("{n} versões", { n: v(E).versions[v(n).name] }) : oi(v(n).size),
				() => !!O(v(n)),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!O(v(n))
			]), z("click", b, (e) => A(e, v(n))), C(e, a);
		}), L(b);
		var M = w(b, 2), N = (e) => {
			var n = pi(), r = l(n, !0);
			h((e) => i(r, e), [() => t.vb.t("Nada aqui.")]), C(e, n);
		};
		U(M, (e) => {
			!v(E).list.length && !v(E).dirs.length && e(N);
		}), C(e, s);
	}, F = (e) => {
		var n = pi(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), C(e, n);
	};
	U(N, (e) => {
		v(u).length ? e(P) : e(F, -1);
	}), C(e, M), ee();
}
n(["click"]);
var gi = /* @__PURE__ */ lr([/* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!0),
	id: /* @__PURE__ */ er(),
	thread: /* @__PURE__ */ G()
}), /* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!1),
	error: /* @__PURE__ */ G()
})]), _i = /* @__PURE__ */ q({
	ok: /* @__PURE__ */ nr(),
	name: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
	error: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
	every: /* @__PURE__ */ Y(/* @__PURE__ */ yr(/* @__PURE__ */ G())),
	cron: /* @__PURE__ */ Y(/* @__PURE__ */ yr(/* @__PURE__ */ G())),
	timezone: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
	next_at: /* @__PURE__ */ Y(/* @__PURE__ */ G())
}), vi = /* @__PURE__ */ q({
	id: /* @__PURE__ */ G(),
	name: /* @__PURE__ */ G(),
	type: /* @__PURE__ */ G(),
	size: /* @__PURE__ */ er(),
	author: /* @__PURE__ */ G(),
	ts: /* @__PURE__ */ er(),
	embed: /* @__PURE__ */ Y(/* @__PURE__ */ nr())
}), yi = /* @__PURE__ */ sr(vi, { reminder: /* @__PURE__ */ Y(_i) }), bi = /* @__PURE__ */ q({ error: /* @__PURE__ */ G() });
(/* @__PURE__ */ G()).check(/* @__PURE__ */ Xn("https://"), /* @__PURE__ */ Jn(1e3)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Yn(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Yn(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Yn(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Xn("m"));
var xi = /* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!0),
	icon: /* @__PURE__ */ yr(/* @__PURE__ */ er())
}), Si = /* @__PURE__ */ G(), Ci = /* @__PURE__ */ er(), wi = /* @__PURE__ */ dr("t", [
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("msg"),
		thread: /* @__PURE__ */ G(),
		text: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
		files: /* @__PURE__ */ Y(/* @__PURE__ */ K(/* @__PURE__ */ G())),
		reply_to: /* @__PURE__ */ Y(/* @__PURE__ */ yr(Ci))
	}),
	/* @__PURE__ */ q({ t: /* @__PURE__ */ J("files.get") }),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("doc.get"),
		epic: /* @__PURE__ */ Y(/* @__PURE__ */ yr(/* @__PURE__ */ G()))
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("doc"),
		text: /* @__PURE__ */ G(),
		epic: /* @__PURE__ */ Y(/* @__PURE__ */ yr(/* @__PURE__ */ G()))
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("title"),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic"),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.owner"),
		id: Si,
		owner: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.add"),
		epic: /* @__PURE__ */ G(),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("older"),
		thread: /* @__PURE__ */ G(),
		before: /* @__PURE__ */ Y(Ci)
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("pin.add"),
		kind: /* @__PURE__ */ hr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ G(),
		title: /* @__PURE__ */ Y(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("pin.del"),
		id: Si
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("reminder.delete"),
		id: Si
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("ack.dismiss"),
		id: Ci
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("reminder.enable"),
		id: Si,
		on: /* @__PURE__ */ nr()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.toggle"),
		id: Si
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.status"),
		id: Si,
		status: /* @__PURE__ */ hr(Cr)
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.rename"),
		id: Si,
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.del"),
		id: Si
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.assign"),
		id: Si,
		owner: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
		due: /* @__PURE__ */ Y(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("decision.del"),
		id: Ci
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.rename"),
		id: Si,
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.del"),
		id: Si
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.archive"),
		id: Si,
		archived: /* @__PURE__ */ Y(/* @__PURE__ */ nr())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.order"),
		ids: /* @__PURE__ */ K(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("poll.create"),
		thread: /* @__PURE__ */ G(),
		question: /* @__PURE__ */ G(),
		options: /* @__PURE__ */ K(/* @__PURE__ */ G()),
		multi: /* @__PURE__ */ nr()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("vote"),
		id: Si,
		opt: Ci
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("poll.close"),
		id: Si
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("suggestion"),
		i: Ci,
		accept: /* @__PURE__ */ Y(/* @__PURE__ */ nr())
	})
]), Ti = (/* @__PURE__ */ G()).check(/* @__PURE__ */ Yn(1), /* @__PURE__ */ Jn(64)), Ei = /* @__PURE__ */ lr([/* @__PURE__ */ q({
	t: /* @__PURE__ */ J("result"),
	cid: Ti,
	ok: /* @__PURE__ */ J(!0)
}), /* @__PURE__ */ q({
	t: /* @__PURE__ */ J("result"),
	cid: Ti,
	ok: /* @__PURE__ */ J(!1),
	error: /* @__PURE__ */ G()
})]), Di = /* @__PURE__ */ G(), Oi = /* @__PURE__ */ er(), ki = /* @__PURE__ */ K(Di), $ = (e, t) => /* @__PURE__ */ q({
	t: /* @__PURE__ */ J(e),
	...t
}), Ai = $("doc", {
	text: Di,
	epic: /* @__PURE__ */ Y(/* @__PURE__ */ yr(Di)),
	stale: /* @__PURE__ */ Y(/* @__PURE__ */ J(!1)),
	fetched: /* @__PURE__ */ Y(/* @__PURE__ */ nr()),
	by: /* @__PURE__ */ Y(Di)
}), ji = $("doc", {
	epic: Di,
	stale: /* @__PURE__ */ J(!0),
	by: /* @__PURE__ */ Y(Di),
	text: /* @__PURE__ */ Y(/* @__PURE__ */ ir()),
	fetched: /* @__PURE__ */ Y(/* @__PURE__ */ ir())
}), Mi = {
	state: /* @__PURE__ */ sr(Lr, { t: /* @__PURE__ */ J("state") }),
	msg: $("msg", { m: Mr }),
	moved: $("moved", {
		id: Oi,
		thread: Di
	}),
	delta: $("delta", {
		id: Oi,
		text: Di
	}),
	typing: $("typing", {
		id: Oi,
		mode: Di,
		note: /* @__PURE__ */ Y(Di)
	}),
	closed: $("closed", {
		id: Oi,
		choices: Di
	}),
	epics: $("epics", {
		epics: /* @__PURE__ */ K(Ar),
		roomTasks: /* @__PURE__ */ Y(/* @__PURE__ */ K(kr))
	}),
	epicsPatch: $("epicsPatch", {
		changed: /* @__PURE__ */ K(Ar),
		order: ki,
		roomTasks: /* @__PURE__ */ Y(/* @__PURE__ */ K(kr))
	}),
	doc: /* @__PURE__ */ lr([ji, Ai]),
	docNotes: $("docNotes", { notes: ki }),
	meta: $("meta", {
		title: /* @__PURE__ */ Y(Di),
		folder: /* @__PURE__ */ Y(Di),
		summary: /* @__PURE__ */ Y(Di)
	}),
	suggestions: $("suggestions", { suggestions: /* @__PURE__ */ K(Tr) }),
	requests: $("requests", { requests: /* @__PURE__ */ K(Fr) }),
	members: $("members", {
		members: ki,
		pending: /* @__PURE__ */ Y(ki),
		requests: /* @__PURE__ */ Y(/* @__PURE__ */ K(Fr)),
		names: /* @__PURE__ */ Y(/* @__PURE__ */ pr(Di, Di)),
		avatars: /* @__PURE__ */ Y(/* @__PURE__ */ pr(Di, Oi))
	}),
	files: $("files", { files: /* @__PURE__ */ K(jr) }),
	fileAdd: $("fileAdd", { file: jr }),
	reminders: $("reminders", { reminders: /* @__PURE__ */ K(Pr) }),
	decisions: $("decisions", { decisions: /* @__PURE__ */ K(Er) }),
	pins: $("pins", { pins: /* @__PURE__ */ K(Dr) }),
	receipts: $("receipts", { receipts: /* @__PURE__ */ K(Ir) }),
	older: $("older", {
		messages: /* @__PURE__ */ K(Mr),
		thread: Di,
		more: /* @__PURE__ */ nr()
	}),
	acks: $("acks", { acks: /* @__PURE__ */ K(Nr) }),
	ackRows: $("ackRows", { acks: /* @__PURE__ */ K(Nr) }),
	poll: $("poll", { poll: Or }),
	online: $("online", { online: ki }),
	conns: $("conns", {}),
	error: $("error", { error: /* @__PURE__ */ Y(Di) }),
	blocked: $("blocked", {
		text: Di,
		reason: Di
	}),
	result: Ei
};
function Ni(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = e.t;
	return typeof t != "string" || !Object.hasOwn(Mi, t) ? !1 : Mi[t].safeParse(e).success;
}
// shared/validation.ts
var Pi = (e) => typeof e == "object" && !!e && !Array.isArray(e), Fi = Ni;
function Ii(e) {
	if (!Pi(e)) return e;
	let t = (e, t) => Pi(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Pi(e) ? {
		...e,
		tasks: n(e.tasks)
	} : e) : e, i = (e) => Array.isArray(e) ? e.map((e) => t(e, "enabled")) : e;
	return e.t === "state" || e.t === "epics" ? {
		...e,
		epics: r(e.epics),
		...e.roomTasks === void 0 ? {} : { roomTasks: n(e.roomTasks) },
		...e.reminders === void 0 ? {} : { reminders: i(e.reminders) }
	} : e.t === "epicsPatch" ? {
		...e,
		changed: r(e.changed),
		...e.roomTasks === void 0 ? {} : { roomTasks: n(e.roomTasks) }
	} : e.t === "reminders" ? {
		...e,
		reminders: i(e.reminders)
	} : e;
}
function Li(e) {
	let t = Ii(JSON.parse(e));
	if (!Fi(t)) throw TypeError("Invalid room event");
	return t;
}
function Ri(e) {
	return wi.safeParse(e).success;
}
// node_modules/hono/dist/client/utils.js
var zi = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Bi = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Vi = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Hi = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Ui = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function Wi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Gi(e, t) {
	if (!Wi(e) && !Wi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = Wi(n[e]) && Wi(r) ? Gi(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var Ki = /^[\w!#$%&'*.^`|~+-]+$/, qi = (e, t, n = {}) => {
	if (!Ki.test(e)) throw Error("Invalid cookie name");
	let r = `${e}=${t}`;
	if (e.startsWith("__Secure-") && !n.secure) throw Error("__Secure- Cookie must have Secure attributes");
	if (e.startsWith("__Host-")) {
		if (!n.secure) throw Error("__Host- Cookie must have Secure attributes");
		if (n.path !== "/") throw Error("__Host- Cookie must have Path attributes with \"/\"");
		if (n.domain) throw Error("__Host- Cookie must not have Domain attributes");
	}
	for (let e of [
		"domain",
		"path",
		"sameSite",
		"priority"
	]) if (n[e] && /[;\r\n]/.test(n[e])) throw Error(`${e} must not contain ";", "\\r", or "\\n"`);
	if (n && typeof n.maxAge == "number" && n.maxAge >= 0) {
		if (n.maxAge > 3456e4) throw Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
		r += `; Max-Age=${n.maxAge | 0}`;
	}
	if (n.domain && n.prefix !== "host" && (r += `; Domain=${n.domain}`), n.path && (r += `; Path=${n.path}`), n.expires) {
		if (n.expires.getTime() - Date.now() > 3456e7) throw Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
		r += `; Expires=${n.expires.toUTCString()}`;
	}
	if (n.httpOnly && (r += "; HttpOnly"), n.secure && (r += "; Secure"), n.sameSite && (r += `; SameSite=${n.sameSite.charAt(0).toUpperCase() + n.sameSite.slice(1)}`), n.priority && (r += `; Priority=${n.priority.charAt(0).toUpperCase() + n.priority.slice(1)}`), n.partitioned) {
		if (!n.secure) throw Error("Partitioned Cookie must have Secure attributes");
		r += "; Partitioned";
	}
	return r;
}, Ji = (e, t, n) => (t = encodeURIComponent(t), qi(e, t, n)), Yi = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Yi(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Xi = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Zi = class {
	url;
	method;
	buildSearchParams;
	queryParams = void 0;
	pathParams = {};
	rBody;
	cType = void 0;
	constructor(e, t, n) {
		this.url = e, this.method = t, this.buildSearchParams = n.buildSearchParams;
	}
	fetch = async (e, t) => {
		if (e) {
			if (e.query && (this.queryParams = this.buildSearchParams(e.query)), e.form) {
				let t = new FormData();
				for (let [n, r] of Object.entries(e.form)) if (r !== void 0) {
					if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
					else t.append(n, r);
				}
				this.rBody = t;
			}
			e.json !== void 0 && (this.rBody = JSON.stringify(e.json), this.cType = "application/json"), e.param && (this.pathParams = e.param);
		}
		let n = this.method.toUpperCase(), r = {
			...e?.header,
			...typeof t?.headers == "function" ? await t.headers() : t?.headers
		};
		if (e?.cookie) {
			let t = [];
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Ji(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Ui(a), a = Bi(a, this.pathParams), this.queryParams && (a = Xi(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, Qi = (e, t) => Yi(function n(r) {
	let i = t?.buildSearchParams ?? Vi, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = zi(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Ui(c);
		return r.args[0] && (r.args[0].param && (t = Bi(t, r.args[0].param)), r.args[0].query && (t = Xi(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Ui(c), n = Hi(r.args[0]?.param ? Bi(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Zi(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Gi(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), $i = (e = "/", t) => Qi(e, t ? { fetch: t } : {});
// svelte/transport.ts
function ea(e, t, n) {
	if (!Ri(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function ta(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return Li(e);
}
async function na(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function ra(e, t) {
	let n = bi.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function ia(e, t = fetch) {
	let n = $i("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await na(t);
			if (t.ok || t.status === 400) {
				let e = gi.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw ra(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await na(t);
			if (!t.ok) throw ra(t, i);
			let a = yi.safeParse(i);
			if (!a.success) throw TypeError(vi.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		},
		async setIcon(e) {
			let t = await n.icon.$post({
				param: { id: r },
				header: { "content-type": e ? e.type : "application/json" }
			}, { init: { body: e ? e.body : "{}" } }), i = await na(t);
			if (!t.ok) throw ra(t, i);
			let a = xi.safeParse(i);
			if (!a.success) throw TypeError("Invalid icon response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var aa = a("<button class=\"primary\" id=\"remNew\"><!> </button>"), oa = a("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), sa = a("<span class=\"err\"> </span>"), ca = a("<pre class=\"remText\"> </pre>"), la = a("<button class=\"ghost\"></button>"), ua = a("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), da = a("<div class=\"empty\"> </div>"), fa = a("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function pa(e, t) {
	b(t, !0);
	let n = m(null), a = m(""), o = m(!1), s = m(E([])), u = k(() => t.room.reminders || []), d = k(() => t.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), f = (e) => new Date(e).toLocaleString(v(d), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function p(e) {
		c(n, e, !0), c(a, "");
	}
	function _(e) {
		c(s, v(s).includes(e.id) ? v(s).filter((t) => t !== e.id) : [...v(s), e.id], !0);
	}
	async function y(e) {
		if (e.preventDefault(), !v(n) || v(o)) return;
		let r = { ...v(n) }, i = r.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		c(o, !0), c(a, "");
		try {
			let e = await ia(t.room.id).uploadFile({
				name: `reminders/${i}.md`,
				type: "text/markdown",
				body: r.text
			});
			if (e.reminder && !e.reminder.ok) {
				c(a, `⚠ ${e.reminder.error || t.vb.t("falhou")}`), c(n, {
					...r,
					name: i,
					fixed: !0
				}, !0);
				return;
			}
			c(n, null);
		} catch (e) {
			c(a, e instanceof Error ? e.message : t.vb.t("sem conexão"), !0);
		} finally {
			c(o, !1);
		}
	}
	var x = fa(), S = T(x), D = r(S);
	j(D, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), L(D);
	var A = w(D, 2), M = (e) => {
		var n = aa(), a = r(n);
		j(a, () => t.vb.icon("plus", 14));
		var o = w(a);
		L(n), h((e) => i(o, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), z("click", n, () => p({
			name: "",
			text: ""
		})), C(e, n);
	};
	U(A, (e) => {
		v(n) || e(M);
	}), L(S);
	var N = w(S, 2), P = (e) => {
		var s = oa(), u = r(s);
		ce(u);
		var d = w(u, 2);
		O(d);
		var f = w(d, 2), p = r(f), m = l(p, !0), _ = w(p), b = l(_, !0), x = w(_), S = l(x, !0);
		L(f), L(s), h((e, t, r, s) => {
			H(u, "placeholder", e), u.readOnly = v(n).fixed, H(d, "placeholder", t), i(m, v(a)), i(b, r), x.disabled = v(o), i(S, s);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), g("submit", s, y), ye(u, () => v(n).name, (e) => v(n).name = e), ye(d, () => v(n).text, (e) => v(n).text = e), z("click", _, () => c(n, null)), C(e, s);
	};
	U(N, (e) => {
		v(n) && e(P);
	});
	var F = w(N, 2);
	we(F, 17, () => v(u), (e) => e.id, (e, n) => {
		var a = ua();
		let o;
		var c = r(a), u = r(c), d = r(u);
		j(d, () => t.vb.icon(v(s).includes(v(n).id) ? "chevronDown" : "chevronRight", 13));
		var m = w(d);
		L(u);
		var g = w(u, 2), y = r(g), b = (e) => {
			var r = B();
			h((e) => i(r, `${(v(n).every || v(n).cron || "") ?? ""}${e ?? ""} ·`), [() => v(n).enabled && v(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: f(v(n).next_at) })}` : ""]), C(e, r);
		};
		U(y, (e) => {
			v(n).error || e(b);
		});
		var x = w(y, 1, !0);
		L(g);
		var S = w(g, 2), T = (e) => {
			var t = sa(), r = l(t);
			h(() => i(r, `⚠ ${v(n).error ?? ""}`)), C(e, t);
		};
		U(S, (e) => {
			v(n).error && e(T);
		});
		var E = w(S), D = (e) => {
			var t = ca(), r = l(t, !0);
			h(() => i(r, v(n).text)), C(e, t);
		}, O = k(() => v(s).includes(v(n).id));
		U(E, (e) => {
			v(O) && e(D);
		}), L(c);
		var A = w(c, 2), ee = (e) => {
			var r = la();
			j(r, () => t.vb.icon("pencil", 14), !0), L(r), h((e, t) => {
				H(r, "data-rem-edit", v(n).id), H(r, "title", e), H(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), z("click", r, () => p({
				name: v(n).name,
				text: v(n).text,
				fixed: !0
			})), C(e, r);
		};
		U(A, (e) => {
			v(n).name && e(ee);
		});
		var M = w(A, 2), N = r(M);
		ce(N);
		var P = w(N, 1, !0);
		L(M);
		var F = w(M, 2);
		j(F, () => t.vb.icon("x"), !0), L(F), L(a), h((e, t, r, s, l, u, d) => {
			o = re(a, 1, "rem", null, o, {
				bad: !!v(n).error,
				off: !v(n).enabled,
				open: e
			}), H(c, "data-rem-open", v(n).id), H(c, "title", t), i(m, ` ${(v(n).name ? `${v(n).name}.md` : v(n).text) ?? ""}`), i(x, r), H(M, "title", s), H(N, "data-rem-on", v(n).id), I(N, v(n).enabled), N.disabled = !!v(n).error, i(P, l), H(F, "data-rem-del", v(n).id), H(F, "title", u), H(F, "aria-label", d);
		}, [
			() => v(s).includes(v(n).id),
			() => t.vb.t(v(s).includes(v(n).id) ? "Esconder o texto" : "Ver o texto"),
			() => t.vb.t("de {who}", { who: t.vb.name(v(n).owner) }),
			() => t.vb.t("Ligado"),
			() => t.vb.t("ligado"),
			() => t.vb.t("Apagar lembrete"),
			() => t.vb.t("Apagar lembrete")
		]), z("click", c, (e) => {
			e.target.closest(".remText") || _(v(n));
		}), z("keydown", c, (e) => {
			e.key === "Enter" && _(v(n));
		}), z("change", N, (e) => t.send({
			t: "reminder.enable",
			id: v(n).id,
			on: e.currentTarget.checked
		})), z("click", F, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: v(n).id
			});
		}), C(e, a);
	});
	var te = w(F, 2), R = (e) => {
		var n = da(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), C(e, n);
	};
	U(te, (e) => {
		!v(u).length && !v(n) && e(R);
	}), C(e, x), ee();
}
n([
	"click",
	"keydown",
	"change"
]);
// svelte/features/navigation/model.ts
function ma(e) {
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
function ha(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function ga(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
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
function _a(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function va(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = ma(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function ya() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function ba(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function xa(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function Sa(e, t = !1, n = ya()) {
	return {
		roomId: e,
		storage: n,
		state: _e({
			draft: "",
			closed: ba(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function Ca(e, t, n) {
	let r = V(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of ha(t, n)) i.delete(e);
	xa(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function wa(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), xa(e, r), {
			...n,
			closed: r
		};
	});
}
function Ta(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : Sa(t.id, r);
	return Ca(i, ma(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var Ea = a("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), Da = a("<span class=\"tw:sr-only\"> </span>"), Oa = a("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), ka = a("<span> </span>"), Aa = a("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), ja = a("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), Ma = a("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), Na = a("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), Pa = a(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), Fa = a("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), Ia = a("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), La = a("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Ra = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function za(n, a) {
	let f = _();
	b(a, !0);
	let y = () => R(v(D), "$navigation", S), [S, E] = e(), D = k(() => a.session.state), O = m(""), A = m(null), j = m(null), N = m(!1), P = m(null), F = !1, I = /* @__PURE__ */ new Map(), ne = 0, ie = m(null), ae = m("");
	d(() => {
		F = !0, ne++, I.clear();
	});
	let oe = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], z = k(() => a.room.epics.filter((e) => !e.archived)), ce = k(() => _a(a.room.epics, a.room.messages)), de = k(() => y().archived && v(ce).length > 0 ? "archived" : "active"), V = k(() => ma(v(de) === "archived" ? v(ce) : v(z))), pe = k(() => ma(a.room.epics)), _e = k(() => new Set(a.room.epics.filter((e) => a.vb.epicBusy(e)).map((e) => e.id))), ve = k(() => ga(v(V), y().closed, v(_e), !0)), ye = k(() => new Map(v(ve).map((e, t) => [e.epic.id, `${f}-row-${t}`])));
	x(() => {
		Ca(a.session, v(pe), a.thread);
	});
	function be(e) {
		if (F) return;
		ne++, c(ie, null);
		let t = e === "archived";
		v(D).update((e) => ({
			...e,
			archived: t
		})), a.onarchchange(t), c(A, null), c(j, null), c(O, "");
	}
	function Te(e) {
		if (F || a.session.roomId !== a.room.id) return !1;
		c(O, "");
		try {
			if (a.send(e)) return !0;
		} catch {}
		return c(O, a.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function De(e) {
		if (e.preventDefault(), F) return;
		let t = y().draft.trim();
		if (!t) return v(P)?.focus();
		Te({
			t: "epic",
			title: t
		}) && Se(v(D), u(y).draft = "", u(y));
	}
	function Oe(e) {
		let t = v(V).parents.get(e);
		return t ? v(V).children.get(t) ?? [] : v(V).roots;
	}
	function ke(e, t) {
		let n = Oe(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function Ae(e, t, n) {
		let r = va(a.room.epics, e, t, n);
		if (!r || F) return;
		c(ie, null);
		let i = ++ne, o = document.activeElement, s = o instanceof HTMLElement && I.get(e)?.contains(o) ? o : null;
		Te({
			t: "epic.order",
			ids: r
		}) && c(ie, {
			ids: r,
			from: e,
			anchor: s,
			generation: i,
			thread: a.thread
		}, !0);
	}
	function je(e, t) {
		return I.set(t, e), { destroy() {
			I.get(t) === e && I.delete(t);
		} };
	}
	x(() => {
		let e = v(ie);
		if (!e) return;
		if (e.thread !== a.thread || v(de) !== "active") {
			c(ie, null), ne++;
			return;
		}
		let t = a.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			c(ie, null), Me(e);
			return;
		}
		let n = new Set(t), r = new Set(e.ids), i = e.ids.filter((e) => n.has(e)), o = t.filter((e) => r.has(e));
		o.length !== i.length || o.some((e, t) => e !== i[t]) || (c(ie, null), c(ae, a.vb.t("Ordem dos épicos atualizada."), !0), Me(e));
	});
	function Me(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && s().then(() => {
			if (F || e.generation !== ne || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = I.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? v(P))?.focus({ preventScroll: !0 });
		});
	}
	function Ne(e, t) {
		let n = ke(e, t);
		v(de) === "active" && n && Ae(e, n.id, t === 1);
	}
	function Pe(e, t) {
		if (v(de) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", c(A, t, !0);
	}
	function Fe(e, t) {
		return v(de) === "active" && v(A) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Ie(e, t) {
		if (!Fe(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		c(j, t, !0), c(N, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function Le(e, t) {
		let n = v(N);
		if (c(j, null), !Fe(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && Ae(r, t, n), c(A, null);
	}
	var Re = Ra(), ze = r(Re);
	{
		let e = (e, n = xe) => {
			var s = o(), d = T(s), m = (e) => {
				var o = Ia(), s = T(o);
				we(s, 21, () => v(ve), (e) => e.epic.id, (e, o) => {
					let s = k(() => v(o).epic), u = k(() => y().closed.has(v(s).id)), d = k(() => v(V).byId.get(v(V).parents.get(v(s).id) ?? "")), f = k(() => a.vb.epicBusy(v(s)));
					var m = Na(), _ = r(m), b = r(_), x = (e) => {
						{
							let t = k(() => v(u) ? "chevronRight" : "chevronDown"), n = k(() => `${a.vb.t(v(u) ? "Abrir galho" : "Fechar galho")}: ${v(s).title}`), r = k(() => !v(u)), i = k(() => (v(V).children.get(v(s).id) ?? []).map((e) => v(ye).get(e.id)).join(" "));
							Ce(e, {
								get icon() {
									return v(t);
								},
								get label() {
									return v(n);
								},
								get "aria-expanded"() {
									return v(r);
								},
								get "aria-controls"() {
									return v(i);
								},
								class: "tw:size-8 tw:p-1",
								onclick: () => wa(a.session, v(s).id)
							});
						}
					}, S = (e) => {
						var t = Ea();
						C(e, t);
					};
					U(b, (e) => {
						v(o).hasChildren ? e(x) : e(S, -1);
					});
					var E = w(b, 2);
					{
						let e = k(() => a.thread === v(s).id ? "page" : void 0);
						te(E, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return v(s).id;
							},
							get "aria-current"() {
								return v(e);
							},
							onclick: () => {
								a.thread === v(s).id && v(o).hasChildren ? wa(a.session, v(s).id) : a.onopen(v(s).id);
							},
							children: (e, n) => {
								var c = ja(), m = T(c);
								{
									let e = k(() => v(s).owner ? a.vb.name(v(s).owner) : v(s).title), t = k(() => v(s).owner && a.room.avatars?.[v(s).owner] ? `/api/avatar/${encodeURIComponent(v(s).owner)}?v=${a.room.avatars[v(s).owner]}` : void 0);
									p(m, {
										get name() {
											return v(e);
										},
										get src() {
											return v(t);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var g = w(m, 2), _ = r(g, !0), y = w(_), b = (e) => {
									var t = Da(), n = l(t);
									h((e) => i(n, `· ${e ?? ""}`), [() => a.vb.t("Subépico de {title}", { title: v(d).title })]), C(e, t);
								};
								U(y, (e) => {
									v(d) && e(b);
								}), L(g);
								var x = w(g, 2), S = (e) => {
									var t = Oa();
									h((e) => H(t, "aria-label", e), [() => v(f) ? a.vb.t("{who} está trabalhando", { who: v(f) }) : a.vb.t("Trabalho em um subépico")]), C(e, t);
								};
								U(x, (e) => {
									(v(f) || v(u) && v(o).busyBelow) && e(S);
								});
								var E = w(x, 2), D = (e) => {
									ge(e, {
										variant: "warning",
										children: (e, n) => {
											t();
											var r = B();
											h((e) => i(r, e), [() => a.vb.waitCount(v(s).id)]), C(e, r);
										},
										$$slots: { default: !0 }
									});
								}, O = k(() => a.vb.waitCount(v(s).id));
								U(E, (e) => {
									v(O) && e(D);
								});
								var A = w(E, 2), ee = (e) => {
									var t = ka(), n = l(t, !0);
									h((e) => {
										H(t, "title", e), i(n, v(s).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => a.vb.t(v(s).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), C(e, t);
								};
								U(A, (e) => {
									v(s).prod && e(ee);
								});
								var j = w(A, 2), M = (e) => {
									var t = Aa(), n = l(t);
									h((e) => i(n, `${e ?? ""}/${v(s).tasks.length ?? ""}`), [() => v(s).tasks.filter((e) => e.done).length]), C(e, t);
								};
								U(j, (e) => {
									v(s).tasks.length && e(M);
								}), h(() => i(_, v(s).title)), C(e, c);
							},
							$$slots: { default: !0 }
						});
					}
					L(_);
					var D = w(_, 2), O = r(D), ee = l(O), P = w(O, 2), F = r(P);
					{
						let e = k(() => `${v(ye).get(v(s).id)}-owner`);
						ue(F, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = B();
								h((e) => i(r, e), [() => a.vb.t("Dono do épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var I = w(F, 2);
					{
						let e = k(() => `${v(ye).get(v(s).id)}-owner`), t = k(() => `${a.vb.t("Dono do épico")}: ${v(s).title}`), n = k(() => v(s).owner ?? ""), r = k(() => [{
							value: "",
							label: a.vb.t("Sem dono")
						}, ...a.room.members.map((e) => ({
							value: e,
							label: a.vb.name(e)
						}))]);
						M(I, {
							get id() {
								return v(e);
							},
							get "aria-label"() {
								return v(t);
							},
							get value() {
								return v(n);
							},
							get items() {
								return v(r);
							},
							onValueChange: (e) => (Te({
								t: "epic.owner",
								id: v(s).id,
								owner: e
							}), !1)
						});
					}
					var R = w(I, 2), ne = (e) => {
						var n = Ma(), o = r(n);
						{
							let e = k(() => !ke(v(s).id, -1)), n = k(() => `${a.vb.t("Mover para cima")}: ${v(s).title}`);
							te(o, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Ne(v(s).id, -1),
								children: (e, n) => {
									t();
									var r = B();
									h((e) => i(r, e), [() => a.vb.t("Mover para cima")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var c = w(o);
						{
							let e = k(() => !ke(v(s).id, 1)), n = k(() => `${a.vb.t("Mover para baixo")}: ${v(s).title}`);
							te(c, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Ne(v(s).id, 1),
								children: (e, n) => {
									t();
									var r = B();
									h((e) => i(r, e), [() => a.vb.t("Mover para baixo")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						L(n), C(e, n);
					};
					U(R, (e) => {
						n() === "active" && e(ne);
					}), L(P), L(D), L(m), le(m, (e, t) => je?.(e, t), () => v(s).id), h((e, t, r, a) => {
						H(m, "id", e), H(m, "hidden", v(o).hidden), H(m, "data-epic", v(s).id), H(m, "data-depth", v(o).depth), re(m, 1, t), H(_, "aria-label", v(s).title), H(_, "draggable", n() === "active"), re(_, 1, r), i(ee, `${a ?? ""}: ${v(s).title ?? ""}`);
					}, [
						() => v(ye).get(v(s).id),
						() => me(oe[Math.min(v(o).depth, oe.length - 1)]),
						() => me(he("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", a.thread === v(s).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", v(j) === v(s).id && (v(N) ? "tw:border-b-primary" : "tw:border-t-primary"), v(A) === v(s).id && "tw:opacity-50")),
						() => a.vb.t("Ações do épico")
					]), g("dragstart", _, (e) => Pe(e, v(s).id)), g("dragend", _, () => {
						c(A, null), c(j, null);
					}), g("dragover", _, (e) => Ie(e, v(s).id)), g("dragleave", _, () => {
						v(j) === v(s).id && c(j, null);
					}), g("drop", _, (e) => Le(e, v(s).id)), C(e, m);
				}), L(s);
				var d = w(s, 2), m = (e) => {
					var n = Fa(), o = T(n), s = r(o);
					{
						let e = k(() => `${f}-new`);
						ue(s, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = B();
								h((e) => i(r, e), [() => a.vb.t("Novo épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var d = w(s, 2), p = r(d), m = () => F ? "" : y().draft, _ = (e) => {
						F || Se(v(D), u(y).draft = e, u(y));
					};
					{
						let e = k(() => `${f}-new`), t = k(() => a.vb.t("Novo épico: escreva o título…"));
						fe(p, {
							get id() {
								return v(e);
							},
							get value() {
								return m();
							},
							set value(e) {
								_(e);
							},
							get placeholder() {
								return v(t);
							},
							enterkeyhint: "done",
							get ref() {
								return v(P);
							},
							set ref(e) {
								c(P, e, !0);
							}
						});
					}
					var b = w(p);
					{
						let e = k(() => a.vb.t("Criar épico"));
						Ce(b, {
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return v(e);
							}
						});
					}
					L(d), L(o);
					var x = w(o, 2);
					we(x, 17, () => a.room.suggestions, Ee, (e, n, r) => {
						{
							let o = k(() => a.thread === `pre:${r}` ? "page" : void 0);
							te(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return v(o);
								},
								onclick: () => a.onopen(`pre:${r}`),
								children: (e, r) => {
									t();
									var o = Pa(), s = T(o, !0), c = w(s), u = l(c, !0);
									h((e) => {
										i(s, v(n).title), i(u, e);
									}, [() => a.vb.t("sugestão do @vibe, clique para ver")]), C(e, o);
								},
								$$slots: { default: !0 }
							});
						}
					}), g("submit", o, De), C(e, n);
				};
				U(d, (e) => {
					n() === "active" && e(m);
				}), h((e) => H(s, "aria-label", e), [() => n() === "archived" ? a.vb.t("Arquivados") : a.vb.t("Épicos")]), C(e, o);
			};
			U(d, (e) => {
				n() === v(de) && e(m);
			}), C(e, s);
		}, n = k(() => [{
			value: "active",
			label: `${a.vb.t("Épicos")} · ${v(z).length}`
		}, {
			value: "archived",
			label: `${a.vb.t("Arquivados")} · ${v(ce).length}`,
			disabled: v(ce).length === 0
		}]), s = k(() => a.vb.t("Épicos"));
		se(ze, {
			get items() {
				return v(n);
			},
			get label() {
				return v(s);
			},
			get value() {
				return v(de);
			},
			onValueChange: be,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Be = w(ze, 2), Ve = l(Be, !0), He = w(Be, 2), Ue = (e) => {
		var t = La(), n = l(t, !0);
		h(() => i(n, v(O))), C(e, t);
	};
	U(He, (e) => {
		v(O) && e(Ue);
	}), L(Re), h((e) => {
		H(Re, "aria-label", e), i(Ve, v(ae));
	}, [() => a.vb.t("Épicos")]), C(n, Re), ee(), E();
}
// svelte/features/pins/model.ts
function Ba(e) {
	let t = e.trim();
	if (!t || t.length > 2e3 || /[\u0000-\u001f\u007f]/.test(t)) return null;
	try {
		let e = new URL(/^[a-z]+:\/\//i.test(t) ? t : `https://${t}`);
		return e.protocol === "http:" || e.protocol === "https:" ? e.href : null;
	} catch {
		return null;
	}
}
function Va(e) {
	let t = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(e);
	return t ? {
		connectionId: t[1] ?? "room",
		tool: t[2]
	} : null;
}
function Ha(e, t) {
	if (e.kind === "link") {
		let t = Ba(e.ref);
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
		let n = Va(e.ref), r = n?.connectionId === "room" && t.filesAll && !t.files?.some((e) => e.name === `apps/${n.tool}.html`);
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
var Ua = () => ({
	url: "",
	title: ""
});
function Wa(e) {
	return {
		roomId: e,
		active: !0,
		pins: [],
		filesRequested: !1,
		sequence: 0,
		state: _e({
			adding: !1,
			draft: Ua(),
			pending: null,
			issue: null,
			filesPending: !1,
			fileIssue: null
		})
	};
}
function Ga(e) {
	e && (e.active = !1, e.sequence++);
}
function Ka(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !0,
		issue: null
	}));
}
function qa(e, t) {
	e.active && e.state.update((e) => ({
		...e,
		draft: {
			...e.draft,
			...t
		},
		issue: null
	}));
}
function Ja(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !1,
		issue: null
	}));
}
function Ya(e, t) {
	return e.url === t.url && e.title === t.title;
}
function Xa(e, t, n) {
	return n.some((n) => n.kind === "link" && n.ref === e && (!t || n.title === t));
}
function Za(e, t) {
	let n = e;
	n?.active && n.roomId === t.id || (Ga(n), n = Wa(t.id)), n.pins = t.pins ?? [];
	let r = V(n.state), i = t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref));
	return (t.filesAll || !i) && (r.filesPending || r.fileIssue) && (r = {
		...r,
		filesPending: !1,
		fileIssue: null
	}, n.state.set(r)), n;
}
async function Qa(e, t, n, r, i) {
	if (!e.active || e.roomId !== t || V(e.state).pending) return;
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
	let o = () => e.active && e.sequence === a && V(e.state).pending?.sequence === a, s;
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
	let c = V(e.state);
	if (s.ok) {
		let t = r.t === "pin.add" && i && Ya(c.draft, i);
		e.state.set({
			...c,
			pending: null,
			issue: null,
			...t ? {
				adding: !1,
				draft: Ua()
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
async function $a(e, t, n) {
	if (!e.active || e.roomId !== t || V(e.state).pending) return;
	let r = V(e.state);
	if (!r.adding) return;
	let i = Ba(r.draft.url);
	if (!i) {
		e.state.update((e) => ({
			...e,
			issue: { kind: "invalid-link" }
		}));
		return;
	}
	let a = r.draft.title.trim().slice(0, 80);
	if (Xa(i, a, e.pins)) e.state.set({
		...r,
		adding: !1,
		draft: Ua(),
		issue: { kind: "already-pinned" }
	});
	else return Qa(e, t, n, {
		t: "pin.add",
		kind: "link",
		ref: i,
		title: a
	}, { ...r.draft });
}
async function eo(e, t, n, r) {
	if (e.pins.some((e) => e.id === n)) return Qa(e, t, r, {
		t: "pin.del",
		id: n
	});
}
function to(e, t, n, r = !1) {
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
// svelte/features/pins/PinnedItems.svelte
var no = a("<form class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div></form>"), ro = a("<p role=\"status\" class=\"tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground\"> </p>"), io = a("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:text-muted-foreground\"> </span></span></a>"), ao = a("<!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground\"> </span></span>", 1), oo = a("<div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:text-xs\"> </span></span></div>"), so = a("<li class=\"tw:flex tw:items-start tw:gap-1\"><!> <!></li>"), co = a("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul>"), lo = a("<!> ", 1), uo = a("<section class=\"tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground\" data-native-pins=\"\" data-vb-native=\"\"><div class=\"tw:flex tw:items-center tw:justify-between tw:gap-2\"><h2 class=\"tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h2> <!></div> <!> <!> <!> <!> <!> <!></section>");
function fo(n, a) {
	b(a, !0);
	let o = () => R(v(O), "$pinState", u), [u, f] = e(), p = !1;
	d(() => {
		p = !0;
	});
	function _() {
		return !p && a.session.active && a.session.roomId === a.room.id;
	}
	function y(e) {
		_() && qa(a.session, e);
	}
	function S(e) {
		_() && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), oe());
	}
	function E() {
		_() && to(a.session, a.room, a.send, !0);
	}
	function D(e) {
		_() && eo(a.session, a.room.id, e, a.request);
	}
	let O = k(() => a.session.state), A = k(() => (a.room.pins ?? []).map((e) => ({
		pin: e,
		target: Ha(e, a.room)
	}))), j = k(() => v(A).some((e) => e.target.kind === "file-unloaded")), M = m(null), N = m(null), P = k(() => a.session.active && a.session.roomId === a.room.id), F = m(null), I = m(null), ne = k(() => `pin-url-${a.room.id}`), re = (e) => a.t({
		"invalid-link": "Use um link http ou https válido.",
		offline: "Sem conexão. Seu rascunho foi mantido.",
		"send-failed": "Não deu pra enviar agora. Tente de novo.",
		unconfirmed: "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
		"already-pinned": "Este link já está nos fixados.",
		rejected: "Não deu pra atualizar os fixados. Tente de novo."
	}[e.kind]);
	x(() => {
		if (p || !v(M)) return;
		if (v(N) !== a.session || !a.session.active || a.session.roomId !== a.room.id) {
			c(M, null), c(N, null);
			return;
		}
		let e = a.room.pins?.find((e) => e.id === v(M) && e.kind === "file");
		if (!e) {
			c(M, null), c(N, null);
			return;
		}
		let t = Ha(e, a.room);
		t.kind === "file" ? (c(M, null), c(N, null), a.onopenfile(t.file)) : a.room.filesAll && (c(M, null), c(N, null));
	});
	async function ae() {
		if (!_()) return;
		let e = a.session;
		Ka(e), await s(), !p && a.session === e && e.active && e.roomId === a.room.id && v(F)?.isConnected && v(F).focus();
	}
	async function oe() {
		if (!_()) return;
		let e = a.session;
		Ja(e), await s(), !p && a.session === e && e.active && e.roomId === a.room.id && v(I)?.isConnected && v(I).focus();
	}
	function se(e) {
		e.preventDefault(), _() && $a(a.session, a.room.id, a.request);
	}
	function ce(e) {
		if (!_()) return;
		let t = a.room.pins?.find((t) => t.id === e);
		if (!t) return;
		let n = Ha(t, a.room);
		n.kind === "file" && a.onopenfile(n.file), n.kind === "app" && a.onopenapp(n.app), n.kind === "file-unloaded" && (c(N, a.session), c(M, e, !0), to(a.session, a.room, a.send, !o().filesPending));
	}
	var le = uo(), de = r(le), V = r(de), pe = l(V, !0), me = w(V, 2), he = (e) => {
		{
			let t = k(() => a.t("Fixar um link")), n = k(() => !v(P));
			Ce(e, {
				get label() {
					return v(t);
				},
				icon: "plus",
				get disabled() {
					return v(n);
				},
				onclick: ae,
				get ref() {
					return v(I);
				},
				set ref(e) {
					c(I, e, !0);
				}
			});
		}
	};
	U(me, (e) => {
		o().adding || e(he);
	}), L(de);
	var ge = w(de, 2), _e = (e) => {
		var n = no(), s = r(n), l = r(s);
		ue(l, {
			get for() {
				return v(ne);
			},
			children: (e, n) => {
				t();
				var r = B();
				h((e) => i(r, e), [() => a.t("Link pra fixar")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var u = w(l, 2);
		{
			let e = k(() => a.t("Cole um link (site, repo, painel…)")), t = k(() => !v(P)), n = k(() => o().issue?.kind === "invalid-link" || void 0);
			fe(u, {
				get id() {
					return v(ne);
				},
				name: "url",
				get value() {
					return o().draft.url;
				},
				onkeydown: S,
				oninput: (e) => y({ url: e.currentTarget.value }),
				required: !0,
				maxlength: 2e3,
				autocomplete: "url",
				get placeholder() {
					return v(e);
				},
				get disabled() {
					return v(t);
				},
				get "aria-invalid"() {
					return v(n);
				},
				get ref() {
					return v(F);
				},
				set ref(e) {
					c(F, e, !0);
				}
			});
		}
		L(s);
		var d = w(s, 2), f = r(d);
		{
			let e = k(() => `${v(ne)}-title`);
			ue(f, {
				get for() {
					return v(e);
				},
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Nome (opcional)")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var p = w(f, 2);
		{
			let e = k(() => `${v(ne)}-title`), t = k(() => !v(P));
			fe(p, {
				get id() {
					return v(e);
				},
				name: "title",
				get value() {
					return o().draft.title;
				},
				onkeydown: S,
				oninput: (e) => y({ title: e.currentTarget.value }),
				maxlength: 80,
				get disabled() {
					return v(t);
				}
			});
		}
		L(d);
		var m = w(d, 2), _ = r(m);
		{
			let e = k(() => !v(P));
			te(_, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return v(e);
				},
				onclick: oe,
				onkeydown: S,
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Cancelar")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var b = w(_, 2);
		{
			let e = k(() => !v(P) || !!o().pending);
			te(b, {
				type: "submit",
				size: "sm",
				get disabled() {
					return v(e);
				},
				onkeydown: S,
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Fixar")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		L(m), L(n), h((e) => H(n, "aria-label", e), [() => a.t("Fixar um link")]), g("submit", n, se), C(e, n);
	};
	U(ge, (e) => {
		o().adding && e(_e);
	});
	var ye = w(ge, 2), be = (e) => {
		var t = ro(), n = l(t, !0);
		h((e) => i(n, e), [() => a.t("Aguardando confirmação…")]), C(e, t);
	};
	U(ye, (e) => {
		o().pending && e(be);
	});
	var xe = w(ye, 2), Se = (e) => {
		var t = ro(), n = l(t, !0);
		h((e) => i(n, e), [() => re(o().issue)]), C(e, t);
	}, Te = (e) => {
		{
			let t = k(() => re(o().issue));
			ve(e, {
				compact: !0,
				get title() {
					return v(t);
				},
				get description() {
					return o().issue.detail;
				}
			});
		}
	};
	U(xe, (e) => {
		o().issue?.kind === "already-pinned" ? e(Se) : o().issue && e(Te, 1);
	});
	var Ee = w(xe, 2), De = (e) => {
		{
			let t = k(() => re({ kind: o().fileIssue }));
			ve(e, {
				compact: !0,
				get title() {
					return v(t);
				}
			});
		}
	};
	U(Ee, (e) => {
		o().fileIssue && e(De);
	});
	var Oe = w(Ee, 2), ke = (e) => {
		{
			let n = k(() => !v(P));
			te(e, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return v(n);
				},
				onclick: E,
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Tentar carregar novamente")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(Oe, (e) => {
		v(j) && (o().filesPending || o().fileIssue) && e(ke);
	});
	var Ae = w(Oe, 2), je = (e) => {
		var t = co();
		we(t, 21, () => v(A), ({ pin: e, target: t }) => e.id, (e, t) => {
			let n = () => v(t).pin, s = () => v(t).target;
			var c = so(), u = r(c), d = (e) => {
				var t = io(), n = r(t);
				ie(n, { name: "chevronRight" });
				var a = w(n), o = r(a), c = l(o, !0), u = w(o), d = l(u, !0);
				L(a), L(t), h(() => {
					H(t, "href", s().href), H(t, "title", s().href), i(c, s().label), i(d, s().detail);
				}), z("click", t, (e) => {
					_() || e.preventDefault();
				}), C(e, t);
			}, f = (e) => {
				{
					let t = k(() => !v(P));
					te(e, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left",
						get disabled() {
							return v(t);
						},
						onclick: () => ce(n().id),
						children: (e, t) => {
							var n = ao(), c = T(n);
							ie(c, { name: "chevronRight" });
							var u = w(c), d = r(u), f = l(d, !0), p = w(d), m = l(p, !0);
							L(u), h((e) => {
								i(f, s().label), i(m, e);
							}, [() => s().kind === "file-unloaded" ? a.t(o().filesPending ? "Carregando arquivo…" : "Carregar arquivo") : a.t(s().detail)]), C(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			}, p = (e) => {
				var t = oo(), n = r(t);
				ie(n, {
					name: "warning",
					class: "tw:mt-0.5"
				});
				var o = w(n), c = r(o), u = l(c, !0), d = w(c), f = l(d, !0);
				L(o), L(t), h((e) => {
					i(u, s().label), i(f, e);
				}, [() => a.t(s().reason)]), C(e, t);
			};
			U(u, (e) => {
				s().kind === "link" ? e(d) : s().kind === "file" || s().kind === "app" || s().kind === "file-unloaded" ? e(f, 1) : e(p, -1);
			});
			var m = w(u, 2);
			{
				let e = k(() => a.t("Desafixar {name}", { name: s().label })), t = k(() => !v(P) || !!o().pending);
				Ce(m, {
					icon: "close",
					get label() {
						return v(e);
					},
					get disabled() {
						return v(t);
					},
					onclick: () => D(n().id)
				});
			}
			L(c), h(() => H(c, "data-pin-id", n().id)), C(e, c);
		}), L(t), C(e, t);
	}, Me = (e) => {
		{
			let t = k(() => !v(P));
			te(e, {
				variant: "ghost",
				class: "tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground",
				get disabled() {
					return v(t);
				},
				onclick: ae,
				children: (e, t) => {
					var n = lo(), r = T(n);
					ie(r, { name: "plus" });
					var o = w(r, 1, !0);
					h((e) => i(o, e), [() => a.t("Fixar site, repo ou app")]), C(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(Ae, (e) => {
		v(A).length ? e(je) : o().adding || e(Me, 1);
	}), L(le), h((e) => {
		H(le, "aria-labelledby", `pins-title-${a.room.id}`), H(V, "id", `pins-title-${a.room.id}`), i(pe, e);
	}, [() => a.t("Fixados")]), C(n, le), ee(), f();
}
n(["click"]);
// svelte/Sidebar.svelte
var po = a("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), mo = a("<span class=\"fn\"> </span>"), ho = a("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), go = a("<button type=\"button\" class=\"ghost x\"></button>"), _o = a("<div class=\"member\"><!> <!> <!></div> <!>", 1), vo = a("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), yo = a("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), bo = a("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), xo = a("<div class=\"asks\"><h4> </h4> <!></div>"), So = a("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), Co = a("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), wo = a("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), To = a("<option></option>"), Eo = a("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function Do(e, n) {
	b(n, !0);
	let a = (e, t = xe) => {
		var a = _o(), o = T(a), s = r(o);
		j(s, () => n.vb.avatar(t(), n.room.online.includes(t())));
		var c = w(s, 2), u = (e) => {
			var a = po(), o = r(a), s = r(o), c = l(s, !0), u = w(s), d = l(u, !0);
			L(o);
			var f = w(o, 2), p = r(f), m = l(p, !0), g = w(p, 2), _ = l(g, !0);
			L(f), L(a), h((e, n, r, a, o, l, f) => {
				H(s, "title", t()), i(c, e), H(u, "title", n), i(d, r), H(p, "data-copyinv", t()), H(p, "title", a), i(m, o), H(g, "data-resend", t()), H(g, "title", l), i(_, f);
			}, [
				() => n.room.names?.[t()] || t().split("@")[0],
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("pendente"),
				() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => n.vb.t("copiar"),
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("reenviar")
			]), C(e, a);
		}, d = k(() => n.room.pending?.includes(t())), f = (e) => {
			var r = mo(), a = l(r, !0);
			h(() => {
				H(r, "title", t()), i(a, n.room.names[t()]);
			}), C(e, r);
		}, p = (e) => {
			var n = ho(), a = r(n), o = l(a, !0), s = w(a), c = l(s);
			L(n), h((e, n) => {
				H(a, "title", t()), i(o, e), i(c, `@${n ?? ""}`);
			}, [() => t().split("@")[0], () => t().split("@")[1] ?? ""]), C(e, n);
		};
		U(c, (e) => {
			v(d) ? e(u) : n.room.names?.[t()] ? e(f, 1) : e(p, -1);
		});
		var m = w(c, 2), g = (e) => {
			var r = go();
			j(r, () => n.vb.icon("x"), !0), L(r), h((e, n) => {
				H(r, "data-remove", t()), H(r, "aria-label", e), H(r, "title", n);
			}, [() => n.vb.t("Remover {email}", { email: t() }), () => n.room.pending?.includes(t()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), C(e, r);
		}, _ = k(() => t() !== n.room.book?.owner && (n.room.pending?.includes(t()) || n.room.me === n.room.book?.owner));
		U(m, (e) => {
			v(_) && e(g);
		}), L(o);
		var y = w(o, 2);
		j(y, () => n.vb.agentRows(t())), C(e, a);
	}, o = D(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), s = D(n, "friends", 19, () => []), c = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, u = k(() => n.room.epics.find((e) => e.id === n.thread)), d = k(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), f = k(() => n.room.members.filter((e) => !v(d).includes(e))), p = k(() => s().filter((e) => !n.room.members.includes(e)));
	var m = Eo(), g = T(m), _ = w(g, 2);
	j(_, () => n.vb.roomStrip());
	var y = w(_, 2), x = r(y), S = r(x), E = r(S);
	j(E, () => n.vb.icon("back")), t(), L(S);
	var O = w(S, 2), A = (e) => {
		var t = vo(), r = T(t);
		j(r, () => n.vb.icon(v(u).archived ? "undo" : "check", 18), !0), L(r);
		var i = w(r, 2);
		j(i, () => n.vb.icon("trash", 18), !0), L(i), h((e, t, n, a) => {
			H(r, "title", e), H(r, "aria-label", t), H(i, "title", n), H(i, "aria-label", a);
		}, [
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), C(e, t);
	};
	U(O, (e) => {
		v(u) && e(A);
	});
	var M = w(O, 2);
	j(M, () => n.vb.icon("sidebar", 20), !0), L(M), L(x), L(y);
	var N = w(y, 2), P = r(N);
	let F;
	var te = r(P);
	j(te, () => n.vb.roomMark("ri roomIco"));
	var I = w(te), R = l(I, !0), ne = w(I, 2), ie = (e) => {
		var t = yo(), a = r(t);
		j(a, () => n.vb.icon("pencil", 13));
		var o = w(a);
		L(t), h((e, n) => {
			H(t, "title", e), i(o, ` ${n ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), C(e, t);
	}, ae = k(() => !n.thread.startsWith("pre:"));
	U(ne, (e) => {
		v(ae) && e(ie);
	});
	var oe = w(ne, 2);
	j(oe, () => n.vb.waitPill("main"));
	var z = w(oe), B = l(z, !0);
	L(P);
	var se = w(P, 2);
	{
		let e = k(() => ({
			t: n.vb.t,
			name: n.vb.name,
			epicBusy: n.vb.epicBusy,
			waitCount: (e) => n.vb.waitsIn(e).length
		}));
		za(se, {
			get room() {
				return n.room;
			},
			get thread() {
				return n.thread;
			},
			get session() {
				return n.navigation;
			},
			get send() {
				return n.send;
			},
			get onopen() {
				return n.onopen;
			},
			get onarchchange() {
				return n.onarchchange;
			},
			get vb() {
				return v(e);
			}
		});
	}
	L(N);
	var ce = w(N, 2);
	fo(ce, {
		get room() {
			return n.room;
		},
		get session() {
			return n.pins;
		},
		get send() {
			return n.send;
		},
		get request() {
			return n.request;
		},
		get onopenfile() {
			return n.onopenpinfile;
		},
		get onopenapp() {
			return n.onopenpinapp;
		},
		get t() {
			return n.vb.t;
		}
	});
	var le = w(ce, 2), ue = r(le), de = (e) => {
		var t = xo(), a = r(t), o = l(a, !0), s = w(a, 2);
		we(s, 17, () => n.room.requests, (e) => e.email, (e, t, a, o) => {
			var s = bo(), c = r(s);
			j(c, () => n.vb.avatar(v(t).email));
			var u = w(c, 2), d = r(u), f = l(d, !0), p = w(d), m = r(p), g = w(m), _ = l(g, !0);
			L(p), L(u);
			var y = w(u, 2);
			j(y, () => n.vb.icon("x"), !0), L(y), L(s), h((e, n, r, a, o, s, c) => {
				H(d, "title", e), i(f, n), i(m, `${r ?? ""} · `), H(g, "data-ask", v(t).email), H(g, "title", a), i(_, o), H(y, "data-ask", v(t).email), H(y, "aria-label", s), H(y, "title", c);
			}, [
				() => `${v(t).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) })}`,
				() => v(t).name || v(t).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: v(t).email }),
				() => n.vb.t("Recusar")
			]), C(e, s);
		}), L(t), h((e) => i(o, e), [() => n.vb.t("Pedindo pra entrar")]), C(e, t);
	};
	U(ue, (e) => {
		n.room.requests?.length && e(de);
	});
	var V = w(ue, 2), fe = l(V, !0), pe = w(V, 2);
	j(pe, () => n.vb.sbxRows());
	var me = w(pe, 2);
	we(me, 16, () => v(d), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var he = w(me, 2), ge = (e) => {
		var t = So(), s = r(t), c = l(s, !0), u = w(s);
		we(u, 16, () => v(f), (e) => e, (e, t) => {
			a(e, () => t);
		}), L(t), h((e) => {
			t.open = o().off, i(c, e);
		}, [() => n.vb.t("{n} offline", { n: v(f).length })]), C(e, t);
	};
	U(he, (e) => {
		v(f).length && e(ge);
	});
	var _e = w(he, 2), ve = (e) => {
		var t = wo(), a = r(t), s = l(a), c = w(a, 2);
		we(c, 16, () => v(p), (e) => e, (e, t) => {
			var a = Co(), o = r(a);
			j(o, () => n.vb.avatar(t));
			var s = w(o), c = l(s, !0), u = w(s);
			j(u, () => n.vb.icon("plus"), !0), L(u), L(a), h((e, n) => {
				H(a, "data-add", t), H(a, "title", e), i(c, n);
			}, [() => n.vb.t("Adicionar {email}", { email: t }), () => n.vb.name(t)]), C(e, a);
		}), L(t), h((e) => {
			t.open = o().friends ?? n.room.members.length <= 1, i(s, `${e ?? ""} · ${v(p).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), C(e, t);
	};
	U(_e, (e) => {
		v(p).length && e(ve);
	});
	var ye = w(_e, 2), be = r(ye), Se = w(be);
	j(Se, () => n.vb.icon("plus"), !0), L(Se), L(ye);
	var Ce = w(ye, 2);
	we(Ce, 21, () => v(p), Ee, (e, t) => {
		var n = To(), r = {};
		h(() => {
			r !== (r = v(t)) && (n.value = (n.__value = r) ?? "");
		}), C(e, n);
	}), L(Ce), L(le), h((e, t, r, a, o, s, c, l, u, d) => {
		H(g, "aria-label", e), H(M, "title", t), H(M, "aria-label", r), F = re(P, 1, "thread", null, F, {
			sel: n.thread === "main",
			waiting: a
		}), H(P, "title", o), i(R, s), i(B, c), i(fe, l), H(be, "placeholder", u), H(Se, "aria-label", d);
	}, [
		() => n.vb.t("Fechar"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.waitsIn("main").length > 0,
		() => `${n.vb.bookTitle()}${n.room.book?.summary ? ` · ${n.room.book.summary}` : ""}`,
		() => n.vb.bookTitle(),
		() => c("main"),
		() => n.vb.t("Pessoas e agents"),
		() => n.vb.t("convidar por email"),
		() => n.vb.t("convidar por email")
	]), C(e, m), ee();
}
// svelte/Message.svelte
var Oo = a("<span class=\"gut\"> </span>"), ko = a(" <span class=\"agentTag\">agent</span>", 1), Ao = a("<span class=\"doneTag\"> </span>"), jo = a("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function Mo(e, t) {
	b(t, !0);
	let n = D(t, "origin", 3, !1), a = k(() => t.vb.continues(t.previous, t.message)), s = k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), c = k(() => n() && v(s) ? v(s).replace(/\sid="m\d+"/, "") : v(s)), u = k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), d = k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var f = o(), p = T(f), m = (e) => {
		var t = o(), n = T(t);
		j(n, () => v(c)), C(e, t);
	}, g = (e) => {
		var s = jo();
		let c;
		var f = r(s);
		j(f, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var p = w(f, 2), m = (e) => {
			var n = Oo(), r = l(n, !0);
			h((e) => {
				H(n, "title", v(d)), i(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), C(e, n);
		};
		U(p, (e) => {
			v(a) && e(m);
		});
		var g = w(p, 2), _ = r(g), y = r(_);
		j(y, () => t.vb.icon("copy", 14));
		var b = w(y);
		L(_);
		var x = w(_, 2), S = r(x);
		j(S, () => t.vb.icon("link", 14));
		var E = w(S);
		L(x);
		var D = w(x, 2), O = r(D);
		j(O, () => t.vb.icon("reply", 14));
		var k = w(O);
		L(D), L(g);
		var A = w(g, 2), ee = r(A), M = (e) => {
			var n = o(), r = T(n);
			j(r, () => t.vb.quoteHtml(t.message.reply_to)), C(e, n);
		};
		U(ee, (e) => {
			t.message.reply_to && e(M);
		});
		var N = w(ee, 2), P = r(N), F = (e) => {
			var n = ko(), r = T(n), a = w(r);
			h((e, t) => {
				i(r, `${e ?? ""} `), H(a, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), C(e, n);
		}, te = (e) => {
			var n = B();
			h((e) => i(n, e), [() => t.vb.name(t.message.author)]), C(e, n);
		};
		U(P, (e) => {
			t.message.kind === "agent" ? e(F) : e(te, -1);
		});
		var I = w(P, 2), R = (e) => {
			var n = Ao(), r = l(n);
			h((e, t) => {
				H(n, "title", e), i(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), C(e, n);
		};
		U(I, (e) => {
			t.message.tag === "done" && e(R);
		});
		var ne = w(I), ie = w(ne), ae = l(ie, !0);
		L(N);
		var oe = w(N, 2);
		j(oe, () => v(u), !0), L(oe);
		var z = w(oe, 2);
		j(z, () => t.vb.attHtml(t.message.files));
		var se = w(z, 2), ce = (e) => {
			var n = o(), r = T(n);
			j(r, () => t.vb.cardHtml(t.message)), C(e, n);
		};
		U(se, (e) => {
			t.message.card && e(ce);
		});
		var le = w(se, 2), ue = (e) => {
			var n = o(), r = T(n);
			j(r, () => t.vb.choiceHtml(t.message)), C(e, n);
		};
		U(le, (e) => {
			t.message.choices && e(ue);
		});
		var de = w(le, 2), V = (e) => {
			var n = o(), r = T(n);
			j(r, () => t.vb.pollHtml(t.message.poll)), C(e, n);
		};
		U(de, (e) => {
			t.message.poll && e(V);
		});
		var fe = w(de, 2), pe = (e) => {
			var n = o(), r = T(n);
			j(r, () => t.vb.threadCards(t.message.id)), C(e, n);
		};
		U(fe, (e) => {
			n() || e(pe);
		}), L(A), L(s), h((e, r, o, l, f, p, m, h, g, y, S, C) => {
			c = re(s, 1, "msg", null, c, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: v(a),
				waitMsg: e
			}), H(s, "id", n() ? void 0 : `m${t.message.id}`), H(_, "data-copymsg", t.message.id), H(_, "title", r), H(_, "aria-label", o), i(b, ` ${l ?? ""}`), H(x, "data-copylink", t.message.id), H(x, "title", f), H(x, "aria-label", p), i(E, ` ${m ?? ""}`), H(D, "data-reply", t.message.id), H(D, "title", h), H(D, "aria-label", g), i(k, ` ${y ?? ""}`), i(ne, ` · ${S ?? ""}`), H(ie, "title", v(d)), i(ae, C), H(oe, "hidden", !v(u));
		}, [
			() => t.vb.waiting(t.message.id),
			() => t.vb.t("Copiar"),
			() => t.vb.t("Copiar o texto desta mensagem"),
			() => t.vb.t("Copiar"),
			() => t.vb.t("Copiar link"),
			() => t.vb.t("Copiar o link desta mensagem"),
			() => t.vb.t("Copiar link"),
			() => t.vb.t("Responder"),
			() => t.vb.t("Responder a esta mensagem"),
			() => t.vb.t("Responder"),
			() => t.vb.ago(t.message.ts),
			() => t.vb.hhmm(t.message.ts)
		]), C(e, s);
	};
	U(p, (e) => {
		v(c) === null ? e(g, -1) : e(m);
	}), C(e, f), ee();
}
// svelte/Chat.svelte
var No = a("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), Po = a("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), Fo = a("<div><!></div>"), Io = a("<!> <!> <!>", 1);
function Lo(e, t) {
	b(t, !0);
	let n = D(t, "more", 3, !1), a = D(t, "origin", 3, null), s = D(t, "replyCount", 3, 0);
	var c = o(), u = T(c);
	N(u, () => t.room.id + ":" + t.thread, (e) => {
		var c = Io(), u = T(c), d = (e) => {
			var n = No(), a = r(n), o = l(a, !0);
			L(n), h((e) => i(o, e), [() => t.vb.t("Carregar mensagens anteriores")]), z("click", a, function(...e) {
				t.onloadolder?.apply(this, e);
			}), C(e, n);
		};
		U(u, (e) => {
			t.list.length && n() && e(d);
		});
		var f = w(u, 2), p = (e) => {
			var n = Po(), o = r(n);
			Mo(o, {
				get message() {
					return a();
				},
				origin: !0,
				get typing() {
					return t.room.typing[a().id];
				},
				get vb() {
					return t.vb;
				}
			});
			var c = w(o, 2), u = r(c), d = l(u, !0), f = w(u), p = r(f), m = w(p);
			j(m, () => t.vb.icon("reply", 13)), L(f), L(c), L(n), h((e, t) => {
				i(d, e), H(f, "data-gomain", a().id), i(p, `${t ?? ""} `);
			}, [() => s() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: s() }), () => t.vb.t("ver na sala principal")]), C(e, n);
		};
		U(f, (e) => {
			a() && e(p);
		});
		var m = w(f, 2), g = (e) => {
			var n = o(), r = T(n);
			we(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = k(() => v(r) ? t.list[v(r) - 1] : t.previous);
					Mo(e, {
						get message() {
							return v(n);
						},
						get previous() {
							return v(i);
						},
						get typing() {
							return t.room.typing[v(n).id];
						},
						get vb() {
							return t.vb;
						}
					});
				}
			}), C(e, n);
		}, _ = (e) => {
			var n = Fo();
			let s;
			var c = r(n), l = (e) => {
				var n = o(), r = T(n);
				j(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), C(e, n);
			}, u = (e) => {
				var n = B();
				h((e) => i(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), C(e, n);
			};
			U(c, (e) => {
				t.thread === "main" ? e(l) : e(u, -1);
			}), L(n), h(() => s = re(n, 1, "empty", null, s, { afterOrigin: !!a() })), C(e, n);
		};
		U(m, (e) => {
			t.list.length ? e(g) : e(_, -1);
		}), C(e, c);
	}), C(e, c), ee();
}
n(["click"]);
// svelte/roomStore.ts
function Ro(e, t, n) {
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
function zo() {
	let e = _e(null);
	return {
		subscribe: e.subscribe,
		get: () => V(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => Ro(e, t, n)), V(e);
		}
	};
}
// svelte/main.ts
var Bo = /* @__PURE__ */ Oe({
	createRoomStore: () => zo,
	dismissDialogs: () => pe,
	mountInbox: () => Uo,
	mountView: () => Ho
}), Vo = {
	tasks: Ze,
	board: ii,
	files: hi,
	reminders: pa,
	sidebar: Do,
	chat: Lo
};
function Ho(e, t, n) {
	let r = _e(n), i = Vo[e], a = f(() => S(ke, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			f(() => r.set(e));
		},
		destroy() {
			f(() => {
				Te(a);
			});
		}
	};
}
function Uo(e, t) {
	let { waits: n, ...r } = t, i = _e(n), a = f(() => S(ze, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => f(() => {
		Te(a);
	}), { updateWaits(e) {
		f(() => i.set(e));
	} });
}
export { Ga as a, Ta as c, ea as d, Ae as f, zo as i, ia as l, Uo as n, to as o, Ho as r, Za as s, Bo as t, ta as u };
