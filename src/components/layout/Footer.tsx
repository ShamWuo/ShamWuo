import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 bg-background">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <span className="text-sm font-medium text-foreground">{SITE_CONFIG.name}</span>
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} All rights reserved. Built with precision.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Link href={SITE_CONFIG.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-4 h-4" />
                    </Link>
                    <Link href={SITE_CONFIG.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </Link>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
