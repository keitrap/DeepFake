"use client";

import { useEffect, useRef } from "react";

interface Node {
    id: number;
    x: number;
    y: number;
    type: "suspect" | "evidence" | "location";
    label: string;
}

interface Link {
    source: number;
    target: number;
}

export function CaseGraph() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);
        let animationFrameId: number;

        // Mock Data
        const nodes: Node[] = [
            { id: 1, x: width / 2, y: height / 2, type: "suspect", label: "Subject A" },
            { id: 2, x: width / 2 - 100, y: height / 2 - 80, type: "evidence", label: "Audio_01.wav" },
            { id: 3, x: width / 2 + 120, y: height / 2 - 50, type: "evidence", label: "Video_Clip.mp4" },
            { id: 4, x: width / 2 - 80, y: height / 2 + 100, type: "location", label: "IP: 192.168..." },
            { id: 5, x: width / 2 + 90, y: height / 2 + 80, type: "evidence", label: "Meta_Log.txt" },
        ];

        const links: Link[] = [
            { source: 1, target: 2 },
            { source: 1, target: 3 },
            { source: 1, target: 4 },
            { source: 1, target: 5 },
            { source: 2, target: 4 },
        ];

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Links
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            links.forEach(link => {
                const source = nodes.find(n => n.id === link.source);
                const target = nodes.find(n => n.id === link.target);
                if (source && target) {
                    ctx.beginPath();
                    ctx.moveTo(source.x, source.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });

            // Draw Nodes
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);

                if (node.type === "suspect") ctx.fillStyle = "#ef4444"; // Red
                else if (node.type === "evidence") ctx.fillStyle = "#0ea5e9"; // Blue
                else ctx.fillStyle = "#22c55e"; // Green

                ctx.fill();

                // Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.fillStyle;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Label
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.font = "10px monospace";
                ctx.fillText(node.label, node.x + 10, node.y + 3);
            });

            // Animate subtle movement
            nodes.forEach(node => {
                node.x += (Math.random() - 0.5) * 0.2;
                node.y += (Math.random() - 0.5) * 0.2;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-[500px] rounded-xl border border-white/10 bg-black/40 overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-sm font-semibold text-white">CASE CONNECTION GRAPH</h3>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Suspect</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Evidence</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Location</div>
                </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
