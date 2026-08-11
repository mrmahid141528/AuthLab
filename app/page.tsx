import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black dark:bg-black dark:text-white font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <div className="max-w-2xl w-full text-center space-y-6">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                        AuthLab
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                        Learn Authentication by Building It. This is a complete learning roadmap for modern web authentication.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                    <Link
                        href="/login"
                        className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black font-medium rounded-md hover:opacity-90 transition-opacity text-sm"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-6 py-2.5 bg-transparent text-black dark:text-white font-medium rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
