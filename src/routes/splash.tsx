import { createFileRoute } from "@tanstack/react-router";
import Splash from "@/pages/Splash";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "Controle de Café | Comece a monitorar sua cafeína" },
      {
        name: "description",
        content:
          "Monitore sua ingestão de cafeína e mantenha o equilíbrio da sua energia diária com o Controle de Café.",
      },
      { property: "og:title", content: "Controle de Café" },
      {
        property: "og:description",
        content: "Monitore sua ingestão de cafeína e mantenha o equilíbrio da sua energia diária.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});
