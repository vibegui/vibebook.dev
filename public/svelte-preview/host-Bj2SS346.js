import { a as e, c as t, i as n, l as r, o as i, r as a, s as o, t as s } from "./main-DDgQ9-iS.js";
import { p as c } from "./Field-dpYXm9AU.js";
// svelte/navigation.ts
function l(e, t, n) {
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
function u(e) {
	return e.querySelector(":scope > .chat > #kanban, :scope > .doc > #kanban");
}
function d(e, t, n = null) {
	let r = u(e);
	if (!r || !t || r.parentElement === t) return;
	let i = e.ownerDocument.activeElement, a = i instanceof HTMLElement && r.contains(i) ? i : null;
	t.insertBefore(r, n?.parentNode === t ? n : null), a?.focus({ preventScroll: !0 });
}
function ee(e, t, n) {
	let r = !1, i = () => {
		!r && e.isConnected && !t.matches && e.classList.contains("boardview") && n();
	};
	return t.addEventListener("change", i), () => {
		r || (r = !0, t.removeEventListener("change", i));
	};
}
// svelte/roomConnection.ts
var te = 1e4;
function ne(e) {
	let n = e.schedule ?? setTimeout, r = e.cancel ?? clearTimeout, i = e.createSocket ?? ((e) => new WebSocket(e)), a = null, s, c, l = !1, u = !1, d = 0, ee = "", ne = /* @__PURE__ */ new Map(), f = Math.random().toString(36).slice(2, 8), re = 0, p = (e, t) => {
		let n = ne.get(e);
		n && (ne.delete(e), r(n.timer), n.done(t));
	}, ie = (e) => {
		for (let t of [...ne.keys()]) p(t, {
			ok: !1,
			error: e
		});
	}, m = () => {
		s !== void 0 && r(s), c !== void 0 && r(c), s = c = void 0;
	}, ae = () => {
		l = !0, m(), ie("disconnected");
		let e = a;
		a = null, e && (e.onopen = e.onmessage = e.onclose = null, e.close());
	}, h = () => {
		if (l) return;
		s = void 0;
		let t = i(e.url(ee));
		a = t;
		let r = () => !l && a === t;
		t.onopen = () => {
			r() && (c = n(() => {
				r() && (c = void 0, t.readyState === 1 && (d = 0));
			}, 15e3));
		}, t.onmessage = (t) => {
			if (!r()) return;
			let n = o(t.data);
			n.t === "result" ? p(n.cid, n.ok ? { ok: !0 } : {
				ok: !1,
				error: n.error
			}) : (n.t === "state" && (u = !0), e.onEvent(n));
		}, t.onclose = (i) => {
			r() && (a = null, m(), ie("disconnected"), t.onopen = t.onmessage = t.onclose = null, i.code === 4003 ? (ae(), e.onRemoved()) : !u && i.code !== 1e3 ? (ae(), e.onUnavailable()) : (ee = String(i.code || ""), s = n(h, Math.min(3e4, 1e3 * 2 ** d++))));
		};
	};
	return {
		start() {
			!a && s === void 0 && !l && h();
		},
		dispose: ae,
		send(e) {
			return t(a, e);
		},
		request(e, r = te) {
			let i = `${f}-${++re}`;
			return new Promise((o) => {
				if (!t(a, e, i)) return o({
					ok: !1,
					error: "offline"
				});
				ne.set(i, {
					done: o,
					timer: n(() => p(i, {
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
var f = l(history, () => location.href, "svelte"), re = document.cookie.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] || (/^pt/i.test(navigator.language) ? "pt" : /^en/i.test(navigator.language) ? "en" : "pt");
document.documentElement.lang = re === "en" ? "en" : "pt-BR";
var p = re === "en" ? "en-US" : "pt-BR", ie = {
	"Não deu pra enviar agora. Tente de novo.": "Couldn't send it now. Try again.",
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
}, m = (e, t) => {
	let n = re === "en" && ie[e] !== void 0 ? ie[e] : e;
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}, ae = () => `<span class="langSw" role="group" aria-label="Idioma / Language">${["pt", "en"].map((e) => `<button type="button" class="${re === e ? "sel" : ""}" data-lang="${e}" aria-pressed="${re === e}">${e.toUpperCase()}</button>`).join("<i>·</i>")}</span>`;
document.addEventListener("click", (e) => {
	let t = e.target.closest?.("[data-lang]");
	t && t.dataset.lang !== re && (document.cookie = `vb_lang=${t.dataset.lang}; path=/; max-age=31536000; samesite=lax`, location.reload());
});
var h = document.getElementById("app"), g = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), oe = [
	"#ff5a36",
	"#1f9d8a",
	"#3b6cf6",
	"#c2410c",
	"#9333ea",
	"#0f766e",
	"#be185d",
	"#4d7c0f"
], _ = (e) => oe[[...e].reduce((e, t) => e + t.charCodeAt(0), 0) % oe.length], se = {}, v = (e) => e === "ai" ? "@vibe" : A?.names?.[e] || se[e] || e.split("@")[0], ce = {}, y = (e, t) => {
	if (e === "ai") return "<span class=\"avatar ai\">✦</span>";
	let n = A?.avatars?.[e] ?? ce[e];
	return n ? `<span class="avatar pic ${t ? "on" : ""}" title="${g(v(e))}"><img src="/api/avatar/${encodeURIComponent(e)}?v=${n}" alt="" loading="lazy" /></span>` : `<span class="avatar ${t ? "on" : ""}" style="background:${_(e)}" title="${g(v(e))}">${g(v(e).slice(0, 2).toUpperCase())}</span>`;
}, b = (e) => {
	let t = String(e || "");
	return /codex|gpt|openai|\bo[1-9]\b/i.test(t) ? ["codex", "◎"] : /gemini/i.test(t) ? ["gemini", "✦"] : /cursor/i.test(t) ? ["cursor", "▲"] : /copilot/i.test(t) ? ["copilot", "◉"] : ["", "✻"];
}, le = (e, t) => {
	let [n, r] = b(t);
	return `<span class="avatar claude${n ? ` ${n}` : ""}" title="${m("{via} de {who}", {
		via: g(Ca(t) || "Agent"),
		who: g(v(e))
	})}">${r}${y(e)}</span>`;
}, x = (e) => {
	let t = Math.round((Date.now() - e) / 6e4);
	return t < 1 ? m("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
}, ue = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, ""), de = (e) => {
	let t = e.split("@")[0];
	return [
		ue(A?.names?.[e]?.split(/\s+/)[0] || se[e]?.split(/\s+/)[0] || ""),
		ue(t.split(/[._+-]/)[0]),
		ue(t)
	].filter(Boolean);
}, fe = (e) => de(e)[0], pe = (e) => {
	let t = ue(e);
	return t === "vibe" || t === "ai" ? "ai" : (A?.members || []).find((e) => de(e).includes(t)) || null;
}, me = (e) => e.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (e, t, n) => {
	let r = pe(n);
	return r ? `${t}<span class="mention${r === A?.me ? " me" : ""}" title="${g(r === "ai" ? "@vibe" : r)}">@${n}</span>` : e;
}), he = "<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>", ge = (e) => e.replace(/<a ([^>]*?)href="https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o, s) => {
	if (/^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(n)) return e;
	let c = e.match(/href="([^"]*)"/)[1], l = i === "commit" ? `${n}/${r}@${a.slice(0, 7)}` : i ? `${n}/${r} #${a}` : `${n}/${r}`, u = s.replace(/<[^>]*>/g, "").trim(), d = !u || u === c || /^https?:\/\//.test(u) ? g(l) : s;
	return `<a ${t}href="${c}"${o} class="ghchip" title="${g(l)}">${he}<span>${d}</span></a>`;
}), _e = (e) => e.replace(/<a ([^>]*?)href="(https?:\/\/[^"\/]+)?\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o) => {
	if (!A?.id || r !== A.id || n && n !== location.origin) return e;
	let s = (A.files || []).find((e) => e.id === i) || Y().flatMap((e) => e.files || []).find((e) => e.id === i), c = o.replace(/<[^>]*>/g, "").trim(), l = s?.name || (c && !/^https?:\/\//.test(c) ? c : "arquivo"), u = s ? ni(s.name) : [], d = u.length > 1 ? u.length - u.findIndex((e) => e.id === i) : 0;
	return `<a ${t}href="/api/books/${r}/files/${i}"${a} class="fchip" title="${g(l)}">${Bt(s || { type: /\.html?$/i.test(l) ? "text/html" : "" }, 14)}<span>${g(l)}</span>${d ? `<small>v${d}</small>` : ""}</a>`;
}), ve = JSON.parse("{\"point_up\": \"☝️\", \"point_up_2\": \"👆\", \"point_down\": \"👇\", \"point_left\": \"👈\", \"point_right\": \"👉\", \"+1\": \"👍\", \"thumbsup\": \"👍\", \"-1\": \"👎\", \"thumbsdown\": \"👎\", \"ok_hand\": \"👌\", \"clap\": \"👏\", \"pray\": \"🙏\", \"raised_hands\": \"🙌\", \"wave\": \"👋\", \"muscle\": \"💪\", \"eyes\": \"👀\", \"fire\": \"🔥\", \"rocket\": \"🚀\", \"tada\": \"🎉\", \"100\": \"💯\", \"heart\": \"❤️\", \"heart_eyes\": \"😍\", \"smile\": \"😄\", \"smiley\": \"😃\", \"grin\": \"😁\", \"joy\": \"😂\", \"rofl\": \"🤣\", \"laughing\": \"😆\", \"sweat_smile\": \"😅\", \"wink\": \"😉\", \"blush\": \"😊\", \"slightly_smiling_face\": \"🙂\", \"upside_down_face\": \"🙃\", \"thinking_face\": \"🤔\", \"thinking\": \"🤔\", \"neutral_face\": \"😐\", \"expressionless\": \"😑\", \"unamused\": \"😒\", \"roll_eyes\": \"🙄\", \"face_with_rolling_eyes\": \"🙄\", \"grimacing\": \"😬\", \"sweat\": \"😓\", \"cry\": \"😢\", \"sob\": \"😭\", \"scream\": \"😱\", \"rage\": \"😡\", \"angry\": \"😠\", \"sunglasses\": \"😎\", \"nerd_face\": \"🤓\", \"sleeping\": \"😴\", \"exploding_head\": \"🤯\", \"partying_face\": \"🥳\", \"shrug\": \"🤷\", \"facepalm\": \"🤦\", \"white_check_mark\": \"✅\", \"heavy_check_mark\": \"✔️\", \"check\": \"✔️\", \"x\": \"❌\", \"warning\": \"⚠️\", \"no_entry\": \"⛔\", \"question\": \"❓\", \"exclamation\": \"❗\", \"bulb\": \"💡\", \"memo\": \"📝\", \"pushpin\": \"📌\", \"link\": \"🔗\", \"lock\": \"🔒\", \"unlock\": \"🔓\", \"key\": \"🔑\", \"bug\": \"🐛\", \"wrench\": \"🔧\", \"hammer\": \"🔨\", \"gear\": \"⚙️\", \"zap\": \"⚡\", \"star\": \"⭐\", \"sparkles\": \"✨\", \"boom\": \"💥\", \"hourglass\": \"⌛\", \"alarm_clock\": \"⏰\", \"calendar\": \"📅\", \"chart_with_upwards_trend\": \"📈\", \"chart_with_downwards_trend\": \"📉\", \"moneybag\": \"💰\", \"money_with_wings\": \"💸\", \"dart\": \"🎯\", \"trophy\": \"🏆\", \"coffee\": \"☕\", \"beer\": \"🍺\", \"pizza\": \"🍕\", \"see_no_evil\": \"🙈\", \"hugs\": \"🤗\", \"hugging_face\": \"🤗\", \"handshake\": \"🤝\", \"crossed_fingers\": \"🤞\", \"writing_hand\": \"✍️\", \"skull\": \"💀\", \"ghost\": \"👻\", \"robot_face\": \"🤖\", \"robot\": \"🤖\", \"brain\": \"🧠\", \"speech_balloon\": \"💬\", \"mag\": \"🔍\", \"computer\": \"💻\", \"iphone\": \"📱\", \"package\": \"📦\", \"construction\": \"🚧\", \"rotating_light\": \"🚨\", \"sos\": \"🆘\", \"green_heart\": \"💚\", \"blue_heart\": \"💙\", \"purple_heart\": \"💜\", \"yellow_heart\": \"💛\", \"broken_heart\": \"💔\", \"dog\": \"🐶\", \"cat\": \"🐱\", \"sun\": \"☀️\", \"rainbow\": \"🌈\", \"rain\": \"🌧️\", \"snowflake\": \"❄️\", \"earth_americas\": \"🌎\", \"brazil\": \"🇧🇷\", \"flag-br\": \"🇧🇷\", \"checkered_flag\": \"🏁\", \"arrow_up\": \"⬆️\", \"arrow_down\": \"⬇️\", \"arrow_right\": \"➡️\", \"arrow_left\": \"⬅️\", \"heavy_plus_sign\": \"➕\", \"heavy_minus_sign\": \"➖\", \"red_circle\": \"🔴\", \"large_green_circle\": \"🟢\", \"green_circle\": \"🟢\", \"large_yellow_circle\": \"🟡\", \"yellow_circle\": \"🟡\", \"white_circle\": \"⚪\", \"black_circle\": \"⚫\"}"), ye = (e) => e.replace(/:([a-z0-9_+-]{1,40}):/g, (e, t) => ve[t] ?? e), be = (e) => _e(ge(ye(e).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g, (e) => `<a href="${e}" target="_blank" rel="noopener noreferrer nofollow ugc">${e}</a>`))), xe = {
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
}, Se = (e) => DOMPurify.sanitize(_e(ge(DOMPurify.sanitize(marked.parse(ye(e), {
	breaks: !0,
	gfm: !0
}), xe).replace(/<a (?!href="#(?:m\d+|e[\w-]+|doc[\w:-]*)")/g, "<a target=\"_blank\" rel=\"noopener noreferrer nofollow ugc\" ").replace(/<a href="#m(\d+)"/g, "<a class=\"mlink\" href=\"#m$1\" data-msg=\"$1\"").replace(/<a href="#(e[\w-]+|doc[\w:-]*)"/g, "<a class=\"mlink\" href=\"#$1\" data-cardgo=\"#$1\""))), {
	...xe,
	ADD_ATTR: ["target"]
}), S = async (e, t) => {
	let n = await fetch(e, t ? {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(t)
	} : {});
	if (n.status === 401) throw location.href = r(`/login?next=${encodeURIComponent(location.pathname + location.search)}`, location.href, "svelte"), Error("unauthenticated");
	if (!n.ok) throw Error((await n.json().catch(() => ({}))).error || n.statusText);
	return n.json();
}, Ce = document.getElementById("switcher"), C = null, w = [], we = (e) => e.some((e) => /^[ab]\d/.test(e.ref)) ? " cl" : "", Te = {
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
}, T = (e, t = 16) => `<svg class="i" viewBox="0 0 24 24" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Te[e]}</svg>`, Ee = "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"22\" height=\"24\" rx=\"5\" fill=\"#fff\"/><rect x=\"7\" y=\"9\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><rect x=\"7\" y=\"15\" width=\"8\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><circle cx=\"24\" cy=\"23\" r=\"7\" fill=\"#f2dc4a\"/></svg>", De = T("search", 18), Oe = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round">${[
	0,
	60,
	120
].map((e) => `<line x1="12" y1="3.5" x2="12" y2="20.5" transform="rotate(${e} 12 12)"/>`).join("")}</g></svg>`, ke = T("plus", 18);
if (window.visualViewport) {
	let e = () => {
		document.documentElement.style.setProperty("--vvh", `${Math.round(visualViewport.height)}px`), innerWidth <= 900 && scrollY && document.querySelector(".book") && scrollTo(0, 0);
	};
	visualViewport.addEventListener("resize", e), visualViewport.addEventListener("scroll", e), e();
}
var E = {
	auto: {
		label: m("Tema automático (do sistema)"),
		next: "light",
		icon: T("contrast", 18)
	},
	light: {
		label: m("Tema claro"),
		next: "dark",
		icon: T("sun", 18)
	},
	dark: {
		label: m("Tema escuro"),
		next: "auto",
		icon: T("moon", 18)
	}
}, D = () => document.documentElement.dataset.theme || "auto";
function Ae(e) {
	e === "auto" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	try {
		e === "auto" ? localStorage.removeItem("vb.theme") : localStorage.setItem("vb.theme", e);
	} catch {}
	O();
}
var je = {
	blue: m("azul"),
	green: m("verde"),
	yellow: m("amarelo"),
	orange: m("laranja"),
	pink: m("rosa"),
	purple: m("roxo")
}, Me = Object.keys(je);
document.addEventListener("click", (e) => {
	let t = document.getElementById("tintPop");
	t && !t.hidden && !t.contains(e.target) && (t.hidden = !0);
}), document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		let e = document.getElementById("tintPop");
		e && (e.hidden = !0);
	}
});
var Ne = () => [...C || []].sort((e, t) => (e.position ?? 1e9) - (t.position ?? 1e9) || (e.created_at ?? 0) - (t.created_at ?? 0)), Pe = (e) => e?.icon ? `/api/books/${e.id}/icon?v=${e.icon}` : null, Fe = (e, t) => Pe(e) ? `<span class="tile ${t} hasIcon"><img src="${Pe(e)}" alt="" loading="lazy"></span>` : `<span class="tile ${t}" style="background:${wn(e.title)}">${g(P(e.title))}</span>`;
function Ie(e) {
	let t = C?.find((e) => e.id === A?.id);
	t && e > t.read_id && (t.read_id = e);
}
function Le() {
	document.body.classList.contains("has-sw") && S("/api/me?ui=svelte").then((e) => {
		at(e);
		let t = JSON.stringify(Dr());
		C = e.books, w = e.waits || [], A?.messages?.length && Ie(A.messages.at(-1).id), O(), A && JSON.stringify(Dr()) !== t && (R(), X(!0));
	}).catch(() => {});
}
var Re = null, ze = 0, Be = 0, Ve = 0;
function He() {
	Re && Re.readyState <= 1 || (Re = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`), Re.onopen = () => {
		ze = 0;
	}, Re.onmessage = (e) => {
		let t;
		try {
			t = JSON.parse(e.data);
		} catch {
			return;
		}
		t.t === "me" && !(t.msg && t.book && t.book === A?.id) && (clearTimeout(Be), Be = setTimeout(Le, 600)), t.t === "agents" && (t.book === "*" || t.book === A?.id) && (clearTimeout(Ve), Ve = setTimeout(Fn, 600));
	}, Re.onclose = () => {
		Re = null, document.visibilityState === "visible" && setTimeout(He, Math.min(3e4, 1e3 * 2 ** ze++));
	});
}
document.addEventListener("visibilitychange", () => {
	document.visibilityState === "visible" && document.body.classList.contains("has-sw") && (Le(), Fn(), He());
});
var Ue = "";
function O() {
	Dt();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1], t = !!C && location.pathname !== "/login";
	if (document.body.classList.toggle("has-sw", t), !t) {
		Ce.innerHTML = "";
		return;
	}
	let n = [];
	for (let e of Ne()) {
		let t = n.at(-1);
		t && e.tint && t.tint === e.tint ? t.rooms.push(e) : n.push({
			tint: e.tint || null,
			rooms: [e]
		});
	}
	let r = (e) => e.last_human_id > e.read_id ? `<b class="dot h" title="${m("mensagens novas")}"></b>` : e.last_agent_id > e.read_id ? `<b class="dot a" title="${m("agents escreveram")}"></b>` : "", i = (e) => e.busy_until > Date.now() ? `<b class="swBusy" title="${m("um agent está trabalhando aqui")}">✻</b>` : "", a = (e) => {
		let t = w.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${we(t)}" title="${n === 1 ? m("1 coisa esperando você") : m("{n} coisas esperando você", { n })}">${n}</b>` : "";
	}, o = (e) => e.sandboxes_running ? `<b class="swCloud" title="${m("sandbox na nuvem rodando")}">☁</b>` : "", s = (e) => `<a class="sw-item" href="/b/${e.id}" data-nav data-id="${e.id}" draggable="true" data-drag aria-label="${g(e.title)}"><i class="pill"></i><span class="tw${e.sandboxes_running ? " cloud" : ""}">${Fe(e, "lg")}${r(e)}${i(e)}${a(e)}${o(e)}</span></a>`, c = `<a class="sw-item" href="/app" data-nav title="${m("Seus vibebooks")}" aria-label="${m("Seus vibebooks")}"><i class="pill"></i><span class="tile lg logo">${Ee}</span></a>
    <span class="sw-sep"></span>
    ${n.map((e) => e.tint ? `<div class="sw-group" data-tint="${e.tint}">${e.rooms.map(s).join("")}</div>` : s(e.rooms[0])).join("")}
    <span class="sw-sp"></span>
    <button class="sw-btn" id="swTheme" title="${m("{theme} (clique pra trocar)", { theme: E[D()].label })}" aria-label="${m("Tema: {theme}", { theme: E[D()].label })}">${E[D()].icon}</button>
    <button class="sw-btn" id="swSearch" title="${m("Ir para um vibebook (⌘K)")}" aria-label="${m("Ir para um vibebook")}">${De}</button>
    <button class="sw-btn" id="swNew" title="${m("Novo vibebook")}" aria-label="${m("Novo vibebook")}">${ke}</button>`, l = () => {
		Ce.querySelectorAll(".sw-item").forEach((t) => {
			let n = t.dataset.id ? t.dataset.id === e : location.pathname === "/app";
			t.classList.toggle("on", n), n ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current");
		}), Ce.querySelector(".on")?.scrollIntoView({ block: "nearest" });
	};
	if (c === Ue) return l();
	Ue = c, Ce.innerHTML = c, l(), Ce.querySelectorAll("[data-drag]").forEach((e) => e.oncontextmenu = (t) => {
		t.preventDefault();
		let n = C.find((t) => t.id === e.dataset.id), r = document.getElementById("tintPop");
		r.innerHTML = `<small>${g(n.title)}</small><div>${[null, ...Me].map((e) => `<button data-tint="${e || ""}" class="${(n.tint || null) === e ? "sel" : ""}" title="${e ? je[e] : m("sem cor")}" aria-label="${e ? je[e] : m("sem cor")}"></button>`).join("")}</div>
      <p class="iconRow"><label class="ghost">${m("Trocar ícone…")}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/x-icon,.ico" hidden></label>${n.icon ? `<button class="ghost" data-noicon>${m("Tirar ícone")}</button>` : ""}</p>`, r.querySelector("input[type=file]").onchange = async (e) => {
			let t = e.target.files[0];
			if (t) {
				r.hidden = !0;
				try {
					let e = await fetch(`/api/books/${n.id}/icon`, {
						method: "POST",
						headers: { "content-type": "image/png" },
						body: await Dn(t, 128)
					}).then((e) => e.json());
					if (e.error) throw Error(e.error);
					n.icon = e.icon, O(), A?.id === n.id && (On(N()), R());
				} catch (e) {
					alert(e.message || m("Não deu pra usar essa imagem."));
				}
			}
		}, r.querySelector("[data-noicon]")?.addEventListener("click", async () => {
			r.hidden = !0, await S(`/api/books/${n.id}/icon`, {}), n.icon = null, O(), A?.id === n.id && (On(N()), R());
		});
		let i = e.getBoundingClientRect();
		r.style.top = `${i.top}px`, r.hidden = !1, r.querySelectorAll("button[data-tint]").forEach((e) => e.onclick = () => {
			n.tint = e.dataset.tint || null, r.hidden = !0, O(), S(`/api/books/${n.id}/tint`, { tint: n.tint }).catch(() => {});
		});
	}), Ce.querySelectorAll("[data-drag]").forEach((e) => {
		e.ondragstart = (t) => {
			t.dataTransfer.setData("text/plain", e.dataset.id), t.dataTransfer.effectAllowed = "move";
		}, e.ondragover = (t) => {
			t.preventDefault(), e.classList.add("dropTo");
		}, e.ondragleave = () => e.classList.remove("dropTo"), e.ondrop = (t) => {
			t.preventDefault(), e.classList.remove("dropTo");
			let n = t.dataTransfer.getData("text/plain"), r = e.dataset.id;
			if (!n || n === r) return;
			let i = Ne().map((e) => e.id).filter((e) => e !== n), a = e.getBoundingClientRect();
			i.splice(i.indexOf(r) + +(t.clientY > a.top + a.height / 2), 0, n), i.forEach((e, t) => {
				let n = C.find((t) => t.id === e);
				n && (n.position = t);
			}), O(), S("/api/rooms/order", { ids: i }).catch(() => {});
		};
	}), document.getElementById("swSearch").onclick = $e, document.getElementById("swTheme").onclick = () => Ae(E[D()].next), document.getElementById("swNew").onclick = () => _t();
}
var We = document.getElementById("swTip");
Ce.addEventListener("mouseover", (e) => {
	let t = e.target.closest(".sw-item[data-id]"), n = t && C?.find((e) => e.id === t.dataset.id);
	if (!n) {
		We.hidden = !0;
		return;
	}
	let r = (n.members || "").split(",").filter(Boolean).length, i = n.id === A?.id ? "" : n.last_human_id > n.read_id ? `<span class="tn h">● ${m("mensagens novas")}</span>` : n.last_agent_id > n.read_id ? `<span class="tn a">● ${m("agents escreveram")}</span>` : "";
	We.innerHTML = `<b>${g(n.title)}</b>${n.summary ? `<span>${g(n.summary)}</span>` : ""}
    <small>${n.folder ? `${T("folder", 12)} ${g(n.folder)} · ` : ""}${r === 1 ? m("1 pessoa") : m("{n} pessoas", { n: r })} · ${x(n.updated_at) === m("agora") ? m("ativa agora") : m("ativa há {ago}", { ago: x(n.updated_at) })}</small>${i}`;
	let a = t.querySelector(".tile").getBoundingClientRect();
	We.style.top = `${a.top + a.height / 2}px`, We.hidden = !1;
}), Ce.addEventListener("mouseleave", () => We.hidden = !0), Ce.addEventListener("click", () => We.hidden = !0);
var Ge = document.getElementById("swDlg"), k = document.getElementById("swQ"), Ke = document.getElementById("swList");
Ce.setAttribute("aria-label", m("Seus vibebooks")), Ge.setAttribute("aria-label", m("Ir para um vibebook")), k.placeholder = m("Buscar salas, conversas e arquivos…");
var qe = 0;
function Je() {
	let e = ue(k.value), t = (C || []).filter((t) => !e || ue(t.title).includes(e) || ue(t.folder || "").includes(e)).slice(0, 12);
	qe = Math.min(qe, Math.max(0, t.length - 1));
	let n = Ye && Ye.q === k.value.trim() ? Ye : null;
	Ke.innerHTML = (t.map((e, t) => `<a href="/b/${e.id}" data-nav class="${t === qe ? "sel" : ""}" role="option">${Fe(e, "")}<span>${g(e.title)}</span>${e.folder ? `<small>${g(e.folder)}</small>` : ""}</a>`).join("") || (n?.epics.length || n?.messages.length ? "" : `<p class="muted" style="padding:8px 10px;margin:0">${m("Nada com esse nome.")}</p>`)) + Ze(n);
}
var Ye = null, Xe = 0, Ze = (e) => {
	if (!e) return k.value.trim().length >= 2 ? `<p class="muted swHint">${m("Buscando nas conversas…")}</p>` : "";
	let t = (e) => new Date(e).toLocaleDateString(p, {
		day: "numeric",
		month: "short"
	}), n = e.epics.map((e) => `<a href="/b/${e.room_id}?t=${e.id}" data-hit="${e.room_id}|${e.id}|" role="option"><span class="hitIco">${e.archived ? "✓" : "#"}</span><span><b>${g(e.title)}</b><small>${g(e.room)}${e.archived ? ` · ${m("arquivado")}` : ""} · ${t(e.ts)}</small></span></a>`).join(""), r = e.messages.map((e) => `<a href="/b/${e.room_id}${e.thread === "main" ? "" : `?t=${e.thread}`}#m${e.id}" data-hit="${e.room_id}|${e.thread}|${e.id}" role="option"><span class="hitIco">${e.files.length ? T("paperclip", 14) : e.by_agent ? "✻" : "“"}</span><span><span class="hitTxt">${g(e.snippet || e.files.map((e) => e.name).join(", "))}</span><small>${g(e.room)}${e.topic ? ` › ${g(e.topic)}` : ""} · ${g(e.by_agent ? e.via || "Agent" : v(e.author))} · ${t(e.ts)}${e.files.length && e.snippet ? ` · ${g(e.files.map((e) => e.name).join(", "))}` : ""}</small></span></a>`).join("");
	return !n && !r ? `<p class="muted swHint">${m("Nada nas conversas.")}</p>` : `${n ? `<p class="swSec">${m("Épicos")}</p>${n}` : ""}${r ? `<p class="swSec">${m("Nas conversas")}</p>${r}` : ""}`;
};
function Qe() {
	clearTimeout(Xe);
	let e = k.value.trim();
	e.length < 2 ? Ye = null : Xe = setTimeout(async () => {
		let t = await fetch(`/api/search?q=${encodeURIComponent(e)}`).catch(() => null), n = t?.ok ? await t.json() : null;
		k.value.trim() === e && (Ye = n ? {
			q: e,
			epics: n.epics || [],
			messages: n.messages || []
		} : {
			q: e,
			epics: [],
			messages: []
		}, Je());
	}, 250);
}
function $e() {
	C && (c(), Et(), k.value = "", qe = 0, Ye = null, Je(), Ge.showModal(), k.focus());
}
k.oninput = () => {
	qe = 0, Qe(), Je();
}, k.onkeydown = (e) => {
	let t = Ke.querySelectorAll("a").length;
	(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), qe = (qe + (e.key === "ArrowDown" ? 1 : t - 1)) % Math.max(t, 1), Je()), e.key === "Enter" && (e.preventDefault(), Ke.querySelectorAll("a")[qe]?.click());
}, Ke.onclick = (e) => {
	let t = e.target.closest("a[data-hit]");
	if (Ge.close(), !t) return;
	e.preventDefault();
	let [n, r, i] = t.dataset.hit.split("|");
	if (f.pushState(null, "", t.getAttribute("href")), et(), !i) return;
	let a = 0, o = () => {
		if (A?.id === n && A.messages?.length) return Oi(Number(i));
		++a < 25 && setTimeout(o, 200);
	};
	setTimeout(o, 150);
}, Ge.onclick = (e) => {
	e.target === Ge && Ge.close();
}, document.addEventListener("keydown", (e) => {
	(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && document.body.classList.contains("has-sw") && (e.preventDefault(), Ge.open ? Ge.close() : $e());
});
function et() {
	c(), Et(), Qt(), O();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (Nt?.dispose(), Nt = null, location.pathname === "/login") return nt();
	if (location.pathname === "/archived") return yt();
	e ? Gt(e[1]) : st();
}
var tt = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><path fill=\"#FFC107\" d=\"M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z\"/><path fill=\"#FF3D00\" d=\"M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z\"/><path fill=\"#4CAF50\" d=\"M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z\"/><path fill=\"#1976D2\" d=\"M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z\"/></svg>";
async function nt() {
	document.title = `${m("Entrar")} · vibebook`, On(null);
	let e = new URLSearchParams(location.search), t = r(e.get("next") || "/app", location.href, "svelte"), n = await fetch("/auth/providers").then((e) => e.json()).catch(() => ({ google: !1 })), i = "", a = (e, o = "") => {
		h.innerHTML = `
    <div class="login"><div class="box">
      <a class="brand" href="/">vibebook</a>
      ${e === "email" ? `
        <h1>${m("Entrar")}</h1>
        <p>${m("Seus vibebooks e seus amigos te esperando.")}</p>
        ${n.google ? `<a class="google" href="/auth/google/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${tt} ${m("Continuar com Google")}</button></a>` : ""}${n.github ? `<a class="google" href="/auth/github/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${he.replace("<svg ", "<svg width=\"18\" height=\"18\" ")} ${m("Continuar com GitHub")}</button></a>` : ""}${n.google || n.github ? `<div class="or">${m("ou com email")}</div>` : ""}
        <form id="f"><label class="muted" for="email" style="font-size:14px">${m("Seu email")}</label>
          <input id="email" type="email" autocomplete="email" required placeholder="${m("voce@gmail.com")}" value="${g(i)}" />
          <button class="primary" id="go">${m("Mandar código")}</button>
          <p class="err" role="alert">${g(o)}</p></form>` : `
        <h1>${m("Confere seu email")}</h1>
        <p>${m("Mandamos um código de 6 dígitos para <b>{email}</b>.", { email: g(i) })}</p>
        <form id="f"><label class="muted" for="code" style="font-size:14px">${m("Código")}</label>
          <input id="code" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required pattern="[0-9]{6}" />
          <button class="primary" id="go">${m("Entrar")}</button>
          <p class="err" role="alert">${g(o)}</p>
          <button type="button" class="link" id="back">${m("usar outro email")}</button></form>`}
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
			if (!l.ok) return a(e, u.error || m("Algo deu errado. Tenta de novo."));
			if (e === "email") return a("code");
			location.href = r(u.next || "/app", location.href, "svelte");
		}, e === "code" && (document.getElementById("code").oninput = (e) => {
			e.target.value.replace(/\D/g, "").length === 6 && s.requestSubmit();
		});
	};
	a("email", e.get("error") === "google" ? m("Não deu certo com o Google. Tenta com email.") : e.get("error") === "github" ? m("Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.") : "");
}
window.addEventListener("popstate", () => {
	if (c(), Et(), si() || Jr()) return;
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (!e || !A || e[1] !== A.id || !Nt || !h.querySelector(".book")) return et();
	j = new URLSearchParams(location.search).get("t") || "main", j !== "main" && !A.epics.some((e) => e.id === j) && (j = "main"), Q = !1, Hr = j === "main" ? null : j, R(), X(), B(), $();
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("a[data-nav]");
	t && (e.preventDefault(), f.pushState(null, "", t.getAttribute("href")), et());
});
var rt = null, it = "", at = (e) => {
	rt = e, it = JSON.stringify(e), ot(e.v), He();
};
function ot(e) {
	let t = document.querySelector("meta[name=\"vb-v\"]")?.content;
	if (!e || !t || e === t || document.getElementById("vbUpdate")) return;
	let n = document.createElement("button");
	n.id = "vbUpdate", n.type = "button", n.className = "vbUpdate", n.innerHTML = `${T("undo", 15)} ${m("Nova versão do vibebook · toque pra atualizar")}`, n.onclick = () => location.reload(), document.body.append(n);
}
async function st() {
	document.title = "vibebook", On(null), rt && ct(rt);
	let e = await S("/api/me?ui=svelte");
	if (/^\/(b|login|archived)\b/.test(location.pathname)) return at(e);
	let t = JSON.stringify(e) !== it;
	if (at(e), !t && h.querySelector("#ask")) return;
	let n = document.getElementById("askText")?.value;
	if (ct(e), n) {
		let e = document.getElementById("askText");
		e && (e.value = n);
	}
}
function ct(e) {
	C = e.books, w = e.waits || [], O(), se = Object.fromEntries(e.friends.filter((e) => e.name).map((e) => [e.email, e.name])), ce = Object.fromEntries([...e.friends.filter((e) => e.avatar).map((e) => [e.email, e.avatar]), ...e.avatar ? [[e.email, e.avatar]] : []]);
	let t = (e.name || "").split(" ")[0], n = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	if (lt.matches) return dt(e);
	h.innerHTML = `
  <div class="home">
    <header class="top">
      <div class="brand"><a href="/">vibebook</a></div>
      <button class="me" id="myName" title="${m("Seu perfil: email, como você entra, sair")}">${y(e.email)}<span>${g(e.name || e.email)}</span></button>
      <button class="ghost bell" data-bell></button>
      <button class="ghost homeTheme" id="homeTheme" aria-label="${m("Tema")}">${E[D()].icon}</button>
      ${ae()}
    </header>
    <dialog class="profile" id="profileDlg">
      <button class="ghost x pfX" aria-label="${m("Fechar")}">${T("x")}</button>
      <div class="pdHead">${y(e.email)}<div><b title="${m("Mudar seu nome")}">${g(e.name || m("Seu nome"))}</b><small>${g(e.email)}</small></div></div>
      ${ft()}
      <div class="pfOut"><button class="primary" id="logout">${m("Sair")}</button><button class="ghost" id="logoutAll" title="${m("Sai em todos os navegadores e celulares onde você entrou")}">${m("Sair de todos os aparelhos")}</button></div>
    </dialog>
    <div id="setupCard"></div>
    <form class="ask" id="ask">
      <label for="askText">${m("O que você quer resolver?")}</label>
      <div class="askRow"><textarea id="askText" rows="2" maxlength="2000" placeholder="${m("Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.")}"></textarea><button class="primary" id="askBtn">${m("Achar a sala →")}</button></div>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
    ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${m("Como seus amigos te chamam?")}</b><span class="muted">${m("O pessoal e os agents vão te chamar assim.")}</span>
      <div class="row"><input name="n" required maxlength="60" placeholder="${m("Seu nome")}" autocomplete="given-name" /><button class="primary">${m("Salvar")}</button></div></form>`}
    ${e.avatar ? "" : `<div class="picAsk"><span class="picBig" style="background:${_(e.email)}">${g(v(e.email).slice(0, 2).toUpperCase())}</span>
      <div><b>${m("Coloque sua foto")}</b><span class="muted">${m("Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).")}</span></div>
      <button class="primary" data-pic>${T("camera")} ${m("Adicionar foto")}</button></div>`}
    <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />
    <div class="hello">
      <div class="helloText"><h1>${t ? m("Oi, {name}", { name: g(t) }) : m("Seus vibebooks")}</h1>
        <p>${n(e.books.length, "vibebook", "vibebooks")} · ${n(e.friends.length, m("amigo"), m("amigos"))} · <a class="archLink" data-nav href="/archived">${m("Arquivo")}</a><span id="waitN"></span></p></div>
      <button class="primary" id="new">${T("plus")} ${m("Novo vibebook")}</button>
    </div>
    <div class="grid">
      <main>
        ${e.books.length ? "" : `<div class="empty">${m("Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.")}</div>`}
        <div class="cards">${Ne().map((e) => {
		let t = (e.members || "").split(",").filter(Boolean);
		return `
              <div class="cardBox"><a class="card" data-nav href="/b/${e.id}">
                <button type="button" class="arch" data-archive="${e.id}" data-title="${g(e.title)}" title="${m("Arquivar")}" aria-label="${m("Arquivar {title}", { title: g(e.title) })}">${T("archive")}</button>
                ${Pe(e) ? `<div class="cover hasIcon"><img src="${Pe(e)}" alt="" loading="lazy"></div>` : `<div class="cover" style="background-color:${wn(e.title)}"><span>${g(P(e.title))}</span></div>`}
                <div class="info">
                  <b>${g(e.title)}</b>
                  <div class="sum">${g(e.summary || m("Ainda sem resumo. O @vibe escreve um quando a conversa andar."))}</div>
                  <div class="meta"><div class="stack">${t.slice(0, 5).map((e) => y(e)).join("")}</div><span class="wc" data-wc="${e.id}"></span><span>${x(e.updated_at)}</span></div>
                </div>
              </a><div class="cw" data-cw="${e.id}" hidden></div></div>`;
	}).join("")}
        </div>
      </main>
      <aside class="friends">
        <section class="agentBox" id="agentBox" aria-live="polite"></section>
        <h2>${m("Amigos")} <small>${e.friends.length || ""}</small></h2>
        ${e.friends.length ? e.friends.map((e) => `
          <div class="friend">${y(e.email)}<div class="fn" title="${g(e.email)}">${g(e.name || v(e.email))}
            <small>${e.shared ? `${n(e.shared, m("vibebook junto"), m("vibebooks juntos"))}` : e.joined ? m("na plataforma") : m("convidado")}</small></div>
            <button class="ghost x" data-unfriend="${g(e.email)}" aria-label="${m("Remover {email} dos amigos", { email: g(e.email) })}" title="${m("Remover dos amigos")}">${T("x")}</button></div>`).join("") : `<p class="muted" style="font-size:14px">${m("Quem você convida para um vibebook vira amigo aqui.")}</p>`}
        <form class="invite" id="addFriend"><input type="email" required placeholder="${m("email do amigo")}" aria-label="${m("Email do amigo")}" /><button>${m("Convidar")}</button></form>
      </aside>
    </div>
  </div>`, mt(e);
}
var lt = matchMedia("(max-width: 720px)");
lt.addEventListener("change", () => {
	location.pathname === "/app" && st();
});
var ut = T("menu", 22);
function dt(e) {
	let t = [...e.books].sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0) || t.updated_at - e.updated_at), n = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", r = (e) => {
		let t = w.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${we(t)}">${n}</b>` : "";
	}, i = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	h.innerHTML = `
  <div class="phome">
    <header class="ptop">
      <button class="ghost pbtn" id="pMenu" aria-label="Menu">${ut}${w.length ? `<b class="swWait${we(w)}">${w.length}</b>` : ""}</button>
      <a class="plogo" href="/"><span class="tile logo">${Ee}</span>vibebook</a>
      <button class="me" id="myName" aria-label="${m("Seu perfil")}">${y(e.email)}</button>
    </header>
    <main class="pmain">
      <div id="setupCard"></div>
      ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${m("Como seus amigos te chamam?")}</b><span class="muted">${m("O pessoal e os agents vão te chamar assim.")}</span>
        <div class="row"><input name="n" required maxlength="60" placeholder="${m("Seu nome")}" autocomplete="given-name" /><button class="primary">${m("Salvar")}</button></div></form>`}
      <div class="pgrid">
        ${t.map((e) => `<a class="proom" data-nav href="/b/${e.id}"><span class="tw${e.sandboxes_running ? " cloud" : ""}">${Fe(e, "xl")}${n(e)}${r(e)}${e.sandboxes_running ? "<b class=\"swCloud\">☁</b>" : ""}</span><span class="nm">${g(e.title)}</span></a>`).join("")}
        <button class="proom" id="new" type="button"><span class="tile xl pnew">${ke}</span><span class="nm">${m("Novo")}</span></button>
      </div>
    </main>
    <form class="pask" id="ask">
      <textarea id="askText" maxlength="2000" placeholder="${m("O que você quer resolver? Eu acho a sala e o épico certos.")}"></textarea>
      <button class="primary" id="askBtn">${m("Achar a sala →")}</button>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
  </div>
  <dialog class="pdrawer" id="pDrawer">
    <div class="pdHead">${y(e.email)}<div><b>${g(e.name || m("Seu nome"))}</b><small>${g(e.email)}</small></div></div>
    ${ft()}
    <section class="waits" id="waits"${w.length ? "" : " hidden"}></section>
    <nav class="pdNav">
      <a data-nav href="/archived">${m("Arquivo")}</a>
      <div class="pdRow"><button class="ghost" id="homeTheme">${E[D()].icon}<span>${E[D()].label}</span></button>${ae()}</div>
      <div class="pdBell"><button class="ghost bell" data-bell></button><span>${m("Notificações")}</span></div>
      ${window.PublicKeyCredential ? `<label class="pdLock"><input type="checkbox" id="lockToggle" ${Ra() ? "checked" : ""} /> <span>${m("Exigir Face ID ao abrir")}</span></label>` : ""}
    </nav>
    <section class="agentBox" id="agentBox" aria-live="polite"></section>
    <h2>${m("Amigos")} <small>${e.friends.length || ""}</small></h2>
    ${e.friends.map((e) => `<div class="friend">${y(e.email)}<div class="fn">${g(e.name || v(e.email))}<small>${e.shared ? i(e.shared, m("vibebook junto"), m("vibebooks juntos")) : e.joined ? m("na plataforma") : m("convidado")}</small></div>
      <button class="ghost x" data-unfriend="${g(e.email)}" aria-label="${m("Remover {email} dos amigos", { email: g(e.email) })}">${T("x")}</button></div>`).join("")}
    <form class="invite" id="addFriend"><input type="email" required placeholder="${m("email do amigo")}" aria-label="${m("Email do amigo")}" /><button>${m("Convidar")}</button></form>
    <button class="ghost pdOut" id="logout">${m("Sair")}</button>
    <button class="ghost pdOut pdOutAll" id="logoutAll">${m("Sair de todos os aparelhos")}</button>
  </dialog>
  <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />`;
	let a = document.getElementById("pDrawer");
	document.getElementById("pMenu").onclick = () => a.showModal(), a.onclick = (e) => {
		(e.target === a || e.target.closest("a[data-nav]")) && a.close();
	}, mt(e), document.getElementById("homeTheme").onclick = (e) => {
		Ae(E[D()].next), e.currentTarget.innerHTML = `${E[D()].icon}<span>${E[D()].label}</span>`;
	}, document.getElementById("myName").onclick = () => a.showModal(), a.querySelector(".pdHead .avatar").onclick = Ir, a.querySelector(".pdBell span").onclick = () => a.querySelector(".pdBell .bell").click();
	let o = document.getElementById("lockToggle");
	o && (o.onchange = async () => {
		let t = o.checked;
		try {
			await Va(t, e.email), z(m(t ? "Pronto: o vibebook pede Face ID ao abrir neste aparelho." : "Face ID desligado neste aparelho."));
		} catch {
			o.checked = !t, z(m("Não deu pra usar o Face ID aqui."));
		}
	}), a.querySelector(".pdHead b").onclick = async () => {
		let t = prompt(m("Seu nome:"), e.name || "");
		t?.trim() && (await S("/api/me?ui=svelte", { name: t }), st());
	};
}
var ft = () => `<section class="logins"><h3>${m("Como você entra")}</h3><div id="loginRows"></div><p class="lgNote">${m("Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.")}</p></section>`;
async function pt() {
	let e = document.getElementById("loginRows");
	if (!e) return;
	let t;
	try {
		t = await (await fetch("/api/me/logins")).json();
	} catch {
		return;
	}
	let n = Object.fromEntries((t.logins || []).map((e) => [e.method, e])), r = (e) => e ? m("último {d} · {n}×", {
		d: new Date(e.last).toLocaleDateString(p, {
			day: "numeric",
			month: "short",
			year: "numeric"
		}),
		n: e.n
	}) : null, i = (e, t, n, i) => `<div class="lgRow${n ? " on" : ""}"><span class="lgIc">${e}</span><span><b>${t}</b><small>${r(n) ?? i}</small></span>${n ? `<i class="lgOk">${T("check", 14)}</i>` : ""}</div>`;
	e.innerHTML = [
		i(T("at", 16), m("Código por email"), n.email, m("sempre funciona")),
		t.providers?.google || n.google ? i(tt, "Google", n.google, m("ainda não usou")) : "",
		t.providers?.github || n.github ? i(he.replace("<svg ", "<svg width=\"16\" height=\"16\" "), "GitHub", n.github, m("ainda não usou")) : "",
		n.invite ? i(T("reply", 16), m("Link de convite"), n.invite) : ""
	].join("");
}
function mt(e) {
	let t = async (e) => {
		e?.trim() && (await S("/api/me?ui=svelte", { name: e }), st());
	}, n = document.getElementById("profileDlg");
	document.getElementById("myName").onclick = () => n ? n.showModal() : null, n && (n.onclick = (e) => {
		(e.target === n || e.target.closest(".pfX")) && n.close();
	}, n.querySelector(".pdHead .avatar").onclick = Ir, n.querySelector(".pdHead b").onclick = () => t(prompt(m("Seu nome:"), e.name || ""))), pt(), document.querySelector("[data-pic]")?.addEventListener("click", Ir), document.getElementById("nameAsk")?.addEventListener("submit", (e) => {
		e.preventDefault(), t(e.target.n.value);
	}), document.getElementById("homeTheme").onclick = (e) => {
		Ae(E[D()].next), e.currentTarget.innerHTML = E[D()].icon;
	}, document.getElementById("logout").onclick = async () => {
		await fetch("/auth/logout", { method: "POST" }), location.href = "/";
	}, document.getElementById("logoutAll").onclick = async () => {
		confirm(m("Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.")) && (await fetch("/auth/logout-all", { method: "POST" }), location.href = r("/login", location.href, "svelte"));
	}, document.getElementById("new").onclick = () => _t(), document.querySelectorAll("[data-unfriend]").forEach((e) => e.onclick = async () => {
		confirm(m("Remover {email} dos seus amigos? Os vibebooks em comum continuam.", { email: e.dataset.unfriend })) && (await fetch(`/api/friends/${encodeURIComponent(e.dataset.unfriend)}`, { method: "DELETE" }), st());
	}), document.getElementById("addFriend").onsubmit = async (e) => {
		e.preventDefault(), await S("/api/friends", { email: e.target[0].value }).catch((e) => alert(e.message)), st();
	}, St(), Ct(), cn(), ht(), document.querySelectorAll("[data-archive]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation(), vt(e.dataset.archive, e.dataset.title);
	});
}
function ht() {
	let e = document.getElementById("ask"), t = document.getElementById("askText"), n = document.getElementById("askOut"), r = document.getElementById("askBtn");
	if (!e) return;
	t.oninput = () => {
		t.style.height = "auto", t.style.height = `${t.scrollHeight}px`;
	}, t.onkeydown = (t) => {
		t.key === "Enter" && !t.shiftKey && !t.isComposing && (t.preventDefault(), e.requestSubmit());
	};
	let a = (e) => `<b>${g(e.book_title)}</b>${e.epic_title ? ` → <b>${g(e.epic_title)}</b>` : ""}`, o = async (e) => {
		let r = t.value.trim();
		n.innerHTML = `<div class="why">${m("Enviando…")}</div>`;
		try {
			if (!e.book_id) return await gt(r);
			let t = e.book_id, n = await i(t).postMessage({
				text: r,
				thread: e.epic_id || "main"
			});
			if (!n.ok) throw Error(n.error);
			Vt = e.epic_id || null, f.pushState(null, "", `/b/${t}`), et();
		} catch (e) {
			n.innerHTML = `<div class="why bad">${g(e.message)}</div>`;
		}
	};
	e.onsubmit = async (e) => {
		e.preventDefault();
		let i = t.value.trim();
		if (!i) return;
		r.disabled = !0, n.hidden = !1, n.innerHTML = `<div class="why">${m("Procurando a sala certa…")}</div>`;
		let s;
		try {
			s = await S("/api/route", { text: i });
		} catch (e) {
			n.innerHTML = `<div class="why">${g(e.message)}</div>`, r.disabled = !1;
			return;
		}
		r.disabled = !1;
		let c = (e) => e.length > 40 ? `${e.slice(0, 38)}…` : e, l = [...[s.pick, ...s.alternatives].filter(Boolean), {
			book_id: null,
			epic_id: null,
			new_title: s.new_room_title
		}], u = 0, d = (e) => e.book_id ? a(e) : m("sala nova <b>“{title}”</b>", { title: g(c(e.new_title)) }), ee = () => {
			let e = l[u];
			n.innerHTML = `<div class="where">${e.book_id ? m("Mandar em {where}?", { where: d(e) }) : s.pick ? m("Criar {where}?", { where: d(e) }) : m("Nenhuma sala parece a certa. Criar {where}?", { where: d(e) })}</div>
        ${u === 0 && s.pick && s.reason ? `<div class="why">${g(s.reason)}</div>` : ""}
        <div class="acts">
          <button type="button" class="primary" data-send="chat">${m("Enviar")}</button>
          <button type="button" class="ghost" data-cancel>${m("Cancelar")}</button>
        </div>
        ${l.length > 1 ? `<div class="acts alts"><span class="why">${m("Outro lugar:")}</span>${l.map((e, t) => t === u ? "" : `<button type="button" class="ghost" data-sel="${t}">${d(e)}</button>`).join("")}</div>` : ""}`, n.querySelectorAll("[data-send]").forEach((e) => e.onclick = () => o(l[u])), n.querySelectorAll("[data-sel]").forEach((e) => e.onclick = () => {
				u = Number(e.dataset.sel), ee(), n.querySelector("[data-send]")?.focus();
			}), n.querySelector("[data-cancel]").onclick = () => {
				n.hidden = !0, t.focus();
			};
		};
		ee(), n.querySelector("[data-send]")?.focus();
	};
}
async function gt(e) {
	let t = await S("/api/books/start", { text: e });
	f.pushState(null, "", `/b/${t.id}`), et(), t.unknown?.length && setTimeout(() => z(m("Não achei {who} nos seus amigos: convide pelo email em Pessoas.", { who: g(t.unknown.join(", ")) })), 1500);
}
function _t() {
	let e = document.createElement("dialog");
	e.className = "newRoomDlg", e.innerHTML = `<form method="dialog"><h3>${m("Novo vibebook")}</h3>
    <label for="nrText">${m("O que é e com quem?")}</label>
    <textarea id="nrText" rows="3" placeholder="${m("Ex.: viagem de avião pra SP com os dogs, eu e a Alexia")}"></textarea>
    <p class="muted">${m("Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.")}</p>
    <p class="err" hidden></p>
    <div class="acts"><button type="button" class="ghost" value="no">${m("Cancelar")}</button><button class="primary" value="yes">${m("Criar")}</button></div></form>`, document.body.appendChild(e), e.addEventListener("close", () => e.remove());
	let t = e.querySelector("textarea"), n = e.querySelector("[value=\"yes\"]"), r = e.querySelector(".err");
	e.querySelector("[value=\"no\"]").onclick = () => e.close(), t.onkeydown = (e) => {
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), n.click());
	}, n.onclick = async (i) => {
		i.preventDefault();
		let a = t.value.trim();
		if (!a) return t.focus();
		n.disabled = !0, n.textContent = m("Criando…");
		try {
			await gt(a), e.close();
		} catch (e) {
			r.hidden = !1, r.textContent = e.message, n.disabled = !1, n.textContent = m("Criar");
		}
	}, e.showModal(), t.focus();
}
function vt(e, t) {
	let n = document.createElement("dialog");
	n.innerHTML = `<h3>${m("Arquivar “{title}”?", { title: g(t) })}</h3>
    <p class="muted" style="margin:0 0 6px">${m("Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.")}</p>
    <div class="acts"><button type="button" class="ghost" value="no">${m("Cancelar")}</button><button type="button" class="primary" value="yes">${m("Arquivar")}</button></div>`, document.body.appendChild(n), n.addEventListener("close", () => n.remove()), n.querySelector("[value=\"no\"]").onclick = () => n.close(), n.querySelector("[value=\"yes\"]").onclick = async () => {
		await S(`/api/books/${e}/archive`, { archived: !0 }).catch((e) => alert(e.message)), n.close(), st();
	}, n.showModal(), n.querySelector("[value=\"yes\"]").focus();
}
async function yt() {
	document.title = `${m("Arquivo")} · vibebook`, On(null);
	let { books: e } = await S("/api/archived");
	h.innerHTML = `
  <div class="home">
    <header class="top"><div class="brand"><a href="/app" data-nav>vibebook</a></div></header>
    <div class="hello"><div class="helloText"><h1>${m("Arquivo")}</h1><p>${m("Salas que você arquivou. Elas continuam existindo pra quem está nelas.")}</p></div>
      <a class="ghost" data-nav href="/app" style="text-decoration:none">${T("back")} ${m("Voltar")}</a></div>
    <main>${e.length ? `<div class="cards">${e.map((e) => `
      <div class="card" style="cursor:default">
        <div class="cover" style="background-color:${wn(e.title)};filter:grayscale(.6)"><span>${g(P(e.title))}</span></div>
        <div class="info"><b>${g(e.title)}</b><div class="sum">${g(e.summary || "")}</div>
          <div class="meta"><span>${m("arquivada {ago}", { ago: x(e.archived_at) })}</span><span><a data-nav href="/b/${e.id}">${m("abrir")}</a> · <button type="button" class="link" data-restore="${e.id}">${m("Restaurar")}</button></span></div></div>
      </div>`).join("")}</div>` : `<div class="empty">${m("Nada arquivado.")}</div>`}</main>
  </div>`, document.querySelectorAll("[data-restore]").forEach((e) => e.onclick = async () => {
		await S(`/api/books/${e.dataset.restore}/archive`, { archived: !1 }), yt();
	});
}
var bt = 0, xt = 0;
async function St(e) {
	clearTimeout(bt), xt = e ? xt + 1 : 0;
	let t = document.getElementById("agentBox");
	if (!t) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (n && document.body.contains(t)) {
		if (`${location.origin}`, n.agents.length) {
			let e = Date.now(), r = (e) => e.used_at ?? e.connected_at, i = (t) => e - r(t) > 12096e5, a = {};
			for (let e of n.agents) (a[e.client] ??= []).push(e);
			for (let e of Object.values(a)) e.sort((e, t) => r(t) - r(e));
			let o = (e) => e.used_at ? m("usado {ago}", { ago: x(e.used_at) }) : e.used_at === null ? m("sem uso ainda") : m("uso desconhecido");
			t.innerHTML = `<h2>✦ ${m("Seus agents conectados")}</h2>
      ${Object.entries(a).map(([e, t]) => `<div class="connGroup"><div class="connHead"><b>${g(e)}</b><small>${t.length}</small></div>
        ${t.map((e) => `<label class="conn"><input type="checkbox" data-gid="${g(e.id)}" ${i(e) ? "checked" : ""} /><span>${m("conectado {ago}", { ago: x(e.connected_at) })}<small>${o(e)}</small></span></label>`).join("")}</div>`).join("")}
      <div class="connActs"><button type="button" class="ghost" id="connKeep">${m("Marcar todas menos a mais recente de cada")}</button><button type="button" class="primary" id="connDel"></button></div>
      <p style="margin-top:8px">${m("Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>")}</p>`;
			let s = () => [...t.querySelectorAll("[data-gid]")], c = () => {
				let e = s().filter((e) => e.checked).length, n = t.querySelector("#connDel");
				n.textContent = m("Remover selecionadas ({n})", { n: e }), n.disabled = !e;
			};
			t.addEventListener("change", c), c(), t.querySelector("#connKeep").onclick = () => {
				t.querySelectorAll(".connGroup").forEach((e) => e.querySelectorAll("[data-gid]").forEach((e, t) => e.checked = t > 0)), c();
			}, t.querySelector("#connDel").onclick = async () => {
				let e = s().filter((e) => e.checked).map((e) => e.dataset.gid);
				e.length && confirm(m("Remover {n} conexões? Os agents delas perdem o acesso na hora.", { n: e.length })) && (await fetch("/api/agents/revoke", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ ids: e })
				}), St());
			};
		} else t.hidden = !0, Mt(document.getElementById("setupCard"));
	}
}
function Ct() {
	let e = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], t = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}`, n = (n, r) => {
		let i = w.indexOf(n);
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${i}">${r ? "" : Fe(C.find((e) => e.id === n.book_id) || {
			id: n.book_id,
			title: n.room
		}, "sm")}
        <span class="wt"><small>${r ? "" : `${g(n.room)}${n.topic ? " › " : ""}`}${n.topic ? g(n.topic) : r ? m("sala principal") : ""} · ${x(n.ts)}</small>
        ${n.ref.startsWith("t") ? `<b>${m("Tarefa sua esperando OK:")}</b> ${g(n.text)}` : `<b>${g(e(n))}:</b> ${g(n.text.length > 160 ? `${n.text.slice(0, 158)}…` : n.text)}`}</span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${i}" title="${m("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${m("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${T("check")}</button>` : ""}
    </li>`;
	}, r = document.getElementById("waitN");
	r && (r.innerHTML = w.length ? ` · <b class="waitTot">${m("{n} esperando você", { n: w.length })}</b>` : "");
	let i = (n) => {
		let r = w.indexOf(n), i = n.ref.startsWith("t");
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${r}"><span class="wIc${i ? " task" : ""}">${i ? T("check", 16) : y(n.author)}</span>
        <span class="wt"><span class="wTx">${g(n.text.length > 200 ? `${n.text.slice(0, 198)}…` : n.text)}</span>
        <small>${i ? m("sua tarefa esperando OK") : m("{who} pediu", { who: g(e(n)) })} · ${n.topic ? g(n.topic) : m("sala principal")} · ${x(n.ts)}</small></span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${r}" title="${m("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${m("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${T("check")}</button>` : ""}
    </li>`;
	};
	document.querySelectorAll("[data-cw]").forEach((e) => {
		let t = w.filter((t) => t.book_id === e.dataset.cw);
		e.hidden = !t.length, e.innerHTML = t.length ? `<ul>${t.slice(0, 3).map(i).join("")}</ul>${t.length > 3 ? `<details><summary>${m("+{n} mais", { n: t.length - 3 })}</summary><ul>${t.slice(3).map(i).join("")}</ul></details>` : ""}` : "";
		let n = document.querySelector(`[data-wc="${e.dataset.cw}"]`);
		n && (n.innerHTML = t.length ? `<b class="wChip">${m("{n} esperando você", { n: t.length })}</b>` : "");
	});
	let a = document.getElementById("waits");
	a && (a.hidden = !w.length, a.innerHTML = w.length ? `<h2>${m("Esperando você")} <small>${w.length}</small></h2><ul>${w.map((e) => n(e, !1)).join("")}</ul>` : ""), document.querySelectorAll("[data-wait-done]").forEach((e) => e.onclick = () => {
		let t = w[Number(e.dataset.waitDone)];
		w = w.filter((e) => e !== t), Ct(), O(), S("/api/waits/resolve", {
			book_id: t.book_id,
			ref: t.ref
		}).catch(() => {});
	});
}
var wt = !1, Tt = 0;
function Et() {
	Tt++;
	let e = document.getElementById("inbox");
	e?._unmount?.(), e && (e._unmount = null);
}
function Dt() {
	document.getElementById("inbox")?._unmount?.updateWaits(w);
	let e = document.getElementById("inboxBtn");
	if (!e) return;
	let t = w.length, n = e.querySelector(".kN");
	n.hidden = !t, n.textContent = t, n.className = `kN${we(w)}`;
}
var Ot = () => Promise.resolve(s);
function kt() {
	Et();
	let e = Tt, t = document.getElementById("inbox");
	t || (t = document.createElement("div"), t.id = "inbox", document.body.appendChild(t));
	let n = () => {
		e === Tt && Et();
	};
	Ot().then(({ mountInbox: r }) => {
		e === Tt && (t.replaceChildren(), t._unmount = r(t, {
			waits: w,
			roomId: A?.id ?? null,
			all: wt,
			vb: {
				t: m,
				ago: x
			},
			displayName: v,
			avatarUrl: (e) => {
				let t = A?.avatars?.[e] ?? ce[e];
				return t ? `/api/avatar/${encodeURIComponent(e)}?v=${t}` : void 0;
			},
			ontab: (e) => wt = e,
			onclose: n,
			onopen: (e, t) => {
				n();
				let r = /^[mab]/.test(e.ref) ? Number(e.ref.slice(1)) : 0;
				A?.id === e.book_id && (t.preventDefault(), r ? Oi(r, e.thread) : e.thread !== j && (j = e.thread, R(), X(), $()));
			},
			onresolve: async (e) => {
				await S("/api/waits/resolve", {
					book_id: e.book_id,
					ref: e.ref
				}), w = w.filter((t) => t.book_id !== e.book_id || t.ref !== e.ref), O(), Ct(), A && R();
			}
		}));
	}).catch(() => z(m("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
	e.target.closest?.("#inboxBtn") && kt();
});
var At = 0, jt = !1;
async function Mt(e, t) {
	if (clearTimeout(At), !e) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (!n || !document.body.contains(e)) return;
	if (jt = !n.agents.length, A && e.id === "agentNudge" && Hn(), n.agents.length) {
		e.dataset.waiting ? (e.innerHTML = `<div class="setup done"><span class="setupIcon">${T("check", 22)}</span><div><b>${m("Seu agent conectou.")}</b><span>${m(t ? "Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo." : "Ele já enxerga as suas salas.")}</span></div></div>`, delete e.dataset.waiting, setTimeout(() => {
			document.body.contains(e) && (e.innerHTML = "", e.hidden = !0);
		}, 6e3), t || St()) : (e.innerHTML = "", e.hidden = !0);
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
      <div class="setupHead">${r ? `<button class="ghost setupX" data-setupx aria-label="${m("Fechar")}" title="${m("Fechar")}">×</button>` : ""}<span class="setupIcon">✻</span><div><b>${m(t ? "Traga seu agent pra esta sala" : "Conecte seu agent")}</b>
        <span>${m("O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:")}</span></div></div>
      <div class="setupCmd"><code>${g(a)}</code><button class="primary" data-copycmd>${m("Copiar")}</button></div>
      <div class="setupFoot"><span class="wait">${m("esperando seu agent conectar…")}</span>
        <details><summary>${m("Claude.ai ou outro cliente")}</summary>
          <p><b>Claude.ai:</b> ${m("Configurações → Conectores → Adicionar conector personalizado, e cole")} <code data-copy>${g(n)}</code></p>
          <p><b>${m("Claude Code só com o conector:")}</b> <code data-copy>claude mcp add --transport http vibebook ${g(n)}</code></p>
          <p><a href="/connect" target="_blank" rel="noopener">${m("Passo a passo completo →")}</a></p>
        </details></div>
    </div>`;
		let i = e.querySelector("[data-setupx]");
		i && (i.onclick = () => {
			try {
				localStorage.setItem("vb.setupOff", "1");
			} catch {}
			clearTimeout(At), e.innerHTML = "", e.hidden = !0;
		});
		let o = e.querySelector("[data-copycmd]");
		o.onclick = async () => {
			try {
				await navigator.clipboard.writeText(a), o.textContent = `✓ ${m("Copiado")}`;
			} catch {
				o.textContent = m("Selecione e copie");
			}
			setTimeout(() => o.textContent = m("Copiar"), 2500);
		}, e.querySelectorAll("[data-copy]").forEach((e) => e.onclick = () => {
			navigator.clipboard?.writeText(e.textContent), e.classList.add("copied");
		});
	}
	let o = Number(e.dataset.polls || 0);
	o < 150 && (e.dataset.polls = String(o + 1), At = setTimeout(() => Mt(e, t), 4e3));
}
var Nt = null, Pt = n(), A = null, Ft = /* @__PURE__ */ new Map(), j = "main", It = [], Lt = [], Rt = {
	m4a: "audio/x-m4a",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	aac: "audio/aac",
	ogg: "audio/ogg",
	oga: "audio/ogg",
	opus: "audio/ogg",
	webm: "audio/webm",
	flac: "audio/flac"
}, zt = [
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
], Bt = (e, t) => T(e.type === "text/html" ? "globe" : e.type.startsWith("audio/") ? "mic" : "file", t), Vt = null, Ht = /* @__PURE__ */ new Map(), Ut = !1;
function Wt(e) {
	let t = (C || rt?.books || []).find((t) => t.id === e), n = t?.title || "";
	document.title = `${n || "vibebook"} · vibebook`;
	let r = Pe(t), i = (e) => r ? `<span class="${e} hasIcon"><img src="${r}" alt=""></span>` : n ? `<span class="${e}" style="background:${wn(n)}">${g(P(n))}</span>` : `<span class="${e}"></span>`, a = (e) => `<div class="thread"><span class="ri sk"></span><i style="width:${e}%"></i></div>`, o = (e, t) => `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${e}px"></i><i class="s" style="width:${t}%"></i></div></div>`;
	return `<div class="book skel ${kn ? "rail" : ""}" aria-busy="true" aria-label="${m("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${i("ri roomIco")}<span class="rt">${g(n)}</span></div>${a(70)}${a(55)}${a(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${m("Seus vibebooks")}">${T("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${i("ri roomIco phOnly")}<span>${g(n)}</span></span></h2></div>
      <div class="msgs">${o(90, 60)}${o(120, 45)}${o(70, 70)}${o(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${m("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${m("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function Gt(e) {
	j = Vt || new URLSearchParams(location.search).get("t") || "main", Vt = null, va = !1, A = null, Ft.clear(), Ut = !1, Lt = [], S("/api/me?ui=svelte").then((e) => {
		at(e), It = e.friends.map((e) => e.email), C = e.books, w = e.waits || [], O(), R(), A && On(N());
	}).catch(() => {});
	let t = Ht.get(e);
	t ? (A = t, !t.epics.some((e) => e.id === j) && !j.startsWith("pre:") && (j = "main"), pn()) : h.innerHTML = Wt(e);
	let n = ne({
		url: (t) => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${e}?t=${encodeURIComponent(F() ? "main" : j)}${t ? `&rc=${t}` : ""}`,
		onEvent: (t) => {
			Nt === n && nn(t, e);
		},
		onRemoved: () => {
			Nt === n && (Qt(), h.innerHTML = `<div class="home"><p>${m("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${T("back")} ${m("seus vibebooks")}</a></div>`);
		},
		onUnavailable: () => {
			Nt === n && (Qt(), h.innerHTML = `<div class="home"><p>${m("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${m("voltar")}</a></div>`);
		}
	});
	Nt = n, n.start();
}
var M = (e) => Nt?.send(e) ?? !1, Kt = /* @__PURE__ */ new Map(), qt = () => {}, Jt = null, Yt = /* @__PURE__ */ new WeakSet();
function Xt(e) {
	let t = Kt.get(e);
	t && (t.target._mo?.disconnect(), t.destroy(), Kt.delete(e));
}
function Zt(e, t, n, r = !1) {
	let i = Kt.get(e);
	i && (i.target !== t || r) && (Xt(e), i = null), i ? i.update(n) : (t.replaceChildren(), i = {
		...a(e, t, n),
		target: t
	}, Kt.set(e, i));
}
function Qt() {
	Jt = null, qt(), qt = () => {}, bn();
	for (let e of Kt.keys()) Xt(e);
	Ea.disconnect();
}
var $t = () => ({
	t: m,
	icon: T,
	avatar: y,
	ago: x,
	name: v,
	color: _,
	initials: P,
	mentions: me,
	locale: p
}), en = () => ({
	t: m,
	icon: T,
	name: v,
	avatar: y,
	agentAvatar: le,
	ago: x,
	hhmm: di,
	continues: fi,
	remHtml: Ri,
	issueHtml: Li,
	isNotice: zi,
	noticeHtml: Bi,
	mentions: me,
	md: Se,
	linkify: be,
	esc: g,
	quoteHtml: xi,
	attHtml: li,
	cardHtml: ki,
	choiceHtml: Pi,
	pollHtml: ui,
	threadCards: gi,
	typingLabel: (e) => rn[e] ?? e,
	typingNote: (e) => Ft.get(e),
	dateTime: (e) => new Date(e).toLocaleString(p),
	waiting: (e) => w.some((t) => t.book_id === A.id && t.ref === `m${e}`)
});
function tn(e) {
	j = e, Hr = e === "main" ? null : e, Q = !1, Ur(), R(), X(), B(), $();
}
function nn(e, t) {
	if (location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1] !== t) return;
	let n = A;
	if (e.t === "epicsPatch" && A) {
		let t = /* @__PURE__ */ new Set([...A.epics.map((e) => e.id), ...e.changed.map((e) => e.id)]);
		if (e.order.some((e) => !t.has(e))) {
			Nt?.resync();
			return;
		}
	}
	switch (Pt.get() !== A && Pt.replace(A), A = Pt.apply(e, t), A && Ht.set(t, A), e.t) {
		case "state": {
			let e = !n;
			Ft.clear(), Ut = !0, ga = !1;
			for (let e of [..._a]) e.startsWith(t) && _a.delete(e);
			for (let e of [...Fa]) e.startsWith(t) && Fa.delete(e);
			Ht.delete(t), Ht.set(t, A), Ht.size > 12 && Ht.delete(Ht.keys().next().value), A.messages.length && Ie(A.messages.at(-1).id), Fn(), e ? pn() : (R(), X(Z ? void 0 : "stay"), $(!0), Xr(), B(), ua(), Ui(), la(), Hi(), wa(), Er());
			return;
		}
		case "closed":
			X("stay");
			return;
		case "moved":
			A.messages.find((t) => t.id === e.id) && (X(!0), _i(), R());
			break;
		case "msg":
			Ie(e.m.id), e.m.thread !== "main" && j === "main" && _i(), e.m.thread === j && (Ta(e.m), vi(), e.m.files?.length && ba()), R(), e.m.reply_to && e.m.thread !== j && X("stay"), fn(e.m);
			return;
		case "delta":
			Ft.delete(e.id), X(Z ? void 0 : "stay");
			return;
		case "typing":
			e.note ? Ft.set(e.id, e.note) : Ft.delete(e.id), X("stay");
			return;
		case "epicsPatch":
		case "epics":
			j !== "main" && !F() && !A.epics.some((e) => e.id === j) && (j = "main"), R(), Xr(), B(), vi(), j === "main" && _i();
			return;
		case "docNotes":
			$();
			return;
		case "doc": {
			let t = (e.epic || null) === Ia();
			if (e.stale) {
				t ? M({
					t: "doc.get",
					epic: e.epic
				}) : Fa.delete(A.id + e.epic);
				return;
			}
			(t || e.fetched) && $();
			return;
		}
		case "meta":
			if (e.title) {
				let n = C?.find((e) => e.id === t);
				n && (n.title = e.title, O());
			}
			R(), Xr();
			return;
		case "suggestions": {
			let e = F() ? n?.suggestions[Number(j.slice(4))]?.title : void 0;
			if (Nn !== null) {
				let e = A.suggestions.length;
				j = e ? `pre:${Math.min(Nn, e - 1)}` : "main", Nn = null, X();
			} else if (F() && Mn()?.title !== e) {
				let t = A.suggestions.findIndex((t) => t.title === e);
				j = t >= 0 ? `pre:${t}` : "main", X();
			}
			R();
			return;
		}
		case "requests":
			R();
			return;
		case "members":
			R();
			return;
		case "files":
			ua(), Xi(), ri();
			return;
		case "fileAdd":
			ua(), Xi(), ri(), ba();
			return;
		case "reminders":
			la();
			return;
		case "decisions":
			Hi();
			return;
		case "conns":
			G = null, document.querySelector(".doc[data-pane=\"apps\"]") && !K ? q() : K || qi();
			return;
		case "pins":
			R(), ua(), Ui();
			return;
		case "error":
			z(g(e.error || m("falhou")));
			return;
		case "receipts":
			wa();
			return;
		case "older":
			if (ga = !1, e.more || (ha[A.id + e.thread] = !0), e.thread === j && (J.n += e.messages.length, X(!_a.delete(A.id + e.thread))), Di && e.thread === j) {
				let t = Di;
				A.messages.some((e) => e.id === t.id) ? (Di = null, setTimeout(() => Oi(t.id), 50)) : e.more && ++t.n < 15 ? xa() : (Di = null, z(m("Não achei essa mensagem nesta sala.")));
			}
			return;
		case "acks":
			wa(), R(), Er();
			return;
		case "ackRows":
			wa(), R(), Er();
			return;
		case "poll":
			X("stay");
			return;
		case "online":
			R();
			return;
		case "blocked": {
			let t = document.getElementById("input");
			t && !t.value && (t.value = e.text), alert(m("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: e.reason }));
			return;
		}
	}
}
var rn = {
	route: m("escolhendo o modelo"),
	fast: m("rápido"),
	smart: m("com calma")
}, an = {
	on: T("bell", 20),
	off: T("bellOff", 20)
}, on = () => "Notification" in window ? Notification.permission : "unsupported", sn = () => {
	try {
		return localStorage.getItem("vb.mute") === "1";
	} catch {
		return !1;
	}
};
function cn() {
	let e = on(), t = sn(), n = e === "granted" ? t ? "muted" : "on" : e, r = {
		on: m("Notificações ligadas: clique pra silenciar"),
		muted: m("Notificações silenciadas: clique pra ligar"),
		default: m("Ativar notificações de mensagem"),
		denied: m("Notificações bloqueadas no navegador"),
		unsupported: m("Este navegador não tem notificações")
	}[n];
	document.querySelectorAll("[data-bell]").forEach((e) => {
		e.className = `ghost bell ${n}`, e.innerHTML = n === "on" ? an.on : an.off, e.title = r, e.setAttribute("aria-label", r), e.onclick = async () => {
			if (un(), n === "default") {
				if (await Notification.requestPermission(), on() === "granted") {
					try {
						localStorage.removeItem("vb.mute");
					} catch {}
					dn();
				}
			} else if (n === "denied") alert(m("As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página."));
			else if (n === "on" || n === "muted") {
				try {
					localStorage.setItem("vb.mute", n === "on" ? "1" : "");
				} catch {}
				n === "muted" && dn();
			}
			cn();
		};
	});
}
var ln = null, un = () => {
	try {
		ln ??= new AudioContext(), ln.resume();
	} catch {}
};
document.addEventListener("pointerdown", un, { once: !0 });
function dn() {
	if (!ln) return;
	let e = ln.currentTime;
	[[880, 0], [1318.5, .12]].forEach(([t, n]) => {
		let r = ln.createOscillator(), i = ln.createGain();
		r.type = "sine", r.frequency.value = t, i.gain.setValueAtTime(0, e + n), i.gain.linearRampToValueAtTime(.18, e + n + .02), i.gain.exponentialRampToValueAtTime(.001, e + n + .5), r.connect(i).connect(ln.destination), r.start(e + n), r.stop(e + n + .55);
	});
}
function fn(e) {
	let t = e.kind === "agent" || e.author === "ai";
	if (e.author === A.me && !t || e.quiet || sn()) return;
	let n = e.text && [...e.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu)].some((e) => pe(e[1]) === A.me);
	if ((!t || e.author === A.me || n || e.for_who === A.me || A.messages.find((t) => t.id === e.reply_to)?.author === A.me) && (document.hidden || e.thread !== j || n) && (dn(), on() === "granted" && document.hidden)) {
		let t = e.author === "ai" ? "@vibe" : e.kind === "agent" ? m("{via} de {who}", {
			via: e.via || "agent",
			who: v(e.author)
		}) : v(e.author), r = new Notification(`${n ? `${m("Te mencionaram")} · ` : ""}${t} · ${A.book?.title ?? "vibebook"}`, {
			body: (e.text || (e.author === "ai" ? m("respondendo…") : `📎 ${m("anexo")}`)).slice(0, 180),
			tag: `vb-${A.id}`,
			icon: "/apple-touch-icon.png"
		});
		r.onclick = () => {
			window.focus(), r.close();
		};
	}
}
function pn() {
	Qt(), document.title = `${A.book?.title ?? "vibebook"} · vibebook`, h.innerHTML = `
  <div class="book ${kn ? "rail" : ""}">
    <aside class="side tw:[@media(max-width:900px)]:max-h-[calc(var(--vvh,100dvh)_-_max(96px,var(--vvh,100dvh)*.2))]!" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${m("Seus vibebooks")}" title="${m("Seus vibebooks")}">${T("back", 20)}</a><h2 id="threadTitle"></h2><button class="ghost" id="toggleBoard" title="${m("Quadro de tarefas (kanban)")}" aria-pressed="false">${T("board")}<span class="lbl">${m("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${m("Caixa de entrada: o que espera por você")}" aria-label="${m("Caixa de entrada")}">${T("inbox")}<b class="kN" hidden></b></button><button class="ghost bell" data-bell></button><button class="ghost" id="myClaude" aria-pressed="false" hidden>✻ <span class="lbl">Agent</span></button><button class="ghost" id="toggleDoc" title="${m("mostrar/ocultar documento")}">${T("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek" role="toolbar" aria-label="${m("Documento e arquivos da sala")}"><div class="peekRow"><button type="button" class="peekDoc" data-pane="doc" id="peekTxt" aria-label="${m("Abrir documento")}"></button><button type="button" data-pane="files" title="${m("Arquivos")}" aria-label="${m("Arquivos")}">${T("paperclip", 18)}<small id="peekFiles"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${T("chart", 18)}</button><button type="button" data-pane="decisions" title="${m("Decisões")}" aria-label="${m("Decisões")}">${T("check", 18)}</button><button type="button" data-pane="reminders" title="${m("Lembretes")}" aria-label="${m("Lembretes")}">${T("clock", 18)}<small id="peekRem"></small></button><button type="button" class="peekAgents" data-pane="agents" title="Agents" aria-label="Agents">${Oe}<i class="qDot"></i><small class="qN"></small></button></div><i class="grab"></i></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div class="agentNudge" id="agentNudge" hidden></div><div class="claudeBar" id="claudeBar" hidden></div><div class="askBar" id="askBar" hidden></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <form class="composer" id="composer">
        <div class="tray" id="tray"></div>
        <div class="replyBar" id="replyBar" hidden></div>
        <div class="mentionPop" id="mentionPop" role="listbox" aria-label="${m("Mencionar")}" hidden></div>
        <div class="row">
          <button type="button" class="ghost icon emojiBtn" id="emojiBtn" title="${m("Emoji")}" aria-label="${m("Emoji")}" aria-haspopup="dialog" aria-expanded="false">🙂</button>
          <div class="mentionPop emojiPop" id="emojiPop" role="dialog" aria-label="${m("Emoji")}" hidden><input type="search" id="emojiQ" placeholder="${m("Buscar emoji…")}" autocomplete="off"><div class="eGrid" id="emojiGrid"></div></div>
          <button type="button" class="ghost icon" id="plusBtn" title="${m("Anexar, mencionar, votação")}" aria-label="${m("Mais opções")}" aria-haspopup="menu" aria-expanded="false">${T("plus", 18)}</button>
          <div class="mentionPop plusMenu" id="plusMenu" role="menu" hidden>
            <button type="button" role="menuitem" id="attach">${T("paperclip")} ${m("Anexar arquivo")} <small>${m("ou Cmd+V")}</small></button>
            <button type="button" role="menuitem" id="mentionBtn">${T("at")} ${m("Mencionar alguém")} <small>@</small></button>
            <button type="button" role="menuitem" id="pollBtn">${T("chart")} ${m("Criar votação")}</button>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac" multiple hidden />
          <textarea id="input" rows="1" placeholder="${m("Mensagem…")}"></textarea><button class="primary" id="sendBtn">${m("Enviar")}</button>
        </div>
      </form>
    </main>
    <section class="doc">
      <button type="button" class="docEditBar" id="docEditBar"></button>
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${m("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${m("Redimensionar documento")}" tabindex="0"></div>
      <header><div class="ptabs" role="tablist"><button type="button" class="ptDoc" data-pane="doc">${T("doc", 16)} Doc</button><button type="button" class="ptBoard" data-pane="board" title="${m("Quadro de tarefas")}" aria-label="${m("Quadro de tarefas")}">${T("board", 17)}<b class="kN" hidden></b></button><button type="button" data-pane="files" title="${m("Arquivos")}" aria-label="${m("Arquivos")}">${T("paperclip", 17)}<small id="fileCount"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${T("chart", 17)}<small id="appCount"></small></button><button type="button" data-pane="decisions" title="${m("Decisões")}" aria-label="${m("Decisões")}">${T("check", 17)}<small id="decCount"></small></button><button type="button" data-pane="reminders" title="${m("Lembretes")}" aria-label="${m("Lembretes")}">${T("clock", 17)}<small id="remCount"></small></button><button type="button" class="ptAgents" data-pane="agents" title="Agents" aria-label="Agents">${Oe}<i class="qDot"></i><small class="qN"></small></button></div><div class="seg" role="group" aria-label="${m("Modo do documento")}"><button type="button" data-view="preview">${m("Ver")}</button><button type="button" data-view="edit">${m("Editar")}</button></div></header>
      <div class="docCrumb" id="docCrumb" hidden></div>
      <div class="preview" id="preview"></div>
      <textarea id="doc" placeholder="${m("O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.")}"></textarea>
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
    <h3>${m("Nova votação")}</h3>
    <form id="pollForm">
      <input name="q" required maxlength="300" placeholder="${m("Pergunta (ex.: Qual cruzeiro?)")}" />
      <div id="pollOpts" style="display:grid;gap:8px"></div>
      <button type="button" class="link" id="addOpt" style="justify-self:start">+ ${m("opção")}</button>
      <label style="display:flex;gap:8px;align-items:center;font-size:14px"><input type="checkbox" name="multi" /> ${m("cada pessoa pode escolher várias")}</label>
      <div class="acts"><button type="button" id="pollCancel">${m("Cancelar")}</button><button class="primary">${m("Criar votação")}</button></div>
    </form>
  </dialog>`;
	let e = h.querySelector(".book"), t = new ResizeObserver(() => {
		let t = e.querySelector(".chathead").getBoundingClientRect().height, n = document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
		document.documentElement.style.setProperty("--headH", `${Math.round(t)}px`), document.documentElement.style.setProperty("--peekH", `${Math.round(n)}px`);
	});
	t.observe(e.querySelector(".chathead")), t.observe(document.getElementById("docPeek")), Yr(document.getElementById("docPeek"), "doc", !0, (t) => {
		let n = t.target.closest("[data-pane]")?.dataset.pane || "doc";
		if (e.dataset.sheet === "doc" && e.dataset.pane === n) return H();
		e.classList.contains("boardview") && document.getElementById("toggleBoard").click(), he(n), qr("doc");
	}), Yr(document.getElementById("docGrab"), "doc", !1), document.getElementById("sheetDim").onclick = () => H(), document.getElementById("toggleDoc").onclick = () => e.classList.toggle("nodoc");
	let n = (t) => {
		document.body.contains(e) && (t && d(e, e.querySelector(":scope > .chat"), e.querySelector(":scope > .chat > #composer")), e.classList.toggle("boardview", t), e.classList.toggle("nodoc", t), document.getElementById("toggleBoard").setAttribute("aria-pressed", String(t)), t && (H(), B()));
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
	let a = document.getElementById("resizer");
	a.onpointerdown = (e) => {
		e.preventDefault(), a.setPointerCapture(e.pointerId), a.classList.add("drag"), document.body.classList.add("resizing"), a.onpointermove = (e) => r(window.innerWidth - e.clientX), a.onpointerup = () => {
			a.onpointermove = null, a.classList.remove("drag"), document.body.classList.remove("resizing");
		};
	}, a.ondblclick = () => r(380), a.onkeydown = (e) => {
		let t = document.querySelector(".doc").getBoundingClientRect().width;
		e.key === "ArrowLeft" ? r(t + 24) : e.key === "ArrowRight" && r(t - 24);
	};
	let o = document.getElementById("input");
	{
		let e = document.getElementById("emojiBtn"), t = document.getElementById("emojiPop"), n = document.getElementById("emojiQ"), r = document.getElementById("emojiGrid"), i = [...new Map(Object.entries(ve).map(([e, t]) => [t, e])).entries()], a = () => {
			let e = n.value.trim().toLowerCase().replace(/:/g, "");
			r.innerHTML = i.filter(([t, n]) => !e || Object.entries(ve).some(([n, r]) => r === t && n.includes(e))).map(([e, t]) => `<button type="button" title=":${g(t)}:" data-emoji="${e}">${e}</button>`).join("");
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
	let s = document.getElementById("mentionPop"), c = [], l = 0, u = -1, te = () => {
		s.hidden = !0, c = [], u = -1;
	}, ne = (e) => {
		let t = c[e];
		if (!t) return;
		let n = o.selectionStart;
		o.value = `${o.value.slice(0, u)}@${t.handle} ${o.value.slice(n)}`;
		let r = u + t.handle.length + 2;
		o.setSelectionRange(r, r), te(), o.focus(), o.oninput();
	}, re = () => {
		s.innerHTML = c.map((e, t) => `<button type="button" role="option" class="${t === l ? "sel" : ""}" data-i="${t}">${y(e.email)}<b>@${g(e.handle)}</b><small>${g(e.label)}</small></button>`).join(""), s.hidden = !c.length;
	};
	s.onmousedown = (e) => {
		let t = e.target.closest("[data-i]");
		t && (e.preventDefault(), ne(Number(t.dataset.i)));
	};
	let p = () => {
		let e = o.value.slice(0, o.selectionStart), t = e.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
		if (!t) return te();
		u = e.length - t[2].length - 1;
		let n = ue(t[2]), r = [...(A.members || []).filter((e) => e !== A.me).map((e) => ({
			email: e,
			handle: fe(e),
			label: v(e) === fe(e) ? e : v(e)
		}))];
		if (I.id === A.id) for (let e of I.sandboxes || []) e.email === A.me && r.push({
			email: e.email,
			handle: e.name,
			label: m("seu agent no sandbox")
		});
		c = r.filter((e) => !n || e.handle.startsWith(n) || ue(e.label).includes(n)).slice(0, 8), l = 0, re();
	};
	o.oninput = () => {
		o.style.height = "auto", o.style.height = `${o.scrollHeight}px`, p();
	}, o.onblur = () => setTimeout(te, 100), o.onkeydown = (e) => {
		if (!s.hidden && c.length) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") return e.preventDefault(), l = (l + (e.key === "ArrowDown" ? 1 : c.length - 1)) % c.length, re();
			if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) return e.preventDefault(), ne(l);
			if (e.key === "Escape") return e.preventDefault(), te();
		}
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), document.getElementById("composer").requestSubmit());
	};
	let ie = document.getElementById("tray"), ae = document.getElementById("sendBtn");
	ae.addEventListener("touchend", (e) => {
		ae.disabled || (e.preventDefault(), document.getElementById("composer").requestSubmit());
	}), ae.addEventListener("mousedown", (e) => e.preventDefault());
	let oe = () => {
		ie.innerHTML = Lt.map((e, t) => `<div class="pend ${!e.meta && !e.error ? "up" : ""} ${e.error ? "err" : ""}" title="${g(e.error || e.file.name)}">
      ${e.url ? `<img src="${e.url}" alt="">` : `${T("file", 22)}<br>${g(e.file.name.slice(0, 18))}`}${e.error ? `<span style="position:relative;z-index:1">${g(e.error)}</span>` : ""}
      <button type="button" class="rm" data-rm="${t}" aria-label="${m("Remover anexo")}">${T("x")}</button></div>`).join(""), ie.querySelectorAll("[data-rm]").forEach((e) => e.onclick = () => {
			let [t] = Lt.splice(Number(e.dataset.rm), 1);
			t?.url && URL.revokeObjectURL(t.url), oe();
		});
		let e = Lt.some((e) => !e.meta && !e.error);
		ae.disabled = e, ae.textContent = m(e ? "Enviando…" : "Enviar");
	}, _ = (e) => {
		for (let t of e) {
			!t.type && /\.html?$/i.test(t.name) && (t = new File([t], t.name, { type: "text/html" })), !t.type && /\.md$/i.test(t.name) && (t = new File([t], t.name, { type: "text/markdown" }));
			let e = {
				txt: "text/plain",
				csv: "text/csv"
			}[(/\.(\w+)$/.exec(t.name)?.[1] || "").toLowerCase()];
			e && t.type !== e && (t = new File([t], t.name, { type: e }));
			let n = Rt[(/\.(\w+)$/.exec(t.name)?.[1] || "").toLowerCase()];
			if (n && !t.type.startsWith("audio/") && (t = new File([t], t.name, { type: n })), !zt.includes(t.type)) {
				alert(`${t.name}: ${m("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}`);
				continue;
			}
			let r = t.type.startsWith("audio/");
			if (t.size > (r ? 50 : 10) * 1024 * 1024) {
				alert(`${t.name}: ${m(r ? "áudio maior que 50MB." : "maior que 10MB.")}`);
				continue;
			}
			t.name && t.name !== "image.png" || (t = new File([t], `print-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png`, { type: t.type }));
			let a = {
				file: t,
				url: t.type.startsWith("image/") ? URL.createObjectURL(t) : null
			};
			Lt.push(a), i(A.id).uploadFile({
				name: t.name,
				type: t.type,
				body: t
			}).then((e) => {
				a.meta = e;
			}).catch((e) => {
				a.error = e.message || m("sem conexão");
			}).finally(oe);
		}
		oe();
	}, se = document.getElementById("fileInput"), ce = document.getElementById("plusBtn"), b = document.getElementById("plusMenu"), le = (e = b.hidden) => {
		b.hidden = !e, ce.setAttribute("aria-expanded", String(e));
	};
	ce.onclick = (e) => {
		e.stopPropagation(), le();
	}, ce.onmousedown = ce.onpointerdown = (e) => {
		document.activeElement?.id === "input" && e.preventDefault();
	}, b.onclick = () => le(!1), b.closest("main").addEventListener("click", (e) => {
		!b.hidden && !b.contains(e.target) && le(!1);
	}), b.onkeydown = (e) => {
		e.key === "Escape" && (le(!1), ce.focus());
	}, document.getElementById("mentionBtn").onclick = () => {
		let e = o.selectionStart ?? o.value.length, t = o.value.slice(0, e), n = t && !/\s$/.test(t) ? " @" : "@";
		o.value = t + n + o.value.slice(e), o.focus(), o.setSelectionRange(e + n.length, e + n.length), setTimeout(() => o.oninput(), 120);
	}, document.getElementById("attach").onclick = () => se.click(), se.onchange = () => {
		_([...se.files]), se.value = "";
	}, document.onpaste = (e) => {
		let t = e.target, n = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName));
		if (!o.isConnected || n && t !== o) return;
		let r = [...e.clipboardData?.files ?? []];
		r.length || (r = [...e.clipboardData?.items ?? []].filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter(Boolean)), r.length && (e.preventDefault(), _(r), o.focus());
	};
	let x = h.querySelector(".chat");
	x.addEventListener("dragover", (e) => {
		[...e.dataTransfer.types].includes("Files") && (e.preventDefault(), x.classList.add("drop"));
	}), x.addEventListener("dragleave", (e) => {
		x.contains(e.relatedTarget) || x.classList.remove("drop");
	}), x.addEventListener("drop", (e) => {
		e.preventDefault(), x.classList.remove("drop"), _([...e.dataTransfer.files]);
	}), document.getElementById("composer").onsubmit = (e) => {
		if (e.preventDefault(), Lt.some((e) => !e.meta && !e.error)) return;
		let t = o.value.trim(), n = Lt.filter((e) => e.meta).map((e) => e.meta.id);
		(t || n.length) && (M({
			t: "msg",
			thread: j,
			text: t,
			files: n,
			reply_to: U?.id
		}), U = null, Si(), Lt.forEach((e) => e.url && URL.revokeObjectURL(e.url)), Lt = [], o.value = "", o.oninput(), oe());
	};
	let de = document.getElementById("pollDlg"), pe = document.getElementById("pollOpts"), me = (e = "") => {
		pe.insertAdjacentHTML("beforeend", `<input name="opt" maxlength="200" placeholder="${m("Opção {n}", { n: pe.children.length + 1 })}" value="${g(e)}" />`);
	};
	document.getElementById("pollBtn").onclick = () => {
		document.getElementById("pollForm").reset(), pe.innerHTML = "", me(), me(), me(), de.showModal();
	}, document.getElementById("addOpt").onclick = () => {
		pe.children.length < 10 && me(), pe.lastElementChild.focus();
	}, document.getElementById("pollCancel").onclick = () => de.close(), document.getElementById("pollForm").onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = [...t.querySelectorAll("[name=\"opt\"]")].map((e) => e.value.trim()).filter(Boolean);
		if (n.length < 2) return alert(m("Coloque pelo menos 2 opções."));
		M({
			t: "poll.create",
			thread: j,
			question: t.q.value,
			options: n,
			multi: t.multi.checked
		}), de.close();
	}, document.getElementById("msgs").addEventListener("click", (e) => {
		let t = e.target.closest("[data-vote]");
		if (t) return M({
			t: "vote",
			id: t.closest("[data-poll]").dataset.poll,
			opt: Number(t.dataset.vote)
		});
		let n = e.target.closest("[data-close]");
		n && confirm(m("Encerrar a votação?")) && M({
			t: "poll.close",
			id: n.dataset.close
		});
	});
	let he = (t) => {
		let n = e.querySelector(":scope > .doc");
		n && (n.dataset.pane = t, e.dataset.pane = t, n.querySelectorAll(":scope > header .ptabs button").forEach((e) => {
			e.classList.toggle("sel", e.dataset.pane === t), e.setAttribute("aria-selected", e.dataset.pane === t);
		}), t === "files" && (A.filesAll || M({ t: "files.get" }), ua()), t === "decisions" && Hi(), t === "apps" && Ui(), t === "reminders" && la(), t === "agents" && (Hn(), tr()), t === "board" && (d(e, n), B()));
	};
	qt = ee(e, V, () => {
		n(!1), he("board");
	}), h.querySelectorAll(".ptabs button").forEach((e) => e.onclick = () => he(e.dataset.pane)), document.removeEventListener("click", Yn), document.removeEventListener("vb:pane", Xn), Yn = (t) => {
		t.target.closest?.("[data-sbx-open]") && document.body.contains(e) && (H(), document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), V.matches && qr("doc"));
	}, Xn = (t) => {
		document.body.contains(e) && (e.classList.remove("nodoc"), he(t.detail));
	}, document.addEventListener("click", Yn), document.addEventListener("vb:pane", Xn), he("doc");
	let ge = document.getElementById("doc"), _e;
	ge.oninput = () => {
		clearTimeout(_e), _e = setTimeout(() => {
			let e = Ia();
			e ? A.docs[e] = ge.value : A.doc = ge.value, M({
				t: "doc",
				text: ge.value,
				epic: e || void 0
			});
		}, 400);
	}, ge.onblur = () => $();
	let ye = h.querySelector(".doc");
	function be(e) {
		let t = document.getElementById("docEditBar");
		t && (t.innerHTML = e === "edit" ? `${T("check", 16)} ${m("Pronto")}` : `${T("pencil", 16)} ${m("Editar")}`);
	}
	document.getElementById("docEditBar").onclick = () => xe(ye.dataset.view === "edit" ? "preview" : "edit");
	let xe = (e) => {
		ye.dataset.view = e, be(e), ye.querySelectorAll(".seg button").forEach((t) => t.classList.toggle("sel", t.dataset.view === e));
		try {
			localStorage.setItem("vb.docView", e);
		} catch {}
		e === "edit" ? (xn(), (gn || ge).focus()) : (xn(), $());
	};
	ye.querySelectorAll(".seg button").forEach((e) => e.onclick = () => xe(e.dataset.view));
	let Se = "preview";
	try {
		Se = localStorage.getItem("vb.docView") || "preview";
	} catch {}
	if (ye.dataset.view = Se, be(Se), ye.querySelectorAll(".seg button").forEach((e) => e.classList.toggle("sel", e.dataset.view === Se)), R(), X(), $(!0), ua(), Ui(), la(), Hi(), Mt(document.getElementById("agentNudge"), A.id), cn(), hn(), /^#m\d+$/.test(location.hash)) setTimeout(() => Oi(Number(location.hash.slice(2))), 300);
	else if (/^#f[0-9a-f]+$/.test(location.hash)) {
		let e = location.hash.slice(2);
		f.replaceState(null, "", location.pathname + location.search), setTimeout(() => mn(e), 300);
	}
}
function mn(e, t) {
	let n = (A.files || []).find((t) => t.id === e) || Y().flatMap((e) => e.files || []).find((t) => t.id === e);
	if (!n && !t && !A.filesAll) return M({ t: "files.get" }), setTimeout(() => mn(e, !0), 800);
	ti(`/api/books/${A.id}/files/${e}`, n?.type?.startsWith("image/") ? "img" : "frame", n?.name || m("arquivo"));
}
function hn() {
	let e = `vb.welcomed.${A.me}`;
	try {
		if (!A.book?.owner || A.me === A.book.owner || localStorage.getItem(e)) return;
		localStorage.setItem(e, "1");
	} catch {
		return;
	}
	let t = v(A.book.owner), n = [
		[
			T("hand", 24),
			m("Bem-vindo a <b>{room}</b>", { room: g(A.book.title || m("esta sala")) }),
			m("{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.", { owner: g(t) })
		],
		[
			"✻",
			m("Cada um traz o seu agent"),
			m("Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.")
		],
		[
			T("paperclip", 24),
			m("O contexto é de todo mundo"),
			m("Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.")
		],
		[
			T("arrowRight", 24),
			m("Conecte o seu agent"),
			""
		]
	], r = document.createElement("dialog");
	r.className = "welcome", document.body.appendChild(r);
	let i = 0, a = () => {
		r.close(), r.remove(), Mt(document.getElementById("agentNudge"), A.id);
	}, o = () => {
		let [e, t, s] = n[i], c = i === n.length - 1;
		r.innerHTML = `<div class="wIco">${e}</div><h3>${t}</h3>${s ? `<p>${s}</p>` : `<p>${m("Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.")}</p><div id="wConnect"></div>`}
      <div class="wFoot"><span class="wDots">${n.map((e, t) => `<i class="${t === i ? "on" : ""}"></i>`).join("")}</span>
        ${i ? `<button type="button" class="ghost" data-w="-1">${m("Voltar")}</button>` : `<button type="button" class="ghost" data-w="skip">${m("Pular")}</button>`}
        <button type="button" class="primary" data-w="1">${m(c ? "Entrar na sala" : "Próximo")}</button></div>`, r.querySelectorAll("[data-w]").forEach((e) => e.onclick = () => {
			let t = e.dataset.w;
			if (t === "skip" || t === "1" && c) return a();
			i += Number(t), o();
		}), c && Mt(r.querySelector("#wConnect"), A.id).then(() => {
			let e = r.querySelector("#wConnect");
			e && e.hidden && (e.hidden = !1, e.innerHTML = `<div class="setup done"><span class="setupIcon">${T("check", 22)}</span><div><b>${m("Seu agent já está conectado.")}</b><span>${m("Ligue ele nesta sala com ✻ Ligar agent, no topo.")}</span></div></div>`);
		}), r.querySelector(".wFoot .primary").focus();
	};
	r.addEventListener("cancel", (e) => {
		e.preventDefault(), a();
	}), o(), r.showModal();
}
var gn = null, _n = null, vn = null, yn = 0;
function bn() {
	++yn;
	let e = gn;
	gn = null, _n = null, e?.destroy();
}
function xn() {
	let e = h.querySelector(".doc"), t = document.getElementById("cm"), n = Ia(), r = e?.dataset.view === "edit" && A?.id && !F() ? n ? `${A.id}~${n}` : A.id : null;
	if (r === _n) return;
	bn(), _n = r, e?.classList.remove("collab"), t && (t.innerHTML = "");
	let i = yn;
	r && t && (vn ??= import(
		/* @vite-ignore */
		"/collab-svelte.js"
)).then((a) => {
		i === yn && (gn?.destroy(), t.innerHTML = "", gn = a.mountCollab(t, {
			room: r,
			name: v(A.me),
			color: _(A.me),
			onText: (e) => {
				i === yn && (n ? A.docs[n] = e : A.doc = e);
			},
			onStatus: (t) => {
				i === yn && (e.classList.toggle("collab", t === "connected"), t !== "connected" && $(!0));
			}
		}));
	}).catch(() => {
		vn = null;
	});
}
var Sn = T("sidebar", 20), N = () => A?.book?.title || "vibebook", Cn = [
	"oklch(0.5 0.17 248)",
	"oklch(0.58 0.17 35)",
	"oklch(0.52 0.11 175)",
	"oklch(0.47 0.15 315)",
	"oklch(0.6 0.13 75)",
	"oklch(0.45 0.1 145)",
	"oklch(0.36 0.06 255)",
	"oklch(0.55 0.16 10)"
], wn = (e) => Cn[[...String(e)].reduce((e, t) => e * 31 + t.charCodeAt(0) >>> 0, 7) % Cn.length], Tn = /* @__PURE__ */ new Set([
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
]), P = (e) => {
	let t = e.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/).filter(Boolean), n = t.filter((e) => !Tn.has(e.toLowerCase()));
	return ((n.length ? n : t).slice(0, 2).map((e) => e[0]).join("") || "◆").toUpperCase();
}, En = (e) => {
	let t = Pe(C?.find((e) => e.id === A?.id));
	return e ? t ? `<span class="${e} hasIcon"><img src="${t}" alt=""></span>` : `<span class="${e}" style="background:${wn(N())}">${g(P(N()))}</span>` : t ? `<img src="${t}" alt="">` : g(P(N()));
};
async function Dn(e, t) {
	let n = URL.createObjectURL(e);
	try {
		let e = await new Promise((e, t) => {
			let r = new Image();
			r.onload = () => e(r), r.onerror = () => t(Error(m("Não consegui ler essa imagem."))), r.src = n;
		}), r = document.createElement("canvas");
		r.width = r.height = t;
		let i = Math.min(t / e.naturalWidth, t / e.naturalHeight), a = e.naturalWidth * i, o = e.naturalHeight * i;
		return r.getContext("2d").drawImage(e, (t - a) / 2, (t - o) / 2, a, o), await new Promise((e) => r.toBlob(e, "image/png"));
	} finally {
		URL.revokeObjectURL(n);
	}
}
async function On(e) {
	let t = document.querySelector("link[rel=\"icon\"]");
	if (!e) {
		t.type = "image/svg+xml", t.href = "/favicon.svg";
		return;
	}
	let n = Pe(C?.find((e) => e.id === A?.id));
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
	i.fillStyle = wn(e), i.beginPath(), i.roundRect(0, 0, 64, 64, 14), i.fill();
	let a = i.createRadialGradient(56, 8, 0, 56, 8, 44);
	a.addColorStop(0, "rgba(255,255,255,.28)"), a.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = a, i.fill();
	let o = P(e);
	i.fillStyle = "#fff", i.textAlign = "center", i.textBaseline = "middle", i.font = `400 ${o.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`, i.fillText(o, 32, 35), t.type = "image/png", t.href = r.toDataURL("image/png");
}
var kn = !1;
function An() {
	kn = !kn;
	try {
		localStorage.setItem("vb.rail", kn ? "1" : "0");
	} catch {}
	h.querySelector(".book")?.classList.toggle("rail", kn), R();
}
function jn(e) {
	e.innerHTML = `
    <button class="iconBtn" id="railToggle" title="${m("Abrir menu")}" aria-label="${m("Abrir menu")}" aria-expanded="false">${Sn}</button>
    <a data-nav href="/app" class="iconBtn" title="${m("Seus vibebooks")}" aria-label="${m("Seus vibebooks")}" style="text-decoration:none">${T("back", 20)}</a>
    <div class="railSep"></div>
    <div class="railList">
      <button class="rb geral ${j === "main" ? "sel" : ""} ${Pe(C?.find((e) => e.id === A.id)) ? "hasIcon" : ""}" style="background:${wn(N())}" data-thread="main" title="${g(N())}" aria-label="${g(N())}">${En("")}</button>
      ${A.epics.filter((e) => !e.archived || e.id === j).map((e) => {
		let t = e.tasks.filter((e) => e.done).length, n = e.tasks.length ? 100 * t / e.tasks.length : 0;
		return `
        <button class="rb ${j === e.id ? "sel" : ""} ${Dr(e.id).length ? "waiting" : ""}" data-thread="${e.id}" title="${g(e.title)} · ${t}/${e.tasks.length}" aria-label="${g(e.title)}" style="background:${_(e.title)}">
          ${e.owner ? `<span class="rbOwner">${kr(e.owner)}</span>` : g(P(e.title))}${e.tasks.length ? `<span class="ring" style="--p:${n}%"></span>` : ""}</button>`;
	}).join("")}
      <button class="rb add" id="railAdd" title="${m("Novo épico")}" aria-label="${m("Novo épico")}">${T("plus", 18)}</button>
    </div>
    <div class="railPeople">${(A.requests || []).length ? `<button class="rb askBadge" id="railAsks" title="${m("{n} pedindo pra entrar", { n: A.requests.length })}" aria-label="${m("{n} pedindo pra entrar", { n: A.requests.length })}">+${A.requests.length}</button>` : ""}${A.members.slice(0, 8).map((e) => y(e, A.online.includes(e))).join("")}</div>`, e.querySelector("#railToggle").onclick = An, e.querySelector("#railAsks")?.addEventListener("click", An), e.querySelector("#railAdd").onclick = () => {
		An(), document.querySelector("#newEpic input")?.focus();
	}, e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		j = e.dataset.thread, Q = !1, Hr = j === "main" || F() ? null : j, R(), X(), B(), $();
	});
}
var F = () => j.startsWith("pre:"), Mn = () => F() ? A.suggestions[Number(j.slice(4))] : null, Nn = null;
function Pn(e) {
	let t = Mn();
	if (!t) return j = "main", X();
	e.innerHTML = `<div class="preCard">
    <p class="kicker">✦ ${m("O @vibe sugere um épico")}</p>
    <h3>${g(t.title)}</h3>
    <p class="${t.why ? "" : "muted"}">${g(t.why || m("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."))}</p>
    ${t.tasks.length ? `<h4>${m("Tarefas propostas")}</h4><ul>${t.tasks.map((e) => `<li>${g(e)}</li>`).join("")}</ul>` : ""}
    <div class="row"><button class="primary" id="preAccept">${m("Pedir pro meu agent")}</button><button class="ghost" id="preSkip">${m("Descartar")}</button></div>
    <p class="muted">${m("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")}</p>
  </div>`;
	let n = Number(j.slice(4));
	e.querySelector("#preAccept").onclick = () => {
		M({
			t: "suggestion",
			i: n,
			accept: !0
		}), j = "main", X();
	}, e.querySelector("#preSkip").onclick = () => {
		Nn = n, M({
			t: "suggestion",
			i: n
		});
	};
}
var I = {
	id: null,
	list: []
};
async function Fn() {
	if (!A?.id) return;
	let e = await S(`/api/books/${A.id}/agents`).catch(() => null);
	e && (I = {
		id: A.id,
		list: e.agents,
		claudeOn: e.claude_on,
		sandboxes: e.sandboxes || []
	}, Hn(), R());
}
var In = "http://127.0.0.1:47321", Ln = null, Rn = () => Ln && Date.now() - Ln.at < 2e4 ? Promise.resolve(Ln.rooms) : fetch(`${In}/ping`).then((e) => e.json()).then((e) => (Ln = {
	at: Date.now(),
	rooms: e.rooms
}).rooms).catch(() => (Ln = {
	at: Date.now(),
	rooms: null
}).rooms), zn = {}, Bn = (e, t) => {
	let n = zn[e];
	return n && Date.now() - n.at < 2e4 ? Promise.resolve(n.w) : fetch(`${In}/where?room=${e}&title=${encodeURIComponent(t || "")}`).then((e) => e.ok ? e.json() : null).catch(() => null).then((t) => (zn[e] = {
		at: Date.now(),
		w: t
	}).w);
}, Vn = {
	used: m("a pasta onde ele já abriu antes"),
	linked: m("ligada a esta sala pelo arquivo .vibebook"),
	slug: m("a pasta com o nome da sala"),
	new: m("pasta nova com o nome da sala, criada ao ligar")
};
function Hn() {
	let e = document.getElementById("myClaude");
	if (e && I.id !== A?.id) {
		let e = document.getElementById("claudeBar");
		e && (e.hidden = !0);
	}
	if (!e || I.id !== A?.id) return;
	let t = !!I.claudeOn, n = I.list.some((e) => e.email === A.me && e.listening);
	e.hidden = !1, e.setAttribute("aria-pressed", String(t));
	let r = zn[A.id]?.w, i = r?.folder ? r.folder.startsWith(r.home + "/") ? "~" + r.folder.slice(r.home.length) : r.folder : "";
	e.innerHTML = `✻ <span class="lbl">${m(t ? n ? "ouvindo" : "não ouvindo" : "Ligar agent")}</span>${i ? `<span class="where">${g(i.replace(/^~\/Projects\//, ""))}${r.how === "new" ? ` ${T("plus", 12)}` : ""}</span>` : ""}`, zn[A.id] || Bn(A.id, N()).then((e) => e && Hn()), e.title = (i ? `${m("Abre em {path} ({how}).", {
		path: i,
		how: Vn[r.how] || m("pasta da sala")
	})}\n\n` : "") + m(t && !n ? "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar." : t ? "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada)." : "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina."), mr(t, n || I.list.some((e) => e.email === A.me && Date.now() - e.seen_at < 18e5)), e.onclick = () => document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), Wn(t, n, i, r);
}
async function Un() {
	let e = !I.claudeOn;
	I.claudeOn = e, e && (lr[A.id] = Date.now()), Hn(), await S(`/api/books/${A.id}/claude`, { on: e }).catch(() => {
		I.claudeOn = !e, Hn();
	});
}
function Wn(e, t, n, r) {
	let i = document.getElementById("agentsPane");
	if (!i) return;
	let a = I.list.filter((e) => e.email === A.me), o = Qn(), s = t || a.some((e) => Date.now() - e.seen_at < 18e5);
	if (document.querySelectorAll(".peekAgents, .ptAgents").forEach((e) => {
		let t = o.find((e) => e.st === "blocked");
		e.dataset.q = t ? "blocked" : o.length ? "busy" : s ? "idle" : "", e.querySelector(".qN").textContent = o.length ? String(o.length) : "", e.title = t ? m("Seu agent espera você no terminal") : o.length ? m("Fila do seu agent: {n}", { n: o.length }) : s ? m("Seu agent está livre") : "Agents";
	}), document.getElementById("docPeek")?.classList.toggle("agLive", t), !document.querySelector(".doc[data-pane=\"agents\"]")) {
		i.innerHTML = "";
		return;
	}
	i.innerHTML = `<h4>${m("Seus agents nesta sala")}</h4>
    <div class="agCard${e ? " on" : ""}"><span class="agIcon">✻</span><div><b>${m("Claude Code no seu computador")}</b>
      <small>${e ? t ? m("ligado · ouvindo esta sala") : a.some((e) => Date.now() - e.seen_at < 18e5) ? m("ligado · trabalhando agora") : m("ligado · ainda não está ouvindo") : m("desligado")}${n ? ` · ${g(n.replace(/^~\/Projects\//, ""))}${r?.how === "new" ? ` (${m("pasta nova")})` : ""}` : ""}</small></div>
      <button type="button" class="ghost agGo" id="agGo" hidden title="${m("Ir pro seu agent desta sala no herdr")}" aria-label="${m("Ir pro seu agent no herdr")}">${T("external", 16)}</button>
      <label class="agSwitch"><input type="checkbox" id="agToggle" ${e ? "checked" : ""} /><i></i></label></div>
    <p class="agNote">${m("Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.")}</p>
    <div class="agConn"><b>${m("Conectar seu agente")}</b><small>${m("Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.")}</small><code>${g(fr())}</code><button type="button" class="primary" id="agConnCopy">${m("Copiar prompt")}</button></div>
    <h4>${m("Fila do seu agent")} <small>${o.length || ""}</small></h4>
    ${o.length ? `<div class="queue${Jn ? " open" : ""}">${o.map((e) => {
		let t = A.epics.find((t) => t.id === e.m.thread), n = t ? Ar(t) : En("ri"), r = e.st === "blocked" ? m("espera você no terminal") : e.st === "doing" ? m("fazendo") : m("na fila");
		return `<div class="qRow"><button type="button" class="qGo" data-goto="${e.m.id}" title="${g(t ? t.title : m("sala principal"))} · ${x(e.m.ts)}">${y(A.me)}${n}<span class="qTx">${g(e.m.text.replace(/\s+/g, " ").slice(0, 120))}</span><i class="qS ${e.st}" title="${r}"></i></button><button type="button" class="qX" data-dismiss="${e.m.id}" title="${m("Tirar da fila (já resolvido)")}" aria-label="${m("Tirar da fila (já resolvido)")}">${T("x")}</button></div>`;
	}).join("")}${o.length > 4 ? `<button type="button" class="qMore" id="qMore">${Jn ? m("mostrar menos") : m("mostrar mais {n}", { n: o.length - 4 })}</button>` : ""}</div>` : `<p class="agNote">${m("Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.")}</p>`}
    ${a.length ? `<h4>${m("Conectados")}</h4><div class="agList">${br(A.me)}</div>` : ""}
    <h4>${m("Na nuvem")}</h4><div id="sbx">${nr()}</div>`, document.getElementById("agToggle").onchange = Un, document.getElementById("agConnCopy").onclick = pr;
	let c = document.getElementById("agGo");
	e && Rn().then((e) => {
		c.isConnected && (c.hidden = !e?.includes(A.id));
	}), c.onclick = () => fetch(`${In}/focus?room=${A.id}`).then((e) => e.json()).then((e) => e.error && z(g(e.error))).catch(() => z(m("O vibebook herdr não está rodando nesta máquina."))), i.querySelectorAll("[data-goto]").forEach((e) => e.onclick = () => {
		V.matches && H(), Oi(Number(e.dataset.goto));
	}), i.querySelectorAll("[data-dismiss]").forEach((e) => e.onclick = () => M({
		t: "ack.dismiss",
		id: Number(e.dataset.dismiss)
	})), document.getElementById("qMore")?.addEventListener("click", () => {
		Jn = !Jn, Hn();
	}), rr();
}
var Gn = (e) => ((e.run_s || 0) / 3600 + (e.state === "running" && e.checked_at ? (Date.now() - e.checked_at) / 36e5 : 0)) * (e.rate || 0) + (Date.now() - e.created_at) / 36e5 * (e.disk_rate || 0), Kn = (e) => `US$${e < 10 ? e.toFixed(2) : Math.round(e)}`.replace(".", re === "en" ? "." : ",");
function qn() {
	return I.id !== A?.id || !I.sandboxes?.length ? "" : I.sandboxes.map((e) => `<button type="button" class="member sbxRow ${g(e.state || "")}" data-sbx-open title="${g(e.name)} · ${m("de {who}", { who: g(v(e.email)) })}">
    <span class="sbxIco">☁</span><span class="fnCol"><span class="fn">${g(e.name)}</span><small>${g(v(e.email).split(" ")[0])} · ${m(er[e.state] || e.state || "?")}</small></span><span class="money">${Kn(Gn(e))}</span></button>`).join("");
}
var Jn = !1, Yn = () => {}, Xn = () => {}, Zn = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || "");
function Qn() {
	let e = Date.now() - 1728e5, t = /* @__PURE__ */ new Map();
	for (let e of A.acks || []) e.email === A.me && (t.get(e.msg_id) ?? t.set(e.msg_id, []).get(e.msg_id)).push(e);
	let n = A.messages ? Y() : [];
	return n.filter((t) => t.author === A.me && !t.kind && t.text && t.ts > e && !n.some((e) => e.id === t.reply_to && Zn(e))).map((e) => {
		let n = t.get(e.id) || [];
		return {
			m: e,
			st: n.some((e) => e.status === "done" || e.status === "idle" || e.status === "dismissed") ? null : n.some((e) => e.status === "blocked") ? "blocked" : n.some((e) => e.status === "doing") ? "doing" : "queued"
		};
	}).filter((e) => e.st);
}
var L = {
	id: null,
	connected: null,
	list: [],
	busy: "",
	err: ""
}, $n = 0, er = {
	running: "rodando",
	starting: "ligando",
	pausing: "pausando",
	paused: "pausado",
	stopped: "parado",
	deleted: "apagado no freestyle",
	unknown: "?"
};
async function tr() {
	if (!A?.id) return;
	clearTimeout($n);
	let e = await fetch(`/api/books/${A.id}/sandboxes`).then((e) => e.json()).catch(() => null);
	if (!e || e.error) return;
	L = {
		...L,
		id: A.id,
		connected: e.connected,
		claude: e.claude,
		list: e.sandboxes
	};
	let t = document.getElementById("sbx");
	t && (t.innerHTML = nr(), rr()), e.sandboxes.some((e) => !e.ready || e.state !== "running" && /ing$/.test(e.state)) && document.querySelector(".doc[data-pane=\"agents\"]") && ($n = setTimeout(tr, 5e3));
}
function nr() {
	if (L.id !== A?.id || L.connected === null) return `<p class="agNote">${m("carregando…")}</p>`;
	let e = L.err ? `<p class="agErr">${g(L.err)}</p>` : "";
	return L.connected ? `${L.claude ? `<div class="fsOn">${T("check", 13)} ${m("Claude conectado: sandboxes novos já sobem logados")} · <button type="button" class="ghost" id="ctOff">${m("remover")}</button></div>` : `<div class="agCard col"><b>${m("Conecte sua conta do Claude")}</b><small>${m("No seu terminal, rode:")}</small><div class="cpCmd"><code>claude setup-token</code><button type="button" class="ghost" data-cp="claude setup-token">${m("Copiar")}</button></div><small>${m("Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.")}</small>
      <form id="ctForm" class="fsForm"><input type="password" name="token" autocomplete="off" placeholder="sk-ant-…" required /><button class="primary" ${L.busy ? "disabled" : ""}>${L.busy === "ct" ? m("Salvando…") : m("Salvar")}</button></form>${L.errAt === "ct" && L.err ? `<p class="agErr">${g(L.err)}</p>` : ""}</div>`}${L.list.map((e) => `<div class="sbxCard ${e.state}"><div class="sbxTop"><span class="agIcon">☁</span><div><b>${g(e.name)}</b>
      <small>${!e.ready && e.state === "running" ? m("preparando (uns 3 min)…") : m(er[e.state] || e.state)}${e.rate ? ` · ${Kn(e.rate)}/h` : ""}${e.error ? ` · ${g(e.error)}` : ""}</small>${L.logs?.[e.id] ? `<pre class="sbxLog">${g(L.logs[e.id])}</pre>` : !e.ready && e.log ? `<code class="sbxLog">${g(e.log)}</code>` : ""}</div><span class="money" title="${m("gasto até agora na sua conta do freestyle")}">${Kn(e.cost || 0)}</span></div>
      <div class="sbxActs">${e.state === "deleted" ? "" : `<button class="primary" data-sbx-term="${g(e.id)}">${m("Terminal")}</button>`}
      ${e.state === "running" ? `<button class="ghost" data-sbx-act="pause" data-id="${g(e.id)}">${m("Pausar")}</button>` : e.state === "paused" || e.state === "stopped" ? `<button class="ghost" data-sbx-act="start" data-id="${g(e.id)}">${m("Retomar")}</button>` : ""}
      ${!e.ready && e.state === "running" ? `<button class="ghost" data-sbx-setup="${g(e.id)}" title="${m("Rodar o setup de novo")}" ${L.busy ? "disabled" : ""}>${L.busy === "setup:" + e.id ? m("Rodando setup… (até 4 min)") : m("Refazer setup")}</button>` : ""}
      <button class="ghost del" data-sbx-del="${g(e.id)}" aria-label="${m("Apagar sandbox")}" title="${m("Apagar sandbox")}">${T("trash", 16)}</button></div></div>`).join("")}
    <button class="agNew on" id="sbxNew" ${L.busy ? "disabled" : ""}>${T("plus", 16)} ${L.busy === "new" ? m("Criando…") : m("Criar sandbox")}<small>${m("Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.")}</small></button>${L.errAt === "ct" ? "" : e}
    <div class="fsOn">${T("check", 13)} ${m("freestyle.sh conectado")} · <button type="button" class="ghost" id="fsOff">${m("desconectar")}</button></div>` : `<div class="agCard col"><b>${m("Conecte sua conta do freestyle.sh")}</b>
    <small>${m("O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:")}</small><div class="cpCmd"><code>npx freestyle@latest tokens create vibebook</code><button type="button" class="ghost" data-cp="npx freestyle@latest tokens create vibebook">${m("Copiar")}</button></div><small>${m("Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.")}</small>
    <form id="fsForm" class="fsForm"><input type="password" name="key" autocomplete="off" placeholder="${m("API key do freestyle")}" required /><button class="primary" ${L.busy ? "disabled" : ""}>${L.busy === "key" ? m("Conferindo…") : m("Conectar")}</button></form>${e}</div>`;
}
function rr() {
	let e = () => {
		let e = document.getElementById("sbx");
		e && (e.innerHTML = nr(), rr());
	}, t = async (t, n) => {
		L.busy = t, L.errAt = t, L.err = "", e();
		try {
			let e = await n();
			e?.error && (L.err = e.error);
		} catch {
			L.err = m("sem conexão");
		}
		L.busy = "", await tr(), e();
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
	}), document.getElementById("ctOff")?.addEventListener("click", () => confirm(m("Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.")) && t("ct", () => n("DELETE", "/api/claude-token"))), document.getElementById("fsOff")?.addEventListener("click", () => confirm(m("Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.")) && t("off", () => n("DELETE", "/api/freestyle"))), document.getElementById("sbxNew")?.addEventListener("click", () => t("new", () => n("POST", `/api/books/${A.id}/sandboxes`, {}))), document.querySelectorAll("[data-sbx-setup]").forEach((e) => e.onclick = () => t(`setup:${e.dataset.sbxSetup}`, async () => {
		let t = await n("POST", `/api/sandboxes/${e.dataset.sbxSetup}/setup`);
		return L.logs = {
			...L.logs,
			[e.dataset.sbxSetup]: t.log || t.error || ""
		}, t;
	})), document.querySelectorAll("[data-sbx-act]").forEach((e) => e.onclick = () => t("act", () => n("POST", `/api/sandboxes/${e.dataset.id}/${e.dataset.sbxAct}`))), document.querySelectorAll("[data-sbx-del]").forEach((e) => e.onclick = () => confirm(m("Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.")) && t("del", () => n("DELETE", `/api/sandboxes/${e.dataset.sbxDel}`))), document.querySelectorAll("[data-sbx-term]").forEach((e) => e.onclick = () => cr(e.dataset.sbxTerm, L.list.find((t) => t.id === e.dataset.sbxTerm)?.name));
}
var ir = "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0", ar = "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js", or = {
	Esc: "\x1B",
	Tab: "	",
	"Ctrl-C": "",
	"↑": "\x1B[A",
	"↓": "\x1B[B",
	"←": "\x1B[D",
	"→": "\x1B[C",
	"/": "/"
}, sr = (e) => new Promise((t, n) => {
	let r = Object.assign(document.createElement("script"), {
		src: e,
		onload: t,
		onerror: n
	});
	document.head.append(r);
});
async function cr(e, t) {
	window.Terminal || (document.head.append(Object.assign(document.createElement("link"), {
		rel: "stylesheet",
		href: `${ir}/css/xterm.css`
	})), await sr(`${ir}/lib/xterm.js`), await sr(ar));
	let n = document.createElement("dialog");
	n.className = "termDlg", n.innerHTML = `<header><b>☁ ${g(t || "sandbox")}</b><span id="termSt">${m("conectando…")}</span><button class="ghost" data-close aria-label="${m("Fechar")}">${T("x")}</button></header><div class="termBox" id="termBox"></div>
    <div class="termKeys">${Object.keys(or).map((e) => `<button type="button" data-k="${g(e)}">${g(e)}</button>`).join("")}</div>`, document.body.append(n), n.showModal();
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
	let l = await fetch(`/api/sandboxes/${e}/terminal`, { method: "POST" }).then((e) => e.json()).catch(() => ({ error: m("sem conexão") }));
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
			t.type === "sessionInfo" ? a.textContent = m("conectado") : t.type === "exited" ? a.textContent = m("terminou") : t.type === "error" && (a.textContent = t.message);
		} catch {}
	}, o.onclose = () => {
		s || (a.textContent = m("desconectado: feche e abra de novo"));
	}, r.onData((e) => o.readyState === 1 && o.send(d.encode(e))), new ResizeObserver(() => {
		i.fit(), o.readyState === 1 && o.send(JSON.stringify({
			type: "resize",
			cols: r.cols,
			rows: r.rows
		}));
	}).observe(n.querySelector("#termBox")), n.querySelectorAll("[data-k]").forEach((e) => e.onclick = () => {
		o.readyState === 1 && o.send(d.encode(or[e.dataset.k])), r.focus();
	}), r.focus();
}
var lr = {}, ur = 0, dr = {}, fr = () => `Read ${location.origin}/llms.txt and set up vibebook for this project. Room: ${location.origin}/b/${A.id}`;
function pr() {
	let e = fr();
	(navigator.clipboard?.writeText(e) ?? Promise.reject()).then(() => z(m("Copiado. Cole no Claude Code, dentro da pasta do projeto.")), () => window.prompt(m("Copie e cole no seu Claude Code:"), e));
}
function mr(e, t) {
	let n = document.getElementById("claudeBar");
	if (!n) return;
	clearTimeout(ur);
	let r = document.getElementById("agentNudge"), i = "vb.claudeBar.off", a = !1;
	try {
		a = localStorage.getItem(i) === "off";
	} catch {}
	let o = `<button class="ghost" data-x aria-label="${m("Fechar")}" title="${m("Fechar")}">×</button>`, s = (e, t) => {
		n.className = `claudeBar ${e}`, n.innerHTML = t, n.hidden = !1;
		let r = n.querySelector("[data-x]");
		r && (r.onclick = () => {
			try {
				localStorage.setItem(i, "off");
			} catch {}
			n.hidden = !0, clearTimeout(ur);
		});
	}, c = !1;
	try {
		c = localStorage.getItem(`vb.start.${A.id}`) === "off";
	} catch {}
	if (A.book?.owner === A.me && !A.epics.length && j === "main" && !c) return hr(n, e, t, `vb.start.${A.id}`);
	if (jt || r && !r.hidden || t && !dr[A.id] || a && !lr[A.id]) n.hidden = !0;
	else if (t) dr[A.id] = !1, s("ok", `<span class="star">✻</span><span><b>${m("Seu agent está ouvindo esta sala.")}</b></span>`), setTimeout(() => n.hidden = !0, 5e3);
	else if (e) {
		dr[A.id] = !0;
		let e = Date.now() - (lr[A.id] || 0) > 18e4;
		s("wait", `<span class="star">✻</span><span><b>${m(e ? "Seu agent ainda não está ouvindo." : "Abrindo seu agent no seu computador…")}</b><small>${m(e ? "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá." : "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.")}</small></span>${o}`), e || (ur = setTimeout(Hn, 18e4 - (Date.now() - (lr[A.id] || 0)) + 500));
	} else dr[A.id] = !1, s("", `<span class="star">✻</span><span><b>${m("Seu agent não está nesta sala.")}</b><small>${m("Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.")}</small></span><button class="primary" data-conn>${m("Conectar seu agente")}</button><button class="ghost" data-on>${m("Ligar agent")}</button>${o}`), n.querySelector("[data-on]").onclick = () => document.getElementById("myClaude")?.click(), n.querySelector("[data-conn]").onclick = pr;
}
function hr(e, t, n, r) {
	let i = (A.members || []).filter((e) => e !== A.me), a = (e, t) => `<li class="${e}"><i>${e === "ok" ? "✓" : e === "wait" ? "✻" : "○"}</i><span>${t}</span></li>`, o = jt ? a("todo", m("Conecte seu agent (o card acima diz como)")) : n ? a("ok", m("Seu agent está aqui")) : t ? a("wait", m("Abrindo seu agent no seu computador…")) : a("todo", `${m("Seu agent está desligado nesta sala")} <button class="linkish" data-on>${m("Ligar")}</button>`);
	e.className = "claudeBar start", e.hidden = !1, e.innerHTML = `<span class="star">✻</span><span><b>${m("Começando a sala")}</b><ul>
    ${a("ok", m("Sala criada"))}
    ${i.length ? a("ok", m("Na sala: {who}", { who: g(i.map(v).join(", ")) })) : a("todo", m("Só você aqui: convide em Pessoas"))}
    ${o}
    ${a(n ? "wait" : "todo", m("O agent escreve o doc e cria os épicos"))}
  </ul></span><button class="ghost" data-x aria-label="${m("Fechar")}" title="${m("Fechar")}">×</button>`, e.querySelector("[data-on]")?.addEventListener("click", () => document.getElementById("myClaude")?.click()), e.querySelector("[data-x]").onclick = () => {
		try {
			localStorage.setItem(r, "off");
		} catch {}
		e.hidden = !0, clearTimeout(ur);
	};
}
var gr = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`, _r = (e) => Math.min(100, Math.round(e.tokens / e.window * 100)), vr = (e) => {
	let t = _r(e), n = (e, t = 60, n = 80) => `<i class="ctx ${e >= n ? "hot" : e >= t ? "mid" : ""}" style="--p:${e}%"></i>`, r = (e, t, r) => `<div><div class="l"><b>${e}</b><span>${r}</span></div>${n(t)}</div>`, i = ["five_hour", "seven_day"].map((t) => {
		let n = e.limits?.[t];
		if (!n || n.r * 1e3 < Date.now()) return "";
		let i = /* @__PURE__ */ new Date(n.r * 1e3), a = i.toLocaleTimeString(p, {
			hour: "2-digit",
			minute: "2-digit"
		}), o = t === "five_hour" ? a : `${i.toLocaleDateString(p, { weekday: "short" }).replace(".", "")} ${a}`;
		return r(m(t === "five_hour" ? "Sessão de 5h" : "Semana"), n.p, m("{p}% · reseta {at}", {
			p: n.p,
			at: o
		}));
	});
	return `<div class="ctip">${r(m("Contexto"), t, `${t}% · ${gr(e.tokens)}/${gr(e.window)}`)}${i.join("")}</div>`;
}, yr = (e) => {
	if (!e) return "";
	let t = _r(e);
	return `<i class="ctx ${t >= 80 ? "hot" : t >= 60 ? "mid" : ""}" style="--p:${t}%"></i>`;
}, br = (e) => {
	if (I.id !== A?.id) return "";
	let t = /* @__PURE__ */ new Set();
	return I.list.filter((t) => t.email === e).sort((e, t) => t.listening - e.listening).filter((e) => !t.has(Ca(e.who) + e.repo) && t.add(Ca(e.who) + e.repo)).slice(0, 3).map((t) => `<div class="member agentRow" title="${m("{via} de {who}", {
		via: g(Ca(t.who)),
		who: g(v(e))
	})}${t.repo ? ` ${m("em {repo}", { repo: g(t.repo) })}` : ""} · ${t.listening ? t.all_rooms ? m("ouvindo todas as salas agora") : m("ouvindo esta sala agora") : m("visto há {ago}", { ago: x(t.seen_at) })}"><span class="aglyph ${b(t.who)[0]} ${t.listening ? "on" : ""}">${b(t.who)[1]}</span><span class="fn">${g(Ca(t.who).replace(/^Claude\s+/i, ""))}${t.repo ? ` · ${g(t.repo)}` : ""}</span><small>${t.listening ? m("ouvindo") : x(t.seen_at)}${t.context ? ` · ${_r(t.context)}%` : ""}</small>${yr(t.context)}${t.context ? vr(t.context) : ""}</div>`).join("");
}, xr = (e) => {
	if (!e || e.archived > 0) return null;
	let t = new Set((A.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg)), n = new Set(Y().filter((n) => n.thread === e.id && !t.has(n.id)).map((e) => e.id));
	n.add(e.from_msg);
	let r = (A.acks || []).filter((e) => n.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts), i = r.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5);
	if (i) return {
		who: i.who,
		email: i.email
	};
	if (r[0]?.status === "done") return null;
	let a = A.messages.findLast((t) => t.thread === e.id && t.kind === "agent");
	return a && a.tag !== "done" && Date.now() - a.ts < 18e4 ? {
		who: a.via || "Agent",
		email: a.author
	} : null;
}, Sr = () => {
	let e = new Set(Y().filter((e) => e.thread === "main").map((e) => e.id)), t = new Set((A.epics || []).map((e) => e.from_msg)), n = (A.acks || []).filter((n) => e.has(n.msg_id) && !t.has(n.msg_id) && n.status !== "dismissed").sort((e, t) => t.ts - e.ts), r = n.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5 && n.find((t) => t.msg_id === e.msg_id && t.who === e.who) === e);
	return r ? {
		who: r.who,
		email: r.email
	} : null;
}, Cr = (e) => {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let i = `${r.who}|${r.email}`;
		r.status === "doing" && Date.now() - r.ts < 12e5 && !t.has(i) && e.find((e) => e.msg_id === r.msg_id && e.who === r.who && e.email === r.email) === r && (t.add(i), n.push({
			who: r.who,
			email: r.email
		}));
	}
	return n;
}, wr = () => {
	if (F()) return [];
	let e = j === "main" ? null : A.epics.find((e) => e.id === j), t;
	if (e) {
		if (e.archived > 0) return [];
		let n = new Set((A.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg));
		t = new Set(Y().filter((t) => t.thread === e.id && !n.has(t.id)).map((e) => e.id)), t.add(e.from_msg);
	} else {
		let e = new Set((A.epics || []).map((e) => e.from_msg));
		t = new Set(Y().filter((t) => t.thread === "main" && !e.has(t.id)).map((e) => e.id));
	}
	let n = Cr((A.acks || []).filter((e) => t.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts));
	if (n.length) return n;
	let r = e ? xr(e) : Sr();
	return r ? [r] : [];
}, Tr = (e) => {
	let t = xr(e);
	return t ? m("{via} de {who}", {
		via: t.who,
		who: v(t.email)
	}) : null;
};
function Er() {
	let e = document.getElementById("msgs");
	if (!e || !A) return;
	e.querySelector("#working")?.remove();
	let t = wr();
	if (e.querySelector(".empty")?.classList.toggle("hidden", !!t.length), !t.length) return;
	let n = (e) => `<b>${m("{via} de {who}", {
		via: g(e.who),
		who: g(v(e.email))
	})}</b>`;
	e.insertAdjacentHTML("beforeend", `<div id="working" class="working"><span class="wAv">${t.slice(0, 4).map((e) => le(e.email, e.who)).join("")}</span><div>${t.length === 1 ? `${n(t[0])} ${m("está trabalhando nisso")}` : `${t.map(n).join(", ")} ${m("estão trabalhando nisso")}`}<small>${m("O andamento e a entrega aparecem aqui nesta thread.")}</small></div><span class="spin">✻</span></div>`);
}
var Dr = (e) => w.filter((t) => t.book_id === A?.id && (e === void 0 || t.thread === e)), Or = (e) => {
	let t = Dr(e), n = t.length;
	return n ? `<b class="wN${we(t)}" title="${n === 1 ? m("Alguém está esperando você aqui") : m("{n} coisas esperando você aqui", { n })}">${n}</b>` : "";
}, kr = (e) => {
	let t = A?.avatars?.[e] ?? ce[e];
	return t ? `<img src="/api/avatar/${encodeURIComponent(e)}?v=${t}" alt="" loading="lazy" />` : g(v(e).slice(0, 2).toUpperCase());
}, Ar = (e, t) => e.owner ? `<span class="ri epOwner" style="background:${_(e.owner)}" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" ` : ""}title="${g(m("Dono: {who}", { who: v(e.owner) }))}${t ? ` · ${m("clique pra trocar")}` : ""}">${kr(e.owner)}</span>` : `<span class="ri" style="background:${_(e.title)};color:#fff" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" title="${m("Sem dono · clique pra escolher")}"` : ""}>${g(P(e.title))}</span>`, jr = (e) => {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}, Mr = !1;
function Nr() {
	let e = A.pins || [];
	return `<div class="sec pinsSec"><h4>${m("Fixados")}${Mr ? "" : `<button type="button" class="ghost pinPlus" id="pinPlus" title="${m("Fixar um link")}" aria-label="${m("Fixar um link")}">${T("plus", 14)}</button>`}</h4>
      ${e.map((e) => {
		let t, n = "", r = e.title, i = "", a;
		if (e.kind === "link") t = e.ref, n = "target=\"_blank\" rel=\"noopener\"", i = jr(e.ref), r ||= i, a = `<span class="ri pinIco" style="background:${_(i)}">${g(i[0]?.toUpperCase() || "↗")}</span>`;
		else if (e.kind === "app") {
			let o = e.ref.includes("/") ? `#app:${e.ref}` : `#app:room/${e.ref}`;
			t = g(o), n = `data-cardgo="${g(o)}"`, r ||= e.ref.split("/").pop(), i = e.ref.includes("/") ? "app" : m("app da sala"), a = `<span class="ri pinIco app">${T("grid", 14)}</span>`;
		} else {
			let o = (A.files || []).find((t) => t.id === e.ref);
			if (!o) return "";
			t = Zr(o), n = `target="_blank" rel="noopener" ${Qr(o)}`, r ||= o.name, i = m("arquivo"), a = `<span class="ri pinIco app">${T("file", 14)}</span>`;
		}
		return `<div class="pinRow"><a class="thread pin" href="${g(t)}" ${n} title="${g(r)}${e.kind === "link" ? ` · ${g(e.ref)}` : ""}">${a}<span class="rt">${g(r)}<small>${g(i)}</small></span></a><button type="button" class="ghost x" data-unpin="${g(e.id)}" title="${m("Desafixar")}" aria-label="${m("Desafixar {name}", { name: g(r) })}">${T("x", 14)}</button></div>`;
	}).join("")}
      ${Mr ? `<form id="pinForm" class="pinForm"><input name="url" required placeholder="${m("Cole um link (site, repo, painel…)")}" aria-label="${m("Link pra fixar")}" enterkeyhint="done" /><input name="title" maxlength="80" placeholder="${m("Nome (opcional)")}" aria-label="${m("Nome")}" /><div class="row"><button type="button" class="ghost" id="pinCancel">${m("Cancelar")}</button><button class="primary">${m("Fixar")}</button></div></form>` : e.length ? "" : `<button type="button" class="pinEmpty" id="pinEmpty">${T("pin", 14)}<span>${m("Fixar site, repo ou app")}</span></button>`}
    </div>`;
}
function Pr(e) {
	let t = () => {
		Mr = !0, R(), document.querySelector("#pinForm [name=url]")?.focus();
	}, n = e.querySelector("#pinPlus");
	n && (n.onclick = t);
	let r = e.querySelector("#pinEmpty");
	r && (r.onclick = t);
	let i = e.querySelector("#pinCancel");
	i && (i.onclick = () => {
		Mr = !1, R();
	});
	let a = e.querySelector("#pinForm");
	a && (a.onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = t.elements.namedItem("url").value.trim();
		n && (M({
			t: "pin.add",
			kind: "link",
			ref: n,
			title: t.elements.namedItem("title").value.trim()
		}), Mr = !1, R());
	}), e.querySelectorAll("[data-unpin]").forEach((e) => e.onclick = () => M({
		t: "pin.del",
		id: e.dataset.unpin
	}));
}
function Fr() {
	let e = document.getElementById("askBar");
	if (!e) return;
	let t = Dr().find((e) => /^a\d/.test(e.ref) && e.thread !== j);
	if (e.hidden = !t, !t) return;
	let n = (t.text || "").replace(/^(⏸|❓)\s*Seu Claude\s*/, "").replace(/[*`]/g, "").slice(0, 160);
	e.innerHTML = `<span>⏸ <b>${m("Seu agent espera você")}</b> ${m("em {where}", { where: g(t.topic || m("sala principal")) })}: ${g(n)}</span><button type="button" class="primary" data-askgo="${t.ref.slice(1)}">${m("Ver")}</button>`, e.querySelector("[data-askgo]").onclick = (e) => Oi(Number(e.currentTarget.dataset.askgo));
}
function R() {
	Dt(), Fr();
	let t = document.getElementById("side");
	if (!t || !A) return;
	if (Hn(), Jt = e(Jt, A, j, zr), kn && window.innerWidth > 900) return Xt("sidebar"), jn(t);
	let n = A.id;
	Zt("sidebar", t, {
		room: A,
		thread: j,
		navigation: Jt,
		send: (e) => A?.id === n && M(e),
		onopen: (e) => {
			A?.id === n && (H(!0), j = e, Q = !1, Hr = j === "main" || F() ? null : j, R(), X(), B(), $());
		},
		onarchchange: (e) => {
			A?.id === n && (zr = e);
		},
		foldOpen: Br,
		friends: It,
		vb: {
			t: m,
			icon: T,
			avatar: y,
			ago: x,
			name: v,
			bookTitle: N,
			roomMark: En,
			roomStrip: Vr,
			pinsSec: Nr,
			sbxRows: qn,
			agentRows: br,
			epicBusy: Tr,
			waitPill: Or,
			waitsIn: Dr
		}
	}), t.querySelector("#railToggle").onclick = An, t.querySelectorAll("details.memMore > summary").forEach((e) => e.onclick = () => Br[e.parentElement.dataset.fold] = !e.parentElement.open), Pr(t);
	let r = t.querySelector(".sheetGrab");
	r && !Yt.has(r) && (Yr(r, "side", !1), Yt.add(r));
	let i = t.querySelector("#sideRooms");
	i && (i.onclick = $e);
	let a = t.querySelector("#sideRename");
	a && (a.onclick = (e) => {
		e.stopPropagation(), Wr();
	});
	let o = t.querySelector("#sideArch");
	o && (o.onclick = () => {
		H(), document.getElementById("epicArch")?.click();
	});
	let s = t.querySelector("#sideDel");
	s && (s.onclick = () => {
		H(), document.getElementById("epicDel")?.click();
	}), t.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		H(!0), j = e.dataset.thread, Q = !1, Hr = j === "main" || F() ? null : j, R(), X(), B(), $();
	}), t.querySelectorAll("[data-remove]").forEach((e) => e.onclick = async () => {
		let t = e.dataset.remove;
		if (!confirm((A.pending || []).includes(t) ? m("Cancelar o convite de {email}?", { email: t }) : m("Remover {email} deste vibebook?", { email: t }))) return;
		let n = await fetch(`/api/books/${A.id}/members/${encodeURIComponent(t)}`, { method: "DELETE" });
		n.ok || alert((await n.json().catch(() => ({}))).error || m("Não deu para remover."));
	}), t.querySelectorAll("[data-ask]").forEach((e) => e.onclick = async () => {
		let t = !!e.dataset.ok, n = e.dataset.ask;
		(t || confirm(m("Recusar o pedido de {email}?", { email: n }))) && (e.disabled = !0, await S(`/api/books/${A.id}/requests`, {
			email: n,
			ok: t
		}).then(() => t && z(m("{email} entrou na sala e recebeu o link por email.", { email: g(n) }))).catch((t) => {
			alert(t.message), e.disabled = !1;
		}));
	}), t.querySelectorAll("[data-resend]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, e.textContent = "…";
		try {
			await S(`/api/books/${A.id}/members`, { email: e.dataset.resend }), e.textContent = `${m("enviado")} ✓`;
		} catch (t) {
			e.textContent = m("reenviar"), e.disabled = !1, alert(t.message);
		}
	}), t.querySelectorAll("[data-copyinv]").forEach((e) => e.onclick = () => Rr(e.dataset.copyinv, !1)), t.querySelectorAll("[data-add]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, Rr(e.dataset.add), await S(`/api/books/${A.id}/members`, { email: e.dataset.add }).catch((t) => {
			alert(t.message), e.disabled = !1;
		});
	}), document.getElementById("invite").onsubmit = async (e) => {
		e.preventDefault();
		let t = e.target[0].value.trim();
		Rr(t), await S(`/api/books/${A.id}/members`, { email: t }).catch((e) => alert(e.message)), e.target.reset();
	}, document.title = `${A.book?.title ?? "vibebook"} · vibebook`, On(N());
}
function Ir() {
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
			if (!a.ok) throw Error((await a.json().catch(() => ({}))).error || m("Não deu para salvar a foto."));
			et();
		} catch (e) {
			alert(e.message || m("Não deu para ler essa imagem."));
		}
	}, e.click());
}
function Lr(e) {
	let t = `${location.origin}/b/${A.id}`;
	return `${m("Te convidei pro vibebook \"{title}\": {url}", {
		title: N(),
		url: t
	})}\n\n${m("1. Entra com {email} (o convite chegou nesse email).", { email: e })}\n${m("2. Manda isto pro seu Claude Code:")}\n\nRead ${location.origin}/llms.txt and set up vibebook for this project. Room: ${t}`;
}
function Rr(e, t = !0) {
	navigator.clipboard?.writeText(Lr(e)).then(() => z(`${t ? `${m("Convite enviado por email para <b>{email}</b>.", { email: g(e) })} ` : ""}${m("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: g(v(e)) })}`), () => z(m("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: g(e) })));
}
function z(e, t = 7e3) {
	document.querySelector(".toast")?.remove(), document.body.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${e}</div>`);
	let n = document.querySelector(".toast");
	setTimeout(() => n.remove(), t);
}
m("A fazer"), m("Fazendo"), m("Esperando OK"), m("Feito");
var zr = !1, Br = {
	off: !1,
	friends: null
};
function Vr() {
	let e = [...C || []].filter((e) => e.id !== A?.id && !e.archived_at).sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0)).slice(0, 3), t = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", n = (e) => e.busy_until > Date.now() ? "<b class=\"swBusy\">✻</b>" : "", r = (e) => {
		let t = w.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${we(t)}">${n}</b>` : "";
	};
	return `<nav class="roomStrip" aria-label="${m("Seus vibebooks")}"><a data-nav href="/app" class="rsAll"><span class="tile md">${T("grid", 20)}</span><span>${m("Todos")}</span></a>${e.map((e) => `<a data-nav href="/b/${e.id}" title="${g(e.title)}"><span class="tw">${Fe(e, "md")}${t(e)}${n(e)}${r(e)}</span><span>${g(e.title)}</span></a>`).join("")}${"<i></i>".repeat(3 - e.length)}<button type="button" class="rsAll" id="sideRooms" aria-label="${m("Trocar de sala")}"><span class="tile md">${De}</span><span>${m("Buscar")}</span></button></nav>`;
}
var Hr = null, Ur = () => {
	h.querySelector(".book.boardview") && document.getElementById("toggleBoard").click();
};
function B() {
	let e = h.querySelector(".book"), t = e && u(e);
	t && (e.classList.contains("boardview") || e.querySelector(":scope > .doc")?.dataset.pane === "board") && Zt("board", t, {
		room: A,
		thread: j,
		vb: $t(),
		send: M,
		onopen: tn
	});
}
function Wr() {
	let e = A.epics.find((e) => e.id === j), t = e ? e.title : N(), n = prompt(m(e ? "Nome do épico:" : "Nome do vibebook:"), t);
	n?.trim() && n !== t && M(e ? {
		t: "epic.rename",
		id: e.id,
		title: n
	} : {
		t: "title",
		title: n
	});
}
function Gr() {
	let e = document.getElementById("peekTxt");
	if (!e || !A) return;
	let t = Ia(), n = t && A.epics.find((e) => e.id === t), r = ((t ? A.docs?.[t] : A.doc) || "").match(/^#\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() || (n ? n.title : N()), i = n?.tasks.length || 0, a = i && n.tasks.filter((e) => e.done).length;
	e.innerHTML = `${T("doc", 15)}<b>Doc</b>${i ? `<small>${a}/${i}</small>` : ""}`, e.title = r;
	let o = A.filesN ?? A.files?.length ?? 0, s = (A.reminders || []).filter((e) => e.error).length;
	document.getElementById("peekFiles").textContent = o ? String(o) : "", document.getElementById("peekRem").textContent = s ? "⚠" : "";
}
var V = matchMedia("(max-width: 900px)"), Kr = !1;
function qr(e) {
	let t = h.querySelector(".book");
	t && V.matches && t.dataset.sheet !== e && (t.dataset.sheet || f.pushState({ sheet: 1 }, "", location.href), t.dataset.sheet = e);
}
function H(e) {
	let t = h.querySelector(".book");
	t?.dataset.sheet && (t.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete t.dataset.sheet, history.state?.sheet && (e ? va = !1 : (Kr = !0, history.back())));
}
function Jr() {
	if (Kr) return Kr = !1, !0;
	let e = h.querySelector(".book");
	return e?.dataset.sheet ? (e.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete e.dataset.sheet, !0) : !1;
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && !e.defaultPrevented && h.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open], [data-dialog-content]") && H();
});
function Yr(e, t, n, r) {
	if (!e) return;
	let i = !1;
	e.onclick = (e) => {
		i ? i = !1 : r ? r(e) : n ? qr(t) : H();
	}, e.onpointerdown = (r) => {
		let a = h.querySelector(".book")?.querySelector(t === "doc" ? ".doc" : ".side"), o = document.getElementById("sheetDim");
		if (!a || !V.matches) return;
		let s = r.clientY, c = a.offsetHeight, l = 0, u = !1;
		i = !1, e.setPointerCapture(r.pointerId), e.onpointermove = (e) => {
			if (l = (e.clientY - s) * -1, !u && Math.abs(l) < 6) return;
			u = !0, a.classList.add("sheetDrag"), o.style.transition = "none";
			let t = Math.min(c, Math.max(0, n ? c + l : l));
			a.style.transform = `translateY(${t * -1}px)`, o.style.opacity = String(1 - t / c);
		}, e.onpointerup = e.onpointercancel = () => {
			e.onpointermove = e.onpointerup = e.onpointercancel = null, u && (i = !0, setTimeout(() => i = !1, 400), a.classList.remove("sheetDrag"), a.style.transform = "", o.style.transition = "", o.style.opacity = "", (n ? -l > c / 4 : l <= c / 4) ? qr(t) : H());
		};
	};
}
function Xr() {
	let e = document.getElementById("tasks");
	if (!e) return;
	let t = A.epics.find((e) => e.id === j), n = document.getElementById("threadTitle"), r = `<button type="button" class="thChev" aria-label="${m("Trocar de conversa")}" title="${m("Trocar de conversa")}">${T("chevronDown", 18)}</button>`, i = () => n.querySelector(".thChev").onclick = () => qr("side"), a = (e, t) => `<span class="thPick">${e.replace("class=\"ri", "class=\"ri thMark")}${t}${r}</span>`;
	if (Mn()) {
		Xt("tasks"), n.innerHTML = `${a(`<span class="ri">${g(P(Mn().title))}</span>`, `<span class="epicName" id="roomName">${g(Mn().title)}</span>`)}<small class="folderChip">✦ ${m("sugestão do @vibe")}</small>`, i(), document.getElementById("roomName").onclick = () => V.matches && qr("side"), e.innerHTML = "", Gr();
		return;
	}
	n.innerHTML = t ? `${a(`<span class="ri" style="background:${_(t.title)};color:#fff">${g(P(t.title))}</span>`, `<span class="epicName" id="roomName" title="${m("Clique para renomear")}">${g(t.title)}</span>`)}<button class="ghost x" id="epicArch" title="${t.archived ? m("Desarquivar épico") : m("Arquivar épico (concluído)")}" aria-label="${t.archived ? m("Desarquivar épico") : m("Arquivar épico")}">${T(t.archived ? "undo" : "check")}</button><button class="ghost x" id="epicDel" title="${m("Apagar épico")}" aria-label="${m("Apagar épico")}">${T("trash")}</button>` : `${a(En("ri roomIco"), `<span class="epicName" id="roomName" title="${g(A.book?.summary || m("Clique para renomear"))}">${g(N())}</span>`)}${A.book?.folder ? `<small class="folderChip">${T("folder", 12)} ${g(A.book.folder)}</small>` : ""}`;
	let o = {};
	for (let e of [...A.epics.flatMap((e) => e.tasks), ...A.roomTasks || []]) !e.done && e.owner && (o[e.owner] = (o[e.owner] || 0) + 1);
	Object.entries(o).sort((e, t) => t[1] - e[1]), n.closest(".chathead");
	let s = o[A.me] || 0, c = document.getElementById("toggleBoard");
	c.querySelector(".kN")?.remove(), s && c.insertAdjacentHTML("beforeend", `<b class="kN" title="${m("Esperando você")}: ${s}">${s}</b>`);
	let l = h.querySelector(".ptBoard .kN");
	l && (l.hidden = !s, l.textContent = s || ""), c.title = s ? `${m("Quadro de tarefas")} · ${m("Esperando você")}: ${s}` : m("Quadro de tarefas (kanban)"), i(), document.getElementById("roomName").onclick = () => V.matches ? qr("side") : Wr();
	let u = h.querySelector(".phHome");
	u && (u.title = u.ariaLabel = m(j === "main" ? "Seus vibebooks" : "Voltar pra sala principal"), u.onclick = (e) => {
		j !== "main" && (e.preventDefault(), e.stopPropagation(), j = "main", Q = !1, R(), X(), B(), $());
	}), n.querySelector(".thPick").onclick = (e) => {
		V.matches && !e.target.closest(".thChev") && qr("side");
	}, Gr();
	let d = t || (j === "main" && A.roomTasks?.length ? {
		id: "main",
		tasks: A.roomTasks
	} : null);
	e.style.display = d ? "" : "none", d && (t && (document.getElementById("epicArch").onclick = () => M({
		t: "epic.archive",
		id: t.id,
		archived: !t.archived
	})), t && (document.getElementById("epicDel").onclick = () => {
		confirm(m("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: t.title })) && M({
			t: "epic.del",
			id: t.id
		});
	}), Zt("tasks", e, {
		room: A,
		thread: j,
		vb: $t(),
		send: M,
		waits: w
	}));
}
var Zr = (e) => `/api/books/${A.id}/files/${e.id}`, Qr = (e) => `data-view="${e.type.startsWith("image/") ? "img" : "frame"}" data-name="${g(e.name)}"`, $r = (matchMedia("(display-mode: standalone)").matches || navigator.standalone === !0) && (/iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1), ei = (e) => $r ? `x-safari-${new URL(e, location.href).href}` : e;
function ti(e, t, n) {
	let r = document.getElementById("viewer");
	r || (r = document.createElement("dialog"), r.id = "viewer", r.className = "viewer", r.innerHTML = `<header><b></b><select class="vsel" aria-label="${m("Versão")}" hidden></select><a target="_blank" rel="noopener" title="${m("Abrir numa aba")}" aria-label="${m("Abrir numa aba")}">${T("external", 20)}</a><button type="button" title="${m("Fechar")}" aria-label="${m("Fechar")}">${T("x", 20)}</button></header><div class="vbody"></div>`, r.querySelector("button").onclick = () => r.close(), r.querySelector("header a").onclick = () => r.close(), r.querySelector(".vsel").onchange = (e) => {
		let t = e.target.value;
		ii(r, `/api/books/${A.id}/files/${t}`, r.dataset.kind, r.dataset.name);
	}, r.addEventListener("click", (e) => {
		e.target.classList.contains("vbody") && r.close();
	}), r.addEventListener("close", () => {
		r.querySelector(".vbody").innerHTML = "", history.state?.viewer && (oi = !0, history.back());
	}), document.body.appendChild(r)), ii(r, e, t, n), r.open || f.pushState({ viewer: 1 }, "", r.dataset.fid ? `${location.pathname}${location.search}#f${r.dataset.fid}` : location.href), r.showModal();
}
function ni(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of A.files || []) n.name === e && t.set(n.id, {
		id: n.id,
		ts: n.ts
	});
	for (let n of Y()) for (let r of n.files || []) r.name === e && !t.has(r.id) && t.set(r.id, {
		id: r.id,
		ts: n.ts
	});
	return [...t.values()].sort((e, t) => t.ts - e.ts);
}
function ri() {
	let e = document.getElementById("viewer");
	if (!e?.open || !e.dataset.name) return;
	let t = e.querySelector(".vsel"), n = ni(e.dataset.name), r = e.dataset.fid;
	t.hidden = n.length < 2, t.innerHTML = n.map((e, t) => `<option value="${e.id}"${e.id === r ? " selected" : ""}>v${n.length - t}${t === 0 ? ` · ${m("mais nova")}` : ""} · ${new Date(e.ts).toLocaleString(p, {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	})}</option>`).join("");
}
function ii(e, t, n, r) {
	e.dataset.kind = n, e.dataset.name = typeof t == "string" ? r : "", e.dataset.fid = typeof t == "string" ? /\/files\/([0-9a-f]+)/.exec(t)?.[1] ?? "" : "", e.querySelector("header b").textContent = r, e.querySelector("header a").href = typeof t == "string" ? ei(t) : "";
	let i = e.querySelector(".vsel");
	i.hidden = !0, e.dataset.fid && (ri(), A.filesAll || M({ t: "files.get" })), e.open && e.dataset.fid && history.state?.viewer && f.replaceState(history.state, "", `${location.pathname}${location.search}#f${e.dataset.fid}`);
	let a = e.querySelector(".vbody");
	if (a.className = `vbody ${n}`, e.classList.toggle("noLink", n === "table"), n === "table") a.replaceChildren(t.cloneNode(!0));
	else if (n === "img") {
		let e = new Image();
		e.src = t, e.alt = r, a.replaceChildren(e);
	} else if (/\.(md|markdown|txt|csv)$/i.test(r) && typeof t == "string") a.className = "vbody text", a.replaceChildren(), fetch(t).then((e) => e.ok ? e.text() : Promise.reject(e.status)).then((n) => {
		(!e.dataset.fid || t.endsWith(e.dataset.fid)) && (a.innerHTML = /\.(md|markdown)$/i.test(r) ? `<div class="vdoc md">${Se(n.slice(0, 3e5))}</div>` : /\.csv$/i.test(r) ? `<div class="vdoc"><table>${ai(n).map((e, t) => `<tr>${e.map((e) => `<${t ? "td" : "th"}>${g(e)}</${t ? "td" : "th"}>`).join("")}</tr>`).join("")}</table></div>` : `<pre class="vdoc">${g(n.slice(0, 3e5))}</pre>`);
	}).catch(() => {
		a.innerHTML = `<p class="vdoc">${m("Não consegui abrir este arquivo.")}</p>`;
	});
	else {
		let e = document.createElement("iframe");
		e.src = t, e.title = r, /\.pdf$/i.test(r) || (e.sandbox = "allow-scripts"), a.replaceChildren(e);
	}
}
function ai(e) {
	let t = [], n = [], r = "", i = !1;
	for (let a = 0; a < e.length && t.length < 2e3; a++) {
		let o = e[a];
		i ? o === "\"" ? e[a + 1] === "\"" ? (r += "\"", a++) : i = !1 : r += o : o === "\"" ? i = !0 : o === "," || o === ";" && !e.slice(0, 200).includes(",") ? (n.push(r), r = "") : o === "\n" ? (n.push(r.replace(/\r$/, "")), t.push(n.slice(0, 50)), n = [], r = "") : r += o;
	}
	return (r || n.length) && (n.push(r), t.push(n.slice(0, 50))), t;
}
var oi = !1;
function si() {
	if (oi) return oi = !1, !0;
	let e = document.getElementById("viewer");
	return e?.open ? (f.replaceState(null, "", location.href), e.close(), !0) : !1;
}
document.addEventListener("click", (e) => {
	if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
	let t = e.target.closest?.("a[data-view]");
	if (t) return e.preventDefault(), ti(t.getAttribute("href"), t.dataset.view, t.dataset.name || "");
	let n = e.target.closest?.("a[href]");
	if (!n || !A?.id) return;
	let r;
	try {
		r = new URL(n.getAttribute("href"), location.href);
	} catch {
		return;
	}
	let i = r.origin === location.origin && RegExp(`^/api/books/${A.id}/files/([0-9a-f]+)$`).exec(r.pathname);
	if (!i) return;
	let a = (A.files || []).find((e) => e.id === i[1]) || Y().flatMap((e) => e.files || []).find((e) => e.id === i[1]);
	e.preventDefault(), ti(r.pathname, a?.type?.startsWith("image/") ? "img" : "frame", a?.name || n.textContent.trim() || "arquivo");
});
var ci = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, li = (e) => e?.length ? `<div class="atts">${e.map((e) => e.embed ? `<div class="embedBox"><div class="embedWrap"><iframe class="embed" src="${Zr(e)}" sandbox="allow-scripts" loading="lazy" title="${g(e.name)}"></iframe><a class="embedOpen" href="${Zr(e)}" ${Qr(e)} title="${m("Abrir em tela cheia")}" aria-label="${m("Abrir em tela cheia")}">${T("expand", 15)}</a></div></div>` : e.type.startsWith("audio/") ? `<div class="audioAtt"><audio controls preload="metadata" src="${Zr(e)}"></audio><a href="${Zr(e)}" target="_blank" rel="noopener" download="${g(e.name)}">${T("mic", 14)} ${g(e.name)} <small>${ci(e.size)}</small></a></div>` : e.type.startsWith("image/") ? `<a href="${Zr(e)}" target="_blank" rel="noopener" ${Qr(e)}><img src="${Zr(e)}" alt="${g(e.name)}" loading="lazy" /></a>` : `<a class="fileChip" href="${Zr(e)}" target="_blank" rel="noopener" ${Qr(e)}>${Bt(e)} ${g(e.name)} <small>${ci(e.size)}</small></a>`).join("")}</div>` : "";
function ui(e) {
	let t = A.polls?.[e];
	if (!t) return "";
	let n = t.votes.map((e) => e.length), r = n.reduce((e, t) => e + t, 0), i = Math.max(...n), a = new Set(t.votes.flat()).size;
	return `<div class="poll" data-poll="${e}">
    <div class="pq">${T("chart", 18)} ${g(t.question)}</div>
    ${t.options.map((e, a) => {
		let o = n[a], s = r ? Math.round(100 * o / r) : 0, c = t.votes[a].includes(A.me), l = t.closed && o > 0 && o === i;
		return `<button type="button" class="opt ${c ? "mine" : ""} ${l ? "win" : ""}" data-vote="${a}" ${t.closed ? "disabled" : ""} aria-pressed="${c}">
        <span class="fill" style="width:${s}%"></span><span class="ol">${l ? `${T("trophy")} ` : c ? `${T("check")} ` : ""}${g(e)}</span>
        <span class="stack">${t.votes[a].slice(0, 4).map((e) => y(e)).join("")}</span><span class="pc">${o ? `${s}%` : ""}</span></button>`;
	}).join("")}
    <div class="pf">${a === 1 ? m("1 pessoa votou") : m("{n} pessoas votaram", { n: a })} · ${t.multi ? m("pode escolher várias") : m("escolha uma")}${t.closed ? ` · ${m("encerrada")}` : t.author === A.me || t.author === "ai" ? ` · <button type="button" class="link" data-close="${e}">${m("encerrar")}</button>` : ""}</div>
  </div>`;
}
var di = (e) => new Date(e).toLocaleTimeString(p, {
	hour: "2-digit",
	minute: "2-digit"
}), fi = (e, t) => !!e && e.author === t.author && (e.kind || null) === (t.kind || null) && (e.tag || null) === (t.tag || null) && t.ts - e.ts < 3e5 && !e.poll && !t.poll, pi = (e) => {
	let t = A.messages.filter((t) => t.thread === e.id), n = t.at(-1), r = A.counts ? (A.counts[e.id] ?? 0) + t.filter((e) => e.id > (A.countsAt ?? 0)).length : t.length, i = e.tasks.filter((e) => e.status === "done").length;
	return `${Ar(e)}<span class="tc-t"><b>${g(e.title)}</b><small>${e.archived ? `✓ ${m("concluído")} · ` : ""}${e.tasks.length ? `${m("{d}/{n} tarefas", {
		d: i,
		n: e.tasks.length
	})} · ` : ""}${r === 1 ? m("1 resposta") : m("{n} respostas", { n: r })}${n ? ` · ${x(n.ts) === m("agora") ? m("agora") : m("última há {ago}", { ago: x(n.ts) })}` : ""}</small></span><span class="tc-go">→</span>`;
};
function mi(e) {
	let t = /* @__PURE__ */ new Map();
	for (let e of A.epics || []) e.parent && (t.has(e.parent) || t.set(e.parent, []), t.get(e.parent).push(e.id));
	let n = [e];
	for (let e = 0; e < n.length && n.length < 60; e++) for (let r of t.get(n[e]) || []) n.includes(r) || n.push(r);
	let r = new Set(n), i = /* @__PURE__ */ new Map();
	for (let e of [...A.messages].reverse()) if (r.has(e.thread)) for (let t of e.files || []) {
		let e = i.get(t.name);
		e ? e.seen.add(t.id) : i.set(t.name, {
			f: t,
			seen: /* @__PURE__ */ new Set([t.id]),
			n: 0
		});
	}
	for (let e of n) for (let t of A.epics.find((t) => t.id === e)?.files || []) {
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
var hi = (e) => {
	let t = mi(e);
	return t.length ? `<div class="tcFiles" data-files-of="${e}">${t.slice(0, 6).map((e) => `<a class="fchip" href="/api/books/${A.id}/files/${e.id}" title="${g(e.name)}">${Bt(e, 14)}<span>${g(e.name)}</span>${e.n > 1 ? `<small>v${e.n}</small>` : ""}</a>`).join("")}${t.length > 6 ? `<small class="mute">+${t.length - 6}</small>` : ""}</div>` : "";
}, gi = (e) => (A.epics || []).filter((t) => t.from_msg === e).map((e) => `<button type="button" class="tcard" data-goepic="${e.id}">${pi(e)}</button>${hi(e.id)}`).join("");
function _i() {
	X("stay");
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-gomain]");
	if (t) return j = "main", Q = !1, R(), X(), B(), $(), document.getElementById(`m${t.dataset.gomain}`)?.scrollIntoView({ block: "center" });
	let n = e.target.closest(".tcard[data-goepic]");
	n && (j = n.dataset.goepic, Q = !1, R(), X(), B(), $());
});
function vi() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".endMark, .prodStage").forEach((e) => e.remove());
	let t = A.epics.find((e) => e.id === j), n = t?.prod, r = n ? n.stage === "verified" ? `<div class="prodStage ok"><b>✓✓ ${m("Verificado em prod")}</b>${n.note ? `<span>${g(n.note)}</span>` : ""}</div>` : `<div class="prodStage"><b>🚀 ${m("No ar")}</b><span>${m("Falta o agent verificar em prod.")}</span></div>` : "";
	t?.archived && e.insertAdjacentHTML("beforeend", `<div class="endMark"><b>✓ ${m("Agent fez")}</b><span>${m("Escreva aqui pra continuar: ele reabre.")}</span></div>`), r && e.insertAdjacentHTML("beforeend", r);
}
var U = null, yi = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? m("votação") : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120), bi = (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? m("{via} de {who}", {
	via: "Agent",
	who: v(e.author)
}) : v(e.author), xi = (e) => {
	let t = A.messages.find((t) => t.id === e);
	return `<button type="button" class="quote" data-goto="${e}" title="${m("Ver a mensagem respondida")}">${T("reply", 13)} ${t ? `<b>${g(bi(t))}</b> ${g(yi(t))}` : m("mensagem anterior")}</button>`;
};
function Si() {
	let e = document.getElementById("replyBar");
	e && (U && U.thread !== j && (U = null), e.hidden = !U, U && (e.innerHTML = `<span>${T("reply", 13)} ${m("Respondendo a <b>{who}</b>", { who: g(bi(U)) })}: ${g(yi(U))}</span><button type="button" class="ghost" id="replyX" aria-label="${m("Cancelar resposta")}" title="${m("Cancelar")}">${T("x")}</button>`), document.getElementById("replyX")?.addEventListener("click", () => {
		U = null, Si();
	}));
}
function Ci(e) {
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px", document.body.append(t), t.focus({ preventScroll: !0 }), t.setSelectionRange(0, e.length);
	let n = !1;
	try {
		n = document.execCommand("copy");
	} catch {}
	return t.remove(), n;
}
function wi(e) {
	let t = Y().find((t) => t.id === e);
	if (!t) return;
	let n = `${location.origin}/b/${A.id}${t.thread && t.thread !== "main" ? `?t=${encodeURIComponent(t.thread)}` : ""}#m${e}`, r = () => {
		z(`✓ ${m("Link copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (Ci(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => z(`${m("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copylink="${e}">${m("Copiar link")}</button>`));
}
function Ti(e) {
	let t = A.messages.find((t) => t.id === e);
	if (!t) return;
	let n = t.text || t.files?.map((e) => e.name).join("\n") || "";
	if (!n) return z(m("Essa mensagem não tem texto pra copiar."), 2500);
	let r = () => {
		z(`✓ ${m("Copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (Ci(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => {
		z(`${m("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copymsg="${e}">${m("Copiar")}</button>`);
	});
}
function Ei(e) {
	U = A.messages.find((t) => t.id === e) ?? null, Si(), document.getElementById("input")?.focus();
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-reply]");
	if (t) return Ei(Number(t.dataset.reply));
	let n = e.target.closest("[data-copymsg]");
	if (n) return Ti(Number(n.dataset.copymsg));
	let r = e.target.closest("[data-copylink]");
	if (r) return wi(Number(r.dataset.copylink));
	let i = e.target.closest("a.mlink[data-msg]");
	if (i) return e.preventDefault(), Oi(Number(i.dataset.msg));
	let a = e.target.closest(".quote[data-goto]");
	a && Oi(Number(a.dataset.goto));
});
var Di = null;
function Oi(e, t) {
	let n = A.messages.find((t) => t.id === e), r = n?.thread || t;
	r && r !== j && (r === "main" || A.epics.some((e) => e.id === r)) && (j = r, Q = !1, R(), X(), B(), $());
	let i = document.getElementById(`m${e}`);
	if (!i && n) {
		let t = A.messages.filter((e) => e.thread === j), r = t.indexOf(n);
		r >= 0 && (J.n = Math.max(J.n, t.length - r + 10), X(!0), i = document.getElementById(`m${e}`));
	}
	if (!i) return Di?.id === e ? void 0 : (Di = {
		id: e,
		n: 0
	}, z(m("Buscando a mensagem…"), 1500), xa());
	Di = null, Z = !1, i.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), i.classList.remove("flash"), i.offsetWidth, i.classList.add("flash");
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && U && document.activeElement?.id === "input" && (U = null, Si());
});
var W = null;
document.addEventListener("touchstart", (e) => {
	let t = !e.target.closest("pre, table, .embedBox") && e.target.closest(".msgs .msg[id^=m]");
	W = t && e.touches.length === 1 ? {
		m: t,
		x: e.touches[0].clientX,
		y: e.touches[0].clientY,
		dx: 0
	} : null;
}, { passive: !0 }), document.addEventListener("touchmove", (e) => {
	if (!W) return;
	let t = e.touches[0].clientX - W.x, n = e.touches[0].clientY - W.y;
	if (!W.locked) {
		if (Math.abs(n) > 8 && Math.abs(n) >= Math.abs(t)) {
			W = null;
			return;
		}
		if (Math.abs(t) < 10 || Math.abs(t) <= Math.abs(n)) return;
		W.locked = !0, W.m.classList.add("swipe");
	}
	e.preventDefault(), W.dx = t, W.m.style.transform = `translateX(${Math.max(-80, Math.min(t, 80))}px)`, W.m.dataset.sw = t < 0 ? `← ${m("Copiar")}` : `${m("Responder")} →`, W.m.classList.toggle("swL", t < 0), W.m.classList.toggle("swR", t > 0), W.m.classList.toggle("swGo", Math.abs(t) > 60);
}, { passive: !1 }), document.addEventListener("touchend", () => {
	if (!W) return;
	let { m: e, dx: t } = W;
	W = null, e.classList.remove("swipe", "swL", "swR", "swGo"), e.style.transform = "", t > 60 ? Ei(Number(e.id.slice(1))) : t < -60 && Ti(Number(e.id.slice(1)));
});
function ki(e) {
	let t;
	try {
		t = typeof e.card == "string" ? JSON.parse(e.card) : e.card;
	} catch {
		return "";
	}
	if (!t?.elements?.[t.root]) return "";
	let n = A.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent"), r = e.kind === "agent" && e.author === A.me && !n, i = (e) => g(String(e ?? "")).replace(/\n/g, "<br>"), a = (o, s = 0) => {
		let c = t.elements[o];
		if (!c || s > 8) return "";
		let l = c.props || {}, u = () => (c.children || []).map((e) => a(e, s + 1)).join("");
		switch (c.type) {
			case "Card": return `<div class="vcard">${l.title ? `<div class="vh"><b>${i(l.title)}</b>${l.subtitle ? `<small>${i(l.subtitle)}</small>` : ""}</div>` : ""}<div class="vb">${u()}</div></div>`;
			case "Section": return `<section class="vsec">${l.title ? `<h5>${i(l.title)}</h5>` : ""}${u()}</section>`;
			case "Text": return `<p class="vtx ${g(l.style || "plain")}">${i(l.content)}</p>`;
			case "Fields": return `<dl class="vfields">${u()}</dl>`;
			case "Field": return `<div><dt>${i(l.label)}</dt><dd>${i(l.value)}</dd></div>`;
			case "Table": return `<div class="vtWrap"><button type="button" class="vtOpen" data-vtopen title="${m("Abrir em tela cheia")}" aria-label="${m("Abrir em tela cheia")}">${T("expand", 14)}</button><div class="vtable"><table>${l.headers?.length ? `<thead><tr>${l.headers.map((e) => `<th>${i(e)}</th>`).join("")}</tr></thead>` : ""}<tbody>${(l.rows || []).map((e) => `<tr>${e.map((e) => `<td>${i(e)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
			case "Chart": {
				let e = l.data || [], t = Math.max(...e.map((e) => Math.abs(e.value)), 1);
				if (l.kind === "line") {
					let n = e.length > 1 ? 300 / (e.length - 1) : 0, r = Math.min(...e.map((e) => e.value), 0), a = t - r || 1, o = e.map((e, t) => `${(t * n).toFixed(1)},${(90 - (e.value - r) / a * 90).toFixed(1)}`).join(" ");
					return `<figure class="vchart">${l.title ? `<figcaption>${i(l.title)}</figcaption>` : ""}<svg viewBox="-4 -4 308 98" preserveAspectRatio="none"><polyline points="${o}" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="vlab"><span>${i(e[0]?.label)}</span><span>${i(e.at(-1)?.label)}</span></div></figure>`;
				}
				return `<figure class="vchart">${l.title ? `<figcaption>${i(l.title)}</figcaption>` : ""}${e.map((e) => `<div class="vbar"><span>${i(e.label)}</span><i style="width:${Math.round(Math.abs(e.value) / t * 100)}%"></i><b>${i(e.value)}</b></div>`).join("")}</figure>`;
			}
			case "Divider": return "<hr class=\"vhr\">";
			case "Image": return /^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(l.url) ? `<img class="vimg" src="${g(l.url)}" alt="${g(l.alt || "")}" loading="lazy">` : "";
			case "Actions": return `<div class="vact">${u()}</div>`;
			case "Button": {
				let t = l.value || l.label, a = n?.text === t;
				return r ? `<button type="button" class="vbtn ${g(l.style || "")}" data-cardbtn="${e.id}" data-v="${g(t)}">${i(l.label)}</button>` : `<span class="vbtn ro ${a ? "on" : ""}">${a ? T("check", 14) : ""}${i(l.label)}</span>`;
			}
			case "LinkButton": return /^#(m\d+|e[a-z0-9]+|doc(:[a-z0-9]+)?|app:(room|[a-f0-9]{12})\/[\w.-]+)$/.test(l.url || "") ? `<button type="button" class="vbtn link" data-cardgo="${g(l.url)}">${i(l.label)} ${T("arrowRight", 13)}</button>` : /^https?:\/\//i.test(l.url) ? `<a class="vbtn link" href="${g(l.url)}" target="_blank" rel="noopener noreferrer">${i(l.label)} ${T("external", 13)}</a>` : "";
			default: return "";
		}
	};
	return a(t.root);
}
function Ai(e) {
	if (e.startsWith("#app:")) {
		let [t, n] = e.slice(5).split("/");
		K = {
			cid: t,
			tool: n
		}, document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" })), V.matches && qr("doc");
		return;
	}
	if (e.startsWith("#m")) return Oi(Number(e.slice(2)));
	let t = e.startsWith("#e") ? e.slice(2) : e.split(":")[1], n = t && A.epics.some((e) => e.id === t) ? t : t ? null : j;
	if (!n) return z(m("Esse épico não existe mais nesta sala."));
	n !== j && (j = n, Q = !1, R(), X(), B(), $()), e.startsWith("#doc") && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" })), V.matches && qr("doc"));
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardgo]");
	t && (e.preventDefault(), Ai(t.dataset.cardgo));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-vtopen]");
	if (!t) return;
	let n = t.parentElement.querySelector("table");
	n && ti(n, "table", t.closest(".vcard")?.querySelector(".vh b")?.textContent || m("Tabela"));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardbtn]");
	if (!t) return;
	let n = A.messages.find((e) => e.id === Number(t.dataset.cardbtn));
	t.closest(".vcard")?.querySelectorAll("[data-cardbtn]").forEach((e) => e.disabled = !0), M({
		t: "msg",
		thread: n?.thread ?? j,
		text: t.dataset.v,
		files: [],
		reply_to: Number(t.dataset.cardbtn)
	});
});
var ji = (e) => e?.kind === "agent" && e.author !== A.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(e.text || ""), Mi = (e) => {
	if (!e?.reply_to || e.kind === "agent") return !1;
	let t = A.messages.find((t) => t.id === e.reply_to);
	return !!t && Zn(t) && t.author === e.author;
};
function Ni(e, t, n) {
	if (n) {
		let e = /^\s*aprov/i.test(n.text);
		return `<div class="permAsk done ${e ? "ok" : "no"}">${T(e ? "check" : "x", 14)} ${m(e ? "Aprovado por {who}" : "Negado por {who}", { who: g(v(n.author)) })} · ${di(n.ts)}</div>`;
	}
	return t.closed ? `<div class="permAsk done">${T("terminal", 14)} ${m("foi pro terminal")}</div>` : e.author === A.me ? `<div class="permAsk" data-perm="${e.id}"><button type="button" class="primary" data-pv="Aprovar">${m("Aprovar")}</button><button type="button" class="ghost" data-pv="Negar">${m("Negar")}</button></div>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${g(e)}</span>`).join("")}<small>${m("esperando {who}", { who: g(v(e.author)) })}</small></div>`;
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-perm] [data-pv], [data-perm] [data-pconfirm], [data-perm] [data-pcancel]");
	if (!t) return;
	let n = t.closest("[data-perm]"), r = Number(n.dataset.perm);
	if (t.dataset.pv) {
		let e = t.dataset.pv === "Aprovar";
		n.innerHTML = `<span class="pq">${m(e ? "Aprovar este pedido?" : "Negar este pedido?")}</span><button type="button" class="${e ? "primary" : "danger"}" data-pconfirm="${t.dataset.pv}">${m("Confirmar")}</button><button type="button" class="ghost" data-pcancel="1">${m("Cancelar")}</button>`, n.classList.add("confirm");
		return;
	}
	if (t.dataset.pcancel) {
		let e = A.messages.find((e) => e.id === r);
		e && (n.outerHTML = Pi(e));
		return;
	}
	let i = A.messages.find((e) => e.id === r);
	n.querySelectorAll("button").forEach((e) => e.disabled = !0), M({
		t: "msg",
		thread: i?.thread ?? j,
		text: t.dataset.pconfirm,
		files: [],
		reply_to: r
	});
});
function Pi(e) {
	let t;
	try {
		t = JSON.parse(e.choices);
	} catch {
		return "";
	}
	let n = A.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent");
	if (Zn(e)) return Ni(e, t, n);
	let r = !Zn(e);
	if (!n && t.closed) return `<div class="choice ro closed">${t.options.map((e) => `<span class="opt">${g(e)}</span>`).join("")}<small>${m("foi pro terminal")}</small></div>`;
	if (n) {
		let e = new Set(n.text.split(" · ")), i = r && !t.options.some((t) => e.has(t));
		return `<div class="choice done">${t.options.map((t) => `<span class="opt ${e.has(t) ? "on" : ""}">${e.has(t) ? T("check", 14) : ""}${g(t)}</span>`).join("")}${i ? `<span class="opt on">${T("check", 14)}${m("Outro")}</span>` : ""}</div>`;
	}
	return e.kind === "agent" && e.author === A.me ? `<form class="choice" data-choice="${e.id}" data-multi="${t.multi ? 1 : ""}">${t.options.map((n) => `<label class="opt"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="${g(n)}" />${g(n)}</label>`).join("")}${r ? `<label class="opt oth"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="" data-other="1" />${m("Outro")}…</label>` : ""}<small>${m("escolha e envie pela caixa de mensagem")}</small></form>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${g(e)}</span>`).join("")}<small>${m("esperando {who}", { who: g(v(e.author)) })}</small></div>`;
}
document.addEventListener("change", (e) => {
	let t = e.target.closest("form.choice");
	if (!t) return;
	let n = document.getElementById("input");
	n && (e.target.dataset.other ? e.target.checked && (t.dataset.multi || t.querySelectorAll("input").forEach((t) => t.checked = t === e.target), n.value = "") : n.value = [...t.querySelectorAll("input:checked:not([data-other])")].map((e) => e.value).join(" · "), Ei(Number(t.dataset.choice)), n.dispatchEvent(new Event("input", { bubbles: !0 })), n.focus());
});
var Fi = (e) => e?.tag === "reminder" ? (e.text || "").split("\n")[0] : e?.tag === "issue" ? "⚠issue" : null;
function Ii(e) {
	let t = [];
	for (let n of e) {
		let e = Fi(n), r = t[t.length - 1];
		e && Fi(r) === e ? t[t.length - 1] = {
			...n,
			runs: [...r.runs || [r.ts], n.ts],
			group: [...r.group || [r], n]
		} : t.push(n);
	}
	return t;
}
function Li(e) {
	let t = (e.group || [e]).slice().reverse(), n = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? di(e) : `${new Date(e).toLocaleDateString(p, {
		day: "numeric",
		month: "short"
	})} ${di(e)}`, r = (e) => {
		let [t, ...n] = (e.text || "").split("\n\n");
		return {
			head: t.replace(/^⚠\s*/, ""),
			what: n.join("\n\n")
		};
	}, i = r(t[0]);
	return `<div class="msg remMsg issueMsg" id="m${e.id}">${Vi(e.id)}<div class="body"><details><summary>${T("alert", 14)}<span class="remT"><b>${t.length > 1 ? m("{n} issues dos agents", { n: t.length }) : m("Issue de um agent")}</b> ${g(i.what.replace(/\s+/g, " ").slice(0, 140))}</span><span class="remWhen" title="${g(new Date(e.ts).toLocaleString(p))}">${n(e.ts)}</span></summary><div class="txt issueList">${t.map((e) => {
		let t = r(e);
		return `<div class="iss"><small>${n(e.ts)} · ${me(Se(t.head))}<span class="issAct"><button type="button" class="rbtn" data-copymsg="${e.id}" title="${m("Copiar")}" aria-label="${m("Copiar o texto desta mensagem")}">${T("copy", 13)}</button><button type="button" class="rbtn" data-reply="${e.id}" title="${m("Responder")}" aria-label="${m("Responder a esta mensagem")}">${T("reply", 13)}</button></span></small><div>${g(t.what)}</div></div>`;
	}).join("")}</div></details></div></div>`;
}
function Ri(e, t = !1) {
	let [n, ...r] = (e.text || "").split("\n\n"), i = e.runs || [e.ts], a = n.replace(/^⏰\s*/, ""), o = a.match(/^\*\*(.+?)\*\*\s*(.*)$/), s = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? di(e) : `${new Date(e).toLocaleDateString(p, {
		day: "numeric",
		month: "short"
	})} ${di(e)}`;
	return `<div class="msg remMsg" id="m${e.id}">${Vi(e.id)}<div class="body"><details><summary>${T("clock", 14)}<span class="remT">${o ? `<b>${g(o[1])}</b> ${g(o[2])}` : g(a)}</span><span class="remWhen" title="${g(new Date(e.ts).toLocaleString(p))}">${i.length > 1 ? `${m("rodou {n}×", { n: i.length })} · ` : ""}${s(e.ts)}</span></summary>${r.length ? `<div class="txt">${me(Se(r.join("\n\n")))}</div>` : ""}${i.length > 1 ? `<small class="remRuns">${i.map(s).join(" · ")}</small>` : ""}</details>${t ? "" : (e.group || [e]).map((e) => gi(e.id)).join("")}</div></div>`;
}
var zi = (e) => e.author === "ai" && (e.tag === "notice" || e.tag === "done" || /^↩ (Reabri|I reopened)/.test(e.text || ""));
function Bi(e) {
	let t = (e.text || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim(), n = new Date(e.ts).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? di(e.ts) : `${new Date(e.ts).toLocaleDateString(p, {
		day: "numeric",
		month: "short"
	})} ${di(e.ts)}`;
	return `<div class="msg remMsg noticeMsg" id="m${e.id}">${Vi(e.id)}<div class="body"><details><summary><span class="vibeMark" aria-hidden="true">✦</span><span class="remT">${me(g(t))}</span><span class="remWhen" title="${g(new Date(e.ts).toLocaleString(p))}">${n}</span></summary><div class="txt">${me(Se(e.text || ""))}</div></details></div></div>`;
}
var Vi = (e) => `<span class="mact"><button type="button" class="rbtn" data-copymsg="${e}" title="${m("Copiar")}" aria-label="${m("Copiar o texto desta mensagem")}">${T("copy", 14)} ${m("Copiar")}</button><button type="button" class="rbtn" data-copylink="${e}" title="${m("Copiar link")}" aria-label="${m("Copiar o link desta mensagem")}">${T("link", 14)} ${m("Copiar link")}</button><button type="button" class="rbtn" data-reply="${e}" title="${m("Responder")}" aria-label="${m("Responder a esta mensagem")}">${T("reply", 14)} ${m("Responder")}</button></span>`;
function Hi() {
	let e = document.getElementById("decPane");
	if (!e) return;
	let t = A.decisions || [];
	document.getElementById("decCount").textContent = t.length ? ` ${t.length}` : "", e.innerHTML = t.length ? t.slice().reverse().map((e) => `<div class="dec ${e.kind === "approval" ? "approval" : ""}"><div>${g(e.text)}<small>${e.kind === "approval" ? `✓ ${m("aprovado")}` : m("decidido")} · ${g(e.who)} · ${x(e.ts)}</small></div>
      <button class="ghost x" data-ddel="${e.id}" aria-label="${m("Apagar registro")}" title="${m("Apagar registro")}">${T("x")}</button></div>`).join("") : `<div class="empty">${m("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.")}</div>`, e.querySelectorAll("[data-ddel]").forEach((e) => e.onclick = () => {
		confirm(m("Apagar esse registro?")) && M({
			t: "decision.del",
			id: Number(e.dataset.ddel)
		});
	});
}
function Ui() {
	document.querySelector(".doc[data-pane=\"apps\"]") && q();
}
var G = null, Wi = null, Gi = !1, K = null, Ki = /* @__PURE__ */ new Set();
async function qi() {
	let e = A.id;
	try {
		let t = await S(`/api/books/${e}/connections`);
		A.id === e && (G = t.connections, Wi = e);
	} catch (e) {
		G ||= [], z(g(e.message));
	}
	q();
}
var Ji = (e) => e.scope === "me" ? `<span class="cScope me">${m("minha")}</span>` : `<span class="cScope">${m("da sala")}</span>`;
function Yi() {
	let e = /* @__PURE__ */ new Set();
	return (A.files || []).filter((t) => t.type === "text/html" && /^apps\/[\w.-]+\.html$/i.test(t.name) && !e.has(t.name) && e.add(t.name)).map((e) => ({
		tool: e.name.slice(5, -5),
		title: e.name.slice(5, -5),
		description: `${v(e.author)} · ${x(e.ts)}`,
		file: e
	}));
}
function Xi() {
	document.querySelector(".doc[data-pane=\"apps\"]") && !(K && document.querySelector(".connFrame")) && q();
}
function q() {
	let e = document.getElementById("appsPane");
	if (!e) return;
	if (Wi !== A.id && (G = null, Wi = A.id), A.filesAll || M({ t: "files.get" }), G === null) {
		e.innerHTML = `<div class="empty">${m("Carregando…")}</div>`, qi(), G = void 0;
		return;
	}
	if (G === void 0) return;
	let t = Yi();
	if (document.getElementById("appCount").textContent = G.length + t.length ? ` ${G.length + t.length}` : "", K) return Zi(e);
	let n = document.getElementById("connForm") && Object.fromEntries(new FormData(document.getElementById("connForm"))), r = (e, t) => `<div class="connApps">${t.map((t) => `<button type="button" class="connApp" data-conn-open="${e}/${g(t.tool)}"><b>${g(t.title)}</b><span>${g(t.description)}</span></button>`).join("")}</div>`;
	e.innerHTML = `<div class="connHead"><b>Apps</b>${Gi ? "" : `<button type="button" class="ghost" id="connAdd">${T("plus", 15)} ${m("Conectar MCP")}</button>`}</div>
    ${Gi ? `<form class="connForm" id="connForm">
      <label>${m("URL do servidor MCP")}<input name="url" required placeholder="https://…/mcp" autocomplete="off" spellcheck="false"></label>
      <small class="mute">${m("Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.")}</small>
      <fieldset><label><input type="radio" name="scope" value="me" checked> ${m("Só minha: só eu e meus agents")}</label><label><input type="radio" name="scope" value="room"> ${m("Da sala: todo mundo vê; cada um entra com a própria conta")}</label></fieldset>
      <div class="acts"><button type="button" id="connCancel">${m("Cancelar")}</button><button class="primary">${m("Conectar")}</button></div></form>` : ""}
    <div class="conn"><div class="connTop"><b>${m("Esta sala")}</b><span class="cScope">${m("da sala")}</span><small>apps/*.html</small></div>
      ${t.length ? r("room", t) : `<small class="mute">${m("Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.")}</small>`}</div>
    ${G.map((e) => `<div class="conn"><div class="connTop"><b>${g(e.title)}</b>${Ji(e)}<small>${g(e.host)} · ${g(v(e.owner))}</small>
        <button type="button" class="ghost" data-conn-ref="${e.id}" title="${m("Atualizar")}" aria-label="${m("Atualizar")}">↻</button>${e.mine ? `<button type="button" class="ghost" data-conn-del="${e.id}" title="${m("Remover conexão")}" aria-label="${m("Remover conexão")}">${T("x", 14)}</button>` : ""}</div>
        ${e.auth === "identity" ? e.signed_in ? `<small class="mute connWho">${m("Você entrou em {host} com a sua conta.", { host: g(e.host) })} <button type="button" class="link" data-conn-out="${e.id}">${m("Sair")}</button></small>` : `<div class="connSign"><small>${m("Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.", { host: g(e.host) })}</small><a class="primary" href="/api/books/${A.id}/connections/${e.id}/signin">${m("Entrar em {host}", { host: g(e.host) })}</a></div>` : ""}
        ${e.apps.length ? (() => {
		let t = e.apps.filter((e) => e.screen), n = t.length && !Ki.has(e.id);
		return r(e.id, n ? t : e.apps) + (t.length && t.length < e.apps.length ? `<button type="button" class="link connMore" data-conn-more="${e.id}">${n ? m("ver todas ({n})", { n: e.apps.length }) : m("só as telas")}</button>` : "");
	})() : `<small class="mute">${m("{n} tools, nenhum app", { n: e.tools.length })}</small>`}</div>`).join("")}`;
	let i = document.getElementById("connForm");
	if (i && n) for (let [e, t] of Object.entries(n)) i.elements[e] && e !== "scope" && (i.elements[e].value = t);
	document.getElementById("connAdd")?.addEventListener("click", () => {
		Gi = !0, q(), document.querySelector("#connForm [name=\"url\"]")?.focus();
	}), document.getElementById("connCancel")?.addEventListener("click", () => {
		Gi = !1, q();
	}), i && (i.onsubmit = async (e) => {
		e.preventDefault();
		let t = i.querySelector(".primary");
		t.disabled = !0, t.textContent = m("Conectando…");
		try {
			let e = await S(`/api/books/${A.id}/connections`, {
				url: i.url.value.trim(),
				scope: i.scope.value
			});
			if (e.connection?.needs_sign_in) return void (location.href = `/api/books/${A.id}/connections/${e.connection.id}/signin`);
			Gi = !1, G = null, q();
		} catch (e) {
			z(g(e.message)), t.disabled = !1, t.textContent = m("Conectar");
		}
	}), e.querySelectorAll("[data-conn-out]").forEach((e) => e.onclick = async () => {
		try {
			await S(`/api/books/${A.id}/connections/${e.dataset.connOut}/signout`, {});
		} catch (e) {
			z(g(e.message));
		}
		G = null, q();
	}), e.querySelectorAll("[data-conn-more]").forEach((e) => e.onclick = () => {
		let t = e.dataset.connMore;
		Ki.has(t) ? Ki.delete(t) : Ki.add(t), q();
	}), e.querySelectorAll("[data-conn-open]").forEach((e) => e.onclick = () => {
		let [t, n] = e.dataset.connOpen.split("/");
		K = {
			cid: t,
			tool: n
		}, q();
	}), e.querySelectorAll("[data-conn-ref]").forEach((e) => e.onclick = async () => {
		try {
			await S(`/api/books/${A.id}/connections/${e.dataset.connRef}/refresh`, {}), G = null, q();
		} catch (e) {
			z(g(e.message));
		}
	}), e.querySelectorAll("[data-conn-del]").forEach((e) => e.onclick = async () => {
		let t = G.find((t) => t.id === e.dataset.connDel);
		confirm(m("Remover a conexão {name}? Os apps dela saem da sala.", { name: t?.title || "" })) && (await fetch(`/api/books/${A.id}/connections/${e.dataset.connDel}`, { method: "DELETE" }), G = null, q());
	});
}
function Zi(e) {
	let t = K.cid === "room", n = t ? {
		id: "room",
		scope: "room",
		title: m("Esta sala")
	} : G.find((e) => e.id === K.cid), r = t ? Yi().find((e) => e.tool === K.tool) : n?.apps.find((e) => e.tool === K.tool);
	if (!n || !r) {
		if (t && !A.filesAll) {
			e.innerHTML = `<div class="empty">${m("Carregando…")}</div>`;
			return;
		}
		return !t && !K.retried ? (K.retried = !0, G = null, q()) : (K = null, z(m("Esse app não está nas conexões que você pode usar nesta sala.")), q());
	}
	let i = `${n.id}/${r.tool}${t ? `@${r.file.id}` : ""}`, a = t ? r.tool : `${n.id}/${r.tool}`, o = e.querySelector(".connBar");
	if (e.querySelector(".connFrame")?.dataset.app === i) {
		o?.querySelector(".pinBtn")?.replaceWith(Object.assign(document.createElement("template"), { innerHTML: fa("app", a) }).content), o && pa(o);
		return;
	}
	e.innerHTML = `<div class="connBar"><button type="button" class="ghost" id="connBack">← Apps</button><b>${g(r.title)}</b>${Ji(n)}${fa("app", a)}<button type="button" class="ghost" id="connReload" title="${m("Recarregar")}" aria-label="${m("Recarregar")}">↻</button></div><div class="appAsk" id="appAsk" hidden></div><iframe class="connFrame" sandbox="allow-scripts allow-forms" title="${g(r.title)}"></iframe>`;
	let s = e.querySelector(".connFrame");
	s.dataset.app = i, document.getElementById("connBack").onclick = () => {
		K = null, q();
	}, pa(e.querySelector(".connBar")), document.getElementById("connReload").onclick = () => {
		s.dataset.app = "", Zi(e);
	}, ca(s, n, r);
}
var Qi = (e) => Array.isArray(e) ? e.filter((e) => e?.type === "text").map((e) => e.text).join("\n") : "", $i = (e) => ({
	content: [{
		type: "text",
		text: typeof e == "string" ? e : JSON.stringify(e)
	}],
	...e && typeof e == "object" ? { structuredContent: e } : {}
}), ea = Promise.resolve();
function ta(e, t, n) {
	let r = () => new Promise((r) => {
		if (!e?.isConnected) return r(!1);
		e.hidden = !1, e.innerHTML = `<span>${m("Este app quer {what}, como você:", { what: g(t) })}</span><q></q><div><button type="button" class="primary">${m("Permitir")}</button><button type="button" class="ghost">${m("Cancelar")}</button></div>`, e.querySelector("q").textContent = String(n).slice(0, 600);
		let i = (t) => {
			e.hidden = !0, e.innerHTML = "", r(t);
		};
		e.querySelector(".primary").onclick = () => i(!0), e.querySelector(".ghost").onclick = () => i(!1);
	});
	return ea = ea.then(r, r);
}
var na = [
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
function ra({ thread: e = "main", limit: t = 50 } = {}) {
	let n = Y().filter((t) => t.thread === e).slice(-Math.min(Math.max(Number(t) || 50, 1), 100));
	return {
		room: {
			id: A.id,
			title: N()
		},
		me: {
			email: A.me,
			name: v(A.me)
		},
		members: (A.members || []).map((e) => ({
			email: e.email ?? e,
			name: v(e.email ?? e)
		})),
		doc: A.doc || "",
		epics: A.epics.filter((e) => !e.archived).map((e) => ({
			id: e.id,
			title: e.title,
			tasks: e.tasks.map((e) => ({
				id: e.id,
				title: e.title,
				status: e.status,
				owner: e.owner || null
			}))
		})),
		room_tasks: (A.roomTasks || []).map((e) => ({
			id: e.id,
			title: e.title,
			status: e.status
		})),
		messages: n.map((e) => ({
			id: e.id,
			from: e.author === "ai" ? "@vibe" : v(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
async function ia(e, t = {}, n) {
	let r = (e) => $i(e), i = (e) => e && e !== "main" && !A.epics.some((t) => t.id === e) ? null : e || "main";
	switch (e) {
		case "vibebook_read": return r(ra(t));
		case "vibebook_connections": return Array.isArray(G) || await qi(), r((G || []).map((e) => ({
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
			} : await n(m("postar"), a) ? (M({
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
			let e = t.epic_id && t.epic_id !== "main" ? A.epics.find((e) => e.id === t.epic_id) : null;
			if (t.epic_id && t.epic_id !== "main" && !e) return {
				isError: !0,
				content: [{
					type: "text",
					text: "no such epic"
				}]
			};
			let i = String(t.title || "").trim().slice(0, 200);
			return !i || !await n(m("criar uma tarefa"), `${e ? e.title : m("sala principal")}: ${i}`) ? {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			} : (M({
				t: "task.add",
				epic: e ? e.id : "main",
				title: i
			}), r("added"));
		}
		case "vibebook_task_status": {
			let e = [...A.epics.flatMap((e) => e.tasks), ...A.roomTasks || []].find((e) => e.id === t.task_id);
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
			} : await n(m("mover uma tarefa"), `${e.title} → ${t.status}`) ? (M({
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
			Array.isArray(G) || await qi();
			let e = (G || []).find((e) => e.id === t.connection_id), r = e?.tools.find((e) => e.name === t.tool);
			return r ? await n(m("usar {tool} em {conn}", {
				tool: r.name,
				conn: e.title
			}), JSON.stringify(t.arguments || {})) ? (await S(`/api/books/${A.id}/connections/${e.id}/call`, {
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
var aa = /* @__PURE__ */ new WeakMap();
function oa(e, t) {
	let n = (t) => e.contentWindow?.postMessage({
		jsonrpc: "2.0",
		...t
	}, "*"), r = (e, n) => ta(t.ask(), e, n), i = (e, n) => t.call ? t.call(e, n || {}) : ia(e, n || {}, r), a = () => document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches;
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
							locale: p,
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							platform: V.matches ? "mobile" : "web",
							user: {
								email: A.me,
								name: v(A.me)
							},
							room: {
								id: A.id,
								title: N()
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
				case "tools/list": return s({ tools: t.call ? [] : na });
				case "tools/call": return s(await i(o.params?.name, o.params?.arguments));
				case "ui/open-link": {
					let e = String(o.params?.url || "");
					return !/^https?:\/\//i.test(e) || !await r(m("abrir um link"), e) ? s({ isError: !0 }) : (window.open(e, "_blank", "noopener"), s({}));
				}
				case "ui/message": {
					let e = Qi(o.params?.content).trim().slice(0, 4e3);
					return s(e ? await ia("vibebook_post", {
						text: e,
						thread: t.thread ?? j
					}, r) : {});
				}
				case "ui/update-model-context": {
					let e = Qi(o.params?.content) || (o.params?.structuredContent ? JSON.stringify(o.params.structuredContent) : "");
					return e && t.base && S(`${t.base}/context`, {
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
function sa(e) {
	if (!aa.has(e)) {
		let t = e.closest(".embedBox"), n = j;
		aa.set(e, oa(e, {
			embed: !0,
			thread: n,
			ask: () => t.querySelector(".appAsk") || t.appendChild(Object.assign(document.createElement("div"), {
				className: "appAsk",
				hidden: !0
			}))
		}));
	}
	return aa.get(e);
}
addEventListener("message", (e) => {
	let t = e.data;
	if (!t || !A || e.origin !== "null") return;
	let n = document.querySelector(".connFrame"), r = n?.contentWindow === e.source ? n : [...document.querySelectorAll("iframe.embed")].find((t) => t.contentWindow === e.source);
	if (r) {
		if (t.vbEmbed === 1) return sa(r)(typeof t.h == "number" ? {
			method: "ui/notifications/size-changed",
			params: { height: t.h }
		} : {
			method: "ui/message",
			params: { content: [{
				type: "text",
				text: String(t.send || "")
			}] }
		});
		t.jsonrpc === "2.0" && typeof t.method == "string" && (aa.get(r) || sa(r))(t);
	}
});
async function ca(e, t, n) {
	let r = t.id === "room", i = `/api/books/${A.id}/connections/${t.id}`, a = () => document.getElementById("appAsk");
	if (r) {
		aa.set(e, oa(e, {
			ask: a,
			tool: {
				name: n.tool,
				title: n.title
			},
			first: Promise.resolve($i(ra()))
		})), e.src = `/api/books/${A.id}/files/${n.file.id}`;
		return;
	}
	let o;
	try {
		o = await S(`${i}/ui?tool=${encodeURIComponent(n.tool)}`);
	} catch (t) {
		let n = document.createElement("div");
		n.className = "empty", n.textContent = t.message, e.replaceWith(n);
		return;
	}
	let s = (e, t) => S(`${i}/call`, {
		name: e,
		arguments: t
	}).then((e) => e.result), c = s(n.tool, {}).catch((e) => ({
		isError: !0,
		content: [{
			type: "text",
			text: e.message
		}]
	}));
	aa.set(e, oa(e, {
		ask: a,
		call: s,
		first: c,
		tool: o.tool,
		base: i,
		toolName: n.tool
	})), e.srcdoc = o.html;
}
function la() {
	let e = document.getElementById("remPane");
	if (!e || !A) return;
	Gr();
	let t = A.reminders || [], n = t.filter((e) => e.error).length;
	document.getElementById("remCount").textContent = t.length ? ` ${t.length}${n ? " ⚠" : ""}` : "", Zt("reminders", e, {
		room: A,
		thread: j,
		vb: $t(),
		send: M
	});
}
function ua() {
	let e = document.getElementById("filesPane");
	if (!e || !A) return;
	Gr();
	let t = A.filesN ?? A.files?.length ?? 0;
	document.getElementById("fileCount").textContent = t ? ` ${t}` : "", Zt("files", e, {
		room: A,
		thread: j,
		vb: $t(),
		send: M
	});
}
var da = (e, t) => (A.pins || []).find((n) => n.kind === e && n.ref === t), fa = (e, t) => {
	let n = !!da(e, t);
	return `<button type="button" class="ghost pinBtn${n ? " on" : ""}" data-pin-kind="${e}" data-pin-ref="${g(t)}" title="${m(n ? "Desafixar" : "Fixar na lateral")}" aria-label="${m(n ? "Desafixar" : "Fixar na lateral")}" aria-pressed="${n}">${T("pin", 14)}</button>`;
};
function pa(e) {
	e.querySelectorAll("[data-pin-kind]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation();
		let n = da(e.dataset.pinKind, e.dataset.pinRef);
		M(n ? {
			t: "pin.del",
			id: n.id
		} : {
			t: "pin.add",
			kind: e.dataset.pinKind,
			ref: e.dataset.pinRef
		});
	});
}
var ma = 60, J = {
	thread: null,
	n: ma
}, ha = {}, ga = !1, _a = /* @__PURE__ */ new Set(), Y = () => A.origins?.length ? [...A.messages, ...A.origins.filter((e) => !A.messages.some((t) => t.id === e.id))] : A.messages, va = !1;
function ya() {
	if (!A) return;
	let e = r(`/b/${A.id}${j !== "main" && !F() ? `?t=${encodeURIComponent(j)}` : ""}`, location.href, "svelte");
	location.pathname + location.search !== e && f[va ? "pushState" : "replaceState"](null, "", e), va = !0;
}
function ba() {
	let e = document.getElementById("thFiles");
	if (!e) return;
	let t = /* @__PURE__ */ new Map();
	if (j !== "main" && !F()) {
		for (let e of Y()) if (e.thread === j) for (let n of e.files || []) {
			let r = t.get(n.name);
			r ? (r.n++, e.ts > r.ts && (r.f = n, r.ts = e.ts)) : t.set(n.name, {
				f: n,
				ts: e.ts,
				n: 1
			});
		}
	}
	let n = [...t.values()].sort((e, t) => t.ts - e.ts).slice(0, 8);
	e.hidden = !n.length, e.innerHTML = n.length ? `<span class="thfL">${T("paperclip", 14)} ${m("Arquivos deste épico")}</span>${n.map(({ f: e, n: t }) => `<a href="${Zr(e)}" target="_blank" rel="noopener" ${Qr(e)} title="${g(e.name)}">${Bt(e, 14)}<span>${g(e.name)}</span>${t > 1 ? `<small>v${t}</small>` : ""}</a>`).join("")}` : "";
}
function X(e) {
	Fr(), ba(), ya(), Si(), Xr();
	let t = document.getElementById("msgs");
	if (h.querySelector(".book")?.classList.toggle("pre", F()), F()) return Xt("chat"), Pn(t);
	if (J.thread !== j || J.room !== A.id) {
		let e = h.querySelector(".book"), t = Dr(j).some((e) => e.ref.startsWith("t")) || !!A.epics.find((e) => e.id === j)?.tasks.some((e) => !e.done && e.owner === A.me);
		j !== "main" && e?.classList.contains("nodoc") && !e.classList.contains("boardview") && (t || !A.messages.some((e) => e.thread === j)) && e.classList.remove("nodoc"), (j !== "main" || Dr(j).length) && setTimeout(() => {
			let e = [...document.querySelectorAll(".task.waitTask, .msg.waitMsg .txt")];
			e.length || (e = [...document.querySelectorAll(".task.mine")]), e[0]?.classList.contains("task") && e[0].scrollIntoView({
				block: "center",
				behavior: "smooth"
			}), e.forEach((e) => {
				e.classList.remove("shimmer"), e.offsetWidth, e.classList.add("shimmer");
			});
		}, 400);
	}
	(J.thread !== j || J.room !== A.id) && (J = {
		thread: j,
		room: A.id,
		n: ma
	});
	let n = A.messages.filter((e) => e.thread === j && !Mi(e) && !ji(e) && !ji(A.messages.find((t) => t.id === e.reply_to)));
	Ut && n.length < ma && !ga && !A.complete && !A.full?.includes(j) && !ha[A.id + j] && !_a.has(A.id + j) && (_a.add(A.id + j), ga = !0, M({
		t: "older",
		thread: j,
		before: n[0]?.id ?? 0
	}));
	let r = Ii(n.slice(-J.n)), i = n.length > r.length || n.length && !A.complete && !A.full?.includes(j) && !ha[A.id + j], a = t.scrollHeight, o = t.scrollTop, s = A.epics.find((e) => e.id === j)?.from_msg, c = s && (A.messages.find((e) => e.id === s) || A.origins?.find((e) => e.id === s)), l = A.counts ? (A.counts[j] ?? 0) + n.filter((e) => e.id > (A.countsAt ?? 0)).length : n.length;
	Zt("chat", t, {
		room: A,
		thread: j,
		list: r,
		previous: n[n.length - r.length - 1],
		more: i,
		origin: c || null,
		replyCount: l,
		vb: en(),
		onloadolder: Sa
	}), Er(), vi(), e === "stay" ? (t.scrollTop = o, wa(), Da(t)) : e ? (t.scrollTop = o + t.scrollHeight - a, wa(), Da(t)) : (Oa(!0), Da(t), wa());
}
function xa() {
	let e = A.messages.filter((e) => e.thread === j);
	ga = !0, M({
		t: "older",
		thread: j,
		before: e[0]?.id ?? 0
	});
}
function Sa() {
	if (ga || F()) return;
	let e = A.messages.filter((e) => e.thread === j);
	if (e.length > J.n) return J.n += ma, X(!0);
	A.complete || A.full?.includes(j) || ha[A.id + j] || !e.length || (ga = !0, M({
		t: "older",
		thread: j,
		before: e[0].id
	}));
}
var Ca = (e) => String(e ?? "").replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function wa() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".mfoot").forEach((e) => e.remove());
	let t = {}, n = (e) => t[e] ??= {
		st: [],
		rd: []
	}, r = (e) => m("{via} de {who}", {
		via: g(Ca(e.who)),
		who: g(v(e.email))
	}), i = /* @__PURE__ */ new Set();
	for (let e of A.acks || []) {
		if (e.status === "dismissed") continue;
		let t = `${e.msg_id}|${e.who}|${e.email}`;
		if (i.has(t)) continue;
		i.add(t);
		let a = e.status === "doing" && Date.now() - e.ts < 12e5, o = r(e), s = `<time title="${g(new Date(e.ts).toLocaleString(p))}">${x(e.ts)}</time>`, c, l, u;
		if (e.status === "blocked") c = "need", l = "⏸", u = `${m("{who} espera você no terminal", { who: o })}${e.note ? `: <b>${g(e.note)}</b>` : ""} · ${s}`;
		else if (a) c = "doing", l = "<span class=\"spin\"></span>", u = `${m("{who} está fazendo isso", { who: o })} · ${s}`;
		else if (e.status === "done") c = "did", l = "✓", u = m("{who} fez isso", { who: o });
		else {
			let t = [...new Set((A.epics || []).filter((t) => t.from_msg === e.msg_id && !t.archived).flatMap((e) => e.tasks.filter((e) => e.status !== "done" && e.owner).map((e) => v(e.owner))))];
			t.length ? (c = "wait", l = "⏳", u = m("aguardando {who}", { who: t.map(g).join(", ") })) : (c = "idle", l = "–", u = `${m("{who} parou", { who: o })} · ${s}`);
		}
		n(e.msg_id).st.push(`<span class="ms ${c}"><i>${l}</i><span>${u}</span></span>`);
	}
	let a = A.messages.filter((e) => e.thread === j);
	for (let e of A.receipts || []) {
		let t = a.findLast((t) => t.id <= Math.max(e.read, e.delivered) && (t.kind !== "agent" || t.author !== e.email));
		if (!t || i.has(`${t.id}|${e.who}|${e.email}`)) continue;
		let o = e.read >= t.id, s = r(e);
		n(t.id).rd.push(`<span class="${o ? "rd" : ""}" title="${m(o ? "lido por {who}" : "entregue, ainda não lido por {who}", { who: s })}">${o ? "✓✓" : "✓"} ${g(Ca(e.who))}</span>`);
	}
	for (let [e, n] of Object.entries(t)) {
		let t = document.querySelector(`#m${e} .body`);
		t && t.insertAdjacentHTML("beforeend", `<div class="mfoot">${n.st.join("")}${n.rd.length ? `<span class="mr">${n.rd.join("")}</span>` : ""}</div>`);
	}
}
function Ta(e) {
	X(Z || e.author === A.me && e.kind !== "agent" ? void 0 : "stay");
}
var Z = !0, Ea = new ResizeObserver(() => {
	let e = document.getElementById("msgs");
	e && Z && (e.scrollTop = e.scrollHeight);
});
function Da(e) {
	e && (e.classList?.contains("msg") ? [e] : e.querySelectorAll(".msg")).forEach((e) => Ea.observe(e));
}
function Oa(e) {
	let t = document.getElementById("msgs");
	if (t) {
		t.onscroll ??= () => {
			t.scrollHeight - t.scrollTop - t.clientHeight < 80 ? Z = !0 : t.scrollTop < (t._lastTop ?? 0) - 2 && (Z = !1), t._lastTop = t.scrollTop, t.scrollTop < 150 && !Z && Sa();
		}, Ea.observe(t), t._mo ??= new MutationObserver((e) => {
			for (let t of e) t.addedNodes.forEach((e) => e.nodeType === 1 && Ea.observe(e));
			Z && (t.scrollTop = t.scrollHeight);
		}), t._mo.observe(t, { childList: !0 });
		for (let e of t.children) Ea.observe(e);
		e && (Z = !0), (e || t.scrollHeight - t.scrollTop - t.clientHeight < 200) && (t.scrollTop = t.scrollHeight);
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
			i.classList.add("err"), i.textContent = `${m("Diagrama com erro")}${e.line ? ` ${m("na linha {n}", { n: e.line })}` : ""}: ${e.message}`;
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
var Q = !1, Pa = null, Fa = /* @__PURE__ */ new Set(), Ia = () => !Q && !F() && A.epics.some((e) => e.id === j) ? j : null;
function $(e) {
	let t = document.getElementById("doc");
	if (!t) return;
	A.docs ??= {};
	let n = Ia(), r = n && A.epics.find((e) => e.id === n);
	n && !(n in A.docs) && !Fa.has(A.id + n) && (Fa.add(A.id + n), M({
		t: "doc.get",
		epic: n
	}));
	let i = n ? A.docs[n] || `# ${r.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n` : A.doc;
	Pa !== (n || "room") && (e = !0, Pa = n || "room"), xn();
	let a = !F() && A.epics.find((e) => e.id === j), o = document.getElementById("docCrumb");
	o.hidden = !a, a && (o.innerHTML = `<button type="button" class="${n ? "" : "sel"}" data-docroom="1">${g(N())}</button><span>›</span><button type="button" class="${n ? "sel" : ""}" data-docroom="">${g(a.title)}</button>`, o.querySelectorAll("button").forEach((e) => e.onclick = () => {
		Q = !!e.dataset.docroom, $(!0);
	}));
	let s = document.getElementById("preview"), c = document.getElementById("tasks");
	c && document.getElementById("tasksHome").append(c), s.innerHTML = i.trim() ? DOMPurify.sanitize(marked.parse(i, {
		breaks: !0,
		gfm: !0
	}), {
		...xe,
		FORBID_TAGS: xe.FORBID_TAGS.filter((e) => e !== "img"),
		ADD_ATTR: ["target"]
	}) : `<div class="empty">${m("Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.")}</div>`, s.querySelectorAll("a").forEach((e) => {
		e.target = "_blank", e.rel = "noopener noreferrer nofollow ugc";
	}), !n && A.docNotes?.length && s.insertAdjacentHTML("afterbegin", `<div class="docNotes" title="${m("@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).")}">${A.docNotes.map((e) => `<span class="vnote">${T("alert", 12)} ${g(e)}</span>`).join("")}</div>`), Ma(s), Na(s, n || (j === "main" && A.roomTasks?.length ? "main" : null)), Gr(), (e || document.activeElement !== t) && (t.value = i);
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
			displayName: m("vibebook (trava do app)")
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
	e.id = "lockScreen", e.innerHTML = `<img src="/favicon.svg" alt="" width="64" height="64" /><b>vibebook</b><button class="primary">${m("Desbloquear com Face ID")}</button><p class="err" hidden></p>`, document.body.append(e);
	let t = async () => {
		try {
			await Ba(), e.remove();
		} catch {
			let t = e.querySelector(".err");
			t.hidden = !1, t.textContent = m("Toque pra tentar de novo.");
		}
	};
	e.querySelector("button").onclick = t;
}
var Ua = 0;
document.addEventListener("visibilitychange", () => {
	document.hidden ? Ua = Date.now() : Ua && Date.now() - Ua > La && Ha();
}), Ha(), et();
