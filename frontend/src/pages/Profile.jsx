import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Password states
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await api.put('/auth/me/update', { name, email });
            setMessage('Profile updated successfully! (Refresh to see changes in header)');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setError('New passwords do not match');
        }
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await api.put('/auth/password/update', passwords);
            setMessage('Password updated successfully!');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Profile</h1>
                <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none' }}>Back to Dashboard</Link>
            </div>

            {message && <p style={{ color: '#22c55e', background: '#dcfce7', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{message}</p>}
            {error && <p style={{ color: '#ef4444', background: '#fee2e2', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{error}</p>}

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
                {/* Profile Update Section */}
                <div className="auth-card" style={{ maxWidth: 'none', margin: '0' }}>
                    <h3>Update Details</h3>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="input-group">
                            <label>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
                        </div>
                        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Profile'}</button>
                    </form>
                </div>

                {/* Password Update Section */}
                <div className="auth-card" style={{ maxWidth: 'none', margin: '0' }}>
                    <h3>Change Password</h3>
                    <form onSubmit={handlePasswordUpdate}>
                        <div className="input-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="input-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Change Password'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
