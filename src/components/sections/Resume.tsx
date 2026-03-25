"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Download, Mail, Github, Linkedin, MapPin, ExternalLink } from "lucide-react";

export function Resume() {
    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-black p-8 md:p-16 shadow-2xl rounded-sm font-serif print:shadow-none print:p-0">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start border-b-2 border-black pb-8 mb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase">{SITE_CONFIG.name}</h1>
                    <p className="text-xl font-medium text-slate-700 italic">{SITE_CONFIG.role}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm font-sans">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{SITE_CONFIG.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{SITE_CONFIG.location}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 print:hidden">
                        <a href={SITE_CONFIG.socials.github} target="_blank" className="hover:text-blue-600"><Github className="w-5 h-5" /></a>
                        <a href={SITE_CONFIG.socials.linkedin} target="_blank" className="hover:text-blue-600"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-12">
                    {/* Experience */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">Experience</h2>
                        <div className="space-y-8">
                            {SITE_CONFIG.experience.map((exp, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-xl font-bold">{exp.company}</h3>
                                        <span className="text-sm font-sans text-slate-500">{exp.period}</span>
                                    </div>
                                    <p className="text-lg font-medium italic text-slate-800">{exp.role}</p>
                                    <p className="text-slate-700 leading-relaxed text-base">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Featured Technical Wins */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">Technical Wins</h2>
                        <div className="space-y-6 text-slate-700 leading-relaxed text-base">
                            <p>
                                <strong>AI Model Orchestration:</strong> Developed a context-aware diagnostic engine using Gemini & Claude APIs, 
                                implementing complex tool-use and recursive feedback loops for pedagogical accuracy.
                            </p>
                            <p>
                                <strong>High-Performance Architectures:</strong> Leveraged Next.js App Router and Edge Functions to maintain 
                                sub-100ms TTI on community OS platforms serving thousands of concurrent objects.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                    {/* Skills */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">Expertise</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold mb-2 text-sm uppercase text-slate-500 font-sans">Languages</h4>
                                <p className="text-lg">TypeScript, JavaScript, Python, PostgreSQL, CSS (Tailwind)</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2 text-sm uppercase text-slate-500 font-sans">Frameworks</h4>
                                <p className="text-lg">Next.js, React, React Native, Expo, Drizzle ORM</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2 text-sm uppercase text-slate-500 font-sans">Platforms</h4>
                                <p className="text-lg">Supabase, Vercel, Firebase, AWS (S3/Lambda)</p>
                            </div>
                        </div>
                    </section>

                    {/* Awards */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">Awards</h2>
                        <div className="space-y-4">
                            {SITE_CONFIG.awards.map((award, idx) => (
                                <div key={idx} className="space-y-1">
                                    <h4 className="font-bold leading-tight">{award.title}</h4>
                                    <p className="text-sm font-sans text-slate-500">{award.organization} / {award.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-2 mb-6">Education</h2>
                        <div>
                            <h4 className="font-bold leading-tight uppercase tracking-tight">Software Engineering Foundation</h4>
                            <p className="text-sm font-sans text-slate-500 italic">Self-Directed & Immersive Projects</p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Print Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400 font-sans hidden print:block">
                References available upon request. Built with Next.js & TypeScript.
            </footer>

            {/* Actions for Web View */}
            <div className="mt-12 flex justify-center print:hidden">
                <Button 
                    onClick={handleDownload}
                    className="bg-black text-white hover:bg-slate-800 rounded-none h-14 px-8 font-sans font-bold tracking-widest uppercase transition-all"
                >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                </Button>
            </div>
        </div>
    );
}
