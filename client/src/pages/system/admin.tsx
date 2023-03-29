import React from "react";
import { Title } from "@mantine/core";

const Admin = (): JSX.Element => {
    return (
        <>
        <Title order={1}>Admin</Title>
        <Title order={2}>Coming soon...</Title>
        <Title order={3}>+ Table view of the users</Title>
        <Title order={3}>+ Add new user</Title>
        <Title order={3}>+ Edit user</Title>
        <Title order={3}>+ Delete user</Title>

        </>
    );
};

export default Admin;