import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, UserCheck, ShieldAlert, Cpu } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/85 backdrop-blur-md"
        />

        <div className="min-h-full flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-navy-900 text-tech-offwhite rounded-2xl shadow-2xl border border-slate-800 overflow-hidden my-8"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-navy-950 text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-electric-accent/20 text-electric-300 border border-electric-accent/40">
                  {project.category}
                </span>
                <span className="text-xs text-tech-slate">Verified Project</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project modal"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto space-y-6">
              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-bold text-tech-offwhite">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-electric-400 mt-0.5">
                  {project.subtitle}
                </p>
                <p className="text-sm text-tech-slate mt-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-electric-accent" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Problem & Solution */}
              {project.problemSolution && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      The Challenge
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.problemSolution.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      The Solution
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.problemSolution.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Role & Contribution */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-electric-accent" />
                  My Role & Contribution
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-navy-950/80 p-4 rounded-xl border border-slate-800">
                  {project.roleContribution}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-electric-accent" />
                  Key Implementations
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer with action */}
            <div className="px-6 py-4 bg-navy-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-tech-slate">
                Official project from resume portfolio
              </span>
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-accent hover:bg-blue-600 text-white text-xs font-bold shadow-glow-electric transition-all hover:gap-3"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-200" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
