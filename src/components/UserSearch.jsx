import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../config/api.config';
import './UserSearch.css';

const UserSearch = ({ onSelectUser }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const searchUsers = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                // Remove @ symbol if present at the start
                const searchQuery = query.startsWith('@') ? query.substring(1) : query;
                const { data } = await axios.get(`${API_BASE}/users/search?q=${searchQuery}`);
                setResults(data);
            } catch (error) {
                console.error('Error searching users:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(searchUsers, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSelect = (user) => {
        if (onSelectUser) {
            onSelectUser(user);
        }
        setQuery('');
        setShowResults(false);
    };

    return (
        <div className="user-search">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="Search users... (@username or name)"
                className="user-search-input"
            />

            {showResults && (query.length >= 2) && (
                <div className="user-search-results">
                    {loading && (
                        <div className="search-loading">Searching...</div>
                    )}

                    {!loading && results.length === 0 && (
                        <div className="search-no-results">No users found</div>
                    )}

                    {!loading && results.map((user) => (
                        <Link
                            key={user._id}
                            to={`/profile/${user.username}`}
                            className="search-result-item"
                            onClick={() => handleSelect(user)}
                        >
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=40`}
                                alt={user.name}
                                className="search-result-avatar"
                            />
                            <div className="search-result-info">
                                <div className="search-result-name">{user.name}</div>
                                <div className="search-result-username">@{user.username}</div>
                            </div>
                            <div className="search-result-stats">
                                <span>{user.followers?.length || 0} followers</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserSearch;
