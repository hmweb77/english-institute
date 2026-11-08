import Image from "next/image";

export default function BrandLogo({ compact = false }) {
  return (
    <span className="inline-flex" aria-label="IFLI Languages">
      <Image
        src="/ifli-languages-logo-white.png"
        alt="IFLI Languages"
        width={4650}
        height={1929}
        sizes={compact ? "112px" : "144px"}
        className={`w-auto object-contain ${compact ? "h-9 sm:h-10" : "h-12 sm:h-14"}`}
        priority
      />
    </span>
  );
}
