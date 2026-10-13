import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Tag,
  Filter,
  CheckCircle2,
  Code2,
  ChevronRight
} from 'lucide-react';
import { allBlogs, categories, filterBlogs, getFeaturedBlogs } from '../data/blogs';
import { personalInfo } from '../data/portfolioData';

export default function BlogList({ onSelectBlog, onBackToPortfolio }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamic SEO Metadata for Blog Directory
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Full Stack Engineering Blog & Architecture Guides | Md Rahmatullah Quraishi";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        '20 comprehensive technical guides on PHP Laravel, React.js, Node.js, MySQL, Docker, WebSockets, and System Architecture by Md Rahmatullah Quraishi.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonical ? canonical.getAttribute('href') : '';
    if (canonical) {
      canonical.setAttribute('href', 'https://rahmatportfolio.vercel.app/blog');
    }

    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      if (canonical && originalCanonical) canonical.setAttribute('href', originalCanonical);
    };
  }, []);

  const filteredBlogs = useMemo(() => {
    return filterBlogs({ search: searchTerm, category: selectedCategory });
  }, [searchTerm, selectedCategory]);

  const featuredList = useMemo(() => getFeaturedBlogs(), []);
  const flagshipBlog = featuredList[0] || allBlogs[0];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 pt-24 pb-20 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-electric-accent/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToPortfolio}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-electric-300 font-semibold">Engineering Blog (20 Guides)</span>
          </div>

          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Engineering Playbooks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Full Stack Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-electric-300">Masterclasses</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            In-depth technical guides, production case studies, and performance optimization blueprints covering PHP Laravel, React 19, Node.js backends, MySQL indexing, and Cloud DevOps.
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-electric-300" />
              <span>20 Technical Guides</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Production Code Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>100% Free & Open Access</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-5">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 20 guides by keyword (e.g. Laravel, React, Redis, Indexing, Docker, WebSockets)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-navy-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-accent focus:ring-2 focus:ring-electric-accent/20 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1 hidden sm:block" />
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-electric-accent text-white shadow-glow-sm border border-electric-accent font-bold'
                      : 'bg-navy-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flagship Article Hero Card (Visible when no active search/category filter) */}
        {!searchTerm && selectedCategory === 'All' && flagshipBlog && (
          <div className="mb-14">
            <div className="p-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-electric-accent/40 to-sky-500/30 shadow-2xl">
              <div
                onClick={() => onSelectBlog(flagshipBlog.slug)}
                className="cursor-pointer group p-6 sm:p-8 rounded-[22px] bg-navy-900/95 hover:bg-navy-900 border border-slate-800/80 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-electric-accent text-white text-[11px] font-extrabold uppercase tracking-wider shadow-glow-sm">
                      ⭐ Flagship Guide
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {flagshipBlog.category}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">
                      {flagshipBlog.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-electric-300 transition-colors">
                    {flagshipBlog.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {flagshipBlog.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {flagshipBlog.keywords.slice(0, 4).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-electric-accent text-white font-bold text-xs uppercase tracking-wider group-hover:bg-blue-600 transition-all shadow-glow-electric">
                    <span>Read Flagship Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredBlogs.length}</strong> of{' '}
            <strong className="text-white">{allBlogs.length}</strong> guides
          </span>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-electric-300 hover:text-white font-semibold underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                onClick={() => onSelectBlog(post.slug)}
                className="cursor-pointer group flex flex-col justify-between p-6 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-electric-accent/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-bold text-electric-300 px-2 py-0.5 rounded-md bg-electric-accent/10 border border-electric-accent/20">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-electric-300 transition-colors line-clamp-2 mb-3 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Metadata & CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{post.updatedAt}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-bold text-electric-300 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 rounded-3xl bg-navy-900/40 border border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No guides matched your search</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              Try searching for "Laravel", "React", "Node", "MySQL", "Docker", or "SEO" to explore technical topics.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-electric-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-all shadow-glow-sm"
            >
              Show All 20 Guides
            </button>
          </div>
        )}

        {/* Bottom Callout: Technical Consulting Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 border border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Need Custom Architecture or Full-Stack Engineering?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              I partner with businesses and startups to design scalable web backends, responsive React frontends, high-speed database schemas, and automated CI/CD pipelines.
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-all shadow-glow-electric"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
