export const cssStyles = `
 *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #09090b;
      --bg-elevated: #18181b;
      --bg-hover: #27272a;
      --border: #27272a;
      --border-hover: #3f3f46;
      --text: #fafafa;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;
      --accent: #a855f7;
      --accent-secondary: #6366f1;
      --radius: 16px;
      --radius-sm: 10px;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Animated gradient background */
    .bg-blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      pointer-events: none;
      overflow: hidden;
      z-index: -1;
    }

    .bg-blur::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: 
        radial-gradient(ellipse at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
      animation: bgFloat 20s ease-in-out infinite;
    }

    @keyframes bgFloat {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(30px, -30px) rotate(5deg); }
      66% { transform: translate(-20px, 20px) rotate(-5deg); }
    }

    .noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.015;
      z-index: 1000;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
    }

    /* Header */
    header {
      padding: 80px 0 60px;
      text-align: center;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.1));
      border: 1px solid rgba(168, 85, 247, 0.2);
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 32px;
      animation: fadeDown 0.6s ease-out;
    }

    .badge svg {
      width: 14px;
      height: 14px;
    }

    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: clamp(48px, 8vw, 80px);
      font-weight: 400;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin-bottom: 24px;
      animation: fadeUp 0.6s ease-out 0.1s both;
    }

    h1 em {
      font-style: italic;
      background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 18px;
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto;
      animation: fadeUp 0.6s ease-out 0.2s both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Preview Section */
    .preview-section {
      margin-bottom: 80px;
      animation: fadeUp 0.6s ease-out 0.3s both;
    }

    .preview-container {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      position: relative;
    }

    .preview-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }

    .preview-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--border-hover);
    }

    .preview-dot.red { background: #ef4444; }
    .preview-dot.yellow { background: #eab308; }
    .preview-dot.green { background: #22c55e; }

    .preview-url {
      flex: 1;
      margin-left: 12px;
      padding: 8px 16px;
      background: var(--bg);
      border-radius: 8px;
      font-family: 'Geist Mono', monospace;
      font-size: 12px;
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .preview-frame {
      aspect-ratio: 1200 / 630;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .preview-frame img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .preview-loading {
      color: var(--text-muted);
      font-size: 14px;
    }

    /* Controls */
    .controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 24px;
      background: linear-gradient(to bottom, transparent, var(--bg));
      border-top: 1px solid var(--border);
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    input, select {
      padding: 14px 16px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text);
      font-family: inherit;
      font-size: 14px;
      transition: all 0.2s;
    }

    input:focus, select:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
    }

    input::placeholder {
      color: var(--text-muted);
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 40px;
    }

    /* Action buttons */
    .actions {
      display: flex;
      gap: 12px;
      padding: 0 24px 24px;
    }

    .btn {
      flex: 1;
      padding: 16px 24px;
      border: none;
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(168, 85, 247, 0.3);
    }

    .btn-secondary {
      background: var(--bg);
      color: var(--text);
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: var(--bg-hover);
      border-color: var(--border-hover);
    }

    /* Docs Section */
    .docs-section {
      padding: 60px 0;
      border-top: 1px solid var(--border);
    }

    .docs-section h2 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 36px;
      font-weight: 400;
      margin-bottom: 32px;
    }

    .endpoint-card {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      margin-bottom: 32px;
    }

    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
    }

    .method-badge {
      padding: 6px 12px;
      background: rgba(34, 197, 94, 0.1);
      border-radius: 6px;
      font-family: 'Geist Mono', monospace;
      font-size: 12px;
      font-weight: 600;
      color: #22c55e;
    }

    .endpoint-path {
      font-family: 'Geist Mono', monospace;
      font-size: 14px;
      color: var(--text);
    }

    .params-table {
      width: 100%;
    }

    .params-table th,
    .params-table td {
      padding: 16px 24px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    .params-table th {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--bg);
    }

    .params-table tr:last-child td {
      border-bottom: none;
    }

    .param-name {
      font-family: 'Geist Mono', monospace;
      font-size: 13px;
      color: var(--accent);
    }

    .param-type {
      font-family: 'Geist Mono', monospace;
      font-size: 12px;
      color: var(--text-muted);
    }

    .param-values {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .param-value {
      padding: 4px 8px;
      background: var(--bg);
      border-radius: 4px;
      font-family: 'Geist Mono', monospace;
      font-size: 11px;
      color: var(--text-secondary);
    }

    /* Themes Grid */
    .themes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }

    .theme-card {
      padding: 20px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: all 0.2s;
    }

    .theme-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .theme-card.active {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
    }

    .theme-name {
      font-size: 14px;
      font-weight: 600;
      margin-top: 12px;
    }

    .theme-preview {
      height: 8px;
      border-radius: 4px;
    }

    /* Footer */
    footer {
      padding: 40px 0;
      text-align: center;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 14px;
    }

    footer a {
      color: var(--accent);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    /* Code block */
    .code-block {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 20px;
      font-family: 'Geist Mono', monospace;
      font-size: 13px;
      color: var(--text-secondary);
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }

    @media (max-width: 640px) {
      header {
        padding: 60px 0 40px;
      }
      
      .controls {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
      }
    }
`;
