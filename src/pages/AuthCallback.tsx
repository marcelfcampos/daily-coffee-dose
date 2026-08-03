import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { EmailOtpType } from "@supabase/supabase-js";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "success" | "error";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Estamos confirmando seu e-mail...");

  useEffect(() => {
    let cancelled = false;

    async function confirm() {
      const url = new URL(window.location.href);
      const query = url.searchParams;
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));

      const errorDescription =
        query.get("error_description") ?? hash.get("error_description");
      if (errorDescription) {
        if (!cancelled) {
          setStatus("error");
          setMessage(
            /expired|invalid/i.test(errorDescription)
              ? "Este link de confirmação expirou ou já foi utilizado. Solicite um novo na tela de login."
              : errorDescription,
          );
        }
        return;
      }

      // Fluxo PKCE / token_hash (links de e-mail atuais do Supabase).
      const tokenHash = query.get("token_hash") ?? query.get("token");
      const type = (query.get("type") as EmailOtpType | null) ?? "signup";

      if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        if (cancelled) return;
        if (error) {
          setStatus("error");
          setMessage(
            "Não foi possível confirmar o e-mail: o link pode ter expirado. Solicite um novo na tela de login.",
          );
          return;
        }
        setStatus("success");
        setMessage("E-mail confirmado! Redirecionando para o seu dashboard...");
        setTimeout(() => navigate({ to: "/dashboard", replace: true }), 1200);
        return;
      }

      // Fluxo implícito: tokens já vêm no fragmento da URL.
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (cancelled) return;
        if (error) {
          setStatus("error");
          setMessage("Não foi possível abrir sua sessão. Tente entrar novamente.");
          return;
        }
        setStatus("success");
        setMessage("E-mail confirmado! Redirecionando para o seu dashboard...");
        setTimeout(() => navigate({ to: "/dashboard", replace: true }), 1200);
        return;
      }

      // Sem parâmetros: talvez a sessão já esteja ativa.
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        setStatus("success");
        setMessage("Sua conta já está confirmada. Redirecionando...");
        setTimeout(() => navigate({ to: "/dashboard", replace: true }), 1000);
        return;
      }
      setStatus("error");
      setMessage("Link de confirmação inválido. Solicite um novo na tela de login.");
    }

    void confirm();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <AuthShell
      title={status === "error" ? "Confirmação pendente" : "Confirmando e-mail"}
      subtitle={message}
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Ir para o login
        </Link>
      }
    >
      {status === "error" ? (
        <Button asChild size="lg" className="w-full">
          <Link to="/login">Reenviar confirmação</Link>
        </Button>
      ) : (
        <div className="flex justify-center">
          <span className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </AuthShell>
  );
}
