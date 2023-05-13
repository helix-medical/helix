import React from 'react';
import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from '../../assets/404.png';
import { useNavigate } from 'react-router-dom';
import { useErrorStyles } from './styles';

const NotFound = () => {
    const { classes } = useErrorStyles();
    const navigate = useNavigate();

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
                <Image src={image} className={classes.mobileImage} />
                <div>
                    <Title className={classes.title}>Page not found...</Title>
                    <Text color="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the page has
                        been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Button
                        variant="outline"
                        size="md"
                        mt="xl"
                        className={classes.control}
                        onClick={() => navigate('/')}
                    >
                        Get back to home page
                    </Button>
                </div>
                <Image src={image} className={classes.desktopImage} />
            </SimpleGrid>
        </Container>
    );
};

export default NotFound;
