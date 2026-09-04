"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const demoEmail = "demo@foodrescue.lk";
const demoPassword = "Rescue@123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password) return setError("Enter your email and password.");
    if (email.trim().toLowerCase() !== demoEmail || password !== demoPassword) return setError("Those login details do not match.");
    window.sessionStorage.setItem("foodrescue-auth", "true");
    router.push("/dashboard");
  };
  return <main className="login-page"><section className="login-art"><p className="login-mark">FoodRescue <strong>LK</strong></p><div className="login-message"><p className="eyebrow">One network. Less waste.</p><h1>Good food deserves a second table.</h1><p>Coordinate donations, community partners, and pickups from one shared place.</p></div><span className="login-number">01 / 04</span></section><section className="login-panel"><div className="login-panel__inner"><p className="eyebrow">Welcome back</p><h2>Sign in to FoodRescue LK</h2><p className="login-copy">Access the operations dashboard and keep every handoff moving.</p><form onSubmit={submit} noValidate><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoComplete="current-password" /></label>{error && <p className="login-error" role="alert">{error}</p>}<button className="login-button" type="submit">Sign in <span aria-hidden="true">→</span></button></form><p className="login-hint">Demo access: demo@foodrescue.lk / Rescue@123</p></div></section></main>;
}
