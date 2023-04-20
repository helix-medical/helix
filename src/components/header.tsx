import React from 'react';
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
    Title,
    ActionIcon,
    Tooltip,
    UnstyledButton,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconPower } from '@tabler/icons-react';
import ToggleTheme from './toggle-theme';
import useLogout from '../hooks/use-logout';
import DrawerApp from './navbar-links';
import { spotlight } from '@mantine/spotlight';
import { useNavigate } from 'react-router-dom';

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
        // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
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

const links = [
    { label: 'Patients', link: '/patients', color: 'fr-yellow.4' },
    { label: 'Appointments', link: '/appointments', color: 'fr-pink' },
    { label: 'Calendar', link: '/calendar', color: 'fr-cyan.4' },
    { label: 'Accounting', link: '/accounting', color: 'teal' },
];

const HeaderApp = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const logout = useLogout();
    const { classes } = useStyles();
    const navigate = useNavigate();

    const goToLink = (link: string) => {
        navigate(link);
        if (opened) toggle();
    };

    const items = links.map((link) => {
        return (
            <UnstyledButton onClick={() => goToLink(link.link)} className={classes.link} key={link.link}>
                <Text size="lg" weight={500}>
                    {link.label}
                </Text>
            </UnstyledButton>
        );
    });

    return (
        <>
            <Header height={rem(60)} sx={{ borderBottom: 0 }} mb={10}>
                <Container className={classes.inner} fluid>
                    <Group>
                        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                        <UnstyledButton onClick={() => goToLink('/')} className={classes.link}>
                            <Title order={1}>Helix</Title>
                        </UnstyledButton>
                    </Group>
                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <Group>
                        {/* <TextInput placeholder="Search" /> */}
                        <Tooltip label="Open Spotlight" color="green" withArrow>
                            <ActionIcon color="green" variant="light" size="lg" onClick={spotlight.open as any}>
                                <IconSearch size="1.2rem" />
                            </ActionIcon>
                        </Tooltip>
                        <ToggleTheme />
                        <Tooltip label="Logout" color="red" withArrow>
                            <ActionIcon color="red" variant="light" size="lg" component="button" onClick={logout}>
                                <IconPower size="1.2rem" />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Container>
            </Header>
            <DrawerApp open={opened} toggle={toggle} items={items} />
        </>
    );
};

export default HeaderApp;
