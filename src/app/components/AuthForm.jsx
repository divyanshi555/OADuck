"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import BrandLogo from "./BrandLogo";

function GoogleIcon() {
  return <svg className="auth-google-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z" /><path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z" /><path fill="#FBBC05" d="M6.54 13.79a5.85 5.85 0 0 1 0-3.58V7.68H3.3a9.73 9.73 0 0 0 0 8.64l3.24-2.53Z" /><path fill="#EA4335" d="M12 6.18c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.9 9.46 6.18 12 6.18Z" /></svg>;
}

export default function AuthForm({ initialMode = "login" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegistering = initialMode === "register";

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (isRegistering) {
        if (password !== formData.get("confirmPassword")) {
          setMessage("Passwords do not match.");
          return;
        }
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.get("name"), username: formData.get("username"), email, password }),
        });
        const result = await response.json();
        if (!response.ok) {
          setMessage(result.error || "Unable to create your account.");
          return;
        }
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (!result?.ok) {
        setMessage("Invalid email or password.");
        return;
      }
      router.push("/practice");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogle() {
    signIn("google", { callbackUrl: "/practice" });
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <BrandLogo dark />
        <div className="auth-showcase__content">
          <h1>Build better answers, one question at a time.</h1>
          <p>A focused workspace for questions, hints, and progress.</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-mobile-brand"><BrandLogo /></div>
          <div className="auth-heading">
            <h2>{isRegistering ? "Create your account" : "Welcome back"}</h2>
            <p>{isRegistering ? "Create an account and make your next session count." : "Pick up where your practice left off."}</p>
          </div>

          <button className="auth-google" type="button" onClick={handleGoogle}><GoogleIcon /> <span>{isRegistering ? "Sign up with Google" : "Continue with Google"}</span></button>
          <div className="auth-divider"><span>or continue with email</span></div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && <div className="auth-form__row"><label>Full name<input name="name" type="text" placeholder="Alex Morgan" autoComplete="name" required /></label><label>Username<input name="username" type="text" placeholder="alexm" autoComplete="username" required /></label></div>}
            <label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Password<input name="password" type="password" placeholder="At least 8 characters" autoComplete={isRegistering ? "new-password" : "current-password"} minLength={8} required /></label>
            {isRegistering && <label>Confirm password<input name="confirmPassword" type="password" placeholder="Repeat your password" autoComplete="new-password" minLength={8} required /></label>}
            {!isRegistering && <div className="auth-form__options"><label><input type="checkbox" name="remember" /> Remember me</label><button type="button">Forgot password?</button></div>}
            <button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Working..." : isRegistering ? "Create account" : "Log in"}<span aria-hidden="true">→</span></button>
          </form>
          {message && <p className="auth-message" role="status">{message}</p>}
          <p className="auth-switch">{isRegistering ? "Already have an account?" : "New to OA Duck?"} <Link href={isRegistering ? "/login" : "/register"}>{isRegistering ? "Log in" : "Create an account"} <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>
    </main>
  );
}
