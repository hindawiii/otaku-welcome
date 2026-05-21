type Props = { tab: number; color: string; colorAlt: string };

const GUIDE = [
  { icon: "🎌", title: "ما هي ساحة أوتاكو جو؟", text: "مجتمع عربي للأوتاكو يجمع تعلم اللغات (يابانية/إنجليزية/عربية) مع الأنمي والمانغا والرسم والألعاب والموسيقى." },
  { icon: "🗺️", title: "كيف أبدأ؟", text: "ابدأ بغرفة الاستقبال، ثم اختر شغفك: لغة، رسم، ألعاب، أو موسيقى. كل غرفة فيها دروس وتحديات يومية." },
  { icon: "🏆", title: "نظام النقاط والرتب", text: "اكسب XP من الدروس والمشاركات لترتقي من Genin إلى Hokage. كل رتبة تفتح ميزات جديدة." },
  { icon: "👥", title: "تكوين الأصدقاء", text: "انضم للغرف، شارك في المحادثات، أرسل طلبات صداقة، وكوّن فريقك الأوتاكو الخاص." },
];

const QUIZ = [
  { q: "ما مستواك في اليابانية؟", opts: ["مبتدئ تمامًا", "أعرف الهيراغانا", "JLPT N5-N4", "JLPT N3 فأعلى"] },
  { q: "كم أنمي شاهدت؟", opts: ["أقل من 10", "10-50", "50-200", "أكثر من 200"] },
  { q: "ما اهتمامك الأول؟", opts: ["تعلم اللغة", "الرسم والفن", "الألعاب", "الموسيقى والـ OST"] },
];

const RULES = [
  { n: "1", title: "الاحترام أولاً", text: "احترم جميع الأعضاء بغض النظر عن مستواهم أو ذوقهم في الأنمي." },
  { n: "2", title: "لا سبويلر بدون تحذير", text: "ضع علامة [سبويلر] قبل الكشف عن أحداث مهمة." },
  { n: "3", title: "محتوى عائلي", text: "ممنوع المحتوى غير اللائق أو الـ NSFW في الغرف العامة." },
  { n: "4", title: "العربية لغة الساحة", text: "تواصل بالعربية الفصحى أو المحكية المفهومة، مع استخدام لغات الدراسة في غرفها." },
  { n: "5", title: "ساعد المبتدئين", text: "كن صبورًا مع الجدد، فكلنا بدأنا من الصفر." },
];

const INTRO = [
  { emoji: "🎬", title: "إحصائيات الساحة", items: ["1,247 عضو نشط", "8 غرف متخصصة", "أكثر من 3,400 درس", "152 تحديًا مكتملًا"] },
  { emoji: "⭐", title: "ميزاتنا المميزة", items: ["دروس تفاعلية يومية", "غرف صوتية للممارسة", "نظام Mentor للمبتدئين", "أحداث وتحديات أسبوعية"] },
];

export default function WelcomeRoomContent({ tab, color, colorAlt }: Props) {
  if (tab === 0) return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>دليل المبتدئين</h3>
      <div className="wr-guide">
        {GUIDE.map((g, i) => (
          <div key={i} className="wr-guide-card" style={{ borderColor: `${color}33` }}>
            <div className="wr-guide-icon" style={{ background: `linear-gradient(135deg, ${color}, ${colorAlt})` }}>{g.icon}</div>
            <div><h4>{g.title}</h4><p>{g.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
  if (tab === 1) return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>اختبار تحديد المستوى</h3>
      <div className="wr-quiz">
        {QUIZ.map((q, i) => (
          <div key={i} className="wr-quiz-card" style={{ borderColor: `${color}33` }}>
            <div className="wr-quiz-q">{i + 1}. {q.q}</div>
            <div className="wr-quiz-opts">
              {q.opts.map((o, j) => (
                <button key={j} className="wr-quiz-opt" style={{ borderColor: `${color}40` }}>{o}</button>
              ))}
            </div>
          </div>
        ))}
        <button className="wr-quiz-submit" style={{ background: `linear-gradient(135deg, ${color}, ${colorAlt})` }}>احسب مستواي</button>
      </div>
    </section>
  );
  if (tab === 2) return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>قواعد الساحة</h3>
      <div className="wr-rules">
        {RULES.map((r, i) => (
          <div key={i} className="wr-rule" style={{ borderColor: `${color}33` }}>
            <div className="wr-rule-num" style={{ background: `linear-gradient(135deg, ${color}, ${colorAlt})` }}>{r.n}</div>
            <div><h4>{r.title}</h4><p>{r.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
  return (
    <section className="lr-section">
      <h3 className="lr-title" style={{ color }}>تعريف بالمجتمع</h3>
      <div className="wr-intro">
        {INTRO.map((b, i) => (
          <div key={i} className="wr-intro-card" style={{ borderColor: `${color}33` }}>
            <div className="wr-intro-head"><span>{b.emoji}</span><h4>{b.title}</h4></div>
            <ul>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
