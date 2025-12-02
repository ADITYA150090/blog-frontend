import React, { useState } from 'react';
import { api } from '../utils/api';

const EmailSubscribe = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        try {
            const response = await api.subscribeNewsletter(email);
            setStatus('success');
            setMessage(response.message);
            setEmail('');

            // Reset after 3 seconds
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <section className="email-subscribe">
            <div className="subscribe-content">
                <h2 className="subscribe-title">
                    📬 Stay Updated
                </h2>
                <p className="subscribe-text">
                    Get the latest tutorials, tips, and code snippets delivered straight to your inbox.
                    Join our community of developers!
                </p>

                <form className="subscribe-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="subscribe-input"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        className="subscribe-button"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                {message && (
                    <p style={{
                        marginTop: '1rem',
                        color: status === 'success' ? '#4ec9b0' : '#f48771',
                        fontWeight: 'bold'
                    }}>
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
};

export default EmailSubscribe;
