import { Title, Avatar, Group, createStyles } from '@mantine/core';
import logo from '../assets/logo.png';

const useStyles = createStyles((theme) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

const HelixLogo = () => {
    const { classes } = useStyles();
    return (
        <Group>
            <Avatar src={logo} size="md" />
            <Title order={3} className={classes.logo}>
                Helix
            </Title>
        </Group>
    );
};

export default HelixLogo;
