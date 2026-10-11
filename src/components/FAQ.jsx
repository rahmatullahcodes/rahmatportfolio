import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

const faqs = [
  {
    q: "What is your typical project delivery timeline?",
    a: "Simple landing platforms and portfolio websites typically take 5–10 business days. Medium full-stack MVPs (with user authentication, database, and admin dashboard) take 2–4 weeks. Complex enterprise web applications usually take 4–6 weeks. I provide a clear milestone calendar before commencing."
  },
  {
    q: "Can you collaborate with international clients across time zones?",
    a: "Yes! I frequently collaborate with clients across the United States, Middle East, Europe, and Asia. I maintain flexible working windows, provide asynchronous daily standup reports via WhatsApp/Slack/Email, and schedule sync calls that fit your business hours."
  },
  {
    q: "Do you offer post-launch support and warranty?",
    a: "Yes. Every completed engagement includes 30 days of complimentary post-launch warranty support for bug fixes, performance monitoring, and configuration questions. Monthly retainer packages are also available for continuous feature development and ongoing maintenance."
  },
  {
    q: "Can we sign a Non-Disclosure Agreement (NDA)?",
    a: "Absolutely. I take client intellectual property and commercial confidentiality with highest seriousness. I am fully open to signing your standard NDA and IP assignment agreement before reviewing proprietary materials."
  },
  {
    q: "What is your milestone payment structure?",
    a: "For fixed-scope projects, payments are transparently structured into milestones: typically 50% upfront to initiate architecture and UI prototypes, and 50% upon final staging sign-off before production domain deployment. Flexible milestone schedules can be tailored for larger enterprise builds."
  },
  {
    q: "Will my website be 100% mobile responsive and SEO-friendly?",
    a: "Yes, without exception. Every application is built with a strict mobile-first architecture, clean semantic HTML5 markup, optimal Core Web Vitals (fast LCP & CLS), Open Graph preview cards, and metadata configured to ensure high organic search rankings on Google."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const toggleFAQ = (idx) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 bg-surface-50 text-slate-800 border-t border-slate-200 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear answers about my engineering workflow, contracts, timelines, and collaboration terms.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-sky-400 shadow-md ring-2 ring-sky-500/10'
                    : 'bg-white/80 hover:bg-white border-slate-200/90 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-sky-100">
                      0{idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>

                  <div className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
                    isOpen ? 'bg-sky-500 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Have more questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a unique requirement or question?</h4>
              <p className="text-xs text-slate-400">Feel free to message me directly on WhatsApp for an immediate response.</p>
            </div>
          </div>

          <a
            href="https://wa.me/918969361100?text=Hi%20Md%20Rahmatullah,%20I%20have%20a%20question%20regarding%20a%20potential%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="shine-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
          >
            <span>Ask on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
