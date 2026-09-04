'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RequestForm from '@/components/RequestForm';

export default function EditRequestPage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/foodrequests/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        }
      } catch (error) {
        console.error('Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequest();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const res = await fetch(`http://localhost:5000/api/foodrequests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/requests');
      } else {
        alert('Failed to update food request');
      }
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading request details...</p>;
  if (!initialData) return <p className="p-6 text-center text-red-500">Request not found.</p>;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <RequestForm initialData={initialData} onSubmit={handleUpdate} isEditing={true} />
    </div>
  );
}