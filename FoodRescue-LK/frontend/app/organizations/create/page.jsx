"use client";
import { useRouter } from "next/navigation";
import OrganizationForm from "../../../components/OrganizationForm";
import { createOrganization } from "../../../services/organizations";
export default function CreateOrganizationPage() { const router = useRouter(); return <section className="form-page"><div className="page-heading"><div><p className="eyebrow">Organizations / New partner</p><h1>Add an organization</h1><p className="lede">Give your next food rescue partner a clear place in the network.</p></div></div><OrganizationForm onSubmit={async (values) => { await createOrganization(values); router.push("/organizations"); }} /></section>; }
