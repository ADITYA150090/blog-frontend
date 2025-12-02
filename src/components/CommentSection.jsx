import React, { useState, useEffect } from 'react';
import { Trash2, MessageCircle } from 'lucide-react';
import AuthModal from './AuthModal';

const CommentSection = ({ blogSlug }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch comments
        fetchComments();
    }, [blogSlug]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/comments/${blogSlug}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (!newComment.trim()) return;

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    blogSlug,
                    content: newComment,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment. Please try again.');
        }
    };

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--vscode-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageCircle size={20} /> Comments ({comments.length})
                </h3>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                    >
                        Logout ({user.name})
                    </button>
                )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} style={{ marginBottom: '2rem' }}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={user ? "Write a comment..." : "Please login to comment"}
                    disabled={!user}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '1rem',
                        backgroundColor: 'var(--vscode-sidebar)',
                        border: '1px solid var(--vscode-border)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        resize: 'vertical',
                        marginBottom: '1rem'
                    }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading || !user}
                        className="btn btn-primary"
                    >
                        {loading ? 'Posting...' : 'Post Comment'}
                    </button>
                    {!user && (
                        <button
                            type="button"
                            onClick={() => setShowAuthModal(true)}
                            className="btn btn-secondary"
                        >
                            Login to Comment
                        </button>
                    )}
                </div>
            </form>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            style={{
                                backgroundColor: 'var(--vscode-sidebar)',
                                border: '1px solid var(--vscode-border)',
                                borderRadius: '8px',
                                padding: '1rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <div>
                                    <strong style={{ color: 'var(--text-bright)' }}>{comment.userName}</strong>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {user && user._id === comment.user && (
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#ff5f56',
                                            cursor: 'pointer',
                                            padding: '0.25rem'
                                        }}
                                        title="Delete comment"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{comment.content}</p>
                        </div>
                    ))
                )}
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLogin={handleLogin}
            />
        </div>
    );
};

export default CommentSection;
