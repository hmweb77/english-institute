"use client"
import { useState } from "react";
import { X, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createTestResult } from "@/lib/airtable";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const questions = [
  {
    id: 1,
    question: "Choose the correct greeting.",
    options: ["Goodbye", "Hello", "Please", "Thanks"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Choose the correct past tense: Yesterday, I ___ to work.",
    options: ["go", "went", "gone", "going"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which word is closest in meaning to 'quick'?",
    options: ["Slow", "Fast", "Late", "Quiet"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Choose the correct sentence.",
    options: ["I am learning English.", "I is learning English.", "I learning English.", "I are learning English."],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "Which word describes a place where people live?",
    options: ["Car", "House", "Table", "Chair"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Which question asks about wellbeing?",
    options: ["How are you?", "Where are you?", "When is it?", "Why not?"],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "Which greeting is normally used before midday?",
    options: ["Good night", "Good afternoon", "Good morning", "Good evening"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which number comes after four?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Choose the correct sentence.",
    options: ["I speak English", "I speaking English", "I speaks English", "I spoke English every day"],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "Which word describes parents and children?",
    options: ["Friend", "Family", "Food", "Phone"],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "Which question asks about location?",
    options: ["How is it?", "When is it?", "Where is it?", "Who is it?"],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "Which phrase shows strong gratitude?",
    options: ["Very sorry", "Thank you very much", "Very good", "Very bad"],
    correctAnswer: 1
  }
];

export default function EnglishTestModal({ open, onClose, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(parseInt(value));
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null);
      } else {
        setShowEmailCapture(true);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const getRecommendation = (finalScore) => {
    const percentage = (finalScore / questions.length) * 100;
    
    if (percentage >= 75) {
      return "Online";
    } else if (percentage >= 40) {
      return "Online";
    }
    return "Online";
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const finalScore = calculateScore();
      const recommendation = getRecommendation(finalScore);
      const percentage = Math.round((finalScore / questions.length) * 100);

      // 1. Save to Firebase
      const testData = {
        email: email,
        score: finalScore,
        totalQuestions: questions.length,
        percentage: percentage,
        recommendation: recommendation,
        answers: answers,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "testResults"), testData);

      // 2. Save to Airtable
      const airtableData = {
        Email: email,
        Score: finalScore,
        "Total Questions": questions.length,
        Percentage: percentage,
        Recommendation: recommendation,
        "Created At": new Date().toISOString(),
        "Firebase ID": docRef.id
      };

      await createTestResult(airtableData);

      // 3. Send results email via Brevo
      await fetch('/api/send-test-results-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          score: finalScore,
          totalQuestions: questions.length,
          recommendation: recommendation
        }),
      });

      // 4. Show results and call parent callback
      setScore(finalScore);
      setShowResults(true);
      onComplete(email, finalScore);
    } catch (err) {
      console.error("Error submitting test results:", err);
      setError("Failed to submit test results. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowEmailCapture(false);
    setShowResults(false);
    setEmail("");
    setScore(0);
    setError("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-xl shadow-[0px_30px_50px_-12px_rgba(0,0,0,0.20),0px_15px_30px_-12px_rgba(0,0,0,0.12)] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        data-testid="modal-portuguese-test"
      >
        <div className="p-6">
          {!showEmailCapture && !showResults && (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-[#012169]" data-testid="text-test-title">
                      English Level Test
                    </h2>
                    <p className="text-sm text-[#2D4B8E]">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-[#2D4B8E] hover:text-[#012169] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="w-full bg-[#E3E5E8] rounded-full h-2" data-testid="progress-test">
                  <div 
                    className="bg-[#CE1124] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#012169]" data-testid={`text-question-${currentQuestion}`}>
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => handleAnswerSelect(index.toString())}
                        className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedAnswer === index 
                            ? 'border-[#CE1124] bg-[#CE1124]/5'
                            : 'border-[#E3E5E8] hover:border-[#CE1124]/50'
                        }`}
                        data-testid={`option-${currentQuestion}-${index}`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index 
                            ? 'border-[#CE1124]'
                            : 'border-[#E3E5E8]'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-3 h-3 rounded-full bg-[#CE1124]" />
                          )}
                        </div>
                        <label className="flex-1 cursor-pointer text-[#012169]">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    className={`px-4 py-2 border-2 border-[#E3E5E8] rounded-xl font-medium text-[#012169] hover:bg-[#F5F6F7] transition-colors duration-200 flex items-center gap-2 ${
                      currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    id="btn-test-back"
                    data-testid="button-back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className={`px-4 py-2 bg-[#CE1124] text-white rounded-xl font-medium hover:bg-[#A80D1D] transition-colors duration-200 flex items-center gap-2 ${
                      selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    id="btn-test-next"
                    data-testid="button-next"
                  >
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {showEmailCapture && !showResults && (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-[#012169]" data-testid="text-email-title">
                      Almost Done!
                    </h2>
                    <p className="text-sm text-[#2D4B8E]">
                      Enter your email to see your results and personalized course recommendation.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-[#2D4B8E] hover:text-[#012169] transition-colors"
                    disabled={isSubmitting}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="test-email" className="block text-sm font-medium text-[#012169] mb-2">
                    Email Address
                  </label>
                  <input
                    id="test-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 px-4 py-2 border-2 border-[#E3E5E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CE1124] focus:border-transparent text-[#012169] disabled:bg-gray-50 disabled:cursor-not-allowed"
                    data-testid="input-test-email"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEmailCapture(false)}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 border-2 border-[#E3E5E8] rounded-xl font-medium text-[#012169] hover:bg-[#F5F6F7] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-back-to-test"
                  >
                    Back to Test
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-[#CE1124] text-white rounded-xl font-medium hover:bg-[#A80D1D] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    id="btn-test-submit"
                    data-testid="button-show-results"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Show My Results"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {showResults && (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-[#012169]" data-testid="text-results-title">
                      Your Test Results
                    </h2>
                    <p className="text-sm text-[#2D4B8E]">
                      Check your email for your complete results and sample classroom link.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-[#2D4B8E] hover:text-[#012169] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center p-8 bg-[#F5F6F7] rounded-xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#CE1124]/10 mb-4">
                    <CheckCircle2 className="w-10 h-10 text-[#CE1124]" />
                  </div>
                  <div className="text-5xl font-bold mb-2 text-[#012169]" data-testid="text-score">
                    {score}/{questions.length}
                  </div>
                  <p className="text-[#2D4B8E]">Questions Correct</p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 border-2 border-[#E3E5E8] rounded-xl bg-white">
                    <h4 className="font-semibold mb-2 text-[#012169]">Recommended Plan:</h4>
                    <p className="text-lg font-bold text-[#CE1124] mb-2">
                      {getRecommendation(score)}
                    </p>
                    <p className="text-sm text-[#2D4B8E]">
                      Based on your results, this plan will help you work towards your English goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border-2 border-[#E3E5E8] rounded-xl font-medium text-[#012169] hover:bg-[#F5F6F7] transition-colors duration-200"
                    id="btn-test-close"
                    data-testid="button-close-results"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
                    }}
                    className="flex-1 px-4 py-2 bg-[#CE1124] text-white rounded-xl font-medium hover:bg-[#A80D1D] transition-colors duration-200"
                    id="btn-enroll-from-test"
                    data-testid="button-enroll-from-test"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
