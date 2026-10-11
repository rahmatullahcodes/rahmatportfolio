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
    <section id="reviews" className="py-24 bg-surface-50 text-slate-800 border-t border-slate-200 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-200/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-100/30 rounded-full blur-[110px] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
              Client Social Proof & Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted by founders, teams & product leaders.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Direct feedback from production platforms engineered for startups and enterprise clients.
            </p>
          </motion.div>

          {/* Social Proof Rating Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm w-fit">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-slate-900">5.0 / 5.0 Rating</span>
              <span className="text-slate-500 block text-[11px]">100% Client Satisfaction</span>
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
                glowColor="rgba(56, 189, 248, 0.15)"
                className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-card-hover transition-all duration-300"
              >
                <div>
                  {/* Top: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-sky-500 group-hover:bg-sky-50 transition-colors">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom: Client Profile & Verification */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-sm flex items-center justify-center shadow-sm shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {item.name}
                          </h4>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" title="Verified Client" />
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {item.role} • <span className="text-sky-600 font-semibold">{item.company}</span>
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  {/* Project Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100/80">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
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
