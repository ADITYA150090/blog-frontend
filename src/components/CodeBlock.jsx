import React from 'react';

const CodeBlock = ({ code, language }) => {
    return (
        <div className="blog-code">
            <div className="code-header">
                <span className="code-language">{language}</span>
            </div>
            <div className="code-block">
                <pre>{code}</pre>
            </div>
        </div>
    );
};

export default CodeBlock;
