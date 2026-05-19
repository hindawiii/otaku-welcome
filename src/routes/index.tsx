import { createFileRoute } from "@tanstack/react-router";
import OtakuGoAuth from "@/components/OtakuGoAuth";

export const Route = createFileRoute("/")({
  component: OtakuGoAuth,
  head: () => ({
    meta: [
      { title: "أوتاكو جو - تسجيل الدخول" },
      { name: "description", content: "عالم الأنمي في جيبك - انضم إلى مجتمع أوتاكو جو" },
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
});
