/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Instagram, Facebook, Twitter, Mail, 
  ChevronRight, ArrowRight, Star, Quote, Phone, 
  Monitor, Layout, Palette, Package, Box, AppWindow, 
  Smartphone, FileText, Send, Github
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Portfolio', 'Services', 'Testimonials', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="text-2xl font-bold tracking-tighter">
            MA CREATIVE <span className="text-neon-red">GRAPHICS</span>
          </div>
          <div className="hidden lg:block h-4 w-[1px] bg-white/20 mx-2" />
          <div className="hidden lg:block text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
            D1 / 2021—24
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-neon-red transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-red transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 bg-matte-black z-[60] flex flex-col items-center justify-center space-y-8"
          >
            <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold tracking-tight hover:text-neon-red"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCapsule = ({ title, onClick }: { title: string; onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 49, 49, 0.1)' }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-3 rounded-full border border-white/10 glass whitespace-nowrap cursor-pointer text-sm font-semibold tracking-wide flex items-center gap-2 group outline-none"
  >
    <div className="w-1.5 h-1.5 rounded-full bg-neon-red opacity-50 group-hover:opacity-100" />
    {title}
  </motion.button>
);

const LogoCard = ({ project }: { project: Project; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative aspect-square bg-graphite rounded-3xl overflow-hidden border border-white/5"
  >
    <img 
      src={project.image} 
      alt={project.title} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
      loading="lazy"
    />
    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
      <p className="text-xs uppercase tracking-widest text-neon-red font-bold mb-1">{project.category}</p>
      <h3 className="text-xl font-bold">{project.title}</h3>
    </div>
  </motion.div>
);

const GalleryModal = ({ service, onClose }: { service: string | null; onClose: () => void }) => {
  if (!service) return null;

  const galleryImages = service === 'Logo Design' 
    ? [
        '/images/gallery_1.png',
        '/images/gallery_2.png',
        '/images/gallery_3.png',
        '/images/gallery_4.png',
        '/images/gallery_5.png',
      ]
    : service === 'Branding'
    ? [
        '/images/branding_v2_1.png',
        '/images/branding_v2_2.png',
        '/images/branding_v2_4.png',
        '/images/branding_new_1.png',
      ]
    : service === 'Social Media'
    ? [
        '/images/social_media_1.png',
        '/images/social_media_2.png',
        '/images/social_media_3.png',
        '/images/social_media_4.png',
        '/images/social_media_5.png',
      ]
    : service === 'Business Cards'
    ? [
        '/images/branding_1.png',
        '/images/branding_2.png',
        '/images/branding_3.png',
        '/images/branding_4.png',
        '/images/branding_5.png',
      ]
    : service === 'Posters'
    ? [
        '/images/posters_1.png',
        '/images/posters_2.png',
        '/images/posters_3.png',
        '/images/posters_4.png',
        '/images/posters_5.png',
      ]
    : service === 'Packaging'
    ? [
        '/images/package_1.png',
        '/images/package_2.png',
        '/images/package_3.png',
        '/images/package_4.png',
        '/images/package_5.png',
      ]
    : service === 'Flyers'
    ? [
        '/images/flyers_1.png',
        '/images/flyers_2.png',
        '/images/flyers_3.png',
        '/images/flyers_4.png',
        '/images/flyers_5.png',
      ]
    : [
        '/images/gallery_1.png',
        '/images/gallery_2.png',
        '/images/gallery_3.png',
        '/images/gallery_4.png',
        '/images/gallery_5.png',
      ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-matte-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-6xl glass rounded-[3rem] overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
      >
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-serif italic text-neon-red">{service}</h3>
            <p className="text-xs uppercase tracking-widest font-bold opacity-40">Project Gallery Showcase</p>
          </div>
          <button onClick={onClose} className="p-3 glass rounded-full hover:bg-neon-red transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-full">
            <div className="md:col-span-3 aspect-[4/3] rounded-3xl overflow-hidden border border-white/5">
              <img src={galleryImages[0]} className="w-full h-full object-cover" alt="Main project" />
            </div>
            <div className="md:col-span-3 grid grid-cols-2 gap-6">
              {galleryImages.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/5">
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`Small project ${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/10 flex justify-center">
           <button onClick={onClose} className="bg-white text-black px-8 py-3 rounded-full font-black text-sm hover:bg-neon-red hover:text-white transition-colors">
             CLOSE GALLERY
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeGallery, setActiveGallery] = useState<string | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const services = [
    'Logo Design', 'Branding', 'Business Cards', 'Social Media', 
    'Packaging', 'Posters', 'Flyers'
  ];

  const logoProjects = [
    { id: 1, title: 'Kings Lounge', category: 'Identity', image: '/images/mockup_1.png' },
    { id: 2, title: 'Smash Brother', category: 'Food & Bev', image: '/images/mockup_2.png' },
    { id: 3, title: 'Next Construction', category: 'Tech', image: '/images/mockup_3.png' },
    { id: 6, title: 'Bazar DOT', category: 'Branding', image: '/images/shop_mockup.png' },
  ];

  return (
    <div className="relative min-h-screen font-sans selection:bg-neon-red selection:text-white overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: cursorPos.x - 16, y: cursorPos.y - 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-red pointer-events-none z-[9999] hidden md:block"
        animate={{ x: cursorPos.x - 4, y: cursorPos.y - 4 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.2 }}
      />

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ scale, opacity }}
          className="container mx-auto px-6 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/images/hero_brush.png" alt="Portfolio" className="max-w-4xl w-full mx-auto mb-4" />
            <div className="flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl font-medium text-muted-gray tracking-tight mb-8"
              >
                Graphics & Brand <span className="text-white">Designer</span>
              </motion.span>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="#portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 group shadow-lg"
                >
                  View Work <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-neon-red text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 group shadow-lg shadow-neon-red/20"
                >
                  Hire Me <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Backdrop elements */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-neon-red/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">Scroll to explore</p>
          <div className="w-0.5 h-12 bg-gradient-to-b from-neon-red to-transparent rounded-full" />
        </div>
      </section>

      {/* Intro Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-[4/5] bg-graphite rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl">
                <img 
                  src="/images/designer_portrait.png" 
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-8 rounded-2xl border border-white/10 hidden md:block">
                <p className="text-neon-red text-4xl font-extrabold mb-1">05+</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-60">Years Experience</p>
              </div>
            </motion.div>

            <div className="w-full md:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-7xl font-serif italic mb-8"
              >
                Still there? <span className="text-neon-red">?</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <img src="/images/red_brush.png" alt="Brush stroke" className="w-64 mb-6 opacity-80" />
                <p className="text-xl text-muted-gray leading-relaxed mb-6">
                  I know you are more excited to see <span className="text-white font-semibold">my work</span>. I craft visual identities that don't just look good, but tell a story.
                </p>
                <p className="text-lg text-muted-gray leading-relaxed">
                  Combining modern aesthetics with strategic thinking to help brands stand out in a digital-first world. From startups to established agencies, I bring ideas to life.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neon-red mb-2">Philosophy</h4>
                  <p className="text-sm text-white/70">Minimalist style, maximum impact.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neon-red mb-2">Location</h4>
                  <p className="text-sm text-white/70">Working Globally, Base: Asia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-graphite/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <p className="text-neon-red uppercase tracking-[0.4em] font-bold text-xs mb-4">Expertise</p>
              <h2 className="text-5xl md:text-7xl font-bold">WHAT'S INSIDE</h2>
            </div>
            <div className="text-right">
              <p className="text-serif italic text-3xl text-white/60">Table of Content</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {services.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <ServiceCapsule 
                  title={item} 
                  onClick={() => setActiveGallery(item)} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {activeGallery && (
          <GalleryModal 
            service={activeGallery} 
            onClose={() => setActiveGallery(null)} 
          />
        )}
      </AnimatePresence>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-8xl font-serif italic mb-4">Logo <span className="text-neon-red">Folio</span></h2>
            <p className="text-muted-gray tracking-widest uppercase text-xs font-bold">Showcasing Visual Identities</p>
          </div>

          {/* Featured Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 relative group cursor-pointer"
          >
            <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/5 relative shadow-3xl">
              <img 
                src="/images/shop_mockup.png" 
                alt="Bazar DOT Mockup" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="absolute top-8 left-8 glass px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              Featured Identity
            </div>
          </motion.div>

          {/* Logo Grid */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-graphite p-8 md:p-16 rounded-[3rem] border border-white/5"
            >
              <img src="/images/logo_grid.png" alt="Logo Collection" className="w-full h-auto rounded-2xl" />
            </motion.div>
          </div>

          {/* Individual Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logoProjects.map((project) => (
              <LogoCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-32 bg-graphite/40 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <p className="text-neon-red uppercase tracking-[0.4em] font-bold text-xs mb-6">Digital Creatives</p>
              <h2 className="text-6xl md:text-8xl font-serif italic mb-8">Social <span className="text-neon-red">Media</span></h2>
              <p className="text-xl text-muted-gray mb-10 max-w-lg leading-relaxed">
                Professional designs for Instagram, Facebook, and YouTube that drive engagement and build brand recognition.
              </p>
              
              <ul className="space-y-6 mb-12">
                {[
                  { icon: <Monitor size={20}/>, text: 'Custom Post Templates' },
                  { icon: <Smartphone size={20}/>, text: 'Instagram Story Sets' },
                  { icon: <AppWindow size={20}/>, text: 'YouTube Branded Content' }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-white/80"
                  >
                    <div className="text-neon-red">{item.icon}</div>
                    <span className="font-semibold tracking-wide">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative flex justify-center"
            >
              <img src="/images/social_mockup.png" alt="Social Media Mockup" className="max-w-2xl w-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neon-red/10 rounded-full blur-[150px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience & Tools */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Photoshop', icon: 'PS' },
              { label: 'Illustrator', icon: 'AI' },
              { label: 'Canva', icon: 'CV' },
              { label: 'Figma', icon: 'FG' }
            ].map((tool) => (
              <div key={tool.label} className="group">
                <div className="w-16 h-16 mx-auto glass rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-neon-red group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,49,49,0.3)]">
                  <span className="font-black text-xl tracking-tighter">{tool.icon}</span>
                </div>
                <p className="text-xs uppercase tracking-widest font-bold opacity-60">{tool.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">CLIENT LOVE</h2>
            <div className="w-24 h-1 bg-neon-red mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Alex Thompson",
                role: "CEO, TechStart",
                content: "The creative vision at MA Creative Graphics is simply unmatched. They took our branding from amateur to award-winning in just a few weeks. Highly recommended for any serious business."
              },
              {
                id: 2,
                name: "Sophia Reynold",
                role: "Marketing Manager",
                content: "Modern, clean, and eye-catching designs delivered perfectly on time."
              },
              {
                id: 3,
                name: "Marcus Chen",
                role: "Founder, GreenEdge",
                content: "Working with MA Creative was a game-changer for our startup. The attention to detail and ability to understand our vision was impressive."
              }
            ].map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: testimonial.id * 0.1 }}
                className="glass p-10 rounded-[2.5rem] relative"
              >
                <div className="absolute -top-4 left-10 text-neon-red bg-matte-black p-2 rounded-lg">
                  <Quote size={24} fill="currentColor" />
                </div>
                <div className="flex gap-1 mb-6">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={14} className="text-vibrant-yellow" fill="currentColor" />)}
                </div>
                <p className="text-white/80 leading-relaxed mb-8 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-red/20 flex items-center justify-center font-bold text-neon-red">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-xs text-neon-red uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating background gradient */}
        <div className="absolute -bottom-1/2 left-0 w-full h-full bg-purple-accent/5 rounded-full blur-[200px] pointer-events-none" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="glass p-12 md:p-24 rounded-[4rem] relative overflow-hidden flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/2 relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Let's Build Something <br />
                <span className="text-neon-red">Creative Together</span>
              </h2>
              <p className="text-xl text-muted-gray mb-12 max-w-md">
                Ready to elevate your brand presence? Send me a message and I'll get back to you within 24 hours.
              </p>
              
              <div className="bg-neon-red/10 border border-neon-red/20 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-12">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-neon-green">Available for new projects</span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-8">
                <a href="https://wa.me/923215705465" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center md:items-start gap-2 group">
                  <p className="text-xs uppercase tracking-widest font-bold opacity-40">Contact On</p>
                  <p className="font-bold flex items-center gap-2 group-hover:text-neon-red transition-colors">
                    <Phone size={18} /> WhatsApp (+92 321 5705465)
                  </p>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadaasif627@gmail.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center md:items-start gap-2 group">
                  <p className="text-xs uppercase tracking-widest font-bold opacity-40">Drop A Line</p>
                  <p className="font-bold flex items-center gap-2 group-hover:text-neon-red transition-colors">
                    <Mail size={18} /> muhammadaasif627@gmail.com
                  </p>
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative z-10">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-60 px-4">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-red/50 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-60 px-4">Email Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-red/50 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-60 px-4">Service Required</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-red/50 transition-colors appearance-none">
                    <option className="bg-matte-black">Logo Design</option>
                    <option className="bg-matte-black">Branding Design</option>
                    <option className="bg-matte-black">Flyer Design</option>
                    <option className="bg-matte-black">Business Card Design</option>
                    <option className="bg-matte-black">Brochure Design</option>
                    <option className="bg-matte-black">Packaging Design</option>
                    <option className="bg-matte-black">Social Media Management</option>
                    <option className="bg-matte-black">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-60 px-4">Project Details</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-red/50 transition-colors" placeholder="Tell me about your project..."></textarea>
                </div>
                <button className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-neon-red hover:text-white transition-all flex items-center justify-center gap-3 group">
                  SEND MESSAGE <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </form>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-red/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xl font-bold tracking-tighter mb-2">MA CREATIVE <span className="text-neon-red">GRAPHICS</span></p>
              <p className="text-xs text-muted-gray font-medium">© 2026 Creative Director & Designer. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-neon-red hover:text-white transition-all hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
              Built with <span className="text-neon-red">♥</span> in the Studio
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
