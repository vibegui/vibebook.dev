const pt = {
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
  githubError:
    "Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.",
  missing: "Sala não encontrada",
  missingBody: "O link pode estar errado, ou a sala não existe mais.",
  open: "Abrir o vibebook",
  access: "Peça permissão para entrar no vibebook",
  closed:
    "Esta sala é fechada. Entre com seu email e peça acesso: quem está nela libera.",
  signinAsk: "Entrar e pedir acesso",
  signed: "Você entrou como {email}. Quem está na sala vê seu pedido e libera.",
  ask: "Pedir acesso",
  asked: "Pedido enviado.",
  askedBody:
    "Quando liberarem, você recebe um email com o link, e esta página abre a sala.",
  agent:
    "AI agent reading this? Read {origin}/llms.txt and follow it to set up vibebook, then join this room: {url}",
  connect: "Conectar {name} ao vibebook",
  as: "Conectado como {email}. Ele vai poder:",
  rooms: "Ver as salas em que você está, e só elas",
  read: "Ler as mensagens, o doc e as tarefas",
  post: "Postar nas salas em seu nome, marcado como “agent de você”",
  cant: "Ele não vê sua caixa de email, não convida ninguém sem você pedir e você desconecta quando quiser em vibebook.dev/app.",
  publisher: "Publicado por {domain}.",
  unverified: "Esse app se registrou sozinho: o nome não é verificado.",
  goes: "O acesso vai para {host}.",
  local:
    "Isso manda o acesso para um app no seu computador. Continue só se você acabou de pedir pra conectar.",
  scope: "Permissões solicitadas",
  allow: "Permitir",
  cancel: "Cancelar",
  other: "Não é você? Entrar com outro email",
  return: "Voltar ao aplicativo",
  consentError: "Não foi possível conectar este aplicativo.",
  configError:
    "Esta página não tem uma configuração válida. Recarregue ou tente abrir o link de novo.",
} as const;
const en: Record<keyof typeof pt, string> = {
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
  githubError:
    "GitHub sign-in didn't work (a verified primary email is required). Try email.",
  missing: "Room not found",
  missingBody: "The link may be wrong, or the room no longer exists.",
  open: "Open vibebook",
  access: "Ask to join this vibebook",
  closed:
    "This room is closed. Sign in with your email and ask to join: someone in it lets you in.",
  signinAsk: "Sign in and ask to join",
  signed:
    "You're signed in as {email}. People in the room see your request and let you in.",
  ask: "Ask to join",
  asked: "Request sent.",
  askedBody:
    "When they let you in, you get an email with the link, and this page opens the room.",
  agent:
    "AI agent reading this? Read {origin}/llms.txt and follow it to set up vibebook, then join this room: {url}",
  connect: "Connect {name} to vibebook",
  as: "Signed in as {email}. It will be able to:",
  rooms: "See the rooms you're in, and only those",
  read: "Read messages, the doc and tasks",
  post: "Post in rooms for you, labeled as “your agent”",
  cant: "It can't see your email inbox, won't invite anyone unless you ask, and you can disconnect it anytime at vibebook.dev/app.",
  publisher: "Published by {domain}.",
  unverified: "This app registered itself; its name is not verified.",
  goes: "Access goes to {host}.",
  local:
    "This sends access to an app on your computer. Continue only if you just asked to connect.",
  scope: "Requested permissions",
  allow: "Allow",
  cancel: "Cancel",
  other: "Not you? Sign in with another email",
  return: "Return to the app",
  consentError: "Couldn't connect this app.",
  configError:
    "This page has an invalid configuration. Reload or open the link again.",
};
export type AuthLanguage = "en" | "pt";
export function authText(
  lang: AuthLanguage,
  key: keyof typeof pt,
  vars: Record<string, string> = {},
) {
  return (lang === "en" ? en[key] : pt[key]).replace(
    /\{(\w+)\}/g,
    (_, name: string) => vars[name] ?? "",
  );
}
export function authIssue(lang: AuthLanguage, error: string) {
  const keys = {
    timeout: "timeout",
    network: "network",
    "invalid-email": "invalidEmail",
    "invalid-code": "invalidCode",
    google: "googleError",
    github: "githubError",
  } as const;
  return Object.hasOwn(keys, error)
    ? authText(lang, keys[error as keyof typeof keys])
    : error;
}
