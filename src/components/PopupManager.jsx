import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config/api.config';
import './PopupManager.css';

const PopupManager = () => {
    const [popups, setPopups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        tag: '',
        description: '',
        features: [
            { text: '', icon: '' },
            { text: '', icon: '' },
            { text: '', icon: '' },
            { text: '', icon: '' }
        ],
        price: {
            amount: 0,
            currency: '$',
            period: 'per project'
        },
        buttonText: 'Get Started',
        buttonLink: '',
        showAfterSeconds: 5,
        isActive: true,
        colors: {
            primary: '#ff3e00',
            secondary: '#4d61ff',
            accent: '#00e0b0'
        }
    });

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${API_BASE}/popup`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPopups(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching popups:', error);
            setMessage('Error loading popups');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (editingId) {
                await axios.put(`${API_BASE}/popup/${editingId}`, formData, config);
                setMessage('Popup updated successfully!');
            } else {
                await axios.post(`${API_BASE}/popup`, formData, config);
                setMessage('Popup created successfully!');
            }

            resetForm();
            fetchPopups();
        } catch (error) {
            setMessage('Error saving popup');
            console.error(error);
        }
    };

    const handleEdit = (popup) => {
        setFormData(popup);
        setEditingId(popup._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this popup?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE}/popup/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Popup deleted successfully!');
            fetchPopups();
        } catch (error) {
            setMessage('Error deleting popup');
        }
    };

    const handleToggle = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${API_BASE}/popup/${id}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPopups();
        } catch (error) {
            setMessage('Error toggling popup');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            tag: '',
            description: '',
            features: [
                { text: '', icon: '' },
                { text: '', icon: '' },
                { text: '', icon: '' },
                { text: '', icon: '' }
            ],
            price: {
                amount: 0,
                currency: '$',
                period: 'per project'
            },
            buttonText: 'Get Started',
            buttonLink: '',
            showAfterSeconds: 5,
            isActive: true,
            colors: {
                primary: '#ff3e00',
                secondary: '#4d61ff',
                accent: '#00e0b0'
            }
        });
        setEditingId(null);
        setShowForm(false);
    };

    const updateFeature = (index, field, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index][field] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    if (loading) return <div>Loading popups...</div>;

    return (
        <div className="popup-manager">
            <div className="popup-header">
                <h2>Manage Workshop Popups</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Create New Popup'}
                </button>
            </div>

            {message && (
                <div className="message-banner">
                    {message}
                    <button onClick={() => setMessage('')}>×</button>
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="popup-form">
                    <h3>{editingId ? 'Edit Popup' : 'Create New Popup'}</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Tag</label>
                            <input
                                type="text"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                placeholder="e.g., Premium, Limited, New"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows="3"
                        />
                    </div>

                    <div className="features-section">
                        <h4>Features (up to 4)</h4>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="feature-input">
                                <input
                                    type="text"
                                    placeholder="Feature text"
                                    value={feature.text}
                                    onChange={(e) => updateFeature(index, 'text', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="SVG icon path (optional)"
                                    value={feature.icon}
                                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price Amount *</label>
                            <input
                                type="number"
                                value={formData.price.amount}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    price: { ...formData.price, amount: Number(e.target.value) }
                                })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Currency</label>
                            <input
                                type="text"
                                value={formData.price.currency}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    price: { ...formData.price, currency: e.target.value }
                                })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Period</label>
                            <input
                                type="text"
                                value={formData.price.period}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    price: { ...formData.price, period: e.target.value }
                                })}
                                placeholder="e.g., per project, per month"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Button Text *</label>
                            <input
                                type="text"
                                value={formData.buttonText}
                                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Button Link *</label>
                            <input
                                type="url"
                                value={formData.buttonLink}
                                onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                required
                                placeholder="https://..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Show After (seconds)</label>
                            <input
                                type="number"
                                value={formData.showAfterSeconds}
                                onChange={(e) => setFormData({ ...formData, showAfterSeconds: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="colors-section">
                        <h4>Colors</h4>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Primary Color</label>
                                <input
                                    type="color"
                                    value={formData.colors.primary}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        colors: { ...formData.colors, primary: e.target.value }
                                    })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Secondary Color</label>
                                <input
                                    type="color"
                                    value={formData.colors.secondary}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        colors: { ...formData.colors, secondary: e.target.value }
                                    })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Accent Color</label>
                                <input
                                    type="color"
                                    value={formData.colors.accent}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        colors: { ...formData.colors, accent: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            />
                            Active (show on website)
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {editingId ? 'Update Popup' : 'Create Popup'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="popups-list">
                <h3>Existing Popups</h3>
                {popups.length === 0 ? (
                    <p>No popups created yet. Create your first popup above!</p>
                ) : (
                    <div className="popups-grid">
                        {popups.map((popup) => (
                            <div key={popup._id} className={`popup-card ${popup.isActive ? 'active' : 'inactive'}`}>
                                <div className="popup-card-header">
                                    <h4>{popup.title}</h4>
                                    <span className={`status-badge ${popup.isActive ? 'active' : 'inactive'}`}>
                                        {popup.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <p className="popup-description">{popup.description}</p>

                                <div className="popup-details">
                                    <div className="detail-item">
                                        <strong>Price:</strong> {popup.price.currency}{popup.price.amount} {popup.price.period}
                                    </div>
                                    <div className="detail-item">
                                        <strong>Button:</strong> {popup.buttonText}
                                    </div>
                                    <div className="detail-item">
                                        <strong>Delay:</strong> {popup.showAfterSeconds}s
                                    </div>
                                </div>

                                <div className="popup-actions">
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleEdit(popup)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`btn btn-sm ${popup.isActive ? 'btn-warning' : 'btn-success'}`}
                                        onClick={() => handleToggle(popup._id)}
                                    >
                                        {popup.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(popup._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopupManager;
