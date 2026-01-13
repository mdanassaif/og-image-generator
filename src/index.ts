/**
 * Dynamic OG Image Generator
 * 
 * A Cloudflare Worker that generates beautiful Open Graph images on-the-fly.
 * Perfect for blog posts, social sharing, documentation, and more.
 * 
 * Uses SVG generation with embedded fonts for consistent, sharp output.
 */


import { cssStyles } from './styles';
import { getDocsPage } from './template';

export interface Env {}

// Theme configurations
const themes = {
  midnight: {
    bg: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1f 100%)',
    bgSolid: '#0f0f23',
    text: '#ffffff',
    accent: '#6366f1',
    accentLight: '#818cf8',
    muted: '#94a3b8',
  },
  sunset: {
    bg: 'linear-gradient(135deg, #1f1d2e 0%, #2d1b3d 50%, #1a1625 100%)',
    bgSolid: '#1f1d2e',
    text: '#ffffff',
    accent: '#f97316',
    accentLight: '#fb923c',
    muted: '#a1a1aa',
  },
  ocean: {
    bg: 'linear-gradient(135deg, #0c1929 0%, #0f2847 50%, #071520 100%)',
    bgSolid: '#0c1929',
    text: '#ffffff',
    accent: '#06b6d4',
    accentLight: '#22d3ee',
    muted: '#94a3b8',
  },
  forest: {
    bg: 'linear-gradient(135deg, #0f1a0f 0%, #1a2e1a 50%, #0d150d 100%)',
    bgSolid: '#0f1a0f',
    text: '#ffffff',
    accent: '#22c55e',
    accentLight: '#4ade80',
    muted: '#a1a1aa',
  },
  minimal: {
    bg: 'linear-gradient(135deg, #fafafa 0%, #f4f4f5 50%, #e4e4e7 100%)',
    bgSolid: '#fafafa',
    text: '#18181b',
    accent: '#18181b',
    accentLight: '#3f3f46',
    muted: '#71717a',
  },
  rose: {
    bg: 'linear-gradient(135deg, #1c1017 0%, #2d1a24 50%, #170d12 100%)',
    bgSolid: '#1c1017',
    text: '#ffffff',
    accent: '#f43f5e',
    accentLight: '#fb7185',
    muted: '#a1a1aa',
  },
} as const;

type ThemeName = keyof typeof themes;

// Layout configurations
const layouts = {
  standard: 'standard',
  centered: 'centered',
  split: 'split',
  minimal: 'minimal',
  bold: 'bold',
} as const;

type LayoutName = keyof typeof layouts;

interface OGParams {
  title: string;
  subtitle?: string;
  author?: string;
  domain?: string;
  theme?: ThemeName;
  layout?: LayoutName;
  emoji?: string;
  logo?: string;
  date?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + '…';
}

function generateSVG(params: OGParams): string {
  const width = 1200;
  const height = 630;
  const theme = themes[params.theme || 'midnight'];
  const layout = params.layout || 'standard';
  
  const title = escapeHtml(truncateText(params.title, 80));
  const subtitle = params.subtitle ? escapeHtml(truncateText(params.subtitle, 120)) : '';
  const author = params.author ? escapeHtml(params.author) : '';
  const domain = params.domain ? escapeHtml(params.domain) : '';
  const emoji = params.emoji || '';
  const date = params.date ? escapeHtml(params.date) : '';

  // Generate noise pattern for texture
  const noisePattern = `
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
  `;

  // Generate grid pattern
  const gridPattern = `
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="${theme.accent}" stroke-width="0.5" opacity="0.1"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  `;

  // Decorative elements based on layout
  let decorativeElements = '';
  let contentLayout = '';

  switch (layout) {
    case 'centered':
      decorativeElements = `
        <circle cx="100" cy="100" r="300" fill="${theme.accent}" opacity="0.05"/>
        <circle cx="1100" cy="530" r="250" fill="${theme.accentLight}" opacity="0.05"/>
      `;
      contentLayout = `
        <g transform="translate(${width / 2}, ${height / 2})">
          ${emoji ? `<text x="0" y="-120" font-size="72" text-anchor="middle">${emoji}</text>` : ''}
          <text x="0" y="${emoji ? '0' : '-40'}" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="700" fill="${theme.text}" text-anchor="middle">${title}</text>
          ${subtitle ? `<text x="0" y="${emoji ? '60' : '30'}" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="${theme.muted}" text-anchor="middle">${subtitle}</text>` : ''}
          ${author || domain ? `
            <text x="0" y="${emoji ? '130' : '100'}" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="${theme.accent}" text-anchor="middle">
              ${author}${author && domain ? ' · ' : ''}${domain}
            </text>
          ` : ''}
        </g>
      `;
      break;

    case 'split':
      decorativeElements = `
        <rect x="0" y="0" width="8" height="${height}" fill="${theme.accent}"/>
        <rect x="${width - 400}" y="0" width="400" height="${height}" fill="${theme.accent}" opacity="0.1"/>
        ${gridPattern}
      `;
      contentLayout = `
        <g transform="translate(80, 100)">
          ${emoji ? `<text x="0" y="60" font-size="64">${emoji}</text>` : ''}
          <text x="0" y="${emoji ? '160' : '120'}" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="${theme.text}">
            ${wrapText(title, 500, 52).map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : 62}">${line}</tspan>`).join('')}
          </text>
          ${subtitle ? `<text x="0" y="${emoji ? '280' : '250'}" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="${theme.muted}">${subtitle}</text>` : ''}
        </g>
        <g transform="translate(80, ${height - 80})">
          <text font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${theme.accent}">${author}${author && domain ? ' · ' : ''}${domain}</text>
        </g>
        <g transform="translate(${width - 200}, ${height / 2})">
          <text font-family="system-ui, -apple-system, sans-serif" font-size="120" font-weight="800" fill="${theme.accent}" opacity="0.15" text-anchor="middle" transform="rotate(-90)">${domain?.split('.')[0]?.toUpperCase() || ''}</text>
        </g>
      `;
      break;

    case 'minimal':
      decorativeElements = `
        <line x1="80" y1="${height - 80}" x2="${width - 80}" y2="${height - 80}" stroke="${theme.accent}" stroke-width="2"/>
      `;
      contentLayout = `
        <g transform="translate(80, ${height / 2 - 40})">
          <text font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="600" fill="${theme.text}">
            ${wrapText(title, 1000, 64).map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : 76}">${line}</tspan>`).join('')}
          </text>
        </g>
        <g transform="translate(80, ${height - 50})">
          <text font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${theme.muted}">${domain}</text>
          <text x="${width - 160}" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${theme.muted}">${date || author}</text>
        </g>
      `;
      break;

    case 'bold':
      decorativeElements = `
        <rect x="0" y="0" width="${width}" height="12" fill="${theme.accent}"/>
        <rect x="0" y="${height - 12}" width="${width}" height="12" fill="${theme.accent}"/>
        <circle cx="${width - 150}" cy="150" r="200" fill="${theme.accent}" opacity="0.1"/>
        <circle cx="${width - 100}" cy="200" r="150" fill="${theme.accentLight}" opacity="0.08"/>
      `;
      contentLayout = `
        <g transform="translate(80, 120)">
          ${emoji ? `<text font-size="80">${emoji}</text>` : ''}
        </g>
        <g transform="translate(80, ${height / 2 + 20})">
          <text font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" fill="${theme.text}" letter-spacing="-2">
            ${wrapText(title, 900, 72).map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : 82}">${line}</tspan>`).join('')}
          </text>
        </g>
        <g transform="translate(80, ${height - 60})">
          <rect x="-10" y="-25" width="${(author.length + domain.length) * 10 + 60}" height="40" rx="20" fill="${theme.accent}"/>
          <text font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="${theme.bgSolid}">${author}${author && domain ? ' · ' : ''}${domain}</text>
        </g>
      `;
      break;

    default: // standard
      decorativeElements = `
        <rect x="0" y="0" width="${width}" height="6" fill="${theme.accent}"/>
        ${gridPattern}
        <circle cx="-100" cy="${height + 100}" r="400" fill="${theme.accent}" opacity="0.05"/>
        <circle cx="${width + 50}" cy="-50" r="300" fill="${theme.accentLight}" opacity="0.05"/>
      `;
      contentLayout = `
        <g transform="translate(80, 80)">
          ${emoji ? `<text font-size="56">${emoji}</text>` : ''}
          <text x="${emoji ? '80' : '0'}" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="${theme.accent}" text-transform="uppercase" letter-spacing="2">${domain}</text>
        </g>
        <g transform="translate(80, 220)">
          <text font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="700" fill="${theme.text}">
            ${wrapText(title, 1000, 58).map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : 70}">${line}</tspan>`).join('')}
          </text>
        </g>
        ${subtitle ? `
          <g transform="translate(80, 420)">
            <text font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="${theme.muted}">${subtitle}</text>
          </g>
        ` : ''}
        <g transform="translate(80, ${height - 60})">
          ${author ? `
            <circle cx="20" cy="-8" r="20" fill="${theme.accent}" opacity="0.2"/>
            <text x="20" y="-2" font-size="20" text-anchor="middle">${author.charAt(0).toUpperCase()}</text>
            <text x="55" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${theme.text}">${author}</text>
          ` : ''}
          ${date ? `<text x="${width - 160}" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="${theme.muted}">${date}</text>` : ''}
        </g>
      `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.bgSolid}"/>
      <stop offset="50%" style="stop-color:${theme.bgSolid}"/>
      <stop offset="100%" style="stop-color:${theme.bgSolid}"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Noise texture -->
  ${noisePattern}
  
  <!-- Decorative elements -->
  ${decorativeElements}
  
  <!-- Content -->
  ${contentLayout}
</svg>`;
}

function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  const charWidth = fontSize * 0.5; // Approximate character width

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length * charWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.slice(0, 3); // Max 3 lines
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Parse query params
function parseParams(url: URL): OGParams {
  const title = url.searchParams.get('title') || 'Hello World';
  const subtitle = url.searchParams.get('subtitle') || undefined;
  const author = url.searchParams.get('author') || undefined;
  const domain = url.searchParams.get('domain') || undefined;
  const theme = (url.searchParams.get('theme') as ThemeName) || 'midnight';
  const layout = (url.searchParams.get('layout') as LayoutName) || 'standard';
  const emoji = url.searchParams.get('emoji') || undefined;
  const date = url.searchParams.get('date') || undefined;

  return { title, subtitle, author, domain, theme, layout, emoji, date };
}

 
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // OG Image API
    if (url.pathname === '/api/og') {
      const params = parseParams(url);
      const svg = generateSVG(params);

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800',
          ...corsHeaders,
        },
      });
    }
 

     return new Response(getDocsPage(cssStyles), {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  },
};
