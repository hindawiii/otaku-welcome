import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Msg = { id: string; user: string; text: string; ts: number };

const SEED: Record<string, Msg[]> = {
  jp: [
    { id: "s1", user: "أكيرا", text: "مرحباً! اليوم سأبدأ بحفظ الكاتاكانا 🔥", ts: Date.now() - 3600000 },
    { id: "s2", user: "ساكورا", text: "بالتوفيق! أنا انتهيت منها الأسبوع الماضي", ts: Date.now() - 1800000 },
  ],
  en: [{ id: "s1", user: "Lina", text: "Anyone up for daily English convo practice?", ts: Date.now() - 7200000 }],
  ar: [{ id: "s1", user: "محمد", text: "تحدي اليوم: اكتب جملة بلاغية واحدة 📜", ts: Date.now() - 5400000 }],
  welcome: [{ id: "s1", user: "الإدارة", text: "أهلاً بالأعضاء الجدد! اقرأوا القواعد أولاً 🌸", ts: Date.now() - 3600000 }],
  drawing: [{ id: "s1", user: "Yuki", text: "شاركوا أعمالكم في تحدي هذا الأسبوع 🎨", ts: Date.now() - 7200000 }],
  games: [{ id: "s1", user: "Kai", text: "من معي في Genshin الليلة؟", ts: Date.now() - 3600000 }],
  music: [{ id: "s1", user: "Mio", text: "افضل OP حالياً؟ أنا مع Chainsaw Man 🎵", ts: Date.now() - 1800000 }],
  arts: [{ id: "s1", user: "Hana", text: "Cosplay جديد قادم لـ Nezuko 🌸", ts: Date.now() - 3600000 }],
};

export default function RoomChat({ roomId, color }: { roomId: string; color: string }) {
  const key = `ogr_chat_${roomId}`;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setMsgs(JSON.parse(raw));
      else setMsgs(SEED[roomId] || []);
    } catch { setMsgs(SEED[roomId] || []); }
  }, [key, roomId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    try { if (msgs.length) localStorage.setItem(key, JSON.stringify(msgs.slice(-50))); } catch {}
  }, [msgs, key]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { id: Math.random().toString(36).slice(2), user: "أنت", text: t, ts: Date.now() }]);
    setText("");
  };

  const fmt = (ts: number) => {
    const d = Date.now() - ts;
    if (d < 60000) return "الآن";
    if (d < 3600000) return `${Math.floor(d / 60000)}د`;
    if (d < 86400000) return `${Math.floor(d / 3600000)}س`;
    return `${Math.floor(d / 86400000)}ي`;
  };

  return (
    <div className="ogr-chat" style={{ borderColor: `${color}40` }}>
      <div className="ogr-chat-head" style={{ color }}>
        <span>💬 دردشة الغرفة</span>
        <span className="ogr-chat-count">{msgs.length}</span>
      </div>
      <div className="ogr-chat-list">
        {msgs.map((m) => (
          <div key={m.id} className={`ogr-chat-msg ${m.user === "أنت" ? "me" : ""}`}>
            <div className="ogr-chat-meta">
              <strong style={{ color }}>{m.user}</strong>
              <span>{fmt(m.ts)}</span>
            </div>
            <div className="ogr-chat-text">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="ogr-chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="اكتب رسالة..."
        />
        <button onClick={send} style={{ background: color }} aria-label="إرسال">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
