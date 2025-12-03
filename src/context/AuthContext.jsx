import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config/api.config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_BASE}/auth/login`, {
                email,
                password
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                id: data._id,
                name: data.name,
                email: data.email,
                username: data.username,
                avatar: data.avatar,
                role: data.role
            }));

            setUser({
                id: data._id,
                name: data.name,
                email: data.email,
                username: data.username,
                avatar: data.avatar,
                role: data.role
            });

            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${API_BASE}/auth/register`, {
                name,
                email,
                password
            });

            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            updateUser,
            isAuthenticated: !!user
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
