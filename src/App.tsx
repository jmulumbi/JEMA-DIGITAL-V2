import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, MotionConfig } from 'motion/react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
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
      
      :root {
        --navy: #08131F;
        --teal: #00D6B4;
        --orange: #F26A3D;
        --sand: #F2E9D8;
        --charcoal: #17232D;
        --off-white: #FAFAF7;
        --white: #FFFFFF;
        --radius-sm: 10px;
        --radius-md: 20px;
        --radius-lg: 30px;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
        text-rendering: optimizeLegibility;
      }

      body {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background-color: var(--off-white);
        color: var(--navy);
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Focus styling for accessibility */
      a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
        outline: 2px solid #00D6B4;
        outline-offset: 2px;
      }

      /* Premium custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #08131F; 
      }
      ::-webkit-scrollbar-thumb {
        background: #17232D; 
        border-radius: 4px;
        border: 1px solid rgba(0, 214, 180, 0.2);
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #00D6B4; 
      }

      /* Subtle grid background pattern */
      .bg-grid-pattern {
        background-image: radial-gradient(rgba(0, 214, 180, 0.12) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      /* Organic flowing shape accents */
      .organic-blob-1 {
        background: radial-gradient(circle, rgba(0,214,180,0.15) 0%, rgba(242,106,61,0.05) 70%, transparent 100%);
        filter: blur(80px);
      }

      .organic-blob-2 {
        background: radial-gradient(circle, rgba(242,106,61,0.12) 0%, rgba(8,19,31,0) 70%);
        filter: blur(100px);
      }

      /* Floating animation */
      @keyframes floatSlow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(0.5deg); }
      }

      .animate-float {
        animation: floatSlow 6s ease-in-out infinite;
      }

      @keyframes pulseGlow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }

      .animate-pulse-glow {
        animation: pulseGlow 4s ease-in-out infinite;
      }

      /* Premium motion system */
      :root {
        --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
        --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
      }

      .motion-reveal {
        opacity: 0;
        transform: translate3d(0, 28px, 0);
        transition: opacity 800ms var(--ease-out-expo), transform 800ms var(--ease-out-expo);
        will-change: opacity, transform;
      }

      .motion-reveal.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .motion-reveal-mask {
        overflow: hidden;
        display: block;
      }

      .motion-reveal-mask > span {
        display: block;
        transform: translate3d(0, 105%, 0);
        transition: transform 950ms var(--ease-out-expo);
        will-change: transform;
      }

      .motion-reveal-mask.is-visible > span {
        transform: translate3d(0, 0, 0);
      }

      .motion-stagger > * {
        opacity: 0;
        transform: translate3d(0, 18px, 0);
        transition: opacity 650ms var(--ease-out-expo), transform 650ms var(--ease-out-expo);
      }

      .motion-stagger.is-visible > * { opacity: 1; transform: translate3d(0, 0, 0); }
      .motion-stagger.is-visible > *:nth-child(2) { transition-delay: 80ms; }
      .motion-stagger.is-visible > *:nth-child(3) { transition-delay: 160ms; }
      .motion-stagger.is-visible > *:nth-child(4) { transition-delay: 240ms; }
      .motion-stagger.is-visible > *:nth-child(5) { transition-delay: 320ms; }
      .motion-stagger.is-visible > *:nth-child(6) { transition-delay: 400ms; }

      .motion-card {
        transition: transform 260ms var(--ease-out-expo), box-shadow 260ms var(--ease-out-expo), border-color 250ms ease, background-color 250ms ease;
        will-change: transform;
      }

      .motion-card:hover { transform: translate3d(0, -5px, 0); }

      .motion-spotlight::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        transition: opacity 350ms ease;
        background: radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0,214,180,0.10), transparent 65%);
      }

      .motion-spotlight:hover::after { opacity: 1; }

      .page-enter { animation: pageEnter 450ms var(--ease-out-expo) both; }
      @keyframes pageEnter {
        from { opacity: 0; transform: translate3d(0, 10px, 0); }
        to { opacity: 1; transform: translate3d(0, 0, 0); }
      }

      .ambient-orbit { animation: ambientOrbit 16s ease-in-out infinite alternate; will-change: transform; }
      @keyframes ambientOrbit {
        from { transform: translate3d(-12px, 8px, 0) scale(1); }
        to { transform: translate3d(14px, -12px, 0) scale(1.04); }
      }

      .button-sheen { position: relative; overflow: hidden; }
      .button-sheen::after {
        content: '';
        position: absolute;
        top: -80%; left: -120%; width: 55%; height: 260%;
        transform: rotate(20deg);
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
        transition: left 700ms var(--ease-out-expo);
        pointer-events: none;
      }
      .button-sheen:hover::after { left: 150%; }

      .modal-backdrop { animation: modalBackdrop 350ms ease both; }
      .modal-panel { animation: modalPanel 500ms var(--ease-out-expo) both; }
      @keyframes modalBackdrop { from { opacity: 0; } to { opacity: 1; } }
      @keyframes modalPanel { from { opacity: 0; transform: scale(.96) translate3d(0, 16px, 0); } to { opacity: 1; transform: scale(1) translate3d(0, 0, 0); } }

      @media (hover: hover) and (pointer: fine) {
        .magnetic-button { transition: transform 220ms var(--ease-smooth); }
      }

      /* Reduced motion accessibility */
      @media (max-width: 767px) {
        .ambient-orbit { animation: none; }
        .motion-card:hover { transform: translate3d(0, -3px, 0); }
      }

      @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}
  </style>
);

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`motion-reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const Stagger = ({ children, className = '' }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`motion-stagger ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const SpotlightCard = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`motion-card motion-spotlight ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AnimatedNumber = ({ value, formatter = (n) => n.toLocaleString() }) => {
  const [ref, visible] = useInView();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 800;
    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [visible, value]);
  return <span ref={ref}>{formatter(display)}</span>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const Button = ({
  children,
  variant = 'primary',
  className = '',
  to,
  href,
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-bold text-sm tracking-wide cursor-pointer focus:outline-none select-none min-h-[46px] rounded-[12px] button-sheen';

  const variants = {
    primary:
      'bg-[#00D6B4] text-[#08131F] hover:bg-[#F2E9D8] hover:text-[#08131F] px-7 py-3 shadow-[0_4px_20px_rgba(0,214,180,0.25)] hover:shadow-[0_6px_25px_rgba(0,214,180,0.4)] border border-[#00D6B4]',
    secondary:
      'bg-transparent border-2 border-[#00D6B4] text-[#00D6B4] hover:bg-[#00D6B4] hover:text-[#08131F] px-7 py-3',
    dark: 'bg-[#17232D] text-white hover:bg-[#00D6B4] hover:text-[#08131F] px-7 py-3 border border-[#17232D] hover:border-[#00D6B4] shadow-sm',
    light:
      'bg-white text-[#08131F] hover:bg-[#00D6B4] hover:text-[#08131F] px-7 py-3 border border-[#17232D]/10 shadow-sm',
    accent:
      'bg-[#F26A3D] text-white hover:bg-[#08131F] px-7 py-3 border border-[#F26A3D] shadow-sm',
  };

  const combinedClasses = `${baseStyle} ${
    variants[variant] || variants.primary
  } ${className}`;

  const spring = { type: 'spring', stiffness: 400, damping: 25, mass: 0.6 };

  const motionProps = {
    whileHover: { y: -4, scale: 1.015 },
    whileTap: { scale: 0.97, y: 0 },
    transition: spring,
  };

  if (to) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={to}
        className={combinedClasses}
        aria-label={ariaLabel}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        aria-label={ariaLabel}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const PageHeader = ({ title, subtitle, breadcrumb }) => (
  <div className="bg-[#08131F] text-[#FAFAF7] pt-32 md:pt-40 pb-16 md:pb-24 px-6 relative overflow-hidden border-b border-[#17232D]">
    <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] organic-blob-1 rounded-full pointer-events-none"></div>
    <div className="absolute bottom-0 left-10 w-[400px] h-[400px] organic-blob-2 rounded-full pointer-events-none"></div>

    <div className="max-w-7xl mx-auto relative z-10 page-enter">
      {breadcrumb && (
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D6B4] mb-4">
          <span>Jema Digital</span>
          <ChevronRight size={14} className="text-[#FAFAF7]/40" />
          <span className="text-[#FAFAF7]/80">{breadcrumb}</span>
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight text-white max-w-4xl leading-[1.15]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl max-w-3xl text-[#FAFAF7]/80 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Our Work', path: '/work' },
    { name: 'Insights', path: '/insights' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08131F]/90 backdrop-blur-xl border-b border-[#17232D] shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-3.5'
          : 'bg-[#08131F]/95 backdrop-blur-md border-b border-[#17232D] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 group py-1 focus:outline-none"
            aria-label="Jema Digital Homepage"
          >
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-[#FAFAF7] transition-colors">
              JEMA
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-[#00D6B4]">
              DIGITAL
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            aria-label="Main Navigation"
          >
            {links.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all duration-200 py-1.5 relative group ${
                    active
                      ? 'text-[#00D6B4]'
                      : 'text-white/90 hover:text-[#00D6B4]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00D6B4] rounded-full transition-all duration-300 transform ${
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              to="/contact"
              variant="primary"
              className="!px-5 !py-2.5 !text-xs font-bold uppercase tracking-wider"
            >
              Free Consultation
            </Button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="lg:hidden text-white hover:text-[#00D6B4] p-2 focus:outline-none transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-[#08131F] border-t border-[#17232D] shadow-2xl page-enter">
          <div className="px-6 py-6 space-y-3 flex flex-col max-h-[85vh] overflow-y-auto">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-3 px-3 text-base font-bold rounded-[10px] transition-all border-l-2 ${
                  isActive(link.path)
                    ? 'text-[#00D6B4] bg-[#17232D]/70 border-[#00D6B4]'
                    : 'text-white hover:text-[#00D6B4] border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-6 border-t border-[#17232D] space-y-3">
              <Button
                to="/contact"
                variant="primary"
                className="w-full text-center"
              >
                Get a Free Consultation
              </Button>
              <Button
                href="https://wa.me/256700000000"
                variant="secondary"
                className="w-full text-center"
              >
                <MessageSquare size={16} className="mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#08131F] text-white border-t border-[#17232D] pt-16 md:pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 organic-blob-1 rounded-full pointer-events-none opacity-40"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 mb-16">
          {/* Brand & Value Proposition */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 inline-block focus:outline-none"
            >
              <span className="text-2xl font-extrabold tracking-tight text-white">
                JEMA
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-[#00D6B4]">
                DIGITAL
              </span>
            </Link>
            <p className="text-sm font-semibold text-[#FAFAF7]/90 italic">
              "Because Digital Should Work For Your Business."
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#00D6B4]">
              Websites, AI & Digital Solutions
            </p>
            <p className="text-xs text-[#FAFAF7]/70 leading-relaxed">
              Engineering reliable, high-converting digital platforms for
              ambitious African businesses, SMEs, and growth organizations.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#17232D] rounded-[10px] text-white hover:text-[#00D6B4] hover:bg-[#17232D]/80 transition-all hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#17232D] rounded-[10px] text-white hover:text-[#00D6B4] hover:bg-[#17232D]/80 transition-all hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#17232D] rounded-[10px] text-white hover:text-[#00D6B4] hover:bg-[#17232D]/80 transition-all hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] mb-5">
              Quick Links
            </h2>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services Overview', path: '/services' },
                { name: 'Transparent Packages', path: '/packages' },
                { name: 'Our Work & Concepts', path: '/work' },
                { name: 'Insights & Guides', path: '/insights' },
                { name: 'Frequently Asked Questions', path: '/faq' },
                { name: 'About Jema Digital', path: '/about' },
                { name: 'Get in Touch', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#FAFAF7]/70 hover:text-[#00D6B4] transition-colors text-sm font-medium inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-[#00D6B4] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Services */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] mb-5">
              Core Capabilities
            </h2>
            <ul className="space-y-2.5 text-sm text-[#FAFAF7]/70 font-medium">
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00D6B4] transition-colors"
                >
                  Business Websites
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00D6B4] transition-colors"
                >
                  E-Commerce & Mobile Money
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00D6B4] transition-colors"
                >
                  AI Chatbots & Assistants
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00D6B4] transition-colors"
                >
                  Workflow & Lead Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00D6B4] transition-colors"
                >
                  Online Booking & Scheduling
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00D6B4] transition-colors"
                >
                  Managed Website Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] mb-5">
              Reach Us Directly
            </h2>
            <ul className="space-y-4 text-sm text-[#FAFAF7]/80">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#00D6B4] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">
                    +256 789 519 520
                  </span>
                  <span className="text-xs text-[#FAFAF7]/50">
                    Phone & WhatsApp Support
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#00D6B4] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">
                    info@jemadigital.com
                  </span>
                  <span className="text-xs text-[#FAFAF7]/50">
                    24-Hour Inquiry Response
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#00D6B4] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">
                    Kampala, Uganda
                  </span>
                  <span className="text-xs text-[#FAFAF7]/50">
                    Serving Clients Regionally
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="border-t border-[#17232D] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#FAFAF7]/50">
          <p>© {new Date().getFullYear()} Jema Digital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-[#00D6B4] transition-colors">
              FAQ
            </Link>
            <Link
              to="/about"
              className="hover:text-[#00D6B4] transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#00D6B4] transition-colors"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const [activePreviewTab, setActivePreviewTab] = useState('desktop');

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-[#08131F] pt-36 pb-24 md:pt-44 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>

        {/* Glow Spheres & Organic Accents */}
        <div className="absolute top-1/4 -right-10 w-[500px] h-[500px] organic-blob-1 rounded-full pointer-events-none animate-pulse-glow ambient-orbit"></div>
        <div className="absolute bottom-5 -left-20 w-[450px] h-[450px] organic-blob-2 rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Hero Copy */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial="hidden"
            animate="show"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.reveal,
                ease: MOTION.ease,
                delay: 0,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#17232D] rounded-[10px] border border-[#00D6B4]/30 text-[#00D6B4] text-xs font-bold uppercase tracking-wider shadow-sm animate-float"
            >
              <Sparkles size={14} className="text-[#00D6B4]" />
              <span>Websites • AI • Automation • Digital Systems</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.reveal,
                ease: MOTION.ease,
                delay: 0.08,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight"
            >
              Your Business Deserves a{' '}
              <span className="text-[#00D6B4] underline decoration-[#00D6B4]/40 underline-offset-8">
                Better
              </span>{' '}
              Digital Presence.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.reveal,
                ease: MOTION.ease,
                delay: 0.16,
              }}
              className="text-base sm:text-lg md:text-xl text-[#FAFAF7]/85 font-normal leading-relaxed max-w-2xl"
            >
              We engineer high-performing websites, intelligent chatbots, and
              business automation that help African brands look professional,
              capture qualified leads, and grow revenue online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.reveal,
                ease: MOTION.ease,
                delay: 0.24,
              }}
              className="flex flex-col sm:flex-row gap-4 pt-3"
            >
              <Button to="/contact" variant="primary" className="group">
                <span>Get a Free Consultation</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1.5 transition-transform"
                  size={18}
                />
              </Button>
              <Button to="/services" variant="secondary">
                Explore Our Services
              </Button>
            </motion.div>

            <Stagger className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[#FAFAF7]/70 font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00D6B4]" />{' '}
                Mobile-First Design
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00D6B4]" /> Fast Local
                Loading
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00D6B4]" />{' '}
                Transparent Pricing
              </span>
            </Stagger>
          </motion.div>

          {/* Interactive Responsive Digital System Mockup */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: MOTION.duration.large,
              ease: MOTION.ease,
              delay: 0.18,
            }}
          >
            <div className="animate-float" style={{ animationDuration: '7s' }}>
              <div className="bg-[#17232D] p-3.5 rounded-[24px] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
                <div className="flex items-center justify-between bg-[#08131F] px-4 py-3 rounded-t-[16px] border-b border-white/10 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#F26A3D]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#F2E9D8]/50"></div>
                    <div className="w-3 h-3 rounded-full bg-[#00D6B4]"></div>
                  </div>
                  <div className="flex bg-[#17232D] rounded-[8px] p-0.5 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                    <button
                      onClick={() => setActivePreviewTab('desktop')}
                      className={`px-3 py-1 rounded-[6px] transition-all ${
                        activePreviewTab === 'desktop'
                          ? 'bg-[#00D6B4] text-[#08131F]'
                          : 'hover:text-[#00D6B4]'
                      }`}
                    >
                      Portal View
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('mobile')}
                      className={`px-3 py-1 rounded-[6px] transition-all ${
                        activePreviewTab === 'mobile'
                          ? 'bg-[#00D6B4] text-[#08131F]'
                          : 'hover:text-[#00D6B4]'
                      }`}
                    >
                      Mobile View
                    </button>
                  </div>
                </div>

                {/* Dynamic UI Content Box */}
                <div className="bg-[#FAFAF7] text-[#08131F] p-5 sm:p-6 rounded-b-[18px] min-h-[360px] flex flex-col justify-between transition-all duration-500">
                  {activePreviewTab === 'desktop' ? (
                    <div className="space-y-4">
                      <div className="bg-[#08131F] text-white p-4 rounded-[14px] flex justify-between items-center border-l-4 border-[#00D6B4] shadow-sm">
                        <div>
                          <div className="text-[10px] font-bold text-[#00D6B4] uppercase tracking-wider">
                            Active Platform
                          </div>
                          <div className="text-sm font-extrabold">
                            Corporate Web & Lead System
                          </div>
                        </div>
                        <Globe size={24} className="text-[#00D6B4]" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3.5 rounded-[12px] border border-[#17232D]/10 shadow-sm">
                          <div className="text-[10px] uppercase font-bold text-[#17232D]/60">
                            Lead Capture Rate
                          </div>
                          <div className="text-lg font-extrabold text-[#08131F]">
                            +34%
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-[#00D6B4] h-1.5 w-[75%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="bg-white p-3.5 rounded-[12px] border border-[#17232D]/10 shadow-sm">
                          <div className="text-[10px] uppercase font-bold text-[#17232D]/60">
                            AI Support Automated
                          </div>
                          <div className="text-lg font-extrabold text-[#08131F]">
                            24/7 Live
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-[#F26A3D] h-1.5 w-[90%] rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#08131F]/5 p-3.5 rounded-[12px] border border-[#17232D]/10 text-xs space-y-2">
                        <div className="flex items-center justify-between font-bold text-[#08131F]">
                          <span className="flex items-center gap-1.5">
                            <Bot size={14} className="text-[#00D6B4]" /> AI
                            Assistant Active
                          </span>
                          <span className="text-[10px] bg-[#00D6B4] text-[#08131F] px-2 py-0.5 font-bold rounded-full">
                            LIVE
                          </span>
                        </div>
                        <p className="text-[#17232D]/80 text-[11px] leading-tight">
                          "Hello! I can answer questions about business pricing,
                          service features, or schedule a call."
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[240px] mx-auto w-full bg-[#08131F] text-white p-4 rounded-[18px] border border-[#00D6B4]/30 space-y-3 shadow-xl">
                      <div className="text-center pb-2 border-b border-white/10">
                        <div className="text-xs font-bold text-[#00D6B4]">
                          JEMA DIGITAL MOBILE
                        </div>
                        <div className="text-[10px] text-white/70">
                          Optimized for smartphones
                        </div>
                      </div>
                      <div className="bg-[#17232D] p-3 rounded-[12px] text-center text-xs">
                        <Smartphone
                          size={18}
                          className="mx-auto mb-1 text-[#00D6B4]"
                        />
                        <span className="font-bold block">100% Responsive</span>
                        <span className="text-[10px] text-white/70">
                          Fast loading on 3G/4G networks
                        </span>
                      </div>
                      <Button
                        to="/contact"
                        variant="primary"
                        className="w-full text-center !py-2 !text-xs !rounded-[10px]"
                      >
                        Instant WhatsApp
                      </Button>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#17232D]/10 flex justify-between items-center text-[11px] font-bold text-[#17232D]/70">
                    <span>Custom Engineering</span>
                    <span className="text-[#00D6B4] flex items-center gap-1">
                      Ready to Deploy <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND DESCRIPTOR STRIP */}
      <div className="bg-[#08131F] border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#FAFAF7]/70 font-bold tracking-widest text-xs uppercase flex flex-wrap justify-center items-center gap-y-2">
          <span>Websites</span>
          <span className="mx-4 text-[#00D6B4]">•</span>
          <span>AI Solutions</span>
          <span className="mx-4 text-[#00D6B4]">•</span>
          <span>Business Automation</span>
          <span className="mx-4 text-[#00D6B4]">•</span>
          <span>Digital Systems</span>
        </div>
      </div>

      {/* CORE VALUE PILLARS */}
      <section className="bg-[#17232D] py-20 text-white border-b border-[#08131F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="pt-4 sm:pt-0 sm:px-6 space-y-3 text-center group cursor-default transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#08131F] rounded-[16px] flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#00D6B4] transition-colors">
                <Smartphone className="text-[#00D6B4]" size={28} />
              </div>
              <h2 className="text-base font-extrabold tracking-wide text-white">
                Mobile-First
              </h2>
              <p className="text-xs text-[#FAFAF7]/60">
                Flawless display across smartphones & devices
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-6 space-y-3 text-center group cursor-default transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#08131F] rounded-[16px] flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#00D6B4] transition-colors">
                <Code2 className="text-[#00D6B4]" size={28} />
              </div>
              <h2 className="text-base font-extrabold tracking-wide text-white">
                Custom Engineering
              </h2>
              <p className="text-xs text-[#FAFAF7]/60">
                Built specifically around your operational goals
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-6 space-y-3 text-center group cursor-default transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#08131F] rounded-[16px] flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#00D6B4] transition-colors">
                <Zap className="text-[#00D6B4]" size={28} />
              </div>
              <h2 className="text-base font-extrabold tracking-wide text-white">
                Fast Delivery
              </h2>
              <p className="text-xs text-[#FAFAF7]/60">
                Rapid turnaround without compromising quality
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-6 space-y-3 text-center group cursor-default transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#08131F] rounded-[16px] flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#00D6B4] transition-colors">
                <Wrench className="text-[#00D6B4]" size={28} />
              </div>
              <h2 className="text-base font-extrabold tracking-wide text-white">
                Ongoing Support
              </h2>
              <p className="text-xs text-[#FAFAF7]/60">
                Continuous maintenance, hosting & security updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW GRID */}
      <section className="bg-[#FAFAF7] py-28 border-b border-[#17232D]/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-18 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] bg-[#08131F] px-4 py-1.5 rounded-[8px] inline-block shadow-sm">
              What We Do
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#08131F] tracking-tight">
              Digital Solutions Built Around Your Business
            </h2>
            <p className="text-base md:text-lg text-[#17232D]/70 font-normal">
              We design and construct digital tools that address real business
              challenges, establish instant market credibility, and streamline
              operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Business Websites',
                desc: 'High-performing, responsive websites designed to establish credibility, attract search traffic, and convert visitors into clients.',
              },
              {
                icon: ShoppingCart,
                title: 'E-Commerce Systems',
                desc: 'Online stores with product cataloguing, mobile money checkout (MTN MoMo, Airtel), card integration, and order management.',
              },
              {
                icon: Bot,
                title: 'AI Solutions',
                desc: 'Custom-trained AI chatbots and assistants that answer customer questions 24/7, qualify leads, and handle routine queries.',
              },
              {
                icon: Zap,
                title: 'Business Automation',
                desc: 'Connect your forms, emails, and WhatsApp to automate repetitive manual tasks, follow-ups, and customer notifications.',
              },
              {
                icon: Calendar,
                title: 'Booking & Customer Systems',
                desc: 'Intuitive scheduling tools that allow clients to book appointments, select service packages, and receive SMS/email reminders.',
              },
              {
                icon: Wrench,
                title: 'Website Maintenance & Upkeep',
                desc: 'Proactive care including cloud backups, security patching, page speed optimization, and regular content edits.',
              },
            ].map((service, idx) => (
              <SpotlightCard
                key={idx}
                className="bg-white p-8 md:p-10 rounded-[22px] border border-[#17232D]/10 hover:border-[#00D6B4]/60 shadow-sm hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00D6B4]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div>
                  <div className="w-16 h-16 bg-[#08131F] text-[#00D6B4] rounded-[18px] flex items-center justify-center mb-6 group-hover:bg-[#00D6B4] group-hover:text-[#08131F] transition-all duration-300 shadow-sm">
                    <service.icon size={30} />
                  </div>
                  <h3 className="text-xl font-bold text-[#08131F] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#17232D]/70 leading-relaxed mb-8">
                    {service.desc}
                  </p>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center text-xs font-bold text-[#08131F] group-hover:text-[#00D6B4] transition-colors uppercase tracking-wider"
                >
                  <span>Learn More</span>
                  <ChevronRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1.5 transition-transform"
                  />
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="bg-[#08131F] text-white py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] organic-blob-1 rounded-full pointer-events-none opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-18 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] bg-[#17232D] px-4 py-1.5 rounded-[8px] inline-block">
              Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              From Strategy to Execution
            </h2>
            <p className="text-sm text-[#FAFAF7]/70">
              Our structured 4-step approach ensures your project is delivered
              on schedule with total clarity.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 motion-stagger is-visible">
            {[
              {
                num: '01',
                title: 'Discovery',
                desc: 'We analyze your business model, target audience, and key commercial goals.',
              },
              {
                num: '02',
                title: 'Strategy & Design',
                desc: 'We structure wireframes, plan user flows, and craft a brand-aligned UI.',
              },
              {
                num: '03',
                title: 'Development',
                desc: 'We engineer fast, secure, mobile-first code with custom integrations.',
              },
              {
                num: '04',
                title: 'Launch & Support',
                desc: 'We test, deploy to cloud hosting, and provide ongoing technical care.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-[#17232D] p-8 md:p-10 rounded-[22px] border border-white/10 relative group hover:border-[#00D6B4] transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div className="text-4xl font-extrabold text-[#00D6B4] mb-4 opacity-90">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-[#FAFAF7]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVERSION CTA BANNER */}
      <section className="bg-[#08131F] py-28 text-center border-t border-[#17232D] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] organic-blob-1 rounded-full pointer-events-none opacity-40"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build Something Better?
          </h2>
          <p className="text-base sm:text-lg text-[#FAFAF7]/80 max-w-2xl mx-auto font-normal">
            Tell us what you are trying to achieve and we will help you engineer
            the right digital solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button to="/contact" variant="primary">
              Get a Free Consultation
            </Button>
            <Button href="https://wa.me/256700000000" variant="secondary">
              <MessageSquare size={16} className="mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('websites');

  const servicesList = [
    {
      id: 'websites',
      icon: Globe,
      badge: 'Core Digital Presence',
      title: 'Business Websites',
      subtitle:
        'Establish immediate credibility and turn site visitors into paying clients.',
      forWho:
        'SMEs, professional service providers, corporate firms, consultancies & agencies.',
      description:
        'Your website is often the very first interaction a client has with your business. We build ultra-fast, mobile-optimized websites designed to showcase your brand with authority, build trust, and capture client enquiries effectively.',
      features: [
        '100% Mobile & Tablet Responsive Engineering',
        'Custom Brand UI/UX & Typography Styling',
        'High-Converting Contact & Lead Generation Forms',
        'Direct WhatsApp Chat Integration Button',
        'Embedded Google Maps & Business Directions',
        'On-Page Search Engine Optimization (SEO)',
        'Google Analytics & Traffic Insight Setup',
        'Optimized Cloud Image & Asset Delivery',
      ],
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      badge: 'Online Sales & Payments',
      title: 'E-Commerce Systems',
      subtitle:
        'Sell products around the clock with seamless mobile money and card payments.',
      forWho:
        'Retailers, boutiques, wholesalers, manufacturers & digital product creators.',
      description:
        'Expand your retail footprint beyond physical shop locations. We build online stores that make product discovery effortless, streamline customer checkout, and accept direct mobile money payments.',
      features: [
        'Visual Product Catalogues with Category Filters',
        'Mobile Money Gateways (MTN MoMo & Airtel Money)',
        'Visa, Mastercard & Local Payment Gateways',
        'Mobile-Optimized Cart & One-Page Checkout',
        'Automated Customer Order Receipt Emails',
        'Inventory Management & Low-Stock Alerts',
      ],
    },
    {
      id: 'ai',
      icon: Bot,
      badge: 'Practical Intelligence',
      title: 'AI Solutions',
      subtitle:
        'Automate customer support and enquiry handling with custom AI tools.',
      forWho:
        'High-enquiry service businesses, real estate, hotels, schools & consultancies.',
      description:
        'We build practical AI virtual assistants trained specifically on your company’s knowledge base, price list, and FAQs to answer client questions instantly—24 hours a day.',
      features: [
        'Custom-Trained AI Chatbots for Web & WhatsApp',
        '24/7 Automated Customer FAQ & Support Assistant',
        'Automatic Lead Capture & Contact Qualification',
        'Multi-Language & Localized Communication Capabilities',
        'Internal Team Knowledge Retrieval Workflows',
      ],
    },
    {
      id: 'automation',
      icon: Zap,
      badge: 'Operational Efficiency',
      title: 'Business Automation',
      subtitle:
        'Eliminate repetitive manual admin work and speed up customer follow-ups.',
      forWho:
        'Growing organizations managing high inquiry volumes or complex manual tasks.',
      description:
        'Save hours every week by connecting your web forms, emails, databases, and messaging channels into unified automated workflows that eliminate manual data entry.',
      features: [
        'Instant Lead Capture & Auto-Reply Email/SMS',
        'Automated WhatsApp Confirmation Messages',
        'Web Form Submissions Synced to Spreadsheets/CRM',
        'Automated Quote & Invoice Receipt Generation',
        'Custom Workflow Integration Across Business Apps',
      ],
    },
    {
      id: 'booking',
      icon: Calendar,
      badge: 'Scheduling Systems',
      title: 'Booking & Customer Systems',
      subtitle:
        'Allow clients to book appointments, services, or consultations online.',
      forWho:
        'Salons, clinics, repair centers, legal consultants & service providers.',
      description:
        'Eliminate scheduling errors and phone tag with an organized online booking portal. Allow clients to view live availability, select specific services, and receive automated reminders.',
      features: [
        'Interactive Calendar with Real-Time Availability',
        'Automated SMS & Email Appointment Reminders',
        'Service Selection & Staff Scheduling Customization',
        'Advance Deposit or Mobile Money Payment Options',
        'Client Management Logs & Appointment Tracking',
      ],
    },
    {
      id: 'maintenance',
      icon: Wrench,
      badge: 'Security & Upkeep',
      title: 'Website Maintenance & Care',
      subtitle:
        'Keep your digital platform fast, secure, backed up, and updated.',
      forWho:
        'Any business seeking technical peace of mind without hiring in-house IT staff.',
      description:
        'A professional website requires routine technical care to remain fast and secure. We handle core updates, cloud backups, speed tuning, and monthly content changes for you.',
      features: [
        'Regular Core, Plugin & Theme Security Patching',
        'Automated Daily/Weekly Cloud Backups',
        '24/7 Uptime Monitoring & Threat Prevention',
        'Database Cleaning & Page Speed Tuning',
        'Monthly Content Updates & Technical Support',
      ],
    },
  ];

  const scrollToService = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="Services"
        title="Digital Solutions Built Around Your Business"
        subtitle="From foundational business websites to custom AI chatbots and automated workflows, we build reliable tools that solve operational challenges."
      />

      {/* Jump Navigation Bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[#17232D]/10 shadow-sm py-3.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex space-x-2.5 min-w-max">
          {servicesList.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToService(s.id)}
              className={`px-4 py-2 text-xs font-bold transition-all rounded-[10px] flex items-center space-x-2 cursor-pointer ${
                activeTab === s.id
                  ? 'bg-[#08131F] text-[#00D6B4] shadow-sm'
                  : 'bg-[#FAFAF7] text-[#17232D]/70 hover:bg-[#F2E9D8] hover:text-[#08131F]'
              }`}
            >
              <s.icon size={14} />
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Service Content Cards */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-16">
        {servicesList.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="scroll-mt-36 bg-white border border-[#17232D]/10 rounded-[26px] p-8 md:p-14 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#08131F] via-[#00D6B4] to-[#08131F]"></div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F2E9D8] rounded-[8px] text-[#08131F] text-xs font-bold uppercase tracking-wider">
                  <service.icon size={14} className="text-[#08131F]" />
                  <span>{service.badge}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#08131F] tracking-tight">
                  {service.title}
                </h2>

                <p className="text-base sm:text-lg font-bold text-[#00D6B4] leading-snug">
                  {service.subtitle}
                </p>

                <p className="text-sm sm:text-base text-[#17232D]/80 leading-relaxed">
                  {service.description}
                </p>

                <div className="bg-[#FAFAF7] p-5 rounded-[16px] border-l-4 border-[#08131F] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#17232D]/60 block">
                    Ideal For
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#08131F]">
                    {service.forWho}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#08131F] text-white p-6 sm:p-9 rounded-[20px] flex flex-col justify-between h-full border border-white/10 shadow-lg">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#00D6B4] mb-5 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>Key Package Capabilities</span>
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-xs sm:text-sm text-[#FAFAF7]/90 leading-snug"
                      >
                        <Check
                          size={16}
                          className="text-[#00D6B4] shrink-0 mr-3 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button
                    to="/contact"
                    variant="primary"
                    className="w-full text-xs font-bold uppercase tracking-wider !rounded-[12px]"
                  >
                    Get a Free Consultation
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Packages = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);

  const addonList = [
    { id: 'momo', name: 'Mobile Money (MoMo/Airtel) Setup', price: 400000 },
    { id: 'ai', name: 'Custom AI Assistant Training', price: 600000 },
    { id: 'booking', name: 'Online Booking System Integration', price: 350000 },
    {
      id: 'maintenance',
      name: 'Annual Care & Maintenance Plan',
      price: 500000,
    },
  ];

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculatedAddonTotal = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const item = addonList.find((a) => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
  }, [selectedAddons]);

  const formatUGX = (amount) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const corePackages = [
    {
      id: 'starter',
      name: 'STARTER',
      tagline:
        'Ideal for small businesses establishing a clean, professional online presence.',
      price: 'UGX 800,000',
      popular: false,
      features: [
        'Up to 5 Pages (Home, About, Services, Contact, etc.)',
        '100% Mobile & Tablet Responsive Layout',
        'Custom Brand Identity & Typography Setup',
        'Direct WhatsApp Chat Integration Button',
        'Interactive Contact Form with Email Alerts',
        'Google Maps & Business Location Embed',
        'Basic On-Page SEO Setup',
        'Website Launch & Deployment',
      ],
      ctaText: 'Get Started',
      variant: 'dark',
    },
    {
      id: 'business',
      name: 'BUSINESS',
      tagline:
        'For growing companies looking to attract leads, accept enquiries & rank better.',
      price: 'UGX 2,000,000',
      popular: true,
      badge: 'MOST POPULAR',
      features: [
        'Up to 10 Custom Designed Web Pages',
        'Custom High-Converting UI/UX Interface',
        'Easy Content Management System (CMS)',
        'Integrated Blog / News Section',
        'Online Booking or Customer Enquiry System',
        'WhatsApp Lead Capture Integration',
        'Comprehensive On-Page SEO & Keyword Setup',
        '1 Month Dedicated Complimentary Support',
      ],
      ctaText: 'Choose Business',
      variant: 'primary',
    },
    {
      id: 'growth',
      name: 'GROWTH / CUSTOM',
      tagline:
        'For advanced business requirements, e-commerce stores, AI & custom logic.',
      price: 'UGX 5,000,000',
      popular: false,
      features: [
        'Custom Digital System Architecture',
        'Full E-Commerce Store or Online Catalogue',
        'Payment Gateway Integration (MoMo, Cards)',
        'Customer Account Portals & Dashboards',
        'Custom AI Chatbot or FAQ Assistant',
        'Automated Workflow & Lead Integrations',
        'Priority Technical Support & Training',
      ],
      ctaText: 'Discuss Your Project',
      variant: 'dark',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="Packages"
        title="Transparent Packages. Clear Value."
        subtitle="Choose a baseline package and customize it to match your exact business requirements."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Core Packages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-20">
          {corePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white flex flex-col justify-between p-8 md:p-10 rounded-[26px] border transition-all duration-300 relative ${
                pkg.popular
                  ? 'border-2 border-[#00D6B4] shadow-2xl md:-translate-y-2'
                  : 'border-[#17232D]/15 shadow-sm hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#00D6B4] text-[#08131F] text-[10px] font-extrabold tracking-widest px-4 py-1.5 uppercase rounded-full shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-extrabold text-[#08131F] mb-2">
                  {pkg.name}
                </h2>
                <p className="text-xs text-[#17232D]/70 min-h-[36px] mb-6 leading-relaxed">
                  {pkg.tagline}
                </p>

                <div className="mb-8 pb-6 border-b border-[#17232D]/10">
                  <span className="text-[10px] uppercase text-[#17232D]/50 font-bold tracking-wider block mb-1">
                    Starting From
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#08131F]">
                    {pkg.price}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-bold uppercase text-[#08131F] tracking-wider mb-2">
                    Included In Package:
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-xs sm:text-sm text-[#17232D]/80 leading-snug"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#00D6B4] shrink-0 mr-2.5 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#17232D]/10 mt-auto">
                <Button
                  to="/contact"
                  variant={pkg.variant}
                  className="w-full text-xs uppercase tracking-wider font-bold !rounded-[12px]"
                >
                  {pkg.ctaText}
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Add-On Estimator */}
        <div className="bg-[#08131F] text-white p-8 md:p-14 rounded-[28px] border border-[#17232D] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 organic-blob-1 rounded-full pointer-events-none"></div>
          <div className="max-w-3xl mb-8 space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D6B4]">
              Custom Estimator
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Optional Feature Add-Ons
            </h3>
            <p className="text-xs sm:text-sm text-[#FAFAF7]/70">
              Select additional modules to estimate total project scope.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8 relative z-10">
            {addonList.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`motion-card p-4.5 rounded-[16px] text-left border flex justify-between items-center transition-all cursor-pointer ${
                    isChecked
                      ? 'border-[#00D6B4] bg-[#00D6B4]/10 text-white shadow-md'
                      : 'border-white/10 bg-[#17232D] text-white/80 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-[6px] border flex items-center justify-center ${
                        isChecked
                          ? 'bg-[#00D6B4] border-[#00D6B4]'
                          : 'border-white/40'
                      }`}
                    >
                      {isChecked && (
                        <Check size={14} className="text-[#08131F]" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">
                      {addon.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#00D6B4]">
                    +{formatUGX(addon.price)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
            <div>
              <span className="text-xs text-[#FAFAF7]/60 block font-semibold">
                Estimated Add-On Value
              </span>
              <span className="text-2xl font-extrabold text-[#00D6B4]">
                <AnimatedNumber
                  value={calculatedAddonTotal}
                  formatter={(n) => `UGX ${n.toLocaleString()}`}
                />
              </span>
            </div>
            <Button
              to="/contact"
              variant="primary"
              className="w-full sm:w-auto text-xs uppercase font-bold !rounded-[12px]"
            >
              Discuss Package Options
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurWork = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const workItems = [
    {
      title: 'Glow & Style Beauty Salon',
      category: 'Websites',
      tagline: 'Online booking system & mobile salon portal',
      description:
        'A fast, high-converting salon portal with real-time appointment scheduling, service pricing menus, and instant WhatsApp booking notifications.',
    },
    {
      title: 'The Spice Table Kampala',
      category: 'E-Commerce',
      tagline: 'Digital food menu, takeaway orders & Mobile Money checkout',
      description:
        'An online ordering store allowing customers to select menu items, specify delivery locations in Kampala, and pay instantly via MTN MoMo.',
    },
    {
      title: 'KlaTech Legal Consultancy',
      category: 'Websites',
      tagline: 'Corporate firm website with automated enquiry capture',
      description:
        'A sleek, authoritative website for a legal practice featuring client case intake forms, attorney profiles, and automated email routing.',
    },
    {
      title: 'LogiTrans East Africa',
      category: 'AI & Systems',
      tagline: 'Automated logistics FAQ chatbot & client portal',
      description:
        'An AI support bot trained on shipment tracking FAQs, customs policies, and tariff rates to reduce support response delays.',
    },
  ];

  const filteredWork =
    selectedFilter === 'All'
      ? workItems
      : workItems.filter((item) => item.category === selectedFilter);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="Our Work"
        title="Capabilities & Concept Showcases"
        subtitle="Explore concept projects and engineered solutions demonstrating our UI/UX quality, mobile performance, and technical logic."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 pb-4 border-b border-[#17232D]/10">
          {['All', 'Websites', 'E-Commerce', 'AI & Systems'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 text-xs font-bold transition-all rounded-[10px] cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#08131F] text-[#00D6B4] shadow-sm'
                  : 'bg-white text-[#17232D]/70 border border-[#17232D]/10 hover:border-[#00D6B4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Work Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {filteredWork.map((item, idx) => (
            <div
              key={idx}
              className="motion-card bg-white border border-[#17232D]/10 rounded-[24px] p-8 md:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl group"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold text-[#00D6B4] uppercase tracking-widest bg-[#08131F] px-3 py-1 rounded-[6px] inline-block">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-[#08131F]">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-[#00D6B4]">
                  {item.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#17232D]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#17232D]/10 mt-8">
                <Button
                  to="/contact"
                  variant="dark"
                  className="w-full text-xs font-bold uppercase tracking-wider !rounded-[12px]"
                >
                  Discuss Similar Project
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Web Strategy', 'Pricing', 'AI & Tech', 'Growth'];

  const articles = [
    {
      id: 'small-biz-uganda',
      category: 'Web Strategy',
      title: 'Why Every Small Business in Uganda Needs a Dedicated Website',
      subtitle:
        'Relying exclusively on social media accounts leaves your business vulnerable to algorithm changes and lost sales.',
      date: '2026-08-10',
      readTime: '5 min read',
      author: 'Jema Digital Team',
      summary:
        'Explore why a dedicated business website gives SMEs complete ownership of client leads, higher search visibility in Kampala, and around-the-clock credibility.',
      content: [
        {
          heading: 'The Fragility of Relying Solely on Social Media',
          text: 'Social media platforms like Instagram, TikTok, and Facebook are fantastic for grabbing initial attention. However, building your entire commercial engine on third-party algorithms is risky. Algorithm updates can instantly drop your reach, account suspensions happen without warning, and direct messages quickly become chaotic during high-volume periods.',
        },
        {
          heading: '1. 24/7 Professional Credibility',
          text: 'When serious corporate clients, foreign partners, or high-value customer leads discover your brand, the first thing they search on Google is your business name. Having a fast, secure website with a customized domain instantly separates you from informal market competitors.',
        },
        {
          heading: '2. Own Your Customer Experience and Data',
          text: 'On your website, there are no competing ads distracting your visitor. You control the narrative, display structured service pricing, show verified client work, and direct customers seamlessly into an automated booking or WhatsApp checkout system.',
        },
        {
          heading: '3. Local Google Search Discoverability',
          text: "Thousands of Ugandans search Google daily for services like 'best salon in Kampala', 'corporate lawyer Uganda', or 'plumbing services near me'. A website optimized for local search engines captures high-intent buyers at the exact moment they are ready to pay.",
        },
      ],
    },
    {
      id: 'website-cost-uganda',
      category: 'Pricing',
      title: 'Understanding Website Costs & Investment in Uganda',
      subtitle:
        'A transparent breakdown of domain fees, cloud hosting, design scope, and technical features.',
      date: '2026-08-04',
      readTime: '7 min read',
      author: 'Jema Digital Team',
      summary:
        'Understand the real market factors behind web development costs in Uganda, avoiding hidden extra charges or low-quality template traps.',
      content: [
        {
          heading: 'De-mystifying Web Development Pricing',
          text: 'Website costs in Uganda range widely depending on functionality—from basic UGX 800,000 foundational business builds up to UGX 5,000,000+ custom enterprise portals with payment integration. Knowing what you are paying for ensures you receive high ROI.',
        },
        {
          heading: 'Key Cost Components',
          text: '1. Domain Name Registration (.com, .co.ug): Annual renewals for domain security.\n2. Cloud Hosting & SSL Security: Quality cloud hosting ensures high uptime and speed.\n3. Custom Engineering: Interactive forms, logic, mobile money APIs, and custom UI design.',
        },
      ],
    },
    {
      id: 'ai-small-business',
      category: 'AI & Tech',
      title: 'How Practical AI Tools Help Small Businesses Scale Operations',
      subtitle:
        'Low-cost artificial intelligence applications that streamline daily administrative tasks.',
      date: '2026-07-15',
      readTime: '5 min read',
      author: 'Jema Digital Team',
      summary:
        'Discover how SMEs are using custom AI support bots, automated drafting, and smart workflows to scale operations without swelling overhead costs.',
      content: [
        {
          heading: 'Moving Beyond Hype to Practical Business Utility',
          text: "Artificial Intelligence isn't just for silicon valley startups. For a business in Kampala, practical AI means never losing a late-night customer enquiry while your office is closed.",
        },
        {
          heading: 'Top Practical AI Applications',
          text: '1. 24/7 AI Customer Support Assistants: Trained on your exact price list and FAQs.\n2. Smart Lead Qualification: Filtering serious buyers before routing calls to your team.',
        },
      ],
    },
  ];

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="Insights"
        title="Digital Insights & Strategy Guides"
        subtitle="Practical articles to help African businesses leverage technology for growth, operational clarity, and customer acquisition."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-4 border-b border-[#17232D]/10">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold transition-all rounded-[10px] cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#08131F] text-[#00D6B4] shadow-sm'
                    : 'bg-white text-[#17232D]/70 border border-[#17232D]/10 hover:border-[#00D6B4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="motion-card bg-white border border-[#17232D]/10 rounded-[24px] hover:border-[#00D6B4] shadow-sm hover:shadow-xl flex flex-col justify-between group overflow-hidden"
            >
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="px-3 py-1 bg-[#F2E9D8] rounded-[6px] text-[#08131F] uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span className="text-[#17232D]/50 flex items-center gap-1">
                    <Clock size={12} /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#08131F] group-hover:text-[#00D6B4] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#17232D]/70 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="p-8 pt-0 border-t border-transparent">
                <div className="flex items-center justify-between pt-4 border-t border-[#17232D]/10 text-xs">
                  <span className="text-[#17232D]/50 font-semibold">
                    {art.date}
                  </span>
                  <button
                    onClick={() => setActiveArticle(art)}
                    className="font-bold text-[#08131F] group-hover:text-[#00D6B4] flex items-center gap-1 cursor-pointer"
                  >
                    Read Guide <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Modal Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-[#08131F]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto modal-backdrop">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#17232D]/20 shadow-2xl relative modal-panel">
            <div className="sticky top-0 z-20 bg-[#08131F] text-white px-8 py-5 flex justify-between items-center border-b border-[#17232D]">
              <span className="text-xs font-bold text-[#00D6B4] uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-white hover:text-[#00D6B4] p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#08131F]">
                {activeArticle.title}
              </h2>
              <p className="text-sm font-bold text-[#00D6B4]">
                {activeArticle.subtitle}
              </p>

              <div className="space-y-6 pt-4 border-t border-[#17232D]/10">
                {activeArticle.content.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-lg font-bold text-[#08131F]">
                      {sec.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#17232D]/80 leading-relaxed whitespace-pre-line">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#17232D]/10 flex justify-end">
                <Button
                  to="/contact"
                  variant="primary"
                  onClick={() => setActiveArticle(null)}
                  className="!rounded-[12px]"
                >
                  Discuss This With Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({
    'web-1': true,
    'host-1': false,
  });

  const toggleAccordion = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqData = [
    {
      category: 'Websites & Development',
      icon: Globe,
      items: [
        {
          id: 'web-1',
          q: 'How much does a website cost with Jema Digital?',
          a: 'Our website packages start from UGX 800,000 for our Starter package (ideal for a 5-page clean business presence). Our Business package starts at UGX 2,000,000 for comprehensive multi-page websites with CMS and booking tools, while custom growth systems start at UGX 5,000,000 depending on specific API logic and e-commerce requirements.',
        },
        {
          id: 'web-2',
          q: 'How long does a website project take to build?',
          a: 'A standard Starter website is completed within 1 to 2 weeks. Business websites take 2 to 4 weeks, and complex custom or e-commerce platforms take 4 to 6 weeks. Timelines depend on prompt provision of content and approval feedback.',
        },
        {
          id: 'web-3',
          q: 'Will my website work perfectly on mobile phones?',
          a: '100% yes. We adopt a mobile-first approach. Every platform we build is fully responsive and tested thoroughly across mobile screens, tablets, laptops, and desktop displays.',
        },
      ],
    },
    {
      category: 'Hosting & Mobile Money Payments',
      icon: Server,
      items: [
        {
          id: 'host-1',
          q: 'Can you integrate Mobile Money (MTN MoMo & Airtel Money)?',
          a: 'Yes! Mobile Money integration is crucial for commerce in East Africa. We seamlessly integrate automated mobile money gateways into online stores, booking systems, and fee portals.',
        },
        {
          id: 'host-2',
          q: 'Do you handle domain registration and cloud hosting?',
          a: 'Yes, we assist with purchasing and configuring your preferred domain extension (.com, .co.ug, .org), along with high-speed cloud hosting and SSL security encryption.',
        },
      ],
    },
    {
      category: 'AI & Automation',
      icon: Bot,
      items: [
        {
          id: 'ai-1',
          q: 'How does a custom AI chatbot work for my website?',
          a: 'We train a virtual AI assistant using your business knowledge base, product catalogues, and FAQs. It answers client enquiries automatically 24/7 in natural conversational language.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="FAQ"
        title="Frequently Asked Questions"
        subtitle="Clear, direct answers about our web development, AI capabilities, mobile money integrations, pricing, and timeline."
      />

      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* Search Filter Box */}
        <div className="bg-white p-4.5 rounded-[20px] border border-[#17232D]/10 mb-12 shadow-sm flex items-center gap-3">
          <Search size={20} className="text-[#00D6B4]" />
          <input
            type="text"
            placeholder="Search questions (e.g. cost, mobile money, timeline)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm text-[#08131F] focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#17232D]/50 hover:text-[#08131F]"
            >
              Clear
            </button>
          )}
        </div>

        {/* FAQs Group */}
        <div className="space-y-12">
          {faqData.map((group, idx) => {
            const filteredGroupItems = group.items.filter(
              (item) =>
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredGroupItems.length === 0) return null;

            return (
              <div
                key={idx}
                className="bg-white border border-[#17232D]/10 rounded-[24px] p-8 md:p-10 shadow-sm"
              >
                <div className="flex items-center gap-3 border-b border-[#17232D]/10 pb-4 mb-6">
                  <div className="w-10 h-10 bg-[#08131F] text-[#00D6B4] rounded-[12px] flex items-center justify-center font-bold">
                    <group.icon size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-[#08131F]">
                    {group.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {filteredGroupItems.map((item) => {
                    const isOpen = !!openItems[item.id];
                    return (
                      <div
                        key={item.id}
                        className="border border-[#17232D]/10 bg-[#FAFAF7] rounded-[16px] overflow-hidden"
                      >
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full text-left p-5 font-bold text-sm sm:text-base text-[#08131F] flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isOpen
                                ? 'rotate-180 text-[#00D6B4]'
                                : 'text-[#17232D]/50'
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="p-5 pt-0 text-xs sm:text-sm text-[#17232D]/80 leading-relaxed border-t border-[#17232D]/10 bg-white">
                              {item.a}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-[#08131F] text-white p-10 rounded-[28px] text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 organic-blob-1 rounded-full pointer-events-none"></div>
          <h3 className="text-xl font-bold relative z-10">
            Have a specific question not covered here?
          </h3>
          <p className="text-xs sm:text-sm text-[#FAFAF7]/70 max-w-lg mx-auto relative z-10">
            Contact our team directly and we will provide immediate guidance for
            your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 relative z-10">
            <Button to="/contact" variant="primary" className="!rounded-[12px]">
              Get a Free Consultation
            </Button>
            <Button
              href="https://wa.me/256700000000"
              variant="secondary"
              className="!rounded-[12px]"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="About Us"
        title="About Jema Digital"
        subtitle="Because Digital Should Work For Your Business."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] bg-[#08131F] px-4 py-1.5 rounded-[8px] inline-block shadow-sm">
              Who We Are
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08131F] tracking-tight">
              Building Pragmatic Digital Platforms for Growth
            </h2>

            <p className="text-base text-[#17232D]/80 leading-relaxed font-normal">
              At Jema Digital, we believe technology should solve concrete
              operational problems, project authority, and drive revenue.
            </p>

            <p className="text-sm text-[#17232D]/70 leading-relaxed">
              Based in Kampala, Uganda, we partner with growing SMEs,
              professional firms, and organizations across East Africa to
              deliver modern web platforms, AI support assistants, and business
              process automation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-7 rounded-[22px] border border-[#17232D]/10 shadow-sm space-y-2">
                <Target size={28} className="text-[#00D6B4]" />
                <h3 className="font-bold text-[#08131F]">Our Mission</h3>
                <p className="text-xs text-[#17232D]/70 leading-relaxed">
                  To equip African businesses with reliable, high-converting web
                  and AI platforms.
                </p>
              </div>
              <div className="bg-white p-7 rounded-[22px] border border-[#17232D]/10 shadow-sm space-y-2">
                <Compass size={28} className="text-[#00D6B4]" />
                <h3 className="font-bold text-[#08131F]">Our Vision</h3>
                <p className="text-xs text-[#17232D]/70 leading-relaxed">
                  To be the most trusted web and digital engineering partner for
                  growth-focused companies.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#08131F] text-white p-8 sm:p-12 rounded-[28px] border border-[#17232D] space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 organic-blob-1 rounded-full pointer-events-none"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00D6B4]">
              Why Partner With Us
            </span>
            <h3 className="text-2xl font-bold">
              Local Relevance & Technical Precision
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#FAFAF7]/80">
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-[#00D6B4] shrink-0 mt-0.5"
                />
                <span>
                  <strong>Mobile Money Integration:</strong> Instant local
                  checkout with MTN MoMo and Airtel Money.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-[#00D6B4] shrink-0 mt-0.5"
                />
                <span>
                  <strong>Mobile-First Performance:</strong> Optimized for fast
                  load speeds across mobile networks.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-[#00D6B4] shrink-0 mt-0.5"
                />
                <span>
                  <strong>Transparent Pricing:</strong> Upfront scope and fixed
                  packages without hidden fees.
                </span>
              </li>
            </ul>
            <div className="pt-4 border-t border-white/10">
              <Button
                to="/contact"
                variant="primary"
                className="w-full text-xs uppercase font-bold !rounded-[12px]"
              >
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
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

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // Paste your Apps Script "/exec" web app URL here after deploying it.
  const GOOGLE_SHEETS_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbzkdor1tbx7GUnLPCx8-WiulrEhLHpaXdIxM9E8SLA3hZ7vLLRghzs__AyzcTNd-Ulj/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      // no-cors + text/plain avoids Apps Script's lack of CORS preflight support.
      // We can't read the response back, so we treat "the request didn't throw" as success.
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Form submission failed:', err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <PageHeader
        breadcrumb="Contact"
        title="Let's Talk About Your Project"
        subtitle="Tell us what you are building, what you are trying to improve, or what problem you are trying to solve."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[28px] border border-[#17232D]/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00D6B4]"></div>

            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-20 h-20 bg-[#00D6B4]/10 text-[#00D6B4] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={44} />
                </div>
                <h2 className="text-2xl font-extrabold text-[#08131F]">
                  Enquiry Sent Successfully!
                </h2>
                <p className="text-xs sm:text-sm text-[#17232D]/70 max-w-md mx-auto">
                  Thank you for reaching out,{' '}
                  <strong>{formData.fullName || 'there'}</strong>. Our team will
                  review your details and contact you within 24 hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="dark"
                  className="text-xs uppercase font-bold !rounded-[12px]"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#08131F] mb-1">
                    Project Enquiry Form
                  </h2>
                  <p className="text-xs text-[#17232D]/60">
                    Complete the details below for a prompt project review and
                    proposal.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] focus:outline-none focus:border-[#00D6B4] focus:shadow-[0_0_0_4px_rgba(0,214,180,0.10)] text-xs sm:text-sm transition-all duration-300"
                      placeholder="e.g. Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] focus:outline-none focus:border-[#00D6B4] focus:shadow-[0_0_0_4px_rgba(0,214,180,0.10)] text-xs sm:text-sm transition-all duration-300"
                      placeholder="e.g. Apex Enterprise"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] focus:outline-none focus:border-[#00D6B4] focus:shadow-[0_0_0_4px_rgba(0,214,180,0.10)] text-xs sm:text-sm transition-all duration-300"
                      placeholder="+256 789 519 520"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] focus:outline-none focus:border-[#00D6B4] focus:shadow-[0_0_0_4px_rgba(0,214,180,0.10)] text-xs sm:text-sm transition-all duration-300"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] focus:outline-none focus:border-[#00D6B4] text-xs sm:text-sm cursor-pointer transition-all"
                    >
                      <option value="Business Website">Business Website</option>
                      <option value="E-Commerce System">
                        E-Commerce System
                      </option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Booking System">Booking System</option>
                      <option value="AI Solution">AI Solution</option>
                      <option value="Automation">Automation</option>
                      <option value="Website Maintenance">
                        Website Maintenance
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                      Estimated Budget *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] focus:outline-none focus:border-[#00D6B4] text-xs sm:text-sm cursor-pointer transition-all"
                    >
                      <option value="Under UGX 1M">Under UGX 1M</option>
                      <option value="UGX 1M–3M">UGX 1M–3M</option>
                      <option value="UGX 3M–5M">UGX 3M–5M</option>
                      <option value="UGX 5M–10M">UGX 5M–10M</option>
                      <option value="UGX 10M+">UGX 10M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#08131F] mb-2">
                    Project Overview / Questions *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-[#17232D]/20 p-3.5 rounded-[12px] bg-[#FAFAF7] text-[#08131F] h-36 focus:outline-none focus:border-[#00D6B4] focus:shadow-[0_0_0_4px_rgba(0,214,180,0.10)] text-xs sm:text-sm transition-all duration-300"
                    placeholder="Describe your current setup, goals, requirements..."
                  ></textarea>
                </div>

                {error && (
                  <div className="text-xs sm:text-sm text-[#F26A3D] bg-[#F26A3D]/10 border border-[#F26A3D]/30 rounded-[12px] p-3.5">
                    Something went wrong sending your enquiry. Please try again,
                    or reach us directly via WhatsApp below.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full md:w-auto text-xs uppercase font-bold !rounded-[12px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="mr-2" />
                  {submitting ? 'Sending...' : 'Send Project Enquiry'}
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#08131F] text-white p-8 md:p-10 rounded-[28px] border border-[#17232D] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 organic-blob-1 rounded-full pointer-events-none"></div>
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3 relative z-10">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 relative z-10">
                <a
                  href="https://wa.me/256789519520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4.5 bg-[#17232D] rounded-[16px] hover:bg-[#00D6B4]/10 border border-white/10 hover:border-[#00D6B4] transition-all group"
                >
                  <MessageSquare
                    size={20}
                    className="text-[#00D6B4] shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#00D6B4] block">
                      Instant WhatsApp Chat
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00D6B4]">
                      +256 789 519 520
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4.5 bg-[#17232D] rounded-[16px] border border-white/10">
                  <Phone size={20} className="text-[#00D6B4] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">
                      Direct Phone
                    </span>
                    <span className="text-sm font-bold text-white">
                      +256 789 519 520
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 bg-[#17232D] rounded-[16px] border border-white/10">
                  <Mail size={20} className="text-[#00D6B4] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">
                      Email Inquiries
                    </span>
                    <span className="text-sm font-bold text-white">
                      info@jemadigital.com
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 bg-[#17232D] rounded-[16px] border border-white/10">
                  <MapPin
                    size={20}
                    className="text-[#00D6B4] shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">
                      Location
                    </span>
                    <span className="text-sm font-bold text-white">
                      Kampala, Uganda
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
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
      </Router>
    </MotionConfig>
  );
}

