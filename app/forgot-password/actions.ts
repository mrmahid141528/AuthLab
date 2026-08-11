"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mail";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type ForgotPasswordState = {
    error?: string;
    success?: boolean;
} | null;

export async function forgotPasswordAction(prevState: ForgotPasswordState, formData: FormData): Promise<ForgotPasswordState> {
    const email = formData.get("email") as string;

    const validationResult = forgotPasswordSchema.safeParse({ email });
    if (!validationResult.success) {
        return { error: validationResult.error.issues[0].message };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Do not reveal whether user exists for security reasons to prevent enumeration attacks
            return { success: true };
        }

        // Generate secure 32 byte random token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

        // Clear any existing tokens for this user to avoid db clutter (Optional but good practice)
        await prisma.passwordResetToken.deleteMany({
            where: { email }
        });

        // Save token to database
        await prisma.passwordResetToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        // Emit the email via Resend
        await sendPasswordResetEmail(email, token);

        return { success: true };

    } catch (error) {
        console.error("Forgot password error:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}
