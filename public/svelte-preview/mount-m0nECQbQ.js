import { A as e, B as t, F as n, G as r, I as i, K as a, L as o, N as s, P as c, S as l, T as u, V as d, W as f, _ as p, a as m, b as h, c as g, j as _, l as v, n as y, q as b, t as x, v as S, x as C, z as w } from "./Button-Cx7HMFHY.js";
import { $ as T, A as E, Et as D, F as O, G as k, P as A, Tt as j, Yt as M, b as N, h as P, i as F, j as I, lt as L, m as ee, q as R, qt as z, t as B, tt as V, u as H, z as U } from "./shared-qe__81Sz.js";
import { d as W, r as G, t as K, u as te } from "./schemas-Dr5xbymo.js";
import { n as ne, t as q } from "./api-BFK8B974.js";
import { t as re } from "./Card-CRyy0OGL.js";
import "./index-client-RnYrC9zI.js";
import { n as J, r as Y } from "./owner-Dk3pdsZz.js";
import { t as ie } from "./Input-D0A_t4bj.js";
import { t as ae } from "./Label-CqFm2dk3.js";
import { o as oe } from "./model-Dxl2uqUd.js";
// shared/nativeAuth.ts
var se = te({
	page: K([
		"login",
		"access",
		"consent",
		"file-access",
		"connection-error"
	]),
	lang: K(["pt", "en"]),
	autoAccess: G(),
	consentFailure: W(G()),
	connectionFailure: W(K([
		"failed",
		"forbidden",
		"missing",
		"rate",
		"signed-out"
	]))
}), ce = {
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
}, le = {
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
function X(e, t, n = {}) {
	return (e === "en" ? le[t] : ce[t]).replace(/\{(\w+)\}/g, (e, t) => n[t] ?? "");
}
function Z(e, t) {
	let n = {
		"consent-failed": "consentFailed",
		timeout: "timeout",
		network: "network",
		"invalid-email": "invalidEmail",
		"invalid-code": "invalidCode",
		google: "googleError",
		github: "githubError"
	};
	return Object.hasOwn(n, t) ? X(e, n[t]) : t;
}
// svelte/features/auth/AuthFrame.svelte
var ue = d("<a href=\"/\" class=\"tw:inline-flex tw:rounded-control tw:text-lg tw:font-semibold tw:text-foreground tw:no-underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">vibebook</a> <h1 class=\"tw:m-0 tw:break-words tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\"> </h1> <!>", 1), de = d("<main data-vb-native=\"auth\" class=\"tw:flex tw:min-h-dvh tw:items-center tw:justify-center tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground\"><div class=\"tw:w-full tw:max-w-md\"><!></div></main>");
function Q(e, t) {
	var r = de();
	u("1mnnkta", (e) => {
		N(() => {
			A.title = `${t.title ?? ""} · vibebook`;
		});
	});
	var i = O(r), a = O(i);
	re(a, {
		class: "tw:space-y-5 tw:p-6 tw:sm:p-8",
		children: (e, r) => {
			var i = ue(), a = R(U(i), 2), s = k(a, !0), c = R(a, 2);
			n(c, () => t.children), E(() => o(s, t.title)), w(e, i);
		},
		$$slots: { default: !0 }
	}), M(i), M(r), w(e, r);
}
// svelte/features/auth/navigation.ts
function $(e, t) {
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
function me(e, t, n, r, i = J) {
	let a = F({
		context: null,
		phase: "email",
		email: "",
		code: "",
		loading: !1,
		busy: !1,
		error: ""
	}), o = Y(i), s = (e) => a.update((t) => ({
		...t,
		loading: !1,
		busy: !1,
		error: pe(e)
	}));
	return {
		state: a,
		load() {
			if (!(!o.active() || B(a).loading || B(a).busy)) return a.update((e) => ({
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
			let t = B(a);
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
			})), s) : o.run((r) => e.verify(i, t.code, $(t.context.next, n), r), (e) => {
				r($(e.next, n));
			}, s);
		},
		dispose() {
			o.dispose();
		}
	};
}
function he(e, t, n, r, i = J, a) {
	let o = F({
		context: null,
		loading: !1,
		busy: !1,
		error: "",
		signedOut: !1
	}), s = Y(i), c = !0, l = !1, u = null, d = () => {
		u !== null && i.cancel(u), u = null;
	}, f = a && /^#f[0-9a-f]{1,64}$/.test(a) ? `/b/${encodeURIComponent(t)}?ui=svelte${a}` : `/b/${encodeURIComponent(t)}?ui=svelte`, p = (e) => {
		let t = e instanceof q && e.status === 401;
		o.update((n) => ({
			...n,
			loading: !1,
			busy: !1,
			error: pe(e),
			signedOut: t
		})), !t && B(o).context?.state === "asked" && m();
	}, m = () => {
		d(), c && (u = i.schedule(() => {
			u = null, g();
		}, 15e3));
	};
	function h() {
		if (!(!c || B(o).loading || B(o).busy || B(o).context?.state !== "ask")) return o.update((e) => ({
			...e,
			busy: !0,
			error: ""
		})), s.run((n) => e.ask(t, n), () => {
			r(f);
		}, p);
	}
	function g() {
		if (!(!c || B(o).loading || B(o).busy)) return d(), o.update((e) => ({
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
function ge(e, t, n = J, r = !1) {
	let i = F({
		context: null,
		loading: !1,
		error: r ? "consent-failed" : "",
		returnTo: null,
		signedOut: !1
	}), a = Y(n);
	return {
		state: i,
		load() {
			if (a.active() && !B(i).loading) return i.update((e) => ({
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
				signedOut: e instanceof q && e.status === 401,
				returnTo: e instanceof q ? fe(e.returnTo) : null
			})));
		},
		dispose() {
			a.dispose();
		}
	};
}
// svelte/features/auth/LoginPage.svelte
var _e = d("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ve = d("<a> </a>"), ye = d("<p class=\"tw:m-0 tw:text-center tw:text-muted-foreground\"> </p>"), be = d("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:flex-col tw:gap-2\"><!> <!> <!></div>", 1), xe = d("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p>"), Se = d("<!><!>", 1), Ce = d("<!> <form class=\"tw:space-y-3\"><!> <!> <!></form>", 1), we = d("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-destructive\"> </p>"), Te = d("<!> <!>", 1);
function Ee(e, t) {
	D(t, !0);
	let n = () => v(u, "$view", r), [r, i] = g(), s = P(() => me(t.api, t.search, t.origin, t.navigate)), u = s.state, d = V(null), p = V(null), m = (e, n) => X(t.lang, e, n);
	c(() => (s.load(), () => s.dispose())), I(() => {
		let e = n().phase;
		n().context && ee().then(() => {
			H(e === "email" ? d : p)?.focus();
		});
	});
	let h = L(() => $(n().context?.next ?? "/app", t.origin));
	{
		let r = L(() => n().phase === "email" ? m("login") : m("check"));
		Q(e, {
			get title() {
				return H(r);
			},
			children: (e, r) => {
				var i = Te(), c = U(i), u = (e) => {
					var t = _e(), n = k(t, !0);
					E((e) => o(n, e), [() => m("loading")]), w(e, t);
				}, g = (e) => {
					x(e, {
						onclick: () => s.load(),
						children: (e, t) => {
							z();
							var n = f();
							E((e) => o(n, e), [() => m("retry")]), w(e, n);
						},
						$$slots: { default: !0 }
					});
				}, v = (e) => {
					var t = Ce(), r = U(t), i = (e) => {
						var t = be(), r = U(t), i = k(r, !0), s = R(r, 2), c = O(s), u = (e) => {
							var t = ve(), r = k(t, !0);
							E((e, n, i) => {
								C(t, 1, e), S(t, "href", n), o(r, i);
							}, [
								() => l(y({ variant: "outline" })),
								() => `/auth/google/start?next=${encodeURIComponent(H(h))}`,
								() => m("google")
							]), a("click", t, (e) => {
								n().busy && e.preventDefault();
							}), w(e, t);
						};
						_(c, (e) => {
							n().context.providers.google && e(u);
						});
						var d = R(c, 2), f = (e) => {
							var t = ve(), r = k(t, !0);
							E((e, n, i) => {
								C(t, 1, e), S(t, "href", n), o(r, i);
							}, [
								() => l(y({ variant: "outline" })),
								() => `/auth/github/start?next=${encodeURIComponent(H(h))}`,
								() => m("github")
							]), a("click", t, (e) => {
								n().busy && e.preventDefault();
							}), w(e, t);
						};
						_(d, (e) => {
							n().context.providers.github && e(f);
						});
						var p = R(d, 2), g = (e) => {
							var t = ye(), n = k(t, !0);
							E((e) => o(n, e), [() => m("or")]), w(e, t);
						};
						_(p, (e) => {
							(n().context.providers.google || n().context.providers.github) && e(g);
						}), M(s), E((e) => o(i, e), [() => m("welcome")]), w(e, t);
					}, c = (e) => {
						var t = xe(), r = k(t, !0);
						E((e) => o(r, e), [() => m("sent", { email: n().email })]), w(e, t);
					};
					_(r, (e) => {
						n().phase === "email" ? e(i) : e(c, -1);
					});
					var u = R(r, 2), g = O(u), v = (e) => {
						var t = Se(), r = U(t);
						ae(r, {
							for: "auth-email",
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => m("email")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
						var i = R(r);
						ie(i, {
							id: "auth-email",
							type: "email",
							autocomplete: "email",
							required: !0,
							get disabled() {
								return n().busy;
							},
							get value() {
								return n().email;
							},
							oninput: (e) => s.email(e.currentTarget.value),
							get ref() {
								return H(d);
							},
							set ref(e) {
								T(d, e, !0);
							}
						}), w(e, t);
					}, D = (e) => {
						var t = Se(), r = U(t);
						ae(r, {
							for: "auth-code",
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => m("code")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
						var i = R(r);
						ie(i, {
							id: "auth-code",
							inputmode: "numeric",
							autocomplete: "one-time-code",
							maxlength: 6,
							pattern: "[0-9]6",
							required: !0,
							get disabled() {
								return n().busy;
							},
							get value() {
								return n().code;
							},
							oninput: (e) => {
								s.code(e.currentTarget.value), n().code.length === 6 && s.submit();
							},
							get ref() {
								return H(p);
							},
							set ref(e) {
								T(p, e, !0);
							}
						}), w(e, t);
					};
					_(g, (e) => {
						n().phase === "email" ? e(v) : e(D, -1);
					});
					var A = R(g, 2);
					x(A, {
						type: "submit",
						class: "tw:w-full",
						get loading() {
							return n().busy;
						},
						children: (e, t) => {
							z();
							var r = f();
							E((e) => o(r, e), [() => n().phase === "email" ? m("send") : m("login")]), w(e, r);
						},
						$$slots: { default: !0 }
					});
					var j = R(A, 2), N = (e) => {
						x(e, {
							variant: "ghost",
							onclick: () => s.back(),
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => m("another")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					_(j, (e) => {
						n().phase === "code" && e(N);
					}), M(u), E(() => S(u, "aria-busy", n().busy)), b("submit", u, (e) => {
						e.preventDefault(), s.submit();
					}), w(e, t);
				};
				_(c, (e) => {
					n().loading ? e(u) : n().context ? e(v, -1) : e(g, 1);
				});
				var D = R(c, 2), A = (e) => {
					var r = we(), i = k(r, !0);
					E((e) => o(i, e), [() => Z(t.lang, n().error)]), w(e, r);
				};
				_(D, (e) => {
					n().error && e(A);
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	j(), i();
}
r(["click"]);
// svelte/features/auth/AccessPage.svelte
var De = d("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Oe = d("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ke = d("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a href=\"/app?ui=svelte\"> </a>", 1), Ae = d("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a> </a>", 1), je = d("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p> <!>", 1), Me = d("<p role=\"status\" class=\"tw:m-0 tw:text-foreground\"> </p> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p>", 1), Ne = d("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!>", 1), Pe = d("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Fe = d("<!> <!> <!> <!>", 1);
function Ie(e, t) {
	D(t, !0);
	let n = () => v(s, "$view", r), [r, i] = g(), a = P(() => he(t.api, t.id, !t.fileId && t.auto, t.navigate, void 0, t.fileId ? `#f${t.fileId}` : void 0)), s = a.state, u = (e, n) => X(t.lang, e, n), d = L(() => `/b/${encodeURIComponent(t.id)}?ui=svelte${t.fileId ? `#f${t.fileId}` : ""}`), p = L(() => `/login?ui=svelte&next=${encodeURIComponent(t.fileId ? H(d) : H(d) + "&pedir=1")}`);
	c(() => (a.load(), () => a.dispose()));
	{
		let r = L(() => n().context?.state === "missing" ? u("missing") : n().context?.title ?? u("access"));
		Q(e, {
			get title() {
				return H(r);
			},
			children: (e, r) => {
				var i = Fe(), s = U(i), c = (e) => {
					var n = De(), r = k(n, !0);
					E(() => o(r, t.lang === "en" ? "Only room members can open this file. Sign in or ask for room access." : "Só quem está na sala abre este arquivo. Entre ou peça acesso à sala.")), w(e, n);
				};
				_(s, (e) => {
					t.fileId && e(c);
				});
				var m = R(s, 2), h = (e) => {
					var t = Oe(), n = k(t, !0);
					E((e) => o(n, e), [() => u("loading")]), w(e, t);
				}, g = (e) => {
					var t = ke(), n = U(t), r = k(n, !0), i = R(n, 2), a = k(i, !0);
					E((e, t, n) => {
						o(r, e), C(i, 1, t), o(a, n);
					}, [
						() => u("missingBody"),
						() => l(y()),
						() => u("open")
					]), w(e, t);
				}, v = (e) => {
					var t = Ae(), n = U(t), r = k(n, !0), i = R(n, 2), a = k(i, !0);
					E((e, t, n) => {
						o(r, e), C(i, 1, t), S(i, "href", H(p)), o(a, n);
					}, [
						() => u("closed"),
						() => l(y()),
						() => u("signinAsk")
					]), w(e, t);
				}, b = (e) => {
					var t = je(), r = U(t), i = k(r, !0), s = R(r, 2);
					x(s, {
						get loading() {
							return n().busy;
						},
						onclick: () => a.ask(),
						children: (e, t) => {
							z();
							var n = f();
							E((e) => o(n, e), [() => u("ask")]), w(e, n);
						},
						$$slots: { default: !0 }
					}), E((e) => o(i, e), [() => u("signed", { email: n().context.email ?? "" })]), w(e, t);
				}, T = (e) => {
					var t = Me(), n = U(t), r = k(n), i = R(n, 2), a = k(i, !0);
					E((e, t) => {
						o(r, `✓ ${e ?? ""}`), o(a, t);
					}, [() => u("asked"), () => u("askedBody")]), w(e, t);
				};
				_(m, (e) => {
					n().loading && !n().context ? e(h) : n().context?.state === "missing" ? e(g, 1) : n().context?.state === "out" || n().signedOut ? e(v, 2) : n().context?.state === "ask" ? e(b, 3) : n().context?.state === "asked" && e(T, 4);
				});
				var D = R(m, 2), O = (e) => {
					var r = Ne(), i = U(r), s = k(i, !0), c = R(i, 2), l = (e) => {
						x(e, {
							variant: "outline",
							onclick: () => a.load(),
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => u("retry")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					_(c, (e) => {
						n().context?.state !== "ask" && e(l);
					}), E((e) => o(s, e), [() => Z(t.lang, n().error)]), w(e, r);
				};
				_(D, (e) => {
					n().error && e(O);
				});
				var A = R(D, 2), j = (e) => {
					var n = Pe(), r = k(n, !0);
					E((e) => o(r, e), [() => u("agent", {
						origin: t.origin,
						url: t.origin + H(d)
					})]), w(e, n);
				};
				_(A, (e) => {
					n().context && n().context.state !== "missing" && e(j);
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	j(), i();
}
// svelte/features/auth/AuthLogoutForm.svelte
var Le = d("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <a class=\"tw:text-link\"> </a>", 1), Re = d("<form method=\"post\" action=\"/auth/logout\"><input type=\"hidden\" name=\"next\"/> <!> <!></form>");
function ze(e, t) {
	D(t, !0);
	let n = m(t, "blocked", 3, !1), r = m(t, "cleanup", 3, async () => (await import("./logout-TiR6R2_j.js")).cleanupCurrentDevicePush()), i = !0, a = V("idle"), c = (e) => X(t.lang, e);
	s(() => {
		i = !1;
	});
	async function l(e) {
		let o = e.currentTarget;
		if (!i || !o.isConnected || H(a) === "idle" && n()) {
			e.preventDefault();
			return;
		}
		if (H(a) === "ready" || H(a) === "unconfirmed" || (e.preventDefault(), H(a) === "pending")) return;
		T(a, "pending"), t.onBegin();
		let s = !1;
		try {
			s = (await r()()).confirmed;
		} catch {}
		i && o.isConnected && (T(a, s ? "ready" : "unconfirmed", !0), s && o.requestSubmit());
	}
	var u = Re(), d = O(u);
	p(d);
	var g = R(d, 2);
	{
		let e = L(() => H(a) === "pending"), t = L(() => H(a) === "idle" && n());
		x(g, {
			variant: "link",
			type: "submit",
			get loading() {
				return H(e);
			},
			get disabled() {
				return H(t);
			},
			class: "tw:h-auto tw:whitespace-normal tw:p-0 tw:text-left",
			children: (e, t) => {
				z();
				var n = f();
				E((e) => o(n, e), [() => c(H(a) === "unconfirmed" ? "continueLogout" : "other")]), w(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var v = R(g, 2), y = (e) => {
		var n = Le(), r = U(n), i = k(r, !0), a = R(r, 2), s = k(a, !0);
		E((e, n) => {
			o(i, e), S(a, "href", t.next), o(s, n);
		}, [() => c("logoutCleanup"), () => c("reviewAgain")]), w(e, n);
	};
	_(v, (e) => {
		H(a) === "unconfirmed" && e(y);
	}), M(u), E(() => {
		S(u, "aria-busy", H(a) === "pending"), h(d, t.next);
	}), b("submit", u, l), w(e, u), j();
}
// svelte/features/auth/ConsentPage.svelte
var Be = d("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Ve = d("<p role=\"note\" class=\"tw:m-0 tw:rounded-control tw:border tw:border-warning tw:bg-warning/10 tw:p-3 tw:text-foreground\"> </p>"), He = d("<p class=\"tw:m-0 tw:break-words\"> </p> <ul class=\"tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5\"><li> </li> <li> </li> <li> </li></ul> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p> <!> <form method=\"post\" class=\"tw:flex tw:flex-wrap tw:gap-2\"><input type=\"hidden\" name=\"handle\"/> <!> <!></form> <!> <!>", 1), Ue = d("<a> </a>"), We = d("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!><!>", 1);
function Ge(e, n) {
	D(n, !0);
	let r = () => v(d, "$view", i), [i, a] = g(), s = m(n, "initialFailure", 3, !1), u = P(() => ge(n.api, n.search, void 0, s())), d = u.state, A = V(!1), N = V(!1), F = (e, t) => X(n.lang, e, t);
	c(() => (s() || u.load(), () => u.dispose()));
	{
		let i = L(() => r().context ? F("connect", { name: r().context.client_name }) : F("consentError"));
		Q(e, {
			get title() {
				return H(i);
			},
			children: (e, i) => {
				var a = t(), s = U(a), c = (e) => {
					var t = Be(), n = k(t, !0);
					E((e) => o(n, e), [() => F("loading")]), w(e, t);
				}, d = (e) => {
					var t = He(), i = U(t), a = k(i, !0), s = R(i, 2), c = O(s), l = k(c, !0), u = R(c, 2), d = k(u, !0), m = R(u, 2), g = k(m, !0);
					M(s);
					var v = R(s, 2), y = k(v, !0), C = R(v, 2), D = k(C), j = R(C, 2), P = k(j), I = R(j, 2), ee = (e) => {
						var t = Ve(), n = k(t, !0);
						E((e) => o(n, e), [() => F("local")]), w(e, t);
					};
					_(I, (e) => {
						r().context.redirect_is_loopback && e(ee);
					});
					var B = R(I, 2), V = O(B);
					p(V);
					var W = R(V, 2);
					{
						let e = L(() => H(A) || H(N));
						x(W, {
							type: "submit",
							name: "decision",
							value: "deny",
							variant: "outline",
							get "aria-disabled"() {
								return H(e);
							},
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => F("cancel")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var G = R(W, 2);
					{
						let e = L(() => H(A) || H(N));
						x(G, {
							type: "submit",
							name: "decision",
							value: "approve",
							get "aria-disabled"() {
								return H(e);
							},
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => F("allow")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					M(B);
					var K = R(B, 2), te = (e) => {
						var t = Be(), n = k(t, !0);
						E((e) => o(n, e), [() => F("waiting")]), w(e, t);
					};
					_(K, (e) => {
						H(A) && e(te);
					});
					var ne = R(K, 2);
					{
						let e = L(() => `/authorize${n.search}`);
						ze(ne, {
							get next() {
								return H(e);
							},
							get lang() {
								return n.lang;
							},
							get blocked() {
								return H(A);
							},
							onBegin: () => {
								T(N, !0);
							}
						});
					}
					E((e, t, i, s, c, u, f, p, m) => {
						o(a, e), o(l, t), o(d, i), o(g, s), o(y, c), o(D, `${u ?? ""}
      ${f ?? ""}`), o(P, `${p ?? ""}: ${m ?? ""}`), S(B, "action", `/authorize${n.search}`), S(B, "aria-busy", H(A)), h(V, r().context.handle);
					}, [
						() => F("as", { email: r().context.email }),
						() => F("rooms"),
						() => F("read"),
						() => F("post"),
						() => F("cant"),
						() => r().context.client_domain ? F("publisher", { domain: r().context.client_domain }) : F("unverified"),
						() => F("goes", { host: r().context.redirect_host }),
						() => F("scope"),
						() => r().context.scope.join(", ")
					]), b("submit", B, (e) => {
						H(A) || H(N) ? e.preventDefault() : T(A, !0);
					}), w(e, t);
				}, m = (e) => {
					var t = We(), i = U(t), a = k(i, !0), s = R(i, 2), c = (e) => {
						var t = Ue(), r = k(t, !0);
						E((e, n, i) => {
							C(t, 1, e), S(t, "href", n), o(r, i);
						}, [
							() => l(y()),
							() => `/login?ui=svelte&next=${encodeURIComponent("/authorize" + n.search)}`,
							() => F("login")
						]), w(e, t);
					}, d = (e) => {
						x(e, {
							variant: "outline",
							onclick: () => u.load(),
							children: (e, t) => {
								z();
								var n = f();
								E((e) => o(n, e), [() => F("retry")]), w(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					_(s, (e) => {
						r().signedOut ? e(c) : e(d, -1);
					});
					var p = R(s), m = (e) => {
						var t = Ue(), n = k(t, !0);
						E((e, i) => {
							C(t, 1, e), S(t, "href", r().returnTo), o(n, i);
						}, [() => l(y({ variant: "ghost" })), () => F("return")]), w(e, t);
					};
					_(p, (e) => {
						r().returnTo && e(m);
					}), E((e) => o(a, e), [() => Z(n.lang, r().error)]), w(e, t);
				};
				_(s, (e) => {
					r().loading ? e(c) : r().context ? e(d, 1) : e(m, -1);
				}), w(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	j(), a();
}
// svelte/features/auth/ConnectionErrorPage.svelte
var Ke = d("<p role=\"alert\" class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a> </a>", 1);
function qe(e, t) {
	D(t, !0);
	let n = {
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
	}, r = L(() => new URL(t.href).pathname.match(/^\/api\/books\/([a-z0-9]{6,40})\/connections\//)?.[1]), i = L(() => H(r) ? `/b/${H(r)}?ui=svelte` : "/app?ui=svelte");
	Q(e, {
		get title() {
			return n[t.lang].title;
		},
		children: (e, r) => {
			var a = Ke(), s = U(a), c = k(s, !0), u = R(s, 2), d = k(u, !0);
			E((e) => {
				o(c, n[t.lang][t.failure]), C(u, 1, e), S(u, "href", H(i)), o(d, n[t.lang].back);
			}, [() => l(y())]), w(e, a);
		},
		$$slots: { default: !0 }
	}), j();
}
// svelte/features/auth/AuthRoot.svelte
var Je = d("<p role=\"alert\"> </p>"), Ye = d("<p> </p>");
function Xe(n, r) {
	D(r, !0);
	let i = m(r, "href", 19, () => location.href), a = m(r, "api", 19, ne), s = m(r, "navigate", 3, (e) => location.assign(e)), c = L(() => new URL(i())), l = L(() => oe(H(c), H(c).origin)), u = L(() => H(c).pathname.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1]);
	var d = t(), f = U(d);
	e(f, () => r.metadata ? r.metadata.page + H(c).origin + H(c).pathname + H(c).search + H(c).hash + String(r.metadata.autoAccess) + String(r.metadata.consentFailure) : "invalid", (e) => {
		var n = t(), i = U(n), d = (e) => {
			Q(e, {
				title: "vibebook",
				children: (e, t) => {
					var n = Je(), r = k(n, !0);
					E((e) => o(r, e), [() => X("en", "configError")]), w(e, n);
				},
				$$slots: { default: !0 }
			});
		}, f = (e) => {
			Ee(e, {
				get api() {
					return a();
				},
				get search() {
					return H(c).search;
				},
				get origin() {
					return H(c).origin;
				},
				get lang() {
					return r.metadata.lang;
				},
				get navigate() {
					return s();
				}
			});
		}, p = (e) => {
			var n = t(), i = U(n), l = (e) => {
				{
					let t = L(() => /^#f[0-9a-f]{1,64}$/.test(H(c).hash) ? H(c).hash.slice(2) : void 0);
					Ie(e, {
						get api() {
							return a();
						},
						get id() {
							return H(u);
						},
						get fileId() {
							return H(t);
						},
						get auto() {
							return r.metadata.autoAccess;
						},
						get origin() {
							return H(c).origin;
						},
						get lang() {
							return r.metadata.lang;
						},
						get navigate() {
							return s();
						}
					});
				}
			}, d = (e) => {
				{
					let t = L(() => X(r.metadata.lang, "missing"));
					Q(e, {
						get title() {
							return H(t);
						},
						children: (e, t) => {
							var n = Ye(), i = k(n, !0);
							E((e) => o(i, e), [() => X(r.metadata.lang, "missingBody")]), w(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			};
			_(i, (e) => {
				H(u) ? e(l) : e(d, -1);
			}), w(e, n);
		}, m = (e) => {
			var n = t(), i = U(n), u = (e) => {
				Ie(e, {
					get api() {
						return a();
					},
					get id() {
						return H(l).roomId;
					},
					get fileId() {
						return H(l).id;
					},
					auto: !1,
					get origin() {
						return H(c).origin;
					},
					get lang() {
						return r.metadata.lang;
					},
					get navigate() {
						return s();
					}
				});
			}, d = (e) => {
				{
					let t = L(() => X(r.metadata.lang, "missing"));
					Q(e, {
						get title() {
							return H(t);
						},
						children: (e, t) => {
							var n = Ye(), i = k(n, !0);
							E((e) => o(i, e), [() => X(r.metadata.lang, "missingBody")]), w(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			};
			_(i, (e) => {
				H(l) ? e(u) : e(d, -1);
			}), w(e, n);
		}, h = (e) => {
			{
				let t = L(() => r.metadata.connectionFailure ?? "failed");
				qe(e, {
					get lang() {
						return r.metadata.lang;
					},
					get failure() {
						return H(t);
					},
					get href() {
						return H(c).href;
					}
				});
			}
		}, g = (e) => {
			{
				let t = L(() => !!r.metadata.consentFailure);
				Ge(e, {
					get api() {
						return a();
					},
					get search() {
						return H(c).search;
					},
					get lang() {
						return r.metadata.lang;
					},
					get initialFailure() {
						return H(t);
					}
				});
			}
		};
		_(i, (e) => {
			r.metadata ? r.metadata.page === "login" ? e(f, 1) : r.metadata.page === "access" ? e(p, 2) : r.metadata.page === "file-access" ? e(m, 3) : r.metadata.page === "connection-error" ? e(h, 4) : e(g, -1) : e(d);
		}), w(e, n);
	}), w(n, d), j();
}
// svelte/features/auth/mount.ts
function Ze(e) {
	let t = e.querySelector("meta[name=\"vb-consent-failure\"]"), n = se.safeParse({
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
	return Qe(t), i(Xe, {
		target: e,
		props: { metadata: Ze(t) }
	});
}
export { $e as mountAuthPage };
