import React from 'react';
import { Badge, Group, Title, Text, Card, SimpleGrid, Container, rem, Button, Center } from '@mantine/core';
import { useFeaturesStyles } from './styles';
import { featuresData } from './data';

const Features = () => {
    const { classes, theme } = useFeaturesStyles();
    const features = featuresData.map((feature) => (
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
                l'application, et nous sommes ouverts à toutes les suggestions. N'hésitez pas à essayer ces
                fonctionnalités par vous même en testant notre application.
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
