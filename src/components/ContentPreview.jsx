import React, { useState, useEffect } from 'react';
import './ContentPreview.css';

const ContentPreview = ({ content }) => {
    useEffect(() => {
        // Apply syntax highlighting when content changes
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    }, [content]);

    return (
        <div className="content-preview">
            <div className="preview-header">
                <h3>📋 Content Preview</h3>
                <p>This is how your blog post will appear to readers</p>
            </div>
            <div
                className="preview-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default ContentPreview;
