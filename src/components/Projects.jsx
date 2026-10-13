import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Layers, 
  CheckCircle, 
  Info, 
  ArrowUpRight, 
  Globe, 
  Code2, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Copy, 
  Check 
} from 'lucide-react';
import TiltCard from './TiltCard';
import { projects } from '../data/portfolioData';

export default function Projects({ onOpenProjectModal }) {
  const [filter, setFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'react') return project.technologies.some(t => t.includes('React'));
    if (filter === 'php') return project.technologies.some(t => t.includes('PHP'));
    if (filter === 'fullstack') return project.technologies.some(t => t.includes('React') || t.includes('Node') || t.includes('REST'));
    return true;
  });

  const handleCopyUrl = (e, project) => {
    e.stopPropagation();
    navigator.clipboard.writeText(project.websiteUrl);
    setCopiedId(project.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="projects" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Soft Electric Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-electric-accent/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse"></span>
              Featured Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
              Production platforms & client web applications.
            </h2>
            <p className="mt-3 text-base text-tech-slate">
              Verified projects from my resume featuring live URLs, authentic architectures, and my direct engineering contributions.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-navy-900 border border-slate-800">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'fullstack', label: 'Full Stack & APIs' },
              { id: 'react', label: 'React.js' },
              { id: 'php', label: 'PHP & MySQL' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === tab.id ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="projectActiveFilter"
                    className="absolute inset-0 bg-electric-accent rounded-lg shadow-glow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with 3D TiltCards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <TiltCard
                  maxTilt={5}
                  glowColor="rgba(37, 99, 235, 0.22)"
                  className="group flex flex-col justify-between h-full rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-electric-accent hover:shadow-card-hover transition-all duration-300 overflow-hidden shadow-card-dark"
                >
                  {/* Visual Browser Mockup Header */}
                  <div className="relative bg-navy-950 p-5 text-white border-b border-slate-800">
                    {/* Browser Bar Controls */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pb-3 border-b border-slate-800/90 mb-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                        </div>
                        
                        {/* URL Pill with Copy */}
                        <div className="ml-1 sm:ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 min-w-0">
                          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate max-w-[120px] sm:max-w-xs">
                            {project.websiteUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                          </span>
                          <button
                            onClick={(e) => handleCopyUrl(e, project)}
                            title="Copy project URL"
                            className="text-slate-400 hover:text-white p-0.5 ml-0.5 transition-colors shrink-0"
                          >
                            {copiedId === project.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Verified Live
                      </span>
                    </div>

                    {/* Browser Viewport Artwork with Hover Zoom */}
                    <div className={`relative h-44 sm:h-52 rounded-xl bg-gradient-to-br ${project.accentColor} p-6 flex flex-col justify-between overflow-hidden shadow-inner group-hover:shadow-glow-electric transition-all duration-500`}>
                      {/* Abstract background shapes */}
                      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-44 h-44 bg-black/20 rounded-full blur-xl pointer-events-none" />

                      {/* Top pill inside mockup */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/40 text-white backdrop-blur-md border border-white/20">
                          {project.category}
                        </span>
                        <div className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white group-hover:rotate-12 transition-transform duration-300">
                          <Code2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Content preview title */}
                      <div className="relative z-10 text-white space-y-1">
                        <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                          {project.title}
                        </h4>
                        <p className="text-xs font-medium text-white/90 drop-shadow-sm line-clamp-2 max-w-md">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Watermark badge */}
                      <div className="absolute -bottom-4 -right-4 text-white/10 text-7xl font-black select-none pointer-events-none font-mono group-hover:scale-110 transition-transform duration-500">
                        RQ
                      </div>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      {/* Project Title & Subtitle */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs font-semibold text-tech-slate">
                            {project.subtitle}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-tech-slate mt-2 leading-relaxed">
                          {project.overview}
                        </p>
                      </div>

                      {/* My Role & Contribution Highlight */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed shadow-sm group-hover:border-electric-accent/50 transition-colors">
                        <strong className="text-tech-offwhite block mb-1">My Role & Architecture:</strong>
                        {project.roleContribution}
                      </div>

                      {/* Technology Tags */}
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Tech Stack:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:border-electric-accent hover:text-white transition-colors shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-electric-300 transition-colors p-1"
                      >
                        <Info className="w-3.5 h-3.5 text-electric-accent" />
                        <span>Architecture Details</span>
                      </button>

                      <motion.a
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shine-button inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric-accent hover:bg-blue-600 text-white text-xs font-bold shadow-glow-electric transition-all group/link"
                      >
                        <span>Visit Live Website</span>
                        <ExternalLink className="w-3.5 h-3.5 text-sky-200 group-link:translate-x-0.5 group-link:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Note on Verification */}
        <div className="mt-12 text-center text-xs text-tech-slate flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>All {projects.length} listed platforms are active production websites from Md Rahmatullah Quraishi's portfolio.</span>
        </div>

      </div>
    </section>
  );
}
