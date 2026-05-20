import { createFileRoute } from "@tanstack/react-router";
import OtakuGoRoom, { ROOMS, type RoomId } from "@/components/OtakuGoRoom";

export const Route = createFileRoute("/room/$id")({
  head: () => ({
    meta: [
      { title: "أوتاكو جو — الغرفة" },
      { name: "description", content: "غرفة من ساحة أوتاكو جو." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap",
      },
    ],
  }),
  component: RoomPage,
});

function RoomPage() {
  const { id } = Route.useParams();
  const validId = (id in ROOMS ? id : "welcome") as RoomId;
  return <OtakuGoRoom roomId={validId} />;
}
