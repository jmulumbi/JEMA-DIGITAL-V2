import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

// ... (rest of file remains unchanged until first page component definitions)

const Home = () => {
  const [activePreviewTab, setActivePreviewTab] = useState('desktop');

  return (
    <>
      <Helmet>
        <title>Home — Jema Digital</title>
        <meta name="description" content="Jema Digital engineers high-performing websites, AI assistants, and business automation to help African brands capture leads and grow online." />
        <link rel="canonical" href="https://jemadigital.netlify.app/" />
      </Helmet>
      <div className="w-full">
        {/* HERO SECTION */}
        {/* ... rest of Home markup unchanged ... */}
      </div>
    </>
  );
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('websites');

  return (
    <>
      <Helmet>
        <title>Services — Jema Digital</title>
        <meta name="description" content="Services: Business Websites, E-Commerce, AI Solutions, Business Automation, Booking Systems and Maintenance." />
        <link rel="canonical" href="https://jemadigital.netlify.app/services" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... rest unchanged ... */}
      </div>
    </>
  );
};

const Packages = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  // ...
  return (
    <>
      <Helmet>
        <title>Packages — Jema Digital</title>
        <meta name="description" content="Transparent packages and pricing for websites, e-commerce and AI solutions tailored for African businesses." />
        <link rel="canonical" href="https://jemadigital.netlify.app/packages" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... */}
      </div>
    </>
  );
};

const OurWork = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  return (
    <>
      <Helmet>
        <title>Our Work — Jema Digital</title>
        <meta name="description" content="Concepts and showcase projects demonstrating Jema Digital's UI/UX and technical systems." />
        <link rel="canonical" href="https://jemadigital.netlify.app/work" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... */}
      </div>
    </>
  );
};

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  return (
    <>
      <Helmet>
        <title>Insights — Jema Digital</title>
        <meta name="description" content="Articles and strategy guides to help businesses leverage websites, SEO and AI for growth." />
        <link rel="canonical" href="https://jemadigital.netlify.app/insights" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... */}
      </div>
    </>
  );
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 'web-1': true, 'host-1': false });
  return (
    <>
      <Helmet>
        <title>FAQ — Jema Digital</title>
        <meta name="description" content="Frequently asked questions about Jema Digital's services, pricing, hosting and mobile money integrations." />
        <link rel="canonical" href="https://jemadigital.netlify.app/faq" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... */}
      </div>
    </>
  );
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — Jema Digital</title>
        <meta name="description" content="About Jema Digital — mission, vision and why businesses in East Africa choose our web and AI engineering services." />
        <link rel="canonical" href="https://jemadigital.netlify.app/about" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... */}
      </div>
    </>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    serviceNeeded: 'Business Website',
    budget: 'UGX 1M–3M',
    timeline: 'Within 2 Weeks',
    message: '',
  });
  return (
    <>
      <Helmet>
        <title>Contact — Jema Digital</title>
        <meta name="description" content="Contact Jema Digital for a free consultation about websites, AI and digital automation." />
        <link rel="canonical" href="https://jemadigital.netlify.app/contact" />
      </Helmet>
      <div className="min-h-screen bg-[#FAFAF7]">
        {/* ... */}
      </div>
    </>
  );
};

// At the end, remove the internal Router wrapper — main.tsx now provides BrowserRouter
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
