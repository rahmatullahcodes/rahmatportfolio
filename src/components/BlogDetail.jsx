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
  MessageSquare
} from 'lucide-react';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogs';
import { personalInfo } from '../data/portfolioData';

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

  // Simple Markdown-style section parser
  const renderFormattedContent = (rawText) => {
    const lines = rawText.split('\n');
    const elements = [];
    let currentCodeBlock = null;
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code block start
      if (line.startsWith('```')) {
        if (currentCodeBlock === null) {
          codeLanguage = line.replace('```', '').trim() || 'code';
          currentCodeBlock = [];
        } else {
          // Code block end
          const codeString = currentCodeBlock.join('\n');
          const codeKey = `code-${index}`;
          elements.push(
            <div key={codeKey} className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-navy-950/95 shadow-xl">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="uppercase text-electric-300 font-bold">{codeLanguage}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(codeString);
                    setCopiedCodeSnippet(codeKey);
                    setTimeout(() => setCopiedCodeSnippet(null), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  {copiedCodeSnippet === codeKey ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          currentCodeBlock = null;
          codeLanguage = '';
        }
        return;
      }

      if (currentCodeBlock !== null) {
        currentCodeBlock.push(line);
        return;
      }

      // H2 Headings
      if (line.startsWith('## ')) {
        const titleText = line.replace('## ', '');
        const headingId = titleText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        elements.push(
          <h2
            key={`h2-${index}`}
            id={headingId}
            className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-slate-800/80 flex items-center gap-2 group scroll-mt-24"
          >
            <span className="text-electric-accent">#</span>
            <span>{titleText}</span>
          </h2>
        );
        return;
      }

      // H3 Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg sm:text-xl font-bold text-slate-200 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Blockquotes & Callouts
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${index}`} className="my-4 p-4 rounded-xl border-l-4 border-electric-accent bg-electric-accent/10 text-slate-300 text-sm italic">
            {line.replace('> ', '')}
          </blockquote>
        );
        return;
      }

      // Tables (simple markdown parser)
      if (line.startsWith('|')) {
        // Table lines are grouped in raw markdown, rendered cleanly
        elements.push(
          <div key={`table-line-${index}`} className="font-mono text-xs text-slate-300 overflow-x-auto my-0.5">
            {line}
          </div>
        );
        return;
      }

      // Horizontal dividers
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-8 border-slate-800" />);
        return;
      }

      // Bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={`li-${index}`} className="ml-6 list-disc text-slate-300 text-sm sm:text-base my-1 leading-relaxed">
            {line.substring(2)}
          </li>
        );
        return;
      }

      // Standard paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${index}`} className="text-slate-300 text-sm sm:text-base leading-relaxed my-3">
            {line}
          </p>
        );
      }
    });

    return elements;
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
            {renderFormattedContent(blog.content)}

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
