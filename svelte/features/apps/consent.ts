import { writable } from "svelte/store";
export type AppQuestion = Readonly<{ what: string; detail: string }>;
/** A rendered button owns one exact question; an old A button can never decide unseen B. */
export function createAppConsent(current: () => boolean) {
  const question = writable<AppQuestion | null>(null),
    queue: { question: AppQuestion; resolve(value: boolean): void }[] = [];
  let active = true;
  function cancel() {
    for (const item of queue.splice(0)) item.resolve(false);
    question.set(null);
  }
  return {
    question,
    ask(what: string, detail: string): Promise<boolean> {
      if (!active || !current() || queue.length >= 16)
        return Promise.resolve(false);
      return new Promise((resolve) => {
        const item = {
          question: Object.freeze({ what, detail: detail.slice(0, 600) }),
          resolve,
        };
        queue.push(item);
        if (queue.length === 1) question.set(item.question);
      });
    },
    choose(intent: AppQuestion, answer: boolean) {
      if (!active || !current() || queue[0]?.question !== intent) return false;
      queue.shift()?.resolve(answer);
      question.set(queue[0]?.question || null);
      return true;
    },
    cancel,
    dispose() {
      active = false;
      cancel();
    },
  };
}
