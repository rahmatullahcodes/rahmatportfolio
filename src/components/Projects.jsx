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
  Sparkles
} from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function Projects({ onOpenProjectModal }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'react') return project.technologies.some(t => t.includes('React'));
    if (filter === 'php') return project.technologies.some(t => t.includes('PHP'));
    if (filter === 'fullstack') return project.technologies.some(t => t.includes('React') || t.includes('Node') || t.includes('REST'));
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              Featured Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Production platforms & client web applications.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Verified projects from my resume featuring live URLs, authentic architectures, and my direct engineering contributions.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'fullstack', label: 'Full Stack & APIs' },
              { id: 'react', label: 'React.js' },
              { id: 'php', label: 'PHP & MySQL' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
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
                className="group flex flex-col justify-between rounded-2xl bg-surface-50 border border-slate-200 hover:border-sky-300 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                {/* Visual Browser Mockup Header */}
                <div className="relative bg-slate-900 p-5 text-white border-b border-slate-800">
                  {/* Browser Bar Controls */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/90 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                      <span className="ml-2 text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                        {project.websiteUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Verified Live
                    </span>
                  </div>

                  {/* Browser Viewport Artwork */}
                  <div className={`relative h-44 sm:h-52 rounded-xl bg-gradient-to-br ${project.accentColor} p-6 flex flex-col justify-between overflow-hidden shadow-inner`}>
                    {/* Abstract background shapes */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 bg-black/20 rounded-full blur-xl pointer-events-none" />

                    {/* Top pill inside mockup */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-black/30 text-white backdrop-blur-sm border border-white/15">
                        {project.category}
                      </span>
                      <div className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 text-white">
                        <Code2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content preview title */}
                    <div className="relative z-10 text-white space-y-1">
                      <h4 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
                        {project.title}
                      </h4>
                      <p className="text-xs font-medium text-white/90 drop-shadow-sm line-clamp-2 max-w-md">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Watermark badge */}
                    <div className="absolute -bottom-4 -right-4 text-white/10 text-7xl font-extrabold select-none pointer-events-none font-mono">
                      RQ
                    </div>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Project Title & Subtitle */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-medium text-slate-500">
                          {project.subtitle}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {project.overview}
                      </p>
                    </div>

                    {/* My Role & Contribution Highlight */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-1">My Role & Architecture:</strong>
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
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenProjectModal(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-sky-500" />
                      <span>Architecture Details</span>
                    </button>

                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Note on Verification */}
        <div className="mt-12 text-center text-xs text-slate-500">
          All 5 listed platforms are active or production projects from Md Rahmatullah Quraishi's resume.
        </div>

      </div>
    </section>
  );
}

