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
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Reset Link</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">No reset token provided. Please request a new link.</p>
                <Link href="/forgot-password" className="text-white bg-black dark:text-black dark:bg-white px-4 py-2 rounded-md font-medium text-sm hover:opacity-90">
                    Request New Link
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">Set New Password</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
                    Please enter your new password below.
                </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                {state?.success ? (
                    <div className="text-center space-y-6">
                        <div className="p-3 text-sm text-green-600 bg-green-100/50 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-900 rounded-md">
                            Password successfully reset!
                        </div>
                        <Link href="/login" className="block w-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="token" value={token || ""} />

                        {state?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
                                {state.error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="password">New Password</label>
                            <input suppressHydrationWarning
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                                minLength={8}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
                            <input suppressHydrationWarning
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                            />
                        </div>

                        <SubmitButton pendingText="Setting Password...">Set Password</SubmitButton>
                    </form>
                )}
            </div>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black dark:bg-black dark:text-white font-sans">
            <div className="w-full max-w-sm">
                <Suspense fallback={<div className="text-center p-8 text-sm text-zinc-500">Loading form...</div>}>
                    <ResetFormContent />
                </Suspense>
            </div>
        </div>
    );
}
