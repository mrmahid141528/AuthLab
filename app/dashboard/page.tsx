import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black dark:bg-black dark:text-white font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <div className="max-w-2xl w-full text-center space-y-6">

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    Authenticated Session
                </div>

                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                    Welcome back! 👋
                </h1>

                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-left mt-8">
                    <h2 className="text-lg font-medium border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
                        Account Information
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-1">
                            <span className="text-zinc-500">Email</span>
                            <span className="font-medium">{session.user?.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="text-zinc-500">Name</span>
                            <span className="font-medium">{session.user?.name || "Not provided"}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <span className="text-zinc-500">Status</span>
                            <span className="px-2 py-0.5 bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md">Logged in</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
