import { useState } from "react";
import { LegalBadge, StatsGrid } from "./AnimeShared";
import NewsTab from "./NewsTab";
import WatchTab from "./WatchTab";
import MangaTab from "./MangaTab";
import MusicTab from "./MusicTab";
import "./anime-section.css";

const TABS = [
  { id: "news", label: "أخبار", icon: "📰" },
  { id: "watch", label: "مشاهدة", icon: "📺" },
  { id: "manga", label: "مانجا", icon: "📚" },
  { id: "music", label: "موسيقى", icon: "🎵" },
  { id: "gallery", label: "معرض", icon: "🖼️" },
  { id: "tracking", label: "متابعة", icon: "⭐" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const STATS = [
  { label: "أنمي مفهرس", value: "20K+", icon: "📺" },
  { label: "مانجا", value: "150K+", icon: "📚" },
  { label: "مصادر رسمية", value: "8+", icon: "✓" },
  { label: "تحديث", value: "مباشر", icon: "⚡" },
];

export default function AnimeMangaSection() {
  const [tab, setTab] = useState<TabId>("news");

  return (
    <div className="ams-root">
      {/* Sticky header */}
      <div className="ams-header">
        <div className="ams-header-top">
          <h2 className="ams-title">
            <span className="ams-title-glow">🎌</span> الأنمي والمانجا
          </h2>
          <LegalBadge />
        </div>
        <p className="ams-subtitle">
          أخبار · مشاهدة · قراءة · موسيقى — كل شيء من مصادر رسمية مجانية
        </p>

        <StatsGrid items={STATS} />

        {/* Tabs */}
        <div className="ams-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`ams-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
              role="tab"
              aria-selected={tab === t.id}
            >
              <span className="ams-tab-icon">{t.icon}</span>
              <span className="ams-tab-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="ams-body">
        {tab === "news" && <NewsTab />}
        {tab === "watch" && <WatchTab />}
        {tab === "manga" && <MangaTab />}
        {tab === "music" && <MusicTab />}
        {tab === "gallery" && <ComingSoon icon="🖼️" label="المعرض — المرحلة 3" />}
        {tab === "tracking" && <ComingSoon icon="⭐" label="قوائم المتابعة — المرحلة 3" />}
      </div>
    </div>
  );
}

function ComingSoon({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="ams-coming">
      <div className="ams-coming-icon">{icon}</div>
      <h3>{label}</h3>
      <p>سيتم بناء هذا التبويب في المراحل التالية.</p>
    </div>
  );
}
