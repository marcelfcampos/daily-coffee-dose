import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar | Controle de Café" },
      {
        name: "description",
        content: "Acesse sua conta do Controle de Café com e-mail e senha para ver seu dashboard.",
      },
      { property: "og:title", content: "Entrar | Controle de Café" },
      {
        property: "og:description",
        content: "Faça login com e-mail e senha para acompanhar sua ingestão de café.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});
