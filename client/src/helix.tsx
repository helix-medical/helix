import { Notifications } from '@mantine/notifications';
import ThemeProvider from './pages/system/theme-provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spotlight from './config/spotlight';
import { AuthProvider } from './components/auth/auth-provider';
import AppRouter from './pages/system/app-router';

const Helix = () => (
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

export default Helix;
