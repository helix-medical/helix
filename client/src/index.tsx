import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';

import HeaderApp from './components/header';
import AppRouter from './pages/system/appRouter';

// import style from './styles/app.module.css';
import './styles/main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Log from './pages/system/logs';

function App() {
  const links = [
    { label: 'Home', link: '/' },
    { label: 'Patients', link: '/patients' },
    { label: 'Appointments', link: '/appointments' },
  ];

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <HeaderApp links={links} />
      <div className='body'>
        <AppRouter />
      </div>
    </MantineProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);
root.render(
  <App />,
);