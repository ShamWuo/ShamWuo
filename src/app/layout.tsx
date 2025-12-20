import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Samuel Wu | Multidisciplinary Developer",
    template: "%s | Samuel Wu",
  },
  description: "Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder who combines technical expertise with operational efficiency.",
  keywords: [
    "Samuel Wu",
    "multidisciplinary developer",
    "full-stack developer",
    "AI automation",
    "Boulder Colorado developer",
    "software engineer",
    "product builder",
    "Next.js developer",
    "TypeScript developer",
    "SaaS builder",
    "Chinese developer",
    "Boulder tech",
  ],
  authors: [{ name: "Samuel Wu" }],
  creator: "Samuel Wu",
  publisher: "Samuel Wu",
  metadataBase: new URL("https://samuelwu.me"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "zh-CN": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuelwu.me",
    siteName: "Samuel Wu",
    title: "Samuel Wu | Multidisciplinary Developer",
    description: "Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder.",
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
    description: "Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Samuel Wu",
    "alternateName": "Samuel Wu Portfolio",
    "url": "https://samuelwu.me",
    "description": "Portfolio of Samuel Wu, a multidisciplinary developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder.",
    "inLanguage": ["en-US", "zh-CN"],
    "author": {
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Samuel Wu",
    "url": "https://samuelwu.me",
    "logo": "https://samuelwu.me/logo.png",
    "sameAs": [
      // Add social profiles when available
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boulder",
      "addressRegion": "CO",
      "addressCountry": "US",
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth" dir="ltr">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-background text-foreground flex flex-col min-h-screen"
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
