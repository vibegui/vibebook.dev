export type InstallEvent = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};
export function platform() {
  const ios =
    /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (/Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
  const standalone =
    matchMedia("(display-mode: standalone)").matches ||
    Reflect.get(navigator, "standalone") === true;
  return {
    ios,
    standalone,
    iosWeb: ios && !standalone,
    coarse: matchMedia("(pointer: coarse)").matches,
    safari:
      !ios ||
      (/Safari\//.test(navigator.userAgent) &&
        !/CriOS|FxiOS|EdgiOS|OPiOS|GSA|FBAN|FBAV|Instagram/.test(
          navigator.userAgent,
        )),
  };
}
export function installEvent(event: Event): event is InstallEvent {
  return (
    "prompt" in event &&
    typeof event.prompt === "function" &&
    "userChoice" in event
  );
}
export function installOutcome(value: unknown): "accepted" | "dismissed" {
  if (
    typeof value !== "object" ||
    value === null ||
    !("outcome" in value) ||
    (value.outcome !== "accepted" && value.outcome !== "dismissed")
  )
    throw new Error("invalid-install-result");
  return value.outcome;
}
export const stored = (key: string) => {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};
export function store(key: string, enabled: boolean) {
  try {
    localStorage.setItem(key, enabled ? "1" : "");
    return true;
  } catch {
    return false;
  }
}
