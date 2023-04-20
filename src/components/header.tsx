import React from 'react';
import {
    createStyles,
    Header,
    Container,
    Group,
    Button,
    Burger,
    rem,
    UnstyledButton,
    Title,
    Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SwitchToggle } from './toggle-color-scheme';
import logo from '../assets/logo.png';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },
}));

const links = [
    { label: 'Home', link: '#' },
    { label: 'Features', link: '#features' },
    { label: 'FAQ', link: '#faq' },
    { label: 'Docs', link: 'docs' },
];

const HeaderWebsite = () => {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const items = links.map((link) => {
        return (
            <UnstyledButton key={link.label} className={classes.link} component="a" href={link.link}>
                {link.label}
            </UnstyledButton>
        );
    });

    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    <Avatar src={logo} size="md" />
                    <Title order={3} style={{ color: 'white' }}>
                        Helix
                    </Title>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group position="right">
                    <SwitchToggle />
                    <Button radius="xl" h={30}>
                        Get early access
                    </Button>
                </Group>
            </Container>
        </Header>
    );
};

export default HeaderWebsite;
