import { Button, Container, Divider, Group, Text, Title } from '@mantine/core';
import { useComponentsStyles } from './styles';
import { goToDemo, goToInstall } from '../helpers/links';

const InterSection = () => {
    const { classes } = useComponentsStyles().intersection();
    return (
        <Container className={classes.inner}>
            <Divider my="lg" />
            <Title align="center" className={classes.title}>
                Convaincu(e) ?
            </Title>
            <Text align="center">Alors n'attendez plus et testez ou installez Helix dès maintenant !</Text>
            <Group mt={30} position="center">
                <Button mx="lg" radius="xl" size="md" onClick={() => goToInstall()} className={classes.control}>
                    Installer Maintenant
                </Button>
                <Button
                    mx="lg"
                    radius="xl"
                    size="md"
                    onClick={() => goToDemo()}
                    variant="light"
                    className={classes.control}
                >
                    Démonstration
                </Button>
            </Group>
            <Divider my="md" />
        </Container>
    );
};

export default InterSection;
