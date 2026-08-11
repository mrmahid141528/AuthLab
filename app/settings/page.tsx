"use client";

import { useActionState } from "react";
import { updateNameAction, changePasswordAction, UpdateNameActionState, ChangePasswordActionState } from "./actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function SettingsPage() {
    const [nameState, nameAction] = useActionState<UpdateNameActionState, FormData>(updateNameAction, null);
    const [passwordState, passwordAction] = useActionState<ChangePasswordActionState, FormData>(changePasswordAction, null);

    return (
        <div className="min-h-screen p-8 bg-white text-black dark:bg-black dark:text-white font-sans">
            <div className="max-w-2xl mx-auto space-y-10 mt-10">
                <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

                {/* Update Name Section */}
                <section className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                    <h2 className="text-xl font-medium mb-4">Update Profile</h2>

                    <form action={nameAction} className="max-w-sm space-y-4">
                        {nameState?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
                                {nameState.error}
                            </div>
                        )}
                        {nameState?.success && (
                            <div className="p-3 text-sm text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-md">
                                Name updated successfully!
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="name">Display Name</label>
                            <input suppressHydrationWarning
                                id="name" name="name" type="text" required placeholder="New Name"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                            />
                        </div>
                        <SubmitButton pendingText="Saving...">Update Name</SubmitButton>
                    </form>
                </section>

                {/* Change Password Section */}
                <section className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                    <h2 className="text-xl font-medium mb-4">Change Password</h2>

                    <form action={passwordAction} className="max-w-sm space-y-4">
                        {passwordState?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md">
                                {passwordState.error}
                            </div>
                        )}
                        {passwordState?.success && (
                            <div className="p-3 text-sm text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 rounded-md">
                                Password changed successfully! Next time you log in, use your new password.
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="currentPassword">Current Password</label>
                            <input suppressHydrationWarning
                                id="currentPassword" name="currentPassword" type="password" required placeholder="••••••••"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="newPassword">New Password</label>
                            <input suppressHydrationWarning
                                id="newPassword" name="newPassword" type="password" required placeholder="••••••••"
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                            />
                        </div>
                        <SubmitButton pendingText="Updating...">Change Password</SubmitButton>
                    </form>
                </section>

            </div>
        </div>
    );
}
