import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const socials = [
  [Facebook, "Facebook", "https://web.facebook.com/iflimmersion"],
  [Instagram, "Instagram", "https://www.instagram.com/iflimmersion/"],
  [Youtube, "YouTube", "https://www.youtube.com/channel/UC_8Xi94QukzHuN7X4SEMHUA"],
  [Linkedin, "LinkedIn", "https://www.linkedin.com/in/iflimmersion/"],
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand-red bg-brand-blue-dark px-5 py-14 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div><BrandLogo light /><p className="mt-6 max-w-sm leading-7 text-white/70">Live online English learning with experienced facilitators, small groups and a global student community.</p><div className="mt-6 flex gap-2">{socials.map(([Icon, label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-white/20 text-white/80 hover:border-brand-red hover:bg-brand-red hover:text-white"><Icon className="size-5" /></a>)}</div></div>
        <div><h2 className="font-extrabold">Explore</h2><nav className="mt-5 flex flex-col items-start gap-3" aria-label="Footer navigation">{[["The programme", "#about"], ["Why IFLI", "#benefits"], ["Plans", "#pricing"], ["Student stories", "#testimonials"], ["FAQ", "#faq"]].map(([label, href]) => <a key={href} href={href} className="text-white/70 hover:text-white">{label}</a>)}</nav></div>
        <div><h2 className="font-extrabold">Contact IFLI</h2><div className="mt-5 space-y-4"><Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white"><Phone className="size-5 text-brand-red" />+351 933 292 112</Link><a href="mailto:info@iflimmersion.com" className="flex items-center gap-3 text-white/70 hover:text-white"><Mail className="size-5 text-brand-red" />info@iflimmersion.com</a></div></div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/15 pt-7 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between"><p>© 2027 IFLI. All rights reserved.</p><p>Website by <a href="https://www.nextdigits.ma/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/80 hover:text-white">Next Digits</a></p></div>
    </footer>
  );
}
