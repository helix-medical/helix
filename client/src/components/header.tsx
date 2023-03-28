import React from 'react';

// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// import Icon from '@mdi/react';
// import { mdiAccount } from '@mdi/js'

import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger,
    Flex,
    rem,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';

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
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
            >
                {link.label}
            </a>
        );
    });

    return (
        <Header height={rem(60)} sx={{ borderBottom: 0 }} mb={10}>
            <Container className={classes.inner} fluid>
                {/* <Flex
                    mih={50}
                    gap="xl"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    
                    {items}
                    
                </Flex> */}
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    <MantineLogo type='mark' size={28} />
                    <h1>Helix</h1>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Button color="green" radius='md'>Search</Button>
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link href="/patients"><h4>Patients</h4></Nav.Link>
                        <Nav.Link href="/appointments"><h4>Appointments</h4></Nav.Link>
                        <Nav.Link href="/calendar" disabled><h4>Calendar</h4></Nav.Link>
                    </Nav> */}
                {/* <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search Patient"
                            className="me-2"
                            aria-label="Search"
                            disabled
                        /> */}
                {/* </Form> */}
                {/* <Nav>
                        <Nav.Link href="/account">
                            <Icon path={mdiAccount} size={1} />User
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse> */}
            </Container>
        </Header>
    );
};

export default HeaderApp;