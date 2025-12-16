import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets';
import { prefetchRoutes } from '@/app/providers/router/loader';

export function App() {
  useEffect(() => {
    prefetchRoutes();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <Header />
      <main className="mx-auto py-4 px-0">
        <div className="fade-in">
          <Suspense fallback={<div className="flex justify-center items-center h-[50vh]">Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
