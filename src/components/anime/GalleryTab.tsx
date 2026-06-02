import { useEffect, useState } from "react";
import { fetchTrendingAnime, type AniMedia } from "@/lib/anilist";
import { SectionHeader, LoadingShimmer, ErrorState, ExternalButton } from "./AnimeShared";

export default function GalleryTab() {
  const [items, setItems] = useState<AniMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [active, setActive] = useState<AniMedia | null>(null);

  const load = () => {
    setLoading(true);
    setErr(false);
    fetchTrendingAnime(24)
      .then((d) => setItems(d.filter((m) => m.bannerImage || m.coverImage?.large)))
      .catch(() => setErr(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="ams-tab-content">
      <SectionHeader
        icon="🖼️"
        title="معرض الصور والخلفيات"
        subtitle="صور وخلفيات رسمية من AniList — للاستخدام الشخصي فقط"
      />

      {loading && <LoadingShimmer count={9} />}
      {err && !loading && <ErrorState onRetry={load} />}

      {!loading && !err && (
        <div className="ams-gallery-grid">
          {items.map((m) => {
            const img = m.bannerImage || m.coverImage.large;
            return (
              <button
                key={m.id}
                className="ams-gallery-item"
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => setActive(m)}
                aria-label={m.title.english || m.title.romaji}
              >
                <span className="ams-gallery-caption">
                  {m.title.english || m.title.romaji}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {active && (
        <div className="ams-modal" onClick={() => setActive(null)}>
          <div className="ams-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="ams-modal-close" onClick={() => setActive(null)}>
              ✕
            </button>
            <img
              src={active.bannerImage || active.coverImage.large}
              alt={active.title.english || active.title.romaji}
              className="ams-modal-img"
            />
            <div className="ams-modal-body">
              <h3>{active.title.english || active.title.romaji}</h3>
              {active.title.native && (
                <p className="ams-modal-native">{active.title.native}</p>
              )}
              <div className="ams-modal-actions">
                <ExternalButton
                  href={active.bannerImage || active.coverImage.large}
                >
                  فتح الصورة الأصلية
                </ExternalButton>
                {active.siteUrl && (
                  <ExternalButton href={active.siteUrl} variant="ghost">
                    صفحة AniList
                  </ExternalButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
