"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, AlertTriangle, Scan, Activity, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoAnalyzer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(100); // Mock duration
    const [anomalies, setAnomalies] = useState<{ time: number; score: number }[]>([]);

    // Simulate video progress
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration]);

    // Generate mock anomalies
    useEffect(() => {
        const mockAnomalies = Array.from({ length: 20 }, (_, i) => ({
            time: i * 5 + Math.random() * 2,
            score: Math.random() * 100,
        }));
        setAnomalies(mockAnomalies);
    }, []);

    const currentScore = anomalies.find(a => Math.abs(a.time - currentTime) < 2)?.score || 10;
    const isHighRisk = currentScore > 80;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Main Video Area */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="relative flex-1 rounded-2xl border border-white/10 bg-black overflow-hidden group">
                    {/* Video Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-grid-white/[0.02]">
                        <div className="text-center space-y-4">
                            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto animate-pulse">
                                <Scan className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground font-mono text-sm">LOADING VIDEO STREAM...</p>
                        </div>
                    </div>

                    {/* Face Tracking Overlay */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/50 rounded-lg"
                        animate={{
                            scale: isHighRisk ? [1, 1.05, 1] : 1,
                            borderColor: isHighRisk ? "rgba(239, 68, 68, 0.8)" : "rgba(14, 165, 233, 0.5)"
                        }}
                    >
                        {/* Tracking Corners */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />

                        {/* Data Tag */}
                        <div className="absolute -top-8 left-0 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-primary border border-primary/20">
                            ID: SUBJ_01 | CONF: {(currentScore).toFixed(1)}%
                        </div>
                    </motion.div>

                    {/* Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                            </button>

                            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                                <div
                                    className="h-full bg-primary transition-all duration-100"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>

                            <div className="font-mono text-sm text-white">
                                {Math.floor(currentTime)}s / {duration}s
                            </div>

                            <button className="p-2 text-white/70 hover:text-white">
                                <Maximize2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Timeline Analysis */}
                <div className="h-32 rounded-xl border border-white/10 bg-card/50 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end px-4 pb-4 gap-[2px] opacity-50">
                        {Array.from({ length: 50 }).map((_, i) => {
                            const height = 20 + Math.random() * 60;
                            const isAnomaly = Math.random() > 0.8;
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex-1 rounded-t-sm transition-all duration-500",
                                        isAnomaly ? "bg-red-500" : "bg-primary/30"
                                    )}
                                    style={{ height: `${height}%` }}
                                />
                            );
                        })}
                    </div>
                    <div className="relative z-10 text-xs font-mono text-muted-foreground">FRAME DENSITY MAP</div>
                </div>
            </div>

            {/* Side Panel - Real-time Metrics */}
            <div className="flex flex-col gap-4">
                {/* Live Score Card */}
                <div className={cn(
                    "rounded-xl border p-6 transition-colors duration-300",
                    isHighRisk
                        ? "border-red-500/50 bg-red-500/10"
                        : "border-primary/20 bg-primary/5"
                )}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Activity className="h-5 w-5" /> Live Probability
                        </h3>
                        {isHighRisk && (
                            <span className="animate-pulse px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold">
                                ALERT
                            </span>
                        )}
                    </div>
                    <div className="text-5xl font-black tracking-tighter text-white mb-2">
                        {currentScore.toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Probability of manipulation in current frame sequence.
                    </p>
                </div>

                {/* Artifacts List */}
                <div className="flex-1 rounded-xl border border-white/10 bg-card/50 p-6 overflow-hidden flex flex-col">
                    <h3 className="font-semibold text-white mb-4">Detected Artifacts</h3>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {anomalies.filter(a => a.time <= currentTime).reverse().map((anomaly, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3"
                            >
                                <AlertTriangle className={cn(
                                    "h-4 w-4 mt-0.5",
                                    anomaly.score > 80 ? "text-red-500" : "text-yellow-500"
                                )} />
                                <div>
                                    <div className="text-sm font-medium text-white">
                                        {anomaly.score > 80 ? "Deepfake Signature" : "Potential Artifact"}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono">
                                        Frame: {Math.floor(anomaly.time * 30)} | Conf: {anomaly.score.toFixed(1)}%
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {currentTime === 0 && (
                            <div className="text-center text-sm text-muted-foreground py-8">
                                Start playback to begin real-time analysis...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
