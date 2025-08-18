// Core rendering logic for InkUrl

document.addEventListener('DOMContentLoaded', () => {
  const markdownInput = document.getElementById('markdown-input');
  const htmlOutput = document.getElementById('html-output');
  const copyButton = document.getElementById('copy-link-button');

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

  markdownInput.addEventListener('input', updateUrlAndPreview);
  copyButton.addEventListener('click', copyLink);

  loadContentFromUrl();
});
