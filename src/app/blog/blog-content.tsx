"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { motion } from "framer-motion";
import Link from "next/link";

const BLOG_POSTS = [
    {
        id: "DEVLOG_ENTRY_042",
        date: "MARCH 2026",
        title: "The Great Bug Slaughter.",
        excerpt: "Refined the RLS policies in Supabase to handle complex multi-tenant logic for Quormet. AI assessment types for Serify are now 40% more accurate with specialized prompt orchestration.",
        category: "devlog",
    },
    {
        id: "TECH_INSIGHT_012",
        date: "FEBRUARY 2026",
        title: "Scaling Community OS Architecture.",
        excerpt: "Deep dive into the Quormet backend architecture. Using Drizzle ORM with PostgreSQL for type-safe migrations and highly performant query execution.",
        category: "tech",
    },
    {
        id: "DEVLOG_ENTRY_041",
        date: "JANUARY 2026",
        title: "AI Prompt Orchestration for Diagnostics.",
        excerpt: "How we use Gemini AI to generate diagnostic questions that follow the Feynman method. Moving beyond simple recall to true conceptual understanding.",
        category: "devlog",
    }
];

export function BlogContent() {
    return (
        <div className="container min-h-screen py-12 md:py-24 relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-5 bg-grid-white" />
            
            <div className="flex flex-col gap-20 relative z-10">
                <div className="max-w-3xl space-y-6">
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-xs tracking-widest uppercase">
                        <span className="w-4 h-px bg-blue-400/50" />
                        Insights & Updates
                    </div>
                    <KineticText>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-foreground">
                            Build in <span className="text-blue-400">public.</span>
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl text-muted-foreground leading-relaxed font-light">
                            Short-form technical insights, devlogs, and engineering updates from my ongoing projects.
                        </p>
                    </KineticText>
                </div>

                <div className="grid grid-cols-1 gap-12 max-w-4xl">
                    {BLOG_POSTS.map((post, i) => (
                        <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 tech-border hover:border-blue-400/30 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div className="font-mono text-[10px] text-blue-400 tracking-tighter">
                                    /{post.id}
                                </div>
                                <div className="text-[10px] font-mono text-muted-foreground">
                                    {post.date}
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-medium mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
                                {post.excerpt}
                            </p>
                            <Link 
                                href={`/blog/${post.id.toLowerCase()}`} 
                                className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors"
                            >
                                READ_FULL_ARTICLE{"->"}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
