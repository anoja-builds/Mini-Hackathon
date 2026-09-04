'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RequestCard from '@/components/RequestCard';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/foodrequests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this food request?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/foodrequests/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete request:', error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Requests</h1>
          <p className="text-sm text-gray-500">Manage community food requests</p>
        </div>
        <Link
          href="/requests/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + New Request
        </Link>
      </div>

      {loading ? (
        <p className="py-8 text-center text-gray-500">Loading food requests...</p>
      ) : requests.length === 0 ? (
        <p className="py-8 text-center text-gray-500">No food requests found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <RequestCard key={req.id} request={req} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}