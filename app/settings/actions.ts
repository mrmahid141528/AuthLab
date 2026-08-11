"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type UpdateNameActionState = { success?: boolean; error?: string } | null;
export type ChangePasswordActionState = { success?: boolean; error?: string } | null;

export async function updateNameAction(prevState: UpdateNameActionState, formData: FormData): Promise<UpdateNameActionState> {
    const session = await auth();
    if (!session?.user?.email) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    if (!name || name.length < 2) return { error: "Name must be at least 2 characters." };

    try {
        await prisma.user.update({
            where: { email: session.user.email },
            data: { name },
        });

        // Invalidate the cache to instantly reflect the change
        revalidatePath("/profile");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update name." };
    }
}

export async function changePasswordAction(prevState: ChangePasswordActionState, formData: FormData): Promise<ChangePasswordActionState> {
    const session = await auth();
    if (!session?.user?.email) return { error: "Unauthorized" };

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return { error: "Invalid input. New password must be at least 8 characters." };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return { error: "User not found." };

        // Security check: Verify they know their current password before changing!
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return { error: "Current password is incorrect." };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email: user.email },
            data: { password: hashedPassword },
        });

        return { success: true };
    } catch (error) {
        return { error: "Failed to change password." };
    }
}
