"use client";

import { KineticText } from "@/components/ui/kinetic-text";

export function AboutContent() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Column: Narrative */}
                <article className="space-y-12">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground">
                            Samuel Wu — Multidisciplinary Developer
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">Based in Boulder, Colorado</p>
                    </KineticText>

                    <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                        <KineticText delay={0.1}>
                            <p>
                                I don't just write code. I build systems that solve expensive business problems. My background isn't typical—I come from operations, where efficiency is the only metric that matters. As a <strong className="text-foreground">multidisciplinary developer</strong> based in <strong className="text-foreground">Boulder, Colorado</strong>, I bring a unique operational perspective to software development.
                            </p>
                        </KineticText>
                        <KineticText delay={0.2}>
                            <p>
                                I founded and scaled micro-SaaS products by automating the boring parts. I learned to code because I needed tools that didn't exist, and I needed them fast. This operator-first mindset shapes how I approach every project—focusing on outcomes, not just aesthetics.
                            </p>
                        </KineticText>
                        <KineticText delay={0.3}>
                            <p>
                                Today, as a <strong className="text-foreground">multidisciplinary developer</strong>, I combine full-stack engineering with AI automation to ship products that reduce admin load, optimize workflows, and generate revenue. Whether you're in <strong className="text-foreground">Boulder</strong> or anywhere else, I deliver solutions that work.
                            </p>
                        </KineticText>
                    </div>
                </article>

                {/* Right Column: Skills & Context */}
                <aside className="space-y-12 lg:pt-24">

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
                        <h3 className="text-xl font-medium text-foreground border-b border-white/10 pb-4">Discipline</h3>
                        <p className="text-muted-foreground">
                            Classical piano training taught me that mastery comes from systems and repetition. I apply the same disciplined approach to code structure and product architecture.
                        </p>
                    </div>

                </aside>
            </div>
        </div>
    );
}

