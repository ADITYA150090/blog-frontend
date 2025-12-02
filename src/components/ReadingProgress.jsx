import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './ReadingProgress.css';

const ReadingProgress = ({ blogId, blogSlug }) => {
    const { user, isAuthenticated } = useAuth();
    const [progress, setProgress] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setStartTime(Date.now());

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

            setProgress(Math.min(scrollPercentage, 100));
            setIsVisible(scrollTop > 100);

            // Auto-save reading progress
            if (scrollPercentage > 90 && isAuthenticated && startTime) {
                saveReadingProgress(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAuthenticated, startTime]);

    // Save progress when leaving page
    useEffect(() => {
        return () => {
            if (isAuthenticated && startTime) {
                saveReadingProgress(progress > 90);
            }
        };
    }, []);

    const saveReadingProgress = async (completed) => {
        if (!isAuthenticated || !startTime) return;

        const readingTime = Math.floor((Date.now() - startTime) / 1000);

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/users/reading-history',
                {
                    blogId,
                    blogSlug,
                    readingTime,
                    completed
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
        } catch (error) {
            console.error('Error saving reading progress:', error);
        }
    };

    return (
        <>
            {/* Progress Bar */}
            <div className={`reading-progress-bar ${isVisible ? 'visible' : ''}`}>
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Progress Circle (Floating) */}
            {isVisible && (
                <div className="reading-progress-circle">
                    <svg className="progress-ring" width="60" height="60">
                        <circle
                            className="progress-ring__circle-bg"
                            stroke="var(--vscode-border)"
                            strokeWidth="4"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                        />
                        <circle
                            className="progress-ring__circle"
                            stroke="var(--vscode-blue)"
                            strokeWidth="4"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 26}`,
                                strokeDashoffset: `${2 * Math.PI * 26 * (1 - progress / 100)}`
                            }}
                        />
                    </svg>
                    <span className="progress-percentage">{Math.round(progress)}%</span>
                </div>
            )}
        </>
    );
};

export default ReadingProgress;
