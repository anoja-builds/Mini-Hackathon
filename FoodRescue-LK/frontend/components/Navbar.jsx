"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() { const router = useRouter(); const logout = () => { window.sessionStorage.removeItem("foodrescue-auth"); router.push("/login"); }; return <nav className="site-nav"><Link href="/" className="brand">FoodRescue <i>LK</i></Link><div className="nav-links"><Link href="/dashboard">Overview</Link><Link href="/organizations">Organizations</Link><Link href="/donations">Donations</Link><Link href="/requests">Requests</Link><Link href="/pickups">Pickups</Link><button className="nav-logout" onClick={logout}>Sign out</button></div></nav>; }
