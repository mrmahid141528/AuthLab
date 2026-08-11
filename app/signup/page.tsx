"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { InteractiveCat } from "@/components/ui/InteractiveCat";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { signupAction, ActionState } from "./actions";
import { AuthLayout } from "@/components/ui/AuthLayout";

export default function SignupPage() {
    const [state, formAction] = useActionState<ActionState, FormData>(signupAction, null);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    return (
        <AuthLayout>
            <InteractiveCat isCoveringEyes={isPasswordFocused} />
            <div className="text-center mb-6 -mt-2">
                <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md pb-1">Join Us</h1>
            </div>

            <form action={formAction} className="space-y-3.5">
                {state?.error && (
                    <div className="p-3 text-xs text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl backdrop-blur-md animate-pulse">
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
                        className="w-full px-5 py-3.5 bg-black/30 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                    />
                </div>

                <div className="space-y-1.5 flex flex-col">
                    <input suppressHydrationWarning
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full px-5 py-3.5 bg-black/30 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                    />
                </div>

                <div className="space-y-1.5 flex flex-col">
                    <input suppressHydrationWarning
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full px-5 py-3.5 bg-black/30 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                    />
                </div>

                <div className="pt-2">
                    <SubmitButton
                        pendingText="CREATING..."
                        className="w-full px-5 py-3.5 bg-white/20 text-white tracking-widest uppercase rounded-2xl text-xs font-bold hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 active:scale-[0.98] border border-white/30 backdrop-blur-md"
                    >
                        SIGN UP
                    </SubmitButton>
                </div>
            </form>

            <div className="mt-5 flex items-center justify-center text-xs sm:text-sm text-white/80 px-1 font-medium">
                <Link href="/login" className="hover:text-white hover:drop-shadow-md hover:underline decoration-white/50 transition-all duration-200">
                    Already have an account? Log in
                </Link>
            </div>

            <div className="mt-8 mb-5 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="px-3 bg-transparent text-white/70 drop-shadow-sm backdrop-blur-sm">OR CONTINUE WITH</span>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => alert("Google Auth is currently in dummy UI mode for portfolio showcase! Real integration requires API keys.")}
                    className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                </button>
            </div>
        </AuthLayout>
    );
}
