import { createFileRoute } from "@tanstack/react-router";
import OtakuGoDashboard from "@/components/OtakuGoDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "أوتاكو جو — لوحة التحكم" },
      { name: "description", content: "لوحة تحكم مجتمع أوتاكو جو للأنمي والمانجا." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Cairo:wght@400;600;700;800;900&display=swap",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return <OtakuGoDashboard />;
}
