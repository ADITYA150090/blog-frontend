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
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

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

    if (loading) {
        return <RocketLoader isLoading={true} />;
    }

    if (!blog) {
        return (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-primary)' }}>
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
            {/* Reading Progress Tracker */}
            <ReadingProgress blogId={blog._id || blog.id} blogSlug={slug} />

            <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                <Link to="/" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--vscode-blue)',
                    textDecoration: 'none',
                    marginBottom: '2rem'
                }}>
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <article>
                    {(blog.image || blog.coverImage) && (
                        <div style={{
                            marginBottom: '2rem',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <img
                                src={blog.coverImage || blog.image}
                                alt={blog.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '400px',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </div>
                    )}

                    <header style={{ marginBottom: '2rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <span className="blog-category">{blog.category}</span>
                        </div>

                        <h1 style={{
                            fontSize: '2.5rem',
                            color: 'var(--text-bright)',
                            marginBottom: '1rem',
                            lineHeight: '1.2'
                        }}>
                            {blog.title}
                        </h1>

                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Calendar size={14} /> {blog.date || new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={14} /> {blog.readTime || '5 min'}
                            </span>
                            <span>By {blog.author?.name || blog.author || 'Admin'}</span>
                        </div>
                    </header>

                    {/* Article Actions - Like & Bookmark */}
                    <ArticleActions blogId={blog._id || blog.id} blogSlug={slug} />

                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: 'var(--text-primary)',
                        marginBottom: '2rem'
                    }}>
                        <p>{blog.excerpt}</p>

                        {youtubeId && (
                            <VideoPlayer videoId={youtubeId} />
                        )}

                        {/* Render actual blog content */}
                        <div
                            style={{ marginTop: '2rem' }}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {blog.code && (
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: 'var(--text-bright)' }}>Code Example</h3>
                                <button
                                    onClick={() => setShowPlayground(!showPlayground)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--vscode-blue)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
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
                        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--vscode-border)' }}>
                            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1rem' }}>Tags</h3>
                            <div className="blog-tags">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="tag" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
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
