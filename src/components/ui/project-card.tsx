"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MouseEvent, useRef } from "react";

// Check if href is external
const isExternalLink = (href: string) => {
    return href.startsWith("http://") || href.startsWith("https://");
};

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    href?: string;
    liveHref?: string;
    githubHref?: string;
    index: number;
}

export function ProjectCard({ title, description, tags, href, liveHref, githubHref, index }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Physics-based tilt values
    const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    }

    function onMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
        x.set(0);
        y.set(0);
    }

    const rotateX = useMotionTemplate`${mouseY.get() * -5}deg`;
    const rotateY = useMotionTemplate`${mouseX.get() * 5}deg`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY
            }}
            className="group relative perspective-1000"
        >
            <div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="relative border border-white/10 bg-black/40 overflow-hidden py-10 px-8 rounded-2xl transition-all duration-500 hover:border-white/20 tech-border"
            >
                {/* Background Grid - Subtle */}
                <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
                
                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(96, 165, 250, 0.15), transparent 40%)`,
                    }}
                />

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-medium tracking-tight text-foreground group-hover:text-blue-400 transition-colors duration-300">
                                {title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="text-[10px] uppercase font-mono tracking-widest text-blue-400/80 border border-blue-400/20 px-2 py-0.5 rounded bg-blue-400/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            {liveHref && (
                                <Link 
                                    href={liveHref} 
                                    target="_blank"
                                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/link"
                                    title="Live Demo"
                                >
                                    <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                </Link>
                            )}
                            {githubHref && (
                                <Link 
                                    href={githubHref} 
                                    target="_blank"
                                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/link"
                                    title="View Source"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                </Link>
                            )}
                        </div>
                    </div>

                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                        {description}
                    </p>
                    
                    {href && !liveHref && (
                        <Link href={href} className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mt-auto group/more">
                            Learn more
                            <ArrowUpRight className="w-4 h-4 group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5 transition-transform" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

