"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KineticText } from "@/components/ui/kinetic-text";
import { Button } from "@/components/ui/button";

export default function HOAReplyCaseStudy() {
    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Back Button */}
                <Link href="/projects">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Button>
                </Link>

                {/* Header */}
                <div className="space-y-6">
                    <KineticText>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            HOA Reply AI
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl text-muted-foreground">
                            AI-assisted inbox and workflow system for HOA boards and property managers. Processes resident emails faster, reduces repetitive replies, and keeps consistent records.
                        </p>
                    </KineticText>
                </div>

                {/* One-line Summary */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Summary</h2>
                    <p className="text-lg text-muted-foreground">
                        AI system that automates HOA inbox management for boards and property managers, reducing response time from 24 hours to under 5 minutes.
                    </p>
                </section>

                {/* Problem */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Problem</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        HOA inbox volume is high and repetitive: maintenance requests, violations, ARC requests, utilities, community rules. Responses need consistency and accuracy—wrong wording creates liability risk. Thread history matters, but information is scattered across email chains and attachments. Many HOAs are run by volunteers; the work is unpaid and chaotic. Board members waste evenings doing admin work that should be automated.
                    </p>
                </section>

                {/* Why Existing Solutions Fail */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Why Existing Solutions Fail</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
                        <li>Generic email management tools don't understand HOA-specific context (violations, ARC, bylaws)</li>
                        <li>Manual email templates require constant updates and don't adapt to different request types</li>
                        <li>No thread continuity—each email is treated as isolated, losing context from previous conversations</li>
                        <li>Routing is manual and error-prone; requests get lost or sent to the wrong person</li>
                        <li>No audit trail or case management; compliance issues are hard to track</li>
                        <li>Existing HOA software is expensive, bloated, and doesn't solve the inbox problem</li>
                    </ul>
                </section>

                {/* Solution */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Solution</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Built an AI-assisted inbox system that ingests incoming emails and attachments, classifies request types (maintenance/violation/ARC/billing/general), and drafts suggested responses using HOA-specific policies and past decisions. Each email becomes a "case" record with timeline, tags, and status. The system routes to the right person (board role/vendor/manager) and tracks follow-ups to prevent requests from getting lost.
                    </p>
                </section>

                {/* Key Features */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Key Features</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
                        <li>Email ingestion with Gmail/Resend integration and webhook processing</li>
                        <li>AI-powered classification using OpenAI to categorize requests (maintenance, violation, ARC, billing, general)</li>
                        <li>Context-aware response drafting that references HOA policies, bylaws, and past decisions</li>
                        <li>Case management system with timeline, tags, status tracking, and audit history</li>
                        <li>Smart routing based on request type and board member roles</li>
                        <li>Follow-up tracking and automated reminders to prevent dropped requests</li>
                        <li>Thread continuity that maintains context across email chains</li>
                        <li>Attachment handling and document storage for compliance</li>
                        <li>Board member dashboard showing pending cases and response queue</li>
                        <li>One-click response sending with review/edit before delivery</li>
                    </ul>
                </section>

                {/* Architecture / Stack */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Architecture / Stack</h2>
                    <div className="space-y-3 text-muted-foreground">
                        <p><strong className="text-foreground">Frontend:</strong> Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui</p>
                        <p><strong className="text-foreground">Backend:</strong> Supabase (Postgres), Prisma ORM</p>
                        <p><strong className="text-foreground">AI:</strong> OpenAI API for classification and response drafting</p>
                        <p><strong className="text-foreground">Automation:</strong> Inngest for background jobs and email processing</p>
                        <p><strong className="text-foreground">Email:</strong> Resend/Gmail integration with webhooks</p>
                        <p><strong className="text-foreground">Billing:</strong> Stripe subscriptions</p>
                    </div>
                </section>

                {/* Outcome */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Outcome</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                        <p>
                            Reduced response time from 24 hours to under 5 minutes for common requests. Board members spend 85% less time on email admin. [ASSUMPTION: Processing 200+ emails per month per HOA with 90%+ accuracy in classification]
                        </p>
                        <p>
                            Consistent responses reduce liability risk. All requests are tracked in cases, making compliance audits straightforward. No more lost emails or forgotten follow-ups.
                        </p>
                    </div>
                </section>

                {/* What I'd Build Next */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">What I'd Build Next</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
                        <li>Multi-HOA management for property management companies handling multiple communities</li>
                        <li>Resident portal where residents can check case status and submit requests directly</li>
                        <li>Automated violation tracking with photo uploads and citation generation</li>
                        <li>ARC request workflow with approval routing and decision templates</li>
                        <li>Integration with HOA accounting software for billing-related requests</li>
                        <li>Analytics dashboard showing response times, request volume trends, and board member workload</li>
                    </ul>
                </section>

                {/* Back Button */}
                <div className="pt-8">
                    <Link href="/projects">
                        <Button variant="outline" className="w-full md:w-auto">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Projects
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


