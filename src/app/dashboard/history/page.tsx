"use client";

import { CaseGraph } from "@/components/CaseGraph";
import { FileText, Clock, Search } from "lucide-react";

export default function HistoryPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Case History</h1>
                <p className="text-muted-foreground">
                    Review past investigations and analyze connection graphs.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Case List */}
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search cases..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                        />
                    </div>

                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-white group-hover:text-primary transition-colors">Case #2024-00{i}</h3>
                                    <span className="text-xs text-muted-foreground font-mono">Oct {10 + i}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <FileText className="h-3 w-3" />
                                    <span>3 Files Analyzed</span>
                                    <span className="mx-1">•</span>
                                    <Clock className="h-3 w-3" />
                                    <span>12m ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Graph Visualization */}
                <div className="lg:col-span-2 space-y-4">
                    <CaseGraph />

                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-white/10 bg-card/50">
                            <div className="text-xs text-muted-foreground mb-1">Total Evidence</div>
                            <div className="text-2xl font-bold text-white">1,248</div>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10 bg-card/50">
                            <div className="text-xs text-muted-foreground mb-1">Active Suspects</div>
                            <div className="text-2xl font-bold text-red-500">12</div>
                        </div>
                        <div className="p-4 rounded-lg border border-white/10 bg-card/50">
                            <div className="text-xs text-muted-foreground mb-1">Case Solved Rate</div>
                            <div className="text-2xl font-bold text-green-500">94%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
