import type { RoomId } from "../OtakuGoRoom";

type Char = { ch: string; romaji: string };
type Sentence = { native: string; translit?: string; meaning: string };
type Dialogue = { who: string; native: string; meaning: string };

type LangData = {
  charsTitle: string;
  chars: Char[];
  sentences: Sentence[];
  dialogues: Dialogue[];
  level: { label: string; value: number }[];
};

const DATA: Record<"jp" | "en" | "ar", LangData> = {
  jp: {
    charsTitle: "هيراغانا — الأساسيات",
    chars: [
      { ch: "あ", romaji: "a" }, { ch: "い", romaji: "i" },
      { ch: "う", romaji: "u" }, { ch: "え", romaji: "e" },
      { ch: "お", romaji: "o" }, { ch: "か", romaji: "ka" },
      { ch: "き", romaji: "ki" }, { ch: "さ", romaji: "sa" },
      { ch: "た", romaji: "ta" }, { ch: "な", romaji: "na" },
      { ch: "は", romaji: "ha" }, { ch: "ま", romaji: "ma" },
    ],
    sentences: [
      { native: "こんにちは", translit: "Konnichiwa", meaning: "مرحباً" },
      { native: "ありがとう", translit: "Arigatou", meaning: "شكراً" },
      { native: "おはよう", translit: "Ohayou", meaning: "صباح الخير" },
      { native: "さようなら", translit: "Sayounara", meaning: "وداعاً" },
      { native: "はじめまして", translit: "Hajimemashite", meaning: "تشرّفت بلقائك" },
      { native: "わかりません", translit: "Wakarimasen", meaning: "لا أفهم" },
    ],
    dialogues: [
      { who: "أ", native: "お名前は？", meaning: "ما اسمك؟" },
      { who: "ب", native: "私はアキラです。", meaning: "أنا أكيرا." },
      { who: "أ", native: "よろしくお願いします。", meaning: "تشرفنا." },
    ],
    level: [
      { label: "هيراغانا", value: 70 },
      { label: "كاتاكانا", value: 45 },
      { label: "كانجي N5", value: 25 },
      { label: "محادثة", value: 30 },
    ],
  },
  en: {
    charsTitle: "أهم المفردات",
    chars: [
      { ch: "Hi", romaji: "مرحباً" }, { ch: "Bye", romaji: "وداعاً" },
      { ch: "Yes", romaji: "نعم" }, { ch: "No", romaji: "لا" },
      { ch: "Please", romaji: "من فضلك" }, { ch: "Thanks", romaji: "شكراً" },
      { ch: "Sorry", romaji: "آسف" }, { ch: "Help", romaji: "مساعدة" },
      { ch: "Love", romaji: "حب" }, { ch: "Friend", romaji: "صديق" },
      { ch: "Anime", romaji: "أنمي" }, { ch: "Manga", romaji: "مانغا" },
    ],
    sentences: [
      { native: "Nice to meet you.", meaning: "تشرّفت بلقائك." },
      { native: "How are you today?", meaning: "كيف حالك اليوم؟" },
      { native: "I love this anime!", meaning: "أحب هذا الأنمي!" },
      { native: "Could you repeat that?", meaning: "هل يمكنك الإعادة؟" },
      { native: "What's your favorite manga?", meaning: "ما هي المانغا المفضّلة لديك؟" },
      { native: "See you tomorrow.", meaning: "أراك غداً." },
    ],
    dialogues: [
      { who: "A", native: "Hey! Did you watch the new episode?", meaning: "هل شاهدت الحلقة الجديدة؟" },
      { who: "B", native: "Yes! The ending was insane.", meaning: "نعم! النهاية كانت مذهلة." },
      { who: "A", native: "I can't wait for next week!", meaning: "لا أطيق الانتظار للأسبوع القادم!" },
    ],
    level: [
      { label: "مفردات", value: 60 },
      { label: "قواعد", value: 50 },
      { label: "استماع", value: 40 },
      { label: "محادثة", value: 35 },
    ],
  },
  ar: {
    charsTitle: "الأحرف العربية",
    chars: [
      { ch: "ا", romaji: "ألف" }, { ch: "ب", romaji: "باء" },
      { ch: "ت", romaji: "تاء" }, { ch: "ث", romaji: "ثاء" },
      { ch: "ج", romaji: "جيم" }, { ch: "ح", romaji: "حاء" },
      { ch: "خ", romaji: "خاء" }, { ch: "د", romaji: "دال" },
      { ch: "ر", romaji: "راء" }, { ch: "س", romaji: "سين" },
      { ch: "ش", romaji: "شين" }, { ch: "ع", romaji: "عين" },
    ],
    sentences: [
      { native: "السلام عليكم.", meaning: "تحية الإسلام." },
      { native: "كيف حالك؟", meaning: "سؤال عن الحال." },
      { native: "أهلاً وسهلاً بك.", meaning: "ترحيب." },
      { native: "ما اسمك الكريم؟", meaning: "سؤال عن الاسم بأدب." },
      { native: "شكراً جزيلاً لك.", meaning: "تعبير عن الامتنان." },
      { native: "إلى اللقاء قريباً.", meaning: "وداع." },
    ],
    dialogues: [
      { who: "أ", native: "هل تحب الأنمي الياباني؟", meaning: "سؤال عن الذوق." },
      { who: "ب", native: "نعم، أعشق أعمال الاستوديو جيبلي.", meaning: "إجابة وإبداء إعجاب." },
      { who: "أ", native: "ما هو فيلمك المفضّل لديهم؟", meaning: "متابعة الحوار." },
    ],
    level: [
      { label: "إملاء", value: 80 },
      { label: "نحو", value: 55 },
      { label: "بلاغة", value: 30 },
      { label: "تعبير", value: 50 },
    ],
  },
};

export default function LanguageRoomContent({
  roomId,
  tab,
  color,
  colorAlt,
}: {
  roomId: RoomId;
  tab: number;
  color: string;
  colorAlt: string;
}) {
  if (roomId !== "jp" && roomId !== "en" && roomId !== "ar") return null;
  const data = DATA[roomId];

  if (tab === 0) {
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>{data.charsTitle}</h3>
        <div className="lr-chars-grid">
          {data.chars.map((c, i) => (
            <div
              key={i}
              className="lr-char-card"
              style={{ borderColor: `${color}40` }}
            >
              <div className="lr-char-glyph" style={{ color }}>{c.ch}</div>
              <div className="lr-char-romaji">{c.romaji}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 1) {
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>جمل يومية</h3>
        <div className="lr-sent-list">
          {data.sentences.map((s, i) => (
            <div key={i} className="lr-sent-card" style={{ borderColor: `${color}40` }}>
              <div className="lr-sent-native" style={{ color }}>{s.native}</div>
              {s.translit && <div className="lr-sent-trans">{s.translit}</div>}
              <div className="lr-sent-meaning">{s.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 2) {
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>محادثة قصيرة</h3>
        <div className="lr-dialogue">
          {data.dialogues.map((d, i) => (
            <div key={i} className={`lr-bubble lr-bubble-${i % 2}`}>
              <div className="lr-who" style={{ color }}>{d.who}</div>
              <div className="lr-bubble-native">{d.native}</div>
              <div className="lr-bubble-meaning">{d.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lr-section">
      <h3 className="lr-title" style={{ color }}>مستواي الحالي</h3>
      <div className="lr-level-list">
        {data.level.map((l, i) => (
          <div key={i} className="lr-level-row">
            <div className="lr-level-head">
              <span>{l.label}</span>
              <span style={{ color }}>{l.value}%</span>
            </div>
            <div className="lr-level-bar">
              <div
                className="lr-level-fill"
                style={{
                  width: `${l.value}%`,
                  background: `linear-gradient(90deg, ${color}, ${colorAlt})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
