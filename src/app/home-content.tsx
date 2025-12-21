"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Zap, Layers, Sparkles as SparklesIcon } from "lucide-react";
import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { ParallaxFloatingShapes } from "@/components/ui/parallax-floating-shapes";
import { motion } from "framer-motion";

const SELECTED_PROJECTS = [
  {
    title: "HOA Reply AI",
    description: "AI system that automates HOA inboxes and reduces admin load by 85%.",
    tags: ["Automation", "Productivity"],
    href: "/work/hoa-reply",
  },
  {
    title: "Certirise",
    description: "Compliance SaaS for recurring license renewals with automated tracking.",
    tags: ["Productivity", "Compliance"],
    href: "/work/certirise",
  },
];

// Animated gradient background component - Sapphire Veil palette
function AnimatedGradient() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-cyan-950/5" />
      
      {/* Top right corner - away from text */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-l from-blue-500/15 via-cyan-400/10 to-transparent blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom left corner - away from text */}
      <motion.div
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600/12 via-sky-400/8 to-transparent blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom right - subtle */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-cyan-600/10 via-blue-500/8 to-transparent blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Galaxy stars component - Sapphire Veil
function GalaxyStars() {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    twinkleDelay: Math.random() * 5,
    twinkleDuration: 2 + Math.random() * 3,
  }));

  const largeStars = Array.from({ length: 20 }, (_, i) => ({
    id: `large-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    twinkleDelay: Math.random() * 4,
    twinkleDuration: 3 + Math.random() * 4,
  }));
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Regular stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(147, 197, 253, 0.6), 0 0 ${star.size * 4}px rgba(96, 165, 250, 0.3)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            delay: star.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Large bright stars */}
      {largeStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `
              0 0 ${star.size * 2}px rgba(147, 197, 253, 0.8),
              0 0 ${star.size * 4}px rgba(96, 165, 250, 0.5),
              0 0 ${star.size * 6}px rgba(59, 130, 246, 0.3)
            `,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            delay: star.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Shooting stars - extremely fast with long faint trails */}
      {Array.from({ length: 12 }).map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 50;
        const angle = 20 + Math.random() * 25; // Diagonal angle
        const distance = 3000 + Math.random() * 2000; // Very long trail
        
        return (
          <motion.div
            key={`shooting-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              rotate: `${angle}deg`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: [0, distance],
              y: [0, distance * 0.35],
              opacity: [0, 0.9, 0.7, 0.3, 0],
            }}
            transition={{
              duration: 0.4 + Math.random() * 0.2, // Extremely fast
              repeat: Infinity,
              delay: i * 1.5 + Math.random() * 2,
              repeatDelay: 2 + Math.random() * 3, // Very frequent
              ease: "easeOut",
            }}
          >
            {/* Bright star head with blue glow */}
            <div className="absolute w-2.5 h-2.5 bg-white rounded-full blur-[2px]" 
                 style={{ 
                   boxShadow: '0 0 10px rgba(147, 197, 253, 1), 0 0 16px rgba(96, 165, 250, 0.8), 0 0 24px rgba(59, 130, 246, 0.5)' 
                 }} />
            {/* Long faint trail that spans most of screen */}
            <div 
              className="absolute bg-gradient-to-r from-cyan-300 via-blue-300/70 to-transparent"
              style={{
                width: '2px',
                height: '600px',
                top: '3px',
                left: '50%',
                transform: 'translateX(-50%)',
                filter: 'blur(1.5px)',
                opacity: 0.6,
              }}
            />
          </motion.div>
        );
      })}
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
      
      {/* Galaxy stars */}
      <GalaxyStars />

      {/* Background Layer: Galaxy Floating Shapes with scroll physics */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <ParallaxFloatingShapes />
        </div>
      </div>

      {/* Interactive cursor glow effect - Sapphire */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-400/10 to-sky-400/15 blur-3xl pointer-events-none z-[1]"
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
          {/* Decorative elements - positioned away from text */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/8 to-cyan-400/5 blur-3xl -mr-32 -mt-32"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="max-w-4xl space-y-8 relative z-10">
            <KineticText>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] relative pr-24 md:pr-32">
                <span className="text-foreground">
                  Hey, I'm Samuel.
                </span>
                <motion.div
                  className="absolute top-0 right-2 md:right-6 text-6xl md:text-8xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <SparklesIcon className="w-12 h-12 md:w-16 md:h-16 text-blue-400/50" />
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
                    className="rounded-lg bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-500 text-white hover:from-blue-600 hover:via-cyan-500 hover:to-sky-600 font-medium px-8 text-base h-12 shadow-lg shadow-blue-500/30 border-0"
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
            {/* Background glow effect - Sapphire */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-cyan-400/3 to-sky-500/3 rounded-3xl blur-3xl" />
            
            {[
              {
                icon: Terminal,
                title: "Full-Stack Developer",
                description: "I build web apps with Next.js, TypeScript, and modern tools. Everything's type-safe, scalable, and ready to go when you need it.",
                gradient: "from-blue-500/15 to-blue-900/10",
              },
              {
                icon: Zap,
                title: "AI & Automation",
                description: "Love building AI-powered tools that actually save time. I work with OpenAI, n8n, and other cool APIs to automate the boring stuff.",
                gradient: "from-cyan-500/15 to-cyan-900/10",
              },
              {
                icon: Layers,
                title: "Fast & Focused",
                description: "I move quickly and keep things simple. Most projects go from idea to working prototype in a matter of days, not months.",
                gradient: "from-sky-500/15 to-blue-800/10",
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
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <item.icon className="w-10 h-10 text-foreground group-hover:text-blue-400 transition-colors" />
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
              className="text-3xl md:text-4xl font-medium tracking-tight text-foreground"
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


