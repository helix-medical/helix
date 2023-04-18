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
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
        icon: IconUsersGroup,
    },
    {
        title: 'Gestion des Consultations',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
        icon: IconCalendar,
    },
    {
        title: 'Gestion des Factures',
        description:
            'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
        icon: IconFileEuro,
    },
    {
        title: 'Open source',
        description:
            'It is said to have been born in the ice of the mountains. It is said to have been born in the ice of the mountains',
        icon: IconBrandGit,
    },
    {
        title: 'Rapide',
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
        icon: IconGauge,
    },
    {
        title: 'Confidentiel',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
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
                Nos fonctionnalités phares
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
            </Text>

            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {features}
            </SimpleGrid>
            <Center mt="xl">
                <Button size='lg' radius='md'>Get started</Button>
            </Center>
        </Container>
    );
};

export default Features;
