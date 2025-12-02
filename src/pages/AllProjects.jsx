import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import RocketLoader from '../components/RocketLoader';
import { ExternalLink, Github } from 'lucide-react';
import './AllProjects.css';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getPortfolio();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const displayedProjects = projects.slice(0, displayCount);
    const hasMore = displayCount < projects.length;

    const loadMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    if (loading) {
        return <RocketLoader isLoading={true} />;
    }

    return (
        <div className="all-projects-page">
            <div className="page-header">
                <h1>All Projects</h1>
                <p>Explore my complete portfolio of work</p>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
                {displayedProjects.length > 0 ? displayedProjects.map(project => (
                    <div key={project._id || project.id} className="project-card">
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                            <div className="project-overlay">
                                <Link to={`/project/${project.slug}`} className="view-details-btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>

                            <div className="project-tags">
                                {project.tags && project.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="project-links">
                                {project.demoLink && (
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                    >
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                    >
                                        <Github size={16} /> GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="no-projects">No projects yet. Create one from the Admin Panel!</p>
                )}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={loadMore}>
                        Load More Projects
                    </button>
                </div>
            )}

            {/* Total Count */}
            <div className="project-count">
                Showing {displayedProjects.length} of {projects.length} projects
            </div>
        </div>
    );
};

export default AllProjects;
