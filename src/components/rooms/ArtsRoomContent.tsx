const GALLERY = [
  { emoji: "🌸", title: "Sakura Portrait", artist: "Yuki", likes: 234 },
  { emoji: "⚔️", title: "Samurai Sunset", artist: "Kenji", likes: 189 },
  { emoji: "🐉", title: "Dragon Ink", artist: "Hana", likes: 312 },
  { emoji: "🏯", title: "Edo Castle", artist: "Akira", likes: 156 },
  { emoji: "🌊", title: "Great Wave", artist: "Mio", likes: 278 },
  { emoji: "🦊", title: "Kitsune Spirit", artist: "Rei", likes: 201 },
];
const COSPLAY = [
  { char: "Nezuko", anime: "Demon Slayer", by: "Hana", likes: 421 },
  { char: "Zero Two", anime: "Darling in the Franxx", by: "Mio", likes: 389 },
  { char: "Levi", anime: "Attack on Titan", by: "Kenji", likes: 356 },
  { char: "Marin", anime: "Sono Bisque Doll", by: "Yuki", likes: 298 },
];
const PHOTOS = [
  { title: "Akihabara Night", by: "Akira" },
  { title: "Shibuya Crossing", by: "Lina" },
  { title: "Kyoto Temple", by: "Rei" },
  { title: "Mt. Fuji Dawn", by: "Kenji" },
];
const LEVELS = [
  { label: "Fan Art", value: 55 },
  { label: "Cosplay", value: 30 },
  { label: "تصوير", value: 65 },
  { label: "تصميم", value: 45 },
];

export default function ArtsRoomContent({ tab, color, colorAlt }: { tab: number; color: string; colorAlt: string }) {
  if (tab === 0)
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>معرض Fan Art</h3>
        <div className="ar-gallery">
          {GALLERY.map((g, i) => (
            <div key={i} className="ar-art" style={{ borderColor: `${color}40` }}>
              <div className="ar-art-img" style={{ background: `linear-gradient(135deg, ${color}33, ${colorAlt}1a)` }}>{g.emoji}</div>
              <div className="ar-art-info">
                <div className="ar-art-title">{g.title}</div>
                <div className="ar-art-artist">@{g.artist} · ❤️ {g.likes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (tab === 1)
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>أعمال Cosplay</h3>
        <div className="ar-cosplay">
          {COSPLAY.map((c, i) => (
            <div key={i} className="ar-cos" style={{ borderColor: `${color}40` }}>
              <div className="ar-cos-char" style={{ color }}>👘 {c.char}</div>
              <div className="ar-cos-anime">{c.anime}</div>
              <div className="ar-cos-meta">@{c.by} · ❤️ {c.likes}</div>
            </div>
          ))}
        </div>
      </div>
    );
  if (tab === 2)
    return (
      <div className="lr-section">
        <h3 className="lr-title" style={{ color }}>التصوير</h3>
        <div className="ar-photos">
          {PHOTOS.map((p, i) => (
            <div key={i} className="ar-photo" style={{ borderColor: `${color}40`, background: `linear-gradient(135deg, ${color}26, ${colorAlt}0d)` }}>
              <div className="ar-photo-icon">📸</div>
              <div className="ar-photo-title">{p.title}</div>
              <div className="ar-photo-by">@{p.by}</div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="lr-section">
      <h3 className="lr-title" style={{ color }}>مستواي الفني</h3>
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
