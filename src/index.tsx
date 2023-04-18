import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { ColorScheme } from '@mantine/core';

const Root = () => {
    const preferredColorScheme = useColorScheme('dark');
    const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <App />
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
