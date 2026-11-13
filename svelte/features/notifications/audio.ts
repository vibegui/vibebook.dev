export function createChime() {
  let audio: AudioContext | null = null;
  const unlock = () => {
    try {
      audio ??= new AudioContext();
      void audio.resume().catch(() => {});
    } catch {
      /* Audio unavailable. */
    }
  };
  document.addEventListener("pointerdown", unlock, { once: true });
  return {
    unlock,
    play() {
      if (!audio) return;
      const at = audio.currentTime;
      for (const [frequency, offset] of [
        [880, 0],
        [1318.5, 0.12],
      ]) {
        const oscillator = audio.createOscillator(),
          gain = audio.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, at + offset);
        gain.gain.linearRampToValueAtTime(0.18, at + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, at + offset + 0.5);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(at + offset);
        oscillator.stop(at + offset + 0.55);
      }
    },
    dispose() {
      document.removeEventListener("pointerdown", unlock);
      void audio?.close().catch(() => {});
      audio = null;
    },
  };
}
