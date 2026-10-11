import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';
import { personalInfo } from './data/portfolioData';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [prefilledService, setPrefilledService] = useState('');
  const [toast, setToast] = useState(null);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="min-h-screen bg-navy-950 font-sans selection:bg-sky-500 selection:text-white relative">
      {/* Top Animated Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 z-50 origin-left shadow-glow-sm"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section (Dark Navy with Electric Blue Accents) */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onCopyEmail={handleCopyEmail}
        />

        {/* About Section (Readable Light Contrast Surface) */}
        <About onOpenResume={() => setIsResumeOpen(true)} />

        {/* Skills Section */}
        <Skills />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Featured Projects Section */}
        <Projects onOpenProjectModal={(project) => setSelectedProject(project)} />

        {/* Work Experience Section */}
        <Experience />

        {/* Education Section */}
        <Education />

        {/* Contact & Lead Generation Section */}
        <Contact
          prefilledService={prefilledService}
          onShowToast={(t) => setToast(t)}
        />
      </main>

      {/* Footer */}
      <Footer />

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
