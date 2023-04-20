import React from 'react';
import { Title } from '@mantine/core';
import ListTransactions from './list-transactions';
import QuickView from './quick-view';

const Accounting = () => {
    return (
        <>
            <Title order={1}>Accounting</Title>
            <QuickView />
            <ListTransactions />
        </>
    );
};

export default Accounting;
