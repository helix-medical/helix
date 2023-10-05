import React from 'react';
import { Header, Container, Group, Button, Burger, rem, UnstyledButton, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SwitchToggle } from './toggle-color-scheme';
import HelixLogo from './logo';
import { goToInstall } from '../helpers/links';
import { useComponentsStyles } from './styles';

const links = [
    { label: 'Home', link: '#' },
    { label: 'Features', link: '#features' },
    { label: 'FAQ', link: '#faq' },
    { label: 'Docs', link: 'https://helix-medical.github.io/docs/' },
    { label: 'Demo', link: 'https://helix-medical.github.io/demo/' },
];

const HeaderWebsite = () => {
    const { classes } = useComponentsStyles().header();
    const [opened, { toggle }] = useDisclosure(false);
    const items = links.map((link) => {
        return (
            <UnstyledButton key={link.label} className={classes.link} component="a" href={link.link}>
                {link.label}
            </UnstyledButton>
        );
    });

    return (
        <Header height={rem(60)} sx={{ borderBottom: 0 }} mb={120}>
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
