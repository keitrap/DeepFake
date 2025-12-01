"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    AlertTriangle,
    Fingerprint,
    Activity,
    FileText,
    Share2,
    Download,
    Eye,
    Layers,
    Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Spectrogram } from "@/components/Spectrogram";

interface AnalysisResultProps {
    file: File;
    onReset: () => void;
}

export function AnalysisResult({ file, onReset }: AnalysisResultProps) {
    // Mock result - in a real app this would come from the backend
    const isDeepfake = true;
    const confidence = 99.8;

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between relative z-50">
                <button
                    onClick={onReset}
                    className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                    ← Start New Analysis
                </button>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
                        <Share2 className="h-4 w-4" /> Share Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Download className="h-4 w-4" /> Export PDF
                    </button>
                </div>
            </div>

            {/* Main Verdict Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "relative overflow-hidden rounded-2xl border p-8",
                    isDeepfake
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-green-500/30 bg-green-500/5"
                )}
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className={cn(
                            "flex h-20 w-20 items-center justify-center rounded-full border-4",
                            isDeepfake ? "border-red-500 bg-red-500/20" : "border-green-500 bg-green-500/20"
                        )}>
                            {isDeepfake ? (
                                <AlertTriangle className="h-10 w-10 text-red-500" />
                            ) : (
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-1">
                                {isDeepfake ? "DEEPFAKE DETECTED" : "AUTHENTIC MEDIA"}
                            </h2>
                            <p className="text-muted-foreground">
                                Analysis completed on <span className="text-white font-mono">{file.name}</span>
                            </p>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <div className="text-sm text-muted-foreground mb-1">Confidence Score</div>
                        <div className={cn(
                            "text-5xl font-black tracking-tighter",
                            isDeepfake ? "text-red-500" : "text-green-500"
                        )}>
                            {confidence}%
                        </div>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_10s_infinite]" />
                </div>
            </motion.div>

            {/* Detailed Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Visual Artifacts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-white/10 bg-card p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                            <Eye className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white">Visual Artifacts</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">GAN Noise Pattern</span>
                            <span className="text-red-400 font-mono">DETECTED</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[92%]" />
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Face Warping</span>
                            <span className="text-yellow-400 font-mono">POSSIBLE</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[45%]" />
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Inconsistent Lighting</span>
                            <span className="text-green-400 font-mono">CLEAN</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[12%]" />
                        </div>
                    </div>
                </motion.div>

                {/* Biological Signals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-white/10 bg-card p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                            <Activity className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white">Biological Signals</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Heart Rate (rPPG)</span>
                                <span className="text-red-400 font-mono">NO PULSE DETECTED</span>
                            </div>
                            <div className="h-24 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center relative overflow-hidden">
                                {/* Simulated flatline graph */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-[1px] bg-red-500/50" />
                                </div>
                                <span className="text-xs text-red-500/50 font-mono">SIGNAL LOST</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Voice Pattern Analysis</span>
                                <span className="text-primary font-mono">SYNTHETIC SIGNATURE</span>
                            </div>
                            <Spectrogram />
                        </div>
                    </div>
                </motion.div>

                {/* Metadata Forensics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-white/10 bg-card p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                            <Fingerprint className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white">Metadata</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-muted-foreground">Software</span>
                            <span className="text-white font-mono">Adobe Photoshop 24.0</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-muted-foreground">Original Device</span>
                            <span className="text-white font-mono">Unknown</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-muted-foreground">Creation Date</span>
                            <span className="text-white font-mono">2024-03-15</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-muted-foreground">Compression</span>
                            <span className="text-yellow-400 font-mono">High (Re-encoded)</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* AI Reasoning */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-white/10 bg-card p-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Cpu className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">AI Model Reasoning</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    The ensemble model detected significant anomalies in the high-frequency spectrum consistent with <span className="text-white font-medium">Stable Diffusion v2.1</span> generation artifacts.
                    Furthermore, the rPPG analysis failed to extract a consistent photoplethysmographic signal from the subject's facial skin, indicating a lack of biological blood flow.
                    The iris reflection geometry is mathematically inconsistent with the scene's light sources.
                </p>
            </motion.div>
        </div>
    );
}
