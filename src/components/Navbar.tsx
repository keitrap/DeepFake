"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    if (pathname === "/login") return null;

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl tracking-tight text-white">
                            Iplus<span className="text-primary">Deepfake</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="text-sm font-medium text-white hover:text-primary transition-colors">
                                Home
                            </Link>
                            <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                                Technology
                            </Link>
                            <Link href="/#solutions" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                                Solutions
                            </Link>
                            <Link href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                                Enterprise
                            </Link>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/login">
                            <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg border border-primary/20 transition-all text-sm font-medium">
                                <Lock className="h-4 w-4" />
                                Access Console
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                                Home
                            </Link>
                            <Link href="/#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
                                Technology
                            </Link>
                            <Link href="/login" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10">
                                Access Console
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
