import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import RocketLoader from '../components/RocketLoader';
import './AllBlogs.css';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6); // Show 6 blogs initially
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await api.getAllBlogs();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

    const filteredBlogs = selectedCategory === 'All'
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory);

    const displayedBlogs = filteredBlogs.slice(0, displayCount);
    const hasMore = displayCount < filteredBlogs.length;

    const loadMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    if (loading) {
        return <RocketLoader isLoading={true} />;
    }

    return (
        <div className="all-blogs-page">
            <div className="page-header">
                <h1>All Blog Posts</h1>
                <p>Explore all our tutorials, guides, and insights</p>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedCategory(category);
                            setDisplayCount(6); // Reset count when changing category
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Blogs Grid */}
            <div className="blogs-grid">
                {displayedBlogs.length > 0 ? displayedBlogs.map(blog => (
                    <Link to={`/blog/${blog.slug}`} key={blog._id || blog.id} className="blog-card">
                        {(blog.coverImage || blog.image) && (
                            <div className="blog-image">
                                <img src={blog.coverImage || blog.image} alt={blog.title} />
                            </div>
                        )}
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span className="blog-category">{blog.category}</span>
                                <span className="blog-date">
                                    {blog.date || new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-excerpt">{blog.excerpt}</p>
                            <div className="blog-footer">
                                <div className="blog-tags">
                                    {blog.tags && blog.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="tag">#{tag}</span>
                                    ))}
                                </div>
                                <span className="read-time">📖 {blog.readTime || '5 min'}</span>
                            </div>
                        </div>
                    </Link>
                )) : (
                    <p className="no-blogs">No blogs found in this category.</p>
                )}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={loadMore}>
                        Load More Posts
                    </button>
                </div>
            )}

            {/* Total Count */}
            <div className="blog-count">
                Showing {displayedBlogs.length} of {filteredBlogs.length} blogs
            </div>
        </div>
    );
};

export default AllBlogs;
