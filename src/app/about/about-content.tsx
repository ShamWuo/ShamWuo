"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { SITE_CONFIG } from "@/lib/constants";
import { motion } from "framer-motion";


export function AboutContent() {
    return (
        <div className="container min-h-screen py-24 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 bg-grid-white" />
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-dot-white mask-radial" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 relative z-10">
                {/* Left Column: Narrative */}
                <article className="space-y-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs tracking-widest uppercase">
                            <span className="w-4 h-px bg-blue-400/50" />
                            Personal Dossier
                        </div>
                        <KineticText>
                            <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-foreground leading-[0.9]">
                                Samuel <br /> <span className="text-blue-400">Wu.</span>
                            </h1>
                        </KineticText>
                        <p className="text-xl text-muted-foreground font-light tracking-wide italic border-l border-blue-400/30 pl-6">
                            Full-Stack Software Developer & Startup Founder.
                        </p>
                    </div>

                    <div className="space-y-10 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                        <KineticText delay={0.1}>
                            <p>
                                I don't just write code. I build systems that solve expensive business problems. My background is in <strong className="text-foreground font-normal">startup operations</strong>, where efficiency isn't just a goal—it's survival.
                            </p>
                        </KineticText>
                        <KineticText delay={0.2}>
                            <p>
                                I learned to code because I needed tools that didn't exist. This <strong className="text-foreground font-normal">operator-first mindset</strong> shapes every architectural decision I make—focusing on scalability, performance, and user-centric logic over pure aesthetics.
                            </p>
                        </KineticText>
                        <KineticText delay={0.3}>
                            <p>
                                Today, I specialize in <strong className="text-foreground font-normal">AI-native application development</strong>. Whether it's orchestrating complex LLM workflows for diagnostics or building SaaS infrastructure, I aim for high-performance execution.
                            </p>
                        </KineticText>
                    </div>

                    <div className="space-y-6 pt-10">
                        <div className="text-[10px] font-mono text-blue-400/40 uppercase tracking-[0.3em] mb-4">/CORE_PRINCIPLES</div>
                        <blockquote className="text-2xl md:text-3xl font-medium text-foreground tracking-tight leading-snug">
                            "Modern software is an extension of intent. Code should be clean, fast, and remarkably effective."
                        </blockquote>
                    </div>
                </article>

                {/* Right Column: Skills & Context */}
                <aside className="space-y-20 lg:pt-32">
                    <div className="space-y-10">
                        <div className="flex items-center gap-2 text-blue-400/60 font-mono text-[10px] tracking-widest uppercase">
                            <span className="w-4 h-px bg-blue-400/30" />
                            Technical Specializations
                        </div>
                        
                        <div className="space-y-12">
                            <div className="group space-y-4">
                                <div className="text-sm font-mono text-blue-400">01. AI ORCHESTRATION</div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Specializing in tool-use, function calling, and structured output orchestration using Gemini, OpenAI, and custom fine-tuned agents.
                                </p>
                            </div>
                            
                            <div className="group space-y-4 border-t border-white/5 pt-12">
                                <div className="text-sm font-mono text-blue-400">02. FULL-STACK SCALE</div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Architecting applications using Next.js, TypeScript, and Supabase for real-time capabilities and enterprise-grade reliability.
                                </p>
                            </div>

                            <div className="group space-y-4 border-t border-white/5 pt-12">
                                <div className="text-sm font-mono text-blue-400">03. PRODUCT STRATEGY</div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Leveraging startup experience to build MVPs that are ready for revenue generation in weeks, not months.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 bg-blue-400/5 p-10 rounded-3xl border border-blue-400/10 backdrop-blur-sm tech-border">
                        <h3 className="text-xl font-medium text-foreground">Discipline and Systems.</h3>
                        <p className="text-muted-foreground leading-relaxed font-light italic">
                            "Classical piano training taught me that mastery comes from systems and repetition. I apply the same disciplined approach to code structure and product architecture."
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="w-10 h-px bg-blue-400/30" />
                            <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">SAMWUO_ARCHIVE</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}


