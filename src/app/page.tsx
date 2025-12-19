"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Zap, Layers, Code, Music } from "lucide-react";
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

export default function Home() {
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
                I build stuff that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    makes money
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10"></span>
                </span>
                .
              </h1>
            </KineticText>
            <KineticText delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Operator-focused, no fluff. I ship fast and focus on what actually matters.
              </p>
            </KineticText>
            <KineticText delay={0.4}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-lg bg-gradient-to-r from-white to-gray-100 text-black hover:from-white hover:to-white hover:shadow-lg hover:shadow-white/20 font-medium px-8 text-base h-12 transition-all duration-300">
                  <Link href="/projects">
                    View Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg border-white/20 hover:bg-white/10 hover:border-white/30 font-medium px-8 text-base h-12 backdrop-blur-sm transition-all duration-300">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-12">
            <div className="group relative space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 hover:from-white/10 hover:to-white/5 transition-all duration-300 backdrop-blur-sm">
              <div className="relative">
                <Terminal className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-foreground">Full-Stack Systems</h3>
              <p className="text-muted-foreground">
                SaaS built with Next.js and Supabase. Type-safe, scalable, and actually works in production.
              </p>
            </div>
            <div className="group relative space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 hover:from-white/10 hover:to-white/5 transition-all duration-300 backdrop-blur-sm">
              <div className="relative">
                <Zap className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-foreground">AI Automation</h3>
              <p className="text-muted-foreground">
                Using OpenAI and n8n to kill repetitive tasks. Less busywork, more leverage.
              </p>
            </div>
            <div className="group relative space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 hover:from-white/10 hover:to-white/5 transition-all duration-300 backdrop-blur-sm">
              <div className="relative">
                <Layers className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-medium text-foreground">Ship Fast</h3>
              <p className="text-muted-foreground">
                MVPs in days, not months. Focus on what matters, iterate quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Selected Work
            </h2>
            <Link href="/projects" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="space-y-6">
            {SELECTED_PROJECTS.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </section>

        {/* Other Interests */}
        <section className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              Other Interests
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Beyond business, I also work on personal projects and pursue other interests.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/projects"
              className="group relative p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 hover:from-white/10 hover:to-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Code className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-medium text-foreground">Projects</h3>
                </div>
                <p className="text-muted-foreground">
                  Games, apps, and experiments. Personal projects I build for fun and learning.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Explore projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            <Link 
              href="/piano"
              className="group relative p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 hover:from-white/10 hover:to-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Music className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-medium text-foreground">Piano</h3>
                </div>
                <p className="text-muted-foreground">
                  Classical piano performances and recordings. Years of training and practice.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  View showcase <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
