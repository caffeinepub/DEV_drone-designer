import { Link, useRouterState } from '@tanstack/react-router';
import LoginButton from './auth/LoginButton';
import SignedInBadge from './auth/SignedInBadge';
import ProfileSetupDialog from './auth/ProfileSetupDialog';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function AppHeader() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img 
              src="/assets/generated/drone-logo.dim_512x512.png" 
              alt="Drone Designer" 
              className="h-9 w-9"
            />
            <span className="text-xl font-bold tracking-tight">Drone Designer</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPath === '/' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/workspace"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPath === '/workspace' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              Workspace
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && <SignedInBadge />}
          <LoginButton />
        </div>
      </div>
      
      <ProfileSetupDialog />
    </header>
  );
}
