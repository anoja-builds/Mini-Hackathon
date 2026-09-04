'use client';
import { useRouter } from 'next/navigation';
import RequestForm from '@/components/RequestForm';

export default function CreateRequestPage() {
  const router = useRouter();

  const handleCreate = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/foodrequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/requests');
      } else {
        alert('Failed to create food request');
      }
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <RequestForm onSubmit={handleCreate} />
    </div>
  );
}