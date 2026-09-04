"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_CLAIMED_DONATIONS = [
  {
    title: "50 Packets of Vegetable Fried Rice (Perera Bakers)",
    location: "Perera Bakers, No. 120, Galle Road, Wellawatte, Colombo 06",
    organization: "Colombo Community Kitchen"
  },
  {
    title: "30 Fresh Bread Loaves & 40 Buns (Keells Super)",
    location: "Keells Supermarket, Galle Road, Dehiwala Junction",
    organization: "Sarvodaya Community Center"
  },
  {
    title: "35 Cooked Meal Packs (Hilton Colombo Banquet)",
    location: "Hilton Colombo, Sir Chittampalam A Gardiner Mawatha, Colombo 02",
    organization: "Voice for the Voiceless Sri Lanka"
  },
  {
    title: "50kg Fresh Vegetables - Carrots, Cabbage (Manning Market)",
    location: "Manning Market Complex, Peliyagoda Wholesale Yard",
    organization: "Hope Elder's Home Moratuwa"
  }
];

export default function PickupForm({
  initialData = null,
  isEdit = false,
  onSubmit,
  isSubmitting = false
}) {
  const router = useRouter();

  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    donationTitle: initialData?.donationTitle || "",
    organization: initialData?.organization || "",
    pickupDate: initialData?.pickupDate || todayStr,
    pickupTime: initialData?.pickupTime || "02:30 PM - 03:30 PM",
    pickupLocation: initialData?.pickupLocation || "",
    responsiblePerson: initialData?.responsiblePerson || "",
    contactNumber: initialData?.contactNumber || "",
    status: initialData?.status || "Scheduled",
    notes: initialData?.notes || ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickSelectDonation = (e) => {
    const selectedTitle = e.target.value;
    if (!selectedTitle) return;

    const matched = SAMPLE_CLAIMED_DONATIONS.find((d) => d.title === selectedTitle);
    if (matched) {
      setFormData((prev) => ({
        ...prev,
        donationTitle: matched.title,
        pickupLocation: matched.location,
        organization: prev.organization || matched.organization
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.donationTitle.trim()) {
      setErrorMessage("Please enter the food donation title or item description.");
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMessage("Please provide the claiming organization or receiver.");
      return;
    }
    if (!formData.pickupLocation.trim()) {
      setErrorMessage("Please provide the pickup location / donor address.");
      return;
    }
    if (!formData.responsiblePerson.trim()) {
      setErrorMessage("Please provide the responsible person / volunteer driver.");
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMessage("Please enter a valid Sri Lankan contact phone number.");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setErrorMessage(err.message || "Failed to save pickup schedule. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        maxWidth: "760px",
        margin: "0 auto"
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
          {isEdit ? "✏️ Edit Pickup & Reschedule" : "🚚 Schedule Donation Pickup"}
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
          {isEdit
            ? "Modify collection logistics, driver contacts, or status update."
            : "Connect a claimed food donation to on-site volunteer driver retrieval."}
        </p>
      </div>

      {errorMessage && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            fontSize: "0.85rem",
            marginBottom: "1.5rem"
          }}
        >
          ⚠️ {errorMessage}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Step 1: Donation & Org */}
        <div>
          <div style={{ fontSize: "0.8rem", fontWeight: "800", color: "#059669", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
            1. Claimed Donation Details
          </div>

          {!isEdit && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Auto-fill from Claimed Donations (Optional)
              </label>
              <select
                onChange={handleQuickSelectDonation}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#f8fafc",
                  color: "#1e293b"
                }}
              >
                <option value="">-- Choose a claimed donation to auto-populate --</option>
                {SAMPLE_CLAIMED_DONATIONS.map((d, i) => (
                  <option key={i} value={d.title}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Food Donation Title *
              </label>
              <input
                type="text"
                name="donationTitle"
                value={formData.donationTitle}
                onChange={handleChange}
                placeholder="e.g. 50 Packets of Vegetable Fried Rice"
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Claiming Organization / Receiver *
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Colombo Community Kitchen"
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>
          </div>
        </div>

        {/* Step 2: Schedule & Location */}
        <div>
          <div style={{ fontSize: "0.8rem", fontWeight: "800", color: "#059669", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
            2. Schedule & Pickup Location
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Pickup Date *
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Time Window *
              </label>
              <input
                type="text"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                placeholder="e.g. 02:30 PM - 03:30 PM"
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Pickup Location / Address *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="e.g. No. 120, Galle Road, Wellawatte, Colombo 06"
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>
          </div>
        </div>

        {/* Step 3: Responsible Driver & Status */}
        <div>
          <div style={{ fontSize: "0.8rem", fontWeight: "800", color: "#059669", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
            3. Logistics Assignment & Status
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Responsible Person (Driver/Volunteer) *
              </label>
              <input
                type="text"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                placeholder="e.g. Kavinda Silva (Driver)"
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Contact Phone (Sri Lanka) *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="e.g. 077 123 4567"
                required
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Pickup Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#f8fafc",
                  color: "#1e293b",
                  fontWeight: "600"
                }}
              >
                <option value="Scheduled">🚚 Scheduled (Confirmed with driver & donor)</option>
                <option value="Pending">⏳ Pending (Draft / awaiting driver assignment)</option>
                <option value="Collected">✅ Collected (Food physically retrieved)</option>
                <option value="Cancelled">❌ Cancelled</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Handling Notes / Vehicle Info
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Van WP-CAD-4512, Thermal bags required"
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#1e293b"
                }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.75rem",
          marginTop: "2rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid #e2e8f0"
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/pickups")}
          disabled={isSubmitting}
          style={{
            backgroundColor: "#f1f5f9",
            color: "#475569",
            border: "1px solid #cbd5e1",
            padding: "0.6rem 1.2rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
            fontSize: "0.85rem",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#9ca3af" : "#059669",
            color: "#ffffff",
            border: "none",
            padding: "0.6rem 1.4rem",
            borderRadius: "0.5rem",
            fontWeight: "700",
            fontSize: "0.85rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
          }}
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
            ? "💾 Update Pickup Record"
            : "🚚 Confirm & Schedule Pickup"}
        </button>
      </div>
    </form>
  );
}
