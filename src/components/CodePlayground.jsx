import React, { useState } from 'react';
import './CodePlayground.css';

const CodePlayground = ({ initialCode = '', language = 'javascript' }) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setOutput('');

        try {
            // Capture console.log output
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };

            // Create a function from the code and execute it
            const result = new Function(code)();

            // Restore console.log
            console.log = originalLog;

            // Display output
            if (logs.length > 0) {
                setOutput(logs.join('\n'));
            } else if (result !== undefined) {
                setOutput(String(result));
            } else {
                setOutput('✓ Code executed successfully (no output)');
            }
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode(initialCode);
        setOutput('');
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setOutput('📋 Code copied to clipboard!');
        setTimeout(() => setOutput(''), 2000);
    };

    return (
        <div className="code-playground">
            <div className="playground-header">
                <span className="playground-title">🎮 Interactive Code Playground</span>
                <div className="playground-actions">
                    <button onClick={copyCode} className="playground-button copy-btn">
                        📋 Copy
                    </button>
                    <button onClick={resetCode} className="playground-button reset-btn">
                        🔄 Reset
                    </button>
                    <button
                        onClick={runCode}
                        className="playground-button run-btn"
                        disabled={isRunning}
                    >
                        {isRunning ? '⏳ Running...' : '▶️ Run Code'}
                    </button>
                </div>
            </div>

            <div className="playground-editor">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="code-editor"
                    spellCheck="false"
                    placeholder="Write your code here..."
                />
            </div>

            {output && (
                <div className="playground-output">
                    <div className="output-header">Output:</div>
                    <pre className="output-content">{output}</pre>
                </div>
            )}

            <div className="playground-footer">
                <span className="playground-hint">
                    💡 Tip: Use console.log() to see output
                </span>
            </div>
        </div>
    );
};

export default CodePlayground;
