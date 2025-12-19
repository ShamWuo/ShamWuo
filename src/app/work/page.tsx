"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { SITE_CONFIG } from "@/lib/constants";

export default function WorkPage() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="flex flex-col gap-16">
                <div className="max-w-3xl space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            What I've built.
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Case studies from problem to solution. Real projects, real results.
                        </p>
                    </KineticText>
                </div>

                <div className="flex flex-col">
                    {SITE_CONFIG.projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            {...project}
                            index={index}
                            href={project.href}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
