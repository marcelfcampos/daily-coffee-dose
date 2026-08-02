import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Controle de Ingestão de Café | Dashboard" },
      {
        name: "description",
        content:
          "Registre doses de café e acompanhe consumo diário, média semanal e histórico em um dashboard simples.",
      },
      { property: "og:title", content: "Controle de Ingestão de Café" },
      {
        property: "og:description",
        content:
          "Dashboard com doses do dia, volume em ml, gráfico dos últimos 7 dias e últimos registros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
