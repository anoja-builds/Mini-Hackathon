"use client";

export default function PickupStatusBadge({ status }) {
  const getStyles = () => {
    switch (status) {
      case "Pending":
        return {
          bg: "#fef3c7",
          text: "#92400e",
          border: "#fcd34d",
          icon: "⏳",
          label: "Pending Schedule"
        };
      case "Scheduled":
        return {
          bg: "#dbeafe",
          text: "#1e40af",
          border: "#93c5fd",
          icon: "🚚",
          label: "Scheduled"
        };
      case "Collected":
        return {
          bg: "#d1fae5",
          text: "#065f46",
          border: "#6ee7b7",
          icon: "✅",
          label: "Collected"
        };
      case "Cancelled":
        return {
          bg: "#ffe4e6",
          text: "#9f1239",
          border: "#fda4af",
          icon: "❌",
          label: "Cancelled"
        };
      default:
        return {
          bg: "#f1f5f9",
          text: "#475569",
          border: "#cbd5e1",
          icon: "📦",
          label: status || "Unknown"
        };
    }
  };

  const s = getStyles();

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.25rem 0.65rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "700",
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        lineHeight: "1",
        letterSpacing: "0.01em"
      }}
    >
      <span>{s.icon}</span>
      <span>{s.label}</span>
    </span>
  );
}

