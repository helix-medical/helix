import React from 'react';
import { Drawer, Title } from '@mantine/core';

const DrawerApp = ({ open, items, toggle }: { open: boolean; items: any, toggle: any }) => {
    return (
        <Drawer opened={open} onClose={toggle}>
            <Title>Helix</Title>
            {items}
        </Drawer>
    );
};

export default DrawerApp;
