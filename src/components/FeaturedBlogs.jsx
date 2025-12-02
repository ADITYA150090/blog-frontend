import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const featuredBlogs = await api.getFeaturedBlogs();
                setBlogs(featuredBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section id="blogs" className="featured-blogs">
                <div className="section-header">
                    <h2 className="section-title">Loading...</h2>
                </div>
            </section>
        );
    }

    return (
        <section id="blogs" className="featured-blogs">
            <div className="section-header">
                <h2 className="section-title">Featured Blogs</h2>
                <p className="section-subtitle">
                    Handpicked tutorials and insights to accelerate your development journey
                </p>
            </div>

            <div className="blogs-grid">
                {blogs.length > 0 ? blogs.map(blog => (
                    <Link to={`/blog/${blog.slug}`} key={blog._id || blog.id} style={{ textDecoration: 'none' }}>
                        <article className="blog-card">
                            <div className="blog-card-header">
                                <div className="blog-meta">
                                    <span className="blog-category">{blog.category}</span>
                                    <span className="blog-date">{blog.date || new Date(blog.createdAt).toLocaleDateString()}</span>
                                    <span className="blog-date">📖 {blog.readTime || '5 min'}</span>
                                </div>

                                <h3 className="blog-title">{blog.title}</h3>

                                <p className="blog-excerpt">{blog.excerpt}</p>

                                <div className="blog-tags">
                                    {blog.tags && blog.tags.map((tag, index) => (
                                        <span key={index} className="tag">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                        </article>
                    </Link>
                )) : (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                        No blogs yet. Create one from the Admin Panel!
                    </p>
                )}
            </div>
        </section>
    );
};

export default FeaturedBlogs;
