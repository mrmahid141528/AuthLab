import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    // Fetch fresh data directly from Database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen p-8 bg-white text-black dark:bg-black dark:text-white font-sans">
            <div className="max-w-2xl mx-auto space-y-8 mt-10">
                <h1 className="text-3xl font-semibold tracking-tight">Your Profile</h1>

                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</label>
                            <p className="mt-1 text-lg font-medium">{user.name || "Not provided"}</p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</label>
                            <p className="mt-1 text-lg font-medium">{user.email}</p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</label>
                            <p className="mt-1">
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white">
                                    {user.role}
                                </span>
                            </p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Account Created</label>
                            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                                {new Date(user.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-zinc-100 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                        <Link
                            href="/settings"
                            className="text-sm font-medium text-black dark:text-white hover:underline"
                        >
                            Edit in Settings &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
