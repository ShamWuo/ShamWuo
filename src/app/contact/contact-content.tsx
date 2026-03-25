"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function ContactContent() {
    return (
        <div className="container min-h-screen py-24 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 bg-grid-white" />
            
            <div className="max-w-3xl mx-auto space-y-16 relative z-10">
                <div className="space-y-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">
                        <span className="w-4 h-px bg-blue-400/50" />
                        Communications
                        <span className="w-4 h-px bg-blue-400/50" />
                    </div>
                    <KineticText>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-foreground leading-tight">
                            Solving <br /> <span className="text-blue-400">complex</span> problems.
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
                            I'm currently open to select high-impact projects. If you value execution speed and architectural clarity, let's talk.
                        </p>
                    </KineticText>
                </div>

                <div className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative group tech-border overflow-hidden">
                    <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400/60">YOUR_NAME</Label>
                                <Input id="name" placeholder="John Doe" className="bg-black/40 border-white/5 focus:border-blue-400/50 transition-colors h-14 rounded-xl px-4" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400/60">EMAIL_ADDRESS</Label>
                                <Input id="email" type="email" placeholder="you@company.com" className="bg-black/40 border-white/5 focus:border-blue-400/50 transition-colors h-14 rounded-xl px-4" required />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="message" className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400/60">PROJECT_CONTEXT</Label>
                            <Textarea id="message" placeholder="Briefly describe the challenge you're architecting..." className="min-h-[180px] bg-black/40 border-white/5 focus:border-blue-400/50 transition-colors rounded-xl p-4 resize-none" required />
                        </div>
                        <Button size="lg" className="w-full bg-white text-black hover:bg-white/90 h-16 rounded-xl font-medium text-lg shadow-2xl shadow-white/5 group-hover:translate-y-[-2px] transition-transform">
                            INITIATE_MESSAGE
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </form>
                </div>

                <div className="text-center space-y-4 pt-10 border-t border-white/5">
                    <div className="text-[10px] font-mono text-blue-400/40 uppercase tracking-[0.3em]">/DIRECT_CONTACT</div>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-2xl font-light text-foreground hover:text-blue-400 transition-colors tracking-tight">
                        {SITE_CONFIG.email}
                    </a>
                </div>
            </div>
        </div>
    );
}
