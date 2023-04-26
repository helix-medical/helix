import React from 'react';
import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    Button,
    Center,
    Kbd,
} from '@mantine/core';
import {
    IconGauge,
    IconCalendar,
    IconUsersGroup,
    IconFileEuro,
    IconUserShield,
    IconBrandGit,
} from '@tabler/icons-react';

const mockdata = [
    {
        title: 'Gestion des Patients',
        description: (
            <Text>
                Vous pouvez gérer tous vos patients, leurs dossiers, leurs antécédents directement depuis la page{' '}
                <Kbd>Patients</Kbd>.
            </Text>
        ),
        icon: IconUsersGroup,
    },
    {
        title: 'Gestion des Consultations',
        description: (
            <Text>
                Avec le calendrier, vous avez une vision claire sur votre emploi du temps, et vous pouvez facilement
                ajouter un rendez-vous quand vous êtes disponibles.
            </Text>
        ),
        icon: IconCalendar,
    },
    {
        title: 'Gestion des Factures',
        description: (
            <Text>
                Gérez vos factures directement dans l'application. Vous pouvez directement les imprimer ou les envoyer
                par mail à vos patients.
            </Text>
        ),
        icon: IconFileEuro,
    },
    {
        title: 'Open source',
        description: (
            <Text>
                Helix est un logiciel libre, ce qui signifie que vous pouvez l'utiliser gratuitement, et même le
                modifier. C'est un gage de transparence et de sécurité.
            </Text>
        ),
        icon: IconBrandGit,
    },
    {
        title: 'Rapide',
        description: (
            <Text>
                Helix est conçu pour être rapide et réactif. C'est une application directement dans votre navigateur,
                qui ne nécessite pas d'installation. Vous pouvez l'utiliser sur n'importe quel appareil.
            </Text>
        ),
        icon: IconGauge,
    },
    {
        title: 'Confidentiel',
        description: (
            <Text>
                Helix est designé pour être entièrement RGPD-compatible. Les données des patients ne sortent pas de
                votre cabinet, et seuls les praticiens peuvent y avoir accès.
            </Text>
        ),
        icon: IconUserShield,
    },
];

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: rem(34),
        fontWeight: 900,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(24),
        },
    },

    description: {
        maxWidth: 600,
        margin: 'auto',

        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    card: {
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    cardTitle: {
        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
        },
    },
}));

const Features = () => {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container size="lg" py="xl" id="features">
            <Group position="center">
                <Badge variant="filled" size="lg">
                    Best company ever
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Fonctionnalités
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Voici les principales fonctionnalités de Helix. Nous travaillons constamment à l'amélioration de
                l'application, et nous sommes ouverts à toutes les suggestions. N'hésitez pas à essayer ces fonctionnalités
                par vous même en testant notre application.
            </Text>

            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {features}
            </SimpleGrid>
            <Center mt="xl">
                <Button size="lg" radius="md">
                    Get started
                </Button>
            </Center>
        </Container>
    );
};

export default Features;
