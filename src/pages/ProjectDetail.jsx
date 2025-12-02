import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import RocketLoader from '../components/RocketLoader';
import VideoPlayer from '../components/VideoPlayer';
import { ArrowLeft, Github, ExternalLink, Layers } from 'lucide-react';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper function to extract YouTube video ID from URL
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await api.getProjectBySlug(slug);
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProject();
        }
    }, [slug]);

    if (loading) {
        return <RocketLoader isLoading={true} />;
    }

    if (!project) {
        return (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-primary)' }}>
                <h2>Project not found</h2>
                <Link to="/" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                    Back to Home
                </Link>
            </div>
        );
    }

    const youtubeId = getYouTubeId(project.youtubeLink);

    return (
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
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        color: 'var(--text-bright)',
                        marginBottom: '1rem',
                        lineHeight: '1.2'
                    }}>
                        {project.title}
                    </h1>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        maxWidth: '700px'
                    }}>
                        {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {(project.demoLink || project.live) && (
                            <a href={project.demoLink || project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ExternalLink size={18} /> Live Demo
                            </a>
                        )}
                        {(project.githubLink || project.github) && (
                            <a href={project.githubLink || project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Github size={18} /> View Code
                            </a>
                        )}
                    </div>
                </header>

                {/* Project Image */}
                {project.image && (
                    <div style={{
                        marginBottom: '2rem',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <img
                            src={project.image}
                            alt={project.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </div>
                )}

                {/* YouTube Video */}
                {youtubeId && (
                    <div style={{ marginBottom: '2rem' }}>
                        <VideoPlayer videoId={youtubeId} />
                    </div>
                )}

                {/* Tech Stack */}
                {(project.tags || project.tech) && (project.tags?.length > 0 || project.tech?.length > 0) && (
                    <div style={{
                        backgroundColor: 'var(--vscode-sidebar)',
                        border: '1px solid var(--vscode-border)',
                        borderRadius: '8px',
                        padding: '2rem',
                        marginBottom: '3rem'
                    }}>
                        <h3 style={{ color: 'var(--text-bright)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Layers size={20} /> Tech Stack
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                            {(project.tags || project.tech || []).map((tech, index) => (
                                <span key={index} className="tag" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* About the Project */}
                <div style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: 'var(--text-primary)'
                }}>
                    <h3 style={{ color: 'var(--text-bright)', marginBottom: '1rem' }}>About the Project</h3>
                    <p style={{ marginBottom: '1rem' }}>
                        This project demonstrates the implementation of {project.title} using modern web technologies.
                        It features a robust architecture designed for scalability and performance.
                    </p>
                    <p>
                        Key challenges solved during development include optimizing state management, ensuring responsive design across devices,
                        and implementing secure API communication.
                    </p>
                </div>
            </article>
        </div>
    );
};

export default ProjectDetail;
