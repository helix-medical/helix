import ThemeProvider from './pages/system/theme-provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRouter from './pages/system/app-router';
import HelixSpotlight from './config/spotlight.tsx';
import { AuthProvider } from './components/auth/auth-provider.tsx';
import { Notifications } from '@mantine/notifications';

// import { LogtoConfig, LogtoProvider } from '@logto/react';
//
// const config: LogtoConfig = {
//   endpoint: 'http://localhost:3010/',
//   appId: 'lj9b1pumci3q5tyf6agj5',
// };

const Helix = () => (
  <ThemeProvider>
    <Notifications />
    <BrowserRouter>
      <AuthProvider>
        {/*<LogtoProvider config={config}>*/}
        <>
          <HelixSpotlight />
          <Routes>
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </>
        {/*</LogtoProvider>*/}
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default Helix;
