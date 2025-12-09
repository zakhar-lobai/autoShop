import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setToken, setRole } from '../utils/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      const result = await login(email, password);
      setToken(result.token);
      setRole(result.role || 'user');
      if (result.role === 'admin') navigate('/admin');
      else navigate('/my-bookings');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-base text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-box-grey p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <div className="w-16 h-1 bg-primary mb-6" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-form-bg border border-forms-border text-white rounded-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-form-bg border border-forms-border text-white rounded-none"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-base font-semibold hover:bg-btn-hover transition rounded-none"
          >
            Continue
          </button>
        </form>
        <button
          className="mt-4 text-sm text-primary underline"
          onClick={() => navigate('/register')}
        >
          Need an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
