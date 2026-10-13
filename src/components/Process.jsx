import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Code2, ShieldCheck, Rocket, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import TiltCard from './TiltCard';

const steps = [
  {
    step: "01",
    title: "Discovery & Architecture",
    tagline: "Blueprint & System Specifications",
    desc: "We analyze your project goals, define target user flows, design normalized database schemas (MySQL/MongoDB), and select the optimal modern stack (React/Node/Laravel).",
    deliverables: ["Product Requirement Mapping", "Database Schema Diagram", "REST API Contract", "Milestone Roadmap"],
    icon: Compass,
    accent: "from-blue-600 to-electric-accent"
  },
  {
    step: "02",
    title: "Agile Full-Stack Engineering",
    tagline: "Clean Code & Rapid Prototyping",
    desc: "I build responsive UI components, write secure modular backend endpoints, configure JWT authentication, and provide live preview staging environments for real-time client feedback.",
    deliverables: ["Modular React.js Components", "Secure RESTful Backend", "Responsive Mobile-First UI", "Weekly Milestone Previews"],
    icon: Code2,
    accent: "from-electric-accent to-sky-500"
  },
  {
    step: "03",
    title: "Testing, QA & Optimization",
    tagline: "Rock-Solid Performance & Security",
    desc: "Every endpoint and screen is tested across devices. We audit Core Web Vitals, implement technical SEO tags, optimize image payloads, and sanitize inputs against SQL injection and XSS.",
    deliverables: ["Cross-Device UI Testing", "Core Web Vitals Audit", "Input Security Sanitization", "Speed & Payload Optimization"],
    icon: ShieldCheck,
    accent: "from-indigo-600 to-blue-500"
  },
  {
    step: "04",
    title: "Production Launch & Support",
    tagline: "Zero-Downtime Deployment & Handover",
    desc: "We push to production cloud hosting (Vercel, VPS, cPanel), configure SSL HTTPS certificates, hand over full source code ownership, and provide 30 days of complimentary warranty support.",
    deliverables: ["Production Cloud / VPS Setup", "Free SSL & Domain Routing", "Clean Git Repository Handover", "30-Day Post-Launch Warranty"],
    icon: Rocket,
    accent: "from-emerald-500 to-teal-500"
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle Ambient Background Details */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric-accent/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse"></span>
            Engineering Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
            How I turn ideas into reliable production platforms.
          </h2>
          <p className="mt-4 text-base text-tech-slate leading-relaxed">
            A transparent, disciplined 4-step engineering workflow ensuring predictable delivery, high code quality, and zero surprises.
          </p>
        </motion.div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <TiltCard
                  maxTilt={6}
                  glowColor="rgba(37, 99, 235, 0.22)"
                  className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-electric-accent hover:shadow-card-hover transition-all duration-300 shadow-card-dark"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} text-white flex items-center justify-center shadow-glow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="font-mono text-xl font-black text-slate-500 group-hover:text-electric-300 transition-colors select-none">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Title & Tagline */}
                    <h3 className="text-base font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-electric-400 mb-3">
                      {item.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-tech-slate leading-relaxed mb-5">
                      {item.desc}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-slate-800 mt-auto space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Deliverables:
                    </span>
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
