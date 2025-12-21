"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export function CategoryTabs() {
    const pathname = usePathname();
    // Extract category from pathname (e.g., "/projects/apps" -> "apps", "/projects" -> "all")
    const pathParts = pathname.split("/").filter(Boolean);
    const categoryFromPath = pathParts[1] || "all";
    const currentCategory = categoryFromPath === "projects" ? "all" : categoryFromPath;

    return (
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
            {SITE_CONFIG.projectCategories.map((category) => {
                const isActive = currentCategory === category.id;
                const href = category.id === "all" ? "/projects" : `/projects/${category.slug}`;

                return (
                    <Link
                        key={category.id}
                        href={href}
                        className={cn(
                            "relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                            isActive
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {category.label}
                        {isActive && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}

