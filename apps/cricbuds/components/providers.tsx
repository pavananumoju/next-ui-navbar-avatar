"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/features/auth/auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-full flex-1 flex-col">
        <AuthProvider>{children}</AuthProvider>
      </div>
    </ThemeProvider>
  );
}
