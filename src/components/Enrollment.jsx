"use client"
import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export default function EnrollmentModal({ open, onClose, selectedPlan }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!open) return null;

  // Construct the Airtable URL with pre-filled plan if provided
  const airtableUrl = "https://airtable.com/embed/appXmu812dVuCZf1d/paguXAaQRr6fIeUa9/form";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-xl shadow-[0px_30px_50px_-12px_rgba(0,0,0,0.20),0px_15px_30px_-12px_rgba(0,0,0,0.12)] w-full max-w-2xl mx-4 h-[90vh] flex flex-col"
        data-testid="modal-enrollment"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#012169]" data-testid="text-modal-title">
            Pre-Enroll in Portuguese Immersion
          </h2>
          <button
            onClick={onClose}
            className="text-[#2D4B8E] hover:text-[#012169] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#C8102E] animate-spin mx-auto mb-3" />
              <p className="text-sm text-[#2D4B8E]">Loading enrollment form...</p>
            </div>
          </div>
        )}

        {/* Airtable Iframe */}
        <div className="flex-1 relative overflow-hidden">
          <iframe
            src={airtableUrl}
            onLoad={() => setIsLoading(false)}
            className="absolute inset-0 w-full h-full border-0"
            style={{ background: 'transparent' }}
            title="Portuguese Immersion Enrollment Form"
          />
        </div>
      </div>
    </div>
  );
}