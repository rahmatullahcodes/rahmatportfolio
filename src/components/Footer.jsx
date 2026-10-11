import React from 'react';
import { ArrowUp, Heart, Github, Linkedin, Mail, ExternalLink, Youtube } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white font-extrabold text-base shadow-glow-sm">
                {personalInfo.initials}
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  {personalInfo.name}
                </span>
                <span className="text-xs text-sky-400 font-medium">
                  {personalInfo.title}
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              "{personalInfo.tagline}" Building scalable web applications, robust REST APIs, and client-focused digital products.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-sky-400 border border-slate-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-sky-400 border border-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel (@TechnicalGuddu01)"
                title="YouTube (@TechnicalGuddu01)"
                className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-sky-400 border border-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-200 uppercase tracking-wider block mb-3">
                Navigation
              </span>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Me</a></li>
                <li><a href="#skills" className="hover:text-white transition-colors">Tech Stack</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-200 uppercase tracking-wider block mb-3">
                Portfolio
              </span>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#projects" className="hover:text-white transition-colors">Featured Projects</a></li>
                <li><a href="#experience" className="hover:text-white transition-colors">Work Experience</a></li>
                <li><a href="#education" className="hover:text-white transition-colors">Education (IGNOU)</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Inquiry Form</a></li>
              </ul>
            </div>
          </div>

          {/* Verified Featured Projects Shortcut */}
          <div className="md:col-span-3 text-xs space-y-2">
            <span className="font-bold text-slate-200 uppercase tracking-wider block mb-3">
              Verified Projects
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="http://heystepup.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center justify-between">
                  <span>HeyStepUp</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://homeservice99.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center justify-between">
                  <span>Home Service 99</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://theorchidlaundry.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center justify-between">
                  <span>The Orchid Laundry</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://theachieversawardcouncil.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center justify-between">
                  <span>The Achievers Award Council</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://durealtymanpower.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center justify-between">
                  <span>Du Realty & Manpower</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <span>Built with React, Vite & Tailwind CSS</span>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}


