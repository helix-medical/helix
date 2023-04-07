import ReactDOM from 'react-dom/client';
import { useState } from 'react';
// import * as serviceWorkerRegistration from './config/serviceWorkerRegistration';
// import reportWebVitals from './config/reportWebVitals';

import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRouter from './pages/system/appRouter';
import { AuthProvider } from './components/auth/authProvider';
import './styles/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spotlight from './config/spotlight';

// disable console.log in production
if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    // disable react dev tools
}

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme, loader: 'dots' }}>
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
