import React from 'react';
import { Title, SimpleGrid, Text, Button, Grid, Col, Container, Avatar } from '@mantine/core';
import { reviewsData } from './data';
import { useUserReviewStyles } from './styles';

const UserReview = () => {
    const { classes } = useUserReviewStyles();

    const items = reviewsData.map((review) => (
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
