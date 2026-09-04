"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";

const configs = {
  donations: { title: "Food donations", singular: "donation", fields: ["foodName", "quantity", "district", "location", "status"], label: (x) => `${x.foodName} · ${x.quantity} portions`, detail: (x) => `${x.district} · Pickup ${new Date(x.pickupTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` },
  foodrequests: { title: "Food requests", singular: "request", fields: ["foodType", "requiredQuantity", "district", "location", "status"], label: (x) => `${x.foodType} · ${x.requiredQuantity} portions`, detail: (x) => `${x.district} · Required ${new Date(x.requiredDate).toLocaleDateString()}` },
  pickups: { title: "Pickups", singular: "pickup", fields: ["donationId", "organizationId", "pickupLocation", "personResponsible", "status"], label: (x) => `Pickup #${x.id}`, detail: (x) => `${x.pickupLocation} · ${x.personResponsible}` }
};

export default function CrudList({ resource }) {
  const config = configs[resource]; const [items, setItems] = useState([]); const [query, setQuery] = useState("");
  useEffect(() => { apiRequest(`/${resource}`).then(setItems).catch(() => setItems([])); }, [resource]);
  const filtered = useMemo(() => items.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase())), [items, query]);
  const remove = async (item) => { if (window.confirm(`Delete ${config.singular} #${item.id}?`)) { await apiRequest(`/${resource}/${item.id}`, { method: "DELETE" }); setItems(items.filter((x) => x.id !== item.id)); } };
  const markCollected = async (item) => { await apiRequest(`/pickups/${item.id}`, { method: "PUT", body: JSON.stringify({ ...item, status: "Collected" }) }); setItems(items.map((x) => x.id === item.id ? { ...x, status: "Collected" } : x)); };
  return <section className="page-shell"><div className="page-heading"><div><p className="eyebrow">FoodRescue LK / Operations</p><h1>{config.title}</h1><p className="lede">Manage the details that keep food moving to the people who need it.</p></div><Link className="button button--primary" href={`/${resource}/create`}>+ Add {config.singular}</Link></div><div className="toolbar"><label className="search">⌕<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}`} /></label><span className="result-count">{filtered.length} record{filtered.length === 1 ? "" : "s"}</span></div><div className="organization-grid">{filtered.map((item) => <article className="organization-card" key={item.id}><div className="organization-card__top"><div className="avatar">#{item.id}</div><span className={`status status--${(item.status || "Pending").toLowerCase()}`}>{item.status}</span></div><div><p className="eyebrow">{config.singular}</p><h2>{config.label(item)}</h2><p className="muted">{config.detail(item)}</p></div><div className="card-actions">{resource === "pickups" && item.status !== "Collected" && <button className="button button--quiet" onClick={() => markCollected(item)}>Mark collected</button>}<Link className="button button--quiet" href={`/${resource}/edit/${item.id}`}>Edit</Link><button className="button button--danger" onClick={() => remove(item)}>Delete</button></div></article>)}</div>{!filtered.length && <div className="empty-state"><h2>No records yet</h2><p>Create the first {config.singular} to see it here.</p></div>}</section>;
}
