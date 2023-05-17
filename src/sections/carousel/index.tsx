import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Container, Image, Paper, Text, Title } from '@mantine/core';
import { useCarouselStyles } from './styles';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { carouselData } from './data';

const CarouselSection = () => {
    const { classes } = useCarouselStyles();

    const slides = carouselData.map((slide) => (
        <Carousel.Slide key={slide.title} onClick={() => {}}>
            <Paper shadow="sm" withBorder radius="md" p="xl">
                <Image src={slide.image} withPlaceholder alt={slide.title} />
                <Title order={3} align="center" mt="xs">
                    {slide.title}
                </Title>
                <Text mb="lg">{slide.description}</Text>
            </Paper>
        </Carousel.Slide>
    ));

    return (
        <Container py="xl" id="interface" className={classes.inner}>
            <Title order={2} align="center" className={classes.title}>
                Interface
            </Title>
            <Carousel
                maw={1000}
                mx="auto"
                slideGap="md"
                withIndicators
                height="auto"
                loop
                nextControlIcon={<IconChevronRight size={24} />}
                previousControlIcon={<IconChevronLeft size={24} />}
                classNames={classes}
            >
                {slides}
            </Carousel>
        </Container>
    );
};

export default CarouselSection;
