"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MouseEvent, useRef } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    href: string;
    index: number;
}

export function ProjectCard({ title, description, tags, href, index }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Physics-based tilt values - Reduced stiffness for smoother feel
    const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

    function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Spotlight position
        x.set(clientX - left);
        y.set(clientY - top);

        // Tilt calculations
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

    // Create transforms for 3D effect
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
            <motion.div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    transformStyle: "preserve-3d",
                }}
                className="relative border border-white/10 bg-black/20 overflow-hidden py-12 px-8 rounded-xl transition-colors duration-300 hover:border-white/20"
            >
                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`radial-gradient(650px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
                    }}
                />

                <Link href={href} className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground group-hover:text-white transition-colors">
                            {title}
                        </h3>
                        <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {tags.map((tag) => (
                                <span key={tag} className="text-xs uppercase tracking-wider text-muted-foreground border border-white/10 px-2 py-1 rounded-full bg-black/40">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:pt-2">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
}
