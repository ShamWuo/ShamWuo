"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

export default function SnakeGame() {
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Direction>("RIGHT");
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const directionRef = useRef<Direction>("RIGHT");

    const generateFood = useCallback((): Position => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    }, []);

    const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
        return body.some(
            (segment) => segment.x === head.x && segment.y === head.y
        );
    }, []);

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake((prevSnake) => {
            const newSnake = [...prevSnake];
            const head = { ...newSnake[0] };

            switch (directionRef.current) {
                case "UP":
                    head.y -= 1;
                    break;
                case "DOWN":
                    head.y += 1;
                    break;
                case "LEFT":
                    head.x -= 1;
                    break;
                case "RIGHT":
                    head.x += 1;
                    break;
            }

            // Check wall collision
            if (
                head.x < 0 ||
                head.x >= GRID_SIZE ||
                head.y < 0 ||
                head.y >= GRID_SIZE
            ) {
                setGameOver(true);
                return prevSnake;
            }

            // Check self collision
            if (checkCollision(head, newSnake)) {
                setGameOver(true);
                return prevSnake;
            }

            newSnake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                setScore((prev) => prev + 10);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [food, gameOver, isPaused, checkCollision, generateFood]);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        const interval = setInterval(moveSnake, 150);
        return () => clearInterval(interval);
    }, [moveSnake]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case "ArrowUp":
                    if (directionRef.current !== "DOWN") {
                        setDirection("UP");
                    }
                    break;
                case "ArrowDown":
                    if (directionRef.current !== "UP") {
                        setDirection("DOWN");
                    }
                    break;
                case "ArrowLeft":
                    if (directionRef.current !== "RIGHT") {
                        setDirection("LEFT");
                    }
                    break;
                case "ArrowRight":
                    if (directionRef.current !== "LEFT") {
                        setDirection("RIGHT");
                    }
                    break;
                case " ":
                    e.preventDefault();
                    setIsPaused((prev) => !prev);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [gameOver]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection("RIGHT");
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
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
                            Snake Game
                        </h1>
                        <p className="text-muted-foreground">
                            Classic snake game. Use arrow keys to move, spacebar to pause.
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-lg">
                            <span className="text-muted-foreground">Score: </span>
                            <span className="font-medium text-foreground">{score}</span>
                        </div>
                        {isPaused && !gameOver && (
                            <div className="text-lg text-muted-foreground">Paused</div>
                        )}
                        {gameOver && (
                            <div className="text-lg text-red-400">Game Over!</div>
                        )}
                    </div>

                    <div className="relative border-2 border-white/20 rounded-lg bg-black/20 p-4">
                        <div
                            className="relative mx-auto"
                            style={{
                                width: GRID_SIZE * CELL_SIZE,
                                height: GRID_SIZE * CELL_SIZE,
                            }}
                        >
                            {/* Food */}
                            <div
                                className="absolute bg-red-500 rounded-full"
                                style={{
                                    left: food.x * CELL_SIZE,
                                    top: food.y * CELL_SIZE,
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                }}
                            />

                            {/* Snake */}
                            {snake.map((segment, index) => (
                                <div
                                    key={index}
                                    className={`absolute ${
                                        index === 0 ? "bg-green-400" : "bg-green-600"
                                    } rounded-sm`}
                                    style={{
                                        left: segment.x * CELL_SIZE,
                                        top: segment.y * CELL_SIZE,
                                        width: CELL_SIZE,
                                        height: CELL_SIZE,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={resetGame} className="flex-1">
                            {gameOver ? "Play Again" : "Reset"}
                        </Button>
                        <Button
                            onClick={() => setIsPaused((prev) => !prev)}
                            variant="outline"
                            disabled={gameOver}
                            className="flex-1"
                        >
                            {isPaused ? "Resume" : "Pause"}
                        </Button>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Use arrow keys to control the snake</p>
                        <p>• Eat the red food to grow and score points</p>
                        <p>• Don't hit the walls or yourself</p>
                        <p>• Press spacebar to pause</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

