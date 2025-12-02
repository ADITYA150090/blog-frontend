import React from 'react';
import { Facebook, Twitter, Linkedin, Link2, Share2 } from 'lucide-react';

const ShareButtons = ({ title, url }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: <Facebook size={20} />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: '#1877F2'
        },
        {
            name: 'Twitter',
            icon: <Twitter size={20} />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: '#1DA1F2'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={20} />,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            color: '#0A66C2'
        },
        {
            name: 'WhatsApp',
            icon: <Share2 size={20} />, // Using Share icon as generic or WhatsApp
            url: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
            color: '#25D366'
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    return (
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--vscode-border)' }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1rem' }}>Share this post</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--vscode-sidebar)',
                            color: link.color,
                            border: '1px solid var(--vscode-border)',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                        }}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </a>
                ))}
                <button
                    onClick={copyToClipboard}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--vscode-sidebar)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--vscode-border)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    title="Copy Link"
                >
                    <Link2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;
