import React from 'react';
import { useAuth } from '../context/AuthContext';

const DebugPanel = () => {
    const { user, isAuthenticated } = useAuth();

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    const clearSession = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            background: '#ff4444',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            zIndex: 9999,
            fontSize: '0.85rem',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>🐛 Debug Panel</h4>

            <div style={{ marginBottom: '0.5rem' }}>
                <strong>Auth Status:</strong> {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}
            </div>

            {user && (
                <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginBottom: '0.5rem',
                    fontSize: '0.75rem',
                    maxHeight: '150px',
                    overflow: 'auto'
                }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            )}

            {user && !user.username && (
                <div style={{
                    background: '#ff0000',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginBottom: '0.5rem'
                }}>
                    ⚠️ USERNAME MISSING!
                </div>
            )}

            <button
                onClick={clearSession}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'white',
                    color: '#ff4444',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Clear Session & Reload
            </button>
        </div>
    );
};

export default DebugPanel;
