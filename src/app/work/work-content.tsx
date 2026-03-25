"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { SITE_CONFIG } from "@/lib/constants";


export function WorkContent() {
    return (
        <div className="container min-h-screen py-12 md:py-24 relative">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 bg-grid-white" />
            
            <div className="flex flex-col gap-24 relative z-10">
                <div className="max-w-4xl space-y-8">
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-xs tracking-widest uppercase">
                        <span className="w-4 h-px bg-blue-400/50" />
                        Project Archive
                    </div>
                    <KineticText>
                        <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-foreground leading-[0.9]">
                            Proof over <br /> <span className="text-blue-400">promises.</span>
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                            A showcase of engineering excellence, specializing in AI-native platforms and complex community management systems.
                        </p>
                    </KineticText>
                </div>

                <div className="grid grid-cols-1 gap-16">
                    {SITE_CONFIG.projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            {...project}
                            tags={project.tech}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



