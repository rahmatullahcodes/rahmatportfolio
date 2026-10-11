import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Education & Computer Science Degrees.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Formal technical education providing deep foundations in software development, data structures, algorithms, and system design.
          </p>
        </div>

        {/* Education Cards Grid */}
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
                className="group p-7 rounded-2xl bg-surface-50 border border-slate-200 hover:border-sky-300 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors shadow-2xs">
                      {isMaster ? (
                        <GraduationCap className="w-6 h-6" />
                      ) : (
                        <BookOpen className="w-6 h-6" />
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                      <Calendar className="w-3.5 h-3.5" />
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
                  <p className="text-xs text-sky-600 font-medium mt-0.5">
                    {item.program}
                  </p>

                  {/* Focus Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                    {item.focus}
                  </p>
                </div>

                {/* Footer validation check */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified Qualification
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {isMaster ? 'Post-Graduate' : 'Undergraduate'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

