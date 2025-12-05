import React, { useState } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange }) => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [showYouTubeModal, setShowYouTubeModal] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageAlignment, setImageAlignment] = useState('center');
    const [imageLayout, setImageLayout] = useState('full');
    const [imageWidth, setImageWidth] = useState('100');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [codeWithOutput, setCodeWithOutput] = useState(false);

    // Insert content at cursor position or at the end
    const insertContent = (content) => {
        const newContent = value + '\n\n' + content + '\n\n';
        onChange({ target: { value: newContent } });
    };

    // Insert Image with flexible layouts
    const handleInsertImage = () => {
        if (!imageUrl) return;

        let imageHTML = '';

        switch (imageLayout) {
            case 'full':
                // Full width centered image
                imageHTML = `<div class="blog-image blog-image-full" style="text-align: ${imageAlignment};">
    <img src="${imageUrl}" alt="${imageAlt || 'Blog image'}" style="max-width: ${imageWidth}%;" />
    ${imageAlt ? `<p class="image-caption">${imageAlt}</p>` : ''}
</div>`;
                break;

            case 'float-left':
                // Image floats left, text wraps around right
                imageHTML = `<div class="blog-image blog-image-float-left" style="width: ${imageWidth}%;">
    <img src="${imageUrl}" alt="${imageAlt || 'Blog image'}" />
    ${imageAlt ? `<p class="image-caption">${imageAlt}</p>` : ''}
</div>
<div class="blog-float-text">
    <p>Add your text here - it will wrap around the image!</p>
</div>
<div style="clear: both;"></div>`;
                break;

            case 'float-right':
                // Image floats right, text wraps around left
                imageHTML = `<div class="blog-image blog-image-float-right" style="width: ${imageWidth}%;">
    <img src="${imageUrl}" alt="${imageAlt || 'Blog image'}" />
    ${imageAlt ? `<p class="image-caption">${imageAlt}</p>` : ''}
</div>
<div class="blog-float-text">
    <p>Add your text here - it will wrap around the image!</p>
</div>
<div style="clear: both;"></div>`;
                break;

            case 'side-by-side':
                // Two columns: image on one side, content on other
                imageHTML = `<div class="blog-image-grid">
    <div class="blog-image-grid-item">
        <img src="${imageUrl}" alt="${imageAlt || 'Blog image'}" />
        ${imageAlt ? `<p class="image-caption">${imageAlt}</p>` : ''}
    </div>
    <div class="blog-image-grid-item">
        <p><strong>Add content here!</strong></p>
        <p>You can put text, another image, or any content beside the image.</p>
    </div>
</div>`;
                break;

            default:
                imageHTML = `<div class="blog-image">
    <img src="${imageUrl}" alt="${imageAlt || 'Blog image'}" />
    ${imageAlt ? `<p class="image-caption">${imageAlt}</p>` : ''}
</div>`;
        }

        insertContent(imageHTML);
        // Reset to defaults
        setImageUrl('');
        setImageAlt('');
        setImageAlignment('center');
        setImageLayout('full');
        setImageWidth('100');
        setShowImageModal(false);
    };

    // Insert YouTube Video
    const handleInsertYouTube = () => {
        if (!youtubeUrl) return;
        const videoId = extractYouTubeId(youtubeUrl);
        if (!videoId) {
            alert('Invalid YouTube URL');
            return;
        }
        const youtubeHTML = `<div class="blog-youtube">
    <iframe 
        width="100%" 
        height="400" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>`;
        insertContent(youtubeHTML);
        setYoutubeUrl('');
        setShowYouTubeModal(false);
    };

    // Extract YouTube video ID from URL
    const extractYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Insert Code Block
    const handleInsertCode = () => {
        if (!codeSnippet) return;

        let codeHTML;
        if (codeWithOutput) {
            // Code with interactive compiler
            codeHTML = `<div class="blog-code-interactive" data-language="${codeLanguage}">
    <div class="code-editor">
        <pre><code class="language-${codeLanguage}">${escapeHtml(codeSnippet)}</code></pre>
    </div>
    <button class="run-code-btn" onclick="runCode(this)">▶ Run Code</button>
    <div class="code-output">
        <div class="output-header">Output:</div>
        <pre class="output-content"></pre>
    </div>
</div>`;
        } else {
            // Static code block with syntax highlighting
            codeHTML = `<div class="blog-code-block">
    <div class="code-header">
        <span class="code-language">${codeLanguage}</span>
        <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
    </div>
    <pre><code class="language-${codeLanguage}">${escapeHtml(codeSnippet)}</code></pre>
</div>`;
        }

        insertContent(codeHTML);
        setCodeSnippet('');
        setCodeLanguage('javascript');
        setCodeWithOutput(false);
        setShowCodeModal(false);
    };

    // Insert Google Ad Placeholder
    const handleInsertAdPlaceholder = () => {
        const adHTML = `<div class="google-ad-placeholder">
    <div class="ad-content">
        <!-- Google AdSense code goes here -->
        <p class="ad-label">Advertisement</p>
        <div class="ad-slot" data-ad-slot="YOUR_AD_SLOT_ID">
            <!-- Ad display area -->
        </div>
    </div>
</div>`;
        insertContent(adHTML);
    };

    // Escape HTML
    const escapeHtml = (text) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    return (
        <div className="rich-text-editor">
            <div className="editor-toolbar">
                <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => setShowImageModal(true)}
                    title="Insert Image"
                >
                    🖼️ Image
                </button>

                <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => setShowYouTubeModal(true)}
                    title="Insert YouTube Video"
                >
                    ▶️ YouTube
                </button>

                <button
                    type="button"
                    className="toolbar-btn"
                    onClick={() => setShowCodeModal(true)}
                    title="Insert Code"
                >
                    💻 Code
                </button>

                <button
                    type="button"
                    className="toolbar-btn ad-btn"
                    onClick={handleInsertAdPlaceholder}
                    title="Insert Google Ad Placeholder"
                >
                    📢 Ad Slot
                </button>

                <a
                    href="/how-to-write"
                    target="_blank"
                    className="toolbar-btn help-btn"
                    title="How to Write Guide"
                >
                    ❓ Help
                </a>
            </div>

            <textarea
                className="editor-content"
                value={value}
                onChange={onChange}
                placeholder="Write your blog content here. Use HTML for formatting. Use the toolbar buttons to insert images, videos, code blocks, and ads..."
            />

            {/* Image Modal */}
            {showImageModal && (
                <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h3>🖼️ Insert Image (PNG, JPG, GIF)</h3>
                        <div className="modal-form">
                            <label>Image URL * (Supports GIFs!)</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/meme.gif"
                            />

                            <label>Caption (optional)</label>
                            <input
                                type="text"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                placeholder="Funny caption for your meme!"
                            />

                            <label>Layout Style</label>
                            <select
                                value={imageLayout}
                                onChange={(e) => setImageLayout(e.target.value)}
                            >
                                <option value="full">Full Width (Centered)</option>
                                <option value="float-left">Float Left (Text wraps right)</option>
                                <option value="float-right">Float Right (Text wraps left)</option>
                                <option value="side-by-side">Side by Side (2 columns)</option>
                            </select>

                            {imageLayout === 'full' && (
                                <>
                                    <label>Alignment</label>
                                    <div className="alignment-buttons">
                                        <button
                                            type="button"
                                            className={`align-btn ${imageAlignment === 'left' ? 'active' : ''}`}
                                            onClick={() => setImageAlignment('left')}
                                        >
                                            ⬅️ Left
                                        </button>
                                        <button
                                            type="button"
                                            className={`align-btn ${imageAlignment === 'center' ? 'active' : ''}`}
                                            onClick={() => setImageAlignment('center')}
                                        >
                                            ↕️ Center
                                        </button>
                                        <button
                                            type="button"
                                            className={`align-btn ${imageAlignment === 'right' ? 'active' : ''}`}
                                            onClick={() => setImageAlignment('right')}
                                        >
                                            ➡️ Right
                                        </button>
                                    </div>
                                </>
                            )}

                            <label>Width: {imageWidth}%</label>
                            <input
                                type="range"
                                min="20"
                                max="100"
                                value={imageWidth}
                                onChange={(e) => setImageWidth(e.target.value)}
                                className="width-slider"
                            />
                            <small style={{ color: 'var(--text-secondary)' }}>
                                💡 Tip: Use smaller width for memes and GIFs!
                            </small>

                            <div className="modal-actions">
                                <button type="button" onClick={handleInsertImage} className="btn-primary">
                                    Insert Image
                                </button>
                                <button type="button" onClick={() => setShowImageModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* YouTube Modal */}
            {showYouTubeModal && (
                <div className="modal-overlay" onClick={() => setShowYouTubeModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Insert YouTube Video</h3>
                        <div className="modal-form">
                            <label>YouTube URL *</label>
                            <input
                                type="url"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />

                            <div className="modal-actions">
                                <button type="button" onClick={handleInsertYouTube} className="btn-primary">
                                    Insert Video
                                </button>
                                <button type="button" onClick={() => setShowYouTubeModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Code Modal */}
            {showCodeModal && (
                <div className="modal-overlay" onClick={() => setShowCodeModal(false)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h3>Insert Code Block</h3>
                        <div className="modal-form">
                            <label>Programming Language</label>
                            <select
                                value={codeLanguage}
                                onChange={(e) => setCodeLanguage(e.target.value)}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                                <option value="c">C</option>
                                <option value="csharp">C#</option>
                                <option value="php">PHP</option>
                                <option value="ruby">Ruby</option>
                                <option value="go">Go</option>
                                <option value="rust">Rust</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="sql">SQL</option>
                                <option value="bash">Bash</option>
                            </select>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={codeWithOutput}
                                    onChange={(e) => setCodeWithOutput(e.target.checked)}
                                />
                                {' '}Enable Interactive Compiler (Run button + Output panel)
                            </label>

                            <label>Code *</label>
                            <textarea
                                value={codeSnippet}
                                onChange={(e) => setCodeSnippet(e.target.value)}
                                placeholder="Enter your code here..."
                                rows="10"
                                style={{ fontFamily: 'monospace' }}
                            />

                            <div className="modal-actions">
                                <button type="button" onClick={handleInsertCode} className="btn-primary">
                                    Insert Code
                                </button>
                                <button type="button" onClick={() => setShowCodeModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RichTextEditor;
