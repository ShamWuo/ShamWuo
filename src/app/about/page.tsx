import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
    title: {
        absolute: "About — Samuel Wu | Multidisciplinary Developer (Boulder, Colorado)",
    },
    description: "About Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder who combines technical expertise with operational efficiency. Chinese-American software developer specializing in Next.js, TypeScript, and AI automation.",
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
        "Chinese-American developer",
        "freelance developer Boulder",
        "contract developer Colorado",
        "software consultant",
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
        languages: {
            "en-US": "/about",
            "zh-CN": "/about",
        },
    },
    openGraph: {
        title: "About — Samuel Wu | Multidisciplinary Developer (Boulder, Colorado)",
        description: "About Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder who combines technical expertise with operational efficiency.",
        url: "https://samuelwu.me/about",
        siteName: "Samuel Wu",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-about.jpg",
                width: 1200,
                height: 630,
                alt: "Samuel Wu - Multidisciplinary Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About — Samuel Wu | Multidisciplinary Developer",
        description: "About Samuel Wu — Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder.",
        images: ["/og-about.jpg"],
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
        "alternateName": ["Samuel Wu", "吴"],
        "givenName": "Samuel",
        "familyName": "Wu",
        "jobTitle": "Multidisciplinary Developer",
        "description": "Multidisciplinary Developer based in Boulder, Colorado. Full-stack engineer, AI automation specialist, and product builder who combines technical expertise with operational efficiency.",
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
            // Add social profiles when available
        ],
        "knowsAbout": [
            "Full-Stack Development",
            "AI Automation",
            "Next.js",
            "TypeScript",
            "Software Engineering",
            "Product Development",
            "SaaS",
            "Web Development",
            "React",
            "Node.js",
            "PostgreSQL",
            "Supabase",
            "Prisma",
            "API Development",
            "System Architecture",
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
