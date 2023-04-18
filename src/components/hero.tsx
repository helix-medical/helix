import React from 'react';
import { createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconBrandGithub, IconCheck } from '@tabler/icons-react';
import logo from '../assets/logo.png';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: `calc(${theme.spacing.xl} * 1)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
        }).background,
        borderRadius: theme.radius.sm,
        padding: `${rem(4)} ${rem(12)}`,
    },
}));

const Hero = () => {
    const { classes } = useStyles();
    return (
        <Container size='xl' className={classes.inner}>
            <div className={classes.content}>
                <Title className={classes.title}>
                    Un logiciel <span className={classes.highlight}>libre</span> de
                    <br />
                    Gestion de Patients
                    <br /> pour les <span className={classes.highlight}>Ostéopathes</span>
                </Title>
                <Text color="dimmed" mt="md">
                    Gérez votre patientèle, vos rendez-vous, vos consultations, vos factures et plus encore. Tout cela
                    gratuitement, sans publicité et pour tout votre cabinet.
                </Text>

                <List
                    mt={30}
                    spacing="sm"
                    size="sm"
                    icon={
                        <ThemeIcon size={20} radius="xl">
                            <IconCheck size={rem(12)} stroke={1.5} />
                        </ThemeIcon>
                    }
                >
                    <List.Item>
                        <b>Confidentiel</b> – Stocké directement chez vous.
                    </List.Item>
                    <List.Item>
                        <b>Gratuit et open-source</b> – Pas de licence, pas de publicité, pas de frais cachés.
                    </List.Item>
                    <List.Item>
                        <b>Pour tout votre cabinet</b> – Disponible sur n'importe quel appareil.
                    </List.Item>
                    <List.Item>
                        <b>Conçu pour les ostéopathes</b> – En collaboration avec des ostéopathes.
                    </List.Item>
                </List>

                <Group mt={30}>
                    <Button radius="xl" size="md" className={classes.control}>
                        Get started
                    </Button>
                    <Button
                        variant="default"
                        radius="xl"
                        size="md"
                        className={classes.control}
                        leftIcon={<IconBrandGithub />}
                        onClick={() => window.open('https://github.com/helix-medical', '_blank')}
                    >
                        Code Source
                    </Button>
                </Group>
            </div>
            <Image src={logo} className={classes.image} />
        </Container>
    );
};

export default Hero;
