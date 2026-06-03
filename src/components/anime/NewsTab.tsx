import { useEffect, useState } from "react";
import {
  fetchTrendingAnime,
  fetchAiringSchedule,
  type AniMedia,
} from "@/lib/anilist";
import {
  SectionHeader,
  ExternalButton,
  CountdownTimer,
  LoadingShimmer,
  ErrorState,
} from "./AnimeShared";

const NEWS_CATEGORIES = [
  { id: "all", label: "الكل", icon: "📰" },
  { id: "anime", label: "إعلانات", icon: "🎬" },
  { id: "manga", label: "مانجا", icon: "📚" },
  { id: "games", label: "ألعاب", icon: "🎮" },
  { id: "studios", label: "استوديوهات", icon: "🏢" },
  { id: "va", label: "مؤدّو الصوت", icon: "🎙️" },
];

const STUDIO_ACCOUNTS = [
  { name: "MAPPA", handle: "@MAPPA_Info", url: "https://twitter.com/MAPPA_Info", color: "#e94560" },
  { name: "Ufotable", handle: "@ufotable", url: "https://twitter.com/ufotable", color: "#f59e0b" },
  { name: "WIT Studio", handle: "@witstudio_jp", url: "https://twitter.com/witstudio_jp", color: "#06b6d4" },
  { name: "Bones", handle: "@bones_official", url: "https://twitter.com/bones_official", color: "#8b5cf6" },
  { name: "Toei Animation", handle: "@toei_anime_PR", url: "https://twitter.com/toei_anime_PR", color: "#10b981" },
  { name: "MADHOUSE", handle: "@madhouse_co_ltd", url: "https://twitter.com/madhouse_co_ltd", color: "#ec4899" },
];

export default function NewsTab() {
  const [trending, setTrending] = useState<AniMedia[] | null>(null);
  const [airing, setAiring] = useState<AniMedia[] | null>(null);
  const [error, setError] = useState(false);
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError(false);
    Promise.all([fetchTrendingAnime(8), fetchAiringSchedule(8)])
      .then(([t, a]) => {
        setTrending(t);
        setAiring(a);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="ams-tab-content">
      {/* Category filter */}
      <div className="ams-cat-grid">
        {NEWS_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`ams-cat-pill ${cat === c.id ? "active" : ""}`}
            onClick={() => setCat(c.id)}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Upcoming episodes countdown */}
      <SectionHeader
        icon="⏰"
        title="الحلقات القادمة"
        subtitle="عدّ تنازلي مباشر للحلقات الجديدة"
      />
      {loading && <LoadingShimmer count={4} />}
      {error && <ErrorState onRetry={load} />}
      {airing && (
        <div className="ams-countdown-grid">
          {airing.slice(0, 6).map((m) => (
            <div key={m.id} className="ams-countdown-card">
              <img src={m.coverImage.large} alt={m.title.english || m.title.romaji} loading="lazy" />
              <div className="ams-countdown-info">
                <div className="ams-countdown-title">{m.title.english || m.title.romaji}</div>
                <div className="ams-countdown-ep">
                  حلقة {m.nextAiringEpisode!.episode} خلال:{" "}
                  <CountdownTimer seconds={m.nextAiringEpisode!.timeUntilAiring} />
                </div>
                {m.siteUrl && (
                  <ExternalButton href={m.siteUrl} variant="ghost">
                    AniList
                  </ExternalButton>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trending news cards */}
      <SectionHeader icon="🔥" title="الأكثر رواجاً" subtitle="مأخوذ مباشرة من AniList" />
      {trending && (
        <div className="ams-news-grid">
          {trending.map((m) => (
            <article key={m.id} className="ams-news-card">
              <div
                className="ams-news-cover"
                style={{
                  backgroundImage: `url(${m.coverImage.large})`,
                  borderColor: m.coverImage.color || "#e94560",
                }}
              >
                {m.averageScore != null && (
                  <span className="ams-score">⭐ {(m.averageScore / 10).toFixed(1)}</span>
                )}
              </div>
              <div className="ams-news-body">
                <div className="ams-news-tags">
                  {(m.genres || []).slice(0, 2).map((g) => (
                    <span key={g} className="ams-tag">
                      {g}
                    </span>
                  ))}
                </div>
                <h4 className="ams-news-title">{m.title.english || m.title.romaji}</h4>
                {m.description && (
                  <p className="ams-news-desc">
                    {m.description.replace(/<[^>]+>/g, "").slice(0, 110)}…
                  </p>
                )}
                {m.siteUrl && <ExternalButton href={m.siteUrl}>تفاصيل</ExternalButton>}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Studio Twitter accounts */}
      <SectionHeader
        icon="🐦"
        title="حسابات الاستوديوهات الرسمية"
        subtitle="تابع آخر الأخبار مباشرة من المصدر"
      />
      <div className="ams-studio-grid">
        {STUDIO_ACCOUNTS.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ams-studio-card"
            style={{ borderColor: s.color }}
          >
            <div className="ams-studio-name" style={{ color: s.color }}>
              {s.name}
            </div>
            <div className="ams-studio-handle">{s.handle}</div>
            <div className="ams-studio-cta">عرض على X ↗</div>
          </a>
        ))}
      </div>
    </div>
  );
}
