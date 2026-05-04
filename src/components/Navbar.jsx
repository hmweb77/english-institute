"use client"
import { useState, useEffect } from "react";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onEnrollClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = ["about", "benefits", "pricing", "testimonials", "faq"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Sobre", href: "#about" },
    { label: "Benefícios", href: "#benefits" },
    { label: "Preços", href: "#pricing" },
    { label: "Testemunhos", href: "#testimonials" },
    { label: "Perguntas Frequentes", href: "#faq" },
  ];

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false); // Close menu immediately
    
    // Small delay for smooth UX
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#012169] backdrop-blur-md border-b border-[#012169]/80 shadow-lg"
          : "bg-transparent"
      }`}
      data-testid="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="text-2xl font-bold relative z-10" 
            data-testid="link-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src="/horizontal-original-sin fondo-letras blancas-400x218px.png" 
              alt="IFLI Logo" 
              width={300} 
              height={100}
              className={`h-24 w-auto transition-all duration-300 `}
              priority
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-all relative text-white ${activeSection === link.href.slice(1) ? "font-bold" : ""}`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    layoutId="activeSection"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}

            

            {/* Enroll Button */}
            <motion.button 
              onClick={onEnrollClick}
              className="relative px-6 py-2 bg-linear-to-r from-[#C8102E] to-[#A80D24] text-white rounded-full font-semibold overflow-hidden group"
              id="btn-enroll-nav"
              data-testid="button-enroll-nav"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-[#A80D24] to-[#8B0A1E]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Inscreve-te Agora</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4 space-y-3 bg-white rounded-2xl p-4 shadow-xl border border-[#E3E5E8]" 
              data-testid="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeSection === link.href.slice(1)
                      ? "bg-[#C8102E] text-white"
                      : "hover:bg-[#C8102E]/10 text-[#012169] border-l-2 border-transparent hover:border-[#C8102E]"
                  }`}
                  id={`btn-mobile-${link.href.slice(1)}`}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-4 py-3 border-2 border-[#E3E5E8] rounded-xl font-medium text-[#012169] hover:bg-[#F5F6F7] transition-colors duration-200 flex items-center justify-center gap-2"
                  data-testid="button-signin-mobile"
                >
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Link>
              </motion.div>
              
              <motion.button 
                onClick={() => {
                  onEnrollClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-linear-to-r from-[#C8102E] to-[#A80D24] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                id="btn-enroll-mobile"
                data-testid="button-enroll-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.98 }}
              >
                Inscreve-te Agora
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-[#C8102E] via-white/60 to-[#012169]"
        style={{
          width: (typeof window === 'undefined')
            ? '0%'
            : `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100}%`
        }}
        initial={{ width: 0 }}
      />
    </motion.nav>
  );
}