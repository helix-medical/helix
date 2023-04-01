import React from 'react';

import { createStyles, Header, Container, Group, Burger, rem, Title, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconPower } from '@tabler/icons-react';
import ToggleTheme from './toggleTheme';

const useStyles = createStyles((theme) => ({
    inner: {
        height: rem(60),
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
        // fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },
}));

interface HeaderAppProps {
    links: {
        link: string;
        label: string;
    }[];
}

const HeaderApp = ({ links }: HeaderAppProps) => {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    const items = links.map((link) => {
        return (
            <Title order={4} key={link.label}>
                <a href={link.link} className={classes.link}>
                    {link.label}
                </a>
            </Title>
        );
    });

    return (
        <Header height={rem(60)} sx={{ borderBottom: 0 }} mb={10}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    <a href="/" className={classes.link}>
                        <Title order={1}>Helix</Title>
                    </a>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group>
                    {/* <TextInput placeholder="Search" /> */}
                    <ActionIcon color="green" variant="light" size="lg">
                        <IconSearch size="1.2rem" />
                    </ActionIcon>
                    <ToggleTheme />
                    <ActionIcon color="red" variant="light" size="lg" component="a" href="login">
                        <IconPower size="1.2rem" />
                    </ActionIcon>
                </Group>
            </Container>
        </Header>
    );
};

export default HeaderApp;
