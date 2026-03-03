"use client"
import { Check, Video, BookOpen, Users, Award, Download, Smartphone, BarChart3, MessageSquare } from "lucide-react";
import materialsImage from "../../public/getSec.png";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerItem = (index) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" }
});

export default function WhatYouGetSection({ onEnrollClick }) {
  const [activeCategory, setActiveCategory] = useState(0);

  const deliverables = [
    {
      category: "Live Learning",
      icon: Video,
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
      items: [
        "30+ live interactive sessions with native speakers",
        "Real-time Q&A and instant feedback",
        "Speaking practice with classmates",
        "Interactive exercises and activities"
      ]
    },
    {
      category: "Learning Materials",
      icon: BookOpen,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      items: [
        "Complete A1 Portuguese textbook",
        "Workbook with 200+ exercises",
        "Vocabulary flashcard sets",
        "Grammar reference guide"
      ]
    },
    {
      category: "Digital Resources",
      icon: Smartphone,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      items: [
        "All session recordings (1 year access)",
        "Portuguese media library (podcasts, videos)",
        "Mobile app for learning on the go",
        "Progress tracking dashboard"
      ]
    },
    {
      category: "Community & Support",
      icon: Users,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      items: [
        "Access to student community forum",
        "Study groups with peers",
        "Email support from instructors",
        "Official IFLI completion certificate"
      ]
    }
  ];

  const features = [
    { icon: Video, title: "30+ Live Sessions", description: "Interactive classes" },
    { icon: Download, title: "Lifetime Access", description: "All materials forever" },
    { icon: Award, title: "Certificate", description: "Official completion" },
    { icon: BarChart3, title: "Track Progress", description: "Monitor your growth" },
    { icon: MessageSquare, title: "Community", description: "Connect with peers" },
    { icon: Smartphone, title: "Mobile App", description: "Learn anywhere" }
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 bg-white overflow-hidden" data-testid="section-what-you-get">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C8102E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#C8102E]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-20" {...fadeInUp}>
          

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-[#012169]" data-testid="text-deliverables-headline">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-[#2D4B8E] max-w-2xl mx-auto leading-relaxed">
            A complete Portuguese learning ecosystem designed for maximum results.
          </p>
        </motion.div>

        {/* Quick Feature Icons */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-4 bg-white border-2 border-[#E3E5E8] rounded-xl hover:border-[#C8102E] transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-linear-to-br from-[#C8102E] to-[#9B0E24] flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-bold text-[#012169] mb-1">{feature.title}</div>
                <div className="text-xs text-[#2D4B8E]">{feature.description}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <Image 
                src={materialsImage} 
                alt="Portuguese learning materials" 
                className="rounded-3xl w-full shadow-[0px_30px_50px_-12px_rgba(0,0,0,0.20),0px_15px_30px_-12px_rgba(0,0,0,0.12)] relative z-10"
                data-testid="img-materials"
              />

              {/* Floating elements */}
           

             
            </motion.div>
          </motion.div>

          {/* Deliverables with Interactive Tabs */}
          <div className="space-y-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {deliverables.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                      activeCategory === index
                        ? `bg-linear-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 text-[#2D4B8E] hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{category.category}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Content for Each Category */}
            {deliverables.map((section, sectionIndex) => (
              <motion.div 
                key={sectionIndex}
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: activeCategory === sectionIndex ? 1 : 0,
                  height: activeCategory === sectionIndex ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {activeCategory === sectionIndex && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${section.color} flex items-center justify-center`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#012169]">{section.category}</h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <motion.li 
                          key={itemIndex} 
                          className="flex items-start gap-3"
                          data-testid={`text-deliverable-${sectionIndex}-${itemIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                        >
                          <div className={`w-6 h-6 rounded-full bg-linear-to-br ${section.color} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-base leading-relaxed text-[#012169]">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <motion.button 
                className="group relative w-full md:w-auto px-10 py-6 rounded-full text-base font-semibold bg-linear-to-r from-[#C8102E] to-[#A80D24] text-white overflow-hidden shadow-lg"
                onClick={onEnrollClick}
                data-testid="button-enroll-deliverables"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-[#A80D24] to-[#8B0A1E]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Portuguese Journey
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}