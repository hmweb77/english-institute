"use client";
import { Check, Minus } from "lucide-react";
import { COURSE, SAMPLE_CLASSROOM_URL } from "@/lib/site";

const groups = [
  {
    title: "Included in every plan",
    rows: [
      { label: "Free English level test", free: true, online: true, premium: true },
      { label: "Google Classroom", free: "Sample", online: true, premium: true, sample: true },
      { label: "A taste of the digital library", free: "Sample", online: true, premium: true, sample: true },
    ],
  },
  {
    title: "Included in Online and Premium",
    rows: [
      { label: "10 weeks, Monday to Friday, 50 hours of live classes", free: false, online: true, premium: true },
      { label: "Small live groups: 4–10 participants", free: false, online: true, premium: true },
      { label: "Class recordings with meeting and chat transcripts", free: "Sample", online: true, premium: true, sample: true },
      { label: "Google Calendar and weekly group recap", free: false, online: true, premium: true },
      { label: "Student WhatsApp group", free: false, online: true, premium: true },
      { label: "10% off your next course", free: false, online: true, premium: true },
    ],
  },
  {
    title: "Included in Premium only",
    rows: [
      { label: "Two individual 30-minute sessions with an IFLI teacher", free: false, online: false, premium: true },
      { label: "30-minute progress check-in with your teacher in week 5", free: false, online: false, premium: true },
      { label: "Extra weekend practice with answer keys", free: false, online: false, premium: true },
      { label: "Private classes for €30/hour instead of €35/hour", free: false, online: false, premium: true },
    ],
  },
];

const plans = [
  { key: "free", name: "Free", price: "€0", description: "Try the IFLI learning experience before you enrol.", cta: "Open the sample classroom" },
  { key: "online", name: "Online", price: `€${COURSE.onlinePrice}`, description: "The complete live group programme.", cta: "Choose Online", popular: true },
  { key: "premium", name: "Premium", price: `€${COURSE.premiumPrice}`, description: "The live programme plus personal teacher support.", cta: "Choose Premium" },
];

const support = [
  { name: "Private class with an IFLI teacher", detail: "A focused 60-minute one-to-one lesson. Premium learners pay €30.", price: "€35" },
  { name: "10-hour private class pack", detail: "Ten 60-minute lessons, valid for four months.", price: "€300" },
  { name: "One hour with Giselle", detail: "Strategy, exam preparation or a specific challenge, followed by a written summary and clear goals. Four appointments available per week.", price: "€70" },
  { name: "Personalised Learning Roadmap", detail: "A 30-minute strategy session before the course, a written roadmap and goals, plus a 30-minute mid-course check-in. Limited to 10 people per cohort.", price: "€120" },
];

function Value({ value }) {
  if (value === true) return <span className="inline-grid size-7 place-items-center rounded-full bg-brand-blue text-white" aria-label="Included"><Check className="size-4" aria-hidden="true" /></span>;
  if (value === "Sample") return <a href={SAMPLE_CLASSROOM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-red underline decoration-2 underline-offset-4">Sample</a>;
  return <span className="inline-grid size-7 place-items-center text-slate-400" aria-label="Not included"><Minus className="size-4" aria-hidden="true" /></span>;
}

export default function PricingSection({ onSelectPlan }) {
  const choose = (plan) => plan.key === "free" ? window.open(SAMPLE_CLASSROOM_URL, "_blank", "noopener,noreferrer") : onSelectPlan(plan.name);
  return (
    <section id="pricing" className="bg-brand-blue-dark px-5 py-20 text-white sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-white/20 pb-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div><p className="font-bold text-white/75">Plans and pricing</p><h2 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Choose the support that fits your English goals.</h2></div>
          <p className="max-w-xl text-white/75 lg:justify-self-end">Cohort: {COURSE.displayDates}. The free plan gives you a genuine sample; Online and Premium include the full 10-week live experience.</p>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {plans.map((plan) => <article key={plan.key} className={`rounded-2xl bg-white p-6 text-brand-blue-dark ${plan.popular ? "border-4 border-brand-red" : "border border-line"}`}>
            {plan.popular && <p className="mb-4 inline-flex rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white">Most popular</p>}
            <div className="flex items-end justify-between gap-4"><h3 className="text-2xl font-extrabold">{plan.name}</h3><p className="text-3xl font-extrabold text-brand-blue">{plan.price}</p></div>
            <p className="mt-3 text-sm text-brand-blue-muted">{plan.description}</p>
            <div className="mt-6 space-y-5">{groups.map((group) => <div key={group.title}><h4 className="border-b border-line pb-2 text-sm font-extrabold text-brand-red">{group.title}</h4><ul className="mt-3 space-y-3">{group.rows.map((row) => <li key={row.label} className="flex items-start gap-3 text-sm"><Value value={row[plan.key]} /><span>{row.label}</span></li>)}</ul></div>)}</div>
            <button onClick={() => choose(plan)} className={`mt-7 min-h-12 w-full rounded-full px-5 font-bold ${plan.popular ? "bg-brand-red text-white" : "bg-brand-blue text-white"}`}>{plan.cta}</button>
          </article>)}
        </div>

        <div className="mt-10 hidden overflow-hidden rounded-2xl bg-white text-brand-blue-dark shadow-2xl md:block">
          <table className="w-full table-fixed border-collapse">
            <caption className="sr-only">Comparison of Free, Online and Premium IFLI English plans</caption>
            <thead><tr><th scope="col" className="w-[43%] p-6 text-left text-xl">What you receive</th>{plans.map((plan) => <th scope="col" key={plan.key} className={`p-6 text-center ${plan.popular ? "bg-brand-red-pale" : ""}`}>{plan.popular && <span className="mb-2 inline-flex rounded-full bg-brand-red px-3 py-1 text-xs text-white">Most popular</span>}<span className="block text-xl font-extrabold">{plan.name}</span><span className="mt-2 block text-3xl font-extrabold text-brand-blue">{plan.price}</span><button onClick={() => choose(plan)} className={`mt-4 min-h-11 rounded-full px-5 text-sm font-bold text-white ${plan.popular ? "bg-brand-red" : "bg-brand-blue"}`}>{plan.cta}</button></th>)}</tr></thead>
            <tbody>{groups.map((group) => <FragmentGroup key={group.title} group={group} />)}</tbody>
          </table>
        </div>

        <section className="mt-16 rounded-2xl bg-white p-5 text-brand-blue-dark sm:p-8">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Personal support: add to any plan or book on its own</h3>
          <p className="mt-2 text-brand-blue-muted">Choose one option or combine them. No course plan is required.</p>
          <div className="mt-7 divide-y divide-line border-y border-line">{support.map((item) => <div key={item.name} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:gap-8"><div><h4 className="font-extrabold">{item.name}</h4><p className="mt-2 max-w-4xl text-sm leading-6 text-brand-blue-muted">{item.detail}</p></div><p className="text-xl font-extrabold text-brand-red sm:text-right">{item.price}</p></div>)}</div>
          <button onClick={() => onSelectPlan("Personal support")} className="mt-7 min-h-12 rounded-full bg-brand-red px-7 font-bold text-white hover:bg-brand-red-dark">Ask about personal support</button>
        </section>
      </div>
    </section>
  );
}

function FragmentGroup({ group }) {
  return <><tr><th colSpan="4" className="border-y border-line bg-surface px-6 py-3 text-left text-sm font-extrabold text-brand-red">{group.title}</th></tr>{group.rows.map((row) => <tr key={row.label} className="border-b border-line last:border-b-0"><th scope="row" className="px-6 py-4 text-left text-sm font-semibold">{row.label}</th>{plans.map((plan) => <td key={plan.key} className={`px-4 py-4 text-center ${plan.popular ? "bg-brand-red-pale" : ""}`}><Value value={row[plan.key]} /></td>)}</tr>)}</>;
}
