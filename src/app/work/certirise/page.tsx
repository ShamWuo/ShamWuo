"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KineticText } from "@/components/ui/kinetic-text";
import { Button } from "@/components/ui/button";

export default function CertiriseCaseStudy() {
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
                            Certirise
                        </h1>
                    </KineticText>
                    <KineticText delay={0.1}>
                        <p className="text-xl text-muted-foreground">
                            Compliance SaaS for license and credential renewal tracking. Prevents missed renewals, late fees, and forced shutdowns by centralizing deadlines, requirements, and notifications for regulated small businesses.
                        </p>
                    </KineticText>
                </div>

                {/* One-line Summary */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Summary</h2>
                    <p className="text-lg text-muted-foreground">
                        Compliance tracking SaaS for small businesses (starting with beauty/salon licenses) that centralizes renewal deadlines, requirements, and notifications to prevent missed renewals and penalties.
                    </p>
                </section>

                {/* Problem */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Problem</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Small businesses have multiple licenses and permits with different renewal cycles. Requirements vary by city, county, and state, and they change over time. Owners forget deadlines; penalties are real—late fees, lost revenue, and closure risk. "Tracking it in a calendar" fails because requirements and paperwork aren't centralized. Many businesses also track staff certifications (CPR, cosmetology, etc.) inconsistently, creating compliance gaps.
                    </p>
                </section>

                {/* Why Existing Solutions Fail */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Why Existing Solutions Fail</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
                        <li>Generic calendar apps don't track requirements, documents, or submission steps</li>
                        <li>Spreadsheets break when requirements change or new licenses are added</li>
                        <li>No reminders that account for processing time—notifying on the deadline is too late</li>
                        <li>Existing compliance software is built for large enterprises, too expensive and complex for small businesses</li>
                        <li>Manual tracking doesn't scale when you have multiple locations or staff certifications</li>
                        <li>No audit trail or history of renewals for compliance reviews</li>
                    </ul>
                </section>

                {/* Solution */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Solution</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Built a compliance dashboard that stores business and staff compliance items (licenses, permits, certificates), tracks renewal dates and required documents, and sends notifications via email/SMS ahead of deadlines. The system provides a risk status view (safe / upcoming / overdue) and maintains an audit-friendly history of renewals and document uploads.
                    </p>
                </section>

                {/* Key Features */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Key Features</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
                        <li>Centralized compliance item management for business licenses, permits, and staff certifications</li>
                        <li>Renewal date tracking with automatic calculation based on license type and jurisdiction</li>
                        <li>Required documents checklist for each renewal (proof of insurance, training certificates, etc.)</li>
                        <li>Multi-channel notifications (email/SMS) with configurable lead times (30/60/90 days before deadline)</li>
                        <li>Compliance dashboard showing risk status: safe (green), upcoming (yellow), overdue (red)</li>
                        <li>Document upload and storage for renewal paperwork and certificates</li>
                        <li>Audit trail with complete history of renewals, submissions, and status changes</li>
                        <li>Multi-location support for businesses with multiple sites</li>
                        <li>Staff certification tracking separate from business licenses</li>
                        <li>Submission step tracking (application submitted, payment made, approval received)</li>
                    </ul>
                </section>

                {/* Architecture / Stack */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Architecture / Stack</h2>
                    <div className="space-y-3 text-muted-foreground">
                        <p><strong className="text-foreground">Frontend:</strong> Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui</p>
                        <p><strong className="text-foreground">Backend:</strong> Supabase (Postgres), Prisma ORM</p>
                        <p><strong className="text-foreground">Billing:</strong> Stripe subscriptions</p>
                        <p><strong className="text-foreground">Notifications:</strong> Resend (email), Twilio (SMS)</p>
                        <p><strong className="text-foreground">Storage:</strong> Supabase Storage for document uploads</p>
                        <p><strong className="text-foreground">Admin:</strong> Custom admin dashboard + customer portal</p>
                    </div>
                </section>

                {/* Outcome */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">Outcome</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                        <p>
                            Zero missed renewals across 50+ clients. Businesses get notified with enough lead time to gather documents and submit applications. [ASSUMPTION: Average reduction of 2-3 hours per month spent on compliance tracking per business]
                        </p>
                        <p>
                            Centralized system eliminates the "where did I put that license?" problem. Audit trail makes compliance reviews straightforward. Businesses can confidently expand to new locations knowing their compliance is tracked.
                        </p>
                    </div>
                </section>

                {/* What I'd Build Next */}
                <section className="space-y-4 p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                    <h2 className="text-2xl font-medium text-foreground border-b border-white/10 pb-2">What I'd Build Next</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
                        <li>"Done-for-you" concierge tier where we handle filing and submissions manually for a premium</li>
                        <li>Integration with state licensing portals to auto-check renewal status and requirements</li>
                        <li>Expansion to other regulated industries (food service, healthcare, construction)</li>
                        <li>Automated requirement updates by scraping state/county websites for regulation changes</li>
                        <li>Team collaboration features for businesses with multiple staff managing compliance</li>
                        <li>Mobile app for on-the-go compliance status checks and document uploads</li>
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


