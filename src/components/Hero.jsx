import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="hero-tag">
                    ✨ Welcome to the Future of Code Blogging
                </div>

                <h1 className="hero-title">
                    Master the Art of<br />Modern Development
                </h1>

                <p className="hero-subtitle">
                    Dive into cutting-edge tutorials, explore powerful code snippets,
                    and level up your programming skills with our award-winning content.
                </p>

                <div className="hero-cta">
                    <button className="btn btn-primary" onClick={() => {
                        document.getElementById('blogs').scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Explore Blogs
                    </button>
                    <button className="btn btn-secondary" onClick={() => {
                        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
