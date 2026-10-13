import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Linkedin, 
  Github, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  DollarSign,
  Laptop,
  Globe,
  Layers,
  Database,
  Smartphone,
  TrendingUp,
  HelpCircle,
  Youtube,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

const projectTypes = [
  { label: "Full Stack Web Application", icon: Layers },
  { label: "Website Design & Development", icon: Globe },
  { label: "REST API & Backend System", icon: Laptop },
  { label: "Database Design & Optimization", icon: Database },
  { label: "Mobile App Development", icon: Smartphone },
  { label: "Technical SEO & Digital Marketing", icon: TrendingUp },
  { label: "Other Custom Project", icon: HelpCircle }
];

const budgetRangesINR = [
  "Less than ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹1,50,000",
  "₹1,50,000+",
  "Custom Amount"
];

const budgetRangesUSD = [
  "Less than $500",
  "$500 – $1,500",
  "$1,500 – $3,500",
  "$3,500+",
  "Custom Amount"
];

export default function Contact({ prefilledService, onShowToast }) {
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full Stack Web Application',
    customProjectType: '',
    budget: '₹25,000 – ₹75,000',
    customBudget: '',
    description: '',
    honeypot: '' // Anti-bot honeypot field
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        projectType: prefilledService
      }));
    }
  }, [prefilledService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        message: 'Email address copied to clipboard: ' + personalInfo.email
      });
    }
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        message: 'Phone number copied to clipboard: ' + personalInfo.phone
      });
    }
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if (formData.budget !== 'Custom Amount') {
      if (newCurrency === 'USD') {
        setFormData(prev => ({ ...prev, budget: '$500 – $1,500' }));
      } else {
        setFormData(prev => ({ ...prev, budget: '₹25,000 – ₹75,000' }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Spam honeypot check
    if (formData.honeypot) {
      return;
    }

    // Client-side validations
    if (!formData.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      setFormError('Please provide a brief description of your project (at least 15 characters).');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          customProjectType: formData.customProjectType,
          budget: formData.budget,
          customBudget: formData.customBudget,
          currency: currency,
          message: formData.description,
          honeypot: formData.honeypot
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to deliver inquiry. Please email directly at mdrahmatullahquraishi@gmail.com.');
      }

      setSubmitted(true);
      
      // Multi-stage confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);

      if (onShowToast) {
        onShowToast({
          type: 'success',
          message: 'Inquiry sent! Email delivered directly to Md Rahmatullah Quraishi.'
        });
      }
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please email directly.');
      if (onShowToast) {
        onShowToast({
          type: 'error',
          message: err.message || 'Could not send message. Please email directly.'
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Ambience and Glowing Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-electric-accent/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-accent/15 border border-electric-accent/30 text-electric-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-accent animate-pulse"></span>
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tech-offwhite tracking-tight leading-tight">
            Have a project in mind? Let's discuss it.
          </h2>
          <p className="mt-4 text-base text-tech-slate leading-relaxed">
            Whether you need a full-stack web application, custom backend API, or end-to-end website, I am available to help you build and launch it.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md space-y-4 hover:border-sky-500/40 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Direct Contact
              </span>
              
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block font-medium">Primary Email</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-sky-400 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 shrink-0 ml-2 shadow-sm"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Direct Phone / Call */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block font-medium">Phone & WhatsApp</span>
                    <a
                      href={`tel:${personalInfo.phoneRaw}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors truncate block font-mono"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105 shrink-0 ml-2 shadow-sm"
                  title="Copy phone number"
                  aria-label="Copy phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Response Time Guarantee */}
              <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Typical response time: Within 24 hours on business days</span>
              </div>
            </div>

            {/* Social & Professional Links with Rich Hover Animations */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Professional Networks
              </span>

              <div className="space-y-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-850 border border-slate-800/80 hover:border-sky-500/50 text-slate-200 hover:text-white hover:scale-[1.02] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">LinkedIn Profile</span>
                  </div>
                  <span className="text-xs text-sky-400 group-hover:translate-x-1 transition-transform font-bold">
                    Connect →
                  </span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-850 border border-slate-800/80 hover:border-sky-500/50 text-slate-200 hover:text-white hover:scale-[1.02] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:scale-110 transition-transform">
                      <Github className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">GitHub Repository</span>
                  </div>
                  <span className="text-xs text-sky-400 group-hover:translate-x-1 transition-transform font-bold">
                    Review Code →
                  </span>
                </a>

                <a
                  href={personalInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-850 border border-slate-800/80 hover:border-rose-500/50 text-slate-200 hover:text-white hover:scale-[1.02] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                      <Youtube className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold block">YouTube Channel</span>
                      <span className="text-[11px] text-slate-400 font-mono">@TechnicalGuddu01</span>
                    </div>
                  </div>
                  <span className="text-xs text-rose-400 group-hover:translate-x-1 transition-transform font-bold">
                    Visit Channel →
                  </span>
                </a>

                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-850 border border-slate-800/80 hover:border-emerald-500/50 text-slate-200 hover:text-white hover:scale-[1.02] transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold block">WhatsApp Quick Chat</span>
                      <span className="text-[11px] text-emerald-400 font-mono">+91 8969361100</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 group-hover:translate-x-1 transition-transform font-bold">
                    Chat Now →
                  </span>
                </a>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                All inquiries and project specifications are kept strictly confidential under professional developer standards.
              </span>
            </div>

          </div>

          {/* Right Column: Lead Generation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl hover:border-slate-700/80 transition-colors">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-glow-emerald">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. I have received your project details and will review them thoroughly before replying to <strong className="text-sky-400">{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Full Stack Web Application',
                        customProjectType: '',
                        budget: currency === 'USD' ? '$500 – $1,500' : '₹25,000 – ₹75,000',
                        customBudget: '',
                        description: '',
                        honeypot: ''
                      });
                    }}
                    className="shine-button inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all mt-4 hover:scale-105"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Start a Project Discussion
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill out the form below and I'll get back to you with an estimated timeline and architecture approach.
                    </p>
                  </div>

                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Your Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Your Work Email <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. client@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp Number Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Phone / WhatsApp Number</span>
                        <span className="text-[11px] font-normal text-slate-500">(Optional)</span>
                      </label>
                      <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Direct call / WhatsApp
                      </span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 89693 61100"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                    />
                  </div>

                  {/* Project Type Selector Pills */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Project Type: <span className="text-sky-400 font-semibold">{formData.projectType}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {projectTypes.map((type, idx) => {
                        const Icon = type.icon;
                        const isSelected = formData.projectType === type.label;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, projectType: type.label }))}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                              isSelected
                                ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-glow-sm'
                                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                            <span className="truncate">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Project Type Input (Animated reveal when "Other Custom Project" is selected) */}
                    <AnimatePresence>
                      {formData.projectType === 'Other Custom Project' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2.5 overflow-hidden"
                        >
                          <input
                            type="text"
                            name="customProjectType"
                            value={formData.customProjectType}
                            onChange={handleChange}
                            placeholder="Specify your custom project (e.g. AI SaaS MVP, Chrome Extension, CRM...)"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-sky-400/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Budget Selector with INR / USD Currency Switcher */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <label className="text-xs font-bold text-slate-300">
                        Expected Budget:{' '}
                        <span className="text-sky-400 font-semibold">
                          {formData.budget === 'Custom Amount' 
                            ? (formData.customBudget ? `${formData.customBudget} (${currency})` : `Custom (${currency})`)
                            : formData.budget}
                        </span>
                      </label>

                      {/* Currency Switcher Toggle */}
                      <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('INR')}
                          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                            currency === 'INR'
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          ₹ INR
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('USD')}
                          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                            currency === 'USD'
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          $ USD
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {(currency === 'INR' ? budgetRangesINR : budgetRangesUSD).map((range, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                            formData.budget === range
                              ? 'bg-sky-500/25 text-sky-300 border-sky-400 shadow-glow-sm'
                              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>

                    {/* Custom Budget Input (Animated reveal when "Custom Amount" is selected) */}
                    <AnimatePresence>
                      {formData.budget === 'Custom Amount' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2.5 overflow-hidden"
                        >
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-sky-400 font-mono">
                              {currency === 'INR' ? '₹' : '$'}
                            </span>
                            <input
                              type="text"
                              name="customBudget"
                              value={formData.customBudget}
                              onChange={handleChange}
                              placeholder={
                                currency === 'INR' 
                                  ? "Enter your custom budget (e.g. ₹60,000 or Negotiable)"
                                  : "Enter your custom budget (e.g. $1,200 or Negotiable)"
                              }
                              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-sky-400/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Project Overview & Requirements <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Briefly describe what you would like to build, any key features, preferred tech stack, or deadlines..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit Button with Shine Effect */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="shine-button w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-electric-accent hover:bg-blue-600 text-white text-sm font-bold shadow-glow-electric hover:shadow-glow-electric-lg disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Your details will only be used to respond to this inquiry. No spam guaranteed.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

