"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const EXPERIENCES = [
  { name: "Experiência de Imersão de Inverno", dates: "19 Jan – 27 Mar" },
  { name: "Experiência de Imersão de Primavera", dates: "13 Abr – 19 Jun" },
  { name: "Experiência de Imersão de Verão", dates: "6 Jul – 11 Set" },
  { name: "Experiência de Imersão de Outono", dates: "5 Out – 11 Dez" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Experiences2026() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-gray-50" data-testid="section-experiences-2026">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-[#012169] mb-12 tracking-tight"
          {...fadeInUp}
        >
          Experiências 2026
        </motion.h2>

        <div className="grid gap-4 sm:gap-5">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.name}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C8102E]/20 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-[#C8102E]/10 text-[#9B0E24]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#012169]">
                    {exp.name}
                  </h3>
                  <p className="text-[#2D4B8E] font-medium mt-0.5">
                    {exp.dates}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
