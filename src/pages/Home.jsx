import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedBlogs from '../components/FeaturedBlogs';
import Newsletter from '../components/Newsletter';
import { api } from '../utils/api';

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getPortfolio();
                setProjects(data.slice(0, 3)); // Show first 3 projects
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            <Hero />

            <section id="about" style={{
                padding: '3rem 2rem',
                backgroundColor: 'var(--vscode-sidebar)',
                borderTop: '1px solid var(--vscode-border)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="section-title">About</h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.8',
                        marginTop: '1rem'
                    }}>
                        Welcome to CodeBlog, your premium destination for cutting-edge development tutorials
                        and insights. We're passionate about sharing knowledge and helping developers level up
                        their skills with practical, real-world code examples.
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.8',
                        marginTop: '1rem'
                    }}>
                        Our mission is to make complex programming concepts accessible through clear explanations,
                        interactive code snippets, and comprehensive tutorials that you can apply immediately to
                        your projects.
                    </p>
                </div>
            </section>

            <section id="portfolio" style={{
                padding: '3rem 2rem',
                backgroundColor: 'var(--vscode-bg)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 className="section-title">Portfolio</h2>
                    <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                        Showcasing real-world projects and applications
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {projects.map((project, index) => (
                            <Link to={`/project/${project.slug}`} key={index} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    backgroundColor: 'var(--vscode-sidebar)',
                                    border: '1px solid var(--vscode-border)',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    transition: 'all 0.3s ease',
                                    height: '100%'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.borderColor = 'var(--vscode-blue)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'var(--vscode-border)';
                                    }}>
                                    <h3 style={{
                                        color: 'var(--text-bright)',
                                        marginBottom: '0.5rem',
                                        fontSize: '1.3rem'
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        marginBottom: '1rem'
                                    }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {(project.tags || project.tech || []).map((tech, i) => (
                                            <span key={i} className="tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FeaturedBlogs />

            <Newsletter />
        </>
    );
};

export default Home;
