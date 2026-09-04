"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PickupForm from "../../../components/PickupForm";
import { pickupService } from "../../../services/pickupService";

export default function CreatePickupPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (formData) => {
    setSubmitting(true);
    try {
      await pickupService.createPickup(formData);
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

      <PickupForm
        isEdit={false}
        onSubmit={handleCreate}
        isSubmitting={submitting}
      />
    </div>
  );
}
