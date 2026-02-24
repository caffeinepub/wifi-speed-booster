import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import OptimizePage from './pages/OptimizePage';
import SpeedTestPage from './pages/SpeedTestPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: OptimizePage,
});

const optimizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/optimize',
  component: OptimizePage,
});

const speedTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/speed-test',
  component: SpeedTestPage,
});

const routeTree = rootRoute.addChildren([indexRoute, optimizeRoute, speedTestRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
