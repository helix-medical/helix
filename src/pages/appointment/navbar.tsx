import { Button, Badge, Title, Grid, Group } from '@mantine/core';

interface IProps {
    view?: boolean;
}

function NavBarAppointment({ view }: IProps): JSX.Element {
    return (
        <Grid justify="space-between" align="center" p="md">
            <Group>
                <Title order={1}>
                    Appointment{' '}
                    <Badge color={view ? 'red' : 'blue'} size="xl" radius="sm">
                        {view ? 'READONLY' : 'CAN EDIT'}
                    </Badge>
                </Title>
            </Group>
            <Group>{view && <Button>Export to PDF</Button>}</Group>
        </Grid>
    );
}

export default NavBarAppointment;
