import { Outlet } from '@tanstack/react-router';
import AppHeader from './AppHeader';
import { Toaster } from '@/components/ui/sonner';

export default function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Toaster />
    </div>
  );
}
