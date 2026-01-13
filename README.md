# OG Image Generator

A Cloudflare Worker that generates beautiful Open Graph images dynamically. Perfect for blogs, documentation, and social sharing — no design tools needed.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)

## ✨ Features

- 🎨 **6 Beautiful Themes** — Midnight, Sunset, Ocean, Forest, Rose, Minimal
- 📐 **5 Layout Options** — Standard, Centered, Split, Minimal, Bold
- ⚡ **Edge-Fast** — Runs on 300+ Cloudflare locations
- 🖼️ **SVG Output** — Crisp at any resolution
- 💾 **Long Cache** — 7 days CDN caching
- 🔧 **Zero Config** — Works out of the box

## 🚀 Quick Start

```bash
# Clone the project
git clone <your-repo>
cd og-image-generator

# Install dependencies
npm install

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## 📖 Usage

### Basic Example

```html
<meta property="og:image" content="https://your-worker.workers.dev/api/og?title=My+Blog+Post" />
```

### Full Example

```html
<meta property="og:image" content="https://your-worker.workers.dev/api/og?title=Building+Modern+APIs&subtitle=A+complete+guide&author=John+Doe&domain=blog.example.com&theme=midnight&layout=standard&emoji=🚀" />
```

### API Endpoint

```
GET /api/og
```

### Parameters

| Parameter  | Type   | Default    | Description                |
|------------|--------|------------|----------------------------|
| `title`    | string | Required   | Main heading               |
| `subtitle` | string | —          | Secondary text             |
| `author`   | string | —          | Author name                |
| `domain`   | string | —          | Website domain             |
| `theme`    | string | `midnight` | Color theme                |
| `layout`   | string | `standard` | Layout style               |
| `emoji`    | string | —          | Emoji to display           |
| `date`     | string | —          | Date string                |

### Themes

| Theme      | Description                        |
|------------|------------------------------------|
| `midnight` | Deep purple/indigo dark theme      |
| `sunset`   | Warm orange/purple dark theme      |
| `ocean`    | Cool cyan/blue dark theme          |
| `forest`   | Fresh green dark theme             |
| `rose`     | Pink/red dark theme                |
| `minimal`  | Clean light theme                  |

### Layouts

| Layout     | Description                        |
|------------|------------------------------------|
| `standard` | Classic blog post style            |
| `centered` | Centered text with orbs            |
| `split`    | Left content, right accent         |
| `minimal`  | Clean, simple layout               |
| `bold`     | Large text with accent pill        |

## 🛠️ Integration Examples

### Next.js (App Router)

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  const ogImage = new URL('https://your-worker.workers.dev/api/og');
  ogImage.searchParams.set('title', post.title);
  ogImage.searchParams.set('author', post.author);
  ogImage.searchParams.set('domain', 'yourblog.com');
  ogImage.searchParams.set('theme', 'midnight');
  
  return {
    openGraph: {
      images: [ogImage.toString()],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage.toString()],
    },
  };
}
```

### Astro

```astro
---
// src/layouts/BlogPost.astro
const { title, author, date } = Astro.props;

const ogUrl = new URL('https://your-worker.workers.dev/api/og');
ogUrl.searchParams.set('title', title);
ogUrl.searchParams.set('author', author);
ogUrl.searchParams.set('date', date);
ogUrl.searchParams.set('theme', 'ocean');
---

<head>
  <meta property="og:image" content={ogUrl.toString()} />
  <meta name="twitter:image" content={ogUrl.toString()} />
</head>
```

### Hugo

```html
<!-- layouts/partials/head.html -->
{{ $ogParams := querify 
  "title" .Title 
  "author" .Site.Author.name
  "domain" .Site.BaseURL
  "theme" "forest"
}}
<meta property="og:image" content="https://your-worker.workers.dev/api/og?{{ $ogParams }}" />
```

### Markdown/MDX Frontmatter

```js
// Generate OG image URL from frontmatter
function getOGImage(frontmatter) {
  const params = new URLSearchParams({
    title: frontmatter.title,
    subtitle: frontmatter.description,
    author: frontmatter.author,
    date: frontmatter.date,
    theme: 'midnight',
  });
  return `https://your-worker.workers.dev/api/og?${params}`;
}
```

## 🔧 Development

```bash
# Start local dev server with hot reload
npm run dev

# Deploy to production
npm run deploy

# View live logs
npm run tail
```

## 📁 Project Structure

```
og-image-generator/
├── src/
│   └── index.ts      # Main worker code
├── package.json
├── tsconfig.json
├── wrangler.toml     # Cloudflare config
└── README.md
```

## 🎯 Use Cases

- **Blog Posts** — Auto-generate social cards for every article
- **Documentation** — Create consistent docs thumbnails
- **Product Pages** — Dynamic product social cards
- **Events** — Conference/meetup announcement cards
- **Portfolios** — Project showcase cards
- **Newsletters** — Email preview images

## 📝 License

MIT

---

Built with ❤️ using Cloudflare Workers
