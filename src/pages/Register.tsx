import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/integrations/supabase/client";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 100) {
      toast.error("Informe seu nome (entre 2 e 100 caracteres).");
      return;
    }
    if (!cleanEmail || cleanEmail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    if (password.length < 8) {
      toast.error("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: cleanName },
      },
    });
    setIsSubmitting(false);

    if (error) {
      const code = error.code ?? "";
      const messages: Record<string, string> = {
        user_already_exists: "Este e-mail já está cadastrado.",
        email_exists: "Este e-mail já está cadastrado.",
        weak_password:
          "Esta senha é muito comum e foi encontrada em vazamentos. Escolha uma senha mais forte (misture letras, números e símbolos).",
        email_address_invalid: "Este e-mail não é aceito. Use um endereço de e-mail real.",
        signup_disabled: "Os cadastros estão temporariamente desativados.",
        over_email_send_rate_limit:
          "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.",
        validation_failed: "Verifique os dados informados e tente novamente.",
      };
      toast.error(
        messages[code] ??
          (error.message === "User already registered"
            ? "Este e-mail já está cadastrado."
            : error.message),
      );
      return;
    }

    if (data.session) {
      toast.success("Conta criada com sucesso!");
      navigate({ to: "/dashboard", replace: true });
      return;
    }

    toast.success("Confirme seu e-mail para ativar a conta.");
    navigate({ to: "/login", replace: true });
  }

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Leva menos de um minuto para começar a monitorar sua cafeína."
      footer={
        <>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome</Label>
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={100}
            required
          />
        </div>

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
            autoComplete="new-password"
            placeholder="Mínimo de 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={72}
            required
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
    </AuthShell>
  );
}
