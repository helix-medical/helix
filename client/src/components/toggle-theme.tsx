import { ActionIcon, Tooltip, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

const ToggleTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const handleClick = () => {
    toggleColorScheme();
  };

  return (
    <Tooltip
      style={(colorScheme === 'dark'
        ? { backgroundColor: theme.colors.dark[6], color: theme.colors.yellow[4] }
        : { backgroundColor: theme.colors.gray[0], color: theme.colors.blue[6] })}
      label={colorScheme === 'dark' ? 'Light theme' : 'Dark theme'}
      withArrow
    >
      <ActionIcon
        onClick={handleClick}
        size="lg"
        style={(colorScheme === 'dark'
          ? { backgroundColor: theme.colors.dark[6], color: theme.colors.yellow[4] }
          : { backgroundColor: theme.colors.gray[0], color: theme.colors.blue[6] })}
      >
        {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleTheme;
