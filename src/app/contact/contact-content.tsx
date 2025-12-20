"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactContent() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="max-w-2xl mx-auto space-y-12">
                <div className="space-y-6 text-center">
                    <KineticText>
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                            Have a real problem worth solving?
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl text-muted-foreground">
                            I'm currently open to select projects. If you value speed and clarity, let's talk.
                        </p>
                    </KineticText>
                </div>

                <form className="space-y-6 border border-white/5 p-8 bg-white/5 backdrop-blur-sm rounded-lg" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" className="bg-black/20 border-white/10" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Project Context</Label>
                        <Textarea id="message" placeholder="Briefly describe the problem you are solving..." className="min-h-[150px] bg-black/20 border-white/10" required />
                    </div>
                    <Button size="lg" className="w-full bg-foreground text-background hover:opacity-90">
                        Send Message
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Or email me directly at</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-lg font-medium text-foreground hover:underline underline-offset-4">
                        {SITE_CONFIG.email}
                    </a>
                </div>
            </div>
        </div>
    );
}

