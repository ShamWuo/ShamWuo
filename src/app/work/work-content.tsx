"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { SITE_CONFIG } from "@/lib/constants";

export function WorkContent() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="flex flex-col gap-16">
                <div className="max-w-3xl space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
                            Proof over promises.
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Selected case studies demonstrating end-to-end execution. From problem identification to revenue-generating solution.
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


