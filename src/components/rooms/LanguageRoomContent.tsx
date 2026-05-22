import { Volume2 } from "lucide-react";
import type { RoomId } from "../OtakuGoRoom";
import { speak, type SpeakLang } from "@/lib/speak";

type Char = { ch: string; romaji: string };
type Sentence = { native: string; translit?: string; meaning: string };
type Dialogue = { who: string; native: string; meaning: string };

type LangData = {
  charsTitle: string;
  chars: Char[];
  sentences: Sentence[];
  dialogues: Dialogue[];
  level: { label: string; value: number }[];
  lang: SpeakLang;
};

// Full hiragana + katakana
const HIRAGANA: Char[] = [
  ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
  ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
  ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
  ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
  ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
  ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
  ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
  ["や","ya"],["ゆ","yu"],["よ","yo"],
  ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
  ["わ","wa"],["を","wo"],["ん","n"],
].map(([ch, romaji]) => ({ ch, romaji }));

const KATAKANA: Char[] = [
  ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
  ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
  ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
  ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
  ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
  ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
  ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
  ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
  ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
  ["ワ","wa"],["ヲ","wo"],["ン","n"],
].map(([ch, romaji]) => ({ ch, romaji }));

const ARABIC: Char[] = [
  "ا|ألف","ب|باء","ت|تاء","ث|ثاء","ج|جيم","ح|حاء","خ|خاء",
  "د|دال","ذ|ذال","ر|راء","ز|زاي","س|سين","ش|شين","ص|صاد",
  "ض|ضاد","ط|طاء","ظ|ظاء","ع|عين","غ|غين","ف|فاء","ق|قاف",
  "ك|كاف","ل|لام","م|ميم","ن|نون","ه|هاء","و|واو","ي|ياء",
].map((s) => { const [ch, romaji] = s.split("|"); return { ch, romaji }; });

const EN_VOCAB: Char[] = [
  ["Hello","مرحباً"],["Goodbye","وداعاً"],["Yes","نعم"],["No","لا"],
  ["Please","من فضلك"],["Thank you","شكراً"],["Sorry","آسف"],["Help","مساعدة"],
  ["Love","حب"],["Friend","صديق"],["Family","عائلة"],["Home","منزل"],
  ["School","مدرسة"],["Work","عمل"],["Food","طعام"],["Water","ماء"],
  ["Time","وقت"],["Day","يوم"],["Night","ليل"],["Morning","صباح"],
  ["Happy","سعيد"],["Sad","حزين"],["Anime","أنمي"],["Manga","مانغا"],
  ["Hero","بطل"],["Story","قصة"],["Dream","حلم"],["Power","قوة"],
].map(([ch, romaji]) => ({ ch, romaji }));

const DATA: Record<"jp" | "en" | "ar", LangData> = {
  jp: {
    lang: "ja-JP",
    charsTitle: "هيراغانا + كاتاكانا — اضغط 🔊 للنطق",
    chars: [...HIRAGANA, ...KATAKANA],
    sentences: [
      { native: "こんにちは", translit: "Konnichiwa", meaning: "مرحباً" },
      { native: "おはようございます", translit: "Ohayou gozaimasu", meaning: "صباح الخير (رسمي)" },
      { native: "こんばんは", translit: "Konbanwa", meaning: "مساء الخير" },
      { native: "ありがとうございます", translit: "Arigatou gozaimasu", meaning: "شكراً جزيلاً" },
      { native: "すみません", translit: "Sumimasen", meaning: "عذراً / آسف" },
      { native: "はじめまして", translit: "Hajimemashite", meaning: "تشرّفت بلقائك" },
      { native: "お元気ですか", translit: "Ogenki desu ka", meaning: "كيف حالك؟" },
      { native: "私は学生です", translit: "Watashi wa gakusei desu", meaning: "أنا طالب" },
      { native: "わかりません", translit: "Wakarimasen", meaning: "لا أفهم" },
      { native: "もう一度お願いします", translit: "Mou ichido onegaishimasu", meaning: "مرة أخرى من فضلك" },
      { native: "アニメが大好きです", translit: "Anime ga daisuki desu", meaning: "أحب الأنمي كثيراً" },
      { native: "また明日", translit: "Mata ashita", meaning: "أراك غداً" },
    ],
    dialogues: [
      { who: "أ", native: "お名前は何ですか？", meaning: "ما اسمك؟" },
      { who: "ب", native: "私はアキラです。", meaning: "أنا أكيرا." },
      { who: "أ", native: "よろしくお願いします。", meaning: "تشرفنا." },
      { who: "ب", native: "こちらこそ。", meaning: "وأنا كذلك." },
    ],
    level: [
      { label: "هيراغانا", value: 70 }, { label: "كاتاكانا", value: 45 },
      { label: "كانجي N5", value: 25 }, { label: "محادثة", value: 30 },
    ],
  },
  en: {
    lang: "en-US",
    charsTitle: "أهم المفردات — اضغط 🔊 للاستماع",
    chars: EN_VOCAB,
    sentences: [
      { native: "Nice to meet you.", meaning: "تشرّفت بلقائك." },
      { native: "How are you today?", meaning: "كيف حالك اليوم؟" },
      { native: "What is your name?", meaning: "ما اسمك؟" },
      { native: "Where are you from?", meaning: "من أين أنت؟" },
      { native: "I love this anime!", meaning: "أحب هذا الأنمي!" },
      { native: "Could you repeat that, please?", meaning: "هل يمكنك الإعادة من فضلك؟" },
      { native: "I don't understand.", meaning: "لا أفهم." },
      { native: "What's your favorite manga?", meaning: "ما هي المانغا المفضّلة لديك؟" },
      { native: "See you tomorrow!", meaning: "أراك غداً!" },
      { native: "Have a great day!", meaning: "أتمنى لك يوماً رائعاً!" },
      { native: "Let's watch it together.", meaning: "لنشاهده سويّاً." },
      { native: "The plot is amazing.", meaning: "الحبكة مذهلة." },
    ],
    dialogues: [
      { who: "A", native: "Hey! Did you watch the new episode?", meaning: "هل شاهدت الحلقة الجديدة؟" },
      { who: "B", native: "Yes! The ending was insane.", meaning: "نعم! النهاية كانت مذهلة." },
      { who: "A", native: "I can't wait for next week!", meaning: "لا أطيق الانتظار للأسبوع القادم!" },
      { who: "B", native: "Me too. Let's discuss theories.", meaning: "وأنا أيضاً. لنناقش النظريات." },
    ],
    level: [
      { label: "مفردات", value: 60 }, { label: "قواعد", value: 50 },
      { label: "استماع", value: 40 }, { label: "محادثة", value: 35 },
    ],
  },
  ar: {
    lang: "ar-SA",
    charsTitle: "الحروف العربية الـ28 — اضغط 🔊 للنطق",
    chars: ARABIC,
    sentences: [
      { native: "السلام عليكم ورحمة الله.", meaning: "تحية الإسلام الكاملة." },
      { native: "وعليكم السلام ورحمة الله وبركاته.", meaning: "ردّ التحية." },
      { native: "كيف حالك اليوم؟", meaning: "سؤال عن الحال." },
      { native: "أهلاً وسهلاً بك معنا.", meaning: "ترحيب." },
      { native: "ما اسمك الكريم؟", meaning: "سؤال عن الاسم بأدب." },
      { native: "تشرّفت بمعرفتك.", meaning: "تعبير عن السرور باللقاء." },
      { native: "شكراً جزيلاً لك على لطفك.", meaning: "تعبير عن الامتنان." },
      { native: "بارك الله فيك.", meaning: "دعاء بالخير." },
      { native: "إلى اللقاء قريباً إن شاء الله.", meaning: "وداع." },
      { native: "هل تحب قراءة المانغا؟", meaning: "سؤال عن الذوق." },
      { native: "اللغة العربية بحر واسع.", meaning: "تعبير بلاغي." },
      { native: "العلم نور والجهل ظلام.", meaning: "حكمة شهيرة." },
    ],
    dialogues: [
      { who: "أ", native: "هل تحب الأنمي الياباني؟", meaning: "سؤال عن الذوق." },
      { who: "ب", native: "نعم، أعشق أعمال استوديو جيبلي.", meaning: "إجابة وإبداء إعجاب." },
      { who: "أ", native: "ما هو فيلمك المفضّل لديهم؟", meaning: "متابعة الحوار." },
      { who: "ب", native: "بلا شك «المُبعَد بالسحر»، تحفة فنية!", meaning: "تأكيد الإجابة." },
    ],
    level: [
      { label: "إملاء", value: 80 }, { label: "نحو", value: 55 },
      { label: "بلاغة", value: 30 }, { label: "تعبير", value: 50 },
    ],
  },
};

export default function LanguageRoomContent({
  roomId, tab, color, colorAlt,
}: { roomId: RoomId; tab: number; color: string; colorAlt: string }) {
  if (roomId !== "jp" && roomId !== "en" && roomId !== "ar") return null;
  const data = DATA[roomId];
  const lang = data.lang;

  if (tab === 0) {
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>{data.charsTitle}</h3>
        <div className="lr-chars-grid">
          {data.chars.map((c, i) => (
            <button
              key={i}
              className="lr-char-card lr-clickable"
              style={{ borderColor: `${color}40` }}
              onClick={() => speak(c.ch, lang)}
              title="استمع"
            >
              <div className="lr-char-glyph" style={{ color }}>{c.ch}</div>
              <div className="lr-char-romaji">{c.romaji}</div>
              <Volume2 size={12} className="lr-speak-icon" style={{ color }} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 1) {
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>جمل يومية — اضغط للاستماع</h3>
        <div className="lr-sent-list">
          {data.sentences.map((s, i) => (
            <button
              key={i}
              className="lr-sent-card lr-clickable"
              style={{ borderColor: `${color}40` }}
              onClick={() => speak(s.native, lang)}
            >
              <div className="lr-sent-row">
                <div className="lr-sent-native" style={{ color }}>{s.native}</div>
                <Volume2 size={16} style={{ color, flexShrink: 0 }} />
              </div>
              {s.translit && <div className="lr-sent-trans">{s.translit}</div>}
              <div className="lr-sent-meaning">{s.meaning}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 2) {
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>محادثة قصيرة — اضغط الفقاعة للاستماع</h3>
        <div className="lr-dialogue">
          {data.dialogues.map((d, i) => (
            <button
              key={i}
              className={`lr-bubble lr-bubble-${i % 2} lr-clickable`}
              onClick={() => speak(d.native, lang)}
            >
              <div className="lr-who" style={{ color }}>{d.who} <Volume2 size={12} /></div>
              <div className="lr-bubble-native">{d.native}</div>
              <div className="lr-bubble-meaning">{d.meaning}</div>
            </button>
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
              <span>{l.label}</span><span style={{ color }}>{l.value}%</span>
            </div>
            <div className="lr-level-bar">
              <div className="lr-level-fill" style={{ width: `${l.value}%`, background: `linear-gradient(90deg, ${color}, ${colorAlt})` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
