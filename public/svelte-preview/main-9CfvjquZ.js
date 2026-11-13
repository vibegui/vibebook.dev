import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Kt as m, Lt as h, Mt as g, Ot as _, Pt as v, Q as y, Qt as b, Rt as x, St as S, Tt as C, Ut as w, Vt as T, Wt as E, X as D, Xt as O, Yt as k, Z as A, Zt as j, _t as M, a as N, bt as P, c as F, ct as I, d as ee, dt as L, en as R, et as z, f as te, ft as ne, h as B, ht as re, i as ie, jt as V, kt as H, l as ae, lt as oe, mt as se, n as ce, nn as le, nt as ue, o as de, p as fe, pt as pe, q as me, r as he, rt as ge, s as _e, st as ve, t as ye, tn as be, tt as xe, u as Se, ut as U, vt as W, wt as Ce, xt as G, yt as we } from "./Field-Y4VaoJzU.js";
// \0rolldown/runtime.js
var Te = Object.defineProperty, Ee = (e, t) => {
	let n = {};
	for (var r in e) Te(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Te(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function De(t, n) {
	let r = () => z(n.values, "$values", i), [i, a] = e();
	var s = o(), c = T(s);
	re(c, () => n.component, (e, t) => {
		t(e, y(r));
	}), C(t, s), a();
}
// shared/uiVariant.ts
function Oe(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var ke = a("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Ae = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), je = a("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Me = a("<!> <!>", 1);
function Ne(e, t) {
	b(t, !0);
	let n = (e) => {
		var n = o(), a = T(n), s = (e) => {
			var n = je();
			W(n, 21, () => v(x), (e) => O(e), (e, n) => {
				var a = Ae(), o = r(a), s = r(o), c = (e) => {
					var t = ke(), n = r(t);
					B(n, { name: "check" }), R(t), C(e, t);
				}, u = k(() => A(v(n)) === "task"), d = (e) => {
					{
						let r = k(() => M(v(n))), i = k(() => t.avatarUrl?.(v(n).author));
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
				G(s, (e) => {
					v(u) ? e(c) : e(d, -1);
				});
				var m = w(s, 2), g = r(m), _ = r(g), b = l(_, !0), x = w(_);
				R(g);
				var S = w(g, 2), T = l(S);
				R(m), R(o);
				var E = w(o, 2), D = (e) => {
					{
						let r = k(() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), i = k(() => v(f) === O(v(n))), a = k(() => v(f) !== null);
						Se(e, {
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
							onclick: () => P(v(n))
						});
					}
				}, j = k(() => v(n).ref.startsWith("m"));
				G(E, (e) => {
					v(j) && e(D);
				}), R(a), h((e, t, r, a) => {
					U(o, "href", e), i(b, t), i(x, ` ${v(n).text ?? ""}`), i(T, `${v(y) ? `${v(n).room} › ` : ""}${r ?? ""} · ${a ?? ""}`);
				}, [
					() => N(v(n)),
					() => A(v(n)) === "task" ? t.vb.t("Tarefa sua esperando OK:") : A(v(n)) === "agent" ? t.vb.t("Seu agent espera você:") : `${M(v(n)).split(" ")[0]}:`,
					() => v(n).topic || t.vb.t("sala principal"),
					() => t.vb.ago(v(n).ts)
				]), V("click", o, (e) => t.onopen(v(n), e)), C(e, a);
			}), R(n), C(e, n);
		}, c = (e) => {
			{
				let n = k(() => v(y) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓"));
				F(e, { get title() {
					return v(n);
				} });
			}
		};
		G(a, (e) => {
			v(x).length ? e(s) : e(c, -1);
		}), C(e, n);
	}, a = D(t, "all", 3, !1), s = m(E(u(() => a() || !t.roomId ? "all" : "room"))), d = m(!0), f = m(null), g = m(""), _ = k(() => t.waits.filter((e) => e.book_id === t.roomId)), y = k(() => v(s) === "all" || !t.roomId), x = k(() => v(y) ? t.waits : v(_)), S = k(() => [{
		value: "room",
		label: `${t.vb.t("Esta sala")} (${v(_).length})`
	}, {
		value: "all",
		label: `${t.vb.t("Todas")} (${t.waits.length})`
	}]), O = (e) => `${e.book_id}:${e.ref}`, A = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", M = (e) => e.author_name || t.displayName?.(e.author) || e.author.split("@")[0];
	function N(e) {
		return Oe(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function P(e) {
		c(f, O(e), !0), c(g, "");
		try {
			await t.onresolve(e);
		} catch {
			c(g, t.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			c(f, null);
		}
	}
	{
		let r = (e) => {
			var r = Me(), i = T(r), a = (e) => {
				_e(e, {
					get title() {
						return v(g);
					},
					compact: !0
				});
			};
			G(i, (e) => {
				v(g) && e(a);
			});
			var o = w(i, 2), l = (e) => {
				{
					let r = (e) => {
						n(e);
					}, i = k(() => t.vb.t("Caixa de entrada"));
					ae(e, {
						get items() {
							return v(S);
						},
						get label() {
							return v(i);
						},
						onValueChange: (e) => t.ontab?.(e === "all"),
						get value() {
							return v(s);
						},
						set value(e) {
							c(s, e, !0);
						},
						children: r,
						$$slots: { default: !0 }
					});
				}
			}, u = (e) => {
				n(e);
			};
			G(o, (e) => {
				t.roomId ? e(l) : e(u, -1);
			}), C(e, r);
		}, i = k(() => t.vb.t("Caixa de entrada")), a = k(() => t.vb.t("Fechar"));
		te(e, {
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
				return v(d);
			},
			set open(e) {
				c(d, e, !0);
			},
			children: r,
			$$slots: { default: !0 }
		});
	}
	j();
}
n(["click"]);
// svelte/InboxMount.svelte
function Pe(t, n) {
	let r = () => z(n.waits, "$waits", i), [i, a] = e();
	Ne(t, y(() => n.props, { get waits() {
		return r();
	} })), a();
}
// svelte/lib/ui/Progress.svelte
var Fe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Ie = a("<progress> </progress>");
function Le(e, t) {
	b(t, !0);
	let n = D(t, "max", 3, 100), r = A(t, Fe), a = k(() => Number.isFinite(n()) && n() > 0 ? n() : 100), o = k(() => Number.isFinite(t.value) ? Math.min(v(a), Math.max(0, t.value)) : 0);
	var s = Ie();
	I(s, (e) => ({
		...r,
		max: v(a),
		value: v(o),
		"aria-label": t.label,
		class: e
	}), [() => me("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var c = l(s);
	h(() => i(c, `${v(o) ?? ""}/${v(a) ?? ""}`)), C(e, s), j();
}
// svelte/TaskList.svelte
var Re = a("<!> ", 1), ze = a("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Be = a("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ve = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), He = a("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Ue = a("<!> <!>", 1);
function We(e, n) {
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
	}))]), S = m(null), E = m(""), O = m(null), A = m(""), M = m(""), P = m(null), F = m(!1), I = m(""), L = m(null), z = k(() => v(s)?.tasks.find((e) => e.id === v(P)));
	x(() => {
		v(S) && v(O) && (v(O).focus(), v(O).select());
	}), x(() => {
		v(P) && !v(z) && oe(), v(S) && !v(s)?.tasks.some((e) => e.id === v(S)) && c(S, null);
	});
	function re(e) {
		try {
			if (n.send(e)) return c(M, ""), !0;
		} catch {}
		return c(M, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function V(e, t = !0) {
		v(S) !== e.id || t && v(E).trim() && v(E) !== e.title && !re({
			t: "task.rename",
			id: e.id,
			title: v(E)
		}) || c(S, null);
	}
	function ae(e) {
		c(P, e.id, !0), c(I, e.due ?? "", !0), c(F, !0);
	}
	function oe() {
		c(F, !1), c(P, null), c(I, "");
	}
	var se = Ue(), ce = T(se), le = (e) => {
		var a = Ve(), o = r(a), m = r(o), _ = l(m, !0), y = w(m, 2);
		he(y, {
			children: (e, n) => {
				t();
				var r = H();
				h(() => i(r, `${v(f) ?? ""}/${v(s).tasks.length ?? ""}`)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var b = w(y, 2);
		{
			let e = k(() => n.vb.t("Tarefas")), t = k(() => Math.max(1, v(s).tasks.length)), r = k(() => `${v(f)}/${v(s).tasks.length}`);
			Le(b, {
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
		R(o);
		var x = w(o, 2), D = (e) => {
			{
				let t = k(() => `@vibe: ${v(s).flags.join(" · ")}`);
				he(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Re(), r = T(n);
						B(r, {
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
		G(x, (e) => {
			v(s).flags?.length && e(D);
		});
		var j = w(x, 2), P = (e) => {
			_e(e, {
				get title() {
					return v(M);
				},
				compact: !0
			});
		};
		G(j, (e) => {
			v(M) && !v(F) && e(P);
		});
		var I = w(j, 2);
		W(I, 21, () => v(d), (e) => e.id, (e, a) => {
			var o = Be(), s = r(o);
			{
				let e = k(() => n.vb.t("Feita"));
				ie(s, {
					get checked() {
						return v(a).done;
					},
					get "aria-label"() {
						return v(e);
					},
					onclick: (e) => {
						e.preventDefault(), re({
							t: "task.toggle",
							id: v(a).id
						});
					}
				});
			}
			var l = w(s, 2), d = (e) => {
				{
					let t = k(() => n.vb.t("Clique para editar"));
					de(e, {
						get "data-task-edit"() {
							return v(a).id;
						},
						get "aria-label"() {
							return v(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => V(v(a)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), V(v(a))), e.key === "Escape" && (e.preventDefault(), V(v(a), !1));
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
				var o = ze(), s = r(o);
				{
					let e = k(() => me("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", v(a).done && "tw:text-muted-foreground tw:line-through")), r = k(() => n.vb.t("Clique para editar"));
					ee(s, {
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
							var r = H();
							h(() => i(r, v(a).title)), C(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var l = w(s, 2), u = (e) => {
					{
						let t = k(() => `@vibe: ${v(a).flags.join(" · ")}`);
						he(e, {
							variant: "warning",
							get title() {
								return v(t);
							},
							children: (e, t) => {
								var n = Re(), r = T(n);
								B(r, {
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
				G(l, (e) => {
					v(a).flags?.length && e(u);
				}), R(o), C(e, o);
			};
			G(l, (e) => {
				v(S) === v(a).id ? e(d) : e(f, -1);
			});
			var m = w(l, 2);
			{
				let e = k(() => n.vb.t("Responsável")), t = k(() => v(a).owner ?? "");
				N(m, {
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
					onValueChange: (e) => re({
						t: "task.assign",
						id: v(a).id,
						owner: e
					})
				});
			}
			var g = w(m, 2);
			{
				let e = k(() => n.vb.t("Prazo")), t = k(() => v(a).due ? `${n.vb.t("Prazo")}: ${v(a).due}` : n.vb.t("Prazo"));
				ee(g, {
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
					onclick: () => ae(v(a)),
					children: (e, t) => {
						var n = Re(), r = T(n);
						B(r, {
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
				Se(_, {
					get "data-tdel"() {
						return v(a).id;
					},
					get label() {
						return v(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => re({
						t: "task.del",
						id: v(a).id
					})
				});
			}
			R(o), h((e) => {
				U(o, "data-task", v(a).id), U(o, "aria-label", v(a).title), ne(o, 1, e);
			}, [() => pe(me("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", v(a).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !v(a).done && v(a).owner === n.room.me && "tw:border-ring/50", u(v(a)) && "tw:bg-warning/10"))]), C(e, o);
		}), R(I);
		var L = w(I, 2), z = r(L);
		{
			let e = k(() => n.vb.t("nova task")), t = k(() => n.vb.t("nova task"));
			de(z, {
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
		var te = w(z, 2);
		{
			let e = k(() => n.vb.t("Nova tarefa"));
			Se(te, {
				type: "submit",
				get label() {
					return v(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		R(L), R(a), h((e, t) => {
			U(a, "aria-label", e), i(_, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), g("submit", L, (e) => {
			e.preventDefault(), v(A).trim() && re({
				t: "task.add",
				epic: n.thread,
				title: v(A)
			}) && c(A, "");
		}), C(e, a);
	};
	G(ce, (e) => {
		v(s) && e(le);
	});
	var ue = w(ce, 2), fe = (e) => {
		{
			let o = k(() => n.vb.t("Prazo")), s = k(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), l = k(() => n.vb.t("Fechar"));
			te(e, {
				get title() {
					return v(o);
				},
				get description() {
					return v(s);
				},
				get closeLabel() {
					return v(l);
				},
				initialFocus: () => v(L),
				onOpenChange: (e) => {
					e || oe();
				},
				get open() {
					return v(F);
				},
				set open(e) {
					c(F, e, !0);
				},
				children: (e, o) => {
					var s = He(), l = r(s);
					{
						let e = (e, t = be) => {
							de(e, y(t, {
								get ref() {
									return v(L);
								},
								set ref(e) {
									c(L, e, !0);
								},
								get value() {
									return v(I);
								},
								set value(e) {
									c(I, e, !0);
								}
							}));
						}, t = k(() => `${a}-due`), r = k(() => n.vb.t("Prazo"));
						ye(l, {
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
						_e(e, {
							get title() {
								return v(M);
							},
							compact: !0
						});
					};
					G(u, (e) => {
						v(M) && e(d);
					});
					var f = w(u, 2), p = r(f);
					ee(p, {
						variant: "outline",
						onclick: oe,
						children: (e, r) => {
							t();
							var a = H();
							h((e) => i(a, e), [() => n.vb.t("Cancelar")]), C(e, a);
						},
						$$slots: { default: !0 }
					});
					var m = w(p);
					ee(m, {
						type: "submit",
						children: (e, r) => {
							t();
							var a = H();
							h((e) => i(a, e), [() => n.vb.t("Salvar")]), C(e, a);
						},
						$$slots: { default: !0 }
					}), R(f), R(s), g("submit", s, (e) => {
						e.preventDefault(), v(z) && re({
							t: "task.assign",
							id: v(z).id,
							due: v(I)
						}) && oe();
					}), C(e, s);
				},
				$$slots: { default: !0 }
			});
		}
	};
	G(ue, (e) => {
		v(z) && e(fe);
	}), C(e, se), j();
}
// svelte/Tasks.svelte
var Ge = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ke(e, t) {
	b(t, !0);
	let n = A(t, Ge);
	var r = o(), i = T(r);
	P(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		We(e, y(() => n));
	}), C(e, r), j();
}
// shared/room.ts
var qe = [
	"todo",
	"doing",
	"review",
	"done"
], Je = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, Ye = qe.map((e) => ({
	value: e,
	label: Je[e]
}));
function Xe(e, t) {
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
function Ze() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function Qe(e, t) {
	return Ye[Ye.findIndex((t) => t.value === e) + t]?.value;
}
function $e(e) {
	return Ye.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var et = a("<!> ", 1), tt = a("<!><span> </span>", 1), nt = a("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), rt = a("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), it = a("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), at = a("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), ot = a("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), st = a("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), ct = a("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), lt = a("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), ut = a("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), dt = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function ft(e, n) {
	let a = _();
	b(n, !0);
	let f = (e, o = be, s = be, u = be) => {
		var d = it(), f = r(d), m = r(f), _ = l(m, !0), y = w(m, 2), b = (e) => {
			{
				let t = k(() => `@vibe: ${o().flags.join(" · ")}`);
				he(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = et(), r = T(n);
						B(r, {
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
		G(y, (e) => {
			o().flags?.length && e(b);
		});
		var x = w(y, 2), S = r(x);
		he(S, {
			children: (e, n) => {
				t();
				var r = H();
				h(() => i(r, o().epicTitle)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var E = w(S, 2), D = (e) => {
			var t = tt(), r = T(t);
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
		G(E, (e) => {
			o().owner && e(D);
		});
		var O = w(E, 2), A = (e) => {
			var t = nt(), n = r(t);
			B(n, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = w(n, 1, !0);
			R(t), h(() => i(a, o().due)), C(e, t);
		};
		G(O, (e) => {
			o().due && e(A);
		}), R(x), R(f);
		var j = w(f, 2), M = (e) => {
			var t = rt(), i = r(t);
			B(i, { name: "grip" }), R(t), h((e) => U(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), C(e, t);
		};
		G(j, (e) => {
			u() || e(M);
		});
		var F = w(j, 2), ee = r(F);
		{
			let e = k(() => `${a}-${s()}`);
			ce(ee, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = H();
					h((e) => i(a, e), [() => n.vb.t("Status")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var L = w(ee, 2);
		{
			let e = k(() => `${a}-${s()}`), t = k(() => `${n.vb.t("Status")}: ${o().title}`);
			N(L, {
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
					return v(re);
				},
				onValueChange: (e) => ($e(e) && xe(o(), e, s()), !1)
			});
		}
		R(F), R(d), se(d, (e, t) => ve?.(e, t), s), h((e, t, n, r) => {
			U(d, "data-board-task", o().id), U(d, "data-status", o().status), U(d, "draggable", !u()), ne(d, 1, e), U(f, "data-epic", o().epicId), U(f, "aria-describedby", `${a}-keys`), ne(f, 1, t), ne(m, 1, n), i(_, o().title), ne(F, 1, r);
		}, [
			() => pe(me("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", u() && "tw:flex tw:flex-wrap tw:items-center", v(I) === o().id && "tw:opacity-50", o().status !== "done" && o().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => pe(me("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !u() && "tw:pr-10")),
			() => pe(me("tw:block tw:break-words tw:font-medium", o().status === "done" && "tw:line-through")),
			() => pe(me("tw:min-w-32 tw:space-y-1 tw:p-3", !u() && "tw:border-t tw:border-border"))
		]), g("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", o().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), c(I, o().id, !0));
		}), g("dragend", d, () => {
			c(I, null), c(P, null);
		}), V("click", f, () => n.onopen?.(o().epicId)), V("keydown", f, (e) => we(e, o(), s())), C(e, d);
	}, y = k(() => Xe(n.room, n.thread)), S = m(E(Ze())), D = m(""), O = m(null), A = m(""), M = m(""), P = m(null), I = m(null), L = m(E(u(() => v(y).targets.find((e) => e.id === v(y).scope) ?? v(y).targets.find((e) => e.id !== "main") ?? v(y).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), z = k(() => v(y).targets.some((e) => e.id === v(L).id)), te = k(() => [...v(z) ? [] : [{
		value: v(L).id,
		label: v(L).title,
		disabled: !0
	}], ...v(y).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), re = k(() => Ye.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), ie = k(() => v(y).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), oe = k(() => v(y).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), le = /* @__PURE__ */ new Map(), ue = 0, fe = !1, ge = m(null);
	d(() => {
		fe = !0, ue++, le.clear();
	});
	function ve(e, t) {
		return le.set(t, e), { destroy() {
			le.get(t) === e && le.delete(t);
		} };
	}
	function ye(e) {
		try {
			if (n.send(e)) return c(A, ""), !0;
		} catch {}
		return c(A, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function xe(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && le.get(n)?.contains(r) ? r : null;
		return ye({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (c(ge, {
			id: e.id,
			status: t,
			generation: ++ue,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	x(() => {
		let e = v(ge);
		if (!e) return;
		let t = [...n.room.roomTasks ?? [], ...n.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (c(ge, null), c(M, `${t.title}: ${n.vb.t(Ye.find((e) => e.value === t.status)?.label ?? t.status)}`), Se(e)) : (c(ge, null), Se(e));
	});
	function Se(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || s().then(() => {
			if (fe || e.generation !== ue || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = le.get(t.key)?.querySelector(t.selector) ?? v(O);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function Ce(e) {
		if (e === "board" || e === "list") {
			c(S, e, !0), ue++, c(ge, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function we(e, t, n) {
		let r = e.key === "ArrowRight" ? Qe(t.status, 1) : e.key === "ArrowLeft" ? Qe(t.status, -1) : void 0;
		r && (e.preventDefault(), xe(t, r, n));
	}
	function Te(e, t) {
		e.preventDefault(), c(P, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = v(y).tasks.find((e) => e.id === n);
		c(I, null), r && xe(r, t, `board:${r.id}`);
	}
	function Ee(e) {
		e.preventDefault(), v(D).trim() && (v(z) ? ye({
			t: "task.add",
			epic: v(L).id,
			title: v(D).trim()
		}) && c(D, "") : c(A, n.vb.t("Escolha um épico."), !0));
	}
	var De = dt(), Oe = r(De), ke = l(Oe, !0), Ae = w(Oe, 2), je = (e) => {
		{
			let t = k(() => v(y).missingScope ? n.vb.t("Épico não encontrado.") : v(z) ? v(A) : n.vb.t("Escolha um épico."));
			_e(e, {
				get title() {
					return v(t);
				},
				compact: !0
			});
		}
	};
	G(Ae, (e) => {
		(v(y).missingScope || !v(z) || v(A)) && e(je);
	});
	var Me = w(Ae, 2), Ne = l(Me, !0), Pe = w(Me, 2), Fe = l(Pe, !0), Ie = w(Pe, 2);
	{
		let e = (e, a = be) => {
			var s = o(), u = T(s), d = (e) => {
				var s = o(), u = T(s), d = (e) => {
					var a = st(), o = r(a);
					W(o, 21, () => Ye, (e) => e.value, (e, a) => {
						let o = k(() => v(y).tasks.filter((e) => e.status === v(a).value));
						var s = ot(), u = r(s), d = r(u, !0), p = w(d);
						he(p, {
							children: (e, n) => {
								t();
								var r = H();
								h(() => i(r, v(o).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), R(u);
						var m = w(u, 2);
						W(m, 21, () => v(o), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `board:${v(t).id}`, () => !1);
						}, (e) => {
							var t = at(), r = l(t, !0);
							h((e) => i(r, e), [() => n.vb.t(v(a).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), C(e, t);
						}), R(m), R(s), h((e, t, n) => {
							U(s, "data-lane", v(a).value), U(s, "aria-label", e), ne(s, 1, t), i(d, n);
						}, [
							() => n.vb.t(v(a).label),
							() => pe(me("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", v(P) === v(a).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(v(a).label)
						]), g("dragover", s, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), c(P, v(a).value, !0));
						}), g("dragleave", s, () => {
							c(P, null);
						}), g("drop", s, (e) => Te(e, v(a).value)), C(e, s);
					}), R(o), R(a), C(e, a);
				}, p = (e) => {
					var a = lt(), o = r(a), s = (e) => {
						var a = ct(), o = r(a), s = r(o, !0), c = w(s);
						he(c, {
							variant: "warning",
							children: (e, n) => {
								t();
								var r = H();
								h(() => i(r, v(oe).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), R(o);
						var l = w(o, 2);
						W(l, 17, () => v(oe), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `mine:${v(t).id}`, () => !0);
						}), R(a), h((e, t) => {
							U(a, "aria-label", e), i(s, t);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), C(e, a);
					};
					G(o, (e) => {
						v(oe).length && e(s);
					});
					var c = w(o, 2);
					W(c, 17, () => v(ie), (e) => e.id, (e, n) => {
						var a = ct(), o = r(a), s = r(o, !0), c = w(s);
						he(c, {
							children: (e, r) => {
								t();
								var a = H();
								h(() => i(a, v(n).tasks.length)), C(e, a);
							},
							$$slots: { default: !0 }
						}), R(o);
						var l = w(o, 2);
						W(l, 17, () => v(n).tasks, (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `group:${v(t).id}`, () => !0);
						}), R(a), h(() => {
							U(a, "aria-label", v(n).title), i(s, v(n).title);
						}), C(e, a);
					}, (e) => {
						{
							let t = k(() => n.vb.t("Nenhuma tarefa aberta."));
							F(e, { get title() {
								return v(t);
							} });
						}
					}), R(a), C(e, a);
				};
				G(u, (e) => {
					a() === "board" ? e(d) : e(p, -1);
				}), C(e, s);
			};
			G(u, (e) => {
				a() === v(S) && e(d);
			}), C(e, s);
		}, a = k(() => n.vb.t("Quadro de tarefas")), s = k(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		ae(Ie, {
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
			onValueChange: Ce,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Le = w(Ie, 2), Re = r(Le), ze = r(Re);
	{
		let e = k(() => `${a}-title`);
		ce(ze, {
			get for() {
				return v(e);
			},
			children: (e, r) => {
				t();
				var a = H();
				h((e) => i(a, e), [() => n.vb.t("Nova tarefa")]), C(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	var Be = w(ze, 2);
	{
		let e = k(() => `${a}-title`), t = k(() => n.vb.t("nova tarefa"));
		de(Be, {
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
	R(Re);
	var Ve = w(Re, 2), He = (e) => {
		var o = ut(), s = r(o);
		{
			let e = k(() => `${a}-epic`);
			ce(s, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = H();
					h((e) => i(a, e), [() => n.vb.t("Épico")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var l = w(s, 2);
		{
			let e = k(() => `${a}-epic`), t = k(() => !v(z));
			N(l, {
				get id() {
					return v(e);
				},
				get "aria-invalid"() {
					return v(t);
				},
				get items() {
					return v(te);
				},
				get value() {
					return v(L).id;
				},
				onValueChange: (e) => {
					let t = v(y).targets.find((t) => t.id === e);
					if (!t) return !1;
					c(L, t, !0), c(A, "");
				}
			});
		}
		R(o), C(e, o);
	};
	G(Ve, (e) => {
		v(y).scope || e(He);
	});
	var Ue = w(Ve, 2);
	{
		let e = k(() => !v(D).trim() || !v(z));
		ee(Ue, {
			type: "submit",
			get disabled() {
				return v(e);
			},
			children: (e, t) => {
				var r = et(), a = T(r);
				B(a, { name: "plus" });
				var o = w(a, 1, !0);
				h((e) => i(o, e), [() => n.vb.t("Nova tarefa")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	R(Le), R(De), h((e, t, n) => {
		U(De, "data-board-scope", v(y).scope ?? "all"), U(De, "aria-label", e), i(ke, t), i(Ne, v(M)), U(Pe, "id", `${a}-keys`), i(Fe, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => v(y).title ?? (v(y).scope ? v(L).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), g("submit", Le, Ee), C(e, De), j();
}
n(["click", "keydown"]);
// svelte/Board.svelte
var pt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function mt(e, t) {
	b(t, !0);
	let n = A(t, pt);
	var r = o(), i = T(r);
	P(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		ft(e, y(() => n));
	}), C(e, r), j();
}
// svelte/panels.ts
var ht = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", gt = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, _t = a("<button type=\"button\"> <small> </small></button>"), vt = a("<div class=\"ftabs\"></div>"), yt = a("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), bt = a("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), xt = a("<img loading=\"lazy\"/>"), St = a("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), Ct = a("<div class=\"empty\"> </div>"), wt = a("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function Tt(e, t) {
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
			let n = ht(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), f = k(() => v(d)[v(a)] ? v(a) : "all"), p = k(() => v(u).filter((e) => v(f) === "all" || ht(e) === v(f))), g = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", _ = k(() => v(s) && v(p).some((e) => g(e) === v(s) || g(e).startsWith(v(s) + "/")) ? v(s) : ""), y = k(() => v(_) ? v(_) + "/" : "");
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
	var N = o(), P = T(N), F = (e) => {
		var s = wt(), u = T(s), p = (e) => {
			var o = vt();
			W(o, 21, () => n.filter(([e]) => v(d)[e]), we, (e, n) => {
				var o = k(() => le(v(n), 2));
				let s = () => v(o)[0], u = () => v(o)[1];
				var p = _t();
				let m;
				var g = r(p), _ = w(g), y = l(_, !0);
				R(p), h((e) => {
					m = ne(p, 1, "ftab", null, m, { on: s() === v(f) }), U(p, "data-fkind", s()), i(g, `${e ?? ""} `), i(y, v(d)[s()]);
				}, [() => t.vb.t(u())]), V("click", p, () => c(a, s(), !0)), C(e, p);
			}), R(o), C(e, o);
		};
		G(u, (e) => {
			v(d).all > 1 && e(p);
		});
		var m = w(u, 2), g = (e) => {
			var n = yt(), a = r(n), o = l(a), s = w(a), c = r(s);
			M(c, () => t.vb.icon("folder", 14));
			var u = w(c);
			R(s), R(n), h((e, t) => {
				U(a, "data-fdir", e), i(o, `← ${t ?? ""}`), i(u, ` ${v(_) ?? ""}/`);
			}, [() => v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), V("click", a, (e) => S(e, v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "")), C(e, n);
		};
		G(m, (e) => {
			v(_) && e(g);
		});
		var b = w(m, 2), x = r(b);
		W(x, 17, () => v(E).dirs, we, (e, n) => {
			var a = k(() => le(v(n), 2));
			let o = () => v(a)[0], s = () => v(a)[1];
			var c = bt(), u = r(c);
			M(u, () => t.vb.icon("folder", 34), !0), R(u);
			var d = w(u, 2), f = l(d), p = w(d), m = l(p, !0);
			R(c), h((e) => {
				U(c, "data-fdir", v(y) + o()), i(f, `${o() ?? ""}/`), i(m, e);
			}, [() => s() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: s() })]), V("click", c, (e) => S(e, v(y) + o())), C(e, c);
		});
		var j = w(x, 2);
		W(j, 17, () => v(E).list, (e) => e.id, (e, n) => {
			var a = St(), s = r(a), c = r(s), u = (e) => {
				var t = xt();
				h((e) => {
					U(t, "src", e), U(t, "alt", v(n).name);
				}, [() => D(v(n))]), C(e, t);
			}, d = k(() => v(n).type.startsWith("image/")), f = (e) => {
				var r = o(), i = T(r);
				M(i, () => t.vb.icon(v(n).type === "text/html" ? "globe" : v(n).type.startsWith("audio/") ? "mic" : "file", 30)), C(e, r);
			};
			G(c, (e) => {
				v(d) ? e(u) : e(f, -1);
			}), R(s);
			var p = w(s, 2), m = l(p, !0), g = w(p), _ = l(g), b = w(g, 2);
			let x;
			M(b, () => t.vb.icon("pin", 14), !0), R(b), R(a), h((e, t, r, o, s, c, l, u, d, f) => {
				U(a, "href", e), U(a, "title", v(n).name), U(a, "data-view", t), U(a, "data-name", v(n).name), i(m, r), i(_, `${o ?? ""} · ${s ?? ""} · ${c ?? ""}`), x = ne(b, 1, "ghost pinBtn", null, x, { on: l }), U(b, "data-pin-ref", v(n).id), U(b, "title", u), U(b, "aria-label", d), U(b, "aria-pressed", f);
			}, [
				() => D(v(n)),
				() => v(n).type.startsWith("image/") ? "img" : "frame",
				() => v(n).name.slice(v(y).length),
				() => t.vb.name(v(n).author),
				() => t.vb.ago(v(n).ts),
				() => v(E).versions[v(n).name] > 1 ? t.vb.t("{n} versões", { n: v(E).versions[v(n).name] }) : gt(v(n).size),
				() => !!O(v(n)),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!O(v(n))
			]), V("click", b, (e) => A(e, v(n))), C(e, a);
		}), R(b);
		var N = w(b, 2), P = (e) => {
			var n = Ct(), r = l(n, !0);
			h((e) => i(r, e), [() => t.vb.t("Nada aqui.")]), C(e, n);
		};
		G(N, (e) => {
			!v(E).list.length && !v(E).dirs.length && e(P);
		}), C(e, s);
	}, I = (e) => {
		var n = Ct(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), C(e, n);
	};
	G(P, (e) => {
		v(u).length ? e(F) : e(I, -1);
	}), C(e, N), j();
}
n(["click"]);
// ../vibebook/node_modules/zod/v4/core/util.js
function Et(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var Dt = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Ot(e) {
	return new Dt(e);
}
function kt(e) {
	return e == null;
}
function At(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function jt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Mt(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Nt(e) {
	return Mt(e._zod.def) ?? e._zod.def.shape;
}
function Pt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return jt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Ft(e, t, n) {
	t in e ? jt(e, t, n) : e[t] = n;
}
function It(e, t, n, r) {
	let i = Nt(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Pt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Ft(e, a, r ? r(n.value, a) : n.value));
	}
}
function Lt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Pt(e, n, () => t[n]) : Ft(e, n, r.value));
	}
}
function Rt(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var zt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Bt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Vt(e) {
	if (Bt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Bt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function Ht(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ut(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function Wt(e) {
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
function Gt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Kt(e, t) {
	if (!Vt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Nt(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Ut(e, Rt(e._zod.def, { shape: qt(e, t) }));
}
function qt(e, t) {
	let n = {};
	return It(n, e, Reflect.ownKeys(Nt(e))), Lt(n, t), n;
}
function Jt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Yt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Xt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Zt(e) {
	return typeof e == "string" ? e : e?.message;
}
function Qt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function $t(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Zt(e.inst?._zod.def?.error?.(e)) ?? Zt(a?.(e)) ?? Zt(t?.error?.(e)) ?? Zt(n.customError?.(e)) ?? Zt(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var en = /[\uD800-\uDBFF]/;
function tn(e) {
	let t = e.length;
	if (!en.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function nn(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function rn(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : sn(e, n, r.value);
	}
}
function an(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function on(e, t, n) {
	return an(e, t, n, !1);
}
function sn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : an(this, t, n.bind(this));
		},
		set(e) {
			an(this, t, e);
		}
	});
}
function cn(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var ln, un = !1, dn = {
	configurable: !0,
	get() {
		un = !0;
	}
};
function fn(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && ln !== e._zod ? ln = void 0 : (ln = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, dn);
			let e = un;
			un = !1;
			try {
				let r = n(this);
				return un ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), un ||= e, r;
			} catch (n) {
				throw delete this[t], un ||= e, n;
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
function pn(e, t, n, r) {
	let i = cn(e, t);
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
// ../vibebook/node_modules/zod/v4/core/core.js
var mn, hn = {
	value: void 0,
	enumerable: !1
}, gn = "captureStackTrace" in Error ? Error : null;
function _n(e) {
	let t = gn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return gn = null, new e();
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
function K(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			hn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", hn);
			} finally {
				hn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), rn(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? _n(u) : this;
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
var vn = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(mn = globalThis).__zod_globalConfig ?? (mn.__zod_globalConfig = {});
var yn = globalThis.__zod_globalConfig;
function bn(e) {
	return e && Object.assign(yn, e), yn;
}
// ../vibebook/node_modules/zod/v4/core/errors.js
function xn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Et, 2), e.message;
}
function Sn(e) {
	this._zod.message = e;
}
var Cn = {
	get: xn,
	set: Sn,
	enumerable: !0,
	configurable: !0
}, wn = {
	value: void 0,
	enumerable: !1
}, Tn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), En = /* @__PURE__ */ K("$ZodError", (e, t) => {
	e.name = "$ZodError", wn.value = t, Object.defineProperty(e, "issues", wn), wn.value = void 0, Object.defineProperty(e, "message", Cn);
	let n = Object.getPrototypeOf(e);
	Tn.has(n) || (Tn.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), Dn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new vn();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => $t(e, o, bn())));
			throw zt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(En), On = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => $t(e, o, bn())));
			throw zt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(En), kn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new vn();
	return a.issues.length ? An(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(En);
function An(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => $t(e, n, bn()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var jn = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? An(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(En), Mn = /^[\s\S]{0,}$/, Nn = /^-?\d+(?:\.\d+)?$/, Pn = /^(?:true|false)$/i, Fn = /*@__PURE__*/ K("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), In = (e) => {
	let t = e.value;
	return !kt(t) && t.length !== void 0;
}, Ln = /*@__PURE__*/ K("$ZodCheckMaxLength", (e, t) => {
	var n;
	Fn.init(e, t), (n = e._zod.def).when ?? (n.when = In), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? tn(r) : i) <= t.maximum) return;
		let a = nn(r);
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
}), Rn = /*@__PURE__*/ K("$ZodCheckMinLength", (e, t) => {
	var n;
	Fn.init(e, t), (n = e._zod.def).when ?? (n.when = In), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? tn(r) : i) >= t.minimum) return;
		let a = nn(r);
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
}), zn = /*@__PURE__*/ K("$ZodCheckStartsWith", (e, t) => {
	Fn.init(e, t);
	let n = RegExp(`^${Ht(t.prefix)}.*`);
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
}), Bn = {
	major: 4,
	minor: 6,
	patch: 7
}, Vn = /*@__PURE__*/ K("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Bn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Jt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Yt(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new vn();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Qt(t.issues, n, e), i ||= Jt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					Qt(t.issues, n, e), i ||= Jt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Jt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new vn();
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
				if (a.async === !1) throw new vn();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return on(this, "~standard", Wn(this));
	},
	set "~standard"(e) {
		an(this, "~standard", e);
	}
}), Hn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => $t(e, t, bn())) } : { value: e.value };
async function Un(e, t) {
	let n = { async: !0 };
	return Hn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Wn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Hn(r, n);
			} catch {}
			return Un(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Gn = /*@__PURE__*/ K("$ZodString", (e, t) => {
	Vn.init(e, t), e._zod.pattern = t.pattern ?? Mn, e._zod.parse = (n, r) => {
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
}), Kn = /*@__PURE__*/ K("$ZodNumber", (e, t) => {
	Vn.init(e, t), e._zod.pattern = Nn, e._zod.parse = (n, r) => {
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
}), qn = /*@__PURE__*/ K("$ZodBoolean", (e, t) => {
	Vn.init(e, t), e._zod.pattern = Pn, e._zod.parse = (n, r) => {
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
});
function Jn(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Xt(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var Yn = [];
function Xn(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Yn, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Gt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Zn(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Jt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Jn(e, n, i, t, d, f))) : Jn(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Qn = /*@__PURE__*/ K("$ZodObject", (e, t) => {
	Vn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Ot(() => Xn(t));
	fn(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || jt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Bt, o = t.catchall, s, c = yn.memoizer;
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
				if (Jt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => Jn(n, t, e, r, a, o))) : Jn(s, t, e, r, a, o);
		}
		return o ? Zn(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function $n(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Jt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => $t(e, r, bn())))
	}), t);
}
var er = /*@__PURE__*/ K("$ZodUnion", (e, t) => {
	Vn.init(e, t), fn(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), fn(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), fn(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), fn(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => At(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => $n(t, r, e, i)) : $n(o, r, e, i);
	};
}), tr = /*@__PURE__*/ K("$ZodLiteral", (e, t) => {
	Vn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, fn(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? Ht(e) : e ? Ht(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function nr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var rr = /*@__PURE__*/ K("$ZodOptional", (e, t) => {
	Vn.init(e, t), fn(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", fn(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), fn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${At(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => nr(e, t)) : nr(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), ir = /*@__PURE__*/ K("$ZodNullable", (e, t) => {
	Vn.init(e, t), fn(e, "optin", (e) => e.def.innerType._zod.optin), fn(e, "optout", (e) => e.def.innerType._zod.optout), fn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${At(t.source)}|null)$`) : void 0;
	}), fn(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// ../vibebook/node_modules/zod/v4/core/api.js
function ar(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e(ar({
		type: "string",
		...Wt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e(ar({
		type: "number",
		checks: [],
		...Wt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "boolean",
		...Wt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new Ln({
		check: "max_length",
		...Wt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new Rn({
		check: "min_length",
		...Wt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new zn({
		check: "string_format",
		format: "starts_with",
		...Wt(t),
		prefix: e
	});
}
// ../vibebook/node_modules/zod/v4/mini/schemas.js
var fr = /*@__PURE__*/ K("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	Vn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		an(this, "with", e);
	},
	parse(e, t) {
		return Dn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return On(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return kn(this, e, t);
	},
	safeParseAsync(e, t) {
		return jn(this, e, t);
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
		return Ut(this, e, t);
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
}), pr = /*@__PURE__*/ K("ZodMiniString", (e, t) => {
	Gn.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function q(e) {
	return /* @__PURE__ */ or(pr, e);
}
var mr = /*@__PURE__*/ K("ZodMiniNumber", (e, t) => {
	Kn.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function hr(e) {
	return /* @__PURE__ */ sr(mr, e);
}
var gr = /*@__PURE__*/ K("ZodMiniBoolean", (e, t) => {
	qn.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function _r(e) {
	return /* @__PURE__ */ cr(gr, e);
}
var vr = /*@__PURE__*/ K("ZodMiniObject", (e, t) => {
	Qn.init(e, t), fr.init(e, t), pn(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new vr({
		type: "object",
		shape: e ?? {},
		...Wt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return Kt(e, t);
}
var xr = /*@__PURE__*/ K("ZodMiniUnion", (e, t) => {
	er.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new xr({
		type: "union",
		options: e,
		...Wt(t)
	});
}
var Cr = /*@__PURE__*/ K("ZodMiniLiteral", (e, t) => {
	tr.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new Cr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...Wt(t)
	});
}
var Tr = /*@__PURE__*/ K("ZodMiniOptional", (e, t) => {
	rr.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Er(e) {
	return new Tr({
		type: "optional",
		innerType: e
	});
}
var Dr = /*@__PURE__*/ K("ZodMiniNullable", (e, t) => {
	ir.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Or(e) {
	return new Dr({
		type: "nullable",
		innerType: e
	});
}
var kr = /* @__PURE__ */ Sr([/* @__PURE__ */ yr({
	ok: /* @__PURE__ */ wr(!0),
	id: /* @__PURE__ */ hr(),
	thread: /* @__PURE__ */ q()
}), /* @__PURE__ */ yr({
	ok: /* @__PURE__ */ wr(!1),
	error: /* @__PURE__ */ q()
})]), Ar = /* @__PURE__ */ yr({
	ok: /* @__PURE__ */ _r(),
	name: /* @__PURE__ */ Er(/* @__PURE__ */ q()),
	error: /* @__PURE__ */ Er(/* @__PURE__ */ q()),
	every: /* @__PURE__ */ Er(/* @__PURE__ */ Or(/* @__PURE__ */ q())),
	cron: /* @__PURE__ */ Er(/* @__PURE__ */ Or(/* @__PURE__ */ q())),
	timezone: /* @__PURE__ */ Er(/* @__PURE__ */ q()),
	next_at: /* @__PURE__ */ Er(/* @__PURE__ */ q())
}), jr = /* @__PURE__ */ yr({
	id: /* @__PURE__ */ q(),
	name: /* @__PURE__ */ q(),
	type: /* @__PURE__ */ q(),
	size: /* @__PURE__ */ hr(),
	author: /* @__PURE__ */ q(),
	ts: /* @__PURE__ */ hr(),
	embed: /* @__PURE__ */ Er(/* @__PURE__ */ _r())
}), Mr = /* @__PURE__ */ br(jr, { reminder: /* @__PURE__ */ Er(Ar) }), Nr = /* @__PURE__ */ yr({ error: /* @__PURE__ */ q() });
(/* @__PURE__ */ q()).check(/* @__PURE__ */ dr("https://"), /* @__PURE__ */ lr(1e3)), (/* @__PURE__ */ q()).check(/* @__PURE__ */ ur(1)), (/* @__PURE__ */ q()).check(/* @__PURE__ */ ur(1)), (/* @__PURE__ */ q()).check(/* @__PURE__ */ ur(1)), (/* @__PURE__ */ q()).check(/* @__PURE__ */ dr("m"));
var Pr = (e) => typeof e == "object" && !!e && !Array.isArray(e), J = (e) => typeof e == "string", Y = (e) => typeof e == "number" && Number.isFinite(e), Fr = (e) => typeof e == "boolean", X = (e) => (t) => t === null || e(t), Z = (e) => (t) => Array.isArray(t) && t.every(e), Ir = (e) => (t) => Pr(t) && Object.values(t).every(e), Q = Z(J), Lr = (...e) => (t) => typeof t == "string" && e.includes(t), Rr = Lr(...qe), $ = (e, t = {}) => (n) => Pr(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), zr = (e) => $({
	id: J,
	name: J,
	type: J,
	size: Y,
	author: J,
	ts: Y
}, { embed: Fr })(e), Br = $({
	id: J,
	title: J,
	done: Fr,
	status: Rr
}, {
	owner: X(J),
	due: X(J),
	flags: Q,
	epic_id: J
}), Vr = (e) => Br(e), Hr = $({
	id: J,
	title: J,
	tasks: Z(Vr)
}, {
	archived: Fr,
	kept: Fr,
	owner: X(J),
	from_msg: X(Y),
	parent: X(J),
	flags: Q,
	prod: X($({ stage: J }, {
		at: Y,
		note: J
	})),
	files: Z($({
		id: J,
		name: J,
		type: J,
		n: Y
	}))
}), Ur = (e) => Hr(e), Wr = $({
	id: Y,
	thread: J,
	author: J,
	ts: Y,
	text: J
}, {
	kind: X(J),
	tag: X(J),
	via: X(J),
	reply_to: X(Y),
	choices: X(J),
	poll: X(J),
	card: X(J),
	files: Z(zr),
	quiet: Fr,
	cut: Fr,
	for_who: X(J)
}), Gr = (e) => Wr(e), Kr = $({
	msg_id: Y,
	email: J,
	who: J,
	status: J,
	ts: Y
}, {
	agent: J,
	note: X(J)
}), qr = (e) => Kr(e), Jr = $({
	id: J,
	text: J,
	owner: J,
	enabled: Fr
}, {
	name: X(J),
	error: X(J),
	every: X(J),
	cron: X(J),
	next_at: X(Y),
	thread: J,
	tz: J,
	file_id: X(J)
}), Yr = (e) => Jr(e), Xr = $({
	title: J,
	owner: J
}, {
	summary: X(J),
	folder: X(J)
}), Zr = (e) => Xr(e), Qr = $({
	title: J,
	tasks: Q
}, { why: J }), $r = (e) => Qr(e), ei = $({
	id: Y,
	text: J,
	who: J,
	kind: J,
	ts: Y
}), ti = (e) => ei(e), ni = $({
	id: J,
	kind: J,
	ref: J
}, {
	title: J,
	author: J,
	ts: Y
}), ri = (e) => ni(e), ii = $({
	id: J,
	question: J,
	options: Q,
	multi: Fr,
	closed: Fr,
	author: J,
	votes: Z(Q)
}), ai = (e) => ii(e), oi = $({
	email: J,
	ts: Y
}, { name: X(J) }), si = $({
	email: J,
	who: J,
	read: Y,
	delivered: Y
}, {
	agent: J,
	ts: Y
}), ci = $({ text: J }, {
	epic: X(J),
	stale: (e) => e === !1,
	fetched: Fr,
	by: J
}), li = $({
	epic: J,
	stale: (e) => e === !0
}, { by: J }), ui = {
	state: $({
		me: J,
		book: Zr,
		messages: Z(Gr),
		epics: Z(Ur),
		members: Q,
		online: Q,
		suggestions: Z($r)
	}, {
		roomTasks: Z(Vr),
		names: Ir(J),
		avatars: Ir(Y),
		pending: Q,
		requests: Z(oi),
		files: Z(zr),
		filesN: Y,
		filesAll: Fr,
		reminders: Z(Yr),
		acks: Z(qr),
		receipts: Z(si),
		counts: Ir(Y),
		countsAt: Y,
		full: Q,
		complete: Fr,
		origins: Z(Gr),
		docs: Ir(J),
		doc: J,
		docNotes: Q,
		decisions: Z(ti),
		pins: Z(ri),
		polls: Ir(ai)
	}),
	msg: $({ m: Gr }),
	moved: $({
		id: Y,
		thread: J
	}),
	delta: $({
		id: Y,
		text: J
	}),
	typing: $({
		id: Y,
		mode: J
	}, { note: J }),
	closed: $({
		id: Y,
		choices: J
	}),
	epics: $({ epics: Z(Ur) }, { roomTasks: Z(Vr) }),
	epicsPatch: $({
		changed: Z(Ur),
		order: Q
	}, { roomTasks: Z(Vr) }),
	doc: (e) => Pr(e) && (e.stale === !0 ? li(e) && e.text === void 0 && e.fetched === void 0 : ci(e)),
	docNotes: $({ notes: Q }),
	meta: $({}, {
		title: J,
		folder: J,
		summary: J
	}),
	suggestions: $({ suggestions: Z($r) }),
	requests: $({ requests: Z(oi) }),
	members: $({ members: Q }, {
		pending: Q,
		requests: Z(oi),
		names: Ir(J),
		avatars: Ir(Y)
	}),
	files: $({ files: Z(zr) }),
	fileAdd: $({ file: zr }),
	reminders: $({ reminders: Z(Yr) }),
	decisions: $({ decisions: Z(ti) }),
	pins: $({ pins: Z(ri) }),
	receipts: $({ receipts: Z(si) }),
	older: $({
		messages: Z(Gr),
		thread: J,
		more: Fr
	}),
	acks: $({ acks: Z(qr) }),
	ackRows: $({ acks: Z(qr) }),
	poll: $({ poll: ai }),
	online: $({ online: Q }),
	conns: $({}),
	error: $({}, { error: J }),
	blocked: $({
		text: J,
		reason: J
	})
};
function di(e) {
	return !Pr(e) || typeof e.t != "string" || !Object.hasOwn(ui, e.t) ? !1 : ui[e.t](e);
}
function fi(e) {
	if (!Pr(e)) return e;
	let t = (e, t) => Pr(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Pr(e) ? {
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
function pi(e) {
	let t = fi(JSON.parse(e));
	if (!di(t)) throw TypeError("Invalid room event");
	return t;
}
var mi = {
	msg: $({ thread: J }, {
		text: J,
		files: Q,
		reply_to: X(Y)
	}),
	"files.get": $({}),
	"doc.get": $({}, { epic: X(J) }),
	doc: $({ text: J }, { epic: X(J) }),
	title: $({ title: J }),
	epic: $({ title: J }),
	"epic.owner": $({
		id: J,
		owner: J
	}),
	"task.add": $({
		epic: J,
		title: J
	}),
	older: $({ thread: J }, { before: Y }),
	"pin.add": $({
		kind: Lr("link", "file", "app"),
		ref: J
	}, { title: J }),
	"pin.del": $({ id: J }),
	"reminder.delete": $({ id: J }),
	"ack.dismiss": $({ id: Y }),
	"reminder.enable": $({
		id: J,
		on: Fr
	}),
	"task.toggle": $({ id: J }),
	"task.status": $({
		id: J,
		status: Rr
	}),
	"task.rename": $({
		id: J,
		title: J
	}),
	"task.del": $({ id: J }),
	"task.assign": $({ id: J }, {
		owner: J,
		due: J
	}),
	"decision.del": $({ id: Y }),
	"epic.rename": $({
		id: J,
		title: J
	}),
	"epic.del": $({ id: J }),
	"epic.archive": $({ id: J }, { archived: Fr }),
	"epic.order": $({ ids: Q }),
	"poll.create": $({
		thread: J,
		question: J,
		options: Q,
		multi: Fr
	}),
	vote: $({
		id: J,
		opt: Y
	}),
	"poll.close": $({ id: J }),
	suggestion: $({ i: Y }, { accept: Fr })
};
function hi(e) {
	return !Pr(e) || typeof e.t != "string" || !Object.hasOwn(mi, e.t) ? !1 : mi[e.t](e);
}
// ../vibebook/node_modules/hono/dist/client/utils.js
var gi = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), _i = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, vi = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, yi = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, bi = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function xi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Si(e, t) {
	if (!xi(e) && !xi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = xi(n[e]) && xi(r) ? Si(n[e], r) : r;
	}
	return n;
}
// ../vibebook/node_modules/hono/dist/utils/cookie.js
var Ci = /^[\w!#$%&'*.^`|~+-]+$/, wi = (e, t, n = {}) => {
	if (!Ci.test(e)) throw Error("Invalid cookie name");
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
}, Ti = (e, t, n) => (t = encodeURIComponent(t), wi(e, t, n)), Ei = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Ei(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Di = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Oi = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Ti(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = bi(a), a = _i(a, this.pathParams), this.queryParams && (a = Di(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, ki = (e, t) => Ei(function n(r) {
	let i = t?.buildSearchParams ?? vi, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = gi(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = bi(c);
		return r.args[0] && (r.args[0].param && (t = _i(t, r.args[0].param)), r.args[0].query && (t = Di(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = bi(c), n = yi(r.args[0]?.param ? _i(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Oi(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Si(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Ai = (e = "/", t) => ki(e, t ? { fetch: t } : {});
// svelte/transport.ts
function ji(e, t) {
	if (!hi(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(t)), !0);
}
function Mi(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return pi(e);
}
async function Ni(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function Pi(e, t) {
	let n = Nr.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function Fi(e, t = fetch) {
	let n = Ai("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Ni(t);
			if (t.ok || t.status === 400) {
				let e = kr.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw Pi(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Ni(t);
			if (!t.ok) throw Pi(t, i);
			let a = Mr.safeParse(i);
			if (!a.success) throw TypeError(jr.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var Ii = a("<button class=\"primary\" id=\"remNew\"><!> </button>"), Li = a("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), Ri = a("<span class=\"err\"> </span>"), zi = a("<pre class=\"remText\"> </pre>"), Bi = a("<button class=\"ghost\"></button>"), Vi = a("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), Hi = a("<div class=\"empty\"> </div>"), Ui = a("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function Wi(e, t) {
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
			let e = await Fi(t.room.id).uploadFile({
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
	var x = Ui(), S = T(x), D = r(S);
	M(D, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), R(D);
	var A = w(D, 2), N = (e) => {
		var n = Ii(), a = r(n);
		M(a, () => t.vb.icon("plus", 14));
		var o = w(a);
		R(n), h((e) => i(o, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), V("click", n, () => p({
			name: "",
			text: ""
		})), C(e, n);
	};
	G(A, (e) => {
		v(n) || e(N);
	}), R(S);
	var P = w(S, 2), F = (e) => {
		var s = Li(), u = r(s);
		oe(u);
		var d = w(u, 2);
		O(d);
		var f = w(d, 2), p = r(f), m = l(p, !0), _ = w(p), b = l(_, !0), x = w(_), S = l(x, !0);
		R(f), R(s), h((e, t, r, s) => {
			U(u, "placeholder", e), u.readOnly = v(n).fixed, U(d, "placeholder", t), i(m, v(a)), i(b, r), x.disabled = v(o), i(S, s);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), g("submit", s, y), ve(u, () => v(n).name, (e) => v(n).name = e), ve(d, () => v(n).text, (e) => v(n).text = e), V("click", _, () => c(n, null)), C(e, s);
	};
	G(P, (e) => {
		v(n) && e(F);
	});
	var I = w(P, 2);
	W(I, 17, () => v(u), (e) => e.id, (e, n) => {
		var a = Vi();
		let o;
		var c = r(a), u = r(c), d = r(u);
		M(d, () => t.vb.icon(v(s).includes(v(n).id) ? "chevronDown" : "chevronRight", 13));
		var m = w(d);
		R(u);
		var g = w(u, 2), y = r(g), b = (e) => {
			var r = H();
			h((e) => i(r, `${(v(n).every || v(n).cron || "") ?? ""}${e ?? ""} ·`), [() => v(n).enabled && v(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: f(v(n).next_at) })}` : ""]), C(e, r);
		};
		G(y, (e) => {
			v(n).error || e(b);
		});
		var x = w(y, 1, !0);
		R(g);
		var S = w(g, 2), T = (e) => {
			var t = Ri(), r = l(t);
			h(() => i(r, `⚠ ${v(n).error ?? ""}`)), C(e, t);
		};
		G(S, (e) => {
			v(n).error && e(T);
		});
		var E = w(S), D = (e) => {
			var t = zi(), r = l(t, !0);
			h(() => i(r, v(n).text)), C(e, t);
		}, O = k(() => v(s).includes(v(n).id));
		G(E, (e) => {
			v(O) && e(D);
		}), R(c);
		var A = w(c, 2), j = (e) => {
			var r = Bi();
			M(r, () => t.vb.icon("pencil", 14), !0), R(r), h((e, t) => {
				U(r, "data-rem-edit", v(n).id), U(r, "title", e), U(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), V("click", r, () => p({
				name: v(n).name,
				text: v(n).text,
				fixed: !0
			})), C(e, r);
		};
		G(A, (e) => {
			v(n).name && e(j);
		});
		var N = w(A, 2), P = r(N);
		oe(P);
		var F = w(P, 1, !0);
		R(N);
		var I = w(N, 2);
		M(I, () => t.vb.icon("x"), !0), R(I), R(a), h((e, t, r, s, l, u, d) => {
			o = ne(a, 1, "rem", null, o, {
				bad: !!v(n).error,
				off: !v(n).enabled,
				open: e
			}), U(c, "data-rem-open", v(n).id), U(c, "title", t), i(m, ` ${(v(n).name ? `${v(n).name}.md` : v(n).text) ?? ""}`), i(x, r), U(N, "title", s), U(P, "data-rem-on", v(n).id), L(P, v(n).enabled), P.disabled = !!v(n).error, i(F, l), U(I, "data-rem-del", v(n).id), U(I, "title", u), U(I, "aria-label", d);
		}, [
			() => v(s).includes(v(n).id),
			() => t.vb.t(v(s).includes(v(n).id) ? "Esconder o texto" : "Ver o texto"),
			() => t.vb.t("de {who}", { who: t.vb.name(v(n).owner) }),
			() => t.vb.t("Ligado"),
			() => t.vb.t("ligado"),
			() => t.vb.t("Apagar lembrete"),
			() => t.vb.t("Apagar lembrete")
		]), V("click", c, (e) => {
			e.target.closest(".remText") || _(v(n));
		}), V("keydown", c, (e) => {
			e.key === "Enter" && _(v(n));
		}), V("change", P, (e) => t.send({
			t: "reminder.enable",
			id: v(n).id,
			on: e.currentTarget.checked
		})), V("click", I, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: v(n).id
			});
		}), C(e, a);
	});
	var ee = w(I, 2), z = (e) => {
		var n = Hi(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), C(e, n);
	};
	G(ee, (e) => {
		!v(u).length && !v(n) && e(z);
	}), C(e, x), j();
}
n([
	"click",
	"keydown",
	"change"
]);
// svelte/features/navigation/model.ts
function Gi(e) {
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
function Ki(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function qi(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
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
function Ji(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function Yi(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = Gi(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function Xi() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function Zi(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function Qi(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function $i(e, t = !1, n = Xi()) {
	return {
		roomId: e,
		storage: n,
		state: ge({
			draft: "",
			closed: Zi(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function ea(e, t, n) {
	let r = ue(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of Ki(t, n)) i.delete(e);
	Qi(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function ta(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), Qi(e, r), {
			...n,
			closed: r
		};
	});
}
function na(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : $i(t.id, r);
	return ea(i, Gi(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var ra = a("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), ia = a("<span class=\"tw:sr-only\"> </span>"), aa = a("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), oa = a("<span> </span>"), sa = a("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), ca = a("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), la = a("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), ua = a("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), da = a(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), fa = a("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), pa = a("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), ma = a("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), ha = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <!></section>");
function ga(n, a) {
	let s = _();
	b(a, !0);
	let f = () => z(v(E), "$navigation", y), [y, S] = e(), E = k(() => a.session.state), D = m(""), O = m(null), A = m(null), M = m(!1), P = m(null), F = !1;
	d(() => {
		F = !0;
	});
	let I = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], L = k(() => a.room.epics.filter((e) => !e.archived)), te = k(() => Ji(a.room.epics, a.room.messages)), B = k(() => f().archived && v(te).length > 0 ? "archived" : "active"), re = k(() => Gi(v(B) === "archived" ? v(te) : v(L))), ie = k(() => Gi(a.room.epics)), V = k(() => new Set(a.room.epics.filter((e) => a.vb.epicBusy(e)).map((e) => e.id))), oe = k(() => qi(v(re), f().closed, v(V), !0)), se = k(() => new Map(v(oe).map((e, t) => [e.epic.id, `${s}-row-${t}`])));
	x(() => {
		ea(a.session, v(ie), a.thread);
	});
	function le(e) {
		if (F) return;
		let t = e === "archived";
		v(E).update((e) => ({
			...e,
			archived: t
		})), a.onarchchange(t), c(O, null), c(A, null), c(D, "");
	}
	function ue(e) {
		if (F || a.session.roomId !== a.room.id) return !1;
		c(D, "");
		try {
			if (a.send(e)) return !0;
		} catch {}
		return c(D, a.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function fe(e) {
		if (e.preventDefault(), F) return;
		let t = f().draft.trim();
		if (!t) return v(P)?.focus();
		ue({
			t: "epic",
			title: t
		}) && xe(v(E), u(f).draft = "", u(f));
	}
	function ge(e) {
		let t = v(re).parents.get(e);
		return t ? v(re).children.get(t) ?? [] : v(re).roots;
	}
	function _e(e, t) {
		let n = ge(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function ve(e, t, n) {
		let r = Yi(a.room.epics, e, t, n);
		r && ue({
			t: "epic.order",
			ids: r
		});
	}
	function ye(e, t) {
		let n = _e(e, t);
		v(B) === "active" && n && ve(e, n.id, t === 1);
	}
	function Ce(e, t) {
		if (v(B) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", c(O, t, !0);
	}
	function Te(e, t) {
		return v(B) === "active" && v(O) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Ee(e, t) {
		if (!Te(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		c(A, t, !0), c(M, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function De(e, t) {
		let n = v(M);
		if (c(A, null), !Te(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && ve(r, t, n), c(O, null);
	}
	var Oe = ha(), ke = r(Oe);
	{
		let e = (e, n = be) => {
			var d = o(), m = T(d), _ = (e) => {
				var o = pa(), d = T(o);
				W(d, 21, () => v(oe), (e) => e.epic.id, (e, o) => {
					let s = k(() => v(o).epic), u = k(() => f().closed.has(v(s).id)), d = k(() => v(re).byId.get(v(re).parents.get(v(s).id) ?? "")), m = k(() => a.vb.epicBusy(v(s)));
					var _ = ua(), y = r(_), b = r(y), x = (e) => {
						{
							let t = k(() => v(u) ? "chevronRight" : "chevronDown"), n = k(() => `${a.vb.t(v(u) ? "Abrir galho" : "Fechar galho")}: ${v(s).title}`), r = k(() => !v(u)), i = k(() => (v(re).children.get(v(s).id) ?? []).map((e) => v(se).get(e.id)).join(" "));
							Se(e, {
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
								onclick: () => ta(a.session, v(s).id)
							});
						}
					}, S = (e) => {
						var t = ra();
						C(e, t);
					};
					G(b, (e) => {
						v(o).hasChildren ? e(x) : e(S, -1);
					});
					var E = w(b, 2);
					{
						let e = k(() => a.thread === v(s).id ? "page" : void 0);
						ee(E, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return v(s).id;
							},
							get "aria-current"() {
								return v(e);
							},
							onclick: () => {
								a.thread === v(s).id && v(o).hasChildren ? ta(a.session, v(s).id) : a.onopen(v(s).id);
							},
							children: (e, n) => {
								var c = ca(), f = T(c);
								{
									let e = k(() => v(s).owner ? a.vb.name(v(s).owner) : v(s).title), t = k(() => v(s).owner && a.room.avatars?.[v(s).owner] ? `/api/avatar/${encodeURIComponent(v(s).owner)}?v=${a.room.avatars[v(s).owner]}` : void 0);
									p(f, {
										get name() {
											return v(e);
										},
										get src() {
											return v(t);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var g = w(f, 2), _ = r(g, !0), y = w(_), b = (e) => {
									var t = ia(), n = l(t);
									h((e) => i(n, `· ${e ?? ""}`), [() => a.vb.t("Subépico de {title}", { title: v(d).title })]), C(e, t);
								};
								G(y, (e) => {
									v(d) && e(b);
								}), R(g);
								var x = w(g, 2), S = (e) => {
									var t = aa();
									h((e) => U(t, "aria-label", e), [() => v(m) ? a.vb.t("{who} está trabalhando", { who: v(m) }) : a.vb.t("Trabalho em um subépico")]), C(e, t);
								};
								G(x, (e) => {
									(v(m) || v(u) && v(o).busyBelow) && e(S);
								});
								var E = w(x, 2), D = (e) => {
									he(e, {
										variant: "warning",
										children: (e, n) => {
											t();
											var r = H();
											h((e) => i(r, e), [() => a.vb.waitCount(v(s).id)]), C(e, r);
										},
										$$slots: { default: !0 }
									});
								}, O = k(() => a.vb.waitCount(v(s).id));
								G(E, (e) => {
									v(O) && e(D);
								});
								var A = w(E, 2), j = (e) => {
									var t = oa(), n = l(t, !0);
									h((e) => {
										U(t, "title", e), i(n, v(s).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => a.vb.t(v(s).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), C(e, t);
								};
								G(A, (e) => {
									v(s).prod && e(j);
								});
								var M = w(A, 2), N = (e) => {
									var t = sa(), n = l(t);
									h((e) => i(n, `${e ?? ""}/${v(s).tasks.length ?? ""}`), [() => v(s).tasks.filter((e) => e.done).length]), C(e, t);
								};
								G(M, (e) => {
									v(s).tasks.length && e(N);
								}), h(() => i(_, v(s).title)), C(e, c);
							},
							$$slots: { default: !0 }
						});
					}
					R(y);
					var D = w(y, 2), j = r(D), P = l(j), F = w(j, 2), L = r(F);
					{
						let e = k(() => `${v(se).get(v(s).id)}-owner`);
						ce(L, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = H();
								h((e) => i(r, e), [() => a.vb.t("Dono do épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var z = w(L, 2);
					{
						let e = k(() => `${v(se).get(v(s).id)}-owner`), t = k(() => `${a.vb.t("Dono do épico")}: ${v(s).title}`), n = k(() => v(s).owner ?? ""), r = k(() => [{
							value: "",
							label: a.vb.t("Sem dono")
						}, ...a.room.members.map((e) => ({
							value: e,
							label: a.vb.name(e)
						}))]);
						N(z, {
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
							onValueChange: (e) => (ue({
								t: "epic.owner",
								id: v(s).id,
								owner: e
							}), !1)
						});
					}
					var te = w(z, 2), B = (e) => {
						var n = la(), o = r(n);
						{
							let e = k(() => !_e(v(s).id, -1)), n = k(() => `${a.vb.t("Mover para cima")}: ${v(s).title}`);
							ee(o, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => ye(v(s).id, -1),
								children: (e, n) => {
									t();
									var r = H();
									h((e) => i(r, e), [() => a.vb.t("Mover para cima")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var c = w(o);
						{
							let e = k(() => !_e(v(s).id, 1)), n = k(() => `${a.vb.t("Mover para baixo")}: ${v(s).title}`);
							ee(c, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => ye(v(s).id, 1),
								children: (e, n) => {
									t();
									var r = H();
									h((e) => i(r, e), [() => a.vb.t("Mover para baixo")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						R(n), C(e, n);
					};
					G(te, (e) => {
						n() === "active" && e(B);
					}), R(F), R(D), R(_), h((e, t, r, a) => {
						U(_, "id", e), U(_, "hidden", v(o).hidden), U(_, "data-epic", v(s).id), U(_, "data-depth", v(o).depth), ne(_, 1, t), U(y, "aria-label", v(s).title), U(y, "draggable", n() === "active"), ne(y, 1, r), i(P, `${a ?? ""}: ${v(s).title ?? ""}`);
					}, [
						() => v(se).get(v(s).id),
						() => pe(I[Math.min(v(o).depth, I.length - 1)]),
						() => pe(me("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", a.thread === v(s).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", v(A) === v(s).id && (v(M) ? "tw:border-b-primary" : "tw:border-t-primary"), v(O) === v(s).id && "tw:opacity-50")),
						() => a.vb.t("Ações do épico")
					]), g("dragstart", y, (e) => Ce(e, v(s).id)), g("dragend", y, () => {
						c(O, null), c(A, null);
					}), g("dragover", y, (e) => Ee(e, v(s).id)), g("dragleave", y, () => {
						v(A) === v(s).id && c(A, null);
					}), g("drop", y, (e) => De(e, v(s).id)), C(e, _);
				}), R(d);
				var m = w(d, 2), _ = (e) => {
					var n = fa(), o = T(n), d = r(o);
					{
						let e = k(() => `${s}-new`);
						ce(d, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = H();
								h((e) => i(r, e), [() => a.vb.t("Novo épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var p = w(d, 2), m = r(p), _ = () => F ? "" : f().draft, y = (e) => {
						F || xe(v(E), u(f).draft = e, u(f));
					};
					{
						let e = k(() => `${s}-new`), t = k(() => a.vb.t("Novo épico: escreva o título…"));
						de(m, {
							get id() {
								return v(e);
							},
							get value() {
								return _();
							},
							set value(e) {
								y(e);
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
					var b = w(m);
					{
						let e = k(() => a.vb.t("Criar épico"));
						Se(b, {
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return v(e);
							}
						});
					}
					R(p), R(o);
					var x = w(o, 2);
					W(x, 17, () => a.room.suggestions, we, (e, n, r) => {
						{
							let o = k(() => a.thread === `pre:${r}` ? "page" : void 0);
							ee(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return v(o);
								},
								onclick: () => a.onopen(`pre:${r}`),
								children: (e, r) => {
									t();
									var o = da(), s = T(o, !0), c = w(s), u = l(c, !0);
									h((e) => {
										i(s, v(n).title), i(u, e);
									}, [() => a.vb.t("sugestão do @vibe, clique para ver")]), C(e, o);
								},
								$$slots: { default: !0 }
							});
						}
					}), g("submit", o, fe), C(e, n);
				};
				G(m, (e) => {
					n() === "active" && e(_);
				}), h((e) => U(d, "aria-label", e), [() => n() === "archived" ? a.vb.t("Arquivados") : a.vb.t("Épicos")]), C(e, o);
			};
			G(m, (e) => {
				n() === v(B) && e(_);
			}), C(e, d);
		}, n = k(() => [{
			value: "active",
			label: `${a.vb.t("Épicos")} · ${v(L).length}`
		}, {
			value: "archived",
			label: `${a.vb.t("Arquivados")} · ${v(te).length}`,
			disabled: v(te).length === 0
		}]), d = k(() => a.vb.t("Épicos"));
		ae(ke, {
			get items() {
				return v(n);
			},
			get label() {
				return v(d);
			},
			get value() {
				return v(B);
			},
			onValueChange: le,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Ae = w(ke, 2), je = (e) => {
		var t = ma(), n = l(t, !0);
		h(() => i(n, v(D))), C(e, t);
	};
	G(Ae, (e) => {
		v(D) && e(je);
	}), R(Oe), h((e) => U(Oe, "aria-label", e), [() => a.vb.t("Épicos")]), C(n, Oe), j(), S();
}
// svelte/Sidebar.svelte
var _a = a("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), va = a("<span class=\"fn\"> </span>"), ya = a("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), ba = a("<button type=\"button\" class=\"ghost x\"></button>"), xa = a("<div class=\"member\"><!> <!> <!></div> <!>", 1), Sa = a("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Ca = a("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), wa = a("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), Ta = a("<div class=\"asks\"><h4> </h4> <!></div>"), Ea = a("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), Da = a("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), Oa = a("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), ka = a("<option></option>"), Aa = a("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function ja(e, n) {
	b(n, !0);
	let a = (e, t = be) => {
		var a = xa(), o = T(a), s = r(o);
		M(s, () => n.vb.avatar(t(), n.room.online.includes(t())));
		var c = w(s, 2), u = (e) => {
			var a = _a(), o = r(a), s = r(o), c = l(s, !0), u = w(s), d = l(u, !0);
			R(o);
			var f = w(o, 2), p = r(f), m = l(p, !0), g = w(p, 2), _ = l(g, !0);
			R(f), R(a), h((e, n, r, a, o, l, f) => {
				U(s, "title", t()), i(c, e), U(u, "title", n), i(d, r), U(p, "data-copyinv", t()), U(p, "title", a), i(m, o), U(g, "data-resend", t()), U(g, "title", l), i(_, f);
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
			var r = va(), a = l(r, !0);
			h(() => {
				U(r, "title", t()), i(a, n.room.names[t()]);
			}), C(e, r);
		}, p = (e) => {
			var n = ya(), a = r(n), o = l(a, !0), s = w(a), c = l(s);
			R(n), h((e, n) => {
				U(a, "title", t()), i(o, e), i(c, `@${n ?? ""}`);
			}, [() => t().split("@")[0], () => t().split("@")[1] ?? ""]), C(e, n);
		};
		G(c, (e) => {
			v(d) ? e(u) : n.room.names?.[t()] ? e(f, 1) : e(p, -1);
		});
		var m = w(c, 2), g = (e) => {
			var r = ba();
			M(r, () => n.vb.icon("x"), !0), R(r), h((e, n) => {
				U(r, "data-remove", t()), U(r, "aria-label", e), U(r, "title", n);
			}, [() => n.vb.t("Remover {email}", { email: t() }), () => n.room.pending?.includes(t()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), C(e, r);
		}, _ = k(() => t() !== n.room.book?.owner && (n.room.pending?.includes(t()) || n.room.me === n.room.book?.owner));
		G(m, (e) => {
			v(_) && e(g);
		}), R(o);
		var y = w(o, 2);
		M(y, () => n.vb.agentRows(t())), C(e, a);
	}, o = D(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), s = D(n, "friends", 19, () => []), c = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, u = k(() => n.room.epics.find((e) => e.id === n.thread)), d = k(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), f = k(() => n.room.members.filter((e) => !v(d).includes(e))), p = k(() => s().filter((e) => !n.room.members.includes(e)));
	var m = Aa(), g = T(m), _ = w(g, 2);
	M(_, () => n.vb.roomStrip());
	var y = w(_, 2), x = r(y), S = r(x), E = r(S);
	M(E, () => n.vb.icon("back")), t(), R(S);
	var O = w(S, 2), A = (e) => {
		var t = Sa(), r = T(t);
		M(r, () => n.vb.icon(v(u).archived ? "undo" : "check", 18), !0), R(r);
		var i = w(r, 2);
		M(i, () => n.vb.icon("trash", 18), !0), R(i), h((e, t, n, a) => {
			U(r, "title", e), U(r, "aria-label", t), U(i, "title", n), U(i, "aria-label", a);
		}, [
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), C(e, t);
	};
	G(O, (e) => {
		v(u) && e(A);
	});
	var N = w(O, 2);
	M(N, () => n.vb.icon("sidebar", 20), !0), R(N), R(x), R(y);
	var P = w(y, 2), F = r(P);
	let I;
	var ee = r(F);
	M(ee, () => n.vb.roomMark("ri roomIco"));
	var L = w(ee), z = l(L, !0), te = w(L, 2), B = (e) => {
		var t = Ca(), a = r(t);
		M(a, () => n.vb.icon("pencil", 13));
		var o = w(a);
		R(t), h((e, n) => {
			U(t, "title", e), i(o, ` ${n ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), C(e, t);
	}, re = k(() => !n.thread.startsWith("pre:"));
	G(te, (e) => {
		v(re) && e(B);
	});
	var ie = w(te, 2);
	M(ie, () => n.vb.waitPill("main"));
	var V = w(ie), H = l(V, !0);
	R(F);
	var ae = w(F, 2);
	{
		let e = k(() => ({
			t: n.vb.t,
			name: n.vb.name,
			epicBusy: n.vb.epicBusy,
			waitCount: (e) => n.vb.waitsIn(e).length
		}));
		ga(ae, {
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
	R(P);
	var oe = w(P, 2);
	M(oe, () => n.vb.pinsSec());
	var se = w(oe, 2), ce = r(se), le = (e) => {
		var t = Ta(), a = r(t), o = l(a, !0), s = w(a, 2);
		W(s, 17, () => n.room.requests, (e) => e.email, (e, t) => {
			var a = wa(), o = r(a);
			M(o, () => n.vb.avatar(v(t).email));
			var s = w(o, 2), c = r(s), u = l(c, !0), d = w(c), f = r(d), p = w(f), m = l(p, !0);
			R(d), R(s);
			var g = w(s, 2);
			M(g, () => n.vb.icon("x"), !0), R(g), R(a), h((e, n, r, a, o, s, l) => {
				U(c, "title", e), i(u, n), i(f, `${r ?? ""} · `), U(p, "data-ask", v(t).email), U(p, "title", a), i(m, o), U(g, "data-ask", v(t).email), U(g, "aria-label", s), U(g, "title", l);
			}, [
				() => `${v(t).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) })}`,
				() => v(t).name || v(t).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: v(t).email }),
				() => n.vb.t("Recusar")
			]), C(e, a);
		}), R(t), h((e) => i(o, e), [() => n.vb.t("Pedindo pra entrar")]), C(e, t);
	};
	G(ce, (e) => {
		n.room.requests?.length && e(le);
	});
	var ue = w(ce, 2), de = l(ue, !0), fe = w(ue, 2);
	M(fe, () => n.vb.sbxRows());
	var pe = w(fe, 2);
	W(pe, 16, () => v(d), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var me = w(pe, 2), he = (e) => {
		var t = Ea(), s = r(t), c = l(s, !0), u = w(s);
		W(u, 16, () => v(f), (e) => e, (e, t) => {
			a(e, () => t);
		}), R(t), h((e) => {
			t.open = o().off, i(c, e);
		}, [() => n.vb.t("{n} offline", { n: v(f).length })]), C(e, t);
	};
	G(me, (e) => {
		v(f).length && e(he);
	});
	var ge = w(me, 2), _e = (e) => {
		var t = Oa(), a = r(t), s = l(a), c = w(a, 2);
		W(c, 16, () => v(p), (e) => e, (e, t) => {
			var a = Da(), o = r(a);
			M(o, () => n.vb.avatar(t));
			var s = w(o), c = l(s, !0), u = w(s);
			M(u, () => n.vb.icon("plus"), !0), R(u), R(a), h((e, n) => {
				U(a, "data-add", t), U(a, "title", e), i(c, n);
			}, [() => n.vb.t("Adicionar {email}", { email: t }), () => n.vb.name(t)]), C(e, a);
		}), R(t), h((e) => {
			t.open = o().friends ?? n.room.members.length <= 1, i(s, `${e ?? ""} · ${v(p).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), C(e, t);
	};
	G(ge, (e) => {
		v(p).length && e(_e);
	});
	var ve = w(ge, 2), ye = r(ve), xe = w(ye);
	M(xe, () => n.vb.icon("plus"), !0), R(xe), R(ve);
	var Se = w(ve, 2);
	W(Se, 21, () => v(p), we, (e, t) => {
		var n = ka(), r = {};
		h(() => {
			r !== (r = v(t)) && (n.value = (n.__value = r) ?? "");
		}), C(e, n);
	}), R(Se), R(se), h((e, t, r, a, o, s, c, l, u, d) => {
		U(g, "aria-label", e), U(N, "title", t), U(N, "aria-label", r), I = ne(F, 1, "thread", null, I, {
			sel: n.thread === "main",
			waiting: a
		}), U(F, "title", o), i(z, s), i(H, c), i(de, l), U(ye, "placeholder", u), U(xe, "aria-label", d);
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
	]), C(e, m), j();
}
// svelte/Message.svelte
var Ma = a("<span class=\"gut\"> </span>"), Na = a(" <span class=\"agentTag\">agent</span>", 1), Pa = a("<span class=\"doneTag\"> </span>"), Fa = a("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function Ia(e, t) {
	b(t, !0);
	let n = D(t, "origin", 3, !1), a = k(() => t.vb.continues(t.previous, t.message)), s = k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), c = k(() => n() && v(s) ? v(s).replace(/\sid="m\d+"/, "") : v(s)), u = k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), d = k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var f = o(), p = T(f), m = (e) => {
		var t = o(), n = T(t);
		M(n, () => v(c)), C(e, t);
	}, g = (e) => {
		var s = Fa();
		let c;
		var f = r(s);
		M(f, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var p = w(f, 2), m = (e) => {
			var n = Ma(), r = l(n, !0);
			h((e) => {
				U(n, "title", v(d)), i(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), C(e, n);
		};
		G(p, (e) => {
			v(a) && e(m);
		});
		var g = w(p, 2), _ = r(g), y = r(_);
		M(y, () => t.vb.icon("copy", 14));
		var b = w(y);
		R(_);
		var x = w(_, 2), S = r(x);
		M(S, () => t.vb.icon("link", 14));
		var E = w(S);
		R(x);
		var D = w(x, 2), O = r(D);
		M(O, () => t.vb.icon("reply", 14));
		var k = w(O);
		R(D), R(g);
		var A = w(g, 2), j = r(A), N = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.quoteHtml(t.message.reply_to)), C(e, n);
		};
		G(j, (e) => {
			t.message.reply_to && e(N);
		});
		var P = w(j, 2), F = r(P), I = (e) => {
			var n = Na(), r = T(n), a = w(r);
			h((e, t) => {
				i(r, `${e ?? ""} `), U(a, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), C(e, n);
		}, ee = (e) => {
			var n = H();
			h((e) => i(n, e), [() => t.vb.name(t.message.author)]), C(e, n);
		};
		G(F, (e) => {
			t.message.kind === "agent" ? e(I) : e(ee, -1);
		});
		var L = w(F, 2), z = (e) => {
			var n = Pa(), r = l(n);
			h((e, t) => {
				U(n, "title", e), i(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), C(e, n);
		};
		G(L, (e) => {
			t.message.tag === "done" && e(z);
		});
		var te = w(L), B = w(te), re = l(B, !0);
		R(P);
		var ie = w(P, 2);
		M(ie, () => v(u), !0), R(ie);
		var V = w(ie, 2);
		M(V, () => t.vb.attHtml(t.message.files));
		var ae = w(V, 2), oe = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.cardHtml(t.message)), C(e, n);
		};
		G(ae, (e) => {
			t.message.card && e(oe);
		});
		var se = w(ae, 2), ce = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.choiceHtml(t.message)), C(e, n);
		};
		G(se, (e) => {
			t.message.choices && e(ce);
		});
		var le = w(se, 2), ue = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.pollHtml(t.message.poll)), C(e, n);
		};
		G(le, (e) => {
			t.message.poll && e(ue);
		});
		var de = w(le, 2), fe = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.threadCards(t.message.id)), C(e, n);
		};
		G(de, (e) => {
			n() || e(fe);
		}), R(A), R(s), h((e, r, o, l, f, p, m, h, g, y, S, C) => {
			c = ne(s, 1, "msg", null, c, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: v(a),
				waitMsg: e
			}), U(s, "id", n() ? void 0 : `m${t.message.id}`), U(_, "data-copymsg", t.message.id), U(_, "title", r), U(_, "aria-label", o), i(b, ` ${l ?? ""}`), U(x, "data-copylink", t.message.id), U(x, "title", f), U(x, "aria-label", p), i(E, ` ${m ?? ""}`), U(D, "data-reply", t.message.id), U(D, "title", h), U(D, "aria-label", g), i(k, ` ${y ?? ""}`), i(te, ` · ${S ?? ""}`), U(B, "title", v(d)), i(re, C), U(ie, "hidden", !v(u));
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
	G(p, (e) => {
		v(c) === null ? e(g, -1) : e(m);
	}), C(e, f), j();
}
// svelte/Chat.svelte
var La = a("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), Ra = a("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), za = a("<div><!></div>"), Ba = a("<!> <!> <!>", 1);
function Va(e, t) {
	b(t, !0);
	let n = D(t, "more", 3, !1), a = D(t, "origin", 3, null), s = D(t, "replyCount", 3, 0);
	var c = o(), u = T(c);
	P(u, () => t.room.id + ":" + t.thread, (e) => {
		var c = Ba(), u = T(c), d = (e) => {
			var n = La(), a = r(n), o = l(a, !0);
			R(n), h((e) => i(o, e), [() => t.vb.t("Carregar mensagens anteriores")]), V("click", a, function(...e) {
				t.onloadolder?.apply(this, e);
			}), C(e, n);
		};
		G(u, (e) => {
			t.list.length && n() && e(d);
		});
		var f = w(u, 2), p = (e) => {
			var n = Ra(), o = r(n);
			Ia(o, {
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
			M(m, () => t.vb.icon("reply", 13)), R(f), R(c), R(n), h((e, t) => {
				i(d, e), U(f, "data-gomain", a().id), i(p, `${t ?? ""} `);
			}, [() => s() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: s() }), () => t.vb.t("ver na sala principal")]), C(e, n);
		};
		G(f, (e) => {
			a() && e(p);
		});
		var m = w(f, 2), g = (e) => {
			var n = o(), r = T(n);
			W(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = k(() => v(r) ? t.list[v(r) - 1] : t.previous);
					Ia(e, {
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
			var n = za();
			let s;
			var c = r(n), l = (e) => {
				var n = o(), r = T(n);
				M(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), C(e, n);
			}, u = (e) => {
				var n = H();
				h((e) => i(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), C(e, n);
			};
			G(c, (e) => {
				t.thread === "main" ? e(l) : e(u, -1);
			}), R(n), h(() => s = ne(n, 1, "empty", null, s, { afterOrigin: !!a() })), C(e, n);
		};
		G(m, (e) => {
			t.list.length ? e(g) : e(_, -1);
		}), C(e, c);
	}), C(e, c), j();
}
n(["click"]);
// svelte/roomStore.ts
function Ha(e, t, n) {
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
function Ua() {
	let e = ge(null);
	return {
		subscribe: e.subscribe,
		get: () => ue(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => Ha(e, t, n)), ue(e);
		}
	};
}
// svelte/main.ts
var Wa = /* @__PURE__ */ Ee({
	createRoomStore: () => Ua,
	dismissDialogs: () => fe,
	mountInbox: () => qa,
	mountView: () => Ka
}), Ga = {
	tasks: Ke,
	board: mt,
	files: Tt,
	reminders: Wi,
	sidebar: ja,
	chat: Va
};
function Ka(e, t, n) {
	let r = ge(n), i = Ga[e], a = f(() => S(De, {
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
				Ce(a);
			});
		}
	};
}
function qa(e, t) {
	let { waits: n, ...r } = t, i = ge(n), a = f(() => S(Pe, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => f(() => {
		Ce(a);
	}), { updateWaits(e) {
		f(() => i.set(e));
	} });
}
export { na as a, ji as c, Ua as i, Oe as l, qa as n, Fi as o, Ka as r, Mi as s, Wa as t };
