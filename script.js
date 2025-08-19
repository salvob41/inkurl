import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { basicSetup } from 'codemirror';
import { marked } from 'marked';

class InkUrl {
    constructor() {
        this.editorContainer = document.getElementById('editorContainer');
        this.editorArea = document.getElementById('editorArea');
        this.lineNumbers = document.getElementById('lineNumbers');
        this.previewContent = document.getElementById('previewContent');
        this.previewGutter = document.getElementById('previewGutter');
        this.editor = null;
        this.isCodeMirror = false;
        
        this.init();
    }

    async init() {
        try {
            await this.initializeCodeMirror();
        } catch (error) {
            console.warn('CodeMirror initialization failed, using fallback editor:', error);
            this.setupFallbackEditor();
        }
        
        this.setupEventListeners();
        this.loadContentFromURL();
        this.renderPreview();
        this.renderPreviewGutter();
    }

    initializeCodeMirror() {
        const extensions = [
            basicSetup,
            markdown(),
            lineNumbers(),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    this.handleEditorChange();
                }
            })
        ];

        this.editor = new EditorView({
            state: EditorState.create({
                doc: this.editorArea.textContent || this.getDefaultContent(),
                extensions
            }),
            parent: this.editorContainer
        });

        // Hide the old editor elements
        this.editorArea.style.display = 'none';
        this.isCodeMirror = true;
        
        console.log('CodeMirror initialized successfully!');
    }

    setupFallbackEditor() {
        // Show the old editor elements
        this.editorArea.style.display = 'block';
        this.isCodeMirror = false;
        
        // Set default content
        if (!this.editorArea.textContent.trim()) {
            this.editorArea.textContent = this.getDefaultContent();
        }
    }

    getDefaultContent() {
        return `# Welcome to InkUrl ✨

A **minimalist**, *private*, and **serverless** Markdown editor that stores everything in the URL.

## 🚀 Features

- **🔒 Privacy First**: No accounts, no servers, no data collection
- **📝 Professional Editor**: Powered by CodeMirror 6 with Markdown support
- **👁️ Live Preview**: Real-time rendering with beautiful typography
- **🔗 URL Storage**: All content encoded in the URL hash
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🎨 Clean UI**: Peerpad-inspired minimalist aesthetic

## 🎯 Getting Started

1. **Start typing** in the editor on the left
2. **Use Markdown syntax** for formatting
3. **See live preview** on the right
4. **Share your content** by copying the link

## 📝 Markdown Examples

### Code Blocks
\`\`\`javascript
function hello() {
    console.log("Hello, InkUrl!");
    return "Welcome to the future of note-taking!";
}
\`\`\`

### Lists & Organization
- **Feature 1**: Professional editing experience
- **Feature 2**: Beautiful typography and spacing
- **Feature 3**: Smart gutter navigation
  - Sub-feature A: Heading markers
  - Sub-feature B: Scroll synchronization

### Links & References
[Visit the project](https://github.com/salvob41/inkurl) to learn more about this amazing editor.

### Blockquotes
> "The best editor is the one you have with you, and InkUrl is always there in your browser!"

---

*Happy writing! 🎉*

---

## 🧪 Test the Editor

Try adding more content, using different Markdown features, and see how the preview updates in real-time. The editor supports all standard Markdown syntax including:

- **Bold text** and *italic text*
- \`inline code\` and code blocks
- [Links](https://example.com)
- ![Images](https://via.placeholder.com/150)
- Tables, lists, and more!`;
    }

    setupEventListeners() {
        // View toggle buttons
        document.getElementById('viewEditor').addEventListener('click', () => {
            this.setView('editor');
        });

        document.getElementById('viewBoth').addEventListener('click', () => {
            this.setView('both');
        });

        document.getElementById('viewPreview').addEventListener('click', () => {
            this.setView('preview');
        });

        document.getElementById('clearContent').addEventListener('click', () => {
            this.clearContent();
        });

        document.getElementById('testSoftWraps').addEventListener('click', () => {
            this.testSoftWraps();
        });

        if (this.isCodeMirror) {
            // CodeMirror handles its own events
            this.setupCodeMirrorScrollSync();
        } else {
            // Fallback editor events
            this.editorArea.addEventListener('input', () => {
                this.handleEditorChange();
            });
            
            this.editorArea.addEventListener('scroll', () => {
                this.syncLineNumbers();
            });
        }

        // Preview scroll sync
        this.previewContent.addEventListener('scroll', () => {
            this.syncPreviewGutter();
        });
    }

    setView(view) {
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Show/hide panels based on view
        const editorPanel = document.getElementById('editorPanel');
        const previewPanel = document.getElementById('previewPanel');

        switch (view) {
            case 'editor':
                editorPanel.style.display = 'flex';
                previewPanel.style.display = 'none';
                break;
            case 'preview':
                editorPanel.style.display = 'none';
                previewPanel.style.display = 'flex';
                break;
            case 'both':
            default:
                editorPanel.style.display = 'flex';
                previewPanel.style.display = 'flex';
                break;
        }
    }

    setupCodeMirrorScrollSync() {
        if (this.editor) {
            this.editor.scrollDOM.addEventListener('scroll', () => {
                this.syncLineNumbers();
            });
        }
    }

    handleEditorChange() {
        this.renderPreview();
        this.updateURL();
        this.renderPreviewGutter();
    }

    renderPreview() {
        const content = this.getContent();
        const html = marked(content);
        this.previewContent.innerHTML = html;
    }

    renderPreviewGutter() {
        this.previewGutter.innerHTML = '';
        
        const headings = this.previewContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            const marker = document.createElement('div');
            marker.className = 'gutter-marker';
            marker.textContent = heading.tagName; // This will show H1, H2, H3, etc.
            
            const rect = heading.getBoundingClientRect();
            const containerRect = this.previewContent.getBoundingClientRect();
            const relativeTop = rect.top - containerRect.top;
            const adjustedTop = relativeTop - 25; // Account for padding
            
            marker.style.top = `${adjustedTop}px`;
            marker.dataset.originalTop = adjustedTop.toString();
            
            this.previewGutter.appendChild(marker);
        });
    }

    syncPreviewGutter() {
        const scrollTop = this.previewContent.scrollTop;
        const markers = this.previewGutter.querySelectorAll('.gutter-marker');
        
        markers.forEach(marker => {
            const originalTop = parseInt(marker.dataset.originalTop);
            const adjustedTop = originalTop - scrollTop;
            marker.style.top = `${adjustedTop}px`;
        });
    }

    syncLineNumbers() {
        if (this.isCodeMirror) {
            // CodeMirror handles line numbers automatically
            return;
        }

        const content = this.editorArea.textContent;
        const lines = content.split('\n');
        const lineCount = Math.max(lines.length, 50); // Minimum 50 lines
        
        this.lineNumbers.innerHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            const lineNumber = document.createElement('div');
            lineNumber.className = 'line-number';
            lineNumber.textContent = i;
            this.lineNumbers.appendChild(lineNumber);
        }
    }

    updateURL() {
        const content = this.getContent();
        const encoded = btoa(encodeURIComponent(content));
        const newURL = `${window.location.pathname}#${encoded}`;
        window.history.replaceState(null, '', newURL);
    }

    loadContentFromURL() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            try {
                const decoded = decodeURIComponent(atob(hash));
                this.setContent(decoded);
            } catch (error) {
                console.warn('Failed to load content from URL:', error);
            }
        }
    }

    setContent(content) {
        if (this.isCodeMirror && this.editor) {
            this.editor.dispatch({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: content
                }
            });
        } else {
            this.editorArea.textContent = content;
        }
    }

    getContent() {
        if (this.isCodeMirror && this.editor) {
            return this.editor.state.doc.toString();
        } else {
            return this.editorArea.textContent;
        }
    }

    clearContent() {
        this.setContent('');
    }

    testSoftWraps() {
        const testContent = `# Testing Soft-Wraps and Long Content 📝

This is a very long line that should wrap to multiple lines without creating new line numbers in the editor. It should just flow naturally and wrap around the container width, demonstrating the excellent soft-wrap functionality of this professional Markdown editor.

## Another Section with Long Content

Here's another extremely long paragraph that demonstrates how the editor handles long content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### Code Example with Long Lines

\`\`\`javascript
function veryLongFunctionNameWithManyParameters(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // This is a very long comment that should also wrap properly without breaking the line numbering system
    const result = param1 + param2 + param3 + param4 + param5 + param6 + param7 + param8 + param9 + param10;
    return result;
}
\`\`\`

## Lists with Long Content

- **This is a very long list item** that should wrap properly and demonstrate how the editor handles long content in list items without breaking the visual hierarchy or line numbering system.
- **Another long list item** that continues for multiple lines and shows the excellent soft-wrap capabilities of this professional Markdown editor powered by CodeMirror 6.
- **Third long list item** that demonstrates the robust text handling and beautiful typography that makes this editor a joy to use for both quick notes and long-form content.

### Blockquotes with Long Content

> This is a very long blockquote that should wrap beautifully and demonstrate the excellent typography and spacing of the preview panel. It should look professional and be easy to read, with proper margins and visual hierarchy.

---

The line numbers should only increment for actual line breaks (\\n), not for soft-wrapped content. This creates a much cleaner and more professional editing experience! 🎉`;
        
        this.setContent(testContent);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new InkUrl();
});
