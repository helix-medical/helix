import React from 'react';
import {
    ActionIcon,
    Avatar,
    Burger,
    Container,
    Group,
    Header,
    rem,
    Text,
    Title,
    Tooltip,
    UnstyledButton,
} from '@mantine/core';
import { DrawerApp } from './navbar-links';
import { IconSearch, IconPower } from '@tabler/icons-react';
import { spotlight } from '@mantine/spotlight';
import { useDisclosure } from '@mantine/hooks';
import { useLayoutStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import ToggleTheme from '../toggle-theme';
import useLogout from '../../hooks/use-logout';

const links = [
    { label: 'Patients', link: '/patients' },
    { label: 'Rendez-vous', link: '/calendar' },
    { label: 'Comptabilité', link: '/accounting' },
];

const HeaderApp = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const logout = useLogout();
    const { classes } = useLayoutStyles();
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
            <Header height={rem(60)} className={classes.header}>
                <Container className={classes.inner} fluid>
                    <Group>
                        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                        <UnstyledButton onClick={() => goToLink('/')} className={classes.link}>
                            <Group>
                                <Avatar src={logo} size="md" />
                                <Title order={1}>Helix</Title>
                            </Group>
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

export { HeaderApp };
