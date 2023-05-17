import React from 'react';
import { createStyles, Header, Container, Group, Button, Burger, rem, UnstyledButton, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SwitchToggle } from './toggle-color-scheme';
import HelixLogo from './logo';
import { goToInstall } from '../helpers/links';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    useless: {
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
    { label: 'Interface', link: '#interface' },
    { label: 'FAQ', link: '#faq' },
    { label: 'Docs', link: 'https://helix-medical.github.io/docs/' },
    { label: 'Demo', link: 'https://helix-medical.github.io/demo/' },
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
                    <Menu shadow="md" width={200} opened={opened} onChange={toggle}>
                        <Menu.Target>
                            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                        </Menu.Target>
                        <Menu.Dropdown>{items}</Menu.Dropdown>
                    </Menu>
                    <HelixLogo />
                </Group>
                <Group spacing={5} className={classes.useless}>
                    {items}
                </Group>
                <Group position="right">
                    <div className={classes.useless}>
                        <SwitchToggle />
                    </div>
                    <Button radius="xl" h={30} onClick={() => goToInstall()}>
                        Get Started
                    </Button>
                </Group>
            </Container>
        </Header>
    );
};

export default HeaderWebsite;
