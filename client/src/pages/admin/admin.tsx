import React from 'react';
import { Badge, Divider, Title } from '@mantine/core';
import GetUsers from './getUsers';
import ListUsers from './listUsers';

const Admin = (): JSX.Element => {
    const users = GetUsers();

    return (
        <>
            <Title order={1}>
                Administrator Panel&nbsp;
                <Badge variant="filled" color="red" radius="sm" size="xl">
                    WORK IN PROGRESS
                </Badge>
            </Title>
            <Divider my="lg" />
            <ListUsers users={users} />
            <Divider my="lg" />
        </>
    );
};

export default Admin;
