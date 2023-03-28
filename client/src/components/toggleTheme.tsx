import React from 'react';
import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const ToggleTheme = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const handleClick = () => {
        toggleColorScheme();
    };

    return (
        <ActionIcon
            onClick={handleClick}
            size="lg"
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}
        >
            {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
        </ActionIcon>
    );
}

export default ToggleTheme;