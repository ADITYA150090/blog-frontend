// Code Execution Functions for Interactive Code Blocks
// This script handles copying code and running code using online compilers

// Copy code to clipboard
window.copyCode = function (button) {
    const codeBlock = button.closest('.blog-code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.background = '#28a745';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        alert('Failed to copy code to clipboard');
    });
};

// Run code using Judge0 API (online compiler)
window.runCode = async function (button) {
    const codeBlock = button.closest('.blog-code-interactive');
    const code = codeBlock.querySelector('code').textContent;
    const language = codeBlock.getAttribute('data-language');
    const outputElement = codeBlock.querySelector('.output-content');

    // Language ID mapping for Judge0 API
    const languageIds = {
        'javascript': 63,  // Node.js
        'python': 71,      // Python 3
        'java': 62,        // Java
        'cpp': 54,         // C++ (GCC)
        'c': 50,           // C (GCC)
        'csharp': 51,      // C#
        'php': 68,         // PHP
        'ruby': 72,        // Ruby
        'go': 60,          // Go
        'rust': 73,        // Rust
        'sql': 82,         // SQL
        'bash': 46         // Bash
    };

    const languageId = languageIds[language.toLowerCase()];

    if (!languageId) {
        outputElement.textContent = `Error: Language '${language}' is not supported for execution.\nSupported languages: JavaScript, Python, Java, C++, C, C#, PHP, Ruby, Go, Rust, SQL, Bash`;
        return;
    }

    // Show loading state
    button.disabled = true;
    button.textContent = '⏳ Running...';
    outputElement.textContent = 'Executing code...';

    try {
        // Using Judge0 API (Free tier)
        // Note: You can also use other APIs like OneCompiler, Programiz, etc.
        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Replace with your API key
            },
            body: JSON.stringify({
                source_code: code,
                language_id: languageId,
                stdin: ''
            })
        });

        if (!response.ok) {
            throw new Error('Compilation service unavailable');
        }

        const result = await response.json();

        // Display output
        if (result.stdout) {
            outputElement.textContent = result.stdout;
        } else if (result.stderr) {
            outputElement.textContent = 'Error:\n' + result.stderr;
            outputElement.style.color = '#ff6b6b';
        } else if (result.compile_output) {
            outputElement.textContent = 'Compilation Error:\n' + result.compile_output;
            outputElement.style.color = '#ff6b6b';
        } else {
            outputElement.textContent = 'No output';
        }

    } catch (error) {
        // Fallback: Use a simple JavaScript executor for JS code
        if (language.toLowerCase() === 'javascript') {
            try {
                outputElement.textContent = 'Running JavaScript locally...\n';

                // Capture console.log output
                const logs = [];
                const originalLog = console.log;
                console.log = (...args) => {
                    logs.push(args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' '));
                };

                // Execute code
                eval(code);

                // Restore console.log
                console.log = originalLog;

                // Display output
                if (logs.length > 0) {
                    outputElement.textContent = logs.join('\n');
                    outputElement.style.color = '';
                } else {
                    outputElement.textContent = 'Code executed successfully (no output)';
                }
            } catch (jsError) {
                outputElement.textContent = 'Error:\n' + jsError.message;
                outputElement.style.color = '#ff6b6b';
            }
        } else {
            outputElement.textContent = `Error: Unable to execute code.\n${error.message}\n\nNote: To enable code execution, you need to:\n1. Sign up for RapidAPI (judge0-ce)\n2. Get your API key\n3. Replace 'YOUR_RAPIDAPI_KEY' in the code-executor.js file`;
            outputElement.style.color = '#ff6b6b';
        }
    } finally {
        button.disabled = false;
        button.textContent = '▶ Run Code';
    }
};

// Alternative: Simple client-side execution for supported languages
window.runCodeSimple = function (button) {
    const codeBlock = button.closest('.blog-code-interactive');
    const code = codeBlock.querySelector('code').textContent;
    const language = codeBlock.getAttribute('data-language');
    const outputElement = codeBlock.querySelector('.output-content');

    button.disabled = true;
    button.textContent = '⏳ Running...';

    try {
        if (language.toLowerCase() === 'javascript') {
            // Execute JavaScript
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };

            eval(code);
            console.log = originalLog;

            outputElement.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed (no output)';
            outputElement.style.color = '';
        } else {
            outputElement.textContent = `Note: Client-side execution is only available for JavaScript.\nFor ${language}, please use the online compiler by setting up Judge0 API.`;
            outputElement.style.color = '#ff6b6b';
        }
    } catch (error) {
        outputElement.textContent = 'Error:\n' + error.message;
        outputElement.style.color = '#ff6b6b';
    } finally {
        button.disabled = false;
        button.textContent = '▶ Run Code';
    }
};

// Syntax highlighting using Prism.js (if available)
if (typeof Prism !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        Prism.highlightAll();
    });
}

console.log('Code executor loaded successfully');
