"use client";

import { useEffect, useRef } from "react";

export function Spectrogram() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);
        let animationFrameId: number;

        const columns = 50;
        const columnWidth = width / columns;
        const data = new Array(columns).fill(0).map(() => Math.random() * height);

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Fade effect
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < columns; i++) {
                // Update data
                data[i] = Math.max(0, data[i] + (Math.random() - 0.5) * 20);
                if (data[i] > height) data[i] = height;

                // Draw bar
                const hue = (i / columns) * 60 + 180; // Blue to Cyan/Purple
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

                const barHeight = data[i];
                const x = i * columnWidth;
                const y = height - barHeight;

                ctx.fillRect(x, y, columnWidth - 2, barHeight);

                // Reflection
                ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.2)`;
                ctx.fillRect(x, height, columnWidth - 2, barHeight * 0.5);
            }

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
        <div className="relative w-full h-48 rounded-lg border border-white/10 bg-black/50 overflow-hidden">
            <div className="absolute top-2 left-2 z-10 text-[10px] font-mono text-muted-foreground">
                AUDIO SPECTRUM ANALYZER [20Hz - 20kHz]
            </div>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
