import { ArrowRight, ShieldCheck } from "lucide-react";
import { COURSE, ENROLL_URL } from "@/lib/site";

export default function FinalCTASection() {
  return (
    <section className="bg-brand-red px-5 py-20 text-white sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-bold text-white/80">Next cohort · {COURSE.displayDates}</p>
          <h2 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.04em] sm:text-6xl">Make English part of your weekday.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">Join 50 hours of live classes over 10 weeks, with a small group, recordings and a clear learning routine.</p>
        </div>
        <div className="lg:text-right">
          <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-extrabold text-brand-red transition-colors hover:bg-brand-blue-dark hover:text-white">Enrol now <ArrowRight className="size-5" aria-hidden="true" /></a>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/80 lg:justify-end"><ShieldCheck className="size-4" aria-hidden="true" /> Secure payment · five-day refund guarantee</p>
        </div>
      </div>
    </section>
  );
}
