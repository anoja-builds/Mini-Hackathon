"use client";
import Link from "next/link";
import { useState } from "react";

const fields = [["name", "Organization name", "text"], ["type", "Organization type", "select"], ["contactPerson", "Contact person", "text"], ["email", "Email address", "email"], ["phone", "Phone number", "tel"], ["district", "District", "text"], ["location", "Location", "text"], ["address", "Complete address", "text"], ["description", "Description", "text"]];

function validate(values) {
	const errors = {};
	const name = String(values.name || "").trim();
	const contactPerson = String(values.contactPerson || "").trim();
	const address = String(values.address || "").trim();
	const district = String(values.district || "").trim();
	const location = String(values.location || "").trim();
	const phone = String(values.phone || "").trim().replace(/[\s-]/g, "");
	if (!name) errors.name = "Please enter the organization name.";
	else if (name.length < 3) errors.name = "Organization name must contain at least 3 characters.";
	else if (name.length > 100) errors.name = "Organization name must contain no more than 100 characters.";
	if (!values.type) errors.type = "Please select an organization type.";
	if (!contactPerson) errors.contactPerson = "Please enter the contact person's name.";
	else if (contactPerson.length < 3) errors.contactPerson = "Contact person name must contain at least 3 characters.";
	else if (!/^[A-Za-z ]+$/.test(contactPerson)) errors.contactPerson = "Contact person name must contain only letters.";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email || "").trim())) errors.email = "Please enter a valid email address.";
	if (!/^(?:07\d{8}|\+947\d{8})$/.test(phone)) errors.phone = "Please enter a valid Sri Lankan phone number.";
	if (!address || address.length < 10) errors.address = "Please enter a complete address.";
	if (!district) errors.district = "Please enter a district.";
	else if (location.length < 3) errors.location = "Please enter a location.";
	if (!values.status) errors.status = "Please select a status.";
	return errors;
}

export default function OrganizationForm({ initialValues = {}, onSubmit, submitLabel = "Save organization" }) {
	const [values, setValues] = useState({ status: "Active", ...initialValues });
	const [errors, setErrors] = useState({});
	const update = (event) => {
		const nextValues = { ...values, [event.target.name]: event.target.value };
		setValues(nextValues);
		setErrors({ ...errors, [event.target.name]: undefined });
	};
	const submit = (event) => { event.preventDefault(); const nextErrors = validate(values); setErrors(nextErrors); if (Object.keys(nextErrors).length === 0) onSubmit(values); };
	const field = (name, label, control) => <label key={name} className={errors[name] ? "field field--error" : "field"}>{label}{control}{errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>}</label>;
	return <form className="form-panel" onSubmit={submit} noValidate><div className="form-grid">{fields.map(([name, label, type]) => field(name, label, type === "select" ? <select id={name} name={name} value={values[name] || ""} onChange={update} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined}><option value="">Choose a type</option><option>Community Kitchen</option><option>Charity</option><option>Non-profit</option><option>Food Bank</option></select> : <input id={name} name={name} type={type} value={values[name] || ""} onChange={update} placeholder={label} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />))}{field("status", "Status", <select id="status" name="status" value={values.status || ""} onChange={update} aria-invalid={Boolean(errors.status)} aria-describedby={errors.status ? "status-error" : undefined}><option value="">Choose a status</option><option>Active</option><option>Paused</option></select>)}</div><div className="form-actions"><Link className="button button--quiet" href="/organizations">Cancel</Link><button className="button button--primary" type="submit">{submitLabel}</button></div></form>;
}
