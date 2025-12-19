"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProject {
    title: string;
    description: string;
    tags: string[];
    href: string;
}

interface FeaturedProjectsSliderProps {
    projects: FeaturedProject[];
}

export function FeaturedProjectsSlider({ projects }: FeaturedProjectsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const slideTransition = {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [projects.length]);

    const currentProject = projects[currentIndex];

    return (
        <div className="relative w-full">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-black/30 via-black/20 to-black/30">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                        className="absolute inset-0"
                    >
                        <Link href={currentProject.href} className="block h-full">
                            <div className="relative p-12 md:p-16 min-h-[400px] md:min-h-[500px] flex flex-col justify-between group">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground border border-white/10 px-3 py-1 rounded-full bg-black/40">
                                            Featured
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground group-hover:text-white transition-colors">
                                        {currentProject.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                        {currentProject.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {currentProject.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs uppercase tracking-wider text-muted-foreground border border-white/10 px-2 py-1 rounded-full bg-black/40"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center justify-between mt-8">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                        View case study
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {projects.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDirection(index > currentIndex ? 1 : -1);
                                                    setCurrentIndex(index);
                                                }}
                                                className={cn(
                                                    "w-2 h-2 rounded-full transition-all duration-300",
                                                    index === currentIndex
                                                        ? "bg-foreground w-8"
                                                        : "bg-white/20 hover:bg-white/40"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                    aria-label="Previous project"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                    aria-label="Next project"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

