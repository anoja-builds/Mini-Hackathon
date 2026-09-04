import Link from "next/link";
import DonationCard from "./DonationCard";

export default function DonationList({ donations, onDelete }) {
  if (!donations || donations.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No donations found</p>
        <p className="empty-subtitle">
          There are no food donations matching the selected criteria.
        </p>
        <Link href="/donations/create" className="button">
          + Add First Donation
        </Link>
      </div>
    );
  }

  return (
    <div className="donation-grid">
      {donations.map((donation) => (
        <DonationCard key={donation.id} donation={donation} onDelete={onDelete} />
      ))}
    </div>
  );
}
