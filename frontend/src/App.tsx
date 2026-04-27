import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Landing from './pages/Landing';
import Workspace from './pages/Workspace';
import AppShell from './components/AppShell';
import { DesignStoreProvider } from './features/designer/DesignStore';

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Landing />
    </AppShell>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
});

const workspaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workspace',
  component: () => (
    <DesignStoreProvider>
      <Workspace />
    </DesignStoreProvider>
  ),
});

const routeTree = rootRoute.addChildren([landingRoute, workspaceRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
