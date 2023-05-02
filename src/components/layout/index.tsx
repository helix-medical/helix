import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderApp from './header';
import styles from '../../styles/app.module.css';

const Layout = () => {
    return (
        <>
            <HeaderApp />
            <div className={styles.body}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
