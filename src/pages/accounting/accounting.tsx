import { Title, Badge, Divider } from '@mantine/core';
import ListTransactions from './listTransactions';
import QuickView from './quickView';

const Accounting = () => {
    return (
        <>
            <Title order={1}>
                Accounting{' '}
                <Badge color="teal" size="xl">
                    BETA
                </Badge>
            </Title>
            <Divider my="lg" />
            <QuickView />
            <Divider my="lg" />
            <ListTransactions />
        </>
    );
};

export default Accounting;
