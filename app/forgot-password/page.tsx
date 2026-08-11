"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { forgotPasswordAction, ForgotPasswordState } from "./actions";

export default function ForgotPasswordPage() {
    const [state, formAction] = useActionState<ForgotPasswordState, FormData>(forgotPasswordAction, null);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans bg-cover bg-center relative"
            style={{ backgroundImage: "url('/thumbnail-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 ease-out transform hover:scale-[1.01]">
                <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-colors duration-700"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/15 transition-colors duration-700"></div>

                    <div className="text-center mb-8 relative z-10">
                        <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-md pb-2">Recover Account</h1>
                        <p className="text-white/70 mt-1 text-sm font-medium">We'll send you a reset link.</p>
                    </div>

                    <form action={formAction} className="space-y-4 relative z-10">
                        {state?.error && (
                            <div className="p-3 text-sm text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl backdrop-blur-md animate-pulse">
                                {state.error}
                            </div>
                        )}
                        {state?.success && (
                            <div className="p-4 text-sm text-green-200 bg-green-900/40 border border-green-500/30 rounded-xl backdrop-blur-md text-center font-medium">
                                Link sent! Please check your email inbox.
                            </div>
                        )}

                        <div className="space-y-1.5 flex flex-col">
                            <input suppressHydrationWarning
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Email Address"
                                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                                disabled={state?.success}
                            />
                        </div>

                        {!state?.success && (
                            <div className="pt-3">
                                <SubmitButton
                                    pendingText="SENDING..."
                                    className="w-full px-6 py-4 bg-white/20 text-white tracking-widest uppercase rounded-2xl text-sm font-bold hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 active:scale-[0.98] border border-white/30 backdrop-blur-md"
                                >
                                    SEND LINK
                                </SubmitButton>
                            </div>
                        )}
                    </form>

                    <div className="mt-8 flex items-center justify-center text-sm text-white/80 relative z-10 px-1 font-medium">
                        <Link href="/login" className="hover:text-white hover:drop-shadow-md hover:underline decoration-white/50 transition-all duration-200">
                            Remember your password? Log in
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
