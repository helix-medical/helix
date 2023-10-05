import { createStyles, rem } from '@mantine/core';

const headerStyles = createStyles((theme) => ({
    inner: {
        height: rem(60),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    useless: {
        [theme.fn.smallerThan('sm')]: { display: 'none' },
    },

    burger: {
        [theme.fn.largerThan('sm')]: { display: 'none' },
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

    linkLabel: { marginRight: rem(5) },
}));

const intersectionStyles = createStyles((theme) => ({
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: rem(34),
        fontWeight: 900,
        marginBottom: rem(15),

        [theme.fn.smallerThan('sm')]: { fontSize: rem(24) },
    },
    control: {
        [theme.fn.smallerThan('xs')]: { flex: 1 },
    },
    inner: {
        alignItems: 'center',

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },
}));

const logoStyles = createStyles((theme) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
}));

const footerStyles = createStyles((theme) => ({
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

        [theme.fn.smallerThan('xs')]: { flexDirection: 'column' },
    },

    links: {
        [theme.fn.smallerThan('xs')]: { marginTop: theme.spacing.md },
    },
}));

const useComponentsStyles = () => {
    return {
        header: headerStyles,
        intersection: intersectionStyles,
        logo: logoStyles,
        footer: footerStyles,
    };
};

export { useComponentsStyles };
