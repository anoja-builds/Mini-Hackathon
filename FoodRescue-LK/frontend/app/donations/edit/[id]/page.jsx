"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../../services/api";
import CrudForm from "../../../../components/CrudForm";
export default function EditDonationPage({ params }) { const [item, setItem] = useState(); useEffect(() => { apiRequest(`/donations/${params.id}`).then(setItem); }, [params.id]); return item ? <section className="form-page"><p className="eyebrow">Operations / Edit donation</p><h1>Update donation</h1><CrudForm resource="donations" initial={item} id={params.id} /></section> : <p>Loading donation...</p>; }
