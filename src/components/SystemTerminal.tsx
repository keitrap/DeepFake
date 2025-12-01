"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Minus, Square, X } from "lucide-react";

const LOG_MESSAGES = [
    "Initializing neural weights...",
    "Loading CUDA kernels...",
    "Verifying integrity of model 'DeepDetect-V4'...",
    "Connecting to secure node [192.168.X.X]...",
    "Fetching global threat signatures...",
    "Allocating memory buffers...",
    "System scan complete. No local threats found.",
    "Listening for incoming media streams...",
    "Optimization routine started...",
    "Garbage collection active...",
    "Updating heuristic patterns...",
    "Syncing with central database...",
];

export function SystemTerminal() {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial logs
        setLogs(["System boot sequence initiated...", "Mounting file system..."]);

        const interval = setInterval(() => {
            const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
            const newLog = `[${timestamp}] ${randomMsg}`;

            setLogs(prev => {
                const newLogs = [...prev, newLog];
                if (newLogs.length > 20) return newLogs.slice(-20);
                return newLogs;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur-md overflow-hidden flex flex-col h-64 font-mono text-xs shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Terminal className="h-3 w-3" />
                    <span>IPLUS_KERNEL_LOG</span>
                </div>
                <div className="flex items-center gap-2">
                    <Minus className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-white" />
                    <Square className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-white" />
                    <X className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-red-500" />
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-1 custom-scrollbar"
            >
                {logs.map((log, i) => (
                    <div key={i} className="text-green-500/80">
                        <span className="text-blue-500/80 mr-2">{">"}</span>
                        {log}
                    </div>
                ))}
                <div className="animate-pulse text-green-500">_</div>
            </div>
        </div>
    );
}
