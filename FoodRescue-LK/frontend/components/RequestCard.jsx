'use client';
import Link from 'next/link';

export default function RequestCard({ request, onDelete }) {
  const formattedDate = new Date(request.requiredDate).toLocaleDateString();

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">Request #{request.id}</h3>
        <span
          className={`rounded px-2.5 py-1 text-xs font-semibold ${
            request.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : request.status === 'Fulfilled'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {request.status}
        </span>
      </div>

      <div className="mb-4 space-y-1 text-sm text-gray-600">
        <p><span className="font-semibold text-gray-800">Food:</span> {request.foodType}</p>
        <p><span className="font-semibold text-gray-800">Quantity:</span> {request.requiredQuantity} portions</p>
        <p><span className="font-semibold text-gray-800">District:</span> {request.district}</p>
        <p><span className="font-semibold text-gray-800">Location:</span> {request.location}</p>
        <p><span className="font-semibold text-gray-800">Required:</span> {formattedDate}</p>
        <p><span className="font-semibold text-gray-800">Contact:</span> {request.contactInformation}</p>
        {request.reason && (
          <p><span className="font-semibold text-gray-800">Reason:</span> {request.reason}</p>
        )}
      </div>

      <div className="flex gap-2 border-t pt-3">
        <Link
          href={`/requests/edit/${request.id}`}
          className="rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(request.id)}
          className="rounded border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}