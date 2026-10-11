import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Database, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Briefcase,
  Terminal,
  Sparkles,
  Cpu,
  Server,
  Layout,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TiltCard from './TiltCard';

const corePillars = [
  {
    icon: Code2,
    title: "Clean Full Stack Architecture",
    description: "Writing maintainable, modular JavaScript and PHP code structured for long-term scalability and effortless team collaboration.",
    badge: "Architecture"
  },
  {
    icon: Database,
    title: "Robust Database Design",
    description: "Designing normalized schemas, enforcing data integrity, and optimizing queries in MySQL and MongoDB for fast data retrieval.",
    badge: "Optimization"
  },
  {
    icon: Zap,
    title: "API-First & Integration",
    description: "Building well-structured RESTful APIs, securing endpoints with JWT, and seamlessly connecting third-party platforms and payment gateways.",
    badge: "Security"
  },
  {
    icon: ShieldCheck,
    title: "Performance & Responsive UI",
    description: "Delivering mobile-first responsive interfaces with optimal Core Web Vitals, accessible markup, and fast load times.",
    badge: "Core Web Vitals"
  }
];

const metricCards = [
  { label: "Production Experience", val: "2+ Years", sub: "Active client & agency engineering", icon: Briefcase },
  { label: "Primary Ecosystems", val: "React & PHP", sub: "Full stack JavaScript & Laravel", icon: Layers },
  { label: "Architecture", val: "API-First", sub: "RESTful endpoints & secure JWT", icon: Zap },
  { label: "Databases", val: "MySQL & Mongo", sub: "Relational integrity & NoSQL speed", icon: Database }
];

export default function About({ onOpenResume }) {
  return (
    <section id="about" className="py-24 bg-surface-50 text-slate-800 border-t border-surface-200 relative overflow-hidden">
      {/* Background Subtle Ambient Details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
            About Me & Engineering Focus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Engineering dependable digital products with clean code & modern architectures.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            A developer who bridges frontend responsiveness with backend reliability to turn project requirements into production-ready software.
          </p>
        </motion.div>

        {/* 4 Interactive Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {metricCards.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card-light hover:border-sky-400 hover:shadow-card-hover transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sky-600 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-3 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {metric.val}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {metric.sub}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Content Grid with Portrait Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Dedicated Professional Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <TiltCard
              maxTilt={6}
              glowColor="rgba(56, 189, 248, 0.12)"
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card-light space-y-5"
            >
              
              {/* Photo Frame with Subtle Blue Border */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border-2 border-sky-400/30 shadow-md group">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Subtle bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs font-semibold shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Full Stack Engineer</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white">
                  <div className="text-sm font-extrabold tracking-tight">{personalInfo.name}</div>
                  <div className="text-xs text-sky-400 font-medium">2+ Years Production Experience</div>
                </div>
              </div>

              {/* Education & Current Role Badges */}
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                    Current Organization
                  </span>
                  <span className="font-bold text-slate-800">Zynextro Software</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                    Degree
                  </span>
                  <span className="font-bold text-slate-800">BCA–MCA Integrated (IGNOU)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenResume}
                  className="shine-button flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>View Resume</span>
                </button>
                <a
                  href="#contact"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Hire Me</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

            </TiltCard>
          </motion.div>

          {/* Right Column: Biography, Highlights, and Philosophy Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bio Prose */}
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-base leading-relaxed">
              <p>
                I am <strong className="text-slate-900 font-bold">{personalInfo.name}</strong>, a Full Stack Developer with <strong>2+ years of production experience</strong> building modern websites, web applications, and digital business tools.
              </p>
              <p>
                My technical journey spans across both the JavaScript ecosystem (React.js, Node.js, Express.js) and battle-tested PHP frameworks (Laravel, CodeIgniter). I specialize in designing normalized database schemas in MySQL and MongoDB, engineering secure REST APIs, implementing JWT authentication, and integrating third-party payment gateways.
              </p>
              <p>
                Beyond writing code, I care deeply about how software serves business goals. With a background supporting digital marketing workflows, SEO audits, and conversion tracking, I ensure that every website or web application is not only technically sound and responsive, but also structured for search engines, fast loading speeds, and customer conversion.
              </p>
            </div>

            {/* Quick Highlights Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "2+ Years of Verified Production Experience",
                "Dual-Stack: React/Node.js & PHP/Laravel",
                "RESTful API Design & Payment Integration",
                "Mobile-First Responsive UI Engineering",
                "Relational & Document Database Modeling",
                "Technical SEO & Core Web Vitals Awareness"
              ].map((highlight, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.025, x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all shadow-sm cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Development Philosophy Pillars Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-card-light space-y-4 mt-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Engineering Principles
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-sm animate-pulse">
                  Client Focused
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {corePillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50/40 hover:shadow-sm transition-all duration-200 group cursor-default"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all shrink-0 shadow-2xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {pillar.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

