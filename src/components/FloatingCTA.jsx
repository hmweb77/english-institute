"use client"
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA({ onEnrollClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            className="rounded-full px-8 py-6 shadow-[0px_30px_50px_-12px_rgba(0,0,0,0.20),0px_15px_30px_-12px_rgba(0,0,0,0.12)] font-semibold text-base bg-[#C8102E] text-white hover:bg-[#A80D24] transition-colors duration-200"
            onClick={onEnrollClick}
            data-testid="button-floating-enroll"
          >
            Enroll Now
          </button>
          
          <button
            className="rounded-full h-12 w-12 bg-white shadow-[0px_10px_20px_-4px_rgba(0,0,0,0.12),0px_6px_12px_-4px_rgba(0,0,0,0.08)] border-2 border-[#E3E5E8] flex items-center justify-center hover:bg-[#F5F6F7] transition-colors duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-testid="button-scroll-top"
          >
            <ArrowUp className="h-5 w-5 text-[#012169]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}