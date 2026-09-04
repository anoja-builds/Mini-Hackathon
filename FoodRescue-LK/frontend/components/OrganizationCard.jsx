import Link from "next/link";

const initials = (name) => name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();

export default function OrganizationCard({ organization, onDelete }) {
	return <article className="organization-card"><div className="organization-card__top"><div className="avatar">{initials(organization.name)}</div><span className={`status status--${organization.status.toLowerCase()}`}>{organization.status}</span></div><div><p className="eyebrow">{organization.type} · {organization.district}</p><h2>{organization.name}</h2><p className="muted">{organization.contactPerson}</p></div><dl className="organization-card__details"><div><dt>Email</dt><dd>{organization.email}</dd></div><div><dt>Phone</dt><dd>{organization.phone}</dd></div><div><dt>Location</dt><dd>{organization.location}</dd></div></dl><div className="card-actions"><Link className="button button--quiet" href={`/organizations/edit/${organization.id}`}>Edit</Link><button className="button button--danger" type="button" onClick={() => onDelete(organization)}>Delete</button></div></article>;
}
