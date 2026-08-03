import { createFileRoute } from "@tanstack/react-router";
import AuthCallback from "@/pages/AuthCallback";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Confirmar e-mail | Controle de Café" },
      {
        name: "description",
        content: "Confirmação de endereço de e-mail da sua conta do Controle de Café.",
      },
      { property: "og:title", content: "Confirmar e-mail | Controle de Café" },
      {
        property: "og:description",
        content: "Finalize a confirmação da sua conta para acessar o dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthCallback,
});
