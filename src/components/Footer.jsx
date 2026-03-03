"use client"
import { Facebook, Instagram, Youtube, Linkedin, Mail, MapPin, Phone, Heart, ArrowUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Newsletter signup:', newsletterEmail);
      setShowSuccess(true);
      setNewsletterEmail("");
      setIsSubmitting(false);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: "https://web.facebook.com/iflimmersion", label: "Facebook", color: "hover:bg-blue-500" },
    { icon: Instagram, href: "https://www.instagram.com/iflimmersion/", label: "Instagram", color: "hover:bg-pink-500" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UC_8Xi94QukzHuN7X4SEMHUA", label: "YouTube", color: "hover:bg-red-500" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/iflimmersion/", label: "LinkedIn", color: "hover:bg-blue-600" }
  ];

  const quickLinks = [
    { label: "Sobre as Experiências de Imersão IFLI", href: "#about" },
    { label: "Benefícios", href: "#benefits" },
    { label: "Preços", href: "#pricing" },
    { label: "Testemunhos", href: "#testimonials" },
    { label: "FAQ", href: "#faq" }
  ];



  return (
    <footer className="relative bg-[#012169] border-t-4 border-[#C8102E]" data-testid="footer">
      {/* UK flag accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C8102E] via-white/60 to-[#C8102E]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/horizontal-original-sin fondo-letras blancas-400x218px.png"
                alt="IFLI Logo"
                width={180}
                height={50}
                className="brightness-0 invert"
              />
            </motion.div>
            <p className="text-white/75 mb-6 leading-relaxed">
            Aprende inglês rapidamente com sessões online ao vivo, facilitadores qualificados e experientes e uma comunidade global.
            </p>
            
            {/* Social Links */}
          {/* Social Links */}
<div className="flex gap-3">
  {socialLinks.map((social, index) => {
    const IconComponent = social.icon;
    return (
      <motion.div
        key={social.label}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href={social.href}
          aria-label={social.label}
          className={`block p-3 bg-white/10 border-2 border-white/20 rounded-xl transition-all duration-300 ${social.color} hover:text-white hover:border-transparent group`}
          data-testid={`button-social-${social.label.toLowerCase()}`}
        >
          <IconComponent className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        </Link>
      </motion.div>
    );
  })}
</div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6 text-white">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-[#C8102E] transition-colors flex items-center gap-2 group"
                    data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#C8102E] transition-colors" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6 text-white">Contacta-nos</h4>
            <ul className="space-y-4">

{/* PHONE */}
<motion.li
  className="flex items-start gap-3"
  initial={{ opacity: 0, x: -10 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
>
  <div className="w-10 h-10 rounded-xl bg-[#C8102E]/10 flex items-center justify-center shrink-0">
    <Phone className="w-5 h-5 text-[#C8102E]" />
  </div>

  <Link
  href="https://wa.me/351933292112"
  className="text-white/70 text-sm hover:text-[#C8102E] transition"
>
  +351 933 292 112
</Link>

</motion.li>

{/* EMAIL */}
<motion.li
  className="flex items-start gap-3"
  initial={{ opacity: 0, x: -10 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.35 }}
>
  <div className="w-10 h-10 rounded-xl bg-[#C8102E]/10 flex items-center justify-center shrink-0">
    <Mail className="w-5 h-5 text-[#C8102E]" />
  </div>

  <Link
    href="mailto:info@iflimmersion.com"
    className="text-white/70 text-sm hover:text-[#C8102E] transition"
  >
   info@iflimmersion.com
  </Link>
</motion.li>
</ul>
          </motion.div>
    
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <p>© 2026 IFLI. Todos os direitos reservados.</p>
              <span className="hidden md:inline">•</span>
              <p className="flex items-center gap-1">
                Feito com <Heart className="w-4 h-4 text-[#C8102E] fill-current" /> em Portugal por <Link href="https://www.hmwebs.com/" target="blank" className="text-white/80 hover:text-[#C8102E] transition-colors font-medium">Oussama</Link>
              </p>
            </div>
            
            {/* <div className="flex flex-wrap gap-6 text-sm">
              <a href="#privacy" className="text-[#2D4B8E] hover:text-[#012169] transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#terms" className="text-[#2D4B8E] hover:text-[#012169] transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
              <a href="#refund" className="text-[#2D4B8E] hover:text-[#012169] transition-colors" data-testid="link-refund">
                Refund Policy
              </a>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-linear-to-r from-[#C8102E] to-[#9B0E24] text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}