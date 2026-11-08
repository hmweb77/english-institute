'use client';

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import LisbonProject from "@/components/LisbonProject";
// import FreeTrialSection from "@/components/FreeTrialSection";

// Lazy load below-the-fold components with loading skeletons
const AboutProgram = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
});

const BenefitsSection = dynamic(() => import("@/components/Benefits"), {
  loading: () => <div className="min-h-screen bg-[#CE1124] animate-pulse" />
});

const PricingSection = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="min-h-screen bg-[#001845] animate-pulse" />
});

const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
});

const UpcomingEventsSection = dynamic(() => import("@/components/UpcomingEvents"), {
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />
});

const LeadMagnetSection = dynamic(() => import("@/components/LeadMagnet"), {
  loading: () => <div className="min-h-screen bg-[#F6F7FA] animate-pulse" />
});

const FinalCTASection = dynamic(() => import("@/components/FinalCTA"), {
  loading: () => <div className="min-h-screen bg-cover animate-pulse" />
});

const Experiences2026Section = dynamic(() => import("@/components/Experiences2026"), {
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" />
});

const FAQSection = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[400px] bg-gray-100 animate-pulse" />
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false
});
export default function Home() {

  // Preload Airtable connection for faster iframe loading
  useEffect(() => {
    // Create preconnect links for Airtable
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://airtable.com';
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://airtable.com';
    document.head.appendChild(dnsPrefetch);

    // Cleanup
    return () => {
      document.head.removeChild(preconnect);
      document.head.removeChild(dnsPrefetch);
    };
  }, []);

  const ENROLL_URL = "https://iflilanguages.fillout.com/registration";
  const handleEnrollClick = () => {
    window.open(ENROLL_URL, "_blank", "noopener,noreferrer");
  };

  const handleLeadMagnetSubmit = (data) => {
    console.log('Lead magnet submitted:', data);
  };

  return (
    <div className="min-h-screen">
      <Navbar onEnrollClick={() => handleEnrollClick()} />
      <HeroSection
        onEnrollClick={() => handleEnrollClick()}
        onTestClick={() => {}}
      />
      
      <Suspense fallback={<div className="min-h-screen" />}>
        <AboutProgram />
        <BenefitsSection />
        <PricingSection onSelectPlan={() => handleEnrollClick()} />
        <TestimonialsSection />
        <UpcomingEventsSection />
        <LeadMagnetSection onSubmit={handleLeadMagnetSubmit} />
        <Experiences2026Section />
        <FAQSection />
        <LisbonProject />
        <FinalCTASection onEnrollClick={() => handleEnrollClick()} />
        <Footer />
      </Suspense>
      
      <WhatsAppButton />
      
    </div>
  );
}
