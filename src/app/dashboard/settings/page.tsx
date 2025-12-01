"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, Cpu, Lock, Eye, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        highSensitivity: true,
        autoDelete: false,
        notifications: true,
        apiAccess: true,
        faceRecognition: true,
        voiceAnalysis: true,
        metaDataScan: true,
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                <p className="text-muted-foreground">
                    Configure detection parameters and system preferences.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Detection Engine Settings */}
                <div className="rounded-xl border border-white/10 bg-card/50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Cpu className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Detection Engine</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium text-white">High Sensitivity Mode</label>
                                <p className="text-sm text-muted-foreground">
                                    Increases false positive rate but catches subtle deepfakes.
                                </p>
                            </div>
                            <button
                                onClick={() => toggle('highSensitivity')}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    settings.highSensitivity ? "bg-primary" : "bg-white/10"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    settings.highSensitivity ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium text-white">Face Recognition</label>
                                <p className="text-sm text-muted-foreground">
                                    Enable facial identity verification against known databases.
                                </p>
                            </div>
                            <button
                                onClick={() => toggle('faceRecognition')}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    settings.faceRecognition ? "bg-primary" : "bg-white/10"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    settings.faceRecognition ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium text-white">Voice Analysis</label>
                                <p className="text-sm text-muted-foreground">
                                    Analyze audio spectrum for synthetic voice signatures.
                                </p>
                            </div>
                            <button
                                onClick={() => toggle('voiceAnalysis')}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    settings.voiceAnalysis ? "bg-primary" : "bg-white/10"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    settings.voiceAnalysis ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Privacy & Security */}
                <div className="rounded-xl border border-white/10 bg-card/50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Privacy & Security</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium text-white">Auto-Delete Evidence</label>
                                <p className="text-sm text-muted-foreground">
                                    Automatically delete uploaded files after 24 hours.
                                </p>
                            </div>
                            <button
                                onClick={() => toggle('autoDelete')}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    settings.autoDelete ? "bg-emerald-500" : "bg-white/10"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    settings.autoDelete ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium text-white">API Access</label>
                                <p className="text-sm text-muted-foreground">
                                    Allow external applications to access the forensic engine.
                                </p>
                            </div>
                            <button
                                onClick={() => toggle('apiAccess')}
                                className={cn(
                                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                    settings.apiAccess ? "bg-emerald-500" : "bg-white/10"
                                )}
                            >
                                <span className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    settings.apiAccess ? "translate-x-6" : "translate-x-1"
                                )} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
