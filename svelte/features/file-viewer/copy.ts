export function viewerText(lang: "pt" | "en", key: keyof typeof en) {
  return lang === "en" ? en[key] : pt[key];
}
const en = {
  previous: "Previous rows",
  next: "Next rows",
  rows: "Rows",
  closing:
    "The browser has not confirmed closing this file. Navigation is waiting. Reload this page to recover.",
  reload: "Reload page",
  close: "Close file",
  loading: "Loading file…",
  retry: "Retry",
  external: "Open in a new tab",
  download: "Download / open file",
  version: "File version",
  history: "Loading version history…",
  historyError: "Version history is unconfirmed.",
  retryHistory: "Retry version history",
  truncated: "Preview shortened. Open the original file to read the rest.",
  unavailable: "This preview is unavailable.",
  missing: "This file is no longer available.",
  changed: "File metadata changed. Reopen the file from its current entry.",
  denied: "You need room access to open this file.",
  access: "Review file access",
  timeout: "The file did not finish loading. Retry when connected.",
  pin: "Pin this version",
  unpin: "Unpin this version",
  pinError:
    "The pin change is unconfirmed. Review the current pin before retrying.",
};
const pt: typeof en = {
  previous: "Linhas anteriores",
  next: "Próximas linhas",
  rows: "Linhas",
  closing:
    "O navegador não confirmou o fechamento deste arquivo. A navegação está aguardando. Recarregue a página para recuperar.",
  reload: "Recarregar página",
  close: "Fechar arquivo",
  loading: "Carregando arquivo…",
  retry: "Tentar de novo",
  external: "Abrir em outra aba",
  download: "Baixar / abrir arquivo",
  version: "Versão do arquivo",
  history: "Carregando histórico de versões…",
  historyError: "O histórico de versões não foi confirmado.",
  retryHistory: "Tentar carregar o histórico",
  truncated: "Prévia reduzida. Abra o arquivo original para ler o restante.",
  unavailable: "Esta prévia não está disponível.",
  missing: "Este arquivo não está mais disponível.",
  changed: "Os dados do arquivo mudaram. Abra o arquivo pela entrada atual.",
  denied: "Você precisa de acesso à sala para abrir este arquivo.",
  access: "Revisar acesso ao arquivo",
  timeout:
    "O arquivo não terminou de carregar. Tente de novo quando estiver conectado.",
  pin: "Fixar esta versão",
  unpin: "Desafixar esta versão",
  pinError:
    "A alteração não foi confirmada. Confira o pin atual antes de tentar de novo.",
};
