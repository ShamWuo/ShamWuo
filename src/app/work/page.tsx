import type { Metadata } from "next";
import { WorkContent } from "./work-content";

export const metadata: Metadata = {
    title: "Work — Selected Projects",
    description: "Selected case studies by Samuel Wu, multidisciplinary developer based in Boulder, Colorado. End-to-end execution from problem identification to revenue-generating solutions.",
    keywords: [
        "Samuel Wu portfolio",
        "Samuel Wu projects",
        "case studies",
        "multidisciplinary developer work",
        "Boulder Colorado developer",
        "software projects",
        "SaaS projects",
        "AI automation projects",
    ],
    openGraph: {
        title: "Work — Selected Projects | Samuel Wu",
        description: "Selected case studies demonstrating end-to-end execution from problem identification to revenue-generating solutions.",
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
        "name": "Work — Selected Projects",
        "description": "Selected case studies by Samuel Wu",
        "url": "https://samuelwu.me/work",
        "about": {
            "@type": "Person",
            "name": "Samuel Wu",
            "jobTitle": "Multidisciplinary Developer",
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
