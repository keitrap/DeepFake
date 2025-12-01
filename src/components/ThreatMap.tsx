"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Globe, AlertOctagon } from "lucide-react";

interface Threat {
    id: number;
    x: number;
    y: number;
    country: string;
    type: string;
}

export function ThreatMap() {
    const [threats, setThreats] = useState<Threat[]>([]);

    // Simulate incoming threats
    useEffect(() => {
        const interval = setInterval(() => {
            const newThreat = {
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                country: "Unknown Origin",
                type: Math.random() > 0.5 ? "Voice Clone" : "Face Swap",
            };
            setThreats((prev) => [...prev.slice(-10), newThreat]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-xl border border-white/10 bg-card/50 p-6 h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" /> Global Threat Intelligence
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    LIVE FEED
                </div>
            </div>

            {/* Map Visualization (Abstract Grid) */}
            <div className="relative flex-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background rounded-lg border border-white/5 overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* World Map Silhouette (Simplified SVG) */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M10,15 Q20,5 30,15 T50,15 T70,15 T90,15 V35 Q80,45 70,35 T50,35 T30,35 T10,35 Z" fill="currentColor" className="text-primary" />
                </svg>

                {/* Threat Pings */}
                {threats.map((threat) => (
                    <motion.div
                        key={threat.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: [1, 2, 3], opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute w-4 h-4 rounded-full border border-red-500 bg-red-500/30"
                        style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-red-400 font-mono bg-black/50 px-1 rounded">
                            {threat.type} DETECTED
                        </div>
                    </motion.div>
                ))}

                {/* Static Dots for "Nodes" */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>
        </div>
    );
}
