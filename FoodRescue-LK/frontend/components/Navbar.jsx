import Link from "next/link";

export default function Navbar() {
  return <nav className="site-nav"><Link href="/" className="brand">FoodRescue <i>LK</i></Link><div className="nav-links"><Link href="/organizations">Organizations</Link><Link href="/donations">Donations</Link><Link href="/requests">Requests</Link></div></nav>;
}
