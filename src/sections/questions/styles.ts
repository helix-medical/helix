import { createStyles, rem } from '@mantine/core';

const useQuestionsStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        minHeight: 650,
    },

    title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

export { useQuestionsStyles };
