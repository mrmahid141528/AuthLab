"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { forgotPasswordAction, ForgotPasswordState } from "./actions";

export default function ForgotPasswordPage() {
    const [state, formAction] = useActionState<ForgotPasswordState, FormData>(forgotPasswordAction, null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black dark:bg-black dark:text-white font-sans">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">Forgot Password</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                    <form action={formAction} className="space-y-4">
                        {state?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
                                {state.error}
                            </div>
                        )}
                        {state?.success && (
                            <div className="p-3 text-sm text-green-600 bg-green-100/50 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-900 rounded-md">
                                Password reset link sent! Please check your email inbox.
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="email">Email</label>
                            <input suppressHydrationWarning
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="mahid@example.com"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                                disabled={state?.success}
                            />
                        </div>

                        {!state?.success && (
                            <SubmitButton pendingText="Sending Link...">Send Reset Link</SubmitButton>
                        )}
                    </form>
                </div>

                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-6">
                    Remember your password?{" "}
                    <Link href="/login" className="font-medium text-black dark:text-white hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
