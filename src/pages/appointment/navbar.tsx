import { Button, Badge, Title, Grid, Group, createStyles } from '@mantine/core';

interface IProps {
    view?: boolean;
}

const useStyles = createStyles((theme) => ({
    useless: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
}));

function NavBarAppointment({ view }: IProps): JSX.Element {
    const { classes: style } = useStyles();
    return (
        <Grid justify="space-between" align="center" p="md">
            <Group>
                <Title order={1}>
                    Appointment{' '}
                    <Badge color={view ? 'red' : 'blue'} size="xl" radius="sm" className={style.useless}>
                        {view ? 'READONLY' : 'CAN EDIT'}
                    </Badge>
                </Title>
            </Group>
            <Group>{view && <Button>Export to PDF</Button>}</Group>
        </Grid>
    );
}

export default NavBarAppointment;
