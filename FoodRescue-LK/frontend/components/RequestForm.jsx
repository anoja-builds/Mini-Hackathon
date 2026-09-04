'use client';
import { useState } from 'react';

export default function RequestForm({ initialData = {}, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    foodType: initialData.foodType || '',
    requiredQuantity: initialData.requiredQuantity || '',
    district: initialData.district || '',
    location: initialData.location || '',
    requiredDate: initialData.requiredDate ? initialData.requiredDate.split('T')[0] : '',
    contactInformation: initialData.contactInformation || '',
    reason: initialData.reason || '',
    status: initialData.status || 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      requiredQuantity: parseInt(formData.requiredQuantity, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">
        {isEditing ? 'Edit Food Request' : 'Create Food Request'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Food Type</label>
        <input
          type="text"
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          required
          placeholder="e.g. Rice, Bread, Dry Rations"
          className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Required Quantity (portions)</label>
        <input
          type="number"
          name="requiredQuantity"
          value={formData.requiredQuantity}
          onChange={handleChange}
          required
          min="1"
          placeholder="e.g. 50"
          className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            placeholder="e.g. Jaffna"
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g. Jaffna Town"
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Required Date</label>
        <input
          type="date"
          name="requiredDate"
          value={formData.requiredDate}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Information</label>
        <input
          type="text"
          name="contactInformation"
          value={formData.contactInformation}
          onChange={handleChange}
          required
          placeholder="Phone number or Email"
          className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="3"
          placeholder="Reason for requesting food..."
          className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isEditing && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Fulfilled">Fulfilled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
      >
        {isEditing ? 'Update Request' : 'Submit Request'}
      </button>
    </form>
  );
}