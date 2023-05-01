import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './config/service-worker-registration';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRouter from './pages/system/app-router';
import { AuthProvider } from './components/auth/auth-provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spotlight from './config/spotlight';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// disable console.log in production
if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}

const colors = {
    'fr-yellow': [
        '#FFF8E5',
        '#FFEAB8',
        '#FFDD8A',
        '#FFCF5C',
        '#FFC22E',
        '#FFB400',
        '#CC9000',
        '#996C00',
        '#664800',
        '#332400',
    ],
    'fr-orange': [
        '#FDEDE8',
        '#F8CCBE',
        '#F4AC95',
        '#EF8B6B',
        '#EB6B42',
        '#E74A18',
        '#B93C13',
        '#8A2D0F',
        '#5C1E0A',
        '#2E0F05',
    ],
    'fr-cyan': [
        '#EAF9FA',
        '#C5EEF2',
        '#A0E2E9',
        '#7BD7E0',
        '#55CCD8',
        '#30C1CF',
        '#279AA5',
        '#1D747C',
        '#134D53',
        '#0A2729',
    ],
};

const App = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme, loader: 'dots', colors: colors as any }}
            >
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
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// PWA Service Worker
serviceWorkerRegistration.register();
