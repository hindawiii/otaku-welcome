// AniList GraphQL API helper (free, no key required)
const ENDPOINT = "https://graphql.anilist.co";

export type AniMedia = {
  id: number;
  title: { romaji: string; english?: string | null; native?: string | null };
  coverImage: { large: string; color?: string | null };
  bannerImage?: string | null;
  averageScore?: number | null;
  episodes?: number | null;
  status?: string | null;
  format?: string | null;
  genres?: string[];
  description?: string | null;
  startDate?: { year?: number; month?: number; day?: number };
  nextAiringEpisode?: { airingAt: number; episode: number; timeUntilAiring: number } | null;
  siteUrl?: string;
};

async function query<T>(q: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: q, variables }),
  });
  if (!res.ok) throw new Error(`AniList ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || "AniList error");
  return json.data as T;
}

const MEDIA_FIELDS = `
  id
  title { romaji english native }
  coverImage { large color }
  bannerImage
  averageScore
  episodes
  status
  format
  genres
  description(asHtml: false)
  startDate { year month day }
  nextAiringEpisode { airingAt episode timeUntilAiring }
  siteUrl
`;

export async function fetchTrendingAnime(perPage = 12): Promise<AniMedia[]> {
  const data = await query<{ Page: { media: AniMedia[] } }>(
    `query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, sort: TRENDING_DESC) { ${MEDIA_FIELDS} }
      }
    }`,
    { perPage },
  );
  return data.Page.media;
}

export async function fetchAiringSchedule(perPage = 10): Promise<AniMedia[]> {
  const data = await query<{ Page: { media: AniMedia[] } }>(
    `query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) { ${MEDIA_FIELDS} }
      }
    }`,
    { perPage },
  );
  return data.Page.media.filter((m) => m.nextAiringEpisode);
}

export async function fetchSeasonalAnime(perPage = 12): Promise<AniMedia[]> {
  const now = new Date();
  const month = now.getMonth() + 1;
  const season =
    month <= 3 ? "WINTER" : month <= 6 ? "SPRING" : month <= 9 ? "SUMMER" : "FALL";
  const data = await query<{ Page: { media: AniMedia[] } }>(
    `query ($season: MediaSeason, $year: Int, $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC) { ${MEDIA_FIELDS} }
      }
    }`,
    { season, year: now.getFullYear(), perPage },
  );
  return data.Page.media;
}

export function formatCountdown(seconds: number): string {
  if (seconds <= 0) return "بثّت";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}ي ${h}س`;
  if (h > 0) return `${h}س ${m}د`;
  return `${m}د`;
}
