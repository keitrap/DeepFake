"use client";

import { useState } from "react";
import { UploadZone } from "@/components/UploadZone";
import { AnalysisResult } from "@/components/AnalysisResult";
import { ThreatMap } from "@/components/ThreatMap";
import { NeuralCore } from "@/components/NeuralCore";
import { SystemTerminal } from "@/components/SystemTerminal";

export default function DashboardPage() {
    const [analyzedFile, setAnalyzedFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const handleAnalysisComplete = (file: File, result: any) => {
        setAnalyzedFile(file);
        setAnalysisResult(result);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        {analyzedFile ? "Forensic Report" : "Command Center"}
                    </h1>
                    <p className="text-muted-foreground">
                        {analyzedFile
                            ? "Detailed multi-modal analysis results."
                            : "System operational. Ready for analysis."}
                    </p>
                </div>
                {!analyzedFile && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-mono animate-pulse">
                        SYSTEM SECURE
                    </div>
                )}
            </div>

            <div className="mt-6">
                {analyzedFile ? (
                    <AnalysisResult
                        file={analyzedFile}
                        result={analysisResult}
                        onReset={() => {
                            setAnalyzedFile(null);
                            setAnalysisResult(null);
                        }}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column: Upload & Neural Core */}
                        <div className="lg:col-span-8 space-y-6">
                            <UploadZone onAnalysisComplete={handleAnalysisComplete} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <NeuralCore />
                                <div className="rounded-xl border border-white/10 bg-card/50 overflow-hidden flex flex-col">
                                    <div className="p-4 border-b border-white/10 bg-white/5">
                                        <h2 className="text-sm font-semibold text-white">Recent Investigations</h2>
                                    </div>
                                    <div className="flex-1 p-6 text-center text-muted-foreground text-sm flex items-center justify-center">
                                        No recent cases.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Threat Map & Status */}
                        <div className="lg:col-span-4 space-y-6">
                            <ThreatMap />

                            <div className="rounded-xl border border-white/10 bg-card/50 p-5">
                                <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider text-muted-foreground">System Metrics</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Engine Status</span>
                                        <span className="text-green-400 font-mono">ONLINE</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full w-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    </div>

                                    <div className="flex justify-between text-sm mt-4">
                                        <span className="text-muted-foreground">GPU Load</span>
                                        <span className="text-primary font-mono">34%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[34%]" />
                                    </div>

                                    <div className="flex justify-between text-sm mt-4">
                                        <span className="text-muted-foreground">Memory</span>
                                        <span className="text-purple-400 font-mono">12.4GB</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                        <div className="bg-purple-400 h-full w-[60%]" />
                                    </div>
                                </div>
                            </div>

                            <SystemTerminal />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
