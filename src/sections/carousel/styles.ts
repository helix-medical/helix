import { createStyles, getStylesRef, rem } from '@mantine/core';

const useCarouselStyles = createStyles((theme) => ({
    inner: {
        marginTop: `calc(${theme.spacing.xl} * 2)`,
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
    },
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: rem(34),
        fontWeight: 900,
        marginBottom: rem(15),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(24),
        },
    },
    slide: {
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        // padding: 5,
    },
    indicator: {
        width: rem(12),
        height: rem(4),
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: rem(40),
        },
    },
    controls: {
        ref: getStylesRef('controls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    root: {
        '&:hover': {
            [`& .${getStylesRef('controls')}`]: {
                opacity: 1,
            },
        },
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius.sm,
    },
}));

export { useCarouselStyles };
