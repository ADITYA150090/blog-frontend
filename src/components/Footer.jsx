import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">dev</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        Empowering developers with tutorials and insights.
                    </p>
                    <div className="social-links">
                        <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">
                            GH
                        </a>
                        <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                            TW
                        </a>
                        <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
                            IN
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#home" className="footer-link">Home</a></li>
                        <li><a href="#about" className="footer-link">About</a></li>
                        <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
                        <li><a href="#blogs" className="footer-link">Blogs</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Categories</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Full Stack</a></li>
                        <li><a href="#" className="footer-link">Frontend</a></li>
                        <li><a href="#" className="footer-link">Backend</a></li>
                        <li><a href="#" className="footer-link">DevOps</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Resources</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Documentation</a></li>
                        <li><a href="#" className="footer-link">Tutorials</a></li>
                        <li><a href="#" className="footer-link">Code Snippets</a></li>
                        <li><a href="#" className="footer-link">Newsletter</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {currentYear} CodeBlog. built by Aditya Dhawle</p>
            </div>
        </footer>
    );
};

export default Footer;
