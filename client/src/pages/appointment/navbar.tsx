import React from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import Badge from "react-bootstrap/Badge";

import { Button, Badge, Title, Grid, Group } from "@mantine/core";

interface IProps {
    view?: boolean;
}

function NavBarAppointment({ view }: IProps): JSX.Element {
    return (
        <Grid justify="space-between" align="center" p="md">
            <Group>
                <Title order={1}>
                    Appointment&nbsp;
                    <Badge color={view ? "red" : "blue"} size="xl" radius="sm">
                        {view ? "READONLY" : "CAN EDIT"}
                    </Badge>
                </Title>
            </Group>
            <Group>{view && <Button>Export to PDF</Button>}</Group>
        </Grid>
    );
}

export default NavBarAppointment;
