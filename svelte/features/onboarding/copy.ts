const pt = {
  step: "Passo {n} de 3",
  nameTitle: "Como seus amigos te chamam?",
  nameHelp: "O pessoal e os agents vão te chamar assim.",
  name: "Seu nome",
  next: "Continuar",
  changePhoto: "Trocar foto",
  photo: "Adicionar foto (opcional)",
  claudeTitle: "Conecte seu Claude",
  claudeHelp:
    "No vibebook cada pessoa traz o próprio Claude: ele lê a sala, trabalha nas tarefas e te pergunta antes de agir. Cole isto no Claude Code, dentro da pasta do projeto:",
  back: "Voltar",
  skipClaude: "Pular por agora",
  roomTitle: "Sua primeira sala",
  roomHelp:
    "Uma sala por projeto: conversa, doc e tarefas. Diga o que é e com quem; quem você citar é convidado.",
  roomPlaceholder: "Ex.: viagem de avião pra SP com os dogs, eu e a Alexia",
  create: "Criar a sala",
  creating: "Criando…",
  skipHome: "Pular e ver a home",
  connected: "Seu agent conectou.",
  pending: "Esperando confirmação…",
  failed: "Não foi possível salvar. Confira os dados e tente novamente.",
  unconfirmed:
    "Ainda sem confirmação. Confira o estado atual antes de tentar novamente.",
  reviewed: "Conferi o estado atual",
  refresh: "Atualizar",
  photoLabel: "Foto do perfil",
  language: "Idioma",
} as const;
export type OnboardingCopy = keyof typeof pt;
const en: Record<OnboardingCopy, string> = {
  step: "Step {n} of 3",
  nameTitle: "What do your friends call you?",
  nameHelp: "People and agents will call you that.",
  name: "Your name",
  next: "Continue",
  changePhoto: "Change photo",
  photo: "Add a photo (optional)",
  claudeTitle: "Connect your Claude",
  claudeHelp:
    "In vibebook everyone brings their own Claude: it reads the room, works on the tasks and asks you before acting. Paste this into Claude Code, inside the project folder:",
  back: "Back",
  skipClaude: "Skip for now",
  roomTitle: "Your first room",
  roomHelp:
    "One room per project: chat, doc and tasks. Say what it is and with whom; anyone you name gets invited.",
  roomPlaceholder: "E.g. a flight to São Paulo with the dogs, Alexia and me",
  create: "Create the room",
  creating: "Creating…",
  skipHome: "Skip and see the home",
  connected: "Your agent connected.",
  pending: "Waiting for confirmation…",
  failed: "Could not save. Check the details and try again.",
  unconfirmed:
    "Not confirmed yet. Review the current state before trying again.",
  reviewed: "I reviewed the current state",
  refresh: "Refresh",
  photoLabel: "Profile photo",
  language: "Language",
};
export const onboardingText = (
  lang: "pt" | "en",
  key: OnboardingCopy,
  n?: number,
) => (lang === "en" ? en : pt)[key].replace("{n}", String(n ?? ""));
