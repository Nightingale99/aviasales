import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Ban } from 'lucide-react';
import { Offline, Online } from 'react-detect-offline';
import { Toaster } from './components/ui/sonner.tsx';
import App from './App.tsx';
import './index.scss';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Online>
      <App />
    </Online>
    <Offline>
      <Alert variant="destructive" className="bg-popover">
        <Ban className="h-4 w-4" />
        <AlertTitle>Проверьте подключение.</AlertTitle>
        <AlertDescription>
          У вас отсутствует интернет соединение.
        </AlertDescription>
      </Alert>
    </Offline>
    <Toaster />
  </StrictMode>,
);
