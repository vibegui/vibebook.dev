import { a as e, i as t, o as n, r, s as i, t as a } from "./main-jdVC_yn0.js";
// svelte/legacy/host.js
var o = document.cookie.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] || (/^pt/i.test(navigator.language) ? "pt" : /^en/i.test(navigator.language) ? "en" : "pt");
document.documentElement.lang = o === "en" ? "en" : "pt-BR";
var s = o === "en" ? "en-US" : "pt-BR", c = {
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
}, l = (e, t) => {
	let n = o === "en" && c[e] !== void 0 ? c[e] : e;
	return t ? n.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : n;
}, u = () => `<span class="langSw" role="group" aria-label="Idioma / Language">${["pt", "en"].map((e) => `<button type="button" class="${o === e ? "sel" : ""}" data-lang="${e}" aria-pressed="${o === e}">${e.toUpperCase()}</button>`).join("<i>·</i>")}</span>`;
document.addEventListener("click", (e) => {
	let t = e.target.closest?.("[data-lang]");
	t && t.dataset.lang !== o && (document.cookie = `vb_lang=${t.dataset.lang}; path=/; max-age=31536000; samesite=lax`, location.reload());
});
var d = document.getElementById("app"), f = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), p = [
	"#ff5a36",
	"#1f9d8a",
	"#3b6cf6",
	"#c2410c",
	"#9333ea",
	"#0f766e",
	"#be185d",
	"#4d7c0f"
], m = (e) => p[[...e].reduce((e, t) => e + t.charCodeAt(0), 0) % p.length], ee = {}, h = (e) => e === "ai" ? "@vibe" : k?.names?.[e] || ee[e] || e.split("@")[0], te = {}, g = (e, t) => {
	if (e === "ai") return "<span class=\"avatar ai\">✦</span>";
	let n = k?.avatars?.[e] ?? te[e];
	return n ? `<span class="avatar pic ${t ? "on" : ""}" title="${f(h(e))}"><img src="/api/avatar/${encodeURIComponent(e)}?v=${n}" alt="" loading="lazy" /></span>` : `<span class="avatar ${t ? "on" : ""}" style="background:${m(e)}" title="${f(h(e))}">${f(h(e).slice(0, 2).toUpperCase())}</span>`;
}, ne = (e) => {
	let t = String(e || "");
	return /codex|gpt|openai|\bo[1-9]\b/i.test(t) ? ["codex", "◎"] : /gemini/i.test(t) ? ["gemini", "✦"] : /cursor/i.test(t) ? ["cursor", "▲"] : /copilot/i.test(t) ? ["copilot", "◉"] : ["", "✻"];
}, re = (e, t) => {
	let [n, r] = ne(t);
	return `<span class="avatar claude${n ? ` ${n}` : ""}" title="${l("{via} de {who}", {
		via: f(la(t) || "Agent"),
		who: f(h(e))
	})}">${r}${g(e)}</span>`;
}, _ = (e) => {
	let t = Math.round((Date.now() - e) / 6e4);
	return t < 1 ? l("agora") : t < 60 ? `${t} min` : t < 1440 ? `${Math.round(t / 60)} h` : `${Math.round(t / 1440)} d`;
}, ie = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, ""), ae = (e) => {
	let t = e.split("@")[0];
	return [
		ie(k?.names?.[e]?.split(/\s+/)[0] || ee[e]?.split(/\s+/)[0] || ""),
		ie(t.split(/[._+-]/)[0]),
		ie(t)
	].filter(Boolean);
}, oe = (e) => ae(e)[0], se = (e) => {
	let t = ie(e);
	return t === "vibe" || t === "ai" ? "ai" : (k?.members || []).find((e) => ae(e).includes(t)) || null;
}, v = (e) => e.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (e, t, n) => {
	let r = se(n);
	return r ? `${t}<span class="mention${r === k?.me ? " me" : ""}" title="${f(r === "ai" ? "@vibe" : r)}">@${n}</span>` : e;
}), ce = "<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>", le = (e) => e.replace(/<a ([^>]*?)href="https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o, s) => {
	if (/^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(n)) return e;
	let c = e.match(/href="([^"]*)"/)[1], l = i === "commit" ? `${n}/${r}@${a.slice(0, 7)}` : i ? `${n}/${r} #${a}` : `${n}/${r}`, u = s.replace(/<[^>]*>/g, "").trim(), d = !u || u === c || /^https?:\/\//.test(u) ? f(l) : s;
	return `<a ${t}href="${c}"${o} class="ghchip" title="${f(l)}">${ce}<span>${d}</span></a>`;
}), ue = (e) => e.replace(/<a ([^>]*?)href="(https?:\/\/[^"\/]+)?\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)"([^>]*)>([\s\S]*?)<\/a>/g, (e, t, n, r, i, a, o) => {
	if (!k?.id || r !== k.id || n && n !== location.origin) return e;
	let s = (k.files || []).find((e) => e.id === i) || Y().flatMap((e) => e.files || []).find((e) => e.id === i), c = o.replace(/<[^>]*>/g, "").trim(), l = s?.name || (c && !/^https?:\/\//.test(c) ? c : "arquivo"), u = s ? Hr(s.name) : [], d = u.length > 1 ? u.length - u.findIndex((e) => e.id === i) : 0;
	return `<a ${t}href="/api/books/${r}/files/${i}"${a} class="fchip" title="${f(l)}">${kt(s || { type: /\.html?$/i.test(l) ? "text/html" : "" }, 14)}<span>${f(l)}</span>${d ? `<small>v${d}</small>` : ""}</a>`;
}), de = JSON.parse("{\"point_up\": \"☝️\", \"point_up_2\": \"👆\", \"point_down\": \"👇\", \"point_left\": \"👈\", \"point_right\": \"👉\", \"+1\": \"👍\", \"thumbsup\": \"👍\", \"-1\": \"👎\", \"thumbsdown\": \"👎\", \"ok_hand\": \"👌\", \"clap\": \"👏\", \"pray\": \"🙏\", \"raised_hands\": \"🙌\", \"wave\": \"👋\", \"muscle\": \"💪\", \"eyes\": \"👀\", \"fire\": \"🔥\", \"rocket\": \"🚀\", \"tada\": \"🎉\", \"100\": \"💯\", \"heart\": \"❤️\", \"heart_eyes\": \"😍\", \"smile\": \"😄\", \"smiley\": \"😃\", \"grin\": \"😁\", \"joy\": \"😂\", \"rofl\": \"🤣\", \"laughing\": \"😆\", \"sweat_smile\": \"😅\", \"wink\": \"😉\", \"blush\": \"😊\", \"slightly_smiling_face\": \"🙂\", \"upside_down_face\": \"🙃\", \"thinking_face\": \"🤔\", \"thinking\": \"🤔\", \"neutral_face\": \"😐\", \"expressionless\": \"😑\", \"unamused\": \"😒\", \"roll_eyes\": \"🙄\", \"face_with_rolling_eyes\": \"🙄\", \"grimacing\": \"😬\", \"sweat\": \"😓\", \"cry\": \"😢\", \"sob\": \"😭\", \"scream\": \"😱\", \"rage\": \"😡\", \"angry\": \"😠\", \"sunglasses\": \"😎\", \"nerd_face\": \"🤓\", \"sleeping\": \"😴\", \"exploding_head\": \"🤯\", \"partying_face\": \"🥳\", \"shrug\": \"🤷\", \"facepalm\": \"🤦\", \"white_check_mark\": \"✅\", \"heavy_check_mark\": \"✔️\", \"check\": \"✔️\", \"x\": \"❌\", \"warning\": \"⚠️\", \"no_entry\": \"⛔\", \"question\": \"❓\", \"exclamation\": \"❗\", \"bulb\": \"💡\", \"memo\": \"📝\", \"pushpin\": \"📌\", \"link\": \"🔗\", \"lock\": \"🔒\", \"unlock\": \"🔓\", \"key\": \"🔑\", \"bug\": \"🐛\", \"wrench\": \"🔧\", \"hammer\": \"🔨\", \"gear\": \"⚙️\", \"zap\": \"⚡\", \"star\": \"⭐\", \"sparkles\": \"✨\", \"boom\": \"💥\", \"hourglass\": \"⌛\", \"alarm_clock\": \"⏰\", \"calendar\": \"📅\", \"chart_with_upwards_trend\": \"📈\", \"chart_with_downwards_trend\": \"📉\", \"moneybag\": \"💰\", \"money_with_wings\": \"💸\", \"dart\": \"🎯\", \"trophy\": \"🏆\", \"coffee\": \"☕\", \"beer\": \"🍺\", \"pizza\": \"🍕\", \"see_no_evil\": \"🙈\", \"hugs\": \"🤗\", \"hugging_face\": \"🤗\", \"handshake\": \"🤝\", \"crossed_fingers\": \"🤞\", \"writing_hand\": \"✍️\", \"skull\": \"💀\", \"ghost\": \"👻\", \"robot_face\": \"🤖\", \"robot\": \"🤖\", \"brain\": \"🧠\", \"speech_balloon\": \"💬\", \"mag\": \"🔍\", \"computer\": \"💻\", \"iphone\": \"📱\", \"package\": \"📦\", \"construction\": \"🚧\", \"rotating_light\": \"🚨\", \"sos\": \"🆘\", \"green_heart\": \"💚\", \"blue_heart\": \"💙\", \"purple_heart\": \"💜\", \"yellow_heart\": \"💛\", \"broken_heart\": \"💔\", \"dog\": \"🐶\", \"cat\": \"🐱\", \"sun\": \"☀️\", \"rainbow\": \"🌈\", \"rain\": \"🌧️\", \"snowflake\": \"❄️\", \"earth_americas\": \"🌎\", \"brazil\": \"🇧🇷\", \"flag-br\": \"🇧🇷\", \"checkered_flag\": \"🏁\", \"arrow_up\": \"⬆️\", \"arrow_down\": \"⬇️\", \"arrow_right\": \"➡️\", \"arrow_left\": \"⬅️\", \"heavy_plus_sign\": \"➕\", \"heavy_minus_sign\": \"➖\", \"red_circle\": \"🔴\", \"large_green_circle\": \"🟢\", \"green_circle\": \"🟢\", \"large_yellow_circle\": \"🟡\", \"yellow_circle\": \"🟡\", \"white_circle\": \"⚪\", \"black_circle\": \"⚫\"}"), fe = (e) => e.replace(/:([a-z0-9_+-]{1,40}):/g, (e, t) => de[t] ?? e), pe = (e) => ue(le(fe(e).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g, (e) => `<a href="${e}" target="_blank" rel="noopener noreferrer nofollow ugc">${e}</a>`))), me = {
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
}, he = (e) => DOMPurify.sanitize(ue(le(DOMPurify.sanitize(marked.parse(fe(e), {
	breaks: !0,
	gfm: !0
}), me).replace(/<a (?!href="#(?:m\d+|e[\w-]+|doc[\w:-]*)")/g, "<a target=\"_blank\" rel=\"noopener noreferrer nofollow ugc\" ").replace(/<a href="#m(\d+)"/g, "<a class=\"mlink\" href=\"#m$1\" data-msg=\"$1\"").replace(/<a href="#(e[\w-]+|doc[\w:-]*)"/g, "<a class=\"mlink\" href=\"#$1\" data-cardgo=\"#$1\""))), {
	...me,
	ADD_ATTR: ["target"]
}), y = async (e, t) => {
	let n = await fetch(e, t ? {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(t)
	} : {});
	if (n.status === 401) throw location.href = `/login?next=${encodeURIComponent(location.pathname)}`, Error("unauthenticated");
	if (!n.ok) throw Error((await n.json().catch(() => ({}))).error || n.statusText);
	return n.json();
}, b = document.getElementById("switcher"), x = null, S = [], ge = (e) => e.some((e) => /^[ab]\d/.test(e.ref)) ? " cl" : "", _e = {
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
}, C = (e, t = 16) => `<svg class="i" viewBox="0 0 24 24" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${_e[e]}</svg>`, ve = "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"22\" height=\"24\" rx=\"5\" fill=\"#fff\"/><rect x=\"7\" y=\"9\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><rect x=\"7\" y=\"15\" width=\"8\" height=\"3\" rx=\"1.5\" fill=\"#1d5fc4\"/><circle cx=\"24\" cy=\"23\" r=\"7\" fill=\"#f2dc4a\"/></svg>", ye = C("search", 18), be = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round">${[
	0,
	60,
	120
].map((e) => `<line x1="12" y1="3.5" x2="12" y2="20.5" transform="rotate(${e} 12 12)"/>`).join("")}</g></svg>`, xe = C("plus", 18);
if (window.visualViewport) {
	let e = () => {
		document.documentElement.style.setProperty("--vvh", `${Math.round(visualViewport.height)}px`), innerWidth <= 900 && scrollY && document.querySelector(".book") && scrollTo(0, 0);
	};
	visualViewport.addEventListener("resize", e), visualViewport.addEventListener("scroll", e), e();
}
var w = {
	auto: {
		label: l("Tema automático (do sistema)"),
		next: "light",
		icon: C("contrast", 18)
	},
	light: {
		label: l("Tema claro"),
		next: "dark",
		icon: C("sun", 18)
	},
	dark: {
		label: l("Tema escuro"),
		next: "auto",
		icon: C("moon", 18)
	}
}, T = () => document.documentElement.dataset.theme || "auto";
function Se(e) {
	e === "auto" ? delete document.documentElement.dataset.theme : document.documentElement.dataset.theme = e;
	try {
		e === "auto" ? localStorage.removeItem("vb.theme") : localStorage.setItem("vb.theme", e);
	} catch {}
	E();
}
var Ce = {
	blue: l("azul"),
	green: l("verde"),
	yellow: l("amarelo"),
	orange: l("laranja"),
	pink: l("rosa"),
	purple: l("roxo")
}, we = Object.keys(Ce);
document.addEventListener("click", (e) => {
	let t = document.getElementById("tintPop");
	t && !t.hidden && !t.contains(e.target) && (t.hidden = !0);
}), document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		let e = document.getElementById("tintPop");
		e && (e.hidden = !0);
	}
});
var Te = () => [...x || []].sort((e, t) => (e.position ?? 1e9) - (t.position ?? 1e9) || (e.created_at ?? 0) - (t.created_at ?? 0)), Ee = (e) => e?.icon ? `/api/books/${e.id}/icon?v=${e.icon}` : null, De = (e, t) => Ee(e) ? `<span class="tile ${t} hasIcon"><img src="${Ee(e)}" alt="" loading="lazy"></span>` : `<span class="tile ${t}" style="background:${ln(e.title)}">${f(N(e.title))}</span>`;
function Oe(e) {
	let t = x?.find((e) => e.id === k?.id);
	t && e > t.read_id && (t.read_id = e);
}
function ke() {
	document.body.classList.contains("has-sw") && y("/api/me").then((e) => {
		Ze(e);
		let t = JSON.stringify(fr());
		x = e.books, S = e.waits || [], k?.messages?.length && Oe(k.messages.at(-1).id), E(), k && JSON.stringify(fr()) !== t && (L(), X(!0));
	}).catch(() => {});
}
var Ae = null, je = 0, Me = 0, Ne = 0;
function Pe() {
	Ae && Ae.readyState <= 1 || (Ae = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`), Ae.onopen = () => {
		je = 0;
	}, Ae.onmessage = (e) => {
		let t;
		try {
			t = JSON.parse(e.data);
		} catch {
			return;
		}
		t.t === "me" && !(t.msg && t.book && t.book === k?.id) && (clearTimeout(Me), Me = setTimeout(ke, 600)), t.t === "agents" && (t.book === "*" || t.book === k?.id) && (clearTimeout(Ne), Ne = setTimeout(bn, 600));
	}, Ae.onclose = () => {
		Ae = null, document.visibilityState === "visible" && setTimeout(Pe, Math.min(3e4, 1e3 * 2 ** je++));
	});
}
document.addEventListener("visibilitychange", () => {
	document.visibilityState === "visible" && document.body.classList.contains("has-sw") && (ke(), bn(), Pe());
});
var Fe = "";
function E() {
	_t();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1], t = !!x && location.pathname !== "/login";
	if (document.body.classList.toggle("has-sw", t), !t) {
		b.innerHTML = "";
		return;
	}
	let n = [];
	for (let e of Te()) {
		let t = n.at(-1);
		t && e.tint && t.tint === e.tint ? t.rooms.push(e) : n.push({
			tint: e.tint || null,
			rooms: [e]
		});
	}
	let r = (e) => e.last_human_id > e.read_id ? `<b class="dot h" title="${l("mensagens novas")}"></b>` : e.last_agent_id > e.read_id ? `<b class="dot a" title="${l("agents escreveram")}"></b>` : "", i = (e) => e.busy_until > Date.now() ? `<b class="swBusy" title="${l("um agent está trabalhando aqui")}">✻</b>` : "", a = (e) => {
		let t = S.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${ge(t)}" title="${n === 1 ? l("1 coisa esperando você") : l("{n} coisas esperando você", { n })}">${n}</b>` : "";
	}, o = (e) => e.sandboxes_running ? `<b class="swCloud" title="${l("sandbox na nuvem rodando")}">☁</b>` : "", s = (e) => `<a class="sw-item" href="/b/${e.id}" data-nav data-id="${e.id}" draggable="true" data-drag aria-label="${f(e.title)}"><i class="pill"></i><span class="tw${e.sandboxes_running ? " cloud" : ""}">${De(e, "lg")}${r(e)}${i(e)}${a(e)}${o(e)}</span></a>`, c = `<a class="sw-item" href="/app" data-nav title="${l("Seus vibebooks")}" aria-label="${l("Seus vibebooks")}"><i class="pill"></i><span class="tile lg logo">${ve}</span></a>
    <span class="sw-sep"></span>
    ${n.map((e) => e.tint ? `<div class="sw-group" data-tint="${e.tint}">${e.rooms.map(s).join("")}</div>` : s(e.rooms[0])).join("")}
    <span class="sw-sp"></span>
    <button class="sw-btn" id="swTheme" title="${l("{theme} (clique pra trocar)", { theme: w[T()].label })}" aria-label="${l("Tema: {theme}", { theme: w[T()].label })}">${w[T()].icon}</button>
    <button class="sw-btn" id="swSearch" title="${l("Ir para um vibebook (⌘K)")}" aria-label="${l("Ir para um vibebook")}">${ye}</button>
    <button class="sw-btn" id="swNew" title="${l("Novo vibebook")}" aria-label="${l("Novo vibebook")}">${xe}</button>`, u = () => {
		b.querySelectorAll(".sw-item").forEach((t) => {
			let n = t.dataset.id ? t.dataset.id === e : location.pathname === "/app";
			t.classList.toggle("on", n), n ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current");
		}), b.querySelector(".on")?.scrollIntoView({ block: "nearest" });
	};
	if (c === Fe) return u();
	Fe = c, b.innerHTML = c, u(), b.querySelectorAll("[data-drag]").forEach((e) => e.oncontextmenu = (t) => {
		t.preventDefault();
		let n = x.find((t) => t.id === e.dataset.id), r = document.getElementById("tintPop");
		r.innerHTML = `<small>${f(n.title)}</small><div>${[null, ...we].map((e) => `<button data-tint="${e || ""}" class="${(n.tint || null) === e ? "sel" : ""}" title="${e ? Ce[e] : l("sem cor")}" aria-label="${e ? Ce[e] : l("sem cor")}"></button>`).join("")}</div>
      <p class="iconRow"><label class="ghost">${l("Trocar ícone…")}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/x-icon,.ico" hidden></label>${n.icon ? `<button class="ghost" data-noicon>${l("Tirar ícone")}</button>` : ""}</p>`, r.querySelector("input[type=file]").onchange = async (e) => {
			let t = e.target.files[0];
			if (t) {
				r.hidden = !0;
				try {
					let e = await fetch(`/api/books/${n.id}/icon`, {
						method: "POST",
						headers: { "content-type": "image/png" },
						body: await fn(t, 128)
					}).then((e) => e.json());
					if (e.error) throw Error(e.error);
					n.icon = e.icon, E(), k?.id === n.id && (pn(M()), L());
				} catch (e) {
					alert(e.message || l("Não deu pra usar essa imagem."));
				}
			}
		}, r.querySelector("[data-noicon]")?.addEventListener("click", async () => {
			r.hidden = !0, await y(`/api/books/${n.id}/icon`, {}), n.icon = null, E(), k?.id === n.id && (pn(M()), L());
		});
		let i = e.getBoundingClientRect();
		r.style.top = `${i.top}px`, r.hidden = !1, r.querySelectorAll("button[data-tint]").forEach((e) => e.onclick = () => {
			n.tint = e.dataset.tint || null, r.hidden = !0, E(), y(`/api/books/${n.id}/tint`, { tint: n.tint }).catch(() => {});
		});
	}), b.querySelectorAll("[data-drag]").forEach((e) => {
		e.ondragstart = (t) => {
			t.dataTransfer.setData("text/plain", e.dataset.id), t.dataTransfer.effectAllowed = "move";
		}, e.ondragover = (t) => {
			t.preventDefault(), e.classList.add("dropTo");
		}, e.ondragleave = () => e.classList.remove("dropTo"), e.ondrop = (t) => {
			t.preventDefault(), e.classList.remove("dropTo");
			let n = t.dataTransfer.getData("text/plain"), r = e.dataset.id;
			if (!n || n === r) return;
			let i = Te().map((e) => e.id).filter((e) => e !== n), a = e.getBoundingClientRect();
			i.splice(i.indexOf(r) + +(t.clientY > a.top + a.height / 2), 0, n), i.forEach((e, t) => {
				let n = x.find((t) => t.id === e);
				n && (n.position = t);
			}), E(), y("/api/rooms/order", { ids: i }).catch(() => {});
		};
	}), document.getElementById("swSearch").onclick = Ge, document.getElementById("swTheme").onclick = () => Se(w[T()].next), document.getElementById("swNew").onclick = () => lt();
}
var Ie = document.getElementById("swTip");
b.addEventListener("mouseover", (e) => {
	let t = e.target.closest(".sw-item[data-id]"), n = t && x?.find((e) => e.id === t.dataset.id);
	if (!n) {
		Ie.hidden = !0;
		return;
	}
	let r = (n.members || "").split(",").filter(Boolean).length, i = n.id === k?.id ? "" : n.last_human_id > n.read_id ? `<span class="tn h">● ${l("mensagens novas")}</span>` : n.last_agent_id > n.read_id ? `<span class="tn a">● ${l("agents escreveram")}</span>` : "";
	Ie.innerHTML = `<b>${f(n.title)}</b>${n.summary ? `<span>${f(n.summary)}</span>` : ""}
    <small>${n.folder ? `${C("folder", 12)} ${f(n.folder)} · ` : ""}${r === 1 ? l("1 pessoa") : l("{n} pessoas", { n: r })} · ${_(n.updated_at) === l("agora") ? l("ativa agora") : l("ativa há {ago}", { ago: _(n.updated_at) })}</small>${i}`;
	let a = t.querySelector(".tile").getBoundingClientRect();
	Ie.style.top = `${a.top + a.height / 2}px`, Ie.hidden = !1;
}), b.addEventListener("mouseleave", () => Ie.hidden = !0), b.addEventListener("click", () => Ie.hidden = !0);
var Le = document.getElementById("swDlg"), D = document.getElementById("swQ"), Re = document.getElementById("swList");
b.setAttribute("aria-label", l("Seus vibebooks")), Le.setAttribute("aria-label", l("Ir para um vibebook")), D.placeholder = l("Buscar salas, conversas e arquivos…");
var ze = 0;
function Be() {
	let e = ie(D.value), t = (x || []).filter((t) => !e || ie(t.title).includes(e) || ie(t.folder || "").includes(e)).slice(0, 12);
	ze = Math.min(ze, Math.max(0, t.length - 1));
	let n = Ve && Ve.q === D.value.trim() ? Ve : null;
	Re.innerHTML = (t.map((e, t) => `<a href="/b/${e.id}" data-nav class="${t === ze ? "sel" : ""}" role="option">${De(e, "")}<span>${f(e.title)}</span>${e.folder ? `<small>${f(e.folder)}</small>` : ""}</a>`).join("") || (n?.epics.length || n?.messages.length ? "" : `<p class="muted" style="padding:8px 10px;margin:0">${l("Nada com esse nome.")}</p>`)) + Ue(n);
}
var Ve = null, He = 0, Ue = (e) => {
	if (!e) return D.value.trim().length >= 2 ? `<p class="muted swHint">${l("Buscando nas conversas…")}</p>` : "";
	let t = (e) => new Date(e).toLocaleDateString(s, {
		day: "numeric",
		month: "short"
	}), n = e.epics.map((e) => `<a href="/b/${e.room_id}?t=${e.id}" data-hit="${e.room_id}|${e.id}|" role="option"><span class="hitIco">${e.archived ? "✓" : "#"}</span><span><b>${f(e.title)}</b><small>${f(e.room)}${e.archived ? ` · ${l("arquivado")}` : ""} · ${t(e.ts)}</small></span></a>`).join(""), r = e.messages.map((e) => `<a href="/b/${e.room_id}${e.thread === "main" ? "" : `?t=${e.thread}`}#m${e.id}" data-hit="${e.room_id}|${e.thread}|${e.id}" role="option"><span class="hitIco">${e.files.length ? C("paperclip", 14) : e.by_agent ? "✻" : "“"}</span><span><span class="hitTxt">${f(e.snippet || e.files.map((e) => e.name).join(", "))}</span><small>${f(e.room)}${e.topic ? ` › ${f(e.topic)}` : ""} · ${f(e.by_agent ? e.via || "Agent" : h(e.author))} · ${t(e.ts)}${e.files.length && e.snippet ? ` · ${f(e.files.map((e) => e.name).join(", "))}` : ""}</small></span></a>`).join("");
	return !n && !r ? `<p class="muted swHint">${l("Nada nas conversas.")}</p>` : `${n ? `<p class="swSec">${l("Épicos")}</p>${n}` : ""}${r ? `<p class="swSec">${l("Nas conversas")}</p>${r}` : ""}`;
};
function We() {
	clearTimeout(He);
	let e = D.value.trim();
	e.length < 2 ? Ve = null : He = setTimeout(async () => {
		let t = await fetch(`/api/search?q=${encodeURIComponent(e)}`).catch(() => null), n = t?.ok ? await t.json() : null;
		D.value.trim() === e && (Ve = n ? {
			q: e,
			epics: n.epics || [],
			messages: n.messages || []
		} : {
			q: e,
			epics: [],
			messages: []
		}, Be());
	}, 250);
}
function Ge() {
	x && (D.value = "", ze = 0, Ve = null, Be(), Le.showModal(), D.focus());
}
D.oninput = () => {
	ze = 0, We(), Be();
}, D.onkeydown = (e) => {
	let t = Re.querySelectorAll("a").length;
	(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), ze = (ze + (e.key === "ArrowDown" ? 1 : t - 1)) % Math.max(t, 1), Be()), e.key === "Enter" && (e.preventDefault(), Re.querySelectorAll("a")[ze]?.click());
}, Re.onclick = (e) => {
	let t = e.target.closest("a[data-hit]");
	if (Le.close(), !t) return;
	e.preventDefault();
	let [n, r, i] = t.dataset.hit.split("|");
	if (history.pushState(null, "", t.getAttribute("href")), Ke(), !i) return;
	let a = 0, o = () => {
		if (k?.id === n && k.messages?.length) return mi(Number(i));
		++a < 25 && setTimeout(o, 200);
	};
	setTimeout(o, 150);
}, Le.onclick = (e) => {
	e.target === Le && Le.close();
}, document.addEventListener("keydown", (e) => {
	(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && document.body.classList.contains("has-sw") && (e.preventDefault(), Le.open ? Le.close() : Ge());
});
function Ke() {
	Rt(), E();
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (O &&= (O.onclose = null, O.onmessage = null, O.close(), null), location.pathname === "/login") return Je();
	if (location.pathname === "/archived") return dt();
	e ? Pt(e[1]) : $e();
}
var qe = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><path fill=\"#FFC107\" d=\"M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z\"/><path fill=\"#FF3D00\" d=\"M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z\"/><path fill=\"#4CAF50\" d=\"M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z\"/><path fill=\"#1976D2\" d=\"M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z\"/></svg>";
async function Je() {
	document.title = `${l("Entrar")} · vibebook`, pn(null);
	let e = new URLSearchParams(location.search), t = e.get("next") || "/app", n = await fetch("/auth/providers").then((e) => e.json()).catch(() => ({ google: !1 })), r = "", i = (e, a = "") => {
		d.innerHTML = `
    <div class="login"><div class="box">
      <a class="brand" href="/">vibebook</a>
      ${e === "email" ? `
        <h1>${l("Entrar")}</h1>
        <p>${l("Seus vibebooks e seus amigos te esperando.")}</p>
        ${n.google ? `<a class="google" href="/auth/google/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${qe} ${l("Continuar com Google")}</button></a>` : ""}${n.github ? `<a class="google" href="/auth/github/start?next=${encodeURIComponent(t)}" style="text-decoration:none"><button type="button" class="google">${ce.replace("<svg ", "<svg width=\"18\" height=\"18\" ")} ${l("Continuar com GitHub")}</button></a>` : ""}${n.google || n.github ? `<div class="or">${l("ou com email")}</div>` : ""}
        <form id="f"><label class="muted" for="email" style="font-size:14px">${l("Seu email")}</label>
          <input id="email" type="email" autocomplete="email" required placeholder="${l("voce@gmail.com")}" value="${f(r)}" />
          <button class="primary" id="go">${l("Mandar código")}</button>
          <p class="err" role="alert">${f(a)}</p></form>` : `
        <h1>${l("Confere seu email")}</h1>
        <p>${l("Mandamos um código de 6 dígitos para <b>{email}</b>.", { email: f(r) })}</p>
        <form id="f"><label class="muted" for="code" style="font-size:14px">${l("Código")}</label>
          <input id="code" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required pattern="[0-9]{6}" />
          <button class="primary" id="go">${l("Entrar")}</button>
          <p class="err" role="alert">${f(a)}</p>
          <button type="button" class="link" id="back">${l("usar outro email")}</button></form>`}
    </div></div>`;
		let o = document.getElementById("f");
		o.querySelector("input").focus(), document.getElementById("back")?.addEventListener("click", () => i("email")), o.onsubmit = async (n) => {
			n.preventDefault();
			let a = document.getElementById("go");
			a.disabled = !0, a.textContent = "…";
			let o = e === "email" ? "/auth/email/start" : "/auth/email/verify";
			e === "email" && (r = document.getElementById("email").value.trim());
			let s = e === "email" ? { email: r } : {
				email: r,
				code: document.getElementById("code").value,
				next: t
			}, c = await fetch(o, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(s)
			}), u = await c.json().catch(() => ({}));
			if (!c.ok) return i(e, u.error || l("Algo deu errado. Tenta de novo."));
			if (e === "email") return i("code");
			location.href = u.next || "/app";
		}, e === "code" && (document.getElementById("code").oninput = (e) => {
			e.target.value.replace(/\D/g, "").length === 6 && o.requestSubmit();
		});
	};
	i("email", e.get("error") === "google" ? l("Não deu certo com o Google. Tenta com email.") : e.get("error") === "github" ? l("Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.") : "");
}
window.addEventListener("popstate", () => {
	if (qr() || Pr()) return;
	let e = location.pathname.match(/^\/b\/([a-z0-9]+)/);
	if (!e || !k || e[1] !== k.id) return Ke();
	A = new URLSearchParams(location.search).get("t") || "main", A !== "main" && !k.epics.some((e) => e.id === A) && (A = "main"), Q = !1, kr = A === "main" ? null : A, L(), X(), z(), $();
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("a[data-nav]");
	t && (e.preventDefault(), history.pushState(null, "", t.getAttribute("href")), Ke());
});
var Ye = null, Xe = "", Ze = (e) => {
	Ye = e, Xe = JSON.stringify(e), Qe(e.v), Pe();
};
function Qe(e) {
	let t = document.querySelector("meta[name=\"vb-v\"]")?.content;
	if (!e || !t || e === t || document.getElementById("vbUpdate")) return;
	let n = document.createElement("button");
	n.id = "vbUpdate", n.type = "button", n.className = "vbUpdate", n.innerHTML = `${C("undo", 15)} ${l("Nova versão do vibebook · toque pra atualizar")}`, n.onclick = () => location.reload(), document.body.append(n);
}
async function $e() {
	document.title = "vibebook", pn(null), Ye && et(Ye);
	let e = await y("/api/me");
	if (/^\/(b|login|archived)\b/.test(location.pathname)) return Ze(e);
	let t = JSON.stringify(e) !== Xe;
	if (Ze(e), !t && d.querySelector("#ask")) return;
	let n = document.getElementById("askText")?.value;
	if (et(e), n) {
		let e = document.getElementById("askText");
		e && (e.value = n);
	}
}
function et(e) {
	x = e.books, S = e.waits || [], E(), ee = Object.fromEntries(e.friends.filter((e) => e.name).map((e) => [e.email, e.name])), te = Object.fromEntries([...e.friends.filter((e) => e.avatar).map((e) => [e.email, e.avatar]), ...e.avatar ? [[e.email, e.avatar]] : []]);
	let t = (e.name || "").split(" ")[0], n = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	if (tt.matches) return rt(e);
	d.innerHTML = `
  <div class="home">
    <header class="top">
      <div class="brand"><a href="/">vibebook</a></div>
      <button class="me" id="myName" title="${l("Seu perfil: email, como você entra, sair")}">${g(e.email)}<span>${f(e.name || e.email)}</span></button>
      <button class="ghost bell" data-bell></button>
      <button class="ghost homeTheme" id="homeTheme" aria-label="${l("Tema")}">${w[T()].icon}</button>
      ${u()}
    </header>
    <dialog class="profile" id="profileDlg">
      <button class="ghost x pfX" aria-label="${l("Fechar")}">${C("x")}</button>
      <div class="pdHead">${g(e.email)}<div><b title="${l("Mudar seu nome")}">${f(e.name || l("Seu nome"))}</b><small>${f(e.email)}</small></div></div>
      ${it()}
      <div class="pfOut"><button class="primary" id="logout">${l("Sair")}</button><button class="ghost" id="logoutAll" title="${l("Sai em todos os navegadores e celulares onde você entrou")}">${l("Sair de todos os aparelhos")}</button></div>
    </dialog>
    <div id="setupCard"></div>
    <form class="ask" id="ask">
      <label for="askText">${l("O que você quer resolver?")}</label>
      <div class="askRow"><textarea id="askText" rows="2" maxlength="2000" placeholder="${l("Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.")}"></textarea><button class="primary" id="askBtn">${l("Achar a sala →")}</button></div>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
    ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${l("Como seus amigos te chamam?")}</b><span class="muted">${l("O pessoal e os agents vão te chamar assim.")}</span>
      <div class="row"><input name="n" required maxlength="60" placeholder="${l("Seu nome")}" autocomplete="given-name" /><button class="primary">${l("Salvar")}</button></div></form>`}
    ${e.avatar ? "" : `<div class="picAsk"><span class="picBig" style="background:${m(e.email)}">${f(h(e.email).slice(0, 2).toUpperCase())}</span>
      <div><b>${l("Coloque sua foto")}</b><span class="muted">${l("Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).")}</span></div>
      <button class="primary" data-pic>${C("camera")} ${l("Adicionar foto")}</button></div>`}
    <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />
    <div class="hello">
      <div class="helloText"><h1>${t ? l("Oi, {name}", { name: f(t) }) : l("Seus vibebooks")}</h1>
        <p>${n(e.books.length, "vibebook", "vibebooks")} · ${n(e.friends.length, l("amigo"), l("amigos"))} · <a class="archLink" data-nav href="/archived">${l("Arquivo")}</a><span id="waitN"></span></p></div>
      <button class="primary" id="new">${C("plus")} ${l("Novo vibebook")}</button>
    </div>
    <div class="grid">
      <main>
        ${e.books.length ? "" : `<div class="empty">${l("Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.")}</div>`}
        <div class="cards">${Te().map((e) => {
		let t = (e.members || "").split(",").filter(Boolean);
		return `
              <div class="cardBox"><a class="card" data-nav href="/b/${e.id}">
                <button type="button" class="arch" data-archive="${e.id}" data-title="${f(e.title)}" title="${l("Arquivar")}" aria-label="${l("Arquivar {title}", { title: f(e.title) })}">${C("archive")}</button>
                ${Ee(e) ? `<div class="cover hasIcon"><img src="${Ee(e)}" alt="" loading="lazy"></div>` : `<div class="cover" style="background-color:${ln(e.title)}"><span>${f(N(e.title))}</span></div>`}
                <div class="info">
                  <b>${f(e.title)}</b>
                  <div class="sum">${f(e.summary || l("Ainda sem resumo. O @vibe escreve um quando a conversa andar."))}</div>
                  <div class="meta"><div class="stack">${t.slice(0, 5).map((e) => g(e)).join("")}</div><span class="wc" data-wc="${e.id}"></span><span>${_(e.updated_at)}</span></div>
                </div>
              </a><div class="cw" data-cw="${e.id}" hidden></div></div>`;
	}).join("")}
        </div>
      </main>
      <aside class="friends">
        <section class="agentBox" id="agentBox" aria-live="polite"></section>
        <h2>${l("Amigos")} <small>${e.friends.length || ""}</small></h2>
        ${e.friends.length ? e.friends.map((e) => `
          <div class="friend">${g(e.email)}<div class="fn" title="${f(e.email)}">${f(e.name || h(e.email))}
            <small>${e.shared ? `${n(e.shared, l("vibebook junto"), l("vibebooks juntos"))}` : e.joined ? l("na plataforma") : l("convidado")}</small></div>
            <button class="ghost x" data-unfriend="${f(e.email)}" aria-label="${l("Remover {email} dos amigos", { email: f(e.email) })}" title="${l("Remover dos amigos")}">${C("x")}</button></div>`).join("") : `<p class="muted" style="font-size:14px">${l("Quem você convida para um vibebook vira amigo aqui.")}</p>`}
        <form class="invite" id="addFriend"><input type="email" required placeholder="${l("email do amigo")}" aria-label="${l("Email do amigo")}" /><button>${l("Convidar")}</button></form>
      </aside>
    </div>
  </div>`, ot(e);
}
var tt = matchMedia("(max-width: 720px)");
tt.addEventListener("change", () => {
	location.pathname === "/app" && $e();
});
var nt = C("menu", 22);
function rt(e) {
	let t = [...e.books].sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0) || t.updated_at - e.updated_at), n = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", r = (e) => {
		let t = S.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${ge(t)}">${n}</b>` : "";
	}, i = (e, t, n) => `${e} ${e === 1 ? t : n}`;
	d.innerHTML = `
  <div class="phome">
    <header class="ptop">
      <button class="ghost pbtn" id="pMenu" aria-label="Menu">${nt}${S.length ? `<b class="swWait${ge(S)}">${S.length}</b>` : ""}</button>
      <a class="plogo" href="/"><span class="tile logo">${ve}</span>vibebook</a>
      <button class="me" id="myName" aria-label="${l("Seu perfil")}">${g(e.email)}</button>
    </header>
    <main class="pmain">
      <div id="setupCard"></div>
      ${e.name ? "" : `<form class="nameAsk" id="nameAsk"><b>${l("Como seus amigos te chamam?")}</b><span class="muted">${l("O pessoal e os agents vão te chamar assim.")}</span>
        <div class="row"><input name="n" required maxlength="60" placeholder="${l("Seu nome")}" autocomplete="given-name" /><button class="primary">${l("Salvar")}</button></div></form>`}
      <div class="pgrid">
        ${t.map((e) => `<a class="proom" data-nav href="/b/${e.id}"><span class="tw${e.sandboxes_running ? " cloud" : ""}">${De(e, "xl")}${n(e)}${r(e)}${e.sandboxes_running ? "<b class=\"swCloud\">☁</b>" : ""}</span><span class="nm">${f(e.title)}</span></a>`).join("")}
        <button class="proom" id="new" type="button"><span class="tile xl pnew">${xe}</span><span class="nm">${l("Novo")}</span></button>
      </div>
    </main>
    <form class="pask" id="ask">
      <textarea id="askText" maxlength="2000" placeholder="${l("O que você quer resolver? Eu acho a sala e o épico certos.")}"></textarea>
      <button class="primary" id="askBtn">${l("Achar a sala →")}</button>
      <div class="askOut" id="askOut" aria-live="polite" hidden></div>
    </form>
  </div>
  <dialog class="pdrawer" id="pDrawer">
    <div class="pdHead">${g(e.email)}<div><b>${f(e.name || l("Seu nome"))}</b><small>${f(e.email)}</small></div></div>
    ${it()}
    <section class="waits" id="waits"${S.length ? "" : " hidden"}></section>
    <nav class="pdNav">
      <a data-nav href="/archived">${l("Arquivo")}</a>
      <div class="pdRow"><button class="ghost" id="homeTheme">${w[T()].icon}<span>${w[T()].label}</span></button>${u()}</div>
      <div class="pdBell"><button class="ghost bell" data-bell></button><span>${l("Notificações")}</span></div>
      ${window.PublicKeyCredential ? `<label class="pdLock"><input type="checkbox" id="lockToggle" ${wa() ? "checked" : ""} /> <span>${l("Exigir Face ID ao abrir")}</span></label>` : ""}
    </nav>
    <section class="agentBox" id="agentBox" aria-live="polite"></section>
    <h2>${l("Amigos")} <small>${e.friends.length || ""}</small></h2>
    ${e.friends.map((e) => `<div class="friend">${g(e.email)}<div class="fn">${f(e.name || h(e.email))}<small>${e.shared ? i(e.shared, l("vibebook junto"), l("vibebooks juntos")) : e.joined ? l("na plataforma") : l("convidado")}</small></div>
      <button class="ghost x" data-unfriend="${f(e.email)}" aria-label="${l("Remover {email} dos amigos", { email: f(e.email) })}">${C("x")}</button></div>`).join("")}
    <form class="invite" id="addFriend"><input type="email" required placeholder="${l("email do amigo")}" aria-label="${l("Email do amigo")}" /><button>${l("Convidar")}</button></form>
    <button class="ghost pdOut" id="logout">${l("Sair")}</button>
    <button class="ghost pdOut pdOutAll" id="logoutAll">${l("Sair de todos os aparelhos")}</button>
  </dialog>
  <input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />`;
	let a = document.getElementById("pDrawer");
	document.getElementById("pMenu").onclick = () => a.showModal(), a.onclick = (e) => {
		(e.target === a || e.target.closest("a[data-nav]")) && a.close();
	}, ot(e), document.getElementById("homeTheme").onclick = (e) => {
		Se(w[T()].next), e.currentTarget.innerHTML = `${w[T()].icon}<span>${w[T()].label}</span>`;
	}, document.getElementById("myName").onclick = () => a.showModal(), a.querySelector(".pdHead .avatar").onclick = Cr, a.querySelector(".pdBell span").onclick = () => a.querySelector(".pdBell .bell").click();
	let o = document.getElementById("lockToggle");
	o && (o.onchange = async () => {
		let t = o.checked;
		try {
			await Da(t, e.email), R(l(t ? "Pronto: o vibebook pede Face ID ao abrir neste aparelho." : "Face ID desligado neste aparelho."));
		} catch {
			o.checked = !t, R(l("Não deu pra usar o Face ID aqui."));
		}
	}), a.querySelector(".pdHead b").onclick = async () => {
		let t = prompt(l("Seu nome:"), e.name || "");
		t?.trim() && (await y("/api/me", { name: t }), $e());
	};
}
var it = () => `<section class="logins"><h3>${l("Como você entra")}</h3><div id="loginRows"></div><p class="lgNote">${l("Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.")}</p></section>`;
async function at() {
	let e = document.getElementById("loginRows");
	if (!e) return;
	let t;
	try {
		t = await (await fetch("/api/me/logins")).json();
	} catch {
		return;
	}
	let n = Object.fromEntries((t.logins || []).map((e) => [e.method, e])), r = (e) => e ? l("último {d} · {n}×", {
		d: new Date(e.last).toLocaleDateString(s, {
			day: "numeric",
			month: "short",
			year: "numeric"
		}),
		n: e.n
	}) : null, i = (e, t, n, i) => `<div class="lgRow${n ? " on" : ""}"><span class="lgIc">${e}</span><span><b>${t}</b><small>${r(n) ?? i}</small></span>${n ? `<i class="lgOk">${C("check", 14)}</i>` : ""}</div>`;
	e.innerHTML = [
		i(C("at", 16), l("Código por email"), n.email, l("sempre funciona")),
		t.providers?.google || n.google ? i(qe, "Google", n.google, l("ainda não usou")) : "",
		t.providers?.github || n.github ? i(ce.replace("<svg ", "<svg width=\"16\" height=\"16\" "), "GitHub", n.github, l("ainda não usou")) : "",
		n.invite ? i(C("reply", 16), l("Link de convite"), n.invite) : ""
	].join("");
}
function ot(e) {
	let t = async (e) => {
		e?.trim() && (await y("/api/me", { name: e }), $e());
	}, n = document.getElementById("profileDlg");
	document.getElementById("myName").onclick = () => n ? n.showModal() : null, n && (n.onclick = (e) => {
		(e.target === n || e.target.closest(".pfX")) && n.close();
	}, n.querySelector(".pdHead .avatar").onclick = Cr, n.querySelector(".pdHead b").onclick = () => t(prompt(l("Seu nome:"), e.name || ""))), at(), document.querySelector("[data-pic]")?.addEventListener("click", Cr), document.getElementById("nameAsk")?.addEventListener("submit", (e) => {
		e.preventDefault(), t(e.target.n.value);
	}), document.getElementById("homeTheme").onclick = (e) => {
		Se(w[T()].next), e.currentTarget.innerHTML = w[T()].icon;
	}, document.getElementById("logout").onclick = async () => {
		await fetch("/auth/logout", { method: "POST" }), location.href = "/";
	}, document.getElementById("logoutAll").onclick = async () => {
		confirm(l("Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.")) && (await fetch("/auth/logout-all", { method: "POST" }), location.href = "/login");
	}, document.getElementById("new").onclick = () => lt(), document.querySelectorAll("[data-unfriend]").forEach((e) => e.onclick = async () => {
		confirm(l("Remover {email} dos seus amigos? Os vibebooks em comum continuam.", { email: e.dataset.unfriend })) && (await fetch(`/api/friends/${encodeURIComponent(e.dataset.unfriend)}`, { method: "DELETE" }), $e());
	}), document.getElementById("addFriend").onsubmit = async (e) => {
		e.preventDefault(), await y("/api/friends", { email: e.target[0].value }).catch((e) => alert(e.message)), $e();
	}, mt(), ht(), qt(), st(), document.querySelectorAll("[data-archive]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation(), ut(e.dataset.archive, e.dataset.title);
	});
}
function st() {
	let t = document.getElementById("ask"), n = document.getElementById("askText"), r = document.getElementById("askOut"), i = document.getElementById("askBtn");
	if (!t) return;
	n.oninput = () => {
		n.style.height = "auto", n.style.height = `${n.scrollHeight}px`;
	}, n.onkeydown = (e) => {
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), t.requestSubmit());
	};
	let a = (e) => `<b>${f(e.book_title)}</b>${e.epic_title ? ` → <b>${f(e.epic_title)}</b>` : ""}`, o = async (t) => {
		let i = n.value.trim();
		r.innerHTML = `<div class="why">${l("Enviando…")}</div>`;
		try {
			if (!t.book_id) return await ct(i);
			let n = t.book_id;
			await e(n).postMessage({
				text: i,
				thread: t.epic_id || "main"
			}), At = t.epic_id || null, history.pushState(null, "", `/b/${n}`), Ke();
		} catch (e) {
			r.innerHTML = `<div class="why bad">${f(e.message)}</div>`;
		}
	};
	t.onsubmit = async (e) => {
		e.preventDefault();
		let t = n.value.trim();
		if (!t) return;
		i.disabled = !0, r.hidden = !1, r.innerHTML = `<div class="why">${l("Procurando a sala certa…")}</div>`;
		let s;
		try {
			s = await y("/api/route", { text: t });
		} catch (e) {
			r.innerHTML = `<div class="why">${f(e.message)}</div>`, i.disabled = !1;
			return;
		}
		i.disabled = !1;
		let c = (e) => e.length > 40 ? `${e.slice(0, 38)}…` : e, u = [...[s.pick, ...s.alternatives].filter(Boolean), {
			book_id: null,
			epic_id: null,
			new_title: s.new_room_title
		}], d = 0, p = (e) => e.book_id ? a(e) : l("sala nova <b>“{title}”</b>", { title: f(c(e.new_title)) }), m = () => {
			let e = u[d];
			r.innerHTML = `<div class="where">${e.book_id ? l("Mandar em {where}?", { where: p(e) }) : s.pick ? l("Criar {where}?", { where: p(e) }) : l("Nenhuma sala parece a certa. Criar {where}?", { where: p(e) })}</div>
        ${d === 0 && s.pick && s.reason ? `<div class="why">${f(s.reason)}</div>` : ""}
        <div class="acts">
          <button type="button" class="primary" data-send="chat">${l("Enviar")}</button>
          <button type="button" class="ghost" data-cancel>${l("Cancelar")}</button>
        </div>
        ${u.length > 1 ? `<div class="acts alts"><span class="why">${l("Outro lugar:")}</span>${u.map((e, t) => t === d ? "" : `<button type="button" class="ghost" data-sel="${t}">${p(e)}</button>`).join("")}</div>` : ""}`, r.querySelectorAll("[data-send]").forEach((e) => e.onclick = () => o(u[d])), r.querySelectorAll("[data-sel]").forEach((e) => e.onclick = () => {
				d = Number(e.dataset.sel), m(), r.querySelector("[data-send]")?.focus();
			}), r.querySelector("[data-cancel]").onclick = () => {
				r.hidden = !0, n.focus();
			};
		};
		m(), r.querySelector("[data-send]")?.focus();
	};
}
async function ct(e) {
	let t = await y("/api/books/start", { text: e });
	history.pushState(null, "", `/b/${t.id}`), Ke(), t.unknown?.length && setTimeout(() => R(l("Não achei {who} nos seus amigos: convide pelo email em Pessoas.", { who: f(t.unknown.join(", ")) })), 1500);
}
function lt() {
	let e = document.createElement("dialog");
	e.className = "newRoomDlg", e.innerHTML = `<form method="dialog"><h3>${l("Novo vibebook")}</h3>
    <label for="nrText">${l("O que é e com quem?")}</label>
    <textarea id="nrText" rows="3" placeholder="${l("Ex.: viagem de avião pra SP com os dogs, eu e a Alexia")}"></textarea>
    <p class="muted">${l("Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.")}</p>
    <p class="err" hidden></p>
    <div class="acts"><button type="button" class="ghost" value="no">${l("Cancelar")}</button><button class="primary" value="yes">${l("Criar")}</button></div></form>`, document.body.appendChild(e), e.addEventListener("close", () => e.remove());
	let t = e.querySelector("textarea"), n = e.querySelector("[value=\"yes\"]"), r = e.querySelector(".err");
	e.querySelector("[value=\"no\"]").onclick = () => e.close(), t.onkeydown = (e) => {
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), n.click());
	}, n.onclick = async (i) => {
		i.preventDefault();
		let a = t.value.trim();
		if (!a) return t.focus();
		n.disabled = !0, n.textContent = l("Criando…");
		try {
			await ct(a), e.close();
		} catch (e) {
			r.hidden = !1, r.textContent = e.message, n.disabled = !1, n.textContent = l("Criar");
		}
	}, e.showModal(), t.focus();
}
function ut(e, t) {
	let n = document.createElement("dialog");
	n.innerHTML = `<h3>${l("Arquivar “{title}”?", { title: f(t) })}</h3>
    <p class="muted" style="margin:0 0 6px">${l("Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.")}</p>
    <div class="acts"><button type="button" class="ghost" value="no">${l("Cancelar")}</button><button type="button" class="primary" value="yes">${l("Arquivar")}</button></div>`, document.body.appendChild(n), n.addEventListener("close", () => n.remove()), n.querySelector("[value=\"no\"]").onclick = () => n.close(), n.querySelector("[value=\"yes\"]").onclick = async () => {
		await y(`/api/books/${e}/archive`, { archived: !0 }).catch((e) => alert(e.message)), n.close(), $e();
	}, n.showModal(), n.querySelector("[value=\"yes\"]").focus();
}
async function dt() {
	document.title = `${l("Arquivo")} · vibebook`, pn(null);
	let { books: e } = await y("/api/archived");
	d.innerHTML = `
  <div class="home">
    <header class="top"><div class="brand"><a href="/app" data-nav>vibebook</a></div></header>
    <div class="hello"><div class="helloText"><h1>${l("Arquivo")}</h1><p>${l("Salas que você arquivou. Elas continuam existindo pra quem está nelas.")}</p></div>
      <a class="ghost" data-nav href="/app" style="text-decoration:none">${C("back")} ${l("Voltar")}</a></div>
    <main>${e.length ? `<div class="cards">${e.map((e) => `
      <div class="card" style="cursor:default">
        <div class="cover" style="background-color:${ln(e.title)};filter:grayscale(.6)"><span>${f(N(e.title))}</span></div>
        <div class="info"><b>${f(e.title)}</b><div class="sum">${f(e.summary || "")}</div>
          <div class="meta"><span>${l("arquivada {ago}", { ago: _(e.archived_at) })}</span><span><a data-nav href="/b/${e.id}">${l("abrir")}</a> · <button type="button" class="link" data-restore="${e.id}">${l("Restaurar")}</button></span></div></div>
      </div>`).join("")}</div>` : `<div class="empty">${l("Nada arquivado.")}</div>`}</main>
  </div>`, document.querySelectorAll("[data-restore]").forEach((e) => e.onclick = async () => {
		await y(`/api/books/${e.dataset.restore}/archive`, { archived: !1 }), dt();
	});
}
var ft = 0, pt = 0;
async function mt(e) {
	clearTimeout(ft), pt = e ? pt + 1 : 0;
	let t = document.getElementById("agentBox");
	if (!t) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (n && document.body.contains(t)) {
		if (`${location.origin}`, n.agents.length) {
			let e = Date.now(), r = (e) => e.used_at ?? e.connected_at, i = (t) => e - r(t) > 12096e5, a = {};
			for (let e of n.agents) (a[e.client] ??= []).push(e);
			for (let e of Object.values(a)) e.sort((e, t) => r(t) - r(e));
			let o = (e) => e.used_at ? l("usado {ago}", { ago: _(e.used_at) }) : e.used_at === null ? l("sem uso ainda") : l("uso desconhecido");
			t.innerHTML = `<h2>✦ ${l("Seus agents conectados")}</h2>
      ${Object.entries(a).map(([e, t]) => `<div class="connGroup"><div class="connHead"><b>${f(e)}</b><small>${t.length}</small></div>
        ${t.map((e) => `<label class="conn"><input type="checkbox" data-gid="${f(e.id)}" ${i(e) ? "checked" : ""} /><span>${l("conectado {ago}", { ago: _(e.connected_at) })}<small>${o(e)}</small></span></label>`).join("")}</div>`).join("")}
      <div class="connActs"><button type="button" class="ghost" id="connKeep">${l("Marcar todas menos a mais recente de cada")}</button><button type="button" class="primary" id="connDel"></button></div>
      <p style="margin-top:8px">${l("Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>")}</p>`;
			let s = () => [...t.querySelectorAll("[data-gid]")], c = () => {
				let e = s().filter((e) => e.checked).length, n = t.querySelector("#connDel");
				n.textContent = l("Remover selecionadas ({n})", { n: e }), n.disabled = !e;
			};
			t.addEventListener("change", c), c(), t.querySelector("#connKeep").onclick = () => {
				t.querySelectorAll(".connGroup").forEach((e) => e.querySelectorAll("[data-gid]").forEach((e, t) => e.checked = t > 0)), c();
			}, t.querySelector("#connDel").onclick = async () => {
				let e = s().filter((e) => e.checked).map((e) => e.dataset.gid);
				e.length && confirm(l("Remover {n} conexões? Os agents delas perdem o acesso na hora.", { n: e.length })) && (await fetch("/api/agents/revoke", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ ids: e })
				}), mt());
			};
		} else t.hidden = !0, St(document.getElementById("setupCard"));
	}
}
function ht() {
	let e = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], t = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}`, n = (n, r) => {
		let i = S.indexOf(n);
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${i}">${r ? "" : De(x.find((e) => e.id === n.book_id) || {
			id: n.book_id,
			title: n.room
		}, "sm")}
        <span class="wt"><small>${r ? "" : `${f(n.room)}${n.topic ? " › " : ""}`}${n.topic ? f(n.topic) : r ? l("sala principal") : ""} · ${_(n.ts)}</small>
        ${n.ref.startsWith("t") ? `<b>${l("Tarefa sua esperando OK:")}</b> ${f(n.text)}` : `<b>${f(e(n))}:</b> ${f(n.text.length > 160 ? `${n.text.slice(0, 158)}…` : n.text)}`}</span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${i}" title="${l("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${l("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${C("check")}</button>` : ""}
    </li>`;
	}, r = document.getElementById("waitN");
	r && (r.innerHTML = S.length ? ` · <b class="waitTot">${l("{n} esperando você", { n: S.length })}</b>` : "");
	let i = (n) => {
		let r = S.indexOf(n), i = n.ref.startsWith("t");
		return `<li>
      <a data-nav href="${t(n)}" data-wait-open="${r}"><span class="wIc${i ? " task" : ""}">${i ? C("check", 16) : g(n.author)}</span>
        <span class="wt"><span class="wTx">${f(n.text.length > 200 ? `${n.text.slice(0, 198)}…` : n.text)}</span>
        <small>${i ? l("sua tarefa esperando OK") : l("{who} pediu", { who: f(e(n)) })} · ${n.topic ? f(n.topic) : l("sala principal")} · ${_(n.ts)}</small></span></a>
      ${n.ref.startsWith("m") ? `<button class="ghost" data-wait-done="${r}" title="${l("Já resolvi (respondi em outro lugar, ou não é comigo)")}" aria-label="${l("Já resolvi (respondi em outro lugar, ou não é comigo)")}">${C("check")}</button>` : ""}
    </li>`;
	};
	document.querySelectorAll("[data-cw]").forEach((e) => {
		let t = S.filter((t) => t.book_id === e.dataset.cw);
		e.hidden = !t.length, e.innerHTML = t.length ? `<ul>${t.slice(0, 3).map(i).join("")}</ul>${t.length > 3 ? `<details><summary>${l("+{n} mais", { n: t.length - 3 })}</summary><ul>${t.slice(3).map(i).join("")}</ul></details>` : ""}` : "";
		let n = document.querySelector(`[data-wc="${e.dataset.cw}"]`);
		n && (n.innerHTML = t.length ? `<b class="wChip">${l("{n} esperando você", { n: t.length })}</b>` : "");
	});
	let a = document.getElementById("waits");
	a && (a.hidden = !S.length, a.innerHTML = S.length ? `<h2>${l("Esperando você")} <small>${S.length}</small></h2><ul>${S.map((e) => n(e, !1)).join("")}</ul>` : ""), document.querySelectorAll("[data-wait-done]").forEach((e) => e.onclick = () => {
		let t = S[Number(e.dataset.waitDone)];
		S = S.filter((e) => e !== t), ht(), E(), y("/api/waits/resolve", {
			book_id: t.book_id,
			ref: t.ref
		}).catch(() => {});
	});
}
var gt = !1;
function _t() {
	let e = document.getElementById("inboxBtn");
	if (!e) return;
	let t = S.length, n = e.querySelector(".kN");
	n.hidden = !t, n.textContent = t, n.className = `kN${ge(S)}`;
}
var vt = () => Promise.resolve(a);
function yt() {
	let e = document.getElementById("inbox");
	e || (e = document.createElement("dialog"), e.id = "inbox", e.className = "inbox", document.body.appendChild(e), e.addEventListener("click", (t) => {
		t.target === e && e.close();
	})), vt().then(({ mountInbox: t }) => {
		e._unmount?.(), e.replaceChildren(), e._unmount = t(e, {
			waits: S,
			roomId: k?.id ?? null,
			all: gt,
			vb: {
				t: l,
				icon: C,
				avatar: g,
				ago: _
			},
			ontab: (e) => gt = e,
			onclose: () => e.close(),
			onopen: (t, n) => {
				e.close();
				let r = /^[mab]/.test(t.ref) ? Number(t.ref.slice(1)) : 0;
				k?.id === t.book_id && (n.preventDefault(), r ? mi(r, t.thread) : t.thread !== A && (A = t.thread, L(), X(), $()));
			},
			onresolve: (e) => {
				S = S.filter((t) => t !== e), E(), ht(), k && L(), yt(), y("/api/waits/resolve", {
					book_id: e.book_id,
					ref: e.ref
				}).catch(() => {});
			}
		}), e.open || e.showModal();
	}).catch(() => R(l("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
	e.target.closest?.("#inboxBtn") && yt();
});
var bt = 0, xt = !1;
async function St(e, t) {
	if (clearTimeout(bt), !e) return;
	let n = await fetch("/api/agents").then((e) => e.json()).catch(() => null);
	if (!n || !document.body.contains(e)) return;
	if (xt = !n.agents.length, k && e.id === "agentNudge" && Dn(), n.agents.length) {
		e.dataset.waiting ? (e.innerHTML = `<div class="setup done"><span class="setupIcon">${C("check", 22)}</span><div><b>${l("Seu agent conectou.")}</b><span>${l(t ? "Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo." : "Ele já enxerga as suas salas.")}</span></div></div>`, delete e.dataset.waiting, setTimeout(() => {
			document.body.contains(e) && (e.innerHTML = "", e.hidden = !0);
		}, 6e3), t || mt()) : (e.innerHTML = "", e.hidden = !0);
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
      <div class="setupHead">${r ? `<button class="ghost setupX" data-setupx aria-label="${l("Fechar")}" title="${l("Fechar")}">×</button>` : ""}<span class="setupIcon">✻</span><div><b>${l(t ? "Traga seu agent pra esta sala" : "Conecte seu agent")}</b>
        <span>${l("O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:")}</span></div></div>
      <div class="setupCmd"><code>${f(a)}</code><button class="primary" data-copycmd>${l("Copiar")}</button></div>
      <div class="setupFoot"><span class="wait">${l("esperando seu agent conectar…")}</span>
        <details><summary>${l("Claude.ai ou outro cliente")}</summary>
          <p><b>Claude.ai:</b> ${l("Configurações → Conectores → Adicionar conector personalizado, e cole")} <code data-copy>${f(n)}</code></p>
          <p><b>${l("Claude Code só com o conector:")}</b> <code data-copy>claude mcp add --transport http vibebook ${f(n)}</code></p>
          <p><a href="/connect" target="_blank" rel="noopener">${l("Passo a passo completo →")}</a></p>
        </details></div>
    </div>`;
		let i = e.querySelector("[data-setupx]");
		i && (i.onclick = () => {
			try {
				localStorage.setItem("vb.setupOff", "1");
			} catch {}
			clearTimeout(bt), e.innerHTML = "", e.hidden = !0;
		});
		let o = e.querySelector("[data-copycmd]");
		o.onclick = async () => {
			try {
				await navigator.clipboard.writeText(a), o.textContent = `✓ ${l("Copiado")}`;
			} catch {
				o.textContent = l("Selecione e copie");
			}
			setTimeout(() => o.textContent = l("Copiar"), 2500);
		}, e.querySelectorAll("[data-copy]").forEach((e) => e.onclick = () => {
			navigator.clipboard?.writeText(e.textContent), e.classList.add("copied");
		});
	}
	let o = Number(e.dataset.polls || 0);
	o < 150 && (e.dataset.polls = String(o + 1), bt = setTimeout(() => St(e, t), 4e3));
}
var O = null, Ct = t(), k = null, wt = /* @__PURE__ */ new Map(), A = "main", Tt = [], Et = [], Dt = {
	m4a: "audio/x-m4a",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	aac: "audio/aac",
	ogg: "audio/ogg",
	oga: "audio/ogg",
	opus: "audio/ogg",
	webm: "audio/webm",
	flac: "audio/flac"
}, Ot = [
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
], kt = (e, t) => C(e.type === "text/html" ? "globe" : e.type.startsWith("audio/") ? "mic" : "file", t), At = null, jt = /* @__PURE__ */ new Map(), Mt = !1;
function Nt(e) {
	let t = (x || Ye?.books || []).find((t) => t.id === e), n = t?.title || "";
	document.title = `${n || "vibebook"} · vibebook`;
	let r = Ee(t), i = (e) => r ? `<span class="${e} hasIcon"><img src="${r}" alt=""></span>` : n ? `<span class="${e}" style="background:${ln(n)}">${f(N(n))}</span>` : `<span class="${e}"></span>`, a = (e) => `<div class="thread"><span class="ri sk"></span><i style="width:${e}%"></i></div>`, o = (e, t) => `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${e}px"></i><i class="s" style="width:${t}%"></i></div></div>`;
	return `<div class="book skel ${mn ? "rail" : ""}" aria-busy="true" aria-label="${l("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${i("ri roomIco")}<span class="rt">${f(n)}</span></div>${a(70)}${a(55)}${a(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${l("Seus vibebooks")}">${C("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${i("ri roomIco phOnly")}<span>${f(n)}</span></span></h2></div>
      <div class="msgs">${o(90, 60)}${o(120, 45)}${o(70, 70)}${o(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${l("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${l("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function Pt(e) {
	A = At || new URLSearchParams(location.search).get("t") || "main", At = null, ia = !1, k = null, wt.clear(), Mt = !1, Et = [], y("/api/me").then((e) => {
		Ze(e), Tt = e.friends.map((e) => e.email), x = e.books, S = e.waits || [], E(), L(), k && pn(M());
	}).catch(() => {});
	let t = jt.get(e);
	t ? (k = t, !t.epics.some((e) => e.id === A) && !A.startsWith("pre:") && (A = "main"), Qt()) : d.innerHTML = Nt(e);
	let r = 0, i = "", a = () => {
		O = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${e}?t=${encodeURIComponent(P() ? "main" : A)}${i ? `&rc=${i}` : ""}`), O.onopen = () => {
			setTimeout(() => {
				O?.readyState === 1 && (r = 0);
			}, 15e3);
		}, O.onmessage = (t) => Ht(n(t.data), e), O.onclose = (e) => {
			e.code === 4003 ? (d.innerHTML = `<div class="home"><p>${l("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${C("back")} ${l("seus vibebooks")}</a></div>`, O = null) : !Mt && e.code !== 1e3 ? d.innerHTML = `<div class="home"><p>${l("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${l("voltar")}</a></div>` : (i = String(e.code || ""), setTimeout(() => O && a(), Math.min(3e4, 1e3 * 2 ** r++)));
		};
	};
	a();
}
var j = (e) => i(O, e), Ft = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ new WeakSet();
function Lt(e, t, n, i = !1) {
	let a = Ft.get(e);
	a && (a.target !== t || i) && (a.destroy(), Ft.delete(e), a = null), a ? a.update(n) : (t.replaceChildren(), a = {
		...r(e, t, n),
		target: t
	}, Ft.set(e, a));
}
function Rt() {
	for (let e of Ft.values()) e.target._mo?.disconnect(), e.destroy();
	Ft.clear(), fa.disconnect();
}
var zt = () => ({
	t: l,
	icon: C,
	avatar: g,
	ago: _,
	name: h,
	color: m,
	initials: N,
	mentions: v,
	locale: s
}), Bt = () => ({
	t: l,
	icon: C,
	name: h,
	avatar: g,
	agentAvatar: re,
	ago: _,
	hhmm: Zr,
	continues: Qr,
	remHtml: wi,
	issueHtml: Ci,
	isNotice: Ti,
	noticeHtml: Ei,
	mentions: v,
	md: he,
	linkify: pe,
	esc: f,
	quoteHtml: si,
	attHtml: Yr,
	cardHtml: hi,
	choiceHtml: bi,
	pollHtml: Xr,
	threadCards: ni,
	typingLabel: (e) => Ut[e] ?? e,
	typingNote: (e) => wt.get(e),
	dateTime: (e) => new Date(e).toLocaleString(s),
	waiting: (e) => S.some((t) => t.book_id === k.id && t.ref === `m${e}`)
});
function Vt(e) {
	A = e, kr = e === "main" ? null : e, Q = !1, Ar(), L(), X(), z(), $();
}
function Ht(e, t) {
	if (location.pathname.match(/^\/b\/([a-z0-9]+)/)?.[1] !== t) return;
	let n = k;
	if (e.t === "epicsPatch" && k) {
		let t = /* @__PURE__ */ new Set([...k.epics.map((e) => e.id), ...e.changed.map((e) => e.id)]);
		if (e.order.some((e) => !t.has(e))) {
			O?.close();
			return;
		}
	}
	switch (Ct.get() !== k && Ct.replace(k), k = Ct.apply(e, t), k && jt.set(t, k), e.t) {
		case "state": {
			let e = !n;
			wt.clear(), Mt = !0, na = !1;
			for (let e of [...ra]) e.startsWith(t) && ra.delete(e);
			for (let e of [...xa]) e.startsWith(t) && xa.delete(e);
			jt.delete(t), jt.set(t, k), jt.size > 12 && jt.delete(jt.keys().next().value), k.messages.length && Oe(k.messages.at(-1).id), bn(), e ? Qt() : (L(), X(Z ? void 0 : "stay"), $(!0), Ir(), z(), Xi(), ki(), Yi(), Oi(), ua(), dr());
			return;
		}
		case "closed":
			X("stay");
			return;
		case "moved":
			k.messages.find((t) => t.id === e.id) && (X(!0), ri(), L());
			break;
		case "msg":
			Oe(e.m.id), e.m.thread !== "main" && A === "main" && ri(), e.m.thread === A && (da(e.m), ii(), e.m.files?.length && oa()), L(), e.m.reply_to && e.m.thread !== A && X("stay"), Zt(e.m);
			return;
		case "delta":
			wt.delete(e.id), X(Z ? void 0 : "stay");
			return;
		case "typing":
			e.note ? wt.set(e.id, e.note) : wt.delete(e.id), X("stay");
			return;
		case "epicsPatch":
		case "epics":
			A !== "main" && !P() && !k.epics.some((e) => e.id === A) && (A = "main"), L(), Ir(), z(), ii(), A === "main" && ri();
			return;
		case "docNotes":
			$();
			return;
		case "doc": {
			let t = (e.epic || null) === Sa();
			if (e.stale) {
				t ? j({
					t: "doc.get",
					epic: e.epic
				}) : xa.delete(k.id + e.epic);
				return;
			}
			(t || e.fetched) && $();
			return;
		}
		case "meta":
			if (e.title) {
				let n = x?.find((e) => e.id === t);
				n && (n.title = e.title, E());
			}
			L(), Ir();
			return;
		case "suggestions": {
			let e = P() ? n?.suggestions[Number(A.slice(4))]?.title : void 0;
			if (vn !== null) {
				let e = k.suggestions.length;
				A = e ? `pre:${Math.min(vn, e - 1)}` : "main", vn = null, X();
			} else if (P() && _n()?.title !== e) {
				let t = k.suggestions.findIndex((t) => t.title === e);
				A = t >= 0 ? `pre:${t}` : "main", X();
			}
			L();
			return;
		}
		case "requests":
			L();
			return;
		case "members":
			L();
			return;
		case "files":
			Xi(), Ii(), Ur();
			return;
		case "fileAdd":
			Xi(), Ii(), Ur(), oa();
			return;
		case "reminders":
			Yi();
			return;
		case "decisions":
			Oi();
			return;
		case "conns":
			G = null, document.querySelector(".doc[data-pane=\"apps\"]") && !K ? q() : K || Ni();
			return;
		case "pins":
			L(), Xi(), ki();
			return;
		case "error":
			R(f(e.error || l("falhou")));
			return;
		case "receipts":
			ua();
			return;
		case "older":
			if (na = !1, e.more || (ta[k.id + e.thread] = !0), e.thread === A && (J.n += e.messages.length, X(!ra.delete(k.id + e.thread))), pi && e.thread === A) {
				let t = pi;
				k.messages.some((e) => e.id === t.id) ? (pi = null, setTimeout(() => mi(t.id), 50)) : e.more && ++t.n < 15 ? sa() : (pi = null, R(l("Não achei essa mensagem nesta sala.")));
			}
			return;
		case "acks":
			ua(), L(), dr();
			return;
		case "ackRows":
			ua(), L(), dr();
			return;
		case "poll":
			X("stay");
			return;
		case "online":
			L();
			return;
		case "blocked": {
			let t = document.getElementById("input");
			t && !t.value && (t.value = e.text), alert(l("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: e.reason }));
			return;
		}
	}
}
var Ut = {
	route: l("escolhendo o modelo"),
	fast: l("rápido"),
	smart: l("com calma")
}, Wt = {
	on: C("bell", 20),
	off: C("bellOff", 20)
}, Gt = () => "Notification" in window ? Notification.permission : "unsupported", Kt = () => {
	try {
		return localStorage.getItem("vb.mute") === "1";
	} catch {
		return !1;
	}
};
function qt() {
	let e = Gt(), t = Kt(), n = e === "granted" ? t ? "muted" : "on" : e, r = {
		on: l("Notificações ligadas: clique pra silenciar"),
		muted: l("Notificações silenciadas: clique pra ligar"),
		default: l("Ativar notificações de mensagem"),
		denied: l("Notificações bloqueadas no navegador"),
		unsupported: l("Este navegador não tem notificações")
	}[n];
	document.querySelectorAll("[data-bell]").forEach((e) => {
		e.className = `ghost bell ${n}`, e.innerHTML = n === "on" ? Wt.on : Wt.off, e.title = r, e.setAttribute("aria-label", r), e.onclick = async () => {
			if (Yt(), n === "default") {
				if (await Notification.requestPermission(), Gt() === "granted") {
					try {
						localStorage.removeItem("vb.mute");
					} catch {}
					Xt();
				}
			} else if (n === "denied") alert(l("As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página."));
			else if (n === "on" || n === "muted") {
				try {
					localStorage.setItem("vb.mute", n === "on" ? "1" : "");
				} catch {}
				n === "muted" && Xt();
			}
			qt();
		};
	});
}
var Jt = null, Yt = () => {
	try {
		Jt ??= new AudioContext(), Jt.resume();
	} catch {}
};
document.addEventListener("pointerdown", Yt, { once: !0 });
function Xt() {
	if (!Jt) return;
	let e = Jt.currentTime;
	[[880, 0], [1318.5, .12]].forEach(([t, n]) => {
		let r = Jt.createOscillator(), i = Jt.createGain();
		r.type = "sine", r.frequency.value = t, i.gain.setValueAtTime(0, e + n), i.gain.linearRampToValueAtTime(.18, e + n + .02), i.gain.exponentialRampToValueAtTime(.001, e + n + .5), r.connect(i).connect(Jt.destination), r.start(e + n), r.stop(e + n + .55);
	});
}
function Zt(e) {
	let t = e.kind === "agent" || e.author === "ai";
	if (e.author === k.me && !t || e.quiet || Kt()) return;
	let n = e.text && [...e.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu)].some((e) => se(e[1]) === k.me);
	if ((!t || e.author === k.me || n || e.for_who === k.me || k.messages.find((t) => t.id === e.reply_to)?.author === k.me) && (document.hidden || e.thread !== A || n) && (Xt(), Gt() === "granted" && document.hidden)) {
		let t = e.author === "ai" ? "@vibe" : e.kind === "agent" ? l("{via} de {who}", {
			via: e.via || "agent",
			who: h(e.author)
		}) : h(e.author), r = new Notification(`${n ? `${l("Te mencionaram")} · ` : ""}${t} · ${k.book?.title ?? "vibebook"}`, {
			body: (e.text || (e.author === "ai" ? l("respondendo…") : `📎 ${l("anexo")}`)).slice(0, 180),
			tag: `vb-${k.id}`,
			icon: "/apple-touch-icon.png"
		});
		r.onclick = () => {
			window.focus(), r.close();
		};
	}
}
function Qt() {
	Rt(), document.title = `${k.book?.title ?? "vibebook"} · vibebook`, d.innerHTML = `
  <div class="book ${mn ? "rail" : ""}">
    <aside class="side" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${l("Seus vibebooks")}" title="${l("Seus vibebooks")}">${C("back", 20)}</a><h2 id="threadTitle"></h2><button class="ghost" id="toggleBoard" title="${l("Quadro de tarefas (kanban)")}" aria-pressed="false">${C("board")}<span class="lbl">${l("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${l("Caixa de entrada: o que espera por você")}" aria-label="${l("Caixa de entrada")}">${C("inbox")}<b class="kN" hidden></b></button><button class="ghost bell" data-bell></button><button class="ghost" id="myClaude" aria-pressed="false" hidden>✻ <span class="lbl">Agent</span></button><button class="ghost" id="toggleDoc" title="${l("mostrar/ocultar documento")}">${C("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek" role="toolbar" aria-label="${l("Documento e arquivos da sala")}"><div class="peekRow"><button type="button" class="peekDoc" data-pane="doc" id="peekTxt" aria-label="${l("Abrir documento")}"></button><button type="button" data-pane="files" title="${l("Arquivos")}" aria-label="${l("Arquivos")}">${C("paperclip", 18)}<small id="peekFiles"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${C("chart", 18)}</button><button type="button" data-pane="decisions" title="${l("Decisões")}" aria-label="${l("Decisões")}">${C("check", 18)}</button><button type="button" data-pane="reminders" title="${l("Lembretes")}" aria-label="${l("Lembretes")}">${C("clock", 18)}<small id="peekRem"></small></button><button type="button" class="peekAgents" data-pane="agents" title="Agents" aria-label="Agents">${be}<i class="qDot"></i><small class="qN"></small></button></div><i class="grab"></i></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div class="agentNudge" id="agentNudge" hidden></div><div class="claudeBar" id="claudeBar" hidden></div><div class="askBar" id="askBar" hidden></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <form class="composer" id="composer">
        <div class="tray" id="tray"></div>
        <div class="replyBar" id="replyBar" hidden></div>
        <div class="mentionPop" id="mentionPop" role="listbox" aria-label="${l("Mencionar")}" hidden></div>
        <div class="row">
          <button type="button" class="ghost icon emojiBtn" id="emojiBtn" title="${l("Emoji")}" aria-label="${l("Emoji")}" aria-haspopup="dialog" aria-expanded="false">🙂</button>
          <div class="mentionPop emojiPop" id="emojiPop" role="dialog" aria-label="${l("Emoji")}" hidden><input type="search" id="emojiQ" placeholder="${l("Buscar emoji…")}" autocomplete="off"><div class="eGrid" id="emojiGrid"></div></div>
          <button type="button" class="ghost icon" id="plusBtn" title="${l("Anexar, mencionar, votação")}" aria-label="${l("Mais opções")}" aria-haspopup="menu" aria-expanded="false">${C("plus", 18)}</button>
          <div class="mentionPop plusMenu" id="plusMenu" role="menu" hidden>
            <button type="button" role="menuitem" id="attach">${C("paperclip")} ${l("Anexar arquivo")} <small>${l("ou Cmd+V")}</small></button>
            <button type="button" role="menuitem" id="mentionBtn">${C("at")} ${l("Mencionar alguém")} <small>@</small></button>
            <button type="button" role="menuitem" id="pollBtn">${C("chart")} ${l("Criar votação")}</button>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac" multiple hidden />
          <textarea id="input" rows="1" placeholder="${l("Mensagem…")}"></textarea><button class="primary" id="sendBtn">${l("Enviar")}</button>
        </div>
      </form>
    </main>
    <section class="doc">
      <button type="button" class="docEditBar" id="docEditBar"></button>
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${l("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${l("Redimensionar documento")}" tabindex="0"></div>
      <header><div class="ptabs" role="tablist"><button type="button" class="ptDoc" data-pane="doc">${C("doc", 16)} Doc</button><button type="button" class="ptBoard" data-pane="board" title="${l("Quadro de tarefas")}" aria-label="${l("Quadro de tarefas")}">${C("board", 17)}<b class="kN" hidden></b></button><button type="button" data-pane="files" title="${l("Arquivos")}" aria-label="${l("Arquivos")}">${C("paperclip", 17)}<small id="fileCount"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${C("chart", 17)}<small id="appCount"></small></button><button type="button" data-pane="decisions" title="${l("Decisões")}" aria-label="${l("Decisões")}">${C("check", 17)}<small id="decCount"></small></button><button type="button" data-pane="reminders" title="${l("Lembretes")}" aria-label="${l("Lembretes")}">${C("clock", 17)}<small id="remCount"></small></button><button type="button" class="ptAgents" data-pane="agents" title="Agents" aria-label="Agents">${be}<i class="qDot"></i><small class="qN"></small></button></div><div class="seg" role="group" aria-label="${l("Modo do documento")}"><button type="button" data-view="preview">${l("Ver")}</button><button type="button" data-view="edit">${l("Editar")}</button></div></header>
      <div class="docCrumb" id="docCrumb" hidden></div>
      <div class="preview" id="preview"></div>
      <textarea id="doc" placeholder="${l("O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.")}"></textarea>
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
    <h3>${l("Nova votação")}</h3>
    <form id="pollForm">
      <input name="q" required maxlength="300" placeholder="${l("Pergunta (ex.: Qual cruzeiro?)")}" />
      <div id="pollOpts" style="display:grid;gap:8px"></div>
      <button type="button" class="link" id="addOpt" style="justify-self:start">+ ${l("opção")}</button>
      <label style="display:flex;gap:8px;align-items:center;font-size:14px"><input type="checkbox" name="multi" /> ${l("cada pessoa pode escolher várias")}</label>
      <div class="acts"><button type="button" id="pollCancel">${l("Cancelar")}</button><button class="primary">${l("Criar votação")}</button></div>
    </form>
  </dialog>`;
	let t = d.querySelector(".book"), n = new ResizeObserver(() => {
		let e = t.querySelector(".chathead").getBoundingClientRect().height, n = document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
		document.documentElement.style.setProperty("--headH", `${Math.round(e)}px`), document.documentElement.style.setProperty("--peekH", `${Math.round(n)}px`);
	});
	n.observe(t.querySelector(".chathead")), n.observe(document.getElementById("docPeek")), Fr(document.getElementById("docPeek"), "doc", !0, (e) => {
		let n = e.target.closest("[data-pane]")?.dataset.pane || "doc";
		if (t.dataset.sheet === "doc" && t.dataset.pane === n) return H();
		t.classList.contains("boardview") && document.getElementById("toggleBoard").click(), y(n), V("doc");
	}), Fr(document.getElementById("docGrab"), "doc", !1), document.getElementById("sheetDim").onclick = () => H(), document.getElementById("toggleDoc").onclick = () => t.classList.toggle("nodoc");
	let r = (e) => {
		t.classList.toggle("boardview", e), t.classList.toggle("nodoc", e), document.getElementById("toggleBoard").setAttribute("aria-pressed", String(e)), e && (H(), z());
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
		let e = document.getElementById("emojiBtn"), t = document.getElementById("emojiPop"), n = document.getElementById("emojiQ"), r = document.getElementById("emojiGrid"), i = [...new Map(Object.entries(de).map(([e, t]) => [t, e])).entries()], a = () => {
			let e = n.value.trim().toLowerCase().replace(/:/g, "");
			r.innerHTML = i.filter(([t, n]) => !e || Object.entries(de).some(([n, r]) => r === t && n.includes(e))).map(([e, t]) => `<button type="button" title=":${f(t)}:" data-emoji="${e}">${e}</button>`).join("");
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
	let s = document.getElementById("mentionPop"), c = [], u = 0, p = -1, m = () => {
		s.hidden = !0, c = [], p = -1;
	}, ee = (e) => {
		let t = c[e];
		if (!t) return;
		let n = o.selectionStart;
		o.value = `${o.value.slice(0, p)}@${t.handle} ${o.value.slice(n)}`;
		let r = p + t.handle.length + 2;
		o.setSelectionRange(r, r), m(), o.focus(), o.oninput();
	}, te = () => {
		s.innerHTML = c.map((e, t) => `<button type="button" role="option" class="${t === u ? "sel" : ""}" data-i="${t}">${g(e.email)}<b>@${f(e.handle)}</b><small>${f(e.label)}</small></button>`).join(""), s.hidden = !c.length;
	};
	s.onmousedown = (e) => {
		let t = e.target.closest("[data-i]");
		t && (e.preventDefault(), ee(Number(t.dataset.i)));
	};
	let ne = () => {
		let e = o.value.slice(0, o.selectionStart), t = e.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
		if (!t) return m();
		p = e.length - t[2].length - 1;
		let n = ie(t[2]), r = [...(k.members || []).filter((e) => e !== k.me).map((e) => ({
			email: e,
			handle: oe(e),
			label: h(e) === oe(e) ? e : h(e)
		}))];
		if (F.id === k.id) for (let e of F.sandboxes || []) e.email === k.me && r.push({
			email: e.email,
			handle: e.name,
			label: l("seu agent no sandbox")
		});
		c = r.filter((e) => !n || e.handle.startsWith(n) || ie(e.label).includes(n)).slice(0, 8), u = 0, te();
	};
	o.oninput = () => {
		o.style.height = "auto", o.style.height = `${o.scrollHeight}px`, ne();
	}, o.onblur = () => setTimeout(m, 100), o.onkeydown = (e) => {
		if (!s.hidden && c.length) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") return e.preventDefault(), u = (u + (e.key === "ArrowDown" ? 1 : c.length - 1)) % c.length, te();
			if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) return e.preventDefault(), ee(u);
			if (e.key === "Escape") return e.preventDefault(), m();
		}
		e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), document.getElementById("composer").requestSubmit());
	};
	let re = document.getElementById("tray"), _ = document.getElementById("sendBtn");
	_.addEventListener("touchend", (e) => {
		_.disabled || (e.preventDefault(), document.getElementById("composer").requestSubmit());
	}), _.addEventListener("mousedown", (e) => e.preventDefault());
	let ae = () => {
		re.innerHTML = Et.map((e, t) => `<div class="pend ${!e.meta && !e.error ? "up" : ""} ${e.error ? "err" : ""}" title="${f(e.error || e.file.name)}">
      ${e.url ? `<img src="${e.url}" alt="">` : `${C("file", 22)}<br>${f(e.file.name.slice(0, 18))}`}${e.error ? `<span style="position:relative;z-index:1">${f(e.error)}</span>` : ""}
      <button type="button" class="rm" data-rm="${t}" aria-label="${l("Remover anexo")}">${C("x")}</button></div>`).join(""), re.querySelectorAll("[data-rm]").forEach((e) => e.onclick = () => {
			let [t] = Et.splice(Number(e.dataset.rm), 1);
			t?.url && URL.revokeObjectURL(t.url), ae();
		});
		let e = Et.some((e) => !e.meta && !e.error);
		_.disabled = e, _.textContent = l(e ? "Enviando…" : "Enviar");
	}, se = (t) => {
		for (let n of t) {
			!n.type && /\.html?$/i.test(n.name) && (n = new File([n], n.name, { type: "text/html" })), !n.type && /\.md$/i.test(n.name) && (n = new File([n], n.name, { type: "text/markdown" }));
			let t = {
				txt: "text/plain",
				csv: "text/csv"
			}[(/\.(\w+)$/.exec(n.name)?.[1] || "").toLowerCase()];
			t && n.type !== t && (n = new File([n], n.name, { type: t }));
			let r = Dt[(/\.(\w+)$/.exec(n.name)?.[1] || "").toLowerCase()];
			if (r && !n.type.startsWith("audio/") && (n = new File([n], n.name, { type: r })), !Ot.includes(n.type)) {
				alert(`${n.name}: ${l("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}`);
				continue;
			}
			let i = n.type.startsWith("audio/");
			if (n.size > (i ? 50 : 10) * 1024 * 1024) {
				alert(`${n.name}: ${l(i ? "áudio maior que 50MB." : "maior que 10MB.")}`);
				continue;
			}
			n.name && n.name !== "image.png" || (n = new File([n], `print-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png`, { type: n.type }));
			let a = {
				file: n,
				url: n.type.startsWith("image/") ? URL.createObjectURL(n) : null
			};
			Et.push(a), e(k.id).uploadFile({
				name: n.name,
				type: n.type,
				body: n
			}).then((e) => {
				a.meta = e;
			}).catch((e) => {
				a.error = e.message || l("sem conexão");
			}).finally(ae);
		}
		ae();
	}, v = document.getElementById("fileInput"), ce = document.getElementById("plusBtn"), le = document.getElementById("plusMenu"), ue = (e = le.hidden) => {
		le.hidden = !e, ce.setAttribute("aria-expanded", String(e));
	};
	ce.onclick = (e) => {
		e.stopPropagation(), ue();
	}, ce.onmousedown = ce.onpointerdown = (e) => {
		document.activeElement?.id === "input" && e.preventDefault();
	}, le.onclick = () => ue(!1), le.closest("main").addEventListener("click", (e) => {
		!le.hidden && !le.contains(e.target) && ue(!1);
	}), le.onkeydown = (e) => {
		e.key === "Escape" && (ue(!1), ce.focus());
	}, document.getElementById("mentionBtn").onclick = () => {
		let e = o.selectionStart ?? o.value.length, t = o.value.slice(0, e), n = t && !/\s$/.test(t) ? " @" : "@";
		o.value = t + n + o.value.slice(e), o.focus(), o.setSelectionRange(e + n.length, e + n.length), setTimeout(() => o.oninput(), 120);
	}, document.getElementById("attach").onclick = () => v.click(), v.onchange = () => {
		se([...v.files]), v.value = "";
	}, document.onpaste = (e) => {
		let t = e.target, n = t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName));
		if (!o.isConnected || n && t !== o) return;
		let r = [...e.clipboardData?.files ?? []];
		r.length || (r = [...e.clipboardData?.items ?? []].filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter(Boolean)), r.length && (e.preventDefault(), se(r), o.focus());
	};
	let fe = d.querySelector(".chat");
	fe.addEventListener("dragover", (e) => {
		[...e.dataTransfer.types].includes("Files") && (e.preventDefault(), fe.classList.add("drop"));
	}), fe.addEventListener("dragleave", (e) => {
		fe.contains(e.relatedTarget) || fe.classList.remove("drop");
	}), fe.addEventListener("drop", (e) => {
		e.preventDefault(), fe.classList.remove("drop"), se([...e.dataTransfer.files]);
	}), document.getElementById("composer").onsubmit = (e) => {
		if (e.preventDefault(), Et.some((e) => !e.meta && !e.error)) return;
		let t = o.value.trim(), n = Et.filter((e) => e.meta).map((e) => e.meta.id);
		(t || n.length) && (j({
			t: "msg",
			thread: A,
			text: t,
			files: n,
			reply_to: U?.id
		}), U = null, ci(), Et.forEach((e) => e.url && URL.revokeObjectURL(e.url)), Et = [], o.value = "", o.oninput(), ae());
	};
	let pe = document.getElementById("pollDlg"), me = document.getElementById("pollOpts"), he = (e = "") => {
		me.insertAdjacentHTML("beforeend", `<input name="opt" maxlength="200" placeholder="${l("Opção {n}", { n: me.children.length + 1 })}" value="${f(e)}" />`);
	};
	document.getElementById("pollBtn").onclick = () => {
		document.getElementById("pollForm").reset(), me.innerHTML = "", he(), he(), he(), pe.showModal();
	}, document.getElementById("addOpt").onclick = () => {
		me.children.length < 10 && he(), me.lastElementChild.focus();
	}, document.getElementById("pollCancel").onclick = () => pe.close(), document.getElementById("pollForm").onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = [...t.querySelectorAll("[name=\"opt\"]")].map((e) => e.value.trim()).filter(Boolean);
		if (n.length < 2) return alert(l("Coloque pelo menos 2 opções."));
		j({
			t: "poll.create",
			thread: A,
			question: t.q.value,
			options: n,
			multi: t.multi.checked
		}), pe.close();
	}, document.getElementById("msgs").addEventListener("click", (e) => {
		let t = e.target.closest("[data-vote]");
		if (t) return j({
			t: "vote",
			id: t.closest("[data-poll]").dataset.poll,
			opt: Number(t.dataset.vote)
		});
		let n = e.target.closest("[data-close]");
		n && confirm(l("Encerrar a votação?")) && j({
			t: "poll.close",
			id: n.dataset.close
		});
	});
	let y = (e) => {
		if (d.querySelector(".doc").dataset.pane = e, d.querySelector(".book").dataset.pane = e, d.querySelectorAll(".ptabs button").forEach((t) => {
			t.classList.toggle("sel", t.dataset.pane === e), t.setAttribute("aria-selected", t.dataset.pane === e);
		}), e === "files" && (k.filesAll || j({ t: "files.get" }), Xi()), e === "decisions" && Oi(), e === "apps" && ki(), e === "reminders" && Yi(), e === "agents" && (Dn(), Bn()), e === "board") {
			let e = document.getElementById("kanban"), t = d.querySelector(".doc");
			e.parentElement !== t && t.append(e), z();
		}
	};
	d.querySelectorAll(".ptabs button").forEach((e) => e.onclick = () => y(e.dataset.pane)), document.removeEventListener("click", Pn), document.removeEventListener("vb:pane", Fn), Pn = (e) => {
		e.target.closest?.("[data-sbx-open]") && document.body.contains(t) && (H(), document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), B.matches && V("doc"));
	}, Fn = (e) => {
		document.body.contains(t) && (t.classList.remove("nodoc"), y(e.detail));
	}, document.addEventListener("click", Pn), document.addEventListener("vb:pane", Fn), y("doc");
	let b = document.getElementById("doc"), x;
	b.oninput = () => {
		clearTimeout(x), x = setTimeout(() => {
			let e = Sa();
			e ? k.docs[e] = b.value : k.doc = b.value, j({
				t: "doc",
				text: b.value,
				epic: e || void 0
			});
		}, 400);
	}, b.onblur = () => $();
	let S = d.querySelector(".doc");
	function ge(e) {
		let t = document.getElementById("docEditBar");
		t && (t.innerHTML = e === "edit" ? `${C("check", 16)} ${l("Pronto")}` : `${C("pencil", 16)} ${l("Editar")}`);
	}
	document.getElementById("docEditBar").onclick = () => _e(S.dataset.view === "edit" ? "preview" : "edit");
	let _e = (e) => {
		S.dataset.view = e, ge(e), S.querySelectorAll(".seg button").forEach((t) => t.classList.toggle("sel", t.dataset.view === e));
		try {
			localStorage.setItem("vb.docView", e);
		} catch {}
		e === "edit" ? (on(), (tn || b).focus()) : (on(), $());
	};
	S.querySelectorAll(".seg button").forEach((e) => e.onclick = () => _e(e.dataset.view));
	let ve = "preview";
	try {
		ve = localStorage.getItem("vb.docView") || "preview";
	} catch {}
	if (S.dataset.view = ve, ge(ve), S.querySelectorAll(".seg button").forEach((e) => e.classList.toggle("sel", e.dataset.view === ve)), L(), X(), $(!0), Xi(), ki(), Yi(), Oi(), St(document.getElementById("agentNudge"), k.id), qt(), en(), /^#m\d+$/.test(location.hash)) setTimeout(() => mi(Number(location.hash.slice(2))), 300);
	else if (/^#f[0-9a-f]+$/.test(location.hash)) {
		let e = location.hash.slice(2);
		history.replaceState(null, "", location.pathname + location.search), setTimeout(() => $t(e), 300);
	}
}
function $t(e, t) {
	let n = (k.files || []).find((t) => t.id === e) || Y().flatMap((e) => e.files || []).find((t) => t.id === e);
	if (!n && !t && !k.filesAll) return j({ t: "files.get" }), setTimeout(() => $t(e, !0), 800);
	Vr(`/api/books/${k.id}/files/${e}`, n?.type?.startsWith("image/") ? "img" : "frame", n?.name || l("arquivo"));
}
function en() {
	let e = `vb.welcomed.${k.me}`;
	try {
		if (!k.book?.owner || k.me === k.book.owner || localStorage.getItem(e)) return;
		localStorage.setItem(e, "1");
	} catch {
		return;
	}
	let t = h(k.book.owner), n = [
		[
			C("hand", 24),
			l("Bem-vindo a <b>{room}</b>", { room: f(k.book.title || l("esta sala")) }),
			l("{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.", { owner: f(t) })
		],
		[
			"✻",
			l("Cada um traz o seu agent"),
			l("Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.")
		],
		[
			C("paperclip", 24),
			l("O contexto é de todo mundo"),
			l("Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.")
		],
		[
			C("arrowRight", 24),
			l("Conecte o seu agent"),
			""
		]
	], r = document.createElement("dialog");
	r.className = "welcome", document.body.appendChild(r);
	let i = 0, a = () => {
		r.close(), r.remove(), St(document.getElementById("agentNudge"), k.id);
	}, o = () => {
		let [e, t, s] = n[i], c = i === n.length - 1;
		r.innerHTML = `<div class="wIco">${e}</div><h3>${t}</h3>${s ? `<p>${s}</p>` : `<p>${l("Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.")}</p><div id="wConnect"></div>`}
      <div class="wFoot"><span class="wDots">${n.map((e, t) => `<i class="${t === i ? "on" : ""}"></i>`).join("")}</span>
        ${i ? `<button type="button" class="ghost" data-w="-1">${l("Voltar")}</button>` : `<button type="button" class="ghost" data-w="skip">${l("Pular")}</button>`}
        <button type="button" class="primary" data-w="1">${l(c ? "Entrar na sala" : "Próximo")}</button></div>`, r.querySelectorAll("[data-w]").forEach((e) => e.onclick = () => {
			let t = e.dataset.w;
			if (t === "skip" || t === "1" && c) return a();
			i += Number(t), o();
		}), c && St(r.querySelector("#wConnect"), k.id).then(() => {
			let e = r.querySelector("#wConnect");
			e && e.hidden && (e.hidden = !1, e.innerHTML = `<div class="setup done"><span class="setupIcon">${C("check", 22)}</span><div><b>${l("Seu agent já está conectado.")}</b><span>${l("Ligue ele nesta sala com ✻ Ligar agent, no topo.")}</span></div></div>`);
		}), r.querySelector(".wFoot .primary").focus();
	};
	r.addEventListener("cancel", (e) => {
		e.preventDefault(), a();
	}), o(), r.showModal();
}
var tn = null, nn = null, rn = null, an = 0;
function on() {
	let e = d.querySelector(".doc"), t = document.getElementById("cm"), n = Sa(), r = e?.dataset.view === "edit" && k?.id && !P() ? n ? `${k.id}~${n}` : k.id : null;
	if (r === nn) return;
	tn?.destroy(), tn = null, nn = r, e?.classList.remove("collab"), t && (t.innerHTML = "");
	let i = ++an;
	r && t && (rn ??= import(
		/* @vite-ignore */
		"/collab.js"
)).then((a) => {
		i === an && (tn?.destroy(), t.innerHTML = "", tn = a.mountCollab(t, {
			room: r,
			name: h(k.me),
			color: m(k.me),
			onText: (e) => {
				i === an && (n ? k.docs[n] = e : k.doc = e);
			},
			onStatus: (t) => {
				i === an && (e.classList.toggle("collab", t === "connected"), t !== "connected" && $(!0));
			}
		}));
	}).catch(() => {
		rn = null;
	});
}
var sn = C("sidebar", 20), M = () => k?.book?.title || "vibebook", cn = [
	"oklch(0.5 0.17 248)",
	"oklch(0.58 0.17 35)",
	"oklch(0.52 0.11 175)",
	"oklch(0.47 0.15 315)",
	"oklch(0.6 0.13 75)",
	"oklch(0.45 0.1 145)",
	"oklch(0.36 0.06 255)",
	"oklch(0.55 0.16 10)"
], ln = (e) => cn[[...String(e)].reduce((e, t) => e * 31 + t.charCodeAt(0) >>> 0, 7) % cn.length], un = /* @__PURE__ */ new Set([
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
]), N = (e) => {
	let t = e.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/).filter(Boolean), n = t.filter((e) => !un.has(e.toLowerCase()));
	return ((n.length ? n : t).slice(0, 2).map((e) => e[0]).join("") || "◆").toUpperCase();
}, dn = (e) => {
	let t = Ee(x?.find((e) => e.id === k?.id));
	return e ? t ? `<span class="${e} hasIcon"><img src="${t}" alt=""></span>` : `<span class="${e}" style="background:${ln(M())}">${f(N(M()))}</span>` : t ? `<img src="${t}" alt="">` : f(N(M()));
};
async function fn(e, t) {
	let n = URL.createObjectURL(e);
	try {
		let e = await new Promise((e, t) => {
			let r = new Image();
			r.onload = () => e(r), r.onerror = () => t(Error(l("Não consegui ler essa imagem."))), r.src = n;
		}), r = document.createElement("canvas");
		r.width = r.height = t;
		let i = Math.min(t / e.naturalWidth, t / e.naturalHeight), a = e.naturalWidth * i, o = e.naturalHeight * i;
		return r.getContext("2d").drawImage(e, (t - a) / 2, (t - o) / 2, a, o), await new Promise((e) => r.toBlob(e, "image/png"));
	} finally {
		URL.revokeObjectURL(n);
	}
}
async function pn(e) {
	let t = document.querySelector("link[rel=\"icon\"]");
	if (!e) {
		t.type = "image/svg+xml", t.href = "/favicon.svg";
		return;
	}
	let n = Ee(x?.find((e) => e.id === k?.id));
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
	i.fillStyle = ln(e), i.beginPath(), i.roundRect(0, 0, 64, 64, 14), i.fill();
	let a = i.createRadialGradient(56, 8, 0, 56, 8, 44);
	a.addColorStop(0, "rgba(255,255,255,.28)"), a.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = a, i.fill();
	let o = N(e);
	i.fillStyle = "#fff", i.textAlign = "center", i.textBaseline = "middle", i.font = `400 ${o.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`, i.fillText(o, 32, 35), t.type = "image/png", t.href = r.toDataURL("image/png");
}
var mn = !1;
function hn() {
	mn = !mn;
	try {
		localStorage.setItem("vb.rail", mn ? "1" : "0");
	} catch {}
	d.querySelector(".book")?.classList.toggle("rail", mn), L();
}
function gn(e) {
	e.innerHTML = `
    <button class="iconBtn" id="railToggle" title="${l("Abrir menu")}" aria-label="${l("Abrir menu")}" aria-expanded="false">${sn}</button>
    <a data-nav href="/app" class="iconBtn" title="${l("Seus vibebooks")}" aria-label="${l("Seus vibebooks")}" style="text-decoration:none">${C("back", 20)}</a>
    <div class="railSep"></div>
    <div class="railList">
      <button class="rb geral ${A === "main" ? "sel" : ""} ${Ee(x?.find((e) => e.id === k.id)) ? "hasIcon" : ""}" style="background:${ln(M())}" data-thread="main" title="${f(M())}" aria-label="${f(M())}">${dn("")}</button>
      ${k.epics.filter((e) => !e.archived || e.id === A).map((e) => {
		let t = e.tasks.filter((e) => e.done).length, n = e.tasks.length ? 100 * t / e.tasks.length : 0;
		return `
        <button class="rb ${A === e.id ? "sel" : ""} ${fr(e.id).length ? "waiting" : ""}" data-thread="${e.id}" title="${f(e.title)} · ${t}/${e.tasks.length}" aria-label="${f(e.title)}" style="background:${m(e.title)}">
          ${e.owner ? `<span class="rbOwner">${hr(e.owner)}</span>` : f(N(e.title))}${e.tasks.length ? `<span class="ring" style="--p:${n}%"></span>` : ""}</button>`;
	}).join("")}
      <button class="rb add" id="railAdd" title="${l("Novo épico")}" aria-label="${l("Novo épico")}">${C("plus", 18)}</button>
    </div>
    <div class="railPeople">${(k.requests || []).length ? `<button class="rb askBadge" id="railAsks" title="${l("{n} pedindo pra entrar", { n: k.requests.length })}" aria-label="${l("{n} pedindo pra entrar", { n: k.requests.length })}">+${k.requests.length}</button>` : ""}${k.members.slice(0, 8).map((e) => g(e, k.online.includes(e))).join("")}</div>`, e.querySelector("#railToggle").onclick = hn, e.querySelector("#railAsks")?.addEventListener("click", hn), e.querySelector("#railAdd").onclick = () => {
		hn(), document.querySelector("#newEpic input")?.focus();
	}, e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		A = e.dataset.thread, Q = !1, kr = A === "main" || P() ? null : A, L(), X(), z(), $();
	});
}
var P = () => A.startsWith("pre:"), _n = () => P() ? k.suggestions[Number(A.slice(4))] : null, vn = null;
function yn(e) {
	let t = _n();
	if (!t) return A = "main", X();
	e.innerHTML = `<div class="preCard">
    <p class="kicker">✦ ${l("O @vibe sugere um épico")}</p>
    <h3>${f(t.title)}</h3>
    <p class="${t.why ? "" : "muted"}">${f(t.why || l("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."))}</p>
    ${t.tasks.length ? `<h4>${l("Tarefas propostas")}</h4><ul>${t.tasks.map((e) => `<li>${f(e)}</li>`).join("")}</ul>` : ""}
    <div class="row"><button class="primary" id="preAccept">${l("Pedir pro meu agent")}</button><button class="ghost" id="preSkip">${l("Descartar")}</button></div>
    <p class="muted">${l("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")}</p>
  </div>`;
	let n = Number(A.slice(4));
	e.querySelector("#preAccept").onclick = () => {
		j({
			t: "suggestion",
			i: n,
			accept: !0
		}), A = "main", X();
	}, e.querySelector("#preSkip").onclick = () => {
		vn = n, j({
			t: "suggestion",
			i: n
		});
	};
}
var F = {
	id: null,
	list: []
};
async function bn() {
	if (!k?.id) return;
	let e = await y(`/api/books/${k.id}/agents`).catch(() => null);
	e && (F = {
		id: k.id,
		list: e.agents,
		claudeOn: e.claude_on,
		sandboxes: e.sandboxes || []
	}, Dn(), L());
}
var xn = "http://127.0.0.1:47321", Sn = null, Cn = () => Sn && Date.now() - Sn.at < 2e4 ? Promise.resolve(Sn.rooms) : fetch(`${xn}/ping`).then((e) => e.json()).then((e) => (Sn = {
	at: Date.now(),
	rooms: e.rooms
}).rooms).catch(() => (Sn = {
	at: Date.now(),
	rooms: null
}).rooms), wn = {}, Tn = (e, t) => {
	let n = wn[e];
	return n && Date.now() - n.at < 2e4 ? Promise.resolve(n.w) : fetch(`${xn}/where?room=${e}&title=${encodeURIComponent(t || "")}`).then((e) => e.ok ? e.json() : null).catch(() => null).then((t) => (wn[e] = {
		at: Date.now(),
		w: t
	}).w);
}, En = {
	used: l("a pasta onde ele já abriu antes"),
	linked: l("ligada a esta sala pelo arquivo .vibebook"),
	slug: l("a pasta com o nome da sala"),
	new: l("pasta nova com o nome da sala, criada ao ligar")
};
function Dn() {
	let e = document.getElementById("myClaude");
	if (e && F.id !== k?.id) {
		let e = document.getElementById("claudeBar");
		e && (e.hidden = !0);
	}
	if (!e || F.id !== k?.id) return;
	let t = !!F.claudeOn, n = F.list.some((e) => e.email === k.me && e.listening);
	e.hidden = !1, e.setAttribute("aria-pressed", String(t));
	let r = wn[k.id]?.w, i = r?.folder ? r.folder.startsWith(r.home + "/") ? "~" + r.folder.slice(r.home.length) : r.folder : "";
	e.innerHTML = `✻ <span class="lbl">${l(t ? n ? "ouvindo" : "não ouvindo" : "Ligar agent")}</span>${i ? `<span class="where">${f(i.replace(/^~\/Projects\//, ""))}${r.how === "new" ? ` ${C("plus", 12)}` : ""}</span>` : ""}`, wn[k.id] || Tn(k.id, M()).then((e) => e && Dn()), e.title = (i ? `${l("Abre em {path} ({how}).", {
		path: i,
		how: En[r.how] || l("pasta da sala")
	})}\n\n` : "") + l(t && !n ? "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar." : t ? "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada)." : "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina."), $n(t, n || F.list.some((e) => e.email === k.me && Date.now() - e.seen_at < 18e5)), e.onclick = () => document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" })), kn(t, n, i, r);
}
async function On() {
	let e = !F.claudeOn;
	F.claudeOn = e, e && (Jn[k.id] = Date.now()), Dn(), await y(`/api/books/${k.id}/claude`, { on: e }).catch(() => {
		F.claudeOn = !e, Dn();
	});
}
function kn(e, t, n, r) {
	let i = document.getElementById("agentsPane");
	if (!i) return;
	let a = F.list.filter((e) => e.email === k.me), o = Ln(), s = t || a.some((e) => Date.now() - e.seen_at < 18e5);
	if (document.querySelectorAll(".peekAgents, .ptAgents").forEach((e) => {
		let t = o.find((e) => e.st === "blocked");
		e.dataset.q = t ? "blocked" : o.length ? "busy" : s ? "idle" : "", e.querySelector(".qN").textContent = o.length ? String(o.length) : "", e.title = t ? l("Seu agent espera você no terminal") : o.length ? l("Fila do seu agent: {n}", { n: o.length }) : s ? l("Seu agent está livre") : "Agents";
	}), document.getElementById("docPeek")?.classList.toggle("agLive", t), !document.querySelector(".doc[data-pane=\"agents\"]")) {
		i.innerHTML = "";
		return;
	}
	i.innerHTML = `<h4>${l("Seus agents nesta sala")}</h4>
    <div class="agCard${e ? " on" : ""}"><span class="agIcon">✻</span><div><b>${l("Claude Code no seu computador")}</b>
      <small>${e ? t ? l("ligado · ouvindo esta sala") : a.some((e) => Date.now() - e.seen_at < 18e5) ? l("ligado · trabalhando agora") : l("ligado · ainda não está ouvindo") : l("desligado")}${n ? ` · ${f(n.replace(/^~\/Projects\//, ""))}${r?.how === "new" ? ` (${l("pasta nova")})` : ""}` : ""}</small></div>
      <button type="button" class="ghost agGo" id="agGo" hidden title="${l("Ir pro seu agent desta sala no herdr")}" aria-label="${l("Ir pro seu agent no herdr")}">${C("external", 16)}</button>
      <label class="agSwitch"><input type="checkbox" id="agToggle" ${e ? "checked" : ""} /><i></i></label></div>
    <p class="agNote">${l("Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.")}</p>
    <div class="agConn"><b>${l("Conectar seu agente")}</b><small>${l("Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.")}</small><code>${f(Zn())}</code><button type="button" class="primary" id="agConnCopy">${l("Copiar prompt")}</button></div>
    <h4>${l("Fila do seu agent")} <small>${o.length || ""}</small></h4>
    ${o.length ? `<div class="queue${Nn ? " open" : ""}">${o.map((e) => {
		let t = k.epics.find((t) => t.id === e.m.thread), n = t ? gr(t) : dn("ri"), r = e.st === "blocked" ? l("espera você no terminal") : e.st === "doing" ? l("fazendo") : l("na fila");
		return `<div class="qRow"><button type="button" class="qGo" data-goto="${e.m.id}" title="${f(t ? t.title : l("sala principal"))} · ${_(e.m.ts)}">${g(k.me)}${n}<span class="qTx">${f(e.m.text.replace(/\s+/g, " ").slice(0, 120))}</span><i class="qS ${e.st}" title="${r}"></i></button><button type="button" class="qX" data-dismiss="${e.m.id}" title="${l("Tirar da fila (já resolvido)")}" aria-label="${l("Tirar da fila (já resolvido)")}">${C("x")}</button></div>`;
	}).join("")}${o.length > 4 ? `<button type="button" class="qMore" id="qMore">${Nn ? l("mostrar menos") : l("mostrar mais {n}", { n: o.length - 4 })}</button>` : ""}</div>` : `<p class="agNote">${l("Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.")}</p>`}
    ${a.length ? `<h4>${l("Conectados")}</h4><div class="agList">${ar(k.me)}</div>` : ""}
    <h4>${l("Na nuvem")}</h4><div id="sbx">${Vn()}</div>`, document.getElementById("agToggle").onchange = On, document.getElementById("agConnCopy").onclick = Qn;
	let c = document.getElementById("agGo");
	e && Cn().then((e) => {
		c.isConnected && (c.hidden = !e?.includes(k.id));
	}), c.onclick = () => fetch(`${xn}/focus?room=${k.id}`).then((e) => e.json()).then((e) => e.error && R(f(e.error))).catch(() => R(l("O vibebook herdr não está rodando nesta máquina."))), i.querySelectorAll("[data-goto]").forEach((e) => e.onclick = () => {
		B.matches && H(), mi(Number(e.dataset.goto));
	}), i.querySelectorAll("[data-dismiss]").forEach((e) => e.onclick = () => j({
		t: "ack.dismiss",
		id: Number(e.dataset.dismiss)
	})), document.getElementById("qMore")?.addEventListener("click", () => {
		Nn = !Nn, Dn();
	}), Hn();
}
var An = (e) => ((e.run_s || 0) / 3600 + (e.state === "running" && e.checked_at ? (Date.now() - e.checked_at) / 36e5 : 0)) * (e.rate || 0) + (Date.now() - e.created_at) / 36e5 * (e.disk_rate || 0), jn = (e) => `US$${e < 10 ? e.toFixed(2) : Math.round(e)}`.replace(".", o === "en" ? "." : ",");
function Mn() {
	return F.id !== k?.id || !F.sandboxes?.length ? "" : F.sandboxes.map((e) => `<button type="button" class="member sbxRow ${f(e.state || "")}" data-sbx-open title="${f(e.name)} · ${l("de {who}", { who: f(h(e.email)) })}">
    <span class="sbxIco">☁</span><span class="fnCol"><span class="fn">${f(e.name)}</span><small>${f(h(e.email).split(" ")[0])} · ${l(zn[e.state] || e.state || "?")}</small></span><span class="money">${jn(An(e))}</span></button>`).join("");
}
var Nn = !1, Pn = () => {}, Fn = () => {}, In = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || "");
function Ln() {
	let e = Date.now() - 1728e5, t = /* @__PURE__ */ new Map();
	for (let e of k.acks || []) e.email === k.me && (t.get(e.msg_id) ?? t.set(e.msg_id, []).get(e.msg_id)).push(e);
	let n = k.messages ? Y() : [];
	return n.filter((t) => t.author === k.me && !t.kind && t.text && t.ts > e && !n.some((e) => e.id === t.reply_to && In(e))).map((e) => {
		let n = t.get(e.id) || [];
		return {
			m: e,
			st: n.some((e) => e.status === "done" || e.status === "idle" || e.status === "dismissed") ? null : n.some((e) => e.status === "blocked") ? "blocked" : n.some((e) => e.status === "doing") ? "doing" : "queued"
		};
	}).filter((e) => e.st);
}
var I = {
	id: null,
	connected: null,
	list: [],
	busy: "",
	err: ""
}, Rn = 0, zn = {
	running: "rodando",
	starting: "ligando",
	pausing: "pausando",
	paused: "pausado",
	stopped: "parado",
	deleted: "apagado no freestyle",
	unknown: "?"
};
async function Bn() {
	if (!k?.id) return;
	clearTimeout(Rn);
	let e = await fetch(`/api/books/${k.id}/sandboxes`).then((e) => e.json()).catch(() => null);
	if (!e || e.error) return;
	I = {
		...I,
		id: k.id,
		connected: e.connected,
		claude: e.claude,
		list: e.sandboxes
	};
	let t = document.getElementById("sbx");
	t && (t.innerHTML = Vn(), Hn()), e.sandboxes.some((e) => !e.ready || e.state !== "running" && /ing$/.test(e.state)) && document.querySelector(".doc[data-pane=\"agents\"]") && (Rn = setTimeout(Bn, 5e3));
}
function Vn() {
	if (I.id !== k?.id || I.connected === null) return `<p class="agNote">${l("carregando…")}</p>`;
	let e = I.err ? `<p class="agErr">${f(I.err)}</p>` : "";
	return I.connected ? `${I.claude ? `<div class="fsOn">${C("check", 13)} ${l("Claude conectado: sandboxes novos já sobem logados")} · <button type="button" class="ghost" id="ctOff">${l("remover")}</button></div>` : `<div class="agCard col"><b>${l("Conecte sua conta do Claude")}</b><small>${l("No seu terminal, rode:")}</small><div class="cpCmd"><code>claude setup-token</code><button type="button" class="ghost" data-cp="claude setup-token">${l("Copiar")}</button></div><small>${l("Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.")}</small>
      <form id="ctForm" class="fsForm"><input type="password" name="token" autocomplete="off" placeholder="sk-ant-…" required /><button class="primary" ${I.busy ? "disabled" : ""}>${I.busy === "ct" ? l("Salvando…") : l("Salvar")}</button></form>${I.errAt === "ct" && I.err ? `<p class="agErr">${f(I.err)}</p>` : ""}</div>`}${I.list.map((e) => `<div class="sbxCard ${e.state}"><div class="sbxTop"><span class="agIcon">☁</span><div><b>${f(e.name)}</b>
      <small>${!e.ready && e.state === "running" ? l("preparando (uns 3 min)…") : l(zn[e.state] || e.state)}${e.rate ? ` · ${jn(e.rate)}/h` : ""}${e.error ? ` · ${f(e.error)}` : ""}</small>${I.logs?.[e.id] ? `<pre class="sbxLog">${f(I.logs[e.id])}</pre>` : !e.ready && e.log ? `<code class="sbxLog">${f(e.log)}</code>` : ""}</div><span class="money" title="${l("gasto até agora na sua conta do freestyle")}">${jn(e.cost || 0)}</span></div>
      <div class="sbxActs">${e.state === "deleted" ? "" : `<button class="primary" data-sbx-term="${f(e.id)}">${l("Terminal")}</button>`}
      ${e.state === "running" ? `<button class="ghost" data-sbx-act="pause" data-id="${f(e.id)}">${l("Pausar")}</button>` : e.state === "paused" || e.state === "stopped" ? `<button class="ghost" data-sbx-act="start" data-id="${f(e.id)}">${l("Retomar")}</button>` : ""}
      ${!e.ready && e.state === "running" ? `<button class="ghost" data-sbx-setup="${f(e.id)}" title="${l("Rodar o setup de novo")}" ${I.busy ? "disabled" : ""}>${I.busy === "setup:" + e.id ? l("Rodando setup… (até 4 min)") : l("Refazer setup")}</button>` : ""}
      <button class="ghost del" data-sbx-del="${f(e.id)}" aria-label="${l("Apagar sandbox")}" title="${l("Apagar sandbox")}">${C("trash", 16)}</button></div></div>`).join("")}
    <button class="agNew on" id="sbxNew" ${I.busy ? "disabled" : ""}>${C("plus", 16)} ${I.busy === "new" ? l("Criando…") : l("Criar sandbox")}<small>${l("Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.")}</small></button>${I.errAt === "ct" ? "" : e}
    <div class="fsOn">${C("check", 13)} ${l("freestyle.sh conectado")} · <button type="button" class="ghost" id="fsOff">${l("desconectar")}</button></div>` : `<div class="agCard col"><b>${l("Conecte sua conta do freestyle.sh")}</b>
    <small>${l("O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:")}</small><div class="cpCmd"><code>npx freestyle@latest tokens create vibebook</code><button type="button" class="ghost" data-cp="npx freestyle@latest tokens create vibebook">${l("Copiar")}</button></div><small>${l("Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.")}</small>
    <form id="fsForm" class="fsForm"><input type="password" name="key" autocomplete="off" placeholder="${l("API key do freestyle")}" required /><button class="primary" ${I.busy ? "disabled" : ""}>${I.busy === "key" ? l("Conferindo…") : l("Conectar")}</button></form>${e}</div>`;
}
function Hn() {
	let e = () => {
		let e = document.getElementById("sbx");
		e && (e.innerHTML = Vn(), Hn());
	}, t = async (t, n) => {
		I.busy = t, I.errAt = t, I.err = "", e();
		try {
			let e = await n();
			e?.error && (I.err = e.error);
		} catch {
			I.err = l("sem conexão");
		}
		I.busy = "", await Bn(), e();
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
	}), document.getElementById("ctOff")?.addEventListener("click", () => confirm(l("Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.")) && t("ct", () => n("DELETE", "/api/claude-token"))), document.getElementById("fsOff")?.addEventListener("click", () => confirm(l("Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.")) && t("off", () => n("DELETE", "/api/freestyle"))), document.getElementById("sbxNew")?.addEventListener("click", () => t("new", () => n("POST", `/api/books/${k.id}/sandboxes`, {}))), document.querySelectorAll("[data-sbx-setup]").forEach((e) => e.onclick = () => t(`setup:${e.dataset.sbxSetup}`, async () => {
		let t = await n("POST", `/api/sandboxes/${e.dataset.sbxSetup}/setup`);
		return I.logs = {
			...I.logs,
			[e.dataset.sbxSetup]: t.log || t.error || ""
		}, t;
	})), document.querySelectorAll("[data-sbx-act]").forEach((e) => e.onclick = () => t("act", () => n("POST", `/api/sandboxes/${e.dataset.id}/${e.dataset.sbxAct}`))), document.querySelectorAll("[data-sbx-del]").forEach((e) => e.onclick = () => confirm(l("Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.")) && t("del", () => n("DELETE", `/api/sandboxes/${e.dataset.sbxDel}`))), document.querySelectorAll("[data-sbx-term]").forEach((e) => e.onclick = () => qn(e.dataset.sbxTerm, I.list.find((t) => t.id === e.dataset.sbxTerm)?.name));
}
var Un = "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0", Wn = "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js", Gn = {
	Esc: "\x1B",
	Tab: "	",
	"Ctrl-C": "",
	"↑": "\x1B[A",
	"↓": "\x1B[B",
	"←": "\x1B[D",
	"→": "\x1B[C",
	"/": "/"
}, Kn = (e) => new Promise((t, n) => {
	let r = Object.assign(document.createElement("script"), {
		src: e,
		onload: t,
		onerror: n
	});
	document.head.append(r);
});
async function qn(e, t) {
	window.Terminal || (document.head.append(Object.assign(document.createElement("link"), {
		rel: "stylesheet",
		href: `${Un}/css/xterm.css`
	})), await Kn(`${Un}/lib/xterm.js`), await Kn(Wn));
	let n = document.createElement("dialog");
	n.className = "termDlg", n.innerHTML = `<header><b>☁ ${f(t || "sandbox")}</b><span id="termSt">${l("conectando…")}</span><button class="ghost" data-close aria-label="${l("Fechar")}">${C("x")}</button></header><div class="termBox" id="termBox"></div>
    <div class="termKeys">${Object.keys(Gn).map((e) => `<button type="button" data-k="${f(e)}">${f(e)}</button>`).join("")}</div>`, document.body.append(n), n.showModal();
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
	let u = await fetch(`/api/sandboxes/${e}/terminal`, { method: "POST" }).then((e) => e.json()).catch(() => ({ error: l("sem conexão") }));
	if (u.error) {
		a.textContent = u.error;
		return;
	}
	let d = btoa(String.fromCharCode(...new TextEncoder().encode(u.token))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	o = new WebSocket(`${u.url}&cols=${r.cols}&rows=${r.rows}`, ["freestyle-pty", `freestyle-identity.${d}`]), o.binaryType = "arraybuffer";
	let p = new TextEncoder();
	o.onmessage = (e) => {
		if (typeof e.data != "string") return r.write(new Uint8Array(e.data));
		try {
			let t = JSON.parse(e.data);
			t.type === "sessionInfo" ? a.textContent = l("conectado") : t.type === "exited" ? a.textContent = l("terminou") : t.type === "error" && (a.textContent = t.message);
		} catch {}
	}, o.onclose = () => {
		s || (a.textContent = l("desconectado: feche e abra de novo"));
	}, r.onData((e) => o.readyState === 1 && o.send(p.encode(e))), new ResizeObserver(() => {
		i.fit(), o.readyState === 1 && o.send(JSON.stringify({
			type: "resize",
			cols: r.cols,
			rows: r.rows
		}));
	}).observe(n.querySelector("#termBox")), n.querySelectorAll("[data-k]").forEach((e) => e.onclick = () => {
		o.readyState === 1 && o.send(p.encode(Gn[e.dataset.k])), r.focus();
	}), r.focus();
}
var Jn = {}, Yn = 0, Xn = {}, Zn = () => `Read ${location.origin}/llms.txt and set up vibebook for this project. Room: ${location.origin}/b/${k.id}`;
function Qn() {
	let e = Zn();
	(navigator.clipboard?.writeText(e) ?? Promise.reject()).then(() => R(l("Copiado. Cole no Claude Code, dentro da pasta do projeto.")), () => window.prompt(l("Copie e cole no seu Claude Code:"), e));
}
function $n(e, t) {
	let n = document.getElementById("claudeBar");
	if (!n) return;
	clearTimeout(Yn);
	let r = document.getElementById("agentNudge"), i = "vb.claudeBar.off", a = !1;
	try {
		a = localStorage.getItem(i) === "off";
	} catch {}
	let o = `<button class="ghost" data-x aria-label="${l("Fechar")}" title="${l("Fechar")}">×</button>`, s = (e, t) => {
		n.className = `claudeBar ${e}`, n.innerHTML = t, n.hidden = !1;
		let r = n.querySelector("[data-x]");
		r && (r.onclick = () => {
			try {
				localStorage.setItem(i, "off");
			} catch {}
			n.hidden = !0, clearTimeout(Yn);
		});
	}, c = !1;
	try {
		c = localStorage.getItem(`vb.start.${k.id}`) === "off";
	} catch {}
	if (k.book?.owner === k.me && !k.epics.length && A === "main" && !c) return er(n, e, t, `vb.start.${k.id}`);
	if (xt || r && !r.hidden || t && !Xn[k.id] || a && !Jn[k.id]) n.hidden = !0;
	else if (t) Xn[k.id] = !1, s("ok", `<span class="star">✻</span><span><b>${l("Seu agent está ouvindo esta sala.")}</b></span>`), setTimeout(() => n.hidden = !0, 5e3);
	else if (e) {
		Xn[k.id] = !0;
		let e = Date.now() - (Jn[k.id] || 0) > 18e4;
		s("wait", `<span class="star">✻</span><span><b>${l(e ? "Seu agent ainda não está ouvindo." : "Abrindo seu agent no seu computador…")}</b><small>${l(e ? "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá." : "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.")}</small></span>${o}`), e || (Yn = setTimeout(Dn, 18e4 - (Date.now() - (Jn[k.id] || 0)) + 500));
	} else Xn[k.id] = !1, s("", `<span class="star">✻</span><span><b>${l("Seu agent não está nesta sala.")}</b><small>${l("Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.")}</small></span><button class="primary" data-conn>${l("Conectar seu agente")}</button><button class="ghost" data-on>${l("Ligar agent")}</button>${o}`), n.querySelector("[data-on]").onclick = () => document.getElementById("myClaude")?.click(), n.querySelector("[data-conn]").onclick = Qn;
}
function er(e, t, n, r) {
	let i = (k.members || []).filter((e) => e !== k.me), a = (e, t) => `<li class="${e}"><i>${e === "ok" ? "✓" : e === "wait" ? "✻" : "○"}</i><span>${t}</span></li>`, o = xt ? a("todo", l("Conecte seu agent (o card acima diz como)")) : n ? a("ok", l("Seu agent está aqui")) : t ? a("wait", l("Abrindo seu agent no seu computador…")) : a("todo", `${l("Seu agent está desligado nesta sala")} <button class="linkish" data-on>${l("Ligar")}</button>`);
	e.className = "claudeBar start", e.hidden = !1, e.innerHTML = `<span class="star">✻</span><span><b>${l("Começando a sala")}</b><ul>
    ${a("ok", l("Sala criada"))}
    ${i.length ? a("ok", l("Na sala: {who}", { who: f(i.map(h).join(", ")) })) : a("todo", l("Só você aqui: convide em Pessoas"))}
    ${o}
    ${a(n ? "wait" : "todo", l("O agent escreve o doc e cria os épicos"))}
  </ul></span><button class="ghost" data-x aria-label="${l("Fechar")}" title="${l("Fechar")}">×</button>`, e.querySelector("[data-on]")?.addEventListener("click", () => document.getElementById("myClaude")?.click()), e.querySelector("[data-x]").onclick = () => {
		try {
			localStorage.setItem(r, "off");
		} catch {}
		e.hidden = !0, clearTimeout(Yn);
	};
}
var tr = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`, nr = (e) => Math.min(100, Math.round(e.tokens / e.window * 100)), rr = (e) => {
	let t = nr(e), n = (e, t = 60, n = 80) => `<i class="ctx ${e >= n ? "hot" : e >= t ? "mid" : ""}" style="--p:${e}%"></i>`, r = (e, t, r) => `<div><div class="l"><b>${e}</b><span>${r}</span></div>${n(t)}</div>`, i = ["five_hour", "seven_day"].map((t) => {
		let n = e.limits?.[t];
		if (!n || n.r * 1e3 < Date.now()) return "";
		let i = /* @__PURE__ */ new Date(n.r * 1e3), a = i.toLocaleTimeString(s, {
			hour: "2-digit",
			minute: "2-digit"
		}), o = t === "five_hour" ? a : `${i.toLocaleDateString(s, { weekday: "short" }).replace(".", "")} ${a}`;
		return r(l(t === "five_hour" ? "Sessão de 5h" : "Semana"), n.p, l("{p}% · reseta {at}", {
			p: n.p,
			at: o
		}));
	});
	return `<div class="ctip">${r(l("Contexto"), t, `${t}% · ${tr(e.tokens)}/${tr(e.window)}`)}${i.join("")}</div>`;
}, ir = (e) => {
	if (!e) return "";
	let t = nr(e);
	return `<i class="ctx ${t >= 80 ? "hot" : t >= 60 ? "mid" : ""}" style="--p:${t}%"></i>`;
}, ar = (e) => {
	if (F.id !== k?.id) return "";
	let t = /* @__PURE__ */ new Set();
	return F.list.filter((t) => t.email === e).sort((e, t) => t.listening - e.listening).filter((e) => !t.has(la(e.who) + e.repo) && t.add(la(e.who) + e.repo)).slice(0, 3).map((t) => `<div class="member agentRow" title="${l("{via} de {who}", {
		via: f(la(t.who)),
		who: f(h(e))
	})}${t.repo ? ` ${l("em {repo}", { repo: f(t.repo) })}` : ""} · ${t.listening ? t.all_rooms ? l("ouvindo todas as salas agora") : l("ouvindo esta sala agora") : l("visto há {ago}", { ago: _(t.seen_at) })}"><span class="aglyph ${ne(t.who)[0]} ${t.listening ? "on" : ""}">${ne(t.who)[1]}</span><span class="fn">${f(la(t.who).replace(/^Claude\s+/i, ""))}${t.repo ? ` · ${f(t.repo)}` : ""}</span><small>${t.listening ? l("ouvindo") : _(t.seen_at)}${t.context ? ` · ${nr(t.context)}%` : ""}</small>${ir(t.context)}${t.context ? rr(t.context) : ""}</div>`).join("");
}, or = (e) => {
	if (!e || e.archived > 0) return null;
	let t = new Set((k.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg)), n = new Set(Y().filter((n) => n.thread === e.id && !t.has(n.id)).map((e) => e.id));
	n.add(e.from_msg);
	let r = (k.acks || []).filter((e) => n.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts), i = r.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5);
	if (i) return {
		who: i.who,
		email: i.email
	};
	if (r[0]?.status === "done") return null;
	let a = k.messages.findLast((t) => t.thread === e.id && t.kind === "agent");
	return a && a.tag !== "done" && Date.now() - a.ts < 18e4 ? {
		who: a.via || "Agent",
		email: a.author
	} : null;
}, sr = () => {
	let e = new Set(Y().filter((e) => e.thread === "main").map((e) => e.id)), t = new Set((k.epics || []).map((e) => e.from_msg)), n = (k.acks || []).filter((n) => e.has(n.msg_id) && !t.has(n.msg_id) && n.status !== "dismissed").sort((e, t) => t.ts - e.ts), r = n.find((e) => e.status === "doing" && Date.now() - e.ts < 12e5 && n.find((t) => t.msg_id === e.msg_id && t.who === e.who) === e);
	return r ? {
		who: r.who,
		email: r.email
	} : null;
}, cr = (e) => {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let i = `${r.who}|${r.email}`;
		r.status === "doing" && Date.now() - r.ts < 12e5 && !t.has(i) && e.find((e) => e.msg_id === r.msg_id && e.who === r.who && e.email === r.email) === r && (t.add(i), n.push({
			who: r.who,
			email: r.email
		}));
	}
	return n;
}, lr = () => {
	if (P()) return [];
	let e = A === "main" ? null : k.epics.find((e) => e.id === A), t;
	if (e) {
		if (e.archived > 0) return [];
		let n = new Set((k.epics || []).filter((t) => t.id !== e.id).map((e) => e.from_msg));
		t = new Set(Y().filter((t) => t.thread === e.id && !n.has(t.id)).map((e) => e.id)), t.add(e.from_msg);
	} else {
		let e = new Set((k.epics || []).map((e) => e.from_msg));
		t = new Set(Y().filter((t) => t.thread === "main" && !e.has(t.id)).map((e) => e.id));
	}
	let n = cr((k.acks || []).filter((e) => t.has(e.msg_id) && e.status !== "dismissed").sort((e, t) => t.ts - e.ts));
	if (n.length) return n;
	let r = e ? or(e) : sr();
	return r ? [r] : [];
}, ur = (e) => {
	let t = or(e);
	return t ? l("{via} de {who}", {
		via: t.who,
		who: h(t.email)
	}) : null;
};
function dr() {
	let e = document.getElementById("msgs");
	if (!e || !k) return;
	e.querySelector("#working")?.remove();
	let t = lr();
	if (e.querySelector(".empty")?.classList.toggle("hidden", !!t.length), !t.length) return;
	let n = (e) => `<b>${l("{via} de {who}", {
		via: f(e.who),
		who: f(h(e.email))
	})}</b>`;
	e.insertAdjacentHTML("beforeend", `<div id="working" class="working"><span class="wAv">${t.slice(0, 4).map((e) => re(e.email, e.who)).join("")}</span><div>${t.length === 1 ? `${n(t[0])} ${l("está trabalhando nisso")}` : `${t.map(n).join(", ")} ${l("estão trabalhando nisso")}`}<small>${l("O andamento e a entrega aparecem aqui nesta thread.")}</small></div><span class="spin">✻</span></div>`);
}
var fr = (e) => S.filter((t) => t.book_id === k?.id && (e === void 0 || t.thread === e)), pr = (e) => {
	let t = fr(e), n = t.length;
	return n ? `<b class="wN${ge(t)}" title="${n === 1 ? l("Alguém está esperando você aqui") : l("{n} coisas esperando você aqui", { n })}">${n}</b>` : "";
}, mr = (e) => e.prod ? e.prod.stage === "verified" ? `<span class="prodMark ok" title="${f(l("Verificado em prod") + (e.prod.note ? `: ${e.prod.note}` : ""))}">✓✓</span>` : `<span class="prodMark" title="${l("No ar, falta verificar em prod")}">🚀</span>` : "", hr = (e) => {
	let t = k?.avatars?.[e] ?? te[e];
	return t ? `<img src="/api/avatar/${encodeURIComponent(e)}?v=${t}" alt="" loading="lazy" />` : f(h(e).slice(0, 2).toUpperCase());
}, gr = (e, t) => e.owner ? `<span class="ri epOwner" style="background:${m(e.owner)}" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" ` : ""}title="${f(l("Dono: {who}", { who: h(e.owner) }))}${t ? ` · ${l("clique pra trocar")}` : ""}">${hr(e.owner)}</span>` : `<span class="ri" style="background:${m(e.title)};color:#fff" ${t ? `data-epowner="${e.id}" role="button" tabindex="0" title="${l("Sem dono · clique pra escolher")}"` : ""}>${f(N(e.title))}</span>`;
function _r(e, t) {
	document.getElementById("ownMenu")?.remove();
	let n = k.epics.find((e) => e.id === t);
	if (!n) return;
	let r = document.createElement("div");
	r.id = "ownMenu", r.className = "ownMenu", r.setAttribute("role", "menu"), r.innerHTML = `<p>${l("Dono do épico")}</p>${k.members.map((e) => `<button type="button" role="menuitemradio" aria-checked="${n.owner === e}" data-own="${f(e)}">${g(e)}<span>${f(h(e))}</span>${n.owner === e ? C("check", 14) : ""}</button>`).join("")}<button type="button" role="menuitemradio" aria-checked="${!n.owner}" data-own=""><span class="avatar none">–</span><span>${l("Sem dono")}</span>${n.owner ? "" : C("check", 14)}</button>`, document.body.append(r);
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
		j({
			t: "epic.owner",
			id: t,
			owner: e.dataset.own
		}), a();
	}), r.querySelector("button")?.focus();
}
var vr = (e) => {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}, yr = !1;
function br() {
	let e = k.pins || [];
	return `<div class="sec pinsSec"><h4>${l("Fixados")}${yr ? "" : `<button type="button" class="ghost pinPlus" id="pinPlus" title="${l("Fixar um link")}" aria-label="${l("Fixar um link")}">${C("plus", 14)}</button>`}</h4>
      ${e.map((e) => {
		let t, n = "", r = e.title, i = "", a;
		if (e.kind === "link") t = e.ref, n = "target=\"_blank\" rel=\"noopener\"", i = vr(e.ref), r ||= i, a = `<span class="ri pinIco" style="background:${m(i)}">${f(i[0]?.toUpperCase() || "↗")}</span>`;
		else if (e.kind === "app") {
			let o = e.ref.includes("/") ? `#app:${e.ref}` : `#app:room/${e.ref}`;
			t = f(o), n = `data-cardgo="${f(o)}"`, r ||= e.ref.split("/").pop(), i = e.ref.includes("/") ? "app" : l("app da sala"), a = `<span class="ri pinIco app">${C("grid", 14)}</span>`;
		} else {
			let o = (k.files || []).find((t) => t.id === e.ref);
			if (!o) return "";
			t = Lr(o), n = `target="_blank" rel="noopener" ${Rr(o)}`, r ||= o.name, i = l("arquivo"), a = `<span class="ri pinIco app">${C("file", 14)}</span>`;
		}
		return `<div class="pinRow"><a class="thread pin" href="${f(t)}" ${n} title="${f(r)}${e.kind === "link" ? ` · ${f(e.ref)}` : ""}">${a}<span class="rt">${f(r)}<small>${f(i)}</small></span></a><button type="button" class="ghost x" data-unpin="${f(e.id)}" title="${l("Desafixar")}" aria-label="${l("Desafixar {name}", { name: f(r) })}">${C("x", 14)}</button></div>`;
	}).join("")}
      ${yr ? `<form id="pinForm" class="pinForm"><input name="url" required placeholder="${l("Cole um link (site, repo, painel…)")}" aria-label="${l("Link pra fixar")}" enterkeyhint="done" /><input name="title" maxlength="80" placeholder="${l("Nome (opcional)")}" aria-label="${l("Nome")}" /><div class="row"><button type="button" class="ghost" id="pinCancel">${l("Cancelar")}</button><button class="primary">${l("Fixar")}</button></div></form>` : e.length ? "" : `<button type="button" class="pinEmpty" id="pinEmpty">${C("pin", 14)}<span>${l("Fixar site, repo ou app")}</span></button>`}
    </div>`;
}
function xr(e) {
	let t = () => {
		yr = !0, L(), document.querySelector("#pinForm [name=url]")?.focus();
	}, n = e.querySelector("#pinPlus");
	n && (n.onclick = t);
	let r = e.querySelector("#pinEmpty");
	r && (r.onclick = t);
	let i = e.querySelector("#pinCancel");
	i && (i.onclick = () => {
		yr = !1, L();
	});
	let a = e.querySelector("#pinForm");
	a && (a.onsubmit = (e) => {
		e.preventDefault();
		let t = e.target, n = t.elements.namedItem("url").value.trim();
		n && (j({
			t: "pin.add",
			kind: "link",
			ref: n,
			title: t.elements.namedItem("title").value.trim()
		}), yr = !1, L());
	}), e.querySelectorAll("[data-unpin]").forEach((e) => e.onclick = () => j({
		t: "pin.del",
		id: e.dataset.unpin
	}));
}
function Sr() {
	let e = document.getElementById("askBar");
	if (!e) return;
	let t = fr().find((e) => /^a\d/.test(e.ref) && e.thread !== A);
	if (e.hidden = !t, !t) return;
	let n = (t.text || "").replace(/^(⏸|❓)\s*Seu Claude\s*/, "").replace(/[*`]/g, "").slice(0, 160);
	e.innerHTML = `<span>⏸ <b>${l("Seu agent espera você")}</b> ${l("em {where}", { where: f(t.topic || l("sala principal")) })}: ${f(n)}</span><button type="button" class="primary" data-askgo="${t.ref.slice(1)}">${l("Ver")}</button>`, e.querySelector("[data-askgo]").onclick = (e) => mi(Number(e.currentTarget.dataset.askgo));
}
function L() {
	_t(), Sr();
	let e = document.getElementById("side");
	if (!e || !k) return;
	if (Dn(), mn && window.innerWidth > 900) {
		let t = Ft.get("sidebar");
		return t && (t.destroy(), Ft.delete("sidebar")), gn(e);
	}
	Lt("sidebar", e, {
		room: k,
		thread: A,
		archOpen: Er,
		foldOpen: Dr,
		friends: Tt,
		vb: {
			t: l,
			icon: C,
			avatar: g,
			ago: _,
			name: h,
			initials: N,
			bookTitle: M,
			roomMark: dn,
			roomStrip: Or,
			pinsSec: br,
			sbxRows: Mn,
			agentRows: ar,
			epicIco: gr,
			epicBusy: ur,
			waitPill: pr,
			waitsIn: fr,
			prodMark: mr
		}
	}), e.querySelector("#railToggle").onclick = hn, e.querySelectorAll("details.memMore > summary").forEach((e) => e.onclick = () => Dr[e.parentElement.dataset.fold] = !e.parentElement.open), e.querySelectorAll(".epTabs [data-arch]").forEach((e) => e.onclick = () => {
		Er = !!e.dataset.arch, L();
	}), xr(e), e.querySelectorAll("[data-epowner]").forEach((e) => {
		let t = (t) => {
			t.preventDefault(), t.stopPropagation(), _r(e, e.dataset.epowner);
		};
		e.onclick = t, e.onkeydown = (e) => {
			(e.key === "Enter" || e.key === " ") && t(e);
		};
	});
	let t = e.querySelector(".sheetGrab");
	t && !It.has(t) && (Fr(t, "side", !1), It.add(t));
	let n = e.querySelector("#sideRooms");
	n && (n.onclick = Ge);
	let r = e.querySelector("#sideRename");
	r && (r.onclick = (e) => {
		e.stopPropagation(), jr();
	});
	let i = e.querySelector("#sideArch");
	i && (i.onclick = () => {
		H(), document.getElementById("epicArch")?.click();
	});
	let a = e.querySelector("#sideDel");
	a && (a.onclick = () => {
		H(), document.getElementById("epicDel")?.click();
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
			let i = k.epics.filter((e) => !e.archived).map((e) => e.id).filter((e) => e !== n), a = e.getBoundingClientRect();
			i.splice(i.indexOf(r) + +(t.clientY >= a.top + a.height / 2), 0, n);
			let o = [...i, ...k.epics.filter((e) => e.archived).map((e) => e.id)];
			k.epics.sort((e, t) => o.indexOf(e.id) - o.indexOf(t.id)), L(), j({
				t: "epic.order",
				ids: o
			});
		};
	}), e.querySelectorAll("[data-thread]").forEach((e) => e.onclick = () => {
		H(!0), A = e.dataset.thread, Q = !1, kr = A === "main" || P() ? null : A, L(), X(), z(), $();
	});
	let o = document.getElementById("newEpic"), s = o?.querySelector("input");
	s && (s.onfocus = (e) => setTimeout(() => e.target.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), 350)), o && (o.onsubmit = (e) => {
		e.preventDefault();
		let t = e.target[0].value.trim();
		if (!t) return e.target[0].focus();
		j({
			t: "epic",
			title: t
		}), e.target.reset();
	}), e.querySelectorAll("[data-remove]").forEach((e) => e.onclick = async () => {
		let t = e.dataset.remove;
		if (!confirm((k.pending || []).includes(t) ? l("Cancelar o convite de {email}?", { email: t }) : l("Remover {email} deste vibebook?", { email: t }))) return;
		let n = await fetch(`/api/books/${k.id}/members/${encodeURIComponent(t)}`, { method: "DELETE" });
		n.ok || alert((await n.json().catch(() => ({}))).error || l("Não deu para remover."));
	}), e.querySelectorAll("[data-ask]").forEach((e) => e.onclick = async () => {
		let t = !!e.dataset.ok, n = e.dataset.ask;
		(t || confirm(l("Recusar o pedido de {email}?", { email: n }))) && (e.disabled = !0, await y(`/api/books/${k.id}/requests`, {
			email: n,
			ok: t
		}).then(() => t && R(l("{email} entrou na sala e recebeu o link por email.", { email: f(n) }))).catch((t) => {
			alert(t.message), e.disabled = !1;
		}));
	}), e.querySelectorAll("[data-resend]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, e.textContent = "…";
		try {
			await y(`/api/books/${k.id}/members`, { email: e.dataset.resend }), e.textContent = `${l("enviado")} ✓`;
		} catch (t) {
			e.textContent = l("reenviar"), e.disabled = !1, alert(t.message);
		}
	}), e.querySelectorAll("[data-copyinv]").forEach((e) => e.onclick = () => Tr(e.dataset.copyinv, !1)), e.querySelectorAll("[data-add]").forEach((e) => e.onclick = async () => {
		e.disabled = !0, Tr(e.dataset.add), await y(`/api/books/${k.id}/members`, { email: e.dataset.add }).catch((t) => {
			alert(t.message), e.disabled = !1;
		});
	}), document.getElementById("invite").onsubmit = async (e) => {
		e.preventDefault();
		let t = e.target[0].value.trim();
		Tr(t), await y(`/api/books/${k.id}/members`, { email: t }).catch((e) => alert(e.message)), e.target.reset();
	}, document.title = `${k.book?.title ?? "vibebook"} · vibebook`, pn(M());
}
function Cr() {
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
			if (!a.ok) throw Error((await a.json().catch(() => ({}))).error || l("Não deu para salvar a foto."));
			Ke();
		} catch (e) {
			alert(e.message || l("Não deu para ler essa imagem."));
		}
	}, e.click());
}
function wr(e) {
	let t = `${location.origin}/b/${k.id}`;
	return `${l("Te convidei pro vibebook \"{title}\": {url}", {
		title: M(),
		url: t
	})}\n\n${l("1. Entra com {email} (o convite chegou nesse email).", { email: e })}\n${l("2. Manda isto pro seu Claude Code:")}\n\nRead ${location.origin}/llms.txt and set up vibebook for this project. Room: ${t}`;
}
function Tr(e, t = !0) {
	navigator.clipboard?.writeText(wr(e)).then(() => R(`${t ? `${l("Convite enviado por email para <b>{email}</b>.", { email: f(e) })} ` : ""}${l("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: f(h(e)) })}`), () => R(l("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: f(e) })));
}
function R(e, t = 7e3) {
	document.querySelector(".toast")?.remove(), document.body.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${e}</div>`);
	let n = document.querySelector(".toast");
	setTimeout(() => n.remove(), t);
}
l("A fazer"), l("Fazendo"), l("Esperando OK"), l("Feito");
var Er = !1, Dr = {
	off: !1,
	friends: null
};
function Or() {
	let e = [...x || []].filter((e) => e.id !== k?.id && !e.archived_at).sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0)).slice(0, 3), t = (e) => e.last_human_id > e.read_id ? "<b class=\"dot h\"></b>" : e.last_agent_id > e.read_id ? "<b class=\"dot a\"></b>" : "", n = (e) => e.busy_until > Date.now() ? "<b class=\"swBusy\">✻</b>" : "", r = (e) => {
		let t = S.filter((t) => t.book_id === e.id), n = t.length;
		return n ? `<b class="swWait${ge(t)}">${n}</b>` : "";
	};
	return `<nav class="roomStrip" aria-label="${l("Seus vibebooks")}"><a data-nav href="/app" class="rsAll"><span class="tile md">${C("grid", 20)}</span><span>${l("Todos")}</span></a>${e.map((e) => `<a data-nav href="/b/${e.id}" title="${f(e.title)}"><span class="tw">${De(e, "md")}${t(e)}${n(e)}${r(e)}</span><span>${f(e.title)}</span></a>`).join("")}${"<i></i>".repeat(3 - e.length)}<button type="button" class="rsAll" id="sideRooms" aria-label="${l("Trocar de sala")}"><span class="tile md">${ye}</span><span>${l("Buscar")}</span></button></nav>`;
}
var kr = null, Ar = () => {
	d.querySelector(".book.boardview") && document.getElementById("toggleBoard").click();
};
function z() {
	let e = document.getElementById("kanban");
	e && d.querySelector(".book.boardview, .doc[data-pane='board']") && Lt("board", e, {
		room: k,
		thread: A,
		vb: zt(),
		send: j,
		onopen: Vt
	});
}
function jr() {
	let e = k.epics.find((e) => e.id === A), t = e ? e.title : M(), n = prompt(l(e ? "Nome do épico:" : "Nome do vibebook:"), t);
	n?.trim() && n !== t && j(e ? {
		t: "epic.rename",
		id: e.id,
		title: n
	} : {
		t: "title",
		title: n
	});
}
function Mr() {
	let e = document.getElementById("peekTxt");
	if (!e || !k) return;
	let t = Sa(), n = t && k.epics.find((e) => e.id === t), r = ((t ? k.docs?.[t] : k.doc) || "").match(/^#\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() || (n ? n.title : M()), i = n?.tasks.length || 0, a = i && n.tasks.filter((e) => e.done).length;
	e.innerHTML = `${C("doc", 15)}<b>Doc</b>${i ? `<small>${a}/${i}</small>` : ""}`, e.title = r;
	let o = k.filesN ?? k.files?.length ?? 0, s = (k.reminders || []).filter((e) => e.error).length;
	document.getElementById("peekFiles").textContent = o ? String(o) : "", document.getElementById("peekRem").textContent = s ? "⚠" : "";
}
var B = matchMedia("(max-width: 900px)"), Nr = !1;
function V(e) {
	let t = d.querySelector(".book");
	t && B.matches && t.dataset.sheet !== e && (t.dataset.sheet || history.pushState({ sheet: 1 }, "", location.href), t.dataset.sheet = e);
}
function H(e) {
	let t = d.querySelector(".book");
	t?.dataset.sheet && (t.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete t.dataset.sheet, history.state?.sheet && (e ? ia = !1 : (Nr = !0, history.back())));
}
function Pr() {
	if (Nr) return Nr = !1, !0;
	let e = d.querySelector(".book");
	return e?.dataset.sheet ? (e.querySelector(".doc[data-view=\"edit\"] .seg [data-view=\"preview\"]")?.click(), delete e.dataset.sheet, !0) : !1;
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && d.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open]") && H();
});
function Fr(e, t, n, r) {
	if (!e) return;
	let i = !1;
	e.onclick = (e) => {
		i ? i = !1 : r ? r(e) : n ? V(t) : H();
	}, e.onpointerdown = (r) => {
		let a = d.querySelector(".book")?.querySelector(t === "doc" ? ".doc" : ".side"), o = document.getElementById("sheetDim");
		if (!a || !B.matches) return;
		let s = r.clientY, c = a.offsetHeight, l = 0, u = !1;
		i = !1, e.setPointerCapture(r.pointerId), e.onpointermove = (e) => {
			if (l = (e.clientY - s) * -1, !u && Math.abs(l) < 6) return;
			u = !0, a.classList.add("sheetDrag"), o.style.transition = "none";
			let t = Math.min(c, Math.max(0, n ? c + l : l));
			a.style.transform = `translateY(${t * -1}px)`, o.style.opacity = String(1 - t / c);
		}, e.onpointerup = e.onpointercancel = () => {
			e.onpointermove = e.onpointerup = e.onpointercancel = null, u && (i = !0, setTimeout(() => i = !1, 400), a.classList.remove("sheetDrag"), a.style.transform = "", o.style.transition = "", o.style.opacity = "", (n ? -l > c / 4 : l <= c / 4) ? V(t) : H());
		};
	};
}
function Ir() {
	let e = document.getElementById("tasks");
	if (!e) return;
	let t = k.epics.find((e) => e.id === A), n = document.getElementById("threadTitle"), r = `<button type="button" class="thChev" aria-label="${l("Trocar de conversa")}" title="${l("Trocar de conversa")}">${C("chevronDown", 18)}</button>`, i = () => n.querySelector(".thChev").onclick = () => V("side"), a = (e, t) => `<span class="thPick">${e.replace("class=\"ri", "class=\"ri thMark")}${t}${r}</span>`;
	if (_n()) {
		n.innerHTML = `${a(`<span class="ri">${f(N(_n().title))}</span>`, `<span class="epicName" id="roomName">${f(_n().title)}</span>`)}<small class="folderChip">✦ ${l("sugestão do @vibe")}</small>`, i(), document.getElementById("roomName").onclick = () => B.matches && V("side"), e.innerHTML = "", Mr();
		return;
	}
	n.innerHTML = t ? `${a(`<span class="ri" style="background:${m(t.title)};color:#fff">${f(N(t.title))}</span>`, `<span class="epicName" id="roomName" title="${l("Clique para renomear")}">${f(t.title)}</span>`)}<button class="ghost x" id="epicArch" title="${t.archived ? l("Desarquivar épico") : l("Arquivar épico (concluído)")}" aria-label="${t.archived ? l("Desarquivar épico") : l("Arquivar épico")}">${C(t.archived ? "undo" : "check")}</button><button class="ghost x" id="epicDel" title="${l("Apagar épico")}" aria-label="${l("Apagar épico")}">${C("trash")}</button>` : `${a(dn("ri roomIco"), `<span class="epicName" id="roomName" title="${f(k.book?.summary || l("Clique para renomear"))}">${f(M())}</span>`)}${k.book?.folder ? `<small class="folderChip">${C("folder", 12)} ${f(k.book.folder)}</small>` : ""}`;
	let o = {};
	for (let e of [...k.epics.flatMap((e) => e.tasks), ...k.roomTasks || []]) !e.done && e.owner && (o[e.owner] = (o[e.owner] || 0) + 1);
	Object.entries(o).sort((e, t) => t[1] - e[1]), n.closest(".chathead");
	let s = o[k.me] || 0, c = document.getElementById("toggleBoard");
	c.querySelector(".kN")?.remove(), s && c.insertAdjacentHTML("beforeend", `<b class="kN" title="${l("Esperando você")}: ${s}">${s}</b>`);
	let u = d.querySelector(".ptBoard .kN");
	u && (u.hidden = !s, u.textContent = s || ""), c.title = s ? `${l("Quadro de tarefas")} · ${l("Esperando você")}: ${s}` : l("Quadro de tarefas (kanban)"), i(), document.getElementById("roomName").onclick = () => B.matches ? V("side") : jr();
	let p = d.querySelector(".phHome");
	p && (p.title = p.ariaLabel = l(A === "main" ? "Seus vibebooks" : "Voltar pra sala principal"), p.onclick = (e) => {
		A !== "main" && (e.preventDefault(), e.stopPropagation(), A = "main", Q = !1, L(), X(), z(), $());
	}), n.querySelector(".thPick").onclick = (e) => {
		B.matches && !e.target.closest(".thChev") && V("side");
	}, Mr();
	let ee = t || (A === "main" && k.roomTasks?.length ? {
		id: "main",
		tasks: k.roomTasks
	} : null);
	e.style.display = ee ? "" : "none", ee && (t && (document.getElementById("epicArch").onclick = () => j({
		t: "epic.archive",
		id: t.id,
		archived: !t.archived
	})), t && (document.getElementById("epicDel").onclick = () => {
		confirm(l("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: t.title })) && j({
			t: "epic.del",
			id: t.id
		});
	}), Lt("tasks", e, {
		room: k,
		thread: A,
		vb: zt(),
		send: j,
		waits: S
	}));
}
var Lr = (e) => `/api/books/${k.id}/files/${e.id}`, Rr = (e) => `data-view="${e.type.startsWith("image/") ? "img" : "frame"}" data-name="${f(e.name)}"`, zr = (matchMedia("(display-mode: standalone)").matches || navigator.standalone === !0) && (/iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1), Br = (e) => zr ? `x-safari-${new URL(e, location.href).href}` : e;
function Vr(e, t, n) {
	let r = document.getElementById("viewer");
	r || (r = document.createElement("dialog"), r.id = "viewer", r.className = "viewer", r.innerHTML = `<header><b></b><select class="vsel" aria-label="${l("Versão")}" hidden></select><a target="_blank" rel="noopener" title="${l("Abrir numa aba")}" aria-label="${l("Abrir numa aba")}">${C("external", 20)}</a><button type="button" title="${l("Fechar")}" aria-label="${l("Fechar")}">${C("x", 20)}</button></header><div class="vbody"></div>`, r.querySelector("button").onclick = () => r.close(), r.querySelector("header a").onclick = () => r.close(), r.querySelector(".vsel").onchange = (e) => {
		let t = e.target.value;
		Wr(r, `/api/books/${k.id}/files/${t}`, r.dataset.kind, r.dataset.name);
	}, r.addEventListener("click", (e) => {
		e.target.classList.contains("vbody") && r.close();
	}), r.addEventListener("close", () => {
		r.querySelector(".vbody").innerHTML = "", history.state?.viewer && (Kr = !0, history.back());
	}), document.body.appendChild(r)), Wr(r, e, t, n), r.open || history.pushState({ viewer: 1 }, "", r.dataset.fid ? `${location.pathname}${location.search}#f${r.dataset.fid}` : location.href), r.showModal();
}
function Hr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of k.files || []) n.name === e && t.set(n.id, {
		id: n.id,
		ts: n.ts
	});
	for (let n of Y()) for (let r of n.files || []) r.name === e && !t.has(r.id) && t.set(r.id, {
		id: r.id,
		ts: n.ts
	});
	return [...t.values()].sort((e, t) => t.ts - e.ts);
}
function Ur() {
	let e = document.getElementById("viewer");
	if (!e?.open || !e.dataset.name) return;
	let t = e.querySelector(".vsel"), n = Hr(e.dataset.name), r = e.dataset.fid;
	t.hidden = n.length < 2, t.innerHTML = n.map((e, t) => `<option value="${e.id}"${e.id === r ? " selected" : ""}>v${n.length - t}${t === 0 ? ` · ${l("mais nova")}` : ""} · ${new Date(e.ts).toLocaleString(s, {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	})}</option>`).join("");
}
function Wr(e, t, n, r) {
	e.dataset.kind = n, e.dataset.name = typeof t == "string" ? r : "", e.dataset.fid = typeof t == "string" ? /\/files\/([0-9a-f]+)/.exec(t)?.[1] ?? "" : "", e.querySelector("header b").textContent = r, e.querySelector("header a").href = typeof t == "string" ? Br(t) : "";
	let i = e.querySelector(".vsel");
	i.hidden = !0, e.dataset.fid && (Ur(), k.filesAll || j({ t: "files.get" })), e.open && e.dataset.fid && history.state?.viewer && history.replaceState(history.state, "", `${location.pathname}${location.search}#f${e.dataset.fid}`);
	let a = e.querySelector(".vbody");
	if (a.className = `vbody ${n}`, e.classList.toggle("noLink", n === "table"), n === "table") a.replaceChildren(t.cloneNode(!0));
	else if (n === "img") {
		let e = new Image();
		e.src = t, e.alt = r, a.replaceChildren(e);
	} else if (/\.(md|markdown|txt|csv)$/i.test(r) && typeof t == "string") a.className = "vbody text", a.replaceChildren(), fetch(t).then((e) => e.ok ? e.text() : Promise.reject(e.status)).then((n) => {
		(!e.dataset.fid || t.endsWith(e.dataset.fid)) && (a.innerHTML = /\.(md|markdown)$/i.test(r) ? `<div class="vdoc md">${he(n.slice(0, 3e5))}</div>` : /\.csv$/i.test(r) ? `<div class="vdoc"><table>${Gr(n).map((e, t) => `<tr>${e.map((e) => `<${t ? "td" : "th"}>${f(e)}</${t ? "td" : "th"}>`).join("")}</tr>`).join("")}</table></div>` : `<pre class="vdoc">${f(n.slice(0, 3e5))}</pre>`);
	}).catch(() => {
		a.innerHTML = `<p class="vdoc">${l("Não consegui abrir este arquivo.")}</p>`;
	});
	else {
		let e = document.createElement("iframe");
		e.src = t, e.title = r, /\.pdf$/i.test(r) || (e.sandbox = "allow-scripts"), a.replaceChildren(e);
	}
}
function Gr(e) {
	let t = [], n = [], r = "", i = !1;
	for (let a = 0; a < e.length && t.length < 2e3; a++) {
		let o = e[a];
		i ? o === "\"" ? e[a + 1] === "\"" ? (r += "\"", a++) : i = !1 : r += o : o === "\"" ? i = !0 : o === "," || o === ";" && !e.slice(0, 200).includes(",") ? (n.push(r), r = "") : o === "\n" ? (n.push(r.replace(/\r$/, "")), t.push(n.slice(0, 50)), n = [], r = "") : r += o;
	}
	return (r || n.length) && (n.push(r), t.push(n.slice(0, 50))), t;
}
var Kr = !1;
function qr() {
	if (Kr) return Kr = !1, !0;
	let e = document.getElementById("viewer");
	return e?.open ? (history.replaceState(null, "", location.href), e.close(), !0) : !1;
}
document.addEventListener("click", (e) => {
	if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
	let t = e.target.closest?.("a[data-view]");
	if (t) return e.preventDefault(), Vr(t.getAttribute("href"), t.dataset.view, t.dataset.name || "");
	let n = e.target.closest?.("a[href]");
	if (!n || !k?.id) return;
	let r;
	try {
		r = new URL(n.getAttribute("href"), location.href);
	} catch {
		return;
	}
	let i = r.origin === location.origin && RegExp(`^/api/books/${k.id}/files/([0-9a-f]+)$`).exec(r.pathname);
	if (!i) return;
	let a = (k.files || []).find((e) => e.id === i[1]) || Y().flatMap((e) => e.files || []).find((e) => e.id === i[1]);
	e.preventDefault(), Vr(r.pathname, a?.type?.startsWith("image/") ? "img" : "frame", a?.name || n.textContent.trim() || "arquivo");
});
var Jr = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, Yr = (e) => e?.length ? `<div class="atts">${e.map((e) => e.embed ? `<div class="embedBox"><div class="embedWrap"><iframe class="embed" src="${Lr(e)}" sandbox="allow-scripts" loading="lazy" title="${f(e.name)}"></iframe><a class="embedOpen" href="${Lr(e)}" ${Rr(e)} title="${l("Abrir em tela cheia")}" aria-label="${l("Abrir em tela cheia")}">${C("expand", 15)}</a></div></div>` : e.type.startsWith("audio/") ? `<div class="audioAtt"><audio controls preload="metadata" src="${Lr(e)}"></audio><a href="${Lr(e)}" target="_blank" rel="noopener" download="${f(e.name)}">${C("mic", 14)} ${f(e.name)} <small>${Jr(e.size)}</small></a></div>` : e.type.startsWith("image/") ? `<a href="${Lr(e)}" target="_blank" rel="noopener" ${Rr(e)}><img src="${Lr(e)}" alt="${f(e.name)}" loading="lazy" /></a>` : `<a class="fileChip" href="${Lr(e)}" target="_blank" rel="noopener" ${Rr(e)}>${kt(e)} ${f(e.name)} <small>${Jr(e.size)}</small></a>`).join("")}</div>` : "";
function Xr(e) {
	let t = k.polls?.[e];
	if (!t) return "";
	let n = t.votes.map((e) => e.length), r = n.reduce((e, t) => e + t, 0), i = Math.max(...n), a = new Set(t.votes.flat()).size;
	return `<div class="poll" data-poll="${e}">
    <div class="pq">${C("chart", 18)} ${f(t.question)}</div>
    ${t.options.map((e, a) => {
		let o = n[a], s = r ? Math.round(100 * o / r) : 0, c = t.votes[a].includes(k.me), l = t.closed && o > 0 && o === i;
		return `<button type="button" class="opt ${c ? "mine" : ""} ${l ? "win" : ""}" data-vote="${a}" ${t.closed ? "disabled" : ""} aria-pressed="${c}">
        <span class="fill" style="width:${s}%"></span><span class="ol">${l ? `${C("trophy")} ` : c ? `${C("check")} ` : ""}${f(e)}</span>
        <span class="stack">${t.votes[a].slice(0, 4).map((e) => g(e)).join("")}</span><span class="pc">${o ? `${s}%` : ""}</span></button>`;
	}).join("")}
    <div class="pf">${a === 1 ? l("1 pessoa votou") : l("{n} pessoas votaram", { n: a })} · ${t.multi ? l("pode escolher várias") : l("escolha uma")}${t.closed ? ` · ${l("encerrada")}` : t.author === k.me || t.author === "ai" ? ` · <button type="button" class="link" data-close="${e}">${l("encerrar")}</button>` : ""}</div>
  </div>`;
}
var Zr = (e) => new Date(e).toLocaleTimeString(s, {
	hour: "2-digit",
	minute: "2-digit"
}), Qr = (e, t) => !!e && e.author === t.author && (e.kind || null) === (t.kind || null) && (e.tag || null) === (t.tag || null) && t.ts - e.ts < 3e5 && !e.poll && !t.poll, $r = (e) => {
	let t = k.messages.filter((t) => t.thread === e.id), n = t.at(-1), r = k.counts ? (k.counts[e.id] ?? 0) + t.filter((e) => e.id > (k.countsAt ?? 0)).length : t.length, i = e.tasks.filter((e) => e.status === "done").length;
	return `${gr(e)}<span class="tc-t"><b>${f(e.title)}</b><small>${e.archived ? `✓ ${l("concluído")} · ` : ""}${e.tasks.length ? `${l("{d}/{n} tarefas", {
		d: i,
		n: e.tasks.length
	})} · ` : ""}${r === 1 ? l("1 resposta") : l("{n} respostas", { n: r })}${n ? ` · ${_(n.ts) === l("agora") ? l("agora") : l("última há {ago}", { ago: _(n.ts) })}` : ""}</small></span><span class="tc-go">→</span>`;
};
function ei(e) {
	let t = /* @__PURE__ */ new Map();
	for (let e of k.epics || []) e.parent && (t.has(e.parent) || t.set(e.parent, []), t.get(e.parent).push(e.id));
	let n = [e];
	for (let e = 0; e < n.length && n.length < 60; e++) for (let r of t.get(n[e]) || []) n.includes(r) || n.push(r);
	let r = new Set(n), i = /* @__PURE__ */ new Map();
	for (let e of [...k.messages].reverse()) if (r.has(e.thread)) for (let t of e.files || []) {
		let e = i.get(t.name);
		e ? e.seen.add(t.id) : i.set(t.name, {
			f: t,
			seen: /* @__PURE__ */ new Set([t.id]),
			n: 0
		});
	}
	for (let e of n) for (let t of k.epics.find((t) => t.id === e)?.files || []) {
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
var ti = (e) => {
	let t = ei(e);
	return t.length ? `<div class="tcFiles" data-files-of="${e}">${t.slice(0, 6).map((e) => `<a class="fchip" href="/api/books/${k.id}/files/${e.id}" title="${f(e.name)}">${kt(e, 14)}<span>${f(e.name)}</span>${e.n > 1 ? `<small>v${e.n}</small>` : ""}</a>`).join("")}${t.length > 6 ? `<small class="mute">+${t.length - 6}</small>` : ""}</div>` : "";
}, ni = (e) => (k.epics || []).filter((t) => t.from_msg === e).map((e) => `<button type="button" class="tcard" data-goepic="${e.id}">${$r(e)}</button>${ti(e.id)}`).join("");
function ri() {
	X("stay");
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-gomain]");
	if (t) return A = "main", Q = !1, L(), X(), z(), $(), document.getElementById(`m${t.dataset.gomain}`)?.scrollIntoView({ block: "center" });
	let n = e.target.closest(".tcard[data-goepic]");
	n && (A = n.dataset.goepic, Q = !1, L(), X(), z(), $());
});
function ii() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".endMark, .prodStage").forEach((e) => e.remove());
	let t = k.epics.find((e) => e.id === A), n = t?.prod, r = n ? n.stage === "verified" ? `<div class="prodStage ok"><b>✓✓ ${l("Verificado em prod")}</b>${n.note ? `<span>${f(n.note)}</span>` : ""}</div>` : `<div class="prodStage"><b>🚀 ${l("No ar")}</b><span>${l("Falta o agent verificar em prod.")}</span></div>` : "";
	t?.archived && e.insertAdjacentHTML("beforeend", `<div class="endMark"><b>✓ ${l("Agent fez")}</b><span>${l("Escreva aqui pra continuar: ele reabre.")}</span></div>`), r && e.insertAdjacentHTML("beforeend", r);
}
var U = null, ai = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? l("votação") : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120), oi = (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? l("{via} de {who}", {
	via: "Agent",
	who: h(e.author)
}) : h(e.author), si = (e) => {
	let t = k.messages.find((t) => t.id === e);
	return `<button type="button" class="quote" data-goto="${e}" title="${l("Ver a mensagem respondida")}">${C("reply", 13)} ${t ? `<b>${f(oi(t))}</b> ${f(ai(t))}` : l("mensagem anterior")}</button>`;
};
function ci() {
	let e = document.getElementById("replyBar");
	e && (U && U.thread !== A && (U = null), e.hidden = !U, U && (e.innerHTML = `<span>${C("reply", 13)} ${l("Respondendo a <b>{who}</b>", { who: f(oi(U)) })}: ${f(ai(U))}</span><button type="button" class="ghost" id="replyX" aria-label="${l("Cancelar resposta")}" title="${l("Cancelar")}">${C("x")}</button>`), document.getElementById("replyX")?.addEventListener("click", () => {
		U = null, ci();
	}));
}
function li(e) {
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px", document.body.append(t), t.focus({ preventScroll: !0 }), t.setSelectionRange(0, e.length);
	let n = !1;
	try {
		n = document.execCommand("copy");
	} catch {}
	return t.remove(), n;
}
function ui(e) {
	let t = Y().find((t) => t.id === e);
	if (!t) return;
	let n = `${location.origin}/b/${k.id}${t.thread && t.thread !== "main" ? `?t=${encodeURIComponent(t.thread)}` : ""}#m${e}`, r = () => {
		R(`✓ ${l("Link copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (li(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => R(`${l("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copylink="${e}">${l("Copiar link")}</button>`));
}
function di(e) {
	let t = k.messages.find((t) => t.id === e);
	if (!t) return;
	let n = t.text || t.files?.map((e) => e.name).join("\n") || "";
	if (!n) return R(l("Essa mensagem não tem texto pra copiar."), 2500);
	let r = () => {
		R(`✓ ${l("Copiado")}`, 1600), navigator.vibrate?.(15);
	};
	if (li(n)) return r();
	(navigator.clipboard?.writeText(n) ?? Promise.reject()).then(r, () => {
		R(`${l("O navegador pediu um toque pra copiar.")} <button type="button" class="primary" data-copymsg="${e}">${l("Copiar")}</button>`);
	});
}
function fi(e) {
	U = k.messages.find((t) => t.id === e) ?? null, ci(), document.getElementById("input")?.focus();
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-reply]");
	if (t) return fi(Number(t.dataset.reply));
	let n = e.target.closest("[data-copymsg]");
	if (n) return di(Number(n.dataset.copymsg));
	let r = e.target.closest("[data-copylink]");
	if (r) return ui(Number(r.dataset.copylink));
	let i = e.target.closest("a.mlink[data-msg]");
	if (i) return e.preventDefault(), mi(Number(i.dataset.msg));
	let a = e.target.closest(".quote[data-goto]");
	a && mi(Number(a.dataset.goto));
});
var pi = null;
function mi(e, t) {
	let n = k.messages.find((t) => t.id === e), r = n?.thread || t;
	r && r !== A && (r === "main" || k.epics.some((e) => e.id === r)) && (A = r, Q = !1, L(), X(), z(), $());
	let i = document.getElementById(`m${e}`);
	if (!i && n) {
		let t = k.messages.filter((e) => e.thread === A), r = t.indexOf(n);
		r >= 0 && (J.n = Math.max(J.n, t.length - r + 10), X(!0), i = document.getElementById(`m${e}`));
	}
	if (!i) return pi?.id === e ? void 0 : (pi = {
		id: e,
		n: 0
	}, R(l("Buscando a mensagem…"), 1500), sa());
	pi = null, Z = !1, i.scrollIntoView({
		block: "center",
		behavior: "smooth"
	}), i.classList.remove("flash"), i.offsetWidth, i.classList.add("flash");
}
document.addEventListener("keydown", (e) => {
	e.key === "Escape" && U && document.activeElement?.id === "input" && (U = null, ci());
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
	e.preventDefault(), W.dx = t, W.m.style.transform = `translateX(${Math.max(-80, Math.min(t, 80))}px)`, W.m.dataset.sw = t < 0 ? `← ${l("Copiar")}` : `${l("Responder")} →`, W.m.classList.toggle("swL", t < 0), W.m.classList.toggle("swR", t > 0), W.m.classList.toggle("swGo", Math.abs(t) > 60);
}, { passive: !1 }), document.addEventListener("touchend", () => {
	if (!W) return;
	let { m: e, dx: t } = W;
	W = null, e.classList.remove("swipe", "swL", "swR", "swGo"), e.style.transform = "", t > 60 ? fi(Number(e.id.slice(1))) : t < -60 && di(Number(e.id.slice(1)));
});
function hi(e) {
	let t;
	try {
		t = typeof e.card == "string" ? JSON.parse(e.card) : e.card;
	} catch {
		return "";
	}
	if (!t?.elements?.[t.root]) return "";
	let n = k.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent"), r = e.kind === "agent" && e.author === k.me && !n, i = (e) => f(String(e ?? "")).replace(/\n/g, "<br>"), a = (o, s = 0) => {
		let c = t.elements[o];
		if (!c || s > 8) return "";
		let u = c.props || {}, d = () => (c.children || []).map((e) => a(e, s + 1)).join("");
		switch (c.type) {
			case "Card": return `<div class="vcard">${u.title ? `<div class="vh"><b>${i(u.title)}</b>${u.subtitle ? `<small>${i(u.subtitle)}</small>` : ""}</div>` : ""}<div class="vb">${d()}</div></div>`;
			case "Section": return `<section class="vsec">${u.title ? `<h5>${i(u.title)}</h5>` : ""}${d()}</section>`;
			case "Text": return `<p class="vtx ${f(u.style || "plain")}">${i(u.content)}</p>`;
			case "Fields": return `<dl class="vfields">${d()}</dl>`;
			case "Field": return `<div><dt>${i(u.label)}</dt><dd>${i(u.value)}</dd></div>`;
			case "Table": return `<div class="vtWrap"><button type="button" class="vtOpen" data-vtopen title="${l("Abrir em tela cheia")}" aria-label="${l("Abrir em tela cheia")}">${C("expand", 14)}</button><div class="vtable"><table>${u.headers?.length ? `<thead><tr>${u.headers.map((e) => `<th>${i(e)}</th>`).join("")}</tr></thead>` : ""}<tbody>${(u.rows || []).map((e) => `<tr>${e.map((e) => `<td>${i(e)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
			case "Chart": {
				let e = u.data || [], t = Math.max(...e.map((e) => Math.abs(e.value)), 1);
				if (u.kind === "line") {
					let n = e.length > 1 ? 300 / (e.length - 1) : 0, r = Math.min(...e.map((e) => e.value), 0), a = t - r || 1, o = e.map((e, t) => `${(t * n).toFixed(1)},${(90 - (e.value - r) / a * 90).toFixed(1)}`).join(" ");
					return `<figure class="vchart">${u.title ? `<figcaption>${i(u.title)}</figcaption>` : ""}<svg viewBox="-4 -4 308 98" preserveAspectRatio="none"><polyline points="${o}" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="vlab"><span>${i(e[0]?.label)}</span><span>${i(e.at(-1)?.label)}</span></div></figure>`;
				}
				return `<figure class="vchart">${u.title ? `<figcaption>${i(u.title)}</figcaption>` : ""}${e.map((e) => `<div class="vbar"><span>${i(e.label)}</span><i style="width:${Math.round(Math.abs(e.value) / t * 100)}%"></i><b>${i(e.value)}</b></div>`).join("")}</figure>`;
			}
			case "Divider": return "<hr class=\"vhr\">";
			case "Image": return /^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(u.url) ? `<img class="vimg" src="${f(u.url)}" alt="${f(u.alt || "")}" loading="lazy">` : "";
			case "Actions": return `<div class="vact">${d()}</div>`;
			case "Button": {
				let t = u.value || u.label, a = n?.text === t;
				return r ? `<button type="button" class="vbtn ${f(u.style || "")}" data-cardbtn="${e.id}" data-v="${f(t)}">${i(u.label)}</button>` : `<span class="vbtn ro ${a ? "on" : ""}">${a ? C("check", 14) : ""}${i(u.label)}</span>`;
			}
			case "LinkButton": return /^#(m\d+|e[a-z0-9]+|doc(:[a-z0-9]+)?|app:(room|[a-f0-9]{12})\/[\w.-]+)$/.test(u.url || "") ? `<button type="button" class="vbtn link" data-cardgo="${f(u.url)}">${i(u.label)} ${C("arrowRight", 13)}</button>` : /^https?:\/\//i.test(u.url) ? `<a class="vbtn link" href="${f(u.url)}" target="_blank" rel="noopener noreferrer">${i(u.label)} ${C("external", 13)}</a>` : "";
			default: return "";
		}
	};
	return a(t.root);
}
function gi(e) {
	if (e.startsWith("#app:")) {
		let [t, n] = e.slice(5).split("/");
		K = {
			cid: t,
			tool: n
		}, document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" })), B.matches && V("doc");
		return;
	}
	if (e.startsWith("#m")) return mi(Number(e.slice(2)));
	let t = e.startsWith("#e") ? e.slice(2) : e.split(":")[1], n = t && k.epics.some((e) => e.id === t) ? t : t ? null : A;
	if (!n) return R(l("Esse épico não existe mais nesta sala."));
	n !== A && (A = n, Q = !1, L(), X(), z(), $()), e.startsWith("#doc") && (document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" })), B.matches && V("doc"));
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardgo]");
	t && (e.preventDefault(), gi(t.dataset.cardgo));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-vtopen]");
	if (!t) return;
	let n = t.parentElement.querySelector("table");
	n && Vr(n, "table", t.closest(".vcard")?.querySelector(".vh b")?.textContent || l("Tabela"));
}), document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-cardbtn]");
	if (!t) return;
	let n = k.messages.find((e) => e.id === Number(t.dataset.cardbtn));
	t.closest(".vcard")?.querySelectorAll("[data-cardbtn]").forEach((e) => e.disabled = !0), j({
		t: "msg",
		thread: n?.thread ?? A,
		text: t.dataset.v,
		files: [],
		reply_to: Number(t.dataset.cardbtn)
	});
});
var _i = (e) => e?.kind === "agent" && e.author !== k.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(e.text || ""), vi = (e) => {
	if (!e?.reply_to || e.kind === "agent") return !1;
	let t = k.messages.find((t) => t.id === e.reply_to);
	return !!t && In(t) && t.author === e.author;
};
function yi(e, t, n) {
	if (n) {
		let e = /^\s*aprov/i.test(n.text);
		return `<div class="permAsk done ${e ? "ok" : "no"}">${C(e ? "check" : "x", 14)} ${l(e ? "Aprovado por {who}" : "Negado por {who}", { who: f(h(n.author)) })} · ${Zr(n.ts)}</div>`;
	}
	return t.closed ? `<div class="permAsk done">${C("terminal", 14)} ${l("foi pro terminal")}</div>` : e.author === k.me ? `<div class="permAsk" data-perm="${e.id}"><button type="button" class="primary" data-pv="Aprovar">${l("Aprovar")}</button><button type="button" class="ghost" data-pv="Negar">${l("Negar")}</button></div>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${f(e)}</span>`).join("")}<small>${l("esperando {who}", { who: f(h(e.author)) })}</small></div>`;
}
document.addEventListener("click", (e) => {
	let t = e.target.closest("[data-perm] [data-pv], [data-perm] [data-pconfirm], [data-perm] [data-pcancel]");
	if (!t) return;
	let n = t.closest("[data-perm]"), r = Number(n.dataset.perm);
	if (t.dataset.pv) {
		let e = t.dataset.pv === "Aprovar";
		n.innerHTML = `<span class="pq">${l(e ? "Aprovar este pedido?" : "Negar este pedido?")}</span><button type="button" class="${e ? "primary" : "danger"}" data-pconfirm="${t.dataset.pv}">${l("Confirmar")}</button><button type="button" class="ghost" data-pcancel="1">${l("Cancelar")}</button>`, n.classList.add("confirm");
		return;
	}
	if (t.dataset.pcancel) {
		let e = k.messages.find((e) => e.id === r);
		e && (n.outerHTML = bi(e));
		return;
	}
	let i = k.messages.find((e) => e.id === r);
	n.querySelectorAll("button").forEach((e) => e.disabled = !0), j({
		t: "msg",
		thread: i?.thread ?? A,
		text: t.dataset.pconfirm,
		files: [],
		reply_to: r
	});
});
function bi(e) {
	let t;
	try {
		t = JSON.parse(e.choices);
	} catch {
		return "";
	}
	let n = k.messages.find((t) => t.reply_to === e.id && t.author === e.author && t.kind !== "agent");
	if (In(e)) return yi(e, t, n);
	let r = !In(e);
	if (!n && t.closed) return `<div class="choice ro closed">${t.options.map((e) => `<span class="opt">${f(e)}</span>`).join("")}<small>${l("foi pro terminal")}</small></div>`;
	if (n) {
		let e = new Set(n.text.split(" · ")), i = r && !t.options.some((t) => e.has(t));
		return `<div class="choice done">${t.options.map((t) => `<span class="opt ${e.has(t) ? "on" : ""}">${e.has(t) ? C("check", 14) : ""}${f(t)}</span>`).join("")}${i ? `<span class="opt on">${C("check", 14)}${l("Outro")}</span>` : ""}</div>`;
	}
	return e.kind === "agent" && e.author === k.me ? `<form class="choice" data-choice="${e.id}" data-multi="${t.multi ? 1 : ""}">${t.options.map((n) => `<label class="opt"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="${f(n)}" />${f(n)}</label>`).join("")}${r ? `<label class="opt oth"><input type="${t.multi ? "checkbox" : "radio"}" name="c${e.id}" value="" data-other="1" />${l("Outro")}…</label>` : ""}<small>${l("escolha e envie pela caixa de mensagem")}</small></form>` : `<div class="choice ro">${t.options.map((e) => `<span class="opt">${f(e)}</span>`).join("")}<small>${l("esperando {who}", { who: f(h(e.author)) })}</small></div>`;
}
document.addEventListener("change", (e) => {
	let t = e.target.closest("form.choice");
	if (!t) return;
	let n = document.getElementById("input");
	n && (e.target.dataset.other ? e.target.checked && (t.dataset.multi || t.querySelectorAll("input").forEach((t) => t.checked = t === e.target), n.value = "") : n.value = [...t.querySelectorAll("input:checked:not([data-other])")].map((e) => e.value).join(" · "), fi(Number(t.dataset.choice)), n.dispatchEvent(new Event("input", { bubbles: !0 })), n.focus());
});
var xi = (e) => e?.tag === "reminder" ? (e.text || "").split("\n")[0] : e?.tag === "issue" ? "⚠issue" : null;
function Si(e) {
	let t = [];
	for (let n of e) {
		let e = xi(n), r = t[t.length - 1];
		e && xi(r) === e ? t[t.length - 1] = {
			...n,
			runs: [...r.runs || [r.ts], n.ts],
			group: [...r.group || [r], n]
		} : t.push(n);
	}
	return t;
}
function Ci(e) {
	let t = (e.group || [e]).slice().reverse(), n = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? Zr(e) : `${new Date(e).toLocaleDateString(s, {
		day: "numeric",
		month: "short"
	})} ${Zr(e)}`, r = (e) => {
		let [t, ...n] = (e.text || "").split("\n\n");
		return {
			head: t.replace(/^⚠\s*/, ""),
			what: n.join("\n\n")
		};
	}, i = r(t[0]);
	return `<div class="msg remMsg issueMsg" id="m${e.id}">${Di(e.id)}<div class="body"><details><summary>${C("alert", 14)}<span class="remT"><b>${t.length > 1 ? l("{n} issues dos agents", { n: t.length }) : l("Issue de um agent")}</b> ${f(i.what.replace(/\s+/g, " ").slice(0, 140))}</span><span class="remWhen" title="${f(new Date(e.ts).toLocaleString(s))}">${n(e.ts)}</span></summary><div class="txt issueList">${t.map((e) => {
		let t = r(e);
		return `<div class="iss"><small>${n(e.ts)} · ${v(he(t.head))}<span class="issAct"><button type="button" class="rbtn" data-copymsg="${e.id}" title="${l("Copiar")}" aria-label="${l("Copiar o texto desta mensagem")}">${C("copy", 13)}</button><button type="button" class="rbtn" data-reply="${e.id}" title="${l("Responder")}" aria-label="${l("Responder a esta mensagem")}">${C("reply", 13)}</button></span></small><div>${f(t.what)}</div></div>`;
	}).join("")}</div></details></div></div>`;
}
function wi(e, t = !1) {
	let [n, ...r] = (e.text || "").split("\n\n"), i = e.runs || [e.ts], a = n.replace(/^⏰\s*/, ""), o = a.match(/^\*\*(.+?)\*\*\s*(.*)$/), c = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? Zr(e) : `${new Date(e).toLocaleDateString(s, {
		day: "numeric",
		month: "short"
	})} ${Zr(e)}`;
	return `<div class="msg remMsg" id="m${e.id}">${Di(e.id)}<div class="body"><details><summary>${C("clock", 14)}<span class="remT">${o ? `<b>${f(o[1])}</b> ${f(o[2])}` : f(a)}</span><span class="remWhen" title="${f(new Date(e.ts).toLocaleString(s))}">${i.length > 1 ? `${l("rodou {n}×", { n: i.length })} · ` : ""}${c(e.ts)}</span></summary>${r.length ? `<div class="txt">${v(he(r.join("\n\n")))}</div>` : ""}${i.length > 1 ? `<small class="remRuns">${i.map(c).join(" · ")}</small>` : ""}</details>${t ? "" : (e.group || [e]).map((e) => ni(e.id)).join("")}</div></div>`;
}
var Ti = (e) => e.author === "ai" && (e.tag === "notice" || e.tag === "done" || /^↩ (Reabri|I reopened)/.test(e.text || ""));
function Ei(e) {
	let t = (e.text || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim(), n = new Date(e.ts).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? Zr(e.ts) : `${new Date(e.ts).toLocaleDateString(s, {
		day: "numeric",
		month: "short"
	})} ${Zr(e.ts)}`;
	return `<div class="msg remMsg noticeMsg" id="m${e.id}">${Di(e.id)}<div class="body"><details><summary><span class="vibeMark" aria-hidden="true">✦</span><span class="remT">${v(f(t))}</span><span class="remWhen" title="${f(new Date(e.ts).toLocaleString(s))}">${n}</span></summary><div class="txt">${v(he(e.text || ""))}</div></details></div></div>`;
}
var Di = (e) => `<span class="mact"><button type="button" class="rbtn" data-copymsg="${e}" title="${l("Copiar")}" aria-label="${l("Copiar o texto desta mensagem")}">${C("copy", 14)} ${l("Copiar")}</button><button type="button" class="rbtn" data-copylink="${e}" title="${l("Copiar link")}" aria-label="${l("Copiar o link desta mensagem")}">${C("link", 14)} ${l("Copiar link")}</button><button type="button" class="rbtn" data-reply="${e}" title="${l("Responder")}" aria-label="${l("Responder a esta mensagem")}">${C("reply", 14)} ${l("Responder")}</button></span>`;
function Oi() {
	let e = document.getElementById("decPane");
	if (!e) return;
	let t = k.decisions || [];
	document.getElementById("decCount").textContent = t.length ? ` ${t.length}` : "", e.innerHTML = t.length ? t.slice().reverse().map((e) => `<div class="dec ${e.kind === "approval" ? "approval" : ""}"><div>${f(e.text)}<small>${e.kind === "approval" ? `✓ ${l("aprovado")}` : l("decidido")} · ${f(e.who)} · ${_(e.ts)}</small></div>
      <button class="ghost x" data-ddel="${e.id}" aria-label="${l("Apagar registro")}" title="${l("Apagar registro")}">${C("x")}</button></div>`).join("") : `<div class="empty">${l("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.")}</div>`, e.querySelectorAll("[data-ddel]").forEach((e) => e.onclick = () => {
		confirm(l("Apagar esse registro?")) && j({
			t: "decision.del",
			id: Number(e.dataset.ddel)
		});
	});
}
function ki() {
	document.querySelector(".doc[data-pane=\"apps\"]") && q();
}
var G = null, Ai = null, ji = !1, K = null, Mi = /* @__PURE__ */ new Set();
async function Ni() {
	let e = k.id;
	try {
		let t = await y(`/api/books/${e}/connections`);
		k.id === e && (G = t.connections, Ai = e);
	} catch (e) {
		G ||= [], R(f(e.message));
	}
	q();
}
var Pi = (e) => e.scope === "me" ? `<span class="cScope me">${l("minha")}</span>` : `<span class="cScope">${l("da sala")}</span>`;
function Fi() {
	let e = /* @__PURE__ */ new Set();
	return (k.files || []).filter((t) => t.type === "text/html" && /^apps\/[\w.-]+\.html$/i.test(t.name) && !e.has(t.name) && e.add(t.name)).map((e) => ({
		tool: e.name.slice(5, -5),
		title: e.name.slice(5, -5),
		description: `${h(e.author)} · ${_(e.ts)}`,
		file: e
	}));
}
function Ii() {
	document.querySelector(".doc[data-pane=\"apps\"]") && !(K && document.querySelector(".connFrame")) && q();
}
function q() {
	let e = document.getElementById("appsPane");
	if (!e) return;
	if (Ai !== k.id && (G = null, Ai = k.id), k.filesAll || j({ t: "files.get" }), G === null) {
		e.innerHTML = `<div class="empty">${l("Carregando…")}</div>`, Ni(), G = void 0;
		return;
	}
	if (G === void 0) return;
	let t = Fi();
	if (document.getElementById("appCount").textContent = G.length + t.length ? ` ${G.length + t.length}` : "", K) return Li(e);
	let n = document.getElementById("connForm") && Object.fromEntries(new FormData(document.getElementById("connForm"))), r = (e, t) => `<div class="connApps">${t.map((t) => `<button type="button" class="connApp" data-conn-open="${e}/${f(t.tool)}"><b>${f(t.title)}</b><span>${f(t.description)}</span></button>`).join("")}</div>`;
	e.innerHTML = `<div class="connHead"><b>Apps</b>${ji ? "" : `<button type="button" class="ghost" id="connAdd">${C("plus", 15)} ${l("Conectar MCP")}</button>`}</div>
    ${ji ? `<form class="connForm" id="connForm">
      <label>${l("URL do servidor MCP")}<input name="url" required placeholder="https://…/mcp" autocomplete="off" spellcheck="false"></label>
      <small class="mute">${l("Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.")}</small>
      <fieldset><label><input type="radio" name="scope" value="me" checked> ${l("Só minha: só eu e meus agents")}</label><label><input type="radio" name="scope" value="room"> ${l("Da sala: todo mundo vê; cada um entra com a própria conta")}</label></fieldset>
      <div class="acts"><button type="button" id="connCancel">${l("Cancelar")}</button><button class="primary">${l("Conectar")}</button></div></form>` : ""}
    <div class="conn"><div class="connTop"><b>${l("Esta sala")}</b><span class="cScope">${l("da sala")}</span><small>apps/*.html</small></div>
      ${t.length ? r("room", t) : `<small class="mute">${l("Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.")}</small>`}</div>
    ${G.map((e) => `<div class="conn"><div class="connTop"><b>${f(e.title)}</b>${Pi(e)}<small>${f(e.host)} · ${f(h(e.owner))}</small>
        <button type="button" class="ghost" data-conn-ref="${e.id}" title="${l("Atualizar")}" aria-label="${l("Atualizar")}">↻</button>${e.mine ? `<button type="button" class="ghost" data-conn-del="${e.id}" title="${l("Remover conexão")}" aria-label="${l("Remover conexão")}">${C("x", 14)}</button>` : ""}</div>
        ${e.auth === "identity" ? e.signed_in ? `<small class="mute connWho">${l("Você entrou em {host} com a sua conta.", { host: f(e.host) })} <button type="button" class="link" data-conn-out="${e.id}">${l("Sair")}</button></small>` : `<div class="connSign"><small>${l("Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.", { host: f(e.host) })}</small><a class="primary" href="/api/books/${k.id}/connections/${e.id}/signin">${l("Entrar em {host}", { host: f(e.host) })}</a></div>` : ""}
        ${(e.pending || []).map((t) => `<div class="connPend"><span>🔐 <b>${f(h(t.requester))}</b>${t.via === "agent" ? ` ${l("(pelo agent)")}` : ""} ${l("quer usar")} <code>${f(t.tool)}</code></span><small>${f(String(t.args || "").slice(0, 160))}</small><div><button type="button" class="primary" data-pend="${e.id}/${t.id}/1">${l("Aprovar")}</button><button type="button" class="ghost" data-pend="${e.id}/${t.id}/0">${l("Negar")}</button></div></div>`).join("")}${e.apps.length ? (() => {
		let t = e.apps.filter((e) => e.screen), n = t.length && !Mi.has(e.id);
		return r(e.id, n ? t : e.apps) + (t.length && t.length < e.apps.length ? `<button type="button" class="link connMore" data-conn-more="${e.id}">${n ? l("ver todas ({n})", { n: e.apps.length }) : l("só as telas")}</button>` : "");
	})() : `<small class="mute">${l("{n} tools, nenhum app", { n: e.tools.length })}</small>`}</div>`).join("")}`;
	let i = document.getElementById("connForm");
	if (i && n) for (let [e, t] of Object.entries(n)) i.elements[e] && e !== "scope" && (i.elements[e].value = t);
	document.getElementById("connAdd")?.addEventListener("click", () => {
		ji = !0, q(), document.querySelector("#connForm [name=\"url\"]")?.focus();
	}), document.getElementById("connCancel")?.addEventListener("click", () => {
		ji = !1, q();
	}), i && (i.onsubmit = async (e) => {
		e.preventDefault();
		let t = i.querySelector(".primary");
		t.disabled = !0, t.textContent = l("Conectando…");
		try {
			let e = await y(`/api/books/${k.id}/connections`, {
				url: i.url.value.trim(),
				scope: i.scope.value
			});
			if (e.connection?.needs_sign_in) return void (location.href = `/api/books/${k.id}/connections/${e.connection.id}/signin`);
			ji = !1, G = null, q();
		} catch (e) {
			R(f(e.message)), t.disabled = !1, t.textContent = l("Conectar");
		}
	}), e.querySelectorAll("[data-pend]").forEach((e) => e.onclick = async () => {
		let [t, n, r] = e.dataset.pend.split("/");
		e.disabled = !0;
		try {
			await y(`/api/books/${k.id}/connections/${t}/pending/${n}`, { approve: r === "1" });
		} catch (e) {
			R(f(e.message));
		}
		G = null, q();
	}), e.querySelectorAll("[data-conn-out]").forEach((e) => e.onclick = async () => {
		try {
			await y(`/api/books/${k.id}/connections/${e.dataset.connOut}/signout`, {});
		} catch (e) {
			R(f(e.message));
		}
		G = null, q();
	}), e.querySelectorAll("[data-conn-more]").forEach((e) => e.onclick = () => {
		let t = e.dataset.connMore;
		Mi.has(t) ? Mi.delete(t) : Mi.add(t), q();
	}), e.querySelectorAll("[data-conn-open]").forEach((e) => e.onclick = () => {
		let [t, n] = e.dataset.connOpen.split("/");
		K = {
			cid: t,
			tool: n
		}, q();
	}), e.querySelectorAll("[data-conn-ref]").forEach((e) => e.onclick = async () => {
		try {
			await y(`/api/books/${k.id}/connections/${e.dataset.connRef}/refresh`, {}), G = null, q();
		} catch (e) {
			R(f(e.message));
		}
	}), e.querySelectorAll("[data-conn-del]").forEach((e) => e.onclick = async () => {
		let t = G.find((t) => t.id === e.dataset.connDel);
		confirm(l("Remover a conexão {name}? Os apps dela saem da sala.", { name: t?.title || "" })) && (await fetch(`/api/books/${k.id}/connections/${e.dataset.connDel}`, { method: "DELETE" }), G = null, q());
	});
}
function Li(e) {
	let t = K.cid === "room", n = t ? {
		id: "room",
		scope: "room",
		title: l("Esta sala")
	} : G.find((e) => e.id === K.cid), r = t ? Fi().find((e) => e.tool === K.tool) : n?.apps.find((e) => e.tool === K.tool);
	if (!n || !r) {
		if (t && !k.filesAll) {
			e.innerHTML = `<div class="empty">${l("Carregando…")}</div>`;
			return;
		}
		return !t && !K.retried ? (K.retried = !0, G = null, q()) : (K = null, R(l("Esse app não está nas conexões que você pode usar nesta sala.")), q());
	}
	let i = `${n.id}/${r.tool}${t ? `@${r.file.id}` : ""}`, a = t ? r.tool : `${n.id}/${r.tool}`, o = e.querySelector(".connBar");
	if (e.querySelector(".connFrame")?.dataset.app === i) {
		o?.querySelector(".pinBtn")?.replaceWith(Object.assign(document.createElement("template"), { innerHTML: Qi("app", a) }).content), o && $i(o);
		return;
	}
	e.innerHTML = `<div class="connBar"><button type="button" class="ghost" id="connBack">← Apps</button><b>${f(r.title)}</b>${Pi(n)}${Qi("app", a)}<button type="button" class="ghost" id="connReload" title="${l("Recarregar")}" aria-label="${l("Recarregar")}">↻</button></div><div class="appAsk" id="appAsk" hidden></div><iframe class="connFrame" sandbox="allow-scripts allow-forms" title="${f(r.title)}"></iframe>`;
	let s = e.querySelector(".connFrame");
	s.dataset.app = i, document.getElementById("connBack").onclick = () => {
		K = null, q();
	}, $i(e.querySelector(".connBar")), document.getElementById("connReload").onclick = () => {
		s.dataset.app = "", Li(e);
	}, Ji(s, n, r);
}
var Ri = (e) => Array.isArray(e) ? e.filter((e) => e?.type === "text").map((e) => e.text).join("\n") : "", zi = (e) => ({
	content: [{
		type: "text",
		text: typeof e == "string" ? e : JSON.stringify(e)
	}],
	...e && typeof e == "object" ? { structuredContent: e } : {}
}), Bi = Promise.resolve();
function Vi(e, t, n) {
	let r = () => new Promise((r) => {
		if (!e?.isConnected) return r(!1);
		e.hidden = !1, e.innerHTML = `<span>${l("Este app quer {what}, como você:", { what: f(t) })}</span><q></q><div><button type="button" class="primary">${l("Permitir")}</button><button type="button" class="ghost">${l("Cancelar")}</button></div>`, e.querySelector("q").textContent = String(n).slice(0, 600);
		let i = (t) => {
			e.hidden = !0, e.innerHTML = "", r(t);
		};
		e.querySelector(".primary").onclick = () => i(!0), e.querySelector(".ghost").onclick = () => i(!1);
	});
	return Bi = Bi.then(r, r);
}
var Hi = [
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
function Ui({ thread: e = "main", limit: t = 50 } = {}) {
	let n = Y().filter((t) => t.thread === e).slice(-Math.min(Math.max(Number(t) || 50, 1), 100));
	return {
		room: {
			id: k.id,
			title: M()
		},
		me: {
			email: k.me,
			name: h(k.me)
		},
		members: (k.members || []).map((e) => ({
			email: e.email ?? e,
			name: h(e.email ?? e)
		})),
		doc: k.doc || "",
		epics: k.epics.filter((e) => !e.archived).map((e) => ({
			id: e.id,
			title: e.title,
			tasks: e.tasks.map((e) => ({
				id: e.id,
				title: e.title,
				status: e.status,
				owner: e.owner || null
			}))
		})),
		room_tasks: (k.roomTasks || []).map((e) => ({
			id: e.id,
			title: e.title,
			status: e.status
		})),
		messages: n.map((e) => ({
			id: e.id,
			from: e.author === "ai" ? "@vibe" : h(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
async function Wi(e, t = {}, n) {
	let r = (e) => zi(e), i = (e) => e && e !== "main" && !k.epics.some((t) => t.id === e) ? null : e || "main";
	switch (e) {
		case "vibebook_read": return r(Ui(t));
		case "vibebook_connections": return Array.isArray(G) || await Ni(), r((G || []).map((e) => ({
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
			} : await n(l("postar"), a) ? (j({
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
			let e = t.epic_id && t.epic_id !== "main" ? k.epics.find((e) => e.id === t.epic_id) : null;
			if (t.epic_id && t.epic_id !== "main" && !e) return {
				isError: !0,
				content: [{
					type: "text",
					text: "no such epic"
				}]
			};
			let i = String(t.title || "").trim().slice(0, 200);
			return !i || !await n(l("criar uma tarefa"), `${e ? e.title : l("sala principal")}: ${i}`) ? {
				isError: !0,
				content: [{
					type: "text",
					text: "cancelled"
				}]
			} : (j({
				t: "task.add",
				epic: e ? e.id : "main",
				title: i
			}), r("added"));
		}
		case "vibebook_task_status": {
			let e = [...k.epics.flatMap((e) => e.tasks), ...k.roomTasks || []].find((e) => e.id === t.task_id);
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
			} : await n(l("mover uma tarefa"), `${e.title} → ${t.status}`) ? (j({
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
			Array.isArray(G) || await Ni();
			let e = (G || []).find((e) => e.id === t.connection_id), r = e?.tools.find((e) => e.name === t.tool);
			return r ? await n(l("usar {tool} em {conn}", {
				tool: r.name,
				conn: e.title
			}), JSON.stringify(t.arguments || {})) ? (await y(`/api/books/${k.id}/connections/${e.id}/call`, {
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
var Gi = /* @__PURE__ */ new WeakMap();
function Ki(e, t) {
	let n = (t) => e.contentWindow?.postMessage({
		jsonrpc: "2.0",
		...t
	}, "*"), r = (e, n) => Vi(t.ask(), e, n), i = (e, n) => t.call ? t.call(e, n || {}) : Wi(e, n || {}, r), a = () => document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches;
	return async (o) => {
		let c = (e) => o.id !== void 0 && n({
			id: o.id,
			result: e
		});
		try {
			switch (o.method) {
				case "ui/initialize": {
					let n = e.getBoundingClientRect();
					return c({
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
							locale: s,
							timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							platform: B.matches ? "mobile" : "web",
							user: {
								email: k.me,
								name: h(k.me)
							},
							room: {
								id: k.id,
								title: M()
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
				case "tools/list": return c({ tools: t.call ? [] : Hi });
				case "tools/call": return c(await i(o.params?.name, o.params?.arguments));
				case "ui/open-link": {
					let e = String(o.params?.url || "");
					return !/^https?:\/\//i.test(e) || !await r(l("abrir um link"), e) ? c({ isError: !0 }) : (window.open(e, "_blank", "noopener"), c({}));
				}
				case "ui/message": {
					let e = Ri(o.params?.content).trim().slice(0, 4e3);
					return c(e ? await Wi("vibebook_post", {
						text: e,
						thread: t.thread ?? A
					}, r) : {});
				}
				case "ui/update-model-context": {
					let e = Ri(o.params?.content) || (o.params?.structuredContent ? JSON.stringify(o.params.structuredContent) : "");
					return e && t.base && y(`${t.base}/context`, {
						tool: t.toolName,
						text: e.slice(0, 4e3)
					}).catch(() => {}), c({});
				}
				case "ui/request-display-mode": return c({ mode: t.embed ? "inline" : "fullscreen" });
				case "ping": return c({});
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
function qi(e) {
	if (!Gi.has(e)) {
		let t = e.closest(".embedBox"), n = A;
		Gi.set(e, Ki(e, {
			embed: !0,
			thread: n,
			ask: () => t.querySelector(".appAsk") || t.appendChild(Object.assign(document.createElement("div"), {
				className: "appAsk",
				hidden: !0
			}))
		}));
	}
	return Gi.get(e);
}
addEventListener("message", (e) => {
	let t = e.data;
	if (!t || !k || e.origin !== "null") return;
	let n = document.querySelector(".connFrame"), r = n?.contentWindow === e.source ? n : [...document.querySelectorAll("iframe.embed")].find((t) => t.contentWindow === e.source);
	if (r) {
		if (t.vbEmbed === 1) return qi(r)(typeof t.h == "number" ? {
			method: "ui/notifications/size-changed",
			params: { height: t.h }
		} : {
			method: "ui/message",
			params: { content: [{
				type: "text",
				text: String(t.send || "")
			}] }
		});
		t.jsonrpc === "2.0" && typeof t.method == "string" && (Gi.get(r) || qi(r))(t);
	}
});
async function Ji(e, t, n) {
	let r = t.id === "room", i = `/api/books/${k.id}/connections/${t.id}`, a = () => document.getElementById("appAsk");
	if (r) {
		Gi.set(e, Ki(e, {
			ask: a,
			tool: {
				name: n.tool,
				title: n.title
			},
			first: Promise.resolve(zi(Ui()))
		})), e.src = `/api/books/${k.id}/files/${n.file.id}`;
		return;
	}
	let o;
	try {
		o = await y(`${i}/ui?tool=${encodeURIComponent(n.tool)}`);
	} catch (t) {
		let n = document.createElement("div");
		n.className = "empty", n.textContent = t.message, e.replaceWith(n);
		return;
	}
	let s = (e, t) => y(`${i}/call`, {
		name: e,
		arguments: t
	}).then((e) => e.result), c = s(n.tool, {}).catch((e) => ({
		isError: !0,
		content: [{
			type: "text",
			text: e.message
		}]
	}));
	Gi.set(e, Ki(e, {
		ask: a,
		call: s,
		first: c,
		tool: o.tool,
		base: i,
		toolName: n.tool
	})), e.srcdoc = o.html;
}
function Yi() {
	let e = document.getElementById("remPane");
	if (!e || !k) return;
	Mr();
	let t = k.reminders || [], n = t.filter((e) => e.error).length;
	document.getElementById("remCount").textContent = t.length ? ` ${t.length}${n ? " ⚠" : ""}` : "", Lt("reminders", e, {
		room: k,
		thread: A,
		vb: zt(),
		send: j
	});
}
function Xi() {
	let e = document.getElementById("filesPane");
	if (!e || !k) return;
	Mr();
	let t = k.filesN ?? k.files?.length ?? 0;
	document.getElementById("fileCount").textContent = t ? ` ${t}` : "", Lt("files", e, {
		room: k,
		thread: A,
		vb: zt(),
		send: j
	});
}
var Zi = (e, t) => (k.pins || []).find((n) => n.kind === e && n.ref === t), Qi = (e, t) => {
	let n = !!Zi(e, t);
	return `<button type="button" class="ghost pinBtn${n ? " on" : ""}" data-pin-kind="${e}" data-pin-ref="${f(t)}" title="${l(n ? "Desafixar" : "Fixar na lateral")}" aria-label="${l(n ? "Desafixar" : "Fixar na lateral")}" aria-pressed="${n}">${C("pin", 14)}</button>`;
};
function $i(e) {
	e.querySelectorAll("[data-pin-kind]").forEach((e) => e.onclick = (t) => {
		t.preventDefault(), t.stopPropagation();
		let n = Zi(e.dataset.pinKind, e.dataset.pinRef);
		j(n ? {
			t: "pin.del",
			id: n.id
		} : {
			t: "pin.add",
			kind: e.dataset.pinKind,
			ref: e.dataset.pinRef
		});
	});
}
var ea = 60, J = {
	thread: null,
	n: ea
}, ta = {}, na = !1, ra = /* @__PURE__ */ new Set(), Y = () => k.origins?.length ? [...k.messages, ...k.origins.filter((e) => !k.messages.some((t) => t.id === e.id))] : k.messages, ia = !1;
function aa() {
	if (!k) return;
	let e = `/b/${k.id}${A !== "main" && !P() ? `?t=${encodeURIComponent(A)}` : ""}`;
	location.pathname + location.search !== e && history[ia ? "pushState" : "replaceState"](null, "", e), ia = !0;
}
function oa() {
	let e = document.getElementById("thFiles");
	if (!e) return;
	let t = /* @__PURE__ */ new Map();
	if (A !== "main" && !P()) {
		for (let e of Y()) if (e.thread === A) for (let n of e.files || []) {
			let r = t.get(n.name);
			r ? (r.n++, e.ts > r.ts && (r.f = n, r.ts = e.ts)) : t.set(n.name, {
				f: n,
				ts: e.ts,
				n: 1
			});
		}
	}
	let n = [...t.values()].sort((e, t) => t.ts - e.ts).slice(0, 8);
	e.hidden = !n.length, e.innerHTML = n.length ? `<span class="thfL">${C("paperclip", 14)} ${l("Arquivos deste épico")}</span>${n.map(({ f: e, n: t }) => `<a href="${Lr(e)}" target="_blank" rel="noopener" ${Rr(e)} title="${f(e.name)}">${kt(e, 14)}<span>${f(e.name)}</span>${t > 1 ? `<small>v${t}</small>` : ""}</a>`).join("")}` : "";
}
function X(e) {
	Sr(), oa(), aa(), ci(), Ir();
	let t = document.getElementById("msgs");
	if (d.querySelector(".book")?.classList.toggle("pre", P()), P()) {
		let e = Ft.get("chat");
		return e && (e.destroy(), Ft.delete("chat")), yn(t);
	}
	if (J.thread !== A || J.room !== k.id) {
		let e = d.querySelector(".book"), t = fr(A).some((e) => e.ref.startsWith("t")) || !!k.epics.find((e) => e.id === A)?.tasks.some((e) => !e.done && e.owner === k.me);
		A !== "main" && e?.classList.contains("nodoc") && !e.classList.contains("boardview") && (t || !k.messages.some((e) => e.thread === A)) && e.classList.remove("nodoc"), (A !== "main" || fr(A).length) && setTimeout(() => {
			let e = [...document.querySelectorAll(".task.waitTask, .msg.waitMsg .txt")];
			e.length || (e = [...document.querySelectorAll(".task.mine")]), e[0]?.classList.contains("task") && e[0].scrollIntoView({
				block: "center",
				behavior: "smooth"
			}), e.forEach((e) => {
				e.classList.remove("shimmer"), e.offsetWidth, e.classList.add("shimmer");
			});
		}, 400);
	}
	(J.thread !== A || J.room !== k.id) && (J = {
		thread: A,
		room: k.id,
		n: ea
	});
	let n = k.messages.filter((e) => e.thread === A && !vi(e) && !_i(e) && !_i(k.messages.find((t) => t.id === e.reply_to)));
	Mt && n.length < ea && !na && !k.complete && !k.full?.includes(A) && !ta[k.id + A] && !ra.has(k.id + A) && (ra.add(k.id + A), na = !0, j({
		t: "older",
		thread: A,
		before: n[0]?.id ?? 0
	}));
	let r = Si(n.slice(-J.n)), i = n.length > r.length || n.length && !k.complete && !k.full?.includes(A) && !ta[k.id + A], a = t.scrollHeight, o = t.scrollTop, s = k.epics.find((e) => e.id === A)?.from_msg, c = s && (k.messages.find((e) => e.id === s) || k.origins?.find((e) => e.id === s)), l = k.counts ? (k.counts[A] ?? 0) + n.filter((e) => e.id > (k.countsAt ?? 0)).length : n.length;
	Lt("chat", t, {
		room: k,
		thread: A,
		list: r,
		previous: n[n.length - r.length - 1],
		more: i,
		origin: c || null,
		replyCount: l,
		vb: Bt(),
		onloadolder: ca
	}), dr(), ii(), e === "stay" ? (t.scrollTop = o, ua(), pa(t)) : e ? (t.scrollTop = o + t.scrollHeight - a, ua(), pa(t)) : (ma(!0), pa(t), ua());
}
function sa() {
	let e = k.messages.filter((e) => e.thread === A);
	na = !0, j({
		t: "older",
		thread: A,
		before: e[0]?.id ?? 0
	});
}
function ca() {
	if (na || P()) return;
	let e = k.messages.filter((e) => e.thread === A);
	if (e.length > J.n) return J.n += ea, X(!0);
	k.complete || k.full?.includes(A) || ta[k.id + A] || !e.length || (na = !0, j({
		t: "older",
		thread: A,
		before: e[0].id
	}));
}
var la = (e) => String(e ?? "").replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function ua() {
	let e = document.getElementById("msgs");
	if (!e) return;
	e.querySelectorAll(".mfoot").forEach((e) => e.remove());
	let t = {}, n = (e) => t[e] ??= {
		st: [],
		rd: []
	}, r = (e) => l("{via} de {who}", {
		via: f(la(e.who)),
		who: f(h(e.email))
	}), i = /* @__PURE__ */ new Set();
	for (let e of k.acks || []) {
		if (e.status === "dismissed") continue;
		let t = `${e.msg_id}|${e.who}|${e.email}`;
		if (i.has(t)) continue;
		i.add(t);
		let a = e.status === "doing" && Date.now() - e.ts < 12e5, o = r(e), c = `<time title="${f(new Date(e.ts).toLocaleString(s))}">${_(e.ts)}</time>`, u, d, p;
		if (e.status === "blocked") u = "need", d = "⏸", p = `${l("{who} espera você no terminal", { who: o })}${e.note ? `: <b>${f(e.note)}</b>` : ""} · ${c}`;
		else if (a) u = "doing", d = "<span class=\"spin\"></span>", p = `${l("{who} está fazendo isso", { who: o })} · ${c}`;
		else if (e.status === "done") u = "did", d = "✓", p = l("{who} fez isso", { who: o });
		else {
			let t = [...new Set((k.epics || []).filter((t) => t.from_msg === e.msg_id && !t.archived).flatMap((e) => e.tasks.filter((e) => e.status !== "done" && e.owner).map((e) => h(e.owner))))];
			t.length ? (u = "wait", d = "⏳", p = l("aguardando {who}", { who: t.map(f).join(", ") })) : (u = "idle", d = "–", p = `${l("{who} parou", { who: o })} · ${c}`);
		}
		n(e.msg_id).st.push(`<span class="ms ${u}"><i>${d}</i><span>${p}</span></span>`);
	}
	let a = k.messages.filter((e) => e.thread === A);
	for (let e of k.receipts || []) {
		let t = a.findLast((t) => t.id <= Math.max(e.read, e.delivered) && (t.kind !== "agent" || t.author !== e.email));
		if (!t || i.has(`${t.id}|${e.who}|${e.email}`)) continue;
		let o = e.read >= t.id, s = r(e);
		n(t.id).rd.push(`<span class="${o ? "rd" : ""}" title="${l(o ? "lido por {who}" : "entregue, ainda não lido por {who}", { who: s })}">${o ? "✓✓" : "✓"} ${f(la(e.who))}</span>`);
	}
	for (let [e, n] of Object.entries(t)) {
		let t = document.querySelector(`#m${e} .body`);
		t && t.insertAdjacentHTML("beforeend", `<div class="mfoot">${n.st.join("")}${n.rd.length ? `<span class="mr">${n.rd.join("")}</span>` : ""}</div>`);
	}
}
function da(e) {
	X(Z || e.author === k.me && e.kind !== "agent" ? void 0 : "stay");
}
var Z = !0, fa = new ResizeObserver(() => {
	let e = document.getElementById("msgs");
	e && Z && (e.scrollTop = e.scrollHeight);
});
function pa(e) {
	e && (e.classList?.contains("msg") ? [e] : e.querySelectorAll(".msg")).forEach((e) => fa.observe(e));
}
function ma(e) {
	let t = document.getElementById("msgs");
	if (t) {
		t.onscroll ??= () => {
			t.scrollHeight - t.scrollTop - t.clientHeight < 80 ? Z = !0 : t.scrollTop < (t._lastTop ?? 0) - 2 && (Z = !1), t._lastTop = t.scrollTop, t.scrollTop < 150 && !Z && ca();
		}, fa.observe(t), t._mo ??= new MutationObserver((e) => {
			for (let t of e) t.addedNodes.forEach((e) => e.nodeType === 1 && fa.observe(e));
			Z && (t.scrollTop = t.scrollHeight);
		}), t._mo.observe(t, { childList: !0 });
		for (let e of t.children) fa.observe(e);
		e && (Z = !0), (e || t.scrollHeight - t.scrollTop - t.clientHeight < 200) && (t.scrollTop = t.scrollHeight);
	}
}
var ha = "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js", ga, _a = () => ga ??= new Promise((e, t) => {
	let n = Object.assign(document.createElement("script"), {
		src: ha,
		crossOrigin: "anonymous",
		integrity: "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA"
	});
	n.onload = () => e(window.pele), n.onerror = () => {
		ga = null, t();
	}, document.head.append(n);
});
async function va(e) {
	let t = [...e.querySelectorAll("pre > code.language-mermaid")];
	if (!t.length) return;
	let n = await _a().catch(() => null);
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
			i.classList.add("err"), i.textContent = `${l("Diagrama com erro")}${e.line ? ` ${l("na linha {n}", { n: e.line })}` : ""}: ${e.message}`;
		}
		t.parentElement.replaceWith(i);
	});
}
function ya(e, t) {
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
var Q = !1, ba = null, xa = /* @__PURE__ */ new Set(), Sa = () => !Q && !P() && k.epics.some((e) => e.id === A) ? A : null;
function $(e) {
	let t = document.getElementById("doc");
	if (!t) return;
	k.docs ??= {};
	let n = Sa(), r = n && k.epics.find((e) => e.id === n);
	n && !(n in k.docs) && !xa.has(k.id + n) && (xa.add(k.id + n), j({
		t: "doc.get",
		epic: n
	}));
	let i = n ? k.docs[n] || `# ${r.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n` : k.doc;
	ba !== (n || "room") && (e = !0, ba = n || "room"), on();
	let a = !P() && k.epics.find((e) => e.id === A), o = document.getElementById("docCrumb");
	o.hidden = !a, a && (o.innerHTML = `<button type="button" class="${n ? "" : "sel"}" data-docroom="1">${f(M())}</button><span>›</span><button type="button" class="${n ? "sel" : ""}" data-docroom="">${f(a.title)}</button>`, o.querySelectorAll("button").forEach((e) => e.onclick = () => {
		Q = !!e.dataset.docroom, $(!0);
	}));
	let s = document.getElementById("preview"), c = document.getElementById("tasks");
	c && document.getElementById("tasksHome").append(c), s.innerHTML = i.trim() ? DOMPurify.sanitize(marked.parse(i, {
		breaks: !0,
		gfm: !0
	}), {
		...me,
		FORBID_TAGS: me.FORBID_TAGS.filter((e) => e !== "img"),
		ADD_ATTR: ["target"]
	}) : `<div class="empty">${l("Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.")}</div>`, s.querySelectorAll("a").forEach((e) => {
		e.target = "_blank", e.rel = "noopener noreferrer nofollow ugc";
	}), !n && k.docNotes?.length && s.insertAdjacentHTML("afterbegin", `<div class="docNotes" title="${l("@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).")}">${k.docNotes.map((e) => `<span class="vnote">${C("alert", 12)} ${f(e)}</span>`).join("")}</div>`), va(s), ya(s, n || (A === "main" && k.roomTasks?.length ? "main" : null)), Mr(), (e || document.activeElement !== t) && (t.value = i);
}
var Ca = 3e5;
function wa() {
	try {
		return localStorage.getItem("vb.lock");
	} catch {
		return null;
	}
}
var Ta = (e) => crypto.getRandomValues(new Uint8Array(e)), Ea = () => navigator.credentials.get({ publicKey: {
	challenge: Ta(32),
	allowCredentials: [{
		type: "public-key",
		id: Uint8Array.from(atob(wa()), (e) => e.charCodeAt(0))
	}],
	userVerification: "required",
	hints: ["client-device"],
	timeout: 6e4
} });
async function Da(e, t) {
	if (!e) {
		localStorage.removeItem("vb.lock");
		return;
	}
	let n = await navigator.credentials.create({ publicKey: {
		challenge: Ta(32),
		rp: { name: "vibebook" },
		user: {
			id: Ta(16),
			name: t,
			displayName: l("vibebook (trava do app)")
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
function Oa() {
	if (!wa() || document.getElementById("lockScreen")) return;
	let e = document.createElement("div");
	e.id = "lockScreen", e.innerHTML = `<img src="/favicon.svg" alt="" width="64" height="64" /><b>vibebook</b><button class="primary">${l("Desbloquear com Face ID")}</button><p class="err" hidden></p>`, document.body.append(e);
	let t = async () => {
		try {
			await Ea(), e.remove();
		} catch {
			let t = e.querySelector(".err");
			t.hidden = !1, t.textContent = l("Toque pra tentar de novo.");
		}
	};
	e.querySelector("button").onclick = t;
}
var ka = 0;
document.addEventListener("visibilitychange", () => {
	document.hidden ? ka = Date.now() : ka && Date.now() - ka > Ca && Oa();
}), Oa(), Ke();
