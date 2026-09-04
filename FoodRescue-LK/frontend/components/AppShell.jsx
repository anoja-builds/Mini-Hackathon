"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLogin = pathname === "/login";
  useEffect(() => {
    const authenticated = window.sessionStorage.getItem("foodrescue-auth") === "true";
    if (!authenticated && !isLogin) router.replace("/login");
    if (authenticated && isLogin) router.replace("/dashboard");
    setReady(true);
  }, [isLogin, router]);
  if (!ready || (!isLogin && typeof window !== "undefined" && window.sessionStorage.getItem("foodrescue-auth") !== "true")) return null;
  if (isLogin) return children;
  return <><Navbar />{children}<Footer /></>;
}
