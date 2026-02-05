import type { Metadata } from "next";
import { ProjectsContent } from "../projects-content";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category } = await params;
    const categoryLabels: Record<string, string> = {
        apps: "Apps",
        websites: "Websites",
        tools: "Tools",
    };

    const label = categoryLabels[category] || "Projects";

    return {
        title: `${label} Projects`,
        description: `Explore ${label.toLowerCase()} projects by Samuel Wu, multidisciplinary developer based in Boulder, Colorado.`,
        openGraph: {
            title: `${label} Projects | Samuel Wu`,
            description: `Explore ${label.toLowerCase()} projects by Samuel Wu.`,
            url: `https://samuelwu.me/projects/${category}`,
        },
        alternates: {
            canonical: `/projects/${category}`,
        },
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    return <ProjectsContent />;
}

