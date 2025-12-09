import React, { useEffect, useState } from 'react';
import { fetchAllReservations, updateReservationStatus } from '../services/api';
import { getRole, getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface Reservation {
  id: string;
  carName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  returnLocation?: string;
  status?: string;
  createdAt?: string;
}

const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<Reservation[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken() || getRole() !== 'admin') {
      navigate('/login');
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchAllReservations();
        setItems(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load reservations');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const setStatus = async (id: string, status: string) => {
    try {
      await updateReservationStatus(id, status);
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err: any) {
      setError(err?.message || 'Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-base text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin dashboard</h1>
        <div className="w-16 h-1 bg-primary mb-6" />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="grid gap-4">
          {items.map((r) => (
            <div key={r.id} className="bg-box-grey p-4 border border-forms-border">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold">{r.carName || 'Car'}</div>
                  <div className="text-sm text-gray-300">
                    {r.firstName} {r.lastName} · {r.email} · {r.phone}
                  </div>
                </div>
                <select
                  value={r.status || 'pending'}
                  onChange={(e) => setStatus(r.id, e.target.value)}
                  className="bg-form-bg border border-forms-border text-white p-2 text-sm rounded-none"
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="paid">paid</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
              <div className="text-sm text-gray-200 space-y-1">
                <div>Pick-up: {r.pickupDate}</div>
                <div>Return: {r.returnDate}</div>
                <div>Locations: {r.pickupLocation} → {r.returnLocation}</div>
                {r.createdAt ? (
                  <div className="text-gray-400">Created: {new Date(r.createdAt).toLocaleString()}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
