import { useEffect, useState } from "react";
import { fetchTrendingManga, type AniMedia } from "@/lib/anilist";
import {
  SectionHeader,
  ExternalButton,
  LoadingShimmer,
  ErrorState,
} from "./AnimeShared";

const MANGA_PLATFORMS = [
  {
    name: "MANGA Plus by SHUEISHA",
    color: "#d32f2f",
    url: "https://mangaplus.shueisha.co.jp/",
    icon: "📕",
    desc: "أحدث الفصول مجاناً ورسمياً (One Piece, JJK, MHA...)",
  },
  {
    name: "VIZ Media — Shonen Jump",
    color: "#1976d2",
    url: "https://www.viz.com/shonenjump",
    icon: "📘",
    desc: "أحدث 3 فصول + أول 3 فصول مجاناً",
  },
  {
    name: "Webtoons",
    color: "#00d564",
    url: "https://www.webtoons.com/",
    icon: "📗",
    desc: "مانهوا/ويبتون كورية ومجانية بالكامل",
  },
  {
    name: "ComiXology — Free",
    color: "#f57c00",
    url: "https://www.amazon.com/comixology",
    icon: "📙",
    desc: "مجموعة فصول وعروض مجانية رسمية",
  },
];

const GENRES = [
  { id: "", label: "الكل", icon: "📚" },
  { id: "Action", label: "أكشن", icon: "⚔️" },
  { id: "Romance", label: "رومانسي", icon: "💖" },
  { id: "Comedy", label: "كوميدي", icon: "😂" },
  { id: "Fantasy", label: "فانتازيا", icon: "🐉" },
  { id: "Horror", label: "رعب", icon: "👻" },
  { id: "Sci-Fi", label: "خيال علمي", icon: "🚀" },
  { id: "Slice of Life", label: "حياة يومية", icon: "🍵" },
  { id: "Sports", label: "رياضة", icon: "⚽" },
];

export default function MangaTab() {
  const [manga, setManga] = useState<AniMedia[] | null>(null);
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = (g: string) => {
    setLoading(true);
    setError(false);
    fetchTrendingManga(12, g || undefined)
      .then(setManga)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(genre);
  }, [genre]);

  return (
    <div className="ams-tab-content">
      {/* Legal platforms */}
      <SectionHeader
        icon="✓"
        title="منصّات قراءة رسمية ومجانية"
        subtitle="ادعم المبدعين — اقرأ من المصدر الأصلي"
      />
      <div className="ams-platforms">
        {MANGA_PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.url}
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
            <div className="ams-platform-cta">فتح ↗</div>
          </a>
        ))}
      </div>

      {/* Search */}
      <SectionHeader icon="🔍" title="ابحث عن مانجا" />
      <div className="ams-search-row">
        <input
          className="ams-search-input"
          placeholder="مثال: One Piece, Chainsaw Man..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ExternalButton
          href={`https://mangaplus.shueisha.co.jp/search_result?keyword=${encodeURIComponent(
            search || "manga",
          )}`}
        >
          بحث
        </ExternalButton>
      </div>

      {/* Genres */}
      <SectionHeader icon="🏷️" title="تصفّح حسب التصنيف" />
      <div className="ams-cat-bar">
        {GENRES.map((g) => (
          <button
            key={g.id || "all"}
            className={`ams-cat-pill ${genre === g.id ? "active" : ""}`}
            onClick={() => setGenre(g.id)}
          >
            <span>{g.icon}</span> {g.label}
          </button>
        ))}
      </div>

      {/* Trending manga grid */}
      <SectionHeader icon="🔥" title="الأكثر رواجاً" subtitle="مصدر البيانات: AniList" />
      {loading && <LoadingShimmer count={6} />}
      {error && <ErrorState onRetry={() => load(genre)} />}
      {manga && !loading && (
        <div className="ams-seasonal-grid">
          {manga.map((m) => (
            <a
              key={m.id}
              href={m.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ams-seasonal-card"
            >
              <img
                src={m.coverImage.large}
                alt={m.title.english || m.title.romaji}
                loading="lazy"
              />
              <div className="ams-seasonal-info">
                <div className="ams-seasonal-title">
                  {m.title.english || m.title.romaji}
                </div>
                <div className="ams-seasonal-meta">
                  {m.format || "MANGA"}
                  {m.averageScore != null && (
                    <> · ⭐ {(m.averageScore / 10).toFixed(1)}</>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
