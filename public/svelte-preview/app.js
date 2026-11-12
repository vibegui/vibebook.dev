import { a as e, i as t, o as n, r, s as i, t as a } from "./main-BZ5YI00o.js";
// shared/uiVariant.ts
function o(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/navigation.ts
function s(e, t, n) {
	let r = (e) => e == null ? e : o(e, t(), n);
	return {
		pushState(t, n, i) {
			e.pushState(t, n, r(i));
		},
		replaceState(t, n, i) {
			e.replaceState(t, n, r(i));
		}
	};
}
// svelte/roomConnection.ts
function c(e) {
	let t = e.schedule ?? setTimeout, r = e.cancel ?? clearTimeout, a = e.createSocket ?? ((e) => new WebSocket(e)), o = null, s, c, l = !1, u = !1, d = 0, f = "", p = () => {
		s !== void 0 && r(s), c !== void 0 && r(c), s = c = void 0;
	}, ee = () => {
		l = !0, p();
		let e = o;
		o = null, e && (e.onopen = e.onmessage = e.onclose = null, e.close());
	}, m = () => {
		if (l) return;
		s = void 0;
		let r = a(e.url(f));
		o = r;
		let i = () => !l && o === r;
		r.onopen = () => {
			i() && (c = t(() => {
				i() && (c = void 0, r.readyState === 1 && (d = 0));
			}, 15e3));
		}, r.onmessage = (t) => {
			if (!i()) return;
			let r = n(t.data);
			r.t === "state" && (u = !0), e.onEvent(r);
		}, r.onclose = (n) => {
			i() && (o = null, p(), r.onopen = r.onmessage = r.onclose = null, n.code === 4003 ? (ee(), e.onRemoved()) : !u && n.code !== 1e3 ? (ee(), e.onUnavailable()) : (f = String(n.code || ""), s = t(m, Math.min(3e4, 1e3 * 2 ** d++))));
		};
	};
	return {
		start() {
			!o && s === void 0 && !l && m();
		},
		dispose: ee,
		send(e) {
			return i(o, e);
		},
		resync() {
			o?.close();
		}
	};
}
// svelte/legacy/host.js
var l = s(history, () => location.href, "svelte"), u = document.cookie.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] || (/^pt/i.test(navigator.language) ? "pt" : /^en/i.test(navigator.language) ? "en" : "pt");
document.documentElement.lang = u === "en" ? "en" : "pt-BR";
var d = u === "en" ? "en-US" : "pt-BR", f = {
	"Dono: {who}": "Owner: {who}",
	"clique pra trocar": "click to change",
	"Sem dono · clique pra escolher": "No owner · click to pick one",
	"Dono do épico": "Epic owner",
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
}, p = (e, t) => {
	let n = u === "en" && f[e] !== void 0 ? f[e] : e;
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}, ee = () => `<span class="langSw" role="group" aria-label="Idioma / Language">${["pt", "en"].map((e) => `<button type="button" class="${u === e ? "sel" : ""}" data-lang="${e}" aria-pressed="${u === e}">${e.toUpperCase()}</button>`).join("<i>·</i>")}</span>`;
document.addEventListener("click", (e) => {
	let t = e.target.closest?.("[data-lang]");
	t && t.dataset.lang !== u && (document.cookie = `vb_lang=${t.dataset.lang}; path=/; max-age=31536000; samesite=lax`, location.reload());
});
var m = document.getElementById("app"), h = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), te = [
	"#ff5a36",
	"#1f9d8a",
	"#3b6cf6",
	"#c2410c",
	"#9333ea",
	"#0f766e",
	"#be185d",
	"#4d7c0f"
], g = (e) => te[[...e].reduce((e, t) => e + t.charCodeAt(0), 0) % te.length], ne = {}, _ = (e) => e === "ai" ? "@vibe" : j?.names?.[e] || ne[e] || e.split("@")[0], re = {}, v = (e, t) => {
	if (e === "ai") return "<span class=\"avatar ai\">✦</span>";
	let n = j?.avatars?.[e] ?? re[e];
	return n ? `<span class="avatar pic ${t ? "on" : ""}" title="${h(_(e))}"><img src="/api/avatar/${encodeURIComponent(e)}?v=${n}" alt="" loading="lazy" /></span>` : `<span class="avatar ${t ? "on" : ""}" style="background:${g(e)}" title="${h(_(e))}">${h(_(e).slice(0, 2).toUpperCase())}</span>`;
}, ie = (e) => {
	let t = String(e || "");
	return /codex|gpt|openai|\bo[1-9]\b/i.test(t) ? ["codex", "◎"] : /gemini/i.test(t) ? ["gemini", "✦"] : /cursor/i.test(t) ? ["cursor", "▲"] : /copilot/i.test(t) ? ["copilot", "◉"] : ["", "✻"];
}, ae = (e, t) => {
	let [n, r] = ie(t);
	return `<span class="avatar claude${n ? ` ${n}` : ""}" title="${p("{via} de {who}", {
		via: h(ma(t) || "Agent"),
		who: h(_(e))
	})}">${r}${v(e)}</span>`;
}, y = (e) => {
	let t = Math.round((Date.now() - e) / 6e4);
	return t < 1 ? p("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
}, oe = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, ""), se = (e) => {
	let t = e.split("@")[0];
	return [
		oe(j?.names?.[e]?.split(/\s+/)[0] || ne[e]?.split(/\s+/)[0] || ""),
		oe(t.split(/[._+-]/)[0]),
		oe(t)
	].filter(Boolean);
}, ce = (e) => se(e)[0], le = (e) => {
	let t = oe(e);
	return t === "vibe" || t === "ai" ? "ai" : (j?.members || []).find((e) => se(e).includes(t)) || null;
}, b = (e) => e.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (e, t, n) => {
	let r = le(n);
	return r ? `${t}<span class="mention${r === j?.me ? " me" : ""}" title="${h(r === "ai" ? "@vibe" : r)}">@${n}</span>` : e;
}), x = "<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>", ue = (e) => e.replace(/<a ([^>]*?)href="https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o, s) => {
	if (/^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(n)) return e;
	let c = e.match(/href="([^"]*)"/)[1], l = i === "commit" ? `${n}/${r}@${a.slice(0, 7)}` : i ? `${n}/${r} #${a}` : `${n}/${r}`, u = s.replace(/<[^>]*>/g, "").trim(), d = !u || u === c || /^https?:\/\//.test(u) ? h(l) : s;
	return `<a ${t}href="${c}"${o} class="ghchip" title="${h(l)}">${x}<span>${d}</span></a>`;
}), de = (e) => e.replace(/<a ([^>]*?)href="(https?:\/\/[^"\/]+)?\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o) => {
	if (!j?.id || r !== j.id || n && n !== location.origin) return e;
	let s = (j.files || []).find((e) => e.id === i) || X().flatMap((e) => e.files || []).find((e) => e.id === i), c = o.replace(/<[^>]*>/g, "").trim(), l = s?.name || (c && !/^https?:\/\//.test(c) ? c : "arquivo"), u = s ? qr(s.name) : [], d = u.length > 1 ? u.length - u.findIndex((e) => e.id === i) : 0;
	return `<a ${t}href="/api/books/${r}/files/${i}"${a} class="fchip" title="${h(l)}">${jt(s || { type: /\.html?$/i.test(l) ? "text/html" : "" }, 14)}<span>${h(l)}</span>${d ? `<small>v${d}</small>` : ""}</a>`;
}), fe = JSON.parse("{\"point_up\": \"☝️\", \"point_up_2\": \"👆\", \"point_down\": \"👇\", \"point_left\": \"👈\", \"point_right\": \"👉\", \"+1\": \"👍\", \"thumbsup\": \"👍\", \"-1\": \"👎\", \"thumbsdown\": \"👎\", \"ok_hand\": \"👌\", \"clap\": \"👏\", \"pray\": \"🙏\", \"raised_hands\": \"🙌\", \"wave\": \"👋\", \"muscle\": \"💪\", \"eyes\": \"👀\", \"fire\": \"🔥\", \"rocket\": \"🚀\", \"tada\": \"🎉\", \"100\": \"💯\", \"heart\": \"❤️\", \"heart_eyes\": \"😍\", \"smile\": \"😄\", \"smiley\": \"😃\", \"grin\": \"😁\", \"joy\": \"😂\", \"rofl\": \"🤣\", \"laughing\": \"😆\", \"sweat_smile\": \"😅\", \"wink\": \"😉\", \"blush\": \"😊\", \"slightly_smiling_face\": \"🙂\", \"upside_down_face\": \"🙃\", \"thinking_face\": \"🤔\", \"thinking\": \"🤔\", \"neutral_face\": \"😐\", \"expressionless\": \"😑\", \"unamused\": \"😒\", \"roll_eyes\": \"🙄\", \"face_with_rolling_eyes\": \"🙄\", \"grimacing\": \"😬\", \"sweat\": \"😓\", \"cry\": \"😢\", \"sob\": \"😭\", \"scream\": \"😱\", \"rage\": \"😡\", \"angry\": \"😠\", \"sunglasses\": \"😎\", \"nerd_face\": \"🤓\", \"sleeping\": \"😴\", \"exploding_head\": \"🤯\", \"partying_face\": \"🥳\", \"shrug\": \"🤷\", \"facepalm\": \"🤦\", \"white_check_mark\": \"✅\", \"heavy_check_mark\": \"✔️\", \"check\": \"✔️\", \"x\": \"❌\", \"warning\": \"⚠️\", \"no_entry\": \"⛔\", \"question\": \"❓\", \"exclamation\": \"❗\", \"bulb\": \"💡\", \"memo\": \"📝\", \"pushpin\": \"📌\", \"link\": \"🔗\", \"lock\": \"🔒\", \"unlock\": \"🔓\", \"key\": \"🔑\", \"bug\": \"🐛\", \"wrench\": \"🔧\", \"hammer\": \"🔨\", \"gear\": \"⚙️\", \"zap\": \"⚡\", \"star\": \"⭐\", \"sparkles\": \"✨\", \"boom\": \"💥\", \"hourglass\": \"⌛\", \"alarm_clock\": \"⏰\", \"calendar\": \"📅\", \"chart_with_upwards_trend\": \"📈\", \"chart_with_downwards_trend\": \"📉\", \"moneybag\": \"💰\", \"money_with_wings\": \"💸\", \"dart\": \"🎯\", \"trophy\": \"🏆\", \"coffee\": \"☕\", \"beer\": \"🍺\", \"pizza\": \"🍕\", \"see_no_evil\": \"🙈\", \"hugs\": \"🤗\", \"hugging_face\": \"🤗\", \"handshake\": \"🤝\", \"crossed_fingers\": \"🤞\", \"writing_hand\": \"✍️\", \"skull\": \"💀\", \"ghost\": \"👻\", \"robot_face\": \"🤖\", \"robot\": \"🤖\", \"brain\": \"🧠\", \"speech_balloon\": \"💬\", \"mag\": \"🔍\", \"computer\": \"💻\", \"iphone\": \"📱\", \"package\": \"📦\", \"construction\": \"🚧\", \"rotating_light\": \"🚨\", \"sos\": \"🆘\", \"green_heart\": \"💚\", \"blue_heart\": \"💙\", \"purple_heart\": \"💜\", \"yellow_heart\": \"💛\", \"broken_heart\": \"💔\", \"dog\": \"🐶\", \"cat\": \"🐱\", \"sun\": \"☀️\", \"rainbow\": \"🌈\", \"rain\": \"🌧️\", \"snowflake\": \"❄️\", \"earth_americas\": \"🌎\", \"brazil\": \"🇧🇷\", \"flag-br\": \"🇧🇷\", \"checkered_flag\": \"🏁\", \"arrow_up\": \"⬆️\", \"arrow_down\": \"⬇️\", \"arrow_right\": \"➡️\", \"arrow_left\": \"⬅️\", \"heavy_plus_sign\": \"➕\", \"heavy_minus_sign\": \"➖\", \"red_circle\": \"🔴\", \"large_green_circle\": \"🟢\", \"green_circle\": \"🟢\", \"large_yellow_circle\": \"🟡\", \"yellow_circle\": \"🟡\", \"white_circle\": \"⚪\", \"black_circle\": \"⚫\"}"), pe = (e) => e.replace(/:([a-z0-9_+-]{1,40}):/g, (e, t) => fe[t] ?? e), me = (e) => de(ue(pe(e).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g, (e) => `<a href="${e}" target="_blank" rel="noopener noreferrer nofollow ugc">${e}</a>`))), he = {
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
}, ge = (e) => DOMPurify.sanitize(de(ue(DOMPurify.sanitize(marked.parse(pe(e), {
	breaks: !0,
	gfm: !0
}), he).replace(/<a (?!href="#(?:m\d+|e[\w-]+|doc[\w:-]*)")/g, "<a target=\"_blank\" rel=\"noopener noreferrer nofollow ugc\" ").replace(/<a href="#m(\d+)"/g, "<a class=\"mlink\" href=\"#m$1\" data-msg=\"$1\"").replace(/<a href="#(e[\w-]+|doc[\w:-]*)"/g, "<a class=\"mlink\" href=\"#$1\" data-cardgo=\"#$1\""))), {
	...he,
	ADD_ATTR: ["target"]
}), S = async (e, t) => {
	let n = await fetch(e, t ? {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(t)
	} : {});
	if (n.status === 401) throw location.href = o(`/login?next=${encodeURIComponent(location.pathname + location.search)}`, location.href, "svelte"), Error("unauthenticated");
	if (!n.ok) throw Error((await n.json().catch(() => ({}))).error || n.statusText);
	return n.json();
}, C = document.getElementById("switcher"), w = null, T = [], _e = (e) => e.some((e) => /^[ab]\d/.test(e.ref)) ? " cl" : "", ve = {
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
}, E = (e, t = 16) => `<svg class="i" viewBox="0 0 24 24" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ve[e]}</svg>`, ye = "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"22\" height=\"24\" rx=\"5\" fill=\"#fff\"/><rect x=\"7\" y=\"9\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><rect x=\"7\" y=\"15\" width=\"8\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><circle cx=\"24\" cy=\"23\" r=\"7\" fill=\"#f2dc4a\"/></svg>", be = E("search", 18), xe = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round">${[
	0,
	60,
	120
].map((e) => `<line x1="12" y1="3.5" x2="12" y2="20.5" transform="rotate(${e} 12 12)"/>`).join("")}</g></svg>`, Se = E("plus", 18);
if (window.visualViewport) {
	let e = () => {
		document.documentElement.style.setProperty("--vvh", `${Math.round(visualViewport.height)}px`), innerWidth <= 900 && scrollY && document.querySelector(".book") && scrollTo(0, 0);
	};
	visualViewport.addEventListener("resize", e), visualViewport.addEventListener("scroll", e), e();
}
var D = {
	auto: {
		label: p("Tema automático (do sistema)"),
		next: "light",
		icon: E("contrast", 18)
	},
	light: {
		label: p("Tema claro"),
		next: "dark",
		icon: E("sun", 18)
	},
	dark: {
		label: p("Tema escuro"),
		next: "auto",
		icon: E("moon", 18)
	}
}, O = () => document.documentElement.dataset.theme || "auto";
function Ce(e) {
	e === "auto" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	try {
		e === "auto" ? localStorage.removeItem("vb.theme") : localStorage.setItem("vb.theme", e);
	} catch {}
	k();
}
var we = {
	blue: p("azul"),
	green: p("verde"),
	yellow: p("amarelo"),
	orange: p("laranja"),
	pink: p("rosa"),
	purple: p("roxo")
}, Te = Object.keys(we);
document.addEventListener("click", (e) => {
	let t = document.getElementById("tintPop");
	t && !t.hidden && !t.contains(e.target) && (t.hidden = !0);
}), document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		let e = document.getElementById("tintPop");
		e && (e.hidden = !0);
	}
});
var Ee = () => [...w || []].sort((e, t) => (e.position ?? 1e9) - (t.position ?? 1e9) || (e.created_at ?? 0) - (t.created_at ?? 0)), De = (e) => e?.icon ? `/api/books/${e.id}/icon?v=${e.icon}` : null, Oe = (e, t) => De(e) ? `<span class="tile ${t} hasIcon"><img src="${De(e)}" alt="" loading="lazy"></span>` : `<span class="tile ${t}" style="background:${pn(e.title)}">${h(F(e.title))}</span>`;
function ke(e) {
	let t = w?.find((e) => e.id === j?.id);
	t && e > t.read_id && (t.read_id = e);
}
function Ae() {
	document.body.classList.contains("has-sw") && S("/api/me?ui=svelte").then((e) => {
		Qe(e);
		let t = JSON.stringify(gr());
		w = e.books, T = e.waits || [], j?.messages?.length && ke(j.messages.at(-1).id), k(), j && JSON.stringify(gr()) !== t && (z(), Z(!0));
	}).catch(() => {});
}
var je = null, Me = 0, Ne = 0, Pe = 0;
function Fe() {
	je && je.readyState <= 1 || (je = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`), je.onopen = () => {
		Me = 0;
	}, je.onmessage = (e) => {
		let t;
		try {
			t = JSON.parse(e.data);
		} catch {
			return;
		}
		t.t === "me" && !(t.msg && t.book && t.book === j?.id) && (clearTimeout(Ne), Ne = setTimeout(Ae, 600)), t.t === "agents" && (t.book === "*" || t.book === j?.id) && (clearTimeout(Pe), Pe = setTimeout(wn, 600));
	}, je.onclose = () => {
		je = null, document.visibilityState === "visible" && setTimeout(Fe, Math.min(3e4, 1e3 * 2 ** Me++));
	});
}
document.addEventListener("visibilitychange", () => {
	document.visibilityState === "visible" && document.body.classList.contains("has-sw") && (Ae(), wn(), Fe());
});
var Ie = "";
function k() {
	vt();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1], t = !!w && location.pathname !== "/login";
	if (document.body.classList.toggle("has-sw", t), !t) {
		C.innerHTML = "";
		return;
	}
	let n = [];
	for (let e of Ee()) {
		let t = n.at(-1);
		t && e.tint && t.tint === e.tint ? t.rooms.push(e) : n.push({
			tint: e.tint || null,
			rooms: [e]
		});
	}
	let r = (e) => e.last_human_id > e.read_id ? `<b class="dot h" title="${p("mensagens novas")}"></b>` : e.last_agent_id > e.read_id ? `<b class="dot a" title="${p("agents escreveram")}"></b>` : "", i = (e) => e.busy_until > Date.now() ? `<b class="swBusy" title="${p("um agent está trabalhando aqui")}">✻</b>` : "", a = (e) => {
		let t = T.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${_e(t)}" title="${n === 1 ? p("1 coisa esperando você") : p("{n} coisas esperando você", { n })}">${n}</b>` : "";
	}, o = (e) => e.sandboxes_running ? `<b class="swCloud" title="${p("sandbox na nuvem rodando")}">☁</b>` : "", s = (e) => `<a class="sw-item" href="/b/${e.id}" data-nav data-id="${e.id}" draggable="true" data-drag aria-label="${h(e.title)}"><i class="pill"></i><span class="tw${e.sandboxes_running ? " cloud" : ""}">${Oe(e, "lg")}${r(e)}${i(e)}${a(e)}${o(e)}</span></a>`, c = `<a class="sw-item" href="/app" data-nav title="${p("Seus vibebooks")}" aria-label="${p("Seus vibebooks")}"><i class="pill"></i><span class="tile lg logo">${ye}</span></a>
    <span class="sw-sep"></span>
    ${n.map((e) => e.tint ? `<div class="sw-group" data-tint="${e.tint}">${e.rooms.map(s).join("")}</div>` : s(e.rooms[0])).join("")}
    <span class="sw-sp"></span>
    <button class="sw-btn" id="swTheme" title="${p("{theme} (clique pra trocar)", { theme: D[O()].label })}" aria-label="${p("Tema: {theme}", { theme: D[O()].label })}">${D[O()].icon}</button>
    <button class="sw-btn" id="swSearch" title="${p("Ir para um vibebook (⌘K)")}" aria-label="${p("Ir para um vibebook")}">${be}</button>
    <button class="sw-btn" id="swNew" title="${p("Novo vibebook")}" aria-label="${p("Novo vibebook")}">${Se}</button>`, l = () => {
		C.querySelectorAll(".sw-item").forEach((t) => {
			let n = t.dataset.id ? t.dataset.id === e : location.pathname === "/app";
			t.classList.toggle("on", n), n ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current");
		}), C.querySelector(".on")?.scrollIntoView({ block: "nearest" });
	};
	if (c === Ie) return l();
	Ie = c, C.innerHTML = c, l(), C.querySelectorAll("[data-drag]").forEach((e) => e.oncontextmenu = (t) => {
		t.preventDefault();
		let n = w.find((t) => t.id === e.dataset.id), r = document.getElementById("tintPop");
		r.innerHTML = `<small>${h(n.title)}</small><div>${[null, ...Te].map((e) => `<button data-tint="${e || ""}" class="${(n.tint || null) === e ? "sel" : ""}" title="${e ? we[e] : p("sem cor")}" aria-label="${e ? we[e] : p("sem cor")}"></button>`).join("")}</div>
      <p class="iconRow"><label class="ghost">${p("Trocar ícone…")}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/x-icon,.ico" hidden></label>${n.icon ? `<button class="ghost" data-noicon>${p("Tirar ícone")}</button>` : ""}</p>`, r.querySelector("input[type=file]").onchange = async (e) => {
			let t = e.target.files[0];
			if (t) {
				r.hidden = !0;
				try {
					let e = await fetch(`/api/books/${n.id}/icon`, {
						method: "POST",
						headers: { "content-type": "image/png" },
						body: await gn(t, 128)
					}).then((e) => e.json());
					if (e.error) throw Error(e.error);
					n.icon = e.icon, k(), j?.id === n.id && (_n(P()), z());
				} catch (e) {
					alert(e.message || p("Não deu pra usar essa imagem."));
				}
			}
		}, r.querySelector("[data-noicon]")?.addEventListener("click", async () => {
			r.hidden = !0, await S(`/api/books/${n.id}/icon`, {}), n.icon = null, k(), j?.id === n.id && (_n(P()), z());
		});
		let i = e.getBoundingClientRect();
		r.style.top = `${i.top}px`, r.hidden = !1, r.querySelectorAll("button[data-tint]").forEach((e) => e.onclick = () => {
			n.tint = e.dataset.tint || null, r.hidden = !0, k(), S(`/api/books/${n.id}/tint`, { tint: n.tint }).catch(() => {});
		});
	}), C.querySelectorAll("[data-drag]").forEach((e) => {
		e.ondragstart = (t) => {
			t.dataTransfer.setData("text/plain", e.dataset.id), t.dataTransfer.effectAllowed = "move";
		}, e.ondragover = (t) => {
			t.preventDefault(), e.classList.add("dropTo");
		}, e.ondragleave = () => e.classList.remove("dropTo"), e.ondrop = (t) => {
			t.preventDefault(), e.classList.remove("dropTo");
			let n = t.dataTransfer.getData("text/plain"), r = e.dataset.id;
			if (!n || n === r) return;
			let i = Ee().map((e) => e.id).filter((e) => e !== n), a = e.getBoundingClientRect();
			i.splice(i.indexOf(r) + +(t.clientY > a.top + a.height / 2), 0, n), i.forEach((e, t) => {
				let n = w.find((t) => t.id === e);
				n && (n.position = t);
			}), k(), S("/api/rooms/order", { ids: i }).catch(() => {});
		};
	}), document.getElementById("swSearch").onclick = Ke, document.getElementById("swTheme").onclick = () => Ce(D[O()].next), document.getElementById("swNew").onclick = () => ut();
}
var Le = document.getElementById("swTip");
C.addEventListener("mouseover", (e) => {
	let t = e.target.closest(".sw-item[data-id]"), n = t && w?.find((e) => e.id === t.dataset.id);
	if (!n) {
		Le.hidden = !0;
		return;
	}
	let r = (n.members || "").split(",").filter(Boolean).length, i = n.id === j?.id ? "" : n.last_human_id > n.read_id ? `<span class="tn h">● ${p("mensagens novas")}</span>` : n.last_agent_id > n.read_id ? `<span class="tn a">● ${p("agents escreveram")}</span>` : "";
	Le.innerHTML = `<b>${h(n.title)}</b>${n.summary ? `<span>${h(n.summary)}</span>` : ""}
    <small>${n.folder ? `${E("folder", 12)} ${h(n.folder)} · ` : ""}${r === 1 ? p("1 pessoa") : p("{n} pessoas", { n: r })} · ${y(n.updated_at) === p("agora") ? p("ativa agora") : p("ativa há {ago}", { ago: y(n.updated_at) })}</small>${i}`;
	let a = t.querySelector(".tile").getBoundingClientRect();
	Le.style.top = `${a.top + a.height / 2}px`, Le.hidden = !1;
}), C.addEventListener("mouseleave", () => Le.hidden = !0), C.addEventListener("click", () => Le.hidden = !0);
var Re = document.getElementById("swDlg"), A = document.getElementById("swQ"), ze = document.getElementById("swList");
C.setAttribute("aria-label", p("Seus vibebooks")), Re.setAttribute("aria-label", p("Ir para um vibebook")), A.placeholder = p("Buscar salas, conversas e arquivos…");
var Be = 0;
function Ve() {
	let e = oe(A.value), t = (w || []).filter((t) => !e || oe(t.title).includes(e) || oe(t.folder || "").includes(e)).slice(0, 12);
	Be = Math.min(Be, Math.max(0, t.length - 1));
	let n = He && He.q === A.value.trim() ? He : null;
	ze.innerHTML = (t.map((e, t) => `<a href="/b/${e.id}" data-nav class="${t === Be ? "sel" : ""}" role="option">${Oe(e, "")}<span>${h(e.title)}</span>${e.folder ? `<small>${h(e.folder)}</small>` : ""}</a>`).join("") || (n?.epics.length || n?.messages.length ? "" : `<p class="muted" style="padding:8px 10px;margin:0">${p("Nada com esse nome.")}</p>`)) + We(n);
}
var He = null, Ue = 0, We = (e) => {
	if (!e) return A.value.trim().length >= 2 ? `<p class="muted swHint">${p("Buscando nas conversas…")}</p>` : "";
	let t = (e) => new Date(e).toLocaleDateString(d, {
		day: "numeric",
		month: "short"
	}), n = e.epics.map((e) => `<a href="/b/${e.room_id}?t=${e.id}" data-hit="${e.room_id}|${e.id}|" role="option"><span class="hitIco">${e.archived ? "✓" : "#"}</span><span><b>${h(e.title)}</b><small>${h(e.room)}${e.archived ? ` · ${p("arquivado")}` : ""} · ${t(e.ts)}</small></span></a>`).join(""), r = e.messages.map((e) => `<a href="/b/${e.room_id}${e.thread === "main" ? "" : `?t=${e.thread}`}#m${e.id}" data-hit="${e.room_id}|${e.thread}|${e.id}" role="option"><span class="hitIco">${e.files.length ? E("paperclip", 14) : e.by_agent ? "✻" : "“"}</span><span><span class="hitTxt">${h(e.snippet || e.files.map((e) => e.name).join(", "))}</span><small>${h(e.room)}${e.topic ? ` › ${h(e.topic)}` : ""} · ${h(e.by_agent ? e.via || "Agent" : _(e.author))} · ${t(e.ts)}${e.files.length && e.snippet ? ` · ${h(e.files.map((e) => e.name).join(", "))}` : ""}</small></span></a>`).join("");
	return !n && !r ? `<p class="muted swHint">${p("Nada nas conversas.")}</p>` : `${n ? `<p class="swSec">${p("Épicos")}</p>${n}` : ""}${r ? `<p class="swSec">${p("Nas conversas")}</p>${r}` : ""}`;
};
function Ge() {
	clearTimeout(Ue);
	let e = A.value.trim();
	e.length < 2 ? He = null : Ue = setTimeout(async () => {
		let t = await fetch(`/api/search?q=${encodeURIComponent(e)}`).catch(() => null), n = t?.ok ? await t.json() : null;
		A.value.trim() === e && (He = n ? {
			q: e,
			epics: n.epics || [],
			messages: n.messages || []
		} : {
			q: e,
			epics: [],
			messages: []
		}, Ve());
	}, 250);
}
function Ke() {
	w && (A.value = "", Be = 0, He = null, Ve(), Re.showModal(), A.focus());
}
A.oninput = () => {
	Be = 0, Ge(), Ve();
}, A.onkeydown = (e) => {
	let t = ze.querySelectorAll("a").length;
	(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), Be = (Be + (e.key === "ArrowDown" ? 1 : t - 1)) % Math.max(t, 1), Ve()), e.key === "Enter" && (e.preventDefault(), ze.querySelectorAll("a")[Be]?.click());
}, ze.onclick = (e) => {
	let t = e.target.closest("a[data-hit]");
	if (Re.close(), !t) return;
	e.preventDefault();
	let [n, r, i] = t.dataset.hit.split("|");
	if (l.pushState(null, "", t.getAttribute("href")), qe(), !i) return;
	let a = 0, o = () => {
		if (j?.id === n && j.messages?.length) return yi(Number(i));
		++a < 25 && setTimeout(o, 200);
	};
	setTimeout(o, 150);
}, Re.onclick = (e) => {
	e.target === Re && Re.close();
}, document.addEventListener("keydown", (e) => {
	(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && document.body.classList.contains("has-sw") && (e.preventDefault(), Re.open ? Re.close() : Ke());
});
function qe() {
	Vt(), k();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (wt?.dispose(), wt = null, location.pathname === "/login") return Ye();
	if (location.pathname === "/archived") return ft();
	e ? It(e[1]) : et();
}
var Je = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><path fill=\"#FFC107\" d=\"M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z\"/><path fill=\"#FF3D00\" d=\"M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z\"/><path fill=\"#4CAF50\" d=\"M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z\"/><path fill=\"#1976D2\" d=\"M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z\"/></svg>";
async function Ye() {
	document.title = `${p("Entrar")} · vibebook`, _n(null);
	let e = new URLSearchParams(location.search), t = o(e.get("next") || "/app", location.href, "svelte"), n = await fetch("/auth/providers").then((e) => e.json()).catch(() => ({ google: !1 })), r = "", i = (e, a = "") => {
		m.innerHTML = `
    <div class="login"><div class="box">
      <a class="brand" href="/">vibebook</a>
      ${e === "email" ? `
        <h1>${p("Entrar")}</h1>
        <p>${p("Seus vibebooks e seus amigos te esperando.")}</p>
        ${n.google ? `<a class="google" href="/auth/google/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${Je} ${p("Continuar com Google")}</button></a>` : ""}${n.github ? `<a class="google" href="/auth/github/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${x.replace("<svg ", "<svg width=\"18\" height=\"18\" ")} ${p("Continuar com GitHub")}</button></a>` : ""}${n.google || n.github ? `<div class="or">${p("ou com email")}</div>` : ""}
        <form id="f"><label class="muted" for="email" style="font-size:14px">${p("Seu email")}</label>
          <input id="email" type="email" autocomplete="email" required placeholder="${p("voce@gmail.com")}" value="${h(r)}" />
          <button class="primary" id="go">${p("Mandar código")}</button>
          <p class="err" role="alert">${h(a)}</p></form>` : `
        <h1>${p("Confere seu email")}</h1>
        <p>${p("Mandamos um código de 6 dígitos para <b>{email}</b>.", { email: h(r) })}</p>
        <form id="f"><label class="muted" for="code" style="font-size:14px">${p("Código")}</label>
          <input id="code" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required pattern="[0-9]{6}" />
          <button class="primary" id="go">${p("Entrar")}</button>
          <p class="err" role="alert">${h(a)}</p>
          <button type="button" class="link" id="back">${p("usar outro email")}</button></form>`}
    </div></div>`;
		let s = document.getElementById("f");
		s.querySelector("input").focus(), document.getElementById("back")?.addEventListener("click", () => i("email")), s.onsubmit = async (n) => {
			n.preventDefault();
			let a = document.getElementById("go");
			a.disabled = !0, a.textContent = "…";
			let s = e === "email" ? "/auth/email/start" : "/auth/email/verify";
			e === "email" && (r = document.getElementById("email").value.trim());
			let c = e === "email" ? { email: r } : {
				email: r,
				code: document.getElementById("code").value,
				next: t
			}, l = await fetch(s, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(c)
			}), u = await l.json().catch(() => ({}));
			if (!l.ok) return i(e, u.error || p("Algo deu errado. Tenta de novo."));
			if (e === "email") return i("code");
			location.href = o(u.next || "/app", location.href, "svelte");
		}, e === "code" && (document.getElementById("code").oninput = (e) => {
			e.target.value.replace(/\D/g, "").length === 6 && s.requestSubmit();
		});
	};
	i("email", e.get("error") === "google" ? p("Não deu certo com o Google. Tenta com email.") : e.get("error") === "github" ? p("Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.") : "");
}
window.addEventListener("popstate", () => {
	if (Qr() || zr()) return;
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (!e || !j || e[1] !== j.id || !wt || !m.querySelector(".book")) return qe();
	M = new URLSearchParams(location.search).get("t") || "main", M !== "main" && !j.epics.some((e) => e.id === M) && (M = "main"), Q = !1, Nr = M === "main" ? null : M, z(), Z(), V(), $();
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("a[data-nav]");
	t && (e.preventDefault(), l.pushState(null, "", t.getAttribute("href")), qe());
});
var Xe = null, Ze = "", Qe = (e) => {
	Xe = e, Ze = JSON.stringify(e), $e(e.v), Fe();
};
function $e(e) {
	let t = document.querySelector("meta[name=\"vb-v\"]")?.content;
	if (!e || !t || e === t || document.getElementById("vbUpdate")) return;
	let n = document.createElement("button");
	n.id = "vbUpdate", n.type = "button", n.className = "vbUpdate", n.innerHTML = `${E("undo", 15)} ${p("Nova versão do vibebook · toque pra atualizar")}`, n.onclick = () => location.reload(), document.body.append(n);
}
async function et() {
	document.title = "vibebook", _n(null), Xe && tt(Xe);
	let e = await S("/api/me?ui=svelte");
	if (/^\/(b|login|archived)\b/.test(location.pathname)) return Qe(e);
	let t = JSON.stringify(e) !== Ze;
	if (Qe(e), !t && m.querySelector("#ask")) return;
	let n = document.getElementById("askText")?.value;
	if (tt(e), n) {
		let e = document.getElementById("askText");
		e && (e.value = n);
	}
}
function tt(e) {
	w = e.books, T = e.waits || [], k(), ne = Object.fromEntries(e.friends.filter((e) => e.name).map((e) => [e.email, e.name])), re = Object.fromEntries([...e.friends.filter((e) => e.avatar).map((e) => [e.email, e.avatar]), ...e.avatar ? [[e.email, e.avatar]] : []]);
	let t = (e.name || "").split(" ")[0], n = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	if (nt.matches) return it(e);
	m.innerHTML = `
  <div class="home">
    <header class="top">
      <div class="brand"><a href="/">vibebook</a></div>
      <button class="me" id="myName" title="${p("Seu perfil: email, como você entra, sair")}">${v(e.email)}<span>${h(e.name || e.email)}</span></button>
      <button class="ghost bell" data-bell></button>
      <button class="ghost homeTheme" id="homeTheme" aria-label="${p("Tema")}">${D[O()].icon}</button>
      ${ee()}
    </header>
    <dialog class="profile" id="profileDlg">
      <button class="ghost x pfX" aria-label="${p("Fechar")}">${E("x")}</button>
      <div class="pdHead">${v(e.email)}<div><b title="${p("Mudar seu nome")}">${h(e.name || p("Seu nome"))}</b><small>${h(e.email)}</small></div></div>
      ${at()}
      <div class="pfOut"><button class="primary" id="logout">${p("Sair")}</button><button class="ghost" id="logoutAll" title="${p("Sai em todos os navegadores e celulares onde você entrou")}">${p("Sair de todos os aparelhos")}</button></div>
    </dialog>
    <div id="setupCard"></div>
    <form class="ask" id="ask">
      <label for="askText">${p("O que você quer resolver?")}</label>
      <div class="askRow"><textarea id="askText" rows="2" maxlength="2000" placeholder="${p("Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.")}"></textarea><button class="primary" id="askBtn">${p("Achar a sala →")}</button></div>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
    ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${p("Como seus amigos te chamam?")}</b><span class="muted">${p("O pessoal e os agents vão te chamar assim.")}</span>
      <div class="row"><input name="n" required maxlength="60" placeholder="${p("Seu nome")}" autocomplete="given-name" /><button class="primary">${p("Salvar")}</button></div></form>`}
    ${e.avatar ? "" : `<div class="picAsk"><span class="picBig" style="background:${g(e.email)}">${h(_(e.email).slice(0, 2).toUpperCase())}</span>
      <div><b>${p("Coloque sua foto")}</b><span class="muted">${p("Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).")}</span></div>
      <button class="primary" data-pic>${E("camera")} ${p("Adicionar foto")}</button></div>`}
    <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />
    <div class="hello">
      <div class="helloText"><h1>${t ? p("Oi, {name}", { name: h(t) }) : p("Seus vibebooks")}</h1>
        <p>${n(e.books.length, "vibebook", "vibebooks")} · ${n(e.friends.length, p("amigo"), p("amigos"))} · <a class="archLink" data-nav href="/archived">${p("Arquivo")}</a><span id="waitN"></span></p></div>
      <button class="primary" id="new">${E("plus")} ${p("Novo vibebook")}</button>
    </div>
    <div class="grid">
      <main>
        ${e.books.length ? "" : `<div class="empty">${p("Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.")}</div>`}
        <div class="cards">${Ee().map((e) => {
		let t = (e.members || "").split(",").filter(Boolean);
		return `
              <div class="cardBox"><a class="card" data-nav href="/b/${e.id}">
                <button type="button" class="arch" data-archive="${e.id}" data-title="${h(e.title)}" title="${p("Arquivar")}" aria-label="${p("Arquivar {title}", { title: h(e.title) })}">${E("archive")}</button>
                ${De(e) ? `<div class="cover hasIcon"><img src="${De(e)}" alt="" loading="lazy"></div>` : `<div class="cover" style="background-color:${pn(e.title)}"><span>${h(F(e.title))}</span></div>`}
                <div class="info">
                  <b>${h(e.title)}</b>
                  <div class="sum">${h(e.summary || p("Ainda sem resumo. O @vibe escreve um quando a conversa andar."))}</div>
                  <div class="meta"><div class="stack">${t.slice(0, 5).map((e) => v(e)).join("")}</div><span class="wc" data-wc="${e.id}"></span><span>${y(e.updated_at)}</span></div>
                </div>
              </a><div class="cw" data-cw="${e.id}" hidden></div></div>`;
	}).join("")}
        </div>
      </main>
      <aside class="friends">
        <section class="agentBox" id="agentBox" aria-live="polite"></section>
        <h2>${p("Amigos")} <small>${e.friends.length || ""}</small></h2>
        ${e.friends.length ? e.friends.map((e) => `
          <div class="friend">${v(e.email)}<div class="fn" title="${h(e.email)}">${h(e.name || _(e.email))}
            <small>${e.shared ? `${n(e.shared, p("vibebook junto"), p("vibebooks juntos"))}` : e.joined ? p("na plataforma") : p("convidado")}</small></div>
            <button class="ghost x" data-unfriend="${h(e.email)}" aria-label="${p("Remover {email} dos amigos", { email: h(e.email) })}" title="${p("Remover dos amigos")}">${E("x")}</button></div>`).join("") : `<p class="muted" style="font-size:14px">${p("Quem você convida para um vibebook vira amigo aqui.")}</p>`}
        <form class="invite" id="addFriend"><input type="email" required placeholder="${p("email do amigo")}" aria-label="${p("Email do amigo")}" /><button>${p("Convidar")}</button></form>
      </aside>
    </div>
  </div>`, st(e);
}
var nt = matchMedia("(max-width: 720px)");
nt.addEventListener("change", () => {
	location.pathname === "/app" && et();
});
var rt = E("menu", 22);
function it(e) {
	let t = [...e.books].sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0) || t.updated_at - e.updated_at), n = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", r = (e) => {
		let t = T.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${_e(t)}">${n}</b>` : "";
	}, i = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	m.innerHTML = `
  <div class="phome">
    <header class="ptop">
      <button class="ghost pbtn" id="pMenu" aria-label="Menu">${rt}${T.length ? `<b class="swWait${_e(T)}">${T.length}</b>` : ""}</button>
      <a class="plogo" href="/"><span class="tile logo">${ye}</span>vibebook</a>
      <button class="me" id="myName" aria-label="${p("Seu perfil")}">${v(e.email)}</button>
    </header>
    <main class="pmain">
      <div id="setupCard"></div>
      ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${p("Como seus amigos te chamam?")}</b><span class="muted">${p("O pessoal e os agents vão te chamar assim.")}</span>
        <div class="row"><input name="n" required maxlength="60" placeholder="${p("Seu nome")}" autocomplete="given-name" /><button class="primary">${p("Salvar")}</button></div></form>`}
      <div class="pgrid">
        ${t.map((e) => `<a class="proom" data-nav href="/b/${e.id}"><span class="tw${e.sandboxes_running ? " cloud" : ""}">${Oe(e, "xl")}${n(e)}${r(e)}${e.sandboxes_running ? "<b class=\"swCloud\">☁</b>" : ""}</span><span class="nm">${h(e.title)}</span></a>`).join("")}
        <button class="proom" id="new" type="button"><span class="tile xl pnew">${Se}</span><span class="nm">${p("Novo")}</span></button>
      </div>
    </main>
    <form class="pask" id="ask">
      <textarea id="askText" maxlength="2000" placeholder="${p("O que você quer resolver? Eu acho a sala e o épico certos.")}"></textarea>
      <button class="primary" id="askBtn">${p("Achar a sala →")}</button>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
  </div>
  <dialog class="pdrawer" id="pDrawer">
    <div class="pdHead">${v(e.email)}<div><b>${h(e.name || p("Seu nome"))}</b><small>${h(e.email)}</small></div></div>
    ${at()}
    <section class="waits" id="waits"${T.length ? "" : " hidden"}></section>
    <nav class="pdNav">
      <a data-nav href="/archived">${p("Arquivo")}</a>
      <div class="pdRow"><button class="ghost" id="homeTheme">${D[O()].icon}<span>${D[O()].label}</span></button>${ee()}</div>
      <div class="pdBell"><button class="ghost bell" data-bell></button><span>${p("Notificações")}</span></div>
      ${window.PublicKeyCredential ? `<label class="pdLock"><input type="checkbox" id="lockToggle" ${Aa() ? "checked" : ""} /> <span>${p("Exigir Face ID ao abrir")}</span></label>` : ""}
    </nav>
    <section class="agentBox" id="agentBox" aria-live="polite"></section>
    <h2>${p("Amigos")} <small>${e.friends.length || ""}</small></h2>
    ${e.friends.map((e) => `<div class="friend">${v(e.email)}<div class="fn">${h(e.name || _(e.email))}<small>${e.shared ? i(e.shared, p("vibebook junto"), p("vibebooks juntos")) : e.joined ? p("na plataforma") : p("convidado")}</small></div>
      <button class="ghost x" data-unfriend="${h(e.email)}" aria-label="${p("Remover {email} dos amigos", { email: h(e.email) })}">${E("x")}</button></div>`).join("")}
    <form class="invite" id="addFriend"><input type="email" required placeholder="${p("email do amigo")}" aria-label="${p("Email do amigo")}" /><button>${p("Convidar")}</button></form>
    <button class="ghost pdOut" id="logout">${p("Sair")}</button>
    <button class="ghost pdOut pdOutAll" id="logoutAll">${p("Sair de todos os aparelhos")}</button>
  </dialog>
  <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />`;
	let a = document.getElementById("pDrawer");
	document.getElementById("pMenu").onclick = () => a.showModal(), a.onclick = (e) => {
		(e.target === a || e.target.closest("a[data-nav]")) && a.close();
	}, st(e), document.getElementById("homeTheme").onclick = (e) => {
		Ce(D[O()].next), e.currentTarget.innerHTML = `${D[O()].icon}<span>${D[O()].label}</span>`;
	}, document.getElementById("myName").onclick = () => a.showModal(), a.querySelector(".pdHead .avatar").onclick = Dr, a.querySelector(".pdBell span").onclick = () => a.querySelector(".pdBell .bell").click();
	let o = document.getElementById("lockToggle");
	o && (o.onchange = async () => {
		let t = o.checked;
		try {
			await Na(t, e.email), B(p(t ? "Pronto: o vibebook pede Face ID ao abrir neste aparelho." : "Face ID desligado neste aparelho."));
		} catch {
			o.checked = !t, B(p("Não deu pra usar o Face ID aqui."));
		}
	}), a.querySelector(".pdHead b").onclick = async () => {
		let t = prompt(p("Seu nome:"), e.name || "");
		t?.trim() && (await S("/api/me?ui=svelte", { name: t }), et());
	};
}
var at = () => `<section class="logins"><h3>${p("Como você entra")}</h3><div id="loginRows"></div><p class="lgNote">${p("Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.")}</p></section>`;
async function ot() {
	let e = document.getElementById("loginRows");
	if (!e) return;
	let t;
	try {
		t = await (await fetch("/api/me/logins")).json();
	} catch {
		return;
	}
	let n = Object.fromEntries((t.logins || []).map((e) => [e.method, e])), r = (e) => e ? p("último {d} · {n}×", {
		d: new Date(e.last).toLocaleDateString(d, {
			day: "numeric",
			month: "short",
			year: "numeric"
		}),
		n: e.n
	}) : null, i = (e, t, n, i) => `<div class="lgRow${n ? " on" : ""}"><span class="lgIc">${e}</span><span><b>${t}</b><small>${r(n) ?? i}</small></span>${n ? `<i class="lgOk">${E("check", 14)}</i>` : ""}</div>`;
	e.innerHTML = [
		i(E("at", 16), p("Código por email"), n.email, p("sempre funciona")),
		t.providers?.google || n.google ? i(Je, "Google", n.google, p("ainda não usou")) : "",
		t.providers?.github || n.github ? i(x.replace("<svg ", "<svg width=\"16\" height=\"16\" "), "GitHub", n.github, p("ainda não usou")) : "",
		n.invite ? i(E("reply", 16), p("Link de convite"), n.invite) : ""
	].join("");
}
function st(e) {
	let t = async (e) => {
		e?.trim() && (await S("/api/me?ui=svelte", { name: e }), et());
	}, n = document.getElementById("profileDlg");
	document.getElementById("myName").onclick = () => n ? n.showModal() : null, n && (n.onclick = (e) => {
		(e.target === n || e.target.closest(".pfX")) && n.close();
	}, n.querySelector(".pdHead .avatar").onclick = Dr, n.querySelector(".pdHead b").onclick = () => t(prompt(p("Seu nome:"), e.name || ""))), ot(), document.querySelector("[data-pic]")?.addEventListener("click", Dr), document.getElementById("nameAsk")?.addEventListener("submit", (e) => {
		e.preventDefault(), t(e.target.n.value);
	}), document.getElementById("homeTheme").onclick = (e) => {
		Ce(D[O()].next), e.currentTarget.innerHTML = D[O()].icon;
	}, document.getElementById("logout").onclick = async () => {
		await fetch("/auth/logout", { method: "POST" }), location.href = "/";
	}, document.getElementById("logoutAll").onclick = async () => {
		confirm(p("Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.")) && (await fetch("/auth/logout-all", { method: "POST" }), location.href = o("/login", location.href, "svelte"));
	}, document.getElementById("new").onclick = () => ut(), document.querySelectorAll("[data-unfriend]").forEach((e) => e.onclick = async () => {
		confirm(p("Remover {email} dos seus amigos? Os vibebooks em comum continuam.", { email: e.dataset.unfriend })) && (await fetch(`/api/friends/${encodeURIComponent(e.dataset.unfriend)}`, { method: "DELETE" }), et());
	}), document.getElementById("addFriend").onsubmit = async (e) => {
		e.preventDefault(), await S("/api/friends", { email: e.target[0].value }).catch((e) => alert(e.message)), et();
	}, ht(), gt(), Xt(), ct(), document.querySelectorAll("[data-archive]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation(), dt(e.dataset.archive, e.dataset.title);
	});
}
function ct() {
	let t = document.getElementById("ask"), n = document.getElementById("askText"), r = document.getElementById("askOut"), i = document.getElementById("askBtn");
	if (!t) return;
	n.oninput = () => {
		n.style.height = "auto", n.style.height = `${n.scrollHeight}px`;
	}, n.onkeydown = (e) => {
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), t.requestSubmit());
	};
	let a = (e) => `<b>${h(e.book_title)}</b>${e.epic_title ? ` → <b>${h(e.epic_title)}</b>` : ""}`, o = async (t) => {
		let i = n.value.trim();
		r.innerHTML = `<div class="why">${p("Enviando…")}</div>`;
		try {
			if (!t.book_id) return await lt(i);
			let n = t.book_id, r = await e(n).postMessage({
				text: i,
				thread: t.epic_id || "main"
			});
			if (!r.ok) throw Error(r.error);
			Mt = t.epic_id || null, l.pushState(null, "", `/b/${n}`), qe();
		} catch (e) {
			r.innerHTML = `<div class="why bad">${h(e.message)}</div>`;
		}
	};
	t.onsubmit = async (e) => {
		e.preventDefault();
		let t = n.value.trim();
		if (!t) return;
		i.disabled = !0, r.hidden = !1, r.innerHTML = `<div class="why">${p("Procurando a sala certa…")}</div>`;
		let s;
		try {
			s = await S("/api/route", { text: t });
		} catch (e) {
			r.innerHTML = `<div class="why">${h(e.message)}</div>`, i.disabled = !1;
			return;
		}
		i.disabled = !1;
		let c = (e) => e.length > 40 ? `${e.slice(0, 38)}…` : e, l = [...[s.pick, ...s.alternatives].filter(Boolean), {
			book_id: null,
			epic_id: null,
			new_title: s.new_room_title
		}], u = 0, d = (e) => e.book_id ? a(e) : p("sala nova <b>“{title}”</b>", { title: h(c(e.new_title)) }), f = () => {
			let e = l[u];
			r.innerHTML = `<div class="where">${e.book_id ? p("Mandar em {where}?", { where: d(e) }) : s.pick ? p("Criar {where}?", { where: d(e) }) : p("Nenhuma sala parece a certa. Criar {where}?", { where: d(e) })}</div>
        ${u === 0 && s.pick && s.reason ? `<div class="why">${h(s.reason)}</div>` : ""}
        <div class="acts">
          <button type="button" class="primary" data-send="chat">${p("Enviar")}</button>
          <button type="button" class="ghost" data-cancel>${p("Cancelar")}</button>
        </div>
        ${l.length > 1 ? `<div class="acts alts"><span class="why">${p("Outro lugar:")}</span>${l.map((e, t) => t === u ? "" : `<button type="button" class="ghost" data-sel="${t}">${d(e)}</button>`).join("")}</div>` : ""}`, r.querySelectorAll("[data-send]").forEach((e) => e.onclick = () => o(l[u])), r.querySelectorAll("[data-sel]").forEach((e) => e.onclick = () => {
				u = Number(e.dataset.sel), f(), r.querySelector("[data-send]")?.focus();
			}), r.querySelector("[data-cancel]").onclick = () => {
				r.hidden = !0, n.focus();
			};
		};
		f(), r.querySelector("[data-send]")?.focus();
	};
}
async function lt(e) {
	let t = await S("/api/books/start", { text: e });
	l.pushState(null, "", `/b/${t.id}`), qe(), t.unknown?.length && setTimeout(() => B(p("Não achei {who} nos seus amigos: convide pelo email em Pessoas.", { who: h(t.unknown.join(", ")) })), 1500);
}
function ut() {
	let e = document.createElement("dialog");
	e.className = "newRoomDlg", e.innerHTML = `<form method="dialog"><h3>${p("Novo vibebook")}</h3>
    <label for="nrText">${p("O que é e com quem?")}</label>
    <textarea id="nrText" rows="3" placeholder="${p("Ex.: viagem de avião pra SP com os dogs, eu e a Alexia")}"></textarea>
    <p class="muted">${p("Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.")}</p>
    <p class="err" hidden></p>
    <div class="acts"><button type="button" class="ghost" value="no">${p("Cancelar")}</button><button class="primary" value="yes">${p("Criar")}</button></div></form>`, document.body.appendChild(e), e.addEventListener("close", () => e.remove());
	let t = e.querySelector("textarea"), n = e.querySelector("[value=\"yes\"]"), r = e.querySelector(".err");
	e.querySelector("[value=\"no\"]").onclick = () => e.close(), t.onkeydown = (e) => {
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), n.click());
	}, n.onclick = async (i) => {
		i.preventDefault();
		let a = t.value.trim();
		if (!a) return t.focus();
		n.disabled = !0, n.textContent = p("Criando…");
		try {
			await lt(a), e.close();
		} catch (e) {
			r.hidden = !1, r.textContent = e.message, n.disabled = !1, n.textContent = p("Criar");
		}
	}, e.showModal(), t.focus();
}
function dt(e, t) {
	let n = document.createElement("dialog");
	n.innerHTML = `<h3>${p("Arquivar “{title}”?", { title: h(t) })}</h3>
    <p class="muted" style="margin:0 0 6px">${p("Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.")}</p>
    <div class="acts"><button type="button" class="ghost" value="no">${p("Cancelar")}</button><button type="button" class="primary" value="yes">${p("Arquivar")}</button></div>`, document.body.appendChild(n), n.addEventListener("close", () => n.remove()), n.querySelector("[value=\"no\"]").onclick = () => n.close(), n.querySelector("[value=\"yes\"]").onclick = async () => {
		await S(`/api/books/${e}/archive`, { archived: !0 }).catch((e) => alert(e.message)), n.close(), et();
	}, n.showModal(), n.querySelector("[value=\"yes\"]").focus();
}
async function ft() {
	document.title = `${p("Arquivo")} · vibebook`, _n(null);
	let { books: e } = await S("/api/archived");
	m.innerHTML = `
  <div class="home">
    <header class="top"><div class="brand"><a href="/app" data-nav>vibebook</a></div></header>
    <div class="hello"><div class="helloText"><h1>${p("Arquivo")}</h1><p>${p("Salas que você arquivou. Elas continuam existindo pra quem está nelas.")}</p></div>
      <a class="ghost" data-nav href="/app" style="text-decoration:none">${E("back")} ${p("Voltar")}</a></div>
    <main>${e.length ? `<div class="cards">${e.map((e) => `
      <div class="card" style="cursor:default">
        <div class="cover" style="background-color:${pn(e.title)};filter:grayscale(.6)"><span>${h(F(e.title))}</span></div>
        <div class="info"><b>${h(e.title)}</b><div class="sum">${h(e.summary || "")}</div>
          <div class="meta"><span>${p("arquivada {ago}", { ago: y(e.archived_at) })}</span><span><a data-nav href="/b/${e.id}">${p("abrir")}</a> · <button type="button" class="link" data-restore="${e.id}">${p("Restaurar")}</button></span></div></div>
      </div>`).join("")}</div>` : `<div class="empty">${p("Nada arquivado.")}</div>`}</main>
  </div>`, document.querySelectorAll("[data-restore]").forEach((e) => e.onclick = async () => {
		await S(`/api/books/${e.dataset.restore}/archive`, { archived: !1 }), ft();
	});
}
var pt = 0, mt = 0;
async function ht(e) {
	clearTimeout(pt), mt = e ? mt + 1 : 0;
	let t = document.getElementById("agentBox");
	if (!t) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (n && document.body.contains(t)) {
		if (`${location.origin}`, n.agents.length) {
			let e = Date.now(), r = (e) => e.used_at ?? e.connected_at, i = (t) => e - r(t) > 12096e5, a = {};
			for (let e of n.agents) (a[e.client] ??= []).push(e);
			for (let e of Object.values(a)) e.sort((e, t) => r(t) - r(e));
			let o = (e) => e.used_at ? p("usado {ago}", { ago: y(e.used_at) }) : e.used_at === null ? p("sem uso ainda") : p("uso desconhecido");
			t.innerHTML = `<h2>✦ ${p("Seus agents conectados")}</h2>
      ${Object.entries(a).map(([e, t]) => `<div class="connGroup"><div class="connHead"><b>${h(e)}</b><small>${t.length}</small></div>
        ${t.map((e) => `<label class="conn"><input type="checkbox" data-gid="${h(e.id)}" ${i(e) ? "checked" : ""} /><span>${p("conectado {ago}", { ago: y(e.connected_at) })}<small>${o(e)}</small></span></label>`).join("")}</div>`).join("")}
      <div class="connActs"><button type="button" class="ghost" id="connKeep">${p("Marcar todas menos a mais recente de cada")}</button><button type="button" class="primary" id="connDel"></button></div>
      <p style="margin-top:8px">${p("Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>")}</p>`;
			let s = () => [...t.querySelectorAll("[data-gid]")], c = () => {
				let e = s().filter((e) => e.checked).length, n = t.querySelector("#connDel");
				n.textContent = p("Remover selecionadas ({n})", { n: e }), n.disabled = !e;
			};
			t.addEventListener("change", c), c(), t.querySelector("#connKeep").onclick = () => {
				t.querySelectorAll(".connGroup").forEach((e) => e.querySelectorAll("[data-gid]").forEach((e, t) => e.checked = t > 0)), c();
			}, t.querySelector("#connDel").onclick = async () => {
				let e = s().filter((e) => e.checked).map((e) => e.dataset.gid);
				e.length && confirm(p("Remover {n} conexões? Os agents delas perdem o acesso na hora.", { n: e.length })) && (await fetch("/api/agents/revoke", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ ids: e })
				}), ht());
			};
		} else t.hidden = !0, Ct(document.getElementById("setupCard"));
	}
}
function gt() {
	let e = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], t = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}`, n = (n, r) => {
		let i = T.indexOf(n);
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${i}">${r ? "" : Oe(w.find((e) => e.id === n.book_id) || {
			id: n.book_id,
			title: n.room
		}, "sm")}
        <span class="wt"><small>${r ? "" : `${h(n.room)}${n.topic ? " › " : ""}`}${n.topic ? h(n.topic) : r ? p("sala principal") : ""} · ${y(n.ts)}</small>
        ${n.ref.startsWith("t") ? `<b>${p("Tarefa sua esperando OK:")}</b> ${h(n.text)}` : `<b>${h(e(n))}:</b> ${h(n.text.length > 160 ? `${n.text.slice(0, 158)}…` : n.text)}`}</span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${i}" title="${p("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${p("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${E("check")}</button>` : ""}
    </li>`;
	}, r = document.getElementById("waitN");
	r && (r.innerHTML = T.length ? ` · <b class="waitTot">${p("{n} esperando você", { n: T.length })}</b>` : "");
	let i = (n) => {
		let r = T.indexOf(n), i = n.ref.startsWith("t");
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${r}"><span class="wIc${i ? " task" : ""}">${i ? E("check", 16) : v(n.author)}</span>
        <span class="wt"><span class="wTx">${h(n.text.length > 200 ? `${n.text.slice(0, 198)}…` : n.text)}</span>
        <small>${i ? p("sua tarefa esperando OK") : p("{who} pediu", { who: h(e(n)) })} · ${n.topic ? h(n.topic) : p("sala principal")} · ${y(n.ts)}</small></span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${r}" title="${p("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${p("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${E("check")}</button>` : ""}
    </li>`;
	};
	document.querySelectorAll("[data-cw]").forEach((e) => {
		let t = T.filter((t) => t.book_id === e.dataset.cw);
		e.hidden = !t.length, e.innerHTML = t.length ? `<ul>${t.slice(0, 3).map(i).join("")}</ul>${t.length > 3 ? `<details><summary>${p("+{n} mais", { n: t.length - 3 })}</summary><ul>${t.slice(3).map(i).join("")}</ul></details>` : ""}` : "";
		let n = document.querySelector(`[data-wc="${e.dataset.cw}"]`);
		n && (n.innerHTML = t.length ? `<b class="wChip">${p("{n} esperando você", { n: t.length })}</b>` : "");
	});
	let a = document.getElementById("waits");
	a && (a.hidden = !T.length, a.innerHTML = T.length ? `<h2>${p("Esperando você")} <small>${T.length}</small></h2><ul>${T.map((e) => n(e, !1)).join("")}</ul>` : ""), document.querySelectorAll("[data-wait-done]").forEach((e) => e.onclick = () => {
		let t = T[Number(e.dataset.waitDone)];
		T = T.filter((e) => e !== t), gt(), k(), S("/api/waits/resolve", {
			book_id: t.book_id,
			ref: t.ref
		}).catch(() => {});
	});
}
var _t = !1;
function vt() {
	let e = document.getElementById("inboxBtn");
	if (!e) return;
	let t = T.length, n = e.querySelector(".kN");
	n.hidden = !t, n.textContent = t, n.className = `kN${_e(T)}`;
}
var yt = () => Promise.resolve(a);
function bt() {
	let e = document.getElementById("inbox");
	e || (e = document.createElement("dialog"), e.id = "inbox", e.className = "inbox", document.body.appendChild(e), e.addEventListener("click", (t) => {
		t.target === e && e.close();
	})), yt().then(({ mountInbox: t }) => {
		e._unmount?.(), e.replaceChildren(), e._unmount = t(e, {
			waits: T,
			roomId: j?.id ?? null,
			all: _t,
			vb: {
				t: p,
				icon: E,
				avatar: v,
				ago: y
			},
			ontab: (e) => _t = e,
			onclose: () => e.close(),
			onopen: (t, n) => {
				e.close();
				let r = /^[mab]/.test(t.ref) ? Number(t.ref.slice(1)) : 0;
				j?.id === t.book_id && (n.preventDefault(), r ? yi(r, t.thread) : t.thread !== M && (M = t.thread, z(), Z(), $()));
			},
			onresolve: (e) => {
				T = T.filter((t) => t !== e), k(), gt(), j && z(), bt(), S("/api/waits/resolve", {
					book_id: e.book_id,
					ref: e.ref
				}).catch(() => {});
			}
		}), e.open || e.showModal();
	}).catch(() => B(p("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
	e.target.closest?.("#inboxBtn") && bt();
});
var xt = 0, St = !1;
async function Ct(e, t) {
	if (clearTimeout(xt), !e) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (!n || !document.body.contains(e)) return;
	if (St = !n.agents.length, j && e.id === "agentNudge" && jn(), n.agents.length) {
		e.dataset.waiting ? (e.innerHTML = `<div class="setup done"><span class="setupIcon">${E("check", 22)}</span><div><b>${p("Seu agent conectou.")}</b><span>${p(t ? "Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo." : "Ele já enxerga as suas salas.")}</span></div></div>`, delete e.dataset.waiting, setTimeout(() => {
			document.body.contains(e) && (e.innerHTML = "", e.hidden = !0);
		}, 6e3), t || ht()) : (e.innerHTML = "", e.hidden = !0);
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
      <div class="setupHead">${r ? `<button class="ghost setupX" data-setupx aria-label="${p("Fechar")}" title="${p("Fechar")}">×</button>` : ""}<span class="setupIcon">✻</span><div><b>${p(t ? "Traga seu agent pra esta sala" : "Conecte seu agent")}</b>
        <span>${p("O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:")}</span></div></div>
      <div class="setupCmd"><code>${h(a)}</code><button class="primary" data-copycmd>${p("Copiar")}</button></div>
      <div class="setupFoot"><span class="wait">${p("esperando seu agent conectar…")}</span>
        <details><summary>${p("Claude.ai ou outro cliente")}</summary>
          <p><b>Claude.ai:</b> ${p("Configurações → Conectores → Adicionar conector personalizado, e cole")} <code data-copy>${h(n)}</code></p>
          <p><b>${p("Claude Code só com o conector:")}</b> <code data-copy>claude mcp add --transport http vibebook ${h(n)}</code></p>
          <p><a href="/connect" target="_blank" rel="noopener">${p("Passo a passo completo →")}</a></p>
        </details></div>
    </div>`;
		let i = e.querySelector("[data-setupx]");
		i && (i.onclick = () => {
			try {
				localStorage.setItem("vb.setupOff", "1");
			} catch {}
			clearTimeout(xt), e.innerHTML = "", e.hidden = !0;
		});
		let o = e.querySelector("[data-copycmd]");
		o.onclick = async () => {
			try {
				await navigator.clipboard.writeText(a), o.textContent = `✓ ${p("Copiado")}`;
			} catch {
				o.textContent = p("Selecione e copie");
			}
			setTimeout(() => o.textContent = p("Copiar"), 2500);
		}, e.querySelectorAll("[data-copy]").forEach((e) => e.onclick = () => {
			navigator.clipboard?.writeText(e.textContent), e.classList.add("copied");
		});
	}
	let o = Number(e.dataset.polls || 0);
	o < 150 && (e.dataset.polls = String(o + 1), xt = setTimeout(() => Ct(e, t), 4e3));
}
var wt = null, Tt = t(), j = null, Et = /* @__PURE__ */ new Map(), M = "main", Dt = [], Ot = [], kt = {
	m4a: "audio/x-m4a",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	aac: "audio/aac",
	ogg: "audio/ogg",
	oga: "audio/ogg",
	opus: "audio/ogg",
	webm: "audio/webm",
	flac: "audio/flac"
}, At = [
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
], jt = (e, t) => E(e.type === "text/html" ? "globe" : e.type.startsWith("audio/") ? "mic" : "file", t), Mt = null, Nt = /* @__PURE__ */ new Map(), Pt = !1;
function Ft(e) {
	let t = (w || Xe?.books || []).find((t) => t.id === e), n = t?.title || "";
	document.title = `${n || "vibebook"} · vibebook`;
	let r = De(t), i = (e) => r ? `<span class="${e} hasIcon"><img src="${r}" alt=""></span>` : n ? `<span class="${e}" style="background:${pn(n)}">${h(F(n))}</span>` : `<span class="${e}"></span>`, a = (e) => `<div class="thread"><span class="ri sk"></span><i style="width:${e}%"></i></div>`, o = (e, t) => `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${e}px"></i><i class="s" style="width:${t}%"></i></div></div>`;
	return `<div class="book skel ${vn ? "rail" : ""}" aria-busy="true" aria-label="${p("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${i("ri roomIco")}<span class="rt">${h(n)}</span></div>${a(70)}${a(55)}${a(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${p("Seus vibebooks")}">${E("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${i("ri roomIco phOnly")}<span>${h(n)}</span></span></h2></div>
      <div class="msgs">${o(90, 60)}${o(120, 45)}${o(70, 70)}${o(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${p("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${p("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function It(e) {
	M = Mt || new URLSearchParams(location.search).get("t") || "main", Mt = null, la = !1, j = null, Et.clear(), Pt = !1, Ot = [], S("/api/me?ui=svelte").then((e) => {
		Qe(e), Dt = e.friends.map((e) => e.email), w = e.books, T = e.waits || [], k(), z(), j && _n(P());
	}).catch(() => {});
	let t = Nt.get(e);
	t ? (j = t, !t.epics.some((e) => e.id === M) && !M.startsWith("pre:") && (M = "main"), tn()) : m.innerHTML = Ft(e);
	let n = c({
		url: (t) => `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${e}?t=${encodeURIComponent(I() ? "main" : M)}${t ? `&rc=${t}` : ""}`,
		onEvent: (t) => {
			wt === n && Gt(t, e);
		},
		onRemoved: () => {
			wt === n && (Vt(), m.innerHTML = `<div class="home"><p>${p("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${E("back")} ${p("seus vibebooks")}</a></div>`);
		},
		onUnavailable: () => {
			wt === n && (Vt(), m.innerHTML = `<div class="home"><p>${p("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${p("voltar")}</a></div>`);
		}
	});
	wt = n, n.start();
}
var N = (e) => wt?.send(e) ?? !1, Lt = /* @__PURE__ */ new Map(), Rt = /* @__PURE__ */ new WeakSet();
function zt(e) {
	let t = Lt.get(e);
	t && (t.target._mo?.disconnect(), t.destroy(), Lt.delete(e));
}
function Bt(e, t, n, i = !1) {
	let a = Lt.get(e);
	a && (a.target !== t || i) && (zt(e), a = null), a ? a.update(n) : (t.replaceChildren(), a = {
		...r(e, t, n),
		target: t
	}, Lt.set(e, a));
}
function Vt() {
	ln();
	for (let e of Lt.keys()) zt(e);
	va.disconnect();
}
var Ht = () => ({
	t: p,
	icon: E,
	avatar: v,
	ago: y,
	name: _,
	color: g,
	initials: F,
	mentions: b,
	locale: d
}), Ut = () => ({
	t: p,
	icon: E,
	name: _,
	avatar: v,
	agentAvatar: ae,
	ago: y,
	hhmm: ni,
	continues: ri,
	remHtml: ki,
	issueHtml: Oi,
	isNotice: Ai,
	noticeHtml: ji,
	mentions: b,
	md: ge,
	linkify: me,
	esc: h,
	quoteHtml: fi,
	attHtml: ei,
	cardHtml: bi,
	choiceHtml: Ti,
	pollHtml: ti,
	threadCards: si,
	typingLabel: (e) => Kt[e] ?? e,
	typingNote: (e) => Et.get(e),
	dateTime: (e) => new Date(e).toLocaleString(d),
	waiting: (e) => T.some((t) => t.book_id === j.id && t.ref === `m${e}`)
});
function Wt(e) {
	M = e, Nr = e === "main" ? null : e, Q = !1, Pr(), z(), Z(), V(), $();
}
function Gt(e, t) {
	if (location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1] !== t) return;
	let n = j;
	if (e.t === "epicsPatch" && j) {
		let t = /* @__PURE__ */ new Set([...j.epics.map((e) => e.id), ...e.changed.map((e) => e.id)]);
		if (e.order.some((e) => !t.has(e))) {
			wt?.resync();
			return;
		}
	}
	switch (Tt.get() !== j && Tt.replace(j), j = Tt.apply(e, t), j && Nt.set(t, j), e.t) {
		case "state": {
			let e = !n;
			Et.clear(), Pt = !0, sa = !1;
			for (let e of [...ca]) e.startsWith(t) && ca.delete(e);
			for (let e of [...Da]) e.startsWith(t) && Da.delete(e);
			Nt.delete(t), Nt.set(t, j), Nt.size > 12 && Nt.delete(Nt.keys().next().value), j.messages.length && ke(j.messages.at(-1).id), wn(), e ? tn() : (z(), Z(_a ? void 0 : "stay"), $(!0), Vr(), V(), ta(), Pi(), ea(), Ni(), ha(), hr());
			return;
		}
		case "closed":
			Z("stay");
			return;
		case "moved":
			j.messages.find((t) => t.id === e.id) && (Z(!0), ci(), z());
			break;
		case "msg":
			ke(e.m.id), e.m.thread !== "main" && M === "main" && ci(), e.m.thread === M && (ga(e.m), li(), e.m.files?.length && da()), z(), e.m.reply_to && e.m.thread !== M && Z("stay"), en(e.m);
			return;
		case "delta":
			Et.delete(e.id), Z(_a ? void 0 : "stay");
			return;
		case "typing":
			e.note ? Et.set(e.id, e.note) : Et.delete(e.id), Z("stay");
			return;
		case "epicsPatch":
		case "epics":
			M !== "main" && !I() && !j.epics.some((e) => e.id === M) && (M = "main"), z(), Vr(), V(), li(), M === "main" && ci();
			return;
		case "docNotes":
			$();
			return;
		case "doc": {
			let t = (e.epic || null) === Oa();
			if (e.stale) {
				t ? N({
					t: "doc.get",
					epic: e.epic
				}) : Da.delete(j.id + e.epic);
				return;
			}
			(t || e.fetched) && $();
			return;
		}
		case "meta":
			if (e.title) {
				let n = w?.find((e) => e.id === t);
				n && (n.title = e.title, k());
			}
			z(), Vr();
			return;
		case "suggestions": {
			let e = I() ? n?.suggestions[Number(M.slice(4))]?.title : void 0;
			if (Sn !== null) {
				let e = j.suggestions.length;
				M = e ? `pre:${Math.min(Sn, e - 1)}` : "main", Sn = null, Z();
			} else if (I() && xn()?.title !== e) {
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
			ta(), Vi(), Jr();
			return;
		case "fileAdd":
			ta(), Vi(), Jr(), da();
			return;
		case "reminders":
			ea();
			return;
		case "decisions":
			Ni();
			return;
		case "conns":
			K = null, document.querySelector(".doc[data-pane=\"apps\"]") && !q ? J() : q || Ri();
			return;
		case "pins":
			z(), ta(), Pi();
			return;
		case "error":
			B(h(e.error || p("falhou")));
			return;
		case "receipts":
			ha();
			return;
		case "older":
			if (sa = !1, e.more || (oa[j.id + e.thread] = !0), e.thread === M && (Y.n += e.messages.length, Z(!ca.delete(j.id + e.thread))), vi && e.thread === M) {
				let t = vi;
				j.messages.some((e) => e.id === t.id) ? (vi = null, setTimeout(() => yi(t.id), 50)) : e.more && ++t.n < 15 ? fa() : (vi = null, B(p("Não achei essa mensagem nesta sala.")));
			}
			return;
		case "acks":
			ha(), z(), hr();
			return;
		case "ackRows":
			ha(), z(), hr();
			return;
		case "poll":
			Z("stay");
			return;
		case "online":
			z();
			return;
		case "blocked": {
			let t = document.getElementById("input");
			t && !t.value && (t.value = e.text), alert(p("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: e.reason }));
			return;
		}
	}
}
var Kt = {
	route: p("escolhendo o modelo"),
	fast: p("rápido"),
	smart: p("com calma")
}, qt = {
	on: E("bell", 20),
	off: E("bellOff", 20)
}, Jt = () => "Notification" in window ? Notification.permission : "unsupported", Yt = () => {
	try {
		return localStorage.getItem("vb.mute") === "1";
	} catch {
		return !1;
	}
};
function Xt() {
	let e = Jt(), t = Yt(), n = e === "granted" ? t ? "muted" : "on" : e, r = {
		on: p("Notificações ligadas: clique pra silenciar"),
		muted: p("Notificações silenciadas: clique pra ligar"),
		default: p("Ativar notificações de mensagem"),
		denied: p("Notificações bloqueadas no navegador"),
		unsupported: p("Este navegador não tem notificações")
	}[n];
	document.querySelectorAll("[data-bell]").forEach((e) => {
		e.className = `ghost bell ${n}`, e.innerHTML = n === "on" ? qt.on : qt.off, e.title = r, e.setAttribute("aria-label", r), e.onclick = async () => {
			if (Qt(), n === "default") {
				if (await Notification.requestPermission(), Jt() === "granted") {
					try {
						localStorage.removeItem("vb.mute");
					} catch {}
					$t();
				}
			} else if (n === "denied") alert(p("As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página."));
			else if (n === "on" || n === "muted") {
				try {
					localStorage.setItem("vb.mute", n === "on" ? "1" : "");
				} catch {}
				n === "muted" && $t();
			}
			Xt();
		};
	});
}
var Zt = null, Qt = () => {
	try {
		Zt ??= new AudioContext(), Zt.resume();
	} catch {}
};
document.addEventListener("pointerdown", Qt, { once: !0 });
function $t() {
	if (!Zt) return;
	let e = Zt.currentTime;
	[[880, 0], [1318.5, .12]].forEach(([t, n]) => {
		let r = Zt.createOscillator(), i = Zt.createGain();
		r.type = "sine", r.frequency.value = t, i.gain.setValueAtTime(0, e + n), i.gain.linearRampToValueAtTime(.18, e + n + .02), i.gain.exponentialRampToValueAtTime(.001, e + n + .5), r.connect(i).connect(Zt.destination), r.start(e + n), r.stop(e + n + .55);
	});
}
function en(e) {
	let t = e.kind === "agent" || e.author === "ai";
	if (e.author === j.me && !t || e.quiet || Yt()) return;
	let n = e.text && [...e.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu)].some((e) => le(e[1]) === j.me);
	if ((!t || e.author === j.me || n || e.for_who === j.me || j.messages.find((t) => t.id === e.reply_to)?.author === j.me) && (document.hidden || e.thread !== M || n) && ($t(), Jt() === "granted" && document.hidden)) {
		let t = e.author === "ai" ? "@vibe" : e.kind === "agent" ? p("{via} de {who}", {
			via: e.via || "agent",
			who: _(e.author)
		}) : _(e.author), r = new Notification(`${n ? `${p("Te mencionaram")} · ` : ""}${t} · ${j.book?.title ?? "vibebook"}`, {
			body: (e.text || (e.author === "ai" ? p("respondendo…") : `📎 ${p("anexo")}`)).slice(0, 180),
			tag: `vb-${j.id}`,
			icon: "/apple-touch-icon.png"
		});
		r.onclick = () => {
			window.focus(), r.close();
		};
	}
}
function tn() {
	Vt(), document.title = `${j.book?.title ?? "vibebook"} · vibebook`, m.innerHTML = `
  <div class="book ${vn ? "rail" : ""}">
    <aside class="side" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${p("Seus vibebooks")}" title="${p("Seus vibebooks")}">${E("back", 20)}</a><h2 id="threadTitle"></h2><button class="ghost" id="toggleBoard" title="${p("Quadro de tarefas (kanban)")}" aria-pressed="false">${E("board")}<span class="lbl">${p("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${p("Caixa de entrada: o que espera por você")}" aria-label="${p("Caixa de entrada")}">${E("inbox")}<b class="kN" hidden></b></button><button class="ghost bell" data-bell></button><button class="ghost" id="myClaude" aria-pressed="false" hidden>✻ <span class="lbl">Agent</span></button><button class="ghost" id="toggleDoc" title="${p("mostrar/ocultar documento")}">${E("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek" role="toolbar" aria-label="${p("Documento e arquivos da sala")}"><div class="peekRow"><button type="button" class="peekDoc" data-pane="doc" id="peekTxt" aria-label="${p("Abrir documento")}"></button><button type="button" data-pane="files" title="${p("Arquivos")}" aria-label="${p("Arquivos")}">${E("paperclip", 18)}<small id="peekFiles"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${E("chart", 18)}</button><button type="button" data-pane="decisions" title="${p("Decisões")}" aria-label="${p("Decisões")}">${E("check", 18)}</button><button type="button" data-pane="reminders" title="${p("Lembretes")}" aria-label="${p("Lembretes")}">${E("clock", 18)}<small id="peekRem"></small></button><button type="button" class="peekAgents" data-pane="agents" title="Agents" aria-label="Agents">${xe}<i class="qDot"></i><small class="qN"></small></button></div><i class="grab"></i></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div class="agentNudge" id="agentNudge" hidden></div><div class="claudeBar" id="claudeBar" hidden></div><div class="askBar" id="askBar" hidden></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <form class="composer" id="composer">
        <div class="tray" id="tray"></div>
        <div class="replyBar" id="replyBar" hidden></div>
        <div class="mentionPop" id="mentionPop" role="listbox" aria-label="${p("Mencionar")}" hidden></div>
        <div class="row">
          <button type="button" class="ghost icon emojiBtn" id="emojiBtn" title="${p("Emoji")}" aria-label="${p("Emoji")}" aria-haspopup="dialog" aria-expanded="false">🙂</button>
          <div class="mentionPop emojiPop" id="emojiPop" role="dialog" aria-label="${p("Emoji")}" hidden><input type="search" id="emojiQ" placeholder="${p("Buscar emoji…")}" autocomplete="off"><div class="eGrid" id="emojiGrid"></div></div>
          <button type="button" class="ghost icon" id="plusBtn" title="${p("Anexar, mencionar, votação")}" aria-label="${p("Mais opções")}" aria-haspopup="menu" aria-expanded="false">${E("plus", 18)}</button>
          <div class="mentionPop plusMenu" id="plusMenu" role="menu" hidden>
            <button type="button" role="menuitem" id="attach">${E("paperclip")} ${p("Anexar arquivo")} <small>${p("ou Cmd+V")}</small></button>
            <button type="button" role="menuitem" id="mentionBtn">${E("at")} ${p("Mencionar alguém")} <small>@</small></button>
            <button type="button" role="menuitem" id="pollBtn">${E("chart")} ${p("Criar votação")}</button>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac" multiple hidden />
          <textarea id="input" rows="1" placeholder="${p("Mensagem…")}"></textarea><button class="primary" id="sendBtn">${p("Enviar")}</button>
        </div>
      </form>
    </main>
    <section class="doc">
      <button type="button" class="docEditBar" id="docEditBar"></button>
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${p("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${p("Redimensionar documento")}" tabindex="0"></div>
      <header><div class="ptabs" role="tablist"><button type="button" class="ptDoc" data-pane="doc">${E("doc", 16)} Doc</button><button type="button" class="ptBoard" data-pane="board" title="${p("Quadro de tarefas")}" aria-label="${p("Quadro de tarefas")}">${E("board", 17)}<b class="kN" hidden></b></button><button type="button" data-pane="files" title="${p("Arquivos")}" aria-label="${p("Arquivos")}">${E("paperclip", 17)}<small id="fileCount"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${E("chart", 17)}<small id="appCount"></small></button><button type="button" data-pane="decisions" title="${p("Decisões")}" aria-label="${p("Decisões")}">${E("check", 17)}<small id="decCount"></small></button><button type="button" data-pane="reminders" title="${p("Lembretes")}" aria-label="${p("Lembretes")}">${E("clock", 17)}<small id="remCount"></small></button><button type="button" class="ptAgents" data-pane="agents" title="Agents" aria-label="Agents">${xe}<i class="qDot"></i><small class="qN"></small></button></div><div class="seg" role="group" aria-label="${p("Modo do documento")}"><button type="button" data-view="preview">${p("Ver")}</button><button type="button" data-view="edit">${p("Editar")}</button></div></header>
      <div class="docCrumb" id="docCrumb" hidden></div>
      <div class="preview" id="preview"></div>
      <textarea id="doc" placeholder="${p("O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.")}"></textarea>
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
    <h3>${p("Nova votação")}</h3>
    <form id="pollForm">
      <input name="q" required maxlength="300" placeholder="${p("Pergunta (ex.: Qual cruzeiro?)")}" />
      <div id="pollOpts" style="display:grid;gap:8px"></div>
      <button type="button" class="link" id="addOpt" style="justify-self:start">+ ${p("opção")}</button>
      <label style="display:flex;gap:8px;align-items:center;font-size:14px"><input type="checkbox" name="multi" /> ${p("cada pessoa pode escolher várias")}</label>
      <div class="acts"><button type="button" id="pollCancel">${p("Cancelar")}</button><button class="primary">${p("Criar votação")}</button></div>
    </form>
  </dialog>`;
	let t = m.querySelector(".book"), n = new ResizeObserver(() => {
		let e = t.querySelector(".chathead").getBoundingClientRect().height, n = document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
		document.documentElement.style.setProperty("--headH", `${Math.round(e)}px`), document.documentElement.style.setProperty("--peekH", `${Math.round(n)}px`);
	});
	n.observe(t.querySelector(".chathead")), n.observe(document.getElementById("docPeek")), Br(document.getElementById("docPeek"), "doc", !0, (e) => {
		let n = e.target.closest("[data-pane]")?.dataset.pane || "doc";
		if (t.dataset.sheet === "doc" && t.dataset.pane === n) return U();
		t.classList.contains("boardview") && document.getElementById("toggleBoard").click(), me(n), Rr("doc");
	}), Br(document.getElementById("docGrab"), "doc", !1), document.getElementById("sheetDim").onclick = () => U(), document.getElementById("toggleDoc").onclick = () => t.classList.toggle("nodoc");
	let r = (e) => {
		t.classList.toggle("boardview", e), t.classList.toggle("nodoc", e), document.getElementById("toggleBoard").setAttribute("aria-pressed", String(e)), e && (U(), V());
	};
	document.getElementById("toggleBoard").onclick = () => r(!t.classList.contains("boardview"));
	let i = (e) => {
		e = Math.round(Math.min(Math.max(e, 260), window.innerWidth - 260 - 320)), t.style.setProperty("--doc-w", `${e}px`);
		try {
			localStorage.setItem("vb.docW", e);
		} catch {}
	};
	try {
		let e = Number(localStorage.getItem("vb.docW"));
		e && i(e);
	} catch {}
	let a = document.getElementById("resizer");
	a.onpointerdown = (e) => {
		e.preventDefault(), a.setPointerCapture(e.pointerId), a.classList.add("drag"), document.body.classList.add("resizing"), a.onpointermove = (e) => i(window.innerWidth - e.clientX), a.onpointerup = () => {
			a.onpointermove = null, a.classList.remove("drag"), document.body.classList.remove("resizing");
		};
	}, a.ondblclick = () => i(380), a.onkeydown = (e) => {
		let t = document.querySelector(".doc").getBoundingClientRect().width;
		e.key === "ArrowLeft" ? i(t + 24) : e.key === "ArrowRight" && i(t - 24);
	};
	let o = document.getElementById("input");
	{
		let e = document.getElementById("emojiBtn"), t = document.getElementById("emojiPop"), n = document.getElementById("emojiQ"), r = document.getElementById("emojiGrid"), i = [...new Map(Object.entries(fe).map(([e, t]) => [t, e])).entries()], a = () => {
			let e = n.value.trim().toLowerCase().replace(/:/g, "");
			r.innerHTML = i.filter(([t, n]) => !e || Object.entries(fe).some(([n, r]) => r === t && n.includes(e))).map(([e, t]) => `<button type="button" title=":${h(t)}:" data-emoji="${e}">${e}</button>`).join("");
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
	let s = document.getElementById("mentionPop"), c = [], u = 0, d = -1, f = () => {
		s.hidden = !0, c = [], d = -1;
	}, ee = (e) => {
		let t = c[e];
		if (!t) return;
		let n = o.selectionStart;
		o.value = `${o.value.slice(0, d)}@${t.handle} ${o.value.slice(n)}`;
		let r = d + t.handle.length + 2;
		o.setSelectionRange(r, r), f(), o.focus(), o.oninput();
	}, te = () => {
		s.innerHTML = c.map((e, t) => `<button type="button" role="option" class="${t === u ? "sel" : ""}" data-i="${t}">${v(e.email)}<b>@${h(e.handle)}</b><small>${h(e.label)}</small></button>`).join(""), s.hidden = !c.length;
	};
	s.onmousedown = (e) => {
		let t = e.target.closest("[data-i]");
		t && (e.preventDefault(), ee(Number(t.dataset.i)));
	};
	let g = () => {
		let e = o.value.slice(0, o.selectionStart), t = e.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
		if (!t) return f();
		d = e.length - t[2].length - 1;
		let n = oe(t[2]), r = [...(j.members || []).filter((e) => e !== j.me).map((e) => ({
			email: e,
			handle: ce(e),
			label: _(e) === ce(e) ? e : _(e)
		}))];
		if (L.id === j.id) for (let e of L.sandboxes || []) e.email === j.me && r.push({
			email: e.email,
			handle: e.name,
			label: p("seu agent no sandbox")
		});
		c = r.filter((e) => !n || e.handle.startsWith(n) || oe(e.label).includes(n)).slice(0, 8), u = 0, te();
	};
	o.oninput = () => {
		o.style.height = "auto", o.style.height = `${o.scrollHeight}px`, g();
	}, o.onblur = () => setTimeout(f, 100), o.onkeydown = (e) => {
		if (!s.hidden && c.length) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") return e.preventDefault(), u = (u + (e.key === "ArrowDown" ? 1 : c.length - 1)) % c.length, te();
			if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) return e.preventDefault(), ee(u);
			if (e.key === "Escape") return e.preventDefault(), f();
		}
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), document.getElementById("composer").requestSubmit());
	};
	let ne = document.getElementById("tray"), re = document.getElementById("sendBtn");
	re.addEventListener("touchend", (e) => {
		re.disabled || (e.preventDefault(), document.getElementById("composer").requestSubmit());
	}), re.addEventListener("mousedown", (e) => e.preventDefault());
	let ie = () => {
		ne.innerHTML = Ot.map((e, t) => `<div class="pend ${!e.meta && !e.error ? "up" : ""} ${e.error ? "err" : ""}" title="${h(e.error || e.file.name)}">
      ${e.url ? `<img src="${e.url}" alt="">` : `${E("file", 22)}<br>${h(e.file.name.slice(0, 18))}`}${e.error ? `<span style="position:relative;z-index:1">${h(e.error)}</span>` : ""}
      <button type="button" class="rm" data-rm="${t}" aria-label="${p("Remover anexo")}">${E("x")}</button></div>`).join(""), ne.querySelectorAll("[data-rm]").forEach((e) => e.onclick = () => {
			let [t] = Ot.splice(Number(e.dataset.rm), 1);
			t?.url && URL.revokeObjectURL(t.url), ie();
		});
		let e = Ot.some((e) => !e.meta && !e.error);
		re.disabled = e, re.textContent = p(e ? "Enviando…" : "Enviar");
	}, ae = (t) => {
		for (let n of t) {
			!n.type && /\.html?$/i.test(n.name) && (n = new File([n], n.name, { type: "text/html" })), !n.type && /\.md$/i.test(n.name) && (n = new File([n], n.name, { type: "text/markdown" }));
			let t = {
				txt: "text/plain",
				csv: "text/csv"
			}[(/\.(\w+)$/.exec(n.name)?.[1] || "").toLowerCase()];
			t && n.type !== t && (n = new File([n], n.name, { type: t }));
			let r = kt[(/\.(\w+)$/.exec(n.name)?.[1] || "").toLowerCase()];
			if (r && !n.type.startsWith("audio/") && (n = new File([n], n.name, { type: r })), !At.includes(n.type)) {
				alert(`${n.name}: ${p("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}`);
				continue;
			}
			let i = n.type.startsWith("audio/");
			if (n.size > (i ? 50 : 10) * 1024 * 1024) {
				alert(`${n.name}: ${p(i ? "áudio maior que 50MB." : "maior que 10MB.")}`);
				continue;
			}
			n.name && n.name !== "image.png" || (n = new File([n], `print-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png`, { type: n.type }));
			let a = {
				file: n,
				url: n.type.startsWith("image/") ? URL.createObjectURL(n) : null
			};
			Ot.push(a), e(j.id).uploadFile({
				name: n.name,
				type: n.type,
				body: n
			}).then((e) => {
				a.meta = e;
			}).catch((e) => {
				a.error = e.message || p("sem conexão");
			}).finally(ie);
		}
		ie();
	}, y = document.getElementById("fileInput"), se = document.getElementById("plusBtn"), le = document.getElementById("plusMenu"), b = (e = le.hidden) => {
		le.hidden = !e, se.setAttribute("aria-expanded", String(e));
	};
	se.onclick = (e) => {
		e.stopPropagation(), b();
	}, se.onmousedown = se.onpointerdown = (e) => {
		document.activeElement?.id === "input" && e.preventDefault();
	}, le.onclick = () => b(!1), le.closest("main").addEventListener("click", (e) => {
		!le.hidden && !le.contains(e.target) && b(!1);
	}), le.onkeydown = (e) => {
		e.key === "Escape" && (b(!1), se.focus());
	}, document.getElementById("mentionBtn").onclick = () => {
		let e = o.selectionStart ?? o.value.length, t = o.value.slice(0, e), n = t && !/\s$/.test(t) ? " @" : "@";
		o.value = t + n + o.value.slice(e), o.focus(), o.setSelectionRange(e + n.length, e + n.length), setTimeout(() => o.oninput(), 120);
	}, document.getElementById("attach").onclick = () => y.click(), y.onchange = () => {
		ae([...y.files]), y.value = "";
	}, document.onpaste = (e) => {
		let t = e.target, n = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName));
		if (!o.isConnected || n && t !== o) return;
		let r = [...e.clipboardData?.files ?? []];
		r.length || (r = [...e.clipboardData?.items ?? []].filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter(Boolean)), r.length && (e.preventDefault(), ae(r), o.focus());
	};
	let x = m.querySelector(".chat");
	x.addEventListener("dragover", (e) => {
		[...e.dataTransfer.types].includes("Files") && (e.preventDefault(), x.classList.add("drop"));
	}), x.addEventListener("dragleave", (e) => {
		x.contains(e.relatedTarget) || x.classList.remove("drop");
	}), x.addEventListener("drop", (e) => {
		e.preventDefault(), x.classList.remove("drop"), ae([...e.dataTransfer.files]);
	}), document.getElementById("composer").onsubmit = (e) => {
		if (e.preventDefault(), Ot.some((e) => !e.meta && !e.error)) return;
		let t = o.value.trim(), n = Ot.filter((e) => e.meta).map((e) => e.meta.id);
		(t || n.length) && (N({
			t: "msg",
			thread: M,
			text: t,
			files: n,
			reply_to: W?.id
		}), W = null, pi(), Ot.forEach((e) => e.url && URL.revokeObjectURL(e.url)), Ot = [], o.value = "", o.oninput(), ie());
	};
	let ue = document.getElementById("pollDlg"), de = document.getElementById("pollOpts"), pe = (e = "") => {
		de.insertAdjacentHTML("beforeend", `<input name="opt" maxlength="200" placeholder="${p("Opção {n}", { n: de.children.length + 1 })}" value="${h(e)}" />`);
	};
	document.getElementById("pollBtn").onclick = () => {
		document.getElementById("pollForm").reset(), de.innerHTML = "", pe(), pe(), pe(), ue.showModal();
	}, document.getElementById("addOpt").onclick = () => {
		de.children.length < 10 && pe(), de.lastElementChild.focus();
	}, document.getElementById("pollCancel").onclick = () => ue.close(), document.getElementById("pollForm").onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = [...t.querySelectorAll("[name=\"opt\"]")].map((e) => e.value.trim()).filter(Boolean);
		if (n.length < 2) return alert(p("Coloque pelo menos 2 opções."));
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
		n && confirm(p("Encerrar a votação?")) && N({
			t: "poll.close",
			id: n.dataset.close
		});
	});
	let me = (e) => {
		if (m.querySelector(".doc").dataset.pane = e, m.querySelector(".book").dataset.pane = e, m.querySelectorAll(".ptabs button").forEach((t) => {
			t.classList.toggle("sel", t.dataset.pane === e), t.setAttribute("aria-selected", t.dataset.pane === e);
		}), e === "files" && (j.filesAll || N({ t: "files.get" }), ta()), e === "decisions" && Ni(), e === "apps" && Pi(), e === "reminders" && ea(), e === "agents" && (jn(), Wn()), e === "board") {
			let e = document.getElementById("kanban"), t = m.querySelector(".doc");
			e.parentElement !== t && t.append(e), V();
		}
	};
	m.querySelectorAll(".ptabs button").forEach((e) => e.onclick = () => me(e.dataset.pane)), document.removeEventListener("click", Rn), document.removeEventListener("vb:pane", zn), Rn = (e) => {
		e.target.closest?.("[data-sbx-open]") && document.body.contains(t) && (U(), document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), H.matches && Rr("doc"));
	}, zn = (e) => {
		document.body.contains(t) && (t.classList.remove("nodoc"), me(e.detail));
	}, document.addEventListener("click", Rn), document.addEventListener("vb:pane", zn), me("doc");
	let he = document.getElementById("doc"), ge;
	he.oninput = () => {
		clearTimeout(ge), ge = setTimeout(() => {
			let e = Oa();
			e ? j.docs[e] = he.value : j.doc = he.value, N({
				t: "doc",
				text: he.value,
				epic: e || void 0
			});
		}, 400);
	}, he.onblur = () => $();
	let S = m.querySelector(".doc");
	function C(e) {
		let t = document.getElementById("docEditBar");
		t && (t.innerHTML = e === "edit" ? `${E("check", 16)} ${p("Pronto")}` : `${E("pencil", 16)} ${p("Editar")}`);
	}
	document.getElementById("docEditBar").onclick = () => w(S.dataset.view === "edit" ? "preview" : "edit");
	let w = (e) => {
		S.dataset.view = e, C(e), S.querySelectorAll(".seg button").forEach((t) => t.classList.toggle("sel", t.dataset.view === e));
		try {
			localStorage.setItem("vb.docView", e);
		} catch {}
		e === "edit" ? (un(), (an || he).focus()) : (un(), $());
	};
	S.querySelectorAll(".seg button").forEach((e) => e.onclick = () => w(e.dataset.view));
	let T = "preview";
	try {
		T = localStorage.getItem("vb.docView") || "preview";
	} catch {}
	if (S.dataset.view = T, C(T), S.querySelectorAll(".seg button").forEach((e) => e.classList.toggle("sel", e.dataset.view === T)), z(), Z(), $(!0), ta(), Pi(), ea(), Ni(), Ct(document.getElementById("agentNudge"), j.id), Xt(), rn(), /^#m\d+$/.test(location.hash)) setTimeout(() => yi(Number(location.hash.slice(2))), 300);
	else if (/^#f[0-9a-f]+$/.test(location.hash)) {
		let e = location.hash.slice(2);
		l.replaceState(null, "", location.pathname + location.search), setTimeout(() => nn(e), 300);
	}
}
function nn(e, t) {
	let n = (j.files || []).find((t) => t.id === e) || X().flatMap((e) => e.files || []).find((t) => t.id === e);
	if (!n && !t && !j.filesAll) return N({ t: "files.get" }), setTimeout(() => nn(e, !0), 800);
	Kr(`/api/books/${j.id}/files/${e}`, n?.type?.startsWith("image/") ? "img" : "frame", n?.name || p("arquivo"));
}
function rn() {
	let e = `vb.welcomed.${j.me}`;
	try {
		if (!j.book?.owner || j.me === j.book.owner || localStorage.getItem(e)) return;
		localStorage.setItem(e, "1");
	} catch {
		return;
	}
	let t = _(j.book.owner), n = [
		[
			E("hand", 24),
			p("Bem-vindo a <b>{room}</b>", { room: h(j.book.title || p("esta sala")) }),
			p("{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.", { owner: h(t) })
		],
		[
			"✻",
			p("Cada um traz o seu agent"),
			p("Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.")
		],
		[
			E("paperclip", 24),
			p("O contexto é de todo mundo"),
			p("Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.")
		],
		[
			E("arrowRight", 24),
			p("Conecte o seu agent"),
			""
		]
	], r = document.createElement("dialog");
	r.className = "welcome", document.body.appendChild(r);
	let i = 0, a = () => {
		r.close(), r.remove(), Ct(document.getElementById("agentNudge"), j.id);
	}, o = () => {
		let [e, t, s] = n[i], c = i === n.length - 1;
		r.innerHTML = `<div class="wIco">${e}</div><h3>${t}</h3>${s ? `<p>${s}</p>` : `<p>${p("Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.")}</p><div id="wConnect"></div>`}
      <div class="wFoot"><span class="wDots">${n.map((e, t) => `<i class="${t === i ? "on" : ""}"></i>`).join("")}</span>
        ${i ? `<button type="button" class="ghost" data-w="-1">${p("Voltar")}</button>` : `<button type="button" class="ghost" data-w="skip">${p("Pular")}</button>`}
        <button type="button" class="primary" data-w="1">${p(c ? "Entrar na sala" : "Próximo")}</button></div>`, r.querySelectorAll("[data-w]").forEach((e) => e.onclick = () => {
			let t = e.dataset.w;
			if (t === "skip" || t === "1" && c) return a();
			i += Number(t), o();
		}), c && Ct(r.querySelector("#wConnect"), j.id).then(() => {
			let e = r.querySelector("#wConnect");
			e && e.hidden && (e.hidden = !1, e.innerHTML = `<div class="setup done"><span class="setupIcon">${E("check", 22)}</span><div><b>${p("Seu agent já está conectado.")}</b><span>${p("Ligue ele nesta sala com ✻ Ligar agent, no topo.")}</span></div></div>`);
		}), r.querySelector(".wFoot .primary").focus();
	};
	r.addEventListener("cancel", (e) => {
		e.preventDefault(), a();
	}), o(), r.showModal();
}
var an = null, on = null, sn = null, cn = 0;
function ln() {
	++cn;
	let e = an;
	an = null, on = null, e?.destroy();
}
function un() {
	let e = m.querySelector(".doc"), t = document.getElementById("cm"), n = Oa(), r = e?.dataset.view === "edit" && j?.id && !I() ? n ? `${j.id}~${n}` : j.id : null;
	if (r === on) return;
	ln(), on = r, e?.classList.remove("collab"), t && (t.innerHTML = "");
	let i = cn;
	r && t && (sn ??= import(
		/* @vite-ignore */
		"/collab-svelte.js"
)).then((a) => {
		i === cn && (an?.destroy(), t.innerHTML = "", an = a.mountCollab(t, {
			room: r,
			name: _(j.me),
			color: g(j.me),
			onText: (e) => {
				i === cn && (n ? j.docs[n] = e : j.doc = e);
			},
			onStatus: (t) => {
				i === cn && (e.classList.toggle("collab", t === "connected"), t !== "connected" && $(!0));
			}
		}));
	}).catch(() => {
		sn = null;
	});
}
var dn = E("sidebar", 20), P = () => j?.book?.title || "vibebook", fn = [
	"oklch(0.5 0.17 248)",
	"oklch(0.58 0.17 35)",
	"oklch(0.52 0.11 175)",
	"oklch(0.47 0.15 315)",
	"oklch(0.6 0.13 75)",
	"oklch(0.45 0.1 145)",
	"oklch(0.36 0.06 255)",
	"oklch(0.55 0.16 10)"
], pn = (e) => fn[[...String(e)].reduce((e, t) => e * 31 + t.charCodeAt(0) >>> 0, 7) % fn.length], mn = /* @__PURE__ */ new Set([
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
	let t = e.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/).filter(Boolean), n = t.filter((e) => !mn.has(e.toLowerCase()));
	return ((n.length ? n : t).slice(0, 2).map((e) => e[0]).join("") || "◆").toUpperCase();
}, hn = (e) => {
	let t = De(w?.find((e) => e.id === j?.id));
	return e ? t ? `<span class="${e} hasIcon"><img src="${t}" alt=""></span>` : `<span class="${e}" style="background:${pn(P())}">${h(F(P()))}</span>` : t ? `<img src="${t}" alt="">` : h(F(P()));
};
async function gn(e, t) {
	let n = URL.createObjectURL(e);
	try {
		let e = await new Promise((e, t) => {
			let r = new Image();
			r.onload = () => e(r), r.onerror = () => t(Error(p("Não consegui ler essa imagem."))), r.src = n;
		}), r = document.createElement("canvas");
		r.width = r.height = t;
		let i = Math.min(t / e.naturalWidth, t / e.naturalHeight), a = e.naturalWidth * i, o = e.naturalHeight * i;
		return r.getContext("2d").drawImage(e, (t - a) / 2, (t - o) / 2, a, o), await new Promise((e) => r.toBlob(e, "image/png"));
	} finally {
		URL.revokeObjectURL(n);
	}
}
async function _n(e) {
	let t = document.querySelector("link[rel=\"icon\"]");
	if (!e) {
		t.type = "image/svg+xml", t.href = "/favicon.svg";
		return;
	}
	let n = De(w?.find((e) => e.id === j?.id));
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
	i.fillStyle = pn(e), i.beginPath(), i.roundRect(0, 0, 64, 64, 14), i.fill();
	let a = i.createRadialGradient(56, 8, 0, 56, 8, 44);
	a.addColorStop(0, "rgba(255,255,255,.28)"), a.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = a, i.fill();
	let o = F(e);
	i.fillStyle = "#fff", i.textAlign = "center", i.textBaseline = "middle", i.font = `400 ${o.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`, i.fillText(o, 32, 35), t.type = "image/png", t.href = r.toDataURL("image/png");
}
var vn = !1;
function yn() {
	vn = !vn;
	try {
		localStorage.setItem("vb.rail", vn ? "1" : "0");
	} catch {}
	m.querySelector(".book")?.classList.toggle("rail", vn), z();
}
function bn(e) {
	e.innerHTML = `
    <button class="iconBtn" id="railToggle" title="${p("Abrir menu")}" aria-label="${p("Abrir menu")}" aria-expanded="false">${dn}</button>
    <a data-nav href="/app" class="iconBtn" title="${p("Seus vibebooks")}" aria-label="${p("Seus vibebooks")}" style="text-decoration:none">${E("back", 20)}</a>
    <div class="railSep"></div>
    <div class="railList">
      <button class="rb geral ${M === "main" ? "sel" : ""} ${De(w?.find((e) => e.id === j.id)) ? "hasIcon" : ""}" style="background:${pn(P())}" data-thread="main" title="${h(P())}" aria-label="${h(P())}">${hn("")}</button>
      ${j.epics.filter((e) => !e.archived || e.id === M).map((e) => {
		let t = e.tasks.filter((e) => e.done).length, n = e.tasks.length ? 100 * t / e.tasks.length : 0;
		return `
        <button class="rb ${M === e.id ? "sel" : ""} ${gr(e.id).length ? "waiting" : ""}" data-thread="${e.id}" title="${h(e.title)} · ${t}/${e.tasks.length}" aria-label="${h(e.title)}" style="background:${g(e.title)}">
          ${e.owner ? `<span class="rbOwner">${yr(e.owner)}</span>` : h(F(e.title))}${e.tasks.length ? `<span class="ring" style="--p:${n}%"></span>` : ""}</button>`;
	}).join("")}
      <button class="rb add" id="railAdd" title="${p("Novo épico")}" aria-label="${p("Novo épico")}">${E("plus", 18)}</button>
    </div>
    <div class="railPeople">${(j.requests || []).length ? `<button class="rb askBadge" id="railAsks" title="${p("{n} pedindo pra entrar", { n: j.requests.length })}" aria-label="${p("{n} pedindo pra entrar", { n: j.requests.length })}">+${j.requests.length}</button>` : ""}${j.members.slice(0, 8).map((e) => v(e, j.online.includes(e))).join("")}</div>`, e.querySelector("#railToggle").onclick = yn, e.querySelector("#railAsks")?.addEventListener("click", yn), e.querySelector("#railAdd").onclick = () => {
		yn(), document.querySelector("#newEpic input")?.focus();
	}, e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		M = e.dataset.thread, Q = !1, Nr = M === "main" || I() ? null : M, z(), Z(), V(), $();
	});
}
var I = () => M.startsWith("pre:"), xn = () => I() ? j.suggestions[Number(M.slice(4))] : null, Sn = null;
function Cn(e) {
	let t = xn();
	if (!t) return M = "main", Z();
	e.innerHTML = `<div class="preCard">
    <p class="kicker">✦ ${p("O @vibe sugere um épico")}</p>
    <h3>${h(t.title)}</h3>
    <p class="${t.why ? "" : "muted"}">${h(t.why || p("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."))}</p>
    ${t.tasks.length ? `<h4>${p("Tarefas propostas")}</h4><ul>${t.tasks.map((e) => `<li>${h(e)}</li>`).join("")}</ul>` : ""}
    <div class="row"><button class="primary" id="preAccept">${p("Pedir pro meu agent")}</button><button class="ghost" id="preSkip">${p("Descartar")}</button></div>
    <p class="muted">${p("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")}</p>
  </div>`;
	let n = Number(M.slice(4));
	e.querySelector("#preAccept").onclick = () => {
		N({
			t: "suggestion",
			i: n,
			accept: !0
		}), M = "main", Z();
	}, e.querySelector("#preSkip").onclick = () => {
		Sn = n, N({
			t: "suggestion",
			i: n
		});
	};
}
var L = {
	id: null,
	list: []
};
async function wn() {
	if (!j?.id) return;
	let e = await S(`/api/books/${j.id}/agents`).catch(() => null);
	e && (L = {
		id: j.id,
		list: e.agents,
		claudeOn: e.claude_on,
		sandboxes: e.sandboxes || []
	}, jn(), z());
}
var Tn = "http://127.0.0.1:47321", En = null, Dn = () => En && Date.now() - En.at < 2e4 ? Promise.resolve(En.rooms) : fetch(`${Tn}/ping`).then((e) => e.json()).then((e) => (En = {
	at: Date.now(),
	rooms: e.rooms
}).rooms).catch(() => (En = {
	at: Date.now(),
	rooms: null
}).rooms), On = {}, kn = (e, t) => {
	let n = On[e];
	return n && Date.now() - n.at < 2e4 ? Promise.resolve(n.w) : fetch(`${Tn}/where?room=${e}&title=${encodeURIComponent(t || "")}`).then((e) => e.ok ? e.json() : null).catch(() => null).then((t) => (On[e] = {
		at: Date.now(),
		w: t
	}).w);
}, An = {
	used: p("a pasta onde ele já abriu antes"),
	linked: p("ligada a esta sala pelo arquivo .vibebook"),
	slug: p("a pasta com o nome da sala"),
	new: p("pasta nova com o nome da sala, criada ao ligar")
};
function jn() {
	let e = document.getElementById("myClaude");
	if (e && L.id !== j?.id) {
		let e = document.getElementById("claudeBar");
		e && (e.hidden = !0);
	}
	if (!e || L.id !== j?.id) return;
	let t = !!L.claudeOn, n = L.list.some((e) => e.email === j.me && e.listening);
	e.hidden = !1, e.setAttribute("aria-pressed", String(t));
	let r = On[j.id]?.w, i = r?.folder ? r.folder.startsWith(r.home + "/") ? "~" + r.folder.slice(r.home.length) : r.folder : "";
	e.innerHTML = `✻ <span class="lbl">${p(t ? n ? "ouvindo" : "não ouvindo" : "Ligar agent")}</span>${i ? `<span class="where">${h(i.replace(/^~\/Projects\//, ""))}${r.how === "new" ? ` ${E("plus", 12)}` : ""}</span>` : ""}`, On[j.id] || kn(j.id, P()).then((e) => e && jn()), e.title = (i ? `${p("Abre em {path} ({how}).", {
		path: i,
		how: An[r.how] || p("pasta da sala")
	})}\n\n` : "") + p(t && !n ? "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar." : t ? "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada)." : "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina."), rr(t, n || L.list.some((e) => e.email === j.me && Date.now() - e.seen_at < 18e5)), e.onclick = () => document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), Nn(t, n, i, r);
}
async function Mn() {
	let e = !L.claudeOn;
	L.claudeOn = e, e && (Qn[j.id] = Date.now()), jn(), await S(`/api/books/${j.id}/claude`, { on: e }).catch(() => {
		L.claudeOn = !e, jn();
	});
}
function Nn(e, t, n, r) {
	let i = document.getElementById("agentsPane");
	if (!i) return;
	let a = L.list.filter((e) => e.email === j.me), o = Vn(), s = t || a.some((e) => Date.now() - e.seen_at < 18e5);
	if (document.querySelectorAll(".peekAgents, .ptAgents").forEach((e) => {
		let t = o.find((e) => e.st === "blocked");
		e.dataset.q = t ? "blocked" : o.length ? "busy" : s ? "idle" : "", e.querySelector(".qN").textContent = o.length ? String(o.length) : "", e.title = t ? p("Seu agent espera você no terminal") : o.length ? p("Fila do seu agent: {n}", { n: o.length }) : s ? p("Seu agent está livre") : "Agents";
	}), document.getElementById("docPeek")?.classList.toggle("agLive", t), !document.querySelector(".doc[data-pane=\"agents\"]")) {
		i.innerHTML = "";
		return;
	}
	i.innerHTML = `<h4>${p("Seus agents nesta sala")}</h4>
    <div class="agCard${e ? " on" : ""}"><span class="agIcon">✻</span><div><b>${p("Claude Code no seu computador")}</b>
      <small>${e ? t ? p("ligado · ouvindo esta sala") : a.some((e) => Date.now() - e.seen_at < 18e5) ? p("ligado · trabalhando agora") : p("ligado · ainda não está ouvindo") : p("desligado")}${n ? ` · ${h(n.replace(/^~\/Projects\//, ""))}${r?.how === "new" ? ` (${p("pasta nova")})` : ""}` : ""}</small></div>
      <button type="button" class="ghost agGo" id="agGo" hidden title="${p("Ir pro seu agent desta sala no herdr")}" aria-label="${p("Ir pro seu agent no herdr")}">${E("external", 16)}</button>
      <label class="agSwitch"><input type="checkbox" id="agToggle" ${e ? "checked" : ""} /><i></i></label></div>
    <p class="agNote">${p("Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.")}</p>
    <div class="agConn"><b>${p("Conectar seu agente")}</b><small>${p("Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.")}</small><code>${h(tr())}</code><button type="button" class="primary" id="agConnCopy">${p("Copiar prompt")}</button></div>
    <h4>${p("Fila do seu agent")} <small>${o.length || ""}</small></h4>
    ${o.length ? `<div class="queue${Ln ? " open" : ""}">${o.map((e) => {
		let t = j.epics.find((t) => t.id === e.m.thread), n = t ? br(t) : hn("ri"), r = e.st === "blocked" ? p("espera você no terminal") : e.st === "doing" ? p("fazendo") : p("na fila");
		return `<div class="qRow"><button type="button" class="qGo" data-goto="${e.m.id}" title="${h(t ? t.title : p("sala principal"))} · ${y(e.m.ts)}">${v(j.me)}${n}<span class="qTx">${h(e.m.text.replace(/\s+/g, " ").slice(0, 120))}</span><i class="qS ${e.st}" title="${r}"></i></button><button type="button" class="qX" data-dismiss="${e.m.id}" title="${p("Tirar da fila (já resolvido)")}" aria-label="${p("Tirar da fila (já resolvido)")}">${E("x")}</button></div>`;
	}).join("")}${o.length > 4 ? `<button type="button" class="qMore" id="qMore">${Ln ? p("mostrar menos") : p("mostrar mais {n}", { n: o.length - 4 })}</button>` : ""}</div>` : `<p class="agNote">${p("Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.")}</p>`}
    ${a.length ? `<h4>${p("Conectados")}</h4><div class="agList">${lr(j.me)}</div>` : ""}
    <h4>${p("Na nuvem")}</h4><div id="sbx">${Gn()}</div>`, document.getElementById("agToggle").onchange = Mn, document.getElementById("agConnCopy").onclick = nr;
	let c = document.getElementById("agGo");
	e && Dn().then((e) => {
		c.isConnected && (c.hidden = !e?.includes(j.id));
	}), c.onclick = () => fetch(`${Tn}/focus?room=${j.id}`).then((e) => e.json()).then((e) => e.error && B(h(e.error))).catch(() => B(p("O vibebook herdr não está rodando nesta máquina."))), i.querySelectorAll("[data-goto]").forEach((e) => e.onclick = () => {
		H.matches && U(), yi(Number(e.dataset.goto));
	}), i.querySelectorAll("[data-dismiss]").forEach((e) => e.onclick = () => N({
		t: "ack.dismiss",
		id: Number(e.dataset.dismiss)
	})), document.getElementById("qMore")?.addEventListener("click", () => {
		Ln = !Ln, jn();
	}), Kn();
}
var Pn = (e) => ((e.run_s || 0) / 3600 + (e.state === "running" && e.checked_at ? (Date.now() - e.checked_at) / 36e5 : 0)) * (e.rate || 0) + (Date.now() - e.created_at) / 36e5 * (e.disk_rate || 0), Fn = (e) => `US$${e < 10 ? e.toFixed(2) : Math.round(e)}`.replace(".", u === "en" ? "." : ",");
function In() {
	return L.id !== j?.id || !L.sandboxes?.length ? "" : L.sandboxes.map((e) => `<button type="button" class="member sbxRow ${h(e.state || "")}" data-sbx-open title="${h(e.name)} · ${p("de {who}", { who: h(_(e.email)) })}">
    <span class="sbxIco">☁</span><span class="fnCol"><span class="fn">${h(e.name)}</span><small>${h(_(e.email).split(" ")[0])} · ${p(Un[e.state] || e.state || "?")}</small></span><span class="money">${Fn(Pn(e))}</span></button>`).join("");
}
var Ln = !1, Rn = () => {}, zn = () => {}, Bn = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || "");
function Vn() {
	let e = Date.now() - 1728e5, t = /* @__PURE__ */ new Map();
	for (let e of j.acks || []) e.email === j.me && (t.get(e.msg_id) ?? t.set(e.msg_id, []).get(e.msg_id)).push(e);
	let n = j.messages ? X() : [];
	return n.filter((t) => t.author === j.me && !t.kind && t.text && t.ts > e && !n.some((e) => e.id === t.reply_to && Bn(e))).map((e) => {
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
}, Hn = 0, Un = {
	running: "rodando",
	starting: "ligando",
	pausing: "pausando",
	paused: "pausado",
	stopped: "parado",
	deleted: "apagado no freestyle",
	unknown: "?"
};
async function Wn() {
	if (!j?.id) return;
	clearTimeout(Hn);
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
	t && (t.innerHTML = Gn(), Kn()), e.sandboxes.some((e) => !e.ready || e.state !== "running" && /ing$/.test(e.state)) && document.querySelector(".doc[data-pane=\"agents\"]") && (Hn = setTimeout(Wn, 5e3));
}
function Gn() {
	if (R.id !== j?.id || R.connected === null) return `<p class="agNote">${p("carregando…")}</p>`;
	let e = R.err ? `<p class="agErr">${h(R.err)}</p>` : "";
	return R.connected ? `${R.claude ? `<div class="fsOn">${E("check", 13)} ${p("Claude conectado: sandboxes novos já sobem logados")} · <button type="button" class="ghost" id="ctOff">${p("remover")}</button></div>` : `<div class="agCard col"><b>${p("Conecte sua conta do Claude")}</b><small>${p("No seu terminal, rode:")}</small><div class="cpCmd"><code>claude setup-token</code><button type="button" class="ghost" data-cp="claude setup-token">${p("Copiar")}</button></div><small>${p("Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.")}</small>
      <form id="ctForm" class="fsForm"><input type="password" name="token" autocomplete="off" placeholder="sk-ant-…" required /><button class="primary" ${R.busy ? "disabled" : ""}>${R.busy === "ct" ? p("Salvando…") : p("Salvar")}</button></form>${R.errAt === "ct" && R.err ? `<p class="agErr">${h(R.err)}</p>` : ""}</div>`}${R.list.map((e) => `<div class="sbxCard ${e.state}"><div class="sbxTop"><span class="agIcon">☁</span><div><b>${h(e.name)}</b>
      <small>${!e.ready && e.state === "running" ? p("preparando (uns 3 min)…") : p(Un[e.state] || e.state)}${e.rate ? ` · ${Fn(e.rate)}/h` : ""}${e.error ? ` · ${h(e.error)}` : ""}</small>${R.logs?.[e.id] ? `<pre class="sbxLog">${h(R.logs[e.id])}</pre>` : !e.ready && e.log ? `<code class="sbxLog">${h(e.log)}</code>` : ""}</div><span class="money" title="${p("gasto até agora na sua conta do freestyle")}">${Fn(e.cost || 0)}</span></div>
      <div class="sbxActs">${e.state === "deleted" ? "" : `<button class="primary" data-sbx-term="${h(e.id)}">${p("Terminal")}</button>`}
      ${e.state === "running" ? `<button class="ghost" data-sbx-act="pause" data-id="${h(e.id)}">${p("Pausar")}</button>` : e.state === "paused" || e.state === "stopped" ? `<button class="ghost" data-sbx-act="start" data-id="${h(e.id)}">${p("Retomar")}</button>` : ""}
      ${!e.ready && e.state === "running" ? `<button class="ghost" data-sbx-setup="${h(e.id)}" title="${p("Rodar o setup de novo")}" ${R.busy ? "disabled" : ""}>${R.busy === "setup:" + e.id ? p("Rodando setup… (até 4 min)") : p("Refazer setup")}</button>` : ""}
      <button class="ghost del" data-sbx-del="${h(e.id)}" aria-label="${p("Apagar sandbox")}" title="${p("Apagar sandbox")}">${E("trash", 16)}</button></div></div>`).join("")}
    <button class="agNew on" id="sbxNew" ${R.busy ? "disabled" : ""}>${E("plus", 16)} ${R.busy === "new" ? p("Criando…") : p("Criar sandbox")}<small>${p("Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.")}</small></button>${R.errAt === "ct" ? "" : e}
    <div class="fsOn">${E("check", 13)} ${p("freestyle.sh conectado")} · <button type="button" class="ghost" id="fsOff">${p("desconectar")}</button></div>` : `<div class="agCard col"><b>${p("Conecte sua conta do freestyle.sh")}</b>
    <small>${p("O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:")}</small><div class="cpCmd"><code>npx freestyle@latest tokens create vibebook</code><button type="button" class="ghost" data-cp="npx freestyle@latest tokens create vibebook">${p("Copiar")}</button></div><small>${p("Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.")}</small>
    <form id="fsForm" class="fsForm"><input type="password" name="key" autocomplete="off" placeholder="${p("API key do freestyle")}" required /><button class="primary" ${R.busy ? "disabled" : ""}>${R.busy === "key" ? p("Conferindo…") : p("Conectar")}</button></form>${e}</div>`;
}
function Kn() {
	let e = () => {
		let e = document.getElementById("sbx");
		e && (e.innerHTML = Gn(), Kn());
	}, t = async (t, n) => {
		R.busy = t, R.errAt = t, R.err = "", e();
		try {
			let e = await n();
			e?.error && (R.err = e.error);
		} catch {
			R.err = p("sem conexão");
		}
		R.busy = "", await Wn(), e();
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
	}), document.getElementById("ctOff")?.addEventListener("click", () => confirm(p("Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.")) && t("ct", () => n("DELETE", "/api/claude-token"))), document.getElementById("fsOff")?.addEventListener("click", () => confirm(p("Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.")) && t("off", () => n("DELETE", "/api/freestyle"))), document.getElementById("sbxNew")?.addEventListener("click", () => t("new", () => n("POST", `/api/books/${j.id}/sandboxes`, {}))), document.querySelectorAll("[data-sbx-setup]").forEach((e) => e.onclick = () => t(`setup:${e.dataset.sbxSetup}`, async () => {
		let t = await n("POST", `/api/sandboxes/${e.dataset.sbxSetup}/setup`);
		return R.logs = {
			...R.logs,
			[e.dataset.sbxSetup]: t.log || t.error || ""
		}, t;
	})), document.querySelectorAll("[data-sbx-act]").forEach((e) => e.onclick = () => t("act", () => n("POST", `/api/sandboxes/${e.dataset.id}/${e.dataset.sbxAct}`))), document.querySelectorAll("[data-sbx-del]").forEach((e) => e.onclick = () => confirm(p("Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.")) && t("del", () => n("DELETE", `/api/sandboxes/${e.dataset.sbxDel}`))), document.querySelectorAll("[data-sbx-term]").forEach((e) => e.onclick = () => Zn(e.dataset.sbxTerm, R.list.find((t) => t.id === e.dataset.sbxTerm)?.name));
}
var qn = "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0", Jn = "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js", Yn = {
	Esc: "\x1B",
	Tab: "	",
	"Ctrl-C": "",
	"↑": "\x1B[A",
	"↓": "\x1B[B",
	"←": "\x1B[D",
	"→": "\x1B[C",
	"/": "/"
}, Xn = (e) => new Promise((t, n) => {
	let r = Object.assign(document.createElement("script"), {
		src: e,
		onload: t,
		onerror: n
	});
	document.head.append(r);
});
async function Zn(e, t) {
	window.Terminal || (document.head.append(Object.assign(document.createElement("link"), {
		rel: "stylesheet",
		href: `${qn}/css/xterm.css`
	})), await Xn(`${qn}/lib/xterm.js`), await Xn(Jn));
	let n = document.createElement("dialog");
	n.className = "termDlg", n.innerHTML = `<header><b>☁ ${h(t || "sandbox")}</b><span id="termSt">${p("conectando…")}</span><button class="ghost" data-close aria-label="${p("Fechar")}">${E("x")}</button></header><div class="termBox" id="termBox"></div>
    <div class="termKeys">${Object.keys(Yn).map((e) => `<button type="button" data-k="${h(e)}">${h(e)}</button>`).join("")}</div>`, document.body.append(n), n.showModal();
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
	let l = await fetch(`/api/sandboxes/${e}/terminal`, { method: "POST" }).then((e) => e.json()).catch(() => ({ error: p("sem conexão") }));
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
			t.type === "sessionInfo" ? a.textContent = p("conectado") : t.type === "exited" ? a.textContent = p("terminou") : t.type === "error" && (a.textContent = t.message);
		} catch {}
	}, o.onclose = () => {
		s || (a.textContent = p("desconectado: feche e abra de novo"));
	}, r.onData((e) => o.readyState === 1 && o.send(d.encode(e))), new ResizeObserver(() => {
		i.fit(), o.readyState === 1 && o.send(JSON.stringify({
			type: "resize",
			cols: r.cols,
			rows: r.rows
		}));
	}).observe(n.querySelector("#termBox")), n.querySelectorAll("[data-k]").forEach((e) => e.onclick = () => {
		o.readyState === 1 && o.send(d.encode(Yn[e.dataset.k])), r.focus();
	}), r.focus();
}
var Qn = {}, $n = 0, er = {}, tr = () => `Read ${location.origin}/llms.txt and set up vibebook for this project. Room: ${location.origin}/b/${j.id}`;
function nr() {
	let e = tr();
	(navigator.clipboard?.writeText(e) ?? Promise.reject()).then(() => B(p("Copiado. Cole no Claude Code, dentro da pasta do projeto.")), () => window.prompt(p("Copie e cole no seu Claude Code:"), e));
}
function rr(e, t) {
	let n = document.getElementById("claudeBar");
	if (!n) return;
	clearTimeout($n);
	let r = document.getElementById("agentNudge"), i = "vb.claudeBar.off", a = !1;
	try {
		a = localStorage.getItem(i) === "off";
	} catch {}
	let o = `<button class="ghost" data-x aria-label="${p("Fechar")}" title="${p("Fechar")}">×</button>`, s = (e, t) => {
		n.className = `claudeBar ${e}`, n.innerHTML = t, n.hidden = !1;
		let r = n.querySelector("[data-x]");
		r && (r.onclick = () => {
			try {
				localStorage.setItem(i, "off");
			} catch {}
			n.hidden = !0, clearTimeout($n);
		});
	}, c = !1;
	try {
		c = localStorage.getItem(`vb.start.${j.id}`) === "off";
	} catch {}
	if (j.book?.owner === j.me && !j.epics.length && M === "main" && !c) return ir(n, e, t, `vb.start.${j.id}`);
	if (St || r && !r.hidden || t && !er[j.id] || a && !Qn[j.id]) n.hidden = !0;
	else if (t) er[j.id] = !1, s("ok", `<span class="star">✻</span><span><b>${p("Seu agent está ouvindo esta sala.")}</b></span>`), setTimeout(() => n.hidden = !0, 5e3);
	else if (e) {
		er[j.id] = !0;
		let e = Date.now() - (Qn[j.id] || 0) > 18e4;
		s("wait", `<span class="star">✻</span><span><b>${p(e ? "Seu agent ainda não está ouvindo." : "Abrindo seu agent no seu computador…")}</b><small>${p(e ? "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá." : "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.")}</small></span>${o}`), e || ($n = setTimeout(jn, 18e4 - (Date.now() - (Qn[j.id] || 0)) + 500));
	} else er[j.id] = !1, s("", `<span class="star">✻</span><span><b>${p("Seu agent não está nesta sala.")}</b><small>${p("Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.")}</small></span><button class="primary" data-conn>${p("Conectar seu agente")}</button><button class="ghost" data-on>${p("Ligar agent")}</button>${o}`), n.querySelector("[data-on]").onclick = () => document.getElementById("myClaude")?.click(), n.querySelector("[data-conn]").onclick = nr;
}
function ir(e, t, n, r) {
	let i = (j.members || []).filter((e) => e !== j.me), a = (e, t) => `<li class="${e}"><i>${e === "ok" ? "✓" : e === "wait" ? "✻" : "○"}</i><span>${t}</span></li>`, o = St ? a("todo", p("Conecte seu agent (o card acima diz como)")) : n ? a("ok", p("Seu agent está aqui")) : t ? a("wait", p("Abrindo seu agent no seu computador…")) : a("todo", `${p("Seu agent está desligado nesta sala")} <button class="linkish" data-on>${p("Ligar")}</button>`);
	e.className = "claudeBar start", e.hidden = !1, e.innerHTML = `<span class="star">✻</span><span><b>${p("Começando a sala")}</b><ul>
    ${a("ok", p("Sala criada"))}
    ${i.length ? a("ok", p("Na sala: {who}", { who: h(i.map(_).join(", ")) })) : a("todo", p("Só você aqui: convide em Pessoas"))}
    ${o}
    ${a(n ? "wait" : "todo", p("O agent escreve o doc e cria os épicos"))}
  </ul></span><button class="ghost" data-x aria-label="${p("Fechar")}" title="${p("Fechar")}">×</button>`, e.querySelector("[data-on]")?.addEventListener("click", () => document.getElementById("myClaude")?.click()), e.querySelector("[data-x]").onclick = () => {
		try {
			localStorage.setItem(r, "off");
		} catch {}
		e.hidden = !0, clearTimeout($n);
	};
}
var ar = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`, or = (e) => Math.min(100, Math.round(e.tokens / e.window * 100)), sr = (e) => {
	let t = or(e), n = (e, t = 60, n = 80) => `<i class="ctx ${e >= n ? "hot" : e >= t ? "mid" : ""}" style="--p:${e}%"></i>`, r = (e, t, r) => `<div><div class="l"><b>${e}</b><span>${r}</span></div>${n(t)}</div>`, i = ["five_hour", "seven_day"].map((t) => {
		let n = e.limits?.[t];
		if (!n || n.r * 1e3 < Date.now()) return "";
		let i = /* @__PURE__ */ new Date(n.r * 1e3), a = i.toLocaleTimeString(d, {
			hour: "2-digit",
			minute: "2-digit"
		}), o = t === "five_hour" ? a : `${i.toLocaleDateString(d, { weekday: "short" }).replace(".", "")} ${a}`;
		return r(p(t === "five_hour" ? "Sessão de 5h" : "Semana"), n.p, p("{p}% · reseta {at}", {
			p: n.p,
			at: o
		}));
	});
	return `<div class="ctip">${r(p("Contexto"), t, `${t}% · ${ar(e.tokens)}/${ar(e.window)}`)}${i.join("")}</div>`;
}, cr = (e) => {
	if (!e) return "";
	let t = or(e);
	return `<i class="ctx ${t >= 80 ? "hot" : t >= 60 ? "mid" : ""}" style="--p:${t}%"></i>`;
}, lr = (e) => {
	if (L.id !== j?.id) return "";
	let t = /* @__PURE__ */ new Set();
	return L.list.filter((t) => t.email === e).sort((e, t) => t.listening - e.listening).filter((e) => !t.has(ma(e.who) + e.repo) && t.add(ma(e.who) + e.repo)).slice(0, 3).map((t) => `<div class="member agentRow" title="${p("{via} de {who}", {
		via: h(ma(t.who)),
		who: h(_(e))
	})}${t.repo ? ` ${p("em {repo}", { repo: h(t.repo) })}` : ""} · ${t.listening ? t.all_rooms ? p("ouvindo todas as salas agora") : p("ouvindo esta sala agora") : p("visto há {ago}", { ago: y(t.seen_at) })}"><span class="aglyph ${ie(t.who)[0]} ${t.listening ? "on" : ""}">${ie(t.who)[1]}</span><span class="fn">${h(ma(t.who).replace(/^Claude\s+/i, ""))}${t.repo ? ` · ${h(t.repo)}` : ""}</span><small>${t.listening ? p("ouvindo") : y(t.seen_at)}${t.context ? ` · ${or(t.context)}%` : ""}</small>${cr(t.context)}${t.context ? sr(t.context) : ""}</div>`).join("");
}, ur = (e) => {
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
}, dr = () => {
	let e = new Set(X().filter((e) => e.thread === "main").map((e) => e.id)), t = new Set((j.epics || []).map((e) => e.from_msg)), n = (j.acks || []).filter((n) => e.has(n.msg_id) && !t.has(n.msg_id) && n.status !== "dismissed").sort((e, t) => t.ts - e.ts), r = n.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5 && n.find((t) => t.msg_id === e.msg_id && t.who === e.who) === e);
	return r ? {
		who: r.who,
		email: r.email
	} : null;
}, fr = (e) => {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let i = `${r.who}|${r.email}`;
		r.status === "doing" && Date.now() - r.ts < 12e5 && !t.has(i) && e.find((e) => e.msg_id === r.msg_id && e.who === r.who && e.email === r.email) === r && (t.add(i), n.push({
			who: r.who,
			email: r.email
		}));
	}
	return n;
}, pr = () => {
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
	let n = fr((j.acks || []).filter((e) => t.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts));
	if (n.length) return n;
	let r = e ? ur(e) : dr();
	return r ? [r] : [];
}, mr = (e) => {
	let t = ur(e);
	return t ? p("{via} de {who}", {
		via: t.who,
		who: _(t.email)
	}) : null;
};
function hr() {
	let e = document.getElementById("msgs");
	if (!e || !j) return;
	e.querySelector("#working")?.remove();
	let t = pr();
	if (e.querySelector(".empty")?.classList.toggle("hidden", !!t.length), !t.length) return;
	let n = (e) => `<b>${p("{via} de {who}", {
		via: h(e.who),
		who: h(_(e.email))
	})}</b>`;
	e.insertAdjacentHTML("beforeend", `<div id="working" class="working"><span class="wAv">${t.slice(0, 4).map((e) => ae(e.email, e.who)).join("")}</span><div>${t.length === 1 ? `${n(t[0])} ${p("está trabalhando nisso")}` : `${t.map(n).join(", ")} ${p("estão trabalhando nisso")}`}<small>${p("O andamento e a entrega aparecem aqui nesta thread.")}</small></div><span class="spin">✻</span></div>`);
}
var gr = (e) => T.filter((t) => t.book_id === j?.id && (e === void 0 || t.thread === e)), _r = (e) => {
	let t = gr(e), n = t.length;
	return n ? `<b class="wN${_e(t)}" title="${n === 1 ? p("Alguém está esperando você aqui") : p("{n} coisas esperando você aqui", { n })}">${n}</b>` : "";
}, vr = (e) => e.prod ? e.prod.stage === "verified" ? `<span class="prodMark ok" title="${h(p("Verificado em prod") + (e.prod.note ? `: ${e.prod.note}` : ""))}">✓✓</span>` : `<span class="prodMark" title="${p("No ar, falta verificar em prod")}">🚀</span>` : "", yr = (e) => {
	let t = j?.avatars?.[e] ?? re[e];
	return t ? `<img src="/api/avatar/${encodeURIComponent(e)}?v=${t}" alt="" loading="lazy" />` : h(_(e).slice(0, 2).toUpperCase());
}, br = (e, t) => e.owner ? `<span class="ri epOwner" style="background:${g(e.owner)}" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" ` : ""}title="${h(p("Dono: {who}", { who: _(e.owner) }))}${t ? ` · ${p("clique pra trocar")}` : ""}">${yr(e.owner)}</span>` : `<span class="ri" style="background:${g(e.title)};color:#fff" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" title="${p("Sem dono · clique pra escolher")}"` : ""}>${h(F(e.title))}</span>`;
function xr(e, t) {
	document.getElementById("ownMenu")?.remove();
	let n = j.epics.find((e) => e.id === t);
	if (!n) return;
	let r = document.createElement("div");
	r.id = "ownMenu", r.className = "ownMenu", r.setAttribute("role", "menu"), r.innerHTML = `<p>${p("Dono do épico")}</p>${j.members.map((e) => `<button type="button" role="menuitemradio" aria-checked="${n.owner === e}" data-own="${h(e)}">${v(e)}<span>${h(_(e))}</span>${n.owner === e ? E("check", 14) : ""}</button>`).join("")}<button type="button" role="menuitemradio" aria-checked="${!n.owner}" data-own=""><span class="avatar none">–</span><span>${p("Sem dono")}</span>${n.owner ? "" : E("check", 14)}</button>`, document.body.append(r);
	let i = e.getBoundingClientRect();
	r.style.left = `${Math.max(8, Math.min(i.left, innerWidth - r.offsetWidth - 8))}px`, r.style.top = `${i.bottom + 6 + r.offsetHeight > innerHeight ? Math.max(8, i.top - r.offsetHeight - 6) : i.bottom + 6}px`;
	let a = () => {
		r.remove(), removeEventListener("pointerdown", o, !0), removeEventListener("keydown", s);
	}, o = (e) => {
		r.contains(e.target) || a();
	}, s = (e) => {
		e.key === "Escape" && a();
	};
	setTimeout(() => {
		addEventListener("pointerdown", o, !0), addEventListener("keydown", s);
	}), r.querySelectorAll("[data-own]").forEach((e) => e.onclick = () => {
		N({
			t: "epic.owner",
			id: t,
			owner: e.dataset.own
		}), a();
	}), r.querySelector("button")?.focus();
}
var Sr = (e) => {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}, Cr = !1;
function wr() {
	let e = j.pins || [];
	return `<div class="sec pinsSec"><h4>${p("Fixados")}${Cr ? "" : `<button type="button" class="ghost pinPlus" id="pinPlus" title="${p("Fixar um link")}" aria-label="${p("Fixar um link")}">${E("plus", 14)}</button>`}</h4>
      ${e.map((e) => {
		let t, n = "", r = e.title, i = "", a;
		if (e.kind === "link") t = e.ref, n = "target=\"_blank\" rel=\"noopener\"", i = Sr(e.ref), r ||= i, a = `<span class="ri pinIco" style="background:${g(i)}">${h(i[0]?.toUpperCase() || "↗")}</span>`;
		else if (e.kind === "app") {
			let o = e.ref.includes("/") ? `#app:${e.ref}` : `#app:room/${e.ref}`;
			t = h(o), n = `data-cardgo="${h(o)}"`, r ||= e.ref.split("/").pop(), i = e.ref.includes("/") ? "app" : p("app da sala"), a = `<span class="ri pinIco app">${E("grid", 14)}</span>`;
		} else {
			let o = (j.files || []).find((t) => t.id === e.ref);
			if (!o) return "";
			t = Hr(o), n = `target="_blank" rel="noopener" ${Ur(o)}`, r ||= o.name, i = p("arquivo"), a = `<span class="ri pinIco app">${E("file", 14)}</span>`;
		}
		return `<div class="pinRow"><a class="thread pin" href="${h(t)}" ${n} title="${h(r)}${e.kind === "link" ? ` · ${h(e.ref)}` : ""}">${a}<span class="rt">${h(r)}<small>${h(i)}</small></span></a><button type="button" class="ghost x" data-unpin="${h(e.id)}" title="${p("Desafixar")}" aria-label="${p("Desafixar {name}", { name: h(r) })}">${E("x", 14)}</button></div>`;
	}).join("")}
      ${Cr ? `<form id="pinForm" class="pinForm"><input name="url" required placeholder="${p("Cole um link (site, repo, painel…)")}" aria-label="${p("Link pra fixar")}" enterkeyhint="done" /><input name="title" maxlength="80" placeholder="${p("Nome (opcional)")}" aria-label="${p("Nome")}" /><div class="row"><button type="button" class="ghost" id="pinCancel">${p("Cancelar")}</button><button class="primary">${p("Fixar")}</button></div></form>` : e.length ? "" : `<button type="button" class="pinEmpty" id="pinEmpty">${E("pin", 14)}<span>${p("Fixar site, repo ou app")}</span></button>`}
    </div>`;
}
function Tr(e) {
	let t = () => {
		Cr = !0, z(), document.querySelector("#pinForm [name=url]")?.focus();
	}, n = e.querySelector("#pinPlus");
	n && (n.onclick = t);
	let r = e.querySelector("#pinEmpty");
	r && (r.onclick = t);
	let i = e.querySelector("#pinCancel");
	i && (i.onclick = () => {
		Cr = !1, z();
	});
	let a = e.querySelector("#pinForm");
	a && (a.onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = t.elements.namedItem("url").value.trim();
		n && (N({
			t: "pin.add",
			kind: "link",
			ref: n,
			title: t.elements.namedItem("title").value.trim()
		}), Cr = !1, z());
	}), e.querySelectorAll("[data-unpin]").forEach((e) => e.onclick = () => N({
		t: "pin.del",
		id: e.dataset.unpin
	}));
}
function Er() {
	let e = document.getElementById("askBar");
	if (!e) return;
	let t = gr().find((e) => /^a\d/.test(e.ref) && e.thread !== M);
	if (e.hidden = !t, !t) return;
	let n = (t.text || "").replace(/^(⏸|❓)\s*Seu Claude\s*/, "").replace(/[*`]/g, "").slice(0, 160);
	e.innerHTML = `<span>⏸ <b>${p("Seu agent espera você")}</b> ${p("em {where}", { where: h(t.topic || p("sala principal")) })}: ${h(n)}</span><button type="button" class="primary" data-askgo="${t.ref.slice(1)}">${p("Ver")}</button>`, e.querySelector("[data-askgo]").onclick = (e) => yi(Number(e.currentTarget.dataset.askgo));
}
function z() {
	vt(), Er();
	let e = document.getElementById("side");
	if (!e || !j) return;
	if (jn(), vn && window.innerWidth > 900) return zt("sidebar"), bn(e);
	Bt("sidebar", e, {
		room: j,
		thread: M,
		archOpen: Ar,
		foldOpen: jr,
		friends: Dt,
		vb: {
			t: p,
			icon: E,
			avatar: v,
			ago: y,
			name: _,
			initials: F,
			bookTitle: P,
			roomMark: hn,
			roomStrip: Mr,
			pinsSec: wr,
			sbxRows: In,
			agentRows: lr,
			epicIco: br,
			epicBusy: mr,
			waitPill: _r,
			waitsIn: gr,
			prodMark: vr
		}
	}), e.querySelector("#railToggle").onclick = yn, e.querySelectorAll("details.memMore > summary").forEach((e) => e.onclick = () => jr[e.parentElement.dataset.fold] = !e.parentElement.open), e.querySelectorAll(".epTabs [data-arch]").forEach((e) => e.onclick = () => {
		Ar = !!e.dataset.arch, z();
	}), Tr(e), e.querySelectorAll("[data-epowner]").forEach((e) => {
		let t = (t) => {
			t.preventDefault(), t.stopPropagation(), xr(e, e.dataset.epowner);
		};
		e.onclick = t, e.onkeydown = (e) => {
			(e.key === "Enter" || e.key === " ") && t(e);
		};
	});
	let t = e.querySelector(".sheetGrab");
	t && !Rt.has(t) && (Br(t, "side", !1), Rt.add(t));
	let n = e.querySelector("#sideRooms");
	n && (n.onclick = Ke);
	let r = e.querySelector("#sideRename");
	r && (r.onclick = (e) => {
		e.stopPropagation(), Fr();
	});
	let i = e.querySelector("#sideArch");
	i && (i.onclick = () => {
		U(), document.getElementById("epicArch")?.click();
	});
	let a = e.querySelector("#sideDel");
	a && (a.onclick = () => {
		U(), document.getElementById("epicDel")?.click();
	}), e.querySelectorAll(".epList > .thread[data-thread]:not(.pre)").forEach((e) => {
		e.draggable = !0, e.ondragstart = (t) => {
			t.dataTransfer.setData("text/vb-epic", e.dataset.thread), t.dataTransfer.effectAllowed = "move", e.classList.add("dragging");
		}, e.ondragend = () => e.classList.remove("dragging"), e.ondragover = (t) => {
			if (!t.dataTransfer.types.includes("text/vb-epic")) return;
			t.preventDefault();
			let n = e.getBoundingClientRect();
			e.classList.toggle("dropAbove", t.clientY < n.top + n.height / 2), e.classList.toggle("dropBelow", t.clientY >= n.top + n.height / 2);
		}, e.ondragleave = () => e.classList.remove("dropAbove", "dropBelow"), e.ondrop = (t) => {
			t.preventDefault(), e.classList.remove("dropAbove", "dropBelow");
			let n = t.dataTransfer.getData("text/vb-epic"), r = e.dataset.thread;
			if (!n || n === r) return;
			let i = j.epics.filter((e) => !e.archived).map((e) => e.id).filter((e) => e !== n), a = e.getBoundingClientRect();
			i.splice(i.indexOf(r) + +(t.clientY >= a.top + a.height / 2), 0, n);
			let o = [...i, ...j.epics.filter((e) => e.archived).map((e) => e.id)];
			j.epics.sort((e, t) => o.indexOf(e.id) - o.indexOf(t.id)), z(), N({
				t: "epic.order",
				ids: o
			});
		};
	}), e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		U(!0), M = e.dataset.thread, Q = !1, Nr = M === "main" || I() ? null : M, z(), Z(), V(), $();
	});
	let o = document.getElementById("newEpic"), s = o?.querySelector("input");
	s && (s.onfocus = (e) => setTimeout(() => e.target.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), 350)), o && (o.onsubmit = (e) => {
		e.preventDefault();
		let t = e.target[0].value.trim();
		if (!t) return e.target[0].focus();
		N({
			t: "epic",
			title: t
		}), e.target.reset();
	}), e.querySelectorAll("[data-remove]").forEach((e) => e.onclick = async () => {
		let t = e.dataset.remove;
		if (!confirm((j.pending || []).includes(t) ? p("Cancelar o convite de {email}?", { email: t }) : p("Remover {email} deste vibebook?", { email: t }))) return;
		let n = await fetch(`/api/books/${j.id}/members/${encodeURIComponent(t)}`, { method: "DELETE" });
		n.ok || alert((await n.json().catch(() => ({}))).error || p("Não deu para remover."));
	}), e.querySelectorAll("[data-ask]").forEach((e) => e.onclick = async () => {
		let t = !!e.dataset.ok, n = e.dataset.ask;
		(t || confirm(p("Recusar o pedido de {email}?", { email: n }))) && (e.disabled = !0, await S(`/api/books/${j.id}/requests`, {
			email: n,
			ok: t
		}).then(() => t && B(p("{email} entrou na sala e recebeu o link por email.", { email: h(n) }))).catch((t) => {
			alert(t.message), e.disabled = !1;
		}));
	}), e.querySelectorAll("[data-resend]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, e.textContent = "…";
		try {
			await S(`/api/books/${j.id}/members`, { email: e.dataset.resend }), e.textContent = `${p("enviado")} ✓`;
		} catch (t) {
			e.textContent = p("reenviar"), e.disabled = !1, alert(t.message);
		}
	}), e.querySelectorAll("[data-copyinv]").forEach((e) => e.onclick = () => kr(e.dataset.copyinv, !1)), e.querySelectorAll("[data-add]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, kr(e.dataset.add), await S(`/api/books/${j.id}/members`, { email: e.dataset.add }).catch((t) => {
			alert(t.message), e.disabled = !1;
		});
	}), document.getElementById("invite").onsubmit = async (e) => {
		e.preventDefault();
		let t = e.target[0].value.trim();
		kr(t), await S(`/api/books/${j.id}/members`, { email: t }).catch((e) => alert(e.message)), e.target.reset();
	}, document.title = `${j.book?.title ?? "vibebook"} · vibebook`, _n(P());
}
function Dr() {
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
			if (!a.ok) throw Error((await a.json().catch(() => ({}))).error || p("Não deu para salvar a foto."));
			qe();
		} catch (e) {
			alert(e.message || p("Não deu para ler essa imagem."));
		}
	}, e.click());
}
function Or(e) {
	let t = `${location.origin}/b/${j.id}`;
	return `${p("Te convidei pro vibebook \"{title}\": {url}", {
		title: P(),
		url: t
	})}\n\n${p("1. Entra com {email} (o convite chegou nesse email).", { email: e })}\n${p("2. Manda isto pro seu Claude Code:")}\n\nRead ${location.origin}/llms.txt and set up vibebook for this project. Room: ${t}`;
}
function kr(e, t = !0) {
	navigator.clipboard?.writeText(Or(e)).then(() => B(`${t ? `${p("Convite enviado por email para <b>{email}</b>.", { email: h(e) })} ` : ""}${p("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: h(_(e)) })}`), () => B(p("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: h(e) })));
}
function B(e, t = 7e3) {
	document.querySelector(".toast")?.remove(), document.body.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${e}</div>`);
	let n = document.querySelector(".toast");
	setTimeout(() => n.remove(), t);
}
p("A fazer"), p("Fazendo"), p("Esperando OK"), p("Feito");
var Ar = !1, jr = {
	off: !1,
	friends: null
};
function Mr() {
	let e = [...w || []].filter((e) => e.id !== j?.id && !e.archived_at).sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0)).slice(0, 3), t = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", n = (e) => e.busy_until > Date.now() ? "<b class=\"swBusy\">✻</b>" : "", r = (e) => {
		let t = T.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${_e(t)}">${n}</b>` : "";
	};
	return `<nav class="roomStrip" aria-label="${p("Seus vibebooks")}"><a data-nav href="/app" class="rsAll"><span class="tile md">${E("grid", 20)}</span><span>${p("Todos")}</span></a>${e.map((e) => `<a data-nav href="/b/${e.id}" title="${h(e.title)}"><span class="tw">${Oe(e, "md")}${t(e)}${n(e)}${r(e)}</span><span>${h(e.title)}</span></a>`).join("")}${"<i></i>".repeat(3 - e.length)}<button type="button" class="rsAll" id="sideRooms" aria-label="${p("Trocar de sala")}"><span class="tile md">${be}</span><span>${p("Buscar")}</span></button></nav>`;
}
var Nr = null, Pr = () => {
	m.querySelector(".book.boardview") && document.getElementById("toggleBoard").click();
};
function V() {
	let e = document.getElementById("kanban");
	e && m.querySelector(".book.boardview, .doc[data-pane='board']") && Bt("board", e, {
		room: j,
		thread: M,
		vb: Ht(),
		send: N,
		onopen: Wt
	});
}
function Fr() {
	let e = j.epics.find((e) => e.id === M), t = e ? e.title : P(), n = prompt(p(e ? "Nome do épico:" : "Nome do vibebook:"), t);
	n?.trim() && n !== t && N(e ? {
		t: "epic.rename",
		id: e.id,
		title: n
	} : {
		t: "title",
		title: n
	});
}
function Ir() {
	let e = document.getElementById("peekTxt");
	if (!e || !j) return;
	let t = Oa(), n = t && j.epics.find((e) => e.id === t), r = ((t ? j.docs?.[t] : j.doc) || "").match(/^#\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() || (n ? n.title : P()), i = n?.tasks.length || 0, a = i && n.tasks.filter((e) => e.done).length;
	e.innerHTML = `${E("doc", 15)}<b>Doc</b>${i ? `<small>${a}/${i}</small>` : ""}`, e.title = r;
	let o = j.filesN ?? j.files?.length ?? 0, s = (j.reminders || []).filter((e) => e.error).length;
	document.getElementById("peekFiles").textContent = o ? String(o) : "", document.getElementById("peekRem").textContent = s ? "⚠" : "";
}
var H = matchMedia("(max-width: 900px)"), Lr = !1;
function Rr(e) {
	let t = m.querySelector(".book");
	t && H.matches && t.dataset.sheet !== e && (t.dataset.sheet || l.pushState({ sheet: 1 }, "", location.href), t.dataset.sheet = e);
}
function U(e) {
	let t = m.querySelector(".book");
	t?.dataset.sheet && (t.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete t.dataset.sheet, history.state?.sheet && (e ? la = !1 : (Lr = !0, history.back())));
}
function zr() {
	if (Lr) return Lr = !1, !0;
	let e = m.querySelector(".book");
	return e?.dataset.sheet ? (e.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete e.dataset.sheet, !0) : !1;
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && m.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open]") && U();
});
function Br(e, t, n, r) {
	if (!e) return;
	let i = !1;
	e.onclick = (e) => {
		i ? i = !1 : r ? r(e) : n ? Rr(t) : U();
	}, e.onpointerdown = (r) => {
		let a = m.querySelector(".book")?.querySelector(t === "doc" ? ".doc" : ".side"), o = document.getElementById("sheetDim");
		if (!a || !H.matches) return;
		let s = r.clientY, c = a.offsetHeight, l = 0, u = !1;
		i = !1, e.setPointerCapture(r.pointerId), e.onpointermove = (e) => {
			if (l = (e.clientY - s) * -1, !u && Math.abs(l) < 6) return;
			u = !0, a.classList.add("sheetDrag"), o.style.transition = "none";
			let t = Math.min(c, Math.max(0, n ? c + l : l));
			a.style.transform = `translateY(${t * -1}px)`, o.style.opacity = String(1 - t / c);
		}, e.onpointerup = e.onpointercancel = () => {
			e.onpointermove = e.onpointerup = e.onpointercancel = null, u && (i = !0, setTimeout(() => i = !1, 400), a.classList.remove("sheetDrag"), a.style.transform = "", o.style.transition = "", o.style.opacity = "", (n ? -l > c / 4 : l <= c / 4) ? Rr(t) : U());
		};
	};
}
function Vr() {
	let e = document.getElementById("tasks");
	if (!e) return;
	let t = j.epics.find((e) => e.id === M), n = document.getElementById("threadTitle"), r = `<button type="button" class="thChev" aria-label="${p("Trocar de conversa")}" title="${p("Trocar de conversa")}">${E("chevronDown", 18)}</button>`, i = () => n.querySelector(".thChev").onclick = () => Rr("side"), a = (e, t) => `<span class="thPick">${e.replace("class=\"ri", "class=\"ri thMark")}${t}${r}</span>`;
	if (xn()) {
		zt("tasks"), n.innerHTML = `${a(`<span class="ri">${h(F(xn().title))}</span>`, `<span class="epicName" id="roomName">${h(xn().title)}</span>`)}<small class="folderChip">✦ ${p("sugestão do @vibe")}</small>`, i(), document.getElementById("roomName").onclick = () => H.matches && Rr("side"), e.innerHTML = "", Ir();
		return;
	}
	n.innerHTML = t ? `${a(`<span class="ri" style="background:${g(t.title)};color:#fff">${h(F(t.title))}</span>`, `<span class="epicName" id="roomName" title="${p("Clique para renomear")}">${h(t.title)}</span>`)}<button class="ghost x" id="epicArch" title="${t.archived ? p("Desarquivar épico") : p("Arquivar épico (concluído)")}" aria-label="${t.archived ? p("Desarquivar épico") : p("Arquivar épico")}">${E(t.archived ? "undo" : "check")}</button><button class="ghost x" id="epicDel" title="${p("Apagar épico")}" aria-label="${p("Apagar épico")}">${E("trash")}</button>` : `${a(hn("ri roomIco"), `<span class="epicName" id="roomName" title="${h(j.book?.summary || p("Clique para renomear"))}">${h(P())}</span>`)}${j.book?.folder ? `<small class="folderChip">${E("folder", 12)} ${h(j.book.folder)}</small>` : ""}`;
	let o = {};
	for (let e of [...j.epics.flatMap((e) => e.tasks), ...j.roomTasks || []]) !e.done && e.owner && (o[e.owner] = (o[e.owner] || 0) + 1);
	Object.entries(o).sort((e, t) => t[1] - e[1]), n.closest(".chathead");
	let s = o[j.me] || 0, c = document.getElementById("toggleBoard");
	c.querySelector(".kN")?.remove(), s && c.insertAdjacentHTML("beforeend", `<b class="kN" title="${p("Esperando você")}: ${s}">${s}</b>`);
	let l = m.querySelector(".ptBoard .kN");
	l && (l.hidden = !s, l.textContent = s || ""), c.title = s ? `${p("Quadro de tarefas")} · ${p("Esperando você")}: ${s}` : p("Quadro de tarefas (kanban)"), i(), document.getElementById("roomName").onclick = () => H.matches ? Rr("side") : Fr();
	let u = m.querySelector(".phHome");
	u && (u.title = u.ariaLabel = p(M === "main" ? "Seus vibebooks" : "Voltar pra sala principal"), u.onclick = (e) => {
		M !== "main" && (e.preventDefault(), e.stopPropagation(), M = "main", Q = !1, z(), Z(), V(), $());
	}), n.querySelector(".thPick").onclick = (e) => {
		H.matches && !e.target.closest(".thChev") && Rr("side");
	}, Ir();
	let d = t || (M === "main" && j.roomTasks?.length ? {
		id: "main",
		tasks: j.roomTasks
	} : null);
	e.style.display = d ? "" : "none", d && (t && (document.getElementById("epicArch").onclick = () => N({
		t: "epic.archive",
		id: t.id,
		archived: !t.archived
	})), t && (document.getElementById("epicDel").onclick = () => {
		confirm(p("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: t.title })) && N({
			t: "epic.del",
			id: t.id
		});
	}), Bt("tasks", e, {
		room: j,
		thread: M,
		vb: Ht(),
		send: N,
		waits: T
	}));
}
var Hr = (e) => `/api/books/${j.id}/files/${e.id}`, Ur = (e) => `data-view="${e.type.startsWith("image/") ? "img" : "frame"}" data-name="${h(e.name)}"`, Wr = (matchMedia("(display-mode: standalone)").matches || navigator.standalone === !0) && (/iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1), Gr = (e) => Wr ? `x-safari-${new URL(e, location.href).href}` : e;
function Kr(e, t, n) {
	let r = document.getElementById("viewer");
	r || (r = document.createElement("dialog"), r.id = "viewer", r.className = "viewer", r.innerHTML = `<header><b></b><select class="vsel" aria-label="${p("Versão")}" hidden></select><a target="_blank" rel="noopener" title="${p("Abrir numa aba")}" aria-label="${p("Abrir numa aba")}">${E("external", 20)}</a><button type="button" title="${p("Fechar")}" aria-label="${p("Fechar")}">${E("x", 20)}</button></header><div class="vbody"></div>`, r.querySelector("button").onclick = () => r.close(), r.querySelector("header a").onclick = () => r.close(), r.querySelector(".vsel").onchange = (e) => {
		let t = e.target.value;
		Yr(r, `/api/books/${j.id}/files/${t}`, r.dataset.kind, r.dataset.name);
	}, r.addEventListener("click", (e) => {
		e.target.classList.contains("vbody") && r.close();
	}), r.addEventListener("close", () => {
		r.querySelector(".vbody").innerHTML = "", history.state?.viewer && (Zr = !0, history.back());
	}), document.body.appendChild(r)), Yr(r, e, t, n), r.open || l.pushState({ viewer: 1 }, "", r.dataset.fid ? `${location.pathname}${location.search}#f${r.dataset.fid}` : location.href), r.showModal();
}
function qr(e) {
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
function Jr() {
	let e = document.getElementById("viewer");
	if (!e?.open || !e.dataset.name) return;
	let t = e.querySelector(".vsel"), n = qr(e.dataset.name), r = e.dataset.fid;
	t.hidden = n.length < 2, t.innerHTML = n.map((e, t) => `<option value="${e.id}"${e.id === r ? " selected" : ""}>v${n.length - t}${t === 0 ? ` · ${p("mais nova")}` : ""} · ${new Date(e.ts).toLocaleString(d, {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	})}</option>`).join("");
}
function Yr(e, t, n, r) {
	e.dataset.kind = n, e.dataset.name = typeof t == "string" ? r : "", e.dataset.fid = typeof t == "string" ? /\/files\/([0-9a-f]+)/.exec(t)?.[1] ?? "" : "", e.querySelector("header b").textContent = r, e.querySelector("header a").href = typeof t == "string" ? Gr(t) : "";
	let i = e.querySelector(".vsel");
	i.hidden = !0, e.dataset.fid && (Jr(), j.filesAll || N({ t: "files.get" })), e.open && e.dataset.fid && history.state?.viewer && l.replaceState(history.state, "", `${location.pathname}${location.search}#f${e.dataset.fid}`);
	let a = e.querySelector(".vbody");
	if (a.className = `vbody ${n}`, e.classList.toggle("noLink", n === "table"), n === "table") a.replaceChildren(t.cloneNode(!0));
	else if (n === "img") {
		let e = new Image();
		e.src = t, e.alt = r, a.replaceChildren(e);
	} else if (/\.(md|markdown|txt|csv)$/i.test(r) && typeof t == "string") a.className = "vbody text", a.replaceChildren(), fetch(t).then((e) => e.ok ? e.text() : Promise.reject(e.status)).then((n) => {
		(!e.dataset.fid || t.endsWith(e.dataset.fid)) && (a.innerHTML = /\.(md|markdown)$/i.test(r) ? `<div class="vdoc md">${ge(n.slice(0, 3e5))}</div>` : /\.csv$/i.test(r) ? `<div class="vdoc"><table>${Xr(n).map((e, t) => `<tr>${e.map((e) => `<${t ? "td" : "th"}>${h(e)}</${t ? "td" : "th"}>`).join("")}</tr>`).join("")}</table></div>` : `<pre class="vdoc">${h(n.slice(0, 3e5))}</pre>`);
	}).catch(() => {
		a.innerHTML = `<p class="vdoc">${p("Não consegui abrir este arquivo.")}</p>`;
	});
	else {
		let e = document.createElement("iframe");
		e.src = t, e.title = r, /\.pdf$/i.test(r) || (e.sandbox = "allow-scripts"), a.replaceChildren(e);
	}
}
function Xr(e) {
	let t = [], n = [], r = "", i = !1;
	for (let a = 0; a < e.length && t.length < 2e3; a++) {
		let o = e[a];
		i ? o === "\"" ? e[a + 1] === "\"" ? (r += "\"", a++) : i = !1 : r += o : o === "\"" ? i = !0 : o === "," || o === ";" && !e.slice(0, 200).includes(",") ? (n.push(r), r = "") : o === "\n" ? (n.push(r.replace(/\r$/, "")), t.push(n.slice(0, 50)), n = [], r = "") : r += o;
	}
	return (r || n.length) && (n.push(r), t.push(n.slice(0, 50))), t;
}
var Zr = !1;
function Qr() {
	if (Zr) return Zr = !1, !0;
	let e = document.getElementById("viewer");
	return e?.open ? (l.replaceState(null, "", location.href), e.close(), !0) : !1;
}
document.addEventListener("click", (e) => {
	if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
	let t = e.target.closest?.("a[data-view]");
	if (t) return e.preventDefault(), Kr(t.getAttribute("href"), t.dataset.view, t.dataset.name || "");
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
	e.preventDefault(), Kr(r.pathname, a?.type?.startsWith("image/") ? "img" : "frame", a?.name || n.textContent.trim() || "arquivo");
});
var $r = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, ei = (e) => e?.length ? `<div class="atts">${e.map((e) => e.embed ? `<div class="embedBox"><div class="embedWrap"><iframe class="embed" src="${Hr(e)}" sandbox="allow-scripts" loading="lazy" title="${h(e.name)}"></iframe><a class="embedOpen" href="${Hr(e)}" ${Ur(e)} title="${p("Abrir em tela cheia")}" aria-label="${p("Abrir em tela cheia")}">${E("expand", 15)}</a></div></div>` : e.type.startsWith("audio/") ? `<div class="audioAtt"><audio controls preload="metadata" src="${Hr(e)}"></audio><a href="${Hr(e)}" target="_blank" rel="noopener" download="${h(e.name)}">${E("mic", 14)} ${h(e.name)} <small>${$r(e.size)}</small></a></div>` : e.type.startsWith("image/") ? `<a href="${Hr(e)}" target="_blank" rel="noopener" ${Ur(e)}><img src="${Hr(e)}" alt="${h(e.name)}" loading="lazy" /></a>` : `<a class="fileChip" href="${Hr(e)}" target="_blank" rel="noopener" ${Ur(e)}>${jt(e)} ${h(e.name)} <small>${$r(e.size)}</small></a>`).join("")}</div>` : "";
function ti(e) {
	let t = j.polls?.[e];
	if (!t) return "";
	let n = t.votes.map((e) => e.length), r = n.reduce((e, t) => e + t, 0), i = Math.max(...n), a = new Set(t.votes.flat()).size;
	return `<div class="poll" data-poll="${e}">
    <div class="pq">${E("chart", 18)} ${h(t.question)}</div>
    ${t.options.map((e, a) => {
		let o = n[a], s = r ? Math.round(100 * o / r) : 0, c = t.votes[a].includes(j.me), l = t.closed && o > 0 && o === i;
		return `<button type="button" class="opt ${c ? "mine" : ""} ${l ? "win" : ""}" data-vote="${a}" ${t.closed ? "disabled" : ""} aria-pressed="${c}">
        <span class="fill" style="width:${s}%"></span><span class="ol">${l ? `${E("trophy")} ` : c ? `${E("check")} ` : ""}${h(e)}</span>
        <span class="stack">${t.votes[a].slice(0, 4).map((e) => v(e)).join("")}</span><span class="pc">${o ? `${s}%` : ""}</span></button>`;
	}).join("")}
    <div class="pf">${a === 1 ? p("1 pessoa votou") : p("{n} pessoas votaram", { n: a })} · ${t.multi ? p("pode escolher várias") : p("escolha uma")}${t.closed ? ` · ${p("encerrada")}` : t.author === j.me || t.author === "ai" ? ` · <button type="button" class="link" data-close="${e}">${p("encerrar")}</button>` : ""}</div>
  </div>`;
}
var ni = (e) => new Date(e).toLocaleTimeString(d, {
	hour: "2-digit",
	minute: "2-digit"
}), ri = (e, t) => !!e && e.author === t.author && (e.kind || null) === (t.kind || null) && (e.tag || null) === (t.tag || null) && t.ts - e.ts < 3e5 && !e.poll && !t.poll, ii = (e) => {
	let t = j.messages.filter((t) => t.thread === e.id), n = t.at(-1), r = j.counts ? (j.counts[e.id] ?? 0) + t.filter((e) => e.id > (j.countsAt ?? 0)).length : t.length, i = e.tasks.filter((e) => e.status === "done").length;
	return `${br(e)}<span class="tc-t"><b>${h(e.title)}</b><small>${e.archived ? `✓ ${p("concluído")} · ` : ""}${e.tasks.length ? `${p("{d}/{n} tarefas", {
		d: i,
		n: e.tasks.length
	})} · ` : ""}${r === 1 ? p("1 resposta") : p("{n} respostas", { n: r })}${n ? ` · ${y(n.ts) === p("agora") ? p("agora") : p("última há {ago}", { ago: y(n.ts) })}` : ""}</small></span><span class="tc-go">→</span>`;
};
function ai(e) {
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
var oi = (e) => {
	let t = ai(e);
	return t.length ? `<div class="tcFiles" data-files-of="${e}">${t.slice(0, 6).map((e) => `<a class="fchip" href="/api/books/${j.id}/files/${e.id}" title="${h(e.name)}">${jt(e, 14)}<span>${h(e.name)}</span>${e.n > 1 ? `<small>v${e.n}</small>` : ""}</a>`).join("")}${t.length > 6 ? `<small class="mute">+${t.length - 6}</small>` : ""}</div>` : "";
}, si = (e) => (j.epics || []).filter((t) => t.from_msg === e).map((e) => `<button type="button" class="tcard" data-goepic="${e.id}">${ii(e)}</button>${oi(e.id)}`).join("");
function ci() {
	Z("stay");
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-gomain]");
	if (t) return M = "main", Q = !1, z(), Z(), V(), $(), document.getElementById(`m${t.dataset.gomain}`)?.scrollIntoView({ block: "center" });
	let n = e.target.closest(".tcard[data-goepic]");
	n && (M = n.dataset.goepic, Q = !1, z(), Z(), V(), $());
});
function li() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".endMark, .prodStage").forEach((e) => e.remove());
	let t = j.epics.find((e) => e.id === M), n = t?.prod, r = n ? n.stage === "verified" ? `<div class="prodStage ok"><b>✓✓ ${p("Verificado em prod")}</b>${n.note ? `<span>${h(n.note)}</span>` : ""}</div>` : `<div class="prodStage"><b>🚀 ${p("No ar")}</b><span>${p("Falta o agent verificar em prod.")}</span></div>` : "";
	t?.archived && e.insertAdjacentHTML("beforeend", `<div class="endMark"><b>✓ ${p("Agent fez")}</b><span>${p("Escreva aqui pra continuar: ele reabre.")}</span></div>`), r && e.insertAdjacentHTML("beforeend", r);
}
var W = null, ui = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? p("votação") : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120), di = (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? p("{via} de {who}", {
	via: "Agent",
	who: _(e.author)
}) : _(e.author), fi = (e) => {
	let t = j.messages.find((t) => t.id === e);
	return `<button type="button" class="quote" data-goto="${e}" title="${p("Ver a mensagem respondida")}">${E("reply", 13)} ${t ? `<b>${h(di(t))}</b> ${h(ui(t))}` : p("mensagem anterior")}</button>`;
};
function pi() {
	let e = document.getElementById("replyBar");
	e && (W && W.thread !== M && (W = null), e.hidden = !W, W && (e.innerHTML = `<span>${E("reply", 13)} ${p("Respondendo a <b>{who}</b>", { who: h(di(W)) })}: ${h(ui(W))}</span><button type="button" class="ghost" id="replyX" aria-label="${p("Cancelar resposta")}" title="${p("Cancelar")}">${E("x")}</button>`), document.getElementById("replyX")?.addEventListener("click", () => {
		W = null, pi();
	}));
}
function mi(e) {
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px", document.body.append(t), t.focus({ preventScroll: !0 }), t.setSelectionRange(0, e.length);
	let n = !1;
	try {
		n = document.execCommand("copy");
	} catch {}
	return t.remove(), n;
}
function hi(e) {
	let t = X().find((t) => t.id === e);
	if (!t) return;
	let n = `${location.origin}/b/${j.id}${t.thread && t.thread !== "main" ? `?t=${encodeURIComponent(t.thread)}` : ""}#m${e}`, r = () => {
		B(`✓ ${p("Link copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (mi(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => B(`${p("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copylink="${e}">${p("Copiar link")}</button>`));
}
function gi(e) {
	let t = j.messages.find((t) => t.id === e);
	if (!t) return;
	let n = t.text || t.files?.map((e) => e.name).join("\n") || "";
	if (!n) return B(p("Essa mensagem não tem texto pra copiar."), 2500);
	let r = () => {
		B(`✓ ${p("Copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (mi(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => {
		B(`${p("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copymsg="${e}">${p("Copiar")}</button>`);
	});
}
function _i(e) {
	W = j.messages.find((t) => t.id === e) ?? null, pi(), document.getElementById("input")?.focus();
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-reply]");
	if (t) return _i(Number(t.dataset.reply));
	let n = e.target.closest("[data-copymsg]");
	if (n) return gi(Number(n.dataset.copymsg));
	let r = e.target.closest("[data-copylink]");
	if (r) return hi(Number(r.dataset.copylink));
	let i = e.target.closest("a.mlink[data-msg]");
	if (i) return e.preventDefault(), yi(Number(i.dataset.msg));
	let a = e.target.closest(".quote[data-goto]");
	a && yi(Number(a.dataset.goto));
});
var vi = null;
function yi(e, t) {
	let n = j.messages.find((t) => t.id === e), r = n?.thread || t;
	r && r !== M && (r === "main" || j.epics.some((e) => e.id === r)) && (M = r, Q = !1, z(), Z(), V(), $());
	let i = document.getElementById(`m${e}`);
	if (!i && n) {
		let t = j.messages.filter((e) => e.thread === M), r = t.indexOf(n);
		r >= 0 && (Y.n = Math.max(Y.n, t.length - r + 10), Z(!0), i = document.getElementById(`m${e}`));
	}
	if (!i) return vi?.id === e ? void 0 : (vi = {
		id: e,
		n: 0
	}, B(p("Buscando a mensagem…"), 1500), fa());
	vi = null, _a = !1, i.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), i.classList.remove("flash"), i.offsetWidth, i.classList.add("flash");
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && W && document.activeElement?.id === "input" && (W = null, pi());
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
	e.preventDefault(), G.dx = t, G.m.style.transform = `translateX(${Math.max(-80, Math.min(t, 80))}px)`, G.m.dataset.sw = t < 0 ? `← ${p("Copiar")}` : `${p("Responder")} →`, G.m.classList.toggle("swL", t < 0), G.m.classList.toggle("swR", t > 0), G.m.classList.toggle("swGo", Math.abs(t) > 60);
}, { passive: !1 }), document.addEventListener("touchend", () => {
	if (!G) return;
	let { m: e, dx: t } = G;
	G = null, e.classList.remove("swipe", "swL", "swR", "swGo"), e.style.transform = "", t > 60 ? _i(Number(e.id.slice(1))) : t < -60 && gi(Number(e.id.slice(1)));
});
function bi(e) {
	let t;
	try {
		t = typeof e.card == "string" ? JSON.parse(e.card) : e.card;
	} catch {
		return "";
	}
	if (!t?.elements?.[t.root]) return "";
	let n = j.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent"), r = e.kind === "agent" && e.author === j.me && !n, i = (e) => h(String(e ?? "")).replace(/\n/g, "<br>"), a = (o, s = 0) => {
		let c = t.elements[o];
		if (!c || s > 8) return "";
		let l = c.props || {}, u = () => (c.children || []).map((e) => a(e, s + 1)).join("");
		switch (c.type) {
			case "Card": return `<div class="vcard">${l.title ? `<div class="vh"><b>${i(l.title)}</b>${l.subtitle ? `<small>${i(l.subtitle)}</small>` : ""}</div>` : ""}<div class="vb">${u()}</div></div>`;
			case "Section": return `<section class="vsec">${l.title ? `<h5>${i(l.title)}</h5>` : ""}${u()}</section>`;
			case "Text": return `<p class="vtx ${h(l.style || "plain")}">${i(l.content)}</p>`;
			case "Fields": return `<dl class="vfields">${u()}</dl>`;
			case "Field": return `<div><dt>${i(l.label)}</dt><dd>${i(l.value)}</dd></div>`;
			case "Table": return `<div class="vtWrap"><button type="button" class="vtOpen" data-vtopen title="${p("Abrir em tela cheia")}" aria-label="${p("Abrir em tela cheia")}">${E("expand", 14)}</button><div class="vtable"><table>${l.headers?.length ? `<thead><tr>${l.headers.map((e) => `<th>${i(e)}</th>`).join("")}</tr></thead>` : ""}<tbody>${(l.rows || []).map((e) => `<tr>${e.map((e) => `<td>${i(e)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
			case "Chart": {
				let e = l.data || [], t = Math.max(...e.map((e) => Math.abs(e.value)), 1);
				if (l.kind === "line") {
					let n = e.length > 1 ? 300 / (e.length - 1) : 0, r = Math.min(...e.map((e) => e.value), 0), a = t - r || 1, o = e.map((e, t) => `${(t * n).toFixed(1)},${(90 - (e.value - r) / a * 90).toFixed(1)}`).join(" ");
					return `<figure class="vchart">${l.title ? `<figcaption>${i(l.title)}</figcaption>` : ""}<svg viewBox="-4 -4 308 98" preserveAspectRatio="none"><polyline points="${o}" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="vlab"><span>${i(e[0]?.label)}</span><span>${i(e.at(-1)?.label)}</span></div></figure>`;
				}
				return `<figure class="vchart">${l.title ? `<figcaption>${i(l.title)}</figcaption>` : ""}${e.map((e) => `<div class="vbar"><span>${i(e.label)}</span><i style="width:${Math.round(Math.abs(e.value) / t * 100)}%"></i><b>${i(e.value)}</b></div>`).join("")}</figure>`;
			}
			case "Divider": return "<hr class=\"vhr\">";
			case "Image": return /^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(l.url) ? `<img class="vimg" src="${h(l.url)}" alt="${h(l.alt || "")}" loading="lazy">` : "";
			case "Actions": return `<div class="vact">${u()}</div>`;
			case "Button": {
				let t = l.value || l.label, a = n?.text === t;
				return r ? `<button type="button" class="vbtn ${h(l.style || "")}" data-cardbtn="${e.id}" data-v="${h(t)}">${i(l.label)}</button>` : `<span class="vbtn ro ${a ? "on" : ""}">${a ? E("check", 14) : ""}${i(l.label)}</span>`;
			}
			case "LinkButton": return /^#(m\d+|e[a-z0-9]+|doc(:[a-z0-9]+)?|app:(room|[a-f0-9]{12})\/[\w.-]+)$/.test(l.url || "") ? `<button type="button" class="vbtn link" data-cardgo="${h(l.url)}">${i(l.label)} ${E("arrowRight", 13)}</button>` : /^https?:\/\//i.test(l.url) ? `<a class="vbtn link" href="${h(l.url)}" target="_blank" rel="noopener noreferrer">${i(l.label)} ${E("external", 13)}</a>` : "";
			default: return "";
		}
	};
	return a(t.root);
}
function xi(e) {
	if (e.startsWith("#app:")) {
		let [t, n] = e.slice(5).split("/");
		q = {
			cid: t,
			tool: n
		}, document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" })), H.matches && Rr("doc");
		return;
	}
	if (e.startsWith("#m")) return yi(Number(e.slice(2)));
	let t = e.startsWith("#e") ? e.slice(2) : e.split(":")[1], n = t && j.epics.some((e) => e.id === t) ? t : t ? null : M;
	if (!n) return B(p("Esse épico não existe mais nesta sala."));
	n !== M && (M = n, Q = !1, z(), Z(), V(), $()), e.startsWith("#doc") && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" })), H.matches && Rr("doc"));
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardgo]");
	t && (e.preventDefault(), xi(t.dataset.cardgo));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-vtopen]");
	if (!t) return;
	let n = t.parentElement.querySelector("table");
	n && Kr(n, "table", t.closest(".vcard")?.querySelector(".vh b")?.textContent || p("Tabela"));
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
var Si = (e) => e?.kind === "agent" && e.author !== j.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(e.text || ""), Ci = (e) => {
	if (!e?.reply_to || e.kind === "agent") return !1;
	let t = j.messages.find((t) => t.id === e.reply_to);
	return !!t && Bn(t) && t.author === e.author;
};
function wi(e, t, n) {
	if (n) {
		let e = /^\s*aprov/i.test(n.text);
		return `<div class="permAsk done ${e ? "ok" : "no"}">${E(e ? "check" : "x", 14)} ${p(e ? "Aprovado por {who}" : "Negado por {who}", { who: h(_(n.author)) })} · ${ni(n.ts)}</div>`;
	}
	return t.closed ? `<div class="permAsk done">${E("terminal", 14)} ${p("foi pro terminal")}</div>` : e.author === j.me ? `<div class="permAsk" data-perm="${e.id}"><button type="button" class="primary" data-pv="Aprovar">${p("Aprovar")}</button><button type="button" class="ghost" data-pv="Negar">${p("Negar")}</button></div>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${h(e)}</span>`).join("")}<small>${p("esperando {who}", { who: h(_(e.author)) })}</small></div>`;
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-perm] [data-pv], [data-perm] [data-pconfirm], [data-perm] [data-pcancel]");
	if (!t) return;
	let n = t.closest("[data-perm]"), r = Number(n.dataset.perm);
	if (t.dataset.pv) {
		let e = t.dataset.pv === "Aprovar";
		n.innerHTML = `<span class="pq">${p(e ? "Aprovar este pedido?" : "Negar este pedido?")}</span><button type="button" class="${e ? "primary" : "danger"}" data-pconfirm="${t.dataset.pv}">${p("Confirmar")}</button><button type="button" class="ghost" data-pcancel="1">${p("Cancelar")}</button>`, n.classList.add("confirm");
		return;
	}
	if (t.dataset.pcancel) {
		let e = j.messages.find((e) => e.id === r);
		e && (n.outerHTML = Ti(e));
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
function Ti(e) {
	let t;
	try {
		t = JSON.parse(e.choices);
	} catch {
		return "";
	}
	let n = j.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent");
	if (Bn(e)) return wi(e, t, n);
	let r = !Bn(e);
	if (!n && t.closed) return `<div class="choice ro closed">${t.options.map((e) => `<span class="opt">${h(e)}</span>`).join("")}<small>${p("foi pro terminal")}</small></div>`;
	if (n) {
		let e = new Set(n.text.split(" · ")), i = r && !t.options.some((t) => e.has(t));
		return `<div class="choice done">${t.options.map((t) => `<span class="opt ${e.has(t) ? "on" : ""}">${e.has(t) ? E("check", 14) : ""}${h(t)}</span>`).join("")}${i ? `<span class="opt on">${E("check", 14)}${p("Outro")}</span>` : ""}</div>`;
	}
	return e.kind === "agent" && e.author === j.me ? `<form class="choice" data-choice="${e.id}" data-multi="${t.multi ? 1 : ""}">${t.options.map((n) => `<label class="opt"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="${h(n)}" />${h(n)}</label>`).join("")}${r ? `<label class="opt oth"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="" data-other="1" />${p("Outro")}…</label>` : ""}<small>${p("escolha e envie pela caixa de mensagem")}</small></form>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${h(e)}</span>`).join("")}<small>${p("esperando {who}", { who: h(_(e.author)) })}</small></div>`;
}
document.addEventListener("change", (e) => {
	let t = e.target.closest("form.choice");
	if (!t) return;
	let n = document.getElementById("input");
	n && (e.target.dataset.other ? e.target.checked && (t.dataset.multi || t.querySelectorAll("input").forEach((t) => t.checked = t === e.target), n.value = "") : n.value = [...t.querySelectorAll("input:checked:not([data-other])")].map((e) => e.value).join(" · "), _i(Number(t.dataset.choice)), n.dispatchEvent(new Event("input", { bubbles: !0 })), n.focus());
});
var Ei = (e) => e?.tag === "reminder" ? (e.text || "").split("\n")[0] : e?.tag === "issue" ? "⚠issue" : null;
function Di(e) {
	let t = [];
	for (let n of e) {
		let e = Ei(n), r = t[t.length - 1];
		e && Ei(r) === e ? t[t.length - 1] = {
			...n,
			runs: [...r.runs || [r.ts], n.ts],
			group: [...r.group || [r], n]
		} : t.push(n);
	}
	return t;
}
function Oi(e) {
	let t = (e.group || [e]).slice().reverse(), n = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? ni(e) : `${new Date(e).toLocaleDateString(d, {
		day: "numeric",
		month: "short"
	})} ${ni(e)}`, r = (e) => {
		let [t, ...n] = (e.text || "").split("\n\n");
		return {
			head: t.replace(/^⚠\s*/, ""),
			what: n.join("\n\n")
		};
	}, i = r(t[0]);
	return `<div class="msg remMsg issueMsg" id="m${e.id}">${Mi(e.id)}<div class="body"><details><summary>${E("alert", 14)}<span class="remT"><b>${t.length > 1 ? p("{n} issues dos agents", { n: t.length }) : p("Issue de um agent")}</b> ${h(i.what.replace(/\s+/g, " ").slice(0, 140))}</span><span class="remWhen" title="${h(new Date(e.ts).toLocaleString(d))}">${n(e.ts)}</span></summary><div class="txt issueList">${t.map((e) => {
		let t = r(e);
		return `<div class="iss"><small>${n(e.ts)} · ${b(ge(t.head))}<span class="issAct"><button type="button" class="rbtn" data-copymsg="${e.id}" title="${p("Copiar")}" aria-label="${p("Copiar o texto desta mensagem")}">${E("copy", 13)}</button><button type="button" class="rbtn" data-reply="${e.id}" title="${p("Responder")}" aria-label="${p("Responder a esta mensagem")}">${E("reply", 13)}</button></span></small><div>${h(t.what)}</div></div>`;
	}).join("")}</div></details></div></div>`;
}
function ki(e, t = !1) {
	let [n, ...r] = (e.text || "").split("\n\n"), i = e.runs || [e.ts], a = n.replace(/^⏰\s*/, ""), o = a.match(/^\*\*(.+?)\*\*\s*(.*)$/), s = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? ni(e) : `${new Date(e).toLocaleDateString(d, {
		day: "numeric",
		month: "short"
	})} ${ni(e)}`;
	return `<div class="msg remMsg" id="m${e.id}">${Mi(e.id)}<div class="body"><details><summary>${E("clock", 14)}<span class="remT">${o ? `<b>${h(o[1])}</b> ${h(o[2])}` : h(a)}</span><span class="remWhen" title="${h(new Date(e.ts).toLocaleString(d))}">${i.length > 1 ? `${p("rodou {n}×", { n: i.length })} · ` : ""}${s(e.ts)}</span></summary>${r.length ? `<div class="txt">${b(ge(r.join("\n\n")))}</div>` : ""}${i.length > 1 ? `<small class="remRuns">${i.map(s).join(" · ")}</small>` : ""}</details>${t ? "" : (e.group || [e]).map((e) => si(e.id)).join("")}</div></div>`;
}
var Ai = (e) => e.author === "ai" && (e.tag === "notice" || e.tag === "done" || /^↩ (Reabri|I reopened)/.test(e.text || ""));
function ji(e) {
	let t = (e.text || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim(), n = new Date(e.ts).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? ni(e.ts) : `${new Date(e.ts).toLocaleDateString(d, {
		day: "numeric",
		month: "short"
	})} ${ni(e.ts)}`;
	return `<div class="msg remMsg noticeMsg" id="m${e.id}">${Mi(e.id)}<div class="body"><details><summary><span class="vibeMark" aria-hidden="true">✦</span><span class="remT">${b(h(t))}</span><span class="remWhen" title="${h(new Date(e.ts).toLocaleString(d))}">${n}</span></summary><div class="txt">${b(ge(e.text || ""))}</div></details></div></div>`;
}
var Mi = (e) => `<span class="mact"><button type="button" class="rbtn" data-copymsg="${e}" title="${p("Copiar")}" aria-label="${p("Copiar o texto desta mensagem")}">${E("copy", 14)} ${p("Copiar")}</button><button type="button" class="rbtn" data-copylink="${e}" title="${p("Copiar link")}" aria-label="${p("Copiar o link desta mensagem")}">${E("link", 14)} ${p("Copiar link")}</button><button type="button" class="rbtn" data-reply="${e}" title="${p("Responder")}" aria-label="${p("Responder a esta mensagem")}">${E("reply", 14)} ${p("Responder")}</button></span>`;
function Ni() {
	let e = document.getElementById("decPane");
	if (!e) return;
	let t = j.decisions || [];
	document.getElementById("decCount").textContent = t.length ? ` ${t.length}` : "", e.innerHTML = t.length ? t.slice().reverse().map((e) => `<div class="dec ${e.kind === "approval" ? "approval" : ""}"><div>${h(e.text)}<small>${e.kind === "approval" ? `✓ ${p("aprovado")}` : p("decidido")} · ${h(e.who)} · ${y(e.ts)}</small></div>
      <button class="ghost x" data-ddel="${e.id}" aria-label="${p("Apagar registro")}" title="${p("Apagar registro")}">${E("x")}</button></div>`).join("") : `<div class="empty">${p("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.")}</div>`, e.querySelectorAll("[data-ddel]").forEach((e) => e.onclick = () => {
		confirm(p("Apagar esse registro?")) && N({
			t: "decision.del",
			id: Number(e.dataset.ddel)
		});
	});
}
function Pi() {
	document.querySelector(".doc[data-pane=\"apps\"]") && J();
}
var K = null, Fi = null, Ii = !1, q = null, Li = /* @__PURE__ */ new Set();
async function Ri() {
	let e = j.id;
	try {
		let t = await S(`/api/books/${e}/connections`);
		j.id === e && (K = t.connections, Fi = e);
	} catch (e) {
		K ||= [], B(h(e.message));
	}
	J();
}
var zi = (e) => e.scope === "me" ? `<span class="cScope me">${p("minha")}</span>` : `<span class="cScope">${p("da sala")}</span>`;
function Bi() {
	let e = /* @__PURE__ */ new Set();
	return (j.files || []).filter((t) => t.type === "text/html" && /^apps\/[\w.-]+\.html$/i.test(t.name) && !e.has(t.name) && e.add(t.name)).map((e) => ({
		tool: e.name.slice(5, -5),
		title: e.name.slice(5, -5),
		description: `${_(e.author)} · ${y(e.ts)}`,
		file: e
	}));
}
function Vi() {
	document.querySelector(".doc[data-pane=\"apps\"]") && !(q && document.querySelector(".connFrame")) && J();
}
function J() {
	let e = document.getElementById("appsPane");
	if (!e) return;
	if (Fi !== j.id && (K = null, Fi = j.id), j.filesAll || N({ t: "files.get" }), K === null) {
		e.innerHTML = `<div class="empty">${p("Carregando…")}</div>`, Ri(), K = void 0;
		return;
	}
	if (K === void 0) return;
	let t = Bi();
	if (document.getElementById("appCount").textContent = K.length + t.length ? ` ${K.length + t.length}` : "", q) return Hi(e);
	let n = document.getElementById("connForm") && Object.fromEntries(new FormData(document.getElementById("connForm"))), r = (e, t) => `<div class="connApps">${t.map((t) => `<button type="button" class="connApp" data-conn-open="${e}/${h(t.tool)}"><b>${h(t.title)}</b><span>${h(t.description)}</span></button>`).join("")}</div>`;
	e.innerHTML = `<div class="connHead"><b>Apps</b>${Ii ? "" : `<button type="button" class="ghost" id="connAdd">${E("plus", 15)} ${p("Conectar MCP")}</button>`}</div>
    ${Ii ? `<form class="connForm" id="connForm">
      <label>${p("URL do servidor MCP")}<input name="url" required placeholder="https://…/mcp" autocomplete="off" spellcheck="false"></label>
      <small class="mute">${p("Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.")}</small>
      <fieldset><label><input type="radio" name="scope" value="me" checked> ${p("Só minha: só eu e meus agents")}</label><label><input type="radio" name="scope" value="room"> ${p("Da sala: todo mundo vê; cada um entra com a própria conta")}</label></fieldset>
      <div class="acts"><button type="button" id="connCancel">${p("Cancelar")}</button><button class="primary">${p("Conectar")}</button></div></form>` : ""}
    <div class="conn"><div class="connTop"><b>${p("Esta sala")}</b><span class="cScope">${p("da sala")}</span><small>apps/*.html</small></div>
      ${t.length ? r("room", t) : `<small class="mute">${p("Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.")}</small>`}</div>
    ${K.map((e) => `<div class="conn"><div class="connTop"><b>${h(e.title)}</b>${zi(e)}<small>${h(e.host)} · ${h(_(e.owner))}</small>
        <button type="button" class="ghost" data-conn-ref="${e.id}" title="${p("Atualizar")}" aria-label="${p("Atualizar")}">↻</button>${e.mine ? `<button type="button" class="ghost" data-conn-del="${e.id}" title="${p("Remover conexão")}" aria-label="${p("Remover conexão")}">${E("x", 14)}</button>` : ""}</div>
        ${e.auth === "identity" ? e.signed_in ? `<small class="mute connWho">${p("Você entrou em {host} com a sua conta.", { host: h(e.host) })} <button type="button" class="link" data-conn-out="${e.id}">${p("Sair")}</button></small>` : `<div class="connSign"><small>${p("Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.", { host: h(e.host) })}</small><a class="primary" href="/api/books/${j.id}/connections/${e.id}/signin">${p("Entrar em {host}", { host: h(e.host) })}</a></div>` : ""}
        ${e.apps.length ? (() => {
		let t = e.apps.filter((e) => e.screen), n = t.length && !Li.has(e.id);
		return r(e.id, n ? t : e.apps) + (t.length && t.length < e.apps.length ? `<button type="button" class="link connMore" data-conn-more="${e.id}">${n ? p("ver todas ({n})", { n: e.apps.length }) : p("só as telas")}</button>` : "");
	})() : `<small class="mute">${p("{n} tools, nenhum app", { n: e.tools.length })}</small>`}</div>`).join("")}`;
	let i = document.getElementById("connForm");
	if (i && n) for (let [e, t] of Object.entries(n)) i.elements[e] && e !== "scope" && (i.elements[e].value = t);
	document.getElementById("connAdd")?.addEventListener("click", () => {
		Ii = !0, J(), document.querySelector("#connForm [name=\"url\"]")?.focus();
	}), document.getElementById("connCancel")?.addEventListener("click", () => {
		Ii = !1, J();
	}), i && (i.onsubmit = async (e) => {
		e.preventDefault();
		let t = i.querySelector(".primary");
		t.disabled = !0, t.textContent = p("Conectando…");
		try {
			let e = await S(`/api/books/${j.id}/connections`, {
				url: i.url.value.trim(),
				scope: i.scope.value
			});
			if (e.connection?.needs_sign_in) return void (location.href = `/api/books/${j.id}/connections/${e.connection.id}/signin`);
			Ii = !1, K = null, J();
		} catch (e) {
			B(h(e.message)), t.disabled = !1, t.textContent = p("Conectar");
		}
	}), e.querySelectorAll("[data-conn-out]").forEach((e) => e.onclick = async () => {
		try {
			await S(`/api/books/${j.id}/connections/${e.dataset.connOut}/signout`, {});
		} catch (e) {
			B(h(e.message));
		}
		K = null, J();
	}), e.querySelectorAll("[data-conn-more]").forEach((e) => e.onclick = () => {
		let t = e.dataset.connMore;
		Li.has(t) ? Li.delete(t) : Li.add(t), J();
	}), e.querySelectorAll("[data-conn-open]").forEach((e) => e.onclick = () => {
		let [t, n] = e.dataset.connOpen.split("/");
		q = {
			cid: t,
			tool: n
		}, J();
	}), e.querySelectorAll("[data-conn-ref]").forEach((e) => e.onclick = async () => {
		try {
			await S(`/api/books/${j.id}/connections/${e.dataset.connRef}/refresh`, {}), K = null, J();
		} catch (e) {
			B(h(e.message));
		}
	}), e.querySelectorAll("[data-conn-del]").forEach((e) => e.onclick = async () => {
		let t = K.find((t) => t.id === e.dataset.connDel);
		confirm(p("Remover a conexão {name}? Os apps dela saem da sala.", { name: t?.title || "" })) && (await fetch(`/api/books/${j.id}/connections/${e.dataset.connDel}`, { method: "DELETE" }), K = null, J());
	});
}
function Hi(e) {
	let t = q.cid === "room", n = t ? {
		id: "room",
		scope: "room",
		title: p("Esta sala")
	} : K.find((e) => e.id === q.cid), r = t ? Bi().find((e) => e.tool === q.tool) : n?.apps.find((e) => e.tool === q.tool);
	if (!n || !r) {
		if (t && !j.filesAll) {
			e.innerHTML = `<div class="empty">${p("Carregando…")}</div>`;
			return;
		}
		return !t && !q.retried ? (q.retried = !0, K = null, J()) : (q = null, B(p("Esse app não está nas conexões que você pode usar nesta sala.")), J());
	}
	let i = `${n.id}/${r.tool}${t ? `@${r.file.id}` : ""}`, a = t ? r.tool : `${n.id}/${r.tool}`, o = e.querySelector(".connBar");
	if (e.querySelector(".connFrame")?.dataset.app === i) {
		o?.querySelector(".pinBtn")?.replaceWith(Object.assign(document.createElement("template"), { innerHTML: ra("app", a) }).content), o && ia(o);
		return;
	}
	e.innerHTML = `<div class="connBar"><button type="button" class="ghost" id="connBack">← Apps</button><b>${h(r.title)}</b>${zi(n)}${ra("app", a)}<button type="button" class="ghost" id="connReload" title="${p("Recarregar")}" aria-label="${p("Recarregar")}">↻</button></div><div class="appAsk" id="appAsk" hidden></div><iframe class="connFrame" sandbox="allow-scripts allow-forms" title="${h(r.title)}"></iframe>`;
	let s = e.querySelector(".connFrame");
	s.dataset.app = i, document.getElementById("connBack").onclick = () => {
		q = null, J();
	}, ia(e.querySelector(".connBar")), document.getElementById("connReload").onclick = () => {
		s.dataset.app = "", Hi(e);
	}, $i(s, n, r);
}
var Ui = (e) => Array.isArray(e) ? e.filter((e) => e?.type === "text").map((e) => e.text).join("\n") : "", Wi = (e) => ({
	content: [{
		type: "text",
		text: typeof e == "string" ? e : JSON.stringify(e)
	}],
	...e && typeof e == "object" ? { structuredContent: e } : {}
}), Gi = Promise.resolve();
function Ki(e, t, n) {
	let r = () => new Promise((r) => {
		if (!e?.isConnected) return r(!1);
		e.hidden = !1, e.innerHTML = `<span>${p("Este app quer {what}, como você:", { what: h(t) })}</span><q></q><div><button type="button" class="primary">${p("Permitir")}</button><button type="button" class="ghost">${p("Cancelar")}</button></div>`, e.querySelector("q").textContent = String(n).slice(0, 600);
		let i = (t) => {
			e.hidden = !0, e.innerHTML = "", r(t);
		};
		e.querySelector(".primary").onclick = () => i(!0), e.querySelector(".ghost").onclick = () => i(!1);
	});
	return Gi = Gi.then(r, r);
}
var qi = [
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
function Ji({ thread: e = "main", limit: t = 50 } = {}) {
	let n = X().filter((t) => t.thread === e).slice(-Math.min(Math.max(Number(t) || 50, 1), 100));
	return {
		room: {
			id: j.id,
			title: P()
		},
		me: {
			email: j.me,
			name: _(j.me)
		},
		members: (j.members || []).map((e) => ({
			email: e.email ?? e,
			name: _(e.email ?? e)
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
			from: e.author === "ai" ? "@vibe" : _(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
async function Yi(e, t = {}, n) {
	let r = (e) => Wi(e), i = (e) => e && e !== "main" && !j.epics.some((t) => t.id === e) ? null : e || "main";
	switch (e) {
		case "vibebook_read": return r(Ji(t));
		case "vibebook_connections": return Array.isArray(K) || await Ri(), r((K || []).map((e) => ({
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
			} : await n(p("postar"), a) ? (N({
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
			return !i || !await n(p("criar uma tarefa"), `${e ? e.title : p("sala principal")}: ${i}`) ? {
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
			} : await n(p("mover uma tarefa"), `${e.title} → ${t.status}`) ? (N({
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
			Array.isArray(K) || await Ri();
			let e = (K || []).find((e) => e.id === t.connection_id), r = e?.tools.find((e) => e.name === t.tool);
			return r ? await n(p("usar {tool} em {conn}", {
				tool: r.name,
				conn: e.title
			}), JSON.stringify(t.arguments || {})) ? (await S(`/api/books/${j.id}/connections/${e.id}/call`, {
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
var Xi = /* @__PURE__ */ new WeakMap();
function Zi(e, t) {
	let n = (t) => e.contentWindow?.postMessage({
		jsonrpc: "2.0",
		...t
	}, "*"), r = (e, n) => Ki(t.ask(), e, n), i = (e, n) => t.call ? t.call(e, n || {}) : Yi(e, n || {}, r), a = () => document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches;
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
							locale: d,
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							platform: H.matches ? "mobile" : "web",
							user: {
								email: j.me,
								name: _(j.me)
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
				case "tools/list": return s({ tools: t.call ? [] : qi });
				case "tools/call": return s(await i(o.params?.name, o.params?.arguments));
				case "ui/open-link": {
					let e = String(o.params?.url || "");
					return !/^https?:\/\//i.test(e) || !await r(p("abrir um link"), e) ? s({ isError: !0 }) : (window.open(e, "_blank", "noopener"), s({}));
				}
				case "ui/message": {
					let e = Ui(o.params?.content).trim().slice(0, 4e3);
					return s(e ? await Yi("vibebook_post", {
						text: e,
						thread: t.thread ?? M
					}, r) : {});
				}
				case "ui/update-model-context": {
					let e = Ui(o.params?.content) || (o.params?.structuredContent ? JSON.stringify(o.params.structuredContent) : "");
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
function Qi(e) {
	if (!Xi.has(e)) {
		let t = e.closest(".embedBox"), n = M;
		Xi.set(e, Zi(e, {
			embed: !0,
			thread: n,
			ask: () => t.querySelector(".appAsk") || t.appendChild(Object.assign(document.createElement("div"), {
				className: "appAsk",
				hidden: !0
			}))
		}));
	}
	return Xi.get(e);
}
addEventListener("message", (e) => {
	let t = e.data;
	if (!t || !j || e.origin !== "null") return;
	let n = document.querySelector(".connFrame"), r = n?.contentWindow === e.source ? n : [...document.querySelectorAll("iframe.embed")].find((t) => t.contentWindow === e.source);
	if (r) {
		if (t.vbEmbed === 1) return Qi(r)(typeof t.h == "number" ? {
			method: "ui/notifications/size-changed",
			params: { height: t.h }
		} : {
			method: "ui/message",
			params: { content: [{
				type: "text",
				text: String(t.send || "")
			}] }
		});
		t.jsonrpc === "2.0" && typeof t.method == "string" && (Xi.get(r) || Qi(r))(t);
	}
});
async function $i(e, t, n) {
	let r = t.id === "room", i = `/api/books/${j.id}/connections/${t.id}`, a = () => document.getElementById("appAsk");
	if (r) {
		Xi.set(e, Zi(e, {
			ask: a,
			tool: {
				name: n.tool,
				title: n.title
			},
			first: Promise.resolve(Wi(Ji()))
		})), e.src = `/api/books/${j.id}/files/${n.file.id}`;
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
	Xi.set(e, Zi(e, {
		ask: a,
		call: s,
		first: c,
		tool: o.tool,
		base: i,
		toolName: n.tool
	})), e.srcdoc = o.html;
}
function ea() {
	let e = document.getElementById("remPane");
	if (!e || !j) return;
	Ir();
	let t = j.reminders || [], n = t.filter((e) => e.error).length;
	document.getElementById("remCount").textContent = t.length ? ` ${t.length}${n ? " ⚠" : ""}` : "", Bt("reminders", e, {
		room: j,
		thread: M,
		vb: Ht(),
		send: N
	});
}
function ta() {
	let e = document.getElementById("filesPane");
	if (!e || !j) return;
	Ir();
	let t = j.filesN ?? j.files?.length ?? 0;
	document.getElementById("fileCount").textContent = t ? ` ${t}` : "", Bt("files", e, {
		room: j,
		thread: M,
		vb: Ht(),
		send: N
	});
}
var na = (e, t) => (j.pins || []).find((n) => n.kind === e && n.ref === t), ra = (e, t) => {
	let n = !!na(e, t);
	return `<button type="button" class="ghost pinBtn${n ? " on" : ""}" data-pin-kind="${e}" data-pin-ref="${h(t)}" title="${p(n ? "Desafixar" : "Fixar na lateral")}" aria-label="${p(n ? "Desafixar" : "Fixar na lateral")}" aria-pressed="${n}">${E("pin", 14)}</button>`;
};
function ia(e) {
	e.querySelectorAll("[data-pin-kind]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation();
		let n = na(e.dataset.pinKind, e.dataset.pinRef);
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
var aa = 60, Y = {
	thread: null,
	n: aa
}, oa = {}, sa = !1, ca = /* @__PURE__ */ new Set(), X = () => j.origins?.length ? [...j.messages, ...j.origins.filter((e) => !j.messages.some((t) => t.id === e.id))] : j.messages, la = !1;
function ua() {
	if (!j) return;
	let e = o(`/b/${j.id}${M !== "main" && !I() ? `?t=${encodeURIComponent(M)}` : ""}`, location.href, "svelte");
	location.pathname + location.search !== e && l[la ? "pushState" : "replaceState"](null, "", e), la = !0;
}
function da() {
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
	e.hidden = !n.length, e.innerHTML = n.length ? `<span class="thfL">${E("paperclip", 14)} ${p("Arquivos deste épico")}</span>${n.map(({ f: e, n: t }) => `<a href="${Hr(e)}" target="_blank" rel="noopener" ${Ur(e)} title="${h(e.name)}">${jt(e, 14)}<span>${h(e.name)}</span>${t > 1 ? `<small>v${t}</small>` : ""}</a>`).join("")}` : "";
}
function Z(e) {
	Er(), da(), ua(), pi(), Vr();
	let t = document.getElementById("msgs");
	if (m.querySelector(".book")?.classList.toggle("pre", I()), I()) return zt("chat"), Cn(t);
	if (Y.thread !== M || Y.room !== j.id) {
		let e = m.querySelector(".book"), t = gr(M).some((e) => e.ref.startsWith("t")) || !!j.epics.find((e) => e.id === M)?.tasks.some((e) => !e.done && e.owner === j.me);
		M !== "main" && e?.classList.contains("nodoc") && !e.classList.contains("boardview") && (t || !j.messages.some((e) => e.thread === M)) && e.classList.remove("nodoc"), (M !== "main" || gr(M).length) && setTimeout(() => {
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
		n: aa
	});
	let n = j.messages.filter((e) => e.thread === M && !Ci(e) && !Si(e) && !Si(j.messages.find((t) => t.id === e.reply_to)));
	Pt && n.length < aa && !sa && !j.complete && !j.full?.includes(M) && !oa[j.id + M] && !ca.has(j.id + M) && (ca.add(j.id + M), sa = !0, N({
		t: "older",
		thread: M,
		before: n[0]?.id ?? 0
	}));
	let r = Di(n.slice(-Y.n)), i = n.length > r.length || n.length && !j.complete && !j.full?.includes(M) && !oa[j.id + M], a = t.scrollHeight, o = t.scrollTop, s = j.epics.find((e) => e.id === M)?.from_msg, c = s && (j.messages.find((e) => e.id === s) || j.origins?.find((e) => e.id === s)), l = j.counts ? (j.counts[M] ?? 0) + n.filter((e) => e.id > (j.countsAt ?? 0)).length : n.length;
	Bt("chat", t, {
		room: j,
		thread: M,
		list: r,
		previous: n[n.length - r.length - 1],
		more: i,
		origin: c || null,
		replyCount: l,
		vb: Ut(),
		onloadolder: pa
	}), hr(), li(), e === "stay" ? (t.scrollTop = o, ha(), ya(t)) : e ? (t.scrollTop = o + t.scrollHeight - a, ha(), ya(t)) : (ba(!0), ya(t), ha());
}
function fa() {
	let e = j.messages.filter((e) => e.thread === M);
	sa = !0, N({
		t: "older",
		thread: M,
		before: e[0]?.id ?? 0
	});
}
function pa() {
	if (sa || I()) return;
	let e = j.messages.filter((e) => e.thread === M);
	if (e.length > Y.n) return Y.n += aa, Z(!0);
	j.complete || j.full?.includes(M) || oa[j.id + M] || !e.length || (sa = !0, N({
		t: "older",
		thread: M,
		before: e[0].id
	}));
}
var ma = (e) => String(e ?? "").replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function ha() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".mfoot").forEach((e) => e.remove());
	let t = {}, n = (e) => t[e] ??= {
		st: [],
		rd: []
	}, r = (e) => p("{via} de {who}", {
		via: h(ma(e.who)),
		who: h(_(e.email))
	}), i = /* @__PURE__ */ new Set();
	for (let e of j.acks || []) {
		if (e.status === "dismissed") continue;
		let t = `${e.msg_id}|${e.who}|${e.email}`;
		if (i.has(t)) continue;
		i.add(t);
		let a = e.status === "doing" && Date.now() - e.ts < 12e5, o = r(e), s = `<time title="${h(new Date(e.ts).toLocaleString(d))}">${y(e.ts)}</time>`, c, l, u;
		if (e.status === "blocked") c = "need", l = "⏸", u = `${p("{who} espera você no terminal", { who: o })}${e.note ? `: <b>${h(e.note)}</b>` : ""} · ${s}`;
		else if (a) c = "doing", l = "<span class=\"spin\"></span>", u = `${p("{who} está fazendo isso", { who: o })} · ${s}`;
		else if (e.status === "done") c = "did", l = "✓", u = p("{who} fez isso", { who: o });
		else {
			let t = [...new Set((j.epics || []).filter((t) => t.from_msg === e.msg_id && !t.archived).flatMap((e) => e.tasks.filter((e) => e.status !== "done" && e.owner).map((e) => _(e.owner))))];
			t.length ? (c = "wait", l = "⏳", u = p("aguardando {who}", { who: t.map(h).join(", ") })) : (c = "idle", l = "–", u = `${p("{who} parou", { who: o })} · ${s}`);
		}
		n(e.msg_id).st.push(`<span class="ms ${c}"><i>${l}</i><span>${u}</span></span>`);
	}
	let a = j.messages.filter((e) => e.thread === M);
	for (let e of j.receipts || []) {
		let t = a.findLast((t) => t.id <= Math.max(e.read, e.delivered) && (t.kind !== "agent" || t.author !== e.email));
		if (!t || i.has(`${t.id}|${e.who}|${e.email}`)) continue;
		let o = e.read >= t.id, s = r(e);
		n(t.id).rd.push(`<span class="${o ? "rd" : ""}" title="${p(o ? "lido por {who}" : "entregue, ainda não lido por {who}", { who: s })}">${o ? "✓✓" : "✓"} ${h(ma(e.who))}</span>`);
	}
	for (let [e, n] of Object.entries(t)) {
		let t = document.querySelector(`#m${e} .body`);
		t && t.insertAdjacentHTML("beforeend", `<div class="mfoot">${n.st.join("")}${n.rd.length ? `<span class="mr">${n.rd.join("")}</span>` : ""}</div>`);
	}
}
function ga(e) {
	Z(_a || e.author === j.me && e.kind !== "agent" ? void 0 : "stay");
}
var _a = !0, va = new ResizeObserver(() => {
	let e = document.getElementById("msgs");
	e && _a && (e.scrollTop = e.scrollHeight);
});
function ya(e) {
	e && (e.classList?.contains("msg") ? [e] : e.querySelectorAll(".msg")).forEach((e) => va.observe(e));
}
function ba(e) {
	let t = document.getElementById("msgs");
	if (t) {
		t.onscroll ??= () => {
			t.scrollHeight - t.scrollTop - t.clientHeight < 80 ? _a = !0 : t.scrollTop < (t._lastTop ?? 0) - 2 && (_a = !1), t._lastTop = t.scrollTop, t.scrollTop < 150 && !_a && pa();
		}, va.observe(t), t._mo ??= new MutationObserver((e) => {
			for (let t of e) t.addedNodes.forEach((e) => e.nodeType === 1 && va.observe(e));
			_a && (t.scrollTop = t.scrollHeight);
		}), t._mo.observe(t, { childList: !0 });
		for (let e of t.children) va.observe(e);
		e && (_a = !0), (e || t.scrollHeight - t.scrollTop - t.clientHeight < 200) && (t.scrollTop = t.scrollHeight);
	}
}
var xa = "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js", Sa, Ca = () => Sa ??= new Promise((e, t) => {
	let n = Object.assign(document.createElement("script"), {
		src: xa,
		crossOrigin: "anonymous",
		integrity: "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA"
	});
	n.onload = () => e(window.pele), n.onerror = () => {
		Sa = null, t();
	}, document.head.append(n);
});
async function wa(e) {
	let t = [...e.querySelectorAll("pre > code.language-mermaid")];
	if (!t.length) return;
	let n = await Ca().catch(() => null);
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
			i.classList.add("err"), i.textContent = `${p("Diagrama com erro")}${e.line ? ` ${p("na linha {n}", { n: e.line })}` : ""}: ${e.message}`;
		}
		t.parentElement.replaceWith(i);
	});
}
function Ta(e, t) {
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
var Q = !1, Ea = null, Da = /* @__PURE__ */ new Set(), Oa = () => !Q && !I() && j.epics.some((e) => e.id === M) ? M : null;
function $(e) {
	let t = document.getElementById("doc");
	if (!t) return;
	j.docs ??= {};
	let n = Oa(), r = n && j.epics.find((e) => e.id === n);
	n && !(n in j.docs) && !Da.has(j.id + n) && (Da.add(j.id + n), N({
		t: "doc.get",
		epic: n
	}));
	let i = n ? j.docs[n] || `# ${r.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n` : j.doc;
	Ea !== (n || "room") && (e = !0, Ea = n || "room"), un();
	let a = !I() && j.epics.find((e) => e.id === M), o = document.getElementById("docCrumb");
	o.hidden = !a, a && (o.innerHTML = `<button type="button" class="${n ? "" : "sel"}" data-docroom="1">${h(P())}</button><span>›</span><button type="button" class="${n ? "sel" : ""}" data-docroom="">${h(a.title)}</button>`, o.querySelectorAll("button").forEach((e) => e.onclick = () => {
		Q = !!e.dataset.docroom, $(!0);
	}));
	let s = document.getElementById("preview"), c = document.getElementById("tasks");
	c && document.getElementById("tasksHome").append(c), s.innerHTML = i.trim() ? DOMPurify.sanitize(marked.parse(i, {
		breaks: !0,
		gfm: !0
	}), {
		...he,
		FORBID_TAGS: he.FORBID_TAGS.filter((e) => e !== "img"),
		ADD_ATTR: ["target"]
	}) : `<div class="empty">${p("Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.")}</div>`, s.querySelectorAll("a").forEach((e) => {
		e.target = "_blank", e.rel = "noopener noreferrer nofollow ugc";
	}), !n && j.docNotes?.length && s.insertAdjacentHTML("afterbegin", `<div class="docNotes" title="${p("@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).")}">${j.docNotes.map((e) => `<span class="vnote">${E("alert", 12)} ${h(e)}</span>`).join("")}</div>`), wa(s), Ta(s, n || (M === "main" && j.roomTasks?.length ? "main" : null)), Ir(), (e || document.activeElement !== t) && (t.value = i);
}
var ka = 3e5;
function Aa() {
	try {
		return localStorage.getItem("vb.lock");
	} catch {
		return null;
	}
}
var ja = (e) => crypto.getRandomValues(new Uint8Array(e)), Ma = () => navigator.credentials.get({ publicKey: {
	challenge: ja(32),
	allowCredentials: [{
		type: "public-key",
		id: Uint8Array.from(atob(Aa()), (e) => e.charCodeAt(0))
	}],
	userVerification: "required",
	hints: ["client-device"],
	timeout: 6e4
} });
async function Na(e, t) {
	if (!e) {
		localStorage.removeItem("vb.lock");
		return;
	}
	let n = await navigator.credentials.create({ publicKey: {
		challenge: ja(32),
		rp: { name: "vibebook" },
		user: {
			id: ja(16),
			name: t,
			displayName: p("vibebook (trava do app)")
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
function Pa() {
	if (!Aa() || document.getElementById("lockScreen")) return;
	let e = document.createElement("div");
	e.id = "lockScreen", e.innerHTML = `<img src="/favicon.svg" alt="" width="64" height="64" /><b>vibebook</b><button class="primary">${p("Desbloquear com Face ID")}</button><p class="err" hidden></p>`, document.body.append(e);
	let t = async () => {
		try {
			await Ma(), e.remove();
		} catch {
			let t = e.querySelector(".err");
			t.hidden = !1, t.textContent = p("Toque pra tentar de novo.");
		}
	};
	e.querySelector("button").onclick = t;
}
var Fa = 0;
document.addEventListener("visibilitychange", () => {
	document.hidden ? Fa = Date.now() : Fa && Date.now() - Fa > ka && Pa();
}), Pa(), qe();
