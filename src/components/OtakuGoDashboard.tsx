import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Search,
  MessageCircle,
  Castle,
  Tv,
  User,
  Heart,
  MessageSquare,
  Share2,
  ChevronLeft,
  Gamepad2,
  Medal,
  List,
  LineChart,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import AnimeMangaSection from "./anime/AnimeMangaSection";
import "./otaku-go-dashboard.css";

type Section = "messages" | "square" | "anime" | "profile";

export default function OtakuGoDashboard() {
  const [section, setSection] = useState<Section>("square");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = starsRef.current;
    if (!c) return;
    c.innerHTML = "";
    for (let i = 0; i < 60; i++) {
      const s = document.createElement("div");
      s.className = "ogd-star";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
      s.style.setProperty("--opacity", String(Math.random() * 0.8 + 0.2));
      s.style.animationDelay = Math.random() * 5 + "s";
      c.appendChild(s);
    }
  }, []);

  const toggleLike = (id: string) =>
    setLiked((p) => ({ ...p, [id]: !p[id] }));



  return (
    <div className="ogd-root" dir="rtl">
      <div className="ogd-stars" ref={starsRef} />

      <div className="ogd-top-bar">
        <div className="ogd-logo">أوتاكو جو</div>
        <div className="ogd-actions">
          <button aria-label="إشعارات"><Bell size={18} /></button>
          <button aria-label="بحث"><Search size={18} /></button>
          <div
            className="ogd-avatar-top"
            onClick={() => setSection("profile")}
          >
            أ
          </div>
        </div>
      </div>

      <div className="ogd-main">
        {section === "messages" && (
          <div>
            <div className="ogd-search-bar">
              <Search size={16} color="#a0a0c0" />
              <input type="text" placeholder="ابحث في المحادثات..." />
            </div>
            <div className="ogd-chat-list">
              {[
                { type: "group", avatar: "🍥", name: "مجموعة ناروتو 🍥", preview: "الحلقة 289 نزلت! 🔥", time: "1:15", badge: "5" },
                { type: "private", avatar: "أ", name: "أحمد الأوتاكو", preview: "شفت الحلقة الجديدة من One Piece؟", time: "2:30", badge: "2", online: true, color: "linear-gradient(135deg, #FF6B6B, #FF8E8E)" },
                { type: "bot", avatar: "🤖", name: "بوت الأنمي", preview: "📢 One Piece - فصل جديد نزل!", time: "12:00" },
                { type: "private", avatar: "س", name: "سارة", preview: "رسمت شخصية من JJK، شوفي!", time: "أمس", color: "linear-gradient(135deg, #9B59B6, #8E44AD)" },
                { type: "group", avatar: "⚔️", name: "مجموعة Attack on Titan", preview: "نظريات عن النهاية؟ 🤔", time: "أمس", badge: "12" },
                { type: "private", avatar: "م", name: "محمد", preview: "تعال نلعب Genshin", time: "منذ يومين", online: true, color: "linear-gradient(135deg, #3498DB, #2980B9)" },
              ].map((c, i) => (
                <div key={i} className={`ogd-chat-item ogd-animate-in ogd-delay-${Math.min(i, 5)}`}>
                  <div
                    className={`ogd-chat-avatar ${c.type === "group" ? "group" : ""} ${c.type === "bot" ? "bot" : ""} ${c.online ? "online" : ""}`}
                    style={c.color ? { background: c.color } : undefined}
                  >
                    {c.avatar}
                  </div>
                  <div className="ogd-chat-info">
                    <div className="ogd-chat-name">{c.name}</div>
                    <div className="ogd-chat-preview">{c.preview}</div>
                  </div>
                  <div className="ogd-chat-meta">
                    <div className="ogd-time">{c.time}</div>
                    {c.badge && <span className="ogd-badge">{c.badge}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "square" && (
          <div>
            <div className="ogd-section-header ogd-animate-in">
              <h2><Castle size={22} className="ogd-icon-accent" /> ساحة الأوتاكو</h2>
            </div>

            <div className="ogd-grid">
              <div className="ogd-grid-row">
                <Link to="/room/$id" params={{ id: "welcome" }} className="ogd-card ogd-card-small ogd-animate-in ogd-card-link">
                  <div>
                    <div className="ogd-card-icon">🎌</div>
                    <div className="ogd-card-title">استقبال الجدد</div>
                    <div className="ogd-card-desc">دليل المبتدئين واختبار المستوى</div>
                  </div>
                  <div className="ogd-card-users">
                    <div className="ogd-user-dots">
                      <span style={{ background: "#FF6B6B" }}>أ</span>
                      <span style={{ background: "#4ECDC4" }}>س</span>
                      <span style={{ background: "#FFE66D", color: "#333" }}>م</span>
                    </div>
                    <span>+124 نشط</span>
                  </div>
                </Link>

                <Link to="/room/$id" params={{ id: "jp" }} className="ogd-card ogd-card-wide ogd-animate-in ogd-delay-1 ogd-card-link">
                  <div className="ogd-card-badge">🔥 شائع</div>
                  <div>
                    <div className="ogd-card-icon">📚</div>
                    <div className="ogd-card-title">تعلم اليابانية</div>
                    <div className="ogd-card-desc">روماجي، كانا، كانجي + بوت تعليمي</div>
                  </div>
                  <div className="ogd-card-users">
                    <div className="ogd-user-dots">
                      <span style={{ background: "#E74C3C" }}>ي</span>
                      <span style={{ background: "#3498DB" }}>ا</span>
                      <span style={{ background: "#9B59B6" }}>ب</span>
                    </div>
                    <span>+89 يتعلمون</span>
                  </div>
                </Link>
              </div>

              <div className="ogd-grid-row">
                <Link to="/room/$id" params={{ id: "en" }} className="ogd-card ogd-card-wide english ogd-animate-in ogd-delay-2 ogd-card-link">
                  <div>
                    <div className="ogd-card-icon">🇬🇧</div>
                    <div className="ogd-card-title">تعلم الإنجليزية</div>
                    <div className="ogd-card-desc">للأوتاكو + مصطلحات أنمي</div>
                  </div>
                  <div className="ogd-card-users">
                    <div className="ogd-user-dots">
                      <span style={{ background: "#1E3799" }}>E</span>
                      <span style={{ background: "#3498DB" }}>A</span>
                    </div>
                    <span>+56 يتعلمون</span>
                  </div>
                </Link>

                <Link to="/room/$id" params={{ id: "ar" }} className="ogd-card ogd-card-small arabic ogd-animate-in ogd-delay-3 ogd-card-link">
                  <div>
                    <div className="ogd-card-icon">🕌</div>
                    <div className="ogd-card-title">العربية الفصحى</div>
                    <div className="ogd-card-desc">تحديات يومية وبلاغة</div>
                  </div>
                  <div className="ogd-card-users">
                    <div className="ogd-user-dots">
                      <span style={{ background: "#27AE60" }}>ع</span>
                      <span style={{ background: "#2ECC71" }}>ف</span>
                    </div>
                    <span>+43 نشط</span>
                  </div>
                </Link>
              </div>

              <Link to="/room/$id" params={{ id: "drawing" }} className="ogd-card ogd-card-full ogd-animate-in ogd-delay-4 ogd-card-link">
                <div className="ogd-card-badge" style={{ color: "#9B59B6" }}>🎨 جديد</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "3rem" }}>🎨</div>
                  <div>
                    <div className="ogd-card-title" style={{ fontSize: "1.2rem" }}>تعلم الرسم</div>
                    <div className="ogd-card-desc">دروس رسم الأنمي + تحديات أسبوعية + معرض التقدم</div>
                    <div className="ogd-card-users" style={{ marginTop: 8 }}>
                      <div className="ogd-user-dots">
                        <span style={{ background: "#9B59B6" }}>ر</span>
                        <span style={{ background: "#E91E63" }}>ف</span>
                        <span style={{ background: "#FF6B6B" }}>أ</span>
                        <span style={{ background: "#4ECDC4" }}>س</span>
                      </div>
                      <span>+67 رسام نشط</span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="ogd-subsection-title">
                <Gamepad2 size={16} color="#F39C12" />
                أقسام الساحة
              </div>

              <Link to="/room/$id" params={{ id: "games" }} className="ogd-card ogd-card-full ogd-animate-in ogd-card-link" style={{ background: "linear-gradient(145deg, rgba(243,156,18,0.18), rgba(243,156,18,0.05))", borderTop: "3px solid #F39C12" }}>
                <div className="ogd-card-badge" style={{ color: "#F39C12" }}>🎮 رائج</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "3rem" }}>🎮</div>
                  <div>
                    <div className="ogd-card-title" style={{ fontSize: "1.2rem" }}>الألعاب</div>
                    <div className="ogd-card-desc">أخبار · تصنيف · غرف لعب · بطولات</div>
                    <div className="ogd-card-users" style={{ marginTop: 8 }}>
                      <span style={{ color: "#F39C12", fontWeight: 700 }}>+234 لاعب نشط</span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/room/$id" params={{ id: "arts" }} className="ogd-card-image ogd-animate-in ogd-delay-2 ogd-card-link">
                <div className="ogd-bg-image" />
                <div className="ogd-bg-pattern" />
                <div className="ogd-overlay">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: "2rem" }}>🎨</span>
                    <div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>قسم الفنون</div>
                      <div style={{ fontSize: "0.85rem", color: "#a0a0c0" }}>Fan Art · Cosplay · تصوير</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                    <span style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 10, fontSize: "0.75rem" }}>📤 ارفع عملك</span>
                    <span style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 10, fontSize: "0.75rem" }}>❤️ تصويت</span>
                    <span style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 10, fontSize: "0.75rem" }}>🏆 تحدي</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {section === "anime" && <AnimeMangaSection />}


        {section === "profile" && (
          <div>
            <div className="ogd-profile-header ogd-animate-in">
              <div className="ogd-profile-banner" aria-hidden="true" />
              <div className="ogd-avatar-large">أ</div>
              <div className="ogd-profile-name">أحمد الأوتاكو</div>
              <div className="ogd-profile-rank">
                <span>⭐⭐⭐</span>
                <span>نجم ذهبي (المستوى 5)</span>
              </div>
            </div>

            <div className="ogd-stats-row ogd-animate-in ogd-delay-1">
              <div className="ogd-stat-item"><span className="ogd-stat-num">50</span><div className="ogd-stat-label">📺 أنمي</div></div>
              <div className="ogd-stat-item"><span className="ogd-stat-num">30</span><div className="ogd-stat-label">📚 مانجا</div></div>
              <div className="ogd-stat-item"><span className="ogd-stat-num">12</span><div className="ogd-stat-label">🏆 شارة</div></div>
            </div>

            <div className="ogd-badges-section ogd-animate-in ogd-delay-2">
              <h3><Medal size={18} color="#FFE66D" /> الإنجازات</h3>
              <div className="ogd-badges-grid">
                {[
                  ["🥷", "خبير النينجا", "legendary"],
                  ["🗡️", "سياف", "rare"],
                  ["🎌", "ياباني مبتدئ", "common"],
                  ["🎨", "رسام ماهر", "rare"],
                  ["🎮", "لاعب محترف", "rare"],
                  ["🎵", "عشق الموسيقى", "common"],
                  ["👑", "ملك الأوتاكو", "legendary"],
                  ["📚", "قارئ نهم", "common"],
                ].map(([i, t, r]) => (
                  <div key={t} className={`ogd-badge-item ${r}`}>
                    <span>{i}</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>


            <div className="ogd-lists-section ogd-animate-in ogd-delay-3">
              <h3><List size={18} color="#FF6B6B" /> قوائمي</h3>
              {[
                { bg: "linear-gradient(135deg, #E74C3C, #C0392B)", icon: "❤️", title: "المفضلة", count: "15 أنمي · 8 مانجا" },
                { bg: "linear-gradient(135deg, #3498DB, #2980B9)", icon: "▶️", title: "أشاهده الآن", count: "3 أنمي · 2 مانجا" },
                { bg: "linear-gradient(135deg, #9B59B6, #8E44AD)", icon: "📌", title: "سأشاهده لاحقاً", count: "20 أنمي · 12 مانجا" },
                { bg: "linear-gradient(135deg, #27AE60, #2ECC71)", icon: "✅", title: "تم الانتهاء", count: "32 أنمي · 18 مانجا" },
              ].map((l) => (
                <div key={l.title} className="ogd-list-card">
                  <div className="ogd-list-icon" style={{ background: l.bg }}>{l.icon}</div>
                  <div className="ogd-list-info">
                    <div className="ogd-list-title">{l.title}</div>
                    <div className="ogd-list-count">{l.count}</div>
                  </div>
                  <div className="ogd-list-arrow"><ChevronLeft size={16} /></div>
                </div>
              ))}
            </div>

            <div className="ogd-lists-section ogd-animate-in ogd-delay-4">
              <h3><LineChart size={18} color="#4ECDC4" /> نشاطي</h3>
              <div className="ogd-list-card">
                <div className="ogd-list-icon" style={{ background: "rgba(255,255,255,0.1)" }}>💬</div>
                <div className="ogd-list-info">
                  <div className="ogd-list-title">آخر تعليق</div>
                  <div className="ogd-list-count">"نظريات عن نهاية AOT..." في ساحة الأوتاكو</div>
                </div>
                <div className="ogd-list-arrow"><ChevronLeft size={16} /></div>
              </div>
              <div className="ogd-list-card">
                <div className="ogd-list-icon" style={{ background: "rgba(255,255,255,0.1)" }}>📖</div>
                <div className="ogd-list-info">
                  <div className="ogd-list-title">آخر مانجا مقروءة</div>
                  <div className="ogd-list-count">One Piece - الفصل 1122</div>
                </div>
                <div className="ogd-list-arrow"><ChevronLeft size={16} /></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ogd-bottom-nav">
        {([
          ["messages", MessageCircle, "الرسائل"],
          ["square", Castle, "الساحة"],
          ["anime", Tv, "أنمي"],
          ["profile", User, "ملفي"],
        ] as [Section, typeof MessageCircle, string][]).map(([k, Icon, l]) => (
          <button
            key={k}
            className={`ogd-nav-item ${section === k ? "active" : ""}`}
            onClick={() => setSection(k)}
          >
            <Icon size={22} />
            <span>{l}</span>
          </button>
        ))}
        <Link
          to="/room/$id"
          params={{ id: "games" }}
          className="ogd-nav-item"
          aria-label="الألعاب"
        >
          <Gamepad2 size={22} />
          <span>الألعاب</span>
        </Link>
      </div>
    </div>
  );
}
