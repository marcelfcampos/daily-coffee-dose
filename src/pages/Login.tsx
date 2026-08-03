import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isResending, setIsResending] = useState(false);

  function normalizedEmail() {
    return email.trim().toLowerCase();
  }

  function isValidEmail(value: string) {
    return !!value && value.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleResend() {
    const cleanEmail = normalizedEmail();
    if (!isValidEmail(cleanEmail)) {
      toast.error("Informe um e-mail válido para reenviar a confirmação.");
      return;
    }

    setIsResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: cleanEmail,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setIsResending(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Enviamos um novo link de confirmação. Use sempre o mais recente.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = normalizedEmail();

    if (!isValidEmail(cleanEmail)) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    if (!password) {
      toast.error("Informe sua senha.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    setIsSubmitting(false);

    if (error) {
      if (error.message === "Email not confirmed") {
        setNeedsConfirmation(true);
        toast.error("Seu e-mail ainda não foi confirmado. Reenvie o link abaixo.");
        return;
      }
      toast.error(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : error.message,
      );
      return;
    }

    setNeedsConfirmation(false);
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse sua conta para acompanhar seu consumo de café."
      footer={
        <>
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-medium text-primary hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={72}
            required
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </AuthShell>
  );
}
