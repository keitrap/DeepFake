"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Scan, Fingerprint, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"credentials" | "biometric">("credentials");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setIsLoading(false);
            setStep("biometric");
        }, 1500);
    };

    const handleBiometric = () => {
        setIsLoading(true);
        // Simulate scan
        setTimeout(() => {
            router.push("/dashboard");
        }, 2000);
    };

    return (
        <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

            <div className="w-full max-w-md relative z-10 p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Iplus<span className="text-primary">Console</span>
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Secure Forensic Intelligence Platform
                        </p>
                    </div>

                    {step === "credentials" ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Agent ID / Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="agent@iplus.ai"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Access Code
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <Lock className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-6"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Verify Credentials <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 py-4">
                            <div className="relative w-24 h-24 mx-auto">
                                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[ping_1.5s_ease-in-out_infinite_0.5s]" />
                                <div className="relative h-full w-full rounded-full bg-primary/10 flex items-center justify-center border border-primary/50">
                                    <Fingerprint className={cn("h-10 w-10 text-primary", isLoading && "animate-pulse")} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-white">Biometric Verification</h3>
                                <p className="text-sm text-muted-foreground">
                                    Please confirm your identity to access the secure console.
                                </p>
                            </div>

                            <button
                                onClick={handleBiometric}
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Scan className="h-4 w-4 animate-spin" /> Scanning...
                                    </>
                                ) : (
                                    <>
                                        <Scan className="h-4 w-4" /> Authenticate
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-xs text-muted-foreground">
                            Restricted Access. Unauthorized attempts will be logged.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
