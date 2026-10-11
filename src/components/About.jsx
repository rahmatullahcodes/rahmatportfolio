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
  Layout
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
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
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card-light hover:border-sky-400 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-200 mb-3 shadow-2xs">
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
              </div>
            );
          })}
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Biography & Background */}
          <div className="lg:col-span-7 space-y-6">
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
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 hover:text-sky-800 transition-all shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Resume & Discussion CTAs */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenResume}
                className="shine-button inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Review & Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 shadow-sm hover:border-sky-400 hover:text-sky-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Discuss Your Next Project</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Core Philosophy Pillars & Key Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-card-light space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Development Philosophy
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  Client Focused
                </span>
              </div>

              <div className="space-y-4">
                {corePillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent hover:border-sky-200 hover:bg-sky-50/40 hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 transition-all duration-200 shrink-0 mt-0.5 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {pillar.title}
                          </h4>
                          <span className="text-[10px] font-semibold text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded">
                            {pillar.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Experience Callout Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-950 text-white border border-slate-800 shadow-xl hover:border-sky-500/40 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white group-hover:text-sky-300 transition-colors">2+ Years</div>
                  <div className="text-xs text-sky-400 font-semibold mt-0.5">Hands-on Production Code</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Current Role</div>
                  <div className="text-sm font-bold text-slate-200">Zynextro Software</div>
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Education: BCA & MCA (IGNOU)</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open for work
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
