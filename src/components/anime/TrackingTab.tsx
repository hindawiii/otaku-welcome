import { useMemo, useState } from "react";
import { SectionHeader } from "./AnimeShared";
import { useUserLists, type TrackingStatus } from "@/hooks/useUserLists";

const STATUSES: { id: TrackingStatus | "all"; label: string; icon: string }[] = [
  { id: "all", label: "الكل", icon: "📋" },
  { id: "watching", label: "أشاهد الآن", icon: "▶️" },
  { id: "planned", label: "خطتي", icon: "📌" },
  { id: "completed", label: "اكتمل", icon: "✅" },
  { id: "dropped", label: "متروك", icon: "⏸️" },
];

export default function TrackingTab() {
  const { items, upsert, remove, updateProgress, setStatus } = useUserLists();
  const [filter, setFilter] = useState<TrackingStatus | "all">("all");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  const stats = useMemo(() => {
    const s = { watching: 0, planned: 0, completed: 0, dropped: 0 };
    items.forEach((i) => s[i.status]++);
    return s;
  }, [items]);

  return (
    <div className="ams-tab-content">
      <SectionHeader
        icon="⭐"
        title="قوائم المتابعة الشخصية"
        subtitle="حفظ محلي في متصفحك — لا يلزم تسجيل دخول"
      />

      {/* Stats */}
      <div className="ams-stats-grid">
        <div className="ams-stat-card">
          <div className="ams-stat-icon">▶️</div>
          <div className="ams-stat-value">{stats.watching}</div>
          <div className="ams-stat-label">أشاهد</div>
        </div>
        <div className="ams-stat-card">
          <div className="ams-stat-icon">📌</div>
          <div className="ams-stat-value">{stats.planned}</div>
          <div className="ams-stat-label">خطة</div>
        </div>
        <div className="ams-stat-card">
          <div className="ams-stat-icon">✅</div>
          <div className="ams-stat-value">{stats.completed}</div>
          <div className="ams-stat-label">مكتمل</div>
        </div>
        <div className="ams-stat-card">
          <div className="ams-stat-icon">⏸️</div>
          <div className="ams-stat-value">{stats.dropped}</div>
          <div className="ams-stat-label">متروك</div>
        </div>
      </div>

      {/* Filters */}
      <div className="ams-cat-bar">
        {STATUSES.map((s) => (
          <button
            key={s.id}
            className={`ams-cat-pill ${filter === s.id ? "active" : ""}`}
            onClick={() => setFilter(s.id)}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      <button className="ams-add-btn" onClick={() => setShowAdd((v) => !v)}>
        {showAdd ? "✕ إلغاء" : "➕ إضافة عنوان جديد"}
      </button>

      {showAdd && (
        <AddForm
          onAdd={(it) => {
            upsert(it);
            setShowAdd(false);
          }}
        />
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="ams-coming">
          <div className="ams-coming-icon">📭</div>
          <h3>لا توجد عناوين</h3>
          <p>أضف أول أنمي أو مانجا إلى قائمتك.</p>
        </div>
      ) : (
        <div className="ams-tracking-list">
          {filtered.map((it) => (
            <div key={it.id} className="ams-tracking-item">
              <img src={it.cover} alt={it.title} />
              <div className="ams-tracking-info">
                <div className="ams-tracking-title">{it.title}</div>
                <div className="ams-tracking-meta">
                  الحلقات: {it.progress}
                  {it.total ? ` / ${it.total}` : ""}
                  {it.score ? ` · ⭐ ${it.score}` : ""}
                </div>
                <div className="ams-tracking-actions">
                  <button onClick={() => updateProgress(it.id, -1)}>−</button>
                  <button onClick={() => updateProgress(it.id, +1)}>+</button>
                  <select
                    value={it.status}
                    onChange={(e) => setStatus(it.id, e.target.value as TrackingStatus)}
                  >
                    <option value="watching">أشاهد</option>
                    <option value="planned">خطة</option>
                    <option value="completed">مكتمل</option>
                    <option value="dropped">متروك</option>
                  </select>
                  <button className="ams-tracking-del" onClick={() => remove(it.id)}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddForm({
  onAdd,
}: {
  onAdd: (it: {
    id: number;
    title: string;
    cover: string;
    status: TrackingStatus;
    progress: number;
    total?: number | null;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState<TrackingStatus>("watching");

  return (
    <div className="ams-add-form">
      <input
        className="ams-search-input"
        placeholder="عنوان الأنمي/المانجا"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ams-search-input"
        placeholder="رابط صورة الغلاف (اختياري)"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />
      <div className="ams-add-row">
        <input
          className="ams-search-input"
          placeholder="عدد الحلقات الكلي"
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <select
          className="ams-search-input"
          value={status}
          onChange={(e) => setStatus(e.target.value as TrackingStatus)}
        >
          <option value="watching">أشاهد</option>
          <option value="planned">خطة</option>
          <option value="completed">مكتمل</option>
          <option value="dropped">متروك</option>
        </select>
      </div>
      <button
        className="ams-ext-btn ams-ext-primary"
        onClick={() => {
          if (!title.trim()) return;
          onAdd({
            id: Date.now(),
            title: title.trim(),
            cover: cover.trim() || "https://placehold.co/200x280/141620/e94560?text=Anime",
            status,
            progress: 0,
            total: total ? Number(total) : null,
          });
        }}
      >
        حفظ
      </button>
    </div>
  );
}
