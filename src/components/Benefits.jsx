import { Clock3, Globe2, MessageCircleMore, UsersRound } from "lucide-react";

const benefits = [
  { icon: MessageCircleMore, title: "Progress through practice", text: "Speak in every class and receive useful feedback while the language is fresh." },
  { icon: UsersRound, title: "Small-group learning", text: "With 4–10 participants, everyone gets meaningful speaking time and personal attention." },
  { icon: Globe2, title: "English for real life", text: "Learn practical language for work, travel, study and everyday conversations—not textbook scripts." },
  { icon: Clock3, title: "Flexible access", text: "Miss a live class? Use the recording, meeting transcript and chat transcript to catch up." },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="bg-brand-red px-5 py-20 text-white sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-white/25 pb-10 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-3xl text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">A clear path from knowing English to using it.</h2>
          <p className="max-w-xl text-white/85 lg:justify-self-end">The same structured routine every weekday helps you keep momentum, while recordings give you room to learn at your own pace.</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/30 md:grid-cols-2">
          {benefits.map(({ icon: Icon, title, text }) => <article key={title} className="bg-brand-blue-dark p-7 sm:p-9"><Icon className="size-8 text-brand-red" aria-hidden="true" /><h3 className="mt-7 text-2xl font-extrabold">{title}</h3><p className="mt-3 max-w-xl leading-7 text-white/75">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
