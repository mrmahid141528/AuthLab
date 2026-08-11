"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginActionState = {
    error?: string;
} | null;

export async function loginAction(prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
        return null; // Will theoretically not be reached if redirectTo works
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                default:
                    return { error: "An unexpected auth error occurred." };
            }
        }
        // NEXT_REDIRECT errors must be re-thrown!
        throw error;
    }
}
