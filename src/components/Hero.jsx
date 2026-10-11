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
  Check, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap,
  Youtube
} from 'lucide-react';
import TiltCard from './TiltCard';
import { personalInfo } from '../data/portfolioData';

const techBadges = [
  { name: 'React.js', icon: '⚛️', color: 'text-sky-400 bg-sky-950/70 border-sky-700/60 shadow-sky-500/10' },
  { name: 'Node.js', icon: '🟢', color: 'text-emerald-400 bg-emerald-950/70 border-emerald-700/60 shadow-emerald-500/10' },
  { name: 'PHP', icon: '🐘', color: 'text-indigo-400 bg-indigo-950/70 border-indigo-700/60 shadow-indigo-500/10' },
  { name: 'Laravel', icon: '🔥', color: 'text-red-400 bg-red-950/70 border-red-700/60 shadow-red-500/10' },
  { name: 'MySQL', icon: '🐬', color: 'text-amber-400 bg-amber-950/70 border-amber-700/60 shadow-amber-500/10' },
  { name: 'MongoDB', icon: '🍃', color: 'text-green-400 bg-green-950/70 border-green-700/60 shadow-green-500/10' },
  { name: 'REST APIs', icon: '⚡', color: 'text-cyan-400 bg-cyan-950/70 border-cyan-700/60 shadow-cyan-500/10' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'text-teal-400 bg-teal-950/70 border-teal-700/60 shadow-teal-500/10' },
  { name: 'Flutter', icon: '📱', color: 'text-blue-400 bg-blue-950/70 border-blue-700/60 shadow-blue-500/10' },
  { name: 'Express.js', icon: '🚀', color: 'text-purple-400 bg-purple-950/70 border-purple-700/60 shadow-purple-500/10' },
];

export default function Hero({ onOpenResume, onCopyEmail }) {
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
            
            {/* Pulsing Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs shadow-inner hover:border-sky-500/60 transition-colors group cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-200">Open for Freelance & Full-Stack Contracts</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-400 font-bold group-hover:text-sky-300 transition-colors">{personalInfo.experienceYears} Years Exp</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hi, I'm{' '}
                <span className="text-gradient-electric inline-block">
                  {personalInfo.name}
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-sky-400">{personalInfo.title}</span>
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
              <p className="text-lg sm:text-xl font-semibold text-slate-100 leading-snug">
                "{personalInfo.tagline}"
              </p>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
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
                className="shine-button inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white text-sm font-bold shadow-glow-sm hover:shadow-glow-md transition-all duration-200 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-sky-400 hover:shadow-glow-sm transition-all duration-200"
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
                <FileText className="w-4 h-4 text-sky-400" />
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
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/50 transition-all shadow-sm"
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
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/50 transition-all shadow-sm"
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
              <motion.button
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCopyEmail}
                aria-label="Copy Email Address"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/50 transition-all shadow-sm"
                title="Copy Email"
              >
                <Mail className="w-4 h-4" />
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column: 3D Tilt Portrait Card with Real Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Back Glow & Pulse */}
            <div className="absolute -inset-3 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 rounded-3xl blur-2xl opacity-30 hover:opacity-45 transition duration-700 animate-pulse-subtle pointer-events-none"></div>

            {/* Floating Achievement Pill (Top Right) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-3 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/95 border border-sky-400/50 text-white text-xs font-bold shadow-glow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-spin-slow" />
              <span>Full Stack Verified</span>
            </motion.div>

            {/* Floating Achievement Pill (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-4 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/95 border border-slate-700/90 text-white text-xs font-bold shadow-2xl backdrop-blur-md"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>React • Node • PHP • MySQL</span>
            </motion.div>

            {/* Main Executive 3D Tilt Portrait Container */}
            <TiltCard
              maxTilt={7}
              glowColor="rgba(56, 189, 248, 0.2)"
              className="rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl p-4 sm:p-5 backdrop-blur-xl"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">rahmatullah-quraishi.profile</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-mono text-sky-400 font-bold">200 OK</span>
                </div>
              </div>

              {/* Professional Photograph Card */}
              <div className="relative group rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950 border-2 border-sky-500/30 group-hover:border-sky-400 transition-all duration-500 shadow-inner">
                {/* Real Photograph with Proper Top-Center Crop */}
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle vignette overlay at top and bottom for visual depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge: Available for Hire */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open for Projects</span>
                </div>

                {/* Bottom Overlay Card with Name, Title & Experience */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 p-3.5 rounded-xl bg-slate-900/92 backdrop-blur-md border border-slate-800 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                        {personalInfo.name}
                      </h3>
                      <p className="text-xs font-bold text-sky-400">
                        {personalInfo.title}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-sm">
                      2+ Yrs
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Pills */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/70 transition-all">
                  <div className="text-base font-extrabold text-white">2+ Years</div>
                  <div className="text-[11px] text-slate-400 font-medium">Production Experience</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/70 transition-all">
                  <div className="text-base font-extrabold text-sky-400">Dual-Stack</div>
                  <div className="text-[11px] text-slate-400 font-medium">React.js & PHP/Laravel</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* Interactive Infinite Scrolling Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-800/60"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Technologies Engineered In Production:
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Hover over any tool to pause
            </span>
          </div>

          {/* Marquee Wrapper with Edge Fade Gradients */}
          <div className="relative overflow-hidden w-full py-2 group marquee-container">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-3.5 w-max animate-marquee marquee-content">
              {[...techBadges, ...techBadges].map((tech, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm cursor-default ${tech.color}`}
                >
                  <span className="text-base">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
