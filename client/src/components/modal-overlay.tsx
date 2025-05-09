import { ModalOverlayProps, useMantineColorScheme, useMantineTheme } from '@mantine/core';

const ModalOverlay = (): ModalOverlayProps => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return {
    color: colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
    opacity: 0.55,
    blur: 3,
  };
};

export default ModalOverlay;
