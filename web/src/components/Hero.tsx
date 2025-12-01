"use client";

import { motion } from "framer-motion";
import { Scan, ShieldAlert, Fingerprint, Activity, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
                        >
                            <Activity className="h-4 w-4 animate-pulse" />
                            <span>Forensic Grade Detection Engine</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
                        >
                            Unmask the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-600">
                                Digital Deception
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
                        >
                            The world's most advanced multi-modal deepfake detection platform.
                            Protecting truth in the era of generative AI with pixel-perfect accuracy.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
                                Start Analysis
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-lg border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all">
                                View Demo
                            </button>
                        </motion.div>
                    </div>

                    {/* Visual Scanner Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="relative mx-auto w-full max-w-[500px] aspect-square"
                    >
                        {/* Scanner Frame */}
                        <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                            {/* Fake UI Elements */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">ANALYSIS_MODE: ACTIVE</div>
                            </div>

                            {/* Scanning Line */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-primary z-20 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
                            />

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-10" />

                            {/* Central Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <Fingerprint className="h-32 w-32 text-primary/50" />
                                    <Scan className="absolute inset-0 h-32 w-32 text-primary animate-pulse" />
                                </div>
                            </div>

                            {/* Data Readouts */}
                            <div className="absolute bottom-4 left-4 right-4 z-20 space-y-2">
                                <div className="flex justify-between text-xs font-mono text-primary/80">
                                    <span>CONFIDENCE</span>
                                    <span>99.8%</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[99.8%] bg-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                                    <span>ARTIFACTS: DETECTED</span>
                                    <span>SOURCE: UNKNOWN</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 rounded-xl bg-background/80 backdrop-blur-md border border-red-500/30 shadow-lg z-30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-red-500/20">
                                    <ShieldAlert className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Threat Level</div>
                                    <div className="text-sm font-bold text-red-500">CRITICAL</div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
