"use client";
import Image from "next/image";
import { BookOpen, CalendarDays, MessagesSquare, UsersRound } from "lucide-react";
import { COURSE } from "@/lib/site";

const details = [
  { icon: CalendarDays, title: "10 focused weeks", text: COURSE.displayDates },
  { icon: MessagesSquare, title: "Live every weekday", text: "One interactive hour, Monday to Friday" },
  { icon: UsersRound, title: "Small groups", text: "Minimum 4, maximum 10 participants" },
  { icon: BookOpen, title: "Materials included", text: "Recordings, transcripts and digital library" },
];

export default function AboutProgram() {
  return (
    <section id="about" className="bg-white px-5 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-brand-blue sm:min-h-[560px]">
            <Image src="/photo_2026-03-03_17-25-20.jpg" alt="Tower Bridge in London, representing the English-speaking world" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-brand-blue-dark/95 p-5 text-white backdrop-blur sm:inset-x-8 sm:bottom-8 sm:p-7">
              <p className="text-3xl font-extrabold">30+ years</p>
              <p className="mt-1 text-sm text-white/75">helping learners communicate with confidence</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-brand-red">The IFLI method</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] text-brand-blue-dark sm:text-5xl">More than English lessons: a complete learning rhythm.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-blue-muted">You will learn with experienced and qualified English facilitators in live, interactive online classes. Every session is recorded, so you can review it later, and your digital classroom keeps lessons, transcripts and practice in one place.</p>
            <p className="mt-5 max-w-2xl leading-7 text-brand-blue-muted">The programme is designed for real communication: clear explanations, frequent speaking practice, useful feedback and steady progress across all 10 weeks.</p>
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {details.map(({ icon: Icon, title, text }) => <div key={title} className="bg-white p-5"><Icon className="size-6 text-brand-red" aria-hidden="true" /><h3 className="mt-4 font-extrabold text-brand-blue-dark">{title}</h3><p className="mt-1 text-sm leading-6 text-brand-blue-muted">{text}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
