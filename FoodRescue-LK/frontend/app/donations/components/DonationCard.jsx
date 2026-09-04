import Link from "next/link";

function formatTime(value) {
  if (!value) return "Not specified";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    // Format to e.g. "6:00 PM" or "Sep 4, 6:00 PM"
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return value;
  }
}

function formatFullDate(value) {
  if (!value) return "Not specified";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  } catch {
    return value;
  }
}

export default function DonationCard({ donation, onDelete }) {
  const statusLower = (donation.status || "available").toLowerCase();

  return (
    <article className="donation-card">
      <div className="card-top">
        <h2 className="food-type">{donation.foodType}</h2>
        <span className={`status ${statusLower}`}>
          Status: {donation.status}
        </span>
      </div>

      <p className="quantity">
        {donation.quantity} {donation.unit || "portions"}
      </p>

      <div className="card-location">
        <span className="location-name">
          {donation.location ? `${donation.location}, ${donation.district}` : donation.district}
        </span>
      </div>

      <dl className="card-meta">
        <div>
          <dt>Pickup:</dt>
          <dd>{formatTime(donation.pickupTime)}</dd>
        </div>
        <div>
          <dt>Expires:</dt>
          <dd>{formatFullDate(donation.expiryTime)}</dd>
        </div>
        {donation.contactInfo && (
          <div>
            <dt>Contact:</dt>
            <dd>{donation.contactInfo}</dd>
          </div>
        )}
      </dl>

      <div className="card-actions">
        <Link href={`/donations/edit/${donation.id}`} className="action-button edit">
          Edit
        </Link>
        <button
          type="button"
          className="action-button delete danger"
          onClick={() => onDelete(donation.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
