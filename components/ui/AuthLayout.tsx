"use client";
import React from "react";

const FlyingBirds = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Bird 1 */}
        <div className="absolute top-[10%] left-0 animate-[fly-1_45s_linear_infinite]">
            <svg className="w-10 h-10 text-white fill-current opacity-70" viewBox="0 0 24 24">
                <path d="M12 11c-1.66-2.58-4.46-4-7.5-4C3.89 7 3.32 7.07 2 7.21V9c2.4 0 4.67 1.09 6.2 3H12c1.53-1.91 3.8-3 6.2-3v-1.79c-1.32-.14-1.89-.21-2.5-.21-3.04 0-5.84 1.42-7.5 4z" />
            </svg>
        </div>

        {/* Bird 2 */}
        <div className="absolute top-[40%] left-0 animate-[fly-2_30s_linear_infinite] [animation-delay:15s]">
            <svg className="w-6 h-6 text-white fill-current opacity-50" viewBox="0 0 24 24">
                <path d="M12 11c-1.66-2.58-4.46-4-7.5-4C3.89 7 3.32 7.07 2 7.21V9c2.4 0 4.67 1.09 6.2 3H12c1.53-1.91 3.8-3 6.2-3v-1.79c-1.32-.14-1.89-.21-2.5-.21-3.04 0-5.84 1.42-7.5 4z" />
            </svg>
        </div>

        {/* Bird 3 */}
        <div className="absolute top-[20%] left-0 animate-[fly-3_38s_linear_infinite] [animation-delay:8s]">
            <svg className="w-8 h-8 text-white fill-current opacity-40" viewBox="0 0 24 24">
                <path d="M12 11c-1.66-2.58-4.46-4-7.5-4C3.89 7 3.32 7.07 2 7.21V9c2.4 0 4.67 1.09 6.2 3H12c1.53-1.91 3.8-3 6.2-3v-1.79c-1.32-.14-1.89-.21-2.5-.21-3.04 0-5.84 1.42-7.5 4z" />
            </svg>
        </div>
    </div>
);

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="h-[100dvh] w-screen flex flex-col overflow-hidden font-sans bg-cover bg-center relative"
            style={{ backgroundImage: "url('/thumbnail-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none z-0"></div>

            <FlyingBirds />

            {/* Top Bar Glass */}
            <header className="w-full h-14 sm:h-16 flex items-center justify-between px-6 bg-white/5 backdrop-blur-xl border-b border-white/10 relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                <div className="text-white font-bold text-lg sm:text-xl tracking-[0.2em] drop-shadow-md">
                    <a href="https://www.mrmahid.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity uppercase">
                        AUTHLAB By Mr Mahid
                    </a>
                </div>
                <div className="text-white/70 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                    Premium UI
                </div>
            </header>

            {/* Main Content Centered */}
            <main className="flex-1 w-full flex items-center justify-center relative z-20 px-4">
                <div className="w-full max-w-[22rem] sm:max-w-[24rem]">
                    <div className="w-full transition-all duration-500 ease-out transform hover:scale-[1.01]">
                        <div className="bg-white/10 backdrop-blur-2xl p-6 sm:p-8 border border-white/20 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">

                            {/* Inner glowing accent */}
                            <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/15 transition-colors duration-700"></div>
                            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>

                            <div className="relative z-10 w-full flex flex-col">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Bar Glass */}
            <footer className="w-full h-10 sm:h-12 flex items-center justify-center px-4 bg-white/5 backdrop-blur-xl border-t border-white/10 relative z-20">
                <p className="text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-center">
                    © 2026 AUTHLAB. DEVELOPED BY <a href="https://www.mrmahid.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 font-bold transition-colors underline decoration-white/30 decoration-[1.5px] hover:decoration-emerald-400">MR MAHID</a>.
                </p>
            </footer>
        </div>
    );
}
