import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderApp } from './header';
import { useLayoutStyles } from './styles';
import { AppShell } from '@mantine/core';

const Layout = () => {
    const { classes } = useLayoutStyles();
    return (
        <AppShell header={<HeaderApp />} className={classes.body}>
            <Outlet />
        </AppShell>
    );
};

export default Layout;
