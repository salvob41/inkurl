// Core rendering logic for InkUrl

document.addEventListener('DOMContentLoaded', () => {
  const markdownInput = document.getElementById('markdown-input');
  const htmlOutput = document.getElementById('html-output');
  const copyButton = document.getElementById('copy-link-button');
  const showEditorBtn = document.getElementById('show-editor');
  const showBothBtn = document.getElementById('show-both');
  const showPreviewBtn = document.getElementById('show-preview');
  const editorPane = document.getElementById('editor-pane');
  const previewPane = document.getElementById('preview-pane');

  // View mode: 'editor', 'preview', 'both'
  function getViewModeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') || 'both';
  }

  function setViewModeInUrl(mode) {
    const params = new URLSearchParams(window.location.search);
    if (mode === 'both') {
      params.delete('view');
    } else {
      params.set('view', mode);
    }
    const hash = window.location.hash;
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '') + hash;
    window.history.replaceState({}, '', newUrl);
  }

  function updateViewMode(mode) {
    setViewModeInUrl(mode);
    showEditorBtn.classList.toggle('active', mode === 'editor');
    showBothBtn.classList.toggle('active', mode === 'both');
    showPreviewBtn.classList.toggle('active', mode === 'preview');
    if (mode === 'editor') {
      editorPane.style.display = '';
      previewPane.style.display = 'none';
    } else if (mode === 'preview') {
      editorPane.style.display = 'none';
      previewPane.style.display = '';
    } else {
      editorPane.style.display = '';
      previewPane.style.display = '';
    }
  }
  // Render Markdown live preview
  function renderMarkdown() {
    const rawText = markdownInput.value;
    htmlOutput.innerHTML = window.marked ? window.marked.parse(rawText) : rawText;
  }

  // Load content from URL hash (if present)
  function loadContentFromUrl() {
    if (window.location.hash.length > 1) {
      try {
        const hash = window.location.hash.slice(1);
        const decoded = decodeURIComponent(atob(hash));
        markdownInput.value = decoded;
      } catch (e) {
        markdownInput.value = '';
      }
    }
    renderMarkdown();
    updateViewMode(getViewModeFromUrl());
  }

  // Update URL and preview on input
  function updateUrlAndPreview() {
    const rawText = markdownInput.value;
    const encoded = btoa(encodeURIComponent(rawText));
    window.location.hash = encoded;
    renderMarkdown();
  }

  // Copy shareable link to clipboard
  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      copyButton.textContent = 'Copied!';
      copyButton.classList.add('copied');
      setTimeout(() => {
        copyButton.textContent = 'Copy Shareable Link';
        copyButton.classList.remove('copied');
      }, 2000);
    });
  }

  // Toggle view mode handlers
  showEditorBtn.addEventListener('click', () => updateViewMode('editor'));
  showBothBtn.addEventListener('click', () => updateViewMode('both'));
  showPreviewBtn.addEventListener('click', () => updateViewMode('preview'));

  // On popstate (browser navigation), update view mode
  window.addEventListener('popstate', () => {
    updateViewMode(getViewModeFromUrl());
  });
  markdownInput.addEventListener('input', updateUrlAndPreview);
  copyButton.addEventListener('click', copyLink);

  loadContentFromUrl();
});
