"use client";
import { useState } from "react";
import { BookOpenCheck, LockKeyhole, PlayCircle } from "lucide-react";
import { SAMPLE_CLASSROOM_URL } from "@/lib/site";

export default function LeadMagnetSection({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [status, setStatus] = useState("idle");
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/send-lead-magnet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Request failed");
      await onSubmit?.(form);
      setStatus("success");
      window.setTimeout(() => { window.location.href = SAMPLE_CLASSROOM_URL; }, 900);
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="free-resources" className="bg-surface px-5 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[1fr_.85fr]">
        <div className="bg-brand-blue p-7 text-white sm:p-10 lg:p-14">
          <p className="font-bold text-brand-red">Free plan</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em]">See how IFLI learning feels.</h2>
          <p className="mt-5 leading-7 text-white/80">Get instant access to a sample Google Classroom before you choose a paid plan.</p>
          <ul className="mt-8 space-y-5">{[[PlayCircle, "A one-hour sample class recording"], [BookOpenCheck, "A taste of the digital library"], [LockKeyhole, "No payment and no commitment"]].map(([Icon, text]) => <li key={text} className="flex items-center gap-3"><Icon className="size-6 text-brand-red" aria-hidden="true" /><span className="font-semibold">{text}</span></li>)}</ul>
        </div>
        <form onSubmit={submit} className="p-7 sm:p-10 lg:p-14" aria-label="Get free IFLI resources">
          <h3 className="text-2xl font-extrabold text-brand-blue-dark">Open your sample classroom</h3>
          <p className="mt-2 text-sm text-brand-blue-muted">We will use these details to send your access information.</p>
          <div className="mt-7 space-y-5">
            <label className="block text-sm font-bold text-brand-blue-dark">Name<input name="name" value={form.name} onChange={update} required autoComplete="name" className="mt-2 min-h-12 w-full rounded-lg border border-line px-4 font-normal focus:border-brand-red focus:outline-none" /></label>
            <label className="block text-sm font-bold text-brand-blue-dark">Email<input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" className="mt-2 min-h-12 w-full rounded-lg border border-line px-4 font-normal focus:border-brand-red focus:outline-none" /></label>
            <label className="block text-sm font-bold text-brand-blue-dark">WhatsApp number<input name="whatsapp" type="tel" value={form.whatsapp} onChange={update} required autoComplete="tel" className="mt-2 min-h-12 w-full rounded-lg border border-line px-4 font-normal focus:border-brand-red focus:outline-none" /></label>
          </div>
          <button disabled={status === "loading" || status === "success"} className="mt-7 min-h-12 w-full rounded-full bg-brand-red px-6 font-bold text-white hover:bg-brand-red-dark disabled:opacity-60">{status === "loading" ? "Opening your classroom…" : status === "success" ? "Access ready" : "Open the sample classroom"}</button>
          {status === "error" && <p role="alert" className="mt-4 text-sm font-semibold text-brand-red">We could not submit the form. Please try again or contact info@iflimmersion.com.</p>}
          <p className="mt-4 text-xs leading-5 text-brand-blue-muted">By continuing, you agree that IFLI may contact you about this resource and relevant courses.</p>
        </form>
      </div>
    </section>
  );
}
