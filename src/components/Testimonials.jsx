import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Building, Sparkles, UserCheck } from 'lucide-react';
import TiltCard from './TiltCard';

const testimonials = [
  {
    id: 1,
    name: "Ahmad Raza",
    role: "Co-Founder & Operations Lead",
    company: "HeyStepUp",
    projectUrl: "http://heystepup.com/",
    rating: 5,
    quote: "Md Rahmatullah architected our web platform with exceptional attention to responsive UI and database speed. He is proactive, meets every deadline, and communicates technical choices with crystal clarity.",
    tags: ["Full Stack Web", "React.js", "REST APIs"]
  },
  {
    id: 2,
    name: "Kareem Mansoor",
    role: "Technical Project Lead",
    company: "Askan Al Jazeera",
    projectUrl: "https://askanaljazeera.com/",
    rating: 5,
    quote: "Delivered a clean, high-performance architecture with flawless multilingual and mobile responsive handling. He transformed our complex specs into an intuitive, production-ready platform.",
    tags: ["Enterprise Platform", "PHP & MySQL", "Cloud VPS"]
  },
  {
    id: 3,
    name: "Vikram Sharma",
    role: "Operations Director",
    company: "Home Service 99",
    projectUrl: "https://homeservice99.com/",
    rating: 5,
    quote: "Transformed our service booking flow into a lightning-fast experience. Customer inquiries and conversion rates increased significantly after his responsive redesign and backend optimization.",
    tags: ["Marketplace Platform", "Fast Booking", "UI/UX"]
  },
  {
    id: 4,
    name: "Sanjay Verma",
    role: "Managing Director",
    company: "The Orchid Laundry",
    projectUrl: "https://theorchidlaundry.com/",
    rating: 5,
    quote: "Punctual, professional, and writes maintainable code. The scheduling system and customer portals handle heavy daily traffic without a glitch. An absolute pleasure to work with.",
    tags: ["Operations System", "Database Design", "SEO Ready"]
  }
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-navy-950 text-tech-offwhite border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-electric-accent/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse"></span>
              Client Endorsements & Social Proof
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
              Trusted by founders, teams & product leaders.
            </h2>
            <p className="mt-3 text-base text-tech-slate">
              Direct feedback from production platforms engineered for startups and enterprise clients.
            </p>
          </motion.div>

          {/* Social Proof Rating Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-navy-900 border border-slate-800 shadow-card-dark w-fit">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-tech-offwhite">5.0 / 5.0 Rating</span>
              <span className="text-tech-slate block text-[11px]">100% Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard
                maxTilt={5}
                glowColor="rgba(37, 99, 235, 0.22)"
                className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-electric-accent hover:shadow-card-hover transition-all duration-300 shadow-card-dark"
              >
                <div>
                  {/* Top: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/80 text-slate-400 group-hover:text-electric-300 group-hover:bg-slate-800 transition-colors">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom: Client Profile & Verification */}
                <div className="pt-4 border-t border-slate-800 mt-auto">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-electric-accent text-white font-black text-sm flex items-center justify-center shadow-glow-sm shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-tech-offwhite group-hover:text-electric-300 transition-colors">
                            {item.name}
                          </h4>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" title="Verified Client" />
                        </div>
                        <p className="text-xs text-tech-slate font-medium">
                          {item.role} • <span className="text-electric-300 font-semibold">{item.company}</span>
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  {/* Project Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
