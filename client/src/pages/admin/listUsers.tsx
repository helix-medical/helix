import React from 'react';
import { Table, ActionIcon, Flex, Title, Grid, Badge, Group, Button } from '@mantine/core';
import { IUsers } from '../../interfaces';
import RoleBadge from '../../components/userBadge';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const ListUsers = ({ users }: { users: IUsers[] }): JSX.Element => {
    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group>
                    <Title order={2}>
                        Users{' '}
                        <Badge size="lg" radius="lg" variant="filled">
                            {users.length}
                        </Badge>
                    </Title>
                </Group>
                <Group>
                    <Button /* onClick={toggleModal} */>New User</Button>
                </Group>
            </Grid>
            <Table horizontalSpacing="md" verticalSpacing="md" highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Clear PWD</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid}>
                            <td>{user.uid}</td>
                            <td>
                                {user.name} {user.lastName}
                            </td>
                            <td>{user.password}</td>
                            <td>{user.clearPassword}</td>
                            <td>
                                <RoleBadge role={user.role} />
                            </td>
                            <td>
                                <Flex>
                                    <ActionIcon color="blue" variant="light" mx="xs" size="lg">
                                        <IconEye size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="green" variant="light" mx="xs" size="lg">
                                        <IconEdit size="1rem" />
                                    </ActionIcon>
                                    <ActionIcon color="red" variant="light" mx="xs" size="lg">
                                        <IconTrash size="1rem" />
                                    </ActionIcon>
                                </Flex>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default ListUsers;
