import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE } from '../config/api.config';
import './UserProfile.css';

const UserProfile = () => {
    const { username } = useParams();
    const { user: currentUser, setUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');
    const [isFollowing, setIsFollowing] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        bio: '',
        title: '',
        location: '',
        website: '',
        avatar: '',
        github: '',
        twitter: '',
        linkedin: ''
    });

    useEffect(() => {
        if (username && username !== 'undefined') {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [username]);

    const fetchProfile = async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/users/${username}`);
            setProfile(data);
            setIsOwnProfile(currentUser?.username === username);
            setIsFollowing(currentUser && data.followers.some(f => f._id === currentUser.id));

            // Populate edit form
            setEditForm({
                name: data.name || '',
                bio: data.bio || '',
                title: data.title || '',
                location: data.location || '',
                website: data.website || '',
                avatar: data.avatar || '',
                github: data.socialLinks?.github || '',
                twitter: data.socialLinks?.twitter || '',
                linkedin: data.socialLinks?.linkedin || ''
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!currentUser) {
            alert('Please login to follow users');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (isFollowing) {
                await axios.delete(`${API_BASE}/users/follow/${profile._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFollowing(false);
            } else {
                await axios.post(`${API_BASE}/users/follow/${profile._id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFollowing(true);
            }
            fetchProfile();
        } catch (error) {
            console.error('Error following/unfollowing:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updateData = {
                name: editForm.name,
                bio: editForm.bio,
                title: editForm.title,
                location: editForm.location,
                website: editForm.website,
                avatar: editForm.avatar,
                socialLinks: {
                    github: editForm.github,
                    twitter: editForm.twitter,
                    linkedin: editForm.linkedin
                }
            };

            const { data } = await axios.put(`${API_BASE}/users/profile`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile(data);
            setIsEditing(false);

            // Update current user context if editing own profile
            if (isOwnProfile) {
                setUser({ ...currentUser, ...data });
            }

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return <div className="profile-loading">Loading profile...</div>;
    }

    if (!profile) {
        return <div className="profile-not-found">User not found</div>;
    }

    return (
        <div className="user-profile">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info">
                    <div className="profile-avatar-container">
                        <img
                            src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.name}&background=random&size=150`}
                            alt={profile.name}
                            className="profile-avatar"
                        />
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">{profile.name}</h1>
                        <p className="profile-username">@{profile.username}</p>
                        <p className="profile-title">{profile.title}</p>
                        {profile.bio && <p className="profile-bio">{profile.bio}</p>}

                        {profile.location && (
                            <p className="profile-meta">
                                <span className="icon">📍</span> {profile.location}
                            </p>
                        )}
                        {profile.website && (
                            <p className="profile-meta">
                                <span className="icon">🔗</span>
                                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                    {profile.website}
                                </a>
                            </p>
                        )}

                        {/* Social Links */}
                        <div className="profile-social">
                            {profile.socialLinks?.github && (
                                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            )}
                            {profile.socialLinks?.twitter && (
                                <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                    Twitter
                                </a>
                            )}
                            {profile.socialLinks?.linkedin && (
                                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="profile-stats">
                            <div className="stat">
                                <span className="stat-value">{profile.followers?.length || 0}</span>
                                <span className="stat-label">Followers</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{profile.following?.length || 0}</span>
                                <span className="stat-label">Following</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{profile.stats?.totalArticlesRead || 0}</span>
                                <span className="stat-label">Articles Read</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{profile.stats?.currentStreak || 0}</span>
                                <span className="stat-label">🔥 Streak</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="profile-actions">
                            {isOwnProfile ? (
                                <button
                                    className="edit-profile-button"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            ) : currentUser && (
                                <button
                                    className={`follow-button ${isFollowing ? 'following' : ''}`}
                                    onClick={handleFollow}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Form */}
            {isEditing && isOwnProfile && (
                <div className="edit-profile-section">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleEditSubmit} className="edit-profile-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Title/Headline</label>
                            <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                placeholder="e.g., Full Stack Developer"
                            />
                        </div>

                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={editForm.bio}
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={editForm.location}
                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                placeholder="e.g., San Francisco, CA"
                            />
                        </div>

                        <div className="form-group">
                            <label>Website</label>
                            <input
                                type="url"
                                value={editForm.website}
                                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Avatar URL</label>
                            <input
                                type="url"
                                value={editForm.avatar}
                                onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>

                        <h3>Social Links</h3>

                        <div className="form-group">
                            <label>GitHub</label>
                            <input
                                type="url"
                                value={editForm.github}
                                onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                                placeholder="https://github.com/username"
                            />
                        </div>

                        <div className="form-group">
                            <label>Twitter</label>
                            <input
                                type="url"
                                value={editForm.twitter}
                                onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                                placeholder="https://twitter.com/username"
                            />
                        </div>

                        <div className="form-group">
                            <label>LinkedIn</label>
                            <input
                                type="url"
                                value={editForm.linkedin}
                                onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        <button type="submit" className="save-profile-button">
                            Save Changes
                        </button>
                    </form>
                </div>
            )}

            {/* Rest of the profile content (tabs, etc.) */}
            <div className="profile-content">
                <div className="profile-tabs">
                    <button
                        className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        About
                    </button>
                    <button
                        className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activity')}
                    >
                        Activity
                    </button>
                    <button
                        className={`tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookmarks')}
                    >
                        Bookmarks
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'about' && (
                        <div className="about-section">
                            <h3>About {profile.name}</h3>
                            <p>{profile.bio || 'No bio available yet.'}</p>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="activity-section">
                            <p>Activity feed coming soon...</p>
                        </div>
                    )}

                    {activeTab === 'bookmarks' && (
                        <div className="bookmarks-section">
                            <p>Bookmarked articles will appear here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
