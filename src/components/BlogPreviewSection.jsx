import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { getFeaturedBlogs } from '../data/blogs';

export default function BlogPreviewSection({ onOpenBlogList, onSelectBlog }) {
  const featured = getFeaturedBlogs().slice(0, 3);

  return (
    <section id="blog-preview" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Insights & Deep Dives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Latest Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-electric-300">Architecture Guides</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Real-world engineering playbooks covering Laravel performance, React 19 server components, Node.js scaling, and payment gateway architectures.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenBlogList}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-electric-300 hover:text-white hover:border-electric-accent/50 hover:bg-slate-800/80 transition-all duration-300 shadow-sm text-xs font-bold uppercase tracking-wider group"
            >
              <span>Explore All 20 Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Featured 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onSelectBlog(post.slug)}
              className="cursor-pointer group flex flex-col justify-between p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-electric-accent/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold text-electric-300 px-2.5 py-0.5 rounded-md bg-electric-accent/15 border border-electric-accent/25">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <Clock className="w-3 h-3" />
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

              {/* Bottom Metadata & CTA */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{post.updatedAt}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-electric-300 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Pill */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBlogList}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white group transition-colors"
          >
            <span>Looking for MySQL, WebSockets, Docker, or AI guides?</span>
            <span className="text-electric-300 group-hover:underline">Browse the full library of 20 guides →</span>
          </button>
        </div>
      </div>
    </section>
  );
}

