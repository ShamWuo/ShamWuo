"use client";

import { useState, useMemo } from "react";
import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function ProjectsContent() {
    // Get all unique tags from projects
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        SITE_CONFIG.projects.forEach((project) => {
            project.tags.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, []);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Filter projects based on selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return SITE_CONFIG.projects;
        }
        return SITE_CONFIG.projects.filter((project) =>
            selectedTags.some((tag) => project.tags.includes(tag))
        );
    }, [selectedTags]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSelectedTags([]);
    };

    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="flex flex-col gap-16">
                <div className="max-w-3xl space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
                            All Projects
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Everything I've built. Filter by technology or type to find what you're looking for.
                        </p>
                    </KineticText>
                </div>

                {/* Filters */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h2 className="text-lg font-medium text-foreground">Filter by tag</h2>
                        {selectedTags.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-medium transition-all
                                        ${
                                            isSelected
                                                ? "bg-white text-black hover:bg-white/90"
                                                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/10"
                                        }
                                    `}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                    {selectedTags.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} matching {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""}
                        </p>
                    )}
                </div>

                {/* Projects Grid */}
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
                        <div className="text-center py-16">
                            <p className="text-lg text-muted-foreground">
                                No projects match the selected filters.
                            </p>
                            <Button
                                variant="ghost"
                                onClick={clearFilters}
                                className="mt-4"
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

