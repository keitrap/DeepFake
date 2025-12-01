"use client";

import { motion } from "framer-motion";
import { ScanFace, Mic, Video, Fingerprint, Eye, Activity } from "lucide-react";

const features = [
    {
        title: "Deepfake Image Detection",
        description: "Multi-modal analysis using custom CNNs and Transformers to detect GAN artifacts, frequency anomalies, and diffusion patterns.",
        icon: ScanFace,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
    },
    {
        title: "Lip-Sync Forensics",
        description: "Advanced phoneme-viseme mismatch detection. We analyze the temporal consistency between audio waves and mouth movements.",
        icon: Video,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
    },
    {
        title: "Voice Clone Analysis",
        description: "Detect synthetic audio signatures, robotic breathing patterns, and high-frequency spectral cuts in AI-generated voices.",
        icon: Mic,
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        border: "border-indigo-400/20",
    },
    {
        title: "Biological Signal Extraction",
        description: "rPPG technology to extract heartbeat signals from facial video. Real humans have a pulse; deepfakes do not.",
        icon: Activity,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
    },
    {
        title: "Iris Reflection Analysis",
        description: "Geometric consistency checks on eye reflections. We verify if the environment reflected in the eyes matches the scene.",
        icon: Eye,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
    },
    {
        title: "Metadata Forensics",
        description: "Deep dive into EXIF, Hex, and compression history to trace the origin of the media file and detect tampering.",
        icon: Fingerprint,
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        border: "border-rose-400/20",
    },
];

export function Features() {
    return (
        <section id="detection" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4"
                    >
                        Multi-Layered <span className="text-primary">Forensic Analysis</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-lg">
                        Our ensemble models analyze media across multiple dimensions to provide
                        forensic-grade accuracy that goes beyond simple binary classification.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-8 rounded-2xl border ${feature.border} bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors`}
                        >
                            <div className={`inline-flex p-3 rounded-lg ${feature.bg} ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-6 w-6" />
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/50 transition-all pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
