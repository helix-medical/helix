import { Transactions } from './transactions';
import { QuickView } from './quick-view';
import { Title } from '@mantine/core';

const Accounting = () => {
    return (
        <>
            <Title order={1}>Accounting</Title>
            <QuickView />
            <Transactions />
        </>
    );
};

export default Accounting;
