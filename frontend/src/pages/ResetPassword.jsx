import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');

        try {
            await resetPassword(token, passwords);
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <h2>Reset Password</h2>
            {message && <p style={{ color: '#22c55e', background: '#dcfce7', padding: '0.5rem', borderRadius: '4px' }}>{message}</p>}
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={passwords.password}
                        onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                        required
                        minLength={8}
                    />
                </div>
                <div className="input-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Reseting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
