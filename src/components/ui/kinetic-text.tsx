"use client";

import { motion } from "framer-motion";

interface KineticTextProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function KineticText({ children, className, delay = 0 }: KineticTextProps) {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1], // Custom snappy ease
                    delay: delay,
                }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    );
}
