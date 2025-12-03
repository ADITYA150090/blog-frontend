import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('');
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await axios.post(`${VITE_API_URL}/api/newsletter/subscribe`, { email });
            setStatus('success');
            setMessage('Thanks for subscribing! 🚀');
            setEmail('');
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'Something went wrong. Try again.');
        }
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">
                <div className="newsletter-content">
                    <h2>Stay in the Loop</h2>
                    <p>Get the latest tutorials, code snippets, and dev news delivered to your inbox.</p>
                </div>
                <form onSubmit={handleSubmit} className="newsletter-form">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'success'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className={status}
                    >
                        {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                    </button>
                </form>
                {message && <p className={`newsletter-message ${status}`}>{message}</p>}
            </div>
        </section>
    );
};

export default Newsletter;
