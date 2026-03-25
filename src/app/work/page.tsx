import type { Metadata } from "next";
import { WorkContent } from "./work-content";

export const metadata: Metadata = {
    title: "Work — Projects & Open Source",
    description: "Selected projects by Samuel Wu, Full-Stack Software Developer & Startup Founder. High-impact solutions ranging from AI diagnostic tools to community OS platforms.",
    keywords: [
        "Samuel Wu work",
        "ShamWuo github",
        "AI projects",
        "Next.js open source",
        "Full-stack development case studies",
        "Startup founder portfolio",
    ],
    openGraph: {
        title: "Work — Projects & Open Source | Samuel Wu",
        description: "High-impact solutions ranging from AI diagnostic tools to community OS platforms.",
        url: "https://samuelwu.me/work",
        siteName: "Samuel Wu",
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "/work",
    },
};

export default function WorkPage() {
    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Work — Projects & Open Source",
        "description": "Selected projects and open source contributions by Samuel Wu",
        "url": "https://samuelwu.me/work",
        "about": {
            "@type": "Person",
            "name": "Samuel Wu",
            "jobTitle": "Full-Stack Software Developer & Startup Founder",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
            />
            <WorkContent />
        </>
    );
}
