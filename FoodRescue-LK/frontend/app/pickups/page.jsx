"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pickupService } from "../../services/pickupService";
import PickupStats from "../../components/PickupStats";
import PickupCard from "../../components/PickupCard";
import PickupDetailModal from "../../components/PickupDetailModal";

export default function PickupsPage() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    try {
      setLoading(true);
      const data = await pickupService.getAllPickups();
      setPickups(data);
    } catch (err) {
      console.error("Failed to load pickups", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await pickupService.updateStatus(id, newStatus);
      setPickups((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, status: newStatus } : p))
      );
      if (selectedPickup && String(selectedPickup.id) === String(id)) {
        setSelectedPickup((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDeletePickup = async (id) => {
    if (!confirm(`Are you sure you want to delete pickup record #PK-${id}?`)) {
      return;
    }
    try {
      await pickupService.deletePickup(id);
      setPickups((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      alert("Failed to delete pickup: " + err.message);
    }
  };

  const handleOpenDetails = (pickup) => {
    setSelectedPickup(pickup);
    setIsModalOpen(true);
  };

  const filteredPickups = pickups.filter((item) => {
    const matchesFilter =
      filter === "all" || item.status.toLowerCase() === filter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.donationTitle?.toLowerCase().includes(q) ||
      item.organization?.toLowerCase().includes(q) ||
      item.pickupLocation?.toLowerCase().includes(q) ||
      item.responsiblePerson?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.25rem"
            }}
          >
            <span>Food Claims & Logistics</span>
            <span>&bull;</span>
            <span>Dispatch System</span>
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: "900",
              color: "#0f172a",
              margin: 0
            }}
          >
            Food Donation Pickups
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
            Manage and track surplus food collection from donors to claiming organizations across Sri Lanka.
          </p>
        </div>

        <Link
          href="/pickups/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#059669",
            color: "#ffffff",
            padding: "0.65rem 1.25rem",
            borderRadius: "0.5rem",
            fontWeight: "700",
            fontSize: "0.875rem",
            textDecoration: "none",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}
        >
          <span>➕</span>
          <span>Schedule New Pickup</span>
        </Link>
      </div>

      {/* KPI Stats summary */}
      <PickupStats
        pickups={pickups}
        currentFilter={filter}
        onSelectFilter={(f) => setFilter(f)}
      />

      {/* Search & Filter Toolbar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          padding: "1rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "260px", flex: "1 1 260px" }}>
          <span
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "0.9rem"
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search food item, organization, driver, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem 0.5rem 2.25rem",
              fontSize: "0.85rem",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
              color: "#1e293b",
              outline: "none"
            }}
          />
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {[
            { key: "all", label: `All (${pickups.length})` },
            { key: "Pending", label: "⏳ Pending" },
            { key: "Scheduled", label: "🚚 Scheduled" },
            { key: "Collected", label: "✅ Collected" },
            { key: "Cancelled", label: "❌ Cancelled" }
          ].map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: "0.45rem 0.8rem",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  borderRadius: "0.5rem",
                  border: active ? "1px solid #059669" : "1px solid #e2e8f0",
                  backgroundColor: active ? "#059669" : "#ffffff",
                  color: active ? "#ffffff" : "#475569",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#64748b" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
          <p style={{ fontWeight: "600" }}>Loading pickup records...</p>
        </div>
      ) : filteredPickups.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2px dashed #e2e8f0",
            borderRadius: "1rem",
            padding: "3rem 2rem",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔍</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 0.25rem 0" }}>
            No pickups match your criteria
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            Try resetting your search query or switching the status filter tab.
          </p>
          <button
            onClick={() => {
              setFilter("all");
              setSearchQuery("");
            }}
            style={{
              marginTop: "1rem",
              backgroundColor: "#ecfdf5",
              color: "#047857",
              border: "1px solid #a7f3d0",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "700",
              fontSize: "0.8rem",
              cursor: "pointer"
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.25rem"
          }}
        >
          {filteredPickups.map((item) => (
            <PickupCard
              key={item.id}
              pickup={item}
              onViewDetails={handleOpenDetails}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeletePickup}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <PickupDetailModal
        pickup={selectedPickup}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
