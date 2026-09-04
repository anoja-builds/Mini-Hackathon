"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import DonationList from "./components/DonationList";
import { apiRequest } from "../../services/api";

const STATUS_FILTERS = ["All", "Available", "Reserved", "Collected", "Expired"];

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDonations = useCallback(async (term = "") => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(`/donations?search=${encodeURIComponent(term)}`);
      setDonations(Array.isArray(data) ? data : []);
    } catch {
      setError("Could not load donations. Please verify the backend API is running on http://localhost:5184.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

  async function handleSearch(e) {
    e.preventDefault();
    loadDonations(search);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this food donation?")) {
      return;
    }

    try {
      await apiRequest(`/donations/${id}`, { method: "DELETE" });
      // Optimistically remove from state, then reload
      setDonations((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Could not delete the donation. Please try again.");
    }
  }

  const filteredDonations = donations.filter((d) => {
    if (selectedStatus === "All") return true;
    return (d.status || "").toLowerCase() === selectedStatus.toLowerCase();
  });

  return (
    <section className="donation-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Food Donations Management</p>
          <h1>Available Food Near You</h1>
          <p className="subheading">
            Connect surplus food from hotels, restaurants, and individuals with local charities across Sri Lanka.
          </p>
        </div>
        <Link className="button" href="/donations/create">
          + Add Food Donation
        </Link>
      </div>

      <div className="filters-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by food type (e.g. Rice & Curry), district, location or status"
          />
          <button type="submit">Search</button>
          {search && (
            <button
              type="button"
              className="text-button clear-button"
              onClick={() => {
                setSearch("");
                loadDonations("");
              }}
            >
              Clear
            </button>
          )}
        </form>

        <div className="status-pills">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              className={`status-pill ${selectedStatus === s ? "active" : ""}`}
              onClick={() => setSelectedStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="message error">{error}</p>}

      {loading ? (
        <p className="message loading">Loading donations...</p>
      ) : (
        <DonationList donations={filteredDonations} onDelete={handleDelete} />
      )}
    </section>
  );
}
