"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../../services/api";

const SRI_LANKA_DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle"
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

const emptyErrors = {
  foodType: "",
  quantity: "",
  unit: "",
  location: "",
  pickupTime: "",
  expiryTime: "",
  contactInfo: ""
};

const toInputDate = (value) => {
  if (!value) return "";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  } catch {
    return "";
  }
};

function validateField(name, value, form) {
  switch (name) {
    case "foodType":
      if (!value.trim()) return "Food type is required.";
      if (value.trim().length < 2) return "Food type must be at least 2 characters.";
      if (value.trim().length > 100) return "Food type must be 100 characters or less.";
      return "";

    case "quantity":
      if (value === "" || value === null) return "Quantity is required.";
      if (isNaN(Number(value))) return "Quantity must be a number.";
      if (Number(value) < 1) return "Quantity must be at least 1.";
      if (Number(value) > 100000) return "Quantity cannot exceed 100,000.";
      return "";

    case "unit":
      if (!value.trim()) return "Unit is required (e.g. portions, kg, boxes).";
      if (value.trim().length > 30) return "Unit must be 30 characters or less.";
      return "";

    case "location":
      if (!value.trim()) return "Pickup location is required.";
      if (value.trim().length < 5) return "Please enter a more specific location (min 5 characters).";
      if (value.trim().length > 200) return "Location must be 200 characters or less.";
      return "";

    case "pickupTime": {
      if (!value) return "Pickup time is required.";
      const pickup = new Date(value);
      if (isNaN(pickup.getTime())) return "Please enter a valid pickup time.";
      if (pickup < new Date()) return "Pickup time must be in the future.";
      return "";
    }

    case "expiryTime": {
      if (!value) return "Expiry time is required.";
      const expiry = new Date(value);
      if (isNaN(expiry.getTime())) return "Please enter a valid expiry time.";
      if (value && form.pickupTime) {
        const pickup = new Date(form.pickupTime);
        if (expiry < pickup) return "Expiry time must be after pickup time.";
      }
      return "";
    }

    case "contactInfo": {
      if (!value.trim()) return "Contact information is required.";
      if (value.trim().length < 7) return "Please enter a valid phone number or email.";
      if (value.trim().length > 150) return "Contact info must be 150 characters or less.";
      // Accept phone or email
      const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!phoneRegex.test(value.trim()) && !emailRegex.test(value.trim())) {
        return "Enter a valid phone number (e.g. +94 77 123 4567) or email address.";
      }
      return "";
    }

    default:
      return "";
  }
}

function validateAll(form) {
  const fields = ["foodType", "quantity", "unit", "location", "pickupTime", "expiryTime", "contactInfo"];
  const errs = {};
  let hasError = false;
  for (const field of fields) {
    const msg = validateField(field, form[field], form);
    errs[field] = msg;
    if (msg) hasError = true;
  }
  return { errs, hasError };
}

export default function DonationForm({ donationId }) {
  const router = useRouter();
  const editing = Boolean(donationId);

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState(emptyErrors);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
        if (isMounted) setSubmitError("Donation not found or unable to load.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [donationId, editing]);

  const change = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    // Re-validate touched field on change
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value, updatedForm) }));
    }
    // Also re-validate expiryTime if pickupTime changes (cross-field)
    if (name === "pickupTime" && touched["expiryTime"]) {
      setErrors((prev) => ({
        ...prev,
        expiryTime: validateField("expiryTime", updatedForm.expiryTime, updatedForm)
      }));
    }
  };

  const blur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value, form) }));
  };

  async function submit(e) {
    e.preventDefault();
    setSubmitError("");

    // Mark all fields touched and validate
    const allTouched = Object.keys(emptyErrors).reduce((acc, k) => { acc[k] = true; return acc; }, {});
    setTouched(allTouched);

    const { errs, hasError } = validateAll(form);
    setErrors(errs);

    if (hasError) {
      setSubmitError("Please fix the errors above before submitting.");
      return;
    }

    setSaving(true);
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
      setSubmitError(
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

      {submitError && <p className="message error">{submitError}</p>}

      <form className="donation-form" onSubmit={submit} noValidate>

        {/* Food Type */}
        <div className="field-group">
          <label htmlFor="foodType">
            Food Type <span className="required">*</span>
          </label>
          <input
            id="foodType"
            name="foodType"
            value={form.foodType}
            onChange={change}
            onBlur={blur}
            placeholder="e.g. Rice & Curry"
            className={errors.foodType ? "input-error" : ""}
          />
          {errors.foodType && <span className="field-error">{errors.foodType}</span>}
        </div>

        {/* Quantity + Unit */}
        <div className="two-columns">
          <div className="field-group">
            <label htmlFor="quantity">
              Quantity <span className="required">*</span>
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max="100000"
              value={form.quantity}
              onChange={change}
              onBlur={blur}
              placeholder="e.g. 25"
              className={errors.quantity ? "input-error" : ""}
            />
            {errors.quantity && <span className="field-error">{errors.quantity}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="unit">
              Unit <span className="required">*</span>
            </label>
            <input
              id="unit"
              name="unit"
              value={form.unit}
              onChange={change}
              onBlur={blur}
              placeholder="portions / kg / boxes / packs"
              list="unit-suggestions"
              className={errors.unit ? "input-error" : ""}
            />
            <datalist id="unit-suggestions">
              <option value="portions" />
              <option value="packs" />
              <option value="boxes" />
              <option value="meals" />
              <option value="kg" />
            </datalist>
            {errors.unit && <span className="field-error">{errors.unit}</span>}
          </div>
        </div>

        {/* District + Location */}
        <div className="two-columns">
          <div className="field-group">
            <label htmlFor="district">
              District <span className="required">*</span>
            </label>
            <select id="district" name="district" value={form.district} onChange={change}>
              {SRI_LANKA_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="location">
              Pickup Location / Address <span className="required">*</span>
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={change}
              onBlur={blur}
              placeholder="e.g. 120 Galle Road, Colombo 03"
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && <span className="field-error">{errors.location}</span>}
          </div>
        </div>

        {/* Pickup Time + Expiry Time */}
        <div className="two-columns">
          <div className="field-group">
            <label htmlFor="pickupTime">
              Pickup Time <span className="required">*</span>
            </label>
            <input
              id="pickupTime"
              name="pickupTime"
              type="datetime-local"
              value={form.pickupTime}
              onChange={change}
              onBlur={blur}
              className={errors.pickupTime ? "input-error" : ""}
            />
            {errors.pickupTime && <span className="field-error">{errors.pickupTime}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="expiryTime">
              Expiry Time <span className="required">*</span>
            </label>
            <input
              id="expiryTime"
              name="expiryTime"
              type="datetime-local"
              value={form.expiryTime}
              onChange={change}
              onBlur={blur}
              className={errors.expiryTime ? "input-error" : ""}
            />
            {errors.expiryTime && <span className="field-error">{errors.expiryTime}</span>}
          </div>
        </div>

        {/* Contact Info */}
        <div className="field-group">
          <label htmlFor="contactInfo">
            Contact Information <span className="required">*</span>
          </label>
          <input
            id="contactInfo"
            name="contactInfo"
            value={form.contactInfo}
            onChange={change}
            onBlur={blur}
            placeholder="e.g. +94 77 123 4567 or contact@donor.lk"
            className={errors.contactInfo ? "input-error" : ""}
          />
          {errors.contactInfo && <span className="field-error">{errors.contactInfo}</span>}
          <span className="field-hint">Phone number or email address</span>
        </div>

        {/* Donation Status */}
        <div className="field-group">
          <label htmlFor="status">Donation Status</label>
          <select id="status" name="status" value={form.status} onChange={change}>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Collected">Collected</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <p className="required-note"><span className="required">*</span> Required fields</p>

        <div className="form-actions">
          <Link href="/donations" className="button-link cancel">Cancel</Link>
          <button type="submit" className="button" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Publish donation"}
          </button>
        </div>
      </form>
    </section>
  );
}
