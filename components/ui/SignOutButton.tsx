import { signOut } from "@/auth";

export function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
            }}
        >
            <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
            >
                Log Out
            </button>
        </form>
    );
}
