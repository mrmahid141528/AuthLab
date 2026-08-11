"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { loginAction, LoginActionState } from "./actions";

export default function LoginPage() {
    const [state, formAction] = useActionState<LoginActionState, FormData>(loginAction, null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black dark:bg-black dark:text-white font-sans">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">Welcome Back</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
                        Sign in to your AuthLab account.
                    </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                    <form action={formAction} className="space-y-4">
                        {state?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
                                {state.error}
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
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <input suppressHydrationWarning
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                            />
                        </div>

                        <SubmitButton pendingText="Signing in...">Log in</SubmitButton>
                    </form>
                </div>

                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-medium text-black dark:text-white hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
