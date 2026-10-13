import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Award, CheckCircle2, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Soft Electric Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-accent/10 rounded-full blur-[130px] pointer-events-none" />
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
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
            Education & Computer Science Degrees.
          </h2>
          <p className="mt-4 text-base text-tech-slate leading-relaxed">
            Formal technical education providing deep foundations in software development, data structures, algorithms, and system design.
          </p>
        </motion.div>

        {/* Education Cards Grid with 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {education.map((item, index) => {
            const isMaster = item.degree.startsWith('MCA');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
              >
                <TiltCard
                  maxTilt={6}
                  glowColor="rgba(37, 99, 235, 0.22)"
                  className="group relative h-full p-7 sm:p-8 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-electric-accent hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-card-dark"
                >
                  {/* Subtle Ambient Hover Glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-electric-300 group-hover:bg-electric-accent group-hover:text-white group-hover:scale-110 group-hover:shadow-glow-electric transition-all duration-300 shadow-sm">
                        {isMaster ? (
                          <GraduationCap className="w-6 h-6" />
                        ) : (
                          <BookOpen className="w-6 h-6" />
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-electric-300 text-xs font-bold border border-slate-800 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-electric-accent" />
                        {item.completionYear}
                      </span>
                    </div>

                    {/* Degree Title & Institution */}
                    <h3 className="text-xl font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {item.institution}
                    </p>
                    <p className="text-xs text-electric-400 font-bold mt-0.5">
                      {item.program}
                    </p>

                    {/* Focus Description */}
                    <p className="text-xs sm:text-sm text-tech-slate mt-4 leading-relaxed">
                      {item.focus}
                    </p>
                  </div>

                  {/* Footer validation check */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-tech-slate">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Verified Qualification
                    </span>
                    <span className="text-slate-300 font-mono text-[11px] font-semibold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {isMaster ? 'Post-Graduate' : 'Undergraduate'}
                    </span>
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
