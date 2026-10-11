import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Server, 
  Database, 
  Webhook, 
  Cpu, 
  Smartphone, 
  TrendingUp, 
  Check, 
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

const iconMap = {
  Layout,
  Server,
  Database,
  Webhook,
  Cpu,
  Smartphone,
  TrendingUp
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
              Technical Stack & Skills
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tools & frameworks I use to build scalable products.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Honest, production-tested competencies without arbitrary skill bars or fake percentages.
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Domains ({skillCategories.length})
            </button>
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = iconMap[category.iconName] || Layers;

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-2xl bg-surface-50 border border-slate-200 hover:border-sky-300 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-200 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-500">
                        {category.skills.length} core tools
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skill Items */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-xs font-medium text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-colors shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span>{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal ml-0.5">
                          ({skill.badge})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Production Ready
                  </span>
                  <span className="text-slate-400 font-mono">2+ Yrs Exp</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Architecture Note */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Full-Lifecycle Engineering Standards</h4>
              <p className="text-xs text-slate-400">
                Code versioning on Git/GitHub, structured REST endpoint documentation, secure JWT auth, and clean responsive CSS.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 transition-colors shrink-0"
          >
            See Them In Action →
          </a>
        </div>

      </div>
    </section>
  );
}

