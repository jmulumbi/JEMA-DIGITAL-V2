import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import useDocumentMeta from './hooks/useDocumentMeta';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import {
  Menu,
  X,
  ArrowRight,
  Smartphone,
  Globe,
  ShoppingCart,
  Bot,
  Zap,
  Calendar,
  Wrench,
  Code2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Clock,
  Plus,
  MessageSquare,
  CreditCard,
  ArrowUpRight,
  Sliders,
  Headphones,
  Server,
  HelpCircle,
  Target,
  Compass,
  Award,
  Search,
  Send,
  BookOpen,
  RefreshCw,
  AlertCircle,
  FileText,
  CheckSquare,
} from 'lucide-react';

// ============================================================
// MOTION SYSTEM — centralized tokens so timing/easing stays
// consistent across the whole site instead of ad-hoc values.
// Curve is Apple's "expo-out": fast start, long soft settle.
// ============================================================
const MOTION = {
  ease: [0.16, 1, 0.3, 1],
  duration: {
    micro: 0.18, // small taps/icon nudges
    standard: 0.25, // buttons, links, borders
    reveal: 0.6, // content entering viewport
    large: 0.85, // big hero/visual reveals
    page: 0.45, // route transitions
  },
};

const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap');
      /* ... rest unchanged ... */
    `}
  </style>
);

// (rest of file content omitted here for brevity; keep the app implementation unchanged)

const Home = () => {
  const [activePreviewTab, setActivePreviewTab] = useState('desktop');

  useDocumentMeta({
    title: 'Home — Jema Digital',
    description:
      'Jema Digital engineers high-performing websites, AI assistants, and business automation to help African brands capture leads and grow online.',
    canonical: 'https://jemadigital.netlify.app/',
    ogTitle: 'Jema Digital — Websites, AI & Digital Solutions',
    ogDescription:
      'Engineering high-performing websites, AI assistants, and business automation for African SMEs and growth organisations.',
    ogImage: 'https://jemadigital.netlify.app/jema-digital-logo-hexagon-jd.svg',
    twitterTitle: 'Jema Digital — Websites, AI & Digital Solutions',
    twitterDescription:
      'Engineering high-performing websites, AI assistants, and business automation for African SMEs and growth organisations.',
    twitterImage: 'https://jemadigital.netlify.app/jema-digital-logo-hexagon-jd.svg',
  });

  return (
    <div className="w-full">
      {/* HERO SECTION */}
    </div>
  );
};

// Apply same pattern for Services, Packages, OurWork, Insights, FAQ, About, Contact —
// call useDocumentMeta at the top of each component instead of using <Helmet>.

// ... rest of App component with Routes unchanged ...

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <FontStyles />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-[#FAFAF7]">
        <Navbar />
        <main className="flex-grow page-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/work" element={<OurWork />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
