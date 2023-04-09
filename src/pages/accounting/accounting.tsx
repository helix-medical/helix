import { Title } from '@mantine/core';
import ListTransactions from './listTransactions';
import QuickView from './quickView';

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
