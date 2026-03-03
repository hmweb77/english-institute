"use client"
import { Zap, Users2, Globe2, Clock, Award, Sparkles, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerItem = (index) => ({
  initial: { opacity: 0, y: 40, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { 
    duration: 0.5, 
    delay: index * 0.15, 
    ease: [0.25, 0.4, 0.25, 1]
  }
});

export default function BenefitsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Generate deterministic positions for particles to avoid hydration errors
  const particlePositions = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      left: `${(i * 7 + 10) % 100}%`,
      top: `${(i * 11 + 15) % 100}%`,
      duration: 3 + (i % 3),
      delay: (i % 5) * 0.4
    }));
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: "Progresso Rápido",
      description: "O nosso método intensivo de imersão ajuda-te a comunicar em inglês em apenas 10 semanas. A maioria dos alunos sente-se confiante em conversas básicas já na 5.ª semana.",
      gradient: "from-yellow-400 via-orange-400 to-red-500",
      bgGradient: "from-yellow-50 to-orange-50",
      accentColor: "#F59E0B"
    },
    {
      icon: Users2,
      title: "Aprendizagem em Pequenos Grupos",
      description: "Máximo de 12 participantes por sessão. Isso significa mais tempo para falar, atenção personalizada e uma evolução mais rápida das tuas competências.",
      gradient: "from-blue-400 via-cyan-400 to-teal-500",
      bgGradient: "from-blue-50 to-cyan-50",
      accentColor: "#3B82F6"
    },
    {
      icon: Globe2,
      title: "Inglês para a Vida Real",
      description: "Aprende inglês prático e moderno, usado em situações do dia a dia. Nada de frases de manual - desenvolve competências reais de conversação.",
      gradient: "from-green-400 via-emerald-400 to-teal-500",
      bgGradient: "from-green-50 to-emerald-50",
      accentColor: "#10B981"
    },
    {
      icon: Clock,
      title: "Acesso Flexível",
      description: "Não podes participar numa sessão ao vivo? Sem problema! Fica tudo gravado. Estuda ao teu ritmo com 1 ano de acesso a todos os materiais.",
      gradient: "from-purple-400 via-pink-400 to-rose-500",
      bgGradient: "from-purple-50 to-pink-50",
      accentColor: "#A855F7"
    },

  ];

  return (
    <section 
      ref={sectionRef}
      id="benefits" 
      className="relative py-24 md:py-32 px-6 bg-linear-to-br from-[#C8102E] via-[#A80D24] to-[#9B0E24] text-white overflow-hidden" 
      data-testid="section-benefits"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles - using deterministic positions */}
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div className="text-center mb-20" {...fadeInUp}>
         

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white" 
            data-testid="text-benefits-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
       Experiências de Imersão
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Tudo o que precisas para passar de principiante a falante confiante de inglês.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div key={index} {...staggerItem(index)}>
                <motion.div 
                  className="group relative p-8 h-full bg-white rounded-2xl overflow-hidden cursor-pointer"
                  data-testid={`card-benefit-${index}`}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{
                    boxShadow: "0px 20px 30px -6px rgba(0,0,0,0.15)"
                  }}
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${benefit.gradient} opacity-0`}
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Icon Container with Gradient */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-xl bg-linear-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-white relative z-10" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl blur-xl opacity-50"
                      style={{ background: benefit.accentColor }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-[#012169] relative z-10 group-hover:text-[#9B0E24] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-[#2D4B8E] leading-relaxed relative z-10">
                    {benefit.description}
                  </p>

                  {/* Decorative corner element */}
                  <motion.div
                    className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-linear-to-br ${benefit.gradient} opacity-0 blur-2xl`}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Arrow indicator on hover */}
                  <motion.div
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#C8102E] to-[#9B0E24] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.p 
            className="text-2xl font-semibold text-white/90 mb-4"
            animate={isInView ? { opacity: [0.9, 1, 0.9] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tudo pronto para começar? Lugares Limitados - Inscreve-te até 12 de abril de 2026.
          </motion.p>
         
        </motion.div>
      </div>
    </section>
  );
}