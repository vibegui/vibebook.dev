import type { MeResult } from "../../../shared/schemas";
export type OnboardingStep = 1 | 2 | 3;
export const ONBOARDING_DONE = "vb.obDone", ONBOARDING_SKIP_CLAUDE = "vb.obClaude";
export const ONBOARDING_POLL = 4000, ONBOARDING_POLL_LIMIT = 150, ONBOARDING_CONNECTED_DELAY = 1500;
export function onboardingStep(me: Pick<MeResult, "name">, back: OnboardingStep | null, connected: boolean, skipped: boolean): OnboardingStep {
  return back ?? (!me.name ? 1 : !connected && !skipped ? 2 : 3);
}
export const onboardingEligible = (me: MeResult | null, dismissed: boolean) => !!me && !me.books.length && !dismissed;
