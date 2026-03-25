import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
    title: {
        absolute: "About — Samuel Wu | Full-Stack Software Developer & Startup Founder",
    },
    description: "About Samuel Wu — Full-Stack Software Developer & Startup Founder. Specializing in AI model orchestration (LLM APIs), tool-use, and complex UI/UX for web applications. Building AI-native diagnostic tools and scalable community OS.",
    keywords: [
        "Samuel Wu",
        "Full-Stack Software Developer",
        "Startup Founder",
        "AI orchestration",
        "AI model orchestration",
        "LLM API integration",
        "Tool-use specialist",
        "Function calling AI",
        "Next.js developer",
        "TypeScript expert",
        "SaaS founder",
        "Boulder tech",
        "AI-native tools",
    ],
    authors: [{ name: "Samuel Wu" }],
    creator: "Samuel Wu",
    publisher: "Samuel Wu",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://samuelwu.me"),
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About — Samuel Wu | Full-Stack Software Developer & Startup Founder",
        description: "Building AI-native diagnostic tools and scalable community OS. Specializing in AI model orchestration and complex system architecture.",
        url: "https://samuelwu.me/about",
        siteName: "Samuel Wu",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About — Samuel Wu | Full-Stack Software Developer",
        description: "Specializing in AI model orchestration and complex system architecture.",
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
    verification: {
        // Add verification codes if available
        // google: "verification_token",
        // yandex: "verification_token",
    },
};

export default function AboutPage() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Samuel Wu",
        "alternateName": ["ShamWuo"],
        "givenName": "Samuel",
        "familyName": "Wu",
        "jobTitle": "Full-Stack Software Developer & Startup Founder",
        "description": "Full-Stack Software Developer specializing in AI model orchestration, tool-use, and building scalable community platforms.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Boulder",
            "addressRegion": "CO",
            "postalCode": "80301",
            "addressCountry": "US",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.0150",
            "longitude": "-105.2705",
        },
        "nationality": {
            "@type": "Country",
            "name": "United States",
        },
        "birthPlace": {
            "@type": "Place",
            "name": "China",
        },
        "url": "https://samuelwu.me",
        "sameAs": [
            "https://github.com/ShamWuo",
        ],
        "knowsAbout": [
            "Full-Stack Development",
            "AI Model Orchestration",
            "LLM APIs",
            "Function Calling",
            "Next.js",
            "TypeScript",
            "System Architecture",
            "Product Development",
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Multidisciplinary Developer",
            "occupationLocation": {
                "@type": "City",
                "name": "Boulder",
                "addressRegion": "Colorado",
                "addressCountry": "US",
            },
            "skills": [
                "Full-Stack Development",
                "AI Automation",
                "TypeScript",
                "Next.js",
                "System Architecture",
                "Product Development",
            ],
        },
        "alumniOf": {
            "@type": "Organization",
            "name": "Software Development",
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://samuelwu.me",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://samuelwu.me/about",
            },
        ],
    };

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
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
        "url": "https://samuelwu.me/about",
        "about": "Samuel Wu is a multidisciplinary developer based in Boulder, Colorado, specializing in full-stack engineering, AI automation, and product development.",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
            <AboutContent />
        </>
    );
}
