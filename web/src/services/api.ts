import { getToken } from '../utils/auth';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001/api';

const headers = (): Record<string, string> => {
  const token = getToken();
  const base: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) base.Authorization = `Bearer ${token}`;
  return base;
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const register = async (email: string, password: string, name?: string) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const fetchMyReservations = async () => {
  const res = await fetch(`${API_BASE}/my/reservations`, { headers: headers() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const fetchAllReservations = async () => {
  const res = await fetch(`${API_BASE}/reservations`, { headers: headers() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateReservationStatus = async (id: string, status: string) => {
  const res = await fetch(`${API_BASE}/reservations/${id}/status`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
