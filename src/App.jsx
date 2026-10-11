import React, { useState } from 'react';
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
    <div className="min-h-screen bg-navy-950 font-sans selection:bg-sky-500 selection:text-white">
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

