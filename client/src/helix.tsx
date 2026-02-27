import ThemeProvider from './pages/system/theme-provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRouter from './pages/system/app-router';
import HelixSpotlight from './config/spotlight.tsx';
import { Notifications } from '@mantine/notifications';
import AuthProvider from './components/auth/auth-provider.tsx';

const Helix = () => (
  <ThemeProvider>
    <Notifications />
    <BrowserRouter>
      <AuthProvider>
        <>
          <HelixSpotlight />
          <Routes>
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default Helix;
