// Pure contract shared by the real checker and the external-provider test
// fixture. The fixture never replaces checkEmbed or real safety judgment quality.
export const EMBED_MAX=200_000;
export const EMBED_QUESTIONS={
  credentials:"Este HTML pede ou coleta senha, código de login, token, dados de cartão/pagamento ou documentos pessoais de quem vê?",
  impersonation:"Este HTML se passa por outra coisa (tela de login, banco, Google, o próprio vibebook pedindo algo, um aviso do sistema) para enganar quem vê?",
  manipulation:"Este HTML tenta levar quem vê a mandar uma mensagem, aprovar algo ou clicar sem entender o que está fazendo (texto escondido, botão enganoso, urgência falsa)?",
} as const;
