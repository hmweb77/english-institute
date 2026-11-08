/* eslint-disable @next/next/no-img-element */
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { COURSE, SITE_URL } from "@/lib/site";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], display: "swap" });
const description = `Build confident, practical English in ${COURSE.duration}: ${COURSE.liveHours} hours of live online classes, Monday to Friday, in groups of ${COURSE.groupSize}.`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "IFLI English Immersion | Live online English course", template: "%s | IFLI English Immersion" },
  description,
  keywords: ["English immersion course", "online English classes", "intensive English course", "live English lessons", "English conversation course", "IFLI English"],
  authors: [{ name: "IFLI - Foreign Language Immersion" }],
  creator: "IFLI",
  publisher: "IFLI",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "en_GB", url: SITE_URL, siteName: "IFLI English Immersion",
    title: "IFLI English Immersion | Speak with confidence in 10 weeks", description,
    images: [{ url: "/photo_2026-03-03_17-25-20.jpg", width: 1280, height: 961, alt: "Tower Bridge in London" }],
  },
  twitter: { card: "summary_large_image", title: "IFLI English Immersion", description, images: ["/photo_2026-03-03_17-25-20.jpg"], creator: "@IFLI" },
  alternates: { canonical: SITE_URL },
  category: "Education",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": "https://iflimmersion.com/#organization", name: "IFLI - Foreign Language Immersion", url: "https://iflimmersion.com",
      logo: { "@type": "ImageObject", url: "https://iflimmersion.com/wp-content/uploads/logo.png" },
      description: "Live online language immersion programmes backed by more than 30 years of teaching experience.",
      contactPoint: { "@type": "ContactPoint", telephone: "+351-933-292-112", contactType: "Customer Service", email: "info@iflimmersion.com", availableLanguage: ["English", "Portuguese", "Spanish"] },
      sameAs: ["https://web.facebook.com/iflimmersion", "https://www.instagram.com/iflimmersion/", "https://www.youtube.com/channel/UC_8Xi94QukzHuN7X4SEMHUA", "https://www.linkedin.com/in/iflimmersion/"],
    },
    { "@type": "WebPage", "@id": `${SITE_URL}#webpage`, url: SITE_URL, name: "IFLI English Immersion", description, inLanguage: "en-GB", isPartOf: { "@id": "https://iflimmersion.com/#website" } },
    {
      "@type": "Course", "@id": `${SITE_URL}#course`, name: COURSE.name, description, provider: { "@id": "https://iflimmersion.com/#organization" },
      courseCode: "IFLI-EN-2027", educationalLevel: "Beginner to intermediate", inLanguage: "en", teaches: "Practical spoken and written English", timeRequired: "P10W",
      coursePrerequisites: "No formal prerequisite; a free level test is available.",
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", startDate: COURSE.startDate, endDate: COURSE.endDate, courseWorkload: "PT5H", instructor: { "@type": "Person", name: "IFLI English facilitators", description: "Experienced and qualified English facilitators" } },
      offers: [
        { "@type": "Offer", category: "Free plan", price: "0", priceCurrency: COURSE.currency, availability: "https://schema.org/InStock", url: `${SITE_URL}#pricing` },
        { "@type": "Offer", category: "Online plan", price: String(COURSE.onlinePrice), priceCurrency: COURSE.currency, availability: "https://schema.org/InStock", url: `${SITE_URL}#pricing` },
        { "@type": "Offer", category: "Premium plan", price: String(COURSE.premiumPrice), priceCurrency: COURSE.currency, availability: "https://schema.org/LimitedAvailability", url: `${SITE_URL}#pricing` },
      ],
    },
    { "@type": "WebSite", "@id": "https://iflimmersion.com/#website", url: "https://iflimmersion.com", name: "IFLI", description: "Live online language immersion programmes", publisher: { "@id": "https://iflimmersion.com/#organization" } },
    {
      "@type": "FAQPage", "@id": `${SITE_URL}#faq`,
      mainEntity: [
        { "@type": "Question", name: "What if I cannot attend every live class?", acceptedAnswer: { "@type": "Answer", text: "Every live class is recorded and available for at least one year, so you can catch up at a time that suits you." } },
        { "@type": "Question", name: "Is the course suitable for complete beginners?", acceptedAnswer: { "@type": "Answer", text: "Yes. The programme supports every level, including complete beginners." } },
        { "@type": "Question", name: "How much time should I set aside?", acceptedAnswer: { "@type": "Answer", text: "The live programme runs for one hour a day, Monday to Friday, for 10 weeks." } },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="dns-prefetch" href="https://airtable.com" />
        <link rel="preconnect" href="https://airtable.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#012169" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {children}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4RQ4QEQB8Z" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-4RQ4QEQB8Z',{page_path:window.location.pathname});` }} />
        <Script id="hotjar" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6584834,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r)})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');` }} />
        <Script id="facebook-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1393416825490964');fbq('track','PageView');`}</Script>
        <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1393416825490964&ev=PageView&noscript=1" alt="" /></noscript>
      </body>
    </html>
  );
}
