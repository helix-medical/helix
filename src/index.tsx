import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';

import AppRouter from './pages/system/appRouter';
import { AuthProvider } from './components/auth/authProvider';
import './styles/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme, loader: 'dots' }}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/*" element={<AppRouter />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);
root.render(<App />);
