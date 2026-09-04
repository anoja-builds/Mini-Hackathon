"use client";

import PickupStatusBadge from "./PickupStatusBadge";
import PickupTimeline from "./PickupTimeline";

export default function PickupDetailModal({
  pickup,
  isOpen,
  onClose,
  onUpdateStatus
}) {
  if (!isOpen || !pickup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "640px",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #e2e8f0",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🚚</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700" }}>
                  Pickup & Claim Tracker
                </h3>
                <PickupStatusBadge status={pickup.status} />
              </div>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>
                Tracking Reference: #PK-{pickup.id}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#94a3b8",
              fontSize: "1.25rem",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Timeline Stepper */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#64748b", marginBottom: "0.5rem" }}>
              Collection Progression
            </div>
            <PickupTimeline status={pickup.status} />
          </div>

          {/* Details Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              fontSize: "0.85rem"
            }}
          >
            <div style={{ backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                Food Donation
              </span>
              <div style={{ fontWeight: "700", color: "#0f172a", marginTop: "0.15rem" }}>
                {pickup.donationTitle}
              </div>
            </div>

            <div style={{ backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                Claiming Organization
              </span>
              <div style={{ fontWeight: "700", color: "#047857", marginTop: "0.15rem" }}>
                {pickup.organization}
              </div>
            </div>

            <div style={{ backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                Pickup Scheduled For
              </span>
              <div style={{ fontWeight: "700", color: "#0f172a", marginTop: "0.15rem" }}>
                📅 {pickup.pickupDate}
              </div>
              <div style={{ color: "#475569", fontSize: "0.8rem" }}>{pickup.pickupTime}</div>
            </div>

            <div style={{ backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                Responsible Driver / Volunteer
              </span>
              <div style={{ fontWeight: "700", color: "#0f172a", marginTop: "0.15rem" }}>
                👤 {pickup.responsiblePerson}
              </div>
              <a
                href={`tel:${pickup.contactNumber}`}
                style={{ color: "#059669", fontWeight: "600", fontSize: "0.8rem", textDecoration: "none" }}
              >
                📞 {pickup.contactNumber}
              </a>
            </div>

            <div style={{ gridColumn: "span 2", backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                Pickup Address / Location
              </span>
              <div style={{ fontWeight: "600", color: "#1e293b", marginTop: "0.15rem" }}>
                📍 {pickup.pickupLocation}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pickup.pickupLocation)}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: "600", textDecoration: "none", marginTop: "0.25rem", display: "inline-block" }}
              >
                🗺️ Open in Google Maps Directions &rarr;
              </a>
            </div>

            {pickup.notes && (
              <div style={{ gridColumn: "span 2", backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                  Handling & Logistics Instructions
                </span>
                <div style={{ color: "#334155", fontSize: "0.8rem", marginTop: "0.15rem" }}>
                  {pickup.notes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
            Current Status: <strong>{pickup.status}</strong>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {pickup.status === "Pending" && (
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(pickup.id, "Scheduled");
                  onClose();
                }}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
              >
                🚚 Confirm & Schedule
              </button>
            )}

            {pickup.status === "Scheduled" && (
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(pickup.id, "Collected");
                  onClose();
                }}
                style={{
                  backgroundColor: "#059669",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
              >
                ✅ Mark as Collected
              </button>
            )}

            {pickup.status !== "Cancelled" && pickup.status !== "Collected" && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to cancel this pickup?")) {
                    onUpdateStatus(pickup.id, "Cancelled");
                    onClose();
                  }
                }}
                style={{
                  backgroundColor: "#fff1f2",
                  color: "#e11d48",
                  border: "1px solid #fecdd3",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
              >
                Cancel Pickup
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#e2e8f0",
                color: "#334155",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.375rem",
                fontWeight: "600",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

