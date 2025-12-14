import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, AppRouter } from '@/app/providers';
import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
