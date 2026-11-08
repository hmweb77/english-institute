"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  ["What if I cannot attend every live class?", "Every class is recorded and remains available for at least one year. Join live whenever possible for the interaction, then use the recording and transcripts whenever you need to catch up."],
  ["Is the programme suitable for complete beginners?", "Yes. The programme supports all levels, including complete beginners. The free level test helps us guide you to the right group."],
  ["How much time should I set aside?", "Live classes run for one hour a day, Monday to Friday, for 10 weeks. Short review and practice between classes will help you progress faster."],
  ["How large are the groups?", "Each group has a minimum of four and a maximum of 10 participants."],
  ["Will I become conversational in 10 weeks?", "You will build confidence using the English you know. Your result depends on your starting level, attendance and daily practice, so we focus on meaningful, measurable progress rather than unrealistic fluency promises."],
  ["Can I keep the materials after the course?", "Yes. Course materials, class recordings and resources remain available for at least one year after the programme."],
  ["What is the difference between Online and Premium?", "Both include the full live programme. Premium adds two individual teacher sessions, a progress check-in, weekend practice and a reduced rate for private classes."],
  ["Is there a certificate?", "Yes. Participants receive an IFLI certificate of participation at the end of the experience."],
  ["What is the refund policy?", "Online and Premium plans include a five-day money-back guarantee."],
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-brand-red-pale px-5 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="font-bold text-brand-red">Questions, answered</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-brand-blue-dark sm:text-5xl">Everything you need to know before you begin.</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map(([question, answer], index) => <article key={question}>
            <h3><button onClick={() => setOpen(open === index ? -1 : index)} className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-extrabold text-brand-blue-dark" aria-expanded={open === index}><span>{question}</span><ChevronDown className={`size-5 shrink-0 text-brand-red transition-transform ${open === index ? "rotate-180" : ""}`} aria-hidden="true" /></button></h3>
            {open === index && <p className="max-w-3xl pb-6 leading-7 text-brand-blue-muted">{answer}</p>}
          </article>)}
        </div>
      </div>
    </section>
  );
}
