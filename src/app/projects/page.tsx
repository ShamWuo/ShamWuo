"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { FeaturedProjectsSlider } from "@/components/ui/featured-projects-slider";
import { SITE_CONFIG } from "@/lib/constants";
import { Gamepad2, Smartphone, Globe, Code } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { id: "all", label: "All", icon: Code },
    { id: "game", label: "Games", icon: Gamepad2 },
    { id: "app", label: "Apps", icon: Smartphone },
    { id: "web", label: "Web", icon: Globe },
];

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const featuredProjects = SITE_CONFIG.projects.filter(p => p.featured);
    const filteredProjects = selectedCategory === "all" 
        ? SITE_CONFIG.personalProjects 
        : SITE_CONFIG.personalProjects.filter(p => p.category === selectedCategory);

    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="flex flex-col gap-24">
                {/* Header */}
                <div className="max-w-3xl space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Projects
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Featured business projects and personal experiments. From revenue-generating SaaS to games and apps.
                        </p>
                    </KineticText>
                </div>

                {/* Featured Projects Slider */}
                {featuredProjects.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>
                        <FeaturedProjectsSlider projects={featuredProjects} />
                    </section>
                )}

                {/* Personal Projects Section */}
                <section className="space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Personal Projects
                        </h2>
                        <p className="text-muted-foreground">
                            Games, apps, and experiments. Things I build for fun, learning, or just because.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((category) => {
                            const Icon = category.icon;
                            const isActive = selectedCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300",
                                        isActive
                                            ? "border-white/20 bg-white/10 text-foreground"
                                            : "border-white/5 bg-white/5 text-muted-foreground hover:border-white/10 hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{category.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Projects Grid */}
                    <div className="flex flex-col gap-6">
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
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No projects in this category yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

