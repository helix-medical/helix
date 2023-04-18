import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
// import * as serviceWorkerRegistration from './config/serviceWorkerRegistration';
// import reportWebVitals from './config/reportWebVitals';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRouter from './pages/system/appRouter';
import { AuthProvider } from './components/auth/authProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spotlight from './config/spotlight';

// disable console.log in production
if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    // disable react dev tools
}

const App = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: colorScheme,
                    loader: 'dots',
                    colors: {
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
                    },
                }}
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
