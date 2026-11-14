import { A as e, B as t, L as n, O as r, S as i, V as a, W as o, a as s, c, j as l, l as u, t as d, v as f, w as p, x as m, z as h } from "./Button-Cx7HMFHY.js";
import { $ as g, A as _, An as v, Et as ee, F as y, G as b, Tt as x, Yt as S, h as C, lt as w, m as te, q as T, qt as E, tt as ne, u as D, z as O } from "./shared-qe__81Sz.js";
import { t as k } from "./Snapshot-B5lNG0lv.js";
import { t as A } from "./Heading-Dkd8XMpq.js";
import { t as re } from "./IconButton-C3NNuUw1.js";
import { t as ie } from "./Avatar-8pZy6e0J.js";
import { t as j } from "./Badge-LnHYpvr5.js";
import { t as M } from "./ErrorState-CiGHe1Vk.js";
import { s as ae } from "./model-B78l00ZB.js";
// svelte/features/application/roomInboxModel.ts
var N = (e) => {
	let t = /^[mab]\d+$/.test(e) ? Number(e.slice(1)) : NaN;
	return Number.isSafeInteger(t) && t > 0 ? t : void 0;
};
function oe(e, t, n) {
	let r = (e) => e.filter((e) => n || e.book_id === t), i = r(e.waits), a = i.filter((e) => !e.ref.startsWith("t")), o = i.filter((e) => e.ref.startsWith("t")), s = new Set(a.flatMap((e) => {
		let t = N(e.ref);
		return t ? [`${e.book_id}/${t}`] : [];
	})), c = [...a.map((e) => ({
		kind: e.ref.startsWith("m") ? "ask" : "claude",
		key: `w:${e.book_id}:${e.ref}`,
		book: e.book_id,
		room: e.room,
		thread: e.thread,
		topic: e.topic,
		messageId: N(e.ref),
		author: e.author,
		authorName: e.author_name,
		text: e.text,
		ts: e.ts,
		wait: e
	})), ...r(e.mentions).filter((e) => !s.has(`${e.book_id}/${e.msg_id}`)).map((e) => ({
		kind: "mention",
		key: `m:${e.book_id}:${e.msg_id}`,
		book: e.book_id,
		room: e.room,
		thread: e.thread,
		topic: null,
		messageId: e.msg_id,
		author: e.author,
		authorName: e.author_name,
		text: e.text,
		ts: e.ts,
		mention: e
	}))].sort((e, t) => e.ts - t.ts), l = new Set(o.map((e) => `${e.book_id}/${e.ref.slice(1)}`)), u = /* @__PURE__ */ new Map();
	for (let t of r(e.tasks)) {
		if (l.has(`${t.book_id}/${t.task_id}`)) continue;
		let e = `${t.book_id}/${t.epic_id}`, n = u.get(e);
		n || (n = {
			room: t.room,
			bookId: t.book_id,
			epicId: t.epic_id,
			epic: t.epic,
			first: t,
			tasks: []
		}, u.set(e, n)), n.tasks.push(t);
	}
	return {
		messages: c,
		oks: o,
		groups: [...u.values()]
	};
}
function se(e, t) {
	return e.topic || (e.thread === "main" ? null : t?.id === e.book ? t.epics.find((t) => t.id === e.thread)?.title ?? "" : "");
}
// svelte/features/application/RoomInbox.svelte
var ce = a("<p role=\"status\"> </p>"), le = a("<p class=\"tw:my-3 tw:text-center tw:text-xs tw:text-muted-foreground\"> </p>"), ue = a("<span class=\"tw:text-xs tw:font-semibold\"> </span>"), de = a("<!> <span class=\"tw:grid tw:min-w-0 tw:flex-1 tw:gap-1\"><span><strong> </strong> <span class=\"tw:text-xs\"> </span></span> <!> <span class=\"tw:text-xs\"> </span> <span class=\"tw:line-clamp-6 tw:break-words tw:whitespace-pre-wrap\"> </span></span>", 1), fe = a("<article data-room-inbox-message=\"\"><!> <!></article>"), pe = a("<!> <!>", 1), me = a("<p class=\"tw:p-4 tw:text-center tw:text-muted-foreground\"> </p>"), he = a("<li class=\"tw:flex tw:items-center tw:gap-2\"><!><!></li>"), P = a("<!> <ul class=\"tw:m-0 tw:list-none tw:space-y-2 tw:p-0\"></ul>", 1), ge = a("<span class=\"tw:font-normal\"> </span>"), _e = a(" <!>", 1), ve = a("<span class=\"tw:text-xs\"> </span>"), ye = a("<li class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!></li>"), be = a("<p class=\"tw:text-muted-foreground\"> </p>"), xe = a("<section data-native-room-inbox=\"\" class=\"tw:grid tw:h-full tw:min-h-0 tw:min-w-0 tw:grid-cols-1 tw:overflow-auto tw:bg-background tw:font-sans tw:text-foreground tw:min-[901px]:grid-cols-[minmax(0,1fr)_auto] tw:min-[901px]:overflow-hidden\"><div data-room-inbox-chat=\"\" class=\"tw:flex tw:min-h-0 tw:min-w-0 tw:flex-col\"><header class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:border-b tw:border-border tw:p-4\"><!> <!> <!> <!></header> <div class=\"tw:min-h-0 tw:flex-1 tw:space-y-2 tw:overflow-auto tw:p-4\"><!> <!> <!> <!></div></div> <aside data-room-inbox-doc=\"\"><!> <p class=\"tw:text-muted-foreground\"> </p> <!> <!> <!></aside></section>");
function F(a, N) {
	ee(N, !0);
	let F = () => u(we, "$inbox", R), I = () => u(Te, "$root", R), L = () => u(Ee, "$personal", R), [R, Se] = c(), Ce = s(N, "sidebarCollapsed", 3, !1), z = C(() => N.binding), we = C(() => N.owner.state), Te = C(() => N.services.rootRoom.state), Ee = C(() => N.services.personal.state), B = C(() => N.services.t), V = w(() => oe(F().data, z.roomId ?? "", F().all)), H = ne(""), U = () => N.owner.owns(z), W = (e) => e.kind === "claude" ? B("Seu Claude") : e.author === "ai" ? "@vibe" : e.authorName || I().room?.names?.[e.author] || (L().me?.email === e.author ? L().me.name : L().me?.friends.find((t) => t.email === e.author)?.name) || e.author.split("@")[0], G = (e) => new Intl.DateTimeFormat(N.services.locale, {
		weekday: "short",
		day: "numeric",
		month: "short"
	}).format(e), De = (e) => new Intl.DateTimeFormat(N.services.locale, {
		hour: "2-digit",
		minute: "2-digit"
	}).format(e), Oe = (e) => {
		let t = I().room?.avatars?.[e];
		return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : ae(L().me, e);
	}, ke = (e) => se(e, I().room) ?? B("sala principal"), Ae = (e) => e === "doing" ? B("fazendo") : e === "review" ? B("revisar") : e === "todo" ? B("a fazer") : e, je = (e) => {
		let t = D(V).messages[e - 1], n = D(V).messages[e];
		return !!n && (!t || G(n.ts) !== G(t.ts));
	};
	function Me(e) {
		U() && (e.wait ? N.owner.openWait(z, e.wait) : e.mention && N.owner.openMention(z, e.mention));
	}
	async function Ne(e) {
		if (U()) {
			g(H, "");
			try {
				await N.owner.resolve(z, e);
			} catch {
				U() && g(H, B("Não deu pra resolver agora. Tente de novo."), !0);
			}
		}
	}
	async function Pe(e) {
		if (!(e.currentTarget instanceof HTMLElement) || !e.currentTarget.isConnected || !U()) return;
		let t = document.activeElement;
		N.owner.close(z), await te(), (document.activeElement === document.body || document.activeElement === t) && N.owner.restoreFocus(z);
	}
	function Fe(e) {
		return { destroy: N.documentWidth(e) };
	}
	var K = xe(), q = y(K), J = y(q), Y = y(J);
	A(Y, {
		level: 2,
		class: "tw:m-0 tw:flex-1 tw:text-lg tw:font-semibold",
		children: (e, t) => {
			E();
			var r = o();
			_((e) => n(r, e), [() => B("Caixa de entrada")]), h(e, r);
		},
		$$slots: { default: !0 }
	});
	var X = T(Y, 2);
	{
		let e = w(() => F().all ? "ghost" : "secondary"), t = w(() => !F().all);
		d(X, {
			size: "sm",
			get variant() {
				return D(e);
			},
			get "aria-pressed"() {
				return D(t);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && U() && N.owner.tab(z, !1);
			},
			children: (e, t) => {
				E();
				var r = o();
				_((e) => n(r, e), [() => B("Esta sala")]), h(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var Z = T(X, 2);
	{
		let e = w(() => F().all ? "secondary" : "ghost");
		d(Z, {
			size: "sm",
			get variant() {
				return D(e);
			},
			get "aria-pressed"() {
				return F().all;
			},
			onclick: (e) => {
				e.currentTarget.isConnected && U() && N.owner.tab(z, !0);
			},
			children: (e, t) => {
				E();
				var r = o();
				_((e) => n(r, e), [() => B("Todas")]), h(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var Ie = T(Z, 2);
	{
		let e = w(() => B("Fechar"));
		re(Ie, {
			"data-native-room-inbox-close": !0,
			icon: "close",
			get label() {
				return D(e);
			},
			onclick: (e) => {
				Pe(e);
			}
		});
	}
	S(J);
	var Q = T(J, 2), Le = y(Q), Re = (e) => {
		var t = ce(), r = b(t, !0);
		_((e) => n(r, e), [() => B("Carregando…")]), h(e, t);
	};
	l(Le, (e) => {
		F().phase === "loading" && e(Re);
	});
	var ze = T(Le, 2), Be = (e) => {
		{
			let t = w(() => B("Não foi possível carregar a caixa de entrada.")), n = w(() => B("Tentar de novo"));
			M(e, {
				get title() {
					return D(t);
				},
				compact: !0,
				onretry: () => {
					U() && N.owner.refresh(z);
				},
				get retryLabel() {
					return D(n);
				}
			});
		}
	};
	l(ze, (e) => {
		F().error && e(Be);
	});
	var Ve = T(ze, 2), He = (e) => {
		M(e, {
			get title() {
				return D(H);
			},
			compact: !0
		});
	};
	l(Ve, (e) => {
		D(H) && e(He);
	});
	var Ue = T(Ve, 2);
	r(Ue, 19, () => D(V).messages, (e) => e.wait ?? e.mention ?? e, (e, t, r) => {
		var a = pe(), s = O(a), c = (e) => {
			var r = le(), i = b(r, !0);
			_((e) => n(i, e), [() => G(D(t).ts)]), h(e, r);
		}, u = w(() => je(D(r)));
		l(s, (e) => {
			D(u) && e(c);
		});
		var f = T(s, 2);
		k(f, {
			get value() {
				return D(t);
			},
			children: (e, t = v) => {
				var r = fe(), a = y(r);
				d(a, {
					variant: "ghost",
					class: "tw:h-auto tw:w-full tw:items-start tw:justify-start tw:gap-3 tw:whitespace-normal tw:p-2 tw:text-left",
					onclick: (e) => {
						e.currentTarget.isConnected && Me(t());
					},
					children: (e, r) => {
						var i = de(), a = O(i);
						{
							let e = w(() => W(t())), n = w(() => Oe(t().author));
							ie(a, {
								get name() {
									return D(e);
								},
								get src() {
									return D(n);
								}
							});
						}
						var o = T(a, 2), s = y(o), c = y(s), u = b(c, !0), d = T(c, 2), f = b(d, !0);
						S(s);
						var p = T(s, 2), m = (e) => {
							var r = ue(), i = b(r, !0);
							_((e) => n(i, e), [() => B(t().kind === "ask" ? "esperando você" : "seu Claude espera você")]), h(e, r);
						};
						l(p, (e) => {
							t().kind !== "mention" && e(m);
						});
						var g = T(p, 2), v = b(g), ee = T(g, 2), x = b(ee, !0);
						S(o), _((e, r, i) => {
							n(u, e), n(f, r), n(v, `${F().all ? `${t().room} › ` : ""}${i ?? ""}`), n(x, t().text);
						}, [
							() => W(t()),
							() => De(t().ts),
							() => ke(t()) || B("épico")
						]), h(e, i);
					},
					$$slots: { default: !0 }
				});
				var s = T(a, 2), c = (e) => {
					d(e, {
						size: "sm",
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && t().wait && Ne(t().wait);
						},
						children: (e, t) => {
							E();
							var r = o();
							_((e) => n(r, e), [() => B("Resolvido")]), h(e, r);
						},
						$$slots: { default: !0 }
					});
				}, u = w(() => t().wait?.ref.startsWith("m"));
				l(s, (e) => {
					D(u) && e(c);
				}), S(r), _(() => m(r, 1, i(["tw:rounded-surface tw:border tw:border-border tw:p-2", t().kind !== "mention" && "tw:bg-warning/10"]))), h(e, r);
			},
			$$slots: { default: !0 }
		}), h(e, a);
	}, (e) => {
		var t = me(), r = b(t, !0);
		_((e) => n(r, e), [() => B(F().all ? "Nada esperando você. ✓" : "Nada esperando você nesta sala. ✓")]), h(e, t);
	}), S(Q), S(q);
	var $ = T(q, 2), We = y($);
	A(We, {
		level: 1,
		class: "tw:m-0 tw:text-2xl tw:font-semibold",
		children: (e, t) => {
			E();
			var r = o();
			_((e) => n(r, e), [() => B("O que é seu")]), h(e, r);
		},
		$$slots: { default: !0 }
	});
	var Ge = T(We, 2), Ke = b(Ge, !0), qe = T(Ge, 2), Je = (e) => {
		var t = P(), i = O(t);
		A(i, {
			level: 3,
			class: "tw:m-0 tw:text-sm tw:font-semibold",
			children: (e, t) => {
				E();
				var r = o();
				_((e) => n(r, e), [() => B("Esperando seu OK")]), h(e, r);
			},
			$$slots: { default: !0 }
		});
		var a = T(i, 2);
		r(a, 20, () => D(V).oks, (e) => e, (e, t) => {
			k(e, {
				get value() {
					return t;
				},
				children: (e, t = v) => {
					var r = he(), i = y(r);
					j(i, {
						variant: "warning",
						children: (e, t) => {
							E();
							var r = o();
							_((e) => n(r, e), [() => B("revisar")]), h(e, r);
						},
						$$slots: { default: !0 }
					});
					var a = T(i);
					d(a, {
						variant: "ghost",
						class: "tw:h-auto tw:flex-1 tw:justify-start tw:whitespace-normal tw:text-left",
						onclick: (e) => {
							e.currentTarget.isConnected && U() && N.owner.openWait(z, t());
						},
						children: (e, r) => {
							E();
							var i = o();
							_(() => n(i, t().text)), h(e, i);
						},
						$$slots: { default: !0 }
					}), S(r), h(e, r);
				},
				$$slots: { default: !0 }
			});
		}), S(a), h(e, t);
	};
	l(qe, (e) => {
		D(V).oks.length && e(Je);
	});
	var Ye = T(qe, 2);
	A(Ye, {
		level: 3,
		class: "tw:m-0 tw:text-sm tw:font-semibold",
		children: (e, t) => {
			E();
			var r = o();
			_((e) => n(r, e), [() => B("Suas tarefas")]), h(e, r);
		},
		$$slots: { default: !0 }
	});
	var Xe = T(Ye, 2);
	r(Xe, 17, () => D(V).groups, (e) => `${e.bookId}/${e.epicId}`, (i, a) => {
		var s = P(), c = O(s);
		A(c, {
			level: 4,
			class: "tw:m-0 tw:text-sm tw:font-semibold",
			children: (r, i) => {
				var o = t(), s = O(o);
				e(s, () => D(a).first, (e) => {
					k(e, {
						get value() {
							return D(a).first;
						},
						children: (e, t = v) => {
							d(e, {
								variant: "ghost",
								size: "sm",
								class: "tw:h-auto tw:p-0 tw:text-left",
								onclick: (e) => {
									e.currentTarget.isConnected && U() && N.owner.openTask(z, t());
								},
								children: (e, t) => {
									E();
									var r = _e(), i = O(r, !0), o = T(i), s = (e) => {
										var t = ge(), r = b(t);
										_(() => n(r, `· ${D(a).room ?? ""}`)), h(e, t);
									};
									l(o, (e) => {
										F().all && e(s);
									}), _((e) => n(i, e), [() => D(a).epic || B("sala principal")]), h(e, r);
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				}), h(r, o);
			},
			$$slots: { default: !0 }
		});
		var u = T(c, 2);
		r(u, 20, () => D(a).tasks, (e) => e, (e, t) => {
			k(e, {
				get value() {
					return t;
				},
				children: (e, t = v) => {
					var r = ye(), i = y(r);
					{
						let e = w(() => t().status === "review" ? "warning" : "neutral");
						j(i, {
							get variant() {
								return D(e);
							},
							children: (e, r) => {
								E();
								var i = o();
								_((e) => n(i, e), [() => Ae(t().status)]), h(e, i);
							},
							$$slots: { default: !0 }
						});
					}
					var a = T(i);
					d(a, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:text-left",
						onclick: (e) => {
							e.currentTarget.isConnected && U() && N.owner.openTask(z, t());
						},
						children: (e, r) => {
							E();
							var i = o();
							_(() => n(i, t().title)), h(e, i);
						},
						$$slots: { default: !0 }
					});
					var s = T(a), c = (e) => {
						var r = ve(), i = b(r, !0);
						_(() => n(i, t().due)), h(e, r);
					};
					l(s, (e) => {
						t().due && e(c);
					}), S(r), h(e, r);
				},
				$$slots: { default: !0 }
			});
		}), S(u), h(i, s);
	}, (e) => {
		var t = be(), r = b(t, !0);
		_((e) => n(r, e), [() => B("Nenhuma tarefa aberta sua.")]), h(e, t);
	}), S($), p($, (e) => Fe?.(e)), S(K), _((e, t) => {
		f(K, "aria-label", e), m($, 1, i(["tw:min-h-0 tw:w-full tw:min-w-0 tw:space-y-4 tw:overflow-auto tw:border-t tw:border-border tw:bg-card tw:p-5 tw:min-[901px]:border-t-0 tw:min-[901px]:border-l", Ce() ? "tw:min-[901px]:animate-room-document-width-rail" : "tw:min-[901px]:animate-room-document-width"])), n(Ke, t);
	}, [() => B("Caixa de entrada"), () => B("Tarefas suas e o que espera seu OK. Clique pra abrir.")]), h(a, K), x(), Se();
}
export { F as default };
