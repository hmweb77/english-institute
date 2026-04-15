"use client"
import { useMemo, useState, useEffect } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const JOURNEY_START = new Date("2026-07-05T00:00:00");

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return timeLeft;
}

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 sm:w-20 md:w-24 h-14 sm:h-16 md:h-20 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20 shadow-lg">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

const COUNTDOWN_LABELS = { days: "Dias", hours: "Horas", minutes: "Minutos", seconds: "Segundos" };

export default function FinalCTASection() {
  const whatsappNumber = "351933292112";
  const whatsappMessage = encodeURIComponent("Olá! Tenho interesse no programa de Imersão em Inglês e gostaria de garantir o meu lugar.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const { days, hours, minutes, seconds } = useCountdown(JOURNEY_START);

  const particlePositions = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 13.7 + 23) % 100}%`,
      top: `${(i * 17.3 + 15) % 100}%`,
      size: 4 + (i % 4) * 2,
      duration: 4 + (i % 4),
      delay: (i % 6) * 0.5
    }));
  }, []);

  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden" data-testid="section-final-cta">
      <div className="absolute inset-0 bg-gradient-to-br from-[#012169] via-[#0A1F6B] to-[#C8102E]" />

      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C8102E]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          data-testid="text-final-cta-headline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          As Aulas Começam a 6 de Julho de 2026
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Torna-te um falante confiante de inglês em apenas 10 semanas.
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <CountdownBox value={days} label="Dias" />
          <CountdownBox value={hours} label="Horas" />
          <CountdownBox value={minutes} label="Minutos" />
          <CountdownBox value={seconds} label="Segundos" />
        </motion.div>

        <motion.p
          className="text-sm text-white/80 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Prazo: 5 de julho de 2026. Lugares limitados disponíveis.
        </motion.p>

        <motion.p
          className="text-base font-semibold text-white/95 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Lugares Limitados
        </motion.p>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold rounded-full bg-white text-[#9B0E24] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] transition-shadow duration-300"
          data-testid="button-enroll-final"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#C8102E] to-[#A80D24] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <Lock className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Garante o Teu Lugar Hoje
          </span>
          <motion.div
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.a>

        <motion.p
          className="mt-8 text-sm text-white/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          🔒 Pagamento seguro • 💯 Reembolso de 5 dias
        </motion.p>
      </div>
    </section>
  );
}
