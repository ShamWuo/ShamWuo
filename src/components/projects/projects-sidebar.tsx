"use client";

import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectsSidebarProps {
    allTags: string[];
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function ProjectsSidebar({
    allTags,
    selectedTags,
    onTagsChange,
    searchQuery,
    onSearchChange,
}: ProjectsSidebarProps) {
    return (
        <aside className="w-full md:w-64 shrink-0 space-y-6">
            <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-9 bg-black/20 border-white/10 focus:border-white/20"
                        />
                    </div>
                </div>

                {/* Tags Dropdown */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Filter by Tags</label>
                    <CustomDropdown
                        options={allTags}
                        selected={selectedTags}
                        onChange={onTagsChange}
                        placeholder="Select tags..."
                        multiple={true}
                    />
                </div>

                {/* Selected tags count */}
                {selectedTags.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                        {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} selected
                    </div>
                )}
            </div>
        </aside>
    );
}

