"use client";

import { handleSignOut } from "@/app/actions/authActions";

export function SignOutButton() {
    return (
        <form action={handleSignOut}>
            <button
                type="submit"
                className="w-full px-4 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] active:scale-95"
            >
                DISCONNECT
            </button>
        </form>
    );
}
