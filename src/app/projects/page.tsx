import type { Metadata } from "next";
import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore projects by Samuel Wu, multidisciplinary developer based in Boulder, Colorado. Filter by technology, type, and more.",
    keywords: [
        "Samuel Wu projects",
        "portfolio",
        "web development projects",
        "AI projects",
        "SaaS projects",
        "Boulder developer",
    ],
    openGraph: {
        title: "Projects | Samuel Wu",
        description: "Explore projects by Samuel Wu, multidisciplinary developer based in Boulder, Colorado.",
        url: "https://samuelwu.me/projects",
        siteName: "Samuel Wu",
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "/projects",
    },
};

export default function ProjectsPage() {
    return <ProjectsContent />;
}

