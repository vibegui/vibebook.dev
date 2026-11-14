const en = {
  settings: "Notifications",
  close: "Close",
  enable: "Enable browser notifications",
  mute: "Mute notifications and sound",
  retry: "Retry setup",
  test: "Send a test notification",
  sent: "Push services accepted {n} test notifications for your account. Delivery to this device is not confirmed.",
  permission: "Browser permission",
  denied:
    "Notifications are blocked. Allow them in this site's browser settings, then retry.",
  unsupported: "This browser does not offer notification permission here.",
  ios: "On iPhone or iPad, open this site in Safari, share it, choose Add to Home Screen, then open the installed app to enable notifications.",
  install: "Install vibebook on your phone",
  how: "How to install",
  installNow: "Install app",
  android:
    "Open the browser menu and choose Install app or Add to Home Screen. Open its icon and enable notifications.",
  benefits:
    "Receive alerts when someone mentions you or your agent asks for permission; open the app from your home screen.",
  waiting:
    "Waiting for confirmation. An in-flight subscription change has not been rolled back. Retry waits for it to settle.",
  failed:
    "Notification setup failed. Check browser permission and your connection, then retry.",
  unavailable: "Push notifications are not configured on this server.",
  storage:
    "This browser could not save the preference. It applies only to this tab.",
  help: "Notification and installation settings",
  on: "Notifications on: click to mute",
  off: "Notifications muted: click to turn on",
  working: "Updating notifications…",
  steps: "Installation steps",
} as const;
const pt: Record<keyof typeof en, string> = {
  settings: "Notificações",
  close: "Fechar",
  enable: "Ativar notificações no navegador",
  mute: "Silenciar notificações e som",
  retry: "Tentar configurar de novo",
  test: "Enviar uma notificação de teste",
  sent: "Os serviços de push aceitaram {n} notificações de teste da sua conta. A entrega neste aparelho não está confirmada.",
  permission: "Permissão do navegador",
  denied:
    "Notificações bloqueadas. Permita nas configurações deste site no navegador e tente de novo.",
  unsupported: "Este navegador não oferece permissão para notificações aqui.",
  ios: "No iPhone ou iPad, abra este site no Safari, toque em Compartilhar, escolha Adicionar à Tela de Início e abra o app instalado para ativar notificações.",
  install: "Instale o vibebook no celular",
  how: "Como instalar",
  installNow: "Instalar o app",
  android:
    "Abra o menu do navegador e escolha Instalar app ou Adicionar à tela inicial. Abra pelo ícone e ative as notificações.",
  benefits:
    "Receba avisos quando alguém te marcar ou seu agent pedir permissão; abra o app pela tela inicial.",
  waiting:
    "Aguardando confirmação. Uma mudança de assinatura em andamento não foi desfeita. Tentar de novo espera ela terminar.",
  failed:
    "Não consegui configurar notificações. Confira a permissão e a conexão e tente de novo.",
  unavailable: "As notificações push não estão configuradas neste servidor.",
  storage: "O navegador não salvou a preferência. Ela vale só nesta aba.",
  help: "Configurações de notificações e instalação",
  on: "Notificações ligadas: clique para silenciar",
  off: "Notificações silenciadas: clique para ligar",
  working: "Atualizando notificações…",
  steps: "Passos para instalar",
};
export const pwaText = (lang: string, key: keyof typeof en, n?: number) =>
  (lang.startsWith("en") ? en[key] : pt[key]).replace("{n}", String(n ?? 0));
export const pwaLogoutWarning = (lang: string) =>
  lang.startsWith("en")
    ? "Notification cleanup on this device was not confirmed. Signing out will continue. Check this site's notification permission in browser settings if needed."
    : "A limpeza das notificações neste aparelho não foi confirmada. Você continuará saindo. Se precisar, confira a permissão de notificações deste site nas configurações do navegador.";
export const pwaLogoutFailure = (lang: string) =>
  lang.startsWith("en")
    ? "Sign-out was not confirmed. The app will reload to check your session before updating notification settings."
    : "A saída não foi confirmada. O app vai recarregar para conferir sua sessão antes de atualizar as configurações de notificações.";
export const pwaPermission = (
  lang: string,
  permission: NotificationPermission | "unsupported",
) =>
  (lang.startsWith("en")
    ? {
        default: "Not requested",
        granted: "Allowed",
        denied: "Blocked",
        unsupported: "Unavailable",
      }
    : {
        default: "Não solicitada",
        granted: "Permitida",
        denied: "Bloqueada",
        unsupported: "Indisponível",
      })[permission];
