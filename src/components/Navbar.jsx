import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText, Send, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Process', href: '#process' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Experience', href: '#experience' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4 h-10">
          
          {/* Brand Logo / Initials - Locked single line with zero awkward wrapping */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3 shrink-0 focus:outline-none"
            aria-label="Md Rahmatullah Quraishi - Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-electric-accent text-white font-black text-sm shadow-glow-electric group-hover:scale-105 transition-all duration-300 shrink-0">
              <span>{personalInfo.initials}</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-navy-950 shadow"></span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="text-sm sm:text-base font-extrabold text-tech-offwhite tracking-tight group-hover:text-electric-300 transition-colors whitespace-nowrap leading-none">
                Md Rahmatullah
              </span>
              <span className="text-[11px] font-medium text-tech-slate whitespace-nowrap leading-none mt-1">
                Full Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Centered, Streamlined, Perfectly Balanced */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 h-10 px-2 rounded-full bg-navy-900/95 border border-slate-800/90 backdrop-blur-md shadow-inner">
            {[
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Services', href: '#services' },
              { name: 'Projects', href: '#projects' },
              { name: 'Process', href: '#process' },
              { name: 'Reviews', href: '#reviews' },
              { name: 'Contact', href: '#contact' },
            ].map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`h-7.5 px-3 rounded-full text-xs font-semibold flex items-center transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-electric-accent shadow-glow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs - Equal h-10 height, vertically aligned */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenResume}
              className="h-10 inline-flex items-center gap-1.5 text-xs font-bold px-3.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-electric-accent/60 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-electric-300" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="shine-button h-10 inline-flex items-center gap-2 text-xs font-bold px-4 rounded-xl text-white bg-electric-accent hover:bg-blue-600 shadow-glow-electric hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              <span className="hidden xl:inline">Let's Discuss Project</span>
              <span className="xl:hidden">Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="h-9 px-2.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs hover:text-white flex items-center gap-1"
              aria-label="View Resume"
            >
              <FileText className="w-3.5 h-3.5 text-electric-300" />
              <span className="font-semibold text-[11px]">Resume</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-navy-950/98 border-b border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-1.5 pt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'bg-electric-accent text-white font-bold shadow-glow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold"
              >
                <FileText className="w-4 h-4 text-electric-300" />
                <span>View & Download Resume</span>
              </button>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-electric-accent hover:bg-blue-600 text-white text-xs font-bold shadow-glow-electric"
              >
                <span>Let's Discuss Your Project</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

