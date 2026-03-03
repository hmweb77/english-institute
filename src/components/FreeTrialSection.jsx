"use client";
import { Clock, Video, Sparkles, ArrowRight, Globe, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerItem = (index) => ({
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.5,
    delay: index * 0.15,
    ease: "easeOut",
  },
});

export default function FreeTrialSection() {
  const trialSessions = [
    {
      level: "A1",
      time: "07:00",
      title: "New Year, New Way of Learning Portuguese",
      description: "Perfect for early birds & different time zones",
      icon: "🌅",
      gradient: "from-orange-400 to-amber-500",
      link: "https://luma.com/jxy53zst", // Replace with actual link
    },
    {
      level: "A1",
      time: "19:00",
      title: "New Year, New Way of Learning Portuguese",
      description: "Ideal for after-work learning",
      icon: "🌆",
      gradient: "from-blue-400 to-cyan-500",
      popular: true,
      link: "https://luma.com/137xs42s", // Replace with actual link
    },
    {
      level: "A2",
      time: "20:00",
      title: "New Year, New Way of Learning Portuguese",
      description: "For those with some Portuguese basics",
      icon: "🌙",
      gradient: "from-purple-400 to-pink-500",
      link: "https://luma.com/0go5gknl", // Replace with actual link
    },
  ];

  const benefits = [
    { icon: Video, text: "Live interactive session" },
    { icon: Globe, text: "Join from anywhere" },
    { icon: Calendar, text: "No commitment required" },
  ];

  return (
    <section
      id="free-trial"
      className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-white via-[#F5F6F7] to-white overflow-hidden"
      data-testid="section-free-trial"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#C8102E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#C8102E]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
         

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-[#012169]"
            data-testid="text-free-trial-headline"
          >
            Try a Session First
          </h2>
          <p className="text-xl text-[#2D4B8E] max-w-2xl mx-auto leading-relaxed">
            Not sure if this is right for you? Join a live session and experience our teaching method firsthand.
          </p>
        </motion.div>

        {/* Benefits Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E3E5E8] rounded-full"
                whileHover={{ scale: 1.05, borderColor: "#C8102E" }}
              >
                <IconComponent className="w-4 h-4 text-[#C8102E]" />
                <span className="text-sm font-medium text-[#012169]">{benefit.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trial Session Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {trialSessions.map((session, index) => (
            <motion.div key={index} {...staggerItem(index)}>
              <Link href={session.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <motion.div
                  className={`relative p-6 bg-white rounded-2xl border-2 ${
                    session.popular ? "border-[#C8102E]" : "border-[#E3E5E8]"
                  } overflow-hidden h-full cursor-pointer`}
                  whileHover={{
                    y: -8,
                    boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.15)",
                    borderColor: "#C8102E",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top gradient bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${session.gradient}`}
                  />

                  {/* Session Icon & Level */}
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-4xl">{session.icon}</span>
                    <div
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${session.gradient} text-white text-sm font-bold`}
                    >
                      Level {session.level}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-[#C8102E]" />
                    <span className="text-2xl font-bold text-[#012169]">{session.time}</span>
                    <span className="text-sm text-[#2D4B8E]">UTC</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#012169] mb-2">{session.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-[#2D4B8E] mb-4">{session.description}</p>

                  {/* Virtual Badge & Register CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#2D4B8E]">
                      <Video className="w-4 h-4" />
                      <span>Virtual Session</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-semibold bg-gradient-to-r ${session.gradient} bg-clip-text text-transparent`}>
                      Register
                      <ArrowRight className="w-4 h-4 text-[#C8102E]" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-[#2D4B8E]">
            🎁 Click on any session above to register!
          </p>
        </motion.div>
      </div>
    </section>
  );
}