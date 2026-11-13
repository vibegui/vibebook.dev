import { a as e, c as t, d as n, f as r, i, l as a, o, r as s, s as c, t as l, u } from "./main-CYHfRrke.js";
import { p as d } from "./Field-BhEsD9uL.js";
// svelte/navigation.ts
function ee(e, t, n) {
	let i = (e) => e == null ? e : r(e, t(), n);
	return {
		pushState(t, n, r) {
			e.pushState(t, n, i(r));
		},
		replaceState(t, n, r) {
			e.replaceState(t, n, i(r));
		}
	};
}
// svelte/legacy/boardLayout.ts
function te(e) {
	return e.querySelector(":scope > .chat > #kanban, :scope > .doc > #kanban");
}
function ne(e, t, n = null) {
	let r = te(e);
	if (!r || !t || r.parentElement === t) return;
	let i = e.ownerDocument.activeElement, a = i instanceof HTMLElement && r.contains(i) ? i : null;
	t.insertBefore(r, n?.parentNode === t ? n : null), a?.focus({ preventScroll: !0 });
}
function re(e, t, n) {
	let r = !1, i = () => {
		!r && e.isConnected && !t.matches && e.classList.contains("boardview") && n();
	};
	return t.addEventListener("change", i), () => {
		r || (r = !0, t.removeEventListener("change", i));
	};
}
// svelte/roomConnection.ts
var ie = 1e4;
function ae(e) {
	let t = e.schedule ?? setTimeout, r = e.cancel ?? clearTimeout, i = e.createSocket ?? ((e) => new WebSocket(e)), a = null, o, s, c = !1, l = !1, d = 0, ee = "", te = /* @__PURE__ */ new Map(), ne = Math.random().toString(36).slice(2, 8), re = 0, ae = (e, t) => {
		let n = te.get(e);
		n && (te.delete(e), r(n.timer), n.done(t));
	}, f = (e) => {
		for (let t of [...te.keys()]) ae(t, {
			ok: !1,
			error: e
		});
	}, p = () => {
		o !== void 0 && r(o), s !== void 0 && r(s), o = s = void 0;
	}, m = () => {
		c = !0, p(), f("disconnected");
		let e = a;
		a = null, e && (e.onopen = e.onmessage = e.onclose = null, e.close());
	}, oe = () => {
		if (c) return;
		o = void 0;
		let n = i(e.url(ee));
		a = n;
		let r = () => !c && a === n;
		n.onopen = () => {
			r() && (s = t(() => {
				r() && (s = void 0, n.readyState === 1 && (d = 0));
			}, 15e3));
		}, n.onmessage = (t) => {
			if (!r()) return;
			let n = u(t.data);
			n.t === "result" ? ae(n.cid, n.ok ? { ok: !0 } : {
				ok: !1,
				error: n.error
			}) : (n.t === "state" && (l = !0), e.onEvent(n));
		}, n.onclose = (i) => {
			r() && (a = null, p(), f("disconnected"), n.onopen = n.onmessage = n.onclose = null, i.code === 4003 ? (m(), e.onRemoved()) : !l && i.code !== 1e3 ? (m(), e.onUnavailable()) : (ee = String(i.code || ""), o = t(oe, Math.min(3e4, 1e3 * 2 ** d++))));
		};
	};
	return {
		start() {
			!a && o === void 0 && !c && oe();
		},
		dispose: m,
		send(e) {
			return n(a, e);
		},
		request(e, r = ie) {
			let i = `${ne}-${++re}`;
			return new Promise((o) => {
				if (!n(a, e, i)) return o({
					ok: !1,
					error: "offline"
				});
				te.set(i, {
					done: o,
					timer: t(() => ae(i, {
						ok: !1,
						error: "timeout"
					}), r)
				});
			});
		},
		resync() {
			a?.close();
		}
	};
}
// svelte/legacy/host.js
var f = ee(history, () => location.href, "svelte"), p = document.cookie.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] || (/^pt/i.test(navigator.language) ? "pt" : /^en/i.test(navigator.language) ? "en" : "pt");
document.documentElement.lang = p === "en" ? "en" : "pt-BR";
var m = p === "en" ? "en-US" : "pt-BR", oe = {
	"Não deu pra enviar agora. Tente de novo.": "Couldn't send it now. Try again.",
	"Use um link http ou https válido.": "Enter a valid http or https link.",
	"Sem conexão. Seu rascunho foi mantido.": "Offline. Your draft has been kept.",
	"Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.": "Still unconfirmed. Check the pinned items before trying again.",
	"Não deu pra atualizar os fixados. Tente de novo.": "Couldn't update pinned items. Try again.",
	"Aguardando confirmação…": "Waiting for confirmation…",
	"Link inválido": "Invalid link",
	"Arquivo indisponível": "File unavailable",
	"App indisponível": "App unavailable",
	"Item indisponível": "Item unavailable",
	"Este link já está nos fixados.": "This link is already pinned.",
	"Carregando arquivo…": "Loading file…",
	"Carregar arquivo": "Load file",
	"Tentar carregar novamente": "Try loading again",
	"Não deu pra resolver agora. Tente de novo.": "Couldn't resolve this request. Try again.",
	"Dono: {who}": "Owner: {who}",
	"clique pra trocar": "click to change",
	"Sem dono · clique pra escolher": "No owner · click to pick one",
	"Dono do épico": "Epic owner",
	"Ordem dos épicos atualizada.": "Epic order updated.",
	"Abrir galho": "Expand branch",
	"Fechar galho": "Collapse branch",
	"Subépico de {title}": "Sub-epic of {title}",
	"Trabalho em um subépico": "Work in a sub-epic",
	"Ações do épico": "Epic actions",
	"Mover para cima": "Move up",
	"Mover para baixo": "Move down",
	"Sem dono": "No owner",
	"app da sala": "room app",
	arquivo: "file",
	"Não deu pra abrir agora. Tente de novo.": "Couldn't open it now. Try again.",
	"Buscando a mensagem…": "Finding the message…",
	"Não achei essa mensagem nesta sala.": "Couldn't find that message in this room.",
	"Copiar link": "Copy link",
	"Copiar o link desta mensagem": "Copy a link to this message",
	"Link copiado": "Link copied",
	"Caixa de entrada": "Inbox",
	"Caixa de entrada: o que espera por você": "Inbox: what's waiting on you",
	"Esta sala": "This room",
	Todas: "All",
	"Seu agent espera você:": "Your agent is waiting on you:",
	"Nada esperando você. ✓": "Nothing waiting on you. ✓",
	"Nada esperando você nesta sala. ✓": "Nothing waiting on you in this room. ✓",
	"Buscar emoji…": "Search emoji…",
	Emoji: "Emoji",
	"Não consegui abrir este arquivo.": "Couldn't open this file.",
	Desafixar: "Unpin",
	"Desafixar {name}": "Unpin {name}",
	Fixados: "Pinned",
	"Fixar um link": "Pin a link",
	"Cole um link (site, repo, painel…)": "Paste a link (site, repo, dashboard…)",
	"Link pra fixar": "Link to pin",
	"Nome (opcional)": "Name (optional)",
	Nome: "Name",
	Fixar: "Pin",
	"Fixar site, repo ou app": "Pin a site, repo or app",
	"Fixar na lateral": "Pin to the sidebar",
	"{n} issues dos agents": "{n} issues from agents",
	"Issue de um agent": "Issue from an agent",
	"foi pro terminal": "went to the terminal",
	"Aprovado por {who}": "Approved by {who}",
	"Negado por {who}": "Denied by {who}",
	"Aprovar este pedido?": "Approve this request?",
	Aprovar: "Approve",
	Negar: "Deny",
	Confirmar: "Confirm",
	"Negar este pedido?": "Deny this request?",
	"{via} de {who}": "{who}'s {via}",
	"O agent de quem pegar a tarefa também vê isso.": "Whoever's agent picks up the task sees this too.",
	agora: "now",
	"Tema automático (do sistema)": "Automatic theme (system)",
	"Tema claro": "Light theme",
	"Tema escuro": "Dark theme",
	azul: "blue",
	verde: "green",
	amarelo: "yellow",
	laranja: "orange",
	rosa: "pink",
	roxo: "purple",
	"mensagens novas": "new messages",
	"agents escreveram": "agents wrote",
	"um agent está trabalhando aqui": "an agent is working here",
	"1 coisa esperando você": "1 thing waiting on you",
	"{n} coisas esperando você": "{n} things waiting on you",
	"Voltar pra sala principal": "Back to the main thread",
	"Seus vibebooks": "Your vibebooks",
	"{theme} (clique pra trocar)": "{theme} (click to change)",
	"Tema: {theme}": "Theme: {theme}",
	"Ir para um vibebook (⌘K)": "Go to a vibebook (⌘K)",
	"Ir para um vibebook": "Go to a vibebook",
	"Ir para um vibebook…": "Go to a vibebook…",
	"Novo vibebook": "New vibebook",
	"sem cor": "no color",
	"Trocar ícone…": "Change icon…",
	"Tirar ícone": "Remove icon",
	"Não deu pra usar essa imagem.": "Couldn't use that image.",
	"1 pessoa": "1 person",
	"{n} pessoas": "{n} people",
	"ativa agora": "active now",
	"ativa há {ago}": "active {ago} ago",
	"Nada com esse nome.": "Nothing by that name.",
	Entrar: "Sign in",
	"Seus vibebooks e seus amigos te esperando.": "Your vibebooks and your friends are waiting.",
	"Continuar com GitHub": "Continue with GitHub",
	"Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.": "That didn't work with GitHub (it needs a verified primary email). Try email.",
	"Continuar com Google": "Continue with Google",
	"ou com email": "or with email",
	"Seu email": "Your email",
	"voce@gmail.com": "you@gmail.com",
	"Mandar código": "Send code",
	"Confere seu email": "Check your email",
	"Mandamos um código de 6 dígitos para <b>{email}</b>.": "We sent a 6-digit code to <b>{email}</b>.",
	Código: "Code",
	"usar outro email": "use another email",
	"Algo deu errado. Tenta de novo.": "Something went wrong. Try again.",
	"Não deu certo com o Google. Tenta com email.": "Google sign-in didn't work. Try with email.",
	Outros: "Other",
	Áudios: "Audio",
	"só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.": "only images (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv and audio.",
	"áudio maior que 50MB.": "audio larger than 50MB.",
	Tudo: "All",
	"{n} versões": "{n} versions",
	"Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.": "No token here: if the server asks for a sign-in, each person signs in with their own account, and vibebook only says who they are and from which room.",
	"Da sala: todo mundo vê; cada um entra com a própria conta": "Room: everyone sees it; each one signs in with their own account",
	"Você entrou em {host} com a sua conta.": "You're signed in to {host} with your account.",
	Sair: "Sign out",
	"Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.": "Sign in to {host} with your account to use it. vibebook keeps no token: it only says who you are and from which room.",
	"Entrar em {host}": "Sign in to {host}",
	"Conectar seu agente": "Connect your agent",
	"Copiar prompt": "Copy prompt",
	"Copiado. Cole no Claude Code, dentro da pasta do projeto.": "Copied. Paste it into Claude Code, inside the project folder.",
	"Copie e cole no seu Claude Code:": "Copy and paste into your Claude Code:",
	"Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.": "Paste the prompt into your Claude Code: it installs the plugin and the CLI and joins here.",
	"Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.": "Paste into Claude Code (or another agent), inside the project folder: it installs the plugin and the CLI and joins this room.",
	Versão: "Version",
	"mais nova": "newest",
	"Arquivos deste épico": "Files in this epic",
	Imagens: "Images",
	"Texto e CSV": "Text and CSV",
	"Nada aqui.": "Nothing here.",
	"1 arquivo": "1 file",
	"{n} arquivos": "{n} files",
	"Ver o texto": "Show the text",
	"Esconder o texto": "Hide the text",
	"Mudar seu nome": "Change your name",
	Tema: "Theme",
	Sair: "Sign out",
	"O que você quer resolver?": "What do you want to get done?",
	"Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.": "A request, an idea, a task for someone… I'll find the right room and epic.",
	"Achar a sala →": "Find the room →",
	"Como seus amigos te chamam?": "What do your friends call you?",
	"O pessoal e os agents vão te chamar assim.": "People and agents will call you that.",
	"Seu nome": "Your name",
	Salvar: "Save",
	"Coloque sua foto": "Add your photo",
	"Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).": "So people can tell at a glance when it's you talking, and when it's your agent (✻).",
	"Adicionar foto": "Add photo",
	"Oi, {name}": "Hi, {name}",
	amigo: "friend",
	amigos: "friends",
	Arquivo: "Archive",
	"Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.": "No vibebooks yet. Create one, invite the people you work with and connect your agent on the side.",
	Arquivar: "Archive",
	"Arquivar {title}": "Archive {title}",
	"Ainda sem resumo. O @vibe escreve um quando a conversa andar.": "No summary yet. @vibe writes one once the conversation gets going.",
	Amigos: "Friends",
	"vibebook junto": "shared vibebook",
	"vibebooks juntos": "shared vibebooks",
	"na plataforma": "on vibebook",
	convidado: "invited",
	"Remover {email} dos amigos": "Remove {email} from friends",
	"Remover dos amigos": "Remove from friends",
	"Quem você convida para um vibebook vira amigo aqui.": "People you invite to a vibebook show up here as friends.",
	"email do amigo": "friend's email",
	"Email do amigo": "Friend's email",
	Convidar: "Invite",
	"Seu perfil": "Your profile",
	Novo: "New",
	"O que você quer resolver? Eu acho a sala e o épico certos.": "What do you want to get done? I'll find the right room and epic.",
	Notificações: "Notifications",
	"Seu nome:": "Your name:",
	"Remover {email} dos seus amigos? Os vibebooks em comum continuam.": "Remove {email} from your friends? Shared vibebooks stay.",
	"Enviando…": "Sending…",
	"Procurando a sala certa…": "Finding the right room…",
	"sala nova <b>“{title}”</b>": "new room <b>“{title}”</b>",
	"Mandar em {where}?": "Send to {where}?",
	"Criar {where}?": "Create {where}?",
	"Nenhuma sala parece a certa. Criar {where}?": "No room looks right. Create {where}?",
	Enviar: "Send",
	"esperando {who}": "waiting on {who}",
	Cancelar: "Cancel",
	"Outro lugar:": "Somewhere else:",
	"Arquivar “{title}”?": "Archive “{title}”?",
	"Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.": "It leaves your list and your agent's inbox and goes to the <b>Archive</b>. Nothing is deleted: everyone else in the room still sees it, and you can restore it anytime.",
	"Salas que você arquivou. Elas continuam existindo pra quem está nelas.": "Rooms you archived. They're still there for everyone else in them.",
	Voltar: "Back",
	"arquivada {ago}": "archived {ago} ago",
	abrir: "open",
	Restaurar: "Restore",
	"Nada arquivado.": "Nothing archived.",
	"conectado {ago}": "connected {ago} ago",
	"Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>": "Ask your agent: <i>“what's new on vibebook?”</i> or <i>“go to room X and tell Marina…”</i>",
	"Seus agents conectados": "Your connected agents",
	"usado {ago}": "used {ago}",
	"sem uso ainda": "not used yet",
	"uso desconhecido": "last use unknown",
	"Marcar todas menos a mais recente de cada": "Check all but the newest of each",
	"Remover selecionadas ({n})": "Remove selected ({n})",
	"Remover {n} conexões? Os agents delas perdem o acesso na hora.": "Remove {n} connections? Their agents lose access right away.",
	"Esperando você": "Waiting on you",
	"Tarefa sua esperando OK:": "Your task waiting for OK:",
	"Já resolvi (respondi em outro lugar, ou não é comigo)": "Done (I answered elsewhere, or it's not for me)",
	"Seu agent conectou.": "Your agent is connected.",
	"Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo.": "It can already see this room. Turn it on here with ✻ Turn on agent at the top.",
	"Ele já enxerga as suas salas.": "It can already see your rooms.",
	"Traga seu agent pra esta sala": "Bring your agent to this room",
	"Conecte seu agent": "Connect your agent",
	"Conecte sua conta do Claude": "Connect your Claude account",
	"O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:": "vibebook works with each person's own agent: it reads the room, talks to the other people's agents and asks you before acting. Paste this into <b>Claude Code</b>, inside the project folder:",
	Copiar: "Copy",
	"esperando seu agent conectar…": "waiting for your agent to connect…",
	"Claude.ai ou outro cliente": "Claude.ai or another client",
	"Configurações → Conectores → Adicionar conector personalizado, e cole": "Settings → Connectors → Add custom connector, and paste",
	"Claude Code só com o conector:": "Claude Code with just the connector:",
	"Passo a passo completo →": "Full step-by-step →",
	Copiado: "Copied",
	"Como você entra": "How you sign in",
	"Seu perfil: email, como você entra, sair": "Your profile: email, how you sign in, sign out",
	"Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.": "Google and GitHub sign in to the account of their email: a different email is a different account.",
	"último {d} · {n}×": "last {d} · {n}×",
	"Código por email": "Email code",
	"sempre funciona": "always works",
	"ainda não usou": "not used yet",
	"Link de convite": "Invite link",
	"Essa mensagem não tem texto pra copiar.": "This message has no text to copy.",
	"O navegador pediu um toque pra copiar.": "The browser wants a tap to copy.",
	"Copiar o texto desta mensagem": "Copy this message's text",
	"Não deu pra copiar: selecione o texto e copie.": "Couldn't copy: select the text and copy it.",
	"Selecione e copie": "Select and copy",
	Carregando: "Loading",
	"Você foi removido deste vibebook.": "You were removed from this vibebook.",
	"seus vibebooks": "your vibebooks",
	"Sem acesso a este vibebook. Peça para alguém de dentro te convidar.": "No access to this vibebook. Ask someone in it to invite you.",
	voltar: "back",
	"pensando ({mode})": "thinking ({mode})",
	"Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.": "Not sent: it looks like {reason}. Secrets don't go in the room, not for you and not for the agents. Use a secure channel.",
	"escolhendo o modelo": "picking the model",
	rápido: "fast",
	"com calma": "careful",
	"Notificações ligadas: clique pra silenciar": "Notifications on: click to mute",
	"Notificações silenciadas: clique pra ligar": "Notifications muted: click to turn on",
	"Ativar notificações de mensagem": "Turn on message notifications",
	"Notificações bloqueadas no navegador": "Notifications blocked in this browser",
	"Este navegador não tem notificações": "This browser doesn't support notifications",
	"As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página.": "Notifications are blocked for vibebook.dev in this browser. Click the lock next to the address → Notifications → Allow, and reload the page.",
	"Te mencionaram": "You were mentioned",
	"respondendo…": "replying…",
	anexo: "attachment",
	"Abrir documento": "Open document",
	"Fechar documento": "Close document",
	Renomear: "Rename",
	"Trocar de conversa": "Switch conversation",
	"Trocar de sala": "Switch room",
	"Ir pro seu agent desta sala no herdr": "Go to your agent for this room in herdr",
	"Ir pro seu agent no herdr": "Go to your agent in herdr",
	"Quadro de tarefas (kanban)": "Task board (kanban)",
	Quadro: "Board",
	"mostrar/ocultar documento": "show/hide doc",
	Mencionar: "Mention",
	"Anexar, mencionar, votação": "Attach, mention, poll",
	"Mais opções": "More options",
	"Anexar arquivo": "Attach file",
	"ou Cmd+V": "or Cmd+V",
	"Mencionar alguém": "Mention someone",
	"Criar votação": "Create poll",
	"Mensagem…": "Message…",
	"Redimensionar documento": "Resize doc",
	Arquivos: "Files",
	Decisões: "Decisions",
	"Modo do documento": "Doc mode",
	Ver: "View",
	"Seu agent espera você": "Your agent is waiting for you",
	"em {where}": "in {where}",
	Editar: "Edit",
	"O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.": "The vibebook's doc. Everyone edits it; @vibe keeps it up to date with the decisions.",
	"Nova votação": "New poll",
	"Pergunta (ex.: Qual cruzeiro?)": "Question (e.g. Which cruise?)",
	opção: "option",
	"cada pessoa pode escolher várias": "each person can pick several",
	"Remover anexo": "Remove attachment",
	"maior que 10MB.": "larger than 10MB.",
	falhou: "failed",
	"sem conexão": "offline",
	"Opção {n}": "Option {n}",
	"Coloque pelo menos 2 opções.": "Add at least 2 options.",
	"Encerrar a votação?": "Close the poll?",
	"Bem-vindo a <b>{room}</b>": "Welcome to <b>{room}</b>",
	"esta sala": "this room",
	"{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.": "{owner} invited you here. Every important conversation gets a room on vibebook: the chat, the tasks and the project doc live together.",
	"Cada um traz o seu agent": "Everyone brings their own agent",
	"Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.": "You connect your agent, on your computer and with your permissions. It reads the room, picks up tasks, updates the epics and reports what it delivered. Only what <b>you</b> write is an instruction to it: everything else it reads as context.",
	"O contexto é de todo mundo": "The context is shared",
	"Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.": "Doc, files, decisions and tasks live in the room, and every agent reads the same context before acting. When someone hands off or is waiting on you, the room shows it.",
	"Conecte o seu agent": "Connect your agent",
	"Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.": "Paste this into <b>Claude Code</b>, inside the project folder. It installs vibebook, joins this room and listens.",
	Pular: "Skip",
	"Entrar na sala": "Enter the room",
	Próximo: "Next",
	"Seu agent já está conectado.": "Your agent is already connected.",
	"Ligue ele nesta sala com ✻ Ligar agent, no topo.": "Turn it on in this room with ✻ Turn on agent, at the top.",
	"Não consegui ler essa imagem.": "Couldn't read that image.",
	"Abrir menu": "Open menu",
	"Novo épico": "New epic",
	"{n} pedindo pra entrar": "{n} asking to join",
	"O @vibe sugere um épico": "@vibe suggests an epic",
	"Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo.": "It saw this in the conversation and thinks it's worth an epic, with the tasks below.",
	"Tarefas propostas": "Proposed tasks",
	"Criar épico": "Create epic",
	"Pedir pro meu agent": "Ask my agent",
	"Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.": "It becomes your request in the room: your agent checks it still makes sense, adjusts the doc and tasks and creates the epic.",
	Descartar: "Dismiss",
	"a pasta onde ele já abriu antes": "the folder where it opened before",
	"ligada a esta sala pelo arquivo .vibebook": "linked to this room by its .vibebook file",
	"a pasta com o nome da sala": "the folder named after the room",
	"pasta nova com o nome da sala, criada ao ligar": "a new folder named after the room, created when you turn it on",
	ouvindo: "listening",
	"não ouvindo": "not listening",
	"Ligar agent": "Turn on agent",
	"Abre em {path} ({how}).": "Opens in {path} ({how}).",
	"pasta da sala": "room folder",
	"Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar.": "On, but none of your agents is listening to this room right now: it may be starting, busy with another task (vibebook herdr asks it to listen once it's free), or vibebook herdr isn't running. Click to turn off.",
	"Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada).": "Your agent is on in this room. Click to turn off (closes its tab in herdr; the conversation can be resumed).",
	"Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina.": "Opens a Claude Code of yours for this room in herdr, listening for messages. Needs vibebook herdr running on your machine.",
	"O vibebook herdr não está rodando nesta máquina.": "vibebook herdr isn't running on this machine.",
	"em {repo}": "in {repo}",
	"ouvindo todas as salas agora": "listening to every room now",
	"{p}% · reseta {at}": "{p}% · resets {at}",
	Contexto: "Context",
	"Sessão de 5h": "5-hour session",
	Semana: "Week",
	"ouvindo esta sala agora": "listening to this room now",
	"visto há {ago}": "seen {ago} ago",
	"está trabalhando nisso": "is working on this",
	"estão trabalhando nisso": "are working on this",
	"O andamento e a entrega aparecem aqui nesta thread.": "Progress and the delivery show up here in this thread.",
	"Alguém está esperando você aqui": "Someone is waiting on you here",
	"{n} coisas esperando você aqui": "{n} things waiting on you here",
	arquivado: "archived",
	"{who} está trabalhando aqui": "{who} is working here",
	"{who} está trabalhando": "{who} is working",
	"Recolher menu": "Collapse menu",
	"novo épico": "new epic",
	Arquivados: "Archived",
	Outro: "Other",
	"escolha e envie pela caixa de mensagem": "pick, then send from the message box",
	Todos: "All",
	"Esse épico não existe mais nesta sala.": "That epic is no longer in this room.",
	"Novo épico: escreva o título…": "New epic: type its title…",
	Épicos: "Epics",
	"Buscar salas, conversas e arquivos…": "Search rooms, conversations and files…",
	"Buscando nas conversas…": "Searching conversations…",
	"Nada nas conversas.": "Nothing in the conversations.",
	"Nas conversas": "In conversations",
	editar: "edit",
	Buscar: "Search",
	"Exigir Face ID ao abrir": "Require Face ID to open",
	"Pronto: o vibebook pede Face ID ao abrir neste aparelho.": "Done: vibebook asks for Face ID when it opens on this device.",
	"Face ID desligado neste aparelho.": "Face ID turned off on this device.",
	"Não deu pra usar o Face ID aqui.": "Couldn't use Face ID here.",
	"vibebook (trava do app)": "vibebook (app lock)",
	"Desbloquear com Face ID": "Unlock with Face ID",
	"Toque pra tentar de novo.": "Tap to try again.",
	"Conecte seu agent (o card acima diz como)": "Connect your agent (the card above shows how)",
	"Seu agent está aqui": "Your agent is here",
	"Seu agent está desligado nesta sala": "Your agent is off in this room",
	Ligar: "Turn on",
	"Começando a sala": "Starting the room",
	"Sala criada": "Room created",
	"Na sala: {who}": "In the room: {who}",
	"Só você aqui: convide em Pessoas": "Only you here: invite people in People",
	"O agent escreve o doc e cria os épicos": "Agent writes the doc and creates the epics",
	"Não achei {who} nos seus amigos: convide pelo email em Pessoas.": "Couldn't find {who} among your friends: invite them by email in People.",
	"O que é e com quem?": "What is it, and with whom?",
	"Ex.: viagem de avião pra SP com os dogs, eu e a Alexia": "E.g.: flying to São Paulo with the dogs, me and Alexia",
	"Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.": "It becomes the room's title and first message. Whoever you mention is invited, and your agent turns on in the room.",
	Criar: "Create",
	"Criando…": "Creating…",
	"Verificado em prod": "Verified in prod",
	"No ar, falta verificar em prod": "Live, not yet verified in prod",
	"No ar": "Live",
	"Falta o agent verificar em prod.": "Agent hasn't verified it in prod yet.",
	"Agent fez": "Agent did it",
	"@vibe sugere": "@vibe suggests",
	"sugestão do @vibe, clique para ver": "suggested by @vibe, click to see",
	"Pedindo pra entrar": "Asking to join",
	"pediu {ago}": "asked {ago} ago",
	"Liberar: entra na sala e recebe o link por email": "Let in: joins the room and gets the link by email",
	liberar: "let in",
	"Recusar {email}": "Decline {email}",
	Recusar: "Decline",
	Pessoas: "People",
	pendente: "pending",
	"Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp": "Copy the invite message (room link + agent setup) to send on WhatsApp",
	copiar: "copy",
	"Convidada(o), ainda não entrou": "Invited, hasn't joined yet",
	reenviar: "resend",
	"Remover {email}": "Remove {email}",
	"Cancelar convite": "Cancel invite",
	"Remover do vibebook": "Remove from vibebook",
	"Seus amigos": "Your friends",
	"sua tarefa esperando OK": "your task waiting for OK",
	"{who} pediu": "{who} asked",
	"{n} esperando você": "{n} waiting on you",
	"+{n} mais": "+{n} more",
	"{n} offline": "{n} offline",
	"Adicionar {email}": "Add {email}",
	"convidar por email": "invite by email",
	"Cancelar o convite de {email}?": "Cancel {email}'s invite?",
	"Remover {email} deste vibebook?": "Remove {email} from this vibebook?",
	"Não deu para remover.": "Couldn't remove.",
	"Recusar o pedido de {email}?": "Decline {email}'s request?",
	"{email} entrou na sala e recebeu o link por email.": "{email} joined the room and got the link by email.",
	enviado: "sent",
	"Não deu para salvar a foto.": "Couldn't save the photo.",
	"Não deu para ler essa imagem.": "Couldn't read that image.",
	"Te convidei pro vibebook \"{title}\": {url}": "I invited you to the vibebook \"{title}\": {url}",
	"1. Entra com {email} (o convite chegou nesse email).": "1. Sign in with {email} (the invite went to that address).",
	"2. Manda isto pro seu Claude Code:": "2. Send this to your Claude Code:",
	"Convite enviado por email para <b>{email}</b>.": "Invite emailed to <b>{email}</b>.",
	"Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.": "Copied the message with the room link and the agent setup for {name}: paste it in WhatsApp.",
	"Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.": "Couldn't copy. Use \"copy\" next to {email} in People.",
	"A fazer": "To do",
	Fazendo: "Doing",
	"Esperando OK": "Waiting for OK",
	Feito: "Done",
	"Arraste, ou use ← →. Clique pra abrir o épico.": "Drag, or use ← →. Click to open the epic.",
	você: "you",
	"Nada a fazer.": "Nothing to do.",
	"Arraste um card pra cá.": "Drag a card here.",
	"nova tarefa": "new task",
	"Nova tarefa": "New task",
	Épico: "Epic",
	"Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.": "No epics or tasks yet. Create an epic in the sidebar, or ask your agent to organize the project into epics and tasks.",
	"sugestão do @vibe": "suggested by @vibe",
	"Clique para renomear": "Click to rename",
	"Desarquivar épico": "Unarchive epic",
	"Arquivar épico (concluído)": "Archive epic (done)",
	"Arquivar épico": "Archive epic",
	"Apagar épico": "Delete epic",
	esperando: "waiting on",
	"Ver as tasks abertas": "See open tasks",
	"Esperando {who}": "Waiting on {who}",
	"esperando OK": "waiting for OK",
	fazendo: "doing",
	"a fazer": "to do",
	"Nome do épico:": "Epic name:",
	"Nome do vibebook:": "Vibebook name:",
	"Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.": "Delete the epic \"{title}\", its tasks and its discussion? This can't be undone.",
	Tarefas: "Tasks",
	Feita: "Done",
	"Clique para editar": "Click to edit",
	Responsável: "Owner",
	"sem dono": "no owner",
	Prazo: "Due date",
	"Apagar task": "Delete task",
	"nova task": "new task",
	"Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:": "Due (e.g. Fri, Wed 11pm, 11/06). Empty removes it:",
	"Abrir numa aba": "Open in a tab",
	Fechar: "Close",
	"Seu agent está ouvindo esta sala.": "Your agent is listening to this room.",
	"Seu agent ainda não está ouvindo.": "Your agent isn't listening yet.",
	"Abrindo seu agent no seu computador…": "Opening your agent on your computer…",
	"Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá.": "Check that vibebook herdr is running on your computer, or whether agent stopped at a question there.",
	"O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.": "vibebook herdr opens Claude Code in the room's folder; it takes a few seconds.",
	"Seu agent não está nesta sala.": "Your agent isn't in this room.",
	"1 pessoa votou": "1 person voted",
	"{n} pessoas votaram": "{n} people voted",
	"pode escolher várias": "pick several",
	"escolha uma": "pick one",
	encerrada: "closed",
	encerrar: "close",
	concluído: "done",
	"{d}/{n} tarefas": "{d}/{n} tasks",
	"1 resposta": "1 reply",
	"{n} respostas": "{n} replies",
	"última há {ago}": "last {ago} ago",
	"Escreva aqui pra continuar: ele reabre.": "Write here to keep going: it reopens.",
	votação: "poll",
	"Abrir em tela cheia": "Open full screen",
	Tabela: "Table",
	"Ver a mensagem respondida": "See the message being replied to",
	"mensagem anterior": "earlier message",
	"Respondendo a <b>{who}</b>": "Replying to <b>{who}</b>",
	"Cancelar resposta": "Cancel reply",
	"Essa mensagem está mais acima: role o chat pra carregar.": "That message is further up: scroll the chat to load it.",
	"pensando…": "thinking…",
	Responder: "Reply",
	"Responder a esta mensagem": "Reply to this message",
	"Escrito pelo agent dessa pessoa, em nome dela": "Written by this person's agent, on their behalf",
	"Reporta algo entregue": "Reports something delivered",
	entregue: "delivered",
	aprovado: "approved",
	decidido: "decided",
	"Apagar registro": "Delete entry",
	"O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.": "What the room decides and every approval show up here. The agents log them as the conversation goes.",
	"Apagar esse registro?": "Delete this entry?",
	Lembretes: "Reminders",
	"(pelo agent)": "(through their agent)",
	"quer usar": "wants to use",
	"abrir um link": "open a link",
	"ver todas ({n})": "see all ({n})",
	"só as telas": "screens only",
	"Esta sala": "This room",
	"Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.": "A room app is an HTML file in apps/ that uses the room through its iframe: it reads the doc, tasks and messages, posts and moves tasks (with your OK). Ask your agent: “make an app apps/poll.html for this room”.",
	"Este app quer {what}, como você:": "This app wants to {what}, as you:",
	Permitir: "Allow",
	postar: "post",
	"criar uma tarefa": "add a task",
	"mover uma tarefa": "move a task",
	"usar {tool} em {conn}": "use {tool} on {conn}",
	Conexões: "Connections",
	minha: "mine",
	"da sala": "room's",
	"Carregando…": "Loading…",
	"Conectar MCP": "Connect MCP",
	"URL do servidor MCP": "MCP server URL",
	"Da sala: todo mundo usa junto": "Room's: everyone uses it together",
	"Só minha: só eu e meus agents": "Only mine: just me and my agents",
	Atualizar: "Refresh",
	"Remover conexão": "Remove connection",
	"{n} tools, nenhum app": "{n} tools, no app",
	"Conectando…": "Connecting…",
	"Remover a conexão {name}? Os apps dela saem da sala.": "Remove the connection {name}? Its apps leave the room.",
	"Esse app não está nas conexões que você pode usar nesta sala.": "That app isn't in the connections you can use in this room.",
	Recarregar: "Reload",
	"próximo {when}": "next {when}",
	"de {who}": "by {who}",
	"Apagar lembrete": "Delete reminder",
	"rodou {n}×": "ran {n}×",
	"Apagar este lembrete?": "Delete this reminder?",
	"nome, ex.: relatorio-diario": "name, e.g. daily-report",
	"Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou.": "Say when and what. E.g.: Every day at 8am: pull yesterday's numbers and post here what changed.",
	"Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz.": "Each reminder is a file <code>reminders/&lt;name&gt;.md</code>: the text says when to run and what to do. At that time @vibe posts the text here and the agent of whoever saved it does it.",
	"Novo lembrete": "New reminder",
	"O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:": "The sandbox runs on your freestyle.sh account. Create one there and make an API key in your terminal:",
	"Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.": "Paste the key here. It's kept encrypted in vibebook and never goes to the room or to agents.",
	"No seu terminal, rode:": "In your terminal, run:",
	"Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.": "Paste the token (sk-ant-…) here: the sandbox's Claude starts logged in to your subscription. It's kept encrypted, like the freestyle key. Without it, run /login in the sandbox terminal.",
	"Rodando setup… (até 4 min)": "Running setup… (up to 4 min)",
	"espera você no terminal": "waiting for you in the terminal",
	"Tirar da fila (já resolvido)": "Take out of the queue (already handled)",
	"mostrar menos": "show less",
	"mostrar mais {n}": "show {n} more",
	"sandbox na nuvem rodando": "cloud sandbox running",
	"Claude conectado: sandboxes novos já sobem logados": "Claude connected: new sandboxes start logged in",
	"seu agent no sandbox": "your agent in the sandbox",
	"Quadro de tarefas": "Task board",
	"Nova versão do vibebook · toque pra atualizar": "New vibebook version · tap to update",
	"Seu agent espera você no terminal": "Your agent is waiting for you in the terminal",
	feito: "done",
	Lista: "List",
	"Todos os épicos": "All epics",
	"Sem épico": "No epic",
	"Nenhuma tarefa aberta.": "No open tasks.",
	"Escolha um épico.": "Choose an epic.",
	"Épico não encontrado.": "Epic not found.",
	Status: "Status",
	"Sair de todos os aparelhos": "Sign out everywhere",
	"Sai em todos os navegadores e celulares onde você entrou": "Signs you out of every browser and phone you signed in on",
	"Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.": "Sign out everywhere? Every browser and phone you signed in on will ask you to log in again, this one too. Your connected agents stay.",
	remover: "remove",
	"Conecte seu Claude": "Connect your Claude",
	"Salvando…": "Saving…",
	"Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.": "Remove the Claude token? Sandboxes that already have it stay logged in until you delete them.",
	"sala principal": "main room",
	épico: "epic",
	"Fila do seu agent: {n}": "Your agent's queue: {n}",
	"Seu agent está livre": "Your agent is free",
	"Fila do seu agent": "Your agent's queue",
	"espera você": "waiting for you",
	fazendo: "doing",
	"na fila": "queued",
	"Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.": "Nothing queued: everything you asked in this room in the last 48h was done or answered.",
	"Rodar o setup de novo": "Run the setup again",
	"Refazer setup": "Redo setup",
	"ligado · trabalhando agora": "on · working now",
	"Pessoas e agents": "People & agents",
	"gasto até agora na sua conta do freestyle": "spent so far on your freestyle account",
	"freestyle.sh conectado": "freestyle.sh connected",
	desconectar: "disconnect",
	"{who} espera você no terminal": "{who} is waiting for you in the terminal",
	"Na nuvem": "In the cloud",
	"carregando…": "loading…",
	"Conecte sua conta do freestyle.sh": "Connect your freestyle.sh account",
	"API key do freestyle": "freestyle API key",
	"Conferindo…": "Checking…",
	Conectar: "Connect",
	"preparando (uns 3 min)…": "setting up (about 3 min)…",
	Terminal: "Terminal",
	Pausar: "Pause",
	Retomar: "Resume",
	"Apagar sandbox": "Delete sandbox",
	"Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.": "An agent in the cloud for this room, set up by agents/&lt;name&gt;.md in the files. Running costs about US$0.13/hour on your account; paused, only the disk.",
	"Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.": "Disconnect your freestyle.sh account? The sandboxes stay there, but vibebook can no longer start, pause or open their terminal.",
	"Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.": "Delete this sandbox? The VM and everything in it are gone from freestyle.sh.",
	"conectando…": "connecting…",
	conectado: "connected",
	terminou: "ended",
	"desconectado: feche e abra de novo": "disconnected: close and open again",
	rodando: "running",
	ligando: "starting",
	pausando: "pausing",
	pausado: "paused",
	parado: "stopped",
	"apagado no freestyle": "deleted on freestyle",
	"Seus agents nesta sala": "Your agents in this room",
	"Claude Code no seu computador": "Claude Code on your computer",
	"ligado · ouvindo esta sala": "on · listening to this room",
	"ligado · ainda não está ouvindo": "on · not listening yet",
	desligado: "off",
	"pasta nova": "new folder",
	"Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.": "Opens (or closes) a Claude Code of yours for this room through vibebook herdr, on your machine.",
	Conectados: "Connected",
	"Criar sandbox": "Create sandbox",
	Pronto: "Done",
	"Documento e arquivos da sala": "Room doc and files",
	Ligado: "On",
	ligado: "on",
	"Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.": "No reminders yet. Click New reminder, or ask your agent: “every day at 8am, send me a summary of what changed”.",
	"Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.": "Paste an image in the chat (Cmd+V), drag a file in or use the clip. Everything shared in this vibebook lands here.",
	"Carregar mensagens anteriores": "Load earlier messages",
	"Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.": "Start the conversation. The agents on in this room read and reply; yours acts with your OK. E.g. <i>organize the project into epics: new site, rentals and domain</i>.",
	"Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.": "This epic's discussion. The agents read the tasks, the doc and the main room.",
	"ver na sala principal": "see in the main room",
	"{who} está fazendo isso": "{who} is on it",
	"{who} fez isso": "{who} did it",
	"aguardando {who}": "waiting on {who}",
	"{who} parou": "{who} stopped",
	"lido por {who}": "read by {who}",
	"entregue, ainda não lido por {who}": "delivered, not yet read by {who}",
	"Diagrama com erro": "Diagram error",
	"na linha {n}": "on line {n}",
	"Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.": "Empty doc. Click <b>Edit</b> or ask your agent to summarize the decisions here.",
	"@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).": "@vibe reviewed this doc. Everyone's agent gets this too (doc_notes)."
}, h = (e, t) => {
	let n = p === "en" && oe[e] !== void 0 ? oe[e] : e;
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}, se = () => `<span class="langSw" role="group" aria-label="Idioma / Language">${["pt", "en"].map((e) => `<button type="button" class="${p === e ? "sel" : ""}" data-lang="${e}" aria-pressed="${p === e}">${e.toUpperCase()}</button>`).join("<i>·</i>")}</span>`;
document.addEventListener("click", (e) => {
	let t = e.target.closest?.("[data-lang]");
	t && t.dataset.lang !== p && (document.cookie = `vb_lang=${t.dataset.lang}; path=/; max-age=31536000; samesite=lax`, location.reload());
});
var g = document.getElementById("app"), _ = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), ce = [
	"#ff5a36",
	"#1f9d8a",
	"#3b6cf6",
	"#c2410c",
	"#9333ea",
	"#0f766e",
	"#be185d",
	"#4d7c0f"
], v = (e) => ce[[...e].reduce((e, t) => e + t.charCodeAt(0), 0) % ce.length], le = {}, y = (e) => e === "ai" ? "@vibe" : j?.names?.[e] || le[e] || e.split("@")[0], b = {}, x = (e, t) => {
	if (e === "ai") return "<span class=\"avatar ai\">✦</span>";
	let n = j?.avatars?.[e] ?? b[e];
	return n ? `<span class="avatar pic ${t ? "on" : ""}" title="${_(y(e))}"><img src="/api/avatar/${encodeURIComponent(e)}?v=${n}" alt="" loading="lazy" /></span>` : `<span class="avatar ${t ? "on" : ""}" style="background:${v(e)}" title="${_(y(e))}">${_(y(e).slice(0, 2).toUpperCase())}</span>`;
}, ue = (e) => {
	let t = String(e || "");
	return /codex|gpt|openai|\bo[1-9]\b/i.test(t) ? ["codex", "◎"] : /gemini/i.test(t) ? ["gemini", "✦"] : /cursor/i.test(t) ? ["cursor", "▲"] : /copilot/i.test(t) ? ["copilot", "◉"] : ["", "✻"];
}, de = (e, t) => {
	let [n, r] = ue(t);
	return `<span class="avatar claude${n ? ` ${n}` : ""}" title="${h("{via} de {who}", {
		via: _(Sa(t) || "Agent"),
		who: _(y(e))
	})}">${r}${x(e)}</span>`;
}, S = (e) => {
	let t = Math.round((Date.now() - e) / 6e4);
	return t < 1 ? h("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
}, fe = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, ""), pe = (e) => {
	let t = e.split("@")[0];
	return [
		fe(j?.names?.[e]?.split(/\s+/)[0] || le[e]?.split(/\s+/)[0] || ""),
		fe(t.split(/[._+-]/)[0]),
		fe(t)
	].filter(Boolean);
}, me = (e) => pe(e)[0], he = (e) => {
	let t = fe(e);
	return t === "vibe" || t === "ai" ? "ai" : (j?.members || []).find((e) => pe(e).includes(t)) || null;
}, ge = (e) => e.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (e, t, n) => {
	let r = he(n);
	return r ? `${t}<span class="mention${r === j?.me ? " me" : ""}" title="${_(r === "ai" ? "@vibe" : r)}">@${n}</span>` : e;
}), _e = "<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>", ve = (e) => e.replace(/<a ([^>]*?)href="https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o, s) => {
	if (/^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(n)) return e;
	let c = e.match(/href="([^"]*)"/)[1], l = i === "commit" ? `${n}/${r}@${a.slice(0, 7)}` : i ? `${n}/${r} #${a}` : `${n}/${r}`, u = s.replace(/<[^>]*>/g, "").trim(), d = !u || u === c || /^https?:\/\//.test(u) ? _(l) : s;
	return `<a ${t}href="${c}"${o} class="ghchip" title="${_(l)}">${_e}<span>${d}</span></a>`;
}), ye = (e) => e.replace(/<a ([^>]*?)href="(https?:\/\/[^"\/]+)?\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o) => {
	if (!j?.id || r !== j.id || n && n !== location.origin) return e;
	let s = (j.files || []).find((e) => e.id === i) || X().flatMap((e) => e.files || []).find((e) => e.id === i), c = o.replace(/<[^>]*>/g, "").trim(), l = s?.name || (c && !/^https?:\/\//.test(c) ? c : "arquivo"), u = s ? ti(s.name) : [], d = u.length > 1 ? u.length - u.findIndex((e) => e.id === i) : 0;
	return `<a ${t}href="/api/books/${r}/files/${i}"${a} class="fchip" title="${_(l)}">${Ht(s || { type: /\.html?$/i.test(l) ? "text/html" : "" }, 14)}<span>${_(l)}</span>${d ? `<small>v${d}</small>` : ""}</a>`;
}), be = JSON.parse("{\"point_up\": \"☝️\", \"point_up_2\": \"👆\", \"point_down\": \"👇\", \"point_left\": \"👈\", \"point_right\": \"👉\", \"+1\": \"👍\", \"thumbsup\": \"👍\", \"-1\": \"👎\", \"thumbsdown\": \"👎\", \"ok_hand\": \"👌\", \"clap\": \"👏\", \"pray\": \"🙏\", \"raised_hands\": \"🙌\", \"wave\": \"👋\", \"muscle\": \"💪\", \"eyes\": \"👀\", \"fire\": \"🔥\", \"rocket\": \"🚀\", \"tada\": \"🎉\", \"100\": \"💯\", \"heart\": \"❤️\", \"heart_eyes\": \"😍\", \"smile\": \"😄\", \"smiley\": \"😃\", \"grin\": \"😁\", \"joy\": \"😂\", \"rofl\": \"🤣\", \"laughing\": \"😆\", \"sweat_smile\": \"😅\", \"wink\": \"😉\", \"blush\": \"😊\", \"slightly_smiling_face\": \"🙂\", \"upside_down_face\": \"🙃\", \"thinking_face\": \"🤔\", \"thinking\": \"🤔\", \"neutral_face\": \"😐\", \"expressionless\": \"😑\", \"unamused\": \"😒\", \"roll_eyes\": \"🙄\", \"face_with_rolling_eyes\": \"🙄\", \"grimacing\": \"😬\", \"sweat\": \"😓\", \"cry\": \"😢\", \"sob\": \"😭\", \"scream\": \"😱\", \"rage\": \"😡\", \"angry\": \"😠\", \"sunglasses\": \"😎\", \"nerd_face\": \"🤓\", \"sleeping\": \"😴\", \"exploding_head\": \"🤯\", \"partying_face\": \"🥳\", \"shrug\": \"🤷\", \"facepalm\": \"🤦\", \"white_check_mark\": \"✅\", \"heavy_check_mark\": \"✔️\", \"check\": \"✔️\", \"x\": \"❌\", \"warning\": \"⚠️\", \"no_entry\": \"⛔\", \"question\": \"❓\", \"exclamation\": \"❗\", \"bulb\": \"💡\", \"memo\": \"📝\", \"pushpin\": \"📌\", \"link\": \"🔗\", \"lock\": \"🔒\", \"unlock\": \"🔓\", \"key\": \"🔑\", \"bug\": \"🐛\", \"wrench\": \"🔧\", \"hammer\": \"🔨\", \"gear\": \"⚙️\", \"zap\": \"⚡\", \"star\": \"⭐\", \"sparkles\": \"✨\", \"boom\": \"💥\", \"hourglass\": \"⌛\", \"alarm_clock\": \"⏰\", \"calendar\": \"📅\", \"chart_with_upwards_trend\": \"📈\", \"chart_with_downwards_trend\": \"📉\", \"moneybag\": \"💰\", \"money_with_wings\": \"💸\", \"dart\": \"🎯\", \"trophy\": \"🏆\", \"coffee\": \"☕\", \"beer\": \"🍺\", \"pizza\": \"🍕\", \"see_no_evil\": \"🙈\", \"hugs\": \"🤗\", \"hugging_face\": \"🤗\", \"handshake\": \"🤝\", \"crossed_fingers\": \"🤞\", \"writing_hand\": \"✍️\", \"skull\": \"💀\", \"ghost\": \"👻\", \"robot_face\": \"🤖\", \"robot\": \"🤖\", \"brain\": \"🧠\", \"speech_balloon\": \"💬\", \"mag\": \"🔍\", \"computer\": \"💻\", \"iphone\": \"📱\", \"package\": \"📦\", \"construction\": \"🚧\", \"rotating_light\": \"🚨\", \"sos\": \"🆘\", \"green_heart\": \"💚\", \"blue_heart\": \"💙\", \"purple_heart\": \"💜\", \"yellow_heart\": \"💛\", \"broken_heart\": \"💔\", \"dog\": \"🐶\", \"cat\": \"🐱\", \"sun\": \"☀️\", \"rainbow\": \"🌈\", \"rain\": \"🌧️\", \"snowflake\": \"❄️\", \"earth_americas\": \"🌎\", \"brazil\": \"🇧🇷\", \"flag-br\": \"🇧🇷\", \"checkered_flag\": \"🏁\", \"arrow_up\": \"⬆️\", \"arrow_down\": \"⬇️\", \"arrow_right\": \"➡️\", \"arrow_left\": \"⬅️\", \"heavy_plus_sign\": \"➕\", \"heavy_minus_sign\": \"➖\", \"red_circle\": \"🔴\", \"large_green_circle\": \"🟢\", \"green_circle\": \"🟢\", \"large_yellow_circle\": \"🟡\", \"yellow_circle\": \"🟡\", \"white_circle\": \"⚪\", \"black_circle\": \"⚫\"}"), xe = (e) => e.replace(/:([a-z0-9_+-]{1,40}):/g, (e, t) => be[t] ?? e), Se = (e) => ye(ve(xe(e).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g, (e) => `<a href="${e}" target="_blank" rel="noopener noreferrer nofollow ugc">${e}</a>`))), Ce = {
	FORBID_TAGS: [
		"img",
		"style",
		"form",
		"input",
		"button",
		"textarea",
		"select",
		"iframe",
		"object",
		"embed"
	],
	FORBID_ATTR: ["style"]
}, we = (e) => DOMPurify.sanitize(ye(ve(DOMPurify.sanitize(marked.parse(xe(e), {
	breaks: !0,
	gfm: !0
}), Ce).replace(/<a (?!href="#(?:m\d+|e[\w-]+|doc[\w:-]*)")/g, "<a target=\"_blank\" rel=\"noopener noreferrer nofollow ugc\" ").replace(/<a href="#m(\d+)"/g, "<a class=\"mlink\" href=\"#m$1\" data-msg=\"$1\"").replace(/<a href="#(e[\w-]+|doc[\w:-]*)"/g, "<a class=\"mlink\" href=\"#$1\" data-cardgo=\"#$1\""))), {
	...Ce,
	ADD_ATTR: ["target"]
}), C = async (e, t) => {
	let n = await fetch(e, t ? {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(t)
	} : {});
	if (n.status === 401) throw location.href = r(`/login?next=${encodeURIComponent(location.pathname + location.search)}`, location.href, "svelte"), Error("unauthenticated");
	if (!n.ok) throw Error((await n.json().catch(() => ({}))).error || n.statusText);
	return n.json();
}, w = document.getElementById("switcher"), T = null, E = [], Te = (e) => e.some((e) => /^[ab]\d/.test(e.ref)) ? " cl" : "", Ee = {
	link: "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>",
	inbox: "<path d=\"M22 12h-6l-2 3h-4l-2-3H2\"/><path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"/>",
	grid: "<rect x=\"4\" y=\"4\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/><rect x=\"13.5\" y=\"4\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/><rect x=\"4\" y=\"13.5\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/><rect x=\"13.5\" y=\"13.5\" width=\"6.5\" height=\"6.5\" rx=\"1.5\"/>",
	search: "<circle cx=\"11\" cy=\"11\" r=\"7.5\"/><path d=\"m20.5 20.5-4-4\"/>",
	expand: "<path d=\"M15 3h6v6\"/><path d=\"M9 21H3v-6\"/><path d=\"m21 3-7 7\"/><path d=\"m3 21 7-7\"/>",
	plus: "<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>",
	pin: "<path d=\"M12 17v5\"/><path d=\"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z\"/>",
	x: "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>",
	check: "<path d=\"M20 6 9 17l-5-5\"/>",
	menu: "<path d=\"M4 6h16\"/><path d=\"M4 12h16\"/><path d=\"M4 18h16\"/>",
	list: "<path d=\"M3 6h.01\"/><path d=\"M3 12h.01\"/><path d=\"M3 18h.01\"/><path d=\"M8 6h13\"/><path d=\"M8 12h13\"/><path d=\"M8 18h13\"/>",
	sidebar: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"3\"/><path d=\"M9 3v18\"/>",
	back: "<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>",
	external: "<path d=\"M7 7h10v10\"/><path d=\"M7 17 17 7\"/>",
	board: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"3\"/><path d=\"M8 7v7\"/><path d=\"M12 7v4\"/><path d=\"M16 7v9\"/>",
	doc: "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M16 13H8\"/><path d=\"M16 17H8\"/><path d=\"M10 9H8\"/>",
	file: "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/>",
	mic: "<path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/><path d=\"M12 19v3\"/>",
	globe: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>",
	folder: "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/>",
	calendar: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><path d=\"M3 10h18\"/>",
	trash: "<path d=\"M3 6h18\"/><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/>",
	archive: "<rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\"/><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\"/><path d=\"M10 12h4\"/>",
	undo: "<path d=\"M9 14 4 9l5-5\"/><path d=\"M4 9h10.5a5.5 5.5 0 0 1 0 11H11\"/>",
	reply: "<path d=\"m9 17-5-5 5-5\"/><path d=\"M20 18v-2a4 4 0 0 0-4-4H4\"/>",
	copy: "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>",
	bell: "<path d=\"M10.27 21a2 2 0 0 0 3.46 0\"/><path d=\"M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33\"/>",
	bellOff: "<path d=\"M10.27 21a2 2 0 0 0 3.46 0\"/><path d=\"M17 17H4a1 1 0 0 1-.74-1.67C4.59 13.96 6 12.5 6 8a6 6 0 0 1 .26-1.74\"/><path d=\"m2 2 20 20\"/><path d=\"M8.67 3.01A6 6 0 0 1 18 8c0 2.69.77 4.65 1.71 6.05\"/>",
	camera: "<path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/>",
	plug: "<path d=\"M12 22v-5\"/><path d=\"M9 8V2\"/><path d=\"M15 8V2\"/><path d=\"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z\"/>",
	chart: "<path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>",
	trophy: "<path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/>",
	clock: "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>",
	terminal: "<path d=\"m4 17 6-6-6-6\"/><path d=\"M12 19h8\"/>",
	alert: "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>",
	paperclip: "<path d=\"m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l8.6-8.6a4 4 0 0 1 5.7 5.7l-8.6 8.6a2 2 0 0 1-2.8-2.8l8.5-8.5\"/>",
	at: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\"/>",
	hand: "<path d=\"M18 11V6a2 2 0 0 0-4 0\"/><path d=\"M14 10V4a2 2 0 0 0-4 0v2\"/><path d=\"M10 10.5V6a2 2 0 0 0-4 0v8\"/><path d=\"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\"/>",
	arrowRight: "<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>",
	sun: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/>",
	moon: "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/>",
	chevronDown: "<path d=\"m6 9 6 6 6-6\"/>",
	chevronRight: "<path d=\"m9 18 6-6-6-6\"/>",
	pencil: "<path d=\"M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z\"/><path d=\"m15 5 4 4\"/>",
	contrast: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 17a5 5 0 0 0 0-10z\" fill=\"currentColor\"/>"
}, D = (e, t = 16) => `<svg class="i" viewBox="0 0 24 24" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ee[e]}</svg>`, De = "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"22\" height=\"24\" rx=\"5\" fill=\"#fff\"/><rect x=\"7\" y=\"9\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><rect x=\"7\" y=\"15\" width=\"8\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><circle cx=\"24\" cy=\"23\" r=\"7\" fill=\"#f2dc4a\"/></svg>", Oe = D("search", 18), ke = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round">${[
	0,
	60,
	120
].map((e) => `<line x1="12" y1="3.5" x2="12" y2="20.5" transform="rotate(${e} 12 12)"/>`).join("")}</g></svg>`, Ae = D("plus", 18);
if (window.visualViewport) {
	let e = () => {
		document.documentElement.style.setProperty("--vvh", `${Math.round(visualViewport.height)}px`), innerWidth <= 900 && scrollY && document.querySelector(".book") && scrollTo(0, 0);
	};
	visualViewport.addEventListener("resize", e), visualViewport.addEventListener("scroll", e), e();
}
var O = {
	auto: {
		label: h("Tema automático (do sistema)"),
		next: "light",
		icon: D("contrast", 18)
	},
	light: {
		label: h("Tema claro"),
		next: "dark",
		icon: D("sun", 18)
	},
	dark: {
		label: h("Tema escuro"),
		next: "auto",
		icon: D("moon", 18)
	}
}, k = () => document.documentElement.dataset.theme || "auto";
function je(e) {
	e === "auto" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	try {
		e === "auto" ? localStorage.removeItem("vb.theme") : localStorage.setItem("vb.theme", e);
	} catch {}
	A();
}
var Me = {
	blue: h("azul"),
	green: h("verde"),
	yellow: h("amarelo"),
	orange: h("laranja"),
	pink: h("rosa"),
	purple: h("roxo")
}, Ne = Object.keys(Me);
document.addEventListener("click", (e) => {
	let t = document.getElementById("tintPop");
	t && !t.hidden && !t.contains(e.target) && (t.hidden = !0);
}), document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		let e = document.getElementById("tintPop");
		e && (e.hidden = !0);
	}
});
var Pe = () => [...T || []].sort((e, t) => (e.position ?? 1e9) - (t.position ?? 1e9) || (e.created_at ?? 0) - (t.created_at ?? 0)), Fe = (e) => e?.icon ? `/api/books/${e.id}/icon?v=${e.icon}` : null, Ie = (e, t) => Fe(e) ? `<span class="tile ${t} hasIcon"><img src="${Fe(e)}" alt="" loading="lazy"></span>` : `<span class="tile ${t}" style="background:${Dn(e.title)}">${_(F(e.title))}</span>`;
function Le(e) {
	let t = T?.find((e) => e.id === j?.id);
	t && e > t.read_id && (t.read_id = e);
}
function Re() {
	document.body.classList.contains("has-sw") && C("/api/me?ui=svelte").then((e) => {
		st(e);
		let t = JSON.stringify(Ar());
		T = e.books, E = e.waits || [], j?.messages?.length && Le(j.messages.at(-1).id), A(), j && JSON.stringify(Ar()) !== t && (z(), Z(!0));
	}).catch(() => {});
}
var ze = null, Be = 0, Ve = 0, He = 0;
function Ue() {
	ze && ze.readyState <= 1 || (ze = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`), ze.onopen = () => {
		Be = 0;
	}, ze.onmessage = (e) => {
		let t;
		try {
			t = JSON.parse(e.data);
		} catch {
			return;
		}
		t.t === "me" && !(t.msg && t.book && t.book === j?.id) && (clearTimeout(Ve), Ve = setTimeout(Re, 600)), t.t === "agents" && (t.book === "*" || t.book === j?.id) && (clearTimeout(He), He = setTimeout(Rn, 600));
	}, ze.onclose = () => {
		ze = null, document.visibilityState === "visible" && setTimeout(Ue, Math.min(3e4, 1e3 * 2 ** Be++));
	});
}
document.addEventListener("visibilitychange", () => {
	document.visibilityState === "visible" && document.body.classList.contains("has-sw") && (Re(), Rn(), Ue());
});
var We = "";
function A() {
	kt();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1], t = !!T && location.pathname !== "/login";
	if (document.body.classList.toggle("has-sw", t), !t) {
		w.innerHTML = "";
		return;
	}
	let n = [];
	for (let e of Pe()) {
		let t = n.at(-1);
		t && e.tint && t.tint === e.tint ? t.rooms.push(e) : n.push({
			tint: e.tint || null,
			rooms: [e]
		});
	}
	let r = (e) => e.last_human_id > e.read_id ? `<b class="dot h" title="${h("mensagens novas")}"></b>` : e.last_agent_id > e.read_id ? `<b class="dot a" title="${h("agents escreveram")}"></b>` : "", i = (e) => e.busy_until > Date.now() ? `<b class="swBusy" title="${h("um agent está trabalhando aqui")}">✻</b>` : "", a = (e) => {
		let t = E.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${Te(t)}" title="${n === 1 ? h("1 coisa esperando você") : h("{n} coisas esperando você", { n })}">${n}</b>` : "";
	}, o = (e) => e.sandboxes_running ? `<b class="swCloud" title="${h("sandbox na nuvem rodando")}">☁</b>` : "", s = (e) => `<a class="sw-item" href="/b/${e.id}" data-nav data-id="${e.id}" draggable="true" data-drag aria-label="${_(e.title)}"><i class="pill"></i><span class="tw${e.sandboxes_running ? " cloud" : ""}">${Ie(e, "lg")}${r(e)}${i(e)}${a(e)}${o(e)}</span></a>`, c = `<a class="sw-item" href="/app" data-nav title="${h("Seus vibebooks")}" aria-label="${h("Seus vibebooks")}"><i class="pill"></i><span class="tile lg logo">${De}</span></a>
    <span class="sw-sep"></span>
    ${n.map((e) => e.tint ? `<div class="sw-group" data-tint="${e.tint}">${e.rooms.map(s).join("")}</div>` : s(e.rooms[0])).join("")}
    <span class="sw-sp"></span>
    <button class="sw-btn" id="swTheme" title="${h("{theme} (clique pra trocar)", { theme: O[k()].label })}" aria-label="${h("Tema: {theme}", { theme: O[k()].label })}">${O[k()].icon}</button>
    <button class="sw-btn" id="swSearch" title="${h("Ir para um vibebook (⌘K)")}" aria-label="${h("Ir para um vibebook")}">${Oe}</button>
    <button class="sw-btn" id="swNew" title="${h("Novo vibebook")}" aria-label="${h("Novo vibebook")}">${Ae}</button>`, l = () => {
		w.querySelectorAll(".sw-item").forEach((t) => {
			let n = t.dataset.id ? t.dataset.id === e : location.pathname === "/app";
			t.classList.toggle("on", n), n ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current");
		}), w.querySelector(".on")?.scrollIntoView({ block: "nearest" });
	};
	if (c === We) return l();
	We = c, w.innerHTML = c, l(), w.querySelectorAll("[data-drag]").forEach((e) => e.oncontextmenu = (t) => {
		t.preventDefault();
		let n = T.find((t) => t.id === e.dataset.id), r = document.getElementById("tintPop");
		r.innerHTML = `<small>${_(n.title)}</small><div>${[null, ...Ne].map((e) => `<button data-tint="${e || ""}" class="${(n.tint || null) === e ? "sel" : ""}" title="${e ? Me[e] : h("sem cor")}" aria-label="${e ? Me[e] : h("sem cor")}"></button>`).join("")}</div>
      <p class="iconRow"><label class="ghost">${h("Trocar ícone…")}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/x-icon,.ico" hidden></label>${n.icon ? `<button class="ghost" data-noicon>${h("Tirar ícone")}</button>` : ""}</p>`, r.querySelector("input[type=file]").onchange = async (e) => {
			let t = e.target.files[0];
			if (t) {
				r.hidden = !0;
				try {
					let e = await fetch(`/api/books/${n.id}/icon`, {
						method: "POST",
						headers: { "content-type": "image/png" },
						body: await An(t, 128)
					}).then((e) => e.json());
					if (e.error) throw Error(e.error);
					n.icon = e.icon, A(), j?.id === n.id && (jn(P()), z());
				} catch (e) {
					alert(e.message || h("Não deu pra usar essa imagem."));
				}
			}
		}, r.querySelector("[data-noicon]")?.addEventListener("click", async () => {
			r.hidden = !0, await C(`/api/books/${n.id}/icon`, {}), n.icon = null, A(), j?.id === n.id && (jn(P()), z());
		});
		let i = e.getBoundingClientRect();
		r.style.top = `${i.top}px`, r.hidden = !1, r.querySelectorAll("button[data-tint]").forEach((e) => e.onclick = () => {
			n.tint = e.dataset.tint || null, r.hidden = !0, A(), C(`/api/books/${n.id}/tint`, { tint: n.tint }).catch(() => {});
		});
	}), w.querySelectorAll("[data-drag]").forEach((e) => {
		e.ondragstart = (t) => {
			t.dataTransfer.setData("text/plain", e.dataset.id), t.dataTransfer.effectAllowed = "move";
		}, e.ondragover = (t) => {
			t.preventDefault(), e.classList.add("dropTo");
		}, e.ondragleave = () => e.classList.remove("dropTo"), e.ondrop = (t) => {
			t.preventDefault(), e.classList.remove("dropTo");
			let n = t.dataTransfer.getData("text/plain"), r = e.dataset.id;
			if (!n || n === r) return;
			let i = Pe().map((e) => e.id).filter((e) => e !== n), a = e.getBoundingClientRect();
			i.splice(i.indexOf(r) + +(t.clientY > a.top + a.height / 2), 0, n), i.forEach((e, t) => {
				let n = T.find((t) => t.id === e);
				n && (n.position = t);
			}), A(), C("/api/rooms/order", { ids: i }).catch(() => {});
		};
	}), document.getElementById("swSearch").onclick = tt, document.getElementById("swTheme").onclick = () => je(O[k()].next), document.getElementById("swNew").onclick = () => yt();
}
var Ge = document.getElementById("swTip");
w.addEventListener("mouseover", (e) => {
	let t = e.target.closest(".sw-item[data-id]"), n = t && T?.find((e) => e.id === t.dataset.id);
	if (!n) {
		Ge.hidden = !0;
		return;
	}
	let r = (n.members || "").split(",").filter(Boolean).length, i = n.id === j?.id ? "" : n.last_human_id > n.read_id ? `<span class="tn h">● ${h("mensagens novas")}</span>` : n.last_agent_id > n.read_id ? `<span class="tn a">● ${h("agents escreveram")}</span>` : "";
	Ge.innerHTML = `<b>${_(n.title)}</b>${n.summary ? `<span>${_(n.summary)}</span>` : ""}
    <small>${n.folder ? `${D("folder", 12)} ${_(n.folder)} · ` : ""}${r === 1 ? h("1 pessoa") : h("{n} pessoas", { n: r })} · ${S(n.updated_at) === h("agora") ? h("ativa agora") : h("ativa há {ago}", { ago: S(n.updated_at) })}</small>${i}`;
	let a = t.querySelector(".tile").getBoundingClientRect();
	Ge.style.top = `${a.top + a.height / 2}px`, Ge.hidden = !1;
}), w.addEventListener("mouseleave", () => Ge.hidden = !0), w.addEventListener("click", () => Ge.hidden = !0);
var Ke = document.getElementById("swDlg"), qe = document.getElementById("swQ"), Je = document.getElementById("swList");
w.setAttribute("aria-label", h("Seus vibebooks")), Ke.setAttribute("aria-label", h("Ir para um vibebook")), qe.placeholder = h("Buscar salas, conversas e arquivos…");
var Ye = 0;
function Xe() {
	let e = fe(qe.value), t = (T || []).filter((t) => !e || fe(t.title).includes(e) || fe(t.folder || "").includes(e)).slice(0, 12);
	Ye = Math.min(Ye, Math.max(0, t.length - 1));
	let n = Ze && Ze.q === qe.value.trim() ? Ze : null;
	Je.innerHTML = (t.map((e, t) => `<a href="/b/${e.id}" data-nav class="${t === Ye ? "sel" : ""}" role="option">${Ie(e, "")}<span>${_(e.title)}</span>${e.folder ? `<small>${_(e.folder)}</small>` : ""}</a>`).join("") || (n?.epics.length || n?.messages.length ? "" : `<p class="muted" style="padding:8px 10px;margin:0">${h("Nada com esse nome.")}</p>`)) + $e(n);
}
var Ze = null, Qe = 0, $e = (e) => {
	if (!e) return qe.value.trim().length >= 2 ? `<p class="muted swHint">${h("Buscando nas conversas…")}</p>` : "";
	let t = (e) => new Date(e).toLocaleDateString(m, {
		day: "numeric",
		month: "short"
	}), n = e.epics.map((e) => `<a href="/b/${e.room_id}?t=${e.id}" data-hit="${e.room_id}|${e.id}|" role="option"><span class="hitIco">${e.archived ? "✓" : "#"}</span><span><b>${_(e.title)}</b><small>${_(e.room)}${e.archived ? ` · ${h("arquivado")}` : ""} · ${t(e.ts)}</small></span></a>`).join(""), r = e.messages.map((e) => `<a href="/b/${e.room_id}${e.thread === "main" ? "" : `?t=${e.thread}`}#m${e.id}" data-hit="${e.room_id}|${e.thread}|${e.id}" role="option"><span class="hitIco">${e.files.length ? D("paperclip", 14) : e.by_agent ? "✻" : "“"}</span><span><span class="hitTxt">${_(e.snippet || e.files.map((e) => e.name).join(", "))}</span><small>${_(e.room)}${e.topic ? ` › ${_(e.topic)}` : ""} · ${_(e.by_agent ? e.via || "Agent" : y(e.author))} · ${t(e.ts)}${e.files.length && e.snippet ? ` · ${_(e.files.map((e) => e.name).join(", "))}` : ""}</small></span></a>`).join("");
	return !n && !r ? `<p class="muted swHint">${h("Nada nas conversas.")}</p>` : `${n ? `<p class="swSec">${h("Épicos")}</p>${n}` : ""}${r ? `<p class="swSec">${h("Nas conversas")}</p>${r}` : ""}`;
};
function et() {
	clearTimeout(Qe);
	let e = qe.value.trim();
	e.length < 2 ? Ze = null : Qe = setTimeout(async () => {
		let t = await fetch(`/api/search?q=${encodeURIComponent(e)}`).catch(() => null), n = t?.ok ? await t.json() : null;
		qe.value.trim() === e && (Ze = n ? {
			q: e,
			epics: n.epics || [],
			messages: n.messages || []
		} : {
			q: e,
			epics: [],
			messages: []
		}, Xe());
	}, 250);
}
function tt() {
	T && (d(), Ot(), qe.value = "", Ye = 0, Ze = null, Xe(), Ke.showModal(), qe.focus());
}
qe.oninput = () => {
	Ye = 0, et(), Xe();
}, qe.onkeydown = (e) => {
	let t = Je.querySelectorAll("a").length;
	(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), Ye = (Ye + (e.key === "ArrowDown" ? 1 : t - 1)) % Math.max(t, 1), Xe()), e.key === "Enter" && (e.preventDefault(), Je.querySelectorAll("a")[Ye]?.click());
}, Je.onclick = (e) => {
	let t = e.target.closest("a[data-hit]");
	if (Ke.close(), !t) return;
	e.preventDefault();
	let [n, r, i] = t.dataset.hit.split("|");
	if (f.pushState(null, "", t.getAttribute("href")), nt(), !i) return;
	let a = 0, o = () => {
		if (j?.id === n && j.messages?.length) return Di(Number(i));
		++a < 25 && setTimeout(o, 200);
	};
	setTimeout(o, 150);
}, Ke.onclick = (e) => {
	e.target === Ke && Ke.close();
}, document.addEventListener("keydown", (e) => {
	(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && document.body.classList.contains("has-sw") && (e.preventDefault(), Ke.open ? Ke.close() : tt());
});
function nt() {
	d(), Ot(), tn(), A();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (Ft?.dispose(), Ft = null, location.pathname === "/login") return it();
	if (location.pathname === "/archived") return xt();
	e ? qt(e[1]) : lt();
}
var rt = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><path fill=\"#FFC107\" d=\"M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z\"/><path fill=\"#FF3D00\" d=\"M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z\"/><path fill=\"#4CAF50\" d=\"M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z\"/><path fill=\"#1976D2\" d=\"M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z\"/></svg>";
async function it() {
	document.title = `${h("Entrar")} · vibebook`, jn(null);
	let e = new URLSearchParams(location.search), t = r(e.get("next") || "/app", location.href, "svelte"), n = await fetch("/auth/providers").then((e) => e.json()).catch(() => ({ google: !1 })), i = "", a = (e, o = "") => {
		g.innerHTML = `
    <div class="login"><div class="box">
      <a class="brand" href="/">vibebook</a>
      ${e === "email" ? `
        <h1>${h("Entrar")}</h1>
        <p>${h("Seus vibebooks e seus amigos te esperando.")}</p>
        ${n.google ? `<a class="google" href="/auth/google/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${rt} ${h("Continuar com Google")}</button></a>` : ""}${n.github ? `<a class="google" href="/auth/github/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${_e.replace("<svg ", "<svg width=\"18\" height=\"18\" ")} ${h("Continuar com GitHub")}</button></a>` : ""}${n.google || n.github ? `<div class="or">${h("ou com email")}</div>` : ""}
        <form id="f"><label class="muted" for="email" style="font-size:14px">${h("Seu email")}</label>
          <input id="email" type="email" autocomplete="email" required placeholder="${h("voce@gmail.com")}" value="${_(i)}" />
          <button class="primary" id="go">${h("Mandar código")}</button>
          <p class="err" role="alert">${_(o)}</p></form>` : `
        <h1>${h("Confere seu email")}</h1>
        <p>${h("Mandamos um código de 6 dígitos para <b>{email}</b>.", { email: _(i) })}</p>
        <form id="f"><label class="muted" for="code" style="font-size:14px">${h("Código")}</label>
          <input id="code" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required pattern="[0-9]{6}" />
          <button class="primary" id="go">${h("Entrar")}</button>
          <p class="err" role="alert">${_(o)}</p>
          <button type="button" class="link" id="back">${h("usar outro email")}</button></form>`}
    </div></div>`;
		let s = document.getElementById("f");
		s.querySelector("input").focus(), document.getElementById("back")?.addEventListener("click", () => a("email")), s.onsubmit = async (n) => {
			n.preventDefault();
			let o = document.getElementById("go");
			o.disabled = !0, o.textContent = "…";
			let s = e === "email" ? "/auth/email/start" : "/auth/email/verify";
			e === "email" && (i = document.getElementById("email").value.trim());
			let c = e === "email" ? { email: i } : {
				email: i,
				code: document.getElementById("code").value,
				next: t
			}, l = await fetch(s, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(c)
			}), u = await l.json().catch(() => ({}));
			if (!l.ok) return a(e, u.error || h("Algo deu errado. Tenta de novo."));
			if (e === "email") return a("code");
			location.href = r(u.next || "/app", location.href, "svelte");
		}, e === "code" && (document.getElementById("code").oninput = (e) => {
			e.target.value.replace(/\D/g, "").length === 6 && s.requestSubmit();
		});
	};
	a("email", e.get("error") === "google" ? h("Não deu certo com o Google. Tenta com email.") : e.get("error") === "github" ? h("Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.") : "");
}
window.addEventListener("popstate", () => {
	if (d(), Ot(), oi() || qr()) return;
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (!e || !j || e[1] !== j.id || !Ft || !g.querySelector(".book")) return nt();
	M = new URLSearchParams(location.search).get("t") || "main", M !== "main" && !j.epics.some((e) => e.id === M) && (M = "main"), Q = !1, Vr = M === "main" ? null : M, z(), Z(), V(), $();
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("a[data-nav]");
	t && (e.preventDefault(), f.pushState(null, "", t.getAttribute("href")), nt());
});
var at = null, ot = "", st = (e) => {
	at = e, ot = JSON.stringify(e), ct(e.v), Ue();
};
function ct(e) {
	let t = document.querySelector("meta[name=\"vb-v\"]")?.content;
	if (!e || !t || e === t || document.getElementById("vbUpdate")) return;
	let n = document.createElement("button");
	n.id = "vbUpdate", n.type = "button", n.className = "vbUpdate", n.innerHTML = `${D("undo", 15)} ${h("Nova versão do vibebook · toque pra atualizar")}`, n.onclick = () => location.reload(), document.body.append(n);
}
async function lt() {
	document.title = "vibebook", jn(null), at && ut(at);
	let e = await C("/api/me?ui=svelte");
	if (/^\/(b|login|archived)\b/.test(location.pathname)) return st(e);
	let t = JSON.stringify(e) !== ot;
	if (st(e), !t && g.querySelector("#ask")) return;
	let n = document.getElementById("askText")?.value;
	if (ut(e), n) {
		let e = document.getElementById("askText");
		e && (e.value = n);
	}
}
function ut(e) {
	T = e.books, E = e.waits || [], A(), le = Object.fromEntries(e.friends.filter((e) => e.name).map((e) => [e.email, e.name])), b = Object.fromEntries([...e.friends.filter((e) => e.avatar).map((e) => [e.email, e.avatar]), ...e.avatar ? [[e.email, e.avatar]] : []]);
	let t = (e.name || "").split(" ")[0], n = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	if (dt.matches) return pt(e);
	g.innerHTML = `
  <div class="home">
    <header class="top">
      <div class="brand"><a href="/">vibebook</a></div>
      <button class="me" id="myName" title="${h("Seu perfil: email, como você entra, sair")}">${x(e.email)}<span>${_(e.name || e.email)}</span></button>
      <button class="ghost bell" data-bell></button>
      <button class="ghost homeTheme" id="homeTheme" aria-label="${h("Tema")}">${O[k()].icon}</button>
      ${se()}
    </header>
    <dialog class="profile" id="profileDlg">
      <button class="ghost x pfX" aria-label="${h("Fechar")}">${D("x")}</button>
      <div class="pdHead">${x(e.email)}<div><b title="${h("Mudar seu nome")}">${_(e.name || h("Seu nome"))}</b><small>${_(e.email)}</small></div></div>
      ${mt()}
      <div class="pfOut"><button class="primary" id="logout">${h("Sair")}</button><button class="ghost" id="logoutAll" title="${h("Sai em todos os navegadores e celulares onde você entrou")}">${h("Sair de todos os aparelhos")}</button></div>
    </dialog>
    <div id="setupCard"></div>
    <form class="ask" id="ask">
      <label for="askText">${h("O que você quer resolver?")}</label>
      <div class="askRow"><textarea id="askText" rows="2" maxlength="2000" placeholder="${h("Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.")}"></textarea><button class="primary" id="askBtn">${h("Achar a sala →")}</button></div>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
    ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${h("Como seus amigos te chamam?")}</b><span class="muted">${h("O pessoal e os agents vão te chamar assim.")}</span>
      <div class="row"><input name="n" required maxlength="60" placeholder="${h("Seu nome")}" autocomplete="given-name" /><button class="primary">${h("Salvar")}</button></div></form>`}
    ${e.avatar ? "" : `<div class="picAsk"><span class="picBig" style="background:${v(e.email)}">${_(y(e.email).slice(0, 2).toUpperCase())}</span>
      <div><b>${h("Coloque sua foto")}</b><span class="muted">${h("Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).")}</span></div>
      <button class="primary" data-pic>${D("camera")} ${h("Adicionar foto")}</button></div>`}
    <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />
    <div class="hello">
      <div class="helloText"><h1>${t ? h("Oi, {name}", { name: _(t) }) : h("Seus vibebooks")}</h1>
        <p>${n(e.books.length, "vibebook", "vibebooks")} · ${n(e.friends.length, h("amigo"), h("amigos"))} · <a class="archLink" data-nav href="/archived">${h("Arquivo")}</a><span id="waitN"></span></p></div>
      <button class="primary" id="new">${D("plus")} ${h("Novo vibebook")}</button>
    </div>
    <div class="grid">
      <main>
        ${e.books.length ? "" : `<div class="empty">${h("Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.")}</div>`}
        <div class="cards">${Pe().map((e) => {
		let t = (e.members || "").split(",").filter(Boolean);
		return `
              <div class="cardBox"><a class="card" data-nav href="/b/${e.id}">
                <button type="button" class="arch" data-archive="${e.id}" data-title="${_(e.title)}" title="${h("Arquivar")}" aria-label="${h("Arquivar {title}", { title: _(e.title) })}">${D("archive")}</button>
                ${Fe(e) ? `<div class="cover hasIcon"><img src="${Fe(e)}" alt="" loading="lazy"></div>` : `<div class="cover" style="background-color:${Dn(e.title)}"><span>${_(F(e.title))}</span></div>`}
                <div class="info">
                  <b>${_(e.title)}</b>
                  <div class="sum">${_(e.summary || h("Ainda sem resumo. O @vibe escreve um quando a conversa andar."))}</div>
                  <div class="meta"><div class="stack">${t.slice(0, 5).map((e) => x(e)).join("")}</div><span class="wc" data-wc="${e.id}"></span><span>${S(e.updated_at)}</span></div>
                </div>
              </a><div class="cw" data-cw="${e.id}" hidden></div></div>`;
	}).join("")}
        </div>
      </main>
      <aside class="friends">
        <section class="agentBox" id="agentBox" aria-live="polite"></section>
        <h2>${h("Amigos")} <small>${e.friends.length || ""}</small></h2>
        ${e.friends.length ? e.friends.map((e) => `
          <div class="friend">${x(e.email)}<div class="fn" title="${_(e.email)}">${_(e.name || y(e.email))}
            <small>${e.shared ? `${n(e.shared, h("vibebook junto"), h("vibebooks juntos"))}` : e.joined ? h("na plataforma") : h("convidado")}</small></div>
            <button class="ghost x" data-unfriend="${_(e.email)}" aria-label="${h("Remover {email} dos amigos", { email: _(e.email) })}" title="${h("Remover dos amigos")}">${D("x")}</button></div>`).join("") : `<p class="muted" style="font-size:14px">${h("Quem você convida para um vibebook vira amigo aqui.")}</p>`}
        <form class="invite" id="addFriend"><input type="email" required placeholder="${h("email do amigo")}" aria-label="${h("Email do amigo")}" /><button>${h("Convidar")}</button></form>
      </aside>
    </div>
  </div>`, gt(e);
}
var dt = matchMedia("(max-width: 720px)");
dt.addEventListener("change", () => {
	location.pathname === "/app" && lt();
});
var ft = D("menu", 22);
function pt(e) {
	let t = [...e.books].sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0) || t.updated_at - e.updated_at), n = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", r = (e) => {
		let t = E.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${Te(t)}">${n}</b>` : "";
	}, i = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	g.innerHTML = `
  <div class="phome">
    <header class="ptop">
      <button class="ghost pbtn" id="pMenu" aria-label="Menu">${ft}${E.length ? `<b class="swWait${Te(E)}">${E.length}</b>` : ""}</button>
      <a class="plogo" href="/"><span class="tile logo">${De}</span>vibebook</a>
      <button class="me" id="myName" aria-label="${h("Seu perfil")}">${x(e.email)}</button>
    </header>
    <main class="pmain">
      <div id="setupCard"></div>
      ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${h("Como seus amigos te chamam?")}</b><span class="muted">${h("O pessoal e os agents vão te chamar assim.")}</span>
        <div class="row"><input name="n" required maxlength="60" placeholder="${h("Seu nome")}" autocomplete="given-name" /><button class="primary">${h("Salvar")}</button></div></form>`}
      <div class="pgrid">
        ${t.map((e) => `<a class="proom" data-nav href="/b/${e.id}"><span class="tw${e.sandboxes_running ? " cloud" : ""}">${Ie(e, "xl")}${n(e)}${r(e)}${e.sandboxes_running ? "<b class=\"swCloud\">☁</b>" : ""}</span><span class="nm">${_(e.title)}</span></a>`).join("")}
        <button class="proom" id="new" type="button"><span class="tile xl pnew">${Ae}</span><span class="nm">${h("Novo")}</span></button>
      </div>
    </main>
    <form class="pask" id="ask">
      <textarea id="askText" maxlength="2000" placeholder="${h("O que você quer resolver? Eu acho a sala e o épico certos.")}"></textarea>
      <button class="primary" id="askBtn">${h("Achar a sala →")}</button>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
  </div>
  <dialog class="pdrawer" id="pDrawer">
    <div class="pdHead">${x(e.email)}<div><b>${_(e.name || h("Seu nome"))}</b><small>${_(e.email)}</small></div></div>
    ${mt()}
    <section class="waits" id="waits"${E.length ? "" : " hidden"}></section>
    <nav class="pdNav">
      <a data-nav href="/archived">${h("Arquivo")}</a>
      <div class="pdRow"><button class="ghost" id="homeTheme">${O[k()].icon}<span>${O[k()].label}</span></button>${se()}</div>
      <div class="pdBell"><button class="ghost bell" data-bell></button><span>${h("Notificações")}</span></div>
      ${window.PublicKeyCredential ? `<label class="pdLock"><input type="checkbox" id="lockToggle" ${Ra() ? "checked" : ""} /> <span>${h("Exigir Face ID ao abrir")}</span></label>` : ""}
    </nav>
    <section class="agentBox" id="agentBox" aria-live="polite"></section>
    <h2>${h("Amigos")} <small>${e.friends.length || ""}</small></h2>
    ${e.friends.map((e) => `<div class="friend">${x(e.email)}<div class="fn">${_(e.name || y(e.email))}<small>${e.shared ? i(e.shared, h("vibebook junto"), h("vibebooks juntos")) : e.joined ? h("na plataforma") : h("convidado")}</small></div>
      <button class="ghost x" data-unfriend="${_(e.email)}" aria-label="${h("Remover {email} dos amigos", { email: _(e.email) })}">${D("x")}</button></div>`).join("")}
    <form class="invite" id="addFriend"><input type="email" required placeholder="${h("email do amigo")}" aria-label="${h("Email do amigo")}" /><button>${h("Convidar")}</button></form>
    <button class="ghost pdOut" id="logout">${h("Sair")}</button>
    <button class="ghost pdOut pdOutAll" id="logoutAll">${h("Sair de todos os aparelhos")}</button>
  </dialog>
  <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />`;
	let a = document.getElementById("pDrawer");
	document.getElementById("pMenu").onclick = () => a.showModal(), a.onclick = (e) => {
		(e.target === a || e.target.closest("a[data-nav]")) && a.close();
	}, gt(e), document.getElementById("homeTheme").onclick = (e) => {
		je(O[k()].next), e.currentTarget.innerHTML = `${O[k()].icon}<span>${O[k()].label}</span>`;
	}, document.getElementById("myName").onclick = () => a.showModal(), a.querySelector(".pdHead .avatar").onclick = Fr, a.querySelector(".pdBell span").onclick = () => a.querySelector(".pdBell .bell").click();
	let o = document.getElementById("lockToggle");
	o && (o.onchange = async () => {
		let t = o.checked;
		try {
			await Va(t, e.email), B(h(t ? "Pronto: o vibebook pede Face ID ao abrir neste aparelho." : "Face ID desligado neste aparelho."));
		} catch {
			o.checked = !t, B(h("Não deu pra usar o Face ID aqui."));
		}
	}), a.querySelector(".pdHead b").onclick = async () => {
		let t = prompt(h("Seu nome:"), e.name || "");
		t?.trim() && (await C("/api/me?ui=svelte", { name: t }), lt());
	};
}
var mt = () => `<section class="logins"><h3>${h("Como você entra")}</h3><div id="loginRows"></div><p class="lgNote">${h("Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.")}</p></section>`;
async function ht() {
	let e = document.getElementById("loginRows");
	if (!e) return;
	let t;
	try {
		t = await (await fetch("/api/me/logins")).json();
	} catch {
		return;
	}
	let n = Object.fromEntries((t.logins || []).map((e) => [e.method, e])), r = (e) => e ? h("último {d} · {n}×", {
		d: new Date(e.last).toLocaleDateString(m, {
			day: "numeric",
			month: "short",
			year: "numeric"
		}),
		n: e.n
	}) : null, i = (e, t, n, i) => `<div class="lgRow${n ? " on" : ""}"><span class="lgIc">${e}</span><span><b>${t}</b><small>${r(n) ?? i}</small></span>${n ? `<i class="lgOk">${D("check", 14)}</i>` : ""}</div>`;
	e.innerHTML = [
		i(D("at", 16), h("Código por email"), n.email, h("sempre funciona")),
		t.providers?.google || n.google ? i(rt, "Google", n.google, h("ainda não usou")) : "",
		t.providers?.github || n.github ? i(_e.replace("<svg ", "<svg width=\"16\" height=\"16\" "), "GitHub", n.github, h("ainda não usou")) : "",
		n.invite ? i(D("reply", 16), h("Link de convite"), n.invite) : ""
	].join("");
}
function gt(e) {
	let t = async (e) => {
		e?.trim() && (await C("/api/me?ui=svelte", { name: e }), lt());
	}, n = document.getElementById("profileDlg");
	document.getElementById("myName").onclick = () => n ? n.showModal() : null, n && (n.onclick = (e) => {
		(e.target === n || e.target.closest(".pfX")) && n.close();
	}, n.querySelector(".pdHead .avatar").onclick = Fr, n.querySelector(".pdHead b").onclick = () => t(prompt(h("Seu nome:"), e.name || ""))), ht(), document.querySelector("[data-pic]")?.addEventListener("click", Fr), document.getElementById("nameAsk")?.addEventListener("submit", (e) => {
		e.preventDefault(), t(e.target.n.value);
	}), document.getElementById("homeTheme").onclick = (e) => {
		je(O[k()].next), e.currentTarget.innerHTML = O[k()].icon;
	}, document.getElementById("logout").onclick = async () => {
		await fetch("/auth/logout", { method: "POST" }), location.href = "/";
	}, document.getElementById("logoutAll").onclick = async () => {
		confirm(h("Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.")) && (await fetch("/auth/logout-all", { method: "POST" }), location.href = r("/login", location.href, "svelte"));
	}, document.getElementById("new").onclick = () => yt(), document.querySelectorAll("[data-unfriend]").forEach((e) => e.onclick = async () => {
		confirm(h("Remover {email} dos seus amigos? Os vibebooks em comum continuam.", { email: e.dataset.unfriend })) && (await fetch(`/api/friends/${encodeURIComponent(e.dataset.unfriend)}`, { method: "DELETE" }), lt());
	}), document.getElementById("addFriend").onsubmit = async (e) => {
		e.preventDefault(), await C("/api/friends", { email: e.target[0].value }).catch((e) => alert(e.message)), lt();
	}, wt(), Tt(), dn(), _t(), document.querySelectorAll("[data-archive]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation(), bt(e.dataset.archive, e.dataset.title);
	});
}
function _t() {
	let e = document.getElementById("ask"), t = document.getElementById("askText"), n = document.getElementById("askOut"), r = document.getElementById("askBtn");
	if (!e) return;
	t.oninput = () => {
		t.style.height = "auto", t.style.height = `${t.scrollHeight}px`;
	}, t.onkeydown = (t) => {
		t.key === "Enter" && !t.shiftKey && !t.isComposing && (t.preventDefault(), e.requestSubmit());
	};
	let i = (e) => `<b>${_(e.book_title)}</b>${e.epic_title ? ` → <b>${_(e.epic_title)}</b>` : ""}`, o = async (e) => {
		let r = t.value.trim();
		n.innerHTML = `<div class="why">${h("Enviando…")}</div>`;
		try {
			if (!e.book_id) return await vt(r);
			let t = e.book_id, n = await a(t).postMessage({
				text: r,
				thread: e.epic_id || "main"
			});
			if (!n.ok) throw Error(n.error);
			Ut = e.epic_id || null, f.pushState(null, "", `/b/${t}`), nt();
		} catch (e) {
			n.innerHTML = `<div class="why bad">${_(e.message)}</div>`;
		}
	};
	e.onsubmit = async (e) => {
		e.preventDefault();
		let a = t.value.trim();
		if (!a) return;
		r.disabled = !0, n.hidden = !1, n.innerHTML = `<div class="why">${h("Procurando a sala certa…")}</div>`;
		let s;
		try {
			s = await C("/api/route", { text: a });
		} catch (e) {
			n.innerHTML = `<div class="why">${_(e.message)}</div>`, r.disabled = !1;
			return;
		}
		r.disabled = !1;
		let c = (e) => e.length > 40 ? `${e.slice(0, 38)}…` : e, l = [...[s.pick, ...s.alternatives].filter(Boolean), {
			book_id: null,
			epic_id: null,
			new_title: s.new_room_title
		}], u = 0, d = (e) => e.book_id ? i(e) : h("sala nova <b>“{title}”</b>", { title: _(c(e.new_title)) }), ee = () => {
			let e = l[u];
			n.innerHTML = `<div class="where">${e.book_id ? h("Mandar em {where}?", { where: d(e) }) : s.pick ? h("Criar {where}?", { where: d(e) }) : h("Nenhuma sala parece a certa. Criar {where}?", { where: d(e) })}</div>
        ${u === 0 && s.pick && s.reason ? `<div class="why">${_(s.reason)}</div>` : ""}
        <div class="acts">
          <button type="button" class="primary" data-send="chat">${h("Enviar")}</button>
          <button type="button" class="ghost" data-cancel>${h("Cancelar")}</button>
        </div>
        ${l.length > 1 ? `<div class="acts alts"><span class="why">${h("Outro lugar:")}</span>${l.map((e, t) => t === u ? "" : `<button type="button" class="ghost" data-sel="${t}">${d(e)}</button>`).join("")}</div>` : ""}`, n.querySelectorAll("[data-send]").forEach((e) => e.onclick = () => o(l[u])), n.querySelectorAll("[data-sel]").forEach((e) => e.onclick = () => {
				u = Number(e.dataset.sel), ee(), n.querySelector("[data-send]")?.focus();
			}), n.querySelector("[data-cancel]").onclick = () => {
				n.hidden = !0, t.focus();
			};
		};
		ee(), n.querySelector("[data-send]")?.focus();
	};
}
async function vt(e) {
	let t = await C("/api/books/start", { text: e });
	f.pushState(null, "", `/b/${t.id}`), nt(), t.unknown?.length && setTimeout(() => B(h("Não achei {who} nos seus amigos: convide pelo email em Pessoas.", { who: _(t.unknown.join(", ")) })), 1500);
}
function yt() {
	let e = document.createElement("dialog");
	e.className = "newRoomDlg", e.innerHTML = `<form method="dialog"><h3>${h("Novo vibebook")}</h3>
    <label for="nrText">${h("O que é e com quem?")}</label>
    <textarea id="nrText" rows="3" placeholder="${h("Ex.: viagem de avião pra SP com os dogs, eu e a Alexia")}"></textarea>
    <p class="muted">${h("Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.")}</p>
    <p class="err" hidden></p>
    <div class="acts"><button type="button" class="ghost" value="no">${h("Cancelar")}</button><button class="primary" value="yes">${h("Criar")}</button></div></form>`, document.body.appendChild(e), e.addEventListener("close", () => e.remove());
	let t = e.querySelector("textarea"), n = e.querySelector("[value=\"yes\"]"), r = e.querySelector(".err");
	e.querySelector("[value=\"no\"]").onclick = () => e.close(), t.onkeydown = (e) => {
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), n.click());
	}, n.onclick = async (i) => {
		i.preventDefault();
		let a = t.value.trim();
		if (!a) return t.focus();
		n.disabled = !0, n.textContent = h("Criando…");
		try {
			await vt(a), e.close();
		} catch (e) {
			r.hidden = !1, r.textContent = e.message, n.disabled = !1, n.textContent = h("Criar");
		}
	}, e.showModal(), t.focus();
}
function bt(e, t) {
	let n = document.createElement("dialog");
	n.innerHTML = `<h3>${h("Arquivar “{title}”?", { title: _(t) })}</h3>
    <p class="muted" style="margin:0 0 6px">${h("Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.")}</p>
    <div class="acts"><button type="button" class="ghost" value="no">${h("Cancelar")}</button><button type="button" class="primary" value="yes">${h("Arquivar")}</button></div>`, document.body.appendChild(n), n.addEventListener("close", () => n.remove()), n.querySelector("[value=\"no\"]").onclick = () => n.close(), n.querySelector("[value=\"yes\"]").onclick = async () => {
		await C(`/api/books/${e}/archive`, { archived: !0 }).catch((e) => alert(e.message)), n.close(), lt();
	}, n.showModal(), n.querySelector("[value=\"yes\"]").focus();
}
async function xt() {
	document.title = `${h("Arquivo")} · vibebook`, jn(null);
	let { books: e } = await C("/api/archived");
	g.innerHTML = `
  <div class="home">
    <header class="top"><div class="brand"><a href="/app" data-nav>vibebook</a></div></header>
    <div class="hello"><div class="helloText"><h1>${h("Arquivo")}</h1><p>${h("Salas que você arquivou. Elas continuam existindo pra quem está nelas.")}</p></div>
      <a class="ghost" data-nav href="/app" style="text-decoration:none">${D("back")} ${h("Voltar")}</a></div>
    <main>${e.length ? `<div class="cards">${e.map((e) => `
      <div class="card" style="cursor:default">
        <div class="cover" style="background-color:${Dn(e.title)};filter:grayscale(.6)"><span>${_(F(e.title))}</span></div>
        <div class="info"><b>${_(e.title)}</b><div class="sum">${_(e.summary || "")}</div>
          <div class="meta"><span>${h("arquivada {ago}", { ago: S(e.archived_at) })}</span><span><a data-nav href="/b/${e.id}">${h("abrir")}</a> · <button type="button" class="link" data-restore="${e.id}">${h("Restaurar")}</button></span></div></div>
      </div>`).join("")}</div>` : `<div class="empty">${h("Nada arquivado.")}</div>`}</main>
  </div>`, document.querySelectorAll("[data-restore]").forEach((e) => e.onclick = async () => {
		await C(`/api/books/${e.dataset.restore}/archive`, { archived: !1 }), xt();
	});
}
var St = 0, Ct = 0;
async function wt(e) {
	clearTimeout(St), Ct = e ? Ct + 1 : 0;
	let t = document.getElementById("agentBox");
	if (!t) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (n && document.body.contains(t)) {
		if (`${location.origin}`, n.agents.length) {
			let e = Date.now(), r = (e) => e.used_at ?? e.connected_at, i = (t) => e - r(t) > 12096e5, a = {};
			for (let e of n.agents) (a[e.client] ??= []).push(e);
			for (let e of Object.values(a)) e.sort((e, t) => r(t) - r(e));
			let o = (e) => e.used_at ? h("usado {ago}", { ago: S(e.used_at) }) : e.used_at === null ? h("sem uso ainda") : h("uso desconhecido");
			t.innerHTML = `<h2>✦ ${h("Seus agents conectados")}</h2>
      ${Object.entries(a).map(([e, t]) => `<div class="connGroup"><div class="connHead"><b>${_(e)}</b><small>${t.length}</small></div>
        ${t.map((e) => `<label class="conn"><input type="checkbox" data-gid="${_(e.id)}" ${i(e) ? "checked" : ""} /><span>${h("conectado {ago}", { ago: S(e.connected_at) })}<small>${o(e)}</small></span></label>`).join("")}</div>`).join("")}
      <div class="connActs"><button type="button" class="ghost" id="connKeep">${h("Marcar todas menos a mais recente de cada")}</button><button type="button" class="primary" id="connDel"></button></div>
      <p style="margin-top:8px">${h("Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>")}</p>`;
			let s = () => [...t.querySelectorAll("[data-gid]")], c = () => {
				let e = s().filter((e) => e.checked).length, n = t.querySelector("#connDel");
				n.textContent = h("Remover selecionadas ({n})", { n: e }), n.disabled = !e;
			};
			t.addEventListener("change", c), c(), t.querySelector("#connKeep").onclick = () => {
				t.querySelectorAll(".connGroup").forEach((e) => e.querySelectorAll("[data-gid]").forEach((e, t) => e.checked = t > 0)), c();
			}, t.querySelector("#connDel").onclick = async () => {
				let e = s().filter((e) => e.checked).map((e) => e.dataset.gid);
				e.length && confirm(h("Remover {n} conexões? Os agents delas perdem o acesso na hora.", { n: e.length })) && (await fetch("/api/agents/revoke", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ ids: e })
				}), wt());
			};
		} else t.hidden = !0, Pt(document.getElementById("setupCard"));
	}
}
function Tt() {
	let e = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], t = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}`, n = (n, r) => {
		let i = E.indexOf(n);
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${i}">${r ? "" : Ie(T.find((e) => e.id === n.book_id) || {
			id: n.book_id,
			title: n.room
		}, "sm")}
        <span class="wt"><small>${r ? "" : `${_(n.room)}${n.topic ? " › " : ""}`}${n.topic ? _(n.topic) : r ? h("sala principal") : ""} · ${S(n.ts)}</small>
        ${n.ref.startsWith("t") ? `<b>${h("Tarefa sua esperando OK:")}</b> ${_(n.text)}` : `<b>${_(e(n))}:</b> ${_(n.text.length > 160 ? `${n.text.slice(0, 158)}…` : n.text)}`}</span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${i}" title="${h("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${h("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${D("check")}</button>` : ""}
    </li>`;
	}, r = document.getElementById("waitN");
	r && (r.innerHTML = E.length ? ` · <b class="waitTot">${h("{n} esperando você", { n: E.length })}</b>` : "");
	let i = (n) => {
		let r = E.indexOf(n), i = n.ref.startsWith("t");
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${r}"><span class="wIc${i ? " task" : ""}">${i ? D("check", 16) : x(n.author)}</span>
        <span class="wt"><span class="wTx">${_(n.text.length > 200 ? `${n.text.slice(0, 198)}…` : n.text)}</span>
        <small>${i ? h("sua tarefa esperando OK") : h("{who} pediu", { who: _(e(n)) })} · ${n.topic ? _(n.topic) : h("sala principal")} · ${S(n.ts)}</small></span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${r}" title="${h("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${h("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${D("check")}</button>` : ""}
    </li>`;
	};
	document.querySelectorAll("[data-cw]").forEach((e) => {
		let t = E.filter((t) => t.book_id === e.dataset.cw);
		e.hidden = !t.length, e.innerHTML = t.length ? `<ul>${t.slice(0, 3).map(i).join("")}</ul>${t.length > 3 ? `<details><summary>${h("+{n} mais", { n: t.length - 3 })}</summary><ul>${t.slice(3).map(i).join("")}</ul></details>` : ""}` : "";
		let n = document.querySelector(`[data-wc="${e.dataset.cw}"]`);
		n && (n.innerHTML = t.length ? `<b class="wChip">${h("{n} esperando você", { n: t.length })}</b>` : "");
	});
	let a = document.getElementById("waits");
	a && (a.hidden = !E.length, a.innerHTML = E.length ? `<h2>${h("Esperando você")} <small>${E.length}</small></h2><ul>${E.map((e) => n(e, !1)).join("")}</ul>` : ""), document.querySelectorAll("[data-wait-done]").forEach((e) => e.onclick = () => {
		let t = E[Number(e.dataset.waitDone)];
		E = E.filter((e) => e !== t), Tt(), A(), C("/api/waits/resolve", {
			book_id: t.book_id,
			ref: t.ref
		}).catch(() => {});
	});
}
var Et = !1, Dt = 0;
function Ot() {
	Dt++;
	let e = document.getElementById("inbox");
	e?._unmount?.(), e && (e._unmount = null);
}
function kt() {
	document.getElementById("inbox")?._unmount?.updateWaits(E);
	let e = document.getElementById("inboxBtn");
	if (!e) return;
	let t = E.length, n = e.querySelector(".kN");
	n.hidden = !t, n.textContent = t, n.className = `kN${Te(E)}`;
}
var At = () => Promise.resolve(l);
function jt() {
	Ot();
	let e = Dt, t = document.getElementById("inbox");
	t || (t = document.createElement("div"), t.id = "inbox", document.body.appendChild(t));
	let n = () => {
		e === Dt && Ot();
	};
	At().then(({ mountInbox: r }) => {
		e === Dt && (t.replaceChildren(), t._unmount = r(t, {
			waits: E,
			roomId: j?.id ?? null,
			all: Et,
			vb: {
				t: h,
				ago: S
			},
			displayName: y,
			avatarUrl: (e) => {
				let t = j?.avatars?.[e] ?? b[e];
				return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : void 0;
			},
			ontab: (e) => Et = e,
			onclose: n,
			onopen: (e, t) => {
				n();
				let r = /^[mab]/.test(e.ref) ? Number(e.ref.slice(1)) : 0;
				j?.id === e.book_id && (t.preventDefault(), r ? Di(r, e.thread) : e.thread !== M && (M = e.thread, z(), Z(), $()));
			},
			onresolve: async (e) => {
				await C("/api/waits/resolve", {
					book_id: e.book_id,
					ref: e.ref
				}), E = E.filter((t) => t.book_id !== e.book_id || t.ref !== e.ref), A(), Tt(), j && z();
			}
		}));
	}).catch(() => B(h("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
	e.target.closest?.("#inboxBtn") && jt();
});
var Mt = 0, Nt = !1;
async function Pt(e, t) {
	if (clearTimeout(Mt), !e) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (!n || !document.body.contains(e)) return;
	if (Nt = !n.agents.length, j && e.id === "agentNudge" && Gn(), n.agents.length) {
		e.dataset.waiting ? (e.innerHTML = `<div class="setup done"><span class="setupIcon">${D("check", 22)}</span><div><b>${h("Seu agent conectou.")}</b><span>${h(t ? "Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo." : "Ele já enxerga as suas salas.")}</span></div></div>`, delete e.dataset.waiting, setTimeout(() => {
			document.body.contains(e) && (e.innerHTML = "", e.hidden = !0);
		}, 6e3), t || wt()) : (e.innerHTML = "", e.hidden = !0);
		return;
	}
	let r = e.id === "agentNudge", i = !1;
	try {
		i = localStorage.getItem("vb.setupOff") === "1";
	} catch {}
	if (r && i) {
		e.innerHTML = "", e.hidden = !0;
		return;
	}
	let a = `Read ${location.origin}/llms.txt and set up vibebook for this project.${t ? ` Room: ${location.origin}/b/${t}` : ""}`;
	if (!e.dataset.waiting) {
		e.dataset.waiting = "1", e.hidden = !1;
		let n = `${location.origin}/mcp`;
		e.innerHTML = `<div class="setup">
      <div class="setupHead">${r ? `<button class="ghost setupX" data-setupx aria-label="${h("Fechar")}" title="${h("Fechar")}">×</button>` : ""}<span class="setupIcon">✻</span><div><b>${h(t ? "Traga seu agent pra esta sala" : "Conecte seu agent")}</b>
        <span>${h("O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:")}</span></div></div>
      <div class="setupCmd"><code>${_(a)}</code><button class="primary" data-copycmd>${h("Copiar")}</button></div>
      <div class="setupFoot"><span class="wait">${h("esperando seu agent conectar…")}</span>
        <details><summary>${h("Claude.ai ou outro cliente")}</summary>
          <p><b>Claude.ai:</b> ${h("Configurações → Conectores → Adicionar conector personalizado, e cole")} <code data-copy>${_(n)}</code></p>
          <p><b>${h("Claude Code só com o conector:")}</b> <code data-copy>claude mcp add --transport http vibebook ${_(n)}</code></p>
          <p><a href="/connect" target="_blank" rel="noopener">${h("Passo a passo completo →")}</a></p>
        </details></div>
    </div>`;
		let i = e.querySelector("[data-setupx]");
		i && (i.onclick = () => {
			try {
				localStorage.setItem("vb.setupOff", "1");
			} catch {}
			clearTimeout(Mt), e.innerHTML = "", e.hidden = !0;
		});
		let o = e.querySelector("[data-copycmd]");
		o.onclick = async () => {
			try {
				await navigator.clipboard.writeText(a), o.textContent = `✓ ${h("Copiado")}`;
			} catch {
				o.textContent = h("Selecione e copie");
			}
			setTimeout(() => o.textContent = h("Copiar"), 2500);
		}, e.querySelectorAll("[data-copy]").forEach((e) => e.onclick = () => {
			navigator.clipboard?.writeText(e.textContent), e.classList.add("copied");
		});
	}
	let o = Number(e.dataset.polls || 0);
	o < 150 && (e.dataset.polls = String(o + 1), Mt = setTimeout(() => Pt(e, t), 4e3));
}
var Ft = null, It = i(), j = null, Lt = /* @__PURE__ */ new Map(), M = "main", Rt = [], zt = [], Bt = {
	m4a: "audio/x-m4a",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	aac: "audio/aac",
	ogg: "audio/ogg",
	oga: "audio/ogg",
	opus: "audio/ogg",
	webm: "audio/webm",
	flac: "audio/flac"
}, Vt = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif",
	"application/pdf",
	"text/html",
	"text/markdown",
	"text/plain",
	"text/csv",
	"audio/mp4",
	"audio/x-m4a",
	"audio/m4a",
	"audio/mpeg",
	"audio/mp3",
	"audio/wav",
	"audio/x-wav",
	"audio/wave",
	"audio/aac",
	"audio/x-aac",
	"audio/ogg",
	"audio/webm",
	"audio/flac",
	"audio/x-flac"
], Ht = (e, t) => D(e.type === "text/html" ? "globe" : e.type.startsWith("audio/") ? "mic" : "file", t), Ut = null, Wt = /* @__PURE__ */ new Map(), Gt = !1;
function Kt(e) {
	let t = (T || at?.books || []).find((t) => t.id === e), n = t?.title || "";
	document.title = `${n || "vibebook"} · vibebook`;
	let r = Fe(t), i = (e) => r ? `<span class="${e} hasIcon"><img src="${r}" alt=""></span>` : n ? `<span class="${e}" style="background:${Dn(n)}">${_(F(n))}</span>` : `<span class="${e}"></span>`, a = (e) => `<div class="thread"><span class="ri sk"></span><i style="width:${e}%"></i></div>`, o = (e, t) => `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${e}px"></i><i class="s" style="width:${t}%"></i></div></div>`;
	return `<div class="book skel ${Mn ? "rail" : ""}" aria-busy="true" aria-label="${h("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${i("ri roomIco")}<span class="rt">${_(n)}</span></div>${a(70)}${a(55)}${a(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${h("Seus vibebooks")}">${D("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${i("ri roomIco phOnly")}<span>${_(n)}</span></span></h2></div>
      <div class="msgs">${o(90, 60)}${o(120, 45)}${o(70, 70)}${o(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${h("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${h("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function qt(e) {
	M = Ut || new URLSearchParams(location.search).get("t") || "main", Ut = null, _a = !1, j = null, Lt.clear(), Gt = !1, zt = [], C("/api/me?ui=svelte").then((e) => {
		st(e), Rt = e.friends.map((e) => e.email), T = e.books, E = e.waits || [], A(), z(), j && jn(P());
	}).catch(() => {});
	let t = Wt.get(e);
	t ? (j = t, !t.epics.some((e) => e.id === M) && !M.startsWith("pre:") && (M = "main"), gn()) : g.innerHTML = Kt(e);
	let n = ae({
		url: (t) => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${e}?t=${encodeURIComponent(I() ? "main" : M)}${t ? `&rc=${t}` : ""}`,
		onEvent: (t) => {
			Ft === n && on(t, e);
		},
		onRemoved: () => {
			Ft === n && (tn(), g.innerHTML = `<div class="home"><p>${h("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${D("back")} ${h("seus vibebooks")}</a></div>`);
		},
		onUnavailable: () => {
			Ft === n && (tn(), g.innerHTML = `<div class="home"><p>${h("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${h("voltar")}</a></div>`);
		}
	});
	Ft = n, n.start();
}
var N = (e) => Ft?.send(e) ?? !1, Jt = /* @__PURE__ */ new Map(), Yt = () => {}, Xt = null, Zt = null, Qt = /* @__PURE__ */ new WeakSet();
function $t(e) {
	let t = Jt.get(e);
	t && (t.target._mo?.disconnect(), t.destroy(), Jt.delete(e));
}
function en(e, t, n, r = !1) {
	let i = Jt.get(e);
	i && (i.target !== t || r) && ($t(e), i = null), i ? i.update(n) : (t.replaceChildren(), i = {
		...s(e, t, n),
		target: t
	}, Jt.set(e, i));
}
function tn() {
	Xt = null, e(Zt), Zt = null, Yt(), Yt = () => {}, Cn();
	for (let e of Jt.keys()) $t(e);
	Ea.disconnect();
}
var nn = () => ({
	t: h,
	icon: D,
	avatar: x,
	ago: S,
	name: y,
	color: v,
	initials: F,
	mentions: ge,
	locale: m
}), rn = () => ({
	t: h,
	icon: D,
	name: y,
	avatar: x,
	agentAvatar: de,
	ago: S,
	hhmm: ui,
	continues: di,
	remHtml: Li,
	issueHtml: Ii,
	isNotice: Ri,
	noticeHtml: zi,
	mentions: ge,
	md: we,
	linkify: Se,
	esc: _,
	quoteHtml: bi,
	attHtml: ci,
	cardHtml: Oi,
	choiceHtml: Ni,
	pollHtml: li,
	threadCards: hi,
	typingLabel: (e) => sn[e] ?? e,
	typingNote: (e) => Lt.get(e),
	dateTime: (e) => new Date(e).toLocaleString(m),
	waiting: (e) => E.some((t) => t.book_id === j.id && t.ref === `m${e}`)
});
function an(e) {
	M = e, Vr = e === "main" ? null : e, Q = !1, Hr(), z(), Z(), V(), $();
}
function on(e, t) {
	if (location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1] !== t) return;
	let n = j;
	if (e.t === "epicsPatch" && j) {
		let t = /* @__PURE__ */ new Set([...j.epics.map((e) => e.id), ...e.changed.map((e) => e.id)]);
		if (e.order.some((e) => !t.has(e))) {
			Ft?.resync();
			return;
		}
	}
	switch (It.get() !== j && It.replace(j), j = It.apply(e, t), j && Wt.set(t, j), e.t) {
		case "state": {
			let e = !n;
			Lt.clear(), Gt = !0, ha = !1;
			for (let e of [...ga]) e.startsWith(t) && ga.delete(e);
			for (let e of [...Fa]) e.startsWith(t) && Fa.delete(e);
			Wt.delete(t), Wt.set(t, j), Wt.size > 12 && Wt.delete(Wt.keys().next().value), j.messages.length && Le(j.messages.at(-1).id), Rn(), e ? gn() : (z(), Z(Ta ? void 0 : "stay"), $(!0), Yr(), V(), la(), Hi(), ca(), Vi(), Ca(), kr());
			return;
		}
		case "closed":
			Z("stay");
			return;
		case "moved":
			j.messages.find((t) => t.id === e.id) && (Z(!0), gi(), z());
			break;
		case "msg":
			Le(e.m.id), e.m.thread !== "main" && M === "main" && gi(), e.m.thread === M && (wa(e.m), _i(), e.m.files?.length && ya()), z(), e.m.reply_to && e.m.thread !== M && Z("stay"), hn(e.m);
			return;
		case "delta":
			Lt.delete(e.id), Z(Ta ? void 0 : "stay");
			return;
		case "typing":
			e.note ? Lt.set(e.id, e.note) : Lt.delete(e.id), Z("stay");
			return;
		case "epicsPatch":
		case "epics":
			M !== "main" && !I() && !j.epics.some((e) => e.id === M) && (M = "main"), z(), Yr(), V(), _i(), M === "main" && gi();
			return;
		case "docNotes":
			$();
			return;
		case "doc": {
			let t = (e.epic || null) === Ia();
			if (e.stale) {
				t ? N({
					t: "doc.get",
					epic: e.epic
				}) : Fa.delete(j.id + e.epic);
				return;
			}
			(t || e.fetched) && $();
			return;
		}
		case "meta":
			if (e.title) {
				let n = T?.find((e) => e.id === t);
				n && (n.title = e.title, A());
			}
			z(), Yr();
			return;
		case "suggestions": {
			let e = I() ? n?.suggestions[Number(M.slice(4))]?.title : void 0;
			if (In !== null) {
				let e = j.suggestions.length;
				M = e ? `pre:${Math.min(In, e - 1)}` : "main", In = null, Z();
			} else if (I() && Fn()?.title !== e) {
				let t = j.suggestions.findIndex((t) => t.title === e);
				M = t >= 0 ? `pre:${t}` : "main", Z();
			}
			z();
			return;
		}
		case "requests":
			z();
			return;
		case "members":
			z();
			return;
		case "files":
			z(), la(), Yi(), ni();
			return;
		case "fileAdd":
			z(), la(), Yi(), ni(), ya();
			return;
		case "reminders":
			ca();
			return;
		case "decisions":
			Vi();
			return;
		case "conns":
			K = null, document.querySelector(".doc[data-pane=\"apps\"]") && !q ? J() : q || Ki();
			return;
		case "pins":
			z(), la(), Hi();
			return;
		case "error":
			B(_(e.error || h("falhou")));
			return;
		case "receipts":
			Ca();
			return;
		case "older":
			if (ha = !1, e.more || (ma[j.id + e.thread] = !0), e.thread === M && (Y.n += e.messages.length, Z(!ga.delete(j.id + e.thread))), Ei && e.thread === M) {
				let t = Ei;
				j.messages.some((e) => e.id === t.id) ? (Ei = null, setTimeout(() => Di(t.id), 50)) : e.more && ++t.n < 15 ? ba() : (Ei = null, B(h("Não achei essa mensagem nesta sala.")));
			}
			return;
		case "acks":
			Ca(), z(), kr();
			return;
		case "ackRows":
			Ca(), z(), kr();
			return;
		case "poll":
			Z("stay");
			return;
		case "online":
			z();
			return;
		case "blocked": {
			let t = document.getElementById("input");
			t && !t.value && (t.value = e.text), alert(h("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: e.reason }));
			return;
		}
	}
}
var sn = {
	route: h("escolhendo o modelo"),
	fast: h("rápido"),
	smart: h("com calma")
}, cn = {
	on: D("bell", 20),
	off: D("bellOff", 20)
}, ln = () => "Notification" in window ? Notification.permission : "unsupported", un = () => {
	try {
		return localStorage.getItem("vb.mute") === "1";
	} catch {
		return !1;
	}
};
function dn() {
	let e = ln(), t = un(), n = e === "granted" ? t ? "muted" : "on" : e, r = {
		on: h("Notificações ligadas: clique pra silenciar"),
		muted: h("Notificações silenciadas: clique pra ligar"),
		default: h("Ativar notificações de mensagem"),
		denied: h("Notificações bloqueadas no navegador"),
		unsupported: h("Este navegador não tem notificações")
	}[n];
	document.querySelectorAll("[data-bell]").forEach((e) => {
		e.className = `ghost bell ${n}`, e.innerHTML = n === "on" ? cn.on : cn.off, e.title = r, e.setAttribute("aria-label", r), e.onclick = async () => {
			if (pn(), n === "default") {
				if (await Notification.requestPermission(), ln() === "granted") {
					try {
						localStorage.removeItem("vb.mute");
					} catch {}
					mn();
				}
			} else if (n === "denied") alert(h("As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página."));
			else if (n === "on" || n === "muted") {
				try {
					localStorage.setItem("vb.mute", n === "on" ? "1" : "");
				} catch {}
				n === "muted" && mn();
			}
			dn();
		};
	});
}
var fn = null, pn = () => {
	try {
		fn ??= new AudioContext(), fn.resume();
	} catch {}
};
document.addEventListener("pointerdown", pn, { once: !0 });
function mn() {
	if (!fn) return;
	let e = fn.currentTime;
	[[880, 0], [1318.5, .12]].forEach(([t, n]) => {
		let r = fn.createOscillator(), i = fn.createGain();
		r.type = "sine", r.frequency.value = t, i.gain.setValueAtTime(0, e + n), i.gain.linearRampToValueAtTime(.18, e + n + .02), i.gain.exponentialRampToValueAtTime(.001, e + n + .5), r.connect(i).connect(fn.destination), r.start(e + n), r.stop(e + n + .55);
	});
}
function hn(e) {
	let t = e.kind === "agent" || e.author === "ai";
	if (e.author === j.me && !t || e.quiet || un()) return;
	let n = e.text && [...e.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu)].some((e) => he(e[1]) === j.me);
	if ((!t || e.author === j.me || n || e.for_who === j.me || j.messages.find((t) => t.id === e.reply_to)?.author === j.me) && (document.hidden || e.thread !== M || n) && (mn(), ln() === "granted" && document.hidden)) {
		let t = e.author === "ai" ? "@vibe" : e.kind === "agent" ? h("{via} de {who}", {
			via: e.via || "agent",
			who: y(e.author)
		}) : y(e.author), r = new Notification(`${n ? `${h("Te mencionaram")} · ` : ""}${t} · ${j.book?.title ?? "vibebook"}`, {
			body: (e.text || (e.author === "ai" ? h("respondendo…") : `📎 ${h("anexo")}`)).slice(0, 180),
			tag: `vb-${j.id}`,
			icon: "/apple-touch-icon.png"
		});
		r.onclick = () => {
			window.focus(), r.close();
		};
	}
}
function gn() {
	tn(), document.title = `${j.book?.title ?? "vibebook"} · vibebook`, g.innerHTML = `
  <div class="book ${Mn ? "rail" : ""}">
    <aside class="side tw:[@media(max-width:900px)]:max-h-[calc(var(--vvh,100dvh)_-_max(96px,var(--vvh,100dvh)*.2))]!" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${h("Seus vibebooks")}" title="${h("Seus vibebooks")}">${D("back", 20)}</a><h2 id="threadTitle"></h2><button class="ghost" id="toggleBoard" title="${h("Quadro de tarefas (kanban)")}" aria-pressed="false">${D("board")}<span class="lbl">${h("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${h("Caixa de entrada: o que espera por você")}" aria-label="${h("Caixa de entrada")}">${D("inbox")}<b class="kN" hidden></b></button><button class="ghost bell" data-bell></button><button class="ghost" id="myClaude" aria-pressed="false" hidden>✻ <span class="lbl">Agent</span></button><button class="ghost" id="toggleDoc" title="${h("mostrar/ocultar documento")}">${D("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek" role="toolbar" aria-label="${h("Documento e arquivos da sala")}"><div class="peekRow"><button type="button" class="peekDoc" data-pane="doc" id="peekTxt" aria-label="${h("Abrir documento")}"></button><button type="button" data-pane="files" title="${h("Arquivos")}" aria-label="${h("Arquivos")}">${D("paperclip", 18)}<small id="peekFiles"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${D("chart", 18)}</button><button type="button" data-pane="decisions" title="${h("Decisões")}" aria-label="${h("Decisões")}">${D("check", 18)}</button><button type="button" data-pane="reminders" title="${h("Lembretes")}" aria-label="${h("Lembretes")}">${D("clock", 18)}<small id="peekRem"></small></button><button type="button" class="peekAgents" data-pane="agents" title="Agents" aria-label="Agents">${ke}<i class="qDot"></i><small class="qN"></small></button></div><i class="grab"></i></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div class="agentNudge" id="agentNudge" hidden></div><div class="claudeBar" id="claudeBar" hidden></div><div class="askBar" id="askBar" hidden></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <form class="composer" id="composer">
        <div class="tray" id="tray"></div>
        <div class="replyBar" id="replyBar" hidden></div>
        <div class="mentionPop" id="mentionPop" role="listbox" aria-label="${h("Mencionar")}" hidden></div>
        <div class="row">
          <button type="button" class="ghost icon emojiBtn" id="emojiBtn" title="${h("Emoji")}" aria-label="${h("Emoji")}" aria-haspopup="dialog" aria-expanded="false">🙂</button>
          <div class="mentionPop emojiPop" id="emojiPop" role="dialog" aria-label="${h("Emoji")}" hidden><input type="search" id="emojiQ" placeholder="${h("Buscar emoji…")}" autocomplete="off"><div class="eGrid" id="emojiGrid"></div></div>
          <button type="button" class="ghost icon" id="plusBtn" title="${h("Anexar, mencionar, votação")}" aria-label="${h("Mais opções")}" aria-haspopup="menu" aria-expanded="false">${D("plus", 18)}</button>
          <div class="mentionPop plusMenu" id="plusMenu" role="menu" hidden>
            <button type="button" role="menuitem" id="attach">${D("paperclip")} ${h("Anexar arquivo")} <small>${h("ou Cmd+V")}</small></button>
            <button type="button" role="menuitem" id="mentionBtn">${D("at")} ${h("Mencionar alguém")} <small>@</small></button>
            <button type="button" role="menuitem" id="pollBtn">${D("chart")} ${h("Criar votação")}</button>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac" multiple hidden />
          <textarea id="input" rows="1" placeholder="${h("Mensagem…")}"></textarea><button class="primary" id="sendBtn">${h("Enviar")}</button>
        </div>
      </form>
    </main>
    <section class="doc">
      <button type="button" class="docEditBar" id="docEditBar"></button>
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${h("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${h("Redimensionar documento")}" tabindex="0"></div>
      <header><div class="ptabs" role="tablist"><button type="button" class="ptDoc" data-pane="doc">${D("doc", 16)} Doc</button><button type="button" class="ptBoard" data-pane="board" title="${h("Quadro de tarefas")}" aria-label="${h("Quadro de tarefas")}">${D("board", 17)}<b class="kN" hidden></b></button><button type="button" data-pane="files" title="${h("Arquivos")}" aria-label="${h("Arquivos")}">${D("paperclip", 17)}<small id="fileCount"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${D("chart", 17)}<small id="appCount"></small></button><button type="button" data-pane="decisions" title="${h("Decisões")}" aria-label="${h("Decisões")}">${D("check", 17)}<small id="decCount"></small></button><button type="button" data-pane="reminders" title="${h("Lembretes")}" aria-label="${h("Lembretes")}">${D("clock", 17)}<small id="remCount"></small></button><button type="button" class="ptAgents" data-pane="agents" title="Agents" aria-label="Agents">${ke}<i class="qDot"></i><small class="qN"></small></button></div><div class="seg" role="group" aria-label="${h("Modo do documento")}"><button type="button" data-view="preview">${h("Ver")}</button><button type="button" data-view="edit">${h("Editar")}</button></div></header>
      <div class="docCrumb" id="docCrumb" hidden></div>
      <div class="preview" id="preview"></div>
      <textarea id="doc" placeholder="${h("O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.")}"></textarea>
      <div class="cm" id="cm"></div>
      <div class="filesPane" id="filesPane"></div>
      <div class="decPane" id="decPane"></div>
      <div class="appsPane connsPane" id="appsPane"></div>
      <div class="remPane" id="remPane"></div>
      <div class="agentsPane" id="agentsPane"></div>
    </section>
    <div class="sheetDim" id="sheetDim"></div>
  </div>
  <dialog id="pollDlg">
    <h3>${h("Nova votação")}</h3>
    <form id="pollForm">
      <input name="q" required maxlength="300" placeholder="${h("Pergunta (ex.: Qual cruzeiro?)")}" />
      <div id="pollOpts" style="display:grid;gap:8px"></div>
      <button type="button" class="link" id="addOpt" style="justify-self:start">+ ${h("opção")}</button>
      <label style="display:flex;gap:8px;align-items:center;font-size:14px"><input type="checkbox" name="multi" /> ${h("cada pessoa pode escolher várias")}</label>
      <div class="acts"><button type="button" id="pollCancel">${h("Cancelar")}</button><button class="primary">${h("Criar votação")}</button></div>
    </form>
  </dialog>`;
	let e = g.querySelector(".book"), t = new ResizeObserver(() => {
		let t = e.querySelector(".chathead").getBoundingClientRect().height, n = document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
		document.documentElement.style.setProperty("--headH", `${Math.round(t)}px`), document.documentElement.style.setProperty("--peekH", `${Math.round(n)}px`);
	});
	t.observe(e.querySelector(".chathead")), t.observe(document.getElementById("docPeek")), Jr(document.getElementById("docPeek"), "doc", !0, (t) => {
		let n = t.target.closest("[data-pane]")?.dataset.pane || "doc";
		if (e.dataset.sheet === "doc" && e.dataset.pane === n) return U();
		e.classList.contains("boardview") && document.getElementById("toggleBoard").click(), pe(n), Kr("doc");
	}), Jr(document.getElementById("docGrab"), "doc", !1), document.getElementById("sheetDim").onclick = () => U(), document.getElementById("toggleDoc").onclick = () => e.classList.toggle("nodoc");
	let n = (t) => {
		document.body.contains(e) && (t && ne(e, e.querySelector(":scope > .chat"), e.querySelector(":scope > .chat > #composer")), e.classList.toggle("boardview", t), e.classList.toggle("nodoc", t), document.getElementById("toggleBoard").setAttribute("aria-pressed", String(t)), t && (U(), V()));
	};
	document.getElementById("toggleBoard").onclick = () => n(!e.classList.contains("boardview"));
	let r = (t) => {
		t = Math.round(Math.min(Math.max(t, 260), window.innerWidth - 260 - 320)), e.style.setProperty("--doc-w", `${t}px`);
		try {
			localStorage.setItem("vb.docW", t);
		} catch {}
	};
	try {
		let e = Number(localStorage.getItem("vb.docW"));
		e && r(e);
	} catch {}
	let i = document.getElementById("resizer");
	i.onpointerdown = (e) => {
		e.preventDefault(), i.setPointerCapture(e.pointerId), i.classList.add("drag"), document.body.classList.add("resizing"), i.onpointermove = (e) => r(window.innerWidth - e.clientX), i.onpointerup = () => {
			i.onpointermove = null, i.classList.remove("drag"), document.body.classList.remove("resizing");
		};
	}, i.ondblclick = () => r(380), i.onkeydown = (e) => {
		let t = document.querySelector(".doc").getBoundingClientRect().width;
		e.key === "ArrowLeft" ? r(t + 24) : e.key === "ArrowRight" && r(t - 24);
	};
	let o = document.getElementById("input");
	{
		let e = document.getElementById("emojiBtn"), t = document.getElementById("emojiPop"), n = document.getElementById("emojiQ"), r = document.getElementById("emojiGrid"), i = [...new Map(Object.entries(be).map(([e, t]) => [t, e])).entries()], a = () => {
			let e = n.value.trim().toLowerCase().replace(/:/g, "");
			r.innerHTML = i.filter(([t, n]) => !e || Object.entries(be).some(([n, r]) => r === t && n.includes(e))).map(([e, t]) => `<button type="button" title=":${_(t)}:" data-emoji="${e}">${e}</button>`).join("");
		}, s = () => {
			t.hidden = !0, e.setAttribute("aria-expanded", "false");
		};
		e.onclick = (r) => {
			if (r.stopPropagation(), !t.hidden) return s();
			n.value = "", a(), t.hidden = !1, e.setAttribute("aria-expanded", "true"), matchMedia("(pointer: coarse)").matches || n.focus();
		}, n.oninput = a, n.onkeydown = (e) => {
			e.key === "Escape" && (s(), o.focus()), e.key === "Enter" && (e.preventDefault(), r.querySelector("button")?.click());
		}, r.onclick = (e) => {
			let t = e.target.closest("[data-emoji]");
			if (!t) return;
			let n = o.selectionStart ?? o.value.length, r = o.selectionEnd ?? n;
			o.value = o.value.slice(0, n) + t.dataset.emoji + o.value.slice(r), o.focus(), o.selectionStart = o.selectionEnd = n + t.dataset.emoji.length, o.dispatchEvent(new Event("input")), s();
		}, document.addEventListener("click", (n) => {
			!t.hidden && !t.contains(n.target) && n.target !== e && s();
		});
	}
	let s = document.getElementById("mentionPop"), c = [], l = 0, u = -1, d = () => {
		s.hidden = !0, c = [], u = -1;
	}, ee = (e) => {
		let t = c[e];
		if (!t) return;
		let n = o.selectionStart;
		o.value = `${o.value.slice(0, u)}@${t.handle} ${o.value.slice(n)}`;
		let r = u + t.handle.length + 2;
		o.setSelectionRange(r, r), d(), o.focus(), o.oninput();
	}, te = () => {
		s.innerHTML = c.map((e, t) => `<button type="button" role="option" class="${t === l ? "sel" : ""}" data-i="${t}">${x(e.email)}<b>@${_(e.handle)}</b><small>${_(e.label)}</small></button>`).join(""), s.hidden = !c.length;
	};
	s.onmousedown = (e) => {
		let t = e.target.closest("[data-i]");
		t && (e.preventDefault(), ee(Number(t.dataset.i)));
	};
	let ie = () => {
		let e = o.value.slice(0, o.selectionStart), t = e.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
		if (!t) return d();
		u = e.length - t[2].length - 1;
		let n = fe(t[2]), r = [...(j.members || []).filter((e) => e !== j.me).map((e) => ({
			email: e,
			handle: me(e),
			label: y(e) === me(e) ? e : y(e)
		}))];
		if (L.id === j.id) for (let e of L.sandboxes || []) e.email === j.me && r.push({
			email: e.email,
			handle: e.name,
			label: h("seu agent no sandbox")
		});
		c = r.filter((e) => !n || e.handle.startsWith(n) || fe(e.label).includes(n)).slice(0, 8), l = 0, te();
	};
	o.oninput = () => {
		o.style.height = "auto", o.style.height = `${o.scrollHeight}px`, ie();
	}, o.onblur = () => setTimeout(d, 100), o.onkeydown = (e) => {
		if (!s.hidden && c.length) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") return e.preventDefault(), l = (l + (e.key === "ArrowDown" ? 1 : c.length - 1)) % c.length, te();
			if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) return e.preventDefault(), ee(l);
			if (e.key === "Escape") return e.preventDefault(), d();
		}
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), document.getElementById("composer").requestSubmit());
	};
	let ae = document.getElementById("tray"), p = document.getElementById("sendBtn");
	p.addEventListener("touchend", (e) => {
		p.disabled || (e.preventDefault(), document.getElementById("composer").requestSubmit());
	}), p.addEventListener("mousedown", (e) => e.preventDefault());
	let m = () => {
		ae.innerHTML = zt.map((e, t) => `<div class="pend ${!e.meta && !e.error ? "up" : ""} ${e.error ? "err" : ""}" title="${_(e.error || e.file.name)}">
      ${e.url ? `<img src="${e.url}" alt="">` : `${D("file", 22)}<br>${_(e.file.name.slice(0, 18))}`}${e.error ? `<span style="position:relative;z-index:1">${_(e.error)}</span>` : ""}
      <button type="button" class="rm" data-rm="${t}" aria-label="${h("Remover anexo")}">${D("x")}</button></div>`).join(""), ae.querySelectorAll("[data-rm]").forEach((e) => e.onclick = () => {
			let [t] = zt.splice(Number(e.dataset.rm), 1);
			t?.url && URL.revokeObjectURL(t.url), m();
		});
		let e = zt.some((e) => !e.meta && !e.error);
		p.disabled = e, p.textContent = h(e ? "Enviando…" : "Enviar");
	}, oe = (e) => {
		for (let t of e) {
			!t.type && /\.html?$/i.test(t.name) && (t = new File([t], t.name, { type: "text/html" })), !t.type && /\.md$/i.test(t.name) && (t = new File([t], t.name, { type: "text/markdown" }));
			let e = {
				txt: "text/plain",
				csv: "text/csv"
			}[(/\.(\w+)$/.exec(t.name)?.[1] || "").toLowerCase()];
			e && t.type !== e && (t = new File([t], t.name, { type: e }));
			let n = Bt[(/\.(\w+)$/.exec(t.name)?.[1] || "").toLowerCase()];
			if (n && !t.type.startsWith("audio/") && (t = new File([t], t.name, { type: n })), !Vt.includes(t.type)) {
				alert(`${t.name}: ${h("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}`);
				continue;
			}
			let r = t.type.startsWith("audio/");
			if (t.size > (r ? 50 : 10) * 1024 * 1024) {
				alert(`${t.name}: ${h(r ? "áudio maior que 50MB." : "maior que 10MB.")}`);
				continue;
			}
			t.name && t.name !== "image.png" || (t = new File([t], `print-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png`, { type: t.type }));
			let i = {
				file: t,
				url: t.type.startsWith("image/") ? URL.createObjectURL(t) : null
			};
			zt.push(i), a(j.id).uploadFile({
				name: t.name,
				type: t.type,
				body: t
			}).then((e) => {
				i.meta = e;
			}).catch((e) => {
				i.error = e.message || h("sem conexão");
			}).finally(m);
		}
		m();
	}, se = document.getElementById("fileInput"), ce = document.getElementById("plusBtn"), v = document.getElementById("plusMenu"), le = (e = v.hidden) => {
		v.hidden = !e, ce.setAttribute("aria-expanded", String(e));
	};
	ce.onclick = (e) => {
		e.stopPropagation(), le();
	}, ce.onmousedown = ce.onpointerdown = (e) => {
		document.activeElement?.id === "input" && e.preventDefault();
	}, v.onclick = () => le(!1), v.closest("main").addEventListener("click", (e) => {
		!v.hidden && !v.contains(e.target) && le(!1);
	}), v.onkeydown = (e) => {
		e.key === "Escape" && (le(!1), ce.focus());
	}, document.getElementById("mentionBtn").onclick = () => {
		let e = o.selectionStart ?? o.value.length, t = o.value.slice(0, e), n = t && !/\s$/.test(t) ? " @" : "@";
		o.value = t + n + o.value.slice(e), o.focus(), o.setSelectionRange(e + n.length, e + n.length), setTimeout(() => o.oninput(), 120);
	}, document.getElementById("attach").onclick = () => se.click(), se.onchange = () => {
		oe([...se.files]), se.value = "";
	}, document.onpaste = (e) => {
		let t = e.target, n = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName));
		if (!o.isConnected || n && t !== o) return;
		let r = [...e.clipboardData?.files ?? []];
		r.length || (r = [...e.clipboardData?.items ?? []].filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter(Boolean)), r.length && (e.preventDefault(), oe(r), o.focus());
	};
	let b = g.querySelector(".chat");
	b.addEventListener("dragover", (e) => {
		[...e.dataTransfer.types].includes("Files") && (e.preventDefault(), b.classList.add("drop"));
	}), b.addEventListener("dragleave", (e) => {
		b.contains(e.relatedTarget) || b.classList.remove("drop");
	}), b.addEventListener("drop", (e) => {
		e.preventDefault(), b.classList.remove("drop"), oe([...e.dataTransfer.files]);
	}), document.getElementById("composer").onsubmit = (e) => {
		if (e.preventDefault(), zt.some((e) => !e.meta && !e.error)) return;
		let t = o.value.trim(), n = zt.filter((e) => e.meta).map((e) => e.meta.id);
		(t || n.length) && (N({
			t: "msg",
			thread: M,
			text: t,
			files: n,
			reply_to: W?.id
		}), W = null, xi(), zt.forEach((e) => e.url && URL.revokeObjectURL(e.url)), zt = [], o.value = "", o.oninput(), m());
	};
	let ue = document.getElementById("pollDlg"), de = document.getElementById("pollOpts"), S = (e = "") => {
		de.insertAdjacentHTML("beforeend", `<input name="opt" maxlength="200" placeholder="${h("Opção {n}", { n: de.children.length + 1 })}" value="${_(e)}" />`);
	};
	document.getElementById("pollBtn").onclick = () => {
		document.getElementById("pollForm").reset(), de.innerHTML = "", S(), S(), S(), ue.showModal();
	}, document.getElementById("addOpt").onclick = () => {
		de.children.length < 10 && S(), de.lastElementChild.focus();
	}, document.getElementById("pollCancel").onclick = () => ue.close(), document.getElementById("pollForm").onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = [...t.querySelectorAll("[name=\"opt\"]")].map((e) => e.value.trim()).filter(Boolean);
		if (n.length < 2) return alert(h("Coloque pelo menos 2 opções."));
		N({
			t: "poll.create",
			thread: M,
			question: t.q.value,
			options: n,
			multi: t.multi.checked
		}), ue.close();
	}, document.getElementById("msgs").addEventListener("click", (e) => {
		let t = e.target.closest("[data-vote]");
		if (t) return N({
			t: "vote",
			id: t.closest("[data-poll]").dataset.poll,
			opt: Number(t.dataset.vote)
		});
		let n = e.target.closest("[data-close]");
		n && confirm(h("Encerrar a votação?")) && N({
			t: "poll.close",
			id: n.dataset.close
		});
	});
	let pe = (t) => {
		let n = e.querySelector(":scope > .doc");
		n && (n.dataset.pane = t, e.dataset.pane = t, n.querySelectorAll(":scope > header .ptabs button").forEach((e) => {
			e.classList.toggle("sel", e.dataset.pane === t), e.setAttribute("aria-selected", e.dataset.pane === t);
		}), t === "files" && (j.filesAll || N({ t: "files.get" }), la()), t === "decisions" && Vi(), t === "apps" && Hi(), t === "reminders" && ca(), t === "agents" && (Gn(), ir()), t === "board" && (ne(e, n), V()));
	};
	Yt = re(e, H, () => {
		n(!1), pe("board");
	}), g.querySelectorAll(".ptabs button").forEach((e) => e.onclick = () => pe(e.dataset.pane)), document.removeEventListener("click", Qn), document.removeEventListener("vb:pane", $n), Qn = (t) => {
		t.target.closest?.("[data-sbx-open]") && document.body.contains(e) && (U(), document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), H.matches && Kr("doc"));
	}, $n = (t) => {
		document.body.contains(e) && (e.classList.remove("nodoc"), pe(t.detail));
	}, document.addEventListener("click", Qn), document.addEventListener("vb:pane", $n), pe("doc");
	let he = document.getElementById("doc"), ge;
	he.oninput = () => {
		clearTimeout(ge), ge = setTimeout(() => {
			let e = Ia();
			e ? j.docs[e] = he.value : j.doc = he.value, N({
				t: "doc",
				text: he.value,
				epic: e || void 0
			});
		}, 400);
	}, he.onblur = () => $();
	let _e = g.querySelector(".doc");
	function ve(e) {
		let t = document.getElementById("docEditBar");
		t && (t.innerHTML = e === "edit" ? `${D("check", 16)} ${h("Pronto")}` : `${D("pencil", 16)} ${h("Editar")}`);
	}
	document.getElementById("docEditBar").onclick = () => ye(_e.dataset.view === "edit" ? "preview" : "edit");
	let ye = (e) => {
		_e.dataset.view = e, ve(e), _e.querySelectorAll(".seg button").forEach((t) => t.classList.toggle("sel", t.dataset.view === e));
		try {
			localStorage.setItem("vb.docView", e);
		} catch {}
		e === "edit" ? (wn(), (yn || he).focus()) : (wn(), $());
	};
	_e.querySelectorAll(".seg button").forEach((e) => e.onclick = () => ye(e.dataset.view));
	let xe = "preview";
	try {
		xe = localStorage.getItem("vb.docView") || "preview";
	} catch {}
	if (_e.dataset.view = xe, ve(xe), _e.querySelectorAll(".seg button").forEach((e) => e.classList.toggle("sel", e.dataset.view === xe)), z(), Z(), $(!0), la(), Hi(), ca(), Vi(), Pt(document.getElementById("agentNudge"), j.id), dn(), vn(), /^#m\d+$/.test(location.hash)) setTimeout(() => Di(Number(location.hash.slice(2))), 300);
	else if (/^#f[0-9a-f]+$/.test(location.hash)) {
		let e = location.hash.slice(2);
		f.replaceState(null, "", location.pathname + location.search), setTimeout(() => _n(e), 300);
	}
}
function _n(e, t) {
	let n = (j.files || []).find((t) => t.id === e) || X().flatMap((e) => e.files || []).find((t) => t.id === e);
	if (!n && !t && !j.filesAll) return N({ t: "files.get" }), setTimeout(() => _n(e, !0), 800);
	ei(`/api/books/${j.id}/files/${e}`, n?.type?.startsWith("image/") ? "img" : "frame", n?.name || h("arquivo"));
}
function vn() {
	let e = `vb.welcomed.${j.me}`;
	try {
		if (!j.book?.owner || j.me === j.book.owner || localStorage.getItem(e)) return;
		localStorage.setItem(e, "1");
	} catch {
		return;
	}
	let t = y(j.book.owner), n = [
		[
			D("hand", 24),
			h("Bem-vindo a <b>{room}</b>", { room: _(j.book.title || h("esta sala")) }),
			h("{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.", { owner: _(t) })
		],
		[
			"✻",
			h("Cada um traz o seu agent"),
			h("Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.")
		],
		[
			D("paperclip", 24),
			h("O contexto é de todo mundo"),
			h("Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.")
		],
		[
			D("arrowRight", 24),
			h("Conecte o seu agent"),
			""
		]
	], r = document.createElement("dialog");
	r.className = "welcome", document.body.appendChild(r);
	let i = 0, a = () => {
		r.close(), r.remove(), Pt(document.getElementById("agentNudge"), j.id);
	}, o = () => {
		let [e, t, s] = n[i], c = i === n.length - 1;
		r.innerHTML = `<div class="wIco">${e}</div><h3>${t}</h3>${s ? `<p>${s}</p>` : `<p>${h("Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.")}</p><div id="wConnect"></div>`}
      <div class="wFoot"><span class="wDots">${n.map((e, t) => `<i class="${t === i ? "on" : ""}"></i>`).join("")}</span>
        ${i ? `<button type="button" class="ghost" data-w="-1">${h("Voltar")}</button>` : `<button type="button" class="ghost" data-w="skip">${h("Pular")}</button>`}
        <button type="button" class="primary" data-w="1">${h(c ? "Entrar na sala" : "Próximo")}</button></div>`, r.querySelectorAll("[data-w]").forEach((e) => e.onclick = () => {
			let t = e.dataset.w;
			if (t === "skip" || t === "1" && c) return a();
			i += Number(t), o();
		}), c && Pt(r.querySelector("#wConnect"), j.id).then(() => {
			let e = r.querySelector("#wConnect");
			e && e.hidden && (e.hidden = !1, e.innerHTML = `<div class="setup done"><span class="setupIcon">${D("check", 22)}</span><div><b>${h("Seu agent já está conectado.")}</b><span>${h("Ligue ele nesta sala com ✻ Ligar agent, no topo.")}</span></div></div>`);
		}), r.querySelector(".wFoot .primary").focus();
	};
	r.addEventListener("cancel", (e) => {
		e.preventDefault(), a();
	}), o(), r.showModal();
}
var yn = null, bn = null, xn = null, Sn = 0;
function Cn() {
	++Sn;
	let e = yn;
	yn = null, bn = null, e?.destroy();
}
function wn() {
	let e = g.querySelector(".doc"), t = document.getElementById("cm"), n = Ia(), r = e?.dataset.view === "edit" && j?.id && !I() ? n ? `${j.id}~${n}` : j.id : null;
	if (r === bn) return;
	Cn(), bn = r, e?.classList.remove("collab"), t && (t.innerHTML = "");
	let i = Sn;
	r && t && (xn ??= import(
		/* @vite-ignore */
		"/collab-svelte.js"
)).then((a) => {
		i === Sn && (yn?.destroy(), t.innerHTML = "", yn = a.mountCollab(t, {
			room: r,
			name: y(j.me),
			color: v(j.me),
			onText: (e) => {
				i === Sn && (n ? j.docs[n] = e : j.doc = e);
			},
			onStatus: (t) => {
				i === Sn && (e.classList.toggle("collab", t === "connected"), t !== "connected" && $(!0));
			}
		}));
	}).catch(() => {
		xn = null;
	});
}
var Tn = D("sidebar", 20), P = () => j?.book?.title || "vibebook", En = [
	"oklch(0.5 0.17 248)",
	"oklch(0.58 0.17 35)",
	"oklch(0.52 0.11 175)",
	"oklch(0.47 0.15 315)",
	"oklch(0.6 0.13 75)",
	"oklch(0.45 0.1 145)",
	"oklch(0.36 0.06 255)",
	"oklch(0.55 0.16 10)"
], Dn = (e) => En[[...String(e)].reduce((e, t) => e * 31 + t.charCodeAt(0) >>> 0, 7) % En.length], On = /* @__PURE__ */ new Set([
	"e",
	"de",
	"do",
	"da",
	"dos",
	"das",
	"o",
	"a",
	"os",
	"as",
	"em",
	"no",
	"na",
	"para",
	"pra",
	"com",
	"por",
	"the",
	"and",
	"of"
]), F = (e) => {
	let t = e.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/).filter(Boolean), n = t.filter((e) => !On.has(e.toLowerCase()));
	return ((n.length ? n : t).slice(0, 2).map((e) => e[0]).join("") || "◆").toUpperCase();
}, kn = (e) => {
	let t = Fe(T?.find((e) => e.id === j?.id));
	return e ? t ? `<span class="${e} hasIcon"><img src="${t}" alt=""></span>` : `<span class="${e}" style="background:${Dn(P())}">${_(F(P()))}</span>` : t ? `<img src="${t}" alt="">` : _(F(P()));
};
async function An(e, t) {
	let n = URL.createObjectURL(e);
	try {
		let e = await new Promise((e, t) => {
			let r = new Image();
			r.onload = () => e(r), r.onerror = () => t(Error(h("Não consegui ler essa imagem."))), r.src = n;
		}), r = document.createElement("canvas");
		r.width = r.height = t;
		let i = Math.min(t / e.naturalWidth, t / e.naturalHeight), a = e.naturalWidth * i, o = e.naturalHeight * i;
		return r.getContext("2d").drawImage(e, (t - a) / 2, (t - o) / 2, a, o), await new Promise((e) => r.toBlob(e, "image/png"));
	} finally {
		URL.revokeObjectURL(n);
	}
}
async function jn(e) {
	let t = document.querySelector("link[rel=\"icon\"]");
	if (!e) {
		t.type = "image/svg+xml", t.href = "/favicon.svg";
		return;
	}
	let n = Fe(T?.find((e) => e.id === j?.id));
	if (n) {
		let e = new Image();
		e.onload = () => {
			let n = document.createElement("canvas");
			n.width = n.height = 64;
			let r = n.getContext("2d");
			r.beginPath(), r.roundRect(0, 0, 64, 64, 16), r.clip(), r.drawImage(e, -1, -1, 66, 66), t.type = "image/png", t.href = n.toDataURL("image/png");
		}, e.onerror = () => {
			t.type = "image/png", t.href = n;
		}, e.src = n;
		return;
	}
	await document.fonts?.load?.("400 40px Caprasimo").catch(() => {});
	let r = document.createElement("canvas");
	r.width = r.height = 64;
	let i = r.getContext("2d");
	i.fillStyle = Dn(e), i.beginPath(), i.roundRect(0, 0, 64, 64, 14), i.fill();
	let a = i.createRadialGradient(56, 8, 0, 56, 8, 44);
	a.addColorStop(0, "rgba(255,255,255,.28)"), a.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = a, i.fill();
	let o = F(e);
	i.fillStyle = "#fff", i.textAlign = "center", i.textBaseline = "middle", i.font = `400 ${o.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`, i.fillText(o, 32, 35), t.type = "image/png", t.href = r.toDataURL("image/png");
}
var Mn = !1;
function Nn() {
	Mn = !Mn;
	try {
		localStorage.setItem("vb.rail", Mn ? "1" : "0");
	} catch {}
	g.querySelector(".book")?.classList.toggle("rail", Mn), z();
}
function Pn(e) {
	e.innerHTML = `
    <button class="iconBtn" id="railToggle" title="${h("Abrir menu")}" aria-label="${h("Abrir menu")}" aria-expanded="false">${Tn}</button>
    <a data-nav href="/app" class="iconBtn" title="${h("Seus vibebooks")}" aria-label="${h("Seus vibebooks")}" style="text-decoration:none">${D("back", 20)}</a>
    <div class="railSep"></div>
    <div class="railList">
      <button class="rb geral ${M === "main" ? "sel" : ""} ${Fe(T?.find((e) => e.id === j.id)) ? "hasIcon" : ""}" style="background:${Dn(P())}" data-thread="main" title="${_(P())}" aria-label="${_(P())}">${kn("")}</button>
      ${j.epics.filter((e) => !e.archived || e.id === M).map((e) => {
		let t = e.tasks.filter((e) => e.done).length, n = e.tasks.length ? 100 * t / e.tasks.length : 0;
		return `
        <button class="rb ${M === e.id ? "sel" : ""} ${Ar(e.id).length ? "waiting" : ""}" data-thread="${e.id}" title="${_(e.title)} · ${t}/${e.tasks.length}" aria-label="${_(e.title)}" style="background:${v(e.title)}">
          ${e.owner ? `<span class="rbOwner">${Mr(e.owner)}</span>` : _(F(e.title))}${e.tasks.length ? `<span class="ring" style="--p:${n}%"></span>` : ""}</button>`;
	}).join("")}
      <button class="rb add" id="railAdd" title="${h("Novo épico")}" aria-label="${h("Novo épico")}">${D("plus", 18)}</button>
    </div>
    <div class="railPeople">${(j.requests || []).length ? `<button class="rb askBadge" id="railAsks" title="${h("{n} pedindo pra entrar", { n: j.requests.length })}" aria-label="${h("{n} pedindo pra entrar", { n: j.requests.length })}">+${j.requests.length}</button>` : ""}${j.members.slice(0, 8).map((e) => x(e, j.online.includes(e))).join("")}</div>`, e.querySelector("#railToggle").onclick = Nn, e.querySelector("#railAsks")?.addEventListener("click", Nn), e.querySelector("#railAdd").onclick = () => {
		Nn(), document.querySelector("#newEpic input")?.focus();
	}, e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		M = e.dataset.thread, Q = !1, Vr = M === "main" || I() ? null : M, z(), Z(), V(), $();
	});
}
var I = () => M.startsWith("pre:"), Fn = () => I() ? j.suggestions[Number(M.slice(4))] : null, In = null;
function Ln(e) {
	let t = Fn();
	if (!t) return M = "main", Z();
	e.innerHTML = `<div class="preCard">
    <p class="kicker">✦ ${h("O @vibe sugere um épico")}</p>
    <h3>${_(t.title)}</h3>
    <p class="${t.why ? "" : "muted"}">${_(t.why || h("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."))}</p>
    ${t.tasks.length ? `<h4>${h("Tarefas propostas")}</h4><ul>${t.tasks.map((e) => `<li>${_(e)}</li>`).join("")}</ul>` : ""}
    <div class="row"><button class="primary" id="preAccept">${h("Pedir pro meu agent")}</button><button class="ghost" id="preSkip">${h("Descartar")}</button></div>
    <p class="muted">${h("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")}</p>
  </div>`;
	let n = Number(M.slice(4));
	e.querySelector("#preAccept").onclick = () => {
		N({
			t: "suggestion",
			i: n,
			accept: !0
		}), M = "main", Z();
	}, e.querySelector("#preSkip").onclick = () => {
		In = n, N({
			t: "suggestion",
			i: n
		});
	};
}
var L = {
	id: null,
	list: []
};
async function Rn() {
	if (!j?.id) return;
	let e = await C(`/api/books/${j.id}/agents`).catch(() => null);
	e && (L = {
		id: j.id,
		list: e.agents,
		claudeOn: e.claude_on,
		sandboxes: e.sandboxes || []
	}, Gn(), z());
}
var zn = "http://127.0.0.1:47321", Bn = null, Vn = () => Bn && Date.now() - Bn.at < 2e4 ? Promise.resolve(Bn.rooms) : fetch(`${zn}/ping`).then((e) => e.json()).then((e) => (Bn = {
	at: Date.now(),
	rooms: e.rooms
}).rooms).catch(() => (Bn = {
	at: Date.now(),
	rooms: null
}).rooms), Hn = {}, Un = (e, t) => {
	let n = Hn[e];
	return n && Date.now() - n.at < 2e4 ? Promise.resolve(n.w) : fetch(`${zn}/where?room=${e}&title=${encodeURIComponent(t || "")}`).then((e) => e.ok ? e.json() : null).catch(() => null).then((t) => (Hn[e] = {
		at: Date.now(),
		w: t
	}).w);
}, Wn = {
	used: h("a pasta onde ele já abriu antes"),
	linked: h("ligada a esta sala pelo arquivo .vibebook"),
	slug: h("a pasta com o nome da sala"),
	new: h("pasta nova com o nome da sala, criada ao ligar")
};
function Gn() {
	let e = document.getElementById("myClaude");
	if (e && L.id !== j?.id) {
		let e = document.getElementById("claudeBar");
		e && (e.hidden = !0);
	}
	if (!e || L.id !== j?.id) return;
	let t = !!L.claudeOn, n = L.list.some((e) => e.email === j.me && e.listening);
	e.hidden = !1, e.setAttribute("aria-pressed", String(t));
	let r = Hn[j.id]?.w, i = r?.folder ? r.folder.startsWith(r.home + "/") ? "~" + r.folder.slice(r.home.length) : r.folder : "";
	e.innerHTML = `✻ <span class="lbl">${h(t ? n ? "ouvindo" : "não ouvindo" : "Ligar agent")}</span>${i ? `<span class="where">${_(i.replace(/^~\/Projects\//, ""))}${r.how === "new" ? ` ${D("plus", 12)}` : ""}</span>` : ""}`, Hn[j.id] || Un(j.id, P()).then((e) => e && Gn()), e.title = (i ? `${h("Abre em {path} ({how}).", {
		path: i,
		how: Wn[r.how] || h("pasta da sala")
	})}\n\n` : "") + h(t && !n ? "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar." : t ? "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada)." : "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina."), _r(t, n || L.list.some((e) => e.email === j.me && Date.now() - e.seen_at < 18e5)), e.onclick = () => document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), qn(t, n, i, r);
}
async function Kn() {
	let e = !L.claudeOn;
	L.claudeOn = e, e && (fr[j.id] = Date.now()), Gn(), await C(`/api/books/${j.id}/claude`, { on: e }).catch(() => {
		L.claudeOn = !e, Gn();
	});
}
function qn(e, t, n, r) {
	let i = document.getElementById("agentsPane");
	if (!i) return;
	let a = L.list.filter((e) => e.email === j.me), o = tr(), s = t || a.some((e) => Date.now() - e.seen_at < 18e5);
	if (document.querySelectorAll(".peekAgents, .ptAgents").forEach((e) => {
		let t = o.find((e) => e.st === "blocked");
		e.dataset.q = t ? "blocked" : o.length ? "busy" : s ? "idle" : "", e.querySelector(".qN").textContent = o.length ? String(o.length) : "", e.title = t ? h("Seu agent espera você no terminal") : o.length ? h("Fila do seu agent: {n}", { n: o.length }) : s ? h("Seu agent está livre") : "Agents";
	}), document.getElementById("docPeek")?.classList.toggle("agLive", t), !document.querySelector(".doc[data-pane=\"agents\"]")) {
		i.innerHTML = "";
		return;
	}
	i.innerHTML = `<h4>${h("Seus agents nesta sala")}</h4>
    <div class="agCard${e ? " on" : ""}"><span class="agIcon">✻</span><div><b>${h("Claude Code no seu computador")}</b>
      <small>${e ? t ? h("ligado · ouvindo esta sala") : a.some((e) => Date.now() - e.seen_at < 18e5) ? h("ligado · trabalhando agora") : h("ligado · ainda não está ouvindo") : h("desligado")}${n ? ` · ${_(n.replace(/^~\/Projects\//, ""))}${r?.how === "new" ? ` (${h("pasta nova")})` : ""}` : ""}</small></div>
      <button type="button" class="ghost agGo" id="agGo" hidden title="${h("Ir pro seu agent desta sala no herdr")}" aria-label="${h("Ir pro seu agent no herdr")}">${D("external", 16)}</button>
      <label class="agSwitch"><input type="checkbox" id="agToggle" ${e ? "checked" : ""} /><i></i></label></div>
    <p class="agNote">${h("Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.")}</p>
    <div class="agConn"><b>${h("Conectar seu agente")}</b><small>${h("Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.")}</small><code>${_(hr())}</code><button type="button" class="primary" id="agConnCopy">${h("Copiar prompt")}</button></div>
    <h4>${h("Fila do seu agent")} <small>${o.length || ""}</small></h4>
    ${o.length ? `<div class="queue${Zn ? " open" : ""}">${o.map((e) => {
		let t = j.epics.find((t) => t.id === e.m.thread), n = t ? Nr(t) : kn("ri"), r = e.st === "blocked" ? h("espera você no terminal") : e.st === "doing" ? h("fazendo") : h("na fila");
		return `<div class="qRow"><button type="button" class="qGo" data-goto="${e.m.id}" title="${_(t ? t.title : h("sala principal"))} · ${S(e.m.ts)}">${x(j.me)}${n}<span class="qTx">${_(e.m.text.replace(/\s+/g, " ").slice(0, 120))}</span><i class="qS ${e.st}" title="${r}"></i></button><button type="button" class="qX" data-dismiss="${e.m.id}" title="${h("Tirar da fila (já resolvido)")}" aria-label="${h("Tirar da fila (já resolvido)")}">${D("x")}</button></div>`;
	}).join("")}${o.length > 4 ? `<button type="button" class="qMore" id="qMore">${Zn ? h("mostrar menos") : h("mostrar mais {n}", { n: o.length - 4 })}</button>` : ""}</div>` : `<p class="agNote">${h("Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.")}</p>`}
    ${a.length ? `<h4>${h("Conectados")}</h4><div class="agList">${Cr(j.me)}</div>` : ""}
    <h4>${h("Na nuvem")}</h4><div id="sbx">${ar()}</div>`, document.getElementById("agToggle").onchange = Kn, document.getElementById("agConnCopy").onclick = gr;
	let c = document.getElementById("agGo");
	e && Vn().then((e) => {
		c.isConnected && (c.hidden = !e?.includes(j.id));
	}), c.onclick = () => fetch(`${zn}/focus?room=${j.id}`).then((e) => e.json()).then((e) => e.error && B(_(e.error))).catch(() => B(h("O vibebook herdr não está rodando nesta máquina."))), i.querySelectorAll("[data-goto]").forEach((e) => e.onclick = () => {
		H.matches && U(), Di(Number(e.dataset.goto));
	}), i.querySelectorAll("[data-dismiss]").forEach((e) => e.onclick = () => N({
		t: "ack.dismiss",
		id: Number(e.dataset.dismiss)
	})), document.getElementById("qMore")?.addEventListener("click", () => {
		Zn = !Zn, Gn();
	}), or();
}
var Jn = (e) => ((e.run_s || 0) / 3600 + (e.state === "running" && e.checked_at ? (Date.now() - e.checked_at) / 36e5 : 0)) * (e.rate || 0) + (Date.now() - e.created_at) / 36e5 * (e.disk_rate || 0), Yn = (e) => `US$${e < 10 ? e.toFixed(2) : Math.round(e)}`.replace(".", p === "en" ? "." : ",");
function Xn() {
	return L.id !== j?.id || !L.sandboxes?.length ? "" : L.sandboxes.map((e) => `<button type="button" class="member sbxRow ${_(e.state || "")}" data-sbx-open title="${_(e.name)} · ${h("de {who}", { who: _(y(e.email)) })}">
    <span class="sbxIco">☁</span><span class="fnCol"><span class="fn">${_(e.name)}</span><small>${_(y(e.email).split(" ")[0])} · ${h(rr[e.state] || e.state || "?")}</small></span><span class="money">${Yn(Jn(e))}</span></button>`).join("");
}
var Zn = !1, Qn = () => {}, $n = () => {}, er = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || "");
function tr() {
	let e = Date.now() - 1728e5, t = /* @__PURE__ */ new Map();
	for (let e of j.acks || []) e.email === j.me && (t.get(e.msg_id) ?? t.set(e.msg_id, []).get(e.msg_id)).push(e);
	let n = j.messages ? X() : [];
	return n.filter((t) => t.author === j.me && !t.kind && t.text && t.ts > e && !n.some((e) => e.id === t.reply_to && er(e))).map((e) => {
		let n = t.get(e.id) || [];
		return {
			m: e,
			st: n.some((e) => e.status === "done" || e.status === "idle" || e.status === "dismissed") ? null : n.some((e) => e.status === "blocked") ? "blocked" : n.some((e) => e.status === "doing") ? "doing" : "queued"
		};
	}).filter((e) => e.st);
}
var R = {
	id: null,
	connected: null,
	list: [],
	busy: "",
	err: ""
}, nr = 0, rr = {
	running: "rodando",
	starting: "ligando",
	pausing: "pausando",
	paused: "pausado",
	stopped: "parado",
	deleted: "apagado no freestyle",
	unknown: "?"
};
async function ir() {
	if (!j?.id) return;
	clearTimeout(nr);
	let e = await fetch(`/api/books/${j.id}/sandboxes`).then((e) => e.json()).catch(() => null);
	if (!e || e.error) return;
	R = {
		...R,
		id: j.id,
		connected: e.connected,
		claude: e.claude,
		list: e.sandboxes
	};
	let t = document.getElementById("sbx");
	t && (t.innerHTML = ar(), or()), e.sandboxes.some((e) => !e.ready || e.state !== "running" && /ing$/.test(e.state)) && document.querySelector(".doc[data-pane=\"agents\"]") && (nr = setTimeout(ir, 5e3));
}
function ar() {
	if (R.id !== j?.id || R.connected === null) return `<p class="agNote">${h("carregando…")}</p>`;
	let e = R.err ? `<p class="agErr">${_(R.err)}</p>` : "";
	return R.connected ? `${R.claude ? `<div class="fsOn">${D("check", 13)} ${h("Claude conectado: sandboxes novos já sobem logados")} · <button type="button" class="ghost" id="ctOff">${h("remover")}</button></div>` : `<div class="agCard col"><b>${h("Conecte sua conta do Claude")}</b><small>${h("No seu terminal, rode:")}</small><div class="cpCmd"><code>claude setup-token</code><button type="button" class="ghost" data-cp="claude setup-token">${h("Copiar")}</button></div><small>${h("Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.")}</small>
      <form id="ctForm" class="fsForm"><input type="password" name="token" autocomplete="off" placeholder="sk-ant-…" required /><button class="primary" ${R.busy ? "disabled" : ""}>${R.busy === "ct" ? h("Salvando…") : h("Salvar")}</button></form>${R.errAt === "ct" && R.err ? `<p class="agErr">${_(R.err)}</p>` : ""}</div>`}${R.list.map((e) => `<div class="sbxCard ${e.state}"><div class="sbxTop"><span class="agIcon">☁</span><div><b>${_(e.name)}</b>
      <small>${!e.ready && e.state === "running" ? h("preparando (uns 3 min)…") : h(rr[e.state] || e.state)}${e.rate ? ` · ${Yn(e.rate)}/h` : ""}${e.error ? ` · ${_(e.error)}` : ""}</small>${R.logs?.[e.id] ? `<pre class="sbxLog">${_(R.logs[e.id])}</pre>` : !e.ready && e.log ? `<code class="sbxLog">${_(e.log)}</code>` : ""}</div><span class="money" title="${h("gasto até agora na sua conta do freestyle")}">${Yn(e.cost || 0)}</span></div>
      <div class="sbxActs">${e.state === "deleted" ? "" : `<button class="primary" data-sbx-term="${_(e.id)}">${h("Terminal")}</button>`}
      ${e.state === "running" ? `<button class="ghost" data-sbx-act="pause" data-id="${_(e.id)}">${h("Pausar")}</button>` : e.state === "paused" || e.state === "stopped" ? `<button class="ghost" data-sbx-act="start" data-id="${_(e.id)}">${h("Retomar")}</button>` : ""}
      ${!e.ready && e.state === "running" ? `<button class="ghost" data-sbx-setup="${_(e.id)}" title="${h("Rodar o setup de novo")}" ${R.busy ? "disabled" : ""}>${R.busy === "setup:" + e.id ? h("Rodando setup… (até 4 min)") : h("Refazer setup")}</button>` : ""}
      <button class="ghost del" data-sbx-del="${_(e.id)}" aria-label="${h("Apagar sandbox")}" title="${h("Apagar sandbox")}">${D("trash", 16)}</button></div></div>`).join("")}
    <button class="agNew on" id="sbxNew" ${R.busy ? "disabled" : ""}>${D("plus", 16)} ${R.busy === "new" ? h("Criando…") : h("Criar sandbox")}<small>${h("Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.")}</small></button>${R.errAt === "ct" ? "" : e}
    <div class="fsOn">${D("check", 13)} ${h("freestyle.sh conectado")} · <button type="button" class="ghost" id="fsOff">${h("desconectar")}</button></div>` : `<div class="agCard col"><b>${h("Conecte sua conta do freestyle.sh")}</b>
    <small>${h("O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:")}</small><div class="cpCmd"><code>npx freestyle@latest tokens create vibebook</code><button type="button" class="ghost" data-cp="npx freestyle@latest tokens create vibebook">${h("Copiar")}</button></div><small>${h("Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.")}</small>
    <form id="fsForm" class="fsForm"><input type="password" name="key" autocomplete="off" placeholder="${h("API key do freestyle")}" required /><button class="primary" ${R.busy ? "disabled" : ""}>${R.busy === "key" ? h("Conferindo…") : h("Conectar")}</button></form>${e}</div>`;
}
function or() {
	let e = () => {
		let e = document.getElementById("sbx");
		e && (e.innerHTML = ar(), or());
	}, t = async (t, n) => {
		R.busy = t, R.errAt = t, R.err = "", e();
		try {
			let e = await n();
			e?.error && (R.err = e.error);
		} catch {
			R.err = h("sem conexão");
		}
		R.busy = "", await ir(), e();
	}, n = (e, t, n) => fetch(t, {
		method: e,
		headers: { "content-type": "application/json" },
		body: n ? JSON.stringify(n) : void 0
	}).then((e) => e.json());
	document.getElementById("fsForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		let r = e.target.key.value;
		t("key", () => n("POST", "/api/freestyle", { key: r }));
	}), document.querySelectorAll("[data-cp]").forEach((e) => e.onclick = () => {
		navigator.clipboard?.writeText(e.dataset.cp);
		let t = e.innerHTML;
		e.textContent = "✓", setTimeout(() => e.innerHTML = t, 1200);
	}), document.getElementById("ctForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		let r = e.target.token.value;
		t("ct", () => n("POST", "/api/claude-token", { token: r }));
	}), document.getElementById("ctOff")?.addEventListener("click", () => confirm(h("Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.")) && t("ct", () => n("DELETE", "/api/claude-token"))), document.getElementById("fsOff")?.addEventListener("click", () => confirm(h("Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.")) && t("off", () => n("DELETE", "/api/freestyle"))), document.getElementById("sbxNew")?.addEventListener("click", () => t("new", () => n("POST", `/api/books/${j.id}/sandboxes`, {}))), document.querySelectorAll("[data-sbx-setup]").forEach((e) => e.onclick = () => t(`setup:${e.dataset.sbxSetup}`, async () => {
		let t = await n("POST", `/api/sandboxes/${e.dataset.sbxSetup}/setup`);
		return R.logs = {
			...R.logs,
			[e.dataset.sbxSetup]: t.log || t.error || ""
		}, t;
	})), document.querySelectorAll("[data-sbx-act]").forEach((e) => e.onclick = () => t("act", () => n("POST", `/api/sandboxes/${e.dataset.id}/${e.dataset.sbxAct}`))), document.querySelectorAll("[data-sbx-del]").forEach((e) => e.onclick = () => confirm(h("Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.")) && t("del", () => n("DELETE", `/api/sandboxes/${e.dataset.sbxDel}`))), document.querySelectorAll("[data-sbx-term]").forEach((e) => e.onclick = () => dr(e.dataset.sbxTerm, R.list.find((t) => t.id === e.dataset.sbxTerm)?.name));
}
var sr = "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0", cr = "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js", lr = {
	Esc: "\x1B",
	Tab: "	",
	"Ctrl-C": "",
	"↑": "\x1B[A",
	"↓": "\x1B[B",
	"←": "\x1B[D",
	"→": "\x1B[C",
	"/": "/"
}, ur = (e) => new Promise((t, n) => {
	let r = Object.assign(document.createElement("script"), {
		src: e,
		onload: t,
		onerror: n
	});
	document.head.append(r);
});
async function dr(e, t) {
	window.Terminal || (document.head.append(Object.assign(document.createElement("link"), {
		rel: "stylesheet",
		href: `${sr}/css/xterm.css`
	})), await ur(`${sr}/lib/xterm.js`), await ur(cr));
	let n = document.createElement("dialog");
	n.className = "termDlg", n.innerHTML = `<header><b>☁ ${_(t || "sandbox")}</b><span id="termSt">${h("conectando…")}</span><button class="ghost" data-close aria-label="${h("Fechar")}">${D("x")}</button></header><div class="termBox" id="termBox"></div>
    <div class="termKeys">${Object.keys(lr).map((e) => `<button type="button" data-k="${_(e)}">${_(e)}</button>`).join("")}</div>`, document.body.append(n), n.showModal();
	let r = new window.Terminal({
		cursorBlink: !0,
		fontSize: 14,
		fontFamily: "ui-monospace, Menlo, monospace",
		theme: { background: "#0b0f17" }
	}), i = new window.FitAddon.FitAddon();
	r.loadAddon(i), r.open(n.querySelector("#termBox")), i.fit();
	let a = n.querySelector("#termSt"), o = null, s = !1, c = () => {
		s = !0, o?.close(), r.dispose(), n.remove();
	};
	n.querySelector("[data-close]").onclick = c, n.oncancel = (e) => {
		e.preventDefault(), c();
	};
	let l = await fetch(`/api/sandboxes/${e}/terminal`, { method: "POST" }).then((e) => e.json()).catch(() => ({ error: h("sem conexão") }));
	if (l.error) {
		a.textContent = l.error;
		return;
	}
	let u = btoa(String.fromCharCode(...new TextEncoder().encode(l.token))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	o = new WebSocket(`${l.url}&cols=${r.cols}&rows=${r.rows}`, ["freestyle-pty", `freestyle-identity.${u}`]), o.binaryType = "arraybuffer";
	let d = new TextEncoder();
	o.onmessage = (e) => {
		if (typeof e.data != "string") return r.write(new Uint8Array(e.data));
		try {
			let t = JSON.parse(e.data);
			t.type === "sessionInfo" ? a.textContent = h("conectado") : t.type === "exited" ? a.textContent = h("terminou") : t.type === "error" && (a.textContent = t.message);
		} catch {}
	}, o.onclose = () => {
		s || (a.textContent = h("desconectado: feche e abra de novo"));
	}, r.onData((e) => o.readyState === 1 && o.send(d.encode(e))), new ResizeObserver(() => {
		i.fit(), o.readyState === 1 && o.send(JSON.stringify({
			type: "resize",
			cols: r.cols,
			rows: r.rows
		}));
	}).observe(n.querySelector("#termBox")), n.querySelectorAll("[data-k]").forEach((e) => e.onclick = () => {
		o.readyState === 1 && o.send(d.encode(lr[e.dataset.k])), r.focus();
	}), r.focus();
}
var fr = {}, pr = 0, mr = {}, hr = () => `Read ${location.origin}/llms.txt and set up vibebook for this project. Room: ${location.origin}/b/${j.id}`;
function gr() {
	let e = hr();
	(navigator.clipboard?.writeText(e) ?? Promise.reject()).then(() => B(h("Copiado. Cole no Claude Code, dentro da pasta do projeto.")), () => window.prompt(h("Copie e cole no seu Claude Code:"), e));
}
function _r(e, t) {
	let n = document.getElementById("claudeBar");
	if (!n) return;
	clearTimeout(pr);
	let r = document.getElementById("agentNudge"), i = "vb.claudeBar.off", a = !1;
	try {
		a = localStorage.getItem(i) === "off";
	} catch {}
	let o = `<button class="ghost" data-x aria-label="${h("Fechar")}" title="${h("Fechar")}">×</button>`, s = (e, t) => {
		n.className = `claudeBar ${e}`, n.innerHTML = t, n.hidden = !1;
		let r = n.querySelector("[data-x]");
		r && (r.onclick = () => {
			try {
				localStorage.setItem(i, "off");
			} catch {}
			n.hidden = !0, clearTimeout(pr);
		});
	}, c = !1;
	try {
		c = localStorage.getItem(`vb.start.${j.id}`) === "off";
	} catch {}
	if (j.book?.owner === j.me && !j.epics.length && M === "main" && !c) return vr(n, e, t, `vb.start.${j.id}`);
	if (Nt || r && !r.hidden || t && !mr[j.id] || a && !fr[j.id]) n.hidden = !0;
	else if (t) mr[j.id] = !1, s("ok", `<span class="star">✻</span><span><b>${h("Seu agent está ouvindo esta sala.")}</b></span>`), setTimeout(() => n.hidden = !0, 5e3);
	else if (e) {
		mr[j.id] = !0;
		let e = Date.now() - (fr[j.id] || 0) > 18e4;
		s("wait", `<span class="star">✻</span><span><b>${h(e ? "Seu agent ainda não está ouvindo." : "Abrindo seu agent no seu computador…")}</b><small>${h(e ? "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá." : "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.")}</small></span>${o}`), e || (pr = setTimeout(Gn, 18e4 - (Date.now() - (fr[j.id] || 0)) + 500));
	} else mr[j.id] = !1, s("", `<span class="star">✻</span><span><b>${h("Seu agent não está nesta sala.")}</b><small>${h("Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.")}</small></span><button class="primary" data-conn>${h("Conectar seu agente")}</button><button class="ghost" data-on>${h("Ligar agent")}</button>${o}`), n.querySelector("[data-on]").onclick = () => document.getElementById("myClaude")?.click(), n.querySelector("[data-conn]").onclick = gr;
}
function vr(e, t, n, r) {
	let i = (j.members || []).filter((e) => e !== j.me), a = (e, t) => `<li class="${e}"><i>${e === "ok" ? "✓" : e === "wait" ? "✻" : "○"}</i><span>${t}</span></li>`, o = Nt ? a("todo", h("Conecte seu agent (o card acima diz como)")) : n ? a("ok", h("Seu agent está aqui")) : t ? a("wait", h("Abrindo seu agent no seu computador…")) : a("todo", `${h("Seu agent está desligado nesta sala")} <button class="linkish" data-on>${h("Ligar")}</button>`);
	e.className = "claudeBar start", e.hidden = !1, e.innerHTML = `<span class="star">✻</span><span><b>${h("Começando a sala")}</b><ul>
    ${a("ok", h("Sala criada"))}
    ${i.length ? a("ok", h("Na sala: {who}", { who: _(i.map(y).join(", ")) })) : a("todo", h("Só você aqui: convide em Pessoas"))}
    ${o}
    ${a(n ? "wait" : "todo", h("O agent escreve o doc e cria os épicos"))}
  </ul></span><button class="ghost" data-x aria-label="${h("Fechar")}" title="${h("Fechar")}">×</button>`, e.querySelector("[data-on]")?.addEventListener("click", () => document.getElementById("myClaude")?.click()), e.querySelector("[data-x]").onclick = () => {
		try {
			localStorage.setItem(r, "off");
		} catch {}
		e.hidden = !0, clearTimeout(pr);
	};
}
var yr = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`, br = (e) => Math.min(100, Math.round(e.tokens / e.window * 100)), xr = (e) => {
	let t = br(e), n = (e, t = 60, n = 80) => `<i class="ctx ${e >= n ? "hot" : e >= t ? "mid" : ""}" style="--p:${e}%"></i>`, r = (e, t, r) => `<div><div class="l"><b>${e}</b><span>${r}</span></div>${n(t)}</div>`, i = ["five_hour", "seven_day"].map((t) => {
		let n = e.limits?.[t];
		if (!n || n.r * 1e3 < Date.now()) return "";
		let i = /* @__PURE__ */ new Date(n.r * 1e3), a = i.toLocaleTimeString(m, {
			hour: "2-digit",
			minute: "2-digit"
		}), o = t === "five_hour" ? a : `${i.toLocaleDateString(m, { weekday: "short" }).replace(".", "")} ${a}`;
		return r(h(t === "five_hour" ? "Sessão de 5h" : "Semana"), n.p, h("{p}% · reseta {at}", {
			p: n.p,
			at: o
		}));
	});
	return `<div class="ctip">${r(h("Contexto"), t, `${t}% · ${yr(e.tokens)}/${yr(e.window)}`)}${i.join("")}</div>`;
}, Sr = (e) => {
	if (!e) return "";
	let t = br(e);
	return `<i class="ctx ${t >= 80 ? "hot" : t >= 60 ? "mid" : ""}" style="--p:${t}%"></i>`;
}, Cr = (e) => {
	if (L.id !== j?.id) return "";
	let t = /* @__PURE__ */ new Set();
	return L.list.filter((t) => t.email === e).sort((e, t) => t.listening - e.listening).filter((e) => !t.has(Sa(e.who) + e.repo) && t.add(Sa(e.who) + e.repo)).slice(0, 3).map((t) => `<div class="member agentRow" title="${h("{via} de {who}", {
		via: _(Sa(t.who)),
		who: _(y(e))
	})}${t.repo ? ` ${h("em {repo}", { repo: _(t.repo) })}` : ""} · ${t.listening ? t.all_rooms ? h("ouvindo todas as salas agora") : h("ouvindo esta sala agora") : h("visto há {ago}", { ago: S(t.seen_at) })}"><span class="aglyph ${ue(t.who)[0]} ${t.listening ? "on" : ""}">${ue(t.who)[1]}</span><span class="fn">${_(Sa(t.who).replace(/^Claude\s+/i, ""))}${t.repo ? ` · ${_(t.repo)}` : ""}</span><small>${t.listening ? h("ouvindo") : S(t.seen_at)}${t.context ? ` · ${br(t.context)}%` : ""}</small>${Sr(t.context)}${t.context ? xr(t.context) : ""}</div>`).join("");
}, wr = (e) => {
	if (!e || e.archived > 0) return null;
	let t = new Set((j.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg)), n = new Set(X().filter((n) => n.thread === e.id && !t.has(n.id)).map((e) => e.id));
	n.add(e.from_msg);
	let r = (j.acks || []).filter((e) => n.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts), i = r.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5);
	if (i) return {
		who: i.who,
		email: i.email
	};
	if (r[0]?.status === "done") return null;
	let a = j.messages.findLast((t) => t.thread === e.id && t.kind === "agent");
	return a && a.tag !== "done" && Date.now() - a.ts < 18e4 ? {
		who: a.via || "Agent",
		email: a.author
	} : null;
}, Tr = () => {
	let e = new Set(X().filter((e) => e.thread === "main").map((e) => e.id)), t = new Set((j.epics || []).map((e) => e.from_msg)), n = (j.acks || []).filter((n) => e.has(n.msg_id) && !t.has(n.msg_id) && n.status !== "dismissed").sort((e, t) => t.ts - e.ts), r = n.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5 && n.find((t) => t.msg_id === e.msg_id && t.who === e.who) === e);
	return r ? {
		who: r.who,
		email: r.email
	} : null;
}, Er = (e) => {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let i = `${r.who}|${r.email}`;
		r.status === "doing" && Date.now() - r.ts < 12e5 && !t.has(i) && e.find((e) => e.msg_id === r.msg_id && e.who === r.who && e.email === r.email) === r && (t.add(i), n.push({
			who: r.who,
			email: r.email
		}));
	}
	return n;
}, Dr = () => {
	if (I()) return [];
	let e = M === "main" ? null : j.epics.find((e) => e.id === M), t;
	if (e) {
		if (e.archived > 0) return [];
		let n = new Set((j.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg));
		t = new Set(X().filter((t) => t.thread === e.id && !n.has(t.id)).map((e) => e.id)), t.add(e.from_msg);
	} else {
		let e = new Set((j.epics || []).map((e) => e.from_msg));
		t = new Set(X().filter((t) => t.thread === "main" && !e.has(t.id)).map((e) => e.id));
	}
	let n = Er((j.acks || []).filter((e) => t.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts));
	if (n.length) return n;
	let r = e ? wr(e) : Tr();
	return r ? [r] : [];
}, Or = (e) => {
	let t = wr(e);
	return t ? h("{via} de {who}", {
		via: t.who,
		who: y(t.email)
	}) : null;
};
function kr() {
	let e = document.getElementById("msgs");
	if (!e || !j) return;
	e.querySelector("#working")?.remove();
	let t = Dr();
	if (e.querySelector(".empty")?.classList.toggle("hidden", !!t.length), !t.length) return;
	let n = (e) => `<b>${h("{via} de {who}", {
		via: _(e.who),
		who: _(y(e.email))
	})}</b>`;
	e.insertAdjacentHTML("beforeend", `<div id="working" class="working"><span class="wAv">${t.slice(0, 4).map((e) => de(e.email, e.who)).join("")}</span><div>${t.length === 1 ? `${n(t[0])} ${h("está trabalhando nisso")}` : `${t.map(n).join(", ")} ${h("estão trabalhando nisso")}`}<small>${h("O andamento e a entrega aparecem aqui nesta thread.")}</small></div><span class="spin">✻</span></div>`);
}
var Ar = (e) => E.filter((t) => t.book_id === j?.id && (e === void 0 || t.thread === e)), jr = (e) => {
	let t = Ar(e), n = t.length;
	return n ? `<b class="wN${Te(t)}" title="${n === 1 ? h("Alguém está esperando você aqui") : h("{n} coisas esperando você aqui", { n })}">${n}</b>` : "";
}, Mr = (e) => {
	let t = j?.avatars?.[e] ?? b[e];
	return t ? `<img src="/api/avatar/${encodeURIComponent(e)}?v=${t}" alt="" loading="lazy" />` : _(y(e).slice(0, 2).toUpperCase());
}, Nr = (e, t) => e.owner ? `<span class="ri epOwner" style="background:${v(e.owner)}" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" ` : ""}title="${_(h("Dono: {who}", { who: y(e.owner) }))}${t ? ` · ${h("clique pra trocar")}` : ""}">${Mr(e.owner)}</span>` : `<span class="ri" style="background:${v(e.title)};color:#fff" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" title="${h("Sem dono · clique pra escolher")}"` : ""}>${_(F(e.title))}</span>`;
function Pr() {
	let e = document.getElementById("askBar");
	if (!e) return;
	let t = Ar().find((e) => /^a\d/.test(e.ref) && e.thread !== M);
	if (e.hidden = !t, !t) return;
	let n = (t.text || "").replace(/^(⏸|❓)\s*Seu Claude\s*/, "").replace(/[*`]/g, "").slice(0, 160);
	e.innerHTML = `<span>⏸ <b>${h("Seu agent espera você")}</b> ${h("em {where}", { where: _(t.topic || h("sala principal")) })}: ${_(n)}</span><button type="button" class="primary" data-askgo="${t.ref.slice(1)}">${h("Ver")}</button>`, e.querySelector("[data-askgo]").onclick = (e) => Di(Number(e.currentTarget.dataset.askgo));
}
function z() {
	kt(), Pr();
	let e = document.getElementById("side");
	if (!e || !j) return;
	if (Gn(), Xt = t(Xt, j, M, Rr), Zt = c(Zt, j), Gt && o(Zt, j, N), Mn && window.innerWidth > 900) return $t("sidebar"), Pn(e);
	let n = j.id, r = Zt;
	en("sidebar", e, {
		room: j,
		thread: M,
		navigation: Xt,
		pins: r,
		request: (e, t) => !r.active || Zt !== r || j?.id !== n ? Promise.resolve({
			ok: !1,
			error: "offline"
		}) : Ft?.request(e, t) ?? Promise.resolve({
			ok: !1,
			error: "offline"
		}),
		onopenpinfile: (e) => {
			r.active && Zt === r && j?.id === n && ei(`/api/books/${n}/files/${encodeURIComponent(e.id)}`, e.type.startsWith("image/") ? "img" : "frame", e.name);
		},
		onopenpinapp: (e) => {
			r.active && Zt === r && j?.id === n && ki(`#app:${e.connectionId}/${e.tool}`);
		},
		send: (e) => j?.id === n && N(e),
		onopen: (e) => {
			j?.id === n && (U(!0), M = e, Q = !1, Vr = M === "main" || I() ? null : M, z(), Z(), V(), $());
		},
		onarchchange: (e) => {
			j?.id === n && (Rr = e);
		},
		foldOpen: zr,
		friends: Rt,
		vb: {
			t: h,
			icon: D,
			avatar: x,
			ago: S,
			name: y,
			bookTitle: P,
			roomMark: kn,
			roomStrip: Br,
			sbxRows: Xn,
			agentRows: Cr,
			epicBusy: Or,
			waitPill: jr,
			waitsIn: Ar
		}
	}), e.querySelector("#railToggle").onclick = Nn, e.querySelectorAll("details.memMore > summary").forEach((e) => e.onclick = () => zr[e.parentElement.dataset.fold] = !e.parentElement.open);
	let i = e.querySelector(".sheetGrab");
	i && !Qt.has(i) && (Jr(i, "side", !1), Qt.add(i));
	let a = e.querySelector("#sideRooms");
	a && (a.onclick = tt);
	let s = e.querySelector("#sideRename");
	s && (s.onclick = (e) => {
		e.stopPropagation(), Ur();
	});
	let l = e.querySelector("#sideArch");
	l && (l.onclick = () => {
		U(), document.getElementById("epicArch")?.click();
	});
	let u = e.querySelector("#sideDel");
	u && (u.onclick = () => {
		U(), document.getElementById("epicDel")?.click();
	}), e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		U(!0), M = e.dataset.thread, Q = !1, Vr = M === "main" || I() ? null : M, z(), Z(), V(), $();
	}), e.querySelectorAll("[data-remove]").forEach((e) => e.onclick = async () => {
		let t = e.dataset.remove;
		if (!confirm((j.pending || []).includes(t) ? h("Cancelar o convite de {email}?", { email: t }) : h("Remover {email} deste vibebook?", { email: t }))) return;
		let n = await fetch(`/api/books/${j.id}/members/${encodeURIComponent(t)}`, { method: "DELETE" });
		n.ok || alert((await n.json().catch(() => ({}))).error || h("Não deu para remover."));
	}), e.querySelectorAll("[data-ask]").forEach((e) => e.onclick = async () => {
		let t = !!e.dataset.ok, n = e.dataset.ask;
		(t || confirm(h("Recusar o pedido de {email}?", { email: n }))) && (e.disabled = !0, await C(`/api/books/${j.id}/requests`, {
			email: n,
			ok: t
		}).then(() => t && B(h("{email} entrou na sala e recebeu o link por email.", { email: _(n) }))).catch((t) => {
			alert(t.message), e.disabled = !1;
		}));
	}), e.querySelectorAll("[data-resend]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, e.textContent = "…";
		try {
			await C(`/api/books/${j.id}/members`, { email: e.dataset.resend }), e.textContent = `${h("enviado")} ✓`;
		} catch (t) {
			e.textContent = h("reenviar"), e.disabled = !1, alert(t.message);
		}
	}), e.querySelectorAll("[data-copyinv]").forEach((e) => e.onclick = () => Lr(e.dataset.copyinv, !1)), e.querySelectorAll("[data-add]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, Lr(e.dataset.add), await C(`/api/books/${j.id}/members`, { email: e.dataset.add }).catch((t) => {
			alert(t.message), e.disabled = !1;
		});
	}), document.getElementById("invite").onsubmit = async (e) => {
		e.preventDefault();
		let t = e.target[0].value.trim();
		Lr(t), await C(`/api/books/${j.id}/members`, { email: t }).catch((e) => alert(e.message)), e.target.reset();
	}, document.title = `${j.book?.title ?? "vibebook"} · vibebook`, jn(P());
}
function Fr() {
	let e = document.getElementById("picFile");
	e && (e.onchange = async () => {
		let t = e.files?.[0];
		if (t) try {
			let e = await createImageBitmap(t), n = Math.min(e.width, e.height), r = document.createElement("canvas");
			r.width = r.height = 256, r.getContext("2d").drawImage(e, (e.width - n) / 2, (e.height - n) / 2, n, n, 0, 0, 256, 256);
			let i = await new Promise((e) => r.toBlob(e, "image/jpeg", .86)), a = await fetch("/api/me/avatar", {
				method: "POST",
				headers: { "content-type": "image/jpeg" },
				body: i
			});
			if (!a.ok) throw Error((await a.json().catch(() => ({}))).error || h("Não deu para salvar a foto."));
			nt();
		} catch (e) {
			alert(e.message || h("Não deu para ler essa imagem."));
		}
	}, e.click());
}
function Ir(e) {
	let t = `${location.origin}/b/${j.id}`;
	return `${h("Te convidei pro vibebook \"{title}\": {url}", {
		title: P(),
		url: t
	})}\n\n${h("1. Entra com {email} (o convite chegou nesse email).", { email: e })}\n${h("2. Manda isto pro seu Claude Code:")}\n\nRead ${location.origin}/llms.txt and set up vibebook for this project. Room: ${t}`;
}
function Lr(e, t = !0) {
	navigator.clipboard?.writeText(Ir(e)).then(() => B(`${t ? `${h("Convite enviado por email para <b>{email}</b>.", { email: _(e) })} ` : ""}${h("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: _(y(e)) })}`), () => B(h("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: _(e) })));
}
function B(e, t = 7e3) {
	document.querySelector(".toast")?.remove(), document.body.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${e}</div>`);
	let n = document.querySelector(".toast");
	setTimeout(() => n.remove(), t);
}
h("A fazer"), h("Fazendo"), h("Esperando OK"), h("Feito");
var Rr = !1, zr = {
	off: !1,
	friends: null
};
function Br() {
	let e = [...T || []].filter((e) => e.id !== j?.id && !e.archived_at).sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0)).slice(0, 3), t = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", n = (e) => e.busy_until > Date.now() ? "<b class=\"swBusy\">✻</b>" : "", r = (e) => {
		let t = E.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${Te(t)}">${n}</b>` : "";
	};
	return `<nav class="roomStrip" aria-label="${h("Seus vibebooks")}"><a data-nav href="/app" class="rsAll"><span class="tile md">${D("grid", 20)}</span><span>${h("Todos")}</span></a>${e.map((e) => `<a data-nav href="/b/${e.id}" title="${_(e.title)}"><span class="tw">${Ie(e, "md")}${t(e)}${n(e)}${r(e)}</span><span>${_(e.title)}</span></a>`).join("")}${"<i></i>".repeat(3 - e.length)}<button type="button" class="rsAll" id="sideRooms" aria-label="${h("Trocar de sala")}"><span class="tile md">${Oe}</span><span>${h("Buscar")}</span></button></nav>`;
}
var Vr = null, Hr = () => {
	g.querySelector(".book.boardview") && document.getElementById("toggleBoard").click();
};
function V() {
	let e = g.querySelector(".book"), t = e && te(e);
	t && (e.classList.contains("boardview") || e.querySelector(":scope > .doc")?.dataset.pane === "board") && en("board", t, {
		room: j,
		thread: M,
		vb: nn(),
		send: N,
		onopen: an
	});
}
function Ur() {
	let e = j.epics.find((e) => e.id === M), t = e ? e.title : P(), n = prompt(h(e ? "Nome do épico:" : "Nome do vibebook:"), t);
	n?.trim() && n !== t && N(e ? {
		t: "epic.rename",
		id: e.id,
		title: n
	} : {
		t: "title",
		title: n
	});
}
function Wr() {
	let e = document.getElementById("peekTxt");
	if (!e || !j) return;
	let t = Ia(), n = t && j.epics.find((e) => e.id === t), r = ((t ? j.docs?.[t] : j.doc) || "").match(/^#\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() || (n ? n.title : P()), i = n?.tasks.length || 0, a = i && n.tasks.filter((e) => e.done).length;
	e.innerHTML = `${D("doc", 15)}<b>Doc</b>${i ? `<small>${a}/${i}</small>` : ""}`, e.title = r;
	let o = j.filesN ?? j.files?.length ?? 0, s = (j.reminders || []).filter((e) => e.error).length;
	document.getElementById("peekFiles").textContent = o ? String(o) : "", document.getElementById("peekRem").textContent = s ? "⚠" : "";
}
var H = matchMedia("(max-width: 900px)"), Gr = !1;
function Kr(e) {
	let t = g.querySelector(".book");
	t && H.matches && t.dataset.sheet !== e && (t.dataset.sheet || f.pushState({ sheet: 1 }, "", location.href), t.dataset.sheet = e);
}
function U(e) {
	let t = g.querySelector(".book");
	t?.dataset.sheet && (t.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete t.dataset.sheet, history.state?.sheet && (e ? _a = !1 : (Gr = !0, history.back())));
}
function qr() {
	if (Gr) return Gr = !1, !0;
	let e = g.querySelector(".book");
	return e?.dataset.sheet ? (e.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete e.dataset.sheet, !0) : !1;
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && !e.defaultPrevented && g.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open], [data-dialog-content]") && U();
});
function Jr(e, t, n, r) {
	if (!e) return;
	let i = !1;
	e.onclick = (e) => {
		i ? i = !1 : r ? r(e) : n ? Kr(t) : U();
	}, e.onpointerdown = (r) => {
		let a = g.querySelector(".book")?.querySelector(t === "doc" ? ".doc" : ".side"), o = document.getElementById("sheetDim");
		if (!a || !H.matches) return;
		let s = r.clientY, c = a.offsetHeight, l = 0, u = !1;
		i = !1, e.setPointerCapture(r.pointerId), e.onpointermove = (e) => {
			if (l = (e.clientY - s) * -1, !u && Math.abs(l) < 6) return;
			u = !0, a.classList.add("sheetDrag"), o.style.transition = "none";
			let t = Math.min(c, Math.max(0, n ? c + l : l));
			a.style.transform = `translateY(${t * -1}px)`, o.style.opacity = String(1 - t / c);
		}, e.onpointerup = e.onpointercancel = () => {
			e.onpointermove = e.onpointerup = e.onpointercancel = null, u && (i = !0, setTimeout(() => i = !1, 400), a.classList.remove("sheetDrag"), a.style.transform = "", o.style.transition = "", o.style.opacity = "", (n ? -l > c / 4 : l <= c / 4) ? Kr(t) : U());
		};
	};
}
function Yr() {
	let e = document.getElementById("tasks");
	if (!e) return;
	let t = j.epics.find((e) => e.id === M), n = document.getElementById("threadTitle"), r = `<button type="button" class="thChev" aria-label="${h("Trocar de conversa")}" title="${h("Trocar de conversa")}">${D("chevronDown", 18)}</button>`, i = () => n.querySelector(".thChev").onclick = () => Kr("side"), a = (e, t) => `<span class="thPick">${e.replace("class=\"ri", "class=\"ri thMark")}${t}${r}</span>`;
	if (Fn()) {
		$t("tasks"), n.innerHTML = `${a(`<span class="ri">${_(F(Fn().title))}</span>`, `<span class="epicName" id="roomName">${_(Fn().title)}</span>`)}<small class="folderChip">✦ ${h("sugestão do @vibe")}</small>`, i(), document.getElementById("roomName").onclick = () => H.matches && Kr("side"), e.innerHTML = "", Wr();
		return;
	}
	n.innerHTML = t ? `${a(`<span class="ri" style="background:${v(t.title)};color:#fff">${_(F(t.title))}</span>`, `<span class="epicName" id="roomName" title="${h("Clique para renomear")}">${_(t.title)}</span>`)}<button class="ghost x" id="epicArch" title="${t.archived ? h("Desarquivar épico") : h("Arquivar épico (concluído)")}" aria-label="${t.archived ? h("Desarquivar épico") : h("Arquivar épico")}">${D(t.archived ? "undo" : "check")}</button><button class="ghost x" id="epicDel" title="${h("Apagar épico")}" aria-label="${h("Apagar épico")}">${D("trash")}</button>` : `${a(kn("ri roomIco"), `<span class="epicName" id="roomName" title="${_(j.book?.summary || h("Clique para renomear"))}">${_(P())}</span>`)}${j.book?.folder ? `<small class="folderChip">${D("folder", 12)} ${_(j.book.folder)}</small>` : ""}`;
	let o = {};
	for (let e of [...j.epics.flatMap((e) => e.tasks), ...j.roomTasks || []]) !e.done && e.owner && (o[e.owner] = (o[e.owner] || 0) + 1);
	Object.entries(o).sort((e, t) => t[1] - e[1]), n.closest(".chathead");
	let s = o[j.me] || 0, c = document.getElementById("toggleBoard");
	c.querySelector(".kN")?.remove(), s && c.insertAdjacentHTML("beforeend", `<b class="kN" title="${h("Esperando você")}: ${s}">${s}</b>`);
	let l = g.querySelector(".ptBoard .kN");
	l && (l.hidden = !s, l.textContent = s || ""), c.title = s ? `${h("Quadro de tarefas")} · ${h("Esperando você")}: ${s}` : h("Quadro de tarefas (kanban)"), i(), document.getElementById("roomName").onclick = () => H.matches ? Kr("side") : Ur();
	let u = g.querySelector(".phHome");
	u && (u.title = u.ariaLabel = h(M === "main" ? "Seus vibebooks" : "Voltar pra sala principal"), u.onclick = (e) => {
		M !== "main" && (e.preventDefault(), e.stopPropagation(), M = "main", Q = !1, z(), Z(), V(), $());
	}), n.querySelector(".thPick").onclick = (e) => {
		H.matches && !e.target.closest(".thChev") && Kr("side");
	}, Wr();
	let d = t || (M === "main" && j.roomTasks?.length ? {
		id: "main",
		tasks: j.roomTasks
	} : null);
	e.style.display = d ? "" : "none", d && (t && (document.getElementById("epicArch").onclick = () => N({
		t: "epic.archive",
		id: t.id,
		archived: !t.archived
	})), t && (document.getElementById("epicDel").onclick = () => {
		confirm(h("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: t.title })) && N({
			t: "epic.del",
			id: t.id
		});
	}), en("tasks", e, {
		room: j,
		thread: M,
		vb: nn(),
		send: N,
		waits: E
	}));
}
var Xr = (e) => `/api/books/${j.id}/files/${e.id}`, Zr = (e) => `data-view="${e.type.startsWith("image/") ? "img" : "frame"}" data-name="${_(e.name)}"`, Qr = (matchMedia("(display-mode: standalone)").matches || navigator.standalone === !0) && (/iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1), $r = (e) => Qr ? `x-safari-${new URL(e, location.href).href}` : e;
function ei(e, t, n) {
	let r = document.getElementById("viewer");
	r || (r = document.createElement("dialog"), r.id = "viewer", r.className = "viewer", r.innerHTML = `<header><b></b><select class="vsel" aria-label="${h("Versão")}" hidden></select><a target="_blank" rel="noopener" title="${h("Abrir numa aba")}" aria-label="${h("Abrir numa aba")}">${D("external", 20)}</a><button type="button" title="${h("Fechar")}" aria-label="${h("Fechar")}">${D("x", 20)}</button></header><div class="vbody"></div>`, r.querySelector("button").onclick = () => r.close(), r.querySelector("header a").onclick = () => r.close(), r.querySelector(".vsel").onchange = (e) => {
		let t = e.target.value;
		ri(r, `/api/books/${j.id}/files/${t}`, r.dataset.kind, r.dataset.name);
	}, r.addEventListener("click", (e) => {
		e.target.classList.contains("vbody") && r.close();
	}), r.addEventListener("close", () => {
		r.querySelector(".vbody").innerHTML = "", history.state?.viewer && (ai = !0, history.back());
	}), document.body.appendChild(r)), ri(r, e, t, n), r.open || f.pushState({ viewer: 1 }, "", r.dataset.fid ? `${location.pathname}${location.search}#f${r.dataset.fid}` : location.href), r.showModal();
}
function ti(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of j.files || []) n.name === e && t.set(n.id, {
		id: n.id,
		ts: n.ts
	});
	for (let n of X()) for (let r of n.files || []) r.name === e && !t.has(r.id) && t.set(r.id, {
		id: r.id,
		ts: n.ts
	});
	return [...t.values()].sort((e, t) => t.ts - e.ts);
}
function ni() {
	let e = document.getElementById("viewer");
	if (!e?.open || !e.dataset.name) return;
	let t = e.querySelector(".vsel"), n = ti(e.dataset.name), r = e.dataset.fid;
	t.hidden = n.length < 2, t.innerHTML = n.map((e, t) => `<option value="${e.id}"${e.id === r ? " selected" : ""}>v${n.length - t}${t === 0 ? ` · ${h("mais nova")}` : ""} · ${new Date(e.ts).toLocaleString(m, {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	})}</option>`).join("");
}
function ri(e, t, n, r) {
	e.dataset.kind = n, e.dataset.name = typeof t == "string" ? r : "", e.dataset.fid = typeof t == "string" ? /\/files\/([0-9a-f]+)/.exec(t)?.[1] ?? "" : "", e.querySelector("header b").textContent = r, e.querySelector("header a").href = typeof t == "string" ? $r(t) : "";
	let i = e.querySelector(".vsel");
	i.hidden = !0, e.dataset.fid && (ni(), j.filesAll || N({ t: "files.get" })), e.open && e.dataset.fid && history.state?.viewer && f.replaceState(history.state, "", `${location.pathname}${location.search}#f${e.dataset.fid}`);
	let a = e.querySelector(".vbody");
	if (a.className = `vbody ${n}`, e.classList.toggle("noLink", n === "table"), n === "table") a.replaceChildren(t.cloneNode(!0));
	else if (n === "img") {
		let e = new Image();
		e.src = t, e.alt = r, a.replaceChildren(e);
	} else if (/\.(md|markdown|txt|csv)$/i.test(r) && typeof t == "string") a.className = "vbody text", a.replaceChildren(), fetch(t).then((e) => e.ok ? e.text() : Promise.reject(e.status)).then((n) => {
		(!e.dataset.fid || t.endsWith(e.dataset.fid)) && (a.innerHTML = /\.(md|markdown)$/i.test(r) ? `<div class="vdoc md">${we(n.slice(0, 3e5))}</div>` : /\.csv$/i.test(r) ? `<div class="vdoc"><table>${ii(n).map((e, t) => `<tr>${e.map((e) => `<${t ? "td" : "th"}>${_(e)}</${t ? "td" : "th"}>`).join("")}</tr>`).join("")}</table></div>` : `<pre class="vdoc">${_(n.slice(0, 3e5))}</pre>`);
	}).catch(() => {
		a.innerHTML = `<p class="vdoc">${h("Não consegui abrir este arquivo.")}</p>`;
	});
	else {
		let e = document.createElement("iframe");
		e.src = t, e.title = r, /\.pdf$/i.test(r) || (e.sandbox = "allow-scripts"), a.replaceChildren(e);
	}
}
function ii(e) {
	let t = [], n = [], r = "", i = !1;
	for (let a = 0; a < e.length && t.length < 2e3; a++) {
		let o = e[a];
		i ? o === "\"" ? e[a + 1] === "\"" ? (r += "\"", a++) : i = !1 : r += o : o === "\"" ? i = !0 : o === "," || o === ";" && !e.slice(0, 200).includes(",") ? (n.push(r), r = "") : o === "\n" ? (n.push(r.replace(/\r$/, "")), t.push(n.slice(0, 50)), n = [], r = "") : r += o;
	}
	return (r || n.length) && (n.push(r), t.push(n.slice(0, 50))), t;
}
var ai = !1;
function oi() {
	if (ai) return ai = !1, !0;
	let e = document.getElementById("viewer");
	return e?.open ? (f.replaceState(null, "", location.href), e.close(), !0) : !1;
}
document.addEventListener("click", (e) => {
	if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
	let t = e.target.closest?.("a[data-view]");
	if (t) return e.preventDefault(), ei(t.getAttribute("href"), t.dataset.view, t.dataset.name || "");
	let n = e.target.closest?.("a[href]");
	if (!n || !j?.id) return;
	let r;
	try {
		r = new URL(n.getAttribute("href"), location.href);
	} catch {
		return;
	}
	let i = r.origin === location.origin && RegExp(`^/api/books/${j.id}/files/([0-9a-f]+)$`).exec(r.pathname);
	if (!i) return;
	let a = (j.files || []).find((e) => e.id === i[1]) || X().flatMap((e) => e.files || []).find((e) => e.id === i[1]);
	e.preventDefault(), ei(r.pathname, a?.type?.startsWith("image/") ? "img" : "frame", a?.name || n.textContent.trim() || "arquivo");
});
var si = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, ci = (e) => e?.length ? `<div class="atts">${e.map((e) => e.embed ? `<div class="embedBox"><div class="embedWrap"><iframe class="embed" src="${Xr(e)}" sandbox="allow-scripts" loading="lazy" title="${_(e.name)}"></iframe><a class="embedOpen" href="${Xr(e)}" ${Zr(e)} title="${h("Abrir em tela cheia")}" aria-label="${h("Abrir em tela cheia")}">${D("expand", 15)}</a></div></div>` : e.type.startsWith("audio/") ? `<div class="audioAtt"><audio controls preload="metadata" src="${Xr(e)}"></audio><a href="${Xr(e)}" target="_blank" rel="noopener" download="${_(e.name)}">${D("mic", 14)} ${_(e.name)} <small>${si(e.size)}</small></a></div>` : e.type.startsWith("image/") ? `<a href="${Xr(e)}" target="_blank" rel="noopener" ${Zr(e)}><img src="${Xr(e)}" alt="${_(e.name)}" loading="lazy" /></a>` : `<a class="fileChip" href="${Xr(e)}" target="_blank" rel="noopener" ${Zr(e)}>${Ht(e)} ${_(e.name)} <small>${si(e.size)}</small></a>`).join("")}</div>` : "";
function li(e) {
	let t = j.polls?.[e];
	if (!t) return "";
	let n = t.votes.map((e) => e.length), r = n.reduce((e, t) => e + t, 0), i = Math.max(...n), a = new Set(t.votes.flat()).size;
	return `<div class="poll" data-poll="${e}">
    <div class="pq">${D("chart", 18)} ${_(t.question)}</div>
    ${t.options.map((e, a) => {
		let o = n[a], s = r ? Math.round(100 * o / r) : 0, c = t.votes[a].includes(j.me), l = t.closed && o > 0 && o === i;
		return `<button type="button" class="opt ${c ? "mine" : ""} ${l ? "win" : ""}" data-vote="${a}" ${t.closed ? "disabled" : ""} aria-pressed="${c}">
        <span class="fill" style="width:${s}%"></span><span class="ol">${l ? `${D("trophy")} ` : c ? `${D("check")} ` : ""}${_(e)}</span>
        <span class="stack">${t.votes[a].slice(0, 4).map((e) => x(e)).join("")}</span><span class="pc">${o ? `${s}%` : ""}</span></button>`;
	}).join("")}
    <div class="pf">${a === 1 ? h("1 pessoa votou") : h("{n} pessoas votaram", { n: a })} · ${t.multi ? h("pode escolher várias") : h("escolha uma")}${t.closed ? ` · ${h("encerrada")}` : t.author === j.me || t.author === "ai" ? ` · <button type="button" class="link" data-close="${e}">${h("encerrar")}</button>` : ""}</div>
  </div>`;
}
var ui = (e) => new Date(e).toLocaleTimeString(m, {
	hour: "2-digit",
	minute: "2-digit"
}), di = (e, t) => !!e && e.author === t.author && (e.kind || null) === (t.kind || null) && (e.tag || null) === (t.tag || null) && t.ts - e.ts < 3e5 && !e.poll && !t.poll, fi = (e) => {
	let t = j.messages.filter((t) => t.thread === e.id), n = t.at(-1), r = j.counts ? (j.counts[e.id] ?? 0) + t.filter((e) => e.id > (j.countsAt ?? 0)).length : t.length, i = e.tasks.filter((e) => e.status === "done").length;
	return `${Nr(e)}<span class="tc-t"><b>${_(e.title)}</b><small>${e.archived ? `✓ ${h("concluído")} · ` : ""}${e.tasks.length ? `${h("{d}/{n} tarefas", {
		d: i,
		n: e.tasks.length
	})} · ` : ""}${r === 1 ? h("1 resposta") : h("{n} respostas", { n: r })}${n ? ` · ${S(n.ts) === h("agora") ? h("agora") : h("última há {ago}", { ago: S(n.ts) })}` : ""}</small></span><span class="tc-go">→</span>`;
};
function pi(e) {
	let t = /* @__PURE__ */ new Map();
	for (let e of j.epics || []) e.parent && (t.has(e.parent) || t.set(e.parent, []), t.get(e.parent).push(e.id));
	let n = [e];
	for (let e = 0; e < n.length && n.length < 60; e++) for (let r of t.get(n[e]) || []) n.includes(r) || n.push(r);
	let r = new Set(n), i = /* @__PURE__ */ new Map();
	for (let e of [...j.messages].reverse()) if (r.has(e.thread)) for (let t of e.files || []) {
		let e = i.get(t.name);
		e ? e.seen.add(t.id) : i.set(t.name, {
			f: t,
			seen: /* @__PURE__ */ new Set([t.id]),
			n: 0
		});
	}
	for (let e of n) for (let t of j.epics.find((t) => t.id === e)?.files || []) {
		let e = i.get(t.name);
		e ? e.n = Math.max(e.n, t.n, e.seen.size) : i.set(t.name, {
			f: t,
			seen: /* @__PURE__ */ new Set([t.id]),
			n: t.n
		});
	}
	return [...i.values()].map((e) => ({
		...e.f,
		n: Math.max(e.n, e.seen.size)
	}));
}
var mi = (e) => {
	let t = pi(e);
	return t.length ? `<div class="tcFiles" data-files-of="${e}">${t.slice(0, 6).map((e) => `<a class="fchip" href="/api/books/${j.id}/files/${e.id}" title="${_(e.name)}">${Ht(e, 14)}<span>${_(e.name)}</span>${e.n > 1 ? `<small>v${e.n}</small>` : ""}</a>`).join("")}${t.length > 6 ? `<small class="mute">+${t.length - 6}</small>` : ""}</div>` : "";
}, hi = (e) => (j.epics || []).filter((t) => t.from_msg === e).map((e) => `<button type="button" class="tcard" data-goepic="${e.id}">${fi(e)}</button>${mi(e.id)}`).join("");
function gi() {
	Z("stay");
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-gomain]");
	if (t) return M = "main", Q = !1, z(), Z(), V(), $(), document.getElementById(`m${t.dataset.gomain}`)?.scrollIntoView({ block: "center" });
	let n = e.target.closest(".tcard[data-goepic]");
	n && (M = n.dataset.goepic, Q = !1, z(), Z(), V(), $());
});
function _i() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".endMark, .prodStage").forEach((e) => e.remove());
	let t = j.epics.find((e) => e.id === M), n = t?.prod, r = n ? n.stage === "verified" ? `<div class="prodStage ok"><b>✓✓ ${h("Verificado em prod")}</b>${n.note ? `<span>${_(n.note)}</span>` : ""}</div>` : `<div class="prodStage"><b>🚀 ${h("No ar")}</b><span>${h("Falta o agent verificar em prod.")}</span></div>` : "";
	t?.archived && e.insertAdjacentHTML("beforeend", `<div class="endMark"><b>✓ ${h("Agent fez")}</b><span>${h("Escreva aqui pra continuar: ele reabre.")}</span></div>`), r && e.insertAdjacentHTML("beforeend", r);
}
var W = null, vi = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? h("votação") : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120), yi = (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? h("{via} de {who}", {
	via: "Agent",
	who: y(e.author)
}) : y(e.author), bi = (e) => {
	let t = j.messages.find((t) => t.id === e);
	return `<button type="button" class="quote" data-goto="${e}" title="${h("Ver a mensagem respondida")}">${D("reply", 13)} ${t ? `<b>${_(yi(t))}</b> ${_(vi(t))}` : h("mensagem anterior")}</button>`;
};
function xi() {
	let e = document.getElementById("replyBar");
	e && (W && W.thread !== M && (W = null), e.hidden = !W, W && (e.innerHTML = `<span>${D("reply", 13)} ${h("Respondendo a <b>{who}</b>", { who: _(yi(W)) })}: ${_(vi(W))}</span><button type="button" class="ghost" id="replyX" aria-label="${h("Cancelar resposta")}" title="${h("Cancelar")}">${D("x")}</button>`), document.getElementById("replyX")?.addEventListener("click", () => {
		W = null, xi();
	}));
}
function Si(e) {
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px", document.body.append(t), t.focus({ preventScroll: !0 }), t.setSelectionRange(0, e.length);
	let n = !1;
	try {
		n = document.execCommand("copy");
	} catch {}
	return t.remove(), n;
}
function Ci(e) {
	let t = X().find((t) => t.id === e);
	if (!t) return;
	let n = `${location.origin}/b/${j.id}${t.thread && t.thread !== "main" ? `?t=${encodeURIComponent(t.thread)}` : ""}#m${e}`, r = () => {
		B(`✓ ${h("Link copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (Si(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => B(`${h("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copylink="${e}">${h("Copiar link")}</button>`));
}
function wi(e) {
	let t = j.messages.find((t) => t.id === e);
	if (!t) return;
	let n = t.text || t.files?.map((e) => e.name).join("\n") || "";
	if (!n) return B(h("Essa mensagem não tem texto pra copiar."), 2500);
	let r = () => {
		B(`✓ ${h("Copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (Si(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => {
		B(`${h("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copymsg="${e}">${h("Copiar")}</button>`);
	});
}
function Ti(e) {
	W = j.messages.find((t) => t.id === e) ?? null, xi(), document.getElementById("input")?.focus();
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-reply]");
	if (t) return Ti(Number(t.dataset.reply));
	let n = e.target.closest("[data-copymsg]");
	if (n) return wi(Number(n.dataset.copymsg));
	let r = e.target.closest("[data-copylink]");
	if (r) return Ci(Number(r.dataset.copylink));
	let i = e.target.closest("a.mlink[data-msg]");
	if (i) return e.preventDefault(), Di(Number(i.dataset.msg));
	let a = e.target.closest(".quote[data-goto]");
	a && Di(Number(a.dataset.goto));
});
var Ei = null;
function Di(e, t) {
	let n = j.messages.find((t) => t.id === e), r = n?.thread || t;
	r && r !== M && (r === "main" || j.epics.some((e) => e.id === r)) && (M = r, Q = !1, z(), Z(), V(), $());
	let i = document.getElementById(`m${e}`);
	if (!i && n) {
		let t = j.messages.filter((e) => e.thread === M), r = t.indexOf(n);
		r >= 0 && (Y.n = Math.max(Y.n, t.length - r + 10), Z(!0), i = document.getElementById(`m${e}`));
	}
	if (!i) return Ei?.id === e ? void 0 : (Ei = {
		id: e,
		n: 0
	}, B(h("Buscando a mensagem…"), 1500), ba());
	Ei = null, Ta = !1, i.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), i.classList.remove("flash"), i.offsetWidth, i.classList.add("flash");
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && W && document.activeElement?.id === "input" && (W = null, xi());
});
var G = null;
document.addEventListener("touchstart", (e) => {
	let t = !e.target.closest("pre, table, .embedBox") && e.target.closest(".msgs .msg[id^=m]");
	G = t && e.touches.length === 1 ? {
		m: t,
		x: e.touches[0].clientX,
		y: e.touches[0].clientY,
		dx: 0
	} : null;
}, { passive: !0 }), document.addEventListener("touchmove", (e) => {
	if (!G) return;
	let t = e.touches[0].clientX - G.x, n = e.touches[0].clientY - G.y;
	if (!G.locked) {
		if (Math.abs(n) > 8 && Math.abs(n) >= Math.abs(t)) {
			G = null;
			return;
		}
		if (Math.abs(t) < 10 || Math.abs(t) <= Math.abs(n)) return;
		G.locked = !0, G.m.classList.add("swipe");
	}
	e.preventDefault(), G.dx = t, G.m.style.transform = `translateX(${Math.max(-80, Math.min(t, 80))}px)`, G.m.dataset.sw = t < 0 ? `← ${h("Copiar")}` : `${h("Responder")} →`, G.m.classList.toggle("swL", t < 0), G.m.classList.toggle("swR", t > 0), G.m.classList.toggle("swGo", Math.abs(t) > 60);
}, { passive: !1 }), document.addEventListener("touchend", () => {
	if (!G) return;
	let { m: e, dx: t } = G;
	G = null, e.classList.remove("swipe", "swL", "swR", "swGo"), e.style.transform = "", t > 60 ? Ti(Number(e.id.slice(1))) : t < -60 && wi(Number(e.id.slice(1)));
});
function Oi(e) {
	let t;
	try {
		t = typeof e.card == "string" ? JSON.parse(e.card) : e.card;
	} catch {
		return "";
	}
	if (!t?.elements?.[t.root]) return "";
	let n = j.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent"), r = e.kind === "agent" && e.author === j.me && !n, i = (e) => _(String(e ?? "")).replace(/\n/g, "<br>"), a = (o, s = 0) => {
		let c = t.elements[o];
		if (!c || s > 8) return "";
		let l = c.props || {}, u = () => (c.children || []).map((e) => a(e, s + 1)).join("");
		switch (c.type) {
			case "Card": return `<div class="vcard">${l.title ? `<div class="vh"><b>${i(l.title)}</b>${l.subtitle ? `<small>${i(l.subtitle)}</small>` : ""}</div>` : ""}<div class="vb">${u()}</div></div>`;
			case "Section": return `<section class="vsec">${l.title ? `<h5>${i(l.title)}</h5>` : ""}${u()}</section>`;
			case "Text": return `<p class="vtx ${_(l.style || "plain")}">${i(l.content)}</p>`;
			case "Fields": return `<dl class="vfields">${u()}</dl>`;
			case "Field": return `<div><dt>${i(l.label)}</dt><dd>${i(l.value)}</dd></div>`;
			case "Table": return `<div class="vtWrap"><button type="button" class="vtOpen" data-vtopen title="${h("Abrir em tela cheia")}" aria-label="${h("Abrir em tela cheia")}">${D("expand", 14)}</button><div class="vtable"><table>${l.headers?.length ? `<thead><tr>${l.headers.map((e) => `<th>${i(e)}</th>`).join("")}</tr></thead>` : ""}<tbody>${(l.rows || []).map((e) => `<tr>${e.map((e) => `<td>${i(e)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
			case "Chart": {
				let e = l.data || [], t = Math.max(...e.map((e) => Math.abs(e.value)), 1);
				if (l.kind === "line") {
					let n = e.length > 1 ? 300 / (e.length - 1) : 0, r = Math.min(...e.map((e) => e.value), 0), a = t - r || 1, o = e.map((e, t) => `${(t * n).toFixed(1)},${(90 - (e.value - r) / a * 90).toFixed(1)}`).join(" ");
					return `<figure class="vchart">${l.title ? `<figcaption>${i(l.title)}</figcaption>` : ""}<svg viewBox="-4 -4 308 98" preserveAspectRatio="none"><polyline points="${o}" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="vlab"><span>${i(e[0]?.label)}</span><span>${i(e.at(-1)?.label)}</span></div></figure>`;
				}
				return `<figure class="vchart">${l.title ? `<figcaption>${i(l.title)}</figcaption>` : ""}${e.map((e) => `<div class="vbar"><span>${i(e.label)}</span><i style="width:${Math.round(Math.abs(e.value) / t * 100)}%"></i><b>${i(e.value)}</b></div>`).join("")}</figure>`;
			}
			case "Divider": return "<hr class=\"vhr\">";
			case "Image": return /^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(l.url) ? `<img class="vimg" src="${_(l.url)}" alt="${_(l.alt || "")}" loading="lazy">` : "";
			case "Actions": return `<div class="vact">${u()}</div>`;
			case "Button": {
				let t = l.value || l.label, a = n?.text === t;
				return r ? `<button type="button" class="vbtn ${_(l.style || "")}" data-cardbtn="${e.id}" data-v="${_(t)}">${i(l.label)}</button>` : `<span class="vbtn ro ${a ? "on" : ""}">${a ? D("check", 14) : ""}${i(l.label)}</span>`;
			}
			case "LinkButton": return /^#(m\d+|e[a-z0-9]+|doc(:[a-z0-9]+)?|app:(room|[a-f0-9]{12})\/[\w.-]+)$/.test(l.url || "") ? `<button type="button" class="vbtn link" data-cardgo="${_(l.url)}">${i(l.label)} ${D("arrowRight", 13)}</button>` : /^https?:\/\//i.test(l.url) ? `<a class="vbtn link" href="${_(l.url)}" target="_blank" rel="noopener noreferrer">${i(l.label)} ${D("external", 13)}</a>` : "";
			default: return "";
		}
	};
	return a(t.root);
}
function ki(e) {
	if (e.startsWith("#app:")) {
		let [t, n] = e.slice(5).split("/");
		q = {
			cid: t,
			tool: n
		}, document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" })), H.matches && Kr("doc");
		return;
	}
	if (e.startsWith("#m")) return Di(Number(e.slice(2)));
	let t = e.startsWith("#e") ? e.slice(2) : e.split(":")[1], n = t && j.epics.some((e) => e.id === t) ? t : t ? null : M;
	if (!n) return B(h("Esse épico não existe mais nesta sala."));
	n !== M && (M = n, Q = !1, z(), Z(), V(), $()), e.startsWith("#doc") && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" })), H.matches && Kr("doc"));
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardgo]");
	t && (e.preventDefault(), ki(t.dataset.cardgo));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-vtopen]");
	if (!t) return;
	let n = t.parentElement.querySelector("table");
	n && ei(n, "table", t.closest(".vcard")?.querySelector(".vh b")?.textContent || h("Tabela"));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardbtn]");
	if (!t) return;
	let n = j.messages.find((e) => e.id === Number(t.dataset.cardbtn));
	t.closest(".vcard")?.querySelectorAll("[data-cardbtn]").forEach((e) => e.disabled = !0), N({
		t: "msg",
		thread: n?.thread ?? M,
		text: t.dataset.v,
		files: [],
		reply_to: Number(t.dataset.cardbtn)
	});
});
var Ai = (e) => e?.kind === "agent" && e.author !== j.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(e.text || ""), ji = (e) => {
	if (!e?.reply_to || e.kind === "agent") return !1;
	let t = j.messages.find((t) => t.id === e.reply_to);
	return !!t && er(t) && t.author === e.author;
};
function Mi(e, t, n) {
	if (n) {
		let e = /^\s*aprov/i.test(n.text);
		return `<div class="permAsk done ${e ? "ok" : "no"}">${D(e ? "check" : "x", 14)} ${h(e ? "Aprovado por {who}" : "Negado por {who}", { who: _(y(n.author)) })} · ${ui(n.ts)}</div>`;
	}
	return t.closed ? `<div class="permAsk done">${D("terminal", 14)} ${h("foi pro terminal")}</div>` : e.author === j.me ? `<div class="permAsk" data-perm="${e.id}"><button type="button" class="primary" data-pv="Aprovar">${h("Aprovar")}</button><button type="button" class="ghost" data-pv="Negar">${h("Negar")}</button></div>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${_(e)}</span>`).join("")}<small>${h("esperando {who}", { who: _(y(e.author)) })}</small></div>`;
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-perm] [data-pv], [data-perm] [data-pconfirm], [data-perm] [data-pcancel]");
	if (!t) return;
	let n = t.closest("[data-perm]"), r = Number(n.dataset.perm);
	if (t.dataset.pv) {
		let e = t.dataset.pv === "Aprovar";
		n.innerHTML = `<span class="pq">${h(e ? "Aprovar este pedido?" : "Negar este pedido?")}</span><button type="button" class="${e ? "primary" : "danger"}" data-pconfirm="${t.dataset.pv}">${h("Confirmar")}</button><button type="button" class="ghost" data-pcancel="1">${h("Cancelar")}</button>`, n.classList.add("confirm");
		return;
	}
	if (t.dataset.pcancel) {
		let e = j.messages.find((e) => e.id === r);
		e && (n.outerHTML = Ni(e));
		return;
	}
	let i = j.messages.find((e) => e.id === r);
	n.querySelectorAll("button").forEach((e) => e.disabled = !0), N({
		t: "msg",
		thread: i?.thread ?? M,
		text: t.dataset.pconfirm,
		files: [],
		reply_to: r
	});
});
function Ni(e) {
	let t;
	try {
		t = JSON.parse(e.choices);
	} catch {
		return "";
	}
	let n = j.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent");
	if (er(e)) return Mi(e, t, n);
	let r = !er(e);
	if (!n && t.closed) return `<div class="choice ro closed">${t.options.map((e) => `<span class="opt">${_(e)}</span>`).join("")}<small>${h("foi pro terminal")}</small></div>`;
	if (n) {
		let e = new Set(n.text.split(" · ")), i = r && !t.options.some((t) => e.has(t));
		return `<div class="choice done">${t.options.map((t) => `<span class="opt ${e.has(t) ? "on" : ""}">${e.has(t) ? D("check", 14) : ""}${_(t)}</span>`).join("")}${i ? `<span class="opt on">${D("check", 14)}${h("Outro")}</span>` : ""}</div>`;
	}
	return e.kind === "agent" && e.author === j.me ? `<form class="choice" data-choice="${e.id}" data-multi="${t.multi ? 1 : ""}">${t.options.map((n) => `<label class="opt"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="${_(n)}" />${_(n)}</label>`).join("")}${r ? `<label class="opt oth"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="" data-other="1" />${h("Outro")}…</label>` : ""}<small>${h("escolha e envie pela caixa de mensagem")}</small></form>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${_(e)}</span>`).join("")}<small>${h("esperando {who}", { who: _(y(e.author)) })}</small></div>`;
}
document.addEventListener("change", (e) => {
	let t = e.target.closest("form.choice");
	if (!t) return;
	let n = document.getElementById("input");
	n && (e.target.dataset.other ? e.target.checked && (t.dataset.multi || t.querySelectorAll("input").forEach((t) => t.checked = t === e.target), n.value = "") : n.value = [...t.querySelectorAll("input:checked:not([data-other])")].map((e) => e.value).join(" · "), Ti(Number(t.dataset.choice)), n.dispatchEvent(new Event("input", { bubbles: !0 })), n.focus());
});
var Pi = (e) => e?.tag === "reminder" ? (e.text || "").split("\n")[0] : e?.tag === "issue" ? "⚠issue" : null;
function Fi(e) {
	let t = [];
	for (let n of e) {
		let e = Pi(n), r = t[t.length - 1];
		e && Pi(r) === e ? t[t.length - 1] = {
			...n,
			runs: [...r.runs || [r.ts], n.ts],
			group: [...r.group || [r], n]
		} : t.push(n);
	}
	return t;
}
function Ii(e) {
	let t = (e.group || [e]).slice().reverse(), n = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? ui(e) : `${new Date(e).toLocaleDateString(m, {
		day: "numeric",
		month: "short"
	})} ${ui(e)}`, r = (e) => {
		let [t, ...n] = (e.text || "").split("\n\n");
		return {
			head: t.replace(/^⚠\s*/, ""),
			what: n.join("\n\n")
		};
	}, i = r(t[0]);
	return `<div class="msg remMsg issueMsg" id="m${e.id}">${Bi(e.id)}<div class="body"><details><summary>${D("alert", 14)}<span class="remT"><b>${t.length > 1 ? h("{n} issues dos agents", { n: t.length }) : h("Issue de um agent")}</b> ${_(i.what.replace(/\s+/g, " ").slice(0, 140))}</span><span class="remWhen" title="${_(new Date(e.ts).toLocaleString(m))}">${n(e.ts)}</span></summary><div class="txt issueList">${t.map((e) => {
		let t = r(e);
		return `<div class="iss"><small>${n(e.ts)} · ${ge(we(t.head))}<span class="issAct"><button type="button" class="rbtn" data-copymsg="${e.id}" title="${h("Copiar")}" aria-label="${h("Copiar o texto desta mensagem")}">${D("copy", 13)}</button><button type="button" class="rbtn" data-reply="${e.id}" title="${h("Responder")}" aria-label="${h("Responder a esta mensagem")}">${D("reply", 13)}</button></span></small><div>${_(t.what)}</div></div>`;
	}).join("")}</div></details></div></div>`;
}
function Li(e, t = !1) {
	let [n, ...r] = (e.text || "").split("\n\n"), i = e.runs || [e.ts], a = n.replace(/^⏰\s*/, ""), o = a.match(/^\*\*(.+?)\*\*\s*(.*)$/), s = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? ui(e) : `${new Date(e).toLocaleDateString(m, {
		day: "numeric",
		month: "short"
	})} ${ui(e)}`;
	return `<div class="msg remMsg" id="m${e.id}">${Bi(e.id)}<div class="body"><details><summary>${D("clock", 14)}<span class="remT">${o ? `<b>${_(o[1])}</b> ${_(o[2])}` : _(a)}</span><span class="remWhen" title="${_(new Date(e.ts).toLocaleString(m))}">${i.length > 1 ? `${h("rodou {n}×", { n: i.length })} · ` : ""}${s(e.ts)}</span></summary>${r.length ? `<div class="txt">${ge(we(r.join("\n\n")))}</div>` : ""}${i.length > 1 ? `<small class="remRuns">${i.map(s).join(" · ")}</small>` : ""}</details>${t ? "" : (e.group || [e]).map((e) => hi(e.id)).join("")}</div></div>`;
}
var Ri = (e) => e.author === "ai" && (e.tag === "notice" || e.tag === "done" || /^↩ (Reabri|I reopened)/.test(e.text || ""));
function zi(e) {
	let t = (e.text || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim(), n = new Date(e.ts).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? ui(e.ts) : `${new Date(e.ts).toLocaleDateString(m, {
		day: "numeric",
		month: "short"
	})} ${ui(e.ts)}`;
	return `<div class="msg remMsg noticeMsg" id="m${e.id}">${Bi(e.id)}<div class="body"><details><summary><span class="vibeMark" aria-hidden="true">✦</span><span class="remT">${ge(_(t))}</span><span class="remWhen" title="${_(new Date(e.ts).toLocaleString(m))}">${n}</span></summary><div class="txt">${ge(we(e.text || ""))}</div></details></div></div>`;
}
var Bi = (e) => `<span class="mact"><button type="button" class="rbtn" data-copymsg="${e}" title="${h("Copiar")}" aria-label="${h("Copiar o texto desta mensagem")}">${D("copy", 14)} ${h("Copiar")}</button><button type="button" class="rbtn" data-copylink="${e}" title="${h("Copiar link")}" aria-label="${h("Copiar o link desta mensagem")}">${D("link", 14)} ${h("Copiar link")}</button><button type="button" class="rbtn" data-reply="${e}" title="${h("Responder")}" aria-label="${h("Responder a esta mensagem")}">${D("reply", 14)} ${h("Responder")}</button></span>`;
function Vi() {
	let e = document.getElementById("decPane");
	if (!e) return;
	let t = j.decisions || [];
	document.getElementById("decCount").textContent = t.length ? ` ${t.length}` : "", e.innerHTML = t.length ? t.slice().reverse().map((e) => `<div class="dec ${e.kind === "approval" ? "approval" : ""}"><div>${_(e.text)}<small>${e.kind === "approval" ? `✓ ${h("aprovado")}` : h("decidido")} · ${_(e.who)} · ${S(e.ts)}</small></div>
      <button class="ghost x" data-ddel="${e.id}" aria-label="${h("Apagar registro")}" title="${h("Apagar registro")}">${D("x")}</button></div>`).join("") : `<div class="empty">${h("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.")}</div>`, e.querySelectorAll("[data-ddel]").forEach((e) => e.onclick = () => {
		confirm(h("Apagar esse registro?")) && N({
			t: "decision.del",
			id: Number(e.dataset.ddel)
		});
	});
}
function Hi() {
	document.querySelector(".doc[data-pane=\"apps\"]") && J();
}
var K = null, Ui = null, Wi = !1, q = null, Gi = /* @__PURE__ */ new Set();
async function Ki() {
	let e = j.id;
	try {
		let t = await C(`/api/books/${e}/connections`);
		j.id === e && (K = t.connections, Ui = e);
	} catch (e) {
		K ||= [], B(_(e.message));
	}
	J();
}
var qi = (e) => e.scope === "me" ? `<span class="cScope me">${h("minha")}</span>` : `<span class="cScope">${h("da sala")}</span>`;
function Ji() {
	let e = /* @__PURE__ */ new Set();
	return (j.files || []).filter((t) => t.type === "text/html" && /^apps\/[\w.-]+\.html$/i.test(t.name) && !e.has(t.name) && e.add(t.name)).map((e) => ({
		tool: e.name.slice(5, -5),
		title: e.name.slice(5, -5),
		description: `${y(e.author)} · ${S(e.ts)}`,
		file: e
	}));
}
function Yi() {
	document.querySelector(".doc[data-pane=\"apps\"]") && !(q && document.querySelector(".connFrame")) && J();
}
function J() {
	let e = document.getElementById("appsPane");
	if (!e) return;
	if (Ui !== j.id && (K = null, Ui = j.id), j.filesAll || N({ t: "files.get" }), K === null) {
		e.innerHTML = `<div class="empty">${h("Carregando…")}</div>`, Ki(), K = void 0;
		return;
	}
	if (K === void 0) return;
	let t = Ji();
	if (document.getElementById("appCount").textContent = K.length + t.length ? ` ${K.length + t.length}` : "", q) return Xi(e);
	let n = document.getElementById("connForm") && Object.fromEntries(new FormData(document.getElementById("connForm"))), r = (e, t) => `<div class="connApps">${t.map((t) => `<button type="button" class="connApp" data-conn-open="${e}/${_(t.tool)}"><b>${_(t.title)}</b><span>${_(t.description)}</span></button>`).join("")}</div>`;
	e.innerHTML = `<div class="connHead"><b>Apps</b>${Wi ? "" : `<button type="button" class="ghost" id="connAdd">${D("plus", 15)} ${h("Conectar MCP")}</button>`}</div>
    ${Wi ? `<form class="connForm" id="connForm">
      <label>${h("URL do servidor MCP")}<input name="url" required placeholder="https://…/mcp" autocomplete="off" spellcheck="false"></label>
      <small class="mute">${h("Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.")}</small>
      <fieldset><label><input type="radio" name="scope" value="me" checked> ${h("Só minha: só eu e meus agents")}</label><label><input type="radio" name="scope" value="room"> ${h("Da sala: todo mundo vê; cada um entra com a própria conta")}</label></fieldset>
      <div class="acts"><button type="button" id="connCancel">${h("Cancelar")}</button><button class="primary">${h("Conectar")}</button></div></form>` : ""}
    <div class="conn"><div class="connTop"><b>${h("Esta sala")}</b><span class="cScope">${h("da sala")}</span><small>apps/*.html</small></div>
      ${t.length ? r("room", t) : `<small class="mute">${h("Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.")}</small>`}</div>
    ${K.map((e) => `<div class="conn"><div class="connTop"><b>${_(e.title)}</b>${qi(e)}<small>${_(e.host)} · ${_(y(e.owner))}</small>
        <button type="button" class="ghost" data-conn-ref="${e.id}" title="${h("Atualizar")}" aria-label="${h("Atualizar")}">↻</button>${e.mine ? `<button type="button" class="ghost" data-conn-del="${e.id}" title="${h("Remover conexão")}" aria-label="${h("Remover conexão")}">${D("x", 14)}</button>` : ""}</div>
        ${e.auth === "identity" ? e.signed_in ? `<small class="mute connWho">${h("Você entrou em {host} com a sua conta.", { host: _(e.host) })} <button type="button" class="link" data-conn-out="${e.id}">${h("Sair")}</button></small>` : `<div class="connSign"><small>${h("Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.", { host: _(e.host) })}</small><a class="primary" href="/api/books/${j.id}/connections/${e.id}/signin?ui=svelte">${h("Entrar em {host}", { host: _(e.host) })}</a></div>` : ""}
        ${e.apps.length ? (() => {
		let t = e.apps.filter((e) => e.screen), n = t.length && !Gi.has(e.id);
		return r(e.id, n ? t : e.apps) + (t.length && t.length < e.apps.length ? `<button type="button" class="link connMore" data-conn-more="${e.id}">${n ? h("ver todas ({n})", { n: e.apps.length }) : h("só as telas")}</button>` : "");
	})() : `<small class="mute">${h("{n} tools, nenhum app", { n: e.tools.length })}</small>`}</div>`).join("")}`;
	let i = document.getElementById("connForm");
	if (i && n) for (let [e, t] of Object.entries(n)) i.elements[e] && e !== "scope" && (i.elements[e].value = t);
	document.getElementById("connAdd")?.addEventListener("click", () => {
		Wi = !0, J(), document.querySelector("#connForm [name=\"url\"]")?.focus();
	}), document.getElementById("connCancel")?.addEventListener("click", () => {
		Wi = !1, J();
	}), i && (i.onsubmit = async (e) => {
		e.preventDefault();
		let t = i.querySelector(".primary");
		t.disabled = !0, t.textContent = h("Conectando…");
		try {
			let e = await C(`/api/books/${j.id}/connections`, {
				url: i.url.value.trim(),
				scope: i.scope.value
			});
			if (e.connection?.needs_sign_in) return void (location.href = `/api/books/${j.id}/connections/${e.connection.id}/signin?ui=svelte`);
			Wi = !1, K = null, J();
		} catch (e) {
			B(_(e.message)), t.disabled = !1, t.textContent = h("Conectar");
		}
	}), e.querySelectorAll("[data-conn-out]").forEach((e) => e.onclick = async () => {
		try {
			await C(`/api/books/${j.id}/connections/${e.dataset.connOut}/signout`, {});
		} catch (e) {
			B(_(e.message));
		}
		K = null, J();
	}), e.querySelectorAll("[data-conn-more]").forEach((e) => e.onclick = () => {
		let t = e.dataset.connMore;
		Gi.has(t) ? Gi.delete(t) : Gi.add(t), J();
	}), e.querySelectorAll("[data-conn-open]").forEach((e) => e.onclick = () => {
		let [t, n] = e.dataset.connOpen.split("/");
		q = {
			cid: t,
			tool: n
		}, J();
	}), e.querySelectorAll("[data-conn-ref]").forEach((e) => e.onclick = async () => {
		try {
			await C(`/api/books/${j.id}/connections/${e.dataset.connRef}/refresh`, {}), K = null, J();
		} catch (e) {
			B(_(e.message));
		}
	}), e.querySelectorAll("[data-conn-del]").forEach((e) => e.onclick = async () => {
		let t = K.find((t) => t.id === e.dataset.connDel);
		confirm(h("Remover a conexão {name}? Os apps dela saem da sala.", { name: t?.title || "" })) && (await fetch(`/api/books/${j.id}/connections/${e.dataset.connDel}`, { method: "DELETE" }), K = null, J());
	});
}
function Xi(e) {
	let t = q.cid === "room", n = t ? {
		id: "room",
		scope: "room",
		title: h("Esta sala")
	} : K.find((e) => e.id === q.cid), r = t ? Ji().find((e) => e.tool === q.tool) : n?.apps.find((e) => e.tool === q.tool);
	if (!n || !r) {
		if (t && !j.filesAll) {
			e.innerHTML = `<div class="empty">${h("Carregando…")}</div>`;
			return;
		}
		return !t && !q.retried ? (q.retried = !0, K = null, J()) : (q = null, B(h("Esse app não está nas conexões que você pode usar nesta sala.")), J());
	}
	let i = `${n.id}/${r.tool}${t ? `@${r.file.id}` : ""}`, a = t ? r.tool : `${n.id}/${r.tool}`, o = e.querySelector(".connBar");
	if (e.querySelector(".connFrame")?.dataset.app === i) {
		o?.querySelector(".pinBtn")?.replaceWith(Object.assign(document.createElement("template"), { innerHTML: da("app", a) }).content), o && fa(o);
		return;
	}
	e.innerHTML = `<div class="connBar"><button type="button" class="ghost" id="connBack">← Apps</button><b>${_(r.title)}</b>${qi(n)}${da("app", a)}<button type="button" class="ghost" id="connReload" title="${h("Recarregar")}" aria-label="${h("Recarregar")}">↻</button></div><div class="appAsk" id="appAsk" hidden></div><iframe class="connFrame" sandbox="allow-scripts allow-forms" title="${_(r.title)}"></iframe>`;
	let s = e.querySelector(".connFrame");
	s.dataset.app = i, document.getElementById("connBack").onclick = () => {
		q = null, J();
	}, fa(e.querySelector(".connBar")), document.getElementById("connReload").onclick = () => {
		s.dataset.app = "", Xi(e);
	}, sa(s, n, r);
}
var Zi = (e) => Array.isArray(e) ? e.filter((e) => e?.type === "text").map((e) => e.text).join("\n") : "", Qi = (e) => ({
	content: [{
		type: "text",
		text: typeof e == "string" ? e : JSON.stringify(e)
	}],
	...e && typeof e == "object" ? { structuredContent: e } : {}
}), $i = Promise.resolve();
function ea(e, t, n) {
	let r = () => new Promise((r) => {
		if (!e?.isConnected) return r(!1);
		e.hidden = !1, e.innerHTML = `<span>${h("Este app quer {what}, como você:", { what: _(t) })}</span><q></q><div><button type="button" class="primary">${h("Permitir")}</button><button type="button" class="ghost">${h("Cancelar")}</button></div>`, e.querySelector("q").textContent = String(n).slice(0, 600);
		let i = (t) => {
			e.hidden = !0, e.innerHTML = "", r(t);
		};
		e.querySelector(".primary").onclick = () => i(!0), e.querySelector(".ghost").onclick = () => i(!1);
	});
	return $i = $i.then(r, r);
}
var ta = [
	{
		name: "vibebook_read",
		description: "The room: title, doc, epics with tasks, members and the newest messages of a thread (default main).",
		inputSchema: {
			type: "object",
			properties: {
				thread: { type: "string" },
				limit: { type: "number" }
			}
		},
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_post",
		description: "Post a message as the person looking at the app (they confirm first).",
		inputSchema: {
			type: "object",
			properties: {
				text: { type: "string" },
				thread: { type: "string" }
			},
			required: ["text"]
		}
	},
	{
		name: "vibebook_add_task",
		description: "Add a task to an epic (epic_id) or to the room (main); the person confirms.",
		inputSchema: {
			type: "object",
			properties: {
				title: { type: "string" },
				epic_id: { type: "string" }
			},
			required: ["title"]
		}
	},
	{
		name: "vibebook_task_status",
		description: "Move a task: todo | doing | review | done; the person confirms.",
		inputSchema: {
			type: "object",
			properties: {
				task_id: { type: "string" },
				status: {
					type: "string",
					enum: [
						"todo",
						"doing",
						"review",
						"done"
					]
				}
			},
			required: ["task_id", "status"]
		}
	},
	{
		name: "vibebook_connections",
		description: "The room's MCP connections this person can use, with their tools.",
		inputSchema: { type: "object" },
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_call_connection",
		description: "Call a tool of one of the room's MCP connections; tools that aren't read-only ask the person first.",
		inputSchema: {
			type: "object",
			properties: {
				connection_id: { type: "string" },
				tool: { type: "string" },
				arguments: { type: "object" }
			},
			required: ["connection_id", "tool"]
		}
	}
];
function na({ thread: e = "main", limit: t = 50 } = {}) {
	let n = X().filter((t) => t.thread === e).slice(-Math.min(Math.max(Number(t) || 50, 1), 100));
	return {
		room: {
			id: j.id,
			title: P()
		},
		me: {
			email: j.me,
			name: y(j.me)
		},
		members: (j.members || []).map((e) => ({
			email: e.email ?? e,
			name: y(e.email ?? e)
		})),
		doc: j.doc || "",
		epics: j.epics.filter((e) => !e.archived).map((e) => ({
			id: e.id,
			title: e.title,
			tasks: e.tasks.map((e) => ({
				id: e.id,
				title: e.title,
				status: e.status,
				owner: e.owner || null
			}))
		})),
		room_tasks: (j.roomTasks || []).map((e) => ({
			id: e.id,
			title: e.title,
			status: e.status
		})),
		messages: n.map((e) => ({
			id: e.id,
			from: e.author === "ai" ? "@vibe" : y(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
async function ra(e, t = {}, n) {
	let r = (e) => Qi(e), i = (e) => e && e !== "main" && !j.epics.some((t) => t.id === e) ? null : e || "main";
	switch (e) {
		case "vibebook_read": return r(na(t));
		case "vibebook_connections": return Array.isArray(K) || await Ki(), r((K || []).map((e) => ({
			id: e.id,
			title: e.title,
			scope: e.scope,
			tools: e.tools
		})));
		case "vibebook_post": {
			let e = i(t.thread), a = String(t.text || "").trim().slice(0, 4e3);
			return !e || !a ? {
				isError: !0,
				content: [{
					type: "text",
					text: "text and a valid thread (main or an epic id) needed"
				}]
			} : await n(h("postar"), a) ? (N({
				t: "msg",
				thread: e,
				text: a,
				files: []
			}), r("posted")) : {
				isError: !0,
				content: [{
					type: "text",
					text: "the person cancelled"
				}]
			};
		}
		case "vibebook_add_task": {
			let e = t.epic_id && t.epic_id !== "main" ? j.epics.find((e) => e.id === t.epic_id) : null;
			if (t.epic_id && t.epic_id !== "main" && !e) return {
				isError: !0,
				content: [{
					type: "text",
					text: "no such epic"
				}]
			};
			let i = String(t.title || "").trim().slice(0, 200);
			return !i || !await n(h("criar uma tarefa"), `${e ? e.title : h("sala principal")}: ${i}`) ? {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			} : (N({
				t: "task.add",
				epic: e ? e.id : "main",
				title: i
			}), r("added"));
		}
		case "vibebook_task_status": {
			let e = [...j.epics.flatMap((e) => e.tasks), ...j.roomTasks || []].find((e) => e.id === t.task_id);
			return !e || ![
				"todo",
				"doing",
				"review",
				"done"
			].includes(t.status) ? {
				isError: !0,
				content: [{
					type: "text",
					text: "no such task or bad status"
				}]
			} : await n(h("mover uma tarefa"), `${e.title} → ${t.status}`) ? (N({
				t: "task.status",
				id: e.id,
				status: t.status
			}), r("moved")) : {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			};
		}
		case "vibebook_call_connection": {
			Array.isArray(K) || await Ki();
			let e = (K || []).find((e) => e.id === t.connection_id), r = e?.tools.find((e) => e.name === t.tool);
			return r ? await n(h("usar {tool} em {conn}", {
				tool: r.name,
				conn: e.title
			}), JSON.stringify(t.arguments || {})) ? (await C(`/api/books/${j.id}/connections/${e.id}/call`, {
				name: r.name,
				arguments: t.arguments || {}
			})).result : {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			} : {
				isError: !0,
				content: [{
					type: "text",
					text: "no such connection/tool for this person"
				}]
			};
		}
	}
	return {
		isError: !0,
		content: [{
			type: "text",
			text: `unknown tool ${e}`
		}]
	};
}
var ia = /* @__PURE__ */ new WeakMap();
function aa(e, t) {
	let n = (t) => e.contentWindow?.postMessage({
		jsonrpc: "2.0",
		...t
	}, "*"), r = (e, n) => ea(t.ask(), e, n), i = (e, n) => t.call ? t.call(e, n || {}) : ra(e, n || {}, r), a = () => document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches;
	return async (o) => {
		let s = (e) => o.id !== void 0 && n({
			id: o.id,
			result: e
		});
		try {
			switch (o.method) {
				case "ui/initialize": {
					let n = e.getBoundingClientRect();
					return s({
						protocolVersion: "2026-01-26",
						hostInfo: {
							name: "vibebook",
							version: "1"
						},
						hostCapabilities: {
							openLinks: {},
							serverTools: {},
							logging: {},
							message: { text: {} },
							updateModelContext: {
								text: {},
								structuredContent: {}
							}
						},
						hostContext: {
							...t.tool ? { toolInfo: { tool: t.tool } } : {},
							theme: a() ? "dark" : "light",
							displayMode: t.embed ? "inline" : "fullscreen",
							availableDisplayModes: [t.embed ? "inline" : "fullscreen"],
							containerDimensions: t.embed ? {
								maxHeight: 420,
								width: Math.round(n.width)
							} : {
								height: Math.round(n.height),
								width: Math.round(n.width)
							},
							locale: m,
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							platform: H.matches ? "mobile" : "web",
							user: {
								email: j.me,
								name: y(j.me)
							},
							room: {
								id: j.id,
								title: P()
							}
						}
					});
				}
				case "ui/notifications/initialized":
					t.first && (n({
						method: "ui/notifications/tool-input",
						params: { arguments: {} }
					}), n({
						method: "ui/notifications/tool-result",
						params: await t.first
					}));
					return;
				case "ui/notifications/size-changed": {
					if (!t.embed || typeof o.params?.height != "number") return;
					let n = Math.min(420, Math.round(innerHeight * .55)), r = Math.max(Math.ceil(o.params.height) + 2, 40);
					e.style.height = `${Math.min(r, n)}px`, e.closest(".embedWrap")?.classList.toggle("clipped", r > n);
					return;
				}
				case "tools/list": return s({ tools: t.call ? [] : ta });
				case "tools/call": return s(await i(o.params?.name, o.params?.arguments));
				case "ui/open-link": {
					let e = String(o.params?.url || "");
					return !/^https?:\/\//i.test(e) || !await r(h("abrir um link"), e) ? s({ isError: !0 }) : (window.open(e, "_blank", "noopener"), s({}));
				}
				case "ui/message": {
					let e = Zi(o.params?.content).trim().slice(0, 4e3);
					return s(e ? await ra("vibebook_post", {
						text: e,
						thread: t.thread ?? M
					}, r) : {});
				}
				case "ui/update-model-context": {
					let e = Zi(o.params?.content) || (o.params?.structuredContent ? JSON.stringify(o.params.structuredContent) : "");
					return e && t.base && C(`${t.base}/context`, {
						tool: t.toolName,
						text: e.slice(0, 4e3)
					}).catch(() => {}), s({});
				}
				case "ui/request-display-mode": return s({ mode: t.embed ? "inline" : "fullscreen" });
				case "ping": return s({});
				default:
					if (o.method.startsWith("notifications/") || o.method.startsWith("ui/notifications/")) return;
					o.id !== void 0 && n({
						id: o.id,
						error: {
							code: -32601,
							message: `vibebook doesn't support ${o.method} yet`
						}
					});
			}
		} catch (e) {
			o.id !== void 0 && n({
				id: o.id,
				error: {
					code: -32e3,
					message: String(e.message || e)
				}
			});
		}
	};
}
function oa(e) {
	if (!ia.has(e)) {
		let t = e.closest(".embedBox"), n = M;
		ia.set(e, aa(e, {
			embed: !0,
			thread: n,
			ask: () => t.querySelector(".appAsk") || t.appendChild(Object.assign(document.createElement("div"), {
				className: "appAsk",
				hidden: !0
			}))
		}));
	}
	return ia.get(e);
}
addEventListener("message", (e) => {
	let t = e.data;
	if (!t || !j || e.origin !== "null") return;
	let n = document.querySelector(".connFrame"), r = n?.contentWindow === e.source ? n : [...document.querySelectorAll("iframe.embed")].find((t) => t.contentWindow === e.source);
	if (r) {
		if (t.vbEmbed === 1) return oa(r)(typeof t.h == "number" ? {
			method: "ui/notifications/size-changed",
			params: { height: t.h }
		} : {
			method: "ui/message",
			params: { content: [{
				type: "text",
				text: String(t.send || "")
			}] }
		});
		t.jsonrpc === "2.0" && typeof t.method == "string" && (ia.get(r) || oa(r))(t);
	}
});
async function sa(e, t, n) {
	let r = t.id === "room", i = `/api/books/${j.id}/connections/${t.id}`, a = () => document.getElementById("appAsk");
	if (r) {
		ia.set(e, aa(e, {
			ask: a,
			tool: {
				name: n.tool,
				title: n.title
			},
			first: Promise.resolve(Qi(na()))
		})), e.src = `/api/books/${j.id}/files/${n.file.id}`;
		return;
	}
	let o;
	try {
		o = await C(`${i}/ui?tool=${encodeURIComponent(n.tool)}`);
	} catch (t) {
		let n = document.createElement("div");
		n.className = "empty", n.textContent = t.message, e.replaceWith(n);
		return;
	}
	let s = (e, t) => C(`${i}/call`, {
		name: e,
		arguments: t
	}).then((e) => e.result), c = s(n.tool, {}).catch((e) => ({
		isError: !0,
		content: [{
			type: "text",
			text: e.message
		}]
	}));
	ia.set(e, aa(e, {
		ask: a,
		call: s,
		first: c,
		tool: o.tool,
		base: i,
		toolName: n.tool
	})), e.srcdoc = o.html;
}
function ca() {
	let e = document.getElementById("remPane");
	if (!e || !j) return;
	Wr();
	let t = j.reminders || [], n = t.filter((e) => e.error).length;
	document.getElementById("remCount").textContent = t.length ? ` ${t.length}${n ? " ⚠" : ""}` : "", en("reminders", e, {
		room: j,
		thread: M,
		vb: nn(),
		send: N
	});
}
function la() {
	let e = document.getElementById("filesPane");
	if (!e || !j) return;
	Wr();
	let t = j.filesN ?? j.files?.length ?? 0;
	document.getElementById("fileCount").textContent = t ? ` ${t}` : "", en("files", e, {
		room: j,
		thread: M,
		vb: nn(),
		send: N
	});
}
var ua = (e, t) => (j.pins || []).find((n) => n.kind === e && n.ref === t), da = (e, t) => {
	let n = !!ua(e, t);
	return `<button type="button" class="ghost pinBtn${n ? " on" : ""}" data-pin-kind="${e}" data-pin-ref="${_(t)}" title="${h(n ? "Desafixar" : "Fixar na lateral")}" aria-label="${h(n ? "Desafixar" : "Fixar na lateral")}" aria-pressed="${n}">${D("pin", 14)}</button>`;
};
function fa(e) {
	e.querySelectorAll("[data-pin-kind]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation();
		let n = ua(e.dataset.pinKind, e.dataset.pinRef);
		N(n ? {
			t: "pin.del",
			id: n.id
		} : {
			t: "pin.add",
			kind: e.dataset.pinKind,
			ref: e.dataset.pinRef
		});
	});
}
var pa = 60, Y = {
	thread: null,
	n: pa
}, ma = {}, ha = !1, ga = /* @__PURE__ */ new Set(), X = () => j.origins?.length ? [...j.messages, ...j.origins.filter((e) => !j.messages.some((t) => t.id === e.id))] : j.messages, _a = !1;
function va() {
	if (!j) return;
	let e = r(`/b/${j.id}${M !== "main" && !I() ? `?t=${encodeURIComponent(M)}` : ""}`, location.href, "svelte");
	location.pathname + location.search !== e && f[_a ? "pushState" : "replaceState"](null, "", e), _a = !0;
}
function ya() {
	let e = document.getElementById("thFiles");
	if (!e) return;
	let t = /* @__PURE__ */ new Map();
	if (M !== "main" && !I()) {
		for (let e of X()) if (e.thread === M) for (let n of e.files || []) {
			let r = t.get(n.name);
			r ? (r.n++, e.ts > r.ts && (r.f = n, r.ts = e.ts)) : t.set(n.name, {
				f: n,
				ts: e.ts,
				n: 1
			});
		}
	}
	let n = [...t.values()].sort((e, t) => t.ts - e.ts).slice(0, 8);
	e.hidden = !n.length, e.innerHTML = n.length ? `<span class="thfL">${D("paperclip", 14)} ${h("Arquivos deste épico")}</span>${n.map(({ f: e, n: t }) => `<a href="${Xr(e)}" target="_blank" rel="noopener" ${Zr(e)} title="${_(e.name)}">${Ht(e, 14)}<span>${_(e.name)}</span>${t > 1 ? `<small>v${t}</small>` : ""}</a>`).join("")}` : "";
}
function Z(e) {
	Pr(), ya(), va(), xi(), Yr();
	let t = document.getElementById("msgs");
	if (g.querySelector(".book")?.classList.toggle("pre", I()), I()) return $t("chat"), Ln(t);
	if (Y.thread !== M || Y.room !== j.id) {
		let e = g.querySelector(".book"), t = Ar(M).some((e) => e.ref.startsWith("t")) || !!j.epics.find((e) => e.id === M)?.tasks.some((e) => !e.done && e.owner === j.me);
		M !== "main" && e?.classList.contains("nodoc") && !e.classList.contains("boardview") && (t || !j.messages.some((e) => e.thread === M)) && e.classList.remove("nodoc"), (M !== "main" || Ar(M).length) && setTimeout(() => {
			let e = [...document.querySelectorAll(".task.waitTask, .msg.waitMsg .txt")];
			e.length || (e = [...document.querySelectorAll(".task.mine")]), e[0]?.classList.contains("task") && e[0].scrollIntoView({
				block: "center",
				behavior: "smooth"
			}), e.forEach((e) => {
				e.classList.remove("shimmer"), e.offsetWidth, e.classList.add("shimmer");
			});
		}, 400);
	}
	(Y.thread !== M || Y.room !== j.id) && (Y = {
		thread: M,
		room: j.id,
		n: pa
	});
	let n = j.messages.filter((e) => e.thread === M && !ji(e) && !Ai(e) && !Ai(j.messages.find((t) => t.id === e.reply_to)));
	Gt && n.length < pa && !ha && !j.complete && !j.full?.includes(M) && !ma[j.id + M] && !ga.has(j.id + M) && (ga.add(j.id + M), ha = !0, N({
		t: "older",
		thread: M,
		before: n[0]?.id ?? 0
	}));
	let r = Fi(n.slice(-Y.n)), i = n.length > r.length || n.length && !j.complete && !j.full?.includes(M) && !ma[j.id + M], a = t.scrollHeight, o = t.scrollTop, s = j.epics.find((e) => e.id === M)?.from_msg, c = s && (j.messages.find((e) => e.id === s) || j.origins?.find((e) => e.id === s)), l = j.counts ? (j.counts[M] ?? 0) + n.filter((e) => e.id > (j.countsAt ?? 0)).length : n.length;
	en("chat", t, {
		room: j,
		thread: M,
		list: r,
		previous: n[n.length - r.length - 1],
		more: i,
		origin: c || null,
		replyCount: l,
		vb: rn(),
		onloadolder: xa
	}), kr(), _i(), e === "stay" ? (t.scrollTop = o, Ca(), Da(t)) : e ? (t.scrollTop = o + t.scrollHeight - a, Ca(), Da(t)) : (Oa(!0), Da(t), Ca());
}
function ba() {
	let e = j.messages.filter((e) => e.thread === M);
	ha = !0, N({
		t: "older",
		thread: M,
		before: e[0]?.id ?? 0
	});
}
function xa() {
	if (ha || I()) return;
	let e = j.messages.filter((e) => e.thread === M);
	if (e.length > Y.n) return Y.n += pa, Z(!0);
	j.complete || j.full?.includes(M) || ma[j.id + M] || !e.length || (ha = !0, N({
		t: "older",
		thread: M,
		before: e[0].id
	}));
}
var Sa = (e) => String(e ?? "").replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function Ca() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".mfoot").forEach((e) => e.remove());
	let t = {}, n = (e) => t[e] ??= {
		st: [],
		rd: []
	}, r = (e) => h("{via} de {who}", {
		via: _(Sa(e.who)),
		who: _(y(e.email))
	}), i = /* @__PURE__ */ new Set();
	for (let e of j.acks || []) {
		if (e.status === "dismissed") continue;
		let t = `${e.msg_id}|${e.who}|${e.email}`;
		if (i.has(t)) continue;
		i.add(t);
		let a = e.status === "doing" && Date.now() - e.ts < 12e5, o = r(e), s = `<time title="${_(new Date(e.ts).toLocaleString(m))}">${S(e.ts)}</time>`, c, l, u;
		if (e.status === "blocked") c = "need", l = "⏸", u = `${h("{who} espera você no terminal", { who: o })}${e.note ? `: <b>${_(e.note)}</b>` : ""} · ${s}`;
		else if (a) c = "doing", l = "<span class=\"spin\"></span>", u = `${h("{who} está fazendo isso", { who: o })} · ${s}`;
		else if (e.status === "done") c = "did", l = "✓", u = h("{who} fez isso", { who: o });
		else {
			let t = [...new Set((j.epics || []).filter((t) => t.from_msg === e.msg_id && !t.archived).flatMap((e) => e.tasks.filter((e) => e.status !== "done" && e.owner).map((e) => y(e.owner))))];
			t.length ? (c = "wait", l = "⏳", u = h("aguardando {who}", { who: t.map(_).join(", ") })) : (c = "idle", l = "–", u = `${h("{who} parou", { who: o })} · ${s}`);
		}
		n(e.msg_id).st.push(`<span class="ms ${c}"><i>${l}</i><span>${u}</span></span>`);
	}
	let a = j.messages.filter((e) => e.thread === M);
	for (let e of j.receipts || []) {
		let t = a.findLast((t) => t.id <= Math.max(e.read, e.delivered) && (t.kind !== "agent" || t.author !== e.email));
		if (!t || i.has(`${t.id}|${e.who}|${e.email}`)) continue;
		let o = e.read >= t.id, s = r(e);
		n(t.id).rd.push(`<span class="${o ? "rd" : ""}" title="${h(o ? "lido por {who}" : "entregue, ainda não lido por {who}", { who: s })}">${o ? "✓✓" : "✓"} ${_(Sa(e.who))}</span>`);
	}
	for (let [e, n] of Object.entries(t)) {
		let t = document.querySelector(`#m${e} .body`);
		t && t.insertAdjacentHTML("beforeend", `<div class="mfoot">${n.st.join("")}${n.rd.length ? `<span class="mr">${n.rd.join("")}</span>` : ""}</div>`);
	}
}
function wa(e) {
	Z(Ta || e.author === j.me && e.kind !== "agent" ? void 0 : "stay");
}
var Ta = !0, Ea = new ResizeObserver(() => {
	let e = document.getElementById("msgs");
	e && Ta && (e.scrollTop = e.scrollHeight);
});
function Da(e) {
	e && (e.classList?.contains("msg") ? [e] : e.querySelectorAll(".msg")).forEach((e) => Ea.observe(e));
}
function Oa(e) {
	let t = document.getElementById("msgs");
	if (t) {
		t.onscroll ??= () => {
			t.scrollHeight - t.scrollTop - t.clientHeight < 80 ? Ta = !0 : t.scrollTop < (t._lastTop ?? 0) - 2 && (Ta = !1), t._lastTop = t.scrollTop, t.scrollTop < 150 && !Ta && xa();
		}, Ea.observe(t), t._mo ??= new MutationObserver((e) => {
			for (let t of e) t.addedNodes.forEach((e) => e.nodeType === 1 && Ea.observe(e));
			Ta && (t.scrollTop = t.scrollHeight);
		}), t._mo.observe(t, { childList: !0 });
		for (let e of t.children) Ea.observe(e);
		e && (Ta = !0), (e || t.scrollHeight - t.scrollTop - t.clientHeight < 200) && (t.scrollTop = t.scrollHeight);
	}
}
var ka = "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js", Aa, ja = () => Aa ??= new Promise((e, t) => {
	let n = Object.assign(document.createElement("script"), {
		src: ka,
		crossOrigin: "anonymous",
		integrity: "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA"
	});
	n.onload = () => e(window.pele), n.onerror = () => {
		Aa = null, t();
	}, document.head.append(n);
});
async function Ma(e) {
	let t = [...e.querySelectorAll("pre > code.language-mermaid")];
	if (!t.length) return;
	let n = await ja().catch(() => null);
	n && t.forEach((t, r) => {
		let i = document.createElement("figure");
		i.className = "mmd";
		try {
			let { svg: a } = n.render(t.textContent, {
				idPrefix: `mmd${r}-`,
				fontFamily: "\"Schibsted Grotesk\", sans-serif",
				fontSize: 14,
				maxWidth: e.clientWidth - 90,
				links: !1,
				images: !1
			});
			i.innerHTML = DOMPurify.sanitize(a, { USE_PROFILES: {
				svg: !0,
				svgFilters: !0
			} });
		} catch (e) {
			i.classList.add("err"), i.textContent = `${h("Diagrama com erro")}${e.line ? ` ${h("na linha {n}", { n: e.line })}` : ""}: ${e.message}`;
		}
		t.parentElement.replaceWith(i);
	});
}
function Na(e, t) {
	let n = document.getElementById("tasks");
	if (!n) return;
	let r = document.getElementById("tasksHome");
	if (!t) {
		r.append(n);
		return;
	}
	let i = [...e.querySelectorAll("h2")].find((e) => e.textContent.trim().toLowerCase() === "tarefas");
	if (i) return (i.nextElementSibling?.tagName === "UL" ? i.nextElementSibling : null)?.remove(), i.replaceWith(n);
	let a = [...e.querySelectorAll("p")].find((e) => e.textContent.trim().toLowerCase() === "[[tarefas]]");
	if (a) return a.replaceWith(n);
	let o = [...e.children].find((e) => e.tagName === "P");
	o ? o.after(n) : e.prepend(n);
}
var Q = !1, Pa = null, Fa = /* @__PURE__ */ new Set(), Ia = () => !Q && !I() && j.epics.some((e) => e.id === M) ? M : null;
function $(e) {
	let t = document.getElementById("doc");
	if (!t) return;
	j.docs ??= {};
	let n = Ia(), r = n && j.epics.find((e) => e.id === n);
	n && !(n in j.docs) && !Fa.has(j.id + n) && (Fa.add(j.id + n), N({
		t: "doc.get",
		epic: n
	}));
	let i = n ? j.docs[n] || `# ${r.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n` : j.doc;
	Pa !== (n || "room") && (e = !0, Pa = n || "room"), wn();
	let a = !I() && j.epics.find((e) => e.id === M), o = document.getElementById("docCrumb");
	o.hidden = !a, a && (o.innerHTML = `<button type="button" class="${n ? "" : "sel"}" data-docroom="1">${_(P())}</button><span>›</span><button type="button" class="${n ? "sel" : ""}" data-docroom="">${_(a.title)}</button>`, o.querySelectorAll("button").forEach((e) => e.onclick = () => {
		Q = !!e.dataset.docroom, $(!0);
	}));
	let s = document.getElementById("preview"), c = document.getElementById("tasks");
	c && document.getElementById("tasksHome").append(c), s.innerHTML = i.trim() ? DOMPurify.sanitize(marked.parse(i, {
		breaks: !0,
		gfm: !0
	}), {
		...Ce,
		FORBID_TAGS: Ce.FORBID_TAGS.filter((e) => e !== "img"),
		ADD_ATTR: ["target"]
	}) : `<div class="empty">${h("Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.")}</div>`, s.querySelectorAll("a").forEach((e) => {
		e.target = "_blank", e.rel = "noopener noreferrer nofollow ugc";
	}), !n && j.docNotes?.length && s.insertAdjacentHTML("afterbegin", `<div class="docNotes" title="${h("@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).")}">${j.docNotes.map((e) => `<span class="vnote">${D("alert", 12)} ${_(e)}</span>`).join("")}</div>`), Ma(s), Na(s, n || (M === "main" && j.roomTasks?.length ? "main" : null)), Wr(), (e || document.activeElement !== t) && (t.value = i);
}
var La = 3e5;
function Ra() {
	try {
		return localStorage.getItem("vb.lock");
	} catch {
		return null;
	}
}
var za = (e) => crypto.getRandomValues(new Uint8Array(e)), Ba = () => navigator.credentials.get({ publicKey: {
	challenge: za(32),
	allowCredentials: [{
		type: "public-key",
		id: Uint8Array.from(atob(Ra()), (e) => e.charCodeAt(0))
	}],
	userVerification: "required",
	hints: ["client-device"],
	timeout: 6e4
} });
async function Va(e, t) {
	if (!e) {
		localStorage.removeItem("vb.lock");
		return;
	}
	let n = await navigator.credentials.create({ publicKey: {
		challenge: za(32),
		rp: { name: "vibebook" },
		user: {
			id: za(16),
			name: t,
			displayName: h("vibebook (trava do app)")
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: -7
		}, {
			type: "public-key",
			alg: -257
		}],
		authenticatorSelection: {
			authenticatorAttachment: "platform",
			userVerification: "required",
			residentKey: "required",
			requireResidentKey: !0
		},
		hints: ["client-device"],
		timeout: 6e4
	} });
	localStorage.setItem("vb.lock", btoa(String.fromCharCode(...new Uint8Array(n.rawId))));
}
function Ha() {
	if (!Ra() || document.getElementById("lockScreen")) return;
	let e = document.createElement("div");
	e.id = "lockScreen", e.innerHTML = `<img src="/favicon.svg" alt="" width="64" height="64" /><b>vibebook</b><button class="primary">${h("Desbloquear com Face ID")}</button><p class="err" hidden></p>`, document.body.append(e);
	let t = async () => {
		try {
			await Ba(), e.remove();
		} catch {
			let t = e.querySelector(".err");
			t.hidden = !1, t.textContent = h("Toque pra tentar de novo.");
		}
	};
	e.querySelector("button").onclick = t;
}
var Ua = 0;
document.addEventListener("visibilitychange", () => {
	document.hidden ? Ua = Date.now() : Ua && Date.now() - Ua > La && Ha();
}), Ha(), nt();
