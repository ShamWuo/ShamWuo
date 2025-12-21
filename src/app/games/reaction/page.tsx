"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, TrendingUp, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const DIFFICULTIES = {
    easy: { min: 3000, max: 6000, name: "Easy" },
    medium: { min: 2000, max: 5000, name: "Medium" },
    hard: { min: 1000, max: 3000, name: "Hard" },
    extreme: { min: 500, max: 2000, name: "Extreme" },
};

const THEMES = {
    default: { waiting: "bg-white/5", ready: "bg-green-500/20", early: "bg-red-500/20", clicked: "bg-blue-500/20" },
    neon: { waiting: "bg-cyan-500/10", ready: "bg-green-400/30", early: "bg-pink-500/30", clicked: "bg-purple-500/30" },
    retro: { waiting: "bg-yellow-500/10", ready: "bg-green-600/30", early: "bg-red-600/30", clicked: "bg-orange-500/30" },
};

type Difficulty = keyof typeof DIFFICULTIES;
type Theme = keyof typeof THEMES;

export default function ReactionGame() {
    const [gameState, setGameState] = useState<"waiting" | "ready" | "click" | "too-early">("waiting");
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [times, setTimes] = useState<number[]>([]);
    const [round, setRound] = useState(0);
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [theme, setTheme] = useState<Theme>("default");
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startRound = () => {
        setGameState("waiting");
        setReactionTime(null);
        
        const diff = DIFFICULTIES[difficulty];
        const delay = diff.min + Math.random() * (diff.max - diff.min);
        
        timeoutRef.current = setTimeout(() => {
            setGameState("ready");
            startTimeRef.current = Date.now();
        }, delay);
    };

    const handleClick = () => {
        if (gameState === "waiting") {
            setGameState("too-early");
            setStreak(0);
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
            
            setStreak((prev) => {
                const newStreak = prev + 1;
                if (newStreak > bestStreak) {
                    setBestStreak(newStreak);
                    localStorage.setItem("reaction-best-streak", newStreak.toString());
                }
                return newStreak;
            });
            
            setRound((prev) => prev + 1);
            setGameState("click");
        }
    };

    const resetGame = () => {
        setGameState("waiting");
        setReactionTime(null);
        setTimes([]);
        setRound(0);
        setStreak(0);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("reaction-best-streak");
        if (saved) setBestStreak(parseInt(saved));
        
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
    
    const bestTime = times.length > 0 ? Math.min(...times) : null;
    const worstTime = times.length > 0 ? Math.max(...times) : null;

    const currentTheme = THEMES[theme];

    const getColorClass = () => {
        if (gameState === "waiting") return currentTheme.waiting;
        if (gameState === "ready") return currentTheme.ready;
        if (gameState === "too-early") return currentTheme.early;
        return currentTheme.clicked;
    };

    const getButtonText = () => {
        if (gameState === "waiting") return "Wait for green...";
        if (gameState === "ready") return "CLICK NOW!";
        if (gameState === "too-early") return "Too early! Wait for green.";
        return "Click to try again";
    };

    const getPerformanceRating = (time: number) => {
        if (time < 200) return { text: "Legendary!", color: "text-purple-400" };
        if (time < 250) return { text: "Excellent!", color: "text-green-400" };
        if (time < 300) return { text: "Great!", color: "text-blue-400" };
        if (time < 400) return { text: "Good", color: "text-yellow-400" };
        return { text: "Keep practicing", color: "text-muted-foreground" };
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
                            Reaction Time
                        </h1>
                        <p className="text-muted-foreground">
                            Test your reaction speed with customizable difficulty and themes!
                        </p>
                    </div>

                    {/* Customization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Difficulty</label>
                            <select
                                value={difficulty}
                                onChange={(e) => {
                                    setDifficulty(e.target.value as Difficulty);
                                    resetGame();
                                }}
                                className="w-full px-2 py-1 rounded bg-black/20 border border-white/10 text-sm"
                            >
                                {Object.keys(DIFFICULTIES).map((d) => (
                                    <option key={d} value={d}>{DIFFICULTIES[d as Difficulty].name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as Theme)}
                                className="w-full px-2 py-1 rounded bg-black/20 border border-white/10 text-sm"
                            >
                                {Object.keys(THEMES).map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-xs text-muted-foreground mb-1">Current</div>
                            {reactionTime !== null && (
                                <div className="text-2xl font-bold text-foreground">
                                    {reactionTime}ms
                                </div>
                            )}
                            {reactionTime && (
                                <div className={`text-xs mt-1 ${getPerformanceRating(reactionTime).color}`}>
                                    {getPerformanceRating(reactionTime).text}
                                </div>
                            )}
                        </div>
                        {averageTime && (
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Average
                                </div>
                                <div className="text-2xl font-bold text-foreground">{averageTime}ms</div>
                            </div>
                        )}
                        {bestTime && (
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <Trophy className="w-3 h-3 text-yellow-400" />
                                    Best
                                </div>
                                <div className="text-2xl font-bold text-yellow-400">{bestTime}ms</div>
                            </div>
                        )}
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-blue-400" />
                                Streak
                            </div>
                            <div className="text-2xl font-bold text-foreground">{streak}</div>
                            {bestStreak > 0 && (
                                <div className="text-xs text-muted-foreground mt-1">Best: {bestStreak}</div>
                            )}
                        </div>
                    </div>


                    <div className="space-y-4">
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
                                {times.slice(-15).reverse().map((time, index) => (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 rounded-full bg-white/5 text-sm ${
                                            time === bestTime ? "ring-2 ring-yellow-400 text-yellow-400" : "text-muted-foreground"
                                        }`}
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
                        <p>• Don't click too early or you'll break your streak</p>
                        <p>• Build your streak for bragging rights!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
