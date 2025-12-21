"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEMES = {
    emojis: ["🎮", "🎯", "🎨", "🎭", "🎪", "🎬", "🎤", "🎧", "🎸", "🎺", "🎻", "🥁"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"],
    food: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍑", "🍒", "🥝", "🍉", "🍋", "🥭", "🍍"],
    shapes: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤", "🔶", "🔷", "🔸"],
};

const DIFFICULTIES = {
    easy: { pairs: 4, name: "Easy", gridCols: 4 },
    medium: { pairs: 8, name: "Medium", gridCols: 4 },
    hard: { pairs: 12, name: "Hard", gridCols: 4 },
};

type Card = {
    id: string;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
};

type Theme = keyof typeof THEMES;
type Difficulty = keyof typeof DIFFICULTIES;

export default function MemoryGame() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [theme, setTheme] = useState<Theme>("emojis");
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [hints, setHints] = useState(3);
    const [bestScore, setBestScore] = useState<number | null>(null);

    const initializeCards = useCallback(() => {
        const items = THEMES[theme].slice(0, DIFFICULTIES[difficulty].pairs);
        const cardPairs: Card[] = [];
        
        // Create pairs with unique IDs
        items.forEach((content, pairIndex) => {
            cardPairs.push({
                id: `${content}-${pairIndex}-0`,
                content,
                isFlipped: false,
                isMatched: false,
            });
            cardPairs.push({
                id: `${content}-${pairIndex}-1`,
                content,
                isFlipped: false,
                isMatched: false,
            });
        });
        
        // Shuffle
        const shuffled = cardPairs.sort(() => Math.random() - 0.5);

        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setTimer(0);
        setIsTimerActive(false);
        setHints(3);
        setIsChecking(false);
    }, [theme, difficulty]);

    useEffect(() => {
        initializeCards();
    }, [initializeCards]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive]);

    const handleCardClick = useCallback((cardId: string) => {
        // Prevent clicks during checking or if already flipped/matched
        if (isChecking || flippedCards.length >= 2) return;
        
        setCards((prevCards) => {
            const card = prevCards.find((c) => c.id === cardId);
            if (!card || card.isFlipped || card.isMatched) return prevCards;
            
            // Start timer on first click
            if (!isTimerActive) setIsTimerActive(true);
            
            // Update flipped cards list
            const newFlippedCards = [...flippedCards, cardId];
            setFlippedCards(newFlippedCards);
            
            // Flip the card
            const updatedCards = prevCards.map((c) =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            );
            
            // If two cards are flipped, check for match
            if (newFlippedCards.length === 2) {
                setIsChecking(true);
                setMoves((prev) => prev + 1);
                
                setTimeout(() => {
                    setCards((currentCards) => {
                        const firstCard = currentCards.find((c) => c.id === newFlippedCards[0]);
                        const secondCard = currentCards.find((c) => c.id === newFlippedCards[1]);
                        
                        if (firstCard && secondCard && firstCard.content === secondCard.content) {
                            // Match found
                            setMatches((prev) => prev + 1);
                            return currentCards.map((c) =>
                                c.id === newFlippedCards[0] || c.id === newFlippedCards[1]
                                    ? { ...c, isMatched: true, isFlipped: true }
                                    : c
                            );
                        } else {
                            // No match - flip back
                            return currentCards.map((c) =>
                                c.id === newFlippedCards[0] || c.id === newFlippedCards[1]
                                    ? { ...c, isFlipped: false }
                                    : c
                            );
                        }
                    });
                    
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
            
            return updatedCards;
        });
    }, [isChecking, flippedCards, isTimerActive]);

    const useHint = () => {
        if (hints <= 0 || flippedCards.length > 0 || isChecking) return;
        
        setCards((prevCards) => {
            const unmatchedCards = prevCards.filter((c) => !c.isMatched && !c.isFlipped);
            if (unmatchedCards.length < 2) return prevCards;
            
            const randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
            setHints((prev) => prev - 1);
            
            // Temporarily flip the card
            const updated = prevCards.map((c) =>
                c.id === randomCard.id ? { ...c, isFlipped: true } : c
            );
            
            setTimeout(() => {
                setCards((currentCards) =>
                    currentCards.map((c) =>
                        c.id === randomCard.id ? { ...c, isFlipped: false } : c
                    )
                );
            }, 2000);
            
            return updated;
        });
    };

    const isGameWon = matches === DIFFICULTIES[difficulty].pairs;
    const gridCols = DIFFICULTIES[difficulty].gridCols;

    useEffect(() => {
        if (isGameWon) {
            setIsTimerActive(false);
            const score = moves + timer;
            if (!bestScore || score < bestScore) {
                setBestScore(score);
                localStorage.setItem(`memory-best-${difficulty}-${theme}`, score.toString());
            }
        }
    }, [isGameWon, moves, timer, difficulty, theme, bestScore]);

    useEffect(() => {
        const saved = localStorage.getItem(`memory-best-${difficulty}-${theme}`);
        if (saved) setBestScore(parseInt(saved));
    }, [difficulty, theme]);

    const getStars = () => {
        const totalPairs = DIFFICULTIES[difficulty].pairs;
        const perfectMoves = totalPairs;
        const goodMoves = Math.ceil(totalPairs * 1.5);
        if (moves <= perfectMoves) return 3;
        if (moves <= goodMoves) return 2;
        return 1;
    };

    return (
        <div className="container min-h-screen py-12 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <Link href="/projects">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Button>
                </Link>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-medium tracking-tight text-foreground mb-2">
                            Memory Match
                        </h1>
                        <p className="text-muted-foreground">
                            Find all matching pairs. Customize theme, difficulty, and use hints!
                        </p>
                    </div>

                    {/* Customization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Theme</label>
                            <div className="flex gap-2 flex-wrap">
                                {Object.keys(THEMES).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t as Theme)}
                                        className={`px-3 py-1 rounded text-sm transition-all ${
                                            theme === t
                                                ? "bg-white/20 text-foreground"
                                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                        }`}
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
                            <div className="flex gap-2">
                                {Object.keys(DIFFICULTIES).map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setDifficulty(d as Difficulty)}
                                        className={`px-3 py-1 rounded text-sm transition-all ${
                                            difficulty === d
                                                ? "bg-white/20 text-foreground"
                                                : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                        }`}
                                    >
                                        {DIFFICULTIES[d as Difficulty].name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex gap-6">
                            <div>
                                <span className="text-muted-foreground">Moves: </span>
                                <span className="font-medium text-foreground">{moves}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Matches: </span>
                                <span className="font-medium text-foreground">
                                    {matches} / {DIFFICULTIES[difficulty].pairs}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{timer}s</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">Hints: {hints}</span>
                            <Button
                                onClick={useHint}
                                disabled={hints <= 0 || flippedCards.length > 0 || isChecking}
                                size="sm"
                                variant="outline"
                                className="ml-2"
                            >
                                Use Hint
                            </Button>
                        </div>
                    </div>

                    {isGameWon && (
                        <div className="p-6 rounded-lg bg-green-500/20 border border-green-500/50 text-center space-y-2">
                            <p className="text-2xl font-medium text-green-400">🎉 You won!</p>
                            <div className="flex items-center justify-center gap-1">
                                {[...Array(getStars())].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Completed in {moves} moves and {timer} seconds
                            </p>
                            {bestScore && (
                                <p className="text-xs text-muted-foreground">
                                    Best score: {bestScore} (moves + time)
                                </p>
                            )}
                        </div>
                    )}

                    <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
                        {cards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card.id)}
                                disabled={isChecking || card.isMatched || card.isFlipped}
                                className={`
                                    aspect-square rounded-lg border-2 transition-all duration-300
                                    ${
                                        card.isFlipped || card.isMatched
                                            ? "bg-white/10 border-white/30 scale-105"
                                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 hover:scale-105"
                                    }
                                    ${card.isMatched ? "opacity-50" : ""}
                                    ${isChecking && !card.isFlipped ? "cursor-not-allowed opacity-50" : ""}
                                    ${card.isFlipped && !card.isMatched ? "cursor-pointer" : ""}
                                    flex items-center justify-center text-4xl
                                `}
                            >
                                {card.isFlipped || card.isMatched ? card.content : "?"}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={initializeCards} className="flex-1">
                            New Game
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
