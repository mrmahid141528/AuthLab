import { Resend } from "resend";

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    // Generate the reset link (local in dev, Vercel URL in prod)
    // Note: VERCEL_URL doesn't include https://
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
        ? process.env.NEXT_PUBLIC_APP_URL
        : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000";

    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    await resend.emails.send({
        from: "AuthLab Security <onboarding@resend.dev>",
        to: email, // Resend free tier only sends to your verified email
        subject: "Reset your AuthLab password",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
                <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; border: 1px solid #eaeaea;">
                    <h2 style="color: #000; font-size: 24px; margin-top: 0;">Password Reset Request</h2>
                    <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                        You requested a password reset for your AuthLab account. Click the button below to set a new password. If you didn't request this, you can safely ignore this email.
                    </p>
                    <a href="${resetLink}" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">
                        Reset Password
                    </a>
                    <p style="color: #888; font-size: 13px; margin-top: 30px;">
                        This password reset link will expire in 1 hour.
                    </p>
                </div>
            </div>
        `
    });
};
