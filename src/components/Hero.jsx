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
                        Read Blogs<br /> or turn on light mode
                    </h1>

                    <p className="hero-subtitle">
                        Welcome to my personal Code diaries , here i put all bullshit about code and other related topics
                        which are around Carrier and life realated, I see things as Coder every where , the human specias who hard to get Friend also consider as more intellectual                     </p>

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
