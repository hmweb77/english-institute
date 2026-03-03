"use client"
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Replace this with your actual WhatsApp number (include country code without + or spaces)
  const whatsappNumber = "351933292112"; // Example: 351 for Portugal
  const whatsappMessage = encodeURIComponent("Olá! Tenho interesse no programa de Imersão em Inglês e gostaria de garantir o meu lugar.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-[#012169] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap font-medium text-sm"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: 'none' }}
      >
        Fala connosco no WhatsApp
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-white" />
      </motion.div>

      {/* Button */}
      <motion.div
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer"
        whileHover={{ boxShadow: "0 20px 40px -10px rgba(37, 211, 102, 0.5)" }}
      >
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 bg-[#25D366] rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Icon */}
        <MessageCircle className="w-7 h-7 text-white relative z-10" />

        {/* Notification dot */}
        <motion.div
          className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.a>
  );
}