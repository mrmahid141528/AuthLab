"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Reset token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type ResetPasswordState = {
    error?: string;
    success?: boolean;
} | null;

export async function resetPasswordAction(prevState: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
    const token = formData.get("token") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validationResult = resetPasswordSchema.safeParse({ token, password, confirmPassword });
    if (!validationResult.success) {
        return { error: validationResult.error.issues[0].message };
    }

    try {
        // 1. Verify token exists
        const resetRecord = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetRecord) {
            return { error: "Invalid or expired reset token." };
        }

        // 2. Check if token expired
        if (resetRecord.expires < new Date()) {
            return { error: "Reset token has expired. Please request a new one." };
        }

        // 3. Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Atomically update password and delete token
        await prisma.$transaction([
            prisma.user.update({
                where: { email: resetRecord.email },
                data: { password: hashedPassword },
            }),
            prisma.passwordResetToken.delete({
                where: { id: resetRecord.id },
            })
        ]);

        return { success: true };

    } catch (error) {
        console.error("Reset password error:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}
