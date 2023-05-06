import { useMantineTheme, ModalOverlayProps } from '@mantine/core';

const ModalOverlay = (): ModalOverlayProps => {
    const theme = useMantineTheme();

    return {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
    };
};

export default ModalOverlay;
