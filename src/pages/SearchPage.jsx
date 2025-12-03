import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserSearch from '../components/UserSearch';
import { useAuth } from '../context/AuthContext';
import './SearchPage.css';

const SearchPage = () => {
    const { user: currentUser } = useAuth();
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetchSuggestedUsers();
    }, []);

    const fetchSuggestedUsers = async () => {
        try {
            // For now, just fetch some users. In a real app, this would be a recommendation algorithm.
            // We'll use the search endpoint with a generic query or a new endpoint if available.
            // Since we don't have a specific "suggested" endpoint, we'll search for "a" to get some results.
            const { data } = await axios.get(`${VITE_API_URL}/api/users/search?q=a`);

            // Filter out current user and already followed users
            const filtered = data.filter(u =>
                u._id !== currentUser?.id &&
                !currentUser?.following?.includes(u._id)
            ).slice(0, 6); // Take top 6

            setSuggestedUsers(filtered);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setLoading(false);
        }
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h1>Find & Connect</h1>
                <p>Discover other developers and grow your network.</p>
            </div>

            <div className="search-container-large">
                <UserSearch />
            </div>

            <div className="suggested-section">
                <h2>Suggested for You</h2>

                {loading ? (
                    <div className="loading-grid">Loading suggestions...</div>
                ) : (
                    <div className="users-grid">
                        {suggestedUsers.length > 0 ? (
                            suggestedUsers.map(user => (
                                <Link to={`/profile/${user.username}`} key={user._id} className="user-card">
                                    <div className="user-card-header">
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=100`}
                                            alt={user.name}
                                            className="user-card-avatar"
                                        />
                                    </div>
                                    <div className="user-card-body">
                                        <h3>{user.name}</h3>
                                        <p className="user-card-username">@{user.username}</p>
                                        {user.bio && <p className="user-card-bio">{user.bio.substring(0, 60)}{user.bio.length > 60 ? '...' : ''}</p>}
                                        <div className="user-card-stats">
                                            <span>{user.followers?.length || 0} Followers</span>
                                        </div>
                                    </div>
                                    <button className="btn-view-profile">View Profile</button>
                                </Link>
                            ))
                        ) : (
                            <p className="no-suggestions">No suggestions available right now. Try searching!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
