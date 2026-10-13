import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Education from './components/Education';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import FloatingQuickConnect from './components/FloatingQuickConnect';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogPreviewSection from './components/BlogPreviewSection';
import { personalInfo } from './data/portfolioData';
import { getBlogBySlug } from './data/blogs';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [prefilledService, setPrefilledService] = useState('');
  const [toast, setToast] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Routing State: 'portfolio' | 'blog' | 'blog-detail'
  const [currentView, setCurrentView] = useState('portfolio');
  const [currentBlogSlug, setCurrentBlogSlug] = useState(null);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parse Initial URL Route & Listen for Popstate (Back/Forward)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (pathname.startsWith('/blog/') && pathname.length > 6) {
        const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
        if (getBlogBySlug(slug)) {
          setCurrentView('blog-detail');
          setCurrentBlogSlug(slug);
          return;
        }
      }

      if (pathname === '/blog' || pathname === '/blog/' || hash === '#blog') {
        setCurrentView('blog');
        setCurrentBlogSlug(null);
        return;
      }

      // Default: Portfolio Home
      setCurrentView('portfolio');
      setCurrentBlogSlug(null);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Mouse Glow Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Navigation Handlers
  const handleNavigateBlog = (slug = null) => {
    if (slug) {
      setCurrentView('blog-detail');
      setCurrentBlogSlug(slug);
      window.history.pushState(null, '', `/blog/${slug}`);
    } else {
      setCurrentView('blog');
      setCurrentBlogSlug(null);
      window.history.pushState(null, '', '/blog');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (anchor = '#home') => {
    setCurrentView('portfolio');
    setCurrentBlogSlug(null);
    window.history.pushState(null, '', anchor === '#home' ? '/' : anchor);

    setTimeout(() => {
      if (anchor && anchor !== '#home') {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setToast({
      type: 'success',
      message: 'Email address copied to clipboard: ' + personalInfo.email
    });
  };

  const handleSelectService = (serviceTitle) => {
    setPrefilledService(serviceTitle);
  };

  return (
    <div className="min-h-screen bg-navy-950 font-sans selection:bg-electric-accent selection:text-white relative overflow-x-hidden">
      {/* High-End Interactive Custom Cursor */}
      <CustomCursor />

      {/* Interactive Background Particle Field */}
      <ParticleBackground />

      {/* Global Interactive Mouse Glow Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.12), transparent 75%)`,
        }}
      />

      {/* Top Animated Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-electric-accent to-sky-400 z-50 origin-left shadow-glow-electric"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateBlog={() => handleNavigateBlog()}
      />

      {/* Main Content Router */}
      <main className="relative z-10">
        {currentView === 'blog' && (
          <BlogList
            onSelectBlog={(slug) => handleNavigateBlog(slug)}
            onBackToPortfolio={() => handleNavigateHome('#home')}
          />
        )}

        {currentView === 'blog-detail' && (
          <BlogDetail
            slug={currentBlogSlug}
            onNavigateBlog={(slug) => handleNavigateBlog(slug)}
            onBackToPortfolio={() => handleNavigateHome('#home')}
          />
        )}

        {currentView === 'portfolio' && (
          <>
            {/* Hero Section */}
            <Hero
              onOpenResume={() => setIsResumeOpen(true)}
              onCopyEmail={handleCopyEmail}
            />

            {/* About Section */}
            <About onOpenResume={() => setIsResumeOpen(true)} />

            {/* Skills Section */}
            <Skills />

            {/* Services Section */}
            <Services onSelectService={handleSelectService} />

            {/* Featured Projects Section */}
            <Projects onOpenProjectModal={(project) => setSelectedProject(project)} />

            {/* 4-Step Engineering Methodology */}
            <Process />

            {/* Client Social Proof & Testimonials */}
            <Testimonials />

            {/* Work Experience Section */}
            <Experience />

            {/* Education Section */}
            <Education />

            {/* Technical Architecture Guides & Blog Preview */}
            <BlogPreviewSection
              onOpenBlogList={() => handleNavigateBlog()}
              onSelectBlog={(slug) => handleNavigateBlog(slug)}
            />

            {/* Frequently Asked Questions */}
            <FAQ />

            {/* Contact & Lead Generation Section */}
            <Contact
              prefilledService={prefilledService}
              onShowToast={(t) => setToast(t)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateBlog={() => handleNavigateBlog()} />

      {/* Floating Persistent Quick Connect & WhatsApp Beacon */}
      <FloatingQuickConnect onOpenResume={() => setIsResumeOpen(true)} />

      {/* Modals & Feedback Notifications */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
