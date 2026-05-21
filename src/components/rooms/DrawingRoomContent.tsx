type Props = { tab: number; color: string; colorAlt: string };

const LESSONS = [
  { lvl: "مبتدئ", title: "أساسيات رسم الوجه الأنمي", time: "15 دقيقة", icon: "👤" },
  { lvl: "مبتدئ", title: "العيون الكبيرة المعبّرة", time: "20 دقيقة", icon: "👁️" },
  { lvl: "متوسط", title: "تشريح الجسم والحركة", time: "35 دقيقة", icon: "🏃" },
  { lvl: "متوسط", title: "الشعر والديناميكية", time: "25 دقيقة", icon: "💇" },
  { lvl: "متقدم", title: "التلوين الرقمي والظلال", time: "45 دقيقة", icon: "🎨" },
  { lvl: "متقدم", title: "الخلفيات والمنظور", time: "50 دقيقة", icon: "🏯" },
];

const GALLERY = [
  { artist: "@Kenji_Art", title: "Sakura Portrait", likes: 248, emoji: "🌸" },
  { artist: "@MangaKai", title: "Samurai Sunset", likes: 192, emoji: "⚔️" },
  { artist: "@ChibiQueen", title: "Cat Girl Chibi", likes: 156, emoji: "🐱" },
  { artist: "@DigitalSora", title: "Cyber City", likes: 134, emoji: "🌆" },
  { artist: "@InkMaster", title: "Dragon Spirit", likes: 287, emoji: "🐉" },
  { artist: "@PastelDream", title: "Magical Girl", likes: 201, emoji: "✨" },
];

const CHALLENGES = [
  { title: "تحدي الأسبوع: عيون بعاطفة", desc: "ارسم عينًا تعكس الغضب أو الحزن.", days: 3, joined: 47 },
  { title: "تحدي شهري: شخصيتك الأصلية", desc: "صمّم OC كامل مع خلفية قصصية.", days: 18, joined: 23 },
  { title: "تحدي سريع: Chibi في 10 دقائق", desc: "اختبر سرعتك في أسلوب الشيبي.", days: 1, joined: 89 },
];

const LEVELS = [
  { name: "الأساسيات", pct: 85 },
  { name: "التشريح", pct: 60 },
  { name: "التلوين", pct: 40 },
  { name: "الخلفيات", pct: 20 },
];

export default function DrawingRoomContent({ tab, color, colorAlt }: Props) {
  if (tab === 0) return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>الدروس</h3>
      <div className="dr-lessons">
        {LESSONS.map((l, i) => (
          <div key={i} className="dr-lesson" style={{ borderColor: `${color}33` }}>
            <div className="dr-lesson-icon" style={{ background: `linear-gradient(135deg, ${color}, ${colorAlt})` }}>{l.icon}</div>
            <div className="dr-lesson-body">
              <div className="dr-lesson-lvl" style={{ color }}>{l.lvl}</div>
              <div className="dr-lesson-title">{l.title}</div>
              <div className="dr-lesson-time">⏱ {l.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  if (tab === 1) return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>معرض الأعمال</h3>
      <div className="dr-gallery">
        {GALLERY.map((g, i) => (
          <div key={i} className="dr-art" style={{ borderColor: `${color}33` }}>
            <div className="dr-art-thumb" style={{ background: `linear-gradient(135deg, ${color}40, ${colorAlt}40)` }}>{g.emoji}</div>
            <div className="dr-art-title">{g.title}</div>
            <div className="dr-art-meta"><span>{g.artist}</span><span>❤ {g.likes}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
  if (tab === 2) return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>التحديات</h3>
      <div className="dr-challenges">
        {CHALLENGES.map((c, i) => (
          <div key={i} className="dr-challenge" style={{ borderColor: `${color}33` }}>
            <div className="dr-challenge-head">
              <h4>{c.title}</h4>
              <span className="dr-challenge-days" style={{ background: `${color}26`, color }}>{c.days} يوم</span>
            </div>
            <p>{c.desc}</p>
            <div className="dr-challenge-foot">
              <span>{c.joined} مشارك</span>
              <button style={{ background: `linear-gradient(135deg, ${color}, ${colorAlt})` }}>انضم</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>مستواي في الرسم</h3>
      <div className="lr-level-list">
        {LEVELS.map((l, i) => (
          <div key={i}>
            <div className="lr-level-head"><span>{l.name}</span><span>{l.pct}%</span></div>
            <div className="lr-level-bar">
              <div className="lr-level-fill" style={{ width: `${l.pct}%`, background: `linear-gradient(90deg, ${color}, ${colorAlt})` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
