import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  Zap, 
  Layers, 
  Sparkles as SparklesIcon, 
  Music, 
  Gamepad, 
  BookOpen, 
  Code2, 
  FileText,
  User,
  ExternalLink,
  Github,
  Play
} from "lucide-react";
import { KineticText } from "@/components/ui/kinetic-text";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { Resume } from "@/components/sections/Resume";

export function HomeContent() {
  const [isProfessionalMode, setIsProfessionalMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'lax' | 'formal'>('lax');

  // Toggle function
  const toggleMode = () => {
    setIsProfessionalMode(!isProfessionalMode);
    setActiveTab(isProfessionalMode ? 'lax' : 'formal');
  };

  const featuredProjects = SITE_CONFIG.projects.filter(p => p.featured);

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-blue-500/30">
      {/* Background Grids & Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-grid-white" />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      {/* Mode Toggle Header */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2 shadow-2xl">
        <button 
          onClick={() => { setIsProfessionalMode(false); setActiveTab('lax'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${!isProfessionalMode ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
        >
          Casual
        </button>
        <button 
          onClick={() => { setIsProfessionalMode(true); setActiveTab('formal'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isProfessionalMode ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
        >
          Professional
        </button>
      </div>

      <main className="relative z-10 container mx-auto px-6 py-32 min-h-screen flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isProfessionalMode ? (
            <motion.div 
              key="casual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full max-w-6xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
                
                {/* Hero Card */}
                <div className="md:col-span-8 md:row-span-2 p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                    <SparklesIcon className="w-12 h-12 text-blue-400" />
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      Status: Building something cool
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1]">
                      Hi, I'm <span className="text-white">Samuel</span>. <br />
                      I build <span className="text-blue-400 italic">cool stuff</span> with AI and music.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                      {SITE_CONFIG.personal.shortBio}
                    </p>
                  </div>
                </div>

                {/* Tech Skills Card */}
                <div className="md:col-span-4 md:row-span-1 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col justify-between group hover:bg-white/[0.05] transition-colors">
                  <div className="flex justify-between items-start">
                    <Code2 className="w-8 h-8 text-blue-400/60" />
                    <span className="text-[10px] font-mono text-blue-400/40 uppercase">Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {["Next.js", "TS", "Supabase", "LLMs"].map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Latest Project Peek */}
                <Link href="/work" className="md:col-span-4 md:row-span-1 p-8 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 flex flex-col justify-between group hover:border-blue-400/40 transition-all">
                  <div className="flex justify-between items-start">
                    <Layers className="w-8 h-8 text-blue-400" />
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Serify</h3>
                    <p className="text-sm text-slate-400">AI that actually teaches. Feynman-style diagnostics.</p>
                  </div>
                </Link>

                {/* Interests Section */}
                <div className="md:col-span-12 mt-12 mb-6">
                    <h2 className="text-2xl font-medium px-4 text-slate-400">Beyond the screen...</h2>
                </div>

                <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4 hover:translate-y-[-4px] transition-transform">
                  <Music className="w-8 h-8 text-rose-400/60" />
                  <h3 className="text-xl font-medium">Piano</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Practicing Chopin's nocturnes and exploring the architecture of sound.
                  </p>
                </div>

                <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4 hover:translate-y-[-4px] transition-transform">
                  <Zap className="w-8 h-8 text-amber-400/60" />
                  <h3 className="text-xl font-medium">Movement</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Studying Gong Fu and the physics of internal power.
                  </p>
                </div>

                <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4 hover:translate-y-[-4px] transition-transform">
                  <Gamepad className="w-8 h-8 text-emerald-400/60" />
                  <h3 className="text-xl font-medium">Side Quests</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Digital gardening, game mechanics, and messy experiments.
                  </p>
                </div>

                {/* Footer Link */}
                <div className="md:col-span-12 flex justify-center pt-20">
                  <button 
                    onClick={() => setIsProfessionalMode(true)}
                    className="group flex flex-col items-center gap-4 text-slate-500 hover:text-white transition-colors"
                  >
                    <span className="text-sm font-mono tracking-widest uppercase">Switch to formal mode</span>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                    </div>
                  </button>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="formal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full"
            >
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center mb-12">
                   <h2 className="text-sm font-mono tracking-widest text-slate-500 uppercase">/The Vault (CV_2026)</h2>
                   <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild className="rounded-full border-white/10 text-xs">
                           <a href={SITE_CONFIG.socials.github} target="_blank"><Github className="w-3.5 h-3.5 mr-2" /> GitHub</a>
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full border-white/10 text-xs" onClick={() => setIsProfessionalMode(false)}>
                           Back to Casual
                        </Button>
                   </div>
                </div>
                <Resume />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}




