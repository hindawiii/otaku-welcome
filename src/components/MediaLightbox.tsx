import { useEffect } from "react";
import { X, Download } from "lucide-react";

interface MediaLightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export default function MediaLightbox({ src, alt = "media", onClose }: MediaLightboxProps) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;

  const handleDownload = async () => {
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = (blob.type.split("/")[1] || "png").split(";")[0];
      a.download = `otakugo-${Date.now()}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      const a = document.createElement("a");
      a.href = src;
      a.download = `otakugo-${Date.now()}`;
      a.target = "_blank";
      a.click();
    }
  };

  return (
    <div className="ogd-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="ogd-lightbox-close" onClick={onClose} aria-label="إغلاق">
        <X size={22} />
      </button>
      <img
        className="ogd-lightbox-img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="ogd-lightbox-download"
        onClick={(e) => { e.stopPropagation(); handleDownload(); }}
      >
        <Download size={18} />
        <span>تحميل المرفق</span>
      </button>
    </div>
  );
}
