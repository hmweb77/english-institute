"use client";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3, UsersRound } from "lucide-react";
import { COURSE } from "@/lib/site";

export default function HeroSection({ onEnrollClick }) {
  return (
    <section id="top" className="relative min-h-[720px] overflow-hidden bg-brand-blue-dark pt-20 text-white">
      <Image src="/photo_2026-03-03_17-25-24.jpg" alt="The London skyline at sunset" fill priority sizes="100vw" className="object-cover object-center opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,24,69,.98)_0%,rgba(1,33,105,.88)_52%,rgba(1,33,105,.35)_100%)]" />
      <div className="absolute inset-y-0 right-[13%] hidden w-px rotate-[18deg] bg-white/25 lg:block" />
      <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">Next cohort · {COURSE.displayDates}</p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">English that works in real life.</h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/85 sm:text-xl">Build confidence through one live, interactive hour every weekday—guided by experienced and qualified English facilitators.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={onEnrollClick} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand-red px-8 font-bold text-white transition-colors hover:bg-brand-red-dark">Enrol in the next cohort <ArrowRight className="size-5" aria-hidden="true" /></button>
            <a href="https://form.jotform.com/222384841866364" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-white px-8 font-bold text-white transition-colors hover:bg-white hover:text-brand-blue">Take the free level test</a>
          </div>
          <p className="mt-5 text-sm text-white/70">Beginner to intermediate · recordings included · five-day refund guarantee</p>
        </div>
      </div>
      <div className="relative border-t border-white/15 bg-brand-blue/90">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 sm:grid-cols-4 lg:px-8">
          {[
            [CalendarDays, COURSE.duration, COURSE.schedule],
            [Clock3, `${COURSE.liveHours} live hours`, "One hour each weekday"],
            [UsersRound, COURSE.groupSize, "More time to speak"],
            [ArrowRight, "Online from anywhere", "Live classes and recordings"],
          ].map(([Icon, value, label]) => <div key={value} className="flex min-h-28 items-center gap-3 border-white/15 px-3 py-5 sm:border-l sm:px-5"><Icon className="size-6 shrink-0 text-brand-red" aria-hidden="true" /><div><dt className="font-extrabold">{value}</dt><dd className="mt-1 text-xs leading-5 text-white/70">{label}</dd></div></div>)}
        </dl>
      </div>
    </section>
  );
}
