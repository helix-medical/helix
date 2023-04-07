import { Divider, Title } from '@mantine/core';
import ListUsers from './listUsers';

const Admin = (): JSX.Element => {
    return (
        <>
            <Title order={1}>Administrator Panel</Title>
            <Divider my="lg" />
            <ListUsers />
            <Divider my="lg" />
        </>
    );
};

export default Admin;
