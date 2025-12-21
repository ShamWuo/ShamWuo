"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReactionGame() {
    const [gameState, setGameState] = useState<"waiting" | "ready" | "click" | "too-early">("waiting");
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [times, setTimes] = useState<number[]>([]);
    const [round, setRound] = useState(0);
    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startRound = () => {
        setGameState("waiting");
        setReactionTime(null);
        
        // Random delay between 2-5 seconds
        const delay = 2000 + Math.random() * 3000;
        
        timeoutRef.current = setTimeout(() => {
            setGameState("ready");
            startTimeRef.current = Date.now();
        }, delay);
    };

    const handleClick = () => {
        if (gameState === "waiting") {
            setGameState("too-early");
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setTimeout(() => {
                setGameState("waiting");
                startRound();
            }, 2000);
            return;
        }

        if (gameState === "ready") {
            const time = Date.now() - startTimeRef.current;
            setReactionTime(time);
            setTimes((prev) => [...prev, time]);
            setRound((prev) => prev + 1);
            setGameState("click");
        }
    };

    const resetGame = () => {
        setGameState("waiting");
        setReactionTime(null);
        setTimes([]);
        setRound(0);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        startRound();
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const averageTime = times.length > 0
        ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
        : null;

    const getColorClass = () => {
        if (gameState === "waiting") return "bg-white/5 border-white/10";
        if (gameState === "ready") return "bg-green-500/20 border-green-500/50";
        if (gameState === "too-early") return "bg-red-500/20 border-red-500/50";
        return "bg-blue-500/20 border-blue-500/50";
    };

    const getButtonText = () => {
        if (gameState === "waiting") return "Wait for green...";
        if (gameState === "ready") return "CLICK NOW!";
        if (gameState === "too-early") return "Too early! Wait for green.";
        return "Click to try again";
    };

    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="max-w-2xl mx-auto space-y-8">
                <Link href="/projects">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Button>
                </Link>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-medium tracking-tight text-foreground mb-2">
                            Reaction Game
                        </h1>
                        <p className="text-muted-foreground">
                            Test your reaction speed. Click when the button turns green!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="text-center">
                            {reactionTime !== null && (
                                <div className="text-6xl font-bold text-foreground mb-2">
                                    {reactionTime}ms
                                </div>
                            )}
                            {averageTime && (
                                <div className="text-lg text-muted-foreground">
                                    Average: {averageTime}ms ({times.length} rounds)
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleClick}
                            className={`
                                w-full h-64 rounded-xl border-2 transition-all duration-200
                                ${getColorClass()}
                                hover:scale-[1.02] active:scale-[0.98]
                                text-2xl font-medium
                            `}
                        >
                            {getButtonText()}
                        </button>
                    </div>

                    {times.length > 0 && (
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h3 className="text-sm font-medium text-foreground mb-2">
                                Recent times:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {times.slice(-10).reverse().map((time, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full bg-white/5 text-sm text-muted-foreground"
                                    >
                                        {time}ms
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button onClick={startRound} className="flex-1" variant="outline">
                            Next Round
                        </Button>
                        <Button onClick={resetGame} className="flex-1">
                            Reset
                        </Button>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Wait for the button to turn green</p>
                        <p>• Click as fast as you can when it turns green</p>
                        <p>• Don't click too early or you'll have to restart</p>
                        <p>• Try to beat your average time!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

