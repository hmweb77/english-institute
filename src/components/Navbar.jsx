"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

const links = [
  { label: "The programme", href: "#about" },
  { label: "Why IFLI", href: "#benefits" },
  { label: "Plans", href: "#pricing" },
  { label: "Student stories", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onEnrollClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const current = links.find(({ href }) => {
        const element = document.querySelector(href);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 110 && rect.bottom >= 110;
      });
      setActive(current?.href || "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const goTo = (href) => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || open ? "border-white/10 bg-brand-blue-dark/95 backdrop-blur" : "border-transparent bg-brand-blue-dark/30"}`} aria-label="Main navigation">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" aria-label="IFLI Languages home"><BrandLogo light compact /></a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => <button key={link.href} onClick={() => goTo(link.href)} className={`relative py-2 text-sm font-semibold transition-colors hover:text-white ${active === link.href ? "text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-brand-red" : "text-white/80"}`}>{link.label}</button>)}
          <button onClick={onEnrollClick} className="min-h-11 rounded-full bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-red-dark">Enrol now</button>
        </div>
        <button className="grid size-11 place-items-center rounded-full border border-white/30 text-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.div id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-brand-blue-dark px-5 pb-5 lg:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {links.map((link) => <button key={link.href} onClick={() => goTo(link.href)} className={`min-h-12 rounded-lg px-4 text-left font-semibold ${active === link.href ? "bg-brand-red text-white" : "text-white hover:bg-white/10"}`}>{link.label}</button>)}
            <button onClick={() => { setOpen(false); onEnrollClick(); }} className="mt-3 min-h-12 rounded-lg bg-brand-red px-4 font-bold text-white">Enrol now</button>
          </div>
        </motion.div>}
      </AnimatePresence>
    </nav>
  );
}
