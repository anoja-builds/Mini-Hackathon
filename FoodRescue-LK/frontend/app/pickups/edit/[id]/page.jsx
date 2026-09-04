"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PickupForm from "../../../../components/PickupForm";
import { pickupService } from "../../../../services/pickupService";

export default function EditPickupPage({ params }) {
  const router = useRouter();
  const id = params?.id;
  const [pickup, setPickup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadPickup();
    }
  }, [id]);

  const loadPickup = async () => {
    try {
      setLoading(true);
      const data = await pickupService.getPickupById(id);
      setPickup(data);
    } catch (err) {
      setError("Failed to load pickup: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setSubmitting(true);
    try {
      await pickupService.updatePickup(id, formData);
      router.push("/pickups");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link
          href="/pickups"
          style={{
            fontSize: "0.8rem",
            fontWeight: "700",
            color: "#059669",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem"
          }}
        >
          <span>&larr;</span>
          <span>Back to Pickups List</span>
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#64748b" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
          <p style={{ fontWeight: "600" }}>Loading pickup details...</p>
        </div>
      ) : error ? (
        <div
          style={{
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "center"
          }}
        >
          {error}
        </div>
      ) : (
        <PickupForm
          initialData={pickup}
          isEdit={true}
          onSubmit={handleUpdate}
          isSubmitting={submitting}
        />
      )}
    </div>
  );
}
