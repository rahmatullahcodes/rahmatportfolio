import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Award, CheckCircle2, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white text-slate-800 border-t border-slate-200 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

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
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Education & Computer Science Degrees.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
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
                  glowColor="rgba(56, 189, 248, 0.12)"
                  className="group relative h-full p-7 sm:p-8 rounded-2xl bg-surface-50 border border-slate-200/90 hover:border-sky-400 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Ambient Hover Glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-sky-600 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-300 shadow-2xs">
                        {isMaster ? (
                          <GraduationCap className="w-6 h-6" />
                        ) : (
                          <BookOpen className="w-6 h-6" />
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-sky-500" />
                        {item.completionYear}
                      </span>
                    </div>

                    {/* Degree Title & Institution */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-700 mt-1">
                      {item.institution}
                    </p>
                    <p className="text-xs text-sky-600 font-bold mt-0.5">
                      {item.program}
                    </p>

                    {/* Focus Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                      {item.focus}
                    </p>
                  </div>

                  {/* Footer validation check */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Verified Qualification
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
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
