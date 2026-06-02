import { useState } from "react";
import { SectionHeader, ExternalButton } from "./AnimeShared";

type Track = {
  id: string;
  title: string;
  artist: string;
  anime: string;
  type: "OP" | "ED" | "OST";
  youtubeId: string;
};

// Official channel uploads / topic videos
const TRACKS: Track[] = [
  { id: "t1", title: "Idol", artist: "YOASOBI", anime: "Oshi no Ko", type: "OP", youtubeId: "ZRtdQ81jPUQ" },
  { id: "t2", title: "Gurenge", artist: "LiSA", anime: "Demon Slayer", type: "OP", youtubeId: "CwkzK-F0Y00" },
  { id: "t3", title: "Kaikai Kitan", artist: "Eve", anime: "Jujutsu Kaisen", type: "OP", youtubeId: "1Pkma-EHbjU" },
  { id: "t4", title: "Unravel", artist: "TK from Ling tosite sigure", anime: "Tokyo Ghoul", type: "OP", youtubeId: "1pLfdl-zZXk" },
  { id: "t5", title: "Cruel Angel's Thesis", artist: "Yoko Takahashi", anime: "Evangelion", type: "OP", youtubeId: "o6wtDPVkKqI" },
  { id: "t6", title: "Silhouette", artist: "KANA-BOON", anime: "Naruto Shippuden", type: "OP", youtubeId: "GswCqRSlHTo" },
  { id: "t7", title: "The Rumbling", artist: "SiM", anime: "Attack on Titan Final", type: "OP", youtubeId: "S-Awd6Ojnwc" },
  { id: "t8", title: "Pretender", artist: "Official髭男dism", anime: "Confidence Man JP", type: "OST", youtubeId: "TQ8WlA2GXbk" },
];

const PLATFORMS = [
  { name: "Spotify — J-Pop Anime", color: "#1DB954", url: "https://open.spotify.com/genre/anime-page", icon: "🎵", desc: "خطة مجانية مع إعلانات" },
  { name: "YouTube Music", color: "#ff0000", url: "https://music.youtube.com/search?q=anime+opening", icon: "▶️", desc: "مجاني بالكامل" },
  { name: "Apple Music Anime", color: "#fc3c44", url: "https://music.apple.com/search?term=anime%20opening", icon: "🎧", desc: "تجربة مجانية" },
  { name: "ANISON Generation", color: "#8b5cf6", url: "https://www.youtube.com/@AnisonGeneration", icon: "🎤", desc: "قناة رسمية على YouTube" },
];

const RADIO_STATIONS = [
  { name: "Anime Radio FM", url: "https://www.youtube.com/results?search_query=anime+radio+24%2F7" },
  { name: "Lofi Anime Beats", url: "https://www.youtube.com/results?search_query=lofi+anime+24%2F7" },
  { name: "J-Pop Hits Live", url: "https://www.youtube.com/results?search_query=jpop+live+radio" },
];

export default function MusicTab() {
  const [active, setActive] = useState<Track>(TRACKS[0]);
  const [filter, setFilter] = useState<"ALL" | "OP" | "ED" | "OST">("ALL");

  const filtered = TRACKS.filter((t) => filter === "ALL" || t.type === filter);

  return (
    <div className="ams-tab-content">
      {/* Now playing */}
      <SectionHeader
        icon="▶️"
        title="يُشغَّل الآن"
        subtitle={`${active.title} — ${active.artist}`}
      />
      <div className="ams-yt-frame">
        <iframe
          key={active.youtubeId}
          src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=0&modestbranding=1&rel=0`}
          title={active.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Filter */}
      <SectionHeader icon="🎼" title="قائمة التشغيل" subtitle="انقر لتشغيل المقطع" />
      <div className="ams-cat-bar">
        {(["ALL", "OP", "ED", "OST"] as const).map((f) => (
          <button
            key={f}
            className={`ams-cat-pill ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "الكل" : f}
          </button>
        ))}
      </div>

      {/* Track list */}
      <div className="ams-track-list">
        {filtered.map((t, i) => (
          <button
            key={t.id}
            className={`ams-track ${active.id === t.id ? "active" : ""}`}
            onClick={() => setActive(t)}
          >
            <span className="ams-track-num">{i + 1}</span>
            <div className="ams-track-info">
              <div className="ams-track-title">{t.title}</div>
              <div className="ams-track-meta">
                {t.artist} · <em>{t.anime}</em>
              </div>
            </div>
            <span className="ams-track-badge">{t.type}</span>
          </button>
        ))}
      </div>

      {/* Music platforms */}
      <SectionHeader
        icon="🎧"
        title="منصّات موسيقى رسمية"
        subtitle="استمع لمكتبات أنمي كاملة"
      />
      <div className="ams-platforms">
        {PLATFORMS.map((p) => (
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

      {/* Radio */}
      <SectionHeader icon="📻" title="بث مباشر 24/7" />
      <div className="ams-radio-grid">
        {RADIO_STATIONS.map((r) => (
          <ExternalButton key={r.name} href={r.url} variant="ghost">
            📡 {r.name}
          </ExternalButton>
        ))}
      </div>
    </div>
  );
}
