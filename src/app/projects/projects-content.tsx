"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { SITE_CONFIG } from "@/lib/constants";
import { ProjectsSidebar } from "@/components/projects/projects-sidebar";
import { CategoryTabs } from "@/components/projects/category-tabs";

export function ProjectsContent() {
    const pathname = usePathname();
    // Extract category from pathname (e.g., "/projects/apps" -> "apps", "/projects" -> "all")
    const pathParts = pathname.split("/").filter(Boolean);
    const categoryFromPath = pathParts[1] || "all";
    const currentCategory = categoryFromPath === "projects" ? "all" : categoryFromPath;

    // Get all unique tags from projects
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        SITE_CONFIG.projects.forEach((project) => {
            project.tags?.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, []);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter projects based on category, tags, and search
    const filteredProjects = useMemo(() => {
        let filtered = SITE_CONFIG.projects;

        // Filter by category
        if (currentCategory !== "all") {
            filtered = filtered.filter(
                (project) => (project as any).category === currentCategory
            );
        }

        // Filter by tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter((project) =>
                selectedTags.some((tag) => project.tags?.includes(tag))
            );
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (project) =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.tags?.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [currentCategory, selectedTags, searchQuery]);

    const clearFilters = () => {
        setSelectedTags([]);
        setSearchQuery("");
    };

    const categoryLabel = SITE_CONFIG.projectCategories.find((cat) => cat.id === currentCategory)?.label || "All Projects";

    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="flex flex-col gap-12">
                {/* Header */}
                <div className="max-w-3xl space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
                            Projects
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Everything I've built. Filter by category, technology, or search for specific projects.
                        </p>
                    </KineticText>
                </div>

                {/* Category Tabs */}
                <CategoryTabs />

                {/* Main Content with Sidebar */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <ProjectsSidebar
                        allTags={allTags}
                        selectedTags={selectedTags}
                        onTagsChange={setSelectedTags}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />

                    {/* Projects Grid */}
                    <div className="flex-1 space-y-6">
                        {/* Results info */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} 
                                {currentCategory !== "all" && ` in ${categoryLabel}`}
                            </div>
                            {(selectedTags.length > 0 || searchQuery) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {/* Projects List */}
                        <div className="flex flex-col gap-8">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.title}
                                        {...project}
                                        index={index}
                                        href={project.href}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 border border-white/10 rounded-xl bg-black/20">
                                    <p className="text-lg text-muted-foreground mb-4">
                                        No projects found matching your criteria.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-foreground hover:text-muted-foreground transition-colors underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
