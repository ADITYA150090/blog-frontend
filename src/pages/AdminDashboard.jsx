import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api.config';
import PopupManager from '../components/PopupManager';
import RichTextEditor from '../components/RichTextEditor';
import ContentPreview from '../components/ContentPreview';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [message, setMessage] = useState('');

    // Form States
    const [blogForm, setBlogForm] = useState({
        title: '', excerpt: '', content: '', category: 'Technology', tags: '', coverImage: '', youtubeLink: ''
    });
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', image: '', tags: '', demoLink: '', githubLink: '', youtubeLink: ''
    });
    const [newsletterForm, setNewsletterForm] = useState({
        subject: '', body: ''
    });
    const [blogs, setBlogs] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingBlogId, setEditingBlogId] = useState(null);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const statsRes = await axios.get(`${API_BASE}/admin/stats`, config);
            setStats(statsRes.data);

            const usersRes = await axios.get(`${API_BASE}/admin/users`, config);
            setUsers(usersRes.data);

            await fetchBlogs();
            await fetchDrafts();

            setLoading(false);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            setLoading(false);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE}/blogs/all`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const fetchDrafts = async () => {
        try {
            const response = await axios.get(`${API_BASE}/blogs/drafts`);
            setDrafts(response.data);
        } catch (error) {
            console.error('Error fetching drafts:', error);
        }
    };

    const handleEditBlog = async (id) => {
        try {
            const response = await axios.get(`${API_BASE}/blogs/edit/${id}`);
            const blog = response.data;

            setBlogForm({
                title: blog.title,
                excerpt: blog.excerpt,
                content: blog.content,
                category: blog.category,
                tags: blog.tags.join(', '),
                coverImage: blog.coverImage || '',
                youtubeLink: blog.youtubeLink || ''
            });

            setIsEditing(true);
            setEditingBlogId(id);
            setActiveTab('blogs');
            setMessage('');
        } catch (error) {
            console.error('Error fetching blog for editing:', error);
            setMessage('Error loading blog for editing');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingBlogId(null);
        setBlogForm({
            title: '', excerpt: '', content: '', category: 'Technology', tags: '', coverImage: '', youtubeLink: ''
        });
        setMessage('');
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE}/admin/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleBlogSubmit = async (e, saveAsDraft = false) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const blogData = {
                ...blogForm,
                status: saveAsDraft ? 'draft' : 'published'
            };

            if (isEditing && editingBlogId) {
                await axios.put(`${API_BASE}/admin/blogs/${editingBlogId}`, blogData, config);
                setMessage(`Blog ${saveAsDraft ? 'saved as draft' : 'updated'} successfully!`);
            } else {
                await axios.post(`${API_BASE}/admin/blogs`, blogData, config);
                setMessage(`Blog ${saveAsDraft ? 'saved as draft' : 'created'} successfully!`);
            }

            setBlogForm({ title: '', excerpt: '', content: '', category: 'Technology', tags: '', coverImage: '', youtubeLink: '' });
            setIsEditing(false);
            setEditingBlogId(null);

            await fetchBlogs();
            await fetchDrafts();
            await fetchData();
        } catch (error) {
            setMessage(`Error ${isEditing ? 'updating' : 'creating'} blog post`);
            console.error('Blog submit error:', error);
        }
    };

    const handleSaveAsDraft = (e) => {
        handleBlogSubmit(e, true);
    };

    const handlePublish = (e) => {
        handleBlogSubmit(e, false);
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE}/admin/projects`, projectForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Project created successfully!');
            setProjectForm({ title: '', description: '', image: '', tags: '', demoLink: '', githubLink: '', youtubeLink: '' });
            fetchData();
        } catch (error) {
            setMessage('Error creating project');
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm(`Send this email to ${stats?.totalSubscribers} subscribers?`)) return;

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE}/admin/newsletter/send`, newsletterForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Newsletter sent successfully!');
            setNewsletterForm({ subject: '', body: '' });
        } catch (error) {
            setMessage('Error sending newsletter');
        }
    };

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome back, {user?.name}</p>
            </div>

            {message && <div className="admin-message">{message}</div>}

            <div className="admin-tabs">
                <button className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                <button className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
                <button className={`admin-tab ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>Upload Blog</button>
                <button className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Upload Project</button>
                <button className={`admin-tab ${activeTab === 'newsletter' ? 'active' : ''}`} onClick={() => setActiveTab('newsletter')}>Newsletter</button>
                <button className={`admin-tab ${activeTab === 'popups' ? 'active' : ''}`} onClick={() => setActiveTab('popups')}>Manage Popups</button>
            </div>

            <div className="admin-content">
                {activeTab === 'overview' && stats && (
                    <div className="admin-overview">
                        <div className="stats-grid">
                            <div className="stat-card"><h3>Total Users</h3><div className="stat-number">{stats.totalUsers}</div></div>
                            <div className="stat-card"><h3>Total Blogs</h3><div className="stat-number">{stats.totalBlogs}</div></div>
                            <div className="stat-card"><h3>Total Projects</h3><div className="stat-number">{stats.totalProjects}</div></div>
                            <div className="stat-card"><h3>Subscribers</h3><div className="stat-number">{stats.totalSubscribers}</div></div>
                        </div>
                        <div className="recent-section">
                            <h2>Recent Users</h2>
                            <div className="recent-users-list">
                                {stats.recentUsers.map(u => (
                                    <div key={u._id} className="recent-user-item">
                                        <img src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=random`} alt={u.name} className="recent-user-avatar" />
                                        <div className="recent-user-info"><span className="name">{u.name}</span><span className="email">{u.email}</span></div>
                                        <span className="date">{new Date(u.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="users-management">
                        <h2>All Users ({users.length})</h2>
                        <div className="users-table-container">
                            <table className="users-table">
                                <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id}>
                                            <td><div className="user-cell"><img src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=random`} alt={u.name} className="table-avatar" /><span>{u.name}</span></div></td>
                                            <td>{u.email}</td>
                                            <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td>{u.role !== 'admin' && <button className="btn-delete" onClick={() => handleDeleteUser(u._id)}>Delete</button>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'blogs' && (
                    <div className="blog-editor-container">
                        <h2>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                        {isEditing && <p style={{ color: 'var(--vscode-blue)' }}>Editing blog ID: {editingBlogId}</p>}

                        <div className="editor-split-view">
                            {/* Left Side - Form */}
                            <div className="editor-form-side">
                                <form onSubmit={handlePublish} className="admin-form">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Excerpt</label>
                                        <textarea value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Content (HTML/Markdown)</label>
                                        <RichTextEditor
                                            value={blogForm.content}
                                            onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}>
                                                <option>Technology</option><option>Design</option><option>Tutorial</option><option>Career</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Tags (comma separated)</label>
                                            <input type="text" value={blogForm.tags} onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Cover Image URL</label>
                                        <input type="url" value={blogForm.coverImage} onChange={e => setBlogForm({ ...blogForm, coverImage: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>YouTube Link (optional)</label>
                                        <input type="url" value={blogForm.youtubeLink} onChange={e => setBlogForm({ ...blogForm, youtubeLink: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="btn-submit">{isEditing ? 'Update Blog' : 'Publish Blog'}</button>
                                        <button type="button" className="btn-warning" onClick={handleSaveAsDraft}>💾 Save as Draft</button>
                                        {isEditing && <button type="button" className="btn-secondary" onClick={handleCancelEdit}>✖️ Cancel</button>}
                                    </div>
                                </form>
                            </div>

                            {/* Right Side - Live Preview */}
                            <div className="editor-preview-side">
                                <div className="preview-header-sticky">
                                    <h3>📋 Live Preview</h3>
                                    <small>Updates as you type</small>
                                </div>
                                {blogForm.content ? (
                                    <ContentPreview content={blogForm.content} />
                                ) : (
                                    <div className="preview-empty-state">
                                        <p>👈 Start writing to see preview</p>
                                        <small>Your content will appear here in real-time</small>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Existing Blogs List */}
                        <div className="blogs-management">
                            <h3>All Published Blogs ({blogs.filter(b => b.status === 'published').length})</h3>
                            <div className="users-table-container">
                                <table className="users-table">
                                    <thead>
                                        <tr><th>Title</th><th>Category</th><th>Views</th><th>Created</th><th>Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {blogs.filter(b => b.status === 'published').map(blog => (
                                            <tr key={blog._id}>
                                                <td>{blog.title}</td>
                                                <td>{blog.category}</td>
                                                <td>{blog.views || 0}</td>
                                                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn-submit" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleEditBlog(blog._id)}>✏️ Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Drafts List */}
                        <div className="blogs-management">
                            <h3>Draft Blogs ({drafts.length})</h3>
                            <div className="users-table-container">
                                <table className="users-table">
                                    <thead>
                                        <tr><th>Title</th><th>Category</th><th>Last Modified</th><th>Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {drafts.map(draft => (
                                            <tr key={draft._id}>
                                                <td>{draft.title}</td>
                                                <td>{draft.category}</td>
                                                <td>{new Date(draft.updatedAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn-submit" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleEditBlog(draft._id)}>✏️ Edit & Publish</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {drafts.length === 0 && (
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                    No drafts yet. Save a blog as draft to see it here!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="form-container">
                        <h2>Create New Project</h2>
                        <form onSubmit={handleProjectSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input type="url" value={projectForm.image} onChange={e => setProjectForm({ ...projectForm, image: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input type="text" value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Demo Link</label>
                                    <input type="url" value={projectForm.demoLink} onChange={e => setProjectForm({ ...projectForm, demoLink: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>GitHub Link</label>
                                    <input type="url" value={projectForm.githubLink} onChange={e => setProjectForm({ ...projectForm, githubLink: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>YouTube Link (optional)</label>
                                <input type="url" value={projectForm.youtubeLink} onChange={e => setProjectForm({ ...projectForm, youtubeLink: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                            </div>
                            <button type="submit" className="btn-submit">Create Project</button>
                        </form>
                    </div>
                )}

                {activeTab === 'newsletter' && (
                    <div className="form-container">
                        <h2>Send Newsletter</h2>
                        <p className="newsletter-info">Send email to {stats?.totalSubscribers} subscribers</p>
                        <form onSubmit={handleNewsletterSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" value={newsletterForm.subject} onChange={e => setNewsletterForm({ ...newsletterForm, subject: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Email Body</label>
                                <textarea className="content-area" value={newsletterForm.body} onChange={e => setNewsletterForm({ ...newsletterForm, body: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn-submit btn-warning">Send Newsletter</button>
                        </form>
                    </div>
                )}

                {activeTab === 'popups' && (
                    <PopupManager />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
