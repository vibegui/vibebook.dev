import { A as e, C as t, D as n, E as r, H as i, I as a, J as o, K as s, L as c, N as l, R as u, S as d, T as f, U as p, V as m, Y as h, a as g, c as _, i as v, l as y, m as b, n as x, p as S, q as C, r as w, t as T, u as E, z as D } from "./Card-DslCvQ-8.js";
import { c as O, g as k, h as A, n as j, t as M } from "./api-UCGkob2j.js";
import { G as N, et as P, q as F, tt as I } from "./api-Dv5tb54t.js";
import { A as L, Jt as R, K as z, Kt as B, N as ee, P as V, Q as H, R as U, Tt as W, W as G, ct as K, et as q, k as J, l as Y, m as te, p as ne, r as re, t as X, wt as Z, y as ie } from "./index-client-B2aDKUZc.js";
// shared/nativeAuth.ts
var ae = P({
	page: N([
		"login",
		"access",
		"consent",
		"file-access",
		"connection-error"
	]),
	lang: N(["pt", "en"]),
	autoAccess: F(),
	consentFailure: I(F()),
	connectionFailure: I(N([
		"failed",
		"forbidden",
		"missing",
		"rate",
		"signed-out"
	]))
}), oe = {
	login: "Entrar",
	welcome: "Seus vibebooks e seus amigos te esperando.",
	email: "Seu email",
	send: "Mandar código",
	check: "Confere seu email",
	sent: "Mandamos um código de 6 dígitos para {email}.",
	code: "Código",
	another: "usar outro email",
	google: "Continuar com Google",
	github: "Continuar com GitHub",
	or: "ou com email",
	retry: "Tentar novamente",
	loading: "Carregando…",
	waiting: "Aguardando…",
	network: "Algo deu errado. Tenta de novo.",
	timeout: "Ainda não recebi a confirmação. Confira antes de tentar de novo.",
	invalidEmail: "Email inválido.",
	invalidCode: "Digite o código de 6 dígitos.",
	googleError: "Não deu certo com o Google. Tenta com email.",
	githubError: "Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.",
	missing: "Sala não encontrada",
	missingBody: "O link pode estar errado, ou a sala não existe mais.",
	open: "Abrir o vibebook",
	access: "Peça permissão para entrar no vibebook",
	closed: "Esta sala é fechada. Entre com seu email e peça acesso: quem está nela libera.",
	signinAsk: "Entrar e pedir acesso",
	signed: "Você entrou como {email}. Quem está na sala vê seu pedido e libera.",
	ask: "Pedir acesso",
	asked: "Pedido enviado.",
	askedBody: "Quando liberarem, você recebe um email com o link, e esta página abre a sala.",
	agent: "AI agent reading this? Read {origin}/llms.txt and follow it to set up vibebook, then join this room: {url}",
	connect: "Conectar {name} ao vibebook",
	as: "Conectado como {email}. Ele vai poder:",
	rooms: "Ver as salas em que você está, e só elas",
	read: "Ler as mensagens, o doc e as tarefas",
	post: "Postar nas salas em seu nome, marcado como “agent de você”",
	cant: "Ele não vê sua caixa de email, não convida ninguém sem você pedir e você desconecta quando quiser em vibebook.dev/app.",
	publisher: "Publicado por {domain}.",
	unverified: "Esse app se registrou sozinho: o nome não é verificado.",
	goes: "O acesso vai para {host}.",
	local: "Isso manda o acesso para um app no seu computador. Continue só se você acabou de pedir pra conectar.",
	scope: "Permissões solicitadas",
	allow: "Permitir",
	cancel: "Cancelar",
	other: "Não é você? Entrar com outro email",
	continueLogout: "Continuar e sair",
	logoutCleanup: "Não consegui confirmar a remoção das notificações deste aparelho. Você pode continuar e sair; a limpeza das notificações pode estar incompleta.",
	reviewAgain: "Recarregar para revisar um novo pedido",
	return: "Voltar ao aplicativo",
	consentError: "Não foi possível conectar este aplicativo.",
	consentFailed: "A conexão não foi concluída. Tente novamente para revisar um novo pedido, ou volte ao seu agent e conecte de novo.",
	configError: "Esta página não tem uma configuração válida. Recarregue ou tente abrir o link de novo."
}, se = {
	login: "Sign in",
	welcome: "Your vibebooks and friends are waiting for you.",
	email: "Your email",
	send: "Send code",
	check: "Check your email",
	sent: "We sent a 6-digit code to {email}.",
	code: "Code",
	another: "use another email",
	google: "Continue with Google",
	github: "Continue with GitHub",
	or: "or with email",
	retry: "Try again",
	loading: "Loading…",
	waiting: "Waiting…",
	network: "Something went wrong. Try again.",
	timeout: "We haven't received confirmation yet. Check before trying again.",
	invalidEmail: "Invalid email.",
	invalidCode: "Enter the 6-digit code.",
	googleError: "Google sign-in didn't work. Try email.",
	githubError: "GitHub sign-in didn't work (a verified primary email is required). Try email.",
	missing: "Room not found",
	missingBody: "The link may be wrong, or the room no longer exists.",
	open: "Open vibebook",
	access: "Ask to join this vibebook",
	closed: "This room is closed. Sign in with your email and ask to join: someone in it lets you in.",
	signinAsk: "Sign in and ask to join",
	signed: "You're signed in as {email}. People in the room see your request and let you in.",
	ask: "Ask to join",
	asked: "Request sent.",
	askedBody: "When they let you in, you get an email with the link, and this page opens the room.",
	agent: "AI agent reading this? Read {origin}/llms.txt and follow it to set up vibebook, then join this room: {url}",
	connect: "Connect {name} to vibebook",
	as: "Signed in as {email}. It will be able to:",
	rooms: "See the rooms you're in, and only those",
	read: "Read messages, the doc and tasks",
	post: "Post in rooms for you, labeled as “your agent”",
	cant: "It can't see your email inbox, won't invite anyone unless you ask, and you can disconnect it anytime at vibebook.dev/app.",
	publisher: "Published by {domain}.",
	unverified: "This app registered itself; its name is not verified.",
	goes: "Access goes to {host}.",
	local: "This sends access to an app on your computer. Continue only if you just asked to connect.",
	scope: "Requested permissions",
	allow: "Allow",
	cancel: "Cancel",
	other: "Not you? Sign in with another email",
	continueLogout: "Continue signing out",
	logoutCleanup: "Notification removal on this device is unconfirmed. You can continue signing out; notification cleanup may be incomplete.",
	reviewAgain: "Reload to review a new request",
	return: "Return to the app",
	consentError: "Couldn't connect this app.",
	consentFailed: "The connection was not completed. Retry to review a new request, or return to your agent and connect again.",
	configError: "This page has an invalid configuration. Reload or open the link again."
};
function Q(e, t, n = {}) {
	return (e === "en" ? se[t] : oe[t]).replace(/\{(\w+)\}/g, (e, t) => n[t] ?? "");
}
function ce(e, t) {
	let n = {
		"consent-failed": "consentFailed",
		timeout: "timeout",
		network: "network",
		"invalid-email": "invalidEmail",
		"invalid-code": "invalidCode",
		google: "googleError",
		github: "githubError"
	};
	return Object.hasOwn(n, t) ? Q(e, n[t]) : t;
}
// svelte/features/auth/AuthFrame.svelte
var le = p("<a href=\"/\" class=\"tw:inline-flex tw:rounded-control tw:text-lg tw:font-semibold tw:text-foreground tw:no-underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">vibebook</a> <h1 class=\"tw:m-0 tw:break-words tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\"> </h1> <!>", 1), ue = p("<main data-vb-native=\"auth\" class=\"tw:flex tw:min-h-dvh tw:items-center tw:justify-center tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground\"><div class=\"tw:w-full tw:max-w-md\"><!></div></main>");
function $(t, n) {
	var r = ue();
	e("1mnnkta", (e) => {
		ie(() => {
			ee.title = `${n.title ?? ""} · vibebook`;
		});
	});
	var i = V(r), a = V(i);
	T(a, {
		class: "tw:space-y-5 tw:p-6 tw:sm:p-8",
		children: (e, t) => {
			var r = le(), i = z(U(r), 2), a = G(i, !0), o = z(i, 2);
			l(o, () => n.children), J(() => D(a, n.title)), m(e, r);
		},
		$$slots: { default: !0 }
	}), R(i), R(r), m(t, r);
}
// svelte/features/auth/navigation.ts
function de(e, t) {
	let n = "/app?ui=svelte";
	if (!e.startsWith("/") || e.startsWith("//") || /[\\\u0000-\u0020\u007f]/.test(e)) return n;
	let r = new URL(e, t);
	return r.origin !== new URL(t).origin || r.username || r.password ? n : /^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(r.pathname) ? r.pathname + r.search + r.hash : /^\/(?:app|archived|login|b\/[a-z0-9]+|authorize)$/.test(r.pathname) ? (r.searchParams.set("ui", "svelte"), r.pathname + r.search + r.hash) : n;
}
function fe(e) {
	if (!e) return null;
	try {
		let t = new URL(e);
		return ["http:", "https:"].includes(t.protocol) && !t.username && !t.password ? t.href : null;
	} catch {
		return null;
	}
}
// svelte/features/auth/session.ts
var pe = (e) => e instanceof Error ? e.message : "network";
function me(e, t, n, r, i = A) {
	let a = re({
		context: null,
		phase: "email",
		email: "",
		code: "",
		loading: !1,
		busy: !1,
		error: ""
	}), o = k(i), s = (e) => a.update((t) => ({
		...t,
		loading: !1,
		busy: !1,
		error: pe(e)
	}));
	return {
		state: a,
		load() {
			if (!(!o.active() || X(a).loading || X(a).busy)) return a.update((e) => ({
				...e,
				loading: !0,
				error: ""
			})), o.run((n) => e.login(t, n), (e) => a.update((t) => ({
				...t,
				context: e,
				loading: !1,
				error: e.error ?? ""
			})), s);
		},
		email(e) {
			o.active() && a.update((t) => ({
				...t,
				email: e
			}));
		},
		code(e) {
			o.active() && a.update((t) => ({
				...t,
				code: e.replace(/\D/g, "").slice(0, 6)
			}));
		},
		back() {
			o.active() && (o.cancel(), a.update((e) => ({
				...e,
				phase: "email",
				code: "",
				busy: !1,
				error: ""
			})));
		},
		submit() {
			if (!o.active()) return;
			let t = X(a);
			if (!t.context || t.busy) return;
			let i = t.email.trim().toLowerCase();
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)) s(/* @__PURE__ */ Error("invalid-email"));
			else if (t.phase === "code" && !/^\d{6}$/.test(t.code)) s(/* @__PURE__ */ Error("invalid-code"));
			else return a.update((e) => ({
				...e,
				email: i,
				busy: !0,
				error: ""
			})), t.phase === "email" ? o.run((t) => e.start(i, t), () => a.update((e) => ({
				...e,
				phase: "code",
				code: "",
				busy: !1
			})), s) : o.run((r) => e.verify(i, t.code, de(t.context.next, n), r), (e) => {
				r(de(e.next, n));
			}, s);
		},
		dispose() {
			o.dispose();
		}
	};
}
function he(e, t, n, r, i = A, a) {
	let o = re({
		context: null,
		loading: !1,
		busy: !1,
		error: "",
		signedOut: !1
	}), s = k(i), c = !0, l = !1, u = null, d = () => {
		u !== null && i.cancel(u), u = null;
	}, f = a && /^#f[0-9a-f]{1,64}$/.test(a) ? `/b/${encodeURIComponent(t)}?ui=svelte${a}` : `/b/${encodeURIComponent(t)}?ui=svelte`, p = (e) => {
		let t = e instanceof M && e.status === 401;
		o.update((n) => ({
			...n,
			loading: !1,
			busy: !1,
			error: pe(e),
			signedOut: t
		})), !t && X(o).context?.state === "asked" && m();
	}, m = () => {
		d(), c && (u = i.schedule(() => {
			u = null, g();
		}, 15e3));
	};
	function h() {
		if (!(!c || X(o).loading || X(o).busy || X(o).context?.state !== "ask")) return o.update((e) => ({
			...e,
			busy: !0,
			error: ""
		})), s.run((n) => e.ask(t, n), () => {
			r(f);
		}, p);
	}
	function g() {
		if (!(!c || X(o).loading || X(o).busy)) return d(), o.update((e) => ({
			...e,
			loading: !0,
			error: ""
		})), s.run((n) => e.access(t, n), (e) => {
			o.update((t) => ({
				...t,
				context: e,
				loading: !1,
				signedOut: e.state === "out"
			})), e.state === "member" ? r(f) : e.state === "asked" ? m() : e.state === "ask" && n && !l && (l = !0, h());
		}, p);
	}
	return {
		state: o,
		load: g,
		ask: h,
		dispose() {
			c = !1, d(), s.dispose();
		}
	};
}
function ge(e, t, n = A, r = !1) {
	let i = re({
		context: null,
		loading: !1,
		error: r ? "consent-failed" : "",
		returnTo: null,
		signedOut: !1
	}), a = k(n);
	return {
		state: i,
		load() {
			if (a.active() && !X(i).loading) return i.update((e) => ({
				...e,
				loading: !0,
				error: "",
				returnTo: null,
				signedOut: !1
			})), a.run((n) => e.consent(t, n), (e) => i.update((t) => ({
				...t,
				context: e,
				loading: !1,
				signedOut: !1
			})), (e) => i.update((t) => ({
				...t,
				loading: !1,
				error: pe(e),
				signedOut: e instanceof M && e.status === 401,
				returnTo: e instanceof M ? fe(e.returnTo) : null
			})));
		},
		dispose() {
			a.dispose();
		}
	};
}
// svelte/features/auth/LoginPage.svelte
var _e = p("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ve = p("<a> </a>"), ye = p("<p class=\"tw:m-0 tw:text-center tw:text-muted-foreground\"> </p>"), be = p("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:flex-col tw:gap-2\"><!> <!> <!></div>", 1), xe = p("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p>"), Se = p("<!><!>", 1), Ce = p("<!> <form class=\"tw:space-y-3\"><!> <!> <!></form>", 1), we = p("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-destructive\"> </p>"), Te = p("<!> <!>", 1);
function Ee(e, i) {
	W(i, !0);
	let a = () => b(f, "$view", l), [l, u] = S(), d = te(() => me(i.api, i.search, i.origin, i.navigate)), f = d.state, p = q(null), _ = q(null), C = (e, t) => Q(i.lang, e, t);
	y(() => (d.load(), () => d.dispose())), L(() => {
		let e = a().phase;
		a().context && ne().then(() => {
			Y(e === "email" ? p : _)?.focus();
		});
	});
	let T = K(() => de(a().context?.next ?? "/app", i.origin));
	{
		let l = K(() => a().phase === "email" ? C("login") : C("check"));
		$(e, {
			get title() {
				return Y(l);
			},
			children: (e, l) => {
				var u = Te(), f = U(u), y = (e) => {
					var t = _e(), n = G(t, !0);
					J((e) => D(n, e), [() => C("loading")]), m(e, t);
				}, b = (e) => {
					v(e, {
						onclick: () => d.load(),
						children: (e, t) => {
							B();
							var n = s();
							J((e) => D(n, e), [() => C("retry")]), m(e, n);
						},
						$$slots: { default: !0 }
					});
				}, S = (e) => {
					var i = Ce(), l = U(i), u = (e) => {
						var i = be(), s = U(i), l = G(s, !0), u = z(s, 2), d = V(u), f = (e) => {
							var i = ve(), s = G(i, !0);
							J((e, n, a) => {
								r(i, 1, e), t(i, "href", n), D(s, a);
							}, [
								() => n(g({ variant: "outline" })),
								() => `/auth/google/start?next=${encodeURIComponent(Y(T))}`,
								() => C("google")
							]), o("click", i, (e) => {
								a().busy && e.preventDefault();
							}), m(e, i);
						};
						c(d, (e) => {
							a().context.providers.google && e(f);
						});
						var p = z(d, 2), h = (e) => {
							var i = ve(), s = G(i, !0);
							J((e, n, a) => {
								r(i, 1, e), t(i, "href", n), D(s, a);
							}, [
								() => n(g({ variant: "outline" })),
								() => `/auth/github/start?next=${encodeURIComponent(Y(T))}`,
								() => C("github")
							]), o("click", i, (e) => {
								a().busy && e.preventDefault();
							}), m(e, i);
						};
						c(p, (e) => {
							a().context.providers.github && e(h);
						});
						var _ = z(p, 2), v = (e) => {
							var t = ye(), n = G(t, !0);
							J((e) => D(n, e), [() => C("or")]), m(e, t);
						};
						c(_, (e) => {
							(a().context.providers.google || a().context.providers.github) && e(v);
						}), R(u), J((e) => D(l, e), [() => C("welcome")]), m(e, i);
					}, f = (e) => {
						var t = xe(), n = G(t, !0);
						J((e) => D(n, e), [() => C("sent", { email: a().email })]), m(e, t);
					};
					c(l, (e) => {
						a().phase === "email" ? e(u) : e(f, -1);
					});
					var y = z(l, 2), b = V(y), S = (e) => {
						var t = Se(), n = U(t);
						x(n, {
							for: "auth-email",
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => C("email")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
						var r = z(n);
						w(r, {
							id: "auth-email",
							type: "email",
							autocomplete: "email",
							required: !0,
							get disabled() {
								return a().busy;
							},
							get value() {
								return a().email;
							},
							oninput: (e) => d.email(e.currentTarget.value),
							get ref() {
								return Y(p);
							},
							set ref(e) {
								H(p, e, !0);
							}
						}), m(e, t);
					}, E = (e) => {
						var t = Se(), n = U(t);
						x(n, {
							for: "auth-code",
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => C("code")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
						var r = z(n);
						w(r, {
							id: "auth-code",
							inputmode: "numeric",
							autocomplete: "one-time-code",
							maxlength: 6,
							pattern: "[0-9]6",
							required: !0,
							get disabled() {
								return a().busy;
							},
							get value() {
								return a().code;
							},
							oninput: (e) => {
								d.code(e.currentTarget.value), a().code.length === 6 && d.submit();
							},
							get ref() {
								return Y(_);
							},
							set ref(e) {
								H(_, e, !0);
							}
						}), m(e, t);
					};
					c(b, (e) => {
						a().phase === "email" ? e(S) : e(E, -1);
					});
					var O = z(b, 2);
					v(O, {
						type: "submit",
						class: "tw:w-full",
						get loading() {
							return a().busy;
						},
						children: (e, t) => {
							B();
							var n = s();
							J((e) => D(n, e), [() => a().phase === "email" ? C("send") : C("login")]), m(e, n);
						},
						$$slots: { default: !0 }
					});
					var k = z(O, 2), A = (e) => {
						v(e, {
							variant: "ghost",
							onclick: () => d.back(),
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => C("another")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					c(k, (e) => {
						a().phase === "code" && e(A);
					}), R(y), J(() => t(y, "aria-busy", a().busy)), h("submit", y, (e) => {
						e.preventDefault(), d.submit();
					}), m(e, i);
				};
				c(f, (e) => {
					a().loading ? e(y) : a().context ? e(S, -1) : e(b, 1);
				});
				var E = z(f, 2), O = (e) => {
					var t = we(), n = G(t, !0);
					J((e) => D(n, e), [() => ce(i.lang, a().error)]), m(e, t);
				};
				c(E, (e) => {
					a().error && e(O);
				}), m(e, u);
			},
			$$slots: { default: !0 }
		});
	}
	Z(), u();
}
C(["click"]);
// svelte/features/auth/AccessPage.svelte
var De = p("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Oe = p("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ke = p("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a href=\"/app?ui=svelte\"> </a>", 1), Ae = p("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a> </a>", 1), je = p("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p> <!>", 1), Me = p("<p role=\"status\" class=\"tw:m-0 tw:text-foreground\"> </p> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p>", 1), Ne = p("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!>", 1), Pe = p("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Fe = p("<!> <!> <!> <!>", 1);
function Ie(e, i) {
	W(i, !0);
	let a = () => b(d, "$view", o), [o, l] = S(), u = te(() => he(i.api, i.id, !i.fileId && i.auto, i.navigate, void 0, i.fileId ? `#f${i.fileId}` : void 0)), d = u.state, f = (e, t) => Q(i.lang, e, t), p = K(() => `/b/${encodeURIComponent(i.id)}?ui=svelte${i.fileId ? `#f${i.fileId}` : ""}`), h = K(() => `/login?ui=svelte&next=${encodeURIComponent(i.fileId ? Y(p) : Y(p) + "&pedir=1")}`);
	y(() => (u.load(), () => u.dispose()));
	{
		let o = K(() => a().context?.state === "missing" ? f("missing") : a().context?.title ?? f("access"));
		$(e, {
			get title() {
				return Y(o);
			},
			children: (e, o) => {
				var l = Fe(), d = U(l), _ = (e) => {
					var t = De(), n = G(t, !0);
					J(() => D(n, i.lang === "en" ? "Only room members can open this file. Sign in or ask for room access." : "Só quem está na sala abre este arquivo. Entre ou peça acesso à sala.")), m(e, t);
				};
				c(d, (e) => {
					i.fileId && e(_);
				});
				var y = z(d, 2), b = (e) => {
					var t = Oe(), n = G(t, !0);
					J((e) => D(n, e), [() => f("loading")]), m(e, t);
				}, x = (e) => {
					var t = ke(), i = U(t), a = G(i, !0), o = z(i, 2), s = G(o, !0);
					J((e, t, n) => {
						D(a, e), r(o, 1, t), D(s, n);
					}, [
						() => f("missingBody"),
						() => n(g()),
						() => f("open")
					]), m(e, t);
				}, S = (e) => {
					var i = Ae(), a = U(i), o = G(a, !0), s = z(a, 2), c = G(s, !0);
					J((e, n, i) => {
						D(o, e), r(s, 1, n), t(s, "href", Y(h)), D(c, i);
					}, [
						() => f("closed"),
						() => n(g()),
						() => f("signinAsk")
					]), m(e, i);
				}, C = (e) => {
					var t = je(), n = U(t), r = G(n, !0), i = z(n, 2);
					v(i, {
						get loading() {
							return a().busy;
						},
						onclick: () => u.ask(),
						children: (e, t) => {
							B();
							var n = s();
							J((e) => D(n, e), [() => f("ask")]), m(e, n);
						},
						$$slots: { default: !0 }
					}), J((e) => D(r, e), [() => f("signed", { email: a().context.email ?? "" })]), m(e, t);
				}, w = (e) => {
					var t = Me(), n = U(t), r = G(n), i = z(n, 2), a = G(i, !0);
					J((e, t) => {
						D(r, `✓ ${e ?? ""}`), D(a, t);
					}, [() => f("asked"), () => f("askedBody")]), m(e, t);
				};
				c(y, (e) => {
					a().loading && !a().context ? e(b) : a().context?.state === "missing" ? e(x, 1) : a().context?.state === "out" || a().signedOut ? e(S, 2) : a().context?.state === "ask" ? e(C, 3) : a().context?.state === "asked" && e(w, 4);
				});
				var T = z(y, 2), E = (e) => {
					var t = Ne(), n = U(t), r = G(n, !0), o = z(n, 2), l = (e) => {
						v(e, {
							variant: "outline",
							onclick: () => u.load(),
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => f("retry")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					c(o, (e) => {
						a().context?.state !== "ask" && e(l);
					}), J((e) => D(r, e), [() => ce(i.lang, a().error)]), m(e, t);
				};
				c(T, (e) => {
					a().error && e(E);
				});
				var O = z(T, 2), k = (e) => {
					var t = Pe(), n = G(t, !0);
					J((e) => D(n, e), [() => f("agent", {
						origin: i.origin,
						url: i.origin + Y(p)
					})]), m(e, t);
				};
				c(O, (e) => {
					a().context && a().context.state !== "missing" && e(k);
				}), m(e, l);
			},
			$$slots: { default: !0 }
		});
	}
	Z(), l();
}
// svelte/features/auth/AuthLogoutForm.svelte
var Le = p("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <a class=\"tw:text-link\"> </a>", 1), Re = p("<form method=\"post\" action=\"/auth/logout\"><input type=\"hidden\" name=\"next\"/> <!> <!></form>");
function ze(e, n) {
	W(n, !0);
	let r = E(n, "blocked", 3, !1), i = E(n, "cleanup", 3, async () => (await import("./logout-JIOvCZ-2.js")).cleanupCurrentDevicePush()), a = !0, o = q("idle"), l = (e) => Q(n.lang, e);
	_(() => {
		a = !1;
	});
	async function u(e) {
		let t = e.currentTarget;
		if (!a || !t.isConnected || Y(o) === "idle" && r()) {
			e.preventDefault();
			return;
		}
		if (Y(o) === "ready" || Y(o) === "unconfirmed" || (e.preventDefault(), Y(o) === "pending")) return;
		H(o, "pending"), n.onBegin();
		let s = !1;
		try {
			s = (await i()()).confirmed;
		} catch {}
		a && t.isConnected && (H(o, s ? "ready" : "unconfirmed", !0), s && t.requestSubmit());
	}
	var p = Re(), g = V(p);
	d(g);
	var y = z(g, 2);
	{
		let e = K(() => Y(o) === "pending"), t = K(() => Y(o) === "idle" && r());
		v(y, {
			variant: "link",
			type: "submit",
			get loading() {
				return Y(e);
			},
			get disabled() {
				return Y(t);
			},
			class: "tw:h-auto tw:whitespace-normal tw:p-0 tw:text-left",
			children: (e, t) => {
				B();
				var n = s();
				J((e) => D(n, e), [() => l(Y(o) === "unconfirmed" ? "continueLogout" : "other")]), m(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var b = z(y, 2), x = (e) => {
		var r = Le(), i = U(r), a = G(i, !0), o = z(i, 2), s = G(o, !0);
		J((e, r) => {
			D(a, e), t(o, "href", n.next), D(s, r);
		}, [() => l("logoutCleanup"), () => l("reviewAgain")]), m(e, r);
	};
	c(b, (e) => {
		Y(o) === "unconfirmed" && e(x);
	}), R(p), J(() => {
		t(p, "aria-busy", Y(o) === "pending"), f(g, n.next);
	}), h("submit", p, u), m(e, p), Z();
}
// svelte/features/auth/ConsentPage.svelte
var Be = p("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Ve = p("<p role=\"note\" class=\"tw:m-0 tw:rounded-control tw:border tw:border-warning tw:bg-warning/10 tw:p-3 tw:text-foreground\"> </p>"), He = p("<p class=\"tw:m-0 tw:break-words\"> </p> <ul class=\"tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5\"><li> </li> <li> </li> <li> </li></ul> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p> <!> <form method=\"post\" class=\"tw:flex tw:flex-wrap tw:gap-2\"><input type=\"hidden\" name=\"handle\"/> <!> <!></form> <!> <!>", 1), Ue = p("<a> </a>"), We = p("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!><!>", 1);
function Ge(e, a) {
	W(a, !0);
	let o = () => b(x, "$view", l), [l, u] = S(), p = E(a, "initialFailure", 3, !1), _ = te(() => ge(a.api, a.search, void 0, p())), x = _.state, C = q(!1), w = q(!1), T = (e, t) => Q(a.lang, e, t);
	y(() => (p() || _.load(), () => _.dispose()));
	{
		let l = K(() => o().context ? T("connect", { name: o().context.client_name }) : T("consentError"));
		$(e, {
			get title() {
				return Y(l);
			},
			children: (e, l) => {
				var u = i(), p = U(u), y = (e) => {
					var t = Be(), n = G(t, !0);
					J((e) => D(n, e), [() => T("loading")]), m(e, t);
				}, b = (e) => {
					var n = He(), r = U(n), i = G(r, !0), l = z(r, 2), u = V(l), p = G(u, !0), g = z(u, 2), _ = G(g, !0), y = z(g, 2), b = G(y, !0);
					R(l);
					var x = z(l, 2), S = G(x, !0), E = z(x, 2), O = G(E), k = z(E, 2), A = G(k), j = z(k, 2), M = (e) => {
						var t = Ve(), n = G(t, !0);
						J((e) => D(n, e), [() => T("local")]), m(e, t);
					};
					c(j, (e) => {
						o().context.redirect_is_loopback && e(M);
					});
					var N = z(j, 2), P = V(N);
					d(P);
					var F = z(P, 2);
					{
						let e = K(() => Y(C) || Y(w));
						v(F, {
							type: "submit",
							name: "decision",
							value: "deny",
							variant: "outline",
							get "aria-disabled"() {
								return Y(e);
							},
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => T("cancel")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var I = z(F, 2);
					{
						let e = K(() => Y(C) || Y(w));
						v(I, {
							type: "submit",
							name: "decision",
							value: "approve",
							get "aria-disabled"() {
								return Y(e);
							},
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => T("allow")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					R(N);
					var L = z(N, 2), ee = (e) => {
						var t = Be(), n = G(t, !0);
						J((e) => D(n, e), [() => T("waiting")]), m(e, t);
					};
					c(L, (e) => {
						Y(C) && e(ee);
					});
					var W = z(L, 2);
					{
						let e = K(() => `/authorize${a.search}`);
						ze(W, {
							get next() {
								return Y(e);
							},
							get lang() {
								return a.lang;
							},
							get blocked() {
								return Y(C);
							},
							onBegin: () => {
								H(w, !0);
							}
						});
					}
					J((e, n, r, s, c, l, u, d, m) => {
						D(i, e), D(p, n), D(_, r), D(b, s), D(S, c), D(O, `${l ?? ""}
      ${u ?? ""}`), D(A, `${d ?? ""}: ${m ?? ""}`), t(N, "action", `/authorize${a.search}`), t(N, "aria-busy", Y(C)), f(P, o().context.handle);
					}, [
						() => T("as", { email: o().context.email }),
						() => T("rooms"),
						() => T("read"),
						() => T("post"),
						() => T("cant"),
						() => o().context.client_domain ? T("publisher", { domain: o().context.client_domain }) : T("unverified"),
						() => T("goes", { host: o().context.redirect_host }),
						() => T("scope"),
						() => o().context.scope.join(", ")
					]), h("submit", N, (e) => {
						Y(C) || Y(w) ? e.preventDefault() : H(C, !0);
					}), m(e, n);
				}, x = (e) => {
					var i = We(), l = U(i), u = G(l, !0), d = z(l, 2), f = (e) => {
						var i = Ue(), o = G(i, !0);
						J((e, n, a) => {
							r(i, 1, e), t(i, "href", n), D(o, a);
						}, [
							() => n(g()),
							() => `/login?ui=svelte&next=${encodeURIComponent("/authorize" + a.search)}`,
							() => T("login")
						]), m(e, i);
					}, p = (e) => {
						v(e, {
							variant: "outline",
							onclick: () => _.load(),
							children: (e, t) => {
								B();
								var n = s();
								J((e) => D(n, e), [() => T("retry")]), m(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					c(d, (e) => {
						o().signedOut ? e(f) : e(p, -1);
					});
					var h = z(d), y = (e) => {
						var i = Ue(), a = G(i, !0);
						J((e, n) => {
							r(i, 1, e), t(i, "href", o().returnTo), D(a, n);
						}, [() => n(g({ variant: "ghost" })), () => T("return")]), m(e, i);
					};
					c(h, (e) => {
						o().returnTo && e(y);
					}), J((e) => D(u, e), [() => ce(a.lang, o().error)]), m(e, i);
				};
				c(p, (e) => {
					o().loading ? e(y) : o().context ? e(b, 1) : e(x, -1);
				}), m(e, u);
			},
			$$slots: { default: !0 }
		});
	}
	Z(), u();
}
// svelte/features/auth/ConnectionErrorPage.svelte
var Ke = p("<p role=\"alert\" class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a> </a>", 1);
function qe(e, i) {
	W(i, !0);
	let a = {
		en: {
			title: "Could not sign in to the connection",
			failed: "Sign-in could not be completed. Return to vibebook and try again from Apps.",
			forbidden: "You must be a member of this room to use its connections.",
			missing: "This connection is unavailable or has been removed.",
			rate: "Too many attempts. Wait a minute before trying again.",
			"signed-out": "Your vibebook session has ended. Return to vibebook and sign in before trying again from Apps.",
			back: "Back to vibebook"
		},
		pt: {
			title: "Não deu pra entrar na conexão",
			failed: "Não foi possível concluir o login. Volte ao vibebook e tente novamente pela aba Apps.",
			forbidden: "Você precisa estar nesta sala para usar as conexões dela.",
			missing: "Esta conexão não está disponível ou foi removida.",
			rate: "Muitas tentativas. Espere um minuto antes de tentar novamente.",
			"signed-out": "Sua sessão do vibebook terminou. Volte ao vibebook e entre antes de tentar novamente pela aba Apps.",
			back: "Voltar ao vibebook"
		}
	}, o = K(() => new URL(i.href).pathname.match(/^\/api\/books\/([a-z0-9]{6,40})\/connections\//)?.[1]), s = K(() => Y(o) ? `/b/${Y(o)}?ui=svelte` : "/app?ui=svelte");
	$(e, {
		get title() {
			return a[i.lang].title;
		},
		children: (e, o) => {
			var c = Ke(), l = U(c), u = G(l, !0), d = z(l, 2), f = G(d, !0);
			J((e) => {
				D(u, a[i.lang][i.failure]), r(d, 1, e), t(d, "href", Y(s)), D(f, a[i.lang].back);
			}, [() => n(g())]), m(e, c);
		},
		$$slots: { default: !0 }
	}), Z();
}
// svelte/features/auth/AuthRoot.svelte
var Je = p("<p role=\"alert\"> </p>"), Ye = p("<p> </p>");
function Xe(e, t) {
	W(t, !0);
	let n = E(t, "href", 19, () => location.href), r = E(t, "api", 19, j), o = E(t, "navigate", 3, (e) => location.assign(e)), s = K(() => new URL(n())), l = K(() => O(Y(s), Y(s).origin)), u = K(() => Y(s).pathname.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1]);
	var d = i(), f = U(d);
	a(f, () => t.metadata ? t.metadata.page + Y(s).origin + Y(s).pathname + Y(s).search + Y(s).hash + String(t.metadata.autoAccess) + String(t.metadata.consentFailure) : "invalid", (e) => {
		var n = i(), a = U(n), d = (e) => {
			$(e, {
				title: "vibebook",
				children: (e, t) => {
					var n = Je(), r = G(n, !0);
					J((e) => D(r, e), [() => Q("en", "configError")]), m(e, n);
				},
				$$slots: { default: !0 }
			});
		}, f = (e) => {
			Ee(e, {
				get api() {
					return r();
				},
				get search() {
					return Y(s).search;
				},
				get origin() {
					return Y(s).origin;
				},
				get lang() {
					return t.metadata.lang;
				},
				get navigate() {
					return o();
				}
			});
		}, p = (e) => {
			var n = i(), a = U(n), l = (e) => {
				{
					let n = K(() => /^#f[0-9a-f]{1,64}$/.test(Y(s).hash) ? Y(s).hash.slice(2) : void 0);
					Ie(e, {
						get api() {
							return r();
						},
						get id() {
							return Y(u);
						},
						get fileId() {
							return Y(n);
						},
						get auto() {
							return t.metadata.autoAccess;
						},
						get origin() {
							return Y(s).origin;
						},
						get lang() {
							return t.metadata.lang;
						},
						get navigate() {
							return o();
						}
					});
				}
			}, d = (e) => {
				{
					let n = K(() => Q(t.metadata.lang, "missing"));
					$(e, {
						get title() {
							return Y(n);
						},
						children: (e, n) => {
							var r = Ye(), i = G(r, !0);
							J((e) => D(i, e), [() => Q(t.metadata.lang, "missingBody")]), m(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			};
			c(a, (e) => {
				Y(u) ? e(l) : e(d, -1);
			}), m(e, n);
		}, h = (e) => {
			var n = i(), a = U(n), u = (e) => {
				Ie(e, {
					get api() {
						return r();
					},
					get id() {
						return Y(l).roomId;
					},
					get fileId() {
						return Y(l).id;
					},
					auto: !1,
					get origin() {
						return Y(s).origin;
					},
					get lang() {
						return t.metadata.lang;
					},
					get navigate() {
						return o();
					}
				});
			}, d = (e) => {
				{
					let n = K(() => Q(t.metadata.lang, "missing"));
					$(e, {
						get title() {
							return Y(n);
						},
						children: (e, n) => {
							var r = Ye(), i = G(r, !0);
							J((e) => D(i, e), [() => Q(t.metadata.lang, "missingBody")]), m(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			};
			c(a, (e) => {
				Y(l) ? e(u) : e(d, -1);
			}), m(e, n);
		}, g = (e) => {
			{
				let n = K(() => t.metadata.connectionFailure ?? "failed");
				qe(e, {
					get lang() {
						return t.metadata.lang;
					},
					get failure() {
						return Y(n);
					},
					get href() {
						return Y(s).href;
					}
				});
			}
		}, _ = (e) => {
			{
				let n = K(() => !!t.metadata.consentFailure);
				Ge(e, {
					get api() {
						return r();
					},
					get search() {
						return Y(s).search;
					},
					get lang() {
						return t.metadata.lang;
					},
					get initialFailure() {
						return Y(n);
					}
				});
			}
		};
		c(a, (e) => {
			t.metadata ? t.metadata.page === "login" ? e(f, 1) : t.metadata.page === "access" ? e(p, 2) : t.metadata.page === "file-access" ? e(h, 3) : t.metadata.page === "connection-error" ? e(g, 4) : e(_, -1) : e(d);
		}), m(e, n);
	}), m(e, d), Z();
}
// svelte/features/auth/mount.ts
function Ze(e) {
	let t = e.querySelector("meta[name=\"vb-consent-failure\"]"), n = ae.safeParse({
		...e.querySelector("meta[name=\"vb-connection-failure\"]") ? { connectionFailure: e.querySelector("meta[name=\"vb-connection-failure\"]")?.getAttribute("content") } : {},
		...t ? { consentFailure: t.getAttribute("content") === "1" } : {},
		page: e.querySelector("meta[name=\"vb-page\"]")?.getAttribute("content"),
		lang: e.documentElement.lang.startsWith("en") ? "en" : "pt",
		autoAccess: e.querySelector("meta[name=\"vb-auto-access\"]")?.getAttribute("content") === "1"
	});
	return n.success ? n.data : null;
}
function Qe(e, t) {
	try {
		let n = (t ?? e.defaultView?.localStorage)?.getItem("vb.theme");
		(n === "light" || n === "dark") && (e.documentElement.dataset.theme = n);
	} catch {}
}
function $e(e, t) {
	return Qe(t), u(Xe, {
		target: e,
		props: { metadata: Ze(t) }
	});
}
export { $e as mountAuthPage };
