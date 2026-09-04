"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../../services/api";

const SRI_LANKA_DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle"
];

const empty = {
  foodType: "",
  quantity: "",
  unit: "portions",
  district: "Colombo",
  location: "",
  expiryTime: "",
  pickupTime: "",
  contactInfo: "",
  status: "Available"
};

const toInputDate = (value) => {
  if (!value) return "";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  } catch {
    return "";
  }
};

export default function DonationForm({ donationId }) {
  const router = useRouter();
  const editing = Boolean(donationId);

  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    let isMounted = true;
    apiRequest(`/donations/${donationId}`)
      .then((d) => {
        if (!isMounted) return;
        setForm({
          ...d,
          expiryTime: toInputDate(d.expiryTime),
          pickupTime: toInputDate(d.pickupTime)
        });
      })
      .catch(() => {
        if (isMounted) setError("Donation not found or unable to load.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [donationId, editing]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.foodType.trim()) {
      setError("Food type is required.");
      setSaving(false);
      return;
    }

    if (!form.quantity || Number(form.quantity) < 1) {
      setError("Please enter a valid quantity of 1 or more.");
      setSaving(false);
      return;
    }

    if (!form.district.trim()) {
      setError("District is required.");
      setSaving(false);
      return;
    }

    if (!form.location.trim()) {
      setError("Pickup location is required.");
      setSaving(false);
      return;
    }

    if (!form.pickupTime) {
      setError("Pickup time is required.");
      setSaving(false);
      return;
    }

    if (!form.expiryTime) {
      setError("Expiry time is required.");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        foodType: form.foodType.trim(),
        quantity: Number(form.quantity),
        unit: (form.unit || "portions").trim(),
        district: form.district.trim(),
        location: form.location.trim(),
        expiryTime: new Date(form.expiryTime).toISOString(),
        pickupTime: new Date(form.pickupTime).toISOString(),
        contactInfo: form.contactInfo.trim(),
        status: form.status
      };

      await apiRequest(editing ? `/donations/${donationId}` : "/donations", {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(payload)
      });

      router.push("/donations");
      router.refresh();
    } catch (err) {
      setError(
        "Could not save the donation. Please ensure the backend API is running and all fields are valid."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="message">Loading donation details...</p>;

  return (
    <section className="form-page">
      <p className="eyebrow">Food Donations</p>
      <h1>{editing ? "Edit Donation" : "Share a Food Donation"}</h1>
      <p className="subheading">
        Provide clear pickup details so surplus food can reach communities in time.
      </p>

      {error && <p className="message error">{error}</p>}

      <form className="donation-form" onSubmit={submit}>
        <label>
          <span>Food Type</span>
          <input
            name="foodType"
            value={form.foodType}
            onChange={change}
            required
            placeholder="e.g. Rice & Curry"
          />
        </label>

        <div className="two-columns">
          <label>
            <span>Quantity</span>
            <input
              name="quantity"
              type="number"
              min="1"
              max="100000"
              value={form.quantity}
              onChange={change}
              required
              placeholder="e.g. 25"
            />
          </label>

          <label>
            <span>Unit</span>
            <input
              name="unit"
              value={form.unit}
              onChange={change}
              required
              placeholder="portions / boxes / kg / packs"
              list="unit-suggestions"
            />
            <datalist id="unit-suggestions">
              <option value="portions" />
              <option value="packs" />
              <option value="boxes" />
              <option value="meals" />
              <option value="kg" />
            </datalist>
          </label>
        </div>

        <div className="two-columns">
          <label>
            <span>District</span>
            <select name="district" value={form.district} onChange={change} required>
              {SRI_LANKA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Pickup Location / Address</span>
            <input
              name="location"
              value={form.location}
              onChange={change}
              required
              placeholder="e.g. 120 Galle Road, Colombo 03"
            />
          </label>
        </div>

        <div className="two-columns">
          <label>
            <span>Pickup Time</span>
            <input
              name="pickupTime"
              type="datetime-local"
              value={form.pickupTime}
              onChange={change}
              required
            />
          </label>

          <label>
            <span>Expiry Time</span>
            <input
              name="expiryTime"
              type="datetime-local"
              value={form.expiryTime}
              onChange={change}
              required
            />
          </label>
        </div>

        <label>
          <span>Contact Information</span>
          <input
            name="contactInfo"
            value={form.contactInfo}
            onChange={change}
            required
            placeholder="e.g. +94 77 123 4567 or contact@donor.lk"
          />
        </label>

        <label>
          <span>Donation Status</span>
          <select name="status" value={form.status} onChange={change}>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Collected">Collected</option>
            <option value="Expired">Expired</option>
          </select>
        </label>

        <div className="form-actions">
          <Link href="/donations" className="button-link cancel">
            Cancel
          </Link>
          <button type="submit" className="button" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Publish donation"}
          </button>
        </div>
      </form>
    </section>
  );
}
