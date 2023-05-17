import { Title, Avatar, Group } from '@mantine/core';
import logo from '../assets/logo.png';
import { useComponentsStyles } from './styles';

const HelixLogo = () => {
    const { classes } = useComponentsStyles().logo();
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
