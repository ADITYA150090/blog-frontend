import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website' }) => {
    const siteTitle = 'adityadhawle.dev';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || "A premium blog platform for developers featuring code tutorials, portfolio projects, and technical insights";
    // Ensure image is an absolute URL
    const getAbsoluteUrl = (path) => {
        if (!path) return "https://adityadhawle.dev/logo.svg";
        if (path.startsWith('http')) return path;
        return `${window.location.origin}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    const metaImage = getAbsoluteUrl(image);
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
