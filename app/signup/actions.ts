"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type ActionState = {
    error?: string;
    success?: boolean;
} | null;

export async function signupAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Validate input using Zod
    const validationResult = signupSchema.safeParse({ name, email, password });
    if (!validationResult.success) {
        return { error: validationResult.error.errors[0].message };
    }

    try {
        // 2. Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Email is already registered." };
        }

        // 3. Hash the password (NEVER SAVE PLAIN TEXT)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Save the new user to the database
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

    } catch (error) {
        console.error("Signup error:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }

    // 5. Redirect on success
    redirect("/login");
}
