"use client"
import { ExternalLink, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function LisbonProject() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#EEF1F9]">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#012169]">
            Apoiamos Causas Importantes
          </h2>
          <p className="text-xl text-[#2D4B8E] max-w-2xl mx-auto leading-relaxed">
            Na IFLI, orgulhamo-nos de apoiar organizações que fazem a diferença real nas comunidades de todo o mundo.
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <motion.div
            className="bg-white rounded-3xl shadow-[0px_30px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border-2 border-gray-100"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Centered Content */}
            <div className="p-10 md:p-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {/* Lisbon Project Logo */}
                <div className="mb-8 flex justify-center">
                  <Image
                    src="/lisbon-project.png"
                    alt="Lisbon Project Logo"
                    width={250}
                    height={100}
                    className="h-20 w-auto"
                    priority
                  />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-[#012169] mb-6">
                  Lisbon Project Association
                </h3>

                <p className="text-lg text-[#2D4B8E] leading-relaxed mb-8 max-w-2xl mx-auto">
                  Na IFLI, orgulhamo-nos de contribuir para a missão da Associação Lisbon Project.
                </p>

                <div className="space-y-4 mb-10">
                  <p className="text-base text-[#012169] font-medium">
                    Para saber mais sobre o Lisbon Project e o seu trabalho de impacto,<br />
                    visita o seu website e segue-os nas redes sociais:
                  </p>

                  {/* Social Links - Centered */}
                  <div className="flex flex-col items-center gap-3 text-sm text-[#2D4B8E]">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-teal-600" />
                      <a
                        href="https://www.lisbonproject.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#9B0E24] transition-colors"
                      >
                        Website: www.lisbonproject.org
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-600" />
                      <a
                        href="https://www.instagram.com/lisbonprojectassociation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#9B0E24] transition-colors"
                      >
                        Instagram: @lisbonprojectassociation
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-600" />
                      <a
                        href="https://www.facebook.com/lisbonprojectassociation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#9B0E24] transition-colors"
                      >
                        Facebook: Lisbon Project Association
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-600" />
                      <a
                        href="https://www.linkedin.com/company/lisbon-project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#9B0E24] transition-colors"
                      >
                        LinkedIn: Lisbon Project
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA Button - Centered */}
                <div className="flex justify-center">
                  <Link
                    href="https://donorbox.org/ifli-proudly-supports-the-lisbon-project"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="group relative px-10 py-5 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-teal-600 to-teal-700"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Doar Aqui
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}