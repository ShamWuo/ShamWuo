"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Shield, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };
type PowerUp = { position: Position; type: "speed" | "slow" | "shield" | "double"; expires: number };

const SPEEDS = {
    slow: 200,
    normal: 150,
    fast: 100,
    extreme: 80,
};

const THEMES = {
    classic: { snake: "bg-green-400", head: "bg-green-300", food: "bg-red-500", bg: "bg-black/20" },
    neon: { snake: "bg-cyan-400", head: "bg-cyan-300", food: "bg-pink-500", bg: "bg-black/40" },
    retro: { snake: "bg-yellow-400", head: "bg-yellow-300", food: "bg-orange-500", bg: "bg-black/30" },
    dark: { snake: "bg-purple-600", head: "bg-purple-400", food: "bg-red-600", bg: "bg-black/50" },
};

type Speed = keyof typeof SPEEDS;
type Theme = keyof typeof THEMES;

export default function SnakeGame() {
    const [gridSize, setGridSize] = useState(20);
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 15, y: 15 });
    const [powerUp, setPowerUp] = useState<PowerUp | null>(null);
    const [direction, setDirection] = useState<Direction>("RIGHT");
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState<Speed>("normal");
    const [theme, setTheme] = useState<Theme>("classic");
    const [hasShield, setHasShield] = useState(false);
    const [doublePoints, setDoublePoints] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [obstacles, setObstacles] = useState<Position[]>([]);
    const [obstacleMode, setObstacleMode] = useState(false);
    const directionRef = useRef<Direction>("RIGHT");
    const speedMultiplierRef = useRef(1);

    const cellSize = 400 / gridSize;

    const generateFood = useCallback((): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            };
        } while (
            snake.some((s) => s.x === newFood.x && s.y === newFood.y) ||
            obstacles.some((o) => o.x === newFood.x && o.y === newFood.y)
        );
        return newFood;
    }, [snake, gridSize, obstacles]);

    const generatePowerUp = useCallback((): PowerUp => {
        const types: PowerUp["type"][] = ["speed", "slow", "shield", "double"];
        const type = types[Math.floor(Math.random() * types.length)];
        let position: Position;
        do {
            position = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            };
        } while (
            snake.some((s) => s.x === position.x && s.y === position.y) ||
            (food.x === position.x && food.y === position.y) ||
            obstacles.some((o) => o.x === position.x && o.y === position.y)
        );
        return { position, type, expires: Date.now() + 10000 };
    }, [snake, food, gridSize, obstacles]);

    const generateObstacles = useCallback(() => {
        const count = Math.floor(gridSize * 0.1);
        const obs: Position[] = [];
        for (let i = 0; i < count; i++) {
            let pos: Position;
            do {
                pos = {
                    x: Math.floor(Math.random() * gridSize),
                    y: Math.floor(Math.random() * gridSize),
                };
            } while (
                snake.some((s) => s.x === pos.x && s.y === pos.y) ||
                (food.x === pos.x && food.y === pos.y) ||
                obs.some((o) => o.x === pos.x && o.y === pos.y)
            );
            obs.push(pos);
        }
        setObstacles(obs);
    }, [snake, food, gridSize]);

    const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
        return body.some((segment) => segment.x === head.x && segment.y === head.y);
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

            // Wrap around walls
            if (head.x < 0) head.x = gridSize - 1;
            if (head.x >= gridSize) head.x = 0;
            if (head.y < 0) head.y = gridSize - 1;
            if (head.y >= gridSize) head.y = 0;

            // Check obstacle collision
            if (obstacles.some((o) => o.x === head.x && o.y === head.y)) {
                if (!hasShield) {
                    setGameOver(true);
                    return prevSnake;
                } else {
                    setHasShield(false);
                }
            }

            // Check self collision
            if (checkCollision(head, newSnake)) {
                if (!hasShield) {
                    setGameOver(true);
                    return prevSnake;
                } else {
                    setHasShield(false);
                }
            }

            newSnake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                const points = doublePoints ? 20 : 10;
                setScore((prev) => {
                    const newScore = prev + points;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem("snake-highscore", newScore.toString());
                    }
                    return newScore;
                });
                setFood(generateFood());
                
                // Chance to spawn power-up
                if (Math.random() < 0.3 && !powerUp) {
                    setPowerUp(generatePowerUp());
                }
            } else {
                newSnake.pop();
            }

            // Check power-up collision
            if (powerUp && head.x === powerUp.position.x && head.y === powerUp.position.y) {
                if (powerUp.type === "speed") {
                    speedMultiplierRef.current = 0.7;
                    setTimeout(() => { speedMultiplierRef.current = 1; }, 5000);
                } else if (powerUp.type === "slow") {
                    speedMultiplierRef.current = 1.5;
                    setTimeout(() => { speedMultiplierRef.current = 1; }, 5000);
                } else if (powerUp.type === "shield") {
                    setHasShield(true);
                    setTimeout(() => setHasShield(false), 10000);
                } else if (powerUp.type === "double") {
                    setDoublePoints(true);
                    setTimeout(() => setDoublePoints(false), 10000);
                }
                setPowerUp(null);
            }

            // Remove expired power-up
            if (powerUp && Date.now() > powerUp.expires) {
                setPowerUp(null);
            }

            return newSnake;
        });
    }, [food, gameOver, isPaused, checkCollision, generateFood, generatePowerUp, powerUp, obstacles, hasShield, doublePoints, highScore, gridSize]);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        const baseSpeed = SPEEDS[speed];
        const actualSpeed = baseSpeed * speedMultiplierRef.current;
        const interval = setInterval(moveSnake, actualSpeed);
        return () => clearInterval(interval);
    }, [moveSnake, speed]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case "ArrowUp":
                    if (directionRef.current !== "DOWN") setDirection("UP");
                    break;
                case "ArrowDown":
                    if (directionRef.current !== "UP") setDirection("DOWN");
                    break;
                case "ArrowLeft":
                    if (directionRef.current !== "RIGHT") setDirection("LEFT");
                    break;
                case "ArrowRight":
                    if (directionRef.current !== "LEFT") setDirection("RIGHT");
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

    useEffect(() => {
        const saved = localStorage.getItem("snake-highscore");
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const resetGame = () => {
        const startPos = { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) };
        setSnake([startPos]);
        setFood(generateFood());
        setDirection("RIGHT");
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
        setPowerUp(null);
        setHasShield(false);
        setDoublePoints(false);
        speedMultiplierRef.current = 1;
        if (obstacleMode) generateObstacles();
        else setObstacles([]);
    };

    const currentTheme = THEMES[theme];

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
                            Classic snake with power-ups, themes, and obstacles. Customize your experience!
                        </p>
                    </div>

                    {/* Customization */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg border border-white/10 bg-white/5">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Speed</label>
                            <select
                                value={speed}
                                onChange={(e) => setSpeed(e.target.value as Speed)}
                                className="w-full px-2 py-1 rounded bg-black/20 border border-white/10 text-sm"
                            >
                                {Object.keys(SPEEDS).map((s) => (
                                    <option key={s} value={s}>{s}</option>
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
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Grid</label>
                            <select
                                value={gridSize}
                                onChange={(e) => setGridSize(parseInt(e.target.value))}
                                className="w-full px-2 py-1 rounded bg-black/20 border border-white/10 text-sm"
                            >
                                <option value={15}>15x15</option>
                                <option value={20}>20x20</option>
                                <option value={25}>25x25</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    checked={obstacleMode}
                                    onChange={(e) => {
                                        setObstacleMode(e.target.checked);
                                        if (e.target.checked) generateObstacles();
                                        else setObstacles([]);
                                    }}
                                    className="rounded"
                                />
                                Obstacles
                            </label>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex gap-6">
                            <div>
                                <span className="text-muted-foreground">Score: </span>
                                <span className="font-medium text-foreground">{score}</span>
                            </div>
                            {highScore > 0 && (
                                <div className="flex items-center gap-1">
                                    <Trophy className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm text-muted-foreground">Best: {highScore}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {hasShield && (
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/20 border border-blue-500/50">
                                    <Shield className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs text-blue-400">Shield</span>
                                </div>
                            )}
                            {doublePoints && (
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/50">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    <span className="text-xs text-yellow-400">2x Points</span>
                                </div>
                            )}
                            {isPaused && !gameOver && (
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Paused</span>
                                </div>
                            )}
                            {gameOver && (
                                <div className="text-red-400">Game Over!</div>
                            )}
                        </div>
                    </div>

                    <div className={`relative border-2 border-white/20 rounded-lg ${currentTheme.bg} p-4`}>
                        <div
                            className="relative mx-auto"
                            style={{
                                width: gridSize * cellSize,
                                height: gridSize * cellSize,
                            }}
                        >
                            {/* Obstacles */}
                            {obstacles.map((obs, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-gray-600 rounded-sm"
                                    style={{
                                        left: obs.x * cellSize,
                                        top: obs.y * cellSize,
                                        width: cellSize,
                                        height: cellSize,
                                    }}
                                />
                            ))}

                            {/* Food */}
                            <div
                                className={`absolute ${currentTheme.food} rounded-full`}
                                style={{
                                    left: food.x * cellSize,
                                    top: food.y * cellSize,
                                    width: cellSize,
                                    height: cellSize,
                                }}
                            />

                            {/* Power-up */}
                            {powerUp && (
                                <div
                                    className={`absolute rounded-full border-2 ${
                                        powerUp.type === "speed"
                                            ? "bg-blue-500 border-blue-400"
                                            : powerUp.type === "slow"
                                            ? "bg-purple-500 border-purple-400"
                                            : powerUp.type === "shield"
                                            ? "bg-cyan-500 border-cyan-400"
                                            : "bg-yellow-500 border-yellow-400"
                                    }`}
                                    style={{
                                        left: powerUp.position.x * cellSize,
                                        top: powerUp.position.y * cellSize,
                                        width: cellSize,
                                        height: cellSize,
                                    }}
                                />
                            )}

                            {/* Snake */}
                            {snake.map((segment, index) => (
                                <div
                                    key={index}
                                    className={`absolute ${
                                        index === 0 ? currentTheme.head : currentTheme.snake
                                    } ${hasShield && index === 0 ? "ring-2 ring-blue-400" : ""} rounded-sm`}
                                    style={{
                                        left: segment.x * cellSize,
                                        top: segment.y * cellSize,
                                        width: cellSize,
                                        height: cellSize,
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
                        <p>• Eat red food to grow and score points</p>
                        <p>• Collect power-ups: ⚡ Speed, 🛡️ Shield, 💰 Double Points, 🐌 Slow</p>
                        <p>• Walls wrap around (no death on edges!)</p>
                        <p>• Press spacebar to pause</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
