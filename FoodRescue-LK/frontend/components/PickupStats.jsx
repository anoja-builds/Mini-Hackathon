"use client";

export default function PickupStats({ pickups = [], currentFilter, onSelectFilter }) {
  const total = pickups.length;
  const pending = pickups.filter((p) => p.status === "Pending").length;
  const scheduled = pickups.filter((p) => p.status === "Scheduled").length;
  const collected = pickups.filter((p) => p.status === "Collected").length;
  const cancelled = pickups.filter((p) => p.status === "Cancelled").length;

  const statCards = [
    {
      key: "all",
      label: "Total Pickups",
      count: total,
      sub: "In dispatch system",
      icon: "📦",
      color: "#1e293b",
      bg: "#ffffff",
      border: currentFilter === "all" ? "#059669" : "#e2e8f0"
    },
    {
      key: "Pending",
      label: "Pending Schedule",
      count: pending,
      sub: "Needs driver / slot",
      icon: "⏳",
      color: "#92400e",
      bg: "#fffbeb",
      border: currentFilter === "Pending" ? "#f59e0b" : "#fef3c7"
    },
    {
      key: "Scheduled",
      label: "Scheduled",
      count: scheduled,
      sub: "Confirmed with donor",
      icon: "🚚",
      color: "#1e40af",
      bg: "#eff6ff",
      border: currentFilter === "Scheduled" ? "#3b82f6" : "#dbeafe"
    },
    {
      key: "Collected",
      label: "Collected",
      count: collected,
      sub: "Safely rescued & logged",
      icon: "✅",
      color: "#065f46",
      bg: "#ecfdf5",
      border: currentFilter === "Collected" ? "#10b981" : "#d1fae5"
    },
    {
      key: "Cancelled",
      label: "Cancelled",
      count: cancelled,
      sub: "Unable to retrieve",
      icon: "❌",
      color: "#9f1239",
      bg: "#fff1f2",
      border: currentFilter === "Cancelled" ? "#f43f5e" : "#ffe4e6"
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}
    >
      {statCards.map((card) => (
        <div
          key={card.key}
          onClick={() => onSelectFilter && onSelectFilter(card.key)}
          style={{
            backgroundColor: card.bg,
            border: `2px solid ${card.border}`,
            borderRadius: "0.75rem",
            padding: "1rem",
            cursor: "pointer",
            boxShadow: currentFilter === card.key ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            transform: currentFilter === card.key ? "translateY(-2px)" : "none",
            transition: "all 0.15s ease"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.03em"
            }}
          >
            <span>{card.label}</span>
            <span style={{ fontSize: "1rem" }}>{card.icon}</span>
          </div>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: "900",
              color: card.color,
              marginTop: "0.35rem",
              lineHeight: "1.1"
            }}
          >
            {card.count}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "#94a3b8",
              marginTop: "0.25rem"
            }}
          >
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

