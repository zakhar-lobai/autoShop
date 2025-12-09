import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const USE_FIRESTORE = String(process.env.USE_FIRESTORE ?? 'false').toLowerCase() === 'true';
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

app.use(cors());
app.use(express.json());

// Optional Stripe
const stripe =
  process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
    : null;

// Optional Firestore
let db = null;
if (USE_FIRESTORE) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    db = admin.firestore();
    console.log('Firestore initialized');
  } catch (err) {
    console.warn('Firestore init failed, falling back to JSON only:', err.message);
    db = null;
  }
}

// Load cars from JSON as fallback
const localCarsPath = path.join(process.cwd(), '..', 'mobile', 'app', 'car', 'carData.json');
let localCars = [];
try {
  const raw = fs.readFileSync(localCarsPath, 'utf-8');
  localCars = JSON.parse(raw);
  console.log(`Loaded ${localCars.length} cars from local JSON`);
} catch (err) {
  console.warn('Cannot load local carData.json:', err.message);
}

const reservationsMemory = [];
const usersMemory = [];

const authMiddleware = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing Authorization header' });
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const requireFields = (body, fields) => {
  const missing = [];
  for (const f of fields) {
    if (!body[f]) missing.push(f);
  }
  return missing;
};

// Health
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
// API root helper
app.get('/api', (_req, res) => res.json({ status: 'ok', message: 'API root', endpoints: ['/api/health', '/api/cars', '/api/reservations'] }));
// Root helper
app.get('/', (_req, res) => res.json({ status: 'ok', message: 'Backend root', api: '/api' }));

// Cars
app.get('/api/cars', async (_req, res) => {
  if (db) {
    try {
      const snap = await db.collection('cars').get();
      const cars = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return res.json(cars);
    } catch (err) {
      console.warn('Firestore cars fetch failed, serving local JSON', err.message);
    }
  }
  return res.json(localCars);
});

// Simple auth mock (for demo; replace with real auth)
app.post('/api/register', async (req, res) => {
  const { email, password, role = 'user', name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const hash = bcrypt.hashSync(password, 10);
  const userPayload = { email, password: hash, role, name: name ?? '', createdAt: new Date().toISOString() };
  if (db) {
    try {
      const existing = await db.collection('users').where('email', '==', email).get();
      if (!existing.empty) return res.status(409).json({ message: 'User exists' });
      const docRef = await db.collection('users').add(userPayload);
      return res.status(201).json({ id: docRef.id });
    } catch (err) {
      console.warn('Firestore register failed, using memory', err.message);
      db = null;
    }
  }
  const exists = usersMemory.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: 'User exists' });
  const id = `${Date.now()}`;
  usersMemory.push({ id, ...userPayload });
  res.status(201).json({ id });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  let user = null;
  if (db) {
    try {
      const snap = await db.collection('users').where('email', '==', email).limit(1).get();
      if (!snap.empty) {
        user = { id: snap.docs[0].id, ...snap.docs[0].data() };
      }
    } catch (err) {
      console.warn('Firestore login failed, using memory', err.message);
      db = null;
    }
  }
  if (!user) {
    user = usersMemory.find((u) => u.email === email) || null;
  }
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ email: user.email, role: user.role ?? 'user', uid: user.id }, JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({ token, role: user.role ?? 'user', email: user.email, name: user.name ?? '' });
});

app.get('/api/me', authMiddleware(), (req, res) => {
  res.json({ email: req.user.email, role: req.user.role, uid: req.user.uid });
});

// Reservations
app.post('/api/reservations', async (req, res) => {
  const required = [
    'carName',
    'pickupDate',
    'returnDate',
    'pickupLocation',
    'returnLocation',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];
  const missing = requireFields(req.body, required);
  if (missing.length) return res.status(400).json({ message: 'Missing fields', missing });

  const payload = {
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
    userId: req.user?.uid ?? null,
  };

  // Persist
  let id = `${Date.now()}`;
  if (db) {
    try {
      const doc = await db.collection('reservations').add(payload);
      id = doc.id;
    } catch (err) {
      console.warn('Firestore reservation write failed, using memory store', err.message);
      db = null;
    }
  }
  if (!db) {
    reservationsMemory.push({ id, ...payload });
  }

  res.status(201).json({ id, status: 'pending' });
});

// Payments via Stripe Checkout (optional)
app.post('/api/payments/checkout', async (req, res) => {
  if (!stripe) return res.status(501).json({ message: 'Stripe not configured' });
  const { amount, currency = 'pln', successUrl, cancelUrl, metadata } = req.body;
  if (!amount || !successUrl || !cancelUrl) {
    return res.status(400).json({ message: 'amount, successUrl, cancelUrl are required' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: 'Car rental' },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error', err.message);
    res.status(500).json({ message: 'Stripe error', error: err.message });
  }
});

// Admin: list reservations (demo; no auth here, add JWT check if needed)
app.get('/api/reservations', async (_req, res) => {
  if (db) {
    try {
      const snap = await db.collection('reservations').orderBy('createdAt', 'desc').get();
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return res.json(items);
    } catch (err) {
      console.warn('Firestore reservations fetch failed, using memory', err.message);
      db = null;
    }
  }
  res.json(reservationsMemory);
});

// Authenticated: list current user's reservations
app.get('/api/my/reservations', authMiddleware(), async (req, res) => {
  const userId = req.user?.uid;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  if (db) {
    try {
      const snap = await db
        .collection('reservations')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return res.json(items);
    } catch (err) {
      console.warn('Firestore my reservations fetch failed, using memory', err.message);
      db = null;
    }
  }
  res.json(reservationsMemory.filter((r) => r.userId === userId));
});

// Admin: update reservation status
app.post('/api/reservations/:id/status', authMiddleware(['admin']), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Status required' });
  if (db) {
    try {
      await db.collection('reservations').doc(id).update({ status });
      return res.json({ ok: true });
    } catch (err) {
      console.warn('Firestore update status failed', err.message);
      db = null;
    }
  }
  const idx = reservationsMemory.findIndex((r) => r.id === id);
  if (idx >= 0) {
    reservationsMemory[idx].status = status;
    return res.json({ ok: true });
  }
  res.status(404).json({ message: 'Reservation not found' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
