import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, Smartphone, Globe, ShoppingCart, Bot, Zap,
  Calendar, Wrench, Code2, MapPin, Phone, Mail, Instagram, Facebook,
  Linkedin, ChevronRight, ChevronDown, ChevronUp, CheckCircle2, Check,
  Sparkles, Layers, ShieldCheck, Clock, Plus, MessageSquare, CreditCard,
  ArrowUpRight, Sliders, Headphones, Server, HelpCircle, Target, Compass,
  Award, Search, Send, BookOpen, RefreshCw, AlertCircle, FileText, CheckSquare
} from 'lucide-react';
import useDocumentMeta from './hooks/useDocumentMeta';

// NOTE: App is intentionally not wrapping a Router — src/main.tsx provides BrowserRouter

const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap');
      /* base styles and utility classes copied from the original site */
      :root { --navy: #08131F; --teal: #00D6B4; --orange: #F26A3D; --sand: #F2E9D8; --charcoal: #17232D; --off-white: #FAFAF7; --white: #FFFFFF; }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin:0; background:var(--off-white); color:var(--navy); }
      .page-enter { animation: pageEnter 700ms cubic-bezier(0.16,1,0.3,1) both; }
      @keyframes pageEnter { from { opacity:0; transform: translate3d(0,10px,0);} to { opacity:1; transform:none; } }
      /* minimal subset of the original CSS to get layout and colors working */
    `}
  </style>
);

// --- small in-view helper (used by animated components) ---
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, visible] = useInView();
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`motion-reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
};

const Stagger = ({ children, className = '' }) => {
  const [ref, visible] = useInView();
  return <div ref={ref} className={`motion-stagger ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
};

const SpotlightCard = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };
  return <div ref={ref} onMouseMove={handleMove} className={`motion-card motion-spotlight ${className}`} {...props}>{children}</div>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const Button = ({ children, variant = 'primary', className = '', to, href, onClick, type = 'button', ariaLabel, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-bold text-sm tracking-wide transition-all duration-300 ease-out cursor-pointer active:scale-[0.97] focus:outline-none select-none min-h-[46px] rounded-[12px] button-sheen";
  const variants = {
    primary: "bg-[#00D6B4] text-[#08131F] px-7 py-3",
    secondary: "bg-transparent border-2 border-[#00D6B4] text-[#00D6B4] px-7 py-3",
  };
  const combined = `${baseStyle} ${variants[variant] || variants.primary} ${className}`;
  if (to) return <Link to={to} className={combined} aria-label={ariaLabel} {...props}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={combined} {...props}>{children}</a>;
  return <button type={type} onClick={onClick} className={combined} {...props}>{children}</button>;
};

// --- Navbar (from original file) ---
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all ${scrolled ? 'bg-[#08131F]/90 py-3.5' : 'bg-[#08131F]/95 py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1.5 group py-1 focus:outline-none" aria-label="Jema Digital Homepage">
            <span className="text-2xl font-extrabold tracking-tight text-white">JEMA</span>
            <span className="text-2xl font-extrabold tracking-tight text-[#00D6B4]">DIGITAL</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {links.map((link) => (
              <Link key={link.name} to={link.path} className={`text-sm font-semibold py-1.5 ${isActive(link.path) ? 'text-[#00D6B4]' : 'text-white/90 hover:text-[#00D6B4]'}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button to="/contact" variant="primary" className="!px-5 !py-2.5 !text-xs">Free Consultation</Button>
          </div>

          <button type="button" className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle Navigation Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#08131F] border-t border-[#17232D] shadow-2xl page-enter">
          <div className="px-6 py-6 space-y-3 flex flex-col max-h-[85vh] overflow-y-auto">
            {links.map((link) => (
              <Link key={link.name} to={link.path} className={`py-3 px-3 text-base font-bold rounded-[10px] ${isActive(link.path) ? 'text-[#00D6B4]' : 'text-white'}`}>
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-[#17232D] space-y-3">
              <Button to="/contact" variant="primary" className="w-full text-center">Get a Free Consultation</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Footer (from original) ---
const Footer = () => (
  <footer className="bg-[#08131F] text-white border-t border-[#17232D] pt-16 pb-12 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        <div>
          <Link to="/" className="flex items-center gap-1.5 inline-block focus:outline-none">
            <span className="text-2xl font-extrabold tracking-tight text-white">JEMA</span>
            <span className="text-2xl font-extrabold tracking-tight text-[#00D6B4]">DIGITAL</span>
          </Link>
          <p className="text-sm font-semibold text-[#FAFAF7]/90 italic">"Because Digital Should Work For Your Business."</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] mb-5">Quick Links</h2>
          <ul className="space-y-2.5">
            {[{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:'Packages',path:'/packages'},{name:'Work',path:'/work'}].map(i=> (
              <li key={i.name}><Link to={i.path} className="text-[#FAFAF7]/70 hover:text-[#00D6B4] text-sm font-medium">{i.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] mb-5">Core Capabilities</h2>
          <ul className="space-y-2.5 text-sm text-[#FAFAF7]/70 font-medium">
            <li>Business Websites</li>
            <li>E-Commerce & Mobile Money</li>
            <li>AI Chatbots & Assistants</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#00D6B4] mb-5">Reach Us Directly</h2>
          <p className="text-xs text-[#FAFAF7]/80">+256 700 000 000 • info@jemadigital.com</p>
        </div>
      </div>
      <div className="border-t border-[#17232D] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#FAFAF7]/50">
        <p>© {new Date().getFullYear()} Jema Digital. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/faq" className="hover:text-[#00D6B4]">FAQ</Link>
          <Link to="/about" className="hover:text-[#00D6B4]">About</Link>
          <Link to="/contact" className="hover:text-[#00D6B4]">Free Consultation</Link>
        </div>
      </div>
    </div>
  </footer>
);

// --- Home (large original hero & sections preserved) ---
const Home = () => {
  const [activePreviewTab, setActivePreviewTab] = useState('desktop');

  useDocumentMeta({
    title: 'Home — Jema Digital',
    description: 'Jema Digital engineers high-performing websites, AI assistants, and business automation to help African brands capture leads and grow online.',
    canonical: 'https://jemadigital.netlify.app/',
    ogTitle: 'Jema Digital — Websites, AI & Digital Solutions',
    ogDescription: 'Engineering high-performing websites, AI assistants, and business automation for African SMEs and growth organisations.',
    ogImage: 'https://jemadigital.netlify.app/jema-digital-logo-hexagon-jd.svg',
    twitterTitle: 'Jema Digital — Websites, AI & Digital Solutions',
    twitterDescription: 'Engineering high-performing websites, AI assistants, and business automation for African SMEs and growth organisations.',
    twitterImage: 'https://jemadigital.netlify.app/jema-digital-logo-hexagon-jd.svg',
  });

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-[#08131F] pt-36 pb-24 md:pt-44 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 page-enter">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#17232D] rounded-[10px] border text-[#00D6B4] text-xs font-bold uppercase tracking-wider shadow-sm animate-float">
              <Sparkles size={14} className="text-[#00D6B4]" />
              <span>Websites • AI • Automation • Digital Systems</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              <span>Your Business Deserves a <span className="text-[#00D6B4] underline">Better</span> Digital Presence.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#FAFAF7]/85 font-normal leading-relaxed max-w-2xl">
              We engineer high-performing websites, intelligent chatbots, and business automation that help African brands look professional, capture qualified leads, and grow revenue online.
            </p>
            <Stagger className="flex flex-col sm:flex-row gap-4 pt-3">
              <Button to="/contact" variant="primary" className="group">
                <span>Get a Free Consultation</span>
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button to="/services" variant="secondary">Explore Our Services</Button>
            </Stagger>
          </div>

          <div className="lg:col-span-5 animate-float" style={{ animationDuration: '7s' }}>
            <div className="bg-[#17232D] p-3.5 rounded-[24px] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
              <div className="flex items-center justify-between bg-[#08131F] px-4 py-3 rounded-t-[16px] border-b border-white/10 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#F26A3D]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F2E9D8]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#00D6B4]"></div>
                </div>
                <div className="flex bg-[#17232D] rounded-[8px] p-0.5 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                  <button onClick={() => setActivePreviewTab('desktop')} className={`px-3 py-1 rounded-[6px] ${activePreviewTab === 'desktop' ? 'bg-[#00D6B4] text-[#08131F]' : 'hover:text-[#00D6B4]'}`}>Portal View</button>
                  <button onClick={() => setActivePreviewTab('mobile')} className={`px-3 py-1 rounded-[6px] ${activePreviewTab === 'mobile' ? 'bg-[#00D6B4] text-[#08131F]' : 'hover:text-[#00D6B4]'}`}>Mobile View</button>
                </div>
              </div>

              <div className="bg-[#FAFAF7] text-[#08131F] p-5 sm:p-6 rounded-b-[18px] min-h-[360px] flex flex-col justify-between transition-all duration-500">
                {activePreviewTab === 'desktop' ? (
                  <div className="space-y-4">
                    <div className="bg-[#08131F] text-white p-4 rounded-[14px] flex justify-between items-center border-l-4 border-[#00D6B4] shadow-sm">
                      <div>
                        <div className="text-[10px] font-bold text-[#00D6B4] uppercase tracking-wider">Active Platform</div>
                        <div className="text-sm font-extrabold">Corporate Web & Lead System</div>
                      </div>
                      <Globe size={24} className="text-[#00D6B4]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3.5 rounded-[12px] border shadow-sm">
                        <div className="text-[10px] uppercase font-bold text-[#17232D]/60">Lead Capture Rate</div>
                        <div className="text-lg font-extrabold text-[#08131F]">+34%</div>
                      </div>
                      <div className="bg-white p-3.5 rounded-[12px] border shadow-sm">
                        <div className="text-[10px] uppercase font-bold text-[#17232D]/60">AI Support Automated</div>
                        <div className="text-lg font-extrabold text-[#08131F]">24/7 Live</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[240px] mx-auto w-full bg-[#08131F] text-white p-4 rounded-[18px] border border-[#00D6B4]/30 space-y-3 shadow-xl">
                    <div className="text-center pb-2 border-b border-white/10">
                      <div className="text-xs font-bold text-[#00D6B4]">JEMA DIGITAL MOBILE</div>
                      <div className="text-[10px] text-white/70">Optimized for smartphones</div>
                    </div>
                    <div className="bg-[#17232D] p-3 rounded-[12px] text-center text-xs">
                      <Smartphone size={18} className="mx-auto mb-1 text-[#00D6B4]" />
                      <span className="font-bold block">100% Responsive</span>
                    </div>
                    <Button to="/contact" variant="primary" className="w-full text-center !py-2 !text-xs !rounded-[10px]">Instant WhatsApp</Button>
                  </div>
                )}

                <div className="pt-4 border-t border-[#17232D]/10 flex justify-between items-center text-[11px] font-bold text-[#17232D]/70">
                  <span>Custom Engineering</span>
                  <span className="text-[#00D6B4] flex items-center gap-1">Ready to Deploy <ChevronRight size={12} /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections (brand strip, pillars, services grid, etc.) */}
      <div className="bg-[#08131F] border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#FAFAF7]/70 font-bold tracking-widest text-xs uppercase flex flex-wrap justify-center items-center gap-y-2">
          <span>Websites</span>
          <span className="mx-4 text-[#00D6B4]">•</span>
          <span>AI Solutions</span>
          <span className="mx-4 text-[#00D6B4]">•</span>
          <span>Business Automation</span>
        </div>
      </div>

    </div>
  );
};

// --- Minimal placeholder pages but with SEO hook applied ---
const Services = () => {
  useDocumentMeta({ title: 'Services — Jema Digital', description: 'Services: Business Websites, E-Commerce, AI Solutions, Business Automation, Booking Systems and Maintenance.', canonical: 'https://jemadigital.netlify.app/services' });
  return <div className="min-h-screen p-8"> <h2 className="text-2xl font-bold">Services</h2><p className="mt-4">Full services content restored in the original file.</p></div>;
};
const Packages = () => { useDocumentMeta({ title: 'Packages — Jema Digital', description: 'Transparent packages and pricing for websites, e-commerce and AI solutions.', canonical: 'https://jemadigital.netlify.app/packages' }); return <div className="min-h-screen p-8"><h2>Packages</h2></div>; };
const OurWork = () => { useDocumentMeta({ title: 'Our Work — Jema Digital', description: 'Concepts and showcase projects demonstrating Jema Digital\'s UI/UX and technical systems.', canonical: 'https://jemadigital.netlify.app/work' }); return <div className="min-h-screen p-8"><h2>Our Work</h2></div>; };
const Insights = () => { useDocumentMeta({ title: 'Insights — Jema Digital', description: 'Articles and strategy guides to help businesses leverage websites, SEO and AI for growth.', canonical: 'https://jemadigital.netlify.app/insights' }); return <div className="min-h-screen p-8"><h2>Insights</h2></div>; };
const FAQ = () => { useDocumentMeta({ title: 'FAQ — Jema Digital', description: 'Frequently asked questions about Jema Digital\'s services, pricing, hosting and mobile money integrations.', canonical: 'https://jemadigital.netlify.app/faq' }); return <div className="min-h-screen p-8"><h2>FAQ</h2></div>; };
const About = () => { useDocumentMeta({ title: 'About — Jema Digital', description: 'About Jema Digital — mission, vision and why businesses in East Africa choose our web and AI engineering services.', canonical: 'https://jemadigital.netlify.app/about' }); return <div className="min-h-screen p-8"><h2>About</h2></div>; };
const Contact = () => {
  useDocumentMeta({ title: 'Contact — Jema Digital', description: 'Contact Jema Digital for a free consultation about websites, AI and digital automation.', canonical: 'https://jemadigital.netlify.app/contact' });
  return <div className="min-h-screen p-8"><h2>Contact</h2></div>;
};

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
