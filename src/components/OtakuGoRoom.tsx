import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import LanguageRoomContent from "./rooms/LanguageRoomContent";
import WelcomeRoomContent from "./rooms/WelcomeRoomContent";
import DrawingRoomContent from "./rooms/DrawingRoomContent";
import MusicRoomContent from "./rooms/MusicRoomContent";
import ArtsRoomContent from "./rooms/ArtsRoomContent";
import GamesRoomContent from "./rooms/GamesRoomContent";
import RoomChat from "./rooms/RoomChat";
import "./otaku-go-dashboard.css";
import "./otaku-go-room.css";
import "./rooms/language-room.css";
import "./rooms/special-rooms.css";


export type RoomId =
  | "jp" | "en" | "ar" | "welcome" | "drawing" | "games" | "music" | "arts";

type RoomMeta = {
  id: RoomId;
  icon: string;
  title: string;
  desc: string;
  statNum: string;
  statLabel: string;
  color: string;
  colorAlt: string;
  tabs: { icon: string; label: string }[];
};

export const ROOMS: Record<RoomId, RoomMeta> = {
  jp: {
    id: "jp", icon: "📚", title: "تعلم اليابانية",
    desc: "هيراغانا · كاتاكانا · كانجي · محادثات · JLPT",
    statNum: "89", statLabel: "متعلم",
    color: "#E74C3C", colorAlt: "#C0392B",
    tabs: [
      { icon: "🔤", label: "الأحرف" },
      { icon: "💬", label: "الجمل" },
      { icon: "🗣️", label: "المحادثات" },
      { icon: "📊", label: "مستواي" },
    ],
  },
  en: {
    id: "en", icon: "🇬🇧", title: "تعلم الإنجليزية",
    desc: "مفردات · قواعد · محادثات · مصطلحات أنمي · IELTS",
    statNum: "56", statLabel: "متعلم",
    color: "#3498DB", colorAlt: "#2980B9",
    tabs: [
      { icon: "🔤", label: "المفردات" },
      { icon: "💬", label: "الجمل" },
      { icon: "🗣️", label: "المحادثات" },
      { icon: "📊", label: "مستواي" },
    ],
  },
  ar: {
    id: "ar", icon: "🇸🇦", title: "تعلم العربية الفصحى",
    desc: "أحرف · قواعد · بلاغة · محادثات · تحديات يومية",
    statNum: "43", statLabel: "متعلم",
    color: "#27AE60", colorAlt: "#1E8449",
    tabs: [
      { icon: "🔤", label: "الأحرف" },
      { icon: "💬", label: "الجمل" },
      { icon: "🗣️", label: "المحادثات" },
      { icon: "📊", label: "مستواي" },
    ],
  },
  welcome: {
    id: "welcome", icon: "🎌", title: "استقبال الجدد",
    desc: "دليل المبتدئين · اختبار المستوى · قواعد الساحة · التعريف بالمجتمع",
    statNum: "124", statLabel: "نشط",
    color: "#FF6B6B", colorAlt: "#FF8E8E",
    tabs: [
      { icon: "📋", label: "دليل" },
      { icon: "🎯", label: "اختبار" },
      { icon: "📜", label: "القواعد" },
      { icon: "👋", label: "تعريف" },
    ],
  },
  drawing: {
    id: "drawing", icon: "🎨", title: "تعلم الرسم",
    desc: "رسم الأنمي · الشخصيات · الخلفيات · التلوين الرقمي · تحديات أسبوعية",
    statNum: "67", statLabel: "رسام",
    color: "#9B59B6", colorAlt: "#8E44AD",
    tabs: [
      { icon: "✏️", label: "الدروس" },
      { icon: "🖼️", label: "معرض" },
      { icon: "🎯", label: "تحديات" },
      { icon: "📊", label: "مستواي" },
    ],
  },
  games: {
    id: "games", icon: "🎮", title: "الألعاب",
    desc: "أخبار الألعاب · تصنيف · غرف لعب · أنمي ألعاب · JRPG · تقييمات",
    statNum: "234", statLabel: "لاعب",
    color: "#F39C12", colorAlt: "#E67E22",
    tabs: [
      { icon: "📰", label: "أخبار" },
      { icon: "🏆", label: "تصنيف" },
      { icon: "🎲", label: "غرف لعب" },
      { icon: "📊", label: "مستواي" },
    ],
  },
  music: {
    id: "music", icon: "🎵", title: "الموسيقى",
    desc: "Openings · Endings · OST · استماع جماعي · تقييم · playlists",
    statNum: "156", statLabel: "مستمع",
    color: "#E91E63", colorAlt: "#C2185B",
    tabs: [
      { icon: "🎶", label: "أغاني" },
      { icon: "🎧", label: "استماع" },
      { icon: "📋", label: "قوائم" },
      { icon: "📊", label: "مستواي" },
    ],
  },
  arts: {
    id: "arts", icon: "🎨", title: "قسم الفنون",
    desc: "Fan Art · Cosplay · تصوير · تصميم · تحديات إبداعية · معرض",
    statNum: "89", statLabel: "فنان",
    color: "#9B59B6", colorAlt: "#8E44AD",
    tabs: [
      { icon: "🖼️", label: "معرض" },
      { icon: "👘", label: "Cosplay" },
      { icon: "📸", label: "تصوير" },
      { icon: "📊", label: "مستواي" },
    ],
  },
};

export default function OtakuGoRoom({ roomId }: { roomId: RoomId }) {
  const room = ROOMS[roomId];
  const [tab, setTab] = useState(0);

  if (!room) {
    return (
      <div className="ogd-root" dir="rtl" style={{ padding: 40, textAlign: "center" }}>
        <h2>الغرفة غير موجودة</h2>
        <Link to="/dashboard" className="ogr-back-btn">العودة للساحة</Link>
      </div>
    );
  }

  return (
    <div className="ogd-root ogr-root" dir="rtl">
      <div className="ogd-top-bar">
        <Link to="/dashboard" className="ogr-back">
          <ChevronRight size={20} />
          <span>الساحة</span>
        </Link>
        <div className="ogd-logo" style={{ fontSize: "1.1rem" }}>أوتاكو جو</div>
        <div style={{ width: 80 }} />
      </div>

      <div className="ogd-main">
        <div
          className="ogr-header-card ogd-animate-in"
          style={{
            background: `linear-gradient(145deg, ${room.color}26, ${room.color}0d)`,
            borderColor: `${room.color}40`,
          }}
        >
          <div
            className="ogr-room-icon"
            style={{ background: `linear-gradient(135deg, ${room.color}, ${room.colorAlt})` }}
          >
            {room.icon}
          </div>
          <div className="ogr-room-info">
            <h2 style={{ color: room.color }}>{room.title}</h2>
            <p>{room.desc}</p>
          </div>
          <div className="ogr-room-stats">
            <div className="ogr-stat-num" style={{ color: room.color }}>
              {room.statNum}
            </div>
            <div className="ogr-stat-label">{room.statLabel}</div>
          </div>
        </div>

        <div className="ogr-tabs ogd-animate-in ogd-delay-1">
          {room.tabs.map((t, i) => (
            <button
              key={i}
              className={`ogr-tab ${tab === i ? "active" : ""}`}
              onClick={() => setTab(i)}
              style={
                tab === i
                  ? {
                      background: `linear-gradient(135deg, ${room.color}, ${room.colorAlt})`,
                      color: "#fff",
                      borderColor: "transparent",
                      boxShadow: `0 4px 15px ${room.color}4d`,
                    }
                  : undefined
              }
            >
              <span className="ogr-tab-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="ogr-content ogd-animate-in ogd-delay-2">
          {(roomId === "jp" || roomId === "en" || roomId === "ar") ? (
            <LanguageRoomContent roomId={roomId} tab={tab} color={room.color} colorAlt={room.colorAlt} />
          ) : roomId === "welcome" ? (
            <WelcomeRoomContent tab={tab} color={room.color} colorAlt={room.colorAlt} />
          ) : roomId === "drawing" ? (
            <DrawingRoomContent tab={tab} color={room.color} colorAlt={room.colorAlt} />
          ) : roomId === "music" ? (
            <MusicRoomContent tab={tab} color={room.color} colorAlt={room.colorAlt} />
          ) : roomId === "arts" ? (
            <ArtsRoomContent tab={tab} color={room.color} colorAlt={room.colorAlt} />
          ) : roomId === "games" ? (
            <GamesRoomContent tab={tab} color={room.color} />
          ) : null}
        </div>

        <RoomChat roomId={roomId} color={room.color} />
      </div>
    </div>
  );
}
