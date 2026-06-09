import { useMemo, useState } from "react";
import { Copy, Check, Gift, Users, Lock, Sparkles } from "lucide-react";

const REFERRAL_CODE = "OTAKU-AHMED-9821";

interface Tier {
  level: number;
  required: number;
  title: string;
  reward: string;
  duration: string;
  emoji: string;
  glow: string;
  border: string;
}

const TIERS: Tier[] = [
  {
    level: 1, required: 3,
    title: "هدية الغابة السحرية",
    reward: "إطار شخصي متحرك من My Neighbor Totoro",
    duration: "4 أيام",
    emoji: "🌳",
    glow: "0 0 30px rgba(72, 187, 120, 0.55)",
    border: "linear-gradient(135deg, #48BB78, #2F855A)",
  },
  {
    level: 2, required: 5,
    title: "هالة السايان المتوهجة",
    reward: "إطار طاقة نيون من Dragon Ball Super",
    duration: "أسبوع كامل",
    emoji: "⚡",
    glow: "0 0 35px rgba(255, 193, 7, 0.65)",
    border: "linear-gradient(135deg, #FFC107, #FF6F00)",
  },
  {
    level: 3, required: 7,
    title: "النينجا الأسطوري",
    reward: "إطار عين الشارينغان من Naruto Shippuden",
    duration: "10 أيام",
    emoji: "🥷",
    glow: "0 0 35px rgba(229, 62, 62, 0.6)",
    border: "linear-gradient(135deg, #E53E3E, #742A2A)",
  },
  {
    level: 4, required: 10,
    title: "ملك القراصنة الفاخر",
    reward: "إطار ذهبي ملكي + قبعة القش + شارة VIP ذهبية ثابتة",
    duration: "14 يوماً",
    emoji: "👑",
    glow: "0 0 40px rgba(255, 215, 0, 0.75)",
    border: "linear-gradient(135deg, #FFD700, #B8860B)",
  },
];

export default function ReferralMatrix({ invited = 4 }: { invited?: number }) {
  const [copied, setCopied] = useState(false);

  const link = `https://otakugo.app/r/${REFERRAL_CODE}`;
  const progress = useMemo(() => {
    const max = TIERS[TIERS.length - 1].required;
    return Math.min(100, (invited / max) * 100);
  }, [invited]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="ogd-referral ogd-animate-in ogd-delay-4">
      <div className="ogd-referral-head">
        <div className="ogd-referral-title">
          <Gift size={18} color="#FFD700" />
          <span>مصفوفة المكافآت — ادعُ الأصدقاء</span>
        </div>
        <div className="ogd-referral-count">
          <Users size={14} />
          <span>{invited} / {TIERS[TIERS.length - 1].required}</span>
        </div>
      </div>

      <div className="ogd-referral-linkbox">
        <code className="ogd-referral-code">{link}</code>
        <button className="ogd-referral-copy" onClick={copy} aria-label="نسخ الرابط">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? "تم النسخ" : "نسخ"}</span>
        </button>
      </div>

      <div className="ogd-referral-progress">
        <div className="ogd-referral-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="ogd-referral-tiers">
        {TIERS.map((t) => {
          const unlocked = invited >= t.required;
          return (
            <div
              key={t.level}
              className={`ogd-tier ${unlocked ? "unlocked" : "locked"}`}
              style={unlocked ? { boxShadow: t.glow } : undefined}
            >
              <div className="ogd-tier-badge" style={{ background: t.border }}>
                <span className="ogd-tier-emoji">{t.emoji}</span>
                {!unlocked && <Lock size={12} className="ogd-tier-lock" />}
              </div>
              <div className="ogd-tier-body">
                <div className="ogd-tier-head-row">
                  <span className="ogd-tier-level">المستوى {t.level}</span>
                  <span className="ogd-tier-req">{t.required} أصدقاء</span>
                </div>
                <div className="ogd-tier-name">
                  {unlocked && <Sparkles size={12} color="#FFD700" />}
                  {t.title}
                </div>
                <div className="ogd-tier-reward">{t.reward}</div>
                <div className="ogd-tier-duration">⏱ {t.duration}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
