"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Trophy, BookOpen, Sword } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface ElasticGameItemProps {
  id: string;
  gameKey: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  trophies: number;
  description: string;
  hasWalkthrough: boolean;
  hasPlanner: boolean;
}

const DEFAULT_SOULSLIKE_GAMES: ElasticGameItemProps[] = [
  {
    id: "01",
    gameKey: "eldenring",
    title: "Elden Ring",
    category: "Action RPG · GOTY",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Elden Ring Lands Between",
    trophies: 42,
    description: "Legendary Armaments, Talismans, Spells, Ashen Remains & Endings.",
    hasWalkthrough: true,
    hasPlanner: true,
  },
  {
    id: "02",
    gameKey: "ds3",
    title: "Dark Souls III",
    category: "The Fire Fades",
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    alt: "Dark Souls 3 Lothric",
    trophies: 43,
    description: "All Rings (+1/+2/+3), covenants, spell masteries & Usurpation of Fire.",
    hasWalkthrough: true,
    hasPlanner: true,
  },
  {
    id: "03",
    gameKey: "bloodborne",
    title: "Bloodborne",
    category: "Gothic Horror",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    alt: "Bloodborne Yharnam",
    trophies: 34,
    description: "Hunter's Essence trick weapons, hunter tools, chalices & 3 cords.",
    hasWalkthrough: true,
    hasPlanner: true,
  },
  {
    id: "04",
    gameKey: "sekiro",
    title: "Sekiro",
    category: "Shinobi Action",
    src: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80",
    alt: "Sekiro Ashina",
    trophies: 34,
    description: "Prosthetic tools, skills, prayer beads, gourd seeds & 4 endings.",
    hasWalkthrough: true,
    hasPlanner: false,
  },
  {
    id: "05",
    gameKey: "ds1",
    title: "Dark Souls 1",
    category: "Lordran Classic",
    src: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=1200&q=80",
    alt: "Dark Souls Remastered",
    trophies: 41,
    description: "Knight's Honor rare weapons, all Pyromancies, Miracles & covenants.",
    hasWalkthrough: true,
    hasPlanner: true,
  },
];

interface ElasticGalleryProps {
  items?: ElasticGameItemProps[];
  onSelectGame?: (gameKey: string, mode: "platinum" | "walkthrough" | "planner") => void;
}

export function ElasticGallery({
  items = DEFAULT_SOULSLIKE_GAMES,
  onSelectGame,
}: ElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <div className="w-full py-8">
      {/* Container: Fixed height to ensure smooth flex transitions */}
      <div className="mx-auto flex h-[500px] w-full max-w-7xl flex-col gap-3 px-2 md:h-[580px] md:flex-row md:gap-4">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-2xl border bg-neutral-950",
                "transition-[flex,filter,border-color] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                isActive
                  ? "flex-[4] border-amber-500/50 shadow-2xl shadow-amber-500/10 brightness-100"
                  : "flex-[1] border-neutral-800 brightness-50 hover:border-neutral-700 hover:brightness-75"
              )}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-1000",
                    isActive ? "scale-100" : "scale-110"
                  )}
                />
                {/* Gradient Overlay for Text Readability */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-75"
                  )}
                />
              </div>

              {/* --- Content Container --- */}
              <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-5 md:p-8">
                {/* Active Content: Title, Badges & Action Buttons */}
                <div
                  className={cn(
                    "flex flex-col gap-2 transition-all duration-500",
                    isActive
                      ? "translate-y-0 opacity-100 delay-150"
                      : "translate-y-12 opacity-0 pointer-events-none"
                  )}
                >
                  {/* Category Tag & Trophy Count */}
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-amber-400/40 bg-amber-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                      {item.category}
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                      🏆 {item.trophies} Trophies
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-black uppercase tracking-wider text-white md:text-4xl">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-lg text-xs text-neutral-300 line-clamp-2 md:text-sm">
                    {item.description}
                  </p>

                  {/* Action Launchers */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectGame?.(item.gameKey, "platinum");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-amber-400"
                    >
                      <Trophy className="h-3.5 w-3.5" /> Platinum Tracker
                    </button>

                    {item.hasWalkthrough && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectGame?.(item.gameKey, "walkthrough");
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
                      >
                        <BookOpen className="h-3.5 w-3.5" /> Walkthrough
                      </button>
                    )}

                    {item.hasPlanner && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectGame?.(item.gameKey, "planner");
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
                      >
                        <Sword className="h-3.5 w-3.5" /> Build Studio
                      </button>
                    )}
                  </div>
                </div>

                {/* Inactive Content: Vertical Text (Desktop) / Horizontal Badge (Mobile) */}
                <div
                  className={cn(
                    "absolute transition-all duration-500",
                    "bottom-4 left-1/2 -translate-x-1/2 md:bottom-8",
                    isActive ? "scale-50 opacity-0" : "scale-100 opacity-100 delay-300"
                  )}
                >
                  {/* Desktop: Vertical Text */}
                  <span className="hidden whitespace-nowrap font-serif text-lg font-bold uppercase tracking-widest text-amber-200/80 [writing-mode:vertical-rl] md:block">
                    {item.title}
                  </span>

                  {/* Mobile: Horizontal Label */}
                  <span className="block text-xs font-bold text-amber-300 md:hidden">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
