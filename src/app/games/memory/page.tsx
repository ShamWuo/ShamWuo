"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMOJIS = ["🎮", "🎯", "🎨", "🎭", "🎪", "🎬", "🎤", "🎧"];

type Card = {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
};

export default function MemoryGame() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    const initializeCards = useCallback(() => {
        const cardPairs = [...EMOJIS, ...EMOJIS];
        const shuffled = cardPairs
            .map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false,
            }))
            .sort(() => Math.random() - 0.5);

        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
    }, []);

    useEffect(() => {
        initializeCards();
    }, [initializeCards]);

    const handleCardClick = (cardId: number) => {
        if (isChecking || flippedCards.length >= 2) return;

        const card = cards[cardId];
        if (card.isFlipped || card.isMatched) return;

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        setCards((prevCards) =>
            prevCards.map((c) =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            )
        );

        if (newFlippedCards.length === 2) {
            setIsChecking(true);
            setMoves((prev) => prev + 1);

            setTimeout(() => {
                const [firstId, secondId] = newFlippedCards;
                const firstCard = cards[firstId];
                const secondCard = cards[secondId];

                if (firstCard.emoji === secondCard.emoji) {
                    setCards((prevCards) =>
                        prevCards.map((c) =>
                            c.id === firstId || c.id === secondId
                                ? { ...c, isMatched: true, isFlipped: true }
                                : c
                        )
                    );
                    setMatches((prev) => prev + 1);
                } else {
                    setCards((prevCards) =>
                        prevCards.map((c) =>
                            c.id === firstId || c.id === secondId
                                ? { ...c, isFlipped: false }
                                : c
                        )
                    );
                }

                setFlippedCards([]);
                setIsChecking(false);
            }, 1000);
        }
    };

    const isGameWon = matches === EMOJIS.length;

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
                            Memory Game
                        </h1>
                        <p className="text-muted-foreground">
                            Find all matching pairs. Click cards to flip them.
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-lg">
                            <span className="text-muted-foreground">Moves: </span>
                            <span className="font-medium text-foreground">{moves}</span>
                        </div>
                        <div className="text-lg">
                            <span className="text-muted-foreground">Matches: </span>
                            <span className="font-medium text-foreground">
                                {matches} / {EMOJIS.length}
                            </span>
                        </div>
                    </div>

                    {isGameWon && (
                        <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-center">
                            <p className="text-lg font-medium text-green-400">
                                🎉 You won! Completed in {moves} moves.
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-4 gap-3">
                        {cards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card.id)}
                                disabled={isChecking || card.isMatched}
                                className={`
                                    aspect-square rounded-lg border-2 transition-all duration-300
                                    ${
                                        card.isFlipped || card.isMatched
                                            ? "bg-white/10 border-white/30"
                                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                                    }
                                    ${card.isMatched ? "opacity-50" : ""}
                                    ${isChecking && !card.isFlipped ? "cursor-not-allowed" : ""}
                                    flex items-center justify-center text-4xl
                                `}
                            >
                                {card.isFlipped || card.isMatched ? card.emoji : "?"}
                            </button>
                        ))}
                    </div>

                    <Button onClick={initializeCards} className="w-full">
                        New Game
                    </Button>

                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Click cards to flip them</p>
                        <p>• Find matching pairs</p>
                        <p>• Try to complete with as few moves as possible</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

