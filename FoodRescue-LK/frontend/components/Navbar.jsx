import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#064e3b",
        color: "#ffffff",
        borderBottom: "1px solid #047857",
        padding: "0.85rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1.25rem",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textDecoration: "none"
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>🍲</span>
          <span>FoodRescue LK</span>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.875rem", fontWeight: "600" }}>
        <Link href="/donations" style={{ color: "#d1fae5", textDecoration: "none" }}>
          Donations
        </Link>
        <Link href="/requests" style={{ color: "#d1fae5", textDecoration: "none" }}>
          Requests
        </Link>
        <Link href="/organizations" style={{ color: "#d1fae5", textDecoration: "none" }}>
          Organizations
        </Link>
        <Link
          href="/pickups"
          style={{
            backgroundColor: "#059669",
            color: "#ffffff",
            padding: "0.35rem 0.85rem",
            borderRadius: "0.375rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            border: "1px solid #34d399"
          }}
        >
          <span>🚚</span>
          <span>Pickups & Claims</span>
        </Link>
      </div>
    </nav>
  );
}
