type Track = { title: string; anime: string; type: "OP" | "ED" | "OST"; plays: string };

const TRACKS: Track[] = [
  { title: "Gurenge", anime: "Demon Slayer", type: "OP", plays: "2.1M" },
  { title: "Unravel", anime: "Tokyo Ghoul", type: "OP", plays: "1.8M" },
  { title: "Kaikai Kitan", anime: "Jujutsu Kaisen", type: "OP", plays: "1.5M" },
  { title: "Silhouette", anime: "Naruto Shippuden", type: "OP", plays: "1.3M" },
  { title: "Lost in Paradise", anime: "Jujutsu Kaisen", type: "ED", plays: "980K" },
  { title: "Shinzou wo Sasageyo", anime: "Attack on Titan", type: "OP", plays: "2.4M" },
];

const ROOMS = [
  { name: "غرفة AOT OSTs", listeners: 23, host: "Yuki" },
  { name: "City Pop Vibes", listeners: 14, host: "Kenji" },
  { name: "Lo-Fi Anime Mix", listeners: 38, host: "Mio" },
];

const PLAYLISTS = [
  { name: "Shounen Energy 🔥", count: 42 },
  { name: "Sad Anime OST 💔", count: 28 },
  { name: "Studio Ghibli ✨", count: 35 },
  { name: "J-Pop Hits 🎤", count: 56 },
];

const LEVELS = [
  { label: "اكتشاف", value: 65 },
  { label: "تقييمات", value: 40 },
  { label: "Playlists", value: 50 },
  { label: "نشاط", value: 70 },
];

export default function MusicRoomContent({ tab, color, colorAlt }: { tab: number; color: string; colorAlt: string }) {
  if (tab === 0)
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>أشهر الأغاني</h3>
        <div className="mr-tracks">
          {TRACKS.map((t, i) => (
            <div key={i} className="mr-track" style={{ borderColor: `${color}40` }}>
              <div className="mr-track-num" style={{ color }}>#{i + 1}</div>
              <div className="mr-track-info">
                <div className="mr-track-title">{t.title}</div>
                <div className="mr-track-anime">{t.anime}</div>
              </div>
              <span className="mr-track-tag" style={{ background: `${color}26`, color }}>{t.type}</span>
              <div className="mr-track-plays">▶ {t.plays}</div>
            </div>
          ))}
        </div>
      </div>
    );
  if (tab === 1)
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>غرف استماع جماعي</h3>
        <div className="mr-rooms">
          {ROOMS.map((r, i) => (
            <div key={i} className="mr-room" style={{ borderColor: `${color}40` }}>
              <div className="mr-room-pulse" style={{ background: color }} />
              <div className="mr-room-info">
                <div className="mr-room-name">{r.name}</div>
                <div className="mr-room-host">يستضيف: {r.host}</div>
              </div>
              <div className="mr-room-listeners" style={{ color }}>🎧 {r.listeners}</div>
            </div>
          ))}
        </div>
      </div>
    );
  if (tab === 2)
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>قوائم التشغيل</h3>
        <div className="mr-playlists">
          {PLAYLISTS.map((p, i) => (
            <div key={i} className="mr-playlist" style={{ background: `linear-gradient(135deg, ${color}33, ${colorAlt}1a)`, borderColor: `${color}40` }}>
              <div className="mr-playlist-name">{p.name}</div>
              <div className="mr-playlist-count">{p.count} أغنية</div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="lr-section">
      <h3 className="lr-title" style={{ color }}>مستواي الموسيقي</h3>
      <div className="lr-level-list">
        {LEVELS.map((l, i) => (
          <div key={i} className="lr-level-row">
            <div className="lr-level-head"><span>{l.label}</span><span style={{ color }}>{l.value}%</span></div>
            <div className="lr-level-bar">
              <div className="lr-level-fill" style={{ width: `${l.value}%`, background: `linear-gradient(90deg, ${color}, ${colorAlt})` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
