// Web Speech API helper — uses native browser TTS (free, no library).
export type SpeakLang = "ja-JP" | "en-US" | "ar-SA";

let voicesCache: SpeechSynthesisVoice[] = [];
function loadVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  voicesCache = window.speechSynthesis.getVoices();
  if (!voicesCache.length) {
    window.speechSynthesis.onvoiceschanged = () => {
      voicesCache = window.speechSynthesis.getVoices();
    };
  }
}

export function speak(text: string, lang: SpeakLang = "en-US") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  if (!voicesCache.length) loadVoices();
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = lang === "ja-JP" ? 0.85 : 0.95;
    u.pitch = 1;
    const v =
      voicesCache.find((v) => v.lang === lang) ||
      voicesCache.find((v) => v.lang.startsWith(lang.split("-")[0]));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn("speak failed", e);
  }
}
