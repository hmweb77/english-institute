"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const CALENDAR_URL = "https://luma.com/calendar/manage/cal-ALD4ESReEtrOYZN/events";

export default function UpcomingEventsSection() {
  return (
    <section
      id="upcoming-events"
      className="relative py-24 md:py-32 px-6 bg-gray-50 text-[#012169]"
      data-testid="section-upcoming-events"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8102E]/10 text-[#C8102E] rounded-full mb-6 font-medium text-sm">
            <Calendar className="w-4 h-4" />
            <span>Próximos Eventos</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-[#012169]">
            Junte-se a Nós ao Vivo
          </h2>
          <p className="text-xl text-[#2D4B8E] mb-12 font-medium">
            Eventos gratuitos, aulas de experiência e sessões de esclarecimento - sem compromisso.
          </p>

          <div className="space-y-6 text-lg text-[#2D4B8E] leading-relaxed text-left max-w-2xl mx-auto mb-12">
            <p>
              Ainda não tem a certeza se o IFLI é para si? Venha experimentar por conta própria. Realizamos regularmente eventos gratuitos, sessões abertas de perguntas e respostas e aulas experimentais de português - para que possa conhecer o nosso método antes de se inscrever.
            </p>
            <p>
              Consulte os próximos eventos e reserve o seu lugar - as vagas são limitadas.
            </p>
          </div>

          <motion.a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8102E] hover:bg-[#A80D24] text-white font-semibold rounded-full shadow-lg transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            data-testid="link-calendar"
          >
            Ver o Calendário Completo
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
