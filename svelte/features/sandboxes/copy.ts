export type SandboxLocale = "pt" | "en";
const pt = {
  unnamed: "Sem nome",
  costUnknown: "Estimativa indisponível",
  running: "rodando",
  stopped: "parado",
  paused: "pausado",
  starting: "ligando",
  pausing: "pausando",
  deleted: "apagado no Freestyle",
  unknown: "estado desconhecido",
  creating: "criando",
  error: "erro",
  title: "Sandboxes",
  description: "Seu Claude rodando na nuvem, com uma máquina por sala.",
  key: "Chave do Freestyle",
  token: "Token do Claude",
  connected: "conectado",
  missing: "não configurado",
  save: "Salvar",
  remove: "Remover",
  create: "Criar sandbox",
  name: "Nome (opcional)",
  pause: "Pausar",
  start: "Ligar",
  setup: "Rodar setup",
  terminal: "Terminal",
  log: "Ver log",
  cancel: "Cancelar",
  close: "Fechar",
  refresh: "Atualizar",
  loading: "carregando…",
  empty: "Nenhum sandbox nesta sala.",
  readFailed: "Não deu para carregar seus sandboxes.",
  failed: "Não foi possível concluir. Confira os dados e tente novamente.",
  unconfirmed:
    "Ainda sem confirmação. Confira o estado atual antes de tentar novamente.",
  reviewed: "Conferi o estado atual",
  pending: "Aguardando confirmação…",
  setupPending: "Preparando a máquina. Isso pode levar alguns minutos.",
  removeTitle: "Remover sandbox?",
  removeBody:
    "A máquina e seus arquivos serão apagados. Esta ação não pode ser desfeita.",
  credentialRemoveTitle: "Remover credencial?",
  credentialRemoveBody:
    "Esta credencial deixará de estar disponível para seus sandboxes.",
  removeKeyBody:
    "Os sandboxes continuam no Freestyle, mas o vibebook não poderá ligar, pausar ou abrir o terminal sem a chave.",
  removeTokenBody:
    "Sandboxes que já têm o token continuam logados até você apagá-los.",
  costHelp:
    "Um agent na nuvem para esta sala, configurado por agents/<nome>.md nos arquivos. Rodando custa cerca de US$0,13/hora na sua conta; pausado, só o disco.",
  secretHelp:
    "A credencial é enviada apenas para a configuração da sua conta e não é exibida novamente.",
  keyHelp: "Crie sua chave na API do Freestyle.",
  tokenHelp: "Gere um token com claude setup-token e cole aqui.",
  saved: "Credencial salva.",
  removed: "Credencial removida.",
  uncertainCreate:
    "Há novas máquinas na lista. Confira se sua solicitação foi aplicada antes de criar outra.",
  terminalLoading: "Abrindo terminal…",
  terminalConnecting: "Conectando…",
  terminalConnected: "conectado",
  terminalDisconnected:
    "Conexão encerrada. Feche e abra o terminal para conectar novamente.",
  terminalExited: "O comando terminou.",
  terminalFailed:
    "Não foi possível abrir o terminal. Confira a máquina antes de tentar novamente.",
  terminalHelp:
    "Terminal interativo da sua máquina. As teclas abaixo também funcionam no celular.",
  logsEmpty: "Nenhum log disponível.",
  createLimit: "Até 3 sandboxes por pessoa nesta sala.",
  keyRequired: "Configure a chave do Freestyle para criar uma máquina.",
  copy: "Copiar",
  copyFailed: "Não deu para copiar. Selecione e copie o texto.",
  copied: "Copiado",
} as const;
export type SandboxCopyKey = keyof typeof pt;
const en: Record<SandboxCopyKey, string> = {
  unnamed: "Unnamed",
  costUnknown: "Estimate unavailable",
  running: "running",
  stopped: "stopped",
  paused: "paused",
  starting: "starting",
  pausing: "pausing",
  deleted: "deleted in Freestyle",
  unknown: "unknown state",
  creating: "creating",
  error: "error",
  title: "Sandboxes",
  description:
    "Your Claude running in the cloud, with a machine for each room.",
  key: "Freestyle key",
  token: "Claude token",
  connected: "connected",
  missing: "not configured",
  save: "Save",
  remove: "Remove",
  create: "Create sandbox",
  name: "Name (optional)",
  pause: "Pause",
  start: "Start",
  setup: "Run setup",
  terminal: "Terminal",
  log: "View log",
  cancel: "Cancel",
  close: "Close",
  refresh: "Refresh",
  loading: "loading…",
  empty: "No sandboxes in this room.",
  readFailed: "Could not load your sandboxes.",
  failed: "Could not complete the action. Check the details and try again.",
  unconfirmed:
    "Not confirmed yet. Review the current state before trying again.",
  reviewed: "I reviewed the current state",
  pending: "Waiting for confirmation…",
  setupPending: "Preparing the machine. This can take a few minutes.",
  removeTitle: "Remove sandbox?",
  removeBody:
    "The machine and its files will be deleted. This cannot be undone.",
  credentialRemoveTitle: "Remove credential?",
  credentialRemoveBody:
    "This credential will no longer be available to your sandboxes.",
  removeKeyBody:
    "The sandboxes remain in Freestyle, but Vibebook cannot start, pause or open their terminal without the key.",
  removeTokenBody:
    "Sandboxes that already have the token remain logged in until you delete them.",
  costHelp:
    "A cloud agent for this room, configured by agents/<name>.md in Files. Running costs about US$0.13/hour on your account; paused machines only cost disk storage.",
  secretHelp:
    "The credential is sent only to your account configuration and is never displayed again.",
  keyHelp: "Create your key in the Freestyle API.",
  tokenHelp: "Generate a token with claude setup-token and paste it here.",
  saved: "Credential saved.",
  removed: "Credential removed.",
  uncertainCreate:
    "New machines appeared in the list. Check whether your request was applied before creating another.",
  terminalLoading: "Opening terminal…",
  terminalConnecting: "Connecting…",
  terminalConnected: "connected",
  terminalDisconnected:
    "Connection closed. Close and reopen the terminal to connect again.",
  terminalExited: "The command finished.",
  terminalFailed:
    "Could not open the terminal. Check the machine before trying again.",
  terminalHelp:
    "Interactive terminal for your machine. The keys below also work on mobile.",
  logsEmpty: "No log available.",
  createLimit: "Up to 3 sandboxes per person in this room.",
  keyRequired: "Configure the Freestyle key to create a machine.",
  copy: "Copy",
  copyFailed: "Could not copy. Select and copy the text.",
  copied: "Copied",
};
export const sandboxText = (lang: SandboxLocale, key: SandboxCopyKey): string =>
  (lang === "en" ? en : pt)[key];
const known = new Set<string>([
  "running",
  "stopped",
  "paused",
  "starting",
  "pausing",
  "deleted",
  "unknown",
  "creating",
  "error",
]);
export function sandboxStateText(
  state: string | null | undefined,
  lang: SandboxLocale,
): string {
  if (state && known.has(state))
    return sandboxText(
      lang,
      state as
        | "running"
        | "stopped"
        | "paused"
        | "starting"
        | "pausing"
        | "deleted"
        | "unknown"
        | "creating"
        | "error",
    );
  return state
    ? `${sandboxText(lang, "unknown")} (${state})`
    : sandboxText(lang, "unknown");
}
