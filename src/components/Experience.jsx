import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { workExperience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Soft Electric Glow */}
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
            Career Progression
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
            Work experience & professional background.
          </h2>
          <p className="mt-4 text-base text-tech-slate leading-relaxed">
            Verified timeline of software engineering roles across agency and product teams, delivering production systems.
          </p>
        </motion.div>

        {/* Timeline Container with Gradient Line */}
        <div className="relative pl-6 sm:pl-10 border-l-2 space-y-12 max-w-4xl border-electric-accent/40">
          {workExperience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full border-4 ${
                exp.isCurrent 
                  ? 'bg-electric-accent border-navy-950 ring-4 ring-electric-accent/40 shadow-glow-electric' 
                  : 'bg-navy-900 border-slate-700 group-hover:border-electric-accent group-hover:ring-4 group-hover:ring-electric-accent/20'
              } transition-all duration-300`}>
                {exp.isCurrent && (
                  <span className="absolute -inset-1 rounded-full bg-electric-400 animate-ping opacity-40 pointer-events-none" />
                )}
              </div>

              {/* Card Container with Interactive Lift */}
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-slate-800 group-hover:border-electric-accent group-hover:shadow-card-hover transition-all duration-300 shadow-card-dark"
              >
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                          Current Role
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1.5 text-sm font-bold text-electric-400">
                      <Building2 className="w-4 h-4 text-electric-accent" />
                      <span>{exp.company}</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span className="text-tech-slate font-medium text-xs">{exp.location}</span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 group-hover:bg-electric-accent/20 text-slate-300 group-hover:text-electric-300 border border-slate-800 group-hover:border-electric-accent/40 text-xs font-bold w-fit transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-electric-accent" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-xs sm:text-sm text-tech-slate mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2.5 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Core Responsibilities & Delivery:
                  </span>
                  {exp.responsibilities.map((item, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-electric-accent shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Used Pills with Hover Effects */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-electric-accent" />
                      Stack:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 group-hover:bg-electric-accent/15 text-slate-300 group-hover:text-white border border-slate-700/80 group-hover:border-electric-accent/40 transition-colors shadow-sm hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
