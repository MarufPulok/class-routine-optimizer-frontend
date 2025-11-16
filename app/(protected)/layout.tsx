import { ModeToggle } from "@/components/mode-toggle";
import UserMenu from "@/components/user-menu";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
