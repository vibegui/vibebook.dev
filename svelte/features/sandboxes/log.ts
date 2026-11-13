/** Defense in depth for historical setup logs. Transport credentials and entered secrets are never inputs to this view. */
export function sandboxLog(source: string | null | undefined): string {
  return (source ?? "")
    .replace(/sk-ant-[A-Za-z0-9_.-]+/g, "[redacted]")
    .replace(
      /"(access_token|refresh_token|code|verifier)"\s*:\s*"[^"]*"/g,
      '"$1":"[redacted]"',
    )
    .replace(
      /((?:authorization|secret|token|api[_ -]?key|access[_ -]?token|refresh[_ -]?token|claude[_ -]?(?:code[_ -]?)?(?:oauth[_ -]?)?token)\s*[:=]\s*)(?:Bearer\s+)?[^\s\r\n]+/gi,
      "$1[redacted]",
    )
    .slice(-64_000);
}
