import React from 'react';
import './HowToWrite.css';

const HowToWrite = () => {
    return (
        <div className="how-to-write-page">
            <div className="guide-container">
                <header className="guide-header">
                    <h1>📝 Blog Writing Guide</h1>
                    <p>Learn how to use all features of the rich text editor</p>
                </header>

                <section className="guide-section">
                    <h2>🖼️ Adding Images</h2>
                    <div className="guide-content">
                        <p>Click the <strong>"🖼️ Image"</strong> button in the toolbar to insert images.</p>

                        <div className="code-example">
                            <h4>What gets inserted:</h4>
                            <pre>{`<div class="blog-image">
    <img src="YOUR_IMAGE_URL" alt="Image description" />
    <p class="image-caption">Optional caption</p>
</div>`}</pre>
                        </div>

                        <div className="guide-demo">
                            <h4>Example:</h4>
                            <div className="blog-image">
                                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600" alt="Code on screen" />
                                <p className="image-caption">Beautiful code on a screen</p>
                            </div>
                        </div>

                        <div className="tips">
                            <h4>💡 Tips:</h4>
                            <ul>
                                <li>Use high-quality images (at least 1200px wide)</li>
                                <li>Always provide descriptive alt text for SEO</li>
                                <li>Use image hosting services like Unsplash, Imgur, or Cloudinary</li>
                                <li>Add captions to provide context</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>▶️ Embedding YouTube Videos</h2>
                    <div className="guide-content">
                        <p>Click the <strong>"▶️ YouTube"</strong> button to embed videos.</p>

                        <div className="code-example">
                            <h4>What gets inserted:</h4>
                            <pre>{`<div class="blog-youtube">
    <iframe 
        width="100%" 
        height="400" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>`}</pre>
                        </div>

                        <div className="guide-demo">
                            <h4>Example:</h4>
                            <div className="blog-youtube">
                                <iframe
                                    width="100%"
                                    height="400"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    frameBorder="0"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>

                        <div className="tips">
                            <h4>💡 Tips:</h4>
                            <ul>
                                <li>Paste the full YouTube URL (e.g., https://youtube.com/watch?v=...)</li>
                                <li>The system automatically extracts the video ID</li>
                                <li>Videos are responsive and maintain 16:9 aspect ratio</li>
                                <li>Place videos strategically to complement your content</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>💻 Adding Code Blocks</h2>
                    <div className="guide-content">
                        <p>Click the <strong>"💻 Code"</strong> button to insert code snippets.</p>

                        <h3>Option 1: Static Code Block (View Only)</h3>
                        <div className="code-example">
                            <h4>What gets inserted:</h4>
                            <pre>{`<div class="blog-code-block">
    <div class="code-header">
        <span class="code-language">javascript</span>
        <button class="copy-code-btn">Copy</button>
    </div>
    <pre><code class="language-javascript">
        // Your code here
    </code></pre>
</div>`}</pre>
                        </div>

                        <div className="guide-demo">
                            <h4>Example:</h4>
                            <div className="blog-code-block">
                                <div className="code-header">
                                    <span className="code-language">javascript</span>
                                    <button className="copy-code-btn">Copy</button>
                                </div>
                                <pre><code className="language-javascript">{`function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}</code></pre>
                            </div>
                        </div>

                        <h3>Option 2: Interactive Code Block (with Compiler)</h3>
                        <p>Check <strong>"Enable Interactive Compiler"</strong> to add a Run button and output panel.</p>

                        <div className="code-example">
                            <h4>What gets inserted:</h4>
                            <pre>{`<div class="blog-code-interactive" data-language="python">
    <div class="code-editor">
        <pre><code>// Your code</code></pre>
    </div>
    <button class="run-code-btn">▶ Run Code</button>
    <div class="code-output">
        <div class="output-header">Output:</div>
        <pre class="output-content"></pre>
    </div>
</div>`}</pre>
                        </div>

                        <div className="guide-demo">
                            <h4>Example:</h4>
                            <div className="blog-code-interactive">
                                <div className="code-editor">
                                    <pre><code className="language-python">{`print("Hello, World!")
for i in range(5):
    print(f"Count: {i}")`}</code></pre>
                                </div>
                                <button className="run-code-btn">▶ Run Code</button>
                                <div className="code-output">
                                    <div className="output-header">Output:</div>
                                    <pre className="output-content">Hello, World!
                                        Count: 0
                                        Count: 1
                                        Count: 2
                                        Count: 3
                                        Count: 4</pre>
                                </div>
                            </div>
                        </div>

                        <div className="tips">
                            <h4>💡 Tips:</h4>
                            <ul>
                                <li><strong>Supported languages:</strong> JavaScript, Python, Java, C++, C, C#, PHP, Ruby, Go, Rust, HTML, CSS, SQL, Bash</li>
                                <li>Use static blocks for examples that don't need execution</li>
                                <li>Use interactive blocks for tutorials where readers can experiment</li>
                                <li>The online compiler uses Judge0 API for code execution</li>
                                <li>Always test your code before publishing</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>📢 Adding Google Ad Slots</h2>
                    <div className="guide-content">
                        <p>Click the <strong>"📢 Ad Slot"</strong> button to insert ad placeholders.</p>

                        <div className="code-example">
                            <h4>What gets inserted:</h4>
                            <pre>{`<div class="google-ad-placeholder">
    <div class="ad-content">
        <p class="ad-label">Advertisement</p>
        <div class="ad-slot" data-ad-slot="YOUR_AD_SLOT_ID">
            <!-- Ad display area -->
        </div>
    </div>
</div>`}</pre>
                        </div>

                        <div className="guide-demo">
                            <h4>Example:</h4>
                            <div className="google-ad-placeholder">
                                <div className="ad-content">
                                    <p className="ad-label">Advertisement</p>
                                    <div className="ad-slot">
                                        [Google AdSense will display here]
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tips">
                            <h4>💡 Ad Placement Best Practices:</h4>
                            <ul>
                                <li><strong>After Introduction:</strong> Place first ad after 2-3 paragraphs</li>
                                <li><strong>Mid Content:</strong> Add ads every 500-700 words</li>
                                <li><strong>Before Conclusion:</strong> Place ad before final section</li>
                                <li><strong>Don't Overdo:</strong> Maximum 3-4 ads per blog post</li>
                                <li>Ensure ads don't disrupt reading flow</li>
                                <li>Replace <code>YOUR_AD_SLOT_ID</code> with actual AdSense ID</li>
                            </ul>
                        </div>

                        <div className="ad-strategy">
                            <h4>📊 Recommended Ad Strategy:</h4>
                            <div className="strategy-grid">
                                <div className="strategy-item">
                                    <strong>Short Post (500-800 words)</strong>
                                    <p>1-2 ads: After intro + Before conclusion</p>
                                </div>
                                <div className="strategy-item">
                                    <strong>Medium Post (800-1500 words)</strong>
                                    <p>2-3 ads: After intro + Mid-content + Before conclusion</p>
                                </div>
                                <div className="strategy-item">
                                    <strong>Long Post (1500+ words)</strong>
                                    <p>3-4 ads: After intro + Every 500 words + Before conclusion</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>✍️ Writing Tips</h2>
                    <div className="guide-content">
                        <div className="tips-grid">
                            <div className="tip-card">
                                <h3>📋 Structure</h3>
                                <ul>
                                    <li>Start with a compelling introduction</li>
                                    <li>Use headings (&lt;h2&gt;, &lt;h3&gt;) to organize content</li>
                                    <li>Break content into digestible sections</li>
                                    <li>End with a strong conclusion or call-to-action</li>
                                </ul>
                            </div>

                            <div className="tip-card">
                                <h3>🎨 Formatting</h3>
                                <ul>
                                    <li>Use &lt;p&gt; tags for paragraphs</li>
                                    <li>Use &lt;strong&gt; for bold text</li>
                                    <li>Use &lt;em&gt; for italic text</li>
                                    <li>Use &lt;ul&gt; and &lt;li&gt; for bullet points</li>
                                    <li>Use &lt;blockquote&gt; for quotes</li>
                                </ul>
                            </div>

                            <div className="tip-card">
                                <h3>🔍 SEO</h3>
                                <ul>
                                    <li>Write descriptive titles and excerpts</li>
                                    <li>Use relevant keywords naturally</li>
                                    <li>Add alt text to all images</li>
                                    <li>Keep paragraphs short (3-4 sentences)</li>
                                    <li>Include internal and external links</li>
                                </ul>
                            </div>

                            <div className="tip-card">
                                <h3>👥 Engagement</h3>
                                <ul>
                                    <li>Ask questions to encourage comments</li>
                                    <li>Use examples and real-world scenarios</li>
                                    <li>Add code playgrounds for tutorials</li>
                                    <li>Include visual content (images, videos)</li>
                                    <li>End with a call-to-action</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>🛠️ HTML Reference</h2>
                    <div className="guide-content">
                        <div className="html-reference">
                            <div className="ref-item">
                                <code>&lt;h2&gt;Heading&lt;/h2&gt;</code>
                                <span>Main section heading</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;h3&gt;Subheading&lt;/h3&gt;</code>
                                <span>Subsection heading</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;p&gt;Text&lt;/p&gt;</code>
                                <span>Paragraph</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;strong&gt;Bold&lt;/strong&gt;</code>
                                <span>Bold text</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;em&gt;Italic&lt;/em&gt;</code>
                                <span>Italic text</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;a href="url"&gt;Link&lt;/a&gt;</code>
                                <span>Hyperlink</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</code>
                                <span>Bullet list</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;ol&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ol&gt;</code>
                                <span>Numbered list</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;blockquote&gt;Quote&lt;/blockquote&gt;</code>
                                <span>Block quote</span>
                            </div>
                            <div className="ref-item">
                                <code>&lt;br /&gt;</code>
                                <span>Line break</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="guide-section final-section">
                    <h2>🚀 Ready to Write!</h2>
                    <p>You now have all the tools to create engaging, professional blog posts. Use the toolbar buttons to insert rich media, and don't forget to preview your content before publishing!</p>

                    <div className="cta-buttons">
                        <a href="/admin" className="cta-btn primary">Go to Admin Panel</a>
                        <a href="/" className="cta-btn secondary">View Blog</a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HowToWrite;
