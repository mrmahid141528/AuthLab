import Link from "next/link";
import { AuthLayout } from "@/components/ui/AuthLayout";

export default function Home() {
    return (
        <AuthLayout>
            <div className="text-center space-y-6 py-4">
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white drop-shadow-md">
                        AuthLab
                    </h1>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed px-2 font-medium">
                        Learn Authentication by Building It. This is a complete learning roadmap for modern web authentication.
                    </p>
                </div>

                <div className="flex flex-col gap-3 pt-6 w-full">
                    <Link
                        href="/login"
                        className="w-full px-5 py-3.5 bg-white/20 text-white tracking-widest uppercase rounded-2xl text-xs sm:text-sm font-bold hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 active:scale-[0.98] border border-white/30 backdrop-blur-md text-center"
                    >
                        LOGIN
                    </Link>
                    <Link
                        href="/signup"
                        className="w-full px-5 py-3.5 bg-black/30 border border-white/20 text-white tracking-widest uppercase rounded-2xl text-xs sm:text-sm font-bold hover:bg-black/50 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 active:scale-[0.98] backdrop-blur-md text-center"
                    >
                        SIGN UP
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
