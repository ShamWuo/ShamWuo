"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 py-6 bg-transparent">
            <Link href="/" className="group flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center font-medium text-white group-hover:bg-white/10 transition-all">
                    sw
                </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                {SITE_CONFIG.nav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-4 py-2 rounded-xl text-xs font-medium transition-all",
                                isActive 
                                    ? "bg-white text-black shadow-lg" 
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm" className="rounded-xl text-slate-400 hover:text-white">
                    <Link href="/contact">Let's Talk</Link>
                </Button>
            </div>
        </header>
    );
}


