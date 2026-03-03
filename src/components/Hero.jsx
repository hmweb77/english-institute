"use client"
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection({ onEnrollClick, onTestClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  const { scrollY } = useScroll();
  
  // Simplified parallax for better performance
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);

  // Background images
  const backgrounds = [
    '/optimized/her1-1080.webp',
    '/optimized/hero2-1080.webp',
    '/algarve.png'
  ];

  // English words to animate
  const portugueseWords = [
    { text: "Hello", size: "text-4xl md:text-5xl" },
    { text: "Good morning", size: "text-3xl md:text-4xl" },
    { text: "How are you?", size: "text-4xl md:text-5xl" },
    { text: "Thank you", size: "text-3xl md:text-4xl" },
    { text: "Welcome", size: "text-4xl md:text-5xl" },
  ];

  // Simplified background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Simplified typewriter effect
  const headline = "Domina o Inglês em Apenas 10 Semanas";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < headline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + headline[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, headline]);

  return (
    <section 
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden pt-20 min-h-[90vh]"
    >
      {/* Optimized Background Images */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, index) => (
          <div
            key={bg}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentSlide === index ? 1 : 0,
            }}
          >
            <Image
              src={bg}
              alt={`Hero background ${index + 1}`}
              fill
              priority={index === 0}
              quality={index === 0 ? 85 : 75}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ))}
      </div>

      {/* Simplified Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(1, 33, 105, 0.88) 0%, rgba(1, 33, 105, 0.78) 60%, rgba(160, 13, 36, 0.65) 100%)`
        }}
      />

      {/* Animated Portuguese Words Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {portugueseWords.map((word, i) => (
          <motion.div
            key={i}
            className={`absolute ${word.size} font-bold text-white whitespace-nowrap`}
            style={{
              left: `${10 + (i * 18)}%`,
              top: `${15 + (i * 15)}%`,
            }}
            animate={{
              x: [0, (i % 2 === 0 ? 50 : -50), 0],
              y: [0, (i % 2 === 0 ? -30 : 30), 0],
              rotate: [0, (i % 2 === 0 ? 5 : -5), 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white"
       
      >
        {/* Simplified Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-8"
        >
          <span className="text-sm font-semibold">Inscrições Abertas</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            data-testid="text-hero-headline"
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-1 h-12 md:h-16 bg-white ml-2 align-middle"
            />
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl mb-10 font-medium opacity-95 max-w-3xl mx-auto leading-relaxed"
          data-testid="text-hero-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Passa do zero à conversa confiante. Aulas ao vivo. Professores reais. Resultados reais.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
        
          <button
            className="px-8 md:px-10 py-4 md:py-6 text-base md:text-lg font-semibold rounded-full min-w-[200px] md:min-w-[220px] bg-[#C8102E] text-white hover:bg-[#A80D24] transition-colors"
            onClick={onEnrollClick}
            data-testid="button-enroll-hero"
          >
            Inscreve-te Agora →
          </button>
          <Link className="px-8 md:px-10 py-4 md:py-6 text-base md:text-lg font-semibold text-white rounded-full min-w-[200px] md:min-w-[220px] bg-white/10 hover:bg-white hover:text-[#012169] border-2 border-white transition-colors duration-200 flex items-center justify-center gap-2" href="https://form.jotform.com/222385082740353" target="_blank" >
              <Play className="w-5 h-5" />
              Faz o Teste Gratuito
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Stat 1: 30+ years */}
          <motion.div
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
         
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold">
                {isStatsInView && <CountUp end={30} suffix="+ anos" />}
              </div>
              <div className="text-sm opacity-90">
                a ajudar alunos a falar
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
           
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold">
              Imersão linguística
              </div>
              <div className="text-sm opacity-90">
              a partir de qualquer lugar do mundo
              </div>
            </div>
          </motion.div>

          {/* Stat 3: 100% focus */}
          <motion.div
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
       
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold">
                {isStatsInView && <CountUp end={100} suffix="%" />}
              </div>
              <div className="text-sm md:text-base opacity-90">
                foco na comunicação oral
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20"
          data-testid="text-trust-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {/* <CheckCircle2 className="w-5 h-5 text-green-400" /> */}
          <span className="text-xs md:text-sm font-medium">
            Mais de 200 alunos em todo o mundo confiam em nós
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-4 md:right-8 flex gap-2">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Simplified CountUp Component
function CountUp({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 2000;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end]);

  return <>{count}{suffix}</>;
}