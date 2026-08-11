import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth();

    // Route Protection in Server Component (Only ADMIN can access)
    if ((session?.user as any)?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    // Fetch all users safely
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return (
        <div className="min-h-screen p-8 bg-white text-black dark:bg-black dark:text-white font-sans">
            <div className="max-w-5xl mx-auto space-y-8 mt-10">
                <h1 className="text-3xl font-semibold tracking-tight">System Admin</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <h3 className="text-sm font-medium text-zinc-500">Total Users</h3>
                        <p className="text-4xl font-bold mt-2">{users.length}</p>
                    </div>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <h3 className="text-sm font-medium text-zinc-500">Administrators</h3>
                        <p className="text-4xl font-bold mt-2">{users.filter((u: any) => u.role === "ADMIN").length}</p>
                    </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-zinc-100 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium">{user.name || "N/A"}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">
                                            {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
