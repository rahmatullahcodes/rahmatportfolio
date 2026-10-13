import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Check, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap,
  Youtube,
  Phone,
  MessageSquare
} from 'lucide-react';
import TiltCard from './TiltCard';
import TechWorkspaceShowcase from './TechWorkspaceShowcase';
import { personalInfo } from '../data/portfolioData';

const rotatingTitles = [
  "Full Stack Developer",
  "React.js & Node.js Specialist",
  "PHP & Laravel Architect",
  "REST API & Cloud Engineer"
];

const techBadges = [
  { name: 'React.js', icon: '⚛️', color: 'text-sky-400 bg-sky-950/70 border-sky-700/60 shadow-sky-500/10' },
  { name: 'Node.js', icon: '🟢', color: 'text-emerald-400 bg-emerald-950/70 border-emerald-700/60 shadow-emerald-500/10' },
  { name: 'PHP', icon: '🐘', color: 'text-indigo-400 bg-indigo-950/70 border-indigo-700/60 shadow-indigo-500/10' },
  { name: 'Laravel', icon: '🔥', color: 'text-red-400 bg-red-950/70 border-red-700/60 shadow-red-500/10' },
  { name: 'CodeIgniter', icon: '⚡', color: 'text-orange-400 bg-orange-950/70 border-orange-700/60 shadow-orange-500/10' },
  { name: 'MySQL', icon: '🐬', color: 'text-amber-400 bg-amber-950/70 border-amber-700/60 shadow-amber-500/10' },
  { name: 'MongoDB', icon: '🍃', color: 'text-green-400 bg-green-950/70 border-green-700/60 shadow-green-500/10' },
  { name: 'REST APIs', icon: '🔌', color: 'text-cyan-400 bg-cyan-950/70 border-cyan-700/60 shadow-cyan-500/10' },
  { name: 'JWT Auth', icon: '🔐', color: 'text-yellow-400 bg-yellow-950/70 border-yellow-700/60 shadow-yellow-500/10' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'text-teal-400 bg-teal-950/70 border-teal-700/60 shadow-teal-500/10' },
  { name: 'Bootstrap', icon: '🅱️', color: 'text-purple-400 bg-purple-950/70 border-purple-700/60 shadow-purple-500/10' },
  { name: 'JavaScript ES6+', icon: '💛', color: 'text-yellow-300 bg-yellow-950/70 border-yellow-700/60 shadow-yellow-500/10' },
  { name: 'Git & GitHub', icon: '🐙', color: 'text-slate-200 bg-slate-900/80 border-slate-700/70 shadow-slate-500/10' },
  { name: 'Linux & VPS', icon: '🐧', color: 'text-blue-400 bg-blue-950/70 border-blue-700/60 shadow-blue-500/10' },
  { name: 'cPanel Hosting', icon: '🖥️', color: 'text-orange-300 bg-orange-950/70 border-orange-700/60 shadow-orange-500/10' },
  { name: 'Technical SEO', icon: '📈', color: 'text-emerald-400 bg-emerald-950/70 border-emerald-700/60 shadow-emerald-500/10' },
  { name: 'Flutter', icon: '📱', color: 'text-sky-300 bg-sky-950/70 border-sky-700/60 shadow-sky-500/10' },
  { name: 'Express.js', icon: '🚀', color: 'text-violet-400 bg-violet-950/70 border-violet-700/60 shadow-violet-500/10' }
];

const statusMessages = [
  "Available for Immediate Projects",
  "Average Response Time < 2 Hours",
  "100% On-Time Delivery Guarantee",
  "Open for Freelance & Contracts"
];

export default function Hero({ onOpenResume, onCopyEmail }) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx(prev => (prev + 1) % rotatingTitles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % statusMessages.length);
    }, 3200);
    return () => clearInterval(statusTimer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[96vh] pt-32 pb-20 lg:pt-36 lg:pb-28 bg-navy-950 text-white overflow-hidden flex items-center"
    >
      {/* Background Animated Gradient Blobs & Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-electric-accent/15 rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Branding, Title, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Dynamic Animated Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-electric-accent/80 shadow-inner backdrop-blur-md transition-colors group cursor-default"
            >
              {/* Electric/Emerald Radar Beacon */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-accent"></span>
              </span>

              {/* Dynamic Sliding Status Message */}
              <div className="relative overflow-hidden inline-flex h-4 items-center min-w-[210px] sm:min-w-[230px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusIdx}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-xs font-semibold text-tech-offwhite whitespace-nowrap"
                  >
                    {statusMessages[statusIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="text-slate-600 hidden xs:inline">•</span>
              <span className="text-electric-300 text-xs font-bold shrink-0 hidden xs:inline">
                {personalInfo.experienceYears} Yrs Exp
              </span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-tech-offwhite leading-[1.12]">
                Hi, I'm{' '}
                <span className="text-gradient-electric inline-block">
                  {personalInfo.name}
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tracking-tight min-h-[36px]">
                <div className="relative overflow-hidden inline-flex">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleIdx}
                      initial={{ y: 22, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -22, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="text-electric-400 font-bold"
                    >
                      {rotatingTitles[titleIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-slate-600 font-light">/</span>
                <span className="text-slate-300 font-medium text-lg sm:text-xl">Creative Engineer</span>
              </div>
            </motion.div>

            {/* Tagline & Supporting Statement */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-lg sm:text-xl font-semibold text-tech-offwhite leading-snug">
                "{personalInfo.tagline}"
              </p>
              <p className="text-sm sm:text-base text-tech-slate max-w-2xl leading-relaxed">
                {personalInfo.supportingStatement}
              </p>
            </motion.div>

            {/* Action Buttons with Interactive Magnetic Hover */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA with Shine Effect */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="shine-button inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-electric-accent hover:bg-blue-600 text-white text-sm font-bold shadow-glow-electric hover:shadow-glow-electric-lg transition-all duration-200 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-electric-accent hover:shadow-glow-electric transition-all duration-200"
              >
                <span>Hire Me</span>
              </motion.a>

              {/* Resume Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium border border-slate-800 hover:border-slate-700 transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-electric-300" />
                <span>Resume</span>
              </motion.button>
            </motion.div>

            {/* Social Links & Verified Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-2 text-slate-400"
            >
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Connect:
              </span>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-electric-accent/20 text-slate-400 hover:text-electric-300 border border-slate-800 hover:border-electric-accent/50 transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-electric-accent/20 text-slate-400 hover:text-electric-300 border border-slate-800 hover:border-electric-accent/50 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel - Technical Guddu"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/50 transition-all shadow-sm"
                title="YouTube Channel (@TechnicalGuddu01)"
              >
                <Youtube className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-sm"
                title="WhatsApp: +91 8969361100"
              >
                <MessageSquare className="w-4 h-4" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCopyEmail}
                aria-label="Copy Email Address"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-electric-accent/20 text-slate-400 hover:text-electric-300 border border-slate-800 hover:border-electric-accent/50 transition-all shadow-sm"
                title="Copy Email"
              >
                <Mail className="w-4 h-4" />
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column: Interactive Tech Workspace Studio (Code, Dashboard, Mobile, AI, Photo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <TechWorkspaceShowcase />
          </motion.div>

        </div>

        {/* Interactive Infinite Scrolling Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-800/60"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </span>
              <div>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-200 block">
                  Technologies Engineered In Production
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Verified tools used across live applications
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-sky-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Continuous Stream • Hover to pause</span>
            </div>
          </div>

          {/* Marquee Wrapper with Masked Edge Gradients */}
          <div className="space-y-3.5 marquee-mask py-1">
            {/* Track 1: Scrolling Left */}
            <div className="relative overflow-hidden w-full py-1">
              <div className="flex gap-3 w-max animate-marquee-infinite">
                {[...techBadges, ...techBadges, ...techBadges].map((tech, idx) => (
                  <div
                    key={`track1-${idx}`}
                    className={`inline-flex items-center gap-2.5 text-xs font-semibold px-4 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1.5 shadow-sm cursor-default hover:shadow-glow-sm ${tech.color}`}
                  >
                    <span className="text-base select-none">{tech.icon}</span>
                    <span className="tracking-wide font-medium whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Track 2: Scrolling Right (Reverse) */}
            <div className="relative overflow-hidden w-full py-1">
              <div className="flex gap-3 w-max animate-marquee-reverse">
                {[...[...techBadges].reverse(), ...[...techBadges].reverse(), ...[...techBadges].reverse()].map((tech, idx) => (
                  <div
                    key={`track2-${idx}`}
                    className={`inline-flex items-center gap-2.5 text-xs font-semibold px-4 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1.5 shadow-sm cursor-default hover:shadow-glow-sm ${tech.color}`}
                  >
                    <span className="text-base select-none">{tech.icon}</span>
                    <span className="tracking-wide font-medium whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

