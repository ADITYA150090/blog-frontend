import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                setMessage('Login successful!');
                setTimeout(() => {
                    onClose();
                    window.location.reload(); // Refresh to update UI
                }, 1000);
            } else {
                await register(formData.name, formData.email, formData.password);
                setMessage('Registration successful! Please check your email to verify.');
                setFormData({ name: '', email: '', password: '' });
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'var(--vscode-bg)',
                padding: '2rem',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid var(--vscode-border)',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ color: 'var(--text-bright)', marginBottom: '1.5rem', textAlign: 'center' }}>
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: '#ff5f56',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        color: '#27c93f',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: 'var(--vscode-sidebar)',
                                        border: '1px solid var(--vscode-border)',
                                        borderRadius: '4px',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>
                        </>
                    )}

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: 'var(--vscode-sidebar)',
                                border: '1px solid var(--vscode-border)',
                                borderRadius: '4px',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: 'var(--vscode-sidebar)',
                                border: '1px solid var(--vscode-border)',
                                borderRadius: '4px',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>

                <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setMessage('');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--vscode-blue)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
