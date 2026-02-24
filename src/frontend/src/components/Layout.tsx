import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Wifi, Gauge, Zap } from 'lucide-react';

export default function Layout() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary fill-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  WiFi Speed Booster
                </h1>
                <p className="text-xs text-muted-foreground">Optimize Your Connection</p>
              </div>
            </Link>
            
            <nav className="flex gap-2">
              <Link
                to="/optimize"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPath === '/' || currentPath === '/optimize'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Wifi className="h-4 w-4" />
                <span className="hidden sm:inline">Optimize</span>
              </Link>
              <Link
                to="/speed-test"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPath === '/speed-test'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Gauge className="h-4 w-4" />
                <span className="hidden sm:inline">Speed Test</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} WiFi Speed Booster. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <span className="text-primary">❤</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'wifi-speed-booster'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
