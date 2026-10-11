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
    <section id="experience" className="py-24 bg-surface-50 text-slate-800 border-t border-slate-200 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-200/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
            Career Progression
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Work experience & professional background.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Verified timeline of software engineering roles across agency and product teams, delivering production systems.
          </p>
        </motion.div>

        {/* Timeline Container with Gradient Line */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-gradient space-y-12 max-w-4xl border-sky-200/80">
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
                  ? 'bg-sky-500 border-sky-100 ring-4 ring-sky-500/25 shadow-glow-sm' 
                  : 'bg-white border-slate-300 group-hover:border-sky-500 group-hover:ring-4 group-hover:ring-sky-200'
              } transition-all duration-300`} />

              {/* Card Container with Interactive Lift */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 group-hover:border-sky-400 group-hover:shadow-card-hover group-hover:translate-x-1 transition-all duration-300">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                          Current Role
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1.5 text-sm font-bold text-sky-600">
                      <Building2 className="w-4 h-4 text-sky-500" />
                      <span>{exp.company}</span>
                      <span className="text-slate-400 font-normal">•</span>
                      <span className="text-slate-500 font-medium text-xs">{exp.location}</span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-sky-50 text-slate-700 group-hover:text-sky-800 border border-slate-200/80 group-hover:border-sky-200 text-xs font-bold w-fit transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2.5 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Core Responsibilities & Delivery:
                  </span>
                  {exp.responsibilities.map((item, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Used Pills with Hover Effects */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-sky-500" />
                      Stack:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 group-hover:bg-sky-50/60 text-slate-700 group-hover:text-sky-800 border border-slate-200/80 group-hover:border-sky-200 transition-colors shadow-2xs hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
