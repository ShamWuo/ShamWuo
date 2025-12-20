"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Zap, Layers } from "lucide-react";
import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { ParallaxFloatingShapes } from "@/components/ui/parallax-floating-shapes";

const SELECTED_PROJECTS = [
  {
    title: "HOA Reply AI",
    description: "AI system that automates HOA inboxes and reduces admin load by 85%.",
    tags: ["AI Agent", "Next.js", "Automation"],
    href: "/work/hoa-reply",
  },
  {
    title: "Certirise",
    description: "Compliance SaaS for recurring license renewals with automated tracking.",
    tags: ["SaaS", "Compliance", "Stripe"],
    href: "/work/certirise",
  },
];

export function HomeContent() {
  return (
    <div className="relative min-h-screen">

      {/* Background Layer 1: Fixed Crystals (Persistent) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden z-10">
          <ParallaxFloatingShapes />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-24 pb-24">
        {/* Hero Section */}
        <section className="container pt-12 md:pt-24 lg:pt-32">
          <div className="max-w-4xl space-y-8">
            <KineticText>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-foreground leading-[1.1]">
                I build and ship revenue-generating software.
              </h1>
            </KineticText>
            <KineticText delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Operator-focused implementation. No fluff. I optimize for speed, clarity, and outcomes.
              </p>
            </KineticText>
            <KineticText delay={0.4}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-none bg-white text-black hover:bg-white/90 font-medium px-8 text-base h-12">
                  <Link href="/work">
                    View Selected Work
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-none border-white/20 hover:bg-white/5 font-medium px-8 text-base h-12">
                  <Link href="/contact">
                    Let's Talk
                  </Link>
                </Button>
              </div>
            </KineticText>
          </div>
        </section>

        {/* Value Props */}
        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm">
            <div className="space-y-4">
              <Terminal className="w-8 h-8 text-foreground" />
              <h3 className="text-xl font-medium text-foreground">Full-Stack Systems</h3>
              <p className="text-muted-foreground">
                Complex SaaS architectures built with Next.js and Supabase. Scalable, type-safe, and production-ready from day one.
              </p>
            </div>
            <div className="space-y-4">
              <Zap className="w-8 h-8 text-foreground" />
              <h3 className="text-xl font-medium text-foreground">AI Automation</h3>
              <p className="text-muted-foreground">
                Intelligent workflows using OpenAI and n8n to eliminate repetitive business tasks and increase leverage.
              </p>
            </div>
            <div className="space-y-4">
              <Layers className="w-8 h-8 text-foreground" />
              <h3 className="text-xl font-medium text-foreground">Rapid Execution</h3>
              <p className="text-muted-foreground">
                Speed as a feature. I ship MVPs in days, not months, focusing on core value and rapid iteration cycles.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Selected Work</h2>
            <Link href="/work" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div>
            {SELECTED_PROJECTS.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

