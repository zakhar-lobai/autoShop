import React, { useEffect, useState } from 'react';
import { fetchMyReservations } from '../services/api';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface Reservation {
  id: string;
  carName?: string;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  returnLocation?: string;
  status?: string;
  amount?: number;
  createdAt?: string;
}

const MyBookings: React.FC = () => {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchMyReservations();
        setItems(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-base text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My bookings</h1>
        <div className="w-16 h-1 bg-primary mb-6" />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {!loading && !items.length && <p>No bookings yet.</p>}
        <div className="space-y-4">
          {items.map((r) => (
            <div key={r.id} className="bg-box-grey p-4 border border-forms-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">{r.carName || 'Car'}</span>
                <span className="uppercase text-primary">{r.status || 'pending'}</span>
              </div>
              <div className="text-sm text-gray-200 space-y-1">
                <div>Pick-up: {r.pickupDate}</div>
                <div>Return: {r.returnDate}</div>
                <div>Locations: {r.pickupLocation} → {r.returnLocation}</div>
                {r.amount ? <div>Amount: {r.amount} PLN</div> : null}
                {r.createdAt ? <div className="text-gray-400">Created: {new Date(r.createdAt).toLocaleString()}</div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
