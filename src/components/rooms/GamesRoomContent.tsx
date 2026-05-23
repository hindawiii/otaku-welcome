import { useMemo, useState } from "react";
import "./games-room.css";

type GameCat = "ذكاء" | "سرعة" | "تخمين" | "إبداع" | "تنافسي" | "جماعي";
type Game = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  cls: string;
  cats: GameCat[];
  tags: { label: string; color: string; bg: string }[];
};

const C = {
  purple: "#8b5cf6", pink: "#ec4899", red: "#ef4444", orange: "#f97316",
  green: "#22c55e", yellow: "#eab308", blue: "#3b82f6", cyan: "#06b6d4",
};
const tag = (label: string, color: string) => ({
  label, color, bg: color + "33",
});

const GAMES: Game[] = [
  { id: "g1", icon: "🌟", title: "اختبار الأنمي العام", desc: "8 فئات × 200 سؤال = 1600+ سؤال متنوع ومتجدد", cls: "quiz",
    cats: ["ذكاء"], tags: [tag("🧠 ذكاء", C.purple), tag("4 أوضاع", C.green)] },
  { id: "g2", icon: "🎯", title: "اختبر أنمي محدد", desc: "16 أنمي شهير مع 200-1000+ سؤال لكل أنمي", cls: "quiz",
    cats: ["ذكاء"], tags: [tag("🧠 ذكاء", C.purple), tag("16 أنمي", C.yellow)] },
  { id: "g3", icon: "♾️", title: "الوضع اللانهائي", desc: "أسئلة لا تنتهي + صعوبة تصاعدية + نظام حياة", cls: "quiz",
    cats: ["سرعة"], tags: [tag("⚡ تحدي", C.red), tag("♾️ لا نهائي", C.green)] },
  { id: "g4", icon: "⚡", title: "سباق السرعة", desc: "30 سؤال في 3 دقائق - مضاعف النقاط للإجابات السريعة", cls: "quiz",
    cats: ["سرعة"], tags: [tag("⚡ سرعة", C.red), tag("⏱️ 3 دقائق", C.orange)] },
  { id: "g5", icon: "❤️", title: "البقاء للأقوى", desc: "3 فرص - إجابة خاطئة تفقد فرصة - كم تستطيع البقاء؟", cls: "quiz",
    cats: ["سرعة"], tags: [tag("❤️ بقاء", C.red), tag("⚡ تحدي", C.yellow)] },
  { id: "g6", icon: "📅", title: "التحدي اليومي", desc: "10 أسئلة ثابتة يومياً للجميع - قارن مع أصدقائك", cls: "quiz",
    cats: ["جماعي"], tags: [tag("📅 يومي", C.blue), tag("👥 جماعي", C.green)] },
  { id: "g7", icon: "🎭", title: "خمن الشخصية", desc: "صورة مشوهة + تلميحات تكشف الشخصية تدريجياً", cls: "guess",
    cats: ["تخمين"], tags: [tag("🎯 تخمين", C.red), tag("🖼️ صور", C.orange)] },
  { id: "g8", icon: "🖼️", title: "أي مشهد هذا؟", desc: "صورة مشهد مشهور + خمن الأنمي والحلقة", cls: "guess",
    cats: ["تخمين"], tags: [tag("🎯 تخمين", C.red), tag("🖼️ صور", C.orange)] },
  { id: "g9", icon: "🎵", title: "أوبنينغ بلا عنوان", desc: "5 ثواني من الأوبنينغ أو كلمات بدون موسيقى", cls: "music",
    cats: ["تخمين"], tags: [tag("🎵 موسيقى", C.pink), tag("🎯 تخمين", C.blue)] },
  { id: "g10", icon: "🗣️", title: "من قال هذا؟", desc: "اقتباسات مشهورة + خمن الشخصية + أكمل الاقتباس", cls: "quote",
    cats: ["ذكاء"], tags: [tag("🧠 ذكاء", C.blue), tag("💬 اقتباسات", C.purple)] },
  { id: "g11", icon: "⚔️", title: "معركة القوى", desc: "Haki vs Chakra - تصويت جماعي + إحصائيات أي أقوى", cls: "battle",
    cats: ["تنافسي", "جماعي"], tags: [tag("⚔️ معركة", C.orange), tag("👥 تصويت", C.cyan)] },
  { id: "g12", icon: "🎨", title: "رسم الأنمي", desc: "ارسم شخصية بالـCanvas + الآخرون يخمنون (لعب جماعي)", cls: "draw",
    cats: ["إبداع", "جماعي"], tags: [tag("🎨 إبداع", C.green), tag("👥 جماعي", C.pink)] },
  { id: "g13", icon: "🔗", title: "سلسلة الأنمي", desc: "لعبة كلمات: أنمي ينتهي بحرف → يبدأ بنفس الحرف", cls: "chain",
    cats: ["سرعة"], tags: [tag("🔗 سلسلة", C.cyan), tag("⚡ سرعة", C.yellow)] },
  { id: "g14", icon: "🧩", title: "بازل الأنمي", desc: "صورة مقسمة لقطع 3×3 إلى 8×8 - إعادة الترتيب", cls: "puzzle",
    cats: ["ذكاء"], tags: [tag("🧩 بازل", C.yellow), tag("🧠 ذكاء", C.green)] },
  { id: "g15", icon: "📊", title: "إحصائيات الأنمي", desc: "تخمين أرقام غريبة: أطول أنمي، أكبر ميزانية...", cls: "stats",
    cats: ["تخمين"], tags: [tag("📊 إحصائيات", C.purple), tag("🎯 تخمين", C.blue)] },
  { id: "g16", icon: "🎯", title: "سريع أم بطيء", desc: 'مشهد + "من أي أنمي؟" + "في أي حلقة؟" ضد الوقت', cls: "fast",
    cats: ["سرعة"], tags: [tag("⚡ سرعة", C.red), tag("⏱️ ضد الوقت", C.orange)] },
  { id: "g17", icon: "🏆", title: "بطولة الأوتاكو", desc: "دوري 16 لاعب بتصفيات ونهائي + جدول مباريات", cls: "tournament",
    cats: ["تنافسي"], tags: [tag("🏆 بطولة", C.yellow), tag("👥 16 لاعب", C.red)] },
];

const FILTERS: { label: string; cat: GameCat | "all" }[] = [
  { label: "الكل", cat: "all" },
  { label: "🧠 ذكاء", cat: "ذكاء" },
  { label: "⚡ سرعة", cat: "سرعة" },
  { label: "🎯 تخمين", cat: "تخمين" },
  { label: "🎨 إبداع", cat: "إبداع" },
  { label: "🏆 تنافسي", cat: "تنافسي" },
  { label: "👥 جماعي", cat: "جماعي" },
];

function HubTab() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<GameCat | "all">("all");
  const list = useMemo(() => GAMES.filter(g => {
    if (filter !== "all" && !g.cats.includes(filter)) return false;
    if (q && !(g.title.includes(q) || g.desc.includes(q))) return false;
    return true;
  }), [q, filter]);

  return (
    <div>
      <div className="gr-stats-banner">
        <div className="gr-stat-box"><div className="gr-stat-num">17</div><div className="gr-stat-label">لعبة متاحة</div></div>
        <div className="gr-stat-box"><div className="gr-stat-num">3,500+</div><div className="gr-stat-label">سؤال/تحدي</div></div>
        <div className="gr-stat-box"><div className="gr-stat-num">16</div><div className="gr-stat-label">أنمي مدعوم</div></div>
        <div className="gr-stat-box"><div className="gr-stat-num">8</div><div className="gr-stat-label">فئات أسئلة</div></div>
      </div>

      <div className="gr-search">
        <input type="text" placeholder="ابحث عن لعبة..." value={q} onChange={e => setQ(e.target.value)} />
        <span className="gr-search-icon">🔍</span>
      </div>

      <div className="gr-filters">
        {FILTERS.map(f => (
          <button
            key={f.label}
            className={`gr-filter-btn ${filter === f.cat ? "active" : ""}`}
            onClick={() => setFilter(f.cat)}
          >{f.label}</button>
        ))}
      </div>

      <div className="gr-hub">
        {list.map(g => (
          <div key={g.id} className={`gr-card ${g.cls}`}>
            <span className="gr-icon">{g.icon}</span>
            <h3>{g.title}</h3>
            <p>{g.desc}</p>
            <div className="gr-meta">
              {g.tags.map((t, i) => (
                <span key={i} className="gr-tag" style={{ background: t.bg, color: t.color }}>{t.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardTab() {
  const [tab, setTab] = useState<"week" | "month" | "all">("all");
  const items = [
    { rank: 1, cls: "gr-lb-r1", name: "👑 OtakuKing", stats: "150 اختبار | أفضل سلسلة: 45", score: "12,500" },
    { rank: 2, cls: "gr-lb-r2", name: "🥈 AnimeMaster", stats: "120 اختبار | أفضل سلسلة: 38", score: "10,800" },
    { rank: 3, cls: "gr-lb-r3", name: "🥉 WeebLord", stats: "98 اختبار | أفضل سلسلة: 32", score: "9,200" },
    { rank: 4, cls: "gr-lb-ro", name: "MangaFan", stats: "85 اختبار | أفضل سلسلة: 28", score: "8,100" },
    { rank: 42, cls: "gr-lb-ro", name: "أنت هنا ⭐ | YourName", stats: "45 اختبار | أفضل سلسلة: 12", score: "4,250", me: true },
  ];
  return (
    <div className="gr-section">
      <div className="gr-section-title"><span>🏆</span> لوحة المتصدرين</div>
      <div className="gr-lb-tabs">
        <button className={`gr-lb-tab ${tab === "week" ? "active" : ""}`} onClick={() => setTab("week")}>🏆 هذا الأسبوع</button>
        <button className={`gr-lb-tab ${tab === "month" ? "active" : ""}`} onClick={() => setTab("month")}>📅 هذا الشهر</button>
        <button className={`gr-lb-tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>👑 كل الأوقات</button>
      </div>
      <div className="gr-lb-list">
        {items.map(it => (
          <div key={it.rank} className={`gr-lb-item ${it.me ? "highlight" : ""}`}>
            <div className={`gr-lb-rank ${it.cls}`}>{it.rank}</div>
            <div className="gr-lb-info">
              <div className="gr-lb-name">{it.name}</div>
              <div className="gr-lb-stats">{it.stats}</div>
            </div>
            <div className="gr-lb-score">{it.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewsTab() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      {/* Guess character */}
      <div className="gr-section">
        <div className="gr-section-title"><span>🎭</span> معاينة: خمن الشخصية</div>
        <div className="gr-screen">
          <span className="gr-screen-label">Guess Character</span>
          <h3 style={{ textAlign: "center", marginBottom: 12, color: "#fff" }}>🎭 من هذه الشخصية؟</h3>
          <div className={`gr-silhouette ${revealed ? "revealed" : ""}`} onClick={() => setRevealed(r => !r)}>👒</div>
          <p style={{ color: "var(--gr-text-2)", textAlign: "center", marginBottom: 14 }}>اضغط على الصورة للكشف عن التلميح!</p>
          <div className="gr-options" style={{ maxWidth: 500, margin: "0 auto" }}>
            <button className="gr-option-btn"><span className="gr-option-letter">أ</span> ناروتو أوزوماكي</button>
            <button className="gr-option-btn correct"><span className="gr-option-letter">ب</span> مونكي دي لوفي</button>
            <button className="gr-option-btn"><span className="gr-option-letter">ج</span> إيتشيغو كوروساكي</button>
            <button className="gr-option-btn"><span className="gr-option-letter">د</span> غون فريكس</button>
          </div>
        </div>
      </div>

      {/* Puzzle */}
      <div className="gr-section">
        <div className="gr-section-title"><span>🧩</span> معاينة: بازل الأنمي</div>
        <div className="gr-screen">
          <span className="gr-screen-label">Anime Puzzle</span>
          <h3 style={{ textAlign: "center", marginBottom: 12, color: "#fff" }}>🧩 رتب الصورة</h3>
          <div className="gr-puzzle">
            {[1,2,3,4,null,5,6,7,8].map((n,i) => (
              <div key={i} className={`gr-puzzle-piece ${n===null ? "empty" : ""}`}>{n}</div>
            ))}
          </div>
          <p style={{ color: "var(--gr-text-2)", textAlign: "center", marginTop: 12 }}>اضغط على القطع لتحريكها إلى المكان الفارغ</p>
        </div>
      </div>

      {/* Chain */}
      <div className="gr-section">
        <div className="gr-section-title"><span>🔗</span> معاينة: سلسلة الأنمي</div>
        <div className="gr-screen">
          <span className="gr-screen-label">Anime Chain</span>
          <h3 style={{ textAlign: "center", marginBottom: 12, color: "#fff" }}>🔗 أكمل السلسلة</h3>
          <div className="gr-chain">
            <div className="gr-chain-item">One Piec<strong>e</strong></div>
            <div className="gr-chain-arrow">→</div>
            <div className="gr-chain-item" style={{ borderColor: "var(--gr-green)" }}><strong>E</strong>ren Yaeger</div>
            <div className="gr-chain-arrow">→</div>
            <div className="gr-chain-item" style={{ borderColor: "var(--gr-yellow)" }}><strong>R</strong>urouni Kenshin</div>
            <div className="gr-chain-arrow">→</div>
            <div className="gr-chain-item" style={{ borderColor: "var(--gr-red)", borderStyle: "dashed" }}>?</div>
          </div>
          <p style={{ color: "var(--gr-text-2)", textAlign: "center", marginTop: 12 }}>أدخل أنمي يبدأ بحرف "N"</p>
          <div className="gr-search" style={{ maxWidth: 300, margin: "12px auto 0" }}>
            <input type="text" placeholder="أنمي يبدأ بـ N..." />
          </div>
        </div>
      </div>

      {/* Tournament */}
      <div className="gr-section">
        <div className="gr-section-title"><span>🏆</span> معاينة: بطولة الأوتاكو</div>
        <div className="gr-screen">
          <span className="gr-screen-label">Tournament</span>
          <h3 style={{ textAlign: "center", marginBottom: 12, color: "#fff" }}>🏆 الدور ربع النهائي</h3>
          <div className="gr-bracket">
            <div className="gr-bracket-round">
              <div className="gr-bracket-match">
                <div className="gr-bracket-player winner">👑 OtakuKing</div>
                <div className="gr-bracket-player loser">🎮 GamerX</div>
              </div>
              <div className="gr-bracket-match">
                <div className="gr-bracket-player winner">⭐ AnimeMaster</div>
                <div className="gr-bracket-player loser">🎯 QuizPro</div>
              </div>
            </div>
            <div style={{ fontSize: "1.6rem", color: "var(--gr-purple)" }}>→</div>
            <div className="gr-bracket-round">
              <div className="gr-bracket-match">
                <div className="gr-bracket-player tbd">؟</div>
                <div className="gr-bracket-player tbd">؟</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Question */}
      <div className="gr-section">
        <div className="gr-section-title"><span>🌟</span> معاينة: شاشة السؤال</div>
        <div className="gr-screen">
          <span className="gr-screen-label">Quiz Question</span>
          <div className="gr-q-header">
            <div className="gr-q-score">النقاط: 8/10</div>
            <div className="gr-q-streak">🔥 سلسلة: 5</div>
            <div className="gr-lives"><span>❤️</span><span>❤️</span><span>❤️</span></div>
          </div>
          <div className="gr-timer-bar"><div className="gr-timer-fill" /></div>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span className="gr-pill" style={{ background: "rgba(139,92,246,0.2)", color: C.purple }}>📚 مصطلحات</span>
            <span className="gr-pill" style={{ background: "rgba(34,197,94,0.2)", color: C.green }}>🟢 سهل</span>
          </div>
          <div className="gr-q-text">ما معنى كلمة "Shonen" في عالم الأنمي؟</div>
          <div className="gr-options">
            <button className="gr-option-btn correct"><span className="gr-option-letter">أ</span> صبي / فتى</button>
            <button className="gr-option-btn"><span className="gr-option-letter">ب</span> فتاة</button>
            <button className="gr-option-btn"><span className="gr-option-letter">ج</span> أكشن</button>
            <button className="gr-option-btn wrong"><span className="gr-option-letter">د</span> رومانسية</button>
          </div>
          <div className="gr-feedback">
            <div className="gr-feedback-title">✅ إجابة صحيحة!</div>
            <div className="gr-feedback-text">
              هل تعلم: كلمة Shonen تعني "فتى" وتشير إلى أنمي/مانغا تستهدف الذكور الشباب (12-18 سنة). أمثلة: Naruto, One Piece, My Hero Academia
            </div>
            <button className="gr-next-btn">السؤال التالي →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyLevelTab() {
  return (
    <div className="gr-section">
      <div className="gr-section-title"><span>🏆</span> نتائجي ومستواي</div>
      <div className="gr-screen gr-results">
        <span className="gr-screen-label">Results</span>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff" }}>🎉 انتهى الاختبار!</h2>
        <div className="gr-score-circle"><div className="gr-score-value">75%</div></div>
        <div className="gr-rank-badge">⭐ خبير الأوتاكو</div>
        <div className="gr-results-stats">
          <div className="gr-rstat"><div className="gr-rstat-val">15</div><div className="gr-rstat-lbl">إجابات صحيحة</div></div>
          <div className="gr-rstat"><div className="gr-rstat-val">5</div><div className="gr-rstat-lbl">إجابات خاطئة</div></div>
          <div className="gr-rstat"><div className="gr-rstat-val">8.2s</div><div className="gr-rstat-lbl">متوسط الوقت</div></div>
          <div className="gr-rstat"><div className="gr-rstat-val">7</div><div className="gr-rstat-lbl">أفضل سلسلة</div></div>
        </div>
        <div className="gr-actions">
          <button className="gr-action primary">🔄 العب مرة أخرى</button>
          <button className="gr-action secondary">📤 شارك نتيجتك</button>
          <button className="gr-action secondary">🏠 العودة للقائمة</button>
        </div>
      </div>
    </div>
  );
}

export default function GamesRoomContent({ tab }: { tab: number; color: string }) {
  return (
    <div className="gr-root">
      {tab === 0 && <HubTab />}
      {tab === 1 && <LeaderboardTab />}
      {tab === 2 && <PreviewsTab />}
      {tab === 3 && <MyLevelTab />}
    </div>
  );
}
