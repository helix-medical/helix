import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
