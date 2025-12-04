import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
            setIsLightMode(true);
            document.documentElement.classList.add('light-mode');
        } else {
            setIsLightMode(false);
            document.documentElement.classList.remove('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isLightMode;
        setIsLightMode(newMode);

        if (newMode) {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <label className="bb8-toggle" title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}>
            <input
                className="bb8-toggle__checkbox"
                type="checkbox"
                checked={isLightMode}
                onChange={toggleTheme}
            />
            <div className="bb8-toggle__container">
                <div className="bb8-toggle__scenery">
                    <div className="bb8-toggle__star"></div>
                    <div className="bb8-toggle__star"></div>
                    <div className="bb8-toggle__star"></div>
                    <div className="bb8-toggle__star"></div>
                    <div className="bb8-toggle__star"></div>
                    <div className="bb8-toggle__star"></div>
                    <div className="bb8-toggle__star"></div>
                    <div className="tatto-1"></div>
                    <div className="tatto-2"></div>
                    <div className="gomrassen"></div>
                    <div className="hermes"></div>
                    <div className="chenini"></div>
                    <div className="bb8-toggle__cloud"></div>
                    <div className="bb8-toggle__cloud"></div>
                    <div className="bb8-toggle__cloud"></div>
                </div>
                <div className="bb8">
                    <div className="bb8__head-container">
                        <div className="bb8__antenna"></div>
                        <div className="bb8__antenna"></div>
                        <div className="bb8__head"></div>
                    </div>
                    <div className="bb8__body"></div>
                </div>
                <div className="artificial__hidden">
                    <div className="bb8__shadow"></div>
                </div>
            </div>
        </label>
    );
};

export default ThemeToggle;
