import { AppHeader } from "@/components/layout/app-header";
import { AuthGate } from "@/components/auth-gate";

export default function AppSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppHeader />
      <AuthGate>
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </AuthGate>
    </div>
  );
}
