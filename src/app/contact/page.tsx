import type { Metadata } from "next";
import { ContactContent } from "./contact-content";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Contact — Let's Talk",
    description: `Contact Samuel Wu, multidisciplinary developer based in Boulder, Colorado. Currently open to select projects. Email: ${SITE_CONFIG.email}`,
    keywords: [
        "contact Samuel Wu",
        "hire developer Boulder",
        "hire multidisciplinary developer",
        "Boulder Colorado developer",
        "freelance developer",
        "software developer contact",
    ],
    openGraph: {
        title: "Contact — Let's Talk | Samuel Wu",
        description: "Contact Samuel Wu, multidisciplinary developer based in Boulder, Colorado. Currently open to select projects.",
        url: "https://samuelwu.me/contact",
        siteName: "Samuel Wu",
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact — Let's Talk",
        "description": "Contact Samuel Wu, multidisciplinary developer based in Boulder, Colorado",
        "url": "https://samuelwu.me/contact",
        "mainEntity": {
            "@type": "Person",
            "name": "Samuel Wu",
            "jobTitle": "Multidisciplinary Developer",
            "email": SITE_CONFIG.email,
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            <ContactContent />
        </>
    );
}
