import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        // Do not auto-login: setUser(data.user);
        return data;
    };

    const logout = async () => {
        await api.get('/auth/logout');
        setUser(null);
    };

    const forgotPassword = async (email) => {
        const { data } = await api.post('/auth/password/forgot', { email });
        return data;
    };

    const resetPassword = async (token, passwords) => {
        const { data } = await api.put(`/auth/password/reset/${token}`, passwords);
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
