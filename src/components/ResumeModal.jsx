import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, ExternalLink, Calendar, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { personalInfo, workExperience, education, skillCategories } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <div className="min-h-full flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
          >
            {/* Modal Controls Toolbar (Hidden when printing) */}
            <div className="print:hidden flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-sm">Resume Preview — {personalInfo.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-electric-accent hover:bg-blue-600 text-white text-xs font-semibold shadow-glow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Resume Content */}
            <div className="p-8 md:p-12 print:p-0 max-h-[80vh] print:max-h-none overflow-y-auto">
              {/* Header */}
              <div className="border-b border-slate-200 pb-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-sky-400/30 shadow-md shrink-0">
                      <img
                        src={personalInfo.avatarUrl}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {personalInfo.name}
                      </h1>
                      <p className="text-base font-semibold text-sky-600 mt-0.5">
                        {personalInfo.title}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-md">
                        {personalInfo.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                      <a href={`mailto:${personalInfo.email}`} className="hover:text-sky-600">
                        {personalInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                      <a href={`tel:${personalInfo.phoneRaw}`} className="hover:text-sky-600">
                        {personalInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-sky-600 shrink-0" />
                      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">
                        linkedin.com/in/md-rahmatullah
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-sky-600 shrink-0" />
                      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">
                        github.com/rahmatullahcodes
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-sky-600 shrink-0" />
                      <a href={personalInfo.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">
                        youtube.com/@TechnicalGuddu01
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  Professional Summary
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Full Stack Developer with 2+ years of production experience designing and deploying scalable web applications, REST APIs, and responsive digital products. Strong command over modern JavaScript (React.js, Node.js, Express) and PHP (Laravel, CodeIgniter) ecosystems, paired with database schema design and optimization in MySQL and MongoDB.
                </p>
              </div>

              {/* Work Experience */}
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-600" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {workExperience.map((exp, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900">
                          {exp.role} <span className="text-sky-600 font-medium">@ {exp.company}</span>
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600 mt-1 sm:mt-0 w-fit">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx}>{resp}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-sky-600" />
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skillCategories.map((cat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-900 mb-1.5">{cat.title}</h4>
                      <p className="text-xs text-slate-600 leading-normal">
                        {cat.skills.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                        <p className="text-xs text-slate-600">{edu.institution} — {edu.program}</p>
                      </div>
                      <span className="text-xs font-semibold text-sky-600 mt-1 sm:mt-0">
                        {edu.completionYear}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer (Hidden when printing) */}
            <div className="print:hidden px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Close Preview
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Print or Save as PDF
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}


