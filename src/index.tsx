import React from 'react';
import { AuthProvider } from './components/auth/auth-provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Notifications } from '@mantine/notifications';
import * as serviceWorkerRegistration from './config/service-worker-registration';
import AppRouter from './pages/system/app-router';
import Spotlight from './config/spotlight';
import ThemeProvider from './pages/system/theme-provider';

// disable console.log in production
if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}

const App = () => {
    return (
        <ThemeProvider>
            <Notifications />
            <BrowserRouter>
                <AuthProvider>
                    <Spotlight>
                        <Routes>
                            <Route path="/*" element={<AppRouter />} />
                        </Routes>
                    </Spotlight>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

// PWA Service Worker
serviceWorkerRegistration.register();
