"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../../services/api";
import CrudForm from "../../../../components/CrudForm";
export default function EditRequestPage({ params }) { const [item, setItem] = useState(); useEffect(() => { apiRequest(`/foodrequests/${params.id}`).then(setItem); }, [params.id]); return item ? <section className="form-page"><p className="eyebrow">Operations / Edit request</p><h1>Update request</h1><CrudForm resource="foodrequests" initial={item} id={params.id} /></section> : <p>Loading request...</p>; }
