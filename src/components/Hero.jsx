import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <div className="hero-tag">
                        ✨ Welcome to the Future of Code Blogging
                    </div>

                    <h1 className="hero-title">
                        CODE ,COFFEE<br />& connect
                    </h1>

                    <p className="hero-subtitle">
                        I talk about code, system design, and software architecture — the real backbone of software.
                        Some days we'll dive deep into DSA; other days, we'll chill and explore the surface web with HTML and fellow creators.

                        If you're someone who understands the internet beyond scrolling…
                        Welcome. Let's connect.
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
            </div>
        </section>
    );
};

export default Hero;
