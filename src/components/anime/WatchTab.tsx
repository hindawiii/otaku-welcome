import { useEffect, useState } from "react";
import { fetchSeasonalAnime, type AniMedia } from "@/lib/anilist";
import {
  SectionHeader,
  ExternalButton,
  LoadingShimmer,
  ErrorState,
} from "./AnimeShared";

const PLATFORMS = [
  { name: "Crunchyroll", color: "#f47521", url: "https://www.crunchyroll.com/search?q=", icon: "🟠", desc: "مكتبة ضخمة، خطة مجانية مع إعلانات" },
  { name: "Netflix", color: "#e50914", url: "https://www.netflix.com/search?q=", icon: "🔴", desc: "حصريات وأنمي شعبي" },
  { name: "Tubi", color: "#fa382f", url: "https://tubitv.com/search/", icon: "🆓", desc: "مجاني تماماً (مع إعلانات)" },
  { name: "YouTube — Muse Asia", color: "#ff0000", url: "https://www.youtube.com/@MuseAsia/videos", icon: "▶️", desc: "حلقات كاملة رسمية ومجانية" },
];

export default function WatchTab() {
  const [seasonal, setSeasonal] = useState<AniMedia[] | null>(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError(false);
    fetchSeasonalAnime(12)
      .then(setSeasonal)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="ams-tab-content">
      {/* Muse Asia embed */}
      <SectionHeader
        icon="📺"
        title="قناة Muse Asia الرسمية"
        subtitle="حلقات كاملة مجانية ومرخّصة على YouTube"
      />
      <div className="ams-yt-frame">
        <iframe
          src="https://www.youtube.com/embed/videoseries?list=PL3_dh4HFcbNuP4WlVCQQiKwTJjGLeF4yj"
          title="Muse Asia"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
        <ExternalButton href="https://www.youtube.com/@MuseAsia">
          فتح القناة كاملة على YouTube
        </ExternalButton>
      </div>

      {/* Where to watch search */}
      <SectionHeader
        icon="🔍"
        title="أين أشاهد؟"
        subtitle="اكتب اسم الأنمي وسنبحث على المنصّات الرسمية"
      />
      <div className="ams-search-row">
        <input
          className="ams-search-input"
          placeholder="مثال: Demon Slayer, Jujutsu Kaisen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="ams-platforms">
        {PLATFORMS.map((p) => {
          const q = encodeURIComponent(search || "anime");
          return (
            <a
              key={p.name}
              href={search ? `${p.url}${q}` : p.url.replace(/search.*/, "")}
              target="_blank"
              rel="noopener noreferrer"
              className="ams-platform"
              style={{ borderColor: p.color }}
            >
              <div className="ams-platform-icon" style={{ background: p.color }}>
                {p.icon}
              </div>
              <div className="ams-platform-info">
                <div className="ams-platform-name">{p.name}</div>
                <div className="ams-platform-desc">{p.desc}</div>
              </div>
              <div className="ams-platform-cta">بحث ↗</div>
            </a>
          );
        })}
      </div>

      {/* Seasonal anime */}
      <SectionHeader
        icon="🌸"
        title="أنمي هذا الموسم"
        subtitle="مأخوذ من AniList — حسب الشعبية"
      />
      {loading && <LoadingShimmer count={6} />}
      {error && <ErrorState onRetry={load} />}
      {seasonal && (
        <div className="ams-seasonal-grid">
          {seasonal.map((m) => (
            <a
              key={m.id}
              href={m.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ams-seasonal-card"
            >
              <img src={m.coverImage.large} alt={m.title.english || m.title.romaji} loading="lazy" />
              <div className="ams-seasonal-info">
                <div className="ams-seasonal-title">{m.title.english || m.title.romaji}</div>
                <div className="ams-seasonal-meta">
                  {m.format} · {m.episodes ?? "?"} حلقة
                  {m.averageScore != null && <> · ⭐ {(m.averageScore / 10).toFixed(1)}</>}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
