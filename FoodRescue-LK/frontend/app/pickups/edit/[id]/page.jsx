"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../../services/api";
import CrudForm from "../../../../components/CrudForm";
export default function EditPickupPage({ params }) { const [item, setItem] = useState(); useEffect(() => { apiRequest(`/pickups/${params.id}`).then(setItem); }, [params.id]); return item ? <section className="form-page"><p className="eyebrow">Operations / Edit pickup</p><h1>Update pickup</h1><CrudForm resource="pickups" initial={item} id={params.id} /></section> : <p>Loading pickup...</p>; }
