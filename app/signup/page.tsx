"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { signupAction, ActionState } from "./actions";

export default function SignupPage() {
    const [state, formAction] = useActionState<ActionState, FormData>(signupAction, null);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans bg-cover bg-center relative"
            style={{ backgroundImage: "url('/bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 ease-out transform hover:scale-[1.01]">
                {/* The Glass Card */}
                <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-400/30 transition-colors duration-700"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-400/40 transition-colors duration-700"></div>

                    <div className="text-center mb-8 relative z-10">
                        <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-md pb-2">Join Us</h1>
                    </div>

                    <form action={formAction} className="space-y-4 relative z-10">
                        {state?.error && (
                            <div className="p-3 text-sm text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl backdrop-blur-md animate-pulse">
                                {state.error}
                            </div>
                        )}

                        <div className="space-y-1.5 flex flex-col">
                            <input suppressHydrationWarning
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Full Name"
                                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8e2954] focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                            <input suppressHydrationWarning
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8e2954] focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                            <input suppressHydrationWarning
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8e2954] focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="pt-3">
                            <SubmitButton
                                pendingText="CREATING..."
                                className="w-full px-6 py-4 bg-[#6c2844] text-white/90 tracking-widest uppercase rounded-2xl text-sm font-bold hover:bg-[#8f3659] hover:shadow-[0_0_20px_rgba(142,41,84,0.5)] focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 active:scale-[0.98] border border-white/10"
                            >
                                SIGN UP
                            </SubmitButton>
                        </div>
                    </form>

                    <div className="mt-6 flex items-center justify-center text-sm text-white/80 relative z-10 px-1 font-medium">
                        <Link href="/login" className="hover:text-white hover:drop-shadow-md hover:underline decoration-white/50 transition-all duration-200">
                            Already have an account? Log in
                        </Link>
                    </div>

                    <div className="mt-10 mb-6 relative z-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-[11px] font-bold uppercase tracking-widest">
                            <span className="px-4 bg-transparent text-white/70 drop-shadow-sm backdrop-blur-sm">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    <div className="flex justify-center relative z-10">
                        <button
                            type="button"
                            onClick={() => alert("Google Auth is currently in dummy UI mode for portfolio showcase! Real integration requires API keys.")}
                            className="p-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
