import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                {/* Animated 404 Text */}
                <div className="error-code">
                    <span className="four">4</span>
                    <span className="zero">0</span>
                    <span className="four">4</span>
                </div>

                {/* Error Message */}
                <h1 className="error-title">Page Not Found</h1>
                <p className="error-description">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>

                {/* Action Buttons */}
                <div className="error-actions">
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/')}
                    >
                        <Home size={20} />
                        Go Home
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/blogs')}
                    >
                        <Search size={20} />
                        Browse Blogs
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
