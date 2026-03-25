import type { Metadata } from "next";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
    title: "Blog — Technical Insights",
    description: "Short-form technical insights, devlogs, and build-in-public updates by Samuel Wu.",
};

export default function BlogPage() {
    return <BlogContent />;
}
