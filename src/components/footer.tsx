import React from 'react';
import { createStyles, Container, Group, Anchor, rem, Text } from '@mantine/core';
import HelixLogo from './logo';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(120),
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

const links = [
    { label: 'Docs', link: '/docs/' },
    { label: 'GitHub', link: 'https://github.com/helix-medical' },
];

const Footer = () => {
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor<'a'> color="dimmed" key={link.label} href={link.link} size="sm">
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <HelixLogo />
                <Text size="sm" color="dimmed">
                    © 2023 Helix Medical
                </Text>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
};

export default Footer;
