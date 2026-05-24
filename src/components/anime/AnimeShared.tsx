import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/anilist";

export function CountdownTimer({ seconds }: { seconds: number }) {
  const [s, setS] = useState(seconds);
  useEffect(() => {
    setS(seconds);
    const id = setInterval(() => setS((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  return <span className="ams-countdown">{formatCountdown(s)}</span>;
}

export function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="ams-section-header">
      <div className="ams-section-title">
        <span className="ams-section-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      {subtitle && <p className="ams-section-sub">{subtitle}</p>}
    </div>
  );
}

export function ExternalButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ams-ext-btn ams-ext-${variant}`}
    >
      {children}
      <span className="ams-ext-arrow">↗</span>
    </a>
  );
}

export function StatsGrid({ items }: { items: { label: string; value: string; icon: string }[] }) {
  return (
    <div className="ams-stats-grid">
      {items.map((s) => (
        <div key={s.label} className="ams-stat-card">
          <div className="ams-stat-icon">{s.icon}</div>
          <div className="ams-stat-value">{s.value}</div>
          <div className="ams-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function LegalBadge() {
  return (
    <div className="ams-legal-badge" title="جميع المحتوى من مصادر رسمية ومجانية">
      <span>✓</span> محتوى قانوني 100%
    </div>
  );
}

export function LoadingShimmer({ count = 4 }: { count?: number }) {
  return (
    <div className="ams-shimmer-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ams-shimmer-card" />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="ams-error">
      <p>⚠️ تعذّر جلب البيانات من AniList</p>
      {onRetry && <button onClick={onRetry}>إعادة المحاولة</button>}
    </div>
  );
}
