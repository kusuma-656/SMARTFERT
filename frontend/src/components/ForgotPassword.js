import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/auth/forgot-password', { email });
      setMessage('📬 If this email exists, a reset link has been sent!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d0f0c0, #a3d9a5)',
        padding: '1rem'
      }}
    >
      <div className="text-center w-100" style={{ maxWidth: '500px' }}>
        <h1 className="fw-bold mb-2" style={{ fontSize: '2.8rem', color: '#14532d' }}>
          🌱 AgriSmart
        </h1>
        <p className="text-muted mb-4">Reset Your Password</p>

        <div className="card shadow p-4 bg-white bg-opacity-75 border-0">
          <h4 className="text-center mb-3">🔐 Forgot Password</h4>
          {message && <div className="alert alert-info text-center">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-warning" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
