"use client";

import { usePathname } from "next/navigation";

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password";

    if (isAuthRoute) {
        return null;
    }

    return <>{children}</>;
}
