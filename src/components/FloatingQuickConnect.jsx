import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, FileText, ArrowUp, X, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function FloatingQuickConnect({ onOpenResume }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (350px)
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/918969361100?text=${encodeURIComponent(
    "Hi Md Rahmatullah! I saw your portfolio and would like to discuss a project."
  )}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Contact Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="p-3 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col gap-2 min-w-[210px]"
          >
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant Connect</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white p-0.5 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close Quick Connect"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-bold transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500 text-white shrink-0 shadow-sm">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp Chat</span>
              </div>
              <span className="text-[10px] bg-emerald-400/20 px-1.5 py-0.5 rounded text-emerald-300 group-hover:translate-x-0.5 transition-transform font-mono">
                Active
              </span>
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:+918969361100"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white text-xs font-semibold transition-all group"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Direct Call</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                +91 8969361100
              </span>
            </a>

            {/* View Resume Trigger */}
            {onOpenResume && (
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenResume();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span>View Resume</span>
                </div>
                <span className="text-[10px] text-sky-400 font-bold">
                  PDF →
                </span>
              </button>
            )}

            {/* Scroll Back to Top */}
            <button
              onClick={() => {
                setIsExpanded(false);
                scrollToTop();
              }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 text-[11px] font-medium transition-colors pt-2 border-t border-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <ArrowUp className="w-3 h-3 text-sky-400" />
                <span>Scroll to Top</span>
              </span>
              <span className="text-[10px] text-slate-500">Top ↑</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {/* Back to top mini pill */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          title="Back to Top"
          className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 text-sky-400" />
        </motion.button>

        {/* WhatsApp Pulse Floating Pill */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(prev => !prev)}
          className="shine-button relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl hover:shadow-glow-md border border-emerald-400/40 transition-all font-bold text-xs"
        >
          {/* Animated Green Radar Pulse */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>

          <MessageSquare className="w-4 h-4 text-white" />
          <span className="hidden xs:inline sm:inline">WhatsApp Chat</span>
        </motion.button>
      </div>
    </div>
  );
}
