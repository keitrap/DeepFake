"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileSearch,
    History,
    Settings,
    ShieldCheck,
    LogOut,
    Database,
    Cpu,
    Video
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Analysis", href: "/dashboard/analyze", icon: FileSearch },
    { name: "Video Lab", href: "/dashboard/video-analysis", icon: Video },
    { name: "Case History", href: "/dashboard/history", icon: History },
    { name: "Model Registry", href: "/dashboard/models", icon: Database },
    { name: "System Status", href: "/dashboard/system", icon: Cpu },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-background/95 backdrop-blur-xl">
            {/* Logo Area */}
            <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                    Iplus<span className="text-primary">Console</span>
                </span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-3">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-[0_0_10px_rgba(14,165,233,0.1)]"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* User / Footer */}
            <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-cyan-400" />
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-white">Dr. Admin</p>
                        <p className="truncate text-xs text-muted-foreground">Forensic Lead</p>
                    </div>
                    <button className="text-muted-foreground hover:text-white">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
