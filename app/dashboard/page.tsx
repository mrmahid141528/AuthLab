import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/ui/DashboardLayout";

// Ensure dynamic rendering to guarantee fresh session verification
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <DashboardLayout session={session}>
            <div className="w-full pb-16">
                {/* Header Welcome Section */}
                <div className="mb-10 sm:mb-14 text-white animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        Encrypted Connection Active
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl mb-4">
                        Welcome back,<br /> <span className="text-white/80 font-medium">{session.user?.name || "Explorer"}</span>
                    </h1>
                    <p className="text-white/50 text-xs sm:text-sm md:text-base max-w-2xl font-semibold leading-relaxed tracking-wide mt-4">
                        You have successfully authenticated into the secure portal. Access your encrypted parameters, manage protocol permissions, and review real-time telemetry.
                    </p>
                </div>

                {/* Dashboard Grid Data */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                    {/* Security Vector Matrix */}
                    <div className="bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors"></div>

                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 drop-shadow-sm">Auth State</h3>
                        <p className="text-white/50 text-xs sm:text-sm font-semibold mb-8">Current active JWT metadata context parameters.</p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <span className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Permission</span>
                                <span className="text-white text-xs sm:text-sm font-bold bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg tracking-widest">{session.user?.role || "USER"}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <span className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Adapter</span>
                                <span className="text-white text-xs sm:text-sm font-bold bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg tracking-widest">Credentials</span>
                            </div>
                            <div className="flex justify-between items-center pb-1">
                                <span className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Verification</span>
                                <span className="text-emerald-400 text-xs sm:text-sm font-bold shadow-sm">Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Cryptographic Profile Card */}
                    <div className="bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors"></div>

                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 drop-shadow-sm">Identifier</h3>
                        <p className="text-white/50 text-xs sm:text-sm font-semibold mb-8">Personal cryptographic node identity metrics.</p>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2 pb-3 border-b border-white/10">
                                <span className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Registered Address</span>
                                <span className="text-white text-sm sm:text-base font-semibold truncate bg-black/20 px-3 py-2 rounded-xl border border-white/5">{session.user?.email}</span>
                            </div>
                            <div className="flex flex-col gap-2 pb-1 border-white/10">
                                <span className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">Node ID Hash</span>
                                <span className="text-white/70 text-[10px] sm:text-xs font-mono truncate bg-black/20 px-3 py-2 rounded-xl border border-white/5">{session.user?.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Matrix */}
                    <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-3xl border border-white/30 p-6 sm:p-8 rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] flex flex-col justify-between group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-white/20 transition-all duration-700"></div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                            </div>
                            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 drop-shadow-sm">System Link</h3>
                            <p className="text-white/50 text-xs sm:text-sm font-semibold mb-8">Execute configuration overrides or patch profile nodes.</p>
                        </div>

                        <div className="flex flex-col gap-3 mt-4 relative z-10">
                            {/* NOTE: If you haven't implemented /profile or /settings with glass layouts yet, these buttons are placeholders that will route safely */}
                            <a href="/profile" className="w-full px-5 py-4 bg-white/10 border border-white/20 text-white rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-center hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                                Patch Profile
                            </a>
                            <a href="/settings" className="w-full px-5 py-4 bg-white/10 border border-white/20 text-white rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-center hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                                Subsystem Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
