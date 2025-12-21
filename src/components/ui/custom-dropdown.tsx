"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDropdownProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    multiple?: boolean;
}

export function CustomDropdown({
    options,
    selected,
    onChange,
    placeholder = "Select...",
    multiple = true,
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        if (multiple) {
            if (selected.includes(option)) {
                onChange(selected.filter((item) => item !== option));
            } else {
                onChange([...selected, option]);
            }
        } else {
            onChange([option]);
            setIsOpen(false);
        }
    };

    const removeOption = (option: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(selected.filter((item) => item !== option));
    };

    const clearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange([]);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full px-4 py-2.5 text-left bg-black/20 border border-white/10 rounded-lg",
                    "hover:border-white/20 transition-colors flex items-center justify-between",
                    "focus:outline-none focus:ring-2 focus:ring-white/20"
                )}
            >
                <div className="flex-1 flex flex-wrap gap-2 min-h-[24px]">
                    {selected.length === 0 ? (
                        <span className="text-muted-foreground text-sm">{placeholder}</span>
                    ) : (
                        selected.map((item) => (
                            <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-foreground text-xs rounded-md border border-blue-500/30"
                            >
                                {item}
                                {multiple && (
                                    <button
                                        type="button"
                                        onClick={(e) => removeOption(item, e)}
                                        className="hover:bg-white/20 rounded p-0.5 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </span>
                        ))
                    )}
                </div>
                <div className="flex items-center gap-2 ml-2">
                    {selected.length > 0 && multiple && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform",
                            isOpen && "transform rotate-180"
                        )}
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-black/95 border border-white/10 rounded-lg shadow-lg shadow-blue-500/10 backdrop-blur-sm max-h-60 overflow-auto"
                    >
                        <div className="p-2">
                            {options.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">No options available</div>
                            ) : (
                                options.map((option) => {
                                    const isSelected = selected.includes(option);
                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => toggleOption(option)}
                                            className={cn(
                                                "w-full px-3 py-2 text-left text-sm rounded-md transition-colors",
                                                "hover:bg-blue-500/10",
                                                isSelected && "bg-blue-500/10 text-foreground"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                {multiple && (
                                                    <div
                                                        className={cn(
                                                            "w-4 h-4 border rounded flex items-center justify-center",
                                                            isSelected
                                                                ? "bg-blue-500 border-blue-500"
                                                                : "border-white/30"
                                                        )}
                                                    >
                                                        {isSelected && (
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                )}
                                                <span className={isSelected ? "text-foreground" : "text-muted-foreground"}>
                                                    {option}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

