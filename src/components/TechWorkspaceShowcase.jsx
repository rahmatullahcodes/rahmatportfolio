import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Smartphone, 
  Cpu, 
  Sparkles, 
  Database, 
  Zap, 
  Server, 
  CheckCircle2, 
  Globe, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  Copy, 
  Check, 
  Bot, 
  Wifi, 
  BatteryMedium, 
  Clock,
  Play
} from 'lucide-react';
import TiltCard from './TiltCard';
import { personalInfo } from '../data/portfolioData';

// Code Editor Tabs Data focusing on PHP, Laravel, React.js, Node.js, MySQL, MongoDB, APIs
const codeSnippets = {
  laravel: {
    filename: "ApiController.php",
    language: "PHP / Laravel",
    badge: "Backend API",
    code: `<?php
namespace App\\Http\\Controllers\\Api;

use App\\Models\\Project;
use App\\Services\\PaymentGateway;
use Illuminate\\Http\\JsonResponse;

class ProjectController extends Controller 
{
    /**
     * Fetch optimized client deliverables with JWT auth
     */
    public function getDeliverables(): JsonResponse 
    {
        $payload = Project::with(['client', 'milestones'])
            ->where('status', 'production')
            ->orderBy('completed_at', 'desc')
            ->paginate(15);

        return response()->json([
            'status'  => 200,
            'success' => true,
            'latency' => '24ms',
            'data'    => $payload
        ]);
    }
}`
  },
  react: {
    filename: "App.jsx",
    language: "React.js",
    badge: "Frontend UI",
    code: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HighConvertingUI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to secure Laravel / Node REST API
    fetch('/api/v1/deliverables')
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map(item => (
        <motion.div key={item.id} whileHover={{ y: -6 }}>
          <ProjectCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}`
  },
  node: {
    filename: "server.js",
    language: "Node.js / Express",
    badge: "Microservice",
    code: `const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// High-speed MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500
});

// RESTful Endpoint with JWT verification
app.post('/api/orders/create', verifyJWT, async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    amount: req.body.amount,
    currency: req.body.currency || 'INR',
    status: 'confirmed'
  });
  return res.status(201).json({ success: true, orderId: order._id });
});

app.listen(5000, () => console.log('🚀 Server active on port 5000'));`
  },
  mysql: {
    filename: "schema.sql",
    language: "MySQL 8.0",
    badge: "Database",
    code: `-- Enterprise Normalized Schema (Md Rahmatullah)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(200) NOT NULL,
    budget_inr DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'in_progress',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;`
  }
};

// AI Copilot Interactive Prompts & Responses
const aiKnowledgeBase = [
  {
    prompt: "How does Rahmat engineer PHP & Laravel backends?",
    response: "Rahmat designs modular, enterprise-grade backends using Laravel & PHP 8.2 with normalized MySQL relational schemas, JWT authentication, Eloquent optimizations, and clean RESTful endpoint contracts that load in < 40ms.",
    tags: ["PHP", "Laravel", "MySQL", "Architecture"]
  },
  {
    prompt: "What is his full stack workflow with React & Node.js?",
    response: "He builds component-driven reactive UIs using React.js, Tailwind CSS, and Framer Motion, paired with Express/Node.js or Laravel APIs. He enforces end-to-end type safety, responsive mobile-first views, and smooth micro-interactions.",
    tags: ["React.js", "Node.js", "Express", "REST APIs"]
  },
  {
    prompt: "Can he integrate payment gateways & third-party APIs?",
    response: "Yes! Rahmat has integrated Razorpay, Stripe, PayPal, SMS/WhatsApp webhooks, and third-party CRM APIs with robust error handling, webhook signature validation, and idempotent database transactions.",
    tags: ["Payment Gateways", "REST APIs", "Webhooks", "Security"]
  },
  {
    prompt: "What are his delivery standards and guarantees?",
    response: "Every project comes with 100% responsive cross-device testing, Core Web Vitals optimization, zero SQL/XSS vulnerabilities, clean Git source code handover, and 30 days of free post-launch warranty support.",
    tags: ["Core Web Vitals", "Security", "30-Day Warranty", "Git"]
  }
];

export default function TechWorkspaceShowcase() {
  const [activeTab, setActiveTab] = useState('code'); // 'code', 'dashboard', 'mobile', 'ai', 'profile'
  const [activeCodeKey, setActiveCodeKey] = useState('laravel');
  const [copied, setCopied] = useState(false);
  
  // AI Interactive State
  const [selectedAiIdx, setSelectedAiIdx] = useState(0);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [displayedAiText, setDisplayedAiText] = useState(aiKnowledgeBase[0].response);

  // Simulate AI Typing Effect when selecting a prompt
  const handleSelectAiPrompt = (idx) => {
    setSelectedAiIdx(idx);
    setIsAiThinking(true);
    setDisplayedAiText('');
    
    setTimeout(() => {
      setIsAiThinking(false);
      const fullText = aiKnowledgeBase[idx].response;
      let curr = 0;
      const interval = setInterval(() => {
        curr++;
        setDisplayedAiText(fullText.slice(0, curr));
        if (curr >= fullText.length) {
          clearInterval(interval);
        }
      }, 15);
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeKey].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full">
      {/* Outer Glow Halo with Electric Blue (#2563EB) */}
      <div className="absolute -inset-2 bg-gradient-to-r from-electric-accent via-blue-500 to-sky-400 rounded-3xl blur-2xl opacity-35 hover:opacity-55 transition duration-700 animate-pulse-subtle pointer-events-none" />

      {/* Main Container Card */}
      <TiltCard
        maxTilt={5}
        glowColor="rgba(37, 99, 235, 0.28)"
        className="relative rounded-3xl bg-navy-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden p-3 sm:p-5"
      >
        {/* Top Header & Visual Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/90 mb-4">
          {/* OS Window Buttons & Label */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
            </div>
            <span className="text-xs font-mono text-slate-400 pl-1 font-semibold flex items-center gap-1.5">
              <span className="text-electric-accent">⚡</span>
              <span>rahmatullah-workspace.v2</span>
            </span>
          </div>

          {/* Interactive Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-navy-950/90 border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'code'
                  ? 'bg-electric-accent text-white shadow-glow-sm font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-electric-accent text-white shadow-glow-sm font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'mobile'
                  ? 'bg-electric-accent text-white shadow-glow-sm font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-electric-accent to-blue-500 text-white shadow-glow-sm font-bold'
                  : 'text-sky-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5 animate-pulse text-sky-300" />
              <span>AI Copilot</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'profile'
                  ? 'bg-electric-accent text-white shadow-glow-sm font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="relative min-h-[380px] sm:min-h-[420px]">
          
          {/* TAB 1: CODE EDITOR (PHP/Laravel, React, Node, MySQL) */}
          {activeTab === 'code' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {/* Editor Secondary Tabs (Laravel, React, Node, MySQL) */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {Object.entries(codeSnippets).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setActiveCodeKey(key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeCodeKey === key
                          ? 'bg-slate-800 text-white border border-electric-accent/40 shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-500" />
                      <span>{item.filename}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-electric-accent/20 text-electric-300 border border-electric-accent/30 hidden sm:inline">
                    {codeSnippets[activeCodeKey].badge}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    title="Copy code snippet"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Pre Block with Syntax Coloring Simulation */}
              <div className="relative rounded-2xl bg-navy-950/90 border border-slate-800 p-4 font-mono text-xs overflow-x-auto max-h-[300px] sm:max-h-[320px] shadow-inner text-slate-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  {/* Line Numbers */}
                  <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-800/80 font-mono text-[11px] leading-relaxed">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i}>{String(i + 1).padStart(2, '0')}</div>
                    ))}
                  </div>

                  {/* Code Body */}
                  <pre className="text-slate-200 font-mono overflow-x-auto text-[11px] sm:text-xs">
                    <code>{codeSnippets[activeCodeKey].code}</code>
                  </pre>
                </div>

                {/* Blinking Terminal Cursor */}
                <span className="inline-block w-2 h-4 bg-electric-accent animate-pulse ml-1 align-middle" />
              </div>

              {/* Bottom Mini Terminal Status */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800/90 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">PASS</span>
                  <span>PHP artisan test • 100% Endpoints Verified</span>
                </div>
                <span className="text-electric-300 font-semibold">24ms Latency</span>
              </div>
            </motion.div>
          )}

          {/* TAB 2: LIVE METRICS & CLOUD DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-electric-accent/50 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>API Uptime</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">99.98%</div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">Zero downtime SLA</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-electric-accent/50 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Average Latency</span>
                    <Zap className="w-3.5 h-3.5 text-electric-accent" />
                  </div>
                  <div className="text-2xl font-extrabold text-electric-accent">32ms</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">REST API cache hit</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-electric-accent/50 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Dual Architecture</span>
                    <Server className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-lg font-bold text-white">PHP & React.js</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Laravel + Express + Vite</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-electric-accent/50 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Database Engine</span>
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-lg font-bold text-white">MySQL & Mongo</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Normalized + Document</div>
                </div>
              </div>

              {/* Simulated Live Traffic Histogram */}
              <div className="p-4 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-electric-accent" />
                    <span>Real-Time Request Throughput (Peak: 1,420 req/s)</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">HEALTHY</span>
                </div>

                {/* Animated Bars */}
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {[45, 62, 58, 80, 92, 70, 85, 95, 60, 78, 88, 100, 75, 85, 90, 70, 95, 82].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${height}%`, `${Math.max(25, (height * 1.1) % 100)}%`, `${height}%`] }}
                      transition={{ duration: 2.2 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-1 bg-gradient-to-t from-electric-accent to-sky-400 rounded-t-sm opacity-85 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>
              </div>

              {/* Security & SSL Badge */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>A+ SSL Rating • JWT Security • SQL Sanitization Enforced</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  SECURE
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MOBILE APP UI PREVIEW */}
          {activeTab === 'mobile' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex justify-center items-center py-2"
            >
              {/* Smartphone Frame */}
              <div className="w-[280px] sm:w-[300px] rounded-[36px] bg-slate-950 border-4 border-slate-700 shadow-2xl p-3.5 relative overflow-hidden">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-between px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                </div>

                {/* Mobile Screen Status Bar */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-2 pt-1 pb-3">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <BatteryMedium className="w-3 h-3" />
                  </div>
                </div>

                {/* Mobile App Screen Content */}
                <div className="rounded-2xl bg-navy-900 border border-slate-800 p-3 space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-bold text-white">Full Stack App</div>
                      <div className="text-[10px] text-slate-400">React + Laravel API</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Active Booking Card */}
                  <div className="p-2.5 rounded-xl bg-electric-accent/15 border border-electric-accent/30 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white">
                      <span>Order #84920</span>
                      <span className="text-electric-300 font-mono">₹4,500</span>
                    </div>
                    <div className="text-[10px] text-slate-300">
                      High-Performance Service Booking Engine
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Instant SMS & WhatsApp Notification</span>
                    </div>
                  </div>

                  {/* Micro Interaction Buttons */}
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      ⚡ 0.8s Load
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800 text-electric-300 border border-slate-700">
                      📱 100% Responsive
                    </div>
                  </div>

                  {/* CTA Button in Phone */}
                  <button className="w-full py-2 rounded-xl bg-electric-accent text-white text-xs font-bold shadow-glow-sm">
                    Live Demo View
                  </button>
                </div>

                {/* Home Indicator Bar */}
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-4" />
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI COPILOT & NEURAL ANIMATION */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* AI Neural Header with Glowing Pulse */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border border-electric-accent/40 shadow-glow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-electric-accent/20 border border-electric-accent flex items-center justify-center text-electric-accent shadow-glow-sm">
                      <Bot className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy-950 animate-ping" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Rahmat AI Architecture Copilot</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-electric-accent text-white font-mono">v3.5</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Real-time interactive intelligence on developer competencies
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-electric-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                  <span>Neural Net Active</span>
                </div>
              </div>

              {/* Interactive Prompts Pills */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click an AI Query to Run:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {aiKnowledgeBase.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAiPrompt(idx)}
                      className={`text-left p-2.5 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center justify-between ${
                        selectedAiIdx === idx
                          ? 'bg-electric-accent/15 border-electric-accent text-white shadow-sm font-semibold'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-2">{item.prompt}</span>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${selectedAiIdx === idx ? 'text-electric-accent' : 'text-slate-500'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Streaming Response Terminal */}
              <div className="p-4 rounded-2xl bg-navy-950/95 border border-slate-800 relative overflow-hidden min-h-[140px] shadow-inner">
                {/* Neural Synapse Glowing Background Node Animation */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-electric-accent/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800/80">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-slate-400">
                    Querying: <strong className="text-slate-200 font-semibold">{aiKnowledgeBase[selectedAiIdx].prompt}</strong>
                  </span>
                </div>

                {isAiThinking ? (
                  <div className="flex items-center gap-2 py-4 text-xs font-mono text-electric-300">
                    <span className="animate-spin">⚙️</span>
                    <span>Synthesizing neural architecture analysis...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {displayedAiText}
                      <span className="inline-block w-1.5 h-4 bg-electric-accent animate-pulse ml-1 align-middle" />
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {aiKnowledgeBase[selectedAiIdx].tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-electric-accent/15 text-electric-300 border border-electric-accent/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: EXECUTIVE PROFILE PHOTO & ACHIEVEMENTS */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="relative group rounded-2xl overflow-hidden aspect-[4/5] max-h-[340px] bg-slate-950 border-2 border-electric-accent/40 shadow-inner mx-auto">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-85 pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-bold shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open for Projects</span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 p-3 rounded-xl bg-slate-900/92 backdrop-blur-md border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white">
                        {personalInfo.name}
                      </h3>
                      <p className="text-xs font-bold text-electric-300">
                        {personalInfo.title}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-electric-accent/25 text-white border border-electric-accent/40">
                      2+ Yrs Exp
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="font-extrabold text-white">2+ Years</div>
                  <div className="text-[11px] text-slate-400">Production Experience</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="font-extrabold text-electric-accent">Dual-Stack</div>
                  <div className="text-[11px] text-slate-400">PHP/Laravel & React/Node</div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </TiltCard>
    </div>
  );
}
