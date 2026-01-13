// API documentation HTML template
export function getDocsPage(cssContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OG Image Generator — Dynamic Social Cards</title>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${cssContent}</style>
</head>
<body>
  <div class="bg-blur"></div>
  <div class="noise"></div>

  <div class="container">
    <header>
      <div class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        Cloudflare Workers
      </div>
      <h1>Dynamic <em>OG Images</em></h1>
      <p class="subtitle">Generate beautiful Open Graph images on-the-fly. Perfect for blogs, docs, and social sharing.</p>
    </header>

    <section class="preview-section">
      <div class="preview-container">
        <div class="preview-header">
          <div class="preview-dot red"></div>
          <div class="preview-dot yellow"></div>
          <div class="preview-dot green"></div>
          <div class="preview-url" id="previewUrl">/api/og?title=Hello+World</div>
        </div>
        <div class="preview-frame">
          <img id="previewImage" src="/api/og?title=Hello+World&theme=midnight&layout=standard" alt="OG Image Preview">
        </div>
        <div class="controls">
          <div class="control-group">
            <label>Title</label>
            <input type="text" id="titleInput" value="Hello World" placeholder="Your title here">
          </div>
          <div class="control-group">
            <label>Subtitle</label>
            <input type="text" id="subtitleInput" placeholder="Optional subtitle">
          </div>
          <div class="control-group">
            <label>Author</label>
            <input type="text" id="authorInput" placeholder="Mohd Doe">
          </div>
          <div class="control-group">
            <label>Domain</label>
            <input type="text" id="domainInput" placeholder="hello.com">
          </div>
          <div class="control-group">
            <label>Theme</label>
            <select id="themeSelect">
              <option value="midnight">Midnight</option>
              <option value="sunset">Sunset</option>
              <option value="ocean">Ocean</option>
              <option value="forest">Forest</option>
              <option value="rose">Rose</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div class="control-group">
            <label>Layout</label>
            <select id="layoutSelect">
              <option value="standard">Standard</option>
              <option value="centered">Centered</option>
              <option value="split">Split</option>
              <option value="minimal">Minimal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="control-group">
            <label>Emoji</label>
            <input type="text" id="emojiInput" placeholder="🚀">
          </div>
          <div class="control-group">
            <label>Date</label>
            <input type="text" id="dateInput" placeholder="Jan 2025">
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-primary" id="downloadBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download SVG
          </button>
          <button class="btn btn-secondary" id="copyUrlBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy URL
          </button>
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2>API Reference</h2>

      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-badge">GET</span>
          <span class="endpoint-path">/api/og</span>
        </div>
        <table class="params-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="param-name">title</span></td>
              <td><span class="param-type">string</span></td>
              <td>Main title text (required)</td>
            </tr>
            <tr>
              <td><span class="param-name">subtitle</span></td>
              <td><span class="param-type">string</span></td>
              <td>Secondary text below the title</td>
            </tr>
            <tr>
              <td><span class="param-name">author</span></td>
              <td><span class="param-type">string</span></td>
              <td>Author name</td>
            </tr>
            <tr>
              <td><span class="param-name">domain</span></td>
              <td><span class="param-type">string</span></td>
              <td>Website domain (e.g., example.com)</td>
            </tr>
            <tr>
              <td><span class="param-name">theme</span></td>
              <td><span class="param-type">string</span></td>
              <td>
                Color theme
                <div class="param-values">
                  <span class="param-value">midnight</span>
                  <span class="param-value">sunset</span>
                  <span class="param-value">ocean</span>
                  <span class="param-value">forest</span>
                  <span class="param-value">rose</span>
                  <span class="param-value">minimal</span>
                </div>
              </td>
            </tr>
            <tr>
              <td><span class="param-name">layout</span></td>
              <td><span class="param-type">string</span></td>
              <td>
                Layout style
                <div class="param-values">
                  <span class="param-value">standard</span>
                  <span class="param-value">centered</span>
                  <span class="param-value">split</span>
                  <span class="param-value">minimal</span>
                  <span class="param-value">bold</span>
                </div>
              </td>
            </tr>
            <tr>
              <td><span class="param-name">emoji</span></td>
              <td><span class="param-type">string</span></td>
              <td>Emoji to display</td>
            </tr>
            <tr>
              <td><span class="param-name">date</span></td>
              <td><span class="param-type">string</span></td>
              <td>Date string to display</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="margin-bottom: 16px; color: var(--text-secondary);">Example Usage</h3>
      <div class="code-block" id="exampleCode">&lt;meta property="og:image" content="https://your-worker.workers.dev/api/og?title=My+Blog+Post&amp;author=John&amp;theme=midnight" /&gt;</div>
    </section>

    <footer>
      Built with <a href="https://workers.cloudflare.com" target="_blank">Cloudflare Workers</a> — Generate beautiful social cards instantly
    </footer>
  </div>

  <script>
    const inputs = {
      title: document.getElementById('titleInput'),
      subtitle: document.getElementById('subtitleInput'),
      author: document.getElementById('authorInput'),
      domain: document.getElementById('domainInput'),
      theme: document.getElementById('themeSelect'),
      layout: document.getElementById('layoutSelect'),
      emoji: document.getElementById('emojiInput'),
      date: document.getElementById('dateInput'),
    };

    const previewImage = document.getElementById('previewImage');
    const previewUrl = document.getElementById('previewUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyUrlBtn = document.getElementById('copyUrlBtn');

    function buildUrl() {
      const params = new URLSearchParams();
      if (inputs.title.value) params.set('title', inputs.title.value);
      if (inputs.subtitle.value) params.set('subtitle', inputs.subtitle.value);
      if (inputs.author.value) params.set('author', inputs.author.value);
      if (inputs.domain.value) params.set('domain', inputs.domain.value);
      if (inputs.theme.value) params.set('theme', inputs.theme.value);
      if (inputs.layout.value) params.set('layout', inputs.layout.value);
      if (inputs.emoji.value) params.set('emoji', inputs.emoji.value);
      if (inputs.date.value) params.set('date', inputs.date.value);
      return '/api/og?' + params.toString();
    }

    function updatePreview() {
      const url = buildUrl();
      previewImage.src = url;
      previewUrl.textContent = url;
    }

    // Debounce
    let timeout;
    function debouncedUpdate() {
      clearTimeout(timeout);
      timeout = setTimeout(updatePreview, 300);
    }

    Object.values(inputs).forEach(input => {
      input.addEventListener('input', debouncedUpdate);
      input.addEventListener('change', updatePreview);
    });

    downloadBtn.addEventListener('click', () => {
      const url = buildUrl();
      const link = document.createElement('a');
      link.href = url;
      link.download = 'og-image.svg';
      link.click();
    });

    copyUrlBtn.addEventListener('click', () => {
      const fullUrl = window.location.origin + buildUrl();
      navigator.clipboard.writeText(fullUrl).then(() => {
        copyUrlBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(() => {
          copyUrlBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy URL';
        }, 2000);
      });
    });
  </script>
</body>
</html>`;
}
