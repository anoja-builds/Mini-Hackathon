import DonationForm from "../../components/DonationForm";

export default function EditDonationPage({ params }) {
  return <DonationForm donationId={params?.id} />;
}
