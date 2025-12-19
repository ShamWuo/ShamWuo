"use client";

import { KineticText } from "@/components/ui/kinetic-text";

export default function AboutPage() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Column: Narrative */}
                <div className="space-y-12">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Operator first. Developer second.
                        </h1>
                    </KineticText>

                    <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                        <KineticText delay={0.1}>
                            <p>
                                I build stuff that solves real problems. Started in ops, where efficiency is everything. Learned to code because I needed tools that didn't exist yet.
                            </p>
                        </KineticText>
                        <KineticText delay={0.2}>
                            <p>
                                Built and scaled micro-SaaS products by automating the boring stuff. Turns out that's a pretty good business model.
                            </p>
                        </KineticText>
                        <KineticText delay={0.3}>
                            <p>
                                Now I combine full-stack engineering with AI automation to build things that actually make a difference—less admin work, better workflows, more revenue.
                            </p>
                        </KineticText>
                    </div>
                </div>

                {/* Right Column: Skills & Context */}
                <div className="space-y-12 lg:pt-24">

                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-foreground border-b border-white/10 pb-4">The Stack</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-sm text-foreground font-medium block">Core Engineering</span>
                                <p className="text-sm text-muted-foreground">Next.js App Router, TypeScript, Prisma, Supabase, Tailwind, shadcn/ui</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm text-foreground font-medium block">AI & Automation</span>
                                <p className="text-sm text-muted-foreground">OpenAI APIs, agent workflows, n8n, Pipedream, Inngest</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm text-foreground font-medium block">Systems</span>
                                <p className="text-sm text-muted-foreground">Auth, Subscriptions, Billing, Webhooks, Background jobs</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-foreground border-b border-white/10 pb-4">Background</h3>
                        <p className="text-muted-foreground">
                            Classical piano training taught me that mastery comes from systems and repetition. Same approach applies to building software—structure and consistency matter.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
