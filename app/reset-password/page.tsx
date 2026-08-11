"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { resetPasswordAction, ResetPasswordState } from "./actions";

function ResetFormContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [state, formAction] = useActionState<ResetPasswordState, FormData>(resetPasswordAction, null);

    if (!token && !state?.success) {
        return (
            <div className="text-center relative z-10">
                <h1 className="text-2xl font-bold text-red-400 mb-4 drop-shadow-md">Invalid Reset Link</h1>
                <p className="text-white/80 mb-8 font-medium">No reset token provided. Please request a new link.</p>
                <Link href="/forgot-password" className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-md">
                    Request New Link
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="text-center mb-8 relative z-10 w-full">
                <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-md pb-2">Set Password</h1>
                <p className="text-white/70 mt-1 text-sm font-medium">Please enter your new password below.</p>
            </div>

            <div className="relative z-10 w-full">
                {state?.success ? (
                    <div className="text-center space-y-8">
                        <div className="p-4 text-sm text-green-200 bg-green-900/40 border border-green-500/30 rounded-xl backdrop-blur-md font-medium">
                            Password successfully reset!
                        </div>
                        <Link href="/login" className="block w-full px-6 py-4 bg-[#6c2844] border border-white/10 text-white tracking-widest uppercase rounded-2xl text-sm font-bold hover:bg-[#8f3659] transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,41,84,0.5)]">
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="token" value={token || ""} />

                        {state?.error && (
                            <div className="p-3 text-sm text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl backdrop-blur-md animate-pulse">
                                {state.error}
                            </div>
                        )}

                        <div className="space-y-1.5 flex flex-col">
                            <input suppressHydrationWarning
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="New Password"
                                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8e2954] focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                                minLength={8}
                            />
                        </div>
                        <div className="space-y-1.5 flex flex-col">
                            <input suppressHydrationWarning
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#8e2954] focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="pt-3">
                            <SubmitButton
                                pendingText="SETTING..."
                                className="w-full px-6 py-4 bg-[#6c2844] text-white/90 tracking-widest uppercase rounded-2xl text-sm font-bold hover:bg-[#8f3659] hover:shadow-[0_0_20px_rgba(142,41,84,0.5)] focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 active:scale-[0.98] border border-white/10"
                            >
                                SET PASSWORD
                            </SubmitButton>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans bg-cover bg-center relative"
            style={{ backgroundImage: "url('/bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 ease-out transform hover:scale-[1.01]">
                <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 border border-white/20 rounded-3xl shadow-2xl relative overflow-hidden group flex flex-col items-center">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-400/40 transition-colors duration-700"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-400/30 transition-colors duration-700"></div>

                    <Suspense fallback={<div className="text-center p-8 text-sm text-white/50 relative z-10">Loading form...</div>}>
                        <ResetFormContent />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
