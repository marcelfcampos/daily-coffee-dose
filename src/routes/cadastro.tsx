import { createFileRoute } from "@tanstack/react-router";
import Register from "@/pages/Register";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta | Controle de Café" },
      {
        name: "description",
        content: "Cadastre-se com nome, e-mail e senha para começar a monitorar sua cafeína.",
      },
      { property: "og:title", content: "Criar conta | Controle de Café" },
      {
        property: "og:description",
        content: "Crie sua conta gratuita e acompanhe seu consumo diário de café.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Register,
});
