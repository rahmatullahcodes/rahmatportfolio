import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  Terminal, 
  Sparkles, 
  CheckCircle, 
  Code2, 
  Briefcase,
  Layers,
  Camera
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const techBadges = [
  { name: 'React.js', color: 'text-sky-400 bg-sky-950/60 border-sky-800/60' },
  { name: 'Node.js', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' },
  { name: 'PHP', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' },
  { name: 'Laravel', color: 'text-red-400 bg-red-950/60 border-red-800/60' },
  { name: 'MySQL', color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' },
  { name: 'MongoDB', color: 'text-green-400 bg-green-950/60 border-green-800/60' },
  { name: 'REST APIs', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' },
  { name: 'Tailwind CSS', color: 'text-teal-400 bg-teal-950/60 border-teal-800/60' },
];

export default function Hero({ onOpenResume, onCopyEmail }) {
  const [customPhoto, setCustomPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 lg:pt-36 lg:pb-28 bg-navy-950 text-white overflow-hidden flex items-center"
    >
      {/* Background Subtle Geometric Grid & Radial Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-accent/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Branding, Title, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-300 text-xs shadow-inner"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-200">Available for Freelance & Project Inquiries</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-400 font-semibold">{personalInfo.experienceYears} Years Exp</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hi, I'm{' '}
                <span className="text-gradient-electric">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-sky-400 tracking-tight flex items-center gap-2">
                <span>{personalInfo.title}</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300 text-base sm:text-lg font-normal">Full Stack Engineer</span>
              </p>
            </motion.div>

            {/* Tagline & Supporting Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-lg sm:text-xl font-medium text-slate-200 leading-snug">
                "{personalInfo.tagline}"
              </p>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                {personalInfo.supportingStatement}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white text-sm font-bold shadow-glow-sm hover:shadow-glow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-sky-500/50 transition-all duration-200"
              >
                <span>Hire Me</span>
              </a>

              {/* Resume Button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium border border-slate-800 hover:border-slate-700 transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Resume</span>
              </button>
            </motion.div>

            {/* Social Links & Verified Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-2 text-slate-400"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Connect:
              </span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                onClick={onCopyEmail}
                aria-label="Copy Email Address"
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 transition-colors"
                title="Copy Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

          {/* Right Column: High-End Code Card & Professional Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>

            {/* Container Card */}
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-5 sm:p-6 backdrop-blur-xl">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">developer.profile.tsx</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Ready to Deploy
                </span>
              </div>

              {/* Portrait Presentation Area */}
              <div className="relative group rounded-xl overflow-hidden bg-gradient-to-b from-slate-800/80 to-navy-950 border border-slate-700/60 aspect-[4/3] flex flex-col items-center justify-center text-center p-6">
                
                {customPhoto ? (
                  <img
                    src={customPhoto}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {/* Stylized Developer SVG Avatar */}
                    <div className="relative mb-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-0.5 shadow-glow-md">
                        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                          <Code2 className="w-12 h-12 text-sky-400" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent pointer-events-none" />
                        </div>
                      </div>
                      <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-emerald-500 text-[10px] font-extrabold text-navy-950 uppercase tracking-wider shadow">
                        Active
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {personalInfo.name}
                    </h3>
                    <p className="text-xs text-sky-400 font-medium mt-0.5">
                      Full Stack Developer • 2+ Yrs Experience
                    </p>
                    <p className="text-[11px] text-slate-400 max-w-xs mt-2 leading-relaxed">
                      Specialized in React, Node.js, PHP, Laravel, and robust REST API systems.
                    </p>
                  </>
                )}

                {/* Optional Photo Replacement Button (for client to preview their photograph on the fly) */}
                <label className="absolute bottom-3 right-3 cursor-pointer p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md text-xs flex items-center gap-1.5 transition-all opacity-80 hover:opacity-100">
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[11px]">Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Terminal-inspired mini status snippet */}
              <div className="mt-5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    stack_environment: verified
                  </span>
                  <span>status: 200 OK</span>
                </div>
                <div className="text-slate-300 text-[11px] truncate">
                  <span className="text-sky-400">$</span> architecting scalable web solutions & APIs
                </div>
              </div>

              {/* Quick Experience Badge */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="text-lg font-bold text-white">2+ Years</div>
                  <div className="text-[11px] text-slate-400 font-medium">Production Experience</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="text-lg font-bold text-sky-400">Full Stack</div>
                  <div className="text-[11px] text-slate-400 font-medium">Web & Mobile Solutions</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Technology Stack Indicators / Marquee Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-800/60"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Core Technologies in Production:
            </span>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((tech) => (
                <span
                  key={tech.name}
                  className={`text-xs font-medium px-3 py-1 rounded-lg border backdrop-blur-sm transition-transform hover:-translate-y-0.5 ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

