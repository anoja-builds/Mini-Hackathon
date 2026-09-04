"use client";

import Link from "next/link";
import PickupStatusBadge from "./PickupStatusBadge";

export default function PickupCard({
  pickup,
  onViewDetails,
  onUpdateStatus,
  onDelete
}) {
  if (!pickup) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "0.875rem",
        padding: "1.25rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease"
      }}
    >
      {/* Top Header: ID & Badge */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.5rem"
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#94a3b8"
              }}
            >
              #PK-{pickup.id}
            </span>
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: "700",
                color: "#0f172a",
                margin: "0.2rem 0 0.1rem 0"
              }}
            >
              {pickup.donationTitle}
            </h3>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "#047857",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <span>🏢</span>
              <span>{pickup.organization}</span>
            </div>
          </div>

          <PickupStatusBadge status={pickup.status} />
        </div>

        {/* Logistics Grid */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #f1f5f9",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            marginTop: "0.85rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            fontSize: "0.75rem"
          }}
        >
          <div>
            <span style={{ color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", fontSize: "0.65rem" }}>
              Date & Time
            </span>
            <div style={{ fontWeight: "700", color: "#1e293b", marginTop: "0.1rem" }}>
              📅 {pickup.pickupDate}
            </div>
            <div style={{ color: "#475569" }}>{pickup.pickupTime}</div>
          </div>

          <div>
            <span style={{ color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", fontSize: "0.65rem" }}>
              Driver / Volunteer
            </span>
            <div style={{ fontWeight: "700", color: "#1e293b", marginTop: "0.1rem" }}>
              👤 {pickup.responsiblePerson}
            </div>
            <div style={{ color: "#475569" }}>📞 {pickup.contactNumber}</div>
          </div>

          <div style={{ gridColumn: "span 2", paddingTop: "0.35rem", borderTop: "1px solid #e2e8f0" }}>
            <span style={{ color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", fontSize: "0.65rem" }}>
              Pickup Location
            </span>
            <div style={{ color: "#334155", fontWeight: "500", marginTop: "0.1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              📍 {pickup.pickupLocation}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0.75rem",
          borderTop: "1px solid #f1f5f9",
          fontSize: "0.8rem"
        }}
      >
        <button
          type="button"
          onClick={() => onViewDetails && onViewDetails(pickup)}
          style={{
            background: "none",
            border: "none",
            color: "#047857",
            fontWeight: "700",
            cursor: "pointer",
            padding: "0.35rem 0.5rem",
            borderRadius: "0.375rem"
          }}
        >
          🔍 View Tracker
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Quick status actions */}
          {pickup.status === "Pending" && (
            <button
              type="button"
              onClick={() => onUpdateStatus && onUpdateStatus(pickup.id, "Scheduled")}
              style={{
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
                fontWeight: "600",
                fontSize: "0.75rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.375rem",
                cursor: "pointer"
              }}
            >
              🚚 Schedule
            </button>
          )}

          {pickup.status === "Scheduled" && (
            <button
              type="button"
              onClick={() => onUpdateStatus && onUpdateStatus(pickup.id, "Collected")}
              style={{
                backgroundColor: "#ecfdf5",
                color: "#047857",
                border: "1px solid #a7f3d0",
                fontWeight: "700",
                fontSize: "0.75rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.375rem",
                cursor: "pointer"
              }}
            >
              ✅ Mark Collected
            </button>
          )}

          {/* Edit link */}
          <Link
            href={`/pickups/edit/${pickup.id}`}
            style={{
              padding: "0.3rem 0.5rem",
              borderRadius: "0.375rem",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#475569",
              fontWeight: "600",
              fontSize: "0.75rem",
              cursor: "pointer"
            }}
            title="Edit pickup details"
          >
            ✏️ Edit
          </Link>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => onDelete && onDelete(pickup.id)}
            style={{
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: "0.2rem 0.35rem"
            }}
            title="Delete record"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
