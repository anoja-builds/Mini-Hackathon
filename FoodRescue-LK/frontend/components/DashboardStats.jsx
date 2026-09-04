import Link from "next/link";

export default function DashboardStats({ stats }) {
	return <div className="stats-grid">{[["Donations", stats.donations, "/donations", "Food ready to share"], ["Food requests", stats.requests, "/requests", "Communities waiting"], ["Pickups", stats.pickups, "/pickups", "Handoffs in motion"], ["Organizations", stats.organizations, "/organizations", "Partners in the network"]].map(([label, value, href, description]) => <Link className="stat-card" href={href} key={label}><span className="eyebrow">{label}</span><strong>{value}</strong><span className="muted">{description} <b>→</b></span></Link>)}</div>;
}
