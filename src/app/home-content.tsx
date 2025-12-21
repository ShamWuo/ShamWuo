"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Zap, Layers, Sparkles as SparklesIcon } from "lucide-react";
import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { ParallaxFloatingShapes } from "@/components/ui/parallax-floating-shapes";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

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

// Animated gradient background component
function AnimatedGradient() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-blue-950/20 to-cyan-950/20" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-transparent blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-transparent blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-500/25 to-transparent blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function HomeContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient backgrounds */}
      <AnimatedGradient />
      
      {/* Floating particles */}
      <FloatingParticles />

      {/* Background Layer: Fixed Shapes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <ParallaxFloatingShapes />
        </div>
      </div>

      {/* Interactive cursor glow effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-3xl pointer-events-none z-[1]"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-24 pb-24">
        {/* Hero Section */}
        <section className="container pt-12 md:pt-24 lg:pt-32 relative">
          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="max-w-4xl space-y-8 relative">
            <KineticText>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] relative">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient">
                  Hey, I'm Samuel.
                </span>
                <motion.div
                  className="absolute -top-4 -right-4 text-6xl md:text-8xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <SparklesIcon className="w-12 h-12 md:w-16 md:h-16 text-purple-400/50" />
                </motion.div>
              </h1>
            </KineticText>
            <KineticText delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                I'm a <span className="text-foreground font-medium">multidisciplinary developer</span> based in Boulder, Colorado. I build cool stuff with code—from full-stack web apps to AI automation tools. If you've got a problem that needs solving, I'm your guy.
              </p>
            </KineticText>
            <KineticText delay={0.4}>
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 font-medium px-8 text-base h-12 shadow-lg shadow-purple-500/50 border-0"
                  >
                    <Link href="/projects">
                      Check out my work
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="rounded-lg border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 font-medium px-8 text-base h-12"
                  >
                    <Link href="/contact">
                      Say hello
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </KineticText>
          </div>
        </section>

        {/* Value Props */}
        <section className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5 rounded-3xl blur-3xl" />
            
            {[
              {
                icon: Terminal,
                title: "Full-Stack Developer",
                description: "I build web apps with Next.js, TypeScript, and modern tools. Everything's type-safe, scalable, and ready to go when you need it.",
                gradient: "from-purple-500/20 to-purple-900/20",
              },
              {
                icon: Zap,
                title: "AI & Automation",
                description: "Love building AI-powered tools that actually save time. I work with OpenAI, n8n, and other cool APIs to automate the boring stuff.",
                gradient: "from-pink-500/20 to-pink-900/20",
              },
              {
                icon: Layers,
                title: "Fast & Focused",
                description: "I move quickly and keep things simple. Most projects go from idea to working prototype in a matter of days, not months.",
                gradient: "from-cyan-500/20 to-cyan-900/20",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="space-y-4 p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm hover:border-white/20 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all duration-300 relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-300`} />
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <item.icon className="w-10 h-10 text-foreground group-hover:text-purple-400 transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-foreground mt-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section className="container relative">
          <div className="flex items-center justify-between mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-medium tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            >
              Some Things I've Built
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/projects" 
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                See more 
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          <div className="space-y-8">
            {SELECTED_PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <ProjectCard {...project} index={index} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


