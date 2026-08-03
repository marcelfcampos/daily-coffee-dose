import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Controle de Café" },
      {
        name: "description",
        content:
          "Acompanhe doses do dia, volume em ml, média semanal e histórico do seu consumo de café.",
      },
      { property: "og:title", content: "Dashboard | Controle de Café" },
      {
        property: "og:description",
        content: "Doses do dia, volume em ml, gráfico dos últimos 7 dias e últimos registros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
