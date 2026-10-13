import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Layers, 
  Smartphone, 
  Cog, 
  Webhook, 
  Database, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Check
} from 'lucide-react';
import TiltCard from './TiltCard';
import { services } from '../data/portfolioData';

const serviceIcons = {
  Globe,
  Layers,
  Smartphone,
  Cog,
  Webhook,
  Database,
  Search,
  TrendingUp
};

export default function Services({ onSelectService }) {
  const handleServiceInquiry = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Soft Electric Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-electric-accent/10 rounded-full blur-[130px] pointer-events-none" />
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
            Primary Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
            High-impact web, backend, and software engineering services.
          </h2>
          <p className="mt-4 text-base text-tech-slate leading-relaxed">
            Delivering business-oriented digital solutions from initial technical design to final production deployment.
          </p>
        </motion.div>

        {/* Services 8-Card Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.iconName] || Globe;
            const numberLabel = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <TiltCard
                  maxTilt={6}
                  glowColor="rgba(37, 99, 235, 0.22)"
                  className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-navy-900/90 border transition-all duration-300 shadow-card-dark ${
                    index === 0 
                      ? 'border-electric-accent/80 shadow-glow-sm hover:shadow-card-hover' 
                      : 'border-slate-800 hover:border-electric-accent hover:shadow-card-hover'
                  }`}
                >
                  <div>
                    {/* Top Header: Icon on Left & Badges on Right (Inside Card to Prevent Any Clipping) */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-electric-300 group-hover:bg-electric-accent group-hover:text-white group-hover:scale-110 group-hover:shadow-glow-electric transition-all duration-300 shadow-sm shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-electric-accent text-white text-[10px] font-extrabold uppercase tracking-wider shadow-glow-sm">
                            <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow shrink-0" />
                            <span>⭐ Most Requested</span>
                          </span>
                        )}
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-electric-300 border border-slate-700 select-none">
                          {numberLabel}
                        </span>
                      </div>
                    </div>

                    {/* Service Title with Consistent Min Height */}
                    <h3 className="text-base font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors mb-2 leading-snug min-h-[44px] flex items-center">
                      {service.title}
                    </h3>

                    {/* Short Benefit-Focused Description */}
                    <p className="text-xs text-tech-slate leading-relaxed mb-5 min-h-[48px]">
                      {service.shortDesc}
                    </p>

                    {/* Key Deliverables Bullet Points */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Deliverables:
                      </span>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 group-hover:text-white transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry CTA Button */}
                  <div className="pt-4 border-t border-slate-800 mt-auto">
                    <button
                      onClick={() => handleServiceInquiry(service.title)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-electric-accent text-slate-200 hover:text-white text-xs font-bold transition-all duration-200 group/btn border border-slate-700 hover:border-electric-accent shadow-sm"
                    >
                      <span>Inquire About Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Client Collaboration Banner with Shine Effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-7 sm:p-9 rounded-2xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-electric-accent/10 to-transparent pointer-events-none" />

          <div className="space-y-1.5 relative z-10">
            <h4 className="text-lg sm:text-xl font-extrabold text-tech-offwhite flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-electric-accent" />
              Need a bespoke combination or end-to-end MVP?
            </h4>
            <p className="text-xs sm:text-sm text-tech-slate max-w-2xl leading-relaxed">
              I can architect your entire concept from database schema and REST API endpoints to a high-converting reactive UI and reliable production hosting.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#contact"
            className="shine-button inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-electric-accent hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-glow-electric hover:shadow-glow-electric-lg transition-all shrink-0 relative z-10"
          >
            <span>Request a Project Quote</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
