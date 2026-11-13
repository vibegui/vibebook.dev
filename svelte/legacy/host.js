import {canAnswer,choicesOf} from "../features/chat-interactive/model";
import {EMOJI,emojify} from "../../shared/emoji";
import {adaptLegacyChatMarkup} from "../features/chat/legacyMarkup";
import {createFilesSession} from "../features/files/session";
import { messageIdentity } from "../features/home/model";
import { createPersonalConnection } from "../features/home/connection";
import { createHomeApi } from "../features/home/api";
import { createPersonalSession } from "../features/home/personal";
import { createRoomsSession } from "../features/rooms/session";
import { createAppNavigationSession } from "../features/app-navigation/controller";
import { createApplicationRouter, roomIdFromPath } from "../features/app-navigation/router";
// Existing host integrations retained during the incremental TypeScript migration.
// Native room views and wire contracts live in the typed modules alongside this file.
import * as UI from "../main";
import { syncNavigationSession } from "../features/navigation/session";
import {
  syncPinsSession,
  disposePinsSession,
  requestPinnedFiles,
} from "../features/pins/session";
import { createUiNavigation } from "../navigation";
import {
  getBoardContainer,
  moveBoardContainer,
  watchBoardLayout,
} from "./boardLayout";
import { uiNavigationUrl } from "../../shared/uiVariant";
const navigation = createUiNavigation(history, () => location.href, "svelte");
import { createRoomApi } from "../transport";
import { createRoomConnection } from "../roomConnection";
// i18n: the Portuguese string is the key; EN has the English, anything missing falls back to Portuguese.
// Language = the vb_lang cookie (set by the landing and the PT · EN switch), else the browser's.
const LANG =
  document.cookie.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] ||
  (/^pt/i.test(navigator.language)
    ? "pt"
    : /^en/i.test(navigator.language)
      ? "en"
      : "pt");
document.documentElement.lang = LANG === "en" ? "en" : "pt-BR";
const LOCALE = LANG === "en" ? "en-US" : "pt-BR";
const EN = {
  "Gráfico": "Chart",
  "Escolha uma opção": "Choose an option",
  "Ainda sem confirmação. Confira a sala antes de enviar novamente.": "Still unconfirmed. Check the room before sending again.",
  "Tentar novamente": "Try again",
  "online": "online",
  "offline": "offline",
  "visto por {n}": "seen by {n}",
  "visto por {n} de {m}": "seen by {n} of {m}",
  "leu": "read",
  "recebeu": "delivered",
  "Email inválido.": "Invalid email.",
  "Esta pessoa já está na sala.": "This person is already in the room.",
  "Não deu pra enviar agora. Tente de novo.": "Couldn't send it now. Try again.",
  "Use um link http ou https válido.": "Enter a valid http or https link.",
  "Sem conexão. Seu rascunho foi mantido.":
    "Offline. Your draft has been kept.",
  "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.":
    "Still unconfirmed. Check the pinned items before trying again.",
  "Não deu pra atualizar os fixados. Tente de novo.":
    "Couldn't update pinned items. Try again.",
  "Aguardando confirmação…": "Waiting for confirmation…",
  "Link inválido": "Invalid link",
  "Arquivo indisponível": "File unavailable",
  "App indisponível": "App unavailable",
  "Item indisponível": "Item unavailable",
  "Este link já está nos fixados.": "This link is already pinned.",
  "Carregando arquivo…": "Loading file…",
  "Carregar arquivo": "Load file",
  "Tentar carregar novamente": "Try loading again",
  "Não deu pra resolver agora. Tente de novo.":
    "Couldn't resolve this request. Try again.",
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
  "Não achei essa mensagem nesta sala.":
    "Couldn't find that message in this room.",
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
  "O agent de quem pegar a tarefa também vê isso.":
    "Whoever's agent picks up the task sees this too.",
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
  "Seus vibebooks e seus amigos te esperando.":
    "Your vibebooks and your friends are waiting.",
  "Continuar com GitHub": "Continue with GitHub",
  "Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.":
    "That didn't work with GitHub (it needs a verified primary email). Try email.",
  "Continuar com Google": "Continue with Google",
  "ou com email": "or with email",
  "Seu email": "Your email",
  "voce@gmail.com": "you@gmail.com",
  "Mandar código": "Send code",
  "Confere seu email": "Check your email",
  "Mandamos um código de 6 dígitos para <b>{email}</b>.":
    "We sent a 6-digit code to <b>{email}</b>.",
  Código: "Code",
  "usar outro email": "use another email",
  "Algo deu errado. Tenta de novo.": "Something went wrong. Try again.",
  "Não deu certo com o Google. Tenta com email.":
    "Google sign-in didn't work. Try with email.",
  Outros: "Other",
  Áudios: "Audio",
  "só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.":
    "only images (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv and audio.",
  "áudio maior que 50MB.": "audio larger than 50MB.",
  Tudo: "All",
  "{n} versões": "{n} versions",
  "Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.":
    "No token here: if the server asks for a sign-in, each person signs in with their own account, and vibebook only says who they are and from which room.",
  "Da sala: todo mundo vê; cada um entra com a própria conta":
    "Room: everyone sees it; each one signs in with their own account",
  "Você entrou em {host} com a sua conta.":
    "You're signed in to {host} with your account.",
  Sair: "Sign out",
  "Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.":
    "Sign in to {host} with your account to use it. vibebook keeps no token: it only says who you are and from which room.",
  "Entrar em {host}": "Sign in to {host}",
  "Conectar seu agente": "Connect your agent",
  "Copiar prompt": "Copy prompt",
  "Copiado. Cole no Claude Code, dentro da pasta do projeto.":
    "Copied. Paste it into Claude Code, inside the project folder.",
  "Copie e cole no seu Claude Code:": "Copy and paste into your Claude Code:",
  "Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.":
    "Paste the prompt into your Claude Code: it installs the plugin and the CLI and joins here.",
  "Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.":
    "Paste into Claude Code (or another agent), inside the project folder: it installs the plugin and the CLI and joins this room.",
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
  "Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.":
    "A request, an idea, a task for someone… I'll find the right room and epic.",
  "Achar a sala →": "Find the room →",
  "Como seus amigos te chamam?": "What do your friends call you?",
  "O pessoal e os agents vão te chamar assim.":
    "People and agents will call you that.",
  "Seu nome": "Your name",
  Salvar: "Save",
  "Coloque sua foto": "Add your photo",
  "Assim o pessoal sabe na hora quando é você falando, e quando é o seu agent (✻).":
    "So people can tell at a glance when it's you talking, and when it's your agent (✻).",
  "Adicionar foto": "Add photo",
  "Oi, {name}": "Hi, {name}",
  amigo: "friend",
  amigos: "friends",
  Arquivo: "Archive",
  "Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent ao lado.":
    "No vibebooks yet. Create one, invite the people you work with and connect your agent on the side.",
  Arquivar: "Archive",
  "Arquivar {title}": "Archive {title}",
  "Ainda sem resumo. O @vibe escreve um quando a conversa andar.":
    "No summary yet. @vibe writes one once the conversation gets going.",
  Amigos: "Friends",
  "vibebook junto": "shared vibebook",
  "vibebooks juntos": "shared vibebooks",
  "na plataforma": "on vibebook",
  convidado: "invited",
  "Remover {email} dos amigos": "Remove {email} from friends",
  "Remover dos amigos": "Remove from friends",
  "Quem você convida para um vibebook vira amigo aqui.":
    "People you invite to a vibebook show up here as friends.",
  "email do amigo": "friend's email",
  "Email do amigo": "Friend's email",
  Convidar: "Invite",
  "Seu perfil": "Your profile",
  Novo: "New",
  "O que você quer resolver? Eu acho a sala e o épico certos.":
    "What do you want to get done? I'll find the right room and epic.",
  Notificações: "Notifications",
  "Seu nome:": "Your name:",
  "Remover {email} dos seus amigos? Os vibebooks em comum continuam.":
    "Remove {email} from your friends? Shared vibebooks stay.",
  "Enviando…": "Sending…",
  "Procurando a sala certa…": "Finding the right room…",
  "sala nova <b>“{title}”</b>": "new room <b>“{title}”</b>",
  "Mandar em {where}?": "Send to {where}?",
  "Criar {where}?": "Create {where}?",
  "Nenhuma sala parece a certa. Criar {where}?":
    "No room looks right. Create {where}?",
  Enviar: "Send",
  "esperando {who}": "waiting on {who}",
  Cancelar: "Cancel",
  "Outro lugar:": "Somewhere else:",
  "Arquivar “{title}”?": "Archive “{title}”?",
  "Sai da sua lista e do inbox do seu agent e vai pro <b>Arquivo</b>. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.":
    "It leaves your list and your agent's inbox and goes to the <b>Archive</b>. Nothing is deleted: everyone else in the room still sees it, and you can restore it anytime.",
  "Salas que você arquivou. Elas continuam existindo pra quem está nelas.":
    "Rooms you archived. They're still there for everyone else in them.",
  Voltar: "Back",
  "arquivada {ago}": "archived {ago} ago",
  abrir: "open",
  Restaurar: "Restore",
  "Nada arquivado.": "Nothing archived.",
  "conectado {ago}": "connected {ago} ago",
  "Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>":
    "Ask your agent: <i>“what's new on vibebook?”</i> or <i>“go to room X and tell Marina…”</i>",
  "Seus agents conectados": "Your connected agents",
  "usado {ago}": "used {ago}",
  "sem uso ainda": "not used yet",
  "uso desconhecido": "last use unknown",
  "Marcar todas menos a mais recente de cada":
    "Check all but the newest of each",
  "Remover selecionadas ({n})": "Remove selected ({n})",
  "Remover {n} conexões? Os agents delas perdem o acesso na hora.":
    "Remove {n} connections? Their agents lose access right away.",
  "Esperando você": "Waiting on you",
  "Tarefa sua esperando OK:": "Your task waiting for OK:",
  "Já resolvi (respondi em outro lugar, ou não é comigo)":
    "Done (I answered elsewhere, or it's not for me)",
  "Seu agent conectou.": "Your agent is connected.",
  "Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo.":
    "It can already see this room. Turn it on here with ✻ Turn on agent at the top.",
  "Ele já enxerga as suas salas.": "It can already see your rooms.",
  "Traga seu agent pra esta sala": "Bring your agent to this room",
  "Conecte seu agent": "Connect your agent",
  "Conecte sua conta do Claude": "Connect your Claude account",
  "O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:":
    "vibebook works with each person's own agent: it reads the room, talks to the other people's agents and asks you before acting. Paste this into <b>Claude Code</b>, inside the project folder:",
  Copiar: "Copy",
  "esperando seu agent conectar…": "waiting for your agent to connect…",
  "Claude.ai ou outro cliente": "Claude.ai or another client",
  "Configurações → Conectores → Adicionar conector personalizado, e cole":
    "Settings → Connectors → Add custom connector, and paste",
  "Claude Code só com o conector:": "Claude Code with just the connector:",
  "Passo a passo completo →": "Full step-by-step →",
  Copiado: "Copied",
  "Como você entra": "How you sign in",
  "Seu perfil: email, como você entra, sair":
    "Your profile: email, how you sign in, sign out",
  "Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.":
    "Google and GitHub sign in to the account of their email: a different email is a different account.",
  "último {d} · {n}×": "last {d} · {n}×",
  "Código por email": "Email code",
  "sempre funciona": "always works",
  "ainda não usou": "not used yet",
  "Link de convite": "Invite link",
  "Essa mensagem não tem texto pra copiar.":
    "This message has no text to copy.",
  "O navegador pediu um toque pra copiar.": "The browser wants a tap to copy.",
  "Copiar o texto desta mensagem": "Copy this message's text",
  "Não deu pra copiar: selecione o texto e copie.":
    "Couldn't copy: select the text and copy it.",
  "Selecione e copie": "Select and copy",
  Carregando: "Loading",
  "Você foi removido deste vibebook.": "You were removed from this vibebook.",
  "seus vibebooks": "your vibebooks",
  "Sem acesso a este vibebook. Peça para alguém de dentro te convidar.":
    "No access to this vibebook. Ask someone in it to invite you.",
  voltar: "back",
  "pensando ({mode})": "thinking ({mode})",
  "Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.":
    "Not sent: it looks like {reason}. Secrets don't go in the room, not for you and not for the agents. Use a secure channel.",
  "escolhendo o modelo": "picking the model",
  rápido: "fast",
  "com calma": "careful",
  "Notificações ligadas: clique pra silenciar":
    "Notifications on: click to mute",
  "Notificações silenciadas: clique pra ligar":
    "Notifications muted: click to turn on",
  "Ativar notificações de mensagem": "Turn on message notifications",
  "Notificações bloqueadas no navegador":
    "Notifications blocked in this browser",
  "Este navegador não tem notificações":
    "This browser doesn't support notifications",
  "As notificações estão bloqueadas pra vibebook.dev neste navegador. Clique no cadeado ao lado do endereço → Notificações → Permitir, e recarregue a página.":
    "Notifications are blocked for vibebook.dev in this browser. Click the lock next to the address → Notifications → Allow, and reload the page.",
  "Te mencionaram": "You were mentioned",
  "respondendo…": "replying…",
  anexo: "attachment",
  "Abrir documento": "Open document",
  "Fechar documento": "Close document",
  Renomear: "Rename",
  "Trocar de conversa": "Switch conversation",
  "Trocar de sala": "Switch room",
  "Ir pro seu agent desta sala no herdr":
    "Go to your agent for this room in herdr",
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
  "O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.":
    "The vibebook's doc. Everyone edits it; @vibe keeps it up to date with the decisions.",
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
  "{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.":
    "{owner} invited you here. Every important conversation gets a room on vibebook: the chat, the tasks and the project doc live together.",
  "Cada um traz o seu agent": "Everyone brings their own agent",
  "Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.":
    "You connect your agent, on your computer and with your permissions. It reads the room, picks up tasks, updates the epics and reports what it delivered. Only what <b>you</b> write is an instruction to it: everything else it reads as context.",
  "O contexto é de todo mundo": "The context is shared",
  "Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.":
    "Doc, files, decisions and tasks live in the room, and every agent reads the same context before acting. When someone hands off or is waiting on you, the room shows it.",
  "Conecte o seu agent": "Connect your agent",
  "Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.":
    "Paste this into <b>Claude Code</b>, inside the project folder. It installs vibebook, joins this room and listens.",
  Pular: "Skip",
  "Entrar na sala": "Enter the room",
  Próximo: "Next",
  "Seu agent já está conectado.": "Your agent is already connected.",
  "Ligue ele nesta sala com ✻ Ligar agent, no topo.":
    "Turn it on in this room with ✻ Turn on agent, at the top.",
  "Não consegui ler essa imagem.": "Couldn't read that image.",
  "Abrir menu": "Open menu",
  "Novo épico": "New epic",
  "{n} pedindo pra entrar": "{n} asking to join",
  "O @vibe sugere um épico": "@vibe suggests an epic",
  "Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo.":
    "It saw this in the conversation and thinks it's worth an epic, with the tasks below.",
  "Tarefas propostas": "Proposed tasks",
  "Criar épico": "Create epic",
  "Pedir pro meu agent": "Ask my agent",
  "Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.":
    "It becomes your request in the room: your agent checks it still makes sense, adjusts the doc and tasks and creates the epic.",
  Descartar: "Dismiss",
  "a pasta onde ele já abriu antes": "the folder where it opened before",
  "ligada a esta sala pelo arquivo .vibebook":
    "linked to this room by its .vibebook file",
  "a pasta com o nome da sala": "the folder named after the room",
  "pasta nova com o nome da sala, criada ao ligar":
    "a new folder named after the room, created when you turn it on",
  ouvindo: "listening",
  "não ouvindo": "not listening",
  "Ligar agent": "Turn on agent",
  "Abre em {path} ({how}).": "Opens in {path} ({how}).",
  "pasta da sala": "room folder",
  "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar.":
    "On, but none of your agents is listening to this room right now: it may be starting, busy with another task (vibebook herdr asks it to listen once it's free), or vibebook herdr isn't running. Click to turn off.",
  "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada).":
    "Your agent is on in this room. Click to turn off (closes its tab in herdr; the conversation can be resumed).",
  "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina.":
    "Opens a Claude Code of yours for this room in herdr, listening for messages. Needs vibebook herdr running on your machine.",
  "O vibebook herdr não está rodando nesta máquina.":
    "vibebook herdr isn't running on this machine.",
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
  "O andamento e a entrega aparecem aqui nesta thread.":
    "Progress and the delivery show up here in this thread.",
  "Alguém está esperando você aqui": "Someone is waiting on you here",
  "{n} coisas esperando você aqui": "{n} things waiting on you here",
  arquivado: "archived",
  "{who} está trabalhando aqui": "{who} is working here",
  "{who} está trabalhando": "{who} is working",
  "Recolher menu": "Collapse menu",
  "novo épico": "new epic",
  Arquivados: "Archived",
  Outro: "Other",
  "escolha e envie pela caixa de mensagem":
    "pick, then send from the message box",
  Todos: "All",
  "Esse épico não existe mais nesta sala.":
    "That epic is no longer in this room.",
  "Novo épico: escreva o título…": "New epic: type its title…",
  Épicos: "Epics",
  "Buscar salas, conversas e arquivos…":
    "Search rooms, conversations and files…",
  "Buscando nas conversas…": "Searching conversations…",
  "Nada nas conversas.": "Nothing in the conversations.",
  "Nas conversas": "In conversations",
  editar: "edit",
  Buscar: "Search",
  "Exigir Face ID ao abrir": "Require Face ID to open",
  "Pronto: o vibebook pede Face ID ao abrir neste aparelho.":
    "Done: vibebook asks for Face ID when it opens on this device.",
  "Face ID desligado neste aparelho.": "Face ID turned off on this device.",
  "Não deu pra usar o Face ID aqui.": "Couldn't use Face ID here.",
  "vibebook (trava do app)": "vibebook (app lock)",
  "Desbloquear com Face ID": "Unlock with Face ID",
  "Toque pra tentar de novo.": "Tap to try again.",
  "Conecte seu agent (o card acima diz como)":
    "Connect your agent (the card above shows how)",
  "Seu agent está aqui": "Your agent is here",
  "Seu agent está desligado nesta sala": "Your agent is off in this room",
  Ligar: "Turn on",
  "Começando a sala": "Starting the room",
  "Sala criada": "Room created",
  "Na sala: {who}": "In the room: {who}",
  "Só você aqui: convide em Pessoas": "Only you here: invite people in People",
  "O agent escreve o doc e cria os épicos":
    "Agent writes the doc and creates the epics",
  "Não achei {who} nos seus amigos: convide pelo email em Pessoas.":
    "Couldn't find {who} among your friends: invite them by email in People.",
  "O que é e com quem?": "What is it, and with whom?",
  "Ex.: viagem de avião pra SP com os dogs, eu e a Alexia":
    "E.g.: flying to São Paulo with the dogs, me and Alexia",
  "Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.":
    "It becomes the room's title and first message. Whoever you mention is invited, and your agent turns on in the room.",
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
  "Liberar: entra na sala e recebe o link por email":
    "Let in: joins the room and gets the link by email",
  liberar: "let in",
  "Recusar {email}": "Decline {email}",
  Recusar: "Decline",
  Pessoas: "People",
  pendente: "pending",
  "Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp":
    "Copy the invite message (room link + agent setup) to send on WhatsApp",
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
  "{email} entrou na sala e recebeu o link por email.":
    "{email} joined the room and got the link by email.",
  enviado: "sent",
  "Não deu para salvar a foto.": "Couldn't save the photo.",
  "Não deu para ler essa imagem.": "Couldn't read that image.",
  'Te convidei pro vibebook "{title}": {url}':
    'I invited you to the vibebook "{title}": {url}',
  "1. Entra com {email} (o convite chegou nesse email).":
    "1. Sign in with {email} (the invite went to that address).",
  "2. Manda isto pro seu Claude Code:": "2. Send this to your Claude Code:",
  "Convite enviado por email para <b>{email}</b>.":
    "Invite emailed to <b>{email}</b>.",
  "Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.":
    "Copied the message with the room link and the agent setup for {name}: paste it in WhatsApp.",
  'Não consegui copiar. Use "copiar" ao lado de {email} em Pessoas.':
    'Couldn\'t copy. Use "copy" next to {email} in People.',
  "A fazer": "To do",
  Fazendo: "Doing",
  "Esperando OK": "Waiting for OK",
  Feito: "Done",
  "Arraste, ou use ← →. Clique pra abrir o épico.":
    "Drag, or use ← →. Click to open the epic.",
  você: "you",
  "Nada a fazer.": "Nothing to do.",
  "Arraste um card pra cá.": "Drag a card here.",
  "nova tarefa": "new task",
  "Nova tarefa": "New task",
  Épico: "Epic",
  "Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.":
    "No epics or tasks yet. Create an epic in the sidebar, or ask your agent to organize the project into epics and tasks.",
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
  'Apagar o épico "{title}", as tasks e a discussão dele? Não dá pra desfazer.':
    'Delete the epic "{title}", its tasks and its discussion? This can\'t be undone.',
  Tarefas: "Tasks",
  Feita: "Done",
  "Clique para editar": "Click to edit",
  Responsável: "Owner",
  "sem dono": "no owner",
  Prazo: "Due date",
  "Apagar task": "Delete task",
  "nova task": "new task",
  "Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:":
    "Due (e.g. Fri, Wed 11pm, 11/06). Empty removes it:",
  "Abrir numa aba": "Open in a tab",
  Fechar: "Close",
  "Seu agent está ouvindo esta sala.": "Your agent is listening to this room.",
  "Seu agent ainda não está ouvindo.": "Your agent isn't listening yet.",
  "Abrindo seu agent no seu computador…":
    "Opening your agent on your computer…",
  "Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá.":
    "Check that vibebook herdr is running on your computer, or whether agent stopped at a question there.",
  "O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.":
    "vibebook herdr opens Claude Code in the room's folder; it takes a few seconds.",
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
  "Escreva aqui pra continuar: ele reabre.":
    "Write here to keep going: it reopens.",
  votação: "poll",
  "Abrir em tela cheia": "Open full screen",
  Tabela: "Table",
  "Ver a mensagem respondida": "See the message being replied to",
  "mensagem anterior": "earlier message",
  "Respondendo a <b>{who}</b>": "Replying to <b>{who}</b>",
  "Cancelar resposta": "Cancel reply",
  "Essa mensagem está mais acima: role o chat pra carregar.":
    "That message is further up: scroll the chat to load it.",
  "pensando…": "thinking…",
  Responder: "Reply",
  "Responder a esta mensagem": "Reply to this message",
  "Escrito pelo agent dessa pessoa, em nome dela":
    "Written by this person's agent, on their behalf",
  "Reporta algo entregue": "Reports something delivered",
  entregue: "delivered",
  aprovado: "approved",
  decidido: "decided",
  "Apagar registro": "Delete entry",
  "O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda.":
    "What the room decides and every approval show up here. The agents log them as the conversation goes.",
  "Apagar esse registro?": "Delete this entry?",
  "Lembretes": "Reminders",
  "Texto do lembrete": "Reminder text",
  "Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.": "An upload of this reminder is still in progress. Wait before saving again.",
  "Não recebi a confirmação do agendamento. Confira antes de tentar de novo.": "Scheduling confirmation has not arrived. Check before trying again.",
  "Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.": "When the reminder runs, @vibe posts its text here for your agent.",
  "Aguardando confirmação…": "Waiting for confirmation…",
  "Ainda não recebi a confirmação. Confira antes de tentar de novo.": "Confirmation has not arrived yet. Check before trying again.",
  "(pelo agent)": "(through their agent)",
  "quer usar": "wants to use",
  "abrir um link": "open a link",
  "ver todas ({n})": "see all ({n})",
  "só as telas": "screens only",
  "Esta sala": "This room",
  "Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.":
    "A room app is an HTML file in apps/ that uses the room through its iframe: it reads the doc, tasks and messages, posts and moves tasks (with your OK). Ask your agent: “make an app apps/poll.html for this room”.",
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
  "Remover a conexão {name}? Os apps dela saem da sala.":
    "Remove the connection {name}? Its apps leave the room.",
  "Esse app não está nas conexões que você pode usar nesta sala.":
    "That app isn't in the connections you can use in this room.",
  Recarregar: "Reload",
  "próximo {when}": "next {when}",
  "de {who}": "by {who}",
  "Apagar lembrete": "Delete reminder",
  "rodou {n}×": "ran {n}×",
  "Apagar este lembrete?": "Delete this reminder?",
  "nome, ex.: relatorio-diario": "name, e.g. daily-report",
  "Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou.":
    "Say when and what. E.g.: Every day at 8am: pull yesterday's numbers and post here what changed.",
  "Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz.":
    "Each reminder is a file <code>reminders/&lt;name&gt;.md</code>: the text says when to run and what to do. At that time @vibe posts the text here and the agent of whoever saved it does it.",
  "Novo lembrete": "New reminder",
  "O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:":
    "The sandbox runs on your freestyle.sh account. Create one there and make an API key in your terminal:",
  "Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.":
    "Paste the key here. It's kept encrypted in vibebook and never goes to the room or to agents.",
  "No seu terminal, rode:": "In your terminal, run:",
  "Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.":
    "Paste the token (sk-ant-…) here: the sandbox's Claude starts logged in to your subscription. It's kept encrypted, like the freestyle key. Without it, run /login in the sandbox terminal.",
  "Rodando setup… (até 4 min)": "Running setup… (up to 4 min)",
  "espera você no terminal": "waiting for you in the terminal",
  "Tirar da fila (já resolvido)": "Take out of the queue (already handled)",
  "mostrar menos": "show less",
  "mostrar mais {n}": "show {n} more",
  "sandbox na nuvem rodando": "cloud sandbox running",
  "Claude conectado: sandboxes novos já sobem logados":
    "Claude connected: new sandboxes start logged in",
  "seu agent no sandbox": "your agent in the sandbox",
  "Quadro de tarefas": "Task board",
  "Nova versão do vibebook · toque pra atualizar":
    "New vibebook version · tap to update",
  "Seu agent espera você no terminal":
    "Your agent is waiting for you in the terminal",
  feito: "done",
  Lista: "List",
  "Todos os épicos": "All epics",
  "Sem épico": "No epic",
  "Nenhuma tarefa aberta.": "No open tasks.",
  "Escolha um épico.": "Choose an epic.",
  "Épico não encontrado.": "Epic not found.",
  Status: "Status",
  "Sair de todos os aparelhos": "Sign out everywhere",
  "Sai em todos os navegadores e celulares onde você entrou":
    "Signs you out of every browser and phone you signed in on",
  "Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.":
    "Sign out everywhere? Every browser and phone you signed in on will ask you to log in again, this one too. Your connected agents stay.",
  remover: "remove",
  "Conecte seu Claude": "Connect your Claude",
  "Salvando…": "Saving…",
  "Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.":
    "Remove the Claude token? Sandboxes that already have it stay logged in until you delete them.",
  "sala principal": "main room",
  épico: "epic",
  "Fila do seu agent: {n}": "Your agent's queue: {n}",
  "Seu agent está livre": "Your agent is free",
  "Fila do seu agent": "Your agent's queue",
  "espera você": "waiting for you",
  fazendo: "doing",
  "na fila": "queued",
  "Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.":
    "Nothing queued: everything you asked in this room in the last 48h was done or answered.",
  "Rodar o setup de novo": "Run the setup again",
  "Refazer setup": "Redo setup",
  "ligado · trabalhando agora": "on · working now",
  "Pessoas e agents": "People & agents",
  "gasto até agora na sua conta do freestyle":
    "spent so far on your freestyle account",
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
  "Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.":
    "An agent in the cloud for this room, set up by agents/&lt;name&gt;.md in the files. Running costs about US$0.13/hour on your account; paused, only the disk.",
  "Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.":
    "Disconnect your freestyle.sh account? The sandboxes stay there, but vibebook can no longer start, pause or open their terminal.",
  "Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.":
    "Delete this sandbox? The VM and everything in it are gone from freestyle.sh.",
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
  "Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.":
    "Opens (or closes) a Claude Code of yours for this room through vibebook herdr, on your machine.",
  Conectados: "Connected",
  "Criar sandbox": "Create sandbox",
  Pronto: "Done",
  "Documento e arquivos da sala": "Room doc and files",
  Ligado: "On",
  ligado: "on",
  "Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.":
    "No reminders yet. Click New reminder, or ask your agent: “every day at 8am, send me a summary of what changed”.",
  "Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.":
    "Paste an image in the chat (Cmd+V), drag a file in or use the clip. Everything shared in this vibebook lands here.",
  "Carregar mensagens anteriores": "Load earlier messages",
  "Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.":
    "Start the conversation. The agents on in this room read and reply; yours acts with your OK. E.g. <i>organize the project into epics: new site, rentals and domain</i>.",
  "Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.":
    "This epic's discussion. The agents read the tasks, the doc and the main room.",
  "ver na sala principal": "see in the main room",
  "{who} está fazendo isso": "{who} is on it",
  "{who} fez isso": "{who} did it",
  "aguardando {who}": "waiting on {who}",
  "{who} parou": "{who} stopped",
  "lido por {who}": "read by {who}",
  "entregue, ainda não lido por {who}": "delivered, not yet read by {who}",
  "Diagrama com erro": "Diagram error",
  "na linha {n}": "on line {n}",
  "Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.":
    "Empty doc. Click <b>Edit</b> or ask your agent to summarize the decisions here.",
  "@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).":
    "@vibe reviewed this doc. Everyone's agent gets this too (doc_notes).",
};
const t = (pt, vars) => {
  const s = LANG === "en" && EN[pt] !== undefined ? EN[pt] : pt;
  return vars
    ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
    : s;
};
const langSwitch = () =>
  `<span class="langSw" role="group" aria-label="Idioma / Language">${["pt", "en"].map((l) => `<button type="button" class="${LANG === l ? "sel" : ""}" data-lang="${l}" aria-pressed="${LANG === l}">${l.toUpperCase()}</button>`).join("<i>·</i>")}</span>`;
document.addEventListener("click", (e) => {
  const b = e.target.closest?.("[data-lang]");
  if (!b || b.dataset.lang === LANG) return;
  document.cookie = `vb_lang=${b.dataset.lang}; path=/; max-age=31536000; samesite=lax`;
  location.reload();
});
const $app = document.getElementById("app");
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const COLORS = [
  "#ff5a36",
  "#1f9d8a",
  "#3b6cf6",
  "#c2410c",
  "#9333ea",
  "#0f766e",
  "#be185d",
  "#4d7c0f",
];
const color = (s) =>
  COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
let knownNames = {}; // email → display name (from /api/me friends + book state)
const name = (email) =>
  email === "ai"
    ? "@vibe"
    : S?.names?.[email] || knownNames[email] || email.split("@")[0];
let avatarV = {}; // email → profile picture version (from /api/me; rooms bring theirs in S.avatars)
const avatar = (email, on) => {
  if (email === "ai") return `<span class="avatar ai">✦</span>`;
  const v = S?.avatars?.[email] ?? avatarV[email];
  return v
    ? `<span class="avatar pic ${on ? "on" : ""}" title="${esc(name(email))}"><img src="/api/avatar/${encodeURIComponent(email)}?v=${v}" alt="" loading="lazy" /></span>`
    : `<span class="avatar ${on ? "on" : ""}" style="background:${color(email)}" title="${esc(name(email))}">${esc(name(email).slice(0, 2).toUpperCase())}</span>`;
};
// A person's Claude: the orange asterisk, with its person's avatar as a small badge.
// Which coding agent it is, from the model or client it reported: Codex isn't drawn as Claude (Nov 2026). Unknown
// names (e.g. "vibebook CLI", which Claude Code drives) keep the Claude mark.
const agentKind = (via) => {
  const v = String(via || "");
  if (/codex|gpt|openai|\bo[1-9]\b/i.test(v)) return ["codex", "◎"];
  if (/gemini/i.test(v)) return ["gemini", "✦"];
  if (/cursor/i.test(v)) return ["cursor", "▲"];
  if (/copilot/i.test(v)) return ["copilot", "◉"];
  return ["", "✻"];
};
const agentAvatar = (email, via) => {
  const [k, g] = agentKind(via);
  return `<span class="avatar claude${k ? ` ${k}` : ""}" title="${t("{via} de {who}", { via: esc(prettyModel(via) || "Agent"), who: esc(name(email)) })}">${g}${avatar(email)}</span>`;
};
// @vibe's grading notes (Jev, on the room's alarm): a quiet chip, the same words the Claudes get in read_room.
const vibeNotes = (f) =>
  f?.length
    ? `<span class="vnote" title="@vibe: ${esc(f.join(" · "))}. ${t("O agent de quem pegar a tarefa também vê isso.")}">${icon("alert", 12)} ${esc(f.join(" · "))}</span>`
    : "";
const ago = (ts) => {
  const m = Math.round((Date.now() - ts) / 60000);
  return m < 1
    ? t("agora")
    : m < 60
      ? `${m} min`
      : m < 1440
        ? `${Math.round(m / 60)} h`
        : `${Math.round(m / 1440)} d`;
};
// Escaped text → clickable http(s) links (opened safely in a new tab).
// @mentions: a member's handle is their first name (accents stripped), else the first part of their email.
const fold = (x) =>
  x
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]/g, "");
// Accepted handles: first name, the email's local part, and its first token ("leca" for leca.schatz@).
const handlesOf = (email) => {
  const local = email.split("@")[0];
  return [
    fold(
      S?.names?.[email]?.split(/\s+/)[0] ||
        knownNames[email]?.split(/\s+/)[0] ||
        "",
    ),
    fold(local.split(/[._+-]/)[0]),
    fold(local),
  ].filter(Boolean);
};
const handleOf = (email) => handlesOf(email)[0];
const mentionTarget = (h) => {
  const k = fold(h);
  if (k === "vibe" || k === "ai") return "ai";
  return (S?.members || []).find((e) => handlesOf(e).includes(k)) || null;
};
const mentions = (h) =>
  h.replace(/(^|[\s(>])@([\p{L}\p{N}._-]+)/gu, (all, pre, tag) => {
    const who = mentionTarget(tag);
    return who
      ? `${pre}<span class="mention${who === S?.me ? " me" : ""}" title="${esc(who === "ai" ? "@vibe" : who)}">@${tag}</span>`
      : all;
  });
// GitHub links (repo, PR, issue, commit) become a chip: round logo + "owner/repo #882" (or @sha7); a link with its own text keeps it.
const GH_LOGO = `<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
const ghChips = (h) =>
  h.replace(
    /<a ([^>]*?)href="https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g,
    (all, pre, owner, repo, kind, ref, post, text) => {
      if (
        /^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(
          owner,
        )
      )
        return all;
      const href = all.match(/href="([^"]*)"/)[1];
      const label =
        kind === "commit"
          ? `${owner}/${repo}@${ref.slice(0, 7)}`
          : kind
            ? `${owner}/${repo} #${ref}`
            : `${owner}/${repo}`;
      const own = text.replace(/<[^>]*>/g, "").trim();
      const shown =
        !own || own === href || /^https?:\/\//.test(own) ? esc(label) : text;
      return `<a ${pre}href="${href}"${post} class="ghchip" title="${esc(label)}">${GH_LOGO}<span>${shown}</span></a>`;
    },
  );
// A link to one of this room's files (an agent's [report.html](…/files/<id>), or pasted) becomes a chip: the type's
// icon, the file's name and vN when it has versions. A click opens the viewer (the document click handler).
const fileChips = (h) =>
  h.replace(
    /<a ([^>]*?)href="(https?:\/\/[^"\/]+)?\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)"([^>]*)>([\s\S]*?)<\/a>/g,
    (all, pre, host, room, fid, post, text) => {
      if (!S?.id || room !== S.id || (host && host !== location.origin))
        return all;
      const f =
        (S.files || []).find((x) => x.id === fid) ||
        allMsgs()
          .flatMap((x) => x.files || [])
          .find((x) => x.id === fid);
      const own = text.replace(/<[^>]*>/g, "").trim();
      const nameOf =
        f?.name || (own && !/^https?:\/\//.test(own) ? own : "arquivo");
      const vs = f ? fileVersions(f.name) : [];
      const n =
        vs.length > 1 ? vs.length - vs.findIndex((v) => v.id === fid) : 0;
      return `<a ${pre}href="/api/books/${room}/files/${fid}"${post} class="fchip" title="${esc(nameOf)}">${fileIcon(f || { type: /\.html?$/i.test(nameOf) ? "text/html" : "" }, 14)}<span>${esc(nameOf)}</span>${n ? `<small>v${n}</small>` : ""}</a>`;
    },
  );
// Slack-style :shortcodes: (":point_up:") become the emoji when shown, in people's and agents' messages, old ones too.

const linkify = (h) => fileChips(ghChips(emojify(h).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g, (u) => `<a href="${u}" target="_blank" rel="noopener noreferrer nofollow ugc">${u}</a>`)));
// Markdown for @vibe's and agents' messages (they write it): render, sanitize, open links in a new tab.
// No <img>: files go as attachments, and a remote image would be a tracker.
// What other people's markdown may not carry: images (trackers), page-wide CSS, forms and inline styles (a fake
// prompt or an overlay on Aprovar/Permitir).
const MD_PURIFY = {
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
    "embed",
  ],
  FORBID_ATTR: ["style"],
};
const md = (s) =>
  DOMPurify.sanitize(
    fileChips(
      ghChips(
        DOMPurify.sanitize(
          marked.parse(emojify(s), { breaks: true, gfm: true }),
          MD_PURIFY,
        )
          .replace(
            /<a (?!href="#(?:m\d+|e[\w-]+|doc[\w:-]*)")/g,
            '<a target="_blank" rel="noopener noreferrer nofollow ugc" ',
          )
          .replace(
            /<a href="#m(\d+)"/g,
            '<a class="mlink" href="#m$1" data-msg="$1"',
          )
          .replace(
            /<a href="#(e[\w-]+|doc[\w:-]*)"/g,
            '<a class="mlink" href="#$1" data-cardgo="#$1"',
          ),
      ),
    ),
    { ...MD_PURIFY, ADD_ATTR: ["target"] },
  ); // again after the chips' regexes
const api = async (path, body) => {
  const r = await fetch(
    path,
    body
      ? {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      : {},
  );
  if (r.status === 401) {
    location.href = uiNavigationUrl(
      `/login?next=${encodeURIComponent(location.pathname + location.search)}`,
      location.href,
      "svelte",
    );
    throw new Error("unauthenticated");
  }
  if (!r.ok)
    throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
};

// ---------------- switcher ----------------
const $sw = document.getElementById("switcher");
let nativePersonal = null,
  nativeRooms = null,
  nativeAppNav = null,
  nativeNavMount = null,
  nativeRouter = null;
let homeSettingsCleanup = () => {};
let myBooks = null; // from /api/me, newest activity first
let myWaits = []; // "Esperando você" (/api/me waits): what people are waiting on you for
// A Claude of yours stopped at a question (a<msg> = its ask in the room, b<msg> = blocked in the terminal): those
// counts turn orange-red instead of yellow, so "your Claude is stuck" stands out from people waiting.
const clW = (ws) => (ws.some((w) => /^[ab]\d/.test(w.ref)) ? " cl" : "");
// One icon set for the whole app (lucide-style strokes): icon(name, size) → inline SVG. Brand marks (✻ Claude, ✦ @vibe) stay glyphs.
const ICONS = {
  link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  inbox: `<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>`,
  grid: `<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>`,
  search: `<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4-4"/>`,
  expand: `<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/>`,
  plus: `<path d="M5 12h14"/><path d="M12 5v14"/>`,
  pin: `<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>`,
  x: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
  check: `<path d="M20 6 9 17l-5-5"/>`,
  menu: `<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>`,
  list: `<path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/>`,
  sidebar: `<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M9 3v18"/>`,
  back: `<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>`,
  external: `<path d="M7 7h10v10"/><path d="M7 17 17 7"/>`,
  board: `<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/>`,
  doc: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>`,
  file: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>`,
  mic: `<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
  folder: `<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`,
  calendar: `<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/>`,
  trash: `<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  archive: `<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>`,
  undo: `<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>`,
  reply: `<path d="m9 17-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>`,
  copy: `<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
  bell: `<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>`,
  bellOff: `<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M17 17H4a1 1 0 0 1-.74-1.67C4.59 13.96 6 12.5 6 8a6 6 0 0 1 .26-1.74"/><path d="m2 2 20 20"/><path d="M8.67 3.01A6 6 0 0 1 18 8c0 2.69.77 4.65 1.71 6.05"/>`,
  camera: `<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>`,
  plug: `<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>`,
  chart: `<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,
  terminal: `<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>`,
  alert: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
  paperclip: `<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l8.6-8.6a4 4 0 0 1 5.7 5.7l-8.6 8.6a2 2 0 0 1-2.8-2.8l8.5-8.5"/>`,
  at: `<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>`,
  hand: `<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`,
  arrowRight: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
  sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
  moon: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
  chevronDown: `<path d="m6 9 6 6 6-6"/>`,
  chevronRight: `<path d="m9 18 6-6-6-6"/>`,
  pencil: `<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>`,
  contrast: `<circle cx="12" cy="12" r="9"/><path d="M12 17a5 5 0 0 0 0-10z" fill="currentColor"/>`,
};
const icon = (n, size = 16) =>
  `<svg class="i" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
const SW_LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="4" width="22" height="24" rx="5" fill="#fff"/><rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4"/><rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4"/><circle cx="24" cy="23" r="7" fill="#f2dc4a"/></svg>`;
const SW_SEARCH = icon("search", 18);
// The ✻ of the Agents buttons, drawn (the glyph sat off center): six round-capped spokes around the exact middle.
const STAR = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round">${[0, 60, 120].map((a) => `<line x1="12" y1="3.5" x2="12" y2="20.5" transform="rotate(${a} 12 12)"/>`).join("")}</g></svg>`;
const SW_PLUS = icon("plus", 18);
// Phones: the room is as tall as what's visible (the iOS keyboard shrinks the visual viewport, not 100dvh),
// and iOS's habit of scrolling the whole page to show a focused input is undone (in a room only: the home is a
// normal scrolling page, and snapping it back to the top on every scroll event broke scrolling there).
if (window.visualViewport) {
  const fit = () => {
    document.documentElement.style.setProperty(
      "--vvh",
      `${Math.round(visualViewport.height)}px`,
    );
    if (innerWidth <= 900 && scrollY && document.querySelector(".book"))
      scrollTo(0, 0);
  };
  visualViewport.addEventListener("resize", fit);
  visualViewport.addEventListener("scroll", fit);
  fit();
}
// Theme: auto (follows the system) → light → dark, remembered per browser; the CSS reads data-theme via color-scheme.
const THEMES = {
  auto: {
    label: t("Tema automático (do sistema)"),
    next: "light",
    icon: icon("contrast", 18),
  },
  light: { label: t("Tema claro"), next: "dark", icon: icon("sun", 18) },
  dark: { label: t("Tema escuro"), next: "auto", icon: icon("moon", 18) },
};
const theme = () => document.documentElement.dataset.theme || "auto";
function setTheme(t) {
  if (t === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  try {
    t === "auto"
      ? localStorage.removeItem("vb.theme")
      : localStorage.setItem("vb.theme", t);
  } catch {}
  renderSwitcher();
}
const iconUrl = (b) => (b?.icon ? `/api/books/${b.id}/icon?v=${b.icon}` : null);
// The room you're in is read up to its newest message (the server marks it too); refresh the rail every 30s.
function seenHere(upto) {
  if (S) nativePersonal?.seen(S.id, upto);
}
// No polling: the person's channel (/ws-me, src/person.ts) says when something outside the open room changed
// ({t:"me"}: rail, waits, version; {t:"agents", book}: that room's Claudes and sandboxes) and the app fetches it once.
// Coming back to the tab refreshes once too (a phone drops sockets in the background).
let nativePersonalConnection = null,
  agentsRefreshTimer = 0;
const currentRoomId = () => roomIdFromPath(location.pathname);
function connectMe() {
  if (nativePersonalConnection) return;
  nativePersonalConnection = createPersonalConnection({
    url: () =>
      `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws-me`,
    onAccount: () => nativePersonal.observe({ kind: "account" }),
    onAgents: (book) => {
      nativePersonal.observe({ kind: "agents", book });
      const id = currentRoomId(),
        connection = roomConnection;
      if (connection && (book === "*" || book === id)) {
        clearTimeout(agentsRefreshTimer);
        agentsRefreshTimer = setTimeout(() => {
          if (roomConnection === connection && currentRoomId() === id)
            loadRoomAgents();
        }, 600);
      }
    },
    onConnected: () => {
      nativePersonal.invalidate();
      void nativePersonal.refresh();
      void nativePersonal.refreshAgents();
      if (roomConnection && S?.id === currentRoomId()) loadRoomAgents();
    },
    onVisible: () => {
      nativePersonal.invalidate();
      void nativePersonal.refresh();
      void nativePersonal.refreshAgents();
      if (roomConnection && S?.id === currentRoomId()) loadRoomAgents();
    },
    currentRoom: currentRoomId,
    visible: () => document.visibilityState === "visible",
    listenVisibility: (callback) => {
      document.addEventListener("visibilitychange", callback);
      return () => document.removeEventListener("visibilitychange", callback);
    },
  });
  nativePersonalConnection.start();
}

function ensureNativeHome() {
  if (nativePersonal) return;
  nativePersonal = createPersonalSession(createHomeApi(), {
    onVersion: newVersion,
    onUnauthorized: () => {
      location.href = uiNavigationUrl(
        `/login?next=${encodeURIComponent(location.pathname + location.search + location.hash)}`,
        location.href,
        "svelte",
      );
    },
    onIdentityChange: () => {
      myBooks = null;
      myWaits = [];
      friends = [];
      knownNames = {};
      avatarV = {};
      homeSettingsCleanup();
      nativeAppNav?.pageLeft();
      nativeRooms?.reset();
      roomCache.clear();
      roomAgents = { id: null, list: [] };
      sbx = { id: null, connected: null, list: [], busy: "", err: "" };
      conns = null;
      connsBook = null;
      connApp = null;
      connForm = false;
      connMore.clear();
      clearTimeout(agentsRefreshTimer);
      clearTimeout(sbxTimer);
      roomConnection?.dispose();
      roomConnection = null;
      S = null;
      nativePersonalConnection?.restart();
      queueMicrotask(route);
    },
  });
  nativeRooms = createRoomsSession(nativePersonal);
  nativeAppNav = createAppNavigationSession(nativePersonal, nativeRooms, {
    navigate: (target) => nativeRouter.go(target),
    home: () => nativeRouter.go("/app"),
    archived: () => nativeRouter.go("/archived"),
    settings: openHomeSettings,
    rename: (id, title) =>
      S?.id === id && currentRoomId() === id
        ? (roomConnection?.request({ t: "title", title }) ??
          Promise.resolve({ ok: false, error: t("sem conexão") }))
        : Promise.resolve({ ok: false, error: t("sem conexão") }),
  });
  nativeRouter = createApplicationRouter({
    current: () => location.href,
    history,
    beforeChange: () => {
      UI.dismissDialogs();
      closeInbox();
      closeRoomOverlaysForNavigation();
      homeSettingsCleanup();
      nativeAppNav.pageLeft();
    },
    document: (href) => {
      location.href = href;
    },
    consumePop: () => viewerPop() || sheetPop(),
    sameRoom: (target) => {
      if (
        !S ||
        S.id !== target.roomId ||
        !roomConnection ||
        !$app.querySelector(".book")
      )
        return false;
      const requested = target.thread || "main";
      const selected = requested === "main" || S.epics.some(epic => epic.id === requested) ? requested : "main";
      if (target.messageId) goToMsg(target.messageId, selected);
      else if (target.fileId) {
        if (thread !== selected) selectThread(selected);
        openFile(target.fileId);
      } else {
        selectThread(selected);
        if (target.document) {
          document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" }));
          if (ROOM_PHONE.matches) openSheet("doc");
        }
      }
      renderSwitcher();
      return true;
    },
    activate: () => route(),
  });
  let previous = null;
  nativePersonal.state.subscribe(({ me }) => {
    if (!me || me === previous) return;
    nativePwa.account(me.email);
    const before = JSON.stringify(myWaits);
    previous = me;
    myBooks = me.books;
    myWaits = me.waits;
    friends = me.friends.map((friend) => friend.email);
    knownNames = Object.fromEntries(
      me.friends
        .filter((friend) => friend.name)
        .map((friend) => [friend.email, friend.name]),
    );
    avatarV = Object.fromEntries([
      ...me.friends
        .filter((friend) => friend.avatar)
        .map((friend) => [friend.email, friend.avatar]),
      ...(me.avatar ? [[me.email, me.avatar]] : []),
    ]);
    renderSwitcher();
    connectMe();
    if (S && currentRoomId() === S.id) {
      renderSide();
      if (before !== JSON.stringify(myWaits)) renderChat(true);
      setFavicon(bookTitle());
    }
  });
  nativePersonal.start();
}
function renderSwitcher() {
  ensureNativeHome();
  syncInbox();
  const show = !!myBooks && location.pathname !== "/login";
  document.body.classList.toggle("has-sw", show);
  nativeAppNav.syncPath(location.href);
  if (!show) {
    nativeNavMount?.destroy();
    nativeNavMount = null;
    $sw.replaceChildren();
    return;
  }
  const props = {
    controller: nativeAppNav,
    lang: LANG,
    theme: theme(),
    ontheme: () => setTheme(THEMES[theme()].next),
    onlanguage: (language) => {
      if (language === LANG) return;
      document.cookie = `vb_lang=${language}; path=/; max-age=31536000; samesite=lax`;
      location.reload();
    },
  };
  if (!nativeNavMount)
    nativeNavMount = UI.mountView("appNavigation", $sw, props);
  else nativeNavMount.update(props);
}
function openSwitch() {
  ensureNativeHome();
  nativeAppNav.openSearch(
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : undefined,
  );
}
function nativeHomeProps() {
  ensureNativeHome();
  return {
    pwa: nativePwa,
    personal: nativePersonal,
    rooms: nativeRooms,
    lang: LANG,
    ago,
    onnavigate: (target) => nativeRouter.go(target),
    onhome: () => nativeRouter.go("/app"),
    onarchived: () => nativeRouter.go("/archived"),
    onnew: (trigger) => nativeAppNav.openCreate(trigger),
    onsettings: openHomeSettings,
    onroomsettings: (id, trigger) => nativeAppNav.openSettings(id, trigger),
    onsearch: openSwitch,
  };
}
function route() {
  ensureNativeHome();
  clearTimeout(agentsRefreshTimer);
  clearTimeout(sbxTimer);
  closeRoomOverlaysForNavigation();
  homeSettingsCleanup();
  nativeAppNav.pageLeft();
  goPending = null;
  UI.dismissDialogs();
  closeInbox();
  clearViews();
  renderSwitcher();
  const id = currentRoomId();
  roomConnection?.dispose();
  roomConnection = null;
  if (location.pathname === "/login") {
    location.replace(location.href);
    return;
  }
  if (location.pathname === "/archived") return archivedPage();
  if (id) return openBook(id);
  if (location.pathname !== "/app" && location.pathname !== "/") {
    location.replace(uiNavigationUrl("/app", location.href, "svelte"));
    return;
  }
  home();
}

// ---------------- login ----------------
const GOOGLE_ICON = `<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;

async function login() {
  document.title = `${t("Entrar")} · vibebook`;
  setFavicon(null);
  const q = new URLSearchParams(location.search);
  const next = uiNavigationUrl(
    q.get("next") || "/app",
    location.href,
    "svelte",
  );
  const providers = await fetch("/auth/providers")
    .then((r) => r.json())
    .catch(() => ({ google: false }));
  let email = "";
  const view = (step, err = "") => {
    $app.innerHTML = `
    <div class="login"><div class="box">
      <a class="brand" href="/">vibebook</a>
      ${
        step === "email"
          ? `
        <h1>${t("Entrar")}</h1>
        <p>${t("Seus vibebooks e seus amigos te esperando.")}</p>
        ${providers.google ? `<a class="google" href="/auth/google/start?next=${encodeURIComponent(next)}" style="text-decoration:none"><button type="button" class="google">${GOOGLE_ICON} ${t("Continuar com Google")}</button></a>` : ""}${providers.github ? `<a class="google" href="/auth/github/start?next=${encodeURIComponent(next)}" style="text-decoration:none"><button type="button" class="google">${GH_LOGO.replace("<svg ", '<svg width="18" height="18" ')} ${t("Continuar com GitHub")}</button></a>` : ""}${providers.google || providers.github ? `<div class="or">${t("ou com email")}</div>` : ""}
        <form id="f"><label class="muted" for="email" style="font-size:14px">${t("Seu email")}</label>
          <input id="email" type="email" autocomplete="email" required placeholder="${t("voce@gmail.com")}" value="${esc(email)}" />
          <button class="primary" id="go">${t("Mandar código")}</button>
          <p class="err" role="alert">${esc(err)}</p></form>`
          : `
        <h1>${t("Confere seu email")}</h1>
        <p>${t("Mandamos um código de 6 dígitos para <b>{email}</b>.", { email: esc(email) })}</p>
        <form id="f"><label class="muted" for="code" style="font-size:14px">${t("Código")}</label>
          <input id="code" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required pattern="[0-9]{6}" />
          <button class="primary" id="go">${t("Entrar")}</button>
          <p class="err" role="alert">${esc(err)}</p>
          <button type="button" class="link" id="back">${t("usar outro email")}</button></form>`
      }
    </div></div>`;
    const f = document.getElementById("f");
    f.querySelector("input").focus();
    document
      .getElementById("back")
      ?.addEventListener("click", () => view("email"));
    f.onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById("go");
      btn.disabled = true;
      btn.textContent = "…";
      const path =
        step === "email" ? "/auth/email/start" : "/auth/email/verify";
      if (step === "email")
        email = document.getElementById("email").value.trim();
      const body =
        step === "email"
          ? { email }
          : { email, code: document.getElementById("code").value, next };
      const r = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok)
        return view(step, j.error || t("Algo deu errado. Tenta de novo."));
      if (step === "email") return view("code");
      location.href = uiNavigationUrl(
        j.next || "/app",
        location.href,
        "svelte",
      );
    };
    if (step === "code")
      document.getElementById("code").oninput = (e) => {
        if (e.target.value.replace(/\D/g, "").length === 6) f.requestSubmit();
      };
  };
  view(
    "email",
    q.get("error") === "google"
      ? t("Não deu certo com o Google. Tenta com email.")
      : q.get("error") === "github"
        ? t(
            "Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.",
          )
        : "",
  );
}
window.addEventListener("popstate", () => {
  ensureNativeHome();
  nativeRouter.pop();
});
document.addEventListener("click", (event) => {
  const anchor = event.target.closest?.("a[data-nav]");
  if (
    !anchor ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  )
    return;
  event.preventDefault();
  ensureNativeHome();
  nativeRouter.go(anchor.getAttribute("href"));
});

// ---------------- home ----------------
// The last /api/me (any page fetches it): going back home draws it at once, then the fresh one replaces it only if
// something changed, keeping what you were typing in the ask box.
// A newer app is out (this page's <meta name="vb-v"> differs from the server's): a small bar, tap to reload.
function newVersion(v) {
  const mine = document.querySelector('meta[name="vb-v"]')?.content;
  nativePersonal?.updateAvailable(!!v && !!mine && mine !== "development" && v !== "development" && v !== mine);
}

function home() {
  ensureNativeHome();
  document.title = "vibebook";
  setFavicon(null);
  renderView("home", $app, nativeHomeProps());
}
function archivedPage() {
  ensureNativeHome();
  document.title = `${t("Arquivo")} · vibebook`;
  setFavicon(null);
  renderView("archived", $app, nativeHomeProps());
}
function newRoom() {
  ensureNativeHome();
  nativeAppNav.openCreate(
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : undefined,
  );
}
function confirmArchive(id, title) {
  ensureNativeHome();
  nativeAppNav.askArchive(id);
}
// Explicit pending boundary: profile/friend/device/agent settings stay legacy until their dedicated port.
// The native Home never delegates room lists, drafts, routing or navigation rendering to this overlay.
function openHomeSettings(section = "all") {
  ensureNativeHome();
  homeSettingsCleanup();
  const me = nativePersonal.peek();
  if (!me) return;
  const dialog = document.createElement("dialog");
  dialog.className = "pdrawer";
  dialog.dataset.vbLegacy = "home-settings";
  dialog.innerHTML = `<button type="button" class="ghost" data-account-close aria-label="${t("Fechar")}">${t("Fechar")}</button>
  <div class="pdHead"><span data-account-photo>${avatar(me.email)}</span><div><b data-account-name>${esc(me.name || t("Seu nome"))}</b><small>${esc(me.email)}</small></div></div>
  <form data-account-name-form><label>${t("Seu nome")}<input name="name" required maxlength="60" autocomplete="given-name" value="${esc(me.name || "")}" /></label><button>${t("Salvar")}</button></form>
  <button type="button" class="primary" data-account-photo>${t("Adicionar foto")}</button><input type="file" id="picFile" accept="image/png,image/jpeg,image/webp" hidden />
  ${loginsSec()}<nav class="pdNav"><a data-nav href="/archived">${t("Arquivo")}</a><button class="ghost" data-account-theme>${THEMES[theme()].label}</button>${langSwitch()}<span data-native-pwa-bell></span>${window.PublicKeyCredential ? `<label><input type="checkbox" data-account-lock ${lockId() ? "checked" : ""}/>${t("Exigir Face ID ao abrir")}</label>` : ""}</nav>
  <div id="setupCard"></div><section class="agentBox" id="agentBox" aria-live="polite"></section>
  <h2>${t("Amigos")}</h2><div data-account-friends></div><form data-account-add><label>${t("Email do amigo")}<input type="email" name="email" required/></label><button>${t("Convidar")}</button></form>
  <button type="button" class="primary" data-account-logout>${t("Sair")}</button><button type="button" class="ghost" data-account-logout-all>${t("Sair de todos os aparelhos")}</button><p role="alert" data-account-error hidden></p>`;
  document.body.append(dialog);
  let active = true;
  const account = me.email;
  let unsubscribe = () => {},
    unmountPwa = () => {};
  const current = () =>
    active && dialog.isConnected && nativePersonal.peek()?.email === account;
  const error = (value) => {
    if (current()) {
      const target = dialog.querySelector("[data-account-error]");
      target.hidden = false;
      target.textContent =
        value instanceof Error ? value.message : String(value);
    }
  };
  const saved = () => {
    if (current()) {
      nativePersonal.invalidate();
      void nativePersonal.refresh();
    }
  };
  const dispose = () => {
    if (!active) return;
    active = false;
    unsubscribe();
    unmountPwa();
    clearTimeout(agentPoll);
    clearTimeout(setupPoll);
    if (dialog.open) dialog.close();
    dialog.remove();
  };
  homeSettingsCleanup = dispose;
  dialog.addEventListener("close", dispose);
  dialog.querySelector("[data-account-close]").onclick = dispose;
  dialog.querySelector("[data-account-theme]").onclick = () => {
    setTheme(THEMES[theme()].next);
    dialog.querySelector("[data-account-theme]").textContent =
      THEMES[theme()].label;
  };
  dialog.querySelector("[data-account-name-form]").onsubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      button = form.querySelector("button");
    if (!current() || !form.isConnected || button.disabled) return;
    button.disabled = true;
    try {
      await api("/api/me?ui=svelte", { name: form.elements.name.value });
      saved();
    } catch (value) {
      error(value);
    } finally {
      if (current()) button.disabled = false;
    }
  };
  dialog.querySelectorAll("[data-account-photo]").forEach(
    (button) =>
      (button.onclick = () => {
        if (current() && button.isConnected) pickPic(saved, current);
      }),
  );
  dialog.querySelector("[data-account-add]").onsubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      button = form.querySelector("button");
    if (button.disabled) return;
    button.disabled = true;
    try {
      await api("/api/friends", { email: form.elements.email.value });
      if (current()) {
        form.reset();
        saved();
      }
    } catch (value) {
      error(value);
    } finally {
      if (current()) button.disabled = false;
    }
  };
  const lock = dialog.querySelector("[data-account-lock]");
  if (lock)
    lock.onchange = async () => {
      if (!current() || !lock.isConnected) return;
      const wanted = lock.checked;
      try {
        await lockSet(wanted, account);
      } catch (value) {
        if (current()) lock.checked = !wanted;
        error(value);
      }
    };
  dialog.querySelector("[data-account-logout]").onclick = () => {
    if (current()) void logoutWithPwa(false);
  };
  dialog.querySelector("[data-account-logout-all]").onclick = async () => {
    if (!current()) return;
    if (
      !confirm(
        t(
          "Sair de todos os aparelhos? Todo navegador e celular onde você entrou vai pedir login de novo, este também. Seus agents conectados continuam.",
        ),
      )
    )
      return;
    void logoutWithPwa(true);
  };
  const friendsNode = dialog.querySelector("[data-account-friends]");
  let renderedMe = null;
  unsubscribe = nativePersonal.state.subscribe(({ me: next }) => {
    if (!active || !dialog.isConnected || !next) return;
    if (next.email !== account) return dispose();
    if (next === renderedMe) return;
    renderedMe = next;
    dialog.querySelector("[data-account-name]").textContent =
      next.name || t("Seu nome");
    friendsNode.innerHTML = next.friends
      .map(
        (friend) =>
          `<div class="friend">${avatar(friend.email)}<span class="fn">${esc(friend.name || friend.email)}<small>${friend.shared || ""}</small></span><button type="button" class="ghost" data-account-unfriend="${esc(friend.email)}" aria-label="${t("Remover {email} dos amigos", { email: esc(friend.email) })}">${icon("x")}</button></div>`,
      )
      .join("");
    friendsNode.querySelectorAll("[data-account-unfriend]").forEach(
      (button) =>
        (button.onclick = async () => {
          if (!current() || !button.isConnected) return;
          if (
            !confirm(
              t(
                "Remover {email} dos seus amigos? Os vibebooks em comum continuam.",
                { email: button.dataset.accountUnfriend },
              ),
            )
          )
            return;
          button.disabled = true;
          try {
            const response = await fetch(
              `/api/friends/${encodeURIComponent(button.dataset.accountUnfriend)}`,
              { method: "DELETE" },
            );
            if (!response.ok) throw Error(t("Algo deu errado. Tenta de novo."));
            saved();
          } catch (value) {
            error(value);
            if (current() && button.isConnected) button.disabled = false;
          }
        }),
    );
  });
  fillLogins(current);
  unmountPwa = UI.mountPwa(
    dialog.querySelector("[data-native-pwa-bell]"),
    "bell",
    nativePwa,
    LANG,
  );
  renderAgents(false, current);
  dialog.showModal();
  if (section === "friends")
    dialog.querySelector("[data-account-add] input").focus();
  else if (section === "profile")
    dialog.querySelector("[data-account-name-form] input").focus();
}
// Profile: how you sign in. Email codes always work; Google/GitHub show when the server has them, with your last use.
const loginsSec = () =>
  `<section class="logins"><h3>${t("Como você entra")}</h3><div id="loginRows"></div><p class="lgNote">${t("Google e GitHub entram na conta do email deles: se for outro email, vira outra conta.")}</p></section>`;
async function fillLogins(current = () => true) {
  const el = document.getElementById("loginRows");
  if (!el) return;
  let r;
  try {
    r = await (await fetch("/api/me/logins")).json();
  } catch {
    return;
  }
  if (!current() || !el.isConnected) return;
  const by = Object.fromEntries((r.logins || []).map((l) => [l.method, l]));
  const when = (l) =>
    l
      ? t("último {d} · {n}×", {
          d: new Date(l.last).toLocaleDateString(LOCALE, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          n: l.n,
        })
      : null;
  const row = (ic, label, l, idle) =>
    `<div class="lgRow${l ? " on" : ""}"><span class="lgIc">${ic}</span><span><b>${label}</b><small>${when(l) ?? idle}</small></span>${l ? `<i class="lgOk">${icon("check", 14)}</i>` : ""}</div>`;
  el.innerHTML = [
    row(icon("at", 16), t("Código por email"), by.email, t("sempre funciona")),
    r.providers?.google || by.google
      ? row(GOOGLE_ICON, "Google", by.google, t("ainda não usou"))
      : "",
    r.providers?.github || by.github
      ? row(
          GH_LOGO.replace("<svg ", '<svg width="16" height="16" '),
          "GitHub",
          by.github,
          t("ainda não usou"),
        )
      : "",
    by.invite ? row(icon("reply", 16), t("Link de convite"), by.invite) : "",
  ].join("");
}
// "Seu agent": connect instructions while none is connected (polled, so it flips to ✓ the moment the
// first MCP call lands), then the list of connections with a disconnect button.
let agentPoll = 0,
  agentPolls = 0;
async function renderAgents(again, current = () => true) {
  if (!current()) return;
  clearTimeout(agentPoll);
  agentPolls = again ? agentPolls + 1 : 0;
  const box = document.getElementById("agentBox");
  if (!box) return;
  const r = await fetch("/api/agents")
    .then((x) => x.json())
    .catch(() => null);
  if (!r || !current() || !document.body.contains(box)) return;
  const url = `${location.origin}/mcp`;
  if (r.agents.length) {
    box.hidden = false;
    // One row per connection (each login or connector is one), grouped by client, newest first. Old or unused ones
    // come pre-checked; one button removes the checked ones.
    const DAY = 864e5,
      now = Date.now();
    const last = (a) => a.used_at ?? a.connected_at;
    const stale = (a) => now - last(a) > 14 * DAY;
    const groups = {};
    for (const a of r.agents) (groups[a.client] ??= []).push(a);
    for (const g of Object.values(groups)) g.sort((x, y) => last(y) - last(x));
    const usedTxt = (a) =>
      a.used_at
        ? t("usado {ago}", { ago: ago(a.used_at) })
        : a.used_at === null
          ? t("sem uso ainda")
          : t("uso desconhecido");
    box.innerHTML = `<h2>✦ ${t("Seus agents conectados")}</h2>
      ${Object.entries(groups)
        .map(
          ([
            client,
            list,
          ]) => `<div class="connGroup"><div class="connHead"><b>${esc(client)}</b><small>${list.length}</small></div>
        ${list.map((a) => `<label class="conn"><input type="checkbox" data-gid="${esc(a.id)}" ${stale(a) ? "checked" : ""} /><span>${t("conectado {ago}", { ago: ago(a.connected_at) })}<small>${usedTxt(a)}</small></span></label>`).join("")}</div>`,
        )
        .join("")}
      <div class="connActs"><button type="button" class="ghost" id="connKeep">${t("Marcar todas menos a mais recente de cada")}</button><button type="button" class="primary" id="connDel"></button></div>
      <p style="margin-top:8px">${t("Peça pro seu agent: <i>“vê o que tem de novo no vibebook”</i> ou <i>“vai na sala tal e fala com a Marina…”</i>")}</p>`;
    const boxes = () => [...box.querySelectorAll("[data-gid]")];
    const sync = () => {
      const n = boxes().filter((b) => b.checked).length;
      const d = box.querySelector("#connDel");
      d.textContent = t("Remover selecionadas ({n})", { n });
      d.disabled = !n;
    };
    box.addEventListener("change", sync);
    sync();
    box.querySelector("#connKeep").onclick = () => {
      box
        .querySelectorAll(".connGroup")
        .forEach((g) =>
          g
            .querySelectorAll("[data-gid]")
            .forEach((b, i) => (b.checked = i > 0)),
        );
      sync();
    };
    box.querySelector("#connDel").onclick = async () => {
      if (!current() || !box.isConnected) return;
      const ids = boxes()
        .filter((b) => b.checked)
        .map((b) => b.dataset.gid);
      if (
        !ids.length ||
        !confirm(
          t("Remover {n} conexões? Os agents delas perdem o acesso na hora.", {
            n: ids.length,
          }),
        )
      )
        return;
      const revoked = await fetch("/api/agents/revoke", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (current() && box.isConnected) {
        if (revoked.ok) void nativePersonal.refreshAgents();
        renderAgents(false, current);
      }
    };
    return;
  }
  box.hidden = true;
  connectCard(document.getElementById("setupCard"), undefined, current);
}

// Caixa de entrada: the same waits as the home ("Esperando você": asks to you, your tasks in review, your Claude
// waiting on you), opened from any room, "Esta sala" or "Todas"; a click goes to the message, ✓ resolves an ask.
let inboxAll = false;
let inboxGeneration = 0;
function closeInbox() {
  inboxGeneration++;
  const node = document.getElementById("inbox");
  node?._unmount?.();
  if (node) node._unmount = null;
}
function syncInbox() {
  document.getElementById("inbox")?._unmount?.updateWaits(myWaits);
  const b = document.getElementById("inboxBtn");
  if (!b) return;
  const n = myWaits.length,
    k = b.querySelector(".kN");
  k.hidden = !n;
  k.textContent = n;
  k.className = `kN${clW(myWaits)}`;
}
// Native Svelte Inbox owns its accessible dialog, tabs, SVG/avatar rendering and Tailwind styles.
// This temporary host only supplies the room callbacks until the remaining application shell is ported.
let uiLoad;
const loadUI = () => Promise.resolve(UI);
function openInbox() {
  closeInbox();
  const generation = inboxGeneration;
  let d = document.getElementById("inbox");
  if (!d) {
    d = document.createElement("div");
    d.id = "inbox";
    document.body.appendChild(d);
  }
  const close = () => {
    if (generation === inboxGeneration) closeInbox();
  };
  loadUI()
    .then(({ mountInbox }) => {
      if (generation !== inboxGeneration) return;
      d.replaceChildren();
      d._unmount = mountInbox(d, {
        waits: myWaits,
        roomId: S?.id ?? null,
        all: inboxAll,
        vb: { t, ago },
        displayName: name,
        avatarUrl: (email) => {
          const v = S?.avatars?.[email] ?? avatarV[email];
          return v
            ? `/api/avatar/${encodeURIComponent(email)}?v=${v}`
            : undefined;
        },
        ontab: (v) => (inboxAll = v),
        onclose: close,
        onopen: (w, e) => {
          close();
          const mid = /^[mab]/.test(w.ref)
            ? messageIdentity(w.ref.slice(1))
            : undefined;
          if (S?.id === w.book_id) {
            e.preventDefault();
            if (mid) goToMsg(mid, w.thread);
            else if (w.thread !== thread) {
              thread = w.thread;
              renderSide();
              renderChat();
              renderDoc();
            }
          }
        },
        onresolve: async (w) => {
          await nativePersonal.api.resolve(w.book_id, w.ref);
          nativePersonal.invalidate();
          void nativePersonal.refresh();
        },
      });
    })
    .catch(() => toast(t("Não deu pra abrir agora. Tente de novo.")));
}
document.addEventListener("click", (e) => {
  if (e.target.closest?.("#inboxBtn")) openInbox();
});

// First-class setup: vibebook assumes your Claude is connected. Until it is, the home and every room lead with one
// sentence to paste into Claude Code (it installs the plugin, does the one OAuth step, links the folder and listens),
// a Copy button, and a live "waiting" that turns green when your Claude shows up. Other clients are folded below.
let setupPoll = 0;
let noClaude = false; // no Claude connected at all (from /api/agents): then "Ligar Claude" means nothing yet
async function connectCard(el, room, current = () => true) {
  if (!current()) return;
  clearTimeout(setupPoll);
  if (!el) return;
  const r = await fetch("/api/agents")
    .then((x) => x.json())
    .catch(() => null);
  if (!r || !current() || !document.body.contains(el)) return;
  noClaude = !r.agents.length;
  if (S && el.id === "agentNudge") renderMyClaude();
  if (r.agents.length) {
    if (el.dataset.waiting) {
      el.innerHTML = `<div class="setup done"><span class="setupIcon">${icon("check", 22)}</span><div><b>${t("Seu agent conectou.")}</b><span>${room ? t("Ele já enxerga esta sala. Liga ele aqui com ✻ Ligar agent no topo.") : t("Ele já enxerga as suas salas.")}</span></div></div>`;
      delete el.dataset.waiting;
      setTimeout(() => {
        if (document.body.contains(el)) {
          el.innerHTML = "";
          el.hidden = true;
        }
      }, 6000);
      if (!room) renderAgents(false, current);
    } else {
      el.innerHTML = "";
      el.hidden = true;
    }
    return;
  }
  // In a room, × hides this card for good (this browser); the home keeps it.
  const roomCard = el.id === "agentNudge";
  let setupOff = false;
  try {
    setupOff = localStorage.getItem("vb.setupOff") === "1";
  } catch {}
  if (roomCard && setupOff) {
    el.innerHTML = "";
    el.hidden = true;
    return;
  }
  const cmd = `Read ${location.origin}/llms.txt and set up vibebook for this project.${room ? ` Room: ${location.origin}/b/${room}` : ""}`;
  if (!el.dataset.waiting) {
    el.dataset.waiting = "1";
    el.hidden = false;
    const mcp = `${location.origin}/mcp`;
    el.innerHTML = `<div class="setup">
      <div class="setupHead">${roomCard ? `<button class="ghost setupX" data-setupx aria-label="${t("Fechar")}" title="${t("Fechar")}">×</button>` : ""}<span class="setupIcon">✻</span><div><b>${room ? t("Traga seu agent pra esta sala") : t("Conecte seu agent")}</b>
        <span>${t("O vibebook funciona com o agent de cada pessoa: ele lê a sala, conversa com os agents dos outros e te pergunta antes de agir. Cole isto no <b>Claude Code</b>, dentro da pasta do projeto:")}</span></div></div>
      <div class="setupCmd"><code>${esc(cmd)}</code><button class="primary" data-copycmd>${t("Copiar")}</button></div>
      <div class="setupFoot"><span class="wait">${t("esperando seu agent conectar…")}</span>
        <details><summary>${t("Claude.ai ou outro cliente")}</summary>
          <p><b>Claude.ai:</b> ${t("Configurações → Conectores → Adicionar conector personalizado, e cole")} <code data-copy>${esc(mcp)}</code></p>
          <p><b>${t("Claude Code só com o conector:")}</b> <code data-copy>claude mcp add --transport http vibebook ${esc(mcp)}</code></p>
          <p><a href="/connect" target="_blank" rel="noopener">${t("Passo a passo completo →")}</a></p>
        </details></div>
    </div>`;
    const x = el.querySelector("[data-setupx]");
    if (x)
      x.onclick = () => {
        try {
          localStorage.setItem("vb.setupOff", "1");
        } catch {}
        clearTimeout(setupPoll);
        el.innerHTML = "";
        el.hidden = true;
      };
    const btn = el.querySelector("[data-copycmd]");
    btn.onclick = async () => {
      if (!current() || !btn.isConnected) return;
      try {
        await navigator.clipboard.writeText(cmd);
        btn.textContent = `✓ ${t("Copiado")}`;
      } catch {
        btn.textContent = t("Selecione e copie");
      }
      setTimeout(() => (btn.textContent = t("Copiar")), 2500);
    };
    el.querySelectorAll("[data-copy]").forEach(
      (c) =>
        (c.onclick = () => {
          navigator.clipboard?.writeText(c.textContent);
          c.classList.add("copied");
        }),
    );
  }
  // ponytail: polls every 4s for up to 10 min while the card is on screen; a push from the DO would be the upgrade.
  const n = Number(el.dataset.polls || 0);
  if (n < 150) {
    el.dataset.polls = String(n + 1);
    setupPoll = setTimeout(() => connectCard(el, room, current), 4000);
  }
}

// ---------------- book ----------------
let roomConnection = null;
const roomStore = UI.createRoomStore();
let S = null; // compatibility bridge for host integrations; the typed store owns WS state
const typingNotes = new Map(); // transient display notes, not persisted room data
let thread = "main";
let friends = []; // emails of people you already share something with
let attached = []; // composer attachments: { file, url, meta?, error? }
const AUDIO_EXT = {
  m4a: "audio/x-m4a",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  aac: "audio/aac",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/ogg",
  webm: "audio/webm",
  flac: "audio/flac",
};
const FILE_TYPES = [
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
  "audio/x-flac",
];
const fileIcon = (f, size) =>
  icon(
    f.type === "text/html"
      ? "globe"
      : f.type.startsWith("audio/")
        ? "mic"
        : "file",
    size,
  );

let pendingThread = null; // set by the home composer so the room opens on the chosen epic
// Rooms opened in this tab, as last seen: going back to one draws it at once, then the socket's state refreshes it.
const roomCache = new Map();
let liveState = false; // this room's socket sent its state (else a close means no access)
// First visit to a room: draw its real frame at once with what the home already knows (name, icon, color), and
// placeholders shaped like the sidebar, the messages, the composer and the doc, so nothing jumps when the state lands.
function roomSkeleton(id) {
  const b = (myBooks || []).find((x) => x.id === id);
  const title = b?.title || "";
  document.title = `${title || "vibebook"} · vibebook`;
  const u = iconUrl(b);
  const mark = (cls) =>
    u
      ? `<span class="${cls} hasIcon"><img src="${u}" alt=""></span>`
      : title
        ? `<span class="${cls}" style="background:${coverColor(title)}">${esc(initials(title))}</span>`
        : `<span class="${cls}"></span>`;
  const row = (w) =>
    `<div class="thread"><span class="ri sk"></span><i style="width:${w}%"></i></div>`;
  const msg = (a, b2) =>
    `<div class="msg skMsg"><span class="avatar sk"></span><div><i style="width:${a}px"></i><i class="s" style="width:${b2}%"></i></div></div>`;
  return `<div class="book skel ${railMode ? "rail" : ""}" aria-busy="true" aria-label="${t("Carregando")}">
    <aside class="side"><div class="sec threadsSec"><div class="thread sel">${mark("ri roomIco")}<span class="rt">${esc(title)}</span></div>${row(70)}${row(55)}${row(62)}</div></aside>
    <main class="chat"><div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${t("Seus vibebooks")}">${icon("back", 20)}</a><h2 id="threadTitle"><span class="thPick">${mark("ri roomIco phOnly")}<span>${esc(title)}</span></span></h2></div>
      <div class="msgs">${msg(90, 60)}${msg(120, 45)}${msg(70, 70)}${msg(110, 35)}</div>
      <form class="composer" onsubmit="return false"><div class="row"><textarea rows="1" disabled placeholder="${t("Mensagem…")}"></textarea><button class="primary" disabled style="opacity:.5">${t("Enviar")}</button></div></form></main>
    <section class="doc"><div class="skDoc"><i style="width:40%"></i><i></i><i class="s"></i><i></i><i class="s"></i></div></section></div>`;
}
function openBook(id) {
  thread =
    pendingThread || new URLSearchParams(location.search).get("t") || "main";
  pendingThread = null;
  urlSynced = false;
  S = null;
  typingNotes.clear();
  liveState = false;
  attached = [];
  ensureNativeHome();
  void nativePersonal.refresh();
  // Placeholder in the room's own layout, shown only if the socket takes more than 200ms.
  const cached = roomCache.get(id);
  if (cached) {
    S = cached;
    if (
      !cached.epics.some((e) => e.id === thread) &&
      !thread.startsWith("pre:")
    )
      thread = "main";
    renderBook();
  } else $app.innerHTML = roomSkeleton(id);
  // Reconnects back off (1s, 2s, 4s… 30s) and say why the last socket closed (rc, in the server's ws_state): a 1s fixed
  // retry reopened one room ~100×/hour for one person, 250 KB each (Nov 2026).
  const connection = createRoomConnection({
    url: (lastCode) =>
      `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/${id}?t=${encodeURIComponent(isPre() ? "main" : thread)}${lastCode ? `&rc=${lastCode}` : ""}`,
    onEvent: (event) => {
      if (roomConnection === connection) onEvent(event, id);
    },
    onRemoved: () => {
      if (roomConnection !== connection) return;
      clearViews();
      $app.innerHTML = `<div class="home"><p>${t("Você foi removido deste vibebook.")}</p><a data-nav href="/app">${icon("back")} ${t("seus vibebooks")}</a></div>`;
    },
    onUnavailable: () => {
      if (roomConnection !== connection) return;
      clearViews();
      $app.innerHTML = `<div class="home"><p>${t("Sem acesso a este vibebook. Peça para alguém de dentro te convidar.")}</p><a data-nav href="/app">← ${t("voltar")}</a></div>`;
    },
  });
  roomConnection = connection;
  connection.start();
}

const send = (m) => roomConnection?.send(m) ?? false;
const request = (m) => roomConnection?.request(m) ?? Promise.resolve({ ok:false, error:"offline" });

const viewMounts = new Map();
let boardLayoutCleanup = () => {};
let sideNavigation = null;
let sidePins = null;
const sidebarDragHandles = new WeakSet();
function disposeView(kind) {
  const mounted = viewMounts.get(kind);
  if (!mounted) return;
  mounted.target._mo?.disconnect();
  mounted.destroy();
  viewMounts.delete(kind);
}
function renderView(kind, target, props, remount = false) {
  let mounted = viewMounts.get(kind);
  if (mounted && (mounted.target !== target || remount)) {
    disposeView(kind);
    mounted = null;
  }
  if (!mounted) {
    target.replaceChildren();
    mounted = { ...UI.mountView(kind, target, props), target };
    viewMounts.set(kind, mounted);
  } else mounted.update(props);
}
let nativeFilesSession = null;
function clearViews() {
  disposePwaMounts();
  nativeFilesSession?.dispose();
  nativeFilesSession=null;
  sideNavigation = null;
  disposePinsSession(sidePins);
  sidePins = null;
  boardLayoutCleanup();
  boardLayoutCleanup = () => {};
  disposeCollab();
  // Svelte subscriptions and observers must stop when leaving a room, including
  // navigation to home/login where renderBook will not run again.
  for (const kind of viewMounts.keys()) disposeView(kind);
  pinRO.disconnect();
}
const panelBridge = () => ({ t, icon, avatar, ago, name, color, initials, mentions, locale: LOCALE });
const chatBridge = () => ({ t, name, knownNames, pageUrl:location.href, locale:LOCALE, avatarUrl:(email)=>{const v=S?.avatars?.[email]??avatarV[email];return v?`/api/avatar/${encodeURIComponent(email)}?v=${v}`:undefined;}, ago, hhmm, typingLabel: (mode) => modeLabel[mode] ?? mode, typingNote: (id) => typingNotes.get(id), dateTime: (ts) => new Date(ts).toLocaleString(LOCALE), waiting: (id) => myWaits.some((w) => w.book_id === S.id && w.ref === `m${id}`) });
function selectThread(id) { thread = id; boardEpic = id === "main" ? null : id; docRoom = false; leaveBoard(); renderSide(); renderChat(); renderKanban(); renderDoc(); }


function onEvent(ev, id) {
  // A callback already queued by a departed room's socket must not render into
  // the newly opened room (or its home screen).
  if (currentRoomId() !== id) return;
  const previousState = S;
  if (ev.t === "epicsPatch" && S) {
    const known = new Set([
      ...S.epics.map((e) => e.id),
      ...ev.changed.map((e) => e.id),
    ]);
    if (ev.order.some((id) => !known.has(id))) {
      roomConnection?.resync();
      return;
    }
  }
  if (roomStore.get() !== S) roomStore.replace(S);
  S = roomStore.apply(ev, id);
  if (ev.t === "state" && S && nativePersonal?.acceptIdentity(S.me)) return;
  if (S && (ev.t === "meta" || ev.t === "state"))
    nativePersonal?.roomMeta(id, {
      title: S.book.title,
      folder: S.book.folder,
      summary: S.book.summary,
    });
  if (S) roomCache.set(id, S);
  switch (ev.t) {
    case "state": {
      nativePwa.account(S.me);
      const firstLoad = !previousState;
      typingNotes.clear();
      liveState = true;
      // A fresh state has only the open thread in full and only its doc: let other threads and docs load again.
      olderBusy = false;
      for (const k of [...fillOf]) if (k.startsWith(id)) fillOf.delete(k);
      for (const k of [...docAsked]) if (k.startsWith(id)) docAsked.delete(k);
      roomCache.delete(id);
      roomCache.set(id, S);
      if (roomCache.size > 12) roomCache.delete(roomCache.keys().next().value);
      if (S.messages.length) seenHere(S.messages.at(-1).id);
      loadRoomAgents();
      if (firstLoad) renderBook(); else { renderSide(); renderChat(stick ? undefined : "stay"); renderDoc(true); renderTasks(); renderKanban(); renderFiles(false, true); renderApps(); renderReminders(); renderDecisions(); }
      return;
    }
    case "closed": renderChat("stay"); return;
    case "moved": { const m = S.messages.find((x) => x.id === ev.id); if (m) { renderChat(true); refreshThreadCards(); renderSide(); } break; }
    case "msg": seenHere(ev.m.id); if (ev.m.thread !== "main" && thread === "main") refreshThreadCards(); if (ev.m.thread === thread) { appendMsg(ev.m); if (ev.m.files?.length) renderThreadFiles(); } renderSide();
      // appendMsg refreshed the native parent choices/card along with its reply.
      if (ev.m.reply_to && ev.m.thread !== thread) renderChat("stay");
      notifyMsg(ev.m);
      return;
    case "delta":
      typingNotes.delete(ev.id);
      renderChat(stick ? undefined : "stay");
      return;
    case "typing":
      if (ev.note) typingNotes.set(ev.id, ev.note);
      else typingNotes.delete(ev.id);
      renderChat("stay");
      return;
    case "epicsPatch":
    case "epics":
      if (thread !== "main" && !isPre() && !S.epics.some((e) => e.id === thread)) thread = "main"; renderSide(); renderTasks(); renderKanban(); renderChat("stay"); return;
    case "docNotes": renderDoc(); return;
    case "doc": {
      // A big epic doc comes as "stale": the tab showing it fetches it, the others drop their copy. Only the doc on
      // screen is redrawn (each task tick in another epic used to re-render the open doc).
      const shown = (ev.epic || null) === docEpic();
      if (ev.stale) {
        if (shown) send({ t: "doc.get", epic: ev.epic });
        else docAsked.delete(S.id + ev.epic);
        return;
      }
      if (shown || ev.fetched) renderDoc();
      return;
    }
    case "meta":
      renderSide();
      renderTasks();
      return;
    case "suggestions": {
      const was = isPre()
        ? previousState?.suggestions[Number(thread.slice(4))]?.title
        : undefined;
      if (skipFrom !== null) {
        const n = S.suggestions.length;
        thread = n ? `pre:${Math.min(skipFrom, n - 1)}` : "main";
        skipFrom = null;
        renderChat();
      } else if (isPre() && preOf()?.title !== was) {
        const j = S.suggestions.findIndex((x) => x.title === was);
        thread = j >= 0 ? `pre:${j}` : "main";
        renderChat();
      }
      renderSide();
      return;
    }
    case "requests": renderSide(); return;
    case "members": renderSide(); return;
    case "files": renderSide(); renderFiles(); connsFilesChanged(); refreshVersions(); return;
    case "fileAdd": renderSide(); renderFiles(); connsFilesChanged(); refreshVersions(); renderThreadFiles(); return;
    case "reminders": renderReminders(); return;
    case "decisions": renderDecisions(); return;
    case "conns": conns = null; if (document.querySelector('.doc[data-pane="apps"]') && !connApp) renderConns(); else if (!connApp) loadConns(); return;
    case "pins": renderSide(); renderFiles(); renderApps(); return;
    case "error": toast(esc(ev.error || t("falhou"))); return;
    case "receipts": renderChat("stay"); return;
    case "older": {
      olderBusy = false;
      if (!ev.more) olderDone[S.id + ev.thread] = true;
      if (ev.thread === thread) {
        win.n += ev.messages.length;
        renderChat(!fillOf.delete(S.id + ev.thread));
      }
      if (goPending && ev.thread === thread) {
        const g = goPending;
        if (S.messages.some((x) => x.id === g.id)) {
          goPending = null;
          const generation = nativeRouter.generation();
          setTimeout(() => {
            if (generation === nativeRouter.generation() && S?.id === id)
              goToMsg(g.id);
          }, 50);
        } else if (ev.more && ++g.n < 15) pullOlder();
        else {
          goPending = null;
          toast(t("Não achei essa mensagem nesta sala."));
        }
      }
      return;
    }
    case "acks": renderChat("stay"); renderSide(); return;
    case "ackRows": { // just the rows that changed: replace by message + agent
      renderChat("stay"); renderSide(); return;
    }
    case "poll":
      renderChat("stay");
      return;
    case "online":
      renderSide();
      return;
    case "blocked": {
      const input = document.getElementById("input");
      if (input && !input.value) input.value = ev.text;
      alert(
        t(
          "Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.",
          { reason: ev.reason },
        ),
      );
      return;
    }
  }
}

const modeLabel = {
  route: t("escolhendo o modelo"),
  fast: t("rápido"),
  smart: t("com calma"),
};

// Native document-owned PWA/notifications; route mounts never duplicate listeners.
const nativePwa=UI.createPwaService();
async function logoutWithPwa(all){
  try{
    const cleanup=await nativePwa.beforeLogout();
    if(!cleanup.confirmed)alert(UI.pwaLogoutWarning(LANG));
    const response=await fetch(all?"/auth/logout-all":"/auth/logout",{method:"POST"});
    if(!response.ok)throw new Error("logout-unconfirmed");
    location.href=all?uiNavigationUrl("/login",location.href,"svelte"):"/";
  }catch{
    // A failed response may still have changed the session. A fresh document
    // must establish the account before any further endpoint reconciliation.
    alert(UI.pwaLogoutFailure(LANG));location.reload();
  }
}
let nativePwaMounts=[];
function disposePwaMounts(){for(const dispose of nativePwaMounts)dispose();nativePwaMounts=[];}
function renderBells(){
  disposePwaMounts();
  document.querySelectorAll('[data-native-pwa-bell]').forEach(target=>nativePwaMounts.push(UI.mountPwa(target,'bell',nativePwa,LANG)));
  document.querySelectorAll('[data-native-install-slot]').forEach(target=>nativePwaMounts.push(UI.mountPwa(target,'install',nativePwa,LANG)));
}
function notifyMsg(message){if(S)nativePwa.notify(message,S,thread,mentionTarget,m=>m.author==='ai'?'@vibe':m.kind==='agent'?t('{via} de {who}',{via:m.via||'agent',who:name(m.author)}):name(m.author));}
if(import.meta.hot)import.meta.hot.dispose(()=>{disposePwaMounts();nativePwa.dispose();});

function renderBook() {
  clearViews();
  document.title = `${S.book?.title ?? "vibebook"} · vibebook`;
  $app.innerHTML = `
  <div class="book ${railMode ? "rail" : ""}">
    <aside class="side tw:[@media(max-width:900px)]:max-h-[calc(var(--vvh,100dvh)_-_max(96px,var(--vvh,100dvh)*.2))]!" id="side"></aside>
    <main class="chat">
      <div class="chathead"><a class="phHome" href="/app" data-nav aria-label="${t("Seus vibebooks")}" title="${t("Seus vibebooks")}">${icon("back", 20)}</a><h2 id="threadTitle"></h2><button class="ghost" id="toggleBoard" title="${t("Quadro de tarefas (kanban)")}" aria-pressed="false">${icon("board")}<span class="lbl">${t("Quadro")}</span></button><button class="ghost inboxBtn" id="inboxBtn" title="${t("Caixa de entrada: o que espera por você")}" aria-label="${t("Caixa de entrada")}">${icon("inbox")}<b class="kN" hidden></b></button><span data-native-pwa-bell></span><button class="ghost" id="myClaude" aria-pressed="false" hidden>✻ <span class="lbl">Agent</span></button><button class="ghost" id="toggleDoc" title="${t("mostrar/ocultar documento")}">${icon("doc")}<span class="lbl">Doc</span></button></div>
      <div class="docPeek" id="docPeek" role="toolbar" aria-label="${t("Documento e arquivos da sala")}"><div class="peekRow"><button type="button" class="peekDoc" data-pane="doc" id="peekTxt" aria-label="${t("Abrir documento")}"></button><button type="button" data-pane="files" title="${t("Arquivos")}" aria-label="${t("Arquivos")}">${icon("paperclip", 18)}<small id="peekFiles"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${icon("chart", 18)}</button><button type="button" data-pane="decisions" title="${t("Decisões")}" aria-label="${t("Decisões")}">${icon("check", 18)}</button><button type="button" data-pane="reminders" title="${t("Lembretes")}" aria-label="${t("Lembretes")}">${icon("clock", 18)}<small id="peekRem"></small></button><button type="button" class="peekAgents" data-pane="agents" title="Agents" aria-label="Agents">${STAR}<i class="qDot"></i><small class="qN"></small></button></div><i class="grab"></i></div>
      <div id="tasksHome" hidden><div class="tasks" id="tasks"></div></div>
      <div class="agentNudge" id="agentNudge" hidden></div><div class="claudeBar" id="claudeBar" hidden></div><div class="askBar" id="askBar" hidden></div><div class="thFiles" id="thFiles" hidden></div>
      <div class="msgs" id="msgs"></div>
      <div class="kanban" id="kanban"></div>
      <form class="composer" id="composer">
        <div class="tray" id="tray"></div>
        <div class="replyBar" id="replyBar" hidden></div>
        <div class="mentionPop" id="mentionPop" role="listbox" aria-label="${t("Mencionar")}" hidden></div>
        <div class="row">
          <button type="button" class="ghost icon emojiBtn" id="emojiBtn" title="${t("Emoji")}" aria-label="${t("Emoji")}" aria-haspopup="dialog" aria-expanded="false">🙂</button>
          <div class="mentionPop emojiPop" id="emojiPop" role="dialog" aria-label="${t("Emoji")}" hidden><input type="search" id="emojiQ" placeholder="${t("Buscar emoji…")}" autocomplete="off"><div class="eGrid" id="emojiGrid"></div></div>
          <button type="button" class="ghost icon" id="plusBtn" title="${t("Anexar, mencionar, votação")}" aria-label="${t("Mais opções")}" aria-haspopup="menu" aria-expanded="false">${icon("plus", 18)}</button>
          <div class="mentionPop plusMenu" id="plusMenu" role="menu" hidden>
            <button type="button" role="menuitem" id="attach">${icon("paperclip")} ${t("Anexar arquivo")} <small>${t("ou Cmd+V")}</small></button>
            <button type="button" role="menuitem" id="mentionBtn">${icon("at")} ${t("Mencionar alguém")} <small>@</small></button>
            <button type="button" role="menuitem" id="pollBtn">${icon("chart")} ${t("Criar votação")}</button>
          </div>
          <input type="file" id="fileInput" accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac" multiple hidden />
          <textarea id="input" rows="1" placeholder="${t("Mensagem…")}"></textarea><button class="primary" id="sendBtn">${t("Enviar")}</button>
        </div>
      </form>
    </main>
    <section class="doc">
      <button type="button" class="docEditBar" id="docEditBar"></button>
      <button type="button" class="sheetGrab" id="docGrab" aria-label="${t("Fechar documento")}"><i></i></button>
      <div class="resizer" id="resizer" role="separator" aria-orientation="vertical" aria-label="${t("Redimensionar documento")}" tabindex="0"></div>
      <header><div class="ptabs" role="tablist"><button type="button" class="ptDoc" data-pane="doc">${icon("doc", 16)} Doc</button><button type="button" class="ptBoard" data-pane="board" title="${t("Quadro de tarefas")}" aria-label="${t("Quadro de tarefas")}">${icon("board", 17)}<b class="kN" hidden></b></button><button type="button" data-pane="files" title="${t("Arquivos")}" aria-label="${t("Arquivos")}">${icon("paperclip", 17)}<small id="fileCount"></small></button><button type="button" data-pane="apps" title="Apps" aria-label="Apps">${icon("chart", 17)}<small id="appCount"></small></button><button type="button" data-pane="decisions" title="${t("Decisões")}" aria-label="${t("Decisões")}">${icon("check", 17)}<small id="decCount"></small></button><button type="button" data-pane="reminders" title="${t("Lembretes")}" aria-label="${t("Lembretes")}">${icon("clock", 17)}<small id="remCount"></small></button><button type="button" class="ptAgents" data-pane="agents" title="Agents" aria-label="Agents">${STAR}<i class="qDot"></i><small class="qN"></small></button></div><div class="seg" role="group" aria-label="${t("Modo do documento")}"><button type="button" data-view="preview">${t("Ver")}</button><button type="button" data-view="edit">${t("Editar")}</button></div></header>
      <div class="docCrumb" id="docCrumb" hidden></div>
      <div class="preview" id="preview"></div>
      <textarea id="doc" placeholder="${t("O documento do vibebook. Todo mundo edita; o @vibe mantém atualizado com as decisões.")}"></textarea>
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
    <h3>${t("Nova votação")}</h3>
    <form id="pollForm">
      <input name="q" required maxlength="300" placeholder="${t("Pergunta (ex.: Qual cruzeiro?)")}" />
      <div id="pollOpts" style="display:grid;gap:8px"></div>
      <button type="button" class="link" id="addOpt" style="justify-self:start">+ ${t("opção")}</button>
      <label style="display:flex;gap:8px;align-items:center;font-size:14px"><input type="checkbox" name="multi" /> ${t("cada pessoa pode escolher várias")}</label>
      <div class="acts"><button type="button" id="pollCancel">${t("Cancelar")}</button><button class="primary">${t("Criar votação")}</button></div>
    </form>
  </dialog>`;
  const book = $app.querySelector(".book");
  // The doc sheet hangs right under the room header, whose height varies (safe area, wrapped title).
  const headObs = new ResizeObserver(() => {
    const h = book.querySelector(".chathead").getBoundingClientRect().height,
      p =
        document.getElementById("docPeek")?.getBoundingClientRect().height || 0;
    document.documentElement.style.setProperty("--headH", `${Math.round(h)}px`);
    document.documentElement.style.setProperty("--peekH", `${Math.round(p)}px`);
  });
  headObs.observe(book.querySelector(".chathead"));
  headObs.observe(document.getElementById("docPeek"));
  // Phones: the toolbar under the header is the doc sheet's own tab bar. A tab opens the sheet on it; the open tab
  // again closes it. Dragging the bar down opens the doc too.
  sheetDrag(document.getElementById("docPeek"), "doc", true, (e) => {
    const pane = e.target.closest("[data-pane]")?.dataset.pane || "doc";
    if (book.dataset.sheet === "doc" && book.dataset.pane === pane)
      return closeSheet();
    if (book.classList.contains("boardview"))
      document.getElementById("toggleBoard").click(); // doc and board: one at a time
    setPane(pane);
    openSheet("doc");
  });
  sheetDrag(document.getElementById("docGrab"), "doc", false);
  document.getElementById("sheetDim").onclick = () => closeSheet();
  document.getElementById("toggleDoc").onclick = () =>
    book.classList.toggle("nodoc");
  const setBoard = (on) => {
    if (!document.body.contains(book)) return;
    if (on)
      moveBoardContainer(
        book,
        book.querySelector(":scope > .chat"),
        book.querySelector(":scope > .chat > #composer"),
      );
    book.classList.toggle("boardview", on);
    book.classList.toggle("nodoc", on); // the board wants the width
    document
      .getElementById("toggleBoard")
      .setAttribute("aria-pressed", String(on));
    if (on) {
      closeSheet();
      renderKanban();
    }
  };
  document.getElementById("toggleBoard").onclick = () =>
    setBoard(!book.classList.contains("boardview"));
  // Entering a room always opens chat + doc; the board is one click away.
  // Resizable doc panel; width remembered per browser.
  const setDocW = (w) => {
    w = Math.round(Math.min(Math.max(w, 260), window.innerWidth - 260 - 320));
    book.style.setProperty("--doc-w", `${w}px`);
    try {
      localStorage.setItem("vb.docW", w);
    } catch {}
  };
  try {
    const saved = Number(localStorage.getItem("vb.docW"));
    if (saved) setDocW(saved);
  } catch {}
  const resizer = document.getElementById("resizer");
  resizer.onpointerdown = (e) => {
    e.preventDefault();
    resizer.setPointerCapture(e.pointerId);
    resizer.classList.add("drag");
    document.body.classList.add("resizing");
    resizer.onpointermove = (ev) => setDocW(window.innerWidth - ev.clientX);
    resizer.onpointerup = () => {
      resizer.onpointermove = null;
      resizer.classList.remove("drag");
      document.body.classList.remove("resizing");
    };
  };
  resizer.ondblclick = () => setDocW(380);
  resizer.onkeydown = (e) => {
    const cur = document.querySelector(".doc").getBoundingClientRect().width;
    if (e.key === "ArrowLeft") setDocW(cur + 24);
    else if (e.key === "ArrowRight") setDocW(cur - 24);
  };
  const input = document.getElementById("input");
  // 🙂 picker: the same names as the :shortcodes: (EMOJI), one button per emoji, filtered by name; a pick goes in at the
  // cursor. The keyboard's own emoji key still works; this is for the desktop and for finding one by name.
  {
    const btn = document.getElementById("emojiBtn"),
      box = document.getElementById("emojiPop"),
      q = document.getElementById("emojiQ"),
      grid = document.getElementById("emojiGrid");
    const all = [
      ...new Map(Object.entries(EMOJI).map(([k, v]) => [v, k])).entries(),
    ]; // [emoji, first name]
    const draw = () => {
      const w = q.value.trim().toLowerCase().replace(/:/g, "");
      grid.innerHTML = all
        .filter(
          ([e, k]) =>
            !w ||
            Object.entries(EMOJI).some(([n, v]) => v === e && n.includes(w)),
        )
        .map(
          ([e, k]) =>
            `<button type="button" title=":${esc(k)}:" data-emoji="${e}">${e}</button>`,
        )
        .join("");
    };
    const close = () => {
      box.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    };
    btn.onclick = (ev) => {
      ev.stopPropagation();
      if (!box.hidden) return close();
      q.value = "";
      draw();
      box.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      if (!matchMedia("(pointer: coarse)").matches) q.focus();
    };
    q.oninput = draw;
    q.onkeydown = (ev) => {
      if (ev.key === "Escape") {
        close();
        input.focus();
      }
      if (ev.key === "Enter") {
        ev.preventDefault();
        grid.querySelector("button")?.click();
      }
    };
    grid.onclick = (ev) => {
      const b = ev.target.closest("[data-emoji]");
      if (!b) return;
      const a = input.selectionStart ?? input.value.length,
        z = input.selectionEnd ?? a;
      input.value =
        input.value.slice(0, a) + b.dataset.emoji + input.value.slice(z);
      input.focus();
      input.selectionStart = input.selectionEnd = a + b.dataset.emoji.length;
      input.dispatchEvent(new Event("input"));
      close();
    };
    document.addEventListener("click", (ev) => {
      if (!box.hidden && !box.contains(ev.target) && ev.target !== btn) close();
    });
  }
  // @ autocomplete: people in the room (you excluded), filtered by what follows the @.
  const pop = document.getElementById("mentionPop");
  let picks = [],
    pickAt = 0,
    atStart = -1;
  const closePop = () => {
    pop.hidden = true;
    picks = [];
    atStart = -1;
  };
  const choose = (i) => {
    const p = picks[i];
    if (!p) return;
    const caret = input.selectionStart;
    input.value = `${input.value.slice(0, atStart)}@${p.handle} ${input.value.slice(caret)}`;
    const at = atStart + p.handle.length + 2;
    input.setSelectionRange(at, at);
    closePop();
    input.focus();
    input.oninput();
  };
  const renderPop = () => {
    pop.innerHTML = picks
      .map(
        (p, i) =>
          `<button type="button" role="option" class="${i === pickAt ? "sel" : ""}" data-i="${i}">${avatar(p.email)}<b>@${esc(p.handle)}</b><small>${esc(p.label)}</small></button>`,
      )
      .join("");
    pop.hidden = !picks.length;
  };
  pop.onmousedown = (e) => {
    const b = e.target.closest("[data-i]");
    if (b) {
      e.preventDefault();
      choose(Number(b.dataset.i));
    }
  };
  const updatePop = () => {
    const before = input.value.slice(0, input.selectionStart);
    const m = before.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
    if (!m) return closePop();
    atStart = before.length - m[2].length - 1;
    const q = fold(m[2]);
    const people = [
      ...(S.members || [])
        .filter((e) => e !== S.me)
        .map((e) => ({
          email: e,
          handle: handleOf(e),
          label: name(e) === handleOf(e) ? e : name(e),
        })),
    ];
    // Your cloud sandboxes here: @<name> sends the message to that Claude only.
    if (roomAgents.id === S.id)
      for (const x of roomAgents.sandboxes || [])
        if (x.email === S.me)
          people.push({
            email: x.email,
            handle: x.name,
            label: t("seu agent no sandbox"),
          });
    picks = people
      .filter((p) => !q || p.handle.startsWith(q) || fold(p.label).includes(q))
      .slice(0, 8);
    pickAt = 0;
    renderPop();
  };
  input.oninput = () => {
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
    updatePop();
  };
  input.onblur = () => setTimeout(closePop, 100);
  input.onkeydown = (e) => {
    if (!pop.hidden && picks.length) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        pickAt =
          (pickAt + (e.key === "ArrowDown" ? 1 : picks.length - 1)) %
          picks.length;
        return renderPop();
      }
      if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) {
        e.preventDefault();
        return choose(pickAt);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        return closePop();
      }
    }
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      document.getElementById("composer").requestSubmit();
    }
  };
  // Attachments: paste, drop or 📎. Upload right away; send once all are done.
  const tray = document.getElementById("tray");
  const sendBtn = document.getElementById("sendBtn");
  // Phones: the tap would first blur the textarea, the keyboard closes, the composer moves and the click misses the
  // button (a second tap needed). Send on touchend instead, without letting the textarea lose focus.
  sendBtn.addEventListener("touchend", (e) => {
    if (sendBtn.disabled) return;
    e.preventDefault();
    document.getElementById("composer").requestSubmit();
  });
  sendBtn.addEventListener("mousedown", (e) => e.preventDefault());
  const renderTray = () => {
    tray.innerHTML = attached
      .map(
        (
          p,
          i,
        ) => `<div class="pend ${!p.meta && !p.error ? "up" : ""} ${p.error ? "err" : ""}" title="${esc(p.error || p.file.name)}">
      ${p.url ? `<img src="${p.url}" alt="">` : `${icon("file", 22)}<br>${esc(p.file.name.slice(0, 18))}`}${p.error ? `<span style="position:relative;z-index:1">${esc(p.error)}</span>` : ""}
      <button type="button" class="rm" data-rm="${i}" aria-label="${t("Remover anexo")}">${icon("x")}</button></div>`,
      )
      .join("");
    tray.querySelectorAll("[data-rm]").forEach(
      (b) =>
        (b.onclick = () => {
          const [p] = attached.splice(Number(b.dataset.rm), 1);
          if (p?.url) URL.revokeObjectURL(p.url);
          renderTray();
        }),
    );
    const uploading = attached.some((p) => !p.meta && !p.error);
    sendBtn.disabled = uploading;
    sendBtn.textContent = uploading ? t("Enviando…") : t("Enviar");
  };
  const addFiles = (list) => {
    for (let file of list) {
      if (!file.type && /\.html?$/i.test(file.name))
        file = new File([file], file.name, { type: "text/html" });
      if (!file.type && /\.md$/i.test(file.name))
        file = new File([file], file.name, { type: "text/markdown" });
      // .csv often arrives as application/vnd.ms-excel (Excel on the Mac) or with no type: go by the extension.
      const text = { txt: "text/plain", csv: "text/csv" }[
        (/\.(\w+)$/.exec(file.name)?.[1] || "").toLowerCase()
      ];
      if (text && file.type !== text)
        file = new File([file], file.name, { type: text });
      // Recordings often come with no type (or a generic one) from Files/Finder: take it from the extension.
      const aext =
        AUDIO_EXT[(/\.(\w+)$/.exec(file.name)?.[1] || "").toLowerCase()];
      if (aext && !file.type.startsWith("audio/"))
        file = new File([file], file.name, { type: aext });
      if (!FILE_TYPES.includes(file.type)) {
        alert(
          `${file.name}: ${t("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}`,
        );
        continue;
      }
      const audio = file.type.startsWith("audio/");
      if (file.size > (audio ? 50 : 10) * 1024 * 1024) {
        alert(
          `${file.name}: ${audio ? t("áudio maior que 50MB.") : t("maior que 10MB.")}`,
        );
        continue;
      }
      if (!file.name || file.name === "image.png")
        file = new File(
          [file],
          `print-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png`,
          { type: file.type },
        );
      const p = {
        file,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      };
      attached.push(p);
      createRoomApi(S.id)
        .uploadFile({ name: file.name, type: file.type, body: file })
        .then((result) => {
          p.meta = result;
        })
        .catch((error) => {
          p.error = error.message || t("sem conexão");
        })
        .finally(renderTray);
    }
    renderTray();
  };
  const fileInput = document.getElementById("fileInput");
  // "+" menu: attach, mention, poll. Closes on pick, outside click or Escape.
  const plusBtn = document.getElementById("plusBtn"),
    plusMenu = document.getElementById("plusMenu");
  const togglePlus = (open = plusMenu.hidden) => {
    plusMenu.hidden = !open;
    plusBtn.setAttribute("aria-expanded", String(open));
  };
  plusBtn.onclick = (e) => {
    e.stopPropagation();
    togglePlus();
  };
  // Phone, keyboard up: the tap used to blur the box, the keyboard dropped, the composer moved down under the finger
  // and the click landed elsewhere (a second tap needed). Keeping the focus keeps the keyboard and the button in place.
  plusBtn.onmousedown = plusBtn.onpointerdown = (e) => {
    if (document.activeElement?.id === "input") e.preventDefault();
  };
  plusMenu.onclick = () => togglePlus(false);
  plusMenu.closest("main").addEventListener("click", (e) => {
    if (!plusMenu.hidden && !plusMenu.contains(e.target)) togglePlus(false);
  });
  plusMenu.onkeydown = (e) => {
    if (e.key === "Escape") {
      togglePlus(false);
      plusBtn.focus();
    }
  };
  document.getElementById("mentionBtn").onclick = () => {
    const at = input.selectionStart ?? input.value.length,
      before = input.value.slice(0, at);
    const ins = before && !/\s$/.test(before) ? " @" : "@";
    input.value = before + ins + input.value.slice(at);
    input.focus();
    input.setSelectionRange(at + ins.length, at + ins.length);
    setTimeout(() => input.oninput(), 120); // after input.onblur's delayed closePop
  };
  document.getElementById("attach").onclick = () => fileInput.click();
  fileInput.onchange = () => {
    addFiles([...fileInput.files]);
    fileInput.value = "";
  };
  // Cmd+V of a screenshot: some apps (CleanShot…) only fill clipboardData.items, and focus may be outside the box.
  document.onpaste = (e) => {
    const t = e.target,
      typing =
        t instanceof HTMLElement &&
        (t.isContentEditable || /^(INPUT|TEXTAREA)$/.test(t.tagName));
    if (!input.isConnected || (typing && t !== input)) return;
    let files = [...(e.clipboardData?.files ?? [])];
    if (!files.length)
      files = [...(e.clipboardData?.items ?? [])]
        .filter((i) => i.kind === "file")
        .map((i) => i.getAsFile())
        .filter(Boolean);
    if (files.length) {
      e.preventDefault();
      addFiles(files);
      input.focus();
    }
  };
  const chatEl = $app.querySelector(".chat");
  chatEl.addEventListener("dragover", (e) => {
    if ([...e.dataTransfer.types].includes("Files")) {
      e.preventDefault();
      chatEl.classList.add("drop");
    }
  });
  chatEl.addEventListener("dragleave", (e) => {
    if (!chatEl.contains(e.relatedTarget)) chatEl.classList.remove("drop");
  });
  chatEl.addEventListener("drop", (e) => {
    e.preventDefault();
    chatEl.classList.remove("drop");
    addFiles([...e.dataTransfer.files]);
  });

  document.getElementById("composer").onsubmit = (e) => {
    e.preventDefault();
    if (attached.some((p) => !p.meta && !p.error)) return;
    const text = input.value.trim();
    const files = attached.filter((p) => p.meta).map((p) => p.meta.id);
    if (!text && !files.length) return;
    send({ t: "msg", thread, text, files, reply_to: replyTo?.id });
    replyTo = null;
    renderReply();
    attached.forEach((p) => p.url && URL.revokeObjectURL(p.url));
    attached = [];
    input.value = "";
    input.oninput();
    renderTray();
  };

  // Polls: create via dialog, vote/close via delegation on the message list.
  const dlg = document.getElementById("pollDlg");
  const opts = document.getElementById("pollOpts");
  const addOpt = (v = "") => {
    opts.insertAdjacentHTML(
      "beforeend",
      `<input name="opt" maxlength="200" placeholder="${t("Opção {n}", { n: opts.children.length + 1 })}" value="${esc(v)}" />`,
    );
  };
  document.getElementById("pollBtn").onclick = () => {
    document.getElementById("pollForm").reset();
    opts.innerHTML = "";
    addOpt();
    addOpt();
    addOpt();
    dlg.showModal();
  };
  document.getElementById("addOpt").onclick = () => {
    if (opts.children.length < 10) addOpt();
    opts.lastElementChild.focus();
  };
  document.getElementById("pollCancel").onclick = () => dlg.close();
  document.getElementById("pollForm").onsubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const options = [...f.querySelectorAll('[name="opt"]')]
      .map((i) => i.value.trim())
      .filter(Boolean);
    if (options.length < 2) return alert(t("Coloque pelo menos 2 opções."));
    send({
      t: "poll.create",
      thread,
      question: f.q.value,
      options,
      multi: f.multi.checked,
    });
    dlg.close();
  };
  // Right panel: Documento / Arquivos
  const setPane = (pane) => {
    const doc = book.querySelector(":scope > .doc");
    if (!doc) return;
    doc.dataset.pane = pane;
    book.dataset.pane = pane; // the phone's toolbar marks the open tab
    doc.querySelectorAll(":scope > header .ptabs button").forEach((b) => {
      b.classList.toggle("sel", b.dataset.pane === pane);
      b.setAttribute("aria-selected", b.dataset.pane === pane);
    });
    // The room's state brings the newest 12 files; the whole list comes when Arquivos opens.
    if (pane === "files") renderFiles(true);
    if (pane === "decisions") renderDecisions();
    if (pane === "apps") renderApps();
    if (pane === "reminders") renderReminders();
    if (pane === "agents") {
      renderMyClaude();
      loadSandboxes();
    }
    if (pane === "board") {
      moveBoardContainer(book, doc);
      renderKanban();
    }
  };
  boardLayoutCleanup = watchBoardLayout(book, ROOM_PHONE, () => {
    setBoard(false);
    setPane("board");
  });
  $app
    .querySelectorAll(".ptabs button")
    .forEach((b) => (b.onclick = () => setPane(b.dataset.pane)));
  // The header's ✻ (desktop) shows the doc panel on Agents, where the switch for your Claude lives.
  // One pair of document listeners for the room on screen (replaced, not piled up, as rooms open).
  document.removeEventListener("click", roomDocClick);
  document.removeEventListener("vb:pane", roomDocPane);
  roomDocClick = (e) => {
    if (e.target.closest?.("[data-sbx-open]") && document.body.contains(book)) {
      closeSheet();
      document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" }));
      if (ROOM_PHONE.matches) openSheet("doc");
    }
  };
  roomDocPane = (e) => {
    if (!document.body.contains(book)) return;
    book.classList.remove("nodoc");
    setPane(e.detail);
  };
  document.addEventListener("click", roomDocClick);
  document.addEventListener("vb:pane", roomDocPane);
  setPane("doc");
  const doc = document.getElementById("doc");
  let timer;
  doc.oninput = () => {
    clearTimeout(timer);
    const generation = nativeRouter.generation(),
      roomId = S.id;
    timer = setTimeout(() => {
      if (
        !book.isConnected ||
        S?.id !== roomId ||
        nativeRouter.generation() !== generation
      )
        return;
      const ep = docEpic();
      if (ep) S.docs[ep] = doc.value;
      else S.doc = doc.value;
      send({ t: "doc", text: doc.value, epic: ep || undefined });
    }, 400);
  };
  doc.onblur = () => renderDoc();
  const docPanel = $app.querySelector(".doc");
  // Phones: the doc's foot is "✎ Editar" (reading) or "✓ Pronto" (editing); closing the sheet goes back to reading.
  function editBar(v) {
    const b = document.getElementById("docEditBar");
    if (b)
      b.innerHTML =
        v === "edit"
          ? `${icon("check", 16)} ${t("Pronto")}`
          : `${icon("pencil", 16)} ${t("Editar")}`;
  }
  document.getElementById("docEditBar").onclick = () =>
    setView(docPanel.dataset.view === "edit" ? "preview" : "edit");
  const setView = (v) => {
    docPanel.dataset.view = v;
    editBar(v);
    docPanel
      .querySelectorAll(".seg button")
      .forEach((b) => b.classList.toggle("sel", b.dataset.view === v));
    try {
      localStorage.setItem("vb.docView", v);
    } catch {}
    if (v === "edit") {
      ensureCollab();
      (collab || doc).focus();
    } else {
      ensureCollab();
      renderDoc();
    }
  };
  docPanel
    .querySelectorAll(".seg button")
    .forEach((b) => (b.onclick = () => setView(b.dataset.view)));
  let savedView = "preview";
  try {
    savedView = localStorage.getItem("vb.docView") || "preview";
  } catch {}
  docPanel.dataset.view = savedView;
  editBar(savedView);
  docPanel
    .querySelectorAll(".seg button")
    .forEach((b) => b.classList.toggle("sel", b.dataset.view === savedView));
  renderSide();
  renderChat();
  renderDoc(true);
  renderFiles();
  renderApps();
  renderReminders();
  renderDecisions();
  connectCard(document.getElementById("agentNudge"), S.id);
  renderBells();
  welcome();
  // A shared link to one message (/b/<room>#m123) lands on it.
  const landingGeneration = nativeRouter.generation(),
    landingRoom = S.id,
    landingHash = location.hash;
  const ownsLanding = () =>
    landingGeneration === nativeRouter.generation() &&
    S?.id === landingRoom &&
    book.isConnected;
  if (/^#m\d+$/.test(landingHash)) {
    const mid = messageIdentity(landingHash.slice(2));
    if (mid)
      setTimeout(() => {
        if (ownsLanding()) goToMsg(mid);
      }, 300);
  }
  // …and a link to one file (#f<id>, the viewer's own address) opens it.
  else if (/^#f[0-9a-f]+$/.test(landingHash)) {
    const fid = landingHash.slice(2);
    navigation.replaceState(null, "", location.pathname + location.search);
    setTimeout(() => {
      if (ownsLanding()) openFile(fid);
    }, 300);
  }
}
// A room file by id: its name and type from what's loaded (the newest 12, the messages), else asked for once.
function openFile(
  fid,
  again,
  ownership = { room: S?.id, generation: nativeRouter?.generation() },
) {
  if (
    !S ||
    S.id !== ownership.room ||
    nativeRouter?.generation() !== ownership.generation ||
    !$app.querySelector(".book")
  )
    return;
  const f =
    (S.files || []).find((x) => x.id === fid) ||
    allMsgs()
      .flatMap((x) => x.files || [])
      .find((x) => x.id === fid);
  if (!f && !again && !S.filesAll) {
    send({ t: "files.get" });
    return setTimeout(() => openFile(fid, true, ownership), 800);
  }
  openViewer(
    `/api/books/${S.id}/files/${fid}`,
    f?.type?.startsWith("image/") ? "img" : "frame",
    f?.name || t("arquivo"),
  );
}

// First room someone opens after being invited (not their own room): a few steps on how vibebook works (each
// person brings their Claude, context is shared), ending on the sentence that connects theirs. Once per person
// per browser. ponytail: localStorage; a users column would make it once per account if people complain.
function welcome() {
  const key = `vb.welcomed.${S.me}`;
  try {
    if (!S.book?.owner || S.me === S.book.owner || localStorage.getItem(key))
      return;
    localStorage.setItem(key, "1");
  } catch {
    return;
  }
  const owner = name(S.book.owner);
  const steps = [
    [
      icon("hand", 24),
      t("Bem-vindo a <b>{room}</b>", {
        room: esc(S.book.title || t("esta sala")),
      }),
      t(
        "{owner} te chamou pra cá. Cada conversa importante ganha uma sala no vibebook: o chat, as tarefas e o doc do projeto ficam juntos.",
        { owner: esc(owner) },
      ),
    ],
    [
      "✻",
      t("Cada um traz o seu agent"),
      t(
        "Você conecta o seu agent, no seu computador e com as suas permissões. Ele lê a sala, pega tarefas, atualiza os épicos e conta o que entregou. Só o que <b>você</b> escreve é instrução pra ele: o resto ele lê como contexto.",
      ),
    ],
    [
      icon("paperclip", 24),
      t("O contexto é de todo mundo"),
      t(
        "Doc, arquivos, decisões e tarefas ficam na sala, e todo agent lê o mesmo contexto antes de agir. Quando alguém passa o bastão ou fica esperando você, a sala mostra.",
      ),
    ],
    [icon("arrowRight", 24), t("Conecte o seu agent"), ""],
  ];
  const d = document.createElement("dialog");
  d.className = "welcome";
  document.body.appendChild(d);
  let i = 0;
  const done = () => {
    d.close();
    d.remove();
    connectCard(document.getElementById("agentNudge"), S.id);
  };
  const show = () => {
    const [ico, ttl, p] = steps[i],
      last = i === steps.length - 1;
    d.innerHTML = `<div class="wIco">${ico}</div><h3>${ttl}</h3>${p ? `<p>${p}</p>` : `<p>${t("Cole isto no <b>Claude Code</b>, dentro da pasta do projeto. Ele instala o vibebook, entra nesta sala e fica ouvindo.")}</p><div id="wConnect"></div>`}
      <div class="wFoot"><span class="wDots">${steps.map((_, j) => `<i class="${j === i ? "on" : ""}"></i>`).join("")}</span>
        ${i ? `<button type="button" class="ghost" data-w="-1">${t("Voltar")}</button>` : `<button type="button" class="ghost" data-w="skip">${t("Pular")}</button>`}
        <button type="button" class="primary" data-w="1">${last ? t("Entrar na sala") : t("Próximo")}</button></div>`;
    d.querySelectorAll("[data-w]").forEach(
      (b) =>
        (b.onclick = () => {
          const w = b.dataset.w;
          if (w === "skip" || (w === "1" && last)) return done();
          i += Number(w);
          show();
        }),
    );
    if (last)
      connectCard(d.querySelector("#wConnect"), S.id).then(() => {
        const c = d.querySelector("#wConnect");
        if (c && c.hidden) {
          c.hidden = false;
          c.innerHTML = `<div class="setup done"><span class="setupIcon">${icon("check", 22)}</span><div><b>${t("Seu agent já está conectado.")}</b><span>${t("Ligue ele nesta sala com ✻ Ligar agent, no topo.")}</span></div></div>`;
        }
      });
    d.querySelector(".wFoot .primary").focus();
  };
  d.addEventListener("cancel", (e) => {
    e.preventDefault();
    done();
  });
  show();
  d.showModal();
}

// Co-editing: in edit mode the doc is a CodeMirror bound to a Yjs doc on the room's DocRoom (/yjs/<room>[~<epic>]),
// with everyone's cursors. Loaded on first edit; if it can't load or connect, the plain textarea keeps working.
let collab = null,
  collabKey = null,
  collabLoad = null,
  collabGen = 0;
function disposeCollab() {
  // Invalidate callbacks before provider.destroy(), which can emit disconnected.
  ++collabGen;
  const previous = collab;
  collab = null;
  collabKey = null;
  previous?.destroy();
}
function ensureCollab() {
  const panel = $app.querySelector(".doc"),
    host = document.getElementById("cm");
  const ep = docEpic();
  const key =
    panel?.dataset.view === "edit" && S?.id && !isPre()
      ? ep
        ? `${S.id}~${ep}`
        : S.id
      : null;
  if (key === collabKey) return;
  disposeCollab();
  collabKey = key;
  panel?.classList.remove("collab");
  if (host) host.innerHTML = "";
  // Only the newest request mounts: switching room/epic while the module loads (A → B → A) must not leave two editors.
  const gen = collabGen;
  if (!key || !host) return;
  (collabLoad ??= import(/* @vite-ignore */ "/collab-svelte.js"))
    .then((m) => {
      if (gen !== collabGen) return;
      collab?.destroy();
      host.innerHTML = "";
      collab = m.mountCollab(host, {
        room: key,
        name: name(S.me),
        color: color(S.me),
        onText: (t) => {
          if (gen !== collabGen) return;
          if (ep) S.docs[ep] = t;
          else S.doc = t;
        },
        onStatus: (s) => {
          if (gen !== collabGen) return;
          panel.classList.toggle("collab", s === "connected");
          if (s !== "connected") renderDoc(true);
        },
      });
    })
    .catch(() => {
      collabLoad = null;
    });
}

const SIDEBAR_ICON = icon("sidebar", 20);
const bookTitle = () => S?.book?.title || "vibebook";
const COVERS = [
  "oklch(0.5 0.17 248)",
  "oklch(0.58 0.17 35)",
  "oklch(0.52 0.11 175)",
  "oklch(0.47 0.15 315)",
  "oklch(0.6 0.13 75)",
  "oklch(0.45 0.1 145)",
  "oklch(0.36 0.06 255)",
  "oklch(0.55 0.16 10)",
];
const coverColor = (t) =>
  COVERS[
    [...String(t)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) %
      COVERS.length
  ];
const STOP = new Set([
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
  "of",
]);
const initials = (t) => {
  const words = t
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const main = words.filter((w) => !STOP.has(w.toLowerCase()));
  return (
    (main.length ? main : words)
      .slice(0, 2)
      .map((w) => w[0])
      .join("") || "◆"
  ).toUpperCase();
};
// The open room's mark in its own sidebar: its icon if it has one, else cover color + initials.
const roomMark = (cls) => {
  const u = iconUrl(myBooks?.find((b) => b.id === S?.id));
  if (!cls) return u ? `<img src="${u}" alt="">` : esc(initials(bookTitle()));
  return u
    ? `<span class="${cls} hasIcon"><img src="${u}" alt=""></span>`
    : `<span class="${cls}" style="background:${coverColor(bookTitle())}">${esc(initials(bookTitle()))}</span>`;
};
// Any image (ico included) → a square PNG, contained on transparent, for room icons.
async function squarePng(file, size) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error(t("Não consegui ler essa imagem.")));
      i.src = url;
    });
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const k = Math.min(size / img.naturalWidth, size / img.naturalHeight),
      w = img.naturalWidth * k,
      h = img.naturalHeight * k;
    c.getContext("2d").drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    return await new Promise((res) => c.toBlob(res, "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}
// Tab icon = the room's card: its cover color with its initials (canvas, so oklch and Caprasimo just work).
async function setFavicon(title) {
  const link = document.querySelector('link[rel="icon"]');
  if (!title) {
    link.type = "image/svg+xml";
    link.href = "/favicon.svg";
    return;
  }
  const own = iconUrl(myBooks?.find((b) => b.id === S?.id));
  // The room's own icon goes in rounded like the generated one: a square image (or one with a white backdrop)
  // otherwise shows white corners on a dark tab bar.
  if (own) {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      g.beginPath();
      g.roundRect(0, 0, 64, 64, 16);
      g.clip();
      g.drawImage(img, -1, -1, 66, 66); // 1px bleed: no light fringe from the image's own edge
      link.type = "image/png";
      link.href = c.toDataURL("image/png");
    };
    img.onerror = () => {
      link.type = "image/png";
      link.href = own;
    };
    img.src = own;
    return;
  }
  await document.fonts?.load?.("400 40px Caprasimo").catch(() => {});
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = coverColor(title);
  g.beginPath();
  g.roundRect(0, 0, 64, 64, 14);
  g.fill();
  const shine = g.createRadialGradient(56, 8, 0, 56, 8, 44);
  shine.addColorStop(0, "rgba(255,255,255,.28)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = shine;
  g.fill();
  const txt = initials(title);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `400 ${txt.length > 1 ? 30 : 38}px Caprasimo, Georgia, serif`;
  g.fillText(txt, 32, 35);
  link.type = "image/png";
  link.href = c.toDataURL("image/png");
}

let railMode = false;
// The collapsed sidebar is gone (the app's rail of rooms is always on screen): old saved state is ignored.

function toggleRail() {
  railMode = !railMode;
  try {
    localStorage.setItem("vb.rail", railMode ? "1" : "0");
  } catch {}
  $app.querySelector(".book")?.classList.toggle("rail", railMode);
  renderSide();
}

function renderRail(el) {
  el.innerHTML = `
    <button class="iconBtn" id="railToggle" title="${t("Abrir menu")}" aria-label="${t("Abrir menu")}" aria-expanded="false">${SIDEBAR_ICON}</button>
    <a data-nav href="/app" class="iconBtn" title="${t("Seus vibebooks")}" aria-label="${t("Seus vibebooks")}" style="text-decoration:none">${icon("back", 20)}</a>
    <div class="railSep"></div>
    <div class="railList">
      <button class="rb geral ${thread === "main" ? "sel" : ""} ${iconUrl(myBooks?.find((b) => b.id === S.id)) ? "hasIcon" : ""}" style="background:${coverColor(bookTitle())}" data-thread="main" title="${esc(bookTitle())}" aria-label="${esc(bookTitle())}">${roomMark("")}</button>
      ${S.epics
        .filter((e) => !e.archived || e.id === thread)
        .map((e) => {
          const d = e.tasks.filter((t) => t.done).length,
            pct = e.tasks.length ? (100 * d) / e.tasks.length : 0;
          return `
        <button class="rb ${thread === e.id ? "sel" : ""} ${waitsIn(e.id).length ? "waiting" : ""}" data-thread="${e.id}" title="${esc(e.title)} · ${d}/${e.tasks.length}" aria-label="${esc(e.title)}" style="background:${color(e.title)}">
          ${e.owner ? `<span class="rbOwner">${ownerPic(e.owner)}</span>` : esc(initials(e.title))}${e.tasks.length ? `<span class="ring" style="--p:${pct}%"></span>` : ""}</button>`;
        })
        .join("")}
      <button class="rb add" id="railAdd" title="${t("Novo épico")}" aria-label="${t("Novo épico")}">${icon("plus", 18)}</button>
    </div>
    <div class="railPeople">${(S.requests || []).length ? `<button class="rb askBadge" id="railAsks" title="${t("{n} pedindo pra entrar", { n: S.requests.length })}" aria-label="${t("{n} pedindo pra entrar", { n: S.requests.length })}">+${S.requests.length}</button>` : ""}${S.members
      .slice(0, 8)
      .map((m) => avatar(m, S.online.includes(m)))
      .join("")}</div>`;
  el.querySelector("#railToggle").onclick = toggleRail;
  el.querySelector("#railAsks")?.addEventListener("click", toggleRail);
  el.querySelector("#railAdd").onclick = () => {
    toggleRail();
    document.querySelector("#newEpic input")?.focus();
  };
  // The board follows the thread: an epic filters it to that epic, the main room shows every epic.
  el.querySelectorAll("[data-thread]").forEach(
    (b) =>
      (b.onclick = () => {
        thread = b.dataset.thread;
        docRoom = false;
        boardEpic = thread === "main" || isPre() ? null : thread;
        renderSide();
        renderChat();
        renderKanban();
        renderDoc();
      }),
  );
}

// A pre-epic: one of @vibe's suggestions, opened in the main panel like an epic, to create or discard.
const isPre = () => thread.startsWith("pre:");
const preOf = () => (isPre() ? S.suggestions[Number(thread.slice(4))] : null);
let skipFrom = null; // index of a suggestion just discarded: show the next one
function renderPre(el) {
  const s = preOf();
  if (!s) {
    thread = "main";
    return renderChat();
  }
  el.innerHTML = `<div class="preCard">
    <p class="kicker">✦ ${t("O @vibe sugere um épico")}</p>
    <h3>${esc(s.title)}</h3>
    <p class="${s.why ? "" : "muted"}">${esc(s.why || t("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."))}</p>
    ${s.tasks.length ? `<h4>${t("Tarefas propostas")}</h4><ul>${s.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    <div class="row"><button class="primary" id="preAccept">${t("Pedir pro meu agent")}</button><button class="ghost" id="preSkip">${t("Descartar")}</button></div>
    <p class="muted">${t("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")}</p>
  </div>`;
  const i = Number(thread.slice(4));
  // Accepting posts the suggestion as your request in the main thread (the server writes it); your Claude makes the epic.
  el.querySelector("#preAccept").onclick = () => {
    send({ t: "suggestion", i, accept: true });
    thread = "main";
    renderChat();
  };
  el.querySelector("#preSkip").onclick = () => {
    skipFrom = i;
    send({ t: "suggestion", i });
  };
}

// Each person's connected Claudes, under them in "Pessoas": listening to this room now (green), or last seen.
let roomAgents = { id: null, list: [] };
async function loadRoomAgents() {
  if (!S?.id) return;
  const id = S.id, account = S.me, connection = roomConnection;
  const r = await api(`/api/books/${id}/agents`).catch(() => null);
  if (!r || S?.id !== id || S.me !== account || roomConnection !== connection || currentRoomId() !== id) return;
  roomAgents = {
    id,
    list: r.agents,
    claudeOn: r.claude_on,
    sandboxes: r.sandboxes || [],
  };
  renderMyClaude();
  renderSide();
}
const HERDR_LOCAL = "http://127.0.0.1:47321";
let herdrSeen = null; // rooms with an open Claude per the local runner, refreshed at most every 20s
const herdrPing = () => {
  if (herdrSeen && Date.now() - herdrSeen.at < 20e3)
    return Promise.resolve(herdrSeen.rooms);
  return fetch(`${HERDR_LOCAL}/ping`)
    .then((r) => r.json())
    .then((j) => (herdrSeen = { at: Date.now(), rooms: j.rooms }).rooms)
    .catch(() => (herdrSeen = { at: Date.now(), rooms: null }).rooms);
};
// Where "Ligar Claude" opens this room on this machine (asked to the local vibebook herdr; nothing when it isn't running).
const herdrWhere = {};
const whereOf = (id, title) => {
  const c = herdrWhere[id];
  if (c && Date.now() - c.at < 20e3) return Promise.resolve(c.w);
  return fetch(
    `${HERDR_LOCAL}/where?room=${id}&title=${encodeURIComponent(title || "")}`,
  )
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .then((w) => (herdrWhere[id] = { at: Date.now(), w }).w);
};
const WHERE_HOW = {
  used: t("a pasta onde ele já abriu antes"),
  linked: t("ligada a esta sala pelo arquivo .vibebook"),
  slug: t("a pasta com o nome da sala"),
  new: t("pasta nova com o nome da sala, criada ao ligar"),
};
// "✻ Meu Claude": on = a Claude Code of yours opens for this room on your machine (vibebook herdr), off = it closes.
function renderMyClaude() {
  const b = document.getElementById("myClaude");
  if (b && roomAgents.id !== S?.id) {
    const cb = document.getElementById("claudeBar");
    if (cb) cb.hidden = true;
  }
  if (!b || roomAgents.id !== S?.id) return;
  const on = !!roomAgents.claudeOn;
  const live = roomAgents.list.some((a) => a.email === S.me && a.listening);
  b.hidden = false;
  b.setAttribute("aria-pressed", String(on));
  const w = herdrWhere[S.id]?.w;
  const path = w?.folder
    ? w.folder.startsWith(w.home + "/")
      ? "~" + w.folder.slice(w.home.length)
      : w.folder
    : "";
  b.innerHTML = `✻ <span class="lbl">${on ? (live ? t("ouvindo") : t("não ouvindo")) : t("Ligar agent")}</span>${path ? `<span class="where">${esc(path.replace(/^~\/Projects\//, ""))}${w.how === "new" ? ` ${icon("plus", 12)}` : ""}</span>` : ""}`;
  if (!herdrWhere[S.id])
    whereOf(S.id, bookTitle()).then((x) => x && renderMyClaude());
  b.title =
    (path
      ? `${t("Abre em {path} ({how}).", { path, how: WHERE_HOW[w.how] || t("pasta da sala") })}\n\n`
      : "") +
    (on && !live
      ? t(
          "Ligado, mas nenhum agent seu está ouvindo esta sala agora: ele pode estar abrindo, ocupado com outra tarefa (o vibebook herdr pede pra ele ouvir quando ficar livre) ou o vibebook herdr não está rodando. Clique pra desligar.",
        )
      : on
        ? t(
            "Seu agent está ligado nesta sala. Clique pra desligar (fecha a aba dele no herdr; a conversa pode ser retomada).",
          )
        : t(
            "Abre um Claude Code seu para esta sala no herdr, ouvindo as mensagens. Precisa do vibebook herdr rodando na sua máquina.",
          ));
  // The banner counts a Claude of yours that's busy here (read/posted in the last 30 min) as present, not only a listening one.
  renderClaudeBar(
    on,
    live ||
      roomAgents.list.some(
        (a) => a.email === S.me && Date.now() - a.seen_at < 30 * 60e3,
      ),
  );
  b.onclick = () =>
    document.dispatchEvent(new CustomEvent("vb:pane", { detail: "agents" }));
  renderAgentsPane(on, live, path, w);
}
async function toggleClaude() {
  const next = !roomAgents.claudeOn;
  roomAgents.claudeOn = next;
  if (next) claudeAsked[S.id] = Date.now();
  renderMyClaude();
  await api(`/api/books/${S.id}/claude`, { on: next }).catch(() => {
    roomAgents.claudeOn = !next;
    renderMyClaude();
  });
}
// Phones: the orange ✻ in the doc toolbar opens "Agents": your Claude Code on your computer for this room (the same
// switch as the header's ✻ on desktop), every Claude of yours connected here, and (next) cloud sandboxes.
function renderAgentsPane(on, live, path, w) {
  const el = document.getElementById("agentsPane");
  if (!el) return;
  const mine = roomAgents.list.filter((a) => a.email === S.me);
  // The queue: what you asked here (any thread, last 48h) that none of your Claudes closed. On the ✻: a green dot when
  // your Claude is around with nothing queued, orange + count while something waits on it.
  const q = myQueue(),
    around = live || mine.some((a) => Date.now() - a.seen_at < 30 * 60e3);
  document.querySelectorAll(".peekAgents, .ptAgents").forEach((b) => {
    // Stopped at a permission prompt in its terminal: a red, pulsing dot and the prompt in the title.
    const stuck = q.find((x) => x.st === "blocked");
    b.dataset.q = stuck ? "blocked" : q.length ? "busy" : around ? "idle" : "";
    b.querySelector(".qN").textContent = q.length ? String(q.length) : "";
    b.title = stuck
      ? t("Seu agent espera você no terminal")
      : q.length
        ? t("Fila do seu agent: {n}", { n: q.length })
        : around
          ? t("Seu agent está livre")
          : "Agents";
  });
  document.getElementById("docPeek")?.classList.toggle("agLive", live);
  // The rest is the pane itself: drawn only while it's open (renderSide calls this on every change).
  if (!document.querySelector('.doc[data-pane="agents"]')) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = `<h4>${t("Seus agents nesta sala")}</h4>
    <div class="agCard${on ? " on" : ""}"><span class="agIcon">✻</span><div><b>${t("Claude Code no seu computador")}</b>
      <small>${on ? (live ? t("ligado · ouvindo esta sala") : mine.some((a) => Date.now() - a.seen_at < 30 * 60e3) ? t("ligado · trabalhando agora") : t("ligado · ainda não está ouvindo")) : t("desligado")}${path ? ` · ${esc(path.replace(/^~\/Projects\//, ""))}${w?.how === "new" ? ` (${t("pasta nova")})` : ""}` : ""}</small></div>
      <button type="button" class="ghost agGo" id="agGo" hidden title="${t("Ir pro seu agent desta sala no herdr")}" aria-label="${t("Ir pro seu agent no herdr")}">${icon("external", 16)}</button>
      <label class="agSwitch"><input type="checkbox" id="agToggle" ${on ? "checked" : ""} /><i></i></label></div>
    <p class="agNote">${t("Abre (ou fecha) um Claude Code seu para esta sala pelo vibebook herdr, na sua máquina.")}</p>
    <div class="agConn"><b>${t("Conectar seu agente")}</b><small>${t("Cole no Claude Code (ou outro agente), dentro da pasta do projeto: ele instala o plugin e a CLI e entra nesta sala.")}</small><code>${esc(connectPrompt())}</code><button type="button" class="primary" id="agConnCopy">${t("Copiar prompt")}</button></div>
    <h4>${t("Fila do seu agent")} <small>${q.length || ""}</small></h4>
    ${
      q.length
        ? `<div class="queue${qOpen ? " open" : ""}">${q
            .map((x) => {
              const ep = S.epics.find((e) => e.id === x.m.thread);
              const mark = ep ? epicIco(ep) : roomMark("ri");
              const st =
                x.st === "blocked"
                  ? t("espera você no terminal")
                  : x.st === "doing"
                    ? t("fazendo")
                    : t("na fila");
              return `<div class="qRow"><button type="button" class="qGo" data-goto="${x.m.id}" title="${esc(ep ? ep.title : t("sala principal"))} · ${ago(x.m.ts)}">${avatar(S.me)}${mark}<span class="qTx">${esc(x.m.text.replace(/\s+/g, " ").slice(0, 120))}</span><i class="qS ${x.st}" title="${st}"></i></button><button type="button" class="qX" data-dismiss="${x.m.id}" title="${t("Tirar da fila (já resolvido)")}" aria-label="${t("Tirar da fila (já resolvido)")}">${icon("x")}</button></div>`;
            })
            .join(
              "",
            )}${q.length > 4 ? `<button type="button" class="qMore" id="qMore">${qOpen ? t("mostrar menos") : t("mostrar mais {n}", { n: q.length - 4 })}</button>` : ""}</div>`
        : `<p class="agNote">${t("Nada na fila: tudo que você pediu nesta sala nas últimas 48h foi feito ou respondido.")}</p>`
    }
    ${mine.length ? `<h4>${t("Conectados")}</h4><div class="agList">${agentRows(S.me)}</div>` : ""}
    <h4>${t("Na nuvem")}</h4><div id="sbx">${sbxHtml()}</div>`;
  document.getElementById("agToggle").onchange = toggleClaude;
  document.getElementById("agConnCopy").onclick = copyConnect;
  // "↗": the local vibebook herdr focuses this room's workspace and raises the terminal (shown only when it answers).
  const go = document.getElementById("agGo");
  if (on)
    herdrPing().then((rooms) => {
      if (go.isConnected) go.hidden = !rooms?.includes(S.id);
    });
  go.onclick = () =>
    fetch(`${HERDR_LOCAL}/focus?room=${S.id}`)
      .then((r) => r.json())
      .then((r) => r.error && toast(esc(r.error)))
      .catch(() =>
        toast(t("O vibebook herdr não está rodando nesta máquina.")),
      );
  el.querySelectorAll("[data-goto]").forEach(
    (b) =>
      (b.onclick = () => {
        if (ROOM_PHONE.matches) closeSheet();
        goToMsg(Number(b.dataset.goto));
      }),
  );
  el.querySelectorAll("[data-dismiss]").forEach(
    (b) =>
      (b.onclick = () =>
        send({ t: "ack.dismiss", id: Number(b.dataset.dismiss) })),
  );
  document.getElementById("qMore")?.addEventListener("click", () => {
    qOpen = !qOpen;
    renderMyClaude();
  });
  wireSbx();
}
// What a sandbox has cost so far, in USD: hours running × its rate (+ the time since the last check while it runs),
// plus disk for its whole life. From the owner's last list refresh; good enough to see money moving.
const sbxCost = (x) =>
  ((x.run_s || 0) / 3600 +
    (x.state === "running" && x.checked_at
      ? (Date.now() - x.checked_at) / 3600e3
      : 0)) *
    (x.rate || 0) +
  ((Date.now() - x.created_at) / 3600e3) * (x.disk_rate || 0);
const usd = (n) =>
  `US$${n < 10 ? n.toFixed(2) : Math.round(n)}`.replace(
    ".",
    LANG === "en" ? "." : ",",
  );
// "Pessoas e agents": the room's cloud sandboxes come first (they spend money), each with its owner, state and cost.
function sbxRows() {
  if (roomAgents.id !== S?.id || !roomAgents.sandboxes?.length) return "";
  return roomAgents.sandboxes
    .map(
      (
        x,
      ) => `<button type="button" class="member sbxRow ${esc(x.state || "")}" data-sbx-open title="${esc(x.name)} · ${t("de {who}", { who: esc(name(x.email)) })}">
    <span class="sbxIco">☁</span><span class="fnCol"><span class="fn">${esc(x.name)}</span><small>${esc(name(x.email).split(" ")[0])} · ${t(SBX_STATE[x.state] || x.state || "?")}</small></span><span class="money">${usd(sbxCost(x))}</span></button>`,
    )
    .join("");
}
// Your messages in this room (every thread, last 48h, with text) that no Claude of yours acked done/idle: what your
// Claude still has to handle. Same rule as read_room's "unacked" + its live acks (doing, blocked).
let qOpen = false; // the queue shows 4 until "mostrar mais"
let roomDocClick = () => {},
  roomDocPane = () => {};
// The plugin's PermissionRequest hook posts this (claude-plugin/hooks/permission.sh); the pick goes to the hook, not to a Claude's queue.
const isPermAsk = (q) =>
  q.kind === "agent" &&
  /^\u23f8/.test(q.text || "") &&
  /"options":\["Aprovar","Negar"\]/.test(q.choices || "");
function myQueue() {
  const since = Date.now() - 48 * 3600e3,
    byMsg = new Map();
  for (const k of S.acks || [])
    if (k.email === S.me)
      (byMsg.get(k.msg_id) ?? byMsg.set(k.msg_id, []).get(k.msg_id)).push(k);
  const msgs = S.messages ? allMsgs() : [];
  return msgs
    .filter(
      (m) =>
        m.author === S.me &&
        !m.kind &&
        m.text &&
        m.ts > since &&
        !msgs.some((q) => q.id === m.reply_to && isPermAsk(q)),
    ) // the permission hook already took that answer
    .map((m) => {
      const a = byMsg.get(m.id) || [];
      return {
        m,
        st: a.some(
          (k) =>
            k.status === "done" ||
            k.status === "idle" ||
            k.status === "dismissed",
        )
          ? null
          : a.some((k) => k.status === "blocked")
            ? "blocked"
            : a.some((k) => k.status === "doing")
              ? "doing"
              : "queued",
      };
    })
    .filter((x) => x.st);
}
// Cloud agents (src/sandbox.ts): Claudes in freestyle.sh VMs on the person's own account. The list polls every 5s
// while the Agents pane is open and something is still being prepared or changing state.
let sbx = { id: null, connected: null, list: [], busy: "", err: "" },
  sbxTimer = 0;
const SBX_STATE = {
  running: "rodando",
  starting: "ligando",
  pausing: "pausando",
  paused: "pausado",
  stopped: "parado",
  deleted: "apagado no freestyle",
  unknown: "?",
};
async function loadSandboxes() {
  if (!S?.id) return;
  clearTimeout(sbxTimer);
  const id = S.id, account = S.me, connection = roomConnection;
  const r = await fetch(`/api/books/${id}/sandboxes`)
    .then((x) => x.json())
    .catch(() => null);
  if (!r || r.error || S?.id !== id || S.me !== account || roomConnection !== connection || currentRoomId() !== id) return;
  sbx = {
    ...sbx,
    id,
    connected: r.connected,
    claude: r.claude,
    list: r.sandboxes,
  };
  const el = document.getElementById("sbx");
  if (el) {
    el.innerHTML = sbxHtml();
    wireSbx();
  }
  if (
    r.sandboxes.some(
      (x) => !x.ready || (x.state !== "running" && /ing$/.test(x.state)),
    ) &&
    document.querySelector('.doc[data-pane="agents"]')
  )
    sbxTimer = setTimeout(() => {
      if (S?.id === id && S.me === account && roomConnection === connection && currentRoomId() === id)
        void loadSandboxes();
    }, 5000);
}
function sbxHtml() {
  if (sbx.id !== S?.id || sbx.connected === null)
    return `<p class="agNote">${t("carregando…")}</p>`;
  const err = sbx.err ? `<p class="agErr">${esc(sbx.err)}</p>` : "";
  if (!sbx.connected)
    return `<div class="agCard col"><b>${t("Conecte sua conta do freestyle.sh")}</b>
    <small>${t("O sandbox roda na sua conta do freestyle.sh. Crie uma conta lá e, no seu terminal, gere uma API key:")}</small><div class="cpCmd"><code>npx freestyle@latest tokens create vibebook</code><button type="button" class="ghost" data-cp="npx freestyle@latest tokens create vibebook">${t("Copiar")}</button></div><small>${t("Cole a key aqui. Ela fica cifrada no vibebook e nunca vai pra sala nem pros agents.")}</small>
    <form id="fsForm" class="fsForm"><input type="password" name="key" autocomplete="off" placeholder="${t("API key do freestyle")}" required /><button class="primary" ${sbx.busy ? "disabled" : ""}>${sbx.busy === "key" ? t("Conferindo…") : t("Conectar")}</button></form>${err}</div>`;
  const claude = sbx.claude
    ? `<div class="fsOn">${icon("check", 13)} ${t("Claude conectado: sandboxes novos já sobem logados")} · <button type="button" class="ghost" id="ctOff">${t("remover")}</button></div>`
    : `<div class="agCard col"><b>${t("Conecte sua conta do Claude")}</b><small>${t("No seu terminal, rode:")}</small><div class="cpCmd"><code>claude setup-token</code><button type="button" class="ghost" data-cp="claude setup-token">${t("Copiar")}</button></div><small>${t("Cole o token (sk-ant-…) aqui: o Claude do sandbox já sobe logado na sua assinatura. Fica cifrado, igual à key do freestyle. Sem isso, faça /login no terminal do sandbox.")}</small>
      <form id="ctForm" class="fsForm"><input type="password" name="token" autocomplete="off" placeholder="sk-ant-…" required /><button class="primary" ${sbx.busy ? "disabled" : ""}>${sbx.busy === "ct" ? t("Salvando…") : t("Salvar")}</button></form>${sbx.errAt === "ct" && sbx.err ? `<p class="agErr">${esc(sbx.err)}</p>` : ""}</div>`;
  return `${claude}${sbx.list
    .map(
      (
        x,
      ) => `<div class="sbxCard ${x.state}"><div class="sbxTop"><span class="agIcon">☁</span><div><b>${esc(x.name)}</b>
      <small>${!x.ready && x.state === "running" ? t("preparando (uns 3 min)…") : t(SBX_STATE[x.state] || x.state)}${x.rate ? ` · ${usd(x.rate)}/h` : ""}${x.error ? ` · ${esc(x.error)}` : ""}</small>${sbx.logs?.[x.id] ? `<pre class="sbxLog">${esc(sbx.logs[x.id])}</pre>` : !x.ready && x.log ? `<code class="sbxLog">${esc(x.log)}</code>` : ""}</div><span class="money" title="${t("gasto até agora na sua conta do freestyle")}">${usd(x.cost || 0)}</span></div>
      <div class="sbxActs">${x.state === "deleted" ? "" : `<button class="primary" data-sbx-term="${esc(x.id)}">${t("Terminal")}</button>`}
      ${x.state === "running" ? `<button class="ghost" data-sbx-act="pause" data-id="${esc(x.id)}">${t("Pausar")}</button>` : x.state === "paused" || x.state === "stopped" ? `<button class="ghost" data-sbx-act="start" data-id="${esc(x.id)}">${t("Retomar")}</button>` : ""}
      ${!x.ready && x.state === "running" ? `<button class="ghost" data-sbx-setup="${esc(x.id)}" title="${t("Rodar o setup de novo")}" ${sbx.busy ? "disabled" : ""}>${sbx.busy === "setup:" + x.id ? t("Rodando setup… (até 4 min)") : t("Refazer setup")}</button>` : ""}
      <button class="ghost del" data-sbx-del="${esc(x.id)}" aria-label="${t("Apagar sandbox")}" title="${t("Apagar sandbox")}">${icon("trash", 16)}</button></div></div>`,
    )
    .join("")}
    <button class="agNew on" id="sbxNew" ${sbx.busy ? "disabled" : ""}>${icon("plus", 16)} ${sbx.busy === "new" ? t("Criando…") : t("Criar sandbox")}<small>${t("Um agent na nuvem pra esta sala, configurado por agents/&lt;nome&gt;.md nos arquivos. Rodando custa uns US$0,13/hora na sua conta; pausado, só o disco.")}</small></button>${sbx.errAt === "ct" ? "" : err}
    <div class="fsOn">${icon("check", 13)} ${t("freestyle.sh conectado")} · <button type="button" class="ghost" id="fsOff">${t("desconectar")}</button></div>`;
}
function wireSbx() {
  const redraw = () => {
    const el = document.getElementById("sbx");
    if (el) {
      el.innerHTML = sbxHtml();
      wireSbx();
    }
  };
  const run = async (busy, fn) => {
    sbx.busy = busy;
    sbx.errAt = busy;
    sbx.err = "";
    redraw();
    try {
      const r = await fn();
      if (r?.error) sbx.err = r.error;
    } catch {
      sbx.err = t("sem conexão");
    }
    sbx.busy = "";
    await loadSandboxes();
    redraw();
  };
  const call = (method, url, body) =>
    fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }).then((x) => x.json());
  document.getElementById("fsForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const k = e.target.key.value;
    run("key", () => call("POST", "/api/freestyle", { key: k }));
  });
  document.querySelectorAll("[data-cp]").forEach(
    (b) =>
      (b.onclick = () => {
        navigator.clipboard?.writeText(b.dataset.cp);
        const h = b.innerHTML;
        b.textContent = "✓";
        setTimeout(() => (b.innerHTML = h), 1200);
      }),
  );
  document.getElementById("ctForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const k = e.target.token.value;
    run("ct", () => call("POST", "/api/claude-token", { token: k }));
  });
  document
    .getElementById("ctOff")
    ?.addEventListener(
      "click",
      () =>
        confirm(
          t(
            "Remover o token do Claude? Sandboxes que já têm o token continuam logados até você apagá-los.",
          ),
        ) && run("ct", () => call("DELETE", "/api/claude-token")),
    );
  document
    .getElementById("fsOff")
    ?.addEventListener(
      "click",
      () =>
        confirm(
          t(
            "Desconectar sua conta do freestyle.sh? Os sandboxes continuam lá, mas o vibebook não consegue mais ligar, pausar nem abrir o terminal deles.",
          ),
        ) && run("off", () => call("DELETE", "/api/freestyle")),
    );
  document
    .getElementById("sbxNew")
    ?.addEventListener("click", () =>
      run("new", () => call("POST", `/api/books/${S.id}/sandboxes`, {})),
    );
  document.querySelectorAll("[data-sbx-setup]").forEach(
    (b) =>
      (b.onclick = () =>
        run(`setup:${b.dataset.sbxSetup}`, async () => {
          const r = await call(
            "POST",
            `/api/sandboxes/${b.dataset.sbxSetup}/setup`,
          );
          sbx.logs = {
            ...sbx.logs,
            [b.dataset.sbxSetup]: r.log || r.error || "",
          };
          return r;
        })),
  );
  document
    .querySelectorAll("[data-sbx-act]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          run("act", () =>
            call("POST", `/api/sandboxes/${b.dataset.id}/${b.dataset.sbxAct}`),
          )),
    );
  document
    .querySelectorAll("[data-sbx-del]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          confirm(
            t(
              "Apagar este sandbox? A VM e tudo que está nela somem do freestyle.sh.",
            ),
          ) &&
          run("del", () =>
            call("DELETE", `/api/sandboxes/${b.dataset.sbxDel}`),
          )),
    );
  document
    .querySelectorAll("[data-sbx-term]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          openTerminal(
            b.dataset.sbxTerm,
            sbx.list.find((x) => x.id === b.dataset.sbxTerm)?.name,
          )),
    );
}
// The sandbox's terminal: xterm.js (loaded on first use) over freestyle's PTY websocket, with a 15-minute token that
// reaches only this VM. Binary frames are terminal bytes both ways; JSON text frames carry resize and session info.
const XTERM = "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0",
  XFIT =
    "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js";
// Keys a phone keyboard lacks, as a row under the terminal.
const TERM_KEYS = {
  Esc: "\x1b",
  Tab: "\t",
  "Ctrl-C": "\x03",
  "↑": "\x1b[A",
  "↓": "\x1b[B",
  "←": "\x1b[D",
  "→": "\x1b[C",
  "/": "/",
};
const loadScript = (src) =>
  new Promise((res, rej) => {
    const el = Object.assign(document.createElement("script"), {
      src,
      onload: res,
      onerror: rej,
    });
    document.head.append(el);
  });
async function openTerminal(sid, name) {
  if (!window.Terminal) {
    document.head.append(
      Object.assign(document.createElement("link"), {
        rel: "stylesheet",
        href: `${XTERM}/css/xterm.css`,
      }),
    );
    await loadScript(`${XTERM}/lib/xterm.js`);
    await loadScript(XFIT);
  }
  const dlg = document.createElement("dialog");
  dlg.className = "termDlg";
  dlg.innerHTML = `<header><b>☁ ${esc(name || "sandbox")}</b><span id="termSt">${t("conectando…")}</span><button class="ghost" data-close aria-label="${t("Fechar")}">${icon("x")}</button></header><div class="termBox" id="termBox"></div>
    <div class="termKeys">${Object.keys(TERM_KEYS)
      .map((l) => `<button type="button" data-k="${esc(l)}">${esc(l)}</button>`)
      .join("")}</div>`;
  document.body.append(dlg);
  dlg.showModal();
  const term = new window.Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: "ui-monospace, Menlo, monospace",
    theme: { background: "#0b0f17" },
  });
  const fit = new window.FitAddon.FitAddon();
  term.loadAddon(fit);
  term.open(dlg.querySelector("#termBox"));
  fit.fit();
  const st = dlg.querySelector("#termSt");
  let ws = null,
    closed = false;
  const close = () => {
    closed = true;
    ws?.close();
    term.dispose();
    dlg.remove();
  };
  dlg.querySelector("[data-close]").onclick = close;
  dlg.oncancel = (e) => {
    e.preventDefault();
    close();
  };
  const r = await fetch(`/api/sandboxes/${sid}/terminal`, { method: "POST" })
    .then((x) => x.json())
    .catch(() => ({ error: t("sem conexão") }));
  if (r.error) {
    st.textContent = r.error;
    return;
  }
  const b64u = btoa(String.fromCharCode(...new TextEncoder().encode(r.token)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  ws = new WebSocket(`${r.url}&cols=${term.cols}&rows=${term.rows}`, [
    "freestyle-pty",
    `freestyle-identity.${b64u}`,
  ]);
  ws.binaryType = "arraybuffer";
  const enc = new TextEncoder();
  ws.onmessage = (e) => {
    if (typeof e.data !== "string") return term.write(new Uint8Array(e.data));
    try {
      const m = JSON.parse(e.data);
      if (m.type === "sessionInfo") st.textContent = t("conectado");
      else if (m.type === "exited") st.textContent = t("terminou");
      else if (m.type === "error") st.textContent = m.message;
    } catch {}
  };
  ws.onclose = () => {
    if (!closed) st.textContent = t("desconectado: feche e abra de novo");
  };
  term.onData((d) => ws.readyState === 1 && ws.send(enc.encode(d)));
  const resize = () => {
    fit.fit();
    ws.readyState === 1 &&
      ws.send(
        JSON.stringify({ type: "resize", cols: term.cols, rows: term.rows }),
      );
  };
  new ResizeObserver(resize).observe(dlg.querySelector("#termBox"));
  dlg.querySelectorAll("[data-k]").forEach(
    (b) =>
      (b.onclick = () => {
        if (ws.readyState === 1) ws.send(enc.encode(TERM_KEYS[b.dataset.k]));
        term.focus();
      }),
  );
  term.focus();
}
// Pinned over the messages: your Claude isn't in this room → one click to turn it on; then "opening…" until it listens
// (polling every 5s), a short ✓, and gone. × hides the offer for this room (localStorage).
const claudeAsked = {};
let claudeBarPoll = 0;
const claudeWaiting = {};
// The one sentence that brings any Claude into this room (installs the plugin + CLI via llms.txt, then links and
// listens). Offered wherever your Claude isn't here: people whose Claude lives elsewhere never saw the setup card.
const connectPrompt = () =>
  `Read ${location.origin}/llms.txt and set up vibebook for this project. Room: ${location.origin}/b/${S.id}`;
function copyConnect() {
  const txt = connectPrompt();
  (navigator.clipboard?.writeText(txt) ?? Promise.reject()).then(
    () => toast(t("Copiado. Cole no Claude Code, dentro da pasta do projeto.")),
    () => window.prompt(t("Copie e cole no seu Claude Code:"), txt),
  );
}
function renderClaudeBar(on, live) {
  const el = document.getElementById("claudeBar");
  if (!el) return;
  clearTimeout(claudeBarPoll);
  const nudge = document.getElementById("agentNudge");
  const key = "vb.claudeBar.off"; // closed once = not offered again (this browser)
  let off = false;
  try {
    off = localStorage.getItem(key) === "off";
  } catch {}
  const x = `<button class="ghost" data-x aria-label="${t("Fechar")}" title="${t("Fechar")}">×</button>`;
  const set = (cls, html) => {
    el.className = `claudeBar ${cls}`;
    el.innerHTML = html;
    el.hidden = false;
    const b = el.querySelector("[data-x]");
    if (b)
      b.onclick = () => {
        try {
          localStorage.setItem(key, "off");
        } catch {}
        el.hidden = true;
        clearTimeout(claudeBarPoll);
      };
  };
  // A new room of yours (no epic yet, main thread): a start list that ticks as things happen.
  let startOff = false;
  try {
    startOff = localStorage.getItem(`vb.start.${S.id}`) === "off";
  } catch {}
  if (
    S.book?.owner === S.me &&
    !S.epics.length &&
    thread === "main" &&
    !startOff
  )
    return renderStart(el, on, live, `vb.start.${S.id}`);
  if (
    noClaude ||
    (nudge && !nudge.hidden) ||
    (live && !claudeWaiting[S.id]) ||
    (off && !claudeAsked[S.id])
  ) {
    el.hidden = true;
    return;
  }
  if (live) {
    claudeWaiting[S.id] = false;
    set(
      "ok",
      `<span class="star">✻</span><span><b>${t("Seu agent está ouvindo esta sala.")}</b></span>`,
    );
    setTimeout(() => (el.hidden = true), 5000);
    return;
  }
  if (on) {
    claudeWaiting[S.id] = true;
    const late = Date.now() - (claudeAsked[S.id] || 0) > 3 * 60e3;
    set(
      "wait",
      `<span class="star">✻</span><span><b>${late ? t("Seu agent ainda não está ouvindo.") : t("Abrindo seu agent no seu computador…")}</b><small>${late ? t("Confira se o vibebook herdr está rodando no seu computador, ou se o agent parou numa pergunta lá.") : t("O vibebook herdr abre o Claude Code na pasta da sala; leva uns segundos.")}</small></span>${x}`,
    );
    // Its first listen pokes this room (src/person.ts markListening): no polling. One local redraw at 3 min for "late".
    if (!late)
      claudeBarPoll = setTimeout(
        renderMyClaude,
        3 * 60e3 - (Date.now() - (claudeAsked[S.id] || 0)) + 500,
      );
    return;
  }
  claudeWaiting[S.id] = false;
  set(
    "",
    `<span class="star">✻</span><span><b>${t("Seu agent não está nesta sala.")}</b><small>${t("Cole o prompt no seu Claude Code: ele instala o plugin e a CLI e entra aqui.")}</small></span><button class="primary" data-conn>${t("Conectar seu agente")}</button><button class="ghost" data-on>${t("Ligar agent")}</button>${x}`,
  );
  el.querySelector("[data-on]").onclick = () =>
    document.getElementById("myClaude")?.click();
  el.querySelector("[data-conn]").onclick = copyConnect;
}
function renderStart(el, on, here, key) {
  const others = (S.members || []).filter((m) => m !== S.me);
  const row = (state, html) =>
    `<li class="${state}"><i>${state === "ok" ? "✓" : state === "wait" ? "✻" : "○"}</i><span>${html}</span></li>`;
  const claude = noClaude
    ? row("todo", t("Conecte seu agent (o card acima diz como)"))
    : here
      ? row("ok", t("Seu agent está aqui"))
      : on
        ? row("wait", t("Abrindo seu agent no seu computador…"))
        : row(
            "todo",
            `${t("Seu agent está desligado nesta sala")} <button class="linkish" data-on>${t("Ligar")}</button>`,
          );
  el.className = "claudeBar start";
  el.hidden = false;
  el.innerHTML = `<span class="star">✻</span><span><b>${t("Começando a sala")}</b><ul>
    ${row("ok", t("Sala criada"))}
    ${others.length ? row("ok", t("Na sala: {who}", { who: esc(others.map(name).join(", ")) })) : row("todo", t("Só você aqui: convide em Pessoas"))}
    ${claude}
    ${row(here ? "wait" : "todo", t("O agent escreve o doc e cria os épicos"))}
  </ul></span><button class="ghost" data-x aria-label="${t("Fechar")}" title="${t("Fechar")}">×</button>`;
  el.querySelector("[data-on]")?.addEventListener("click", () =>
    document.getElementById("myClaude")?.click(),
  );
  el.querySelector("[data-x]").onclick = () => {
    try {
      localStorage.setItem(key, "off");
    } catch {}
    el.hidden = true;
    clearTimeout(claudeBarPoll);
  };
}
const kTok = (n) =>
  n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : `${Math.round(n / 1000)}k`;
/** The context bar under a Claude: green, yellow from 60%, red from 80% (the runner compacts a free Claude at 75%). */
const ctxPct = (c) => Math.min(100, Math.round((c.tokens / c.window) * 100));
/** Hover text of a Claude's row: context, then the plan's limits. */
const ctxTip = (c) => {
  const p = ctxPct(c);
  const bar = (v, warn = 60, hot = 80) =>
    `<i class="ctx ${v >= hot ? "hot" : v >= warn ? "mid" : ""}" style="--p:${v}%"></i>`;
  const item = (label, v, right) =>
    `<div><div class="l"><b>${label}</b><span>${right}</span></div>${bar(v)}</div>`;
  const lims = ["five_hour", "seven_day"].map((k) => {
    const l = c.limits?.[k];
    if (!l || l.r * 1000 < Date.now()) return "";
    const d = new Date(l.r * 1000),
      hm = d.toLocaleTimeString(LOCALE, { hour: "2-digit", minute: "2-digit" });
    const at =
      k === "five_hour"
        ? hm
        : `${d.toLocaleDateString(LOCALE, { weekday: "short" }).replace(".", "")} ${hm}`;
    return item(
      k === "five_hour" ? t("Sessão de 5h") : t("Semana"),
      l.p,
      t("{p}% · reseta {at}", { p: l.p, at }),
    );
  });
  return `<div class="ctip">${item(t("Contexto"), p, `${p}% · ${kTok(c.tokens)}/${kTok(c.window)}`)}${lims.join("")}</div>`;
};
const ctxBar = (c) => {
  if (!c) return "";
  const p = ctxPct(c);
  return `<i class="ctx ${p >= 80 ? "hot" : p >= 60 ? "mid" : ""}" style="--p:${p}%"></i>`;
};
const agentRows = (email) => {
  if (roomAgents.id !== S?.id) return "";
  const seen = new Set();
  // The same Claude after a /mcp reconnect is a new session: one row per model + repo, listening first.
  return roomAgents.list
    .filter((a) => a.email === email)
    .sort((x, y) => y.listening - x.listening)
    .filter(
      (a) =>
        !seen.has(prettyModel(a.who) + a.repo) &&
        seen.add(prettyModel(a.who) + a.repo),
    )
    .slice(0, 3)
    .map(
      (a) =>
        `<div class="member agentRow" title="${t("{via} de {who}", { via: esc(prettyModel(a.who)), who: esc(name(email)) })}${a.repo ? ` ${t("em {repo}", { repo: esc(a.repo) })}` : ""} · ${a.listening ? (a.all_rooms ? t("ouvindo todas as salas agora") : t("ouvindo esta sala agora")) : t("visto há {ago}", { ago: ago(a.seen_at) })}"><span class="aglyph ${agentKind(a.who)[0]} ${a.listening ? "on" : ""}">${agentKind(a.who)[1]}</span><span class="fn">${esc(prettyModel(a.who).replace(/^Claude\s+/i, ""))}${a.repo ? ` · ${esc(a.repo)}` : ""}</span><small>${a.listening ? t("ouvindo") : ago(a.seen_at)}${a.context ? ` · ${ctxPct(a.context)}%` : ""}</small>${ctxBar(a.context)}${a.context ? ctxTip(a.context) : ""}</div>`,
    )
    .join("");
};
// A Claude is working on this epic: a live "doing" ack on the request it came from or on any message in its thread
// (a new ask written inside the epic), or an agent wrote in its thread in the last 3 minutes. Shown as a turning ✻
// and a soft moving border. The newest ack decides: "fez isso" (or a delivery) ends it. A reopened epic is
// archived = -1, still open.
const epicWorker = (e) => {
  if (!e || e.archived > 0) return null;
  // A message in this thread that became another epic (a branch) is that epic's work, not this one's.
  const branched = new Set(
    (S.epics || []).filter((x) => x.id !== e.id).map((x) => x.from_msg),
  );
  const ids = new Set(
    allMsgs()
      .filter((m) => m.thread === e.id && !branched.has(m.id))
      .map((m) => m.id),
  );
  ids.add(e.from_msg);
  const acks = (S.acks || [])
    .filter((a) => ids.has(a.msg_id) && a.status !== "dismissed")
    .sort((x, y) => y.ts - x.ts);
  const k = acks.find(
    (a) => a.status === "doing" && Date.now() - a.ts < 20 * 60e3,
  );
  if (k) return { who: k.who, email: k.email };
  if (acks[0]?.status === "done") return null;
  const m = S.messages.findLast((x) => x.thread === e.id && x.kind === "agent");
  return m && m.tag !== "done" && Date.now() - m.ts < 3 * 60e3
    ? { who: m.via || "Agent", email: m.author }
    : null;
};
// The main thread's version: a live "doing" ack on one of its messages that didn't become an epic (one that did shows
// the ✻ on its thread card), unless a newer ack on that message says it's done.
const mainWorker = () => {
  const main = new Set(
    allMsgs()
      .filter((m) => m.thread === "main")
      .map((m) => m.id),
  );
  const epicFrom = new Set((S.epics || []).map((e) => e.from_msg));
  const acks = (S.acks || [])
    .filter(
      (a) =>
        main.has(a.msg_id) &&
        !epicFrom.has(a.msg_id) &&
        a.status !== "dismissed",
    )
    .sort((x, y) => y.ts - x.ts);
  const k = acks.find(
    (a) =>
      a.status === "doing" &&
      Date.now() - a.ts < 20 * 60e3 &&
      acks.find((b) => b.msg_id === a.msg_id && b.who === a.who) === a,
  );
  return k ? { who: k.who, email: k.email } : null;
};
const epicBusy = (e) => { const w = epicWorker(e); return w ? t("{via} de {who}", { via: w.who, who: name(w.email) }) : null; };
// The same, inside the open epic's thread: a card at the end (in place of the empty-thread hint) saying who is on it.
// "Esperando você" inside the room: which threads (and messages) someone is waiting on you in, so the rail's yellow
// count leads somewhere. From /api/me waits (refreshed every 30s).
const waitsIn = (t) =>
  myWaits.filter(
    (w) => w.book_id === S?.id && (t === undefined || w.thread === t),
  );
const waitPill = (th) => {
  const ws = waitsIn(th),
    n = ws.length;
  return n
    ? `<b class="wN${clW(ws)}" title="${n === 1 ? t("Alguém está esperando você aqui") : t("{n} coisas esperando você aqui", { n })}">${n}</b>`
    : "";
};
// Deploy stage after "Claude fez" (set by agents with update_epic prod): 🚀 no ar, ✓✓ verificado em prod.
const prodMark = (e) =>
  !e.prod
    ? ""
    : e.prod.stage === "verified"
      ? `<span class="prodMark ok" title="${esc(t("Verificado em prod") + (e.prod.note ? `: ${e.prod.note}` : ""))}">✓✓</span>`
      : `<span class="prodMark" title="${t("No ar, falta verificar em prod")}">🚀</span>`;
// An epic's icon: its owner's face when it has one (a person of the room), else the title's colored initials.
const ownerPic = (email) => {
  const v = S?.avatars?.[email] ?? avatarV[email];
  return v
    ? `<img src="/api/avatar/${encodeURIComponent(email)}?v=${v}" alt="" loading="lazy" />`
    : esc(name(email).slice(0, 2).toUpperCase());
};
const epicIco = (e, pick) =>
  e.owner
    ? `<span class="ri epOwner" style="background:${color(e.owner)}" ${pick ? `data-epowner="${e.id}" role="button" tabindex="0" ` : ""}title="${esc(t("Dono: {who}", { who: name(e.owner) }))}${pick ? ` · ${t("clique pra trocar")}` : ""}">${ownerPic(e.owner)}</span>`
    : `<span class="ri" style="background:${color(e.title)};color:#fff" ${pick ? `data-epowner="${e.id}" role="button" tabindex="0" title="${t("Sem dono · clique pra escolher")}"` : ""}>${esc(initials(e.title))}</span>`;
// Click an epic's icon: pick its owner among the room's people (or none). WS epic.owner.
function ownerMenu(anchor, id) {
  document.getElementById("ownMenu")?.remove();
  const ep = S.epics.find((e) => e.id === id);
  if (!ep) return;
  const m = document.createElement("div");
  m.id = "ownMenu";
  m.className = "ownMenu";
  m.setAttribute("role", "menu");
  m.innerHTML = `<p>${t("Dono do épico")}</p>${S.members.map((x) => `<button type="button" role="menuitemradio" aria-checked="${ep.owner === x}" data-own="${esc(x)}">${avatar(x)}<span>${esc(name(x))}</span>${ep.owner === x ? icon("check", 14) : ""}</button>`).join("")}<button type="button" role="menuitemradio" aria-checked="${!ep.owner}" data-own=""><span class="avatar none">–</span><span>${t("Sem dono")}</span>${ep.owner ? "" : icon("check", 14)}</button>`;
  document.body.append(m);
  const r = anchor.getBoundingClientRect();
  m.style.left = `${Math.max(8, Math.min(r.left, innerWidth - m.offsetWidth - 8))}px`;
  m.style.top = `${r.bottom + 6 + m.offsetHeight > innerHeight ? Math.max(8, r.top - m.offsetHeight - 6) : r.bottom + 6}px`;
  const close = () => {
    m.remove();
    removeEventListener("pointerdown", out, true);
    removeEventListener("keydown", esc_);
  };
  const out = (e) => {
    if (!m.contains(e.target)) close();
  };
  const esc_ = (e) => {
    if (e.key === "Escape") close();
  };
  setTimeout(() => {
    addEventListener("pointerdown", out, true);
    addEventListener("keydown", esc_);
  });
  m.querySelectorAll("[data-own]").forEach(
    (b) =>
      (b.onclick = () => {
        send({ t: "epic.owner", id, owner: b.dataset.own });
        close();
      }),
  );
  m.querySelector("button")?.focus();
}
// Your Claude's open question (a<msg> wait) in another thread of this room: one line on top of whatever thread you're
// in, so an approval never hides in a conversation you're not looking at. "Ver" jumps to it.
function renderAskBar() {
  const el = document.getElementById("askBar");
  if (!el) return;
  const w = waitsIn().find((x) => /^a\d/.test(x.ref) && x.thread !== thread);
  el.hidden = !w;
  if (!w) return;
  const what = (w.text || "")
    .replace(/^(⏸|❓)\s*Seu Claude\s*/, "")
    .replace(/[*`]/g, "")
    .slice(0, 160);
  el.innerHTML = `<span>⏸ <b>${t("Seu agent espera você")}</b> ${t("em {where}", { where: esc(w.topic || t("sala principal")) })}: ${esc(what)}</span><button type="button" class="primary" data-askgo="${w.ref.slice(1)}">${t("Ver")}</button>`;
  el.querySelector("[data-askgo]").onclick = (e) =>
    goToMsg(Number(e.currentTarget.dataset.askgo));
}
function renderSide() {
  syncInbox();
  renderAskBar();
  const el = document.getElementById("side");
  if (!el || !S) return;
  renderMyClaude(); // the banner over the chat follows epics, members and the open thread too
  sideNavigation = syncNavigationSession(sideNavigation, S, thread, archOpen);
  sidePins = syncPinsSession(sidePins, S);
  if (liveState) requestPinnedFiles(sidePins, S, send);
  if (railMode && window.innerWidth > 900) {
    disposeView("sidebar");
    return renderRail(el);
  }
  const roomId = S.id;
  const pinsSession = sidePins;
  /** @type {import("../roomConnection").RequestRoomCommand} */
  const requestPinCommand = (command, timeoutMs) => {
    if (!pinsSession.active || sidePins !== pinsSession || S?.id !== roomId)
      return Promise.resolve({ ok: false, error: "offline" });
    return (
      roomConnection?.request(command, timeoutMs) ??
      Promise.resolve({ ok: false, error: "offline" })
    );
  };
  const openSideThread = (id) => {
    if (S?.id !== roomId) return;
    closeSheet(true);
    thread = id;
    docRoom = false;
    boardEpic = thread === "main" || isPre() ? null : thread;
    renderSide();
    renderChat();
    renderKanban();
    renderDoc();
  };
  renderView("sidebar", el, {room:S, thread, navigation:sideNavigation, pins:pinsSession, request:requestPinCommand, onopenpinfile:(file) => { if (pinsSession.active && sidePins === pinsSession && S?.id === roomId) openViewer(`/api/books/${roomId}/files/${encodeURIComponent(file.id)}`, file.type.startsWith("image/") ? "img" : "frame", file.name); }, onopenpinapp:(app) => { if (pinsSession.active && sidePins === pinsSession && S?.id === roomId) cardGo(`#app:${app.connectionId}/${app.tool}`); }, send:(command) => S?.id === roomId ? send(command) : false, onopen:openSideThread, onarchchange:(value) => { if (S?.id === roomId) archOpen = value; }, foldOpen, friends, appNavigation:{controller:nativeAppNav,lang:LANG}, vb:{t,icon,avatar,ago,name,avatarUrl:(email)=>{const v=S?.avatars?.[email]??avatarV[email];return v?`/api/avatar/${encodeURIComponent(email)}?v=${v}`:undefined;},bookTitle,roomMark,sbxRows,agentRows,epicBusy,waitPill,waitsIn}});
  el.querySelector("#railToggle").onclick = toggleRail;
  const grab = el.querySelector(".sheetGrab");
  if (grab && !sidebarDragHandles.has(grab)) {
    sheetDrag(grab, "side", false);
    sidebarDragHandles.add(grab);
  }
  // The root row's "editar" chip renames the room; it sits inside the row's button, so it stops the row's click.
  const rename = el.querySelector("#sideRename");
  if (rename)
    rename.onclick = (e) => {
      e.stopPropagation();
      renameThread();
    };
  // Same actions as the header's ✓ 🗑 (hidden on phones): close the sheet, then run them.
  const archive = el.querySelector("#sideArch"); if (archive) archive.onclick = () => { closeSheet(); document.getElementById("epicArch")?.click(); };
  const remove = el.querySelector("#sideDel"); if (remove) remove.onclick = () => { closeSheet(); document.getElementById("epicDel")?.click(); };
  el.querySelectorAll("[data-thread]").forEach((b) => b.onclick = () => {
    closeSheet(true);
    thread = b.dataset.thread; docRoom = false; boardEpic = thread === "main" || isPre() ? null : thread; renderSide(); renderChat(); renderKanban(); renderDoc();
  });
  document.title = `${S.book?.title ?? "vibebook"} · vibebook`;
  setFavicon(bookTitle());
}

// Profile picture: pick, crop to a centered square, resize to 256px JPEG in the browser, upload.
function pickPic(onSaved = () => {}, current = () => true) {
  const input = document.getElementById("picFile");
  if (!input) return;
  input.onchange = async () => {
    const f = input.files?.[0];
    if (!f) return;
    try {
      const img = await createImageBitmap(f);
      const s = Math.min(img.width, img.height),
        c = document.createElement("canvas");
      c.width = c.height = 256;
      c.getContext("2d").drawImage(
        img,
        (img.width - s) / 2,
        (img.height - s) / 2,
        s,
        s,
        0,
        0,
        256,
        256,
      );
      img.close();
      const blob = await new Promise((r) => c.toBlob(r, "image/jpeg", 0.86));
      if (!current() || !input.isConnected) return;
      const r = await fetch("/api/me/avatar", {
        method: "POST",
        headers: { "content-type": "image/jpeg" },
        body: blob,
      });
      if (!r.ok)
        throw new Error(
          (await r.json().catch(() => ({}))).error ||
            t("Não deu para salvar a foto."),
        );
      if (current()) onSaved();
    } catch (err) {
      if (current()) alert(err.message || t("Não deu para ler essa imagem."));
    }
  };
  input.click();
}

function toast(html, ms = 7000) {
  document.querySelector(".toast")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="toast" role="status">${html}</div>`,
  );
  const t = document.querySelector(".toast");
  setTimeout(() => t.remove(), ms);
}

// Kanban over every epic's tasks. Drag between lanes, or focus a card and use ←/→. Click opens the epic's chat.
const LANES = [
  ["todo", t("A fazer")],
  ["doing", t("Fazendo")],
  ["review", t("Esperando OK")],
  ["done", t("Feito")],
];
// The task card's order (display only; the doc keeps its own): waiting on you first, then the rest as written, done last.
const shownOrder = (tasks) => {
  const waits = (tk) =>
    myWaits.some((w) => w.book_id === S.id && w.ref === `t${tk.id}`);
  const rank = (tk) => (tk.done ? 2 : waits(tk) ? 0 : 1);
  return tasks
    .map((tk, i) => ({ tk, i }))
    .sort((a, b) => rank(a.tk) - rank(b.tk) || a.i - b.i)
    .map((x) => x.tk);
};
// "Arquivados" is a view that replaces the epic list; it stays the way you left it across redraws.
let archOpen = false;
// People's folds ("N offline", friends) keep their state across redraws; friends start open in a room with only you.
const foldOpen = { off: false, friends: null };
// Phones: the last rooms you opened (besides this one) as tiles, then "all", always at the top of the thread sheet.
let boardEpic = null;
// The phone's full-screen board closes when you open an epic from it; the desktop's lives in the doc panel and stays.
const leaveBoard = () => {
  if ($app.querySelector(".book.boardview"))
    document.getElementById("toggleBoard").click();
};
function renderKanban() {
  const book = $app.querySelector(".book");
  const el = book && getBoardContainer(book);
  if (!el || (!book.classList.contains("boardview") && book.querySelector(":scope > .doc")?.dataset.pane !== "board")) return;
  renderView("board", el, { room:S, thread, vb:panelBridge(), send, request, onopen:selectThread });
}

function renameThread() {
  if (thread === "main" && S) {
    ensureNativeHome();
    nativeAppNav.askRename(S.id);
    return;
  }
  const epic = S.epics.find((e) => e.id === thread);
  const cur = epic ? epic.title : bookTitle();
  const nt = prompt(epic ? t("Nome do épico:") : t("Nome do vibebook:"), cur);
  if (!nt?.trim() || nt === cur) return;
  send(
    epic
      ? { t: "epic.rename", id: epic.id, title: nt }
      : { t: "title", title: nt },
  );
}
// Phones: the slim bar above the composer that pulls the doc sheet up: "Doc · <title> · d/n tarefas".
function renderPeek() {
  const el = document.getElementById("peekTxt");
  if (!el || !S) return;
  const ep = docEpic(),
    epic = ep && S.epics.find((e) => e.id === ep);
  const text = (ep ? S.docs?.[ep] : S.doc) || "";
  const title =
    text
      .match(/^#\s+(.+)$/m)?.[1]
      .replace(/[*_`]/g, "")
      .trim() || (epic ? epic.title : bookTitle());
  const n = epic?.tasks.length || 0,
    d = n && epic.tasks.filter((x) => x.done).length;
  el.innerHTML = `${icon("doc", 15)}<b>Doc</b>${n ? `<small>${d}/${n}</small>` : ""}`;
  el.title = title;
  const nf = S.filesN ?? S.files?.length ?? 0,
    bad = (S.reminders || []).filter((r) => r.error).length;
  document.getElementById("peekFiles").textContent = nf ? String(nf) : "";
  document.getElementById("peekRem").textContent = bad ? "⚠" : "";
}
// Phones (≤900px): the sidebar ("side": threads, people) and the doc are sheets that drop from the top over the chat. Opening one
// pushes a history entry so Back closes it (like the file viewer); picking a thread reuses that entry for its URL.
const ROOM_PHONE = matchMedia("(max-width: 900px)");
let sheetSkip = false;
function openSheet(which) {
  const bk = $app.querySelector(".book");
  if (!bk || !ROOM_PHONE.matches || bk.dataset.sheet === which) return;
  if (!bk.dataset.sheet) navigation.pushState({ sheet: 1 }, "", location.href);
  bk.dataset.sheet = which;
}
function closeSheet(pick) {
  const bk = $app.querySelector(".book");
  if (!bk?.dataset.sheet) return;
  bk.querySelector(
    '.doc[data-view="edit"] .seg [data-view="preview"]',
  )?.click(); // closing the doc ends editing
  delete bk.dataset.sheet;
  if (!history.state?.sheet) return;
  if (pick)
    urlSynced = false; // the next syncUrl replaces the sheet's entry with the picked thread's URL
  else {
    sheetSkip = true;
    history.back();
  }
}
// Leave legacy room overlays without triggering asynchronous history.back after a native navigation.
function closeRoomOverlaysForNavigation() {
  const viewer = document.getElementById("viewer"),
    book = $app.querySelector(".book");
  if (history.state?.viewer || history.state?.sheet)
    navigation.replaceState(null, "", location.href);
  if (viewer?.open) viewer.close();
  if (book?.dataset.sheet) {
    book
      .querySelector('.doc[data-view="edit"] .seg [data-view="preview"]')
      ?.click();
    delete book.dataset.sheet;
  }
}
function sheetPop() {
  if (sheetSkip) {
    sheetSkip = false;
    return true;
  }
  const bk = $app.querySelector(".book");
  if (!bk?.dataset.sheet) return false;
  bk.querySelector(
    '.doc[data-view="edit"] .seg [data-view="preview"]',
  )?.click();
  delete bk.dataset.sheet;
  return true;
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !e.defaultPrevented && $app.querySelector(".book[data-sheet]") && !document.querySelector("dialog[open], [data-dialog-content], [data-alert-dialog-content]")) closeSheet(); });
// Drag a sheet by its handle (or the peek bar): it follows the finger, and lets go open or closed past a quarter.
// A tap (no drag) is a plain click: opens from the peek bar, closes from the handle.
function sheetDrag(handle, which, opening, onTap) {
  if (!handle) return;
  let dragged = false;
  handle.onclick = (e) => {
    if (dragged) {
      dragged = false;
      return;
    }
    onTap ? onTap(e) : opening ? openSheet(which) : closeSheet();
  };
  handle.onpointerdown = (e) => {
    const bk = $app.querySelector(".book"),
      el = bk?.querySelector(which === "doc" ? ".doc" : ".side"),
      dim = document.getElementById("sheetDim");
    if (!el || !ROOM_PHONE.matches) return;
    const y0 = e.clientY,
      H = el.offsetHeight;
    let dy = 0,
      moving = false;
    const up = -1; // both sheets hang from the top: dragging up closes, down opens
    dragged = false;
    handle.onpointermove = (ev) => {
      dy = (ev.clientY - y0) * up;
      if (!moving && Math.abs(dy) < 6) return;
      // Capturing a toolbar tap would retarget its child-button click to the handle.
      if (!moving) handle.setPointerCapture(e.pointerId);
      moving = true; el.classList.add("sheetDrag"); dim.style.transition = "none";
      const y = Math.min(H, Math.max(0, opening ? H + dy : dy));
      el.style.transform = `translateY(${y * up}px)`;
      dim.style.opacity = String(1 - y / H);
    };
    handle.onpointerup = handle.onpointercancel = () => {
      handle.onpointermove = handle.onpointerup = handle.onpointercancel = null;
      if (!moving) return;
      dragged = true;
      setTimeout(() => (dragged = false), 400); // swallow the click that follows the drag
      el.classList.remove("sheetDrag");
      el.style.transform = "";
      dim.style.transition = "";
      dim.style.opacity = "";
      if (opening ? -dy > H / 4 : dy <= H / 4) openSheet(which);
      else closeSheet();
    };
  };
}
function renderTasks() {
  const el = document.getElementById("tasks");
  if (!el) return;
  const epic = S.epics.find((e) => e.id === thread);
  const head = document.getElementById("threadTitle");
  const chev = `<button type="button" class="thChev" aria-label="${t("Trocar de conversa")}" title="${t("Trocar de conversa")}">${icon("chevronDown", 18)}</button>`;
  const wireChev = () =>
    (head.querySelector(".thChev").onclick = () => openSheet("side"));
  // On phones the icon + name + ▾ are one raised button, like the selected row in the sheet it opens (.thread.sel).
  const pick = (mark, name) =>
    `<span class="thPick">${mark.replace('class="ri', 'class="ri thMark')}${name}${chev}</span>`;
  if (preOf()) {
    disposeView("tasks");
    head.innerHTML = `${pick(`<span class="ri">${esc(initials(preOf().title))}</span>`, `<span class="epicName" id="roomName">${esc(preOf().title)}</span>`)}<small class="folderChip">✦ ${t("sugestão do @vibe")}</small>`;
    wireChev();
    document.getElementById("roomName").onclick = () =>
      ROOM_PHONE.matches && openSheet("side");
    el.innerHTML = "";
    renderPeek();
    return;
  }
  head.innerHTML = epic
    ? `${pick(`<span class="ri" style="background:${color(epic.title)};color:#fff">${esc(initials(epic.title))}</span>`, `<span class="epicName" id="roomName" title="${t("Clique para renomear")}">${esc(epic.title)}</span>`)}<button class="ghost x" id="epicArch" title="${epic.archived ? t("Desarquivar épico") : t("Arquivar épico (concluído)")}" aria-label="${epic.archived ? t("Desarquivar épico") : t("Arquivar épico")}">${icon(epic.archived ? "undo" : "check")}</button><button class="ghost x" id="epicDel" title="${t("Apagar épico")}" aria-label="${t("Apagar épico")}">${icon("trash")}</button>`
    : `${pick(roomMark("ri roomIco"), `<span class="epicName" id="roomName" title="${esc(S.book?.summary || t("Clique para renomear"))}">${esc(bookTitle())}</span>`)}${S.book?.folder ? `<small class="folderChip">${icon("folder", 12)} ${esc(S.book.folder)}</small>` : ""}`;
  // Who is the room waiting on: open tasks with an owner, across every epic.
  const waiting = {};
  for (const t of [...S.epics.flatMap((e) => e.tasks), ...(S.roomTasks || [])])
    if (!t.done && t.owner) waiting[t.owner] = (waiting[t.owner] || 0) + 1;
  const w = Object.entries(waiting).sort((a, b) => b[1] - a[1]);
  // Each person in the chip opens the list of what's waiting on them; a task opens its epic.
  // Phones: the chip would take a second line; a small ⏳ n in the top bar instead (you if anything waits on you, else
  // whoever has the most), same list on tap.
  const bar = head.closest(".chathead");
  // The board button (the room's tasks) carries how many open tasks are yours; on phones it replaced the ⏳.
  const mineN = waiting[S.me] || 0,
    kb = document.getElementById("toggleBoard");
  kb.querySelector(".kN")?.remove();
  if (mineN)
    kb.insertAdjacentHTML(
      "beforeend",
      `<b class="kN" title="${t("Esperando você")}: ${mineN}">${mineN}</b>`,
    );
  const pk = $app.querySelector(".ptBoard .kN");
  if (pk) {
    pk.hidden = !mineN;
    pk.textContent = mineN || "";
  }
  kb.title = mineN
    ? `${t("Quadro de tarefas")} · ${t("Esperando você")}: ${mineN}`
    : t("Quadro de tarefas (kanban)");
  wireChev();
  // Phones: the name is the thread switcher; renaming moves to the ✎ in the switcher sheet.
  document.getElementById("roomName").onclick = () =>
    ROOM_PHONE.matches ? openSheet("side") : renameThread();
  // Phone ←: inside an epic (or a suggestion) it goes back to the room's main thread; in the main thread, home.
  const back = $app.querySelector(".phHome");
  if (back) {
    const inThread = thread !== "main";
    back.title = back.ariaLabel = inThread
      ? t("Voltar pra sala principal")
      : t("Seus vibebooks");
    back.onclick = (e) => {
      if (thread === "main") return;
      e.preventDefault();
      e.stopPropagation();
      thread = "main";
      docRoom = false;
      boardEpic = null;
      renderSide();
      renderChat();
      renderKanban();
      renderDoc();
    };
  }
  head.querySelector(".thPick").onclick = (e) => {
    if (ROOM_PHONE.matches && !e.target.closest(".thChev")) openSheet("side");
  };
  renderPeek();
  // In the main thread, the room's own tasks (the room doc's "## Tarefas") get the same card.
  const list =
    epic ||
    (thread === "main" && S.roomTasks?.length
      ? { id: "main", tasks: S.roomTasks }
      : null);
  el.style.display = list ? "" : "none";
  if (!list) return;
  if (epic) document.getElementById("epicArch").onclick = () => send({ t: "epic.archive", id: epic.id, archived: !epic.archived });
  if (epic) document.getElementById("epicDel").onclick = () => { if (confirm(t("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: epic.title }))) send({ t: "epic.del", id: epic.id }); };
  renderView("tasks", el, {room:S, thread, vb:panelBridge(), send, request, waits:myWaits});
}

const fileUrl = (f) => `/api/books/${S.id}/files/${f.id}`;
// Files open in an in-app viewer (a native <dialog>: name, ↗ open in a tab, ×) instead of navigating away, which in
// the PWA meant no way back. Images are an <img>; HTML and PDF an iframe (HTML keeps the server's sandbox CSP and
// gets sandbox="allow-scripts" here too). Cmd/Ctrl/middle click still opens a tab.
const viewAttrs = (f) =>
  `data-view="${f.type.startsWith("image/") ? "img" : "frame"}" data-name="${esc(f.name)}"`;
// The iOS home-screen app keeps same-origin links inside itself, even with target=_blank; x-safari-https:// (iOS 17+)
// hands the URL to Safari instead. Safari has its own cookies, so a file asks to sign in there once (filePage).
const IOS_PWA =
  (matchMedia("(display-mode: standalone)").matches ||
    navigator.standalone === true) &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) ||
    (/Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1));
const outside = (u) =>
  IOS_PWA ? `x-safari-${new URL(u, location.href).href}` : u;
function openViewer(url, kind, fname) {
  let d = document.getElementById("viewer");
  if (!d) {
    d = document.createElement("dialog");
    d.id = "viewer";
    d.className = "viewer";
    d.innerHTML = `<header><b></b><select class="vsel" aria-label="${t("Versão")}" hidden></select><a target="_blank" rel="noopener" title="${t("Abrir numa aba")}" aria-label="${t("Abrir numa aba")}">${icon("external", 20)}</a><button type="button" title="${t("Fechar")}" aria-label="${t("Fechar")}">${icon("x", 20)}</button></header><div class="vbody"></div>`;
    d.querySelector("button").onclick = () => d.close();
    d.querySelector("header a").onclick = () => d.close();
    d.querySelector(".vsel").onchange = (e) => {
      const v = e.target.value;
      loadViewer(
        d,
        `/api/books/${S.id}/files/${v}`,
        d.dataset.kind,
        d.dataset.name,
      );
    };
    d.addEventListener("click", (e) => {
      if (e.target.classList.contains("vbody")) d.close();
    });
    // Closed by ×, Esc or a tap outside: drop the history entry it pushed, so Back doesn't reopen nothing.
    d.addEventListener("close", () => {
      if (d.open) return;
      d.querySelector(".vbody").innerHTML = "";
      if (history.state?.viewer) {
        viewerSkip = true;
        history.back();
      }
    });
    document.body.appendChild(d);
  }
  loadViewer(d, url, kind, fname);
  // Back (phone gesture, browser, PWA) closes it. A room file gets its own address (/b/<room>?t=…#f<id>): copy it and
  // send it to someone in the room, it opens the same file for them.
  if (!d.open)
    navigation.pushState(
      { viewer: 1 },
      "",
      d.dataset.fid
        ? `${location.pathname}${location.search}#f${d.dataset.fid}`
        : location.href,
    );
  d.showModal();
  refreshVersions();
}
// Versions of a file = the room's files with the same name (each upload of report.html is one), newest first. The
// state brings only the newest 12 files: what's loaded shows now, the rest once files.get answers (refreshVersions).
function fileVersions(name) {
  const by = new Map();
  for (const f of S.files || [])
    if (f.name === name) by.set(f.id, { id: f.id, ts: f.ts });
  for (const m of allMsgs())
    for (const f of m.files || [])
      if (f.name === name && !by.has(f.id))
        by.set(f.id, { id: f.id, ts: m.ts });
  return [...by.values()].sort((a, b) => b.ts - a.ts);
}
function refreshVersions() {
  const d = document.getElementById("viewer");
  if (!d?.open || !d.dataset.name) return;
  const sel = d.querySelector(".vsel"),
    vs = fileVersions(d.dataset.name),
    cur = d.dataset.fid;
  sel.hidden = vs.length < 2;
  sel.innerHTML = vs
    .map(
      (v, i) =>
        `<option value="${v.id}"${v.id === cur ? " selected" : ""}>v${vs.length - i}${i === 0 ? ` · ${t("mais nova")}` : ""} · ${new Date(v.ts).toLocaleString(LOCALE, { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</option>`,
    )
    .join("");
}
function loadViewer(d, url, kind, fname) {
  d.dataset.kind = kind;
  d.dataset.name = typeof url === "string" ? fname : "";
  d.dataset.fid =
    typeof url === "string"
      ? (/\/files\/([0-9a-f]+)/.exec(url)?.[1] ?? "")
      : "";
  d.querySelector("header b").textContent = fname;
  d.querySelector("header a").href =
    typeof url === "string" ? outside(url) : "";
  const vsel = d.querySelector(".vsel");
  vsel.hidden = true;
  if (d.dataset.fid) {
    refreshVersions();
    if (!S.filesAll) send({ t: "files.get" });
  }
  if (d.open && d.dataset.fid && history.state?.viewer)
    navigation.replaceState(
      history.state,
      "",
      `${location.pathname}${location.search}#f${d.dataset.fid}`,
    ); // another version picked
  const body = d.querySelector(".vbody");
  body.className = `vbody ${kind}`;
  d.classList.toggle("noLink", kind === "table");
  if (kind === "table")
    body.replaceChildren(url.cloneNode(true)); // url is the <table> node here
  else if (kind === "img") {
    const img = new Image();
    img.src = url;
    img.alt = fname;
    body.replaceChildren(img);
  }
  // Text files are drawn here, not in an iframe: a plain-text page in a frame came out blank on the dark viewer
  // (Nov 2026). Markdown like the agents' messages (sanitized), CSV as a table, the rest as text.
  else if (/\.(md|markdown|txt|csv)$/i.test(fname) && typeof url === "string") {
    body.className = "vbody text";
    body.replaceChildren();
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((txt) => {
        if (d.dataset.fid && !url.endsWith(d.dataset.fid)) return; // another file was opened meanwhile
        body.innerHTML = /\.(md|markdown)$/i.test(fname)
          ? `<div class="vdoc md">${md(txt.slice(0, 300_000))}</div>`
          : /\.csv$/i.test(fname)
            ? `<div class="vdoc"><table>${csvRows(txt)
                .map(
                  (r, i) =>
                    `<tr>${r.map((c) => `<${i ? "td" : "th"}>${esc(c)}</${i ? "td" : "th"}>`).join("")}</tr>`,
                )
                .join("")}</table></div>`
            : `<pre class="vdoc">${esc(txt.slice(0, 300_000))}</pre>`;
      })
      .catch(() => {
        body.innerHTML = `<p class="vdoc">${t("Não consegui abrir este arquivo.")}</p>`;
      });
  } else {
    const fr = document.createElement("iframe");
    fr.src = url;
    fr.title = fname;
    if (!/\.pdf$/i.test(fname)) fr.sandbox = "allow-scripts";
    body.replaceChildren(fr);
  }
}
// CSV → rows (quotes and "" escapes; ≤2000 rows × 50 columns for the viewer).
function csvRows(txt) {
  const rows = [];
  let row = [],
    cell = "",
    q = false;
  for (let i = 0; i < txt.length && rows.length < 2000; i++) {
    const ch = txt[i];
    if (q) {
      if (ch === '"') {
        if (txt[i + 1] === '"') {
          cell += '"';
          i++;
        } else q = false;
      } else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === "," || (ch === ";" && !txt.slice(0, 200).includes(","))) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row.slice(0, 50));
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row.slice(0, 50));
  }
  return rows;
}
let viewerSkip = false;
// popstate: Back while the viewer is open closes it; the pop that follows our own close is swallowed.
function viewerPop() {
  if (viewerSkip) {
    viewerSkip = false;
    return true;
  }
  const d = document.getElementById("viewer");
  if (!d?.open) return false;
  navigation.replaceState(null, "", location.href);
  d.close();
  return true;
}
document.addEventListener("click", (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const a = e.target.closest?.("a[data-view]");
  if (a) {
    e.preventDefault();
    return openViewer(
      a.getAttribute("href"),
      a.dataset.view,
      a.dataset.name || "",
    );
  }
  // A link to one of this room's files written in a message ([report.html](https://vibebook.dev/api/books/<room>/files/<id>))
  // opens in the viewer too: as a plain link, the home-screen app navigated to the raw file with no bar and no way back.
  const l = e.target.closest?.("a[href]");
  if (!l || !S?.id) return;
  let u;
  try {
    u = new URL(l.getAttribute("href"), location.href);
  } catch {
    return;
  }
  const m =
    u.origin === location.origin &&
    new RegExp(`^/api/books/${S.id}/files/([0-9a-f]+)$`).exec(u.pathname);
  if (!m) return;
  const f =
    (S.files || []).find((x) => x.id === m[1]) ||
    allMsgs()
      .flatMap((x) => x.files || [])
      .find((x) => x.id === m[1]);
  e.preventDefault();
  openViewer(
    u.pathname,
    f?.type?.startsWith("image/") ? "img" : "frame",
    f?.name || l.textContent.trim() || "arquivo",
  );
});
const kb = (n) => n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1e3))} KB`;
const hhmm = (ts) => new Date(ts).toLocaleTimeString(LOCALE, { hour: "2-digit", minute: "2-digit" });
// Same author (and kind), within 5 minutes, no poll in between: drop the name and avatar, keep the time on hover.
// A request that became an epic shows it as a thread under the message (Slack/Discord style); click to open it.
const threadCard = (e) => {
  const replies = S.messages.filter((x) => x.thread === e.id),
    last = replies.at(-1);
  const nReplies = S.counts
    ? (S.counts[e.id] ?? 0) +
      replies.filter((x) => x.id > (S.countsAt ?? 0)).length
    : replies.length;
  const d = e.tasks.filter((t) => t.status === "done").length;
  return `${epicIco(e)}<span class="tc-t"><b>${esc(e.title)}</b><small>${e.archived ? `✓ ${t("concluído")} · ` : ""}${e.tasks.length ? `${t("{d}/{n} tarefas", { d, n: e.tasks.length })} · ` : ""}${nReplies === 1 ? t("1 resposta") : t("{n} respostas", { n: nReplies })}${last ? ` · ${ago(last.ts) === t("agora") ? t("agora") : t("última há {ago}", { ago: ago(last.ts) })}` : ""}</small></span><span class="tc-go">→</span>`;
};
// The files an epic tree produced (the epic and its sub-epics, any depth): what's loaded in the tab first (newest),
// then what the room says each epic has (epics[].files). Shown under its thread card, so a channel reads as a list of
// the reports and prints that came out of it.
function treeFiles(eid) {
  const kids = new Map();
  for (const e of S.epics || [])
    if (e.parent) {
      if (!kids.has(e.parent)) kids.set(e.parent, []);
      kids.get(e.parent).push(e.id);
    }
  const ids = [eid];
  for (let i = 0; i < ids.length && ids.length < 60; i++)
    for (const k of kids.get(ids[i]) || []) if (!ids.includes(k)) ids.push(k);
  const set = new Set(ids),
    by = new Map();
  for (const m of [...S.messages].reverse())
    if (set.has(m.thread))
      for (const f of m.files || []) {
        const o = by.get(f.name);
        if (o) o.seen.add(f.id);
        else by.set(f.name, { f, seen: new Set([f.id]), n: 0 });
      }
  for (const id of ids)
    for (const f of S.epics.find((x) => x.id === id)?.files || []) {
      const o = by.get(f.name);
      if (o) o.n = Math.max(o.n, f.n, o.seen.size);
      else by.set(f.name, { f, seen: new Set([f.id]), n: f.n });
    }
  return [...by.values()].map((o) => ({
    ...o.f,
    n: Math.max(o.n, o.seen.size),
  }));
}
const treeFilesHtml = (eid) => {
  const fs = treeFiles(eid);
  if (!fs.length) return "";
  const chips = fs
    .slice(0, 6)
    .map(
      (f) =>
        `<a class="fchip" href="/api/books/${S.id}/files/${f.id}" title="${esc(f.name)}">${fileIcon(f, 14)}<span>${esc(f.name)}</span>${f.n > 1 ? `<small>v${f.n}</small>` : ""}</a>`,
    )
    .join("");
  return `<div class="tcFiles" data-files-of="${eid}">${chips}${fs.length > 6 ? `<small class="mute">+${fs.length - 6}</small>` : ""}</div>`;
};
const threadCards = (msgId) =>
  (S.epics || [])
    .filter((e) => e.from_msg === msgId)
    .map(
      (e) =>
        `<button type="button" class="tcard" data-goepic="${e.id}">${threadCard(e)}</button>${treeFilesHtml(e.id)}`,
    )
    .join("");
function refreshThreadCards() {
  // Cards are inside Svelte-owned message content. Update its props instead of
  // inserting untracked siblings or removing its HTML anchors.
  renderChat("stay");
}
document.addEventListener("click", (ev) => {
  const back = ev.target.closest("[data-gomain]");
  if (back) {
    thread = "main";
    boardEpic = null;
    docRoom = false;
    renderSide();
    renderChat();
    renderKanban();
    renderDoc();
    return document
      .getElementById(`m${back.dataset.gomain}`)
      ?.scrollIntoView({ block: "center" });
  }
  const b = ev.target.closest("[data-chat-rich~=tcard][data-goepic]"); if (!b) return;
  thread = b.dataset.goepic; boardEpic = thread; docRoom = false;
  renderSide(); renderChat(); renderKanban(); renderDoc();
});
// The "finished" line at the bottom of an archived epic: always last, gone as soon as the epic reopens.
// Replies: ↩ (hover) or a swipe right (touch) quotes a message above the composer; the sent message carries
// reply_to and shows that quote, which scrolls to the original and flashes it.
let replyTo = null;
const snip = (m) => (m.text || m.files?.map((f) => f.name).join(", ") || (m.poll ? t("votação") : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120);
const replyWho = (m) => (m.author === "ai" ? "@vibe" : m.kind === "agent" ? t("{via} de {who}", { via: "Agent", who: name(m.author) }) : name(m.author));
function renderReply() {
  const bar = document.getElementById("replyBar");
  if (!bar) return;
  if (replyTo && replyTo.thread !== thread) replyTo = null;
  bar.hidden = !replyTo;
  if (replyTo)
    bar.innerHTML = `<span>${icon("reply", 13)} ${t("Respondendo a <b>{who}</b>", { who: esc(replyWho(replyTo)) })}: ${esc(snip(replyTo))}</span><button type="button" class="ghost" id="replyX" aria-label="${t("Cancelar resposta")}" title="${t("Cancelar")}">${icon("x")}</button>`;
  document.getElementById("replyX")?.addEventListener("click", () => {
    replyTo = null;
    renderReply();
  });
}
function startReply(id) {
  replyTo = S.messages.find((x) => x.id === id) ?? null;
  renderReply();
  document.getElementById("input")?.focus();
}
document.addEventListener("click", (ev) => {
  const ml = ev.target.closest("a.mlink[data-msg], a[data-chat-rich~=mlink][data-msg]");
  if (ml) { ev.preventDefault(); return goToMsg(Number(ml.dataset.msg)); }
});
// A message referenced by a reply quote or a [link](#m123): switch to its thread if needed, then scroll to it and flash.
// Goes to a message: switches to its thread (th when the message isn't loaded yet: the inbox, a #m link), widens the
// window when it's loaded but not drawn, else pages back through the thread (≤15 × 100) until it shows up.
let goPending = null;
function goToMsg(id, th) {
  const m = S.messages.find((x) => x.id === id),
    want = m?.thread || th;
  if (
    want &&
    want !== thread &&
    (want === "main" || S.epics.some((e) => e.id === want))
  ) {
    thread = want;
    boardEpic = thread === "main" ? null : thread;
    docRoom = false;
    renderSide();
    renderChat();
    renderKanban();
    renderDoc();
  }
  let el = document.getElementById(`m${id}`);
  if (!el && m) {
    const all = S.messages.filter((x) => x.thread === thread),
      i = all.indexOf(m);
    if (i >= 0) {
      win.n = Math.max(win.n, all.length - i + 10);
      renderChat(true);
      el = document.getElementById(`m${id}`);
    }
  }
  if (!el) {
    if (goPending?.id === id) return;
    goPending = { id, n: 0 };
    toast(t("Buscando a mensagem…"), 1500);
    return pullOlder();
  }
  goPending = null;
  stick = false; // reading up there now: new content below must not pull the chat back down
  el.scrollIntoView({ block: "center", behavior: "smooth" });
  el.dispatchEvent(new CustomEvent("vb:message-highlight"));
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && replyTo && document.activeElement?.id === "input") { replyTo = null; renderReply(); } });
// Choices: an agent asks its human to pick (post with choices). That person sees radio/checkboxes + Enviar; the
// pick is sent as their message replying to the question, which is also how the block knows it was answered.
// Native cards (MCP post card, json-render's spec shape, validated by src/card.ts): every string escaped, no HTML.
// Buttons work like choices: only the person whose Claude asked can press one, and it's posted as their reply.
// A card's LinkButton to a place in the room: a message (#m), an epic's thread (#e), the doc (#doc[:epic]).
function cardGo(to) {
  if (to.startsWith("#app:")) {
    const [cid, tool] = to.slice(5).split("/");
    connApp = { cid, tool };
    document.dispatchEvent(new CustomEvent("vb:pane", { detail: "apps" }));
    if (ROOM_PHONE.matches) openSheet("doc");
    return;
  }
  if (to.startsWith("#m")) return goToMsg(Number(to.slice(2)));
  const epic = to.startsWith("#e") ? to.slice(2) : to.split(":")[1];
  const target =
    epic && S.epics.some((x) => x.id === epic) ? epic : epic ? null : thread;
  if (!target) return toast(t("Esse épico não existe mais nesta sala."));
  if (target !== thread) {
    thread = target;
    docRoom = false;
    boardEpic = thread === "main" ? null : thread;
    renderSide();
    renderChat();
    renderKanban();
    renderDoc();
  }
  if (to.startsWith("#doc")) {
    document.dispatchEvent(new CustomEvent("vb:pane", { detail: "doc" }));
    if (ROOM_PHONE.matches) openSheet("doc");
  }
}
document.addEventListener("click", (e) => { const g = e.target.closest("[data-cardgo]"); if (g) { e.preventDefault(); cardGo(g.dataset.cardgo); } });
// A permission ask (Aprovar/Negar from the plugin's hook) is answered in place: the button, then Confirmar (never by
// accident). The answer is still a message of the person's (that's what the server checks: only their own human
// message counts), but it isn't drawn in the chat: the ask shows "✓ Aprovado por X" instead.
// Someone else's Claude asking them (⏸ permission, ❓ question) is between that person and their Claude: the rest of
// the room doesn't see it (it filled shared threads with "Aprovar/Negar" and "ok", Nov 2026).
const othersAsk = (m) => m?.kind === "agent" && m.author !== S.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(m.text || "");
const isPermAnswer = (m) => { if (!m?.reply_to || m.kind === "agent") return false; const q = S.messages.find((x) => x.id === m.reply_to); return !!q && isPermAsk(q) && q.author === m.author; };
function renderDecisions() {
  const el = document.getElementById("decPane");
  if (!el) return;
  const list = S.decisions || [];
  document.getElementById("decCount").textContent = list.length ? ` ${list.length}` : "";
  const roomId = S.id;
  renderView("decisions", el, {room:S, thread, vb:panelBridge(), send, request:(command) => S?.id === roomId ? request(command) : Promise.resolve({ok:false, error:"disconnected"})});
}

// The Apps tab: room apps (apps/*.html) and the room's MCP connections; renderConns below draws it.
function renderApps() {
  if (document.querySelector('.doc[data-pane="apps"]')) renderConns();
}

// Conexões: the room's MCP servers (src/mcpconn.ts), "da sala" (everyone) or "minha" (only you and your Claudes), plus
// "Esta sala": room apps, plain HTML files apps/<name>.html (any Claude makes one with upload_file). Every app opens here
// in an opaque-origin iframe; below is the host side of the MCP Apps bridge (ui/initialize, tool-input/result,
// tools/call, open-link, message, model context). A remote app's tools/call goes to its own server through the Worker;
// a room app gets vibebook's tools instead (VB_TOOLS), run here as the person looking, writes only after they allow it.
let conns = null,
  connsBook = null,
  connForm = false,
  connApp = null;
const connMore = new Set(); // connections whose every UI tool is listed, not only their screens // connApp = { cid ("room" for a room app), tool }
async function loadConns() {
  if (!S?.id) return;
  const book = S.id, account = S.me, connection = roomConnection;
  const owns = () => S?.id === book && S.me === account && roomConnection === connection && currentRoomId() === book;
  try {
    const r = await api(`/api/books/${book}/connections`);
    if (owns()) {
      conns = r.connections;
      connsBook = book;
    }
  } catch (e) {
    if (!owns()) return;
    conns = conns || [];
    toast(esc(e.message));
  }
  if (owns()) renderConns();
}
const scopeChip = (c) =>
  c.scope === "me"
    ? `<span class="cScope me">${t("minha")}</span>`
    : `<span class="cScope">${t("da sala")}</span>`;
// Room apps: the newest version of each apps/<name>.html (S.files is newest first).
function roomApps() {
  const seen = new Set();
  return (S.files || [])
    .filter(
      (f) =>
        f.type === "text/html" &&
        /^apps\/[\w.-]+\.html$/i.test(f.name) &&
        !seen.has(f.name) &&
        seen.add(f.name),
    )
    .map((f) => ({
      tool: f.name.slice(5, -5),
      title: f.name.slice(5, -5),
      description: `${name(f.author)} · ${ago(f.ts)}`,
      file: f,
    }));
}
function connsFilesChanged() {
  if (
    document.querySelector('.doc[data-pane="apps"]') &&
    !(connApp && document.querySelector(".connFrame"))
  )
    renderConns();
}
function renderConns() {
  const el = document.getElementById("appsPane");
  if (!el) return;
  if (connsBook !== S.id) {
    conns = null;
    connsBook = S.id;
  }
  if (!S.filesAll) send({ t: "files.get" }); // room apps live among the files; the state brings only the newest 12
  if (conns === null) {
    el.innerHTML = `<div class="empty">${t("Carregando…")}</div>`;
    loadConns();
    conns = undefined;
    return;
  }
  if (conns === undefined) return; // loading
  const rapps = roomApps();
  document.getElementById("appCount").textContent =
    conns.length + rapps.length ? ` ${conns.length + rapps.length}` : "";
  if (connApp) return renderConnApp(el);
  const keep =
    document.getElementById("connForm") &&
    Object.fromEntries(new FormData(document.getElementById("connForm")));
  const appBtns = (cid, apps) =>
    `<div class="connApps">${apps.map((a) => `<button type="button" class="connApp" data-conn-open="${cid}/${esc(a.tool)}"><b>${esc(a.title)}</b><span>${esc(a.description)}</span></button>`).join("")}</div>`;
  el.innerHTML = `<div class="connHead"><b>Apps</b>${connForm ? "" : `<button type="button" class="ghost" id="connAdd">${icon("plus", 15)} ${t("Conectar MCP")}</button>`}</div>
    ${
      connForm
        ? `<form class="connForm" id="connForm">
      <label>${t("URL do servidor MCP")}<input name="url" required placeholder="https://…/mcp" autocomplete="off" spellcheck="false"></label>
      <small class="mute">${t("Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.")}</small>
      <fieldset><label><input type="radio" name="scope" value="me" checked> ${t("Só minha: só eu e meus agents")}</label><label><input type="radio" name="scope" value="room"> ${t("Da sala: todo mundo vê; cada um entra com a própria conta")}</label></fieldset>
      <div class="acts"><button type="button" id="connCancel">${t("Cancelar")}</button><button class="primary">${t("Conectar")}</button></div></form>`
        : ""
    }
    <div class="conn"><div class="connTop"><b>${t("Esta sala")}</b><span class="cScope">${t("da sala")}</span><small>apps/*.html</small></div>
      ${rapps.length ? appBtns("room", rapps) : `<small class="mute">${t("Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.")}</small>`}</div>
    ${conns
      .map(
        (
          c,
        ) => `<div class="conn"><div class="connTop"><b>${esc(c.title)}</b>${scopeChip(c)}<small>${esc(c.host)} · ${esc(name(c.owner))}</small>
        <button type="button" class="ghost" data-conn-ref="${c.id}" title="${t("Atualizar")}" aria-label="${t("Atualizar")}">↻</button>${c.mine ? `<button type="button" class="ghost" data-conn-del="${c.id}" title="${t("Remover conexão")}" aria-label="${t("Remover conexão")}">${icon("x", 14)}</button>` : ""}</div>
        ${
          c.auth === "identity"
            ? c.signed_in
              ? `<small class="mute connWho">${t("Você entrou em {host} com a sua conta.", { host: esc(c.host) })} <button type="button" class="link" data-conn-out="${c.id}">${t("Sair")}</button></small>`
              : `<div class="connSign"><small>${t("Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.", { host: esc(c.host) })}</small><a class="primary" href="/api/books/${S.id}/connections/${c.id}/signin?ui=svelte">${t("Entrar em {host}", { host: esc(c.host) })}</a></div>`
            : ""
        }
        ${
          c.apps.length
            ? (() => {
                const sc = c.apps.filter((a) => a.screen),
                  few = sc.length && !connMore.has(c.id);
                return (
                  appBtns(c.id, few ? sc : c.apps) +
                  (sc.length && sc.length < c.apps.length
                    ? `<button type="button" class="link connMore" data-conn-more="${c.id}">${few ? t("ver todas ({n})", { n: c.apps.length }) : t("só as telas")}</button>`
                    : "")
                );
              })()
            : `<small class="mute">${t("{n} tools, nenhum app", { n: c.tools.length })}</small>`
        }</div>`,
      )
      .join("")}`;
  const f = document.getElementById("connForm");
  if (f && keep)
    for (const [k, v] of Object.entries(keep))
      if (f.elements[k] && k !== "scope") f.elements[k].value = v;
  document.getElementById("connAdd")?.addEventListener("click", () => {
    connForm = true;
    renderConns();
    document.querySelector('#connForm [name="url"]')?.focus();
  });
  document.getElementById("connCancel")?.addEventListener("click", () => {
    connForm = false;
    renderConns();
  });
  if (f)
    f.onsubmit = async (e) => {
      e.preventDefault();
      const btn = f.querySelector(".primary");
      btn.disabled = true;
      btn.textContent = t("Conectando…");
      try {
        const r = await api(`/api/books/${S.id}/connections`, {
          url: f.url.value.trim(),
          scope: f.scope.value,
        });
        if (r.connection?.needs_sign_in)
          return void (location.href = `/api/books/${S.id}/connections/${r.connection.id}/signin?ui=svelte`);
        connForm = false;
        conns = null;
        renderConns();
      } catch (x) {
        toast(esc(x.message));
        btn.disabled = false;
        btn.textContent = t("Conectar");
      }
    };
  el.querySelectorAll("[data-conn-out]").forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await api(
            `/api/books/${S.id}/connections/${b.dataset.connOut}/signout`,
            {},
          );
        } catch (x) {
          toast(esc(x.message));
        }
        conns = null;
        renderConns();
      }),
  );
  el.querySelectorAll("[data-conn-more]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = b.dataset.connMore;
        connMore.has(id) ? connMore.delete(id) : connMore.add(id);
        renderConns();
      }),
  );
  el.querySelectorAll("[data-conn-open]").forEach(
    (b) =>
      (b.onclick = () => {
        const [cid, tool] = b.dataset.connOpen.split("/");
        connApp = { cid, tool };
        renderConns();
      }),
  );
  el.querySelectorAll("[data-conn-ref]").forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await api(
            `/api/books/${S.id}/connections/${b.dataset.connRef}/refresh`,
            {},
          );
          conns = null;
          renderConns();
        } catch (x) {
          toast(esc(x.message));
        }
      }),
  );
  el.querySelectorAll("[data-conn-del]").forEach(
    (b) =>
      (b.onclick = async () => {
        const c = conns.find((x) => x.id === b.dataset.connDel);
        if (
          !confirm(
            t("Remover a conexão {name}? Os apps dela saem da sala.", {
              name: c?.title || "",
            }),
          )
        )
          return;
        await fetch(`/api/books/${S.id}/connections/${b.dataset.connDel}`, {
          method: "DELETE",
        });
        conns = null;
        renderConns();
      }),
  );
}
function renderConnApp(el) {
  const room = connApp.cid === "room";
  const c = room
    ? { id: "room", scope: "room", title: t("Esta sala") }
    : conns.find((x) => x.id === connApp.cid);
  const a = room
    ? roomApps().find((x) => x.tool === connApp.tool)
    : c?.apps.find((x) => x.tool === connApp.tool);
  if (!c || !a) {
    if (room && !S.filesAll) {
      el.innerHTML = `<div class="empty">${t("Carregando…")}</div>`;
      return;
    } // files.get answers, connsFilesChanged redraws
    if (!room && !connApp.retried) {
      connApp.retried = true;
      conns = null;
      return renderConns();
    } // someone may have just connected it
    connApp = null;
    toast(t("Esse app não está nas conexões que você pode usar nesta sala."));
    return renderConns();
  }
  const key = `${c.id}/${a.tool}${room ? `@${a.file.id}` : ""}`;
  const pinRef = room ? a.tool : `${c.id}/${a.tool}`;
  const bar = el.querySelector(".connBar");
  if (el.querySelector(".connFrame")?.dataset.app === key) {
    bar
      ?.querySelector(".pinBtn")
      ?.replaceWith(
        Object.assign(document.createElement("template"), {
          innerHTML: pinToggle("app", pinRef),
        }).content,
      );
    bar && wirePinToggles(bar);
    return;
  } // already open: only the pin state may have changed
  el.innerHTML = `<div class="connBar"><button type="button" class="ghost" id="connBack">← Apps</button><b>${esc(a.title)}</b>${scopeChip(c)}${pinToggle("app", pinRef)}<button type="button" class="ghost" id="connReload" title="${t("Recarregar")}" aria-label="${t("Recarregar")}">↻</button></div><div class="appAsk" id="appAsk" hidden></div><iframe class="connFrame" sandbox="allow-scripts allow-forms" title="${esc(a.title)}"></iframe>`;
  const frame = el.querySelector(".connFrame");
  frame.dataset.app = key;
  document.getElementById("connBack").onclick = () => {
    connApp = null;
    renderConns();
  };
  wirePinToggles(el.querySelector(".connBar"));
  document.getElementById("connReload").onclick = () => {
    frame.dataset.app = "";
    renderConnApp(el);
  };
  mountApp(frame, c, a);
}
const textOf = (content) =>
  Array.isArray(content)
    ? content
        .filter((b) => b?.type === "text")
        .map((b) => b.text)
        .join("\n")
    : "";
const toolOut = (v) => ({
  content: [
    { type: "text", text: typeof v === "string" ? v : JSON.stringify(v) },
  ],
  ...(v && typeof v === "object" ? { structuredContent: v } : {}),
});
// "This app wants to … as you": one question at a time, in the app's own box (above the panel app, under an embed).
let appAskQ = Promise.resolve();
function appAsk(box, what, detail) {
  const run = () =>
    new Promise((res) => {
      if (!box?.isConnected) return res(false);
      box.hidden = false;
      box.innerHTML = `<span>${t("Este app quer {what}, como você:", { what: esc(what) })}</span><q></q><div><button type="button" class="primary">${t("Permitir")}</button><button type="button" class="ghost">${t("Cancelar")}</button></div>`;
      box.querySelector("q").textContent = String(detail).slice(0, 600);
      const done = (v) => {
        box.hidden = true;
        box.innerHTML = "";
        res(v);
      };
      box.querySelector(".primary").onclick = () => done(true);
      box.querySelector(".ghost").onclick = () => done(false);
    });
  return (appAskQ = appAskQ.then(run, run));
}
// vibebook's tools for room apps: what the page already has (S) and what the person can already do (WS), nothing more.
const VB_TOOLS = [
  { name: "vibebook_read", description: "The room: title, doc, epics with tasks, members and the newest messages of a thread (default main).", inputSchema: { type: "object", properties: { thread: { type: "string" }, limit: { type: "number" } } }, annotations: { readOnlyHint: true } },
  { name: "vibebook_post", description: "Post a message as the person looking at the app (they confirm first).", inputSchema: { type: "object", properties: { text: { type: "string" }, thread: { type: "string" } }, required: ["text"] } },
  { name: "vibebook_add_task", description: "Add a task to an epic (epic_id) or to the room (main); the person confirms.", inputSchema: { type: "object", properties: { title: { type: "string" }, epic_id: { type: "string" } }, required: ["title"] } },
  { name: "vibebook_task_status", description: "Move a task: todo | doing | review | done; the person confirms.", inputSchema: { type: "object", properties: { task_id: { type: "string" }, status: { type: "string", enum: ["todo", "doing", "review", "done"] } }, required: ["task_id", "status"] } },
  { name: "vibebook_connections", description: "The room's MCP connections this person can use, with their tools.", inputSchema: { type: "object" }, annotations: { readOnlyHint: true } },
  { name: "vibebook_call_connection", description: "Call a tool of one of the room's MCP connections; tools that aren't read-only ask the person first.", inputSchema: { type: "object", properties: { connection_id: { type: "string" }, tool: { type: "string" }, arguments: { type: "object" } }, required: ["connection_id", "tool"] } },
  { name: "vibebook_ai_spend", description: "vibebook's model spend: Jev and the LLMs by event and model, the hub router, the last 30 days and OpenRouter's total for the key. Only in vibebook's report rooms.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true } },
  { name: "vibebook_router_stats", description: "The person's hub router A/B (Jev vs Haiku): per arm how many messages were ignored, answered or woke their Claude, latency p50/p95, cost, and the last 40 decisions. room: true = only this room.", inputSchema: { type: "object", properties: { room: { type: "boolean" } } }, annotations: { readOnlyHint: true } },
];
function vbRead({ thread = "main", limit = 50 } = {}) {
  const msgs = allMsgs()
    .filter((m) => m.thread === thread)
    .slice(-Math.min(Math.max(Number(limit) || 50, 1), 100));
  return {
    room: { id: S.id, title: bookTitle() },
    me: { email: S.me, name: name(S.me) },
    members: (S.members || []).map((m) => ({
      email: m.email ?? m,
      name: name(m.email ?? m),
    })),
    doc: S.doc || "",
    epics: S.epics
      .filter((e) => !e.archived)
      .map((e) => ({
        id: e.id,
        title: e.title,
        tasks: e.tasks.map((x) => ({
          id: x.id,
          title: x.title,
          status: x.status,
          owner: x.owner || null,
        })),
      })),
    room_tasks: (S.roomTasks || []).map((x) => ({
      id: x.id,
      title: x.title,
      status: x.status,
    })),
    messages: msgs.map((m) => ({
      id: m.id,
      from: m.author === "ai" ? "@vibe" : name(m.author),
      agent: m.kind === "agent",
      text: m.text,
      at: new Date(m.ts).toISOString(),
    })),
  };
}
async function vbCall(name, a = {}, ask) {
  const ok = (v) => toolOut(v);
  const thread = (x) =>
    x && x !== "main" && !S.epics.some((e) => e.id === x) ? null : x || "main";
  switch (name) {
    case "vibebook_read": return ok(vbRead(a));
    case "vibebook_ai_spend": { const r = await fetch(`/api/metrics/ai-spend?room=${S.id}`).catch(() => null); return r && r.ok ? ok(await r.json()) : { isError: true, content: [{ type: "text", text: `spend unavailable${r ? ` (${r.status})` : ""}` }] }; }
    case "vibebook_router_stats": { const r = await fetch(`/api/router/stats${a.room ? `?room=${S.id}` : ""}`).catch(() => null); return r && r.ok ? ok(await r.json()) : { isError: true, content: [{ type: "text", text: `router stats unavailable${r ? ` (${r.status})` : ""}` }] }; }
    case "vibebook_connections": { if (!Array.isArray(conns)) await loadConns(); return ok((conns || []).map((c) => ({ id: c.id, title: c.title, scope: c.scope, tools: c.tools }))); }
    case "vibebook_post": {
      const th = thread(a.thread),
        text = String(a.text || "")
          .trim()
          .slice(0, 4000);
      if (!th || !text)
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "text and a valid thread (main or an epic id) needed",
            },
          ],
        };
      if (!(await ask(t("postar"), text)))
        return {
          isError: true,
          content: [{ type: "text", text: "the person cancelled" }],
        };
      send({ t: "msg", thread: th, text, files: [] });
      return ok("posted");
    }
    case "vibebook_add_task": {
      const ep =
        a.epic_id && a.epic_id !== "main"
          ? S.epics.find((e) => e.id === a.epic_id)
          : null;
      if (a.epic_id && a.epic_id !== "main" && !ep)
        return {
          isError: true,
          content: [{ type: "text", text: "no such epic" }],
        };
      const title = String(a.title || "")
        .trim()
        .slice(0, 200);
      if (
        !title ||
        !(await ask(
          t("criar uma tarefa"),
          `${ep ? ep.title : t("sala principal")}: ${title}`,
        ))
      )
        return {
          isError: true,
          content: [{ type: "text", text: "cancelled" }],
        };
      send({ t: "task.add", epic: ep ? ep.id : "main", title });
      return ok("added");
    }
    case "vibebook_task_status": {
      const task = [
        ...S.epics.flatMap((e) => e.tasks),
        ...(S.roomTasks || []),
      ].find((x) => x.id === a.task_id);
      if (!task || !["todo", "doing", "review", "done"].includes(a.status))
        return {
          isError: true,
          content: [{ type: "text", text: "no such task or bad status" }],
        };
      if (!(await ask(t("mover uma tarefa"), `${task.title} → ${a.status}`)))
        return {
          isError: true,
          content: [{ type: "text", text: "cancelled" }],
        };
      send({ t: "task.status", id: task.id, status: a.status });
      return ok("moved");
    }
    case "vibebook_call_connection": {
      if (!Array.isArray(conns)) await loadConns();
      const c = (conns || []).find((x) => x.id === a.connection_id),
        tl = c?.tools.find((x) => x.name === a.tool);
      if (!tl)
        return {
          isError: true,
          content: [
            { type: "text", text: "no such connection/tool for this person" },
          ],
        };
      // Always asked, read-only or not: readOnlyHint is the remote server's word, and an embed calling a connection of
      // yours could read your data through it and pass it on (security review, Nov 2026).
      if (
        !(await ask(
          t("usar {tool} em {conn}", { tool: tl.name, conn: c.title }),
          JSON.stringify(a.arguments || {}),
        ))
      )
        return {
          isError: true,
          content: [{ type: "text", text: "cancelled" }],
        };
      return (
        await api(`/api/books/${S.id}/connections/${c.id}/call`, {
          name: tl.name,
          arguments: a.arguments || {},
        })
      ).result;
    }
  }
  return {
    isError: true,
    content: [{ type: "text", text: `unknown tool ${name}` }],
  };
}
// One MCP Apps host for every app frame: the panel's app and each embed in the chat. hostFor(frame) keeps a host per
// iframe; one window listener finds the frame by e.source. tools/call: a remote app's own server (through the Worker),
// otherwise vibebook's tools (VB_TOOLS) as the person looking, writes behind appAsk. ui/message = post as you (asked).
const hosts = new WeakMap();
const nativeChatEmbeds = new Set();
function makeHost(frame, o) { // o: { ask (a box), call?(name, args) for a remote app, first?, tool?, base?, toolName?, embed? }
  const post = (m) => {if(!o.current||o.current())frame.contentWindow?.postMessage({ jsonrpc: "2.0", ...m }, "*");};
  const ask = async (what, detail) => {if(o.current&&!o.current())return false;const answer=await (o.askNative?o.askNative(what,detail):appAsk(o.ask(),what,detail));return answer&&(!o.current||o.current());};
  const call = (name, args) => (o.call ? o.call(name, args || {}) : vbCall(name, args || {}, ask));
  const dark = () => document.documentElement.dataset.theme === "dark" || (document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  return async (m) => {
    if(o.current&&!o.current())return;
    const ok = (result) => m.id !== undefined && post({ id: m.id, result });
    try {
      switch (m.method) {
        case "ui/initialize": {
          const r = frame.getBoundingClientRect();
          return ok({
            protocolVersion: "2026-01-26",
            hostInfo: { name: "vibebook", version: "1" },
            hostCapabilities: {
              openLinks: {},
              serverTools: {},
              logging: {},
              message: { text: {} },
              updateModelContext: { text: {}, structuredContent: {} },
            },
            hostContext: {
              ...(o.tool ? { toolInfo: { tool: o.tool } } : {}),
              theme: dark() ? "dark" : "light",
              displayMode: o.embed ? "inline" : "fullscreen",
              availableDisplayModes: [o.embed ? "inline" : "fullscreen"],
              containerDimensions: o.embed
                ? { maxHeight: 420, width: Math.round(r.width) }
                : { height: Math.round(r.height), width: Math.round(r.width) },
              locale: LOCALE,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              platform: ROOM_PHONE.matches ? "mobile" : "web",
              user: { email: S.me, name: name(S.me) },
              room: { id: S.id, title: bookTitle() },
            },
          });
        }
        case "ui/notifications/initialized":
          if (o.first) {
            post({
              method: "ui/notifications/tool-input",
              params: { arguments: {} },
            });
            post({
              method: "ui/notifications/tool-result",
              params: await o.first,
            });
          }
          return;
        case "ui/notifications/size-changed": {
          // embeds grow to fit, capped (420px or 55% of a phone): taller ones scroll inside, ⤢ opens them
          if (!o.embed || typeof m.params?.height !== "number") return;
          if(o.resize){o.resize(m.params.height);return;}
          const cap = Math.min(420, Math.round(innerHeight * 0.55)), h = Math.max(Math.ceil(m.params.height) + 2, 40);
          frame.style.height = `${Math.min(h, cap)}px`; frame.closest(".embedWrap")?.classList.toggle("clipped", h > cap);
          return;
        }
        case "tools/list":
          return ok({ tools: o.call ? [] : VB_TOOLS });
        case "tools/call":
          return ok(await call(m.params?.name, m.params?.arguments));
        case "ui/open-link": {
          // asked: a link is the one way out for an app with no network (it could carry what it read)
          const u = String(m.params?.url || "");
          if (!/^https?:\/\//i.test(u)) return ok({ isError: true });
          if (!(await ask(t("abrir um link"), u))) return ok({ isError: true });
          window.open(u, "_blank", "noopener");
          return ok({});
        }
        case "ui/message": {
          const text = textOf(m.params?.content).trim().slice(0, 4000);
          return ok(
            text
              ? await vbCall(
                  "vibebook_post",
                  { text, thread: o.thread ?? thread },
                  ask,
                )
              : {},
          );
        }
        case "ui/update-model-context": {
          const text =
            textOf(m.params?.content) ||
            (m.params?.structuredContent
              ? JSON.stringify(m.params.structuredContent)
              : "");
          if (text && o.base)
            api(`${o.base}/context`, {
              tool: o.toolName,
              text: text.slice(0, 4000),
            }).catch(() => {});
          return ok({});
        }
        case "ui/request-display-mode":
          return ok({ mode: o.embed ? "inline" : "fullscreen" });
        case "ping":
          return ok({});
        default:
          if (
            m.method.startsWith("notifications/") ||
            m.method.startsWith("ui/notifications/")
          )
            return; // logging…
          if (m.id !== undefined)
            post({
              id: m.id,
              error: {
                code: -32601,
                message: `vibebook doesn't support ${m.method} yet`,
              },
            });
      }
    } catch (x) {
      if (m.id !== undefined)
        post({
          id: m.id,
          error: { code: -32000, message: String(x.message || x) },
        });
    }
  };
}
// An embed's host: asks show under the embed, posts go to the embed's own thread.
function embedHost(fr) {
  if (!hosts.has(fr)) {
    const box = fr.closest(".embedBox"),
      at = thread; // an embed only shows in its own message's thread
    hosts.set(
      fr,
      makeHost(fr, {
        embed: true,
        thread: at,
        ask: () =>
          box.querySelector(".appAsk") ||
          box.appendChild(
            Object.assign(document.createElement("div"), {
              className: "appAsk",
              hidden: true,
            }),
          ),
      }),
    );
  }
  return hosts.get(fr);
}
addEventListener("message", (e) => {
  const d = e.data;
  if (!d || !S) return;
  // Every app frame is opaque (sandbox without same-origin): a frame that navigated itself to a real site keeps the
  // same WindowProxy, so e.source alone would let that site talk to the host.
  if (e.origin !== "null") return;
  const panel = document.querySelector(".connFrame");
  const fr = panel?.contentWindow === e.source ? panel : [...document.querySelectorAll("iframe.embed"),...nativeChatEmbeds].find((f) => f.isConnected && f.contentWindow === e.source);
  if (!fr) return;
  // Embeds saved before Nov 2026 carry the old bridge: { vbEmbed: 1, h } / { vbEmbed: 1, send }.
  if (d.vbEmbed === 1)
    return embedHost(fr)(
      typeof d.h === "number"
        ? { method: "ui/notifications/size-changed", params: { height: d.h } }
        : {
            method: "ui/message",
            params: { content: [{ type: "text", text: String(d.send || "") }] },
          },
    );
  if (d.jsonrpc === "2.0" && typeof d.method === "string")
    (hosts.get(fr) || embedHost(fr))(d);
});
async function mountApp(frame, c, a) {
  const room = c.id === "room",
    base = `/api/books/${S.id}/connections/${c.id}`;
  const ask = () => document.getElementById("appAsk");
  if (room) {
    hosts.set(
      frame,
      makeHost(frame, {
        ask,
        tool: { name: a.tool, title: a.title },
        first: Promise.resolve(toolOut(vbRead())),
      }),
    );
    frame.src = `/api/books/${S.id}/files/${a.file.id}`;
    return;
  }
  let ui;
  try {
    ui = await api(`${base}/ui?tool=${encodeURIComponent(a.tool)}`);
  } catch (e) {
    const d = document.createElement("div");
    d.className = "empty";
    d.textContent = e.message;
    frame.replaceWith(d);
    return;
  }
  const call = (name, args) =>
    api(`${base}/call`, { name, arguments: args }).then((r) => r.result);
  const first = call(a.tool, {}).catch((e) => ({
    isError: true,
    content: [{ type: "text", text: e.message }],
  }));
  hosts.set(
    frame,
    makeHost(frame, {
      ask,
      call,
      first,
      tool: ui.tool,
      base,
      toolName: a.tool,
    }),
  );
  frame.srcdoc = ui.html;
}

// Reminders: files reminders/<name>.md. @vibe reads when each runs; at that time it posts the text for whoever saved it,
// and their Claude acts on it. A file that doesn't say when shows its error here until someone fixes it.
function renderReminders() {
  const el = document.getElementById("remPane");
  if (!el || !S) return;
  renderPeek();
  const list=S.reminders || [], bad=list.filter(r=>r.error).length;
  document.getElementById("remCount").textContent=list.length ? ` ${list.length}${bad ? " ⚠" : ""}` : "";
  renderView("reminders",el,{room:S,thread,vb:panelBridge(),send,request});
}
function renderFiles(load = false, freshSnapshot = false) {
  const el=document.getElementById("filesPane"); if(!el || !S) return;
  renderPeek();
  const n=S.filesN ?? S.files?.length ?? 0;
  document.getElementById("fileCount").textContent=n ? ` ${n}` : "";
  if(nativeFilesSession?.roomId!==S.id){nativeFilesSession?.dispose();nativeFilesSession=createFilesSession(S.id);}
  const session=nativeFilesSession, roomId=S.id, connection=roomConnection;
  session.sync(S, freshSnapshot);
  const current=()=>nativeFilesSession===session&&S?.id===roomId&&roomConnection===connection&&currentRoomId()===roomId;
  const request=(command)=>current()&&connection?connection.request(command):Promise.resolve({ok:false,error:t("sem conexão")});
  if(load || (freshSnapshot && el.parentElement?.dataset.pane === "files"))void session.load(request);
  renderView("files",el,{room:S,thread,vb:panelBridge(),send,session,request,onfolderchange:()=>{if(current())el.scrollTop=0;},onopenfile:(file)=>{if(current())openViewer(`/api/books/${roomId}/files/${encodeURIComponent(file.id)}`,file.type.startsWith("image/")?"img":"frame",file.name);}});
}
// 📌 on a file tile or app card: pins it to the sidebar (or unpins).
const pinOf = (kind, ref) =>
  (S.pins || []).find((p) => p.kind === kind && p.ref === ref);
const pinToggle = (kind, ref) => {
  const on = !!pinOf(kind, ref);
  return `<button type="button" class="ghost pinBtn${on ? " on" : ""}" data-pin-kind="${kind}" data-pin-ref="${esc(ref)}" title="${on ? t("Desafixar") : t("Fixar na lateral")}" aria-label="${on ? t("Desafixar") : t("Fixar na lateral")}" aria-pressed="${on}">${icon("pin", 14)}</button>`;
};
function wirePinToggles(el) {
  el.querySelectorAll("[data-pin-kind]").forEach(
    (b) =>
      (b.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const p = pinOf(b.dataset.pinKind, b.dataset.pinRef);
        send(
          p
            ? { t: "pin.del", id: p.id }
            : { t: "pin.add", kind: b.dataset.pinKind, ref: b.dataset.pinRef },
        );
      }),
  );
}

// Sliding window: a thread renders its newest WIN messages; scrolling near the top shows WIN more, first from
// what the state already has, then from the room (WS "older", 100 at a time) until the start of the thread.
const WIN = 60;
let win = { thread: null, n: WIN },
  olderDone = {},
  olderBusy = false;
// Threads whose first page is on its way: the room's state carries 60 messages of the thread it opened on and 5 of
// every other one (Book.roomWindow), so opening another fetches its newest 100 right away and lands at the bottom.
const fillOf = new Set();
const allMsgs = () =>
  S.origins?.length
    ? [
        ...S.messages,
        ...S.origins.filter((o) => !S.messages.some((m) => m.id === o.id)),
      ]
    : S.messages;
// The open thread lives in the URL (/b/<room>?t=<epic>): refresh, back and shared links land on it.
let urlSynced = false;
function syncUrl() {
  if (!S) return;
  const want = uiNavigationUrl(
    `/b/${S.id}${thread !== "main" && !isPre() ? `?t=${encodeURIComponent(thread)}` : ""}`,
    location.href,
    "svelte",
  );
  if (location.pathname + location.search !== want)
    navigation[urlSynced ? "pushState" : "replaceState"](null, "", want);
  urlSynced = true;
}
// Inside an epic: what it produced (reports, prints, PDFs), newest version of each name, so a report is one tap away
// instead of a scroll through the conversation. Built from the thread's loaded messages.
function renderThreadFiles() {
  const el = document.getElementById("thFiles");
  if (!el) return;
  const by = new Map();
  if (thread !== "main" && !isPre())
    for (const m of allMsgs())
      if (m.thread === thread)
        for (const f of m.files || []) {
          const o = by.get(f.name);
          if (!o) by.set(f.name, { f, ts: m.ts, n: 1 });
          else {
            o.n++;
            if (m.ts > o.ts) {
              o.f = f;
              o.ts = m.ts;
            }
          }
        }
  const list = [...by.values()].sort((a, b) => b.ts - a.ts).slice(0, 8);
  el.hidden = !list.length;
  el.innerHTML = list.length
    ? `<span class="thfL">${icon("paperclip", 14)} ${t("Arquivos deste épico")}</span>${list.map(({ f, n }) => `<a href="${fileUrl(f)}" target="_blank" rel="noopener" ${viewAttrs(f)} title="${esc(f.name)}">${fileIcon(f, 14)}<span>${esc(f.name)}</span>${n > 1 ? `<small>v${n}</small>` : ""}</a>`).join("")}`
    : "";
}
function renderChat(keep) {
  renderAskBar();
  renderThreadFiles();
  syncUrl();
  renderReply();
  renderTasks();
  const el = document.getElementById("msgs");
  $app.querySelector(".book")?.classList.toggle("pre", isPre());
  if (isPre()) {
    disposeView("chat");
    return renderPre(el);
  }
  // Opening an epic with no conversation yet: show its doc (goal + tasks) instead of an empty panel, if it was closed.
  if (win.thread !== thread || win.room !== S.id) {
    const bk = $app.querySelector(".book");
    const taskWaits =
      waitsIn(thread).some((w) => w.ref.startsWith("t")) ||
      !!S.epics
        .find((e) => e.id === thread)
        ?.tasks.some((t) => !t.done && t.owner === S.me);
    if (
      thread !== "main" &&
      bk?.classList.contains("nodoc") &&
      !bk.classList.contains("boardview") &&
      (taskWaits || !S.messages.some((m) => m.thread === thread))
    )
      bk.classList.remove("nodoc");
    // Point at what's yours here: what's waiting on you (tasks, messages), else your own open tasks. Bring the first
    // into view and let them shine (a sweep of light over the item itself, nothing clipped).
    const attentionRoom=S.id, attentionThread=thread;
    if (thread !== "main" || waitsIn(thread).length) setTimeout(() => {
      if(S?.id!==attentionRoom||thread!==attentionThread)return;
      let els = [...document.querySelectorAll(".task.waitTask")];
      if (!els.length) els = [...document.querySelectorAll(".task.mine")];
      // Only a task is scrolled to (it lives in the doc panel). A waiting message just shines where it is: jumping the
      // chat up to it on entering looked like the room scrolled to a random old message.
      if (els[0]?.classList.contains("task")) els[0].scrollIntoView({ block: "center", behavior: "smooth" });
      els.forEach((x) => { x.classList.remove("shimmer"); void x.offsetWidth; x.classList.add("shimmer"); });
    }, 400);
  }
  if (win.thread !== thread || win.room !== S.id)
    win = { thread, room: S.id, n: WIN };
  const all = S.messages.filter(
    (m) =>
      m.thread === thread &&
      !isPermAnswer(m) &&
      !othersAsk(m) &&
      !othersAsk(S.messages.find((x) => x.id === m.reply_to)),
  );
  if (
    liveState &&
    all.length < WIN &&
    !olderBusy &&
    !S.complete &&
    !S.full?.includes(thread) &&
    !olderDone[S.id + thread] &&
    !fillOf.has(S.id + thread)
  ) {
    fillOf.add(S.id + thread);
    olderBusy = true;
    send({ t: "older", thread, before: all[0]?.id ?? 0 });
  }
  const list = all.slice(-win.n);
  const more = all.length > list.length || (all.length && !S.complete && !S.full?.includes(thread) && !olderDone[S.id + thread]);
  const h0 = el.scrollHeight, t0 = el.scrollTop;
  const src=S.epics.find(e=>e.id===thread)?.from_msg;
  const origin=src && (S.messages.find(m=>m.id===src)||S.origins?.find(m=>m.id===src));
  const replyCount=S.counts ? (S.counts[thread]??0)+all.filter(m=>m.id>(S.countsAt??0)).length : all.length;
  const roomId=S.id, chatThread=thread;
  let chatMount;
  const current=()=>S?.id===roomId&&thread===chatThread&&el.isConnected&&viewMounts.get("chat")===chatMount;
  renderView("chat",el,{room:S,thread,list,previous:all[all.length-list.length-1],more,origin:origin||null,replyCount,vb:chatBridge(),legacy:{threadCards:(id)=>adaptLegacyChatMarkup(threadCards(id))},actions:{request:(command)=>current()?request(command):Promise.resolve({ok:false,error:"disconnected"}),draftReply:(draft)=>{if(!current())return;const q=allMsgs().find(m=>m.id===draft.messageId);if(!q||q.thread!==draft.thread||!canAnswer(S,q)||!choicesOf(q.choices)||choicesOf(q.choices).closed||isPermAsk(q))return;if(q.thread!==thread)selectThread(q.thread);if(S?.id!==roomId)return;replyTo=q;renderReply();const box=document.getElementById("input");if(box){box.value=draft.text;box.dispatchEvent(new Event("input",{bubbles:true}));box.focus();}},openApp:(target)=>{if(current()&&/^(room|[a-f0-9]{12})$/.test(target.connection)&&/^[\w.-]{1,100}$/.test(target.tool))cardGo(`#app:${target.connection}/${target.tool}`);},navigateRich:(target)=>{if(current())cardGo(target.kind==="thread"?`#e${target.id}`:target.id?`#doc:${target.id}`:"#doc");},openFileReference:(file)=>{if(current()&&file.roomId===roomId&&/^[0-9a-f]+$/.test(file.id))openViewer(`/api/books/${roomId}/files/${file.id}`,file.type?.startsWith("image/")?"img":"frame",file.name);},mountEmbed:(frame,file,controls)=>{nativeChatEmbeds.add(frame);hosts.set(frame,makeHost(frame,{embed:true,thread:controls.thread,current:()=>current()&&frame.isConnected,askNative:controls.ask,resize:controls.resize}));return ()=>{nativeChatEmbeds.delete(frame);hosts.delete(frame);};},reply:(id)=>{if(current())startReply(id);},navigate:(id,target)=>{if(current())goToMsg(id,target);},openFile:(file)=>{const canonical=[...(S?.files||[]),...(S?allMsgs().flatMap(m=>m.files||[]):[])].some(f=>f.id===file.id&&f.name===file.name&&f.type===file.type&&f.size===file.size&&f.ts===file.ts&&f.author===file.author);if(current()&&canonical)openViewer(`/api/books/${roomId}/files/${encodeURIComponent(file.id)}`,file.type.startsWith("image/")?"img":"frame",file.name);}},onloadolder:()=>{if(current())loadOlder();}});
  chatMount=viewMounts.get("chat");
  // A finished epic says so at the bottom; writing there reopens it (the room does it, see reopenIfArchived).
  if (keep === "stay") { el.scrollTop = t0; pinOnLoad(el); } // a state refresh while reading above
  else if (keep) { el.scrollTop = t0 + el.scrollHeight - h0; pinOnLoad(el); }
  else { scrollDown(true); pinOnLoad(el); }
}
function pullOlder() {
  const all = S.messages.filter((m) => m.thread === thread);
  olderBusy = true;
  send({ t: "older", thread, before: all[0]?.id ?? 0 });
}
function loadOlder() {
  if (olderBusy || isPre()) return;
  const all = S.messages.filter((m) => m.thread === thread);
  if (all.length > win.n) {
    win.n += WIN;
    return renderChat(true);
  }
  if (
    S.complete ||
    S.full?.includes(thread) ||
    olderDone[S.id + thread] ||
    !all.length
  )
    return;
  olderBusy = true;
  send({ t: "older", thread, before: all[0].id });
}
// Model labels are still shared by legacy agent/account surfaces; native chat owns its status model.
// Model ids read the same everywhere (prettyModel).
const prettyModel = (s) => String(s ?? "").replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (_, f, a, b) => `Claude ${f[0].toUpperCase()}${f.slice(1)} ${a}.${b}`);
function appendMsg(m) {
  renderChat(
    stick || (m.author === S.me && m.kind !== "agent") ? undefined : "stay",
  );
}
// Images change height after they load; keep pinned to the bottom when we were there.
let stick = true; // was the reader at the bottom of the chat?
// Messages grow after render (images, fonts, polls); stay pinned to the bottom if the reader was there.
const pinRO = new ResizeObserver(() => {
  const el = document.getElementById("msgs");
  if (el && stick) el.scrollTop = el.scrollHeight;
});
function pinOnLoad(root) {
  if (!root) return;
  (root.hasAttribute?.("data-chat-message") ? [root] : root.querySelectorAll("[data-chat-message]")).forEach((m) => pinRO.observe(m));
}
function scrollDown(force) {
  const el = document.getElementById("msgs");
  if (!el) return;
  // Only an upward scroll unpins; content growing below must not.
  el.onscroll ??= () => {
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (near) stick = true;
    else if (el.scrollTop < (el._lastTop ?? 0) - 2) stick = false;
    el._lastTop = el.scrollTop;
    if (el.scrollTop < 150 && !stick) loadOlder();
  };
  pinRO.observe(el); // the chat itself shrinks too (connect card, keyboard, composer growing): stay at the bottom
  // Rows that aren't messages (receipts, acks, the end mark, "working") land after the scroll too: watch every child,
  // and pin when one is added (opening a room stopped ~150px short of the bottom).
  el._mo ??= new MutationObserver((muts) => {
    for (const m of muts)
      m.addedNodes.forEach((n) => n.nodeType === 1 && pinRO.observe(n));
    if (stick) el.scrollTop = el.scrollHeight;
  });
  el._mo.observe(el, { childList: true });
  for (const c of el.children) pinRO.observe(c);
  if (force) stick = true;
  if (force || el.scrollHeight - el.scrollTop - el.clientHeight < 200)
    el.scrollTop = el.scrollHeight;
}
// Mermaid via pele (obsidianmd/pele), loaded only when the doc has a ```mermaid block.
const PELE = "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js";
let peleP;
const loadPele = () =>
  (peleP ??= new Promise((ok, no) => {
    const s = Object.assign(document.createElement("script"), {
      src: PELE,
      crossOrigin: "anonymous",
      integrity:
        "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA",
    });
    s.onload = () => ok(window.pele);
    s.onerror = () => {
      peleP = null;
      no();
    };
    document.head.append(s);
  }));
async function renderMermaid(pv) {
  const blocks = [...pv.querySelectorAll("pre > code.language-mermaid")];
  if (!blocks.length) return;
  const pele = await loadPele().catch(() => null);
  if (!pele) return;
  blocks.forEach((code, i) => {
    const fig = document.createElement("figure");
    fig.className = "mmd";
    try {
      const { svg } = pele.render(code.textContent, {
        idPrefix: `mmd${i}-`,
        fontFamily: '"Schibsted Grotesk", sans-serif',
        fontSize: 14,
        maxWidth: pv.clientWidth - 90,
        links: false,
        images: false,
      });
      // Doc is untrusted (people + AI): sanitize the SVG too.
      fig.innerHTML = DOMPurify.sanitize(svg, {
        USE_PROFILES: { svg: true, svgFilters: true },
      });
    } catch (e) {
      fig.classList.add("err");
      fig.textContent = `${t("Diagrama com erro")}${e.line ? ` ${t("na linha {n}", { n: e.line })}` : ""}: ${e.message}`;
    }
    code.parentElement.replaceWith(fig);
  });
}
// The epic's tasks live inside its doc, as a live section: where the doc has a "[[tarefas]]" line, else right
// after the first paragraph. The #tasks node is moved, not rebuilt, so renderTasks keeps owning its content.
function placeTasks(pv, ep) {
  const tk = document.getElementById("tasks");
  if (!tk) return;
  const home = document.getElementById("tasksHome");
  if (!ep) {
    home.append(tk);
    return;
  }
  // The doc's "## Tarefas" checklist (kept in sync with the tasks by the server) shows as the live card.
  const h = [...pv.querySelectorAll("h2")].find(
    (x) => x.textContent.trim().toLowerCase() === "tarefas",
  );
  if (h) {
    const ul =
      h.nextElementSibling?.tagName === "UL" ? h.nextElementSibling : null;
    ul?.remove();
    return h.replaceWith(tk);
  }
  const mark = [...pv.querySelectorAll("p")].find(
    (p) => p.textContent.trim().toLowerCase() === "[[tarefas]]",
  );
  if (mark) return mark.replaceWith(tk);
  const first = [...pv.children].find((x) => x.tagName === "P");
  first ? first.after(tk) : pv.prepend(tk);
}
// The doc panel follows the open epic (its own doc, a child of the room's); "Sala" in the crumb shows the room's.
let docRoom = false,
  docShown = null;
// Epic docs come one at a time: the room's state carries only the open epic's (Book.epicDocs), the rest on "doc.get".
const docAsked = new Set();
const docEpic = () =>
  !docRoom && !isPre() && S.epics.some((e) => e.id === thread) ? thread : null;
function renderDoc(force) {
  const doc = document.getElementById("doc");
  if (!doc) return;
  S.docs ??= {};
  // Older epics without a doc open with the same start new ones get (epicDocSeed in src/book.ts).
  const ep = docEpic(),
    epic = ep && S.epics.find((e) => e.id === ep);
  if (ep && !(ep in S.docs) && !docAsked.has(S.id + ep)) {
    docAsked.add(S.id + ep);
    send({ t: "doc.get", epic: ep });
  }
  const text = ep
    ? S.docs[ep] ||
      `# ${epic.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n`
    : S.doc;
  if (docShown !== (ep || "room")) {
    force = true;
    docShown = ep || "room";
  }
  ensureCollab();
  const inEpic = !isPre() && S.epics.find((e) => e.id === thread);
  const crumb = document.getElementById("docCrumb");
  crumb.hidden = !inEpic;
  if (inEpic) {
    crumb.innerHTML = `<button type="button" class="${ep ? "" : "sel"}" data-docroom="1">${esc(bookTitle())}</button><span>›</span><button type="button" class="${ep ? "sel" : ""}" data-docroom="">${esc(inEpic.title)}</button>`;
    crumb.querySelectorAll("button").forEach(
      (b) =>
        (b.onclick = () => {
          docRoom = !!b.dataset.docroom;
          renderDoc(true);
        }),
    );
  }
  // Doc is written by people and the AI: render markdown, then sanitize.
  const pv = document.getElementById("preview");
  const tk = document.getElementById("tasks");
  if (tk) document.getElementById("tasksHome").append(tk); // keep it out of the innerHTML wipe
  pv.innerHTML = text.trim()
    ? DOMPurify.sanitize(marked.parse(text, { breaks: true, gfm: true }), {
        ...MD_PURIFY,
        FORBID_TAGS: MD_PURIFY.FORBID_TAGS.filter((x) => x !== "img"),
        ADD_ATTR: ["target"],
      }) // the doc keeps images (screenshots of the room's files)
    : `<div class="empty">${t("Documento vazio. Clique em <b>Editar</b> ou peça pro seu agent resumir as decisões aqui.")}</div>`;
  pv.querySelectorAll("a").forEach((a) => {
    a.target = "_blank";
    a.rel = "noopener noreferrer nofollow ugc";
  });
  // @vibe's grade of the room doc (Jev): what the scope still misses. Only on the room's doc, not an epic's.
  if (!ep && S.docNotes?.length)
    pv.insertAdjacentHTML(
      "afterbegin",
      `<div class="docNotes" title="${t("@vibe avaliou este doc. O agent de cada um também recebe isso (doc_notes).")}">${S.docNotes.map((n) => `<span class="vnote">${icon("alert", 12)} ${esc(n)}</span>`).join("")}</div>`,
    );
  renderMermaid(pv);
  placeTasks(
    pv,
    ep || (thread === "main" && S.roomTasks?.length ? "main" : null),
  );
  renderPeek();
  // ponytail: last-writer-wins doc; don't clobber while someone is typing. CRDT (Yjs) if real co-editing matters.
  if (force || document.activeElement !== doc) doc.value = text;
}

// Face ID lock (this device): a passkey of the device's own authenticator (user verification required, so Face ID /
// Touch ID / the device code) gates opening the app and coming back after 5 min away. A local lock like a bank app's,
// not a login: the server isn't involved and the session works as before. Credential id in localStorage (vb.lock).
const LOCK_AFTER = 5 * 60e3;
function lockId() {
  try {
    return localStorage.getItem("vb.lock");
  } catch {
    return null;
  }
}
const rnd = (n) => crypto.getRandomValues(new Uint8Array(n));
const lockVerify = () =>
  navigator.credentials.get({
    publicKey: {
      challenge: rnd(32),
      allowCredentials: [
        {
          type: "public-key",
          id: Uint8Array.from(atob(lockId()), (c) => c.charCodeAt(0)),
        },
      ],
      userVerification: "required",
      hints: ["client-device"],
      timeout: 60e3,
    },
  });
async function lockSet(on, email) {
  if (!on) {
    localStorage.removeItem("vb.lock");
    return;
  } // you're already in (unlocked): no second check
  const c = await navigator.credentials.create({
    publicKey: {
      challenge: rnd(32),
      rp: { name: "vibebook" },
      user: {
        id: rnd(16),
        name: email,
        displayName: t("vibebook (trava do app)"),
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      // Discoverable (resident) so iOS lists it by itself, from iCloud or 1Password; a non-discoverable one in 1Password
      // didn't show up ("não há chaves-senha salvas para este site") until picked by hand.
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "required",
        requireResidentKey: true,
      },
      hints: ["client-device"],
      timeout: 60e3,
    },
  });
  localStorage.setItem(
    "vb.lock",
    btoa(String.fromCharCode(...new Uint8Array(c.rawId))),
  );
}
function lockScreen() {
  if (!lockId() || document.getElementById("lockScreen")) return;
  const el = document.createElement("div");
  el.id = "lockScreen";
  el.innerHTML = `<img src="/favicon.svg" alt="" width="64" height="64" /><b>vibebook</b><button class="primary">${t("Desbloquear com Face ID")}</button><p class="err" hidden></p>`;
  document.body.append(el);
  const go = async () => {
    try {
      await lockVerify();
      el.remove();
    } catch {
      const e = el.querySelector(".err");
      e.hidden = false;
      e.textContent = t("Toque pra tentar de novo.");
    }
  };
  // No automatic attempt: iOS wants the tap, and an untapped call surfaced "não é possível usar a chave de acesso".
  el.querySelector("button").onclick = go;
}
let hiddenAt = 0;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) hiddenAt = Date.now();
  else if (hiddenAt && Date.now() - hiddenAt > LOCK_AFTER) lockScreen();
});
lockScreen();
route();

if (import.meta.hot)
  import.meta.hot.dispose(() => {
    clearTimeout(agentsRefreshTimer);
    homeSettingsCleanup();
    nativeRouter?.dispose();
    roomConnection?.dispose();
    roomConnection = null;
    clearViews();
    nativeAppNav?.dispose();
    nativePersonalConnection?.dispose();
    nativeRooms?.dispose();
    nativePersonal?.dispose();
    nativeNavMount?.destroy();
  });
