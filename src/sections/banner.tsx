import React from 'react';
import { createStyles, Text, Title, TextInput, Button, Image, rem, Container } from '@mantine/core';
import logo from '../assets/logo.png';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: `calc(${theme.spacing.xl} * 2)`,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]}`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column-reverse',
            padding: theme.spacing.xl,
        },
    },

    image: {
        maxWidth: '40%',

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    body: {
        paddingRight: `calc(${theme.spacing.xl} * 4)`,

        [theme.fn.smallerThan('sm')]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },

    controls: {
        display: 'flex',
        marginTop: theme.spacing.xl,
    },

    inputWrapper: {
        width: '100%',
        flex: '1',
    },

    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },

    control: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

const Banner = () => {
    const { classes } = useStyles();
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
