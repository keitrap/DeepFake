"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileVideo, FileImage, FileAudio, X, Scan, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
    onAnalysisComplete: (file: File) => void;
}

export function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startAnalysis = () => {
        if (!file) return;
        setIsAnalyzing(true);
        // Simulate analysis for now
        setTimeout(() => {
            setIsAnalyzing(false);
            onAnalysisComplete(file);
        }, 3000);
    };

    const clearFile = () => {
        setFile(null);
        setIsAnalyzing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                {!file ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-full h-96 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group",
                            isDragging
                                ? "border-primary bg-primary/5 scale-[1.01]"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileSelect}
                            accept="image/*,video/*,audio/*"
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />

                        <div className="relative z-10 flex flex-col items-center gap-4 text-center p-8">
                            <div className="p-4 rounded-full bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
                                <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Drop Evidence Here
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                    Upload Images, Videos, or Audio files for forensic deepfake analysis.
                                </p>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground">
                                    <FileImage className="h-3 w-3" /> JPG, PNG
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground">
                                    <FileVideo className="h-3 w-3" /> MP4, MOV
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground">
                                    <FileAudio className="h-3 w-3" /> MP3, WAV
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full rounded-3xl border border-white/10 bg-card p-6"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    {file.type.startsWith('image') ? <FileImage className="h-8 w-8 text-blue-400" /> :
                                        file.type.startsWith('video') ? <FileVideo className="h-8 w-8 text-purple-400" /> :
                                            <FileAudio className="h-8 w-8 text-emerald-400" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">{file.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                                disabled={isAnalyzing}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {isAnalyzing ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-primary animate-pulse flex items-center gap-2">
                                        <Scan className="h-4 w-4" /> Analyzing Artifacts...
                                    </span>
                                    <span className="text-muted-foreground font-mono">78%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "78%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        className="h-full bg-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-24 rounded-lg bg-white/5 animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8">
                                <button
                                    onClick={startAnalysis}
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                                >
                                    <Scan className="h-4 w-4" />
                                    <span>Run Forensic Analysis</span>
                                    <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                                </button>
                                <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
                                    <AlertCircle className="h-3 w-3" />
                                    This will consume 1 credit from your balance
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
