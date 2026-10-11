import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheck,
  Search,
  X
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = skillCategories
    .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
    .map(cat => {
      if (!searchQuery.trim()) return cat;
      const matchingSkills = cat.skills.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.badge.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchingSkills.length > 0 ? { ...cat, skills: matchingSkills } : null;
    })
    .filter(Boolean);

  return (
    <section id="skills" className="py-24 bg-white text-slate-800 border-t border-slate-200 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-sky-100/40 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
              Technical Stack & Skills
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tools & frameworks I use to build scalable products.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Honest, production-tested competencies without arbitrary skill bars or fake percentages.
            </p>
          </motion.div>

          {/* Quick Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick Filter Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter tools (e.g. React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Domains
              </button>
              {skillCategories.slice(0, 4).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category) => {
              const IconComponent = iconMap[category.iconName] || Layers;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-surface-50 border border-slate-200 hover:border-sky-400 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Top Ambient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-white border border-slate-200 text-sky-600 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
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

                      <span className="text-[10px] font-bold text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-full border border-sky-200">
                        Verified
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Skill Items with Rich Hover Lift */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-glow-sm hover:scale-[1.04] transition-all duration-200 shadow-sm cursor-default"
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
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Production Tested
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">2+ Yrs Exp</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Technical Architecture Note with Shine Effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Full-Lifecycle Engineering Standards</h4>
              <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                Code versioning on Git/GitHub, structured REST endpoint documentation, secure JWT authentication, and clean responsive CSS architectures.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shine-button inline-flex items-center justify-center text-xs font-bold px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          >
            Review Production Projects →
          </a>
        </motion.div>

      </div>
    </section>
  );
}

