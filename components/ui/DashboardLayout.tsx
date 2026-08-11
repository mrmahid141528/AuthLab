"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export function DashboardLayout({ children, session }: { children: React.ReactNode, session: any }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div
            className="min-h-screen w-screen flex flex-col font-sans bg-cover bg-center bg-fixed relative overflow-hidden"
            style={{ backgroundImage: "url('/dashboard-bg.jpg')" }}
        >
            {/* Dark/Blur Overlay for the whole screen */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none z-0"></div>

            {/* Top Bar Glass */}
            <header className="w-full h-16 sm:h-20 flex items-center justify-between px-6 sm:px-10 bg-white/5 backdrop-blur-2xl border-b border-white/10 relative z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white/20 to-white/5 flex items-center justify-center border border-white/20 shadow-md">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-xl sm:text-2xl tracking-[0.15em] drop-shadow-md">AUTHLAB</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-6 text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase text-white/50">
                        <Link href="/dashboard" className="text-white hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white after:rounded-full">DASHBOARD</Link>
                        {/* We will route these to standard pages later if requested */}
                    </nav>
                    <div className="flex items-center gap-4 border-l border-white/20 pl-8">
                        <div className="flex flex-col items-end">
                            <span className="text-white text-sm font-bold drop-shadow-sm">{session?.user?.name || "User"}</span>
                            <span className="text-emerald-400 text-[9px] font-black tracking-widest uppercase">{session?.user?.role || "USER"} ACCOUNT</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-white/30 p-0.5 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                        </div>
                        <div className="ml-2">
                            {/* Since SignOutButton uses a form action internally, we render it directly */}
                            <SignOutButton />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white/80 hover:text-white focus:outline-none p-2"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 sm:top-20 left-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-40 animate-in slide-in-from-top-4 duration-300">
                    <div className="px-6 py-6 flex flex-col gap-6">
                        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                            <div className="w-12 h-12 rounded-full border border-white/30 p-0.5 bg-white/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-base font-bold">{session?.user?.name || "User"}</span>
                                <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">{session?.user?.role || "USER"}</span>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-4 text-xs font-bold tracking-[0.15em] uppercase text-white/70">
                            <Link href="/dashboard" className="text-white pl-2 border-l-2 border-white">Dashboard</Link>
                        </nav>
                        <div className="pt-2">
                            <SignOutButton />
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative z-20 h-full overflow-y-auto custom-scrollbar">
                {children}
            </main>

            {/* Bottom Bar Glass */}
            <footer className="w-full h-10 sm:h-12 flex items-center justify-center px-4 bg-white/5 backdrop-blur-xl border-t border-white/10 relative z-20 mt-auto">
                <p className="text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-center">
                    © 2026 AUTHLAB. DEVELOPED BY <a href="https://www.mrmahid.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 font-bold transition-colors underline decoration-white/30 decoration-[1.5px] hover:decoration-emerald-400">MR MAHID</a>.
                </p>
            </footer>
        </div>
    );
}
