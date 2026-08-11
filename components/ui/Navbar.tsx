import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "./SignOutButton";

export async function Navbar() {
    const session = await auth();

    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight text-black dark:text-white">
                    AuthLab
                </Link>

                <nav className="flex items-center gap-4">
                    {session ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/profile" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                Profile
                            </Link>
                            <Link href="/settings" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                Settings
                            </Link>
                            {(session?.user as any)?.role === "ADMIN" && (
                                <Link href="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                                    Admin Panel
                                </Link>
                            )}
                            <SignOutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                                Log In
                            </Link>
                            <Link href="/signup" className="text-sm font-medium px-4 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity">
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
