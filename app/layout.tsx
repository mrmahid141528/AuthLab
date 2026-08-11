import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthLab",
  description: "Learn Authentication by Building It.",
};

import { ConditionalWrapper } from "@/components/ui/ConditionalWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ConditionalWrapper>
          <Navbar />
        </ConditionalWrapper>

        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>

        <ConditionalWrapper>
          <Footer />
        </ConditionalWrapper>
      </body>
    </html>
  );
}
