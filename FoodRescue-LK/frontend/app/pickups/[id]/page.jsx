"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pickupService } from "../../../services/pickupService";
import PickupStatusBadge from "../../../components/PickupStatusBadge";
import PickupTimeline from "../../../components/PickupTimeline";

export default function PickupDetailPage({ params }) {
  const id = params?.id;
  const [pickup, setPickup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("Failed to load pickup details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await pickupService.updateStatus(id, newStatus);
      setPickup((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert("Failed to update status: " + err.message);
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
          <p style={{ fontWeight: "600" }}>Loading tracker details...</p>
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
      ) : pickup ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>🚚</span>
                <h1 style={{ fontSize: "1.3rem", fontWeight: "800", margin: 0 }}>
                  Pickup Tracking: #PK-{pickup.id}
                </h1>
                <PickupStatusBadge status={pickup.status} />
              </div>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "0.25rem 0 0 0" }}>
                Connecting surplus food donation with on-site collection logistics.
              </p>
            </div>

            <Link
              href={`/pickups/edit/${pickup.id}`}
              style={{
                backgroundColor: "#334155",
                color: "#ffffff",
                padding: "0.45rem 0.85rem",
                borderRadius: "0.375rem",
                fontSize: "0.8rem",
                fontWeight: "600",
                textDecoration: "none"
              }}
            >
              ✏️ Edit Logistics
            </Link>
          </div>

          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Timeline progression */}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "#64748b", marginBottom: "0.5rem" }}>
                Live Collection Stepper
              </div>
              <PickupTimeline status={pickup.status} />
            </div>

            {/* Information Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                fontSize: "0.85rem"
              }}
            >
              <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                  Food Item Claimed
                </span>
                <div style={{ fontWeight: "800", color: "#0f172a", marginTop: "0.25rem", fontSize: "1rem" }}>
                  {pickup.donationTitle}
                </div>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                  Claiming Organization
                </span>
                <div style={{ fontWeight: "800", color: "#047857", marginTop: "0.25rem", fontSize: "1rem" }}>
                  🏢 {pickup.organization}
                </div>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                  Pickup Schedule
                </span>
                <div style={{ fontWeight: "700", color: "#0f172a", marginTop: "0.25rem" }}>
                  📅 {pickup.pickupDate}
                </div>
                <div style={{ color: "#475569" }}>🕒 {pickup.pickupTime}</div>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                  Responsible Driver / Volunteer
                </span>
                <div style={{ fontWeight: "700", color: "#0f172a", marginTop: "0.25rem" }}>
                  👤 {pickup.responsiblePerson}
                </div>
                <a
                  href={`tel:${pickup.contactNumber}`}
                  style={{ color: "#059669", fontWeight: "600", textDecoration: "none", display: "inline-block", marginTop: "0.25rem" }}
                >
                  📞 {pickup.contactNumber} (Call Driver)
                </a>
              </div>

              <div style={{ gridColumn: "span 2", backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                  Pickup Address / Location
                </span>
                <div style={{ fontWeight: "700", color: "#0f172a", marginTop: "0.25rem" }}>
                  📍 {pickup.pickupLocation}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pickup.pickupLocation)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: "600", textDecoration: "none", marginTop: "0.35rem", display: "inline-block" }}
                >
                  🗺️ Get Directions on Google Maps &rarr;
                </a>
              </div>

              {pickup.notes && (
                <div style={{ gridColumn: "span 2", backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                    Logistics & Vehicle Instructions
                  </span>
                  <div style={{ color: "#334155", marginTop: "0.25rem" }}>{pickup.notes}</div>
                </div>
              )}
            </div>

            {/* Quick Status Bar */}
            <div
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Status Actions:</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {pickup.status === "Pending" && (
                  <button
                    onClick={() => handleUpdateStatus("Scheduled")}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer"
                    }}
                  >
                    🚚 Mark as Scheduled
                  </button>
                )}
                {pickup.status === "Scheduled" && (
                  <button
                    onClick={() => handleUpdateStatus("Collected")}
                    style={{
                      backgroundColor: "#059669",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer"
                    }}
                  >
                    ✅ Mark as Collected (Handover Done)
                  </button>
                )}
                {pickup.status !== "Cancelled" && pickup.status !== "Collected" && (
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to cancel this pickup?")) {
                        handleUpdateStatus("Cancelled");
                      }
                    }}
                    style={{
                      backgroundColor: "#fff1f2",
                      color: "#e11d48",
                      border: "1px solid #fecdd3",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer"
                    }}
                  >
                    ❌ Cancel Pickup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

