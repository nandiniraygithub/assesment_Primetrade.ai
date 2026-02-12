import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await forgotPassword(email);
            setMessage('Email sent successfully! Please check your inbox.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <h2>Forgot Password</h2>
            {message && <p style={{ color: '#22c55e', background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>{message}</p>}
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your registered email"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            <Link to="/login" style={{ display: 'block', marginTop: '1rem', textAlign: 'center', color: '#64748b', textDecoration: 'none' }}>
                Back to Login
            </Link>
        </div>
    );
};

export default ForgotPassword;
