import type { Metadata } from "next";
import { HomeContent } from "./home-content";

export const metadata: Metadata = {
  title: "Samuel Wu | Multidisciplinary Developer (Boulder, Colorado)",
  description: "Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. I build and ship revenue-generating software, AI automations, and high-performance websites. Full-stack engineer specializing in Next.js, TypeScript, and AI automation.",
  keywords: [
    "Samuel Wu",
    "multidisciplinary developer",
    "Boulder Colorado developer",
    "full-stack developer",
    "AI automation",
    "Next.js developer",
    "TypeScript developer",
    "software engineer Boulder",
    "product builder",
    "SaaS developer",
    "web developer Colorado",
  ],
  openGraph: {
    title: "Samuel Wu | Multidisciplinary Developer (Boulder, Colorado)",
    description: "I build and ship revenue-generating software, AI automations, and high-performance websites. Multidisciplinary developer based in Boulder, Colorado.",
    url: "https://samuelwu.me",
    siteName: "Samuel Wu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samuel Wu - Multidisciplinary Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Wu | Multidisciplinary Developer",
    description: "I build and ship revenue-generating software, AI automations, and high-performance websites. Based in Boulder, Colorado.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Samuel Wu | Multidisciplinary Developer",
    "description": "Portfolio of Samuel Wu, a multidisciplinary developer based in Boulder, Colorado",
    "url": "https://samuelwu.me",
    "inLanguage": "en-US",
    "about": {
      "@type": "Person",
      "name": "Samuel Wu",
      "jobTitle": "Multidisciplinary Developer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Boulder",
        "addressRegion": "CO",
        "addressCountry": "US",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <HomeContent />
    </>
  );
}
