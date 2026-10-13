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
import TiltCard from './TiltCard';

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
    <section id="skills" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle Background Electric Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-accent/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse"></span>
              Technical Stack & Skills
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight">
              Tools & frameworks I use to build scalable products.
            </h2>
            <p className="mt-3 text-base text-tech-slate">
              Specialized expertise across PHP, Laravel, React.js, Node.js, MySQL, MongoDB, and REST API integration.
            </p>
          </motion.div>

          {/* Quick Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick Filter Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter tools (e.g. Laravel, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-navy-900 border border-slate-800 text-xs font-medium text-tech-offwhite placeholder-slate-500 focus:outline-none focus:border-electric-accent focus:ring-1 focus:ring-electric-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-navy-900/90 border border-slate-800">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === 'all' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {selectedCategory === 'all' && (
                  <motion.div
                    layoutId="skillActivePill"
                    className="absolute inset-0 bg-electric-accent rounded-lg shadow-glow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">All Domains</span>
              </button>
              {skillCategories.slice(0, 4).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat.id ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {selectedCategory === cat.id && (
                    <motion.div
                      layoutId="skillActivePill"
                      className="absolute inset-0 bg-electric-accent rounded-lg shadow-glow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.title.split(' ')[0]}</span>
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
                >
                  <TiltCard
                    maxTilt={5}
                    glowColor="rgba(37, 99, 235, 0.22)"
                    className="group relative h-full p-6 sm:p-7 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-electric-accent hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-card-dark"
                  >
                    {/* Subtle Top Ambient Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-electric-300 group-hover:bg-electric-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors">
                              {category.title}
                            </h3>
                            <span className="text-[11px] font-medium text-tech-slate">
                              {category.skills.length} core tools
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-electric-300 bg-electric-accent/15 px-2.5 py-1 rounded-full border border-electric-accent/30 group-hover:bg-electric-accent group-hover:text-white transition-colors">
                          Verified
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-tech-slate mb-5 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Skill Items with Rich Hover Lift */}
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-electric-accent hover:text-white hover:bg-electric-accent/15 hover:shadow-glow-sm hover:scale-[1.06] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-sm cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-electric-accent"></span>
                            <span>{skill.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal ml-0.5">
                              ({skill.badge})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Indicator */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-tech-slate">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Production Tested
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">2+ Yrs Exp</span>
                    </div>
                  </TiltCard>
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
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-electric-accent/20 text-electric-300 border border-electric-accent/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-tech-offwhite">Full-Lifecycle Engineering Standards</h4>
              <p className="text-xs text-tech-slate mt-0.5 max-w-xl">
                Code versioning on Git/GitHub, structured REST endpoint contracts, secure JWT authentication, and clean modular CSS architectures.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shine-button inline-flex items-center justify-center text-xs font-bold px-5 py-3 rounded-xl bg-electric-accent hover:bg-blue-600 text-white shadow-glow-electric hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          >
            Review Production Projects →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
