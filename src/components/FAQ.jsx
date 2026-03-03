"use client"
import { useState } from "react";
import { ChevronDown, Search, HelpCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerItem = (index) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.4, delay: index * 0.08, ease: "easeOut" }
});

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "E se não puder participar em todas as sessões ao vivo?",
      answer: "Sem problema! Todas as sessões ao vivo são gravadas e ficam disponíveis por pelo menos 1 ano. Podes vê-las quando quiseres, ao teu ritmo. Recomendamos participar ao vivo sempre que possível para a experiência interativa, mas as gravações garantem que nunca perdes conteúdo.",
    },
    {
      question: "Sou principiante absoluto. Este curso é para mim?",
      answer: "Sim! Os programas foram criados para todos os níveis e são especialmente benéficos para iniciantes.",
    },
    {
      question: "Qual é a política de reembolso?",
      answer: "Oferecemos garantia de reembolso de 5 dias.",
    },
    {
      question: "Quanto tempo devo dedicar por semana?",
      answer: "Basta comprometeres-te a fazer algo em inglês cerca de 1 hora por dia. Pode ser participar numa sessão ao vivo, rever uma gravação, ouvir música em inglês, ver TV, falar com falantes nativos ou qualquer atividade que envolva escuta ou prática.",
    },
    {
      question: "Ficarei realmente conversacional em 10 semanas?",
      answer: "Sim! Ficarás conversacional no teu nível. O nosso método comprovado ajuda-te a ganhar confiança na comunicação com o que já sabes, em 10 semanas, se praticares todos os dias.",
    },
    {
      question: "Posso ficar com os materiais após o curso?",
      answer: "Sim. Tens acesso a todos os materiais, gravações e recursos por pelo menos 1 ano após o fim do curso.",
    },
    {
      question: "Qual é a diferença entre os planos?",
      answer: "As principais diferenças estão na inclusão de sessões ao vivo e apoio individual adicional 1-a-1.",
    },
    {
      question: "Há certificado no final?",
      answer: "Sim, todos os participantes recebem um certificado de participação no final da experiência. (Não é válido para nacionalidade.)",
    },
    {
      question: "Posso mudar de plano mais tarde?",
      answer: "Sim, podes fazer upgrade a qualquer momento. Não é possível fazer downgrade.",
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const displayedFaqs = selectedCategory === "All" 
    ? filteredFaqs 
    : filteredFaqs.filter(faq => faq.category === selectedCategory);

  return (
    <section id="faq" className="relative py-24 md:py-32 px-6 bg-linear-to-b from-white via-[#F5F6F7] to-white overflow-hidden" data-testid="section-faq">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#C8102E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#C8102E]/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeInUp}>
          

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-[#012169]" data-testid="text-faq-headline">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-[#2D4B8E] leading-relaxed">
          Tudo o que precisas de saber sobre as Experiências de Imersão da IFLI.
          </p>
        </motion.div>


        {/* FAQ Accordion */}
        <div className="space-y-4" data-testid="accordion-faq">
          <AnimatePresence>
            {displayedFaqs.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-[#2D4B8E]">No questions found matching &quot;{searchTerm}&quot;</p>
              </motion.div>
            ) : (
              displayedFaqs.map((faq, index) => (
                <motion.div key={index} {...staggerItem(index)}>
                  <motion.div 
                    className="bg-white border-2 border-[#E3E5E8] rounded-2xl overflow-hidden hover:border-[#C8102E]/30 transition-all duration-300"
                    data-testid={`accordion-item-${index}`}
                    whileHover={{ boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.1)" }}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left font-bold text-base px-6 py-6 flex items-center justify-between text-[#012169] hover:text-[#C8102E] transition-colors"
                    >
                      <span className="flex items-start gap-3 flex-1">
                        <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                          openIndex === index ? "text-[#C8102E]" : "text-[#E3E5E8]"
                        }`} />
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-[#2D4B8E] shrink-0" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-14">
                            <p className="text-[#2D4B8E] leading-relaxed text-base">
                              {faq.answer}
                            </p>
                            <div className="mt-4">
                              <span className="inline-block px-3 py-1 bg-[#C8102E]/10 text-[#C8102E] rounded-full text-xs font-medium">
                                {faq.category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}