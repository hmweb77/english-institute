"use client"
import { Star, Quote, Play, ChevronLeft, ChevronRight, Award, TrendingUp } from "lucide-react";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // const sectionRef = useRef(null);
  // const isInView = useInView(sectionRef, { once: true });
  // const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [  
 {
      name: "Christiane",
      achievement: "A1",
      rating: 5,
      quote: "It was the best choice - I am really happy I found this course! The experience is just great, we have a fantastic teacher and our progress is amazing!",
      gradient: "from-orange-400 to-red-500",
    },
     {
      name: "Tasha",
      achievement: "A1",
      rating: 5,
      quote: "Class is the high point of my day — I look forward to it.",
      gradient: "from-orange-400 to-red-500",
    },
    {
      name: "Marisa",
      achievement: "A2 part I",
      rating: 5,
      quote: "The classes are a good mix of didactic and experiential. Lots of speaking which is so challenging but really helps with learning. We have an excellent teacher!",
      gradient: "from-blue-400 to-cyan-500",
    },
     {
      name: "Raele",
      achievement: "A1",
      rating: 5,
      quote: "Always useful and educational, often fun. Classes are challenging, but manageable.",
      gradient: "from-orange-400 to-red-500",
    },
    {
      name: "Kira",
      achievement: "A1",
      rating: 5,
      quote: "I learn a lot every week. I really appreciate that it is Monday to Friday.",
      gradient: "from-orange-400 to-red-500",
      hasVideo: false
    },

 {
      name: "Anita",
      achievement: "A1",
      rating: 5,
      quote: "I have found the classes excellent, a good blend of explanation and interaction with classmates through speaking. This method of learning really works for me and I am looking forward to more classes.",
      gradient: "from-orange-400 to-red-500 ",
    },
    
 {
      name: "Lara",
      achievement: "A1",
      rating: 5,
      quote: "The sessions have been wonderful! I love the progression of things we are learning and building upon each other.",
      gradient: "from-orange-400 to-red-500 ",
    },
    
    
  ];

  const cardsToShow = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = testimonials.length - cardsToShow;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  // useEffect(() => {
  //   if (isAutoPlaying) {
  //     const interval = setInterval(() => {
  //       nextSlide();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isAutoPlaying, currentIndex, nextSlide]);

  // Pause auto-play on hover
  // const handleMouseEnter = () => setIsAutoPlaying(false);
  // const handleMouseLeave = () => setIsAutoPlaying(true);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section 
    
      id="testimonials" 
      className="relative py-24 md:py-32 px-6 bg-linear-to-br from-white via-[#F5F6F7] to-white overflow-hidden" 
      data-testid="section-testimonials"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#C8102E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#C8102E]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div className="text-center mb-20" {...fadeInUp}>
          

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-[#012169]" data-testid="text-testimonials-headline">
          Junta-te a alunos de todo o mundo.
          </h2>
          <p className="text-xl text-[#2D4B8E] max-w-2xl mx-auto leading-relaxed">
          Histórias reais de pessoas que se tornaram falantes confiantes de inglês em apenas 10 semanas. Torna-te a nossa próxima história de sucesso.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
      
        >
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white border-2 border-[#E3E5E8] rounded-full flex items-center justify-center hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white border-2 border-[#E3E5E8] rounded-full flex items-center justify-center hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden px-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="grid md:grid-cols-3 gap-8"
              >
                {testimonials.slice(currentIndex, currentIndex + cardsToShow).map((testimonial, index) => (
                  <motion.div 
                    key={currentIndex + index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div 
                      className="group relative p-8 h-full bg-white border-2 border-[#E3E5E8] rounded-2xl overflow-hidden cursor-pointer" 
                      data-testid={`card-testimonial-${currentIndex + index}`}
                      whileHover={{ 
                  
                        borderColor: "#C8102E",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-linear-to-brr ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />

                      {/* Quote icon */}
                      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-16 h-16 text-[#C8102E]" />
                      </div>

                      {/* Star Rating */}
                      <div className="flex gap-1 mb-4 relative z-10">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                          >
                            <Star className="w-5 h-5 fill-[#C8102E] text-[#C8102E]" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <p className="text-base leading-relaxed mb-6 text-[#012169] relative z-10">
                        {testimonial.quote}
                      </p>

                      {/* Student Info */}
                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        {/* <motion.div 
                          className="relative w-14 h-14 rounded-full ring-2 ring-[#C8102E]/20 overflow-hidden" 
                          data-testid={`avatar-testimonial-${currentIndex + index}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Image src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          {testimonial.hasVideo && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </motion.div> */}
                        <div className="flex-1">
                          <p className="font-bold text-base text-[#012169]">{testimonial.name}</p>
                          {/* <p className="text-sm text-[#2D4B8E]">{testimonial.role}</p>
                          <p className="text-xs text-[#2D4B8E]">{testimonial.country} {testimonial.location}</p> */}
                        </div>
                      </div>

                      {/* Achievement Badge */}
                      <motion.div 
                        className={`inline-block px-3 py-1 bg-linear-to-r ${testimonial.gradient} text-white rounded-full text-sm font-medium relative z-10`}
                        data-testid={`badge-achievement-${currentIndex + index}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {testimonial.achievement}
                      </motion.div>

                      {/* Decorative corner */}
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-[#C8102E]/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-[#C8102E]' : 'w-2 bg-[#E3E5E8]'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg text-[#2D4B8E] mb-4">
             Torna-te a nossa próxima história de sucesso
          </p>
         
        </motion.div>
      </div>
    </section>
  );
}