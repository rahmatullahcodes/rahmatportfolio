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
  Sparkles
} from 'lucide-react';
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
    <section id="services" className="py-24 bg-surface-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            Primary Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High-impact web, backend, and software engineering services.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Delivering business-oriented digital solutions from initial technical design to final production deployment.
          </p>
        </div>

        {/* Services 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.iconName] || Globe;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-card-hover transition-all duration-300"
              >
                <div>
                  {/* Icon & Category */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors duration-200 mb-5 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  {/* Short Benefit-Focused Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Key Deliverables Bullet Points */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Deliverables:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry CTA Button */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <button
                    onClick={() => handleServiceInquiry(service.title)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-900 text-slate-700 hover:text-white text-xs font-semibold transition-all duration-200 group/btn"
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-sky-400 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Collaboration Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              Need a bespoke combination or end-to-end MVP?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              I can take your concept from database architecture and API design to a polished frontend and production hosting.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-glow-sm transition-all shrink-0"
          >
            <span>Request a Project Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

