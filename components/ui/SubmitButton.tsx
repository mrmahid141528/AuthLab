"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children, pendingText = "Submitting...", className }: { children: React.ReactNode, pendingText?: string, className?: string }) {
    const { pending } = useFormStatus();

    return (
        <button suppressHydrationWarning
            type="submit"
            disabled={pending}
            className={className || `w-full px-4 py-2.5 bg-black text-white dark:bg-white dark:text-black font-medium rounded-md transition-all text-sm mt-4
        ${pending ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}
      `}
        >
            {pending ? pendingText : children}
        </button>
    );
}
