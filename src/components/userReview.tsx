import React from 'react';
import { createStyles, Title, SimpleGrid, Text, Button, Grid, Col, rem, Container, Avatar } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(36),
        fontWeight: 900,
        lineHeight: 1.1,
        marginBottom: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    description: {
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

const reviews = [
    {
        name: 'Isaac Newton',
        title: 'Free and open source',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        initial: 'IN',
    },
    {
        name: 'Albert Einstein',
        title: 'TypeScript based',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        initial: 'AE',
    },
    {
        name: 'Pierre Curie',
        title: 'No annoying focus ring',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        initial: 'PC',
    },
    {
        name: 'Marie Curie',
        title: 'Flexible',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        initial: 'MC',
    },
];

const UserReview = () => {
    const { classes } = useStyles();

    const items = reviews.map((review) => (
        <div key={review.title}>
            <Avatar color="blue" size="lg" radius="xl">
                {review.initial}
            </Avatar>
            <Text fz="lg" mt="sm" fw={500}>
                {review.title}
            </Text>
            <Text c="dimmed" fz="sm" className={classes.description}>
                {review.description}
            </Text>
            <Text mt="sm" fw={500}>
                {review.name}
            </Text>
        </div>
    ));

    return (
        <Container size="lg" py="xl" className={classes.wrapper} mt="xl">
            <Grid gutter={80}>
                <Col span={12} md={5}>
                    <Title className={classes.title} order={2}>
                        Ce que nos utilisateurs pensent de nous
                    </Title>
                    <Text c="dimmed">
                        Build fully functional accessible web applications faster than ever – Mantine includes more than
                        120 customizable components and hooks to cover you in any situation
                    </Text>

                    <Button
                        variant="gradient"
                        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                        size="lg"
                        radius="md"
                        mt="xl"
                    >
                        Get started
                    </Button>
                </Col>
                <Col span={12} md={7}>
                    <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                        {items}
                    </SimpleGrid>
                </Col>
            </Grid>
        </Container>
    );
};

export default UserReview;
