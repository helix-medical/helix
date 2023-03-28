import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/header';
import AppRouter from './pages/system/appRouter';

// import style from './styles/app.module.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Log from './pages/system/logs';

function App() {
  return (
    <>
      <Header />
      <div className='body'>
        <AppRouter />
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);
root.render(
  <App />,
);