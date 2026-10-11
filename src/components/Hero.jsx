import React, { useState } from 'react';
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
  Camera,
  Play,
  Copy,
  Check,
  Cpu,
  Flame,
  Globe
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const techBadges = [
  { name: 'React.js', icon: '⚛️', color: 'text-sky-400 bg-sky-950/60 border-sky-700/60 shadow-sky-500/10' },
  { name: 'Node.js', icon: '🟢', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-700/60 shadow-emerald-500/10' },
  { name: 'PHP', icon: '🐘', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-700/60 shadow-indigo-500/10' },
  { name: 'Laravel', icon: '🔥', color: 'text-red-400 bg-red-950/60 border-red-700/60 shadow-red-500/10' },
  { name: 'MySQL', icon: '🐬', color: 'text-amber-400 bg-amber-950/60 border-amber-700/60 shadow-amber-500/10' },
  { name: 'MongoDB', icon: '🍃', color: 'text-green-400 bg-green-950/60 border-green-700/60 shadow-green-500/10' },
  { name: 'REST APIs', icon: '⚡', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-700/60 shadow-cyan-500/10' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'text-teal-400 bg-teal-950/60 border-teal-700/60 shadow-teal-500/10' },
  { name: 'Flutter', icon: '📱', color: 'text-blue-400 bg-blue-950/60 border-blue-700/60 shadow-blue-500/10' },
  { name: 'Express.js', icon: '🚀', color: 'text-purple-400 bg-purple-950/60 border-purple-700/60 shadow-purple-500/10' },
];

export default function Hero({ onOpenResume, onCopyEmail }) {
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'profile' | 'terminal'
  const [customPhoto, setCustomPhoto] = useState(null);
  const [terminalCmd, setTerminalCmd] = useState('status');

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
      setActiveTab('profile');
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] pt-32 pb-20 lg:pt-36 lg:pb-28 bg-navy-950 text-white overflow-hidden flex items-center"
    >
      {/* Background Animated Gradient Blobs & Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-electric-accent/15 rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
              <span className="font-semibold text-slate-200">Open for Freelance & Project Contracts</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-400 font-bold group-hover:text-sky-300 transition-colors">{personalInfo.experienceYears} Years Exp</span>
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
              initial={{ opacity: 0, y: 20 }}
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

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA with Shine Effect */}
              <a
                href="#projects"
                className="shine-button inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white text-sm font-bold shadow-glow-sm hover:shadow-glow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700/80 hover:border-sky-400 hover:shadow-glow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Hire Me</span>
              </a>

              {/* Resume Button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium border border-slate-800 hover:border-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Resume</span>
              </button>
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
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                onClick={onCopyEmail}
                aria-label="Copy Email Address"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-slate-800 hover:border-sky-500/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                title="Copy Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

          {/* Right Column: Interactive Code & Terminal & Portrait Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Back Glow & Pulse */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 rounded-3xl blur-2xl opacity-25 hover:opacity-40 transition duration-700 animate-pulse-subtle"></div>

            {/* Floating Achievement Pill (Top Right) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-sky-500/40 text-white text-xs font-semibold shadow-glow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Production Tested (2+ Yrs)</span>
            </motion.div>

            {/* Floating Achievement Pill (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-slate-700/80 text-white text-xs font-semibold shadow-xl backdrop-blur-md"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>React • Node • PHP • MySQL</span>
            </motion.div>

            {/* Container Card */}
            <div className="relative rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-5 sm:p-6 backdrop-blur-xl">
              
              {/* Window Header with Interactive Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90"></div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'code' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    profile.ts
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'terminal' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    terminal.sh
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'profile' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    avatar.view
                  </button>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              <div className="min-h-[290px] flex flex-col justify-between">
                {activeTab === 'code' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto"
                  >
                    <div className="text-slate-500">// Senior Full Stack Engineer Configuration</div>
                    <div>
                      <span className="text-purple-400">export const</span>{' '}
                      <span className="text-sky-400">engineer</span> = &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">name:</span>{' '}
                      <span className="text-emerald-300">"{personalInfo.name}"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">title:</span>{' '}
                      <span className="text-emerald-300">"Full Stack Developer"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">experience:</span>{' '}
                      <span className="text-amber-300">"{personalInfo.experienceYears} Years"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">coreStacks:</span> [
                      <span className="text-sky-300">"React"</span>,{' '}
                      <span className="text-emerald-300">"Node"</span>,{' '}
                      <span className="text-red-300">"PHP"</span>,{' '}
                      <span className="text-amber-300">"MySQL"</span>
                      ],
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">availability:</span>{' '}
                      <span className="text-cyan-400">"Immediate / Project-Based"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">buildReliability:</span>{' '}
                      <span className="text-emerald-400">true</span>
                    </div>
                    <div>&#125;;</div>
                  </motion.div>
                )}

                {activeTab === 'terminal' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-3"
                  >
                    <div className="text-slate-500 text-[11px] flex items-center justify-between">
                      <span>zsh — 80x24</span>
                      <span className="text-emerald-400">● live</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-slate-400">
                        <span className="text-emerald-400">rahmatullah@dev</span>:<span className="text-sky-400">~</span>$ curl -s api.rahmatullah.dev/{terminalCmd}
                      </div>

                      {terminalCmd === 'status' && (
                        <div className="p-2.5 rounded bg-slate-900/80 text-emerald-300 text-[11px] space-y-0.5">
                          <div>&#123;</div>
                          <div className="pl-3">"status": 200,</div>
                          <div className="pl-3">"engineer": "Md Rahmatullah Quraishi",</div>
                          <div className="pl-3">"currentRole": "Full Stack Developer @ Zynextro",</div>
                          <div className="pl-3">"verifiedProjects": 5</div>
                          <div>&#125;</div>
                        </div>
                      )}

                      {terminalCmd === 'stack' && (
                        <div className="p-2.5 rounded bg-slate-900/80 text-sky-300 text-[11px] space-y-0.5">
                          <div>Frontend: React.js, Tailwind, Bootstrap, HTML5/CSS3</div>
                          <div>Backend: PHP, Laravel, Node.js, Express, REST APIs</div>
                          <div>Databases: MySQL, MongoDB</div>
                        </div>
                      )}

                      {terminalCmd === 'contact' && (
                        <div className="p-2.5 rounded bg-slate-900/80 text-amber-300 text-[11px]">
                          <div>Email: mdrahmatullahquraishi@gmail.com</div>
                          <div>GitHub: github.com/rahmatullahcodes</div>
                        </div>
                      )}
                    </div>

                    {/* Quick interactive buttons to run commands */}
                    <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                      <span className="text-slate-500">Run:</span>
                      {['status', 'stack', 'contact'].map(cmd => (
                        <button
                          key={cmd}
                          onClick={() => setTerminalCmd(cmd)}
                          className={`px-2 py-0.5 rounded border transition-colors ${
                            terminalCmd === cmd ? 'bg-sky-500 text-white border-sky-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          /{cmd}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative group rounded-xl overflow-hidden bg-gradient-to-b from-slate-800/80 to-navy-950 border border-slate-700/60 aspect-[16/10] flex flex-col items-center justify-center text-center p-4"
                  >
                    {customPhoto ? (
                      <img
                        src={customPhoto}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="relative mb-3">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-0.5 shadow-glow-md">
                            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                              <Code2 className="w-10 h-10 text-sky-400" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent pointer-events-none" />
                            </div>
                          </div>
                          <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-emerald-500 text-[9px] font-extrabold text-navy-950 uppercase tracking-wider shadow">
                            Active
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white tracking-tight">
                          {personalInfo.name}
                        </h3>
                        <p className="text-xs text-sky-400 font-medium mt-0.5">
                          Full Stack Developer • 2+ Yrs Experience
                        </p>
                      </>
                    )}

                    <label className="absolute bottom-2.5 right-2.5 cursor-pointer p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md text-xs flex items-center gap-1.5 transition-all">
                      <Camera className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-[10px]">Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </motion.div>
                )}

                {/* Bottom Quick Metric Pills */}
                <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-sky-500/40 transition-colors">
                    <div className="text-base font-extrabold text-white">2+ Years</div>
                    <div className="text-[11px] text-slate-400 font-medium">Production Experience</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-sky-500/40 transition-colors">
                    <div className="text-base font-extrabold text-sky-400">100% Verified</div>
                    <div className="text-[11px] text-slate-400 font-medium">5 Live Case Studies</div>
                  </div>
                </div>

              </div>

            </div>
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

            <div className="flex gap-3 w-max animate-marquee marquee-content">
              {[...techBadges, ...techBadges].map((tech, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-sm cursor-default ${tech.color}`}
                >
                  <span className="text-sm">{tech.icon}</span>
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
