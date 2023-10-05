import React from 'react';
import { Text, Title, TextInput, Button, Image, Container } from '@mantine/core';
import logo from '../../assets/logo.png';
import { useBannerStyles } from './styles';

const Banner = () => {
    const { classes } = useBannerStyles();
    return (
        <Container size="lg" py="xl" className={classes.wrapper}>
            <div className={classes.body}>
                <Title className={classes.title}>Ready to try Helix now?</Title>
                <Text fw={500} fz="lg" mb={5}></Text>
                <Text fz="sm" c="dimmed">
                    You will never miss important product updates, latest news and community QA sessions. Our newsletter
                    is once a week, every Sunday.
                </Text>

                <div className={classes.controls}>
                    <TextInput
                        placeholder="Your email"
                        classNames={{ input: classes.input, root: classes.inputWrapper }}
                    />
                    <Button className={classes.control}>Subscribe</Button>
                </div>
            </div>
            <Image src={logo} className={classes.image} />
        </Container>
    );
};

export default Banner;
