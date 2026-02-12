import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="auth-card">
            <h2>Login</h2>
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                <Link to="/password/forgot" style={{ color: '#ef4444', textDecoration: 'none', fontSize: '0.9rem' }}>Forgot Password?</Link>
            </p>
            <p style={{ marginTop: '1rem', color: '#94a3b8' }}>
                Don't have an account? <Link to="/register" style={{ color: '#38bdf8' }}>Register</Link>
            </p>
        </div>
    );
};

export default Login;
