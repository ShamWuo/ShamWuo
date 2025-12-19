"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Shape configuration interface
 */
interface ShapeConfig {
    id: number;
    className: string;
    initialX: number; // Percentage 0-1
    initialY: number; // Percentage 0-1
    mass: number;
    rotationSpeed: number;
    initialRotation?: number;
}

const SHAPES: ShapeConfig[] = [
    {
        id: 1,
        className: "w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 mix-blend-overlay",
        initialX: 0.9,
        initialY: 0.1,
        mass: 1.0,
        rotationSpeed: 0.2,
    },
    {
        id: 2,
        className: "w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]",
        initialX: 0.05,
        initialY: 0.4,
        mass: 0.8,
        rotationSpeed: -0.15,
    },
    {
        id: 3,
        className: "w-16 h-16 md:w-24 md:h-24 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl skew-y-12",
        initialX: 0.85,
        initialY: 0.8,
        mass: 0.6,
        rotationSpeed: 0.1,
        initialRotation: 45,
    },
    {
        id: 4, // Orb
        className: "w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/5 blur-2xl border border-white/10",
        initialX: 0.15,
        initialY: 0.2,
        mass: 1.2,
        rotationSpeed: 0,
    },
    {
        id: 5, // Tiny Cube
        className: "w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 opacity-60",
        initialX: 0.7,
        initialY: 0.5,
        mass: 0.4,
        rotationSpeed: 0.5,
    },
    // ID 6 (Capsule) Removed
    {
        id: 7, // Prism
        className: "w-8 h-8 md:w-12 md:h-12 border-2 border-white/10 bg-white/5 backdrop-blur-sm",
        initialX: 0.45,
        initialY: 0.15,
        mass: 0.3,
        rotationSpeed: -0.3,
        initialRotation: 45,
    },
];

// Shared mutable object for impulse
const impulseVector = { x: 0, y: 0 };

function PhysicsShape({ config }: { config: ShapeConfig }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useMotionValue(config.initialRotation || 0);

    const velocityX = useRef(0);
    const velocityY = useRef(0);
    const positionX = useRef(0);
    const positionY = useRef(0);
    const initialized = useRef(false);

    useEffect(() => {
        // Initialize position based on window size
        if (!initialized.current) {
            positionX.current = window.innerWidth * config.initialX;
            positionY.current = window.innerHeight * config.initialY;
            initialized.current = true;
        }

        const handleResize = () => {
            // Optional: Reset logic could go here if needed
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [config.initialX, config.initialY]);

    useAnimationFrame((t, delta) => {
        if (!initialized.current) return;

        // 1. Apply Impulse
        const sensitivity = (1.5 - config.mass) * 0.05;
        velocityX.current += impulseVector.x * sensitivity;
        velocityY.current += impulseVector.y * sensitivity;

        // 2. Friction
        const friction = 0.95;
        velocityX.current *= friction;
        velocityY.current *= friction;

        // 3. Update Position
        // Delta scaling ensures consistency across frame rates
        // Typical delta is ~16ms. 0.1 multiplier scales it to pixels/frame roughly
        positionX.current += velocityX.current * delta * 0.1;
        positionY.current += velocityY.current * delta * 0.1;

        // 4. Wrap Logic (Toroidal)
        const padding = 200;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (positionX.current > width + padding) {
            positionX.current = -padding;
        } else if (positionX.current < -padding) {
            positionX.current = width + padding;
        }

        if (positionY.current > height + padding) {
            positionY.current = -padding;
        } else if (positionY.current < -padding) {
            positionY.current = height + padding;
        }

        // 5. Commit
        x.set(positionX.current);
        y.set(positionY.current);
        rotate.set(rotate.get() + config.rotationSpeed);
    });

    return (
        <motion.div
            style={{ x, y, rotate }}
            // 'absolute top-0 left-0' is critical for x/y transforms to work from 0,0
            className={cn("absolute top-0 left-0 will-change-transform", config.className)}
        />
    );
}

export function ParallaxFloatingShapes() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        let timeoutRef: NodeJS.Timeout;

        const handleWheel = (e: WheelEvent) => {
            impulseVector.x = e.deltaX;
            impulseVector.y = e.deltaY;

            clearTimeout(timeoutRef);
            timeoutRef = setTimeout(() => {
                impulseVector.x = 0;
                impulseVector.y = 0;
            }, 50);
        };

        window.addEventListener("wheel", handleWheel);
        return () => {
            window.removeEventListener("wheel", handleWheel);
            clearTimeout(timeoutRef);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {SHAPES.map((shape) => (
                <PhysicsShape key={shape.id} config={shape} />
            ))}
        </div>
    );
}
