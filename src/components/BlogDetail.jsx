import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Copy,
  ExternalLink,
  BookOpen,
  Sparkles,
  Tag,
  ChevronRight,
  Send,
  Linkedin,
  Twitter,
  MessageSquare,
  AlertTriangle,
  Info
} from 'lucide-react';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogs';
import { personalInfo } from '../data/portfolioData';

// --- ROBUST INLINE MARKDOWN TOKENIZER ---
// Parses `code`, **bold**, *italic*, [link](url), and handles nested formatting cleanly
function tokenizeInline(text) {
  if (!text) return [];
  // Match `inline code`, **bold**, *italic*, [link](url), and escaped \$
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\\\$)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.substring(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push({ type: 'code', value: token.slice(1, -1) });
    } else if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2);
      if (inner.includes('`') || inner.includes('*') || inner.includes('[')) {
        parts.push({ type: 'bold_nested', children: tokenizeInline(inner) });
      } else {
        parts.push({ type: 'bold', value: inner });
      }
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push({ type: 'italic', value: token.slice(1, -1) });
    } else if (token.startsWith('[') && token.includes('](')) {
      const closingBracket = token.indexOf('](');
      const linkText = token.slice(1, closingBracket);
      const url = token.slice(closingBracket + 2, -1);
      parts.push({ type: 'link', text: linkText, url });
    } else if (token === '\\$') {
      parts.push({ type: 'text', value: '$' });
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.substring(lastIndex) });
  }

  return parts;
}

function renderInlineTokens(text) {
  if (!text) return null;
  const tokens = tokenizeInline(text);

  return tokens.map((token, idx) => {
    switch (token.type) {
      case 'bold':
        return (
          <strong key={idx} className="font-bold text-white tracking-wide">
            {token.value}
          </strong>
        );
      case 'bold_nested':
        return (
          <strong key={idx} className="font-bold text-white tracking-wide">
            {token.children.map((child, cIdx) => {
              if (child.type === 'code') {
                return (
                  <code
                    key={cIdx}
                    className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-electric-300 font-mono text-xs sm:text-[13px] font-semibold"
                  >
                    {child.value}
                  </code>
                );
              }
              if (child.type === 'italic') {
                return <em key={cIdx} className="italic text-slate-200">{child.value}</em>;
              }
              return child.value;
            })}
          </strong>
        );
      case 'italic':
        return (
          <em key={idx} className="italic text-slate-200">
            {token.value}
          </em>
        );
      case 'code':
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-electric-300 font-mono text-xs sm:text-[13px] font-semibold"
          >
            {token.value}
          </code>
        );
      case 'link':
        return (
          <a
            key={idx}
            href={token.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-300 hover:text-white underline underline-offset-4 decoration-electric-accent/50 hover:decoration-white font-medium transition-colors"
          >
            {token.text}
          </a>
        );
      default:
        return token.value;
    }
  });
}

// --- STRUCTURED MARKDOWN BLOCK PARSER ---
function parseMarkdownBlocks(rawText) {
  const lines = rawText.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Code Block: ```lang ... ```
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace('```', '').trim() || 'code';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: 'code',
        lang,
        code: codeLines.join('\n')
      });
      continue;
    }

    // 3. Headings
    if (trimmed.startsWith('#### ')) {
      blocks.push({ type: 'h4', text: trimmed.replace(/^####\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.replace(/^###\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.replace(/^##\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.replace(/^#\s+/, '') });
      i++;
      continue;
    }

    // 4. Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // 5. Table: lines starting with |
    if (trimmed.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        // Line 0: Header
        const headerRow = tableLines[0]
          .split('|')
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        // Line 1 is separator (:--- | :---)
        // Subsequent lines are rows
        const dataRows = tableLines.slice(2).map((r) => {
          return r
            .split('|')
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        });
        blocks.push({
          type: 'table',
          headers: headerRow,
          rows: dataRows
        });
      }
      continue;
    }

    // 6. Blockquote / Callout
    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({
        type: 'quote',
        text: quoteLines.join(' ')
      });
      continue;
    }

    // 7. Unordered List (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'ul',
        items
      });
      continue;
    }

    // 8. Ordered List (1. , 2. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'ol',
        items
      });
      continue;
    }

    // 9. Regular Paragraph (group consecutive non-empty lines)
    const paragraphLines = [];
    while (
      i < lines.length &&
      lines[i].trim().length > 0 &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('|') &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      lines[i].trim() !== '---'
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }
    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'p',
        text: paragraphLines.join(' ')
      });
    }
  }

  return blocks;
}

export default function BlogDetail({ slug, onNavigateBlog, onBackToPortfolio }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  const blog = getBlogBySlug(slug);
  const relatedBlogs = blog ? getRelatedBlogs(blog.slug, blog.category, 3) : [];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Track Reading Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic SEO Metadata & JSON-LD Injection
  useEffect(() => {
    if (!blog) return;

    // Update Document Title
    const originalTitle = document.title;
    document.title = `${blog.metaTitle || blog.title} | Md Rahmatullah Quraishi`;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', blog.metaDescription);
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonical ? canonical.getAttribute('href') : '';
    const blogUrl = `https://rahmatportfolio.vercel.app/blog/${blog.slug}`;
    if (canonical) {
      canonical.setAttribute('href', blogUrl);
    }

    // Inject Dynamic JSON-LD Schema
    const scriptId = 'blog-jsonld-schema';
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = scriptId;
      existingScript.type = 'application/ld+json';
      document.head.appendChild(existingScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": blog.title,
      "description": blog.metaDescription,
      "url": blogUrl,
      "image": "https://rahmatportfolio.vercel.app/og-preview.svg",
      "author": {
        "@type": "Person",
        "name": "Md Rahmatullah Quraishi",
        "url": "https://rahmatportfolio.vercel.app/",
        "jobTitle": "Full Stack Developer"
      },
      "publisher": {
        "@type": "Person",
        "name": "Md Rahmatullah Quraishi",
        "url": "https://rahmatportfolio.vercel.app/"
      },
      "datePublished": `${blog.publishedAt}T00:00:00+05:30`,
      "dateModified": `${blog.updatedAt}T00:00:00+05:30`,
      "mainEntityOfPage": blogUrl,
      "keywords": blog.keywords.join(", "),
      "wordCount": blog.wordCount,
      "inLanguage": "en"
    };

    existingScript.text = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      if (canonical && originalCanonical) canonical.setAttribute('href', originalCanonical);
      if (existingScript) existingScript.remove();
    };
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-slate-400 max-w-md mb-8">
          The technical guide you are looking for may have been moved or updated.
        </p>
        <button
          onClick={() => onNavigateBlog()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-accent text-white font-bold hover:bg-blue-600 transition-all shadow-glow-electric"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 20 Technical Guides</span>
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/blog/${blog.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopySnippet = (codeString, key) => {
    navigator.clipboard.writeText(codeString);
    setCopiedCodeSnippet(key);
    setTimeout(() => setCopiedCodeSnippet(null), 2000);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(`${window.location.origin}/blog/${blog.slug}`);
    const text = encodeURIComponent(`Check out "${blog.title}" by Md Rahmatullah Quraishi:`);
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    }
  };

  // Render Full Content with Structured Blocks
  const renderContentBlocks = (rawText) => {
    const blocks = parseMarkdownBlocks(rawText);

    return blocks.map((block, idx) => {
      switch (block.type) {
        // H2 Heading: Clean typography, vertical electric pill, NO tacky '#' symbol!
        case 'h2': {
          // Find matching TOC ID if available
          const matchingToc = blog.tableOfContents?.find(
            (t) =>
              t.title.toLowerCase().trim() === block.text.toLowerCase().trim() ||
              block.text.toLowerCase().includes(t.title.toLowerCase())
          );
          const headingId =
            matchingToc?.id ||
            block.text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');

          return (
            <h2
              key={`h2-${idx}`}
              id={headingId}
              className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-white mt-12 mb-5 pb-3 border-b border-slate-800 flex items-center gap-3 scroll-mt-28 tracking-tight"
            >
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-500 to-electric-accent shrink-0 shadow-glow-sm" />
              <span>{renderInlineTokens(block.text)}</span>
            </h2>
          );
        }

        // H3 Subheading
        case 'h3':
          return (
            <h3
              key={`h3-${idx}`}
              className="text-lg sm:text-xl font-bold text-slate-100 mt-8 mb-3 flex items-center gap-2.5 tracking-tight"
            >
              <span className="w-2 h-2 rounded-full bg-electric-accent shrink-0 shadow-glow-sm" />
              <span>{renderInlineTokens(block.text)}</span>
            </h3>
          );

        // H4 Minor Subheading
        case 'h4':
          return (
            <h4
              key={`h4-${idx}`}
              className="text-base sm:text-lg font-bold text-slate-200 mt-6 mb-2"
            >
              {renderInlineTokens(block.text)}
            </h4>
          );

        // Unordered List: Grouped items with glowing electric bullet dots
        case 'ul':
          return (
            <ul key={`ul-${idx}`} className="my-5 space-y-3 pl-1">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-accent mt-2 shrink-0 shadow-glow-sm" />
                  <div className="flex-1">{renderInlineTokens(item)}</div>
                </li>
              ))}
            </ul>
          );

        // Ordered List: Grouped items with circular number badges
        case 'ol':
          return (
            <ol key={`ol-${idx}`} className="my-5 space-y-3 pl-1">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 font-mono text-xs font-bold shrink-0 mt-0.5">
                    {itemIdx + 1}
                  </span>
                  <div className="flex-1">{renderInlineTokens(item)}</div>
                </li>
              ))}
            </ol>
          );

        // Callout Box: Distinguishes Critical Notes vs Tips vs Info
        case 'quote': {
          const isCritical =
            block.text.toLowerCase().includes('critical') ||
            block.text.toLowerCase().includes('warning') ||
            block.text.toLowerCase().includes('caution');
          const isTip =
            block.text.toLowerCase().includes('tip:') ||
            block.text.toLowerCase().includes('best practice');

          if (isCritical) {
            return (
              <div
                key={`quote-${idx}`}
                className="my-6 p-4 sm:p-5 rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 text-slate-200 text-sm leading-relaxed shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">{renderInlineTokens(block.text)}</div>
                </div>
              </div>
            );
          }

          if (isTip) {
            return (
              <div
                key={`quote-${idx}`}
                className="my-6 p-4 sm:p-5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-500/10 text-slate-200 text-sm leading-relaxed shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">{renderInlineTokens(block.text)}</div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={`quote-${idx}`}
              className="my-6 p-4 sm:p-5 rounded-2xl border-l-4 border-electric-accent bg-electric-accent/10 text-slate-200 text-sm leading-relaxed shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-electric-300 shrink-0 mt-0.5" />
                <div className="flex-1">{renderInlineTokens(block.text)}</div>
              </div>
            </div>
          );
        }

        // Code Blocks with macOS dots, language pill & Copy button
        case 'code':
          return (
            <div
              key={`code-${idx}`}
              className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-navy-950/95 shadow-xl"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 uppercase text-electric-300 font-bold tracking-wider">
                    {block.lang}
                  </span>
                </div>
                <button
                  onClick={() => handleCopySnippet(block.code, `code-${idx}`)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-medium"
                >
                  {copiedCodeSnippet === `code-${idx}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-[13px] font-mono text-slate-200 overflow-x-auto leading-relaxed scrollbar-thin">
                <code>{block.code}</code>
              </pre>
            </div>
          );

        // Markdown Table: Fully styled HTML table with headers and alternating rows
        case 'table':
          return (
            <div
              key={`table-${idx}`}
              className="my-8 overflow-hidden rounded-2xl border border-slate-800 bg-navy-900/60 shadow-xl backdrop-blur-sm"
            >
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-200 uppercase tracking-wider font-mono text-[11px] sm:text-xs">
                    <tr>
                      {block.headers.map((cell, cIdx) => (
                        <th
                          key={cIdx}
                          className="px-5 py-3.5 font-bold text-tech-offwhite whitespace-nowrap"
                        >
                          {renderInlineTokens(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {block.rows.map((rowCells, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        {rowCells.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-5 py-3.5 text-slate-300 leading-normal"
                          >
                            {renderInlineTokens(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        // Horizontal Divider
        case 'hr':
          return <hr key={`hr-${idx}`} className="my-10 border-slate-800/80" />;

        // Standard Paragraph
        case 'p':
        default:
          return (
            <p
              key={`p-${idx}`}
              className="text-slate-300 text-sm sm:text-base leading-relaxed my-4"
            >
              {renderInlineTokens(block.text)}
            </p>
          );
      }
    });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 pt-24 pb-20 relative">
      {/* Top Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-electric-accent to-sky-400 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToPortfolio}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => onNavigateBlog()}
              className="hover:text-white transition-colors"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-electric-300 font-medium truncate max-w-[200px] sm:max-w-sm">
              {blog.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateBlog()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All 20 Guides</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-electric-accent/15 border border-electric-accent/30 text-electric-300 hover:bg-electric-accent/25 transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          {/* Category Pill & Read Time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-electric-accent text-white shadow-glow-sm">
              {blog.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-electric-300" />
              <span>{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Updated: {blog.updatedAt}</span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              ({blog.wordCount}+ words)
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-8 border-l-2 border-electric-accent pl-4">
            {blog.excerpt}
          </p>

          {/* Author Badge & Social Share */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-electric-accent/50 shadow-md"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{blog.author.name}</h4>
                <p className="text-xs text-slate-400">{blog.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Share:</span>
              <button
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                aria-label="Share on X Twitter"
                className="p-2 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-300 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Layout with Sticky Table of Contents on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <article className="lg:col-span-8 bg-navy-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-2xl backdrop-blur-sm">
            {renderContentBlocks(blog.content)}

            {/* Keyword Tags Footer */}
            <div className="mt-12 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-electric-300" />
                <span>Indexed Keywords & Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-navy-900 to-slate-900 border border-slate-800 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-electric-accent shadow-glow-electric shrink-0"
                />
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-electric-300">
                    Written by the Author
                  </span>
                  <h3 className="text-lg font-bold text-white">{blog.author.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Full Stack Developer specializing in React.js, PHP Laravel, Node.js, and high-performance system architectures.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        onBackToPortfolio();
                        setTimeout(() => {
                          const contactEl = document.getElementById('contact');
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-electric-accent text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-glow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Discuss a Project</span>
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            {blog.tableOfContents && blog.tableOfContents.length > 0 && (
              <div className="sticky top-28 p-5 rounded-2xl bg-navy-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800 text-sm font-bold text-white">
                  <BookOpen className="w-4 h-4 text-electric-300" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1.5 text-xs max-h-[50vh] overflow-y-auto pr-1">
                  {blog.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1 px-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors leading-snug truncate"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Hire / Consult CTA in Sidebar */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-electric-accent/10 border border-electric-accent/25 text-center">
                    <Sparkles className="w-5 h-5 text-electric-300 mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-white mb-1">Need this built in your app?</h4>
                    <p className="text-[11px] text-slate-300 mb-3">
                      Hire Md Rahmatullah Quraishi for full-stack engineering, performance audits, or architecture consulting.
                    </p>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        onBackToPortfolio();
                        setTimeout(() => {
                          const contactEl = document.getElementById('contact');
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-electric-accent text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-glow-electric"
                    >
                      <span>Get a Proposal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Technical Articles Section */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-electric-300">
                  Recommended Reads
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Related Architecture Guides
                </h3>
              </div>
              <button
                onClick={() => onNavigateBlog()}
                className="inline-flex items-center gap-1 text-xs font-bold text-electric-300 hover:text-white transition-colors"
              >
                <span>View all 20 guides</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateBlog(rel.slug)}
                  className="cursor-pointer group p-5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-electric-accent/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="font-semibold text-electric-300">{rel.category}</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-electric-300 transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-electric-300 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
