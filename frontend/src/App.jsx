import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // 1. Not logged in -> redirect to login
    if (!user) return <Navigate to="/login" />;

    // 2. Logged in, but role not authorized
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If they are trying to access admin page but are just a user, send them to user dashboard
        // If they are a user trying to access user page, they pass through (allowedRoles undefined or includes user)
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/password/forgot" element={<ForgotPassword />} />
                    <Route path="/password/reset/:token" element={<ResetPassword />} />

                    {/* Profile Route - Protected for all roles */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* User Dashboard - Accessible to everyone logged in (user, admin) */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Dashboard - Protected by role check */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
