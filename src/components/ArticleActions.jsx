import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './ArticleActions.css';

const ArticleActions = ({ blogId, blogSlug }) => {
    const { user, isAuthenticated } = useAuth();
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            checkUserActions();
        }
    }, [blogId, isAuthenticated]);

    const checkUserActions = async () => {
        try {
            const token = localStorage.getItem('token');

            // Validate token
            if (!token || token === 'null' || token === 'undefined') {
                console.log('No valid token found');
                return;
            }

            const { data } = await axios.get(`http://localhost:5000/api/users/${user.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setLiked(data.likes?.some(l => l.blogId === blogId));
            setBookmarked(data.bookmarks?.some(b => b.blogId === blogId));
        } catch (error) {
            console.error('Error checking user actions:', error);
            // Silently fail - user can still interact with buttons
        }
    };

    const handleLike = async () => {
        if (!isAuthenticated) {
            showToastMessage('Please login to like articles');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            // Validate token
            if (!token || token === 'null' || token === 'undefined') {
                showToastMessage('Session expired. Please log in again.');
                return;
            }

            const { data } = await axios.post(
                'http://localhost:5000/api/users/like',
                { blogId, blogSlug },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setLiked(data.liked);
            if (data.liked) {
                setLikeCount(prev => prev + 1);
            } else {
                setLikeCount(prev => Math.max(0, prev - 1));
            }
            showToastMessage(data.message);
        } catch (error) {
            console.error('Error liking article:', error);

            // Handle authentication errors
            if (error.response?.status === 401) {
                showToastMessage('Session expired. Please log in again.');
            } else {
                showToastMessage(error.response?.data?.message || 'Failed to like article');
            }
        }
    };

    const handleBookmark = async () => {
        if (!isAuthenticated) {
            showToastMessage('Please login to bookmark articles');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            // Validate token
            if (!token || token === 'null' || token === 'undefined') {
                showToastMessage('Session expired. Please log in again.');
                return;
            }

            const { data } = await axios.post(
                'http://localhost:5000/api/users/bookmark',
                { blogId, blogSlug },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBookmarked(data.bookmarked);
            showToastMessage(data.message);
        } catch (error) {
            console.error('Error bookmarking article:', error);

            // Handle authentication errors
            if (error.response?.status === 401) {
                showToastMessage('Session expired. Please log in again.');
            } else {
                showToastMessage(error.response?.data?.message || 'Failed to bookmark article');
            }
        }
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="article-actions">
            <button
                className={`action-button like-button ${liked ? 'active' : ''}`}
                onClick={handleLike}
                title="Like this article"
            >
                <span className="icon">{liked ? '❤️' : '🤍'}</span>
                <span className="label">
                    {liked ? 'Liked' : 'Like'}
                    {likeCount > 0 && ` (${likeCount})`}
                </span>
            </button>

            <button
                className={`action-button bookmark-button ${bookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
                title="Bookmark this article"
            >
                <span className="icon">{bookmarked ? '🔖' : '📑'}</span>
                <span className="label">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {showToast && (
                <div className="toast-notification">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default ArticleActions;
