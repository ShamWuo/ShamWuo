"use client";

import { KineticText } from "@/components/ui/kinetic-text";
import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PianoPage() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Back Button */}
                <Link href="/">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                {/* Header */}
                <div className="space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center gap-4">
                            <Music className="w-12 h-12 md:w-16 md:h-16" />
                            Piano
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl text-muted-foreground">
                            Classical piano performances and recordings. Years of training, countless hours of practice.
                        </p>
                    </KineticText>
                </div>

                {/* Content Placeholder */}
                <div className="space-y-8">
                    <div className="p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                        <h2 className="text-2xl font-medium text-foreground mb-4">About</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Classical piano has been a part of my life for many years. The discipline and structure 
                            I learned from piano training directly influences how I approach building software—systems, 
                            repetition, and attention to detail.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                        <h2 className="text-2xl font-medium text-foreground mb-4">Recordings</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            [Add your piano recordings, videos, or performances here]
                        </p>
                    </div>

                    <div className="p-8 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                        <h2 className="text-2xl font-medium text-foreground mb-4">Repertoire</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            [List your repertoire, pieces you've performed, or pieces you're working on]
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <div className="pt-8">
                    <Link href="/">
                        <Button variant="outline" className="w-full md:w-auto">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


