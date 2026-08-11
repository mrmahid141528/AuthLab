import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-zinc-950 text-zinc-50">
      <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">AuthLab</h1>
      <p className="text-lg text-zinc-400 mb-8 max-w-lg">
        Learn Authentication by Building It. This is a complete learning roadmap for modern web authentication.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Login
        </Link>
        <Link 
          href="/signup" 
          className="px-6 py-3 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
