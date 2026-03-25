import type { Metadata } from "next";
import { HomeContent } from "./home-content";

export const metadata: Metadata = {
  title: "Samuel Wu | Full-Stack Software Developer & Startup Founder",
  description: "Building AI-native diagnostic tools and scalable community OS. Samuel Wu is a developer based in Boulder, Colorado, specializing in Next.js, TypeScript, and AI orchestration.",
  keywords: [
    "Samuel Wu",
    "Full-Stack Developer",
    "Startup Founder",
    "Boulder Colorado developer",
    "AI-native tools",
    "Next.js",
    "TypeScript",
    "Supabase",
    "AI model orchestration",
    "software engineer Boulder",
  ],
  openGraph: {
    title: "Samuel Wu | Full-Stack Software Developer & Startup Founder",
    description: "Building AI-native diagnostic tools and scalable community OS. Based in Boulder, Colorado.",
    url: "https://samuelwu.me",
    siteName: "Samuel Wu",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Wu | Full-Stack Developer",
    description: "Building AI-native diagnostic tools and scalable community OS.",
  },
  alternates: {
    canonical: "/",
  },
};


export default function Home() {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Samuel Wu | Full-Stack Software Developer & Startup Founder",
    "description": "Building AI-native diagnostic tools and scalable community OS. Samuel Wu is a developer based in Boulder, Colorado.",
    "url": "https://samuelwu.me",
    "inLanguage": "en-US",
    "about": {
      "@type": "Person",
      "name": "Samuel Wu",
      "jobTitle": "Full-Stack Software Developer & Startup Founder",
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
