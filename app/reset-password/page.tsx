"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { resetPasswordAction, ResetPasswordState } from "./actions";
import { AuthLayout } from "@/components/ui/AuthLayout";

function ResetFormContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [state, formAction] = useActionState<ResetPasswordState, FormData>(resetPasswordAction, null);

    if (!token && !state?.success) {
        return (
            <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-red-400 mb-4 drop-shadow-md">Invalid Reset Link</h1>
                <p className="text-white/80 text-xs sm:text-sm mb-8 font-medium">No reset token provided. Please request a new link.</p>
                <Link href="/forgot-password" className="px-5 py-3 bg-white/10 border border-white/20 text-white rounded-2xl text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-md">
                    Request New Link
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="text-center mb-6 w-full">
                <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md pb-1">Set Password</h1>
                <p className="text-white/70 text-xs sm:text-sm font-medium">Please enter your new password below.</p>
            </div>

            <div className="w-full">
                {state?.success ? (
                    <div className="text-center space-y-6">
                        <div className="p-4 text-xs sm:text-sm text-green-200 bg-green-900/40 border border-green-500/30 rounded-xl backdrop-blur-md font-medium">
                            Password successfully reset!
                        </div>
                        <Link href="/login" className="block w-full px-5 py-3.5 bg-white/20 border border-white/30 text-white tracking-widest uppercase rounded-2xl text-xs font-bold hover:bg-white/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <form action={formAction} className="space-y-3.5">
                        <input type="hidden" name="token" value={token || ""} />

                        {state?.error && (
                            <div className="p-3 text-xs text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl backdrop-blur-md animate-pulse">
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
                                className="w-full px-5 py-3.5 bg-black/30 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
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
                                className="w-full px-5 py-3.5 bg-black/30 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="pt-2">
                            <SubmitButton
                                pendingText="SETTING..."
                                className="w-full px-5 py-3.5 bg-white/20 text-white tracking-widest uppercase rounded-2xl text-xs font-bold hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 active:scale-[0.98] border border-white/30 backdrop-blur-md"
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
        <AuthLayout>
            <Suspense fallback={<div className="text-center p-8 text-xs text-white/50">Loading form...</div>}>
                <ResetFormContent />
            </Suspense>
        </AuthLayout>
    );
}
