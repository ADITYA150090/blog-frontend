import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import CodeBlock from '../components/CodeBlock';
import RocketLoader from '../components/RocketLoader';
import VideoPlayer from '../components/VideoPlayer';
import ShareButtons from '../components/ShareButtons';
import CommentSection from '../components/CommentSection';
import ReadingProgress from '../components/ReadingProgress';
import ArticleActions from '../components/ArticleActions';
import CodePlayground from '../components/CodePlayground';
import SEO from '../components/SEO';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import './BlogDetail.css';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPlayground, setShowPlayground] = useState(false);

    // Helper function to extract YouTube video ID from URL
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await api.getBlogBySlug(slug);
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    // Apply syntax highlighting after content is loaded
    useEffect(() => {
        if (blog && window.Prism) {
            window.Prism.highlightAll();
        }
    }, [blog]);

    if (loading) {
        return <RocketLoader isLoading={true} />;
    }

    if (!blog) {
        return (
            <div className="blog-detail-container" style={{ textAlign: 'center' }}>
                <h2>Blog post not found</h2>
                <Link to="/" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                    Back to Home
                </Link>
            </div>
        );
    }

    const currentUrl = window.location.href;
    const youtubeId = getYouTubeId(blog.youtubeLink);

    return (
        <>
            {/* SEO Metadata */}
            <SEO
                title={blog.title}
                description={blog.excerpt}
                image={blog.coverImage || blog.image}
                url={window.location.href}
                type="article"
            />

            {/* Reading Progress Tracker */}
            <ReadingProgress blogId={blog._id || blog.id} blogSlug={slug} />

            <div className="blog-detail-container">
                <Link to="/" className="blog-back-link">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <article>
                    {(blog.image || blog.coverImage) && (
                        <div className="blog-cover-wrapper">
                            <img
                                src={blog.coverImage || blog.image}
                                alt={blog.title}
                                className="blog-cover-image"
                            />
                        </div>
                    )}

                    <header className="blog-header">
                        <div style={{ marginBottom: '1rem' }}>
                            <span className="blog-category-badge">{blog.category}</span>
                        </div>

                        <h1 className="blog-title">
                            {blog.title}
                        </h1>

                        <div className="blog-meta">
                            <span className="blog-meta-item">
                                <Calendar size={14} /> {blog.date || new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <span className="blog-meta-item">
                                <Clock size={14} /> {blog.readTime || '5 min'}
                            </span>
                            <span className="blog-meta-item">By {blog.author?.name || blog.author || 'Admin'}</span>
                        </div>
                    </header>

                    {/* Article Actions - Like & Bookmark */}
                    <ArticleActions blogId={blog._id || blog.id} blogSlug={slug} />

                    <div className="blog-detail-content">
                        <p>{blog.excerpt}</p>

                        {youtubeId && (
                            <VideoPlayer videoId={youtubeId} />
                        )}

                        {/* Render actual blog content */}
                        <div
                            className="blog-detail-content"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {blog.code && (
                        <div className="blog-code-section">
                            <div className="blog-code-header">
                                <h3 className="blog-code-title">Code Example</h3>
                                <button
                                    onClick={() => setShowPlayground(!showPlayground)}
                                    className="btn-playground"
                                >
                                    {showPlayground ? '📖 View Only' : '🎮 Try Interactive'}
                                </button>
                            </div>

                            {showPlayground ? (
                                <CodePlayground
                                    initialCode={blog.code.snippet}
                                    language={blog.code.language}
                                />
                            ) : (
                                <CodeBlock
                                    code={blog.code.snippet}
                                    language={blog.code.language}
                                />
                            )}
                        </div>
                    )}

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="blog-tags-section">
                            <h3 className="blog-tags-title">Tags</h3>
                            <div className="blog-tags-list">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="blog-tag">
                                        <Tag size={12} /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <ShareButtons title={blog.title} url={currentUrl} />

                    <CommentSection blogSlug={slug} />
                </article>
            </div>
        </>
    );
};

export default BlogDetail;
