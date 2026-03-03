"use client"
import { X, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Toast({ title, description, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border-2 border-[#E3E5E8] rounded-[12px] shadow-[0px_20px_30px_-6px_rgba(0,0,0,0.15),0px_10px_20px_-6px_rgba(0,0,0,0.10)] p-4 w-[350px] pointer-events-auto"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C8102E]/10 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-[#C8102E]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#012169] mb-1">
            {title}
          </h3>
          <p className="text-sm text-[#2D4B8E] leading-relaxed">
            {description}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 text-[#2D4B8E] hover:text-[#012169] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className="mt-3 h-1 bg-[#E3E5E8] rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-[#C8102E]"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
}