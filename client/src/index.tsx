import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';

import HeaderApp from './components/header';
import AppRouter from './pages/system/appRouter';

// import style from './styles/app.module.css';
import './styles/main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Log from './pages/system/logs';

function App() {
    const links = [
        { label: 'Patients', link: '/patients' },
        { label: 'Appointments', link: '/appointments' },
        { label: 'Calendar', link: '/calendar' },
        { label: 'Admin', link: '/admin' },
    ];

    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme, loader: 'dots' }}>
                <HeaderApp links={links} />
                <div className="body">
                    <AppRouter />
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);
root.render(<App />);
