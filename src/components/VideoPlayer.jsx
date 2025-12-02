import React from 'react';

const VideoPlayer = ({ videoId }) => {
    if (!videoId) return null;

    return (
        <div style={{
            margin: '2rem 0',
            backgroundColor: '#000',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid var(--vscode-border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            {/* Monitor Stand/Frame styling */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px',
                paddingLeft: '4px'
            }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            </div>

            <div style={{
                position: 'relative',
                paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                height: 0,
                overflow: 'hidden',
                borderRadius: '4px',
                backgroundColor: '#000'
            }}>
                <iframe
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    }}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoPlayer;
