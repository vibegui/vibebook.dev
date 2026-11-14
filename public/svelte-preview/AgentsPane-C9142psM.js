import { r as e } from "./rolldown-runtime-DfEuXgQw.js";
import { A as t, B as n, L as r, N as i, O as a, S as o, V as s, W as c, a as l, c as u, j as d, k as f, l as p, q as m, t as h, v as g, w as _, x as v, z as y } from "./Button-Cx7HMFHY.js";
import { $ as b, A as x, Et as S, F as C, G as w, Tt as T, Yt as E, h as D, j as O, lt as k, q as A, qt as j, tt as M, u as N, z as P } from "./shared-qe__81Sz.js";
import { t as F } from "./Heading-Dkd8XMpq.js";
import { t as I } from "./Checkbox-BfJTROWF.js";
import { S as L, d as R, f as z, i as B, m as V, r as H, t as U, u as W } from "./roomCopy-XVT7nAHx.js";
import { c as ee, l as G, t as K } from "./SetupInstructions-xyHo5tew.js";
import { t as te } from "./Input-D0A_t4bj.js";
import { t as ne } from "./AlertDialog-DYYQX3NU.js";
import { t as q } from "./Dialog-BkHABdQA.js";
// svelte/features/sandboxes/log.ts
function re(e) {
	return (e ?? "").replace(/sk-ant-[A-Za-z0-9_.-]+/g, "[redacted]").replace(/"(access_token|refresh_token|code|verifier)"\s*:\s*"[^"]*"/g, "\"$1\":\"[redacted]\"").replace(/((?:authorization|secret|token|api[_ -]?key|access[_ -]?token|refresh[_ -]?token|claude[_ -]?(?:code[_ -]?)?(?:oauth[_ -]?)?token)\s*[:=]\s*)(?:Bearer\s+)?[^\s\r\n]+/gi, "$1[redacted]").slice(-64e3);
}
// svelte/features/sandboxes/SandboxPanel.svelte
var J = s("<p role=\"status\"> </p>"), ie = s("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), ae = s("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:items-center tw:gap-2\"><code class=\"tw:min-w-0 tw:flex-1 tw:overflow-auto tw:font-mono tw:text-xs\"> </code><!></div> <form class=\"tw:flex tw:gap-2\"><!> <!></form> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), oe = s("<div class=\"tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:p-3\"><div class=\"tw:flex tw:items-center tw:gap-2\"><strong class=\"tw:flex-1\"> </strong><span class=\"tw:text-muted-foreground\"> </span><!></div> <!></div>"), se = s("<p role=\"status\"> </p> <!>", 1), ce = s("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-destructive\"> </p>"), le = s("<details><summary class=\"tw:cursor-pointer\"> </summary> <pre class=\"tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-xs\"> </pre></details>"), ue = s("<article class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:p-3\"><div class=\"tw:flex tw:items-start tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1\"><strong class=\"tw:block tw:break-words\"> </strong> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <span class=\"tw:text-xs\"> </span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!> <!> <!></div></article>"), de = s("<p class=\"tw:text-muted-foreground\"> </p>"), fe = s("<p role=\"status\"> </p> <!><!>", 1), pe = s("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), me = s("<section data-vb-native=\"\" data-native-sandboxes=\"\" class=\"tw:space-y-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <!> <!> <!></section> <!>", 1);
function Y(e, t) {
	S(t, !0);
	let n = () => p(I, "$view", s), o = () => p(L, "$credentialView", s), [s, _] = u(), v = l(t, "lang", 3, "pt"), I = D(() => t.owner.state), L = D(() => t.credentials.state), B = M(""), H = M(""), U = M(""), W = M(null), ee = null, G = !0, K = 0, q = (e) => z(v(), e), Y = k(() => !t.owner.current() || ["pending", "unconfirmed"].includes(n().phase) || ["pending", "unconfirmed"].includes(o().phase)), X = k(() => JSON.stringify([o().connected, o().claude]));
	function Z() {
		let e = N(W);
		return e ? e.kind === "credential" ? e.identity === N(X) : n().data?.sandboxes.some((t) => t.id === e.id && V(t) === e.identity) ?? !1 : !1;
	}
	O(() => {
		N(W) && !Z() && b(W, null);
	});
	async function he(e) {
		if (N(Y) || !t.owner.current()) return;
		let n = N(e === "key" ? B : H);
		b(B, ""), b(H, ""), await t.credentials.write(e, n);
	}
	function Q() {
		if (N(Y) || !Z() || !N(W) || !t.owner.current()) return;
		let e = N(W);
		b(W, null), e.kind === "sandbox" ? t.owner.remove(e.id, e.identity) : t.credentials.write(e.action);
	}
	function ge(e, t) {
		ee = t, b(W, {
			kind: "credential",
			action: e,
			identity: N(X)
		}, !0);
	}
	O(() => {
		n().data, t.owner.current() || (b(B, ""), b(H, ""), b(W, null), b(U, ""), K++);
	});
	async function _e(e) {
		if (!t.owner.current()) return;
		let n = ++K;
		b(U, "");
		try {
			await navigator.clipboard.writeText(e), G && t.owner.current() && n === K && b(U, q("copied"), !0);
		} catch {
			G && t.owner.current() && n === K && b(U, q("copyFailed"), !0);
		}
	}
	i(() => {
		G = !1, K++, b(B, ""), b(H, "");
	});
	var ve = me(), ye = P(ve), $ = C(ye), be = C($);
	F(be, {
		level: 3,
		class: "tw:m-0 tw:flex-1 tw:font-sans tw:text-base tw:font-semibold tw:tracking-normal",
		children: (e, t) => {
			j();
			var n = c();
			x((e) => r(n, e), [() => q("title")]), y(e, n);
		},
		$$slots: { default: !0 }
	});
	var xe = A(be);
	h(xe, {
		variant: "ghost",
		size: "sm",
		get disabled() {
			return n().loading;
		},
		onclick: () => void t.owner.refresh(!0),
		children: (e, t) => {
			j();
			var n = c();
			x((e) => r(n, e), [() => q("refresh")]), y(e, n);
		},
		$$slots: { default: !0 }
	}), E($);
	var Se = A($, 2), Ce = w(Se, !0), we = A(Se, 2), Te = (e) => {
		var t = J(), n = w(t, !0);
		x((e) => r(n, e), [() => q("loading")]), y(e, t);
	};
	d(we, (e) => {
		n().loading && !n().data && e(Te);
	});
	var Ee = A(we, 2), De = (e) => {
		var t = ie(), n = w(t, !0);
		x((e) => r(n, e), [() => q("readFailed")]), y(e, t);
	};
	d(Ee, (e) => {
		n().readError && e(De);
	});
	var Oe = A(Ee, 2), ke = (e) => {
		var i = pe(), s = P(i);
		a(s, 16, () => ["key", "token"], f, (e, t) => {
			let n = k(() => t === "key" ? o().connected : o().claude);
			var i = oe(), a = C(i), s = C(a), l = w(s, !0), u = A(s), f = w(u, !0), p = A(u), g = (e) => {
				h(e, {
					variant: "ghost",
					size: "sm",
					get disabled() {
						return N(Y);
					},
					onclick: (e) => ge(t === "key" ? "remove-key" : "remove-token", e.currentTarget),
					children: (e, t) => {
						j();
						var n = c();
						x((e) => r(n, e), [() => q("remove")]), y(e, n);
					},
					$$slots: { default: !0 }
				});
			};
			d(p, (e) => {
				N(n) && e(g);
			}), E(a);
			var _ = A(a, 2), v = (e) => {
				let n = k(() => t === "key" ? "npx freestyle@latest tokens create vibebook" : "claude setup-token");
				var i = ae(), a = P(i), o = w(a, !0), s = A(a, 2), l = C(s), u = w(l, !0), f = A(l);
				h(f, {
					variant: "outline",
					size: "sm",
					onclick: () => void _e(N(n)),
					children: (e, t) => {
						j();
						var n = c();
						x((e) => r(n, e), [() => q("copy")]), y(e, n);
					},
					$$slots: { default: !0 }
				}), E(s);
				var p = A(s, 2), g = C(p), _ = (e) => {
					{
						let t = k(() => q("key"));
						te(e, {
							type: "password",
							get "aria-label"() {
								return N(t);
							},
							autocomplete: "off",
							required: !0,
							get disabled() {
								return N(Y);
							},
							get value() {
								return N(B);
							},
							set value(e) {
								b(B, e, !0);
							}
						});
					}
				}, v = (e) => {
					{
						let t = k(() => q("token"));
						te(e, {
							type: "password",
							get "aria-label"() {
								return N(t);
							},
							autocomplete: "off",
							required: !0,
							get disabled() {
								return N(Y);
							},
							get value() {
								return N(H);
							},
							set value(e) {
								b(H, e, !0);
							}
						});
					}
				};
				d(g, (e) => {
					t === "key" ? e(_) : e(v, -1);
				});
				var S = A(g, 2);
				h(S, {
					type: "submit",
					get disabled() {
						return N(Y);
					},
					children: (e, t) => {
						j();
						var n = c();
						x((e) => r(n, e), [() => q("save")]), y(e, n);
					},
					$$slots: { default: !0 }
				}), E(p);
				var T = A(p, 2), D = w(T, !0);
				x((e, t) => {
					r(o, e), r(u, N(n)), r(D, t);
				}, [() => q(t === "key" ? "keyHelp" : "tokenHelp"), () => q("secretHelp")]), m("submit", p, (e) => {
					e.preventDefault(), he(t === "key" ? "key" : "token");
				}), y(e, i);
			};
			d(_, (e) => {
				N(n) || e(v);
			}), E(i), x((e, t) => {
				r(l, e), r(f, t);
			}, [() => q(t === "key" ? "key" : "token"), () => q(N(n) ? "connected" : "missing")]), y(e, i);
		});
		var l = A(s, 2), u = (e) => {
			var t = J(), n = w(t, !0);
			x(() => r(n, N(U))), y(e, t);
		};
		d(l, (e) => {
			N(U) && e(u);
		});
		var p = A(l, 2), _ = (e) => {
			var t = J(), n = w(t, !0);
			x((e) => r(n, e), [() => q(o().notice === "removed" ? "removed" : "saved")]), y(e, t);
		};
		d(p, (e) => {
			o().notice && e(_);
		});
		var S = A(p, 2), T = (e) => {
			var t = ie(), n = w(t, !0);
			x((e) => r(n, e), [() => q("failed")]), y(e, t);
		};
		d(S, (e) => {
			o().phase === "error" && e(T);
		});
		var D = A(S, 2), O = (e) => {
			var n = se(), i = P(n), a = w(i, !0), o = A(i, 2);
			h(o, {
				variant: "outline",
				onclick: () => {
					t.credentials.review(), t.owner.refresh(!0);
				},
				children: (e, t) => {
					j();
					var n = c();
					x((e) => r(n, e), [() => q("reviewed")]), y(e, n);
				},
				$$slots: { default: !0 }
			}), x((e) => r(a, e), [() => q("unconfirmed")]), y(e, n);
		};
		d(D, (e) => {
			o().phase === "unconfirmed" && e(O);
		});
		var M = A(D, 2);
		a(M, 1, () => n().data.sandboxes, (e) => e.id, (e, i) => {
			var a = ue(), s = C(a), l = C(s), u = C(l), f = w(u), p = A(u, 2), m = w(p), _ = A(p, 2), S = (e) => {
				var t = ce(), n = w(t, !0);
				x((e) => r(n, e), [() => re(N(i).error)]), y(e, t);
			};
			d(_, (e) => {
				N(i).error && e(S);
			}), E(l);
			var T = A(l, 2), D = w(T, !0);
			E(s);
			var O = A(s, 2), M = (e) => {
				var t = le(), a = C(t), o = w(a, !0), s = A(a, 2), c = w(s, !0);
				E(t), x((e, t) => {
					r(o, e), r(c, t);
				}, [() => q("log"), () => re(n().logs[N(i).id] || N(i).log)]), y(e, t);
			};
			d(O, (e) => {
				(n().logs[N(i).id] || !N(i).ready && N(i).log) && e(M);
			});
			var P = A(O, 2), F = C(P), I = (e) => {
				{
					let n = k(() => N(Y) || !o().connected);
					h(e, {
						size: "sm",
						get disabled() {
							return N(n);
						},
						onclick: (e) => t.terminal.open(N(i), e.currentTarget),
						children: (e, t) => {
							j();
							var n = c();
							x((e) => r(n, e), [() => q("terminal")]), y(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			};
			d(F, (e) => {
				N(i).state !== "deleted" && e(I);
			});
			var L = A(F, 2), z = (e) => {
				{
					let n = k(() => N(Y) || !o().connected);
					h(e, {
						variant: "outline",
						size: "sm",
						get disabled() {
							return N(n);
						},
						onclick: () => void t.owner.power(N(i).id, "pause", V(N(i))),
						children: (e, t) => {
							j();
							var n = c();
							x((e) => r(n, e), [() => q("pause")]), y(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			}, B = (e) => {
				{
					let n = k(() => N(Y) || !o().connected);
					h(e, {
						variant: "outline",
						size: "sm",
						get disabled() {
							return N(n);
						},
						onclick: () => void t.owner.power(N(i).id, "start", V(N(i))),
						children: (e, t) => {
							j();
							var n = c();
							x((e) => r(n, e), [() => q("start")]), y(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			};
			d(L, (e) => {
				N(i).state === "running" ? e(z) : (N(i).state === "paused" || N(i).state === "stopped") && e(B, 1);
			});
			var H = A(L, 2), U = (e) => {
				{
					let n = k(() => N(Y) || !o().connected);
					h(e, {
						variant: "outline",
						size: "sm",
						get disabled() {
							return N(n);
						},
						onclick: () => void t.owner.setup(N(i).id, V(N(i))),
						children: (e, t) => {
							j();
							var n = c();
							x((e) => r(n, e), [() => q("setup")]), y(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			};
			d(H, (e) => {
				!N(i).ready && N(i).state === "running" && e(U);
			});
			var G = A(H, 2);
			{
				let e = k(() => N(Y) || !o().connected);
				h(G, {
					variant: "ghost",
					size: "sm",
					get disabled() {
						return N(e);
					},
					onclick: (e) => {
						ee = e.currentTarget, b(W, {
							kind: "sandbox",
							id: N(i).id,
							identity: V(N(i)),
							name: N(i).name ?? q("unnamed")
						}, !0);
					},
					children: (e, t) => {
						j();
						var n = c();
						x((e) => r(n, e), [() => q("remove")]), y(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			E(P), E(a), x((e, t, n, o) => {
				g(a, "data-sandbox-id", N(i).id), r(f, `☁ ${e ?? ""}`), r(m, `${t ?? ""} · ${n ?? ""}/h`), r(D, o);
			}, [
				() => N(i).name ?? q("unnamed"),
				() => R(N(i).state, v()),
				() => new Intl.NumberFormat(v(), {
					style: "currency",
					currency: "USD"
				}).format(N(i).rate),
				() => N(i).cost_unknown ? q("costUnknown") : new Intl.NumberFormat(v(), {
					style: "currency",
					currency: "USD"
				}).format(N(i).cost)
			]), y(e, a);
		}, (e) => {
			var t = de(), n = w(t, !0);
			x((e) => r(n, e), [() => q("empty")]), y(e, t);
		});
		var F = A(M, 2), I = (e) => {
			var t = J(), i = w(t, !0);
			x((e) => r(i, e), [() => q(n().operation === "setup" ? "setupPending" : "pending")]), y(e, t);
		};
		d(F, (e) => {
			(n().phase === "pending" || o().phase === "pending") && e(I);
		});
		var L = A(F, 2), z = (e) => {
			var t = ie(), n = w(t, !0);
			x((e) => r(n, e), [() => q("failed")]), y(e, t);
		};
		d(L, (e) => {
			n().phase === "error" && e(z);
		});
		var G = A(L, 2), K = (e) => {
			var i = fe(), a = P(i), o = w(a, !0), s = A(a, 2), l = (e) => {
				var t = de(), n = w(t, !0);
				x((e) => r(n, e), [() => q("uncertainCreate")]), y(e, t);
			};
			d(s, (e) => {
				n().candidates.length && e(l);
			});
			var u = A(s);
			h(u, {
				variant: "outline",
				onclick: () => {
					t.owner.review(), t.owner.refresh(!0);
				},
				children: (e, t) => {
					j();
					var n = c();
					x((e) => r(n, e), [() => q("reviewed")]), y(e, n);
				},
				$$slots: { default: !0 }
			}), x((e) => r(o, e), [() => q("unconfirmed")]), y(e, i);
		};
		d(G, (e) => {
			n().phase === "unconfirmed" && e(K);
		});
		var ne = A(G, 2);
		{
			let e = k(() => N(Y) || !o().connected || n().data.sandboxes.length >= 3);
			h(ne, {
				get disabled() {
					return N(e);
				},
				onclick: () => {
					N(Y) || t.owner.create();
				},
				children: (e, t) => {
					j();
					var n = c();
					x((e) => r(n, e), [() => q("create")]), y(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var me = A(ne, 2), X = w(me, !0), Z = A(me, 2), Q = w(Z, !0);
		x((e, t) => {
			r(X, e), r(Q, t);
		}, [() => q("costHelp"), () => q(o().connected ? "createLimit" : "keyRequired")]), y(e, i);
	};
	d(Oe, (e) => {
		n().data && e(ke);
	}), E(ye);
	var Ae = A(ye, 2);
	{
		let e = k(() => N(W) !== null), t = k(() => q(N(W)?.kind === "sandbox" ? "removeTitle" : "credentialRemoveTitle")), n = k(() => q(N(W)?.kind === "sandbox" ? "removeBody" : N(W)?.kind === "credential" && N(W).action === "remove-token" ? "removeTokenBody" : "removeKeyBody")), r = k(() => q("remove")), i = k(() => q("cancel")), a = k(() => N(Y) || !Z());
		ne(Ae, {
			get open() {
				return N(e);
			},
			get title() {
				return N(t);
			},
			get description() {
				return N(n);
			},
			get confirmLabel() {
				return N(r);
			},
			get cancelLabel() {
				return N(i);
			},
			get confirmDisabled() {
				return N(a);
			},
			onconfirm: Q,
			onOpenChange: (e) => {
				e || b(W, null);
			},
			returnFocus: () => ee?.isConnected ? ee : null
		});
	}
	x((e) => r(Ce, e), [() => q("description")]), y(e, ve), T(), _();
}
// svelte/features/sandboxes/terminalRenderer.ts
function X(e) {
	let t = e.ownerDocument.defaultView;
	if (!t) throw Error("Terminal document unavailable");
	let n = t.getComputedStyle(e), r = t.getComputedStyle(e, "::selection"), i = W(e.ownerDocument, n.color), a = W(e.ownerDocument, n.backgroundColor);
	return {
		background: a,
		foreground: i,
		cursor: i,
		cursorAccent: a,
		selectionBackground: W(e.ownerDocument, r.backgroundColor)
	};
}
function Z(e) {
	let t = e.ownerDocument.defaultView?.getComputedStyle(e), n = Number.parseFloat(t?.fontSize ?? "");
	if (!t?.fontFamily || !Number.isFinite(n) || n <= 0) throw Error("Terminal typography unavailable");
	return {
		family: t.fontFamily,
		size: n
	};
}
async function he(e, t, n) {
	let r = e.ownerDocument.fonts;
	r && !n.aborted && await new Promise((e) => {
		let i = !1, a = () => {
			i || (i = !0, clearTimeout(o), n.removeEventListener("abort", a), e());
		}, o = setTimeout(a, 5e3);
		n.addEventListener("abort", a, { once: !0 }), r.load(`${t.size}px ${t.family}`, "M").then(a, a);
	});
}
var Q = null;
function ge() {
	return Q ??= Promise.all([import("./xterm-CUdCSw3m.js").then((t) => /* @__PURE__ */ e(t.default, 1)), import("./addon-fit-BVJcafbo.js").then((t) => /* @__PURE__ */ e(t.default, 1))]).then(([e, t]) => ({
		Terminal: e.Terminal,
		FitAddon: t.FitAddon
	})).catch((e) => {
		throw Q = null, e;
	});
}
async function _e(e, t, n) {
	let r = await ge(), i = () => !n.aborted && t.current() && e.isConnected;
	if (!i()) throw Error("cancelled");
	let a = Z(e);
	if (await he(e, a, n), !i()) throw Error("cancelled");
	let o = new r.Terminal({
		cursorBlink: !0,
		disableStdin: !0,
		scrollback: 1e3,
		screenReaderMode: !0,
		fontFamily: a.family,
		fontSize: a.size,
		theme: X(e)
	}), s = !0, c = null, l = null, u = null, d = null, f = null, p = null;
	function m() {
		if (!s) return;
		s = !1, c !== null && cancelAnimationFrame(c), c = null, l?.disconnect(), u?.disconnect(), p && e.ownerDocument.fonts?.removeEventListener("loadingdone", p), d?.dispose(), f?.dispose();
		let t = o.element;
		o.dispose(), t?.remove();
	}
	try {
		let n = new r.FitAddon();
		o.loadAddon(n), o.open(e);
		let h = () => s && i(), g = () => t.semantic({
			theme: X(e),
			fontFamily: o.options.fontFamily ?? a.family,
			fontSize: o.options.fontSize ?? a.size
		}), _ = () => {
			if (!h()) return;
			let t = Z(e);
			o.options.theme = X(e), o.options.fontFamily = t.family, o.options.fontSize = t.size, n.fit(), g();
		}, v = () => {
			h() && c === null && (c = requestAnimationFrame(() => {
				if (c = null, h()) try {
					_();
				} catch {
					t.failed();
				}
			}));
		};
		return l = new ResizeObserver(v), u = new MutationObserver(v), l.observe(e), u.observe(e.ownerDocument.documentElement, {
			attributes: !0,
			attributeFilter: ["class", "data-theme"]
		}), p = v, e.ownerDocument.fonts?.addEventListener("loadingdone", v), d = o.onData((e) => {
			h() && t.data(e);
		}), f = o.onResize(({ cols: e, rows: n }) => {
			h() && t.resize(e, n);
		}), n.fit(), g(), {
			get cols() {
				return o.cols;
			},
			get rows() {
				return o.rows;
			},
			write(e) {
				h() && o.write(e);
			},
			focus() {
				h() && o.focus();
			},
			input(e) {
				h() && (o.options.disableStdin = !e);
			},
			dispose: m
		};
	} catch (e) {
		throw m(), e;
	}
}
// svelte/features/sandboxes/TerminalDialog.svelte
var ve = s("<p role=\"status\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p> <div tabindex=\"-1\" data-native-terminal-renderer=\"\" class=\"tw:min-h-64 tw:flex-1 tw:overflow-hidden tw:bg-background tw:font-mono tw:text-sm tw:text-foreground tw:selection:bg-primary/30\"></div> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div>", 1);
function ye(e, i) {
	S(i, !0);
	let o = () => p(v, "$view", s), [s, d] = u(), m = l(i, "lang", 3, "pt"), v = D(() => i.owner.state), b = (e) => z(m(), e), C = k(() => o().phase === "loading" ? "terminalLoading" : o().phase === "connecting" ? "terminalConnecting" : o().phase === "connected" ? "terminalConnected" : o().phase === "exited" ? "terminalExited" : o().phase === "error" ? "terminalFailed" : "terminalDisconnected"), O = null, M = Object.keys(B);
	function F(e, t) {
		O = e;
		let n = !0, r = e.ownerDocument, a = (t) => {
			t instanceof KeyboardEvent && t.key !== "Tab" || t.target instanceof Node && e.contains(t.target) || (n = !1);
		};
		return r.addEventListener("pointerdown", a, !0), r.addEventListener("keydown", a, !0), i.owner.mount((t, n) => _e(e, t, n), t, () => {
			let t = e.closest("[role=\"dialog\"]");
			return n && !!t && !!r.activeElement && t.contains(r.activeElement);
		}), { destroy() {
			r.removeEventListener("pointerdown", a, !0), r.removeEventListener("keydown", a, !0), O === e && (O = null), i.owner.current(t) && i.owner.close(t);
		} };
	}
	var I = n(), L = P(I);
	t(L, () => o().generation, (e) => {
		let t = k(() => o().generation);
		{
			let n = k(() => `${b("terminal")} · ${o().name ?? b("unnamed")}`), s = k(() => b("terminalHelp")), l = k(() => b("close"));
			q(e, {
				get open() {
					return o().open;
				},
				get title() {
					return N(n);
				},
				get description() {
					return N(s);
				},
				get closeLabel() {
					return N(l);
				},
				fullScreen: !0,
				initialFocus: () => i.owner.current(N(t)) ? O?.querySelector("textarea") ?? O : null,
				onOpenChange: (e) => {
					e || i.owner.close(N(t));
				},
				returnFocus: () => i.owner.returnFocus(N(t)),
				children: (e, n) => {
					var s = ve(), l = P(s), u = w(l, !0), d = A(l, 2);
					_(d, (e, t) => F?.(e, t), () => N(t));
					var p = A(d, 2);
					a(p, 21, () => M, f, (e, n) => {
						{
							let a = k(() => o().phase !== "connected");
							h(e, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return N(a);
								},
								onpointerdown: (e) => {
									e.preventDefault(), e.currentTarget.isConnected && i.owner.current(N(t)) && i.owner.key(N(n), N(t));
								},
								onclick: (e) => {
									e.detail === 0 && e.currentTarget.isConnected && i.owner.current(N(t)) && i.owner.key(N(n), N(t));
								},
								children: (e, t) => {
									j();
									var i = c();
									x(() => r(i, N(n))), y(e, i);
								},
								$$slots: { default: !0 }
							});
						}
					}), E(p), x((e) => {
						r(u, e), g(d, "data-terminal-phase", o().phase), g(d, "data-terminal-font", o().semantic?.fontFamily), g(d, "data-terminal-font-size", o().semantic?.fontSize), g(d, "data-terminal-background", o().semantic?.theme.background), g(d, "data-terminal-foreground", o().semantic?.theme.foreground), g(d, "data-terminal-selection", o().semantic?.theme.selectionBackground);
					}, [() => b(N(C))]), y(e, s);
				},
				$$slots: { default: !0 }
			});
		}
	}), y(e, I), T(), d();
}
// svelte/features/agents/AgentsPane.svelte
var $ = s("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), be = s(" <!>", 1), xe = s("<p role=\"status\"> </p>"), Se = s("<p role=\"status\"> </p> <!>", 1), Ce = s("<span class=\"tw:min-w-0 tw:flex-1 tw:break-words\"> </span><span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), we = s("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div>"), Te = s("<p class=\"tw:text-muted-foreground\"> </p>"), Ee = s("<section><!><!></section>"), De = s("<section data-vb-native=\"\" data-native-agents=\"\" class=\"tw:space-y-5 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div> <!> <div class=\"tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:p-3\"><div class=\"tw:flex tw:items-center tw:gap-3\"><span aria-hidden=\"true\">✻</span> <div class=\"tw:min-w-0 tw:flex-1\"><strong class=\"tw:block\"> </strong><small class=\"tw:block tw:break-words tw:text-muted-foreground\"> <!></small></div> <!> <!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <!></div> <!> <section class=\"tw:space-y-2\"><!> <!> <!><!> <!></section> <!> <!></section> <!>", 1);
function Oe(e, t) {
	S(t, !0);
	let n = () => p(_, "$view", s), i = () => p(O, "$runner", s), [s, f] = u(), m = l(t, "lang", 3, "pt"), _ = D(() => t.owner.state), O = D(() => t.owner.runner.state), R = M(4), z = (e) => U(m(), e), B = k(() => ee(n().data, t.owner.account, n().now)), V = k(() => n().room ? G(n().room, n().now) : []), W = k(() => H(i().where)), te = k(() => ["pending", "unconfirmed"].includes(n().togglePhase));
	function ne(e, n) {
		t.owner.current() && N(V).some((t) => t.message.id === e && t.message.thread === n) && t.onnavigate(e, n);
	}
	var q = De(), re = P(q), J = C(re), ie = C(J);
	F(ie, {
		level: 2,
		class: "tw:m-0 tw:flex-1 tw:font-sans tw:text-lg tw:font-semibold tw:tracking-normal",
		children: (e, t) => {
			j();
			var n = c();
			x((e) => r(n, e), [() => z("title")]), y(e, n);
		},
		$$slots: { default: !0 }
	});
	var ae = A(ie);
	h(ae, {
		variant: "ghost",
		size: "sm",
		get disabled() {
			return n().loading;
		},
		onclick: () => void t.owner.refresh(!0),
		children: (e, t) => {
			j();
			var n = c();
			x((e) => r(n, e), [() => z("retry")]), y(e, n);
		},
		$$slots: { default: !0 }
	}), E(J);
	var oe = A(J, 2), se = (e) => {
		var t = $(), n = w(t, !0);
		x((e) => r(n, e), [() => z("readFailed")]), y(e, t);
	};
	d(oe, (e) => {
		n().readError && e(se);
	});
	var ce = A(oe, 2), le = C(ce), ue = C(le), de = A(ue, 2), fe = C(de), pe = w(fe, !0), me = A(fe), X = C(me, !0), Z = A(X), he = (e) => {
		var t = be(), n = P(t), a = A(n), o = (e) => {
			var t = c();
			x((e) => r(t, `(${e ?? ""})`), [() => z("newFolder")]), y(e, t);
		};
		d(a, (e) => {
			i().where?.how === "new" && e(o);
		}), x(() => r(n, `· ${N(W) ?? ""}`)), y(e, t);
	};
	d(Z, (e) => {
		N(W) && e(he);
	}), E(me), E(de);
	var Q = A(de, 2), ge = (e) => {
		h(e, {
			variant: "outline",
			size: "sm",
			get disabled() {
				return i().focusing;
			},
			onclick: () => {
				t.owner.current() && t.owner.runner.focus(t.owner.roomId);
			},
			children: (e, t) => {
				j();
				var n = c();
				x((e) => r(n, e), [() => z("focus")]), y(e, n);
			},
			$$slots: { default: !0 }
		});
	}, _e = k(() => N(B).on && i().available && i().rooms.includes(t.owner.roomId));
	d(Q, (e) => {
		N(_e) && e(ge);
	});
	var ve = A(Q, 2);
	{
		let e = k(() => N(te) || !n().data), r = k(() => z(N(B).on ? "turnOff" : "turnOn"));
		I(ve, {
			get checked() {
				return N(B).on;
			},
			get disabled() {
				return N(e);
			},
			get "aria-label"() {
				return N(r);
			},
			onchange: () => void t.owner.toggle()
		});
	}
	E(le);
	var Oe = A(le, 2), ke = w(Oe, !0), Ae = A(Oe, 2), je = (e) => {
		var t = $(), n = w(t, !0);
		x((e) => r(n, e), [() => z(i().focusBlocked ? "focusBlocked" : "focusFailed")]), y(e, t);
	};
	d(Ae, (e) => {
		i().focusError && e(je);
	});
	var Me = A(Ae, 2), Ne = (e) => {
		var t = xe(), n = w(t, !0);
		x((e) => r(n, e), [() => z("pending")]), y(e, t);
	}, Pe = (e) => {
		var t = $(), n = w(t, !0);
		x((e) => r(n, e), [() => z("failed")]), y(e, t);
	}, Fe = (e) => {
		var n = Se(), i = P(n), a = w(i, !0), o = A(i, 2);
		h(o, {
			variant: "outline",
			onclick: () => {
				t.owner.reviewToggle(), t.owner.refresh(!0);
			},
			children: (e, t) => {
				j();
				var n = c();
				x((e) => r(n, e), [() => z("reviewed")]), y(e, n);
			},
			$$slots: { default: !0 }
		}), x((e) => r(a, e), [() => z("unconfirmed")]), y(e, n);
	};
	d(Me, (e) => {
		n().togglePhase === "pending" ? e(Ne) : n().togglePhase === "error" ? e(Pe, 1) : n().togglePhase === "unconfirmed" && e(Fe, 2);
	}), E(ce);
	var Ie = A(ce, 2);
	K(Ie, {
		get origin() {
			return t.origin;
		},
		get roomId() {
			return t.owner.roomId;
		},
		get lang() {
			return m();
		},
		waiting: !1,
		get current() {
			return t.owner.current;
		}
	});
	var Le = A(Ie, 2), Re = C(Le);
	F(Re, {
		level: 3,
		class: "tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:tracking-normal",
		children: (e, t) => {
			j();
			var n = c();
			x((e) => r(n, `${e ?? ""} ${(N(V).length || "") ?? ""}`), [() => z("queue")]), y(e, n);
		},
		$$slots: { default: !0 }
	});
	var ze = A(Re, 2);
	a(ze, 17, () => N(V).slice(0, N(R)), (e) => e.message.id, (e, i) => {
		var a = we(), o = C(a);
		{
			let e = k(() => `${n().room?.epics.find((e) => e.id === N(i).message.thread)?.title || z("main")} · ${t.vb.ago(N(i).message.ts)}`);
			h(o, {
				variant: "ghost",
				class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:text-left",
				onclick: () => ne(N(i).message.id, N(i).message.thread),
				get title() {
					return N(e);
				},
				children: (e, t) => {
					var n = Ce(), a = P(n), o = w(a, !0), s = A(a), c = w(s, !0);
					x((e, t) => {
						r(o, e), r(c, t);
					}, [() => N(i).message.text.replace(/\s+/g, " ").slice(0, 120), () => z(N(i).phase === "blocked" ? "blocked" : N(i).phase === "doing" ? "doing" : "queued")]), y(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var s = A(o);
		{
			let e = k(() => ["pending", "unconfirmed"].includes(n().dismissPhase)), r = k(() => z("dismiss"));
			h(s, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return N(e);
				},
				onclick: () => void t.owner.dismiss(N(i).message.id),
				get "aria-label"() {
					return N(r);
				},
				children: (e, t) => {
					j();
					var n = c("×");
					y(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		E(a), y(e, a);
	}, (e) => {
		var t = Te(), n = w(t, !0);
		x((e) => r(n, e), [() => z("queueEmpty")]), y(e, t);
	});
	var Be = A(ze, 2), Ve = (e) => {
		h(e, {
			variant: "ghost",
			size: "sm",
			onclick: () => b(R, N(R) + 20),
			children: (e, t) => {
				j();
				var n = c();
				x((e) => r(n, `${e ?? ""} (${N(V).length - N(R)})`), [() => z("more")]), y(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	d(Be, (e) => {
		N(V).length > N(R) && e(Ve);
	});
	var He = A(Be), Ue = (e) => {
		h(e, {
			variant: "ghost",
			size: "sm",
			onclick: () => b(R, 4),
			children: (e, t) => {
				j();
				var n = c();
				x((e) => r(n, e), [() => z("less")]), y(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	d(He, (e) => {
		N(R) > 4 && e(Ue);
	});
	var We = A(He, 2), Ge = (e) => {
		var t = $(), n = w(t, !0);
		x((e) => r(n, e), [() => z("failed")]), y(e, t);
	}, Ke = (e) => {
		var t = xe(), n = w(t, !0);
		x((e) => r(n, e), [() => z("pending")]), y(e, t);
	}, qe = (e) => {
		var n = Se(), i = P(n), a = w(i, !0), o = A(i, 2);
		h(o, {
			variant: "outline",
			onclick: () => t.owner.reviewDismiss(),
			children: (e, t) => {
				j();
				var n = c();
				x((e) => r(n, e), [() => z("reviewed")]), y(e, n);
			},
			$$slots: { default: !0 }
		}), x((e) => r(a, e), [() => z("unconfirmed")]), y(e, n);
	};
	d(We, (e) => {
		n().dismissPhase === "error" ? e(Ge) : n().dismissPhase === "pending" ? e(Ke, 1) : n().dismissPhase === "unconfirmed" && e(qe, 2);
	}), E(Le);
	var Je = A(Le, 2), Ye = (e) => {
		var n = Ee(), i = C(n);
		F(i, {
			level: 3,
			class: "tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:tracking-normal",
			children: (e, t) => {
				j();
				var n = c();
				x((e) => r(n, e), [() => z("connected")]), y(e, n);
			},
			$$slots: { default: !0 }
		});
		var a = A(i);
		{
			let e = k(() => ({
				agents: N(B).mine,
				sandboxes: []
			})), n = k(() => m() === "en" ? "en-US" : "pt-BR");
			L(a, {
				get presence() {
					return N(e);
				},
				get email() {
					return t.owner.account;
				},
				get t() {
					return t.vb.t;
				},
				get name() {
					return t.name;
				},
				get ago() {
					return t.vb.ago;
				},
				get locale() {
					return N(n);
				}
			});
		}
		E(n), x((e) => g(n, "aria-label", e), [() => z("connected")]), y(e, n);
	};
	d(Je, (e) => {
		N(B).mine.length && e(Ye);
	}), Y(A(Je, 2), {
		get owner() {
			return t.owner.sandboxes;
		},
		get credentials() {
			return t.owner.credentials;
		},
		get terminal() {
			return t.owner.terminal;
		},
		get lang() {
			return m();
		}
	}), E(re), ye(A(re, 2), {
		get owner() {
			return t.owner.terminal;
		},
		get lang() {
			return m();
		}
	}), x((e, t, n, i) => {
		v(ue, 1, o(N(B).live ? "tw:text-success" : N(B).on ? "tw:text-warning" : "tw:text-muted-foreground")), r(pe, e), r(X, t), r(ke, n), g(Le, "aria-label", i);
	}, [
		() => z("local"),
		() => N(B).on ? `${z("on")} · ${z(N(B).live ? "listening" : N(B).around ? "working" : "notListening")}` : z("off"),
		() => z("localHelp"),
		() => z("queue")
	]), y(e, q), T(), f();
}
export { Oe as default };
