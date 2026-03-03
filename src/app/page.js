'use client';

import { useState, Suspense, useEffect } from "react";
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
  loading: () => <div className="min-h-screen bg-[#C8102E] animate-pulse" />
});

const PricingSection = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="min-h-screen bg-[#C8102E] animate-pulse" />
});

const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
});

const LeadMagnetSection = dynamic(() => import("@/components/LeadMagnet"), {
  loading: () => <div className="min-h-screen bg-[#C8102E] animate-pulse" />
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
const Toast = dynamic(() => import("@/components/Toast"));


export default function Home() {
  const [toasts, setToasts] = useState([]);

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

  const showToast = (title, description) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 10000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const WHATSAPP_ENROLL_URL = "https://wa.me/351933292112?text=" + encodeURIComponent("Olá! Tenho interesse no programa de Imersão em Inglês e gostaria de garantir o meu lugar.");
  const handleEnrollClick = () => {
    window.open(WHATSAPP_ENROLL_URL, "_blank", "noopener,noreferrer");
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
        <LeadMagnetSection onSubmit={handleLeadMagnetSubmit} />
        <FinalCTASection onEnrollClick={() => handleEnrollClick()} />
        <Experiences2026Section />
        <FAQSection />
       <LisbonProject/>
        <Footer />
      </Suspense>
      
      <WhatsAppButton />
      
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 pointer-events-none z-50">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              title={toast.title}
              description={toast.description}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}