"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { motion } from "framer-motion";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-2">
                <Link href="/" className="text-sm font-medium tracking-tight hover:opacity-80 transition-opacity">
                    {SITE_CONFIG.name}
                </Link>
                <span className="text-muted-foreground text-xs hidden sm:inline-block">/</span>
                <span className="text-muted-foreground text-xs hidden sm:inline-block truncate max-w-[200px]">
                    {SITE_CONFIG.role}
                </span>
            </div>

            <nav className="flex items-center gap-6">
                {SITE_CONFIG.nav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative",
                                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.label}
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
