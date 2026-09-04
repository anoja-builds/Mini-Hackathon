"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OrganizationCard from "../../components/OrganizationCard";
import { deleteOrganization, readOrganizations } from "../../services/organizations";

export default function OrganizationsPage() {
	const [organizations, setOrganizations] = useState([]); const [query, setQuery] = useState(""); const [filter, setFilter] = useState("All");
	useEffect(() => { readOrganizations().then(setOrganizations).catch(() => setOrganizations([])); }, []);
	const filtered = useMemo(() => organizations.filter((organization) => (filter === "All" || organization.status === filter) && `${organization.name} ${organization.type} ${organization.address}`.toLowerCase().includes(query.toLowerCase())), [organizations, query, filter]);
	const remove = async (organization) => { if (window.confirm(`Remove ${organization.name}?`)) { await deleteOrganization(organization.id); setOrganizations((items) => items.filter((item) => item.id !== organization.id)); } };
	return <section className="page-shell"><div className="page-heading"><div><p className="eyebrow">People 03 / Network</p><h1>Organizations</h1><p className="lede">Keep every food partner visible, connected, and ready to help.</p></div><Link className="button button--primary" href="/organizations/create"><span aria-hidden="true">+</span> Add organization</Link></div><div className="toolbar"><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search organizations" aria-label="Search organizations" /></label><div className="filter-pills">{["All", "Active", "Paused"].map((option) => <button className={filter === option ? "active" : ""} key={option} onClick={() => setFilter(option)}>{option}</button>)}</div><span className="result-count">{filtered.length} partner{filtered.length === 1 ? "" : "s"}</span></div>{filtered.length ? <div className="organization-grid">{filtered.map((organization) => <OrganizationCard key={organization.id} organization={organization} onDelete={remove} />)}</div> : <div className="empty-state"><div className="empty-state__icon">⌕</div><h2>No organizations found</h2><p>Try a different search or add a new partner.</p></div>}</section>;
}
