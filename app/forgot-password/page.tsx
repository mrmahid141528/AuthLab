"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { forgotPasswordAction, ForgotPasswordState } from "./actions";
import { AuthLayout } from "@/components/ui/AuthLayout";

export default function ForgotPasswordPage() {
    const [state, formAction] = useActionState<ForgotPasswordState, FormData>(forgotPasswordAction, null);

    return (
        <AuthLayout>
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md pb-1">Recover Account</h1>
                <p className="text-white/70 text-xs sm:text-sm font-medium">We'll send you a reset link.</p>
            </div>

            <form action={formAction} className="space-y-4">
                {state?.error && (
                    <div className="p-3 text-xs text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl backdrop-blur-md animate-pulse">
                        {state.error}
                    </div>
                )}
                {state?.success && (
                    <div className="p-4 text-xs sm:text-sm text-green-200 bg-green-900/40 border border-green-500/30 rounded-xl backdrop-blur-md text-center font-medium">
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
                        className="w-full px-5 py-3.5 bg-black/30 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                        disabled={state?.success}
                    />
                </div>

                {!state?.success && (
                    <div className="pt-2">
                        <SubmitButton
                            pendingText="SENDING..."
                            className="w-full px-5 py-3.5 bg-white/20 text-white tracking-widest uppercase rounded-2xl text-xs font-bold hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 active:scale-[0.98] border border-white/30 backdrop-blur-md"
                        >
                            SEND LINK
                        </SubmitButton>
                    </div>
                )}
            </form>

            <div className="mt-8 flex items-center justify-center text-xs sm:text-sm text-white/80 px-1 font-medium">
                <Link href="/login" className="hover:text-white hover:drop-shadow-md hover:underline decoration-white/50 transition-all duration-200">
                    Remember your password? Log in
                </Link>
            </div>
        </AuthLayout>
    );
}
